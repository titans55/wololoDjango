/**
* Mark various PIXI properties/methods as private if they are not relevant to Phaser. 
*/

var path = require('path');

function docletParamsAcceptInteractionData (doclet) ***REMOVED***

    if (Array.isArray(doclet.params)) ***REMOVED***
        return doclet.params.some(function (p) ***REMOVED***
            return p.type && p.type.names.some(function (n) ***REMOVED***
                return n === 'PIXI.InteractionData';
            ***REMOVED***);
        ***REMOVED***);
    ***REMOVED***

***REMOVED***

var unwantedNames = ***REMOVED***
    'PIXI.DisplayObject#defaultCursor': 1,
    'PIXI.DisplayObject#interactive' : 1
***REMOVED***;

function hasUnwantedName (doclet) ***REMOVED***

    var longname = doclet.longname;
    return unwantedNames[longname];

***REMOVED***

exports.handlers = ***REMOVED******REMOVED***;
exports.handlers.newDoclet = function (e) ***REMOVED***

    var doclet = e.doclet;

    if (docletParamsAcceptInteractionData(doclet) ||
        hasUnwantedName(doclet))
    ***REMOVED***
        doclet.access = 'private';
    ***REMOVED***

***REMOVED***;
