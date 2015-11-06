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
    .replace(/(\}{2})\s+(\{{2})/g, '$1$2')      // Remove space within mustache tags.
    .replace(/(>)\s+(\{{2})/g, '$1$2')          // Remove space before mustache tags.
    .replace(/(\}{2})\s+(<)/g, '$1$2')          // Remove space after mustache tags.
    .replace(/[\f\n\r\t\v]+/g, '')              // Remove all non-space whitespace characters.
    .replace(/(>?)\s+(<?)/g, function (match, p1, p2) {
      var begin = (p1 || ' ');                  // Return the close tag or a space.
      var end = (p2 || ' ');                    // Plus the open tag or a space.
      return (begin + end).replace(/\s+/, ' '); // But only one space maximum (as html doesn't display more than one.
    })
};
