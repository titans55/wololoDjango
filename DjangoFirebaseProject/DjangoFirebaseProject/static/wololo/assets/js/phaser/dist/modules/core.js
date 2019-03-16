/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A Camera is your view into the game world. It has a position and size and renders only those objects within its field of view.
* The game automatically creates a single Stage sized camera on boot. Move the camera around the world with Phaser.Camera.x/y
*
* @class Phaser.Camera
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Game reference to the currently running game.
* @param ***REMOVED***number***REMOVED*** id - Not being used at the moment, will be when Phaser supports multiple camera
* @param ***REMOVED***number***REMOVED*** x - Position of the camera on the X axis
* @param ***REMOVED***number***REMOVED*** y - Position of the camera on the Y axis
* @param ***REMOVED***number***REMOVED*** width - The width of the view rectangle
* @param ***REMOVED***number***REMOVED*** height - The height of the view rectangle
*/
Phaser.Camera = function (game, id, x, y, width, height) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running Game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***Phaser.World***REMOVED*** world - A reference to the game world.
    */
    this.world = game.world;

    /**
    * @property ***REMOVED***number***REMOVED*** id - Reserved for future multiple camera set-ups.
    * @default
    */
    this.id = 0;

    /**
    * Camera view.
    * The view into the world we wish to render (by default the game dimensions).
    * The x/y values are in world coordinates, not screen coordinates, the width/height is how many pixels to render.
    * Sprites outside of this view are not rendered if Sprite.autoCull is set to `true`. Otherwise they are always rendered.
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** view
    */
    this.view = new Phaser.Rectangle(x, y, width, height);

    /**
    * The Camera is bound to this Rectangle and cannot move outside of it. By default it is enabled and set to the size of the World.
    * The Rectangle can be located anywhere in the world and updated as often as you like. If you don't wish the Camera to be bound
    * at all then set this to null. The values can be anything and are in World coordinates, with 0,0 being the top-left of the world.
    *
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** bounds - The Rectangle in which the Camera is bounded. Set to null to allow for movement anywhere.
    */
    this.bounds = new Phaser.Rectangle(x, y, width, height);

    /**
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** deadzone - Moving inside this Rectangle will not cause the camera to move.
    */
    this.deadzone = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** visible - Whether this camera is visible or not.
    * @default
    */
    this.visible = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** roundPx - If a Camera has roundPx set to `true` it will call `view.floor` as part of its update loop, keeping its boundary to integer values. Set this to `false` to disable this from happening.
    * @default
    */
    this.roundPx = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** atLimit - Whether this camera is flush with the World Bounds or not.
    */
    this.atLimit = ***REMOVED*** x: false, y: false ***REMOVED***;

    /**
    * @property ***REMOVED***Phaser.Sprite***REMOVED*** target - If the camera is tracking a Sprite, this is a reference to it, otherwise null.
    * @default
    */
    this.target = null;

    /**
    * @property ***REMOVED***PIXI.DisplayObject***REMOVED*** displayObject - The display object to which all game objects are added. Set by World.boot.
    */
    this.displayObject = null;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** scale - The scale of the display object to which all game objects are added. Set by World.boot.
    */
    this.scale = null;

    /**
    * @property ***REMOVED***number***REMOVED*** totalInView - The total number of Sprites with `autoCull` set to `true` that are visible by this Camera.
    * @readonly
    */
    this.totalInView = 0;

    /**
    * The linear interpolation value to use when following a target.
    * The default values of 1 means the camera will instantly snap to the target coordinates.
    * A lower value, such as 0.1 means the camera will more slowly track the target, giving
    * a smooth transition. You can set the horizontal and vertical values independently, and also
    * adjust this value in real-time during your game.
    * @property ***REMOVED***Phaser.Point***REMOVED*** lerp
    * @default
    */
    this.lerp = new Phaser.Point(1, 1);

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onShakeComplete - This signal is dispatched when the camera shake effect completes.
    */
    this.onShakeComplete = new Phaser.Signal();

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onFlashComplete - This signal is dispatched when the camera flash effect completes.
    */
    this.onFlashComplete = new Phaser.Signal();

    /**
    * This signal is dispatched when the camera fade effect completes.
    * When the fade effect completes you will be left with the screen black (or whatever
    * color you faded to). In order to reset this call `Camera.resetFX`. This is called
    * automatically when you change State.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onFadeComplete
    */
    this.onFadeComplete = new Phaser.Signal();

    /**
    * The Graphics object used to handle camera fx such as fade and flash.
    * @property ***REMOVED***Phaser.Graphics***REMOVED*** fx
    * @protected
    */
    this.fx = null;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** _targetPosition - Internal point used to calculate target position.
    * @private
    */
    this._targetPosition = new Phaser.Point();

    /**
    * @property ***REMOVED***number***REMOVED*** edge - Edge property.
    * @private
    * @default
    */
    this._edge = 0;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** position - Current position of the camera in world.
    * @private
    * @default
    */
    this._position = new Phaser.Point();

    /**
    * @property ***REMOVED***Object***REMOVED*** _shake - The shake effect container.
    * @private
    */
    this._shake = ***REMOVED***
        intensity: 0,
        duration: 0,
        horizontal: false,
        vertical: false,
        shakeBounds: true,
        x: 0,
        y: 0
    ***REMOVED***;

    /**
    * @property ***REMOVED***number***REMOVED*** _fxDuration - FX duration timer.
    * @private
    */
    this._fxDuration = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _fxType - The FX type running.
    * @private
    */
    this._fxType = 0;

***REMOVED***;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Camera.FOLLOW_LOCKON = 0;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Camera.FOLLOW_PLATFORMER = 1;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Camera.FOLLOW_TOPDOWN = 2;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Camera.FOLLOW_TOPDOWN_TIGHT = 3;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Camera.SHAKE_BOTH = 4;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Camera.SHAKE_HORIZONTAL = 5;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Camera.SHAKE_VERTICAL = 6;

/**
* @constant
* @type ***REMOVED***boolean***REMOVED***
*/
Phaser.Camera.ENABLE_FX = true;

Phaser.Camera.prototype = ***REMOVED***

    /**
    * Called automatically by Phaser.World.
    *
    * @method Phaser.Camera#boot
    * @private
    */
    boot: function () ***REMOVED***

        this.displayObject = this.game.world;

        this.scale = this.game.world.scale;

        this.game.camera = this;

        if (Phaser.Graphics && Phaser.Camera.ENABLE_FX)
        ***REMOVED***
            this.fx = new Phaser.Graphics(this.game);

            this.game.stage.addChild(this.fx);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Camera preUpdate. Sets the total view counter to zero.
    *
    * @method Phaser.Camera#preUpdate
    */
    preUpdate: function () ***REMOVED***

        this.totalInView = 0;

    ***REMOVED***,

    /**
    * Tell the camera which sprite to follow.
    *
    * You can set the follow type and a linear interpolation value.
    * Use low lerp values (such as 0.1) to automatically smooth the camera motion.
    *
    * If you find you're getting a slight "jitter" effect when following a Sprite it's probably to do with sub-pixel rendering of the Sprite position.
    * This can be disabled by setting `game.renderer.renderSession.roundPixels = true` to force full pixel rendering.
    *
    * @method Phaser.Camera#follow
    * @param ***REMOVED***Phaser.Sprite|Phaser.Image|Phaser.Text***REMOVED*** target - The object you want the camera to track. Set to null to not follow anything.
    * @param ***REMOVED***number***REMOVED*** [style] - Leverage one of the existing "deadzone" presets. If you use a custom deadzone, ignore this parameter and manually specify the deadzone after calling follow().
    * @param ***REMOVED***float***REMOVED*** [lerpX=1] - A value between 0 and 1. This value specifies the amount of linear interpolation to use when horizontally tracking the target. The closer the value to 1, the faster the camera will track.
    * @param ***REMOVED***float***REMOVED*** [lerpY=1] - A value between 0 and 1. This value specifies the amount of linear interpolation to use when vertically tracking the target. The closer the value to 1, the faster the camera will track.
    */
    follow: function (target, style, lerpX, lerpY) ***REMOVED***

        if (style === undefined) ***REMOVED*** style = Phaser.Camera.FOLLOW_LOCKON; ***REMOVED***
        if (lerpX === undefined) ***REMOVED*** lerpX = 1; ***REMOVED***
        if (lerpY === undefined) ***REMOVED*** lerpY = 1; ***REMOVED***

        this.target = target;
        this.lerp.set(lerpX, lerpY);

        var helper;

        switch (style) ***REMOVED***

            case Phaser.Camera.FOLLOW_PLATFORMER:
                var w = this.width / 8;
                var h = this.height / 3;
                this.deadzone = new Phaser.Rectangle((this.width - w) / 2, (this.height - h) / 2 - h * 0.25, w, h);
                break;

            case Phaser.Camera.FOLLOW_TOPDOWN:
                helper = Math.max(this.width, this.height) / 4;
                this.deadzone = new Phaser.Rectangle((this.width - helper) / 2, (this.height - helper) / 2, helper, helper);
                break;

            case Phaser.Camera.FOLLOW_TOPDOWN_TIGHT:
                helper = Math.max(this.width, this.height) / 8;
                this.deadzone = new Phaser.Rectangle((this.width - helper) / 2, (this.height - helper) / 2, helper, helper);
                break;

            case Phaser.Camera.FOLLOW_LOCKON:
                this.deadzone = null;
                break;

            default:
                this.deadzone = null;
                break;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets the Camera follow target to null, stopping it from following an object if it's doing so.
    *
    * @method Phaser.Camera#unfollow
    */
    unfollow: function () ***REMOVED***

        this.target = null;

    ***REMOVED***,

    /**
    * Move the camera focus on a display object instantly.
    * @method Phaser.Camera#focusOn
    * @param ***REMOVED***any***REMOVED*** displayObject - The display object to focus the camera on. Must have visible x/y properties.
    */
    focusOn: function (displayObject) ***REMOVED***

        this.setPosition(Math.round(displayObject.x - this.view.halfWidth), Math.round(displayObject.y - this.view.halfHeight));

    ***REMOVED***,

    /**
    * Move the camera focus on a location instantly.
    * @method Phaser.Camera#focusOnXY
    * @param ***REMOVED***number***REMOVED*** x - X position.
    * @param ***REMOVED***number***REMOVED*** y - Y position.
    */
    focusOnXY: function (x, y) ***REMOVED***

        this.setPosition(Math.round(x - this.view.halfWidth), Math.round(y - this.view.halfHeight));

    ***REMOVED***,

    /**
    * This creates a camera shake effect. It works by applying a random amount of additional
    * spacing on the x and y axis each frame. You can control the intensity and duration
    * of the effect, and if it should effect both axis or just one.
    *
    * When the shake effect ends the signal Camera.onShakeComplete is dispatched.
    *
    * @method Phaser.Camera#shake
    * @param ***REMOVED***float***REMOVED*** [intensity=0.05] - The intensity of the camera shake. Given as a percentage of the camera size representing the maximum distance that the camera can move while shaking.
    * @param ***REMOVED***number***REMOVED*** [duration=500] - The duration of the shake effect in milliseconds.
    * @param ***REMOVED***boolean***REMOVED*** [force=true] - If a camera shake effect is already running and force is true it will replace the previous effect, resetting the duration.
    * @param ***REMOVED***number***REMOVED*** [direction=Phaser.Camera.SHAKE_BOTH] - The directions in which the camera can shake. Either Phaser.Camera.SHAKE_BOTH, Phaser.Camera.SHAKE_HORIZONTAL or Phaser.Camera.SHAKE_VERTICAL.
    * @param ***REMOVED***boolean***REMOVED*** [shakeBounds=true] - Is the effect allowed to shake the camera beyond its bounds (if set?).
    * @return ***REMOVED***boolean***REMOVED*** True if the shake effect was started, otherwise false.
    */
    shake: function (intensity, duration, force, direction, shakeBounds) ***REMOVED***

        if (intensity === undefined) ***REMOVED*** intensity = 0.05; ***REMOVED***
        if (duration === undefined) ***REMOVED*** duration = 500; ***REMOVED***
        if (force === undefined) ***REMOVED*** force = true; ***REMOVED***
        if (direction === undefined) ***REMOVED*** direction = Phaser.Camera.SHAKE_BOTH; ***REMOVED***
        if (shakeBounds === undefined) ***REMOVED*** shakeBounds = true; ***REMOVED***

        if (!force && this._shake.duration > 0)
        ***REMOVED***
            //  Can't reset an already running shake
            return false;
        ***REMOVED***

        this._shake.intensity = intensity;
        this._shake.duration = duration;
        this._shake.shakeBounds = shakeBounds;

        this._shake.x = 0;
        this._shake.y = 0;

        this._shake.horizontal = (direction === Phaser.Camera.SHAKE_BOTH || direction === Phaser.Camera.SHAKE_HORIZONTAL);
        this._shake.vertical = (direction === Phaser.Camera.SHAKE_BOTH || direction === Phaser.Camera.SHAKE_VERTICAL);

        return true;

    ***REMOVED***,

    /**
    * This creates a camera flash effect. It works by filling the game with the solid fill
    * color specified, and then fading it away to alpha 0 over the duration given.
    *
    * You can use this for things such as hit feedback effects.
    *
    * When the effect ends the signal Camera.onFlashComplete is dispatched.
    *
    * @method Phaser.Camera#flash
    * @param ***REMOVED***numer***REMOVED*** [color=0xffffff] - The color of the flash effect. I.e. 0xffffff for white, 0xff0000 for red, etc.
    * @param ***REMOVED***number***REMOVED*** [duration=500] - The duration of the flash effect in milliseconds.
    * @param ***REMOVED***boolean***REMOVED*** [force=false] - If a camera flash or fade effect is already running and force is true it will replace the previous effect, resetting the duration.
    * @return ***REMOVED***boolean***REMOVED*** True if the effect was started, otherwise false.
    */
    flash: function (color, duration, force) ***REMOVED***

        if (color === undefined) ***REMOVED*** color = 0xffffff; ***REMOVED***
        if (duration === undefined) ***REMOVED*** duration = 500; ***REMOVED***
        if (force === undefined) ***REMOVED*** force = false; ***REMOVED***

        if (!this.fx || (!force && this._fxDuration > 0))
        ***REMOVED***
            return false;
        ***REMOVED***

        this.fx.clear();

        this.fx.beginFill(color);
        this.fx.drawRect(0, 0, this.width, this.height);
        this.fx.endFill();

        this.fx.alpha = 1;

        this._fxDuration = duration;
        this._fxType = 0;

        return true;

    ***REMOVED***,

    /**
    * This creates a camera fade effect. It works by filling the game with the
    * color specified, over the duration given, ending with a solid fill.
    *
    * You can use this for things such as transitioning to a new scene.
    *
    * The game will be left 'filled' at the end of this effect, likely obscuring
    * everything. In order to reset it you can call `Camera.resetFX` and it will clear the
    * fade. Or you can call `Camera.flash` with the same color as the fade, and it will
    * reverse the process, bringing the game back into view again.
    *
    * When the effect ends the signal Camera.onFadeComplete is dispatched.
    *
    * @method Phaser.Camera#fade
    * @param ***REMOVED***numer***REMOVED*** [color=0x000000] - The color the game will fade to. I.e. 0x000000 for black, 0xff0000 for red, etc.
    * @param ***REMOVED***number***REMOVED*** [duration=500] - The duration of the fade in milliseconds.
    * @param ***REMOVED***boolean***REMOVED*** [force=false] - If a camera flash or fade effect is already running and force is true it will replace the previous effect, resetting the duration.
    * @return ***REMOVED***boolean***REMOVED*** True if the effect was started, otherwise false.
    */
    fade: function (color, duration, force) ***REMOVED***

        if (color === undefined) ***REMOVED*** color = 0x000000; ***REMOVED***
        if (duration === undefined) ***REMOVED*** duration = 500; ***REMOVED***
        if (force === undefined) ***REMOVED*** force = false; ***REMOVED***

        if (!this.fx || (!force && this._fxDuration > 0))
        ***REMOVED***
            return false;
        ***REMOVED***

        this.fx.clear();

        this.fx.beginFill(color);
        this.fx.drawRect(0, 0, this.width, this.height);
        this.fx.endFill();

        this.fx.alpha = 0;

        this._fxDuration = duration;
        this._fxType = 1;

        return true;

    ***REMOVED***,

    /**
    * The camera update loop. This is called automatically by the core game loop.
    *
    * @method Phaser.Camera#update
    * @protected
    */
    update: function () ***REMOVED***

        if (this._fxDuration > 0)
        ***REMOVED***
            this.updateFX();
        ***REMOVED***

        if (this._shake.duration > 0)
        ***REMOVED***
            this.updateShake();
        ***REMOVED***

        if (this.bounds)
        ***REMOVED***
            this.checkBounds();
        ***REMOVED***

        if (this.roundPx)
        ***REMOVED***
            this.view.floor();
            this._shake.x = Math.floor(this._shake.x);
            this._shake.y = Math.floor(this._shake.y);
        ***REMOVED***

        this.displayObject.position.x = -this.view.x;
        this.displayObject.position.y = -this.view.y;

    ***REMOVED***,

    /**
    * Update the camera flash and fade effects.
    *
    * @method Phaser.Camera#updateFX
    * @private
    */
    updateFX: function () ***REMOVED***

        if (this._fxType === 0)
        ***REMOVED***
            //  flash
            this.fx.alpha -= this.game.time.elapsedMS / this._fxDuration;

            if (this.fx.alpha <= 0)
            ***REMOVED***
                this._fxDuration = 0;
                this.fx.alpha = 0;
                this.onFlashComplete.dispatch();
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  fade
            this.fx.alpha += this.game.time.elapsedMS / this._fxDuration;

            if (this.fx.alpha >= 1)
            ***REMOVED***
                this._fxDuration = 0;
                this.fx.alpha = 1;
                this.onFadeComplete.dispatch();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Update the camera shake effect.
    *
    * @method Phaser.Camera#updateShake
    * @private
    */
    updateShake: function () ***REMOVED***

        this._shake.duration -= this.game.time.elapsedMS;

        if (this._shake.duration <= 0)
        ***REMOVED***
            this.onShakeComplete.dispatch();
            this._shake.x = 0;
            this._shake.y = 0;
        ***REMOVED***
        else
        ***REMOVED***
            if (this._shake.horizontal)
            ***REMOVED***
                this._shake.x = this.game.rnd.frac() * this._shake.intensity * this.view.width * 2 - this._shake.intensity * this.view.width;
            ***REMOVED***

            if (this._shake.vertical)
            ***REMOVED***
                this._shake.y = this.game.rnd.frac() * this._shake.intensity * this.view.height * 2 - this._shake.intensity * this.view.height;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal method that handles tracking a sprite.
    *
    * @method Phaser.Camera#updateTarget
    * @private
    */
    updateTarget: function () ***REMOVED***

        this._targetPosition.x = this.view.x + this.target.worldPosition.x;
        this._targetPosition.y = this.view.y + this.target.worldPosition.y;

        if (this.deadzone)
        ***REMOVED***
            this._edge = this._targetPosition.x - this.view.x;

            if (this._edge < this.deadzone.left)
            ***REMOVED***
                this.view.x = this.game.math.linear(this.view.x, this._targetPosition.x - this.deadzone.left, this.lerp.x);
            ***REMOVED***
            else if (this._edge > this.deadzone.right)
            ***REMOVED***
                this.view.x = this.game.math.linear(this.view.x, this._targetPosition.x - this.deadzone.right, this.lerp.x);
            ***REMOVED***

            this._edge = this._targetPosition.y - this.view.y;

            if (this._edge < this.deadzone.top)
            ***REMOVED***
                this.view.y = this.game.math.linear(this.view.y, this._targetPosition.y - this.deadzone.top, this.lerp.y);
            ***REMOVED***
            else if (this._edge > this.deadzone.bottom)
            ***REMOVED***
                this.view.y = this.game.math.linear(this.view.y, this._targetPosition.y - this.deadzone.bottom, this.lerp.y);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            this.view.x = this.game.math.linear(this.view.x, this._targetPosition.x - this.view.halfWidth, this.lerp.x);
            this.view.y = this.game.math.linear(this.view.y, this._targetPosition.y - this.view.halfHeight, this.lerp.y);
        ***REMOVED***

        if (this.bounds)
        ***REMOVED***
            this.checkBounds();
        ***REMOVED***

        if (this.roundPx)
        ***REMOVED***
            this.view.floor();
        ***REMOVED***

        this.displayObject.position.x = -this.view.x;
        this.displayObject.position.y = -this.view.y;

    ***REMOVED***,

    /**
    * Update the Camera bounds to match the game world.
    *
    * @method Phaser.Camera#setBoundsToWorld
    */
    setBoundsToWorld: function () ***REMOVED***

        if (this.bounds)
        ***REMOVED***
            this.bounds.copyFrom(this.game.world.bounds);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Method called to ensure the camera doesn't venture outside of the game world.
    * Called automatically by Camera.update.
    *
    * @method Phaser.Camera#checkBounds
    * @protected
    */
    checkBounds: function () ***REMOVED***

        this.atLimit.x = false;
        this.atLimit.y = false;

        var vx = this.view.x + this._shake.x;
        var vw = this.view.right + this._shake.x;
        var vy = this.view.y + this._shake.y;
        var vh = this.view.bottom + this._shake.y;

        //  Make sure we didn't go outside the cameras bounds
        if (vx <= this.bounds.x * this.scale.x)
        ***REMOVED***
            this.atLimit.x = true;
            this.view.x = this.bounds.x * this.scale.x;

            if (!this._shake.shakeBounds)
            ***REMOVED***
                //  The camera is up against the bounds, so reset the shake
                this._shake.x = 0;
            ***REMOVED***
        ***REMOVED***

        if (vw >= this.bounds.right * this.scale.x)
        ***REMOVED***
            this.atLimit.x = true;
            this.view.x = (this.bounds.right * this.scale.x) - this.width;

            if (!this._shake.shakeBounds)
            ***REMOVED***
                //  The camera is up against the bounds, so reset the shake
                this._shake.x = 0;
            ***REMOVED***
        ***REMOVED***

        if (vy <= this.bounds.top * this.scale.y)
        ***REMOVED***
            this.atLimit.y = true;
            this.view.y = this.bounds.top * this.scale.y;

            if (!this._shake.shakeBounds)
            ***REMOVED***
                //  The camera is up against the bounds, so reset the shake
                this._shake.y = 0;
            ***REMOVED***
        ***REMOVED***

        if (vh >= this.bounds.bottom * this.scale.y)
        ***REMOVED***
            this.atLimit.y = true;
            this.view.y = (this.bounds.bottom * this.scale.y) - this.height;

            if (!this._shake.shakeBounds)
            ***REMOVED***
                //  The camera is up against the bounds, so reset the shake
                this._shake.y = 0;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * A helper function to set both the X and Y properties of the camera at once
    * without having to use game.camera.x and game.camera.y.
    *
    * @method Phaser.Camera#setPosition
    * @param ***REMOVED***number***REMOVED*** x - X position.
    * @param ***REMOVED***number***REMOVED*** y - Y position.
    */
    setPosition: function (x, y) ***REMOVED***

        this.view.x = x;
        this.view.y = y;

        if (this.bounds)
        ***REMOVED***
            this.checkBounds();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets the size of the view rectangle given the width and height in parameters.
    *
    * @method Phaser.Camera#setSize
    * @param ***REMOVED***number***REMOVED*** width - The desired width.
    * @param ***REMOVED***number***REMOVED*** height - The desired height.
    */
    setSize: function (width, height) ***REMOVED***

        this.view.width = width;
        this.view.height = height;

    ***REMOVED***,

    /**
    * Resets the camera back to 0,0 and un-follows any object it may have been tracking.
    * Also immediately resets any camera effects that may have been running such as
    * shake, flash or fade.
    *
    * @method Phaser.Camera#reset
    */
    reset: function () ***REMOVED***

        this.target = null;

        this.view.x = 0;
        this.view.y = 0;

        this._shake.duration = 0;

        this.resetFX();

    ***REMOVED***,

    /**
    * Resets any active FX, such as a fade or flash and immediately clears it.
    * Useful to calling after a fade in order to remove the fade from the Stage.
    *
    * @method Phaser.Camera#resetFX
    */
    resetFX: function () ***REMOVED***

        this.fx.clear();

        this.fx.alpha = 0;

        this._fxDuration = 0;

    ***REMOVED***

***REMOVED***;

Phaser.Camera.prototype.constructor = Phaser.Camera;

/**
* The Cameras x coordinate. This value is automatically clamped if it falls outside of the World bounds.
* @name Phaser.Camera#x
* @property ***REMOVED***number***REMOVED*** x - Gets or sets the cameras x position.
*/
Object.defineProperty(Phaser.Camera.prototype, "x", ***REMOVED***

    get: function () ***REMOVED***

        return this.view.x;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.view.x = value;

        if (this.bounds)
        ***REMOVED***
            this.checkBounds();
        ***REMOVED***
    ***REMOVED***

***REMOVED***);

/**
* The Cameras y coordinate. This value is automatically clamped if it falls outside of the World bounds.
* @name Phaser.Camera#y
* @property ***REMOVED***number***REMOVED*** y - Gets or sets the cameras y position.
*/
Object.defineProperty(Phaser.Camera.prototype, "y", ***REMOVED***

    get: function () ***REMOVED***

        return this.view.y;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.view.y = value;

        if (this.bounds)
        ***REMOVED***
            this.checkBounds();
        ***REMOVED***
    ***REMOVED***

***REMOVED***);

/**
* The Cameras position. This value is automatically clamped if it falls outside of the World bounds.
* @name Phaser.Camera#position
* @property ***REMOVED***Phaser.Point***REMOVED*** position - Gets or sets the cameras xy position using Phaser.Point object.
*/
Object.defineProperty(Phaser.Camera.prototype, "position", ***REMOVED***

    get: function () ***REMOVED***

        this._position.set(this.view.x, this.view.y);

        return this._position;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (typeof value.x !== "undefined") ***REMOVED*** this.view.x = value.x; ***REMOVED***
        if (typeof value.y !== "undefined") ***REMOVED*** this.view.y = value.y; ***REMOVED***

        if (this.bounds)
        ***REMOVED***
            this.checkBounds();
        ***REMOVED***
    ***REMOVED***

***REMOVED***);

/**
* The Cameras width. By default this is the same as the Game size and should not be adjusted for now.
* @name Phaser.Camera#width
* @property ***REMOVED***number***REMOVED*** width - Gets or sets the cameras width.
*/
Object.defineProperty(Phaser.Camera.prototype, "width", ***REMOVED***

    get: function () ***REMOVED***

        return this.view.width;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.view.width = value;

    ***REMOVED***

***REMOVED***);

/**
* The Cameras height. By default this is the same as the Game size and should not be adjusted for now.
* @name Phaser.Camera#height
* @property ***REMOVED***number***REMOVED*** height - Gets or sets the cameras height.
*/
Object.defineProperty(Phaser.Camera.prototype, "height", ***REMOVED***

    get: function () ***REMOVED***

        return this.view.height;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.view.height = value;

    ***REMOVED***

***REMOVED***);


/**
* The Cameras shake intensity.
* @name Phaser.Camera#shakeIntensity
* @property ***REMOVED***number***REMOVED*** shakeIntensity - Gets or sets the cameras shake intensity.
*/
Object.defineProperty(Phaser.Camera.prototype, "shakeIntensity", ***REMOVED***

    get: function () ***REMOVED***

        return this._shake.intensity;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this._shake.intensity = value;

    ***REMOVED***

***REMOVED***);

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* This is a base State class which can be extended if you are creating your own game.
* It provides quick access to common functions such as the camera, cache, input, match, sound and more.
*
* @class Phaser.State
* @constructor
*/
Phaser.State = function () ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - This is a reference to the currently running Game.
    */
    this.game = null;

    /**
    * @property ***REMOVED***string***REMOVED*** key - The string based identifier given to the State when added into the State Manager.
    */
    this.key = '';

    /**
    * @property ***REMOVED***Phaser.GameObjectFactory***REMOVED*** add - A reference to the GameObjectFactory which can be used to add new objects to the World.
    */
    this.add = null;

    /**
    * @property ***REMOVED***Phaser.GameObjectCreator***REMOVED*** make - A reference to the GameObjectCreator which can be used to make new objects.
    */
    this.make = null;

    /**
    * @property ***REMOVED***Phaser.Camera***REMOVED*** camera - A handy reference to World.camera.
    */
    this.camera = null;

    /**
    * @property ***REMOVED***Phaser.Cache***REMOVED*** cache - A reference to the game cache which contains any loaded or generated assets, such as images, sound and more.
    */
    this.cache = null;

    /**
    * @property ***REMOVED***Phaser.Input***REMOVED*** input - A reference to the Input Manager.
    */
    this.input = null;

    /**
    * @property ***REMOVED***Phaser.Loader***REMOVED*** load - A reference to the Loader, which you mostly use in the preload method of your state to load external assets.
    */
    this.load = null;

    /**
    * @property ***REMOVED***Phaser.Math***REMOVED*** math - A reference to Math class with lots of helpful functions.
    */
    this.math = null;

    /**
    * @property ***REMOVED***Phaser.SoundManager***REMOVED*** sound - A reference to the Sound Manager which can create, play and stop sounds, as well as adjust global volume.
    */
    this.sound = null;

    /**
    * @property ***REMOVED***Phaser.ScaleManager***REMOVED*** scale - A reference to the Scale Manager which controls the way the game scales on different displays.
    */
    this.scale = null;

    /**
    * @property ***REMOVED***Phaser.Stage***REMOVED*** stage - A reference to the Stage.
    */
    this.stage = null;

    /**
    * @property ***REMOVED***Phaser.StateManager***REMOVED*** stage - A reference to the State Manager, which controls state changes.
    */
    this.state = null;

    /**
    * @property ***REMOVED***Phaser.Time***REMOVED*** time - A reference to the game clock and timed events system.
    */
    this.time = null;

    /**
    * @property ***REMOVED***Phaser.TweenManager***REMOVED*** tweens - A reference to the tween manager.
    */
    this.tweens = null;

    /**
    * @property ***REMOVED***Phaser.World***REMOVED*** world - A reference to the game world. All objects live in the Game World and its size is not bound by the display resolution.
    */
    this.world = null;

    /**
    * @property ***REMOVED***Phaser.Particles***REMOVED*** particles - The Particle Manager. It is called during the core gameloop and updates any Particle Emitters it has created.
    */
    this.particles = null;

    /**
    * @property ***REMOVED***Phaser.Physics***REMOVED*** physics - A reference to the physics manager which looks after the different physics systems available within Phaser.
    */
    this.physics = null;

    /**
    * @property ***REMOVED***Phaser.RandomDataGenerator***REMOVED*** rnd - A reference to the seeded and repeatable random data generator.
    */
    this.rnd = null;

***REMOVED***;

