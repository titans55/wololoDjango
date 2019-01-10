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
