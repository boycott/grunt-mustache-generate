/*
 * grunt-mustache-generate
 * https://github.com/boycott/grunt-mustache-generate
 *
 * Copyright (c) 2015 boycott
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    mustacheGenerate: {
      options: {
        globalData: 'test/fixtures/site.json',
        partials: {
          src: ['test/fixtures/partials', 'test/fixtures/app/partials'],
          dest: 'tmp/partials',
          varName: 'partials'
        },
        env: grunt.option('env') || process.env.GRUNT_ENV,  
        output: '.html',
        logLevel: 2
      },
      files: {
        expand: 'true',
        cwd: 'test/fixtures/pages',
        src: '**/*.mustache',
        dest: 'tmp'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'mustacheGenerate', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
