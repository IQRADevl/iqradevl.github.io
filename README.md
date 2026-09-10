# Template Jekyll — SD ISLAM IQRA PETOBO

Template ringan untuk situs sekolah di GitHub Pages. Tema hijau teal & putih,
responsif dengan menu hamburger di layar sempit, mendukung mode gelap, dan
sudah dilengkapi SEO dasar (meta tag, `sitemap.xml`, `feed.xml`, data terstruktur
Schema.org).

## Menjalankan di komputer lokal

```bash
bundle install
bundle exec jekyll serve
```

Buka `http://localhost:4000`.

## Yang perlu diubah pertama kali

1. **`_config.yml`** — ganti `title`, `short_name`, `tagline`, `description`, `url`,
   dan bagian `school:` (alamat, telepon, email, tahun berdiri, jumlah siswa/guru,
   akreditasi).
2. **`_data/navigation.yml`** — sesuaikan menu navigasi.
3. **`assets/images/logo.svg` & `favicon.svg`** — ganti dengan logo sekolah asli.
4. **`index.markdown`** — ubah teks hero, daftar program, dan kutipan.
5. Halaman `profil.markdown`, `akademik.markdown`, `ppdb.markdown`, `kontak.markdown`
   — isi dengan informasi sekolah sebenarnya.

## Menambah berita/pengumuman

Buat file baru di `_posts/` dengan format nama `YYYY-MM-DD-judul-singkat.markdown`:

```markdown
---
title: "Judul Berita"
category: Akademik
excerpt_text: "Ringkasan singkat satu-dua kalimat."
---

Isi berita di sini.
```

## Mengubah warna tema

Semua warna diatur lewat CSS variable di `assets/css/style.scss`, di bagian atas
file (blok `:root` untuk mode terang, `html[data-theme="dark"]` untuk mode gelap).
Ubah nilai `--teal-700`, `--bg`, dll. — seluruh halaman ikut menyesuaikan otomatis.

## Deploy ke GitHub Pages

Repo ini sudah menyertakan workflow di `.github/workflows/pages.yml`.

1. Push repo ini ke GitHub.
2. Buka **Settings → Pages**, pilih source **GitHub Actions**.
3. Setiap push ke branch `main` akan otomatis membangun dan menerbitkan situs.

Jangan lupa perbarui `url` (dan `baseurl` jika perlu) di `_config.yml` agar
tag SEO dan sitemap menunjuk ke alamat situs yang benar.

## Struktur folder

```
_config.yml          konfigurasi situs
_data/navigation.yml  menu navigasi
_layouts/             kerangka halaman (default, page, post)
_includes/            head, header, footer
_posts/               berita/pengumuman
assets/css/style.scss  seluruh styling + token warna
assets/js/main.js      hamburger menu & toggle mode gelap
index.markdown         beranda
profil.markdown, akademik.markdown, ppdb.markdown, berita.markdown, kontak.markdown
```

## Kredit
* [FebraS](http://github.com/febras)
