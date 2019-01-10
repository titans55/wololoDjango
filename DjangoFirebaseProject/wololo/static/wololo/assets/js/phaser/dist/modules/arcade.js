/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Arcade Physics world. Contains Arcade Physics related collision, overlap and motion methods.
*
* @class Phaser.Physics.Arcade
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - reference to the current game instance.
*/
Phaser.Physics.Arcade = function (game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** gravity - The World gravity setting. Defaults to x: 0, y: 0, or no gravity.
    */
    this.gravity = new Phaser.Point();

    /**
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** bounds - The bounds inside of which the physics world exists. Defaults to match the world bounds.
    */
    this.bounds = new Phaser.Rectangle(0, 0, game.world.width, game.world.height);

    /**
    * Set the checkCollision properties to control for which bounds collision is processed.
    * For example checkCollision.down = false means Bodies cannot collide with the World.bounds.bottom.
    * @property ***REMOVED***object***REMOVED*** checkCollision - An object containing allowed collision flags.
    */
    this.checkCollision = ***REMOVED*** up: true, down: true, left: true, right: true ***REMOVED***;

    /**
    * @property ***REMOVED***number***REMOVED*** maxObjects - Used by the QuadTree to set the maximum number of objects per quad.
    */
    this.maxObjects = 10;

    /**
    * @property ***REMOVED***number***REMOVED*** maxLevels - Used by the QuadTree to set the maximum number of iteration levels.
    */
    this.maxLevels = 4;

    /**
    * @property ***REMOVED***number***REMOVED*** OVERLAP_BIAS - A value added to the delta values during collision checks.
    */
    this.OVERLAP_BIAS = 4;

    /**
    * @property ***REMOVED***boolean***REMOVED*** forceX - If true World.separate will always separate on the X axis before Y. Otherwise it will check gravity totals first.
    */
    this.forceX = false;

    /**
    * @property ***REMOVED***number***REMOVED*** sortDirection - Used when colliding a Sprite vs. a Group, or a Group vs. a Group, this defines the direction the sort is based on. Default is Phaser.Physics.Arcade.LEFT_RIGHT.
    * @default
    */
    this.sortDirection = Phaser.Physics.Arcade.LEFT_RIGHT;

    /**
    * @property ***REMOVED***boolean***REMOVED*** skipQuadTree - If true the QuadTree will not be used for any collision. QuadTrees are great if objects are well spread out in your game, otherwise they are a performance hit. If you enable this you can disable on a per body basis via `Body.skipQuadTree`.
    */
    this.skipQuadTree = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isPaused - If `true` the `Body.preUpdate` method will be skipped, halting all motion for all bodies. Note that other methods such as `collide` will still work, so be careful not to call them on paused bodies.
    */
    this.isPaused = false;

    /**
    * @property ***REMOVED***Phaser.QuadTree***REMOVED*** quadTree - The world QuadTree.
    */
    this.quadTree = new Phaser.QuadTree(this.game.world.bounds.x, this.game.world.bounds.y, this.game.world.bounds.width, this.game.world.bounds.height, this.maxObjects, this.maxLevels);

    /**
    * @property ***REMOVED***number***REMOVED*** _total - Internal cache var.
    * @private
    */
    this._total = 0;

    // By default we want the bounds the same size as the world bounds
    this.setBoundsToWorld();

***REMOVED***;

Phaser.Physics.Arcade.prototype.constructor = Phaser.Physics.Arcade;

/**
* A constant used for the sortDirection value.
* Use this if you don't wish to perform any pre-collision sorting at all, or will manually sort your Groups.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Physics.Arcade.SORT_NONE = 0;

/**
* A constant used for the sortDirection value.
* Use this if your game world is wide but short and scrolls from the left to the right (i.e. Mario)
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Physics.Arcade.LEFT_RIGHT = 1;

/**
* A constant used for the sortDirection value.
* Use this if your game world is wide but short and scrolls from the right to the left (i.e. Mario backwards)
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Physics.Arcade.RIGHT_LEFT = 2;

/**
* A constant used for the sortDirection value.
* Use this if your game world is narrow but tall and scrolls from the top to the bottom (i.e. Dig Dug)
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Physics.Arcade.TOP_BOTTOM = 3;

/**
* A constant used for the sortDirection value.
* Use this if your game world is narrow but tall and scrolls from the bottom to the top (i.e. Commando or a vertically scrolling shoot-em-up)
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Physics.Arcade.BOTTOM_TOP = 4;

Phaser.Physics.Arcade.prototype = ***REMOVED***

    /**
    * Updates the size of this physics world.
    *
    * @method Phaser.Physics.Arcade#setBounds
    * @param ***REMOVED***number***REMOVED*** x - Top left most corner of the world.
    * @param ***REMOVED***number***REMOVED*** y - Top left most corner of the world.
    * @param ***REMOVED***number***REMOVED*** width - New width of the world. Can never be smaller than the Game.width.
    * @param ***REMOVED***number***REMOVED*** height - New height of the world. Can never be smaller than the Game.height.
    */
    setBounds: function (x, y, width, height) ***REMOVED***

        this.bounds.setTo(x, y, width, height);

    ***REMOVED***,

    /**
    * Updates the size of this physics world to match the size of the game world.
    *
    * @method Phaser.Physics.Arcade#setBoundsToWorld
    */
    setBoundsToWorld: function () ***REMOVED***

        this.bounds.copyFrom(this.game.world.bounds);

    ***REMOVED***,

    /**
    * This will create an Arcade Physics body on the given game object or array of game objects.
    * A game object can only have 1 physics body active at any one time, and it can't be changed until the object is destroyed.
    *
    * @method Phaser.Physics.Arcade#enable
    * @param ***REMOVED***object|array|Phaser.Group***REMOVED*** object - The game object to create the physics body on. Can also be an array or Group of objects, a body will be created on every child that has a `body` property.
    * @param ***REMOVED***boolean***REMOVED*** [children=true] - Should a body be created on all children of this object? If true it will recurse down the display list as far as it can go.
    */
    enable: function (object, children) ***REMOVED***

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
                    this.enable(object[i].children, children);
                ***REMOVED***
                else
                ***REMOVED***
                    this.enableBody(object[i]);

                    if (children && object[i].hasOwnProperty('children') && object[i].children.length > 0)
                    ***REMOVED***
                        this.enable(object[i], true);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (object instanceof Phaser.Group)
            ***REMOVED***
                //  If it's a Group then we do it on the children regardless
                this.enable(object.children, children);
            ***REMOVED***
            else
            ***REMOVED***
                this.enableBody(object);

                if (children && object.hasOwnProperty('children') && object.children.length > 0)
                ***REMOVED***
                    this.enable(object.children, true);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Creates an Arcade Physics body on the given game object.
    * 
    * A game object can only have 1 physics body active at any one time, and it can't be changed until the body is nulled.
    *
    * When you add an Arcade Physics body to an object it will automatically add the object into its parent Groups hash array.
    *
    * @method Phaser.Physics.Arcade#enableBody
    * @param ***REMOVED***object***REMOVED*** object - The game object to create the physics body on. A body will only be created if this object has a null `body` property.
    */
    enableBody: function (object) ***REMOVED***

        if (object.hasOwnProperty('body') && object.body === null)
        ***REMOVED***
            object.body = new Phaser.Physics.Arcade.Body(object);

            if (object.parent && object.parent instanceof Phaser.Group)
            ***REMOVED***
                object.parent.addToHash(object);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called automatically by a Physics body, it updates all motion related values on the Body unless `World.isPaused` is `true`.
    *
    * @method Phaser.Physics.Arcade#updateMotion
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** The Body object to be updated.
    */
    updateMotion: function (body) ***REMOVED***

        var velocityDelta = this.computeVelocity(0, body, body.angularVelocity, body.angularAcceleration, body.angularDrag, body.maxAngular) - body.angularVelocity;
        body.angularVelocity += velocityDelta;
        body.rotation += (body.angularVelocity * this.game.time.physicsElapsed);

        body.velocity.x = this.computeVelocity(1, body, body.velocity.x, body.acceleration.x, body.drag.x, body.maxVelocity.x);
        body.velocity.y = this.computeVelocity(2, body, body.velocity.y, body.acceleration.y, body.drag.y, body.maxVelocity.y);

    ***REMOVED***,

    /**
    * A tween-like function that takes a starting velocity and some other factors and returns an altered velocity.
    * Based on a function in Flixel by @ADAMATOMIC
    *
    * @method Phaser.Physics.Arcade#computeVelocity
    * @param ***REMOVED***number***REMOVED*** axis - 0 for nothing, 1 for horizontal, 2 for vertical.
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body - The Body object to be updated.
    * @param ***REMOVED***number***REMOVED*** velocity - Any component of velocity (e.g. 20).
    * @param ***REMOVED***number***REMOVED*** acceleration - Rate at which the velocity is changing.
    * @param ***REMOVED***number***REMOVED*** drag - Really kind of a deceleration, this is how much the velocity changes if Acceleration is not set.
    * @param ***REMOVED***number***REMOVED*** [max=10000] - An absolute value cap for the velocity.
    * @return ***REMOVED***number***REMOVED*** The altered Velocity value.
    */
    computeVelocity: function (axis, body, velocity, acceleration, drag, max) ***REMOVED***

        if (max === undefined) ***REMOVED*** max = 10000; ***REMOVED***

        if (axis === 1 && body.allowGravity)
        ***REMOVED***
            velocity += (this.gravity.x + body.gravity.x) * this.game.time.physicsElapsed;
        ***REMOVED***
        else if (axis === 2 && body.allowGravity)
        ***REMOVED***
            velocity += (this.gravity.y + body.gravity.y) * this.game.time.physicsElapsed;
        ***REMOVED***

        if (acceleration)
        ***REMOVED***
            velocity += acceleration * this.game.time.physicsElapsed;
        ***REMOVED***
        else if (drag)
        ***REMOVED***
            drag *= this.game.time.physicsElapsed;

            if (velocity - drag > 0)
            ***REMOVED***
                velocity -= drag;
            ***REMOVED***
            else if (velocity + drag < 0)
            ***REMOVED***
                velocity += drag;
            ***REMOVED***
            else
            ***REMOVED***
                velocity = 0;
            ***REMOVED***
        ***REMOVED***

        if (velocity > max)
        ***REMOVED***
            velocity = max;
        ***REMOVED***
        else if (velocity < -max)
        ***REMOVED***
            velocity = -max;
        ***REMOVED***

        return velocity;

    ***REMOVED***,

    /**
    * Checks for overlaps between two game objects. The objects can be Sprites, Groups or Emitters.
    * You can perform Sprite vs. Sprite, Sprite vs. Group and Group vs. Group overlap checks.
    * Unlike collide the objects are NOT automatically separated or have any physics applied, they merely test for overlap results.
    * Both the first and second parameter can be arrays of objects, of differing types.
    * If two arrays are passed, the contents of the first parameter will be tested against all contents of the 2nd parameter.
    * NOTE: This function is not recursive, and will not test against children of objects passed (i.e. Groups within Groups).
    *
    * @method Phaser.Physics.Arcade#overlap
    * @param ***REMOVED***Phaser.Sprite|Phaser.Group|Phaser.Particles.Emitter|array***REMOVED*** object1 - The first object or array of objects to check. Can be Phaser.Sprite, Phaser.Group or Phaser.Particles.Emitter.
    * @param ***REMOVED***Phaser.Sprite|Phaser.Group|Phaser.Particles.Emitter|array***REMOVED*** object2 - The second object or array of objects to check. Can be Phaser.Sprite, Phaser.Group or Phaser.Particles.Emitter.
    * @param ***REMOVED***function***REMOVED*** [overlapCallback=null] - An optional callback function that is called if the objects overlap. The two objects will be passed to this function in the same order in which you specified them, unless you are checking Group vs. Sprite, in which case Sprite will always be the first parameter.
    * @param ***REMOVED***function***REMOVED*** [processCallback=null] - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then `overlapCallback` will only be called if this callback returns `true`.
    * @param ***REMOVED***object***REMOVED*** [callbackContext] - The context in which to run the callbacks.
    * @return ***REMOVED***boolean***REMOVED*** True if an overlap occurred otherwise false.
    */
    overlap: function (object1, object2, overlapCallback, processCallback, callbackContext) ***REMOVED***

        overlapCallback = overlapCallback || null;
        processCallback = processCallback || null;
        callbackContext = callbackContext || overlapCallback;

        this._total = 0;

        if (!Array.isArray(object1) && Array.isArray(object2))
        ***REMOVED***
            for (var i = 0; i < object2.length; i++)
            ***REMOVED***
                this.collideHandler(object1, object2[i], overlapCallback, processCallback, callbackContext, true);
            ***REMOVED***
        ***REMOVED***
        else if (Array.isArray(object1) && !Array.isArray(object2))
        ***REMOVED***
            for (var i = 0; i < object1.length; i++)
            ***REMOVED***
                this.collideHandler(object1[i], object2, overlapCallback, processCallback, callbackContext, true);
            ***REMOVED***
        ***REMOVED***
        else if (Array.isArray(object1) && Array.isArray(object2))
        ***REMOVED***
            for (var i = 0; i < object1.length; i++)
            ***REMOVED***
                for (var j = 0; j < object2.length; j++)
                ***REMOVED***
                    this.collideHandler(object1[i], object2[j], overlapCallback, processCallback, callbackContext, true);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            this.collideHandler(object1, object2, overlapCallback, processCallback, callbackContext, true);
        ***REMOVED***

        return (this._total > 0);

    ***REMOVED***,

    /**
    * Checks for collision between two game objects. You can perform Sprite vs. Sprite, Sprite vs. Group, Group vs. Group, Sprite vs. Tilemap Layer or Group vs. Tilemap Layer collisions.
    * Both the first and second parameter can be arrays of objects, of differing types.
    * If two arrays are passed, the contents of the first parameter will be tested against all contents of the 2nd parameter.
    * The objects are also automatically separated. If you don't require separation then use ArcadePhysics.overlap instead.
    * An optional processCallback can be provided. If given this function will be called when two sprites are found to be colliding. It is called before any separation takes place,
    * giving you the chance to perform additional checks. If the function returns true then the collision and separation is carried out. If it returns false it is skipped.
    * The collideCallback is an optional function that is only called if two sprites collide. If a processCallback has been set then it needs to return true for collideCallback to be called.
    * NOTE: This function is not recursive, and will not test against children of objects passed (i.e. Groups or Tilemaps within other Groups).
    *
    * @method Phaser.Physics.Arcade#collide
    * @param ***REMOVED***Phaser.Sprite|Phaser.Group|Phaser.Particles.Emitter|Phaser.TilemapLayer|array***REMOVED*** object1 - The first object or array of objects to check. Can be Phaser.Sprite, Phaser.Group, Phaser.Particles.Emitter, or Phaser.TilemapLayer.
    * @param ***REMOVED***Phaser.Sprite|Phaser.Group|Phaser.Particles.Emitter|Phaser.TilemapLayer|array***REMOVED*** object2 - The second object or array of objects to check. Can be Phaser.Sprite, Phaser.Group, Phaser.Particles.Emitter or Phaser.TilemapLayer.
    * @param ***REMOVED***function***REMOVED*** [collideCallback=null] - An optional callback function that is called if the objects collide. The two objects will be passed to this function in the same order in which you specified them, unless you are colliding Group vs. Sprite, in which case Sprite will always be the first parameter.
    * @param ***REMOVED***function***REMOVED*** [processCallback=null] - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then collision will only happen if processCallback returns true. The two objects will be passed to this function in the same order in which you specified them, unless you are colliding Group vs. Sprite, in which case Sprite will always be the first parameter.
    * @param ***REMOVED***object***REMOVED*** [callbackContext] - The context in which to run the callbacks.
    * @return ***REMOVED***boolean***REMOVED*** True if a collision occurred otherwise false.
    */
    collide: function (object1, object2, collideCallback, processCallback, callbackContext) ***REMOVED***

        collideCallback = collideCallback || null;
        processCallback = processCallback || null;
        callbackContext = callbackContext || collideCallback;

        this._total = 0;

        if (!Array.isArray(object1) && Array.isArray(object2))
        ***REMOVED***
            for (var i = 0; i < object2.length; i++)
            ***REMOVED***
                this.collideHandler(object1, object2[i], collideCallback, processCallback, callbackContext, false);
            ***REMOVED***
        ***REMOVED***
        else if (Array.isArray(object1) && !Array.isArray(object2))
        ***REMOVED***
            for (var i = 0; i < object1.length; i++)
            ***REMOVED***
                this.collideHandler(object1[i], object2, collideCallback, processCallback, callbackContext, false);
            ***REMOVED***
        ***REMOVED***
        else if (Array.isArray(object1) && Array.isArray(object2))
        ***REMOVED***
            for (var i = 0; i < object1.length; i++)
            ***REMOVED***
                for (var j = 0; j < object2.length; j++)
                ***REMOVED***
                    this.collideHandler(object1[i], object2[j], collideCallback, processCallback, callbackContext, false);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            this.collideHandler(object1, object2, collideCallback, processCallback, callbackContext, false);
        ***REMOVED***

        return (this._total > 0);

    ***REMOVED***,

    /**
     * A Sort function for sorting two bodies based on a LEFT to RIGHT sort direction.
     *
     * This is called automatically by World.sort
     *
     * @method Phaser.Physics.Arcade#sortLeftRight
     * @param ***REMOVED***Phaser.Sprite***REMOVED*** a - The first Sprite to test. The Sprite must have an Arcade Physics Body.
     * @param ***REMOVED***Phaser.Sprite***REMOVED*** b - The second Sprite to test. The Sprite must have an Arcade Physics Body.
     * @return ***REMOVED***integer***REMOVED*** A negative value if `a > b`, a positive value if `a < b` or 0 if `a === b` or the bodies are invalid.
     */
    sortLeftRight: function (a, b) ***REMOVED***

        if (!a.body || !b.body)
        ***REMOVED***
            return 0;
        ***REMOVED***

        return a.body.x - b.body.x;

    ***REMOVED***,

    /**
     * A Sort function for sorting two bodies based on a RIGHT to LEFT sort direction.
     *
     * This is called automatically by World.sort
     *
     * @method Phaser.Physics.Arcade#sortRightLeft
     * @param ***REMOVED***Phaser.Sprite***REMOVED*** a - The first Sprite to test. The Sprite must have an Arcade Physics Body.
     * @param ***REMOVED***Phaser.Sprite***REMOVED*** b - The second Sprite to test. The Sprite must have an Arcade Physics Body.
     * @return ***REMOVED***integer***REMOVED*** A negative value if `a > b`, a positive value if `a < b` or 0 if `a === b` or the bodies are invalid.
     */
    sortRightLeft: function (a, b) ***REMOVED***

        if (!a.body || !b.body)
        ***REMOVED***
            return 0;
        ***REMOVED***

        return b.body.x - a.body.x;

    ***REMOVED***,

    /**
     * A Sort function for sorting two bodies based on a TOP to BOTTOM sort direction.
     *
     * This is called automatically by World.sort
     *
     * @method Phaser.Physics.Arcade#sortTopBottom
     * @param ***REMOVED***Phaser.Sprite***REMOVED*** a - The first Sprite to test. The Sprite must have an Arcade Physics Body.
     * @param ***REMOVED***Phaser.Sprite***REMOVED*** b - The second Sprite to test. The Sprite must have an Arcade Physics Body.
     * @return ***REMOVED***integer***REMOVED*** A negative value if `a > b`, a positive value if `a < b` or 0 if `a === b` or the bodies are invalid.
     */
    sortTopBottom: function (a, b) ***REMOVED***

        if (!a.body || !b.body)
        ***REMOVED***
            return 0;
        ***REMOVED***

        return a.body.y - b.body.y;

    ***REMOVED***,

    /**
     * A Sort function for sorting two bodies based on a BOTTOM to TOP sort direction.
     *
     * This is called automatically by World.sort
     *
     * @method Phaser.Physics.Arcade#sortBottomTop
     * @param ***REMOVED***Phaser.Sprite***REMOVED*** a - The first Sprite to test. The Sprite must have an Arcade Physics Body.
     * @param ***REMOVED***Phaser.Sprite***REMOVED*** b - The second Sprite to test. The Sprite must have an Arcade Physics Body.
     * @return ***REMOVED***integer***REMOVED*** A negative value if `a > b`, a positive value if `a < b` or 0 if `a === b` or the bodies are invalid.
     */
    sortBottomTop: function (a, b) ***REMOVED***

        if (!a.body || !b.body)
        ***REMOVED***
            return 0;
        ***REMOVED***

        return b.body.y - a.body.y;

    ***REMOVED***,

    /**
     * This method will sort a Groups hash array.
     *
     * If the Group has `physicsSortDirection` set it will use the sort direction defined.
     *
     * Otherwise if the sortDirection parameter is undefined, or Group.physicsSortDirection is null, it will use Phaser.Physics.Arcade.sortDirection.
     *
     * By changing Group.physicsSortDirection you can customise each Group to sort in a different order.
     *
     * @method Phaser.Physics.Arcade#sort
     * @param ***REMOVED***Phaser.Group***REMOVED*** group - The Group to sort.
     * @param ***REMOVED***integer***REMOVED*** [sortDirection] - The sort direction used to sort this Group.
     */
    sort: function (group, sortDirection) ***REMOVED***

        if (group.physicsSortDirection !== null)
        ***REMOVED***
            sortDirection = group.physicsSortDirection;
        ***REMOVED***
        else
        ***REMOVED***
            if (sortDirection === undefined) ***REMOVED*** sortDirection = this.sortDirection; ***REMOVED***
        ***REMOVED***

        if (sortDirection === Phaser.Physics.Arcade.LEFT_RIGHT)
        ***REMOVED***
            //  Game world is say 2000x600 and you start at 0
            group.hash.sort(this.sortLeftRight);
        ***REMOVED***
        else if (sortDirection === Phaser.Physics.Arcade.RIGHT_LEFT)
        ***REMOVED***
            //  Game world is say 2000x600 and you start at 2000
            group.hash.sort(this.sortRightLeft);
        ***REMOVED***
        else if (sortDirection === Phaser.Physics.Arcade.TOP_BOTTOM)
        ***REMOVED***
            //  Game world is say 800x2000 and you start at 0
            group.hash.sort(this.sortTopBottom);
        ***REMOVED***
        else if (sortDirection === Phaser.Physics.Arcade.BOTTOM_TOP)
        ***REMOVED***
            //  Game world is say 800x2000 and you start at 2000
            group.hash.sort(this.sortBottomTop);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal collision handler.
    *
    * @method Phaser.Physics.Arcade#collideHandler
    * @private
    * @param ***REMOVED***Phaser.Sprite|Phaser.Group|Phaser.Particles.Emitter|Phaser.TilemapLayer***REMOVED*** object1 - The first object to check. Can be an instance of Phaser.Sprite, Phaser.Group, Phaser.Particles.Emitter, or Phaser.TilemapLayer.
    * @param ***REMOVED***Phaser.Sprite|Phaser.Group|Phaser.Particles.Emitter|Phaser.TilemapLayer***REMOVED*** object2 - The second object to check. Can be an instance of Phaser.Sprite, Phaser.Group, Phaser.Particles.Emitter or Phaser.TilemapLayer. Can also be an array of objects to check.
    * @param ***REMOVED***function***REMOVED*** collideCallback - An optional callback function that is called if the objects collide. The two objects will be passed to this function in the same order in which you specified them.
    * @param ***REMOVED***function***REMOVED*** processCallback - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then collision will only happen if processCallback returns true. The two objects will be passed to this function in the same order in which you specified them.
    * @param ***REMOVED***object***REMOVED*** callbackContext - The context in which to run the callbacks.
    * @param ***REMOVED***boolean***REMOVED*** overlapOnly - Just run an overlap or a full collision.
    */
    collideHandler: function (object1, object2, collideCallback, processCallback, callbackContext, overlapOnly) ***REMOVED***

        //  Only collide valid objects
        if (object2 === undefined && object1.physicsType === Phaser.GROUP)
        ***REMOVED***
            this.sort(object1);
            this.collideGroupVsSelf(object1, collideCallback, processCallback, callbackContext, overlapOnly);
            return;
        ***REMOVED***

        //  If neither of the objects are set or exist then bail out
        if (!object1 || !object2 || !object1.exists || !object2.exists)
        ***REMOVED***
            return;
        ***REMOVED***

        //  Groups? Sort them
        if (this.sortDirection !== Phaser.Physics.Arcade.SORT_NONE)
        ***REMOVED***
            if (object1.physicsType === Phaser.GROUP)
            ***REMOVED***
                this.sort(object1);
            ***REMOVED***

            if (object2.physicsType === Phaser.GROUP)
            ***REMOVED***
                this.sort(object2);
            ***REMOVED***
        ***REMOVED***

        //  SPRITES
        if (object1.physicsType === Phaser.SPRITE)
        ***REMOVED***
            if (object2.physicsType === Phaser.SPRITE)
            ***REMOVED***
                this.collideSpriteVsSprite(object1, object2, collideCallback, processCallback, callbackContext, overlapOnly);
            ***REMOVED***
            else if (object2.physicsType === Phaser.GROUP)
            ***REMOVED***
                this.collideSpriteVsGroup(object1, object2, collideCallback, processCallback, callbackContext, overlapOnly);
            ***REMOVED***
            else if (object2.physicsType === Phaser.TILEMAPLAYER)
            ***REMOVED***
                this.collideSpriteVsTilemapLayer(object1, object2, collideCallback, processCallback, callbackContext, overlapOnly);
            ***REMOVED***
        ***REMOVED***
        //  GROUPS
        else if (object1.physicsType === Phaser.GROUP)
        ***REMOVED***
            if (object2.physicsType === Phaser.SPRITE)
            ***REMOVED***
                this.collideSpriteVsGroup(object2, object1, collideCallback, processCallback, callbackContext, overlapOnly);
            ***REMOVED***
            else if (object2.physicsType === Phaser.GROUP)
            ***REMOVED***
                this.collideGroupVsGroup(object1, object2, collideCallback, processCallback, callbackContext, overlapOnly);
            ***REMOVED***
            else if (object2.physicsType === Phaser.TILEMAPLAYER)
            ***REMOVED***
                this.collideGroupVsTilemapLayer(object1, object2, collideCallback, processCallback, callbackContext, overlapOnly);
            ***REMOVED***
        ***REMOVED***
        //  TILEMAP LAYERS
        else if (object1.physicsType === Phaser.TILEMAPLAYER)
        ***REMOVED***
            if (object2.physicsType === Phaser.SPRITE)
            ***REMOVED***
                this.collideSpriteVsTilemapLayer(object2, object1, collideCallback, processCallback, callbackContext, overlapOnly);
            ***REMOVED***
            else if (object2.physicsType === Phaser.GROUP)
            ***REMOVED***
                this.collideGroupVsTilemapLayer(object2, object1, collideCallback, processCallback, callbackContext, overlapOnly);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * An internal function. Use Phaser.Physics.Arcade.collide instead.
    *
    * @method Phaser.Physics.Arcade#collideSpriteVsSprite
    * @private
    * @param ***REMOVED***Phaser.Sprite***REMOVED*** sprite1 - The first sprite to check.
    * @param ***REMOVED***Phaser.Sprite***REMOVED*** sprite2 - The second sprite to check.
    * @param ***REMOVED***function***REMOVED*** collideCallback - An optional callback function that is called if the objects collide. The two objects will be passed to this function in the same order in which you specified them.
    * @param ***REMOVED***function***REMOVED*** processCallback - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then collision will only happen if processCallback returns true. The two objects will be passed to this function in the same order in which you specified them.
    * @param ***REMOVED***object***REMOVED*** callbackContext - The context in which to run the callbacks.
    * @param ***REMOVED***boolean***REMOVED*** overlapOnly - Just run an overlap or a full collision.
    * @return ***REMOVED***boolean***REMOVED*** True if there was a collision, otherwise false.
    */
    collideSpriteVsSprite: function (sprite1, sprite2, collideCallback, processCallback, callbackContext, overlapOnly) ***REMOVED***

        if (!sprite1.body || !sprite2.body)
        ***REMOVED***
            return false;
        ***REMOVED***

        if (this.separate(sprite1.body, sprite2.body, processCallback, callbackContext, overlapOnly))
        ***REMOVED***
            if (collideCallback)
            ***REMOVED***
                collideCallback.call(callbackContext, sprite1, sprite2);
            ***REMOVED***

            this._total++;
        ***REMOVED***

        return true;

    ***REMOVED***,

    /**
    * An internal function. Use Phaser.Physics.Arcade.collide instead.
    *
    * @method Phaser.Physics.Arcade#collideSpriteVsGroup
    * @private
    * @param ***REMOVED***Phaser.Sprite***REMOVED*** sprite - The sprite to check.
    * @param ***REMOVED***Phaser.Group***REMOVED*** group - The Group to check.
    * @param ***REMOVED***function***REMOVED*** collideCallback - An optional callback function that is called if the objects collide. The two objects will be passed to this function in the same order in which you specified them.
    * @param ***REMOVED***function***REMOVED*** processCallback - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then collision will only happen if processCallback returns true. The two objects will be passed to this function in the same order in which you specified them.
    * @param ***REMOVED***object***REMOVED*** callbackContext - The context in which to run the callbacks.
    * @param ***REMOVED***boolean***REMOVED*** overlapOnly - Just run an overlap or a full collision.
    */
    collideSpriteVsGroup: function (sprite, group, collideCallback, processCallback, callbackContext, overlapOnly) ***REMOVED***

        if (group.length === 0 || !sprite.body)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this.skipQuadTree || sprite.body.skipQuadTree)
        ***REMOVED***
            var bounds = ***REMOVED******REMOVED***;

            for (var i = 0; i < group.hash.length; i++)
            ***REMOVED***
                var object1 = group.hash[i];

                //  Skip duff entries - we can't check a non-existent sprite or one with no body
                if (!object1 || !object1.exists || !object1.body)
                ***REMOVED***
                    continue;
                ***REMOVED***

                //  Inject the Body bounds data into the bounds object
                bounds = object1.body.getBounds(bounds);

                //  Skip items either side of the sprite
                if (this.sortDirection === Phaser.Physics.Arcade.LEFT_RIGHT)
                ***REMOVED***
                    if (sprite.body.right < bounds.x)
                    ***REMOVED***
                        break;
                    ***REMOVED***
                    else if (bounds.right < sprite.body.x)
                    ***REMOVED***
                        continue;
                    ***REMOVED***
                ***REMOVED***
                else if (this.sortDirection === Phaser.Physics.Arcade.RIGHT_LEFT)
                ***REMOVED***
                    if (sprite.body.x > bounds.right)
                    ***REMOVED***
                        break;
                    ***REMOVED***
                    else if (bounds.x > sprite.body.right)
                    ***REMOVED***
                        continue;
                    ***REMOVED***
                ***REMOVED***
                else if (this.sortDirection === Phaser.Physics.Arcade.TOP_BOTTOM)
                ***REMOVED***
                    if (sprite.body.bottom < bounds.y)
                    ***REMOVED***
                        break;
                    ***REMOVED***
                    else if (bounds.bottom < sprite.body.y)
                    ***REMOVED***
                        continue;
                    ***REMOVED***
                ***REMOVED***
                else if (this.sortDirection === Phaser.Physics.Arcade.BOTTOM_TOP)
                ***REMOVED***
                    if (sprite.body.y > bounds.bottom)
                    ***REMOVED***
                        break;
                    ***REMOVED***
                    else if (bounds.y > sprite.body.bottom)
                    ***REMOVED***
                        continue;
                    ***REMOVED***
                ***REMOVED***
                
                this.collideSpriteVsSprite(sprite, object1, collideCallback, processCallback, callbackContext, overlapOnly);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  What is the sprite colliding with in the quadtree?
            this.quadTree.clear();

            this.quadTree.reset(this.game.world.bounds.x, this.game.world.bounds.y, this.game.world.bounds.width, this.game.world.bounds.height, this.maxObjects, this.maxLevels);

            this.quadTree.populate(group);

            var items = this.quadTree.retrieve(sprite);

            for (var i = 0; i < items.length; i++)
            ***REMOVED***
                //  We have our potential suspects, are they in this group?
                if (this.separate(sprite.body, items[i], processCallback, callbackContext, overlapOnly))
                ***REMOVED***
                    if (collideCallback)
                    ***REMOVED***
                        collideCallback.call(callbackContext, sprite, items[i].sprite);
                    ***REMOVED***

                    this._total++;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * An internal function. Use Phaser.Physics.Arcade.collide instead.
    *
    * @method Phaser.Physics.Arcade#collideGroupVsSelf
    * @private
    * @param ***REMOVED***Phaser.Group***REMOVED*** group - The Group to check.
    * @param ***REMOVED***function***REMOVED*** collideCallback - An optional callback function that is called if the objects collide. The two objects will be passed to this function in the same order in which you specified them.
    * @param ***REMOVED***function***REMOVED*** processCallback - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then collision will only happen if processCallback returns true. The two objects will be passed to this function in the same order in which you specified them.
    * @param ***REMOVED***object***REMOVED*** callbackContext - The context in which to run the callbacks.
    * @param ***REMOVED***boolean***REMOVED*** overlapOnly - Just run an overlap or a full collision.
    * @return ***REMOVED***boolean***REMOVED*** True if there was a collision, otherwise false.
    */
    collideGroupVsSelf: function (group, collideCallback, processCallback, callbackContext, overlapOnly) ***REMOVED***

        if (group.length === 0)
        ***REMOVED***
            return;
        ***REMOVED***

        for (var i = 0; i < group.hash.length; i++)
        ***REMOVED***
            var bounds1 = ***REMOVED******REMOVED***;
            var object1 = group.hash[i];

            //  Skip duff entries - we can't check a non-existent sprite or one with no body
            if (!object1 || !object1.exists || !object1.body)
            ***REMOVED***
                continue;
            ***REMOVED***

            //  Inject the Body bounds data into the bounds1 object
            bounds1 = object1.body.getBounds(bounds1);

            for (var j = i + 1; j < group.hash.length; j++)
            ***REMOVED***
                var bounds2 = ***REMOVED******REMOVED***;
                var object2 = group.hash[j];

                //  Skip duff entries - we can't check a non-existent sprite or one with no body
                if (!object2 || !object2.exists || !object2.body)
                ***REMOVED***
                    continue;
                ***REMOVED***

                //  Inject the Body bounds data into the bounds2 object
                bounds2 = object2.body.getBounds(bounds2);

                //  Skip items either side of the sprite
                if (this.sortDirection === Phaser.Physics.Arcade.LEFT_RIGHT)
                ***REMOVED***
                    if (bounds1.right < bounds2.x)
                    ***REMOVED***
                        break;
                    ***REMOVED***
                    else if (bounds2.right < bounds1.x)
                    ***REMOVED***
                        continue;
                    ***REMOVED***
                ***REMOVED***
                else if (this.sortDirection === Phaser.Physics.Arcade.RIGHT_LEFT)
                ***REMOVED***
                    if (bounds1.x > bounds2.right)
                    ***REMOVED***
                        continue;
                    ***REMOVED***
                    else if (bounds2.x > bounds1.right)
                    ***REMOVED***
                        break;
                    ***REMOVED***
                ***REMOVED***
                else if (this.sortDirection === Phaser.Physics.Arcade.TOP_BOTTOM)
                ***REMOVED***
                    if (bounds1.bottom < bounds2.y)
                    ***REMOVED***
                        continue;
                    ***REMOVED***
                    else if (bounds2.bottom < bounds1.y)
                    ***REMOVED***
                        break;
                    ***REMOVED***
                ***REMOVED***
                else if (this.sortDirection === Phaser.Physics.Arcade.BOTTOM_TOP)
                ***REMOVED***
                    if (bounds1.y > bounds2.bottom)
                    ***REMOVED***
                        continue;
                    ***REMOVED***
                    else if (bounds2.y > object1.body.bottom)
                    ***REMOVED***
                        break;
                    ***REMOVED***
                ***REMOVED***
                
                this.collideSpriteVsSprite(object1, object2, collideCallback, processCallback, callbackContext, overlapOnly);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * An internal function. Use Phaser.Physics.Arcade.collide instead.
    *
    * @method Phaser.Physics.Arcade#collideGroupVsGroup
    * @private
    * @param ***REMOVED***Phaser.Group***REMOVED*** group1 - The first Group to check.
    * @param ***REMOVED***Phaser.Group***REMOVED*** group2 - The second Group to check.
    * @param ***REMOVED***function***REMOVED*** collideCallback - An optional callback function that is called if the objects collide. The two objects will be passed to this function in the same order in which you specified them.
    * @param ***REMOVED***function***REMOVED*** processCallback - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then collision will only happen if processCallback returns true. The two objects will be passed to this function in the same order in which you specified them.
    * @param ***REMOVED***object***REMOVED*** callbackContext - The context in which to run the callbacks.
    * @param ***REMOVED***boolean***REMOVED*** overlapOnly - Just run an overlap or a full collision.
    */
    collideGroupVsGroup: function (group1, group2, collideCallback, processCallback, callbackContext, overlapOnly) ***REMOVED***

        if (group1.length === 0 || group2.length === 0)
        ***REMOVED***
            return;
        ***REMOVED***

        for (var i = 0; i < group1.children.length; i++)
        ***REMOVED***
            if (group1.children[i].exists)
            ***REMOVED***
                if (group1.children[i].physicsType === Phaser.GROUP)
                ***REMOVED***
                    this.collideGroupVsGroup(group1.children[i], group2, collideCallback, processCallback, callbackContext, overlapOnly);
                ***REMOVED***
                else
                ***REMOVED***
                    this.collideSpriteVsGroup(group1.children[i], group2, collideCallback, processCallback, callbackContext, overlapOnly);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * The core separation function to separate two physics bodies.
    *
    * @private
    * @method Phaser.Physics.Arcade#separate
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body1 - The first Body object to separate.
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body2 - The second Body object to separate.
    * @param ***REMOVED***function***REMOVED*** [processCallback=null] - A callback function that lets you perform additional checks against the two objects if they overlap. If this function is set then the sprites will only be collided if it returns true.
    * @param ***REMOVED***object***REMOVED*** [callbackContext] - The context in which to run the process callback.
    * @param ***REMOVED***boolean***REMOVED*** overlapOnly - Just run an overlap or a full collision.
    * @return ***REMOVED***boolean***REMOVED*** Returns true if the bodies collided, otherwise false.
    */
    separate: function (body1, body2, processCallback, callbackContext, overlapOnly) ***REMOVED***

        if (
            !body1.enable ||
            !body2.enable ||
            body1.checkCollision.none ||
            body2.checkCollision.none ||
            !this.intersects(body1, body2))
        ***REMOVED***
            return false;
        ***REMOVED***

        //  They overlap. Is there a custom process callback? If it returns true then we can carry on, otherwise we should abort.
        if (processCallback && processCallback.call(callbackContext, body1.sprite, body2.sprite) === false)
        ***REMOVED***
            return false;
        ***REMOVED***

        //  Circle vs. Circle quick bail out
        if (body1.isCircle && body2.isCircle)
        ***REMOVED***
            return this.separateCircle(body1, body2, overlapOnly);
        ***REMOVED***

        // We define the behavior of bodies in a collision circle and rectangle
        // If a collision occurs in the corner points of the rectangle, the body behave like circles

        //  Either body1 or body2 is a circle
        if (body1.isCircle !== body2.isCircle)
        ***REMOVED***
            var bodyRect = (body1.isCircle) ? body2 : body1;
            var bodyCircle = (body1.isCircle) ? body1 : body2;

            var rect = ***REMOVED***
                x: bodyRect.x,
                y: bodyRect.y,
                right: bodyRect.right,
                bottom: bodyRect.bottom
            ***REMOVED***;

            var circle = ***REMOVED***
                x: bodyCircle.x + bodyCircle.radius,
                y: bodyCircle.y + bodyCircle.radius
            ***REMOVED***;

            if (circle.y < rect.y || circle.y > rect.bottom)
            ***REMOVED***
                if (circle.x < rect.x || circle.x > rect.right)
                ***REMOVED***
                    return this.separateCircle(body1, body2, overlapOnly);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        var resultX = false;
        var resultY = false;

        //  Do we separate on x or y first?
        if (this.forceX || Math.abs(this.gravity.y + body1.gravity.y) < Math.abs(this.gravity.x + body1.gravity.x))
        ***REMOVED***
            resultX = this.separateX(body1, body2, overlapOnly);

            //  Are they still intersecting? Let's do the other axis then
            if (this.intersects(body1, body2))
            ***REMOVED***
                resultY = this.separateY(body1, body2, overlapOnly);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            resultY = this.separateY(body1, body2, overlapOnly);

            //  Are they still intersecting? Let's do the other axis then
            if (this.intersects(body1, body2))
            ***REMOVED***
                resultX = this.separateX(body1, body2, overlapOnly);
            ***REMOVED***
        ***REMOVED***

        var result = (resultX || resultY);

        if (result)
        ***REMOVED***
            if (overlapOnly)
            ***REMOVED***
                if (body1.onOverlap)
                ***REMOVED***
                    body1.onOverlap.dispatch(body1.sprite, body2.sprite);
                ***REMOVED***

                if (body2.onOverlap)
                ***REMOVED***
                    body2.onOverlap.dispatch(body2.sprite, body1.sprite);
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                if (body1.onCollide)
                ***REMOVED***
                    body1.onCollide.dispatch(body1.sprite, body2.sprite);
                ***REMOVED***

                if (body2.onCollide)
                ***REMOVED***
                    body2.onCollide.dispatch(body2.sprite, body1.sprite);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return result;

    ***REMOVED***,

    /**
    * Check for intersection against two bodies.
    *
    * @method Phaser.Physics.Arcade#intersects
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body1 - The first Body object to check.
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body2 - The second Body object to check.
    * @return ***REMOVED***boolean***REMOVED*** True if they intersect, otherwise false.
    */
    intersects: function (body1, body2) ***REMOVED***

        if (body1 === body2)
        ***REMOVED***
            return false;
        ***REMOVED***

        if (body1.isCircle)
        ***REMOVED***
            if (body2.isCircle)
            ***REMOVED***
                //  Circle vs. Circle
                return Phaser.Math.distance(body1.center.x, body1.center.y, body2.center.x, body2.center.y) <= (body1.radius + body2.radius);
            ***REMOVED***
            else
            ***REMOVED***
                //  Circle vs. Rect
                return this.circleBodyIntersects(body1, body2);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (body2.isCircle)
            ***REMOVED***
                //  Rect vs. Circle
                return this.circleBodyIntersects(body2, body1);
            ***REMOVED***
            else
            ***REMOVED***
                //  Rect vs. Rect
                if (body1.right <= body2.position.x)
                ***REMOVED***
                    return false;
                ***REMOVED***

                if (body1.bottom <= body2.position.y)
                ***REMOVED***
                    return false;
                ***REMOVED***

                if (body1.position.x >= body2.right)
                ***REMOVED***
                    return false;
                ***REMOVED***

                if (body1.position.y >= body2.bottom)
                ***REMOVED***
                    return false;
                ***REMOVED***

                return true;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Checks to see if a circular Body intersects with a Rectangular Body.
    *
    * @method Phaser.Physics.Arcade#circleBodyIntersects
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** circle - The Body with `isCircle` set.
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body - The Body with `isCircle` not set (i.e. uses Rectangle shape)
    * @return ***REMOVED***boolean***REMOVED*** Returns true if the bodies intersect, otherwise false.
    */
    circleBodyIntersects: function (circle, body) ***REMOVED***

        var x = Phaser.Math.clamp(circle.center.x, body.left, body.right);
        var y = Phaser.Math.clamp(circle.center.y, body.top, body.bottom);

        var dx = (circle.center.x - x) * (circle.center.x - x);
        var dy = (circle.center.y - y) * (circle.center.y - y);

        return (dx + dy) <= (circle.radius * circle.radius);

    ***REMOVED***,

    /**
    * The core separation function to separate two circular physics bodies.
    *
    * @method Phaser.Physics.Arcade#separateCircle
    * @private
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body1 - The first Body to separate. Must have `Body.isCircle` true and a positive `radius`.
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body2 - The second Body to separate. Must have `Body.isCircle` true and a positive `radius`.
    * @param ***REMOVED***boolean***REMOVED*** overlapOnly - If true the bodies will only have their overlap data set, no separation or exchange of velocity will take place.
    * @return ***REMOVED***boolean***REMOVED*** Returns true if the bodies were separated or overlap, otherwise false.
    */
    separateCircle: function (body1, body2, overlapOnly) ***REMOVED***

        //  Set the bounding box overlap values
        this.getOverlapX(body1, body2);
        this.getOverlapY(body1, body2);

        var dx = body2.center.x - body1.center.x;
        var dy = body2.center.y - body1.center.y;

        var angleCollision = Math.atan2(dy, dx);

        var overlap = 0;

        if (body1.isCircle !== body2.isCircle)
        ***REMOVED***
            var rect = ***REMOVED***
                x: (body2.isCircle) ? body1.position.x : body2.position.x,
                y: (body2.isCircle) ? body1.position.y : body2.position.y,
                right: (body2.isCircle) ? body1.right : body2.right,
                bottom: (body2.isCircle) ? body1.bottom : body2.bottom
            ***REMOVED***;

            var circle = ***REMOVED***
                x: (body1.isCircle) ? (body1.position.x + body1.radius) : (body2.position.x + body2.radius),
                y: (body1.isCircle) ? (body1.position.y + body1.radius) : (body2.position.y + body2.radius),
                radius: (body1.isCircle) ? body1.radius : body2.radius
            ***REMOVED***;

            if (circle.y < rect.y)
            ***REMOVED***
                if (circle.x < rect.x)
                ***REMOVED***
                    overlap = Phaser.Math.distance(circle.x, circle.y, rect.x, rect.y) - circle.radius;
                ***REMOVED***
                else if (circle.x > rect.right)
                ***REMOVED***
                    overlap = Phaser.Math.distance(circle.x, circle.y, rect.right, rect.y) - circle.radius;
                ***REMOVED***
            ***REMOVED***
            else if (circle.y > rect.bottom)
            ***REMOVED***
                if (circle.x < rect.x)
                ***REMOVED***
                    overlap = Phaser.Math.distance(circle.x, circle.y, rect.x, rect.bottom) - circle.radius;
                ***REMOVED***
                else if (circle.x > rect.right)
                ***REMOVED***
                    overlap = Phaser.Math.distance(circle.x, circle.y, rect.right, rect.bottom) - circle.radius;
                ***REMOVED***
            ***REMOVED***

            overlap *= -1;
        ***REMOVED***
        else
        ***REMOVED***
            overlap = (body1.radius + body2.radius) - Phaser.Math.distance(body1.center.x, body1.center.y, body2.center.x, body2.center.y);
        ***REMOVED***

        //  Can't separate two immovable bodies, or a body with its own custom separation logic
        if (overlapOnly || overlap === 0 || (body1.immovable && body2.immovable) || body1.customSeparateX || body2.customSeparateX)
        ***REMOVED***
            if (overlap !== 0)
            ***REMOVED***
                if (body1.onOverlap)
                ***REMOVED***
                    body1.onOverlap.dispatch(body1.sprite, body2.sprite);
                ***REMOVED***

                if (body2.onOverlap)
                ***REMOVED***
                    body2.onOverlap.dispatch(body2.sprite, body1.sprite);
                ***REMOVED***
            ***REMOVED***

            //  return true if there was some overlap, otherwise false
            return (overlap !== 0);
        ***REMOVED***

        // Transform the velocity vector to the coordinate system oriented along the direction of impact.
        // This is done to eliminate the vertical component of the velocity
        var v1 = ***REMOVED***
            x: body1.velocity.x * Math.cos(angleCollision) + body1.velocity.y * Math.sin(angleCollision),
            y: body1.velocity.x * Math.sin(angleCollision) - body1.velocity.y * Math.cos(angleCollision)
        ***REMOVED***;

        var v2 = ***REMOVED***
            x: body2.velocity.x * Math.cos(angleCollision) + body2.velocity.y * Math.sin(angleCollision),
            y: body2.velocity.x * Math.sin(angleCollision) - body2.velocity.y * Math.cos(angleCollision)
        ***REMOVED***;

        // We expect the new velocity after impact
        var tempVel1 = ((body1.mass - body2.mass) * v1.x + 2 * body2.mass * v2.x) / (body1.mass + body2.mass);
        var tempVel2 = (2 * body1.mass * v1.x + (body2.mass - body1.mass) * v2.x) / (body1.mass + body2.mass);

        // We convert the vector to the original coordinate system and multiplied by factor of rebound
        if (!body1.immovable)
        ***REMOVED***
            body1.velocity.x = (tempVel1 * Math.cos(angleCollision) - v1.y * Math.sin(angleCollision)) * body1.bounce.x;
            body1.velocity.y = (v1.y * Math.cos(angleCollision) + tempVel1 * Math.sin(angleCollision)) * body1.bounce.y;
        ***REMOVED***

        if (!body2.immovable)
        ***REMOVED***
            body2.velocity.x = (tempVel2 * Math.cos(angleCollision) - v2.y * Math.sin(angleCollision)) * body2.bounce.x;
            body2.velocity.y = (v2.y * Math.cos(angleCollision) + tempVel2 * Math.sin(angleCollision)) * body2.bounce.y;
        ***REMOVED***

        // When the collision angle is almost perpendicular to the total initial velocity vector
        // (collision on a tangent) vector direction can be determined incorrectly.
        // This code fixes the problem

        if (Math.abs(angleCollision) < Math.PI / 2)
        ***REMOVED***
            if ((body1.velocity.x > 0) && !body1.immovable && (body2.velocity.x > body1.velocity.x))
            ***REMOVED***
                body1.velocity.x *= -1;
            ***REMOVED***
            else if ((body2.velocity.x < 0) && !body2.immovable && (body1.velocity.x < body2.velocity.x))
            ***REMOVED***
                body2.velocity.x *= -1;
            ***REMOVED***
            else if ((body1.velocity.y > 0) && !body1.immovable && (body2.velocity.y > body1.velocity.y))
            ***REMOVED***
                body1.velocity.y *= -1;
            ***REMOVED***
            else if ((body2.velocity.y < 0) && !body2.immovable && (body1.velocity.y < body2.velocity.y))
            ***REMOVED***
                body2.velocity.y *= -1;
            ***REMOVED***
        ***REMOVED***
        else if (Math.abs(angleCollision) > Math.PI / 2)
        ***REMOVED***
            if ((body1.velocity.x < 0) && !body1.immovable && (body2.velocity.x < body1.velocity.x))
            ***REMOVED***
                body1.velocity.x *= -1;
            ***REMOVED***
            else if ((body2.velocity.x > 0) && !body2.immovable && (body1.velocity.x > body2.velocity.x))
            ***REMOVED***
                body2.velocity.x *= -1;
            ***REMOVED***
            else if ((body1.velocity.y < 0) && !body1.immovable && (body2.velocity.y < body1.velocity.y))
            ***REMOVED***
                body1.velocity.y *= -1;
            ***REMOVED***
            else if ((body2.velocity.y > 0) && !body2.immovable && (body1.velocity.x > body2.velocity.y))
            ***REMOVED***
                body2.velocity.y *= -1;
            ***REMOVED***
        ***REMOVED***

        if (!body1.immovable)
        ***REMOVED***
            body1.x += (body1.velocity.x * this.game.time.physicsElapsed) - overlap * Math.cos(angleCollision);
            body1.y += (body1.velocity.y * this.game.time.physicsElapsed) - overlap * Math.sin(angleCollision);
        ***REMOVED***

        if (!body2.immovable)
        ***REMOVED***
            body2.x += (body2.velocity.x * this.game.time.physicsElapsed) + overlap * Math.cos(angleCollision);
            body2.y += (body2.velocity.y * this.game.time.physicsElapsed) + overlap * Math.sin(angleCollision);
        ***REMOVED***

        if (body1.onCollide)
        ***REMOVED***
            body1.onCollide.dispatch(body1.sprite, body2.sprite);
        ***REMOVED***

        if (body2.onCollide)
        ***REMOVED***
            body2.onCollide.dispatch(body2.sprite, body1.sprite);
        ***REMOVED***

        return true;

    ***REMOVED***,

    /**
    * Calculates the horizontal overlap between two Bodies and sets their properties accordingly, including:
    * `touching.left`, `touching.right` and `overlapX`.
    *
    * @method Phaser.Physics.Arcade#getOverlapX
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body1 - The first Body to separate.
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body2 - The second Body to separate.
    * @param ***REMOVED***boolean***REMOVED*** overlapOnly - Is this an overlap only check, or part of separation?
    * @return ***REMOVED***float***REMOVED*** Returns the amount of horizontal overlap between the two bodies.
    */
    getOverlapX: function (body1, body2, overlapOnly) ***REMOVED***

        var overlap = 0;
        var maxOverlap = body1.deltaAbsX() + body2.deltaAbsX() + this.OVERLAP_BIAS;

        if (body1.deltaX() === 0 && body2.deltaX() === 0)
        ***REMOVED***
            //  They overlap but neither of them are moving
            body1.embedded = true;
            body2.embedded = true;
        ***REMOVED***
        else if (body1.deltaX() > body2.deltaX())
        ***REMOVED***
            //  Body1 is moving right and / or Body2 is moving left
            overlap = body1.right - body2.x;

            if ((overlap > maxOverlap && !overlapOnly) || body1.checkCollision.right === false || body2.checkCollision.left === false)
            ***REMOVED***
                overlap = 0;
            ***REMOVED***
            else
            ***REMOVED***
                body1.touching.none = false;
                body1.touching.right = true;
                body2.touching.none = false;
                body2.touching.left = true;
            ***REMOVED***
        ***REMOVED***
        else if (body1.deltaX() < body2.deltaX())
        ***REMOVED***
            //  Body1 is moving left and/or Body2 is moving right
            overlap = body1.x - body2.width - body2.x;

            if ((-overlap > maxOverlap && !overlapOnly) || body1.checkCollision.left === false || body2.checkCollision.right === false)
            ***REMOVED***
                overlap = 0;
            ***REMOVED***
            else
            ***REMOVED***
                body1.touching.none = false;
                body1.touching.left = true;
                body2.touching.none = false;
                body2.touching.right = true;
            ***REMOVED***
        ***REMOVED***

        //  Resets the overlapX to zero if there is no overlap, or to the actual pixel value if there is
        body1.overlapX = overlap;
        body2.overlapX = overlap;

        return overlap;

    ***REMOVED***,

    /**
    * Calculates the vertical overlap between two Bodies and sets their properties accordingly, including:
    * `touching.up`, `touching.down` and `overlapY`.
    *
    * @method Phaser.Physics.Arcade#getOverlapY
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body1 - The first Body to separate.
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body2 - The second Body to separate.
    * @param ***REMOVED***boolean***REMOVED*** overlapOnly - Is this an overlap only check, or part of separation?
    * @return ***REMOVED***float***REMOVED*** Returns the amount of vertical overlap between the two bodies.
    */
    getOverlapY: function (body1, body2, overlapOnly) ***REMOVED***

        var overlap = 0;
        var maxOverlap = body1.deltaAbsY() + body2.deltaAbsY() + this.OVERLAP_BIAS;

        if (body1.deltaY() === 0 && body2.deltaY() === 0)
        ***REMOVED***
            //  They overlap but neither of them are moving
            body1.embedded = true;
            body2.embedded = true;
        ***REMOVED***
        else if (body1.deltaY() > body2.deltaY())
        ***REMOVED***
            //  Body1 is moving down and/or Body2 is moving up
            overlap = body1.bottom - body2.y;

            if ((overlap > maxOverlap && !overlapOnly) || body1.checkCollision.down === false || body2.checkCollision.up === false)
            ***REMOVED***
                overlap = 0;
            ***REMOVED***
            else
            ***REMOVED***
                body1.touching.none = false;
                body1.touching.down = true;
                body2.touching.none = false;
                body2.touching.up = true;
            ***REMOVED***
        ***REMOVED***
        else if (body1.deltaY() < body2.deltaY())
        ***REMOVED***
            //  Body1 is moving up and/or Body2 is moving down
            overlap = body1.y - body2.bottom;

            if ((-overlap > maxOverlap && !overlapOnly) || body1.checkCollision.up === false || body2.checkCollision.down === false)
            ***REMOVED***
                overlap = 0;
            ***REMOVED***
            else
            ***REMOVED***
                body1.touching.none = false;
                body1.touching.up = true;
                body2.touching.none = false;
                body2.touching.down = true;
            ***REMOVED***
        ***REMOVED***

        //  Resets the overlapY to zero if there is no overlap, or to the actual pixel value if there is
        body1.overlapY = overlap;
        body2.overlapY = overlap;

        return overlap;

    ***REMOVED***,

    /**
    * The core separation function to separate two physics bodies on the x axis.
    *
    * @method Phaser.Physics.Arcade#separateX
    * @private
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body1 - The first Body to separate.
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body2 - The second Body to separate.
    * @param ***REMOVED***boolean***REMOVED*** overlapOnly - If true the bodies will only have their overlap data set, no separation or exchange of velocity will take place.
    * @return ***REMOVED***boolean***REMOVED*** Returns true if the bodies were separated or overlap, otherwise false.
    */
    separateX: function (body1, body2, overlapOnly) ***REMOVED***

        var overlap = this.getOverlapX(body1, body2, overlapOnly);

        //  Can't separate two immovable bodies, or a body with its own custom separation logic
        if (overlapOnly || overlap === 0 || (body1.immovable && body2.immovable) || body1.customSeparateX || body2.customSeparateX)
        ***REMOVED***
            //  return true if there was some overlap, otherwise false
            return (overlap !== 0) || (body1.embedded && body2.embedded);
        ***REMOVED***

        //  Adjust their positions and velocities accordingly (if there was any overlap)
        var v1 = body1.velocity.x;
        var v2 = body2.velocity.x;

        if (!body1.immovable && !body2.immovable)
        ***REMOVED***
            overlap *= 0.5;

            body1.x -= overlap;
            body2.x += overlap;

            var nv1 = Math.sqrt((v2 * v2 * body2.mass) / body1.mass) * ((v2 > 0) ? 1 : -1);
            var nv2 = Math.sqrt((v1 * v1 * body1.mass) / body2.mass) * ((v1 > 0) ? 1 : -1);
            var avg = (nv1 + nv2) * 0.5;

            nv1 -= avg;
            nv2 -= avg;

            body1.velocity.x = avg + nv1 * body1.bounce.x;
            body2.velocity.x = avg + nv2 * body2.bounce.x;
        ***REMOVED***
        else if (!body1.immovable)
        ***REMOVED***
            body1.x -= overlap;
            body1.velocity.x = v2 - v1 * body1.bounce.x;

            //  This is special case code that handles things like vertically moving platforms you can ride
            if (body2.moves)
            ***REMOVED***
                body1.y += (body2.y - body2.prev.y) * body2.friction.y;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            body2.x += overlap;
            body2.velocity.x = v1 - v2 * body2.bounce.x;

            //  This is special case code that handles things like vertically moving platforms you can ride
            if (body1.moves)
            ***REMOVED***
                body2.y += (body1.y - body1.prev.y) * body1.friction.y;
            ***REMOVED***
        ***REMOVED***

        //  If we got this far then there WAS overlap, and separation is complete, so return true
        return true;

    ***REMOVED***,

    /**
    * The core separation function to separate two physics bodies on the y axis.
    *
    * @private
    * @method Phaser.Physics.Arcade#separateY
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body1 - The first Body to separate.
    * @param ***REMOVED***Phaser.Physics.Arcade.Body***REMOVED*** body2 - The second Body to separate.
    * @param ***REMOVED***boolean***REMOVED*** overlapOnly - If true the bodies will only have their overlap data set, no separation or exchange of velocity will take place.
    * @return ***REMOVED***boolean***REMOVED*** Returns true if the bodies were separated or overlap, otherwise false.
    */
    separateY: function (body1, body2, overlapOnly) ***REMOVED***

        var overlap = this.getOverlapY(body1, body2, overlapOnly);

        //  Can't separate two immovable bodies, or a body with its own custom separation logic
        if (overlapOnly || overlap === 0 || (body1.immovable && body2.immovable) || body1.customSeparateY || body2.customSeparateY)
        ***REMOVED***
            //  return true if there was some overlap, otherwise false
            return (overlap !== 0) || (body1.embedded && body2.embedded);
        ***REMOVED***

        //  Adjust their positions and velocities accordingly (if there was any overlap)
        var v1 = body1.velocity.y;
        var v2 = body2.velocity.y;

        if (!body1.immovable && !body2.immovable)
        ***REMOVED***
            overlap *= 0.5;

            body1.y -= overlap;
            body2.y += overlap;

            var nv1 = Math.sqrt((v2 * v2 * body2.mass) / body1.mass) * ((v2 > 0) ? 1 : -1);
            var nv2 = Math.sqrt((v1 * v1 * body1.mass) / body2.mass) * ((v1 > 0) ? 1 : -1);
            var avg = (nv1 + nv2) * 0.5;

            nv1 -= avg;
            nv2 -= avg;

            body1.velocity.y = avg + nv1 * body1.bounce.y;
            body2.velocity.y = avg + nv2 * body2.bounce.y;
        ***REMOVED***
        else if (!body1.immovable)
        ***REMOVED***
            body1.y -= overlap;
            body1.velocity.y = v2 - v1 * body1.bounce.y;

            //  This is special case code that handles things like horizontal moving platforms you can ride
            if (body2.moves)
            ***REMOVED***
                body1.x += (body2.x - body2.prev.x) * body2.friction.x;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            body2.y += overlap;
            body2.velocity.y = v1 - v2 * body2.bounce.y;

            //  This is special case code that handles things like horizontal moving platforms you can ride
            if (body1.moves)
            ***REMOVED***
                body2.x += (body1.x - body1.prev.x) * body1.friction.x;
            ***REMOVED***
        ***REMOVED***

        //  If we got this far then there WAS overlap, and separation is complete, so return true
        return true;

    ***REMOVED***,

    /**
    * Given a Group and a Pointer this will check to see which Group children overlap with the Pointer coordinates.
    * Each child will be sent to the given callback for further processing.
    * Note that the children are not checked for depth order, but simply if they overlap the Pointer or not.
    *
    * @method Phaser.Physics.Arcade#getObjectsUnderPointer
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer - The Pointer to check.
    * @param ***REMOVED***Phaser.Group***REMOVED*** group - The Group to check.
    * @param ***REMOVED***function***REMOVED*** [callback] - A callback function that is called if the object overlaps with the Pointer. The callback will be sent two parameters: the Pointer and the Object that overlapped with it.
    * @param ***REMOVED***object***REMOVED*** [callbackContext] - The context in which to run the callback.
    * @return ***REMOVED***PIXI.DisplayObject[]***REMOVED*** An array of the Sprites from the Group that overlapped the Pointer coordinates.
    */
    getObjectsUnderPointer: function (pointer, group, callback, callbackContext) ***REMOVED***

        if (group.length === 0 || !pointer.exists)
        ***REMOVED***
            return;
        ***REMOVED***

        return this.getObjectsAtLocation(pointer.x, pointer.y, group, callback, callbackContext, pointer);

    ***REMOVED***,

    /**
    * Given a Group and a location this will check to see which Group children overlap with the coordinates.
    * Each child will be sent to the given callback for further processing.
    * Note that the children are not checked for depth order, but simply if they overlap the coordinate or not.
    *
    * @method Phaser.Physics.Arcade#getObjectsAtLocation
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate to check.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate to check.
    * @param ***REMOVED***Phaser.Group***REMOVED*** group - The Group to check.
    * @param ***REMOVED***function***REMOVED*** [callback] - A callback function that is called if the object overlaps the coordinates. The callback will be sent two parameters: the callbackArg and the Object that overlapped the location.
    * @param ***REMOVED***object***REMOVED*** [callbackContext] - The context in which to run the callback.
    * @param ***REMOVED***object***REMOVED*** [callbackArg] - An argument to pass to the callback.
    * @return ***REMOVED***PIXI.DisplayObject[]***REMOVED*** An array of the Sprites from the Group that overlapped the coordinates.
    */
    getObjectsAtLocation: function (x, y, group, callback, callbackContext, callbackArg) ***REMOVED***

        this.quadTree.clear();

        this.quadTree.reset(this.game.world.bounds.x, this.game.world.bounds.y, this.game.world.bounds.width, this.game.world.bounds.height, this.maxObjects, this.maxLevels);

        this.quadTree.populate(group);

        var rect = new Phaser.Rectangle(x, y, 1, 1);
        var output = [];

        var items = this.quadTree.retrieve(rect);

        for (var i = 0; i < items.length; i++)
        ***REMOVED***
            if (items[i].hitTest(x, y))
            ***REMOVED***
                if (callback)
                ***REMOVED***
                    callback.call(callbackContext, callbackArg, items[i].sprite);
                ***REMOVED***

                output.push(items[i].sprite);
            ***REMOVED***
        ***REMOVED***

        return output;
        
    ***REMOVED***,

    /**
    * Move the given display object towards the destination object at a steady velocity.
    * If you specify a maxTime then it will adjust the speed (overwriting what you set) so it arrives at the destination in that number of seconds.
    * Timings are approximate due to the way browser timers work. Allow for a variance of +- 50ms.
    * Note: The display object does not continuously track the target. If the target changes location during transit the display object will not modify its course.
    * Note: The display object doesn't stop moving once it reaches the destination coordinates.
    * Note: Doesn't take into account acceleration, maxVelocity or drag (if you've set drag or acceleration too high this object may not move at all)
    *
    * @method Phaser.Physics.Arcade#moveToObject
    * @param ***REMOVED***any***REMOVED*** displayObject - The display object to move.
    * @param ***REMOVED***any***REMOVED*** destination - The display object to move towards. Can be any object but must have visible x/y properties.
    * @param ***REMOVED***number***REMOVED*** [speed=60] - The speed it will move, in pixels per second (default is 60 pixels/sec)
    * @param ***REMOVED***number***REMOVED*** [maxTime=0] - Time given in milliseconds (1000 = 1 sec). If set the speed is adjusted so the object will arrive at destination in the given number of ms.
    * @return ***REMOVED***number***REMOVED*** The angle (in radians) that the object should be visually set to in order to match its new velocity.
    */
    moveToObject: function (displayObject, destination, speed, maxTime) ***REMOVED***

        if (speed === undefined) ***REMOVED*** speed = 60; ***REMOVED***
        if (maxTime === undefined) ***REMOVED*** maxTime = 0; ***REMOVED***

        var angle = Math.atan2(destination.y - displayObject.y, destination.x - displayObject.x);

        if (maxTime > 0)
        ***REMOVED***
            //  We know how many pixels we need to move, but how fast?
            speed = this.distanceBetween(displayObject, destination) / (maxTime / 1000);
        ***REMOVED***

        displayObject.body.velocity.x = Math.cos(angle) * speed;
        displayObject.body.velocity.y = Math.sin(angle) * speed;

        return angle;

    ***REMOVED***,

    /**
    * Move the given display object towards the pointer at a steady velocity. If no pointer is given it will use Phaser.Input.activePointer.
    * If you specify a maxTime then it will adjust the speed (over-writing what you set) so it arrives at the destination in that number of seconds.
    * Timings are approximate due to the way browser timers work. Allow for a variance of +- 50ms.
    * Note: The display object does not continuously track the target. If the target changes location during transit the display object will not modify its course.
    * Note: The display object doesn't stop moving once it reaches the destination coordinates.
    *
    * @method Phaser.Physics.Arcade#moveToPointer
    * @param ***REMOVED***any***REMOVED*** displayObject - The display object to move.
    * @param ***REMOVED***number***REMOVED*** [speed=60] - The speed it will move, in pixels per second (default is 60 pixels/sec)
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** [pointer] - The pointer to move towards. Defaults to Phaser.Input.activePointer.
    * @param ***REMOVED***number***REMOVED*** [maxTime=0] - Time given in milliseconds (1000 = 1 sec). If set the speed is adjusted so the object will arrive at destination in the given number of ms.
    * @return ***REMOVED***number***REMOVED*** The angle (in radians) that the object should be visually set to in order to match its new velocity.
    */
    moveToPointer: function (displayObject, speed, pointer, maxTime) ***REMOVED***

        if (speed === undefined) ***REMOVED*** speed = 60; ***REMOVED***
        pointer = pointer || this.game.input.activePointer;
        if (maxTime === undefined) ***REMOVED*** maxTime = 0; ***REMOVED***

        var angle = this.angleToPointer(displayObject, pointer);

        if (maxTime > 0)
        ***REMOVED***
            //  We know how many pixels we need to move, but how fast?
            speed = this.distanceToPointer(displayObject, pointer) / (maxTime / 1000);
        ***REMOVED***

        displayObject.body.velocity.x = Math.cos(angle) * speed;
        displayObject.body.velocity.y = Math.sin(angle) * speed;

        return angle;

    ***REMOVED***,

    /**
    * Move the given display object towards the x/y coordinates at a steady velocity.
    * If you specify a maxTime then it will adjust the speed (over-writing what you set) so it arrives at the destination in that number of seconds.
    * Timings are approximate due to the way browser timers work. Allow for a variance of +- 50ms.
    * Note: The display object does not continuously track the target. If the target changes location during transit the display object will not modify its course.
    * Note: The display object doesn't stop moving once it reaches the destination coordinates.
    * Note: Doesn't take into account acceleration, maxVelocity or drag (if you've set drag or acceleration too high this object may not move at all)
    *
    * @method Phaser.Physics.Arcade#moveToXY
    * @param ***REMOVED***any***REMOVED*** displayObject - The display object to move.
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate to move towards.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate to move towards.
    * @param ***REMOVED***number***REMOVED*** [speed=60] - The speed it will move, in pixels per second (default is 60 pixels/sec)
    * @param ***REMOVED***number***REMOVED*** [maxTime=0] - Time given in milliseconds (1000 = 1 sec). If set the speed is adjusted so the object will arrive at destination in the given number of ms.
    * @return ***REMOVED***number***REMOVED*** The angle (in radians) that the object should be visually set to in order to match its new velocity.
    */
    moveToXY: function (displayObject, x, y, speed, maxTime) ***REMOVED***

        if (speed === undefined) ***REMOVED*** speed = 60; ***REMOVED***
        if (maxTime === undefined) ***REMOVED*** maxTime = 0; ***REMOVED***

        var angle = Math.atan2(y - displayObject.y, x - displayObject.x);

        if (maxTime > 0)
        ***REMOVED***
            //  We know how many pixels we need to move, but how fast?
            speed = this.distanceToXY(displayObject, x, y) / (maxTime / 1000);
        ***REMOVED***

        displayObject.body.velocity.x = Math.cos(angle) * speed;
        displayObject.body.velocity.y = Math.sin(angle) * speed;

        return angle;

    ***REMOVED***,

    /**
    * Given the angle (in degrees) and speed calculate the velocity and return it as a Point object, or set it to the given point object.
    * One way to use this is: velocityFromAngle(angle, 200, sprite.velocity) which will set the values directly to the sprites velocity and not create a new Point object.
    *
    * @method Phaser.Physics.Arcade#velocityFromAngle
    * @param ***REMOVED***number***REMOVED*** angle - The angle in degrees calculated in clockwise positive direction (down = 90 degrees positive, right = 0 degrees positive, up = 90 degrees negative)
    * @param ***REMOVED***number***REMOVED*** [speed=60] - The speed it will move, in pixels per second sq.
    * @param ***REMOVED***Phaser.Point|object***REMOVED*** [point] - The Point object in which the x and y properties will be set to the calculated velocity.
    * @return ***REMOVED***Phaser.Point***REMOVED*** - A Point where point.x contains the velocity x value and point.y contains the velocity y value.
    */
    velocityFromAngle: function (angle, speed, point) ***REMOVED***

        if (speed === undefined) ***REMOVED*** speed = 60; ***REMOVED***
        point = point || new Phaser.Point();

        return point.setTo((Math.cos(this.game.math.degToRad(angle)) * speed), (Math.sin(this.game.math.degToRad(angle)) * speed));

    ***REMOVED***,

    /**
    * Given the rotation (in radians) and speed calculate the velocity and return it as a Point object, or set it to the given point object.
    * One way to use this is: velocityFromRotation(rotation, 200, sprite.velocity) which will set the values directly to the sprites velocity and not create a new Point object.
    *
    * @method Phaser.Physics.Arcade#velocityFromRotation
    * @param ***REMOVED***number***REMOVED*** rotation - The angle in radians.
    * @param ***REMOVED***number***REMOVED*** [speed=60] - The speed it will move, in pixels per second sq.
    * @param ***REMOVED***Phaser.Point|object***REMOVED*** [point] - The Point object in which the x and y properties will be set to the calculated velocity.
    * @return ***REMOVED***Phaser.Point***REMOVED*** - A Point where point.x contains the velocity x value and point.y contains the velocity y value.
    */
    velocityFromRotation: function (rotation, speed, point) ***REMOVED***

        if (speed === undefined) ***REMOVED*** speed = 60; ***REMOVED***
        point = point || new Phaser.Point();

        return point.setTo((Math.cos(rotation) * speed), (Math.sin(rotation) * speed));

    ***REMOVED***,

    /**
    * Given the rotation (in radians) and speed calculate the acceleration and return it as a Point object, or set it to the given point object.
    * One way to use this is: accelerationFromRotation(rotation, 200, sprite.acceleration) which will set the values directly to the sprites acceleration and not create a new Point object.
    *
    * @method Phaser.Physics.Arcade#accelerationFromRotation
    * @param ***REMOVED***number***REMOVED*** rotation - The angle in radians.
    * @param ***REMOVED***number***REMOVED*** [speed=60] - The speed it will move, in pixels per second sq.
    * @param ***REMOVED***Phaser.Point|object***REMOVED*** [point] - The Point object in which the x and y properties will be set to the calculated acceleration.
    * @return ***REMOVED***Phaser.Point***REMOVED*** - A Point where point.x contains the acceleration x value and point.y contains the acceleration y value.
    */
    accelerationFromRotation: function (rotation, speed, point) ***REMOVED***

        if (speed === undefined) ***REMOVED*** speed = 60; ***REMOVED***
        point = point || new Phaser.Point();

        return point.setTo((Math.cos(rotation) * speed), (Math.sin(rotation) * speed));

    ***REMOVED***,

    /**
    * Sets the acceleration.x/y property on the display object so it will move towards the target at the given speed (in pixels per second sq.)
    * You must give a maximum speed value, beyond which the display object won't go any faster.
    * Note: The display object does not continuously track the target. If the target changes location during transit the display object will not modify its course.
    * Note: The display object doesn't stop moving once it reaches the destination coordinates.
    *
    * @method Phaser.Physics.Arcade#accelerateToObject
    * @param ***REMOVED***any***REMOVED*** displayObject - The display object to move.
    * @param ***REMOVED***any***REMOVED*** destination - The display object to move towards. Can be any object but must have visible x/y properties.
    * @param ***REMOVED***number***REMOVED*** [speed=60] - The speed it will accelerate in pixels per second.
    * @param ***REMOVED***number***REMOVED*** [xSpeedMax=500] - The maximum x velocity the display object can reach.
    * @param ***REMOVED***number***REMOVED*** [ySpeedMax=500] - The maximum y velocity the display object can reach.
    * @return ***REMOVED***number***REMOVED*** The angle (in radians) that the object should be visually set to in order to match its new trajectory.
    */
    accelerateToObject: function (displayObject, destination, speed, xSpeedMax, ySpeedMax) ***REMOVED***

        if (speed === undefined) ***REMOVED*** speed = 60; ***REMOVED***
        if (xSpeedMax === undefined) ***REMOVED*** xSpeedMax = 1000; ***REMOVED***
        if (ySpeedMax === undefined) ***REMOVED*** ySpeedMax = 1000; ***REMOVED***

        var angle = this.angleBetween(displayObject, destination);

        displayObject.body.acceleration.setTo(Math.cos(angle) * speed, Math.sin(angle) * speed);
        displayObject.body.maxVelocity.setTo(xSpeedMax, ySpeedMax);

        return angle;

    ***REMOVED***,

    /**
    * Sets the acceleration.x/y property on the display object so it will move towards the target at the given speed (in pixels per second sq.)
    * You must give a maximum speed value, beyond which the display object won't go any faster.
    * Note: The display object does not continuously track the target. If the target changes location during transit the display object will not modify its course.
    * Note: The display object doesn't stop moving once it reaches the destination coordinates.
    *
    * @method Phaser.Physics.Arcade#accelerateToPointer
    * @param ***REMOVED***any***REMOVED*** displayObject - The display object to move.
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** [pointer] - The pointer to move towards. Defaults to Phaser.Input.activePointer.
    * @param ***REMOVED***number***REMOVED*** [speed=60] - The speed it will accelerate in pixels per second.
    * @param ***REMOVED***number***REMOVED*** [xSpeedMax=500] - The maximum x velocity the display object can reach.
    * @param ***REMOVED***number***REMOVED*** [ySpeedMax=500] - The maximum y velocity the display object can reach.
    * @return ***REMOVED***number***REMOVED*** The angle (in radians) that the object should be visually set to in order to match its new trajectory.
    */
    accelerateToPointer: function (displayObject, pointer, speed, xSpeedMax, ySpeedMax) ***REMOVED***

        if (speed === undefined) ***REMOVED*** speed = 60; ***REMOVED***
        if (pointer === undefined) ***REMOVED*** pointer = this.game.input.activePointer; ***REMOVED***
        if (xSpeedMax === undefined) ***REMOVED*** xSpeedMax = 1000; ***REMOVED***
        if (ySpeedMax === undefined) ***REMOVED*** ySpeedMax = 1000; ***REMOVED***

        var angle = this.angleToPointer(displayObject, pointer);

        displayObject.body.acceleration.setTo(Math.cos(angle) * speed, Math.sin(angle) * speed);
        displayObject.body.maxVelocity.setTo(xSpeedMax, ySpeedMax);

        return angle;

    ***REMOVED***,

    /**
    * Sets the acceleration.x/y property on the display object so it will move towards the x/y coordinates at the given speed (in pixels per second sq.)
    * You must give a maximum speed value, beyond which the display object won't go any faster.
    * Note: The display object does not continuously track the target. If the target changes location during transit the display object will not modify its course.
    * Note: The display object doesn't stop moving once it reaches the destination coordinates.
    *
    * @method Phaser.Physics.Arcade#accelerateToXY
    * @param ***REMOVED***any***REMOVED*** displayObject - The display object to move.
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate to accelerate towards.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate to accelerate towards.
    * @param ***REMOVED***number***REMOVED*** [speed=60] - The speed it will accelerate in pixels per second.
    * @param ***REMOVED***number***REMOVED*** [xSpeedMax=500] - The maximum x velocity the display object can reach.
    * @param ***REMOVED***number***REMOVED*** [ySpeedMax=500] - The maximum y velocity the display object can reach.
    * @return ***REMOVED***number***REMOVED*** The angle (in radians) that the object should be visually set to in order to match its new trajectory.
    */
    accelerateToXY: function (displayObject, x, y, speed, xSpeedMax, ySpeedMax) ***REMOVED***

        if (speed === undefined) ***REMOVED*** speed = 60; ***REMOVED***
        if (xSpeedMax === undefined) ***REMOVED*** xSpeedMax = 1000; ***REMOVED***
        if (ySpeedMax === undefined) ***REMOVED*** ySpeedMax = 1000; ***REMOVED***

        var angle = this.angleToXY(displayObject, x, y);

        displayObject.body.acceleration.setTo(Math.cos(angle) * speed, Math.sin(angle) * speed);
        displayObject.body.maxVelocity.setTo(xSpeedMax, ySpeedMax);

        return angle;

    ***REMOVED***,

    /**
    * Find the distance between two display objects (like Sprites).
    *
    * The optional `world` argument allows you to return the result based on the Game Objects `world` property,
    * instead of its `x` and `y` values. This is useful of the object has been nested inside an offset Group,
    * or parent Game Object.
    *
    * @method Phaser.Physics.Arcade#distanceBetween
    * @param ***REMOVED***any***REMOVED*** source - The Display Object to test from.
    * @param ***REMOVED***any***REMOVED*** target - The Display Object to test to.
    * @param ***REMOVED***boolean***REMOVED*** [world=false] - Calculate the distance using World coordinates (true), or Object coordinates (false, the default)
    * @return ***REMOVED***number***REMOVED*** The distance between the source and target objects.
    */
    distanceBetween: function (source, target, world) ***REMOVED***

        if (world === undefined) ***REMOVED*** world = false; ***REMOVED***

        var dx = (world) ? source.world.x - target.world.x : source.x - target.x;
        var dy = (world) ? source.world.y - target.world.y : source.y - target.y;

        return Math.sqrt(dx * dx + dy * dy);

    ***REMOVED***,

    /**
    * Find the distance between a display object (like a Sprite) and the given x/y coordinates.
    * The calculation is made from the display objects x/y coordinate. This may be the top-left if its anchor hasn't been changed.
    * If you need to calculate from the center of a display object instead use the method distanceBetweenCenters()
    *
    * The optional `world` argument allows you to return the result based on the Game Objects `world` property,
    * instead of its `x` and `y` values. This is useful of the object has been nested inside an offset Group,
    * or parent Game Object.
    *
    * @method Phaser.Physics.Arcade#distanceToXY
    * @param ***REMOVED***any***REMOVED*** displayObject - The Display Object to test from.
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate to move towards.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate to move towards.
    * @param ***REMOVED***boolean***REMOVED*** [world=false] - Calculate the distance using World coordinates (true), or Object coordinates (false, the default)
    * @return ***REMOVED***number***REMOVED*** The distance between the object and the x/y coordinates.
    */
    distanceToXY: function (displayObject, x, y, world) ***REMOVED***

        if (world === undefined) ***REMOVED*** world = false; ***REMOVED***

        var dx = (world) ? displayObject.world.x - x : displayObject.x - x;
        var dy = (world) ? displayObject.world.y - y : displayObject.y - y;

        return Math.sqrt(dx * dx + dy * dy);

    ***REMOVED***,

    /**
    * Find the distance between a display object (like a Sprite) and a Pointer. If no Pointer is given the Input.activePointer is used.
    * The calculation is made from the display objects x/y coordinate. This may be the top-left if its anchor hasn't been changed.
    * If you need to calculate from the center of a display object instead use the method distanceBetweenCenters()
    *
    * The optional `world` argument allows you to return the result based on the Game Objects `world` property,
    * instead of its `x` and `y` values. This is useful of the object has been nested inside an offset Group,
    * or parent Game Object.
    *
    * @method Phaser.Physics.Arcade#distanceToPointer
    * @param ***REMOVED***any***REMOVED*** displayObject - The Display Object to test from.
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** [pointer] - The Phaser.Pointer to test to. If none is given then Input.activePointer is used.
    * @param ***REMOVED***boolean***REMOVED*** [world=false] - Calculate the distance using World coordinates (true), or Object coordinates (false, the default)
    * @return ***REMOVED***number***REMOVED*** The distance between the object and the Pointer.
    */
    distanceToPointer: function (displayObject, pointer, world) ***REMOVED***

        if (pointer === undefined) ***REMOVED*** pointer = this.game.input.activePointer; ***REMOVED***
        if (world === undefined) ***REMOVED*** world = false; ***REMOVED***

        var dx = (world) ? displayObject.world.x - pointer.worldX : displayObject.x - pointer.worldX;
        var dy = (world) ? displayObject.world.y - pointer.worldY : displayObject.y - pointer.worldY;

        return Math.sqrt(dx * dx + dy * dy);

    ***REMOVED***,

    /**
    * Find the angle in radians between two display objects (like Sprites).
    *
    * The optional `world` argument allows you to return the result based on the Game Objects `world` property,
    * instead of its `x` and `y` values. This is useful of the object has been nested inside an offset Group,
    * or parent Game Object.
    *
    * @method Phaser.Physics.Arcade#angleBetween
    * @param ***REMOVED***any***REMOVED*** source - The Display Object to test from.
    * @param ***REMOVED***any***REMOVED*** target - The Display Object to test to.
    * @param ***REMOVED***boolean***REMOVED*** [world=false] - Calculate the angle using World coordinates (true), or Object coordinates (false, the default)
    * @return ***REMOVED***number***REMOVED*** The angle in radians between the source and target display objects.
    */
    angleBetween: function (source, target, world) ***REMOVED***

        if (world === undefined) ***REMOVED*** world = false; ***REMOVED***

        if (world)
        ***REMOVED***
            return Math.atan2(target.world.y - source.world.y, target.world.x - source.world.x);
        ***REMOVED***
        else
        ***REMOVED***
            return Math.atan2(target.y - source.y, target.x - source.x);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Find the angle in radians between centers of two display objects (like Sprites).
    *
    * @method Phaser.Physics.Arcade#angleBetweenCenters
    * @param ***REMOVED***any***REMOVED*** source - The Display Object to test from.
    * @param ***REMOVED***any***REMOVED*** target - The Display Object to test to.
    * @return ***REMOVED***number***REMOVED*** The angle in radians between the source and target display objects.
    */
    angleBetweenCenters: function (source, target) ***REMOVED***

        var dx = target.centerX - source.centerX;
        var dy = target.centerY - source.centerY;

        return Math.atan2(dy, dx);

    ***REMOVED***,

    /**
    * Find the angle in radians between a display object (like a Sprite) and the given x/y coordinate.
    *
    * The optional `world` argument allows you to return the result based on the Game Objects `world` property,
    * instead of its `x` and `y` values. This is useful of the object has been nested inside an offset Group,
    * or parent Game Object.
    *
    * @method Phaser.Physics.Arcade#angleToXY
    * @param ***REMOVED***any***REMOVED*** displayObject - The Display Object to test from.
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate to get the angle to.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate to get the angle to.
    * @param ***REMOVED***boolean***REMOVED*** [world=false] - Calculate the angle using World coordinates (true), or Object coordinates (false, the default)
    * @return ***REMOVED***number***REMOVED*** The angle in radians between displayObject.x/y to Pointer.x/y
    */
    angleToXY: function (displayObject, x, y, world) ***REMOVED***

        if (world === undefined) ***REMOVED*** world = false; ***REMOVED***

        if (world)
        ***REMOVED***
            return Math.atan2(y - displayObject.world.y, x - displayObject.world.x);
        ***REMOVED***
        else
        ***REMOVED***
            return Math.atan2(y - displayObject.y, x - displayObject.x);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Find the angle in radians between a display object (like a Sprite) and a Pointer, taking their x/y and center into account.
    *
    * The optional `world` argument allows you to return the result based on the Game Objects `world` property,
    * instead of its `x` and `y` values. This is useful of the object has been nested inside an offset Group,
    * or parent Game Object.
    *
    * @method Phaser.Physics.Arcade#angleToPointer
    * @param ***REMOVED***any***REMOVED*** displayObject - The Display Object to test from.
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** [pointer] - The Phaser.Pointer to test to. If none is given then Input.activePointer is used.
    * @param ***REMOVED***boolean***REMOVED*** [world=false] - Calculate the angle using World coordinates (true), or Object coordinates (false, the default)
    * @return ***REMOVED***number***REMOVED*** The angle in radians between displayObject.x/y to Pointer.x/y
    */
    angleToPointer: function (displayObject, pointer, world) ***REMOVED***

        if (pointer === undefined) ***REMOVED*** pointer = this.game.input.activePointer; ***REMOVED***
        if (world === undefined) ***REMOVED*** world = false; ***REMOVED***

        if (world)
        ***REMOVED***
            return Math.atan2(pointer.worldY - displayObject.world.y, pointer.worldX - displayObject.world.x);
        ***REMOVED***
        else
        ***REMOVED***
            return Math.atan2(pointer.worldY - displayObject.y, pointer.worldX - displayObject.x);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Find the angle in radians between a display object (like a Sprite) and a Pointer, 
    * taking their x/y and center into account relative to the world.
    *
    * @method Phaser.Physics.Arcade#worldAngleToPointer
    * @param ***REMOVED***any***REMOVED*** displayObject - The DisplayObjerct to test from.
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** [pointer] - The Phaser.Pointer to test to. If none is given then Input.activePointer is used.
    * @return ***REMOVED***number***REMOVED*** The angle in radians between displayObject.world.x/y to Pointer.worldX / worldY
    */
    worldAngleToPointer: function (displayObject, pointer) ***REMOVED***

        return this.angleToPointer(displayObject, pointer, true);

    ***REMOVED***

***REMOVED***;

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
