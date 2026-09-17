---
layout: page
title: Data Residu VervalPD
permalink: /residu/
---

<style>
  .residu-table-wrapper {
    --residu-surface: var(--surface, #fff);
    --residu-surface-alt: var(--bg-alt, #eef6f2);
    --residu-ink: var(--ink, #12211d);
    --residu-muted: var(--ink-soft, #4a5f58);
    --residu-line: var(--line, #d8e8e2);
    --residu-accent: var(--teal-700, #0e6b58);
    --residu-ok: #176b43;
    --residu-ok-bg: #e5f5ec;
    --residu-err: #a32929;
    --residu-err-bg: #fbe9e9;
    overflow-x: auto;
    margin-top: 1.5rem;
    border: 1px solid var(--residu-line);
    border-radius: 10px;
    background: var(--residu-surface);
    box-shadow: 0 8px 24px rgba(11, 74, 61, .08);
  }

  html[data-theme="dark"] .residu-table-wrapper {
    --residu-ok: #74d6a2;
    --residu-ok-bg: #153b2a;
    --residu-err: #ff9292;
    --residu-err-bg: #4a2022;
    box-shadow: 0 8px 24px rgba(0, 0, 0, .2);
  }

  .residu-table {
    width: 100%;
    min-width: 1120px;
    border-collapse: separate;
    border-spacing: 0;
    color: var(--residu-ink);
    font-size: .875rem;
    line-height: 1.4;
  }

  .residu-table caption {
    padding: 1rem 1.25rem;
    color: var(--residu-muted);
    font-size: .875rem;
    text-align: left;
  }

  .residu-table th,
  .residu-table td {
    padding: .85rem 1rem;
    border-bottom: 1px solid var(--residu-line);
    text-align: left;
    white-space: nowrap;
  }

  .residu-table th {
    position: sticky;
    top: 0;
    z-index: 1;
    background: var(--residu-accent);
    color: #fff;
    font-size: .75rem;
    letter-spacing: .04em;
    text-transform: uppercase;
  }

  .residu-table tbody tr:nth-child(even) { background: var(--residu-surface-alt); }
  .residu-table tbody tr:hover { background: var(--teal-100, #e3f3ed); }
  .residu-table tbody tr:last-child td { border-bottom: 0; }
  .residu-table td:first-child,
  .residu-table th:first-child { text-align: center; }
  .residu-table td:nth-child(2) { font-weight: 600; }

  .badge-ok,
  .badge-err {
    display: inline-flex;
    align-items: center;
    gap: .3rem;
    padding: .25rem .55rem;
    border-radius: 999px;
    font-size: .75rem;
    font-weight: 700;
  }
  .badge-ok { background: var(--residu-ok-bg); color: var(--residu-ok); }
  .badge-err { background: var(--residu-err-bg); color: var(--residu-err); }

  .residu-table__state {
    padding: 2.5rem 1rem !important;
    color: var(--residu-muted);
    text-align: center !important;
  }
  .residu-table__state--error { color: var(--residu-err); }

  @media (max-width: 640px) {
    .residu-table-wrapper { margin-inline: -.75rem; border-inline: 0; border-radius: 0; }
    .residu-table caption { padding-inline: 1rem; }
  }
</style>

<div class="residu-table-wrapper">
  <table class="residu-table">
    <caption>Daftar pemeriksaan data peserta didik</caption>
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
        <td class="residu-table__state" colspan="13">Memuat data residu...</td>
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
          tbody.innerHTML = "<tr><td class='residu-table__state' colspan='13'>Tidak ada data residu.</td></tr>";
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
          "<tr><td class='residu-table__state residu-table__state--error' colspan='13'>Gagal memuat data residu.</td></tr>";
      });
  });
</script>