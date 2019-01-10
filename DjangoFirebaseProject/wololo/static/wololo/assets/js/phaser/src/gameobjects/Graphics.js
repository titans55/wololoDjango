/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A Graphics object is a way to draw primitives to your game. Primitives include forms of geometry, such as Rectangles,
* Circles and Polygons. They also include lines, arcs and curves. When you initially create a Graphics object it will
* be empty. To 'draw' to it you first specify a lineStyle or fillStyle (or both), and then draw a shape. For example:
*
* ```
* graphics.beginFill(0xff0000);
* graphics.drawCircle(50, 50, 100);
* graphics.endFill();
* ```
* 
* This will draw a circle shape to the Graphics object, with a diameter of 100, located at x: 50, y: 50.
*
* When a Graphics object is rendered it will render differently based on if the game is running under Canvas or
* WebGL. Under Canvas it will use the HTML Canvas context drawing operations to draw the path. Under WebGL the
* graphics data is decomposed into polygons. Both of these are expensive processes, especially with complex shapes.
* 
* If your Graphics object doesn't change much (or at all) once you've drawn your shape to it, then you will help
* performance by calling `Graphics.generateTexture`. This will 'bake' the Graphics object into a Texture, and return it.
* You can then use this Texture for Sprites or other display objects. If your Graphics object updates frequently then
* you should avoid doing this, as it will constantly generate new textures, which will consume memory.
*
* As you can tell, Graphics objects are a bit of a trade-off. While they are extremely useful, you need to be careful
* in their complexity and quantity of them in your game.
*
* @class Phaser.Graphics
* @constructor
* @extends PIXI.Graphics
* @extends Phaser.Component.Core
* @extends Phaser.Component.Angle
* @extends Phaser.Component.AutoCull
* @extends Phaser.Component.Bounds
* @extends Phaser.Component.Destroy
* @extends Phaser.Component.FixedToCamera
* @extends Phaser.Component.InputEnabled
* @extends Phaser.Component.InWorld
* @extends Phaser.Component.LifeSpan
* @extends Phaser.Component.PhysicsBody
* @extends Phaser.Component.Reset
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Current game instance.
* @param ***REMOVED***number***REMOVED*** [x=0] - X position of the new graphics object.
* @param ***REMOVED***number***REMOVED*** [y=0] - Y position of the new graphics object.
*/
Phaser.Graphics = function (game, x, y) ***REMOVED***

    if (x === undefined) ***REMOVED*** x = 0; ***REMOVED***
    if (y === undefined) ***REMOVED*** y = 0; ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @default
    */
    this.type = Phaser.GRAPHICS;

    /**
    * @property ***REMOVED***number***REMOVED*** physicsType - The const physics body type of this object.
    * @readonly
    */
    this.physicsType = Phaser.SPRITE;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** anchor - Required for a Graphics shape to work as a Physics body, do not modify this value.
    * @private
    */
    this.anchor = new Phaser.Point();

    PIXI.Graphics.call(this);

    Phaser.Component.Core.init.call(this, game, x, y, '', null);

***REMOVED***;

Phaser.Graphics.prototype = Object.create(PIXI.Graphics.prototype);
Phaser.Graphics.prototype.constructor = Phaser.Graphics;

Phaser.Component.Core.install.call(Phaser.Graphics.prototype, [
    'Angle',
    'AutoCull',
    'Bounds',
    'Destroy',
    'FixedToCamera',
    'InputEnabled',
    'InWorld',
    'LifeSpan',
    'PhysicsBody',
    'Reset'
]);

Phaser.Graphics.prototype.preUpdatePhysics = Phaser.Component.PhysicsBody.preUpdate;
Phaser.Graphics.prototype.preUpdateLifeSpan = Phaser.Component.LifeSpan.preUpdate;
Phaser.Graphics.prototype.preUpdateInWorld = Phaser.Component.InWorld.preUpdate;
Phaser.Graphics.prototype.preUpdateCore = Phaser.Component.Core.preUpdate;

/**
* Automatically called by World.preUpdate.
* 
* @method
* @memberof Phaser.Graphics
*/
Phaser.Graphics.prototype.preUpdate = function () ***REMOVED***

    if (!this.preUpdatePhysics() || !this.preUpdateLifeSpan() || !this.preUpdateInWorld())
    ***REMOVED***
        return false;
    ***REMOVED***

    return this.preUpdateCore();

***REMOVED***;

