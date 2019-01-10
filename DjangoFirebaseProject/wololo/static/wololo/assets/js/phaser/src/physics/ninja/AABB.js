/* jshint camelcase: false */
/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Ninja Physics AABB constructor.
* Note: This class could be massively optimised and reduced in size. I leave that challenge up to you.
*
* @class Phaser.Physics.Ninja.AABB
* @constructor
* @param ***REMOVED***Phaser.Physics.Ninja.Body***REMOVED*** body - The body that owns this shape.
* @param ***REMOVED***number***REMOVED*** x - The x coordinate to create this shape at.
* @param ***REMOVED***number***REMOVED*** y - The y coordinate to create this shape at.
* @param ***REMOVED***number***REMOVED*** width - The width of this AABB.
* @param ***REMOVED***number***REMOVED*** height - The height of this AABB.
*/
Phaser.Physics.Ninja.AABB = function (body, x, y, width, height) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Physics.Ninja.Body***REMOVED*** system - A reference to the body that owns this shape.
    */
    this.body = body;

    /**
    * @property ***REMOVED***Phaser.Physics.Ninja***REMOVED*** system - A reference to the physics system.
    */
    this.system = body.system;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** pos - The position of this object.
    */
    this.pos = new Phaser.Point(x, y);

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** oldpos - The position of this object in the previous update.
    */
    this.oldpos = new Phaser.Point(x, y);

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
    * @property ***REMOVED***number***REMOVED*** oH - Internal var.
    * @private
    */
    this.oH = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** oV - Internal var.
    * @private
    */
    this.oV = 0;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** velocity - The velocity of this object.
    */
    this.velocity = new Phaser.Point();

    /**
    * @property ***REMOVED***object***REMOVED*** aabbTileProjections - All of the collision response handlers.
    */
    this.aabbTileProjections = ***REMOVED******REMOVED***;

    this.aabbTileProjections[Phaser.Physics.Ninja.Tile.TYPE_FULL] = this.projAABB_Full;
    this.aabbTileProjections[Phaser.Physics.Ninja.Tile.TYPE_45DEG] = this.projAABB_45Deg;
    this.aabbTileProjections[Phaser.Physics.Ninja.Tile.TYPE_CONCAVE] = this.projAABB_Concave;
    this.aabbTileProjections[Phaser.Physics.Ninja.Tile.TYPE_CONVEX] = this.projAABB_Convex;
    this.aabbTileProjections[Phaser.Physics.Ninja.Tile.TYPE_22DEGs] = this.projAABB_22DegS;
    this.aabbTileProjections[Phaser.Physics.Ninja.Tile.TYPE_22DEGb] = this.projAABB_22DegB;
    this.aabbTileProjections[Phaser.Physics.Ninja.Tile.TYPE_67DEGs] = this.projAABB_67DegS;
    this.aabbTileProjections[Phaser.Physics.Ninja.Tile.TYPE_67DEGb] = this.projAABB_67DegB;
    this.aabbTileProjections[Phaser.Physics.Ninja.Tile.TYPE_HALF] = this.projAABB_Half;

***REMOVED***;

Phaser.Physics.Ninja.AABB.prototype.constructor = Phaser.Physics.Ninja.AABB;

Phaser.Physics.Ninja.AABB.COL_NONE = 0;
Phaser.Physics.Ninja.AABB.COL_AXIS = 1;
Phaser.Physics.Ninja.AABB.COL_OTHER = 2;

