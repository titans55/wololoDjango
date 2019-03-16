/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

//  Add an extra properties to p2 that we need
p2.Body.prototype.parent = null;
p2.Spring.prototype.parent = null;

/**
* This is your main access to the P2 Physics World.
* From here you can create materials, listen for events and add bodies into the physics simulation.
* 
* @class Phaser.Physics.P2
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Reference to the current game instance.
* @param ***REMOVED***object***REMOVED*** [config] - Physics configuration object passed in from the game constructor.
*/
Phaser.Physics.P2 = function (game, config) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = game;

    if (config === undefined)
    ***REMOVED***
        config = ***REMOVED*** gravity: [0, 0], broadphase: new p2.SAPBroadphase() ***REMOVED***;
    ***REMOVED***
    else
    ***REMOVED***
        if (!config.hasOwnProperty('gravity'))
        ***REMOVED***
            config.gravity = [0, 0];
        ***REMOVED***

        if (!config.hasOwnProperty('broadphase'))
        ***REMOVED***
            config.broadphase = new p2.SAPBroadphase();
        ***REMOVED***
    ***REMOVED***

    /**
    * @property ***REMOVED***object***REMOVED*** config - The p2 World configuration object.
    * @protected
    */
    this.config = config;

    /**
    * @property ***REMOVED***p2.World***REMOVED*** world - The p2 World in which the simulation is run.
    * @protected
    */
    this.world = new p2.World(this.config);

    /**
    * @property ***REMOVED***number***REMOVED*** frameRate - The frame rate the world will be stepped at. Defaults to 1 / 60, but you can change here. Also see useElapsedTime property.
    * @default
    */
    this.frameRate = 1 / 60;

    /**
    * @property ***REMOVED***boolean***REMOVED*** useElapsedTime - If true the frameRate value will be ignored and instead p2 will step with the value of Game.Time.physicsElapsed, which is a delta time value.
    * @default
    */
    this.useElapsedTime = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** paused - The paused state of the P2 World.
    * @default
    */
    this.paused = false;

    /**
    * @property ***REMOVED***array<Phaser.Physics.P2.Material>***REMOVED*** materials - A local array of all created Materials.
    * @protected
    */
    this.materials = [];

    /**
    * @property ***REMOVED***Phaser.Physics.P2.InversePointProxy***REMOVED*** gravity - The gravity applied to all bodies each step.
    */
    this.gravity = new Phaser.Physics.P2.InversePointProxy(this, this.world.gravity);

    /**
    * @property ***REMOVED***object***REMOVED*** walls - An object containing the 4 wall bodies that bound the physics world.
    */
    this.walls = ***REMOVED*** left: null, right: null, top: null, bottom: null ***REMOVED***;

    /**
    * This signal is dispatched when a new Body is added to the World.
    *
    * It sends 1 argument: `body` which is the `Phaser.Physics.P2.Body` that was added to the world.
    * 
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onBodyAdded
    */
    this.onBodyAdded = new Phaser.Signal();

    /**
    * This signal is dispatched when a Body is removed to the World.
    *
    * It sends 1 argument: `body` which is the `Phaser.Physics.P2.Body` that was removed from the world.
    * 
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onBodyRemoved
    */
    this.onBodyRemoved = new Phaser.Signal();

    /**
    * This signal is dispatched when a Spring is added to the World.
    *
    * It sends 1 argument: `spring` which is either a `Phaser.Physics.P2.Spring`, `p2.LinearSpring` or `p2.RotationalSpring` that was added to the world.
    * 
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onSpringAdded
    */
    this.onSpringAdded = new Phaser.Signal();

    /**
    * This signal is dispatched when a Spring is removed from the World.
    *
    * It sends 1 argument: `spring` which is either a `Phaser.Physics.P2.Spring`, `p2.LinearSpring` or `p2.RotationalSpring` that was removed from the world.
    * 
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onSpringRemoved
    */
    this.onSpringRemoved = new Phaser.Signal();

    /**
    * This signal is dispatched when a Constraint is added to the World.
    *
    * It sends 1 argument: `constraint` which is the `Phaser.Physics.P2.Constraint` that was added to the world.
    * 
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onConstraintAdded
    */
    this.onConstraintAdded = new Phaser.Signal();

    /**
    * This signal is dispatched when a Constraint is removed from the World.
    *
    * It sends 1 argument: `constraint` which is the `Phaser.Physics.P2.Constraint` that was removed from the world.
    * 
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onConstraintRemoved
    */
    this.onConstraintRemoved = new Phaser.Signal();

    /**
    * This signal is dispatched when a Contact Material is added to the World.
    *
    * It sends 1 argument: `material` which is the `Phaser.Physics.P2.ContactMaterial` that was added to the world.
    * 
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onContactMaterialAdded
    */
    this.onContactMaterialAdded = new Phaser.Signal();

    /**
    * This signal is dispatched when a Contact Material is removed from the World.
    *
    * It sends 1 argument: `material` which is the `Phaser.Physics.P2.ContactMaterial` that was removed from the world.
    * 
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onContactMaterialRemoved
    */
    this.onContactMaterialRemoved = new Phaser.Signal();

    /**
    * @property ***REMOVED***function***REMOVED*** postBroadphaseCallback - A postBroadphase callback.
    */
    this.postBroadphaseCallback = null;

    /**
    * @property ***REMOVED***object***REMOVED*** callbackContext - The context under which the callbacks are fired.
    */
    this.callbackContext = null;

    /**
    * This Signal is dispatched when a first contact is created between two bodies. This happens *before* the step has been done.
    * 
    * It sends 5 arguments: `bodyA`, `bodyB`, `shapeA`, `shapeB` and `contactEquations`.
    * 
    * It is possible that in certain situations the `bodyA` or `bodyB` values are `null`. You should check for this
    * in your own code to avoid processing potentially null physics bodies.
    * 
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onBeginContact
    */
    this.onBeginContact = new Phaser.Signal();

    /**
    * This Signal is dispatched when final contact occurs between two bodies. This happens *before* the step has been done.
    * 
    * It sends 4 arguments: `bodyA`, `bodyB`, `shapeA` and `shapeB`.
    * 
    * It is possible that in certain situations the `bodyA` or `bodyB` values are `null`. You should check for this
    * in your own code to avoid processing potentially null physics bodies.
    * 
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onEndContact
    */
    this.onEndContact = new Phaser.Signal();

    //  Pixel to meter function overrides
    if (config.hasOwnProperty('mpx') && config.hasOwnProperty('pxm') && config.hasOwnProperty('mpxi') && config.hasOwnProperty('pxmi'))
    ***REMOVED***
        this.mpx = config.mpx;
        this.mpxi = config.mpxi;
        this.pxm = config.pxm;
        this.pxmi = config.pxmi;
    ***REMOVED***

    //  Hook into the World events
    this.world.on("beginContact", this.beginContactHandler, this);
    this.world.on("endContact", this.endContactHandler, this);

    /**
    * @property ***REMOVED***array***REMOVED*** collisionGroups - An array containing the collision groups that have been defined in the World.
    */
    this.collisionGroups = [];

    /**
    * @property ***REMOVED***Phaser.Physics.P2.CollisionGroup***REMOVED*** nothingCollisionGroup - A default collision group.
    */
    this.nothingCollisionGroup = new Phaser.Physics.P2.CollisionGroup(1);

    /**
    * @property ***REMOVED***Phaser.Physics.P2.CollisionGroup***REMOVED*** boundsCollisionGroup - A default collision group.
    */
    this.boundsCollisionGroup = new Phaser.Physics.P2.CollisionGroup(2);

    /**
    * @property ***REMOVED***Phaser.Physics.P2.CollisionGroup***REMOVED*** everythingCollisionGroup - A default collision group.
    */
    this.everythingCollisionGroup = new Phaser.Physics.P2.CollisionGroup(2147483648);

    /**
    * @property ***REMOVED***array***REMOVED*** boundsCollidesWith - An array of the bodies the world bounds collides with.
    */
    this.boundsCollidesWith = [];

    /**
    * @property ***REMOVED***array***REMOVED*** _toRemove - Internal var used to hold references to bodies to remove from the world on the next step.
    * @private
    */
    this._toRemove = [];

    /**
    * @property ***REMOVED***number***REMOVED*** _collisionGroupID - Internal var.
    * @private
    */
    this._collisionGroupID = 2;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _boundsLeft - Internal var that keeps track of world bounds settings.
    * @private
    */
    this._boundsLeft = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _boundsRight - Internal var that keeps track of world bounds settings.
    * @private
    */
    this._boundsRight = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _boundsTop - Internal var that keeps track of world bounds settings.
    * @private
    */
    this._boundsTop = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _boundsBottom - Internal var that keeps track of world bounds settings.
    * @private
    */
    this._boundsBottom = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _boundsOwnGroup - Internal var that keeps track of world bounds settings.
    * @private
    */
    this._boundsOwnGroup = false;

    //  By default we want everything colliding with everything
    this.setBoundsToWorld(true, true, true, true, false);

***REMOVED***;

