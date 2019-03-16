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
