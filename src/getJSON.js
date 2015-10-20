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

  if (file) {
    if (grunt.file.exists(file)) {
      try {
        data = grunt.file.readJSON(file);
        if (GLOBAL.options.logLevel > 1) {
          grunt.log[logType || 'ok']('Data loaded from', file);
        }
      } catch (e) {
        if (GLOBAL.options.logLevel > 1) {
          grunt.log.warn('Data file', file, 'not valid JSON');
        }
      }
    } else if (GLOBAL.options.logLevel > 1) {
      grunt.log.warn('Data file', file, 'not found');
    }
  }
  return data;
}
