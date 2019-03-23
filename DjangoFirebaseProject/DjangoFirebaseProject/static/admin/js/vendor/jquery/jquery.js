/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) ***REMOVED***

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) ***REMOVED***

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) ***REMOVED***
				if ( !w.document ) ***REMOVED***
					throw new Error( "jQuery requires a window with a document" );
				***REMOVED***
				return factory( w );
			***REMOVED***;
	***REMOVED*** else ***REMOVED***
		factory( global );
	***REMOVED***

// Pass this if window is not defined yet
***REMOVED*** )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) ***REMOVED***

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = ***REMOVED******REMOVED***;

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = ***REMOVED******REMOVED***;

var isFunction = function isFunction( obj ) ***REMOVED***

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  ***REMOVED***;


var isWindow = function isWindow( obj ) ***REMOVED***
		return obj != null && obj === obj.window;
	***REMOVED***;




	var preservedScriptAttributes = ***REMOVED***
		type: true,
		src: true,
		noModule: true
	***REMOVED***;

	function DOMEval( code, doc, node ) ***REMOVED***
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) ***REMOVED***
			for ( i in preservedScriptAttributes ) ***REMOVED***
				if ( node[ i ] ) ***REMOVED***
					script[ i ] = node[ i ];
				***REMOVED***
			***REMOVED***
		***REMOVED***
		doc.head.appendChild( script ).parentNode.removeChild( script );
	***REMOVED***


function toType( obj ) ***REMOVED***
	if ( obj == null ) ***REMOVED***
		return obj + "";
	***REMOVED***

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
***REMOVED***
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) ***REMOVED***

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	***REMOVED***,

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = ***REMOVED***

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() ***REMOVED***
		return slice.call( this );
	***REMOVED***,

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) ***REMOVED***

		// Return all the elements in a clean array
		if ( num == null ) ***REMOVED***
			return slice.call( this );
		***REMOVED***

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	***REMOVED***,

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) ***REMOVED***

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	***REMOVED***,

	// Execute a callback for every element in the matched set.
	each: function( callback ) ***REMOVED***
		return jQuery.each( this, callback );
	***REMOVED***,

	map: function( callback ) ***REMOVED***
		return this.pushStack( jQuery.map( this, function( elem, i ) ***REMOVED***
			return callback.call( elem, i, elem );
		***REMOVED*** ) );
	***REMOVED***,

	slice: function() ***REMOVED***
		return this.pushStack( slice.apply( this, arguments ) );
	***REMOVED***,

	first: function() ***REMOVED***
		return this.eq( 0 );
	***REMOVED***,

	last: function() ***REMOVED***
		return this.eq( -1 );
	***REMOVED***,

	eq: function( i ) ***REMOVED***
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	***REMOVED***,

	end: function() ***REMOVED***
		return this.prevObject || this.constructor();
	***REMOVED***,

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
***REMOVED***;

jQuery.extend = jQuery.fn.extend = function() ***REMOVED***
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || ***REMOVED******REMOVED***,
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) ***REMOVED***
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || ***REMOVED******REMOVED***;
		i++;
	***REMOVED***

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) ***REMOVED***
		target = ***REMOVED******REMOVED***;
	***REMOVED***

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) ***REMOVED***
		target = this;
		i--;
	***REMOVED***

	for ( ; i < length; i++ ) ***REMOVED***

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) ***REMOVED***

			// Extend the base object
			for ( name in options ) ***REMOVED***
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) ***REMOVED***
					continue;
				***REMOVED***

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) ***REMOVED***

					if ( copyIsArray ) ***REMOVED***
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					***REMOVED*** else ***REMOVED***
						clone = src && jQuery.isPlainObject( src ) ? src : ***REMOVED******REMOVED***;
					***REMOVED***

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				***REMOVED*** else if ( copy !== undefined ) ***REMOVED***
					target[ name ] = copy;
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***

	// Return the modified object
	return target;
***REMOVED***;

jQuery.extend( ***REMOVED***

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) ***REMOVED***
		throw new Error( msg );
	***REMOVED***,

	noop: function() ***REMOVED******REMOVED***,

	isPlainObject: function( obj ) ***REMOVED***
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) ***REMOVED***
			return false;
		***REMOVED***

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) ***REMOVED***
			return true;
		***REMOVED***

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	***REMOVED***,

	isEmptyObject: function( obj ) ***REMOVED***

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) ***REMOVED***
			return false;
		***REMOVED***
		return true;
	***REMOVED***,

	// Evaluates a script in a global context
	globalEval: function( code ) ***REMOVED***
		DOMEval( code );
	***REMOVED***,

	each: function( obj, callback ) ***REMOVED***
		var length, i = 0;

		if ( isArrayLike( obj ) ) ***REMOVED***
			length = obj.length;
			for ( ; i < length; i++ ) ***REMOVED***
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) ***REMOVED***
					break;
				***REMOVED***
			***REMOVED***
		***REMOVED*** else ***REMOVED***
			for ( i in obj ) ***REMOVED***
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) ***REMOVED***
					break;
				***REMOVED***
			***REMOVED***
		***REMOVED***

		return obj;
	***REMOVED***,

	// Support: Android <=4.0 only
	trim: function( text ) ***REMOVED***
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	***REMOVED***,

	// results is for internal usage only
	makeArray: function( arr, results ) ***REMOVED***
		var ret = results || [];

		if ( arr != null ) ***REMOVED***
			if ( isArrayLike( Object( arr ) ) ) ***REMOVED***
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			***REMOVED*** else ***REMOVED***
				push.call( ret, arr );
			***REMOVED***
		***REMOVED***

		return ret;
	***REMOVED***,

	inArray: function( elem, arr, i ) ***REMOVED***
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	***REMOVED***,

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) ***REMOVED***
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) ***REMOVED***
			first[ i++ ] = second[ j ];
		***REMOVED***

		first.length = i;

		return first;
	***REMOVED***,

	grep: function( elems, callback, invert ) ***REMOVED***
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) ***REMOVED***
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) ***REMOVED***
				matches.push( elems[ i ] );
			***REMOVED***
		***REMOVED***

		return matches;
	***REMOVED***,

	// arg is for internal usage only
	map: function( elems, callback, arg ) ***REMOVED***
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) ***REMOVED***
			length = elems.length;
			for ( ; i < length; i++ ) ***REMOVED***
				value = callback( elems[ i ], i, arg );

				if ( value != null ) ***REMOVED***
					ret.push( value );
				***REMOVED***
			***REMOVED***

		// Go through every key on the object,
		***REMOVED*** else ***REMOVED***
			for ( i in elems ) ***REMOVED***
				value = callback( elems[ i ], i, arg );

				if ( value != null ) ***REMOVED***
					ret.push( value );
				***REMOVED***
			***REMOVED***
		***REMOVED***

		// Flatten any nested arrays
		return concat.apply( [], ret );
	***REMOVED***,

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
***REMOVED*** );

if ( typeof Symbol === "function" ) ***REMOVED***
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
***REMOVED***

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) ***REMOVED***
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
***REMOVED*** );

function isArrayLike( obj ) ***REMOVED***

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) ***REMOVED***
		return false;
	***REMOVED***

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
***REMOVED***
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) ***REMOVED***

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) ***REMOVED***
		if ( a === b ) ***REMOVED***
			hasDuplicate = true;
		***REMOVED***
		return 0;
	***REMOVED***,

	// Instance methods
	hasOwn = (***REMOVED******REMOVED***).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) ***REMOVED***
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) ***REMOVED***
			if ( list[i] === elem ) ***REMOVED***
				return i;
			***REMOVED***
		***REMOVED***
		return -1;
	***REMOVED***,

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = ***REMOVED***
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	***REMOVED***,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^***REMOVED***]+\***REMOVED***\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]***REMOVED***1,6***REMOVED***" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) ***REMOVED***
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	***REMOVED***,

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) ***REMOVED***
		if ( asCodePoint ) ***REMOVED***

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) ***REMOVED***
				return "\uFFFD";
			***REMOVED***

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		***REMOVED***

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	***REMOVED***,

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() ***REMOVED***
		setDocument();
	***REMOVED***,

	disabledAncestor = addCombinator(
		function( elem ) ***REMOVED***
			return elem.disabled === true && ("form" in elem || "label" in elem);
		***REMOVED***,
		***REMOVED*** dir: "parentNode", next: "legend" ***REMOVED***
	);

// Optimize for push.apply( _, NodeList )
try ***REMOVED***
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
***REMOVED*** catch ( e ) ***REMOVED***
	push = ***REMOVED*** apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) ***REMOVED***
			push_native.apply( target, slice.call(els) );
		***REMOVED*** :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) ***REMOVED***
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) ***REMOVED******REMOVED***
			target.length = j - 1;
		***REMOVED***
	***REMOVED***;
***REMOVED***

function Sizzle( selector, context, results, seed ) ***REMOVED***
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) ***REMOVED***

		return results;
	***REMOVED***

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) ***REMOVED***

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) ***REMOVED***
			setDocument( context );
		***REMOVED***
		context = context || document;

		if ( documentIsHTML ) ***REMOVED***

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) ***REMOVED***

				// ID selector
				if ( (m = match[1]) ) ***REMOVED***

					// Document context
					if ( nodeType === 9 ) ***REMOVED***
						if ( (elem = context.getElementById( m )) ) ***REMOVED***

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) ***REMOVED***
								results.push( elem );
								return results;
							***REMOVED***
						***REMOVED*** else ***REMOVED***
							return results;
						***REMOVED***

					// Element context
					***REMOVED*** else ***REMOVED***

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) ***REMOVED***

							results.push( elem );
							return results;
						***REMOVED***
					***REMOVED***

				// Type selector
				***REMOVED*** else if ( match[2] ) ***REMOVED***
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				***REMOVED*** else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) ***REMOVED***

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				***REMOVED***
			***REMOVED***

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) ***REMOVED***

				if ( nodeType !== 1 ) ***REMOVED***
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				***REMOVED*** else if ( context.nodeName.toLowerCase() !== "object" ) ***REMOVED***

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) ***REMOVED***
						nid = nid.replace( rcssescape, fcssescape );
					***REMOVED*** else ***REMOVED***
						context.setAttribute( "id", (nid = expando) );
					***REMOVED***

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) ***REMOVED***
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					***REMOVED***
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				***REMOVED***

				if ( newSelector ) ***REMOVED***
					try ***REMOVED***
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					***REMOVED*** catch ( qsaError ) ***REMOVED***
					***REMOVED*** finally ***REMOVED***
						if ( nid === expando ) ***REMOVED***
							context.removeAttribute( "id" );
						***REMOVED***
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
***REMOVED***

/**
 * Create key-value caches of limited size
 * @returns ***REMOVED***function(string, object)***REMOVED*** Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() ***REMOVED***
	var keys = [];

	function cache( key, value ) ***REMOVED***
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) ***REMOVED***
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		***REMOVED***
		return (cache[ key + " " ] = value);
	***REMOVED***
	return cache;
***REMOVED***

/**
 * Mark a function for special use by Sizzle
 * @param ***REMOVED***Function***REMOVED*** fn The function to mark
 */
function markFunction( fn ) ***REMOVED***
	fn[ expando ] = true;
	return fn;
***REMOVED***

/**
 * Support testing using an element
 * @param ***REMOVED***Function***REMOVED*** fn Passed the created element and returns a boolean result
 */
function assert( fn ) ***REMOVED***
	var el = document.createElement("fieldset");

	try ***REMOVED***
		return !!fn( el );
	***REMOVED*** catch (e) ***REMOVED***
		return false;
	***REMOVED*** finally ***REMOVED***
		// Remove from its parent by default
		if ( el.parentNode ) ***REMOVED***
			el.parentNode.removeChild( el );
		***REMOVED***
		// release memory in IE
		el = null;
	***REMOVED***
***REMOVED***

/**
 * Adds the same handler for all of the specified attrs
 * @param ***REMOVED***String***REMOVED*** attrs Pipe-separated list of attributes
 * @param ***REMOVED***Function***REMOVED*** handler The method that will be applied
 */
function addHandle( attrs, handler ) ***REMOVED***
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) ***REMOVED***
		Expr.attrHandle[ arr[i] ] = handler;
	***REMOVED***
***REMOVED***

/**
 * Checks document order of two siblings
 * @param ***REMOVED***Element***REMOVED*** a
 * @param ***REMOVED***Element***REMOVED*** b
 * @returns ***REMOVED***Number***REMOVED*** Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) ***REMOVED***
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) ***REMOVED***
		return diff;
	***REMOVED***

	// Check if b follows a
	if ( cur ) ***REMOVED***
		while ( (cur = cur.nextSibling) ) ***REMOVED***
			if ( cur === b ) ***REMOVED***
				return -1;
			***REMOVED***
		***REMOVED***
	***REMOVED***

	return a ? 1 : -1;
***REMOVED***

/**
 * Returns a function to use in pseudos for input types
 * @param ***REMOVED***String***REMOVED*** type
 */
function createInputPseudo( type ) ***REMOVED***
	return function( elem ) ***REMOVED***
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	***REMOVED***;
***REMOVED***

/**
 * Returns a function to use in pseudos for buttons
 * @param ***REMOVED***String***REMOVED*** type
 */
function createButtonPseudo( type ) ***REMOVED***
	return function( elem ) ***REMOVED***
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	***REMOVED***;
***REMOVED***

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param ***REMOVED***Boolean***REMOVED*** disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) ***REMOVED***

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) ***REMOVED***

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) ***REMOVED***

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) ***REMOVED***

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) ***REMOVED***
					if ( "label" in elem.parentNode ) ***REMOVED***
						return elem.parentNode.disabled === disabled;
					***REMOVED*** else ***REMOVED***
						return elem.disabled === disabled;
					***REMOVED***
				***REMOVED***

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			***REMOVED***

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		***REMOVED*** else if ( "label" in elem ) ***REMOVED***
			return elem.disabled === disabled;
		***REMOVED***

		// Remaining elements are neither :enabled nor :disabled
		return false;
	***REMOVED***;
***REMOVED***

/**
 * Returns a function to use in pseudos for positionals
 * @param ***REMOVED***Function***REMOVED*** fn
 */
function createPositionalPseudo( fn ) ***REMOVED***
	return markFunction(function( argument ) ***REMOVED***
		argument = +argument;
		return markFunction(function( seed, matches ) ***REMOVED***
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) ***REMOVED***
				if ( seed[ (j = matchIndexes[i]) ] ) ***REMOVED***
					seed[j] = !(matches[j] = seed[j]);
				***REMOVED***
			***REMOVED***
		***REMOVED***);
	***REMOVED***);
***REMOVED***

/**
 * Checks a node for validity as a Sizzle context
 * @param ***REMOVED***Element|Object=***REMOVED*** context
 * @returns ***REMOVED***Element|Object|Boolean***REMOVED*** The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) ***REMOVED***
	return context && typeof context.getElementsByTagName !== "undefined" && context;
***REMOVED***

// Expose support vars for convenience
support = Sizzle.support = ***REMOVED******REMOVED***;

/**
 * Detects XML nodes
 * @param ***REMOVED***Element|Object***REMOVED*** elem An element or a document
 * @returns ***REMOVED***Boolean***REMOVED*** True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) ***REMOVED***
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
***REMOVED***;

/**
 * Sets document-related variables once based on the current document
 * @param ***REMOVED***Element|Object***REMOVED*** [doc] An element or document object to use to set the document
 * @returns ***REMOVED***Object***REMOVED*** Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) ***REMOVED***
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) ***REMOVED***
		return document;
	***REMOVED***

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) ***REMOVED***

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) ***REMOVED***
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		***REMOVED*** else if ( subWindow.attachEvent ) ***REMOVED***
			subWindow.attachEvent( "onunload", unloadHandler );
		***REMOVED***
	***REMOVED***

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) ***REMOVED***
		el.className = "i";
		return !el.getAttribute("className");
	***REMOVED***);

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) ***REMOVED***
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	***REMOVED***);

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) ***REMOVED***
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	***REMOVED***);

	// ID filter and find
	if ( support.getById ) ***REMOVED***
		Expr.filter["ID"] = function( id ) ***REMOVED***
			var attrId = id.replace( runescape, funescape );
			return function( elem ) ***REMOVED***
				return elem.getAttribute("id") === attrId;
			***REMOVED***;
		***REMOVED***;
		Expr.find["ID"] = function( id, context ) ***REMOVED***
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) ***REMOVED***
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			***REMOVED***
		***REMOVED***;
	***REMOVED*** else ***REMOVED***
		Expr.filter["ID"] =  function( id ) ***REMOVED***
			var attrId = id.replace( runescape, funescape );
			return function( elem ) ***REMOVED***
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			***REMOVED***;
		***REMOVED***;

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) ***REMOVED***
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) ***REMOVED***
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) ***REMOVED***

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) ***REMOVED***
						return [ elem ];
					***REMOVED***

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) ***REMOVED***
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) ***REMOVED***
							return [ elem ];
						***REMOVED***
					***REMOVED***
				***REMOVED***

				return [];
			***REMOVED***
		***REMOVED***;
	***REMOVED***

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) ***REMOVED***
			if ( typeof context.getElementsByTagName !== "undefined" ) ***REMOVED***
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			***REMOVED*** else if ( support.qsa ) ***REMOVED***
				return context.querySelectorAll( tag );
			***REMOVED***
		***REMOVED*** :

		function( tag, context ) ***REMOVED***
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) ***REMOVED***
				while ( (elem = results[i++]) ) ***REMOVED***
					if ( elem.nodeType === 1 ) ***REMOVED***
						tmp.push( elem );
					***REMOVED***
				***REMOVED***

				return tmp;
			***REMOVED***
			return results;
		***REMOVED***;

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) ***REMOVED***
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) ***REMOVED***
			return context.getElementsByClassName( className );
		***REMOVED***
	***REMOVED***;

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) ***REMOVED***
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) ***REMOVED***
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) ***REMOVED***
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			***REMOVED***

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) ***REMOVED***
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			***REMOVED***

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) ***REMOVED***
				rbuggyQSA.push("~=");
			***REMOVED***

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) ***REMOVED***
				rbuggyQSA.push(":checked");
			***REMOVED***

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) ***REMOVED***
				rbuggyQSA.push(".#.+[+~]");
			***REMOVED***
		***REMOVED***);

		assert(function( el ) ***REMOVED***
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) ***REMOVED***
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			***REMOVED***

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) ***REMOVED***
				rbuggyQSA.push( ":enabled", ":disabled" );
			***REMOVED***

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) ***REMOVED***
				rbuggyQSA.push( ":enabled", ":disabled" );
			***REMOVED***

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		***REMOVED***);
	***REMOVED***

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) ***REMOVED***

		assert(function( el ) ***REMOVED***
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		***REMOVED***);
	***REMOVED***

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) ***REMOVED***
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		***REMOVED*** :
		function( a, b ) ***REMOVED***
			if ( b ) ***REMOVED***
				while ( (b = b.parentNode) ) ***REMOVED***
					if ( b === a ) ***REMOVED***
						return true;
					***REMOVED***
				***REMOVED***
			***REMOVED***
			return false;
		***REMOVED***;

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) ***REMOVED***

		// Flag for duplicate removal
		if ( a === b ) ***REMOVED***
			hasDuplicate = true;
			return 0;
		***REMOVED***

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) ***REMOVED***
			return compare;
		***REMOVED***

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) ***REMOVED***

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) ***REMOVED***
				return -1;
			***REMOVED***
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) ***REMOVED***
				return 1;
			***REMOVED***

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		***REMOVED***

		return compare & 4 ? -1 : 1;
	***REMOVED*** :
	function( a, b ) ***REMOVED***
		// Exit early if the nodes are identical
		if ( a === b ) ***REMOVED***
			hasDuplicate = true;
			return 0;
		***REMOVED***

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) ***REMOVED***
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		***REMOVED*** else if ( aup === bup ) ***REMOVED***
			return siblingCheck( a, b );
		***REMOVED***

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) ***REMOVED***
			ap.unshift( cur );
		***REMOVED***
		cur = b;
		while ( (cur = cur.parentNode) ) ***REMOVED***
			bp.unshift( cur );
		***REMOVED***

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) ***REMOVED***
			i++;
		***REMOVED***

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	***REMOVED***;

	return document;
***REMOVED***;

Sizzle.matches = function( expr, elements ) ***REMOVED***
	return Sizzle( expr, null, null, elements );
***REMOVED***;

Sizzle.matchesSelector = function( elem, expr ) ***REMOVED***
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) ***REMOVED***
		setDocument( elem );
	***REMOVED***

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) ***REMOVED***

		try ***REMOVED***
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) ***REMOVED***
				return ret;
			***REMOVED***
		***REMOVED*** catch (e) ***REMOVED******REMOVED***
	***REMOVED***

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
***REMOVED***;

Sizzle.contains = function( context, elem ) ***REMOVED***
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) ***REMOVED***
		setDocument( context );
	***REMOVED***
	return contains( context, elem );
***REMOVED***;

Sizzle.attr = function( elem, name ) ***REMOVED***
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) ***REMOVED***
		setDocument( elem );
	***REMOVED***

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
***REMOVED***;

Sizzle.escape = function( sel ) ***REMOVED***
	return (sel + "").replace( rcssescape, fcssescape );
***REMOVED***;

Sizzle.error = function( msg ) ***REMOVED***
	throw new Error( "Syntax error, unrecognized expression: " + msg );
***REMOVED***;

/**
 * Document sorting and removing duplicates
 * @param ***REMOVED***ArrayLike***REMOVED*** results
 */