Phaser.State.prototype = ***REMOVED***

    /**
    * init is the very first function called when your State starts up. It's called before preload, create or anything else.
    * If you need to route the game away to another State you could do so here, or if you need to prepare a set of variables
    * or objects before the preloading starts.
    *
    * @method Phaser.State#init
    */
    init: function () ***REMOVED***
    ***REMOVED***,

    /**
    * preload is called first. Normally you'd use this to load your game assets (or those needed for the current State)
    * You shouldn't create any objects in this method that require assets that you're also loading in this method, as
    * they won't yet be available.
    *
    * @method Phaser.State#preload
    */
    preload: function () ***REMOVED***
    ***REMOVED***,

    /**
    * loadUpdate is called during the Loader process. This only happens if you've set one or more assets to load in the preload method.
    *
    * @method Phaser.State#loadUpdate
    */
    loadUpdate: function () ***REMOVED***
    ***REMOVED***,

    /**
    * loadRender is called during the Loader process. This only happens if you've set one or more assets to load in the preload method.
    * The difference between loadRender and render is that any objects you render in this method you must be sure their assets exist.
    *
    * @method Phaser.State#loadRender
    */
    loadRender: function () ***REMOVED***
    ***REMOVED***,

    /**
    * create is called once preload has completed, this includes the loading of any assets from the Loader.
    * If you don't have a preload method then create is the first method called in your State.
    *
    * @method Phaser.State#create
    */
    create: function () ***REMOVED***
    ***REMOVED***,

    /**
    * The update method is left empty for your own use.
    * It is called during the core game loop AFTER debug, physics, plugins and the Stage have had their preUpdate methods called.
    * It is called BEFORE Stage, Tweens, Sounds, Input, Physics, Particles and Plugins have had their postUpdate methods called.
    *
    * @method Phaser.State#update
    */
    update: function () ***REMOVED***
    ***REMOVED***,

    /**
    * The preRender method is called after all Game Objects have been updated, but before any rendering takes place.
    *
    * @method Phaser.State#preRender
    */
    preRender: function () ***REMOVED***
    ***REMOVED***,

    /**
    * Nearly all display objects in Phaser render automatically, you don't need to tell them to render.
    * However the render method is called AFTER the game renderer and plugins have rendered, so you're able to do any
    * final post-processing style effects here. Note that this happens before plugins postRender takes place.
    *
    * @method Phaser.State#render
    */
    render: function () ***REMOVED***
    ***REMOVED***,

    /**
    * If your game is set to Scalemode RESIZE then each time the browser resizes it will call this function, passing in the new width and height.
    *
    * @method Phaser.State#resize
    */
    resize: function () ***REMOVED***
    ***REMOVED***,

    /**
    * This method will be called if the core game loop is paused.
    *
    * @method Phaser.State#paused
    */
    paused: function () ***REMOVED***
    ***REMOVED***,

    /**
    * This method will be called when the core game loop resumes from a paused state.
    *
    * @method Phaser.State#resumed
    */
    resumed: function () ***REMOVED***
    ***REMOVED***,

    /**
    * pauseUpdate is called while the game is paused instead of preUpdate, update and postUpdate.
    *
    * @method Phaser.State#pauseUpdate
    */
    pauseUpdate: function () ***REMOVED***
    ***REMOVED***,

    /**
    * This method will be called when the State is shutdown (i.e. you switch to another state from this one).
    *
    * @method Phaser.State#shutdown
    */
    shutdown: function () ***REMOVED***
    ***REMOVED***

***REMOVED***;

Phaser.State.prototype.constructor = Phaser.State;

/* jshint newcap: false */

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The State Manager is responsible for loading, setting up and switching game states.
*
* @class Phaser.StateManager
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***Phaser.State|Object***REMOVED*** [pendingState=null] - A State object to seed the manager with.
*/
Phaser.StateManager = function (game, pendingState) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***object***REMOVED*** states - The object containing Phaser.States.
    */
    this.states = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***Phaser.State***REMOVED*** _pendingState - The state to be switched to in the next frame.
    * @private
    */
    this._pendingState = null;

    if (typeof pendingState !== 'undefined' && pendingState !== null)
    ***REMOVED***
        this._pendingState = pendingState;
    ***REMOVED***

    /**
    * @property ***REMOVED***boolean***REMOVED*** _clearWorld - Clear the world when we switch state?
    * @private
    */
    this._clearWorld = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _clearCache - Clear the cache when we switch state?
    * @private
    */
    this._clearCache = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _created - Flag that sets if the State has been created or not.
    * @private
    */
    this._created = false;

    /**
    * @property ***REMOVED***any[]***REMOVED*** _args - Temporary container when you pass vars from one State to another.
    * @private
    */
    this._args = [];

    /**
    * @property ***REMOVED***string***REMOVED*** current - The current active State object.
    * @default
    */
    this.current = '';

    /**
    * onStateChange is a Phaser.Signal that is dispatched whenever the game changes state.
    * 
    * It is dispatched only when the new state is started, which isn't usually at the same time as StateManager.start
    * is called because state swapping is done in sync with the game loop. It is dispatched *before* any of the new states
    * methods (such as preload and create) are called, and *after* the previous states shutdown method has been run.
    *
    * The callback you specify is sent two parameters: the string based key of the new state, 
    * and the second parameter is the string based key of the old / previous state.
    * 
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onStateChange
    */
    this.onStateChange = new Phaser.Signal();

    /**
    * @property ***REMOVED***function***REMOVED*** onInitCallback - This is called when the state is set as the active state.
    * @default
    */
    this.onInitCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onPreloadCallback - This is called when the state starts to load assets.
    * @default
    */
    this.onPreloadCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onCreateCallback - This is called when the state preload has finished and creation begins.
    * @default
    */
    this.onCreateCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onUpdateCallback - This is called when the state is updated, every game loop. It doesn't happen during preload (@see onLoadUpdateCallback).
    * @default
    */
    this.onUpdateCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onRenderCallback - This is called post-render. It doesn't happen during preload (see onLoadRenderCallback).
    * @default
    */
    this.onRenderCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onResizeCallback - This is called if ScaleManager.scalemode is RESIZE and a resize event occurs. It's passed the new width and height.
    * @default
    */
    this.onResizeCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onPreRenderCallback - This is called before the state is rendered and before the stage is cleared but after all game objects have had their final properties adjusted.
    * @default
    */
    this.onPreRenderCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onLoadUpdateCallback - This is called when the State is updated during the preload phase.
    * @default
    */
    this.onLoadUpdateCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onLoadRenderCallback - This is called when the State is rendered during the preload phase.
    * @default
    */
    this.onLoadRenderCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onPausedCallback - This is called when the game is paused.
    * @default
    */
    this.onPausedCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onResumedCallback - This is called when the game is resumed from a paused state.
    * @default
    */
    this.onResumedCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onPauseUpdateCallback - This is called every frame while the game is paused.
    * @default
    */
    this.onPauseUpdateCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onShutDownCallback - This is called when the state is shut down (i.e. swapped to another state).
    * @default
    */
    this.onShutDownCallback = null;

***REMOVED***;

Phaser.StateManager.prototype = ***REMOVED***

    /**
    * The Boot handler is called by Phaser.Game when it first starts up.
    * @method Phaser.StateManager#boot
    * @private
    */
    boot: function () ***REMOVED***

        this.game.onPause.add(this.pause, this);
        this.game.onResume.add(this.resume, this);

        if (this._pendingState !== null && typeof this._pendingState !== 'string')
        ***REMOVED***
            this.add('default', this._pendingState, true);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Adds a new State into the StateManager. You must give each State a unique key by which you'll identify it.
    * The State can be either a Phaser.State object (or an object that extends it), a plain JavaScript object or a function.
    * If a function is given a new state object will be created by calling it.
    *
    * @method Phaser.StateManager#add
    * @param ***REMOVED***string***REMOVED*** key - A unique key you use to reference this state, i.e. "MainMenu", "Level1".
    * @param ***REMOVED***Phaser.State|object|function***REMOVED*** state  - The state you want to switch to.
    * @param ***REMOVED***boolean***REMOVED*** [autoStart=false]  - If true the State will be started immediately after adding it.
    */
    add: function (key, state, autoStart) ***REMOVED***

        if (autoStart === undefined) ***REMOVED*** autoStart = false; ***REMOVED***

        var newState;

        if (state instanceof Phaser.State)
        ***REMOVED***
            newState = state;
        ***REMOVED***
        else if (typeof state === 'object')
        ***REMOVED***
            newState = state;
            newState.game = this.game;
        ***REMOVED***
        else if (typeof state === 'function')
        ***REMOVED***
            newState = new state(this.game);
        ***REMOVED***

        this.states[key] = newState;

        if (autoStart)
        ***REMOVED***
            if (this.game.isBooted)
            ***REMOVED***
                this.start(key);
            ***REMOVED***
            else
            ***REMOVED***
                this._pendingState = key;
            ***REMOVED***
        ***REMOVED***

        return newState;

    ***REMOVED***,

    /**
    * Delete the given state.
    * @method Phaser.StateManager#remove
    * @param ***REMOVED***string***REMOVED*** key - A unique key you use to reference this state, i.e. "MainMenu", "Level1".
    */
    remove: function (key) ***REMOVED***

        if (this.current === key)
        ***REMOVED***
            this.callbackContext = null;

            this.onInitCallback = null;
            this.onShutDownCallback = null;

            this.onPreloadCallback = null;
            this.onLoadRenderCallback = null;
            this.onLoadUpdateCallback = null;
            this.onCreateCallback = null;
            this.onUpdateCallback = null;
            this.onPreRenderCallback = null;
            this.onRenderCallback = null;
            this.onResizeCallback = null;
            this.onPausedCallback = null;
            this.onResumedCallback = null;
            this.onPauseUpdateCallback = null;
        ***REMOVED***

        delete this.states[key];

    ***REMOVED***,

    /**
    * Start the given State. If a State is already running then State.shutDown will be called (if it exists) before switching to the new State.
    *
    * @method Phaser.StateManager#start
    * @param ***REMOVED***string***REMOVED*** key - The key of the state you want to start.
    * @param ***REMOVED***boolean***REMOVED*** [clearWorld=true] - Clear everything in the world? This clears the World display list fully (but not the Stage, so if you've added your own objects to the Stage they will need managing directly)
    * @param ***REMOVED***boolean***REMOVED*** [clearCache=false] - Clear the Game.Cache? This purges out all loaded assets. The default is false and you must have clearWorld=true if you want to clearCache as well.
    * @param ***REMOVED***...****REMOVED*** parameter - Additional parameters that will be passed to the State.init function (if it has one).
    */
    start: function (key, clearWorld, clearCache) ***REMOVED***

        if (clearWorld === undefined) ***REMOVED*** clearWorld = true; ***REMOVED***
        if (clearCache === undefined) ***REMOVED*** clearCache = false; ***REMOVED***

        if (this.checkState(key))
        ***REMOVED***
            //  Place the state in the queue. It will be started the next time the game loop begins.
            this._pendingState = key;
            this._clearWorld = clearWorld;
            this._clearCache = clearCache;

            if (arguments.length > 3)
            ***REMOVED***
                this._args = Array.prototype.splice.call(arguments, 3);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Restarts the current State. State.shutDown will be called (if it exists) before the State is restarted.
    *
    * @method Phaser.StateManager#restart
    * @param ***REMOVED***boolean***REMOVED*** [clearWorld=true] - Clear everything in the world? This clears the World display list fully (but not the Stage, so if you've added your own objects to the Stage they will need managing directly)
    * @param ***REMOVED***boolean***REMOVED*** [clearCache=false] - Clear the Game.Cache? This purges out all loaded assets. The default is false and you must have clearWorld=true if you want to clearCache as well.
    * @param ***REMOVED***...****REMOVED*** parameter - Additional parameters that will be passed to the State.init function if it has one.
    */
    restart: function (clearWorld, clearCache) ***REMOVED***

        if (clearWorld === undefined) ***REMOVED*** clearWorld = true; ***REMOVED***
        if (clearCache === undefined) ***REMOVED*** clearCache = false; ***REMOVED***

        //  Place the state in the queue. It will be started the next time the game loop starts.
        this._pendingState = this.current;
        this._clearWorld = clearWorld;
        this._clearCache = clearCache;

        if (arguments.length > 2)
        ***REMOVED***
            this._args = Array.prototype.slice.call(arguments, 2);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Used by onInit and onShutdown when those functions don't exist on the state
    * @method Phaser.StateManager#dummy
    * @private
    */
    dummy: function () ***REMOVED***
    ***REMOVED***,

    /**
    * preUpdate is called right at the start of the game loop. It is responsible for changing to a new state that was requested previously.
    *
    * @method Phaser.StateManager#preUpdate
    */
    preUpdate: function () ***REMOVED***

        if (this._pendingState && this.game.isBooted)
        ***REMOVED***
            var previousStateKey = this.current;

            //  Already got a state running?
            this.clearCurrentState();

            this.setCurrentState(this._pendingState);

            this.onStateChange.dispatch(this.current, previousStateKey);

            if (this.current !== this._pendingState)
            ***REMOVED***
                return;
            ***REMOVED***
            else
            ***REMOVED***
                this._pendingState = null;
            ***REMOVED***

            //  If StateManager.start has been called from the init of a State that ALSO has a preload, then
            //  onPreloadCallback will be set, but must be ignored
            if (this.onPreloadCallback)
            ***REMOVED***
                this.game.load.reset(true);
                this.onPreloadCallback.call(this.callbackContext, this.game);

                //  Is the loader empty?
                if (this.game.load.totalQueuedFiles() === 0 && this.game.load.totalQueuedPacks() === 0)
                ***REMOVED***
                    this.loadComplete();
                ***REMOVED***
                else
                ***REMOVED***
                    //  Start the loader going as we have something in the queue
                    this.game.load.start();
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                //  No init? Then there was nothing to load either
                this.loadComplete();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * This method clears the current State, calling its shutdown callback. The process also removes any active tweens,
    * resets the camera, resets input, clears physics, removes timers and if set clears the world and cache too.
    *
    * @method Phaser.StateManager#clearCurrentState
    */
    clearCurrentState: function () ***REMOVED***

        if (this.current)
        ***REMOVED***
            if (this.onShutDownCallback)
            ***REMOVED***
                this.onShutDownCallback.call(this.callbackContext, this.game);
            ***REMOVED***

            this.game.tweens.removeAll();

            this.game.camera.reset();

            this.game.input.reset(true);

            this.game.physics.clear();

            this.game.time.removeAll();

            this.game.scale.reset(this._clearWorld);

            if (this.game.debug)
            ***REMOVED***
                this.game.debug.reset();
            ***REMOVED***

            if (this._clearWorld)
            ***REMOVED***
                this.game.world.shutdown();

                if (this._clearCache)
                ***REMOVED***
                    this.game.cache.destroy();
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Checks if a given phaser state is valid. A State is considered valid if it has at least one of the core functions: preload, create, update or render.
    *
    * @method Phaser.StateManager#checkState
    * @param ***REMOVED***string***REMOVED*** key - The key of the state you want to check.
    * @return ***REMOVED***boolean***REMOVED*** true if the State has the required functions, otherwise false.
    */
    checkState: function (key) ***REMOVED***

        if (this.states[key])
        ***REMOVED***
            if (this.states[key]['preload'] || this.states[key]['create'] || this.states[key]['update'] || this.states[key]['render'])
            ***REMOVED***
                return true;
            ***REMOVED***
            else
            ***REMOVED***
                console.warn("Invalid Phaser State object given. Must contain at least a one of the required functions: preload, create, update or render");
                return false;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            console.warn("Phaser.StateManager - No state found with the key: " + key);
            return false;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Links game properties to the State given by the key.
    *
    * @method Phaser.StateManager#link
    * @param ***REMOVED***string***REMOVED*** key - State key.
    * @protected
    */
    link: function (key) ***REMOVED***

        this.states[key].game = this.game;
        this.states[key].add = this.game.add;
        this.states[key].make = this.game.make;
        this.states[key].camera = this.game.camera;
        this.states[key].cache = this.game.cache;
        this.states[key].input = this.game.input;
        this.states[key].load = this.game.load;
        this.states[key].math = this.game.math;
        this.states[key].sound = this.game.sound;
        this.states[key].scale = this.game.scale;
        this.states[key].state = this;
        this.states[key].stage = this.game.stage;
        this.states[key].time = this.game.time;
        this.states[key].tweens = this.game.tweens;
        this.states[key].world = this.game.world;
        this.states[key].particles = this.game.particles;
        this.states[key].rnd = this.game.rnd;
        this.states[key].physics = this.game.physics;
        this.states[key].key = key;

    ***REMOVED***,

    /**
    * Nulls all State level Phaser properties, including a reference to Game.
    *
    * @method Phaser.StateManager#unlink
    * @param ***REMOVED***string***REMOVED*** key - State key.
    * @protected
    */
    unlink: function (key) ***REMOVED***

        if (this.states[key])
        ***REMOVED***
            this.states[key].game = null;
            this.states[key].add = null;
            this.states[key].make = null;
            this.states[key].camera = null;
            this.states[key].cache = null;
            this.states[key].input = null;
            this.states[key].load = null;
            this.states[key].math = null;
            this.states[key].sound = null;
            this.states[key].scale = null;
            this.states[key].state = null;
            this.states[key].stage = null;
            this.states[key].time = null;
            this.states[key].tweens = null;
            this.states[key].world = null;
            this.states[key].particles = null;
            this.states[key].rnd = null;
            this.states[key].physics = null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets the current State. Should not be called directly (use StateManager.start)
    *
    * @method Phaser.StateManager#setCurrentState
    * @param ***REMOVED***string***REMOVED*** key - State key.
    * @private
    */
    setCurrentState: function (key) ***REMOVED***

        this.callbackContext = this.states[key];

        this.link(key);

        //  Used when the state is set as being the current active state
        this.onInitCallback = this.states[key]['init'] || this.dummy;

        this.onPreloadCallback = this.states[key]['preload'] || null;
        this.onLoadRenderCallback = this.states[key]['loadRender'] || null;
        this.onLoadUpdateCallback = this.states[key]['loadUpdate'] || null;
        this.onCreateCallback = this.states[key]['create'] || null;
        this.onUpdateCallback = this.states[key]['update'] || null;
        this.onPreRenderCallback = this.states[key]['preRender'] || null;
        this.onRenderCallback = this.states[key]['render'] || null;
        this.onResizeCallback = this.states[key]['resize'] || null;
        this.onPausedCallback = this.states[key]['paused'] || null;
        this.onResumedCallback = this.states[key]['resumed'] || null;
        this.onPauseUpdateCallback = this.states[key]['pauseUpdate'] || null;

        //  Used when the state is no longer the current active state
        this.onShutDownCallback = this.states[key]['shutdown'] || this.dummy;

        //  Reset the physics system, but not on the first state start
        if (this.current !== '')
        ***REMOVED***
            this.game.physics.reset();
        ***REMOVED***

        this.current = key;
        this._created = false;

        //  At this point key and pendingState should equal each other
        this.onInitCallback.apply(this.callbackContext, this._args);

        //  If they no longer do then the init callback hit StateManager.start
        if (key === this._pendingState)
        ***REMOVED***
            this._args = [];
        ***REMOVED***

        this.game._kickstart = true;

    ***REMOVED***,

    /**
     * Gets the current State.
     *
     * @method Phaser.StateManager#getCurrentState
     * @return ***REMOVED***Phaser.State***REMOVED***
     * @public
     */
    getCurrentState: function() ***REMOVED***
        return this.states[this.current];
    ***REMOVED***,

    /**
    * @method Phaser.StateManager#loadComplete
    * @protected
    */
    loadComplete: function () ***REMOVED***

        //  Make sure to do load-update one last time before state is set to _created
        if (this._created === false && this.onLoadUpdateCallback)
        ***REMOVED***
            this.onLoadUpdateCallback.call(this.callbackContext, this.game);
        ***REMOVED***

        if (this._created === false && this.onCreateCallback)
        ***REMOVED***
            this._created = true;
            this.onCreateCallback.call(this.callbackContext, this.game);
        ***REMOVED***
        else
        ***REMOVED***
            this._created = true;
        ***REMOVED***

    ***REMOVED***,

    /**
    * @method Phaser.StateManager#pause
    * @protected
    */
    pause: function () ***REMOVED***

        if (this._created && this.onPausedCallback)
        ***REMOVED***
            this.onPausedCallback.call(this.callbackContext, this.game);
        ***REMOVED***

    ***REMOVED***,

    /**
    * @method Phaser.StateManager#resume
    * @protected
    */
    resume: function () ***REMOVED***

        if (this._created && this.onResumedCallback)
        ***REMOVED***
            this.onResumedCallback.call(this.callbackContext, this.game);
        ***REMOVED***

    ***REMOVED***,

    /**
    * @method Phaser.StateManager#update
    * @protected
    */
    update: function () ***REMOVED***

        if (this._created)
        ***REMOVED***
            if (this.onUpdateCallback)
            ***REMOVED***
                this.onUpdateCallback.call(this.callbackContext, this.game);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (this.onLoadUpdateCallback)
            ***REMOVED***
                this.onLoadUpdateCallback.call(this.callbackContext, this.game);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * @method Phaser.StateManager#pauseUpdate
    * @protected
    */
    pauseUpdate: function () ***REMOVED***

        if (this._created)
        ***REMOVED***
            if (this.onPauseUpdateCallback)
            ***REMOVED***
                this.onPauseUpdateCallback.call(this.callbackContext, this.game);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (this.onLoadUpdateCallback)
            ***REMOVED***
                this.onLoadUpdateCallback.call(this.callbackContext, this.game);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * @method Phaser.StateManager#preRender
    * @protected
    * @param ***REMOVED***number***REMOVED*** elapsedTime - The time elapsed since the last update.
    */
    preRender: function (elapsedTime) ***REMOVED***

        if (this._created && this.onPreRenderCallback)
        ***REMOVED***
            this.onPreRenderCallback.call(this.callbackContext, this.game, elapsedTime);
        ***REMOVED***

    ***REMOVED***,

    /**
    * @method Phaser.StateManager#resize
    * @protected
    */
    resize: function (width, height) ***REMOVED***

        if (this.onResizeCallback)
        ***REMOVED***
            this.onResizeCallback.call(this.callbackContext, width, height);
        ***REMOVED***

    ***REMOVED***,

    /**
    * @method Phaser.StateManager#render
    * @protected
    */
    render: function () ***REMOVED***

        if (this._created)
        ***REMOVED***
            if (this.onRenderCallback)
            ***REMOVED***
                if (this.game.renderType === Phaser.CANVAS)
                ***REMOVED***
                    this.game.context.save();
                    this.game.context.setTransform(1, 0, 0, 1, 0, 0);
                    this.onRenderCallback.call(this.callbackContext, this.game);
                    this.game.context.restore();
                ***REMOVED***
                else
                ***REMOVED***
                    this.onRenderCallback.call(this.callbackContext, this.game);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (this.onLoadRenderCallback)
            ***REMOVED***
                this.onLoadRenderCallback.call(this.callbackContext, this.game);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Removes all StateManager callback references to the State object, nulls the game reference and clears the States object.
    * You don't recover from this without rebuilding the Phaser instance again.
    * @method Phaser.StateManager#destroy
    */
    destroy: function () ***REMOVED***

        this._clearWorld = true;
        this._clearCache = true;

        this.clearCurrentState();

        this.callbackContext = null;

        this.onInitCallback = null;
        this.onShutDownCallback = null;

        this.onPreloadCallback = null;
        this.onLoadRenderCallback = null;
        this.onLoadUpdateCallback = null;
        this.onCreateCallback = null;
        this.onUpdateCallback = null;
        this.onRenderCallback = null;
        this.onPausedCallback = null;
        this.onResumedCallback = null;
        this.onPauseUpdateCallback = null;

        this.game = null;
        this.states = ***REMOVED******REMOVED***;
        this._pendingState = null;
        this.current = '';

    ***REMOVED***

***REMOVED***;

Phaser.StateManager.prototype.constructor = Phaser.StateManager;

/**
* @name Phaser.StateManager#created
* @property ***REMOVED***boolean***REMOVED*** created - True if the current state has had its `create` method run (if it has one, if not this is true by default).
* @readOnly
*/
Object.defineProperty(Phaser.StateManager.prototype, "created", ***REMOVED***

    get: function () ***REMOVED***

        return this._created;

    ***REMOVED***

***REMOVED***);

/**
* "It's like nailing jelly to a kitten" - Gary Penn
*/

/**
* @author       Miller Medeiros http://millermedeiros.github.com/js-signals/
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Signals are what Phaser uses to handle events and event dispatching.
* You can listen for a Signal by binding a callback / function to it.
* This is done by using either `Signal.add` or `Signal.addOnce`.
*
* For example you can listen for a touch or click event from the Input Manager 
* by using its `onDown` Signal:
*
* `game.input.onDown.add(function() ***REMOVED*** ... ***REMOVED***);`
*
* Rather than inline your function, you can pass a reference:
*
* `game.input.onDown.add(clicked, this);`
* `function clicked () ***REMOVED*** ... ***REMOVED***`
*
* In this case the second argument (`this`) is the context in which your function should be called.
*
* Now every time the InputManager dispatches the `onDown` signal (or event), your function
* will be called.
*
* Very often a Signal will send arguments to your function.
* This is specific to the Signal itself.
* If you're unsure then check the documentation, or failing that simply do:
*
* `Signal.add(function() ***REMOVED*** console.log(arguments); ***REMOVED***)`
*
* and it will log all of the arguments your function received from the Signal.
*
* Sprites have lots of default signals you can listen to in their Events class, such as:
*
* `sprite.events.onKilled`
* 
* Which is called automatically whenever the Sprite is killed.
* There are lots of other events, see the Events component for a list.
*
* As well as listening to pre-defined Signals you can also create your own:
*
* `var mySignal = new Phaser.Signal();`
*
* This creates a new Signal. You can bind a callback to it:
*
* `mySignal.add(myCallback, this);`
*
* and then finally when ready you can dispatch the Signal:
*
* `mySignal.dispatch(your arguments);`
*
* And your callback will be invoked. See the dispatch method for more details.
*
* @class Phaser.Signal
* @constructor
*/
Phaser.Signal = function () ***REMOVED******REMOVED***;

Phaser.Signal.prototype = ***REMOVED***

    /**
    * @property ***REMOVED***?Array.<Phaser.SignalBinding>***REMOVED*** _bindings - Internal variable.
    * @private
    */
    _bindings: null,

    /**
    * @property ***REMOVED***any***REMOVED*** _prevParams - Internal variable.
    * @private
    */
    _prevParams: null,

    /**
    * Memorize the previously dispatched event?
    *
    * If an event has been memorized it is automatically dispatched when a new listener is added with ***REMOVED***@link #add***REMOVED*** or ***REMOVED***@link #addOnce***REMOVED***.
    * Use ***REMOVED***@link #forget***REMOVED*** to clear any currently memorized event.
    *
    * @property ***REMOVED***boolean***REMOVED*** memorize
    */
    memorize: false,

    /**
    * @property ***REMOVED***boolean***REMOVED*** _shouldPropagate
    * @private
    */
    _shouldPropagate: true,

    /**
    * Is the Signal active? Only active signals will broadcast dispatched events.
    *
    * Setting this property during a dispatch will only affect the next dispatch. To stop the propagation of a signal from a listener use ***REMOVED***@link #halt***REMOVED***.
    *
    * @property ***REMOVED***boolean***REMOVED*** active
    * @default
    */
    active: true,

    /**
    * @property ***REMOVED***function***REMOVED*** _boundDispatch - The bound dispatch function, if any.
    * @private
    */
    _boundDispatch: false,

    /**
    * @method Phaser.Signal#validateListener
    * @param ***REMOVED***function***REMOVED*** listener - Signal handler function.
    * @param ***REMOVED***string***REMOVED*** fnName - Function name.
    * @private
    */
    validateListener: function (listener, fnName) ***REMOVED***

        if (typeof listener !== 'function')
        ***REMOVED***
            throw new Error('Phaser.Signal: listener is a required param of ***REMOVED***fn***REMOVED***() and should be a Function.'.replace('***REMOVED***fn***REMOVED***', fnName));
        ***REMOVED***

    ***REMOVED***,

    /**
    * @method Phaser.Signal#_registerListener
    * @private
    * @param ***REMOVED***function***REMOVED*** listener - Signal handler function.
    * @param ***REMOVED***boolean***REMOVED*** isOnce - Should the listener only be called once?
    * @param ***REMOVED***object***REMOVED*** [listenerContext] - The context under which the listener is invoked.
    * @param ***REMOVED***number***REMOVED*** [priority] - The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0).
    * @return ***REMOVED***Phaser.SignalBinding***REMOVED*** An Object representing the binding between the Signal and listener.
    */
    _registerListener: function (listener, isOnce, listenerContext, priority, args) ***REMOVED***

        var prevIndex = this._indexOfListener(listener, listenerContext);
        var binding;

        if (prevIndex !== -1)
        ***REMOVED***
            binding = this._bindings[prevIndex];

            if (binding.isOnce() !== isOnce)
            ***REMOVED***
                throw new Error('You cannot add' + (isOnce ? '' : 'Once') + '() then add' + (!isOnce ? '' : 'Once') + '() the same listener without removing the relationship first.');
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            binding = new Phaser.SignalBinding(this, listener, isOnce, listenerContext, priority, args);
            this._addBinding(binding);
        ***REMOVED***

        if (this.memorize && this._prevParams)
        ***REMOVED***
            binding.execute(this._prevParams);
        ***REMOVED***

        return binding;

    ***REMOVED***,

    /**
    * @method Phaser.Signal#_addBinding
    * @private
    * @param ***REMOVED***Phaser.SignalBinding***REMOVED*** binding - An Object representing the binding between the Signal and listener.
    */
    _addBinding: function (binding) ***REMOVED***

        if (!this._bindings)
        ***REMOVED***
            this._bindings = [];
        ***REMOVED***

        //  Simplified insertion sort
        var n = this._bindings.length;

        do ***REMOVED***
            n--;
        ***REMOVED***
        while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);

        this._bindings.splice(n + 1, 0, binding);

    ***REMOVED***,

    /**
    * @method Phaser.Signal#_indexOfListener
    * @private
    * @param ***REMOVED***function***REMOVED*** listener - Signal handler function.
    * @param ***REMOVED***object***REMOVED*** [context=null] - Signal handler function.
    * @return ***REMOVED***number***REMOVED*** The index of the listener within the private bindings array.
    */
    _indexOfListener: function (listener, context) ***REMOVED***

        if (!this._bindings)
        ***REMOVED***
            return -1;
        ***REMOVED***

        if (context === undefined) ***REMOVED*** context = null; ***REMOVED***

        var n = this._bindings.length;
        var cur;

        while (n--)
        ***REMOVED***
            cur = this._bindings[n];

            if (cur._listener === listener && cur.context === context)
            ***REMOVED***
                return n;
            ***REMOVED***
        ***REMOVED***

        return -1;

    ***REMOVED***,

    /**
    * Check if a specific listener is attached.
    *
    * @method Phaser.Signal#has
    * @param ***REMOVED***function***REMOVED*** listener - Signal handler function.
    * @param ***REMOVED***object***REMOVED*** [context] - Context on which listener will be executed (object that should represent the `this` variable inside listener function).
    * @return ***REMOVED***boolean***REMOVED*** If Signal has the specified listener.
    */
    has: function (listener, context) ***REMOVED***

        return this._indexOfListener(listener, context) !== -1;

    ***REMOVED***,

    /**
    * Add an event listener for this signal.
    *
    * An event listener is a callback with a related context and priority.
    *
    * You can optionally provide extra arguments which will be passed to the callback after any internal parameters.
    *
    * For example: `Phaser.Key.onDown` when dispatched will send the Phaser.Key object that caused the signal as the first parameter.
    * Any arguments you've specified after `priority` will be sent as well:
    *
    * `fireButton.onDown.add(shoot, this, 0, 'lazer', 100);`
    *
    * When onDown dispatches it will call the `shoot` callback passing it: `Phaser.Key, 'lazer', 100`.
    *
    * Where the first parameter is the one that Key.onDown dispatches internally and 'lazer', 
    * and the value 100 were the custom arguments given in the call to 'add'.
    *
    * @method Phaser.Signal#add
    * @param ***REMOVED***function***REMOVED*** listener - The function to call when this Signal is dispatched.
    * @param ***REMOVED***object***REMOVED*** [listenerContext] - The context under which the listener will be executed (i.e. the object that should represent the `this` variable).
    * @param ***REMOVED***number***REMOVED*** [priority] - The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added (default = 0)
    * @param ***REMOVED***...any***REMOVED*** [args=(none)] - Additional arguments to pass to the callback (listener) function. They will be appended after any arguments usually dispatched.
    * @return ***REMOVED***Phaser.SignalBinding***REMOVED*** An Object representing the binding between the Signal and listener.
    */
    add: function (listener, listenerContext, priority) ***REMOVED***

        this.validateListener(listener, 'add');

        var args = [];

        if (arguments.length > 3)
        ***REMOVED***
            for (var i = 3; i < arguments.length; i++)
            ***REMOVED***
                args.push(arguments[i]);
            ***REMOVED***
        ***REMOVED***

        return this._registerListener(listener, false, listenerContext, priority, args);

    ***REMOVED***,

    /**
    * Add a one-time listener - the listener is automatically removed after the first execution.
    *
    * If there is as ***REMOVED***@link Phaser.Signal#memorize memorized***REMOVED*** event then it will be dispatched and
    * the listener will be removed immediately.
    *
    * @method Phaser.Signal#addOnce
    * @param ***REMOVED***function***REMOVED*** listener - The function to call when this Signal is dispatched.
    * @param ***REMOVED***object***REMOVED*** [listenerContext] - The context under which the listener will be executed (i.e. the object that should represent the `this` variable).
    * @param ***REMOVED***number***REMOVED*** [priority] - The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added (default = 0)
    * @param ***REMOVED***...any***REMOVED*** [args=(none)] - Additional arguments to pass to the callback (listener) function. They will be appended after any arguments usually dispatched.
    * @return ***REMOVED***Phaser.SignalBinding***REMOVED*** An Object representing the binding between the Signal and listener.
    */
    addOnce: function (listener, listenerContext, priority) ***REMOVED***

        this.validateListener(listener, 'addOnce');

        var args = [];

        if (arguments.length > 3)
        ***REMOVED***
            for (var i = 3; i < arguments.length; i++)
            ***REMOVED***
                args.push(arguments[i]);
            ***REMOVED***
        ***REMOVED***

        return this._registerListener(listener, true, listenerContext, priority, args);

    ***REMOVED***,

    /**
    * Remove a single event listener.
    *
    * @method Phaser.Signal#remove
    * @param ***REMOVED***function***REMOVED*** listener - Handler function that should be removed.
    * @param ***REMOVED***object***REMOVED*** [context=null] - Execution context (since you can add the same handler multiple times if executing in a different context).
    * @return ***REMOVED***function***REMOVED*** Listener handler function.
    */
    remove: function (listener, context) ***REMOVED***

        this.validateListener(listener, 'remove');

        var i = this._indexOfListener(listener, context);

        if (i !== -1)
        ***REMOVED***
            this._bindings[i]._destroy(); //no reason to a Phaser.SignalBinding exist if it isn't attached to a signal
            this._bindings.splice(i, 1);
        ***REMOVED***

        return listener;

    ***REMOVED***,

    /**
    * Remove all event listeners.
    *
    * @method Phaser.Signal#removeAll
    * @param ***REMOVED***object***REMOVED*** [context=null] - If specified only listeners for the given context will be removed.
    */
    removeAll: function (context) ***REMOVED***

        if (context === undefined) ***REMOVED*** context = null; ***REMOVED***

        if (!this._bindings)
        ***REMOVED***
            return;
        ***REMOVED***

        var n = this._bindings.length;

        while (n--)
        ***REMOVED***
            if (context)
            ***REMOVED***
                if (this._bindings[n].context === context)
                ***REMOVED***
                    this._bindings[n]._destroy();
                    this._bindings.splice(n, 1);
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                this._bindings[n]._destroy();
            ***REMOVED***
        ***REMOVED***

        if (!context)
        ***REMOVED***
            this._bindings.length = 0;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Gets the total number of listeners attached to this Signal.
    *
    * @method Phaser.Signal#getNumListeners
    * @return ***REMOVED***integer***REMOVED*** Number of listeners attached to the Signal.
    */
    getNumListeners: function () ***REMOVED***

        return this._bindings ? this._bindings.length : 0;

    ***REMOVED***,

    /**
    * Stop propagation of the event, blocking the dispatch to next listener on the queue.
    *
    * This should be called only during event dispatch as calling it before/after dispatch won't affect another broadcast.
    * See ***REMOVED***@link #active***REMOVED*** to enable/disable the signal entirely.
    *
    * @method Phaser.Signal#halt
    */
    halt: function () ***REMOVED***

        this._shouldPropagate = false;

    ***REMOVED***,

    /**
    * Dispatch / broadcast the event to all listeners.
    *
    * To create an instance-bound dispatch for this Signal, use ***REMOVED***@link #boundDispatch***REMOVED***.
    *
    * @method Phaser.Signal#dispatch
    * @param ***REMOVED***any***REMOVED*** [params] - Parameters that should be passed to each handler.
    */
    dispatch: function () ***REMOVED***

        if (!this.active || !this._bindings)
        ***REMOVED***
            return;
        ***REMOVED***

        var paramsArr = Array.prototype.slice.call(arguments);
        var n = this._bindings.length;
        var bindings;

        if (this.memorize)
        ***REMOVED***
            this._prevParams = paramsArr;
        ***REMOVED***

        if (!n)
        ***REMOVED***
            //  Should come after memorize
            return;
        ***REMOVED***

        bindings = this._bindings.slice(); //clone array in case add/remove items during dispatch
        this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.

        //execute all callbacks until end of the list or until a callback returns `false` or stops propagation
        //reverse loop since listeners with higher priority will be added at the end of the list
        do ***REMOVED***
            n--;
        ***REMOVED***
        while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);

    ***REMOVED***,

    /**
    * Forget the currently ***REMOVED***@link Phaser.Signal#memorize memorized***REMOVED*** event, if any.
    *
    * @method Phaser.Signal#forget
    */
    forget: function() ***REMOVED***

        if (this._prevParams)
        ***REMOVED***
            this._prevParams = null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Dispose the signal - no more events can be dispatched.
    *
    * This removes all event listeners and clears references to external objects.
    * Calling methods on a disposed objects results in undefined behavior.
    *
    * @method Phaser.Signal#dispose
    */
    dispose: function () ***REMOVED***

        this.removeAll();

        this._bindings = null;
        if (this._prevParams)
        ***REMOVED***
            this._prevParams = null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * A string representation of the object.
    *
    * @method Phaser.Signal#toString
    * @return ***REMOVED***string***REMOVED*** String representation of the object.
    */
    toString: function () ***REMOVED***

        return '[Phaser.Signal active:'+ this.active +' numListeners:'+ this.getNumListeners() +']';

    ***REMOVED***

