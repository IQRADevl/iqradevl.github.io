# SD Islam Iqra Petobo

Website resmi SD Islam Iqra Petobo yang dikembangkan dengan Jekyll dan dihosting di GitHub Pages. Situs ini menampilkan informasi sekolah, berita, PPDB, profil, kontak, serta halaman PIP yang menampilkan data nominasi dan pemberian bantuan.

## Fitur utama

- Layout responsif untuk desktop dan mobile
- Tema terang/gelap
- Navigasi halaman sekolah
- Halaman berita dengan pagination
- Halaman PPDB dan profil sekolah
- Halaman PIP dengan pencarian, filter tahap/status, dan tabel data dinamis
- Hero stat sekolah dengan data Dapodik dan fallback konfigurasi lokal
- SEO dasar siap pakai via Jekyll SEO Tag, sitemap, dan feed

## Prasyarat

Pastikan di komputer sudah terpasang:

- Ruby
- Bundler

Gunakan Ruby 3.2 atau 3.3 untuk kompatibilitas dengan versi `github-pages` pada
project ini. Ruby 4.0 belum kompatibel dengan dependency Liquid/Jekyll yang
digunakan.

Untuk deploy di GitHub Pages, project ini menggunakan konfigurasi yang kompatibel dengan `github-pages` agar build aman dan konsisten.

## Menjalankan di komputer lokal

```bash
bundle install
bundle exec jekyll serve
```

Lalu buka:

```text
http://localhost:4000
```

## Struktur folder penting

```text
_config.yml                  Konfigurasi situs dan metadata SEO
Gemfile                      Dependency Jekyll yang kompatibel dengan GitHub Pages
_data/navigation.yml         Menu navigasi utama
_layouts/                    Layout halaman default dan post
_includes/                   Header, footer, dan metadata HTML
_posts/                      File berita dan pengumuman
assets/css/style.scss        Styling utama situs
assets/js/main.js            Script umum situs
assets/js/dapo.js            Data hero stat Dapodik dan animasi counter
assets/js/pip-tables.js      Script tabel PIP (filter, pencarian, pagination)
index.md                     Halaman depan
profil.md                    Profil sekolah
ppdb.md                      Informasi PPDB
pip.md                       Data PIP nominasi dan pemberian
berita/index.md              Halaman daftar berita
kontak.md                    Kontak sekolah
```

## Konfigurasi utama

### `_config.yml`

Atur nilai berikut sesuai kenyataan sekolah:

- `title`
- `short_name`
- `tagline`
- `description`
- `url`
- `school.address`
- `school.phone`
- `school.email`
- `school.founded`
- `school.students`
- `school.teachers`
- `school.accreditation`

Nilai `school.students`, `school.teachers`, dan `school.accreditation` juga
digunakan sebagai fallback hero stat. Saat halaman dibuka, `assets/js/dapo.js`
mencoba mengambil data dari API Dapodik. Field API yang digunakan adalah:

```json
{
	"data": [
		{
			"akreditasi": "B",
			"pd": 108,
			"jum_ptk": 11
		}
	]
}
```

Jika API gagal, timeout, atau field tidak tersedia, nilai dari `_config.yml`
tetap digunakan. Animasi counter dimulai setelah sumber data selesai diproses,
baik data tersebut berasal dari API maupun fallback.

### `Gemfile`

Project ini telah diatur agar kompatibel dengan GitHub Pages. Hindari memasang versi Jekyll yang tidak sesuai dengan `github-pages`, karena akan memicu konflik dependency saat build di GitHub Actions.

## Menambah berita

Buat file baru di folder `_posts/` dengan format:

```text
YYYY-MM-DD-judul-singkat.md
```

Contoh front matter:

```yaml
---
title: "Judul Berita"
category: Akademik
excerpt_text: "Ringkasan singkat satu-dua kalimat."
---

Isi berita di sini.
```

## Menambah/ubah halaman

Semua halaman utama berada di root project seperti:

- `index.md`
- `profil.md`
- `ppdb.md`
- `pip.md`
- `kontak.md`

Gunakan layout Jekyll yang sudah disediakan di `_layouts/`, lalu sesuaikan isi halaman sesuai kebutuhan.

## Deploy ke GitHub Pages

1. Push repository ke GitHub.
2. Buka GitHub repository → Settings → Pages.
3. Pilih source: GitHub Actions.
4. Setiap push ke branch utama akan otomatis melakukan build dan deploy.

Catatan penting:

- Pastikan `Gemfile` tetap kompatibel dengan GitHub Pages.
- Hindari plugin custom yang konflik dengan `github-pages`.
- Untuk plugin umum seperti SEO, sitemap, feed, dan pagination, GitHub Pages biasanya sudah menyediakan konfigurasi yang sesuai.

## Catatan pengembangan

Beberapa fitur khusus dibuat dengan JavaScript pada `assets/js/pip-tables.js`, misalnya:

- pencarian nama/NISN
- filter tahap dan status
- paginasi tabel PIP
- pengambilan data real-time dari API sekolah

Hero stat dikelola terpisah oleh `assets/js/dapo.js`. Script ini tidak mengubah
`main.js`, menjalankan animasi satu kali ketika hero terlihat, dan mengambil
data dari endpoint API yang dikonfigurasi di dalam script tersebut.

## Kredit

- [FebraS](https://github.com/febras)
- SD Islam Iqra Petobo
