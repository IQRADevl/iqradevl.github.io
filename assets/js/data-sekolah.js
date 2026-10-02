(function () {
  "use strict";

  var report = document.querySelector("[data-school-report]");
  if (!report) return;

  var apiUrl = "https://api.dapo.sdislamiqrapetobo.sch.id/getData?npsn=40203707";
  var ikdApiUrl = "https://api.dapo.sdislamiqrapetobo.sch.id/getIKD?npsn=40203707";
  var statusElement = report.querySelector("[data-report-status]");
  var updatedElement = report.querySelector("[data-field='tanggal_update']");
  var controller = new AbortController();
  var timeout = setTimeout(function () {
    controller.abort();
  }, 10000);

  function getLatestRecord(payload) {
    var records = payload && Array.isArray(payload.data) ? payload.data : [];
    var latestRecord = null;
    var latestTimestamp = -Infinity;

    records.forEach(function (record) {
      if (!record || typeof record !== "object") return;

      var timestamp = Date.parse(String(record.tanggal_update || "").replace(" ", "T"));
      if (!isNaN(timestamp) && timestamp > latestTimestamp) {
        latestRecord = record;
        latestTimestamp = timestamp;
      }
    });

    return latestRecord;
  }

  function formatValue(value, field) {
    if (field === "tanggal_update") {
      return value ? String(value).replace(" ", " pukul ") : "-";
    }

    if (typeof value === "number") {
      return new Intl.NumberFormat("id-ID").format(value);
    }

    return value === undefined || value === null || String(value).trim() === ""
      ? "-"
      : String(value);
  }

  function setBarWidth(field, value, maximum) {
    report.querySelectorAll("[data-bar='" + field + "']").forEach(function (bar) {
      var numericValue = Number(value) || 0;
      var percentage = maximum > 0 ? (numericValue / maximum) * 100 : 0;
      bar.style.width = Math.max(0, Math.min(100, percentage)) + "%";
    });
  }

  function renderClassChart(record) {
    var chart = report.querySelector("[data-chart='classes']");
    if (!chart) return;

    var classes = [1, 2, 3, 4, 5, 6].map(function (grade) {
      return { label: "Kelas " + grade, value: Number(record["pd_tk_" + grade]) || 0 };
    });
    var maximum = Math.max.apply(null, classes.map(function (item) { return item.value; }).concat([1]));

    chart.innerHTML = classes.map(function (item) {
      var width = (item.value / maximum) * 100;
      return "<div class=\"bar-row\"><span>" + item.label + "</span><div class=\"bar-track\"><span class=\"bar-fill\" style=\"width: " + width + "%\"></span></div><strong>" + formatValue(item.value) + "</strong></div>";
    }).join("");
  }

  function renderBars(record) {
    var genderMaximum = Math.max(Number(record.pd_l) || 0, Number(record.pd_p) || 0, 1);
    var staffMaximum = Math.max(Number(record.jum_guru) || 0, Number(record.jum_tendik) || 0, 1);
    setBarWidth("pd_l", record.pd_l, genderMaximum);
    setBarWidth("pd_p", record.pd_p, genderMaximum);
    setBarWidth("jum_guru", record.jum_guru, staffMaximum);
    setBarWidth("jum_tendik", record.jum_tendik, staffMaximum);
    renderClassChart(record);
  }

  function renderMap(record) {
    var map = report.querySelector("[data-report-map]");
    var mapLink = report.querySelector("[data-map-link]");
    var latitude = Number(record.lintang);
    var longitude = Number(record.bujur);
    var validCoordinates = Number.isFinite(latitude) && Number.isFinite(longitude) &&
      latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;

    if (!map || !validCoordinates) return;

    var coordinates = latitude + "," + longitude;
    var mapUrl = "https://www.google.com/maps?q=" + encodeURIComponent(coordinates) + "&z=17&output=embed";
    var mapLinkUrl = "https://www.google.com/maps?q=" + encodeURIComponent(coordinates);
    var iframe = document.createElement("iframe");

    iframe.src = mapUrl;
    iframe.title = "Peta lokasi sekolah";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.setAttribute("allowfullscreen", "");
    map.replaceChildren(iframe);

    if (mapLink) mapLink.href = mapLinkUrl;
  }

  function renderRecord(record) {
    report.querySelectorAll("[data-field]").forEach(function (element) {
      var field = element.getAttribute("data-field");
      element.textContent = formatValue(record[field], field);
    });

    renderBars(record);
    renderMap(record);

    report.classList.add("is-loaded");
    if (statusElement) statusElement.textContent = "Data berhasil diperbarui.";
  }

  function formatPercent(value) {
    var numericValue = Number(value);
    return Number.isFinite(numericValue)
      ? new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(numericValue) + "%"
      : "-";
  }

  function renderIkd(payload) {
    var sourceRows = payload && Array.isArray(payload.data) ? payload.data : [];
    var overview = report.querySelector("[data-ikd-overview]");
    var totalElement = report.querySelector("[data-ikd-total]");
    var groupsElement = report.querySelector("[data-ikd-groups]");
    var ikdStatus = report.querySelector("[data-ikd-status]");
    var fields = ["Kelengkapan", "Validitas", "Mutakhir", "total"];
    var seen = Object.create(null);
    var rows = [];

    if (!sourceRows.length || !overview || !totalElement || !groupsElement) {
      throw new Error("Data IKD tidak tersedia");
    }

    sourceRows.forEach(function (record) {
      if (!record || typeof record !== "object") return;

      var entityName = String(record.entitas || "-").replace(/\s+/g, " ").trim();
      var values = fields.map(function (field) { return Number(record[field]); });
      var fingerprint = JSON.stringify([entityName].concat(values));

      if (seen[fingerprint]) return;
      seen[fingerprint] = true;
      rows.push({ name: entityName, values: values });
    });

    if (!rows.length) throw new Error("Data IKD tidak tersedia");

    var groups = [
      { name: "Kelengkapan", valueIndex: 0 },
      { name: "Validitas", valueIndex: 1 },
      { name: "Mutakhir", valueIndex: 2 }
    ];
    var overallTotal = rows.reduce(function (sum, row) {
      return sum + (Number.isFinite(row.values[3]) ? row.values[3] : 0);
    }, 0) / rows.length;

    totalElement.textContent = formatPercent(overallTotal);
    groupsElement.replaceChildren();

    groups.forEach(function (group) {
      var groupTotal = rows.reduce(function (sum, row) {
        return sum + (Number.isFinite(row.values[group.valueIndex]) ? row.values[group.valueIndex] : 0);
      }, 0);
      var groupAverage = groupTotal / rows.length;
      var details = document.createElement("details");
      var summary = document.createElement("summary");
      var heading = document.createElement("span");
      var score = document.createElement("strong");
      var progress = document.createElement("div");
      var entityList = document.createElement("div");

      details.className = "ikd-group";
      details.open = true;
      summary.className = "ikd-group__summary";
      heading.textContent = group.name;
      score.textContent = formatPercent(groupAverage);
      summary.append(heading, score);
      progress.className = "ikd-progress";
      progress.setAttribute("role", "progressbar");
      progress.setAttribute("aria-label", group.name);
      progress.setAttribute("aria-valuemin", "0");
      progress.setAttribute("aria-valuemax", "100");
      progress.setAttribute("aria-valuenow", String(groupAverage));
      progress.style.setProperty("--ikd-progress", Math.max(0, Math.min(100, groupAverage)) + "%");
      entityList.className = "ikd-entity-list";

      rows.forEach(function (row) {
        var entity = document.createElement("div");
        var entityName = document.createElement("span");
        var entityScore = document.createElement("strong");

        entity.className = "ikd-entity";
        entityName.textContent = row.name;
        entityScore.textContent = formatPercent(row.values[group.valueIndex]);
        entity.append(entityName, entityScore);
        entityList.appendChild(entity);
      });

      details.append(summary, progress, entityList);
      groupsElement.appendChild(details);
    });

    overview.hidden = false;
    if (ikdStatus) ikdStatus.textContent = "Data IKD berhasil diperbarui.";
  }

  var ikdController = new AbortController();
  var ikdTimeout = setTimeout(function () {
    ikdController.abort();
  }, 10000);

  fetch(ikdApiUrl, { signal: ikdController.signal })
    .then(function (response) {
      if (!response.ok) throw new Error("Respons API IKD tidak berhasil");
      return response.json();
    })
    .then(renderIkd)
    .catch(function () {
      var ikdStatus = report.querySelector("[data-ikd-status]");
      if (ikdStatus) ikdStatus.textContent = "Data IKD belum dapat dimuat. Silakan coba lagi nanti.";
    })
    .finally(function () {
      clearTimeout(ikdTimeout);
    });

  fetch(apiUrl, { signal: controller.signal })
    .then(function (response) {
      if (!response.ok) throw new Error("Respons API tidak berhasil");
      return response.json();
    })
    .then(function (payload) {
      var record = getLatestRecord(payload);
      if (!record) throw new Error("Record terbaru tidak tersedia");
      renderRecord(record);
    })
    .catch(function () {
      report.classList.add("has-error");
      if (statusElement) {
        statusElement.textContent = "Data belum dapat dimuat. Silakan coba lagi nanti.";
      }
      if (updatedElement) updatedElement.textContent = "Belum tersedia";
    })
    .finally(function () {
      clearTimeout(timeout);
    });
})();
