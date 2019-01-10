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
