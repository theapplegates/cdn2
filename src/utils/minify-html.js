import { minify as htmlmin } from "html-minifier";

export default function(content, outputPath) {
  if( outputPath.endsWith(".html") ) {
    let minified = htmlmin(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    });
    return minified;
  }
  return content;
}