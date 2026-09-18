---
layout: page
title: Program Indonesia Pintar
section: PIP
permalink: /pip/
---


## Daftar Isi
* Placeholder (akan diganti otomatis oleh Jekyll)
{:toc}


## PIP
PIP (Program Indonesia Pintar) adalah bantuan berupa uang tunai, perluasan akses, dan kesempatan belajar dari pemerintah yang diberikan kepada peserta didik dan mahasiswa yang berasal dari keluarga miskin atau rentan miskin untuk membiayai pendidikan.

## Tujuan PIP
PIP dirancang untuk membantu anak-anak usia sekolah dari keluarga miskin/rentan miskin /prioritas tetap mendapatkan layanan pendidikan sampai tamat pendidikan menengah, baik melalui jalur formal sd sampai sma/smk dan jalur non formal paket a smpai paket c dan pendidikan khusus. 

Melalui program ini pemerintah berupaya mencegah peserta didik dari kemungkinan putus sekolah, dan diharapkan dapat menarik siswa putus sekolah agar kembali melanjutkan pendidikannya. 

PIP juga diharapkan dapat meringankan biaya personal pendidikan peserta didik, baik biaya langsung maupun tidak langsung

## Grafik Penerima PIP di SD Islam Iqra Petobo
<div class="chart-container">
  <canvas id="akademikChart"></canvas>
</div>

<!-- Library Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('akademikChart').getContext('2d');
    
    // Warna adaptif agar teks & garis muncul jelas di Dark Mode & Light Mode
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
            },
            border: {
              color: gridColor
          }
        },
        x: {
          ticks: {
            color: textColor
          },
          grid: { 
            display: false 
          },
          border: {
            color: gridColor
          }
        }
      }
    }
  });
});
</script>
<figcaption>Sumber Data : https://pip.kemdikdasmen.go.id/</figcaption>

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


### Tabel Siswa Nominasi (SK Nominasi Sekolah)
<div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
  <div style="display: flex; gap: 8px; flex-wrap: wrap; flex: 1;">
    <input type="text" id="searchNominasi" class="form-control" placeholder="Cari Nama / NISN..." style="padding: 6px 10px; flex: 1; min-width: 160px; border: 1px solid rgba(150, 150, 150, 0.4); border-radius: 6px; font-size: 13px; background-color: var(--input-bg, rgba(128, 128, 128, 0.15)); color: inherit;">
    
    <select id="filterTahapNominasi" class="form-select" style="padding: 6px 10px; border: 1px solid rgba(150, 150, 150, 0.4); border-radius: 6px; font-size: 13px; background-color: var(--input-bg, rgba(128, 128, 128, 0.15)); color: inherit;">
      <option value="all" style="background-color: var(--card-background, #222); color: inherit;">Semua Tahap</option>
    </select>
    
    <select id="filterStatusNominasi" class="form-select" style="padding: 6px 10px; border: 1px solid rgba(150, 150, 150, 0.4); border-radius: 6px; font-size: 13px; background-color: var(--input-bg, rgba(128, 128, 128, 0.15)); color: inherit;">
      <option value="all" style="background-color: var(--card-background, #222); color: inherit;">Semua Status</option>
    </select>
  </div>
  <span id="countNominasi" style="font-size: 13px; opacity: 0.8; font-weight: 500;">Memuat jumlah data...</span>
</div>

<div class="table-responsive" style="overflow-x: auto; margin-bottom: 10px; border-radius: 8px; border: 1px solid var(--border-color, #e0e0e0);">
  <table id="tableNominasi" class="table table-bordered table-striped" style="width:100%; min-width: 800px; font-size: 14px; border-collapse: collapse; margin-bottom: 0;">
    <thead>
      <tr style="background: #1c7c91; color: white; text-align: left;">
        <th style="padding: 10px;">No</th>
        <th style="padding: 10px;">NISN</th>
        <th style="padding: 10px;">Nama Peserta Didik</th>
        <th style="padding: 10px;">Rombel</th>
        <th style="padding: 10px;">Tahap ID</th>
        <th style="padding: 10px;">Tanggal SK</th>
        <th style="padding: 10px;">Status Aktif</th>
        <th style="padding: 10px;">Status Aktivasi</th>
      </tr>
    </thead>
    <tbody>
      <tr><td colspan="8" style="text-align: center; padding: 20px;">Memuat data Nominasi...</td></tr>
    </tbody>
  </table>
