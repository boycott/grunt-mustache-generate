'use strict';
/**
 * Returns HTML without any whitespace.
 *
 * @param html {String} HTML to parse.
 *
 * @return html {String} Minified HTML.
*/
module.exports = function (html) {
  return html
    .replace(/(\}{2})\s+(\{{2})/g, '$1$2')  // Remove space around mustache tags.
    .replace(/[\f\n\r\t\v]+/g, '')          // Remove all non-space whitespace characters.
    .replace(/(>?)\s+(<?)/g, function (match, p1, p2) {
        var rep = p1 + p2;                  // Output html tags.
        return rep || ' ';                  // If no tags, return a single whitespace character.
    })
};
