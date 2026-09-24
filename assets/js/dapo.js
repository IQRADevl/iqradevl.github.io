(function () {
  "use strict";

  var statsContainer = document.querySelector(".hero__stats");
  if (!statsContainer) return;

  var apiUrl = "https://api.dapo.sdislamiqrapetobo.sch.id";
  var statElements = statsContainer.querySelectorAll(".hero__stat strong");
  var apiSettled = false;
  var statsVisible = false;
  var animated = false;

  function isPureNumber(value) {
    return /^\d+$/.test(value);
  }

  function startCounterAnimation() {
    statElements.forEach(function (element) {
      var targetText = element.textContent.trim();

      if (!isPureNumber(targetText)) return;

      var targetNumber = parseInt(targetText, 10);
      var duration = 1500;
      var steps = duration / 30;
      var increment = targetNumber / steps;
      var currentNumber = 0;
      var currentStep = 0;

      element.textContent = "0";

      var timer = setInterval(function () {
        currentNumber += increment;
        currentStep++;

        if (currentStep >= steps || currentNumber >= targetNumber) {
          element.textContent = String(targetNumber);
          clearInterval(timer);
        } else {
          element.textContent = String(Math.floor(currentNumber));
        }
      }, 30);
    });
  }

  function maybeStartCounter() {
    if (apiSettled && statsVisible && !animated) {
      animated = true;
      startCounterAnimation();
    }
  }

  function applyApiStats(payload) {
    var row = payload && Array.isArray(payload.data) ? payload.data[0] : null;
    if (!row || typeof row !== "object") return;

    statElements.forEach(function (element) {
      var field = element.getAttribute("data-api-field");
      var value = field ? row[field] : null;

      if (value !== undefined && value !== null && String(value).trim() !== "") {
        element.textContent = String(value);
      }
    });
  }

  var controller = new AbortController();
  var timeout = setTimeout(function () {
    controller.abort();
  }, 10000);

  fetch(apiUrl, { signal: controller.signal })
    .then(function (response) {
      if (!response.ok) throw new Error("Gagal mengambil data Dapodik");
      return response.json();
    })
    .then(applyApiStats)
    .catch(function () {
      return;
    })
    .finally(function () {
      clearTimeout(timeout);
      apiSettled = true;
      maybeStartCounter();
    });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          statsVisible = true;
          maybeStartCounter();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsContainer);
  } else {
    statsVisible = true;
    maybeStartCounter();
  }
})();
