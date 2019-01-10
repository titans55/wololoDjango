/* jshint camelcase: false */
/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Ninja Physics Circle constructor.
* Note: This class could be massively optimised and reduced in size. I leave that challenge up to you.
*
* @class Phaser.Physics.Ninja.Circle
* @constructor
* @param ***REMOVED***Phaser.Physics.Ninja.Body***REMOVED*** body - The body that owns this shape.
* @param ***REMOVED***number***REMOVED*** x - The x coordinate to create this shape at.
* @param ***REMOVED***number***REMOVED*** y - The y coordinate to create this shape at.
* @param ***REMOVED***number***REMOVED*** radius - The radius of this Circle.
*/
Phaser.Physics.Ninja.Circle = function (body, x, y, radius) ***REMOVED***

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
    * @property ***REMOVED***number***REMOVED*** radius - The radius of this circle shape.
    */
    this.radius = radius;

    /**
    * @property ***REMOVED***number***REMOVED*** xw - Half the width.
    * @readonly
    */
    this.xw = radius;

    /**
    * @property ***REMOVED***number***REMOVED*** xw - Half the height.
    * @readonly
    */
    this.yw = radius;

    /**
    * @property ***REMOVED***number***REMOVED*** width - The width.
    * @readonly
    */
    this.width = radius * 2;

    /**
    * @property ***REMOVED***number***REMOVED*** height - The height.
    * @readonly
    */
    this.height = radius * 2;

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
    * @property ***REMOVED***object***REMOVED*** circleTileProjections - All of the collision response handlers.
    */
    this.circleTileProjections = ***REMOVED******REMOVED***;

    this.circleTileProjections[Phaser.Physics.Ninja.Tile.TYPE_FULL] = this.projCircle_Full;
    this.circleTileProjections[Phaser.Physics.Ninja.Tile.TYPE_45DEG] = this.projCircle_45Deg;
    this.circleTileProjections[Phaser.Physics.Ninja.Tile.TYPE_CONCAVE] = this.projCircle_Concave;
    this.circleTileProjections[Phaser.Physics.Ninja.Tile.TYPE_CONVEX] = this.projCircle_Convex;
    this.circleTileProjections[Phaser.Physics.Ninja.Tile.TYPE_22DEGs] = this.projCircle_22DegS;
    this.circleTileProjections[Phaser.Physics.Ninja.Tile.TYPE_22DEGb] = this.projCircle_22DegB;
    this.circleTileProjections[Phaser.Physics.Ninja.Tile.TYPE_67DEGs] = this.projCircle_67DegS;
    this.circleTileProjections[Phaser.Physics.Ninja.Tile.TYPE_67DEGb] = this.projCircle_67DegB;
    this.circleTileProjections[Phaser.Physics.Ninja.Tile.TYPE_HALF] = this.projCircle_Half;

***REMOVED***;

Phaser.Physics.Ninja.Circle.prototype.constructor = Phaser.Physics.Ninja.Circle;

Phaser.Physics.Ninja.Circle.COL_NONE = 0;
Phaser.Physics.Ninja.Circle.COL_AXIS = 1;
Phaser.Physics.Ninja.Circle.COL_OTHER = 2;

