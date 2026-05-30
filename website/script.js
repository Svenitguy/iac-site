fetch("/api/metrics")
  .then(res => res.json())
  .then(data => {

    document.getElementById("visitors").innerText = data.visitors;
    document.getElementById("lastUpdate").innerText = new Date(data.lastUpdate).toLocaleString();

  })
  .catch(err => {
    console.error("API error:", err);
    document.getElementById("visitors").innerText = "N/A";
  });