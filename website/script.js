fetch("/api/metrics")
  .then(res => res.json())
  .then(data => {

    document.getElementById("visitors").innerText = data.visitors;

    document.getElementById("lastUpdate").innerText =
      new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

  })
  .catch(err => {
    console.error("API error:", err);

    document.getElementById("visitors").innerText = "N/A";
  });