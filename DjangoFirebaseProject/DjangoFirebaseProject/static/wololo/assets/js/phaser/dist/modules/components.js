/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

Phaser.Component = function () ***REMOVED******REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Angle Component provides access to an `angle` property; the rotation of a Game Object in degrees.
*
* @class
*/
Phaser.Component.Angle = function () ***REMOVED******REMOVED***;

Phaser.Component.Angle.prototype = ***REMOVED***

    /**
    * The angle property is the rotation of the Game Object in *degrees* from its original orientation.
    * 
    * Values from 0 to 180 represent clockwise rotation; values from 0 to -180 represent counterclockwise rotation.
    * 
    * Values outside this range are added to or subtracted from 360 to obtain a value within the range. 
    * For example, the statement player.angle = 450 is the same as player.angle = 90.
    * 
    * If you wish to work in radians instead of degrees you can use the property `rotation` instead. 
    * Working in radians is slightly faster as it doesn't have to perform any calculations.
    *
    * @property ***REMOVED***number***REMOVED*** angle
    */
    angle: ***REMOVED***

        get: function() ***REMOVED***

            return Phaser.Math.wrapAngle(Phaser.Math.radToDeg(this.rotation));

        ***REMOVED***,

        set: function(value) ***REMOVED***

            this.rotation = Phaser.Math.degToRad(Phaser.Math.wrapAngle(value));

        ***REMOVED***

    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Animation Component provides a `play` method, which is a proxy to the `AnimationManager.play` method.
*
* @class
*/
Phaser.Component.Animation = function () ***REMOVED******REMOVED***;

Phaser.Component.Animation.prototype = ***REMOVED***

    /**
    * Plays an Animation.
    * 
    * The animation should have previously been created via `animations.add`.
    * 
    * If the animation is already playing calling this again won't do anything.
    * If you need to reset an already running animation do so directly on the Animation object itself or via `AnimationManager.stop`.
    *
    * @method
    * @param ***REMOVED***string***REMOVED*** name - The name of the animation to be played, e.g. "fire", "walk", "jump". Must have been previously created via 'AnimationManager.add'.
    * @param ***REMOVED***number***REMOVED*** [frameRate=null] - The framerate to play the animation at. The speed is given in frames per second. If not provided the previously set frameRate of the Animation is used.
    * @param ***REMOVED***boolean***REMOVED*** [loop=false] - Should the animation be looped after playback. If not provided the previously set loop value of the Animation is used.
    * @param ***REMOVED***boolean***REMOVED*** [killOnComplete=false] - If set to true when the animation completes (only happens if loop=false) the parent Sprite will be killed.
    * @return ***REMOVED***Phaser.Animation***REMOVED*** A reference to playing Animation.
    */
    play: function (name, frameRate, loop, killOnComplete) ***REMOVED***

        if (this.animations)
        ***REMOVED***
            return this.animations.play(name, frameRate, loop, killOnComplete);
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The AutoCull Component is responsible for providing methods that check if a Game Object is within the bounds of the World Camera.
* It is used by the InWorld component.
*
* @class
*/
Phaser.Component.AutoCull = function () ***REMOVED******REMOVED***;

Phaser.Component.AutoCull.prototype = ***REMOVED***

    /**
    * A Game Object with `autoCull` set to true will check its bounds against the World Camera every frame.
    * If it is not intersecting the Camera bounds at any point then it has its `renderable` property set to `false`.
    * This keeps the Game Object alive and still processing updates, but forces it to skip the render step entirely.
    * 
    * This is a relatively expensive operation, especially if enabled on hundreds of Game Objects. So enable it only if you know it's required,
    * or you have tested performance and find it acceptable.
    *
    * @property ***REMOVED***boolean***REMOVED*** autoCull
    * @default
    */
    autoCull: false,

    /**
    * Checks if the Game Objects bounds intersect with the Game Camera bounds.
    * Returns `true` if they do, otherwise `false` if fully outside of the Cameras bounds.
    *
    * @property ***REMOVED***boolean***REMOVED*** inCamera
    * @readonly
    */
    inCamera: ***REMOVED***

        get: function() ***REMOVED***

            if (!this.autoCull && !this.checkWorldBounds)
            ***REMOVED***
                this._bounds.copyFrom(this.getBounds());
                this._bounds.x += this.game.camera.view.x;
                this._bounds.y += this.game.camera.view.y;
            ***REMOVED***

            return this.game.world.camera.view.intersects(this._bounds);

        ***REMOVED***

    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Bounds component contains properties related to the bounds of the Game Object.
*
* @class
*/
Phaser.Component.Bounds = function () ***REMOVED******REMOVED***;

