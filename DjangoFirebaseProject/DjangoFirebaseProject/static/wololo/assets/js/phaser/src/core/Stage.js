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
