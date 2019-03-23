/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Physics Body is typically linked to a single Sprite and defines properties that determine how the physics body is simulated.
* These properties affect how the body reacts to forces, what forces it generates on itself (to simulate friction), and how it reacts to collisions in the scene.
* In most cases, the properties are used to simulate physical effects. Each body also has its own property values that determine exactly how it reacts to forces and collisions in the scene.
* By default a single Rectangle shape is added to the Body that matches the dimensions of the parent Sprite. See addShape, removeShape, clearShapes to add extra shapes around the Body.
* Note: When bound to a Sprite to avoid single-pixel jitters on mobile devices we strongly recommend using Sprite sizes that are even on both axis, i.e. 128x128 not 127x127.
* Note: When a game object is given a P2 body it has its anchor x/y set to 0.5, so it becomes centered.
*
* @class Phaser.Physics.P2.Body
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Game reference to the currently running game.
* @param ***REMOVED***Phaser.Sprite***REMOVED*** [sprite] - The Sprite object this physics body belongs to.
* @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate of this Body.
* @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate of this Body.
* @param ***REMOVED***number***REMOVED*** [mass=1] - The default mass of this Body (0 = static).
*/
Phaser.Physics.P2.Body = function (game, sprite, x, y, mass) ***REMOVED***

    sprite = sprite || null;
    x = x || 0;
    y = y || 0;
    if (mass === undefined) ***REMOVED*** mass = 1; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***Phaser.Physics.P2***REMOVED*** world - Local reference to the P2 World.
    */
    this.world = game.physics.p2;

    /**
    * @property ***REMOVED***Phaser.Sprite***REMOVED*** sprite - Reference to the parent Sprite.
    */
    this.sprite = sprite;

    /**
    * @property ***REMOVED***number***REMOVED*** type - The type of physics system this body belongs to.
    */
    this.type = Phaser.Physics.P2JS;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** offset - The offset of the Physics Body from the Sprite x/y position.
    */
    this.offset = new Phaser.Point();

    /**
    * @property ***REMOVED***p2.Body***REMOVED*** data - The p2 Body data.
    * @protected
    */
    this.data = new p2.Body(***REMOVED*** position: [ this.world.pxmi(x), this.world.pxmi(y) ], mass: mass ***REMOVED***);

    this.data.parent = this;

    /**
    * @property ***REMOVED***Phaser.Physics.P2.InversePointProxy***REMOVED*** velocity - The velocity of the body. Set velocity.x to a negative value to move to the left, position to the right. velocity.y negative values move up, positive move down.
    */
    this.velocity = new Phaser.Physics.P2.InversePointProxy(this.world, this.data.velocity);

    /**
    * @property ***REMOVED***Phaser.Physics.P2.InversePointProxy***REMOVED*** force - The force applied to the body.
    */
    this.force = new Phaser.Physics.P2.InversePointProxy(this.world, this.data.force);

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** gravity - A locally applied gravity force to the Body. Applied directly before the world step. NOTE: Not currently implemented.
    */
    this.gravity = new Phaser.Point();

    /**
    * Dispatched when a first contact is created between shapes in two bodies. 
    * This event is fired during the step, so collision has already taken place.
    * 
    * The event will be sent 5 arguments in this order:
    * 
    * The Phaser.Physics.P2.Body it is in contact with. *This might be null* if the Body was created directly in the p2 world.
    * The p2.Body this Body is in contact with.
    * The Shape from this body that caused the contact.
    * The Shape from the contact body.
    * The Contact Equation data array.
    * 
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onBeginContact
    */
    this.onBeginContact = new Phaser.Signal();

    /**
    * Dispatched when contact ends between shapes in two bodies.
    * This event is fired during the step, so collision has already taken place.
    * 
    * The event will be sent 4 arguments in this order:
    * 
    * The Phaser.Physics.P2.Body it is in contact with. *This might be null* if the Body was created directly in the p2 world.
    * The p2.Body this Body has ended contact with.
    * The Shape from this body that caused the original contact.
    * The Shape from the contact body.
    * 
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onEndContact
    */
    this.onEndContact = new Phaser.Signal();

    /**
    * @property ***REMOVED***array***REMOVED*** collidesWith - Array of CollisionGroups that this Bodies shapes collide with.
    */
    this.collidesWith = [];

    /**
    * @property ***REMOVED***boolean***REMOVED*** removeNextStep - To avoid deleting this body during a physics step, and causing all kinds of problems, set removeNextStep to true to have it removed in the next preUpdate.
    */
    this.removeNextStep = false;

    /**
    * @property ***REMOVED***Phaser.Physics.P2.BodyDebug***REMOVED*** debugBody - Reference to the debug body.
    */
    this.debugBody = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** dirty - Internally used by Sprite.x/y
    */
    this.dirty = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _collideWorldBounds - Internal var that determines if this Body collides with the world bounds or not.
    * @private
    */
    this._collideWorldBounds = true;

    /**
    * @property ***REMOVED***object***REMOVED*** _bodyCallbacks - Array of Body callbacks.
    * @private
    */
    this._bodyCallbacks = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***object***REMOVED*** _bodyCallbackContext - Array of Body callback contexts.
    * @private
    */
    this._bodyCallbackContext = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***object***REMOVED*** _groupCallbacks - Array of Group callbacks.
    * @private
    */
    this._groupCallbacks = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***object***REMOVED*** _bodyCallbackContext - Array of Grouo callback contexts.
    * @private
    */
    this._groupCallbackContext = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _reset - Internal var.
    * @private
    */
    this._reset = false;

    //  Set-up the default shape
    if (sprite)
    ***REMOVED***
        this.setRectangleFromSprite(sprite);

        if (sprite.exists)
        ***REMOVED***
            this.game.physics.p2.addBody(this);
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

