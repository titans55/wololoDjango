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

/**
* @author       Richard Davey <rich@photonstorm.com>
* @author       Chad Engler <chad@pantherdev.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Creates a Ellipse object. A curve on a plane surrounding two focal points.
* 
* @class Phaser.Ellipse
* @constructor
* @param ***REMOVED***number***REMOVED*** [x=0] - The X coordinate of the upper-left corner of the framing rectangle of this ellipse.
* @param ***REMOVED***number***REMOVED*** [y=0] - The Y coordinate of the upper-left corner of the framing rectangle of this ellipse.
* @param ***REMOVED***number***REMOVED*** [width=0] - The overall width of this ellipse.
* @param ***REMOVED***number***REMOVED*** [height=0] - The overall height of this ellipse.
*/
Phaser.Ellipse = function (x, y, width, height) ***REMOVED***

    x = x || 0;
    y = y || 0;
    width = width || 0;
    height = height || 0;

    /**
    * @property ***REMOVED***number***REMOVED*** x - The X coordinate of the upper-left corner of the framing rectangle of this ellipse.
    */
    this.x = x;

    /**
    * @property ***REMOVED***number***REMOVED*** y - The Y coordinate of the upper-left corner of the framing rectangle of this ellipse.
    */
    this.y = y;

    /**
    * @property ***REMOVED***number***REMOVED*** width - The overall width of this ellipse.
    */
    this.width = width;

    /**
    * @property ***REMOVED***number***REMOVED*** height - The overall height of this ellipse.
    */
    this.height = height;

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.ELLIPSE;

***REMOVED***;

Phaser.Ellipse.prototype = ***REMOVED***

    /**
    * Sets the members of the Ellipse to the specified values.
    * @method Phaser.Ellipse#setTo
    * @param ***REMOVED***number***REMOVED*** x - The X coordinate of the upper-left corner of the framing rectangle of this ellipse.
    * @param ***REMOVED***number***REMOVED*** y - The Y coordinate of the upper-left corner of the framing rectangle of this ellipse.
    * @param ***REMOVED***number***REMOVED*** width - The overall width of this ellipse.
    * @param ***REMOVED***number***REMOVED*** height - The overall height of this ellipse.
    * @return ***REMOVED***Phaser.Ellipse***REMOVED*** This Ellipse object.
    */
    setTo: function (x, y, width, height) ***REMOVED***

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        return this;

    ***REMOVED***,

    /**
    * Returns the framing rectangle of the ellipse as a Phaser.Rectangle object.
    * 
    * @method Phaser.Ellipse#getBounds
    * @return ***REMOVED***Phaser.Rectangle***REMOVED*** The bounds of the Ellipse.
    */
    getBounds: function () ***REMOVED***

        return new Phaser.Rectangle(this.x - this.width, this.y - this.height, this.width, this.height);

    ***REMOVED***,

    /**
    * Copies the x, y, width and height properties from any given object to this Ellipse.
    * 
    * @method Phaser.Ellipse#copyFrom
    * @param ***REMOVED***any***REMOVED*** source - The object to copy from.
    * @return ***REMOVED***Phaser.Ellipse***REMOVED*** This Ellipse object.
    */
    copyFrom: function (source) ***REMOVED***

        return this.setTo(source.x, source.y, source.width, source.height);

    ***REMOVED***,

    /**
    * Copies the x, y, width and height properties from this Ellipse to any given object.
    * @method Phaser.Ellipse#copyTo
    * @param ***REMOVED***any***REMOVED*** dest - The object to copy to.
    * @return ***REMOVED***object***REMOVED*** This dest object.
    */
    copyTo: function(dest) ***REMOVED***

        dest.x = this.x;
        dest.y = this.y;
        dest.width = this.width;
        dest.height = this.height;

        return dest;

    ***REMOVED***,

    /**
    * Returns a new Ellipse object with the same values for the x, y, width, and height properties as this Ellipse object.
    * @method Phaser.Ellipse#clone
    * @param ***REMOVED***Phaser.Ellipse***REMOVED*** output - Optional Ellipse object. If given the values will be set into the object, otherwise a brand new Ellipse object will be created and returned.
    * @return ***REMOVED***Phaser.Ellipse***REMOVED*** The cloned Ellipse object.
    */
    clone: function(output) ***REMOVED***

        if (output === undefined || output === null)
        ***REMOVED***
            output = new Phaser.Ellipse(this.x, this.y, this.width, this.height);
        ***REMOVED***
        else
        ***REMOVED***
            output.setTo(this.x, this.y, this.width, this.height);
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Return true if the given x/y coordinates are within this Ellipse object.
    * 
    * @method Phaser.Ellipse#contains
    * @param ***REMOVED***number***REMOVED*** x - The X value of the coordinate to test.
    * @param ***REMOVED***number***REMOVED*** y - The Y value of the coordinate to test.
    * @return ***REMOVED***boolean***REMOVED*** True if the coordinates are within this ellipse, otherwise false.
    */
    contains: function (x, y) ***REMOVED***

        return Phaser.Ellipse.contains(this, x, y);

    ***REMOVED***,

    /**
    * Returns a uniformly distributed random point from anywhere within this Ellipse.
    * 
    * @method Phaser.Ellipse#random
    * @param ***REMOVED***Phaser.Point|object***REMOVED*** [out] - A Phaser.Point, or any object with public x/y properties, that the values will be set in.
    *     If no object is provided a new Phaser.Point object will be created. In high performance areas avoid this by re-using an existing object.
    * @return ***REMOVED***Phaser.Point***REMOVED*** An object containing the random point in its `x` and `y` properties.
    */
    random: function (out) ***REMOVED***

        if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

        var p = Math.random() * Math.PI * 2;
        var r = Math.random();

        out.x = Math.sqrt(r) * Math.cos(p);
        out.y = Math.sqrt(r) * Math.sin(p);

        out.x = this.x + (out.x * this.width / 2.0);
        out.y = this.y + (out.y * this.height / 2.0);

        return out;

    ***REMOVED***,

    /**
    * Returns a string representation of this object.
    * @method Phaser.Ellipse#toString
    * @return ***REMOVED***string***REMOVED*** A string representation of the instance.
    */
    toString: function () ***REMOVED***
        return "[***REMOVED***Phaser.Ellipse (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")***REMOVED***]";
    ***REMOVED***

***REMOVED***;

Phaser.Ellipse.prototype.constructor = Phaser.Ellipse;

/**
* The left coordinate of the Ellipse. The same as the X coordinate.
* @name Phaser.Ellipse#left
* @propety ***REMOVED***number***REMOVED*** left - Gets or sets the value of the leftmost point of the ellipse.
*/
Object.defineProperty(Phaser.Ellipse.prototype, "left", ***REMOVED***

    get: function () ***REMOVED***
        return this.x;
    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.x = value;

    ***REMOVED***

***REMOVED***);

/**
* The x coordinate of the rightmost point of the Ellipse. Changing the right property of an Ellipse object has no effect on the x property, but does adjust the width.
* @name Phaser.Ellipse#right
* @property ***REMOVED***number***REMOVED*** right - Gets or sets the value of the rightmost point of the ellipse.
*/
Object.defineProperty(Phaser.Ellipse.prototype, "right", ***REMOVED***

    get: function () ***REMOVED***
        return this.x + this.width;
    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value < this.x)
        ***REMOVED***
            this.width = 0;
        ***REMOVED***
        else
        ***REMOVED***
            this.width = value - this.x;
        ***REMOVED***
    ***REMOVED***

***REMOVED***);

/**
* The top of the Ellipse. The same as its y property.
* @name Phaser.Ellipse#top
* @property ***REMOVED***number***REMOVED*** top - Gets or sets the top of the ellipse.
*/
Object.defineProperty(Phaser.Ellipse.prototype, "top", ***REMOVED***

    get: function () ***REMOVED***
        return this.y;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this.y = value;
    ***REMOVED***

***REMOVED***);

/**
* The sum of the y and height properties. Changing the bottom property of an Ellipse doesn't adjust the y property, but does change the height.
* @name Phaser.Ellipse#bottom
* @property ***REMOVED***number***REMOVED*** bottom - Gets or sets the bottom of the ellipse.
*/
Object.defineProperty(Phaser.Ellipse.prototype, "bottom", ***REMOVED***

    get: function () ***REMOVED***
        return this.y + this.height;
    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value < this.y)
        ***REMOVED***
            this.height = 0;
        ***REMOVED***
        else
        ***REMOVED***
            this.height = value - this.y;
        ***REMOVED***
    ***REMOVED***

***REMOVED***);

/**
* Determines whether or not this Ellipse object is empty. Will return a value of true if the Ellipse objects dimensions are less than or equal to 0; otherwise false.
* If set to true it will reset all of the Ellipse objects properties to 0. An Ellipse object is empty if its width or height is less than or equal to 0.
* @name Phaser.Ellipse#empty
* @property ***REMOVED***boolean***REMOVED*** empty - Gets or sets the empty state of the ellipse.
*/
Object.defineProperty(Phaser.Ellipse.prototype, "empty", ***REMOVED***

    get: function () ***REMOVED***
        return (this.width === 0 || this.height === 0);
    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value === true)
        ***REMOVED***
            this.setTo(0, 0, 0, 0);
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* Return true if the given x/y coordinates are within the Ellipse object.
* 
* @method Phaser.Ellipse.contains
* @param ***REMOVED***Phaser.Ellipse***REMOVED*** a - The Ellipse to be checked.
* @param ***REMOVED***number***REMOVED*** x - The X value of the coordinate to test.
* @param ***REMOVED***number***REMOVED*** y - The Y value of the coordinate to test.
* @return ***REMOVED***boolean***REMOVED*** True if the coordinates are within this ellipse, otherwise false.
*/
Phaser.Ellipse.contains = function (a, x, y) ***REMOVED***
 
    if (a.width <= 0 || a.height <= 0) ***REMOVED***
        return false;
    ***REMOVED***
 
    //  Normalize the coords to an ellipse with center 0,0 and a radius of 0.5
    var normx = ((x - a.x) / a.width) - 0.5;
    var normy = ((y - a.y) / a.height) - 0.5;
 
    normx *= normx;
    normy *= normy;
 
    return (normx + normy < 0.25);
 
***REMOVED***;

//   Because PIXI uses its own Ellipse, we'll replace it with ours to avoid duplicating code or confusion.
PIXI.Ellipse = Phaser.Ellipse;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Creates a new Line object with a start and an end point.
*
* @class Phaser.Line
* @constructor
* @param ***REMOVED***number***REMOVED*** [x1=0] - The x coordinate of the start of the line.
* @param ***REMOVED***number***REMOVED*** [y1=0] - The y coordinate of the start of the line.
* @param ***REMOVED***number***REMOVED*** [x2=0] - The x coordinate of the end of the line.
* @param ***REMOVED***number***REMOVED*** [y2=0] - The y coordinate of the end of the line.
*/
Phaser.Line = function (x1, y1, x2, y2) ***REMOVED***

    x1 = x1 || 0;
    y1 = y1 || 0;
    x2 = x2 || 0;
    y2 = y2 || 0;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** start - The start point of the line.
    */
    this.start = new Phaser.Point(x1, y1);

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** end - The end point of the line.
    */
    this.end = new Phaser.Point(x2, y2);

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.LINE;

***REMOVED***;

