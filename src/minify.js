'use strict';
/**
 * Returns HTML without whitespace around html tags.
 *
 * @param html {String} HTML to parse.
 *
 * @return html {String} Minified HTML.
*/
function pageHTML (html) {
  html = html.replace(/[\f\t\n\r\v]+/g, ''); // Remove all non-space whitespace characters.
  html = html.replace(/\s+/g, ' '); // Only one space is ever needed in html.
  return html;
}
/**
 * Renders HTML without whitespace around mustache tags.
 *
 * @param html {String} HTML to parse.
 *
 * @return html {String} Minified HTML.
*/
function mustacheHTML (html) {
  html = html.replace(/}{2}\s+\{{2}/g, '}}{{');
  return html;
}

/**
 * Returns HTML without any significant whitespace.
 *
 * @param html {String} HTML to parse.
 *
 * @return html {String} Minified HTML.
*/
module.exports = function (html) {
  html = mustacheHTML(html);
  html = pageHTML(html);
  return html;
};
