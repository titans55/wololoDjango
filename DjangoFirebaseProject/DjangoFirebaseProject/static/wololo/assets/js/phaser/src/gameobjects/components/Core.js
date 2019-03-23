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