Phaser.Line.prototype = ***REMOVED***

    /**
    * Sets the components of the Line to the specified values.
    *
    * @method Phaser.Line#setTo
    * @param ***REMOVED***number***REMOVED*** [x1=0] - The x coordinate of the start of the line.
    * @param ***REMOVED***number***REMOVED*** [y1=0] - The y coordinate of the start of the line.
    * @param ***REMOVED***number***REMOVED*** [x2=0] - The x coordinate of the end of the line.
    * @param ***REMOVED***number***REMOVED*** [y2=0] - The y coordinate of the end of the line.
    * @return ***REMOVED***Phaser.Line***REMOVED*** This line object
    */
    setTo: function (x1, y1, x2, y2) ***REMOVED***

        this.start.setTo(x1, y1);
        this.end.setTo(x2, y2);

        return this;

    ***REMOVED***,

    /**
    * Sets the line to match the x/y coordinates of the two given sprites.
    * Can optionally be calculated from their center coordinates.
    *
    * @method Phaser.Line#fromSprite
    * @param ***REMOVED***Phaser.Sprite***REMOVED*** startSprite - The coordinates of this Sprite will be set to the Line.start point.
    * @param ***REMOVED***Phaser.Sprite***REMOVED*** endSprite - The coordinates of this Sprite will be set to the Line.start point.
    * @param ***REMOVED***boolean***REMOVED*** [useCenter=false] - If true it will use startSprite.center.x, if false startSprite.x. Note that Sprites don't have a center property by default, so only enable if you've over-ridden your Sprite with a custom class.
    * @return ***REMOVED***Phaser.Line***REMOVED*** This line object
    */
    fromSprite: function (startSprite, endSprite, useCenter) ***REMOVED***

        if (useCenter === undefined) ***REMOVED*** useCenter = false; ***REMOVED***

        if (useCenter)
        ***REMOVED***
            return this.setTo(startSprite.center.x, startSprite.center.y, endSprite.center.x, endSprite.center.y);
        ***REMOVED***

        return this.setTo(startSprite.x, startSprite.y, endSprite.x, endSprite.y);

    ***REMOVED***,

    /**
    * Sets this line to start at the given `x` and `y` coordinates and for the segment to extend at `angle` for the given `length`.
    *
    * @method Phaser.Line#fromAngle
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of the start of the line.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of the start of the line.
    * @param ***REMOVED***number***REMOVED*** angle - The angle of the line in radians.
    * @param ***REMOVED***number***REMOVED*** length - The length of the line in pixels.
    * @return ***REMOVED***Phaser.Line***REMOVED*** This line object
    */
    fromAngle: function (x, y, angle, length) ***REMOVED***

        this.start.setTo(x, y);
        this.end.setTo(x + (Math.cos(angle) * length), y + (Math.sin(angle) * length));

        return this;

    ***REMOVED***,

    /**
    * Rotates the line by the amount specified in `angle`.
    *
    * Rotation takes place from the center of the line.
    * If you wish to rotate around a different point see Line.rotateAround.
    *
    * If you wish to rotate the ends of the Line then see Line.start.rotate or Line.end.rotate.
    *
    * @method Phaser.Line#rotate
    * @param ***REMOVED***number***REMOVED*** angle - The angle in radians (unless asDegrees is true) to rotate the line by.
    * @param ***REMOVED***boolean***REMOVED*** [asDegrees=false] - Is the given angle in radians (false) or degrees (true)?
    * @return ***REMOVED***Phaser.Line***REMOVED*** This line object
    */
    rotate: function (angle, asDegrees) ***REMOVED***

        var cx = (this.start.x + this.end.x) / 2;
        var cy = (this.start.y + this.end.y) / 2;

        this.start.rotate(cx, cy, angle, asDegrees);
        this.end.rotate(cx, cy, angle, asDegrees);

        return this;

    ***REMOVED***,

    /**
    * Rotates the line by the amount specified in `angle`.
    *
    * Rotation takes place around the coordinates given.
    *
    * @method Phaser.Line#rotateAround
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate to offset the rotation from.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate to offset the rotation from.
    * @param ***REMOVED***number***REMOVED*** angle - The angle in radians (unless asDegrees is true) to rotate the line by.
    * @param ***REMOVED***boolean***REMOVED*** [asDegrees=false] - Is the given angle in radians (false) or degrees (true)?
    * @return ***REMOVED***Phaser.Line***REMOVED*** This line object
    */
    rotateAround: function (x, y, angle, asDegrees) ***REMOVED***

        this.start.rotate(x, y, angle, asDegrees);
        this.end.rotate(x, y, angle, asDegrees);

        return this;

    ***REMOVED***,

    /**
    * Checks for intersection between this line and another Line.
    * If asSegment is true it will check for segment intersection. If asSegment is false it will check for line intersection.
    * Returns the intersection segment of AB and EF as a Point, or null if there is no intersection.
    *
    * @method Phaser.Line#intersects
    * @param ***REMOVED***Phaser.Line***REMOVED*** line - The line to check against this one.
    * @param ***REMOVED***boolean***REMOVED*** [asSegment=true] - If true it will check for segment intersection, otherwise full line intersection.
    * @param ***REMOVED***Phaser.Point***REMOVED*** [result] - A Point object to store the result in, if not given a new one will be created.
    * @return ***REMOVED***Phaser.Point***REMOVED*** The intersection segment of the two lines as a Point, or null if there is no intersection.
    */
    intersects: function (line, asSegment, result) ***REMOVED***

        return Phaser.Line.intersectsPoints(this.start, this.end, line.start, line.end, asSegment, result);

    ***REMOVED***,

    /**
    * Returns the reflected angle between two lines.
    * This is the outgoing angle based on the angle of this line and the normalAngle of the given line.
    *
    * @method Phaser.Line#reflect
    * @param ***REMOVED***Phaser.Line***REMOVED*** line - The line to reflect off this line.
    * @return ***REMOVED***number***REMOVED*** The reflected angle in radians.
    */
    reflect: function (line) ***REMOVED***

        return Phaser.Line.reflect(this, line);

    ***REMOVED***,

    /**
    * Returns a Point object where the x and y values correspond to the center (or midpoint) of the Line segment.
    *
    * @method Phaser.Line#midPoint
    * @param ***REMOVED***Phaser.Point***REMOVED*** [out] - A Phaser.Point object into which the result will be populated. If not given a new Point object is created.
    * @return ***REMOVED***Phaser.Point***REMOVED*** A Phaser.Point object with the x and y values set to the center of the line segment.
    */
    midPoint: function (out) ***REMOVED***

        if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

        out.x = (this.start.x + this.end.x) / 2;
        out.y = (this.start.y + this.end.y) / 2;

        return out;

    ***REMOVED***,

    /**
    * Centers this Line on the given coordinates.
    *
    * The line is centered by positioning the start and end points so that the lines midpoint matches
    * the coordinates given.
    *
    * @method Phaser.Line#centerOn
    * @param ***REMOVED***number***REMOVED*** x - The x position to center the line on.
    * @param ***REMOVED***number***REMOVED*** y - The y position to center the line on.
    * @return ***REMOVED***Phaser.Line***REMOVED*** This line object
    */
    centerOn: function (x, y) ***REMOVED***

        var cx = (this.start.x + this.end.x) / 2;
        var cy = (this.start.y + this.end.y) / 2;

        var tx = x - cx;
        var ty = y - cy;

        this.start.add(tx, ty);
        this.end.add(tx, ty);

    ***REMOVED***,

    /**
    * Tests if the given coordinates fall on this line. See pointOnSegment to test against just the line segment.
    *
    * @method Phaser.Line#pointOnLine
    * @param ***REMOVED***number***REMOVED*** x - The line to check against this one.
    * @param ***REMOVED***number***REMOVED*** y - The line to check against this one.
    * @return ***REMOVED***boolean***REMOVED*** True if the point is on the line, false if not.
    */
    pointOnLine: function (x, y) ***REMOVED***

        return ((x - this.start.x) * (this.end.y - this.start.y) === (this.end.x - this.start.x) * (y - this.start.y));

    ***REMOVED***,

    /**
    * Tests if the given coordinates fall on this line and within the segment. See pointOnLine to test against just the line.
    *
    * @method Phaser.Line#pointOnSegment
    * @param ***REMOVED***number***REMOVED*** x - The line to check against this one.
    * @param ***REMOVED***number***REMOVED*** y - The line to check against this one.
    * @return ***REMOVED***boolean***REMOVED*** True if the point is on the line and segment, false if not.
    */
    pointOnSegment: function (x, y) ***REMOVED***

        var xMin = Math.min(this.start.x, this.end.x);
        var xMax = Math.max(this.start.x, this.end.x);
        var yMin = Math.min(this.start.y, this.end.y);
        var yMax = Math.max(this.start.y, this.end.y);

        return (this.pointOnLine(x, y) && (x >= xMin && x <= xMax) && (y >= yMin && y <= yMax));

    ***REMOVED***,

    /**
    * Picks a random point from anywhere on the Line segment and returns it.
    *
    * @method Phaser.Line#random
    * @param ***REMOVED***Phaser.Point|object***REMOVED*** [out] - A Phaser.Point, or any object with public x/y properties, that the values will be set in.
    *     If no object is provided a new Phaser.Point object will be created. In high performance areas avoid this by re-using an object.
    * @return ***REMOVED***Phaser.Point***REMOVED*** An object containing the random point in its `x` and `y` properties.
    */
    random: function (out) ***REMOVED***

        if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

        var t = Math.random();

        out.x = this.start.x + t * (this.end.x - this.start.x);
        out.y = this.start.y + t * (this.end.y - this.start.y);

        return out;

    ***REMOVED***,

    /**
    * Using Bresenham's line algorithm this will return an array of all coordinates on this line.
    * The start and end points are rounded before this runs as the algorithm works on integers.
    *
    * @method Phaser.Line#coordinatesOnLine
    * @param ***REMOVED***number***REMOVED*** [stepRate=1] - How many steps will we return? 1 = every coordinate on the line, 2 = every other coordinate, etc.
    * @param ***REMOVED***array***REMOVED*** [results] - The array to store the results in. If not provided a new one will be generated.
    * @return ***REMOVED***array***REMOVED*** An array of coordinates.
    */
    coordinatesOnLine: function (stepRate, results) ***REMOVED***

        if (stepRate === undefined) ***REMOVED*** stepRate = 1; ***REMOVED***
        if (results === undefined) ***REMOVED*** results = []; ***REMOVED***

        var x1 = Math.round(this.start.x);
        var y1 = Math.round(this.start.y);
        var x2 = Math.round(this.end.x);
        var y2 = Math.round(this.end.y);

        var dx = Math.abs(x2 - x1);
        var dy = Math.abs(y2 - y1);
        var sx = (x1 < x2) ? 1 : -1;
        var sy = (y1 < y2) ? 1 : -1;
        var err = dx - dy;

        results.push([x1, y1]);

        var i = 1;

        while (!((x1 === x2) && (y1 === y2)))
        ***REMOVED***
            var e2 = err << 1;

            if (e2 > -dy)
            ***REMOVED***
                err -= dy;
                x1 += sx;
            ***REMOVED***

            if (e2 < dx)
            ***REMOVED***
                err += dx;
                y1 += sy;
            ***REMOVED***

            if (i % stepRate === 0)
            ***REMOVED***
                results.push([x1, y1]);
            ***REMOVED***

            i++;

        ***REMOVED***

        return results;

    ***REMOVED***,

    /**
     * Returns a new Line object with the same values for the start and end properties as this Line object.
     * @method Phaser.Line#clone
     * @param ***REMOVED***Phaser.Line***REMOVED*** output - Optional Line object. If given the values will be set into the object, otherwise a brand new Line object will be created and returned.
     * @return ***REMOVED***Phaser.Line***REMOVED*** The cloned Line object.
     */
    clone: function (output) ***REMOVED***

        if (output === undefined || output === null)
        ***REMOVED***
            output = new Phaser.Line(this.start.x, this.start.y, this.end.x, this.end.y);
        ***REMOVED***
        else
        ***REMOVED***
            output.setTo(this.start.x, this.start.y, this.end.x, this.end.y);
        ***REMOVED***

        return output;

    ***REMOVED***

***REMOVED***;

