const fs = require("fs");
const fetch = require("node-fetch");

(async () => {
  const API_URL = "https://script.google.com/macros/s/AKfycbyXpkGb5SPZ8OyLjm4gEo9BUAnYsm6n1DyMi6LMhg81ZSV93MqSiY9yWcOavU_385pH-g/exec";

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    // Optional: add timestamp for last updated
    const payload = {
      lastUpdated: new Date().toISOString(),
      data: data
    };

    fs.writeFileSync("data.json", JSON.stringify(payload, null, 2));
    console.log("✅ data.json updated successfully!");
  } catch (err) {
    console.error("Failed to fetch data:", err);
    process.exit(1);
  }
})();
