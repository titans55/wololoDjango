/* jshint camelcase: false */
/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Ninja Physics Tile constructor.
* A Tile is defined by its width, height and type. It's type can include slope data, such as 45 degree slopes, or convex slopes.
* Understand that for any type including a slope (types 2 to 29) the Tile must be SQUARE, i.e. have an equal width and height.
* Also note that as Tiles are primarily used for levels they have gravity disabled and world bounds collision disabled by default.
*
* Note: This class could be massively optimised and reduced in size. I leave that challenge up to you.
*
* @class Phaser.Physics.Ninja.Tile
* @constructor
* @param ***REMOVED***Phaser.Physics.Ninja.Body***REMOVED*** body - The body that owns this shape.
* @param ***REMOVED***number***REMOVED*** x - The x coordinate to create this shape at.
* @param ***REMOVED***number***REMOVED*** y - The y coordinate to create this shape at.
* @param ***REMOVED***number***REMOVED*** width - The width of this AABB.
* @param ***REMOVED***number***REMOVED*** height - The height of this AABB.
* @param ***REMOVED***number***REMOVED*** [type=1] - The type of Ninja shape to create. 1 = AABB, 2 = Circle or 3 = Tile.
*/
Phaser.Physics.Ninja.Tile = function (body, x, y, width, height, type) ***REMOVED***

    if (type === undefined) ***REMOVED*** type = Phaser.Physics.Ninja.Tile.EMPTY; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Physics.Ninja.Body***REMOVED*** system - A reference to the body that owns this shape.
    */
    this.body = body;

    /**
    * @property ***REMOVED***Phaser.Physics.Ninja***REMOVED*** system - A reference to the physics system.
    */
    this.system = body.system;

    /**
    * @property ***REMOVED***number***REMOVED*** id - The ID of this Tile.
    * @readonly
    */
    this.id = type;

    /**
    * @property ***REMOVED***number***REMOVED*** type - The type of this Tile.
    * @readonly
    */
    this.type = Phaser.Physics.Ninja.Tile.TYPE_EMPTY;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** pos - The position of this object.
    */
    this.pos = new Phaser.Point(x, y);

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** oldpos - The position of this object in the previous update.
    */
    this.oldpos = new Phaser.Point(x, y);

    if (this.id > 1 && this.id < 30)
    ***REMOVED***
        //  Tile Types 2 to 29 require square tile dimensions, so use the width as the base
        height = width;
    ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** xw - Half the width.
    * @readonly
    */
    this.xw = Math.abs(width / 2);

    /**
    * @property ***REMOVED***number***REMOVED*** xw - Half the height.
    * @readonly
    */
    this.yw = Math.abs(height / 2);

    /**
    * @property ***REMOVED***number***REMOVED*** width - The width.
    * @readonly
    */
    this.width = width;

    /**
    * @property ***REMOVED***number***REMOVED*** height - The height.
    * @readonly
    */
    this.height = height;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** velocity - The velocity of this object.
    */
    this.velocity = new Phaser.Point();

    /**
    * @property ***REMOVED***number***REMOVED*** signx - Internal var.
    * @private
    */
    this.signx = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** signy - Internal var.
    * @private
    */
    this.signy = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** sx - Internal var.
    * @private
    */
    this.sx = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** sy - Internal var.
    * @private
    */
    this.sy = 0;

    //  By default Tiles disable gravity and world bounds collision
    this.body.gravityScale = 0;
    this.body.collideWorldBounds = false;

    if (this.id > 0)
    ***REMOVED***
        this.setType(this.id);
    ***REMOVED***

***REMOVED***;

Phaser.Physics.Ninja.Tile.prototype.constructor = Phaser.Physics.Ninja.Tile;

