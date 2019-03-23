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

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Utility functions for dealing with Arrays.
*
* @class Phaser.ArrayUtils
* @static
*/
Phaser.ArrayUtils = ***REMOVED***

    /**
    * Fetch a random entry from the given array.
    *
    * Will return null if there are no array items that fall within the specified range
    * or if there is no item for the randomly chosen index.
    *
    * @method
    * @param ***REMOVED***any[]***REMOVED*** objects - An array of objects.
    * @param ***REMOVED***integer***REMOVED*** startIndex - Optional offset off the front of the array. Default value is 0, or the beginning of the array.
    * @param ***REMOVED***integer***REMOVED*** length - Optional restriction on the number of values you want to randomly select from.
    * @return ***REMOVED***object***REMOVED*** The random object that was selected.
    */
    getRandomItem: function (objects, startIndex, length) ***REMOVED***

        if (objects === null) ***REMOVED*** return null; ***REMOVED***
        if (startIndex === undefined) ***REMOVED*** startIndex = 0; ***REMOVED***
        if (length === undefined) ***REMOVED*** length = objects.length; ***REMOVED***

        var randomIndex = startIndex + Math.floor(Math.random() * length);

        return objects[randomIndex] === undefined ? null : objects[randomIndex];

    ***REMOVED***,

    /**
    * Removes a random object from the given array and returns it.
    *
    * Will return null if there are no array items that fall within the specified range
    * or if there is no item for the randomly chosen index.
    *
    * @method
    * @param ***REMOVED***any[]***REMOVED*** objects - An array of objects.
    * @param ***REMOVED***integer***REMOVED*** startIndex - Optional offset off the front of the array. Default value is 0, or the beginning of the array.
    * @param ***REMOVED***integer***REMOVED*** length - Optional restriction on the number of values you want to randomly select from.
    * @return ***REMOVED***object***REMOVED*** The random object that was removed.
    */
    removeRandomItem: function (objects, startIndex, length) ***REMOVED***

        if (objects == null) ***REMOVED*** // undefined or null
            return null;
        ***REMOVED***

        if (startIndex === undefined) ***REMOVED*** startIndex = 0; ***REMOVED***
        if (length === undefined) ***REMOVED*** length = objects.length; ***REMOVED***

        var randomIndex = startIndex + Math.floor(Math.random() * length);
        if (randomIndex < objects.length)
        ***REMOVED***
            var removed = objects.splice(randomIndex, 1);
            return removed[0] === undefined ? null : removed[0];
        ***REMOVED***
        else
        ***REMOVED***
            return null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * A standard Fisher-Yates Array shuffle implementation which modifies the array in place.
    *
    * @method
    * @param ***REMOVED***any[]***REMOVED*** array - The array to shuffle.
    * @return ***REMOVED***any[]***REMOVED*** The original array, now shuffled.
    */
    shuffle: function (array) ***REMOVED***

        for (var i = array.length - 1; i > 0; i--)
        ***REMOVED***
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        ***REMOVED***

        return array;

    ***REMOVED***,

    /**
    * Transposes the elements of the given matrix (array of arrays).
    *
    * @method
    * @param ***REMOVED***Array<any[]>***REMOVED*** array - The matrix to transpose.
    * @return ***REMOVED***Array<any[]>***REMOVED*** A new transposed matrix
    */
    transposeMatrix: function (array) ***REMOVED***

        var sourceRowCount = array.length;
        var sourceColCount = array[0].length;

        var result = new Array(sourceColCount);

        for (var i = 0; i < sourceColCount; i++)
        ***REMOVED***
            result[i] = new Array(sourceRowCount);

            for (var j = sourceRowCount - 1; j > -1; j--)
            ***REMOVED***
                result[i][j] = array[j][i];
            ***REMOVED***
        ***REMOVED***

        return result;

    ***REMOVED***,

    /**
    * Rotates the given matrix (array of arrays).
    *
    * Based on the routine from ***REMOVED***@link http://jsfiddle.net/MrPolywhirl/NH42z/***REMOVED***.
    *
    * @method
    * @param ***REMOVED***Array<any[]>***REMOVED*** matrix - The array to rotate; this matrix _may_ be altered.
    * @param ***REMOVED***number|string***REMOVED*** direction - The amount to rotate: the rotation in degrees (90, -90, 270, -270, 180) or a string command ('rotateLeft', 'rotateRight' or 'rotate180').
    * @return ***REMOVED***Array<any[]>***REMOVED*** The rotated matrix. The source matrix should be discarded for the returned matrix.
    */
    rotateMatrix: function (matrix, direction) ***REMOVED***

        if (typeof direction !== 'string')
        ***REMOVED***
            direction = ((direction % 360) + 360) % 360;
        ***REMOVED***

        if (direction === 90 || direction === -270 || direction === 'rotateLeft')
        ***REMOVED***
            matrix = Phaser.ArrayUtils.transposeMatrix(matrix);
            matrix = matrix.reverse();
        ***REMOVED***
        else if (direction === -90 || direction === 270 || direction === 'rotateRight')
        ***REMOVED***
            matrix = matrix.reverse();
            matrix = Phaser.ArrayUtils.transposeMatrix(matrix);
        ***REMOVED***
        else if (Math.abs(direction) === 180 || direction === 'rotate180')
        ***REMOVED***
            for (var i = 0; i < matrix.length; i++)
            ***REMOVED***
                matrix[i].reverse();
            ***REMOVED***

            matrix = matrix.reverse();
        ***REMOVED***

        return matrix;

    ***REMOVED***,

    /**
    * Snaps a value to the nearest value in an array.
    * The result will always be in the range `[first_value, last_value]`.
    *
    * @method
    * @param ***REMOVED***number***REMOVED*** value - The search value
    * @param ***REMOVED***number[]***REMOVED*** arr - The input array which _must_ be sorted.
    * @return ***REMOVED***number***REMOVED*** The nearest value found.
    */
    findClosest: function (value, arr) ***REMOVED***

        if (!arr.length)
        ***REMOVED***
            return NaN;
        ***REMOVED***
        else if (arr.length === 1 || value < arr[0])
        ***REMOVED***
            return arr[0];
        ***REMOVED***

        var i = 1;
        while (arr[i] < value) ***REMOVED***
            i++;
        ***REMOVED***

        var low = arr[i - 1];
        var high = (i < arr.length) ? arr[i] : Number.POSITIVE_INFINITY;

        return ((high - value) <= (value - low)) ? high : low;

    ***REMOVED***,

    /**
    * Moves the element from the end of the array to the start, shifting all items in the process.
    * The "rotation" happens to the right.
    *
    * Before: `[ A, B, C, D, E, F ]`
    * After: `[ F, A, B, C, D, E ]`
    * 
    * See also Phaser.ArrayUtils.rotateLeft.
    *
    * @method Phaser.ArrayUtils.rotateRight
    * @param ***REMOVED***any[]***REMOVED*** array - The array to rotate. The array is modified.
    * @return ***REMOVED***any***REMOVED*** The shifted value.
    */
    rotateRight: function (array) ***REMOVED***

        var s = array.pop();
        array.unshift(s);

        return s;

    ***REMOVED***,

    /**
    * Moves the element from the start of the array to the end, shifting all items in the process.
    * The "rotation" happens to the left.
    *
    * Before: `[ A, B, C, D, E, F ]`
    * After: `[ B, C, D, E, F, A ]`
    * 
    * See also Phaser.ArrayUtils.rotateRight
    *
    * @method Phaser.ArrayUtils.rotateLeft
    * @param ***REMOVED***any[]***REMOVED*** array - The array to rotate. The array is modified.
    * @return ***REMOVED***any***REMOVED*** The rotated value.
    */
    rotateLeft: function (array) ***REMOVED***

        var s = array.shift();
        array.push(s);

        return s;

    ***REMOVED***,

    /**
    * Moves the element from the start of the array to the end, shifting all items in the process.
    * The "rotation" happens to the left.
    *
    * Before: `[ A, B, C, D, E, F ]`
    * After: `[ B, C, D, E, F, A ]`
    * 
    * See also Phaser.ArrayUtils.rotateRight
    *
    * @method Phaser.ArrayUtils.rotate
    * @deprecated Please use Phaser.ArrayUtils.rotate instead.
    * @param ***REMOVED***any[]***REMOVED*** array - The array to rotate. The array is modified.
    * @return ***REMOVED***any***REMOVED*** The rotated value.
    */
    rotate: function (array) ***REMOVED***

        var s = array.shift();
        array.push(s);

        return s;

    ***REMOVED***,

    /**
    * Create an array representing the inclusive range of numbers (usually integers) in `[start, end]`.
    * This is equivalent to `numberArrayStep(start, end, 1)`.
    *
    * @method Phaser.ArrayUtils#numberArray
    * @param ***REMOVED***number***REMOVED*** start - The minimum value the array starts with.
    * @param ***REMOVED***number***REMOVED*** end - The maximum value the array contains.
    * @return ***REMOVED***number[]***REMOVED*** The array of number values.
    */
    numberArray: function (start, end) ***REMOVED***

        var result = [];

        for (var i = start; i <= end; i++)
        ***REMOVED***
            result.push(i);
        ***REMOVED***

        return result;

    ***REMOVED***,

    /**
    * Create an array of numbers (positive and/or negative) progressing from `start`
    * up to but not including `end` by advancing by `step`.
    *
    * If `start` is less than `end` a zero-length range is created unless a negative `step` is specified.
    *
    * Certain values for `start` and `end` (eg. NaN/undefined/null) are currently coerced to 0;
    * for forward compatibility make sure to pass in actual numbers.
    *
    * @method Phaser.ArrayUtils#numberArrayStep
    * @param ***REMOVED***number***REMOVED*** start - The start of the range.
    * @param ***REMOVED***number***REMOVED*** [end] - The end of the range.
    * @param ***REMOVED***number***REMOVED*** [step=1] - The value to increment or decrement by.
    * @returns ***REMOVED***Array***REMOVED*** Returns the new array of numbers.
    * @example
    * Phaser.ArrayUtils.numberArrayStep(4);
    * // => [0, 1, 2, 3]
    *
    * Phaser.ArrayUtils.numberArrayStep(1, 5);
    * // => [1, 2, 3, 4]
    *
    * Phaser.ArrayUtils.numberArrayStep(0, 20, 5);
    * // => [0, 5, 10, 15]
    *
    * Phaser.ArrayUtils.numberArrayStep(0, -4, -1);
    * // => [0, -1, -2, -3]
    *
    * Phaser.ArrayUtils.numberArrayStep(1, 4, 0);
    * // => [1, 1, 1]
    *
    * Phaser.ArrayUtils.numberArrayStep(0);
    * // => []
    */
    numberArrayStep: function (start, end, step) ***REMOVED***

        if (start === undefined || start === null) ***REMOVED*** start = 0; ***REMOVED***

        if (end === undefined || end === null)
        ***REMOVED***
            end = start;
            start = 0;
        ***REMOVED***

        if (step === undefined) ***REMOVED*** step = 1; ***REMOVED***

        var result = [];
        var total = Math.max(Phaser.Math.roundAwayFromZero((end - start) / (step || 1)), 0);

        for (var i = 0; i < total; i++)
        ***REMOVED***
            result.push(start);
            start += step;
        ***REMOVED***

        return result;

    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A basic Linked List data structure.