/**
* @name Phaser.Line#length
* @property ***REMOVED***number***REMOVED*** length - Gets the length of the line segment.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "length", ***REMOVED***

    get: function () ***REMOVED***
        return Math.sqrt((this.end.x - this.start.x) * (this.end.x - this.start.x) + (this.end.y - this.start.y) * (this.end.y - this.start.y));
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Line#angle
* @property ***REMOVED***number***REMOVED*** angle - Gets the angle of the line in radians.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "angle", ***REMOVED***

    get: function () ***REMOVED***
        return Math.atan2(this.end.y - this.start.y, this.end.x - this.start.x);
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Line#slope
* @property ***REMOVED***number***REMOVED*** slope - Gets the slope of the line (y/x).
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "slope", ***REMOVED***

    get: function () ***REMOVED***
        return (this.end.y - this.start.y) / (this.end.x - this.start.x);
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Line#perpSlope
* @property ***REMOVED***number***REMOVED*** perpSlope - Gets the perpendicular slope of the line (x/y).
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "perpSlope", ***REMOVED***

    get: function () ***REMOVED***
        return -((this.end.x - this.start.x) / (this.end.y - this.start.y));
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Line#x
* @property ***REMOVED***number***REMOVED*** x - Gets the x coordinate of the top left of the bounds around this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "x", ***REMOVED***

    get: function () ***REMOVED***
        return Math.min(this.start.x, this.end.x);
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Line#y
* @property ***REMOVED***number***REMOVED*** y - Gets the y coordinate of the top left of the bounds around this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "y", ***REMOVED***

    get: function () ***REMOVED***
        return Math.min(this.start.y, this.end.y);
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Line#left
* @property ***REMOVED***number***REMOVED*** left - Gets the left-most point of this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "left", ***REMOVED***

    get: function () ***REMOVED***
        return Math.min(this.start.x, this.end.x);
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Line#right
* @property ***REMOVED***number***REMOVED*** right - Gets the right-most point of this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "right", ***REMOVED***

    get: function () ***REMOVED***
        return Math.max(this.start.x, this.end.x);
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Line#top
* @property ***REMOVED***number***REMOVED*** top - Gets the top-most point of this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "top", ***REMOVED***

    get: function () ***REMOVED***
        return Math.min(this.start.y, this.end.y);
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Line#bottom
* @property ***REMOVED***number***REMOVED*** bottom - Gets the bottom-most point of this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "bottom", ***REMOVED***

    get: function () ***REMOVED***
        return Math.max(this.start.y, this.end.y);
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Line#width
* @property ***REMOVED***number***REMOVED*** width - Gets the width of this bounds of this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "width", ***REMOVED***

    get: function () ***REMOVED***
        return Math.abs(this.start.x - this.end.x);
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Line#height
* @property ***REMOVED***number***REMOVED*** height - Gets the height of this bounds of this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "height", ***REMOVED***

    get: function () ***REMOVED***
        return Math.abs(this.start.y - this.end.y);
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Line#normalX
* @property ***REMOVED***number***REMOVED*** normalX - Gets the x component of the left-hand normal of this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "normalX", ***REMOVED***

    get: function () ***REMOVED***
        return Math.cos(this.angle - 1.5707963267948966);
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Line#normalY
* @property ***REMOVED***number***REMOVED*** normalY - Gets the y component of the left-hand normal of this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "normalY", ***REMOVED***

    get: function () ***REMOVED***
        return Math.sin(this.angle - 1.5707963267948966);
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Line#normalAngle
* @property ***REMOVED***number***REMOVED*** normalAngle - Gets the angle in radians of the normal of this line (line.angle - 90 degrees.)
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "normalAngle", ***REMOVED***

    get: function () ***REMOVED***
        return Phaser.Math.wrap(this.angle - 1.5707963267948966, -Math.PI, Math.PI);
    ***REMOVED***

***REMOVED***);

/**
* Checks for intersection between two lines as defined by the given start and end points.
* If asSegment is true it will check for line segment intersection. If asSegment is false it will check for line intersection.
* Returns the intersection segment of AB and EF as a Point, or null if there is no intersection.
* Adapted from code by Keith Hair
*
* @method Phaser.Line.intersectsPoints
* @param ***REMOVED***Phaser.Point***REMOVED*** a - The start of the first Line to be checked.
* @param ***REMOVED***Phaser.Point***REMOVED*** b - The end of the first line to be checked.
* @param ***REMOVED***Phaser.Point***REMOVED*** e - The start of the second Line to be checked.
* @param ***REMOVED***Phaser.Point***REMOVED*** f - The end of the second line to be checked.
* @param ***REMOVED***boolean***REMOVED*** [asSegment=true] - If true it will check for segment intersection, otherwise full line intersection.
* @param ***REMOVED***Phaser.Point|object***REMOVED*** [result] - A Point object to store the result in, if not given a new one will be created.
* @return ***REMOVED***Phaser.Point***REMOVED*** The intersection segment of the two lines as a Point, or null if there is no intersection.
*/
Phaser.Line.intersectsPoints = function (a, b, e, f, asSegment, result) ***REMOVED***

    if (asSegment === undefined) ***REMOVED*** asSegment = true; ***REMOVED***
    if (result === undefined) ***REMOVED*** result = new Phaser.Point(); ***REMOVED***

    var a1 = b.y - a.y;
    var a2 = f.y - e.y;
    var b1 = a.x - b.x;
    var b2 = e.x - f.x;
    var c1 = (b.x * a.y) - (a.x * b.y);
    var c2 = (f.x * e.y) - (e.x * f.y);
    var denom = (a1 * b2) - (a2 * b1);

    if (denom === 0)
    ***REMOVED***
        return null;
    ***REMOVED***

    result.x = ((b1 * c2) - (b2 * c1)) / denom;
    result.y = ((a2 * c1) - (a1 * c2)) / denom;

    if (asSegment)
    ***REMOVED***
        var uc = ((f.y - e.y) * (b.x - a.x) - (f.x - e.x) * (b.y - a.y));
        var ua = (((f.x - e.x) * (a.y - e.y)) - (f.y - e.y) * (a.x - e.x)) / uc;
        var ub = (((b.x - a.x) * (a.y - e.y)) - ((b.y - a.y) * (a.x - e.x))) / uc;

        if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1)
        ***REMOVED***
            return result;
        ***REMOVED***
        else
        ***REMOVED***
            return null;
        ***REMOVED***
    ***REMOVED***

    return result;

***REMOVED***;

/**
* Checks for intersection between two lines.
* If asSegment is true it will check for segment intersection.
* If asSegment is false it will check for line intersection.
* Returns the intersection segment of AB and EF as a Point, or null if there is no intersection.
* Adapted from code by Keith Hair
*
* @method Phaser.Line.intersects
* @param ***REMOVED***Phaser.Line***REMOVED*** a - The first Line to be checked.
* @param ***REMOVED***Phaser.Line***REMOVED*** b - The second Line to be checked.
* @param ***REMOVED***boolean***REMOVED*** [asSegment=true] - If true it will check for segment intersection, otherwise full line intersection.
* @param ***REMOVED***Phaser.Point***REMOVED*** [result] - A Point object to store the result in, if not given a new one will be created.
* @return ***REMOVED***Phaser.Point***REMOVED*** The intersection segment of the two lines as a Point, or null if there is no intersection.
*/
Phaser.Line.intersects = function (a, b, asSegment, result) ***REMOVED***

    return Phaser.Line.intersectsPoints(a.start, a.end, b.start, b.end, asSegment, result);

***REMOVED***;

/**
* Checks for intersection between the Line and a Rectangle shape, or a rectangle-like
* object, with public `x`, `y`, `right` and `bottom` properties, such as a Sprite or Body.
*
* An intersection is considered valid if:
*
* The line starts within, or ends within, the Rectangle.
* The line segment intersects one of the 4 rectangle edges.
*
* The for the purposes of this function rectangles are considered 'solid'.
*
* @method Phaser.Line.intersectsRectangle
* @param ***REMOVED***Phaser.Line***REMOVED*** line - The line to check for intersection with.
* @param ***REMOVED***Phaser.Rectangle|object***REMOVED*** rect - The rectangle, or rectangle-like object, to check for intersection with.
* @return ***REMOVED***boolean***REMOVED*** True if the line intersects with the rectangle edges, or starts or ends within the rectangle.
*/
Phaser.Line.intersectsRectangle = function (line, rect) ***REMOVED***

    //  Quick bail out of the Line and Rect bounds don't intersect
    if (!Phaser.Rectangle.intersects(line, rect))
    ***REMOVED***
        return false;
    ***REMOVED***

    var x1 = line.start.x;
    var y1 = line.start.y;

    var x2 = line.end.x;
    var y2 = line.end.y;

    var bx1 = rect.x;
    var by1 = rect.y;
    var bx2 = rect.right;
    var by2 = rect.bottom;

    var t = 0;

    //  If the start or end of the line is inside the rect then we assume
    //  collision, as rects are solid for our use-case.

    if ((x1 >= bx1 && x1 <= bx2 && y1 >= by1 && y1 <= by2) ||
        (x2 >= bx1 && x2 <= bx2 && y2 >= by1 && y2 <= by2))
    ***REMOVED***
        return true;
    ***REMOVED***

    if (x1 < bx1 && x2 >= bx1)
    ***REMOVED***
        //  Left edge
        t = y1 + (y2 - y1) * (bx1 - x1) / (x2 - x1);

        if (t > by1 && t <= by2)
        ***REMOVED***
            return true;
        ***REMOVED***
    ***REMOVED***
    else if (x1 > bx2 && x2 <= bx2)
    ***REMOVED***
        //  Right edge
        t = y1 + (y2 - y1) * (bx2 - x1) / (x2 - x1);

        if (t >= by1 && t <= by2)
        ***REMOVED***
            return true;
        ***REMOVED***
    ***REMOVED***

    if (y1 < by1 && y2 >= by1)
    ***REMOVED***
        //  Top edge
        t = x1 + (x2 - x1) * (by1 - y1) / (y2 - y1);

        if (t >= bx1 && t <= bx2)
        ***REMOVED***
            return true;
        ***REMOVED***
    ***REMOVED***
    else if (y1 > by2 && y2 <= by2)
    ***REMOVED***
        //  Bottom edge
        t = x1 + (x2 - x1) * (by2 - y1) / (y2 - y1);

        if (t >= bx1 && t <= bx2)
        ***REMOVED***
            return true;
        ***REMOVED***
    ***REMOVED***

    return false;

***REMOVED***;

/**
* Returns the reflected angle between two lines.
* This is the outgoing angle based on the angle of Line 1 and the normalAngle of Line 2.
*
* @method Phaser.Line.reflect
* @param ***REMOVED***Phaser.Line***REMOVED*** a - The base line.
* @param ***REMOVED***Phaser.Line***REMOVED*** b - The line to be reflected from the base line.
* @return ***REMOVED***number***REMOVED*** The reflected angle in radians.
*/
Phaser.Line.reflect = function (a, b) ***REMOVED***

    return 2 * b.normalAngle - 3.141592653589793 - a.angle;

***REMOVED***;

/**
* @author       Mat Groves http://matgroves.com/ @Doormat23
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Matrix is a 3x3 matrix mostly used for display transforms within the renderer.
* 
* It is represented like so:
* 
* | a | b | tx |
* | c | d | ty |
* | 0 | 0 | 1 |
*
* @class Phaser.Matrix
* @constructor
* @param ***REMOVED***number***REMOVED*** [a=1] - Horizontal scaling
* @param ***REMOVED***number***REMOVED*** [b=0] - Horizontal skewing
* @param ***REMOVED***number***REMOVED*** [c=0] - Vertical skewing
* @param ***REMOVED***number***REMOVED*** [d=1] - Vertical scaling
* @param ***REMOVED***number***REMOVED*** [tx=0] - Horizontal translation
* @param ***REMOVED***number***REMOVED*** [ty=0] - Vertical translation
*/
Phaser.Matrix = function (a, b, c, d, tx, ty) ***REMOVED***

    if (a === undefined || a === null) ***REMOVED*** a = 1; ***REMOVED***
    if (b === undefined || b === null) ***REMOVED*** b = 0; ***REMOVED***
    if (c === undefined || c === null) ***REMOVED*** c = 0; ***REMOVED***
    if (d === undefined || d === null) ***REMOVED*** d = 1; ***REMOVED***
    if (tx === undefined || tx === null) ***REMOVED*** tx = 0; ***REMOVED***
    if (ty === undefined || ty === null) ***REMOVED*** ty = 0; ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** a
    * @default 1
    */
    this.a = a;

    /**
    * @property ***REMOVED***number***REMOVED*** b
    * @default 0
    */
    this.b = b;

    /**
    * @property ***REMOVED***number***REMOVED*** c
    * @default 0
    */
    this.c = c;

    /**
    * @property ***REMOVED***number***REMOVED*** d
    * @default 1
    */
    this.d = d;

    /**
    * @property ***REMOVED***number***REMOVED*** tx
    * @default 0
    */
    this.tx = tx;

    /**
    * @property ***REMOVED***number***REMOVED*** ty
    * @default 0
    */
    this.ty = ty;

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.MATRIX;

