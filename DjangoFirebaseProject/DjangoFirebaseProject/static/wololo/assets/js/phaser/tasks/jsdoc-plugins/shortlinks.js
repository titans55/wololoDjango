/**
* Transform '***REMOVED***@link #x***REMOVED***' to '***REMOVED***@link longname#x x***REMOVED***' which saves lots of cumersome typing.
*
* This looks in @description, @classdesc and @see tags only.
*
* See https://github.com/jsdoc3/jsdoc/issues/483
*/
 
var path = require('path');
 
function expandLinks (text, parent) ***REMOVED***
 
    return text.replace(/\***REMOVED***\s*@link\s+([#.])([\w$.]+)\s*\***REMOVED***/g, function (m, mod, name) ***REMOVED***
        var expanded = "***REMOVED***@link " + parent + mod + name + " " + name + "***REMOVED***";
        return expanded;
    ***REMOVED***);
 
***REMOVED***
 
exports.handlers = ***REMOVED******REMOVED***;
exports.handlers.newDoclet = function (e) ***REMOVED***
 
    var doclet = e.doclet;
    var parent;
    if (doclet.kind === 'class' || doclet.kind === 'interface')
    ***REMOVED***
        parent = doclet.longname;
    ***REMOVED***
    else
    ***REMOVED***
        // member, method, property, etc.
        parent = doclet.memberof;
    ***REMOVED***
 
    ['description', 'classdesc'].forEach(function (p) ***REMOVED***
        if (doclet[p])
        ***REMOVED***
            doclet[p] = expandLinks(doclet[p], parent);
        ***REMOVED***
    ***REMOVED***);

    if (doclet.see && doclet.see.length)
    ***REMOVED***
        for (var i = 0; i < doclet.see.length; i++)
        ***REMOVED***
            doclet.see[i] = expandLinks(doclet.see[i], parent);
        ***REMOVED***
    ***REMOVED***
 
***REMOVED***;