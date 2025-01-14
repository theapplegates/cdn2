export default (url, alt = "Missing alt text") => {
  return `<picture class="lazy lazy-initial">
  <source srcset="/images/tiny/${url}" media="(min-width: 1200px)">
  <source srcset="/images/tiny/${url}" media="(min-width: 740px)">
  <img src="/images/tiny/${url}" alt="${alt}" /></picture>`;
};