***REMOVED***;

Phaser.Matrix.prototype = ***REMOVED***

    /**
    * Sets the values of this Matrix to the values in the given array.
    * 
    * The Array elements should be set as follows:
    *
    * a = array[0]
    * b = array[1]
    * c = array[3]
    * d = array[4]
    * tx = array[2]
    * ty = array[5]
    *
    * @method Phaser.Matrix#fromArray
    * @param ***REMOVED***Array***REMOVED*** array - The array to copy from.
    * @return ***REMOVED***Phaser.Matrix***REMOVED*** This Matrix object.
    */
    fromArray: function (array) ***REMOVED***

        return this.setTo(array[0], array[1], array[3], array[4], array[2], array[5]);

    ***REMOVED***,

    /**
    * Sets the values of this Matrix to the given values.
    *
    * @method Phaser.Matrix#setTo
    * @param ***REMOVED***number***REMOVED*** a - Horizontal scaling
    * @param ***REMOVED***number***REMOVED*** b - Horizontal skewing
    * @param ***REMOVED***number***REMOVED*** c - Vertical skewing
    * @param ***REMOVED***number***REMOVED*** d - Vertical scaling
    * @param ***REMOVED***number***REMOVED*** tx - Horizontal translation
    * @param ***REMOVED***number***REMOVED*** ty - Vertical translation
    * @return ***REMOVED***Phaser.Matrix***REMOVED*** This Matrix object.
    */
    setTo: function (a, b, c, d, tx, ty) ***REMOVED***

        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;

        return this;

    ***REMOVED***,

    /**
     * Creates a new Matrix object based on the values of this Matrix.
     * If you provide the output parameter the values of this Matrix will be copied over to it.
     * If the output parameter is blank a new Matrix object will be created.
     *
     * @method Phaser.Matrix#clone
     * @param ***REMOVED***Phaser.Matrix***REMOVED*** [output] - If provided the values of this Matrix will be copied to it, otherwise a new Matrix object is created.
     * @return ***REMOVED***Phaser.Matrix***REMOVED*** A clone of this Matrix.
     */
    clone: function (output) ***REMOVED***

        if (output === undefined || output === null)
        ***REMOVED***
            output = new Phaser.Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
        ***REMOVED***
        else
        ***REMOVED***
            output.a = this.a;
            output.b = this.b;
            output.c = this.c;
            output.d = this.d;
            output.tx = this.tx;
            output.ty = this.ty;
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Copies the properties from this Matrix to the given Matrix.
    *
    * @method Phaser.Matrix#copyTo
    * @param ***REMOVED***Phaser.Matrix***REMOVED*** matrix - The Matrix to copy from.
    * @return ***REMOVED***Phaser.Matrix***REMOVED*** The destination Matrix object.
    */
    copyTo: function (matrix) ***REMOVED***

        matrix.copyFrom(this);

        return matrix;

    ***REMOVED***,

    /**
    * Copies the properties from the given Matrix into this Matrix.
    *
    * @method Phaser.Matrix#copyFrom
    * @param ***REMOVED***Phaser.Matrix***REMOVED*** matrix - The Matrix to copy from.
    * @return ***REMOVED***Phaser.Matrix***REMOVED*** This Matrix object.
    */
    copyFrom: function (matrix) ***REMOVED***

        this.a = matrix.a;
        this.b = matrix.b;
        this.c = matrix.c;
        this.d = matrix.d;
        this.tx = matrix.tx;
        this.ty = matrix.ty;

        return this;

    ***REMOVED***,

    /**
    * Creates a Float32 Array with values populated from this Matrix object.
    *
    * @method Phaser.Matrix#toArray
    * @param ***REMOVED***boolean***REMOVED*** [transpose=false] - Whether the values in the array are transposed or not.
    * @param ***REMOVED***PIXI.Float32Array***REMOVED*** [array] - If provided the values will be set into this array, otherwise a new Float32Array is created.
    * @return ***REMOVED***PIXI.Float32Array***REMOVED*** The newly created array which contains the matrix.
    */
    toArray: function (transpose, array) ***REMOVED***

        if (array === undefined) ***REMOVED*** array = new PIXI.Float32Array(9); ***REMOVED***

        if (transpose)
        ***REMOVED***
            array[0] = this.a;
            array[1] = this.b;
            array[2] = 0;
            array[3] = this.c;
            array[4] = this.d;
            array[5] = 0;
            array[6] = this.tx;
            array[7] = this.ty;
            array[8] = 1;
        ***REMOVED***
        else
        ***REMOVED***
            array[0] = this.a;
            array[1] = this.c;
            array[2] = this.tx;
            array[3] = this.b;
            array[4] = this.d;
            array[5] = this.ty;
            array[6] = 0;
            array[7] = 0;
            array[8] = 1;
        ***REMOVED***

        return array;

    ***REMOVED***,

    /**
    * Get a new position with the current transformation applied.
    * 
    * Can be used to go from a childs coordinate space to the world coordinate space (e.g. rendering)
    *
    * @method Phaser.Matrix#apply
    * @param ***REMOVED***Phaser.Point***REMOVED*** pos - The origin Point.
    * @param ***REMOVED***Phaser.Point***REMOVED*** [newPos] - The point that the new position is assigned to. This can be same as input point.
    * @return ***REMOVED***Phaser.Point***REMOVED*** The new point, transformed through this matrix.
    */
    apply: function (pos, newPos) ***REMOVED***

        if (newPos === undefined) ***REMOVED*** newPos = new Phaser.Point(); ***REMOVED***

        newPos.x = this.a * pos.x + this.c * pos.y + this.tx;
        newPos.y = this.b * pos.x + this.d * pos.y + this.ty;

        return newPos;

    ***REMOVED***,

    /**
    * Get a new position with the inverse of the current transformation applied.
    * 
    * Can be used to go from the world coordinate space to a childs coordinate space. (e.g. input)
    *
    * @method Phaser.Matrix#applyInverse
    * @param ***REMOVED***Phaser.Point***REMOVED*** pos - The origin Point.
    * @param ***REMOVED***Phaser.Point***REMOVED*** [newPos] - The point that the new position is assigned to. This can be same as input point.
    * @return ***REMOVED***Phaser.Point***REMOVED*** The new point, inverse transformed through this matrix.
    */
    applyInverse: function (pos, newPos) ***REMOVED***

        if (newPos === undefined) ***REMOVED*** newPos = new Phaser.Point(); ***REMOVED***

        var id = 1 / (this.a * this.d + this.c * -this.b);
        var x = pos.x;
        var y = pos.y;

        newPos.x = this.d * id * x + -this.c * id * y + (this.ty * this.c - this.tx * this.d) * id;
        newPos.y = this.a * id * y + -this.b * id * x + (-this.ty * this.a + this.tx * this.b) * id;

        return newPos;

    ***REMOVED***,

    /**
    * Translates the matrix on the x and y.
    * This is the same as Matrix.tx += x.
    * 
    * @method Phaser.Matrix#translate
    * @param ***REMOVED***number***REMOVED*** x - The x value to translate on.
    * @param ***REMOVED***number***REMOVED*** y - The y value to translate on.
    * @return ***REMOVED***Phaser.Matrix***REMOVED*** This Matrix object.
    */
    translate: function (x, y) ***REMOVED***

        this.tx += x;
        this.ty += y;
        
        return this;

    ***REMOVED***,

    /**
    * Applies a scale transformation to this matrix.
    * 
    * @method Phaser.Matrix#scale
    * @param ***REMOVED***number***REMOVED*** x - The amount to scale horizontally.
    * @param ***REMOVED***number***REMOVED*** y - The amount to scale vertically.
    * @return ***REMOVED***Phaser.Matrix***REMOVED*** This Matrix object.
    */
    scale: function (x, y) ***REMOVED***

        this.a *= x;
        this.d *= y;
        this.c *= x;
        this.b *= y;
        this.tx *= x;
        this.ty *= y;

        return this;

    ***REMOVED***,

    /**
    * Applies a rotation transformation to this matrix.
    * 
    * @method Phaser.Matrix#rotate
    * @param ***REMOVED***number***REMOVED*** angle - The angle to rotate by, given in radians.
    * @return ***REMOVED***Phaser.Matrix***REMOVED*** This Matrix object.
    */
    rotate: function (angle) ***REMOVED***

        var cos = Math.cos(angle);
        var sin = Math.sin(angle);

        var a1 = this.a;
        var c1 = this.c;
        var tx1 = this.tx;

        this.a = a1 * cos-this.b * sin;
        this.b = a1 * sin+this.b * cos;
        this.c = c1 * cos-this.d * sin;
        this.d = c1 * sin+this.d * cos;
        this.tx = tx1 * cos - this.ty * sin;
        this.ty = tx1 * sin + this.ty * cos;
     
        return this;

    ***REMOVED***,

    /**
    * Appends the given Matrix to this Matrix.
    * 
    * @method Phaser.Matrix#append
    * @param ***REMOVED***Phaser.Matrix***REMOVED*** matrix - The matrix to append to this one.
    * @return ***REMOVED***Phaser.Matrix***REMOVED*** This Matrix object.
    */
    append: function (matrix) ***REMOVED***

        var a1 = this.a;
        var b1 = this.b;
        var c1 = this.c;
        var d1 = this.d;

        this.a  = matrix.a * a1 + matrix.b * c1;
        this.b  = matrix.a * b1 + matrix.b * d1;
        this.c  = matrix.c * a1 + matrix.d * c1;
        this.d  = matrix.c * b1 + matrix.d * d1;

        this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx;
        this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty;
        
        return this;

    ***REMOVED***,

    /**
    * Resets this Matrix to an identity (default) matrix.
    * 
    * @method Phaser.Matrix#identity
    * @return ***REMOVED***Phaser.Matrix***REMOVED*** This Matrix object.
    */
    identity: function () ***REMOVED***

        return this.setTo(1, 0, 0, 1, 0, 0);

    ***REMOVED***

***REMOVED***;

Phaser.identityMatrix = new Phaser.Matrix();

//  Because PIXI uses its own type, we'll replace it with ours to avoid duplicating code or confusion.
PIXI.Matrix = Phaser.Matrix;
PIXI.identityMatrix = Phaser.identityMatrix;

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

/**
* @author       Richard Davey <rich@photonstorm.com>
* @author       Adrien Brault <adrien.brault@gmail.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Creates a new Polygon.
* 
* The points can be set from a variety of formats:
*
* - An array of Point objects: `[new Phaser.Point(x1, y1), ...]`
* - An array of objects with public x/y properties: `[obj1, obj2, ...]`
* - An array of paired numbers that represent point coordinates: `[x1,y1, x2,y2, ...]`
* - As separate Point arguments: `setTo(new Phaser.Point(x1, y1), ...)`
* - As separate objects with public x/y properties arguments: `setTo(obj1, obj2, ...)`
* - As separate arguments representing point coordinates: `setTo(x1,y1, x2,y2, ...)`
*
* @class Phaser.Polygon
* @constructor
* @param ***REMOVED***Phaser.Point[]|number[]|...Phaser.Point|...number***REMOVED*** points - The points to set.
*/
Phaser.Polygon = function () ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** area - The area of this Polygon.
    */
    this.area = 0;

    /**
    * @property ***REMOVED***array***REMOVED*** _points - An array of Points that make up this Polygon.
    * @private
    */
    this._points = [];

    if (arguments.length > 0)
    ***REMOVED***
        this.setTo.apply(this, arguments);
    ***REMOVED***

    /**
    * @property ***REMOVED***boolean***REMOVED*** closed - Is the Polygon closed or not?
    */
    this.closed = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** flattened - Has this Polygon been flattened by a call to `Polygon.flatten` ?
    */
    this.flattened = false;

    /**
     * @property ***REMOVED***number***REMOVED*** type - The base object type.
     */
    this.type = Phaser.POLYGON;

