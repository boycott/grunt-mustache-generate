'use strict';
/**
 * Renders HTML without whitespace.
 *
 * @param html {String} HTML to parse.
 *
 * @return html {String} Minified HTML.
*/
module.exports = function (html) {
  html = html.replace(/[\f\t\n\r\v]+/g, ''); // Remove all non-space whitespace characters.
  html = html.replace(/\s+/g, ' '); // Only one space is ever needed in html.
  html = html.replace(/\s</g, '<'); // Remove empty spaces before an opening html tag.
  html = html.replace(/>\s/g, '>'); // Remove empty spaces between a closing html tag and it's content.
  return html;
};
