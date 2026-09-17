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
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # 2. Akses Portal VervalPD
        print("[INFO] Buka VervalPD...")
        page.goto("https://vervalpd.data.kemendikdasmen.go.id/index.php/Csekolah/residu")
        page.wait_for_timeout(3000)

        # 3. Handle SSO Login
        if "sso" in page.url or page.locator("input[name='username']").is_visible():
            print("[INFO] Mengisi kredensial SSO...")
            page.fill("input[name='username']", SSO_USERNAME)
            page.fill("input[name='password']", SSO_PASSWORD)
            
            # Isi input TOTP jika ada
            if page.locator("input[name='totp']").is_visible():
                page.fill("input[name='totp']", totp_code)
            elif page.locator("input[name='code']").is_visible():
                page.fill("input[name='code']", totp_code)

            # Klik tombol submit
            page.click("button[type='submit']")
            page.wait_for_timeout(5000)

        # 4. Ambil Cookies setelah Login Berhasil
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