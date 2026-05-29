const now = new Date();

document.getElementById("lastUpdate").innerText =
  now.toLocaleDateString() + " " + now.toLocaleTimeString();

// Demo visitor counter
const randomVisitors = Math.floor(Math.random() * 500) + 100;

document.getElementById("visitors").innerText = randomVisitors;