Phaser.Component.Bounds.prototype = ***REMOVED***

    /**
    * The amount the Game Object is visually offset from its x coordinate.
    * This is the same as `width * anchor.x`.
    * It will only be > 0 if anchor.x is not equal to zero.
    *
    * @property ***REMOVED***number***REMOVED*** offsetX
    * @readOnly
    */
    offsetX: ***REMOVED***

        get: function () ***REMOVED***

            return this.anchor.x * this.width;

        ***REMOVED***

    ***REMOVED***,

    /**
    * The amount the Game Object is visually offset from its y coordinate.
    * This is the same as `height * anchor.y`.
    * It will only be > 0 if anchor.y is not equal to zero.
    *
    * @property ***REMOVED***number***REMOVED*** offsetY
    * @readOnly
    */
    offsetY: ***REMOVED***

        get: function () ***REMOVED***

            return this.anchor.y * this.height;

        ***REMOVED***

    ***REMOVED***,

    /**
    * The center x coordinate of the Game Object.
    * This is the same as `(x - offsetX) + (width / 2)`.
    *
    * @property ***REMOVED***number***REMOVED*** centerX
    */
    centerX: ***REMOVED***

        get: function () ***REMOVED***

            return (this.x - this.offsetX) + (this.width * 0.5);

        ***REMOVED***,

        set: function (value) ***REMOVED***

            this.x = (value + this.offsetX) - (this.width * 0.5);

        ***REMOVED***

    ***REMOVED***,

    /**
    * The center y coordinate of the Game Object.
    * This is the same as `(y - offsetY) + (height / 2)`.
    *
    * @property ***REMOVED***number***REMOVED*** centerY
    */
    centerY: ***REMOVED***

        get: function () ***REMOVED***

            return (this.y - this.offsetY) + (this.height * 0.5);

        ***REMOVED***,

        set: function (value) ***REMOVED***

            this.y = (value + this.offsetY) - (this.height * 0.5);

        ***REMOVED***

    ***REMOVED***,

    /**
    * The left coordinate of the Game Object.
    * This is the same as `x - offsetX`.
    *
    * @property ***REMOVED***number***REMOVED*** left
    */
    left: ***REMOVED***

        get: function () ***REMOVED***

            return this.x - this.offsetX;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            this.x = value + this.offsetX;

        ***REMOVED***

    ***REMOVED***,

    /**
    * The right coordinate of the Game Object.
    * This is the same as `x + width - offsetX`.
    *
    * @property ***REMOVED***number***REMOVED*** right
    */
    right: ***REMOVED***

        get: function () ***REMOVED***

            return (this.x + this.width) - this.offsetX;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            this.x = value - (this.width) + this.offsetX;

        ***REMOVED***

    ***REMOVED***,

    /**
    * The y coordinate of the Game Object.
    * This is the same as `y - offsetY`.
    *
    * @property ***REMOVED***number***REMOVED*** top
    */
    top: ***REMOVED***

        get: function () ***REMOVED***

            return this.y - this.offsetY;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            this.y = value + this.offsetY;

        ***REMOVED***

    ***REMOVED***,

    /**
    * The sum of the y and height properties.
    * This is the same as `y + height - offsetY`.
    *
    * @property ***REMOVED***number***REMOVED*** bottom
    */
    bottom: ***REMOVED***

        get: function () ***REMOVED***

            return (this.y + this.height) - this.offsetY;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            this.y = value - (this.height) + this.offsetY;

        ***REMOVED***

    ***REMOVED***,

    /**
    * Aligns this Game Object within another Game Object, or Rectangle, known as the
    * 'container', to one of 9 possible positions.
    *
    * The container must be a Game Object, or Phaser.Rectangle object. This can include properties
    * such as `World.bounds` or `Camera.view`, for aligning Game Objects within the world 
    * and camera bounds. Or it can include other Sprites, Images, Text objects, BitmapText,
    * TileSprites or Buttons.
    *
    * Please note that aligning a Sprite to another Game Object does **not** make it a child of
    * the container. It simply modifies its position coordinates so it aligns with it.
    * 
    * The position constants you can use are:
    * 
    * `Phaser.TOP_LEFT`, `Phaser.TOP_CENTER`, `Phaser.TOP_RIGHT`, `Phaser.LEFT_CENTER`, 
    * `Phaser.CENTER`, `Phaser.RIGHT_CENTER`, `Phaser.BOTTOM_LEFT`, 
    * `Phaser.BOTTOM_CENTER` and `Phaser.BOTTOM_RIGHT`.
    *
    * The Game Objects are placed in such a way that their _bounds_ align with the
    * container, taking into consideration rotation, scale and the anchor property.
    * This allows you to neatly align Game Objects, irrespective of their position value.
    *
    * The optional `offsetX` and `offsetY` arguments allow you to apply extra spacing to the final
    * aligned position of the Game Object. For example:
    *
    * `sprite.alignIn(background, Phaser.BOTTOM_RIGHT, -20, -20)`
    *
    * Would align the `sprite` to the bottom-right, but moved 20 pixels in from the corner.
    * Think of the offsets as applying an adjustment to the containers bounds before the alignment takes place.
    * So providing a negative offset will 'shrink' the container bounds by that amount, and providing a positive
    * one expands it.
    *
    * @method
    * @param ***REMOVED***Phaser.Rectangle|Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapText|Phaser.Button|Phaser.Graphics|Phaser.TileSprite***REMOVED*** container - The Game Object or Rectangle with which to align this Game Object to. Can also include properties such as `World.bounds` or `Camera.view`.
    * @param ***REMOVED***integer***REMOVED*** [position] - The position constant. One of `Phaser.TOP_LEFT` (default), `Phaser.TOP_CENTER`, `Phaser.TOP_RIGHT`, `Phaser.LEFT_CENTER`, `Phaser.CENTER`, `Phaser.RIGHT_CENTER`, `Phaser.BOTTOM_LEFT`, `Phaser.BOTTOM_CENTER` or `Phaser.BOTTOM_RIGHT`.
    * @param ***REMOVED***integer***REMOVED*** [offsetX=0] - A horizontal adjustment of the Containers bounds, applied to the aligned position of the Game Object. Use a negative value to shrink the bounds, positive to increase it.
    * @param ***REMOVED***integer***REMOVED*** [offsetY=0] - A vertical adjustment of the Containers bounds, applied to the aligned position of the Game Object. Use a negative value to shrink the bounds, positive to increase it.
    * @return ***REMOVED***Object***REMOVED*** This Game Object.
    */
    alignIn: function (container, position, offsetX, offsetY) ***REMOVED***

        if (offsetX === undefined) ***REMOVED*** offsetX = 0; ***REMOVED***
        if (offsetY === undefined) ***REMOVED*** offsetY = 0; ***REMOVED***

        switch (position)
        ***REMOVED***
            default:
            case Phaser.TOP_LEFT:
                this.left = container.left - offsetX;
                this.top = container.top - offsetY;
                break;

            case Phaser.TOP_CENTER:
                this.centerX = container.centerX + offsetX;
                this.top = container.top - offsetY;
                break;

            case Phaser.TOP_RIGHT:
                this.right = container.right + offsetX;
                this.top = container.top - offsetY;
                break;

            case Phaser.LEFT_CENTER:
                this.left = container.left - offsetX;
                this.centerY = container.centerY + offsetY;
                break;

            case Phaser.CENTER:
                this.centerX = container.centerX + offsetX;
                this.centerY = container.centerY + offsetY;
                break;

            case Phaser.RIGHT_CENTER:
                this.right = container.right + offsetX;
                this.centerY = container.centerY + offsetY;
                break;

            case Phaser.BOTTOM_LEFT:
                this.left = container.left - offsetX;
                this.bottom = container.bottom + offsetY;
                break;

            case Phaser.BOTTOM_CENTER:
                this.centerX = container.centerX + offsetX;
                this.bottom = container.bottom + offsetY;
                break;

            case Phaser.BOTTOM_RIGHT:
                this.right = container.right + offsetX;
                this.bottom = container.bottom + offsetY;
                break;
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Aligns this Game Object to the side of another Game Object, or Rectangle, known as the
    * 'parent', in one of 11 possible positions.
    *
    * The parent must be a Game Object, or Phaser.Rectangle object. This can include properties
    * such as `World.bounds` or `Camera.view`, for aligning Game Objects within the world 
    * and camera bounds. Or it can include other Sprites, Images, Text objects, BitmapText,
    * TileSprites or Buttons.
    *
    * Please note that aligning a Sprite to another Game Object does **not** make it a child of
    * the parent. It simply modifies its position coordinates so it aligns with it.
    * 
    * The position constants you can use are:
    * 
    * `Phaser.TOP_LEFT` (default), `Phaser.TOP_CENTER`, `Phaser.TOP_RIGHT`, `Phaser.LEFT_TOP`, 
    * `Phaser.LEFT_CENTER`, `Phaser.LEFT_BOTTOM`, `Phaser.RIGHT_TOP`, `Phaser.RIGHT_CENTER`, 
    * `Phaser.RIGHT_BOTTOM`, `Phaser.BOTTOM_LEFT`, `Phaser.BOTTOM_CENTER` 
    * and `Phaser.BOTTOM_RIGHT`.
    *
    * The Game Objects are placed in such a way that their _bounds_ align with the
    * parent, taking into consideration rotation, scale and the anchor property.
    * This allows you to neatly align Game Objects, irrespective of their position value.
    *
    * The optional `offsetX` and `offsetY` arguments allow you to apply extra spacing to the final
    * aligned position of the Game Object. For example:
    *
    * `sprite.alignTo(background, Phaser.BOTTOM_RIGHT, -20, -20)`
    *
    * Would align the `sprite` to the bottom-right, but moved 20 pixels in from the corner.
    * Think of the offsets as applying an adjustment to the parents bounds before the alignment takes place.
    * So providing a negative offset will 'shrink' the parent bounds by that amount, and providing a positive
    * one expands it.
    *
    * @method
    * @param ***REMOVED***Phaser.Rectangle|Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapText|Phaser.Button|Phaser.Graphics|Phaser.TileSprite***REMOVED*** parent - The Game Object or Rectangle with which to align this Game Object to. Can also include properties such as `World.bounds` or `Camera.view`.
    * @param ***REMOVED***integer***REMOVED*** [position] - The position constant. One of `Phaser.TOP_LEFT`, `Phaser.TOP_CENTER`, `Phaser.TOP_RIGHT`, `Phaser.LEFT_TOP`, `Phaser.LEFT_CENTER`, `Phaser.LEFT_BOTTOM`, `Phaser.RIGHT_TOP`, `Phaser.RIGHT_CENTER`, `Phaser.RIGHT_BOTTOM`, `Phaser.BOTTOM_LEFT`, `Phaser.BOTTOM_CENTER` or `Phaser.BOTTOM_RIGHT`.
    * @param ***REMOVED***integer***REMOVED*** [offsetX=0] - A horizontal adjustment of the Containers bounds, applied to the aligned position of the Game Object. Use a negative value to shrink the bounds, positive to increase it.
    * @param ***REMOVED***integer***REMOVED*** [offsetY=0] - A vertical adjustment of the Containers bounds, applied to the aligned position of the Game Object. Use a negative value to shrink the bounds, positive to increase it.
    * @return ***REMOVED***Object***REMOVED*** This Game Object.
    */
    alignTo: function (parent, position, offsetX, offsetY) ***REMOVED***

        if (offsetX === undefined) ***REMOVED*** offsetX = 0; ***REMOVED***
        if (offsetY === undefined) ***REMOVED*** offsetY = 0; ***REMOVED***

        switch (position)
        ***REMOVED***
            default:
            case Phaser.TOP_LEFT:
                this.left = parent.left - offsetX;
                this.bottom = parent.top - offsetY;
                break;

            case Phaser.TOP_CENTER:
                this.centerX = parent.centerX + offsetX;
                this.bottom = parent.top - offsetY;
                break;

            case Phaser.TOP_RIGHT:
                this.right = parent.right + offsetX;
                this.bottom = parent.top - offsetY;
                break;

            case Phaser.LEFT_TOP:
                this.right = parent.left - offsetX;
                this.top = parent.top - offsetY;
                break;

            case Phaser.LEFT_CENTER:
                this.right = parent.left - offsetX;
                this.centerY = parent.centerY + offsetY;
                break;

            case Phaser.LEFT_BOTTOM:
                this.right = parent.left - offsetX;
                this.bottom = parent.bottom + offsetY;
                break;

            case Phaser.RIGHT_TOP:
                this.left = parent.right + offsetX;
                this.top = parent.top - offsetY;
                break;

            case Phaser.RIGHT_CENTER:
                this.left = parent.right + offsetX;
                this.centerY = parent.centerY + offsetY;
                break;

            case Phaser.RIGHT_BOTTOM:
                this.left = parent.right + offsetX;
                this.bottom = parent.bottom + offsetY;
                break;

            case Phaser.BOTTOM_LEFT:
                this.left = parent.left - offsetX;
                this.top = parent.bottom + offsetY;
                break;

            case Phaser.BOTTOM_CENTER:
                this.centerX = parent.centerX + offsetX;
                this.top = parent.bottom + offsetY;
                break;

            case Phaser.BOTTOM_RIGHT:
                this.right = parent.right + offsetX;
                this.top = parent.bottom + offsetY;
                break;
        ***REMOVED***

        return this;

    ***REMOVED***

***REMOVED***;

//  Phaser.Group extensions

Phaser.Group.prototype.alignIn = Phaser.Component.Bounds.prototype.alignIn;
Phaser.Group.prototype.alignTo = Phaser.Component.Bounds.prototype.alignTo;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The BringToTop Component features quick access to Group sorting related methods.
*
* @class
*/
Phaser.Component.BringToTop = function () ***REMOVED******REMOVED***;

/**
* Brings this Game Object to the top of its parents display list.
* Visually this means it will render over the top of any old child in the same Group.
* 
* If this Game Object hasn't been added to a custom Group then this method will bring it to the top of the Game World, 
* because the World is the root Group from which all Game Objects descend.
*
* @method
* @return ***REMOVED***PIXI.DisplayObject***REMOVED*** This instance.
*/
Phaser.Component.BringToTop.prototype.bringToTop = function() ***REMOVED***

    if (this.parent)
    ***REMOVED***
        this.parent.bringToTop(this);
    ***REMOVED***

    return this;

***REMOVED***;

/**
* Sends this Game Object to the bottom of its parents display list.
* Visually this means it will render below all other children in the same Group.
* 
* If this Game Object hasn't been added to a custom Group then this method will send it to the bottom of the Game World, 
* because the World is the root Group from which all Game Objects descend.
*
* @method
* @return ***REMOVED***PIXI.DisplayObject***REMOVED*** This instance.
*/
Phaser.Component.BringToTop.prototype.sendToBack = function() ***REMOVED***

    if (this.parent)
    ***REMOVED***
        this.parent.sendToBack(this);
    ***REMOVED***

    return this;

***REMOVED***;

/**
* Moves this Game Object up one place in its parents display list.
* This call has no effect if the Game Object is already at the top of the display list.
* 
* If this Game Object hasn't been added to a custom Group then this method will move it one object up within the Game World, 
* because the World is the root Group from which all Game Objects descend.
*
* @method
* @return ***REMOVED***PIXI.DisplayObject***REMOVED*** This instance.
*/
Phaser.Component.BringToTop.prototype.moveUp = function () ***REMOVED***

    if (this.parent)
    ***REMOVED***
        this.parent.moveUp(this);
    ***REMOVED***

    return this;

***REMOVED***;

/**
* Moves this Game Object down one place in its parents display list.
* This call has no effect if the Game Object is already at the bottom of the display list.
* 
* If this Game Object hasn't been added to a custom Group then this method will move it one object down within the Game World, 
* because the World is the root Group from which all Game Objects descend.
*
* @method
* @return ***REMOVED***PIXI.DisplayObject***REMOVED*** This instance.
*/
Phaser.Component.BringToTop.prototype.moveDown = function () ***REMOVED***

    if (this.parent)
    ***REMOVED***
        this.parent.moveDown(this);
    ***REMOVED***

    return this;

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Core Component Features.
*
* @class
*/
Phaser.Component.Core = function () ***REMOVED******REMOVED***;

/**
* Installs / registers mixin components.
*
* The `this` context should be that of the applicable object instance or prototype.
*
* @method
* @protected
*/
Phaser.Component.Core.install = function (components) ***REMOVED***

    // Always install 'Core' first
    Phaser.Utils.mixinPrototype(this, Phaser.Component.Core.prototype);

    this.components = ***REMOVED******REMOVED***;

    for (var i = 0; i < components.length; i++)
    ***REMOVED***
        var id = components[i];
        var replace = false;

        if (id === 'Destroy')
        ***REMOVED***
            replace = true;
        ***REMOVED***

        Phaser.Utils.mixinPrototype(this, Phaser.Component[id].prototype, replace);

        this.components[id] = true;
    ***REMOVED***

***REMOVED***;

