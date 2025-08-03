import fetch from 'node-fetch';

export default async function() {
  const apiKey = process.env.NEWS_API_KEY || "pub_4d769fbe2ebf41fcadaa09f967b608c5";
  const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=us&language=en`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.results) return [];

  return data.results.slice(0, 50).map(article => ({
    title: article.title,
    description: article.description || "",
    link: article.link,
    pubDate: article.pubDate,
    image_url: article.image_url || "",
    category: article.category ? article.category[0] : "general"
  }));
}