Sizzle.uniqueSort = function( results ) ***REMOVED***
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) ***REMOVED***
		while ( (elem = results[i++]) ) ***REMOVED***
			if ( elem === results[ i ] ) ***REMOVED***
				j = duplicates.push( i );
			***REMOVED***
		***REMOVED***
		while ( j-- ) ***REMOVED***
			results.splice( duplicates[ j ], 1 );
		***REMOVED***
	***REMOVED***

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
***REMOVED***;

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param ***REMOVED***Array|Element***REMOVED*** elem
 */
getText = Sizzle.getText = function( elem ) ***REMOVED***
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) ***REMOVED***
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) ***REMOVED***
			// Do not traverse comment nodes
			ret += getText( node );
		***REMOVED***
	***REMOVED*** else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) ***REMOVED***
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) ***REMOVED***
			return elem.textContent;
		***REMOVED*** else ***REMOVED***
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) ***REMOVED***
				ret += getText( elem );
			***REMOVED***
		***REMOVED***
	***REMOVED*** else if ( nodeType === 3 || nodeType === 4 ) ***REMOVED***
		return elem.nodeValue;
	***REMOVED***
	// Do not include comment or processing instruction nodes

	return ret;
***REMOVED***;

Expr = Sizzle.selectors = ***REMOVED***

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: ***REMOVED******REMOVED***,

	find: ***REMOVED******REMOVED***,

	relative: ***REMOVED***
		">": ***REMOVED*** dir: "parentNode", first: true ***REMOVED***,
		" ": ***REMOVED*** dir: "parentNode" ***REMOVED***,
		"+": ***REMOVED*** dir: "previousSibling", first: true ***REMOVED***,
		"~": ***REMOVED*** dir: "previousSibling" ***REMOVED***
	***REMOVED***,

	preFilter: ***REMOVED***
		"ATTR": function( match ) ***REMOVED***
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) ***REMOVED***
				match[3] = " " + match[3] + " ";
			***REMOVED***

			return match.slice( 0, 4 );
		***REMOVED***,

		"CHILD": function( match ) ***REMOVED***
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) ***REMOVED***
				// nth-* requires argument
				if ( !match[3] ) ***REMOVED***
					Sizzle.error( match[0] );
				***REMOVED***

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			***REMOVED*** else if ( match[3] ) ***REMOVED***
				Sizzle.error( match[0] );
			***REMOVED***

			return match;
		***REMOVED***,

		"PSEUDO": function( match ) ***REMOVED***
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) ***REMOVED***
				return null;
			***REMOVED***

			// Accept quoted arguments as-is
			if ( match[3] ) ***REMOVED***
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			***REMOVED*** else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) ***REMOVED***

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			***REMOVED***

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		***REMOVED***
	***REMOVED***,

	filter: ***REMOVED***

		"TAG": function( nodeNameSelector ) ***REMOVED***
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() ***REMOVED*** return true; ***REMOVED*** :
				function( elem ) ***REMOVED***
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				***REMOVED***;
		***REMOVED***,

		"CLASS": function( className ) ***REMOVED***
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) ***REMOVED***
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				***REMOVED***);
		***REMOVED***,

		"ATTR": function( name, operator, check ) ***REMOVED***
			return function( elem ) ***REMOVED***
				var result = Sizzle.attr( elem, name );

				if ( result == null ) ***REMOVED***
					return operator === "!=";
				***REMOVED***
				if ( !operator ) ***REMOVED***
					return true;
				***REMOVED***

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			***REMOVED***;
		***REMOVED***,

		"CHILD": function( type, what, argument, first, last ) ***REMOVED***
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) ***REMOVED***
					return !!elem.parentNode;
				***REMOVED*** :

				function( elem, context, xml ) ***REMOVED***
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) ***REMOVED***

						// :(first|last|only)-(child|of-type)
						if ( simple ) ***REMOVED***
							while ( dir ) ***REMOVED***
								node = elem;
								while ( (node = node[ dir ]) ) ***REMOVED***
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) ***REMOVED***

										return false;
									***REMOVED***
								***REMOVED***
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							***REMOVED***
							return true;
						***REMOVED***

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) ***REMOVED***

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = ***REMOVED******REMOVED***);

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = ***REMOVED******REMOVED***);

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) ***REMOVED***

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) ***REMOVED***
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								***REMOVED***
							***REMOVED***

						***REMOVED*** else ***REMOVED***
							// Use previously-cached element index if available
							if ( useCache ) ***REMOVED***
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = ***REMOVED******REMOVED***);

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = ***REMOVED******REMOVED***);

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							***REMOVED***

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) ***REMOVED***
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) ***REMOVED***

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) ***REMOVED***

										// Cache the index of each encountered element
										if ( useCache ) ***REMOVED***
											outerCache = node[ expando ] || (node[ expando ] = ***REMOVED******REMOVED***);

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = ***REMOVED******REMOVED***);

											uniqueCache[ type ] = [ dirruns, diff ];
										***REMOVED***

										if ( node === elem ) ***REMOVED***
											break;
										***REMOVED***
									***REMOVED***
								***REMOVED***
							***REMOVED***
						***REMOVED***

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					***REMOVED***
				***REMOVED***;
		***REMOVED***,

		"PSEUDO": function( pseudo, argument ) ***REMOVED***
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) ***REMOVED***
				return fn( argument );
			***REMOVED***

			// But maintain support for old signatures
			if ( fn.length > 1 ) ***REMOVED***
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) ***REMOVED***
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) ***REMOVED***
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						***REMOVED***
					***REMOVED***) :
					function( elem ) ***REMOVED***
						return fn( elem, 0, args );
					***REMOVED***;
			***REMOVED***

			return fn;
		***REMOVED***
	***REMOVED***,

	pseudos: ***REMOVED***
		// Potentially complex pseudos
		"not": markFunction(function( selector ) ***REMOVED***
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) ***REMOVED***
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) ***REMOVED***
						if ( (elem = unmatched[i]) ) ***REMOVED***
							seed[i] = !(matches[i] = elem);
						***REMOVED***
					***REMOVED***
				***REMOVED***) :
				function( elem, context, xml ) ***REMOVED***
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				***REMOVED***;
		***REMOVED***),

		"has": markFunction(function( selector ) ***REMOVED***
			return function( elem ) ***REMOVED***
				return Sizzle( selector, elem ).length > 0;
			***REMOVED***;
		***REMOVED***),

		"contains": markFunction(function( text ) ***REMOVED***
			text = text.replace( runescape, funescape );
			return function( elem ) ***REMOVED***
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			***REMOVED***;
		***REMOVED***),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) ***REMOVED***
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) ***REMOVED***
				Sizzle.error( "unsupported lang: " + lang );
			***REMOVED***
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) ***REMOVED***
				var elemLang;
				do ***REMOVED***
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) ***REMOVED***

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					***REMOVED***
				***REMOVED*** while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			***REMOVED***;
		***REMOVED***),

		// Miscellaneous
		"target": function( elem ) ***REMOVED***
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		***REMOVED***,

		"root": function( elem ) ***REMOVED***
			return elem === docElem;
		***REMOVED***,

		"focus": function( elem ) ***REMOVED***
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		***REMOVED***,

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) ***REMOVED***
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		***REMOVED***,

		"selected": function( elem ) ***REMOVED***
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) ***REMOVED***
				elem.parentNode.selectedIndex;
			***REMOVED***

			return elem.selected === true;
		***REMOVED***,

		// Contents
		"empty": function( elem ) ***REMOVED***
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) ***REMOVED***
				if ( elem.nodeType < 6 ) ***REMOVED***
					return false;
				***REMOVED***
			***REMOVED***
			return true;
		***REMOVED***,

		"parent": function( elem ) ***REMOVED***
			return !Expr.pseudos["empty"]( elem );
		***REMOVED***,

		// Element/input types
		"header": function( elem ) ***REMOVED***
			return rheader.test( elem.nodeName );
		***REMOVED***,

		"input": function( elem ) ***REMOVED***
			return rinputs.test( elem.nodeName );
		***REMOVED***,

		"button": function( elem ) ***REMOVED***
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		***REMOVED***,

		"text": function( elem ) ***REMOVED***
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		***REMOVED***,

		// Position-in-collection
		"first": createPositionalPseudo(function() ***REMOVED***
			return [ 0 ];
		***REMOVED***),

		"last": createPositionalPseudo(function( matchIndexes, length ) ***REMOVED***
			return [ length - 1 ];
		***REMOVED***),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) ***REMOVED***
			return [ argument < 0 ? argument + length : argument ];
		***REMOVED***),

		"even": createPositionalPseudo(function( matchIndexes, length ) ***REMOVED***
			var i = 0;
			for ( ; i < length; i += 2 ) ***REMOVED***
				matchIndexes.push( i );
			***REMOVED***
			return matchIndexes;
		***REMOVED***),

		"odd": createPositionalPseudo(function( matchIndexes, length ) ***REMOVED***
			var i = 1;
			for ( ; i < length; i += 2 ) ***REMOVED***
				matchIndexes.push( i );
			***REMOVED***
			return matchIndexes;
		***REMOVED***),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) ***REMOVED***
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) ***REMOVED***
				matchIndexes.push( i );
			***REMOVED***
			return matchIndexes;
		***REMOVED***),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) ***REMOVED***
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) ***REMOVED***
				matchIndexes.push( i );
			***REMOVED***
			return matchIndexes;
		***REMOVED***)
	***REMOVED***
***REMOVED***;

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in ***REMOVED*** radio: true, checkbox: true, file: true, password: true, image: true ***REMOVED*** ) ***REMOVED***
	Expr.pseudos[ i ] = createInputPseudo( i );
***REMOVED***
for ( i in ***REMOVED*** submit: true, reset: true ***REMOVED*** ) ***REMOVED***
	Expr.pseudos[ i ] = createButtonPseudo( i );
***REMOVED***

// Easy API for creating new setFilters
function setFilters() ***REMOVED******REMOVED***
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) ***REMOVED***
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) ***REMOVED***
		return parseOnly ? 0 : cached.slice( 0 );
	***REMOVED***

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) ***REMOVED***

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) ***REMOVED***
			if ( match ) ***REMOVED***
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			***REMOVED***
			groups.push( (tokens = []) );
		***REMOVED***

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) ***REMOVED***
			matched = match.shift();
			tokens.push(***REMOVED***
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			***REMOVED***);
			soFar = soFar.slice( matched.length );
		***REMOVED***

		// Filters
		for ( type in Expr.filter ) ***REMOVED***
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) ***REMOVED***
				matched = match.shift();
				tokens.push(***REMOVED***
					value: matched,
					type: type,
					matches: match
				***REMOVED***);
				soFar = soFar.slice( matched.length );
			***REMOVED***
		***REMOVED***

		if ( !matched ) ***REMOVED***
			break;
		***REMOVED***
	***REMOVED***

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
***REMOVED***;

function toSelector( tokens ) ***REMOVED***
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) ***REMOVED***
		selector += tokens[i].value;
	***REMOVED***
	return selector;
***REMOVED***

function addCombinator( matcher, combinator, base ) ***REMOVED***
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) ***REMOVED***
			while ( (elem = elem[ dir ]) ) ***REMOVED***
				if ( elem.nodeType === 1 || checkNonElements ) ***REMOVED***
					return matcher( elem, context, xml );
				***REMOVED***
			***REMOVED***
			return false;
		***REMOVED*** :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) ***REMOVED***
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) ***REMOVED***
				while ( (elem = elem[ dir ]) ) ***REMOVED***
					if ( elem.nodeType === 1 || checkNonElements ) ***REMOVED***
						if ( matcher( elem, context, xml ) ) ***REMOVED***
							return true;
						***REMOVED***
					***REMOVED***
				***REMOVED***
			***REMOVED*** else ***REMOVED***
				while ( (elem = elem[ dir ]) ) ***REMOVED***
					if ( elem.nodeType === 1 || checkNonElements ) ***REMOVED***
						outerCache = elem[ expando ] || (elem[ expando ] = ***REMOVED******REMOVED***);

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = ***REMOVED******REMOVED***);

						if ( skip && skip === elem.nodeName.toLowerCase() ) ***REMOVED***
							elem = elem[ dir ] || elem;
						***REMOVED*** else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) ***REMOVED***

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						***REMOVED*** else ***REMOVED***
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) ***REMOVED***
								return true;
							***REMOVED***
						***REMOVED***
					***REMOVED***
				***REMOVED***
			***REMOVED***
			return false;
		***REMOVED***;
***REMOVED***

function elementMatcher( matchers ) ***REMOVED***
	return matchers.length > 1 ?
		function( elem, context, xml ) ***REMOVED***
			var i = matchers.length;
			while ( i-- ) ***REMOVED***
				if ( !matchers[i]( elem, context, xml ) ) ***REMOVED***
					return false;
				***REMOVED***
			***REMOVED***
			return true;
		***REMOVED*** :
		matchers[0];
***REMOVED***

function multipleContexts( selector, contexts, results ) ***REMOVED***
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) ***REMOVED***
		Sizzle( selector, contexts[i], results );
	***REMOVED***
	return results;
***REMOVED***

function condense( unmatched, map, filter, context, xml ) ***REMOVED***
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) ***REMOVED***
		if ( (elem = unmatched[i]) ) ***REMOVED***
			if ( !filter || filter( elem, context, xml ) ) ***REMOVED***
				newUnmatched.push( elem );
				if ( mapped ) ***REMOVED***
					map.push( i );
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***

	return newUnmatched;
***REMOVED***

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) ***REMOVED***
	if ( postFilter && !postFilter[ expando ] ) ***REMOVED***
		postFilter = setMatcher( postFilter );
	***REMOVED***
	if ( postFinder && !postFinder[ expando ] ) ***REMOVED***
		postFinder = setMatcher( postFinder, postSelector );
	***REMOVED***
	return markFunction(function( seed, results, context, xml ) ***REMOVED***
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) ***REMOVED***
			matcher( matcherIn, matcherOut, context, xml );
		***REMOVED***

		// Apply postFilter
		if ( postFilter ) ***REMOVED***
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) ***REMOVED***
				if ( (elem = temp[i]) ) ***REMOVED***
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				***REMOVED***
			***REMOVED***
		***REMOVED***

		if ( seed ) ***REMOVED***
			if ( postFinder || preFilter ) ***REMOVED***
				if ( postFinder ) ***REMOVED***
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) ***REMOVED***
						if ( (elem = matcherOut[i]) ) ***REMOVED***
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						***REMOVED***
					***REMOVED***
					postFinder( null, (matcherOut = []), temp, xml );
				***REMOVED***

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) ***REMOVED***
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) ***REMOVED***

						seed[temp] = !(results[temp] = elem);
					***REMOVED***
				***REMOVED***
			***REMOVED***

		// Add elements to results, through postFinder if defined
		***REMOVED*** else ***REMOVED***
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) ***REMOVED***
				postFinder( null, results, matcherOut, xml );
			***REMOVED*** else ***REMOVED***
				push.apply( results, matcherOut );
			***REMOVED***
		***REMOVED***
	***REMOVED***);
***REMOVED***

function matcherFromTokens( tokens ) ***REMOVED***
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) ***REMOVED***
			return elem === checkContext;
		***REMOVED***, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) ***REMOVED***
			return indexOf( checkContext, elem ) > -1;
		***REMOVED***, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) ***REMOVED***
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		***REMOVED*** ];

	for ( ; i < len; i++ ) ***REMOVED***
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) ***REMOVED***
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		***REMOVED*** else ***REMOVED***
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) ***REMOVED***
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) ***REMOVED***
					if ( Expr.relative[ tokens[j].type ] ) ***REMOVED***
						break;
					***REMOVED***
				***REMOVED***
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat(***REMOVED*** value: tokens[ i - 2 ].type === " " ? "*" : "" ***REMOVED***)
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			***REMOVED***
			matchers.push( matcher );
		***REMOVED***
	***REMOVED***

	return elementMatcher( matchers );
***REMOVED***

function matcherFromGroupMatchers( elementMatchers, setMatchers ) ***REMOVED***
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) ***REMOVED***
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) ***REMOVED***
				outermostContext = context === document || context || outermost;
			***REMOVED***

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) ***REMOVED***
				if ( byElement && elem ) ***REMOVED***
					j = 0;
					if ( !context && elem.ownerDocument !== document ) ***REMOVED***
						setDocument( elem );
						xml = !documentIsHTML;
					***REMOVED***
					while ( (matcher = elementMatchers[j++]) ) ***REMOVED***
						if ( matcher( elem, context || document, xml) ) ***REMOVED***
							results.push( elem );
							break;
						***REMOVED***
					***REMOVED***
					if ( outermost ) ***REMOVED***
						dirruns = dirrunsUnique;
					***REMOVED***
				***REMOVED***

				// Track unmatched elements for set filters
				if ( bySet ) ***REMOVED***
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) ***REMOVED***
						matchedCount--;
					***REMOVED***

					// Lengthen the array for every element, matched or not
					if ( seed ) ***REMOVED***
						unmatched.push( elem );
					***REMOVED***
				***REMOVED***
			***REMOVED***

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) ***REMOVED***
				j = 0;
				while ( (matcher = setMatchers[j++]) ) ***REMOVED***
					matcher( unmatched, setMatched, context, xml );
				***REMOVED***

				if ( seed ) ***REMOVED***
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) ***REMOVED***
						while ( i-- ) ***REMOVED***
							if ( !(unmatched[i] || setMatched[i]) ) ***REMOVED***
								setMatched[i] = pop.call( results );
							***REMOVED***
						***REMOVED***
					***REMOVED***

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				***REMOVED***

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) ***REMOVED***

					Sizzle.uniqueSort( results );
				***REMOVED***
			***REMOVED***

			// Override manipulation of globals by nested matchers
			if ( outermost ) ***REMOVED***
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			***REMOVED***

			return unmatched;
		***REMOVED***;

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
***REMOVED***

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) ***REMOVED***
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) ***REMOVED***
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) ***REMOVED***
			match = tokenize( selector );
		***REMOVED***
		i = match.length;
		while ( i-- ) ***REMOVED***
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) ***REMOVED***
				setMatchers.push( cached );
			***REMOVED*** else ***REMOVED***
				elementMatchers.push( cached );
			***REMOVED***
		***REMOVED***

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	***REMOVED***
	return cached;
