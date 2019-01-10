/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The CanvasRenderer draws the Stage and all its content onto a 2d canvas. This renderer should be used for browsers that do not support webGL.
 * Don't forget to add the CanvasRenderer.view to your DOM or you will not see anything :)
 *
 * @class CanvasRenderer
 * @constructor
 * @param game ***REMOVED***Phaser.Game***REMOVED*** A reference to the Phaser Game instance
 */
PIXI.CanvasRenderer = function (game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the Phaser Game instance.
    */
    this.game = game;

    if (!PIXI.defaultRenderer)
    ***REMOVED***
        PIXI.defaultRenderer = this;
    ***REMOVED***

    /**
     * The renderer type.
     *
     * @property type
     * @type Number
     */
    this.type = PIXI.CANVAS_RENDERER;

    /**
     * The resolution of the canvas.
     *
     * @property resolution
     * @type Number
     */
    this.resolution = game.resolution;

    /**
     * This sets if the CanvasRenderer will clear the canvas or not before the new render pass.
     * If the Stage is NOT transparent Pixi will use a canvas sized fillRect operation every frame to set the canvas background color.
     * If the Stage is transparent Pixi will use clearRect to clear the canvas every frame.
     * Disable this by setting this to false. For example if your game has a canvas filling background image you often don't need this set.
     *
     * @property clearBeforeRender
     * @type Boolean
     * @default
     */
    this.clearBeforeRender = game.clearBeforeRender;

    /**
     * Whether the render view is transparent
     *
     * @property transparent
     * @type Boolean
     */
    this.transparent = game.transparent;

    /**
     * Whether the render view should be resized automatically
     *
     * @property autoResize
     * @type Boolean
     */
    this.autoResize = false;

    /**
     * The width of the canvas view
     *
     * @property width
     * @type Number
     * @default 800
     */
    this.width = game.width * this.resolution;

    /**
     * The height of the canvas view
     *
     * @property height
     * @type Number
     * @default 600
     */
    this.height = game.height * this.resolution;

    /**
     * The canvas element that everything is drawn to.
     *
     * @property view
     * @type HTMLCanvasElement
     */
    this.view = game.canvas;

    /**
     * The canvas 2d context that everything is drawn with
     * @property context
     * @type CanvasRenderingContext2D
     */
    this.context = this.view.getContext("2d", ***REMOVED*** alpha: this.transparent ***REMOVED*** );

    /**
     * Boolean flag controlling canvas refresh.
     *
     * @property refresh
     * @type Boolean
     */
    this.refresh = true;

    /**
     * Internal var.
     *
     * @property count
     * @type Number
     */
    this.count = 0;

    /**
     * Instance of a PIXI.CanvasMaskManager, handles masking when using the canvas renderer
     * @property CanvasMaskManager
     * @type CanvasMaskManager
     */
    this.maskManager = new PIXI.CanvasMaskManager();

    /**
     * The render session is just a bunch of parameter used for rendering
     * @property renderSession
     * @type Object
     */
    this.renderSession = ***REMOVED***
        context: this.context,
        maskManager: this.maskManager,
        scaleMode: null,
        smoothProperty: Phaser.Canvas.getSmoothingPrefix(this.context),

        /**
         * If true Pixi will Math.floor() x/y values when rendering, stopping pixel interpolation.
         * Handy for crisp pixel art and speed on legacy devices.
         */
        roundPixels: false
    ***REMOVED***;

    this.mapBlendModes();
    
    this.resize(this.width, this.height);

***REMOVED***;

// constructor
PIXI.CanvasRenderer.prototype.constructor = PIXI.CanvasRenderer;

/**
 * Renders the DisplayObjectContainer, usually the Phaser.Stage, to this canvas view.
 *
 * @method render
 * @param root ***REMOVED***Phaser.Stage|PIXI.DisplayObjectContainer***REMOVED*** The root element to be rendered.
 */
PIXI.CanvasRenderer.prototype.render = function (root) ***REMOVED***

    this.context.setTransform(1, 0, 0, 1, 0, 0);

    this.context.globalAlpha = 1;

    this.renderSession.currentBlendMode = 0;
    this.renderSession.shakeX = this.game.camera._shake.x;
    this.renderSession.shakeY = this.game.camera._shake.y;

    this.context.globalCompositeOperation = 'source-over';

    if (navigator.isCocoonJS && this.view.screencanvas)
    ***REMOVED***
        this.context.fillStyle = "black";
        this.context.clear();
    ***REMOVED***
    
    if (this.clearBeforeRender)
    ***REMOVED***
        if (this.transparent)
        ***REMOVED***
            this.context.clearRect(0, 0, this.width, this.height);
        ***REMOVED***
        else if (root._bgColor)
        ***REMOVED***
            this.context.fillStyle = root._bgColor.rgba;
            this.context.fillRect(0, 0, this.width , this.height);
        ***REMOVED***
    ***REMOVED***
    
    this.renderDisplayObject(root);

***REMOVED***;


/**
 * Removes everything from the renderer and optionally removes the Canvas DOM element.
 *
 * @method destroy
 * @param [removeView=true] ***REMOVED***boolean***REMOVED*** Removes the Canvas element from the DOM.
 */
PIXI.CanvasRenderer.prototype.destroy = function (removeView) ***REMOVED***

    if (removeView === undefined) ***REMOVED*** removeView = true; ***REMOVED***

    if (removeView && this.view.parent)
    ***REMOVED***
        this.view.parent.removeChild(this.view);
    ***REMOVED***

    this.view = null;
    this.context = null;
    this.maskManager = null;
    this.renderSession = null;

***REMOVED***;

/**
 * Resizes the canvas view to the specified width and height
 *
 * @method resize
 * @param width ***REMOVED***Number***REMOVED*** the new width of the canvas view
 * @param height ***REMOVED***Number***REMOVED*** the new height of the canvas view
 */
PIXI.CanvasRenderer.prototype.resize = function (width, height) ***REMOVED***

    this.width = width * this.resolution;
    this.height = height * this.resolution;

    this.view.width = this.width;
    this.view.height = this.height;

    if (this.autoResize)
    ***REMOVED***
        this.view.style.width = this.width / this.resolution + "px";
        this.view.style.height = this.height / this.resolution + "px";
    ***REMOVED***

    if (this.renderSession.smoothProperty)
    ***REMOVED***
        this.context[this.renderSession.smoothProperty] = (this.renderSession.scaleMode === PIXI.scaleModes.LINEAR);
    ***REMOVED***

***REMOVED***;

/**
 * Renders a display object
 *
 * @method renderDisplayObject
 * @param displayObject ***REMOVED***DisplayObject***REMOVED*** The displayObject to render
 * @param context ***REMOVED***CanvasRenderingContext2D***REMOVED*** the context 2d method of the canvas
 * @param [matrix] ***REMOVED***Matrix***REMOVED*** Optional matrix to apply to the display object before rendering.
 * @private
 */
PIXI.CanvasRenderer.prototype.renderDisplayObject = function (displayObject, context, matrix) ***REMOVED***

    this.renderSession.context = context || this.context;
    this.renderSession.resolution = this.resolution;
    displayObject._renderCanvas(this.renderSession, matrix);

***REMOVED***;

/**
 * Maps Pixi blend modes to canvas blend modes.
 *
 * @method mapBlendModes
 * @private
 */
PIXI.CanvasRenderer.prototype.mapBlendModes = function () ***REMOVED***

    if (!PIXI.blendModesCanvas)
    ***REMOVED***
        var b = [];
        var modes = PIXI.blendModes;
        var useNew = PIXI.canUseNewCanvasBlendModes();

        b[modes.NORMAL] = 'source-over';
        b[modes.ADD] = 'lighter';
        b[modes.MULTIPLY] = (useNew) ? 'multiply' : 'source-over';
        b[modes.SCREEN] = (useNew) ? 'screen' : 'source-over';
        b[modes.OVERLAY] = (useNew) ? 'overlay' : 'source-over';
        b[modes.DARKEN] = (useNew) ? 'darken' : 'source-over';
        b[modes.LIGHTEN] = (useNew) ? 'lighten' : 'source-over';
        b[modes.COLOR_DODGE] = (useNew) ? 'color-dodge' : 'source-over';
        b[modes.COLOR_BURN] = (useNew) ? 'color-burn' : 'source-over';
        b[modes.HARD_LIGHT] = (useNew) ? 'hard-light' : 'source-over';
        b[modes.SOFT_LIGHT] = (useNew) ? 'soft-light' : 'source-over';
        b[modes.DIFFERENCE] = (useNew) ? 'difference' : 'source-over';
        b[modes.EXCLUSION] = (useNew) ? 'exclusion' : 'source-over';
        b[modes.HUE] = (useNew) ? 'hue' : 'source-over';
        b[modes.SATURATION] = (useNew) ? 'saturation' : 'source-over';
        b[modes.COLOR] = (useNew) ? 'color' : 'source-over';
        b[modes.LUMINOSITY] = (useNew) ? 'luminosity' : 'source-over';

        PIXI.blendModesCanvas = b;
    ***REMOVED***

***REMOVED***;
