const fs = require('fs');
const path = require('path');

module.exports = async function() {
  const apiKey = process.env.NEWS_API_KEY || "pub_4d769fbe2ebf41fcadaa09f967b608c5";
  const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=us&language=en`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.results) return [];

  const archivePath = path.join(__dirname, 'archive.json');

  let archive = [];
  if (fs.existsSync(archivePath)) {
    archive = JSON.parse(fs.readFileSync(archivePath, 'utf8'));
  }

  const newArticles = data.results.map(article => ({
    title: article.title,
    description: article.description || "",
    link: article.link,
    pubDate: article.pubDate,
    image_url: article.image_url || "",
    category: article.category ? article.category[0] : "general"
  }));

  const merged = [...archive, ...newArticles].reduce((acc, curr) => {
    if (!acc.find(item => item.title === curr.title)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 14); // 14 days retention
  const filtered = merged.filter(item => new Date(item.pubDate) >= cutoff);

  fs.writeFileSync(archivePath, JSON.stringify(filtered, null, 2));

  return filtered;
};