***REMOVED***;

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param ***REMOVED***String|Function***REMOVED*** selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param ***REMOVED***Element***REMOVED*** context
 * @param ***REMOVED***Array***REMOVED*** [results]
 * @param ***REMOVED***Array***REMOVED*** [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) ***REMOVED***
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) ***REMOVED***

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) ***REMOVED***

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) ***REMOVED***
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			***REMOVED*** else if ( compiled ) ***REMOVED***
				context = context.parentNode;
			***REMOVED***

			selector = selector.slice( tokens.shift().value.length );
		***REMOVED***

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) ***REMOVED***
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) ***REMOVED***
				break;
			***REMOVED***
			if ( (find = Expr.find[ type ]) ) ***REMOVED***
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) ***REMOVED***

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) ***REMOVED***
						push.apply( results, seed );
						return results;
					***REMOVED***

					break;
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
***REMOVED***;

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) ***REMOVED***
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
***REMOVED***);

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) ***REMOVED***
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
***REMOVED***) ) ***REMOVED***
	addHandle( "type|href|height|width", function( elem, name, isXML ) ***REMOVED***
		if ( !isXML ) ***REMOVED***
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		***REMOVED***
	***REMOVED***);
***REMOVED***

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) ***REMOVED***
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
***REMOVED***) ) ***REMOVED***
	addHandle( "value", function( elem, name, isXML ) ***REMOVED***
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) ***REMOVED***
			return elem.defaultValue;
		***REMOVED***
	***REMOVED***);
***REMOVED***

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) ***REMOVED***
	return el.getAttribute("disabled") == null;
***REMOVED***) ) ***REMOVED***
	addHandle( booleans, function( elem, name, isXML ) ***REMOVED***
		var val;
		if ( !isXML ) ***REMOVED***
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		***REMOVED***
	***REMOVED***);
***REMOVED***

return Sizzle;

***REMOVED***)( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) ***REMOVED***
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) ***REMOVED***
		if ( elem.nodeType === 1 ) ***REMOVED***
			if ( truncate && jQuery( elem ).is( until ) ) ***REMOVED***
				break;
			***REMOVED***
			matched.push( elem );
		***REMOVED***
	***REMOVED***
	return matched;
***REMOVED***;


var siblings = function( n, elem ) ***REMOVED***
	var matched = [];

	for ( ; n; n = n.nextSibling ) ***REMOVED***
		if ( n.nodeType === 1 && n !== elem ) ***REMOVED***
			matched.push( n );
		***REMOVED***
	***REMOVED***

	return matched;
***REMOVED***;


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) ***REMOVED***

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

***REMOVED***;
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) ***REMOVED***
	if ( isFunction( qualifier ) ) ***REMOVED***
		return jQuery.grep( elements, function( elem, i ) ***REMOVED***
			return !!qualifier.call( elem, i, elem ) !== not;
		***REMOVED*** );
	***REMOVED***

	// Single element
	if ( qualifier.nodeType ) ***REMOVED***
		return jQuery.grep( elements, function( elem ) ***REMOVED***
			return ( elem === qualifier ) !== not;
		***REMOVED*** );
	***REMOVED***

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) ***REMOVED***
		return jQuery.grep( elements, function( elem ) ***REMOVED***
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		***REMOVED*** );
	***REMOVED***

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
***REMOVED***

jQuery.filter = function( expr, elems, not ) ***REMOVED***
	var elem = elems[ 0 ];

	if ( not ) ***REMOVED***
		expr = ":not(" + expr + ")";
	***REMOVED***

	if ( elems.length === 1 && elem.nodeType === 1 ) ***REMOVED***
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	***REMOVED***

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) ***REMOVED***
		return elem.nodeType === 1;
	***REMOVED*** ) );
***REMOVED***;

jQuery.fn.extend( ***REMOVED***
	find: function( selector ) ***REMOVED***
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) ***REMOVED***
			return this.pushStack( jQuery( selector ).filter( function() ***REMOVED***
				for ( i = 0; i < len; i++ ) ***REMOVED***
					if ( jQuery.contains( self[ i ], this ) ) ***REMOVED***
						return true;
					***REMOVED***
				***REMOVED***
			***REMOVED*** ) );
		***REMOVED***

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) ***REMOVED***
			jQuery.find( selector, self[ i ], ret );
		***REMOVED***

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	***REMOVED***,
	filter: function( selector ) ***REMOVED***
		return this.pushStack( winnow( this, selector || [], false ) );
	***REMOVED***,
	not: function( selector ) ***REMOVED***
		return this.pushStack( winnow( this, selector || [], true ) );
	***REMOVED***,
	is: function( selector ) ***REMOVED***
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	***REMOVED***
***REMOVED*** );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) ***REMOVED***
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) ***REMOVED***
			return this;
		***REMOVED***

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) ***REMOVED***
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) ***REMOVED***

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			***REMOVED*** else ***REMOVED***
				match = rquickExpr.exec( selector );
			***REMOVED***

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) ***REMOVED***

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) ***REMOVED***
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) ***REMOVED***
						for ( match in context ) ***REMOVED***

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) ***REMOVED***
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							***REMOVED*** else ***REMOVED***
								this.attr( match, context[ match ] );
							***REMOVED***
						***REMOVED***
					***REMOVED***

					return this;

				// HANDLE: $(#id)
				***REMOVED*** else ***REMOVED***
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) ***REMOVED***

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					***REMOVED***
					return this;
				***REMOVED***

			// HANDLE: $(expr, $(...))
			***REMOVED*** else if ( !context || context.jquery ) ***REMOVED***
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			***REMOVED*** else ***REMOVED***
				return this.constructor( context ).find( selector );
			***REMOVED***

		// HANDLE: $(DOMElement)
		***REMOVED*** else if ( selector.nodeType ) ***REMOVED***
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		***REMOVED*** else if ( isFunction( selector ) ) ***REMOVED***
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		***REMOVED***

		return jQuery.makeArray( selector, this );
	***REMOVED***;

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = ***REMOVED***
		children: true,
		contents: true,
		next: true,
		prev: true
	***REMOVED***;

jQuery.fn.extend( ***REMOVED***
	has: function( target ) ***REMOVED***
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() ***REMOVED***
			var i = 0;
			for ( ; i < l; i++ ) ***REMOVED***
				if ( jQuery.contains( this, targets[ i ] ) ) ***REMOVED***
					return true;
				***REMOVED***
			***REMOVED***
		***REMOVED*** );
	***REMOVED***,

	closest: function( selectors, context ) ***REMOVED***
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) ***REMOVED***
			for ( ; i < l; i++ ) ***REMOVED***
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) ***REMOVED***

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) ***REMOVED***

						matched.push( cur );
						break;
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	***REMOVED***,

	// Determine the position of an element within the set
	index: function( elem ) ***REMOVED***

		// No argument, return index in parent
		if ( !elem ) ***REMOVED***
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		***REMOVED***

		// Index in selector
		if ( typeof elem === "string" ) ***REMOVED***
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		***REMOVED***

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	***REMOVED***,

	add: function( selector, context ) ***REMOVED***
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	***REMOVED***,

	addBack: function( selector ) ***REMOVED***
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	***REMOVED***
***REMOVED*** );

function sibling( cur, dir ) ***REMOVED***
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) ***REMOVED******REMOVED***
	return cur;
***REMOVED***

jQuery.each( ***REMOVED***
	parent: function( elem ) ***REMOVED***
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	***REMOVED***,
	parents: function( elem ) ***REMOVED***
		return dir( elem, "parentNode" );
	***REMOVED***,
	parentsUntil: function( elem, i, until ) ***REMOVED***
		return dir( elem, "parentNode", until );
	***REMOVED***,
	next: function( elem ) ***REMOVED***
		return sibling( elem, "nextSibling" );
	***REMOVED***,
	prev: function( elem ) ***REMOVED***
		return sibling( elem, "previousSibling" );
	***REMOVED***,
	nextAll: function( elem ) ***REMOVED***
		return dir( elem, "nextSibling" );
	***REMOVED***,
	prevAll: function( elem ) ***REMOVED***
		return dir( elem, "previousSibling" );
	***REMOVED***,
	nextUntil: function( elem, i, until ) ***REMOVED***
		return dir( elem, "nextSibling", until );
	***REMOVED***,
	prevUntil: function( elem, i, until ) ***REMOVED***
		return dir( elem, "previousSibling", until );
	***REMOVED***,
	siblings: function( elem ) ***REMOVED***
		return siblings( ( elem.parentNode || ***REMOVED******REMOVED*** ).firstChild, elem );
	***REMOVED***,
	children: function( elem ) ***REMOVED***
		return siblings( elem.firstChild );
	***REMOVED***,
	contents: function( elem ) ***REMOVED***
        if ( nodeName( elem, "iframe" ) ) ***REMOVED***
            return elem.contentDocument;
        ***REMOVED***

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) ***REMOVED***
            elem = elem.content || elem;
        ***REMOVED***

        return jQuery.merge( [], elem.childNodes );
	***REMOVED***
***REMOVED***, function( name, fn ) ***REMOVED***
	jQuery.fn[ name ] = function( until, selector ) ***REMOVED***
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) ***REMOVED***
			selector = until;
		***REMOVED***

		if ( selector && typeof selector === "string" ) ***REMOVED***
			matched = jQuery.filter( selector, matched );
		***REMOVED***

		if ( this.length > 1 ) ***REMOVED***

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) ***REMOVED***
				jQuery.uniqueSort( matched );
			***REMOVED***

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) ***REMOVED***
				matched.reverse();
			***REMOVED***
		***REMOVED***

		return this.pushStack( matched );
	***REMOVED***;
***REMOVED*** );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) ***REMOVED***
	var object = ***REMOVED******REMOVED***;
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) ***REMOVED***
		object[ flag ] = true;
	***REMOVED*** );
	return object;
***REMOVED***

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) ***REMOVED***

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( ***REMOVED******REMOVED***, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() ***REMOVED***

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) ***REMOVED***
				memory = queue.shift();
				while ( ++firingIndex < list.length ) ***REMOVED***

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) ***REMOVED***

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					***REMOVED***
				***REMOVED***
			***REMOVED***

			// Forget the data if we're done with it
			if ( !options.memory ) ***REMOVED***
				memory = false;
			***REMOVED***

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) ***REMOVED***

				// Keep an empty list if we have data for future add calls
				if ( memory ) ***REMOVED***
					list = [];

				// Otherwise, this object is spent
				***REMOVED*** else ***REMOVED***
					list = "";
				***REMOVED***
			***REMOVED***
		***REMOVED***,

		// Actual Callbacks object
		self = ***REMOVED***

			// Add a callback or a collection of callbacks to the list
			add: function() ***REMOVED***
				if ( list ) ***REMOVED***

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) ***REMOVED***
						firingIndex = list.length - 1;
						queue.push( memory );
					***REMOVED***

					( function add( args ) ***REMOVED***
						jQuery.each( args, function( _, arg ) ***REMOVED***
							if ( isFunction( arg ) ) ***REMOVED***
								if ( !options.unique || !self.has( arg ) ) ***REMOVED***
									list.push( arg );
								***REMOVED***
							***REMOVED*** else if ( arg && arg.length && toType( arg ) !== "string" ) ***REMOVED***

								// Inspect recursively
								add( arg );
							***REMOVED***
						***REMOVED*** );
					***REMOVED*** )( arguments );

					if ( memory && !firing ) ***REMOVED***
						fire();
					***REMOVED***
				***REMOVED***
				return this;
			***REMOVED***,

			// Remove a callback from the list
			remove: function() ***REMOVED***
				jQuery.each( arguments, function( _, arg ) ***REMOVED***
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) ***REMOVED***
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) ***REMOVED***
							firingIndex--;
						***REMOVED***
					***REMOVED***
				***REMOVED*** );
				return this;
			***REMOVED***,

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) ***REMOVED***
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			***REMOVED***,

			// Remove all callbacks from the list
			empty: function() ***REMOVED***
				if ( list ) ***REMOVED***
					list = [];
				***REMOVED***
				return this;
			***REMOVED***,

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() ***REMOVED***
				locked = queue = [];
				list = memory = "";
				return this;
			***REMOVED***,
			disabled: function() ***REMOVED***
				return !list;
			***REMOVED***,

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() ***REMOVED***
				locked = queue = [];
				if ( !memory && !firing ) ***REMOVED***
					list = memory = "";
				***REMOVED***
				return this;
			***REMOVED***,
			locked: function() ***REMOVED***
				return !!locked;
			***REMOVED***,

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) ***REMOVED***
				if ( !locked ) ***REMOVED***
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) ***REMOVED***
						fire();
					***REMOVED***
				***REMOVED***
				return this;
			***REMOVED***,

			// Call all the callbacks with the given arguments
			fire: function() ***REMOVED***
				self.fireWith( this, arguments );
				return this;
			***REMOVED***,

			// To know if the callbacks have already been called at least once
			fired: function() ***REMOVED***
				return !!fired;
			***REMOVED***
		***REMOVED***;

	return self;
***REMOVED***;


function Identity( v ) ***REMOVED***
	return v;
***REMOVED***
function Thrower( ex ) ***REMOVED***
	throw ex;
***REMOVED***

function adoptValue( value, resolve, reject, noValue ) ***REMOVED***
	var method;

	try ***REMOVED***

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) ***REMOVED***
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		***REMOVED*** else if ( value && isFunction( ( method = value.then ) ) ) ***REMOVED***
			method.call( value, resolve, reject );

		// Other non-thenables
		***REMOVED*** else ***REMOVED***

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		***REMOVED***

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	***REMOVED*** catch ( value ) ***REMOVED***

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	***REMOVED***
***REMOVED***

jQuery.extend( ***REMOVED***

	Deferred: function( func ) ***REMOVED***
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = ***REMOVED***
				state: function() ***REMOVED***
					return state;
				***REMOVED***,
				always: function() ***REMOVED***
					deferred.done( arguments ).fail( arguments );
					return this;
				***REMOVED***,
				"catch": function( fn ) ***REMOVED***
					return promise.then( null, fn );
				***REMOVED***,

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) ***REMOVED***
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) ***REMOVED***
						jQuery.each( tuples, function( i, tuple ) ***REMOVED***

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() ***REMOVED*** bind to newDefer or newDefer.notify ***REMOVED***)
							// deferred.done(function() ***REMOVED*** bind to newDefer or newDefer.resolve ***REMOVED***)
							// deferred.fail(function() ***REMOVED*** bind to newDefer or newDefer.reject ***REMOVED***)
							deferred[ tuple[ 1 ] ]( function() ***REMOVED***
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) ***REMOVED***
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								***REMOVED*** else ***REMOVED***
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								***REMOVED***
							***REMOVED*** );
						***REMOVED*** );
						fns = null;
					***REMOVED*** ).promise();
				***REMOVED***,
				then: function( onFulfilled, onRejected, onProgress ) ***REMOVED***
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) ***REMOVED***
						return function() ***REMOVED***
							var that = this,
								args = arguments,
								mightThrow = function() ***REMOVED***
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) ***REMOVED***
										return;
									***REMOVED***

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) ***REMOVED***
										throw new TypeError( "Thenable self-resolution" );
									***REMOVED***

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) ***REMOVED***

										// Special processors (notify) just wait for resolution
										if ( special ) ***REMOVED***
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										***REMOVED*** else ***REMOVED***

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										***REMOVED***

									// Handle all other returned values
									***REMOVED*** else ***REMOVED***

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) ***REMOVED***
											that = undefined;
											args = [ returned ];
										***REMOVED***

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									***REMOVED***
								***REMOVED***,

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() ***REMOVED***
										try ***REMOVED***
											mightThrow();
										***REMOVED*** catch ( e ) ***REMOVED***

											if ( jQuery.Deferred.exceptionHook ) ***REMOVED***
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											***REMOVED***

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) ***REMOVED***

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) ***REMOVED***
													that = undefined;
													args = [ e ];
												***REMOVED***

												deferred.rejectWith( that, args );
											***REMOVED***
										***REMOVED***
									***REMOVED***;

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) ***REMOVED***
								process();
							***REMOVED*** else ***REMOVED***

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) ***REMOVED***
									process.stackTrace = jQuery.Deferred.getStackHook();
								***REMOVED***
								window.setTimeout( process );
							***REMOVED***
						***REMOVED***;
					***REMOVED***

					return jQuery.Deferred( function( newDefer ) ***REMOVED***

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					***REMOVED*** ).promise();
				***REMOVED***,

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) ***REMOVED***
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				***REMOVED***
			***REMOVED***,
			deferred = ***REMOVED******REMOVED***;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) ***REMOVED***
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) ***REMOVED***
				list.add(
					function() ***REMOVED***

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					***REMOVED***,

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			***REMOVED***

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() ***REMOVED*** deferred.notifyWith(...) ***REMOVED***
			// deferred.resolve = function() ***REMOVED*** deferred.resolveWith(...) ***REMOVED***
			// deferred.reject = function() ***REMOVED*** deferred.rejectWith(...) ***REMOVED***
			deferred[ tuple[ 0 ] ] = function() ***REMOVED***
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			***REMOVED***;

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		***REMOVED*** );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) ***REMOVED***
			func.call( deferred, deferred );
		***REMOVED***

		// All done!
		return deferred;
	***REMOVED***,

	// Deferred helper
	when: function( singleValue ) ***REMOVED***
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) ***REMOVED***
				return function( value ) ***REMOVED***
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) ***REMOVED***
						master.resolveWith( resolveContexts, resolveValues );
					***REMOVED***
				***REMOVED***;
			***REMOVED***;

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) ***REMOVED***
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) ***REMOVED***

				return master.then();
			***REMOVED***
		***REMOVED***

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) ***REMOVED***
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		***REMOVED***

		return master.promise();
	***REMOVED***
***REMOVED*** );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) ***REMOVED***

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) ***REMOVED***
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	***REMOVED***
***REMOVED***;




jQuery.readyException = function( error ) ***REMOVED***
	window.setTimeout( function() ***REMOVED***
		throw error;
	***REMOVED*** );
***REMOVED***;




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) ***REMOVED***

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) ***REMOVED***
			jQuery.readyException( error );
		***REMOVED*** );

	return this;
***REMOVED***;