Phaser.Physics.P2.prototype = ***REMOVED***

    /**
    * This will add a P2 Physics body into the removal list for the next step.
    *
    * @method Phaser.Physics.P2#removeBodyNextStep
    * @param ***REMOVED***Phaser.Physics.P2.Body***REMOVED*** body - The body to remove at the start of the next step.
    */
    removeBodyNextStep: function (body) ***REMOVED***

        this._toRemove.push(body);

    ***REMOVED***,

    /**
    * Called at the start of the core update loop. Purges flagged bodies from the world.
    *
    * @method Phaser.Physics.P2#preUpdate
    */
    preUpdate: function () ***REMOVED***

        var i = this._toRemove.length;

        while (i--)
        ***REMOVED***
            this.removeBody(this._toRemove[i]);
        ***REMOVED***

        this._toRemove.length = 0;

    ***REMOVED***,

    /**
    * This will create a P2 Physics body on the given game object or array of game objects.
    * A game object can only have 1 physics body active at any one time, and it can't be changed until the object is destroyed.
    * Note: When the game object is enabled for P2 physics it has its anchor x/y set to 0.5 so it becomes centered.
    *
    * @method Phaser.Physics.P2#enable
    * @param ***REMOVED***object|array|Phaser.Group***REMOVED*** object - The game object to create the physics body on. Can also be an array or Group of objects, a body will be created on every child that has a `body` property.
    * @param ***REMOVED***boolean***REMOVED*** [debug=false] - Create a debug object to go with this body?
    * @param ***REMOVED***boolean***REMOVED*** [children=true] - Should a body be created on all children of this object? If true it will recurse down the display list as far as it can go.
    */
    enable: function (object, debug, children) ***REMOVED***

        if (debug === undefined) ***REMOVED*** debug = false; ***REMOVED***
        if (children === undefined) ***REMOVED*** children = true; ***REMOVED***

        var i = 1;

        if (Array.isArray(object))
        ***REMOVED***
            i = object.length;

            while (i--)
            ***REMOVED***
                if (object[i] instanceof Phaser.Group)
                ***REMOVED***
                    //  If it's a Group then we do it on the children regardless
                    this.enable(object[i].children, debug, children);
                ***REMOVED***
                else
                ***REMOVED***
                    this.enableBody(object[i], debug);

                    if (children && object[i].hasOwnProperty('children') && object[i].children.length > 0)
                    ***REMOVED***
                        this.enable(object[i], debug, true);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (object instanceof Phaser.Group)
            ***REMOVED***
                //  If it's a Group then we do it on the children regardless
                this.enable(object.children, debug, children);
            ***REMOVED***
            else
            ***REMOVED***
                this.enableBody(object, debug);

                if (children && object.hasOwnProperty('children') && object.children.length > 0)
                ***REMOVED***
                    this.enable(object.children, debug, true);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Creates a P2 Physics body on the given game object.
    * A game object can only have 1 physics body active at any one time, and it can't be changed until the body is nulled.
    *
    * @method Phaser.Physics.P2#enableBody
    * @param ***REMOVED***object***REMOVED*** object - The game object to create the physics body on. A body will only be created if this object has a null `body` property.
    * @param ***REMOVED***boolean***REMOVED*** debug - Create a debug object to go with this body?
    */
    enableBody: function (object, debug) ***REMOVED***

        if (object.hasOwnProperty('body') && object.body === null)
        ***REMOVED***
            object.body = new Phaser.Physics.P2.Body(this.game, object, object.x, object.y, 1);
            object.body.debug = debug;
			if (typeof object.anchor !== 'undefined') ***REMOVED***
				object.anchor.set(0.5);
			***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Impact event handling is disabled by default. Enable it before any impact events will be dispatched.
    * In a busy world hundreds of impact events can be generated every step, so only enable this if you cannot do what you need via beginContact or collision masks.
    *
    * @method Phaser.Physics.P2#setImpactEvents
    * @param ***REMOVED***boolean***REMOVED*** state - Set to true to enable impact events, or false to disable.
    */
    setImpactEvents: function (state) ***REMOVED***

        if (state)
        ***REMOVED***
            this.world.on("impact", this.impactHandler, this);
        ***REMOVED***
        else
        ***REMOVED***
            this.world.off("impact", this.impactHandler, this);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets a callback to be fired after the Broadphase has collected collision pairs in the world.
    * Just because a pair exists it doesn't mean they *will* collide, just that they potentially could do.
    * If your calback returns `false` the pair will be removed from the narrowphase. This will stop them testing for collision this step.
    * Returning `true` from the callback will ensure they are checked in the narrowphase.
    *
    * @method Phaser.Physics.P2#setPostBroadphaseCallback
    * @param ***REMOVED***function***REMOVED*** callback - The callback that will receive the postBroadphase event data. It must return a boolean. Set to null to disable an existing callback.
    * @param ***REMOVED***object***REMOVED*** context - The context under which the callback will be fired.
    */
    setPostBroadphaseCallback: function (callback, context) ***REMOVED***

        this.postBroadphaseCallback = callback;
        this.callbackContext = context;

        if (callback !== null)
        ***REMOVED***
            this.world.on("postBroadphase", this.postBroadphaseHandler, this);
        ***REMOVED***
        else
        ***REMOVED***
            this.world.off("postBroadphase", this.postBroadphaseHandler, this);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal handler for the postBroadphase event.
    *
    * @method Phaser.Physics.P2#postBroadphaseHandler
    * @private
    * @param ***REMOVED***object***REMOVED*** event - The event data.
    */
    postBroadphaseHandler: function (event) ***REMOVED***

        if (!this.postBroadphaseCallback || event.pairs.length === 0)
        ***REMOVED***
            return;
        ***REMOVED***

        for (var i = event.pairs.length - 2; i >= 0; i -= 2)
        ***REMOVED***
            if (event.pairs[i].parent && event.pairs[i+1].parent && !this.postBroadphaseCallback.call(this.callbackContext, event.pairs[i].parent, event.pairs[i+1].parent))
            ***REMOVED***
                event.pairs.splice(i, 2);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Handles a p2 impact event.
    *
    * @method Phaser.Physics.P2#impactHandler
    * @private
    * @param ***REMOVED***object***REMOVED*** event - The event data.
    */
    impactHandler: function (event) ***REMOVED***

        if (event.bodyA.parent && event.bodyB.parent)
        ***REMOVED***
            //  Body vs. Body callbacks
            var a = event.bodyA.parent;
            var b = event.bodyB.parent;

            if (a._bodyCallbacks[event.bodyB.id])
            ***REMOVED***
                a._bodyCallbacks[event.bodyB.id].call(a._bodyCallbackContext[event.bodyB.id], a, b, event.shapeA, event.shapeB);
            ***REMOVED***

            if (b._bodyCallbacks[event.bodyA.id])
            ***REMOVED***
                b._bodyCallbacks[event.bodyA.id].call(b._bodyCallbackContext[event.bodyA.id], b, a, event.shapeB, event.shapeA);
            ***REMOVED***

            //  Body vs. Group callbacks
            if (a._groupCallbacks[event.shapeB.collisionGroup])
            ***REMOVED***
                a._groupCallbacks[event.shapeB.collisionGroup].call(a._groupCallbackContext[event.shapeB.collisionGroup], a, b, event.shapeA, event.shapeB);
            ***REMOVED***

            if (b._groupCallbacks[event.shapeA.collisionGroup])
            ***REMOVED***
                b._groupCallbacks[event.shapeA.collisionGroup].call(b._groupCallbackContext[event.shapeA.collisionGroup], b, a, event.shapeB, event.shapeA);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Handles a p2 begin contact event.
    *
    * @method Phaser.Physics.P2#beginContactHandler
    * @param ***REMOVED***object***REMOVED*** event - The event data.
    */
    beginContactHandler: function (event) ***REMOVED***

        if (event.bodyA && event.bodyB)
        ***REMOVED***
            this.onBeginContact.dispatch(event.bodyA, event.bodyB, event.shapeA, event.shapeB, event.contactEquations);

            if (event.bodyA.parent)
            ***REMOVED***
                event.bodyA.parent.onBeginContact.dispatch(event.bodyB.parent, event.bodyB, event.shapeA, event.shapeB, event.contactEquations);
            ***REMOVED***

            if (event.bodyB.parent)
            ***REMOVED***
                event.bodyB.parent.onBeginContact.dispatch(event.bodyA.parent, event.bodyA, event.shapeB, event.shapeA, event.contactEquations);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Handles a p2 end contact event.
    *
    * @method Phaser.Physics.P2#endContactHandler
    * @param ***REMOVED***object***REMOVED*** event - The event data.
    */
    endContactHandler: function (event) ***REMOVED***

        if (event.bodyA && event.bodyB)
        ***REMOVED***
            this.onEndContact.dispatch(event.bodyA, event.bodyB, event.shapeA, event.shapeB);

            if (event.bodyA.parent)
            ***REMOVED***
                event.bodyA.parent.onEndContact.dispatch(event.bodyB.parent, event.bodyB, event.shapeA, event.shapeB);
            ***REMOVED***

            if (event.bodyB.parent)
            ***REMOVED***
                event.bodyB.parent.onEndContact.dispatch(event.bodyA.parent, event.bodyA, event.shapeB, event.shapeA);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets the bounds of the Physics world to match the Game.World dimensions.
    * You can optionally set which 'walls' to create: left, right, top or bottom.
    *
    * @method Phaser.Physics#setBoundsToWorld
    * @param ***REMOVED***boolean***REMOVED*** [left=true] - If true will create the left bounds wall.
    * @param ***REMOVED***boolean***REMOVED*** [right=true] - If true will create the right bounds wall.
    * @param ***REMOVED***boolean***REMOVED*** [top=true] - If true will create the top bounds wall.
    * @param ***REMOVED***boolean***REMOVED*** [bottom=true] - If true will create the bottom bounds wall.
    * @param ***REMOVED***boolean***REMOVED*** [setCollisionGroup=true] - If true the Bounds will be set to use its own Collision Group.
    */
    setBoundsToWorld: function (left, right, top, bottom, setCollisionGroup) ***REMOVED***

        this.setBounds(this.game.world.bounds.x, this.game.world.bounds.y, this.game.world.bounds.width, this.game.world.bounds.height, left, right, top, bottom, setCollisionGroup);

    ***REMOVED***,

    /**
    * Sets the given material against the 4 bounds of this World.
    *
    * @method Phaser.Physics#setWorldMaterial
    * @param ***REMOVED***Phaser.Physics.P2.Material***REMOVED*** material - The material to set.
    * @param ***REMOVED***boolean***REMOVED*** [left=true] - If true will set the material on the left bounds wall.
    * @param ***REMOVED***boolean***REMOVED*** [right=true] - If true will set the material on the right bounds wall.
    * @param ***REMOVED***boolean***REMOVED*** [top=true] - If true will set the material on the top bounds wall.
    * @param ***REMOVED***boolean***REMOVED*** [bottom=true] - If true will set the material on the bottom bounds wall.
    */
    setWorldMaterial: function (material, left, right, top, bottom) ***REMOVED***

        if (left === undefined) ***REMOVED*** left = true; ***REMOVED***
        if (right === undefined) ***REMOVED*** right = true; ***REMOVED***
        if (top === undefined) ***REMOVED*** top = true; ***REMOVED***
        if (bottom === undefined) ***REMOVED*** bottom = true; ***REMOVED***

        if (left && this.walls.left)
        ***REMOVED***
            this.walls.left.shapes[0].material = material;
        ***REMOVED***

        if (right && this.walls.right)
        ***REMOVED***
            this.walls.right.shapes[0].material = material;
        ***REMOVED***

        if (top && this.walls.top)
        ***REMOVED***
            this.walls.top.shapes[0].material = material;
        ***REMOVED***

        if (bottom && this.walls.bottom)
        ***REMOVED***
            this.walls.bottom.shapes[0].material = material;
        ***REMOVED***

    ***REMOVED***,

    /**
    * By default the World will be set to collide everything with everything. The bounds of the world is a Body with 4 shapes, one for each face.
    * If you start to use your own collision groups then your objects will no longer collide with the bounds.
    * To fix this you need to adjust the bounds to use its own collision group first BEFORE changing your Sprites collision group.
    *
    * @method Phaser.Physics.P2#updateBoundsCollisionGroup
    * @param ***REMOVED***boolean***REMOVED*** [setCollisionGroup=true] - If true the Bounds will be set to use its own Collision Group.
    */
    updateBoundsCollisionGroup: function (setCollisionGroup) ***REMOVED***

        if (setCollisionGroup === undefined) ***REMOVED*** setCollisionGroup = true; ***REMOVED***

        var mask = (setCollisionGroup) ? this.boundsCollisionGroup.mask : this.everythingCollisionGroup.mask;

        if (this.walls.left)
        ***REMOVED***
            this.walls.left.shapes[0].collisionGroup = mask;
        ***REMOVED***

        if (this.walls.right)
        ***REMOVED***
            this.walls.right.shapes[0].collisionGroup = mask;
        ***REMOVED***

        if (this.walls.top)
        ***REMOVED***
            this.walls.top.shapes[0].collisionGroup = mask;
        ***REMOVED***

        if (this.walls.bottom)
        ***REMOVED***
            this.walls.bottom.shapes[0].collisionGroup = mask;
        ***REMOVED***

        this._boundsOwnGroup = setCollisionGroup;

    ***REMOVED***,

    /**
    * Sets the bounds of the Physics world to match the given world pixel dimensions.
    * You can optionally set which 'walls' to create: left, right, top or bottom.
    * If none of the walls are given it will default to use the walls settings it had previously.
    * I.e. if you previously told it to not have the left or right walls, and you then adjust the world size
    * the newly created bounds will also not have the left and right walls.
    * Explicitly state them in the parameters to override this.
    *
    * @method Phaser.Physics.P2#setBounds
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of the top-left corner of the bounds.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of the top-left corner of the bounds.
    * @param ***REMOVED***number***REMOVED*** width - The width of the bounds.
    * @param ***REMOVED***number***REMOVED*** height - The height of the bounds.
    * @param ***REMOVED***boolean***REMOVED*** [left=true] - If true will create the left bounds wall.
    * @param ***REMOVED***boolean***REMOVED*** [right=true] - If true will create the right bounds wall.
    * @param ***REMOVED***boolean***REMOVED*** [top=true] - If true will create the top bounds wall.
    * @param ***REMOVED***boolean***REMOVED*** [bottom=true] - If true will create the bottom bounds wall.
    * @param ***REMOVED***boolean***REMOVED*** [setCollisionGroup=true] - If true the Bounds will be set to use its own Collision Group.
    */
    setBounds: function (x, y, width, height, left, right, top, bottom, setCollisionGroup) ***REMOVED***

        if (left === undefined) ***REMOVED*** left = this._boundsLeft; ***REMOVED***
        if (right === undefined) ***REMOVED*** right = this._boundsRight; ***REMOVED***
        if (top === undefined) ***REMOVED*** top = this._boundsTop; ***REMOVED***
        if (bottom === undefined) ***REMOVED*** bottom = this._boundsBottom; ***REMOVED***
        if (setCollisionGroup === undefined) ***REMOVED*** setCollisionGroup = this._boundsOwnGroup; ***REMOVED***

        this.setupWall(left, 'left', x, y, 1.5707963267948966, setCollisionGroup);
        this.setupWall(right, 'right', x + width, y, -1.5707963267948966, setCollisionGroup);
        this.setupWall(top, 'top', x, y, -3.141592653589793, setCollisionGroup);
        this.setupWall(bottom, 'bottom', x, y + height, 0, setCollisionGroup);

        //  Remember the bounds settings in case they change later on via World.setBounds
        this._boundsLeft = left;
        this._boundsRight = right;
        this._boundsTop = top;
        this._boundsBottom = bottom;
        this._boundsOwnGroup = setCollisionGroup;

    ***REMOVED***,

    /**
    * Internal method called by setBounds. Responsible for creating, updating or 
    * removing the wall body shapes.
    *
    * @method Phaser.Physics.P2#setupWall
    * @private
    * @param ***REMOVED***boolean***REMOVED*** create - True to create the wall shape, false to remove it.
    * @param ***REMOVED***string***REMOVED*** wall - The wall segment to update.
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of the wall.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of the wall.
    * @param ***REMOVED***float***REMOVED*** angle - The angle of the wall.
    * @param ***REMOVED***boolean***REMOVED*** [setCollisionGroup=true] - If true the Bounds will be set to use its own Collision Group.
    */
    setupWall: function (create, wall, x, y, angle, setCollisionGroup) ***REMOVED***

        if (create)
        ***REMOVED***
            //  We need a left wall. Do we have one already?
            if (this.walls[wall])
            ***REMOVED***
                this.walls[wall].position = [ this.pxmi(x), this.pxmi(y) ];
            ***REMOVED***
            else
            ***REMOVED***
                this.walls[wall] = new p2.Body(***REMOVED*** mass: 0, position: [ this.pxmi(x), this.pxmi(y) ], angle: angle ***REMOVED***);
                this.walls[wall].addShape(new p2.Plane());

                this.world.addBody(this.walls[wall]);
            ***REMOVED***

            if (setCollisionGroup)
            ***REMOVED***
                this.walls[wall].shapes[0].collisionGroup = this.boundsCollisionGroup.mask;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (this.walls[wall])
            ***REMOVED***
                this.world.removeBody(this.walls[wall]);
                this.walls[wall] = null;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Pauses the P2 World independent of the game pause state.
    *
    * @method Phaser.Physics.P2#pause
    */
    pause: function() ***REMOVED***

        this.paused = true;

    ***REMOVED***,
    
    /**
    * Resumes a paused P2 World.
    *
    * @method Phaser.Physics.P2#resume
    */
    resume: function() ***REMOVED***

        this.paused = false;

    ***REMOVED***,

    /**
    * Internal P2 update loop.
    *
    * @method Phaser.Physics.P2#update
    */
    update: function () ***REMOVED***

        // Do nothing if the physics engine was paused before
        if (this.paused)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this.useElapsedTime)
        ***REMOVED***
            this.world.step(this.game.time.physicsElapsed);
        ***REMOVED***
        else
        ***REMOVED***
            this.world.step(this.frameRate);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called by Phaser.Physics when a State swap occurs.
    * Starts the begin and end Contact listeners again.
    *
    * @method Phaser.Physics.P2#reset
    */
    reset: function () ***REMOVED***

        this.world.on("beginContact", this.beginContactHandler, this);
        this.world.on("endContact", this.endContactHandler, this);

        this.nothingCollisionGroup = new Phaser.Physics.P2.CollisionGroup(1);
        this.boundsCollisionGroup = new Phaser.Physics.P2.CollisionGroup(2);
        this.everythingCollisionGroup = new Phaser.Physics.P2.CollisionGroup(2147483648);

        this._collisionGroupID = 2;

        this.setBoundsToWorld(true, true, true, true, false);

    ***REMOVED***,

    /**
    * Clears all bodies from the simulation, resets callbacks and resets the collision bitmask.
    * 
    * The P2 world is also cleared:
    * 
    * * Removes all solver equations
    * * Removes all constraints
    * * Removes all bodies
    * * Removes all springs
    * * Removes all contact materials
    * 
    * This is called automatically when you switch state.
    *
    * @method Phaser.Physics.P2#clear
    */
    clear: function () ***REMOVED***

        this.world.time = 0;
        this.world.fixedStepTime = 0;

        // Remove all solver equations
        if (this.world.solver && this.world.solver.equations.length)
        ***REMOVED***
            this.world.solver.removeAllEquations();
        ***REMOVED***

        // Remove all constraints
        var cs = this.world.constraints;

        for (var i = cs.length - 1; i >= 0; i--)
        ***REMOVED***
            this.world.removeConstraint(cs[i]);
        ***REMOVED***

        // Remove all bodies
        var bodies = this.world.bodies;

        for (var i = bodies.length - 1; i >= 0; i--)
        ***REMOVED***
            this.world.removeBody(bodies[i]);
        ***REMOVED***

        // Remove all springs
        var springs = this.world.springs;

        for (var i = springs.length - 1; i >= 0; i--)
        ***REMOVED***
            this.world.removeSpring(springs[i]);
        ***REMOVED***

        // Remove all contact materials
        var cms = this.world.contactMaterials;

        for (var i = cms.length - 1; i >= 0; i--)
        ***REMOVED***
            this.world.removeContactMaterial(cms[i]);
        ***REMOVED***

        this.world.off("beginContact", this.beginContactHandler, this);
        this.world.off("endContact", this.endContactHandler, this);

        this.postBroadphaseCallback = null;
        this.callbackContext = null;
        this.impactCallback = null;

        this.collisionGroups = [];
        this._toRemove = [];
        this.boundsCollidesWith = [];

        //  Remove the world bounds
        this.walls = ***REMOVED*** left: null, right: null, top: null, bottom: null ***REMOVED***;

    ***REMOVED***,

    /**
    * Clears all bodies from the simulation and unlinks World from Game. Should only be called on game shutdown. Call `clear` on a State change.
    *
    * @method Phaser.Physics.P2#destroy
    */
    destroy: function () ***REMOVED***

        this.clear();

        this.game = null;

    ***REMOVED***,

    /**
    * Add a body to the world.
    *
    * @method Phaser.Physics.P2#addBody
    * @param ***REMOVED***Phaser.Physics.P2.Body***REMOVED*** body - The Body to add to the World.
    * @return ***REMOVED***boolean***REMOVED*** True if the Body was added successfully, otherwise false.
    */
    addBody: function (body) ***REMOVED***

        if (body.data.world)
        ***REMOVED***
            return false;
        ***REMOVED***
        else
        ***REMOVED***
            this.world.addBody(body.data);

            this.onBodyAdded.dispatch(body);

            return true;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Removes a body from the world. This will silently fail if the body wasn't part of the world to begin with.
    *
    * @method Phaser.Physics.P2#removeBody
    * @param ***REMOVED***Phaser.Physics.P2.Body***REMOVED*** body - The Body to remove from the World.
    * @return ***REMOVED***Phaser.Physics.P2.Body***REMOVED*** The Body that was removed.
    */
    removeBody: function (body) ***REMOVED***

        if (body.data.world === this.world)
        ***REMOVED***
            this.world.removeBody(body.data);

            this.onBodyRemoved.dispatch(body);
        ***REMOVED***

        return body;

    ***REMOVED***,

    /**
    * Adds a Spring to the world.
    *
    * @method Phaser.Physics.P2#addSpring
    * @param ***REMOVED***Phaser.Physics.P2.Spring|p2.LinearSpring|p2.RotationalSpring***REMOVED*** spring - The Spring to add to the World.
    * @return ***REMOVED***Phaser.Physics.P2.Spring***REMOVED*** The Spring that was added.
    */
    addSpring: function (spring) ***REMOVED***

        if (spring instanceof Phaser.Physics.P2.Spring || spring instanceof Phaser.Physics.P2.RotationalSpring)
        ***REMOVED***
            this.world.addSpring(spring.data);
        ***REMOVED***
        else
        ***REMOVED***
            this.world.addSpring(spring);
        ***REMOVED***

        this.onSpringAdded.dispatch(spring);

        return spring;

    ***REMOVED***,

    /**
    * Removes a Spring from the world.
    *
    * @method Phaser.Physics.P2#removeSpring
    * @param ***REMOVED***Phaser.Physics.P2.Spring***REMOVED*** spring - The Spring to remove from the World.
    * @return ***REMOVED***Phaser.Physics.P2.Spring***REMOVED*** The Spring that was removed.
    */
    removeSpring: function (spring) ***REMOVED***

        if (spring instanceof Phaser.Physics.P2.Spring || spring instanceof Phaser.Physics.P2.RotationalSpring)
        ***REMOVED***
            this.world.removeSpring(spring.data);
        ***REMOVED***
        else
        ***REMOVED***
            this.world.removeSpring(spring);
        ***REMOVED***

        this.onSpringRemoved.dispatch(spring);

        return spring;

    ***REMOVED***,

    /**
    * Creates a constraint that tries to keep the distance between two bodies constant.
    *
    * @method Phaser.Physics.P2#createDistanceConstraint
    * @param ***REMOVED***Phaser.Sprite|Phaser.Physics.P2.Body|p2.Body***REMOVED*** bodyA - First connected body.
    * @param ***REMOVED***Phaser.Sprite|Phaser.Physics.P2.Body|p2.Body***REMOVED*** bodyB - Second connected body.
    * @param ***REMOVED***number***REMOVED*** distance - The distance to keep between the bodies.
    * @param ***REMOVED***Array***REMOVED*** [localAnchorA] - The anchor point for bodyA, defined locally in bodyA frame. Defaults to [0,0].
    * @param ***REMOVED***Array***REMOVED*** [localAnchorB] - The anchor point for bodyB, defined locally in bodyB frame. Defaults to [0,0].
    * @param ***REMOVED***number***REMOVED*** [maxForce] - The maximum force that should be applied to constrain the bodies.
    * @return ***REMOVED***Phaser.Physics.P2.DistanceConstraint***REMOVED*** The constraint
    */
    createDistanceConstraint: function (bodyA, bodyB, distance, localAnchorA, localAnchorB, maxForce) ***REMOVED***

        bodyA = this.getBody(bodyA);
        bodyB = this.getBody(bodyB);

        if (!bodyA || !bodyB)
        ***REMOVED***
            console.warn('Cannot create Constraint, invalid body objects given');
        ***REMOVED***
        else
        ***REMOVED***
            return this.addConstraint(new Phaser.Physics.P2.DistanceConstraint(this, bodyA, bodyB, distance, localAnchorA, localAnchorB, maxForce));
        ***REMOVED***

    ***REMOVED***,

    /**
    * Creates a constraint that tries to keep the distance between two bodies constant.
    *
    * @method Phaser.Physics.P2#createGearConstraint
    * @param ***REMOVED***Phaser.Sprite|Phaser.Physics.P2.Body|p2.Body***REMOVED*** bodyA - First connected body.
    * @param ***REMOVED***Phaser.Sprite|Phaser.Physics.P2.Body|p2.Body***REMOVED*** bodyB - Second connected body.
    * @param ***REMOVED***number***REMOVED*** [angle=0] - The relative angle
    * @param ***REMOVED***number***REMOVED*** [ratio=1] - The gear ratio.
    * @return ***REMOVED***Phaser.Physics.P2.GearConstraint***REMOVED*** The constraint
    */
    createGearConstraint: function (bodyA, bodyB, angle, ratio) ***REMOVED***

        bodyA = this.getBody(bodyA);
        bodyB = this.getBody(bodyB);

        if (!bodyA || !bodyB)
        ***REMOVED***
            console.warn('Cannot create Constraint, invalid body objects given');
        ***REMOVED***
        else
        ***REMOVED***
            return this.addConstraint(new Phaser.Physics.P2.GearConstraint(this, bodyA, bodyB, angle, ratio));
        ***REMOVED***

    ***REMOVED***,

    /**
    * Connects two bodies at given offset points, letting them rotate relative to each other around this point.
    * The pivot points are given in world (pixel) coordinates.
    *
    * @method Phaser.Physics.P2#createRevoluteConstraint
    * @param ***REMOVED***Phaser.Sprite|Phaser.Physics.P2.Body|p2.Body***REMOVED*** bodyA - First connected body.
    * @param ***REMOVED***Array***REMOVED*** pivotA - The point relative to the center of mass of bodyA which bodyA is constrained to. The value is an array with 2 elements matching x and y, i.e: [32, 32].
    * @param ***REMOVED***Phaser.Sprite|Phaser.Physics.P2.Body|p2.Body***REMOVED*** bodyB - Second connected body.
    * @param ***REMOVED***Array***REMOVED*** pivotB - The point relative to the center of mass of bodyB which bodyB is constrained to. The value is an array with 2 elements matching x and y, i.e: [32, 32].
    * @param ***REMOVED***number***REMOVED*** [maxForce=0] - The maximum force that should be applied to constrain the bodies.
    * @param ***REMOVED***Float32Array***REMOVED*** [worldPivot=null] - A pivot point given in world coordinates. If specified, localPivotA and localPivotB are automatically computed from this value.
    * @return ***REMOVED***Phaser.Physics.P2.RevoluteConstraint***REMOVED*** The constraint
    */
    createRevoluteConstraint: function (bodyA, pivotA, bodyB, pivotB, maxForce, worldPivot) ***REMOVED***

        bodyA = this.getBody(bodyA);
        bodyB = this.getBody(bodyB);

        if (!bodyA || !bodyB)
        ***REMOVED***
            console.warn('Cannot create Constraint, invalid body objects given');
        ***REMOVED***
        else
        ***REMOVED***
            return this.addConstraint(new Phaser.Physics.P2.RevoluteConstraint(this, bodyA, pivotA, bodyB, pivotB, maxForce, worldPivot));
        ***REMOVED***

    ***REMOVED***,

    /**
    * Locks the relative position between two bodies.
    *
    * @method Phaser.Physics.P2#createLockConstraint
    * @param ***REMOVED***Phaser.Sprite|Phaser.Physics.P2.Body|p2.Body***REMOVED*** bodyA - First connected body.
    * @param ***REMOVED***Phaser.Sprite|Phaser.Physics.P2.Body|p2.Body***REMOVED*** bodyB - Second connected body.
    * @param ***REMOVED***Array***REMOVED*** [offset] - The offset of bodyB in bodyA's frame. The value is an array with 2 elements matching x and y, i.e: [32, 32].
    * @param ***REMOVED***number***REMOVED*** [angle=0] - The angle of bodyB in bodyA's frame.
    * @param ***REMOVED***number***REMOVED*** [maxForce] - The maximum force that should be applied to constrain the bodies.
    * @return ***REMOVED***Phaser.Physics.P2.LockConstraint***REMOVED*** The constraint
    */
    createLockConstraint: function (bodyA, bodyB, offset, angle, maxForce) ***REMOVED***

        bodyA = this.getBody(bodyA);
        bodyB = this.getBody(bodyB);

        if (!bodyA || !bodyB)
        ***REMOVED***
            console.warn('Cannot create Constraint, invalid body objects given');
        ***REMOVED***
        else
        ***REMOVED***
            return this.addConstraint(new Phaser.Physics.P2.LockConstraint(this, bodyA, bodyB, offset, angle, maxForce));
        ***REMOVED***

    ***REMOVED***,

    /**
    * Constraint that only allows bodies to move along a line, relative to each other.
    * See http://www.iforce2d.net/b2dtut/joints-prismatic
    *
    * @method Phaser.Physics.P2#createPrismaticConstraint
    * @param ***REMOVED***Phaser.Sprite|Phaser.Physics.P2.Body|p2.Body***REMOVED*** bodyA - First connected body.
    * @param ***REMOVED***Phaser.Sprite|Phaser.Physics.P2.Body|p2.Body***REMOVED*** bodyB - Second connected body.
    * @param ***REMOVED***boolean***REMOVED*** [lockRotation=true] - If set to false, bodyB will be free to rotate around its anchor point.
    * @param ***REMOVED***Array***REMOVED*** [anchorA] - Body A's anchor point, defined in its own local frame. The value is an array with 2 elements matching x and y, i.e: [32, 32].
    * @param ***REMOVED***Array***REMOVED*** [anchorB] - Body A's anchor point, defined in its own local frame. The value is an array with 2 elements matching x and y, i.e: [32, 32].
    * @param ***REMOVED***Array***REMOVED*** [axis] - An axis, defined in body A frame, that body B's anchor point may slide along. The value is an array with 2 elements matching x and y, i.e: [32, 32].
    * @param ***REMOVED***number***REMOVED*** [maxForce] - The maximum force that should be applied to constrain the bodies.
    * @return ***REMOVED***Phaser.Physics.P2.PrismaticConstraint***REMOVED*** The constraint
    */
    createPrismaticConstraint: function (bodyA, bodyB, lockRotation, anchorA, anchorB, axis, maxForce) ***REMOVED***

        bodyA = this.getBody(bodyA);
        bodyB = this.getBody(bodyB);

        if (!bodyA || !bodyB)
        ***REMOVED***
            console.warn('Cannot create Constraint, invalid body objects given');
        ***REMOVED***
        else
        ***REMOVED***
            return this.addConstraint(new Phaser.Physics.P2.PrismaticConstraint(this, bodyA, bodyB, lockRotation, anchorA, anchorB, axis, maxForce));
        ***REMOVED***

    ***REMOVED***,

    /**
    * Adds a Constraint to the world.
    *
    * @method Phaser.Physics.P2#addConstraint
    * @param ***REMOVED***Phaser.Physics.P2.Constraint***REMOVED*** constraint - The Constraint to add to the World.
    * @return ***REMOVED***Phaser.Physics.P2.Constraint***REMOVED*** The Constraint that was added.
    */
    addConstraint: function (constraint) ***REMOVED***

        this.world.addConstraint(constraint);

        this.onConstraintAdded.dispatch(constraint);

        return constraint;

    ***REMOVED***,

    /**
    * Removes a Constraint from the world.
    *
    * @method Phaser.Physics.P2#removeConstraint
    * @param ***REMOVED***Phaser.Physics.P2.Constraint***REMOVED*** constraint - The Constraint to be removed from the World.
    * @return ***REMOVED***Phaser.Physics.P2.Constraint***REMOVED*** The Constraint that was removed.
    */
    removeConstraint: function (constraint) ***REMOVED***

        this.world.removeConstraint(constraint);

        this.onConstraintRemoved.dispatch(constraint);

        return constraint;

    ***REMOVED***,

    /**
    * Adds a Contact Material to the world.
    *
    * @method Phaser.Physics.P2#addContactMaterial
    * @param ***REMOVED***Phaser.Physics.P2.ContactMaterial***REMOVED*** material - The Contact Material to be added to the World.
    * @return ***REMOVED***Phaser.Physics.P2.ContactMaterial***REMOVED*** The Contact Material that was added.
    */
    addContactMaterial: function (material) ***REMOVED***

        this.world.addContactMaterial(material);

        this.onContactMaterialAdded.dispatch(material);

        return material;

    ***REMOVED***,

    /**
    * Removes a Contact Material from the world.
    *
    * @method Phaser.Physics.P2#removeContactMaterial
    * @param ***REMOVED***Phaser.Physics.P2.ContactMaterial***REMOVED*** material - The Contact Material to be removed from the World.
    * @return ***REMOVED***Phaser.Physics.P2.ContactMaterial***REMOVED*** The Contact Material that was removed.
    */
    removeContactMaterial: function (material) ***REMOVED***

        this.world.removeContactMaterial(material);

        this.onContactMaterialRemoved.dispatch(material);

        return material;

    ***REMOVED***,

    /**
    * Gets a Contact Material based on the two given Materials.
    *
    * @method Phaser.Physics.P2#getContactMaterial
    * @param ***REMOVED***Phaser.Physics.P2.Material***REMOVED*** materialA - The first Material to search for.
    * @param ***REMOVED***Phaser.Physics.P2.Material***REMOVED*** materialB - The second Material to search for.
    * @return ***REMOVED***Phaser.Physics.P2.ContactMaterial|boolean***REMOVED*** The Contact Material or false if none was found matching the Materials given.
    */
    getContactMaterial: function (materialA, materialB) ***REMOVED***

        return this.world.getContactMaterial(materialA, materialB);

    ***REMOVED***,

    /**
    * Sets the given Material against all Shapes owned by all the Bodies in the given array.
    *
    * @method Phaser.Physics.P2#setMaterial
    * @param ***REMOVED***Phaser.Physics.P2.Material***REMOVED*** material - The Material to be applied to the given Bodies.
    * @param ***REMOVED***array<Phaser.Physics.P2.Body>***REMOVED*** bodies - An Array of Body objects that the given Material will be set on.
    */
    setMaterial: function (material, bodies) ***REMOVED***

        var i = bodies.length;

        while (i--)
        ***REMOVED***
            bodies[i].setMaterial(material);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Creates a Material. Materials are applied to Shapes owned by a Body and can be set with Body.setMaterial().
    * Materials are a way to control what happens when Shapes collide. Combine unique Materials together to create Contact Materials.
    * Contact Materials have properties such as friction and restitution that allow for fine-grained collision control between different Materials.
    *
    * @method Phaser.Physics.P2#createMaterial
    * @param ***REMOVED***string***REMOVED*** [name] - Optional name of the Material. Each Material has a unique ID but string names are handy for debugging.
    * @param ***REMOVED***Phaser.Physics.P2.Body***REMOVED*** [body] - Optional Body. If given it will assign the newly created Material to the Body shapes.
    * @return ***REMOVED***Phaser.Physics.P2.Material***REMOVED*** The Material that was created. This is also stored in Phaser.Physics.P2.materials.
    */
    createMaterial: function (name, body) ***REMOVED***

        name = name || '';

        var material = new Phaser.Physics.P2.Material(name);

        this.materials.push(material);

        if (typeof body !== 'undefined')
        ***REMOVED***
            body.setMaterial(material);
        ***REMOVED***

        return material;

    ***REMOVED***,

    /**
    * Creates a Contact Material from the two given Materials. You can then edit the properties of the Contact Material directly.
    *
    * @method Phaser.Physics.P2#createContactMaterial
    * @param ***REMOVED***Phaser.Physics.P2.Material***REMOVED*** [materialA] - The first Material to create the ContactMaterial from. If undefined it will create a new Material object first.
    * @param ***REMOVED***Phaser.Physics.P2.Material***REMOVED*** [materialB] - The second Material to create the ContactMaterial from. If undefined it will create a new Material object first.
    * @param ***REMOVED***object***REMOVED*** [options] - Material options object.
    * @return ***REMOVED***Phaser.Physics.P2.ContactMaterial***REMOVED*** The Contact Material that was created.
    */
    createContactMaterial: function (materialA, materialB, options) ***REMOVED***

        if (materialA === undefined) ***REMOVED*** materialA = this.createMaterial(); ***REMOVED***
        if (materialB === undefined) ***REMOVED*** materialB = this.createMaterial(); ***REMOVED***

        var contact = new Phaser.Physics.P2.ContactMaterial(materialA, materialB, options);

        return this.addContactMaterial(contact);

    ***REMOVED***,

    /**
    * Populates and returns an array with references to of all current Bodies in the world.
    *
    * @method Phaser.Physics.P2#getBodies
    * @return ***REMOVED***array<Phaser.Physics.P2.Body>***REMOVED*** An array containing all current Bodies in the world.
    */
    getBodies: function () ***REMOVED***

        var output = [];
        var i = this.world.bodies.length;

        while (i--)
        ***REMOVED***
            output.push(this.world.bodies[i].parent);
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Checks the given object to see if it has a p2.Body and if so returns it.
    *
    * @method Phaser.Physics.P2#getBody
    * @param ***REMOVED***object***REMOVED*** object - The object to check for a p2.Body on.
    * @return ***REMOVED***p2.Body***REMOVED*** The p2.Body, or null if not found.
    */
    getBody: function (object) ***REMOVED***

        if (object instanceof p2.Body)
        ***REMOVED***
            //  Native p2 body
            return object;
        ***REMOVED***
        else if (object instanceof Phaser.Physics.P2.Body)
        ***REMOVED***
            //  Phaser P2 Body
            return object.data;
        ***REMOVED***
        else if (object['body'] && object['body'].type === Phaser.Physics.P2JS)
        ***REMOVED***
            //  Sprite, TileSprite, etc
            return object.body.data;
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Populates and returns an array of all current Springs in the world.
    *
    * @method Phaser.Physics.P2#getSprings
    * @return ***REMOVED***array<Phaser.Physics.P2.Spring>***REMOVED*** An array containing all current Springs in the world.
    */
    getSprings: function () ***REMOVED***

        var output = [];
        var i = this.world.springs.length;

        while (i--)
        ***REMOVED***
            output.push(this.world.springs[i].parent);
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Populates and returns an array of all current Constraints in the world.
    * You will get an array of p2 constraints back. This can be of mixed types, for example the array may contain
    * PrismaticConstraints, RevoluteConstraints or any other valid p2 constraint type.
    *
    * @method Phaser.Physics.P2#getConstraints
    * @return ***REMOVED***array<Phaser.Physics.P2.Constraint>***REMOVED*** An array containing all current Constraints in the world.
    */
    getConstraints: function () ***REMOVED***

        var output = [];
        var i = this.world.constraints.length;

        while (i--)
        ***REMOVED***
            output.push(this.world.constraints[i]);
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Test if a world point overlaps bodies. You will get an array of actual P2 bodies back. You can find out which Sprite a Body belongs to
    * (if any) by checking the Body.parent.sprite property. Body.parent is a Phaser.Physics.P2.Body property.
    *
    * @method Phaser.Physics.P2#hitTest
    * @param ***REMOVED***Phaser.Point***REMOVED*** worldPoint - Point to use for intersection tests. The points values must be in world (pixel) coordinates.
    * @param ***REMOVED***Array<Phaser.Physics.P2.Body|Phaser.Sprite|p2.Body>***REMOVED*** [bodies] - A list of objects to check for intersection. If not given it will check Phaser.Physics.P2.world.bodies (i.e. all world bodies)
    * @param ***REMOVED***number***REMOVED*** [precision=5] - Used for matching against particles and lines. Adds some margin to these infinitesimal objects.
    * @param ***REMOVED***boolean***REMOVED*** [filterStatic=false] - If true all Static objects will be removed from the results array.
    * @return ***REMOVED***Array***REMOVED*** Array of bodies that overlap the point.
    */
    hitTest: function (worldPoint, bodies, precision, filterStatic) ***REMOVED***

        if (bodies === undefined) ***REMOVED*** bodies = this.world.bodies; ***REMOVED***
        if (precision === undefined) ***REMOVED*** precision = 5; ***REMOVED***
        if (filterStatic === undefined) ***REMOVED*** filterStatic = false; ***REMOVED***

        var physicsPosition = [ this.pxmi(worldPoint.x), this.pxmi(worldPoint.y) ];

        var query = [];
        var i = bodies.length;

        while (i--)
        ***REMOVED***
            if (bodies[i] instanceof Phaser.Physics.P2.Body && !(filterStatic && bodies[i].data.type === p2.Body.STATIC))
            ***REMOVED***
                query.push(bodies[i].data);
            ***REMOVED***
            else if (bodies[i] instanceof p2.Body && bodies[i].parent && !(filterStatic && bodies[i].type === p2.Body.STATIC))
            ***REMOVED***
                query.push(bodies[i]);
            ***REMOVED***
            else if (bodies[i] instanceof Phaser.Sprite && bodies[i].hasOwnProperty('body') && !(filterStatic && bodies[i].body.data.type === p2.Body.STATIC))
            ***REMOVED***
                query.push(bodies[i].body.data);
            ***REMOVED***
        ***REMOVED***

        return this.world.hitTest(physicsPosition, query, precision);

    ***REMOVED***,

    /**
    * Converts the current world into a JSON object.
    *
    * @method Phaser.Physics.P2#toJSON
    * @return ***REMOVED***object***REMOVED*** A JSON representation of the world.
    */
    toJSON: function () ***REMOVED***

        return this.world.toJSON();

    ***REMOVED***,

    /**
    * Creates a new Collision Group and optionally applies it to the given object.
    * Collision Groups are handled using bitmasks, therefore you have a fixed limit you can create before you need to re-use older groups.
    *
    * @method Phaser.Physics.P2#createCollisionGroup
    * @param ***REMOVED***Phaser.Group|Phaser.Sprite***REMOVED*** [object] - An optional Sprite or Group to apply the Collision Group to. If a Group is given it will be applied to all top-level children.
    */
    createCollisionGroup: function (object) ***REMOVED***

        var bitmask = Math.pow(2, this._collisionGroupID);

        if (this.walls.left)
        ***REMOVED***
            this.walls.left.shapes[0].collisionMask = this.walls.left.shapes[0].collisionMask | bitmask;
        ***REMOVED***

        if (this.walls.right)
        ***REMOVED***
            this.walls.right.shapes[0].collisionMask = this.walls.right.shapes[0].collisionMask | bitmask;
        ***REMOVED***

        if (this.walls.top)
        ***REMOVED***
            this.walls.top.shapes[0].collisionMask = this.walls.top.shapes[0].collisionMask | bitmask;
        ***REMOVED***

        if (this.walls.bottom)
        ***REMOVED***
            this.walls.bottom.shapes[0].collisionMask = this.walls.bottom.shapes[0].collisionMask | bitmask;
        ***REMOVED***

        this._collisionGroupID++;

        var group = new Phaser.Physics.P2.CollisionGroup(bitmask);

        this.collisionGroups.push(group);

        if (object)
        ***REMOVED***
            this.setCollisionGroup(object, group);
        ***REMOVED***

        return group;

    ***REMOVED***,

    /**
    * Sets the given CollisionGroup to be the collision group for all shapes in this Body, unless a shape is specified.
    * Note that this resets the collisionMask and any previously set groups. See Body.collides() for appending them.
    *
    * @method Phaser.Physics.P2y#setCollisionGroup
    * @param ***REMOVED***Phaser.Group|Phaser.Sprite***REMOVED*** object - A Sprite or Group to apply the Collision Group to. If a Group is given it will be applied to all top-level children.
    * @param ***REMOVED***Phaser.Physics.CollisionGroup***REMOVED*** group - The Collision Group that this Bodies shapes will use.
    */
    setCollisionGroup: function (object, group) ***REMOVED***

        if (object instanceof Phaser.Group)
        ***REMOVED***
            for (var i = 0; i < object.total; i++)
            ***REMOVED***
                if (object.children[i]['body'] && object.children[i]['body'].type === Phaser.Physics.P2JS)
                ***REMOVED***
                    object.children[i].body.setCollisionGroup(group);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            object.body.setCollisionGroup(group);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Creates a linear spring, connecting two bodies. A spring can have a resting length, a stiffness and damping.
    *
    * @method Phaser.Physics.P2#createSpring
    * @param ***REMOVED***Phaser.Sprite|Phaser.Physics.P2.Body|p2.Body***REMOVED*** bodyA - First connected body.
    * @param ***REMOVED***Phaser.Sprite|Phaser.Physics.P2.Body|p2.Body***REMOVED*** bodyB - Second connected body.
    * @param ***REMOVED***number***REMOVED*** [restLength=1] - Rest length of the spring. A number > 0.
    * @param ***REMOVED***number***REMOVED*** [stiffness=100] - Stiffness of the spring. A number >= 0.
    * @param ***REMOVED***number***REMOVED*** [damping=1] - Damping of the spring. A number >= 0.
    * @param ***REMOVED***Array***REMOVED*** [worldA] - Where to hook the spring to body A in world coordinates. This value is an array by 2 elements, x and y, i.e: [32, 32].
    * @param ***REMOVED***Array***REMOVED*** [worldB] - Where to hook the spring to body B in world coordinates. This value is an array by 2 elements, x and y, i.e: [32, 32].
    * @param ***REMOVED***Array***REMOVED*** [localA] - Where to hook the spring to body A in local body coordinates. This value is an array by 2 elements, x and y, i.e: [32, 32].
    * @param ***REMOVED***Array***REMOVED*** [localB] - Where to hook the spring to body B in local body coordinates. This value is an array by 2 elements, x and y, i.e: [32, 32].
    * @return ***REMOVED***Phaser.Physics.P2.Spring***REMOVED*** The spring
    */
    createSpring: function (bodyA, bodyB, restLength, stiffness, damping, worldA, worldB, localA, localB) ***REMOVED***

        bodyA = this.getBody(bodyA);
        bodyB = this.getBody(bodyB);

        if (!bodyA || !bodyB)
        ***REMOVED***
            console.warn('Cannot create Spring, invalid body objects given');
        ***REMOVED***
        else
        ***REMOVED***
            return this.addSpring(new Phaser.Physics.P2.Spring(this, bodyA, bodyB, restLength, stiffness, damping, worldA, worldB, localA, localB));
        ***REMOVED***

    ***REMOVED***,

    /**
    * Creates a rotational spring, connecting two bodies. A spring can have a resting length, a stiffness and damping.
    *
    * @method Phaser.Physics.P2#createRotationalSpring
    * @param ***REMOVED***Phaser.Sprite|Phaser.Physics.P2.Body|p2.Body***REMOVED*** bodyA - First connected body.
    * @param ***REMOVED***Phaser.Sprite|Phaser.Physics.P2.Body|p2.Body***REMOVED*** bodyB - Second connected body.
    * @param ***REMOVED***number***REMOVED*** [restAngle] - The relative angle of bodies at which the spring is at rest. If not given, it's set to the current relative angle between the bodies.
    * @param ***REMOVED***number***REMOVED*** [stiffness=100] - Stiffness of the spring. A number >= 0.
    * @param ***REMOVED***number***REMOVED*** [damping=1] - Damping of the spring. A number >= 0.
    * @return ***REMOVED***Phaser.Physics.P2.RotationalSpring***REMOVED*** The spring
    */
    createRotationalSpring: function (bodyA, bodyB, restAngle, stiffness, damping) ***REMOVED***

        bodyA = this.getBody(bodyA);
        bodyB = this.getBody(bodyB);

        if (!bodyA || !bodyB)
        ***REMOVED***
            console.warn('Cannot create Rotational Spring, invalid body objects given');
        ***REMOVED***
        else
        ***REMOVED***
            return this.addSpring(new Phaser.Physics.P2.RotationalSpring(this, bodyA, bodyB, restAngle, stiffness, damping));
        ***REMOVED***

    ***REMOVED***,

    /**
    * Creates a new Body and adds it to the World.
    *
    * @method Phaser.Physics.P2#createBody
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of Body.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of Body.
    * @param ***REMOVED***number***REMOVED*** mass - The mass of the Body. A mass of 0 means a 'static' Body is created.
    * @param ***REMOVED***boolean***REMOVED*** [addToWorld=false] - Automatically add this Body to the world? (usually false as it won't have any shapes on construction).
    * @param ***REMOVED***object***REMOVED*** options - An object containing the build options:
    * @param ***REMOVED***boolean***REMOVED*** [options.optimalDecomp=false] - Set to true if you need optimal decomposition. Warning: very slow for polygons with more than 10 vertices.
    * @param ***REMOVED***boolean***REMOVED*** [options.skipSimpleCheck=false] - Set to true if you already know that the path is not intersecting itself.
    * @param ***REMOVED***boolean|number***REMOVED*** [options.removeCollinearPoints=false] - Set to a number (angle threshold value) to remove collinear points, or false to keep all points.
    * @param ***REMOVED***(number[]|...number)***REMOVED*** points - An array of 2d vectors that form the convex or concave polygon.
    *                                       Either [[0,0], [0,1],...] or a flat array of numbers that will be interpreted as [x,y, x,y, ...],
    *                                       or the arguments passed can be flat x,y values e.g. `setPolygon(options, x,y, x,y, x,y, ...)` where `x` and `y` are numbers.
    * @return ***REMOVED***Phaser.Physics.P2.Body***REMOVED*** The body
    */
    createBody: function (x, y, mass, addToWorld, options, data) ***REMOVED***

        if (addToWorld === undefined) ***REMOVED*** addToWorld = false; ***REMOVED***

        var body = new Phaser.Physics.P2.Body(this.game, null, x, y, mass);

        if (data)
        ***REMOVED***
            var result = body.addPolygon(options, data);

            if (!result)
            ***REMOVED***
                return false;
            ***REMOVED***
        ***REMOVED***

        if (addToWorld)
        ***REMOVED***
            this.world.addBody(body.data);
        ***REMOVED***

        return body;

    ***REMOVED***,

    /**
    * Creates a new Particle and adds it to the World.
    *
    * @method Phaser.Physics.P2#createParticle
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of Body.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of Body.
    * @param ***REMOVED***number***REMOVED*** mass - The mass of the Body. A mass of 0 means a 'static' Body is created.
    * @param ***REMOVED***boolean***REMOVED*** [addToWorld=false] - Automatically add this Body to the world? (usually false as it won't have any shapes on construction).
    * @param ***REMOVED***object***REMOVED*** options - An object containing the build options:
    * @param ***REMOVED***boolean***REMOVED*** [options.optimalDecomp=false] - Set to true if you need optimal decomposition. Warning: very slow for polygons with more than 10 vertices.
    * @param ***REMOVED***boolean***REMOVED*** [options.skipSimpleCheck=false] - Set to true if you already know that the path is not intersecting itself.
    * @param ***REMOVED***boolean|number***REMOVED*** [options.removeCollinearPoints=false] - Set to a number (angle threshold value) to remove collinear points, or false to keep all points.
    * @param ***REMOVED***(number[]|...number)***REMOVED*** points - An array of 2d vectors that form the convex or concave polygon.
    *                                       Either [[0,0], [0,1],...] or a flat array of numbers that will be interpreted as [x,y, x,y, ...],
    *                                       or the arguments passed can be flat x,y values e.g. `setPolygon(options, x,y, x,y, x,y, ...)` where `x` and `y` are numbers.
    */
    createParticle: function (x, y, mass, addToWorld, options, data) ***REMOVED***

        if (addToWorld === undefined) ***REMOVED*** addToWorld = false; ***REMOVED***

        var body = new Phaser.Physics.P2.Body(this.game, null, x, y, mass);

        if (data)
        ***REMOVED***
            var result = body.addPolygon(options, data);

            if (!result)
            ***REMOVED***
                return false;
            ***REMOVED***
        ***REMOVED***

        if (addToWorld)
        ***REMOVED***
            this.world.addBody(body.data);
        ***REMOVED***

        return body;

    ***REMOVED***,

    /**
    * Converts all of the polylines objects inside a Tiled ObjectGroup into physics bodies that are added to the world.
    * Note that the polylines must be created in such a way that they can withstand polygon decomposition.
    *
    * @method Phaser.Physics.P2#convertCollisionObjects
    * @param ***REMOVED***Phaser.Tilemap***REMOVED*** map - The Tilemap to get the map data from.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to operate on. If not given will default to map.currentLayer.
    * @param ***REMOVED***boolean***REMOVED*** [addToWorld=true] - If true it will automatically add each body to the world.
    * @return ***REMOVED***array***REMOVED*** An array of the Phaser.Physics.Body objects that have been created.
    */
    convertCollisionObjects: function (map, layer, addToWorld) ***REMOVED***

        if (addToWorld === undefined) ***REMOVED*** addToWorld = true; ***REMOVED***

        var output = [];

        for (var i = 0, len = map.collision[layer].length; i < len; i++)
        ***REMOVED***
            // name: json.layers[i].objects[v].name,
            // x: json.layers[i].objects[v].x,
            // y: json.layers[i].objects[v].y,
            // width: json.layers[i].objects[v].width,
            // height: json.layers[i].objects[v].height,
            // visible: json.layers[i].objects[v].visible,
            // properties: json.layers[i].objects[v].properties,
            // polyline: json.layers[i].objects[v].polyline

            var object = map.collision[layer][i];

            var body = this.createBody(object.x, object.y, 0, addToWorld, ***REMOVED******REMOVED***, object.polyline);

            if (body)
            ***REMOVED***
                output.push(body);
            ***REMOVED***
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Clears all physics bodies from the given TilemapLayer that were created with `World.convertTilemap`.
    *
    * @method Phaser.Physics.P2#clearTilemapLayerBodies
    * @param ***REMOVED***Phaser.Tilemap***REMOVED*** map - The Tilemap to get the map data from.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to operate on. If not given will default to map.currentLayer.
    */
    clearTilemapLayerBodies: function (map, layer) ***REMOVED***

        layer = map.getLayer(layer);

        var i = map.layers[layer].bodies.length;

        while (i--)
        ***REMOVED***
            map.layers[layer].bodies[i].destroy();
        ***REMOVED***

        map.layers[layer].bodies.length = 0;

    ***REMOVED***,

    /**
    * Goes through all tiles in the given Tilemap and TilemapLayer and converts those set to collide into physics bodies.
    * Only call this *after* you have specified all of the tiles you wish to collide with calls like Tilemap.setCollisionBetween, etc.
    * Every time you call this method it will destroy any previously created bodies and remove them from the world.
    * Therefore understand it's a very expensive operation and not to be done in a core game update loop.
    *
    * @method Phaser.Physics.P2#convertTilemap
    * @param ***REMOVED***Phaser.Tilemap***REMOVED*** map - The Tilemap to get the map data from.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to operate on. If not given will default to map.currentLayer.
    * @param ***REMOVED***boolean***REMOVED*** [addToWorld=true] - If true it will automatically add each body to the world, otherwise it's up to you to do so.
    * @param ***REMOVED***boolean***REMOVED*** [optimize=true] - If true adjacent colliding tiles will be combined into a single body to save processing. However it means you cannot perform specific Tile to Body collision responses.
    * @return ***REMOVED***array***REMOVED*** An array of the Phaser.Physics.P2.Body objects that were created.
    */
    convertTilemap: function (map, layer, addToWorld, optimize) ***REMOVED***

        layer = map.getLayer(layer);

        if (addToWorld === undefined) ***REMOVED*** addToWorld = true; ***REMOVED***
        if (optimize === undefined) ***REMOVED*** optimize = true; ***REMOVED***

        //  If the bodies array is already populated we need to nuke it
        this.clearTilemapLayerBodies(map, layer);

        var width = 0;
        var sx = 0;
        var sy = 0;

        for (var y = 0, h = map.layers[layer].height; y < h; y++)
        ***REMOVED***
            width = 0;

            for (var x = 0, w = map.layers[layer].width; x < w; x++)
            ***REMOVED***
                var tile = map.layers[layer].data[y][x];

                if (tile && tile.index > -1 && tile.collides)
                ***REMOVED***
                    if (optimize)
                    ***REMOVED***
                        var right = map.getTileRight(layer, x, y);

                        if (width === 0)
                        ***REMOVED***
                            sx = tile.x * tile.width;
                            sy = tile.y * tile.height;
                            width = tile.width;
                        ***REMOVED***

                        if (right && right.collides)
                        ***REMOVED***
                            width += tile.width;
                        ***REMOVED***
                        else
                        ***REMOVED***
                            var body = this.createBody(sx, sy, 0, false);

                            body.addRectangle(width, tile.height, width / 2, tile.height / 2, 0);

                            if (addToWorld)
                            ***REMOVED***
                                this.addBody(body);
                            ***REMOVED***

                            map.layers[layer].bodies.push(body);

                            width = 0;
                        ***REMOVED***
                    ***REMOVED***
                    else
                    ***REMOVED***
                        var body = this.createBody(tile.x * tile.width, tile.y * tile.height, 0, false);

                        body.addRectangle(tile.width, tile.height, tile.width / 2, tile.height / 2, 0);

                        if (addToWorld)
                        ***REMOVED***
                            this.addBody(body);
                        ***REMOVED***

                        map.layers[layer].bodies.push(body);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return map.layers[layer].bodies;

    ***REMOVED***,

    /**
    * Convert p2 physics value (meters) to pixel scale.
    * By default Phaser uses a scale of 20px per meter.
    * If you need to modify this you can over-ride these functions via the Physics Configuration object.
    *
    * @method Phaser.Physics.P2#mpx
    * @param ***REMOVED***number***REMOVED*** v - The value to convert.
    * @return ***REMOVED***number***REMOVED*** The scaled value.
    */
    mpx: function (v) ***REMOVED***

        return v *= 20;

    ***REMOVED***,

    /**
    * Convert pixel value to p2 physics scale (meters).
    * By default Phaser uses a scale of 20px per meter.
    * If you need to modify this you can over-ride these functions via the Physics Configuration object.
    *
    * @method Phaser.Physics.P2#pxm
    * @param ***REMOVED***number***REMOVED*** v - The value to convert.
    * @return ***REMOVED***number***REMOVED*** The scaled value.
    */
    pxm: function (v) ***REMOVED***

        return v * 0.05;

    ***REMOVED***,

    /**
    * Convert p2 physics value (meters) to pixel scale and inverses it.
    * By default Phaser uses a scale of 20px per meter.
    * If you need to modify this you can over-ride these functions via the Physics Configuration object.
    *
    * @method Phaser.Physics.P2#mpxi
    * @param ***REMOVED***number***REMOVED*** v - The value to convert.
    * @return ***REMOVED***number***REMOVED*** The scaled value.
    */
    mpxi: function (v) ***REMOVED***

        return v *= -20;

    ***REMOVED***,

    /**
    * Convert pixel value to p2 physics scale (meters) and inverses it.
    * By default Phaser uses a scale of 20px per meter.
    * If you need to modify this you can over-ride these functions via the Physics Configuration object.
    *
    * @method Phaser.Physics.P2#pxmi
    * @param ***REMOVED***number***REMOVED*** v - The value to convert.
    * @return ***REMOVED***number***REMOVED*** The scaled value.
    */
    pxmi: function (v) ***REMOVED***

        return v * -0.05;

    ***REMOVED***

