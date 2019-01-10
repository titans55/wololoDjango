/**
* @author       Richard Davey <rich@photonstorm.com>
* @author       Pete Baron <pete@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A Phaser.Path contains all the functions need to create and manipulate a single Path object.
* A Path is a list of PathPoint objects connected by Hermite curves.
*
* @class Phaser.Path
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the Phaser.Game instance.
* @param ***REMOVED***number***REMOVED*** [type=Phaser.Path.CoordinateSystems.WORLD] - The coordinate system used by the Path.
* @param ***REMOVED***boolean***REMOVED*** [loops=false] - Should this Path loop or not when a PathFollower reaches the end of it?
*/
Phaser.Path = function (game, type, loops) ***REMOVED***

    if (type === undefined) ***REMOVED*** type = Phaser.Path.CoordinateSystems.WORLD; ***REMOVED***
    if (loops === undefined) ***REMOVED*** loops = false; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***number***REMOVED*** coordinateSystem - The coordinate system used by the Path.
    */
    this.coordinateSystem = type;

    /**
    * @property ***REMOVED***boolean***REMOVED*** loops - Should this Path loop or not when a PathFollower reaches the end of it?
    */
    this.loops = loops;

    /**
    * @property ***REMOVED***string***REMOVED*** cacheKey - The key of the JSON file in the cache used to define this path.
    */
    this.cacheKey = '';

    /**
    * @property ***REMOVED***string***REMOVED*** key - The key of the object within the JSON data. Used if there are multiple paths per JSON file.
    */
    this.key = '';

    /*
    * @property ***REMOVED***Phaser.PathPoint***REMOVED*** name - The name of this path.
    */
    this.name = '';

    /*
     * @property ***REMOVED***Phaser.PathPoint***REMOVED*** type - The Phaser.Path.PathTypes of this path.
     */
    this.type = Phaser.Path.PathTypes.PATH;

    /*
    * @property ***REMOVED***Array***REMOVED*** branches - A list of branches this path has.
    */
    this.branches = [];

    /**
    * @property ***REMOVED***array***REMOVED*** _points - A private cache of the Points on this Path.
    * @private
    */
    this._points = [];

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** _offset - Default offset for PathFollowers on this path instance.
    * @private
    */
    this._offset = new Phaser.Point();

    /*
    * @property ***REMOVED***Phaser.PathPoint***REMOVED*** _p1 - Used for internal calculations.
    * @private
    */
    this._p1 = new Phaser.PathPoint();

    /*
    * @property ***REMOVED***Phaser.PathPoint***REMOVED*** _p2 - Used for internal calculations.
    * @private
    */
    this._p2 = new Phaser.PathPoint();

    /*
    * @property ***REMOVED***Phaser.PathPoint***REMOVED*** origin - the origin of this path. Used mostly for BRANCH paths.
    * @private
    */
    this._origin = new Phaser.Point();

***REMOVED***;

Phaser.Path.prototype.constructor = Phaser.Path;

Phaser.Path.PathTypes = ***REMOVED******REMOVED***;
Phaser.Path.BranchTypes = ***REMOVED******REMOVED***;
Phaser.Path.CoordinateSystems = ***REMOVED******REMOVED***;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Path.PathTypes.PATH = 0;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Path.PathTypes.BRANCH = 1;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Path.BranchTypes.ATTACHED = 0;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Path.BranchTypes.JOINED = 1;