jQuery.extend( ***REMOVED***

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) ***REMOVED***

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) ***REMOVED***
			return;
		***REMOVED***

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) ***REMOVED***
			return;
		***REMOVED***

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	***REMOVED***
***REMOVED*** );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() ***REMOVED***
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
***REMOVED***

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) ***REMOVED***

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

***REMOVED*** else ***REMOVED***

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
***REMOVED***




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) ***REMOVED***
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) ***REMOVED***
		chainable = true;
		for ( i in key ) ***REMOVED***
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		***REMOVED***

	// Sets one value
	***REMOVED*** else if ( value !== undefined ) ***REMOVED***
		chainable = true;

		if ( !isFunction( value ) ) ***REMOVED***
			raw = true;
		***REMOVED***

		if ( bulk ) ***REMOVED***

			// Bulk operations run against the entire set
			if ( raw ) ***REMOVED***
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			***REMOVED*** else ***REMOVED***
				bulk = fn;
				fn = function( elem, key, value ) ***REMOVED***
					return bulk.call( jQuery( elem ), value );
				***REMOVED***;
			***REMOVED***
		***REMOVED***

		if ( fn ) ***REMOVED***
			for ( ; i < len; i++ ) ***REMOVED***
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			***REMOVED***
		***REMOVED***
	***REMOVED***

	if ( chainable ) ***REMOVED***
		return elems;
	***REMOVED***

	// Gets
	if ( bulk ) ***REMOVED***
		return fn.call( elems );
	***REMOVED***

	return len ? fn( elems[ 0 ], key ) : emptyGet;
***REMOVED***;


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) ***REMOVED***
	return letter.toUpperCase();
***REMOVED***

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) ***REMOVED***
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
***REMOVED***
var acceptData = function( owner ) ***REMOVED***

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
***REMOVED***;




function Data() ***REMOVED***
	this.expando = jQuery.expando + Data.uid++;
***REMOVED***

Data.uid = 1;

Data.prototype = ***REMOVED***

	cache: function( owner ) ***REMOVED***

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) ***REMOVED***
			value = ***REMOVED******REMOVED***;

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) ***REMOVED***

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) ***REMOVED***
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				***REMOVED*** else ***REMOVED***
					Object.defineProperty( owner, this.expando, ***REMOVED***
						value: value,
						configurable: true
					***REMOVED*** );
				***REMOVED***
			***REMOVED***
		***REMOVED***

		return value;
	***REMOVED***,
	set: function( owner, data, value ) ***REMOVED***
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) ***REMOVED***
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, ***REMOVED*** properties ***REMOVED*** ] args
		***REMOVED*** else ***REMOVED***

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) ***REMOVED***
				cache[ camelCase( prop ) ] = data[ prop ];
			***REMOVED***
		***REMOVED***
		return cache;
	***REMOVED***,
	get: function( owner, key ) ***REMOVED***
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	***REMOVED***,
	access: function( owner, key, value ) ***REMOVED***

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) ***REMOVED***

			return this.get( owner, key );
		***REMOVED***

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	***REMOVED***,
	remove: function( owner, key ) ***REMOVED***
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) ***REMOVED***
			return;
		***REMOVED***

		if ( key !== undefined ) ***REMOVED***

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) ***REMOVED***

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			***REMOVED*** else ***REMOVED***
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			***REMOVED***

			i = key.length;

			while ( i-- ) ***REMOVED***
				delete cache[ key[ i ] ];
			***REMOVED***
		***REMOVED***

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) ***REMOVED***

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) ***REMOVED***
				owner[ this.expando ] = undefined;
			***REMOVED*** else ***REMOVED***
				delete owner[ this.expando ];
			***REMOVED***
		***REMOVED***
	***REMOVED***,
	hasData: function( owner ) ***REMOVED***
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	***REMOVED***
***REMOVED***;
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\***REMOVED***[\w\W]*\***REMOVED***|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) ***REMOVED***
	if ( data === "true" ) ***REMOVED***
		return true;
	***REMOVED***

	if ( data === "false" ) ***REMOVED***
		return false;
	***REMOVED***

	if ( data === "null" ) ***REMOVED***
		return null;
	***REMOVED***

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) ***REMOVED***
		return +data;
	***REMOVED***

	if ( rbrace.test( data ) ) ***REMOVED***
		return JSON.parse( data );
	***REMOVED***

	return data;
***REMOVED***

function dataAttr( elem, key, data ) ***REMOVED***
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) ***REMOVED***
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) ***REMOVED***
			try ***REMOVED***
				data = getData( data );
			***REMOVED*** catch ( e ) ***REMOVED******REMOVED***

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		***REMOVED*** else ***REMOVED***
			data = undefined;
		***REMOVED***
	***REMOVED***
	return data;
***REMOVED***

jQuery.extend( ***REMOVED***
	hasData: function( elem ) ***REMOVED***
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	***REMOVED***,

	data: function( elem, name, data ) ***REMOVED***
		return dataUser.access( elem, name, data );
	***REMOVED***,

	removeData: function( elem, name ) ***REMOVED***
		dataUser.remove( elem, name );
	***REMOVED***,

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) ***REMOVED***
		return dataPriv.access( elem, name, data );
	***REMOVED***,

	_removeData: function( elem, name ) ***REMOVED***
		dataPriv.remove( elem, name );
	***REMOVED***
***REMOVED*** );

jQuery.fn.extend( ***REMOVED***
	data: function( key, value ) ***REMOVED***
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) ***REMOVED***
			if ( this.length ) ***REMOVED***
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) ***REMOVED***
					i = attrs.length;
					while ( i-- ) ***REMOVED***

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) ***REMOVED***
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) ***REMOVED***
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							***REMOVED***
						***REMOVED***
					***REMOVED***
					dataPriv.set( elem, "hasDataAttrs", true );
				***REMOVED***
			***REMOVED***

			return data;
		***REMOVED***

		// Sets multiple values
		if ( typeof key === "object" ) ***REMOVED***
			return this.each( function() ***REMOVED***
				dataUser.set( this, key );
			***REMOVED*** );
		***REMOVED***

		return access( this, function( value ) ***REMOVED***
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) ***REMOVED***

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) ***REMOVED***
					return data;
				***REMOVED***

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) ***REMOVED***
					return data;
				***REMOVED***

				// We tried really hard, but the data doesn't exist.
				return;
			***REMOVED***

			// Set the data...
			this.each( function() ***REMOVED***

				// We always store the camelCased key
				dataUser.set( this, key, value );
			***REMOVED*** );
		***REMOVED***, null, value, arguments.length > 1, null, true );
	***REMOVED***,

	removeData: function( key ) ***REMOVED***
		return this.each( function() ***REMOVED***
			dataUser.remove( this, key );
		***REMOVED*** );
	***REMOVED***
***REMOVED*** );


jQuery.extend( ***REMOVED***
	queue: function( elem, type, data ) ***REMOVED***
		var queue;

		if ( elem ) ***REMOVED***
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) ***REMOVED***
				if ( !queue || Array.isArray( data ) ) ***REMOVED***
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				***REMOVED*** else ***REMOVED***
					queue.push( data );
				***REMOVED***
			***REMOVED***
			return queue || [];
		***REMOVED***
	***REMOVED***,

	dequeue: function( elem, type ) ***REMOVED***
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() ***REMOVED***
				jQuery.dequeue( elem, type );
			***REMOVED***;

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) ***REMOVED***
			fn = queue.shift();
			startLength--;
		***REMOVED***

		if ( fn ) ***REMOVED***

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) ***REMOVED***
				queue.unshift( "inprogress" );
			***REMOVED***

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		***REMOVED***

		if ( !startLength && hooks ) ***REMOVED***
			hooks.empty.fire();
		***REMOVED***
	***REMOVED***,

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) ***REMOVED***
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, ***REMOVED***
			empty: jQuery.Callbacks( "once memory" ).add( function() ***REMOVED***
				dataPriv.remove( elem, [ type + "queue", key ] );
			***REMOVED*** )
		***REMOVED*** );
	***REMOVED***
***REMOVED*** );

jQuery.fn.extend( ***REMOVED***
	queue: function( type, data ) ***REMOVED***
		var setter = 2;

		if ( typeof type !== "string" ) ***REMOVED***
			data = type;
			type = "fx";
			setter--;
		***REMOVED***

		if ( arguments.length < setter ) ***REMOVED***
			return jQuery.queue( this[ 0 ], type );
		***REMOVED***

		return data === undefined ?
			this :
			this.each( function() ***REMOVED***
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) ***REMOVED***
					jQuery.dequeue( this, type );
				***REMOVED***
			***REMOVED*** );
	***REMOVED***,
	dequeue: function( type ) ***REMOVED***
		return this.each( function() ***REMOVED***
			jQuery.dequeue( this, type );
		***REMOVED*** );
	***REMOVED***,
	clearQueue: function( type ) ***REMOVED***
		return this.queue( type || "fx", [] );
	***REMOVED***,

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) ***REMOVED***
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() ***REMOVED***
				if ( !( --count ) ) ***REMOVED***
					defer.resolveWith( elements, [ elements ] );
				***REMOVED***
			***REMOVED***;

		if ( typeof type !== "string" ) ***REMOVED***
			obj = type;
			type = undefined;
		***REMOVED***
		type = type || "fx";

		while ( i-- ) ***REMOVED***
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) ***REMOVED***
				count++;
				tmp.empty.add( resolve );
			***REMOVED***
		***REMOVED***
		resolve();
		return defer.promise( obj );
	***REMOVED***
***REMOVED*** );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) ***REMOVED***

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	***REMOVED***;

var swap = function( elem, options, callback, args ) ***REMOVED***
	var ret, name,
		old = ***REMOVED******REMOVED***;

	// Remember the old values, and insert the new ones
	for ( name in options ) ***REMOVED***
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	***REMOVED***

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) ***REMOVED***
		elem.style[ name ] = old[ name ];
	***REMOVED***

	return ret;
***REMOVED***;




function adjustCSS( elem, prop, valueParts, tween ) ***REMOVED***
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() ***REMOVED***
				return tween.cur();
			***REMOVED*** :
			function() ***REMOVED***
				return jQuery.css( elem, prop, "" );
			***REMOVED***,
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) ***REMOVED***

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) ***REMOVED***

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) ***REMOVED***
				maxIterations = 0;
			***REMOVED***
			initialInUnit = initialInUnit / scale;

		***REMOVED***

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	***REMOVED***

	if ( valueParts ) ***REMOVED***
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) ***REMOVED***
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		***REMOVED***
	***REMOVED***
	return adjusted;
***REMOVED***


var defaultDisplayMap = ***REMOVED******REMOVED***;

function getDefaultDisplay( elem ) ***REMOVED***
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) ***REMOVED***
		return display;
	***REMOVED***

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) ***REMOVED***
		display = "block";
	***REMOVED***
	defaultDisplayMap[ nodeName ] = display;

	return display;
***REMOVED***

function showHide( elements, show ) ***REMOVED***
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) ***REMOVED***
		elem = elements[ index ];
		if ( !elem.style ) ***REMOVED***
			continue;
		***REMOVED***

		display = elem.style.display;
		if ( show ) ***REMOVED***

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) ***REMOVED***
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) ***REMOVED***
					elem.style.display = "";
				***REMOVED***
			***REMOVED***
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) ***REMOVED***
				values[ index ] = getDefaultDisplay( elem );
			***REMOVED***
		***REMOVED*** else ***REMOVED***
			if ( display !== "none" ) ***REMOVED***
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			***REMOVED***
		***REMOVED***
	***REMOVED***

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) ***REMOVED***
		if ( values[ index ] != null ) ***REMOVED***
			elements[ index ].style.display = values[ index ];
		***REMOVED***
	***REMOVED***

	return elements;
***REMOVED***

jQuery.fn.extend( ***REMOVED***
	show: function() ***REMOVED***
		return showHide( this, true );
	***REMOVED***,
	hide: function() ***REMOVED***
		return showHide( this );
	***REMOVED***,
	toggle: function( state ) ***REMOVED***
		if ( typeof state === "boolean" ) ***REMOVED***
			return state ? this.show() : this.hide();
		***REMOVED***

		return this.each( function() ***REMOVED***
			if ( isHiddenWithinTree( this ) ) ***REMOVED***
				jQuery( this ).show();
			***REMOVED*** else ***REMOVED***
				jQuery( this ).hide();
			***REMOVED***
		***REMOVED*** );
	***REMOVED***
***REMOVED*** );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = ***REMOVED***

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
***REMOVED***;

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) ***REMOVED***

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) ***REMOVED***
		ret = context.getElementsByTagName( tag || "*" );

	***REMOVED*** else if ( typeof context.querySelectorAll !== "undefined" ) ***REMOVED***
		ret = context.querySelectorAll( tag || "*" );

	***REMOVED*** else ***REMOVED***
		ret = [];
	***REMOVED***

	if ( tag === undefined || tag && nodeName( context, tag ) ) ***REMOVED***
		return jQuery.merge( [ context ], ret );
	***REMOVED***

	return ret;
***REMOVED***


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) ***REMOVED***
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) ***REMOVED***
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	***REMOVED***
***REMOVED***


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) ***REMOVED***
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) ***REMOVED***
		elem = elems[ i ];

		if ( elem || elem === 0 ) ***REMOVED***

			// Add nodes directly
			if ( toType( elem ) === "object" ) ***REMOVED***

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			***REMOVED*** else if ( !rhtml.test( elem ) ) ***REMOVED***
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			***REMOVED*** else ***REMOVED***
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) ***REMOVED***
					tmp = tmp.lastChild;
				***REMOVED***

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			***REMOVED***
		***REMOVED***
	***REMOVED***

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) ***REMOVED***

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) ***REMOVED***
			if ( ignored ) ***REMOVED***
				ignored.push( elem );
			***REMOVED***
			continue;
		***REMOVED***

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) ***REMOVED***
			setGlobalEval( tmp );
		***REMOVED***

		// Capture executables
		if ( scripts ) ***REMOVED***
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) ***REMOVED***
				if ( rscriptType.test( elem.type || "" ) ) ***REMOVED***
					scripts.push( elem );
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***

	return fragment;
***REMOVED***


( function() ***REMOVED***
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
***REMOVED*** )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() ***REMOVED***
	return true;
***REMOVED***

function returnFalse() ***REMOVED***
	return false;
***REMOVED***

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() ***REMOVED***
	try ***REMOVED***
		return document.activeElement;
	***REMOVED*** catch ( err ) ***REMOVED*** ***REMOVED***
***REMOVED***

function on( elem, types, selector, data, fn, one ) ***REMOVED***
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) ***REMOVED***

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) ***REMOVED***

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		***REMOVED***
		for ( type in types ) ***REMOVED***
			on( elem, type, selector, data, types[ type ], one );
		***REMOVED***
		return elem;
	***REMOVED***

	if ( data == null && fn == null ) ***REMOVED***

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	***REMOVED*** else if ( fn == null ) ***REMOVED***
		if ( typeof selector === "string" ) ***REMOVED***

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		***REMOVED*** else ***REMOVED***

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		***REMOVED***
	***REMOVED***
	if ( fn === false ) ***REMOVED***
		fn = returnFalse;
	***REMOVED*** else if ( !fn ) ***REMOVED***
		return elem;
	***REMOVED***

	if ( one === 1 ) ***REMOVED***
		origFn = fn;
		fn = function( event ) ***REMOVED***

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		***REMOVED***;

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	***REMOVED***
	return elem.each( function() ***REMOVED***
		jQuery.event.add( this, types, fn, data, selector );
	***REMOVED*** );
***REMOVED***

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = ***REMOVED***

	global: ***REMOVED******REMOVED***,

	add: function( elem, types, handler, data, selector ) ***REMOVED***

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) ***REMOVED***
			return;
		***REMOVED***

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) ***REMOVED***
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		***REMOVED***

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) ***REMOVED***
			jQuery.find.matchesSelector( documentElement, selector );
		***REMOVED***

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) ***REMOVED***
			handler.guid = jQuery.guid++;
		***REMOVED***

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) ***REMOVED***
			events = elemData.events = ***REMOVED******REMOVED***;
		***REMOVED***
		if ( !( eventHandle = elemData.handle ) ) ***REMOVED***
			eventHandle = elemData.handle = function( e ) ***REMOVED***

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			***REMOVED***;
		***REMOVED***

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) ***REMOVED***
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) ***REMOVED***
				continue;
			***REMOVED***

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || ***REMOVED******REMOVED***;

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || ***REMOVED******REMOVED***;

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( ***REMOVED***
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			***REMOVED***, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) ***REMOVED***
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) ***REMOVED***

					if ( elem.addEventListener ) ***REMOVED***
						elem.addEventListener( type, eventHandle );
					***REMOVED***
				***REMOVED***
			***REMOVED***

			if ( special.add ) ***REMOVED***
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) ***REMOVED***
					handleObj.handler.guid = handler.guid;
				***REMOVED***
			***REMOVED***

			// Add to the element's handler list, delegates in front
			if ( selector ) ***REMOVED***
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			***REMOVED*** else ***REMOVED***
				handlers.push( handleObj );
			***REMOVED***

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		***REMOVED***

	***REMOVED***,

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) ***REMOVED***

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) ***REMOVED***
			return;
		***REMOVED***

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) ***REMOVED***
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) ***REMOVED***
				for ( type in events ) ***REMOVED***
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				***REMOVED***
				continue;
			***REMOVED***

			special = jQuery.event.special[ type ] || ***REMOVED******REMOVED***;
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) ***REMOVED***
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) ***REMOVED***
					handlers.splice( j, 1 );

					if ( handleObj.selector ) ***REMOVED***
						handlers.delegateCount--;
					***REMOVED***
					if ( special.remove ) ***REMOVED***
						special.remove.call( elem, handleObj );
					***REMOVED***
				***REMOVED***
			***REMOVED***

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) ***REMOVED***
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) ***REMOVED***

					jQuery.removeEvent( elem, type, elemData.handle );
				***REMOVED***

				delete events[ type ];
			***REMOVED***
		***REMOVED***

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) ***REMOVED***
			dataPriv.remove( elem, "handle events" );
		***REMOVED***
	***REMOVED***,

	dispatch: function( nativeEvent ) ***REMOVED***

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || ***REMOVED******REMOVED*** )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || ***REMOVED******REMOVED***;

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) ***REMOVED***
			args[ i ] = arguments[ i ];
		***REMOVED***

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) ***REMOVED***
			return;
		***REMOVED***

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) ***REMOVED***
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) ***REMOVED***

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) ***REMOVED***

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || ***REMOVED******REMOVED*** ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) ***REMOVED***
						if ( ( event.result = ret ) === false ) ***REMOVED***
							event.preventDefault();
							event.stopPropagation();
						***REMOVED***
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) ***REMOVED***
			special.postDispatch.call( this, event );
		***REMOVED***

		return event.result;
	***REMOVED***,

	handlers: function( event, handlers ) ***REMOVED***
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) ***REMOVED***

			for ( ; cur !== this; cur = cur.parentNode || this ) ***REMOVED***

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) ***REMOVED***
					matchedHandlers = [];
					matchedSelectors = ***REMOVED******REMOVED***;
					for ( i = 0; i < delegateCount; i++ ) ***REMOVED***
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) ***REMOVED***
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						***REMOVED***
						if ( matchedSelectors[ sel ] ) ***REMOVED***
							matchedHandlers.push( handleObj );
						***REMOVED***
					***REMOVED***
					if ( matchedHandlers.length ) ***REMOVED***
						handlerQueue.push( ***REMOVED*** elem: cur, handlers: matchedHandlers ***REMOVED*** );
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) ***REMOVED***
			handlerQueue.push( ***REMOVED*** elem: cur, handlers: handlers.slice( delegateCount ) ***REMOVED*** );
		***REMOVED***

		return handlerQueue;
	***REMOVED***,

	addProp: function( name, hook ) ***REMOVED***
		Object.defineProperty( jQuery.Event.prototype, name, ***REMOVED***
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() ***REMOVED***
					if ( this.originalEvent ) ***REMOVED***
							return hook( this.originalEvent );
					***REMOVED***
				***REMOVED*** :
				function() ***REMOVED***
					if ( this.originalEvent ) ***REMOVED***
							return this.originalEvent[ name ];
					***REMOVED***
				***REMOVED***,

			set: function( value ) ***REMOVED***
				Object.defineProperty( this, name, ***REMOVED***
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				***REMOVED*** );
			***REMOVED***
		***REMOVED*** );
	***REMOVED***,

	fix: function( originalEvent ) ***REMOVED***
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	***REMOVED***,

	special: ***REMOVED***
		load: ***REMOVED***

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		***REMOVED***,
		focus: ***REMOVED***

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() ***REMOVED***
				if ( this !== safeActiveElement() && this.focus ) ***REMOVED***
					this.focus();
					return false;
				***REMOVED***
			***REMOVED***,
			delegateType: "focusin"
		***REMOVED***,
		blur: ***REMOVED***
			trigger: function() ***REMOVED***
				if ( this === safeActiveElement() && this.blur ) ***REMOVED***
					this.blur();
					return false;
				***REMOVED***
			***REMOVED***,
			delegateType: "focusout"
		***REMOVED***,
		click: ***REMOVED***

			// For checkbox, fire native event so checked state will be right
			trigger: function() ***REMOVED***
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) ***REMOVED***
					this.click();
					return false;
				***REMOVED***
			***REMOVED***,

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) ***REMOVED***
				return nodeName( event.target, "a" );
			***REMOVED***
		***REMOVED***,

		beforeunload: ***REMOVED***
			postDispatch: function( event ) ***REMOVED***

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) ***REMOVED***
					event.originalEvent.returnValue = event.result;
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***;