***REMOVED***;

/**
* @name Phaser.Physics.P2#friction
* @property ***REMOVED***number***REMOVED*** friction - Friction between colliding bodies. This value is used if no matching ContactMaterial is found for a Material pair.
*/
Object.defineProperty(Phaser.Physics.P2.prototype, "friction", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.defaultContactMaterial.friction;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.world.defaultContactMaterial.friction = value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2#restitution
* @property ***REMOVED***number***REMOVED*** restitution - Default coefficient of restitution between colliding bodies. This value is used if no matching ContactMaterial is found for a Material pair.
*/
Object.defineProperty(Phaser.Physics.P2.prototype, "restitution", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.defaultContactMaterial.restitution;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.world.defaultContactMaterial.restitution = value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2#contactMaterial
* @property ***REMOVED***p2.ContactMaterial***REMOVED*** contactMaterial - The default Contact Material being used by the World.
*/
Object.defineProperty(Phaser.Physics.P2.prototype, "contactMaterial", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.defaultContactMaterial;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.world.defaultContactMaterial = value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2#applySpringForces
* @property ***REMOVED***boolean***REMOVED*** applySpringForces - Enable to automatically apply spring forces each step.
*/
Object.defineProperty(Phaser.Physics.P2.prototype, "applySpringForces", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.applySpringForces;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.world.applySpringForces = value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2#applyDamping
* @property ***REMOVED***boolean***REMOVED*** applyDamping - Enable to automatically apply body damping each step.
*/
Object.defineProperty(Phaser.Physics.P2.prototype, "applyDamping", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.applyDamping;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.world.applyDamping = value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2#applyGravity
* @property ***REMOVED***boolean***REMOVED*** applyGravity - Enable to automatically apply gravity each step.
*/
Object.defineProperty(Phaser.Physics.P2.prototype, "applyGravity", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.applyGravity;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.world.applyGravity = value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2#solveConstraints
* @property ***REMOVED***boolean***REMOVED*** solveConstraints - Enable/disable constraint solving in each step.
*/
Object.defineProperty(Phaser.Physics.P2.prototype, "solveConstraints", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.solveConstraints;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.world.solveConstraints = value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2#time
* @property ***REMOVED***boolean***REMOVED*** time - The World time.
* @readonly
*/
Object.defineProperty(Phaser.Physics.P2.prototype, "time", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.time;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2#emitImpactEvent
* @property ***REMOVED***boolean***REMOVED*** emitImpactEvent - Set to true if you want to the world to emit the "impact" event. Turning this off could improve performance.
*/
Object.defineProperty(Phaser.Physics.P2.prototype, "emitImpactEvent", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.emitImpactEvent;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.world.emitImpactEvent = value;

    ***REMOVED***

***REMOVED***);

/**
* How to deactivate bodies during simulation. Possible modes are: World.NO_SLEEPING, World.BODY_SLEEPING and World.ISLAND_SLEEPING.
* If sleeping is enabled, you might need to wake up the bodies if they fall asleep when they shouldn't. If you want to enable sleeping in the world, but want to disable it for a particular body, see Body.allowSleep.
* @name Phaser.Physics.P2#sleepMode
* @property ***REMOVED***number***REMOVED*** sleepMode
*/
Object.defineProperty(Phaser.Physics.P2.prototype, "sleepMode", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.sleepMode;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.world.sleepMode = value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2#total
* @property ***REMOVED***number***REMOVED*** total - The total number of bodies in the world.
* @readonly
*/
Object.defineProperty(Phaser.Physics.P2.prototype, "total", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.bodies.length;

    ***REMOVED***

***REMOVED***);

/* jshint noarg: false */

/**
* @author       Georgios Kaleadis https://github.com/georgiee
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Allow to access a list of created fixture (coming from Body#addPhaserPolygon)
* which itself parse the input from PhysicsEditor with the custom phaser exporter.
* You can access fixtures of a Body by a group index or even by providing a fixture Key.

* You can set the fixture key and also the group index for a fixture in PhysicsEditor.
* This gives you the power to create a complex body built of many fixtures and modify them
* during runtime (to remove parts, set masks, categories & sensor properties)
*
* @class Phaser.Physics.P2.FixtureList
* @constructor
* @param ***REMOVED***Array***REMOVED*** list - A list of fixtures (from Phaser.Physics.P2.Body#addPhaserPolygon)
*/
Phaser.Physics.P2.FixtureList = function (list) ***REMOVED***

    if (!Array.isArray(list))
    ***REMOVED***
        list = [list];
    ***REMOVED***

    this.rawList = list;
    this.init();
    this.parse(this.rawList);

***REMOVED***;

Phaser.Physics.P2.FixtureList.prototype = ***REMOVED***
  
    /**
    * @method Phaser.Physics.P2.FixtureList#init
    */
    init: function () ***REMOVED***

        /**
        * @property ***REMOVED***object***REMOVED*** namedFixtures - Collect all fixtures with a key
        * @private
        */
        this.namedFixtures = ***REMOVED******REMOVED***;

        /**
        * @property ***REMOVED***Array***REMOVED*** groupedFixtures - Collect all given fixtures per group index. Notice: Every fixture with a key also belongs to a group
        * @private
        */
        this.groupedFixtures = [];

        /**
        * @property ***REMOVED***Array***REMOVED*** allFixtures - This is a list of everything in this collection
        * @private
        */
        this.allFixtures = [];

    ***REMOVED***,

    /**
    * @method Phaser.Physics.P2.FixtureList#setCategory
    * @param ***REMOVED***number***REMOVED*** bit - The bit to set as the collision group.
    * @param ***REMOVED***string***REMOVED*** fixtureKey - Only apply to the fixture with the given key.
    */
    setCategory: function (bit, fixtureKey) ***REMOVED***

        var setter = function(fixture) ***REMOVED***
            fixture.collisionGroup = bit;
        ***REMOVED***;

        this.getFixtures(fixtureKey).forEach(setter);

    ***REMOVED***,
  
    /**
    * @method Phaser.Physics.P2.FixtureList#setMask
    * @param ***REMOVED***number***REMOVED*** bit - The bit to set as the collision mask
    * @param ***REMOVED***string***REMOVED*** fixtureKey - Only apply to the fixture with the given key
    */
    setMask: function (bit, fixtureKey) ***REMOVED***

        var setter = function(fixture) ***REMOVED***
            fixture.collisionMask = bit;
        ***REMOVED***;

        this.getFixtures(fixtureKey).forEach(setter);

    ***REMOVED***,
  
    /**
    * @method Phaser.Physics.P2.FixtureList#setSensor
    * @param ***REMOVED***boolean***REMOVED*** value - sensor true or false
    * @param ***REMOVED***string***REMOVED*** fixtureKey - Only apply to the fixture with the given key
    */
    setSensor: function (value, fixtureKey) ***REMOVED***

        var setter = function(fixture) ***REMOVED***
            fixture.sensor = value;
        ***REMOVED***;

        this.getFixtures(fixtureKey).forEach(setter);

    ***REMOVED***,

    /**
    * @method Phaser.Physics.P2.FixtureList#setMaterial
    * @param ***REMOVED***Object***REMOVED*** material - The contact material for a fixture
    * @param ***REMOVED***string***REMOVED*** fixtureKey - Only apply to the fixture with the given key
    */
    setMaterial: function (material, fixtureKey) ***REMOVED***

        var setter = function(fixture) ***REMOVED***
            fixture.material = material;
        ***REMOVED***;

        this.getFixtures(fixtureKey).forEach(setter);

    ***REMOVED***,

    /**
    * Accessor to get either a list of specified fixtures by key or the whole fixture list
    * 
    * @method Phaser.Physics.P2.FixtureList#getFixtures
    * @param ***REMOVED***array***REMOVED*** keys - A list of fixture keys
    */
    getFixtures: function (keys) ***REMOVED***

        var fixtures = [];

        if (keys)
        ***REMOVED***
            if (!(keys instanceof Array))
            ***REMOVED***
                keys = [keys];
            ***REMOVED***

            var self = this;
            keys.forEach(function(key) ***REMOVED***
                if (self.namedFixtures[key])
                ***REMOVED***
                    fixtures.push(self.namedFixtures[key]);
                ***REMOVED***
            ***REMOVED***);

            return this.flatten(fixtures);

        ***REMOVED***
        else
        ***REMOVED***
            return this.allFixtures;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Accessor to get either a single fixture by its key.
    * 
    * @method Phaser.Physics.P2.FixtureList#getFixtureByKey
    * @param ***REMOVED***string***REMOVED*** key - The key of the fixture.
    */
    getFixtureByKey: function (key) ***REMOVED***

        return this.namedFixtures[key];

    ***REMOVED***,

    /**
    * Accessor to get a group of fixtures by its group index.
    * 
    * @method Phaser.Physics.P2.FixtureList#getGroup
    * @param ***REMOVED***number***REMOVED*** groupID - The group index.
    */
    getGroup: function (groupID) ***REMOVED***

        return this.groupedFixtures[groupID];

    ***REMOVED***,
  
    /**
    * Parser for the output of Phaser.Physics.P2.Body#addPhaserPolygon
    * 
    * @method Phaser.Physics.P2.FixtureList#parse
    */
    parse: function () ***REMOVED***

        var key, value, _ref, _results;
        _ref = this.rawList;
        _results = [];

        for (key in _ref)
        ***REMOVED***
            value = _ref[key];

            if (!isNaN(key - 0))
            ***REMOVED***
                this.groupedFixtures[key] = this.groupedFixtures[key] || [];
                this.groupedFixtures[key] = this.groupedFixtures[key].concat(value);
            ***REMOVED***
            else
            ***REMOVED***
                this.namedFixtures[key] = this.flatten(value);
            ***REMOVED***

            _results.push(this.allFixtures = this.flatten(this.groupedFixtures));
        ***REMOVED***

    ***REMOVED***,

    /**
    * A helper to flatten arrays. This is very useful as the fixtures are nested from time to time due to the way P2 creates and splits polygons.
    * 
    * @method Phaser.Physics.P2.FixtureList#flatten
    * @param ***REMOVED***array***REMOVED*** array - The array to flatten. Notice: This will happen recursive not shallow.
    */
    flatten: function (array) ***REMOVED***

        var result, self;
        result = [];
        self = arguments.callee;
        
        array.forEach(function(item) ***REMOVED***
            return Array.prototype.push.apply(result, (Array.isArray(item) ? self(item) : [item]));
        ***REMOVED***);

        return result;

    ***REMOVED***

***REMOVED***;
/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A PointProxy is an internal class that allows for direct getter/setter style property access to Arrays and TypedArrays.
*
* @class Phaser.Physics.P2.PointProxy
* @constructor
* @param ***REMOVED***Phaser.Physics.P2***REMOVED*** world - A reference to the P2 World.
* @param ***REMOVED***any***REMOVED*** destination - The object to bind to.
*/
Phaser.Physics.P2.PointProxy = function (world, destination) ***REMOVED***

    this.world = world;
	this.destination = destination;

***REMOVED***;

Phaser.Physics.P2.PointProxy.prototype.constructor = Phaser.Physics.P2.PointProxy;

/**
* @name Phaser.Physics.P2.PointProxy#x
* @property ***REMOVED***number***REMOVED*** x - The x property of this PointProxy get and set in pixels.
*/
Object.defineProperty(Phaser.Physics.P2.PointProxy.prototype, "x", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.mpx(this.destination[0]);

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.destination[0] = this.world.pxm(value);

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.PointProxy#y
* @property ***REMOVED***number***REMOVED*** y - The y property of this PointProxy get and set in pixels.
*/
Object.defineProperty(Phaser.Physics.P2.PointProxy.prototype, "y", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.mpx(this.destination[1]);

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.destination[1] = this.world.pxm(value);

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.PointProxy#mx
* @property ***REMOVED***number***REMOVED*** mx - The x property of this PointProxy get and set in meters.
*/
Object.defineProperty(Phaser.Physics.P2.PointProxy.prototype, "mx", ***REMOVED***

    get: function () ***REMOVED***

        return this.destination[0];

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.destination[0] = value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.PointProxy#my
* @property ***REMOVED***number***REMOVED*** my - The x property of this PointProxy get and set in meters.
*/
Object.defineProperty(Phaser.Physics.P2.PointProxy.prototype, "my", ***REMOVED***

    get: function () ***REMOVED***

        return this.destination[1];

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.destination[1] = value;

    ***REMOVED***

***REMOVED***);

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A InversePointProxy is an internal class that allows for direct getter/setter style property access to Arrays and TypedArrays but inverses the values on set.
*
* @class Phaser.Physics.P2.InversePointProxy
* @constructor
* @param ***REMOVED***Phaser.Physics.P2***REMOVED*** world - A reference to the P2 World.
* @param ***REMOVED***any***REMOVED*** destination - The object to bind to.
*/
Phaser.Physics.P2.InversePointProxy = function (world, destination) ***REMOVED***

    this.world = world;
	this.destination = destination;

***REMOVED***;

Phaser.Physics.P2.InversePointProxy.prototype.constructor = Phaser.Physics.P2.InversePointProxy;

/**
* @name Phaser.Physics.P2.InversePointProxy#x
* @property ***REMOVED***number***REMOVED*** x - The x property of this InversePointProxy get and set in pixels.
*/
Object.defineProperty(Phaser.Physics.P2.InversePointProxy.prototype, "x", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.mpxi(this.destination[0]);

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.destination[0] = this.world.pxmi(value);

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.InversePointProxy#y
* @property ***REMOVED***number***REMOVED*** y - The y property of this InversePointProxy get and set in pixels.
*/
Object.defineProperty(Phaser.Physics.P2.InversePointProxy.prototype, "y", ***REMOVED***

    get: function () ***REMOVED***

        return this.world.mpxi(this.destination[1]);

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.destination[1] = this.world.pxmi(value);

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.InversePointProxy#mx
* @property ***REMOVED***number***REMOVED*** mx - The x property of this InversePointProxy get and set in meters.
*/
Object.defineProperty(Phaser.Physics.P2.InversePointProxy.prototype, "mx", ***REMOVED***

    get: function () ***REMOVED***

        return this.destination[0];

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.destination[0] = -value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Physics.P2.InversePointProxy#my
* @property ***REMOVED***number***REMOVED*** my - The y property of this InversePointProxy get and set in meters.
*/
Object.defineProperty(Phaser.Physics.P2.InversePointProxy.prototype, "my", ***REMOVED***

    get: function () ***REMOVED***

        return this.destination[1];

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.destination[1] = -value;

    ***REMOVED***

***REMOVED***);

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

/**
* @author       George https://github.com/georgiee
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Draws a P2 Body to a Graphics instance for visual debugging.
* Needless to say, for every body you enable debug drawing on, you are adding processor and graphical overhead.
* So use sparingly and rarely (if ever) in production code.
*
* Also be aware that the Debug body is only updated when the Sprite it is connected to changes position. If you
* manipulate the sprite in any other way (such as moving it to another Group or bringToTop, etc) then you will
* need to manually adjust its BodyDebug as well.
*
* @class Phaser.Physics.P2.BodyDebug
* @constructor
* @extends Phaser.Group
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Game reference to the currently running game.
* @param ***REMOVED***Phaser.Physics.P2.Body***REMOVED*** body - The P2 Body to display debug data for.
* @param ***REMOVED***object***REMOVED*** settings - Settings object.
*/
Phaser.Physics.P2.BodyDebug = function(game, body, settings) ***REMOVED***

    Phaser.Group.call(this, game);

    /**
    * @property ***REMOVED***object***REMOVED*** defaultSettings - Default debug settings.
    * @private
    */
    var defaultSettings = ***REMOVED***
        pixelsPerLengthUnit: game.physics.p2.mpx(1),
        debugPolygons: false,
        lineWidth: 1,
        alpha: 0.5
    ***REMOVED***;

    this.settings = Phaser.Utils.extend(defaultSettings, settings);

    /**
    * @property ***REMOVED***number***REMOVED*** ppu - Pixels per Length Unit.
    */
    this.ppu = this.settings.pixelsPerLengthUnit;
    this.ppu = -1 * this.ppu;

    /**
    * @property ***REMOVED***Phaser.Physics.P2.Body***REMOVED*** body - The P2 Body to display debug data for.
    */
    this.body = body;

    /**
    * @property ***REMOVED***Phaser.Graphics***REMOVED*** canvas - The canvas to render the debug info to.
    */
    this.canvas = new Phaser.Graphics(game);

    this.canvas.alpha = this.settings.alpha;

    this.add(this.canvas);

    this.draw();

    this.updateSpriteTransform();

***REMOVED***;

Phaser.Physics.P2.BodyDebug.prototype = Object.create(Phaser.Group.prototype);
Phaser.Physics.P2.BodyDebug.prototype.constructor = Phaser.Physics.P2.BodyDebug;

Phaser.Utils.extend(Phaser.Physics.P2.BodyDebug.prototype, ***REMOVED***

    /**
    * Core update.
    *
    * @method Phaser.Physics.P2.BodyDebug#updateSpriteTransform
    */
    updateSpriteTransform: function() ***REMOVED***

        this.position.x = this.body.position[0] * this.ppu;
        this.position.y = this.body.position[1] * this.ppu;
        this.rotation = this.body.angle;

    ***REMOVED***,

    /**
    * Draws the P2 shapes to the Graphics object.
    *
    * @method Phaser.Physics.P2.BodyDebug#draw
    */
    draw: function() ***REMOVED***

        var angle, child, color, i, j, lineColor, lw, obj, offset, sprite, v, verts, vrot, _j, _ref1;

        obj = this.body;
        sprite = this.canvas;
        sprite.clear();
        color = parseInt(this.randomPastelHex(), 16);
        lineColor = 0xff0000;
        lw = this.lineWidth;

        if (obj instanceof p2.Body && obj.shapes.length)
        ***REMOVED***
            var l = obj.shapes.length;

            i = 0;

            while (i !== l)
            ***REMOVED***
                child = obj.shapes[i];
                offset = child.position || 0;
                angle = child.angle || 0;

                if (child instanceof p2.Circle)
                ***REMOVED***
                    this.drawCircle(sprite, offset[0] * this.ppu, offset[1] * this.ppu, angle, child.radius * this.ppu, color, lw);
                ***REMOVED***
                else if (child instanceof p2.Capsule)
                ***REMOVED***
                    this.drawCapsule(sprite, offset[0] * this.ppu, offset[1] * this.ppu, angle, child.length * this.ppu, child.radius * this.ppu, lineColor, color, lw);
                ***REMOVED***
                else if (child instanceof p2.Plane)
                ***REMOVED***
                    this.drawPlane(sprite, offset[0] * this.ppu, -offset[1] * this.ppu, color, lineColor, lw * 5, lw * 10, lw * 10, this.ppu * 100, angle);
                ***REMOVED***
                else if (child instanceof p2.Line)
                ***REMOVED***
                    this.drawLine(sprite, child.length * this.ppu, lineColor, lw);
                ***REMOVED***
                else if (child instanceof p2.Box)
                ***REMOVED***
                    this.drawRectangle(sprite, offset[0] * this.ppu, offset[1] * this.ppu, angle, child.width * this.ppu, child.height * this.ppu, lineColor, color, lw);
                ***REMOVED***
                else if (child instanceof p2.Convex)
                ***REMOVED***
                    verts = [];
                    vrot = p2.vec2.create();

                    for (j = _j = 0, _ref1 = child.vertices.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j)
                    ***REMOVED***
                        v = child.vertices[j];
                        p2.vec2.rotate(vrot, v, angle);
                        verts.push([(vrot[0] + offset[0]) * this.ppu, -(vrot[1] + offset[1]) * this.ppu]);
                    ***REMOVED***

                    this.drawConvex(sprite, verts, child.triangles, lineColor, color, lw, this.settings.debugPolygons, [offset[0] * this.ppu, -offset[1] * this.ppu]);
                ***REMOVED***

                i++;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Draws a p2.Box to the Graphics object.
    *
    * @method Phaser.Physics.P2.BodyDebug#drawRectangle
    * @private
    */
    drawRectangle: function(g, x, y, angle, w, h, color, fillColor, lineWidth) ***REMOVED***

        if (lineWidth === undefined) ***REMOVED*** lineWidth = 1; ***REMOVED***
        if (color === undefined) ***REMOVED*** color = 0x000000; ***REMOVED***

        g.lineStyle(lineWidth, color, 1);
        g.beginFill(fillColor);
        g.drawRect(x - w / 2, y - h / 2, w, h);

    ***REMOVED***,

    /**
    * Draws a p2.Circle to the Graphics object.
    *
    * @method Phaser.Physics.P2.BodyDebug#drawCircle
    * @private
    */
    drawCircle: function(g, x, y, angle, radius, color, lineWidth) ***REMOVED***

        if (lineWidth === undefined) ***REMOVED*** lineWidth = 1; ***REMOVED***
        if (color === undefined) ***REMOVED*** color = 0xffffff; ***REMOVED***
        g.lineStyle(lineWidth, 0x000000, 1);
        g.beginFill(color, 1.0);
        g.drawCircle(x, y, -radius*2);
        g.endFill();
        g.moveTo(x, y);
        g.lineTo(x + radius * Math.cos(-angle), y + radius * Math.sin(-angle));

    ***REMOVED***,

    /**
    * Draws a p2.Line to the Graphics object.
    *
    * @method Phaser.Physics.P2.BodyDebug#drawLine
    * @private
    */
    drawLine: function(g, len, color, lineWidth) ***REMOVED***

        if (lineWidth === undefined) ***REMOVED*** lineWidth = 1; ***REMOVED***
        if (color === undefined) ***REMOVED*** color = 0x000000; ***REMOVED***

        g.lineStyle(lineWidth * 5, color, 1);
        g.moveTo(-len / 2, 0);
        g.lineTo(len / 2, 0);

    ***REMOVED***,

    /**
    * Draws a p2.Convex to the Graphics object.
    *
    * @method Phaser.Physics.P2.BodyDebug#drawConvex
    * @private
    */
    drawConvex: function(g, verts, triangles, color, fillColor, lineWidth, debug, offset) ***REMOVED***

        var colors, i, v, v0, v1, x, x0, x1, y, y0, y1;

        if (lineWidth === undefined) ***REMOVED*** lineWidth = 1; ***REMOVED***
        if (color === undefined) ***REMOVED*** color = 0x000000; ***REMOVED***

        if (!debug)
        ***REMOVED***
            g.lineStyle(lineWidth, color, 1);
            g.beginFill(fillColor);
            i = 0;

            while (i !== verts.length)
            ***REMOVED***
                v = verts[i];
                x = v[0];
                y = v[1];

                if (i === 0)
                ***REMOVED***
                    g.moveTo(x, -y);
                ***REMOVED***
                else
                ***REMOVED***
                    g.lineTo(x, -y);
                ***REMOVED***

                i++;
            ***REMOVED***

            g.endFill();

            if (verts.length > 2)
            ***REMOVED***
                g.moveTo(verts[verts.length - 1][0], -verts[verts.length - 1][1]);
                return g.lineTo(verts[0][0], -verts[0][1]);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            colors = [0xff0000, 0x00ff00, 0x0000ff];
            i = 0;

            while (i !== verts.length + 1)
            ***REMOVED***
                v0 = verts[i % verts.length];
                v1 = verts[(i + 1) % verts.length];
                x0 = v0[0];
                y0 = v0[1];
                x1 = v1[0];
                y1 = v1[1];
                g.lineStyle(lineWidth, colors[i % colors.length], 1);
                g.moveTo(x0, -y0);
                g.lineTo(x1, -y1);
                g.drawCircle(x0, -y0, lineWidth * 2);
                i++;
            ***REMOVED***

            g.lineStyle(lineWidth, 0x000000, 1);
            return g.drawCircle(offset[0], offset[1], lineWidth * 2);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Draws a p2.Path to the Graphics object.
    *
    * @method Phaser.Physics.P2.BodyDebug#drawPath
    * @private
    */
    drawPath: function(g, path, color, fillColor, lineWidth) ***REMOVED***

        var area, i, lastx, lasty, p1x, p1y, p2x, p2y, p3x, p3y, v, x, y;
        if (lineWidth === undefined) ***REMOVED*** lineWidth = 1; ***REMOVED***
        if (color === undefined) ***REMOVED*** color = 0x000000; ***REMOVED***

        g.lineStyle(lineWidth, color, 1);

        if (typeof fillColor === "number")
        ***REMOVED***
            g.beginFill(fillColor);
        ***REMOVED***

        lastx = null;
        lasty = null;
        i = 0;

        while (i < path.length)
        ***REMOVED***
            v = path[i];
            x = v[0];
            y = v[1];

            if (x !== lastx || y !== lasty)
            ***REMOVED***
                if (i === 0)
                ***REMOVED***
                    g.moveTo(x, y);
                ***REMOVED***
                else
                ***REMOVED***
                    p1x = lastx;
                    p1y = lasty;
                    p2x = x;
                    p2y = y;
                    p3x = path[(i + 1) % path.length][0];
                    p3y = path[(i + 1) % path.length][1];
                    area = ((p2x - p1x) * (p3y - p1y)) - ((p3x - p1x) * (p2y - p1y));

                    if (area !== 0)
                    ***REMOVED***
                        g.lineTo(x, y);
                    ***REMOVED***
                ***REMOVED***
                lastx = x;
                lasty = y;
            ***REMOVED***

            i++;

        ***REMOVED***

        if (typeof fillColor === "number")
        ***REMOVED***
            g.endFill();
        ***REMOVED***

        if (path.length > 2 && typeof fillColor === "number")
        ***REMOVED***
            g.moveTo(path[path.length - 1][0], path[path.length - 1][1]);
            g.lineTo(path[0][0], path[0][1]);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Draws a p2.Plane to the Graphics object.
    *
    * @method Phaser.Physics.P2.BodyDebug#drawPlane
    * @private
    */
    drawPlane: function(g, x0, x1, color, lineColor, lineWidth, diagMargin, diagSize, maxLength, angle) ***REMOVED***

        var max, xd, yd;
        if (lineWidth === undefined) ***REMOVED*** lineWidth = 1; ***REMOVED***
        if (color === undefined) ***REMOVED*** color = 0xffffff; ***REMOVED***

        g.lineStyle(lineWidth, lineColor, 11);
        g.beginFill(color);
        max = maxLength;

        g.moveTo(x0, -x1);
        xd = x0 + Math.cos(angle) * this.game.width;
        yd = x1 + Math.sin(angle) * this.game.height;
        g.lineTo(xd, -yd);

        g.moveTo(x0, -x1);
        xd = x0 + Math.cos(angle) * -this.game.width;
        yd = x1 + Math.sin(angle) * -this.game.height;
        g.lineTo(xd, -yd);

    ***REMOVED***,

    /**
    * Draws a p2.Capsule to the Graphics object.
    *
    * @method Phaser.Physics.P2.BodyDebug#drawCapsule
    * @private
    */
    drawCapsule: function(g, x, y, angle, len, radius, color, fillColor, lineWidth) ***REMOVED***

        if (lineWidth === undefined) ***REMOVED*** lineWidth = 1; ***REMOVED***
        if (color === undefined) ***REMOVED*** color =  0x000000; ***REMOVED***

        g.lineStyle(lineWidth, color, 1);

        // Draw circles at ends
        var c = Math.cos(angle);
        var s = Math.sin(angle);

        g.beginFill(fillColor, 1);
        g.drawCircle(-len/2*c + x, -len/2*s + y, -radius * 2);
        g.drawCircle( len/2*c + x,  len/2*s + y, -radius * 2);
        g.endFill();

        // Draw rectangle
        g.lineStyle(lineWidth, color, 0);
        g.beginFill(fillColor, 1);
        g.moveTo(-len/2*c + radius*s + x, -len/2*s + radius*c + y);
        g.lineTo( len/2*c + radius*s + x,  len/2*s + radius*c + y);
        g.lineTo( len/2*c - radius*s + x,  len/2*s - radius*c + y);
        g.lineTo(-len/2*c - radius*s + x, -len/2*s - radius*c + y);
        g.endFill();

        // Draw lines in between
        g.lineStyle(lineWidth, color, 1);
        g.moveTo(-len/2*c + radius*s + x, -len/2*s + radius*c + y);
        g.lineTo( len/2*c + radius*s + x,  len/2*s + radius*c + y);
        g.moveTo(-len/2*c - radius*s + x, -len/2*s - radius*c + y);
        g.lineTo( len/2*c - radius*s + x,  len/2*s - radius*c + y);

    ***REMOVED***,

    /**
    * Picks a random pastel color.
    *
    * @method Phaser.Physics.P2.BodyDebug#randomPastelHex
    * @private
    */
    randomPastelHex: function() ***REMOVED***

        var blue, green, mix, red;
        mix = [255, 255, 255];

        red = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);

        red = Math.floor((red + 3 * mix[0]) / 4);
        green = Math.floor((green + 3 * mix[1]) / 4);
        blue = Math.floor((blue + 3 * mix[2]) / 4);

        return this.rgbToHex(red, green, blue);

    ***REMOVED***,

    /**
    * Converts from RGB to Hex.
    *
    * @method Phaser.Physics.P2.BodyDebug#rgbToHex
    * @private
    */
    rgbToHex: function(r, g, b) ***REMOVED***
        return this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    ***REMOVED***,

    /**
    * Component to hex conversion.
    *
    * @method Phaser.Physics.P2.BodyDebug#componentToHex
    * @private
    */
    componentToHex: function(c) ***REMOVED***

        var hex;
        hex = c.toString(16);

        if (hex.length === 2)
        ***REMOVED***
            return hex;
        ***REMOVED***
        else
        ***REMOVED***
            return hex + '0';
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Creates a linear spring, connecting two bodies. A spring can have a resting length, a stiffness and damping.
*
* @class Phaser.Physics.P2.Spring
* @constructor
* @param ***REMOVED***Phaser.Physics.P2***REMOVED*** world - A reference to the P2 World.
* @param ***REMOVED***p2.Body***REMOVED*** bodyA - First connected body.
* @param ***REMOVED***p2.Body***REMOVED*** bodyB - Second connected body.
* @param ***REMOVED***number***REMOVED*** [restLength=1] - Rest length of the spring. A number > 0.
* @param ***REMOVED***number***REMOVED*** [stiffness=100] - Stiffness of the spring. A number >= 0.
* @param ***REMOVED***number***REMOVED*** [damping=1] - Damping of the spring. A number >= 0.
* @param ***REMOVED***Array***REMOVED*** [worldA] - Where to hook the spring to body A in world coordinates. This value is an array with 2 elements matching x and y, i.e: [32, 32].
* @param ***REMOVED***Array***REMOVED*** [worldB] - Where to hook the spring to body B in world coordinates. This value is an array with 2 elements matching x and y, i.e: [32, 32].
* @param ***REMOVED***Array***REMOVED*** [localA] - Where to hook the spring to body A in local body coordinates. This value is an array with 2 elements matching x and y, i.e: [32, 32].
* @param ***REMOVED***Array***REMOVED*** [localB] - Where to hook the spring to body B in local body coordinates. This value is an array with 2 elements matching x and y, i.e: [32, 32].
*/
Phaser.Physics.P2.Spring = function (world, bodyA, bodyB, restLength, stiffness, damping, worldA, worldB, localA, localB) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = world.game;

    /**
    * @property ***REMOVED***Phaser.Physics.P2***REMOVED*** world - Local reference to P2 World.
    */
    this.world = world;

    if (restLength === undefined) ***REMOVED*** restLength = 1; ***REMOVED***
    if (stiffness === undefined) ***REMOVED*** stiffness = 100; ***REMOVED***
    if (damping === undefined) ***REMOVED*** damping = 1; ***REMOVED***

    restLength = world.pxm(restLength);

    var options = ***REMOVED***
        restLength: restLength,
        stiffness: stiffness,
        damping: damping
    ***REMOVED***;

    if (typeof worldA !== 'undefined' && worldA !== null)
    ***REMOVED***
        options.worldAnchorA = [ world.pxm(worldA[0]), world.pxm(worldA[1]) ];
    ***REMOVED***

    if (typeof worldB !== 'undefined' && worldB !== null)
    ***REMOVED***
        options.worldAnchorB = [ world.pxm(worldB[0]), world.pxm(worldB[1]) ];
    ***REMOVED***

    if (typeof localA !== 'undefined' && localA !== null)
    ***REMOVED***
        options.localAnchorA = [ world.pxm(localA[0]), world.pxm(localA[1]) ];
    ***REMOVED***

    if (typeof localB !== 'undefined' && localB !== null)
    ***REMOVED***
        options.localAnchorB = [ world.pxm(localB[0]), world.pxm(localB[1]) ];
    ***REMOVED***

    /**
    * @property ***REMOVED***p2.LinearSpring***REMOVED*** data - The actual p2 spring object.
    */
    this.data = new p2.LinearSpring(bodyA, bodyB, options);

    this.data.parent = this;

***REMOVED***;

Phaser.Physics.P2.Spring.prototype.constructor = Phaser.Physics.P2.Spring;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Creates a rotational spring, connecting two bodies. A spring can have a resting length, a stiffness and damping.
*
* @class Phaser.Physics.P2.RotationalSpring
* @constructor
* @param ***REMOVED***Phaser.Physics.P2***REMOVED*** world - A reference to the P2 World.
* @param ***REMOVED***p2.Body***REMOVED*** bodyA - First connected body.
* @param ***REMOVED***p2.Body***REMOVED*** bodyB - Second connected body.
* @param ***REMOVED***number***REMOVED*** [restAngle] - The relative angle of bodies at which the spring is at rest. If not given, it's set to the current relative angle between the bodies.
* @param ***REMOVED***number***REMOVED*** [stiffness=100] - Stiffness of the spring. A number >= 0.
* @param ***REMOVED***number***REMOVED*** [damping=1] - Damping of the spring. A number >= 0.
*/
Phaser.Physics.P2.RotationalSpring = function (world, bodyA, bodyB, restAngle, stiffness, damping) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = world.game;

    /**
    * @property ***REMOVED***Phaser.Physics.P2***REMOVED*** world - Local reference to P2 World.
    */
    this.world = world;

    if (restAngle === undefined) ***REMOVED*** restAngle = null; ***REMOVED***
    if (stiffness === undefined) ***REMOVED*** stiffness = 100; ***REMOVED***
    if (damping === undefined) ***REMOVED*** damping = 1; ***REMOVED***

    if (restAngle)
    ***REMOVED***
        restAngle = world.pxm(restAngle);
    ***REMOVED***

    var options = ***REMOVED***
        restAngle: restAngle,
        stiffness: stiffness,
        damping: damping
    ***REMOVED***;

    /**
    * @property ***REMOVED***p2.RotationalSpring***REMOVED*** data - The actual p2 spring object.
    */
    this.data = new p2.RotationalSpring(bodyA, bodyB, options);

    this.data.parent = this;

***REMOVED***;

Phaser.Physics.P2.Spring.prototype.constructor = Phaser.Physics.P2.Spring;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A P2 Material.
* 
* \o/ ~ "Because I'm a Material girl"
*
* @class Phaser.Physics.P2.Material
* @constructor
* @param ***REMOVED***string***REMOVED*** name - The user defined name given to this Material.
*/
Phaser.Physics.P2.Material = function (name) ***REMOVED***

    /**
    * @property ***REMOVED***string***REMOVED*** name - The user defined name given to this Material.
    * @default
    */
    this.name = name;

    p2.Material.call(this);

***REMOVED***;

Phaser.Physics.P2.Material.prototype = Object.create(p2.Material.prototype);
Phaser.Physics.P2.Material.prototype.constructor = Phaser.Physics.P2.Material;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Defines a physics material
*
* @class Phaser.Physics.P2.ContactMaterial
* @constructor
* @param ***REMOVED***Phaser.Physics.P2.Material***REMOVED*** materialA - First material participating in the contact material.
* @param ***REMOVED***Phaser.Physics.P2.Material***REMOVED*** materialB - Second material participating in the contact material.
* @param ***REMOVED***object***REMOVED*** [options] - Additional configuration options.
*/
Phaser.Physics.P2.ContactMaterial = function (materialA, materialB, options) ***REMOVED***

	/**
	* @property ***REMOVED***number***REMOVED*** id - The contact material identifier.
	*/

	/**
	* @property ***REMOVED***Phaser.Physics.P2.Material***REMOVED*** materialA - First material participating in the contact material.
	*/

	/**
	* @property ***REMOVED***Phaser.Physics.P2.Material***REMOVED*** materialB - Second material participating in the contact material.
	*/

	/**
	* @property ***REMOVED***number***REMOVED*** [friction=0.3] - Friction to use in the contact of these two materials.
	*/

	/**
	* @property ***REMOVED***number***REMOVED*** [restitution=0.0] - Restitution to use in the contact of these two materials.
	*/

	/**
	* @property ***REMOVED***number***REMOVED*** [stiffness=1e7] - Stiffness of the resulting ContactEquation that this ContactMaterial generates.
	*/

	/**
	* @property ***REMOVED***number***REMOVED*** [relaxation=3] - Relaxation of the resulting ContactEquation that this ContactMaterial generates.
	*/

	/**
	* @property ***REMOVED***number***REMOVED*** [frictionStiffness=1e7] - Stiffness of the resulting FrictionEquation that this ContactMaterial generates.
	*/

	/**
	* @property ***REMOVED***number***REMOVED*** [frictionRelaxation=3] - Relaxation of the resulting FrictionEquation that this ContactMaterial generates.
	*/

	/**
	* @property ***REMOVED***number***REMOVED*** [surfaceVelocity=0] - Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.
	*/

    p2.ContactMaterial.call(this, materialA, materialB, options);

***REMOVED***;

Phaser.Physics.P2.ContactMaterial.prototype = Object.create(p2.ContactMaterial.prototype);
Phaser.Physics.P2.ContactMaterial.prototype.constructor = Phaser.Physics.P2.ContactMaterial;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Collision Group
*
* @class Phaser.Physics.P2.CollisionGroup
* @constructor
* @param ***REMOVED***number***REMOVED*** bitmask - The CollisionGroup bitmask.
*/
Phaser.Physics.P2.CollisionGroup = function (bitmask) ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** mask - The CollisionGroup bitmask.
    */
    this.mask = bitmask;

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A constraint that tries to keep the distance between two bodies constant.
*
* @class Phaser.Physics.P2.DistanceConstraint
* @constructor
* @param ***REMOVED***Phaser.Physics.P2***REMOVED*** world - A reference to the P2 World.
* @param ***REMOVED***p2.Body***REMOVED*** bodyA - First connected body.
* @param ***REMOVED***p2.Body***REMOVED*** bodyB - Second connected body.
* @param ***REMOVED***number***REMOVED*** distance - The distance to keep between the bodies.
* @param ***REMOVED***Array***REMOVED*** [localAnchorA] - The anchor point for bodyA, defined locally in bodyA frame. Defaults to [0,0].
* @param ***REMOVED***Array***REMOVED*** [localAnchorB] - The anchor point for bodyB, defined locally in bodyB frame. Defaults to [0,0].
* @param ***REMOVED***object***REMOVED*** [maxForce=Number.MAX_VALUE] - Maximum force to apply.
*/
Phaser.Physics.P2.DistanceConstraint = function (world, bodyA, bodyB, distance, localAnchorA, localAnchorB, maxForce) ***REMOVED***

    if (distance === undefined) ***REMOVED*** distance = 100; ***REMOVED***
    if (localAnchorA === undefined) ***REMOVED*** localAnchorA = [0, 0]; ***REMOVED***
    if (localAnchorB === undefined) ***REMOVED*** localAnchorB = [0, 0]; ***REMOVED***
    if (maxForce === undefined) ***REMOVED*** maxForce = Number.MAX_VALUE; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = world.game;

    /**
    * @property ***REMOVED***Phaser.Physics.P2***REMOVED*** world - Local reference to P2 World.
    */
    this.world = world;

    distance = world.pxm(distance);

    localAnchorA = [ world.pxmi(localAnchorA[0]), world.pxmi(localAnchorA[1]) ];
    localAnchorB = [ world.pxmi(localAnchorB[0]), world.pxmi(localAnchorB[1]) ];

    var options = ***REMOVED*** distance: distance, localAnchorA: localAnchorA, localAnchorB: localAnchorB, maxForce: maxForce ***REMOVED***;

    p2.DistanceConstraint.call(this, bodyA, bodyB, options);

***REMOVED***;

Phaser.Physics.P2.DistanceConstraint.prototype = Object.create(p2.DistanceConstraint.prototype);
Phaser.Physics.P2.DistanceConstraint.prototype.constructor = Phaser.Physics.P2.DistanceConstraint;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Connects two bodies at given offset points, letting them rotate relative to each other around this point.
*
* @class Phaser.Physics.P2.GearConstraint
* @constructor
* @param ***REMOVED***Phaser.Physics.P2***REMOVED*** world - A reference to the P2 World.
* @param ***REMOVED***p2.Body***REMOVED*** bodyA - First connected body.
* @param ***REMOVED***p2.Body***REMOVED*** bodyB - Second connected body.
* @param ***REMOVED***number***REMOVED*** [angle=0] - The relative angle
* @param ***REMOVED***number***REMOVED*** [ratio=1] - The gear ratio.
*/
Phaser.Physics.P2.GearConstraint = function (world, bodyA, bodyB, angle, ratio) ***REMOVED***

    if (angle === undefined) ***REMOVED*** angle = 0; ***REMOVED***
    if (ratio === undefined) ***REMOVED*** ratio = 1; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = world.game;

    /**
    * @property ***REMOVED***Phaser.Physics.P2***REMOVED*** world - Local reference to P2 World.
    */
    this.world = world;

    var options = ***REMOVED*** angle: angle, ratio: ratio ***REMOVED***;

    p2.GearConstraint.call(this, bodyA, bodyB, options);

***REMOVED***;

Phaser.Physics.P2.GearConstraint.prototype = Object.create(p2.GearConstraint.prototype);
Phaser.Physics.P2.GearConstraint.prototype.constructor = Phaser.Physics.P2.GearConstraint;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Locks the relative position between two bodies.
*
* @class Phaser.Physics.P2.LockConstraint
* @constructor
* @param ***REMOVED***Phaser.Physics.P2***REMOVED*** world - A reference to the P2 World.
* @param ***REMOVED***p2.Body***REMOVED*** bodyA - First connected body.
* @param ***REMOVED***p2.Body***REMOVED*** bodyB - Second connected body.
* @param ***REMOVED***Array***REMOVED*** [offset] - The offset of bodyB in bodyA's frame. The value is an array with 2 elements matching x and y, i.e: [32, 32].
* @param ***REMOVED***number***REMOVED*** [angle=0] - The angle of bodyB in bodyA's frame.
* @param ***REMOVED***number***REMOVED*** [maxForce] - The maximum force that should be applied to constrain the bodies.
*/
Phaser.Physics.P2.LockConstraint = function (world, bodyA, bodyB, offset, angle, maxForce) ***REMOVED***

    if (offset === undefined) ***REMOVED*** offset = [0, 0]; ***REMOVED***
    if (angle === undefined) ***REMOVED*** angle = 0; ***REMOVED***
    if (maxForce === undefined) ***REMOVED*** maxForce = Number.MAX_VALUE; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = world.game;

    /**
    * @property ***REMOVED***Phaser.Physics.P2***REMOVED*** world - Local reference to P2 World.
    */
    this.world = world;

    offset = [ world.pxm(offset[0]), world.pxm(offset[1]) ];

    var options = ***REMOVED*** localOffsetB: offset, localAngleB: angle, maxForce: maxForce ***REMOVED***;

    p2.LockConstraint.call(this, bodyA, bodyB, options);

***REMOVED***;

Phaser.Physics.P2.LockConstraint.prototype = Object.create(p2.LockConstraint.prototype);
Phaser.Physics.P2.LockConstraint.prototype.constructor = Phaser.Physics.P2.LockConstraint;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Connects two bodies at given offset points, letting them rotate relative to each other around this point.
*
* @class Phaser.Physics.P2.PrismaticConstraint
* @constructor
* @param ***REMOVED***Phaser.Physics.P2***REMOVED*** world - A reference to the P2 World.
* @param ***REMOVED***p2.Body***REMOVED*** bodyA - First connected body.
* @param ***REMOVED***p2.Body***REMOVED*** bodyB - Second connected body.
* @param ***REMOVED***boolean***REMOVED*** [lockRotation=true] - If set to false, bodyB will be free to rotate around its anchor point.
* @param ***REMOVED***Array***REMOVED*** [anchorA] - Body A's anchor point, defined in its own local frame. The value is an array with 2 elements matching x and y, i.e: [32, 32].
* @param ***REMOVED***Array***REMOVED*** [anchorB] - Body A's anchor point, defined in its own local frame. The value is an array with 2 elements matching x and y, i.e: [32, 32].
* @param ***REMOVED***Array***REMOVED*** [axis] - An axis, defined in body A frame, that body B's anchor point may slide along. The value is an array with 2 elements matching x and y, i.e: [32, 32].
* @param ***REMOVED***number***REMOVED*** [maxForce] - The maximum force that should be applied to constrain the bodies.
*/
Phaser.Physics.P2.PrismaticConstraint = function (world, bodyA, bodyB, lockRotation, anchorA, anchorB, axis, maxForce) ***REMOVED***

    if (lockRotation === undefined) ***REMOVED*** lockRotation = true; ***REMOVED***
    if (anchorA === undefined) ***REMOVED*** anchorA = [0, 0]; ***REMOVED***
    if (anchorB === undefined) ***REMOVED*** anchorB = [0, 0]; ***REMOVED***
    if (axis === undefined) ***REMOVED*** axis = [0, 0]; ***REMOVED***
    if (maxForce === undefined) ***REMOVED*** maxForce = Number.MAX_VALUE; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = world.game;

    /**
    * @property ***REMOVED***Phaser.Physics.P2***REMOVED*** world - Local reference to P2 World.
    */
    this.world = world;

    anchorA = [ world.pxmi(anchorA[0]), world.pxmi(anchorA[1]) ];
    anchorB = [ world.pxmi(anchorB[0]), world.pxmi(anchorB[1]) ];

    var options = ***REMOVED*** localAnchorA: anchorA, localAnchorB: anchorB, localAxisA: axis, maxForce: maxForce, disableRotationalLock: !lockRotation ***REMOVED***;

    p2.PrismaticConstraint.call(this, bodyA, bodyB, options);

***REMOVED***;

Phaser.Physics.P2.PrismaticConstraint.prototype = Object.create(p2.PrismaticConstraint.prototype);
Phaser.Physics.P2.PrismaticConstraint.prototype.constructor = Phaser.Physics.P2.PrismaticConstraint;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Connects two bodies at given offset points, letting them rotate relative to each other around this point.
* The pivot points are given in world (pixel) coordinates.
*
* @class Phaser.Physics.P2.RevoluteConstraint
* @constructor
* @param ***REMOVED***Phaser.Physics.P2***REMOVED*** world - A reference to the P2 World.
* @param ***REMOVED***p2.Body***REMOVED*** bodyA - First connected body.
* @param ***REMOVED***Float32Array***REMOVED*** pivotA - The point relative to the center of mass of bodyA which bodyA is constrained to. The value is an array with 2 elements matching x and y, i.e: [32, 32].
* @param ***REMOVED***p2.Body***REMOVED*** bodyB - Second connected body.
* @param ***REMOVED***Float32Array***REMOVED*** pivotB - The point relative to the center of mass of bodyB which bodyB is constrained to. The value is an array with 2 elements matching x and y, i.e: [32, 32].
* @param ***REMOVED***number***REMOVED*** [maxForce=0] - The maximum force that should be applied to constrain the bodies.
* @param ***REMOVED***Float32Array***REMOVED*** [worldPivot=null] - A pivot point given in world coordinates. If specified, localPivotA and localPivotB are automatically computed from this value.
*/
Phaser.Physics.P2.RevoluteConstraint = function (world, bodyA, pivotA, bodyB, pivotB, maxForce, worldPivot) ***REMOVED***

    if (maxForce === undefined) ***REMOVED*** maxForce = Number.MAX_VALUE; ***REMOVED***
    if (worldPivot === undefined) ***REMOVED*** worldPivot = null; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = world.game;

    /**
    * @property ***REMOVED***Phaser.Physics.P2***REMOVED*** world - Local reference to P2 World.
    */
    this.world = world;

    pivotA = [ world.pxmi(pivotA[0]), world.pxmi(pivotA[1]) ];
    pivotB = [ world.pxmi(pivotB[0]), world.pxmi(pivotB[1]) ];

    if (worldPivot)
    ***REMOVED***
        worldPivot = [ world.pxmi(worldPivot[0]), world.pxmi(worldPivot[1]) ];
    ***REMOVED***

    var options = ***REMOVED*** worldPivot: worldPivot, localPivotA: pivotA, localPivotB: pivotB, maxForce: maxForce ***REMOVED***;

    p2.RevoluteConstraint.call(this, bodyA, bodyB, options);

***REMOVED***;

Phaser.Physics.P2.RevoluteConstraint.prototype = Object.create(p2.RevoluteConstraint.prototype);
Phaser.Physics.P2.RevoluteConstraint.prototype.constructor = Phaser.Physics.P2.RevoluteConstraint;