</div>
<div id="paginationNominasi" style="display: flex; justify-content: flex-end; gap: 5px; margin-bottom: 30px; flex-wrap: wrap;"></div>



**Siswa Pemberian** adalah penetapan bagi peserta didik yang layak menerima PIP, dan sudah melakukan aktivasi rekening (sudah memiliki buku tabungan).

### Tabel Siswa Pemberian (SK Sekolah)
<div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
  <div style="display: flex; gap: 8px; flex-wrap: wrap; flex: 1;">
    <input type="text" id="searchPemberian" class="form-control" placeholder="Cari Nama / NISN..." style="padding: 6px 10px; flex: 1; min-width: 160px; border: 1px solid rgba(150, 150, 150, 0.4); border-radius: 6px; font-size: 13px; background-color: var(--input-bg, rgba(128, 128, 128, 0.15)); color: inherit;">
    
    <select id="filterTahapPemberian" class="form-select" style="padding: 6px 10px; border: 1px solid rgba(150, 150, 150, 0.4); border-radius: 6px; font-size: 13px; background-color: var(--input-bg, rgba(128, 128, 128, 0.15)); color: inherit;">
      <option value="all" style="background-color: var(--card-background, #222); color: inherit;">Semua Tahap</option>
    </select>
    
    <select id="filterStatusPemberian" class="form-select" style="padding: 6px 10px; border: 1px solid rgba(150, 150, 150, 0.4); border-radius: 6px; font-size: 13px; background-color: var(--input-bg, rgba(128, 128, 128, 0.15)); color: inherit;">
      <option value="all" style="background-color: var(--card-background, #222); color: inherit;">Semua Status</option>
    </select>
  </div>
  <span id="countPemberian" style="font-size: 13px; opacity: 0.8; font-weight: 500;">Memuat jumlah data...</span>
</div>

<div class="table-responsive" style="overflow-x: auto; margin-bottom: 10px; border-radius: 8px; border: 1px solid var(--border-color, #e0e0e0);">
  <table id="tablePemberian" class="table table-bordered table-striped" style="width:100%; min-width: 800px; font-size: 14px; border-collapse: collapse; margin-bottom: 0;">
    <thead>
      <tr style="background: #1c7c91; color: white; text-align: left;">
        <th style="padding: 10px;">No</th>
        <th style="padding: 10px;">NISN</th>
        <th style="padding: 10px;">Nama Peserta Didik</th>
        <th style="padding: 10px;">Rombel</th>
        <th style="padding: 10px;">Tahap ID</th>
        <th style="padding: 10px;">Keterangan Pencairan</th>
        <th style="padding: 10px;">Tanggal SK</th>
        <th style="padding: 10px;">Status Cair</th>
      </tr>
    </thead>
    <tbody>
      <tr><td colspan="8" style="text-align: center; padding: 20px;">Memuat data Pemberian...</td></tr>
    </tbody>
  </table>
</div>
<div id="paginationPemberian" style="display: flex; justify-content: flex-end; gap: 5px; margin-bottom: 30px; flex-wrap: wrap;"></div>

<script src="{{ '/assets/js/pip-tables.js' | relative_url }}"></script>

## Kontak PIP

Ada pertanyaan? Hubungi kami di <a href="mailto:{{ site.school.email }}">{{ site.school.email }}</a>
atau
<a href="https://wa.me/{{ site.school.phone | remove: '+' | remove: '-' | remove: ' ' }}" target="_blank" rel="noopener noreferrer">{{ site.school.phone }}</a>