/**
* Initializes the mixin components.
*
* The `this` context should be an instance of the component mixin target.
*
* @method
* @protected
*/
Phaser.Component.Core.init = function (game, x, y, key, frame) ***REMOVED***

    this.game = game;

    this.key = key;

    this.data = ***REMOVED******REMOVED***;

    this.position.set(x, y);
    this.world = new Phaser.Point(x, y);
    this.previousPosition = new Phaser.Point(x, y);

    this.events = new Phaser.Events(this);

    this._bounds = new Phaser.Rectangle();

    if (this.components.PhysicsBody)
    ***REMOVED***
        // Enable-body checks for hasOwnProperty; makes sure to lift property from prototype.
        this.body = this.body;
    ***REMOVED***

    if (this.components.Animation)
    ***REMOVED***
        this.animations = new Phaser.AnimationManager(this);
    ***REMOVED***

    if (this.components.LoadTexture && key !== null)
    ***REMOVED***
        this.loadTexture(key, frame);
    ***REMOVED***

    if (this.components.FixedToCamera)
    ***REMOVED***
        this.cameraOffset = new Phaser.Point(x, y);
    ***REMOVED***

***REMOVED***;

Phaser.Component.Core.preUpdate = function () ***REMOVED***

    if (this.pendingDestroy)
    ***REMOVED***
        this.destroy();
        return;
    ***REMOVED***

    this.previousPosition.set(this.world.x, this.world.y);
    this.previousRotation = this.rotation;

    if (!this.exists || !this.parent.exists)
    ***REMOVED***
        this.renderOrderID = -1;
        return false;
    ***REMOVED***

    this.world.setTo(this.game.camera.x + this.worldTransform.tx, this.game.camera.y + this.worldTransform.ty);

    if (this.visible)
    ***REMOVED***
        this.renderOrderID = this.game.stage.currentRenderOrderID++;
    ***REMOVED***

    if (this.animations)
    ***REMOVED***
        this.animations.update();
    ***REMOVED***

    if (this.body)
    ***REMOVED***
        this.body.preUpdate();
    ***REMOVED***

    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        this.children[i].preUpdate();
    ***REMOVED***

    return true;

***REMOVED***;

Phaser.Component.Core.prototype = ***REMOVED***

    /**
    * A reference to the currently running Game.
    * @property ***REMOVED***Phaser.Game***REMOVED*** game
    */
    game: null,

    /**
    * A user defined name given to this Game Object.
    * This value isn't ever used internally by Phaser, it is meant as a game level property.
    * @property ***REMOVED***string***REMOVED*** name
    * @default
    */
    name: '',

    /**
    * An empty Object that belongs to this Game Object.
    * This value isn't ever used internally by Phaser, but may be used by your own code, or
    * by Phaser Plugins, to store data that needs to be associated with the Game Object,
    * without polluting the Game Object directly.
    * @property ***REMOVED***Object***REMOVED*** data
    * @default
    */
    data: ***REMOVED******REMOVED***,

    /**
    * The components this Game Object has installed.
    * @property ***REMOVED***object***REMOVED*** components
    * @protected
    */
    components: ***REMOVED******REMOVED***,

    /**
    * The z depth of this Game Object within its parent Group.
    * No two objects in a Group can have the same z value.
    * This value is adjusted automatically whenever the Group hierarchy changes.
    * If you wish to re-order the layering of a Game Object then see methods like Group.moveUp or Group.bringToTop.
    * @property ***REMOVED***number***REMOVED*** z
    * @readOnly
    */
    z: 0,

    /**
    * All Phaser Game Objects have an Events class which contains all of the events that are dispatched when certain things happen to this
    * Game Object, or any of its components.
    * @see Phaser.Events
    * @property ***REMOVED***Phaser.Events***REMOVED*** events
    */
    events: undefined,

    /**
    * If the Game Object is enabled for animation (such as a Phaser.Sprite) this is a reference to its AnimationManager instance.
    * Through it you can create, play, pause and stop animations.
    * @see Phaser.AnimationManager
    * @property ***REMOVED***Phaser.AnimationManager***REMOVED*** animations
    */
    animations: undefined,

    /**
    * The key of the image or texture used by this Game Object during rendering.
    * If it is a string it's the string used to retrieve the texture from the Phaser Image Cache.
    * It can also be an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
    * If a Game Object is created without a key it is automatically assigned the key `__default` which is a 32x32 transparent PNG stored within the Cache.
    * If a Game Object is given a key which doesn't exist in the Image Cache it is re-assigned the key `__missing` which is a 32x32 PNG of a green box with a line through it.
    * @property ***REMOVED***string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture***REMOVED*** key
    */
    key: '',

    /**
    * The world coordinates of this Game Object in pixels.
    * Depending on where in the display list this Game Object is placed this value can differ from `position`, 
    * which contains the x/y coordinates relative to the Game Objects parent.
    * @property ***REMOVED***Phaser.Point***REMOVED*** world
    */
    world: null,

    /**
    * A debug flag designed for use with `Game.enableStep`.
    * @property ***REMOVED***boolean***REMOVED*** debug
    * @default
    */
    debug: false,

    /**
    * The position the Game Object was located in the previous frame.
    * @property ***REMOVED***Phaser.Point***REMOVED*** previousPosition
    * @readOnly
    */
    previousPosition: null,

    /**
    * The rotation the Game Object was in set to in the previous frame. Value is in radians.
    * @property ***REMOVED***number***REMOVED*** previousRotation
    * @readOnly
    */
    previousRotation: 0,

    /**
    * The render order ID is used internally by the renderer and Input Manager and should not be modified.
    * This property is mostly used internally by the renderers, but is exposed for the use of plugins.
    * @property ***REMOVED***number***REMOVED*** renderOrderID
    * @readOnly
    */
    renderOrderID: 0,

    /**
    * A Game Object is considered `fresh` if it has just been created or reset and is yet to receive a renderer transform update.
    * This property is mostly used internally by the physics systems, but is exposed for the use of plugins.
    * @property ***REMOVED***boolean***REMOVED*** fresh
    * @readOnly
    */
    fresh: true,

    /**
    * A Game Object is that is pendingDestroy is flagged to have its destroy method called on the next logic update.
    * You can set it directly to allow you to flag an object to be destroyed on its next update.
    * 
    * This is extremely useful if you wish to destroy an object from within one of its own callbacks 
    * such as with Buttons or other Input events.
    * 
    * @property ***REMOVED***boolean***REMOVED*** pendingDestroy
    */
    pendingDestroy: false,

    /**
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** _bounds - Internal cache var.
    * @private
    */
    _bounds: null,

    /**
    * @property ***REMOVED***boolean***REMOVED*** _exists - Internal cache var.
    * @private
    */
    _exists: true,

    /**
    * Controls if this Game Object is processed by the core game loop.
    * If this Game Object has a physics body it also controls if its physics body is updated or not.
    * When `exists` is set to `false` it will remove its physics body from the physics world if it has one.
    * It also toggles the `visible` property to false as well.
    *
    * Setting `exists` to true will add its physics body back in to the physics world, if it has one.
    * It will also set the `visible` property to `true`.
    *
    * @property ***REMOVED***boolean***REMOVED*** exists
    */
    exists: ***REMOVED***

        get: function () ***REMOVED***

            return this._exists;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            if (value)
            ***REMOVED***
                this._exists = true;

                if (this.body && this.body.type === Phaser.Physics.P2JS)
                ***REMOVED***
                    this.body.addToWorld();
                ***REMOVED***

                this.visible = true;
            ***REMOVED***
            else
            ***REMOVED***
                this._exists = false;

                if (this.body && this.body.type === Phaser.Physics.P2JS)
                ***REMOVED***
                    this.body.removeFromWorld();
                ***REMOVED***

                this.visible = false;
            ***REMOVED***

        ***REMOVED***

    ***REMOVED***,

    /**
    * Override this method in your own custom objects to handle any update requirements.
    * It is called immediately after `preUpdate` and before `postUpdate`.
    * Remember if this Game Object has any children you should call update on those too.
    *
    * @method
    */
    update: function() ***REMOVED***

    ***REMOVED***,

    /**
    * Internal method called by the World postUpdate cycle.
    *
    * @method
    * @protected
    */
    postUpdate: function() ***REMOVED***

        if (this.customRender)
        ***REMOVED***
            this.key.render();
        ***REMOVED***

        if (this.components.PhysicsBody)
        ***REMOVED***
            Phaser.Component.PhysicsBody.postUpdate.call(this);
        ***REMOVED***

        if (this.components.FixedToCamera)
        ***REMOVED***
            Phaser.Component.FixedToCamera.postUpdate.call(this);
        ***REMOVED***

        for (var i = 0; i < this.children.length; i++)
        ***REMOVED***
            this.children[i].postUpdate();
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Crop component provides the ability to crop a texture based Game Object to a defined rectangle, 
* which can be updated in real-time.
*
* @class
*/
Phaser.Component.Crop = function () ***REMOVED******REMOVED***;

Phaser.Component.Crop.prototype = ***REMOVED***

    /**
    * The Rectangle used to crop the texture this Game Object uses.
    * Set this property via `crop`. 
    * If you modify this property directly you must call `updateCrop` in order to have the change take effect.
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** cropRect
    * @default
    */
    cropRect: null,

    /**
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** _crop - Internal cache var.
    * @private
    */
    _crop: null,

    /**
    * Crop allows you to crop the texture being used to display this Game Object.
    * Setting a crop rectangle modifies the core texture frame. The Game Object width and height properties will be adjusted accordingly.
    *
    * Cropping takes place from the top-left and can be modified in real-time either by providing an updated rectangle object to this method,
    * or by modifying `cropRect` property directly and then calling `updateCrop`.
    *
    * The rectangle object given to this method can be either a `Phaser.Rectangle` or any other object 
    * so long as it has public `x`, `y`, `width`, `height`, `right` and `bottom` properties.
    * 
    * A reference to the rectangle is stored in `cropRect` unless the `copy` parameter is `true`, 
    * in which case the values are duplicated to a local object.
    *
    * @method
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** rect - The Rectangle used during cropping. Pass null or no parameters to clear a previously set crop rectangle.
    * @param ***REMOVED***boolean***REMOVED*** [copy=false] - If false `cropRect` will be stored as a reference to the given rect. If true it will copy the rect values into a local Phaser Rectangle object stored in cropRect.
    */
    crop: function (rect, copy) ***REMOVED***

        if (copy === undefined) ***REMOVED*** copy = false; ***REMOVED***

        if (rect)
        ***REMOVED***
            if (copy && this.cropRect !== null)
            ***REMOVED***
                this.cropRect.setTo(rect.x, rect.y, rect.width, rect.height);
            ***REMOVED***
            else if (copy && this.cropRect === null)
            ***REMOVED***
                this.cropRect = new Phaser.Rectangle(rect.x, rect.y, rect.width, rect.height);
            ***REMOVED***
            else
            ***REMOVED***
                this.cropRect = rect;
            ***REMOVED***

            this.updateCrop();
        ***REMOVED***
        else
        ***REMOVED***
            this._crop = null;
            this.cropRect = null;

            this.resetFrame();
        ***REMOVED***

    ***REMOVED***,

    /**
    * If you have set a crop rectangle on this Game Object via `crop` and since modified the `cropRect` property,
    * or the rectangle it references, then you need to update the crop frame by calling this method.
    *
    * @method
    */
    updateCrop: function () ***REMOVED***

        if (!this.cropRect)
        ***REMOVED***
            return;
        ***REMOVED***

        var oldX = this.texture.crop.x;
        var oldY = this.texture.crop.y;
        var oldW = this.texture.crop.width;
        var oldH = this.texture.crop.height;

        this._crop = Phaser.Rectangle.clone(this.cropRect, this._crop);
        this._crop.x += this._frame.x;
        this._crop.y += this._frame.y;

        var cx = Math.max(this._frame.x, this._crop.x);
        var cy = Math.max(this._frame.y, this._crop.y);
        var cw = Math.min(this._frame.right, this._crop.right) - cx;
        var ch = Math.min(this._frame.bottom, this._crop.bottom) - cy;

        this.texture.crop.x = cx;
        this.texture.crop.y = cy;
        this.texture.crop.width = cw;
        this.texture.crop.height = ch;

        this.texture.frame.width = Math.min(cw, this.cropRect.width);
        this.texture.frame.height = Math.min(ch, this.cropRect.height);

        this.texture.width = this.texture.frame.width;
        this.texture.height = this.texture.frame.height;

        this.texture._updateUvs();

        if (this.tint !== 0xffffff && (oldX !== cx || oldY !== cy || oldW !== cw || oldH !== ch))
        ***REMOVED***
            this.texture.requiresReTint = true;
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Delta component provides access to delta values between the Game Objects current and previous position.
*
* @class
*/
Phaser.Component.Delta = function () ***REMOVED******REMOVED***;

