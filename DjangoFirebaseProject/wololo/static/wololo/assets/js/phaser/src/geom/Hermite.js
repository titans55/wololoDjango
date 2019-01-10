/**
* @author       Richard Davey <rich@photonstorm.com>
* @author       Pete Baron <pete@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A data representation of a Hermite Curve (see http://en.wikipedia.org/wiki/Cubic_Hermite_spline)
* 
* A Hermite curve has a start and end point and tangent vectors for both of them.
* The curve will always pass through the two control points and the shape of it is controlled
* by the length and direction of the tangent vectors.  At the control points the curve will
* be facing exactly in the vector direction.
* 
* As these curves change speed (speed = distance between points separated by an equal change in
* 't' value - see Hermite.getPoint) this class attempts to reduce the variation by pre-calculating
* the `accuracy` number of points on the curve. The straight-line distances to these points are stored
* in the private 'points' array, and this information is used by Hermite.findT() to convert a pixel
* distance along the curve into a 'time' value.
* 
* Higher `accuracy` values will result in more even movement, but require more memory for the points
* list. 5 works, but 10 seems to be an ideal value for the length of curves found in most games on
* a desktop screen. If you use very long curves (more than 400 pixels) you may need to increase
* this value further.
*
* @class Phaser.Hermite
* @constructor
* @param ***REMOVED***number***REMOVED*** p1x - The x coordinate of the start of the curve.
* @param ***REMOVED***number***REMOVED*** p1y - The y coordinate of the start of the curve.
* @param ***REMOVED***number***REMOVED*** p2x - The x coordinate of the end of the curve.
* @param ***REMOVED***number***REMOVED*** p2y - The y coordinate of the end of the curve.
* @param ***REMOVED***number***REMOVED*** v1x - The x component of the tangent vector for the start of the curve.
* @param ***REMOVED***number***REMOVED*** v1y - The y component of the tangent vector for the start of the curve.
* @param ***REMOVED***number***REMOVED*** v2x - The x component of the tangent vector for the end of the curve.
* @param ***REMOVED***number***REMOVED*** v2y - The y component of the tangent vector for the end of the curve.
* @param ***REMOVED***number***REMOVED*** [accuracy=10] The amount of points to pre-calculate on the curve.
*/
Phaser.Hermite = function (p1x, p1y, p2x, p2y, v1x, v1y, v2x, v2y, accuracy) ***REMOVED***

    if (accuracy === undefined) ***REMOVED*** accuracy = 10; ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** _accuracy - The amount of points to pre-calculate on the curve.
    * @private
    */
    this._accuracy = accuracy;

    /**
    * @property ***REMOVED***number***REMOVED*** _p1x - The x coordinate of the start of the curve.
    * @private
    */
    this._p1x = p1x;

    /**
    * @property ***REMOVED***number***REMOVED*** _p1y - The y coordinate of the start of the curve.
    * @private
    */
    this._p1y = p1y;

    /**
    * @property ***REMOVED***number***REMOVED*** _p2x - The x coordinate of the end of the curve.
    * @private
    */
    this._p2x = p2x;

    /**
    * @property ***REMOVED***number***REMOVED*** _p2y - The y coordinate of the end of the curve.
    * @private
    */
    this._p2y = p2y;

    /**
    * @property ***REMOVED***number***REMOVED*** _v1x - The x component of the tangent vector for the start of the curve.
    * @private
    */
    this._v1x = v1x;

    /**
    * @property ***REMOVED***number***REMOVED*** _v1y - The y component of the tangent vector for the start of the curve.
    * @private
    */
    this._v1y = v1y;

    /**
    * @property ***REMOVED***number***REMOVED*** _v2x - The x component of the tangent vector for the end of the curve.
    * @private
    */
    this._v2x = v2x;

    /**
    * @property ***REMOVED***number***REMOVED*** _v2y - The y component of the tangent vector for the end of the curve.
    * @private
    */
    this._v2y = v2y;
    
    /**
    * @property ***REMOVED***array***REMOVED*** _points - A local array of cached points.
    * @private
    */
    this._points = [];

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** _temp1 - A local cached Point object.
    * @private
    */
    this._temp1 = new Phaser.Point();

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** _temp2 - A local cached Point object.
    * @private
    */
    this._temp2 = new Phaser.Point();

    this.recalculate();

***REMOVED***;

Phaser.Hermite.prototype.constructor = Phaser.Hermite;