Phaser.Physics.Ninja.Tile.prototype = ***REMOVED***

    /**
    * Updates this objects position.
    *
    * @method Phaser.Physics.Ninja.Tile#integrate
    */
    integrate: function () ***REMOVED***

        var px = this.pos.x;
        var py = this.pos.y;

        this.pos.x += (this.body.drag * this.pos.x) - (this.body.drag * this.oldpos.x);
        this.pos.y += (this.body.drag * this.pos.y) - (this.body.drag * this.oldpos.y) + (this.system.gravity * this.body.gravityScale);

        this.velocity.set(this.pos.x - px, this.pos.y - py);
        this.oldpos.set(px, py);

    ***REMOVED***,

    /**
    * Tiles cannot collide with the world bounds, it's up to you to keep them where you want them. But we need this API stub to satisfy the Body.
    *
    * @method Phaser.Physics.Ninja.Tile#collideWorldBounds
    */
    collideWorldBounds: function () ***REMOVED***

        var dx = this.system.bounds.x - (this.pos.x - this.xw);

        if (0 < dx)
        ***REMOVED***
            this.reportCollisionVsWorld(dx, 0, 1, 0, null);
        ***REMOVED***
        else
        ***REMOVED***
            dx = (this.pos.x + this.xw) - this.system.bounds.right;

            if (0 < dx)
            ***REMOVED***
                this.reportCollisionVsWorld(-dx, 0, -1, 0, null);
            ***REMOVED***
        ***REMOVED***

        var dy = this.system.bounds.y - (this.pos.y - this.yw);

        if (0 < dy)
        ***REMOVED***
            this.reportCollisionVsWorld(0, dy, 0, 1, null);
        ***REMOVED***
        else
        ***REMOVED***
            dy = (this.pos.y + this.yw) - this.system.bounds.bottom;

            if (0 < dy)
            ***REMOVED***
                this.reportCollisionVsWorld(0, -dy, 0, -1, null);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Process a world collision and apply the resulting forces.
    *
    * @method Phaser.Physics.Ninja.Tile#reportCollisionVsWorld
    * @param ***REMOVED***number***REMOVED*** px - The tangent velocity
    * @param ***REMOVED***number***REMOVED*** py - The tangent velocity
    * @param ***REMOVED***number***REMOVED*** dx - Collision normal
    * @param ***REMOVED***number***REMOVED*** dy - Collision normal
    * @param ***REMOVED***number***REMOVED*** obj - Object this Tile collided with
    */
    reportCollisionVsWorld: function (px, py, dx, dy) ***REMOVED***
        var p = this.pos;
        var o = this.oldpos;

        //  Calc velocity
        var vx = p.x - o.x;
        var vy = p.y - o.y;

        //  Find component of velocity parallel to collision normal
        var dp = (vx * dx + vy * dy);
        var nx = dp * dx;   //project velocity onto collision normal

        var ny = dp * dy;   //nx,ny is normal velocity

        var tx = vx - nx;   //px,py is tangent velocity
        var ty = vy - ny;

        //  We only want to apply collision response forces if the object is travelling into, and not out of, the collision
        var b, bx, by, fx, fy;

        if (dp < 0)
        ***REMOVED***
            fx = tx * this.body.friction;
            fy = ty * this.body.friction;

            b = 1 + this.body.bounce;

            bx = (nx * b);
            by = (ny * b);

            if (dx === 1)
            ***REMOVED***
                this.body.touching.left = true;
            ***REMOVED***
            else if (dx === -1)
            ***REMOVED***
                this.body.touching.right = true;
            ***REMOVED***

            if (dy === 1)
            ***REMOVED***
                this.body.touching.up = true;
            ***REMOVED***
            else if (dy === -1)
            ***REMOVED***
                this.body.touching.down = true;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  Moving out of collision, do not apply forces
            bx = by = fx = fy = 0;
        ***REMOVED***

        //  Project object out of collision
        p.x += px;
        p.y += py;

        //  Apply bounce+friction impulses which alter velocity
        o.x += px + bx + fx;
        o.y += py + by + fy;

    ***REMOVED***,

    /**
    * Tiles cannot collide with the world bounds, it's up to you to keep them where you want them. But we need this API stub to satisfy the Body.
    *
    * @method Phaser.Physics.Ninja.Tile#setType
    * @param ***REMOVED***number***REMOVED*** id - The type of Tile this will use, i.e. Phaser.Physics.Ninja.Tile.SLOPE_45DEGpn, Phaser.Physics.Ninja.Tile.CONVEXpp, etc.
    */
    setType: function (id) ***REMOVED***

        if (id === Phaser.Physics.Ninja.Tile.EMPTY)
        ***REMOVED***
            this.clear();
        ***REMOVED***
        else
        ***REMOVED***
            this.id = id;
            this.updateType();
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Sets this tile to be empty.
    *
    * @method Phaser.Physics.Ninja.Tile#clear
    */
    clear: function () ***REMOVED***

        this.id = Phaser.Physics.Ninja.Tile.EMPTY;
        this.updateType();

    ***REMOVED***,

    /**
    * Destroys this Tiles reference to Body and System.
    *
    * @method Phaser.Physics.Ninja.Tile#destroy
    */
    destroy: function () ***REMOVED***

        this.body = null;
        this.system = null;

    ***REMOVED***,

    /**
    * This converts a tile from implicitly-defined (via id), to explicit (via properties).
    * Don't call directly, instead of setType.
    *
    * @method Phaser.Physics.Ninja.Tile#updateType
    * @private
    */
    updateType: function () ***REMOVED***

        if (this.id === 0)
        ***REMOVED***
            //EMPTY
            this.type = Phaser.Physics.Ninja.Tile.TYPE_EMPTY;
            this.signx = 0;
            this.signy = 0;
            this.sx = 0;
            this.sy = 0;

            return true;
        ***REMOVED***

        //tile is non-empty; collide
        if (this.id < Phaser.Physics.Ninja.Tile.TYPE_45DEG)
        ***REMOVED***
            //FULL
            this.type = Phaser.Physics.Ninja.Tile.TYPE_FULL;
            this.signx = 0;
            this.signy = 0;
            this.sx = 0;
            this.sy = 0;
        ***REMOVED***
        else if (this.id < Phaser.Physics.Ninja.Tile.TYPE_CONCAVE)
        ***REMOVED***
            //  45deg
            this.type = Phaser.Physics.Ninja.Tile.TYPE_45DEG;

            if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_45DEGpn)
            ***REMOVED***
                this.signx = 1;
                this.signy = -1;
                this.sx = this.signx / Math.SQRT2;//get slope _unit_ normal
                this.sy = this.signy / Math.SQRT2;//since normal is (1,-1), length is sqrt(1*1 + -1*-1) = sqrt(2)
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_45DEGnn)
            ***REMOVED***
                this.signx = -1;
                this.signy = -1;
                this.sx = this.signx / Math.SQRT2;//get slope _unit_ normal
                this.sy = this.signy / Math.SQRT2;//since normal is (1,-1), length is sqrt(1*1 + -1*-1) = sqrt(2)
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_45DEGnp)
            ***REMOVED***
                this.signx = -1;
                this.signy = 1;
                this.sx = this.signx / Math.SQRT2;//get slope _unit_ normal
                this.sy = this.signy / Math.SQRT2;//since normal is (1,-1), length is sqrt(1*1 + -1*-1) = sqrt(2)
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_45DEGpp)
            ***REMOVED***
                this.signx = 1;
                this.signy = 1;
                this.sx = this.signx / Math.SQRT2;//get slope _unit_ normal
                this.sy = this.signy / Math.SQRT2;//since normal is (1,-1), length is sqrt(1*1 + -1*-1) = sqrt(2)
            ***REMOVED***
            else
            ***REMOVED***
                return false;
            ***REMOVED***
        ***REMOVED***
        else if (this.id < Phaser.Physics.Ninja.Tile.TYPE_CONVEX)
        ***REMOVED***
            //  Concave
            this.type = Phaser.Physics.Ninja.Tile.TYPE_CONCAVE;

            if (this.id === Phaser.Physics.Ninja.Tile.CONCAVEpn)
            ***REMOVED***
                this.signx = 1;
                this.signy = -1;
                this.sx = 0;
                this.sy = 0;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.CONCAVEnn)
            ***REMOVED***
                this.signx = -1;
                this.signy = -1;
                this.sx = 0;
                this.sy = 0;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.CONCAVEnp)
            ***REMOVED***
                this.signx = -1;
                this.signy = 1;
                this.sx = 0;
                this.sy = 0;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.CONCAVEpp)
            ***REMOVED***
                this.signx = 1;
                this.signy = 1;
                this.sx = 0;
                this.sy = 0;
            ***REMOVED***
            else
            ***REMOVED***
                return false;
            ***REMOVED***
        ***REMOVED***
        else if (this.id < Phaser.Physics.Ninja.Tile.TYPE_22DEGs)
        ***REMOVED***
            //  Convex
            this.type = Phaser.Physics.Ninja.Tile.TYPE_CONVEX;

            if (this.id === Phaser.Physics.Ninja.Tile.CONVEXpn)
            ***REMOVED***
                this.signx = 1;
                this.signy = -1;
                this.sx = 0;
                this.sy = 0;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.CONVEXnn)
            ***REMOVED***
                this.signx = -1;
                this.signy = -1;
                this.sx = 0;
                this.sy = 0;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.CONVEXnp)
            ***REMOVED***
                this.signx = -1;
                this.signy = 1;
                this.sx = 0;
                this.sy = 0;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.CONVEXpp)
            ***REMOVED***
                this.signx = 1;
                this.signy = 1;
                this.sx = 0;
                this.sy = 0;
            ***REMOVED***
            else
            ***REMOVED***
                return false;
            ***REMOVED***
        ***REMOVED***
        else if (this.id < Phaser.Physics.Ninja.Tile.TYPE_22DEGb)
        ***REMOVED***
            //  22deg small
            this.type = Phaser.Physics.Ninja.Tile.TYPE_22DEGs;

            if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_22DEGpnS)
            ***REMOVED***
                this.signx = 1;
                this.signy = -1;
                var slen = Math.sqrt(2 * 2 + 1 * 1);
                this.sx = (this.signx * 1) / slen;
                this.sy = (this.signy * 2) / slen;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_22DEGnnS)
            ***REMOVED***
                this.signx = -1;
                this.signy = -1;
                var slen = Math.sqrt(2 * 2 + 1 * 1);
                this.sx = (this.signx * 1) / slen;
                this.sy = (this.signy * 2) / slen;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_22DEGnpS)
            ***REMOVED***
                this.signx = -1;
                this.signy = 1;
                var slen = Math.sqrt(2 * 2 + 1 * 1);
                this.sx = (this.signx * 1) / slen;
                this.sy = (this.signy * 2) / slen;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_22DEGppS)
            ***REMOVED***
                this.signx = 1;
                this.signy = 1;
                var slen = Math.sqrt(2 * 2 + 1 * 1);
                this.sx = (this.signx * 1) / slen;
                this.sy = (this.signy * 2) / slen;
            ***REMOVED***
            else
            ***REMOVED***
                return false;
            ***REMOVED***
        ***REMOVED***
        else if (this.id < Phaser.Physics.Ninja.Tile.TYPE_67DEGs)
        ***REMOVED***
            //  22deg big
            this.type = Phaser.Physics.Ninja.Tile.TYPE_22DEGb;

            if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_22DEGpnB)
            ***REMOVED***
                this.signx = 1;
                this.signy = -1;
                var slen = Math.sqrt(2 * 2 + 1 * 1);
                this.sx = (this.signx * 1) / slen;
                this.sy = (this.signy * 2) / slen;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_22DEGnnB)
            ***REMOVED***
                this.signx = -1;
                this.signy = -1;
                var slen = Math.sqrt(2 * 2 + 1 * 1);
                this.sx = (this.signx * 1) / slen;
                this.sy = (this.signy * 2) / slen;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_22DEGnpB)
            ***REMOVED***
                this.signx = -1;
                this.signy = 1;
                var slen = Math.sqrt(2 * 2 + 1 * 1);
                this.sx = (this.signx * 1) / slen;
                this.sy = (this.signy * 2) / slen;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_22DEGppB)
            ***REMOVED***
                this.signx = 1;
                this.signy = 1;
                var slen = Math.sqrt(2 * 2 + 1 * 1);
                this.sx = (this.signx * 1) / slen;
                this.sy = (this.signy * 2) / slen;
            ***REMOVED***
            else
            ***REMOVED***
                return false;
            ***REMOVED***
        ***REMOVED***
        else if (this.id < Phaser.Physics.Ninja.Tile.TYPE_67DEGb)
        ***REMOVED***
            //  67deg small
            this.type = Phaser.Physics.Ninja.Tile.TYPE_67DEGs;

            if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_67DEGpnS)
            ***REMOVED***
                this.signx = 1;
                this.signy = -1;
                var slen = Math.sqrt(2 * 2 + 1 * 1);
                this.sx = (this.signx * 2) / slen;
                this.sy = (this.signy * 1) / slen;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_67DEGnnS)
            ***REMOVED***
                this.signx = -1;
                this.signy = -1;
                var slen = Math.sqrt(2 * 2 + 1 * 1);
                this.sx = (this.signx * 2) / slen;
                this.sy = (this.signy * 1) / slen;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_67DEGnpS)
            ***REMOVED***
                this.signx = -1;
                this.signy = 1;
                var slen = Math.sqrt(2 * 2 + 1 * 1);
                this.sx = (this.signx * 2) / slen;
                this.sy = (this.signy * 1) / slen;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_67DEGppS)
            ***REMOVED***
                this.signx = 1;
                this.signy = 1;
                var slen = Math.sqrt(2 * 2 + 1 * 1);
                this.sx = (this.signx * 2) / slen;
                this.sy = (this.signy * 1) / slen;
            ***REMOVED***
            else
            ***REMOVED***
                return false;
            ***REMOVED***
        ***REMOVED***
        else if (this.id < Phaser.Physics.Ninja.Tile.TYPE_HALF)
        ***REMOVED***
            //  67deg big
            this.type = Phaser.Physics.Ninja.Tile.TYPE_67DEGb;

            if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_67DEGpnB)
            ***REMOVED***
                this.signx = 1;
                this.signy = -1;
                var slen = Math.sqrt(2 * 2 + 1 * 1);
                this.sx = (this.signx * 2) / slen;
                this.sy = (this.signy * 1) / slen;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_67DEGnnB)
            ***REMOVED***
                this.signx = -1;
                this.signy = -1;
                var slen = Math.sqrt(2 * 2 + 1 * 1);
                this.sx = (this.signx * 2) / slen;
                this.sy = (this.signy * 1) / slen;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_67DEGnpB)
            ***REMOVED***
                this.signx = -1;
                this.signy = 1;
                var slen = Math.sqrt(2 * 2 + 1 * 1);
                this.sx = (this.signx * 2) / slen;
                this.sy = (this.signy * 1) / slen;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.SLOPE_67DEGppB)
            ***REMOVED***
                this.signx = 1;
                this.signy = 1;
                var slen = Math.sqrt(2 * 2 + 1 * 1);
                this.sx = (this.signx * 2) / slen;
                this.sy = (this.signy * 1) / slen;
            ***REMOVED***
            else
            ***REMOVED***
                return false;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  Half-full tile
            this.type = Phaser.Physics.Ninja.Tile.TYPE_HALF;

            if (this.id === Phaser.Physics.Ninja.Tile.HALFd)
            ***REMOVED***
                this.signx = 0;
                this.signy = -1;
                this.sx = this.signx;
                this.sy = this.signy;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.HALFu)
            ***REMOVED***
                this.signx = 0;
                this.signy = 1;
                this.sx = this.signx;
                this.sy = this.signy;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.HALFl)
            ***REMOVED***
                this.signx = 1;
                this.signy = 0;
                this.sx = this.signx;
                this.sy = this.signy;
            ***REMOVED***
            else if (this.id === Phaser.Physics.Ninja.Tile.HALFr)
            ***REMOVED***
                this.signx = -1;
                this.signy = 0;
                this.sx = this.signx;
                this.sy = this.signy;
            ***REMOVED***
            else
            ***REMOVED***
                return false;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* @name Phaser.Physics.Ninja.Tile#x