Phaser.Component.Delta.prototype = ***REMOVED***

    /**
    * Returns the delta x value. The difference between world.x now and in the previous frame.
    * 
    * The value will be positive if the Game Object has moved to the right or negative if to the left.
    *
    * @property ***REMOVED***number***REMOVED*** deltaX
    * @readonly
    */
    deltaX: ***REMOVED***

        get: function() ***REMOVED***

            return this.world.x - this.previousPosition.x;

        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns the delta y value. The difference between world.y now and in the previous frame.
    * 
    * The value will be positive if the Game Object has moved down or negative if up.
    *
    * @property ***REMOVED***number***REMOVED*** deltaY
    * @readonly
    */
    deltaY: ***REMOVED***

        get: function() ***REMOVED***

            return this.world.y - this.previousPosition.y;

        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns the delta z value. The difference between rotation now and in the previous frame.
    *
    * @property ***REMOVED***number***REMOVED*** deltaZ - The delta value.
    * @readonly
    */
    deltaZ: ***REMOVED***

        get: function() ***REMOVED***

            return this.rotation - this.previousRotation;

        ***REMOVED***

    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Destroy component is responsible for destroying a Game Object.
*
* @class
*/
Phaser.Component.Destroy = function () ***REMOVED******REMOVED***;

Phaser.Component.Destroy.prototype = ***REMOVED***

    /**
    * As a Game Object runs through its destroy method this flag is set to true, 
    * and can be checked in any sub-systems or plugins it is being destroyed from.
    * @property ***REMOVED***boolean***REMOVED*** destroyPhase
    * @readOnly
    */
    destroyPhase: false,

    /**
    * Destroys the Game Object. This removes it from its parent group, destroys the input, event and animation handlers if present
    * and nulls its reference to `game`, freeing it up for garbage collection.
    * 
    * If this Game Object has the Events component it will also dispatch the `onDestroy` event.
    *
    * You can optionally also destroy the BaseTexture this Game Object is using. Be careful if you've
    * more than one Game Object sharing the same BaseTexture.
    *
    * @method
    * @param ***REMOVED***boolean***REMOVED*** [destroyChildren=true] - Should every child of this object have its destroy method called as well?
    * @param ***REMOVED***boolean***REMOVED*** [destroyTexture=false] - Destroy the BaseTexture this Game Object is using? Note that if another Game Object is sharing the same BaseTexture it will invalidate it.
    */
    destroy: function (destroyChildren, destroyTexture) ***REMOVED***

        if (this.game === null || this.destroyPhase) ***REMOVED*** return; ***REMOVED***

        if (destroyChildren === undefined) ***REMOVED*** destroyChildren = true; ***REMOVED***
        if (destroyTexture === undefined) ***REMOVED*** destroyTexture = false; ***REMOVED***

        this.destroyPhase = true;

        if (this.events)
        ***REMOVED***
            this.events.onDestroy$dispatch(this);
        ***REMOVED***

        if (this.parent)
        ***REMOVED***
            if (this.parent instanceof Phaser.Group)
            ***REMOVED***
                this.parent.remove(this);
            ***REMOVED***
            else
            ***REMOVED***
                this.parent.removeChild(this);
            ***REMOVED***
        ***REMOVED***

        if (this.input)
        ***REMOVED***
            this.input.destroy();
        ***REMOVED***

        if (this.animations)
        ***REMOVED***
            this.animations.destroy();
        ***REMOVED***

        if (this.body)
        ***REMOVED***
            this.body.destroy();
        ***REMOVED***

        if (this.events)
        ***REMOVED***
            this.events.destroy();
        ***REMOVED***

        this.game.tweens.removeFrom(this);

        var i = this.children.length;

        if (destroyChildren)
        ***REMOVED***
            while (i--)
            ***REMOVED***
                this.children[i].destroy(destroyChildren);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            while (i--)
            ***REMOVED***
                this.removeChild(this.children[i]);
            ***REMOVED***
        ***REMOVED***

        if (this._crop)
        ***REMOVED***
            this._crop = null;
            this.cropRect = null;
        ***REMOVED***

        if (this._frame)
        ***REMOVED***
            this._frame = null;
        ***REMOVED***

        if (Phaser.Video && this.key instanceof Phaser.Video)
        ***REMOVED***
            this.key.onChangeSource.remove(this.resizeFrame, this);
        ***REMOVED***

        if (Phaser.BitmapText && this._glyphs)
        ***REMOVED***
            this._glyphs = [];
        ***REMOVED***

        this.alive = false;
        this.exists = false;
        this.visible = false;

        this.filters = null;
        this.mask = null;
        this.game = null;

        this.data = ***REMOVED******REMOVED***;

        //  In case Pixi is still going to try and render it even though destroyed
        this.renderable = false;

        if (this.transformCallback)
        ***REMOVED***
            this.transformCallback = null;
            this.transformCallbackContext = null;
        ***REMOVED***

        //  Pixi level DisplayObject destroy
        this.hitArea = null;
        this.parent = null;
        this.stage = null;
        this.worldTransform = null;
        this.filterArea = null;
        this._bounds = null;
        this._currentBounds = null;
        this._mask = null;

        this._destroyCachedSprite();

        //  Texture?
        if (destroyTexture)
        ***REMOVED***
            this.texture.destroy(true);
        ***REMOVED***

        this.destroyPhase = false;
        this.pendingDestroy = false;

    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Events component is a collection of events fired by the parent Game Object.
* 
* Phaser uses what are known as 'Signals' for all event handling. All of the events in
* this class are signals you can subscribe to, much in the same way you'd "listen" for
* an event.
*
* For example to tell when a Sprite has been added to a new group, you can bind a function
* to the `onAddedToGroup` signal:
*
* `sprite.events.onAddedToGroup.add(yourFunction, this);`
*
* Where `yourFunction` is the function you want called when this event occurs.
* 
* For more details about how signals work please see the Phaser.Signal class.
*
* The Input-related events will only be dispatched if the Sprite has had `inputEnabled` set to `true`
* and the Animation-related events only apply to game objects with animations like ***REMOVED***@link Phaser.Sprite***REMOVED***.
*
* @class Phaser.Events
* @constructor
* @param ***REMOVED***Phaser.Sprite***REMOVED*** sprite - A reference to the game object / Sprite that owns this Events object.
*/
Phaser.Events = function (sprite) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Sprite***REMOVED*** parent - The Sprite that owns these events.
    */
    this.parent = sprite;

    // The signals are automatically added by the corresponding proxy properties

***REMOVED***;

