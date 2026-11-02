---
layout: post
title: "Hasil Rapor Mutu Pendidikan SD Islam Iqra Petobo Tahun 2026"
category: Laporan
excerpt_text: "Ringkasan capaian Rapor Pendidikan SD Islam Iqra Petobo periode 2022–2026 sebagai bentuk transparansi dan evaluasi mutu sekolah."
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
1. Kenaikan Capaian Literasi
Skor literasi mengalami peningkatan dari 60,00 (2024) menjadi 75,00 (2025). Perkembangan ini mencerminkan keberhasilan ekosistem sekolah dalam membangun budaya membaca serta mengasah kemampuan analisis informasi peserta didik.

2. Peningkatan Kemampuan Numerasi
Capaian numerasi mencatatkan lompatan yang sangat positif. Setelah mencapai skor 70,00 pada tahun 2024, nilai numerasi melonjak naik menjadi 87,50 pada tahun 2025. Hasil ini membuktikan efektivitas pembenahan metode pembelajaran matematika yang telah diterapkan sekolah.

3. Konsistensi Iklim Keamanan
Sekolah berkomitmen menghadirkan lingkungan belajar yang aman dan ramah anak. Skor Iklim Keamanan yang terus naik hingga mencapai 73,00 menunjukkan bahwa program keselamatan dan kenyamanan siswa berjalan secara efektif dan sustained.

4. Pematangan Karakter & Inklusivitas
Skor Karakter (54,10) dan Iklim Inklusivitas (63,00) menunjukkan tren yang stabil dan positif. Capaian ini sejalan dengan visi sekolah untuk membentuk lulusan yang berakhlak mulia, cerdas, dan mampu menghargai keberagaman.

## Langkah Strategis Sekolah
Langkah-langkah strategis berikut disusun berdasarkan rekomendasi prioritas PBD SD Islam Iqra Petobo Tahun 2026:

* **Menguatkan numerasi, khususnya domain aljabar**: Meningkatkan kompetensi pendidik melalui pelatihan, diskusi kelompok belajar, dan belajar mandiri. Pembelajaran numerasi direncanakan secara bertahap dan dikaitkan dengan masalah kontekstual agar pemahaman murid dapat berkembang.


* **Membiasakan refleksi pembelajaran**: Kepala sekolah dan pendidik melakukan refleksi secara berkala atas praktik mengajar, membahas hasil belajar dan tantangan murid, lalu menerjemahkan temuannya ke dalam rencana perbaikan pembelajaran dan program kerja sekolah.


* **Mengembangkan karakter dan penalaran kritis**: Menumbuhkan rasa ingin tahu, kebiasaan menelaah informasi, kemampuan menyampaikan alasan yang logis, dan pengambilan keputusan berdasarkan bukti melalui diskusi serta kegiatan belajar yang mendorong murid berpikir mendalam.


* **Meningkatkan kualitas pengelolaan pembelajaran**: Menyusun pembelajaran yang berpusat pada murid dan sesuai kebutuhan belajar, memperkuat pengelolaan kelas, serta menggunakan hasil asesmen dan refleksi sebagai dasar untuk memperbaiki proses pembelajaran.


* **Mendukung kesejahteraan psikologis dan inklusivitas**: Meningkatkan kapasitas warga sekolah dalam mendukung kesejahteraan psikologis murid, membangun sikap positif terhadap disabilitas, dan menciptakan lingkungan serta kegiatan belajar yang lebih inklusif.

## Penutup
Dinamika capaian pada periode 2022–2025 memberikan banyak ruang evaluasi bagi kami. Setiap capaian positif menjadi dorongan semangat, sementara tantangan yang ada menjadi dasar untuk terus berbenah.

Terima kasih atas kepercayaan dan dukungan seluruh pihak dalam perjalanan pengembangan SD Islam Iqra Petobo. Bersama-sama, mari kita wujudkan pendidikan yang unggul dan berkarakter bagi putra-putri kita.