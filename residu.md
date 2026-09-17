---
layout: default
title: Data Residu VervalPD
permalink: /residu/
---

<div class="residu-container">
  <h2>Data Residu Siswa VervalPD</h2>
  
  <table id="tabel-residu" style="width:100%; border-collapse: collapse; margin-top: 15px;">
    <thead>
      <tr style="background-color: #f2f2f2; text-align: left;">
        <th style="padding: 8px; border: 1px solid #ddd;">No</th>
        <th style="padding: 8px; border: 1px solid #ddd;">Nama Siswa</th>
        <th style="padding: 8px; border: 1px solid #ddd;">NIK</th>
        <th style="padding: 8px; border: 1px solid #ddd;">Status NISN</th>
        <th style="padding: 8px; border: 1px solid #ddd;">Status Dukcapil</th>
      </tr>
    </thead>
    <tbody id="residu-body">
      <tr>
        <td colspan="5" style="text-align: center; padding: 12px;">Sedang mengambil data dari VervalPD...</td>
      </tr>
    </tbody>
  </table>
</div>

<script>
  const WORKER_URL = "https://residuvervalapi.sdislamiqrapetobo.sch.id";

  document.addEventListener("DOMContentLoaded", function() {
    fetch(WORKER_URL)
      .then(response => {
        if (!response.ok) throw new Error("Gagal mengambil data");
        return response.json();
      })
      .then(data => {
        const tbody = document.getElementById("residu-body");
        tbody.innerHTML = "";

        if (!data || data.length === 0) {
          tbody.innerHTML = "<tr><td colspan='5' style='text-align:center; padding:12px;'>Tidak ada data residu.</td></tr>";
          return;
        }

        data.forEach((siswa, index) => {
          const row = document.createElement("tr");

          // Warna indikator sederhana
          const statusNisn = siswa.status_nisn === "OK" 
            ? `<span style="color: green;">✔ OK</span>` 
            : `<span style="color: red;">✘ ${siswa.status_nisn}</span>`;

          const statusDukcapil = siswa.status_dukcapil === "OK" 
            ? `<span style="color: green;">✔ Padan</span>` 
            : `<span style="color: red;">✘ ${siswa.status_dukcapil}</span>`;

          row.innerHTML = `
            <td style="padding: 8px; border: 1px solid #ddd;">${index + 1}</td>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>${siswa.nama}</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${siswa.nik}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${statusNisn}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${statusDukcapil}</td>
          `;
          tbody.appendChild(row);
        });
      })
      .catch(error => {
        console.error("Error:", error);
        document.getElementById("residu-body").innerHTML = 
          `<tr><td colspan="5" style="text-align:center; color:red; padding:12px;">Gagal memuat data. Cookie VervalPD mungkin kadaluarsa.</td></tr>`;
      });
  });
</script>