***REMOVED***;

/**
* Create a `dispatch` function that maintains a binding to the original Signal context.
*
* Use the resulting value if the dispatch function needs to be passed somewhere
* or called independently of the Signal object.
*
* @memberof Phaser.Signal
* @property ***REMOVED***function***REMOVED*** boundDispatch
*/
Object.defineProperty(Phaser.Signal.prototype, "boundDispatch", ***REMOVED***

    get: function () ***REMOVED***
        var _this = this;
        return this._boundDispatch || (this._boundDispatch = function () ***REMOVED***
            return _this.dispatch.apply(_this, arguments);
        ***REMOVED***);
    ***REMOVED***

***REMOVED***);

Phaser.Signal.prototype.constructor = Phaser.Signal;

/**
* @author       Miller Medeiros http://millermedeiros.github.com/js-signals/
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Object that represents a binding between a Signal and a listener function.
* This is an internal constructor and shouldn't be created directly.
* Inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
* 
* @class Phaser.SignalBinding
* @constructor
* @param ***REMOVED***Phaser.Signal***REMOVED*** signal - Reference to Signal object that listener is currently bound to.
* @param ***REMOVED***function***REMOVED*** listener - Handler function bound to the signal.
* @param ***REMOVED***boolean***REMOVED*** isOnce - If binding should be executed just once.
* @param ***REMOVED***object***REMOVED*** [listenerContext=null] - Context on which listener will be executed (object that should represent the `this` variable inside listener function).
* @param ***REMOVED***number***REMOVED*** [priority] - The priority level of the event listener. (default = 0).
* @param ***REMOVED***...any***REMOVED*** [args=(none)] - Additional arguments to pass to the callback (listener) function. They will be appended after any arguments usually dispatched.
*/
Phaser.SignalBinding = function (signal, listener, isOnce, listenerContext, priority, args) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** _listener - Handler function bound to the signal.
    * @private
    */
    this._listener = listener;

    if (isOnce)
    ***REMOVED***
        this._isOnce = true;
    ***REMOVED***

    if (listenerContext != null) /* not null/undefined */
    ***REMOVED***
        this.context = listenerContext;
    ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** _signal - Reference to Signal object that listener is currently bound to.
    * @private
    */
    this._signal = signal;

    if (priority)
    ***REMOVED***
        this._priority = priority;
    ***REMOVED***

    if (args && args.length)
    ***REMOVED***
        this._args = args;
    ***REMOVED***

***REMOVED***;

Phaser.SignalBinding.prototype = ***REMOVED***

    /**
    * @property ***REMOVED***?object***REMOVED*** context - Context on which listener will be executed (object that should represent the `this` variable inside listener function).
    */
    context: null,

    /**
    * @property ***REMOVED***boolean***REMOVED*** _isOnce - If binding should be executed just once.
    * @private
    */
    _isOnce: false,

    /**
    * @property ***REMOVED***number***REMOVED*** _priority - Listener priority.
    * @private
    */
    _priority: 0,

    /**
    * @property ***REMOVED***array***REMOVED*** _args - Listener arguments.
    * @private
    */
    _args: null,

    /**
    * @property ***REMOVED***number***REMOVED*** callCount - The number of times the handler function has been called.
    */
    callCount: 0,

    /**
    * If binding is active and should be executed.
    * @property ***REMOVED***boolean***REMOVED*** active
    * @default
    */
    active: true,

    /**
    * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute` (curried parameters).
    * @property ***REMOVED***array|null***REMOVED*** params
    * @default
    */
    params: null,

    /**
    * Call listener passing arbitrary parameters.
    * If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.
    * @method Phaser.SignalBinding#execute
    * @param ***REMOVED***any[]***REMOVED*** [paramsArr] - Array of parameters that should be passed to the listener.
    * @return ***REMOVED***any***REMOVED*** Value returned by the listener.
    */
    execute: function(paramsArr) ***REMOVED***

        var handlerReturn, params;

        if (this.active && !!this._listener)
        ***REMOVED***
            params = this.params ? this.params.concat(paramsArr) : paramsArr;

            if (this._args)
            ***REMOVED***
                params = params.concat(this._args);
            ***REMOVED***

            handlerReturn = this._listener.apply(this.context, params);

            this.callCount++;

            if (this._isOnce)
            ***REMOVED***
                this.detach();
            ***REMOVED***
        ***REMOVED***

        return handlerReturn;

    ***REMOVED***,

    /**
    * Detach binding from signal.
    * alias to: @see mySignal.remove(myBinding.getListener());
    * @method Phaser.SignalBinding#detach
    * @return ***REMOVED***function|null***REMOVED*** Handler function bound to the signal or `null` if binding was previously detached.
    */
    detach: function () ***REMOVED***
        return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
    ***REMOVED***,

    /**
    * @method Phaser.SignalBinding#isBound
    * @return ***REMOVED***boolean***REMOVED*** True if binding is still bound to the signal and has a listener.
    */
    isBound: function () ***REMOVED***
        return (!!this._signal && !!this._listener);
    ***REMOVED***,

    /**
    * @method Phaser.SignalBinding#isOnce
    * @return ***REMOVED***boolean***REMOVED*** If SignalBinding will only be executed once.
    */
    isOnce: function () ***REMOVED***
        return this._isOnce;
    ***REMOVED***,

    /**
    * @method Phaser.SignalBinding#getListener
    * @return ***REMOVED***function***REMOVED*** Handler function bound to the signal.
    */
    getListener: function () ***REMOVED***
        return this._listener;
    ***REMOVED***,

    /**
    * @method Phaser.SignalBinding#getSignal
    * @return ***REMOVED***Phaser.Signal***REMOVED*** Signal that listener is currently bound to.
    */
    getSignal: function () ***REMOVED***
        return this._signal;
    ***REMOVED***,

    /**
    * Delete instance properties
    * @method Phaser.SignalBinding#_destroy
    * @private
    */
    _destroy: function () ***REMOVED***
        delete this._signal;
        delete this._listener;
        delete this.context;
    ***REMOVED***,

    /**
    * @method Phaser.SignalBinding#toString
    * @return ***REMOVED***string***REMOVED*** String representation of the object.
    */
    toString: function () ***REMOVED***
        return '[Phaser.SignalBinding isOnce:' + this._isOnce +', isBound:'+ this.isBound() +', active:' + this.active + ']';
    ***REMOVED***

***REMOVED***;

