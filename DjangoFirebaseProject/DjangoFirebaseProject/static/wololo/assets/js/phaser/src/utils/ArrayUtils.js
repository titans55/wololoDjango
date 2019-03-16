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
