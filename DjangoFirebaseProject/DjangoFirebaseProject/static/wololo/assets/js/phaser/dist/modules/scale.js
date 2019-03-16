/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* @classdesc
* The ScaleManager object handles the the scaling, resizing, and alignment of the
* Game size and the game Display canvas.
*
* The Game size is the logical size of the game; the Display canvas has size as an HTML element.
*
* The calculations of these are heavily influenced by the bounding Parent size which is the computed
* dimensions of the Display canvas's Parent container/element - the _effective CSS rules of the
* canvas's Parent element play an important role_ in the operation of the ScaleManager. 
*
* The Display canvas - or Game size, depending ***REMOVED***@link #scaleMode***REMOVED*** - is updated to best utilize the Parent size.
* When in Fullscreen mode or with ***REMOVED***@link #parentIsWindow***REMOVED*** the Parent size is that of the visual viewport (see ***REMOVED***@link Phaser.ScaleManager#getParentBounds getParentBounds***REMOVED***).
*
* Parent and Display canvas containment guidelines:
*
* - Style the Parent element (of the game canvas) to control the Parent size and
*   thus the Display canvas's size and layout.
*
* - The Parent element's CSS styles should _effectively_ apply maximum (and minimum) bounding behavior.
*
* - The Parent element should _not_ apply a padding as this is not accounted for.
*   If a padding is required apply it to the Parent's parent or apply a margin to the Parent.
*   If you need to add a border, margin or any other CSS around your game container, then use a parent element and
*   apply the CSS to this instead, otherwise you'll be constantly resizing the shape of the game container.
*
* - The Display canvas layout CSS styles (i.e. margins, size) should not be altered/specified as
*   they may be updated by the ScaleManager.
*
* @description
* Create a new ScaleManager object - this is done automatically by ***REMOVED***@link Phaser.Game***REMOVED***
*
* The `width` and `height` constructor parameters can either be a number which represents pixels or a string that represents a percentage: e.g. `800` (for 800 pixels) or `"80%"` for 80%.
*
* @class
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***number|string***REMOVED*** width - The width of the game. See above.
* @param ***REMOVED***number|string***REMOVED*** height - The height of the game. See above.
*/
Phaser.ScaleManager = function (game, width, height) ***REMOVED***

    /**
    * A reference to the currently running game.
    * @property ***REMOVED***Phaser.Game***REMOVED*** game
    * @protected
    * @readonly
    */
    this.game = game;

    /**
    * Provides access to some cross-device DOM functions.
    * @property ***REMOVED***Phaser.DOM***REMOVED*** dom
    * @protected
    * @readonly
    */
    this.dom = Phaser.DOM;

    /**
    * _EXPERIMENTAL:_ A responsive grid on which you can align game objects.
    * @property ***REMOVED***Phaser.FlexGrid***REMOVED*** grid
    * @public
    */
    this.grid = null;

    /**
    * Target width (in pixels) of the Display canvas.
    * @property ***REMOVED***number***REMOVED*** width
    * @readonly
    */
    this.width = 0;

    /**
    * Target height (in pixels) of the Display canvas.
    * @property ***REMOVED***number***REMOVED*** height
    * @readonly
    */
    this.height = 0;

    /**
    * Minimum width the canvas should be scaled to (in pixels).
    * Change with ***REMOVED***@link #setMinMax***REMOVED***.
    * @property ***REMOVED***?number***REMOVED*** minWidth
    * @readonly
    * @protected
    */
    this.minWidth = null;

    /**
    * Maximum width the canvas should be scaled to (in pixels).
    * If null it will scale to whatever width the browser can handle.
    * Change with ***REMOVED***@link #setMinMax***REMOVED***.
    * @property ***REMOVED***?number***REMOVED*** maxWidth
    * @readonly
    * @protected
    */
    this.maxWidth = null;

    /**
    * Minimum height the canvas should be scaled to (in pixels).
    * Change with ***REMOVED***@link #setMinMax***REMOVED***.
    * @property ***REMOVED***?number***REMOVED*** minHeight
    * @readonly
    * @protected
    */
    this.minHeight = null;

    /**
    * Maximum height the canvas should be scaled to (in pixels).
    * If null it will scale to whatever height the browser can handle.
    * Change with ***REMOVED***@link #setMinMax***REMOVED***.
    * @property ***REMOVED***?number***REMOVED*** maxHeight
    * @readonly
    * @protected
    */
    this.maxHeight = null;

    /**
    * The offset coordinates of the Display canvas from the top-left of the browser window.
    * The is used internally by Phaser.Pointer (for Input) and possibly other types.
    * @property ***REMOVED***Phaser.Point***REMOVED*** offset
    * @readonly
    * @protected
    */
    this.offset = new Phaser.Point();

    /**
    * If true, the game should only run in a landscape orientation.
    * Change with ***REMOVED***@link #forceOrientation***REMOVED***.
    * @property ***REMOVED***boolean***REMOVED*** forceLandscape
    * @readonly
    * @default
    * @protected
    */
    this.forceLandscape = false;

    /**
    * If true, the game should only run in a portrait 
    * Change with ***REMOVED***@link #forceOrientation***REMOVED***.
    * @property ***REMOVED***boolean***REMOVED*** forcePortrait
    * @readonly
    * @default
    * @protected
    */
    this.forcePortrait = false;

    /**
    * True if ***REMOVED***@link #forceLandscape***REMOVED*** or ***REMOVED***@link #forcePortrait***REMOVED*** are set and do not agree with the browser orientation.
    *
    * This value is not updated immediately.
    *
    * @property ***REMOVED***boolean***REMOVED*** incorrectOrientation    
    * @readonly
    * @protected
    */
    this.incorrectOrientation = false;

    /**
    * See ***REMOVED***@link #pageAlignHorizontally***REMOVED***.
    * @property ***REMOVED***boolean***REMOVED*** _pageAlignHorizontally
    * @private
    */
    this._pageAlignHorizontally = false;

    /**
    * See ***REMOVED***@link #pageAlignVertically***REMOVED***.
    * @property ***REMOVED***boolean***REMOVED*** _pageAlignVertically
    * @private
    */
    this._pageAlignVertically = false;

    /**
    * This signal is dispatched when the orientation changes _or_ the validity of the current orientation changes.
    * 
    * The signal is supplied with the following arguments:
    * - `scale` - the ScaleManager object
    * - `prevOrientation`, a string - The previous orientation as per ***REMOVED***@link Phaser.ScaleManager#screenOrientation screenOrientation***REMOVED***.
    * - `wasIncorrect`, a boolean - True if the previous orientation was last determined to be incorrect.
    *
    * Access the current orientation and validity with `scale.screenOrientation` and `scale.incorrectOrientation`.
    * Thus the following tests can be done:
    *
    *     // The orientation itself changed:
    *     scale.screenOrientation !== prevOrientation
    *     // The orientation just became incorrect:
    *     scale.incorrectOrientation && !wasIncorrect
    *
    * It is possible that this signal is triggered after ***REMOVED***@link #forceOrientation***REMOVED*** so the orientation
    * correctness changes even if the orientation itself does not change.
    *
    * This is signaled from `preUpdate` (or `pauseUpdate`) _even when_ the game is paused.
    *
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onOrientationChange
    * @public
    */
    this.onOrientationChange = new Phaser.Signal();

    /**
    * This signal is dispatched when the browser enters an incorrect orientation, as defined by ***REMOVED***@link #forceOrientation***REMOVED***.
    *
    * This is signaled from `preUpdate` (or `pauseUpdate`) _even when_ the game is paused.
    *
    * @property ***REMOVED***Phaser.Signal***REMOVED*** enterIncorrectOrientation
    * @public
    */
    this.enterIncorrectOrientation = new Phaser.Signal();

    /**
    * This signal is dispatched when the browser leaves an incorrect orientation, as defined by ***REMOVED***@link #forceOrientation***REMOVED***.
    *
    * This is signaled from `preUpdate` (or `pauseUpdate`) _even when_ the game is paused.
    *
    * @property ***REMOVED***Phaser.Signal***REMOVED*** leaveIncorrectOrientation
    * @public
    */
    this.leaveIncorrectOrientation = new Phaser.Signal();

    /**
    * This boolean provides you with a way to determine if the browser is in Full Screen
    * mode (via the Full Screen API), and Phaser was the one responsible for activating it.
    *
    * It's possible that ScaleManager.isFullScreen returns `true` even if Phaser wasn't the
    * one that made the browser go full-screen, so this flag lets you determine that.
    * 
    * @property ***REMOVED***boolean***REMOVED*** hasPhaserSetFullScreen
    * @default
    */
    this.hasPhaserSetFullScreen = false;

    /**
    * If specified, this is the DOM element on which the Fullscreen API enter request will be invoked.
    * The target element must have the correct CSS styling and contain the Display canvas.
    *
    * The elements style will be modified (ie. the width and height might be set to 100%)
    * but it will not be added to, removed from, or repositioned within the DOM.
    * An attempt is made to restore relevant style changes when fullscreen mode is left.
    *
    * For pre-2.2.0 behavior set `game.scale.fullScreenTarget = game.canvas`.
    *
    * @property ***REMOVED***?DOMElement***REMOVED*** fullScreenTarget
    * @default
    */
    this.fullScreenTarget = null;

    /**
    * The fullscreen target, as created by ***REMOVED***@link #createFullScreenTarget***REMOVED***.
    * This is not set if ***REMOVED***@link #fullScreenTarget***REMOVED*** is used and is cleared when fullscreen mode ends.
    * @property ***REMOVED***?DOMElement***REMOVED*** _createdFullScreenTarget
    * @private
    */
    this._createdFullScreenTarget = null;

    /**
    * This signal is dispatched when fullscreen mode is ready to be initialized but
    * before the fullscreen request.
    *
    * The signal is passed two arguments: `scale` (the ScaleManager), and an object in the form `***REMOVED***targetElement: DOMElement***REMOVED***`.
    *
    * The `targetElement` is the ***REMOVED***@link #fullScreenTarget***REMOVED*** element,
    * if such is assigned, or a new element created by ***REMOVED***@link #createFullScreenTarget***REMOVED***.
    *
    * Custom CSS styling or resets can be applied to `targetElement` as required.
    *
    * If `targetElement` is _not_ the same element as ***REMOVED***@link #fullScreenTarget***REMOVED***:
    * - After initialization the Display canvas is moved onto the `targetElement` for
    *   the duration of the fullscreen mode, and restored to it's original DOM location when fullscreen is exited.
    * - The `targetElement` is moved/re-parented within the DOM and may have its CSS styles updated.
    *
    * The behavior of a pre-assigned target element is covered in ***REMOVED***@link Phaser.ScaleManager#fullScreenTarget fullScreenTarget***REMOVED***.
    *
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onFullScreenInit
    * @public
    */
    this.onFullScreenInit = new Phaser.Signal();

    /**
    * This signal is dispatched when the browser enters or leaves fullscreen mode, if supported.
    *
    * The signal is supplied with a single argument: `scale` (the ScaleManager). Use `scale.isFullScreen` to determine
    * if currently running in Fullscreen mode.
    *
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onFullScreenChange
    * @public    
    */
    this.onFullScreenChange = new Phaser.Signal();

    /**
    * This signal is dispatched when the browser fails to enter fullscreen mode;
    * or if the device does not support fullscreen mode and `startFullScreen` is invoked.
    *
    * The signal is supplied with a single argument: `scale` (the ScaleManager).
    *
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onFullScreenError
    * @public
    */
    this.onFullScreenError = new Phaser.Signal();

    /**
    * The _last known_ orientation of the screen, as defined in the Window Screen Web API.
    * See ***REMOVED***@link Phaser.DOM.getScreenOrientation***REMOVED*** for possible values.
    *
    * @property ***REMOVED***string***REMOVED*** screenOrientation
    * @readonly
    * @public
    */
    this.screenOrientation = this.dom.getScreenOrientation();

    /**
    * The _current_ scale factor based on the game dimensions vs. the scaled dimensions.
    * @property ***REMOVED***Phaser.Point***REMOVED*** scaleFactor
    * @readonly
    */
    this.scaleFactor = new Phaser.Point(1, 1);

    /**
    * The _current_ inversed scale factor. The displayed dimensions divided by the game dimensions.
    * @property ***REMOVED***Phaser.Point***REMOVED*** scaleFactorInversed
    * @readonly
    * @protected
    */
    this.scaleFactorInversed = new Phaser.Point(1, 1);

    /**
    * The Display canvas is aligned by adjusting the margins; the last margins are stored here.
    *
    * @property ***REMOVED***Bounds-like***REMOVED*** margin
    * @readonly
    * @protected
    */
    this.margin = ***REMOVED***left: 0, top: 0, right: 0, bottom: 0, x: 0, y: 0***REMOVED***;

    /**
    * The bounds of the scaled game. The x/y will match the offset of the canvas element and the width/height the scaled width and height.
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** bounds
    * @readonly
    */
    this.bounds = new Phaser.Rectangle();

    /**
    * The aspect ratio of the scaled Display canvas.
    * @property ***REMOVED***number***REMOVED*** aspectRatio
    * @readonly
    */
    this.aspectRatio = 0;

    /**
    * The aspect ratio of the original game dimensions.
    * @property ***REMOVED***number***REMOVED*** sourceAspectRatio
    * @readonly
    */
    this.sourceAspectRatio = 0;

    /**
    * The native browser events from Fullscreen API changes.
    * @property ***REMOVED***any***REMOVED*** event
    * @readonly
    * @private
    */
    this.event = null;

    /**
    * The edges on which to constrain the game Display/canvas in _addition_ to the restrictions of the parent container.
    *
    * The properties are strings and can be '', 'visual', 'layout', or 'layout-soft'.
    * - If 'visual', the edge will be constrained to the Window / displayed screen area
    * - If 'layout', the edge will be constrained to the CSS Layout bounds
    * - An invalid value is treated as 'visual'
    *
    * @member
    * @property ***REMOVED***string***REMOVED*** bottom
    * @property ***REMOVED***string***REMOVED*** right
    * @default
    */
    this.windowConstraints = ***REMOVED***
        right: 'layout',
        bottom: ''
    ***REMOVED***;

    /**
    * Various compatibility settings.
    * A value of "(auto)" indicates the setting is configured based on device and runtime information.
    *
    * A ***REMOVED***@link #refresh***REMOVED*** may need to be performed after making changes.
    *
    * @protected
    * 
    * @property ***REMOVED***boolean***REMOVED*** [supportsFullScreen=(auto)] - True only if fullscreen support will be used. (Changing to fullscreen still might not work.)
    *
    * @property ***REMOVED***boolean***REMOVED*** [orientationFallback=(auto)] - See ***REMOVED***@link Phaser.DOM.getScreenOrientation***REMOVED***.
    *
    * @property ***REMOVED***boolean***REMOVED*** [noMargins=false] - If true then the Display canvas's margins will not be updated anymore: existing margins must be manually cleared. Disabling margins prevents automatic canvas alignment/centering, possibly in fullscreen.
    *
    * @property ***REMOVED***?Phaser.Point***REMOVED*** [scrollTo=(auto)] - If specified the window will be scrolled to this position on every refresh.
    *
    * @property ***REMOVED***boolean***REMOVED*** [forceMinimumDocumentHeight=false] - If enabled the document elements minimum height is explicitly set on updates.
    *    The height set varies by device and may either be the height of the window or the viewport.
    *
    * @property ***REMOVED***boolean***REMOVED*** [canExpandParent=true] - If enabled then SHOW_ALL and USER_SCALE modes can try and expand the parent element. It may be necessary for the parent element to impose CSS width/height restrictions.
    *
    * @property ***REMOVED***string***REMOVED*** [clickTrampoline=(auto)] - On certain browsers (eg. IE) FullScreen events need to be triggered via 'click' events.
    *     A value of 'when-not-mouse' uses a click trampoline when a pointer that is not the primary mouse is used.
    *     Any other string value (including the empty string) prevents using click trampolines.
    *     For more details on click trampolines see ***REMOVED***@link Phaser.Pointer#addClickTrampoline***REMOVED***.
    */
    this.compatibility = ***REMOVED***
        supportsFullScreen: false,
        orientationFallback: null,
        noMargins: false,
        scrollTo: null,
        forceMinimumDocumentHeight: false,
        canExpandParent: true,
        clickTrampoline: ''
    ***REMOVED***;

    /**
    * Scale mode to be used when not in fullscreen.
    * @property ***REMOVED***number***REMOVED*** _scaleMode
    * @private
    */
    this._scaleMode = Phaser.ScaleManager.NO_SCALE;

    /*
    * Scale mode to be used in fullscreen.
    * @property ***REMOVED***number***REMOVED*** _fullScreenScaleMode
    * @private
    */
    this._fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

    /**
    * If the parent container of the Game canvas is the browser window itself (i.e. document.body),
    * rather than another div, this should set to `true`.
    *
    * The ***REMOVED***@link #parentNode***REMOVED*** property is generally ignored while this is in effect.
    *
    * @property ***REMOVED***boolean***REMOVED*** parentIsWindow
    */
    this.parentIsWindow = false;

    /**
    * The _original_ DOM element for the parent of the Display canvas.
    * This may be different in fullscreen - see ***REMOVED***@link #createFullScreenTarget***REMOVED***.
    *
    * This should only be changed after moving the Game canvas to a different DOM parent.
    *
    * @property ***REMOVED***?DOMElement***REMOVED*** parentNode
    */
    this.parentNode = null;

    /**
    * The scale of the game in relation to its parent container.
    * @property ***REMOVED***Phaser.Point***REMOVED*** parentScaleFactor
    * @readonly
    */
    this.parentScaleFactor = new Phaser.Point(1, 1);

    /**
    * The maximum time (in ms) between dimension update checks for the Canvas's parent element (or window).
    * Update checks normally happen quicker in response to other events.
    *
    * @property ***REMOVED***integer***REMOVED*** trackParentInterval
    * @default
    * @protected
    * @see ***REMOVED***@link Phaser.ScaleManager#refresh refresh***REMOVED***
    */
    this.trackParentInterval = 2000;

    /**
    * This signal is dispatched when the size of the Display canvas changes _or_ the size of the Game changes. 
    * When invoked this is done _after_ the Canvas size/position have been updated.
    *
    * This signal is _only_ called when a change occurs and a reflow may be required.
    * For example, if the canvas does not change sizes because of CSS settings (such as min-width)
    * then this signal will _not_ be triggered.
    *
    * Use this to handle responsive game layout options.
    *
    * This is signaled from `preUpdate` (or `pauseUpdate`) _even when_ the game is paused.
    *
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onSizeChange
    * @todo Formalize the arguments, if any, supplied to this signal.
    */
    this.onSizeChange = new Phaser.Signal();

    /**
    * The callback that will be called each the parent container resizes.
    * @property ***REMOVED***function***REMOVED*** onResize
    * @private
    */
    this.onResize = null;

    /**
    * The context in which the ***REMOVED***@link #onResize***REMOVED*** callback will be called.
    * @property ***REMOVED***object***REMOVED*** onResizeContext
    * @private
    */
    this.onResizeContext = null;

    /**
    * @property ***REMOVED***integer***REMOVED*** _pendingScaleMode - Used to retain the scale mode if set from config before Boot.
    * @private
    */
    this._pendingScaleMode = null;

    /**
    * Information saved when fullscreen mode is started.
    * @property ***REMOVED***?object***REMOVED*** _fullScreenRestore
    * @private
    */
    this._fullScreenRestore = null;

    /**
    * The _actual_ game dimensions, as initially set or set by ***REMOVED***@link #setGameSize***REMOVED***.
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** _gameSize
    * @private
    */
    this._gameSize = new Phaser.Rectangle();

    /**
    * The user-supplied scale factor, used with the USER_SCALE scaling mode.
    * @property ***REMOVED***Phaser.Point***REMOVED*** _userScaleFactor
    * @private
    */
    this._userScaleFactor = new Phaser.Point(1, 1);

    /**
    * The user-supplied scale trim, used with the USER_SCALE scaling mode.
    * @property ***REMOVED***Phaser.Point***REMOVED*** _userScaleTrim
    * @private
    */
    this._userScaleTrim = new Phaser.Point(0, 0);

    /**
    * The last time the bounds were checked in `preUpdate`.
    * @property ***REMOVED***number***REMOVED*** _lastUpdate
    * @private
    */
    this._lastUpdate = 0;

    /**
    * Size checks updates are delayed according to the throttle.
    * The throttle increases to `trackParentInterval` over time and is used to more
    * rapidly detect changes in certain browsers (eg. IE) while providing back-off safety.
    * @property ***REMOVED***integer***REMOVED*** _updateThrottle
    * @private
    */
    this._updateThrottle = 0;

    /**
    * The minimum throttle allowed until it has slowed down sufficiently.
    * @property ***REMOVED***integer***REMOVED*** _updateThrottleReset   
    * @private
    */
    this._updateThrottleReset = 100;

    /**
    * The cached result of the parent (possibly window) bounds; used to invalidate sizing.
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** _parentBounds
    * @private
    */
    this._parentBounds = new Phaser.Rectangle();

    /**
    * Temporary bounds used for internal work to cut down on new objects created.
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** _parentBounds
    * @private
    */
    this._tempBounds = new Phaser.Rectangle();

    /**
    * The Canvas size at which the last onSizeChange signal was triggered.
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** _lastReportedCanvasSize
    * @private
    */
    this._lastReportedCanvasSize = new Phaser.Rectangle();

    /**
    * The Game size at which the last onSizeChange signal was triggered.
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** _lastReportedGameSize
    * @private
    */
    this._lastReportedGameSize = new Phaser.Rectangle();

    /**
    * @property ***REMOVED***boolean***REMOVED*** _booted - ScaleManager booted state.
    * @private
    */
    this._booted = false;

    if (game.config)
    ***REMOVED***
        this.parseConfig(game.config);
    ***REMOVED***

    this.setupScale(width, height);

