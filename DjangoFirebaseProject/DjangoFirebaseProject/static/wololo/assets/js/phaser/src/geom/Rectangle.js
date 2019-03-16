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
