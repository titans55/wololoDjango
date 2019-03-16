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
