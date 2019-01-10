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