Phaser.Physics.P2.Body.prototype = ***REMOVED***

    /**
    * Sets a callback to be fired any time a shape in this Body impacts with a shape in the given Body. The impact test is performed against body.id values.
    * The callback will be sent 4 parameters: This body, the body that impacted, the Shape in this body and the shape in the impacting body.
    * Note that the impact event happens after collision resolution, so it cannot be used to prevent a collision from happening.
    * It also happens mid-step. So do not destroy a Body during this callback, instead set safeDestroy to true so it will be killed on the next preUpdate.
    *
    * @method Phaser.Physics.P2.Body#createBodyCallback
    * @param ***REMOVED***Phaser.Sprite|Phaser.TileSprite|Phaser.Physics.P2.Body|p2.Body***REMOVED*** object - The object to send impact events for.
    * @param ***REMOVED***function***REMOVED*** callback - The callback to fire on impact. Set to null to clear a previously set callback.
    * @param ***REMOVED***object***REMOVED*** callbackContext - The context under which the callback will fire.
    */
    createBodyCallback: function (object, callback, callbackContext) ***REMOVED***

        var id = -1;

        if (object['id'])
        ***REMOVED***
            id = object.id;
        ***REMOVED***
        else if (object['body'])
        ***REMOVED***
            id = object.body.id;
        ***REMOVED***

        if (id > -1)
        ***REMOVED***
            if (callback === null)
            ***REMOVED***
                delete (this._bodyCallbacks[id]);
                delete (this._bodyCallbackContext[id]);
            ***REMOVED***
            else
            ***REMOVED***
                this._bodyCallbacks[id] = callback;
                this._bodyCallbackContext[id] = callbackContext;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets a callback to be fired any time this Body impacts with the given Group. The impact test is performed against shape.collisionGroup values.
    * The callback will be sent 4 parameters: This body, the body that impacted, the Shape in this body and the shape in the impacting body.
    * This callback will only fire if this Body has been assigned a collision group.
    * Note that the impact event happens after collision resolution, so it cannot be used to prevent a collision from happening.
    * It also happens mid-step. So do not destroy a Body during this callback, instead set safeDestroy to true so it will be killed on the next preUpdate.
    *
    * @method Phaser.Physics.P2.Body#createGroupCallback
    * @param ***REMOVED***Phaser.Physics.CollisionGroup***REMOVED*** group - The Group to send impact events for.
    * @param ***REMOVED***function***REMOVED*** callback - The callback to fire on impact. Set to null to clear a previously set callback.
    * @param ***REMOVED***object***REMOVED*** callbackContext - The context under which the callback will fire.
    */
    createGroupCallback: function (group, callback, callbackContext) ***REMOVED***

        if (callback === null)
        ***REMOVED***
            delete (this._groupCallbacks[group.mask]);
            delete (this._groupCallbackContext[group.mask]);
        ***REMOVED***
        else
        ***REMOVED***
            this._groupCallbacks[group.mask] = callback;
            this._groupCallbackContext[group.mask] = callbackContext;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Gets the collision bitmask from the groups this body collides with.
    *
    * @method Phaser.Physics.P2.Body#getCollisionMask
    * @return ***REMOVED***number***REMOVED*** The bitmask.
    */
    getCollisionMask: function () ***REMOVED***

        var mask = 0;

        if (this._collideWorldBounds)
        ***REMOVED***
            mask = this.game.physics.p2.boundsCollisionGroup.mask;
        ***REMOVED***

        for (var i = 0; i < this.collidesWith.length; i++)
        ***REMOVED***
            mask = mask | this.collidesWith[i].mask;
        ***REMOVED***

        return mask;

    ***REMOVED***,

    /**
    * Updates the collisionMask.
    *
    * @method Phaser.Physics.P2.Body#updateCollisionMask
    * @param ***REMOVED***p2.Shape***REMOVED*** [shape] - An optional Shape. If not provided the collision group will be added to all Shapes in this Body.
    */
    updateCollisionMask: function (shape) ***REMOVED***

        var mask = this.getCollisionMask();

        if (shape === undefined)
        ***REMOVED***
            for (var i = this.data.shapes.length - 1; i >= 0; i--)
            ***REMOVED***
                this.data.shapes[i].collisionMask = mask;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            shape.collisionMask = mask;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets the given CollisionGroup to be the collision group for all shapes in this Body, unless a shape is specified.
    * This also resets the collisionMask.
    *
    * @method Phaser.Physics.P2.Body#setCollisionGroup
    * @param ***REMOVED***Phaser.Physics.CollisionGroup***REMOVED*** group - The Collision Group that this Bodies shapes will use.
    * @param ***REMOVED***p2.Shape***REMOVED*** [shape] - An optional Shape. If not provided the collision group will be added to all Shapes in this Body.
    */
    setCollisionGroup: function (group, shape) ***REMOVED***

        var mask = this.getCollisionMask();

        if (shape === undefined)
        ***REMOVED***
            for (var i = this.data.shapes.length - 1; i >= 0; i--)
            ***REMOVED***
                this.data.shapes[i].collisionGroup = group.mask;
                this.data.shapes[i].collisionMask = mask;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            shape.collisionGroup = group.mask;
            shape.collisionMask = mask;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Clears the collision data from the shapes in this Body. Optionally clears Group and/or Mask.
    *
    * @method Phaser.Physics.P2.Body#clearCollision
    * @param ***REMOVED***boolean***REMOVED*** [clearGroup=true] - Clear the collisionGroup value from the shape/s?
    * @param ***REMOVED***boolean***REMOVED*** [clearMask=true] - Clear the collisionMask value from the shape/s?
    * @param ***REMOVED***p2.Shape***REMOVED*** [shape] - An optional Shape. If not provided the collision data will be cleared from all Shapes in this Body.
    */
    clearCollision: function (clearGroup, clearMask, shape) ***REMOVED***

        if (clearGroup === undefined) ***REMOVED*** clearGroup = true; ***REMOVED***
        if (clearMask === undefined) ***REMOVED*** clearMask = true; ***REMOVED***

        if (shape === undefined)
        ***REMOVED***
            for (var i = this.data.shapes.length - 1; i >= 0; i--)
            ***REMOVED***
                if (clearGroup)
                ***REMOVED***
                    this.data.shapes[i].collisionGroup = null;
                ***REMOVED***

                if (clearMask)
                ***REMOVED***
                    this.data.shapes[i].collisionMask = null;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (clearGroup)
            ***REMOVED***
                shape.collisionGroup = null;
            ***REMOVED***

            if (clearMask)
            ***REMOVED***
                shape.collisionMask = null;
            ***REMOVED***
        ***REMOVED***

        if (clearGroup)
        ***REMOVED***
            this.collidesWith.length = 0;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Removes the given CollisionGroup, or array of CollisionGroups, from the list of groups that this body will collide with and updates the collision masks.
    *
    * @method Phaser.Physics.P2.Body#removeCollisionGroup
    * @param ***REMOVED***Phaser.Physics.CollisionGroup|array***REMOVED*** group - The Collision Group or Array of Collision Groups that this Bodies shapes should not collide with anymore.
    * @param ***REMOVED***boolean***REMOVED*** [clearCallback=true] - Clear the callback that will be triggered when this Body impacts with the given Group?
    * @param ***REMOVED***p2.Shape***REMOVED*** [shape] - An optional Shape. If not provided the updated collision mask will be added to all Shapes in this Body.
    */
    removeCollisionGroup: function (group, clearCallback, shape) ***REMOVED***

        if (clearCallback === undefined) ***REMOVED*** clearCallback = true; ***REMOVED***

        var index;

        if (Array.isArray(group))
        ***REMOVED***
            for (var i = 0; i < group.length; i++)
            ***REMOVED***
                index = this.collidesWith.indexOf(group[i]);

                if (index > -1)
                ***REMOVED***
                    this.collidesWith.splice(index, 1);

                    if (clearCallback)
                    ***REMOVED***
                        delete (this._groupCallbacks[group.mask]);
                        delete (this._groupCallbackContext[group.mask]);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            index = this.collidesWith.indexOf(group);

            if (index > -1)
            ***REMOVED***
                this.collidesWith.splice(index, 1);

                if (clearCallback)
                ***REMOVED***
                    delete (this._groupCallbacks[group.mask]);
                    delete (this._groupCallbackContext[group.mask]);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        var mask = this.getCollisionMask();

        if (shape === undefined)
        ***REMOVED***
            for (var i = this.data.shapes.length - 1; i >= 0; i--)
            ***REMOVED***
                this.data.shapes[i].collisionMask = mask;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            shape.collisionMask = mask;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Adds the given CollisionGroup, or array of CollisionGroups, to the list of groups that this body will collide with and updates the collision masks.
    *
    * @method Phaser.Physics.P2.Body#collides
    * @param ***REMOVED***Phaser.Physics.CollisionGroup|array***REMOVED*** group - The Collision Group or Array of Collision Groups that this Bodies shapes will collide with.
    * @param ***REMOVED***function***REMOVED*** [callback] - Optional callback that will be triggered when this Body impacts with the given Group.
    * @param ***REMOVED***object***REMOVED*** [callbackContext] - The context under which the callback will be called.
    * @param ***REMOVED***p2.Shape***REMOVED*** [shape] - An optional Shape. If not provided the collision mask will be added to all Shapes in this Body.
    */
    collides: function (group, callback, callbackContext, shape) ***REMOVED***

        if (Array.isArray(group))
        ***REMOVED***
            for (var i = 0; i < group.length; i++)
            ***REMOVED***
                if (this.collidesWith.indexOf(group[i]) === -1)
                ***REMOVED***
                    this.collidesWith.push(group[i]);

                    if (callback)
                    ***REMOVED***
                        this.createGroupCallback(group[i], callback, callbackContext);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (this.collidesWith.indexOf(group) === -1)
            ***REMOVED***
                this.collidesWith.push(group);

                if (callback)
                ***REMOVED***
                    this.createGroupCallback(group, callback, callbackContext);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        var mask = this.getCollisionMask();

        if (shape === undefined)
        ***REMOVED***
            for (var i = this.data.shapes.length - 1; i >= 0; i--)
            ***REMOVED***
                this.data.shapes[i].collisionMask = mask;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            shape.collisionMask = mask;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Moves the shape offsets so their center of mass becomes the body center of mass.
    *
    * @method Phaser.Physics.P2.Body#adjustCenterOfMass
    */
    adjustCenterOfMass: function () ***REMOVED***

        this.data.adjustCenterOfMass();
        this.shapeChanged();

    ***REMOVED***,

    /**
    * Gets the velocity of a point in the body.
    *
    * @method Phaser.Physics.P2.Body#getVelocityAtPoint
    * @param ***REMOVED***Array***REMOVED*** result - A vector to store the result in.
    * @param ***REMOVED***Array***REMOVED*** relativePoint - A world oriented vector, indicating the position of the point to get the velocity from.
    * @return ***REMOVED***Array***REMOVED*** The result vector.
    */
    getVelocityAtPoint: function (result, relativePoint) ***REMOVED***

        return this.data.getVelocityAtPoint(result, relativePoint);

    ***REMOVED***,

    /**
    * Apply damping, see http://code.google.com/p/bullet/issues/detail?id=74 for details.
    *
    * @method Phaser.Physics.P2.Body#applyDamping
    * @param ***REMOVED***number***REMOVED*** dt - Current time step.
    */
    applyDamping: function (dt) ***REMOVED***

        this.data.applyDamping(dt);

    ***REMOVED***,

    /**
    * Apply impulse to a point relative to the body.
    * This could for example be a point on the Body surface. An impulse is a force added to a body during a short 
    * period of time (impulse = force * time). Impulses will be added to Body.velocity and Body.angularVelocity.
    *
    * @method Phaser.Physics.P2.Body#applyImpulse
    * @param ***REMOVED***Float32Array|Array***REMOVED*** impulse - The impulse vector to add, oriented in world space.
    * @param ***REMOVED***number***REMOVED*** worldX - A point relative to the body in world space. If not given, it is set to zero and all of the impulse will be exerted on the center of mass.
    * @param ***REMOVED***number***REMOVED*** worldY - A point relative to the body in world space. If not given, it is set to zero and all of the impulse will be exerted on the center of mass.
    */
    applyImpulse: function (impulse, worldX, worldY) ***REMOVED***

        this.data.applyImpulse(impulse, [this.world.pxmi(worldX), this.world.pxmi(worldY)]);

    ***REMOVED***,

    /**
    * Apply impulse to a point local to the body.
    * 
    * This could for example be a point on the Body surface. An impulse is a force added to a body during a short 
    * period of time (impulse = force * time). Impulses will be added to Body.velocity and Body.angularVelocity.
    *
    * @method Phaser.Physics.P2.Body#applyImpulseLocal
    * @param ***REMOVED***Float32Array|Array***REMOVED*** impulse - The impulse vector to add, oriented in local space.
    * @param ***REMOVED***number***REMOVED*** localX - A local point on the body.
    * @param ***REMOVED***number***REMOVED*** localY - A local point on the body.
    */
    applyImpulseLocal: function (impulse, localX, localY) ***REMOVED***

        this.data.applyImpulseLocal(impulse, [this.world.pxmi(localX), this.world.pxmi(localY)]);

    ***REMOVED***,

    /**
    * Apply force to a world point.
    * 
    * This could for example be a point on the RigidBody surface. Applying force 
    * this way will add to Body.force and Body.angularForce.
    *
    * @method Phaser.Physics.P2.Body#applyForce
    * @param ***REMOVED***Float32Array|Array***REMOVED*** force - The force vector to add.
    * @param ***REMOVED***number***REMOVED*** worldX - The world x point to apply the force on.
    * @param ***REMOVED***number***REMOVED*** worldY - The world y point to apply the force on.
    */
    applyForce: function (force, worldX, worldY) ***REMOVED***

        this.data.applyForce(force, [this.world.pxmi(worldX), this.world.pxmi(worldY)]);

    ***REMOVED***,

    /**
    * Sets the force on the body to zero.
    *
    * @method Phaser.Physics.P2.Body#setZeroForce
    */
    setZeroForce: function () ***REMOVED***

        this.data.setZeroForce();

    ***REMOVED***,

    /**
    * If this Body is dynamic then this will zero its angular velocity.
    *
    * @method Phaser.Physics.P2.Body#setZeroRotation
    */
    setZeroRotation: function () ***REMOVED***

        this.data.angularVelocity = 0;

    ***REMOVED***,

    /**
    * If this Body is dynamic then this will zero its velocity on both axis.
    *
    * @method Phaser.Physics.P2.Body#setZeroVelocity
    */
    setZeroVelocity: function () ***REMOVED***

        this.data.velocity[0] = 0;
        this.data.velocity[1] = 0;

    ***REMOVED***,

    /**
    * Sets the Body damping and angularDamping to zero.
    *
    * @method Phaser.Physics.P2.Body#setZeroDamping
    */
    setZeroDamping: function () ***REMOVED***

        this.data.damping = 0;
        this.data.angularDamping = 0;

    ***REMOVED***,

    /**
    * Transform a world point to local body frame.
    *
    * @method Phaser.Physics.P2.Body#toLocalFrame
    * @param ***REMOVED***Float32Array|Array***REMOVED*** out - The vector to store the result in.
    * @param ***REMOVED***Float32Array|Array***REMOVED*** worldPoint - The input world vector.
    */
    toLocalFrame: function (out, worldPoint) ***REMOVED***

        return this.data.toLocalFrame(out, worldPoint);

    ***REMOVED***,

    /**
    * Transform a local point to world frame.
    *
    * @method Phaser.Physics.P2.Body#toWorldFrame
    * @param ***REMOVED***Array***REMOVED*** out - The vector to store the result in.
    * @param ***REMOVED***Array***REMOVED*** localPoint - The input local vector.
    */
    toWorldFrame: function (out, localPoint) ***REMOVED***

        return this.data.toWorldFrame(out, localPoint);

    ***REMOVED***,

    /**
    * This will rotate the Body by the given speed to the left (counter-clockwise).
    *
    * @method Phaser.Physics.P2.Body#rotateLeft
    * @param ***REMOVED***number***REMOVED*** speed - The speed at which it should rotate.
    */
    rotateLeft: function (speed) ***REMOVED***

        this.data.angularVelocity = this.world.pxm(-speed);

    ***REMOVED***,

    /**
    * This will rotate the Body by the given speed to the left (clockwise).
    *
    * @method Phaser.Physics.P2.Body#rotateRight
    * @param ***REMOVED***number***REMOVED*** speed - The speed at which it should rotate.
    */
    rotateRight: function (speed) ***REMOVED***

        this.data.angularVelocity = this.world.pxm(speed);

    ***REMOVED***,

    /**
    * Moves the Body forwards based on its current angle and the given speed.
    * The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second (1000ms).
    *
    * @method Phaser.Physics.P2.Body#moveForward
    * @param ***REMOVED***number***REMOVED*** speed - The speed at which it should move forwards.
    */
    moveForward: function (speed) ***REMOVED***

        var magnitude = this.world.pxmi(-speed);
        var angle = this.data.angle + Math.PI / 2;

        this.data.velocity[0] = magnitude * Math.cos(angle);
        this.data.velocity[1] = magnitude * Math.sin(angle);

    ***REMOVED***,

    /**
    * Moves the Body backwards based on its current angle and the given speed.
    * The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second (1000ms).
    *
    * @method Phaser.Physics.P2.Body#moveBackward
    * @param ***REMOVED***number***REMOVED*** speed - The speed at which it should move backwards.
    */
    moveBackward: function (speed) ***REMOVED***

        var magnitude = this.world.pxmi(-speed);
        var angle = this.data.angle + Math.PI / 2;

        this.data.velocity[0] = -(magnitude * Math.cos(angle));
        this.data.velocity[1] = -(magnitude * Math.sin(angle));

    ***REMOVED***,

    /**
    * Applies a force to the Body that causes it to 'thrust' forwards, based on its current angle and the given speed.
    * The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second (1000ms).
    *
    * @method Phaser.Physics.P2.Body#thrust
    * @param ***REMOVED***number***REMOVED*** speed - The speed at which it should thrust.
    */
    thrust: function (speed) ***REMOVED***

        var magnitude = this.world.pxmi(-speed);
        var angle = this.data.angle + Math.PI / 2;

        this.data.force[0] += magnitude * Math.cos(angle);
        this.data.force[1] += magnitude * Math.sin(angle);

    ***REMOVED***,

    /**
    * Applies a force to the Body that causes it to 'thrust' to the left, based on its current angle and the given speed.
    * The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second (1000ms).
    *
    * @method Phaser.Physics.P2.Body#thrustLeft
    * @param ***REMOVED***number***REMOVED*** speed - The speed at which it should move to the left.
    */
    thrustLeft: function (speed) ***REMOVED***

        var magnitude = this.world.pxmi(-speed);
        var angle = this.data.angle;

        this.data.force[0] += magnitude * Math.cos(angle);
        this.data.force[1] += magnitude * Math.sin(angle);

    ***REMOVED***,

    /**
    * Applies a force to the Body that causes it to 'thrust' to the right, based on its current angle and the given speed.
    * The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second (1000ms).
    *
    * @method Phaser.Physics.P2.Body#thrustRight
    * @param ***REMOVED***number***REMOVED*** speed - The speed at which it should move to the right.
    */
    thrustRight: function (speed) ***REMOVED***

        var magnitude = this.world.pxmi(-speed);
        var angle = this.data.angle;

        this.data.force[0] -= magnitude * Math.cos(angle);
        this.data.force[1] -= magnitude * Math.sin(angle);

    ***REMOVED***,

    /**
    * Applies a force to the Body that causes it to 'thrust' backwards (in reverse), based on its current angle and the given speed.
    * The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second (1000ms).
    *
    * @method Phaser.Physics.P2.Body#reverse
    * @param ***REMOVED***number***REMOVED*** speed - The speed at which it should reverse.
    */
    reverse: function (speed) ***REMOVED***

        var magnitude = this.world.pxmi(-speed);
        var angle = this.data.angle + Math.PI / 2;

        this.data.force[0] -= magnitude * Math.cos(angle);
        this.data.force[1] -= magnitude * Math.sin(angle);

    ***REMOVED***,

    /**
    * If this Body is dynamic then this will move it to the left by setting its x velocity to the given speed.
    * The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second (1000ms).
    *
    * @method Phaser.Physics.P2.Body#moveLeft
    * @param ***REMOVED***number***REMOVED*** speed - The speed at which it should move to the left, in pixels per second.
    */
    moveLeft: function (speed) ***REMOVED***

        this.data.velocity[0] = this.world.pxmi(-speed);

    ***REMOVED***,

    /**
    * If this Body is dynamic then this will move it to the right by setting its x velocity to the given speed.
    * The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second (1000ms).
    *
    * @method Phaser.Physics.P2.Body#moveRight
    * @param ***REMOVED***number***REMOVED*** speed - The speed at which it should move to the right, in pixels per second.
    */
    moveRight: function (speed) ***REMOVED***

        this.data.velocity[0] = this.world.pxmi(speed);

    ***REMOVED***,

    /**
    * If this Body is dynamic then this will move it up by setting its y velocity to the given speed.
    * The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second (1000ms).
    *
    * @method Phaser.Physics.P2.Body#moveUp
    * @param ***REMOVED***number***REMOVED*** speed - The speed at which it should move up, in pixels per second.
    */
    moveUp: function (speed) ***REMOVED***

        this.data.velocity[1] = this.world.pxmi(-speed);

    ***REMOVED***,

    /**
    * If this Body is dynamic then this will move it down by setting its y velocity to the given speed.
    * The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second (1000ms).
    *
    * @method Phaser.Physics.P2.Body#moveDown
    * @param ***REMOVED***number***REMOVED*** speed - The speed at which it should move down, in pixels per second.
    */
    moveDown: function (speed) ***REMOVED***

        this.data.velocity[1] = this.world.pxmi(speed);

    ***REMOVED***,

    /**
    * Internal method. This is called directly before the sprites are sent to the renderer and after the update function has finished.
    *
    * @method Phaser.Physics.P2.Body#preUpdate
    * @protected
    */
    preUpdate: function () ***REMOVED***

        this.dirty = true;

        if (this.removeNextStep)
        ***REMOVED***
            this.removeFromWorld();
            this.removeNextStep = false;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal method. This is called directly before the sprites are sent to the renderer and after the update function has finished.
    *
    * @method Phaser.Physics.P2.Body#postUpdate
    * @protected
    */
    postUpdate: function () ***REMOVED***

        this.sprite.x = this.world.mpxi(this.data.position[0]) + this.offset.x;
        this.sprite.y = this.world.mpxi(this.data.position[1]) + this.offset.y;

        if (!this.fixedRotation)
        ***REMOVED***
            this.sprite.rotation = this.data.angle;
        ***REMOVED***

        if (this.debugBody)
        ***REMOVED***
            this.debugBody.updateSpriteTransform();
        ***REMOVED***

        this.dirty = false;

    ***REMOVED***,

    /**
    * Resets the Body force, velocity (linear and angular) and rotation. Optionally resets damping and mass.
    *
    * @method Phaser.Physics.P2.Body#reset
    * @param ***REMOVED***number***REMOVED*** x - The new x position of the Body.
    * @param ***REMOVED***number***REMOVED*** y - The new x position of the Body.
    * @param ***REMOVED***boolean***REMOVED*** [resetDamping=false] - Resets the linear and angular damping.
    * @param ***REMOVED***boolean***REMOVED*** [resetMass=false] - Sets the Body mass back to 1.
    */
    reset: function (x, y, resetDamping, resetMass) ***REMOVED***

        if (resetDamping === undefined) ***REMOVED*** resetDamping = false; ***REMOVED***
        if (resetMass === undefined) ***REMOVED*** resetMass = false; ***REMOVED***

        this.setZeroForce();
        this.setZeroVelocity();
        this.setZeroRotation();

        if (resetDamping)
        ***REMOVED***
            this.setZeroDamping();
        ***REMOVED***

        if (resetMass)
        ***REMOVED***
            this.mass = 1;
        ***REMOVED***

        this.x = x;
        this.y = y;

    ***REMOVED***,

    /**
    * Adds this physics body to the world.
    *
    * @method Phaser.Physics.P2.Body#addToWorld
    */
    addToWorld: function () ***REMOVED***

        if (this.game.physics.p2._toRemove)
        ***REMOVED***
            for (var i = 0; i < this.game.physics.p2._toRemove.length; i++)
            ***REMOVED***
                if (this.game.physics.p2._toRemove[i] === this)
                ***REMOVED***
                    this.game.physics.p2._toRemove.splice(i, 1);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        if (this.data.world !== this.game.physics.p2.world)
        ***REMOVED***
            this.game.physics.p2.addBody(this);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Removes this physics body from the world.
    *
    * @method Phaser.Physics.P2.Body#removeFromWorld
    */
    removeFromWorld: function () ***REMOVED***

        if (this.data.world === this.game.physics.p2.world)
        ***REMOVED***
            this.game.physics.p2.removeBodyNextStep(this);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Destroys this Body and all references it holds to other objects.
    *
    * @method Phaser.Physics.P2.Body#destroy
    */
    destroy: function () ***REMOVED***

        this.removeFromWorld();

        this.clearShapes();

        this._bodyCallbacks = ***REMOVED******REMOVED***;
        this._bodyCallbackContext = ***REMOVED******REMOVED***;
        this._groupCallbacks = ***REMOVED******REMOVED***;
        this._groupCallbackContext = ***REMOVED******REMOVED***;

        if (this.debugBody)
        ***REMOVED***
            this.debugBody.destroy(true, true);
        ***REMOVED***

        this.debugBody = null;

        if (this.sprite)
        ***REMOVED***
            this.sprite.body = null;
            this.sprite = null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Removes all Shapes from this Body.
    *
    * @method Phaser.Physics.P2.Body#clearShapes
    */
    clearShapes: function () ***REMOVED***

        var i = this.data.shapes.length;

        while (i--)
        ***REMOVED***
            this.data.removeShape(this.data.shapes[i]);
        ***REMOVED***

        this.shapeChanged();

    ***REMOVED***,

    /**
    * Add a shape to the body. You can pass a local transform when adding a shape, so that the shape gets an offset and an angle relative to the body center of mass.
    * Will automatically update the mass properties and bounding radius.
    * If this Body had a previously set Collision Group you will need to re-apply it to the new Shape this creates.
    *
    * @method Phaser.Physics.P2.Body#addShape
    * @param ***REMOVED***p2.Shape***REMOVED*** shape - The shape to add to the body.
    * @param ***REMOVED***number***REMOVED*** [offsetX=0] - Local horizontal offset of the shape relative to the body center of mass.
    * @param ***REMOVED***number***REMOVED*** [offsetY=0] - Local vertical offset of the shape relative to the body center of mass.
    * @param ***REMOVED***number***REMOVED*** [rotation=0] - Local rotation of the shape relative to the body center of mass, specified in radians.
    * @return ***REMOVED***p2.Shape***REMOVED*** The shape that was added to the body.
    */
    addShape: function (shape, offsetX, offsetY, rotation) ***REMOVED***

        if (offsetX === undefined) ***REMOVED*** offsetX = 0; ***REMOVED***
        if (offsetY === undefined) ***REMOVED*** offsetY = 0; ***REMOVED***
        if (rotation === undefined) ***REMOVED*** rotation = 0; ***REMOVED***

        this.data.addShape(shape, [this.world.pxmi(offsetX), this.world.pxmi(offsetY)], rotation);
        this.shapeChanged();

        return shape;

    ***REMOVED***,

    /**
    * Adds a Circle shape to this Body. You can control the offset from the center of the body and the rotation.
    *
    * @method Phaser.Physics.P2.Body#addCircle
    * @param ***REMOVED***number***REMOVED*** radius - The radius of this circle (in pixels)
    * @param ***REMOVED***number***REMOVED*** [offsetX=0] - Local horizontal offset of the shape relative to the body center of mass.
    * @param ***REMOVED***number***REMOVED*** [offsetY=0] - Local vertical offset of the shape relative to the body center of mass.
    * @param ***REMOVED***number***REMOVED*** [rotation=0] - Local rotation of the shape relative to the body center of mass, specified in radians.
    * @return ***REMOVED***p2.Circle***REMOVED*** The Circle shape that was added to the Body.
    */
    addCircle: function (radius, offsetX, offsetY, rotation) ***REMOVED***

        var shape = new p2.Circle(***REMOVED*** radius: this.world.pxm(radius) ***REMOVED***);

        return this.addShape(shape, offsetX, offsetY, rotation);

    ***REMOVED***,

    /**
    * Adds a Rectangle shape to this Body. You can control the offset from the center of the body and the rotation.
    *
    * @method Phaser.Physics.P2.Body#addRectangle
    * @param ***REMOVED***number***REMOVED*** width - The width of the rectangle in pixels.
    * @param ***REMOVED***number***REMOVED*** height - The height of the rectangle in pixels.
    * @param ***REMOVED***number***REMOVED*** [offsetX=0] - Local horizontal offset of the shape relative to the body center of mass.
    * @param ***REMOVED***number***REMOVED*** [offsetY=0] - Local vertical offset of the shape relative to the body center of mass.
    * @param ***REMOVED***number***REMOVED*** [rotation=0] - Local rotation of the shape relative to the body center of mass, specified in radians.
    * @return ***REMOVED***p2.Box***REMOVED*** The shape that was added to the Body.
    */
    addRectangle: function (width, height, offsetX, offsetY, rotation) ***REMOVED***

        var shape = new p2.Box(***REMOVED*** width: this.world.pxm(width), height: this.world.pxm(height)***REMOVED***);

        return this.addShape(shape, offsetX, offsetY, rotation);

    ***REMOVED***,

    /**
    * Adds a Plane shape to this Body. The plane is facing in the Y direction. You can control the offset from the center of the body and the rotation.
    *
    * @method Phaser.Physics.P2.Body#addPlane
    * @param ***REMOVED***number***REMOVED*** [offsetX=0] - Local horizontal offset of the shape relative to the body center of mass.
    * @param ***REMOVED***number***REMOVED*** [offsetY=0] - Local vertical offset of the shape relative to the body center of mass.
    * @param ***REMOVED***number***REMOVED*** [rotation=0] - Local rotation of the shape relative to the body center of mass, specified in radians.
    * @return ***REMOVED***p2.Plane***REMOVED*** The Plane shape that was added to the Body.
    */
    addPlane: function (offsetX, offsetY, rotation) ***REMOVED***

        var shape = new p2.Plane();

        return this.addShape(shape, offsetX, offsetY, rotation);

    ***REMOVED***,

    /**
    * Adds a Particle shape to this Body. You can control the offset from the center of the body and the rotation.
    *
    * @method Phaser.Physics.P2.Body#addParticle
    * @param ***REMOVED***number***REMOVED*** [offsetX=0] - Local horizontal offset of the shape relative to the body center of mass.
    * @param ***REMOVED***number***REMOVED*** [offsetY=0] - Local vertical offset of the shape relative to the body center of mass.
    * @param ***REMOVED***number***REMOVED*** [rotation=0] - Local rotation of the shape relative to the body center of mass, specified in radians.
    * @return ***REMOVED***p2.Particle***REMOVED*** The Particle shape that was added to the Body.
    */
    addParticle: function (offsetX, offsetY, rotation) ***REMOVED***

        var shape = new p2.Particle();

        return this.addShape(shape, offsetX, offsetY, rotation);

    ***REMOVED***,

    /**
    * Adds a Line shape to this Body.
    * The line shape is along the x direction, and stretches from [-length/2, 0] to [length/2,0].
    * You can control the offset from the center of the body and the rotation.
    *
    * @method Phaser.Physics.P2.Body#addLine
    * @param ***REMOVED***number***REMOVED*** length - The length of this line (in pixels)
    * @param ***REMOVED***number***REMOVED*** [offsetX=0] - Local horizontal offset of the shape relative to the body center of mass.
    * @param ***REMOVED***number***REMOVED*** [offsetY=0] - Local vertical offset of the shape relative to the body center of mass.
    * @param ***REMOVED***number***REMOVED*** [rotation=0] - Local rotation of the shape relative to the body center of mass, specified in radians.
    * @return ***REMOVED***p2.Line***REMOVED*** The Line shape that was added to the Body.
    */
    addLine: function (length, offsetX, offsetY, rotation) ***REMOVED***

        var shape = new p2.Line(***REMOVED*** length: this.world.pxm(length)***REMOVED***);

        return this.addShape(shape, offsetX, offsetY, rotation);

    ***REMOVED***,

    /**
    * Adds a Capsule shape to this Body.
    * You can control the offset from the center of the body and the rotation.
    *
    * @method Phaser.Physics.P2.Body#addCapsule
    * @param ***REMOVED***number***REMOVED*** length - The distance between the end points in pixels.
    * @param ***REMOVED***number***REMOVED*** radius - Radius of the capsule in pixels.
    * @param ***REMOVED***number***REMOVED*** [offsetX=0] - Local horizontal offset of the shape relative to the body center of mass.
    * @param ***REMOVED***number***REMOVED*** [offsetY=0] - Local vertical offset of the shape relative to the body center of mass.
    * @param ***REMOVED***number***REMOVED*** [rotation=0] - Local rotation of the shape relative to the body center of mass, specified in radians.
    * @return ***REMOVED***p2.Capsule***REMOVED*** The Capsule shape that was added to the Body.
    */
    addCapsule: function (length, radius, offsetX, offsetY, rotation) ***REMOVED***

        var shape = new p2.Capsule(***REMOVED*** length: this.world.pxm(length), radius: this.world.pxm(radius) ***REMOVED***);

        return this.addShape(shape, offsetX, offsetY, rotation);

    ***REMOVED***,

    /**
    * Reads a polygon shape path, and assembles convex shapes from that and puts them at proper offset points. The shape must be simple and without holes.
    * This function expects the x.y values to be given in pixels. If you want to provide them at p2 world scales then call Body.data.fromPolygon directly.
    *
    * @method Phaser.Physics.P2.Body#addPolygon
    * @param ***REMOVED***object***REMOVED*** options - An object containing the build options:
    * @param ***REMOVED***boolean***REMOVED*** [options.optimalDecomp=false] - Set to true if you need optimal decomposition. Warning: very slow for polygons with more than 10 vertices.
    * @param ***REMOVED***boolean***REMOVED*** [options.skipSimpleCheck=false] - Set to true if you already know that the path is not intersecting itself.
    * @param ***REMOVED***boolean|number***REMOVED*** [options.removeCollinearPoints=false] - Set to a number (angle threshold value) to remove collinear points, or false to keep all points.
    * @param ***REMOVED***(number[]|...number)***REMOVED*** points - An array of 2d vectors that form the convex or concave polygon.
    *                                       Either [[0,0], [0,1],...] or a flat array of numbers that will be interpreted as [x,y, x,y, ...],
    *                                       or the arguments passed can be flat x,y values e.g. `setPolygon(options, x,y, x,y, x,y, ...)` where `x` and `y` are numbers.
    * @return ***REMOVED***boolean***REMOVED*** True on success, else false.
    */
    addPolygon: function (options, points) ***REMOVED***

        options = options || ***REMOVED******REMOVED***;

        if (!Array.isArray(points))
        ***REMOVED***
            points = Array.prototype.slice.call(arguments, 1);
        ***REMOVED***

        var path = [];

        //  Did they pass in a single array of points?
        if (points.length === 1 && Array.isArray(points[0]))
        ***REMOVED***
            path = points[0].slice(0);
        ***REMOVED***
        else if (Array.isArray(points[0]))
        ***REMOVED***
            path = points.slice();
        ***REMOVED***
        else if (typeof points[0] === 'number')
        ***REMOVED***
            //  We've a list of numbers
            for (var i = 0, len = points.length; i < len; i += 2)
            ***REMOVED***
                path.push([points[i], points[i + 1]]);
            ***REMOVED***
        ***REMOVED***

        //  top and tail
        var idx = path.length - 1;

        if (path[idx][0] === path[0][0] && path[idx][1] === path[0][1])
        ***REMOVED***
            path.pop();
        ***REMOVED***

        //  Now process them into p2 values
        for (var p = 0; p < path.length; p++)
        ***REMOVED***
            path[p][0] = this.world.pxmi(path[p][0]);
            path[p][1] = this.world.pxmi(path[p][1]);
        ***REMOVED***

        var result = this.data.fromPolygon(path, options);

        this.shapeChanged();

        return result;

    ***REMOVED***,

    /**
    * Remove a shape from the body. Will automatically update the mass properties and bounding radius.
    *
    * @method Phaser.Physics.P2.Body#removeShape
    * @param ***REMOVED***p2.Circle|p2.Rectangle|p2.Plane|p2.Line|p2.Particle***REMOVED*** shape - The shape to remove from the body.
    * @return ***REMOVED***boolean***REMOVED*** True if the shape was found and removed, else false.
    */
    removeShape: function (shape) ***REMOVED***

		var result = this.data.removeShape(shape);

		this.shapeChanged();

        return result;
    ***REMOVED***,

    /**
    * Clears any previously set shapes. Then creates a new Circle shape and adds it to this Body.
    * If this Body had a previously set Collision Group you will need to re-apply it to the new Shape this creates.
    *
    * @method Phaser.Physics.P2.Body#setCircle
    * @param ***REMOVED***number***REMOVED*** radius - The radius of this circle (in pixels)
    * @param ***REMOVED***number***REMOVED*** [offsetX=0] - Local horizontal offset of the shape relative to the body center of mass.
    * @param ***REMOVED***number***REMOVED*** [offsetY=0] - Local vertical offset of the shape relative to the body center of mass.
    * @param ***REMOVED***number***REMOVED*** [rotation=0] - Local rotation of the shape relative to the body center of mass, specified in radians.
    */
    setCircle: function (radius, offsetX, offsetY, rotation) ***REMOVED***

        this.clearShapes();

        return this.addCircle(radius, offsetX, offsetY, rotation);

    ***REMOVED***,

    /**
    * Clears any previously set shapes. The creates a new Rectangle shape at the given size and offset, and adds it to this Body.
    * If you wish to create a Rectangle to match the size of a Sprite or Image see Body.setRectangleFromSprite.
    * If this Body had a previously set Collision Group you will need to re-apply it to the new Shape this creates.
    *
    * @method Phaser.Physics.P2.Body#setRectangle
    * @param ***REMOVED***number***REMOVED*** [width=16] - The width of the rectangle in pixels.
    * @param ***REMOVED***number***REMOVED*** [height=16] - The height of the rectangle in pixels.
    * @param ***REMOVED***number***REMOVED*** [offsetX=0] - Local horizontal offset of the shape relative to the body center of mass.
    * @param ***REMOVED***number***REMOVED*** [offsetY=0] - Local vertical offset of the shape relative to the body center of mass.
    * @param ***REMOVED***number***REMOVED*** [rotation=0] - Local rotation of the shape relative to the body center of mass, specified in radians.
    * @return ***REMOVED***p2.Rectangle***REMOVED*** The Rectangle shape that was added to the Body.
    */
    setRectangle: function (width, height, offsetX, offsetY, rotation) ***REMOVED***

        if (width === undefined) ***REMOVED*** width = 16; ***REMOVED***
        if (height === undefined) ***REMOVED*** height = 16; ***REMOVED***

        this.clearShapes();

        return this.addRectangle(width, height, offsetX, offsetY, rotation);

    ***REMOVED***,

    /**
    * Clears any previously set shapes.
    * Then creates a Rectangle shape sized to match the dimensions and orientation of the Sprite given.
    * If no Sprite is given it defaults to using the parent of this Body.
    * If this Body had a previously set Collision Group you will need to re-apply it to the new Shape this creates.
    *
    * @method Phaser.Physics.P2.Body#setRectangleFromSprite
    * @param ***REMOVED***Phaser.Sprite|Phaser.Image***REMOVED*** [sprite] - The Sprite on which the Rectangle will get its dimensions.
    * @return ***REMOVED***p2.Rectangle***REMOVED*** The Rectangle shape that was added to the Body.
    */
    setRectangleFromSprite: function (sprite) ***REMOVED***

        if (sprite === undefined) ***REMOVED*** sprite = this.sprite; ***REMOVED***

        this.clearShapes();

        return this.addRectangle(sprite.width, sprite.height, 0, 0, sprite.rotation);

    ***REMOVED***,

    /**
    * Adds the given Material to all Shapes that belong to this Body.
    * If you only wish to apply it to a specific Shape in this Body then provide that as the 2nd parameter.
    *
    * @method Phaser.Physics.P2.Body#setMaterial
    * @param ***REMOVED***Phaser.Physics.P2.Material***REMOVED*** material - The Material that will be applied.
    * @param ***REMOVED***p2.Shape***REMOVED*** [shape] - An optional Shape. If not provided the Material will be added to all Shapes in this Body.
    */
    setMaterial: function (material, shape) ***REMOVED***

        if (shape === undefined)
        ***REMOVED***
            for (var i = this.data.shapes.length - 1; i >= 0; i--)
            ***REMOVED***
                this.data.shapes[i].material = material;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            shape.material = material;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Updates the debug draw if any body shapes change.
    *
    * @method Phaser.Physics.P2.Body#shapeChanged
    */
    shapeChanged: function() ***REMOVED***

        if (this.debugBody)
        ***REMOVED***
            this.debugBody.draw();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Reads the shape data from a physics data file stored in the Game.Cache and adds it as a polygon to this Body.
    * The shape data format is based on the output of the
    * ***REMOVED***@link https://github.com/photonstorm/phaser/tree/master/resources/PhysicsEditor%20Exporter|custom phaser exporter***REMOVED*** for
    * ***REMOVED***@link https://www.codeandweb.com/physicseditor|PhysicsEditor***REMOVED***
    *
    * @method Phaser.Physics.P2.Body#addPhaserPolygon
    * @param ***REMOVED***string***REMOVED*** key - The key of the Physics Data file as stored in Game.Cache.
    * @param ***REMOVED***string***REMOVED*** object - The key of the object within the Physics data file that you wish to load the shape data from.
    * @returns ***REMOVED***Array***REMOVED*** A list of created fixtures to be used with Phaser.Physics.P2.FixtureList
    */
    addPhaserPolygon: function (key, object) ***REMOVED***

        var data = this.game.cache.getPhysicsData(key, object);
        var createdFixtures = [];

        //  Cycle through the fixtures
        for (var i = 0; i < data.length; i++)
        ***REMOVED***
            var fixtureData = data[i];
            var shapesOfFixture = this.addFixture(fixtureData);

            //  Always add to a group
            createdFixtures[fixtureData.filter.group] = createdFixtures[fixtureData.filter.group] || [];
            createdFixtures[fixtureData.filter.group] = createdFixtures[fixtureData.filter.group].concat(shapesOfFixture);

            //  if (unique) fixture key is provided
            if (fixtureData.fixtureKey)
            ***REMOVED***
                createdFixtures[fixtureData.fixtureKey] = shapesOfFixture;
            ***REMOVED***
        ***REMOVED***

        this.data.aabbNeedsUpdate = true;
        this.shapeChanged();

        return createdFixtures;

    ***REMOVED***,

    /**
    * Add a polygon fixture. This is used during #loadPolygon.
    *
    * @method Phaser.Physics.P2.Body#addFixture
    * @param ***REMOVED***string***REMOVED*** fixtureData - The data for the fixture. It contains: isSensor, filter (collision) and the actual polygon shapes.
    * @return ***REMOVED***array***REMOVED*** An array containing the generated shapes for the given polygon.
    */
    addFixture: function (fixtureData) ***REMOVED***

        var generatedShapes = [];

        if (fixtureData.circle)
        ***REMOVED***
            var shape = new p2.Circle(***REMOVED*** radius: this.world.pxm(fixtureData.circle.radius) ***REMOVED***);
            shape.collisionGroup = fixtureData.filter.categoryBits;
            shape.collisionMask = fixtureData.filter.maskBits;
            shape.sensor = fixtureData.isSensor;

            var offset = p2.vec2.create();
            offset[0] = this.world.pxmi(fixtureData.circle.position[0] - this.sprite.width/2);
            offset[1] = this.world.pxmi(fixtureData.circle.position[1] - this.sprite.height/2);

            this.data.addShape(shape, offset);
            generatedShapes.push(shape);
        ***REMOVED***
        else
        ***REMOVED***
            var polygons = fixtureData.polygons;
            var cm = p2.vec2.create();

            for (var i = 0; i < polygons.length; i++)
            ***REMOVED***
                var shapes = polygons[i];
                var vertices = [];

                for (var s = 0; s < shapes.length; s += 2)
                ***REMOVED***
                    vertices.push([ this.world.pxmi(shapes[s]), this.world.pxmi(shapes[s + 1]) ]);
                ***REMOVED***

                var shape = new p2.Convex(***REMOVED*** vertices: vertices ***REMOVED***);

                //  Move all vertices so its center of mass is in the local center of the convex
                for (var j = 0; j !== shape.vertices.length; j++)
                ***REMOVED***
                    var v = shape.vertices[j];
                    p2.vec2.sub(v, v, shape.centerOfMass);
                ***REMOVED***

                p2.vec2.scale(cm, shape.centerOfMass, 1);

                cm[0] -= this.world.pxmi(this.sprite.width / 2);
                cm[1] -= this.world.pxmi(this.sprite.height / 2);

                shape.updateTriangles();
                shape.updateCenterOfMass();
                shape.updateBoundingRadius();

                shape.collisionGroup = fixtureData.filter.categoryBits;
                shape.collisionMask = fixtureData.filter.maskBits;
                shape.sensor = fixtureData.isSensor;

                this.data.addShape(shape, cm);

                generatedShapes.push(shape);
            ***REMOVED***
        ***REMOVED***

        return generatedShapes;

    ***REMOVED***,

    /**
    * Reads the shape data from a physics data file stored in the Game.Cache and adds it as a polygon to this Body.
    * 
    * As well as reading the data from the Cache you can also pass `null` as the first argument and a
    * physics data object as the second. When doing this you must ensure the structure of the object is correct in advance.
    * 
    * For more details see the format of the Lime / Corona Physics Editor export.
    *
    * @method Phaser.Physics.P2.Body#loadPolygon
    * @param ***REMOVED***string***REMOVED*** key - The key of the Physics Data file as stored in Game.Cache. Alternatively set to `null` and pass the 
    *     data as the 2nd argument.
    * @param ***REMOVED***string|object***REMOVED*** object - The key of the object within the Physics data file that you wish to load the shape data from, 
    *     or if key is null pass the actual physics data object itself as this parameter.
    * @return ***REMOVED***boolean***REMOVED*** True on success, else false.
    */
    loadPolygon: function (key, object) ***REMOVED***

        if (key === null)
        ***REMOVED***
            var data = object;
        ***REMOVED***
        else
        ***REMOVED***
            var data = this.game.cache.getPhysicsData(key, object);
        ***REMOVED***

        //  We've multiple Convex shapes, they should be CCW automatically
        var cm = p2.vec2.create();

        for (var i = 0; i < data.length; i++)
        ***REMOVED***
            var vertices = [];

            for (var s = 0; s < data[i].shape.length; s += 2)
            ***REMOVED***
                vertices.push([ this.world.pxmi(data[i].shape[s]), this.world.pxmi(data[i].shape[s + 1]) ]);
            ***REMOVED***

            var c = new p2.Convex(***REMOVED*** vertices: vertices ***REMOVED***);

            // Move all vertices so its center of mass is in the local center of the convex
            for (var j = 0; j !== c.vertices.length; j++)
            ***REMOVED***
                var v = c.vertices[j];
                p2.vec2.sub(v, v, c.centerOfMass);
            ***REMOVED***

            p2.vec2.scale(cm, c.centerOfMass, 1);

            cm[0] -= this.world.pxmi(this.sprite.width / 2);
            cm[1] -= this.world.pxmi(this.sprite.height / 2);

            c.updateTriangles();
            c.updateCenterOfMass();
            c.updateBoundingRadius();

            this.data.addShape(c, cm);
        ***REMOVED***

        this.data.aabbNeedsUpdate = true;
        this.shapeChanged();

        return true;

    ***REMOVED***

