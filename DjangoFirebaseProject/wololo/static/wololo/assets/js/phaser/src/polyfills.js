/**
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

// ES6 Math.trunc - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
if (!Math.trunc) ***REMOVED***
    Math.trunc = function trunc(x) ***REMOVED***
        return x < 0 ? Math.ceil(x) : Math.floor(x);
    ***REMOVED***;
***REMOVED***

/**
* A polyfill for Function.prototype.bind
*/
if (!Function.prototype.bind) ***REMOVED***

    /* jshint freeze: false */
    Function.prototype.bind = (function () ***REMOVED***

        var slice = Array.prototype.slice;

        return function (thisArg) ***REMOVED***

            var target = this, boundArgs = slice.call(arguments, 1);

            if (typeof target !== 'function')
            ***REMOVED***
                throw new TypeError();
            ***REMOVED***

            function bound() ***REMOVED***
                var args = boundArgs.concat(slice.call(arguments));
                target.apply(this instanceof bound ? this : thisArg, args);
            ***REMOVED***

            bound.prototype = (function F(proto) ***REMOVED***
                if (proto)
                ***REMOVED***
                    F.prototype = proto;
                ***REMOVED***

                if (!(this instanceof F))
                ***REMOVED***
                    /* jshint supernew: true */
                    return new F;
                ***REMOVED***
            ***REMOVED***)(target.prototype);

            return bound;
        ***REMOVED***;
    ***REMOVED***)();
***REMOVED***

/**
* A polyfill for Array.isArray
*/
if (!Array.isArray)
***REMOVED***
    Array.isArray = function (arg)
    ***REMOVED***
        return Object.prototype.toString.call(arg) === '[object Array]';
    ***REMOVED***;
***REMOVED***

/**
* A polyfill for Array.forEach
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
*/
if (!Array.prototype.forEach)
***REMOVED***
    Array.prototype.forEach = function(fun /*, thisArg */)
    ***REMOVED***
        "use strict";

        if (this === void 0 || this === null)
        ***REMOVED***
            throw new TypeError();
        ***REMOVED***

        var t = Object(this);
        var len = t.length >>> 0;

        if (typeof fun !== "function")
        ***REMOVED***
            throw new TypeError();
        ***REMOVED***

        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;

        for (var i = 0; i < len; i++)
        ***REMOVED***
            if (i in t)
            ***REMOVED***
                fun.call(thisArg, t[i], i, t);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***;
***REMOVED***

/**
* Low-budget Float32Array knock-off, suitable for use with P2.js in IE9
* Source: http://www.html5gamedevs.com/topic/5988-phaser-12-ie9/
* Cameron Foale (http://www.kibibu.com)
*/
if (typeof window.Uint32Array !== "function" && typeof window.Uint32Array !== "object")
***REMOVED***
    var CheapArray = function(type)
    ***REMOVED***
        var proto = new Array(); // jshint ignore:line

        window[type] = function(arg) ***REMOVED***

            if (typeof(arg) === "number")
            ***REMOVED***
                Array.call(this, arg);
                this.length = arg;

                for (var i = 0; i < this.length; i++)
                ***REMOVED***
                    this[i] = 0;
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                Array.call(this, arg.length);

                this.length = arg.length;

                for (var i = 0; i < this.length; i++)
                ***REMOVED***
                    this[i] = arg[i];
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***;

        window[type].prototype = proto;
        window[type].constructor = window[type];
    ***REMOVED***;

    CheapArray('Uint32Array'); // jshint ignore:line
    CheapArray('Int16Array');  // jshint ignore:line
***REMOVED***

/**
 * Also fix for the absent console in IE9
 */
if (!window.console)
***REMOVED***
    window.console = ***REMOVED******REMOVED***;
    window.console.log = window.console.assert = function()***REMOVED******REMOVED***;
    window.console.warn = window.console.assert = function()***REMOVED******REMOVED***;
***REMOVED***
