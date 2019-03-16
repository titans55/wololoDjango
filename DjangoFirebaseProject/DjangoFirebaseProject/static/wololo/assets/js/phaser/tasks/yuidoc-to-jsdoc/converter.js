/**
* Converts the JSON data out of YUIDoc into JSDoc documentation.
*
* Use a JSDoc plugin to handle custom @sourcefile/@sourceline and reattach meta-data.
*
* This works on the current PIXI source code (and exposes a few documentation bugs).
*
* Known limitations:
* - Does not support (from YUIDoc):
*   - @namespace/@module (although all types in the output are fully-resolved)
*   - @event, @bubbles, @for, @uses, @chainable, @async
*   - @beta
*   - Most "YUI-Specific" (but @readOnly is supported)
* - File-level documentation is probably lost.
* - All class-level documentation is put into the constructor's @description as there appears
*   to be no separate concept in YUIDoc for constructor vs. class documentation.
* - Probably doesn't work with nested modules/namespaces.
*   (And many unknown)
*
*/
'use strict';

/**
* Convert a parameter into a parameter tag string; also do this for each desc.props, specifying the baseprop.
*/
function paramdesc_to_str(desc, typedescs, basename) ***REMOVED***
    var name = desc.name;
    var typename = desc.type;
    var description = desc.description;

    if (basename) ***REMOVED***
        name = basename + "." + name;
    ***REMOVED***

    if (desc.optional) ***REMOVED***
        if (desc.optdefault) ***REMOVED***
            name = "[" + name + "=" + desc.optdefault + "]";
        ***REMOVED*** else ***REMOVED***
            name = "[" + name + "]";
        ***REMOVED***
    ***REMOVED***

    return "***REMOVED***" + resolve_typename(typename, typedescs) + "***REMOVED*** " + name + " - " + description;
***REMOVED***

/**
* Convert a parameter to as many @params as required; this is to map YUIDoc "props"
*/
function paramdesc_to_attrs(desc, typedescs, attrs, baseprop) ***REMOVED***

    attrs = attrs || [];

    attrs.push(paramdesc_to_str(desc, typedescs, baseprop ? baseprop.name : ''));

    if (desc.props) ***REMOVED***
        desc.props.forEach(function (prop) ***REMOVED***
            paramdesc_to_attrs(prop, typedescs, attrs, desc);
        ***REMOVED***);
    ***REMOVED***

    return attrs;

***REMOVED***

/**
* Convert a return into a return tag string.
*/
function returndesc_to_string(desc, typedescs) ***REMOVED***
    var typename = desc.type;
    var description = desc.description;
    if (typename) ***REMOVED***
        return "***REMOVED***" + resolve_typename(typename, typedescs) + "***REMOVED*** " + description;
    ***REMOVED*** else ***REMOVED***
        return description;
    ***REMOVED***
***REMOVED***

/**
* Convert flat 'typeitems' found in YUIDoc to a dictionary:
*    typename: ***REMOVED***
*       items: [..] - properties and methods
*    ***REMOVED***
*/
function group_typeitems(typeitems) ***REMOVED***

    var types = ***REMOVED******REMOVED***;

    typeitems.forEach(function (itemdesc, i) ***REMOVED***
        var typename = itemdesc['class'];

        var type = types[typename];
        if (!type) ***REMOVED***
            type = types[typename] = ***REMOVED***
                items: []
            ***REMOVED***;
        ***REMOVED***

        type.items.push(itemdesc);
    ***REMOVED***);

    return types;

***REMOVED***

/**
* Convert ident to the "closest" valid non-quoted identifier.
* May return the empty string (which is not a valid identifier).
*/
function as_valid_identifier (ident) ***REMOVED***
    ident = ident.replace(/\s/g, '_');
    ident = ident.replace(/[^\w_$]/g, '');
    ident = ident.replace(/^(\d)/, '_$1');

    return ident;
***REMOVED***

