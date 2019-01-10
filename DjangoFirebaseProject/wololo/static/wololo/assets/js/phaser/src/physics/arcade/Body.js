/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Physics Body is linked to a single Sprite. All physics operations should be performed against the body rather than
* the Sprite itself. For example you can set the velocity, acceleration, bounce values etc all on the Body.
*
* @class Phaser.Physics.Arcade.Body
* @constructor
* @param ***REMOVED***Phaser.Sprite***REMOVED*** sprite - The Sprite object this physics body belongs to.
*/
Phaser.Physics.Arcade.Body = function (sprite) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Sprite***REMOVED*** sprite - Reference to the parent Sprite.
    */
    this.sprite = sprite;

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = sprite.game;

    /**
    * @property ***REMOVED***number***REMOVED*** type - The type of physics system this body belongs to.
    */
    this.type = Phaser.Physics.ARCADE;

    /**
    * @property ***REMOVED***boolean***REMOVED*** enable - A disabled body won't be checked for any form of collision or overlap or have its pre/post updates run.
    * @default
    */
    this.enable = true;

    /**
    * If `true` this Body is using circular collision detection. If `false` it is using rectangular.
    * Use `Body.setCircle` to control the collision shape this Body uses.
    * @property ***REMOVED***boolean***REMOVED*** isCircle
    * @default
    * @readOnly
    */
    this.isCircle = false;

    /**
    * The radius of the circular collision shape this Body is using if Body.setCircle has been enabled.
    * If you wish to change the radius then call `setCircle` again with the new value.
    * If you wish to stop the Body using a circle then call `setCircle` with a radius of zero (or undefined).
    * @property ***REMOVED***number***REMOVED*** radius
    * @default
    * @readOnly
    */
    this.radius = 0;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** offset - The offset of the Physics Body from the Sprite x/y position.
    */
    this.offset = new Phaser.Point();

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** position - The position of the physics body.
    * @readonly
    */
    this.position = new Phaser.Point(sprite.x, sprite.y);

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** prev - The previous position of the physics body.
    * @readonly
    */
    this.prev = new Phaser.Point(this.position.x, this.position.y);

    /**
    * @property ***REMOVED***boolean***REMOVED*** allowRotation - Allow this Body to be rotated? (via angularVelocity, etc)
    * @default
    */
    this.allowRotation = true;

    /**
    * The Body's rotation in degrees, as calculated by its angularVelocity and angularAcceleration. Please understand that the collision Body
    * itself never rotates, it is always axis-aligned. However these values are passed up to the parent Sprite and updates its rotation.
    * @property ***REMOVED***number***REMOVED*** rotation
    */
    this.rotation = sprite.angle;

    /**
    * @property ***REMOVED***number***REMOVED*** preRotation - The previous rotation of the physics body.
    * @readonly
    */
    this.preRotation = sprite.angle;

    /**
    * @property ***REMOVED***number***REMOVED*** width - The calculated width of the physics body.
    * @readonly
    */
    this.width = sprite.width;

    /**
    * @property ***REMOVED***number***REMOVED*** height - The calculated height of the physics body.
    * @readonly
    */
    this.height = sprite.height;

    /**
    * @property ***REMOVED***number***REMOVED*** sourceWidth - The un-scaled original size.
    * @readonly
    */
    this.sourceWidth = sprite.width;

    /**
    * @property ***REMOVED***number***REMOVED*** sourceHeight - The un-scaled original size.
    * @readonly
    */
    this.sourceHeight = sprite.height;

    if (sprite.texture)
    ***REMOVED***
        this.sourceWidth = sprite.texture.frame.width;
        this.sourceHeight = sprite.texture.frame.height;
    ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** halfWidth - The calculated width / 2 of the physics body.
    * @readonly
    */
    this.halfWidth = Math.abs(sprite.width / 2);

    /**
    * @property ***REMOVED***number***REMOVED*** halfHeight - The calculated height / 2 of the physics body.
    * @readonly
    */
    this.halfHeight = Math.abs(sprite.height / 2);

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** center - The center coordinate of the Physics Body.
    * @readonly
    */
    this.center = new Phaser.Point(sprite.x + this.halfWidth, sprite.y + this.halfHeight);

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** velocity - The velocity, or rate of change in speed of the Body. Measured in pixels per second.
    */
    this.velocity = new Phaser.Point();

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** newVelocity - The new velocity. Calculated during the Body.preUpdate and applied to its position.
    * @readonly
    */
    this.newVelocity = new Phaser.Point();

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** deltaMax - The Sprite position is updated based on the delta x/y values. You can set a cap on those (both +-) using deltaMax.
    */
    this.deltaMax = new Phaser.Point();

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** acceleration - The acceleration is the rate of change of the velocity. Measured in pixels per second squared.
    */
    this.acceleration = new Phaser.Point();

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** drag - The drag applied to the motion of the Body.
    */
    this.drag = new Phaser.Point();

    /**
    * @property ***REMOVED***boolean***REMOVED*** allowGravity - Allow this Body to be influenced by gravity? Either world or local.
    * @default
    */
    this.allowGravity = true;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** gravity - A local gravity applied to this Body. If non-zero this over rides any world gravity, unless Body.allowGravity is set to false.
    */
    this.gravity = new Phaser.Point();

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** bounce - The elasticity of the Body when colliding. bounce.x/y = 1 means full rebound, bounce.x/y = 0.5 means 50% rebound velocity.
    */
    this.bounce = new Phaser.Point();

    /**
    * The elasticity of the Body when colliding with the World bounds.
    * By default this property is `null`, in which case `Body.bounce` is used instead. Set this property
    * to a Phaser.Point object in order to enable a World bounds specific bounce value.
    * @property ***REMOVED***Phaser.Point***REMOVED*** worldBounce
    */
    this.worldBounce = null;

    /**
    * A Signal that is dispatched when this Body collides with the world bounds.
    * Due to the potentially high volume of signals this could create it is disabled by default.
    * To use this feature set this property to a Phaser.Signal: `sprite.body.onWorldBounds = new Phaser.Signal()`
    * and it will be called when a collision happens, passing five arguments:
    * `onWorldBounds(sprite, up, down, left, right)`
    * where the Sprite is a reference to the Sprite that owns this Body, and the other arguments are booleans
    * indicating on which side of the world the Body collided.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onWorldBounds
    */
    this.onWorldBounds = null;

    /**
    * A Signal that is dispatched when this Body collides with another Body.
    * 
    * You still need to call `game.physics.arcade.collide` in your `update` method in order
    * for this signal to be dispatched.
    *
    * Usually you'd pass a callback to the `collide` method, but this signal provides for
    * a different level of notification.
    * 
    * Due to the potentially high volume of signals this could create it is disabled by default.
    * 
    * To use this feature set this property to a Phaser.Signal: `sprite.body.onCollide = new Phaser.Signal()`
    * and it will be called when a collision happens, passing two arguments: the sprites which collided.
    * The first sprite in the argument is always the owner of this Body.
    * 
    * If two Bodies with this Signal set collide, both will dispatch the Signal.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onCollide
    */
    this.onCollide = null;

    /**
    * A Signal that is dispatched when this Body overlaps with another Body.
    * 
    * You still need to call `game.physics.arcade.overlap` in your `update` method in order
    * for this signal to be dispatched.
    *
    * Usually you'd pass a callback to the `overlap` method, but this signal provides for
    * a different level of notification.
    * 
    * Due to the potentially high volume of signals this could create it is disabled by default.
    * 
    * To use this feature set this property to a Phaser.Signal: `sprite.body.onOverlap = new Phaser.Signal()`
    * and it will be called when a collision happens, passing two arguments: the sprites which collided.
    * The first sprite in the argument is always the owner of this Body.
    * 
    * If two Bodies with this Signal set collide, both will dispatch the Signal.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onOverlap
    */
    this.onOverlap = null;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** maxVelocity - The maximum velocity in pixels per second sq. that the Body can reach.
    * @default
    */
    this.maxVelocity = new Phaser.Point(10000, 10000);

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** friction - The amount of movement that will occur if another object 'rides' this one.
    */
    this.friction = new Phaser.Point(1, 0);

    /**
    * @property ***REMOVED***number***REMOVED*** angularVelocity - The angular velocity controls the rotation speed of the Body. It is measured in degrees per second.
    * @default
    */
    this.angularVelocity = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** angularAcceleration - The angular acceleration is the rate of change of the angular velocity. Measured in degrees per second squared.
    * @default
    */
    this.angularAcceleration = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** angularDrag - The drag applied during the rotation of the Body. Measured in degrees per second squared.
    * @default
    */
    this.angularDrag = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** maxAngular - The maximum angular velocity in degrees per second that the Body can reach.
    * @default
    */
    this.maxAngular = 1000;

    /**
    * @property ***REMOVED***number***REMOVED*** mass - The mass of the Body. When two bodies collide their mass is used in the calculation to determine the exchange of velocity.
    * @default
    */
    this.mass = 1;

    /**
    * @property ***REMOVED***number***REMOVED*** angle - The angle of the Body's velocity in radians.
    * @readonly
    */
    this.angle = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** speed - The speed of the Body as calculated by its velocity.
    * @readonly
    */
    this.speed = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** facing - A const reference to the direction the Body is traveling or facing.
    * @default
    */
    this.facing = Phaser.NONE;

    /**
    * @property ***REMOVED***boolean***REMOVED*** immovable - An immovable Body will not receive any impacts from other bodies.
    * @default
    */
    this.immovable = false;

    /**
    * If you have a Body that is being moved around the world via a tween or a Group motion, but its local x/y position never
    * actually changes, then you should set Body.moves = false. Otherwise it will most likely fly off the screen.
    * If you want the physics system to move the body around, then set moves to true.
    * @property ***REMOVED***boolean***REMOVED*** moves - Set to true to allow the Physics system to move this Body, otherwise false to move it manually.
    * @default
    */
    this.moves = true;

    /**
    * This flag allows you to disable the custom x separation that takes place by Physics.Arcade.separate.
    * Used in combination with your own collision processHandler you can create whatever type of collision response you need.
    * @property ***REMOVED***boolean***REMOVED*** customSeparateX - Use a custom separation system or the built-in one?
    * @default
    */
    this.customSeparateX = false;

    /**
    * This flag allows you to disable the custom y separation that takes place by Physics.Arcade.separate.
    * Used in combination with your own collision processHandler you can create whatever type of collision response you need.
    * @property ***REMOVED***boolean***REMOVED*** customSeparateY - Use a custom separation system or the built-in one?
    * @default
    */
    this.customSeparateY = false;

    /**
    * When this body collides with another, the amount of overlap is stored here.
    * @property ***REMOVED***number***REMOVED*** overlapX - The amount of horizontal overlap during the collision.
    */
    this.overlapX = 0;

    /**
    * When this body collides with another, the amount of overlap is stored here.
    * @property ***REMOVED***number***REMOVED*** overlapY - The amount of vertical overlap during the collision.
    */
    this.overlapY = 0;

    /**
    * If `Body.isCircle` is true, and this body collides with another circular body, the amount of overlap is stored here.
    * @property ***REMOVED***number***REMOVED*** overlapR - The amount of overlap during the collision.
    */
    this.overlapR = 0;

    /**
    * If a body is overlapping with another body, but neither of them are moving (maybe they spawned on-top of each other?) this is set to true.
    * @property ***REMOVED***boolean***REMOVED*** embedded - Body embed value.
    */
    this.embedded = false;

    /**
    * A Body can be set to collide against the World bounds automatically and rebound back into the World if this is set to true. Otherwise it will leave the World.
    * @property ***REMOVED***boolean***REMOVED*** collideWorldBounds - Should the Body collide with the World bounds?
    */
    this.collideWorldBounds = false;

    /**
    * Set the checkCollision properties to control which directions collision is processed for this Body.
    * For example checkCollision.up = false means it won't collide when the collision happened while moving up.
    * If you need to disable a Body entirely, use `body.enable = false`, this will also disable motion.
    * If you need to disable just collision and/or overlap checks, but retain motion, set `checkCollision.none = true`.
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
    * This object is populated with boolean values when the Body collides with the World bounds or a Tile.
    * For example if blocked.up is true then the Body cannot move up.
    * @property ***REMOVED***object***REMOVED*** blocked - An object containing on which faces this Body is blocked from moving, if any.
    */
    this.blocked = ***REMOVED*** up: false, down: false, left: false, right: false ***REMOVED***;

    /**
    * If this is an especially small or fast moving object then it can sometimes skip over tilemap collisions if it moves through a tile in a step.
    * Set this padding value to add extra padding to its bounds. tilePadding.x applied to its width, y to its height.
    * @property ***REMOVED***Phaser.Point***REMOVED*** tilePadding - Extra padding to be added to this sprite's dimensions when checking for tile collision.
    */
    this.tilePadding = new Phaser.Point();

    /**
    * @property ***REMOVED***boolean***REMOVED*** dirty - If this Body in a preUpdate (true) or postUpdate (false) state?
    */
    this.dirty = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** skipQuadTree - If true and you collide this Sprite against a Group, it will disable the collision check from using a QuadTree.
    */
    this.skipQuadTree = false;

    /**
    * If true the Body will check itself against the Sprite.getBounds() dimensions and adjust its width and height accordingly.
    * If false it will compare its dimensions against the Sprite scale instead, and adjust its width height if the scale has changed.
    * Typically you would need to enable syncBounds if your sprite is the child of a responsive display object such as a FlexLayer, 
    * or in any situation where the Sprite scale doesn't change, but its parents scale is effecting the dimensions regardless.
    * @property ***REMOVED***boolean***REMOVED*** syncBounds
    * @default
    */
    this.syncBounds = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isMoving - Set by the `moveTo` and `moveFrom` methods.
    */
    this.isMoving = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** stopVelocityOnCollide - Set by the `moveTo` and `moveFrom` methods.
    */
    this.stopVelocityOnCollide = true;

    /**
    * @property ***REMOVED***integer***REMOVED*** moveTimer - Internal time used by the `moveTo` and `moveFrom` methods.
    * @private
    */
    this.moveTimer = 0;

    /**
    * @property ***REMOVED***integer***REMOVED*** moveDistance - Internal distance value, used by the `moveTo` and `moveFrom` methods.
    * @private
    */
    this.moveDistance = 0;

    /**
    * @property ***REMOVED***integer***REMOVED*** moveDuration - Internal duration value, used by the `moveTo` and `moveFrom` methods.
    * @private
    */
    this.moveDuration = 0;

    /**
    * @property ***REMOVED***Phaser.Line***REMOVED*** moveTarget - Set by the `moveTo` method, and updated each frame.
    * @private
    */
    this.moveTarget = null;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** moveEnd - Set by the `moveTo` method, and updated each frame.
    * @private
    */
    this.moveEnd = null;

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onMoveComplete - Listen for the completion of `moveTo` or `moveFrom` events.
    */
    this.onMoveComplete = new Phaser.Signal();

    /**
    * @property ***REMOVED***function***REMOVED*** movementCallback - Optional callback. If set, invoked during the running of `moveTo` or `moveFrom` events.
    */
    this.movementCallback = null;

    /**
    * @property ***REMOVED***object***REMOVED*** movementCallbackContext - Context in which to call the movementCallback.
    */
    this.movementCallbackContext = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _reset - Internal cache var.
    * @private
    */
    this._reset = true;

    /**
    * @property ***REMOVED***number***REMOVED*** _sx - Internal cache var.
    * @private
    */
    this._sx = sprite.scale.x;

    /**
    * @property ***REMOVED***number***REMOVED*** _sy - Internal cache var.
    * @private
    */
    this._sy = sprite.scale.y;

    /**
    * @property ***REMOVED***number***REMOVED*** _dx - Internal cache var.
    * @private
    */
    this._dx = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _dy - Internal cache var.
    * @private
    */
    this._dy = 0;

