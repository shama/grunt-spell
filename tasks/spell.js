/*
 * grunt-spell
 * https://github.com/shama/grunt-spell
 *
 * Copyright (c) 2012 Kyle Robinson Young
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  var teacher = require('teacher');
  var async = grunt.util.async;

  // Length of table lines
  var lineLen = 26;

  grunt.registerMultiTask('spell', 'A Grunt plugin for spellchecking documents.', function() {
    var helpers = require('grunt-contrib-lib').init(grunt);
    var options = helpers.options(this);
    var done = this.async();
    var teach = new teacher.Teacher(options.lang || 'en', options.ignore || []);

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

    // Loop through each pattern and run check spelling
    async.forEachSeries(this.files, function(file, next) {
      checkSpelling(grunt.file.expandFiles(file.src), next);
    }, function() {
      done();
    });

    // Loop through files and check spelling
    function checkSpelling(files, done) {
      async.forEachSeries(files, function(file, next) {
        grunt.log.ok('Checking ' + file + '...');

        var data = grunt.file.read(file);
        teach.check(data, function(err, typos) {
          printTypos(typos);
          next();
        });

      }, done);
    }

    // Display typos
    function printTypos(typos) {
      var table = [];
      var widths = [];

      printTable(['Type', 'Error', 'Suggestions']);
      hr();

      typos.forEach(function(typo) {
        // Get suggestions
        var sug = typo.suggestions.option;
        if (typeof sug === 'string') {
          sug = [sug];
        }
        sug = grunt.util._.map(sug, function(i) { return '"' + String(i).green + '"'; });

        // Build table and print
        printTable([
          String(typo.description).cyan,
          '"' + String(typo.string).red + '"',
          sug.join(', ')
        ]);
      });

      hr();
    }

    // Helper for printing lines in a table
    function printTable(lines) {
      var widths = lines.map(function() { return lineLen; });
      grunt.log.writeln(grunt.log.table(widths, lines));
    }

    // Print 3 col horizontal line
    function hr() {
      printTable([
        new Array(lineLen - 1).join('-'),
        new Array(lineLen - 1).join('-'),
        new Array(lineLen - 1).join('-'),
      ]);
    }

  });

};