Phaser.Hermite.prototype = ***REMOVED***

    /**
    * Performs the curve calculations.
    *
    * This is called automatically if you change any of the curves public properties, such as `Hermite.p1x` or `Hermite.v2y`.
    *
    * If you adjust any of the internal private values, then call this to update the points.
    *
    * @method Phaser.Hermite#recalculate
    * @return ***REMOVED***Phaser.Hermite***REMOVED*** This object.
    */
    recalculate: function () ***REMOVED***

        this._ax = (2 * this._p1x - 2 * this._p2x + this._v1x + this._v2x);
        this._ay = (2 * this._p1y - 2 * this._p2y + this._v1y + this._v2y);
        this._bx = (-3 * this._p1x + 3 * this._p2x - 2 * this._v1x - this._v2x);
        this._by = (-3 * this._p1y + 3 * this._p2y - 2 * this._v1y - this._v2y);

        this.length = this.calculateEvenPoints();

        return this;

    ***REMOVED***,

    /**
    * Calculate a number of points along the curve, based on `Hermite.accuracy`, and stores them in the private `_points` array.
    *
    * @method Phaser.Hermite#calculateEvenPoints
    * @return ***REMOVED***number***REMOVED*** The total length of the curve approximated as straight line distances between the points.
    */
    calculateEvenPoints: function () ***REMOVED***

        var totalLength = 0;

        this._temp1.setTo(0, 0);                    //  pnt
        this._temp2.setTo(this._p1x, this._p1y);    //  lastPnt

        this._points[0] = 0;

        for (var i = 1; i <= this._accuracy; i++)
        ***REMOVED***
            this.getPoint(i / this._accuracy, this._temp1);
            totalLength += this._temp1.distance(this._temp2);
            this._points[i] = totalLength;
            this._temp2.copyFrom(this._temp1);
        ***REMOVED***

        return totalLength;

    ***REMOVED***,

    /**
    * Convert a distance along this curve into a `time` value which will be between 0 and 1.
    * 
    * For example if this curve has a length of 100 pixels then `findT(50)` would return `0.5`.
    *
    * @method Phaser.Hermite#findT
    * @param ***REMOVED***integer***REMOVED*** distance - The distance into the curve in pixels. Should be a positive integer.
    * @return ***REMOVED***number***REMOVED*** The time (`t`) value, a float between 0 and 1.
    */
    findT: function (distance) ***REMOVED***

        if (distance <= 0)
        ***REMOVED***
            return 0;
        ***REMOVED***

        //  Find the _points which bracket the distance value
        var ti = Math.floor(distance / this.length * this._accuracy);

        while (ti > 0 && this._points[ti] > distance)
        ***REMOVED***
            ti--;
        ***REMOVED***

        while (ti < this._accuracy && this._points[ti] < distance)
        ***REMOVED***
            ti++;
        ***REMOVED***

        //  Linear interpolation to get a more accurate fix
        var dt = this._points[ti] - this._points[ti - 1];
        var d = distance - this._points[ti - 1];

        return ((ti - 1) / this._accuracy) + d / (dt * this._accuracy);

    ***REMOVED***,

    /**
    * Get the X component of a point on the curve based on the `t` (time) value, which must be between 0 and 1.
    *
    * @method Phaser.Hermite#getX
    * @param ***REMOVED***number***REMOVED*** [t=0] - The time value along the curve from which to extract a point. This is a value between 0 and 1, where 0 represents the start of the curve and 1 the end.
    * @return ***REMOVED***number***REMOVED*** The X component of a point on the curve based on the `t` (time) value.
    */
    getX: function (t) ***REMOVED***

        if (t === undefined)
        ***REMOVED***
            t = 0;
        ***REMOVED***
        else
        ***REMOVED***
            if (t < 0)
            ***REMOVED***
                t = 0;
            ***REMOVED***

            if (t > 1)
            ***REMOVED***
                t = 1;
            ***REMOVED***
        ***REMOVED***

        var t2 = t * t;
        var t3 = t * t2;

        return (t3 * this._ax + t2 * this._bx + t * this._v1x + this._p1x);

    ***REMOVED***,

    /**
    * Get the Y component of a point on the curve based on the `t` (time) value, which must be between 0 and 1.
    *
    * @method Phaser.Hermite#getY
    * @param ***REMOVED***number***REMOVED*** [t=0] - The time value along the curve from which to extract a point. This is a value between 0 and 1, where 0 represents the start of the curve and 1 the end.
    * @return ***REMOVED***number***REMOVED*** The Y component of a point on the curve based on the `t` (time) value.
    */
    getY: function (t) ***REMOVED***

        if (t === undefined)
        ***REMOVED***
            t = 0;
        ***REMOVED***
        else
        ***REMOVED***
            if (t < 0)
            ***REMOVED***
                t = 0;
            ***REMOVED***

            if (t > 1)
            ***REMOVED***
                t = 1;
            ***REMOVED***
        ***REMOVED***

        var t2 = t * t;
        var t3 = t * t2;

        return (t3 * this._ay + t2 * this._by + t * this._v1y + this._p1y);

    ***REMOVED***,

    /**
    * Get a point on the curve using the `t` (time) value, which must be between 0 and 1.
    *
    * @method Phaser.Hermite#getPoint
    * @param ***REMOVED***number***REMOVED*** [t=0] - The time value along the curve from which to extract a point. This is a value between 0 and 1, where 0 represents the start of the curve and 1 the end.
    * @param ***REMOVED***Phaser.Point|Object***REMOVED*** [point] - An optional Phaser.Point, or Object containing public `x` and `y` properties. If given the resulting values will be stored in the Objects `x` and `y` properties. If omitted a new Phaser.Point object is created.
    * @return ***REMOVED***Phaser.Point***REMOVED*** An Object with the x, y coordinate of the curve at the specified `t` value set in its `x` and `y` properties.
    */
    getPoint: function (t, point) ***REMOVED***

        if (t === undefined) ***REMOVED*** t = 0; ***REMOVED***
        if (point === undefined) ***REMOVED*** point = new Phaser.Point(); ***REMOVED***

        if (t < 0)
        ***REMOVED***
            t = 0;
        ***REMOVED***

        if (t > 1)
        ***REMOVED***
            t = 1;
        ***REMOVED***

        var t2 = t * t;
        var t3 = t * t2;

        point.x = t3 * this._ax + t2 * this._bx + t * this._v1x + this._p1x;
        point.y = t3 * this._ay + t2 * this._by + t * this._v1y + this._p1y;

        return point;

    ***REMOVED***,

    /**
    * Get a point on the curve using the distance, in pixels, along the curve.
    *
    * @method Phaser.Hermite#getPointWithDistance
    * @param ***REMOVED***integer***REMOVED*** [distance=0] - The distance along the curve to get the point from, given in pixels.
    * @param ***REMOVED***Phaser.Point|Object***REMOVED*** [point] - An optional Phaser.Point, or Object containing public `x` and `y` properties. If given the resulting values will be stored in the Objects `x` and `y` properties. If omitted a new Phaser.Point object is created.
    * @return ***REMOVED***Phaser.Point***REMOVED*** The point on the line at the specified 'distance' along the curve.
    */
    getPointWithDistance: function (distance, point) ***REMOVED***

        if (distance === undefined) ***REMOVED*** distance = 0; ***REMOVED***
        if (point === undefined) ***REMOVED*** point = new Phaser.Point(); ***REMOVED***

        if (distance <= 0)
        ***REMOVED***
            point.x = this._p1x;
            point.y = this._p1y;
        ***REMOVED***
        else
        ***REMOVED***
            this.getPoint(this.findT(distance), point);
        ***REMOVED***
        
        return point;

    ***REMOVED***,

    /**
    * Calculate and return the angle, in radians, of the curves tangent based on time.
    *
    * @method Phaser.Hermite#getAngle
    * @param ***REMOVED***number***REMOVED*** [t=0] - The `t` (time) value at which to find the angle. Must be between 0 and 1.
    * @return ***REMOVED***number***REMOVED*** The angle of the line at the specified `t` time value along the curve. The value is in radians.
    */
    getAngle: function (t) ***REMOVED***

        if (t === undefined) ***REMOVED*** t = 0; ***REMOVED***

        this.getPoint(t - 0.01, this._temp1);
        this.getPoint(t + 0.01, this._temp2);

        return Math.atan2(this._temp2.y - this._temp1.y, this._temp2.x - this._temp1.x);

    ***REMOVED***,

    /**
    * Calculate and return the angle, in radians, of the curves tangent at the given pixel distance along the curves length.
    *
    * @method Phaser.Hermite#getAngleWithDistance
    * @param ***REMOVED***number***REMOVED*** [distance=0] - The distance along the curve to get the angle from, in pixels.
    * @return ***REMOVED***number***REMOVED*** The angle of the line at the specified distance along the curve. The value is in radians.
    */
    getAngleWithDistance: function (distance) ***REMOVED***

        if (distance === undefined) ***REMOVED*** distance = 0; ***REMOVED***

        if (distance <= 0)
        ***REMOVED***
            return Math.atan2(this._v1y, this._v1x);
        ***REMOVED***
        else
        ***REMOVED***
            return this.getAngle(this.findT(distance));
        ***REMOVED***

    ***REMOVED***,

    /**
    * Get the angle of the curves entry point.
    *
    * @method Phaser.Hermite#getEntryTangent
    * @param ***REMOVED***Phaser.Point|Object***REMOVED*** point - The Phaser.Point object, or an Object with public `x` and `y` properties, in which the tangent vector values will be stored.
    * @return ***REMOVED***Phaser.Point***REMOVED*** A Point object containing the tangent vector of this Hermite curve.
    */
    getEntryTangent: function (point) ***REMOVED***

        point.x = this._v1x;
        point.y = this._v1y;

        return point;

    ***REMOVED***

