/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* ArraySet is a Set data structure (items must be unique within the set) that also maintains order.
* This allows specific items to be easily added or removed from the Set.
*
* Item equality (and uniqueness) is determined by the behavior of `Array.indexOf`.
*
* This used primarily by the Input subsystem.
*
* @class Phaser.ArraySet
* @constructor
* @param ***REMOVED***any[]***REMOVED*** [list=(new array)] - The backing array: if specified the items in the list _must_ be unique, per `Array.indexOf`, and the ownership of the array _should_ be relinquished to the ArraySet.
*/
Phaser.ArraySet = function (list) ***REMOVED***

    /**
    * Current cursor position as established by `first` and `next`.
    * @property ***REMOVED***integer***REMOVED*** position
    * @default
    */
    this.position = 0;

    /**
    * The backing array.
    * @property ***REMOVED***any[]***REMOVED*** list
    */
    this.list = list || [];

***REMOVED***;

Phaser.ArraySet.prototype = ***REMOVED***

    /**
    * Adds a new element to the end of the list.
    * If the item already exists in the list it is not moved.
    *
    * @method Phaser.ArraySet#add
    * @param ***REMOVED***any***REMOVED*** item - The element to add to this list.
    * @return ***REMOVED***any***REMOVED*** The item that was added.
    */
    add: function (item) ***REMOVED***

        if (!this.exists(item))
        ***REMOVED***
            this.list.push(item);
        ***REMOVED***

        return item;

    ***REMOVED***,

    /**
    * Gets the index of the item in the list, or -1 if it isn't in the list.
    *
    * @method Phaser.ArraySet#getIndex
    * @param ***REMOVED***any***REMOVED*** item - The element to get the list index for.
    * @return ***REMOVED***integer***REMOVED*** The index of the item or -1 if not found.
    */
    getIndex: function (item) ***REMOVED***

        return this.list.indexOf(item);

    ***REMOVED***,

    /**
    * Gets an item from the set based on the property strictly equaling the value given.
    * Returns null if not found.
    *
    * @method Phaser.ArraySet#getByKey
    * @param ***REMOVED***string***REMOVED*** property - The property to check against the value.
    * @param ***REMOVED***any***REMOVED*** value - The value to check if the property strictly equals.
    * @return ***REMOVED***any***REMOVED*** The item that was found, or null if nothing matched.
    */
    getByKey: function (property, value) ***REMOVED***

        var i = this.list.length;

        while (i--)
        ***REMOVED***
            if (this.list[i][property] === value)
            ***REMOVED***
                return this.list[i];
            ***REMOVED***
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Checks for the item within this list.
    *
    * @method Phaser.ArraySet#exists
    * @param ***REMOVED***any***REMOVED*** item - The element to get the list index for.
    * @return ***REMOVED***boolean***REMOVED*** True if the item is found in the list, otherwise false.
    */
    exists: function (item) ***REMOVED***

        return (this.list.indexOf(item) > -1);

    ***REMOVED***,

    /**
    * Removes all the items.
    *
    * @method Phaser.ArraySet#reset
    */
    reset: function () ***REMOVED***

        this.list.length = 0;

    ***REMOVED***,

    /**
    * Removes the given element from this list if it exists.
    *
    * @method Phaser.ArraySet#remove
    * @param ***REMOVED***any***REMOVED*** item - The item to be removed from the list.
    * @return ***REMOVED***any***REMOVED*** item - The item that was removed.
    */
    remove: function (item) ***REMOVED***

        var idx = this.list.indexOf(item);

        if (idx > -1)
        ***REMOVED***
            this.list.splice(idx, 1);
            return item;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets the property `key` to the given value on all members of this list.
    *
    * @method Phaser.ArraySet#setAll
    * @param ***REMOVED***any***REMOVED*** key - The property of the item to set.
    * @param ***REMOVED***any***REMOVED*** value - The value to set the property to.
    */
    setAll: function (key, value) ***REMOVED***

        var i = this.list.length;

        while (i--)
        ***REMOVED***
            if (this.list[i])
            ***REMOVED***
                this.list[i][key] = value;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Calls a function on all members of this list, using the member as the context for the callback.
    *
    * If the `key` property is present it must be a function.
    * The function is invoked using the item as the context.
    *
    * @method Phaser.ArraySet#callAll
    * @param ***REMOVED***string***REMOVED*** key - The name of the property with the function to call.
    * @param ***REMOVED***...****REMOVED*** parameter - Additional parameters that will be passed to the callback.
    */
    callAll: function (key) ***REMOVED***

        var args = Array.prototype.slice.call(arguments, 1);

        var i = this.list.length;

        while (i--)
        ***REMOVED***
            if (this.list[i] && this.list[i][key])
            ***REMOVED***
                this.list[i][key].apply(this.list[i], args);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Removes every member from this ArraySet and optionally destroys it.
    *
    * @method Phaser.ArraySet#removeAll
    * @param ***REMOVED***boolean***REMOVED*** [destroy=false] - Call `destroy` on each member as it's removed from this set.
    */
    removeAll: function (destroy) ***REMOVED***

        if (destroy === undefined) ***REMOVED*** destroy = false; ***REMOVED***

        var i = this.list.length;

        while (i--)
        ***REMOVED***
            if (this.list[i])
            ***REMOVED***
                var item = this.remove(this.list[i]);

                if (destroy)
                ***REMOVED***
                    item.destroy();
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        this.position = 0;
        this.list = [];

    ***REMOVED***

***REMOVED***;

/**
* Number of items in the ArraySet. Same as `list.length`.
*
* @name Phaser.ArraySet#total
* @property ***REMOVED***integer***REMOVED*** total
*/
Object.defineProperty(Phaser.ArraySet.prototype, "total", ***REMOVED***

    get: function () ***REMOVED***
        return this.list.length;
    ***REMOVED***

***REMOVED***);

/**
* Returns the first item and resets the cursor to the start.
*
* @name Phaser.ArraySet#first
* @property ***REMOVED***any***REMOVED*** first
*/
Object.defineProperty(Phaser.ArraySet.prototype, "first", ***REMOVED***

    get: function () ***REMOVED***

        this.position = 0;

        if (this.list.length > 0)
        ***REMOVED***
            return this.list[0];
        ***REMOVED***
        else
        ***REMOVED***
            return null;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* Returns the the next item (based on the cursor) and advances the cursor.
*
* @name Phaser.ArraySet#next
* @property ***REMOVED***any***REMOVED*** next
*/
Object.defineProperty(Phaser.ArraySet.prototype, "next", ***REMOVED***

    get: function () ***REMOVED***

        if (this.position < this.list.length)
        ***REMOVED***
            this.position++;

            return this.list[this.position];
        ***REMOVED***
        else
        ***REMOVED***
            return null;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

Phaser.ArraySet.prototype.constructor = Phaser.ArraySet;