***REMOVED***;

Phaser.Polygon.prototype = ***REMOVED***

    /**
     * Export the points as an array of flat numbers, following the sequence [ x,y, x,y, x,y ]
     *
     * @method Phaser.Polygon#toNumberArray
     * @param ***REMOVED***array***REMOVED*** [output] - The array to append the points to. If not specified a new array will be created.
     * @return ***REMOVED***array***REMOVED*** The flattened array.
     */
    toNumberArray: function (output) ***REMOVED***

        if (output === undefined) ***REMOVED*** output = []; ***REMOVED***

        for (var i = 0; i < this._points.length; i++)
        ***REMOVED***
            if (typeof this._points[i] === 'number')
            ***REMOVED***
                output.push(this._points[i]);
                output.push(this._points[i + 1]);
                i++;
            ***REMOVED***
            else
            ***REMOVED***
                output.push(this._points[i].x);
                output.push(this._points[i].y);
            ***REMOVED***
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
     * Flattens this Polygon so the points are a sequence of numbers.
     * Any Point objects found are removed and replaced with two numbers.
     * Also sets the Polygon.flattened property to `true`.
     *
     * @method Phaser.Polygon#flatten
     * @return ***REMOVED***Phaser.Polygon***REMOVED*** This Polygon object
     */
    flatten: function () ***REMOVED***

        this._points = this.toNumberArray();

        this.flattened = true;

        return this;

    ***REMOVED***,

    /**
     * Creates a copy of the given Polygon.
     * This is a deep clone, the resulting copy contains new Phaser.Point objects
     *
     * @method Phaser.Polygon#clone
     * @param ***REMOVED***Phaser.Polygon***REMOVED*** [output=(new Polygon)] - The polygon to update. If not specified a new polygon will be created.
     * @return ***REMOVED***Phaser.Polygon***REMOVED*** The cloned (`output`) polygon object.
     */
    clone: function (output) ***REMOVED***

        var points = this._points.slice();

        if (output === undefined || output === null)
        ***REMOVED***
            output = new Phaser.Polygon(points);
        ***REMOVED***
        else
        ***REMOVED***
            output.setTo(points);
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Checks whether the x and y coordinates are contained within this polygon.
    *
    * @method Phaser.Polygon#contains
    * @param ***REMOVED***number***REMOVED*** x - The X value of the coordinate to test.
    * @param ***REMOVED***number***REMOVED*** y - The Y value of the coordinate to test.
    * @return ***REMOVED***boolean***REMOVED*** True if the coordinates are within this polygon, otherwise false.
    */
    contains: function (x, y) ***REMOVED***

        //  Adapted from http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html by Jonas Raoni Soares Silva

        var inside = false;

        if (this.flattened)
        ***REMOVED***
            for (var i = -2, j = this._points.length - 2; (i += 2) < this._points.length; j = i)
            ***REMOVED***
                var ix = this._points[i];
                var iy = this._points[i + 1];

                var jx = this._points[j];
                var jy = this._points[j + 1];

                if (((iy <= y && y < jy) || (jy <= y && y < iy)) && (x < (jx - ix) * (y - iy) / (jy - iy) + ix))
                ***REMOVED***
                    inside = !inside;
                ***REMOVED***
            ***REMOVED***

        ***REMOVED***
        else
        ***REMOVED***
            for (var i = -1, j = this._points.length - 1; ++i < this._points.length; j = i)
            ***REMOVED***
                var ix = this._points[i].x;
                var iy = this._points[i].y;

                var jx = this._points[j].x;
                var jy = this._points[j].y;

                if (((iy <= y && y < jy) || (jy <= y && y < iy)) && (x < (jx - ix) * (y - iy) / (jy - iy) + ix))
                ***REMOVED***
                    inside = !inside;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return inside;

    ***REMOVED***,

    /**
     * Sets this Polygon to the given points.
     *
     * The points can be set from a variety of formats:
     *
     * - An array of Point objects: `[new Phaser.Point(x1, y1), ...]`
     * - An array of objects with public x/y properties: `[obj1, obj2, ...]`
     * - An array of paired numbers that represent point coordinates: `[x1,y1, x2,y2, ...]`
     * - An array of arrays with two elements representing x/y coordinates: `[[x1, y1], [x2, y2], ...]`
     * - As separate Point arguments: `setTo(new Phaser.Point(x1, y1), ...)`
     * - As separate objects with public x/y properties arguments: `setTo(obj1, obj2, ...)`
     * - As separate arguments representing point coordinates: `setTo(x1,y1, x2,y2, ...)`
     *
     * `setTo` may also be called without any arguments to remove all points.
     *
     * @method Phaser.Polygon#setTo
     * @param ***REMOVED***Phaser.Point[]|number[]|...Phaser.Point|...number***REMOVED*** points - The points to set.
     * @return ***REMOVED***Phaser.Polygon***REMOVED*** This Polygon object
     */
    setTo: function (points) ***REMOVED***

        this.area = 0;
        this._points = [];

        if (arguments.length > 0)
        ***REMOVED***
            //  If points isn't an array, use arguments as the array
            if (!Array.isArray(points))
            ***REMOVED***
                points = Array.prototype.slice.call(arguments);
            ***REMOVED***

            var y0 = Number.MAX_VALUE;

            //  Allows for mixed-type arguments
            for (var i = 0, len = points.length; i < len; i++)
            ***REMOVED***
                if (typeof points[i] === 'number')
                ***REMOVED***
                    var p = new PIXI.Point(points[i], points[i + 1]);
                    i++;
                ***REMOVED***
                else if (Array.isArray(points[i]))
                ***REMOVED***
                    var p = new PIXI.Point(points[i][0], points[i][1]);
                ***REMOVED***
                else
                ***REMOVED***
                    var p = new PIXI.Point(points[i].x, points[i].y);
                ***REMOVED***

                this._points.push(p);

                //  Lowest boundary
                if (p.y < y0)
                ***REMOVED***
                    y0 = p.y;
                ***REMOVED***
            ***REMOVED***

            this.calculateArea(y0);
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
     * Calcuates the area of the Polygon. This is available in the property Polygon.area
     *
     * @method Phaser.Polygon#calculateArea
     * @private
     * @param ***REMOVED***number***REMOVED*** y0 - The lowest boundary
     * @return ***REMOVED***number***REMOVED*** The area of the Polygon.
     */
    calculateArea: function (y0) ***REMOVED***

        var p1;
        var p2;
        var avgHeight;
        var width;

        for (var i = 0, len = this._points.length; i < len; i++)
        ***REMOVED***
            p1 = this._points[i];

            if (i === len - 1)
            ***REMOVED***
                p2 = this._points[0];
            ***REMOVED***
            else
            ***REMOVED***
                p2 = this._points[i + 1];
            ***REMOVED***

            avgHeight = ((p1.y - y0) + (p2.y - y0)) / 2;
            width = p1.x - p2.x;
            this.area += avgHeight * width;
        ***REMOVED***

        return this.area;

    ***REMOVED***

***REMOVED***;

Phaser.Polygon.prototype.constructor = Phaser.Polygon;