Phaser.Events.prototype = ***REMOVED***

    /**
     * Removes all events.
     *
     * @method Phaser.Events#destroy
     */
    destroy: function () ***REMOVED***

        this._parent = null;

        if (this._onDestroy)           ***REMOVED*** this._onDestroy.dispose(); ***REMOVED***
        if (this._onAddedToGroup)      ***REMOVED*** this._onAddedToGroup.dispose(); ***REMOVED***
        if (this._onRemovedFromGroup)  ***REMOVED*** this._onRemovedFromGroup.dispose(); ***REMOVED***
        if (this._onRemovedFromWorld)  ***REMOVED*** this._onRemovedFromWorld.dispose(); ***REMOVED***
        if (this._onKilled)            ***REMOVED*** this._onKilled.dispose(); ***REMOVED***
        if (this._onRevived)           ***REMOVED*** this._onRevived.dispose(); ***REMOVED***
        if (this._onEnterBounds)       ***REMOVED*** this._onEnterBounds.dispose(); ***REMOVED***
        if (this._onOutOfBounds)       ***REMOVED*** this._onOutOfBounds.dispose(); ***REMOVED***

        if (this._onInputOver)         ***REMOVED*** this._onInputOver.dispose(); ***REMOVED***
        if (this._onInputOut)          ***REMOVED*** this._onInputOut.dispose(); ***REMOVED***
        if (this._onInputDown)         ***REMOVED*** this._onInputDown.dispose(); ***REMOVED***
        if (this._onInputUp)           ***REMOVED*** this._onInputUp.dispose(); ***REMOVED***
        if (this._onDragStart)         ***REMOVED*** this._onDragStart.dispose(); ***REMOVED***
        if (this._onDragUpdate)        ***REMOVED*** this._onDragUpdate.dispose(); ***REMOVED***
        if (this._onDragStop)          ***REMOVED*** this._onDragStop.dispose(); ***REMOVED***

        if (this._onAnimationStart)    ***REMOVED*** this._onAnimationStart.dispose(); ***REMOVED***
        if (this._onAnimationComplete) ***REMOVED*** this._onAnimationComplete.dispose(); ***REMOVED***
        if (this._onAnimationLoop)     ***REMOVED*** this._onAnimationLoop.dispose(); ***REMOVED***

    ***REMOVED***,

    // The following properties are sentinels that will be replaced with getters

    /**
    * This signal is dispatched when this Game Object is added to a new Group.
    * It is sent two arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that was added to the Group.
    * ***REMOVED***Phaser.Group***REMOVED*** The Group it was added to.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onAddedToGroup
    */
    onAddedToGroup: null,

    /**
    * This signal is dispatched when the Game Object is removed from a Group.
    * It is sent two arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that was removed from the Group.
    * ***REMOVED***Phaser.Group***REMOVED*** The Group it was removed from.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onRemovedFromGroup
    */
    onRemovedFromGroup: null,

    /**
    * This Signal is never used internally by Phaser and is now deprecated.
    * @deprecated
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onRemovedFromWorld
    */
    onRemovedFromWorld: null,

    /**
    * This signal is dispatched when the Game Object is destroyed.
    * This happens when `Sprite.destroy()` is called, or `Group.destroy()` with `destroyChildren` set to true.
    * It is sent one argument:
    * ***REMOVED***any***REMOVED*** The Game Object that was destroyed.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onDestroy
    */
    onDestroy: null,

    /**
    * This signal is dispatched when the Game Object is killed.
    * This happens when `Sprite.kill()` is called.
    * Please understand the difference between `kill` and `destroy` by looking at their respective methods.
    * It is sent one argument:
    * ***REMOVED***any***REMOVED*** The Game Object that was killed.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onKilled
    */
    onKilled: null,

    /**
    * This signal is dispatched when the Game Object is revived from a previously killed state.
    * This happens when `Sprite.revive()` is called.
    * It is sent one argument:
    * ***REMOVED***any***REMOVED*** The Game Object that was revived.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onRevived
    */
    onRevived: null,

    /**
    * This signal is dispatched when the Game Object leaves the Phaser.World bounds.
    * This signal is only if `Sprite.checkWorldBounds` is set to `true`.
    * It is sent one argument:
    * ***REMOVED***any***REMOVED*** The Game Object that left the World bounds.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onOutOfBounds
    */
    onOutOfBounds: null,

    /**
    * This signal is dispatched when the Game Object returns within the Phaser.World bounds, having previously been outside of them.
    * This signal is only if `Sprite.checkWorldBounds` is set to `true`.
    * It is sent one argument:
    * ***REMOVED***any***REMOVED*** The Game Object that entered the World bounds.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onEnterBounds
    */
    onEnterBounds: null,

    /**
    * This signal is dispatched if the Game Object has `inputEnabled` set to `true`, 
    * and receives an over event from a Phaser.Pointer.
    * It is sent two arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Pointer***REMOVED*** The Phaser.Pointer object that caused the event.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onInputOver
    */
    onInputOver: null,

    /**
    * This signal is dispatched if the Game Object has `inputEnabled` set to `true`, 
    * and receives an out event from a Phaser.Pointer, which was previously over it.
    * It is sent two arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Pointer***REMOVED*** The Phaser.Pointer object that caused the event.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onInputOut
    */
    onInputOut: null,

    /**
    * This signal is dispatched if the Game Object has `inputEnabled` set to `true`, 
    * and receives a down event from a Phaser.Pointer. This effectively means the Pointer has been
    * pressed down (but not yet released) on the Game Object.
    * It is sent two arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Pointer***REMOVED*** The Phaser.Pointer object that caused the event.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onInputDown
    */
    onInputDown: null,

    /**
    * This signal is dispatched if the Game Object has `inputEnabled` set to `true`, 
    * and receives an up event from a Phaser.Pointer. This effectively means the Pointer had been
    * pressed down, and was then released on the Game Object.
    * It is sent three arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Pointer***REMOVED*** The Phaser.Pointer object that caused the event.
    * ***REMOVED***boolean***REMOVED*** isOver - Is the Pointer still over the Game Object?
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onInputUp
    */
    onInputUp: null,

    /**
    * This signal is dispatched if the Game Object has been `inputEnabled` and `enableDrag` has been set.
    * It is sent when a Phaser.Pointer starts to drag the Game Object, taking into consideration the various
    * drag limitations that may be set.
    * It is sent four arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Pointer***REMOVED*** The Phaser.Pointer object that caused the event.
    * ***REMOVED***number***REMOVED*** The x coordinate that the drag started from.
    * ***REMOVED***number***REMOVED*** The y coordinate that the drag started from.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onDragStart
    */
    onDragStart: null,

    /**
    * This signal is dispatched if the Game Object has been `inputEnabled` and `enableDrag` has been set.
    * It is sent when a Phaser.Pointer is actively dragging the Game Object.
    * Be warned: This is a high volume Signal. Be careful what you bind to it.
    * It is sent six arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Pointer***REMOVED*** The Phaser.Pointer object that caused the event.
    * ***REMOVED***number***REMOVED*** The new x coordinate of the Game Object.
    * ***REMOVED***number***REMOVED*** The new y coordinate of the Game Object.
    * ***REMOVED***Phaser.Point***REMOVED*** A Point object that contains the point the Game Object was snapped to, if `snapOnDrag` has been enabled.
    * ***REMOVED***boolean***REMOVED*** The `fromStart` boolean, indicates if this is the first update immediately after the drag has started.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onDragUpdate
    */
    onDragUpdate: null,

    /**
    * This signal is dispatched if the Game Object has been `inputEnabled` and `enableDrag` has been set.
    * It is sent when a Phaser.Pointer stops dragging the Game Object.
    * It is sent two arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Pointer***REMOVED*** The Phaser.Pointer object that caused the event.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onDragStop
    */
    onDragStop: null,

    /**
    * This signal is dispatched if the Game Object has the AnimationManager component, 
    * and an Animation has been played.
    * You can also listen to `Animation.onStart` rather than via the Game Objects events.
    * It is sent two arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Animation***REMOVED*** The Phaser.Animation that was started.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onAnimationStart
    */
    onAnimationStart: null,

    /**
    * This signal is dispatched if the Game Object has the AnimationManager component, 
    * and an Animation has been stopped (via `animation.stop()` and the `dispatchComplete` argument has been set.
    * You can also listen to `Animation.onComplete` rather than via the Game Objects events.
    * It is sent two arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Animation***REMOVED*** The Phaser.Animation that was stopped.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onAnimationComplete
    */
    onAnimationComplete: null,

    /**
    * This signal is dispatched if the Game Object has the AnimationManager component, 
    * and an Animation has looped playback.
    * You can also listen to `Animation.onLoop` rather than via the Game Objects events.
    * It is sent two arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Animation***REMOVED*** The Phaser.Animation that looped.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onAnimationLoop
    */
    onAnimationLoop: null

***REMOVED***;

Phaser.Events.prototype.constructor = Phaser.Events;

// Create an auto-create proxy getter and dispatch method for all events.
// The backing property is the same as the event name, prefixed with '_'
// and the dispatch method is the same as the event name postfixed with '$dispatch'.
for (var prop in Phaser.Events.prototype)
***REMOVED***
    if (!Phaser.Events.prototype.hasOwnProperty(prop) ||
        prop.indexOf('on') !== 0 ||
        Phaser.Events.prototype[prop] !== null)
    ***REMOVED***
        continue;
    ***REMOVED***

    (function (prop, backing) ***REMOVED***
        'use strict';

        // The accessor creates a new Signal; and so it should only be used from user-code.
        Object.defineProperty(Phaser.Events.prototype, prop, ***REMOVED***
            get: function () ***REMOVED***
                return this[backing] || (this[backing] = new Phaser.Signal());
            ***REMOVED***
        ***REMOVED***);

        // The dispatcher will only broadcast on an already-created signal; call this internally.
        Phaser.Events.prototype[prop + '$dispatch'] = function () ***REMOVED***
            return this[backing] ? this[backing].dispatch.apply(this[backing], arguments) : null;
        ***REMOVED***;

    ***REMOVED***)(prop, '_' + prop);

***REMOVED***

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The FixedToCamera component enables a Game Object to be rendered relative to the game camera coordinates, regardless 
* of where in the world the camera is. This is used for things like sticking game UI to the camera that scrolls as it moves around the world.
*
* @class
*/
Phaser.Component.FixedToCamera = function () ***REMOVED******REMOVED***;

/**
 * The FixedToCamera component postUpdate handler.
 * Called automatically by the Game Object.
 *
 * @method
 */
Phaser.Component.FixedToCamera.postUpdate = function () ***REMOVED***

    if (this.fixedToCamera)
    ***REMOVED***
        this.position.x = (this.game.camera.view.x + this.cameraOffset.x) / this.game.camera.scale.x;
        this.position.y = (this.game.camera.view.y + this.cameraOffset.y) / this.game.camera.scale.y;
    ***REMOVED***

***REMOVED***;

Phaser.Component.FixedToCamera.prototype = ***REMOVED***

    /**
    * @property ***REMOVED***boolean***REMOVED*** _fixedToCamera
    * @private
    */
    _fixedToCamera: false,

    /**
    * A Game Object that is "fixed" to the camera uses its x/y coordinates as offsets from the top left of the camera during rendering.
    * 
    * The values are adjusted at the rendering stage, overriding the Game Objects actual world position.
    * 
    * The end result is that the Game Object will appear to be 'fixed' to the camera, regardless of where in the game world
    * the camera is viewing. This is useful if for example this Game Object is a UI item that you wish to be visible at all times 
    * regardless where in the world the camera is.
    * 
    * The offsets are stored in the `cameraOffset` property.
    * 
    * Note that the `cameraOffset` values are in addition to any parent of this Game Object on the display list.
    *
    * Be careful not to set `fixedToCamera` on Game Objects which are in Groups that already have `fixedToCamera` enabled on them.
    *
    * @property ***REMOVED***boolean***REMOVED*** fixedToCamera
    */
    fixedToCamera: ***REMOVED***

        get: function () ***REMOVED***

            return this._fixedToCamera;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            if (value)
            ***REMOVED***
                this._fixedToCamera = true;
                this.cameraOffset.set(this.x, this.y);
            ***REMOVED***
            else
            ***REMOVED***
                this._fixedToCamera = false;
            ***REMOVED***

        ***REMOVED***

    ***REMOVED***,

    /**
    * The x/y coordinate offset applied to the top-left of the camera that this Game Object will be drawn at if `fixedToCamera` is true.
    * 
    * The values are relative to the top-left of the camera view and in addition to any parent of the Game Object on the display list.
    * @property ***REMOVED***Phaser.Point***REMOVED*** cameraOffset
    */
    cameraOffset: new Phaser.Point()

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Health component provides the ability for Game Objects to have a `health` property 
* that can be damaged and reset through game code.
* Requires the LifeSpan component.
*
* @class
*/
Phaser.Component.Health = function () ***REMOVED******REMOVED***;

