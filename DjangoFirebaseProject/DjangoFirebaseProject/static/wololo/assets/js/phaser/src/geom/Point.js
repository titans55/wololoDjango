/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
* The following code creates a point at (0,0):
* `var myPoint = new Phaser.Point();`
* You can also use them as 2D Vectors and you'll find different vector related methods in this class.
* 
* @class Phaser.Point
* @constructor
* @param ***REMOVED***number***REMOVED*** [x=0] - The horizontal position of this Point.
* @param ***REMOVED***number***REMOVED*** [y=0] - The vertical position of this Point.
*/
Phaser.Point = function (x, y) ***REMOVED***

    x = x || 0;
    y = y || 0;

    /**
    * @property ***REMOVED***number***REMOVED*** x - The x value of the point.
    */
    this.x = x;

    /**
    * @property ***REMOVED***number***REMOVED*** y - The y value of the point.
    */
    this.y = y;

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.POINT;

***REMOVED***;

Phaser.Point.prototype = ***REMOVED***

    /**
    * Copies the x and y properties from any given object to this Point.
    *
    * @method Phaser.Point#copyFrom
    * @param ***REMOVED***any***REMOVED*** source - The object to copy from.
    * @return ***REMOVED***Phaser.Point***REMOVED*** This Point object.
    */
    copyFrom: function (source) ***REMOVED***

        return this.setTo(source.x, source.y);

    ***REMOVED***,

    /**
    * Inverts the x and y values of this Point
    *
    * @method Phaser.Point#invert
    * @return ***REMOVED***Phaser.Point***REMOVED*** This Point object.
    */
    invert: function () ***REMOVED***

        return this.setTo(this.y, this.x);

    ***REMOVED***,

    /**
    * Sets the `x` and `y` values of this Point object to the given values.
    * If you omit the `y` value then the `x` value will be applied to both, for example:
    * `Point.setTo(2)` is the same as `Point.setTo(2, 2)`
    *
    * @method Phaser.Point#setTo
    * @param ***REMOVED***number***REMOVED*** x - The horizontal value of this point.
    * @param ***REMOVED***number***REMOVED*** [y] - The vertical value of this point. If not given the x value will be used in its place.
    * @return ***REMOVED***Phaser.Point***REMOVED*** This Point object. Useful for chaining method calls.
    */
    setTo: function (x, y) ***REMOVED***

        this.x = x || 0;
        this.y = y || ( (y !== 0) ? this.x : 0 );

        return this;

    ***REMOVED***,

    /**
    * Sets the `x` and `y` values of this Point object to the given values.
    * If you omit the `y` value then the `x` value will be applied to both, for example:
    * `Point.set(2)` is the same as `Point.set(2, 2)`
    *
    * @method Phaser.Point#set
    * @param ***REMOVED***number***REMOVED*** x - The horizontal value of this point.
    * @param ***REMOVED***number***REMOVED*** [y] - The vertical value of this point. If not given the x value will be used in its place.
    * @return ***REMOVED***Phaser.Point***REMOVED*** This Point object. Useful for chaining method calls.
    */
    set: function (x, y) ***REMOVED***

        this.x = x || 0;
        this.y = y || ( (y !== 0) ? this.x : 0 );

        return this;

    ***REMOVED***,

    /**
    * Adds the given x and y values to this Point.
    *
    * @method Phaser.Point#add
    * @param ***REMOVED***number***REMOVED*** x - The value to add to Point.x.
    * @param ***REMOVED***number***REMOVED*** y - The value to add to Point.y.
    * @return ***REMOVED***Phaser.Point***REMOVED*** This Point object. Useful for chaining method calls.
    */
    add: function (x, y) ***REMOVED***

        this.x += x;
        this.y += y;
        return this;

    ***REMOVED***,

    /**
    * Subtracts the given x and y values from this Point.
    *
    * @method Phaser.Point#subtract
    * @param ***REMOVED***number***REMOVED*** x - The value to subtract from Point.x.
    * @param ***REMOVED***number***REMOVED*** y - The value to subtract from Point.y.
    * @return ***REMOVED***Phaser.Point***REMOVED*** This Point object. Useful for chaining method calls.
    */
    subtract: function (x, y) ***REMOVED***

        this.x -= x;
        this.y -= y;
        return this;

    ***REMOVED***,

    /**
    * Multiplies Point.x and Point.y by the given x and y values. Sometimes known as `Scale`.
    *
    * @method Phaser.Point#multiply
    * @param ***REMOVED***number***REMOVED*** x - The value to multiply Point.x by.
    * @param ***REMOVED***number***REMOVED*** y - The value to multiply Point.x by.
    * @return ***REMOVED***Phaser.Point***REMOVED*** This Point object. Useful for chaining method calls.
    */
    multiply: function (x, y) ***REMOVED***

        this.x *= x;
        this.y *= y;
        return this;

    ***REMOVED***,

    /**
    * Divides Point.x and Point.y by the given x and y values.
    *
    * @method Phaser.Point#divide
    * @param ***REMOVED***number***REMOVED*** x - The value to divide Point.x by.
    * @param ***REMOVED***number***REMOVED*** y - The value to divide Point.x by.
    * @return ***REMOVED***Phaser.Point***REMOVED*** This Point object. Useful for chaining method calls.
    */
    divide: function (x, y) ***REMOVED***

        this.x /= x;
        this.y /= y;
        return this;

    ***REMOVED***,

    /**
    * Clamps the x value of this Point to be between the given min and max.
    *
    * @method Phaser.Point#clampX
    * @param ***REMOVED***number***REMOVED*** min - The minimum value to clamp this Point to.
    * @param ***REMOVED***number***REMOVED*** max - The maximum value to clamp this Point to.
    * @return ***REMOVED***Phaser.Point***REMOVED*** This Point object.
    */
    clampX: function (min, max) ***REMOVED***

        this.x = Phaser.Math.clamp(this.x, min, max);
        return this;

    ***REMOVED***,

    /**
    * Clamps the y value of this Point to be between the given min and max
    *
    * @method Phaser.Point#clampY
    * @param ***REMOVED***number***REMOVED*** min - The minimum value to clamp this Point to.
    * @param ***REMOVED***number***REMOVED*** max - The maximum value to clamp this Point to.
    * @return ***REMOVED***Phaser.Point***REMOVED*** This Point object.
    */
    clampY: function (min, max) ***REMOVED***

        this.y = Phaser.Math.clamp(this.y, min, max);
        return this;

    ***REMOVED***,

    /**
    * Clamps this Point object values to be between the given min and max.
    *
    * @method Phaser.Point#clamp
    * @param ***REMOVED***number***REMOVED*** min - The minimum value to clamp this Point to.
    * @param ***REMOVED***number***REMOVED*** max - The maximum value to clamp this Point to.
    * @return ***REMOVED***Phaser.Point***REMOVED*** This Point object.
    */
    clamp: function (min, max) ***REMOVED***

        this.x = Phaser.Math.clamp(this.x, min, max);
        this.y = Phaser.Math.clamp(this.y, min, max);
        return this;

    ***REMOVED***,

    /**
    * Creates a copy of the given Point.
    *
    * @method Phaser.Point#clone
    * @param ***REMOVED***Phaser.Point***REMOVED*** [output] Optional Point object. If given the values will be set into this object, otherwise a brand new Point object will be created and returned.
    * @return ***REMOVED***Phaser.Point***REMOVED*** The new Point object.
    */
    clone: function (output) ***REMOVED***

        if (output === undefined || output === null)
        ***REMOVED***
            output = new Phaser.Point(this.x, this.y);
        ***REMOVED***
        else
        ***REMOVED***
            output.setTo(this.x, this.y);
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Copies the x and y properties from this Point to any given object.
    *
    * @method Phaser.Point#copyTo
    * @param ***REMOVED***any***REMOVED*** dest - The object to copy to.
    * @return ***REMOVED***object***REMOVED*** The dest object.
    */
    copyTo: function (dest) ***REMOVED***

        dest.x = this.x;
        dest.y = this.y;

        return dest;

    ***REMOVED***,

    /**
    * Returns the distance of this Point object to the given object (can be a Circle, Point or anything with x/y properties)
    *
    * @method Phaser.Point#distance
    * @param ***REMOVED***object***REMOVED*** dest - The target object. Must have visible x and y properties that represent the center of the object.
    * @param ***REMOVED***boolean***REMOVED*** [round] - Round the distance to the nearest integer (default false).
    * @return ***REMOVED***number***REMOVED*** The distance between this Point object and the destination Point object.
    */
    distance: function (dest, round) ***REMOVED***

        return Phaser.Point.distance(this, dest, round);

    ***REMOVED***,

    /**
    * Determines whether the given objects x/y values are equal to this Point object.
    *
    * @method Phaser.Point#equals
    * @param ***REMOVED***Phaser.Point|any***REMOVED*** a - The object to compare with this Point.
    * @return ***REMOVED***boolean***REMOVED*** A value of true if the x and y points are equal, otherwise false.
    */
    equals: function (a) ***REMOVED***

        return (a.x === this.x && a.y === this.y);

    ***REMOVED***,

    /**
    * Returns the angle between this Point object and another object with public x and y properties.
    *
    * @method Phaser.Point#angle
    * @param ***REMOVED***Phaser.Point|any***REMOVED*** a - The object to get the angle from this Point to.
    * @param ***REMOVED***boolean***REMOVED*** [asDegrees=false] - Is the given angle in radians (false) or degrees (true)?
    * @return ***REMOVED***number***REMOVED*** The angle between the two objects.
    */
    angle: function (a, asDegrees) ***REMOVED***

        if (asDegrees === undefined) ***REMOVED*** asDegrees = false; ***REMOVED***

        if (asDegrees)
        ***REMOVED***
            return Phaser.Math.radToDeg(Math.atan2(a.y - this.y, a.x - this.x));
        ***REMOVED***
        else
        ***REMOVED***
            return Math.atan2(a.y - this.y, a.x - this.x);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Rotates this Point around the x/y coordinates given to the desired angle.
    *
    * @method Phaser.Point#rotate
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of the anchor point.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of the anchor point.
    * @param ***REMOVED***number***REMOVED*** angle - The angle in radians (unless asDegrees is true) to rotate the Point to.
    * @param ***REMOVED***boolean***REMOVED*** [asDegrees=false] - Is the given angle in radians (false) or degrees (true)?
    * @param ***REMOVED***number***REMOVED*** [distance] - An optional distance constraint between the Point and the anchor.
    * @return ***REMOVED***Phaser.Point***REMOVED*** The modified point object.
    */
    rotate: function (x, y, angle, asDegrees, distance) ***REMOVED***

        return Phaser.Point.rotate(this, x, y, angle, asDegrees, distance);

    ***REMOVED***,

    /**
    * Calculates the length of the Point object.
    *
    * @method Phaser.Point#getMagnitude
    * @return ***REMOVED***number***REMOVED*** The length of the Point.
    */
    getMagnitude: function () ***REMOVED***

        return Math.sqrt((this.x * this.x) + (this.y * this.y));

    ***REMOVED***,

    /**
    * Calculates the length squared of the Point object.
    *
    * @method Phaser.Point#getMagnitudeSq
    * @return ***REMOVED***number***REMOVED*** The length ^ 2 of the Point.
    */
    getMagnitudeSq: function () ***REMOVED***

        return (this.x * this.x) + (this.y * this.y);

    ***REMOVED***,

    /**
    * Alters the length of the Point without changing the direction.
    *
    * @method Phaser.Point#setMagnitude
    * @param ***REMOVED***number***REMOVED*** magnitude - The desired magnitude of the resulting Point.
    * @return ***REMOVED***Phaser.Point***REMOVED*** This Point object.
    */
    setMagnitude: function (magnitude) ***REMOVED***

        return this.normalize().multiply(magnitude, magnitude);

    ***REMOVED***,

    /**
    * Alters the Point object so that its length is 1, but it retains the same direction.
    *
    * @method Phaser.Point#normalize
    * @return ***REMOVED***Phaser.Point***REMOVED*** This Point object.
    */
    normalize: function () ***REMOVED***

        if (!this.isZero())
        ***REMOVED***
            var m = this.getMagnitude();
            this.x /= m;
            this.y /= m;
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Determine if this point is at 0,0.
    *
    * @method Phaser.Point#isZero
    * @return ***REMOVED***boolean***REMOVED*** True if this Point is 0,0, otherwise false.
    */
    isZero: function () ***REMOVED***

        return (this.x === 0 && this.y === 0);

    ***REMOVED***,

    /**
    * The dot product of this and another Point object.
    * 
    * @method Phaser.Point#dot
    * @param ***REMOVED***Phaser.Point***REMOVED*** a - The Point object to get the dot product combined with this Point.
    * @return ***REMOVED***number***REMOVED*** The result.
    */
    dot: function (a) ***REMOVED***

        return ((this.x * a.x) + (this.y * a.y));

    ***REMOVED***,

    /**
    * The cross product of this and another Point object.
    * 
    * @method Phaser.Point#cross
    * @param ***REMOVED***Phaser.Point***REMOVED*** a - The Point object to get the cross product combined with this Point.
    * @return ***REMOVED***number***REMOVED*** The result.
    */
    cross: function (a) ***REMOVED***

        return ((this.x * a.y) - (this.y * a.x));

    ***REMOVED***,

    /**
    * Make this Point perpendicular (90 degrees rotation)
    * 
    * @method Phaser.Point#perp
    * @return ***REMOVED***Phaser.Point***REMOVED*** This Point object.
    */
    perp: function () ***REMOVED***

        return this.setTo(-this.y, this.x);

    ***REMOVED***,

    /**
    * Make this Point perpendicular (-90 degrees rotation)
    * 
    * @method Phaser.Point#rperp
    * @return ***REMOVED***Phaser.Point***REMOVED*** This Point object.
    */
    rperp: function () ***REMOVED***

        return this.setTo(this.y, -this.x);

    ***REMOVED***,

    /**
    * Right-hand normalize (make unit length) this Point.
    *
    * @method Phaser.Point#normalRightHand
    * @return ***REMOVED***Phaser.Point***REMOVED*** This Point object.
    */
    normalRightHand: function () ***REMOVED***

        return this.setTo(this.y * -1, this.x);

    ***REMOVED***,

    /**
    * Math.floor() both the x and y properties of this Point.
    *
    * @method Phaser.Point#floor
    * @return ***REMOVED***Phaser.Point***REMOVED*** This Point object.
    */
    floor: function () ***REMOVED***

        return this.setTo(Math.floor(this.x), Math.floor(this.y));

    ***REMOVED***,

    /**
    * Math.ceil() both the x and y properties of this Point.
    *
    * @method Phaser.Point#ceil
    * @return ***REMOVED***Phaser.Point***REMOVED*** This Point object.
    */
    ceil: function () ***REMOVED***

        return this.setTo(Math.ceil(this.x), Math.ceil(this.y));

    ***REMOVED***,

    /**
    * Returns a string representation of this object.
    *
    * @method Phaser.Point#toString
    * @return ***REMOVED***string***REMOVED*** A string representation of the instance.
    */
    toString: function () ***REMOVED***

        return '[***REMOVED***Point (x=' + this.x + ' y=' + this.y + ')***REMOVED***]';

    ***REMOVED***

