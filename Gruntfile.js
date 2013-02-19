module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    spell: {
      all: {
        src: ['test/fixtures/*'],
        options: {
          lang: 'en',
          ignore: ['cliches']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'tasks/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
      },
    },
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['default']
    }
  });
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.registerTask('default', ['jshint', 'spell']);
};
