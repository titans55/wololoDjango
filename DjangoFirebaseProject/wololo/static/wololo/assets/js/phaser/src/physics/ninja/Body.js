/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Physics Body is linked to a single Sprite. All physics operations should be performed against the body rather than
* the Sprite itself. For example you can set the velocity, bounce values etc all on the Body.
*
* @class Phaser.Physics.Ninja.Body
* @constructor
* @param ***REMOVED***Phaser.Physics.Ninja***REMOVED*** system - The physics system this Body belongs to.
* @param ***REMOVED***Phaser.Sprite***REMOVED*** sprite - The Sprite object this physics body belongs to.
* @param ***REMOVED***number***REMOVED*** [type=1] - The type of Ninja shape to create. 1 = AABB, 2 = Circle or 3 = Tile.
* @param ***REMOVED***number***REMOVED*** [id=1] - If this body is using a Tile shape, you can set the Tile id here, i.e. Phaser.Physics.Ninja.Tile.SLOPE_45DEGpn, Phaser.Physics.Ninja.Tile.CONVEXpp, etc.
* @param ***REMOVED***number***REMOVED*** [radius=16] - If this body is using a Circle shape this controls the radius.
* @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate of this Body. This is only used if a sprite is not provided.
* @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate of this Body. This is only used if a sprite is not provided.
* @param ***REMOVED***number***REMOVED*** [width=0] - The width of this Body. This is only used if a sprite is not provided.
* @param ***REMOVED***number***REMOVED*** [height=0] - The height of this Body. This is only used if a sprite is not provided.
*/
Phaser.Physics.Ninja.Body = function (system, sprite, type, id, radius, x, y, width, height) ***REMOVED***

    sprite = sprite || null;

    if (type === undefined) ***REMOVED*** type = 1; ***REMOVED***
    if (id === undefined) ***REMOVED*** id = 1; ***REMOVED***
    if (radius === undefined) ***REMOVED*** radius = 16; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Sprite***REMOVED*** sprite - Reference to the parent Sprite.
    */
    this.sprite = sprite;

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = system.game;

    /**
    * @property ***REMOVED***number***REMOVED*** type - The type of physics system this body belongs to.
    */
    this.type = Phaser.Physics.NINJA;

    /**
    * @property ***REMOVED***Phaser.Physics.Ninja***REMOVED*** system - The parent physics system.
    */
    this.system = system;

    /**
    * @property ***REMOVED***Phaser.Physics.Ninja.AABB***REMOVED*** aabb - The AABB object this body is using for collision.
    */
    this.aabb = null;

    /**
    * @property ***REMOVED***Phaser.Physics.Ninja.Tile***REMOVED*** tile - The Tile object this body is using for collision.
    */
    this.tile = null;

    /**
    * @property ***REMOVED***Phaser.Physics.Ninja.Circle***REMOVED*** circle - The Circle object this body is using for collision.
    */
    this.circle = null;

    /**
    * @property ***REMOVED***object***REMOVED*** shape - A local reference to the body shape.
    */
    this.shape = null;

    //  Setting drag to 0 and friction to 0 means you get a normalised speed (px psec)

    /**
    * @property ***REMOVED***number***REMOVED*** drag - The drag applied to this object as it moves.
    * @default
    */
    this.drag = 1;

    /**
    * @property ***REMOVED***number***REMOVED*** friction - The friction applied to this object as it moves.
    * @default
    */
    this.friction = 0.05;

    /**
    * @property ***REMOVED***number***REMOVED*** gravityScale - How much of the world gravity should be applied to this object? 1 = all of it, 0.5 = 50%, etc.
    * @default
    */
    this.gravityScale = 1;

    /**
    * @property ***REMOVED***number***REMOVED*** bounce - The bounciness of this object when it collides. A value between 0 and 1. We recommend setting it to 0.999 to avoid jittering.
    * @default
    */
    this.bounce = 0.3;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** velocity - The velocity in pixels per second sq. of the Body.
    */
    this.velocity = new Phaser.Point();

    /**
    * @property ***REMOVED***number***REMOVED*** facing - A const reference to the direction the Body is traveling or facing.
    * @default
    */
    this.facing = Phaser.NONE;

    /**
    * @property ***REMOVED***boolean***REMOVED*** immovable - An immovable Body will not receive any impacts from other bodies. Not fully implemented.
    * @default
    */
    this.immovable = false;

    /**
    * A Body can be set to collide against the World bounds automatically and rebound back into the World if this is set to true. Otherwise it will leave the World.
    * @property ***REMOVED***boolean***REMOVED*** collideWorldBounds - Should the Body collide with the World bounds?
    */
    this.collideWorldBounds = true;

    /**
    * Set the checkCollision properties to control which directions collision is processed for this Body.
    * For example checkCollision.up = false means it won't collide when the collision happened while moving up.
    * @property ***REMOVED***object***REMOVED*** checkCollision - An object containing allowed collision.
    */
    this.checkCollision = ***REMOVED*** none: false, any: true, up: true, down: true, left: true, right: true ***REMOVED***;

    /**
    * This object is populated with boolean values when the Body collides with another.
    * touching.up = true means the collision happened to the top of this Body for example.
    * @property ***REMOVED***object***REMOVED*** touching - An object containing touching results.
    */
    this.touching = ***REMOVED*** none: true, up: false, down: false, left: false, right: false ***REMOVED***;

    /**
    * This object is populated with previous touching values from the bodies previous collision.
    * @property ***REMOVED***object***REMOVED*** wasTouching - An object containing previous touching results.
    */
    this.wasTouching = ***REMOVED*** none: true, up: false, down: false, left: false, right: false ***REMOVED***;

    /**
    * @property ***REMOVED***number***REMOVED*** maxSpeed - The maximum speed this body can travel at (taking drag and friction into account)
    * @default
    */
    this.maxSpeed = 8;

    if (sprite)
    ***REMOVED***
        x = sprite.x;
        y = sprite.y;
        width = sprite.width;
        height = sprite.height;

        if (sprite.anchor.x === 0)
        ***REMOVED***
            x += (sprite.width * 0.5);
        ***REMOVED***

        if (sprite.anchor.y === 0)
        ***REMOVED***
            y += (sprite.height * 0.5);
        ***REMOVED***
    ***REMOVED***

    if (type === 1)
    ***REMOVED***
        this.aabb = new Phaser.Physics.Ninja.AABB(this, x, y, width, height);
        this.shape = this.aabb;
    ***REMOVED***
    else if (type === 2)
    ***REMOVED***
        this.circle = new Phaser.Physics.Ninja.Circle(this, x, y, radius);
        this.shape = this.circle;
    ***REMOVED***
    else if (type === 3)
    ***REMOVED***
        this.tile = new Phaser.Physics.Ninja.Tile(this, x, y, width, height, id);
        this.shape = this.tile;
    ***REMOVED***

