/*
 * grunt-mustache-generate
 * https://github.com/boycott/grunt-mustache-generate
 *
 * Copyright (c) 2015 boycott
 * Licensed under the MIT license.
 */

'use strict';

var path   = require('path'),
  mustache = require('mustache'),
  minify   = require('../src/minify'),
  merge    = require('../src/merge'),
  getJSON  = require('../src/getJSON');

module.exports = function(grunt) {
  /**
   * @var GLOBAL {Object} Contains settings available across the task.
  */
  var GLOBAL = {
    options: {},
    data: {},
    partials : {},
    pages: []
  };
  /**
   * Create rendered mustache pages.
   *
   * @param fileGroups {Object} Expanded glob of mustache pages.
   *
  */
  function Page (fileGroups) {
    this.init(fileGroups);
    this.getData();
    this.create();
  }
  Page.prototype = {
    /**
     * Set useful variables.
     *
     * @constructor
     *
     * @param fileGroups {Object} Expanded glob of mustache pages.
     *
    */
    init: function (fileGroups) {
      this.$data = GLOBAL.data;
      this.$page = fileGroups.src[0];
      this.$dest = fileGroups.dest.replace(path.extname(fileGroups.dest), GLOBAL.options.output);

      if (GLOBAL.options.logLevel > 0) {
        grunt.log.subhead('Building page', this.$page);
      }
    },
    /**
     * Get page data from merging global data with page data.
     *
     * dataFile must be called the same as the page, but with the extension ".json".
     * if a seperate data directory is specified, this is prepended to the location.
     *
     * @return this.$data {Object} Merged data object.
     *
    */
    getData: function () {
      var dataFile = this.$page.replace(path.extname(this.$page), '.json');

      if (GLOBAL.options.dataDir) {
        dataFile = path.normalize(GLOBAL.options.dataDir + '/' + dataFile);
      }

      this.$data = merge(this.$data, getJSON(dataFile), true);
    },
    /**
     * Writes compiled pages to destination directory.
     *
     * mustache.js renders a page with a data object and an object containing mustache partials.
     *
     * @return {File} Rendered mustache page.
     *
    */
    create: function () {
      var html = mustache.render(grunt.file.read(this.$page), this.$data, GLOBAL.partials.$data);

      if (!GLOBAL.options.dontMinify) {
        html = minify(html, GLOBAL.options.minifySettings);
      }

      grunt.file.write(this.$dest, html);

      if (GLOBAL.options.logLevel > 0) {
        grunt.log.ok('Page rendered to', this.$dest);
      }

    }
  };
  /**
   * Gets mustache partials and optionally saves to file.
   *
   * @param options {Object} Partial specific options.
   *
  */
  function Partials () {
    this.options = GLOBAL.options.partials;
    this.init();
  }
  Partials.prototype = {
    /**
     * Loops through partial containing directories.
     * If there is a destination specified, write the file.
     *
     * @constructor
    */
    init: function () {
      this.$data = {};

      this.options.src.forEach(this.readDir, this);

      if (this.options.dest) {
        this.write();
      }

    },
    /**
     * Recursively loop through partial containing directory.
     * Each file found calls this.openFile.
     *
     * @param dir {String} directory.
    */
    readDir: function (dir) {
      grunt.file.recurse(dir, this.openFile.bind(this));
    },
    /**
     * Get file contents and write to javascript object.
     *
     * @param absPath {String} directory.
     * @param fileName {String} file name.
     *
     * @return {Object} as this.$data[fileName with no extension]
    */
    openFile: function (absPath, rootDir, subDir, fileName) {
      var html;
      if (/.DS_Store/.test(fileName)) {
        return;
      }
      html = grunt.file.read(absPath);

      if (!this.options.dontMinify) {
        html = minify(html, GLOBAL.options.minifySettings);
      }

      this.$data[fileName.replace(path.extname(fileName), '')] = html;
    },
    /**
     * Write this.$data to file.
     * If a variable name is specified, the data should be rendered as a variable, otherwise as a JSON Object.
     *
     * @return {File} Rendered javascript.
    */
    write: function () {
      var output = JSON.stringify(this.$data),
        fileType = 'json';

      if (this.options.varName) {
        output = this.options.varName + '=' + output + ';';
        fileType = 'js';
      }

      grunt.file.write(this.options.dest + '.' + fileType, output);
    }
  };
  grunt.registerMultiTask('mustacheGenerate', 'Grunt task to generate html pages and optionally partials for reuse client side.', function() {
    /**
     * Usage in Grunt file:
     *
     * mustacheGenerate: {
     *   options: {
     *     globalData: @optional {String} location of JSON file containing settings shared across all files.
     *     dontMinify: @optional {Boolean} @default false.  Don't render pages minified.
     *     partials: { // @optional Object for mustache partials.
     *       src: {array of type String} base directories containing mustache partials (task recursively searches within these directories).
     *       dest: @optional {String} destination for built JSON file containing all partials (no file extension).
     *       varName: @optional {String} variable name for the partials, outputs the file as a .js file instead of .json'.
     *       dontMinify: @optional {Boolean} @default options.dontMinify.  Don't render partials minified.
     *     },
     *     dataDir: @optional {String}. Page data is by default looked for in the same directory as the mustache pages. If desired the json can be contained in a separate directory.
     *     output: @optional {String} @default '.html'. Rendered page file extension.
     *     logLevel: @optional {Integer} @default 1.  Logging levels:
     *       0 = no logging.
     *       1 = log pages.
     *       2 = (and) log partials.
     *   },
     *   files: {
     *     expand: {Boolean} turns src glob into array of files.
     *     cwd: {String} base directory,
     *     src: {array of type String} globbing string for finding mustache pages within <%= cwd %>.
     *     dest: {String} destination for built pages.
     *   }
     * },
     *
    */
    GLOBAL.options = this.options({
      dontMinify: false,
      output: '.html',
      logLevel: 1
    });

    if (GLOBAL.options.partials) {
      GLOBAL.partials = new Partials();
    }

    if (GLOBAL.options.globalData) {
      GLOBAL.data = getJSON(GLOBAL.options.globalData, 'subhead');
    }

    this.files.forEach(function (fileGroups) {
      GLOBAL.pages.push(new Page(fileGroups));
    });
  });
};