***REMOVED***;

/**
* A scale mode that stretches content to fill all available space - see ***REMOVED***@link Phaser.ScaleManager#scaleMode scaleMode***REMOVED***.
*
* @constant
* @type ***REMOVED***integer***REMOVED***
*/
Phaser.ScaleManager.EXACT_FIT = 0;

/**
* A scale mode that prevents any scaling - see ***REMOVED***@link Phaser.ScaleManager#scaleMode scaleMode***REMOVED***.
*
* @constant
* @type ***REMOVED***integer***REMOVED***
*/
Phaser.ScaleManager.NO_SCALE = 1;

/**
* A scale mode that shows the entire game while maintaining proportions - see ***REMOVED***@link Phaser.ScaleManager#scaleMode scaleMode***REMOVED***.
*
* @constant
* @type ***REMOVED***integer***REMOVED***
*/
Phaser.ScaleManager.SHOW_ALL = 2;

/**
* A scale mode that causes the Game size to change - see ***REMOVED***@link Phaser.ScaleManager#scaleMode scaleMode***REMOVED***.
*
* @constant
* @type ***REMOVED***integer***REMOVED***
*/
Phaser.ScaleManager.RESIZE = 3;

/**
* A scale mode that allows a custom scale factor - see ***REMOVED***@link Phaser.ScaleManager#scaleMode scaleMode***REMOVED***.
*
* @constant
* @type ***REMOVED***integer***REMOVED***
*/
Phaser.ScaleManager.USER_SCALE = 4;

