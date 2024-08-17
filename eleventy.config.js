import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import * as sass from 'sass';
import picture from "./src/utils/picture.js";
import lazypicture from "./src/utils/lazy-picture.js";

export default function(eleventyConfig) {
  // Set the correct layout alias
  eleventyConfig.addLayoutAlias('default', 'layouts/simple-layout.njk');

  // syntax highlighting plugin
  eleventyConfig.addPlugin(syntaxHighlight, {
    templateFormats: "md"
  });

  eleventyConfig.addWatchTarget('./src/*');
  eleventyConfig.addPassthroughCopy('src/*.{css,js,jpg,ico}');

  // Sass pipeline
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: function(contents, includePath) {
      let includePaths = [this.config.dir.includes];
      return () => {
        let ret = sass.renderSync({
          file: includePath,
          includePaths,
          data: contents,
          outputStyle: "compressed"
        });
        return ret.css.toString("utf8");
      };
    }
  });

  // A responsive image helper using Netlify Large Media - image transformation
  eleventyConfig.addShortcode("picture", picture);

  // A lazy loading image helper using Netlify Large Media - image transformation
  eleventyConfig.addShortcode("lazypicture", lazypicture);

  // pass some assets right through
  eleventyConfig.addPassthroughCopy("./src/site/images");
  eleventyConfig.addPassthroughCopy("./src/site/js/*.js");

  // Basic return statement layouts/simple-layout.njk
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "site/layouts" // Make sure this directory exists
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true
  };
}