***REMOVED***;

Phaser.Point.prototype.constructor = Phaser.Point;

/**
* Adds the coordinates of two points together to create a new point.
*
* @method Phaser.Point.add
* @param ***REMOVED***Phaser.Point***REMOVED*** a - The first Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** b - The second Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return ***REMOVED***Phaser.Point***REMOVED*** The new Point object.
*/
Phaser.Point.add = function (a, b, out) ***REMOVED***

    if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

    out.x = a.x + b.x;
    out.y = a.y + b.y;

    return out;

***REMOVED***;

/**
* Subtracts the coordinates of two points to create a new point.
*
* @method Phaser.Point.subtract
* @param ***REMOVED***Phaser.Point***REMOVED*** a - The first Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** b - The second Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return ***REMOVED***Phaser.Point***REMOVED*** The new Point object.
*/
Phaser.Point.subtract = function (a, b, out) ***REMOVED***

    if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

    out.x = a.x - b.x;
    out.y = a.y - b.y;

    return out;

***REMOVED***;

/**
* Multiplies the coordinates of two points to create a new point.
*
* @method Phaser.Point.multiply
* @param ***REMOVED***Phaser.Point***REMOVED*** a - The first Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** b - The second Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return ***REMOVED***Phaser.Point***REMOVED*** The new Point object.
*/
Phaser.Point.multiply = function (a, b, out) ***REMOVED***

    if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

    out.x = a.x * b.x;
    out.y = a.y * b.y;

    return out;