Phaser.ScaleManager.prototype = ***REMOVED***

    /**
    * Start the ScaleManager.
    * 
    * @method Phaser.ScaleManager#boot
    * @protected
    */
    boot: function () ***REMOVED***

        // Configure device-dependent compatibility

        var compat = this.compatibility;
        
        compat.supportsFullScreen = this.game.device.fullscreen && !this.game.device.cocoonJS;

        //  We can't do anything about the status bars in iPads, web apps or desktops
        if (!this.game.device.iPad && !this.game.device.webApp && !this.game.device.desktop)
        ***REMOVED***
            if (this.game.device.android && !this.game.device.chrome)
            ***REMOVED***
                compat.scrollTo = new Phaser.Point(0, 1);
            ***REMOVED***
            else
            ***REMOVED***
                compat.scrollTo = new Phaser.Point(0, 0);
            ***REMOVED***
        ***REMOVED***

        if (this.game.device.desktop)
        ***REMOVED***
            compat.orientationFallback = 'screen';
            compat.clickTrampoline = 'when-not-mouse';
        ***REMOVED***
        else
        ***REMOVED***
            compat.orientationFallback = '';
            compat.clickTrampoline = '';
        ***REMOVED***

        // Configure event listeners

        var _this = this;

        this._orientationChange = function(event) ***REMOVED***
            return _this.orientationChange(event);
        ***REMOVED***;

        this._windowResize = function(event) ***REMOVED***
            return _this.windowResize(event);
        ***REMOVED***;

        // This does not appear to be on the standards track
        window.addEventListener('orientationchange', this._orientationChange, false);
        window.addEventListener('resize', this._windowResize, false);

        if (this.compatibility.supportsFullScreen)
        ***REMOVED***
            this._fullScreenChange = function(event) ***REMOVED***
                return _this.fullScreenChange(event);
            ***REMOVED***;

            this._fullScreenError = function(event) ***REMOVED***
                return _this.fullScreenError(event);
            ***REMOVED***;

            document.addEventListener('webkitfullscreenchange', this._fullScreenChange, false);
            document.addEventListener('mozfullscreenchange', this._fullScreenChange, false);
            document.addEventListener('MSFullscreenChange', this._fullScreenChange, false);
            document.addEventListener('fullscreenchange', this._fullScreenChange, false);

            document.addEventListener('webkitfullscreenerror', this._fullScreenError, false);
            document.addEventListener('mozfullscreenerror', this._fullScreenError, false);
            document.addEventListener('MSFullscreenError', this._fullScreenError, false);
            document.addEventListener('fullscreenerror', this._fullScreenError, false);
        ***REMOVED***

        this.game.onResume.add(this._gameResumed, this);

        // Initialize core bounds

        this.dom.getOffset(this.game.canvas, this.offset);

        this.bounds.setTo(this.offset.x, this.offset.y, this.width, this.height);

        this.setGameSize(this.game.width, this.game.height);

        // Don't use updateOrientationState so events are not fired
        this.screenOrientation = this.dom.getScreenOrientation(this.compatibility.orientationFallback);

        if (Phaser.FlexGrid)
        ***REMOVED***
            this.grid = new Phaser.FlexGrid(this, this.width, this.height);
        ***REMOVED***

        this._booted = true;

        if (this._pendingScaleMode !== null)
        ***REMOVED***
            this.scaleMode = this._pendingScaleMode;
            this._pendingScaleMode = null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Load configuration settings.
    * 
    * @method Phaser.ScaleManager#parseConfig
    * @protected
    * @param ***REMOVED***object***REMOVED*** config - The game configuration object.
    */
    parseConfig: function (config) ***REMOVED***

        if (config['scaleMode'] !== undefined)
        ***REMOVED***
            if (this._booted)
            ***REMOVED***
                this.scaleMode = config['scaleMode'];
            ***REMOVED***
            else
            ***REMOVED***
                this._pendingScaleMode = config['scaleMode'];
            ***REMOVED***
        ***REMOVED***

        if (config['fullScreenScaleMode'] !== undefined)
        ***REMOVED***
            this.fullScreenScaleMode = config['fullScreenScaleMode'];
        ***REMOVED***

        if (config['fullScreenTarget'])
        ***REMOVED***
            this.fullScreenTarget = config['fullScreenTarget'];
        ***REMOVED***

    ***REMOVED***,

    /**
    * Calculates and sets the game dimensions based on the given width and height.
    *
    * This should _not_ be called when in fullscreen mode.
    * 
    * @method Phaser.ScaleManager#setupScale
    * @protected
    * @param ***REMOVED***number|string***REMOVED*** width - The width of the game.
    * @param ***REMOVED***number|string***REMOVED*** height - The height of the game.
    */
    setupScale: function (width, height) ***REMOVED***

        var target;
        var rect = new Phaser.Rectangle();

        if (this.game.parent !== '')
        ***REMOVED***
            if (typeof this.game.parent === 'string')
            ***REMOVED***
                // hopefully an element ID
                target = document.getElementById(this.game.parent);
            ***REMOVED***
            else if (this.game.parent && this.game.parent.nodeType === 1)
            ***REMOVED***
                // quick test for a HTMLelement
                target = this.game.parent;
            ***REMOVED***
        ***REMOVED***

        // Fallback, covers an invalid ID and a non HTMLelement object
        if (!target)
        ***REMOVED***
            //  Use the full window
            this.parentNode = null;
            this.parentIsWindow = true;

            rect.width = this.dom.visualBounds.width;
            rect.height = this.dom.visualBounds.height;

            this.offset.set(0, 0);
        ***REMOVED***
        else
        ***REMOVED***
            this.parentNode = target;
            this.parentIsWindow = false;

            this.getParentBounds(this._parentBounds);

            rect.width = this._parentBounds.width;
            rect.height = this._parentBounds.height;

            this.offset.set(this._parentBounds.x, this._parentBounds.y);
        ***REMOVED***

        var newWidth = 0;
        var newHeight = 0;

        if (typeof width === 'number')
        ***REMOVED***
            newWidth = width;
        ***REMOVED***
        else
        ***REMOVED***
            //  Percentage based
            this.parentScaleFactor.x = parseInt(width, 10) / 100;
            newWidth = rect.width * this.parentScaleFactor.x;
        ***REMOVED***

        if (typeof height === 'number')
        ***REMOVED***
            newHeight = height;
        ***REMOVED***
        else
        ***REMOVED***
            //  Percentage based
            this.parentScaleFactor.y = parseInt(height, 10) / 100;
            newHeight = rect.height * this.parentScaleFactor.y;
        ***REMOVED***

        newWidth = Math.floor(newWidth);
        newHeight = Math.floor(newHeight);

        this._gameSize.setTo(0, 0, newWidth, newHeight);

        this.updateDimensions(newWidth, newHeight, false);

    ***REMOVED***,

    /**
    * Invoked when the game is resumed.
    * 
    * @method Phaser.ScaleManager#_gameResumed
    * @private
    */
    _gameResumed: function () ***REMOVED***

        this.queueUpdate(true);

    ***REMOVED***,

    /**
    * Set the actual Game size.
    * Use this instead of directly changing `game.width` or `game.height`.
    *
    * The actual physical display (Canvas element size) depends on various settings including
    * - Scale mode
    * - Scaling factor
    * - Size of Canvas's parent element or CSS rules such as min-height/max-height;
    * - The size of the Window
    *
    * @method Phaser.ScaleManager#setGameSize
    * @public
    * @param ***REMOVED***integer***REMOVED*** width - _Game width_, in pixels.
    * @param ***REMOVED***integer***REMOVED*** height - _Game height_, in pixels.
    */
    setGameSize: function (width, height) ***REMOVED***

        this._gameSize.setTo(0, 0, width, height);
        
        if (this.currentScaleMode !== Phaser.ScaleManager.RESIZE)
        ***REMOVED***
            this.updateDimensions(width, height, true);
        ***REMOVED***

        this.queueUpdate(true);

    ***REMOVED***,

    /**
    * Set a User scaling factor used in the USER_SCALE scaling mode.
    *
    * The target canvas size is computed by:
    *
    *     canvas.width = (game.width * hScale) - hTrim
    *     canvas.height = (game.height * vScale) - vTrim
    *
    * This method can be used in the ***REMOVED***@link Phaser.ScaleManager#setResizeCallback resize callback***REMOVED***.
    *
    * @method Phaser.ScaleManager#setUserScale
    * @param ***REMOVED***number***REMOVED*** hScale - Horizontal scaling factor.
    * @param ***REMOVED***numer***REMOVED*** vScale - Vertical scaling factor.
    * @param ***REMOVED***integer***REMOVED*** [hTrim=0] - Horizontal trim, applied after scaling.
    * @param ***REMOVED***integer***REMOVED*** [vTrim=0] - Vertical trim, applied after scaling.
    */
    setUserScale: function (hScale, vScale, hTrim, vTrim) ***REMOVED***

        this._userScaleFactor.setTo(hScale, vScale);
        this._userScaleTrim.setTo(hTrim | 0, vTrim | 0);
        this.queueUpdate(true);

    ***REMOVED***,

    /**
    * Sets the callback that will be invoked before sizing calculations.
    *
    * This is the appropriate place to call ***REMOVED***@link #setUserScale***REMOVED*** if needing custom dynamic scaling.
    *
    * The callback is supplied with two arguments `scale` and `parentBounds` where `scale` is the ScaleManager
    * and `parentBounds`, a Phaser.Rectangle, is the size of the Parent element.
    *
    * This callback
    * - May be invoked even though the parent container or canvas sizes have not changed
    * - Unlike ***REMOVED***@link #onSizeChange***REMOVED***, it runs _before_ the canvas is guaranteed to be updated
    * - Will be invoked from `preUpdate`, _even when_ the game is paused    
    *
    * See ***REMOVED***@link #onSizeChange***REMOVED*** for a better way of reacting to layout updates.
    * 
    * @method Phaser.ScaleManager#setResizeCallback
    * @public
    * @param ***REMOVED***function***REMOVED*** callback - The callback that will be called each time a window.resize event happens or if set, the parent container resizes.
    * @param ***REMOVED***object***REMOVED*** context - The context in which the callback will be called.
    */
    setResizeCallback: function (callback, context) ***REMOVED***

        this.onResize = callback;
        this.onResizeContext = context;

    ***REMOVED***,

    /**
    * Signals a resize - IF the canvas or Game size differs from the last signal.
    *
    * This also triggers updates on ***REMOVED***@link #grid***REMOVED*** (FlexGrid) and, if in a RESIZE mode, `game.state` (StateManager).
    *
    * @method Phaser.ScaleManager#signalSizeChange
    * @private
    */
    signalSizeChange: function () ***REMOVED***

        if (!Phaser.Rectangle.sameDimensions(this, this._lastReportedCanvasSize) ||
            !Phaser.Rectangle.sameDimensions(this.game, this._lastReportedGameSize))
        ***REMOVED***
            var width = this.width;
            var height = this.height;

            this._lastReportedCanvasSize.setTo(0, 0, width, height);
            this._lastReportedGameSize.setTo(0, 0, this.game.width, this.game.height);

            if (this.grid)
            ***REMOVED***
                this.grid.onResize(width, height);
            ***REMOVED***

            this.onSizeChange.dispatch(this, width, height);

            // Per StateManager#onResizeCallback, it only occurs when in RESIZE mode.
            if (this.currentScaleMode === Phaser.ScaleManager.RESIZE)
            ***REMOVED***
                this.game.state.resize(width, height);
                this.game.load.resize(width, height);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Set the min and max dimensions for the Display canvas.
    * 
    * _Note:_ The min/max dimensions are only applied in some cases
    * - When the device is not in an incorrect orientation; or
    * - The scale mode is EXACT_FIT when not in fullscreen
    *
    * @method Phaser.ScaleManager#setMinMax
    * @public
    * @param ***REMOVED***number***REMOVED*** minWidth - The minimum width the game is allowed to scale down to.
    * @param ***REMOVED***number***REMOVED*** minHeight - The minimum height the game is allowed to scale down to.
    * @param ***REMOVED***number***REMOVED*** [maxWidth] - The maximum width the game is allowed to scale up to; only changed if specified.
    * @param ***REMOVED***number***REMOVED*** [maxHeight] - The maximum height the game is allowed to scale up to; only changed if specified.
    * @todo These values are only sometimes honored.
    */
    setMinMax: function (minWidth, minHeight, maxWidth, maxHeight) ***REMOVED***

        this.minWidth = minWidth;
        this.minHeight = minHeight;

        if (typeof maxWidth !== 'undefined')
        ***REMOVED***
            this.maxWidth = maxWidth;
        ***REMOVED***

        if (typeof maxHeight !== 'undefined')
        ***REMOVED***
            this.maxHeight = maxHeight;
        ***REMOVED***

    ***REMOVED***,

    /**
    * The ScaleManager.preUpdate is called automatically by the core Game loop.
    * 
    * @method Phaser.ScaleManager#preUpdate
    * @protected
    */
    preUpdate: function () ***REMOVED***

        if (this.game.time.time < (this._lastUpdate + this._updateThrottle))
        ***REMOVED***
            return;
        ***REMOVED***

        var prevThrottle = this._updateThrottle;
        this._updateThrottleReset = prevThrottle >= 400 ? 0 : 100;

        this.dom.getOffset(this.game.canvas, this.offset);

        var prevWidth = this._parentBounds.width;
        var prevHeight = this._parentBounds.height;
        var bounds = this.getParentBounds(this._parentBounds);

        var boundsChanged = bounds.width !== prevWidth || bounds.height !== prevHeight;

        // Always invalidate on a newly detected orientation change
        var orientationChanged = this.updateOrientationState();

        if (boundsChanged || orientationChanged)
        ***REMOVED***
            if (this.onResize)
            ***REMOVED***
                this.onResize.call(this.onResizeContext, this, bounds);
            ***REMOVED***

            this.updateLayout();

            this.signalSizeChange();
        ***REMOVED***

        // Next throttle, eg. 25, 50, 100, 200..
        var throttle = this._updateThrottle * 2;

        // Don't let an update be too eager about resetting the throttle.
        if (this._updateThrottle < prevThrottle)
        ***REMOVED***
            throttle = Math.min(prevThrottle, this._updateThrottleReset);
        ***REMOVED***

        this._updateThrottle = Phaser.Math.clamp(throttle, 25, this.trackParentInterval);
        this._lastUpdate = this.game.time.time;

    ***REMOVED***,

    /**
    * Update method while paused.
    *
    * @method Phaser.ScaleManager#pauseUpdate
    * @private
    */
    pauseUpdate: function () ***REMOVED***

        this.preUpdate();

        // Updates at slowest.
        this._updateThrottle = this.trackParentInterval;
        
    ***REMOVED***,

    /**
    * Update the dimensions taking the parent scaling factor into account.
    *
    * @method Phaser.ScaleManager#updateDimensions
    * @private
    * @param ***REMOVED***number***REMOVED*** width - The new width of the parent container.
    * @param ***REMOVED***number***REMOVED*** height - The new height of the parent container.
    * @param ***REMOVED***boolean***REMOVED*** resize - True if the renderer should be resized, otherwise false to just update the internal vars.
    */
    updateDimensions: function (width, height, resize) ***REMOVED***

        this.width = width * this.parentScaleFactor.x;
        this.height = height * this.parentScaleFactor.y;

        this.game.width = this.width;
        this.game.height = this.height;

        this.sourceAspectRatio = this.width / this.height;
        this.updateScalingAndBounds();

        if (resize)
        ***REMOVED***
            //  Resize the renderer (which in turn resizes the Display canvas!)
            this.game.renderer.resize(this.width, this.height);

            //  The Camera can never be smaller than the Game size
            this.game.camera.setSize(this.width, this.height);

            //  This should only happen if the world is smaller than the new canvas size
            this.game.world.resize(this.width, this.height);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Update relevant scaling values based on the ScaleManager dimension and game dimensions,
    * which should already be set. This does not change ***REMOVED***@link #sourceAspectRatio***REMOVED***.
    * 
    * @method Phaser.ScaleManager#updateScalingAndBounds
    * @private
    */
    updateScalingAndBounds: function () ***REMOVED***

        this.scaleFactor.x = this.game.width / this.width;
        this.scaleFactor.y = this.game.height / this.height;

        this.scaleFactorInversed.x = this.width / this.game.width;
        this.scaleFactorInversed.y = this.height / this.game.height;

        this.aspectRatio = this.width / this.height;

        // This can be invoked in boot pre-canvas
        if (this.game.canvas)
        ***REMOVED***
            this.dom.getOffset(this.game.canvas, this.offset);
        ***REMOVED***

        this.bounds.setTo(this.offset.x, this.offset.y, this.width, this.height);

        // Can be invoked in boot pre-input
        if (this.game.input && this.game.input.scale)
        ***REMOVED***
            this.game.input.scale.setTo(this.scaleFactor.x, this.scaleFactor.y);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Force the game to run in only one orientation.
    *
    * This enables generation of incorrect orientation signals and affects resizing but does not otherwise rotate or lock the orientation.
    *
    * Orientation checks are performed via the Screen Orientation API, if available in browser. This means it will check your monitor
    * orientation on desktop, or your device orientation on mobile, rather than comparing actual game dimensions. If you need to check the 
    * viewport dimensions instead and bypass the Screen Orientation API then set: `ScaleManager.compatibility.orientationFallback = 'viewport'`
    * 
    * @method Phaser.ScaleManager#forceOrientation
    * @public
    * @param ***REMOVED***boolean***REMOVED*** forceLandscape - true if the game should run in landscape mode only.
    * @param ***REMOVED***boolean***REMOVED*** [forcePortrait=false] - true if the game should run in portrait mode only.
    */
    forceOrientation: function (forceLandscape, forcePortrait) ***REMOVED***

        if (forcePortrait === undefined) ***REMOVED*** forcePortrait = false; ***REMOVED***

        this.forceLandscape = forceLandscape;
        this.forcePortrait = forcePortrait;

        this.queueUpdate(true);

    ***REMOVED***,

    /**
    * Classify the orientation, per `getScreenOrientation`.
    * 
    * @method Phaser.ScaleManager#classifyOrientation
    * @private
    * @param ***REMOVED***string***REMOVED*** orientation - The orientation string, e.g. 'portrait-primary'.
    * @return ***REMOVED***?string***REMOVED*** The classified orientation: 'portrait', 'landscape`, or null.
    */
    classifyOrientation: function (orientation) ***REMOVED***

        if (orientation === 'portrait-primary' || orientation === 'portrait-secondary')
        ***REMOVED***
            return 'portrait';
        ***REMOVED***
        else if (orientation === 'landscape-primary' || orientation === 'landscape-secondary')
        ***REMOVED***
            return 'landscape';
        ***REMOVED***
        else
        ***REMOVED***
            return null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Updates the current orientation and dispatches orientation change events.
    * 
    * @method Phaser.ScaleManager#updateOrientationState
    * @private
    * @return ***REMOVED***boolean***REMOVED*** True if the orientation state changed which means a forced update is likely required.
    */
    updateOrientationState: function () ***REMOVED***

        var previousOrientation = this.screenOrientation;
        var previouslyIncorrect = this.incorrectOrientation;
        
        this.screenOrientation = this.dom.getScreenOrientation(this.compatibility.orientationFallback);

        this.incorrectOrientation = (this.forceLandscape && !this.isLandscape) ||
            (this.forcePortrait && !this.isPortrait);

        var changed = previousOrientation !== this.screenOrientation;
        var correctnessChanged = previouslyIncorrect !== this.incorrectOrientation;

        if (correctnessChanged)
        ***REMOVED***
            if (this.incorrectOrientation)
            ***REMOVED***
                this.enterIncorrectOrientation.dispatch();
            ***REMOVED***
            else
            ***REMOVED***
                this.leaveIncorrectOrientation.dispatch();
            ***REMOVED***
        ***REMOVED***

        if (changed || correctnessChanged)
        ***REMOVED***
            this.onOrientationChange.dispatch(this, previousOrientation, previouslyIncorrect);
        ***REMOVED***

        return changed || correctnessChanged;

    ***REMOVED***,

    /**
    * window.orientationchange event handler.
    * 
    * @method Phaser.ScaleManager#orientationChange
    * @private
    * @param ***REMOVED***Event***REMOVED*** event - The orientationchange event data.
    */
    orientationChange: function (event) ***REMOVED***

        this.event = event;

        this.queueUpdate(true);

    ***REMOVED***,

    /**
    * window.resize event handler.
    * 
    * @method Phaser.ScaleManager#windowResize
    * @private
    * @param ***REMOVED***Event***REMOVED*** event - The resize event data.
    */
    windowResize: function (event) ***REMOVED***

        this.event = event;

        this.queueUpdate(true);

    ***REMOVED***,

    /**
    * Scroll to the top - in some environments. See `compatibility.scrollTo`.
    * 
    * @method Phaser.ScaleManager#scrollTop
    * @private
    */
    scrollTop: function () ***REMOVED***

        var scrollTo = this.compatibility.scrollTo;

        if (scrollTo)
        ***REMOVED***
            window.scrollTo(scrollTo.x, scrollTo.y);
        ***REMOVED***

    ***REMOVED***,

    /**
    * The "refresh" methods informs the ScaleManager that a layout refresh is required.
    *
    * The ScaleManager automatically queues a layout refresh (eg. updates the Game size or Display canvas layout)
    * when the browser is resized, the orientation changes, or when there is a detected change
    * of the Parent size. Refreshing is also done automatically when public properties,
    * such as ***REMOVED***@link #scaleMode***REMOVED***, are updated or state-changing methods are invoked.
    *
    * The "refresh" method _may_ need to be used in a few (rare) situtations when
    *
    * - a device change event is not correctly detected; or
    * - the Parent size changes (and an immediate reflow is desired); or
    * - the ScaleManager state is updated by non-standard means; or
    * - certain ***REMOVED***@link #compatibility***REMOVED*** properties are manually changed.
    *
    * The queued layout refresh is not immediate but will run promptly in an upcoming `preRender`.
    * 
    * @method Phaser.ScaleManager#refresh
    * @public
    */
    refresh: function () ***REMOVED***

        this.scrollTop();
        this.queueUpdate(true);

    ***REMOVED***,

    /**
    * Updates the game / canvas position and size.
    *
    * @method Phaser.ScaleManager#updateLayout
    * @private
    */
    updateLayout: function () ***REMOVED***

        var scaleMode = this.currentScaleMode;

        if (scaleMode === Phaser.ScaleManager.RESIZE)
        ***REMOVED***
            this.reflowGame();
            return;
        ***REMOVED***

        this.scrollTop();

        if (this.compatibility.forceMinimumDocumentHeight)
        ***REMOVED***
            // (This came from older code, by why is it here?)
            // Set minimum height of content to new window height
            document.documentElement.style.minHeight = window.innerHeight + 'px';
        ***REMOVED***
        
        if (this.incorrectOrientation)
        ***REMOVED***
            this.setMaximum();
        ***REMOVED***
        else
        ***REMOVED***
            if (scaleMode === Phaser.ScaleManager.EXACT_FIT)
            ***REMOVED***
                this.setExactFit();
            ***REMOVED***
            else if (scaleMode === Phaser.ScaleManager.SHOW_ALL)
            ***REMOVED***
                if (!this.isFullScreen && this.boundingParent &&
                    this.compatibility.canExpandParent)
                ***REMOVED***
                    // Try to expand parent out, but choosing maximizing dimensions.                    
                    // Then select minimize dimensions which should then honor parent
                    // maximum bound applications.
                    this.setShowAll(true);
                    this.resetCanvas();
                    this.setShowAll();
                ***REMOVED***
                else
                ***REMOVED***
                    this.setShowAll();
                ***REMOVED***
            ***REMOVED***
            else if (scaleMode === Phaser.ScaleManager.NO_SCALE)
            ***REMOVED***
                this.width = this.game.width;
                this.height = this.game.height;
            ***REMOVED***
            else if (scaleMode === Phaser.ScaleManager.USER_SCALE)
            ***REMOVED***
                this.width = (this.game.width * this._userScaleFactor.x) - this._userScaleTrim.x;
                this.height = (this.game.height * this._userScaleFactor.y) - this._userScaleTrim.y;
            ***REMOVED***
        ***REMOVED***

        if (!this.compatibility.canExpandParent &&
            (scaleMode === Phaser.ScaleManager.SHOW_ALL || scaleMode === Phaser.ScaleManager.USER_SCALE))
        ***REMOVED***
            var bounds = this.getParentBounds(this._tempBounds);
            this.width = Math.min(this.width, bounds.width);
            this.height = Math.min(this.height, bounds.height);
        ***REMOVED***

        // Always truncate / force to integer
        this.width = this.width | 0;
        this.height = this.height | 0;

        this.reflowCanvas();

    ***REMOVED***,

    /**
    * Returns the computed Parent size/bounds that the Display canvas is allowed/expected to fill.
    *
    * If in fullscreen mode or without parent (see ***REMOVED***@link #parentIsWindow***REMOVED***),
    * this will be the bounds of the visual viewport itself.
    *
    * This function takes the ***REMOVED***@link #windowConstraints***REMOVED*** into consideration - if the parent is partially outside
    * the viewport then this function may return a smaller than expected size.
    *
    * Values are rounded to the nearest pixel.
    *
    * @method Phaser.ScaleManager#getParentBounds
    * @protected
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** [target=(new Rectangle)] - The rectangle to update; a new one is created as needed.
    * @return ***REMOVED***Phaser.Rectangle***REMOVED*** The established parent bounds.
    */
    getParentBounds: function (target) ***REMOVED***

        var bounds = target || new Phaser.Rectangle();
        var parentNode = this.boundingParent;
        var visualBounds = this.dom.visualBounds;
        var layoutBounds = this.dom.layoutBounds;

        if (!parentNode)
        ***REMOVED***
            bounds.setTo(0, 0, visualBounds.width, visualBounds.height);
        ***REMOVED***
        else
        ***REMOVED***
            // Ref. http://msdn.microsoft.com/en-us/library/hh781509(v=vs.85).aspx for getBoundingClientRect
            var clientRect = parentNode.getBoundingClientRect();
            var parentRect = (parentNode.offsetParent) ? parentNode.offsetParent.getBoundingClientRect() : parentNode.getBoundingClientRect();

            bounds.setTo(clientRect.left - parentRect.left, clientRect.top - parentRect.top, clientRect.width, clientRect.height);

            var wc = this.windowConstraints;

            if (wc.right)
            ***REMOVED***
                var windowBounds = wc.right === 'layout' ? layoutBounds : visualBounds;
                bounds.right = Math.min(bounds.right, windowBounds.width);
            ***REMOVED***

            if (wc.bottom)
            ***REMOVED***
                var windowBounds = wc.bottom === 'layout' ? layoutBounds : visualBounds;
                bounds.bottom = Math.min(bounds.bottom, windowBounds.height);
            ***REMOVED***
        ***REMOVED***

        bounds.setTo(
            Math.round(bounds.x), Math.round(bounds.y),
            Math.round(bounds.width), Math.round(bounds.height));

        return bounds;

    ***REMOVED***,

    /**
    * Update the canvas position/margins - for alignment within the parent container.
    *
    * The canvas margins _must_ be reset/cleared prior to invoking this.
    *
    * @method Phaser.ScaleManager#alignCanvas
    * @private
    * @param ***REMOVED***boolean***REMOVED*** horizontal - Align horizontally?
    * @param ***REMOVED***boolean***REMOVED*** vertical - Align vertically?
    */
    alignCanvas: function (horizontal, vertical) ***REMOVED***

        var parentBounds = this.getParentBounds(this._tempBounds);
        var canvas = this.game.canvas;
        var margin = this.margin;

        if (horizontal)
        ***REMOVED***
            margin.left = margin.right = 0;

            var canvasBounds = canvas.getBoundingClientRect();

            if (this.width < parentBounds.width && !this.incorrectOrientation)
            ***REMOVED***
                var currentEdge = canvasBounds.left - parentBounds.x;
                var targetEdge = (parentBounds.width / 2) - (this.width / 2);

                targetEdge = Math.max(targetEdge, 0);

                var offset = targetEdge - currentEdge;

                margin.left = Math.round(offset);
            ***REMOVED***

            canvas.style.marginLeft = margin.left + 'px';

            if (margin.left !== 0)
            ***REMOVED***
                margin.right = -(parentBounds.width - canvasBounds.width - margin.left);
                canvas.style.marginRight = margin.right + 'px';
            ***REMOVED***
        ***REMOVED***

        if (vertical)
        ***REMOVED***
            margin.top = margin.bottom = 0;

            var canvasBounds = canvas.getBoundingClientRect();
            
            if (this.height < parentBounds.height && !this.incorrectOrientation)
            ***REMOVED***
                var currentEdge = canvasBounds.top - parentBounds.y;
                var targetEdge = (parentBounds.height / 2) - (this.height / 2);

                targetEdge = Math.max(targetEdge, 0);
                
                var offset = targetEdge - currentEdge;
                margin.top = Math.round(offset);
            ***REMOVED***

            canvas.style.marginTop = margin.top + 'px';

            if (margin.top !== 0)
            ***REMOVED***
                margin.bottom = -(parentBounds.height - canvasBounds.height - margin.top);
                canvas.style.marginBottom = margin.bottom + 'px';
            ***REMOVED***
        ***REMOVED***

        // Silly backwards compatibility..
        margin.x = margin.left;
        margin.y = margin.top;

    ***REMOVED***,

    /**
    * Updates the Game state / size.
    *
    * The canvas margins may always be adjusted, even if alignment is not in effect.
    * 
    * @method Phaser.ScaleManager#reflowGame
    * @private
    */
    reflowGame: function () ***REMOVED***

        this.resetCanvas('', '');

        var bounds = this.getParentBounds(this._tempBounds);
        this.updateDimensions(bounds.width, bounds.height, true);

    ***REMOVED***,

    /**
    * Updates the Display canvas size.
    *
    * The canvas margins may always be adjusted, even alignment is not in effect.
    * 
    * @method Phaser.ScaleManager#reflowCanvas
    * @private
    */
    reflowCanvas: function () ***REMOVED***

        if (!this.incorrectOrientation)
        ***REMOVED***
            this.width = Phaser.Math.clamp(this.width, this.minWidth || 0, this.maxWidth || this.width);
            this.height = Phaser.Math.clamp(this.height, this.minHeight || 0, this.maxHeight || this.height);
        ***REMOVED***

        this.resetCanvas();

        if (!this.compatibility.noMargins)
        ***REMOVED***
            if (this.isFullScreen && this._createdFullScreenTarget)
            ***REMOVED***
                this.alignCanvas(true, true);
            ***REMOVED***
            else
            ***REMOVED***
                this.alignCanvas(this.pageAlignHorizontally, this.pageAlignVertically);
            ***REMOVED***
        ***REMOVED***

        this.updateScalingAndBounds();

    ***REMOVED***,

    /**
    * "Reset" the Display canvas and set the specified width/height.
    *
    * @method Phaser.ScaleManager#resetCanvas
    * @private
    * @param ***REMOVED***string***REMOVED*** [cssWidth=(current width)] - The css width to set.
    * @param ***REMOVED***string***REMOVED*** [cssHeight=(current height)] - The css height to set.
    */
    resetCanvas: function (cssWidth, cssHeight) ***REMOVED***

        if (cssWidth === undefined) ***REMOVED*** cssWidth = this.width + 'px'; ***REMOVED***
        if (cssHeight === undefined) ***REMOVED*** cssHeight = this.height + 'px'; ***REMOVED***

        var canvas = this.game.canvas;

        if (!this.compatibility.noMargins)
        ***REMOVED***
            canvas.style.marginLeft = '';
            canvas.style.marginTop = '';
            canvas.style.marginRight = '';
            canvas.style.marginBottom = '';
        ***REMOVED***

        canvas.style.width = cssWidth;
        canvas.style.height = cssHeight;

    ***REMOVED***,

    /**
    * Queues/marks a size/bounds check as needing to occur (from `preUpdate`).
    *
    * @method Phaser.ScaleManager#queueUpdate
    * @private
    * @param ***REMOVED***boolean***REMOVED*** force - If true resets the parent bounds to ensure the check is dirty.
    */
    queueUpdate: function (force) ***REMOVED***

        if (force)
        ***REMOVED***
            this._parentBounds.width = 0;
            this._parentBounds.height = 0;
        ***REMOVED***

        this._updateThrottle = this._updateThrottleReset;

    ***REMOVED***,

    /**
    * Reset internal data/state.
    *
    * @method Phaser.ScaleManager#reset
    * @private
    */
    reset: function (clearWorld) ***REMOVED***

        if (clearWorld && this.grid)
        ***REMOVED***
            this.grid.reset();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Updates the width/height to that of the window.
    * 
    * @method Phaser.ScaleManager#setMaximum
    * @private
    */
    setMaximum: function () ***REMOVED***

        this.width = this.dom.visualBounds.width;
        this.height = this.dom.visualBounds.height;

    ***REMOVED***,

    /**
    * Updates the width/height such that the game is scaled proportionally.
    * 
    * @method Phaser.ScaleManager#setShowAll
    * @private
    * @param ***REMOVED***boolean***REMOVED*** expanding - If true then the maximizing dimension is chosen.
    */
    setShowAll: function (expanding) ***REMOVED***

        var bounds = this.getParentBounds(this._tempBounds);
        var width = bounds.width;
        var height = bounds.height;

        var multiplier;

        if (expanding)
        ***REMOVED***
            multiplier = Math.max((height / this.game.height), (width / this.game.width));
        ***REMOVED***
        else
        ***REMOVED***
            multiplier = Math.min((height / this.game.height), (width / this.game.width));
        ***REMOVED***

        this.width = Math.round(this.game.width * multiplier);
        this.height = Math.round(this.game.height * multiplier);

    ***REMOVED***,

    /**
    * Updates the width/height such that the game is stretched to the available size.
    * Honors ***REMOVED***@link #maxWidth***REMOVED*** and ***REMOVED***@link #maxHeight***REMOVED*** when _not_ in fullscreen.
    *
    * @method Phaser.ScaleManager#setExactFit
    * @private
    */
    setExactFit: function () ***REMOVED***

        var bounds = this.getParentBounds(this._tempBounds);

        this.width = bounds.width;
        this.height = bounds.height;

        if (this.isFullScreen)
        ***REMOVED***
            // Max/min not honored fullscreen
            return;
        ***REMOVED***

        if (this.maxWidth)
        ***REMOVED***
            this.width = Math.min(this.width, this.maxWidth);
        ***REMOVED***

        if (this.maxHeight)
        ***REMOVED***
            this.height = Math.min(this.height, this.maxHeight);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Creates a fullscreen target. This is called automatically as as needed when entering
    * fullscreen mode and the resulting element is supplied to ***REMOVED***@link #onFullScreenInit***REMOVED***.
    *
    * Use ***REMOVED***@link #onFullScreenInit***REMOVED*** to customize the created object.
    *
    * @method Phaser.ScaleManager#createFullScreenTarget
    * @protected
    */
    createFullScreenTarget: function () ***REMOVED***

        var fsTarget = document.createElement('div');

        fsTarget.style.margin = '0';
        fsTarget.style.padding = '0';
        fsTarget.style.background = '#000';

        return fsTarget;

    ***REMOVED***,

    /**
    * Start the browsers fullscreen mode - this _must_ be called from a user input Pointer or Mouse event.
    *
    * The Fullscreen API must be supported by the browser for this to work - it is not the same as setting
    * the game size to fill the browser window. See ***REMOVED***@link Phaser.ScaleManager#compatibility compatibility.supportsFullScreen***REMOVED*** to check if the current
    * device is reported to support fullscreen mode.
    *
    * The ***REMOVED***@link #fullScreenFailed***REMOVED*** signal will be dispatched if the fullscreen change request failed or the game does not support the Fullscreen API.
    *
    * @method Phaser.ScaleManager#startFullScreen
    * @public
    * @param ***REMOVED***boolean***REMOVED*** [antialias] - Changes the anti-alias feature of the canvas before jumping in to fullscreen (false = retain pixel art, true = smooth art). If not specified then no change is made. Only works in CANVAS mode.
    * @param ***REMOVED***boolean***REMOVED*** [allowTrampoline=undefined] - Internal argument. If `false` click trampolining is suppressed.
    * @return ***REMOVED***boolean***REMOVED*** Returns true if the device supports fullscreen mode and fullscreen mode was attempted to be started. (It might not actually start, wait for the signals.)
    */
    startFullScreen: function (antialias, allowTrampoline) ***REMOVED***

        if (this.isFullScreen)
        ***REMOVED***
            return false;
        ***REMOVED***

        if (!this.compatibility.supportsFullScreen)
        ***REMOVED***
            // Error is called in timeout to emulate the real fullscreenerror event better
            var _this = this;

            setTimeout(function () ***REMOVED***
                _this.fullScreenError();
            ***REMOVED***, 10);

            return;
        ***REMOVED***

        if (this.compatibility.clickTrampoline === 'when-not-mouse')
        ***REMOVED***
            var input = this.game.input;

            if (input.activePointer &&
                input.activePointer !== input.mousePointer &&
                (allowTrampoline || allowTrampoline !== false))
            ***REMOVED***
                input.activePointer.addClickTrampoline("startFullScreen", this.startFullScreen, this, [antialias, false]);
                return;
            ***REMOVED***
        ***REMOVED***

        if (antialias !== undefined && this.game.renderType === Phaser.CANVAS)
        ***REMOVED***
            this.game.stage.smoothed = antialias;
        ***REMOVED***

        var fsTarget = this.fullScreenTarget;
        
        if (!fsTarget)
        ***REMOVED***
            this.cleanupCreatedTarget();

            this._createdFullScreenTarget = this.createFullScreenTarget();
            fsTarget = this._createdFullScreenTarget;
        ***REMOVED***

        var initData = ***REMOVED***
            targetElement: fsTarget
        ***REMOVED***;

        this.hasPhaserSetFullScreen = true;

        this.onFullScreenInit.dispatch(this, initData);

        if (this._createdFullScreenTarget)
        ***REMOVED***
            // Move the Display canvas inside of the target and add the target to the DOM
            // (The target has to be added for the Fullscreen API to work.)
            var canvas = this.game.canvas;
            var parent = canvas.parentNode;
            parent.insertBefore(fsTarget, canvas);
            fsTarget.appendChild(canvas);
        ***REMOVED***

        if (this.game.device.fullscreenKeyboard)
        ***REMOVED***
            fsTarget[this.game.device.requestFullscreen](Element.ALLOW_KEYBOARD_INPUT);
        ***REMOVED***
        else
        ***REMOVED***
            fsTarget[this.game.device.requestFullscreen]();
        ***REMOVED***

        return true;

    ***REMOVED***,

    /**
    * Stops / exits fullscreen mode, if active.
    *
    * @method Phaser.ScaleManager#stopFullScreen
    * @public
    * @return ***REMOVED***boolean***REMOVED*** Returns true if the browser supports fullscreen mode and fullscreen mode will be exited.
    */
    stopFullScreen: function () ***REMOVED***

        if (!this.isFullScreen || !this.compatibility.supportsFullScreen)
        ***REMOVED***
            return false;
        ***REMOVED***

        this.hasPhaserSetFullScreen = false;

        document[this.game.device.cancelFullscreen]();

        return true;

    ***REMOVED***,

    /**
    * Cleans up the previous fullscreen target, if such was automatically created.
    * This ensures the canvas is restored to its former parent, assuming the target didn't move.
    *
    * @method Phaser.ScaleManager#cleanupCreatedTarget
    * @private
    */
    cleanupCreatedTarget: function () ***REMOVED***

        var fsTarget = this._createdFullScreenTarget;

        if (fsTarget && fsTarget.parentNode)
        ***REMOVED***
            // Make sure to cleanup synthetic target for sure;
            // swap the canvas back to the parent.
            var parent = fsTarget.parentNode;
            parent.insertBefore(this.game.canvas, fsTarget);
            parent.removeChild(fsTarget);
        ***REMOVED***

        this._createdFullScreenTarget = null;

    ***REMOVED***,

    /**
    * Used to prepare/restore extra fullscreen mode settings.
    * (This does move any elements within the DOM tree.)
    *
    * @method Phaser.ScaleManager#prepScreenMode
    * @private
    * @param ***REMOVED***boolean***REMOVED*** enteringFullscreen - True if _entering_ fullscreen, false if _leaving_.
    */
    prepScreenMode: function (enteringFullscreen) ***REMOVED***

        var createdTarget = !!this._createdFullScreenTarget;
        var fsTarget = this._createdFullScreenTarget || this.fullScreenTarget;

        if (enteringFullscreen)
        ***REMOVED***
            if (createdTarget || this.fullScreenScaleMode === Phaser.ScaleManager.EXACT_FIT)
            ***REMOVED***
                // Resize target, as long as it's not the canvas
                if (fsTarget !== this.game.canvas)
                ***REMOVED***
                    this._fullScreenRestore = ***REMOVED***
                        targetWidth: fsTarget.style.width,
                        targetHeight: fsTarget.style.height
                    ***REMOVED***;

                    fsTarget.style.width = '100%';
                    fsTarget.style.height = '100%';
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            // Have restore information
            if (this._fullScreenRestore)
            ***REMOVED***
                fsTarget.style.width = this._fullScreenRestore.targetWidth;
                fsTarget.style.height = this._fullScreenRestore.targetHeight;

                this._fullScreenRestore = null;
            ***REMOVED***

            // Always reset to game size
            this.updateDimensions(this._gameSize.width, this._gameSize.height, true);
            this.resetCanvas();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called automatically when the browser enters of leaves fullscreen mode.
    *
    * @method Phaser.ScaleManager#fullScreenChange
    * @private
    * @param ***REMOVED***Event***REMOVED*** [event=undefined] - The fullscreenchange event
    */
    fullScreenChange: function (event) ***REMOVED***

        this.event = event;

        if (this.isFullScreen)
        ***REMOVED***
            this.prepScreenMode(true);

            this.updateLayout();
            this.queueUpdate(true);
        ***REMOVED***
        else
        ***REMOVED***
            this.prepScreenMode(false);

            this.cleanupCreatedTarget();

            this.updateLayout();
            this.queueUpdate(true);
        ***REMOVED***

        this.onFullScreenChange.dispatch(this, this.width, this.height);

    ***REMOVED***,

    /**
    * Called automatically when the browser fullscreen request fails;
    * or called when a fullscreen request is made on a device for which it is not supported.
    *
    * @method Phaser.ScaleManager#fullScreenError
    * @private
    * @param ***REMOVED***Event***REMOVED*** [event=undefined] - The fullscreenerror event; undefined if invoked on a device that does not support the Fullscreen API.
    */
    fullScreenError: function (event) ***REMOVED***

        this.event = event;

        this.cleanupCreatedTarget();

        console.warn('Phaser.ScaleManager: requestFullscreen failed or device does not support the Fullscreen API');

        this.onFullScreenError.dispatch(this);

    ***REMOVED***,

    /**
    * Takes a Sprite or Image object and scales it to fit the given dimensions.
    * Scaling happens proportionally without distortion to the sprites texture.
    * The letterBox parameter controls if scaling will produce a letter-box effect or zoom the
    * sprite until it fills the given values. Note that with letterBox set to false the scaled sprite may spill out over either
    * the horizontal or vertical sides of the target dimensions. If you wish to stop this you can crop the Sprite.
    *
    * @method Phaser.ScaleManager#scaleSprite
    * @protected
    * @param ***REMOVED***Phaser.Sprite|Phaser.Image***REMOVED*** sprite - The sprite we want to scale.
    * @param ***REMOVED***integer***REMOVED*** [width] - The target width that we want to fit the sprite in to. If not given it defaults to ScaleManager.width.
    * @param ***REMOVED***integer***REMOVED*** [height] - The target height that we want to fit the sprite in to. If not given it defaults to ScaleManager.height.
    * @param ***REMOVED***boolean***REMOVED*** [letterBox=false] - True if we want the `fitted` mode. Otherwise, the function uses the `zoom` mode.
    * @return ***REMOVED***Phaser.Sprite|Phaser.Image***REMOVED*** The scaled sprite.
    */
    scaleSprite: function (sprite, width, height, letterBox) ***REMOVED***

        if (width === undefined) ***REMOVED*** width = this.width; ***REMOVED***
        if (height === undefined) ***REMOVED*** height = this.height; ***REMOVED***
        if (letterBox === undefined) ***REMOVED*** letterBox = false; ***REMOVED***

        if (!sprite || !sprite['scale'])
        ***REMOVED***
            return sprite;
        ***REMOVED***

        sprite.scale.x = 1;
        sprite.scale.y = 1;

        if ((sprite.width <= 0) || (sprite.height <= 0) || (width <= 0) || (height <= 0))
        ***REMOVED***
            return sprite;
        ***REMOVED***

        var scaleX1 = width;
        var scaleY1 = (sprite.height * width) / sprite.width;

        var scaleX2 = (sprite.width * height) / sprite.height;
        var scaleY2 = height;

        var scaleOnWidth = (scaleX2 > width);

        if (scaleOnWidth)
        ***REMOVED***
            scaleOnWidth = letterBox;
        ***REMOVED***
        else
        ***REMOVED***
            scaleOnWidth = !letterBox;
        ***REMOVED***

        if (scaleOnWidth)
        ***REMOVED***
            sprite.width = Math.floor(scaleX1);
            sprite.height = Math.floor(scaleY1);
        ***REMOVED***
        else
        ***REMOVED***
            sprite.width = Math.floor(scaleX2);
            sprite.height = Math.floor(scaleY2);
        ***REMOVED***

        //  Enable at some point?
        // sprite.x = Math.floor((width - sprite.width) / 2);
        // sprite.y = Math.floor((height - sprite.height) / 2);

        return sprite;

    ***REMOVED***,

    /**
    * Destroys the ScaleManager and removes any event listeners.
    * This should probably only be called when the game is destroyed.
    *
    * @method Phaser.ScaleManager#destroy
    * @protected
    */
    destroy: function () ***REMOVED***

        this.game.onResume.remove(this._gameResumed, this);

        window.removeEventListener('orientationchange', this._orientationChange, false);
        window.removeEventListener('resize', this._windowResize, false);

        if (this.compatibility.supportsFullScreen)
        ***REMOVED***
            document.removeEventListener('webkitfullscreenchange', this._fullScreenChange, false);
            document.removeEventListener('mozfullscreenchange', this._fullScreenChange, false);
            document.removeEventListener('MSFullscreenChange', this._fullScreenChange, false);
            document.removeEventListener('fullscreenchange', this._fullScreenChange, false);

            document.removeEventListener('webkitfullscreenerror', this._fullScreenError, false);
            document.removeEventListener('mozfullscreenerror', this._fullScreenError, false);
            document.removeEventListener('MSFullscreenError', this._fullScreenError, false);
            document.removeEventListener('fullscreenerror', this._fullScreenError, false);
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

