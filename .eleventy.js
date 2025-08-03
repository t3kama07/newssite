module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  // Date filter for sitemap (ISO format: YYYY-MM-DD)
  eleventyConfig.addFilter("dateISO", function(dateObj) {
    return new Date(dateObj).toISOString().split('T')[0];
  });

  eleventyConfig.addFilter("date", function() {
  return new Date().toISOString().split('T')[0];
});


  // Year filter for footer
  eleventyConfig.addFilter("year", function() {
    return new Date().getFullYear();
  });

  // Slug filter for URLs
  eleventyConfig.addFilter("slug", function(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  });

  // Custom collection: last 48 hours for Google News
  eleventyConfig.addCollection("recentNews", function(collectionApi) {
    const now = new Date();
    const cutoff = new Date(now.getTime() - 48 * 60 * 60 * 1000); // 48 hours ago
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
        url: "https://mellifluous-douhua-4b5e1f.netlify.app"
      }
    }
  };
};