Phaser.Component.Health.prototype = ***REMOVED***

    /**
    * The Game Objects health value. This is a handy property for setting and manipulating health on a Game Object.
    * 
    * It can be used in combination with the `damage` method or modified directly.
    * 
    * @property ***REMOVED***number***REMOVED*** health
    * @default
    */
    health: 1,

    /**
    * The Game Objects maximum health value. This works in combination with the `heal` method to ensure
    * the health value never exceeds the maximum.
    * 
    * @property ***REMOVED***number***REMOVED*** maxHealth
    * @default
    */
    maxHealth: 100,

    /**
    * Damages the Game Object. This removes the given amount of health from the `health` property.
    * 
    * If health is taken below or is equal to zero then the `kill` method is called.
    *
    * @member
    * @param ***REMOVED***number***REMOVED*** amount - The amount to subtract from the current `health` value.
    * @return ***REMOVED***Phaser.Sprite***REMOVED*** This instance.
    */
    damage: function (amount) ***REMOVED***

        if (this.alive)
        ***REMOVED***
            this.health -= amount;

            if (this.health <= 0)
            ***REMOVED***
                this.kill();
            ***REMOVED***
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Sets the health property of the Game Object to the given amount.
    * Will never exceed the `maxHealth` value.
    *
    * @member
    * @param ***REMOVED***number***REMOVED*** amount - The amount to set the `health` value to. The total will never exceed `maxHealth`.
    * @return ***REMOVED***Phaser.Sprite***REMOVED*** This instance.
    */
    setHealth: function (amount) ***REMOVED***

        this.health = amount;

        if (this.health > this.maxHealth)
        ***REMOVED***
            this.health = this.maxHealth;
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Heal the Game Object. This adds the given amount of health to the `health` property.
    *
    * @member
    * @param ***REMOVED***number***REMOVED*** amount - The amount to add to the current `health` value. The total will never exceed `maxHealth`.
    * @return ***REMOVED***Phaser.Sprite***REMOVED*** This instance.
    */
    heal: function (amount) ***REMOVED***

        if (this.alive)
        ***REMOVED***
            this.health += amount;

            if (this.health > this.maxHealth)
            ***REMOVED***
                this.health = this.maxHealth;
            ***REMOVED***
        ***REMOVED***

        return this;

    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The InCamera component checks if the Game Object intersects with the Game Camera.
*
* @class
*/
Phaser.Component.InCamera = function () ***REMOVED******REMOVED***;

Phaser.Component.InCamera.prototype = ***REMOVED***

    /**
    * Checks if this Game Objects bounds intersects with the Game Cameras bounds.
    * 
    * It will be `true` if they intersect, or `false` if the Game Object is fully outside of the Cameras bounds.
    * 
    * An object outside the bounds can be considered for camera culling if it has the AutoCull component.
    *
    * @property ***REMOVED***boolean***REMOVED*** inCamera
    * @readonly
    */
    inCamera: ***REMOVED***

        get: function() ***REMOVED***

            return this.game.world.camera.view.intersects(this._bounds);

        ***REMOVED***

    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The InputEnabled component allows a Game Object to have its own InputHandler and process input related events.
*
* @class
*/
Phaser.Component.InputEnabled = function () ***REMOVED******REMOVED***;

Phaser.Component.InputEnabled.prototype = ***REMOVED***

    /**
    * The Input Handler for this Game Object.
    * 
    * By default it is disabled. If you wish this Game Object to process input events you should enable it with: `inputEnabled = true`.
    * 
    * After you have done this, this property will be a reference to the Phaser InputHandler.
    * @property ***REMOVED***Phaser.InputHandler|null***REMOVED*** input 
    */
    input: null,

    /**
    * By default a Game Object won't process any input events. By setting `inputEnabled` to true a Phaser.InputHandler is created
    * for this Game Object and it will then start to process click / touch events and more.
    * 
    * You can then access the Input Handler via `this.input`.
    * 
    * Note that Input related events are dispatched from `this.events`, i.e.: `events.onInputDown`.
    * 
    * If you set this property to false it will stop the Input Handler from processing any more input events.
    * 
    * If you want to _temporarily_ disable input for a Game Object, then it's better to set
    * `input.enabled = false`, as it won't reset any of the Input Handlers internal properties.
    * You can then toggle this back on as needed.
    *
    * @property ***REMOVED***boolean***REMOVED*** inputEnabled
    */
    inputEnabled: ***REMOVED***

        get: function () ***REMOVED***

            return (this.input && this.input.enabled);

        ***REMOVED***,

        set: function (value) ***REMOVED***

            if (value)
            ***REMOVED***
                if (this.input === null)
                ***REMOVED***
                    this.input = new Phaser.InputHandler(this);
                    this.input.start();
                ***REMOVED***
                else if (this.input && !this.input.enabled)
                ***REMOVED***
                    this.input.start();
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                if (this.input && this.input.enabled)
                ***REMOVED***
                    this.input.stop();
                ***REMOVED***
            ***REMOVED***

        ***REMOVED***

    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The InWorld component checks if a Game Object is within the Game World Bounds.
* An object is considered as being "in bounds" so long as its own bounds intersects at any point with the World bounds.
* If the AutoCull component is enabled on the Game Object then it will check the Game Object against the Camera bounds as well.
*
* @class
*/
Phaser.Component.InWorld = function () ***REMOVED******REMOVED***;

/**
 * The InWorld component preUpdate handler.
 * Called automatically by the Game Object.
 *
 * @method
 */
Phaser.Component.InWorld.preUpdate = function () ***REMOVED***

    //  Cache the bounds if we need it
    if (this.autoCull || this.checkWorldBounds)
    ***REMOVED***
        this._bounds.copyFrom(this.getBounds());

        this._bounds.x += this.game.camera.view.x;
        this._bounds.y += this.game.camera.view.y;

        if (this.autoCull)
        ***REMOVED***
            //  Won't get rendered but will still get its transform updated
            if (this.game.world.camera.view.intersects(this._bounds))
            ***REMOVED***
                this.renderable = true;
                this.game.world.camera.totalInView++;
            ***REMOVED***
            else
            ***REMOVED***
                this.renderable = false;

                if (this.outOfCameraBoundsKill)
                ***REMOVED***
                    this.kill();
                    return false;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        if (this.checkWorldBounds)
        ***REMOVED***
            //  The Sprite is already out of the world bounds, so let's check to see if it has come back again
            if (this._outOfBoundsFired && this.game.world.bounds.intersects(this._bounds))
            ***REMOVED***
                this._outOfBoundsFired = false;
                this.events.onEnterBounds$dispatch(this);
            ***REMOVED***
            else if (!this._outOfBoundsFired && !this.game.world.bounds.intersects(this._bounds))
            ***REMOVED***
                //  The Sprite WAS in the screen, but has now left.
                this._outOfBoundsFired = true;
                this.events.onOutOfBounds$dispatch(this);

                if (this.outOfBoundsKill)
                ***REMOVED***
                    this.kill();
                    return false;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    return true;

***REMOVED***;

Phaser.Component.InWorld.prototype = ***REMOVED***

    /**
    * If this is set to `true` the Game Object checks if it is within the World bounds each frame. 
    * 
    * When it is no longer intersecting the world bounds it dispatches the `onOutOfBounds` event.
    * 
    * If it was *previously* out of bounds but is now intersecting the world bounds again it dispatches the `onEnterBounds` event.
    * 
    * It also optionally kills the Game Object if `outOfBoundsKill` is `true`.
    * 
    * When `checkWorldBounds` is enabled it forces the Game Object to calculate its full bounds every frame.
    * 
    * This is a relatively expensive operation, especially if enabled on hundreds of Game Objects. So enable it only if you know it's required,
    * or you have tested performance and find it acceptable.
    * 
    * @property ***REMOVED***boolean***REMOVED*** checkWorldBounds
    * @default
    */
    checkWorldBounds: false,

    /**
    * If this and the `checkWorldBounds` property are both set to `true` then the `kill` method is called as soon as `inWorld` returns false.
    * 
    * @property ***REMOVED***boolean***REMOVED*** outOfBoundsKill
    * @default
    */
    outOfBoundsKill: false,

    /**
     * If this and the `autoCull` property are both set to `true`, then the `kill` method
     * is called as soon as the Game Object leaves the camera bounds.
     *
     * @property ***REMOVED***boolean***REMOVED*** outOfCameraBoundsKill
     * @default
     */
    outOfCameraBoundsKill: false,

    /**
    * @property ***REMOVED***boolean***REMOVED*** _outOfBoundsFired - Internal state var.
    * @private
    */
    _outOfBoundsFired: false,

    /**
    * Checks if the Game Objects bounds are within, or intersect at any point with the Game World bounds.
    *
    * @property ***REMOVED***boolean***REMOVED*** inWorld
    * @readonly
    */
    inWorld: ***REMOVED***

        get: function () ***REMOVED***

            return this.game.world.bounds.intersects(this.getBounds());

        ***REMOVED***

    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* LifeSpan Component Features.
*
* @class
*/
Phaser.Component.LifeSpan = function () ***REMOVED******REMOVED***;

/**
 * The LifeSpan component preUpdate handler.
 * Called automatically by the Game Object.
 *
 * @method
 */
Phaser.Component.LifeSpan.preUpdate = function () ***REMOVED***

    if (this.lifespan > 0)
    ***REMOVED***
        this.lifespan -= this.game.time.physicsElapsedMS;

        if (this.lifespan <= 0)
        ***REMOVED***
            this.kill();
            return false;
        ***REMOVED***
    ***REMOVED***

    return true;

***REMOVED***;

Phaser.Component.LifeSpan.prototype = ***REMOVED***

    /**
    * A useful flag to control if the Game Object is alive or dead.
    *
    * This is set automatically by the Health components `damage` method should the object run out of health.
    * Or you can toggle it via your game code.
    *
    * This property is mostly just provided to be used by your game - it doesn't effect rendering or logic updates.
    * However you can use `Group.getFirstAlive` in conjunction with this property for fast object pooling and recycling.
    * @property ***REMOVED***boolean***REMOVED*** alive
    * @default
    */
    alive: true,

    /**
    * The lifespan allows you to give a Game Object a lifespan in milliseconds.
    *
    * Once the Game Object is 'born' you can set this to a positive value.
    *
    * It is automatically decremented by the millisecond equivalent of `game.time.physicsElapsed` each frame.
    * When it reaches zero it will call the `kill` method.
    *
    * Very handy for particles, bullets, collectibles, or any other short-lived entity.
    *
    * @property ***REMOVED***number***REMOVED*** lifespan
    * @default
    */
    lifespan: 0,

    /**
    * Brings a 'dead' Game Object back to life, optionally resetting its health value in the process.
    *
    * A resurrected Game Object has its `alive`, `exists` and `visible` properties all set to true.
    *
    * It will dispatch the `onRevived` event. Listen to `events.onRevived` for the signal.
    *
    * @method
    * @param ***REMOVED***number***REMOVED*** [health=100] - The health to give the Game Object. Only set if the GameObject has the Health component.
    * @return ***REMOVED***PIXI.DisplayObject***REMOVED*** This instance.
    */
    revive: function (health) ***REMOVED***

        if (health === undefined) ***REMOVED*** health = 100; ***REMOVED***

        this.alive = true;
        this.exists = true;
        this.visible = true;

        if (typeof this.setHealth === 'function')
        ***REMOVED***
            this.setHealth(health);
        ***REMOVED***

        if (this.events)
        ***REMOVED***
            this.events.onRevived$dispatch(this);
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Kills a Game Object. A killed Game Object has its `alive`, `exists` and `visible` properties all set to false.
    *
    * It will dispatch the `onKilled` event. You can listen to `events.onKilled` for the signal.
    *
    * Note that killing a Game Object is a way for you to quickly recycle it in an object pool,
    * it doesn't destroy the object or free it up from memory.
    *
    * If you don't need this Game Object any more you should call `destroy` instead.
    *
    * @method
    * @return ***REMOVED***PIXI.DisplayObject***REMOVED*** This instance.
    */
    kill: function () ***REMOVED***

        this.alive = false;
        this.exists = false;
        this.visible = false;

        if (this.events)
        ***REMOVED***
            this.events.onKilled$dispatch(this);
        ***REMOVED***

        return this;

    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The LoadTexture component manages the loading of a texture into the Game Object and the changing of frames.