/**
* YUIDoc has no concept of generic types and various projects use inconsistent mashups.
* This is a simple hack to provide some normalization; only spome formats
* (in particular, that seen in the pixi project) and a few types of input are
* correctly accepted and nested arrays are not supported.
*
* Returns the corrected type if successful
*/
function fixup_yuidoc_array (rawtype) ***REMOVED***
    // Accept examples, where the angle braces represent all braces.
    // 1. X < >
    // 2. Array < X >
    // 3. Array..of < X >
    var r = rawtype;
    var m;

    // Trim spaces
    r = r.replace(/^\s+|\s+$/g, '');
    // make all brackets angles 
    r = r.replace(/[(***REMOVED***[]/g, '<').replace(/[)***REMOVED***\]]/g, '>');
    // remove whitespace and periods next to brackets
    r = r.replace(/[\s.]*([<>])[\s.]*/g, '$1');

    // match T<..>, where T != 'array'
    m = r.match(/^([\w$.]+)(?:<.*>)$/i);
    if (m && m[1].toLowerCase() !== 'array') ***REMOVED***
        return 'Array<' + (as_valid_identifier(m[1]) || 'unknown') + '>';
    ***REMOVED***

    // match Array <T>
    m = r.match(/^Array<(.*)>$/i);
    if (m) ***REMOVED***
        return 'Array<' + (as_valid_identifier(m[1]) || 'unknown') + '>';
    ***REMOVED***

    // match Array..of T
    m = r.match(/^Array.*?of\b\s*(.*)$/i);
    if (m) ***REMOVED***
        return 'Array<' + (as_valid_identifier(m[1]) || 'unknown') + '>';
    ***REMOVED***

    return '';
***REMOVED***

/**
* Try to fixup a type if it looks like it may conform to `***REMOVED***key: value, ..***REMOVED***`.
* Nesting is not supported and quoted keys are not supported.
*
* Returns the fixed up version or ''.
*/
function fixup_jsobject_like (rawType) ***REMOVED***

    var r = rawType;

    // Trim spaces
    r = r.replace(/^\s+|\s+$/g, '');
    // And duplicate brackets
    if (r.match(/^***REMOVED***\s****REMOVED***.****REMOVED***\s****REMOVED***$/)) ***REMOVED***
        r = r.replace(/^***REMOVED***\s*(.*?)\s****REMOVED***$/, '$1');
    ***REMOVED***

    if (r.match(/^***REMOVED***([\w$.]+:\s*[\w$.]+,?\s*)+***REMOVED***$/)) ***REMOVED***
        r = r.replace(/([\w$.]+):\s*([\w$.]+)(,?\s*)/g, function (m, a, b, c) ***REMOVED***
            if (c) ***REMOVED*** c = ", "; ***REMOVED***
            return as_valid_identifier(a) + ": " + as_valid_identifier(b) + c;
        ***REMOVED***);
        return r;
    ***REMOVED***
    else
    ***REMOVED***
        return '';
    ***REMOVED***

***REMOVED***

