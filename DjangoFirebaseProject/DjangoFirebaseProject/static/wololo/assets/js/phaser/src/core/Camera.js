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