***REMOVED***;

Phaser.Physics.P2.Body.prototype.constructor = Phaser.Physics.P2.Body;

/**
 * Dynamic body. Dynamic bodies body can move and respond to collisions and forces.
 * @property DYNAMIC
 * @type ***REMOVED***Number***REMOVED***
 * @static
 */
Phaser.Physics.P2.Body.DYNAMIC = 1;

/**
 * Static body. Static bodies do not move, and they do not respond to forces or collision.
 * @property STATIC
 * @type ***REMOVED***Number***REMOVED***
 * @static
 */
Phaser.Physics.P2.Body.STATIC = 2;

/**
 * Kinematic body. Kinematic bodies only moves according to its .velocity, and does not respond to collisions or force.
 * @property KINEMATIC
 * @type ***REMOVED***Number***REMOVED***
 * @static
 */
Phaser.Physics.P2.Body.KINEMATIC = 4;

/**
* @name Phaser.Physics.P2.Body#static
* @property ***REMOVED***boolean***REMOVED*** static - Returns true if the Body is static. Setting Body.static to 'false' will make it dynamic.
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "static", ***REMOVED***

    get: function () ***REMOVED***

        return (this.data.type === Phaser.Physics.P2.Body.STATIC);

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value && this.data.type !== Phaser.Physics.P2.Body.STATIC)
        ***REMOVED***
            this.data.type = Phaser.Physics.P2.Body.STATIC;
            this.mass = 0;
        ***REMOVED***
        else if (!value && this.data.type === Phaser.Physics.P2.Body.STATIC)
        ***REMOVED***
            this.data.type = Phaser.Physics.P2.Body.DYNAMIC;
            this.mass = 1;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.Body#dynamic
* @property ***REMOVED***boolean***REMOVED*** dynamic - Returns true if the Body is dynamic. Setting Body.dynamic to 'false' will make it static.
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "dynamic", ***REMOVED***

    get: function () ***REMOVED***

        return (this.data.type === Phaser.Physics.P2.Body.DYNAMIC);

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value && this.data.type !== Phaser.Physics.P2.Body.DYNAMIC)
        ***REMOVED***
            this.data.type = Phaser.Physics.P2.Body.DYNAMIC;
            this.mass = 1;
        ***REMOVED***
        else if (!value && this.data.type === Phaser.Physics.P2.Body.DYNAMIC)
        ***REMOVED***
            this.data.type = Phaser.Physics.P2.Body.STATIC;
            this.mass = 0;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.Body#kinematic
* @property ***REMOVED***boolean***REMOVED*** kinematic - Returns true if the Body is kinematic. Setting Body.kinematic to 'false' will make it static.
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "kinematic", ***REMOVED***

    get: function () ***REMOVED***

        return (this.data.type === Phaser.Physics.P2.Body.KINEMATIC);

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value && this.data.type !== Phaser.Physics.P2.Body.KINEMATIC)
        ***REMOVED***
            this.data.type = Phaser.Physics.P2.Body.KINEMATIC;
            this.mass = 4;
        ***REMOVED***
        else if (!value && this.data.type === Phaser.Physics.P2.Body.KINEMATIC)
        ***REMOVED***
            this.data.type = Phaser.Physics.P2.Body.STATIC;
            this.mass = 0;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.Body#allowSleep
* @property ***REMOVED***boolean***REMOVED*** allowSleep -
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "allowSleep", ***REMOVED***

    get: function () ***REMOVED***

        return this.data.allowSleep;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value !== this.data.allowSleep)
        ***REMOVED***
            this.data.allowSleep = value;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* The angle of the Body in degrees from its original orientation. Values from 0 to 180 represent clockwise rotation; values from 0 to -180 represent counterclockwise rotation.
* Values outside this range are added to or subtracted from 360 to obtain a value within the range. For example, the statement Body.angle = 450 is the same as Body.angle = 90.
* If you wish to work in radians instead of degrees use the property Body.rotation instead. Working in radians is faster as it doesn't have to convert values.
*
* @name Phaser.Physics.P2.Body#angle
* @property ***REMOVED***number***REMOVED*** angle - The angle of this Body in degrees.
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "angle", ***REMOVED***

    get: function() ***REMOVED***

        return Phaser.Math.wrapAngle(Phaser.Math.radToDeg(this.data.angle));

    ***REMOVED***,

    set: function(value) ***REMOVED***

        this.data.angle = Phaser.Math.degToRad(Phaser.Math.wrapAngle(value));

    ***REMOVED***

***REMOVED***);

/**
* Damping is specified as a value between 0 and 1, which is the proportion of velocity lost per second.
* @name Phaser.Physics.P2.Body#angularDamping
* @property ***REMOVED***number***REMOVED*** angularDamping - The angular damping acting acting on the body.
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "angularDamping", ***REMOVED***

    get: function () ***REMOVED***

        return this.data.angularDamping;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.data.angularDamping = value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.Body#angularForce
* @property ***REMOVED***number***REMOVED*** angularForce - The angular force acting on the body.
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "angularForce", ***REMOVED***

    get: function () ***REMOVED***

        return this.data.angularForce;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.data.angularForce = value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.Body#angularVelocity
* @property ***REMOVED***number***REMOVED*** angularVelocity - The angular velocity of the body.
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "angularVelocity", ***REMOVED***

    get: function () ***REMOVED***

        return this.data.angularVelocity;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.data.angularVelocity = value;

    ***REMOVED***

***REMOVED***);

/**
* Damping is specified as a value between 0 and 1, which is the proportion of velocity lost per second.
* @name Phaser.Physics.P2.Body#damping
* @property ***REMOVED***number***REMOVED*** damping - The linear damping acting on the body in the velocity direction.
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "damping", ***REMOVED***

    get: function () ***REMOVED***

        return this.data.damping;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.data.damping = value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.Body#fixedRotation
* @property ***REMOVED***boolean***REMOVED*** fixedRotation -
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "fixedRotation", ***REMOVED***

    get: function () ***REMOVED***

        return this.data.fixedRotation;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value !== this.data.fixedRotation)
        ***REMOVED***
            this.data.fixedRotation = value;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.Body#inertia
* @property ***REMOVED***number***REMOVED*** inertia - The inertia of the body around the Z axis..
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "inertia", ***REMOVED***

    get: function () ***REMOVED***

        return this.data.inertia;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.data.inertia = value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.Body#mass
* @property ***REMOVED***number***REMOVED*** mass - The mass of the body.
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "mass", ***REMOVED***

    get: function () ***REMOVED***

        return this.data.mass;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value !== this.data.mass)
        ***REMOVED***
            this.data.mass = value;
            this.data.updateMassProperties();
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.Body#motionState
* @property ***REMOVED***number***REMOVED*** motionState - The type of motion this body has. Should be one of: Body.STATIC (the body does not move), Body.DYNAMIC (body can move and respond to collisions) and Body.KINEMATIC (only moves according to its .velocity).
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "motionState", ***REMOVED***

    get: function () ***REMOVED***

        return this.data.type;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value !== this.data.type)
        ***REMOVED***
            this.data.type = value;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* The angle of the Body in radians.
* If you wish to work in degrees instead of radians use the Body.angle property instead. Working in radians is faster as it doesn't have to convert values.
*
* @name Phaser.Physics.P2.Body#rotation
* @property ***REMOVED***number***REMOVED*** rotation - The angle of this Body in radians.
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "rotation", ***REMOVED***

    get: function() ***REMOVED***

        return this.data.angle;

    ***REMOVED***,

    set: function(value) ***REMOVED***

        this.data.angle = value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.Body#sleepSpeedLimit
* @property ***REMOVED***number***REMOVED*** sleepSpeedLimit - .
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "sleepSpeedLimit", ***REMOVED***

    get: function () ***REMOVED***

        return this.data.sleepSpeedLimit;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.data.sleepSpeedLimit = value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.Body#x
* @property ***REMOVED***number***REMOVED*** x - The x coordinate of this Body.
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "x", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.mpxi(this.data.position[0]);

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.data.position[0] = this.world.pxmi(value);

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.Body#y
* @property ***REMOVED***number***REMOVED*** y - The y coordinate of this Body.
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "y", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.mpxi(this.data.position[1]);

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.data.position[1] = this.world.pxmi(value);

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.Body#id
* @property ***REMOVED***number***REMOVED*** id - The Body ID. Each Body that has been added to the World has a unique ID.
* @readonly
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "id", ***REMOVED***

    get: function () ***REMOVED***

        return this.data.id;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.Body#debug
* @property ***REMOVED***boolean***REMOVED*** debug - Enable or disable debug drawing of this body
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "debug", ***REMOVED***

    get: function () ***REMOVED***

        return (this.debugBody !== null);

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value && !this.debugBody)
        ***REMOVED***
            //  This will be added to the global space
            this.debugBody = new Phaser.Physics.P2.BodyDebug(this.game, this.data);
        ***REMOVED***
        else if (!value && this.debugBody)
        ***REMOVED***
            this.debugBody.destroy();
            this.debugBody = null;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* A Body can be set to collide against the World bounds automatically if this is set to true. Otherwise it will leave the World.
* Note that this only applies if your World has bounds! The response to the collision should be managed via CollisionMaterials.
* Also note that when you set this it will only effect Body shapes that already exist. If you then add further shapes to your Body
* after setting this it will *not* proactively set them to collide with the bounds.
*
* @name Phaser.Physics.P2.Body#collideWorldBounds
* @property ***REMOVED***boolean***REMOVED*** collideWorldBounds - Should the Body collide with the World bounds?
*/
Object.defineProperty(Phaser.Physics.P2.Body.prototype, "collideWorldBounds", ***REMOVED***

    get: function () ***REMOVED***

        return this._collideWorldBounds;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value && !this._collideWorldBounds)
        ***REMOVED***
            this._collideWorldBounds = true;
            this.updateCollisionMask();
        ***REMOVED***
        else if (!value && this._collideWorldBounds)
        ***REMOVED***
            this._collideWorldBounds = false;
            this.updateCollisionMask();
        ***REMOVED***

    ***REMOVED***

***REMOVED***);
