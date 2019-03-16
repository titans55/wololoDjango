/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* @class Phaser.Utils
* @static
*/
Phaser.Utils = ***REMOVED***

    /**
    * Takes the given string and reverses it, returning the reversed string.
    * For example if given the string `Atari 520ST` it would return `TS025 iratA`.
    *
    * @method Phaser.Utils.reverseString
    * @param ***REMOVED***string***REMOVED*** string - The string to be reversed.
    * @return ***REMOVED***string***REMOVED*** The reversed string.
    */
    reverseString: function (string) ***REMOVED***

        return string.split('').reverse().join('');

    ***REMOVED***,

    /**
     * Gets an objects property by string.
     *
     * @method Phaser.Utils.getProperty
     * @param ***REMOVED***object***REMOVED*** obj - The object to traverse.
     * @param ***REMOVED***string***REMOVED*** prop - The property whose value will be returned.
     * @return ***REMOVED*******REMOVED*** the value of the property or null if property isn't found .
     */
    getProperty: function(obj, prop) ***REMOVED***

        var parts = prop.split('.'),
            last = parts.pop(),
            l = parts.length,
            i = 1,
            current = parts[0];

        while (i < l && (obj = obj[current]))
        ***REMOVED***
            current = parts[i];
            i++;
        ***REMOVED***

        if (obj)
        ***REMOVED***
            return obj[last];
        ***REMOVED***
        else
        ***REMOVED***
            return null;
        ***REMOVED***

    ***REMOVED***,

    /**
     * Sets an objects property by string.
     *
     * @method Phaser.Utils.setProperty
     * @param ***REMOVED***object***REMOVED*** obj - The object to traverse
     * @param ***REMOVED***string***REMOVED*** prop - The property whose value will be changed
     * @return ***REMOVED***object***REMOVED*** The object on which the property was set.
     */
    setProperty: function(obj, prop, value) ***REMOVED***

        var parts = prop.split('.'),
            last = parts.pop(),
            l = parts.length,
            i = 1,
            current = parts[0];

        while (i < l && (obj = obj[current]))
        ***REMOVED***
            current = parts[i];
            i++;
        ***REMOVED***

        if (obj)
        ***REMOVED***
            obj[last] = value;
        ***REMOVED***

        return obj;

    ***REMOVED***,

    /**
    * Generate a random bool result based on the chance value.
    *
    * Returns true or false based on the chance value (default 50%). For example if you wanted a player to have a 30% chance
    * of getting a bonus, call chanceRoll(30) - true means the chance passed, false means it failed.
    *
    * @method Phaser.Utils#chanceRoll
    * @param ***REMOVED***number***REMOVED*** chance - The chance of receiving the value. A number between 0 and 100 (effectively 0% to 100%).
    * @return ***REMOVED***boolean***REMOVED*** True if the roll passed, or false otherwise.
    */
    chanceRoll: function (chance) ***REMOVED***
        if (chance === undefined) ***REMOVED*** chance = 50; ***REMOVED***
        return chance > 0 && (Math.random() * 100 <= chance);
    ***REMOVED***,

    /**
    * Choose between one of two values randomly.
    *
    * @method Phaser.Utils#randomChoice
    * @param ***REMOVED***any***REMOVED*** choice1
    * @param ***REMOVED***any***REMOVED*** choice2
    * @return ***REMOVED***any***REMOVED*** The randomly selected choice
    */
    randomChoice: function (choice1, choice2) ***REMOVED***
        return (Math.random() < 0.5) ? choice1 : choice2;
    ***REMOVED***,

    /**
    * Get a unit dimension from a string.
    *
    * @method Phaser.Utils.parseDimension
    * @param ***REMOVED***string|number***REMOVED*** size - The size to parse.
    * @param ***REMOVED***number***REMOVED*** dimension - The window dimension to check.
    * @return ***REMOVED***number***REMOVED*** The parsed dimension.
    */
    parseDimension: function (size, dimension) ***REMOVED***

        var f = 0;
        var px = 0;

        if (typeof size === 'string')
        ***REMOVED***
            //  %?
            if (size.substr(-1) === '%')
            ***REMOVED***
                f = parseInt(size, 10) / 100;

                if (dimension === 0)
                ***REMOVED***
                    px = window.innerWidth * f;
                ***REMOVED***
                else
                ***REMOVED***
                    px = window.innerHeight * f;
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                px = parseInt(size, 10);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            px = size;
        ***REMOVED***

        return px;

    ***REMOVED***,

    /**
    * Takes the given string and pads it out, to the length required, using the character
    * specified. For example if you need a string to be 6 characters long, you can call:
    *
    * `pad('bob', 6, '-', 2)`
    *
    * This would return: `bob---` as it has padded it out to 6 characters, using the `-` on the right.
    *
    * You can also use it to pad numbers (they are always returned as strings):
    * 
    * `pad(512, 6, '0', 1)`
    *
    * Would return: `000512` with the string padded to the left.
    *
    * If you don't specify a direction it'll pad to both sides:
    * 
    * `pad('c64', 7, '*')`
    *
    * Would return: `**c64**`
    *
    * @method Phaser.Utils.pad
    * @param ***REMOVED***string***REMOVED*** str - The target string. `toString()` will be called on the string, which means you can also pass in common data types like numbers.
    * @param ***REMOVED***integer***REMOVED*** [len=0] - The number of characters to be added.
    * @param ***REMOVED***string***REMOVED*** [pad=" "] - The string to pad it out with (defaults to a space).
    * @param ***REMOVED***integer***REMOVED*** [dir=3] - The direction dir = 1 (left), 2 (right), 3 (both).
    * @return ***REMOVED***string***REMOVED*** The padded string.
    */
    pad: function (str, len, pad, dir) ***REMOVED***

        if (len === undefined) ***REMOVED*** var len = 0; ***REMOVED***
        if (pad === undefined) ***REMOVED*** var pad = ' '; ***REMOVED***
        if (dir === undefined) ***REMOVED*** var dir = 3; ***REMOVED***

        str = str.toString();

        var padlen = 0;

        if (len + 1 >= str.length)
        ***REMOVED***
            switch (dir)
            ***REMOVED***
                case 1:
                    str = new Array(len + 1 - str.length).join(pad) + str;
                    break;

                case 3:
                    var right = Math.ceil((padlen = len - str.length) / 2);
                    var left = padlen - right;
                    str = new Array(left+1).join(pad) + str + new Array(right+1).join(pad);
                    break;

                default:
                    str = str + new Array(len + 1 - str.length).join(pad);
                    break;
            ***REMOVED***
        ***REMOVED***

        return str;

    ***REMOVED***,

    /**
    * This is a slightly modified version of jQuery.isPlainObject.
    * A plain object is an object whose internal class property is [object Object].
    * @method Phaser.Utils.isPlainObject
    * @param ***REMOVED***object***REMOVED*** obj - The object to inspect.
    * @return ***REMOVED***boolean***REMOVED*** - true if the object is plain, otherwise false.
    */
    isPlainObject: function (obj) ***REMOVED***

        // Not plain objects:
        // - Any object or value whose internal [[Class]] property is not "[object Object]"
        // - DOM nodes
        // - window
        if (typeof(obj) !== "object" || obj.nodeType || obj === obj.window)
        ***REMOVED***
            return false;
        ***REMOVED***

        // Support: Firefox <20
        // The try/catch suppresses exceptions thrown when attempting to access
        // the "constructor" property of certain host objects, ie. |window.location|
        // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
        try ***REMOVED***
            if (obj.constructor && !(***REMOVED******REMOVED***).hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf"))
            ***REMOVED***
                return false;
            ***REMOVED***
        ***REMOVED*** catch (e) ***REMOVED***
            return false;
        ***REMOVED***

        // If the function hasn't returned already, we're confident that
        // |obj| is a plain object, created by ***REMOVED******REMOVED*** or constructed with new Object
        return true;
    ***REMOVED***,

    /**
    * This is a slightly modified version of http://api.jquery.com/jQuery.extend/
    * 
    * @method Phaser.Utils.extend
    * @param ***REMOVED***boolean***REMOVED*** deep - Perform a deep copy?
    * @param ***REMOVED***object***REMOVED*** target - The target object to copy to.
    * @return ***REMOVED***object***REMOVED*** The extended object.
    */
    extend: function () ***REMOVED***

        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || ***REMOVED******REMOVED***,
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean")
        ***REMOVED***
            deep = target;
            target = arguments[1] || ***REMOVED******REMOVED***;
            // skip the boolean and the target
            i = 2;
        ***REMOVED***

        // extend Phaser if only one argument is passed
        if (length === i)
        ***REMOVED***
            target = this;
            --i;
        ***REMOVED***

        for (; i < length; i++)
        ***REMOVED***
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null)
            ***REMOVED***
                // Extend the base object
                for (name in options)
                ***REMOVED***
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy)
                    ***REMOVED***
                        continue;
                    ***REMOVED***

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (Phaser.Utils.isPlainObject(copy) || (copyIsArray = Array.isArray(copy))))
                    ***REMOVED***
                        if (copyIsArray)
                        ***REMOVED***
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];
                        ***REMOVED***
                        else
                        ***REMOVED***
                            clone = src && Phaser.Utils.isPlainObject(src) ? src : ***REMOVED******REMOVED***;
                        ***REMOVED***

                        // Never move original objects, clone them
                        target[name] = Phaser.Utils.extend(deep, clone, copy);

                    // Don't bring in undefined values
                    ***REMOVED***
                    else if (copy !== undefined)
                    ***REMOVED***
                        target[name] = copy;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        // Return the modified object
        return target;

    ***REMOVED***,

    /**
    * Mixes in an existing mixin object with the target.
    *
    * Values in the mixin that have either `get` or `set` functions are created as properties via `defineProperty`
    * _except_ if they also define a `clone` method - if a clone method is defined that is called instead and
    * the result is assigned directly.
    *
    * @method Phaser.Utils.mixinPrototype
    * @param ***REMOVED***object***REMOVED*** target - The target object to receive the new functions.
    * @param ***REMOVED***object***REMOVED*** mixin - The object to copy the functions from.
    * @param ***REMOVED***boolean***REMOVED*** [replace=false] - If the target object already has a matching function should it be overwritten or not?
    */
    mixinPrototype: function (target, mixin, replace) ***REMOVED***
    
        if (replace === undefined) ***REMOVED*** replace = false; ***REMOVED***

        var mixinKeys = Object.keys(mixin);

        for (var i = 0; i < mixinKeys.length; i++)
        ***REMOVED***
            var key = mixinKeys[i];
            var value = mixin[key];

            if (!replace && (key in target))
            ***REMOVED***
                //  Not overwriting existing property
                continue;
            ***REMOVED***
            else
            ***REMOVED***
                if (value &&
                    (typeof value.get === 'function' || typeof value.set === 'function'))
                ***REMOVED***
                    //  Special case for classes like Phaser.Point which has a 'set' function!
                    if (typeof value.clone === 'function')
                    ***REMOVED***
                        target[key] = value.clone();
                    ***REMOVED***
                    else
                    ***REMOVED***
                        Object.defineProperty(target, key, value);
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    target[key] = value;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Mixes the source object into the destination object, returning the newly modified destination object.
    * Based on original code by @mudcube
    *
    * @method Phaser.Utils.mixin
    * @param ***REMOVED***object***REMOVED*** from - The object to copy (the source object).
    * @param ***REMOVED***object***REMOVED*** to - The object to copy to (the destination object).
    * @return ***REMOVED***object***REMOVED*** The modified destination object.
    */
    mixin: function (from, to) ***REMOVED***

        if (!from || typeof (from) !== "object")
        ***REMOVED***
            return to;
        ***REMOVED***

        for (var key in from)
        ***REMOVED***
            var o = from[key];

            if (o.childNodes || o.cloneNode)
            ***REMOVED***
                continue;
            ***REMOVED***

            var type = typeof (from[key]);

            if (!from[key] || type !== "object")
            ***REMOVED***
                to[key] = from[key];
            ***REMOVED***
            else
            ***REMOVED***
                //  Clone sub-object
                if (typeof (to[key]) === type)
                ***REMOVED***
                    to[key] = Phaser.Utils.mixin(from[key], to[key]);
                ***REMOVED***
                else
                ***REMOVED***
                    to[key] = Phaser.Utils.mixin(from[key], new o.constructor());
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return to;

    ***REMOVED***

***REMOVED***;