Phaser.SignalBinding.prototype.constructor = Phaser.SignalBinding;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* This is a base Filter class to use for any Phaser filter development.
*
* The vast majority of filters (including all of those that ship with Phaser) use fragment shaders, and
* therefore only work in WebGL and are not supported by Canvas at all.
*
* @class Phaser.Filter
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***object***REMOVED*** uniforms - Uniform mappings object
* @param ***REMOVED***Array|string***REMOVED*** fragmentSrc - The fragment shader code. Either an array, one element per line of code, or a string.
*/
Phaser.Filter = function (game, uniforms, fragmentSrc) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object, either Phaser.WEBGL_FILTER or Phaser.CANVAS_FILTER.
    * @default
    */
    this.type = Phaser.WEBGL_FILTER;

    /**
    * An array of passes - some filters contain a few steps this array simply stores the steps in a linear fashion.
    * For example the blur filter has two passes blurX and blurY.
    * @property ***REMOVED***array***REMOVED*** passes - An array of filter objects.
    * @private
    */
    this.passes = [this];

    /**
    * @property ***REMOVED***array***REMOVED*** shaders - Array an array of shaders.
    * @private
    */
    this.shaders = [];

    /**
    * @property ***REMOVED***boolean***REMOVED*** dirty - Internal PIXI var.
    * @default
    */
    this.dirty = true;

    /**
    * @property ***REMOVED***number***REMOVED*** padding - Internal PIXI var.
    * @default
    */
    this.padding = 0;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** prevPoint - The previous position of the pointer (we don't update the uniform if the same)
    */
    this.prevPoint = new Phaser.Point();

    /*
    * The supported types are: 1f, 1fv, 1i, 2f, 2fv, 2i, 2iv, 3f, 3fv, 3i, 3iv, 4f, 4fv, 4i, 4iv, mat2, mat3, mat4 and sampler2D.
    */

    var d = new Date();

    /**
    * @property ***REMOVED***object***REMOVED*** uniforms - Default uniform mappings. Compatible with ShaderToy and GLSLSandbox.
    */
    this.uniforms = ***REMOVED***

        resolution: ***REMOVED*** type: '2f', value: ***REMOVED*** x: 256, y: 256 ***REMOVED******REMOVED***,
        time: ***REMOVED*** type: '1f', value: 0 ***REMOVED***,
        mouse: ***REMOVED*** type: '2f', value: ***REMOVED*** x: 0.0, y: 0.0 ***REMOVED*** ***REMOVED***,
        date: ***REMOVED*** type: '4fv', value: [ d.getFullYear(),  d.getMonth(),  d.getDate(), d.getHours() *60 * 60 + d.getMinutes() * 60 + d.getSeconds() ] ***REMOVED***,
        sampleRate: ***REMOVED*** type: '1f', value: 44100.0 ***REMOVED***,
        iChannel0: ***REMOVED*** type: 'sampler2D', value: null, textureData: ***REMOVED*** repeat: true ***REMOVED*** ***REMOVED***,
        iChannel1: ***REMOVED*** type: 'sampler2D', value: null, textureData: ***REMOVED*** repeat: true ***REMOVED*** ***REMOVED***,
        iChannel2: ***REMOVED*** type: 'sampler2D', value: null, textureData: ***REMOVED*** repeat: true ***REMOVED*** ***REMOVED***,
        iChannel3: ***REMOVED*** type: 'sampler2D', value: null, textureData: ***REMOVED*** repeat: true ***REMOVED*** ***REMOVED***

    ***REMOVED***;

    //  Copy over/replace any passed in the constructor
    if (uniforms)
    ***REMOVED***
        for (var key in uniforms)
        ***REMOVED***
            this.uniforms[key] = uniforms[key];
        ***REMOVED***
    ***REMOVED***

    /**
    * @property ***REMOVED***array|string***REMOVED*** fragmentSrc - The fragment shader code.
    */
    this.fragmentSrc = fragmentSrc || '';

***REMOVED***;

Phaser.Filter.prototype = ***REMOVED***

    /**
    * Should be over-ridden.
    * @method Phaser.Filter#init
    */
    init: function () ***REMOVED***
        //  This should be over-ridden. Will receive a variable number of arguments.
    ***REMOVED***,

    /**
    * Set the resolution uniforms on the filter.
    * @method Phaser.Filter#setResolution
    * @param ***REMOVED***number***REMOVED*** width - The width of the display.
    * @param ***REMOVED***number***REMOVED*** height - The height of the display.
    */
    setResolution: function (width, height) ***REMOVED***

        this.uniforms.resolution.value.x = width;
        this.uniforms.resolution.value.y = height;

    ***REMOVED***,

    /**
    * Updates the filter.
    * @method Phaser.Filter#update
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** [pointer] - A Pointer object to use for the filter. The coordinates are mapped to the mouse uniform.
    */
    update: function (pointer) ***REMOVED***

        if (typeof pointer !== 'undefined')
        ***REMOVED***
            var x = pointer.x / this.game.width;
            var y = 1 - pointer.y / this.game.height;

            if (x !== this.prevPoint.x || y !== this.prevPoint.y)
            ***REMOVED***
                this.uniforms.mouse.value.x = x.toFixed(2);
                this.uniforms.mouse.value.y = y.toFixed(2);
                this.prevPoint.set(x, y);
            ***REMOVED***
        ***REMOVED***

        this.uniforms.time.value = this.game.time.totalElapsedSeconds();

    ***REMOVED***,

    /**
    * Creates a new Phaser.Image object using a blank texture and assigns 
    * this Filter to it. The image is then added to the world.
    *
    * If you don't provide width and height values then Filter.width and Filter.height are used.
    *
    * If you do provide width and height values then this filter will be resized to match those
    * values.
    *
    * @method Phaser.Filter#addToWorld
    * @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate to place the Image at.
    * @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate to place the Image at.
    * @param ***REMOVED***number***REMOVED*** [width] - The width of the Image. If not specified (or null) it will use Filter.width. If specified Filter.width will be set to this value.
    * @param ***REMOVED***number***REMOVED*** [height] - The height of the Image. If not specified (or null) it will use Filter.height. If specified Filter.height will be set to this value.
    * @param ***REMOVED***number***REMOVED*** [anchorX=0] - Set the x anchor point of the Image. A value between 0 and 1, where 0 is the top-left and 1 is bottom-right.
    * @param ***REMOVED***number***REMOVED*** [anchorY=0] - Set the y anchor point of the Image. A value between 0 and 1, where 0 is the top-left and 1 is bottom-right.
    * @return ***REMOVED***Phaser.Image***REMOVED*** The newly added Image object.
    */
    addToWorld: function (x, y, width, height, anchorX, anchorY) ***REMOVED***

        if (anchorX === undefined) ***REMOVED*** anchorX = 0; ***REMOVED***
        if (anchorY === undefined) ***REMOVED*** anchorY = 0; ***REMOVED***

        if (width !== undefined && width !== null)
        ***REMOVED***
            this.width = width;
        ***REMOVED***
        else
        ***REMOVED***
            width = this.width;
        ***REMOVED***

        if (height !== undefined && height !== null)
        ***REMOVED***
            this.height = height;
        ***REMOVED***
        else
        ***REMOVED***
            height = this.height;
        ***REMOVED***

        var image = this.game.add.image(x, y, '__default');

        image.width = width;
        image.height = height;

        image.anchor.set(anchorX, anchorY);

        image.filters = [ this ];

        return image;

    ***REMOVED***,

    /**
    * Clear down this Filter and null out references
    * @method Phaser.Filter#destroy
    */
    destroy: function () ***REMOVED***

        this.game = null;

    ***REMOVED***

***REMOVED***;

Phaser.Filter.prototype.constructor = Phaser.Filter;

/**
* @name Phaser.Filter#width
* @property ***REMOVED***number***REMOVED*** width - The width (resolution uniform)
*/
Object.defineProperty(Phaser.Filter.prototype, 'width', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.resolution.value.x;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.resolution.value.x = value;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Filter#height
* @property ***REMOVED***number***REMOVED*** height - The height (resolution uniform)
*/
Object.defineProperty(Phaser.Filter.prototype, 'height', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.resolution.value.y;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.resolution.value.y = value;
    ***REMOVED***

***REMOVED***);

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* This is a base Plugin template to use for any Phaser plugin development.
*
* @class Phaser.Plugin
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***any***REMOVED*** parent - The object that owns this plugin, usually Phaser.PluginManager.
*/
Phaser.Plugin = function (game, parent) ***REMOVED***

    if (parent === undefined) ***REMOVED*** parent = null; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***any***REMOVED*** parent - The parent of this plugin. If added to the PluginManager the parent will be set to that, otherwise it will be null.
    */
    this.parent = parent;

    /**
    * @property ***REMOVED***boolean***REMOVED*** active - A Plugin with active=true has its preUpdate and update methods called by the parent, otherwise they are skipped.
    * @default
    */
    this.active = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** visible - A Plugin with visible=true has its render and postRender methods called by the parent, otherwise they are skipped.
    * @default
    */
    this.visible = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** hasPreUpdate - A flag to indicate if this plugin has a preUpdate method.
    * @default
    */
    this.hasPreUpdate = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** hasUpdate - A flag to indicate if this plugin has an update method.
    * @default
    */
    this.hasUpdate = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** hasPostUpdate - A flag to indicate if this plugin has a postUpdate method.
    * @default
    */
    this.hasPostUpdate = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** hasRender - A flag to indicate if this plugin has a render method.
    * @default
    */
    this.hasRender = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** hasPostRender - A flag to indicate if this plugin has a postRender method.
    * @default
    */
    this.hasPostRender = false;

***REMOVED***;

Phaser.Plugin.prototype = ***REMOVED***

    /**
    * Pre-update is called at the very start of the update cycle, before any other subsystems have been updated (including Physics).
    * It is only called if active is set to true.
    * @method Phaser.Plugin#preUpdate
    */
    preUpdate: function () ***REMOVED***
    ***REMOVED***,

    /**
    * Update is called after all the core subsystems (Input, Tweens, Sound, etc) and the State have updated, but before the render.
    * It is only called if active is set to true.
    * @method Phaser.Plugin#update
    */
    update: function () ***REMOVED***
    ***REMOVED***,

    /**
    * Render is called right after the Game Renderer completes, but before the State.render.
    * It is only called if visible is set to true.
    * @method Phaser.Plugin#render
    */
    render: function () ***REMOVED***
    ***REMOVED***,

    /**
    * Post-render is called after the Game Renderer and State.render have run.
    * It is only called if visible is set to true.
    * @method Phaser.Plugin#postRender
    */
    postRender: function () ***REMOVED***
    ***REMOVED***,

    /**
    * Clear down this Plugin and null out references
    * @method Phaser.Plugin#destroy
    */
    destroy: function () ***REMOVED***

        this.game = null;
        this.parent = null;
        this.active = false;
        this.visible = false;

    ***REMOVED***

***REMOVED***;

Phaser.Plugin.prototype.constructor = Phaser.Plugin;

/* jshint newcap: false */

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Plugin Manager is responsible for the loading, running and unloading of Phaser Plugins.
*
* @class Phaser.PluginManager
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
*/
Phaser.PluginManager = function(game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***Phaser.Plugin[]***REMOVED*** plugins - An array of all the plugins being managed by this PluginManager.
    */
    this.plugins = [];

    /**
    * @property ***REMOVED***number***REMOVED*** _len - Internal cache var.
    * @private
    */
    this._len = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _i - Internal cache var.
    * @private
    */
    this._i = 0;

***REMOVED***;

Phaser.PluginManager.prototype = ***REMOVED***

    /**
    * Add a new Plugin into the PluginManager.
    * The Plugin must have 2 properties: game and parent. Plugin.game is set to the game reference the PluginManager uses, and parent is set to the PluginManager.
    *
    * @method Phaser.PluginManager#add
    * @param ***REMOVED***object|Phaser.Plugin***REMOVED*** plugin - The Plugin to add into the PluginManager. This can be a function or an existing object.
    * @param ***REMOVED***...****REMOVED*** parameter - Additional arguments that will be passed to the Plugin.init method.
    * @return ***REMOVED***Phaser.Plugin***REMOVED*** The Plugin that was added to the manager.
    */
    add: function (plugin) ***REMOVED***

        var args = Array.prototype.slice.call(arguments, 1);
        var result = false;

        //  Prototype?
        if (typeof plugin === 'function')
        ***REMOVED***
            plugin = new plugin(this.game, this);
        ***REMOVED***
        else
        ***REMOVED***
            plugin.game = this.game;
            plugin.parent = this;
        ***REMOVED***

        //  Check for methods now to avoid having to do this every loop
        if (typeof plugin['preUpdate'] === 'function')
        ***REMOVED***
            plugin.hasPreUpdate = true;
            result = true;
        ***REMOVED***

        if (typeof plugin['update'] === 'function')
        ***REMOVED***
            plugin.hasUpdate = true;
            result = true;
        ***REMOVED***

        if (typeof plugin['postUpdate'] === 'function')
        ***REMOVED***
            plugin.hasPostUpdate = true;
            result = true;
        ***REMOVED***

        if (typeof plugin['render'] === 'function')
        ***REMOVED***
            plugin.hasRender = true;
            result = true;
        ***REMOVED***

        if (typeof plugin['postRender'] === 'function')
        ***REMOVED***
            plugin.hasPostRender = true;
            result = true;
        ***REMOVED***

        //  The plugin must have at least one of the above functions to be added to the PluginManager.
        if (result)
        ***REMOVED***
            if (plugin.hasPreUpdate || plugin.hasUpdate || plugin.hasPostUpdate)
            ***REMOVED***
                plugin.active = true;
            ***REMOVED***

            if (plugin.hasRender || plugin.hasPostRender)
            ***REMOVED***
                plugin.visible = true;
            ***REMOVED***

            this._len = this.plugins.push(plugin);

            // Allows plugins to run potentially destructive code outside of the constructor, and only if being added to the PluginManager
            if (typeof plugin['init'] === 'function')
            ***REMOVED***
                plugin.init.apply(plugin, args);
            ***REMOVED***

            return plugin;
        ***REMOVED***
        else
        ***REMOVED***
            return null;
        ***REMOVED***
    ***REMOVED***,

    /**
    * Remove a Plugin from the PluginManager. It calls Plugin.destroy on the plugin before removing it from the manager.
    *
    * @method Phaser.PluginManager#remove
    * @param ***REMOVED***Phaser.Plugin***REMOVED*** plugin - The plugin to be removed.
    * @param ***REMOVED***boolean***REMOVED*** [destroy=true] - Call destroy on the plugin that is removed?
    */
    remove: function (plugin, destroy) ***REMOVED***

        if (destroy === undefined) ***REMOVED*** destroy = true; ***REMOVED***

        this._i = this._len;

        while (this._i--)
        ***REMOVED***
            if (this.plugins[this._i] === plugin)
            ***REMOVED***
                if (destroy)
                ***REMOVED***
                    plugin.destroy();
                ***REMOVED***

                this.plugins.splice(this._i, 1);
                this._len--;
                return;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Remove all Plugins from the PluginManager. It calls Plugin.destroy on every plugin before removing it from the manager.
    *
    * @method Phaser.PluginManager#removeAll
    */
    removeAll: function() ***REMOVED***

        this._i = this._len;

        while (this._i--)
        ***REMOVED***
            this.plugins[this._i].destroy();
        ***REMOVED***

        this.plugins.length = 0;
        this._len = 0;

    ***REMOVED***,

    /**
    * Pre-update is called at the very start of the update cycle, before any other subsystems have been updated (including Physics).
    * It only calls plugins who have active=true.
    *
    * @method Phaser.PluginManager#preUpdate
    */
    preUpdate: function () ***REMOVED***

        this._i = this._len;

        while (this._i--)
        ***REMOVED***
            if (this.plugins[this._i].active && this.plugins[this._i].hasPreUpdate)
            ***REMOVED***
                this.plugins[this._i].preUpdate();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Update is called after all the core subsystems (Input, Tweens, Sound, etc) and the State have updated, but before the render.
    * It only calls plugins who have active=true.
    *
    * @method Phaser.PluginManager#update
    */
    update: function () ***REMOVED***

        this._i = this._len;

        while (this._i--)
        ***REMOVED***
            if (this.plugins[this._i].active && this.plugins[this._i].hasUpdate)
            ***REMOVED***
                this.plugins[this._i].update();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * PostUpdate is the last thing to be called before the world render.
    * In particular, it is called after the world postUpdate, which means the camera has been adjusted.
    * It only calls plugins who have active=true.
    *
    * @method Phaser.PluginManager#postUpdate
    */
    postUpdate: function () ***REMOVED***

        this._i = this._len;

        while (this._i--)
        ***REMOVED***
            if (this.plugins[this._i].active && this.plugins[this._i].hasPostUpdate)
            ***REMOVED***
                this.plugins[this._i].postUpdate();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Render is called right after the Game Renderer completes, but before the State.render.
    * It only calls plugins who have visible=true.
    *
    * @method Phaser.PluginManager#render
    */
    render: function () ***REMOVED***

        this._i = this._len;

        while (this._i--)
        ***REMOVED***
            if (this.plugins[this._i].visible && this.plugins[this._i].hasRender)
            ***REMOVED***
                this.plugins[this._i].render();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Post-render is called after the Game Renderer and State.render have run.
    * It only calls plugins who have visible=true.
    *
    * @method Phaser.PluginManager#postRender
    */
    postRender: function () ***REMOVED***

        this._i = this._len;

        while (this._i--)
        ***REMOVED***
            if (this.plugins[this._i].visible && this.plugins[this._i].hasPostRender)
            ***REMOVED***
                this.plugins[this._i].postRender();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Clear down this PluginManager, calls destroy on every plugin and nulls out references.
    *
    * @method Phaser.PluginManager#destroy
    */
    destroy: function () ***REMOVED***

        this.removeAll();

        this.game = null;

    ***REMOVED***

***REMOVED***;

Phaser.PluginManager.prototype.constructor = Phaser.PluginManager;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Stage controls root level display objects upon which everything is displayed.
* It also handles browser visibility handling and the pausing due to loss of focus.
*
* @class Phaser.Stage
* @extends PIXI.DisplayObjectContainer
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Game reference to the currently running game.
 */
Phaser.Stage = function (game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running Game.
    */
    this.game = game;

    PIXI.DisplayObjectContainer.call(this);

    /**
    * @property ***REMOVED***string***REMOVED*** name - The name of this object.
    * @default
    */
    this.name = '_stage_root';

    /**
    * By default if the browser tab loses focus the game will pause.
    * You can stop that behavior by setting this property to true.
    * Note that the browser can still elect to pause your game if it wishes to do so,
    * for example swapping to another browser tab. This will cause the RAF callback to halt,
    * effectively pausing your game, even though no in-game pause event is triggered if you enable this property.
    * @property ***REMOVED***boolean***REMOVED*** disableVisibilityChange
    * @default
    */
    this.disableVisibilityChange = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** exists - If exists is true the Stage and all children are updated, otherwise it is skipped.
    * @default
    */
    this.exists = true;

    /**
    * @property ***REMOVED***PIXI.Matrix***REMOVED*** worldTransform - Current transform of the object based on world (parent) factors
    * @private
    * @readOnly
    */
    this.worldTransform = new PIXI.Matrix();

    /**
    * @property ***REMOVED***Phaser.Stage***REMOVED*** stage - The stage reference (the Stage is its own stage)
    * @private
    * @readOnly
    */
    this.stage = this;

    /**
    * @property ***REMOVED***number***REMOVED*** currentRenderOrderID - Reset each frame, keeps a count of the total number of objects updated.
    */
    this.currentRenderOrderID = 0;

    /**
    * @property ***REMOVED***string***REMOVED*** hiddenVar - The page visibility API event name.
    * @private
    */
    this._hiddenVar = 'hidden';

    /**
    * @property ***REMOVED***function***REMOVED*** _onChange - The blur/focus event handler.
    * @private
    */
    this._onChange = null;

    /**
    * @property ***REMOVED***number***REMOVED*** _bgColor - Stage background color object. Populated by setBackgroundColor.
    * @private
    */
    this._bgColor = ***REMOVED*** r: 0, g: 0, b: 0, a: 0, color: 0, rgba: '#000000' ***REMOVED***;

    if (!this.game.transparent)
    ***REMOVED***
        //  transparent = 0,0,0,0 - otherwise r,g,b,1
        this._bgColor.a = 1;
    ***REMOVED***

    if (game.config)
    ***REMOVED***
        this.parseConfig(game.config);
    ***REMOVED***

***REMOVED***;

Phaser.Stage.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
Phaser.Stage.prototype.constructor = Phaser.Stage;

/**
* Parses a Game configuration object.
*
* @method Phaser.Stage#parseConfig
* @protected
* @param ***REMOVED***object***REMOVED*** config -The configuration object to parse.
*/
Phaser.Stage.prototype.parseConfig = function (config) ***REMOVED***

    if (config['disableVisibilityChange'])
    ***REMOVED***
        this.disableVisibilityChange = config['disableVisibilityChange'];
    ***REMOVED***

    if (config['backgroundColor'])
    ***REMOVED***
        this.setBackgroundColor(config['backgroundColor']);
    ***REMOVED***

***REMOVED***;

/**
* Initialises the stage and adds the event listeners.
* @method Phaser.Stage#boot
* @private
*/
Phaser.Stage.prototype.boot = function () ***REMOVED***

    Phaser.DOM.getOffset(this.game.canvas, this.offset);

    Phaser.Canvas.setUserSelect(this.game.canvas, 'none');
    Phaser.Canvas.setTouchAction(this.game.canvas, 'none');

    this.checkVisibility();

***REMOVED***;

/**
* This is called automatically after the plugins preUpdate and before the State.update.
* Most objects have preUpdate methods and it's where initial movement and positioning is done.
*
* @method Phaser.Stage#preUpdate
*/
Phaser.Stage.prototype.preUpdate = function () ***REMOVED***

    this.currentRenderOrderID = 0;

    //  This can't loop in reverse, we need the renderOrderID to be in sequence
    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        this.children[i].preUpdate();
    ***REMOVED***

***REMOVED***;

/**
* This is called automatically after the State.update, but before particles or plugins update.
*
* @method Phaser.Stage#update
*/
Phaser.Stage.prototype.update = function () ***REMOVED***

    //  Goes in reverse, because it's highly likely the child will destroy itself in `update`
    var i = this.children.length;

    while (i--)
    ***REMOVED***
        this.children[i].update();
    ***REMOVED***

***REMOVED***;

/**
* This is called automatically before the renderer runs and after the plugins have updated.
* In postUpdate this is where all the final physics calculations and object positioning happens.
* The objects are processed in the order of the display list.
*
* @method Phaser.Stage#postUpdate
*/
Phaser.Stage.prototype.postUpdate = function () ***REMOVED***

    //  Apply the camera shake, fade, bounds, etc
    this.game.camera.update();

    //  Camera target first?
    if (this.game.camera.target)
    ***REMOVED***
        this.game.camera.target.postUpdate();

        this.updateTransform();

        this.game.camera.updateTarget();
    ***REMOVED***

    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        this.children[i].postUpdate();
    ***REMOVED***

    this.updateTransform();

***REMOVED***;

/**
* Updates the transforms for all objects on the display list.
* This overrides the Pixi default as we don't need the interactionManager, but do need the game property check.
* 
* @method Phaser.Stage#updateTransform
*/
Phaser.Stage.prototype.updateTransform = function () ***REMOVED***

    this.worldAlpha = 1;

    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        this.children[i].updateTransform();
    ***REMOVED***

***REMOVED***;

/**
* Starts a page visibility event listener running, or window.onpagehide/onpageshow if not supported by the browser.
* Also listens for window.onblur and window.onfocus.
* 
* @method Phaser.Stage#checkVisibility
*/
Phaser.Stage.prototype.checkVisibility = function () ***REMOVED***

    if (document.hidden !== undefined)
    ***REMOVED***
        this._hiddenVar = 'visibilitychange';
    ***REMOVED***
    else if (document.webkitHidden !== undefined)
    ***REMOVED***
        this._hiddenVar = 'webkitvisibilitychange';
    ***REMOVED***
    else if (document.mozHidden !== undefined)
    ***REMOVED***
        this._hiddenVar = 'mozvisibilitychange';
    ***REMOVED***
    else if (document.msHidden !== undefined)
    ***REMOVED***
        this._hiddenVar = 'msvisibilitychange';
    ***REMOVED***
    else
    ***REMOVED***
        this._hiddenVar = null;
    ***REMOVED***

    var _this = this;

    this._onChange = function (event) ***REMOVED***
        return _this.visibilityChange(event);
    ***REMOVED***;

    //  Does browser support it? If not (like in IE9 or old Android) we need to fall back to blur/focus
    if (this._hiddenVar)
    ***REMOVED***
        document.addEventListener(this._hiddenVar, this._onChange, false);
    ***REMOVED***

    window.onblur = this._onChange;
    window.onfocus = this._onChange;

    window.onpagehide = this._onChange;
    window.onpageshow = this._onChange;
    
    if (this.game.device.cocoonJSApp)
    ***REMOVED***
        CocoonJS.App.onSuspended.addEventListener(function () ***REMOVED***
            Phaser.Stage.prototype.visibilityChange.call(_this, ***REMOVED*** type: "pause" ***REMOVED***);
        ***REMOVED***);

        CocoonJS.App.onActivated.addEventListener(function () ***REMOVED***
            Phaser.Stage.prototype.visibilityChange.call(_this, ***REMOVED*** type: "resume" ***REMOVED***);
        ***REMOVED***);
    ***REMOVED***

***REMOVED***;

/**
* This method is called when the document visibility is changed.
* 
* @method Phaser.Stage#visibilityChange
* @param ***REMOVED***Event***REMOVED*** event - Its type will be used to decide whether the game should be paused or not.
*/
Phaser.Stage.prototype.visibilityChange = function (event) ***REMOVED***

    if (event.type === 'pagehide' || event.type === 'blur' || event.type === 'pageshow' || event.type === 'focus')
    ***REMOVED***
        if (event.type === 'pagehide' || event.type === 'blur')
        ***REMOVED***
            this.game.focusLoss(event);
        ***REMOVED***
        else if (event.type === 'pageshow' || event.type === 'focus')
        ***REMOVED***
            this.game.focusGain(event);
        ***REMOVED***

        return;
    ***REMOVED***

    if (this.disableVisibilityChange)
    ***REMOVED***
        return;
    ***REMOVED***

    if (document.hidden || document.mozHidden || document.msHidden || document.webkitHidden || event.type === "pause")
    ***REMOVED***
        this.game.gamePaused(event);
    ***REMOVED***
    else
    ***REMOVED***
        this.game.gameResumed(event);
    ***REMOVED***

***REMOVED***;

/**
* Sets the background color for the Stage.
*
* The color can be given as a hex string (`'#RRGGBB'`), a CSS color string (`'rgb(r,g,b)'`), or a numeric value (`0xRRGGBB`).
*
* An alpha channel is _not_ supported and will be ignored.
*
* If you've set your game to be transparent then calls to setBackgroundColor are ignored.
*
* @method Phaser.Stage#setBackgroundColor
* @param ***REMOVED***number|string***REMOVED*** color - The color of the background.
*/
Phaser.Stage.prototype.setBackgroundColor = function (color) ***REMOVED***

    if (this.game.transparent) ***REMOVED*** return; ***REMOVED***

    Phaser.Color.valueToColor(color, this._bgColor);
    Phaser.Color.updateColor(this._bgColor);

    //  For gl.clearColor (canvas uses _bgColor.rgba)
    this._bgColor.r /= 255;
    this._bgColor.g /= 255;
    this._bgColor.b /= 255;
    this._bgColor.a = 1;

***REMOVED***;

/**
* Destroys the Stage and removes event listeners.
*
* @method Phaser.Stage#destroy
*/
Phaser.Stage.prototype.destroy = function () ***REMOVED***

    if (this._hiddenVar)
    ***REMOVED***
        document.removeEventListener(this._hiddenVar, this._onChange, false);
    ***REMOVED***

    window.onpagehide = null;
    window.onpageshow = null;

    window.onblur = null;
    window.onfocus = null;

***REMOVED***;

/**
* @name Phaser.Stage#backgroundColor
* @property ***REMOVED***number|string***REMOVED*** backgroundColor - Gets and sets the background color of the stage. The color can be given as a number: 0xff0000 or a hex string: '#ff0000'
*/
Object.defineProperty(Phaser.Stage.prototype, "backgroundColor", ***REMOVED***

    get: function () ***REMOVED***

        return this._bgColor.color;

    ***REMOVED***,

    set: function (color) ***REMOVED***

        this.setBackgroundColor(color);

    ***REMOVED***

***REMOVED***);

/**
* Enable or disable texture smoothing for all objects on this Stage. Only works for bitmap/image textures. Smoothing is enabled by default.
*
* @name Phaser.Stage#smoothed
* @property ***REMOVED***boolean***REMOVED*** smoothed - Set to true to smooth all sprites rendered on this Stage, or false to disable smoothing (great for pixel art)
*/
Object.defineProperty(Phaser.Stage.prototype, "smoothed", ***REMOVED***

    get: function () ***REMOVED***

        return PIXI.scaleModes.DEFAULT === PIXI.scaleModes.LINEAR;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value)
        ***REMOVED***
            PIXI.scaleModes.DEFAULT = PIXI.scaleModes.LINEAR;
        ***REMOVED***
        else
        ***REMOVED***
            PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;
        ***REMOVED***
    ***REMOVED***

***REMOVED***);

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A Group is a container for ***REMOVED***@link DisplayObject display objects***REMOVED*** including ***REMOVED***@link Phaser.Sprite Sprites***REMOVED*** and ***REMOVED***@link Phaser.Image Images***REMOVED***.
*
* Groups form the logical tree structure of the display/scene graph where local transformations are applied to children.
* For instance, all children are also moved/rotated/scaled when the group is moved/rotated/scaled.
*
* In addition, Groups provides support for fast pooling and object recycling.
*
* Groups are also display objects and can be nested as children within other Groups.
*
* @class Phaser.Group
* @extends PIXI.DisplayObjectContainer
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***DisplayObject|null***REMOVED*** [parent=(game world)] - The parent Group (or other ***REMOVED***@link DisplayObject***REMOVED***) that this group will be added to.
*     If undefined/unspecified the Group will be added to the ***REMOVED***@link Phaser.Game#world Game World***REMOVED***; if null the Group will not be added to any parent.
* @param ***REMOVED***string***REMOVED*** [name='group'] - A name for this group. Not used internally but useful for debugging.
* @param ***REMOVED***boolean***REMOVED*** [addToStage=false] - If true this group will be added directly to the Game.Stage instead of Game.World.
* @param ***REMOVED***boolean***REMOVED*** [enableBody=false] - If true all Sprites created with ***REMOVED***@link #create***REMOVED*** or ***REMOVED***@link #createMulitple***REMOVED*** will have a physics body created on them. Change the body type with ***REMOVED***@link #physicsBodyType***REMOVED***.
* @param ***REMOVED***integer***REMOVED*** [physicsBodyType=0] - The physics body type to use when physics bodies are automatically added. See ***REMOVED***@link #physicsBodyType***REMOVED*** for values.
*/
Phaser.Group = function (game, parent, name, addToStage, enableBody, physicsBodyType) ***REMOVED***

    if (addToStage === undefined) ***REMOVED*** addToStage = false; ***REMOVED***
    if (enableBody === undefined) ***REMOVED*** enableBody = false; ***REMOVED***
    if (physicsBodyType === undefined) ***REMOVED*** physicsBodyType = Phaser.Physics.ARCADE; ***REMOVED***

    /**
    * A reference to the currently running Game.
    * @property ***REMOVED***Phaser.Game***REMOVED*** game
    * @protected
    */
    this.game = game;

    if (parent === undefined)
    ***REMOVED***
        parent = game.world;
    ***REMOVED***

    /**
    * A name for this group. Not used internally but useful for debugging.
    * @property ***REMOVED***string***REMOVED*** name
    */
    this.name = name || 'group';

    /**
    * The z-depth value of this object within its parent container/Group - the World is a Group as well.
    * This value must be unique for each child in a Group.
    * @property ***REMOVED***integer***REMOVED*** z
    * @readOnly
    */
    this.z = 0;

    PIXI.DisplayObjectContainer.call(this);

    if (addToStage)
    ***REMOVED***
        this.game.stage.addChild(this);
        this.z = this.game.stage.children.length;
    ***REMOVED***
    else
    ***REMOVED***
        if (parent)
        ***REMOVED***
            parent.addChild(this);
            this.z = parent.children.length;
        ***REMOVED***
    ***REMOVED***

    /**
    * Internal Phaser Type value.
    * @property ***REMOVED***integer***REMOVED*** type
    * @protected
    */
    this.type = Phaser.GROUP;

    /**
    * @property ***REMOVED***number***REMOVED*** physicsType - The const physics body type of this object.
    * @readonly
    */
    this.physicsType = Phaser.GROUP;

    /**
    * The alive property is useful for Groups that are children of other Groups and need to be included/excluded in checks like forEachAlive.
    * @property ***REMOVED***boolean***REMOVED*** alive
    * @default
    */
    this.alive = true;

    /**
    * If exists is true the group is updated, otherwise it is skipped.
    * @property ***REMOVED***boolean***REMOVED*** exists
    * @default
    */
    this.exists = true;

    /**
    * A group with `ignoreDestroy` set to `true` ignores all calls to its `destroy` method.
    * @property ***REMOVED***boolean***REMOVED*** ignoreDestroy
    * @default
    */
    this.ignoreDestroy = false;

    /**
    * A Group is that has `pendingDestroy` set to `true` is flagged to have its destroy method
    * called on the next logic update.
    * You can set it directly to flag the Group to be destroyed on its next update.
    *
    * This is extremely useful if you wish to destroy a Group from within one of its own callbacks
    * or a callback of one of its children.
    *
    * @property ***REMOVED***boolean***REMOVED*** pendingDestroy
    */
    this.pendingDestroy = false;

    /**
    * The type of objects that will be created when using ***REMOVED***@link #create***REMOVED*** or ***REMOVED***@link #createMultiple***REMOVED***.
    *
    * Any object may be used but it should extend either Sprite or Image and accept the same constructor arguments:
    * when a new object is created it is passed the following parameters to its constructor: `(game, x, y, key, frame)`.
    *
    * @property ***REMOVED***object***REMOVED*** classType
    * @default ***REMOVED***@link Phaser.Sprite***REMOVED***
    */
    this.classType = Phaser.Sprite;

    /**
    * The current display object that the group cursor is pointing to, if any. (Can be set manually.)
    *
    * The cursor is a way to iterate through the children in a Group using ***REMOVED***@link #next***REMOVED*** and ***REMOVED***@link #previous***REMOVED***.
    * @property ***REMOVED***?DisplayObject***REMOVED*** cursor
    */
    this.cursor = null;

    /**
    * A Group with `inputEnableChildren` set to `true` will automatically call `inputEnabled = true` 
    * on any children _added_ to, or _created by_, this Group.
    * 
    * If there are children already in the Group at the time you set this property, they are not changed.
    * 
    * @property ***REMOVED***boolean***REMOVED*** inputEnableChildren
    * @default
    */
    this.inputEnableChildren = false;

    /**
    * This Signal is dispatched whenever a child of this Group emits an onInputDown signal as a result
    * of having been interacted with by a Pointer. You can bind functions to this Signal instead of to
    * every child Sprite.
    * 
    * This Signal is sent 2 arguments: A reference to the Sprite that triggered the signal, and
    * a reference to the Pointer that caused it.
    * 
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onChildInputDown
    */
    this.onChildInputDown = new Phaser.Signal();

    /**
    * This Signal is dispatched whenever a child of this Group emits an onInputUp signal as a result
    * of having been interacted with by a Pointer. You can bind functions to this Signal instead of to
    * every child Sprite.
    * 
    * This Signal is sent 3 arguments: A reference to the Sprite that triggered the signal, 
    * a reference to the Pointer that caused it, and a boolean value `isOver` that tells you if the Pointer
    * is still over the Sprite or not.
    * 
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onChildInputUp
    */
    this.onChildInputUp = new Phaser.Signal();

    /**
    * This Signal is dispatched whenever a child of this Group emits an onInputOver signal as a result
    * of having been interacted with by a Pointer. You can bind functions to this Signal instead of to
    * every child Sprite.
    * 
    * This Signal is sent 2 arguments: A reference to the Sprite that triggered the signal, and
    * a reference to the Pointer that caused it.
    * 
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onChildInputOver
    */
    this.onChildInputOver = new Phaser.Signal();

    /**
    * This Signal is dispatched whenever a child of this Group emits an onInputOut signal as a result
    * of having been interacted with by a Pointer. You can bind functions to this Signal instead of to
    * every child Sprite.
    * 
    * This Signal is sent 2 arguments: A reference to the Sprite that triggered the signal, and
    * a reference to the Pointer that caused it.
    * 
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onChildInputOut
    */
    this.onChildInputOut = new Phaser.Signal();

    /**
    * If true all Sprites created by, or added to this group, will have a physics body enabled on them.
    *
    * If there are children already in the Group at the time you set this property, they are not changed.
    *
    * The default body type is controlled with ***REMOVED***@link #physicsBodyType***REMOVED***.
    * @property ***REMOVED***boolean***REMOVED*** enableBody
    */
    this.enableBody = enableBody;

    /**
    * If true when a physics body is created (via ***REMOVED***@link #enableBody***REMOVED***) it will create a physics debug object as well.
    *
    * This only works for P2 bodies.
    * @property ***REMOVED***boolean***REMOVED*** enableBodyDebug
    * @default
    */
    this.enableBodyDebug = false;

    /**
    * If ***REMOVED***@link #enableBody***REMOVED*** is true this is the type of physics body that is created on new Sprites.
    *
    * The valid values are ***REMOVED***@link Phaser.Physics.ARCADE***REMOVED***, ***REMOVED***@link Phaser.Physics.P2JS***REMOVED***, ***REMOVED***@link Phaser.Physics.NINJA***REMOVED***, etc.
    * @property ***REMOVED***integer***REMOVED*** physicsBodyType
    */
    this.physicsBodyType = physicsBodyType;

    /**
    * If this Group contains Arcade Physics Sprites you can set a custom sort direction via this property.
    *
    * It should be set to one of the Phaser.Physics.Arcade sort direction constants: 
    * 
    * Phaser.Physics.Arcade.SORT_NONE
    * Phaser.Physics.Arcade.LEFT_RIGHT
    * Phaser.Physics.Arcade.RIGHT_LEFT
    * Phaser.Physics.Arcade.TOP_BOTTOM
    * Phaser.Physics.Arcade.BOTTOM_TOP
    *
    * If set to `null` the Group will use whatever Phaser.Physics.Arcade.sortDirection is set to. This is the default behavior.
    * 
    * @property ***REMOVED***integer***REMOVED*** physicsSortDirection
    * @default
    */
    this.physicsSortDirection = null;

    /**
    * This signal is dispatched when the group is destroyed.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onDestroy
    */
    this.onDestroy = new Phaser.Signal();

    /**
    * @property ***REMOVED***integer***REMOVED*** cursorIndex - The current index of the Group cursor. Advance it with Group.next.
    * @readOnly
    */
    this.cursorIndex = 0;

    /**
    * A Group that is fixed to the camera uses its x/y coordinates as offsets from the top left of the camera. These are stored in Group.cameraOffset.
    * 
    * Note that the cameraOffset values are in addition to any parent in the display list.
    * So if this Group was in a Group that has x: 200, then this will be added to the cameraOffset.x
    * 
    * @property ***REMOVED***boolean***REMOVED*** fixedToCamera
    */
    this.fixedToCamera = false;

    /**
    * If this object is ***REMOVED***@link #fixedToCamera***REMOVED*** then this stores the x/y position offset relative to the top-left of the camera view.
    * If the parent of this Group is also `fixedToCamera` then the offset here is in addition to that and should typically be disabled.
    * @property ***REMOVED***Phaser.Point***REMOVED*** cameraOffset
    */
    this.cameraOffset = new Phaser.Point();

    /**
    * The hash array is an array belonging to this Group into which you can add any of its children via Group.addToHash and Group.removeFromHash.
    * 
    * Only children of this Group can be added to and removed from the hash.
    * 
    * This hash is used automatically by Phaser Arcade Physics in order to perform non z-index based destructive sorting.
    * However if you don't use Arcade Physics, or this isn't a physics enabled Group, then you can use the hash to perform your own
    * sorting and filtering of Group children without touching their z-index (and therefore display draw order)
    * 
    * @property ***REMOVED***array***REMOVED*** hash
    */
    this.hash = [];

    /**
    * The property on which children are sorted.
    * @property ***REMOVED***string***REMOVED*** _sortProperty
    * @private
    */
    this._sortProperty = 'z';

***REMOVED***;

Phaser.Group.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
Phaser.Group.prototype.constructor = Phaser.Group;

/**
* A returnType value, as specified in ***REMOVED***@link #iterate***REMOVED*** eg.
* @constant
* @type ***REMOVED***integer***REMOVED***
*/
Phaser.Group.RETURN_NONE = 0;

/**
* A returnType value, as specified in ***REMOVED***@link #iterate***REMOVED*** eg.
* @constant
* @type ***REMOVED***integer***REMOVED***
*/
Phaser.Group.RETURN_TOTAL = 1;

/**
* A returnType value, as specified in ***REMOVED***@link #iterate***REMOVED*** eg.
* @constant
* @type ***REMOVED***integer***REMOVED***
*/
Phaser.Group.RETURN_CHILD = 2;

/**
* A returnType value, as specified in ***REMOVED***@link #iterate***REMOVED*** eg.
* @constant
* @type ***REMOVED***integer***REMOVED***
*/
Phaser.Group.RETURN_ALL = 3;

/**
* A sort ordering value, as specified in ***REMOVED***@link #sort***REMOVED*** eg.
* @constant
* @type ***REMOVED***integer***REMOVED***
*/
Phaser.Group.SORT_ASCENDING = -1;

/**
* A sort ordering value, as specified in ***REMOVED***@link #sort***REMOVED*** eg.
* @constant
* @type ***REMOVED***integer***REMOVED***
*/
Phaser.Group.SORT_DESCENDING = 1;

/**
* Adds an existing object as the top child in this group.
*
* The child is automatically added to the top of the group, and is displayed above every previous child.
*
* Or if the _optional_ index is specified, the child is added at the location specified by the index value, 
* this allows you to control child ordering.
*
* If the child was already in this Group, it is simply returned, and nothing else happens to it.
*
* If `Group.enableBody` is set, then a physics body will be created on the object, so long as one does not already exist.
*
* If `Group.inputEnableChildren` is set, then an Input Handler will be created on the object, so long as one does not already exist.
*
* Use ***REMOVED***@link #addAt***REMOVED*** to control where a child is added. Use ***REMOVED***@link #create***REMOVED*** to create and add a new child.
*
* @method Phaser.Group#add
* @param ***REMOVED***DisplayObject***REMOVED*** child - The display object to add as a child.
* @param ***REMOVED***boolean***REMOVED*** [silent=false] - If true the child will not dispatch the `onAddedToGroup` event.
* @param ***REMOVED***integer***REMOVED*** [index] - The index within the group to insert the child to. Where 0 is the bottom of the Group.
* @return ***REMOVED***DisplayObject***REMOVED*** The child that was added to the group.
*/
Phaser.Group.prototype.add = function (child, silent, index) ***REMOVED***

    if (silent === undefined) ***REMOVED*** silent = false; ***REMOVED***

    if (child.parent === this)
    ***REMOVED***
        return child;
    ***REMOVED***

    if (child.body && child.parent && child.parent.hash)
    ***REMOVED***
        child.parent.removeFromHash(child);
    ***REMOVED***

    if (index === undefined)
    ***REMOVED***
        child.z = this.children.length;

        this.addChild(child);
    ***REMOVED***
    else
    ***REMOVED***
        this.addChildAt(child, index);

        this.updateZ();
    ***REMOVED***

    if (this.enableBody && child.hasOwnProperty('body') && child.body === null)
    ***REMOVED***
        this.game.physics.enable(child, this.physicsBodyType);
    ***REMOVED***
    else if (child.body)
    ***REMOVED***
        this.addToHash(child);
    ***REMOVED***

    if (this.inputEnableChildren && (!child.input || child.inputEnabled))
    ***REMOVED***
        child.inputEnabled = true;
    ***REMOVED***

    if (!silent && child.events)
    ***REMOVED***
        child.events.onAddedToGroup$dispatch(child, this);
    ***REMOVED***

    if (this.cursor === null)
    ***REMOVED***
        this.cursor = child;
    ***REMOVED***

    return child;

***REMOVED***;

/**
* Adds an existing object to this group.
*
* The child is added to the group at the location specified by the index value, this allows you to control child ordering.
* 
* If `Group.enableBody` is set, then a physics body will be created on the object, so long as one does not already exist.
*
* If `Group.inputEnableChildren` is set, then an Input Handler will be created on the object, so long as one does not already exist.
*
* @method Phaser.Group#addAt
* @param ***REMOVED***DisplayObject***REMOVED*** child - The display object to add as a child.
* @param ***REMOVED***integer***REMOVED*** [index=0] - The index within the group to insert the child to.
* @param ***REMOVED***boolean***REMOVED*** [silent=false] - If true the child will not dispatch the `onAddedToGroup` event.
* @return ***REMOVED***DisplayObject***REMOVED*** The child that was added to the group.
*/
Phaser.Group.prototype.addAt = function (child, index, silent) ***REMOVED***

    this.add(child, silent, index);

***REMOVED***;

/**
* Adds a child of this Group into the hash array.
* This call will return false if the child is not a child of this Group, or is already in the hash.
*
* @method Phaser.Group#addToHash
* @param ***REMOVED***DisplayObject***REMOVED*** child - The display object to add to this Groups hash. Must be a member of this Group already and not present in the hash.
* @return ***REMOVED***boolean***REMOVED*** True if the child was successfully added to the hash, otherwise false.
*/
Phaser.Group.prototype.addToHash = function (child) ***REMOVED***

    if (child.parent === this)
    ***REMOVED***
        var index = this.hash.indexOf(child);

        if (index === -1)
        ***REMOVED***
            this.hash.push(child);
            return true;
        ***REMOVED***
    ***REMOVED***

    return false;

***REMOVED***;

/**
* Removes a child of this Group from the hash array.
* This call will return false if the child is not in the hash.
*
* @method Phaser.Group#removeFromHash
* @param ***REMOVED***DisplayObject***REMOVED*** child - The display object to remove from this Groups hash. Must be a member of this Group and in the hash.
* @return ***REMOVED***boolean***REMOVED*** True if the child was successfully removed from the hash, otherwise false.
*/
Phaser.Group.prototype.removeFromHash = function (child) ***REMOVED***

    if (child)
    ***REMOVED***
        var index = this.hash.indexOf(child);

        if (index !== -1)
        ***REMOVED***
            this.hash.splice(index, 1);
            return true;
        ***REMOVED***
    ***REMOVED***

    return false;

***REMOVED***;

/**
* Adds an array of existing Display Objects to this Group.
*
* The Display Objects are automatically added to the top of this Group, and will render on-top of everything already in this Group.
*
* As well as an array you can also pass another Group as the first argument. In this case all of the children from that
* Group will be removed from it and added into this Group.
* 
* If `Group.enableBody` is set, then a physics body will be created on the objects, so long as one does not already exist.
*
* If `Group.inputEnableChildren` is set, then an Input Handler will be created on the objects, so long as one does not already exist.
*
* @method Phaser.Group#addMultiple
* @param ***REMOVED***DisplayObject[]|Phaser.Group***REMOVED*** children - An array of display objects or a Phaser.Group. If a Group is given then *all* children will be moved from it.
* @param ***REMOVED***boolean***REMOVED*** [silent=false] - If true the children will not dispatch the `onAddedToGroup` event.
* @return ***REMOVED***DisplayObject[]|Phaser.Group***REMOVED*** The array of children or Group of children that were added to this Group.
*/
Phaser.Group.prototype.addMultiple = function (children, silent) ***REMOVED***

    if (children instanceof Phaser.Group)
    ***REMOVED***
        children.moveAll(this, silent);
    ***REMOVED***
    else if (Array.isArray(children))
    ***REMOVED***
        for (var i = 0; i < children.length; i++)
        ***REMOVED***
            this.add(children[i], silent);
        ***REMOVED***
    ***REMOVED***

    return children;

***REMOVED***;

/**
* Returns the child found at the given index within this group.
*
* @method Phaser.Group#getAt
* @param ***REMOVED***integer***REMOVED*** index - The index to return the child from.
* @return ***REMOVED***DisplayObject|integer***REMOVED*** The child that was found at the given index, or -1 for an invalid index.
*/
Phaser.Group.prototype.getAt = function (index) ***REMOVED***

    if (index < 0 || index >= this.children.length)
    ***REMOVED***
        return -1;
    ***REMOVED***
    else
    ***REMOVED***
        return this.getChildAt(index);
    ***REMOVED***

***REMOVED***;

/**
* Creates a new Phaser.Sprite object and adds it to the top of this group.
*
* Use ***REMOVED***@link #classType***REMOVED*** to change the type of object created.
* 
* The child is automatically added to the top of the group, and is displayed above every previous child.
*
* Or if the _optional_ index is specified, the child is added at the location specified by the index value, 
* this allows you to control child ordering.
* 
* If `Group.enableBody` is set, then a physics body will be created on the object, so long as one does not already exist.
*
* If `Group.inputEnableChildren` is set, then an Input Handler will be created on the object, so long as one does not already exist.
*
* @method Phaser.Group#create
* @param ***REMOVED***number***REMOVED*** x - The x coordinate to display the newly created Sprite at. The value is in relation to the group.x point.
* @param ***REMOVED***number***REMOVED*** y - The y coordinate to display the newly created Sprite at. The value is in relation to the group.y point.
* @param ***REMOVED***string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture***REMOVED*** [key] - This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache Image entry, or an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
* @param ***REMOVED***string|number***REMOVED*** [frame] - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
* @param ***REMOVED***boolean***REMOVED*** [exists=true] - The default exists state of the Sprite.
* @param ***REMOVED***integer***REMOVED*** [index] - The index within the group to insert the child to. Where 0 is the bottom of the Group.
* @return ***REMOVED***DisplayObject***REMOVED*** The child that was created: will be a ***REMOVED***@link Phaser.Sprite***REMOVED*** unless ***REMOVED***@link #classType***REMOVED*** has been changed.
*/
Phaser.Group.prototype.create = function (x, y, key, frame, exists, index) ***REMOVED***

    if (exists === undefined) ***REMOVED*** exists = true; ***REMOVED***

    var child = new this.classType(this.game, x, y, key, frame);

    child.exists = exists;
    child.visible = exists;
    child.alive = exists;

    return this.add(child, false, index);

***REMOVED***;

/**
* Creates multiple Phaser.Sprite objects and adds them to the top of this Group.
* 
* This method is useful if you need to quickly generate a pool of sprites, such as bullets.
*
* Use ***REMOVED***@link #classType***REMOVED*** to change the type of object created.
*
* You can provide an array as the `key` and / or `frame` arguments. When you do this
* it will create `quantity` Sprites for every key (and frame) in the arrays.
* 
* For example:
* 
* `createMultiple(25, ['ball', 'carrot'])`
*
* In the above code there are 2 keys (ball and carrot) which means that 50 sprites will be
* created in total, 25 of each. You can also have the `frame` as an array:
*
* `createMultiple(5, 'bricks', [0, 1, 2, 3])`
*
* In the above there is one key (bricks), which is a sprite sheet. The frames array tells
* this method to use frames 0, 1, 2 and 3. So in total it will create 20 sprites, because
* the quantity was set to 5, so that is 5 brick sprites of frame 0, 5 brick sprites with
* frame 1, and so on.
*
* If you set both the key and frame arguments to be arrays then understand it will create
* a total quantity of sprites equal to the size of both arrays times each other. I.e.:
*
* `createMultiple(20, ['diamonds', 'balls'], [0, 1, 2])`
*
* The above will create 20 'diamonds' of frame 0, 20 with frame 1 and 20 with frame 2.
* It will then create 20 'balls' of frame 0, 20 with frame 1 and 20 with frame 2.
* In total it will have created 120 sprites.
*
* By default the Sprites will have their `exists` property set to `false`, and they will be 
* positioned at 0x0, relative to the `Group.x / y` values.
* 
* If `Group.enableBody` is set, then a physics body will be created on the objects, so long as one does not already exist.
*
* If `Group.inputEnableChildren` is set, then an Input Handler will be created on the objects, so long as one does not already exist.
*
* @method Phaser.Group#createMultiple
* @param ***REMOVED***integer***REMOVED*** quantity - The number of Sprites to create.
* @param ***REMOVED***string|array***REMOVED*** key - The Cache key of the image that the Sprites will use. Or an Array of keys. See the description for details on how the quantity applies when arrays are used.
* @param ***REMOVED***integer|string|array***REMOVED*** [frame=0] - If the Sprite image contains multiple frames you can specify which one to use here. Or an Array of frames. See the description for details on how the quantity applies when arrays are used.
* @param ***REMOVED***boolean***REMOVED*** [exists=false] - The default exists state of the Sprite.
* @return ***REMOVED***array***REMOVED*** An array containing all of the Sprites that were created.
*/
Phaser.Group.prototype.createMultiple = function (quantity, key, frame, exists) ***REMOVED***

    if (frame === undefined) ***REMOVED*** frame = 0; ***REMOVED***
    if (exists === undefined) ***REMOVED*** exists = false; ***REMOVED***

    if (!Array.isArray(key))
    ***REMOVED***
        key = [ key ];
    ***REMOVED***

    if (!Array.isArray(frame))
    ***REMOVED***
        frame = [ frame ];
    ***REMOVED***

    var _this = this;
    var children = [];

    key.forEach(function(singleKey) ***REMOVED***

        frame.forEach(function(singleFrame) ***REMOVED***

            for (var i = 0; i < quantity; i++)
            ***REMOVED***
                children.push(_this.create(0, 0, singleKey, singleFrame, exists));
            ***REMOVED***

        ***REMOVED***);

    ***REMOVED***);

    return children;

***REMOVED***;

/**
* Internal method that re-applies all of the children's Z values.
*
* This must be called whenever children ordering is altered so that their `z` indices are correctly updated.
*
* @method Phaser.Group#updateZ
* @protected
*/
Phaser.Group.prototype.updateZ = function () ***REMOVED***

    var i = this.children.length;

    while (i--)
    ***REMOVED***
        this.children[i].z = i;
    ***REMOVED***

***REMOVED***;

/**
* This method iterates through all children in the Group (regardless if they are visible or exist)
* and then changes their position so they are arranged in a Grid formation. Children must have
* the `alignTo` method in order to be positioned by this call. All default Phaser Game Objects have
* this.
*
* The grid dimensions are determined by the first four arguments. The `width` and `height` arguments
* relate to the width and height of the grid respectively.
*
* For example if the Group had 100 children in it:
*
* `Group.align(10, 10, 32, 32)`
*
* This will align all of the children into a grid formation of 10x10, using 32 pixels per
* grid cell. If you want a wider grid, you could do:
* 
* `Group.align(25, 4, 32, 32)`
*
* This will align the children into a grid of 25x4, again using 32 pixels per grid cell.
*
* You can choose to set _either_ the `width` or `height` value to -1. Doing so tells the method
* to keep on aligning children until there are no children left. For example if this Group had
* 48 children in it, the following:
*
* `Group.align(-1, 8, 32, 32)`
*
* ... will align the children so that there are 8 children vertically (the second argument), 
* and each row will contain 6 sprites, except the last one, which will contain 5 (totaling 48)
*
* You can also do:
* 
* `Group.align(10, -1, 32, 32)`
*
* In this case it will create a grid 10 wide, and as tall as it needs to be in order to fit
* all of the children in.
*
* The `position` property allows you to control where in each grid cell the child is positioned.
* This is a constant and can be one of `Phaser.TOP_LEFT` (default), `Phaser.TOP_CENTER`, 
* `Phaser.TOP_RIGHT`, `Phaser.LEFT_CENTER`, `Phaser.CENTER`, `Phaser.RIGHT_CENTER`, 
* `Phaser.BOTTOM_LEFT`, `Phaser.BOTTOM_CENTER` or `Phaser.BOTTOM_RIGHT`.
*
* The final argument; `offset` lets you start the alignment from a specific child index.
*
* @method Phaser.Group#align
* @param ***REMOVED***integer***REMOVED*** width - The width of the grid in items (not pixels). Set to -1 for a dynamic width. If -1 then you must set an explicit height value.
* @param ***REMOVED***integer***REMOVED*** height - The height of the grid in items (not pixels). Set to -1 for a dynamic height. If -1 then you must set an explicit width value.
* @param ***REMOVED***integer***REMOVED*** cellWidth - The width of each grid cell, in pixels.
* @param ***REMOVED***integer***REMOVED*** cellHeight - The height of each grid cell, in pixels.
* @param ***REMOVED***integer***REMOVED*** [position] - The position constant. One of `Phaser.TOP_LEFT` (default), `Phaser.TOP_CENTER`, `Phaser.TOP_RIGHT`, `Phaser.LEFT_CENTER`, `Phaser.CENTER`, `Phaser.RIGHT_CENTER`, `Phaser.BOTTOM_LEFT`, `Phaser.BOTTOM_CENTER` or `Phaser.BOTTOM_RIGHT`.
* @param ***REMOVED***integer***REMOVED*** [offset=0] - Optional index to start the alignment from. Defaults to zero, the first child in the Group, but can be set to any valid child index value.
* @return ***REMOVED***boolean***REMOVED*** True if the Group children were aligned, otherwise false.
*/
Phaser.Group.prototype.align = function (width, height, cellWidth, cellHeight, position, offset) ***REMOVED***

    if (position === undefined) ***REMOVED*** position = Phaser.TOP_LEFT; ***REMOVED***
    if (offset === undefined) ***REMOVED*** offset = 0; ***REMOVED***

    if (this.children.length === 0 || offset > this.children.length || (width === -1 && height === -1))
    ***REMOVED***
        return false;
    ***REMOVED***

    var r = new Phaser.Rectangle(0, 0, cellWidth, cellHeight);
    var w = (width * cellWidth);
    var h = (height * cellHeight);

    for (var i = offset; i < this.children.length; i++)
    ***REMOVED***
        var child = this.children[i];

        if (child['alignIn'])
        ***REMOVED***
            child.alignIn(r, position);
        ***REMOVED***
        else
        ***REMOVED***
            continue;
        ***REMOVED***

        if (width === -1)
        ***REMOVED***
            //  We keep laying them out horizontally until we've done them all
            r.y += cellHeight;

            if (r.y === h)
            ***REMOVED***
                r.x += cellWidth;
                r.y = 0;
            ***REMOVED***
        ***REMOVED***
        else if (height === -1)
        ***REMOVED***
            //  We keep laying them out vertically until we've done them all
            r.x += cellWidth;

            if (r.x === w)
            ***REMOVED***
                r.x = 0;
                r.y += cellHeight;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  We keep laying them out until we hit the column limit
            r.x += cellWidth;

            if (r.x === w)
            ***REMOVED***
                r.x = 0;
                r.y += cellHeight;

                if (r.y === h)
                ***REMOVED***
                    //  We've hit the column limit, so return, even if there are children left
                    return true;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    return true;

***REMOVED***;

/**
* Sets the group cursor to the first child in the group.
*
* If the optional index parameter is given it sets the cursor to the object at that index instead.
*
* @method Phaser.Group#resetCursor
* @param ***REMOVED***integer***REMOVED*** [index=0] - Set the cursor to point to a specific index.
* @return ***REMOVED***any***REMOVED*** The child the cursor now points to.
*/
Phaser.Group.prototype.resetCursor = function (index) ***REMOVED***

    if (index === undefined) ***REMOVED*** index = 0; ***REMOVED***

    if (index > this.children.length - 1)
    ***REMOVED***
        index = 0;
    ***REMOVED***

    if (this.cursor)
    ***REMOVED***
        this.cursorIndex = index;
        this.cursor = this.children[this.cursorIndex];
        return this.cursor;
    ***REMOVED***

***REMOVED***;

/**
* Advances the group cursor to the next (higher) object in the group.
*
* If the cursor is at the end of the group (top child) it is moved the start of the group (bottom child).
*
* @method Phaser.Group#next
* @return ***REMOVED***any***REMOVED*** The child the cursor now points to.
*/
Phaser.Group.prototype.next = function () ***REMOVED***

    if (this.cursor)
    ***REMOVED***
        //  Wrap the cursor?
        if (this.cursorIndex >= this.children.length - 1)
        ***REMOVED***
            this.cursorIndex = 0;
        ***REMOVED***
        else
        ***REMOVED***
            this.cursorIndex++;
        ***REMOVED***

        this.cursor = this.children[this.cursorIndex];

        return this.cursor;
    ***REMOVED***

***REMOVED***;

/**
* Moves the group cursor to the previous (lower) child in the group.
*
* If the cursor is at the start of the group (bottom child) it is moved to the end (top child).
*
* @method Phaser.Group#previous
* @return ***REMOVED***any***REMOVED*** The child the cursor now points to.
*/
Phaser.Group.prototype.previous = function () ***REMOVED***

    if (this.cursor)
    ***REMOVED***
        //  Wrap the cursor?
        if (this.cursorIndex === 0)
        ***REMOVED***
            this.cursorIndex = this.children.length - 1;
        ***REMOVED***
        else
        ***REMOVED***
            this.cursorIndex--;
        ***REMOVED***

        this.cursor = this.children[this.cursorIndex];

        return this.cursor;
    ***REMOVED***

***REMOVED***;

/**
* Swaps the position of two children in this group.
*
* Both children must be in this group, a child cannot be swapped with itself, and unparented children cannot be swapped.
*
* @method Phaser.Group#swap
* @param ***REMOVED***any***REMOVED*** child1 - The first child to swap.
* @param ***REMOVED***any***REMOVED*** child2 - The second child to swap.
*/
Phaser.Group.prototype.swap = function (child1, child2) ***REMOVED***

    this.swapChildren(child1, child2);
    this.updateZ();

***REMOVED***;

/**
* Brings the given child to the top of this group so it renders above all other children.
*
* @method Phaser.Group#bringToTop
* @param ***REMOVED***any***REMOVED*** child - The child to bring to the top of this group.
* @return ***REMOVED***any***REMOVED*** The child that was moved.
*/
Phaser.Group.prototype.bringToTop = function (child) ***REMOVED***

    if (child.parent === this && this.getIndex(child) < this.children.length)
    ***REMOVED***
        this.remove(child, false, true);
        this.add(child, true);
    ***REMOVED***

    return child;

***REMOVED***;

/**
* Sends the given child to the bottom of this group so it renders below all other children.
*
* @method Phaser.Group#sendToBack
* @param ***REMOVED***any***REMOVED*** child - The child to send to the bottom of this group.
* @return ***REMOVED***any***REMOVED*** The child that was moved.
*/
Phaser.Group.prototype.sendToBack = function (child) ***REMOVED***

    if (child.parent === this && this.getIndex(child) > 0)
    ***REMOVED***
        this.remove(child, false, true);
        this.addAt(child, 0, true);
    ***REMOVED***

    return child;

***REMOVED***;

/**
* Moves the given child up one place in this group unless it's already at the top.
*
* @method Phaser.Group#moveUp
* @param ***REMOVED***any***REMOVED*** child - The child to move up in the group.
* @return ***REMOVED***any***REMOVED*** The child that was moved.
*/
Phaser.Group.prototype.moveUp = function (child) ***REMOVED***

    if (child.parent === this && this.getIndex(child) < this.children.length - 1)
    ***REMOVED***
        var a = this.getIndex(child);
        var b = this.getAt(a + 1);

        if (b)
        ***REMOVED***
            this.swap(child, b);
        ***REMOVED***
    ***REMOVED***

    return child;

***REMOVED***;

/**
* Moves the given child down one place in this group unless it's already at the bottom.
*
* @method Phaser.Group#moveDown
* @param ***REMOVED***any***REMOVED*** child - The child to move down in the group.
* @return ***REMOVED***any***REMOVED*** The child that was moved.
*/
Phaser.Group.prototype.moveDown = function (child) ***REMOVED***

    if (child.parent === this && this.getIndex(child) > 0)
    ***REMOVED***
        var a = this.getIndex(child);
        var b = this.getAt(a - 1);

        if (b)
        ***REMOVED***
            this.swap(child, b);
        ***REMOVED***
    ***REMOVED***

    return child;

***REMOVED***;

/**
* Positions the child found at the given index within this group to the given x and y coordinates.
*
* @method Phaser.Group#xy
* @param ***REMOVED***integer***REMOVED*** index - The index of the child in the group to set the position of.
* @param ***REMOVED***number***REMOVED*** x - The new x position of the child.
* @param ***REMOVED***number***REMOVED*** y - The new y position of the child.
*/
Phaser.Group.prototype.xy = function (index, x, y) ***REMOVED***

    if (index < 0 || index > this.children.length)
    ***REMOVED***
        return -1;
    ***REMOVED***
    else
    ***REMOVED***
        this.getChildAt(index).x = x;
        this.getChildAt(index).y = y;
    ***REMOVED***

***REMOVED***;

/**
* Reverses all children in this group.
*
* This operation applies only to immediate children and does not propagate to subgroups.
*
* @method Phaser.Group#reverse
*/
Phaser.Group.prototype.reverse = function () ***REMOVED***

    this.children.reverse();
    this.updateZ();

***REMOVED***;

/**
* Get the index position of the given child in this group, which should match the child's `z` property.
*
* @method Phaser.Group#getIndex
* @param ***REMOVED***any***REMOVED*** child - The child to get the index for.
* @return ***REMOVED***integer***REMOVED*** The index of the child or -1 if it's not a member of this group.
*/
Phaser.Group.prototype.getIndex = function (child) ***REMOVED***

    return this.children.indexOf(child);

***REMOVED***;

/**
* Searches the Group for the first instance of a child with the `name`
* property matching the given argument. Should more than one child have
* the same name only the first instance is returned.
*
* @method Phaser.Group#getByName
* @param ***REMOVED***string***REMOVED*** name - The name to search for.
* @return ***REMOVED***any***REMOVED*** The first child with a matching name, or null if none were found.
*/
Phaser.Group.prototype.getByName = function (name) ***REMOVED***

    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        if (this.children[i].name === name)
        ***REMOVED***
            return this.children[i];
        ***REMOVED***
    ***REMOVED***

    return null;

***REMOVED***;

/**
* Replaces a child of this Group with the given newChild. The newChild cannot be a member of this Group.
*
* If `Group.enableBody` is set, then a physics body will be created on the object, so long as one does not already exist.
*
* If `Group.inputEnableChildren` is set, then an Input Handler will be created on the object, so long as one does not already exist.
*
* @method Phaser.Group#replace
* @param ***REMOVED***any***REMOVED*** oldChild - The child in this group that will be replaced.
* @param ***REMOVED***any***REMOVED*** newChild - The child to be inserted into this group.
* @return ***REMOVED***any***REMOVED*** Returns the oldChild that was replaced within this group.
*/
Phaser.Group.prototype.replace = function (oldChild, newChild) ***REMOVED***

    var index = this.getIndex(oldChild);

    if (index !== -1)
    ***REMOVED***
        if (newChild.parent)
        ***REMOVED***
            if (newChild.parent instanceof Phaser.Group)
            ***REMOVED***
                newChild.parent.remove(newChild);
            ***REMOVED***
            else
            ***REMOVED***
                newChild.parent.removeChild(newChild);
            ***REMOVED***
        ***REMOVED***

        this.remove(oldChild);

        this.addAt(newChild, index);

        return oldChild;
    ***REMOVED***

***REMOVED***;

/**
* Checks if the child has the given property.
*
* Will scan up to 4 levels deep only.
*
* @method Phaser.Group#hasProperty
* @param ***REMOVED***any***REMOVED*** child - The child to check for the existence of the property on.
* @param ***REMOVED***string[]***REMOVED*** key - An array of strings that make up the property.
* @return ***REMOVED***boolean***REMOVED*** True if the child has the property, otherwise false.
*/
Phaser.Group.prototype.hasProperty = function (child, key) ***REMOVED***

    var len = key.length;

    if (len === 1 && key[0] in child)
    ***REMOVED***
        return true;
    ***REMOVED***
    else if (len === 2 && key[0] in child && key[1] in child[key[0]])
    ***REMOVED***
        return true;
    ***REMOVED***
    else if (len === 3 && key[0] in child && key[1] in child[key[0]] && key[2] in child[key[0]][key[1]])
    ***REMOVED***
        return true;
    ***REMOVED***
    else if (len === 4 && key[0] in child && key[1] in child[key[0]] && key[2] in child[key[0]][key[1]] && key[3] in child[key[0]][key[1]][key[2]])
    ***REMOVED***
        return true;
    ***REMOVED***

    return false;

***REMOVED***;

/**
* Sets a property to the given value on the child. The operation parameter controls how the value is set.
*
* The operations are:
* - 0: set the existing value to the given value; if force is `true` a new property will be created if needed
* - 1: will add the given value to the value already present.
* - 2: will subtract the given value from the value already present.
* - 3: will multiply the value already present by the given value.
* - 4: will divide the value already present by the given value.
*
* @method Phaser.Group#setProperty
* @param ***REMOVED***any***REMOVED*** child - The child to set the property value on.
* @param ***REMOVED***array***REMOVED*** key - An array of strings that make up the property that will be set.
* @param ***REMOVED***any***REMOVED*** value - The value that will be set.
* @param ***REMOVED***integer***REMOVED*** [operation=0] - Controls how the value is assigned. A value of 0 replaces the value with the new one. A value of 1 adds it, 2 subtracts it, 3 multiplies it and 4 divides it.
* @param ***REMOVED***boolean***REMOVED*** [force=false] - If `force` is true then the property will be set on the child regardless if it already exists or not. If false and the property doesn't exist, nothing will be set.
* @return ***REMOVED***boolean***REMOVED*** True if the property was set, false if not.
*/
Phaser.Group.prototype.setProperty = function (child, key, value, operation, force) ***REMOVED***

    if (force === undefined) ***REMOVED*** force = false; ***REMOVED***

    operation = operation || 0;

    //  As ugly as this approach looks, and although it's limited to a depth of only 4, it's much faster than a for loop or object iteration.

    //  0 = Equals
    //  1 = Add
    //  2 = Subtract
    //  3 = Multiply
    //  4 = Divide

    //  We can't force a property in and the child doesn't have it, so abort.
    //  Equally we can't add, subtract, multiply or divide a property value if it doesn't exist, so abort in those cases too.
    if (!this.hasProperty(child, key) && (!force || operation > 0))
    ***REMOVED***
        return false;
    ***REMOVED***

    var len = key.length;

    if (len === 1)
    ***REMOVED***
        if (operation === 0) ***REMOVED*** child[key[0]] = value; ***REMOVED***
        else if (operation === 1) ***REMOVED*** child[key[0]] += value; ***REMOVED***
        else if (operation === 2) ***REMOVED*** child[key[0]] -= value; ***REMOVED***
        else if (operation === 3) ***REMOVED*** child[key[0]] *= value; ***REMOVED***
        else if (operation === 4) ***REMOVED*** child[key[0]] /= value; ***REMOVED***
    ***REMOVED***
    else if (len === 2)
    ***REMOVED***
        if (operation === 0) ***REMOVED*** child[key[0]][key[1]] = value; ***REMOVED***
        else if (operation === 1) ***REMOVED*** child[key[0]][key[1]] += value; ***REMOVED***
        else if (operation === 2) ***REMOVED*** child[key[0]][key[1]] -= value; ***REMOVED***
        else if (operation === 3) ***REMOVED*** child[key[0]][key[1]] *= value; ***REMOVED***
        else if (operation === 4) ***REMOVED*** child[key[0]][key[1]] /= value; ***REMOVED***
    ***REMOVED***
    else if (len === 3)
    ***REMOVED***
        if (operation === 0) ***REMOVED*** child[key[0]][key[1]][key[2]] = value; ***REMOVED***
        else if (operation === 1) ***REMOVED*** child[key[0]][key[1]][key[2]] += value; ***REMOVED***
        else if (operation === 2) ***REMOVED*** child[key[0]][key[1]][key[2]] -= value; ***REMOVED***
        else if (operation === 3) ***REMOVED*** child[key[0]][key[1]][key[2]] *= value; ***REMOVED***
        else if (operation === 4) ***REMOVED*** child[key[0]][key[1]][key[2]] /= value; ***REMOVED***
    ***REMOVED***
    else if (len === 4)
    ***REMOVED***
        if (operation === 0) ***REMOVED*** child[key[0]][key[1]][key[2]][key[3]] = value; ***REMOVED***
        else if (operation === 1) ***REMOVED*** child[key[0]][key[1]][key[2]][key[3]] += value; ***REMOVED***
        else if (operation === 2) ***REMOVED*** child[key[0]][key[1]][key[2]][key[3]] -= value; ***REMOVED***
        else if (operation === 3) ***REMOVED*** child[key[0]][key[1]][key[2]][key[3]] *= value; ***REMOVED***
        else if (operation === 4) ***REMOVED*** child[key[0]][key[1]][key[2]][key[3]] /= value; ***REMOVED***
    ***REMOVED***

    return true;

***REMOVED***;

/**
* Checks a property for the given value on the child.
*
* @method Phaser.Group#checkProperty
* @param ***REMOVED***any***REMOVED*** child - The child to check the property value on.
* @param ***REMOVED***array***REMOVED*** key - An array of strings that make up the property that will be set.
* @param ***REMOVED***any***REMOVED*** value - The value that will be checked.
* @param ***REMOVED***boolean***REMOVED*** [force=false] - If `force` is true then the property will be checked on the child regardless if it already exists or not. If true and the property doesn't exist, false will be returned.
* @return ***REMOVED***boolean***REMOVED*** True if the property was was equal to value, false if not.
*/
Phaser.Group.prototype.checkProperty = function (child, key, value, force) ***REMOVED***

    if (force === undefined) ***REMOVED*** force = false; ***REMOVED***

    //  We can't force a property in and the child doesn't have it, so abort.
    if (!Phaser.Utils.getProperty(child, key) && force)
    ***REMOVED***
        return false;
    ***REMOVED***

    if (Phaser.Utils.getProperty(child, key) !== value)
    ***REMOVED***
        return false;
    ***REMOVED***

    return true;

***REMOVED***;

/**
* Quickly set a property on a single child of this group to a new value.
*
* The operation parameter controls how the new value is assigned to the property, from simple replacement to addition and multiplication.
*
* @method Phaser.Group#set
* @param ***REMOVED***Phaser.Sprite***REMOVED*** child - The child to set the property on.
* @param ***REMOVED***string***REMOVED*** key - The property, as a string, to be set. For example: 'body.velocity.x'
* @param ***REMOVED***any***REMOVED*** value - The value that will be set.
* @param ***REMOVED***boolean***REMOVED*** [checkAlive=false] - If set then the child will only be updated if alive=true.
* @param ***REMOVED***boolean***REMOVED*** [checkVisible=false] - If set then the child will only be updated if visible=true.
* @param ***REMOVED***integer***REMOVED*** [operation=0] - Controls how the value is assigned. A value of 0 replaces the value with the new one. A value of 1 adds it, 2 subtracts it, 3 multiplies it and 4 divides it.
* @param ***REMOVED***boolean***REMOVED*** [force=false] - If `force` is true then the property will be set on the child regardless if it already exists or not. If false and the property doesn't exist, nothing will be set.
* @return ***REMOVED***boolean***REMOVED*** True if the property was set, false if not.
*/
Phaser.Group.prototype.set = function (child, key, value, checkAlive, checkVisible, operation, force) ***REMOVED***

    if (force === undefined) ***REMOVED*** force = false; ***REMOVED***

    key = key.split('.');

    if (checkAlive === undefined) ***REMOVED*** checkAlive = false; ***REMOVED***
    if (checkVisible === undefined) ***REMOVED*** checkVisible = false; ***REMOVED***

    if ((checkAlive === false || (checkAlive && child.alive)) && (checkVisible === false || (checkVisible && child.visible)))
    ***REMOVED***
        return this.setProperty(child, key, value, operation, force);
    ***REMOVED***

***REMOVED***;

/**
* Quickly set the same property across all children of this group to a new value.
*
* This call doesn't descend down children, so if you have a Group inside of this group, the property will be set on the group but not its children.
* If you need that ability please see `Group.setAllChildren`.
*
* The operation parameter controls how the new value is assigned to the property, from simple replacement to addition and multiplication.
*
* @method Phaser.Group#setAll
* @param ***REMOVED***string***REMOVED*** key - The property, as a string, to be set. For example: 'body.velocity.x'
* @param ***REMOVED***any***REMOVED*** value - The value that will be set.
* @param ***REMOVED***boolean***REMOVED*** [checkAlive=false] - If set then only children with alive=true will be updated. This includes any Groups that are children.
* @param ***REMOVED***boolean***REMOVED*** [checkVisible=false] - If set then only children with visible=true will be updated. This includes any Groups that are children.
* @param ***REMOVED***integer***REMOVED*** [operation=0] - Controls how the value is assigned. A value of 0 replaces the value with the new one. A value of 1 adds it, 2 subtracts it, 3 multiplies it and 4 divides it.
* @param ***REMOVED***boolean***REMOVED*** [force=false] - If `force` is true then the property will be set on the child regardless if it already exists or not. If false and the property doesn't exist, nothing will be set.
*/
Phaser.Group.prototype.setAll = function (key, value, checkAlive, checkVisible, operation, force) ***REMOVED***

    if (checkAlive === undefined) ***REMOVED*** checkAlive = false; ***REMOVED***
    if (checkVisible === undefined) ***REMOVED*** checkVisible = false; ***REMOVED***
    if (force === undefined) ***REMOVED*** force = false; ***REMOVED***

    key = key.split('.');
    operation = operation || 0;

    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        if ((!checkAlive || (checkAlive && this.children[i].alive)) && (!checkVisible || (checkVisible && this.children[i].visible)))
        ***REMOVED***
            this.setProperty(this.children[i], key, value, operation, force);
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* Quickly set the same property across all children of this group, and any child Groups, to a new value.
*
* If this group contains other Groups then the same property is set across their children as well, iterating down until it reaches the bottom.
* Unlike with `setAll` the property is NOT set on child Groups itself.
*
* The operation parameter controls how the new value is assigned to the property, from simple replacement to addition and multiplication.
*
* @method Phaser.Group#setAllChildren
* @param ***REMOVED***string***REMOVED*** key - The property, as a string, to be set. For example: 'body.velocity.x'
* @param ***REMOVED***any***REMOVED*** value - The value that will be set.
* @param ***REMOVED***boolean***REMOVED*** [checkAlive=false] - If set then only children with alive=true will be updated. This includes any Groups that are children.
* @param ***REMOVED***boolean***REMOVED*** [checkVisible=false] - If set then only children with visible=true will be updated. This includes any Groups that are children.
* @param ***REMOVED***integer***REMOVED*** [operation=0] - Controls how the value is assigned. A value of 0 replaces the value with the new one. A value of 1 adds it, 2 subtracts it, 3 multiplies it and 4 divides it.
* @param ***REMOVED***boolean***REMOVED*** [force=false] - If `force` is true then the property will be set on the child regardless if it already exists or not. If false and the property doesn't exist, nothing will be set.
*/
Phaser.Group.prototype.setAllChildren = function (key, value, checkAlive, checkVisible, operation, force) ***REMOVED***

    if (checkAlive === undefined) ***REMOVED*** checkAlive = false; ***REMOVED***
    if (checkVisible === undefined) ***REMOVED*** checkVisible = false; ***REMOVED***
    if (force === undefined) ***REMOVED*** force = false; ***REMOVED***

    operation = operation || 0;

    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        if ((!checkAlive || (checkAlive && this.children[i].alive)) && (!checkVisible || (checkVisible && this.children[i].visible)))
        ***REMOVED***
            if (this.children[i] instanceof Phaser.Group)
            ***REMOVED***
                this.children[i].setAllChildren(key, value, checkAlive, checkVisible, operation, force);
            ***REMOVED***
            else
            ***REMOVED***
                this.setProperty(this.children[i], key.split('.'), value, operation, force);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* Quickly check that the same property across all children of this group is equal to the given value.
*
* This call doesn't descend down children, so if you have a Group inside of this group, the property will be checked on the group but not its children.
*
* @method Phaser.Group#checkAll
* @param ***REMOVED***string***REMOVED*** key - The property, as a string, to be set. For example: 'body.velocity.x'
* @param ***REMOVED***any***REMOVED*** value - The value that will be checked.
* @param ***REMOVED***boolean***REMOVED*** [checkAlive=false] - If set then only children with alive=true will be checked. This includes any Groups that are children.
* @param ***REMOVED***boolean***REMOVED*** [checkVisible=false] - If set then only children with visible=true will be checked. This includes any Groups that are children.
* @param ***REMOVED***boolean***REMOVED*** [force=false] - If `force` is true then the property will be checked on the child regardless if it already exists or not. If true and the property doesn't exist, false will be returned.
*/
Phaser.Group.prototype.checkAll = function (key, value, checkAlive, checkVisible, force) ***REMOVED***

    if (checkAlive === undefined) ***REMOVED*** checkAlive = false; ***REMOVED***
    if (checkVisible === undefined) ***REMOVED*** checkVisible = false; ***REMOVED***
    if (force === undefined) ***REMOVED*** force = false; ***REMOVED***

    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        if ((!checkAlive || (checkAlive && this.children[i].alive)) && (!checkVisible || (checkVisible && this.children[i].visible)))
        ***REMOVED***
            if (!this.checkProperty(this.children[i], key, value, force))
            ***REMOVED***
                return false;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    return true;

***REMOVED***;

/**
* Adds the amount to the given property on all children in this group.
*
* `Group.addAll('x', 10)` will add 10 to the child.x value for each child.
*
* @method Phaser.Group#addAll
* @param ***REMOVED***string***REMOVED*** property - The property to increment, for example 'body.velocity.x' or 'angle'.
* @param ***REMOVED***number***REMOVED*** amount - The amount to increment the property by. If child.x = 10 then addAll('x', 40) would make child.x = 50.
* @param ***REMOVED***boolean***REMOVED*** checkAlive - If true the property will only be changed if the child is alive.
* @param ***REMOVED***boolean***REMOVED*** checkVisible - If true the property will only be changed if the child is visible.
*/
Phaser.Group.prototype.addAll = function (property, amount, checkAlive, checkVisible) ***REMOVED***

    this.setAll(property, amount, checkAlive, checkVisible, 1);

***REMOVED***;

/**
* Subtracts the amount from the given property on all children in this group.
*
* `Group.subAll('x', 10)` will minus 10 from the child.x value for each child.
*
* @method Phaser.Group#subAll
* @param ***REMOVED***string***REMOVED*** property - The property to decrement, for example 'body.velocity.x' or 'angle'.
* @param ***REMOVED***number***REMOVED*** amount - The amount to subtract from the property. If child.x = 50 then subAll('x', 40) would make child.x = 10.
* @param ***REMOVED***boolean***REMOVED*** checkAlive - If true the property will only be changed if the child is alive.
* @param ***REMOVED***boolean***REMOVED*** checkVisible - If true the property will only be changed if the child is visible.
*/
Phaser.Group.prototype.subAll = function (property, amount, checkAlive, checkVisible) ***REMOVED***

    this.setAll(property, amount, checkAlive, checkVisible, 2);

***REMOVED***;

/**
* Multiplies the given property by the amount on all children in this group.
*
* `Group.multiplyAll('x', 2)` will x2 the child.x value for each child.
*
* @method Phaser.Group#multiplyAll
* @param ***REMOVED***string***REMOVED*** property - The property to multiply, for example 'body.velocity.x' or 'angle'.
* @param ***REMOVED***number***REMOVED*** amount - The amount to multiply the property by. If child.x = 10 then multiplyAll('x', 2) would make child.x = 20.
* @param ***REMOVED***boolean***REMOVED*** checkAlive - If true the property will only be changed if the child is alive.
* @param ***REMOVED***boolean***REMOVED*** checkVisible - If true the property will only be changed if the child is visible.
*/
Phaser.Group.prototype.multiplyAll = function (property, amount, checkAlive, checkVisible) ***REMOVED***

    this.setAll(property, amount, checkAlive, checkVisible, 3);

***REMOVED***;

/**
* Divides the given property by the amount on all children in this group.
*
* `Group.divideAll('x', 2)` will half the child.x value for each child.
*
* @method Phaser.Group#divideAll
* @param ***REMOVED***string***REMOVED*** property - The property to divide, for example 'body.velocity.x' or 'angle'.
* @param ***REMOVED***number***REMOVED*** amount - The amount to divide the property by. If child.x = 100 then divideAll('x', 2) would make child.x = 50.
* @param ***REMOVED***boolean***REMOVED*** checkAlive - If true the property will only be changed if the child is alive.
* @param ***REMOVED***boolean***REMOVED*** checkVisible - If true the property will only be changed if the child is visible.
*/
Phaser.Group.prototype.divideAll = function (property, amount, checkAlive, checkVisible) ***REMOVED***

    this.setAll(property, amount, checkAlive, checkVisible, 4);

***REMOVED***;

/**
* Calls a function, specified by name, on all children in the group who exist (or do not exist).
*
* After the existsValue parameter you can add as many parameters as you like, which will all be passed to the child callback.
*
* @method Phaser.Group#callAllExists
* @param ***REMOVED***string***REMOVED*** callback - Name of the function on the children to call.
* @param ***REMOVED***boolean***REMOVED*** existsValue - Only children with exists=existsValue will be called.
* @param ***REMOVED***...any***REMOVED*** parameter - Additional parameters that will be passed to the callback.
*/
Phaser.Group.prototype.callAllExists = function (callback, existsValue) ***REMOVED***

    var args;

    if (arguments.length > 2)
    ***REMOVED***
        args = [];

        for (var i = 2; i < arguments.length; i++)
        ***REMOVED***
            args.push(arguments[i]);
        ***REMOVED***
    ***REMOVED***

    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        if (this.children[i].exists === existsValue && this.children[i][callback])
        ***REMOVED***
            this.children[i][callback].apply(this.children[i], args);
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* Returns a reference to a function that exists on a child of the group based on the given callback array.
*
* @method Phaser.Group#callbackFromArray
* @param ***REMOVED***object***REMOVED*** child - The object to inspect.
* @param ***REMOVED***array***REMOVED*** callback - The array of function names.
* @param ***REMOVED***integer***REMOVED*** length - The size of the array (pre-calculated in callAll).
* @protected
*/
Phaser.Group.prototype.callbackFromArray = function (child, callback, length) ***REMOVED***

    //  Kinda looks like a Christmas tree

    if (length === 1)
    ***REMOVED***
        if (child[callback[0]])
        ***REMOVED***
            return child[callback[0]];
        ***REMOVED***
    ***REMOVED***
    else if (length === 2)
    ***REMOVED***
        if (child[callback[0]][callback[1]])
        ***REMOVED***
            return child[callback[0]][callback[1]];
        ***REMOVED***
    ***REMOVED***
    else if (length === 3)
    ***REMOVED***
        if (child[callback[0]][callback[1]][callback[2]])
        ***REMOVED***
            return child[callback[0]][callback[1]][callback[2]];
        ***REMOVED***
    ***REMOVED***
    else if (length === 4)
    ***REMOVED***
        if (child[callback[0]][callback[1]][callback[2]][callback[3]])
        ***REMOVED***
            return child[callback[0]][callback[1]][callback[2]][callback[3]];
        ***REMOVED***
    ***REMOVED***
    else if (child[callback])
    ***REMOVED***
        return child[callback];
    ***REMOVED***

    return false;

***REMOVED***;

/**
* Calls a function, specified by name, on all on children.
*
* The function is called for all children regardless if they are dead or alive (see callAllExists for different options).
* After the method parameter and context you can add as many extra parameters as you like, which will all be passed to the child.
*
* @method Phaser.Group#callAll
* @param ***REMOVED***string***REMOVED*** method - Name of the function on the child to call. Deep property lookup is supported.
* @param ***REMOVED***string***REMOVED*** [context=null] - A string containing the context under which the method will be executed. Set to null to default to the child.
* @param ***REMOVED***...any***REMOVED*** args - Additional parameters that will be passed to the method.
*/
Phaser.Group.prototype.callAll = function (method, context) ***REMOVED***

    if (method === undefined)
    ***REMOVED***
        return;
    ***REMOVED***

    //  Extract the method into an array
    method = method.split('.');

    var methodLength = method.length;

    if (context === undefined || context === null || context === '')
    ***REMOVED***
        context = null;
    ***REMOVED***
    else
    ***REMOVED***
        //  Extract the context into an array
        if (typeof context === 'string')
        ***REMOVED***
            context = context.split('.');
            var contextLength = context.length;
        ***REMOVED***
    ***REMOVED***

    var args;

    if (arguments.length > 2)
    ***REMOVED***
        args = [];

        for (var i = 2; i < arguments.length; i++)
        ***REMOVED***
            args.push(arguments[i]);
        ***REMOVED***
    ***REMOVED***

    var callback = null;
    var callbackContext = null;

    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        callback = this.callbackFromArray(this.children[i], method, methodLength);

        if (context && callback)
        ***REMOVED***
            callbackContext = this.callbackFromArray(this.children[i], context, contextLength);

            if (callback)
            ***REMOVED***
                callback.apply(callbackContext, args);
            ***REMOVED***
        ***REMOVED***
        else if (callback)
        ***REMOVED***
            callback.apply(this.children[i], args);
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* The core preUpdate - as called by World.
* @method Phaser.Group#preUpdate
* @protected
*/
Phaser.Group.prototype.preUpdate = function () ***REMOVED***

    if (this.pendingDestroy)
    ***REMOVED***
        this.destroy();
        return false;
    ***REMOVED***

    if (!this.exists || !this.parent.exists)
    ***REMOVED***
        this.renderOrderID = -1;
        return false;
    ***REMOVED***

    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        this.children[i].preUpdate();
    ***REMOVED***

    return true;

***REMOVED***;

/**
* The core update - as called by World.
* @method Phaser.Group#update
* @protected
*/
Phaser.Group.prototype.update = function () ***REMOVED***

    //  Goes in reverse, because it's highly likely the child will destroy itself in `update`
    var i = this.children.length;

    while (i--)
    ***REMOVED***
        this.children[i].update();
    ***REMOVED***

***REMOVED***;

/**
* The core postUpdate - as called by World.
* @method Phaser.Group#postUpdate
* @protected
*/
Phaser.Group.prototype.postUpdate = function () ***REMOVED***

    //  Fixed to Camera?
    if (this.fixedToCamera)
    ***REMOVED***
        this.x = this.game.camera.view.x + this.cameraOffset.x;
        this.y = this.game.camera.view.y + this.cameraOffset.y;
    ***REMOVED***

    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        this.children[i].postUpdate();
    ***REMOVED***

***REMOVED***;

/**
* Find children matching a certain predicate.
*
* For example:
*
*     var healthyList = Group.filter(function(child, index, children) ***REMOVED***
*         return child.health > 10 ? true : false;
*     ***REMOVED***, true);
*     healthyList.callAll('attack');
*
* Note: Currently this will skip any children which are Groups themselves.
*
* @method Phaser.Group#filter
* @param ***REMOVED***function***REMOVED*** predicate - The function that each child will be evaluated against. Each child of the group will be passed to it as its first parameter, the index as the second, and the entire child array as the third
* @param ***REMOVED***boolean***REMOVED*** [checkExists=false] - If true, only existing can be selected; otherwise all children can be selected and will be passed to the predicate.
* @return ***REMOVED***Phaser.ArraySet***REMOVED*** Returns an array list containing all the children that the predicate returned true for
*/
Phaser.Group.prototype.filter = function (predicate, checkExists) ***REMOVED***

    var index = -1;
    var length = this.children.length;
    var results = [];

    while (++index < length)
    ***REMOVED***
        var child = this.children[index];

        if (!checkExists || (checkExists && child.exists))
        ***REMOVED***
            if (predicate(child, index, this.children))
            ***REMOVED***
                results.push(child);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    return new Phaser.ArraySet(results);

***REMOVED***;

/**
* Call a function on each child in this group.
*
* Additional arguments for the callback can be specified after the `checkExists` parameter. For example,
*
*     Group.forEach(awardBonusGold, this, true, 100, 500)
*
* would invoke `awardBonusGold` function with the parameters `(child, 100, 500)`.
*
* Note: This check will skip any children which are Groups themselves.
*
* @method Phaser.Group#forEach
* @param ***REMOVED***function***REMOVED*** callback - The function that will be called for each applicable child. The child will be passed as the first argument.
* @param ***REMOVED***object***REMOVED*** callbackContext - The context in which the function should be called (usually 'this').
* @param ***REMOVED***boolean***REMOVED*** [checkExists=false] - If set only children matching for which `exists` is true will be passed to the callback, otherwise all children will be passed.
* @param ***REMOVED***...any***REMOVED*** [args=(none)] - Additional arguments to pass to the callback function, after the child item.
*/
Phaser.Group.prototype.forEach = function (callback, callbackContext, checkExists) ***REMOVED***

    if (checkExists === undefined) ***REMOVED*** checkExists = false; ***REMOVED***

    if (arguments.length <= 3)
    ***REMOVED***
        for (var i = 0; i < this.children.length; i++)
        ***REMOVED***
            if (!checkExists || (checkExists && this.children[i].exists))
            ***REMOVED***
                callback.call(callbackContext, this.children[i]);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
    else
    ***REMOVED***
        // Assigning to arguments properties causes Extreme Deoptimization in Chrome, FF, and IE.
        // Using an array and pushing each element (not a slice!) is _significantly_ faster.
        var args = [null];

        for (var i = 3; i < arguments.length; i++)
        ***REMOVED***
            args.push(arguments[i]);
        ***REMOVED***

        for (var i = 0; i < this.children.length; i++)
        ***REMOVED***
            if (!checkExists || (checkExists && this.children[i].exists))
            ***REMOVED***
                args[0] = this.children[i];
                callback.apply(callbackContext, args);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* Call a function on each existing child in this group.
*
* See ***REMOVED***@link Phaser.Group#forEach forEach***REMOVED*** for details.
*
* @method Phaser.Group#forEachExists
* @param ***REMOVED***function***REMOVED*** callback - The function that will be called for each applicable child. The child will be passed as the first argument.
* @param ***REMOVED***object***REMOVED*** callbackContext - The context in which the function should be called (usually 'this').
* @param ***REMOVED***...any***REMOVED*** [args=(none)] - Additional arguments to pass to the callback function, after the child item.
*/
Phaser.Group.prototype.forEachExists = function (callback, callbackContext) ***REMOVED***

    var args;

    if (arguments.length > 2)
    ***REMOVED***
        args = [null];

        for (var i = 2; i < arguments.length; i++)
        ***REMOVED***
            args.push(arguments[i]);
        ***REMOVED***
    ***REMOVED***

    this.iterate('exists', true, Phaser.Group.RETURN_TOTAL, callback, callbackContext, args);

***REMOVED***;

/**
* Call a function on each alive child in this group.
*
* See ***REMOVED***@link Phaser.Group#forEach forEach***REMOVED*** for details.
*
* @method Phaser.Group#forEachAlive
* @param ***REMOVED***function***REMOVED*** callback - The function that will be called for each applicable child. The child will be passed as the first argument.
* @param ***REMOVED***object***REMOVED*** callbackContext - The context in which the function should be called (usually 'this').
* @param ***REMOVED***...any***REMOVED*** [args=(none)] - Additional arguments to pass to the callback function, after the child item.
*/
Phaser.Group.prototype.forEachAlive = function (callback, callbackContext) ***REMOVED***

    var args;

    if (arguments.length > 2)
    ***REMOVED***
        args = [null];

        for (var i = 2; i < arguments.length; i++)
        ***REMOVED***
            args.push(arguments[i]);
        ***REMOVED***
    ***REMOVED***

    this.iterate('alive', true, Phaser.Group.RETURN_TOTAL, callback, callbackContext, args);

***REMOVED***;

/**
* Call a function on each dead child in this group.
*
* See ***REMOVED***@link Phaser.Group#forEach forEach***REMOVED*** for details.
*
* @method Phaser.Group#forEachDead
* @param ***REMOVED***function***REMOVED*** callback - The function that will be called for each applicable child. The child will be passed as the first argument.
* @param ***REMOVED***object***REMOVED*** callbackContext - The context in which the function should be called (usually 'this').
* @param ***REMOVED***...any***REMOVED*** [args=(none)] - Additional arguments to pass to the callback function, after the child item.
*/
Phaser.Group.prototype.forEachDead = function (callback, callbackContext) ***REMOVED***

    var args;

    if (arguments.length > 2)
    ***REMOVED***
        args = [null];

        for (var i = 2; i < arguments.length; i++)
        ***REMOVED***
            args.push(arguments[i]);
        ***REMOVED***
    ***REMOVED***

    this.iterate('alive', false, Phaser.Group.RETURN_TOTAL, callback, callbackContext, args);

***REMOVED***;

/**
* Sort the children in the group according to a particular key and ordering.
*
* Call this function to sort the group according to a particular key value and order.
* 
* For example to depth sort Sprites for Zelda-style game you might call `group.sort('y', Phaser.Group.SORT_ASCENDING)` at the bottom of your `State.update()`.
*
* Internally this uses a standard JavaScript Array sort, so everything that applies there also applies here, including
* alphabetical sorting, mixing strings and numbers, and Unicode sorting. See MDN for more details.
*
* @method Phaser.Group#sort
* @param ***REMOVED***string***REMOVED*** [key='z'] - The name of the property to sort on. Defaults to the objects z-depth value.
* @param ***REMOVED***integer***REMOVED*** [order=Phaser.Group.SORT_ASCENDING] - Order ascending (***REMOVED***@link Phaser.Group.SORT_ASCENDING SORT_ASCENDING***REMOVED***) or descending (***REMOVED***@link Phaser.Group.SORT_DESCENDING SORT_DESCENDING***REMOVED***).
*/
Phaser.Group.prototype.sort = function (key, order) ***REMOVED***

    if (this.children.length < 2)
    ***REMOVED***
        //  Nothing to swap
        return;
    ***REMOVED***

    if (key === undefined) ***REMOVED*** key = 'z'; ***REMOVED***
    if (order === undefined) ***REMOVED*** order = Phaser.Group.SORT_ASCENDING; ***REMOVED***

    this._sortProperty = key;

    if (order === Phaser.Group.SORT_ASCENDING)
    ***REMOVED***
        this.children.sort(this.ascendingSortHandler.bind(this));
    ***REMOVED***
    else
    ***REMOVED***
        this.children.sort(this.descendingSortHandler.bind(this));
    ***REMOVED***

    this.updateZ();

***REMOVED***;

/**
* Sort the children in the group according to custom sort function.
*
* The `sortHandler` is provided the two parameters: the two children involved in the comparison (a and b).
* It should return -1 if `a > b`, 1 if `a < b` or 0 if `a === b`.
*
* @method Phaser.Group#customSort
* @param ***REMOVED***function***REMOVED*** sortHandler - The custom sort function.
* @param ***REMOVED***object***REMOVED*** [context=undefined] - The context in which the sortHandler is called.
*/
Phaser.Group.prototype.customSort = function (sortHandler, context) ***REMOVED***

    if (this.children.length < 2)
    ***REMOVED***
        //  Nothing to swap
        return;
    ***REMOVED***

    this.children.sort(sortHandler.bind(context));

    this.updateZ();

***REMOVED***;

/**
* An internal helper function for the sort process.
*
* @method Phaser.Group#ascendingSortHandler
* @protected
* @param ***REMOVED***object***REMOVED*** a - The first object being sorted.
* @param ***REMOVED***object***REMOVED*** b - The second object being sorted.
*/
Phaser.Group.prototype.ascendingSortHandler = function (a, b) ***REMOVED***

    if (a[this._sortProperty] < b[this._sortProperty])
    ***REMOVED***
        return -1;
    ***REMOVED***
    else if (a[this._sortProperty] > b[this._sortProperty])
    ***REMOVED***
        return 1;
    ***REMOVED***
    else
    ***REMOVED***
        if (a.z < b.z)
        ***REMOVED***
            return -1;
        ***REMOVED***
        else
        ***REMOVED***
            return 1;
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* An internal helper function for the sort process.
*
* @method Phaser.Group#descendingSortHandler
* @protected
* @param ***REMOVED***object***REMOVED*** a - The first object being sorted.
* @param ***REMOVED***object***REMOVED*** b - The second object being sorted.
*/
Phaser.Group.prototype.descendingSortHandler = function (a, b) ***REMOVED***

    if (a[this._sortProperty] < b[this._sortProperty])
    ***REMOVED***
        return 1;
    ***REMOVED***
    else if (a[this._sortProperty] > b[this._sortProperty])
    ***REMOVED***
        return -1;
    ***REMOVED***
    else
    ***REMOVED***
        return 0;
    ***REMOVED***

***REMOVED***;

/**
* Iterates over the children of the group performing one of several actions for matched children.
*
* A child is considered a match when it has a property, named `key`, whose value is equal to `value`
* according to a strict equality comparison.
*
* The result depends on the `returnType`:
*
* - ***REMOVED***@link Phaser.Group.RETURN_TOTAL RETURN_TOTAL***REMOVED***:
*     The callback, if any, is applied to all matching children. The number of matched children is returned.
* - ***REMOVED***@link Phaser.Group.RETURN_NONE RETURN_NONE***REMOVED***:
*     The callback, if any, is applied to all matching children. No value is returned.
* - ***REMOVED***@link Phaser.Group.RETURN_CHILD RETURN_CHILD***REMOVED***:
*     The callback, if any, is applied to the *first* matching child and the *first* matched child is returned.
*     If there is no matching child then null is returned.
*
* If `args` is specified it must be an array. The matched child will be assigned to the first
* element and the entire array will be applied to the callback function.
*
* @method Phaser.Group#iterate
* @param ***REMOVED***string***REMOVED*** key - The child property to check, i.e. 'exists', 'alive', 'health'
* @param ***REMOVED***any***REMOVED*** value - A child matches if `child[key] === value` is true.
* @param ***REMOVED***integer***REMOVED*** returnType - How to iterate the children and what to return.
* @param ***REMOVED***function***REMOVED*** [callback=null] - Optional function that will be called on each matching child. The matched child is supplied as the first argument.
* @param ***REMOVED***object***REMOVED*** [callbackContext] - The context in which the function should be called (usually 'this').
* @param ***REMOVED***any[]***REMOVED*** [args=(none)] - The arguments supplied to to the callback; the first array index (argument) will be replaced with the matched child.
* @return ***REMOVED***any***REMOVED*** Returns either an integer (for RETURN_TOTAL), the first matched child (for RETURN_CHILD), or null.
*/
Phaser.Group.prototype.iterate = function (key, value, returnType, callback, callbackContext, args) ***REMOVED***

    if (this.children.length === 0)
    ***REMOVED***
        if (returnType === Phaser.Group.RETURN_TOTAL)
        ***REMOVED***
            return 0;
        ***REMOVED***
        else if (returnType === Phaser.Group.RETURN_ALL)
        ***REMOVED***
            return [];
        ***REMOVED***
    ***REMOVED***

    var total = 0;

    if (returnType === Phaser.Group.RETURN_ALL)
    ***REMOVED***
        var output = [];
    ***REMOVED***

    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        if (this.children[i][key] === value)
        ***REMOVED***
            total++;

            if (callback)
            ***REMOVED***
                if (args)
                ***REMOVED***
                    args[0] = this.children[i];
                    callback.apply(callbackContext, args);
                ***REMOVED***
                else
                ***REMOVED***
                    callback.call(callbackContext, this.children[i]);
                ***REMOVED***
            ***REMOVED***

            if (returnType === Phaser.Group.RETURN_CHILD)
            ***REMOVED***
                return this.children[i];
            ***REMOVED***
            else if (returnType === Phaser.Group.RETURN_ALL)
            ***REMOVED***
                output.push(this.children[i]);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    if (returnType === Phaser.Group.RETURN_TOTAL)
    ***REMOVED***
        return total;
    ***REMOVED***
    else if (returnType === Phaser.Group.RETURN_ALL)
    ***REMOVED***
        return output;
    ***REMOVED***
    else
    ***REMOVED***
        //  RETURN_CHILD or RETURN_NONE
        return null;
    ***REMOVED***

***REMOVED***;

/**
* Get the first display object that exists, or doesn't exist.
* 
* You can use the optional argument `createIfNull` to create a new Game Object if none matching your exists argument were found in this Group.
*
* It works by calling `Group.create` passing it the parameters given to this method, and returning the new child.
*
* If a child *was* found , `createIfNull` is `false` and you provided the additional arguments then the child
* will be reset and/or have a new texture loaded on it. This is handled by `Group.resetChild`.
*
* @method Phaser.Group#getFirstExists
* @param ***REMOVED***boolean***REMOVED*** [exists=true] - If true, find the first existing child; otherwise find the first non-existing child.
* @param ***REMOVED***boolean***REMOVED*** [createIfNull=false] - If `true` and no alive children are found a new one is created.
* @param ***REMOVED***number***REMOVED*** [x] - The x coordinate to reset the child to. The value is in relation to the group.x point.
* @param ***REMOVED***number***REMOVED*** [y] - The y coordinate to reset the child to. The value is in relation to the group.y point.
* @param ***REMOVED***string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture***REMOVED*** [key] - This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache Image entry, or an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
* @param ***REMOVED***string|number***REMOVED*** [frame] - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
* @return ***REMOVED***DisplayObject***REMOVED*** The first child, or `null` if none found and `createIfNull` was false.
*/
Phaser.Group.prototype.getFirstExists = function (exists, createIfNull, x, y, key, frame) ***REMOVED***

    if (createIfNull === undefined) ***REMOVED*** createIfNull = false; ***REMOVED***

    if (typeof exists !== 'boolean')
    ***REMOVED***
        exists = true;
    ***REMOVED***

    var child = this.iterate('exists', exists, Phaser.Group.RETURN_CHILD);

    return (child === null && createIfNull) ? this.create(x, y, key, frame) : this.resetChild(child, x, y, key, frame);

***REMOVED***;

/**
* Get the first child that is alive (`child.alive === true`).
*
* This is handy for choosing a squad leader, etc.
*
* You can use the optional argument `createIfNull` to create a new Game Object if no alive ones were found in this Group.
*
* It works by calling `Group.create` passing it the parameters given to this method, and returning the new child.
*
* If a child *was* found , `createIfNull` is `false` and you provided the additional arguments then the child
* will be reset and/or have a new texture loaded on it. This is handled by `Group.resetChild`.
*
* @method Phaser.Group#getFirstAlive
* @param ***REMOVED***boolean***REMOVED*** [createIfNull=false] - If `true` and no alive children are found a new one is created.
* @param ***REMOVED***number***REMOVED*** [x] - The x coordinate to reset the child to. The value is in relation to the group.x point.
* @param ***REMOVED***number***REMOVED*** [y] - The y coordinate to reset the child to. The value is in relation to the group.y point.
* @param ***REMOVED***string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture***REMOVED*** [key] - This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache Image entry, or an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
* @param ***REMOVED***string|number***REMOVED*** [frame] - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
* @return ***REMOVED***DisplayObject***REMOVED*** The alive dead child, or `null` if none found and `createIfNull` was false.
*/
Phaser.Group.prototype.getFirstAlive = function (createIfNull, x, y, key, frame) ***REMOVED***

    if (createIfNull === undefined) ***REMOVED*** createIfNull = false; ***REMOVED***

    var child = this.iterate('alive', true, Phaser.Group.RETURN_CHILD);

    return (child === null && createIfNull) ? this.create(x, y, key, frame) : this.resetChild(child, x, y, key, frame);

***REMOVED***;

/**
* Get the first child that is dead (`child.alive === false`).
*
* This is handy for checking if everything has been wiped out and adding to the pool as needed.
*
* You can use the optional argument `createIfNull` to create a new Game Object if no dead ones were found in this Group.
*
* It works by calling `Group.create` passing it the parameters given to this method, and returning the new child.
*
* If a child *was* found , `createIfNull` is `false` and you provided the additional arguments then the child
* will be reset and/or have a new texture loaded on it. This is handled by `Group.resetChild`.
*
* @method Phaser.Group#getFirstDead
* @param ***REMOVED***boolean***REMOVED*** [createIfNull=false] - If `true` and no dead children are found a new one is created.
* @param ***REMOVED***number***REMOVED*** [x] - The x coordinate to reset the child to. The value is in relation to the group.x point.
* @param ***REMOVED***number***REMOVED*** [y] - The y coordinate to reset the child to. The value is in relation to the group.y point.
* @param ***REMOVED***string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture***REMOVED*** [key] - This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache Image entry, or an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
* @param ***REMOVED***string|number***REMOVED*** [frame] - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
* @return ***REMOVED***DisplayObject***REMOVED*** The first dead child, or `null` if none found and `createIfNull` was false.
*/
Phaser.Group.prototype.getFirstDead = function (createIfNull, x, y, key, frame) ***REMOVED***

    if (createIfNull === undefined) ***REMOVED*** createIfNull = false; ***REMOVED***

    var child = this.iterate('alive', false, Phaser.Group.RETURN_CHILD);

    return (child === null && createIfNull) ? this.create(x, y, key, frame) : this.resetChild(child, x, y, key, frame);

***REMOVED***;

/**
* Takes a child and if the `x` and `y` arguments are given it calls `child.reset(x, y)` on it.
*
* If the `key` and optionally the `frame` arguments are given, it calls `child.loadTexture(key, frame)` on it.
*
* The two operations are separate. For example if you just wish to load a new texture then pass `null` as the x and y values.
*
* @method Phaser.Group#resetChild
* @param ***REMOVED***DisplayObject***REMOVED*** child - The child to reset and/or load the texture on.
* @param ***REMOVED***number***REMOVED*** [x] - The x coordinate to reset the child to. The value is in relation to the group.x point.
* @param ***REMOVED***number***REMOVED*** [y] - The y coordinate to reset the child to. The value is in relation to the group.y point.
* @param ***REMOVED***string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture***REMOVED*** [key] - This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache Image entry, or an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
* @param ***REMOVED***string|number***REMOVED*** [frame] - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
* @return ***REMOVED***DisplayObject***REMOVED*** The child that was reset: usually a ***REMOVED***@link Phaser.Sprite***REMOVED***.
*/
Phaser.Group.prototype.resetChild = function (child, x, y, key, frame) ***REMOVED***

    if (child === null)
    ***REMOVED***
        return null;
    ***REMOVED***

    if (x === undefined) ***REMOVED*** x = null; ***REMOVED***
    if (y === undefined) ***REMOVED*** y = null; ***REMOVED***

    if (x !== null && y !== null)
    ***REMOVED***
        child.reset(x, y);
    ***REMOVED***

    if (key !== undefined)
    ***REMOVED***
        child.loadTexture(key, frame);
    ***REMOVED***

    return child;

***REMOVED***;

/**
* Return the child at the top of this group.
*
* The top child is the child displayed (rendered) above every other child.
*
* @method Phaser.Group#getTop
* @return ***REMOVED***any***REMOVED*** The child at the top of the Group.
*/
Phaser.Group.prototype.getTop = function () ***REMOVED***

    if (this.children.length > 0)
    ***REMOVED***
        return this.children[this.children.length - 1];
    ***REMOVED***

***REMOVED***;

/**
* Returns the child at the bottom of this group.
*
* The bottom child the child being displayed (rendered) below every other child.
*
* @method Phaser.Group#getBottom
* @return ***REMOVED***any***REMOVED*** The child at the bottom of the Group.
*/
Phaser.Group.prototype.getBottom = function () ***REMOVED***

    if (this.children.length > 0)
    ***REMOVED***
        return this.children[0];
    ***REMOVED***

***REMOVED***;

/**
* Get the closest child to given Object, with optional callback to filter children.
*
* This can be a Sprite, Group, Image or any object with public x and y properties.
*
* 'close' is determined by the distance from the objects `x` and `y` properties compared to the childs `x` and `y` properties.
*
* You can use the optional `callback` argument to apply your own filter to the distance checks.
* If the child is closer then the previous child, it will be sent to `callback` as the first argument,
* with the distance as the second. The callback should return `true` if it passes your 
* filtering criteria, otherwise it should return `false`.
*
* @method Phaser.Group#getClosestTo
* @param ***REMOVED***any***REMOVED*** object - The object used to determine the distance. This can be a Sprite, Group, Image or any object with public x and y properties.
* @param ***REMOVED***function***REMOVED*** [callback] - The function that each child will be evaluated against. Each child of the group will be passed to it as its first parameter, with the distance as the second. It should return `true` if the child passes the matching criteria.
* @param ***REMOVED***object***REMOVED*** [callbackContext] - The context in which the function should be called (usually 'this').
* @return ***REMOVED***any***REMOVED*** The child closest to given object, or `null` if no child was found.
*/
Phaser.Group.prototype.getClosestTo = function (object, callback, callbackContext) ***REMOVED***

    var distance = Number.MAX_VALUE;
    var tempDistance = 0;
    var result = null;

    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        var child = this.children[i];

        if (child.exists)
        ***REMOVED***
            tempDistance = Math.abs(Phaser.Point.distance(object, child));

            if (tempDistance < distance && (!callback || callback.call(callbackContext, child, tempDistance)))
            ***REMOVED***
                distance = tempDistance;
                result = child;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    return result;

***REMOVED***;

/**
* Get the child furthest away from the given Object, with optional callback to filter children.
*
* This can be a Sprite, Group, Image or any object with public x and y properties.
*
* 'furthest away' is determined by the distance from the objects `x` and `y` properties compared to the childs `x` and `y` properties.
*
* You can use the optional `callback` argument to apply your own filter to the distance checks.
* If the child is closer then the previous child, it will be sent to `callback` as the first argument,
* with the distance as the second. The callback should return `true` if it passes your 
* filtering criteria, otherwise it should return `false`.
*
* @method Phaser.Group#getFurthestFrom
* @param ***REMOVED***any***REMOVED*** object - The object used to determine the distance. This can be a Sprite, Group, Image or any object with public x and y properties.
* @param ***REMOVED***function***REMOVED*** [callback] - The function that each child will be evaluated against. Each child of the group will be passed to it as its first parameter, with the distance as the second. It should return `true` if the child passes the matching criteria.
* @param ***REMOVED***object***REMOVED*** [callbackContext] - The context in which the function should be called (usually 'this').
* @return ***REMOVED***any***REMOVED*** The child furthest from the given object, or `null` if no child was found.
*/
Phaser.Group.prototype.getFurthestFrom = function (object, callback, callbackContext) ***REMOVED***

    var distance = 0;
    var tempDistance = 0;
    var result = null;

    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        var child = this.children[i];

        if (child.exists)
        ***REMOVED***
            tempDistance = Math.abs(Phaser.Point.distance(object, child));

            if (tempDistance > distance && (!callback || callback.call(callbackContext, child, tempDistance)))
            ***REMOVED***
                distance = tempDistance;
                result = child;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    return result;

***REMOVED***;

/**
* Get the number of living children in this group.
*
* @method Phaser.Group#countLiving
* @return ***REMOVED***integer***REMOVED*** The number of children flagged as alive.
*/
Phaser.Group.prototype.countLiving = function () ***REMOVED***

    return this.iterate('alive', true, Phaser.Group.RETURN_TOTAL);

***REMOVED***;

/**
* Get the number of dead children in this group.
*
* @method Phaser.Group#countDead
* @return ***REMOVED***integer***REMOVED*** The number of children flagged as dead.
*/
Phaser.Group.prototype.countDead = function () ***REMOVED***

    return this.iterate('alive', false, Phaser.Group.RETURN_TOTAL);

***REMOVED***;

/**
* Returns a random child from the group.
*
* @method Phaser.Group#getRandom
* @param ***REMOVED***integer***REMOVED*** [startIndex=0] - Offset from the front of the group (lowest child).
* @param ***REMOVED***integer***REMOVED*** [length=(to top)] - Restriction on the number of values you want to randomly select from.
* @return ***REMOVED***any***REMOVED*** A random child of this Group.
*/
Phaser.Group.prototype.getRandom = function (startIndex, length) ***REMOVED***

    if (startIndex === undefined) ***REMOVED*** startIndex = 0; ***REMOVED***
    if (length === undefined) ***REMOVED*** length = this.children.length; ***REMOVED***

    if (length === 0)
    ***REMOVED***
        return null;
    ***REMOVED***

    return Phaser.ArrayUtils.getRandomItem(this.children, startIndex, length);

***REMOVED***;

/**
* Returns a random child from the Group that has `exists` set to `true`.
*
* Optionally you can specify a start and end index. For example if this Group had 100 children,
* and you set `startIndex` to 0 and `endIndex` to 50, it would return a random child from only
* the first 50 children in the Group.
*
* @method Phaser.Group#getRandomExists
* @param ***REMOVED***integer***REMOVED*** [startIndex=0] - The first child index to start the search from.
* @param ***REMOVED***integer***REMOVED*** [endIndex] - The last child index to search up to.
* @return ***REMOVED***any***REMOVED*** A random child of this Group that exists.
*/
Phaser.Group.prototype.getRandomExists = function (startIndex, endIndex) ***REMOVED***

    var list = this.getAll('exists', true, startIndex, endIndex);

    return this.game.rnd.pick(list);

***REMOVED***;

/**
* Returns all children in this Group.
*
* You can optionally specify a matching criteria using the `property` and `value` arguments.
*
* For example: `getAll('exists', true)` would return only children that have their exists property set.
*
* Optionally you can specify a start and end index. For example if this Group had 100 children,
* and you set `startIndex` to 0 and `endIndex` to 50, it would return a random child from only
* the first 50 children in the Group.
*
* @method Phaser.Group#getAll
* @param ***REMOVED***string***REMOVED*** [property] - An optional property to test against the value argument.
* @param ***REMOVED***any***REMOVED*** [value] - If property is set then Child.property must strictly equal this value to be included in the results.
* @param ***REMOVED***integer***REMOVED*** [startIndex=0] - The first child index to start the search from.
* @param ***REMOVED***integer***REMOVED*** [endIndex] - The last child index to search up until.
* @return ***REMOVED***any***REMOVED*** A random existing child of this Group.
*/
Phaser.Group.prototype.getAll = function (property, value, startIndex, endIndex) ***REMOVED***

    if (startIndex === undefined) ***REMOVED*** startIndex = 0; ***REMOVED***
    if (endIndex === undefined) ***REMOVED*** endIndex = this.children.length; ***REMOVED***

    var output = [];

    for (var i = startIndex; i < endIndex; i++)
    ***REMOVED***
        var child = this.children[i];

        if (property && child[property] === value)
        ***REMOVED***
            output.push(child);
        ***REMOVED***
    ***REMOVED***

    return output;

***REMOVED***;

/**
* Removes the given child from this group.
*
* This will dispatch an `onRemovedFromGroup` event from the child (if it has one), and optionally destroy the child.
*
* If the group cursor was referring to the removed child it is updated to refer to the next child.
*
* @method Phaser.Group#remove
* @param ***REMOVED***any***REMOVED*** child - The child to remove.
* @param ***REMOVED***boolean***REMOVED*** [destroy=false] - If true `destroy` will be invoked on the removed child.
* @param ***REMOVED***boolean***REMOVED*** [silent=false] - If true the the child will not dispatch the `onRemovedFromGroup` event.
* @return ***REMOVED***boolean***REMOVED*** true if the child was removed from this group, otherwise false.
*/
Phaser.Group.prototype.remove = function (child, destroy, silent) ***REMOVED***

    if (destroy === undefined) ***REMOVED*** destroy = false; ***REMOVED***
    if (silent === undefined) ***REMOVED*** silent = false; ***REMOVED***

    if (this.children.length === 0 || this.children.indexOf(child) === -1)
    ***REMOVED***
        return false;
    ***REMOVED***

    if (!silent && child.events && !child.destroyPhase)
    ***REMOVED***
        child.events.onRemovedFromGroup$dispatch(child, this);
    ***REMOVED***

    var removed = this.removeChild(child);

    this.removeFromHash(child);

    this.updateZ();

    if (this.cursor === child)
    ***REMOVED***
        this.next();
    ***REMOVED***

    if (destroy && removed)
    ***REMOVED***
        removed.destroy(true);
    ***REMOVED***

    return true;

***REMOVED***;

/**
* Moves all children from this Group to the Group given.
*
* @method Phaser.Group#moveAll
* @param ***REMOVED***Phaser.Group***REMOVED*** group - The new Group to which the children will be moved to.
* @param ***REMOVED***boolean***REMOVED*** [silent=false] - If true the children will not dispatch the `onAddedToGroup` event for the new Group.
* @return ***REMOVED***Phaser.Group***REMOVED*** The Group to which all the children were moved.
*/
Phaser.Group.prototype.moveAll = function (group, silent) ***REMOVED***

    if (silent === undefined) ***REMOVED*** silent = false; ***REMOVED***

    if (this.children.length > 0 && group instanceof Phaser.Group)
    ***REMOVED***
        do
        ***REMOVED***
            group.add(this.children[0], silent);
        ***REMOVED***
        while (this.children.length > 0);

        this.hash = [];

        this.cursor = null;
    ***REMOVED***

    return group;

***REMOVED***;

/**
* Removes all children from this Group, but does not remove the group from its parent.
*
* The children can be optionally destroyed as they are removed.
* 
* You can also optionally also destroy the BaseTexture the Child is using. Be careful if you've
* more than one Game Object sharing the same BaseTexture.
*
* @method Phaser.Group#removeAll
* @param ***REMOVED***boolean***REMOVED*** [destroy=false] - If true `destroy` will be invoked on each removed child.
* @param ***REMOVED***boolean***REMOVED*** [silent=false] - If true the children will not dispatch their `onRemovedFromGroup` events.
* @param ***REMOVED***boolean***REMOVED*** [destroyTexture=false] - If true, and if the `destroy` argument is also true, the BaseTexture belonging to the Child is also destroyed. Note that if another Game Object is sharing the same BaseTexture it will invalidate it.
*/
Phaser.Group.prototype.removeAll = function (destroy, silent, destroyTexture) ***REMOVED***

    if (destroy === undefined) ***REMOVED*** destroy = false; ***REMOVED***
    if (silent === undefined) ***REMOVED*** silent = false; ***REMOVED***
    if (destroyTexture === undefined) ***REMOVED*** destroyTexture = false; ***REMOVED***

    if (this.children.length === 0)
    ***REMOVED***
        return;
    ***REMOVED***

    do
    ***REMOVED***
        if (!silent && this.children[0].events)
        ***REMOVED***
            this.children[0].events.onRemovedFromGroup$dispatch(this.children[0], this);
        ***REMOVED***

        var removed = this.removeChild(this.children[0]);

        this.removeFromHash(removed);

        if (destroy && removed)
        ***REMOVED***
            removed.destroy(true, destroyTexture);
        ***REMOVED***
    ***REMOVED***
    while (this.children.length > 0);

    this.hash = [];

    this.cursor = null;

***REMOVED***;

/**
* Removes all children from this group whose index falls beteen the given startIndex and endIndex values.
*
* @method Phaser.Group#removeBetween
* @param ***REMOVED***integer***REMOVED*** startIndex - The index to start removing children from.
* @param ***REMOVED***integer***REMOVED*** [endIndex] - The index to stop removing children at. Must be higher than startIndex. If undefined this method will remove all children between startIndex and the end of the group.
* @param ***REMOVED***boolean***REMOVED*** [destroy=false] - If true `destroy` will be invoked on each removed child.
* @param ***REMOVED***boolean***REMOVED*** [silent=false] - If true the children will not dispatch their `onRemovedFromGroup` events.
*/
Phaser.Group.prototype.removeBetween = function (startIndex, endIndex, destroy, silent) ***REMOVED***

    if (endIndex === undefined) ***REMOVED*** endIndex = this.children.length - 1; ***REMOVED***
    if (destroy === undefined) ***REMOVED*** destroy = false; ***REMOVED***
    if (silent === undefined) ***REMOVED*** silent = false; ***REMOVED***

    if (this.children.length === 0)
    ***REMOVED***
        return;
    ***REMOVED***

    if (startIndex > endIndex || startIndex < 0 || endIndex > this.children.length)
    ***REMOVED***
        return false;
    ***REMOVED***

    var i = endIndex;

    while (i >= startIndex)
    ***REMOVED***
        if (!silent && this.children[i].events)
        ***REMOVED***
            this.children[i].events.onRemovedFromGroup$dispatch(this.children[i], this);
        ***REMOVED***

        var removed = this.removeChild(this.children[i]);

        this.removeFromHash(removed);

        if (destroy && removed)
        ***REMOVED***
            removed.destroy(true);
        ***REMOVED***

        if (this.cursor === this.children[i])
        ***REMOVED***
            this.cursor = null;
        ***REMOVED***

        i--;
    ***REMOVED***

    this.updateZ();

***REMOVED***;

/**
* Destroys this group.
*
* Removes all children, then removes this group from its parent and nulls references.
*
* @method Phaser.Group#destroy
* @param ***REMOVED***boolean***REMOVED*** [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
* @param ***REMOVED***boolean***REMOVED*** [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
*/
Phaser.Group.prototype.destroy = function (destroyChildren, soft) ***REMOVED***

    if (this.game === null || this.ignoreDestroy) ***REMOVED*** return; ***REMOVED***

    if (destroyChildren === undefined) ***REMOVED*** destroyChildren = true; ***REMOVED***
    if (soft === undefined) ***REMOVED*** soft = false; ***REMOVED***

    this.onDestroy.dispatch(this, destroyChildren, soft);

    this.removeAll(destroyChildren);

    this.cursor = null;
    this.filters = null;
    this.pendingDestroy = false;

    if (!soft)
    ***REMOVED***
        if (this.parent)
        ***REMOVED***
            this.parent.removeChild(this);
        ***REMOVED***

        this.game = null;
        this.exists = false;
    ***REMOVED***

***REMOVED***;

/**
* Total number of existing children in the group.
*
* @name Phaser.Group#total
* @property ***REMOVED***integer***REMOVED*** total
* @readonly
*/
Object.defineProperty(Phaser.Group.prototype, "total", ***REMOVED***

    get: function () ***REMOVED***

        return this.iterate('exists', true, Phaser.Group.RETURN_TOTAL);

    ***REMOVED***

***REMOVED***);

/**
* Total number of children in this group, regardless of exists/alive status.
*
* @name Phaser.Group#length
* @property ***REMOVED***integer***REMOVED*** length 
* @readonly
*/
Object.defineProperty(Phaser.Group.prototype, "length", ***REMOVED***

    get: function () ***REMOVED***

        return this.children.length;

    ***REMOVED***

***REMOVED***);

/**
* The angle of rotation of the group container, in degrees.
*
* This adjusts the group itself by modifying its local rotation transform.
*
* This has no impact on the rotation/angle properties of the children, but it will update their worldTransform
* and on-screen orientation and position.
*
* @name Phaser.Group#angle
* @property ***REMOVED***number***REMOVED*** angle
*/
Object.defineProperty(Phaser.Group.prototype, "angle", ***REMOVED***

    get: function() ***REMOVED***
        return Phaser.Math.radToDeg(this.rotation);
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.rotation = Phaser.Math.degToRad(value);
    ***REMOVED***

***REMOVED***);

/**
* The center x coordinate of this Group.
*
* It is derived by calling `getBounds`, calculating the Groups dimensions based on its
* visible children.
* 
* @name Phaser.Group#centerX
* @property ***REMOVED***number***REMOVED*** centerX
*/
Object.defineProperty(Phaser.Group.prototype, "centerX", ***REMOVED***

    get: function () ***REMOVED***

        return this.getBounds(this.parent).centerX;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        var r = this.getBounds(this.parent);
        var offset = this.x - r.x;

        this.x = (value + offset) - r.halfWidth;

    ***REMOVED***

***REMOVED***);

/**
* The center y coordinate of this Group.
*
* It is derived by calling `getBounds`, calculating the Groups dimensions based on its
* visible children.
* 
* @name Phaser.Group#centerY
* @property ***REMOVED***number***REMOVED*** centerY
*/
Object.defineProperty(Phaser.Group.prototype, "centerY", ***REMOVED***

    get: function () ***REMOVED***

        return this.getBounds(this.parent).centerY;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        var r = this.getBounds(this.parent);
        var offset = this.y - r.y;

        this.y = (value + offset) - r.halfHeight;

    ***REMOVED***

***REMOVED***);

/**
* The left coordinate of this Group.
*
* It is derived by calling `getBounds`, calculating the Groups dimensions based on its
* visible children.
* 
* @name Phaser.Group#left
* @property ***REMOVED***number***REMOVED*** left
*/
Object.defineProperty(Phaser.Group.prototype, "left", ***REMOVED***

    get: function () ***REMOVED***

        return this.getBounds(this.parent).left;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        var r = this.getBounds(this.parent);
        var offset = this.x - r.x;

        this.x = value + offset;

    ***REMOVED***

***REMOVED***);

/**
* The right coordinate of this Group.
*
* It is derived by calling `getBounds`, calculating the Groups dimensions based on its
* visible children.
*
* @name Phaser.Group#right
* @property ***REMOVED***number***REMOVED*** right
*/
Object.defineProperty(Phaser.Group.prototype, "right", ***REMOVED***

    get: function () ***REMOVED***

        return this.getBounds(this.parent).right;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        var r = this.getBounds(this.parent);
        var offset = this.x - r.x;

        this.x = (value + offset) - r.width;

    ***REMOVED***

***REMOVED***);

/**
* The top coordinate of this Group.
*
* It is derived by calling `getBounds`, calculating the Groups dimensions based on its
* visible children.
*
* @name Phaser.Group#top
* @property ***REMOVED***number***REMOVED*** top
*/
Object.defineProperty(Phaser.Group.prototype, "top", ***REMOVED***

    get: function () ***REMOVED***

        return this.getBounds(this.parent).top;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        var r = this.getBounds(this.parent);
        var offset = this.y - r.y;

        this.y = (value + offset);

    ***REMOVED***

***REMOVED***);

/**
* The bottom coordinate of this Group.
*
* It is derived by calling `getBounds`, calculating the Groups dimensions based on its
* visible children.
* 
* @name Phaser.Group#bottom
* @property ***REMOVED***number***REMOVED*** bottom
*/
Object.defineProperty(Phaser.Group.prototype, "bottom", ***REMOVED***

    get: function () ***REMOVED***

        return this.getBounds(this.parent).bottom;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        var r = this.getBounds(this.parent);
        var offset = this.y - r.y;

        this.y = (value + offset) - r.height;

    ***REMOVED***

***REMOVED***);

/**
* Aligns this Group within another Game Object, or Rectangle, known as the
* 'container', to one of 9 possible positions.
*
* The container must be a Game Object, or Phaser.Rectangle object. This can include properties
* such as `World.bounds` or `Camera.view`, for aligning Groups within the world 
* and camera bounds. Or it can include other Sprites, Images, Text objects, BitmapText,
* TileSprites or Buttons.
*
* Please note that aligning a Group to another Game Object does **not** make it a child of
* the container. It simply modifies its position coordinates so it aligns with it.
* 
* The position constants you can use are:
* 
* `Phaser.TOP_LEFT`, `Phaser.TOP_CENTER`, `Phaser.TOP_RIGHT`, `Phaser.LEFT_CENTER`, 
* `Phaser.CENTER`, `Phaser.RIGHT_CENTER`, `Phaser.BOTTOM_LEFT`, 
* `Phaser.BOTTOM_CENTER` and `Phaser.BOTTOM_RIGHT`.
*
* Groups are placed in such a way that their _bounds_ align with the
* container, taking into consideration rotation and scale of its children.
* This allows you to neatly align Groups, irrespective of their position value.
*
* The optional `offsetX` and `offsetY` arguments allow you to apply extra spacing to the final
* aligned position of the Group. For example:
*
* `group.alignIn(background, Phaser.BOTTOM_RIGHT, -20, -20)`
*
* Would align the `group` to the bottom-right, but moved 20 pixels in from the corner.
* Think of the offsets as applying an adjustment to the containers bounds before the alignment takes place.
* So providing a negative offset will 'shrink' the container bounds by that amount, and providing a positive
* one expands it.
*
* @method Phaser.Group#alignIn
* @param ***REMOVED***Phaser.Rectangle|Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapText|Phaser.Button|Phaser.Graphics|Phaser.TileSprite***REMOVED*** container - The Game Object or Rectangle with which to align this Group to. Can also include properties such as `World.bounds` or `Camera.view`.
* @param ***REMOVED***integer***REMOVED*** [position] - The position constant. One of `Phaser.TOP_LEFT` (default), `Phaser.TOP_CENTER`, `Phaser.TOP_RIGHT`, `Phaser.LEFT_CENTER`, `Phaser.CENTER`, `Phaser.RIGHT_CENTER`, `Phaser.BOTTOM_LEFT`, `Phaser.BOTTOM_CENTER` or `Phaser.BOTTOM_RIGHT`.
* @param ***REMOVED***integer***REMOVED*** [offsetX=0] - A horizontal adjustment of the Containers bounds, applied to the aligned position of the Game Object. Use a negative value to shrink the bounds, positive to increase it.
* @param ***REMOVED***integer***REMOVED*** [offsetY=0] - A vertical adjustment of the Containers bounds, applied to the aligned position of the Game Object. Use a negative value to shrink the bounds, positive to increase it.
* @return ***REMOVED***Phaser.Group***REMOVED*** This Group.
*/

//  This function is set at the bottom of src/gameobjects/components/Bounds.js

/**
* Aligns this Group to the side of another Game Object, or Rectangle, known as the
* 'parent', in one of 11 possible positions.
*
* The parent must be a Game Object, or Phaser.Rectangle object. This can include properties
* such as `World.bounds` or `Camera.view`, for aligning Groups within the world 
* and camera bounds. Or it can include other Sprites, Images, Text objects, BitmapText,
* TileSprites or Buttons.
*
* Please note that aligning a Group to another Game Object does **not** make it a child of
* the parent. It simply modifies its position coordinates so it aligns with it.
* 
* The position constants you can use are:
* 
* `Phaser.TOP_LEFT` (default), `Phaser.TOP_CENTER`, `Phaser.TOP_RIGHT`, `Phaser.LEFT_TOP`, 
* `Phaser.LEFT_CENTER`, `Phaser.LEFT_BOTTOM`, `Phaser.RIGHT_TOP`, `Phaser.RIGHT_CENTER`, 
* `Phaser.RIGHT_BOTTOM`, `Phaser.BOTTOM_LEFT`, `Phaser.BOTTOM_CENTER` 
* and `Phaser.BOTTOM_RIGHT`.
*
* Groups are placed in such a way that their _bounds_ align with the
* parent, taking into consideration rotation and scale of the children.
* This allows you to neatly align Groups, irrespective of their position value.
*
* The optional `offsetX` and `offsetY` arguments allow you to apply extra spacing to the final
* aligned position of the Group. For example:
*
* `group.alignTo(background, Phaser.BOTTOM_RIGHT, -20, -20)`
*
* Would align the `group` to the bottom-right, but moved 20 pixels in from the corner.
* Think of the offsets as applying an adjustment to the parents bounds before the alignment takes place.
* So providing a negative offset will 'shrink' the parent bounds by that amount, and providing a positive
* one expands it.
*
* @method Phaser.Group#alignTo
* @param ***REMOVED***Phaser.Rectangle|Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapText|Phaser.Button|Phaser.Graphics|Phaser.TileSprite***REMOVED*** parent - The Game Object or Rectangle with which to align this Group to. Can also include properties such as `World.bounds` or `Camera.view`.
* @param ***REMOVED***integer***REMOVED*** [position] - The position constant. One of `Phaser.TOP_LEFT`, `Phaser.TOP_CENTER`, `Phaser.TOP_RIGHT`, `Phaser.LEFT_TOP`, `Phaser.LEFT_CENTER`, `Phaser.LEFT_BOTTOM`, `Phaser.RIGHT_TOP`, `Phaser.RIGHT_CENTER`, `Phaser.RIGHT_BOTTOM`, `Phaser.BOTTOM_LEFT`, `Phaser.BOTTOM_CENTER` or `Phaser.BOTTOM_RIGHT`.
* @param ***REMOVED***integer***REMOVED*** [offsetX=0] - A horizontal adjustment of the Containers bounds, applied to the aligned position of the Game Object. Use a negative value to shrink the bounds, positive to increase it.
* @param ***REMOVED***integer***REMOVED*** [offsetY=0] - A vertical adjustment of the Containers bounds, applied to the aligned position of the Game Object. Use a negative value to shrink the bounds, positive to increase it.
* @return ***REMOVED***Phaser.Group***REMOVED*** This Group.
*/

//  This function is set at the bottom of src/gameobjects/components/Bounds.js

/**
* A display object is any object that can be rendered in the Phaser/pixi.js scene graph.
*
* This includes ***REMOVED***@link Phaser.Group***REMOVED*** (groups are display objects!),
* ***REMOVED***@link Phaser.Sprite***REMOVED***, ***REMOVED***@link Phaser.Button***REMOVED***, ***REMOVED***@link Phaser.Text***REMOVED***
* as well as ***REMOVED***@link PIXI.DisplayObject***REMOVED*** and all derived types.
*
* @typedef ***REMOVED***object***REMOVED*** DisplayObject
*/
// Documentation stub for linking.

/**
* The x coordinate of the group container.
*
* You can adjust the group container itself by modifying its coordinates.
* This will have no impact on the x/y coordinates of its children, but it will update their worldTransform and on-screen position.
* @name Phaser.Group#x
* @property ***REMOVED***number***REMOVED*** x
*/

/**
* The y coordinate of the group container.
*
* You can adjust the group container itself by modifying its coordinates.
* This will have no impact on the x/y coordinates of its children, but it will update their worldTransform and on-screen position.
* @name Phaser.Group#y
* @property ***REMOVED***number***REMOVED*** y
*/

/**
* The angle of rotation of the group container, in radians.
*
* This will adjust the group container itself by modifying its rotation.
* This will have no impact on the rotation value of its children, but it will update their worldTransform and on-screen position.
* @name Phaser.Group#rotation
* @property ***REMOVED***number***REMOVED*** rotation
*/

/**
* The visible state of the group. Non-visible Groups and all of their children are not rendered.
*
* @name Phaser.Group#visible
* @property ***REMOVED***boolean***REMOVED*** visible
*/

/**
* The alpha value of the group container.
*
* @name Phaser.Group#alpha
* @property ***REMOVED***number***REMOVED*** alpha
*/

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* "This world is but a canvas to our imagination." - Henry David Thoreau
*
* A game has only one world. The world is an abstract place in which all game objects live. It is not bound
* by stage limits and can be any size. You look into the world via cameras. All game objects live within
* the world at world-based coordinates. By default a world is created the same size as your Stage.
*
* @class Phaser.World
* @extends Phaser.Group
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Reference to the current game instance.
*/
Phaser.World = function (game) ***REMOVED***

    Phaser.Group.call(this, game, null, '__world', false);

    /**
    * The World has no fixed size, but it does have a bounds outside of which objects are no longer considered as being "in world" and you should use this to clean-up the display list and purge dead objects.
    * By default we set the Bounds to be from 0,0 to Game.width,Game.height. I.e. it will match the size given to the game constructor with 0,0 representing the top-left of the display.
    * However 0,0 is actually the center of the world, and if you rotate or scale the world all of that will happen from 0,0.
    * So if you want to make a game in which the world itself will rotate you should adjust the bounds so that 0,0 is the center point, i.e. set them to -1000,-1000,2000,2000 for a 2000x2000 sized world centered around 0,0.
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** bounds - Bound of this world that objects can not escape from.
    */
    this.bounds = new Phaser.Rectangle(0, 0, game.width, game.height);

    /**
    * @property ***REMOVED***Phaser.Camera***REMOVED*** camera - Camera instance.
    */
    this.camera = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _definedSize - True if the World has been given a specifically defined size (i.e. from a Tilemap or direct in code) or false if it's just matched to the Game dimensions.
    * @readonly
    */
    this._definedSize = false;

    /**
    * @property ***REMOVED***number***REMOVED*** width - The defined width of the World. Sometimes the bounds needs to grow larger than this (if you resize the game) but this retains the original requested dimension.
    */
    this._width = game.width;

    /**
    * @property ***REMOVED***number***REMOVED*** height - The defined height of the World. Sometimes the bounds needs to grow larger than this (if you resize the game) but this retains the original requested dimension.
    */
    this._height = game.height;

    this.game.state.onStateChange.add(this.stateChange, this);

***REMOVED***;

Phaser.World.prototype = Object.create(Phaser.Group.prototype);
Phaser.World.prototype.constructor = Phaser.World;

/**
* Initialises the game world.
*
* @method Phaser.World#boot
* @protected
*/
Phaser.World.prototype.boot = function () ***REMOVED***

    this.camera = new Phaser.Camera(this.game, 0, 0, 0, this.game.width, this.game.height);

    this.game.stage.addChild(this);

    this.camera.boot();

***REMOVED***;

/**
* Called whenever the State changes or resets.
* 
* It resets the world.x and world.y coordinates back to zero,
* then resets the Camera.
*
* @method Phaser.World#stateChange
* @protected
*/
Phaser.World.prototype.stateChange = function () ***REMOVED***

    this.x = 0;
    this.y = 0;

    this.camera.reset();

***REMOVED***;

/**
* Updates the size of this world and sets World.x/y to the given values
* The Camera bounds and Physics bounds (if set) are also updated to match the new World bounds.
*
* @method Phaser.World#setBounds
* @param ***REMOVED***number***REMOVED*** x - Top left most corner of the world.
* @param ***REMOVED***number***REMOVED*** y - Top left most corner of the world.
* @param ***REMOVED***number***REMOVED*** width - New width of the game world in pixels.
* @param ***REMOVED***number***REMOVED*** height - New height of the game world in pixels.
*/
Phaser.World.prototype.setBounds = function (x, y, width, height) ***REMOVED***

    this._definedSize = true;
    this._width = width;
    this._height = height;

    this.bounds.setTo(x, y, width, height);

    this.x = x;
    this.y = y;

    if (this.camera.bounds)
    ***REMOVED***
        //  The Camera can never be smaller than the game size
        this.camera.bounds.setTo(x, y, Math.max(width, this.game.width), Math.max(height, this.game.height));
    ***REMOVED***

    this.game.physics.setBoundsToWorld();

***REMOVED***;

/**
* Updates the size of this world. Note that this doesn't modify the world x/y coordinates, just the width and height.
*
* @method Phaser.World#resize
* @param ***REMOVED***number***REMOVED*** width - New width of the game world in pixels.
* @param ***REMOVED***number***REMOVED*** height - New height of the game world in pixels.
*/
Phaser.World.prototype.resize = function (width, height) ***REMOVED***

    //  Don't ever scale the World bounds lower than the original requested dimensions if it's a defined world size

    if (this._definedSize)
    ***REMOVED***
        if (width < this._width)
        ***REMOVED***
            width = this._width;
        ***REMOVED***

        if (height < this._height)
        ***REMOVED***
            height = this._height;
        ***REMOVED***
    ***REMOVED***

    this.bounds.width = width;
    this.bounds.height = height;

    this.game.camera.setBoundsToWorld();

    this.game.physics.setBoundsToWorld();

***REMOVED***;

/**
* Destroyer of worlds.
*
* @method Phaser.World#shutdown
*/
Phaser.World.prototype.shutdown = function () ***REMOVED***

    //  World is a Group, so run a soft destruction on this and all children.
    this.destroy(true, true);

***REMOVED***;

/**
* This will take the given game object and check if its x/y coordinates fall outside of the world bounds.
* If they do it will reposition the object to the opposite side of the world, creating a wrap-around effect.
* If sprite has a P2 body then the body (sprite.body) should be passed as first parameter to the function.
*
* Please understand there are limitations to this method. For example if you have scaled the World
* then objects won't always be re-positioned correctly, and you'll need to employ your own wrapping function.
*
* @method Phaser.World#wrap
* @param ***REMOVED***Phaser.Sprite|Phaser.Image|Phaser.TileSprite|Phaser.Text***REMOVED*** sprite - The object you wish to wrap around the world bounds.
* @param ***REMOVED***number***REMOVED*** [padding=0] - Extra padding added equally to the sprite.x and y coordinates before checking if within the world bounds. Ignored if useBounds is true.
* @param ***REMOVED***boolean***REMOVED*** [useBounds=false] - If useBounds is false wrap checks the object.x/y coordinates. If true it does a more accurate bounds check, which is more expensive.
* @param ***REMOVED***boolean***REMOVED*** [horizontal=true] - If horizontal is false, wrap will not wrap the object.x coordinates horizontally.
* @param ***REMOVED***boolean***REMOVED*** [vertical=true] - If vertical is false, wrap will not wrap the object.y coordinates vertically.
*/
Phaser.World.prototype.wrap = function (sprite, padding, useBounds, horizontal, vertical) ***REMOVED***

    if (padding === undefined) ***REMOVED*** padding = 0; ***REMOVED***
    if (useBounds === undefined) ***REMOVED*** useBounds = false; ***REMOVED***
    if (horizontal === undefined) ***REMOVED*** horizontal = true; ***REMOVED***
    if (vertical === undefined) ***REMOVED*** vertical = true; ***REMOVED***

    if (!useBounds)
    ***REMOVED***
        if (horizontal && sprite.x + padding < this.bounds.x)
        ***REMOVED***
            sprite.x = this.bounds.right + padding;
        ***REMOVED***
        else if (horizontal && sprite.x - padding > this.bounds.right)
        ***REMOVED***
            sprite.x = this.bounds.left - padding;
        ***REMOVED***

        if (vertical && sprite.y + padding < this.bounds.top)
        ***REMOVED***
            sprite.y = this.bounds.bottom + padding;
        ***REMOVED***
        else if (vertical && sprite.y - padding > this.bounds.bottom)
        ***REMOVED***
            sprite.y = this.bounds.top - padding;
        ***REMOVED***
    ***REMOVED***
    else
    ***REMOVED***
        sprite.getBounds();

        if (horizontal)
        ***REMOVED***
            if ((sprite.x + sprite._currentBounds.width) < this.bounds.x)
            ***REMOVED***
                sprite.x = this.bounds.right;
            ***REMOVED***
            else if (sprite.x > this.bounds.right)
            ***REMOVED***
                sprite.x = this.bounds.left;
            ***REMOVED***
        ***REMOVED***

        if (vertical)
        ***REMOVED***
            if ((sprite.y + sprite._currentBounds.height) < this.bounds.top)
            ***REMOVED***
                sprite.y = this.bounds.bottom;
            ***REMOVED***
            else if (sprite.y > this.bounds.bottom)
            ***REMOVED***
                sprite.y = this.bounds.top;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* @name Phaser.World#width
* @property ***REMOVED***number***REMOVED*** width - Gets or sets the current width of the game world. The world can never be smaller than the game (canvas) dimensions.
*/
Object.defineProperty(Phaser.World.prototype, "width", ***REMOVED***

    get: function () ***REMOVED***
        return this.bounds.width;
    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value < this.game.width)
        ***REMOVED***
            value = this.game.width;
        ***REMOVED***

        this.bounds.width = value;
        this._width = value;
        this._definedSize = true;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.World#height
* @property ***REMOVED***number***REMOVED*** height - Gets or sets the current height of the game world. The world can never be smaller than the game (canvas) dimensions.
*/
Object.defineProperty(Phaser.World.prototype, "height", ***REMOVED***

    get: function () ***REMOVED***
        return this.bounds.height;
    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value < this.game.height)
        ***REMOVED***
            value = this.game.height;
        ***REMOVED***

        this.bounds.height = value;
        this._height = value;
        this._definedSize = true;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.World#centerX
* @property ***REMOVED***number***REMOVED*** centerX - Gets the X position corresponding to the center point of the world.
* @readonly
*/
Object.defineProperty(Phaser.World.prototype, "centerX", ***REMOVED***

    get: function () ***REMOVED***
        return this.bounds.halfWidth + this.bounds.x;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.World#centerY
* @property ***REMOVED***number***REMOVED*** centerY - Gets the Y position corresponding to the center point of the world.
* @readonly
*/
Object.defineProperty(Phaser.World.prototype, "centerY", ***REMOVED***

    get: function () ***REMOVED***
        return this.bounds.halfHeight + this.bounds.y;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.World#randomX
* @property ***REMOVED***number***REMOVED*** randomX - Gets a random integer which is lesser than or equal to the current width of the game world.
* @readonly
*/
Object.defineProperty(Phaser.World.prototype, "randomX", ***REMOVED***

    get: function () ***REMOVED***

        if (this.bounds.x < 0)
        ***REMOVED***
            return this.game.rnd.between(this.bounds.x, (this.bounds.width - Math.abs(this.bounds.x)));
        ***REMOVED***
        else
        ***REMOVED***
            return this.game.rnd.between(this.bounds.x, this.bounds.width);
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.World#randomY
* @property ***REMOVED***number***REMOVED*** randomY - Gets a random integer which is lesser than or equal to the current height of the game world.
* @readonly
*/
Object.defineProperty(Phaser.World.prototype, "randomY", ***REMOVED***

    get: function () ***REMOVED***

        if (this.bounds.y < 0)
        ***REMOVED***
            return this.game.rnd.between(this.bounds.y, (this.bounds.height - Math.abs(this.bounds.y)));
        ***REMOVED***
        else
        ***REMOVED***
            return this.game.rnd.between(this.bounds.y, this.bounds.height);
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* This is where the magic happens. The Game object is the heart of your game,
* providing quick access to common functions and handling the boot process.
* 
* "Hell, there are no rules here - we're trying to accomplish something."
*                                                       Thomas A. Edison
*
* @class Phaser.Game
* @constructor
* @param ***REMOVED***number|string***REMOVED*** [width=800] - The width of your game in game pixels. If given as a string the value must be between 0 and 100 and will be used as the percentage width of the parent container, or the browser window if no parent is given.
* @param ***REMOVED***number|string***REMOVED*** [height=600] - The height of your game in game pixels. If given as a string the value must be between 0 and 100 and will be used as the percentage height of the parent container, or the browser window if no parent is given.
* @param ***REMOVED***number***REMOVED*** [renderer=Phaser.AUTO] - Which renderer to use: Phaser.AUTO will auto-detect, Phaser.WEBGL, Phaser.CANVAS or Phaser.HEADLESS (no rendering at all).
* @param ***REMOVED***string|HTMLElement***REMOVED*** [parent=''] - The DOM element into which this games canvas will be injected. Either a DOM ID (string) or the element itself.
* @param ***REMOVED***object***REMOVED*** [state=null] - The default state object. A object consisting of Phaser.State functions (preload, create, update, render) or null.
* @param ***REMOVED***boolean***REMOVED*** [transparent=false] - Use a transparent canvas background or not.
* @param ***REMOVED***boolean***REMOVED*** [antialias=true] - Draw all image textures anti-aliased or not. The default is for smooth textures, but disable if your game features pixel art.
* @param ***REMOVED***object***REMOVED*** [physicsConfig=null] - A physics configuration object to pass to the Physics world on creation.
*/
Phaser.Game = function (width, height, renderer, parent, state, transparent, antialias, physicsConfig) ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** id - Phaser Game ID (for when Pixi supports multiple instances).
    * @readonly
    */
    this.id = Phaser.GAMES.push(this) - 1;

    /**
    * @property ***REMOVED***object***REMOVED*** config - The Phaser.Game configuration object.
    */
    this.config = null;

    /**
    * @property ***REMOVED***object***REMOVED*** physicsConfig - The Phaser.Physics.World configuration object.
    */
    this.physicsConfig = physicsConfig;

    /**
    * @property ***REMOVED***string|HTMLElement***REMOVED*** parent - The Games DOM parent.
    * @default
    */
    this.parent = '';

    /**
    * The current Game Width in pixels.
    *
    * _Do not modify this property directly:_ use ***REMOVED***@link Phaser.ScaleManager#setGameSize***REMOVED*** - eg. `game.scale.setGameSize(width, height)` - instead.
    *
    * @property ***REMOVED***integer***REMOVED*** width
    * @readonly
    * @default
    */
    this.width = 800;

    /**
    * The current Game Height in pixels.
    *
    * _Do not modify this property directly:_ use ***REMOVED***@link Phaser.ScaleManager#setGameSize***REMOVED*** - eg. `game.scale.setGameSize(width, height)` - instead.
    *
    * @property ***REMOVED***integer***REMOVED*** height
    * @readonly
    * @default
    */
    this.height = 600;

    /**
    * The resolution of your game. This value is read only, but can be changed at start time it via a game configuration object.
    *
    * @property ***REMOVED***integer***REMOVED*** resolution
    * @readonly
    * @default
    */
    this.resolution = 1;

    /**
    * @property ***REMOVED***integer***REMOVED*** _width - Private internal var.
    * @private
    */
    this._width = 800;

    /**
    * @property ***REMOVED***integer***REMOVED*** _height - Private internal var.
    * @private
    */
    this._height = 600;

    /**
    * @property ***REMOVED***boolean***REMOVED*** transparent - Use a transparent canvas background or not.
    * @default
    */
    this.transparent = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** antialias - Anti-alias graphics. By default scaled images are smoothed in Canvas and WebGL, set anti-alias to false to disable this globally.
    * @default
    */
    this.antialias = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** preserveDrawingBuffer - The value of the preserveDrawingBuffer flag affects whether or not the contents of the stencil buffer is retained after rendering.
    * @default
    */
    this.preserveDrawingBuffer = false;

    /**
    * Clear the Canvas each frame before rendering the display list.
    * You can set this to `false` to gain some performance if your game always contains a background that completely fills the display.
    * @property ***REMOVED***boolean***REMOVED*** clearBeforeRender
    * @default
    */
    this.clearBeforeRender = true;

    /**
    * @property ***REMOVED***PIXI.CanvasRenderer|PIXI.WebGLRenderer***REMOVED*** renderer - The Pixi Renderer.
    * @protected
    */
    this.renderer = null;

    /**
    * @property ***REMOVED***number***REMOVED*** renderType - The Renderer this game will use. Either Phaser.AUTO, Phaser.CANVAS, Phaser.WEBGL, or Phaser.HEADLESS.
    * @readonly
    */
    this.renderType = Phaser.AUTO;

    /**
    * @property ***REMOVED***Phaser.StateManager***REMOVED*** state - The StateManager.
    */
    this.state = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isBooted - Whether the game engine is booted, aka available.
    * @readonly
    */
    this.isBooted = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isRunning - Is game running or paused?
    * @readonly
    */
    this.isRunning = false;

    /**
    * @property ***REMOVED***Phaser.RequestAnimationFrame***REMOVED*** raf - Automatically handles the core game loop via requestAnimationFrame or setTimeout
    * @protected
    */
    this.raf = null;

    /**
    * @property ***REMOVED***Phaser.GameObjectFactory***REMOVED*** add - Reference to the Phaser.GameObjectFactory.
    */
    this.add = null;

    /**
    * @property ***REMOVED***Phaser.GameObjectCreator***REMOVED*** make - Reference to the GameObject Creator.
    */
    this.make = null;

    /**
    * @property ***REMOVED***Phaser.Cache***REMOVED*** cache - Reference to the assets cache.
    */
    this.cache = null;

    /**
    * @property ***REMOVED***Phaser.Input***REMOVED*** input - Reference to the input manager
    */
    this.input = null;

    /**
    * @property ***REMOVED***Phaser.Loader***REMOVED*** load - Reference to the assets loader.
    */
    this.load = null;

    /**
    * @property ***REMOVED***Phaser.Math***REMOVED*** math - Reference to the math helper.
    */
    this.math = null;

    /**
    * @property ***REMOVED***Phaser.Net***REMOVED*** net - Reference to the network class.
    */
    this.net = null;

    /**
    * @property ***REMOVED***Phaser.ScaleManager***REMOVED*** scale - The game scale manager.
    */
    this.scale = null;

    /**
    * @property ***REMOVED***Phaser.SoundManager***REMOVED*** sound - Reference to the sound manager.
    */
    this.sound = null;

    /**
    * @property ***REMOVED***Phaser.Stage***REMOVED*** stage - Reference to the stage.
    */
    this.stage = null;

    /**
    * @property ***REMOVED***Phaser.Time***REMOVED*** time - Reference to the core game clock.
    */
    this.time = null;

    /**
    * @property ***REMOVED***Phaser.TweenManager***REMOVED*** tweens - Reference to the tween manager.
    */
    this.tweens = null;

    /**
    * @property ***REMOVED***Phaser.World***REMOVED*** world - Reference to the world.
    */
    this.world = null;

    /**
    * @property ***REMOVED***Phaser.Physics***REMOVED*** physics - Reference to the physics manager.
    */
    this.physics = null;
    
    /**
    * @property ***REMOVED***Phaser.PluginManager***REMOVED*** plugins - Reference to the plugin manager.
    */
    this.plugins = null;

    /**
    * @property ***REMOVED***Phaser.RandomDataGenerator***REMOVED*** rnd - Instance of repeatable random data generator helper.
    */
    this.rnd = null;

    /**
    * @property ***REMOVED***Phaser.Device***REMOVED*** device - Contains device information and capabilities.
    */
    this.device = Phaser.Device;

    /**
    * @property ***REMOVED***Phaser.Camera***REMOVED*** camera - A handy reference to world.camera.
    */
    this.camera = null;

    /**
    * @property ***REMOVED***HTMLCanvasElement***REMOVED*** canvas - A handy reference to renderer.view, the canvas that the game is being rendered in to.
    */
    this.canvas = null;

    /**
    * @property ***REMOVED***CanvasRenderingContext2D***REMOVED*** context - A handy reference to renderer.context (only set for CANVAS games, not WebGL)
    */
    this.context = null;

    /**
    * @property ***REMOVED***Phaser.Utils.Debug***REMOVED*** debug - A set of useful debug utilities.
    */
    this.debug = null;

    /**
    * @property ***REMOVED***Phaser.Particles***REMOVED*** particles - The Particle Manager.
    */
    this.particles = null;

    /**
    * @property ***REMOVED***Phaser.Create***REMOVED*** create - The Asset Generator.
    */
    this.create = null;

    /**
    * If `false` Phaser will automatically render the display list every update. If `true` the render loop will be skipped.
    * You can toggle this value at run-time to gain exact control over when Phaser renders. This can be useful in certain types of game or application.
    * Please note that if you don't render the display list then none of the game object transforms will be updated, so use this value carefully.
    * @property ***REMOVED***boolean***REMOVED*** lockRender
    * @default
    */
    this.lockRender = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** stepping - Enable core loop stepping with Game.enableStep().
    * @default
    * @readonly
    */
    this.stepping = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** pendingStep - An internal property used by enableStep, but also useful to query from your own game objects.
    * @default
    * @readonly
    */
    this.pendingStep = false;

    /**
    * @property ***REMOVED***number***REMOVED*** stepCount - When stepping is enabled this contains the current step cycle.
    * @default
    * @readonly
    */
    this.stepCount = 0;

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onPause - This event is fired when the game pauses.
    */
    this.onPause = null;

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onResume - This event is fired when the game resumes from a paused state.
    */
    this.onResume = null;

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onBlur - This event is fired when the game no longer has focus (typically on page hide).
    */
    this.onBlur = null;

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onFocus - This event is fired when the game has focus (typically on page show).
    */
    this.onFocus = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _paused - Is game paused?
    * @private
    */
    this._paused = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _codePaused - Was the game paused via code or a visibility change?
    * @private
    */
    this._codePaused = false;

    /**
    * The ID of the current/last logic update applied this render frame, starting from 0.
    * The first update is `currentUpdateID === 0` and the last update is `currentUpdateID === updatesThisFrame.`
    * @property ***REMOVED***integer***REMOVED*** currentUpdateID
    * @protected
    */
    this.currentUpdateID = 0;

    /**
    * Number of logic updates expected to occur this render frame; will be 1 unless there are catch-ups required (and allowed).
    * @property ***REMOVED***integer***REMOVED*** updatesThisFrame
    * @protected
    */
    this.updatesThisFrame = 1;

    /**
    * @property ***REMOVED***number***REMOVED*** _deltaTime - Accumulate elapsed time until a logic update is due.
    * @private
    */
    this._deltaTime = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _lastCount - Remember how many 'catch-up' iterations were used on the logicUpdate last frame.
    * @private
    */
    this._lastCount = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _spiraling - If the 'catch-up' iterations are spiraling out of control, this counter is incremented.
    * @private
    */
    this._spiraling = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _kickstart - Force a logic update + render by default (always set on Boot and State swap)
    * @private
    */
    this._kickstart = true;

    /**
    * If the game is struggling to maintain the desired FPS, this signal will be dispatched.
    * The desired/chosen FPS should probably be closer to the ***REMOVED***@link Phaser.Time#suggestedFps***REMOVED*** value.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** fpsProblemNotifier
    * @public
    */
    this.fpsProblemNotifier = new Phaser.Signal();

    /**
    * @property ***REMOVED***boolean***REMOVED*** forceSingleUpdate - Should the game loop force a logic update, regardless of the delta timer? Set to true if you know you need this. You can toggle it on the fly.
    */
    this.forceSingleUpdate = true;

    /**
    * @property ***REMOVED***number***REMOVED*** _nextNotification - The soonest game.time.time value that the next fpsProblemNotifier can be dispatched.
    * @private
    */
    this._nextFpsNotification = 0;

    //  Parse the configuration object (if any)
    if (arguments.length === 1 && typeof arguments[0] === 'object')
    ***REMOVED***
        this.parseConfig(arguments[0]);
    ***REMOVED***
    else
    ***REMOVED***
        this.config = ***REMOVED*** enableDebug: true ***REMOVED***;

        if (typeof width !== 'undefined')
        ***REMOVED***
            this._width = width;
        ***REMOVED***

        if (typeof height !== 'undefined')
        ***REMOVED***
            this._height = height;
        ***REMOVED***

        if (typeof renderer !== 'undefined')
        ***REMOVED***
            this.renderType = renderer;
        ***REMOVED***

        if (typeof parent !== 'undefined')
        ***REMOVED***
            this.parent = parent;
        ***REMOVED***

        if (typeof transparent !== 'undefined')
        ***REMOVED***
            this.transparent = transparent;
        ***REMOVED***

        if (typeof antialias !== 'undefined')
        ***REMOVED***
            this.antialias = antialias;
        ***REMOVED***

        this.rnd = new Phaser.RandomDataGenerator([(Date.now() * Math.random()).toString()]);

        this.state = new Phaser.StateManager(this, state);
    ***REMOVED***

    this.device.whenReady(this.boot, this);

    return this;

***REMOVED***;

Phaser.Game.prototype = ***REMOVED***

    /**
    * Parses a Game configuration object.
    *
    * @method Phaser.Game#parseConfig
    * @protected
    */
    parseConfig: function (config) ***REMOVED***

        this.config = config;

        if (config['enableDebug'] === undefined)
        ***REMOVED***
            this.config.enableDebug = true;
        ***REMOVED***

        if (config['width'])
        ***REMOVED***
            this._width = config['width'];
        ***REMOVED***

        if (config['height'])
        ***REMOVED***
            this._height = config['height'];
        ***REMOVED***

        if (config['renderer'])
        ***REMOVED***
            this.renderType = config['renderer'];
        ***REMOVED***

        if (config['parent'])
        ***REMOVED***
            this.parent = config['parent'];
        ***REMOVED***

        if (config['transparent'] !== undefined)
        ***REMOVED***
            this.transparent = config['transparent'];
        ***REMOVED***

        if (config['antialias'] !== undefined)
        ***REMOVED***
            this.antialias = config['antialias'];
        ***REMOVED***

        if (config['resolution'])
        ***REMOVED***
            this.resolution = config['resolution'];
        ***REMOVED***

        if (config['preserveDrawingBuffer'] !== undefined)
        ***REMOVED***
            this.preserveDrawingBuffer = config['preserveDrawingBuffer'];
        ***REMOVED***

        if (config['physicsConfig'])
        ***REMOVED***
            this.physicsConfig = config['physicsConfig'];
        ***REMOVED***

        var seed = [(Date.now() * Math.random()).toString()];

        if (config['seed'])
        ***REMOVED***
            seed = config['seed'];
        ***REMOVED***

        this.rnd = new Phaser.RandomDataGenerator(seed);

        var state = null;

        if (config['state'])
        ***REMOVED***
            state = config['state'];
        ***REMOVED***

        this.state = new Phaser.StateManager(this, state);

    ***REMOVED***,

    /**
    * Initialize engine sub modules and start the game.
    *
    * @method Phaser.Game#boot
    * @protected
    */
    boot: function () ***REMOVED***

        if (this.isBooted)
        ***REMOVED***
            return;
        ***REMOVED***

        this.onPause = new Phaser.Signal();
        this.onResume = new Phaser.Signal();
        this.onBlur = new Phaser.Signal();
        this.onFocus = new Phaser.Signal();

        this.isBooted = true;

        PIXI.game = this;

        this.math = Phaser.Math;

        this.scale = new Phaser.ScaleManager(this, this._width, this._height);
        this.stage = new Phaser.Stage(this);

        this.setUpRenderer();

        this.world = new Phaser.World(this);
        this.add = new Phaser.GameObjectFactory(this);
        this.make = new Phaser.GameObjectCreator(this);
        this.cache = new Phaser.Cache(this);
        this.load = new Phaser.Loader(this);
        this.time = new Phaser.Time(this);
        this.tweens = new Phaser.TweenManager(this);
        this.input = new Phaser.Input(this);
        this.sound = new Phaser.SoundManager(this);
        this.physics = new Phaser.Physics(this, this.physicsConfig);
        this.particles = new Phaser.Particles(this);
        this.create = new Phaser.Create(this);
        this.plugins = new Phaser.PluginManager(this);
        this.net = new Phaser.Net(this);

        this.time.boot();
        this.stage.boot();
        this.world.boot();
        this.scale.boot();
        this.input.boot();
        this.sound.boot();
        this.state.boot();

        if (this.config['enableDebug'])
        ***REMOVED***
            this.debug = new Phaser.Utils.Debug(this);
            this.debug.boot();
        ***REMOVED***
        else
        ***REMOVED***
            this.debug = ***REMOVED*** preUpdate: function () ***REMOVED******REMOVED***, update: function () ***REMOVED******REMOVED***, reset: function () ***REMOVED******REMOVED*** ***REMOVED***;
        ***REMOVED***

        this.showDebugHeader();

        this.isRunning = true;

        if (this.config && this.config['forceSetTimeOut'])
        ***REMOVED***
            this.raf = new Phaser.RequestAnimationFrame(this, this.config['forceSetTimeOut']);
        ***REMOVED***
        else
        ***REMOVED***
            this.raf = new Phaser.RequestAnimationFrame(this, false);
        ***REMOVED***

        this._kickstart = true;

        if (window['focus'])
        ***REMOVED***
            if (!window['PhaserGlobal'] || (window['PhaserGlobal'] && !window['PhaserGlobal'].stopFocus))
            ***REMOVED***
                window.focus();
            ***REMOVED***
        ***REMOVED***

        this.raf.start();

    ***REMOVED***,

    /**
    * Displays a Phaser version debug header in the console.
    *
    * @method Phaser.Game#showDebugHeader
    * @protected
    */
    showDebugHeader: function () ***REMOVED***

        if (window['PhaserGlobal'] && window['PhaserGlobal'].hideBanner)
        ***REMOVED***
            return;
        ***REMOVED***

        var v = Phaser.VERSION;
        var r = 'Canvas';
        var a = 'HTML Audio';
        var c = 1;

        if (this.renderType === Phaser.WEBGL)
        ***REMOVED***
            r = 'WebGL';
            c++;
        ***REMOVED***
        else if (this.renderType === Phaser.HEADLESS)
        ***REMOVED***
            r = 'Headless';
        ***REMOVED***

        if (this.device.webAudio)
        ***REMOVED***
            a = 'WebAudio';
            c++;
        ***REMOVED***

        if (this.device.chrome)
        ***REMOVED***
            var args = [
                '%c %c %c Phaser v' + v + ' | Pixi.js | ' + r + ' | ' + a + '  %c %c ' + '%c http://phaser.io %c\u2665%c\u2665%c\u2665',
                'background: #fb8cb3',
                'background: #d44a52',
                'color: #ffffff; background: #871905;',
                'background: #d44a52',
                'background: #fb8cb3',
                'background: #ffffff'
            ];

            for (var i = 0; i < 3; i++)
            ***REMOVED***
                if (i < c)
                ***REMOVED***
                    args.push('color: #ff2424; background: #fff');
                ***REMOVED***
                else
                ***REMOVED***
                    args.push('color: #959595; background: #fff');
                ***REMOVED***
            ***REMOVED***

            console.log.apply(console, args);
        ***REMOVED***
        else if (window['console'])
        ***REMOVED***
            console.log('Phaser v' + v + ' | Pixi.js ' + PIXI.VERSION + ' | ' + r + ' | ' + a + ' | http://phaser.io');
        ***REMOVED***

    ***REMOVED***,

    /**
    * Checks if the device is capable of using the requested renderer and sets it up or an alternative if not.
    *
    * @method Phaser.Game#setUpRenderer
    * @protected
    */
    setUpRenderer: function () ***REMOVED***

        if (this.config['canvas'])
        ***REMOVED***
            this.canvas = this.config['canvas'];
        ***REMOVED***
        else
        ***REMOVED***
            this.canvas = Phaser.Canvas.create(this, this.width, this.height, this.config['canvasID'], true);
        ***REMOVED***

        if (this.config['canvasStyle'])
        ***REMOVED***
            this.canvas.style = this.config['canvasStyle'];
        ***REMOVED***
        else
        ***REMOVED***
            this.canvas.style['-webkit-full-screen'] = 'width: 100%; height: 100%';
        ***REMOVED***

        if (this.renderType === Phaser.HEADLESS || this.renderType === Phaser.CANVAS || (this.renderType === Phaser.AUTO && !this.device.webGL))
        ***REMOVED***
            if (this.device.canvas)
            ***REMOVED***
                //  They requested Canvas and their browser supports it
                this.renderType = Phaser.CANVAS;

                this.renderer = new PIXI.CanvasRenderer(this);

                this.context = this.renderer.context;
            ***REMOVED***
            else
            ***REMOVED***
                throw new Error('Phaser.Game - Cannot create Canvas or WebGL context, aborting.');
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  They requested WebGL and their browser supports it
            this.renderType = Phaser.WEBGL;

            this.renderer = new PIXI.WebGLRenderer(this);

            this.context = null;

            this.canvas.addEventListener('webglcontextlost', this.contextLost.bind(this), false);
            this.canvas.addEventListener('webglcontextrestored', this.contextRestored.bind(this), false);
        ***REMOVED***

        if (this.device.cocoonJS)
        ***REMOVED***
            this.canvas.screencanvas = (this.renderType === Phaser.CANVAS) ? true : false;
        ***REMOVED***

        if (this.renderType !== Phaser.HEADLESS)
        ***REMOVED***
            this.stage.smoothed = this.antialias;
            
            Phaser.Canvas.addToDOM(this.canvas, this.parent, false);
            Phaser.Canvas.setTouchAction(this.canvas);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Handles WebGL context loss.
    *
    * @method Phaser.Game#contextLost
    * @private
    * @param ***REMOVED***Event***REMOVED*** event - The webglcontextlost event.
    */
    contextLost: function (event) ***REMOVED***

        event.preventDefault();

        this.renderer.contextLost = true;

    ***REMOVED***,

    /**
    * Handles WebGL context restoration.
    *
    * @method Phaser.Game#contextRestored
    * @private
    */
    contextRestored: function () ***REMOVED***

        this.renderer.initContext();

        this.cache.clearGLTextures();

        this.renderer.contextLost = false;

    ***REMOVED***,

    /**
    * The core game loop.
    *
    * @method Phaser.Game#update
    * @protected
    * @param ***REMOVED***number***REMOVED*** time - The current time as provided by RequestAnimationFrame.
    */
    update: function (time) ***REMOVED***

        this.time.update(time);

        if (this._kickstart)
        ***REMOVED***
            this.updateLogic(this.time.desiredFpsMult);

            // call the game render update exactly once every frame
            this.updateRender(this.time.slowMotion * this.time.desiredFps);

            this._kickstart = false;

            return;
        ***REMOVED***

        // if the logic time is spiraling upwards, skip a frame entirely
        if (this._spiraling > 1 && !this.forceSingleUpdate)
        ***REMOVED***
            // cause an event to warn the program that this CPU can't keep up with the current desiredFps rate
            if (this.time.time > this._nextFpsNotification)
            ***REMOVED***
                // only permit one fps notification per 10 seconds
                this._nextFpsNotification = this.time.time + 10000;

                // dispatch the notification signal
                this.fpsProblemNotifier.dispatch();
            ***REMOVED***

            // reset the _deltaTime accumulator which will cause all pending dropped frames to be permanently skipped
            this._deltaTime = 0;
            this._spiraling = 0;

            // call the game render update exactly once every frame
            this.updateRender(this.time.slowMotion * this.time.desiredFps);
        ***REMOVED***
        else
        ***REMOVED***
            // step size taking into account the slow motion speed
            var slowStep = this.time.slowMotion * 1000.0 / this.time.desiredFps;

            // accumulate time until the slowStep threshold is met or exceeded... up to a limit of 3 catch-up frames at slowStep intervals
            this._deltaTime += Math.max(Math.min(slowStep * 3, this.time.elapsed), 0);

            // call the game update logic multiple times if necessary to "catch up" with dropped frames
            // unless forceSingleUpdate is true
            var count = 0;

            this.updatesThisFrame = Math.floor(this._deltaTime / slowStep);

            if (this.forceSingleUpdate)
            ***REMOVED***
                this.updatesThisFrame = Math.min(1, this.updatesThisFrame);
            ***REMOVED***

            while (this._deltaTime >= slowStep)
            ***REMOVED***
                this._deltaTime -= slowStep;
                this.currentUpdateID = count;

                this.updateLogic(this.time.desiredFpsMult);

                count++;

                if (this.forceSingleUpdate && count === 1)
                ***REMOVED***
                    break;
                ***REMOVED***
                else
                ***REMOVED***
                    this.time.refresh();
                ***REMOVED***
            ***REMOVED***

            // detect spiraling (if the catch-up loop isn't fast enough, the number of iterations will increase constantly)
            if (count > this._lastCount)
            ***REMOVED***
                this._spiraling++;
            ***REMOVED***
            else if (count < this._lastCount)
            ***REMOVED***
                // looks like it caught up successfully, reset the spiral alert counter
                this._spiraling = 0;
            ***REMOVED***

            this._lastCount = count;

            // call the game render update exactly once every frame unless we're playing catch-up from a spiral condition
            this.updateRender(this._deltaTime / slowStep);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Updates all logic subsystems in Phaser. Called automatically by Game.update.
    *
    * @method Phaser.Game#updateLogic
    * @protected
    * @param ***REMOVED***number***REMOVED*** timeStep - The current timeStep value as determined by Game.update.
    */
    updateLogic: function (timeStep) ***REMOVED***

        if (!this._paused && !this.pendingStep)
        ***REMOVED***
            if (this.stepping)
            ***REMOVED***
                this.pendingStep = true;
            ***REMOVED***

            this.scale.preUpdate();
            this.debug.preUpdate();
            this.camera.preUpdate();
            this.physics.preUpdate();
            this.state.preUpdate(timeStep);
            this.plugins.preUpdate(timeStep);
            this.stage.preUpdate();

            this.state.update();
            this.stage.update();
            this.tweens.update();
            this.sound.update();
            this.input.update();
            this.physics.update();
            this.particles.update();
            this.plugins.update();

            this.stage.postUpdate();
            this.plugins.postUpdate();
        ***REMOVED***
        else
        ***REMOVED***
            // Scaling and device orientation changes are still reflected when paused.
            this.scale.pauseUpdate();
            this.state.pauseUpdate();
            this.debug.preUpdate();
        ***REMOVED***

        this.stage.updateTransform();

    ***REMOVED***,

    /**
    * Runs the Render cycle.
    * It starts by calling State.preRender. In here you can do any last minute adjustments of display objects as required.
    * It then calls the renderer, which renders the entire display list, starting from the Stage object and working down.
    * It then calls plugin.render on any loaded plugins, in the order in which they were enabled.
    * After this State.render is called. Any rendering that happens here will take place on-top of the display list.
    * Finally plugin.postRender is called on any loaded plugins, in the order in which they were enabled.
    * This method is called automatically by Game.update, you don't need to call it directly.
    * Should you wish to have fine-grained control over when Phaser renders then use the `Game.lockRender` boolean.
    * Phaser will only render when this boolean is `false`.
    *
    * @method Phaser.Game#updateRender
    * @protected
    * @param ***REMOVED***number***REMOVED*** elapsedTime - The time elapsed since the last update.
    */
    updateRender: function (elapsedTime) ***REMOVED***

        if (this.lockRender)
        ***REMOVED***
            return;
        ***REMOVED***

        this.state.preRender(elapsedTime);

        if (this.renderType !== Phaser.HEADLESS)
        ***REMOVED***
            this.renderer.render(this.stage);

            this.plugins.render(elapsedTime);

            this.state.render(elapsedTime);
        ***REMOVED***

        this.plugins.postRender(elapsedTime);

    ***REMOVED***,

    /**
    * Enable core game loop stepping. When enabled you must call game.step() directly (perhaps via a DOM button?)
    * Calling step will advance the game loop by one frame. This is extremely useful for hard to track down errors!
    *
    * @method Phaser.Game#enableStep
    */
    enableStep: function () ***REMOVED***

        this.stepping = true;
        this.pendingStep = false;
        this.stepCount = 0;

    ***REMOVED***,

    /**
    * Disables core game loop stepping.
    *
    * @method Phaser.Game#disableStep
    */
    disableStep: function () ***REMOVED***

        this.stepping = false;
        this.pendingStep = false;

    ***REMOVED***,

    /**
    * When stepping is enabled you must call this function directly (perhaps via a DOM button?) to advance the game loop by one frame.
    * This is extremely useful to hard to track down errors! Use the internal stepCount property to monitor progress.
    *
    * @method Phaser.Game#step
    */
    step: function () ***REMOVED***

        this.pendingStep = false;
        this.stepCount++;

    ***REMOVED***,

    /**
    * Nukes the entire game from orbit.
    *
    * Calls destroy on Game.state, Game.sound, Game.scale, Game.stage, Game.input, Game.physics and Game.plugins.
    *
    * Then sets all of those local handlers to null, destroys the renderer, removes the canvas from the DOM
    * and resets the PIXI default renderer.
    *
    * @method Phaser.Game#destroy
    */
    destroy: function () ***REMOVED***

        this.raf.stop();

        this.state.destroy();
        this.sound.destroy();
        this.scale.destroy();
        this.stage.destroy();
        this.input.destroy();
        this.physics.destroy();
        this.plugins.destroy();

        this.state = null;
        this.sound = null;
        this.scale = null;
        this.stage = null;
        this.input = null;
        this.physics = null;
        this.plugins = null;

        this.cache = null;
        this.load = null;
        this.time = null;
        this.world = null;

        this.isBooted = false;

        this.renderer.destroy(false);

        Phaser.Canvas.removeFromDOM(this.canvas);

        PIXI.defaultRenderer = null;

        Phaser.GAMES[this.id] = null;

    ***REMOVED***,

    /**
    * Called by the Stage visibility handler.
    *
    * @method Phaser.Game#gamePaused
    * @param ***REMOVED***object***REMOVED*** event - The DOM event that caused the game to pause, if any.
    * @protected
    */
    gamePaused: function (event) ***REMOVED***

        //   If the game is already paused it was done via game code, so don't re-pause it
        if (!this._paused)
        ***REMOVED***
            this._paused = true;

            this.time.gamePaused();

            if (this.sound.muteOnPause)
            ***REMOVED***
                this.sound.setMute();
            ***REMOVED***

            this.onPause.dispatch(event);

            //  Avoids Cordova iOS crash event: https://github.com/photonstorm/phaser/issues/1800
            if (this.device.cordova && this.device.iOS)
            ***REMOVED***
                this.lockRender = true;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called by the Stage visibility handler.
    *
    * @method Phaser.Game#gameResumed
    * @param ***REMOVED***object***REMOVED*** event - The DOM event that caused the game to pause, if any.
    * @protected
    */
    gameResumed: function (event) ***REMOVED***

        //  Game is paused, but wasn't paused via code, so resume it
        if (this._paused && !this._codePaused)
        ***REMOVED***
            this._paused = false;

            this.time.gameResumed();

            this.input.reset();

            if (this.sound.muteOnPause)
            ***REMOVED***
                this.sound.unsetMute();
            ***REMOVED***

            this.onResume.dispatch(event);

            //  Avoids Cordova iOS crash event: https://github.com/photonstorm/phaser/issues/1800
            if (this.device.cordova && this.device.iOS)
            ***REMOVED***
                this.lockRender = false;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called by the Stage visibility handler.
    *
    * @method Phaser.Game#focusLoss
    * @param ***REMOVED***object***REMOVED*** event - The DOM event that caused the game to pause, if any.
    * @protected
    */
    focusLoss: function (event) ***REMOVED***

        this.onBlur.dispatch(event);

        if (!this.stage.disableVisibilityChange)
        ***REMOVED***
            this.gamePaused(event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called by the Stage visibility handler.
    *
    * @method Phaser.Game#focusGain
    * @param ***REMOVED***object***REMOVED*** event - The DOM event that caused the game to pause, if any.
    * @protected
    */
    focusGain: function (event) ***REMOVED***

        this.onFocus.dispatch(event);

        if (!this.stage.disableVisibilityChange)
        ***REMOVED***
            this.gameResumed(event);
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

Phaser.Game.prototype.constructor = Phaser.Game;

/**
* The paused state of the Game. A paused game doesn't update any of its subsystems.
* When a game is paused the onPause event is dispatched. When it is resumed the onResume event is dispatched.
* @name Phaser.Game#paused
* @property ***REMOVED***boolean***REMOVED*** paused - Gets and sets the paused state of the Game.
*/
Object.defineProperty(Phaser.Game.prototype, "paused", ***REMOVED***

    get: function () ***REMOVED***
        return this._paused;
    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value === true)
        ***REMOVED***
            if (this._paused === false)
            ***REMOVED***
                this._paused = true;
                this.sound.setMute();
                this.time.gamePaused();
                this.onPause.dispatch(this);
            ***REMOVED***
            this._codePaused = true;
        ***REMOVED***
        else
        ***REMOVED***
            if (this._paused)
            ***REMOVED***
                this._paused = false;
                this.input.reset();
                this.sound.unsetMute();
                this.time.gameResumed();
                this.onResume.dispatch(this);
            ***REMOVED***
            this._codePaused = false;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
 * 
 * "Deleted code is debugged code." - Jeff Sickel
 *
 * ヽ(〃＾▽＾〃)ﾉ
 * 
*/
