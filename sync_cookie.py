import os
import pyotp
import requests
from playwright.sync_api import sync_playwright

SSO_USERNAME = os.getenv("SSO_USERNAME")
SSO_PASSWORD = os.getenv("SSO_PASSWORD")
TOTP_SECRET = os.getenv("TOTP_SECRET")
WORKER_URL = os.getenv("WORKER_URL")
WORKER_SECRET_PASS = os.getenv("WORKER_SECRET_PASS")

def get_new_cookie():
    totp = pyotp.TOTP(TOTP_SECRET)
    totp_code = totp.now()
    print(f"[INFO] Kode TOTP Generated: {totp_code}")

    SSO_LOGIN_URL = "https://sso.data.kemendikdasmen.go.id/sys/login?appkey=348310F2-0262-4F5D-B7D1-41F92ECDCA93"

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=["--no-sandbox", "--disable-setuid-sandbox"]
        )
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            viewport={"width": 1366, "height": 768}
        )
        page = context.new_page()

        # 1. Buka Halaman SSO
        print("[INFO] Membuka halaman SSO Kemendikdasmen...")
        page.goto(SSO_LOGIN_URL, wait_until="domcontentloaded")
        page.wait_for_timeout(2000)

        # 2. Mengisi Form SSO (Sesuai ID/Name dari HTML)
        print("[INFO] Mengisi Email & Password SSO...")
        page.wait_for_selector("#email", timeout=15000).fill(SSO_USERNAME)
        page.wait_for_selector("#password", timeout=10000).fill(SSO_PASSWORD)

        # 3. Klik Submit Login
        print("[INFO] Menekan tombol Login...")
        page.click("button[type='submit']")
        page.wait_for_timeout(4000)

        # 4. Langkah 2: Verifikasi Kode TOTP (Jika halaman 2FA muncul)
        totp_input = page.locator("input[name='totp'], input[name='code'], input[name='otp'], input#code, input[type='text']")
        if totp_input.count() > 0 and totp_input.first.is_visible():
            print("[INFO] Mengisi kode 2FA / TOTP...")
            fresh_totp = pyotp.TOTP(TOTP_SECRET).now()
            totp_input.first.fill(fresh_totp)

            btn_submit_2fa = page.locator("button[type='submit'], input[type='submit']")
            if btn_submit_2fa.count() > 0:
                btn_submit_2fa.first.click()
            page.wait_for_timeout(5000)

        # 5. Akses VervalPD untuk menerbitkan cookie ci_session
        print("[INFO] Mengakses VervalPD untuk mengambil session cookie...")
        page.goto("https://vervalpd.data.kemendikdasmen.go.id/index.php/Csekolah/residu", wait_until="domcontentloaded")
        page.wait_for_timeout(5000)

        # 6. Ambil Cookies
        cookies = context.cookies()
        cookie_string = "; ".join([f"{c['name']}={c['value']}" for c in cookies])

        browser.close()
        return cookie_string

def update_cloudflare(cookie_string):
    print("[INFO] Mengirim cookie baru ke Cloudflare KV...")
    headers = {
        "Authorization": f"Bearer {WORKER_SECRET_PASS}",
        "Content-Type": "text/plain"
    }
    response = requests.post(WORKER_URL, data=cookie_string, headers=headers)
    print(f"[RESULT] Cloudflare Response: {response.text}")

if __name__ == "__main__":
    try:
        cookie = get_new_cookie()
        if "ci_session" in cookie:
            update_cloudflare(cookie)
        else:
            print("[ERROR] Login gagal. Cookie ci_session tidak ditemukan.")
            print(f"[DEBUG] Cookies yang didapat: {cookie}")
    except Exception as e:
        print(f"[ERROR] Terjadi kendala: {e}")