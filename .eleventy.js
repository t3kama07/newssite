module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  // Date filter for copyright year
  eleventyConfig.addFilter("date", function() {
    return new Date().getFullYear();
  });

  eleventyConfig.addFilter("slug", function(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    },
    // Add site data globally
    globalData: {
      site: {
        url: "https://mellifluous-douhua-4b5e1f.netlify.app"
      }
    }
  };
};