***REMOVED***;

Phaser.Physics.Ninja.Body.prototype = ***REMOVED***

    /**
    * Internal method.
    *
    * @method Phaser.Physics.Ninja.Body#preUpdate
    * @protected
    */
    preUpdate: function () ***REMOVED***

        //  Store and reset collision flags
        this.wasTouching.none = this.touching.none;
        this.wasTouching.up = this.touching.up;
        this.wasTouching.down = this.touching.down;
        this.wasTouching.left = this.touching.left;
        this.wasTouching.right = this.touching.right;

        this.touching.none = true;
        this.touching.up = false;
        this.touching.down = false;
        this.touching.left = false;
        this.touching.right = false;

        this.shape.integrate();

        if (this.collideWorldBounds)
        ***REMOVED***
            this.shape.collideWorldBounds();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal method.
    *
    * @method Phaser.Physics.Ninja.Body#postUpdate
    * @protected
    */
    postUpdate: function () ***REMOVED***

        if (this.sprite)
        ***REMOVED***
            if (this.sprite.type === Phaser.TILESPRITE)
            ***REMOVED***
                //  TileSprites don't use their anchor property, so we need to adjust the coordinates
                this.sprite.x = this.shape.pos.x - this.shape.xw;
                this.sprite.y = this.shape.pos.y - this.shape.yw;
            ***REMOVED***
            else
            ***REMOVED***
                this.sprite.x = this.shape.pos.x;
                this.sprite.y = this.shape.pos.y;
            ***REMOVED***
        ***REMOVED***

        if (this.velocity.x < 0)
        ***REMOVED***
            this.facing = Phaser.LEFT;
        ***REMOVED***
        else if (this.velocity.x > 0)
        ***REMOVED***
            this.facing = Phaser.RIGHT;
        ***REMOVED***

        if (this.velocity.y < 0)
        ***REMOVED***
            this.facing = Phaser.UP;
        ***REMOVED***
        else if (this.velocity.y > 0)
        ***REMOVED***
            this.facing = Phaser.DOWN;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Stops all movement of this body.
    *
    * @method Phaser.Physics.Ninja.Body#setZeroVelocity
    */
    setZeroVelocity: function () ***REMOVED***

        this.shape.oldpos.x = this.shape.pos.x;
        this.shape.oldpos.y = this.shape.pos.y;

    ***REMOVED***,

    /**
    * Moves the Body forwards based on its current angle and the given speed.
    * The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second (1000ms).
    *
    * @method Phaser.Physics.Body#moveTo
    * @param ***REMOVED***number***REMOVED*** speed - The speed at which it should move forwards.
    * @param ***REMOVED***number***REMOVED*** angle - The angle in which it should move, given in degrees.
    */
    moveTo: function (speed, angle) ***REMOVED***

        var magnitude = speed * this.game.time.physicsElapsed;
        var angle = this.game.math.degToRad(angle);

        this.shape.pos.x = this.shape.oldpos.x + (magnitude * Math.cos(angle));
        this.shape.pos.y = this.shape.oldpos.y + (magnitude * Math.sin(angle));

    ***REMOVED***,

    /**
    * Moves the Body backwards based on its current angle and the given speed.
    * The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second (1000ms).
    *
    * @method Phaser.Physics.Body#moveBackward
    * @param ***REMOVED***number***REMOVED*** speed - The speed at which it should move backwards.
    * @param ***REMOVED***number***REMOVED*** angle - The angle in which it should move, given in degrees.
    */
    moveFrom: function (speed, angle) ***REMOVED***

        var magnitude = -speed * this.game.time.physicsElapsed;
        var angle = this.game.math.degToRad(angle);

        this.shape.pos.x = this.shape.oldpos.x + (magnitude * Math.cos(angle));
        this.shape.pos.y = this.shape.oldpos.y + (magnitude * Math.sin(angle));

    ***REMOVED***,

    /**
    * If this Body is dynamic then this will move it to the left by setting its x velocity to the given speed.
    * The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second (1000ms).
    *
    * @method Phaser.Physics.Body#moveLeft
    * @param ***REMOVED***number***REMOVED*** speed - The speed at which it should move to the left, in pixels per second.
    */
    moveLeft: function (speed) ***REMOVED***

        var fx = -speed * this.game.time.physicsElapsed;

        this.shape.pos.x = this.shape.oldpos.x + Math.min(this.maxSpeed, Math.max(-this.maxSpeed, this.shape.pos.x - this.shape.oldpos.x + fx));

    ***REMOVED***,

    /**
    * If this Body is dynamic then this will move it to the right by setting its x velocity to the given speed.
    * The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second (1000ms).
    *
    * @method Phaser.Physics.Body#moveRight
    * @param ***REMOVED***number***REMOVED*** speed - The speed at which it should move to the right, in pixels per second.
    */
    moveRight: function (speed) ***REMOVED***

        var fx = speed * this.game.time.physicsElapsed;

        this.shape.pos.x = this.shape.oldpos.x + Math.min(this.maxSpeed, Math.max(-this.maxSpeed, this.shape.pos.x - this.shape.oldpos.x + fx));

    ***REMOVED***,

    /**
    * If this Body is dynamic then this will move it up by setting its y velocity to the given speed.
    * The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second (1000ms).
    *
    * @method Phaser.Physics.Body#moveUp
    * @param ***REMOVED***number***REMOVED*** speed - The speed at which it should move up, in pixels per second.
    */
    moveUp: function (speed) ***REMOVED***

        var fx = -speed * this.game.time.physicsElapsed;

        this.shape.pos.y = this.shape.oldpos.y + Math.min(this.maxSpeed, Math.max(-this.maxSpeed, this.shape.pos.y - this.shape.oldpos.y + fx));

    ***REMOVED***,

    /**
    * If this Body is dynamic then this will move it down by setting its y velocity to the given speed.
    * The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second (1000ms).
    *
    * @method Phaser.Physics.Body#moveDown
    * @param ***REMOVED***number***REMOVED*** speed - The speed at which it should move down, in pixels per second.
    */
    moveDown: function (speed) ***REMOVED***

        var fx = speed * this.game.time.physicsElapsed;

        this.shape.pos.y = this.shape.oldpos.y + Math.min(this.maxSpeed, Math.max(-this.maxSpeed, this.shape.pos.y - this.shape.oldpos.y + fx));

    ***REMOVED***,

    /**
    * Resets all Body values and repositions on the Sprite.
    *
    * @method Phaser.Physics.Ninja.Body#reset
    */
    reset: function () ***REMOVED***

        this.velocity.set(0);

        this.shape.pos.x = this.sprite.x;
        this.shape.pos.y = this.sprite.y;

        this.shape.oldpos.copyFrom(this.shape.pos);

    ***REMOVED***,

    /**
    * Returns the absolute delta x value.
    *
    * @method Phaser.Physics.Ninja.Body#deltaAbsX
    * @return ***REMOVED***number***REMOVED*** The absolute delta value.
    */
    deltaAbsX: function () ***REMOVED***
        return (this.deltaX() > 0 ? this.deltaX() : -this.deltaX());
    ***REMOVED***,

    /**
    * Returns the absolute delta y value.
    *
    * @method Phaser.Physics.Ninja.Body#deltaAbsY
    * @return ***REMOVED***number***REMOVED*** The absolute delta value.
    */
    deltaAbsY: function () ***REMOVED***
        return (this.deltaY() > 0 ? this.deltaY() : -this.deltaY());
    ***REMOVED***,

    /**
    * Returns the delta x value. The difference between Body.x now and in the previous step.
    *
    * @method Phaser.Physics.Ninja.Body#deltaX
    * @return ***REMOVED***number***REMOVED*** The delta value. Positive if the motion was to the right, negative if to the left.
    */
    deltaX: function () ***REMOVED***
        return this.shape.pos.x - this.shape.oldpos.x;
    ***REMOVED***,

    /**
    * Returns the delta y value. The difference between Body.y now and in the previous step.
    *
    * @method Phaser.Physics.Ninja.Body#deltaY
    * @return ***REMOVED***number***REMOVED*** The delta value. Positive if the motion was downwards, negative if upwards.
    */
    deltaY: function () ***REMOVED***
        return this.shape.pos.y - this.shape.oldpos.y;
    ***REMOVED***,

    /**
    * Destroys this body's reference to the sprite and system, and destroys its shape.
    *
    * @method Phaser.Physics.Ninja.Body#destroy
    */
    destroy: function() ***REMOVED***
        this.sprite = null;
        this.system = null;
        this.aabb = null;
        this.tile = null;
        this.circle = null;

        this.shape.destroy();
        this.shape = null;
    ***REMOVED***