/**
* Automatically called by World
* @method Phaser.Graphics.prototype.postUpdate
*/
Phaser.Graphics.prototype.postUpdate = function () ***REMOVED***

    Phaser.Component.PhysicsBody.postUpdate.call(this);
    Phaser.Component.FixedToCamera.postUpdate.call(this);

    if (this._boundsDirty)
    ***REMOVED***
        this.updateLocalBounds();
        this._boundsDirty = false;
    ***REMOVED***

    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        this.children[i].postUpdate();
    ***REMOVED***

***REMOVED***;

/**
* Destroy this Graphics instance.
*
* @method Phaser.Graphics.prototype.destroy
* @param ***REMOVED***boolean***REMOVED*** [destroyChildren=true] - Should every child of this object have its destroy method called?
*/
Phaser.Graphics.prototype.destroy = function(destroyChildren) ***REMOVED***

    this.clear();

    Phaser.Component.Destroy.prototype.destroy.call(this, destroyChildren);

***REMOVED***;

/*
* Draws a single ***REMOVED***Phaser.Polygon***REMOVED*** triangle from a ***REMOVED***Phaser.Point***REMOVED*** array
*
* @method Phaser.Graphics.prototype.drawTriangle
* @param ***REMOVED***Array<Phaser.Point>***REMOVED*** points - An array of Phaser.Points that make up the three vertices of this triangle
* @param ***REMOVED***boolean***REMOVED*** [cull=false] - Should we check if the triangle is back-facing
*/
Phaser.Graphics.prototype.drawTriangle = function(points, cull) ***REMOVED***

    if (cull === undefined) ***REMOVED*** cull = false; ***REMOVED***

    var triangle = new Phaser.Polygon(points);

    if (cull)
    ***REMOVED***
        var cameraToFace = new Phaser.Point(this.game.camera.x - points[0].x, this.game.camera.y - points[0].y);
        var ab = new Phaser.Point(points[1].x - points[0].x, points[1].y - points[0].y);
        var cb = new Phaser.Point(points[1].x - points[2].x, points[1].y - points[2].y);
        var faceNormal = cb.cross(ab);

        if (cameraToFace.dot(faceNormal) > 0)
        ***REMOVED***
            this.drawPolygon(triangle);
        ***REMOVED***
    ***REMOVED***
    else
    ***REMOVED***
        this.drawPolygon(triangle);
    ***REMOVED***

***REMOVED***;

/*
* Draws ***REMOVED***Phaser.Polygon***REMOVED*** triangles 
*
* @method Phaser.Graphics.prototype.drawTriangles
* @param ***REMOVED***Array<Phaser.Point>|Array<number>***REMOVED*** vertices - An array of Phaser.Points or numbers that make up the vertices of the triangles
* @param ***REMOVED***Array<number>***REMOVED*** ***REMOVED***indices=null***REMOVED*** - An array of numbers that describe what order to draw the vertices in
* @param ***REMOVED***boolean***REMOVED*** [cull=false] - Should we check if the triangle is back-facing
*/
Phaser.Graphics.prototype.drawTriangles = function(vertices, indices, cull) ***REMOVED***

    if (cull === undefined) ***REMOVED*** cull = false; ***REMOVED***

    var point1 = new Phaser.Point();
    var point2 = new Phaser.Point();
    var point3 = new Phaser.Point();
    var points = [];
    var i;

    if (!indices)
    ***REMOVED***
        if (vertices[0] instanceof Phaser.Point)
        ***REMOVED***
            for (i = 0; i < vertices.length / 3; i++)
            ***REMOVED***
                this.drawTriangle([vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2]], cull);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            for (i = 0; i < vertices.length / 6; i++)
            ***REMOVED***
                point1.x = vertices[i * 6 + 0];
                point1.y = vertices[i * 6 + 1];
                point2.x = vertices[i * 6 + 2];
                point2.y = vertices[i * 6 + 3];
                point3.x = vertices[i * 6 + 4];
                point3.y = vertices[i * 6 + 5];
                this.drawTriangle([point1, point2, point3], cull);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
    else
    ***REMOVED***
        if (vertices[0] instanceof Phaser.Point)
        ***REMOVED***
            for (i = 0; i < indices.length /3; i++)
            ***REMOVED***
                points.push(vertices[indices[i * 3 ]]);
                points.push(vertices[indices[i * 3 + 1]]);
                points.push(vertices[indices[i * 3 + 2]]);

                if (points.length === 3)
                ***REMOVED***
                    this.drawTriangle(points, cull);
                    points = [];
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            for (i = 0; i < indices.length; i++)
            ***REMOVED***
                point1.x = vertices[indices[i] * 2];
                point1.y = vertices[indices[i] * 2 + 1];
                points.push(point1.copyTo(***REMOVED******REMOVED***));

                if (points.length === 3)
                ***REMOVED***
                    this.drawTriangle(points, cull);
                    points = [];
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
