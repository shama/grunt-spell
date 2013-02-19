/*
 * grunt-spell
 * https://github.com/shama/grunt-spell
 *
 * Copyright (c) 2013 Kyle Robinson Young
 * Licensed under the MIT license.
 */

'use strict';

var grunt = require('grunt');
var teacher = require('teacher');

var spell = module.exports = {};

// Length of table lines
var lineLen = 26;

spell.init = function(options) {
  options = options || {};
  spell.teacher = new teacher.Teacher(options.lang || 'en', options.ignore || []);
};

// Loop through files and check spelling
spell.checkSpelling = function(files, done) {
  if (typeof files === 'string') {
    files = [files];
  }
  grunt.util.async.forEachSeries(files, function(file, next) {
    grunt.log.ok('Checking ' + file + '...');

    var data = grunt.file.read(file);
    spell.teacher.check(data, function(err, typos) {
      if (err) {
        grunt.log.error(String(err).replace(/\n/g, ' '));
        return next();
      }
      spell.printTypos(typos || []);
      next();
    });

  }, done);
};

// Display typos
spell.printTypos = function(typos) {
  var table = [];
  var widths = [];
  typos = typos || [];

  if (typos.length < 1) {
    grunt.log.ok('No errors found.').writeln('');
    return;
  }

  spell.printTable(['Type', 'Error', 'Suggestions']);
  spell.hr();

  typos.forEach(function(typo) {
    // Get suggestions
    var sug = (typo.suggestions && typo.suggestions.option) || [];
    if (typeof sug === 'string') {
      sug = [sug];
    }
    sug = grunt.util._.map(sug, function(i) { return '"' + String(i).green + '"'; });

    // Build table and print
    spell.printTable([
      String(typo.description).cyan,
      '"' + String(typo.string).red + '"',
      sug.join(', ')
    ]);
  });

  spell.hr();
  grunt.log.writeln('');
};

// Helper for printing lines in a table
spell.printTable = function(lines) {
  var widths = lines.map(function() { return lineLen; });
  grunt.log.writeln(grunt.log.table(widths, lines));
};

// Print 3 col horizontal line
spell.hr = function() {
  spell.printTable([
    new Array(lineLen - 1).join('-'),
    new Array(lineLen - 1).join('-'),
    new Array(lineLen - 1).join('-'),
  ]);
};
