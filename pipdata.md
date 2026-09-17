---
layout: page
title: Program Indonesia Pintar
section: PIP
permalink: /pipdata/
---

## Daftar Isi
* Placeholder (akan diganti otomatis oleh Jekyll)
{:toc}

## PIP
PIP (Program Indonesia Pintar) adalah bantuan berupa uang tunai, perluasan akses, dan kesempatan belajar dari pemerintah yang diberikan kepada peserta didik dan mahasiswa yang berasal dari keluarga miskin atau rentan miskin untuk membiayai pendidikan.

## Tujuan PIP
PIP dirancang untuk membantu anak-anak usia sekolah dari keluarga miskin/rentan miskin /prioritas tetap mendapatkan layanan pendidikan sampai tamat pendidikan menengah, baik melalui jalur formal sd sampai sma/smk dan jalur non formal paket a smpai paket c dan pendidikan khusus. 

Melalui program ini pemerintah berupaya mencegah peserta didik dari kemungkinan putus sekolah, dan diharapkan dapat menarik siswa putus sekolah agar kembali melanjutkan pendidikannya. 

PIP juga diharapkan dapat meringankan biaya personal pendidikan peserta didik, baik biaya langsung maupun tidak langsung.

---

## Data Real-Time PIP (Siswa Pemberian & Nominasi)
Berikut adalah data terkini yang langsung disinkronkan dari sistem PIP Kemendikdasmen melalui server Cloudflare Worker terproteksi.

---

### 1. Tabel Siswa Pemberian (SK Sekolah)
<div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
  <input type="text" id="searchPemberian" placeholder="🔍 Cari Nama atau NISN Siswa Pemberian..." style="padding: 8px 12px; width: 100%; max-width: 320px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px;">
  <span id="countPemberian" style="font-size: 13px; color: #666; font-weight: 500;">Memuat jumlah data...</span>
</div>

<div class="table-responsive" style="overflow-x: auto; margin-bottom: 30px; border-radius: 8px; border: 1px solid #e0e0e0;">
  <table id="tablePemberian" class="table table-bordered table-striped" style="width:100%; min-width: 700px; font-size: 14px; border-collapse: collapse; margin-bottom: 0;">
    <thead>
      <tr style="background: #1c7c91; color: white; text-align: left;">
        <th style="padding: 10px;">No</th>
        <th style="padding: 10px;">NISN</th>
        <th style="padding: 10px;">Nama Siswa</th>
        <th style="padding: 10px;">L/P</th>
        <th style="padding: 10px;">Kelas</th>
        <th style="padding: 10px;">Nominal</th>
        <th style="padding: 10px;">Keterangan Pencairan</th>
      </tr>
    </thead>
    <tbody>
      <tr><td colspan="7" style="text-align: center; padding: 20px;">Memuat data Pemberian...</td></tr>
    </tbody>
  </table>
</div>

---

### 2. Tabel Siswa Nominasi
<div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
  <input type="text" id="searchNominasi" placeholder="🔍 Cari Nama atau NISN Siswa Nominasi..." style="padding: 8px 12px; width: 100%; max-width: 320px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px;">
  <span id="countNominasi" style="font-size: 13px; color: #666; font-weight: 500;">Memuat jumlah data...</span>
</div>

<div class="table-responsive" style="overflow-x: auto; margin-bottom: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
  <table id="tableNominasi" class="table table-bordered table-striped" style="width:100%; min-width: 700px; font-size: 14px; border-collapse: collapse; margin-bottom: 0;">
    <thead>
      <tr style="background: #1c7c91; color: white; text-align: left;">
        <th style="padding: 10px;">No</th>
        <th style="padding: 10px;">NISN</th>
        <th style="padding: 10px;">Nama Siswa</th>
        <th style="padding: 10px;">L/P</th>
        <th style="padding: 10px;">Kelas</th>
        <th style="padding: 10px;">Status Aktivasi</th>
      </tr>
    </thead>
    <tbody>
      <tr><td colspan="6" style="text-align: center; padding: 20px;">Memuat data Nominasi...</td></tr>
    </tbody>
  </table>
</div>

<!-- Memuat file konfigurasi token rahasia hasil generate GitHub Actions -->
<script src="{{ '/assets/js/pip-config.js' | relative_url }}"></script>

