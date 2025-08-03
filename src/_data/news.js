const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

module.exports = async function() {
  const apiKey = process.env.NEWS_API_KEY || "your-default-key";
  const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=us&language=en`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.results) return [];

    // (Your archive logic here)

    return data.results;
  } catch (error) {
    console.error("Fetch failed:", error);
    return []; // Prevents build failure
  }
};