Phaser.Physics.Ninja.Circle.prototype = ***REMOVED***

    /**
    * Updates this Circles position.
    *
    * @method Phaser.Physics.Ninja.Circle#integrate
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
    * Process a world collision and apply the resulting forces.
    *
    * @method Phaser.Physics.Ninja.Circle#reportCollisionVsWorld
    * @param ***REMOVED***number***REMOVED*** px - The tangent velocity
    * @param ***REMOVED***number***REMOVED*** py - The tangent velocity
    * @param ***REMOVED***number***REMOVED*** dx - Collision normal
    * @param ***REMOVED***number***REMOVED*** dy - Collision normal
    * @param ***REMOVED***number***REMOVED*** obj - Object this Circle collided with
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
    * Collides this Circle against the world bounds.
    *
    * @method Phaser.Physics.Ninja.Circle#collideWorldBounds
    */
    collideWorldBounds: function () ***REMOVED***

        var dx = this.system.bounds.x - (this.pos.x - this.radius);

        if (0 < dx)
        ***REMOVED***
            this.reportCollisionVsWorld(dx, 0, 1, 0, null);
        ***REMOVED***
        else
        ***REMOVED***
            dx = (this.pos.x + this.radius) - this.system.bounds.right;

            if (0 < dx)
            ***REMOVED***
                this.reportCollisionVsWorld(-dx, 0, -1, 0, null);
            ***REMOVED***
        ***REMOVED***

        var dy = this.system.bounds.y - (this.pos.y - this.radius);

        if (0 < dy)
        ***REMOVED***
            this.reportCollisionVsWorld(0, dy, 0, 1, null);
        ***REMOVED***
        else
        ***REMOVED***
            dy = (this.pos.y + this.radius) - this.system.bounds.bottom;

            if (0 < dy)
            ***REMOVED***
                this.reportCollisionVsWorld(0, -dy, 0, -1, null);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Collides this Circle with a Tile.
    *
    * @method Phaser.Physics.Ninja.Circle#collideCircleVsTile
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***boolean***REMOVED*** True if they collide, otherwise false.
    */
    collideCircleVsTile: function (tile) ***REMOVED***

        var pos = this.pos;
        var r = this.radius;
        var c = tile;

        var tx = c.pos.x;
        var ty = c.pos.y;
        var txw = c.xw;
        var tyw = c.yw;

        var dx = pos.x - tx;    //  tile->obj delta
        var px = (txw + r) - Math.abs(dx);  //  penetration depth in x

        if (0 < px)
        ***REMOVED***
            var dy = pos.y - ty;    //  tile->obj delta
            var py = (tyw + r) - Math.abs(dy);  //  pen depth in y

            if (0 < py)
            ***REMOVED***
                //  object may be colliding with tile

                //  determine grid/voronoi region of circle center
                this.oH = 0;
                this.oV = 0;

                if (dx < -txw)
                ***REMOVED***
                    //  circle is on left side of tile
                    this.oH = -1;
                ***REMOVED***
                else if (txw < dx)
                ***REMOVED***
                    //  circle is on right side of tile
                    this.oH = 1;
                ***REMOVED***

                if (dy < -tyw)
                ***REMOVED***
                    //  circle is on top side of tile
                    this.oV = -1;
                ***REMOVED***
                else if (tyw < dy)
                ***REMOVED***
                    //  circle is on bottom side of tile
                    this.oV = 1;
                ***REMOVED***

                return this.resolveCircleTile(px, py, this.oH, this.oV, this, c);

            ***REMOVED***
        ***REMOVED***
    ***REMOVED***,

    /**
    * Resolves tile collision.
    *
    * @method Phaser.Physics.Ninja.Circle#resolveCircleTile
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***number***REMOVED*** oH - Grid / voronoi region.
    * @param ***REMOVED***number***REMOVED*** oV - Grid / voronoi region.
    * @param ***REMOVED***Phaser.Physics.Ninja.Circle***REMOVED*** obj - The Circle involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***number***REMOVED*** The result of the collision.
    */
    resolveCircleTile: function (x, y, oH, oV, obj, t) ***REMOVED***

        if (0 < t.id)
        ***REMOVED***
            return this.circleTileProjections[t.type](x, y, oH, oV, obj, t);
        ***REMOVED***
        else
        ***REMOVED***
            return false;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Resolves Full tile collision.
    *
    * @method Phaser.Physics.Ninja.Circle#projCircle_Full
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***number***REMOVED*** oH - Grid / voronoi region.
    * @param ***REMOVED***number***REMOVED*** oV - Grid / voronoi region.
    * @param ***REMOVED***Phaser.Physics.Ninja.Circle***REMOVED*** obj - The Circle involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***number***REMOVED*** The result of the collision.
    */
    projCircle_Full: function (x, y, oH, oV, obj, t) ***REMOVED***

        //if we're colliding vs. the current cell, we need to project along the
        //smallest penetration vector.
        //if we're colliding vs. horiz. or vert. neighb, we simply project horiz/vert
        //if we're colliding diagonally, we need to collide vs. tile corner

        if (oH === 0)
        ***REMOVED***
            if (oV === 0)
            ***REMOVED***
                //collision with current cell
                if (x < y)
                ***REMOVED***
                    //penetration in x is smaller; project in x
                    var dx = obj.pos.x - t.pos.x;//get sign for projection along x-axis

                    //NOTE: should we handle the delta === 0 case?! and how? (project towards oldpos?)
                    if (dx < 0)
                    ***REMOVED***
                        obj.reportCollisionVsWorld(-x, 0, -1, 0, t);
                        return Phaser.Physics.Ninja.Circle.COL_AXIS;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        obj.reportCollisionVsWorld(x, 0, 1, 0, t);
                        return Phaser.Physics.Ninja.Circle.COL_AXIS;
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    //penetration in y is smaller; project in y
                    var dy = obj.pos.y - t.pos.y;//get sign for projection along y-axis

                    //NOTE: should we handle the delta === 0 case?! and how? (project towards oldpos?)
                    if (dy < 0)
                    ***REMOVED***
                        obj.reportCollisionVsWorld(0, -y, 0, -1, t);
                        return Phaser.Physics.Ninja.Circle.COL_AXIS;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        obj.reportCollisionVsWorld(0, y, 0, 1, t);
                        return Phaser.Physics.Ninja.Circle.COL_AXIS;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                //collision with vertical neighbor
                obj.reportCollisionVsWorld(0, y * oV, 0, oV, t);

                return Phaser.Physics.Ninja.Circle.COL_AXIS;
            ***REMOVED***
        ***REMOVED***
        else if (oV === 0)
        ***REMOVED***
            //collision with horizontal neighbor
            obj.reportCollisionVsWorld(x * oH, 0, oH, 0, t);
            return Phaser.Physics.Ninja.Circle.COL_AXIS;
        ***REMOVED***
        else
        ***REMOVED***
            //diagonal collision

            //get diag vertex position
            var vx = t.pos.x + (oH * t.xw);
            var vy = t.pos.y + (oV * t.yw);

            var dx = obj.pos.x - vx;//calc vert->circle vector
            var dy = obj.pos.y - vy;

            var len = Math.sqrt(dx * dx + dy * dy);
            var pen = obj.radius - len;

            if (0 < pen)
            ***REMOVED***
                //vertex is in the circle; project outward
                if (len === 0)
                ***REMOVED***
                    //project out by 45deg
                    dx = oH / Math.SQRT2;
                    dy = oV / Math.SQRT2;
                ***REMOVED***
                else
                ***REMOVED***
                    dx /= len;
                    dy /= len;
                ***REMOVED***

                obj.reportCollisionVsWorld(dx * pen, dy * pen, dx, dy, t);

                return Phaser.Physics.Ninja.Circle.COL_OTHER;
            ***REMOVED***
        ***REMOVED***

        return Phaser.Physics.Ninja.Circle.COL_NONE;

    ***REMOVED***,

    /**
    * Resolves 45 Degree tile collision.
    *
    * @method Phaser.Physics.Ninja.Circle#projCircle_45Deg
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***number***REMOVED*** oH - Grid / voronoi region.
    * @param ***REMOVED***number***REMOVED*** oV - Grid / voronoi region.
    * @param ***REMOVED***Phaser.Physics.Ninja.Circle***REMOVED*** obj - The Circle involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***number***REMOVED*** The result of the collision.
    */
    projCircle_45Deg: function (x, y, oH, oV, obj, t) ***REMOVED***

        //if we're colliding diagonally:
        //  -if obj is in the diagonal pointed to by the slope normal: we can't collide, do nothing
        //  -else, collide vs. the appropriate vertex
        //if obj is in this tile: perform collision as for aabb-ve-45deg
        //if obj is horiz OR very neighb in direction of slope: collide only vs. slope
        //if obj is horiz or vert neigh against direction of slope: collide vs. face

        var signx = t.signx;
        var signy = t.signy;
        var lenP;

        if (oH === 0)
        ***REMOVED***
            if (oV === 0)
            ***REMOVED***
                //colliding with current tile

                var sx = t.sx;
                var sy = t.sy;

                var ox = (obj.pos.x - (sx * obj.radius)) - t.pos.x;//this gives is the coordinates of the innermost
                var oy = (obj.pos.y - (sy * obj.radius)) - t.pos.y;//point on the circle, relative to the tile center

                //if the dotprod of (ox,oy) and (sx,sy) is negative, the innermost point is in the slope
                //and we need toproject it out by the magnitude of the projection of (ox,oy) onto (sx,sy)
                var dp = (ox * sx) + (oy * sy);

                if (dp < 0)
                ***REMOVED***
                    //collision; project delta onto slope and use this as the slope penetration vector
                    sx *= -dp;//(sx,sy) is now the penetration vector
                    sy *= -dp;

                    //find the smallest axial projection vector
                    if (x < y)
                    ***REMOVED***
                        //penetration in x is smaller
                        lenP = x;
                        y = 0;

                        //get sign for projection along x-axis
                        if ((obj.pos.x - t.pos.x) < 0)
                        ***REMOVED***
                            x *= -1;
                        ***REMOVED***
                    ***REMOVED***
                    else
                    ***REMOVED***
                        //penetration in y is smaller
                        lenP = y;
                        x = 0;

                        //get sign for projection along y-axis
                        if ((obj.pos.y - t.pos.y) < 0)
                        ***REMOVED***
                            y *= -1;
                        ***REMOVED***
                    ***REMOVED***

                    var lenN = Math.sqrt(sx * sx + sy * sy);

                    if (lenP < lenN)
                    ***REMOVED***
                        obj.reportCollisionVsWorld(x, y, x / lenP, y / lenP, t);

                        return Phaser.Physics.Ninja.Circle.COL_AXIS;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        obj.reportCollisionVsWorld(sx, sy, t.sx, t.sy, t);

                        return Phaser.Physics.Ninja.Circle.COL_OTHER;
                    ***REMOVED***
                ***REMOVED***

            ***REMOVED***
            else
            ***REMOVED***
                //colliding vertically
                if ((signy * oV) < 0)
                ***REMOVED***
                    //colliding with face/edge
                    obj.reportCollisionVsWorld(0, y * oV, 0, oV, t);

                    return Phaser.Physics.Ninja.Circle.COL_AXIS;
                ***REMOVED***
                else
                ***REMOVED***
                    //we could only be colliding vs the slope OR a vertex
                    //look at the vector form the closest vert to the circle to decide

                    var sx = t.sx;
                    var sy = t.sy;

                    var ox = obj.pos.x - (t.pos.x - (signx * t.xw));//this gives is the coordinates of the innermost
                    var oy = obj.pos.y - (t.pos.y + (oV * t.yw));//point on the circle, relative to the closest tile vert

                    //if the component of (ox,oy) parallel to the normal's righthand normal
                    //has the same sign as the slope of the slope (the sign of the slope's slope is signx*signy)
                    //then we project by the vertex, otherwise by the normal.
                    //note that this is simply a VERY tricky/weird method of determining
                    //if the circle is in side the slope/face's voronoi region, or that of the vertex.
                    var perp = (ox * -sy) + (oy * sx);
                    if (0 < (perp * signx * signy))
                    ***REMOVED***
                        //collide vs. vertex
                        var len = Math.sqrt(ox * ox + oy * oy);
                        var pen = obj.radius - len;
                        if (0 < pen)
                        ***REMOVED***
                            //note: if len=0, then perp=0 and we'll never reach here, so don't worry about div-by-0
                            ox /= len;
                            oy /= len;

                            obj.reportCollisionVsWorld(ox * pen, oy * pen, ox, oy, t);

                            return Phaser.Physics.Ninja.Circle.COL_OTHER;
                        ***REMOVED***
                    ***REMOVED***
                    else
                    ***REMOVED***
                        //collide vs. slope

                        //if the component of (ox,oy) parallel to the normal is less than the circle radius, we're
                        //penetrating the slope. note that this method of penetration calculation doesn't hold
                        //in general (i.e it won't work if the circle is in the slope), but works in this case
                        //because we know the circle is in a neighboring cell
                        var dp = (ox * sx) + (oy * sy);
                        var pen = obj.radius - Math.abs(dp);//note: we don't need the abs because we know the dp will be positive, but just in case..
                        if (0 < pen)
                        ***REMOVED***
                            //collision; circle out along normal by penetration amount
                            obj.reportCollisionVsWorld(sx * pen, sy * pen, sx, sy, t);

                            return Phaser.Physics.Ninja.Circle.COL_OTHER;
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else if (oV === 0)
        ***REMOVED***
            //colliding horizontally
            if ((signx * oH) < 0)
            ***REMOVED***
                //colliding with face/edge
                obj.reportCollisionVsWorld(x * oH, 0, oH, 0, t);

                return Phaser.Physics.Ninja.Circle.COL_AXIS;
            ***REMOVED***
            else
            ***REMOVED***
                //we could only be colliding vs the slope OR a vertex
                //look at the vector form the closest vert to the circle to decide

                var sx = t.sx;
                var sy = t.sy;

                var ox = obj.pos.x - (t.pos.x + (oH * t.xw));//this gives is the coordinates of the innermost
                var oy = obj.pos.y - (t.pos.y - (signy * t.yw));//point on the circle, relative to the closest tile vert

                //if the component of (ox,oy) parallel to the normal's righthand normal
                //has the same sign as the slope of the slope (the sign of the slope's slope is signx*signy)
                //then we project by the normal, otherwise by the vertex.
                //(NOTE: this is the opposite logic of the vertical case;
                // for vertical, if the perp prod and the slope's slope agree, it's outside.
                // for horizontal, if the perp prod and the slope's slope agree, circle is inside.
                //  ..but this is only a property of flahs' coord system (i.e the rules might swap
                // in righthanded systems))
                //note that this is simply a VERY tricky/weird method of determining
                //if the circle is in side the slope/face's voronio region, or that of the vertex.
                var perp = (ox * -sy) + (oy * sx);
                if ((perp * signx * signy) < 0)
                ***REMOVED***
                    //collide vs. vertex
                    var len = Math.sqrt(ox * ox + oy * oy);
                    var pen = obj.radius - len;
                    if (0 < pen)
                    ***REMOVED***
                        //note: if len=0, then perp=0 and we'll never reach here, so don't worry about div-by-0
                        ox /= len;
                        oy /= len;

                        obj.reportCollisionVsWorld(ox * pen, oy * pen, ox, oy, t);

                        return Phaser.Physics.Ninja.Circle.COL_OTHER;
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    //collide vs. slope

                    //if the component of (ox,oy) parallel to the normal is less than the circle radius, we're
                    //penetrating the slope. note that this method of penetration calculation doesn't hold
                    //in general (i.e it won't work if the circle is in the slope), but works in this case
                    //because we know the circle is in a neighboring cell
                    var dp = (ox * sx) + (oy * sy);
                    var pen = obj.radius - Math.abs(dp);//note: we don't need the abs because we know the dp will be positive, but just in case..
                    if (0 < pen)
                    ***REMOVED***
                        //collision; circle out along normal by penetration amount
                        obj.reportCollisionVsWorld(sx * pen, sy * pen, sx, sy, t);

                        return Phaser.Physics.Ninja.Circle.COL_OTHER;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //colliding diagonally
            if (0 < ((signx * oH) + (signy * oV)))
            ***REMOVED***
                //the dotprod of slope normal and cell offset is strictly positive,
                //therefore obj is in the diagonal neighb pointed at by the normal, and
                //it cannot possibly reach/touch/penetrate the slope
                return Phaser.Physics.Ninja.Circle.COL_NONE;
            ***REMOVED***
            else
            ***REMOVED***
                //collide vs. vertex
                //get diag vertex position
                var vx = t.pos.x + (oH * t.xw);
                var vy = t.pos.y + (oV * t.yw);

                var dx = obj.pos.x - vx;//calc vert->circle vector
                var dy = obj.pos.y - vy;

                var len = Math.sqrt(dx * dx + dy * dy);
                var pen = obj.radius - len;
                if (0 < pen)
                ***REMOVED***
                    //vertex is in the circle; project outward
                    if (len === 0)
                    ***REMOVED***
                        //project out by 45deg
                        dx = oH / Math.SQRT2;
                        dy = oV / Math.SQRT2;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        dx /= len;
                        dy /= len;
                    ***REMOVED***

                    obj.reportCollisionVsWorld(dx * pen, dy * pen, dx, dy, t);
                    return Phaser.Physics.Ninja.Circle.COL_OTHER;
                ***REMOVED***

            ***REMOVED***

        ***REMOVED***

        return Phaser.Physics.Ninja.Circle.COL_NONE;
    ***REMOVED***,

    /**
    * Resolves Concave tile collision.
    *
    * @method Phaser.Physics.Ninja.Circle#projCircle_Concave
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***number***REMOVED*** oH - Grid / voronoi region.
    * @param ***REMOVED***number***REMOVED*** oV - Grid / voronoi region.
    * @param ***REMOVED***Phaser.Physics.Ninja.Circle***REMOVED*** obj - The Circle involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***number***REMOVED*** The result of the collision.
    */
    projCircle_Concave: function (x, y, oH, oV, obj, t) ***REMOVED***

        //if we're colliding diagonally:
        //  -if obj is in the diagonal pointed to by the slope normal: we can't collide, do nothing
        //  -else, collide vs. the appropriate vertex
        //if obj is in this tile: perform collision as for aabb
        //if obj is horiz OR very neighb in direction of slope: collide vs vert
        //if obj is horiz or vert neigh against direction of slope: collide vs. face

        var signx = t.signx;
        var signy = t.signy;
        var lenP;

        if (oH === 0)
        ***REMOVED***
            if (oV === 0)
            ***REMOVED***
                //colliding with current tile

                var ox = (t.pos.x + (signx * t.xw)) - obj.pos.x;//(ox,oy) is the vector from the circle to
                var oy = (t.pos.y + (signy * t.yw)) - obj.pos.y;//tile-circle's center

                var twid = t.xw * 2;
                var trad = Math.sqrt(twid * twid + 0);//this gives us the radius of a circle centered on the tile's corner and extending to the opposite edge of the tile;
                //note that this should be precomputed at compile-time since it's constant

                var len = Math.sqrt(ox * ox + oy * oy);
                var pen = (len + obj.radius) - trad;

                if (0 < pen)
                ***REMOVED***
                    //find the smallest axial projection vector
                    if (x < y)
                    ***REMOVED***
                        //penetration in x is smaller
                        lenP = x;
                        y = 0;

                        //get sign for projection along x-axis
                        if ((obj.pos.x - t.pos.x) < 0)
                        ***REMOVED***
                            x *= -1;
                        ***REMOVED***
                    ***REMOVED***
                    else
                    ***REMOVED***
                        //penetration in y is smaller
                        lenP = y;
                        x = 0;

                        //get sign for projection along y-axis
                        if ((obj.pos.y - t.pos.y) < 0)
                        ***REMOVED***
                            y *= -1;
                        ***REMOVED***
                    ***REMOVED***


                    if (lenP < pen)
                    ***REMOVED***
                        obj.reportCollisionVsWorld(x, y, x / lenP, y / lenP, t);

                        return Phaser.Physics.Ninja.Circle.COL_AXIS;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        //we can assume that len >0, because if we're here then
                        //(len + obj.radius) > trad, and since obj.radius <= trad
                        //len MUST be > 0
                        ox /= len;
                        oy /= len;

                        obj.reportCollisionVsWorld(ox * pen, oy * pen, ox, oy, t);

                        return Phaser.Physics.Ninja.Circle.COL_OTHER;
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    return Phaser.Physics.Ninja.Circle.COL_NONE;
                ***REMOVED***

            ***REMOVED***
            else
            ***REMOVED***
                //colliding vertically
                if ((signy * oV) < 0)
                ***REMOVED***
                    //colliding with face/edge
                    obj.reportCollisionVsWorld(0, y * oV, 0, oV, t);

                    return Phaser.Physics.Ninja.Circle.COL_AXIS;
                ***REMOVED***
                else
                ***REMOVED***
                    //we could only be colliding vs the vertical tip

                    //get diag vertex position
                    var vx = t.pos.x - (signx * t.xw);
                    var vy = t.pos.y + (oV * t.yw);

                    var dx = obj.pos.x - vx;//calc vert->circle vector
                    var dy = obj.pos.y - vy;

                    var len = Math.sqrt(dx * dx + dy * dy);
                    var pen = obj.radius - len;
                    if (0 < pen)
                    ***REMOVED***
                        //vertex is in the circle; project outward
                        if (len === 0)
                        ***REMOVED***
                            //project out vertically
                            dx = 0;
                            dy = oV;
                        ***REMOVED***
                        else
                        ***REMOVED***
                            dx /= len;
                            dy /= len;
                        ***REMOVED***

                        obj.reportCollisionVsWorld(dx * pen, dy * pen, dx, dy, t);

                        return Phaser.Physics.Ninja.Circle.COL_OTHER;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else if (oV === 0)
        ***REMOVED***
            //colliding horizontally
            if ((signx * oH) < 0)
            ***REMOVED***
                //colliding with face/edge
                obj.reportCollisionVsWorld(x * oH, 0, oH, 0, t);

                return Phaser.Physics.Ninja.Circle.COL_AXIS;
            ***REMOVED***
            else
            ***REMOVED***
                //we could only be colliding vs the horizontal tip

                //get diag vertex position
                var vx = t.pos.x + (oH * t.xw);
                var vy = t.pos.y - (signy * t.yw);

                var dx = obj.pos.x - vx;//calc vert->circle vector
                var dy = obj.pos.y - vy;

                var len = Math.sqrt(dx * dx + dy * dy);
                var pen = obj.radius - len;
                if (0 < pen)
                ***REMOVED***
                    //vertex is in the circle; project outward
                    if (len === 0)
                    ***REMOVED***
                        //project out horizontally
                        dx = oH;
                        dy = 0;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        dx /= len;
                        dy /= len;
                    ***REMOVED***

                    obj.reportCollisionVsWorld(dx * pen, dy * pen, dx, dy, t);

                    return Phaser.Physics.Ninja.Circle.COL_OTHER;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //colliding diagonally
            if (0 < ((signx * oH) + (signy * oV)))
            ***REMOVED***
                //the dotprod of slope normal and cell offset is strictly positive,
                //therefore obj is in the diagonal neighb pointed at by the normal, and
                //it cannot possibly reach/touch/penetrate the slope
                return Phaser.Physics.Ninja.Circle.COL_NONE;
            ***REMOVED***
            else
            ***REMOVED***
                //collide vs. vertex
                //get diag vertex position
                var vx = t.pos.x + (oH * t.xw);
                var vy = t.pos.y + (oV * t.yw);

                var dx = obj.pos.x - vx;//calc vert->circle vector
                var dy = obj.pos.y - vy;

                var len = Math.sqrt(dx * dx + dy * dy);
                var pen = obj.radius - len;
                if (0 < pen)
                ***REMOVED***
                    //vertex is in the circle; project outward
                    if (len === 0)
                    ***REMOVED***
                        //project out by 45deg
                        dx = oH / Math.SQRT2;
                        dy = oV / Math.SQRT2;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        dx /= len;
                        dy /= len;
                    ***REMOVED***

                    obj.reportCollisionVsWorld(dx * pen, dy * pen, dx, dy, t);

                    return Phaser.Physics.Ninja.Circle.COL_OTHER;
                ***REMOVED***

            ***REMOVED***

        ***REMOVED***

        return Phaser.Physics.Ninja.Circle.COL_NONE;

    ***REMOVED***,

    /**
    * Resolves Convex tile collision.
    *
    * @method Phaser.Physics.Ninja.Circle#projCircle_Convex
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***number***REMOVED*** oH - Grid / voronoi region.
    * @param ***REMOVED***number***REMOVED*** oV - Grid / voronoi region.
    * @param ***REMOVED***Phaser.Physics.Ninja.Circle***REMOVED*** obj - The Circle involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***number***REMOVED*** The result of the collision.
    */
    projCircle_Convex: function (x, y, oH, oV, obj, t) ***REMOVED***

        //if the object is horiz AND/OR vertical neighbor in the normal (signx,signy)
        //direction, collide vs. tile-circle only.
        //if we're colliding diagonally:
        //  -else, collide vs. the appropriate vertex
        //if obj is in this tile: perform collision as for aabb
        //if obj is horiz or vert neigh against direction of slope: collide vs. face

        var signx = t.signx;
        var signy = t.signy;
        var lenP;

        if (oH === 0)
        ***REMOVED***
            if (oV === 0)
            ***REMOVED***
                //colliding with current tile


                var ox = obj.pos.x - (t.pos.x - (signx * t.xw));//(ox,oy) is the vector from the tile-circle to
                var oy = obj.pos.y - (t.pos.y - (signy * t.yw));//the circle's center

                var twid = t.xw * 2;
                var trad = Math.sqrt(twid * twid + 0);//this gives us the radius of a circle centered on the tile's corner and extending to the opposite edge of the tile;
                //note that this should be precomputed at compile-time since it's constant

                var len = Math.sqrt(ox * ox + oy * oy);
                var pen = (trad + obj.radius) - len;

                if (0 < pen)
                ***REMOVED***
                    //find the smallest axial projection vector
                    if (x < y)
                    ***REMOVED***
                        //penetration in x is smaller
                        lenP = x;
                        y = 0;

                        //get sign for projection along x-axis
                        if ((obj.pos.x - t.pos.x) < 0)
                        ***REMOVED***
                            x *= -1;
                        ***REMOVED***
                    ***REMOVED***
                    else
                    ***REMOVED***
                        //penetration in y is smaller
                        lenP = y;
                        x = 0;

                        //get sign for projection along y-axis
                        if ((obj.pos.y - t.pos.y) < 0)
                        ***REMOVED***
                            y *= -1;
                        ***REMOVED***
                    ***REMOVED***


                    if (lenP < pen)
                    ***REMOVED***
                        obj.reportCollisionVsWorld(x, y, x / lenP, y / lenP, t);

                        return Phaser.Physics.Ninja.Circle.COL_AXIS;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        //note: len should NEVER be === 0, because if it is,
                        //projeciton by an axis shoudl always be shorter, and we should
                        //never arrive here
                        ox /= len;
                        oy /= len;

                        obj.reportCollisionVsWorld(ox * pen, oy * pen, ox, oy, t);

                        return Phaser.Physics.Ninja.Circle.COL_OTHER;

                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                //colliding vertically
                if ((signy * oV) < 0)
                ***REMOVED***
                    //colliding with face/edge
                    obj.reportCollisionVsWorld(0, y * oV, 0, oV, t);

                    return Phaser.Physics.Ninja.Circle.COL_AXIS;
                ***REMOVED***
                else
                ***REMOVED***
                    //obj in neighboring cell pointed at by tile normal;
                    //we could only be colliding vs the tile-circle surface

                    var ox = obj.pos.x - (t.pos.x - (signx * t.xw));//(ox,oy) is the vector from the tile-circle to
                    var oy = obj.pos.y - (t.pos.y - (signy * t.yw));//the circle's center

                    var twid = t.xw * 2;
                    var trad = Math.sqrt(twid * twid + 0);//this gives us the radius of a circle centered on the tile's corner and extending to the opposite edge of the tile;
                    //note that this should be precomputed at compile-time since it's constant

                    var len = Math.sqrt(ox * ox + oy * oy);
                    var pen = (trad + obj.radius) - len;

                    if (0 < pen)
                    ***REMOVED***

                        //note: len should NEVER be === 0, because if it is,
                        //obj is not in a neighboring cell!
                        ox /= len;
                        oy /= len;

                        obj.reportCollisionVsWorld(ox * pen, oy * pen, ox, oy, t);

                        return Phaser.Physics.Ninja.Circle.COL_OTHER;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else if (oV === 0)
        ***REMOVED***
            //colliding horizontally
            if ((signx * oH) < 0)
            ***REMOVED***
                //colliding with face/edge
                obj.reportCollisionVsWorld(x * oH, 0, oH, 0, t);

                return Phaser.Physics.Ninja.Circle.COL_AXIS;
            ***REMOVED***
            else
            ***REMOVED***
                //obj in neighboring cell pointed at by tile normal;
                //we could only be colliding vs the tile-circle surface

                var ox = obj.pos.x - (t.pos.x - (signx * t.xw));//(ox,oy) is the vector from the tile-circle to
                var oy = obj.pos.y - (t.pos.y - (signy * t.yw));//the circle's center

                var twid = t.xw * 2;
                var trad = Math.sqrt(twid * twid + 0);//this gives us the radius of a circle centered on the tile's corner and extending to the opposite edge of the tile;
                //note that this should be precomputed at compile-time since it's constant

                var len = Math.sqrt(ox * ox + oy * oy);
                var pen = (trad + obj.radius) - len;

                if (0 < pen)
                ***REMOVED***

                    //note: len should NEVER be === 0, because if it is,
                    //obj is not in a neighboring cell!
                    ox /= len;
                    oy /= len;

                    obj.reportCollisionVsWorld(ox * pen, oy * pen, ox, oy, t);

                    return Phaser.Physics.Ninja.Circle.COL_OTHER;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //colliding diagonally
            if (0 < ((signx * oH) + (signy * oV)))
            ***REMOVED***
                //obj in diag neighb cell pointed at by tile normal;
                //we could only be colliding vs the tile-circle surface

                var ox = obj.pos.x - (t.pos.x - (signx * t.xw));//(ox,oy) is the vector from the tile-circle to
                var oy = obj.pos.y - (t.pos.y - (signy * t.yw));//the circle's center

                var twid = t.xw * 2;
                var trad = Math.sqrt(twid * twid + 0);//this gives us the radius of a circle centered on the tile's corner and extending to the opposite edge of the tile;
                //note that this should be precomputed at compile-time since it's constant

                var len = Math.sqrt(ox * ox + oy * oy);
                var pen = (trad + obj.radius) - len;

                if (0 < pen)
                ***REMOVED***

                    //note: len should NEVER be === 0, because if it is,
                    //obj is not in a neighboring cell!
                    ox /= len;
                    oy /= len;

                    obj.reportCollisionVsWorld(ox * pen, oy * pen, ox, oy, t);

                    return Phaser.Physics.Ninja.Circle.COL_OTHER;
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                //collide vs. vertex
                //get diag vertex position
                var vx = t.pos.x + (oH * t.xw);
                var vy = t.pos.y + (oV * t.yw);

                var dx = obj.pos.x - vx;//calc vert->circle vector
                var dy = obj.pos.y - vy;

                var len = Math.sqrt(dx * dx + dy * dy);
                var pen = obj.radius - len;
                if (0 < pen)
                ***REMOVED***
                    //vertex is in the circle; project outward
                    if (len === 0)
                    ***REMOVED***
                        //project out by 45deg
                        dx = oH / Math.SQRT2;
                        dy = oV / Math.SQRT2;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        dx /= len;
                        dy /= len;
                    ***REMOVED***

                    obj.reportCollisionVsWorld(dx * pen, dy * pen, dx, dy, t);

                    return Phaser.Physics.Ninja.Circle.COL_OTHER;
                ***REMOVED***

            ***REMOVED***

        ***REMOVED***

        return Phaser.Physics.Ninja.Circle.COL_NONE;

    ***REMOVED***,

    /**
    * Resolves Half tile collision.
    *
    * @method Phaser.Physics.Ninja.Circle#projCircle_Half
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***number***REMOVED*** oH - Grid / voronoi region.
    * @param ***REMOVED***number***REMOVED*** oV - Grid / voronoi region.
    * @param ***REMOVED***Phaser.Physics.Ninja.Circle***REMOVED*** obj - The Circle involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***number***REMOVED*** The result of the collision.
    */
    projCircle_Half: function (x,y,oH,oV,obj,t) ***REMOVED***

        //if obj is in a neighbor pointed at by the halfedge normal,
        //we'll never collide (i.e if the normal is (0,1) and the obj is in the DL.D, or R neighbors)
        //
        //if obj is in a neigbor perpendicular to the halfedge normal, it might
        //collide with the halfedge-vertex, or with the halfedge side.
        //
        //if obj is in a neigb pointing opposite the halfedge normal, obj collides with edge
        //
        //if obj is in a diagonal (pointing away from the normal), obj collides vs vertex
        //
        //if obj is in the halfedge cell, it collides as with aabb

        var signx = t.signx;
        var signy = t.signy;

        var celldp = (oH*signx + oV*signy);//this tells us about the configuration of cell-offset relative to tile normal
        if (0 < celldp)
        ***REMOVED***
            //obj is in "far" (pointed-at-by-normal) neighbor of halffull tile, and will never hit
            return Phaser.Physics.Ninja.Circle.COL_NONE;
        ***REMOVED***
        else if (oH === 0)
        ***REMOVED***
            if (oV === 0)
            ***REMOVED***
                //colliding with current tile
                var r = obj.radius;
                var ox = (obj.pos.x - (signx*r)) - t.pos.x;//this gives is the coordinates of the innermost
                var oy = (obj.pos.y - (signy*r)) - t.pos.y;//point on the circle, relative to the tile center


                //we perform operations analogous to the 45deg tile, except we're using
                //an axis-aligned slope instead of an angled one..
                var sx = signx;
                var sy = signy;

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
                        obj.reportCollisionVsWorld(x,y,x/lenP, y/lenP,t);

                        return Phaser.Physics.Ninja.Circle.COL_AXIS;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        obj.reportCollisionVsWorld(sx,sy,t.signx,t.signy);

                        return Phaser.Physics.Ninja.Circle.COL_OTHER;
                    ***REMOVED***
                    return true;
                ***REMOVED***

            ***REMOVED***
            else
            ***REMOVED***
                //colliding vertically

                if (celldp === 0)
                ***REMOVED***

                    var dx = obj.pos.x - t.pos.x;

                    //we're in a cell perpendicular to the normal, and can collide vs. halfedge vertex
                    //or halfedge side
                    if ((dx*signx) < 0)
                    ***REMOVED***
                        //collision with halfedge side
                        obj.reportCollisionVsWorld(0,y*oV,0,oV,t);

                        return Phaser.Physics.Ninja.Circle.COL_AXIS;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        //collision with halfedge vertex
                        var dy = obj.pos.y - (t.pos.y + oV*t.yw);//(dx,dy) is now the vector from the appropriate halfedge vertex to the circle

                        var len = Math.sqrt(dx*dx + dy*dy);
                        var pen = obj.radius - len;
                        if (0 < pen)
                        ***REMOVED***
                            //vertex is in the circle; project outward
                            if (len === 0)
                            ***REMOVED***
                                //project out by 45deg
                                dx = signx / Math.SQRT2;
                                dy = oV / Math.SQRT2;
                            ***REMOVED***
                            else
                            ***REMOVED***
                                dx /= len;
                                dy /= len;
                            ***REMOVED***

                            obj.reportCollisionVsWorld(dx*pen, dy*pen, dx, dy, t);

                            return Phaser.Physics.Ninja.Circle.COL_OTHER;
                        ***REMOVED***

                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    //due to the first conditional (celldp >0), we know we're in the cell "opposite" the normal, and so
                    //we can only collide with the cell edge
                    //collision with vertical neighbor
                    obj.reportCollisionVsWorld(0,y*oV,0,oV,t);

                    return Phaser.Physics.Ninja.Circle.COL_AXIS;
                ***REMOVED***

            ***REMOVED***
        ***REMOVED***
        else if (oV === 0)
        ***REMOVED***
            //colliding horizontally
            if (celldp === 0)
            ***REMOVED***

                var dy = obj.pos.y - t.pos.y;

                //we're in a cell perpendicular to the normal, and can collide vs. halfedge vertex
                //or halfedge side
                if ((dy*signy) < 0)
                ***REMOVED***
                    //collision with halfedge side
                    obj.reportCollisionVsWorld(x*oH,0,oH,0,t);

                    return Phaser.Physics.Ninja.Circle.COL_AXIS;
                ***REMOVED***
                else
                ***REMOVED***
                    //collision with halfedge vertex
                    var dx = obj.pos.x - (t.pos.x + oH*t.xw);//(dx,dy) is now the vector from the appropriate halfedge vertex to the circle

                    var len = Math.sqrt(dx*dx + dy*dy);
                    var pen = obj.radius - len;
                    if (0 < pen)
                    ***REMOVED***
                        //vertex is in the circle; project outward
                        if (len === 0)
                        ***REMOVED***
                            //project out by 45deg
                            dx = signx / Math.SQRT2;
                            dy = oV / Math.SQRT2;
                        ***REMOVED***
                        else
                        ***REMOVED***
                            dx /= len;
                            dy /= len;
                        ***REMOVED***

                        obj.reportCollisionVsWorld(dx*pen, dy*pen, dx, dy, t);

                        return Phaser.Physics.Ninja.Circle.COL_OTHER;
                    ***REMOVED***

                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                //due to the first conditional (celldp >0), we know w're in the cell "opposite" the normal, and so
                //we can only collide with the cell edge
                obj.reportCollisionVsWorld(x*oH, 0, oH, 0, t);

                return Phaser.Physics.Ninja.Circle.COL_AXIS;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //colliding diagonally; we know, due to the initial (celldp >0) test which has failed
            //if we've reached this point, that we're in a diagonal neighbor on the non-normal side, so
            //we could only be colliding with the cell vertex, if at all.

            //get diag vertex position
            var vx = t.pos.x + (oH*t.xw);
            var vy = t.pos.y + (oV*t.yw);

            var dx = obj.pos.x - vx;//calc vert->circle vector
            var dy = obj.pos.y - vy;

            var len = Math.sqrt(dx*dx + dy*dy);
            var pen = obj.radius - len;
            if (0 < pen)
            ***REMOVED***
                //vertex is in the circle; project outward
                if (len === 0)
                ***REMOVED***
                    //project out by 45deg
                    dx = oH / Math.SQRT2;
                    dy = oV / Math.SQRT2;
                ***REMOVED***
                else
                ***REMOVED***
                    dx /= len;
                    dy /= len;
                ***REMOVED***

                obj.reportCollisionVsWorld(dx*pen, dy*pen, dx, dy, t);

                return Phaser.Physics.Ninja.Circle.COL_OTHER;
            ***REMOVED***

        ***REMOVED***

        return Phaser.Physics.Ninja.Circle.COL_NONE;

    ***REMOVED***,

    /**
    * Resolves 22 Degree tile collision.
    *
    * @method Phaser.Physics.Ninja.Circle#projCircle_22DegS
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***number***REMOVED*** oH - Grid / voronoi region.
    * @param ***REMOVED***number***REMOVED*** oV - Grid / voronoi region.
    * @param ***REMOVED***Phaser.Physics.Ninja.Circle***REMOVED*** obj - The Circle involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***number***REMOVED*** The result of the collision.
    */
    projCircle_22DegS: function (x,y,oH,oV,obj,t) ***REMOVED***

        //if the object is in a cell pointed at by signy, no collision will ever occur
        //otherwise,
        //
        //if we're colliding diagonally:
        //  -collide vs. the appropriate vertex
        //if obj is in this tile: collide vs slope or vertex
        //if obj is horiz neighb in direction of slope: collide vs. slope or vertex
        //if obj is horiz neighb against the slope:
        //   if (distance in y from circle to 90deg corner of tile < 1/2 tileheight, collide vs. face)
        //   else(collide vs. corner of slope) (vert collision with a non-grid-aligned vert)
        //if obj is vert neighb against direction of slope: collide vs. face

        var lenP;
        var signx = t.signx;
        var signy = t.signy;

        if (0 < (signy*oV))
        ***REMOVED***
            //object will never collide vs tile, it can't reach that far

            return Phaser.Physics.Ninja.Circle.COL_NONE;
        ***REMOVED***
        else if (oH === 0)
        ***REMOVED***
            if (oV === 0)
            ***REMOVED***
                //colliding with current tile
                //we could only be colliding vs the slope OR a vertex
                //look at the vector form the closest vert to the circle to decide

                var sx = t.sx;
                var sy = t.sy;

                var r = obj.radius;
                var ox = obj.pos.x - (t.pos.x - (signx*t.xw));//this gives is the coordinates of the innermost
                var oy = obj.pos.y - t.pos.y;//point on the circle, relative to the tile corner

                //if the component of (ox,oy) parallel to the normal's righthand normal
                //has the same sign as the slope of the slope (the sign of the slope's slope is signx*signy)
                //then we project by the vertex, otherwise by the normal or axially.
                //note that this is simply a VERY tricky/weird method of determining
                //if the circle is in side the slope/face's voronio region, or that of the vertex.

                var perp = (ox*-sy) + (oy*sx);
                if (0 < (perp*signx*signy))
                ***REMOVED***
                    //collide vs. vertex
                    var len = Math.sqrt(ox*ox + oy*oy);
                    var pen = r - len;
                    if (0 < pen)
                    ***REMOVED***
                        //note: if len=0, then perp=0 and we'll never reach here, so don't worry about div-by-0
                        ox /= len;
                        oy /= len;

                        obj.reportCollisionVsWorld(ox*pen, oy*pen, ox, oy, t);

                        return Phaser.Physics.Ninja.Circle.COL_OTHER;
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    //collide vs. slope or vs axis
                    ox -= r*sx;//this gives us the vector from
                    oy -= r*sy;//a point on the slope to the innermost point on the circle

                    //if the dotprod of (ox,oy) and (sx,sy) is negative, the point on the circle is in the slope
                    //and we need toproject it out by the magnitude of the projection of (ox,oy) onto (sx,sy)
                    var dp = (ox*sx) + (oy*sy);

                    if (dp < 0)
                    ***REMOVED***
                        //collision; project delta onto slope and use this to displace the object
                        sx *= -dp;//(sx,sy) is now the projection vector
                        sy *= -dp;

                        var lenN = Math.sqrt(sx*sx + sy*sy);

                        //find the smallest axial projection vector
                        if (x < y)
                        ***REMOVED***
                            //penetration in x is smaller
                            lenP = x;
                            y = 0;
                            //get sign for projection along x-axis
                            if ((obj.pos.x - t.pos.x) < 0)
                            ***REMOVED***
                                x *= -1;
                            ***REMOVED***
                        ***REMOVED***
                        else
                        ***REMOVED***
                            //penetration in y is smaller
                            lenP = y;
                            x = 0;
                            //get sign for projection along y-axis
                            if ((obj.pos.y - t.pos.y)< 0)
                            ***REMOVED***
                                y *= -1;
                            ***REMOVED***
                        ***REMOVED***

                        if (lenP < lenN)
                        ***REMOVED***
                            obj.reportCollisionVsWorld(x,y,x/lenP, y/lenP, t);

                            return Phaser.Physics.Ninja.Circle.COL_AXIS;
                        ***REMOVED***
                        else
                        ***REMOVED***
                            obj.reportCollisionVsWorld(sx,sy,t.sx,t.sy,t);

                            return Phaser.Physics.Ninja.Circle.COL_OTHER;
                        ***REMOVED***

                    ***REMOVED***
                ***REMOVED***

            ***REMOVED***
            else
            ***REMOVED***
                //colliding vertically; we can assume that (signy*oV) < 0
                //due to the first conditional far above

                obj.reportCollisionVsWorld(0,y*oV, 0, oV, t);

                return Phaser.Physics.Ninja.Circle.COL_AXIS;
            ***REMOVED***
        ***REMOVED***
        else if (oV === 0)
        ***REMOVED***
            //colliding horizontally
            if ((signx*oH) < 0)
            ***REMOVED***
                //colliding with face/edge OR with corner of wedge, depending on our position vertically

                //collide vs. vertex
                //get diag vertex position
                var vx = t.pos.x - (signx*t.xw);
                var vy = t.pos.y;

                var dx = obj.pos.x - vx;//calc vert->circle vector
                var dy = obj.pos.y - vy;

                if ((dy*signy) < 0)
                ***REMOVED***
                    //colliding vs face
                    obj.reportCollisionVsWorld(x*oH, 0, oH, 0, t);

                    return Phaser.Physics.Ninja.Circle.COL_AXIS;
                ***REMOVED***
                else
                ***REMOVED***
                    //colliding vs. vertex

                    var len = Math.sqrt(dx*dx + dy*dy);
                    var pen = obj.radius - len;
                    if (0 < pen)
                    ***REMOVED***
                        //vertex is in the circle; project outward
                        if (len === 0)
                        ***REMOVED***
                            //project out by 45deg
                            dx = oH / Math.SQRT2;
                            dy = oV / Math.SQRT2;
                        ***REMOVED***
                        else
                        ***REMOVED***
                            dx /= len;
                            dy /= len;
                        ***REMOVED***

                        obj.reportCollisionVsWorld(dx*pen, dy*pen, dx, dy, t);

                        return Phaser.Physics.Ninja.Circle.COL_OTHER;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                //we could only be colliding vs the slope OR a vertex
                //look at the vector form the closest vert to the circle to decide

                var sx = t.sx;
                var sy = t.sy;

                var ox = obj.pos.x - (t.pos.x + (oH*t.xw));//this gives is the coordinates of the innermost
                var oy = obj.pos.y - (t.pos.y - (signy*t.yw));//point on the circle, relative to the closest tile vert

                //if the component of (ox,oy) parallel to the normal's righthand normal
                //has the same sign as the slope of the slope (the sign of the slope's slope is signx*signy)
                //then we project by the normal, otherwise by the vertex.
                //(NOTE: this is the opposite logic of the vertical case;
                // for vertical, if the perp prod and the slope's slope agree, it's outside.
                // for horizontal, if the perp prod and the slope's slope agree, circle is inside.
                //  ..but this is only a property of flahs' coord system (i.e the rules might swap
                // in righthanded systems))
                //note that this is simply a VERY tricky/weird method of determining
                //if the circle is in side the slope/face's voronio region, or that of the vertex.
                var perp = (ox*-sy) + (oy*sx);
                if ((perp*signx*signy) < 0)
                ***REMOVED***
                    //collide vs. vertex
                    var len = Math.sqrt(ox*ox + oy*oy);
                    var pen = obj.radius - len;
                    if (0 < pen)
                    ***REMOVED***
                        //note: if len=0, then perp=0 and we'll never reach here, so don't worry about div-by-0
                        ox /= len;
                        oy /= len;

                        obj.reportCollisionVsWorld(ox*pen, oy*pen, ox, oy, t);

                        return Phaser.Physics.Ninja.Circle.COL_OTHER;
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    //collide vs. slope

                    //if the component of (ox,oy) parallel to the normal is less than the circle radius, we're
                    //penetrating the slope. note that this method of penetration calculation doesn't hold
                    //in general (i.e it won't work if the circle is in the slope), but works in this case
                    //because we know the circle is in a neighboring cell
                    var dp = (ox*sx) + (oy*sy);
                    var pen = obj.radius - Math.abs(dp);//note: we don't need the abs because we know the dp will be positive, but just in case..

                    if (0 < pen)
                    ***REMOVED***
                        //collision; circle out along normal by penetration amount
                        obj.reportCollisionVsWorld(sx*pen, sy*pen, sx, sy, t);

                        return Phaser.Physics.Ninja.Circle.COL_OTHER;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***

            //colliding diagonally; due to the first conditional above,
            //obj is vertically offset against slope, and offset in either direction horizontally

            //collide vs. vertex
            //get diag vertex position
            var vx = t.pos.x + (oH*t.xw);
            var vy = t.pos.y + (oV*t.yw);

            var dx = obj.pos.x - vx;//calc vert->circle vector
            var dy = obj.pos.y - vy;

            var len = Math.sqrt(dx*dx + dy*dy);
            var pen = obj.radius - len;
            if (0 < pen)
            ***REMOVED***
                //vertex is in the circle; project outward
                if (len === 0)
                ***REMOVED***
                    //project out by 45deg
                    dx = oH / Math.SQRT2;
                    dy = oV / Math.SQRT2;
                ***REMOVED***
                else
                ***REMOVED***
                    dx /= len;
                    dy /= len;
                ***REMOVED***

                obj.reportCollisionVsWorld(dx*pen, dy*pen, dx, dy, t);

                return Phaser.Physics.Ninja.Circle.COL_OTHER;
            ***REMOVED***
        ***REMOVED***

        return Phaser.Physics.Ninja.Circle.COL_NONE;

    ***REMOVED***,

    /**
    * Resolves 22 Degree tile collision.
    *
    * @method Phaser.Physics.Ninja.Circle#projCircle_22DegB
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***number***REMOVED*** oH - Grid / voronoi region.
    * @param ***REMOVED***number***REMOVED*** oV - Grid / voronoi region.
    * @param ***REMOVED***Phaser.Physics.Ninja.Circle***REMOVED*** obj - The Circle involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***number***REMOVED*** The result of the collision.
    */
    projCircle_22DegB: function (x,y,oH, oV, obj,t) ***REMOVED***

        //if we're colliding diagonally:
        //  -if we're in the cell pointed at by the normal, collide vs slope, else
        //  collide vs. the appropriate corner/vertex
        //
        //if obj is in this tile: collide as with aabb
        //
        //if obj is horiz or vertical neighbor AGAINST the slope: collide with edge
        //
        //if obj is horiz neighb in direction of slope: collide vs. slope or vertex or edge
        //
        //if obj is vert neighb in direction of slope: collide vs. slope or vertex

        var lenP;
        var signx = t.signx;
        var signy = t.signy;

        if (oH === 0)
        ***REMOVED***
            if (oV === 0)
            ***REMOVED***
                //colliding with current cell

                var sx = t.sx;
                var sy = t.sy;

                var r = obj.radius;
                var ox = (obj.pos.x - (sx*r)) - (t.pos.x - (signx*t.xw));//this gives is the coordinates of the innermost
                var oy = (obj.pos.y - (sy*r)) - (t.pos.y + (signy*t.yw));//point on the AABB, relative to a point on the slope

                //if the dotprod of (ox,oy) and (sx,sy) is negative, the point on the circle is in the slope
                //and we need toproject it out by the magnitude of the projection of (ox,oy) onto (sx,sy)
                var dp = (ox*sx) + (oy*sy);

                if (dp < 0)
                ***REMOVED***
                    //collision; project delta onto slope and use this to displace the object
                    sx *= -dp;//(sx,sy) is now the projection vector
                    sy *= -dp;

                    var lenN = Math.sqrt(sx*sx + sy*sy);

                    //find the smallest axial projection vector
                    if (x < y)
                    ***REMOVED***
                        //penetration in x is smaller
                        lenP = x;
                        y = 0;
                        //get sign for projection along x-axis
                        if ((obj.pos.x - t.pos.x) < 0)
                        ***REMOVED***
                            x *= -1;
                        ***REMOVED***
                    ***REMOVED***
                    else
                    ***REMOVED***
                        //penetration in y is smaller
                        lenP = y;
                        x = 0;
                        //get sign for projection along y-axis
                        if ((obj.pos.y - t.pos.y)< 0)
                        ***REMOVED***
                            y *= -1;
                        ***REMOVED***
                    ***REMOVED***

                    if (lenP < lenN)
                    ***REMOVED***
                        obj.reportCollisionVsWorld(x, y, x/lenP, y/lenP, t);

                        return Phaser.Physics.Ninja.Circle.COL_AXIS;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        obj.reportCollisionVsWorld(sx, sy, t.sx, t.sy, t);

                        return Phaser.Physics.Ninja.Circle.COL_OTHER;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                //colliding vertically

                if ((signy*oV) < 0)
                ***REMOVED***
                    //colliding with face/edge
                    obj.reportCollisionVsWorld(0, y*oV, 0, oV, t);

                    return Phaser.Physics.Ninja.Circle.COL_AXIS;
                ***REMOVED***
                else
                ***REMOVED***
                    //we could only be colliding vs the slope OR a vertex
                    //look at the vector form the closest vert to the circle to decide

                    var sx = t.sx;
                    var sy = t.sy;

                    var ox = obj.pos.x - (t.pos.x - (signx*t.xw));//this gives is the coordinates of the innermost
                    var oy = obj.pos.y - (t.pos.y + (signy*t.yw));//point on the circle, relative to the closest tile vert

                    //if the component of (ox,oy) parallel to the normal's righthand normal
                    //has the same sign as the slope of the slope (the sign of the slope's slope is signx*signy)
                    //then we project by the vertex, otherwise by the normal.
                    //note that this is simply a VERY tricky/weird method of determining
                    //if the circle is in side the slope/face's voronio region, or that of the vertex.
                    var perp = (ox*-sy) + (oy*sx);
                    if (0 < (perp*signx*signy))
                    ***REMOVED***
                        //collide vs. vertex
                        var len = Math.sqrt(ox*ox + oy*oy);
                        var pen = obj.radius - len;
                        if (0 < pen)
                        ***REMOVED***
                            //note: if len=0, then perp=0 and we'll never reach here, so don't worry about div-by-0
                            ox /= len;
                            oy /= len;

                            obj.reportCollisionVsWorld(ox*pen, oy*pen, ox, oy, t);

                            return Phaser.Physics.Ninja.Circle.COL_OTHER;
                        ***REMOVED***
                    ***REMOVED***
                    else
                    ***REMOVED***
                        //collide vs. slope

                        //if the component of (ox,oy) parallel to the normal is less than the circle radius, we're
                        //penetrating the slope. note that this method of penetration calculation doesn't hold
                        //in general (i.e it won't work if the circle is in the slope), but works in this case
                        //because we know the circle is in a neighboring cell
                        var dp = (ox*sx) + (oy*sy);
                        var pen = obj.radius - Math.abs(dp);//note: we don't need the abs because we know the dp will be positive, but just in case..
                        if (0 < pen)
                        ***REMOVED***
                            //collision; circle out along normal by penetration amount
                            obj.reportCollisionVsWorld(sx*pen, sy*pen,sx, sy, t);

                            return Phaser.Physics.Ninja.Circle.COL_OTHER;
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else if (oV === 0)
        ***REMOVED***
            //colliding horizontally

            if ((signx*oH) < 0)
            ***REMOVED***
                //colliding with face/edge
                obj.reportCollisionVsWorld(x*oH, 0, oH, 0, t);

                return Phaser.Physics.Ninja.Circle.COL_AXIS;
            ***REMOVED***
            else
            ***REMOVED***
                //colliding with edge, slope, or vertex

                var ox = obj.pos.x - (t.pos.x + (signx*t.xw));//this gives is the coordinates of the innermost
                var oy = obj.pos.y - t.pos.y;//point on the circle, relative to the closest tile vert

                if ((oy*signy) < 0)
                ***REMOVED***
                    //we're colliding with the halfface
                    obj.reportCollisionVsWorld(x*oH, 0, oH, 0, t);

                    return Phaser.Physics.Ninja.Circle.COL_AXIS;
                ***REMOVED***
                else
                ***REMOVED***
                    //colliding with the vertex or slope

                    var sx = t.sx;
                    var sy = t.sy;

                    //if the component of (ox,oy) parallel to the normal's righthand normal
                    //has the same sign as the slope of the slope (the sign of the slope's slope is signx*signy)
                    //then we project by the slope, otherwise by the vertex.
                    //note that this is simply a VERY tricky/weird method of determining
                    //if the circle is in side the slope/face's voronio region, or that of the vertex.
                    var perp = (ox*-sy) + (oy*sx);
                    if ((perp*signx*signy) < 0)
                    ***REMOVED***
                        //collide vs. vertex
                        var len = Math.sqrt(ox*ox + oy*oy);
                        var pen = obj.radius - len;
                        if (0 < pen)
                        ***REMOVED***
                            //note: if len=0, then perp=0 and we'll never reach here, so don't worry about div-by-0
                            ox /= len;
                            oy /= len;

                            obj.reportCollisionVsWorld(ox*pen, oy*pen, ox, oy, t);

                            return Phaser.Physics.Ninja.Circle.COL_OTHER;
                        ***REMOVED***
                    ***REMOVED***
                    else
                    ***REMOVED***
                        //collide vs. slope

                        //if the component of (ox,oy) parallel to the normal is less than the circle radius, we're
                        //penetrating the slope. note that this method of penetration calculation doesn't hold
                        //in general (i.e it won't work if the circle is in the slope), but works in this case
                        //because we know the circle is in a neighboring cell
                        var dp = (ox*sx) + (oy*sy);
                        var pen = obj.radius - Math.abs(dp);//note: we don't need the abs because we know the dp will be positive, but just in case..
                        if (0 < pen)
                        ***REMOVED***
                            //collision; circle out along normal by penetration amount
                            obj.reportCollisionVsWorld(sx*pen, sy*pen, t.sx, t.sy, t);

                            return Phaser.Physics.Ninja.Circle.COL_OTHER;
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //colliding diagonally
            if ( 0 < ((signx*oH) + (signy*oV)) )
            ***REMOVED***
                //the dotprod of slope normal and cell offset is strictly positive,
                //therefore obj is in the diagonal neighb pointed at by the normal.

                //collide vs slope

                //we should really precalc this at compile time, but for now, fuck it
                var slen = Math.sqrt(2*2 + 1*1);//the raw slope is (-2,-1)
                var sx = (signx*1) / slen;//get slope _unit_ normal;
                var sy = (signy*2) / slen;//raw RH normal is (1,-2)

                var r = obj.radius;
                var ox = (obj.pos.x - (sx*r)) - (t.pos.x - (signx*t.xw));//this gives is the coordinates of the innermost
                var oy = (obj.pos.y - (sy*r)) - (t.pos.y + (signy*t.yw));//point on the circle, relative to a point on the slope

                //if the dotprod of (ox,oy) and (sx,sy) is negative, the point on the circle is in the slope
                //and we need toproject it out by the magnitude of the projection of (ox,oy) onto (sx,sy)
                var dp = (ox*sx) + (oy*sy);

                if (dp < 0)
                ***REMOVED***
                    //collision; project delta onto slope and use this to displace the object
                    //(sx,sy)*-dp is the projection vector
                    obj.reportCollisionVsWorld(-sx*dp, -sy*dp, t.sx, t.sy, t);

                    return Phaser.Physics.Ninja.Circle.COL_OTHER;
                ***REMOVED***
                return Phaser.Physics.Ninja.Circle.COL_NONE;
            ***REMOVED***
            else
            ***REMOVED***
                //collide vs the appropriate vertex
                var vx = t.pos.x + (oH*t.xw);
                var vy = t.pos.y + (oV*t.yw);

                var dx = obj.pos.x - vx;//calc vert->circle vector
                var dy = obj.pos.y - vy;

                var len = Math.sqrt(dx*dx + dy*dy);
                var pen = obj.radius - len;
                if (0 < pen)
                ***REMOVED***
                    //vertex is in the circle; project outward
                    if (len === 0)
                    ***REMOVED***
                        //project out by 45deg
                        dx = oH / Math.SQRT2;
                        dy = oV / Math.SQRT2;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        dx /= len;
                        dy /= len;
                    ***REMOVED***

                    obj.reportCollisionVsWorld(dx*pen, dy*pen, dx, dy, t);

                    return Phaser.Physics.Ninja.Circle.COL_OTHER;
                ***REMOVED***

            ***REMOVED***
        ***REMOVED***

        return Phaser.Physics.Ninja.Circle.COL_NONE;
    ***REMOVED***,

    /**
    * Resolves 67 Degree tile collision.
    *
    * @method Phaser.Physics.Ninja.Circle#projCircle_67DegS
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***number***REMOVED*** oH - Grid / voronoi region.
    * @param ***REMOVED***number***REMOVED*** oV - Grid / voronoi region.
    * @param ***REMOVED***Phaser.Physics.Ninja.Circle***REMOVED*** obj - The Circle involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***number***REMOVED*** The result of the collision.
    */
    projCircle_67DegS: function (x,y,oH,oV,obj,t) ***REMOVED***

        //if the object is in a cell pointed at by signx, no collision will ever occur
        //otherwise,
        //
        //if we're colliding diagonally:
        //  -collide vs. the appropriate vertex
        //if obj is in this tile: collide vs slope or vertex or axis
        //if obj is vert neighb in direction of slope: collide vs. slope or vertex
        //if obj is vert neighb against the slope:
        //   if (distance in y from circle to 90deg corner of tile < 1/2 tileheight, collide vs. face)
        //   else(collide vs. corner of slope) (vert collision with a non-grid-aligned vert)
        //if obj is horiz neighb against direction of slope: collide vs. face

        var signx = t.signx;
        var signy = t.signy;

        if (0 < (signx*oH))
        ***REMOVED***
            //object will never collide vs tile, it can't reach that far

            return Phaser.Physics.Ninja.Circle.COL_NONE;
        ***REMOVED***
        else if (oH === 0)
        ***REMOVED***
            if (oV === 0)
            ***REMOVED***
                //colliding with current tile
                //we could only be colliding vs the slope OR a vertex
                //look at the vector form the closest vert to the circle to decide

                var lenP;
                var sx = t.sx;
                var sy = t.sy;

                var r = obj.radius;
                var ox = obj.pos.x - t.pos.x;//this gives is the coordinates of the innermost
                var oy = obj.pos.y - (t.pos.y - (signy*t.yw));//point on the circle, relative to the tile corner

                //if the component of (ox,oy) parallel to the normal's righthand normal
                //has the same sign as the slope of the slope (the sign of the slope's slope is signx*signy)
                //then we project by the normal or axis, otherwise by the corner/vertex
                //note that this is simply a VERY tricky/weird method of determining
                //if the circle is in side the slope/face's voronoi region, or that of the vertex.

                var perp = (ox*-sy) + (oy*sx);
                if ((perp*signx*signy) < 0)
                ***REMOVED***
                    //collide vs. vertex
                    var len = Math.sqrt(ox*ox + oy*oy);
                    var pen = r - len;
                    if (0 < pen)
                    ***REMOVED***
                        //note: if len=0, then perp=0 and we'll never reach here, so don't worry about div-by-0
                        ox /= len;
                        oy /= len;

                        obj.reportCollisionVsWorld(ox*pen, oy*pen, ox, oy, t);
                        return Phaser.Physics.Ninja.Circle.COL_OTHER;
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    //collide vs. slope or vs axis
                    ox -= r*sx;//this gives us the vector from
                    oy -= r*sy;//a point on the slope to the innermost point on the circle

                    //if the dotprod of (ox,oy) and (sx,sy) is negative, the point on the circle is in the slope
                    //and we need toproject it out by the magnitude of the projection of (ox,oy) onto (sx,sy)
                    var dp = (ox*sx) + (oy*sy);

                    if (dp < 0)
                    ***REMOVED***
                        //collision; project delta onto slope and use this to displace the object
                        sx *= -dp;//(sx,sy) is now the projection vector
                        sy *= -dp;

                        var lenN = Math.sqrt(sx*sx + sy*sy);

                        //find the smallest axial projection vector
                        if (x < y)
                        ***REMOVED***
                            //penetration in x is smaller
                            lenP = x;
                            y = 0;
                            //get sign for projection along x-axis
                            if ((obj.pos.x - t.pos.x) < 0)
                            ***REMOVED***
                                x *= -1;
                            ***REMOVED***
                        ***REMOVED***
                        else
                        ***REMOVED***
                            //penetration in y is smaller
                            lenP = y;
                            x = 0;
                            //get sign for projection along y-axis
                            if ((obj.pos.y - t.pos.y)< 0)
                            ***REMOVED***
                                y *= -1;
                            ***REMOVED***
                        ***REMOVED***

                        if (lenP < lenN)
                        ***REMOVED***
                            obj.reportCollisionVsWorld(x,y,x/lenP, y/lenP, t);

                            return Phaser.Physics.Ninja.Circle.COL_AXIS;
                        ***REMOVED***
                        else
                        ***REMOVED***
                            obj.reportCollisionVsWorld(sx,sy,t.sx,t.sy,t);

                            return Phaser.Physics.Ninja.Circle.COL_OTHER;
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***

            ***REMOVED***
            else
            ***REMOVED***
                //colliding vertically

                if ((signy*oV) < 0)
                ***REMOVED***
                    //colliding with face/edge OR with corner of wedge, depending on our position vertically

                    //collide vs. vertex
                    //get diag vertex position
                    var vx = t.pos.x;
                    var vy = t.pos.y - (signy*t.yw);

                    var dx = obj.pos.x - vx;//calc vert->circle vector
                    var dy = obj.pos.y - vy;

                    if ((dx*signx) < 0)
                    ***REMOVED***
                        //colliding vs face
                        obj.reportCollisionVsWorld(0, y*oV, 0, oV, t);

                        return Phaser.Physics.Ninja.Circle.COL_AXIS;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        //colliding vs. vertex

                        var len = Math.sqrt(dx*dx + dy*dy);
                        var pen = obj.radius - len;
                        if (0 < pen)
                        ***REMOVED***
                            //vertex is in the circle; project outward
                            if (len === 0)
                            ***REMOVED***
                                //project out by 45deg
                                dx = oH / Math.SQRT2;
                                dy = oV / Math.SQRT2;
                            ***REMOVED***
                            else
                            ***REMOVED***
                                dx /= len;
                                dy /= len;
                            ***REMOVED***

                            obj.reportCollisionVsWorld(dx*pen, dy*pen, dx, dy, t);

                            return Phaser.Physics.Ninja.Circle.COL_OTHER;
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    //we could only be colliding vs the slope OR a vertex
                    //look at the vector form the closest vert to the circle to decide

                    var sx = t.sx;
                    var sy = t.sy;

                    var ox = obj.pos.x - (t.pos.x - (signx*t.xw));//this gives is the coordinates of the innermost
                    var oy = obj.pos.y - (t.pos.y + (oV*t.yw));//point on the circle, relative to the closest tile vert

                    //if the component of (ox,oy) parallel to the normal's righthand normal
                    //has the same sign as the slope of the slope (the sign of the slope's slope is signx*signy)
                    //then we project by the vertex, otherwise by the normal.
                    //note that this is simply a VERY tricky/weird method of determining
                    //if the circle is in side the slope/face's voronio region, or that of the vertex.
                    var perp = (ox*-sy) + (oy*sx);
                    if (0 < (perp*signx*signy))
                    ***REMOVED***
                        //collide vs. vertex
                        var len = Math.sqrt(ox*ox + oy*oy);
                        var pen = obj.radius - len;
                        if (0 < pen)
                        ***REMOVED***
                            //note: if len=0, then perp=0 and we'll never reach here, so don't worry about div-by-0
                            ox /= len;
                            oy /= len;

                            obj.reportCollisionVsWorld(ox*pen, oy*pen, ox, oy, t);

                            return Phaser.Physics.Ninja.Circle.COL_OTHER;
                        ***REMOVED***
                    ***REMOVED***
                    else
                    ***REMOVED***
                        //collide vs. slope

                        //if the component of (ox,oy) parallel to the normal is less than the circle radius, we're
                        //penetrating the slope. note that this method of penetration calculation doesn't hold
                        //in general (i.e it won't work if the circle is in the slope), but works in this case
                        //because we know the circle is in a neighboring cell
                        var dp = (ox*sx) + (oy*sy);
                        var pen = obj.radius - Math.abs(dp);//note: we don't need the abs because we know the dp will be positive, but just in case..

                        if (0 < pen)
                        ***REMOVED***
                            //collision; circle out along normal by penetration amount
                            obj.reportCollisionVsWorld(sx*pen, sy*pen, t.sx, t.sy, t);

                            return Phaser.Physics.Ninja.Circle.COL_OTHER;
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else if (oV === 0)
        ***REMOVED***
            //colliding horizontally; we can assume that (signy*oV) < 0
            //due to the first conditional far above

            obj.reportCollisionVsWorld(x*oH, 0, oH, 0, t);

            return Phaser.Physics.Ninja.Circle.COL_AXIS;
        ***REMOVED***
        else
        ***REMOVED***
            //colliding diagonally; due to the first conditional above,
            //obj is vertically offset against slope, and offset in either direction horizontally

            //collide vs. vertex
            //get diag vertex position
            var vx = t.pos.x + (oH*t.xw);
            var vy = t.pos.y + (oV*t.yw);

            var dx = obj.pos.x - vx;//calc vert->circle vector
            var dy = obj.pos.y - vy;

            var len = Math.sqrt(dx*dx + dy*dy);
            var pen = obj.radius - len;
            if (0 < pen)
            ***REMOVED***
                //vertex is in the circle; project outward
                if (len === 0)
                ***REMOVED***
                    //project out by 45deg
                    dx = oH / Math.SQRT2;
                    dy = oV / Math.SQRT2;
                ***REMOVED***
                else
                ***REMOVED***
                    dx /= len;
                    dy /= len;
                ***REMOVED***

                obj.reportCollisionVsWorld(dx*pen, dy*pen, dx, dy, t);

                return Phaser.Physics.Ninja.Circle.COL_OTHER;
            ***REMOVED***
        ***REMOVED***

        return Phaser.Physics.Ninja.Circle.COL_NONE;

    ***REMOVED***,

    /**
    * Resolves 67 Degree tile collision.
    *
    * @method Phaser.Physics.Ninja.Circle#projCircle_67DegB
    * @param ***REMOVED***number***REMOVED*** x - Penetration depth on the x axis.
    * @param ***REMOVED***number***REMOVED*** y - Penetration depth on the y axis.
    * @param ***REMOVED***number***REMOVED*** oH - Grid / voronoi region.
    * @param ***REMOVED***number***REMOVED*** oV - Grid / voronoi region.
    * @param ***REMOVED***Phaser.Physics.Ninja.Circle***REMOVED*** obj - The Circle involved in the collision.
    * @param ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** t - The Tile involved in the collision.
    * @return ***REMOVED***number***REMOVED*** The result of the collision.
    */
    projCircle_67DegB: function (x,y,oH, oV, obj,t) ***REMOVED***

        //if we're colliding diagonally:
        //  -if we're in the cell pointed at by the normal, collide vs slope, else
        //  collide vs. the appropriate corner/vertex
        //
        //if obj is in this tile: collide as with aabb
        //
        //if obj is horiz or vertical neighbor AGAINST the slope: collide with edge
        //
        //if obj is vert neighb in direction of slope: collide vs. slope or vertex or halfedge
        //
        //if obj is horiz neighb in direction of slope: collide vs. slope or vertex

        var signx = t.signx;
        var signy = t.signy;

        if (oH === 0)
        ***REMOVED***
            if (oV === 0)
            ***REMOVED***
                //colliding with current cell

                var lenP;
                var sx = t.sx;
                var sy = t.sy;

                var r = obj.radius;
                var ox = (obj.pos.x - (sx*r)) - (t.pos.x + (signx*t.xw));//this gives is the coordinates of the innermost
                var oy = (obj.pos.y - (sy*r)) - (t.pos.y - (signy*t.yw));//point on the AABB, relative to a point on the slope

                //if the dotprod of (ox,oy) and (sx,sy) is negative, the point on the circle is in the slope
                //and we need toproject it out by the magnitude of the projection of (ox,oy) onto (sx,sy)
                var dp = (ox*sx) + (oy*sy);

                if (dp < 0)
                ***REMOVED***
                    //collision; project delta onto slope and use this to displace the object
                    sx *= -dp;//(sx,sy) is now the projection vector
                    sy *= -dp;

                    var lenN = Math.sqrt(sx*sx + sy*sy);

                    //find the smallest axial projection vector
                    if (x < y)
                    ***REMOVED***
                        //penetration in x is smaller
                        lenP = x;
                        y = 0;
                        //get sign for projection along x-axis
                        if ((obj.pos.x - t.pos.x) < 0)
                        ***REMOVED***
                            x *= -1;
                        ***REMOVED***
                    ***REMOVED***
                    else
                    ***REMOVED***
                        //penetration in y is smaller
                        lenP = y;
                        x = 0;
                        //get sign for projection along y-axis
                        if ((obj.pos.y - t.pos.y)< 0)
                        ***REMOVED***
                            y *= -1;
                        ***REMOVED***
                    ***REMOVED***

                    if (lenP < lenN)
                    ***REMOVED***
                        obj.reportCollisionVsWorld(x,y,x/lenP, y/lenP, t);

                        return Phaser.Physics.Ninja.Circle.COL_AXIS;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        obj.reportCollisionVsWorld(sx, sy, t.sx, t.sy, t);

                        return Phaser.Physics.Ninja.Circle.COL_OTHER;
                    ***REMOVED***

                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                //colliding vertically

                if ((signy*oV) < 0)
                ***REMOVED***
                    //colliding with face/edge
                    obj.reportCollisionVsWorld(0, y*oV, 0, oV, t);

                    return Phaser.Physics.Ninja.Circle.COL_AXIS;
                ***REMOVED***
                else
                ***REMOVED***
                    //colliding with edge, slope, or vertex

                    var ox = obj.pos.x - t.pos.x;//this gives is the coordinates of the innermost
                    var oy = obj.pos.y - (t.pos.y + (signy*t.yw));//point on the circle, relative to the closest tile vert

                    if ((ox*signx) < 0)
                    ***REMOVED***
                        //we're colliding with the halfface
                        obj.reportCollisionVsWorld(0, y*oV, 0, oV, t);

                        return Phaser.Physics.Ninja.Circle.COL_AXIS;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        //colliding with the vertex or slope

                        var sx = t.sx;
                        var sy = t.sy;

                        //if the component of (ox,oy) parallel to the normal's righthand normal
                        //has the same sign as the slope of the slope (the sign of the slope's slope is signx*signy)
                        //then we project by the vertex, otherwise by the slope.
                        //note that this is simply a VERY tricky/weird method of determining
                        //if the circle is in side the slope/face's voronio region, or that of the vertex.
                        var perp = (ox*-sy) + (oy*sx);
                        if (0 < (perp*signx*signy))
                        ***REMOVED***
                            //collide vs. vertex
                            var len = Math.sqrt(ox*ox + oy*oy);
                            var pen = obj.radius - len;
                            if (0 < pen)
                            ***REMOVED***
                                //note: if len=0, then perp=0 and we'll never reach here, so don't worry about div-by-0
                                ox /= len;
                                oy /= len;

                                obj.reportCollisionVsWorld(ox*pen, oy*pen, ox, oy, t);

                                return Phaser.Physics.Ninja.Circle.COL_OTHER;
                            ***REMOVED***
                        ***REMOVED***
                        else
                        ***REMOVED***
                            //collide vs. slope

                            //if the component of (ox,oy) parallel to the normal is less than the circle radius, we're
                            //penetrating the slope. note that this method of penetration calculation doesn't hold
                            //in general (i.e it won't work if the circle is in the slope), but works in this case
                            //because we know the circle is in a neighboring cell
                            var dp = (ox*sx) + (oy*sy);
                            var pen = obj.radius - Math.abs(dp);//note: we don't need the abs because we know the dp will be positive, but just in case..
                            if (0 < pen)
                            ***REMOVED***
                                //collision; circle out along normal by penetration amount
                                obj.reportCollisionVsWorld(sx*pen, sy*pen, sx, sy, t);

                                return Phaser.Physics.Ninja.Circle.COL_OTHER;
                            ***REMOVED***
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else if (oV === 0)
        ***REMOVED***
            //colliding horizontally

            if ((signx*oH) < 0)
            ***REMOVED***
                //colliding with face/edge
                obj.reportCollisionVsWorld(x*oH, 0, oH, 0, t);

                return Phaser.Physics.Ninja.Circle.COL_AXIS;
            ***REMOVED***
            else
            ***REMOVED***
                //we could only be colliding vs the slope OR a vertex
                //look at the vector form the closest vert to the circle to decide

                var slen = Math.sqrt(2*2 + 1*1);//the raw slope is (-2,-1)
                var sx = (signx*2) / slen;//get slope _unit_ normal;
                var sy = (signy*1) / slen;//raw RH normal is (1,-2)

                var ox = obj.pos.x - (t.pos.x + (signx*t.xw));//this gives is the coordinates of the innermost
                var oy = obj.pos.y - (t.pos.y - (signy*t.yw));//point on the circle, relative to the closest tile vert

                //if the component of (ox,oy) parallel to the normal's righthand normal
                //has the same sign as the slope of the slope (the sign of the slope's slope is signx*signy)
                //then we project by the slope, otherwise by the vertex.
                //note that this is simply a VERY tricky/weird method of determining
                //if the circle is in side the slope/face's voronio region, or that of the vertex.
                var perp = (ox*-sy) + (oy*sx);
                if ((perp*signx*signy) < 0)
                ***REMOVED***
                    //collide vs. vertex
                    var len = Math.sqrt(ox*ox + oy*oy);
                    var pen = obj.radius - len;
                    if (0 < pen)
                    ***REMOVED***
                        //note: if len=0, then perp=0 and we'll never reach here, so don't worry about div-by-0
                        ox /= len;
                        oy /= len;

                        obj.reportCollisionVsWorld(ox*pen, oy*pen, ox, oy, t);

                        return Phaser.Physics.Ninja.Circle.COL_OTHER;
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    //collide vs. slope

                    //if the component of (ox,oy) parallel to the normal is less than the circle radius, we're
                    //penetrating the slope. note that this method of penetration calculation doesn't hold
                    //in general (i.e it won't work if the circle is in the slope), but works in this case
                    //because we know the circle is in a neighboring cell
                    var dp = (ox*sx) + (oy*sy);
                    var pen = obj.radius - Math.abs(dp);//note: we don't need the abs because we know the dp will be positive, but just in case..
                    if (0 < pen)
                    ***REMOVED***
                        //collision; circle out along normal by penetration amount
                        obj.reportCollisionVsWorld(sx*pen, sy*pen, t.sx, t.sy, t);

                        return Phaser.Physics.Ninja.Circle.COL_OTHER;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //colliding diagonally
            if ( 0 < ((signx*oH) + (signy*oV)) )
            ***REMOVED***
                //the dotprod of slope normal and cell offset is strictly positive,
                //therefore obj is in the diagonal neighb pointed at by the normal.

                //collide vs slope

                var sx = t.sx;
                var sy = t.sy;

                var r = obj.radius;
                var ox = (obj.pos.x - (sx*r)) - (t.pos.x + (signx*t.xw));//this gives is the coordinates of the innermost
                var oy = (obj.pos.y - (sy*r)) - (t.pos.y - (signy*t.yw));//point on the circle, relative to a point on the slope

                //if the dotprod of (ox,oy) and (sx,sy) is negative, the point on the circle is in the slope
                //and we need toproject it out by the magnitude of the projection of (ox,oy) onto (sx,sy)
                var dp = (ox*sx) + (oy*sy);

                if (dp < 0)
                ***REMOVED***
                    //collision; project delta onto slope and use this to displace the object
                    //(sx,sy)*-dp is the projection vector

                    obj.reportCollisionVsWorld(-sx*dp, -sy*dp, t.sx, t.sy, t);

                    return Phaser.Physics.Ninja.Circle.COL_OTHER;
                ***REMOVED***
                return Phaser.Physics.Ninja.Circle.COL_NONE;
            ***REMOVED***
            else
            ***REMOVED***

                //collide vs the appropriate vertex
                var vx = t.pos.x + (oH*t.xw);
                var vy = t.pos.y + (oV*t.yw);

                var dx = obj.pos.x - vx;//calc vert->circle vector
                var dy = obj.pos.y - vy;

                var len = Math.sqrt(dx*dx + dy*dy);
                var pen = obj.radius - len;
                if (0 < pen)
                ***REMOVED***
                    //vertex is in the circle; project outward
                    if (len === 0)
                    ***REMOVED***
                        //project out by 45deg
                        dx = oH / Math.SQRT2;
                        dy = oV / Math.SQRT2;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        dx /= len;
                        dy /= len;
                    ***REMOVED***

                    obj.reportCollisionVsWorld(dx*pen, dy*pen, dx, dy, t);

                    return Phaser.Physics.Ninja.Circle.COL_OTHER;
                ***REMOVED***

            ***REMOVED***
        ***REMOVED***

        return Phaser.Physics.Ninja.Circle.COL_NONE;
    ***REMOVED***,

    /**
    * Destroys this Circle's reference to Body and System
    *
    * @method Phaser.Physics.Ninja.Circle#destroy
    */
    destroy: function() ***REMOVED***
        this.body = null;
        this.system = null;
    ***REMOVED***,

    /**
    * Render this circle for debugging purposes.
    *
    * @method Phaser.Physics.Ninja.Circle#render
    * @param ***REMOVED***object***REMOVED*** context - The context to render to.
    * @param ***REMOVED***number***REMOVED*** xOffset - X offset from circle's position to render at.
    * @param ***REMOVED***number***REMOVED*** yOffset - Y offset from circle's position to render at.
    * @param ***REMOVED***string***REMOVED*** color - color of the debug shape to be rendered. (format is css color string).
    * @param ***REMOVED***boolean***REMOVED*** filled - Render the shape as solid (true) or hollow (false).
    */
    render: function(context, xOffset, yOffset, color, filled) ***REMOVED***
        var x = this.pos.x - xOffset;
        var y = this.pos.y - yOffset;

        context.beginPath();
        context.arc(x, y, this.radius, 0, 2 * Math.PI, false);

        if (filled)
        ***REMOVED***
            context.fillStyle = color;
            context.fill();
        ***REMOVED***
        else
        ***REMOVED***
            context.strokeStyle = color;
            context.stroke();
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
