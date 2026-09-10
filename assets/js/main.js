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
      link.addEventListener("click", function () {
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

    statElements.forEach(function (el) {
      var rawText = el.textContent.trim();
      el.setAttribute("data-target", rawText);

      var isPureNumber = !isNaN(parseInt(rawText, 10)) && /^\d+$/.test(rawText);
      
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

        var duration = 1500;
        var stepTime = 30;
        var steps = duration / stepTime;
        var currentStep = 0;

        if (isPureNumber) {
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
          var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

          var timerChar = setInterval(function () {
            currentStep++;
            if (currentStep >= steps) {
              el.textContent = rawTarget;
              clearInterval(timerChar);
            } else {
              var randomLetter = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
              el.textContent = randomLetter;
            }
          }, stepTime);
        }
      });
    };

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
  function initLightbox() {
    if (document.getElementById("lightbox-modal")) return;

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

    var contentImages = document.querySelectorAll(".post__body img, .page__body img, figure img, article img, .post img, .page img");

    contentImages.forEach(function (img) {
      if (img.classList.contains("brand__logo") || img.closest(".brand")) return;

      img.style.cursor = "zoom-in";

      img.addEventListener("click", function () {
        modal.classList.add("is-active");
        modalImg.src = this.src;
        modalImg.alt = this.alt || "Preview gambar";

        var figcaption = this.closest("figure") ? this.closest("figure").querySelector("figcaption") : null;
        modalCaption.textContent = figcaption ? figcaption.textContent : (this.alt !== "Preview gambar" ? this.alt : "");
      });
    });

    function closeLightbox() {
      modal.classList.remove("is-active");
    }

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }

  /* ---------- Back to Top Button ---------- */
  function initBackToTop() {
    if (document.getElementById("back-to-top")) return;

    var btn = document.createElement("button");
    btn.id = "back-to-top";
    btn.className = "back-to-top";
    btn.type = "button";
    btn.setAttribute("aria-label", "Kembali ke atas");
    btn.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>';
    document.body.appendChild(btn);

    function toggleBtn() {
      if (window.scrollY > 300) {
        btn.classList.add("is-visible");
      } else {
        btn.classList.remove("is-visible");
      }
    }

    window.addEventListener("scroll", toggleBtn, { passive: true });

    btn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* ---------- Inisialisasi DOM ---------- */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initLightbox();
      initBackToTop();
    });
  } else {
    initLightbox();
    initBackToTop();
  }

  /* ---------- Image Slider / Carousel ---------- */
  function initCarousel() {
    var carousel = document.getElementById("home-carousel");
    if (!carousel) return;

    var slides = carousel.querySelectorAll(".carousel__slide");
    var dots = carousel.querySelectorAll(".carousel__dot");
    var prevBtn = carousel.querySelector(".carousel__prev");
    var nextBtn = carousel.querySelector(".carousel__next");

    if (!slides.length) return;

    var currentIndex = 0;
    var timer = null;

    function showSlide(index) {
      if (index >= slides.length) currentIndex = 0;
      else if (index < 0) currentIndex = slides.length - 1;
      else currentIndex = index;

      slides.forEach(function (slide, i) {
        slide.classList.toggle("active", i === currentIndex);
      });

      dots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === currentIndex);
      });
    }

    function nextSlide() {
      showSlide(currentIndex + 1);
    }

    function prevSlide() {
      showSlide(currentIndex - 1);
    }

    function startAutoPlay() {
      stopAutoPlay();
      timer = setInterval(nextSlide, 4000); // Berganti otomatis tiap 4 detik
    }

    function stopAutoPlay() {
      if (timer) clearInterval(timer);
    }

    if (nextBtn) nextBtn.addEventListener("click", function () { nextSlide(); startAutoPlay(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prevSlide(); startAutoPlay(); });

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        showSlide(i);
        startAutoPlay();
      });
    });

    carousel.addEventListener("mouseenter", stopAutoPlay);
    carousel.addEventListener("mouseleave", startAutoPlay);

    startAutoPlay();
  }

})();