***REMOVED***;

Phaser.Physics.Arcade.Body.prototype = ***REMOVED***

    /**
    * Internal method.
    *
    * @method Phaser.Physics.Arcade.Body#updateBounds
    * @protected
    */
    updateBounds: function () ***REMOVED***

        if (this.syncBounds)
        ***REMOVED***
            var b = this.sprite.getBounds();
            b.ceilAll();

            if (b.width !== this.width || b.height !== this.height)
            ***REMOVED***
                this.width = b.width;
                this.height = b.height;
                this._reset = true;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            var asx = Math.abs(this.sprite.scale.x);
            var asy = Math.abs(this.sprite.scale.y);

            if (asx !== this._sx || asy !== this._sy)
            ***REMOVED***
                this.width = this.sourceWidth * asx;
                this.height = this.sourceHeight * asy;
                this._sx = asx;
                this._sy = asy;
                this._reset = true;
            ***REMOVED***
        ***REMOVED***

        if (this._reset)
        ***REMOVED***
            this.halfWidth = Math.floor(this.width / 2);
            this.halfHeight = Math.floor(this.height / 2);
            this.center.setTo(this.position.x + this.halfWidth, this.position.y + this.halfHeight);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal method.
    *
    * @method Phaser.Physics.Arcade.Body#preUpdate
    * @protected
    */
    preUpdate: function () ***REMOVED***

        if (!this.enable || this.game.physics.arcade.isPaused)
        ***REMOVED***
            return;
        ***REMOVED***

        this.dirty = true;

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

        this.blocked.up = false;
        this.blocked.down = false;
        this.blocked.left = false;
        this.blocked.right = false;

        this.embedded = false;

        this.updateBounds();

        this.position.x = (this.sprite.world.x - (this.sprite.anchor.x * this.sprite.width)) + this.sprite.scale.x * this.offset.x;
        this.position.x -= this.sprite.scale.x < 0 ? this.width : 0;

        this.position.y = (this.sprite.world.y - (this.sprite.anchor.y * this.sprite.height)) + this.sprite.scale.y * this.offset.y;
        this.position.y -= this.sprite.scale.y < 0 ? this.height : 0;

        this.rotation = this.sprite.angle;

        this.preRotation = this.rotation;

        if (this._reset || this.sprite.fresh)
        ***REMOVED***
            this.prev.x = this.position.x;
            this.prev.y = this.position.y;
        ***REMOVED***

        if (this.moves)
        ***REMOVED***
            this.game.physics.arcade.updateMotion(this);

            this.newVelocity.set(this.velocity.x * this.game.time.physicsElapsed, this.velocity.y * this.game.time.physicsElapsed);

            this.position.x += this.newVelocity.x;
            this.position.y += this.newVelocity.y;

            if (this.position.x !== this.prev.x || this.position.y !== this.prev.y)
            ***REMOVED***
                this.angle = Math.atan2(this.velocity.y, this.velocity.x);
            ***REMOVED***

            this.speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);

            //  Now the State update will throw collision checks at the Body
            //  And finally we'll integrate the new position back to the Sprite in postUpdate

            if (this.collideWorldBounds)
            ***REMOVED***
                if (this.checkWorldBounds() && this.onWorldBounds)
                ***REMOVED***
                    this.onWorldBounds.dispatch(this.sprite, this.blocked.up, this.blocked.down, this.blocked.left, this.blocked.right);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        this._dx = this.deltaX();
        this._dy = this.deltaY();

        this._reset = false;

    ***REMOVED***,

    /**
    * Internal method.
    *
    * @method Phaser.Physics.Arcade.Body#updateMovement
    * @protected
    */
    updateMovement: function () ***REMOVED***

        var percent = 0;
        var collided = (this.overlapX !== 0 || this.overlapY !== 0);

        //  Duration or Distance based?

        if (this.moveDuration > 0)
        ***REMOVED***
            this.moveTimer += this.game.time.elapsedMS;

            percent = this.moveTimer / this.moveDuration;
        ***REMOVED***
        else
        ***REMOVED***
            this.moveTarget.end.set(this.position.x, this.position.y);

            percent = this.moveTarget.length / this.moveDistance;
        ***REMOVED***

        if (this.movementCallback)
        ***REMOVED***
            var result = this.movementCallback.call(this.movementCallbackContext, this, this.velocity, percent);
        ***REMOVED***

        if (collided || percent >= 1 || (result !== undefined && result !== true))
        ***REMOVED***
            this.stopMovement((percent >= 1) || (this.stopVelocityOnCollide && collided));
            return false;
        ***REMOVED***

        return true;

    ***REMOVED***,

    /**
    * If this Body is moving as a result of a call to `moveTo` or `moveFrom` (i.e. it
    * has Body.isMoving true), then calling this method will stop the movement before
    * either the duration or distance counters expire.
    *
    * The `onMoveComplete` signal is dispatched.
    *
    * @method Phaser.Physics.Arcade.Body#stopMovement
    * @param ***REMOVED***boolean***REMOVED*** [stopVelocity] - Should the Body.velocity be set to zero?
    */
    stopMovement: function (stopVelocity) ***REMOVED***

        if (this.isMoving)
        ***REMOVED***
            this.isMoving = false;

            if (stopVelocity)
            ***REMOVED***
                this.velocity.set(0);
            ***REMOVED***

            //  Send the Sprite this Body belongs to
            //  and a boolean indicating if it stopped because of a collision or not
            this.onMoveComplete.dispatch(this.sprite, (this.overlapX !== 0 || this.overlapY !== 0));
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal method.
    *
    * @method Phaser.Physics.Arcade.Body#postUpdate
    * @protected
    */
    postUpdate: function () ***REMOVED***

        //  Only allow postUpdate to be called once per frame
        if (!this.enable || !this.dirty)
        ***REMOVED***
            return;
        ***REMOVED***

        //  Moving?
        if (this.isMoving)
        ***REMOVED***
            this.updateMovement();
        ***REMOVED***

        this.dirty = false;

        if (this.deltaX() < 0)
        ***REMOVED***
            this.facing = Phaser.LEFT;
        ***REMOVED***
        else if (this.deltaX() > 0)
        ***REMOVED***
            this.facing = Phaser.RIGHT;
        ***REMOVED***

        if (this.deltaY() < 0)
        ***REMOVED***
            this.facing = Phaser.UP;
        ***REMOVED***
        else if (this.deltaY() > 0)
        ***REMOVED***
            this.facing = Phaser.DOWN;
        ***REMOVED***

        if (this.moves)
        ***REMOVED***
            this._dx = this.deltaX();
            this._dy = this.deltaY();

            if (this.deltaMax.x !== 0 && this._dx !== 0)
            ***REMOVED***
                if (this._dx < 0 && this._dx < -this.deltaMax.x)
                ***REMOVED***
                    this._dx = -this.deltaMax.x;
                ***REMOVED***
                else if (this._dx > 0 && this._dx > this.deltaMax.x)
                ***REMOVED***
                    this._dx = this.deltaMax.x;
                ***REMOVED***
            ***REMOVED***

            if (this.deltaMax.y !== 0 && this._dy !== 0)
            ***REMOVED***
                if (this._dy < 0 && this._dy < -this.deltaMax.y)
                ***REMOVED***
                    this._dy = -this.deltaMax.y;
                ***REMOVED***
                else if (this._dy > 0 && this._dy > this.deltaMax.y)
                ***REMOVED***
                    this._dy = this.deltaMax.y;
                ***REMOVED***
            ***REMOVED***

            this.sprite.position.x += this._dx;
            this.sprite.position.y += this._dy;
            this._reset = true;
        ***REMOVED***

        this.center.setTo(this.position.x + this.halfWidth, this.position.y + this.halfHeight);

        if (this.allowRotation)
        ***REMOVED***
            this.sprite.angle += this.deltaZ();
        ***REMOVED***

        this.prev.x = this.position.x;
        this.prev.y = this.position.y;

    ***REMOVED***,

    /**
    * Internal method.
    *
    * @method Phaser.Physics.Arcade.Body#checkWorldBounds
    * @protected
    * @return ***REMOVED***boolean***REMOVED*** True if the Body collided with the world bounds, otherwise false.
    */
    checkWorldBounds: function () ***REMOVED***

        var pos = this.position;
        var bounds = this.game.physics.arcade.bounds;
        var check = this.game.physics.arcade.checkCollision;

        var bx = (this.worldBounce) ? -this.worldBounce.x : -this.bounce.x;
        var by = (this.worldBounce) ? -this.worldBounce.y : -this.bounce.y;

        if (this.isCircle)
        ***REMOVED***
            var bodyBounds = ***REMOVED***
                x: this.center.x - this.radius,
                y: this.center.y - this.radius,
                right: this.center.x + this.radius,
                bottom: this.center.y + this.radius
            ***REMOVED***;

            if (bodyBounds.x < bounds.x && check.left)
            ***REMOVED***
                pos.x = bounds.x - this.halfWidth + this.radius;
                this.velocity.x *= bx;
                this.blocked.left = true;
            ***REMOVED***
            else if (bodyBounds.right > bounds.right && check.right)
            ***REMOVED***
                pos.x = bounds.right - this.halfWidth - this.radius;
                this.velocity.x *= bx;
                this.blocked.right = true;
            ***REMOVED***

            if (bodyBounds.y < bounds.y && check.up)
            ***REMOVED***
                pos.y = bounds.y - this.halfHeight + this.radius;
                this.velocity.y *= by;
                this.blocked.up = true;
            ***REMOVED***
            else if (bodyBounds.bottom > bounds.bottom && check.down)
            ***REMOVED***
                pos.y = bounds.bottom  - this.halfHeight - this.radius;
                this.velocity.y *= by;
                this.blocked.down = true;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (pos.x < bounds.x && check.left)
            ***REMOVED***
                pos.x = bounds.x;
                this.velocity.x *= bx;
                this.blocked.left = true;
            ***REMOVED***
            else if (this.right > bounds.right && check.right)
            ***REMOVED***
                pos.x = bounds.right - this.width;
                this.velocity.x *= bx;
                this.blocked.right = true;
            ***REMOVED***

            if (pos.y < bounds.y && check.up)
            ***REMOVED***
                pos.y = bounds.y;
                this.velocity.y *= by;
                this.blocked.up = true;
            ***REMOVED***
            else if (this.bottom > bounds.bottom && check.down)
            ***REMOVED***
                pos.y = bounds.bottom - this.height;
                this.velocity.y *= by;
                this.blocked.down = true;
            ***REMOVED***
        ***REMOVED***

        return (this.blocked.up || this.blocked.down || this.blocked.left || this.blocked.right);

    ***REMOVED***,

    /**
    * Note: This method is experimental, and may be changed or removed in a future release.
    * 
    * This method moves the Body in the given direction, for the duration specified.
    * It works by setting the velocity on the Body, and an internal timer, and then
    * monitoring the duration each frame. When the duration is up the movement is
    * stopped and the `Body.onMoveComplete` signal is dispatched.
    *
    * Movement also stops if the Body collides or overlaps with any other Body.
    * 
    * You can control if the velocity should be reset to zero on collision, by using
    * the property `Body.stopVelocityOnCollide`.
    *
    * Stop the movement at any time by calling `Body.stopMovement`.
    *
    * You can optionally set a speed in pixels per second. If not specified it
    * will use the current `Body.speed` value. If this is zero, the function will return false.
    *
    * Please note that due to browser timings you should allow for a variance in 
    * when the duration will actually expire. Depending on system it may be as much as
    * +- 50ms. Also this method doesn't take into consideration any other forces acting
    * on the Body, such as Gravity, drag or maxVelocity, all of which may impact the
    * movement.
    * 
    * @method Phaser.Physics.Arcade.Body#moveFrom
    * @param  ***REMOVED***integer***REMOVED*** duration  - The duration of the movement, in ms.
    * @param  ***REMOVED***integer***REMOVED*** [speed] - The speed of the movement, in pixels per second. If not provided `Body.speed` is used.
    * @param  ***REMOVED***integer***REMOVED*** [direction] - The angle of movement. If not provided `Body.angle` is used.
    * @return ***REMOVED***boolean***REMOVED*** True if the movement successfully started, otherwise false.
    */
    moveFrom: function (duration, speed, direction) ***REMOVED***

        if (speed === undefined) ***REMOVED*** speed = this.speed; ***REMOVED***

        if (speed === 0)
        ***REMOVED***
            return false;
        ***REMOVED***

        var angle;

        if (direction === undefined)
        ***REMOVED***
            angle = this.angle;
            direction = this.game.math.radToDeg(angle);
        ***REMOVED***
        else
        ***REMOVED***
            angle = this.game.math.degToRad(direction);
        ***REMOVED***

        this.moveTimer = 0;
        this.moveDuration = duration;

        //  Avoid sin/cos
        if (direction === 0 || direction === 180)
        ***REMOVED***
            this.velocity.set(Math.cos(angle) * speed, 0);
        ***REMOVED***
        else if (direction === 90 || direction === 270)
        ***REMOVED***
            this.velocity.set(0, Math.sin(angle) * speed);
        ***REMOVED***
        else
        ***REMOVED***
            this.velocity.set(Math.cos(angle) * speed, Math.sin(angle) * speed);
        ***REMOVED***

        this.isMoving = true;

        return true;

    ***REMOVED***,

    /**
    * Note: This method is experimental, and may be changed or removed in a future release.
    * 
    * This method moves the Body in the given direction, for the duration specified.
    * It works by setting the velocity on the Body, and an internal distance counter.
    * The distance is monitored each frame. When the distance equals the distance
    * specified in this call, the movement is stopped, and the `Body.onMoveComplete` 
    * signal is dispatched.
    *
    * Movement also stops if the Body collides or overlaps with any other Body.
    * 
    * You can control if the velocity should be reset to zero on collision, by using
    * the property `Body.stopVelocityOnCollide`.
    *
    * Stop the movement at any time by calling `Body.stopMovement`.
    *
    * Please note that due to browser timings you should allow for a variance in 
    * when the distance will actually expire.
    * 
    * Note: This method doesn't take into consideration any other forces acting
    * on the Body, such as Gravity, drag or maxVelocity, all of which may impact the
    * movement.
    * 
    * @method Phaser.Physics.Arcade.Body#moveTo
    * @param  ***REMOVED***integer***REMOVED*** duration - The duration of the movement, in ms.
    * @param  ***REMOVED***integer***REMOVED*** distance - The distance, in pixels, the Body will move.
    * @param  ***REMOVED***integer***REMOVED*** [direction] - The angle of movement. If not provided `Body.angle` is used.
    * @return ***REMOVED***boolean***REMOVED*** True if the movement successfully started, otherwise false.
    */
    moveTo: function (duration, distance, direction) ***REMOVED***

        var speed = distance / (duration / 1000);

        if (speed === 0)
        ***REMOVED***
            return false;
        ***REMOVED***

        var angle;

        if (direction === undefined)
        ***REMOVED***
            angle = this.angle;
            direction = this.game.math.radToDeg(angle);
        ***REMOVED***
        else
        ***REMOVED***
            angle = this.game.math.degToRad(direction);
        ***REMOVED***

        distance = Math.abs(distance);

        this.moveDuration = 0;
        this.moveDistance = distance;

        if (this.moveTarget === null)
        ***REMOVED***
            this.moveTarget = new Phaser.Line();
            this.moveEnd = new Phaser.Point();
        ***REMOVED***

        this.moveTarget.fromAngle(this.x, this.y, angle, distance);

        this.moveEnd.set(this.moveTarget.end.x, this.moveTarget.end.y);

        this.moveTarget.setTo(this.x, this.y, this.x, this.y);

        //  Avoid sin/cos
        if (direction === 0 || direction === 180)
        ***REMOVED***
            this.velocity.set(Math.cos(angle) * speed, 0);
        ***REMOVED***
        else if (direction === 90 || direction === 270)
        ***REMOVED***
            this.velocity.set(0, Math.sin(angle) * speed);
        ***REMOVED***
        else
        ***REMOVED***
            this.velocity.set(Math.cos(angle) * speed, Math.sin(angle) * speed);
        ***REMOVED***

        this.isMoving = true;

        return true;

    ***REMOVED***,

    /**
    * You can modify the size of the physics Body to be any dimension you need.
    * This allows you to make it smaller, or larger, than the parent Sprite.
    * You can also control the x and y offset of the Body. This is the position of the
    * Body relative to the top-left of the Sprite _texture_.
    *
    * For example: If you have a Sprite with a texture that is 80x100 in size,
    * and you want the physics body to be 32x32 pixels in the middle of the texture, you would do:
    *
    * `setSize(32, 32, 24, 34)`
    *
    * Where the first two parameters is the new Body size (32x32 pixels).
    * 24 is the horizontal offset of the Body from the top-left of the Sprites texture, and 34
    * is the vertical offset.
    *
    * Calling `setSize` on a Body that has already had `setCircle` will reset all of the Circle
    * properties, making this Body rectangular again.
    *
    * @method Phaser.Physics.Arcade.Body#setSize
    * @param ***REMOVED***number***REMOVED*** width - The width of the Body.
    * @param ***REMOVED***number***REMOVED*** height - The height of the Body.
    * @param ***REMOVED***number***REMOVED*** [offsetX] - The X offset of the Body from the top-left of the Sprites texture.
    * @param ***REMOVED***number***REMOVED*** [offsetY] - The Y offset of the Body from the top-left of the Sprites texture.
    */
    setSize: function (width, height, offsetX, offsetY) ***REMOVED***

        if (offsetX === undefined) ***REMOVED*** offsetX = this.offset.x; ***REMOVED***
        if (offsetY === undefined) ***REMOVED*** offsetY = this.offset.y; ***REMOVED***

        this.sourceWidth = width;
        this.sourceHeight = height;
        this.width = this.sourceWidth * this._sx;
        this.height = this.sourceHeight * this._sy;
        this.halfWidth = Math.floor(this.width / 2);
        this.halfHeight = Math.floor(this.height / 2);
        this.offset.setTo(offsetX, offsetY);

        this.center.setTo(this.position.x + this.halfWidth, this.position.y + this.halfHeight);

        this.isCircle = false;
        this.radius = 0;

    ***REMOVED***,

    /**
    * Sets this Body as using a circle, of the given radius, for all collision detection instead of a rectangle.
    * The radius is given in pixels and is the distance from the center of the circle to the edge.
    *
    * You can also control the x and y offset, which is the position of the Body relative to the top-left of the Sprite.
    *
    * To change a Body back to being rectangular again call `Body.setSize`.
    *
    * Note: Circular collision only happens with other Arcade Physics bodies, it does not
    * work against tile maps, where rectangular collision is the only method supported.
    *
    * @method Phaser.Physics.Arcade.Body#setCircle
    * @param ***REMOVED***number***REMOVED*** [radius] - The radius of the Body in pixels. Pass a value of zero / undefined, to stop the Body using a circle for collision.
    * @param ***REMOVED***number***REMOVED*** [offsetX] - The X offset of the Body from the Sprite position.
    * @param ***REMOVED***number***REMOVED*** [offsetY] - The Y offset of the Body from the Sprite position.
    */
    setCircle: function (radius, offsetX, offsetY) ***REMOVED***

        if (offsetX === undefined) ***REMOVED*** offsetX = this.offset.x; ***REMOVED***
        if (offsetY === undefined) ***REMOVED*** offsetY = this.offset.y; ***REMOVED***

        if (radius > 0)
        ***REMOVED***
            this.isCircle = true;
            this.radius = radius;

            this.sourceWidth = radius * 2;
            this.sourceHeight = radius * 2;

            this.width = this.sourceWidth * this._sx;
            this.height = this.sourceHeight * this._sy;

            this.halfWidth = Math.floor(this.width / 2);
            this.halfHeight = Math.floor(this.height / 2);

            this.offset.setTo(offsetX, offsetY);

            this.center.setTo(this.position.x + this.halfWidth, this.position.y + this.halfHeight);
        ***REMOVED***
        else
        ***REMOVED***
            this.isCircle = false;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Resets all Body values (velocity, acceleration, rotation, etc)
    *
    * @method Phaser.Physics.Arcade.Body#reset
    * @param ***REMOVED***number***REMOVED*** x - The new x position of the Body.
    * @param ***REMOVED***number***REMOVED*** y - The new y position of the Body.
    */
    reset: function (x, y) ***REMOVED***

        this.velocity.set(0);
        this.acceleration.set(0);

        this.speed = 0;
        this.angularVelocity = 0;
        this.angularAcceleration = 0;

        this.position.x = (x - (this.sprite.anchor.x * this.sprite.width)) + this.sprite.scale.x * this.offset.x;
        this.position.x -= this.sprite.scale.x < 0 ? this.width : 0;

        this.position.y = (y - (this.sprite.anchor.y * this.sprite.height)) + this.sprite.scale.y * this.offset.y;
        this.position.y -= this.sprite.scale.y < 0 ? this.height : 0;

        this.prev.x = this.position.x;
        this.prev.y = this.position.y;

        this.rotation = this.sprite.angle;
        this.preRotation = this.rotation;

        this._sx = this.sprite.scale.x;
        this._sy = this.sprite.scale.y;

        this.center.setTo(this.position.x + this.halfWidth, this.position.y + this.halfHeight);

    ***REMOVED***,

    /**
    * Returns the bounds of this physics body.
    * 
    * Only used internally by the World collision methods.
    *
    * @method Phaser.Physics.Arcade.Body#getBounds
    * @param ***REMOVED***object***REMOVED*** obj - The object in which to set the bounds values.
    * @return ***REMOVED***object***REMOVED*** The object that was given to this method.
    */
    getBounds: function (obj) ***REMOVED***

        if (this.isCircle)
        ***REMOVED***
            obj.x = this.center.x - this.radius;
            obj.y = this.center.y - this.radius;
            obj.right = this.center.x + this.radius;
            obj.bottom = this.center.y + this.radius;
        ***REMOVED***
        else
        ***REMOVED***
            obj.x = this.x;
            obj.y = this.y;
            obj.right = this.right;
            obj.bottom = this.bottom;
        ***REMOVED***

        return obj;

    ***REMOVED***,

    /**
    * Tests if a world point lies within this Body.
    *
    * @method Phaser.Physics.Arcade.Body#hitTest
    * @param ***REMOVED***number***REMOVED*** x - The world x coordinate to test.
    * @param ***REMOVED***number***REMOVED*** y - The world y coordinate to test.
    * @return ***REMOVED***boolean***REMOVED*** True if the given coordinates are inside this Body, otherwise false.
    */
    hitTest: function (x, y) ***REMOVED***

        return (this.isCircle) ? Phaser.Circle.contains(this, x, y) : Phaser.Rectangle.contains(this, x, y);

    ***REMOVED***,

    /**
    * Returns true if the bottom of this Body is in contact with either the world bounds or a tile.
    *
    * @method Phaser.Physics.Arcade.Body#onFloor
    * @return ***REMOVED***boolean***REMOVED*** True if in contact with either the world bounds or a tile.
    */
    onFloor: function () ***REMOVED***

        return this.blocked.down;

    ***REMOVED***,
    
    /**
    * Returns true if the top of this Body is in contact with either the world bounds or a tile.
    *
    * @method Phaser.Physics.Arcade.Body#onCeiling
    * @return ***REMOVED***boolean***REMOVED*** True if in contact with either the world bounds or a tile.
    */
    onCeiling: function()***REMOVED***

        return this.blocked.up;

    ***REMOVED***,

    /**
    * Returns true if either side of this Body is in contact with either the world bounds or a tile.
    *
    * @method Phaser.Physics.Arcade.Body#onWall
    * @return ***REMOVED***boolean***REMOVED*** True if in contact with either the world bounds or a tile.
    */
    onWall: function () ***REMOVED***

        return (this.blocked.left || this.blocked.right);

    ***REMOVED***,

    /**
    * Returns the absolute delta x value.
    *
    * @method Phaser.Physics.Arcade.Body#deltaAbsX
    * @return ***REMOVED***number***REMOVED*** The absolute delta value.
    */
    deltaAbsX: function () ***REMOVED***

        return (this.deltaX() > 0 ? this.deltaX() : -this.deltaX());

    ***REMOVED***,

    /**
    * Returns the absolute delta y value.
    *
    * @method Phaser.Physics.Arcade.Body#deltaAbsY
    * @return ***REMOVED***number***REMOVED*** The absolute delta value.
    */
    deltaAbsY: function () ***REMOVED***

        return (this.deltaY() > 0 ? this.deltaY() : -this.deltaY());

    ***REMOVED***,

    /**
    * Returns the delta x value. The difference between Body.x now and in the previous step.
    *
    * @method Phaser.Physics.Arcade.Body#deltaX
    * @return ***REMOVED***number***REMOVED*** The delta value. Positive if the motion was to the right, negative if to the left.
    */
    deltaX: function () ***REMOVED***

        return this.position.x - this.prev.x;

    ***REMOVED***,

    /**
    * Returns the delta y value. The difference between Body.y now and in the previous step.
    *
    * @method Phaser.Physics.Arcade.Body#deltaY
    * @return ***REMOVED***number***REMOVED*** The delta value. Positive if the motion was downwards, negative if upwards.
    */
    deltaY: function () ***REMOVED***

        return this.position.y - this.prev.y;

    ***REMOVED***,

    /**
    * Returns the delta z value. The difference between Body.rotation now and in the previous step.
    *
    * @method Phaser.Physics.Arcade.Body#deltaZ
    * @return ***REMOVED***number***REMOVED*** The delta value. Positive if the motion was clockwise, negative if anti-clockwise.
    */
    deltaZ: function () ***REMOVED***

        return this.rotation - this.preRotation;

    ***REMOVED***,

    /**
    * Destroys this Body.
    * 
    * First it calls Group.removeFromHash if the Game Object this Body belongs to is part of a Group.
    * Then it nulls the Game Objects body reference, and nulls this Body.sprite reference.
    *
    * @method Phaser.Physics.Arcade.Body#destroy
    */
    destroy: function () ***REMOVED***

        if (this.sprite.parent && this.sprite.parent instanceof Phaser.Group)
        ***REMOVED***
            this.sprite.parent.removeFromHash(this.sprite);
        ***REMOVED***

        this.sprite.body = null;
        this.sprite = null;

    ***REMOVED***

