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

    SSO_LOGIN_URL = "https://sso.data.kemendikdasmen.go.id/sys/login?appkey=348310F2-0262-4F5D-B7D1-41F92ECDCA93"

    with sync_playwright() as p:
        # Menyamarkan headless Chromium agar tidak terdeteksi sebagai bot
        browser = p.chromium.launch(
            headless=True,
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-accelerated-2d-canvas",
                "--no-first-run",
                "--no-zygote",
                "--disable-gpu"
            ]
        )
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            viewport={"width": 1366, "height": 768},
            locale="id-ID"
        )
        page = context.new_page()

        try:
            print("[INFO] Buka halaman SSO Kemendikdasmen...")
            page.goto(SSO_LOGIN_URL, wait_until="networkidle", timeout=60000)
            page.wait_for_timeout(3000)

            print(f"[INFO] Halaman Terbuka: {page.title()} | URL: {page.url}")

            # Cari input username
            print("[INFO] Mengisi Username & Password SSO...")
            input_user = page.wait_for_selector(
                "input[name='username'], input#username, input[type='email'], input[type='text']",
                timeout=20000
            )
            input_user.fill(SSO_USERNAME)

            input_pass = page.wait_for_selector(
                "input[name='password'], input#password, input[type='password']",
                timeout=10000
            )
            input_pass.fill(SSO_PASSWORD)

            # Cek TOTP di halaman 1
            totp_step1 = page.locator("input[name='totp'], input[name='code'], input[name='otp'], input#totp")
            if totp_step1.count() > 0 and totp_step1.first.is_visible():
                print("[INFO] Mengisi TOTP (Langkah 1)...")
                totp_step1.first.fill(totp_code)

            # Klik Masuk
            print("[INFO] Submit Login SSO...")
            btn_submit = page.locator("button[type='submit'], input[type='submit'], button:has-text('Masuk'), button:has-text('Log In')").first
            btn_submit.click()
            page.wait_for_timeout(5000)

            # Cek TOTP di halaman 2
            totp_step2 = page.locator("input[name='totp'], input[name='code'], input[name='otp'], input[name='token'], input#totp, input#code")
            if totp_step2.count() > 0 and totp_step2.first.is_visible():
                print("[INFO] Mengisi TOTP (Langkah 2)...")
                fresh_totp = pyotp.TOTP(TOTP_SECRET).now()
                totp_step2.first.fill(fresh_totp)

                btn_2fa = page.locator("button[type='submit'], input[type='submit'], button:has-text('Verifikasi'), button:has-text('Masuk')").first
                btn_2fa.click()
                page.wait_for_timeout(5000)

            # Redirect ke VervalPD
            print("[INFO] Mengakses VervalPD untuk penerbitan session cookie...")
            page.goto("https://vervalpd.data.kemendikdasmen.go.id/index.php/Csekolah/residu", wait_until="domcontentloaded")
            page.wait_for_timeout(5000)

            cookies = context.cookies()
            cookie_string = "; ".join([f"{c['name']}={c['value']}" for c in cookies])
            browser.close()
            return cookie_string

        except Exception as err:
            # Ambil screenshot jika terjadi kegagalan
            page.screenshot(path="error.png", full_page=True)
            print("[ERROR] Screenshot error disimpan ke error.png")
            browser.close()
            raise err

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