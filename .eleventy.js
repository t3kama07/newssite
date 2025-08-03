const fs = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  // Date filters
eleventyConfig.addFilter("dateISO", function(dateObj) {
  if (!dateObj) return new Date().toISOString().split('T')[0];
  const date = new Date(dateObj);
  return isNaN(date) ? new Date().toISOString().split('T')[0] : date.toISOString().split('T')[0];
});

  eleventyConfig.addFilter("date", () => new Date().toISOString().split('T')[0]);
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  // Slug filter
  eleventyConfig.addFilter("slug", value => {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  });

  // Collections
  eleventyConfig.addCollection("articles", function(collectionApi) {
    return collectionApi.getAll().filter(item => item.data && item.data.title);
  });

  eleventyConfig.addCollection("recentNews", function(collectionApi) {
    const now = new Date();
    const cutoff = new Date(now.getTime() - 48 * 60 * 60 * 1000);
    return collectionApi.getAll().filter(item => {
      return item.data.pubDate && new Date(item.data.pubDate) >= cutoff;
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    },
    globalData: {
      site: {
        url: "https://mellifluous-douhua-4b5e1f.netlify.app",
        name: "GlobalPulse News"
      }
    }
  };
};