jQuery.removeEvent = function( elem, type, handle ) ***REMOVED***

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) ***REMOVED***
		elem.removeEventListener( type, handle );
	***REMOVED***
***REMOVED***;

jQuery.Event = function( src, props ) ***REMOVED***

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) ***REMOVED***
		return new jQuery.Event( src, props );
	***REMOVED***

	// Event object
	if ( src && src.type ) ***REMOVED***
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	***REMOVED*** else ***REMOVED***
		this.type = src;
	***REMOVED***

	// Put explicitly provided properties onto the event object
	if ( props ) ***REMOVED***
		jQuery.extend( this, props );
	***REMOVED***

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
***REMOVED***;

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = ***REMOVED***
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() ***REMOVED***
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) ***REMOVED***
			e.preventDefault();
		***REMOVED***
	***REMOVED***,
	stopPropagation: function() ***REMOVED***
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) ***REMOVED***
			e.stopPropagation();
		***REMOVED***
	***REMOVED***,
	stopImmediatePropagation: function() ***REMOVED***
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) ***REMOVED***
			e.stopImmediatePropagation();
		***REMOVED***

		this.stopPropagation();
	***REMOVED***
***REMOVED***;

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( ***REMOVED***
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) ***REMOVED***
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) ***REMOVED***
			return event.charCode != null ? event.charCode : event.keyCode;
		***REMOVED***

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) ***REMOVED***
			if ( button & 1 ) ***REMOVED***
				return 1;
			***REMOVED***

			if ( button & 2 ) ***REMOVED***
				return 3;
			***REMOVED***

			if ( button & 4 ) ***REMOVED***
				return 2;
			***REMOVED***

			return 0;
		***REMOVED***

		return event.which;
	***REMOVED***
***REMOVED***, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( ***REMOVED***
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
***REMOVED***, function( orig, fix ) ***REMOVED***
	jQuery.event.special[ orig ] = ***REMOVED***
		delegateType: fix,
		bindType: fix,

		handle: function( event ) ***REMOVED***
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) ***REMOVED***
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			***REMOVED***
			return ret;
		***REMOVED***
	***REMOVED***;
***REMOVED*** );

jQuery.fn.extend( ***REMOVED***

	on: function( types, selector, data, fn ) ***REMOVED***
		return on( this, types, selector, data, fn );
	***REMOVED***,
	one: function( types, selector, data, fn ) ***REMOVED***
		return on( this, types, selector, data, fn, 1 );
	***REMOVED***,
	off: function( types, selector, fn ) ***REMOVED***
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) ***REMOVED***

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		***REMOVED***
		if ( typeof types === "object" ) ***REMOVED***

			// ( types-object [, selector] )
			for ( type in types ) ***REMOVED***
				this.off( type, selector, types[ type ] );
			***REMOVED***
			return this;
		***REMOVED***
		if ( selector === false || typeof selector === "function" ) ***REMOVED***

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		***REMOVED***
		if ( fn === false ) ***REMOVED***
			fn = returnFalse;
		***REMOVED***
		return this.each( function() ***REMOVED***
			jQuery.event.remove( this, types, fn, selector );
		***REMOVED*** );
	***REMOVED***
***REMOVED*** );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) ***REMOVED***
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) ***REMOVED***

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	***REMOVED***

	return elem;
***REMOVED***

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) ***REMOVED***
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
***REMOVED***
function restoreScript( elem ) ***REMOVED***
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) ***REMOVED***
		elem.type = elem.type.slice( 5 );
	***REMOVED*** else ***REMOVED***
		elem.removeAttribute( "type" );
	***REMOVED***

	return elem;
***REMOVED***

function cloneCopyEvent( src, dest ) ***REMOVED***
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) ***REMOVED***
		return;
	***REMOVED***

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) ***REMOVED***
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) ***REMOVED***
			delete pdataCur.handle;
			pdataCur.events = ***REMOVED******REMOVED***;

			for ( type in events ) ***REMOVED***
				for ( i = 0, l = events[ type ].length; i < l; i++ ) ***REMOVED***
					jQuery.event.add( dest, type, events[ type ][ i ] );
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) ***REMOVED***
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( ***REMOVED******REMOVED***, udataOld );

		dataUser.set( dest, udataCur );
	***REMOVED***
***REMOVED***

// Fix IE bugs, see support tests
function fixInput( src, dest ) ***REMOVED***
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) ***REMOVED***
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	***REMOVED*** else if ( nodeName === "input" || nodeName === "textarea" ) ***REMOVED***
		dest.defaultValue = src.defaultValue;
	***REMOVED***
***REMOVED***

function domManip( collection, args, callback, ignored ) ***REMOVED***

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) ***REMOVED***
		return collection.each( function( index ) ***REMOVED***
			var self = collection.eq( index );
			if ( valueIsFunction ) ***REMOVED***
				args[ 0 ] = value.call( this, index, self.html() );
			***REMOVED***
			domManip( self, args, callback, ignored );
		***REMOVED*** );
	***REMOVED***

	if ( l ) ***REMOVED***
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) ***REMOVED***
			fragment = first;
		***REMOVED***

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) ***REMOVED***
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) ***REMOVED***
				node = fragment;

				if ( i !== iNoClone ) ***REMOVED***
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) ***REMOVED***

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					***REMOVED***
				***REMOVED***

				callback.call( collection[ i ], node, i );
			***REMOVED***

			if ( hasScripts ) ***REMOVED***
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) ***REMOVED***
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) ***REMOVED***

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) ***REMOVED***

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) ***REMOVED***
								jQuery._evalUrl( node.src );
							***REMOVED***
						***REMOVED*** else ***REMOVED***
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						***REMOVED***
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***

	return collection;
***REMOVED***

function remove( elem, selector, keepData ) ***REMOVED***
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) ***REMOVED***
		if ( !keepData && node.nodeType === 1 ) ***REMOVED***
			jQuery.cleanData( getAll( node ) );
		***REMOVED***

		if ( node.parentNode ) ***REMOVED***
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) ***REMOVED***
				setGlobalEval( getAll( node, "script" ) );
			***REMOVED***
			node.parentNode.removeChild( node );
		***REMOVED***
	***REMOVED***

	return elem;
***REMOVED***

jQuery.extend( ***REMOVED***
	htmlPrefilter: function( html ) ***REMOVED***
		return html.replace( rxhtmlTag, "<$1></$2>" );
	***REMOVED***,

	clone: function( elem, dataAndEvents, deepDataAndEvents ) ***REMOVED***
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) ***REMOVED***

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) ***REMOVED***
				fixInput( srcElements[ i ], destElements[ i ] );
			***REMOVED***
		***REMOVED***

		// Copy the events from the original to the clone
		if ( dataAndEvents ) ***REMOVED***
			if ( deepDataAndEvents ) ***REMOVED***
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) ***REMOVED***
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				***REMOVED***
			***REMOVED*** else ***REMOVED***
				cloneCopyEvent( elem, clone );
			***REMOVED***
		***REMOVED***

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) ***REMOVED***
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		***REMOVED***

		// Return the cloned set
		return clone;
	***REMOVED***,

	cleanData: function( elems ) ***REMOVED***
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) ***REMOVED***
			if ( acceptData( elem ) ) ***REMOVED***
				if ( ( data = elem[ dataPriv.expando ] ) ) ***REMOVED***
					if ( data.events ) ***REMOVED***
						for ( type in data.events ) ***REMOVED***
							if ( special[ type ] ) ***REMOVED***
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							***REMOVED*** else ***REMOVED***
								jQuery.removeEvent( elem, type, data.handle );
							***REMOVED***
						***REMOVED***
					***REMOVED***

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				***REMOVED***
				if ( elem[ dataUser.expando ] ) ***REMOVED***

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED*** );

jQuery.fn.extend( ***REMOVED***
	detach: function( selector ) ***REMOVED***
		return remove( this, selector, true );
	***REMOVED***,

	remove: function( selector ) ***REMOVED***
		return remove( this, selector );
	***REMOVED***,

	text: function( value ) ***REMOVED***
		return access( this, function( value ) ***REMOVED***
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() ***REMOVED***
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) ***REMOVED***
						this.textContent = value;
					***REMOVED***
				***REMOVED*** );
		***REMOVED***, null, value, arguments.length );
	***REMOVED***,

	append: function() ***REMOVED***
		return domManip( this, arguments, function( elem ) ***REMOVED***
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) ***REMOVED***
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			***REMOVED***
		***REMOVED*** );
	***REMOVED***,

	prepend: function() ***REMOVED***
		return domManip( this, arguments, function( elem ) ***REMOVED***
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) ***REMOVED***
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			***REMOVED***
		***REMOVED*** );
	***REMOVED***,

	before: function() ***REMOVED***
		return domManip( this, arguments, function( elem ) ***REMOVED***
			if ( this.parentNode ) ***REMOVED***
				this.parentNode.insertBefore( elem, this );
			***REMOVED***
		***REMOVED*** );
	***REMOVED***,

	after: function() ***REMOVED***
		return domManip( this, arguments, function( elem ) ***REMOVED***
			if ( this.parentNode ) ***REMOVED***
				this.parentNode.insertBefore( elem, this.nextSibling );
			***REMOVED***
		***REMOVED*** );
	***REMOVED***,

	empty: function() ***REMOVED***
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) ***REMOVED***
			if ( elem.nodeType === 1 ) ***REMOVED***

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			***REMOVED***
		***REMOVED***

		return this;
	***REMOVED***,

	clone: function( dataAndEvents, deepDataAndEvents ) ***REMOVED***
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() ***REMOVED***
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		***REMOVED*** );
	***REMOVED***,

	html: function( value ) ***REMOVED***
		return access( this, function( value ) ***REMOVED***
			var elem = this[ 0 ] || ***REMOVED******REMOVED***,
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) ***REMOVED***
				return elem.innerHTML;
			***REMOVED***

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) ***REMOVED***

				value = jQuery.htmlPrefilter( value );

				try ***REMOVED***
					for ( ; i < l; i++ ) ***REMOVED***
						elem = this[ i ] || ***REMOVED******REMOVED***;

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) ***REMOVED***
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						***REMOVED***
					***REMOVED***

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				***REMOVED*** catch ( e ) ***REMOVED******REMOVED***
			***REMOVED***

			if ( elem ) ***REMOVED***
				this.empty().append( value );
			***REMOVED***
		***REMOVED***, null, value, arguments.length );
	***REMOVED***,

	replaceWith: function() ***REMOVED***
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) ***REMOVED***
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) ***REMOVED***
				jQuery.cleanData( getAll( this ) );
				if ( parent ) ***REMOVED***
					parent.replaceChild( elem, this );
				***REMOVED***
			***REMOVED***

		// Force callback invocation
		***REMOVED***, ignored );
	***REMOVED***
***REMOVED*** );

jQuery.each( ***REMOVED***
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
***REMOVED***, function( name, original ) ***REMOVED***
	jQuery.fn[ name ] = function( selector ) ***REMOVED***
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) ***REMOVED***
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		***REMOVED***

		return this.pushStack( ret );
	***REMOVED***;
***REMOVED*** );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) ***REMOVED***

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) ***REMOVED***
			view = window;
		***REMOVED***

		return view.getComputedStyle( elem );
	***REMOVED***;

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() ***REMOVED***

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() ***REMOVED***

		// This is a singleton, we need to execute it only once
		if ( !div ) ***REMOVED***
			return;
		***REMOVED***

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	***REMOVED***

	function roundPixelMeasures( measure ) ***REMOVED***
		return Math.round( parseFloat( measure ) );
	***REMOVED***

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) ***REMOVED***
		return;
	***REMOVED***

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, ***REMOVED***
		boxSizingReliable: function() ***REMOVED***
			computeStyleTests();
			return boxSizingReliableVal;
		***REMOVED***,
		pixelBoxStyles: function() ***REMOVED***
			computeStyleTests();
			return pixelBoxStylesVal;
		***REMOVED***,
		pixelPosition: function() ***REMOVED***
			computeStyleTests();
			return pixelPositionVal;
		***REMOVED***,
		reliableMarginLeft: function() ***REMOVED***
			computeStyleTests();
			return reliableMarginLeftVal;
		***REMOVED***,
		scrollboxSize: function() ***REMOVED***
			computeStyleTests();
			return scrollboxSizeVal;
		***REMOVED***
	***REMOVED*** );
***REMOVED*** )();


function curCSS( elem, name, computed ) ***REMOVED***
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) ***REMOVED***
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) ***REMOVED***
			ret = jQuery.style( elem, name );
		***REMOVED***

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) ***REMOVED***

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		***REMOVED***
	***REMOVED***

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
***REMOVED***


function addGetHookIf( conditionFn, hookFn ) ***REMOVED***

	// Define the hook, we'll check on the first run if it's really needed.
	return ***REMOVED***
		get: function() ***REMOVED***
			if ( conditionFn() ) ***REMOVED***

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			***REMOVED***

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		***REMOVED***
	***REMOVED***;
***REMOVED***


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = ***REMOVED*** position: "absolute", visibility: "hidden", display: "block" ***REMOVED***,
	cssNormalTransform = ***REMOVED***
		letterSpacing: "0",
		fontWeight: "400"
	***REMOVED***,

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) ***REMOVED***

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) ***REMOVED***
		return name;
	***REMOVED***

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) ***REMOVED***
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) ***REMOVED***
			return name;
		***REMOVED***
	***REMOVED***
***REMOVED***

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) ***REMOVED***
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) ***REMOVED***
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	***REMOVED***
	return ret;
***REMOVED***

function setPositiveNumber( elem, value, subtract ) ***REMOVED***

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
***REMOVED***

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) ***REMOVED***
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) ***REMOVED***
		return 0;
	***REMOVED***

	for ( ; i < 4; i += 2 ) ***REMOVED***

		// Both box models exclude margin
		if ( box === "margin" ) ***REMOVED***
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		***REMOVED***

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) ***REMOVED***

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) ***REMOVED***
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			***REMOVED*** else ***REMOVED***
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			***REMOVED***

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		***REMOVED*** else ***REMOVED***

			// For "content", subtract padding
			if ( box === "content" ) ***REMOVED***
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			***REMOVED***

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) ***REMOVED***
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			***REMOVED***
		***REMOVED***
	***REMOVED***

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) ***REMOVED***

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	***REMOVED***

	return delta;
***REMOVED***

function getWidthOrHeight( elem, dimension, extra ) ***REMOVED***

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) ***REMOVED***
		if ( !extra ) ***REMOVED***
			return val;
		***REMOVED***
		val = "auto";
	***REMOVED***

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) ***REMOVED***

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	***REMOVED***

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
***REMOVED***

jQuery.extend( ***REMOVED***

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: ***REMOVED***
		opacity: ***REMOVED***
			get: function( elem, computed ) ***REMOVED***
				if ( computed ) ***REMOVED***

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: ***REMOVED***
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	***REMOVED***,

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: ***REMOVED******REMOVED***,

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) ***REMOVED***

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) ***REMOVED***
			return;
		***REMOVED***

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) ***REMOVED***
			name = finalPropName( origName );
		***REMOVED***

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) ***REMOVED***
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) ***REMOVED***
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			***REMOVED***

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) ***REMOVED***
				return;
			***REMOVED***

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) ***REMOVED***
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			***REMOVED***

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) ***REMOVED***
				style[ name ] = "inherit";
			***REMOVED***

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) ***REMOVED***

				if ( isCustomProp ) ***REMOVED***
					style.setProperty( name, value );
				***REMOVED*** else ***REMOVED***
					style[ name ] = value;
				***REMOVED***
			***REMOVED***

		***REMOVED*** else ***REMOVED***

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) ***REMOVED***

				return ret;
			***REMOVED***

			// Otherwise just get the value from the style object
			return style[ name ];
		***REMOVED***
	***REMOVED***,

	css: function( elem, name, extra, styles ) ***REMOVED***
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) ***REMOVED***
			name = finalPropName( origName );
		***REMOVED***

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) ***REMOVED***
			val = hooks.get( elem, true, extra );
		***REMOVED***

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) ***REMOVED***
			val = curCSS( elem, name, styles );
		***REMOVED***

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) ***REMOVED***
			val = cssNormalTransform[ name ];
		***REMOVED***

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) ***REMOVED***
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		***REMOVED***

		return val;
	***REMOVED***
***REMOVED*** );

jQuery.each( [ "height", "width" ], function( i, dimension ) ***REMOVED***
	jQuery.cssHooks[ dimension ] = ***REMOVED***
		get: function( elem, computed, extra ) ***REMOVED***
			if ( computed ) ***REMOVED***

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() ***REMOVED***
							return getWidthOrHeight( elem, dimension, extra );
						***REMOVED*** ) :
						getWidthOrHeight( elem, dimension, extra );
			***REMOVED***
		***REMOVED***,

		set: function( elem, value, extra ) ***REMOVED***
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) ***REMOVED***
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			***REMOVED***

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) ***REMOVED***

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			***REMOVED***

			return setPositiveNumber( elem, value, subtract );
		***REMOVED***
	***REMOVED***;
