/**
* @author       Richard Davey <rich@photonstorm.com>
* @author       Pete Baron <pete@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The PathPoint class contains data and functions for each point on a Path.
*
* @class Phaser.PathPoint
* @constructor
* @param ***REMOVED***number***REMOVED*** x - The x coordinate of the PathPoint.
* @param ***REMOVED***number***REMOVED*** y - The y coordinate of the PathPoint.
* @param ***REMOVED***number***REMOVED*** vx - The x coordinate of the tangent vector to create the curve from.
* @param ***REMOVED***number***REMOVED*** vy - The y coordinate of the tangent vector to create the curve from.
* @param ***REMOVED***number***REMOVED*** [speed=1] - The speed multiplier for PathFollowers on this Path segment.
* @param ***REMOVED***object***REMOVED*** [data] - The data associated with this point, e.g.: ***REMOVED*** type: PathPoint.DATA_VALUE, value: XXX ***REMOVED***
* @param ***REMOVED***Phaser.Path***REMOVED*** [branchPath] - A branched path which is attached to this point.
* @param ***REMOVED***number***REMOVED*** [branchPointIndex] - The index where the branch is attached to on the new path.
*/
Phaser.PathPoint = function (x, y, vx, vy, speed, data, branchPath, branchPointIndex) ***REMOVED***

    if (speed === undefined) ***REMOVED*** speed = 1; ***REMOVED***
    if (data === undefined) ***REMOVED*** data = ***REMOVED*** type: 0, value: 0 ***REMOVED***; ***REMOVED***
    if (branchPath === undefined) ***REMOVED*** branchPath = null; ***REMOVED***
    if (branchPointIndex === undefined) ***REMOVED*** branchPointIndex = 0; ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** x - The x coordinate of the PathPoint.
    */
    this.x = x;

    /**
    * @property ***REMOVED***number***REMOVED*** y - The y coordinate of the PathPoint.
    */
    this.y = y;

    /**
    * @property ***REMOVED***number***REMOVED*** vx - The x coordinate of the tangent vector to create the curve from.
    */
    this.vx = vx;

    /**
    * @property ***REMOVED***number***REMOVED*** vy - The y coordinate of the tangent vector to create the curve from.
    */
    this.vy = vy;

    /**
    * @property ***REMOVED***number***REMOVED*** speed - The speed multiplier for PathFollowers on this path segment.
    */
    this.speed = speed;

    /**
    * @property ***REMOVED***object***REMOVED*** data - Data associated with this point eg: ***REMOVED*** type: PathPoint.DATA_VALUE, value: XXX ***REMOVED***
    */
    this.data = data;

    /**
    * @property ***REMOVED***Phaser.Path***REMOVED*** branchPath - A branched path which is attached at this point.
    */
    this.branchPath = branchPath;

    /**
    * @property ***REMOVED***number***REMOVED*** branchPointIndex - The index where the branch is attached to on the new path.
    */
    this.branchPointIndex = branchPointIndex;

    /**
    * @property ***REMOVED***number***REMOVED*** branchType - The branch type of the path this point is on. Either 0 (attached) or 1 (joined)
    */
    this.branchType = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** curve - Once the Hermite curve is calculated, store it to avoid recalculation later.
    * @protected
    */
    this.curve = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** active - Is this point a selected (or active) point?
    * @warn For Path Editor use only
    */
    this.active = false;

    /**
    * @property ***REMOVED***array***REMOVED*** controlPoints - A list of Phaser.Point objects representing the control points on the segment.
    * @warn For Path Editor use only
    */
    this.controlPoints = null;

***REMOVED***;

Phaser.PathPoint.prototype.constructor = Phaser.PathPoint;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.PathPoint.DATA_NONE = 0;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.PathPoint.DATA_PAUSE = 1;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.PathPoint.DATA_VALUE = 2;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.PathPoint.DATA_COUNTER = 3;

