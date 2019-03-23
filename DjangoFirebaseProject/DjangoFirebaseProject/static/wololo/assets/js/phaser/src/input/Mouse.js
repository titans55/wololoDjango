/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Mouse class is responsible for handling all aspects of mouse interaction with the browser.
*
* It captures and processes mouse events that happen on the game canvas object.
* It also adds a single `mouseup` listener to `window` which is used to capture the mouse being released
* when not over the game.
*
* You should not normally access this class directly, but instead use a Phaser.Pointer object
* which normalises all game input for you, including accurate button handling.
*
* @class Phaser.Mouse
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
*/
Phaser.Mouse = function (game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***Phaser.Input***REMOVED*** input - A reference to the Phaser Input Manager.
    * @protected
    */
    this.input = game.input;

    /**
    * @property ***REMOVED***object***REMOVED*** callbackContext - The context under which callbacks are called.
    */
    this.callbackContext = this.game;

    /**
    * @property ***REMOVED***function***REMOVED*** mouseDownCallback - A callback that can be fired when the mouse is pressed down.
    */
    this.mouseDownCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** mouseUpCallback - A callback that can be fired when the mouse is released from a pressed down state.
    */
    this.mouseUpCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** mouseOutCallback - A callback that can be fired when the mouse is no longer over the game canvas.
    */
    this.mouseOutCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** mouseOverCallback - A callback that can be fired when the mouse enters the game canvas (usually after a mouseout).
    */
    this.mouseOverCallback = null;

    /**
     * @property ***REMOVED***function***REMOVED*** mouseWheelCallback - A callback that can be fired when the mousewheel is used.
     */
    this.mouseWheelCallback = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** capture - If true the DOM mouse events will have event.preventDefault applied to them, if false they will propagate fully.
    */
    this.capture = false;

    /**
    * This property was removed in Phaser 2.4 and should no longer be used.
    * Instead please see the Pointer button properties such as `Pointer.leftButton`, `Pointer.rightButton` and so on.
    * Or Pointer.button holds the DOM event button value if you require that.
    * @property ***REMOVED***number***REMOVED*** button
    * @default
    */
    this.button = -1;

    /**
     * The direction of the _last_ mousewheel usage 1 for up -1 for down.
     * @property ***REMOVED***number***REMOVED*** wheelDelta
     */
    this.wheelDelta = 0;

    /**
    * Mouse input will only be processed if enabled.
    * @property ***REMOVED***boolean***REMOVED*** enabled
    * @default
    */
    this.enabled = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** locked - If the mouse has been Pointer Locked successfully this will be set to true.
    * @default
    */
    this.locked = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** stopOnGameOut - If true Pointer.stop will be called if the mouse leaves the game canvas.
    * @default
    */
    this.stopOnGameOut = false;

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** pointerLock - This event is dispatched when the browser enters or leaves pointer lock state.
    * @default
    */
    this.pointerLock = new Phaser.Signal();

    /**
    * The browser mouse DOM event. Will be null if no mouse event has ever been received.
    * Access this property only inside a Mouse event handler and do not keep references to it.
    * @property ***REMOVED***MouseEvent|null***REMOVED*** event
    * @default
    */
    this.event = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMouseDown - Internal event handler reference.
    * @private
    */
    this._onMouseDown = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMouseMove - Internal event handler reference.
    * @private
    */
    this._onMouseMove = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMouseUp - Internal event handler reference.
    * @private
    */
    this._onMouseUp = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMouseOut - Internal event handler reference.
    * @private
    */
    this._onMouseOut = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMouseOver - Internal event handler reference.
    * @private
    */
    this._onMouseOver = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMouseWheel - Internal event handler reference.
    * @private
    */
    this._onMouseWheel = null;

    /**
    * Wheel proxy event object, if required. Shared for all wheel events for this mouse.
    * @property ***REMOVED***Phaser.Mouse~WheelEventProxy***REMOVED*** _wheelEvent
    * @private
    */
    this._wheelEvent = null;

***REMOVED***;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Mouse.NO_BUTTON = -1;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Mouse.LEFT_BUTTON = 0;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Mouse.MIDDLE_BUTTON = 1;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Mouse.RIGHT_BUTTON = 2;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Mouse.BACK_BUTTON = 3;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Mouse.FORWARD_BUTTON = 4;

/**
 * @constant
 * @type ***REMOVED***number***REMOVED***
 */
Phaser.Mouse.WHEEL_UP = 1;

/**
 * @constant
 * @type ***REMOVED***number***REMOVED***
 */
Phaser.Mouse.WHEEL_DOWN = -1;

Phaser.Mouse.prototype = ***REMOVED***

    /**
    * Starts the event listeners running.
    * @method Phaser.Mouse#start
    */
    start: function () ***REMOVED***

        if (this.game.device.android && this.game.device.chrome === false)
        ***REMOVED***
            //  Android stock browser fires mouse events even if you preventDefault on the touchStart, so ...
            return;
        ***REMOVED***

        if (this._onMouseDown !== null)
        ***REMOVED***
            //  Avoid setting multiple listeners
            return;
        ***REMOVED***

        var _this = this;

        this._onMouseDown = function (event) ***REMOVED***
            return _this.onMouseDown(event);
        ***REMOVED***;

        this._onMouseMove = function (event) ***REMOVED***
            return _this.onMouseMove(event);
        ***REMOVED***;

        this._onMouseUp = function (event) ***REMOVED***
            return _this.onMouseUp(event);
        ***REMOVED***;

        this._onMouseUpGlobal = function (event) ***REMOVED***
            return _this.onMouseUpGlobal(event);
        ***REMOVED***;

        this._onMouseOutGlobal = function (event) ***REMOVED***
            return _this.onMouseOutGlobal(event);
        ***REMOVED***;

        this._onMouseOut = function (event) ***REMOVED***
            return _this.onMouseOut(event);
        ***REMOVED***;

        this._onMouseOver = function (event) ***REMOVED***
            return _this.onMouseOver(event);
        ***REMOVED***;

        this._onMouseWheel = function (event) ***REMOVED***
            return _this.onMouseWheel(event);
        ***REMOVED***;

        var canvas = this.game.canvas;

        canvas.addEventListener('mousedown', this._onMouseDown, true);
        canvas.addEventListener('mousemove', this._onMouseMove, true);
        canvas.addEventListener('mouseup', this._onMouseUp, true);

        if (!this.game.device.cocoonJS)
        ***REMOVED***
            window.addEventListener('mouseup', this._onMouseUpGlobal, true);
            window.addEventListener('mouseout', this._onMouseOutGlobal, true);
            canvas.addEventListener('mouseover', this._onMouseOver, true);
            canvas.addEventListener('mouseout', this._onMouseOut, true);
        ***REMOVED***

        var wheelEvent = this.game.device.wheelEvent;

        if (wheelEvent)
        ***REMOVED***
            canvas.addEventListener(wheelEvent, this._onMouseWheel, true);

            if (wheelEvent === 'mousewheel')
            ***REMOVED***
                this._wheelEvent = new WheelEventProxy(-1/40, 1);
            ***REMOVED***
            else if (wheelEvent === 'DOMMouseScroll')
            ***REMOVED***
                this._wheelEvent = new WheelEventProxy(1, 1);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * The internal method that handles the mouse down event from the browser.
    * @method Phaser.Mouse#onMouseDown
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseDown: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        if (this.mouseDownCallback)
        ***REMOVED***
            this.mouseDownCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (!this.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        event['identifier'] = 0;

        this.input.mousePointer.start(event);

    ***REMOVED***,

    /**
    * The internal method that handles the mouse move event from the browser.
    * @method Phaser.Mouse#onMouseMove
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseMove: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        if (this.mouseMoveCallback)
        ***REMOVED***
            this.mouseMoveCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (!this.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        event['identifier'] = 0;

        this.input.mousePointer.move(event);

    ***REMOVED***,

    /**
    * The internal method that handles the mouse up event from the browser.
    * @method Phaser.Mouse#onMouseUp
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseUp: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        if (this.mouseUpCallback)
        ***REMOVED***
            this.mouseUpCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (!this.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        event['identifier'] = 0;

        this.input.mousePointer.stop(event);

    ***REMOVED***,

    /**
    * The internal method that handles the mouse up event from the window.
    *
    * @method Phaser.Mouse#onMouseUpGlobal
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseUpGlobal: function (event) ***REMOVED***

        if (!this.input.mousePointer.withinGame)
        ***REMOVED***
            if (this.mouseUpCallback)
            ***REMOVED***
                this.mouseUpCallback.call(this.callbackContext, event);
            ***REMOVED***

            event['identifier'] = 0;

            this.input.mousePointer.stop(event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * The internal method that handles the mouse out event from the window.
    *
    * @method Phaser.Mouse#onMouseOutGlobal
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseOutGlobal: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        this.input.mousePointer.withinGame = false;

        if (!this.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        //  If we get a mouseout event from the window then basically
        //  something serious has gone down, usually along the lines of
        //  the browser opening a context-menu or similar.
        //  On OS X Chrome especially this is bad news, as it blocks
        //  us then getting a mouseup event, so we need to force that through.
        //
        //  No matter what, we must cancel the left and right buttons

        this.input.mousePointer.stop(event);
        this.input.mousePointer.leftButton.stop(event);
        this.input.mousePointer.rightButton.stop(event);

    ***REMOVED***,

    /**
    * The internal method that handles the mouse out event from the browser.
    *
    * @method Phaser.Mouse#onMouseOut
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseOut: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        this.input.mousePointer.withinGame = false;

        if (this.mouseOutCallback)
        ***REMOVED***
            this.mouseOutCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (!this.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this.stopOnGameOut)
        ***REMOVED***
            event['identifier'] = 0;

            this.input.mousePointer.stop(event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * The internal method that handles the mouse over event from the browser.
    *
    * @method Phaser.Mouse#onMouseOver
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The native event from the browser. This gets stored in Mouse.event.
    */
    onMouseOver: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        this.input.mousePointer.withinGame = true;

        if (this.mouseOverCallback)
        ***REMOVED***
            this.mouseOverCallback.call(this.callbackContext, event);
        ***REMOVED***

    ***REMOVED***,

    /**
     * The internal method that handles the mouse wheel event from the browser.
     *
     * @method Phaser.Mouse#onMouseWheel
     * @param ***REMOVED***MouseEvent***REMOVED*** event - The native event from the browser.
     */
    onMouseWheel: function (event) ***REMOVED***

        if (this._wheelEvent) ***REMOVED***
            event = this._wheelEvent.bindEvent(event);
        ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        // reverse detail for firefox
        this.wheelDelta = Phaser.Math.clamp(-event.deltaY, -1, 1);

        if (this.mouseWheelCallback)
        ***REMOVED***
            this.mouseWheelCallback.call(this.callbackContext, event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * If the browser supports it you can request that the pointer be locked to the browser window.
    * This is classically known as 'FPS controls', where the pointer can't leave the browser until the user presses an exit key.
    * If the browser successfully enters a locked state the event Phaser.Mouse.pointerLock will be dispatched and the first parameter will be 'true'.
    * @method Phaser.Mouse#requestPointerLock
    */
    requestPointerLock: function () ***REMOVED***

        if (this.game.device.pointerLock)
        ***REMOVED***
            var element = this.game.canvas;

            element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

            element.requestPointerLock();

            var _this = this;

            this._pointerLockChange = function (event) ***REMOVED***
                return _this.pointerLockChange(event);
            ***REMOVED***;

            document.addEventListener('pointerlockchange', this._pointerLockChange, true);
            document.addEventListener('mozpointerlockchange', this._pointerLockChange, true);
            document.addEventListener('webkitpointerlockchange', this._pointerLockChange, true);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal pointerLockChange handler.
    *
    * @method Phaser.Mouse#pointerLockChange
    * @param ***REMOVED***Event***REMOVED*** event - The native event from the browser. This gets stored in Mouse.event.
    */
    pointerLockChange: function (event) ***REMOVED***

        var element = this.game.canvas;

        if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element)
        ***REMOVED***
            //  Pointer was successfully locked
            this.locked = true;
            this.pointerLock.dispatch(true, event);
        ***REMOVED***
        else
        ***REMOVED***
            //  Pointer was unlocked
            this.locked = false;
            this.pointerLock.dispatch(false, event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal release pointer lock handler.
    * @method Phaser.Mouse#releasePointerLock
    */
    releasePointerLock: function () ***REMOVED***

        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;

        document.exitPointerLock();

        document.removeEventListener('pointerlockchange', this._pointerLockChange, true);
        document.removeEventListener('mozpointerlockchange', this._pointerLockChange, true);
        document.removeEventListener('webkitpointerlockchange', this._pointerLockChange, true);

    ***REMOVED***,

    /**
    * Stop the event listeners.
    * @method Phaser.Mouse#stop
    */
    stop: function () ***REMOVED***

        var canvas = this.game.canvas;

        canvas.removeEventListener('mousedown', this._onMouseDown, true);
        canvas.removeEventListener('mousemove', this._onMouseMove, true);
        canvas.removeEventListener('mouseup', this._onMouseUp, true);
        canvas.removeEventListener('mouseover', this._onMouseOver, true);
        canvas.removeEventListener('mouseout', this._onMouseOut, true);

        var wheelEvent = this.game.device.wheelEvent;

        if (wheelEvent)
        ***REMOVED***
            canvas.removeEventListener(wheelEvent, this._onMouseWheel, true);
        ***REMOVED***

        window.removeEventListener('mouseup', this._onMouseUpGlobal, true);
        window.removeEventListener('mouseout', this._onMouseOutGlobal, true);

        document.removeEventListener('pointerlockchange', this._pointerLockChange, true);
        document.removeEventListener('mozpointerlockchange', this._pointerLockChange, true);
        document.removeEventListener('webkitpointerlockchange', this._pointerLockChange, true);

    ***REMOVED***

***REMOVED***;

Phaser.Mouse.prototype.constructor = Phaser.Mouse;

/* jshint latedef:nofunc */
/**
* A purely internal event support class to proxy 'wheelscroll' and 'DOMMouseWheel'
* events to 'wheel'-like events.
*
* See https://developer.mozilla.org/en-US/docs/Web/Events/mousewheel for choosing a scale and delta mode.
*
* @method Phaser.Mouse#WheelEventProxy
* @private
* @param ***REMOVED***number***REMOVED*** scaleFactor - Scale factor as applied to wheelDelta/wheelDeltaX or details.
* @param ***REMOVED***integer***REMOVED*** deltaMode - The reported delta mode.
*/
function WheelEventProxy (scaleFactor, deltaMode) ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** _scaleFactor - Scale factor as applied to wheelDelta/wheelDeltaX or details.
    * @private
    */
    this._scaleFactor = scaleFactor;

    /**
    * @property ***REMOVED***number***REMOVED*** _deltaMode - The reported delta mode.
    * @private
    */
    this._deltaMode = deltaMode;

    /**
    * @property ***REMOVED***any***REMOVED*** originalEvent - The original event _currently_ being proxied; the getters will follow suit.
    * @private
    */
    this.originalEvent = null;

***REMOVED***

WheelEventProxy.prototype = ***REMOVED******REMOVED***;
WheelEventProxy.prototype.constructor = WheelEventProxy;

WheelEventProxy.prototype.bindEvent = function (event) ***REMOVED***

    // Generate stubs automatically
    if (!WheelEventProxy._stubsGenerated && event)
    ***REMOVED***
        var makeBinder = function (name) ***REMOVED***

            return function () ***REMOVED***
                var v = this.originalEvent[name];
                return typeof v !== 'function' ? v : v.bind(this.originalEvent);
            ***REMOVED***;

        ***REMOVED***;

        for (var prop in event)
        ***REMOVED***
            if (!(prop in WheelEventProxy.prototype))
            ***REMOVED***
                Object.defineProperty(WheelEventProxy.prototype, prop, ***REMOVED***
                    get: makeBinder(prop)
                ***REMOVED***);
            ***REMOVED***
        ***REMOVED***
        WheelEventProxy._stubsGenerated = true;
    ***REMOVED***

    this.originalEvent = event;
    return this;

***REMOVED***;

Object.defineProperties(WheelEventProxy.prototype, ***REMOVED***
    "type": ***REMOVED*** value: "wheel" ***REMOVED***,
    "deltaMode": ***REMOVED*** get: function () ***REMOVED*** return this._deltaMode; ***REMOVED*** ***REMOVED***,
    "deltaY": ***REMOVED***
        get: function () ***REMOVED***
            return (this._scaleFactor * (this.originalEvent.wheelDelta || this.originalEvent.detail)) || 0;
        ***REMOVED***
    ***REMOVED***,
    "deltaX": ***REMOVED***
        get: function () ***REMOVED***
            return (this._scaleFactor * this.originalEvent.wheelDeltaX) || 0;
        ***REMOVED***
    ***REMOVED***,
    "deltaZ": ***REMOVED*** value: 0 ***REMOVED***
***REMOVED***);
