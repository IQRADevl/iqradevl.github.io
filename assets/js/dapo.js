(function () {
  "use strict";

  var statsContainer = document.querySelector(".hero__stats");
  if (!statsContainer) return;

  var apiUrl = "https://api.dapo.sdislamiqrapetobo.sch.id";
  var statElements = statsContainer.querySelectorAll(".hero__stat strong[data-api-field]");

  statsContainer.classList.remove("hero__stats");

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

  fetch(apiUrl)
    .then(function (response) {
      if (!response.ok) throw new Error("Gagal mengambil data Dapodik");
      return response.json();
    })
    .then(applyApiStats)
    .catch(function () {
      return;
    })
    .finally(function () {
      statsContainer.classList.add("hero__stats");
    });

  setTimeout(function () {
    statsContainer.classList.add("hero__stats");
  }, 0);
})();
