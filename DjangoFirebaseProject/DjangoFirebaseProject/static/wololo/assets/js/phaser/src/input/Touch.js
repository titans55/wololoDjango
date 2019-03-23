/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Phaser.Touch handles touch events with your game. Note: Android 2.x only supports 1 touch event at once, no multi-touch.
*
* You should not normally access this class directly, but instead use a Phaser.Pointer object which normalises all game input for you.
*
* @class Phaser.Touch
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
*/
Phaser.Touch = function (game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * Touch events will only be processed if enabled.
    * @property ***REMOVED***boolean***REMOVED*** enabled
    * @default
    */
    this.enabled = true;

    /**
    * An array of callbacks that will be fired every time a native touch start or touch end event is received from the browser.
    * This is used internally to handle audio and video unlocking on mobile devices.
    * To add a callback to this array please use `Touch.addTouchLockCallback`.
    * @property ***REMOVED***array***REMOVED*** touchLockCallbacks
    * @protected
    */
    this.touchLockCallbacks = [];

    /**
    * @property ***REMOVED***object***REMOVED*** callbackContext - The context under which callbacks are called.
    */
    this.callbackContext = this.game;

    /**
    * @property ***REMOVED***function***REMOVED*** touchStartCallback - A callback that can be fired on a touchStart event.
    */
    this.touchStartCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** touchMoveCallback - A callback that can be fired on a touchMove event.
    */
    this.touchMoveCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** touchEndCallback - A callback that can be fired on a touchEnd event.
    */
    this.touchEndCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** touchEnterCallback - A callback that can be fired on a touchEnter event.
    */
    this.touchEnterCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** touchLeaveCallback - A callback that can be fired on a touchLeave event.
    */
    this.touchLeaveCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** touchCancelCallback - A callback that can be fired on a touchCancel event.
    */
    this.touchCancelCallback = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** preventDefault - If true the TouchEvent will have prevent.default called on it.
    * @default
    */
    this.preventDefault = true;

    /**
    * @property ***REMOVED***TouchEvent***REMOVED*** event - The browser touch DOM event. Will be set to null if no touch event has ever been received.
    * @default
    */
    this.event = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onTouchStart - Internal event handler reference.
    * @private
    */
    this._onTouchStart = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onTouchMove - Internal event handler reference.
    * @private
    */
    this._onTouchMove = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onTouchEnd - Internal event handler reference.
    * @private
    */
    this._onTouchEnd = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onTouchEnter - Internal event handler reference.
    * @private
    */
    this._onTouchEnter = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onTouchLeave - Internal event handler reference.
    * @private
    */
    this._onTouchLeave = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onTouchCancel - Internal event handler reference.
    * @private
    */
    this._onTouchCancel = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onTouchMove - Internal event handler reference.
    * @private
    */
    this._onTouchMove = null;

***REMOVED***;

Phaser.Touch.prototype = ***REMOVED***

    /**
    * Starts the event listeners running.
    * @method Phaser.Touch#start
    */
    start: function () ***REMOVED***

        if (this._onTouchStart !== null)
        ***REMOVED***
            //  Avoid setting multiple listeners
            return;
        ***REMOVED***

        var _this = this;

        if (this.game.device.touch)
        ***REMOVED***
            this._onTouchStart = function (event) ***REMOVED***
                return _this.onTouchStart(event);
            ***REMOVED***;

            this._onTouchMove = function (event) ***REMOVED***
                return _this.onTouchMove(event);
            ***REMOVED***;

            this._onTouchEnd = function (event) ***REMOVED***
                return _this.onTouchEnd(event);
            ***REMOVED***;

            this._onTouchEnter = function (event) ***REMOVED***
                return _this.onTouchEnter(event);
            ***REMOVED***;

            this._onTouchLeave = function (event) ***REMOVED***
                return _this.onTouchLeave(event);
            ***REMOVED***;

            this._onTouchCancel = function (event) ***REMOVED***
                return _this.onTouchCancel(event);
            ***REMOVED***;

            this.game.canvas.addEventListener('touchstart', this._onTouchStart, false);
            this.game.canvas.addEventListener('touchmove', this._onTouchMove, false);
            this.game.canvas.addEventListener('touchend', this._onTouchEnd, false);
            this.game.canvas.addEventListener('touchcancel', this._onTouchCancel, false);

            if (!this.game.device.cocoonJS)
            ***REMOVED***
                this.game.canvas.addEventListener('touchenter', this._onTouchEnter, false);
                this.game.canvas.addEventListener('touchleave', this._onTouchLeave, false);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Consumes all touchmove events on the document (only enable this if you know you need it!).
    * @method Phaser.Touch#consumeTouchMove
    */
    consumeDocumentTouches: function () ***REMOVED***

        this._documentTouchMove = function (event) ***REMOVED***
            event.preventDefault();
        ***REMOVED***;

        document.addEventListener('touchmove', this._documentTouchMove, false);

    ***REMOVED***,

    /**
    * Adds a callback that is fired when a browser touchstart or touchend event is received.
    *
    * This is used internally to handle audio and video unlocking on mobile devices.
    *
    * If the callback returns 'true' then the callback is automatically deleted once invoked.
    *
    * The callback is added to the Phaser.Touch.touchLockCallbacks array and should be removed with Phaser.Touch.removeTouchLockCallback.
    * 
    * @method Phaser.Touch#addTouchLockCallback
    * @param ***REMOVED***function***REMOVED*** callback - The callback that will be called when a touchstart event is received.
    * @param ***REMOVED***object***REMOVED*** context - The context in which the callback will be called.
    * @param ***REMOVED***boolean***REMOVED*** [onEnd=false] - Will the callback fire on a touchstart (default) or touchend event?
    */
    addTouchLockCallback: function (callback, context, onEnd) ***REMOVED***

        if (onEnd === undefined) ***REMOVED*** onEnd = false; ***REMOVED***

        this.touchLockCallbacks.push(***REMOVED*** callback: callback, context: context, onEnd: onEnd ***REMOVED***);

    ***REMOVED***,

    /**
    * Removes the callback at the defined index from the Phaser.Touch.touchLockCallbacks array
    * 
    * @method Phaser.Touch#removeTouchLockCallback
    * @param ***REMOVED***function***REMOVED*** callback - The callback to be removed.
    * @param ***REMOVED***object***REMOVED*** context - The context in which the callback exists.
    * @return ***REMOVED***boolean***REMOVED*** True if the callback was deleted, otherwise false.
    */
    removeTouchLockCallback: function (callback, context) ***REMOVED***

        var i = this.touchLockCallbacks.length;

        while (i--)
        ***REMOVED***
            if (this.touchLockCallbacks[i].callback === callback && this.touchLockCallbacks[i].context === context)
            ***REMOVED***
                this.touchLockCallbacks.splice(i, 1);
                return true;
            ***REMOVED***
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * The internal method that handles the touchstart event from the browser.
    * @method Phaser.Touch#onTouchStart
    * @param ***REMOVED***TouchEvent***REMOVED*** event - The native event from the browser. This gets stored in Touch.event.
    */
    onTouchStart: function (event) ***REMOVED***

        var i = this.touchLockCallbacks.length;

        while (i--)
        ***REMOVED***
            var cb = this.touchLockCallbacks[i];

            if (!cb.onEnd && cb.callback.call(cb.context, this, event))
            ***REMOVED***
                this.touchLockCallbacks.splice(i, 1);
            ***REMOVED***
        ***REMOVED***

        this.event = event;

        if (!this.game.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this.touchStartCallback)
        ***REMOVED***
            this.touchStartCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (this.preventDefault)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        //  event.targetTouches = list of all touches on the TARGET ELEMENT (i.e. game dom element)
        //  event.touches = list of all touches on the ENTIRE DOCUMENT, not just the target element
        //  event.changedTouches = the touches that CHANGED in this event, not the total number of them
        for (var i = 0; i < event.changedTouches.length; i++)
        ***REMOVED***
            this.game.input.startPointer(event.changedTouches[i]);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Touch cancel - touches that were disrupted (perhaps by moving into a plugin or browser chrome).
    * Occurs for example on iOS when you put down 4 fingers and the app selector UI appears.
    * @method Phaser.Touch#onTouchCancel
    * @param ***REMOVED***TouchEvent***REMOVED*** event - The native event from the browser. This gets stored in Touch.event.
    */
    onTouchCancel: function (event) ***REMOVED***

        this.event = event;

        if (this.touchCancelCallback)
        ***REMOVED***
            this.touchCancelCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (!this.game.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this.preventDefault)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        //  Touch cancel - touches that were disrupted (perhaps by moving into a plugin or browser chrome)
        //  http://www.w3.org/TR/touch-events/#dfn-touchcancel
        for (var i = 0; i < event.changedTouches.length; i++)
        ***REMOVED***
            this.game.input.stopPointer(event.changedTouches[i]);
        ***REMOVED***

    ***REMOVED***,

    /**
    * For touch enter and leave its a list of the touch points that have entered or left the target.
    * Doesn't appear to be supported by most browsers on a canvas element yet.
    * @method Phaser.Touch#onTouchEnter
    * @param ***REMOVED***TouchEvent***REMOVED*** event - The native event from the browser. This gets stored in Touch.event.
    */
    onTouchEnter: function (event) ***REMOVED***

        this.event = event;

        if (this.touchEnterCallback)
        ***REMOVED***
            this.touchEnterCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (!this.game.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this.preventDefault)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

    ***REMOVED***,

    /**
    * For touch enter and leave its a list of the touch points that have entered or left the target.
    * Doesn't appear to be supported by most browsers on a canvas element yet.
    * @method Phaser.Touch#onTouchLeave
    * @param ***REMOVED***TouchEvent***REMOVED*** event - The native event from the browser. This gets stored in Touch.event.
    */
    onTouchLeave: function (event) ***REMOVED***

        this.event = event;

        if (this.touchLeaveCallback)
        ***REMOVED***
            this.touchLeaveCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (this.preventDefault)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

    ***REMOVED***,

    /**
    * The handler for the touchmove events.
    * @method Phaser.Touch#onTouchMove
    * @param ***REMOVED***TouchEvent***REMOVED*** event - The native event from the browser. This gets stored in Touch.event.
    */
    onTouchMove: function (event) ***REMOVED***

        this.event = event;

        if (this.touchMoveCallback)
        ***REMOVED***
            this.touchMoveCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (this.preventDefault)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        for (var i = 0; i < event.changedTouches.length; i++)
        ***REMOVED***
            this.game.input.updatePointer(event.changedTouches[i]);
        ***REMOVED***

    ***REMOVED***,

    /**
    * The handler for the touchend events.
    * @method Phaser.Touch#onTouchEnd
    * @param ***REMOVED***TouchEvent***REMOVED*** event - The native event from the browser. This gets stored in Touch.event.
    */
    onTouchEnd: function (event) ***REMOVED***

        var i = this.touchLockCallbacks.length;

        while (i--)
        ***REMOVED***
            var cb = this.touchLockCallbacks[i];

            if (cb.onEnd && cb.callback.call(cb.context, this, event))
            ***REMOVED***
                this.touchLockCallbacks.splice(i, 1);
            ***REMOVED***
        ***REMOVED***

        this.event = event;

        if (this.touchEndCallback)
        ***REMOVED***
            this.touchEndCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (this.preventDefault)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        //  For touch end its a list of the touch points that have been removed from the surface
        //  https://developer.mozilla.org/en-US/docs/DOM/TouchList
        //  event.changedTouches = the touches that CHANGED in this event, not the total number of them
        for (var i = 0; i < event.changedTouches.length; i++)
        ***REMOVED***
            this.game.input.stopPointer(event.changedTouches[i]);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Stop the event listeners.
    * @method Phaser.Touch#stop
    */
    stop: function () ***REMOVED***

        if (this.game.device.touch)
        ***REMOVED***
            this.game.canvas.removeEventListener('touchstart', this._onTouchStart);
            this.game.canvas.removeEventListener('touchmove', this._onTouchMove);
            this.game.canvas.removeEventListener('touchend', this._onTouchEnd);
            this.game.canvas.removeEventListener('touchenter', this._onTouchEnter);
            this.game.canvas.removeEventListener('touchleave', this._onTouchLeave);
            this.game.canvas.removeEventListener('touchcancel', this._onTouchCancel);
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

Phaser.Touch.prototype.constructor = Phaser.Touch;
