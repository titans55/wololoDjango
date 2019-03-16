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