Phaser.PathPoint.prototype = ***REMOVED***

    /**
    * Sets the x, y and optionally vx and vy properties of this PathPoint.
    * 
    * @method Phaser.PathPoint#setTo
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of the PathPoint.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of the PathPoint.
    * @param ***REMOVED***number***REMOVED*** [vx] - The x coordinate of the tangent vector to create the curve from.
    * @param ***REMOVED***number***REMOVED*** [vy] - The y coordinate of the tangent vector to create the curve from.
    * @return ***REMOVED***Phaser.PathPoint***REMOVED*** This object.
    */
    setTo: function (x, y, vx, vy) ***REMOVED***

        this.x = x;
        this.y = y;

        if (vx !== undefined)
        ***REMOVED***
            this.vx = vx;
        ***REMOVED***

        if (vy !== undefined)
        ***REMOVED***
            this.vy = vy;
        ***REMOVED***

        //  Invalidate the pre-calculated curve to force it to recalculate with these new settings
        this.curve = null;

        return this;

    ***REMOVED***,

    /**
    * Sets the tangent vector properties of this PathPoint.
    * 
    * @method Phaser.PathPoint#setTangent
    * @param ***REMOVED***number***REMOVED*** vx - The x coordinate of the tangent vector to create the curve from.
    * @param ***REMOVED***number***REMOVED*** vy - The y coordinate of the tangent vector to create the curve from.
    * @return ***REMOVED***Phaser.PathPoint***REMOVED*** This object.
    */
    setTangent: function (vx, vy) ***REMOVED***

        this.vx = vx;
        this.vy = vy;

        //  Invalidate the pre-calculated curve to force it to recalculate with these new settings
        this.curve = null;

        return this;

    ***REMOVED***,

    /**
    * Creates a clone of this PathPoint object.
    *
    * @method Phaser.PathPoint#clone
    * @param ***REMOVED***Phaser.PathPoint***REMOVED*** [out] - An optional PathPoint object into which this object is cloned. If no object is provided a new PathPoint is created.
    * @return ***REMOVED***Phaser.PathPoint***REMOVED*** A clone of this PathPoint.
    */
    clone: function (out) ***REMOVED***

        if (out === undefined) ***REMOVED*** out = new Phaser.PathPoint(); ***REMOVED***

        return out.copy(this);

    ***REMOVED***,

    /**
    * Copies all of the values from the given PathPoint object into this PathPoint.
    * The source PathPoint is untouched by this operation.
    *
    * @method Phaser.PathPoint#copy
    * @param ***REMOVED***Phaser.PathPoint***REMOVED*** source - The PathPoint object to copy the values from.
    * @return ***REMOVED***Phaser.PathPoint***REMOVED*** This PathPoint object.
    */
    copy: function (source) ***REMOVED***

        this.x = source.x;
        this.y = source.y;
        this.vx = source.vx;
        this.vy = source.vy;
        this.speed = source.speed;
        this.data = source.data;
        this.branchPath = source.branchPath;
        this.branchPointIndex = source.branchPointIndex;
        this.curve = null;
        this.active = source.active;

        return this;

    ***REMOVED***,

    /**
    * Compare this PathPoint with another PathPoint object and return `true` 
    * if they have the same `x`, `y` and `speed` properties, after taking the optional
    * offset values into consideration.
    *
    * @method Phaser.PathPoint#equals
    * @param ***REMOVED***Phaser.PathPoint***REMOVED*** pathPoint - The PathPoint to compare against this PathPoint.
    * @param ***REMOVED***number***REMOVED*** [offsetX=0] - A value to apply to the x coordinate before comparison.
    * @param ***REMOVED***number***REMOVED*** [offsetY=0] - A value to apply to the y coordinate before comparison.
    * @return ***REMOVED***boolean***REMOVED*** True if the two PathPoint objects match, after the offsets are applied, or false if they don't.
    */
    equals: function (pathPoint, offsetX, offsetY) ***REMOVED***

        if (offsetX === undefined) ***REMOVED*** offsetX = 0; ***REMOVED***
        if (offsetY === undefined) ***REMOVED*** offsetY = 0; ***REMOVED***

        return (this.x === pathPoint.x + offsetX && 
                this.y === pathPoint.y + offsetY && 
                this.speed === pathPoint.speed);

    ***REMOVED***,

    /**
    * Serializes this PathPoint into a JSON object and returns it.
    * 
    * @method Phaser.PathPoint#toJSON
    * @return ***REMOVED***Object***REMOVED*** A JSON object representing this PathPoint.
    */
    toJSON: function () ***REMOVED***

        return ***REMOVED***
            x: this.x,
            y: this.y,
            vx: this.vx,
            vy: this.vy,
            speed: this.speed,
            data: this.data,
            branchPath: !!this.branchPath ? this.branchPath.name : null,
            branchPointIndex: this.branchPointIndex,
            branchType: this.branchType
        ***REMOVED***;

    ***REMOVED***

***REMOVED***;