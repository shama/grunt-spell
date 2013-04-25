/*
 * grunt-spell
 * https://github.com/shama/grunt-spell
 *
 * Copyright (c) 2013 Kyle Robinson Young
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';
  grunt.registerMultiTask('spell', 'A Grunt plugin for spellchecking documents.', function() {
    var spellHelper = require('./lib/spell.js');
    spellHelper.init(this.options());
    var files = grunt.file.expand({filter: 'isFile'}, this.filesSrc);
    grunt.util.async.forEachSeries(files, function(file, next) {
      spellHelper.checkSpelling(grunt.file.expand(file), next);
    }, this.async());
  });
};
