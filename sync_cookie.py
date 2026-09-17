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
        # Gunakan User-Agent browser asli
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = context.new_page()

        print("[INFO] Buka VervalPD...")
        page.goto("https://vervalpd.data.kemendikdasmen.go.id/index.php/Csekolah/residu", wait_until="domcontentloaded")
        page.wait_for_timeout(3000)

        # 1. Cek jika ada tombol Login/SSO di halaman landing, lalu klik
        login_btn = page.locator("a:has-text('Login'), button:has-text('Login'), a:has-text('SSO')")
        if login_btn.count() > 0 and login_btn.first.is_visible():
            print("[INFO] Memilih tombol Login/SSO...")
            login_btn.first.click()
            page.wait_for_timeout(3000)

        # 2. Cari input Username/Email SSO dengan selector lebih luas
        print("[INFO] Mengisi kredensial SSO...")
        username_input = page.locator("input[name='username'], input#username, input[type='email'], input[name='email']").first
        username_input.wait_for(state="visible", timeout=15000)
        username_input.fill(SSO_USERNAME)

        # 3. Isi Password
        password_input = page.locator("input[name='password'], input#password, input[type='password']").first
        password_input.fill(SSO_PASSWORD)

        # 4. Isi TOTP jika kolomnya muncul
        page.wait_for_timeout(1000)
        totp_input = page.locator("input[name='totp'], input[name='code'], input[name='token'], input#totp").first
        if totp_input.is_visible():
            print("[INFO] Mengisi kode TOTP...")
            totp_input.fill(totp_code)

        # 5. Klik Submit Login
        submit_btn = page.locator("button[type='submit'], input[type='submit'], button:has-text('Log In'), button:has-text('Masuk')").first
        submit_btn.click()

        print("[INFO] Menunggu proses login selesai...")
        page.wait_for_timeout(7000)

        # 6. Tangkap Cookies
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
    except Exception as e:
        print(f"[ERROR] Terjadi kendala: {e}")