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


---

### Tabel Siswa Nominasi (SK Nominasi Sekolah)
<!-- Panel Filter & Pencarian Nominasi -->
<div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
  <div style="display: flex; gap: 8px; flex-wrap: wrap; flex: 1;">
    <input type="text" id="searchNominasi" placeholder="Cari Nama / NISN..." style="padding: 6px 10px; flex: 1; min-width: 180px; border: 1px solid #ccc; border-radius: 6px; font-size: 13px;">
    <select id="filterTahapNominasi" style="padding: 6px 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 13px; background: #fff;">
      <option value="">Semua Tahap</option>
    </select>
    <select id="filterStatusNominasi" style="padding: 6px 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 13px; background: #fff;">
      <option value="">Semua Status</option>
    </select>
  </div>
  <span id="countNominasi" style="font-size: 13px; color: #666; font-weight: 500;">Memuat jumlah data...</span>
</div>

<div class="table-responsive" style="overflow-x: auto; margin-bottom: 10px; border-radius: 8px; border: 1px solid #e0e0e0;">
  <table id="tableNominasi" class="table table-bordered table-striped" style="width:100%; min-width: 750px; font-size: 14px; border-collapse: collapse; margin-bottom: 0;">
    <thead>
      <tr style="background: #1c7c91; color: white; text-align: left;">
        <th style="padding: 10px;">No</th>
        <th style="padding: 10px;">NISN</th>
        <th style="padding: 10px;">Nama Siswa</th>
        <th style="padding: 10px;">L/P</th>
        <th style="padding: 10px;">Kelas</th>
        <th style="padding: 10px;">Tahap</th>
        <th style="padding: 10px;">Status Aktivasi</th>
      </tr>
    </thead>
    <tbody>
      <tr><td colspan="7" style="text-align: center; padding: 20px;">Memuat data Nominasi...</td></tr>
    </tbody>
  </table>
</div>
<!-- Tombol Pagination Nominasi di Kanan Bawah -->
<div id="paginationNominasi" style="display: flex; justify-content: flex-end; gap: 5px; margin-bottom: 30px; flex-wrap: wrap;"></div>

---

**Siswa Pemberian** adalah penetapan bagi peserta didik yang layak menerima PIP, dan sudah melakukan aktivasi rekening (sudah memiliki buku tabungan).

---

### Tabel Siswa Pemberian (SK Sekolah)
<!-- Panel Filter & Pencarian Pemberian -->
<div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
  <div style="display: flex; gap: 8px; flex-wrap: wrap; flex: 1;">
    <input type="text" id="searchPemberian" placeholder="Cari Nama / NISN..." style="padding: 6px 10px; flex: 1; min-width: 180px; border: 1px solid #ccc; border-radius: 6px; font-size: 13px;">
    <select id="filterTahapPemberian" style="padding: 6px 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 13px; background: #fff;">
      <option value="">Semua Tahap</option>
    </select>
    <select id="filterStatusPemberian" style="padding: 6px 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 13px; background: #fff;">
      <option value="">Semua Status</option>
    </select>
  </div>
  <span id="countPemberian" style="font-size: 13px; color: #666; font-weight: 500;">Memuat jumlah data...</span>
</div>

<div class="table-responsive" style="overflow-x: auto; margin-bottom: 10px; border-radius: 8px; border: 1px solid #e0e0e0;">
  <table id="tablePemberian" class="table table-bordered table-striped" style="width:100%; min-width: 900px; font-size: 14px; border-collapse: collapse; margin-bottom: 0;">
    <thead>
      <tr style="background: #1c7c91; color: white; text-align: left;">
        <th style="padding: 10px;">No</th>
        <th style="padding: 10px;">NISN</th>
        <th style="padding: 10px;">Nama Peserta Didik</th>
        <th style="padding: 10px;">Rombel</th>
        <th style="padding: 10px;">Tahap ID</th>
        <th style="padding: 10px;">Tanggal Cair</th>
        <th style="padding: 10px;">Keterangan Pencairan</th>
        <th style="padding: 10px;">Tanggal SK</th>
        <th style="padding: 10px;">Nomor SK</th>
        <th style="padding: 10px;">Status Cair</th>
      </tr>
    </thead>
    <tbody>
      <tr><td colspan="10" style="text-align: center; padding: 20px;">Memuat data Pemberian...</td></tr>
    </tbody>
  </table>
