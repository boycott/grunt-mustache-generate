'use strict';
var grunt = require('grunt');
/**
 * Gets JSON data.
 *
 * @param file {String} Location of JSON file.
 *
 * @return data {Object} Javascript object data.
*/
module.exports = function (file) {
  var data = {};

  if (file) {
    if (grunt.file.exists(file)) {
      try {
        data = grunt.file.readJSON(file);
      } catch (e) {}
    }
  }
  return data;
}
