/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A collection of useful mathematical functions.
*
* These are normally accessed through `game.math`.
*
* @class Phaser.Math
* @static
* @see ***REMOVED***@link Phaser.Utils***REMOVED***
* @see ***REMOVED***@link Phaser.ArrayUtils***REMOVED***
*/
Phaser.Math = ***REMOVED***

    /**
    * Twice PI.
    * @property ***REMOVED***number***REMOVED*** Phaser.Math#PI2
    * @default ~6.283
    */
    PI2: Math.PI * 2,

    /**
    * Returns a number between the `min` and `max` values.
    *
    * @method Phaser.Math#between
    * @param ***REMOVED***number***REMOVED*** min - The minimum value. Must be positive, and less than 'max'.
    * @param ***REMOVED***number***REMOVED*** max - The maximum value. Must be position, and greater than 'min'.
    * @return ***REMOVED***number***REMOVED*** A value between the range min to max.
    */
    between: function (min, max) ***REMOVED***

        return Math.floor(Math.random() * (max - min + 1) + min);

    ***REMOVED***,

    /**
    * Two number are fuzzyEqual if their difference is less than epsilon.
    *
    * @method Phaser.Math#fuzzyEqual
    * @param ***REMOVED***number***REMOVED*** a - The first number to compare.
    * @param ***REMOVED***number***REMOVED*** b - The second number to compare.
    * @param ***REMOVED***number***REMOVED*** [epsilon=0.0001] - The epsilon (a small value used in the calculation)
    * @return ***REMOVED***boolean***REMOVED*** True if |a-b|<epsilon
    */
    fuzzyEqual: function (a, b, epsilon) ***REMOVED***

        if (epsilon === undefined) ***REMOVED*** epsilon = 0.0001; ***REMOVED***

        return Math.abs(a - b) < epsilon;

    ***REMOVED***,

    /**
    * `a` is fuzzyLessThan `b` if it is less than b + epsilon.
    *
    * @method Phaser.Math#fuzzyLessThan
    * @param ***REMOVED***number***REMOVED*** a - The first number to compare.
    * @param ***REMOVED***number***REMOVED*** b - The second number to compare.
    * @param ***REMOVED***number***REMOVED*** [epsilon=0.0001] - The epsilon (a small value used in the calculation)
    * @return ***REMOVED***boolean***REMOVED*** True if a<b+epsilon
    */
    fuzzyLessThan: function (a, b, epsilon) ***REMOVED***

        if (epsilon === undefined) ***REMOVED*** epsilon = 0.0001; ***REMOVED***

        return a < b + epsilon;

    ***REMOVED***,

    /**
    * `a` is fuzzyGreaterThan `b` if it is more than b - epsilon.
    *
    * @method Phaser.Math#fuzzyGreaterThan
    * @param ***REMOVED***number***REMOVED*** a - The first number to compare.
    * @param ***REMOVED***number***REMOVED*** b - The second number to compare.
    * @param ***REMOVED***number***REMOVED*** [epsilon=0.0001] - The epsilon (a small value used in the calculation)
    * @return ***REMOVED***boolean***REMOVED*** True if a>b+epsilon
    */
    fuzzyGreaterThan: function (a, b, epsilon) ***REMOVED***

        if (epsilon === undefined) ***REMOVED*** epsilon = 0.0001; ***REMOVED***

        return a > b - epsilon;

    ***REMOVED***,

    /**
    * Applies a fuzzy ceil to the given value.
    * 
    * @method Phaser.Math#fuzzyCeil
    * @param ***REMOVED***number***REMOVED*** val - The value to ceil.
    * @param ***REMOVED***number***REMOVED*** [epsilon=0.0001] - The epsilon (a small value used in the calculation)
    * @return ***REMOVED***number***REMOVED*** ceiling(val-epsilon)
    */
    fuzzyCeil: function (val, epsilon) ***REMOVED***

        if (epsilon === undefined) ***REMOVED*** epsilon = 0.0001; ***REMOVED***

        return Math.ceil(val - epsilon);

    ***REMOVED***,

    /**
    * Applies a fuzzy floor to the given value.
    * 
    * @method Phaser.Math#fuzzyFloor
    * @param ***REMOVED***number***REMOVED*** val - The value to floor.
    * @param ***REMOVED***number***REMOVED*** [epsilon=0.0001] - The epsilon (a small value used in the calculation)
    * @return ***REMOVED***number***REMOVED*** floor(val+epsilon)
    */
    fuzzyFloor: function (val, epsilon) ***REMOVED***

        if (epsilon === undefined) ***REMOVED*** epsilon = 0.0001; ***REMOVED***

        return Math.floor(val + epsilon);

    ***REMOVED***,

    /**
    * Averages all values passed to the function and returns the result.
    *
    * @method Phaser.Math#average
    * @params ***REMOVED***...number***REMOVED*** The numbers to average
    * @return ***REMOVED***number***REMOVED*** The average of all given values.
    */
    average: function () ***REMOVED***

        var sum = 0;
        var len = arguments.length;

        for (var i = 0; i < len; i++)
        ***REMOVED***
            sum += (+arguments[i]);
        ***REMOVED***

        return sum / len;

    ***REMOVED***,

    /**
    * @method Phaser.Math#shear
    * @param ***REMOVED***number***REMOVED*** n
    * @return ***REMOVED***number***REMOVED*** n mod 1
    */
    shear: function (n) ***REMOVED***

        return n % 1;

    ***REMOVED***,

    /**
    * Snap a value to nearest grid slice, using rounding.
    *
    * Example: if you have an interval gap of 5 and a position of 12... you will snap to 10 whereas 14 will snap to 15.
    *
    * @method Phaser.Math#snapTo
    * @param ***REMOVED***number***REMOVED*** input - The value to snap.
    * @param ***REMOVED***number***REMOVED*** gap - The interval gap of the grid.
    * @param ***REMOVED***number***REMOVED*** [start=0] - Optional starting offset for gap.
    * @return ***REMOVED***number***REMOVED*** The snapped value.
    */
    snapTo: function (input, gap, start) ***REMOVED***

        if (start === undefined) ***REMOVED*** start = 0; ***REMOVED***

        if (gap === 0) ***REMOVED***
            return input;
        ***REMOVED***

        input -= start;
        input = gap * Math.round(input / gap);

        return start + input;

    ***REMOVED***,

    /**
    * Snap a value to nearest grid slice, using floor.
    *
    * Example: if you have an interval gap of 5 and a position of 12... you will snap to 10.
    * As will 14 snap to 10... but 16 will snap to 15.
    *
    * @method Phaser.Math#snapToFloor
    * @param ***REMOVED***number***REMOVED*** input - The value to snap.
    * @param ***REMOVED***number***REMOVED*** gap - The interval gap of the grid.
    * @param ***REMOVED***number***REMOVED*** [start=0] - Optional starting offset for gap.
    * @return ***REMOVED***number***REMOVED*** The snapped value.
    */
    snapToFloor: function (input, gap, start) ***REMOVED***

        if (start === undefined) ***REMOVED*** start = 0; ***REMOVED***

        if (gap === 0) ***REMOVED***
            return input;
        ***REMOVED***

        input -= start;
        input = gap * Math.floor(input / gap);

        return start + input;

    ***REMOVED***,

    /**
    * Snap a value to nearest grid slice, using ceil.
    *
    * Example: if you have an interval gap of 5 and a position of 12... you will snap to 15.
    * As will 14 will snap to 15... but 16 will snap to 20.
    *
    * @method Phaser.Math#snapToCeil
    * @param ***REMOVED***number***REMOVED*** input - The value to snap.
    * @param ***REMOVED***number***REMOVED*** gap - The interval gap of the grid.
    * @param ***REMOVED***number***REMOVED*** [start=0] - Optional starting offset for gap.
    * @return ***REMOVED***number***REMOVED*** The snapped value.
    */
    snapToCeil: function (input, gap, start) ***REMOVED***

        if (start === undefined) ***REMOVED*** start = 0; ***REMOVED***

        if (gap === 0) ***REMOVED***
            return input;
        ***REMOVED***

        input -= start;
        input = gap * Math.ceil(input / gap);

        return start + input;

    ***REMOVED***,

    /**
    * Round to some place comparative to a `base`, default is 10 for decimal place.
    * The `place` is represented by the power applied to `base` to get that place.
    *
    *     e.g. 2000/7 ~= 285.714285714285714285714 ~= (bin)100011101.1011011011011011
    *
    *     roundTo(2000/7,3) === 0
    *     roundTo(2000/7,2) == 300
    *     roundTo(2000/7,1) == 290
    *     roundTo(2000/7,0) == 286
    *     roundTo(2000/7,-1) == 285.7
    *     roundTo(2000/7,-2) == 285.71
    *     roundTo(2000/7,-3) == 285.714
    *     roundTo(2000/7,-4) == 285.7143
    *     roundTo(2000/7,-5) == 285.71429
    *
    *     roundTo(2000/7,3,2)  == 288       -- 100100000
    *     roundTo(2000/7,2,2)  == 284       -- 100011100
    *     roundTo(2000/7,1,2)  == 286       -- 100011110
    *     roundTo(2000/7,0,2)  == 286       -- 100011110
    *     roundTo(2000/7,-1,2) == 285.5     -- 100011101.1
    *     roundTo(2000/7,-2,2) == 285.75    -- 100011101.11
    *     roundTo(2000/7,-3,2) == 285.75    -- 100011101.11
    *     roundTo(2000/7,-4,2) == 285.6875  -- 100011101.1011
    *     roundTo(2000/7,-5,2) == 285.71875 -- 100011101.10111
    *
    * Note what occurs when we round to the 3rd space (8ths place), 100100000, this is to be assumed
    * because we are rounding 100011.1011011011011011 which rounds up.
    *
    * @method Phaser.Math#roundTo
    * @param ***REMOVED***number***REMOVED*** value - The value to round.
    * @param ***REMOVED***number***REMOVED*** [place=0] - The place to round to.
    * @param ***REMOVED***number***REMOVED*** [base=10] - The base to round in. Default is 10 for decimal.
    * @return ***REMOVED***number***REMOVED*** The rounded value.
    */
    roundTo: function (value, place, base) ***REMOVED***

        if (place === undefined) ***REMOVED*** place = 0; ***REMOVED***
        if (base === undefined) ***REMOVED*** base = 10; ***REMOVED***

        var p = Math.pow(base, -place);

        return Math.round(value * p) / p;

    ***REMOVED***,

    /**
    * Floors to some place comparative to a `base`, default is 10 for decimal place.
    * The `place` is represented by the power applied to `base` to get that place.
    * 
    * @method Phaser.Math#floorTo
    * @param ***REMOVED***number***REMOVED*** value - The value to round.
    * @param ***REMOVED***number***REMOVED*** [place=0] - The place to round to.
    * @param ***REMOVED***number***REMOVED*** [base=10] - The base to round in. Default is 10 for decimal.
    * @return ***REMOVED***number***REMOVED*** The rounded value.
    */
    floorTo: function (value, place, base) ***REMOVED***

        if (place === undefined) ***REMOVED*** place = 0; ***REMOVED***
        if (base === undefined) ***REMOVED*** base = 10; ***REMOVED***

        var p = Math.pow(base, -place);

        return Math.floor(value * p) / p;

    ***REMOVED***,

    /**
    * Ceils to some place comparative to a `base`, default is 10 for decimal place.
    * The `place` is represented by the power applied to `base` to get that place.
    * 
    * @method Phaser.Math#ceilTo
    * @param ***REMOVED***number***REMOVED*** value - The value to round.
    * @param ***REMOVED***number***REMOVED*** [place=0] - The place to round to.
    * @param ***REMOVED***number***REMOVED*** [base=10] - The base to round in. Default is 10 for decimal.
    * @return ***REMOVED***number***REMOVED*** The rounded value.
    */
    ceilTo: function (value, place, base) ***REMOVED***

        if (place === undefined) ***REMOVED*** place = 0; ***REMOVED***
        if (base === undefined) ***REMOVED*** base = 10; ***REMOVED***

        var p = Math.pow(base, -place);

        return Math.ceil(value * p) / p;

    ***REMOVED***,

    /**
    * Rotates currentAngle towards targetAngle, taking the shortest rotation distance.
    * The lerp argument is the amount to rotate by in this call.
    * 
    * @method Phaser.Math#rotateToAngle
    * @param ***REMOVED***number***REMOVED*** currentAngle - The current angle, in radians.
    * @param ***REMOVED***number***REMOVED*** targetAngle - The target angle to rotate to, in radians.
    * @param ***REMOVED***number***REMOVED*** [lerp=0.05] - The lerp value to add to the current angle.
    * @return ***REMOVED***number***REMOVED*** The adjusted angle.
    */
    rotateToAngle: function (currentAngle, targetAngle, lerp) ***REMOVED***

        if (lerp === undefined) ***REMOVED*** lerp = 0.05; ***REMOVED***

        if (currentAngle === targetAngle)
        ***REMOVED***
            return currentAngle;
        ***REMOVED***

        if (Math.abs(targetAngle - currentAngle) <= lerp || Math.abs(targetAngle - currentAngle) >= (Phaser.Math.PI2 - lerp))
        ***REMOVED***
            currentAngle = targetAngle;
        ***REMOVED***
        else
        ***REMOVED***
            if (Math.abs(targetAngle - currentAngle) > Math.PI)
            ***REMOVED***
                if (targetAngle < currentAngle)
                ***REMOVED***
                    targetAngle += Phaser.Math.PI2;
                ***REMOVED***
                else
                ***REMOVED***
                    targetAngle -= Phaser.Math.PI2;
                ***REMOVED***
            ***REMOVED***

            if (targetAngle > currentAngle)
            ***REMOVED***
                currentAngle += lerp;
            ***REMOVED***
            else if (targetAngle < currentAngle)
            ***REMOVED***
                currentAngle -= lerp;
            ***REMOVED***
        ***REMOVED***

        return currentAngle;

    ***REMOVED***,

    /**
    * Gets the shortest angle between `angle1` and `angle2`.
    * Both angles must be in the range -180 to 180, which is the same clamped
    * range that `sprite.angle` uses, so you can pass in two sprite angles to
    * this method, and get the shortest angle back between the two of them.
    *
    * The angle returned will be in the same range. If the returned angle is
    * greater than 0 then it's a counter-clockwise rotation, if < 0 then it's
    * a clockwise rotation.
    * 
    * @method Phaser.Math#getShortestAngle
    * @param ***REMOVED***number***REMOVED*** angle1 - The first angle. In the range -180 to 180.
    * @param ***REMOVED***number***REMOVED*** angle2 - The second angle. In the range -180 to 180.
    * @return ***REMOVED***number***REMOVED*** The shortest angle, in degrees. If greater than zero it's a counter-clockwise rotation.
    */
    getShortestAngle: function (angle1, angle2) ***REMOVED***

        var difference = angle2 - angle1;

        if (difference === 0)
        ***REMOVED***
            return 0;
        ***REMOVED***

        var times = Math.floor((difference - (-180)) / 360);

        return difference - (times * 360);

    ***REMOVED***,

    /**
    * Find the angle of a segment from (x1, y1) -> (x2, y2).
    * 
    * @method Phaser.Math#angleBetween
    * @param ***REMOVED***number***REMOVED*** x1 - The x coordinate of the first value.
    * @param ***REMOVED***number***REMOVED*** y1 - The y coordinate of the first value.
    * @param ***REMOVED***number***REMOVED*** x2 - The x coordinate of the second value.
    * @param ***REMOVED***number***REMOVED*** y2 - The y coordinate of the second value.
    * @return ***REMOVED***number***REMOVED*** The angle, in radians.
    */
    angleBetween: function (x1, y1, x2, y2) ***REMOVED***

        return Math.atan2(y2 - y1, x2 - x1);

    ***REMOVED***,

    /**
    * Find the angle of a segment from (x1, y1) -> (x2, y2).
    * 
    * The difference between this method and Math.angleBetween is that this assumes the y coordinate travels
    * down the screen.
    *
    * @method Phaser.Math#angleBetweenY
    * @param ***REMOVED***number***REMOVED*** x1 - The x coordinate of the first value.
    * @param ***REMOVED***number***REMOVED*** y1 - The y coordinate of the first value.
    * @param ***REMOVED***number***REMOVED*** x2 - The x coordinate of the second value.
    * @param ***REMOVED***number***REMOVED*** y2 - The y coordinate of the second value.
    * @return ***REMOVED***number***REMOVED*** The angle, in radians.
    */
    angleBetweenY: function (x1, y1, x2, y2) ***REMOVED***

        return Math.atan2(x2 - x1, y2 - y1);

    ***REMOVED***,

    /**
    * Find the angle of a segment from (point1.x, point1.y) -> (point2.x, point2.y).
    * 
    * @method Phaser.Math#angleBetweenPoints
    * @param ***REMOVED***Phaser.Point***REMOVED*** point1 - The first point.
    * @param ***REMOVED***Phaser.Point***REMOVED*** point2 - The second point.
    * @return ***REMOVED***number***REMOVED*** The angle between the two points, in radians.
    */
    angleBetweenPoints: function (point1, point2) ***REMOVED***

        return Math.atan2(point2.y - point1.y, point2.x - point1.x);

    ***REMOVED***,

    /**
    * Find the angle of a segment from (point1.x, point1.y) -> (point2.x, point2.y).
    * @method Phaser.Math#angleBetweenPointsY
    * @param ***REMOVED***Phaser.Point***REMOVED*** point1
    * @param ***REMOVED***Phaser.Point***REMOVED*** point2
    * @return ***REMOVED***number***REMOVED*** The angle, in radians.
    */
    angleBetweenPointsY: function (point1, point2) ***REMOVED***

        return Math.atan2(point2.x - point1.x, point2.y - point1.y);

    ***REMOVED***,

    /**
    * Reverses an angle.
    * @method Phaser.Math#reverseAngle
    * @param ***REMOVED***number***REMOVED*** angleRad - The angle to reverse, in radians.
    * @return ***REMOVED***number***REMOVED*** The reverse angle, in radians.
    */
    reverseAngle: function (angleRad) ***REMOVED***

        return this.normalizeAngle(angleRad + Math.PI, true);

    ***REMOVED***,

    /**
    * Normalizes an angle to the [0,2pi) range.
    * @method Phaser.Math#normalizeAngle
    * @param ***REMOVED***number***REMOVED*** angleRad - The angle to normalize, in radians.
    * @return ***REMOVED***number***REMOVED*** The angle, fit within the [0,2pi] range, in radians.
    */
    normalizeAngle: function (angleRad) ***REMOVED***

        angleRad = angleRad % (2 * Math.PI);
        return angleRad >= 0 ? angleRad : angleRad + 2 * Math.PI;

    ***REMOVED***,

    /**
    * Adds the given amount to the value, but never lets the value go over the specified maximum.
    *
    * @method Phaser.Math#maxAdd
    * @param ***REMOVED***number***REMOVED*** value - The value to add the amount to.
    * @param ***REMOVED***number***REMOVED*** amount - The amount to add to the value.
    * @param ***REMOVED***number***REMOVED*** max - The maximum the value is allowed to be.
    * @return ***REMOVED***number***REMOVED*** The new value.
    */
    maxAdd: function (value, amount, max) ***REMOVED***

        return Math.min(value + amount, max);

    ***REMOVED***,

    /**
    * Subtracts the given amount from the value, but never lets the value go below the specified minimum.
    *
    * @method Phaser.Math#minSub
    * @param ***REMOVED***number***REMOVED*** value - The base value.
    * @param ***REMOVED***number***REMOVED*** amount - The amount to subtract from the base value.
    * @param ***REMOVED***number***REMOVED*** min - The minimum the value is allowed to be.
    * @return ***REMOVED***number***REMOVED*** The new value.
    */
    minSub: function (value, amount, min) ***REMOVED***

        return Math.max(value - amount, min);

    ***REMOVED***,

    /**
    * Ensures that the value always stays between min and max, by wrapping the value around.
    *
    * If `max` is not larger than `min` the result is 0.
    *
    * @method Phaser.Math#wrap
    * @param ***REMOVED***number***REMOVED*** value - The value to wrap.
    * @param ***REMOVED***number***REMOVED*** min - The minimum the value is allowed to be.
    * @param ***REMOVED***number***REMOVED*** max - The maximum the value is allowed to be, should be larger than `min`.
    * @return ***REMOVED***number***REMOVED*** The wrapped value.
    */
    wrap: function (value, min, max) ***REMOVED***

        var range = max - min;

        if (range <= 0)
        ***REMOVED***
            return 0;
        ***REMOVED***

        var result = (value - min) % range;

        if (result < 0)
        ***REMOVED***
            result += range;
        ***REMOVED***

        return result + min;

    ***REMOVED***,

    /**
    * Adds value to amount and ensures that the result always stays between 0 and max, by wrapping the value around.
    *
    * Values _must_ be positive integers, and are passed through Math.abs. See ***REMOVED***@link Phaser.Math#wrap***REMOVED*** for an alternative.
    *
    * @method Phaser.Math#wrapValue
    * @param ***REMOVED***number***REMOVED*** value - The value to add the amount to.
    * @param ***REMOVED***number***REMOVED*** amount - The amount to add to the value.
    * @param ***REMOVED***number***REMOVED*** max - The maximum the value is allowed to be.
    * @return ***REMOVED***number***REMOVED*** The wrapped value.
    */
    wrapValue: function (value, amount, max) ***REMOVED***

        var diff;
        value = Math.abs(value);
        amount = Math.abs(amount);
        max = Math.abs(max);
        diff = (value + amount) % max;

        return diff;

    ***REMOVED***,

    /**
    * Returns true if the number given is odd.
    *
    * @method Phaser.Math#isOdd
    * @param ***REMOVED***integer***REMOVED*** n - The number to check.
    * @return ***REMOVED***boolean***REMOVED*** True if the given number is odd. False if the given number is even.
    */
    isOdd: function (n) ***REMOVED***

        // Does not work with extremely large values
        return !!(n & 1);

    ***REMOVED***,

    /**
    * Returns true if the number given is even.
    *
    * @method Phaser.Math#isEven
    * @param ***REMOVED***integer***REMOVED*** n - The number to check.
    * @return ***REMOVED***boolean***REMOVED*** True if the given number is even. False if the given number is odd.
    */
    isEven: function (n) ***REMOVED***

        // Does not work with extremely large values
        return !(n & 1);

    ***REMOVED***,

    /**
    * Variation of Math.min that can be passed either an array of numbers or the numbers as parameters.
    *
    * Prefer the standard `Math.min` function when appropriate.
    *
    * @method Phaser.Math#min
    * @return ***REMOVED***number***REMOVED*** The lowest value from those given.
    * @see ***REMOVED***@link http://jsperf.com/math-s-min-max-vs-homemade***REMOVED***
    */
    min: function () ***REMOVED***

        if (arguments.length === 1 && typeof arguments[0] === 'object')
        ***REMOVED***
            var data = arguments[0];
        ***REMOVED***
        else
        ***REMOVED***
            var data = arguments;
        ***REMOVED***

        for (var i = 1, min = 0, len = data.length; i < len; i++)
        ***REMOVED***
            if (data[i] < data[min])
            ***REMOVED***
                min = i;
            ***REMOVED***
        ***REMOVED***

        return data[min];

    ***REMOVED***,

    /**
    * Variation of Math.max that can be passed either an array of numbers or the numbers as parameters.
    *
    * Prefer the standard `Math.max` function when appropriate.
    *
    * @method Phaser.Math#max
    * @return ***REMOVED***number***REMOVED*** The largest value from those given.
    * @see ***REMOVED***@link http://jsperf.com/math-s-min-max-vs-homemade***REMOVED***
    */
    max: function () ***REMOVED***

        if (arguments.length === 1 && typeof arguments[0] === 'object')
        ***REMOVED***
            var data = arguments[0];
        ***REMOVED***
        else
        ***REMOVED***
            var data = arguments;
        ***REMOVED***

        for (var i = 1, max = 0, len = data.length; i < len; i++)
        ***REMOVED***
            if (data[i] > data[max])
            ***REMOVED***
                max = i;
            ***REMOVED***
        ***REMOVED***

        return data[max];

    ***REMOVED***,

    /**
    * Variation of Math.min that can be passed a property and either an array of objects or the objects as parameters.
    * It will find the lowest matching property value from the given objects.
    *
    * @method Phaser.Math#minProperty
    * @return ***REMOVED***number***REMOVED*** The lowest value from those given.
    */
    minProperty: function (property) ***REMOVED***

        if (arguments.length === 2 && typeof arguments[1] === 'object')
        ***REMOVED***
            var data = arguments[1];
        ***REMOVED***
        else
        ***REMOVED***
            var data = arguments.slice(1);
        ***REMOVED***

        for (var i = 1, min = 0, len = data.length; i < len; i++)
        ***REMOVED***
            if (data[i][property] < data[min][property])
            ***REMOVED***
                min = i;
            ***REMOVED***
        ***REMOVED***

        return data[min][property];

    ***REMOVED***,

    /**
    * Variation of Math.max that can be passed a property and either an array of objects or the objects as parameters.
    * It will find the largest matching property value from the given objects.
    *
    * @method Phaser.Math#maxProperty
    * @return ***REMOVED***number***REMOVED*** The largest value from those given.
    */
    maxProperty: function (property) ***REMOVED***

        if (arguments.length === 2 && typeof arguments[1] === 'object')
        ***REMOVED***
            var data = arguments[1];
        ***REMOVED***
        else
        ***REMOVED***
            var data = arguments.slice(1);
        ***REMOVED***

        for (var i = 1, max = 0, len = data.length; i < len; i++)
        ***REMOVED***
            if (data[i][property] > data[max][property])
            ***REMOVED***
                max = i;
            ***REMOVED***
        ***REMOVED***

        return data[max][property];

    ***REMOVED***,

    /**
    * Keeps an angle value between -180 and +180; or -PI and PI if radians.
    *
    * @method Phaser.Math#wrapAngle
    * @param ***REMOVED***number***REMOVED*** angle - The angle value to wrap
    * @param ***REMOVED***boolean***REMOVED*** [radians=false] - Set to `true` if the angle is given in radians, otherwise degrees is expected.
    * @return ***REMOVED***number***REMOVED*** The new angle value; will be the same as the input angle if it was within bounds.
    */
    wrapAngle: function (angle, radians) ***REMOVED***

        return radians ? this.wrap(angle, -Math.PI, Math.PI) : this.wrap(angle, -180, 180);

    ***REMOVED***,

    /**
    * A Linear Interpolation Method, mostly used by Phaser.Tween.
    *
    * @method Phaser.Math#linearInterpolation
    * @param ***REMOVED***Array***REMOVED*** v - The input array of values to interpolate between.
    * @param ***REMOVED***number***REMOVED*** k - The percentage of interpolation, between 0 and 1.
    * @return ***REMOVED***number***REMOVED*** The interpolated value
    */
    linearInterpolation: function (v, k) ***REMOVED***

        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);

        if (k < 0)
        ***REMOVED***
            return this.linear(v[0], v[1], f);
        ***REMOVED***

        if (k > 1)
        ***REMOVED***
            return this.linear(v[m], v[m - 1], m - f);
        ***REMOVED***

        return this.linear(v[i], v[i + 1 > m ? m : i + 1], f - i);

    ***REMOVED***,

    /**
    * A Bezier Interpolation Method, mostly used by Phaser.Tween.
    *
    * @method Phaser.Math#bezierInterpolation
    * @param ***REMOVED***Array***REMOVED*** v - The input array of values to interpolate between.
    * @param ***REMOVED***number***REMOVED*** k - The percentage of interpolation, between 0 and 1.
    * @return ***REMOVED***number***REMOVED*** The interpolated value
    */
    bezierInterpolation: function (v, k) ***REMOVED***

        var b = 0;
        var n = v.length - 1;

        for (var i = 0; i <= n; i++)
        ***REMOVED***
            b += Math.pow(1 - k, n - i) * Math.pow(k, i) * v[i] * this.bernstein(n, i);
        ***REMOVED***

        return b;

    ***REMOVED***,

    /**
    * A Catmull Rom Interpolation Method, mostly used by Phaser.Tween.
    *
    * @method Phaser.Math#catmullRomInterpolation
    * @param ***REMOVED***Array***REMOVED*** v - The input array of values to interpolate between.
    * @param ***REMOVED***number***REMOVED*** k - The percentage of interpolation, between 0 and 1.
    * @return ***REMOVED***number***REMOVED*** The interpolated value
    */
    catmullRomInterpolation: function (v, k) ***REMOVED***

        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);

        if (v[0] === v[m])
        ***REMOVED***
            if (k < 0)
            ***REMOVED***
                i = Math.floor(f = m * (1 + k));
            ***REMOVED***

            return this.catmullRom(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
        ***REMOVED***
        else
        ***REMOVED***
            if (k < 0)
            ***REMOVED***
                return v[0] - (this.catmullRom(v[0], v[0], v[1], v[1], -f) - v[0]);
            ***REMOVED***

            if (k > 1)
            ***REMOVED***
                return v[m] - (this.catmullRom(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
            ***REMOVED***

            return this.catmullRom(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Calculates a linear (interpolation) value over t.
    *
    * @method Phaser.Math#linear
    * @param ***REMOVED***number***REMOVED*** p0
    * @param ***REMOVED***number***REMOVED*** p1
    * @param ***REMOVED***number***REMOVED*** t - A value between 0 and 1.
    * @return ***REMOVED***number***REMOVED***
    */
    linear: function (p0, p1, t) ***REMOVED***

        return (p1 - p0) * t + p0;

    ***REMOVED***,

    /**
    * @method Phaser.Math#bernstein
    * @protected
    * @param ***REMOVED***number***REMOVED*** n
    * @param ***REMOVED***number***REMOVED*** i
    * @return ***REMOVED***number***REMOVED***
    */
    bernstein: function (n, i) ***REMOVED***

        return this.factorial(n) / this.factorial(i) / this.factorial(n - i);

    ***REMOVED***,

    /**
    * @method Phaser.Math#factorial
    * @param ***REMOVED***number***REMOVED*** value - the number you want to evaluate
    * @return ***REMOVED***number***REMOVED***
    */
    factorial: function (value) ***REMOVED***

        if (value === 0)
        ***REMOVED***
            return 1;
        ***REMOVED***

        var res = value;

        while(--value)
        ***REMOVED***
            res *= value;
        ***REMOVED***

        return res;

    ***REMOVED***,

    /**
    * Calculates a catmum rom value.
    *
    * @method Phaser.Math#catmullRom
    * @protected
    * @param ***REMOVED***number***REMOVED*** p0
    * @param ***REMOVED***number***REMOVED*** p1
    * @param ***REMOVED***number***REMOVED*** p2
    * @param ***REMOVED***number***REMOVED*** p3
    * @param ***REMOVED***number***REMOVED*** t
    * @return ***REMOVED***number***REMOVED***
    */
    catmullRom: function (p0, p1, p2, p3, t) ***REMOVED***

        var v0 = (p2 - p0) * 0.5, v1 = (p3 - p1) * 0.5, t2 = t * t, t3 = t * t2;

        return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

    ***REMOVED***,

    /**
    * The absolute difference between two values.
    *
    * @method Phaser.Math#difference
    * @param ***REMOVED***number***REMOVED*** a - The first value to check.
    * @param ***REMOVED***number***REMOVED*** b - The second value to check.
    * @return ***REMOVED***number***REMOVED*** The absolute difference between the two values.
    */
    difference: function (a, b) ***REMOVED***

        return Math.abs(a - b);

    ***REMOVED***,

    /**
    * Round to the next whole number _away_ from zero.
    *
    * @method Phaser.Math#roundAwayFromZero
    * @param ***REMOVED***number***REMOVED*** value - Any number.
    * @return ***REMOVED***integer***REMOVED*** The rounded value of that number.
    */
    roundAwayFromZero: function (value) ***REMOVED***

        // "Opposite" of truncate.
        return (value > 0) ? Math.ceil(value) : Math.floor(value);

    ***REMOVED***,

    /**
    * Generate a sine and cosine table simultaneously and extremely quickly.
    * The parameters allow you to specify the length, amplitude and frequency of the wave.
    * This generator is fast enough to be used in real-time.
    * Code based on research by Franky of scene.at
    *
    * @method Phaser.Math#sinCosGenerator
    * @param ***REMOVED***number***REMOVED*** length - The length of the wave
    * @param ***REMOVED***number***REMOVED*** sinAmplitude - The amplitude to apply to the sine table (default 1.0) if you need values between say -+ 125 then give 125 as the value
    * @param ***REMOVED***number***REMOVED*** cosAmplitude - The amplitude to apply to the cosine table (default 1.0) if you need values between say -+ 125 then give 125 as the value
    * @param ***REMOVED***number***REMOVED*** frequency  - The frequency of the sine and cosine table data
    * @return ***REMOVED******REMOVED***sin:number[], cos:number[]***REMOVED******REMOVED*** Returns the table data.
    */
    sinCosGenerator: function (length, sinAmplitude, cosAmplitude, frequency) ***REMOVED***

        if (sinAmplitude === undefined) ***REMOVED*** sinAmplitude = 1.0; ***REMOVED***
        if (cosAmplitude === undefined) ***REMOVED*** cosAmplitude = 1.0; ***REMOVED***
        if (frequency === undefined) ***REMOVED*** frequency = 1.0; ***REMOVED***

        var sin = sinAmplitude;
        var cos = cosAmplitude;
        var frq = frequency * Math.PI / length;

        var cosTable = [];
        var sinTable = [];

        for (var c = 0; c < length; c++) ***REMOVED***

            cos -= sin * frq;
            sin += cos * frq;

            cosTable[c] = cos;
            sinTable[c] = sin;

        ***REMOVED***

        return ***REMOVED*** sin: sinTable, cos: cosTable, length: length ***REMOVED***;

    ***REMOVED***,

    /**
    * Returns the euclidian distance between the two given set of coordinates.
    *
    * @method Phaser.Math#distance
    * @param ***REMOVED***number***REMOVED*** x1
    * @param ***REMOVED***number***REMOVED*** y1
    * @param ***REMOVED***number***REMOVED*** x2
    * @param ***REMOVED***number***REMOVED*** y2
    * @return ***REMOVED***number***REMOVED*** The distance between the two sets of coordinates.
    */
    distance: function (x1, y1, x2, y2) ***REMOVED***

        var dx = x1 - x2;
        var dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);

    ***REMOVED***,

    /**
    * Returns the euclidean distance squared between the two given set of
    * coordinates (cuts out a square root operation before returning).
    *
    * @method Phaser.Math#distanceSq
    * @param ***REMOVED***number***REMOVED*** x1
    * @param ***REMOVED***number***REMOVED*** y1
    * @param ***REMOVED***number***REMOVED*** x2
    * @param ***REMOVED***number***REMOVED*** y2
    * @return ***REMOVED***number***REMOVED*** The distance squared between the two sets of coordinates.
    */
    distanceSq: function (x1, y1, x2, y2) ***REMOVED***

        var dx = x1 - x2;
        var dy = y1 - y2;

        return dx * dx + dy * dy;

    ***REMOVED***,

    /**
    * Returns the distance between the two given set of coordinates at the power given.
    *
    * @method Phaser.Math#distancePow
    * @param ***REMOVED***number***REMOVED*** x1
    * @param ***REMOVED***number***REMOVED*** y1
    * @param ***REMOVED***number***REMOVED*** x2
    * @param ***REMOVED***number***REMOVED*** y2
    * @param ***REMOVED***number***REMOVED*** [pow=2]
    * @return ***REMOVED***number***REMOVED*** The distance between the two sets of coordinates.
    */
    distancePow: function (x1, y1, x2, y2, pow) ***REMOVED***

        if (pow === undefined) ***REMOVED*** pow = 2; ***REMOVED***

        return Math.sqrt(Math.pow(x2 - x1, pow) + Math.pow(y2 - y1, pow));

    ***REMOVED***,

    /**
    * Force a value within the boundaries by clamping it to the range `min`, `max`.
    *
    * @method Phaser.Math#clamp
    * @param ***REMOVED***float***REMOVED*** v - The value to be clamped.
    * @param ***REMOVED***float***REMOVED*** min - The minimum bounds.
    * @param ***REMOVED***float***REMOVED*** max - The maximum bounds.
    * @return ***REMOVED***number***REMOVED*** The clamped value.
    */
    clamp: function (v, min, max) ***REMOVED***

        if (v < min)
        ***REMOVED***
            return min;
        ***REMOVED***
        else if (max < v)
        ***REMOVED***
            return max;
        ***REMOVED***
        else
        ***REMOVED***
            return v;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Clamp `x` to the range `[a, Infinity)`.
    * Roughly the same as `Math.max(x, a)`, except for NaN handling.
    *
    * @method Phaser.Math#clampBottom
    * @param ***REMOVED***number***REMOVED*** x
    * @param ***REMOVED***number***REMOVED*** a
    * @return ***REMOVED***number***REMOVED***
    */
    clampBottom: function (x, a) ***REMOVED***

        return x < a ? a : x;

    ***REMOVED***,

    /**
    * Checks if two values are within the given tolerance of each other.
    *
    * @method Phaser.Math#within
    * @param ***REMOVED***number***REMOVED*** a - The first number to check
    * @param ***REMOVED***number***REMOVED*** b - The second number to check
    * @param ***REMOVED***number***REMOVED*** tolerance - The tolerance. Anything equal to or less than this is considered within the range.
    * @return ***REMOVED***boolean***REMOVED*** True if a is <= tolerance of b.
    * @see ***REMOVED***@link Phaser.Math.fuzzyEqual***REMOVED***
    */
    within: function (a, b, tolerance) ***REMOVED***

        return (Math.abs(a - b) <= tolerance);

    ***REMOVED***,

    /**
    * Linear mapping from range <a1, a2> to range <b1, b2>
    *
    * @method Phaser.Math#mapLinear
    * @param ***REMOVED***number***REMOVED*** x - The value to map
    * @param ***REMOVED***number***REMOVED*** a1 - First endpoint of the range <a1, a2>
    * @param ***REMOVED***number***REMOVED*** a2 - Final endpoint of the range <a1, a2>
    * @param ***REMOVED***number***REMOVED*** b1 - First endpoint of the range <b1, b2>
    * @param ***REMOVED***number***REMOVED*** b2 - Final endpoint of the range  <b1, b2>
    * @return ***REMOVED***number***REMOVED***
    */
    mapLinear: function (x, a1, a2, b1, b2) ***REMOVED***

        return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

    ***REMOVED***,

    /**
    * Smoothstep function as detailed at http://en.wikipedia.org/wiki/Smoothstep
    *
    * @method Phaser.Math#smoothstep
    * @param ***REMOVED***float***REMOVED*** x - The input value.
    * @param ***REMOVED***float***REMOVED*** min - The left edge. Should be smaller than the right edge.
    * @param ***REMOVED***float***REMOVED*** max - The right edge.
    * @return ***REMOVED***float***REMOVED*** A value between 0 and 1.
    */
    smoothstep: function (x, min, max) ***REMOVED***

        // Scale, bias and saturate x to 0..1 range
        x = Math.max(0, Math.min(1, (x - min) / (max - min)));

        // Evaluate polynomial
        return x * x * (3 - 2 * x);

    ***REMOVED***,

    /**
    * Smootherstep function as detailed at http://en.wikipedia.org/wiki/Smoothstep
    *
    * @method Phaser.Math#smootherstep
    * @param ***REMOVED***float***REMOVED*** x - The input value.
    * @param ***REMOVED***float***REMOVED*** min - The left edge. Should be smaller than the right edge.
    * @param ***REMOVED***float***REMOVED*** max - The right edge.
    * @return ***REMOVED***float***REMOVED*** A value between 0 and 1.
    */
    smootherstep: function (x, min, max) ***REMOVED***

        x = Math.max(0, Math.min(1, (x - min) / (max - min)));

        return x * x * x * (x * (x * 6 - 15) + 10);

    ***REMOVED***,

    /**
    * A value representing the sign of the value: -1 for negative, +1 for positive, 0 if value is 0.
    *
    * This works differently from `Math.sign` for values of NaN and -0, etc.
    *
    * @method Phaser.Math#sign
    * @param ***REMOVED***number***REMOVED*** x
    * @return ***REMOVED***integer***REMOVED*** An integer in ***REMOVED***-1, 0, 1***REMOVED***
    */
    sign: function (x) ***REMOVED***

        return ( x < 0 ) ? -1 : ( ( x > 0 ) ? 1 : 0 );

    ***REMOVED***,

    /**
    * Work out what percentage value `a` is of value `b` using the given base.
    *
    * @method Phaser.Math#percent
    * @param ***REMOVED***number***REMOVED*** a - The value to work out the percentage for.
    * @param ***REMOVED***number***REMOVED*** b - The value you wish to get the percentage of.
    * @param ***REMOVED***number***REMOVED*** [base=0] - The base value.
    * @return ***REMOVED***number***REMOVED*** The percentage a is of b, between 0 and 1.
    */
    percent: function (a, b, base) ***REMOVED***

        if (base === undefined) ***REMOVED*** base = 0; ***REMOVED***

        if (a > b || base > b)
        ***REMOVED***
            return 1;
        ***REMOVED***
        else if (a < base || base > a)
        ***REMOVED***
            return 0;
        ***REMOVED***
        else
        ***REMOVED***
            return (a - base) / b;
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

var degreeToRadiansFactor = Math.PI / 180;
var radianToDegreesFactor = 180 / Math.PI;

/**
* Convert degrees to radians.
*
* @method Phaser.Math#degToRad
* @param ***REMOVED***number***REMOVED*** degrees - Angle in degrees.
* @return ***REMOVED***number***REMOVED*** Angle in radians.
*/
Phaser.Math.degToRad = function degToRad (degrees) ***REMOVED***
    return degrees * degreeToRadiansFactor;
***REMOVED***;

/**
* Convert radians to degrees.
*
* @method Phaser.Math#radToDeg
* @param ***REMOVED***number***REMOVED*** radians - Angle in radians.
* @return ***REMOVED***number***REMOVED*** Angle in degrees
*/
Phaser.Math.radToDeg = function radToDeg (radians) ***REMOVED***
    return radians * radianToDegreesFactor;
***REMOVED***;

/* jshint noempty: false */

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* An extremely useful repeatable random data generator.
*
* Based on Nonsense by Josh Faul https://github.com/jocafa/Nonsense.
*
* The random number genererator is based on the Alea PRNG, but is modified.
*  - https://github.com/coverslide/node-alea
*  - https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
*  - http://baagoe.org/en/wiki/Better_random_numbers_for_javascript (original, perm. 404)
*
* @class Phaser.RandomDataGenerator
* @constructor
* @param ***REMOVED***any[]|string***REMOVED*** [seeds] - An array of values to use as the seed, or a generator state (from ***REMOVED***#state***REMOVED***).
*/
Phaser.RandomDataGenerator = function (seeds) ***REMOVED***

    if (seeds === undefined) ***REMOVED*** seeds = []; ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** c - Internal var.
    * @private
    */
    this.c = 1;

    /**
    * @property ***REMOVED***number***REMOVED*** s0 - Internal var.
    * @private
    */
    this.s0 = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** s1 - Internal var.
    * @private
    */
    this.s1 = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** s2 - Internal var.
    * @private
    */
    this.s2 = 0;

    if (typeof seeds === 'string')
    ***REMOVED***
        this.state(seeds);
    ***REMOVED***
    else
    ***REMOVED***
        this.sow(seeds);
    ***REMOVED***

***REMOVED***;

Phaser.RandomDataGenerator.prototype = ***REMOVED***

    /**
    * Private random helper.
    *
    * @method Phaser.RandomDataGenerator#rnd
    * @private
    * @return ***REMOVED***number***REMOVED***
    */
    rnd: function () ***REMOVED***

        var t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10; // 2^-32

        this.c = t | 0;
        this.s0 = this.s1;
        this.s1 = this.s2;
        this.s2 = t - this.c;

        return this.s2;
    ***REMOVED***,

    /**
    * Reset the seed of the random data generator.
    *
    * _Note_: the seed array is only processed up to the first `undefined` (or `null`) value, should such be present.
    *
    * @method Phaser.RandomDataGenerator#sow
    * @param ***REMOVED***any[]***REMOVED*** seeds - The array of seeds: the `toString()` of each value is used.
    */
    sow: function (seeds) ***REMOVED***

        // Always reset to default seed
        this.s0 = this.hash(' ');
        this.s1 = this.hash(this.s0);
        this.s2 = this.hash(this.s1);
        this.c = 1;

        if (!seeds)
        ***REMOVED***
            return;
        ***REMOVED***

        // Apply any seeds
        for (var i = 0; i < seeds.length && (seeds[i] != null); i++)
        ***REMOVED***
            var seed = seeds[i];

            this.s0 -= this.hash(seed);
            this.s0 += ~~(this.s0 < 0);
            this.s1 -= this.hash(seed);
            this.s1 += ~~(this.s1 < 0);
            this.s2 -= this.hash(seed);
            this.s2 += ~~(this.s2 < 0);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal method that creates a seed hash.
    *
    * @method Phaser.RandomDataGenerator#hash
    * @private
    * @param ***REMOVED***any***REMOVED*** data
    * @return ***REMOVED***number***REMOVED*** hashed value.
    */
    hash: function (data) ***REMOVED***

        var h, i, n;
        n = 0xefc8249d;
        data = data.toString();

        for (i = 0; i < data.length; i++) ***REMOVED***
            n += data.charCodeAt(i);
            h = 0.02519603282416938 * n;
            n = h >>> 0;
            h -= n;
            h *= n;
            n = h >>> 0;
            h -= n;
            n += h * 0x100000000;// 2^32
        ***REMOVED***

        return (n >>> 0) * 2.3283064365386963e-10;// 2^-32

    ***REMOVED***,

    /**
    * Returns a random integer between 0 and 2^32.
    *
    * @method Phaser.RandomDataGenerator#integer
    * @return ***REMOVED***number***REMOVED*** A random integer between 0 and 2^32.
    */
    integer: function() ***REMOVED***

        return this.rnd.apply(this) * 0x100000000;// 2^32

    ***REMOVED***,

    /**
    * Returns a random real number between 0 and 1.
    *
    * @method Phaser.RandomDataGenerator#frac
    * @return ***REMOVED***number***REMOVED*** A random real number between 0 and 1.
    */
    frac: function() ***REMOVED***

        return this.rnd.apply(this) + (this.rnd.apply(this) * 0x200000 | 0) * 1.1102230246251565e-16;   // 2^-53

    ***REMOVED***,

    /**
    * Returns a random real number between 0 and 2^32.
    *
    * @method Phaser.RandomDataGenerator#real
    * @return ***REMOVED***number***REMOVED*** A random real number between 0 and 2^32.
    */
    real: function() ***REMOVED***

        return this.integer() + this.frac();

    ***REMOVED***,

    /**
    * Returns a random integer between and including min and max.
    *
    * @method Phaser.RandomDataGenerator#integerInRange
    * @param ***REMOVED***number***REMOVED*** min - The minimum value in the range.
    * @param ***REMOVED***number***REMOVED*** max - The maximum value in the range.
    * @return ***REMOVED***number***REMOVED*** A random number between min and max.
    */
    integerInRange: function (min, max) ***REMOVED***

        return Math.floor(this.realInRange(0, max - min + 1) + min);

    ***REMOVED***,

    /**
    * Returns a random integer between and including min and max.
    * This method is an alias for RandomDataGenerator.integerInRange.
    *
    * @method Phaser.RandomDataGenerator#between
    * @param ***REMOVED***number***REMOVED*** min - The minimum value in the range.
    * @param ***REMOVED***number***REMOVED*** max - The maximum value in the range.
    * @return ***REMOVED***number***REMOVED*** A random number between min and max.
    */
    between: function (min, max) ***REMOVED***

        return this.integerInRange(min, max);

    ***REMOVED***,

    /**
    * Returns a random real number between min and max.
    *
    * @method Phaser.RandomDataGenerator#realInRange
    * @param ***REMOVED***number***REMOVED*** min - The minimum value in the range.
    * @param ***REMOVED***number***REMOVED*** max - The maximum value in the range.
    * @return ***REMOVED***number***REMOVED*** A random number between min and max.
    */
    realInRange: function (min, max) ***REMOVED***

        return this.frac() * (max - min) + min;

    ***REMOVED***,

    /**
    * Returns a random real number between -1 and 1.
    *
    * @method Phaser.RandomDataGenerator#normal
    * @return ***REMOVED***number***REMOVED*** A random real number between -1 and 1.
    */
    normal: function () ***REMOVED***

        return 1 - 2 * this.frac();

    ***REMOVED***,

    /**
    * Returns a valid RFC4122 version4 ID hex string from https://gist.github.com/1308368
    *
    * @method Phaser.RandomDataGenerator#uuid
    * @return ***REMOVED***string***REMOVED*** A valid RFC4122 version4 ID hex string
    */
    uuid: function () ***REMOVED***

        var a = '';
        var b = '';

        for (b = a = ''; a++ < 36; b +=~a % 5 | a * 3&4 ? (a^15 ? 8^this.frac() * (a^20 ? 16 : 4) : 4).toString(16) : '-')
        ***REMOVED***
        ***REMOVED***

        return b;

    ***REMOVED***,

    /**
    * Returns a random member of `array`.
    *
    * @method Phaser.RandomDataGenerator#pick
    * @param ***REMOVED***Array***REMOVED*** ary - An Array to pick a random member of.
    * @return ***REMOVED***any***REMOVED*** A random member of the array.
    */
    pick: function (ary) ***REMOVED***

        return ary[this.integerInRange(0, ary.length - 1)];

    ***REMOVED***,

    /**
    * Returns a sign to be used with multiplication operator.
    *
    * @method Phaser.RandomDataGenerator#sign
    * @return ***REMOVED***number***REMOVED*** -1 or +1.
    */
    sign: function () ***REMOVED***

        return this.pick([-1, 1]);

    ***REMOVED***,

    /**
    * Returns a random member of `array`, favoring the earlier entries.
    *
    * @method Phaser.RandomDataGenerator#weightedPick
    * @param ***REMOVED***Array***REMOVED*** ary - An Array to pick a random member of.
    * @return ***REMOVED***any***REMOVED*** A random member of the array.
    */
    weightedPick: function (ary) ***REMOVED***

        return ary[~~(Math.pow(this.frac(), 2) * (ary.length - 1) + 0.5)];

    ***REMOVED***,

    /**
    * Returns a random timestamp between min and max, or between the beginning of 2000 and the end of 2020 if min and max aren't specified.
    *
    * @method Phaser.RandomDataGenerator#timestamp
    * @param ***REMOVED***number***REMOVED*** min - The minimum value in the range.
    * @param ***REMOVED***number***REMOVED*** max - The maximum value in the range.
    * @return ***REMOVED***number***REMOVED*** A random timestamp between min and max.
    */
    timestamp: function (min, max) ***REMOVED***

        return this.realInRange(min || 946684800000, max || 1577862000000);

    ***REMOVED***,

    /**
    * Returns a random angle between -180 and 180.
    *
    * @method Phaser.RandomDataGenerator#angle
    * @return ***REMOVED***number***REMOVED*** A random number between -180 and 180.
    */
    angle: function() ***REMOVED***

        return this.integerInRange(-180, 180);

    ***REMOVED***,

    /**
    * Gets or Sets the state of the generator. This allows you to retain the values
    * that the generator is using between games, i.e. in a game save file.
    * 
    * To seed this generator with a previously saved state you can pass it as the 
    * `seed` value in your game config, or call this method directly after Phaser has booted.
    *
    * Call this method with no parameters to return the current state.
    * 
    * If providing a state it should match the same format that this method
    * returns, which is a string with a header `!rnd` followed by the `c`,
    * `s0`, `s1` and `s2` values respectively, each comma-delimited. 
    *
    * @method Phaser.RandomDataGenerator#state
    * @param ***REMOVED***string***REMOVED*** [state] - Generator state to be set.
    * @return ***REMOVED***string***REMOVED*** The current state of the generator.
    */
    state: function (state) ***REMOVED***

        if (typeof state === 'string' && state.match(/^!rnd/))
        ***REMOVED***
            state = state.split(',');

            this.c = parseFloat(state[1]);
            this.s0 = parseFloat(state[2]);
            this.s1 = parseFloat(state[3]);
            this.s2 = parseFloat(state[4]);
        ***REMOVED***

        return ['!rnd', this.c, this.s0, this.s1, this.s2].join(',');

    ***REMOVED***

***REMOVED***;

Phaser.RandomDataGenerator.prototype.constructor = Phaser.RandomDataGenerator;

/**
 * @author       Timo Hausmann
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2016 Photon Storm Ltd.
 * @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
 */

/**
* A QuadTree implementation. The original code was a conversion of the Java code posted to GameDevTuts.
* However I've tweaked it massively to add node indexing, removed lots of temp. var creation and significantly increased performance as a result.
* Original version at https://github.com/timohausmann/quadtree-js/
*
* @class Phaser.QuadTree
* @constructor
* @param ***REMOVED***number***REMOVED*** x - The top left coordinate of the quadtree.
* @param ***REMOVED***number***REMOVED*** y - The top left coordinate of the quadtree.
* @param ***REMOVED***number***REMOVED*** width - The width of the quadtree in pixels.
* @param ***REMOVED***number***REMOVED*** height - The height of the quadtree in pixels.
* @param ***REMOVED***number***REMOVED*** [maxObjects=10] - The maximum number of objects per node.
* @param ***REMOVED***number***REMOVED*** [maxLevels=4] - The maximum number of levels to iterate to.
* @param ***REMOVED***number***REMOVED*** [level=0] - Which level is this?
*/
Phaser.QuadTree = function(x, y, width, height, maxObjects, maxLevels, level) ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** maxObjects - The maximum number of objects per node.
    * @default
    */
    this.maxObjects = 10;

    /**
    * @property ***REMOVED***number***REMOVED*** maxLevels - The maximum number of levels to break down to.
    * @default
    */
    this.maxLevels = 4;

    /**
    * @property ***REMOVED***number***REMOVED*** level - The current level.
    */
    this.level = 0;

    /**
    * @property ***REMOVED***object***REMOVED*** bounds - Object that contains the quadtree bounds.
    */
    this.bounds = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***array***REMOVED*** objects - Array of quadtree children.
    */
    this.objects = [];

    /**
    * @property ***REMOVED***array***REMOVED*** nodes - Array of associated child nodes.
    */
    this.nodes = [];

    /**
    * @property ***REMOVED***array***REMOVED*** _empty - Internal empty array.
    * @private
    */
    this._empty = [];

    this.reset(x, y, width, height, maxObjects, maxLevels, level);

***REMOVED***;

Phaser.QuadTree.prototype = ***REMOVED***

    /**
    * Resets the QuadTree.
    *
    * @method Phaser.QuadTree#reset
    * @param ***REMOVED***number***REMOVED*** x - The top left coordinate of the quadtree.
    * @param ***REMOVED***number***REMOVED*** y - The top left coordinate of the quadtree.
    * @param ***REMOVED***number***REMOVED*** width - The width of the quadtree in pixels.
    * @param ***REMOVED***number***REMOVED*** height - The height of the quadtree in pixels.
    * @param ***REMOVED***number***REMOVED*** [maxObjects=10] - The maximum number of objects per node.
    * @param ***REMOVED***number***REMOVED*** [maxLevels=4] - The maximum number of levels to iterate to.
    * @param ***REMOVED***number***REMOVED*** [level=0] - Which level is this?
    */
    reset: function (x, y, width, height, maxObjects, maxLevels, level) ***REMOVED***

        this.maxObjects = maxObjects || 10;
        this.maxLevels = maxLevels || 4;
        this.level = level || 0;

        this.bounds = ***REMOVED***
            x: Math.round(x),
            y: Math.round(y),
            width: width,
            height: height,
            subWidth: Math.floor(width / 2),
            subHeight: Math.floor(height / 2),
            right: Math.round(x) + Math.floor(width / 2),
            bottom: Math.round(y) + Math.floor(height / 2)
        ***REMOVED***;

        this.objects.length = 0;
        this.nodes.length = 0;

    ***REMOVED***,

    /**
    * Populates this quadtree with the children of the given Group. In order to be added the child must exist and have a body property.
    *
    * @method Phaser.QuadTree#populate
    * @param ***REMOVED***Phaser.Group***REMOVED*** group - The Group to add to the quadtree.
    */
    populate: function (group) ***REMOVED***

        group.forEach(this.populateHandler, this, true);

    ***REMOVED***,

    /**
    * Handler for the populate method.
    *
    * @method Phaser.QuadTree#populateHandler
    * @param ***REMOVED***Phaser.Sprite|object***REMOVED*** sprite - The Sprite to check.
    */
    populateHandler: function (sprite) ***REMOVED***

        if (sprite.body && sprite.exists)
        ***REMOVED***
            this.insert(sprite.body);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Split the node into 4 subnodes
    *
    * @method Phaser.QuadTree#split
    */
    split: function () ***REMOVED***

        //  top right node
        this.nodes[0] = new Phaser.QuadTree(this.bounds.right, this.bounds.y, this.bounds.subWidth, this.bounds.subHeight, this.maxObjects, this.maxLevels, (this.level + 1));

        //  top left node
        this.nodes[1] = new Phaser.QuadTree(this.bounds.x, this.bounds.y, this.bounds.subWidth, this.bounds.subHeight, this.maxObjects, this.maxLevels, (this.level + 1));

        //  bottom left node
        this.nodes[2] = new Phaser.QuadTree(this.bounds.x, this.bounds.bottom, this.bounds.subWidth, this.bounds.subHeight, this.maxObjects, this.maxLevels, (this.level + 1));

        //  bottom right node
        this.nodes[3] = new Phaser.QuadTree(this.bounds.right, this.bounds.bottom, this.bounds.subWidth, this.bounds.subHeight, this.maxObjects, this.maxLevels, (this.level + 1));

    ***REMOVED***,

    /**
    * Insert the object into the node. If the node exceeds the capacity, it will split and add all objects to their corresponding subnodes.
    *
    * @method Phaser.QuadTree#insert
    * @param ***REMOVED***Phaser.Physics.Arcade.Body|object***REMOVED*** body - The Body object to insert into the quadtree. Can be any object so long as it exposes x, y, right and bottom properties.
    */
    insert: function (body) ***REMOVED***

        var i = 0;
        var index;

        //  if we have subnodes ...
        if (this.nodes[0] != null)
        ***REMOVED***
            index = this.getIndex(body);

            if (index !== -1)
            ***REMOVED***
                this.nodes[index].insert(body);
                return;
            ***REMOVED***
        ***REMOVED***

        this.objects.push(body);

        if (this.objects.length > this.maxObjects && this.level < this.maxLevels)
        ***REMOVED***
            //  Split if we don't already have subnodes
            if (this.nodes[0] == null)
            ***REMOVED***
                this.split();
            ***REMOVED***

            //  Add objects to subnodes
            while (i < this.objects.length)
            ***REMOVED***
                index = this.getIndex(this.objects[i]);

                if (index !== -1)
                ***REMOVED***
                    //  this is expensive - see what we can do about it
                    this.nodes[index].insert(this.objects.splice(i, 1)[0]);
                ***REMOVED***
                else
                ***REMOVED***
                    i++;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Determine which node the object belongs to.
    *
    * @method Phaser.QuadTree#getIndex
    * @param ***REMOVED***Phaser.Rectangle|object***REMOVED*** rect - The bounds in which to check.
    * @return ***REMOVED***number***REMOVED*** index - Index of the subnode (0-3), or -1 if rect cannot completely fit within a subnode and is part of the parent node.
    */
    getIndex: function (rect) ***REMOVED***

        //  default is that rect doesn't fit, i.e. it straddles the internal quadrants
        var index = -1;

        if (rect.x < this.bounds.right && rect.right < this.bounds.right)
        ***REMOVED***
            if (rect.y < this.bounds.bottom && rect.bottom < this.bounds.bottom)
            ***REMOVED***
                //  rect fits within the top-left quadrant of this quadtree
                index = 1;
            ***REMOVED***
            else if (rect.y > this.bounds.bottom)
            ***REMOVED***
                //  rect fits within the bottom-left quadrant of this quadtree
                index = 2;
            ***REMOVED***
        ***REMOVED***
        else if (rect.x > this.bounds.right)
        ***REMOVED***
            //  rect can completely fit within the right quadrants
            if (rect.y < this.bounds.bottom && rect.bottom < this.bounds.bottom)
            ***REMOVED***
                //  rect fits within the top-right quadrant of this quadtree
                index = 0;
            ***REMOVED***
            else if (rect.y > this.bounds.bottom)
            ***REMOVED***
                //  rect fits within the bottom-right quadrant of this quadtree
                index = 3;
            ***REMOVED***
        ***REMOVED***

        return index;

    ***REMOVED***,

    /**
    * Return all objects that could collide with the given Sprite or Rectangle.
    *
    * @method Phaser.QuadTree#retrieve
    * @param ***REMOVED***Phaser.Sprite|Phaser.Rectangle***REMOVED*** source - The source object to check the QuadTree against. Either a Sprite or Rectangle.
    * @return ***REMOVED***array***REMOVED*** - Array with all detected objects.
    */
    retrieve: function (source) ***REMOVED***

        if (source instanceof Phaser.Rectangle)
        ***REMOVED***
            var returnObjects = this.objects;

            var index = this.getIndex(source);
        ***REMOVED***
        else
        ***REMOVED***
            if (!source.body)
            ***REMOVED***
                return this._empty;
            ***REMOVED***

            var returnObjects = this.objects;

            var index = this.getIndex(source.body);
        ***REMOVED***

        if (this.nodes[0])
        ***REMOVED***
            //  If rect fits into a subnode ..
            if (index !== -1)
            ***REMOVED***
                returnObjects = returnObjects.concat(this.nodes[index].retrieve(source));
            ***REMOVED***
            else
            ***REMOVED***
                //  If rect does not fit into a subnode, check it against all subnodes (unrolled for speed)
                returnObjects = returnObjects.concat(this.nodes[0].retrieve(source));
                returnObjects = returnObjects.concat(this.nodes[1].retrieve(source));
                returnObjects = returnObjects.concat(this.nodes[2].retrieve(source));
                returnObjects = returnObjects.concat(this.nodes[3].retrieve(source));
            ***REMOVED***
        ***REMOVED***

        return returnObjects;

    ***REMOVED***,

    /**
    * Clear the quadtree.
    * @method Phaser.QuadTree#clear
    */
    clear: function () ***REMOVED***

        this.objects.length = 0;

        var i = this.nodes.length;

        while (i--)
        ***REMOVED***
            this.nodes[i].clear();
            this.nodes.splice(i, 1);
        ***REMOVED***

        this.nodes.length = 0;
    ***REMOVED***

***REMOVED***;

Phaser.QuadTree.prototype.constructor = Phaser.QuadTree;

/**
* Javascript QuadTree
* @version 1.0
*
* @version 1.3, March 11th 2014
* @author Richard Davey
* The original code was a conversion of the Java code posted to GameDevTuts. However I've tweaked
* it massively to add node indexing, removed lots of temp. var creation and significantly
* increased performance as a result.
*
* Original version at https://github.com/timohausmann/quadtree-js/
*/

/**
* @copyright © 2012 Timo Hausmann
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