/**
* Process a complex (possibly multiple) type.
* (This has limited ability now: will not recurse, handle special arrays, etc.)
*/
function resolve_typename(typename, typedescs) ***REMOVED***

    if (!typename) ***REMOVED*** typename = "Any"; ***REMOVED***

    var typenames;
    if (typename.indexOf('|') > -1) ***REMOVED***
        typenames = typename.split(/[|]/g);
    ***REMOVED*** else ***REMOVED***
        typenames = [typename];
    ***REMOVED***

    typenames = typenames.map(function (part) ***REMOVED***

        var orig = part;
        var prev;
        var loss = false;
        var repeating = false;
        var array = false;
        var objlike = false;

        // Don't accept quotes in names from upstream
        prev = part;
        part = part.replace(/"/g, '');
        loss = loss || prev !== part;

        // YUIDoc is type... and JSDoc is ...type
        prev = part;
        part = part.replace(/^\.***REMOVED***3,***REMOVED***|\.***REMOVED***3,***REMOVED***$/g, '');
        repeating = prev !== part;

        prev = part;
        part = fixup_jsobject_like(part);
        if (part) ***REMOVED***
            objlike = true;
        ***REMOVED*** else ***REMOVED***
            part = prev;
        ***REMOVED***

        prev = part;
        part = fixup_yuidoc_array(part);
        if (part) ***REMOVED***
            array = true;
        ***REMOVED*** else ***REMOVED***
            part = prev;
        ***REMOVED***

        if (objlike) ***REMOVED***
            loss = loss || orig.replace(/\W+/g, '') !== part.replace(/\W+/g, '');
        ***REMOVED*** else if (array) ***REMOVED***
            loss = loss || orig.replace(/^\W/, '') !== part.replace(/^\W/, '');
        ***REMOVED*** else ***REMOVED***
            prev = part;
            var m = part.match(/[\w$.]+/); // Take possible '.' to start
            part = (m && m[0]) || '';
            part = as_valid_identifier(part);
            loss = loss || prev !== part;
        ***REMOVED***

        if (loss) ***REMOVED***
            console.log("Mutilating type: (" + orig + "=>" + part + ")");
        ***REMOVED***

        var resolved = resolve_single_typename(part, typedescs);
        if (repeating) ***REMOVED***
            return "..." + resolved;
        ***REMOVED*** else ***REMOVED***
            return resolved;
        ***REMOVED***
    ***REMOVED***);

    if (typenames.length > 1) ***REMOVED***
        return "(" + typenames.join("|") + ")";
    ***REMOVED*** else ***REMOVED***
        return typenames[0];
    ***REMOVED***
***REMOVED***

/**
* Process a single type
*/
function resolve_single_typename(typename, typedescs) ***REMOVED***

    if (!typename || typename.toLowerCase() === "any" || typename === "*") ***REMOVED***
        return ""; // "Any"
    ***REMOVED***

    var typedesc = typedescs[typename];
    if (typedesc) ***REMOVED***
        return typedesc.module + "." + typename;
    ***REMOVED*** else ***REMOVED***
        return typename;
    ***REMOVED***
***REMOVED***

function resolve_item_qualifiedname(itemdesc, typedesc, typedescs) ***REMOVED***
    var name = itemdesc.name;
    var typename = resolve_single_typename(typedesc.name, typedescs);
    if (itemdesc['static']) ***REMOVED***
        return typename + "." + name;
    ***REMOVED*** else ***REMOVED***
        return typename + "#" + name;
    ***REMOVED***
***REMOVED***

function add_generic_attrs (desc, attrs) ***REMOVED***

    var map = ['access', 'author', 'version', 'since', 'deprecated'];

    map.forEach(function (m) ***REMOVED***
        var key = m;
        var value = desc[key];
        if (value) ***REMOVED***
            attrs.push([key, value]);
        ***REMOVED***
    ***REMOVED***);

    if (desc.file) ***REMOVED***
        attrs.push(['sourcefile', desc.file]);
        attrs.push(['sourceline', desc.line]);
    ***REMOVED***

***REMOVED***

/**
* Process Method
*/
function methoddesc_to_attrs(itemdesc, typedesc, typedescs)
***REMOVED***
    var attrs = [];

    if (itemdesc.description) ***REMOVED***
        attrs.push(['description', itemdesc.description]);
    ***REMOVED***
    attrs.push(['method', resolve_item_qualifiedname(itemdesc, typedesc, typedescs)]);
    if (itemdesc.params)
    ***REMOVED***
        itemdesc.params.forEach(function (param, i) ***REMOVED***
            var paramattrs = paramdesc_to_attrs(param, typedescs);
            paramattrs.forEach(function (paramattr) ***REMOVED***
                attrs.push(['param', paramattr]);
            ***REMOVED***);
        ***REMOVED***);
    ***REMOVED***

    if (itemdesc['return'])
    ***REMOVED***
        attrs.push(['return', returndesc_to_string(itemdesc['return'], typedescs)]);
    ***REMOVED***

    add_generic_attrs(itemdesc, attrs);

    return attrs;
***REMOVED***

/**
* Process Property - Member in JSDoc
*/
function propertydesc_to_attrs(itemdesc, typedesc, typedescs)
***REMOVED***
    var attrs = [];

    if (itemdesc.description) ***REMOVED***
        attrs.push(['description', itemdesc.description]);
    ***REMOVED***
    attrs.push(['member', resolve_item_qualifiedname(itemdesc, typedesc, typedescs)]);
    attrs.push(['type', "***REMOVED***" + resolve_typename(itemdesc.type, typedescs) + "***REMOVED***"]);
    
    if (itemdesc['readonly'] !== undefined) ***REMOVED***
        attrs.push(['readonly', '']);
    ***REMOVED***

    if (itemdesc['default'] !== undefined) ***REMOVED***
        attrs.push(['default', itemdesc['default']]);
    ***REMOVED***

    add_generic_attrs(itemdesc, attrs);

    return attrs;
***REMOVED***

function write_attr_block (attrs, res) ***REMOVED***

    if (attrs) ***REMOVED***
        res.push("/**");

        attrs.forEach(function (attr) ***REMOVED***
            var name = attr[0];
            var value = attr[1];
            if (value !== undefined) ***REMOVED***
                res.push("* @" + name + " " + value);
            ***REMOVED*** else ***REMOVED***
                res.push("* @" + name);
            ***REMOVED***
        ***REMOVED***);

        res.push("*/");
    ***REMOVED***

***REMOVED***

/**
* Turns an array of "attributes" into a JSDoc comment block.
*/
function flatten_jsdoc_comment (attrs) ***REMOVED***

    var res = [];
    write_attr_block(attrs, res);
    return res.join("\n");

***REMOVED***

function itemdesc_to_attrs(itemdesc, typedesc, typedescs) ***REMOVED***

    if (itemdesc.itemtype === 'method')
    ***REMOVED***
        return methoddesc_to_attrs(itemdesc, typedesc, typedescs);
    ***REMOVED***
    else if (itemdesc.itemtype === 'property')
    ***REMOVED***
        return propertydesc_to_attrs(itemdesc, typedesc, typedescs);
    ***REMOVED***
    else if (!typedesc._loggedLooseComment)
    ***REMOVED***
        typedesc._loggedLooseComment = true;
        var name = itemdesc.file.match(/([^\/\\]*)$/)[1];
        console.log("Skipping loose comment: " + name + ":" + itemdesc.line + " (first)");
    ***REMOVED***

***REMOVED***

function typedesc_to_attrs (typedesc, typedescs) ***REMOVED***

    var attrs = [];

    // Bug in PIXI (test) docs has a "static constructor", whoops!
    if (typedescs.is_constructor || !typedescs['static']) ***REMOVED***

        attrs.push(['class', resolve_single_typename(typedesc.name, typedescs)]);

        if (typedesc.description) ***REMOVED***
            attrs.push(['description', typedesc.description]);
        ***REMOVED***

    ***REMOVED*** else ***REMOVED***
        // Not constructor, possibly static ..

        attrs.push(['description', typedesc.description]);
        attrs.push(['namespace', resolve_single_typename(typedesc.name, typedescs)]);

    ***REMOVED***

    var extendsname = typedesc['extends'];
    if (extendsname) ***REMOVED***
        var extenddesc = typedescs[extendsname];
        if (extenddesc) ***REMOVED***
            attrs.push(['augments', resolve_single_typename(extendsname, typedescs)]);
        ***REMOVED*** else ***REMOVED***
            attrs.push(['augments', extendsname]);
        ***REMOVED***
    ***REMOVED***

    if (typedesc.params)
    ***REMOVED***
        typedesc.params.forEach(function (paramdesc, i) ***REMOVED***
            attrs.push(['param', paramdesc_to_str(paramdesc, typedescs)]);
        ***REMOVED***);
    ***REMOVED***

    add_generic_attrs(typedesc, attrs);

    return attrs;

***REMOVED***

function filedesc_to_attrs (filedesc) ***REMOVED***

    var attrs = [];

    attrs.push(['fileoverview', filedesc.description]);

    add_generic_attrs(filedesc, attrs);

    return attrs;

***REMOVED***

/**
* Converts YUIDoc JSON (as found in data.json after generating documentation) into JSDoc comments.
*
* @method
* @param ***REMOVED******REMOVED*** data - YUIDoc data.
* @return ***REMOVED***string[]***REMOVED*** An array of comment blocks.
*/
function yuidocdata_to_jsdoc(data) ***REMOVED***

    var typedescs = data.classes;
    var type_itemdesc_groups = group_typeitems(data.classitems);

    var comments = [];

    Object.keys(typedescs).forEach(function (name) ***REMOVED***
        var typedesc = typedescs[name];

        var typeattrs = typedesc_to_attrs(typedesc, typedescs);
        var type_comments = [];

        var type_itemdesc = type_itemdesc_groups[name];
        if (type_itemdesc) ***REMOVED***

            // First item might be a file-level comment
            var first_item = type_itemdesc.items[0];
            if (first_item.itemtype === undefined) ***REMOVED***
                type_itemdesc.items.shift();

                var file_attrs = filedesc_to_attrs(first_item);
                comments.push(flatten_jsdoc_comment(file_attrs));
            ***REMOVED***

            type_itemdesc.items.forEach(function (itemdesc, i) ***REMOVED***
                var attrs = itemdesc_to_attrs(itemdesc, typedesc, typedescs);
                type_comments.push(flatten_jsdoc_comment(attrs));
            ***REMOVED***);
        ***REMOVED*** else ***REMOVED***
            console.log("No items for " + name);
        ***REMOVED***

        comments.push(flatten_jsdoc_comment(typeattrs));
        comments.push.apply(comments, type_comments);

    ***REMOVED***);

    return comments;

***REMOVED***

exports.convert = function (yuidoc) ***REMOVED***

    return yuidocdata_to_jsdoc(yuidoc);

***REMOVED***;
