/**
* Add Phaser.Physics.P2 before the class name  in the p2.js file
*/
var path = require('path');

exports.handlers = ***REMOVED******REMOVED***;
exports.handlers.newDoclet = function (e) ***REMOVED***
    var doclet = e.doclet;

    if ((doclet.meta.filename === "p2.js") && (doclet.kind === 'class' || doclet.kind === 'interface'))
    ***REMOVED***
        doclet.longname = "Phaser.Physics.P2." + doclet.longname;
    ***REMOVED***
***REMOVED***;