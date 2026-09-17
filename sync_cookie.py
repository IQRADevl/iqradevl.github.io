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
    SSO_LOGIN_URL = "https://sso.data.kemendikdasmen.go.id/sys/login?appkey=348310F2-0262-4F5D-B7D1-41F92ECDCA93"

    with sync_playwright() as p:
        # Launch Chromium dengan bypass stealth
        browser = p.chromium.launch(
            headless=True,
            args=[
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-blink-features=AutomationControlled",
                "--disable-infobars"
            ]
        )
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            viewport={"width": 1366, "height": 768},
            locale="id-ID",
            timezone_id="Asia/Jakarta"
        )
        
        page = context.new_page()

        # Injeksi JavaScript untuk menyamarkan atribut bot/automation
        page.add_init_script("""
            Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
            window.chrome = { runtime: {} };
        """)

        print("[INFO] Membuka halaman SSO Kemendikdasmen...")
        page.goto(SSO_LOGIN_URL, wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(3000)

        print(f"[DEBUG] Judul Halaman: '{page.title()}' | URL: {page.url}")

        # Cek ketersediaan form #email
        try:
            email_input = page.wait_for_selector("#email", timeout=15000)
        except Exception as err:
            print("[ERROR] Elemen '#email' tidak ditemukan.")
            print(f"[DEBUG] Potongan HTML Halaman yang Terbuka:\n{page.content()[:800]}")
            page.screenshot(path="error.png", full_page=True)
            raise err

        # Fill Login Credentials
        print("[INFO] Mengisi Email & Password...")
        email_input.fill(SSO_USERNAME)
        page.wait_for_selector("#password", timeout=10000).fill(SSO_PASSWORD)
        
        # Submit Login Form
        page.click("button[type='submit']")

        # Fill OTP Verification Form
        print("[INFO] Menunggu halaman Verifikasi Kode OTP...")
        totp_input = page.wait_for_selector("#totp_code", timeout=20000)
        
        totp_code = pyotp.TOTP(TOTP_SECRET).now()
        print(f"[INFO] Mengisi Kode OTP: {totp_code}")
        totp_input.fill(totp_code)

        page.click("button[type='submit']")
        page.wait_for_timeout(5000)

        # Redirect to VervalPD to collect session cookies
        print("[INFO] Mengakses VervalPD untuk mengambil session cookie...")
        page.goto("https://vervalpd.data.kemendikdasmen.go.id/index.php/Csekolah/residu", wait_until="domcontentloaded")
        page.wait_for_timeout(5000)

        # Retrieve all session cookies
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