*
* This implementation _modifies_ the `prev` and `next` properties of each item added:
* - The `prev` and `next` properties must be writable and should not be used for any other purpose.
* - Items _cannot_ be added to multiple LinkedLists at the same time.
* - Only objects can be added.
*
* @class Phaser.LinkedList
* @constructor
*/
Phaser.LinkedList = function () ***REMOVED***

    /**
    * Next element in the list.
    * @property ***REMOVED***object***REMOVED*** next
    * @default
    */
    this.next = null;

    /**
    * Previous element in the list.
    * @property ***REMOVED***object***REMOVED*** prev
    * @default
    */
    this.prev = null;

    /**
    * First element in the list.
    * @property ***REMOVED***object***REMOVED*** first
    * @default
    */
    this.first = null;

    /**
    * Last element in the list.
    * @property ***REMOVED***object***REMOVED*** last
    * @default
    */
    this.last = null;

    /**
    * Number of elements in the list.
    * @property ***REMOVED***integer***REMOVED*** total
    * @default
    */
    this.total = 0;

***REMOVED***;

Phaser.LinkedList.prototype = ***REMOVED***

    /**
    * Adds a new element to this linked list.
    *
    * @method Phaser.LinkedList#add
    * @param ***REMOVED***object***REMOVED*** item - The element to add to this list. Can be a Phaser.Sprite or any other object you need to quickly iterate through.
    * @return ***REMOVED***object***REMOVED*** The item that was added.
    */
    add: function (item) ***REMOVED***

        //  If the list is empty
        if (this.total === 0 && this.first === null && this.last === null)
        ***REMOVED***
            this.first = item;
            this.last = item;
            this.next = item;
            item.prev = this;
            this.total++;
            return item;
        ***REMOVED***

        //  Gets appended to the end of the list, regardless of anything, and it won't have any children of its own (non-nested list)
        this.last.next = item;

        item.prev = this.last;

        this.last = item;

        this.total++;

        return item;

    ***REMOVED***,

    /**
    * Resets the first, last, next and previous node pointers in this list.
    *
    * @method Phaser.LinkedList#reset
    */
    reset: function () ***REMOVED***

        this.first = null;
        this.last = null;
        this.next = null;
        this.prev = null;
        this.total = 0;

    ***REMOVED***,

    /**
    * Removes the given element from this linked list if it exists.
    *
    * @method Phaser.LinkedList#remove
    * @param ***REMOVED***object***REMOVED*** item - The item to be removed from the list.
    */
    remove: function (item) ***REMOVED***

        if (this.total === 1)
        ***REMOVED***
            this.reset();
            item.next = item.prev = null;
            return;
        ***REMOVED***

        if (item === this.first)
        ***REMOVED***
            // It was 'first', make 'first' point to first.next
            this.first = this.first.next;
        ***REMOVED***
        else if (item === this.last)
        ***REMOVED***
            // It was 'last', make 'last' point to last.prev
            this.last = this.last.prev;
        ***REMOVED***

        if (item.prev)
        ***REMOVED***
            // make item.prev.next point to childs.next instead of item
            item.prev.next = item.next;
        ***REMOVED***

        if (item.next)
        ***REMOVED***
            // make item.next.prev point to item.prev instead of item
            item.next.prev = item.prev;
        ***REMOVED***

        item.next = item.prev = null;

        if (this.first === null )
        ***REMOVED***
            this.last = null;
        ***REMOVED***

        this.total--;

    ***REMOVED***,

    /**
    * Calls a function on all members of this list, using the member as the context for the callback.
    * The function must exist on the member.
    *
    * @method Phaser.LinkedList#callAll
    * @param ***REMOVED***function***REMOVED*** callback - The function to call.
    */
    callAll: function (callback) ***REMOVED***

        if (!this.first || !this.last)
        ***REMOVED***
            return;
        ***REMOVED***

        var entity = this.first;

        do
        ***REMOVED***
            if (entity && entity[callback])
            ***REMOVED***
                entity[callback].call(entity);
            ***REMOVED***

            entity = entity.next;

        ***REMOVED***
        while (entity !== this.last.next);

    ***REMOVED***

***REMOVED***;

Phaser.LinkedList.prototype.constructor = Phaser.LinkedList;
