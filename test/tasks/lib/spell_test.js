'use strict';

var grunt = require('grunt');
var path = require('path');

var hooker = grunt.util.hooker;
var spell = require('../../../tasks/lib/spell');
spell.init();

exports.spell = (function() {
  var _test = {};

  _test.setUp = function(done) {
    this.fixtures = path.resolve(__dirname, '..', '..', 'fixtures');
    setTimeout(function() {
      done();
    }, 1000);
  };

  _test.errors = function(test) {
    test.expect(1);
    hooker.hook(spell, 'printTypos', function(typos) {
      test.ok(typos.length === 7, 'Did not find 7 expected typos. Instead found ' + typos.length + '.');
    });
    spell.checkSpelling(path.join(this.fixtures, 'errors.md'), test.done);
  };

  _test.noerrors = function(test) {
    test.expect(1);
    hooker.hook(spell, 'printTypos', function(typos) {
      test.ok(typos.length === 0, 'Found ' + typos.length + ' typo(s) when it should have found 0.');
    });
    spell.checkSpelling(path.join(this.fixtures, 'noerrors.md'), test.done);
  };

  return _test;
}());