/**
* Sets and modifies the points of this polygon.
*
* See ***REMOVED***@link Phaser.Polygon#setTo setTo***REMOVED*** for the different kinds of arrays formats that can be assigned.
*
* @name Phaser.Polygon#points
* @property ***REMOVED***Phaser.Point[]***REMOVED*** points - The array of vertex points.
* @deprecated Use `setTo`.
*/
Object.defineProperty(Phaser.Polygon.prototype, 'points', ***REMOVED***

    get: function() ***REMOVED***
        return this._points;
    ***REMOVED***,

    set: function(points) ***REMOVED***

        if (points != null)
        ***REMOVED***
            this.setTo(points);
        ***REMOVED***
        else
        ***REMOVED***
            //  Clear the points
            this.setTo();
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

//  Because PIXI uses its own type, we'll replace it with ours to avoid duplicating code or confusion.
PIXI.Polygon = Phaser.Polygon;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Creates a new Rectangle object with the top-left corner specified by the x and y parameters and with the specified width and height parameters.
* If you call this function without parameters, a Rectangle with x, y, width, and height properties set to 0 is created.
*
* @class Phaser.Rectangle
* @constructor
* @param ***REMOVED***number***REMOVED*** x - The x coordinate of the top-left corner of the Rectangle.
* @param ***REMOVED***number***REMOVED*** y - The y coordinate of the top-left corner of the Rectangle.
* @param ***REMOVED***number***REMOVED*** width - The width of the Rectangle. Should always be either zero or a positive value.
* @param ***REMOVED***number***REMOVED*** height - The height of the Rectangle. Should always be either zero or a positive value.
*/
Phaser.Rectangle = function (x, y, width, height) ***REMOVED***

    x = x || 0;
    y = y || 0;
    width = width || 0;
    height = height || 0;

    /**
    * @property ***REMOVED***number***REMOVED*** x - The x coordinate of the top-left corner of the Rectangle.
    */
    this.x = x;

    /**
    * @property ***REMOVED***number***REMOVED*** y - The y coordinate of the top-left corner of the Rectangle.
    */
    this.y = y;

    /**
    * @property ***REMOVED***number***REMOVED*** width - The width of the Rectangle. This value should never be set to a negative.
    */
    this.width = width;

    /**
    * @property ***REMOVED***number***REMOVED*** height - The height of the Rectangle. This value should never be set to a negative.
    */
    this.height = height;

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.RECTANGLE;

***REMOVED***;

Phaser.Rectangle.prototype = ***REMOVED***

    /**
    * Adjusts the location of the Rectangle object, as determined by its top-left corner, by the specified amounts.
    * @method Phaser.Rectangle#offset
    * @param ***REMOVED***number***REMOVED*** dx - Moves the x value of the Rectangle object by this amount.
    * @param ***REMOVED***number***REMOVED*** dy - Moves the y value of the Rectangle object by this amount.
    * @return ***REMOVED***Phaser.Rectangle***REMOVED*** This Rectangle object.
    */
    offset: function (dx, dy) ***REMOVED***

        this.x += dx;
        this.y += dy;

        return this;

    ***REMOVED***,

    /**
    * Adjusts the location of the Rectangle object using a Point object as a parameter. This method is similar to the Rectangle.offset() method, except that it takes a Point object as a parameter.
    * @method Phaser.Rectangle#offsetPoint
    * @param ***REMOVED***Phaser.Point***REMOVED*** point - A Point object to use to offset this Rectangle object.
    * @return ***REMOVED***Phaser.Rectangle***REMOVED*** This Rectangle object.
    */
    offsetPoint: function (point) ***REMOVED***

        return this.offset(point.x, point.y);

    ***REMOVED***,

    /**
    * Sets the members of Rectangle to the specified values.
    * @method Phaser.Rectangle#setTo
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of the top-left corner of the Rectangle.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of the top-left corner of the Rectangle.
    * @param ***REMOVED***number***REMOVED*** width - The width of the Rectangle. Should always be either zero or a positive value.
    * @param ***REMOVED***number***REMOVED*** height - The height of the Rectangle. Should always be either zero or a positive value.
    * @return ***REMOVED***Phaser.Rectangle***REMOVED*** This Rectangle object
    */
    setTo: function (x, y, width, height) ***REMOVED***

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        return this;

    ***REMOVED***,

    /**
    * Scales the width and height of this Rectangle by the given amounts.
    * 
    * @method Phaser.Rectangle#scale
    * @param ***REMOVED***number***REMOVED*** x - The amount to scale the width of the Rectangle by. A value of 0.5 would reduce by half, a value of 2 would double the width, etc.
    * @param ***REMOVED***number***REMOVED*** [y] - The amount to scale the height of the Rectangle by. A value of 0.5 would reduce by half, a value of 2 would double the height, etc.
    * @return ***REMOVED***Phaser.Rectangle***REMOVED*** This Rectangle object
    */
    scale: function (x, y) ***REMOVED***

        if (y === undefined) ***REMOVED*** y = x; ***REMOVED***

        this.width *= x;
        this.height *= y;

        return this;

    ***REMOVED***,

    /**
    * Centers this Rectangle so that the center coordinates match the given x and y values.
    *
    * @method Phaser.Rectangle#centerOn
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate to place the center of the Rectangle at.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate to place the center of the Rectangle at.
    * @return ***REMOVED***Phaser.Rectangle***REMOVED*** This Rectangle object
    */
    centerOn: function (x, y) ***REMOVED***

        this.centerX = x;
        this.centerY = y;

        return this;

    ***REMOVED***,

    /**
    * Runs Math.floor() on both the x and y values of this Rectangle.
    * @method Phaser.Rectangle#floor
    */
    floor: function () ***REMOVED***

        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

    ***REMOVED***,

    /**
    * Runs Math.floor() on the x, y, width and height values of this Rectangle.
    * @method Phaser.Rectangle#floorAll
    */
    floorAll: function () ***REMOVED***

        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);

    ***REMOVED***,

    /**
    * Runs Math.ceil() on both the x and y values of this Rectangle.
    * @method Phaser.Rectangle#ceil
    */
    ceil: function () ***REMOVED***

        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);

    ***REMOVED***,

    /**
    * Runs Math.ceil() on the x, y, width and height values of this Rectangle.
    * @method Phaser.Rectangle#ceilAll
    */
    ceilAll: function () ***REMOVED***

        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);

    ***REMOVED***,

    /**
    * Copies the x, y, width and height properties from any given object to this Rectangle.
    * @method Phaser.Rectangle#copyFrom
    * @param ***REMOVED***any***REMOVED*** source - The object to copy from.
    * @return ***REMOVED***Phaser.Rectangle***REMOVED*** This Rectangle object.
    */
    copyFrom: function (source) ***REMOVED***

        return this.setTo(source.x, source.y, source.width, source.height);

    ***REMOVED***,

    /**
    * Copies the x, y, width and height properties from this Rectangle to any given object.
    * @method Phaser.Rectangle#copyTo
    * @param ***REMOVED***any***REMOVED*** source - The object to copy to.
    * @return ***REMOVED***object***REMOVED*** This object.
    */
    copyTo: function (dest) ***REMOVED***

        dest.x = this.x;
        dest.y = this.y;
        dest.width = this.width;
        dest.height = this.height;

        return dest;

    ***REMOVED***,

    /**
    * Increases the size of the Rectangle object by the specified amounts. The center point of the Rectangle object stays the same, and its size increases to the left and right by the dx value, and to the top and the bottom by the dy value.
    * @method Phaser.Rectangle#inflate
    * @param ***REMOVED***number***REMOVED*** dx - The amount to be added to the left side of the Rectangle.
    * @param ***REMOVED***number***REMOVED*** dy - The amount to be added to the bottom side of the Rectangle.
    * @return ***REMOVED***Phaser.Rectangle***REMOVED*** This Rectangle object.
    */
    inflate: function (dx, dy) ***REMOVED***

        return Phaser.Rectangle.inflate(this, dx, dy);

    ***REMOVED***,

    /**
    * The size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
    * @method Phaser.Rectangle#size
    * @param ***REMOVED***Phaser.Point***REMOVED*** [output] - Optional Point object. If given the values will be set into the object, otherwise a brand new Point object will be created and returned.
    * @return ***REMOVED***Phaser.Point***REMOVED*** The size of the Rectangle object.
    */
    size: function (output) ***REMOVED***

        return Phaser.Rectangle.size(this, output);

    ***REMOVED***,

    /**
    * Resize the Rectangle by providing a new width and height.
    * The x and y positions remain unchanged.
    * 
    * @method Phaser.Rectangle#resize
    * @param ***REMOVED***number***REMOVED*** width - The width of the Rectangle. Should always be either zero or a positive value.
    * @param ***REMOVED***number***REMOVED*** height - The height of the Rectangle. Should always be either zero or a positive value.
    * @return ***REMOVED***Phaser.Rectangle***REMOVED*** This Rectangle object
    */
    resize: function (width, height) ***REMOVED***

        this.width = width;
        this.height = height;

        return this;

    ***REMOVED***,

    /**
    * Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
    * @method Phaser.Rectangle#clone
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** [output] - Optional Rectangle object. If given the values will be set into the object, otherwise a brand new Rectangle object will be created and returned.
    * @return ***REMOVED***Phaser.Rectangle***REMOVED***
    */
    clone: function (output) ***REMOVED***

        return Phaser.Rectangle.clone(this, output);

    ***REMOVED***,

    /**
    * Determines whether the specified coordinates are contained within the region defined by this Rectangle object.
    * @method Phaser.Rectangle#contains
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of the point to test.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of the point to test.
    * @return ***REMOVED***boolean***REMOVED*** A value of true if the Rectangle object contains the specified point; otherwise false.
    */
    contains: function (x, y) ***REMOVED***

        return Phaser.Rectangle.contains(this, x, y);

    ***REMOVED***,

    /**
    * Determines whether the first Rectangle object is fully contained within the second Rectangle object.
    * A Rectangle object is said to contain another if the second Rectangle object falls entirely within the boundaries of the first.
    * @method Phaser.Rectangle#containsRect
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** b - The second Rectangle object.
    * @return ***REMOVED***boolean***REMOVED*** A value of true if the Rectangle object contains the specified point; otherwise false.
    */
    containsRect: function (b) ***REMOVED***

        return Phaser.Rectangle.containsRect(b, this);

    ***REMOVED***,

    /**
    * Determines whether the two Rectangles are equal.
    * This method compares the x, y, width and height properties of each Rectangle.
    * @method Phaser.Rectangle#equals
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** b - The second Rectangle object.
    * @return ***REMOVED***boolean***REMOVED*** A value of true if the two Rectangles have exactly the same values for the x, y, width and height properties; otherwise false.
    */
    equals: function (b) ***REMOVED***

        return Phaser.Rectangle.equals(this, b);

    ***REMOVED***,

    /**
    * If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object, returns the area of intersection as a Rectangle object. If the Rectangles do not intersect, this method returns an empty Rectangle object with its properties set to 0.
    * @method Phaser.Rectangle#intersection
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** b - The second Rectangle object.
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** out - Optional Rectangle object. If given the intersection values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
    * @return ***REMOVED***Phaser.Rectangle***REMOVED*** A Rectangle object that equals the area of intersection. If the Rectangles do not intersect, this method returns an empty Rectangle object; that is, a Rectangle with its x, y, width, and height properties set to 0.
    */
    intersection: function (b, out) ***REMOVED***

        return Phaser.Rectangle.intersection(this, b, out);

    ***REMOVED***,

    /**
    * Determines whether this Rectangle and another given Rectangle intersect with each other.
    * This method checks the x, y, width, and height properties of the two Rectangles.
    * 
    * @method Phaser.Rectangle#intersects
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** b - The second Rectangle object.
    * @return ***REMOVED***boolean***REMOVED*** A value of true if the specified object intersects with this Rectangle object; otherwise false.
    */
    intersects: function (b) ***REMOVED***

        return Phaser.Rectangle.intersects(this, b);

    ***REMOVED***,

    /**
    * Determines whether the coordinates given intersects (overlaps) with this Rectangle.
    *
    * @method Phaser.Rectangle#intersectsRaw
    * @param ***REMOVED***number***REMOVED*** left - The x coordinate of the left of the area.
    * @param ***REMOVED***number***REMOVED*** right - The right coordinate of the area.
    * @param ***REMOVED***number***REMOVED*** top - The y coordinate of the area.
    * @param ***REMOVED***number***REMOVED*** bottom - The bottom coordinate of the area.
    * @param ***REMOVED***number***REMOVED*** tolerance - A tolerance value to allow for an intersection test with padding, default to 0
    * @return ***REMOVED***boolean***REMOVED*** A value of true if the specified object intersects with the Rectangle; otherwise false.
    */
    intersectsRaw: function (left, right, top, bottom, tolerance) ***REMOVED***

        return Phaser.Rectangle.intersectsRaw(this, left, right, top, bottom, tolerance);

    ***REMOVED***,

    /**
    * Adds two Rectangles together to create a new Rectangle object, by filling in the horizontal and vertical space between the two Rectangles.
    * @method Phaser.Rectangle#union
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** b - The second Rectangle object.
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** [out] - Optional Rectangle object. If given the new values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
    * @return ***REMOVED***Phaser.Rectangle***REMOVED*** A Rectangle object that is the union of the two Rectangles.
    */
    union: function (b, out) ***REMOVED***

        return Phaser.Rectangle.union(this, b, out);

    ***REMOVED***,

    /**
    * Returns a uniformly distributed random point from anywhere within this Rectangle.
    * 
    * @method Phaser.Rectangle#random
    * @param ***REMOVED***Phaser.Point|object***REMOVED*** [out] - A Phaser.Point, or any object with public x/y properties, that the values will be set in.
    *     If no object is provided a new Phaser.Point object will be created. In high performance areas avoid this by re-using an existing object.
    * @return ***REMOVED***Phaser.Point***REMOVED*** An object containing the random point in its `x` and `y` properties.
    */
    random: function (out) ***REMOVED***

        if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

        out.x = this.randomX;
        out.y = this.randomY;

        return out;

    ***REMOVED***,

    /**
    * Returns a point based on the given position constant, which can be one of:
    * 
    * `Phaser.TOP_LEFT`, `Phaser.TOP_CENTER`, `Phaser.TOP_RIGHT`, `Phaser.LEFT_CENTER`,
    * `Phaser.CENTER`, `Phaser.RIGHT_CENTER`, `Phaser.BOTTOM_LEFT`, `Phaser.BOTTOM_CENTER` 
    * and `Phaser.BOTTOM_RIGHT`.
    *
    * This method returns the same values as calling Rectangle.bottomLeft, etc, but those
    * calls always create a new Point object, where-as this one allows you to use your own.
    * 
    * @method Phaser.Rectangle#getPoint
    * @param ***REMOVED***integer***REMOVED*** [position] - One of the Phaser position constants, such as `Phaser.TOP_RIGHT`.
    * @param ***REMOVED***Phaser.Point***REMOVED*** [out] - A Phaser.Point that the values will be set in.
    *     If no object is provided a new Phaser.Point object will be created. In high performance areas avoid this by re-using an existing object.
    * @return ***REMOVED***Phaser.Point***REMOVED*** An object containing the point in its `x` and `y` properties.
    */
    getPoint: function (position, out) ***REMOVED***

        if (out === undefined) ***REMOVED*** out = new Phaser.Point(); ***REMOVED***

        switch (position)
        ***REMOVED***
            default:
            case Phaser.TOP_LEFT:
                return out.set(this.x, this.y);

            case Phaser.TOP_CENTER:
                return out.set(this.centerX, this.y);

            case Phaser.TOP_RIGHT:
                return out.set(this.right, this.y);

            case Phaser.LEFT_CENTER:
                return out.set(this.x, this.centerY);

            case Phaser.CENTER:
                return out.set(this.centerX, this.centerY);

            case Phaser.RIGHT_CENTER:
                return out.set(this.right, this.centerY);

            case Phaser.BOTTOM_LEFT:
                return out.set(this.x, this.bottom);

            case Phaser.BOTTOM_CENTER:
                return out.set(this.centerX, this.bottom);

            case Phaser.BOTTOM_RIGHT:
                return out.set(this.right, this.bottom);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns a string representation of this object.
    * @method Phaser.Rectangle#toString
    * @return ***REMOVED***string***REMOVED*** A string representation of the instance.
    */
    toString: function () ***REMOVED***

        return "[***REMOVED***Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + " empty=" + this.empty + ")***REMOVED***]";

    ***REMOVED***

***REMOVED***;