<!-- Script Utama untuk Fetch dan Fitur Pencarian Interaktif -->
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const WORKER_BASE_URL = 'https://api.pip.sdislamiqrapetobo.sch.id';
    
    // Mengambil token secara aman dari window.PIP_CONFIG yang disuntikkan saat build
    const API_TOKEN = (typeof window.PIP_CONFIG !== 'undefined') ? window.PIP_CONFIG.token : '';

    const fetchOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + API_TOKEN
      }
    };

    // --- 1. HANDLE DATA PEMBERIAN ---
    fetch(WORKER_BASE_URL + '/pip-pemberian', fetchOptions)
      .then(response => response.json())
      .then(res => {
        const tbody = document.querySelector('#tablePemberian tbody');
        const countSpan = document.getElementById('countPemberian');
        tbody.innerHTML = '';
        
        if (res.success && res.data && res.data.data) {
          const rows = res.data.data;
          countSpan.textContent = `Total: ${rows.length} siswa`;

          if (rows.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 15px;">Tidak ada data ditemukan.</td></tr>';
            return;
          }

          function renderTablePemberian(dataList) {
            tbody.innerHTML = '';
            if (dataList.length === 0) {
              tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 15px;">Data tidak ditemukan dalam pencarian.</td></tr>';
              return;
            }
            dataList.forEach((row, index) => {
              let tr = document.createElement('tr');
              tr.innerHTML = `
                <td style="padding: 8px 10px;">${index + 1}</td>
                <td style="padding: 8px 10px;">${row.nisn || '-'}</td>
                <td style="padding: 8px 10px; font-weight: 500;">${row.nama_siswa || row.nama || '-'}</td>
                <td style="padding: 8px 10px;">${row.jk || '-'}</td>
                <td style="padding: 8px 10px;">${row.rombel || row.kelas || '-'}</td>
                <td style="padding: 8px 10px; color: #0e6b58; font-weight: 600;">${row.nominal || '-'}</td>
                <td style="padding: 8px 10px;">${row.keterangan_pencairan || '-'}</td>
              `;
              tbody.appendChild(tr);
            });
          }

          renderTablePemberian(rows);

          document.getElementById('searchPemberian').addEventListener('input', function(e) {
            const keyword = e.target.value.toLowerCase();
            const filtered = rows.filter(r => {
              const nisn = (r.nisn || '').toLowerCase();
              const nama = (r.nama_siswa || r.nama || '').toLowerCase();
              return nisn.includes(keyword) || nama.includes(keyword);
            });
            renderTablePemberian(filtered);
          });

        } else {
          countSpan.textContent = 'Gagal memuat';
          tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 15px; color: red;">Gagal memuat: ${res.message || 'Sesi kedaluwarsa / Token salah'}</td></tr>`;
        }
      })
      .catch(err => {
        document.getElementById('countPemberian').textContent = 'Koneksi Gagal';
        document.querySelector('#tablePemberian tbody').innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 15px; color: red;">Gagal terhubung ke server worker.</td></tr>';
      });

    // --- 2. HANDLE DATA NOMINASI ---
    fetch(WORKER_BASE_URL + '/pip-nominasi', fetchOptions)
      .then(response => response.json())
      .then(res => {
        const tbody = document.querySelector('#tableNominasi tbody');
        const countSpan = document.getElementById('countNominasi');
        tbody.innerHTML = '';
        
        if (res.success && res.data && res.data.data) {
          const rows = res.data.data;
          countSpan.textContent = `Total: ${rows.length} siswa`;

          if (rows.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 15px;">Tidak ada data ditemukan.</td></tr>';
            return;
          }

          function renderTableNominasi(dataList) {
            tbody.innerHTML = '';
            if (dataList.length === 0) {
              tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 15px;">Data tidak ditemukan dalam pencarian.</td></tr>';
              return;
            }
            dataList.forEach((row, index) => {
              let tr = document.createElement('tr');
              tr.innerHTML = `
                <td style="padding: 8px 10px;">${index + 1}</td>
                <td style="padding: 8px 10px;">${row.nisn || '-'}</td>
                <td style="padding: 8px 10px; font-weight: 500;">${row.nama_siswa || row.nama || '-'}</td>
                <td style="padding: 8px 10px;">${row.jk || '-'}</td>
                <td style="padding: 8px 10px;">${row.rombel || row.kelas || '-'}</td>
                <td style="padding: 8px 10px;">${row.aktif || row.keterangan_pencairan || '-'}</td>
              `;
              tbody.appendChild(tr);
            });
          }

          renderTableNominasi(rows);

          document.getElementById('searchNominasi').addEventListener('input', function(e) {
            const keyword = e.target.value.toLowerCase();
            const filtered = rows.filter(r => {
              const nisn = (r.nisn || '').toLowerCase();
              const nama = (r.nama_siswa || r.nama || '').toLowerCase();
              return nisn.includes(keyword) || nama.includes(keyword);
            });
            renderTableNominasi(filtered);
          });

        } else {
          countSpan.textContent = 'Gagal memuat';
          tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 15px; color: red;">Gagal memuat: ${res.message || 'Sesi kedaluwarsa / Token salah'}</td></tr>`;
        }
      })
      .catch(err => {
        document.getElementById('countNominasi').textContent = 'Koneksi Gagal';
        document.querySelector('#tableNominasi tbody').innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 15px; color: red;">Gagal terhubung ke server worker.</td></tr>';
      });
  });
