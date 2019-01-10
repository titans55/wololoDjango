/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Creates a new Circle object with the center coordinate specified by the x and y parameters and the diameter specified by the diameter parameter.
* If you call this function without parameters, a circle with x, y, diameter and radius properties set to 0 is created.
* 
* @class Phaser.Circle
* @constructor
* @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate of the center of the circle.
* @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate of the center of the circle.
* @param ***REMOVED***number***REMOVED*** [diameter=0] - The diameter of the circle.
*/
Phaser.Circle = function (x, y, diameter) ***REMOVED***

    x = x || 0;
    y = y || 0;
    diameter = diameter || 0;

    /**
    * @property ***REMOVED***number***REMOVED*** x - The x coordinate of the center of the circle.
    */
    this.x = x;

    /**
    * @property ***REMOVED***number***REMOVED*** y - The y coordinate of the center of the circle.
    */
    this.y = y;

    /**
    * @property ***REMOVED***number***REMOVED*** _diameter - The diameter of the circle.
    * @private
    */
    this._diameter = diameter;

    /**
   * @property ***REMOVED***number***REMOVED*** _radius - The radius of the circle.
   * @private
   */
    this._radius = 0;

    if (diameter > 0)
    ***REMOVED***
        this._radius = diameter * 0.5;
    ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.CIRCLE;

***REMOVED***;

