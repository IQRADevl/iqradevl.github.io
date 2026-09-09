---
layout: page
title: Berita
section: Berita
---

<ul class="bulletin">
  {% assign posts = paginator.posts | default: site.posts %}
  {% for post in posts %}
  <li class="bulletin__item">
    <span class="bulletin__date">{{ post.date | date: "%d %b %Y" }}</span>
    <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    {% if post.category %}<span class="bulletin__tag">{{ post.category }}</span>{% endif %}
  </li>
  {% endfor %}
</ul>

{% if paginator.total_pages > 1 %}
<nav class="post__nav" aria-label="Navigasi Halaman Berita">
  {% if paginator.previous_page %}
    <a href="{{ paginator.previous_page_path | relative_url }}">← Berita Lebih Baru</a>
  {% else %}
    <span></span>
  {% endif %}

  <span>Halaman {{ paginator.page }} dari {{ paginator.total_pages }}</span>

  {% if paginator.next_page %}
    <a href="{{ paginator.next_page_path | relative_url }}">Berita Lebih Lama →</a>
  {% endif %}
</nav>
{% endif %}