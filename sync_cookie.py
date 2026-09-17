import os
import time
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

    with sync_playwright() as p:
        # Launch browser dengan argumen bypass deteksi headless
        browser = p.chromium.launch(
            headless=True,
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox",
                "--disable-setuid-sandbox"
            ]
        )
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            viewport={"width": 1280, "height": 720}
        )
        page = context.new_page()

        print("[INFO] Buka VervalPD...")
        page.goto("https://vervalpd.data.kemendikdasmen.go.id/index.php/Csekolah/residu", wait_until="networkidle")
        page.wait_for_timeout(3000)

        print(f"[INFO] URL Saat Ini: {page.url}")

        # Tunggu rendering SSO selesai
        page.wait_for_load_state("domcontentloaded")
        page.wait_for_timeout(3000)

        # 1. Isi Username
        print("[INFO] Mencari input kredensial SSO...")
        try:
            input_user = page.wait_for_selector(
                "input[name='username'], input[name='email'], input[type='text'], input[type='email'], #username, #email",
                timeout=30000
            )
            input_user.fill(SSO_USERNAME)
            print("[INFO] Username berhasil diisi.")
        except Exception as err:
            print(f"[DEBUG] Gagal menemukan input username. Title Halaman: {page.title()}")
            inputs = page.locator("input").all()
            print(f"[DEBUG] Jumlah tag <input> ditemukan: {len(inputs)}")
            for i, inp in enumerate(inputs):
                print(f"  Input #{i}: name='{inp.get_attribute('name')}', id='{inp.get_attribute('id')}', type='{inp.get_attribute('type')}'")
            raise err

        # 2. Isi Password
        input_pass = page.wait_for_selector(
            "input[name='password'], input[type='password'], #password",
            timeout=10000
        )
        input_pass.fill(SSO_PASSWORD)
        print("[INFO] Password berhasil diisi.")

        # 3. Isi TOTP jika kolom tersedia
        page.wait_for_timeout(1000)
        totp_selector = "input[name='totp'], input[name='code'], input[name='token'], input[name='otp'], #totp, #code"
        totp_elements = page.locator(totp_selector)
        
        if totp_elements.count() > 0 and totp_elements.first.is_visible():
            print("[INFO] Mengisi kode TOTP...")
            totp_elements.first.fill(totp_code)

        # 4. Submit Login
        submit_btn = page.locator("button[type='submit'], input[type='submit'], button:has-text('Log In'), button:has-text('Masuk')").first
        submit_btn.click()

        print("[INFO] Menunggu proses login & redirect kembali...")
        page.wait_for_timeout(8000)

        # 5. Tangkap Cookies
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
            print(f"[DEBUG] Cookie tertangkap: {cookie}")
    except Exception as e:
        print(f"[ERROR] Terjadi kendala: {e}")