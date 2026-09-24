---
layout: page
title: Data Induk Sekolah
section: Transparansi
excerpt_text: Ringkasan data sekolah yang bersumber dari pembaruan terbaru Dapodik.
permalink: /data/
---

<div class="school-report" data-school-report>
	<p class="report-status" data-report-status aria-live="polite">Memuat data terbaru...</p>

	<div class="report-meta">
		<span>Sumber: Data Dapodik</span>
		<span>Tanggal pembaruan data: <strong data-field="tanggal_update">-</strong></span>
	</div>

	<section class="report-section" aria-labelledby="report-identity">
		<h2 id="report-identity">Informasi sekolah</h2>
		<dl class="report-grid">
			<div><dt>Nama sekolah</dt><dd data-field="nama">-</dd></div>
			<div><dt>NPSN</dt><dd data-field="npsn">-</dd></div>
			<div><dt>Akreditasi</dt><dd data-field="akreditasi">-</dd></div>
			<div><dt>SK pendirian sekolah</dt><dd data-field="sk_pendirian_sekolah">-</dd></div>
			<div><dt>SK izin operasional</dt><dd data-field="sk_izin_operasional">-</dd></div>
			<div><dt>Tanggal izin operasional</dt><dd data-field="tlg_sk_izin_operasional">-</dd></div>
		</dl>
	</section>

	<section class="report-section" aria-labelledby="report-students">
		<h2 id="report-students">Peserta didik per kelas</h2>
		<div class="report-table-wrap">
			<table class="report-table">
				<thead>
					<tr><th scope="col">Kelas</th><th scope="col">Jumlah peserta didik</th></tr>
				</thead>
				<tbody>
					<tr><th scope="row">Kelas 1</th><td data-field="pd_tk_1">-</td></tr>
					<tr><th scope="row">Kelas 2</th><td data-field="pd_tk_2">-</td></tr>
					<tr><th scope="row">Kelas 3</th><td data-field="pd_tk_3">-</td></tr>
					<tr><th scope="row">Kelas 4</th><td data-field="pd_tk_4">-</td></tr>
					<tr><th scope="row">Kelas 5</th><td data-field="pd_tk_5">-</td></tr>
					<tr><th scope="row">Kelas 6</th><td data-field="pd_tk_6">-</td></tr>
					<tr class="report-table__total"><th scope="row">Total peserta didik</th><td data-field="pd">-</td></tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="report-section" aria-labelledby="report-charts">
		<h2 id="report-charts">Grafik ringkasan</h2>
		<div class="report-charts">
			<div class="report-chart">
				<h3>Peserta didik per kelas</h3>
				<div class="bar-chart" data-chart="classes" aria-label="Grafik peserta didik per kelas"></div>
			</div>
			<div class="report-chart">
				<h3>Komposisi peserta didik</h3>
				<div class="bar-chart" data-chart="gender" aria-label="Grafik peserta didik laki-laki dan perempuan">
					<div class="bar-row"><span>Laki-laki</span><div class="bar-track"><span class="bar-fill" data-bar="pd_l"></span></div><strong data-field="pd_l">-</strong></div>
					<div class="bar-row"><span>Perempuan</span><div class="bar-track"><span class="bar-fill" data-bar="pd_p"></span></div><strong data-field="pd_p">-</strong></div>
				</div>
			</div>
			<div class="report-chart">
				<h3>Komposisi PTK</h3>
				<div class="bar-chart" data-chart="staff" aria-label="Grafik komposisi PTK">
					<div class="bar-row"><span>Guru</span><div class="bar-track"><span class="bar-fill" data-bar="jum_guru"></span></div><strong data-field="jum_guru">-</strong></div>
					<div class="bar-row"><span>Tendik</span><div class="bar-track"><span class="bar-fill" data-bar="jum_tendik"></span></div><strong data-field="jum_tendik">-</strong></div>
				</div>
			</div>
		</div>
	</section>

	<section class="report-section" aria-labelledby="report-staff">
		<h2 id="report-staff">Ringkasan tenaga pendidikan</h2>
		<dl class="report-grid report-grid--numbers">
			<div><dt>Jumlah PTK</dt><dd data-field="jum_ptk">-</dd></div>
			<div><dt>Jumlah guru</dt><dd data-field="jum_guru">-</dd></div>
			<div><dt>Jumlah tendik</dt><dd data-field="jum_tendik">-</dd></div>
		</dl>
	</section>

	<p class="report-note">Data ditampilkan dari record Dapodik dengan tanggal pembaruan paling baru.</p>
</div>