***REMOVED***;

/**
* Divides the coordinates of two points to create a new point.
*
* @method Phaser.Point.divide
* @param ***REMOVED***Phaser.Point***REMOVED*** a - The first Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** b - The second Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return ***REMOVED***Phaser.Point***REMOVED*** The new Point object.
*/
Phaser.Point.divide = function (a, b, out) ***REMOVED***

    if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

    out.x = a.x / b.x;
    out.y = a.y / b.y;

    return out;

***REMOVED***;

/**
* Determines whether the two given Point objects are equal. They are considered equal if they have the same x and y values.
*
* @method Phaser.Point.equals
* @param ***REMOVED***Phaser.Point***REMOVED*** a - The first Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** b - The second Point object.
* @return ***REMOVED***boolean***REMOVED*** A value of true if the Points are equal, otherwise false.
*/
Phaser.Point.equals = function (a, b) ***REMOVED***

    return (a.x === b.x && a.y === b.y);

***REMOVED***;

/**
* Returns the angle between two Point objects.
*
* @method Phaser.Point.angle
* @param ***REMOVED***Phaser.Point***REMOVED*** a - The first Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** b - The second Point object.
* @return ***REMOVED***number***REMOVED*** The angle between the two Points.
*/
Phaser.Point.angle = function (a, b) ***REMOVED***

    // return Math.atan2(a.x * b.y - a.y * b.x, a.x * b.x + a.y * b.y);
    return Math.atan2(a.y - b.y, a.x - b.x);

