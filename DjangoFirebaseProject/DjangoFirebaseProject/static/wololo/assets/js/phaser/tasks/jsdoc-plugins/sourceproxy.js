/**
* Moves information from custom `@sourcepath`, `@sourceline`, `@nosource` doclets
* into the doclet meta-information.
*
* This is useful to maintain source file/lineno links with the YUIDoc-to-JSDoc output.
*/

var path = require('path');

exports.defineTags = function(dictionary) ***REMOVED***

    dictionary.defineTag('nosource', ***REMOVED***
        onTagged: function (doclet, tag) ***REMOVED***
            doclet.meta.nosource = true;
            //doclet.meta.path = '';
            //doclet.meta.filename = '';
        ***REMOVED***
    ***REMOVED***);

    dictionary.defineTag('sourcefile', ***REMOVED***
        onTagged: function (doclet, tag) ***REMOVED***
            var filename = tag.value;
            doclet.meta.path = path.dirname(filename);
            doclet.meta.filename = path.basename(filename);
        ***REMOVED***
    ***REMOVED***);

    dictionary.defineTag('sourceline', ***REMOVED***
       onTagged: function (doclet, tag) ***REMOVED***
           var lineno = tag.value;
           doclet.meta.lineno = lineno;
       ***REMOVED***
    ***REMOVED***);

***REMOVED***;
