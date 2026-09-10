(function () {
  "use strict";

  /* ---------- Menu hamburger ---------- */
  var hamburger = document.getElementById("hamburger");
  var nav = document.getElementById("site-nav");

  function closeNav() {
    if (!nav || !hamburger) return;
    nav.setAttribute("data-state", "closed");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Buka menu navigasi");
  }

  function openNav() {
    if (!nav || !hamburger) return;
    nav.setAttribute("data-state", "open");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Tutup menu navigasi");
  }

  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      var isOpen = hamburger.getAttribute("aria-expanded") === "true";
      isOpen ? closeNav() : openNav();
    });

    // Tutup menu saat tautan diklik, KECUALI menu pemicu dropdown (seperti Layanan)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (link.parentElement.classList.contains("has-dropdown")) {
          return; // Biarkan dropdown terbuka, jangan tutup hamburger
        }
        closeNav();
      });
    });

    // Tutup menu dengan tombol Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    // Reset saat layar dilebarkan ke ukuran desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeNav();
    });
  }

  /* ---------- Mode gelap / terang ---------- */
  var themeToggle = document.getElementById("theme-toggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var root = document.documentElement;
      var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }


  /* ---------- Animasi Statistik / Counter ---------- */
  var statsContainer = document.querySelector(".hero__stats");

  if (statsContainer) {
    var animated = false;
    var statElements = statsContainer.querySelectorAll(".hero__stat strong");

    // Simpan target asli dari Liquid Jekyll
    statElements.forEach(function (el) {
      var rawText = el.textContent.trim();
      el.setAttribute("data-target", rawText);

      var isPureNumber = !isNaN(parseInt(rawText, 10)) && /^\d+$/.test(rawText);
      
      // Set tampilan awal sebelum animasi jalan
      if (isPureNumber) {
        el.textContent = "0";
      } else {
        el.textContent = "A";
      }
    });

    var startCounterAnimation = function () {
      statElements.forEach(function (el) {
        var rawTarget = el.getAttribute("data-target");
        var targetNumber = parseInt(rawTarget, 10);
        var isPureNumber = !isNaN(targetNumber) && /^\d+$/.test(rawTarget);

        var duration = 1500; // Durasi total animasi (1.5 detik)
        var stepTime = 30;
        var steps = duration / stepTime;
        var currentStep = 0;

        if (isPureNumber) {
          // Animasi hitung angka (0 -> Target)
          var increment = targetNumber / steps;
          var currentNum = 0;

          var timerNum = setInterval(function () {
            currentNum += increment;
            currentStep++;
            if (currentStep >= steps || currentNum >= targetNumber) {
              el.textContent = targetNumber;
              clearInterval(timerNum);
            } else {
              el.textContent = Math.floor(currentNum);
            }
          }, stepTime);

        } else {
          // Animasi acak abjad untuk huruf Akreditasi (A-Z -> Target "B")
          var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

          var timerChar = setInterval(function () {
            currentStep++;
            if (currentStep >= steps) {
              el.textContent = rawTarget; // Kunci ke nilai akhir (misal "B")
              clearInterval(timerChar);
            } else {
              var randomLetter = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
              el.textContent = randomLetter;
            }
          }, stepTime);
        }
      });
    };

    // Jalankan animasi saat elemen masuk ke area layar
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !animated) {
              animated = true;
              startCounterAnimation();
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(statsContainer);
    } else {
      startCounterAnimation();
    }
  }

  /* ---------- Lightbox / Preview Gambar ---------- */
  // Buat elemen modal secara otomatis di DOM
  var modal = document.createElement("div");
  modal.className = "lightbox";
  modal.id = "lightbox-modal";
  modal.innerHTML = 
    '<span class="lightbox__close" aria-label="Tutup">&times;</span>' +
    '<img class="lightbox__content" id="lightbox-img" alt="Preview Gambar">' +
    '<div class="lightbox__caption" id="lightbox-caption"></div>';
  document.body.appendChild(modal);

  var modalImg = document.getElementById("lightbox-img");
  var modalCaption = document.getElementById("lightbox-caption");
  var closeBtn = modal.querySelector(".lightbox__close");

  // Pasang listener klik ke seluruh gambar dalam konten (post, page, atau figure)
  var contentImages = document.querySelectorAll(".post__body img, .page__body img, figure img");

  contentImages.forEach(function (img) {
    img.style.cursor = "zoom-in"; // Mengubah kursor jadi ikon kaca pembesar

    img.addEventListener("click", function () {
      modal.classList.add("is-active");
      modalImg.src = this.src;
      modalImg.alt = this.alt || "Preview gambar";

      // Ambil teks caption dari figcaption (jika ada) atau alt gambar
      var figcaption = this.closest("figure") ? this.closest("figure").querySelector("figcaption") : null;
      modalCaption.textContent = figcaption ? figcaption.textContent : this.alt;
    });
  });

  function closeLightbox() {
    modal.classList.remove("is-active");
  }

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

  // Tutup jika area gelap di luar gambar diklik
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeLightbox();
  });

  // Tutup dengan tombol Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

})();