***REMOVED***;

/**
* Creates a negative Point.
*
* @method Phaser.Point.negative
* @param ***REMOVED***Phaser.Point***REMOVED*** a - The first Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return ***REMOVED***Phaser.Point***REMOVED*** The new Point object.
*/
Phaser.Point.negative = function (a, out) ***REMOVED***

    if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

    return out.setTo(-a.x, -a.y);

***REMOVED***;

/**
* Adds two 2D Points together and multiplies the result by the given scalar.
* 
* @method Phaser.Point.multiplyAdd
* @param ***REMOVED***Phaser.Point***REMOVED*** a - The first Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** b - The second Point object.
* @param ***REMOVED***number***REMOVED*** s - The scaling value.
* @param ***REMOVED***Phaser.Point***REMOVED*** [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return ***REMOVED***Phaser.Point***REMOVED*** The new Point object.
*/
Phaser.Point.multiplyAdd = function (a, b, s, out) ***REMOVED***

    if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

    return out.setTo(a.x + b.x * s, a.y + b.y * s);

***REMOVED***;

/**
* Interpolates the two given Points, based on the `f` value (between 0 and 1) and returns a new Point.
* 
* @method Phaser.Point.interpolate
* @param ***REMOVED***Phaser.Point***REMOVED*** a - The first Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** b - The second Point object.
* @param ***REMOVED***number***REMOVED*** f - The level of interpolation between the two points. Indicates where the new point will be, along the line between pt1 and pt2. If f=1, pt1 is returned; if f=0, pt2 is returned.
* @param ***REMOVED***Phaser.Point***REMOVED*** [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return ***REMOVED***Phaser.Point***REMOVED*** The new Point object.
*/
Phaser.Point.interpolate = function (a, b, f, out) ***REMOVED***

    if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

    return out.setTo(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f);