***REMOVED*** );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) ***REMOVED***
		if ( computed ) ***REMOVED***
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, ***REMOVED*** marginLeft: 0 ***REMOVED***, function() ***REMOVED***
						return elem.getBoundingClientRect().left;
					***REMOVED*** )
				) + "px";
		***REMOVED***
	***REMOVED***
);

// These hooks are used by animate to expand properties
jQuery.each( ***REMOVED***
	margin: "",
	padding: "",
	border: "Width"
***REMOVED***, function( prefix, suffix ) ***REMOVED***
	jQuery.cssHooks[ prefix + suffix ] = ***REMOVED***
		expand: function( value ) ***REMOVED***
			var i = 0,
				expanded = ***REMOVED******REMOVED***,

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) ***REMOVED***
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			***REMOVED***

			return expanded;
		***REMOVED***
	***REMOVED***;

	if ( prefix !== "margin" ) ***REMOVED***
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	***REMOVED***
***REMOVED*** );

jQuery.fn.extend( ***REMOVED***
	css: function( name, value ) ***REMOVED***
		return access( this, function( elem, name, value ) ***REMOVED***
			var styles, len,
				map = ***REMOVED******REMOVED***,
				i = 0;

			if ( Array.isArray( name ) ) ***REMOVED***
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) ***REMOVED***
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				***REMOVED***

				return map;
			***REMOVED***

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		***REMOVED***, name, value, arguments.length > 1 );
	***REMOVED***
***REMOVED*** );


function Tween( elem, options, prop, end, easing ) ***REMOVED***
	return new Tween.prototype.init( elem, options, prop, end, easing );
***REMOVED***
jQuery.Tween = Tween;

Tween.prototype = ***REMOVED***
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) ***REMOVED***
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	***REMOVED***,
	cur: function() ***REMOVED***
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	***REMOVED***,
	run: function( percent ) ***REMOVED***
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) ***REMOVED***
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		***REMOVED*** else ***REMOVED***
			this.pos = eased = percent;
		***REMOVED***
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) ***REMOVED***
			this.options.step.call( this.elem, this.now, this );
		***REMOVED***

		if ( hooks && hooks.set ) ***REMOVED***
			hooks.set( this );
		***REMOVED*** else ***REMOVED***
			Tween.propHooks._default.set( this );
		***REMOVED***
		return this;
	***REMOVED***
***REMOVED***;

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = ***REMOVED***
	_default: ***REMOVED***
		get: function( tween ) ***REMOVED***
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) ***REMOVED***
				return tween.elem[ tween.prop ];
			***REMOVED***

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		***REMOVED***,
		set: function( tween ) ***REMOVED***

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) ***REMOVED***
				jQuery.fx.step[ tween.prop ]( tween );
			***REMOVED*** else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) ***REMOVED***
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			***REMOVED*** else ***REMOVED***
				tween.elem[ tween.prop ] = tween.now;
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***;

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = ***REMOVED***
	set: function( tween ) ***REMOVED***
		if ( tween.elem.nodeType && tween.elem.parentNode ) ***REMOVED***
			tween.elem[ tween.prop ] = tween.now;
		***REMOVED***
	***REMOVED***
***REMOVED***;

jQuery.easing = ***REMOVED***
	linear: function( p ) ***REMOVED***
		return p;
	***REMOVED***,
	swing: function( p ) ***REMOVED***
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	***REMOVED***,
	_default: "swing"
***REMOVED***;

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = ***REMOVED******REMOVED***;




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() ***REMOVED***
	if ( inProgress ) ***REMOVED***
		if ( document.hidden === false && window.requestAnimationFrame ) ***REMOVED***
			window.requestAnimationFrame( schedule );
		***REMOVED*** else ***REMOVED***
			window.setTimeout( schedule, jQuery.fx.interval );
		***REMOVED***

		jQuery.fx.tick();
	***REMOVED***
***REMOVED***

// Animations created synchronously will run synchronously
function createFxNow() ***REMOVED***
	window.setTimeout( function() ***REMOVED***
		fxNow = undefined;
	***REMOVED*** );
	return ( fxNow = Date.now() );
***REMOVED***

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) ***REMOVED***
	var which,
		i = 0,
		attrs = ***REMOVED*** height: type ***REMOVED***;

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) ***REMOVED***
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	***REMOVED***

	if ( includeWidth ) ***REMOVED***
		attrs.opacity = attrs.width = type;
	***REMOVED***

	return attrs;
***REMOVED***

function createTween( value, prop, animation ) ***REMOVED***
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) ***REMOVED***
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) ***REMOVED***

			// We're done with this property
			return tween;
		***REMOVED***
	***REMOVED***
***REMOVED***

function defaultPrefilter( elem, props, opts ) ***REMOVED***
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = ***REMOVED******REMOVED***,
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) ***REMOVED***
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) ***REMOVED***
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() ***REMOVED***
				if ( !hooks.unqueued ) ***REMOVED***
					oldfire();
				***REMOVED***
			***REMOVED***;
		***REMOVED***
		hooks.unqueued++;

		anim.always( function() ***REMOVED***

			// Ensure the complete handler is called before this completes
			anim.always( function() ***REMOVED***
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) ***REMOVED***
					hooks.empty.fire();
				***REMOVED***
			***REMOVED*** );
		***REMOVED*** );
	***REMOVED***

	// Detect show/hide animations
	for ( prop in props ) ***REMOVED***
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) ***REMOVED***
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) ***REMOVED***

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) ***REMOVED***
					hidden = true;

				// Ignore all other no-op show/hide data
				***REMOVED*** else ***REMOVED***
					continue;
				***REMOVED***
			***REMOVED***
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		***REMOVED***
	***REMOVED***

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) ***REMOVED***
		return;
	***REMOVED***

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) ***REMOVED***

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) ***REMOVED***
			restoreDisplay = dataPriv.get( elem, "display" );
		***REMOVED***
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) ***REMOVED***
			if ( restoreDisplay ) ***REMOVED***
				display = restoreDisplay;
			***REMOVED*** else ***REMOVED***

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			***REMOVED***
		***REMOVED***

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) ***REMOVED***
			if ( jQuery.css( elem, "float" ) === "none" ) ***REMOVED***

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) ***REMOVED***
					anim.done( function() ***REMOVED***
						style.display = restoreDisplay;
					***REMOVED*** );
					if ( restoreDisplay == null ) ***REMOVED***
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					***REMOVED***
				***REMOVED***
				style.display = "inline-block";
			***REMOVED***
		***REMOVED***
	***REMOVED***

	if ( opts.overflow ) ***REMOVED***
		style.overflow = "hidden";
		anim.always( function() ***REMOVED***
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		***REMOVED*** );
	***REMOVED***

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) ***REMOVED***

		// General show/hide setup for this element animation
		if ( !propTween ) ***REMOVED***
			if ( dataShow ) ***REMOVED***
				if ( "hidden" in dataShow ) ***REMOVED***
					hidden = dataShow.hidden;
				***REMOVED***
			***REMOVED*** else ***REMOVED***
				dataShow = dataPriv.access( elem, "fxshow", ***REMOVED*** display: restoreDisplay ***REMOVED*** );
			***REMOVED***

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) ***REMOVED***
				dataShow.hidden = !hidden;
			***REMOVED***

			// Show elements before animating them
			if ( hidden ) ***REMOVED***
				showHide( [ elem ], true );
			***REMOVED***

			/* eslint-disable no-loop-func */

			anim.done( function() ***REMOVED***

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) ***REMOVED***
					showHide( [ elem ] );
				***REMOVED***
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) ***REMOVED***
					jQuery.style( elem, prop, orig[ prop ] );
				***REMOVED***
			***REMOVED*** );
		***REMOVED***

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) ***REMOVED***
			dataShow[ prop ] = propTween.start;
			if ( hidden ) ***REMOVED***
				propTween.end = propTween.start;
				propTween.start = 0;
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***

function propFilter( props, specialEasing ) ***REMOVED***
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) ***REMOVED***
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) ***REMOVED***
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		***REMOVED***

		if ( index !== name ) ***REMOVED***
			props[ name ] = value;
			delete props[ index ];
		***REMOVED***

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) ***REMOVED***
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) ***REMOVED***
				if ( !( index in props ) ) ***REMOVED***
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				***REMOVED***
			***REMOVED***
		***REMOVED*** else ***REMOVED***
			specialEasing[ name ] = easing;
		***REMOVED***
	***REMOVED***
***REMOVED***

function Animation( elem, properties, options ) ***REMOVED***
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() ***REMOVED***

			// Don't match elem in the :animated selector
			delete tick.elem;
		***REMOVED*** ),
		tick = function() ***REMOVED***
			if ( stopped ) ***REMOVED***
				return false;
			***REMOVED***
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) ***REMOVED***
				animation.tweens[ index ].run( percent );
			***REMOVED***

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) ***REMOVED***
				return remaining;
			***REMOVED***

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) ***REMOVED***
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			***REMOVED***

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		***REMOVED***,
		animation = deferred.promise( ***REMOVED***
			elem: elem,
			props: jQuery.extend( ***REMOVED******REMOVED***, properties ),
			opts: jQuery.extend( true, ***REMOVED***
				specialEasing: ***REMOVED******REMOVED***,
				easing: jQuery.easing._default
			***REMOVED***, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) ***REMOVED***
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			***REMOVED***,
			stop: function( gotoEnd ) ***REMOVED***
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) ***REMOVED***
					return this;
				***REMOVED***
				stopped = true;
				for ( ; index < length; index++ ) ***REMOVED***
					animation.tweens[ index ].run( 1 );
				***REMOVED***

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) ***REMOVED***
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				***REMOVED*** else ***REMOVED***
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				***REMOVED***
				return this;
			***REMOVED***
		***REMOVED*** ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) ***REMOVED***
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) ***REMOVED***
			if ( isFunction( result.stop ) ) ***REMOVED***
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			***REMOVED***
			return result;
		***REMOVED***
	***REMOVED***

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) ***REMOVED***
		animation.opts.start.call( elem, animation );
	***REMOVED***

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, ***REMOVED***
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		***REMOVED*** )
	);

	return animation;
***REMOVED***

jQuery.Animation = jQuery.extend( Animation, ***REMOVED***

	tweeners: ***REMOVED***
		"*": [ function( prop, value ) ***REMOVED***
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		***REMOVED*** ]
	***REMOVED***,

	tweener: function( props, callback ) ***REMOVED***
		if ( isFunction( props ) ) ***REMOVED***
			callback = props;
			props = [ "*" ];
		***REMOVED*** else ***REMOVED***
			props = props.match( rnothtmlwhite );
		***REMOVED***

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) ***REMOVED***
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		***REMOVED***
	***REMOVED***,

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) ***REMOVED***
		if ( prepend ) ***REMOVED***
			Animation.prefilters.unshift( callback );
		***REMOVED*** else ***REMOVED***
			Animation.prefilters.push( callback );
		***REMOVED***
	***REMOVED***
***REMOVED*** );

jQuery.speed = function( speed, easing, fn ) ***REMOVED***
	var opt = speed && typeof speed === "object" ? jQuery.extend( ***REMOVED******REMOVED***, speed ) : ***REMOVED***
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	***REMOVED***;

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) ***REMOVED***
		opt.duration = 0;

	***REMOVED*** else ***REMOVED***
		if ( typeof opt.duration !== "number" ) ***REMOVED***
			if ( opt.duration in jQuery.fx.speeds ) ***REMOVED***
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			***REMOVED*** else ***REMOVED***
				opt.duration = jQuery.fx.speeds._default;
			***REMOVED***
		***REMOVED***
	***REMOVED***

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) ***REMOVED***
		opt.queue = "fx";
	***REMOVED***

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() ***REMOVED***
		if ( isFunction( opt.old ) ) ***REMOVED***
			opt.old.call( this );
		***REMOVED***

		if ( opt.queue ) ***REMOVED***
			jQuery.dequeue( this, opt.queue );
		***REMOVED***
	***REMOVED***;

	return opt;
***REMOVED***;

jQuery.fn.extend( ***REMOVED***
	fadeTo: function( speed, to, easing, callback ) ***REMOVED***

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( ***REMOVED*** opacity: to ***REMOVED***, speed, easing, callback );
	***REMOVED***,
	animate: function( prop, speed, easing, callback ) ***REMOVED***
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() ***REMOVED***

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( ***REMOVED******REMOVED***, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) ***REMOVED***
					anim.stop( true );
				***REMOVED***
			***REMOVED***;
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	***REMOVED***,
	stop: function( type, clearQueue, gotoEnd ) ***REMOVED***
		var stopQueue = function( hooks ) ***REMOVED***
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		***REMOVED***;

		if ( typeof type !== "string" ) ***REMOVED***
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		***REMOVED***
		if ( clearQueue && type !== false ) ***REMOVED***
			this.queue( type || "fx", [] );
		***REMOVED***

		return this.each( function() ***REMOVED***
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) ***REMOVED***
				if ( data[ index ] && data[ index ].stop ) ***REMOVED***
					stopQueue( data[ index ] );
				***REMOVED***
			***REMOVED*** else ***REMOVED***
				for ( index in data ) ***REMOVED***
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) ***REMOVED***
						stopQueue( data[ index ] );
					***REMOVED***
				***REMOVED***
			***REMOVED***

			for ( index = timers.length; index--; ) ***REMOVED***
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) ***REMOVED***

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				***REMOVED***
			***REMOVED***

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) ***REMOVED***
				jQuery.dequeue( this, type );
			***REMOVED***
		***REMOVED*** );
	***REMOVED***,
	finish: function( type ) ***REMOVED***
		if ( type !== false ) ***REMOVED***
			type = type || "fx";
		***REMOVED***
		return this.each( function() ***REMOVED***
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) ***REMOVED***
				hooks.stop.call( this, true );
			***REMOVED***

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) ***REMOVED***
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) ***REMOVED***
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				***REMOVED***
			***REMOVED***

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) ***REMOVED***
				if ( queue[ index ] && queue[ index ].finish ) ***REMOVED***
					queue[ index ].finish.call( this );
				***REMOVED***
			***REMOVED***

			// Turn off finishing flag
			delete data.finish;
		***REMOVED*** );
	***REMOVED***
***REMOVED*** );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) ***REMOVED***
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) ***REMOVED***
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	***REMOVED***;
***REMOVED*** );

// Generate shortcuts for custom animations
jQuery.each( ***REMOVED***
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: ***REMOVED*** opacity: "show" ***REMOVED***,
	fadeOut: ***REMOVED*** opacity: "hide" ***REMOVED***,
	fadeToggle: ***REMOVED*** opacity: "toggle" ***REMOVED***
***REMOVED***, function( name, props ) ***REMOVED***
	jQuery.fn[ name ] = function( speed, easing, callback ) ***REMOVED***
		return this.animate( props, speed, easing, callback );
	***REMOVED***;
***REMOVED*** );

jQuery.timers = [];
jQuery.fx.tick = function() ***REMOVED***
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) ***REMOVED***
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) ***REMOVED***
			timers.splice( i--, 1 );
		***REMOVED***
	***REMOVED***

	if ( !timers.length ) ***REMOVED***
		jQuery.fx.stop();
	***REMOVED***
	fxNow = undefined;
***REMOVED***;

jQuery.fx.timer = function( timer ) ***REMOVED***
	jQuery.timers.push( timer );
	jQuery.fx.start();
***REMOVED***;

jQuery.fx.interval = 13;
jQuery.fx.start = function() ***REMOVED***
	if ( inProgress ) ***REMOVED***
		return;
	***REMOVED***

	inProgress = true;
	schedule();
***REMOVED***;

jQuery.fx.stop = function() ***REMOVED***
	inProgress = null;
***REMOVED***;

jQuery.fx.speeds = ***REMOVED***
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
***REMOVED***;


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) ***REMOVED***
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) ***REMOVED***
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() ***REMOVED***
			window.clearTimeout( timeout );
		***REMOVED***;
	***REMOVED*** );
***REMOVED***;


( function() ***REMOVED***
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
***REMOVED*** )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( ***REMOVED***
	attr: function( name, value ) ***REMOVED***
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	***REMOVED***,

	removeAttr: function( name ) ***REMOVED***
		return this.each( function() ***REMOVED***
			jQuery.removeAttr( this, name );
		***REMOVED*** );
	***REMOVED***
***REMOVED*** );

jQuery.extend( ***REMOVED***
	attr: function( elem, name, value ) ***REMOVED***
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) ***REMOVED***
			return;
		***REMOVED***

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) ***REMOVED***
			return jQuery.prop( elem, name, value );
		***REMOVED***

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) ***REMOVED***
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		***REMOVED***

		if ( value !== undefined ) ***REMOVED***
			if ( value === null ) ***REMOVED***
				jQuery.removeAttr( elem, name );
				return;
			***REMOVED***

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) ***REMOVED***
				return ret;
			***REMOVED***

			elem.setAttribute( name, value + "" );
			return value;
		***REMOVED***

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) ***REMOVED***
			return ret;
		***REMOVED***

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	***REMOVED***,

	attrHooks: ***REMOVED***
		type: ***REMOVED***
			set: function( elem, value ) ***REMOVED***
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) ***REMOVED***
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) ***REMOVED***
						elem.value = val;
					***REMOVED***
					return value;
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	removeAttr: function( elem, value ) ***REMOVED***
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) ***REMOVED***
			while ( ( name = attrNames[ i++ ] ) ) ***REMOVED***
				elem.removeAttribute( name );
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED*** );

// Hooks for boolean attributes
boolHook = ***REMOVED***
	set: function( elem, value, name ) ***REMOVED***
		if ( value === false ) ***REMOVED***

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		***REMOVED*** else ***REMOVED***
			elem.setAttribute( name, name );
		***REMOVED***
		return name;
	***REMOVED***
***REMOVED***;

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) ***REMOVED***
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) ***REMOVED***
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) ***REMOVED***

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		***REMOVED***
		return ret;
	***REMOVED***;
***REMOVED*** );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( ***REMOVED***
	prop: function( name, value ) ***REMOVED***
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	***REMOVED***,

	removeProp: function( name ) ***REMOVED***
		return this.each( function() ***REMOVED***
			delete this[ jQuery.propFix[ name ] || name ];
		***REMOVED*** );
	***REMOVED***
***REMOVED*** );

jQuery.extend( ***REMOVED***
	prop: function( elem, name, value ) ***REMOVED***
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) ***REMOVED***
			return;
		***REMOVED***

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) ***REMOVED***

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		***REMOVED***

		if ( value !== undefined ) ***REMOVED***
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) ***REMOVED***
				return ret;
			***REMOVED***

			return ( elem[ name ] = value );
		***REMOVED***

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) ***REMOVED***
			return ret;
		***REMOVED***

		return elem[ name ];
	***REMOVED***,

	propHooks: ***REMOVED***
		tabIndex: ***REMOVED***
			get: function( elem ) ***REMOVED***

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) ***REMOVED***
					return parseInt( tabindex, 10 );
				***REMOVED***

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) ***REMOVED***
					return 0;
				***REMOVED***

				return -1;
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	propFix: ***REMOVED***
		"for": "htmlFor",
		"class": "className"
	***REMOVED***
