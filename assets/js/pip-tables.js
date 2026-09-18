document.addEventListener("DOMContentLoaded", function () {
  const WORKER_BASE_URL = 'https://api.pip.sdislamiqrapetobo.sch.id';
  const ROWS_PER_PAGE = 10;
  let pemberianRowsCache = null;
  let nominasiRowsCache = null;
  let pemberianDataPromise = null;
  let nominasiDataPromise = null;

  // Fungsi helper untuk mengisi dropdown secara dinamis dengan styling adaptif Dark/Light Mode
  function populateSelect(selectElement, valuesSet, defaultText) {
    const currentValue = selectElement.value; 
    
    // Memberikan background & warna teks yang jelas pada opsi default
    selectElement.innerHTML = `<option value="all">${defaultText}</option>`;
    
    Array.from(valuesSet).sort().forEach(val => {
      if (val && val !== 'all') {
        let opt = document.createElement('option');
        opt.value = val;
        opt.textContent = val;
        selectElement.appendChild(opt);
      }
    });

    // Kembalikan pilihan sebelumnya jika masih ada di opsi baru
    if (Array.from(selectElement.options).some(opt => opt.value === currentValue)) {
      selectElement.value = currentValue;
    } else {
      selectElement.value = 'all';
    }
  }

  function getAktivasiStatus(row) {
    const value = row && row.tanggal_aktivasi;
    const text = value == null ? '' : String(value).trim();
    return text !== '' && text.toLowerCase() !== 'null' ? 'Sudah Aktivasi' : 'Belum Aktivasi';
  }

  function scrollToTableHeader(tableId) {
    const table = document.getElementById(tableId);
    const siteHeader = document.querySelector('.site-header');
    if (!table) return;

    const headerHeight = siteHeader ? siteHeader.getBoundingClientRect().height : 0;
    const targetTop = table.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
  }

  const TAHUN_AKTIF = '2026';

  function loadPemberianData() {
    const tahunVal = TAHUN_AKTIF;
    const tahapVal = document.getElementById('filterTahapPemberian').value;
    const statusVal = document.getElementById('filterStatusPemberian').value;
    const searchKeyword = document.getElementById('searchPemberian').value.toLowerCase();
    
    const tbody = document.querySelector('#tablePemberian tbody');
    const countSpan = document.getElementById('countPemberian');
    const selectTahap = document.getElementById('filterTahapPemberian');
    const selectStatus = document.getElementById('filterStatusPemberian');
    
    tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 15px;">Memuat data...</td></tr>';

    let apiUrl = `${WORKER_BASE_URL}/pip-pemberian?tahun=${tahunVal}&tahap=all&cair=all`;

    const dataPromise = pemberianRowsCache
      ? Promise.resolve(pemberianRowsCache)
      : (pemberianDataPromise ||= fetch(apiUrl)
          .then(response => response.json())
          .then(res => {
            if (!res.success || !res.data || !res.data.data) {
              throw new Error(res.message || 'Data kosong');
            }
            pemberianRowsCache = res.data.data;
            return pemberianRowsCache;
          }));

    dataPromise
      .then(data => {
          let rows = data;

          // 1. Kumpulkan daftar Tahap & Status unik dari data yang diterima
          let tahapSet = new Set();
          let statusSet = new Set();
          rows.forEach(r => {
            if (r.tahap_id) tahapSet.add(String(r.tahap_id));
            if (r.status_cair) statusSet.add(String(r.status_cair));
          });

          populateSelect(selectTahap, tahapSet, "Semua Tahap");
          populateSelect(selectStatus, statusSet, "Semua Status");

          // 2. Ambil ulang nilai filter yang sedang aktif
          const currentTahapVal = document.getElementById('filterTahapPemberian').value;
          const currentStatusVal = document.getElementById('filterStatusPemberian').value;

          // 3. Filter lokal berdasarkan tahap
          if (currentTahapVal && currentTahapVal !== 'all') {
            rows = rows.filter(r => String(r.tahap_id) === String(currentTahapVal));
          }

          // 4. Filter lokal berdasarkan status cair
          if (currentStatusVal && currentStatusVal !== 'all') {
            rows = rows.filter(r => String(r.status_cair) === String(currentStatusVal));
          }

          // 5. Filter lokal pencarian teks nama/nisn
          if (searchKeyword) {
            rows = rows.filter(r => 
              (r.nisn || '').toLowerCase().includes(searchKeyword) || 
              (r.nama_pd || '').toLowerCase().includes(searchKeyword)
            );
          }

          let currentPage = 1;
          const totalPages = Math.ceil(rows.length / ROWS_PER_PAGE) || 1;

          function renderTablePage(page) {
            currentPage = page;
            const start = (currentPage - 1) * ROWS_PER_PAGE;
            const paginatedData = rows.slice(start, start + ROWS_PER_PAGE);

            tbody.innerHTML = '';
            if (paginatedData.length === 0) {
              tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 15px;">Tidak ada data ditemukan.</td></tr>';
            } else {
              paginatedData.forEach((row, index) => {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                  <td style="padding: 8px 10px;">${start + index + 1}</td>
                  <td style="padding: 8px 10px;">${row.nisn || '-'}</td>
                  <td style="padding: 8px 10px; font-weight: 500;">${row.nama_pd || '-'}</td>
                  <td style="padding: 8px 10px;">${row.rombel || row.kelas || '-'}</td>
                  <td style="padding: 8px 10px; text-align: center; font-weight: 600;">${row.tahap_id || '-'}</td>
                  <td style="padding: 8px 10px;">${row.keterangan_pencairan || '-'}</td>
                  <td style="padding: 8px 10px;">${row.tanggal_sk || '-'}</td>
                  <td style="padding: 8px 10px; font-weight: 600; color: ${row.status_cair === 'Sudah Cair' ? '#2ecc71' : '#e74c3c'};">${row.status_cair || '-'}</td>
                `;
                tbody.appendChild(tr);
              });
            }
            countSpan.textContent = `Ditampilkan: ${rows.length} siswa`;
            renderPagination(totalPages);
          }

          function renderPagination(total) {
            const paginationDiv = document.getElementById('paginationPemberian');
            paginationDiv.innerHTML = '';
            if (total <= 1) return;

            for (let i = 1; i <= total; i++) {
              let btn = document.createElement('button');
              btn.textContent = i;
              btn.style.padding = '5px 10px';
              btn.style.border = '1px solid var(--border-color, #ccc)';
              btn.style.borderRadius = '4px';
              btn.style.cursor = 'pointer';
              btn.style.fontSize = '13px';
              
              if (i === currentPage) {
                btn.style.background = '#1c7c91';
                btn.style.color = 'white';
                btn.style.fontWeight = 'bold';
                btn.style.borderColor = '#1c7c91';
              } else {
                btn.style.background = 'var(--input-bg, var(--card-background, #fff))';
                btn.style.color = 'var(--text-color, #333)';
              }

              btn.addEventListener('click', () => {
                renderTablePage(i);
                scrollToTableHeader('tablePemberian');
              });
              paginationDiv.appendChild(btn);
            }
          }

          renderTablePage(1);

      })
      .catch(error => {
        countSpan.textContent = 'Koneksi Gagal';
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 15px; color: red;">${error.message || 'Gagal terhubung ke server.'}</td></tr>`;
      });
  }

  function loadNominasiData() {
    const tahunVal = TAHUN_AKTIF;
    const tahapVal = document.getElementById('filterTahapNominasi').value;
    const statusVal = document.getElementById('filterStatusNominasi').value;
    const searchKeyword = document.getElementById('searchNominasi').value.toLowerCase();
    
    const tbody = document.querySelector('#tableNominasi tbody');
    const countSpan = document.getElementById('countNominasi');
    const selectTahap = document.getElementById('filterTahapNominasi');
    const selectStatus = document.getElementById('filterStatusNominasi');
    
    tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 15px;">Memuat data...</td></tr>';

    let apiUrl = `${WORKER_BASE_URL}/pip-nominasi?tahun=${tahunVal}&tahap=all&aktif=all`;

    const dataPromise = nominasiRowsCache
      ? Promise.resolve(nominasiRowsCache)
      : (nominasiDataPromise ||= fetch(apiUrl)
          .then(response => response.json())
          .then(res => {
            if (!res.success || !res.data || !res.data.data) {
              throw new Error(res.message || 'Data kosong');
            }
            nominasiRowsCache = res.data.data;
            return nominasiRowsCache;
          }));

    dataPromise
      .then(data => {
          let rows = data;

          // 1. Kumpulkan daftar Tahap & Status Aktivasi unik dari data tahun tersebut
          let tahapSet = new Set();
          let statusSet = new Set();
          rows.forEach(r => {
            if (r.tahap_id) tahapSet.add(String(r.tahap_id));
            statusSet.add(getAktivasiStatus(r));
          });

          populateSelect(selectTahap, tahapSet, "Semua Tahap");
          populateSelect(selectStatus, statusSet, "Semua Status Aktivasi");

          // 2. Ambil ulang nilai filter yang sedang aktif
          const currentTahapVal = document.getElementById('filterTahapNominasi').value;
          const currentStatusVal = document.getElementById('filterStatusNominasi').value;

          // 3. Filter lokal berdasarkan tahap
          if (currentTahapVal && currentTahapVal !== 'all') {
            rows = rows.filter(r => String(r.tahap_id) === String(currentTahapVal));
          }

          // 4. Filter lokal berdasarkan status aktivasi saja
          if (currentStatusVal && currentStatusVal !== 'all') {
            rows = rows.filter(r => {
              const aktivasiStatus = getAktivasiStatus(r);
              return aktivasiStatus === String(currentStatusVal);
            });
          }

          // 5. Filter lokal pencarian teks
          if (searchKeyword) {
            rows = rows.filter(r => 
              (r.nisn || '').toLowerCase().includes(searchKeyword) || 
              (r.nama_pd || '').toLowerCase().includes(searchKeyword)
            );
          }

          let currentPage = 1;
          const totalPages = Math.ceil(rows.length / ROWS_PER_PAGE) || 1;

          function renderTablePage(page) {
            currentPage = page;
            const start = (currentPage - 1) * ROWS_PER_PAGE;
            const paginatedData = rows.slice(start, start + ROWS_PER_PAGE);

            tbody.innerHTML = '';
            if (paginatedData.length === 0) {
              tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 15px;">Tidak ada data ditemukan.</td></tr>';
            } else {
              paginatedData.forEach((row, index) => {
                let tr = document.createElement('tr');
                const aktivasiStatus = getAktivasiStatus(row);
                const aktivasiColor = aktivasiStatus === 'Sudah Aktivasi' ? '#2ecc71' : '#e74c3c';

                tr.innerHTML = `
                  <td style="padding: 8px 10px;">${start + index + 1}</td>
                  <td style="padding: 8px 10px;">${row.nisn || '-'}</td>
                  <td style="padding: 8px 10px; font-weight: 500;">${row.nama_pd || '-'}</td>
                  <td style="padding: 8px 10px;">${row.rombel || row.kelas || '-'}</td>
                  <td style="padding: 8px 10px; text-align: center; font-weight: 600;">${row.tahap_id || '-'}</td>
                  <td style="padding: 8px 10px;">${row.tanggal_sk || '-'}</td>
                  <td style="padding: 8px 10px;">${row.aktif || row.keterangan_pencairan || '-'}</td>
                  <td style="padding: 8px 10px; font-weight: 600; color: ${aktivasiColor};">${aktivasiStatus}</td>
                `;
                tbody.appendChild(tr);
              });
            }
            countSpan.textContent = `Ditampilkan: ${rows.length} siswa`;
            renderPagination(totalPages);
          }

          function renderPagination(total) {
            const paginationDiv = document.getElementById('paginationNominasi');
            paginationDiv.innerHTML = '';
            if (total <= 1) return;

            for (let i = 1; i <= total; i++) {
              let btn = document.createElement('button');
              btn.textContent = i;
              btn.style.padding = '5px 10px';
              btn.style.border = '1px solid var(--border-color, #ccc)';
              btn.style.borderRadius = '4px';
              btn.style.cursor = 'pointer';
              btn.style.fontSize = '13px';
              
              if (i === currentPage) {
                btn.style.background = '#1c7c91';
                btn.style.color = 'white';
                btn.style.fontWeight = 'bold';
                btn.style.borderColor = '#1c7c91';
              } else {
                btn.style.background = 'var(--input-bg, var(--card-background, #fff))';
                btn.style.color = 'var(--text-color, #333)';
              }

              btn.addEventListener('click', () => {
                renderTablePage(i);
                scrollToTableHeader('tableNominasi');
              });
              paginationDiv.appendChild(btn);
            }
          }

          renderTablePage(1);

      })
      .catch(error => {
        countSpan.textContent = 'Koneksi Gagal';
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 15px; color: red;">${error.message || 'Gagal terhubung ke server.'}</td></tr>`;
      });
  }

  // Panggil fungsi muat data pertama kali saat halaman dibuka
  loadPemberianData();
  loadNominasiData();

  // Event listener untuk filter Pemberian
  document.getElementById('filterTahapPemberian').addEventListener('change', loadPemberianData);
  document.getElementById('filterStatusPemberian').addEventListener('change', loadPemberianData);
  document.getElementById('searchPemberian').addEventListener('input', debounce(loadPemberianData));

  // Event listener untuk filter Nominasi
  document.getElementById('filterTahapNominasi').addEventListener('change', loadNominasiData);
  document.getElementById('filterStatusNominasi').addEventListener('change', loadNominasiData);
  document.getElementById('searchNominasi').addEventListener('input', debounce(loadNominasiData));

  function debounce(callback, delay = 250) {
    let timeoutId;
    return function () {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback(), delay);
    };
  }
});