***REMOVED***;

Object.defineProperties(Phaser.Hermite.prototype, ***REMOVED***

    /**
    * @name Phaser.Hermite#accuracy
    * @property ***REMOVED***number***REMOVED*** accuracy - The amount of points to pre-calculate on the curve.
    */
    accuracy: ***REMOVED***

        get: function () ***REMOVED***

            return this._accuracy;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            if (value !== this._accuracy)
            ***REMOVED***
                this._accuracy = value;
                this.recalculate();
            ***REMOVED***

        ***REMOVED***

    ***REMOVED***,

    /**
    * @name Phaser.Hermite#p1x
    * @property ***REMOVED***number***REMOVED*** p1x - The x coordinate of the start of the curve. Setting this value will recalculate the curve.
    */
    p1x: ***REMOVED***

        get: function () ***REMOVED***

            return this._p1x;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            if (value !== this._p1x)
            ***REMOVED***
                this._p1x = value;
                this.recalculate();
            ***REMOVED***

        ***REMOVED***

    ***REMOVED***,

    /**
    * @name Phaser.Hermite#p1y
    * @property ***REMOVED***number***REMOVED*** p1y - The y coordinate of the start of the curve. Setting this value will recalculate the curve.
    */
    p1y: ***REMOVED***

        get: function () ***REMOVED***

            return this._p1y;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            if (value !== this._p1y)
            ***REMOVED***
                this._p1y = value;
                this.recalculate();
            ***REMOVED***

        ***REMOVED***

    ***REMOVED***,

    /**
    * @name Phaser.Hermite#p2x
    * @property ***REMOVED***number***REMOVED*** p2x - The x coordinate of the end of the curve. Setting this value will recalculate the curve.
    */
    p2x: ***REMOVED***

        get: function () ***REMOVED***

            return this._p2x;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            if (value !== this._p2x)
            ***REMOVED***
                this._p2x = value;
                this.recalculate();
            ***REMOVED***

        ***REMOVED***

    ***REMOVED***,

    /**
    * @name Phaser.Hermite#p2y
    * @property ***REMOVED***number***REMOVED*** p2y - The y coordinate of the end of the curve. Setting this value will recalculate the curve.
    */
    p2y: ***REMOVED***

        get: function () ***REMOVED***

            return this._p2y;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            if (value !== this._p2y)
            ***REMOVED***
                this._p2y = value;
                this.recalculate();
            ***REMOVED***

        ***REMOVED***

    ***REMOVED***,

    /**
    * @name Phaser.Hermite#v1x
    * @property ***REMOVED***number***REMOVED*** v1x - The x component of the tangent vector for the start of the curve. Setting this value will recalculate the curve.
    */
    v1x: ***REMOVED***

        get: function () ***REMOVED***

            return this._v1x;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            if (value !== this._v1x)
            ***REMOVED***
                this._v1x = value;
                this.recalculate();
            ***REMOVED***

        ***REMOVED***

    ***REMOVED***,

    /**
    * @name Phaser.Hermite#v1y
    * @property ***REMOVED***number***REMOVED*** v1y - The y component of the tangent vector for the start of the curve. Setting this value will recalculate the curve.
    */
    v1y: ***REMOVED***

        get: function () ***REMOVED***

            return this._v1y;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            if (value !== this._v1y)
            ***REMOVED***
                this._v1y = value;
                this.recalculate();
            ***REMOVED***

        ***REMOVED***

    ***REMOVED***,

    /**
    * @name Phaser.Hermite#v2x
    * @property ***REMOVED***number***REMOVED*** v2x - The x component of the tangent vector for the end of the curve. Setting this value will recalculate the curve.
    */
    v2x: ***REMOVED***

        get: function () ***REMOVED***

            return this._v2x;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            if (value !== this._v2x)
            ***REMOVED***
                this._v2x = value;
                this.recalculate();
            ***REMOVED***

        ***REMOVED***

    ***REMOVED***,

    /**
    * @name Phaser.Hermite#v2y
    * @property ***REMOVED***number***REMOVED*** v2y - The y component of the tangent vector for the end of the curve. Setting this value will recalculate the curve.
    */
    v2y: ***REMOVED***

        get: function () ***REMOVED***

            return this._v2y;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            if (value !== this._v2y)
            ***REMOVED***
                this._v2y = value;
                this.recalculate();
            ***REMOVED***

        ***REMOVED***

    ***REMOVED***

***REMOVED***);
