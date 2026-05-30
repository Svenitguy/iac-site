fetch("/api/metrics")
  .then(res => res.json())
  .then(data => {

    document.getElementById("visitors").innerText =
      data.visitors ?? "0";

    document.getElementById("uptime").innerText =
      data.uptime ?? "99.99%";

    document.getElementById("deployment").innerText =
      data.deployment ?? "Healthy";

    document.getElementById("responseTime").innerText =
      data.responseTime != null ? data.responseTime + " ms" : "0 ms";

    document.getElementById("environment").innerText =
      data.environment ?? "Production";

    document.getElementById("lastUpdate").innerText =
      data.lastUpdate
        ? new Date(data.lastUpdate).toLocaleString()
        : "N/A";

  })
  .catch(err => {
    console.error("API error:", err);

    ["visitors", "uptime", "deployment", "responseTime", "environment", "lastUpdate"].forEach(id => {
      document.getElementById(id).innerText = "N/A";
    });
  });