*
* @class
*/
Phaser.Component.LoadTexture = function () ***REMOVED******REMOVED***;

Phaser.Component.LoadTexture.prototype = ***REMOVED***

    /**
    * @property ***REMOVED***boolean***REMOVED*** customRender - Does this texture require a custom render call? (as set by BitmapData, Video, etc)
    * @private
    */
    customRender: false,

    /**
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** _frame - Internal cache var.
    * @private
    */
    _frame: null,

    /**
    * Changes the base texture the Game Object is using. The old texture is removed and the new one is referenced or fetched from the Cache.
    * 
    * If your Game Object is using a frame from a texture atlas and you just wish to change to another frame, then see the `frame` or `frameName` properties instead.
    * 
    * You should only use `loadTexture` if you want to replace the base texture entirely.
    * 
    * Calling this method causes a WebGL texture update, so use sparingly or in low-intensity portions of your game, or if you know the new texture is already on the GPU.
    *
    * You can use the new const `Phaser.PENDING_ATLAS` as the texture key for any sprite. 
    * Doing this then sets the key to be the `frame` argument (the frame is set to zero). 
    * 
    * This allows you to create sprites using `load.image` during development, and then change them 
    * to use a Texture Atlas later in development by simply searching your code for 'PENDING_ATLAS' 
    * and swapping it to be the key of the atlas data.
    *
    * Note: You cannot use a RenderTexture as a texture for a TileSprite.
    *
    * @method
    * @param ***REMOVED***string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture***REMOVED*** key - This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache Image entry, or an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
    * @param ***REMOVED***string|number***REMOVED*** [frame] - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
    * @param ***REMOVED***boolean***REMOVED*** [stopAnimation=true] - If an animation is already playing on this Sprite you can choose to stop it or let it carry on playing.
    */
    loadTexture: function (key, frame, stopAnimation) ***REMOVED***

        if (key === Phaser.PENDING_ATLAS)
        ***REMOVED***
            key = frame;
            frame = 0;
        ***REMOVED***
        else
        ***REMOVED***
            frame = frame || 0;
        ***REMOVED***

        if ((stopAnimation || stopAnimation === undefined) && this.animations)
        ***REMOVED***
            this.animations.stop();
        ***REMOVED***

        this.key = key;
        this.customRender = false;
        var cache = this.game.cache;

        var setFrame = true;
        var smoothed = !this.texture.baseTexture.scaleMode;

        if (Phaser.RenderTexture && key instanceof Phaser.RenderTexture)
        ***REMOVED***
            this.key = key.key;
            this.setTexture(key);
        ***REMOVED***
        else if (Phaser.BitmapData && key instanceof Phaser.BitmapData)
        ***REMOVED***
            this.customRender = true;

            this.setTexture(key.texture);

            if (cache.hasFrameData(key.key, Phaser.Cache.BITMAPDATA))
            ***REMOVED***
                setFrame = !this.animations.loadFrameData(cache.getFrameData(key.key, Phaser.Cache.BITMAPDATA), frame);
            ***REMOVED***
            else
            ***REMOVED***
                setFrame = !this.animations.loadFrameData(key.frameData, 0);
            ***REMOVED***
        ***REMOVED***
        else if (Phaser.Video && key instanceof Phaser.Video)
        ***REMOVED***
            this.customRender = true;

            //  This works from a reference, which probably isn't what we need here
            var valid = key.texture.valid;
            this.setTexture(key.texture);
            this.setFrame(key.texture.frame.clone());
            key.onChangeSource.add(this.resizeFrame, this);
            this.texture.valid = valid;
        ***REMOVED***
        else if (Phaser.Tilemap && key instanceof Phaser.TilemapLayer)
        ***REMOVED***
            // this.customRender = true;

            this.setTexture(PIXI.Texture.fromCanvas(key.canvas));
        ***REMOVED***
        else if (key instanceof PIXI.Texture)
        ***REMOVED***
            this.setTexture(key);
        ***REMOVED***
        else
        ***REMOVED***
            var img = cache.getImage(key, true);

            this.key = img.key;
            this.setTexture(new PIXI.Texture(img.base));

            if (key === '__default')
            ***REMOVED***
                this.texture.baseTexture.skipRender = true;
            ***REMOVED***
            else
            ***REMOVED***
                this.texture.baseTexture.skipRender = false;
            ***REMOVED***

            setFrame = !this.animations.loadFrameData(img.frameData, frame);
        ***REMOVED***
        
        if (setFrame)
        ***REMOVED***
            this._frame = Phaser.Rectangle.clone(this.texture.frame);
        ***REMOVED***

        if (!smoothed)
        ***REMOVED***
            this.texture.baseTexture.scaleMode = 1;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets the texture frame the Game Object uses for rendering.
    * 
    * This is primarily an internal method used by `loadTexture`, but is exposed for the use of plugins and custom classes.
    *
    * @method
    * @param ***REMOVED***Phaser.Frame***REMOVED*** frame - The Frame to be used by the texture.
    */
    setFrame: function (frame) ***REMOVED***

        this._frame = frame;

        this.texture.frame.x = frame.x;
        this.texture.frame.y = frame.y;
        this.texture.frame.width = frame.width;
        this.texture.frame.height = frame.height;

        this.texture.crop.x = frame.x;
        this.texture.crop.y = frame.y;
        this.texture.crop.width = frame.width;
        this.texture.crop.height = frame.height;

        if (frame.trimmed)
        ***REMOVED***
            if (this.texture.trim)
            ***REMOVED***
                this.texture.trim.x = frame.spriteSourceSizeX;
                this.texture.trim.y = frame.spriteSourceSizeY;
                this.texture.trim.width = frame.sourceSizeW;
                this.texture.trim.height = frame.sourceSizeH;
            ***REMOVED***
            else
            ***REMOVED***
                this.texture.trim = ***REMOVED*** x: frame.spriteSourceSizeX, y: frame.spriteSourceSizeY, width: frame.sourceSizeW, height: frame.sourceSizeH ***REMOVED***;
            ***REMOVED***

            this.texture.width = frame.sourceSizeW;
            this.texture.height = frame.sourceSizeH;
            this.texture.frame.width = frame.sourceSizeW;
            this.texture.frame.height = frame.sourceSizeH;
        ***REMOVED***
        else if (!frame.trimmed && this.texture.trim)
        ***REMOVED***
            this.texture.trim = null;
        ***REMOVED***

        if (this.cropRect)
        ***REMOVED***
            this.updateCrop();
        ***REMOVED***
        
        this.texture.requiresReTint = true;
        
        this.texture._updateUvs();

        if (this.tilingTexture)
        ***REMOVED***
            this.refreshTexture = true;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Resizes the Frame dimensions that the Game Object uses for rendering.
    * 
    * You shouldn't normally need to ever call this, but in the case of special texture types such as Video or BitmapData
    * it can be useful to adjust the dimensions directly in this way.
    *
    * @method
    * @param ***REMOVED***object***REMOVED*** parent - The parent texture object that caused the resize, i.e. a Phaser.Video object.
    * @param ***REMOVED***integer***REMOVED*** width - The new width of the texture.
    * @param ***REMOVED***integer***REMOVED*** height - The new height of the texture.
    */
    resizeFrame: function (parent, width, height) ***REMOVED***

        this.texture.frame.resize(width, height);
        this.texture.setFrame(this.texture.frame);

    ***REMOVED***,

    /**
    * Resets the texture frame dimensions that the Game Object uses for rendering.
    *
    * @method
    */
    resetFrame: function () ***REMOVED***

        if (this._frame)
        ***REMOVED***
            this.setFrame(this._frame);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Gets or sets the current frame index of the texture being used to render this Game Object.
    *
    * To change the frame set `frame` to the index of the new frame in the sprite sheet you wish this Game Object to use,
    * for example: `player.frame = 4`.
    * 
    * If the frame index given doesn't exist it will revert to the first frame found in the texture.
    * 
    * If you are using a texture atlas then you should use the `frameName` property instead.
    * 
    * If you wish to fully replace the texture being used see `loadTexture`.
    * @property ***REMOVED***integer***REMOVED*** frame
    */
    frame: ***REMOVED***

        get: function () ***REMOVED***
            return this.animations.frame;
        ***REMOVED***,

        set: function (value) ***REMOVED***
            this.animations.frame = value;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Gets or sets the current frame name of the texture being used to render this Game Object.
    * 
    * To change the frame set `frameName` to the name of the new frame in the texture atlas you wish this Game Object to use, 
    * for example: `player.frameName = "idle"`.
    *
    * If the frame name given doesn't exist it will revert to the first frame found in the texture and throw a console warning.
    * 
    * If you are using a sprite sheet then you should use the `frame` property instead.
    * 
    * If you wish to fully replace the texture being used see `loadTexture`.
    * @property ***REMOVED***string***REMOVED*** frameName
    */
    frameName: ***REMOVED***

        get: function () ***REMOVED***
            return this.animations.frameName;
        ***REMOVED***,

        set: function (value) ***REMOVED***
            this.animations.frameName = value;
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Overlap component allows a Game Object to check if it overlaps with the bounds of another Game Object.
*
* @class
*/
Phaser.Component.Overlap = function () ***REMOVED******REMOVED***;

Phaser.Component.Overlap.prototype = ***REMOVED***

    /**
    * Checks to see if the bounds of this Game Object overlaps with the bounds of the given Display Object, 
    * which can be a Sprite, Image, TileSprite or anything that extends those such as Button or provides a `getBounds` method and result.
    * 
    * This check ignores the `hitArea` property if set and runs a `getBounds` comparison on both objects to determine the result.
    * 
    * Therefore it's relatively expensive to use in large quantities, i.e. with lots of Sprites at a high frequency.
    * It should be fine for low-volume testing where physics isn't required.
    *
    * @method
    * @param ***REMOVED***Phaser.Sprite|Phaser.Image|Phaser.TileSprite|Phaser.Button|PIXI.DisplayObject***REMOVED*** displayObject - The display object to check against.
    * @return ***REMOVED***boolean***REMOVED*** True if the bounds of this Game Object intersects at any point with the bounds of the given display object.
    */
    overlap: function (displayObject) ***REMOVED***

        return Phaser.Rectangle.intersects(this.getBounds(), displayObject.getBounds());

    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The PhysicsBody component manages the Game Objects physics body and physics enabling.
* It also overrides the x and y properties, ensuring that any manual adjustment of them is reflected in the physics body itself.
*
* @class
*/
Phaser.Component.PhysicsBody = function () ***REMOVED******REMOVED***;

/**
 * The PhysicsBody component preUpdate handler.
 * Called automatically by the Game Object.
 *
 * @method
 */
