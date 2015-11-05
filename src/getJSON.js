'use strict';
/**
 * Gets JSON data.
 *
 * @param file {String} Location of JSON file.
 *
 * @return data {Object} Javascript object data.
*/
module.exports = function (file) {
  var data = {};
  try {
    data = require('../' + file);
  } catch (e) {}
  return data;
}
