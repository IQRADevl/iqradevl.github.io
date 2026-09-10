---
layout: default
title: Beranda
---

<section class="hero">
  <div class="wrap hero__inner">
    <div>
      <h1>{{ site.tagline }}</h1>
      <p class="hero__lede">
        {{ site.title }} Membimbing setiap anak belajar dengan gembira, mengasah potensi diri, dan membangun fondasi karakter Islami yang kokoh sejak dini.
      </p>
      <div class="hero__cta">
        <a class="btn btn--primary" href="{{ '/ppdb/' | relative_url }}">Info PPDB</a>
        <a class="btn btn--ghost" href="{{ '/profil/' | relative_url }}">Kenali Sekolah Kami</a>
      </div>
    </div>

    <div class="hero__stats">
      <div class="hero__stat">
        <strong>{{ site.school.founded }}</strong>
        <span>Tahun berdiri</span>
      </div>
      <div class="hero__stat">
        <strong>{{ site.school.students }}</strong>
        <span>Siswa aktif</span>
      </div>
      <div class="hero__stat">
        <strong>{{ site.school.teachers }}</strong>
        <span>Tenaga pengajar</span>
      </div>
      <div class="hero__stat">
        <strong>{{ site.school.accreditation }}</strong>
        <span>Akreditasi</span>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section__head">
      <p class="eyebrow">Program Unggulan</p>
      <h2>Fokus pendampingan dan tumbuh kembang siswa</h2>
    </div>

    <div class="program-list">
      <div class="program-item">
        <h3>Tahfizh & Al-Qur'an</h3>
        <p>Bimbingan hafalan (Juz 30), perbaikan bacaan (Tahsin), serta penanaman adab dan kecintaan pada Al-Qur'an sejak dini.</p>
      </div>
      <div class="program-item">
        <h3>Akademik & Literasi</h3>
        <p>Penguatan fondasi calistung, sains dasar, dan logika berpikir melalui pendekatan Kurikulum Merdeka yang interaktif.</p>
      </div>
      <div class="program-item">
        <h3>Pembiasaan Adab & Karakter</h3>
        <p>Pembentukan akhlakul karimah melalui pembiasaan shalat Dhuha & Dzuhur berjamaah, doa harian, serta kepedulian sosial.</p>
      </div>
      <div class="program-item">
        <h3>Ekstrakurikuler & Minat</h3>
        <p>Wadah eksplorasi bakat siswa melalui eksul Pramuka.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--welcome">
  <div class="wrap welcome__inner">
    
    <!-- Kiri: Teks & Poin 01, 02, 03 -->
    <div class="welcome__content">
      <p class="eyebrow">Tentang Kami</p>
      <h2>Tumbuh Bersama Nilai, Ilmu, dan Karakter</h2>
      <p class="welcome__text">
        Kami hadir untuk menemani perjalanan belajar setiap siswa. Berlandaskan ajaran Islam dan pendidikan berkualitas, kami berkomitmen membentuk generasi yang cerdas secara akademik sekaligus santun dalam berperilaku.
      </p>
      <div class="welcome__features">
        <div class="welcome__feature">
          <strong class="feature-num">01.</strong>
          <h4>Kurikulum Islami</h4>
          <p>Penguatan adab dan hafalan Al-Qur'an harian.</p>
        </div>
        <div class="welcome__feature">
          <strong class="feature-num">02.</strong>
          <h4>Metode Interaktif</h4>
          <p>Belajar menyenangkan berbasis Kurikulum Merdeka.</p>
        </div>
        <div class="welcome__feature">
          <strong class="feature-num">03.</strong>
          <h4>Lingkungan Aman</h4>
          <p>Fasilitas pendukung tumbuh kembang siswa.</p>
        </div>
      </div>
    </div>

    <!-- Kanan: Foto Bingkai Lingkaran -->
    <div class="welcome__media">
      <div class="welcome__circle-bg"></div>
      <img src="{{ '/assets/images/kepala-sekolah-murid.png' | relative_url }}" alt="Kepala Sekolah dan Siswa {{ site.title }}" class="welcome__img">
    </div>

  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    <div class="section__head">
      <p class="eyebrow">Berita</p>
      <h2>Kabar terbaru dari sekolah</h2>
    </div>

    <ul class="bulletin">
      {% for post in site.posts limit: 4 %}
      <li class="bulletin__item">
        <span class="bulletin__date">{{ post.date | date: "%d %b %Y" }}</span>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        {% if post.category %}<span class="bulletin__tag">{{ post.category }}</span>{% endif %}
      </li>
      {% endfor %}
    </ul>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <blockquote class="quote">
      “Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia.”
      <cite>— Nelson Mandela</cite>
    </blockquote>
  </div>
</section>

<section class="cta-band">
  <div class="wrap">
    <div>
      <h2>Pendaftaran siswa baru dibuka</h2>
      <p>Kuota terbatas untuk tahun ajaran mendatang.</p>
    </div>
    <a class="btn btn--primary" href="{{ '/ppdb/' | relative_url }}">Daftar Sekarang</a>
  </div>
</section>