</div>
<!-- Tombol Pagination Pemberian di Kanan Bawah -->
<div id="paginationPemberian" style="display: flex; justify-content: flex-end; gap: 5px; margin-bottom: 30px; flex-wrap: wrap;"></div>

---

<!-- Script Utama untuk Fetch, Filter, & Pagination Interaktif -->
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const WORKER_BASE_URL = 'https://api.pip.sdislamiqrapetobo.sch.id';
    const ROWS_PER_PAGE = 10; // Batasi 10 data per halaman

    function populateDropdown(selectElement, valuesSet) {
      const defaultOption = selectElement.options[0];
      selectElement.innerHTML = '';
      selectElement.appendChild(defaultOption);
      
      Array.from(valuesSet).sort().forEach(val => {
        if (val) {
          let opt = document.createElement('option');
          opt.value = val;
          opt.textContent = val;
          selectElement.appendChild(opt);
        }
      });
    }

    // Data Pemberian
    fetch(WORKER_BASE_URL + '/pip-pemberian')
      .then(response => response.json())
      .then(res => {
        const tbody = document.querySelector('#tablePemberian tbody');
        const countSpan = document.getElementById('countPemberian');
        const searchInput = document.getElementById('searchPemberian');
        const filterTahap = document.getElementById('filterTahapPemberian');
        const filterStatus = document.getElementById('filterStatusPemberian');
        const paginationDiv = document.getElementById('paginationPemberian');
        
        tbody.innerHTML = '';
        
        if (res.success && res.data && res.data.data) {
          const rows = res.data.data;
          let currentPage = 1;

          if (rows.length === 0) {
            countSpan.textContent = `Total: 0 siswa`;
            tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 15px;">Tidak ada data ditemukan.</td></tr>';
            return;
          }

          let tahapSet = new Set();
          let statusSet = new Set();
          rows.forEach(r => {
            if (r.tahap_id) tahapSet.add(String(r.tahap_id));
            if (r.status_cair) statusSet.add(String(r.status_cair));
          });
          populateDropdown(filterTahap, tahapSet);
          populateDropdown(filterStatus, statusSet);

          function getFilteredData() {
            const keyword = searchInput.value.toLowerCase();
            const selectedTahap = filterTahap.value;
            const selectedStatus = filterStatus.value;

            return rows.filter(r => {
              const nisn = (r.nisn || '').toLowerCase();
              const nama = (r.nama_pd || '').toLowerCase();
              const tahap = String(r.tahap_id || '');
              const status = String(r.status_cair || '');

              const matchText = nisn.includes(keyword) || nama.includes(keyword);
              const matchTahap = !selectedTahap || tahap === selectedTahap;
              const matchStatus = !selectedStatus || status === selectedStatus;

              return matchText && matchTahap && matchStatus;
            });
          }

          function renderTable() {
            const filteredData = getFilteredData();
            const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE) || 1;
            
            if (currentPage > totalPages) currentPage = 1;

            const start = (currentPage - 1) * ROWS_PER_PAGE;
            const paginatedData = filteredData.slice(start, start + ROWS_PER_PAGE);

            tbody.innerHTML = '';
            if (paginatedData.length === 0) {
              tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 15px;">Data tidak ditemukan sesuai filter.</td></tr>';
            } else {
              paginatedData.forEach((row, index) => {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                  <td style="padding: 8px 10px;">${start + index + 1}</td>
                  <td style="padding: 8px 10px;">${row.nisn || '-'}</td>
                  <td style="padding: 8px 10px; font-weight: 500;">${row.nama_pd || '-'}</td>
                  <td style="padding: 8px 10px;">${row.rombel || row.kelas || '-'}</td>
                  <td style="padding: 8px 10px; text-align: center; font-weight: 600;">${row.tahap_id || '-'}</td>
                  <td style="padding: 8px 10px;">${row.tanggal_cair || '-'}</td>
                  <td style="padding: 8px 10px;">${row.keterangan_pencairan || '-'}</td>
                  <td style="padding: 8px 10px;">${row.tanggal_sk || '-'}</td>
                  <td style="padding: 8px 10px;">${row.nomor_sk || '-'}</td>
                  <td style="padding: 8px 10px; font-weight: 600; color: ${row.status_cair === 'Sudah Cair' ? '#0e6b58' : '#d9534f'};">${row.status_cair || '-'}</td>
              `;
              tbody.appendChild(tr);
            });
          }

          countSpan.textContent = `Ditampilkan: ${filteredData.length} dari ${rows.length} siswa`;
          renderPagination(totalPages);
        }

        function renderPagination(totalPages) {
          paginationDiv.innerHTML = '';
          if (totalPages <= 1) return;

          for (let i = 1; i <= totalPages; i++) {
            let btn = document.createElement('button');
            btn.textContent = i;
            btn.style.padding = '5px 10px';
            btn.style.border = '1px solid #ccc';
            btn.style.borderRadius = '4px';
            btn.style.cursor = 'pointer';
            btn.style.fontSize = '13px';
            
            if (i === currentPage) {
              btn.style.background = '#1c7c91';
              btn.style.color = 'white';
              btn.style.fontWeight = 'bold';
              btn.style.borderColor = '#1c7c91';
            } else {
              btn.style.background = '#fff';
              btn.style.color = '#333';
          }

          btn.addEventListener('click', function() {
            currentPage = i;
            renderTable();
          });

          paginationDiv.appendChild(btn);
        }
      }

      renderTable();

      searchInput.addEventListener('input', function() { currentPage = 1; renderTable(); });
      filterTahap.addEventListener('change', function() { currentPage = 1; renderTable(); });
      filterStatus.addEventListener('change', function() { currentPage = 1; renderTable(); });

    } else {
      countSpan.textContent = 'Gagal memuat';
      tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; padding: 15px; color: red;">Gagal memuat: ${res.message || 'Sesi kedaluwarsa'}</td></tr>`;
    }
  })
  .catch(err => {
    document.getElementById('countPemberian').textContent = 'Koneksi Gagal';
    document.querySelector('#tablePemberian tbody').innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 15px; color: red;">Gagal terhubung ke server worker.</td></tr>';
  });

  // Data Nominasi
  fetch(WORKER_BASE_URL + '/pip-nominasi')
    .then(response => response.json())
    .then(res => {
      const tbody = document.querySelector('#tableNominasi tbody');
      const countSpan = document.getElementById('countNominasi');
      const searchInput = document.getElementById('searchNominasi');
      const filterTahap = document.getElementById('filterTahapNominasi');
      const filterStatus = document.getElementById('filterStatusNominasi');
      const paginationDiv = document.getElementById('paginationNominasi');

      tbody.innerHTML = '';
      
      if (res.success && res.data && res.data.data) {
        const rows = res.data.data;
        let currentPage = 1;

        if (rows.length === 0) {
          countSpan.textContent = `Total: 0 siswa`;
          tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 15px;">Tidak ada data ditemukan.</td></tr>';
          return;
        }

        let tahapSet = new Set();
        let statusSet = new Set();
        rows.forEach(r => {
          if (r.tahap_id) tahapSet.add(String(r.tahap_id));
          if (r.aktif || r.keterangan_pencairan) statusSet.add(String(r.aktif || r.keterangan_pencairan));
        });
        populateDropdown(filterTahap, tahapSet);
        populateDropdown(filterStatus, statusSet);

        function getFilteredData() {
          const keyword = searchInput.value.toLowerCase();
          const selectedTahap = filterTahap.value;
          const selectedStatus = filterStatus.value;

          return rows.filter(r => {
            const nisn = (r.nisn || '').toLowerCase();
            const nama = (r.nama_pd || '').toLowerCase();
            const tahap = String(r.tahap_id || '');
            const status = String(r.aktif || r.keterangan_pencairan || '');

            const matchText = nisn.includes(keyword) || nama.includes(keyword);
            const matchTahap = !selectedTahap || tahap === selectedTahap;
            const matchStatus = !selectedStatus || status === selectedStatus;

            return matchText && matchTahap && matchStatus;
        });
      }

      function renderTable() {
        const filteredData = getFilteredData();
        const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE) || 1;
        
        if (currentPage > totalPages) currentPage = 1;

        const start = (currentPage - 1) * ROWS_PER_PAGE;
        const paginatedData = filteredData.slice(start, start + ROWS_PER_PAGE);

        tbody.innerHTML = '';
        if (paginatedData.length === 0) {
          tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 15px;">Data tidak ditemukan sesuai filter.</td></tr>';
        } else {
          paginatedData.forEach((row, index) => {
            let tr = document.createElement('tr');
            tr.innerHTML = `
              <td style="padding: 8px 10px;">${start + index + 1}</td>
              <td style="padding: 8px 10px;">${row.nisn || '-'}</td>
              <td style="padding: 8px 10px; font-weight: 500;">${row.nama_pd || '-'}</td>
              <td style="padding: 8px 10px;">${row.jenis_kelamin || '-'}</td>
              <td style="padding: 8px 10px;">${row.rombel || row.kelas || '-'}</td>
              <td style="padding: 8px 10px; text-align: center; font-weight: 600;">${row.tahap_id || '-'}</td>
              <td style="padding: 8px 10px;">${row.aktif || row.keterangan_pencairan || '-'}</td>
            `;
            tbody.appendChild(tr);
          });
        }

        countSpan.textContent = `Ditampilkan: ${filteredData.length} dari ${rows.length} siswa`;
        renderPagination(totalPages);
      }

      function renderPagination(totalPages) {
        paginationDiv.innerHTML = '';
        if (totalPages <= 1) return;

        for (let i = 1; i <= totalPages; i++) {
          let btn = document.createElement('button');
          btn.textContent = i;
          btn.style.padding = '5px 10px';
          btn.style.border = '1px solid #ccc';
          btn.style.borderRadius = '4px';
          btn.style.cursor = 'pointer';
          btn.style.fontSize = '13px';
          
          if (i === currentPage) {
            btn.style.background = '#1c7c91';
            btn.style.color = 'white';
            btn.style.fontWeight = 'bold';
            btn.style.borderColor = '#1c7c91';
          } else {
            btn.style.background = '#fff';
            btn.style.color = '#333';
          }

          btn.addEventListener('click', function() {
            currentPage = i;
            renderTable();
          });

          paginationDiv.appendChild(btn);
        }
      }

      renderTable();

      searchInput.addEventListener('input', function() { currentPage = 1; renderTable(); });
      filterTahap.addEventListener('change', function() { currentPage = 1; renderTable(); });
      filterStatus.addEventListener('change', function() { currentPage = 1; renderTable(); });

    } else {
      countSpan.textContent = 'Gagal memuat';
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 15px; color: red;">Gagal memuat: ${res.message || 'Sesi kedaluwarsa'}</td></tr>`;
    }
  })
  .catch(err => {
    document.getElementById('countNominasi').textContent = 'Koneksi Gagal';
    document.querySelector('#tableNominasi tbody').innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 15px; color: red;">Gagal terhubung ke server worker.</td></tr>';
  });
});
</script>

---

## Kontak PIP

Ada pertanyaan? Hubungi kami di <a href="mailto:{{ site.school.email }}">{{ site.school.email }}</a>
atau
<a href="https://wa.me/{{ site.school.phone | remove: '+' | remove: '-' | remove: ' ' }}" target="_blank" rel="noopener noreferrer">{{ site.school.phone }}</a>