Phaser.Component.PhysicsBody.preUpdate = function () ***REMOVED***

    if (this.fresh && this.exists)
    ***REMOVED***
        this.world.setTo(this.parent.position.x + this.position.x, this.parent.position.y + this.position.y);
        this.worldTransform.tx = this.world.x;
        this.worldTransform.ty = this.world.y;

        this.previousPosition.set(this.world.x, this.world.y);
        this.previousRotation = this.rotation;

        if (this.body)
        ***REMOVED***
            this.body.preUpdate();
        ***REMOVED***

        this.fresh = false;

        return false;
    ***REMOVED***

    this.previousPosition.set(this.world.x, this.world.y);
    this.previousRotation = this.rotation;

    if (!this._exists || !this.parent.exists)
    ***REMOVED***
        this.renderOrderID = -1;
        return false;
    ***REMOVED***

    return true;

***REMOVED***;

/**
 * The PhysicsBody component postUpdate handler.
 * Called automatically by the Game Object.
 *
 * @method
 */
Phaser.Component.PhysicsBody.postUpdate = function () ***REMOVED***

    if (this.exists && this.body)
    ***REMOVED***
        this.body.postUpdate();
    ***REMOVED***

***REMOVED***;

Phaser.Component.PhysicsBody.prototype = ***REMOVED***

    /**
    * `body` is the Game Objects physics body. Once a Game Object is enabled for physics you access all associated 
    * properties and methods via it.
    * 
    * By default Game Objects won't add themselves to any physics system and their `body` property will be `null`.
    * 
    * To enable this Game Object for physics you need to call `game.physics.enable(object, system)` where `object` is this object
    * and `system` is the Physics system you are using. If none is given it defaults to `Phaser.Physics.Arcade`.
    * 
    * You can alternatively call `game.physics.arcade.enable(object)`, or add this Game Object to a physics enabled Group.
    *
    * Important: Enabling a Game Object for P2 or Ninja physics will automatically set its `anchor` property to 0.5, 
    * so the physics body is centered on the Game Object.
    * 
    * If you need a different result then adjust or re-create the Body shape offsets manually or reset the anchor after enabling physics.
    *
    * @property ***REMOVED***Phaser.Physics.Arcade.Body|Phaser.Physics.P2.Body|Phaser.Physics.Ninja.Body|null***REMOVED*** body
    * @default
    */
    body: null,

    /**
    * The position of the Game Object on the x axis relative to the local coordinates of the parent.
    *
    * @property ***REMOVED***number***REMOVED*** x
    */
    x: ***REMOVED***

        get: function () ***REMOVED***

            return this.position.x;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            this.position.x = value;

            if (this.body && !this.body.dirty)
            ***REMOVED***
                this.body._reset = true;
            ***REMOVED***

        ***REMOVED***

    ***REMOVED***,

    /**
    * The position of the Game Object on the y axis relative to the local coordinates of the parent.
    *
    * @property ***REMOVED***number***REMOVED*** y
    */
    y: ***REMOVED***

        get: function () ***REMOVED***

            return this.position.y;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            this.position.y = value;

            if (this.body && !this.body.dirty)
            ***REMOVED***
                this.body._reset = true;
            ***REMOVED***

        ***REMOVED***

    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Reset component allows a Game Object to be reset and repositioned to a new location.
*
* @class
*/
Phaser.Component.Reset = function () ***REMOVED******REMOVED***;

/**
* Resets the Game Object.
* 
* This moves the Game Object to the given x/y world coordinates and sets `fresh`, `exists`, 
* `visible` and `renderable` to true.
*
* If this Game Object has the LifeSpan component it will also set `alive` to true and `health` to the given value.
*
* If this Game Object has a Physics Body it will reset the Body.
*
* @method
* @param ***REMOVED***number***REMOVED*** x - The x coordinate (in world space) to position the Game Object at.
* @param ***REMOVED***number***REMOVED*** y - The y coordinate (in world space) to position the Game Object at.
* @param ***REMOVED***number***REMOVED*** [health=1] - The health to give the Game Object if it has the Health component.
* @return ***REMOVED***PIXI.DisplayObject***REMOVED*** This instance.
*/
Phaser.Component.Reset.prototype.reset = function (x, y, health) ***REMOVED***

    if (health === undefined) ***REMOVED*** health = 1; ***REMOVED***

    this.world.set(x, y);
    this.position.set(x, y);

    this.fresh = true;
    this.exists = true;
    this.visible = true;
    this.renderable = true;

    if (this.components.InWorld)
    ***REMOVED***
        this._outOfBoundsFired = false;
    ***REMOVED***

    if (this.components.LifeSpan)
    ***REMOVED***
        this.alive = true;
        this.health = health;
    ***REMOVED***

    if (this.components.PhysicsBody)
    ***REMOVED***
        if (this.body)
        ***REMOVED***
            this.body.reset(x, y, false, false);
        ***REMOVED***
    ***REMOVED***

    return this;

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The ScaleMinMax component allows a Game Object to limit how far it can be scaled by its parent.
*
* @class
*/
Phaser.Component.ScaleMinMax = function () ***REMOVED******REMOVED***;

Phaser.Component.ScaleMinMax.prototype = ***REMOVED***

    /**
    * The callback that will apply any scale limiting to the worldTransform.
    * @property ***REMOVED***function***REMOVED*** transformCallback
    */
    transformCallback: null,

    /**
    * The context under which `transformCallback` is called.
    * @property ***REMOVED***object***REMOVED*** transformCallbackContext
    */
    transformCallbackContext: this,

    /**
    * The minimum scale this Game Object will scale down to.
    * 
    * It allows you to prevent a parent from scaling this Game Object lower than the given value.
    * 
    * Set it to `null` to remove the limit.
    * @property ***REMOVED***Phaser.Point***REMOVED*** scaleMin
    */
    scaleMin: null,

    /**
    * The maximum scale this Game Object will scale up to. 
    * 
    * It allows you to prevent a parent from scaling this Game Object higher than the given value.
    * 
    * Set it to `null` to remove the limit.
    * @property ***REMOVED***Phaser.Point***REMOVED*** scaleMax
    */
    scaleMax: null,

    /**
     * Adjust scaling limits, if set, to this Game Object.
     *
     * @method
     * @private
     * @param ***REMOVED***PIXI.Matrix***REMOVED*** wt - The updated worldTransform matrix.
     */
    checkTransform: function (wt) ***REMOVED***

        if (this.scaleMin)
        ***REMOVED***
            if (wt.a < this.scaleMin.x)
            ***REMOVED***
                wt.a = this.scaleMin.x;
            ***REMOVED***

            if (wt.d < this.scaleMin.y)
            ***REMOVED***
                wt.d = this.scaleMin.y;
            ***REMOVED***
        ***REMOVED***

        if (this.scaleMax)
        ***REMOVED***
            if (wt.a > this.scaleMax.x)
            ***REMOVED***
                wt.a = this.scaleMax.x;
            ***REMOVED***

            if (wt.d > this.scaleMax.y)
            ***REMOVED***
                wt.d = this.scaleMax.y;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
     * Sets the scaleMin and scaleMax values. These values are used to limit how far this Game Object will scale based on its parent.
     * 
     * For example if this Game Object has a `minScale` value of 1 and its parent has a `scale` value of 0.5, the 0.5 will be ignored 
     * and the scale value of 1 will be used, as the parents scale is lower than the minimum scale this Game Object should adhere to.
     * 
     * By setting these values you can carefully control how Game Objects deal with responsive scaling.
     * 
     * If only one parameter is given then that value will be used for both scaleMin and scaleMax:
     * `setScaleMinMax(1)` = scaleMin.x, scaleMin.y, scaleMax.x and scaleMax.y all = 1
     *
     * If only two parameters are given the first is set as scaleMin.x and y and the second as scaleMax.x and y:
     * `setScaleMinMax(0.5, 2)` = scaleMin.x and y = 0.5 and scaleMax.x and y = 2
     *
     * If you wish to set `scaleMin` with different values for x and y then either modify Game Object.scaleMin directly, 
     * or pass `null` for the `maxX` and `maxY` parameters.
     * 
     * Call `setScaleMinMax(null)` to clear all previously set values.
     *
     * @method
     * @param ***REMOVED***number|null***REMOVED*** minX - The minimum horizontal scale value this Game Object can scale down to.
     * @param ***REMOVED***number|null***REMOVED*** minY - The minimum vertical scale value this Game Object can scale down to.
     * @param ***REMOVED***number|null***REMOVED*** maxX - The maximum horizontal scale value this Game Object can scale up to.
     * @param ***REMOVED***number|null***REMOVED*** maxY - The maximum vertical scale value this Game Object can scale up to.
     */
    setScaleMinMax: function (minX, minY, maxX, maxY) ***REMOVED***

        if (minY === undefined)
        ***REMOVED***
            //  1 parameter, set all to it
            minY = maxX = maxY = minX;
        ***REMOVED***
        else if (maxX === undefined)
        ***REMOVED***
            //  2 parameters, the first is min, the second max
            maxX = maxY = minY;
            minY = minX;
        ***REMOVED***

        if (minX === null)
        ***REMOVED***
            this.scaleMin = null;
        ***REMOVED***
        else
        ***REMOVED***
            if (this.scaleMin)
            ***REMOVED***
                this.scaleMin.set(minX, minY);
            ***REMOVED***
            else
            ***REMOVED***
                this.scaleMin = new Phaser.Point(minX, minY);
            ***REMOVED***
        ***REMOVED***

        if (maxX === null)
        ***REMOVED***
            this.scaleMax = null;
        ***REMOVED***
        else
        ***REMOVED***
            if (this.scaleMax)
            ***REMOVED***
                this.scaleMax.set(maxX, maxY);
            ***REMOVED***
            else
            ***REMOVED***
                this.scaleMax = new Phaser.Point(maxX, maxY);
            ***REMOVED***
        ***REMOVED***

        if (this.scaleMin === null)
        ***REMOVED***
            this.transformCallback = null;
        ***REMOVED***
        else
        ***REMOVED***
            this.transformCallback = this.checkTransform;
            this.transformCallbackContext = this;
        ***REMOVED***

    ***REMOVED***

***REMOVED***;
/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Smoothed component allows a Game Object to control anti-aliasing of an image based texture.
*
* @class
*/
Phaser.Component.Smoothed = function () ***REMOVED******REMOVED***;

Phaser.Component.Smoothed.prototype = ***REMOVED***

    /**
    * Enable or disable texture smoothing for this Game Object.
    * 
    * It only takes effect if the Game Object is using an image based texture.
    * 
    * Smoothing is enabled by default.
    *
    * @property ***REMOVED***boolean***REMOVED*** smoothed
    */
    smoothed: ***REMOVED***

        get: function () ***REMOVED***

            return !this.texture.baseTexture.scaleMode;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            if (value)
            ***REMOVED***
                if (this.texture)
                ***REMOVED***
                    this.texture.baseTexture.scaleMode = 0;
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                if (this.texture)
                ***REMOVED***
                    this.texture.baseTexture.scaleMode = 1;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***

***REMOVED***;
