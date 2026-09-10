---
layout: page
title: Program Indonesia Pintar
section: PIP
permalink: /pip/
---

<style>
  /* Container Grafik Adaptif (Mode Terang & Gelap) */
  .chart-container {
    position: relative;
    height: 320px;
    width: 100%;
    margin: 20px 0 10px 0;
    padding: 15px;
    border-radius: 12px;
    border: 1px solid rgba(150, 150, 150, 0.25);
    background: rgba(150, 150, 150, 0.05);
  }
</style>

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
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['2020','2021','2022','2023','2024','2025','2026'],
        datasets: [
          {
            label: 'Jumlah Penerima',
            data: [56,76,66,61,44,58,35],
            backgroundColor: '#1c7c91',
            borderRadius: 4
          },
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
              font: { family: 'Public Sans', size: 12 }
            }
          },
          title: {
            display: true,
            text: 'Diagram Jumlah Penerima PIP SD Islam Iqra Petobo',
            font: { family: 'Fraunces', size: 15, weight: '600' },
            padding: { bottom: 15 }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { stepSize: 25 }
          },
          x: {
            grid: { display: false }
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

<a class="btn-download" href="https://docs.google.com/spreadsheets/d/1wD19Q1kOugyUjTm42zrosPLprEEm2NOPhi_4eXVCqHY/" target="_blank" rel="noopener noreferrer">Cek Siswa Nominasi Disini</a>

**Siswa Pemberian** adalah penetapan bagi peserta didik yang layak menerima PIP, dan sudah melakukan aktivasi rekening (sudah memiliki buku tabungan).

<a class="btn-download" href="https://docs.google.com/spreadsheets/d/1oQorK3-iCptEmuNgOWQQe3TPgNt9xe4ST05eKqU7mLg/" target="_blank" rel="noopener noreferrer">Cek Siswa Pemberian Disini</a>

## Kontak PIP

Ada pertanyaan? Hubungi kami di <a href="mailto:{{ site.school.email }}">{{ site.school.email }}</a>
atau
<a href="https://wa.me/{{ site.school.phone | remove: '+' | remove: '-' | remove: ' ' }}" target="_blank" rel="noopener noreferrer">{{ site.school.phone }}</a>