Phaser.Circle.prototype = ***REMOVED***

    /**
    * The circumference of the circle.
    * 
    * @method Phaser.Circle#circumference
    * @return ***REMOVED***number***REMOVED*** The circumference of the circle.
    */
    circumference: function () ***REMOVED***

        return 2 * (Math.PI * this._radius);

    ***REMOVED***,

    /**
    * Returns a uniformly distributed random point from anywhere within this Circle.
    * 
    * @method Phaser.Circle#random
    * @param ***REMOVED***Phaser.Point|object***REMOVED*** [out] - A Phaser.Point, or any object with public x/y properties, that the values will be set in.
    *     If no object is provided a new Phaser.Point object will be created. In high performance areas avoid this by re-using an existing object.
    * @return ***REMOVED***Phaser.Point***REMOVED*** An object containing the random point in its `x` and `y` properties.
    */
    random: function (out) ***REMOVED***

        if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

        var t = 2 * Math.PI * Math.random();
        var u = Math.random() + Math.random();
        var r = (u > 1) ? 2 - u : u;
        var x = r * Math.cos(t);
        var y = r * Math.sin(t);

        out.x = this.x + (x * this.radius);
        out.y = this.y + (y * this.radius);

        return out;

    ***REMOVED***,

    /**
    * Returns the framing rectangle of the circle as a Phaser.Rectangle object.
    * 
    * @method Phaser.Circle#getBounds
    * @return ***REMOVED***Phaser.Rectangle***REMOVED*** The bounds of the Circle.
    */
    getBounds: function () ***REMOVED***

        return new Phaser.Rectangle(this.x - this.radius, this.y - this.radius, this.diameter, this.diameter);

    ***REMOVED***,

    /**
    * Sets the members of Circle to the specified values.
    * @method Phaser.Circle#setTo
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of the center of the circle.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of the center of the circle.
    * @param ***REMOVED***number***REMOVED*** diameter - The diameter of the circle.
    * @return ***REMOVED***Circle***REMOVED*** This circle object.
    */
    setTo: function (x, y, diameter) ***REMOVED***

        this.x = x;
        this.y = y;
        this._diameter = diameter;
        this._radius = diameter * 0.5;

        return this;

    ***REMOVED***,

    /**
    * Copies the x, y and diameter properties from any given object to this Circle.
    * @method Phaser.Circle#copyFrom
    * @param ***REMOVED***any***REMOVED*** source - The object to copy from.
    * @return ***REMOVED***Circle***REMOVED*** This Circle object.
    */
    copyFrom: function (source) ***REMOVED***

        return this.setTo(source.x, source.y, source.diameter);

    ***REMOVED***,

    /**
    * Copies the x, y and diameter properties from this Circle to any given object.
    * @method Phaser.Circle#copyTo
    * @param ***REMOVED***any***REMOVED*** dest - The object to copy to.
    * @return ***REMOVED***object***REMOVED*** This dest object.
    */
    copyTo: function (dest) ***REMOVED***

        dest.x = this.x;
        dest.y = this.y;
        dest.diameter = this._diameter;

        return dest;

    ***REMOVED***,

    /**
    * Returns the distance from the center of the Circle object to the given object
    * (can be Circle, Point or anything with x/y properties)
    * @method Phaser.Circle#distance
    * @param ***REMOVED***object***REMOVED*** dest - The target object. Must have visible x and y properties that represent the center of the object.
    * @param ***REMOVED***boolean***REMOVED*** [round=false] - Round the distance to the nearest integer.
    * @return ***REMOVED***number***REMOVED*** The distance between this Point object and the destination Point object.
    */
    distance: function (dest, round) ***REMOVED***

        var distance = Phaser.Math.distance(this.x, this.y, dest.x, dest.y);
        return round ? Math.round(distance) : distance;

    ***REMOVED***,

    /**
    * Returns a new Circle object with the same values for the x, y, width, and height properties as this Circle object.
    * @method Phaser.Circle#clone
    * @param ***REMOVED***Phaser.Circle***REMOVED*** output - Optional Circle object. If given the values will be set into the object, otherwise a brand new Circle object will be created and returned.
    * @return ***REMOVED***Phaser.Circle***REMOVED*** The cloned Circle object.
    */
    clone: function (output) ***REMOVED***

        if (output === undefined || output === null)
        ***REMOVED***
            output = new Phaser.Circle(this.x, this.y, this.diameter);
        ***REMOVED***
        else
        ***REMOVED***
            output.setTo(this.x, this.y, this.diameter);
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Return true if the given x/y coordinates are within this Circle object.
    * @method Phaser.Circle#contains
    * @param ***REMOVED***number***REMOVED*** x - The X value of the coordinate to test.
    * @param ***REMOVED***number***REMOVED*** y - The Y value of the coordinate to test.
    * @return ***REMOVED***boolean***REMOVED*** True if the coordinates are within this circle, otherwise false.
    */
    contains: function (x, y) ***REMOVED***

        return Phaser.Circle.contains(this, x, y);

    ***REMOVED***,

    /**
    * Returns a Point object containing the coordinates of a point on the circumference of the Circle based on the given angle.
    * @method Phaser.Circle#circumferencePoint
    * @param ***REMOVED***number***REMOVED*** angle - The angle in radians (unless asDegrees is true) to return the point from.
    * @param ***REMOVED***boolean***REMOVED*** [asDegrees=false] - Is the given angle in radians (false) or degrees (true)?
    * @param ***REMOVED***Phaser.Point***REMOVED*** [out] - An optional Point object to put the result in to. If none specified a new Point object will be created.
    * @return ***REMOVED***Phaser.Point***REMOVED*** The Point object holding the result.
    */
    circumferencePoint: function (angle, asDegrees, out) ***REMOVED***

        return Phaser.Circle.circumferencePoint(this, angle, asDegrees, out);

    ***REMOVED***,

    /**
    * Adjusts the location of the Circle object, as determined by its center coordinate, by the specified amounts.
    * @method Phaser.Circle#offset
    * @param ***REMOVED***number***REMOVED*** dx - Moves the x value of the Circle object by this amount.
    * @param ***REMOVED***number***REMOVED*** dy - Moves the y value of the Circle object by this amount.
    * @return ***REMOVED***Circle***REMOVED*** This Circle object.
    */
    offset: function (dx, dy) ***REMOVED***

        this.x += dx;
        this.y += dy;

        return this;

    ***REMOVED***,

    /**
    * Adjusts the location of the Circle object using a Point object as a parameter. This method is similar to the Circle.offset() method, except that it takes a Point object as a parameter.
    * @method Phaser.Circle#offsetPoint
    * @param ***REMOVED***Point***REMOVED*** point A Point object to use to offset this Circle object (or any valid object with exposed x and y properties).
    * @return ***REMOVED***Circle***REMOVED*** This Circle object.
    */
    offsetPoint: function (point) ***REMOVED***
        return this.offset(point.x, point.y);
    ***REMOVED***,

    /**
    * Returns a string representation of this object.
    * @method Phaser.Circle#toString
    * @return ***REMOVED***string***REMOVED*** a string representation of the instance.
    */
    toString: function () ***REMOVED***
        return "[***REMOVED***Phaser.Circle (x=" + this.x + " y=" + this.y + " diameter=" + this.diameter + " radius=" + this.radius + ")***REMOVED***]";
    ***REMOVED***

***REMOVED***;

Phaser.Circle.prototype.constructor = Phaser.Circle;

/**
* The largest distance between any two points on the circle. The same as the radius * 2.
* 
* @name Phaser.Circle#diameter
* @property ***REMOVED***number***REMOVED*** diameter - Gets or sets the diameter of the circle.
*/
Object.defineProperty(Phaser.Circle.prototype, "diameter", ***REMOVED***

    get: function () ***REMOVED***
        return this._diameter;
    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value > 0)
        ***REMOVED***
            this._diameter = value;
            this._radius = value * 0.5;
        ***REMOVED***
    ***REMOVED***