***REMOVED*** );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) ***REMOVED***
	jQuery.propHooks.selected = ***REMOVED***
		get: function( elem ) ***REMOVED***

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) ***REMOVED***
				parent.parentNode.selectedIndex;
			***REMOVED***
			return null;
		***REMOVED***,
		set: function( elem ) ***REMOVED***

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) ***REMOVED***
				parent.selectedIndex;

				if ( parent.parentNode ) ***REMOVED***
					parent.parentNode.selectedIndex;
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***;
***REMOVED***

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() ***REMOVED***
	jQuery.propFix[ this.toLowerCase() ] = this;
***REMOVED*** );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) ***REMOVED***
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	***REMOVED***


function getClass( elem ) ***REMOVED***
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
***REMOVED***

function classesToArray( value ) ***REMOVED***
	if ( Array.isArray( value ) ) ***REMOVED***
		return value;
	***REMOVED***
	if ( typeof value === "string" ) ***REMOVED***
		return value.match( rnothtmlwhite ) || [];
	***REMOVED***
	return [];
***REMOVED***

jQuery.fn.extend( ***REMOVED***
	addClass: function( value ) ***REMOVED***
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) ***REMOVED***
			return this.each( function( j ) ***REMOVED***
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			***REMOVED*** );
		***REMOVED***

		classes = classesToArray( value );

		if ( classes.length ) ***REMOVED***
			while ( ( elem = this[ i++ ] ) ) ***REMOVED***
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) ***REMOVED***
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) ***REMOVED***
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) ***REMOVED***
							cur += clazz + " ";
						***REMOVED***
					***REMOVED***

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) ***REMOVED***
						elem.setAttribute( "class", finalValue );
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***

		return this;
	***REMOVED***,

	removeClass: function( value ) ***REMOVED***
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) ***REMOVED***
			return this.each( function( j ) ***REMOVED***
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			***REMOVED*** );
		***REMOVED***

		if ( !arguments.length ) ***REMOVED***
			return this.attr( "class", "" );
		***REMOVED***

		classes = classesToArray( value );

		if ( classes.length ) ***REMOVED***
			while ( ( elem = this[ i++ ] ) ) ***REMOVED***
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) ***REMOVED***
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) ***REMOVED***

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) ***REMOVED***
							cur = cur.replace( " " + clazz + " ", " " );
						***REMOVED***
					***REMOVED***

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) ***REMOVED***
						elem.setAttribute( "class", finalValue );
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***

		return this;
	***REMOVED***,

	toggleClass: function( value, stateVal ) ***REMOVED***
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) ***REMOVED***
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		***REMOVED***

		if ( isFunction( value ) ) ***REMOVED***
			return this.each( function( i ) ***REMOVED***
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			***REMOVED*** );
		***REMOVED***

		return this.each( function() ***REMOVED***
			var className, i, self, classNames;

			if ( isValidValue ) ***REMOVED***

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) ***REMOVED***

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) ***REMOVED***
						self.removeClass( className );
					***REMOVED*** else ***REMOVED***
						self.addClass( className );
					***REMOVED***
				***REMOVED***

			// Toggle whole class name
			***REMOVED*** else if ( value === undefined || type === "boolean" ) ***REMOVED***
				className = getClass( this );
				if ( className ) ***REMOVED***

					// Store className if set
					dataPriv.set( this, "__className__", className );
				***REMOVED***

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) ***REMOVED***
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				***REMOVED***
			***REMOVED***
		***REMOVED*** );
	***REMOVED***,

	hasClass: function( selector ) ***REMOVED***
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) ***REMOVED***
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) ***REMOVED***
					return true;
			***REMOVED***
		***REMOVED***

		return false;
	***REMOVED***
***REMOVED*** );




var rreturn = /\r/g;

jQuery.fn.extend( ***REMOVED***
	val: function( value ) ***REMOVED***
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) ***REMOVED***
			if ( elem ) ***REMOVED***
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) ***REMOVED***
					return ret;
				***REMOVED***

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) ***REMOVED***
					return ret.replace( rreturn, "" );
				***REMOVED***

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			***REMOVED***

			return;
		***REMOVED***

		valueIsFunction = isFunction( value );

		return this.each( function( i ) ***REMOVED***
			var val;

			if ( this.nodeType !== 1 ) ***REMOVED***
				return;
			***REMOVED***

			if ( valueIsFunction ) ***REMOVED***
				val = value.call( this, i, jQuery( this ).val() );
			***REMOVED*** else ***REMOVED***
				val = value;
			***REMOVED***

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) ***REMOVED***
				val = "";

			***REMOVED*** else if ( typeof val === "number" ) ***REMOVED***
				val += "";

			***REMOVED*** else if ( Array.isArray( val ) ) ***REMOVED***
				val = jQuery.map( val, function( value ) ***REMOVED***
					return value == null ? "" : value + "";
				***REMOVED*** );
			***REMOVED***

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) ***REMOVED***
				this.value = val;
			***REMOVED***
		***REMOVED*** );
	***REMOVED***
***REMOVED*** );

jQuery.extend( ***REMOVED***
	valHooks: ***REMOVED***
		option: ***REMOVED***
			get: function( elem ) ***REMOVED***

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			***REMOVED***
		***REMOVED***,
		select: ***REMOVED***
			get: function( elem ) ***REMOVED***
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) ***REMOVED***
					i = max;

				***REMOVED*** else ***REMOVED***
					i = one ? index : 0;
				***REMOVED***

				// Loop through all the selected options
				for ( ; i < max; i++ ) ***REMOVED***
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) ***REMOVED***

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) ***REMOVED***
							return value;
						***REMOVED***

						// Multi-Selects return an array
						values.push( value );
					***REMOVED***
				***REMOVED***

				return values;
			***REMOVED***,

			set: function( elem, value ) ***REMOVED***
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) ***REMOVED***
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) ***REMOVED***
						optionSet = true;
					***REMOVED***

					/* eslint-enable no-cond-assign */
				***REMOVED***

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) ***REMOVED***
					elem.selectedIndex = -1;
				***REMOVED***
				return values;
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED*** );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() ***REMOVED***
	jQuery.valHooks[ this ] = ***REMOVED***
		set: function( elem, value ) ***REMOVED***
			if ( Array.isArray( value ) ) ***REMOVED***
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			***REMOVED***
		***REMOVED***
	***REMOVED***;
	if ( !support.checkOn ) ***REMOVED***
		jQuery.valHooks[ this ].get = function( elem ) ***REMOVED***
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		***REMOVED***;
	***REMOVED***
***REMOVED*** );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) ***REMOVED***
		e.stopPropagation();
	***REMOVED***;

jQuery.extend( jQuery.event, ***REMOVED***

	trigger: function( event, data, elem, onlyHandlers ) ***REMOVED***

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) ***REMOVED***
			return;
		***REMOVED***

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) ***REMOVED***
			return;
		***REMOVED***

		if ( type.indexOf( "." ) > -1 ) ***REMOVED***

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		***REMOVED***
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) ***REMOVED***
			event.target = elem;
		***REMOVED***

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || ***REMOVED******REMOVED***;
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) ***REMOVED***
			return;
		***REMOVED***

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) ***REMOVED***

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) ***REMOVED***
				cur = cur.parentNode;
			***REMOVED***
			for ( ; cur; cur = cur.parentNode ) ***REMOVED***
				eventPath.push( cur );
				tmp = cur;
			***REMOVED***

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) ***REMOVED***
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			***REMOVED***
		***REMOVED***

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) ***REMOVED***
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || ***REMOVED******REMOVED*** )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) ***REMOVED***
				handle.apply( cur, data );
			***REMOVED***

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) ***REMOVED***
				event.result = handle.apply( cur, data );
				if ( event.result === false ) ***REMOVED***
					event.preventDefault();
				***REMOVED***
			***REMOVED***
		***REMOVED***
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) ***REMOVED***

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) ***REMOVED***

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) ***REMOVED***

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) ***REMOVED***
						elem[ ontype ] = null;
					***REMOVED***

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) ***REMOVED***
						lastElement.addEventListener( type, stopPropagationCallback );
					***REMOVED***

					elem[ type ]();

					if ( event.isPropagationStopped() ) ***REMOVED***
						lastElement.removeEventListener( type, stopPropagationCallback );
					***REMOVED***

					jQuery.event.triggered = undefined;

					if ( tmp ) ***REMOVED***
						elem[ ontype ] = tmp;
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***

		return event.result;
	***REMOVED***,

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) ***REMOVED***
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			***REMOVED***
				type: type,
				isSimulated: true
			***REMOVED***
		);

		jQuery.event.trigger( e, null, elem );
	***REMOVED***

***REMOVED*** );

jQuery.fn.extend( ***REMOVED***

	trigger: function( type, data ) ***REMOVED***
		return this.each( function() ***REMOVED***
			jQuery.event.trigger( type, data, this );
		***REMOVED*** );
	***REMOVED***,
	triggerHandler: function( type, data ) ***REMOVED***
		var elem = this[ 0 ];
		if ( elem ) ***REMOVED***
			return jQuery.event.trigger( type, data, elem, true );
		***REMOVED***
	***REMOVED***
***REMOVED*** );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) ***REMOVED***
	jQuery.each( ***REMOVED*** focus: "focusin", blur: "focusout" ***REMOVED***, function( orig, fix ) ***REMOVED***

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) ***REMOVED***
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		***REMOVED***;

		jQuery.event.special[ fix ] = ***REMOVED***
			setup: function() ***REMOVED***
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) ***REMOVED***
					doc.addEventListener( orig, handler, true );
				***REMOVED***
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			***REMOVED***,
			teardown: function() ***REMOVED***
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) ***REMOVED***
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				***REMOVED*** else ***REMOVED***
					dataPriv.access( doc, fix, attaches );
				***REMOVED***
			***REMOVED***
		***REMOVED***;
	***REMOVED*** );
***REMOVED***
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) ***REMOVED***
	var xml;
	if ( !data || typeof data !== "string" ) ***REMOVED***
		return null;
	***REMOVED***

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try ***REMOVED***
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	***REMOVED*** catch ( e ) ***REMOVED***
		xml = undefined;
	***REMOVED***

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) ***REMOVED***
		jQuery.error( "Invalid XML: " + data );
	***REMOVED***
	return xml;
***REMOVED***;


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) ***REMOVED***
	var name;

	if ( Array.isArray( obj ) ) ***REMOVED***

		// Serialize array item.
		jQuery.each( obj, function( i, v ) ***REMOVED***
			if ( traditional || rbracket.test( prefix ) ) ***REMOVED***

				// Treat each array item as a scalar.
				add( prefix, v );

			***REMOVED*** else ***REMOVED***

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			***REMOVED***
		***REMOVED*** );

	***REMOVED*** else if ( !traditional && toType( obj ) === "object" ) ***REMOVED***

		// Serialize object item.
		for ( name in obj ) ***REMOVED***
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		***REMOVED***

	***REMOVED*** else ***REMOVED***

		// Serialize scalar item.
		add( prefix, obj );
	***REMOVED***
***REMOVED***

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) ***REMOVED***
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) ***REMOVED***

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		***REMOVED***;

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) ***REMOVED***

		// Serialize the form elements
		jQuery.each( a, function() ***REMOVED***
			add( this.name, this.value );
		***REMOVED*** );

	***REMOVED*** else ***REMOVED***

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) ***REMOVED***
			buildParams( prefix, a[ prefix ], traditional, add );
		***REMOVED***
	***REMOVED***

	// Return the resulting serialization
	return s.join( "&" );
***REMOVED***;

jQuery.fn.extend( ***REMOVED***
	serialize: function() ***REMOVED***
		return jQuery.param( this.serializeArray() );
	***REMOVED***,
	serializeArray: function() ***REMOVED***
		return this.map( function() ***REMOVED***

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		***REMOVED*** )
		.filter( function() ***REMOVED***
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		***REMOVED*** )
		.map( function( i, elem ) ***REMOVED***
			var val = jQuery( this ).val();

			if ( val == null ) ***REMOVED***
				return null;
			***REMOVED***

			if ( Array.isArray( val ) ) ***REMOVED***
				return jQuery.map( val, function( val ) ***REMOVED***
					return ***REMOVED*** name: elem.name, value: val.replace( rCRLF, "\r\n" ) ***REMOVED***;
				***REMOVED*** );
			***REMOVED***

			return ***REMOVED*** name: elem.name, value: val.replace( rCRLF, "\r\n" ) ***REMOVED***;
		***REMOVED*** ).get();
	***REMOVED***
***REMOVED*** );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = ***REMOVED******REMOVED***,

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = ***REMOVED******REMOVED***,

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) ***REMOVED***

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) ***REMOVED***

		if ( typeof dataTypeExpression !== "string" ) ***REMOVED***
			func = dataTypeExpression;
			dataTypeExpression = "*";
		***REMOVED***

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) ***REMOVED***

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) ***REMOVED***

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) ***REMOVED***
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				***REMOVED*** else ***REMOVED***
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***;
***REMOVED***

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) ***REMOVED***

	var inspected = ***REMOVED******REMOVED***,
		seekingTransport = ( structure === transports );

	function inspect( dataType ) ***REMOVED***
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) ***REMOVED***
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) ***REMOVED***

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			***REMOVED*** else if ( seekingTransport ) ***REMOVED***
				return !( selected = dataTypeOrTransport );
			***REMOVED***
		***REMOVED*** );
		return selected;
	***REMOVED***

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
***REMOVED***

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) ***REMOVED***
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || ***REMOVED******REMOVED***;

	for ( key in src ) ***REMOVED***
		if ( src[ key ] !== undefined ) ***REMOVED***
			( flatOptions[ key ] ? target : ( deep || ( deep = ***REMOVED******REMOVED*** ) ) )[ key ] = src[ key ];
		***REMOVED***
	***REMOVED***
	if ( deep ) ***REMOVED***
		jQuery.extend( true, target, deep );
	***REMOVED***

	return target;
***REMOVED***

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) ***REMOVED***

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) ***REMOVED***
		dataTypes.shift();
		if ( ct === undefined ) ***REMOVED***
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		***REMOVED***
	***REMOVED***

	// Check if we're dealing with a known content-type
	if ( ct ) ***REMOVED***
		for ( type in contents ) ***REMOVED***
			if ( contents[ type ] && contents[ type ].test( ct ) ) ***REMOVED***
				dataTypes.unshift( type );
				break;
			***REMOVED***
		***REMOVED***
	***REMOVED***

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) ***REMOVED***
		finalDataType = dataTypes[ 0 ];
	***REMOVED*** else ***REMOVED***

		// Try convertible dataTypes
		for ( type in responses ) ***REMOVED***
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) ***REMOVED***
				finalDataType = type;
				break;
			***REMOVED***
			if ( !firstDataType ) ***REMOVED***
				firstDataType = type;
			***REMOVED***
		***REMOVED***

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	***REMOVED***

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) ***REMOVED***
		if ( finalDataType !== dataTypes[ 0 ] ) ***REMOVED***
			dataTypes.unshift( finalDataType );
		***REMOVED***
		return responses[ finalDataType ];
	***REMOVED***
***REMOVED***

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) ***REMOVED***
	var conv2, current, conv, tmp, prev,
		converters = ***REMOVED******REMOVED***,

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) ***REMOVED***
		for ( conv in s.converters ) ***REMOVED***
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		***REMOVED***
	***REMOVED***

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) ***REMOVED***

		if ( s.responseFields[ current ] ) ***REMOVED***
			jqXHR[ s.responseFields[ current ] ] = response;
		***REMOVED***

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) ***REMOVED***
			response = s.dataFilter( response, s.dataType );
		***REMOVED***

		prev = current;
		current = dataTypes.shift();

		if ( current ) ***REMOVED***

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) ***REMOVED***

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			***REMOVED*** else if ( prev !== "*" && prev !== current ) ***REMOVED***

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) ***REMOVED***
					for ( conv2 in converters ) ***REMOVED***

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) ***REMOVED***

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) ***REMOVED***

								// Condense equivalence converters
								if ( conv === true ) ***REMOVED***
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								***REMOVED*** else if ( converters[ conv2 ] !== true ) ***REMOVED***
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								***REMOVED***
								break;
							***REMOVED***
						***REMOVED***
					***REMOVED***
				***REMOVED***

				// Apply converter (if not an equivalence)
				if ( conv !== true ) ***REMOVED***

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) ***REMOVED***
						response = conv( response );
					***REMOVED*** else ***REMOVED***
						try ***REMOVED***
							response = conv( response );
						***REMOVED*** catch ( e ) ***REMOVED***
							return ***REMOVED***
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							***REMOVED***;
						***REMOVED***
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***

	return ***REMOVED*** state: "success", data: response ***REMOVED***;
***REMOVED***

