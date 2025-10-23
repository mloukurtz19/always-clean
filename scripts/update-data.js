const fs = require("fs");
const fetch = require("node-fetch");

(async () => {
  const API_URL = "https://script.google.com/macros/library/d/1gkuu09sHbAfDWxeT5nIXtX133--bmKUllChMp7nacI9ceGIlVBdg3UrX/5";

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    // Optional: add timestamp for last updated
    const payload = {
      lastUpdated: new Date().toISOString(),
      data: data
    };

    fs.writeFileSync("./data.json", JSON.stringify(payload, null, 2));
    console.log("✅ data.json updated successfully!");
  } catch (err) {
    console.error("Failed to fetch data:", err);
    process.exit(1);
  }
})();