Phaser.ScaleManager.prototype.constructor = Phaser.ScaleManager;

/**
* The DOM element that is considered the Parent bounding element, if any.
*
* This `null` if ***REMOVED***@link #parentIsWindow***REMOVED*** is true or if fullscreen mode is entered and ***REMOVED***@link #fullScreenTarget***REMOVED*** is specified.
* It will also be null if there is no game canvas or if the game canvas has no parent.
*
* @name Phaser.ScaleManager#boundingParent
* @property ***REMOVED***?DOMElement***REMOVED*** boundingParent
* @readonly
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "boundingParent", ***REMOVED***

    get: function () ***REMOVED***

        if (this.parentIsWindow ||
            (this.isFullScreen && this.hasPhaserSetFullScreen && !this._createdFullScreenTarget))
        ***REMOVED***
            return null;
        ***REMOVED***

        var parentNode = this.game.canvas && this.game.canvas.parentNode;

        return parentNode || null;

    ***REMOVED***

***REMOVED***);

/**
* The scaling method used by the ScaleManager when not in fullscreen.
* 
* <dl>
*   <dt>***REMOVED***@link Phaser.ScaleManager.NO_SCALE***REMOVED***</dt>
*   <dd>
*       The Game display area will not be scaled - even if it is too large for the canvas/screen.
*       This mode _ignores_ any applied scaling factor and displays the canvas at the Game size.
*   </dd>
*   <dt>***REMOVED***@link Phaser.ScaleManager.EXACT_FIT***REMOVED***</dt>
*   <dd>
*       The Game display area will be _stretched_ to fill the entire size of the canvas's parent element and/or screen.
*       Proportions are not maintained.
*   </dd>
*   <dt>***REMOVED***@link Phaser.ScaleManager.SHOW_ALL***REMOVED***</dt>
*   <dd>
*       Show the entire game display area while _maintaining_ the original aspect ratio.
*   </dd>
*   <dt>***REMOVED***@link Phaser.ScaleManager.RESIZE***REMOVED***</dt>
*   <dd>
*       The dimensions of the game display area are changed to match the size of the parent container.
*       That is, this mode _changes the Game size_ to match the display size.
*       <p>
*       Any manually set Game size (see ***REMOVED***@link #setGameSize***REMOVED***) is ignored while in effect.
*   </dd>
*   <dt>***REMOVED***@link Phaser.ScaleManager.USER_SCALE***REMOVED***</dt>
*   <dd>
*       The game Display is scaled according to the user-specified scale set by ***REMOVED***@link Phaser.ScaleManager#setUserScale setUserScale***REMOVED***.
*       <p>
*       This scale can be adjusted in the ***REMOVED***@link Phaser.ScaleManager#setResizeCallback resize callback***REMOVED***
*       for flexible custom-sizing needs.
*   </dd>
* </dl>
*
* @name Phaser.ScaleManager#scaleMode
* @property ***REMOVED***integer***REMOVED*** scaleMode
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "scaleMode", ***REMOVED***

    get: function () ***REMOVED***

        return this._scaleMode;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value !== this._scaleMode)
        ***REMOVED***
            if (!this.isFullScreen)
            ***REMOVED***
                this.updateDimensions(this._gameSize.width, this._gameSize.height, true);
                this.queueUpdate(true);
            ***REMOVED***

            this._scaleMode = value;
        ***REMOVED***

        return this._scaleMode;

    ***REMOVED***

***REMOVED***);

/**
* The scaling method used by the ScaleManager when in fullscreen.
*
* See ***REMOVED***@link Phaser.ScaleManager#scaleMode scaleMode***REMOVED*** for the different modes allowed.
*
* @name Phaser.ScaleManager#fullScreenScaleMode
* @property ***REMOVED***integer***REMOVED*** fullScreenScaleMode
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "fullScreenScaleMode", ***REMOVED***

    get: function () ***REMOVED***

        return this._fullScreenScaleMode;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value !== this._fullScreenScaleMode)
        ***REMOVED***
            // If in fullscreen then need a wee bit more work
            if (this.isFullScreen)
            ***REMOVED***
                this.prepScreenMode(false);
                this._fullScreenScaleMode = value;
                this.prepScreenMode(true);

                this.queueUpdate(true);
            ***REMOVED***
            else
            ***REMOVED***
                this._fullScreenScaleMode = value;
            ***REMOVED***
        ***REMOVED***

        return this._fullScreenScaleMode;

    ***REMOVED***

***REMOVED***);

/**
* Returns the current scale mode - for normal or fullscreen operation.
*
* See ***REMOVED***@link Phaser.ScaleManager#scaleMode scaleMode***REMOVED*** for the different modes allowed.
*
* @name Phaser.ScaleManager#currentScaleMode
* @property ***REMOVED***number***REMOVED*** currentScaleMode
* @protected
* @readonly
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "currentScaleMode", ***REMOVED***

    get: function () ***REMOVED***

        return this.isFullScreen ? this._fullScreenScaleMode : this._scaleMode;

    ***REMOVED***

***REMOVED***);

/**
* When enabled the Display canvas will be horizontally-aligned _in the Parent container_ (or ***REMOVED***@link Phaser.ScaleManager#parentIsWindow window***REMOVED***).
*
* To align horizontally across the page the Display canvas should be added directly to page;
* or the parent container should itself be horizontally aligned.
*
* Horizontal alignment is not applicable with the ***REMOVED***@link .RESIZE***REMOVED*** scaling mode.
*
* @name Phaser.ScaleManager#pageAlignHorizontally
* @property ***REMOVED***boolean***REMOVED*** pageAlignHorizontally
* @default false
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "pageAlignHorizontally", ***REMOVED***

    get: function () ***REMOVED***

        return this._pageAlignHorizontally;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value !== this._pageAlignHorizontally)
        ***REMOVED***
            this._pageAlignHorizontally = value;
            this.queueUpdate(true);
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* When enabled the Display canvas will be vertically-aligned _in the Parent container_ (or ***REMOVED***@link Phaser.ScaleManager#parentIsWindow window***REMOVED***).
*
* To align vertically the Parent element should have a _non-collapsible_ height, such that it will maintain
* a height _larger_ than the height of the contained Game canvas - the game canvas will then be scaled vertically
* _within_ the remaining available height dictated by the Parent element.
*
* One way to prevent the parent from collapsing is to add an absolute "min-height" CSS property to the parent element.
* If specifying a relative "min-height/height" or adjusting margins, the Parent height must still be non-collapsible (see note).
*
* _Note_: In version 2.2 the minimum document height is _not_ automatically set to the viewport/window height.
* To automatically update the minimum document height set ***REMOVED***@link Phaser.ScaleManager#compatibility compatibility.forceMinimumDocumentHeight***REMOVED*** to true.
*
* Vertical alignment is not applicable with the ***REMOVED***@link .RESIZE***REMOVED*** scaling mode.
*
* @name Phaser.ScaleManager#pageAlignVertically
* @property ***REMOVED***boolean***REMOVED*** pageAlignVertically
* @default false
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "pageAlignVertically", ***REMOVED***

    get: function () ***REMOVED***

        return this._pageAlignVertically;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value !== this._pageAlignVertically)
        ***REMOVED***
            this._pageAlignVertically = value;
            this.queueUpdate(true);
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* Returns true if the browser is in fullscreen mode, otherwise false.
* @name Phaser.ScaleManager#isFullScreen
* @property ***REMOVED***boolean***REMOVED*** isFullScreen
* @readonly
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "isFullScreen", ***REMOVED***

    get: function () ***REMOVED***
        return !!(document['fullscreenElement'] ||
            document['webkitFullscreenElement'] ||
            document['mozFullScreenElement'] ||
            document['msFullscreenElement']);
    ***REMOVED***

***REMOVED***);

/**
* Returns true if the screen orientation is in portrait mode.
*
* @name Phaser.ScaleManager#isPortrait
* @property ***REMOVED***boolean***REMOVED*** isPortrait
* @readonly
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "isPortrait", ***REMOVED***

    get: function () ***REMOVED***
        return this.classifyOrientation(this.screenOrientation) === 'portrait';
    ***REMOVED***

***REMOVED***);

/**
* Returns true if the screen orientation is in landscape mode.
*
* @name Phaser.ScaleManager#isLandscape
* @property ***REMOVED***boolean***REMOVED*** isLandscape
* @readonly
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "isLandscape", ***REMOVED***

    get: function () ***REMOVED***
        return this.classifyOrientation(this.screenOrientation) === 'landscape';
    ***REMOVED***

***REMOVED***);

/**
* Returns true if the game dimensions are portrait (height > width).
* This is especially useful to check when using the RESIZE scale mode 
* but wanting to maintain game orientation on desktop browsers, 
* where typically the screen orientation will always be landscape regardless of the browser viewport.
*
* @name Phaser.ScaleManager#isGamePortrait
* @property ***REMOVED***boolean***REMOVED*** isGamePortrait
* @readonly
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "isGamePortrait", ***REMOVED***

    get: function () ***REMOVED***
        return (this.height > this.width);
    ***REMOVED***

***REMOVED***);

/**
* Returns true if the game dimensions are landscape (width > height).
* This is especially useful to check when using the RESIZE scale mode 
* but wanting to maintain game orientation on desktop browsers, 
* where typically the screen orientation will always be landscape regardless of the browser viewport.
*
* @name Phaser.ScaleManager#isGameLandscape
* @property ***REMOVED***boolean***REMOVED*** isGameLandscape
* @readonly
*/
Object.defineProperty(Phaser.ScaleManager.prototype, "isGameLandscape", ***REMOVED***

    get: function () ***REMOVED***
        return (this.width > this.height);
    ***REMOVED***

***REMOVED***);