***REMOVED***;

/**
* @name Phaser.Physics.Arcade.Body#left
* @property ***REMOVED***number***REMOVED*** left - The x position of the Body. The same as `Body.x`.
*/
Object.defineProperty(Phaser.Physics.Arcade.Body.prototype, "left", ***REMOVED***

    get: function () ***REMOVED***

        return this.position.x;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.Arcade.Body#right
* @property ***REMOVED***number***REMOVED*** right - The right value of this Body (same as Body.x + Body.width)
* @readonly
*/
Object.defineProperty(Phaser.Physics.Arcade.Body.prototype, "right", ***REMOVED***

    get: function () ***REMOVED***

        return this.position.x + this.width;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.Arcade.Body#top
* @property ***REMOVED***number***REMOVED*** top - The y position of the Body. The same as `Body.y`.
*/
Object.defineProperty(Phaser.Physics.Arcade.Body.prototype, "top", ***REMOVED***

    get: function () ***REMOVED***

        return this.position.y;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.Arcade.Body#bottom
* @property ***REMOVED***number***REMOVED*** bottom - The bottom value of this Body (same as Body.y + Body.height)
* @readonly
*/
Object.defineProperty(Phaser.Physics.Arcade.Body.prototype, "bottom", ***REMOVED***

    get: function () ***REMOVED***

        return this.position.y + this.height;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.Arcade.Body#x
* @property ***REMOVED***number***REMOVED*** x - The x position.
*/
Object.defineProperty(Phaser.Physics.Arcade.Body.prototype, "x", ***REMOVED***

    get: function () ***REMOVED***

        return this.position.x;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.position.x = value;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.Arcade.Body#y
* @property ***REMOVED***number***REMOVED*** y - The y position.
*/
Object.defineProperty(Phaser.Physics.Arcade.Body.prototype, "y", ***REMOVED***

    get: function () ***REMOVED***

        return this.position.y;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.position.y = value;

    ***REMOVED***

***REMOVED***);

/**
* Render Sprite Body.
*
* @method Phaser.Physics.Arcade.Body#render
* @param ***REMOVED***object***REMOVED*** context - The context to render to.
* @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body - The Body to render the info of.
* @param ***REMOVED***string***REMOVED*** [color='rgba(0,255,0,0.4)'] - color of the debug info to be rendered. (format is css color string).
* @param ***REMOVED***boolean***REMOVED*** [filled=true] - Render the objected as a filled (default, true) or a stroked (false)
*/
Phaser.Physics.Arcade.Body.render = function (context, body, color, filled) ***REMOVED***

    if (filled === undefined) ***REMOVED*** filled = true; ***REMOVED***

    color = color || 'rgba(0,255,0,0.4)';

    context.fillStyle = color;
    context.strokeStyle = color;

    if (body.isCircle)
    ***REMOVED***
        context.beginPath();
        context.arc(body.center.x - body.game.camera.x, body.center.y - body.game.camera.y, body.radius, 0, 2 * Math.PI);

        if (filled)
        ***REMOVED***
            context.fill();
        ***REMOVED***
        else
        ***REMOVED***
            context.stroke();
        ***REMOVED***
    ***REMOVED***
    else
    ***REMOVED***
        if (filled)
        ***REMOVED***
            context.fillRect(body.position.x - body.game.camera.x, body.position.y - body.game.camera.y, body.width, body.height);
        ***REMOVED***
        else
        ***REMOVED***
            context.strokeRect(body.position.x - body.game.camera.x, body.position.y - body.game.camera.y, body.width, body.height);
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* Render Sprite Body Physics Data as text.
*
* @method Phaser.Physics.Arcade.Body#renderBodyInfo
* @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body - The Body to render the info of.
* @param ***REMOVED***number***REMOVED*** x - X position of the debug info to be rendered.
* @param ***REMOVED***number***REMOVED*** y - Y position of the debug info to be rendered.
* @param ***REMOVED***string***REMOVED*** [color='rgb(255,255,255)'] - color of the debug info to be rendered. (format is css color string).
*/
Phaser.Physics.Arcade.Body.renderBodyInfo = function (debug, body) ***REMOVED***

    debug.line('x: ' + body.x.toFixed(2), 'y: ' + body.y.toFixed(2), 'width: ' + body.width, 'height: ' + body.height);
    debug.line('velocity x: ' + body.velocity.x.toFixed(2), 'y: ' + body.velocity.y.toFixed(2), 'deltaX: ' + body._dx.toFixed(2), 'deltaY: ' + body._dy.toFixed(2));
    debug.line('acceleration x: ' + body.acceleration.x.toFixed(2), 'y: ' + body.acceleration.y.toFixed(2), 'speed: ' + body.speed.toFixed(2), 'angle: ' + body.angle.toFixed(2));
    debug.line('gravity x: ' + body.gravity.x, 'y: ' + body.gravity.y, 'bounce x: ' + body.bounce.x.toFixed(2), 'y: ' + body.bounce.y.toFixed(2));
    debug.line('touching left: ' + body.touching.left, 'right: ' + body.touching.right, 'up: ' + body.touching.up, 'down: ' + body.touching.down);
    debug.line('blocked left: ' + body.blocked.left, 'right: ' + body.blocked.right, 'up: ' + body.blocked.up, 'down: ' + body.blocked.down);

***REMOVED***;

Phaser.Physics.Arcade.Body.prototype.constructor = Phaser.Physics.Arcade.Body;