***REMOVED***;

/**
* Return a perpendicular vector (90 degrees rotation)
*
* @method Phaser.Point.perp
* @param ***REMOVED***Phaser.Point***REMOVED*** a - The Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return ***REMOVED***Phaser.Point***REMOVED*** The new Point object.
*/
Phaser.Point.perp = function (a, out) ***REMOVED***

    if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

    return out.setTo(-a.y, a.x);

***REMOVED***;

/**
* Return a perpendicular vector (-90 degrees rotation)
*
* @method Phaser.Point.rperp
* @param ***REMOVED***Phaser.Point***REMOVED*** a - The Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return ***REMOVED***Phaser.Point***REMOVED*** The new Point object.
*/
Phaser.Point.rperp = function (a, out) ***REMOVED***

    if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

    return out.setTo(a.y, -a.x);

***REMOVED***;

/**
* Returns the euclidian distance of this Point object to the given object (can be a Circle, Point or anything with x/y properties).
*
* @method Phaser.Point.distance
* @param ***REMOVED***object***REMOVED*** a - The target object. Must have visible x and y properties that represent the center of the object.
* @param ***REMOVED***object***REMOVED*** b - The target object. Must have visible x and y properties that represent the center of the object.
* @param ***REMOVED***boolean***REMOVED*** [round=false] - Round the distance to the nearest integer.
* @return ***REMOVED***number***REMOVED*** The distance between this Point object and the destination Point object.
*/
Phaser.Point.distance = function (a, b, round) ***REMOVED***

    var distance = Phaser.Math.distance(a.x, a.y, b.x, b.y);
    return round ? Math.round(distance) : distance;

