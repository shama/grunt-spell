# grunt-spell [![Build Status](https://secure.travis-ci.org/shama/grunt-spell.png?branch=master)](http://travis-ci.org/shama/grunt-spell)

A Grunt plugin for spellchecking.

```
Running "spell:all" (spell) task
>> Checking test/test.txt...
Type                      Error                     Suggestions
------------------------  ------------------------  ------------------------
Spelling                  "Thsi"                    "Thai"
Spelling                  "wrogn"                   "wrong"
Spelling                  "reallly"                 "really"
Spelling                  "ibs"                     "is", "its", "ins", "ib",
                                                    "bis"
Spelling                  "rihgt"                   "right"
Make I uppercase          "i"                       "I"
Missing Word              "am cat"                  "am the cat", "am a cat"
------------------------  ------------------------  ------------------------
```

## Getting Started
Install this grunt plugin next to your project's
Gruntfile.js with: `npm install grunt-spell`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-spell');
```

## Documentation
Specify files to spellcheck:

```javascript
grunt.initConfig({
  spell: {
    files: ['docs/*']
  }
});
```

Or specify a language (`en`, `fr`, `de`, `pt`, `es`) and/or rules to ignore
(`cliches`, `double negatives`, `passive voice`, etc).

```javascript
grunt.initConfig({
  spell: {
    all: {
      src: ['docs/*'],
      options: {
        lang: 'es',
        ignore: ['cliches', 'double negatives']
      }
    }
  }
});
```

Wrapper for [npm teacher](https://github.com/vesln/teacher) which uses the
[After The Deadline API](http://afterthedeadline.com/).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Lint and test your code using [grunt][grunt].

## Release History
* 0.2.1 - Simplify task.
* 0.2.0 - Grunt v0.4 Support.
* 0.1.1 - Refactored for tests, bug fixes when no typos or spelling suggestions.
* 0.1.0 - Initial release

## License
Copyright (c) 2013 Kyle Robinson Young
Licensed under the MIT license.

[grunt]: https://github.com/gruntjs/grunt