/**
* Points are relative to the World origin.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Path.CoordinateSystems.WORLD = 1;

/**
* Points are relative to the screen origin.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Path.CoordinateSystems.SCREEN = 2;

/**
* Points are relative to the first point.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Path.CoordinateSystems.OFFSET = 3;

Phaser.Path.prototype = ***REMOVED***

    /**
    * Initialize a Path based on the given coordinate system.
    *
    * @method Phaser.Path#create
    * @param ***REMOVED***number|string***REMOVED*** coordinateSystem - The Phaser.Path.CoordinateSystems type to use.
    * @param ***REMOVED***boolean***REMOVED*** [loops=false] - Should this Path loop or not when a PathFollower reaches the end of it?
    * @return ***REMOVED***Phaser.Path***REMOVED*** This Path object.
    */
    create: function (coordinateSystem, loops) ***REMOVED***

        if (loops === undefined) ***REMOVED*** loops = false; ***REMOVED***

        switch (coordinateSystem)
        ***REMOVED***
            default:
                this.coordinateSystem = Phaser.Path.CoordinateSystems.WORLD;
                break;

            case 2:
            case 'SCREEN_COORDINATES':
                this.coordinateSystem = Phaser.Path.CoordinateSystems.SCREEN;
                break;

            case 3:
            case 'OFFSET_COORDINATES':
                this.coordinateSystem = Phaser.Path.CoordinateSystems.OFFSET;
                break;
        ***REMOVED***

        this.loops = loops;

        this._points = [];

        return this;

    ***REMOVED***,

    /**
    * Clone this Path object. It clones the origin and points data.
    *
    * @method Phaser.Path#clone
    * @return ***REMOVED***Phaser.Path***REMOVED*** The cloned Path.
    */
    clone: function () ***REMOVED***

        var clone = new Phaser.Path(this.coordinateSystem, this.loops);

        this.origin.clone(clone.origin);

        this.points.forEach(function(p) ***REMOVED***
            clone._points.push(p.clone());
        ***REMOVED***);

        return clone;

    ***REMOVED***,

    /**
    * Creates a new PathPoint object, relative to the path origin, and adds it to this path.
    *
    * @method Phaser.Path#addPathPoint
    * @param ***REMOVED***number***REMOVED*** [x=0] - The x position of the PathPoint.
    * @param ***REMOVED***number***REMOVED*** [y=0] - The y position of the PathPoint.
    * @param ***REMOVED***number***REMOVED*** [vx=0] - The vx tangent vector value of the PathPoint.
    * @param ***REMOVED***number***REMOVED*** [vy=0] - The vy tangent vector value of the PathPoint.
    * @param ***REMOVED***number***REMOVED*** [speed=1] - The speed value of the PathPoint.
    * @param ***REMOVED***number***REMOVED*** [data=***REMOVED******REMOVED***] - The data object
    * @param ***REMOVED***number***REMOVED*** [index=null] - The index of the new path point. If not given, will add point to end of point list.
    * @return ***REMOVED***Phaser.PathPoint***REMOVED*** The PathPoint object that was created.
    */
    addPathPoint: function (x, y, vx, vy, speed, data, index) ***REMOVED***

        if (x === undefined) ***REMOVED*** x = 0; ***REMOVED***
        if (y === undefined) ***REMOVED*** y = 0; ***REMOVED***
        if (vx === undefined) ***REMOVED*** vx = 0; ***REMOVED***
        if (vy === undefined) ***REMOVED*** vy = 0; ***REMOVED***

        var pp = new Phaser.PathPoint(x - this.origin.x, y - this.origin.y, vx, vy, speed, data);

        if (index !== null && index !== undefined)
        ***REMOVED***
            this._points.splice(index, 0, pp);
        ***REMOVED***
        else
        ***REMOVED***
            this._points.push(pp);
        ***REMOVED***

        return pp;

    ***REMOVED***,

    /**
    * Remove a PathPoint from this paths point list.
    *
    * @method Phaser.Path#removePathPoint
    * @param ***REMOVED***number***REMOVED*** [index] - The index of the PathPoint to remove.
    * @return ***REMOVED***Phaser.PathPoint***REMOVED*** The removed PathPoint object.
    */
    removePathPoint: function (index) ***REMOVED***

        var p = this.getPathPointReference(index);

        if (p)
        ***REMOVED***
            this._points.splice(index, 1);
        ***REMOVED***

        return p;

    ***REMOVED***,

    /**
    * Set a PathPoint objects position and tangent vector.
    *
    * @method Phaser.Path#setPathPoint
    * @param ***REMOVED***number***REMOVED*** index - The index of the PathPoint in this paths point list.
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of the PathPoint.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of the PathPoint.
    * @param ***REMOVED***number***REMOVED*** [vx] - The x coordinate of the tangent vector to create the curve from.
    * @param ***REMOVED***number***REMOVED*** [vy] - The y coordinate of the tangent vector to create the curve from.
    * @return ***REMOVED***Phaser.PathPoint***REMOVED*** A reference to the PathPoint object that was updated.
    */
    setPathPoint: function (index, x, y, vx, vy) ***REMOVED***

        var p = this.getPathPointReference(index);

        if (p)
        ***REMOVED***
            p.setTo(x, y, vx, vy);
        ***REMOVED***

        return p;

    ***REMOVED***,

    /**
    * Translate all points in a path by the given point.
    *
    * @method Phaser.Path#translatePoints
    * @param ***REMOVED***Phaser.Point|object***REMOVED*** point - A Phaser.Point, or a Point-like Object with public `x` and `y` properties, that will be used to modify all points in this paths point list.
    * @return ***REMOVED***Phaser.Path***REMOVED*** This Path object.
    */
    translatePoints: function (point) ***REMOVED***

        this._points.forEach(function(pnt) ***REMOVED***
            pnt.x += point.x;
            pnt.y += point.y;
        ***REMOVED***);

        return this;

    ***REMOVED***,

    /**
    * Set the Path level offset which will affect all of this paths PathFollowers.
    *
    * @method Phaser.Path#setOffset
    * @param ***REMOVED***number***REMOVED*** x - The x offset.
    * @param ***REMOVED***number***REMOVED*** y - The y offset.
    * @return ***REMOVED***Phaser.Path***REMOVED*** This Path object.
    */
    setOffset: function (x, y) ***REMOVED***

        this._offset.x = x;
        this._offset.y = y;

        return this;

    ***REMOVED***,

    /**
    * Get a point on the the current Path curve.
    *
    * @method Phaser.Path#getPointOnThisCurve
    * @param ***REMOVED***Phaser.Hermite***REMOVED*** curve - A Phaser.Hermite curve object.
    * @param ***REMOVED***number***REMOVED*** [t=0 .. 1.0] - The distance on the curve to get the point from. Where 0 is the start of the curve, and 1 is the end.
    * @return ***REMOVED***Phaser.Point***REMOVED*** A point containing the x and y values at the specified distance (t) value in the curve.
    */
    getPointOnThisCurve: function (curve, t) ***REMOVED***

        if (!curve)
        ***REMOVED***
            return null;
        ***REMOVED***

        var pnt = curve.getPoint(t);

        pnt.x += this._offset.x;
        pnt.y += this._offset.y;

        return pnt;

    ***REMOVED***,

    /**
    * Gets the points on the curve representing the end points of the line segments that make up the curve.
    *
    * @method Phaser.Path#getControlPointsOnThisCurve
    * @param ***REMOVED***Phaser.Hermite***REMOVED*** curve - A Phaser.Hermite curve.
    * @return ***REMOVED***array***REMOVED*** An array of points representing the end points of 10 line segments that make up the curve.
    */
    getControlPointsOnThisCurve: function (curve) ***REMOVED***

        var pnts = Phaser.ArrayUtils.numberArrayStep(0, 1.1, 0.1).map(function(num) ***REMOVED***
            return this.getPointOnThisCurve(curve, num);
        ***REMOVED***, this);

        return pnts;

    ***REMOVED***,

    /**
    * Get a PathPoint from this path. Automatically handles path looping.
    * 
    * The values from the PathPoint are copied into the given PathPoint object, which must
    * be a reference to a pre-existing PathPoint, as it's not returned by this method.
    *
    * @method Phaser.Path#getPathPoint
    * @param ***REMOVED***number***REMOVED*** index - The index of the point in this path to get.
    * @param ***REMOVED***Phaser.PathPoint***REMOVED*** point - A PathPoint object into which the found point object is cloned.
    * @return ***REMOVED***boolean***REMOVED*** false if the index is past the end of the path and it doesn't loop, otherwise true.
    */
    getPathPoint: function (index, point) ***REMOVED***

        var i = this.loops ? index % this._points.length : index;

        //  If index is in the points list range
        if (this._points.length > i)
        ***REMOVED***
            point.copy(this._points[i]);

            switch (this.coordinateSystem)
            ***REMOVED***
                case Phaser.Path.CoordinateSystems.SCREEN:

                    point.x -= this.game.camera.x;
                    point.y -= this.game.camera.y;
                    break;

                case Phaser.Path.CoordinateSystems.OFFSET:

                    point.x += this.origin.x;
                    point.y += this.origin.y;
                    break;
            ***REMOVED***

            return true;
        ***REMOVED***
        else
        ***REMOVED***
            //  The path doesn't loop and the index is out of range, so fail
            return false;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Get a reference to a PathPoint from this Path, handle path looping.
    * 
    * NOTE: because this is a PathPoint reference, it does not take into account the coordinateSystem selected, it will be WORLD, or OFFSET unmodified
    *
    * @method Phaser.Path#getPathPointReference
    * @param ***REMOVED***number***REMOVED*** index - The index of the point in this path to get.
    * @return ***REMOVED***Phaser.PathPoint***REMOVED*** A reference to the PathPoint object in this Path, or null if index is out of range.
    */
    getPathPointReference: function (index) ***REMOVED***

        var i = this.loops ? index % this._points.length : index;

        //  If index is in the points list range
        if (this._points.length > i)
        ***REMOVED***
            return this._points[i];
        ***REMOVED***

        //  The path doesn't loop and the index is out of range, fail
        return null;

    ***REMOVED***,

    /**
    * Get the curve from the given point index to the next.
    * 
    * If the curve has been created previously, use that definition again, otherwise calculate it now.
    *
    * @method Phaser.Path#getCurve
    * @param ***REMOVED***number***REMOVED*** [index=0] - The index of the point in this path to get the curve from.
    * @return ***REMOVED***Phaser.Hermite***REMOVED*** A new Hermite object representing the curve starting at the 'index' path point.
    */
    getCurve: function (index) ***REMOVED***

        if (index === undefined) ***REMOVED*** index = 0; ***REMOVED***

        //  Beginning of the curve
        if (!this.getPathPoint(index, this._p1))
        ***REMOVED***
            return null;
        ***REMOVED***

        //  Has this curve been calculated already?
        if (this._p1.curve)
        ***REMOVED***
            return this._p1.curve;
        ***REMOVED***

        //  End of the curve
        if (!this.getPathPoint(index + 1, this._p2))
        ***REMOVED***
            if (!this._p1.branchPath)
            ***REMOVED***
                return null;
            ***REMOVED***

            //  We joined another Path
            var newPath = this._p1.branchPath;
            var joinIndex = this._p1.branchPointIndex;

            if (!newPath.getPathPoint(joinIndex + 1, this._p2))
            ***REMOVED***
                return null;
            ***REMOVED***
        ***REMOVED***

        //  Create and return the new Hermite object
        this._p1.curve = new Phaser.Hermite(this._p1.x, this._p1.y, this._p2.x, this._p2.y, this._p1.vx, this._p1.vy, this._p2.vx, this._p2.vy);

        this.curvePointIndex = index;

        return this._p1.curve;

    ***REMOVED***,

    /**
    * Find the first matching PathPoint in this path.
    * It works by taking the given PathPoint object, and then iterating through all points
    * in this Path until it finds one with the same values, then returns the index to it.
    *
    * @method Phaser.Path#pointIndex
    * @param ***REMOVED***Phaser.PathPoint***REMOVED*** pathPoint - The PathPoint object that will have its values compared to all the points in this Path.
    * @return ***REMOVED***number***REMOVED*** The index of the PathPoint in this Path if an equal match is found, or -1 if no match is found.
    */
    pointIndex: function (pathPoint) ***REMOVED***

        var l = this._points.length;

        for (var i = 0; i < l; i++)
        ***REMOVED***
            if (this.coordinateSystem === Phaser.Path.CoordinateSystems.OFFSET && i !== 0)
            ***REMOVED***
                if (pathPoint.equals(this._points[i], this._points[0].x, this._points[0].y))
                ***REMOVED***
                    return i;
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                if (pathPoint.equals(this._points[i]))
                ***REMOVED***
                    return i;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return -1;

    ***REMOVED***,

    /**
    * Is the given PathPoint index the end of this path?
    *
    * @method Phaser.Path#atEnd
    * @param ***REMOVED***number***REMOVED*** index - The index of the PathPoint to test.
    * @return ***REMOVED***boolean***REMOVED*** true if index is the last point in this path.
    */
    atEnd: function (index) ***REMOVED***

        //  If the path loops, the end of the path is the end of the last curve
        if (this.loops)
        ***REMOVED***
            return (index === this._points.length);
        ***REMOVED***

        //  If the path doesn't loop, the end of the path is the last point on it
        return (index === this._points.length - 1);

    ***REMOVED***,

    /**
    * The total number of PathPoints in this Path.
    * 
    * @method Phaser.Path#numPoints
    * return ***REMOVED***number***REMOVED*** The total number of PathPoints in this Path.
    */
    numPoints: function () ***REMOVED***

        return this._points.length;

    ***REMOVED***,

    /*
    *  DATA PROCESSING
    */

    /**
    * Process the data associated with a point on this Path.
    * Used by Phaser.PathFollower objects as they pass each control point.
    * 
    * @method Phaser.Path#processData
    * @param ***REMOVED***Phaser.PathFollower***REMOVED*** follower - The PathFollower that is processing the data.
    * @param ***REMOVED***number***REMOVED*** pathPointIndex - The index of the path point to process.
    * @param ***REMOVED***boolean***REMOVED*** reversing - Whether or not the follower is traversing the path in reverse.
    * @return ***REMOVED***Phaser.PathPoint***REMOVED*** The PathPoint that has been processed.
    */
    processData: function (follower, pathPointIndex, reversing) ***REMOVED***

        if (this.getPathPoint(pathPointIndex, this._p1))
        ***REMOVED***
            //  If there is a branch that can be taken from this point, 
            //  trigger an event to decide whether to take it or stay on the current path.
            //  Branches are forwards facing so they are ignored when the follower is reversing.
            if (this._p1.branchPath && !reversing)
            ***REMOVED***
                follower.dispatchEvent(***REMOVED***
                    type: Phaser.PathFollower.EVENT_BRANCH_CHOICE,
                    target: follower,
                    data: this._p1.clone()
                ***REMOVED***);
            ***REMOVED***

            //  If there is information in the data member of this point
            if (this._p1.data && this._p1.data.type)
            ***REMOVED***
                switch (this._p1.data.type)
                ***REMOVED***
                    case Phaser.PathPoint.DATA_PAUSE:

                        follower.pause(this._p1.data.value);
                        break;

                    case Phaser.PathPoint.DATA_COUNTER:

                        // first time past, set the count
                        if (follower.branchCount === 0)
                        ***REMOVED***
                            follower.branchCount = this._p1.data.value;
                        ***REMOVED***
                        else
                        ***REMOVED***
                            //  After that decrease the count
                            follower.branchCount--;

                            if (follower.branchCount <= 0)
                            ***REMOVED***
                                follower.branchCount = 0;

                                //  Trigger event when counter expires
                                follower.dispatchEvent(***REMOVED***
                                    type: Phaser.PathFollower.EVENT_COUNT_FINISH,
                                    target: follower,
                                    data: this._p1.clone()
                                ***REMOVED***);
                            ***REMOVED***
                        ***REMOVED***
                        break;
                ***REMOVED***
            ***REMOVED***

            //  Trigger event when passing any point on the path
            follower.dispatchEvent(***REMOVED***
                type: Phaser.PathFollower.EVENT_REACHED_POINT,
                target: follower,
                data: this._p1.clone()
            ***REMOVED***);
        ***REMOVED***

        return this._p1;

    ***REMOVED***,

    /**
    * If your Path has 3 points or more, this will walk through it and auto-smooth them out.
    * Note: It ignores branches.
    *
    * @method Phaser.Path#smooth
    * @return ***REMOVED***Phaser.Path***REMOVED*** This Path object.
    */
    smooth: function () ***REMOVED***

        if (this._points.length === 0)
        ***REMOVED***
            return this;
        ***REMOVED***

        var i;
        var thisPoint;
        var p1;
        var p2;
        var dx;
        var dy;

        for (i = 1; i < this._points.length - 1; i++)
        ***REMOVED***
            thisPoint = this.getPathPointReference(i);

            p1 = this.getPathPointReference(i - 1);
            p2 = this.getPathPointReference(i + 1);

            dx = p2.x - p1.x;
            dy = p2.y - p1.y;

            thisPoint.setTangent(dx, dy);
        ***REMOVED***

        if (this.loops)
        ***REMOVED***
            i = this._points.length - 1;

            thisPoint = this.getPathPointReference(i);

            p1 = this.getPathPointReference(i - 1);
            p2 = this.getPathPointReference(0);

            dx = p2.x - p1.x;
            dy = p2.y - p1.y;

            thisPoint.setTangent(dx, dy);

            i = 0;

            thisPoint = this.getPathPointReference(i);

            p1 = this.getPathPointReference(this._points.length - 1);
            p2 = this.getPathPointReference(1);

            dx = p2.x - p1.x;
            dy = p2.y - p1.y;

            thisPoint.setTangent(dx, dy);
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Draw the path on given canvas context. Used for debugging.
    * 
    * @method Phaser.Path#debug
    * @param ***REMOVED***CanvasContext2D***REMOVED*** ctx - The canvas context to draw the path on.
    * @param ***REMOVED***boolean***REMOVED*** [active=false] - Whether or not to highlight the active segments of this Path or not.
    * @return ***REMOVED***Phaser.Path***REMOVED*** This Path object.
    */
    debug: function (ctx, active) ***REMOVED***

        var lineColor = '#333333';

        if (active)
        ***REMOVED***
            lineColor = '#ffff00';
        ***REMOVED***

        if (this._points.length === 0)
        ***REMOVED***
            return this;
        ***REMOVED***

        this._p1.setTo(0, 0);

        //  Draw the lines

        var lastPoint = this._points.length;

        if (!this.loops)
        ***REMOVED***
            lastPoint--;
        ***REMOVED***

        var p = new Phaser.PathPoint();

        for (var i = 0; i < lastPoint; i++)
        ***REMOVED***
            var curve = this.getCurve(i);

            this.getPathPoint(i, p);

            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgb(100, 0, 250)';

            ctx.save();

            //  Control Points
            var controlPoints = this.getControlPointsOnThisCurve(curve);

            //  Draw lines
            ctx.beginPath();

            controlPoints.forEach(function(pnt, index) ***REMOVED***

                if (!!pnt)
                ***REMOVED***
                    if (index === 0)
                    ***REMOVED***
                        ctx.moveTo(pnt.x, pnt.y);
                    ***REMOVED***
                    else
                    ***REMOVED***
                        ctx.lineTo(pnt.x, pnt.y);
                    ***REMOVED***
                ***REMOVED***

            ***REMOVED***);

            ctx.stroke();
            ctx.closePath();

            if (p.active)
            ***REMOVED***
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = '#333333';
                ctx.lineWidth = 1;

                //  Copy control points to the point object
                this.getPathPointReference(i).controlPoints = controlPoints;

                controlPoints.forEach(function(pnt) ***REMOVED***

                    ctx.beginPath();

                    ctx.arc(pnt.x, pnt.y, 3, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();

                    ctx.closePath();

                ***REMOVED***);
            ***REMOVED***

            ctx.restore();
        ***REMOVED***
        
        return this;

    ***REMOVED***,

    /**
    * Serializes this Path into a JSON object and returns it.
    * 
    * @methods Phaser.Path#toJSON
    * @return ***REMOVED***Object***REMOVED*** A JSON object representing this Path.
    */
    toJSON: function () ***REMOVED***

        return ***REMOVED***
            name: this.name,
            id: this.id,
            type: this.type,
            coordinateSystem: this.coordinateSystem,
            loops: this.loops,
            speed: 1,
            pointList: this._points.map(function(p) ***REMOVED***
                return p.toJSON();
            ***REMOVED***),
        ***REMOVED***;

    ***REMOVED***

***REMOVED***;

/**
* @property ***REMOVED***Array***REMOVED*** - The list of PathPoints that make up this path.
* @readonly
*/
Object.defineProperty(Phaser.Path.prototype, 'points', ***REMOVED***

    get: function () ***REMOVED***

        return this._points;

    ***REMOVED***

***REMOVED***);

/**
* @property ***REMOVED***number***REMOVED*** - The number of points in this path.
* @readonly
*/
Object.defineProperty(Phaser.Path.prototype, 'length', ***REMOVED***

    get: function () ***REMOVED***

        return this._points.length;

    ***REMOVED***

***REMOVED***);

/**
* @property ***REMOVED***Phaser.Point***REMOVED*** - The origin of the path.
*/
Object.defineProperty(Phaser.Path.prototype, 'origin', ***REMOVED***

    get: function() ***REMOVED***

        return this._origin;

    ***REMOVED***,

    set: function (val) ***REMOVED***

        this._origin.setTo(val.x, val.y);

    ***REMOVED***

***REMOVED***);