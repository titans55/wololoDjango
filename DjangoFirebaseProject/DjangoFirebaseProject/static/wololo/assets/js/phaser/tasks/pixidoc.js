/**
* Generates the appropriate JSDoc from some (PIXI) YUIDoc.
* This could be turned into a more general pacakge.
*
* Requires: yuidocjs
*/
'use strict';

function generateYuiDoc (sourcePaths, grunt) ***REMOVED***

    var Y = require('yuidocjs');

    var options = ***REMOVED***
        parseOnly: true,
        quiet: true,
        paths: sourcePaths
    ***REMOVED***;

    return (new Y.YUIDoc(options)).run();
***REMOVED***

module.exports = function (grunt) ***REMOVED***

  grunt.registerTask('pixidoc', 'Generates JSDoc from the PIXI YUIdocs', function () ***REMOVED***

      var sources = ['src/pixi'];
      var output = 'docs/pixi-jsdoc.js';

      var yui2jsdoc = require('./yuidoc-to-jsdoc/converter');
      var fs = require('fs');
      var path = require('path');

      // Right now yuidocsjs requires an absolute path so it emits an
      // absolute path in the jsdoc (or the JSDoc will error on missing files)
      sources = sources.map(function (source) ***REMOVED***
        return path.resolve(source);
      ***REMOVED***);

      var data = generateYuiDoc(sources);

      if (!data) ***REMOVED***
          grunt.fail.warn("PIXI YUIDoc not generated - nothing to do");
          return;
      ***REMOVED***

      // Fake in namespace (current limitation)
      // A preamble/warning wrt the YUIDoc-to-JSDoc with proper link-outs could
      // also be added here.
      var header =
        "/**\n" +
        "* @namespace PIXI\n" +
        "*/";

      var comments = yui2jsdoc.convert(data);
      comments.unshift(header);
      fs.writeFileSync(output, comments.join("\n"));

  ***REMOVED***);

***REMOVED***;