jQuery.extend( ***REMOVED***

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: ***REMOVED******REMOVED***,
	etag: ***REMOVED******REMOVED***,

	ajaxSettings: ***REMOVED***
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: ***REMOVED******REMOVED***,
		*/

		accepts: ***REMOVED***
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		***REMOVED***,

		contents: ***REMOVED***
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		***REMOVED***,

		responseFields: ***REMOVED***
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		***REMOVED***,

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: ***REMOVED***

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		***REMOVED***,

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: ***REMOVED***
			url: true,
			context: true
		***REMOVED***
	***REMOVED***,

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) ***REMOVED***
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	***REMOVED***,

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) ***REMOVED***

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) ***REMOVED***
			options = url;
			url = undefined;
		***REMOVED***

		// Force options to be an object
		options = options || ***REMOVED******REMOVED***;

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( ***REMOVED******REMOVED***, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || ***REMOVED******REMOVED***,

			// Headers (they are sent all at once)
			requestHeaders = ***REMOVED******REMOVED***,
			requestHeadersNames = ***REMOVED******REMOVED***,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = ***REMOVED***
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) ***REMOVED***
					var match;
					if ( completed ) ***REMOVED***
						if ( !responseHeaders ) ***REMOVED***
							responseHeaders = ***REMOVED******REMOVED***;
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) ***REMOVED***
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							***REMOVED***
						***REMOVED***
						match = responseHeaders[ key.toLowerCase() ];
					***REMOVED***
					return match == null ? null : match;
				***REMOVED***,

				// Raw string
				getAllResponseHeaders: function() ***REMOVED***
					return completed ? responseHeadersString : null;
				***REMOVED***,

				// Caches the header
				setRequestHeader: function( name, value ) ***REMOVED***
					if ( completed == null ) ***REMOVED***
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					***REMOVED***
					return this;
				***REMOVED***,

				// Overrides response content-type header
				overrideMimeType: function( type ) ***REMOVED***
					if ( completed == null ) ***REMOVED***
						s.mimeType = type;
					***REMOVED***
					return this;
				***REMOVED***,

				// Status-dependent callbacks
				statusCode: function( map ) ***REMOVED***
					var code;
					if ( map ) ***REMOVED***
						if ( completed ) ***REMOVED***

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						***REMOVED*** else ***REMOVED***

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) ***REMOVED***
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							***REMOVED***
						***REMOVED***
					***REMOVED***
					return this;
				***REMOVED***,

				// Cancel the request
				abort: function( statusText ) ***REMOVED***
					var finalText = statusText || strAbort;
					if ( transport ) ***REMOVED***
						transport.abort( finalText );
					***REMOVED***
					done( 0, finalText );
					return this;
				***REMOVED***
			***REMOVED***;

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) ***REMOVED***
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try ***REMOVED***
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			***REMOVED*** catch ( e ) ***REMOVED***

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			***REMOVED***
		***REMOVED***

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) ***REMOVED***
			s.data = jQuery.param( s.data, s.traditional );
		***REMOVED***

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) ***REMOVED***
			return jqXHR;
		***REMOVED***

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) ***REMOVED***
			jQuery.event.trigger( "ajaxStart" );
		***REMOVED***

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) ***REMOVED***

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) ***REMOVED***
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			***REMOVED***

			// Add or update anti-cache param if needed
			if ( s.cache === false ) ***REMOVED***
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			***REMOVED***

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		***REMOVED*** else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) ***REMOVED***
			s.data = s.data.replace( r20, "+" );
		***REMOVED***

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) ***REMOVED***
			if ( jQuery.lastModified[ cacheURL ] ) ***REMOVED***
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			***REMOVED***
			if ( jQuery.etag[ cacheURL ] ) ***REMOVED***
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			***REMOVED***
		***REMOVED***

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) ***REMOVED***
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		***REMOVED***

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) ***REMOVED***
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		***REMOVED***

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) ***REMOVED***

			// Abort if not done already and return
			return jqXHR.abort();
		***REMOVED***

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) ***REMOVED***
			done( -1, "No Transport" );
		***REMOVED*** else ***REMOVED***
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) ***REMOVED***
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			***REMOVED***

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) ***REMOVED***
				return jqXHR;
			***REMOVED***

			// Timeout
			if ( s.async && s.timeout > 0 ) ***REMOVED***
				timeoutTimer = window.setTimeout( function() ***REMOVED***
					jqXHR.abort( "timeout" );
				***REMOVED***, s.timeout );
			***REMOVED***

			try ***REMOVED***
				completed = false;
				transport.send( requestHeaders, done );
			***REMOVED*** catch ( e ) ***REMOVED***

				// Rethrow post-completion exceptions
				if ( completed ) ***REMOVED***
					throw e;
				***REMOVED***

				// Propagate others as results
				done( -1, e );
			***REMOVED***
		***REMOVED***

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) ***REMOVED***
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) ***REMOVED***
				return;
			***REMOVED***

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) ***REMOVED***
				window.clearTimeout( timeoutTimer );
			***REMOVED***

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) ***REMOVED***
				response = ajaxHandleResponses( s, jqXHR, responses );
			***REMOVED***

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) ***REMOVED***

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) ***REMOVED***
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) ***REMOVED***
						jQuery.lastModified[ cacheURL ] = modified;
					***REMOVED***
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) ***REMOVED***
						jQuery.etag[ cacheURL ] = modified;
					***REMOVED***
				***REMOVED***

				// if no content
				if ( status === 204 || s.type === "HEAD" ) ***REMOVED***
					statusText = "nocontent";

				// if not modified
				***REMOVED*** else if ( status === 304 ) ***REMOVED***
					statusText = "notmodified";

				// If we have data, let's convert it
				***REMOVED*** else ***REMOVED***
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				***REMOVED***
			***REMOVED*** else ***REMOVED***

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) ***REMOVED***
					statusText = "error";
					if ( status < 0 ) ***REMOVED***
						status = 0;
					***REMOVED***
				***REMOVED***
			***REMOVED***

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) ***REMOVED***
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			***REMOVED*** else ***REMOVED***
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			***REMOVED***

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) ***REMOVED***
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			***REMOVED***

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) ***REMOVED***
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) ***REMOVED***
					jQuery.event.trigger( "ajaxStop" );
				***REMOVED***
			***REMOVED***
		***REMOVED***

		return jqXHR;
	***REMOVED***,

	getJSON: function( url, data, callback ) ***REMOVED***
		return jQuery.get( url, data, callback, "json" );
	***REMOVED***,

	getScript: function( url, callback ) ***REMOVED***
		return jQuery.get( url, undefined, callback, "script" );
	***REMOVED***
***REMOVED*** );

jQuery.each( [ "get", "post" ], function( i, method ) ***REMOVED***
	jQuery[ method ] = function( url, data, callback, type ) ***REMOVED***

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) ***REMOVED***
			type = type || callback;
			callback = data;
			data = undefined;
		***REMOVED***

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( ***REMOVED***
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		***REMOVED***, jQuery.isPlainObject( url ) && url ) );
	***REMOVED***;
***REMOVED*** );


jQuery._evalUrl = function( url ) ***REMOVED***
	return jQuery.ajax( ***REMOVED***
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	***REMOVED*** );
***REMOVED***;


jQuery.fn.extend( ***REMOVED***
	wrapAll: function( html ) ***REMOVED***
		var wrap;

		if ( this[ 0 ] ) ***REMOVED***
			if ( isFunction( html ) ) ***REMOVED***
				html = html.call( this[ 0 ] );
			***REMOVED***

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) ***REMOVED***
				wrap.insertBefore( this[ 0 ] );
			***REMOVED***

			wrap.map( function() ***REMOVED***
				var elem = this;

				while ( elem.firstElementChild ) ***REMOVED***
					elem = elem.firstElementChild;
				***REMOVED***

				return elem;
			***REMOVED*** ).append( this );
		***REMOVED***

		return this;
	***REMOVED***,

	wrapInner: function( html ) ***REMOVED***
		if ( isFunction( html ) ) ***REMOVED***
			return this.each( function( i ) ***REMOVED***
				jQuery( this ).wrapInner( html.call( this, i ) );
			***REMOVED*** );
		***REMOVED***

		return this.each( function() ***REMOVED***
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) ***REMOVED***
				contents.wrapAll( html );

			***REMOVED*** else ***REMOVED***
				self.append( html );
			***REMOVED***
		***REMOVED*** );
	***REMOVED***,

	wrap: function( html ) ***REMOVED***
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) ***REMOVED***
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		***REMOVED*** );
	***REMOVED***,

	unwrap: function( selector ) ***REMOVED***
		this.parent( selector ).not( "body" ).each( function() ***REMOVED***
			jQuery( this ).replaceWith( this.childNodes );
		***REMOVED*** );
		return this;
	***REMOVED***
***REMOVED*** );


jQuery.expr.pseudos.hidden = function( elem ) ***REMOVED***
	return !jQuery.expr.pseudos.visible( elem );
***REMOVED***;
jQuery.expr.pseudos.visible = function( elem ) ***REMOVED***
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
***REMOVED***;




jQuery.ajaxSettings.xhr = function() ***REMOVED***
	try ***REMOVED***
		return new window.XMLHttpRequest();
	***REMOVED*** catch ( e ) ***REMOVED******REMOVED***
***REMOVED***;

var xhrSuccessStatus = ***REMOVED***

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	***REMOVED***,
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) ***REMOVED***
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) ***REMOVED***
		return ***REMOVED***
			send: function( headers, complete ) ***REMOVED***
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) ***REMOVED***
					for ( i in options.xhrFields ) ***REMOVED***
						xhr[ i ] = options.xhrFields[ i ];
					***REMOVED***
				***REMOVED***

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) ***REMOVED***
					xhr.overrideMimeType( options.mimeType );
				***REMOVED***

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) ***REMOVED***
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				***REMOVED***

				// Set headers
				for ( i in headers ) ***REMOVED***
					xhr.setRequestHeader( i, headers[ i ] );
				***REMOVED***

				// Callback
				callback = function( type ) ***REMOVED***
					return function() ***REMOVED***
						if ( callback ) ***REMOVED***
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) ***REMOVED***
								xhr.abort();
							***REMOVED*** else if ( type === "error" ) ***REMOVED***

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) ***REMOVED***
									complete( 0, "error" );
								***REMOVED*** else ***REMOVED***
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								***REMOVED***
							***REMOVED*** else ***REMOVED***
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										***REMOVED*** binary: xhr.response ***REMOVED*** :
										***REMOVED*** text: xhr.responseText ***REMOVED***,
									xhr.getAllResponseHeaders()
								);
							***REMOVED***
						***REMOVED***
					***REMOVED***;
				***REMOVED***;

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) ***REMOVED***
					xhr.onabort = errorCallback;
				***REMOVED*** else ***REMOVED***
					xhr.onreadystatechange = function() ***REMOVED***

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) ***REMOVED***

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() ***REMOVED***
								if ( callback ) ***REMOVED***
									errorCallback();
								***REMOVED***
							***REMOVED*** );
						***REMOVED***
					***REMOVED***;
				***REMOVED***

				// Create the abort callback
				callback = callback( "abort" );

				try ***REMOVED***

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				***REMOVED*** catch ( e ) ***REMOVED***

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) ***REMOVED***
						throw e;
					***REMOVED***
				***REMOVED***
			***REMOVED***,

			abort: function() ***REMOVED***
				if ( callback ) ***REMOVED***
					callback();
				***REMOVED***
			***REMOVED***
		***REMOVED***;
	***REMOVED***
***REMOVED*** );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) ***REMOVED***
	if ( s.crossDomain ) ***REMOVED***
		s.contents.script = false;
	***REMOVED***
***REMOVED*** );

// Install script dataType
jQuery.ajaxSetup( ***REMOVED***
	accepts: ***REMOVED***
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	***REMOVED***,
	contents: ***REMOVED***
		script: /\b(?:java|ecma)script\b/
	***REMOVED***,
	converters: ***REMOVED***
		"text script": function( text ) ***REMOVED***
			jQuery.globalEval( text );
			return text;
		***REMOVED***
	***REMOVED***
***REMOVED*** );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) ***REMOVED***
	if ( s.cache === undefined ) ***REMOVED***
		s.cache = false;
	***REMOVED***
	if ( s.crossDomain ) ***REMOVED***
		s.type = "GET";
	***REMOVED***
***REMOVED*** );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) ***REMOVED***

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) ***REMOVED***
		var script, callback;
		return ***REMOVED***
			send: function( _, complete ) ***REMOVED***
				script = jQuery( "<script>" ).prop( ***REMOVED***
					charset: s.scriptCharset,
					src: s.url
				***REMOVED*** ).on(
					"load error",
					callback = function( evt ) ***REMOVED***
						script.remove();
						callback = null;
						if ( evt ) ***REMOVED***
							complete( evt.type === "error" ? 404 : 200, evt.type );
						***REMOVED***
					***REMOVED***
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			***REMOVED***,
			abort: function() ***REMOVED***
				if ( callback ) ***REMOVED***
					callback();
				***REMOVED***
			***REMOVED***
		***REMOVED***;
	***REMOVED***
***REMOVED*** );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( ***REMOVED***
	jsonp: "callback",
	jsonpCallback: function() ***REMOVED***
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	***REMOVED***
***REMOVED*** );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) ***REMOVED***

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) ***REMOVED***

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) ***REMOVED***
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		***REMOVED*** else if ( s.jsonp !== false ) ***REMOVED***
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		***REMOVED***

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() ***REMOVED***
			if ( !responseContainer ) ***REMOVED***
				jQuery.error( callbackName + " was not called" );
			***REMOVED***
			return responseContainer[ 0 ];
		***REMOVED***;

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() ***REMOVED***
			responseContainer = arguments;
		***REMOVED***;

		// Clean-up function (fires after converters)
		jqXHR.always( function() ***REMOVED***

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) ***REMOVED***
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			***REMOVED*** else ***REMOVED***
				window[ callbackName ] = overwritten;
			***REMOVED***

			// Save back as free
			if ( s[ callbackName ] ) ***REMOVED***

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			***REMOVED***

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) ***REMOVED***
				overwritten( responseContainer[ 0 ] );
			***REMOVED***

			responseContainer = overwritten = undefined;
		***REMOVED*** );

		// Delegate to script
		return "script";
	***REMOVED***
***REMOVED*** );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() ***REMOVED***
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
***REMOVED*** )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) ***REMOVED***
	if ( typeof data !== "string" ) ***REMOVED***
		return [];
	***REMOVED***
	if ( typeof context === "boolean" ) ***REMOVED***
		keepScripts = context;
		context = false;
	***REMOVED***

	var base, parsed, scripts;

	if ( !context ) ***REMOVED***

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) ***REMOVED***
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		***REMOVED*** else ***REMOVED***
			context = document;
		***REMOVED***
	***REMOVED***

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) ***REMOVED***
		return [ context.createElement( parsed[ 1 ] ) ];
	***REMOVED***

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) ***REMOVED***
		jQuery( scripts ).remove();
	***REMOVED***

	return jQuery.merge( [], parsed.childNodes );
***REMOVED***;


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) ***REMOVED***
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) ***REMOVED***
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	***REMOVED***

	// If it's a function
	if ( isFunction( params ) ) ***REMOVED***

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	***REMOVED*** else if ( params && typeof params === "object" ) ***REMOVED***
		type = "POST";
	***REMOVED***

	// If we have elements to modify, make the request
	if ( self.length > 0 ) ***REMOVED***
		jQuery.ajax( ***REMOVED***
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		***REMOVED*** ).done( function( responseText ) ***REMOVED***

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		***REMOVED*** ).always( callback && function( jqXHR, status ) ***REMOVED***
			self.each( function() ***REMOVED***
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			***REMOVED*** );
		***REMOVED*** );
	***REMOVED***

	return this;
***REMOVED***;




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) ***REMOVED***
	jQuery.fn[ type ] = function( fn ) ***REMOVED***
		return this.on( type, fn );
	***REMOVED***;
***REMOVED*** );




jQuery.expr.pseudos.animated = function( elem ) ***REMOVED***
	return jQuery.grep( jQuery.timers, function( fn ) ***REMOVED***
		return elem === fn.elem;
	***REMOVED*** ).length;
***REMOVED***;




jQuery.offset = ***REMOVED***
	setOffset: function( elem, options, i ) ***REMOVED***
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = ***REMOVED******REMOVED***;

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) ***REMOVED***
			elem.style.position = "relative";
		***REMOVED***

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) ***REMOVED***
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		***REMOVED*** else ***REMOVED***
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		***REMOVED***

		if ( isFunction( options ) ) ***REMOVED***

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( ***REMOVED******REMOVED***, curOffset ) );
		***REMOVED***

		if ( options.top != null ) ***REMOVED***
			props.top = ( options.top - curOffset.top ) + curTop;
		***REMOVED***
		if ( options.left != null ) ***REMOVED***
			props.left = ( options.left - curOffset.left ) + curLeft;
		***REMOVED***

		if ( "using" in options ) ***REMOVED***
			options.using.call( elem, props );

		***REMOVED*** else ***REMOVED***
			curElem.css( props );
		***REMOVED***
	***REMOVED***
***REMOVED***;

jQuery.fn.extend( ***REMOVED***

	// offset() relates an element's border box to the document origin
	offset: function( options ) ***REMOVED***

		// Preserve chaining for setter
		if ( arguments.length ) ***REMOVED***
			return options === undefined ?
				this :
				this.each( function( i ) ***REMOVED***
					jQuery.offset.setOffset( this, options, i );
				***REMOVED*** );
		***REMOVED***

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) ***REMOVED***
			return;
		***REMOVED***

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) ***REMOVED***
			return ***REMOVED*** top: 0, left: 0 ***REMOVED***;
		***REMOVED***

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return ***REMOVED***
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		***REMOVED***;
	***REMOVED***,

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() ***REMOVED***
		if ( !this[ 0 ] ) ***REMOVED***
			return;
		***REMOVED***

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = ***REMOVED*** top: 0, left: 0 ***REMOVED***;

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) ***REMOVED***

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		***REMOVED*** else ***REMOVED***
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ***REMOVED***

				offsetParent = offsetParent.parentNode;
			***REMOVED***
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) ***REMOVED***

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			***REMOVED***
		***REMOVED***

		// Subtract parent offsets and element margins
		return ***REMOVED***
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		***REMOVED***;
	***REMOVED***,

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() ***REMOVED***
		return this.map( function() ***REMOVED***
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) ***REMOVED***
				offsetParent = offsetParent.offsetParent;
			***REMOVED***

			return offsetParent || documentElement;
		***REMOVED*** );
	***REMOVED***
***REMOVED*** );

// Create scrollLeft and scrollTop methods
jQuery.each( ***REMOVED*** scrollLeft: "pageXOffset", scrollTop: "pageYOffset" ***REMOVED***, function( method, prop ) ***REMOVED***
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) ***REMOVED***
		return access( this, function( elem, method, val ) ***REMOVED***

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) ***REMOVED***
				win = elem;
			***REMOVED*** else if ( elem.nodeType === 9 ) ***REMOVED***
				win = elem.defaultView;
			***REMOVED***

			if ( val === undefined ) ***REMOVED***
				return win ? win[ prop ] : elem[ method ];
			***REMOVED***

			if ( win ) ***REMOVED***
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			***REMOVED*** else ***REMOVED***
				elem[ method ] = val;
			***REMOVED***
		***REMOVED***, method, val, arguments.length );
	***REMOVED***;
***REMOVED*** );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) ***REMOVED***
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) ***REMOVED***
			if ( computed ) ***REMOVED***
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			***REMOVED***
		***REMOVED***
	);
***REMOVED*** );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( ***REMOVED*** Height: "height", Width: "width" ***REMOVED***, function( name, type ) ***REMOVED***
	jQuery.each( ***REMOVED*** padding: "inner" + name, content: type, "": "outer" + name ***REMOVED***,
		function( defaultExtra, funcName ) ***REMOVED***

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) ***REMOVED***
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) ***REMOVED***
				var doc;

				if ( isWindow( elem ) ) ***REMOVED***

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				***REMOVED***

				// Get document width or height
				if ( elem.nodeType === 9 ) ***REMOVED***
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				***REMOVED***

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			***REMOVED***, type, chainable ? margin : undefined, chainable );
		***REMOVED***;
	***REMOVED*** );
***REMOVED*** );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) ***REMOVED***

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) ***REMOVED***
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	***REMOVED***;
***REMOVED*** );

jQuery.fn.extend( ***REMOVED***
	hover: function( fnOver, fnOut ) ***REMOVED***
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	***REMOVED***
***REMOVED*** );




jQuery.fn.extend( ***REMOVED***

	bind: function( types, data, fn ) ***REMOVED***
		return this.on( types, null, data, fn );
	***REMOVED***,
	unbind: function( types, fn ) ***REMOVED***
		return this.off( types, null, fn );
	***REMOVED***,

	delegate: function( selector, types, data, fn ) ***REMOVED***
		return this.on( types, selector, data, fn );
	***REMOVED***,
	undelegate: function( selector, types, fn ) ***REMOVED***

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	***REMOVED***
***REMOVED*** );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) ***REMOVED***
	var tmp, args, proxy;

	if ( typeof context === "string" ) ***REMOVED***
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	***REMOVED***

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) ***REMOVED***
		return undefined;
	***REMOVED***

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() ***REMOVED***
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	***REMOVED***;

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
***REMOVED***;

jQuery.holdReady = function( hold ) ***REMOVED***
	if ( hold ) ***REMOVED***
		jQuery.readyWait++;
	***REMOVED*** else ***REMOVED***
		jQuery.ready( true );
	***REMOVED***
***REMOVED***;
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) ***REMOVED***

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
***REMOVED***;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) ***REMOVED***
	define( "jquery", [], function() ***REMOVED***
		return jQuery;
	***REMOVED*** );
***REMOVED***




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) ***REMOVED***
	if ( window.$ === jQuery ) ***REMOVED***
		window.$ = _$;
	***REMOVED***

	if ( deep && window.jQuery === jQuery ) ***REMOVED***
		window.jQuery = _jQuery;
	***REMOVED***

	return jQuery;
***REMOVED***;

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) ***REMOVED***
	window.jQuery = window.$ = jQuery;
***REMOVED***




return jQuery;
***REMOVED*** );