***REMOVED***;

/**
* @name Phaser.Physics.Ninja.Body#x
* @property ***REMOVED***number***REMOVED*** x - The x position.
*/
Object.defineProperty(Phaser.Physics.Ninja.Body.prototype, "x", ***REMOVED***

    get: function () ***REMOVED***
        return this.shape.pos.x;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this.shape.pos.x = value;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.Ninja.Body#y
* @property ***REMOVED***number***REMOVED*** y - The y position.
*/
Object.defineProperty(Phaser.Physics.Ninja.Body.prototype, "y", ***REMOVED***

    get: function () ***REMOVED***
        return this.shape.pos.y;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this.shape.pos.y = value;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.Ninja.Body#width
* @property ***REMOVED***number***REMOVED*** width - The width of this Body
* @readonly
*/
Object.defineProperty(Phaser.Physics.Ninja.Body.prototype, "width", ***REMOVED***

    get: function () ***REMOVED***
        return this.shape.width;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.Ninja.Body#height
* @property ***REMOVED***number***REMOVED*** height - The height of this Body
* @readonly
*/
Object.defineProperty(Phaser.Physics.Ninja.Body.prototype, "height", ***REMOVED***

    get: function () ***REMOVED***
        return this.shape.height;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.Ninja.Body#bottom
* @property ***REMOVED***number***REMOVED*** bottom - The bottom value of this Body (same as Body.y + Body.height)
* @readonly
*/
Object.defineProperty(Phaser.Physics.Ninja.Body.prototype, "bottom", ***REMOVED***

    get: function () ***REMOVED***
        return this.shape.pos.y + this.shape.yw;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.Ninja.Body#right
* @property ***REMOVED***number***REMOVED*** right - The right value of this Body (same as Body.x + Body.width)
* @readonly
*/
Object.defineProperty(Phaser.Physics.Ninja.Body.prototype, "right", ***REMOVED***

    get: function () ***REMOVED***
        return this.shape.pos.x + this.shape.xw;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.Ninja.Body#speed
* @property ***REMOVED***number***REMOVED*** speed - The speed of this Body
* @readonly
*/
Object.defineProperty(Phaser.Physics.Ninja.Body.prototype, "speed", ***REMOVED***

    get: function () ***REMOVED***
        return Math.sqrt(this.shape.velocity.x * this.shape.velocity.x + this.shape.velocity.y * this.shape.velocity.y);
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.Ninja.Body#angle
* @property ***REMOVED***number***REMOVED*** angle - The angle of this Body
* @readonly
*/
Object.defineProperty(Phaser.Physics.Ninja.Body.prototype, "angle", ***REMOVED***

    get: function () ***REMOVED***
        return Math.atan2(this.shape.velocity.y, this.shape.velocity.x);
    ***REMOVED***

***REMOVED***);

/**
* Render Sprite's Body.
*
* @method Phaser.Physics.Ninja.Body#render
* @param ***REMOVED***object***REMOVED*** context - The context to render to.
* @param ***REMOVED***Phaser.Physics.Ninja.Body***REMOVED*** body - The Body to render.
* @param ***REMOVED***string***REMOVED*** [color='rgba(0,255,0,0.4)'] - color of the debug shape to be rendered. (format is css color string).
* @param ***REMOVED***boolean***REMOVED*** [filled=true] - Render the shape as a filled (default, true) or a stroked (false)
*/
Phaser.Physics.Ninja.Body.render = function(context, body, color, filled) ***REMOVED***
    color = color || 'rgba(0,255,0,0.4)';

    if (filled === undefined)
    ***REMOVED***
        filled = true;
    ***REMOVED***

    if (body.aabb || body.circle)
    ***REMOVED***
        body.shape.render(context, body.game.camera.x, body.game.camera.y, color, filled);
    ***REMOVED***
***REMOVED***;
