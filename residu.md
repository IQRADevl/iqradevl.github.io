---
layout: page
title: Data Residu VervalPD
permalink: /residu/
---

<style>
  .residu-table-wrapper {
    overflow-x: auto;
    margin-top: 15px;
  }
  .residu-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .residu-table th, .residu-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    white-space: nowrap;
  }
  .residu-table th {
    background-color: #f4f4f4;
  }
  .badge-ok { color: #2e7d32; font-weight: bold; }
  .badge-err { color: #c62828; font-weight: bold; }
</style>

<h2>Data Residu VervalPD</h2>

<div class="residu-table-wrapper">
  <table class="residu-table">
    <thead>
      <tr>
        <th>No</th>
        <th>Nama</th>
        <th>NISN</th>
        <th>Rombel/Sekolah</th>
        <th>Val. NISN</th>
        <th>NIK Dukcapil</th>
        <th>NIK Ganda</th>
        <th>Val. Nama</th>
        <th>Tempat Lahir</th>
        <th>Tanggal Lahir</th>
        <th>Ibu Kandung</th>
        <th>Jenis Kelamin</th>
        <th>Desa/Kelurahan</th>
      </tr>
    </thead>
    <tbody id="residu-body">
      <tr>
        <td colspan="13" style="text-align: center;">Memuat data residu...</td>
      </tr>
    </tbody>
  </table>
</div>

<script>
  const WORKER_URL = "https://residuvervalapi.sdislamiqrapetobo.sch.id";

  function formatStatus(val) {
    if (!val || val === "OK" || val === "Unik" || val === "Padan") {
      return `<span class="badge-ok">✔ ${val || "OK"}</span>`;
    }
    return `<span class="badge-err">✘ ${val}</span>`;
  }

  document.addEventListener("DOMContentLoaded", function() {
    fetch(WORKER_URL)
      .then(res => res.json())
      .then(data => {
        const tbody = document.getElementById("residu-body");
        tbody.innerHTML = "";

        if (!data || data.length === 0) {
          tbody.innerHTML = "<tr><td colspan='13' style='text-align:center;'>Tidak ada data residu.</td></tr>";
          return;
        }

        data.forEach((siswa, i) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${i + 1}</td>
            <td><strong>${siswa.nama}</strong></td>
            <td>${siswa.nisn || "-"}</td>
            <td>${siswa.rombel}</td>
            <td>${formatStatus(siswa.val_nisn)}</td>
            <td>${formatStatus(siswa.val_nik_dukcapil)}</td>
            <td>${formatStatus(siswa.val_nik_ganda)}</td>
            <td>${formatStatus(siswa.val_nama)}</td>
            <td>${formatStatus(siswa.val_tempat_lahir)}</td>
            <td>${formatStatus(siswa.val_tanggal_lahir)}</td>
            <td>${formatStatus(siswa.val_ibu_kandung)}</td>
            <td>${formatStatus(siswa.val_jenis_kelamin)}</td>
            <td>${formatStatus(siswa.val_desa_kelurahan)}</td>
          `;
          tbody.appendChild(tr);
        });
      })
      .catch(err => {
        console.error(err);
        document.getElementById("residu-body").innerHTML = 
          "<tr><td colspan='13' style='text-align:center; color:red;'>Gagal memuat data residu.</td></tr>";
      });
  });
</script>