/**
* @name Phaser.Rectangle#halfWidth
* @property ***REMOVED***number***REMOVED*** halfWidth - Half of the width of the Rectangle.
* @readonly
*/
Object.defineProperty(Phaser.Rectangle.prototype, "halfWidth", ***REMOVED***

    get: function () ***REMOVED***
        return Math.round(this.width / 2);
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Rectangle#halfHeight
* @property ***REMOVED***number***REMOVED*** halfHeight - Half of the height of the Rectangle.
* @readonly
*/
Object.defineProperty(Phaser.Rectangle.prototype, "halfHeight", ***REMOVED***

    get: function () ***REMOVED***
        return Math.round(this.height / 2);
    ***REMOVED***

***REMOVED***);

/**
* The sum of the y and height properties. Changing the bottom property of a Rectangle object has no effect on the x, y and width properties, but does change the height property.
* @name Phaser.Rectangle#bottom
* @property ***REMOVED***number***REMOVED*** bottom - The sum of the y and height properties.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "bottom", ***REMOVED***

    get: function () ***REMOVED***
        return this.y + this.height;
    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value <= this.y)
        ***REMOVED***
            this.height = 0;
        ***REMOVED***
        else
        ***REMOVED***
            this.height = value - this.y;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* The location of the Rectangles bottom left corner as a Point object.
* @name Phaser.Rectangle#bottomLeft
* @property ***REMOVED***Phaser.Point***REMOVED*** bottomLeft - Gets or sets the location of the Rectangles bottom left corner as a Point object.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "bottomLeft", ***REMOVED***

    get: function () ***REMOVED***
        return new Phaser.Point(this.x, this.bottom);
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this.x = value.x;
        this.bottom = value.y;
    ***REMOVED***

***REMOVED***);

/**
* The location of the Rectangles bottom right corner as a Point object.
* @name Phaser.Rectangle#bottomRight
* @property ***REMOVED***Phaser.Point***REMOVED*** bottomRight - Gets or sets the location of the Rectangles bottom right corner as a Point object.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "bottomRight", ***REMOVED***

    get: function () ***REMOVED***
        return new Phaser.Point(this.right, this.bottom);
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this.right = value.x;
        this.bottom = value.y;
    ***REMOVED***

***REMOVED***);

/**
* The x coordinate of the left of the Rectangle. Changing the left property of a Rectangle object has no effect on the y and height properties. However it does affect the width property, whereas changing the x value does not affect the width property.
* @name Phaser.Rectangle#left
* @property ***REMOVED***number***REMOVED*** left - The x coordinate of the left of the Rectangle.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "left", ***REMOVED***

    get: function () ***REMOVED***
        return this.x;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        if (value >= this.right) ***REMOVED***
            this.width = 0;
        ***REMOVED*** else ***REMOVED***
            this.width = this.right - value;
        ***REMOVED***
        this.x = value;
    ***REMOVED***

***REMOVED***);

/**
* The sum of the x and width properties. Changing the right property of a Rectangle object has no effect on the x, y and height properties, however it does affect the width property.
* @name Phaser.Rectangle#right
* @property ***REMOVED***number***REMOVED*** right - The sum of the x and width properties.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "right", ***REMOVED***

    get: function () ***REMOVED***
        return this.x + this.width;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        if (value <= this.x) ***REMOVED***
            this.width = 0;
        ***REMOVED*** else ***REMOVED***
            this.width = value - this.x;
        ***REMOVED***
    ***REMOVED***

***REMOVED***);

/**
* The volume of the Rectangle derived from width * height.
* @name Phaser.Rectangle#volume
* @property ***REMOVED***number***REMOVED*** volume - The volume of the Rectangle derived from width * height.
* @readonly
*/
Object.defineProperty(Phaser.Rectangle.prototype, "volume", ***REMOVED***

    get: function () ***REMOVED***
        return this.width * this.height;
    ***REMOVED***

***REMOVED***);

/**
* The perimeter size of the Rectangle. This is the sum of all 4 sides.
* @name Phaser.Rectangle#perimeter
* @property ***REMOVED***number***REMOVED*** perimeter - The perimeter size of the Rectangle. This is the sum of all 4 sides.
* @readonly
*/
Object.defineProperty(Phaser.Rectangle.prototype, "perimeter", ***REMOVED***

    get: function () ***REMOVED***
        return (this.width * 2) + (this.height * 2);
    ***REMOVED***

***REMOVED***);

/**
* The x coordinate of the center of the Rectangle.
* @name Phaser.Rectangle#centerX
* @property ***REMOVED***number***REMOVED*** centerX - The x coordinate of the center of the Rectangle.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "centerX", ***REMOVED***

    get: function () ***REMOVED***
        return this.x + this.halfWidth;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this.x = value - this.halfWidth;
    ***REMOVED***

***REMOVED***);

/**
* The y coordinate of the center of the Rectangle.
* @name Phaser.Rectangle#centerY
* @property ***REMOVED***number***REMOVED*** centerY - The y coordinate of the center of the Rectangle.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "centerY", ***REMOVED***

    get: function () ***REMOVED***
        return this.y + this.halfHeight;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this.y = value - this.halfHeight;
    ***REMOVED***

***REMOVED***);

/**
* A random value between the left and right values (inclusive) of the Rectangle.
*
* @name Phaser.Rectangle#randomX
* @property ***REMOVED***number***REMOVED*** randomX - A random value between the left and right values (inclusive) of the Rectangle.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "randomX", ***REMOVED***

    get: function () ***REMOVED***

        return this.x + (Math.random() * this.width);

    ***REMOVED***

***REMOVED***);

/**
* A random value between the top and bottom values (inclusive) of the Rectangle.
*
* @name Phaser.Rectangle#randomY
* @property ***REMOVED***number***REMOVED*** randomY - A random value between the top and bottom values (inclusive) of the Rectangle.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "randomY", ***REMOVED***

    get: function () ***REMOVED***

        return this.y + (Math.random() * this.height);

    ***REMOVED***

***REMOVED***);

/**
* The y coordinate of the top of the Rectangle. Changing the top property of a Rectangle object has no effect on the x and width properties.
* However it does affect the height property, whereas changing the y value does not affect the height property.
* @name Phaser.Rectangle#top
* @property ***REMOVED***number***REMOVED*** top - The y coordinate of the top of the Rectangle.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "top", ***REMOVED***

    get: function () ***REMOVED***
        return this.y;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        if (value >= this.bottom) ***REMOVED***
            this.height = 0;
            this.y = value;
        ***REMOVED*** else ***REMOVED***
            this.height = (this.bottom - value);
        ***REMOVED***
    ***REMOVED***

***REMOVED***);

/**
* The location of the Rectangles top left corner as a Point object.
* @name Phaser.Rectangle#topLeft
* @property ***REMOVED***Phaser.Point***REMOVED*** topLeft - The location of the Rectangles top left corner as a Point object.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "topLeft", ***REMOVED***

    get: function () ***REMOVED***
        return new Phaser.Point(this.x, this.y);
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this.x = value.x;
        this.y = value.y;
    ***REMOVED***

***REMOVED***);

/**
* The location of the Rectangles top right corner as a Point object.
* @name Phaser.Rectangle#topRight
* @property ***REMOVED***Phaser.Point***REMOVED*** topRight - The location of the Rectangles top left corner as a Point object.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "topRight", ***REMOVED***

    get: function () ***REMOVED***
        return new Phaser.Point(this.x + this.width, this.y);
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this.right = value.x;
        this.y = value.y;
    ***REMOVED***

***REMOVED***);

/**
* Determines whether or not this Rectangle object is empty. A Rectangle object is empty if its width or height is less than or equal to 0.
* If set to true then all of the Rectangle properties are set to 0.
* @name Phaser.Rectangle#empty
* @property ***REMOVED***boolean***REMOVED*** empty - Gets or sets the Rectangles empty state.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "empty", ***REMOVED***

    get: function () ***REMOVED***
        return (!this.width || !this.height);
    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value === true)
        ***REMOVED***
            this.setTo(0, 0, 0, 0);
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

Phaser.Rectangle.prototype.constructor = Phaser.Rectangle;

/**
* Increases the size of the Rectangle object by the specified amounts. The center point of the Rectangle object stays the same, and its size increases to the left and right by the dx value, and to the top and the bottom by the dy value.
* @method Phaser.Rectangle.inflate
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** a - The Rectangle object.
* @param ***REMOVED***number***REMOVED*** dx - The amount to be added to the left side of the Rectangle.
* @param ***REMOVED***number***REMOVED*** dy - The amount to be added to the bottom side of the Rectangle.
* @return ***REMOVED***Phaser.Rectangle***REMOVED*** This Rectangle object.
*/
Phaser.Rectangle.inflate = function (a, dx, dy) ***REMOVED***

    a.x -= dx;
    a.width += 2 * dx;
    a.y -= dy;
    a.height += 2 * dy;

    return a;

***REMOVED***;

/**
* Increases the size of the Rectangle object. This method is similar to the Rectangle.inflate() method except it takes a Point object as a parameter.
* @method Phaser.Rectangle.inflatePoint
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** a - The Rectangle object.
* @param ***REMOVED***Phaser.Point***REMOVED*** point - The x property of this Point object is used to increase the horizontal dimension of the Rectangle object. The y property is used to increase the vertical dimension of the Rectangle object.
* @return ***REMOVED***Phaser.Rectangle***REMOVED*** The Rectangle object.
*/
Phaser.Rectangle.inflatePoint = function (a, point) ***REMOVED***

    return Phaser.Rectangle.inflate(a, point.x, point.y);

***REMOVED***;

/**
* The size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
* @method Phaser.Rectangle.size
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** a - The Rectangle object.
* @param ***REMOVED***Phaser.Point***REMOVED*** [output] - Optional Point object. If given the values will be set into the object, otherwise a brand new Point object will be created and returned.
* @return ***REMOVED***Phaser.Point***REMOVED*** The size of the Rectangle object
*/
Phaser.Rectangle.size = function (a, output) ***REMOVED***

    if (output === undefined || output === null)
    ***REMOVED***
        output = new Phaser.Point(a.width, a.height);
    ***REMOVED***
    else
    ***REMOVED***
        output.setTo(a.width, a.height);
    ***REMOVED***

    return output;

***REMOVED***;

/**
* Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
* @method Phaser.Rectangle.clone
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** a - The Rectangle object.
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** [output] - Optional Rectangle object. If given the values will be set into the object, otherwise a brand new Rectangle object will be created and returned.
* @return ***REMOVED***Phaser.Rectangle***REMOVED***
*/
Phaser.Rectangle.clone = function (a, output) ***REMOVED***

    if (output === undefined || output === null)
    ***REMOVED***
        output = new Phaser.Rectangle(a.x, a.y, a.width, a.height);
    ***REMOVED***
    else
    ***REMOVED***
        output.setTo(a.x, a.y, a.width, a.height);
    ***REMOVED***

    return output;

***REMOVED***;

/**
* Determines whether the specified coordinates are contained within the region defined by this Rectangle object.
* @method Phaser.Rectangle.contains
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** a - The Rectangle object.
* @param ***REMOVED***number***REMOVED*** x - The x coordinate of the point to test.
* @param ***REMOVED***number***REMOVED*** y - The y coordinate of the point to test.
* @return ***REMOVED***boolean***REMOVED*** A value of true if the Rectangle object contains the specified point; otherwise false.
*/
Phaser.Rectangle.contains = function (a, x, y) ***REMOVED***

    if (a.width <= 0 || a.height <= 0)
    ***REMOVED***
        return false;
    ***REMOVED***

    return (x >= a.x && x < a.right && y >= a.y && y < a.bottom);

***REMOVED***;

/**
* Determines whether the specified coordinates are contained within the region defined by the given raw values.
* @method Phaser.Rectangle.containsRaw
* @param ***REMOVED***number***REMOVED*** rx - The x coordinate of the top left of the area.
* @param ***REMOVED***number***REMOVED*** ry - The y coordinate of the top left of the area.
* @param ***REMOVED***number***REMOVED*** rw - The width of the area.
* @param ***REMOVED***number***REMOVED*** rh - The height of the area.
* @param ***REMOVED***number***REMOVED*** x - The x coordinate of the point to test.
* @param ***REMOVED***number***REMOVED*** y - The y coordinate of the point to test.
* @return ***REMOVED***boolean***REMOVED*** A value of true if the Rectangle object contains the specified point; otherwise false.
*/
Phaser.Rectangle.containsRaw = function (rx, ry, rw, rh, x, y) ***REMOVED***

    return (x >= rx && x < (rx + rw) && y >= ry && y < (ry + rh));

***REMOVED***;

/**
* Determines whether the specified point is contained within the rectangular region defined by this Rectangle object. This method is similar to the Rectangle.contains() method, except that it takes a Point object as a parameter.
* @method Phaser.Rectangle.containsPoint
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** a - The Rectangle object.
* @param ***REMOVED***Phaser.Point***REMOVED*** point - The point object being checked. Can be Point or any object with .x and .y values.
* @return ***REMOVED***boolean***REMOVED*** A value of true if the Rectangle object contains the specified point; otherwise false.
*/
Phaser.Rectangle.containsPoint = function (a, point) ***REMOVED***

    return Phaser.Rectangle.contains(a, point.x, point.y);

***REMOVED***;

/**
* Determines whether the first Rectangle object is fully contained within the second Rectangle object.
* A Rectangle object is said to contain another if the second Rectangle object falls entirely within the boundaries of the first.
* @method Phaser.Rectangle.containsRect
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** a - The first Rectangle object.
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** b - The second Rectangle object.
* @return ***REMOVED***boolean***REMOVED*** A value of true if the Rectangle object contains the specified point; otherwise false.
*/
Phaser.Rectangle.containsRect = function (a, b) ***REMOVED***

    //  If the given rect has a larger volume than this one then it can never contain it
    if (a.volume > b.volume)
    ***REMOVED***
        return false;
    ***REMOVED***

    return (a.x >= b.x && a.y >= b.y && a.right < b.right && a.bottom < b.bottom);

***REMOVED***;

/**
* Determines whether the two Rectangles are equal.
* This method compares the x, y, width and height properties of each Rectangle.
* @method Phaser.Rectangle.equals
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** a - The first Rectangle object.
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** b - The second Rectangle object.
* @return ***REMOVED***boolean***REMOVED*** A value of true if the two Rectangles have exactly the same values for the x, y, width and height properties; otherwise false.
*/
Phaser.Rectangle.equals = function (a, b) ***REMOVED***

    return (a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height);

***REMOVED***;

/**
* Determines if the two objects (either Rectangles or Rectangle-like) have the same width and height values under strict equality.
* @method Phaser.Rectangle.sameDimensions
* @param ***REMOVED***Rectangle-like***REMOVED*** a - The first Rectangle object.
* @param ***REMOVED***Rectangle-like***REMOVED*** b - The second Rectangle object.
* @return ***REMOVED***boolean***REMOVED*** True if the object have equivalent values for the width and height properties.
*/
Phaser.Rectangle.sameDimensions = function (a, b) ***REMOVED***

    return (a.width === b.width && a.height === b.height);

***REMOVED***;

/**
* If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object, returns the area of intersection as a Rectangle object. If the Rectangles do not intersect, this method returns an empty Rectangle object with its properties set to 0.
* @method Phaser.Rectangle.intersection
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** a - The first Rectangle object.
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** b - The second Rectangle object.
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** [output] - Optional Rectangle object. If given the intersection values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
* @return ***REMOVED***Phaser.Rectangle***REMOVED*** A Rectangle object that equals the area of intersection. If the Rectangles do not intersect, this method returns an empty Rectangle object; that is, a Rectangle with its x, y, width, and height properties set to 0.
*/
Phaser.Rectangle.intersection = function (a, b, output) ***REMOVED***

    if (output === undefined)
    ***REMOVED***
        output = new Phaser.Rectangle();
    ***REMOVED***

    if (Phaser.Rectangle.intersects(a, b))
    ***REMOVED***
        output.x = Math.max(a.x, b.x);
        output.y = Math.max(a.y, b.y);
        output.width = Math.min(a.right, b.right) - output.x;
        output.height = Math.min(a.bottom, b.bottom) - output.y;
    ***REMOVED***

    return output;

***REMOVED***;

/**
* Determines whether the two Rectangles intersect with each other.
* This method checks the x, y, width, and height properties of the Rectangles.
* @method Phaser.Rectangle.intersects
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** a - The first Rectangle object.
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** b - The second Rectangle object.
* @return ***REMOVED***boolean***REMOVED*** A value of true if the specified object intersects with this Rectangle object; otherwise false.
*/
Phaser.Rectangle.intersects = function (a, b) ***REMOVED***

    if (a.width <= 0 || a.height <= 0 || b.width <= 0 || b.height <= 0)
    ***REMOVED***
        return false;
    ***REMOVED***

    return !(a.right < b.x || a.bottom < b.y || a.x > b.right || a.y > b.bottom);

***REMOVED***;

/**
* Determines whether the object specified intersects (overlaps) with the given values.
* @method Phaser.Rectangle.intersectsRaw
* @param ***REMOVED***number***REMOVED*** left - The x coordinate of the left of the area.
* @param ***REMOVED***number***REMOVED*** right - The right coordinate of the area.
* @param ***REMOVED***number***REMOVED*** top - The y coordinate of the area.
* @param ***REMOVED***number***REMOVED*** bottom - The bottom coordinate of the area.
* @param ***REMOVED***number***REMOVED*** tolerance - A tolerance value to allow for an intersection test with padding, default to 0
* @return ***REMOVED***boolean***REMOVED*** A value of true if the specified object intersects with the Rectangle; otherwise false.
*/
Phaser.Rectangle.intersectsRaw = function (a, left, right, top, bottom, tolerance) ***REMOVED***

    if (tolerance === undefined) ***REMOVED*** tolerance = 0; ***REMOVED***

    return !(left > a.right + tolerance || right < a.left - tolerance || top > a.bottom + tolerance || bottom < a.top - tolerance);

***REMOVED***;

/**
* Adds two Rectangles together to create a new Rectangle object, by filling in the horizontal and vertical space between the two Rectangles.
* @method Phaser.Rectangle.union
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** a - The first Rectangle object.
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** b - The second Rectangle object.
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** [output] - Optional Rectangle object. If given the new values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
* @return ***REMOVED***Phaser.Rectangle***REMOVED*** A Rectangle object that is the union of the two Rectangles.
*/
Phaser.Rectangle.union = function (a, b, output) ***REMOVED***

    if (output === undefined)
    ***REMOVED***
        output = new Phaser.Rectangle();
    ***REMOVED***

    return output.setTo(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.max(a.right, b.right) - Math.min(a.left, b.left), Math.max(a.bottom, b.bottom) - Math.min(a.top, b.top));

***REMOVED***;

/**
* Calculates the Axis Aligned Bounding Box (or aabb) from an array of points.
*
* @method Phaser.Rectangle#aabb
* @param ***REMOVED***Phaser.Point[]***REMOVED*** points - The array of one or more points.
* @param ***REMOVED***Phaser.Rectangle***REMOVED*** [out] - Optional Rectangle to store the value in, if not supplied a new Rectangle object will be created.
* @return ***REMOVED***Phaser.Rectangle***REMOVED*** The new Rectangle object.
* @static
*/
Phaser.Rectangle.aabb = function(points, out) ***REMOVED***

    if (out === undefined) ***REMOVED***
        out = new Phaser.Rectangle();
    ***REMOVED***

    var xMax = Number.NEGATIVE_INFINITY,
        xMin = Number.POSITIVE_INFINITY,
        yMax = Number.NEGATIVE_INFINITY,
        yMin = Number.POSITIVE_INFINITY;

    points.forEach(function(point) ***REMOVED***
        if (point.x > xMax) ***REMOVED***
            xMax = point.x;
        ***REMOVED***
        if (point.x < xMin) ***REMOVED***
            xMin = point.x;
        ***REMOVED***

        if (point.y > yMax) ***REMOVED***
            yMax = point.y;
        ***REMOVED***
        if (point.y < yMin) ***REMOVED***
            yMin = point.y;
        ***REMOVED***
    ***REMOVED***);

    out.setTo(xMin, yMin, xMax - xMin, yMax - yMin);

    return out;
***REMOVED***;

//   Because PIXI uses its own Rectangle, we'll replace it with ours to avoid duplicating code or confusion.
PIXI.Rectangle = Phaser.Rectangle;
PIXI.EmptyRectangle = new Phaser.Rectangle(0, 0, 0, 0);

/**
* @author       Mat Groves http://matgroves.com/
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Rounded Rectangle object is an area defined by its position and has nice rounded corners, 
* as indicated by its top-left corner point (x, y) and by its width and its height.
*
* @class Phaser.RoundedRectangle
* @constructor
* @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate of the top-left corner of the Rectangle.
* @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate of the top-left corner of the Rectangle.
* @param ***REMOVED***number***REMOVED*** [width=0] - The width of the Rectangle. Should always be either zero or a positive value.
* @param ***REMOVED***number***REMOVED*** [height=0] - The height of the Rectangle. Should always be either zero or a positive value.
* @param ***REMOVED***number***REMOVED*** [radius=20] - Controls the radius of the rounded corners.
*/
Phaser.RoundedRectangle = function(x, y, width, height, radius)
***REMOVED***
    if (x === undefined) ***REMOVED*** x = 0; ***REMOVED***
    if (y === undefined) ***REMOVED*** y = 0; ***REMOVED***
    if (width === undefined) ***REMOVED*** width = 0; ***REMOVED***
    if (height === undefined) ***REMOVED*** height = 0; ***REMOVED***
    if (radius === undefined) ***REMOVED*** radius = 20; ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** x - The x coordinate of the top-left corner of the Rectangle.
    */
    this.x = x;

    /**
    * @property ***REMOVED***number***REMOVED*** y - The y coordinate of the top-left corner of the Rectangle.
    */
    this.y = y;

    /**
    * @property ***REMOVED***number***REMOVED*** width - The width of the Rectangle. This value should never be set to a negative.
    */
    this.width = width;

    /**
    * @property ***REMOVED***number***REMOVED*** height - The height of the Rectangle. This value should never be set to a negative.
    */
    this.height = height;

    /**
    * @property ***REMOVED***number***REMOVED*** radius - The radius of the rounded corners.
    */
    this.radius = radius || 20;

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.ROUNDEDRECTANGLE;
***REMOVED***;

Phaser.RoundedRectangle.prototype = ***REMOVED***

    /**
    * Returns a new RoundedRectangle object with the same values for the x, y, width, height and
    * radius properties as this RoundedRectangle object.
    * 
    * @method Phaser.RoundedRectangle#clone
    * @return ***REMOVED***Phaser.RoundedRectangle***REMOVED***
    */
    clone: function () ***REMOVED***

        return new Phaser.RoundedRectangle(this.x, this.y, this.width, this.height, this.radius);

    ***REMOVED***,

    /**
    * Determines whether the specified coordinates are contained within the region defined by this Rounded Rectangle object.
    * 
    * @method Phaser.RoundedRectangle#contains
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of the point to test.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of the point to test.
    * @return ***REMOVED***boolean***REMOVED*** A value of true if the RoundedRectangle Rectangle object contains the specified point; otherwise false.
    */
    contains: function (x, y) ***REMOVED***

        if (this.width <= 0 || this.height <= 0)
        ***REMOVED***
            return false;
        ***REMOVED***

        var x1 = this.x;

        if (x >= x1 && x <= x1 + this.width)
        ***REMOVED***
            var y1 = this.y;

            if (y >= y1 && y <= y1 + this.height)
            ***REMOVED***
                return true;
            ***REMOVED***
        ***REMOVED***

        return false;

    ***REMOVED***

***REMOVED***;

Phaser.RoundedRectangle.prototype.constructor = Phaser.RoundedRectangle;

//  Because PIXI uses its own type, we'll replace it with ours to avoid duplicating code or confusion.
PIXI.RoundedRectangle = Phaser.RoundedRectangle;