***REMOVED***;

/**
* Project two Points onto another Point.
* 
* @method Phaser.Point.project
* @param ***REMOVED***Phaser.Point***REMOVED*** a - The first Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** b - The second Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return ***REMOVED***Phaser.Point***REMOVED*** The new Point object.
*/
Phaser.Point.project = function (a, b, out) ***REMOVED***

    if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

    var amt = a.dot(b) / b.getMagnitudeSq();

    if (amt !== 0)
    ***REMOVED***
        out.setTo(amt * b.x, amt * b.y);
    ***REMOVED***

    return out;

***REMOVED***;

/**
* Project two Points onto a Point of unit length.
* 
* @method Phaser.Point.projectUnit
* @param ***REMOVED***Phaser.Point***REMOVED*** a - The first Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** b - The second Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return ***REMOVED***Phaser.Point***REMOVED*** The new Point object.
*/
Phaser.Point.projectUnit = function (a, b, out) ***REMOVED***

    if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

    var amt = a.dot(b);

    if (amt !== 0)
    ***REMOVED***
        out.setTo(amt * b.x, amt * b.y);
    ***REMOVED***

    return out;

***REMOVED***;

/**
* Right-hand normalize (make unit length) a Point.
*
* @method Phaser.Point.normalRightHand
* @param ***REMOVED***Phaser.Point***REMOVED*** a - The Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return ***REMOVED***Phaser.Point***REMOVED*** The new Point object.
*/
Phaser.Point.normalRightHand = function (a, out) ***REMOVED***

    if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

    return out.setTo(a.y * -1, a.x);

***REMOVED***;

/**
* Normalize (make unit length) a Point.
*
* @method Phaser.Point.normalize
* @param ***REMOVED***Phaser.Point***REMOVED*** a - The Point object.
* @param ***REMOVED***Phaser.Point***REMOVED*** [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return ***REMOVED***Phaser.Point***REMOVED*** The new Point object.
*/
Phaser.Point.normalize = function (a, out) ***REMOVED***

    if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

    var m = a.getMagnitude();

    if (m !== 0)
    ***REMOVED***
        out.setTo(a.x / m, a.y / m);
    ***REMOVED***

    return out;

***REMOVED***;

