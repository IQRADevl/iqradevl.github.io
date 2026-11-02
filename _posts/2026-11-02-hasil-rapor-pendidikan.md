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

### Penguatan Kemampuan Numerasi
* Meningkatkan kompetensi pendidik tentang domain aljabar melalui pelatihan, diskusi kelompok belajar, belajar mandiri, dan pemanfaatan beragam sumber belajar.
* Merencanakan pembelajaran domain bilangan melalui kegiatan intrakurikuler, kokurikuler, dan/atau ekstrakurikuler untuk meningkatkan minat baca dan memperbaiki pembelajaran numerasi.
* Mendorong program dan kebijakan sekolah untuk memperbaiki kemampuan murid pada domain aljabar, baik melalui kegiatan yang memerlukan anggaran maupun yang tidak.
* Menerapkan strategi pembelajaran seperti pola, tabel, diagram, dan masalah kontekstual agar murid memahami konsep aljabar serta menggunakannya dalam masalah sehari-hari.

### Refleksi Pembelajaran Numerasi
* Mendorong pendidik melakukan refleksi rutin melalui pelatihan, diskusi kelompok belajar, dan pendampingan.
* Mengintegrasikan refleksi ke dalam program kerja sekolah, supervisi akademik, dan kelompok belajar pendidik, lalu menggunakannya untuk menyusun serta menjalankan perbaikan pembelajaran.
* Menelaah pekerjaan dan asesmen murid untuk mengenali materi yang belum dipahami dan menyesuaikan strategi mengajar dengan kebutuhan murid.
* Melakukan refleksi bersama rekan sejawat atau melalui telaah rekaman pembelajaran untuk menentukan langkah perbaikan yang konkret.

### Penguatan Karakter dan Penalaran Kritis
* Mendukung penguatan penalaran kritis melalui pengembangan kompetensi pendidik, sumber belajar yang beragam, dan sarana prasarana yang sesuai.
* Merancang kegiatan intrakurikuler, kokurikuler, dan/atau ekstrakurikuler yang menumbuhkan rasa ingin tahu, kemampuan menelaah informasi, menyampaikan alasan logis, menafsirkan data, mempertimbangkan berbagai sudut pandang, dan mengambil keputusan berdasarkan bukti.
* Membiasakan murid menelaah informasi dan menggunakan bukti melalui kegiatan literasi dan numerasi, forum diskusi, serta penyelidikan masalah di lingkungan sekitar.

### Refleksi untuk Penguatan Karakter
* Membiasakan pendidik mencatat refleksi singkat tentang perilaku murid yang teramati dan praktik mengajar yang memengaruhinya, kemudian menentukan tindak lanjut pada pembelajaran atau kegiatan berikutnya.
* Mengintegrasikan refleksi praktik mengajar ke dalam kegiatan intrakurikuler, kokurikuler, dan/atau ekstrakurikuler untuk memperbaiki pembelajaran yang mendukung karakter murid.
* Menyediakan waktu dan forum rutin untuk refleksi serta supervisi, dan meninjau tindak lanjutnya bersama pendidik pada akhir semester.

### Pengelolaan Kelas dan Kualitas Pembelajaran
* Meningkatkan kompetensi manajemen kelas melalui pelatihan dan refleksi agar suasana belajar kondusif dan interaksi antara pendidik, murid, serta materi pembelajaran semakin berkualitas.
* Menyusun dan menerapkan strategi manajemen kelas dalam kegiatan intrakurikuler, kokurikuler, dan/atau ekstrakurikuler.
* Mendorong program dan kebijakan manajemen kelas, baik yang memerlukan anggaran maupun yang tidak, untuk mendukung suasana belajar yang kondusif.

### Refleksi untuk Peningkatan Kualitas Pembelajaran
* Membiasakan pendidik mencatat bagian pembelajaran yang sudah dipahami murid, bagian yang belum dipahami, serta bukti dari pekerjaan, asesmen, atau umpan balik murid.
* Menggunakan catatan refleksi untuk menentukan satu aspek pengajaran yang perlu diperbaiki, menerapkannya pada pertemuan berikutnya, dan memeriksa dampaknya terhadap pemahaman atau keterlibatan murid.
* Mengintegrasikan sesi refleksi praktik mengajar ke dalam proses pembelajaran dan menyusun kebijakan yang mendorong refleksi rutin.

### Kesejahteraan Psikologis Murid
* Meningkatkan kompetensi pendidik dalam menciptakan rasa aman dan nyaman secara psikologis bagi murid melalui pelatihan, kelompok belajar, dan belajar mandiri.
* Merencanakan pembelajaran yang memperhatikan keamanan psikologis murid dalam kegiatan intrakurikuler, kokurikuler, dan ekstrakurikuler.
* Mendorong kegiatan, program, dan kebijakan untuk meningkatkan kesejahteraan serta keamanan psikologis murid, baik yang memerlukan anggaran maupun yang tidak.

### Lingkungan Pendidikan Inklusif
* Meningkatkan pemahaman warga sekolah tentang keberagaman kondisi, karakteristik, dan kebutuhan murid penyandang disabilitas serta membangun sikap positif melalui pelatihan, diskusi kelompok belajar, dan belajar mandiri.
* Mengintegrasikan pemahaman dan sikap positif terhadap disabilitas dalam pembelajaran serta kegiatan sekolah untuk membangun interaksi yang setara dan mencegah stigma, diskriminasi, pengucilan, serta perundungan.
* Mendukung layanan dan lingkungan sekolah yang inklusif melalui kebijakan, program, dan pembiasaan yang menjamin penerimaan, perlindungan, partisipasi, serta kesempatan yang setara bagi murid penyandang disabilitas.

## Penutup
Dinamika capaian pada periode 2022–2026 memberikan banyak ruang evaluasi bagi kami. Setiap capaian positif menjadi dorongan semangat, sementara tantangan yang ada menjadi dasar untuk terus berbenah.

Terima kasih atas kepercayaan dan dukungan seluruh pihak dalam perjalanan pengembangan SD Islam Iqra Petobo. Bersama-sama, mari kita wujudkan pendidikan yang unggul dan berkarakter bagi putra-putri kita.