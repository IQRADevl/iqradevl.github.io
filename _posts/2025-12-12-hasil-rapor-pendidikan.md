---
layout: post
title: "Hasil Rapor Mutu Pendidikan SD Islam Iqra Petobo Tahun 2025"
category: Laporan
excerpt_text: "Ringkasan capaian Rapor Pendidikan SD Islam Iqra Petobo periode 2022–2025 sebagai bentuk transparansi dan evaluasi mutu sekolah."
---


Assalamu’alaikum Warahmatullahi Wabarakatuh.

Selamat datang di halaman transparansi mutu pendidikan SD Islam Iqra Petobo.

Kami meyakini bahwa data merupakan kompas yang mengarahkan sekolah menuju kualitas pendidikan yang lebih baik. Halaman ini menyajikan ringkasan capaian pembelajaran dan perkembangan lingkungan sekolah kami selama empat tahun terakhir (2022–2025).

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
            data: [31.82, 13.64, 50.9, 55.75, 59.35, 56.68, 51.57],
            backgroundColor: '#94a3b8',
            borderRadius: 4
          },
          {
            label: '2023',
            data: [60, 37.5, 51.4, 60.87, 59.35, 67.84, 55.63],
            backgroundColor: '#38bdf8',
            borderRadius: 4
          },
          {
            label: '2024',
            data: [60, 70, 55.23, 55.63, 66.09, 69.73, 53.09],
            backgroundColor: '#f59e0b',
            borderRadius: 4
          },
          {
            label: '2025',
            data: [75, 87.5, 54.1, 63, 73, 72, 63],
            backgroundColor: '#1c7c91',
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
            text: 'Diagram Capaian Rapor Pendidikan SD Islam Iqra Petobo (2022–2025)',
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
            }
          }
        }
      }
    });
  });
</script>

## Analisis & Capaian Utama
1. Kenaikan Capaian Literasi
Skor literasi mengalami peningkatan dari 60,00 menjadi 85,71. Perkembangan ini mencerminkan keberhasilan ekosistem sekolah dalam membangun budaya membaca serta mengasah kemampuan analisis informasi peserta didik.

2. Konsistensi Iklim Keamanan
Sekolah berkomitmen menghadirkan lingkungan belajar yang aman dan ramah anak. Skor Iklim Keamanan yang terus naik hingga mencapai 74,61 menunjukkan bahwa program keselamatan dan kenyamanan siswa berjalan secara efektif dan berkelanjutan.

3. Evaluasi Kemampuan Numerasi
Capaian numerasi mencatatkan fluktuasi. Setelah mencapai titik tertinggi pada tahun 2024, skor mengalami penurunan menjadi 42,86 pada tahun 2025. Hal ini menjadi fokus utama tim pengembang kurikulum untuk melakukan diagnosis dan perbaikan metode pembelajaran matematika.

### Catatan Evaluasi Data:

Penurunan skor numerasi pada tahun 2025 dipengaruhi secara signifikan oleh jumlah peserta asesmen yang jauh lebih sedikit (7 siswa) dibandingkan tahun sebelumnya (17 siswa). Secara statistik, ukuran sampel yang kecil cenderung menghasilkan pemeringkatan nilai yang ekstrem dan tidak sepenuhnya menggambarkan kualitas pengajaran secara menyeluruh.

4. Pematangan Karakter & Inklusivitas
Skor Karakter dan Iklim Inklusivitas menunjukkan tren yang stabil dan positif. Capaian ini sejalan dengan visi sekolah untuk membentuk lulusan yang berakhlak mulia, cerdas, dan mampu menghargai keberagaman.

## Langkah Strategis Sekolah
Sebagai bentuk tanggung jawab terhadap mutu pendidikan, SD Islam Iqra Petobo telah menyiapkan beberapa prioritas kerja:

Akselerasi Numerasi: Mengimplementasikan metode belajar matematika yang lebih interaktif dan aplikatif.

Penguatan Budaya Sekolah: Memperkuat skor Iklim Kebinekaan lewat kegiatan sosial dan kolaborasi antarpeserta didik.

Modernisasi Pembelajaran: Menjaga standar Kualitas Pembelajaran melalui pelatihan guru secara berkala dan pemanfaatan teknologi yang tepat guna.

## Penutup
Dinamika capaian pada periode 2022–2025 memberikan banyak ruang evaluasi bagi kami. Setiap capaian positif menjadi dorongan semangat, sementara tantangan yang ada menjadi dasar untuk terus berbenah.

Terima kasih atas kepercayaan dan dukungan seluruh pihak dalam perjalanan pengembangan SD Islam Iqra Petobo. Bersama-sama, mari kita wujudkan pendidikan yang unggul dan berkarakter bagi putra-putri kita.