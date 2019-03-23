/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd, Richard Davey
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A Rope is a Sprite that has a repeating texture.
* 
* The texture will automatically wrap on the edges as it moves.
* 
* Please note that Ropes cannot have an input handler.
*
* @class Phaser.Rope
* @constructor
* @extends PIXI.Rope
* @extends Phaser.Component.Core
* @extends Phaser.Component.Angle
* @extends Phaser.Component.Animation
* @extends Phaser.Component.AutoCull
* @extends Phaser.Component.Bounds
* @extends Phaser.Component.BringToTop
* @extends Phaser.Component.Crop
* @extends Phaser.Component.Delta
* @extends Phaser.Component.Destroy
* @extends Phaser.Component.FixedToCamera
* @extends Phaser.Component.InWorld
* @extends Phaser.Component.LifeSpan
* @extends Phaser.Component.LoadTexture
* @extends Phaser.Component.Overlap
* @extends Phaser.Component.PhysicsBody
* @extends Phaser.Component.Reset
* @extends Phaser.Component.ScaleMinMax
* @extends Phaser.Component.Smoothed
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***number***REMOVED*** x - The x coordinate (in world space) to position the Rope at.
* @param ***REMOVED***number***REMOVED*** y - The y coordinate (in world space) to position the Rope at.
* @param ***REMOVED***string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture***REMOVED*** key - This is the image or texture used by the Rope during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
* @param ***REMOVED***string|number***REMOVED*** frame - If this Rope is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
* @param ***REMOVED***Array***REMOVED*** points - An array of ***REMOVED***Phaser.Point***REMOVED***.
*/
Phaser.Rope = function (game, x, y, key, frame, points) ***REMOVED***

    this.points = [];
    this.points = points;
    this._hasUpdateAnimation = false;
    this._updateAnimationCallback = null;
    x = x || 0;
    y = y || 0;
    key = key || null;
    frame = frame || null;

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.ROPE;

    PIXI.Rope.call(this, Phaser.Cache.DEFAULT, this.points);

    Phaser.Component.Core.init.call(this, game, x, y, key, frame);

***REMOVED***;

Phaser.Rope.prototype = Object.create(PIXI.Rope.prototype);
Phaser.Rope.prototype.constructor = Phaser.Rope;

Phaser.Component.Core.install.call(Phaser.Rope.prototype, [
    'Angle',
    'Animation',
    'AutoCull',
    'Bounds',
    'BringToTop',
    'Crop',
    'Delta',
    'Destroy',
    'FixedToCamera',
    'InWorld',
    'LifeSpan',
    'LoadTexture',
    'Overlap',
    'PhysicsBody',
    'Reset',
    'ScaleMinMax',
    'Smoothed'
]);

Phaser.Rope.prototype.preUpdatePhysics = Phaser.Component.PhysicsBody.preUpdate;
Phaser.Rope.prototype.preUpdateLifeSpan = Phaser.Component.LifeSpan.preUpdate;
Phaser.Rope.prototype.preUpdateInWorld = Phaser.Component.InWorld.preUpdate;
Phaser.Rope.prototype.preUpdateCore = Phaser.Component.Core.preUpdate;

/**
* Automatically called by World.preUpdate.
*
* @method Phaser.Rope#preUpdate
* @memberof Phaser.Rope
*/
Phaser.Rope.prototype.preUpdate = function() ***REMOVED***

    if (!this.preUpdatePhysics() || !this.preUpdateLifeSpan() || !this.preUpdateInWorld())
    ***REMOVED***
        return false;
    ***REMOVED***

    return this.preUpdateCore();

***REMOVED***;

/**
* Override and use this function in your own custom objects to handle any update requirements you may have.
*
* @method Phaser.Rope#update
* @memberof Phaser.Rope
*/
Phaser.Rope.prototype.update = function() ***REMOVED***

    if (this._hasUpdateAnimation)
    ***REMOVED***
        this.updateAnimation.call(this);
    ***REMOVED***

***REMOVED***;

/**
* Resets the Rope. This places the Rope at the given x/y world coordinates and then
* sets alive, exists, visible and renderable all to true. Also resets the outOfBounds state.
* If the Rope has a physics body that too is reset.
*
* @method Phaser.Rope#reset
* @memberof Phaser.Rope
* @param ***REMOVED***number***REMOVED*** x - The x coordinate (in world space) to position the Sprite at.
* @param ***REMOVED***number***REMOVED*** y - The y coordinate (in world space) to position the Sprite at.
* @return ***REMOVED***Phaser.Rope***REMOVED*** This instance.
*/
Phaser.Rope.prototype.reset = function(x, y) ***REMOVED***

    Phaser.Component.Reset.prototype.reset.call(this, x, y);

    return this;

***REMOVED***;

/**
* A Rope will call its updateAnimation function on each update loop if it has one.
*
* @name Phaser.Rope#updateAnimation
* @property ***REMOVED***function***REMOVED*** updateAnimation - Set to a function if you'd like the rope to animate during the update phase. Set to false or null to remove it.
*/
Object.defineProperty(Phaser.Rope.prototype, "updateAnimation", ***REMOVED***

    get: function () ***REMOVED***

        return this._updateAnimation;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value && typeof value === 'function')
        ***REMOVED***
            this._hasUpdateAnimation = true;
            this._updateAnimation = value;
        ***REMOVED***
        else
        ***REMOVED***
            this._hasUpdateAnimation = false;
            this._updateAnimation = null;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* The segments that make up the rope body as an array of Phaser.Rectangles
*
* @name Phaser.Rope#segments
* @property ***REMOVED***Phaser.Rectangles[]***REMOVED*** updateAnimation - Returns an array of Phaser.Rectangles that represent the segments of the given rope
*/
Object.defineProperty(Phaser.Rope.prototype, "segments", ***REMOVED***

    get: function() ***REMOVED***

        var segments = [];
        var index, x1, y1, x2, y2, width, height, rect;

        for (var i = 0; i < this.points.length; i++)
        ***REMOVED***
            index = i * 4;

            x1 = this.vertices[index] * this.scale.x;
            y1 = this.vertices[index + 1] * this.scale.y;
            x2 = this.vertices[index + 4] * this.scale.x;
            y2 = this.vertices[index + 3] * this.scale.y;

            width = Phaser.Math.difference(x1, x2);
            height = Phaser.Math.difference(y1, y2);

            x1 += this.world.x;
            y1 += this.world.y;
            rect = new Phaser.Rectangle(x1, y1, width, height);
            segments.push(rect);
        ***REMOVED***

        return segments;
    ***REMOVED***

***REMOVED***);