/**
* Rotates a Point object, or any object with exposed x/y properties, around the given coordinates by
* the angle specified. If the angle between the point and coordinates was 45 deg and the angle argument
* is 45 deg then the resulting angle will be 90 deg, as the angle argument is added to the current angle.
*
* The distance allows you to specify a distance constraint for the rotation between the point and the 
* coordinates. If none is given the distance between the two is calculated and used.
*
* @method Phaser.Point.rotate
* @param ***REMOVED***Phaser.Point***REMOVED*** a - The Point object to rotate.
* @param ***REMOVED***number***REMOVED*** x - The x coordinate of the anchor point
* @param ***REMOVED***number***REMOVED*** y - The y coordinate of the anchor point
* @param ***REMOVED***number***REMOVED*** angle - The angle in radians (unless asDegrees is true) to rotate the Point by.
* @param ***REMOVED***boolean***REMOVED*** [asDegrees=false] - Is the given angle in radians (false) or degrees (true)?
* @param ***REMOVED***number***REMOVED*** [distance] - An optional distance constraint between the Point and the anchor.
* @return ***REMOVED***Phaser.Point***REMOVED*** The modified point object.
*/
Phaser.Point.rotate = function (a, x, y, angle, asDegrees, distance) ***REMOVED***

    if (asDegrees) ***REMOVED*** angle = Phaser.Math.degToRad(angle); ***REMOVED***

    if (distance === undefined)
    ***REMOVED***
        a.subtract(x, y);

        var s = Math.sin(angle);
        var c = Math.cos(angle);

        var tx = c * a.x - s * a.y;
        var ty = s * a.x + c * a.y;

        a.x = tx + x;
        a.y = ty + y;
    ***REMOVED***
    else
    ***REMOVED***
        var t = angle + Math.atan2(a.y - y, a.x - x);
        a.x = x + distance * Math.cos(t);
        a.y = y + distance * Math.sin(t);
    ***REMOVED***

    return a;

***REMOVED***;

/**
* Calculates centroid (or midpoint) from an array of points. If only one point is provided, that point is returned.
*
* @method Phaser.Point.centroid
* @param ***REMOVED***Phaser.Point[]***REMOVED*** points - The array of one or more points.
* @param ***REMOVED***Phaser.Point***REMOVED*** [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return ***REMOVED***Phaser.Point***REMOVED*** The new Point object.
*/
Phaser.Point.centroid = function (points, out) ***REMOVED***

    if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

    if (Object.prototype.toString.call(points) !== '[object Array]')
    ***REMOVED***
        throw new Error("Phaser.Point. Parameter 'points' must be an array");
    ***REMOVED***

    var pointslength = points.length;

    if (pointslength < 1)
    ***REMOVED***
        throw new Error("Phaser.Point. Parameter 'points' array must not be empty");
    ***REMOVED***

    if (pointslength === 1)
    ***REMOVED***
        out.copyFrom(points[0]);
        return out;
    ***REMOVED***

    for (var i = 0; i < pointslength; i++)
    ***REMOVED***
        Phaser.Point.add(out, points[i], out);
    ***REMOVED***

    out.divide(pointslength, pointslength);

    return out;

***REMOVED***;

/**
* Parses an object for x and/or y properties and returns a new Phaser.Point with matching values.
* If the object doesn't contain those properties a Point with x/y of zero will be returned.
*
* @method Phaser.Point.parse
* @static
* @param ***REMOVED***object***REMOVED*** obj - The object to parse.
* @param ***REMOVED***string***REMOVED*** [xProp='x'] - The property used to set the Point.x value.
* @param ***REMOVED***string***REMOVED*** [yProp='y'] - The property used to set the Point.y value.
* @return ***REMOVED***Phaser.Point***REMOVED*** The new Point object.
*/
Phaser.Point.parse = function(obj, xProp, yProp) ***REMOVED***

    xProp = xProp || 'x';
    yProp = yProp || 'y';

    var point = new Phaser.Point();

    if (obj[xProp])
    ***REMOVED***
        point.x = parseInt(obj[xProp], 10);
    ***REMOVED***

    if (obj[yProp])
    ***REMOVED***
        point.y = parseInt(obj[yProp], 10);
    ***REMOVED***

    return point;

***REMOVED***;

//   Because PIXI uses its own Point, we'll replace it with ours to avoid duplicating code or confusion.
PIXI.Point = Phaser.Point;