***REMOVED***);

/**
* The length of a line extending from the center of the circle to any point on the circle itself. The same as half the diameter.
* @name Phaser.Circle#radius
* @property ***REMOVED***number***REMOVED*** radius - Gets or sets the radius of the circle.
*/
Object.defineProperty(Phaser.Circle.prototype, "radius", ***REMOVED***

    get: function () ***REMOVED***
        return this._radius;
    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value > 0)
        ***REMOVED***
            this._radius = value;
            this._diameter = value * 2;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* The x coordinate of the leftmost point of the circle. Changing the left property of a Circle object has no effect on the x and y properties. However it does affect the diameter, whereas changing the x value does not affect the diameter property.
* @name Phaser.Circle#left
* @propety ***REMOVED***number***REMOVED*** left - Gets or sets the value of the leftmost point of the circle.
*/
Object.defineProperty(Phaser.Circle.prototype, "left", ***REMOVED***

    get: function () ***REMOVED***
        return this.x - this._radius;
    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value > this.x)
        ***REMOVED***
            this._radius = 0;
            this._diameter = 0;
        ***REMOVED***
        else
        ***REMOVED***
            this.radius = this.x - value;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* The x coordinate of the rightmost point of the circle. Changing the right property of a Circle object has no effect on the x and y properties. However it does affect the diameter, whereas changing the x value does not affect the diameter property.
* @name Phaser.Circle#right
* @property ***REMOVED***number***REMOVED*** right - Gets or sets the value of the rightmost point of the circle.
*/
Object.defineProperty(Phaser.Circle.prototype, "right", ***REMOVED***

    get: function () ***REMOVED***
        return this.x + this._radius;
    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value < this.x)
        ***REMOVED***
            this._radius = 0;
            this._diameter = 0;
        ***REMOVED***
        else
        ***REMOVED***
            this.radius = value - this.x;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* The sum of the y minus the radius property. Changing the top property of a Circle object has no effect on the x and y properties, but does change the diameter.
* @name Phaser.Circle#top
* @property ***REMOVED***number***REMOVED*** top - Gets or sets the top of the circle.
*/
Object.defineProperty(Phaser.Circle.prototype, "top", ***REMOVED***

    get: function () ***REMOVED***
        return this.y - this._radius;
    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value > this.y)
        ***REMOVED***
            this._radius = 0;
            this._diameter = 0;
        ***REMOVED***
        else
        ***REMOVED***
            this.radius = this.y - value;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* The sum of the y and radius properties. Changing the bottom property of a Circle object has no effect on the x and y properties, but does change the diameter.
* @name Phaser.Circle#bottom
* @property ***REMOVED***number***REMOVED*** bottom - Gets or sets the bottom of the circle.
*/
Object.defineProperty(Phaser.Circle.prototype, "bottom", ***REMOVED***

    get: function () ***REMOVED***
        return this.y + this._radius;
    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value < this.y)
        ***REMOVED***
            this._radius = 0;
            this._diameter = 0;
        ***REMOVED***
        else
        ***REMOVED***
            this.radius = value - this.y;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* The area of this Circle.