</script>

---

## Grafik Penerima PIP di SD Islam Iqra Petobo
<div class="chart-container" style="position: relative; height:350px;">
  <canvas id="akademikChart"></canvas>
</div>

<!-- Library Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('akademikChart').getContext('2d');
    
    const gridColor = 'rgba(150, 150, 150, 0.25)';
    const textColor = 'rgba(160, 175, 195, 0.95)';

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['2020','2021','2022','2023','2024','2025','2026'],
        datasets: [
          {
            label: 'Jumlah Penerima',
            data: [56,76,66,61,44,58,35],
            backgroundColor: '#1c7c91',
            hoverBackgroundColor: '#2393ab',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              color: textColor,
              font: { family: 'Public Sans', size: 12 }
            }
          },
          title: {
            display: true,
            text: 'Diagram Jumlah Penerima PIP SD Islam Iqra Petobo',
            color: textColor,
            font: { family: 'Fraunces', size: 15, weight: '600' },
            padding: { bottom: 15 }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { 
              stepSize: 25,
              color: textColor
            },
            grid: {
              color: gridColor,
              borderColor: gridColor
            }
          },
          x: {
            ticks: {
              color: textColor
            },
            grid: { 
              display: false 
            }
          }
        }
      }
    });
  });
</script>
<figcaption>Sumber Data : https://pip.kemendikdasmen.go.id/</figcaption>

### Catatan dan Tren Data Penerima PIP

* **Puncak Penerima:** Jumlah penerima bantuan terbanyak tercatat pada tahun 2021, yaitu sebanyak 76 siswa.
* **Dinamika Tren:** Jumlah penerima sempat mengalami penurunan hingga 44 siswa pada tahun 2024, sebelum kembali meningkat menjadi 58 siswa pada tahun 2025.
* **Data Berjalan (2026):** Untuk tahun anggaran 2026, saat ini tercatat sebanyak 35 siswa yang terdaftar sebagai penerima.
* **Cakupan Data:** Angka pada grafik di atas merupakan status **Siswa Pemberian** (rekening aktif).
* **Pembaruan Data:** Jumlah siswa penerima diperbarui secara berkala mengikuti penetapan SK resmi dari pusat.

## Mekanisme Aktivasi dan Pencairan

Dalam melakukan pencairan atau aktivasi, umumnya diharapkan orang tua/wali bisa menyiapkan beberapa salinan dokumen seperti:

1. Buku Tabungan SimPel (Untuk siswa pemberian)
2. KTP Orang Tua/Wali
3. KIA (Kartu Identitas Anak)
4. Kartu Keluarga
5. Surat Pengantar Dari Pihak Sekolah

### Yang Dilakukan Setelah Menarik Dana
Bapak/Ibu Orang Tua atau Wali Murid, setelah Anda berhasil menarik dana PIP, mohon segera menyiapkan dan menyerahkan dokumen-dokumen berikut kepada pihak sekolah untuk keperluan pembaruan data sistem:

1. **File Halaman Pertama Tabungan**
2. **File Halaman Mutasi Terakhir Tabungan**
3. **Bukti Tarik ATM**
4. **File Identitas Siswa (KIA/KTP/Kartu Keluarga/Rapor)**

Jika dokumen diminta dalam bentuk "File", Bapak/Ibu cukup memfoto dokumen tersebut dengan jelas (tidak buram/terpotong) lalu mengirimkannya via WhatsApp/Email ke pihak sekolah.

Mohon pastikan bukti tarik ATM disimpan dengan baik karena kertas ATM mudah pudar.

Terima kasih atas kerja samanya demi kelancaran pencairan bantuan PIP putra-putri kita di tahap selanjutnya.

## Nominasi & Pemberian?
**Siswa Nominasi** adalah penetapan bagi peserta didik yang layak menerima PIP, namun belum melakukan aktivasi rekening (belum memiliki buku tabungan).

**Siswa Pemberian** adalah penetapan bagi peserta didik yang layak menerima PIP, dan sudah melakukan aktivasi rekening (sudah memiliki buku tabungan).

## Kontak PIP

Ada pertanyaan? Hubungi kami di <a href="mailto:{{ site.school.email }}">{{ site.school.email }}</a>
atau
<a href="https://wa.me/{{ site.school.phone | remove: '+' | remove: '-' | remove: ' ' }}" target="_blank" rel="noopener noreferrer">{{ site.school.phone }}</a>