Phaser.Physics.Ninja.AABB.prototype = ***REMOVED***

    /**
    * Updates this AABBs position.
    *
    * @method Phaser.Physics.Ninja.AABB#integrate
    */
    integrate: function () ***REMOVED***

        var px = this.pos.x;
        var py = this.pos.y;

        //  integrate
        this.pos.x += (this.body.drag * this.pos.x) - (this.body.drag * this.oldpos.x);
        this.pos.y += (this.body.drag * this.pos.y) - (this.body.drag * this.oldpos.y) + (this.system.gravity * this.body.gravityScale);

        //  store
        this.velocity.set(this.pos.x - px, this.pos.y - py);
        this.oldpos.set(px, py);

    ***REMOVED***,
    
    /**
     * Process a collision partner-agnostic collision response and apply the resulting forces.
     * 
     * @method Phaser.Physics.Ninja.AABB#reportCollision
     * @param ***REMOVED***number***REMOVED*** px - The tangent velocity
     * @param ***REMOVED***number***REMOVED*** py - The tangent velocity
     * @param ***REMOVED***number***REMOVED*** dx - Collision normal
     * @param ***REMOVED***number***REMOVED*** dy - Collision normal
     */
    reportCollision: function(px, py, dx, dy) ***REMOVED***

        var p = this.pos;
        var o = this.oldpos;

        //  Calc velocity
        var vx = p.x - o.x;
        var vy = p.y - o.y;

        //  Find component of velocity parallel to collision normal
        var dp = (vx * dx + vy * dy);
        var nx = dp * dx;   //project velocity onto collision normal

        var ny = dp * dy;   //nx,ny is normal velocity

        var tx = vx - nx;   //tx,ty is tangent velocity
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
    * Process a world collision and apply the resulting forces.
    *
    * @method Phaser.Physics.Ninja.AABB#reportCollisionVsWorld
    * @param ***REMOVED***number***REMOVED*** px - The tangent velocity
    * @param ***REMOVED***number***REMOVED*** py - The tangent velocity
    * @param ***REMOVED***number***REMOVED*** dx - Collision normal
    * @param ***REMOVED***number***REMOVED*** dy - Collision normal
    */
    reportCollisionVsWorld: function (px, py, dx, dy) ***REMOVED***

        this.reportCollision(px,py,dx,dy);
    ***REMOVED***,

    /**
    * @method Phaser.Physics.Ninja.AABB#reverse
    */
    reverse: function () ***REMOVED***

        var vx = this.pos.x - this.oldpos.x;
        var vy = this.pos.y - this.oldpos.y;

        if (this.oldpos.x < this.pos.x)
        ***REMOVED***
            this.oldpos.x = this.pos.x + vx;
            // this.oldpos.x = this.pos.x + (vx + 1 + this.body.bounce);
        ***REMOVED***
        else if (this.oldpos.x > this.pos.x)
        ***REMOVED***
            this.oldpos.x = this.pos.x - vx;
            // this.oldpos.x = this.pos.x - (vx + 1 + this.body.bounce);
        ***REMOVED***

        if (this.oldpos.y < this.pos.y)
        ***REMOVED***
            this.oldpos.y = this.pos.y + vy;
            // this.oldpos.y = this.pos.y + (vy + 1 + this.body.bounce);
        ***REMOVED***
        else if (this.oldpos.y > this.pos.y)
        ***REMOVED***
            this.oldpos.y = this.pos.y - vy;
            // this.oldpos.y = this.pos.y - (vy + 1 + this.body.bounce);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Process a body collision and apply the resulting forces. Still very much WIP and doesn't work fully. Feel free to fix!
    *
    * @method Phaser.Physics.Ninja.AABB#reportCollisionVsBody
    * @param ***REMOVED***number***REMOVED*** px - The tangent velocity
    * @param ***REMOVED***number***REMOVED*** py - The tangent velocity
    * @param ***REMOVED***number***REMOVED*** dx - Collision normal
    * @param ***REMOVED***number***REMOVED*** dy - Collision normal
    * @param ***REMOVED***number***REMOVED*** obj - Object this AABB collided with
    */
    reportCollisionVsBody: function (px, py, dx, dy, obj) ***REMOVED***

        //  We only want to apply collision response forces if the object is travelling into, and not out of, the collision
        if (this.body.immovable && obj.body.immovable)
        ***REMOVED***
            //  Split the separation then return, no forces applied as they come to a stand-still
            px *= 0.5;
            py *= 0.5;

            this.pos.add(px, py);
            this.oldpos.set(this.pos.x, this.pos.y);

            obj.pos.subtract(px, py);
            obj.oldpos.set(obj.pos.x, obj.pos.y);

            return;
        ***REMOVED***
        else if (!this.body.immovable && !obj.body.immovable)
        ***REMOVED***
            //  separate
            px *= 0.5;
            py *= 0.5;

            this.reportCollision(px, py, dx, dy);
            obj.reportCollision(-px, -py, -dx, -dy);
        ***REMOVED***
        else if (!this.body.immovable)
        ***REMOVED***
            this.reportCollision(px,py,dx,dy);
        ***REMOVED***
        else if (!obj.body.immovable)
        ***REMOVED***
            obj.reportCollision(-px, -py, -dx, -dy);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Collides this AABB against the world bounds.
    *
    * @method Phaser.Physics.Ninja.AABB#collideWorldBounds
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
    * Collides this AABB against a AABB.
    *
    * @method Phaser.Physics.Ninja.AABB#collideAABBVsAABB
    * @param ***REMOVED***Phaser.Physics.Ninja.AABB***REMOVED*** aabb - The AABB to collide against.
    */
    collideAABBVsAABB: function (aabb) ***REMOVED***

        var pos = this.pos;
        var c = aabb;

        var tx = c.pos.x;
        var ty = c.pos.y;
        var txw = c.xw;
        var tyw = c.yw;

        var dx = pos.x - tx;//tile->obj delta
        var px = (txw + this.xw) - Math.abs(dx);//penetration depth in x

        if (0 < px)
        ***REMOVED***
            var dy = pos.y - ty;//tile->obj delta
            var py = (tyw + this.yw) - Math.abs(dy);//pen depth in y

            if (0 < py)
            ***REMOVED***
                //object may be colliding with tile; call tile-specific collision function

                //calculate projection vectors
                if (px < py)
                ***REMOVED***
                    //project in x
                    if (dx < 0)
                    ***REMOVED***
                        //project to the left
                        px *= -1;
                        py = 0;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        //proj to right
                        py = 0;
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    //project in y
                    if (dy < 0)
                    ***REMOVED***
                        //project up
                        px = 0;
                        py *= -1;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        //project down
                        px = 0;
                    ***REMOVED***
                ***REMOVED***

                var l = Math.sqrt(px * px + py * py);
                this.reportCollisionVsBody(px, py, px / l, py / l, c);

                return Phaser.Physics.Ninja.AABB.COL_AXIS;

            ***REMOVED***
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Collides this AABB against a Tile.
    *
    * @method Phaser.Physics.Ninja.AABB#collideAABBVsTile
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** tile - The Tile to collide against.
    */
    collideAABBVsTile: function (tile) ***REMOVED***

        var dx = this.pos.x - tile.pos.x;               //  tile->obj delta
        var px = (tile.xw + this.xw) - Math.abs(dx);    //  penetration depth in x

        if (0 < px)
        ***REMOVED***
            var dy = this.pos.y - tile.pos.y;               //  tile->obj delta
            var py = (tile.yw + this.yw) - Math.abs(dy);    //  pen depth in y

            if (0 < py)
            ***REMOVED***
                //  Calculate projection vectors
                if (px < py)
                ***REMOVED***
                    //  Project in x
                    if (dx < 0)
                    ***REMOVED***
                        //  Project to the left
                        px *= -1;
                        py = 0;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        //  Project to the right
                        py = 0;
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    //  Project in y
                    if (dy < 0)
                    ***REMOVED***
                        //  Project up
                        px = 0;
                        py *= -1;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        //  Project down
                        px = 0;
                    ***REMOVED***
                ***REMOVED***

                //  Object may be colliding with tile; call tile-specific collision function
                return this.resolveTile(px, py, this, tile);
            ***REMOVED***
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Resolves tile collision.
    *
    * @method Phaser.Physics.Ninja.AABB#resolveTile
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***Phaser.Physics.Ninja.AABB***REMOVED*** body - The AABB involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** tile - The Tile involved in the collision.
    * @return ***REMOVED***boolean***REMOVED*** True if the collision was processed, otherwise false.
    */
    resolveTile: function (x, y, body, tile) ***REMOVED***

        if (0 < tile.id)
        ***REMOVED***
            return this.aabbTileProjections[tile.type](x, y, body, tile);
        ***REMOVED***
        else
        ***REMOVED***
            // console.warn("Ninja.AABB.resolveTile was called with an empty (or unknown) tile!: id=" + tile.id + ")");
            return false;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Resolves Full tile collision.
    *
    * @method Phaser.Physics.Ninja.AABB#projAABB_Full
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***Phaser.Physics.Ninja.AABB***REMOVED*** obj - The AABB involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***number***REMOVED*** The result of the collision.
    */
    projAABB_Full: function (x, y, obj, t) ***REMOVED***

        var l = Math.sqrt(x * x + y * y);
        obj.reportCollisionVsWorld(x, y, x / l, y / l, t);

        return Phaser.Physics.Ninja.AABB.COL_AXIS;

    ***REMOVED***,

    /**
    * Resolves Half tile collision.
    *
    * @method Phaser.Physics.Ninja.AABB#projAABB_Half
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***Phaser.Physics.Ninja.AABB***REMOVED*** obj - The AABB involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***number***REMOVED*** The result of the collision.
    */
    projAABB_Half: function (x, y, obj, t) ***REMOVED***

        //signx or signy must be 0; the other must be -1 or 1
        //calculate the projection vector for the half-edge, and then
        //(if collision is occuring) pick the minimum

        var sx = t.signx;
        var sy = t.signy;

        var ox = (obj.pos.x - (sx*obj.xw)) - t.pos.x;//this gives is the coordinates of the innermost
        var oy = (obj.pos.y - (sy*obj.yw)) - t.pos.y;//point on the AABB, relative to the tile center

        //we perform operations analogous to the 45deg tile, except we're using
        //an axis-aligned slope instead of an angled one..

        //if the dotprod of (ox,oy) and (sx,sy) is negative, the corner is in the slope
        //and we need toproject it out by the magnitude of the projection of (ox,oy) onto (sx,sy)
        var dp = (ox*sx) + (oy*sy);

        if (dp < 0)
        ***REMOVED***
            //collision; project delta onto slope and use this to displace the object
            sx *= -dp;//(sx,sy) is now the projection vector
            sy *= -dp;

            var lenN = Math.sqrt(sx*sx + sy*sy);
            var lenP = Math.sqrt(x*x + y*y);

            if (lenP < lenN)
            ***REMOVED***
                //project along axis; note that we're assuming that this tile is horizontal OR vertical
                //relative to the AABB's current tile, and not diagonal OR the current tile.
                obj.reportCollisionVsWorld(x,y,x/lenP, y/lenP, t);

                return Phaser.Physics.Ninja.AABB.COL_AXIS;
            ***REMOVED***
            else
            ***REMOVED***
                //note that we could use -= instead of -dp
                obj.reportCollisionVsWorld(sx,sy,t.signx, t.signy, t);

                return Phaser.Physics.Ninja.AABB.COL_OTHER;
            ***REMOVED***
        ***REMOVED***

        return Phaser.Physics.Ninja.AABB.COL_NONE;

    ***REMOVED***,

    /**
    * Resolves 45 Degree tile collision.
    *
    * @method Phaser.Physics.Ninja.AABB#projAABB_45Deg
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***Phaser.Physics.Ninja.AABB***REMOVED*** obj - The AABB involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***number***REMOVED*** The result of the collision.
    */
    projAABB_45Deg: function (x, y, obj, t) ***REMOVED***

        var signx = t.signx;
        var signy = t.signy;

        var ox = (obj.pos.x - (signx*obj.xw)) - t.pos.x;//this gives is the coordinates of the innermost
        var oy = (obj.pos.y - (signy*obj.yw)) - t.pos.y;//point on the AABB, relative to the tile center

        var sx = t.sx;
        var sy = t.sy;

        //if the dotprod of (ox,oy) and (sx,sy) is negative, the corner is in the slope
        //and we need toproject it out by the magnitude of the projection of (ox,oy) onto (sx,sy)
        var dp = (ox*sx) + (oy*sy);

        if (dp < 0)
        ***REMOVED***
            //collision; project delta onto slope and use this to displace the object
            sx *= -dp;//(sx,sy) is now the projection vector
            sy *= -dp;

            var lenN = Math.sqrt(sx*sx + sy*sy);
            var lenP = Math.sqrt(x*x + y*y);

            if (lenP < lenN)
            ***REMOVED***
                //project along axis
                obj.reportCollisionVsWorld(x,y,x/lenP, y/lenP, t);

                return Phaser.Physics.Ninja.AABB.COL_AXIS;
            ***REMOVED***
            else
            ***REMOVED***
                //project along slope
                obj.reportCollisionVsWorld(sx,sy,t.sx,t.sy);

                return Phaser.Physics.Ninja.AABB.COL_OTHER;
            ***REMOVED***
        ***REMOVED***

        return Phaser.Physics.Ninja.AABB.COL_NONE;
    ***REMOVED***,

    /**
    * Resolves 22 Degree tile collision.
    *
    * @method Phaser.Physics.Ninja.AABB#projAABB_22DegS
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***Phaser.Physics.Ninja.AABB***REMOVED*** obj - The AABB involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***number***REMOVED*** The result of the collision.
    */
    projAABB_22DegS: function (x, y, obj, t) ***REMOVED***

        var signx = t.signx;
        var signy = t.signy;

        //first we need to check to make sure we're colliding with the slope at all
        var py = obj.pos.y - (signy*obj.yw);
        var penY = t.pos.y - py;//this is the vector from the innermost point on the box to the highest point on
                                //the tile; if it is positive, this means the box is above the tile and
                                //no collision is occuring
        if (0 < (penY*signy))
        ***REMOVED***
            var ox = (obj.pos.x - (signx*obj.xw)) - (t.pos.x + (signx*t.xw));//this gives is the coordinates of the innermost
            var oy = (obj.pos.y - (signy*obj.yw)) - (t.pos.y - (signy*t.yw));//point on the AABB, relative to a point on the slope

            var sx = t.sx;//get slope unit normal
            var sy = t.sy;

            //if the dotprod of (ox,oy) and (sx,sy) is negative, the corner is in the slope
            //and we need toproject it out by the magnitude of the projection of (ox,oy) onto (sx,sy)
            var dp = (ox*sx) + (oy*sy);

            if (dp < 0)
            ***REMOVED***
                //collision; project delta onto slope and use this to displace the object
                sx *= -dp;//(sx,sy) is now the projection vector
                sy *= -dp;

                var lenN = Math.sqrt(sx*sx + sy*sy);
                var lenP = Math.sqrt(x*x + y*y);

                var aY = Math.abs(penY);

                if (lenP < lenN)
                ***REMOVED***
                    if (aY < lenP)
                    ***REMOVED***
                        obj.reportCollisionVsWorld(0, penY, 0, penY/aY, t);

                        return Phaser.Physics.Ninja.AABB.COL_OTHER;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        obj.reportCollisionVsWorld(x,y,x/lenP, y/lenP, t);

                        return Phaser.Physics.Ninja.AABB.COL_AXIS;
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    if (aY < lenN)
                    ***REMOVED***
                        obj.reportCollisionVsWorld(0, penY, 0, penY/aY, t);

                        return Phaser.Physics.Ninja.AABB.COL_OTHER;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        obj.reportCollisionVsWorld(sx,sy,t.sx,t.sy,t);

                        return Phaser.Physics.Ninja.AABB.COL_OTHER;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        //if we've reached this point, no collision has occured
        return Phaser.Physics.Ninja.AABB.COL_NONE;
    ***REMOVED***,

    /**
    * Resolves 22 Degree tile collision.
    *
    * @method Phaser.Physics.Ninja.AABB#projAABB_22DegB
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***Phaser.Physics.Ninja.AABB***REMOVED*** obj - The AABB involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***number***REMOVED*** The result of the collision.
    */
    projAABB_22DegB: function (x, y, obj, t) ***REMOVED***

        var signx = t.signx;
        var signy = t.signy;

        var ox = (obj.pos.x - (signx*obj.xw)) - (t.pos.x - (signx*t.xw));//this gives is the coordinates of the innermost
        var oy = (obj.pos.y - (signy*obj.yw)) - (t.pos.y + (signy*t.yw));//point on the AABB, relative to a point on the slope

        var sx = t.sx;//get slope unit normal
        var sy = t.sy;

        //if the dotprod of (ox,oy) and (sx,sy) is negative, the corner is in the slope
        //and we need toproject it out by the magnitude of the projection of (ox,oy) onto (sx,sy)
        var dp = (ox*sx) + (oy*sy);

        if (dp < 0)
        ***REMOVED***
            //collision; project delta onto slope and use this to displace the object
            sx *= -dp;//(sx,sy) is now the projection vector
            sy *= -dp;

            var lenN = Math.sqrt(sx*sx + sy*sy);
            var lenP = Math.sqrt(x*x + y*y);

            if (lenP < lenN)
            ***REMOVED***
                obj.reportCollisionVsWorld(x,y,x/lenP, y/lenP, t);

                return Phaser.Physics.Ninja.AABB.COL_AXIS;
            ***REMOVED***
            else
            ***REMOVED***
                obj.reportCollisionVsWorld(sx,sy,t.sx,t.sy,t);

                return Phaser.Physics.Ninja.AABB.COL_OTHER;
            ***REMOVED***

        ***REMOVED***

        return Phaser.Physics.Ninja.AABB.COL_NONE;

    ***REMOVED***,

    /**
    * Resolves 67 Degree tile collision.
    *
    * @method Phaser.Physics.Ninja.AABB#projAABB_67DegS
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***Phaser.Physics.Ninja.AABB***REMOVED*** obj - The AABB involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***number***REMOVED*** The result of the collision.
    */
    projAABB_67DegS: function (x, y, obj, t) ***REMOVED***

        var signx = t.signx;
        var signy = t.signy;

        var px = obj.pos.x - (signx*obj.xw);
        var penX = t.pos.x - px;

        if (0 < (penX*signx))
        ***REMOVED***
            var ox = (obj.pos.x - (signx*obj.xw)) - (t.pos.x - (signx*t.xw));//this gives is the coordinates of the innermost
            var oy = (obj.pos.y - (signy*obj.yw)) - (t.pos.y + (signy*t.yw));//point on the AABB, relative to a point on the slope

            var sx = t.sx;//get slope unit normal
            var sy = t.sy;

            //if the dotprod of (ox,oy) and (sx,sy) is negative, the corner is in the slope
            //and we need to project it out by the magnitude of the projection of (ox,oy) onto (sx,sy)
            var dp = (ox*sx) + (oy*sy);

            if (dp < 0)
            ***REMOVED***
                //collision; project delta onto slope and use this to displace the object
                sx *= -dp;//(sx,sy) is now the projection vector
                sy *= -dp;

                var lenN = Math.sqrt(sx*sx + sy*sy);
                var lenP = Math.sqrt(x*x + y*y);

                var aX = Math.abs(penX);

                if (lenP < lenN)
                ***REMOVED***
                    if (aX < lenP)
                    ***REMOVED***
                        obj.reportCollisionVsWorld(penX, 0, penX/aX, 0, t);

                        return Phaser.Physics.Ninja.AABB.COL_OTHER;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        obj.reportCollisionVsWorld(x,y,x/lenP, y/lenP, t);

                        return Phaser.Physics.Ninja.AABB.COL_AXIS;
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    if (aX < lenN)
                    ***REMOVED***
                        obj.reportCollisionVsWorld(penX, 0, penX/aX, 0, t);

                        return Phaser.Physics.Ninja.AABB.COL_OTHER;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        obj.reportCollisionVsWorld(sx,sy,t.sx,t.sy,t);

                        return Phaser.Physics.Ninja.AABB.COL_OTHER;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        //if we've reached this point, no collision has occured
        return Phaser.Physics.Ninja.AABB.COL_NONE;

    ***REMOVED***,

    /**
    * Resolves 67 Degree tile collision.
    *
    * @method Phaser.Physics.Ninja.AABB#projAABB_67DegB
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***Phaser.Physics.Ninja.AABB***REMOVED*** obj - The AABB involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***number***REMOVED*** The result of the collision.
    */
    projAABB_67DegB: function (x, y, obj, t) ***REMOVED***

        var signx = t.signx;
        var signy = t.signy;

        var ox = (obj.pos.x - (signx*obj.xw)) - (t.pos.x + (signx*t.xw));//this gives is the coordinates of the innermost
        var oy = (obj.pos.y - (signy*obj.yw)) - (t.pos.y - (signy*t.yw));//point on the AABB, relative to a point on the slope

        var sx = t.sx;//get slope unit normal
        var sy = t.sy;

        //if the dotprod of (ox,oy) and (sx,sy) is negative, the corner is in the slope
        //and we need toproject it out by the magnitude of the projection of (ox,oy) onto (sx,sy)
        var dp = (ox*sx) + (oy*sy);

        if (dp < 0)
        ***REMOVED***
            //collision; project delta onto slope and use this to displace the object
            sx *= -dp;//(sx,sy) is now the projection vector
            sy *= -dp;

            var lenN = Math.sqrt(sx*sx + sy*sy);
            var lenP = Math.sqrt(x*x + y*y);

            if (lenP < lenN)
            ***REMOVED***
                obj.reportCollisionVsWorld(x,y,x/lenP, y/lenP, t);

                return Phaser.Physics.Ninja.AABB.COL_AXIS;
            ***REMOVED***
            else
            ***REMOVED***
                obj.reportCollisionVsWorld(sx,sy,t.sx,t.sy,t);

                return Phaser.Physics.Ninja.AABB.COL_OTHER;
            ***REMOVED***
        ***REMOVED***

        return Phaser.Physics.Ninja.AABB.COL_NONE;
    ***REMOVED***,

    /**
    * Resolves Convex tile collision.
    *
    * @method Phaser.Physics.Ninja.AABB#projAABB_Convex
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***Phaser.Physics.Ninja.AABB***REMOVED*** obj - The AABB involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***number***REMOVED*** The result of the collision.
    */
    projAABB_Convex: function (x, y, obj, t) ***REMOVED***

        //if distance from "innermost" corner of AABB is less than than tile radius,
        //collision is occuring and we need to project

        var signx = t.signx;
        var signy = t.signy;

        var ox = (obj.pos.x - (signx * obj.xw)) - (t.pos.x - (signx * t.xw));//(ox,oy) is the vector from the circle center to
        var oy = (obj.pos.y - (signy * obj.yw)) - (t.pos.y - (signy * t.yw));//the AABB
        var len = Math.sqrt(ox * ox + oy * oy);

        var twid = t.xw * 2;
        var rad = Math.sqrt(twid * twid + 0);//this gives us the radius of a circle centered on the tile's corner and extending to the opposite edge of the tile;
        //note that this should be precomputed at compile-time since it's constant

        var pen = rad - len;

        if (((signx * ox) < 0) || ((signy * oy) < 0))
        ***REMOVED***
            //the test corner is "outside" the 1/4 of the circle we're interested in
            var lenP = Math.sqrt(x * x + y * y);
            obj.reportCollisionVsWorld(x, y, x / lenP, y / lenP, t);

            return Phaser.Physics.Ninja.AABB.COL_AXIS;//we need to report
        ***REMOVED***
        else if (0 < pen)
        ***REMOVED***
            //project along corner->circle vector
            ox /= len;
            oy /= len;
            obj.reportCollisionVsWorld(ox * pen, oy * pen, ox, oy, t);

            return Phaser.Physics.Ninja.AABB.COL_OTHER;
        ***REMOVED***

        return Phaser.Physics.Ninja.AABB.COL_NONE;

    ***REMOVED***,

    /**
    * Resolves Concave tile collision.
    *
    * @method Phaser.Physics.Ninja.AABB#projAABB_Concave
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***Phaser.Physics.Ninja.AABB***REMOVED*** obj - The AABB involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***number***REMOVED*** The result of the collision.
    */
    projAABB_Concave: function (x, y, obj, t) ***REMOVED***

        //if distance from "innermost" corner of AABB is further than tile radius,
        //collision is occuring and we need to project

        var signx = t.signx;
        var signy = t.signy;

        var ox = (t.pos.x + (signx * t.xw)) - (obj.pos.x - (signx * obj.xw));//(ox,oy) is the vector form the innermost AABB corner to the
        var oy = (t.pos.y + (signy * t.yw)) - (obj.pos.y - (signy * obj.yw));//circle's center

        var twid = t.xw * 2;
        var rad = Math.sqrt(twid * twid + 0);//this gives us the radius of a circle centered on the tile's corner and extending to the opposite edge of the tile;
        //note that this should be precomputed at compile-time since it's constant

        var len = Math.sqrt(ox * ox + oy * oy);
        var pen = len - rad;

        if (0 < pen)
        ***REMOVED***
            //collision; we need to either project along the axes, or project along corner->circlecenter vector

            var lenP = Math.sqrt(x * x + y * y);

            if (lenP < pen)
            ***REMOVED***
                //it's shorter to move along axis directions
                obj.reportCollisionVsWorld(x, y, x / lenP, y / lenP, t);

                return Phaser.Physics.Ninja.AABB.COL_AXIS;
            ***REMOVED***
            else
            ***REMOVED***
                //project along corner->circle vector
                ox /= len;//len should never be 0, since if it IS 0, rad should be > than len
                oy /= len;//and we should never reach here

                obj.reportCollisionVsWorld(ox * pen, oy * pen, ox, oy, t);

                return Phaser.Physics.Ninja.AABB.COL_OTHER;
            ***REMOVED***

        ***REMOVED***

        return Phaser.Physics.Ninja.AABB.COL_NONE;

    ***REMOVED***,

    /**
    * Destroys this AABB's reference to Body and System
    *
    * @method Phaser.Physics.Ninja.AABB#destroy
    */
    destroy: function() ***REMOVED***
        this.body = null;
        this.system = null;
    ***REMOVED***,

    /**
    * Render this AABB for debugging purposes.
    *
    * @method Phaser.Physics.Ninja.AABB#render
    * @param ***REMOVED***object***REMOVED*** context - The context to render to.
    * @param ***REMOVED***number***REMOVED*** xOffset - X offset from AABB's position to render at.
    * @param ***REMOVED***number***REMOVED*** yOffset - Y offset from AABB's position to render at.
    * @param ***REMOVED***string***REMOVED*** color - color of the debug shape to be rendered. (format is css color string).
    * @param ***REMOVED***boolean***REMOVED*** filled - Render the shape as solid (true) or hollow (false).
    */
    render: function(context, xOffset, yOffset, color, filled) ***REMOVED***
        var left = this.pos.x - this.xw - xOffset;
        var top = this.pos.y - this.yw - yOffset;

        if (filled)
        ***REMOVED***
            context.fillStyle = color;
            context.fillRect(left, top, this.width, this.height);
        ***REMOVED***
        else
        ***REMOVED***
            context.strokeStyle = color;
            context.strokeRect(left, top, this.width, this.height);
        ***REMOVED***
    ***REMOVED***
***REMOVED***;