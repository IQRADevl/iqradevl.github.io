document.addEventListener("DOMContentLoaded", function () {
  const WORKER_BASE_URL = 'https://api.pip.sdislamiqrapetobo.sch.id';
  const ROWS_PER_PAGE = 10;

  function loadPemberianData() {
    const tahunVal = document.getElementById('filterTahunPemberian').value;
    const tahapVal = document.getElementById('filterTahapPemberian').value;
    const statusVal = document.getElementById('filterStatusPemberian').value;
    const searchKeyword = document.getElementById('searchPemberian').value.toLowerCase();
    
    const tbody = document.querySelector('#tablePemberian tbody');
    const countSpan = document.getElementById('countPemberian');
    tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 15px;">Memuat data...</td></tr>';

    let apiUrl = `${WORKER_BASE_URL}/pip-pemberian?tahun=${tahunVal}&tahap=${tahapVal}&cair=${statusVal}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(res => {
        if (res.success && res.data && res.data.data) {
          let rows = res.data.data;

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

              btn.addEventListener('click', () => renderTablePage(i));
              paginationDiv.appendChild(btn);
            }
          }

          renderTablePage(1);

        } else {
          countSpan.textContent = 'Gagal memuat';
          tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 15px; color: red;">${res.message || 'Data kosong'}</td></tr>`;
        }
      })
      .catch(() => {
        countSpan.textContent = 'Koneksi Gagal';
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 15px; color: red;">Gagal terhubung ke server.</td></tr>';
      });
  }

  function loadNominasiData() {
    const tahunVal = document.getElementById('filterTahunNominasi').value;
    const tahapVal = document.getElementById('filterTahapNominasi').value;
    const statusVal = document.getElementById('filterStatusNominasi').value;
    const searchKeyword = document.getElementById('searchNominasi').value.toLowerCase();
    
    const tbody = document.querySelector('#tableNominasi tbody');
    const countSpan = document.getElementById('countNominasi');
    tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 15px;">Memuat data...</td></tr>';

    let apiUrl = `${WORKER_BASE_URL}/pip-nominasi?tahun=${tahunVal}&tahap=${tahapVal}&aktif=${statusVal}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(res => {
        if (res.success && res.data && res.data.data) {
          let rows = res.data.data;

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
                  <td style="padding: 8px 10px;">${row.tanggal_sk || '-'}</td>
                  <td style="padding: 8px 10px;">${row.nomor_sk || '-'}</td>
                  <td style="padding: 8px 10px;">${row.aktif || row.keterangan_pencairan || '-'}</td>
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

              btn.addEventListener('click', () => renderTablePage(i));
              paginationDiv.appendChild(btn);
            }
          }

          renderTablePage(1);

        } else {
          countSpan.textContent = 'Gagal memuat';
          tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 15px; color: red;">${res.message || 'Data kosong'}</td></tr>`;
        }
      })
      .catch(() => {
        countSpan.textContent = 'Koneksi Gagal';
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 15px; color: red;">Gagal terhubung ke server.</td></tr>';
      });
  }

  // Panggil fungsi muat data pertama kali
  loadPemberianData();
  loadNominasiData();

  // Event listener untuk filter Pemberian
  document.getElementById('filterTahunPemberian').addEventListener('change', loadPemberianData);
  document.getElementById('filterTahapPemberian').addEventListener('change', loadPemberianData);
  document.getElementById('filterStatusPemberian').addEventListener('change', loadPemberianData);
  document.getElementById('searchPemberian').addEventListener('input', loadPemberianData);

  // Event listener untuk filter Nominasi
  document.getElementById('filterTahunNominasi').addEventListener('change', loadNominasiData);
  document.getElementById('filterTahapNominasi').addEventListener('change', loadNominasiData);
  document.getElementById('filterStatusNominasi').addEventListener('change', loadNominasiData);
  document.getElementById('searchNominasi').addEventListener('input', loadNominasiData);
});