* @name Phaser.Circle#area
* @property ***REMOVED***number***REMOVED*** area - The area of this circle.
* @readonly
*/
Object.defineProperty(Phaser.Circle.prototype, "area", ***REMOVED***

    get: function () ***REMOVED***

        if (this._radius > 0)
        ***REMOVED***
            return Math.PI * this._radius * this._radius;
        ***REMOVED***
        else
        ***REMOVED***
            return 0;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* Determines whether or not this Circle object is empty. Will return a value of true if the Circle objects diameter is less than or equal to 0; otherwise false.
* If set to true it will reset all of the Circle objects properties to 0. A Circle object is empty if its diameter is less than or equal to 0.
* @name Phaser.Circle#empty
* @property ***REMOVED***boolean***REMOVED*** empty - Gets or sets the empty state of the circle.
*/
Object.defineProperty(Phaser.Circle.prototype, "empty", ***REMOVED***

    get: function () ***REMOVED***
        return (this._diameter === 0);
    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value === true)
        ***REMOVED***
            this.setTo(0, 0, 0);
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* Return true if the given x/y coordinates are within the Circle object.
* @method Phaser.Circle.contains
* @param ***REMOVED***Phaser.Circle***REMOVED*** a - The Circle to be checked.
* @param ***REMOVED***number***REMOVED*** x - The X value of the coordinate to test.
* @param ***REMOVED***number***REMOVED*** y - The Y value of the coordinate to test.
* @return ***REMOVED***boolean***REMOVED*** True if the coordinates are within this circle, otherwise false.
*/
Phaser.Circle.contains = function (a, x, y) ***REMOVED***

    //  Check if x/y are within the bounds first
    if (a.radius > 0 && x >= a.left && x <= a.right && y >= a.top && y <= a.bottom)
    ***REMOVED***
        var dx = (a.x - x) * (a.x - x);
        var dy = (a.y - y) * (a.y - y);

        return (dx + dy) <= (a.radius * a.radius);
    ***REMOVED***
    else
    ***REMOVED***
        return false;
    ***REMOVED***

***REMOVED***;

/**
* Determines whether the two Circle objects match. This method compares the x, y and diameter properties.
* @method Phaser.Circle.equals
* @param ***REMOVED***Phaser.Circle***REMOVED*** a - The first Circle object.
* @param ***REMOVED***Phaser.Circle***REMOVED*** b - The second Circle object.
* @return ***REMOVED***boolean***REMOVED*** A value of true if the object has exactly the same values for the x, y and diameter properties as this Circle object; otherwise false.
*/
Phaser.Circle.equals = function (a, b) ***REMOVED***

    return (a.x === b.x && a.y === b.y && a.diameter === b.diameter);

***REMOVED***;

/**
* Determines whether the two Circle objects intersect.
* This method checks the radius distances between the two Circle objects to see if they intersect.
* @method Phaser.Circle.intersects
* @param ***REMOVED***Phaser.Circle***REMOVED*** a - The first Circle object.
* @param ***REMOVED***Phaser.Circle***REMOVED*** b - The second Circle object.
* @return ***REMOVED***boolean***REMOVED*** A value of true if the specified object intersects with this Circle object; otherwise false.
*/
Phaser.Circle.intersects = function (a, b) ***REMOVED***

    return (Phaser.Math.distance(a.x, a.y, b.x, b.y) <= (a.radius + b.radius));

***REMOVED***;

/**
* Returns a Point object containing the coordinates of a point on the circumference of the Circle based on the given angle.
* @method Phaser.Circle.circumferencePoint
* @param ***REMOVED***Phaser.Circle***REMOVED*** a - The first Circle object.
* @param ***REMOVED***number***REMOVED*** angle - The angle in radians (unless asDegrees is true) to return the point from.
* @param ***REMOVED***boolean***REMOVED*** [asDegrees=false] - Is the given angle in radians (false) or degrees (true)?
* @param ***REMOVED***Phaser.Point***REMOVED*** [out] - An optional Point object to put the result in to. If none specified a new Point object will be created.
* @return ***REMOVED***Phaser.Point***REMOVED*** The Point object holding the result.
*/
Phaser.Circle.circumferencePoint = function (a, angle, asDegrees, out) ***REMOVED***

    if (asDegrees === undefined) ***REMOVED*** asDegrees = false; ***REMOVED***
    if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

    if (asDegrees === true)
    ***REMOVED***
        angle = Phaser.Math.degToRad(angle);
    ***REMOVED***

    out.x = a.x + a.radius * Math.cos(angle);
    out.y = a.y + a.radius * Math.sin(angle);

    return out;

***REMOVED***;

/**
* Checks if the given Circle and Rectangle objects intersect.
* @method Phaser.Circle.intersectsRectangle
* @param ***REMOVED***Phaser.Circle***REMOVED*** c - The Circle object to test.
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** r - The Rectangle object to test.
* @return ***REMOVED***boolean***REMOVED*** True if the two objects intersect, otherwise false.
*/
Phaser.Circle.intersectsRectangle = function (c, r) ***REMOVED***

    var cx = Math.abs(c.x - r.x - r.halfWidth);
    var xDist = r.halfWidth + c.radius;

    if (cx > xDist)
    ***REMOVED***
        return false;
    ***REMOVED***

    var cy = Math.abs(c.y - r.y - r.halfHeight);
    var yDist = r.halfHeight + c.radius;

    if (cy > yDist)
    ***REMOVED***
        return false;
    ***REMOVED***

    if (cx <= r.halfWidth || cy <= r.halfHeight)
    ***REMOVED***
        return true;
    ***REMOVED***

    var xCornerDist = cx - r.halfWidth;
    var yCornerDist = cy - r.halfHeight;
    var xCornerDistSq = xCornerDist * xCornerDist;
    var yCornerDistSq = yCornerDist * yCornerDist;
    var maxCornerDistSq = c.radius * c.radius;

    return xCornerDistSq + yCornerDistSq <= maxCornerDistSq;

***REMOVED***;

//   Because PIXI uses its own Circle, we'll replace it with ours to avoid duplicating code or confusion.
PIXI.Circle = Phaser.Circle;