* @property ***REMOVED***number***REMOVED*** x - The x position.
*/
Object.defineProperty(Phaser.Physics.Ninja.Tile.prototype, "x", ***REMOVED***

    get: function () ***REMOVED***
        return this.pos.x - this.xw;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this.pos.x = value;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.Ninja.Tile#y
* @property ***REMOVED***number***REMOVED*** y - The y position.
*/
Object.defineProperty(Phaser.Physics.Ninja.Tile.prototype, "y", ***REMOVED***

    get: function () ***REMOVED***
        return this.pos.y - this.yw;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this.pos.y = value;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.Ninja.Tile#bottom
* @property ***REMOVED***number***REMOVED*** bottom - The bottom value of this Body (same as Body.y + Body.height)
* @readonly
*/
Object.defineProperty(Phaser.Physics.Ninja.Tile.prototype, "bottom", ***REMOVED***

    get: function () ***REMOVED***
        return this.pos.y + this.yw;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.Ninja.Tile#right
* @property ***REMOVED***number***REMOVED*** right - The right value of this Body (same as Body.x + Body.width)
* @readonly
*/
Object.defineProperty(Phaser.Physics.Ninja.Tile.prototype, "right", ***REMOVED***

    get: function () ***REMOVED***
        return this.pos.x + this.xw;
    ***REMOVED***

***REMOVED***);

Phaser.Physics.Ninja.Tile.EMPTY = 0;
Phaser.Physics.Ninja.Tile.FULL = 1;//fullAABB tile
Phaser.Physics.Ninja.Tile.SLOPE_45DEGpn = 2;//45-degree triangle, whose normal is (+ve,-ve)
Phaser.Physics.Ninja.Tile.SLOPE_45DEGnn = 3;//(+ve,+ve)
Phaser.Physics.Ninja.Tile.SLOPE_45DEGnp = 4;//(-ve,+ve)
Phaser.Physics.Ninja.Tile.SLOPE_45DEGpp = 5;//(-ve,-ve)
Phaser.Physics.Ninja.Tile.CONCAVEpn = 6;//1/4-circle cutout
Phaser.Physics.Ninja.Tile.CONCAVEnn = 7;
Phaser.Physics.Ninja.Tile.CONCAVEnp = 8;
Phaser.Physics.Ninja.Tile.CONCAVEpp = 9;
Phaser.Physics.Ninja.Tile.CONVEXpn = 10;//1/4/circle
Phaser.Physics.Ninja.Tile.CONVEXnn = 11;
Phaser.Physics.Ninja.Tile.CONVEXnp = 12;
Phaser.Physics.Ninja.Tile.CONVEXpp = 13;
Phaser.Physics.Ninja.Tile.SLOPE_22DEGpnS = 14;//22.5 degree slope
Phaser.Physics.Ninja.Tile.SLOPE_22DEGnnS = 15;
Phaser.Physics.Ninja.Tile.SLOPE_22DEGnpS = 16;
Phaser.Physics.Ninja.Tile.SLOPE_22DEGppS = 17;
Phaser.Physics.Ninja.Tile.SLOPE_22DEGpnB = 18;
Phaser.Physics.Ninja.Tile.SLOPE_22DEGnnB = 19;
Phaser.Physics.Ninja.Tile.SLOPE_22DEGnpB = 20;
Phaser.Physics.Ninja.Tile.SLOPE_22DEGppB = 21;
Phaser.Physics.Ninja.Tile.SLOPE_67DEGpnS = 22;//67.5 degree slope
Phaser.Physics.Ninja.Tile.SLOPE_67DEGnnS = 23;
Phaser.Physics.Ninja.Tile.SLOPE_67DEGnpS = 24;
Phaser.Physics.Ninja.Tile.SLOPE_67DEGppS = 25;
Phaser.Physics.Ninja.Tile.SLOPE_67DEGpnB = 26;
Phaser.Physics.Ninja.Tile.SLOPE_67DEGnnB = 27;
Phaser.Physics.Ninja.Tile.SLOPE_67DEGnpB = 28;
Phaser.Physics.Ninja.Tile.SLOPE_67DEGppB = 29;
Phaser.Physics.Ninja.Tile.HALFd = 30;//half-full tiles
Phaser.Physics.Ninja.Tile.HALFr = 31;
Phaser.Physics.Ninja.Tile.HALFu = 32;
Phaser.Physics.Ninja.Tile.HALFl = 33;

Phaser.Physics.Ninja.Tile.TYPE_EMPTY = 0;
Phaser.Physics.Ninja.Tile.TYPE_FULL = 1;
Phaser.Physics.Ninja.Tile.TYPE_45DEG = 2;
Phaser.Physics.Ninja.Tile.TYPE_CONCAVE = 6;
Phaser.Physics.Ninja.Tile.TYPE_CONVEX = 10;
Phaser.Physics.Ninja.Tile.TYPE_22DEGs = 14;
Phaser.Physics.Ninja.Tile.TYPE_22DEGb = 18;
Phaser.Physics.Ninja.Tile.TYPE_67DEGs = 22;
Phaser.Physics.Ninja.Tile.TYPE_67DEGb = 26;
Phaser.Physics.Ninja.Tile.TYPE_HALF = 30;
