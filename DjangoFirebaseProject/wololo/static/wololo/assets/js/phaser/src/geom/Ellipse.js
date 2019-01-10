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
