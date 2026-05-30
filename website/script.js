fetch("/api/metrics")
  .then(res => res.json())
  .then(data => {

    // 👥 Visitors
    const visitorsElem = document.getElementById("visitors");
    visitorsElem.innerText = data.visitors ?? "0";

    // ⚡ Uptime
    const uptimeElem = document.getElementById("uptime");
    const uptimeValue = data.uptime != null ? Math.round(data.uptime) : 0;
    uptimeElem.innerText = uptimeValue + " %";

    uptimeElem.classList.remove("good", "warning", "bad");
    if (uptimeValue >= 90) {
      uptimeElem.classList.add("good"); // groen
    } else if (uptimeValue >= 70) {
      uptimeElem.classList.add("warning"); // geel
    } else {
      uptimeElem.classList.add("bad"); // rood
    }

    // 🚀 Deployment
    const deploymentElem = document.getElementById("deployment");
    deploymentElem.innerText = data.deployment ?? "Healthy";

    deploymentElem.classList.remove("good", "warning", "bad");
    if ((data.deployment ?? "Healthy").toLowerCase() === "healthy") {
      deploymentElem.classList.add("good");
    } else if ((data.deployment ?? "").toLowerCase() === "warning") {
      deploymentElem.classList.add("warning");
    } else {
      deploymentElem.classList.add("bad");
    }

    // ⏱️ Response Time
    const responseElem = document.getElementById("responseTime");
    const responseValue = data.responseTime ?? 0;
    responseElem.innerText = responseValue + " ms";

    responseElem.classList.remove("good", "warning", "bad");
    if (responseValue < 200) {
      responseElem.classList.add("good");
    } else if (responseValue < 500) {
      responseElem.classList.add("warning");
    } else {
      responseElem.classList.add("bad");
    }

    // 🌍 Environment
    document.getElementById("environment").innerText =
      data.environment ?? "Production";

    // 📅 Last Update
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