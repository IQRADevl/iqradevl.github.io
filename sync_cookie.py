import os
import pyotp
import requests
from playwright.sync_api import sync_playwright

SSO_USERNAME = os.getenv("SSO_USERNAME")
SSO_PASSWORD = os.getenv("SSO_PASSWORD")
TOTP_SECRET = os.getenv("TOTP_SECRET")
WORKER_URL = os.getenv("WORKER_URL")
WORKER_SECRET_PASS = os.getenv("WORKER_SECRET_PASS")
PROXY_SERVER = os.getenv("PROXY_SERVER")

def get_new_cookie():
    SSO_LOGIN_URL = "https://sso.data.kemendikdasmen.go.id/sys/login?appkey=348310F2-0262-4F5D-B7D1-41F92ECDCA93"

    chromium_args = ["--no-sandbox", "--disable-setuid-sandbox"]

    launch_kwargs = {
        "headless": True,
        "args": chromium_args
    }

    # Konfigurasi SOCKS4 Proxy
    if PROXY_SERVER:
        print(f"[INFO] Mengaktifkan Proxy: {PROXY_SERVER}")
        launch_kwargs["proxy"] = {"server": PROXY_SERVER}

    with sync_playwright() as p:
        browser = p.chromium.launch(**launch_kwargs)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            viewport={"width": 1366, "height": 768}
        )
        page = context.new_page()

        # 1. Buka Halaman Login SSO
        print("[INFO] Membuka halaman SSO Kemendikdasmen...")
        page.goto(SSO_LOGIN_URL, wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(2000)

        # 2. Mengisi Form Login
        print("[INFO] Mengisi Email & Password...")
        page.wait_for_selector("#email", timeout=30000).fill(SSO_USERNAME)
        page.wait_for_selector("#password", timeout=10000).fill(SSO_PASSWORD)
        
        page.click("button[type='submit']")

        # 3. Menunggu dan Mengisi Form Verifikasi OTP
        print("[INFO] Menunggu halaman Verifikasi Kode OTP...")
        totp_input = page.wait_for_selector("#totp_code", timeout=20000)
        
        totp_code = pyotp.TOTP(TOTP_SECRET).now()
        print(f"[INFO] Mengisi Kode OTP: {totp_code}")
        totp_input.fill(totp_code)

        page.click("button[type='submit']")
        page.wait_for_timeout(5000)

        # 4. Akses VervalPD untuk menerbitkan session cookie (ci_session)
        print("[INFO] Mengakses VervalPD untuk mengambil session cookie...")
        page.goto("https://vervalpd.data.kemendikdasmen.go.id/index.php/Csekolah/residu", wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(5000)

        # 5. Ambil Cookies
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