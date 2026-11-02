---
layout: post
title: "Hasil Rapor Mutu Pendidikan SD Islam Iqra Petobo Tahun 2026"
category: Laporan
excerpt_text: "Ringkasan capaian Rapor Pendidikan SD Islam Iqra Petobo periode 2022–2026 sebagai bentuk transparansi dan evaluasi mutu sekolah."
---


Assalamu’alaikum Warahmatullahi Wabarakatuh.

Selamat datang di halaman transparansi mutu pendidikan SD Islam Iqra Petobo.

Kami meyakini bahwa data merupakan kompas yang mengarahkan sekolah menuju kualitas pendidikan yang lebih baik. Halaman ini menyajikan ringkasan capaian pembelajaran dan perkembangan lingkungan sekolah kami selama lima tahun terakhir (2022–2026).

<div class="chart-container">
  <canvas id="raporMutuChart"></canvas>
</div>

<!-- Library Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('raporMutuChart').getContext('2d');
    
    // Warna adaptif agar teks & garis terlihat jelas di Dark Mode maupun Light Mode
    const gridColor = 'rgba(150, 150, 150, 0.25)';
    const textColor = 'rgba(160, 175, 195, 0.95)';

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Kemampuan Literasi', 
          'Kemampuan Numerasi', 
          'Karakter', 
          'Kualitas Pembelajaran', 
          'Iklim Keamanan', 
          'Iklim Kebinekaan', 
          'Iklim Inklusivitas'
        ],
        datasets: [
          {
            label: '2022',
            data: [60, 37.5, 51.4, 60.87, 59.35, 67.84, 55.63],
            backgroundColor: '#94a3b8',
            borderRadius: 4
          },
          {
            label: '2023',
            data: [60, 70, 55.23, 55.63, 66.09, 69.73, 53.09],
            backgroundColor: '#38bdf8',
            borderRadius: 4
          },
          {
            label: '2024',
            data: [75, 87.5, 54.1, 63, 73, 72, 63],
            backgroundColor: '#f59e0b',
            borderRadius: 4
          },
          {
            label: '2025',
            data: [85.71, 42.86, 58.44, 63.1, 74.61, 62.37, 63.03],
            backgroundColor: '#1c7c91',
            borderRadius: 4
          },
          {
            label: '2026',
            data: [88.23, 64.71, 63.91, 66.5, 72.76, 73.72, 59.91],
            backgroundColor: '#911c33',
            borderRadius: 4
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
            text: 'Diagram Capaian Rapor Pendidikan SD Islam Iqra Petobo (2022–2026)',
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
              stepSize: 20,
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
              color: textColor,
              maxRotation: 45, /* Miringkan teks label agar tidak bentrok di layar HP */
              minRotation: 30,
              font: { size: 11 }
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

## Analisis & Capaian Utama
1. **Literasi terus menguat**  
Skor literasi meningkat dari 60,00 pada 2022 menjadi 88,23 pada 2026. Setelah berada di angka 60,00 pada 2022 dan 2023, capaian ini naik secara bertahap pada tiga tahun berikutnya dan menjadi nilai tertinggi literasi dalam periode yang ditampilkan.

2. **Numerasi pulih, tetapi masih perlu diperkuat**  
Capaian numerasi berfluktuasi: naik dari 37,50 pada 2022 hingga mencapai 87,50 pada 2024, turun menjadi 42,86 pada 2025, lalu meningkat kembali menjadi 64,71 pada 2026. Pemulihan ini menjadi perkembangan positif, meski nilainya masih di bawah capaian 2024.

3. **Karakter dan kualitas pembelajaran menunjukkan kemajuan**  
Skor karakter meningkat dari 51,40 pada 2022 menjadi 63,91 pada 2026. Kualitas pembelajaran juga naik dari 60,87 menjadi 66,50 pada periode yang sama. Kedua indikator tersebut kembali meningkat pada 2026 dibandingkan tahun sebelumnya.

4. **Iklim keamanan tetap tinggi, dengan sedikit penurunan terbaru**  
Skor iklim keamanan naik dari 59,35 pada 2022 dan mencapai 74,61 pada 2025, sebelum berada di 72,76 pada 2026. Meski turun 1,85 poin dari tahun sebelumnya, capaian 2026 masih lebih tinggi dibandingkan 2022.

5. **Kebinekaan menguat, sementara inklusivitas perlu menjadi perhatian**  
Skor iklim kebinekaan meningkat menjadi 73,72 pada 2026 setelah turun ke 62,37 pada 2025, sekaligus melampaui capaian tahun-tahun sebelumnya. Sebaliknya, iklim inklusivitas turun dari 63,03 pada 2025 menjadi 59,91 pada 2026, sehingga perlu terus dievaluasi dan diperkuat.

## Langkah Strategis Sekolah
Sebagai bentuk tanggung jawab terhadap mutu pendidikan, SD Islam Iqra Petobo telah menyiapkan beberapa prioritas kerja:

* **Penguatan Numerasi dan Pemeliharaan Literasi**: Menindaklanjuti fluktuasi capaian numerasi melalui evaluasi pembelajaran dan latihan pemecahan masalah (*problem-solving*), sambil menjaga perkembangan literasi.
* **Penguatan Iklim Sekolah**: Menjaga lingkungan yang aman dan kebinekaan yang saling menghargai, serta mengevaluasi upaya untuk meningkatkan inklusivitas.
* **Peningkatan Kualitas Pembelajaran dan Karakter**: Melanjutkan refleksi pembelajaran dan penguatan karakter agar kemajuan kedua indikator dapat dipertahankan.

## Penutup
Dinamika capaian pada periode 2022–2026 memberikan ruang evaluasi bagi kami. Perkembangan positif akan terus dijaga, sementara indikator yang berfluktuasi atau menurun menjadi dasar untuk menentukan langkah perbaikan berikutnya.

Terima kasih atas kepercayaan dan dukungan seluruh pihak dalam perjalanan pengembangan SD Islam Iqra Petobo. Bersama-sama, mari kita wujudkan pendidikan yang unggul dan berkarakter bagi putra-putri kita.