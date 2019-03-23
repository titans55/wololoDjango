/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The MSPointer class handles Microsoft touch interactions with the game and the resulting Pointer objects.
*
* It will work only in Internet Explorer 10+ and Windows Store or Windows Phone 8 apps using JavaScript.
* http://msdn.microsoft.com/en-us/library/ie/hh673557(v=vs.85).aspx
*
* You should not normally access this class directly, but instead use a Phaser.Pointer object which 
* normalises all game input for you including accurate button handling.
*
* Please note that at the current time of writing Phaser does not yet support chorded button interactions:
* http://www.w3.org/TR/pointerevents/#chorded-button-interactions
*
* @class Phaser.MSPointer
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
*/
Phaser.MSPointer = function (game) ***REMOVED***

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
    * @property ***REMOVED***object***REMOVED*** callbackContext - The context under which callbacks are called (defaults to game).
    */
    this.callbackContext = this.game;

    /**
    * @property ***REMOVED***function***REMOVED*** pointerDownCallback - A callback that can be fired on a MSPointerDown event.
    */
    this.pointerDownCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** pointerMoveCallback - A callback that can be fired on a MSPointerMove event.
    */
    this.pointerMoveCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** pointerUpCallback - A callback that can be fired on a MSPointerUp event.
    */
    this.pointerUpCallback = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** capture - If true the Pointer events will have event.preventDefault applied to them, if false they will propagate fully.
    */
    this.capture = true;

    /**
    * This property was removed in Phaser 2.4 and should no longer be used.
    * Instead please see the Pointer button properties such as `Pointer.leftButton`, `Pointer.rightButton` and so on.
    * Or Pointer.button holds the DOM event button value if you require that.
    * @property ***REMOVED***number***REMOVED*** button
    */
    this.button = -1;

    /**
    * The browser MSPointer DOM event. Will be null if no event has ever been received.
    * Access this property only inside a Pointer event handler and do not keep references to it.
    * @property ***REMOVED***MSPointerEvent|null***REMOVED*** event
    * @default
    */
    this.event = null;

    /**
    * MSPointer input will only be processed if enabled.
    * @property ***REMOVED***boolean***REMOVED*** enabled
    * @default
    */
    this.enabled = true;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMSPointerDown - Internal function to handle MSPointer events.
    * @private
    */
    this._onMSPointerDown = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMSPointerMove - Internal function to handle MSPointer events.
    * @private
    */
    this._onMSPointerMove = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMSPointerUp - Internal function to handle MSPointer events.
    * @private
    */
    this._onMSPointerUp = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMSPointerUpGlobal - Internal function to handle MSPointer events.
    * @private
    */
    this._onMSPointerUpGlobal = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMSPointerOut - Internal function to handle MSPointer events.
    * @private
    */
    this._onMSPointerOut = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _onMSPointerOver - Internal function to handle MSPointer events.
    * @private
    */
    this._onMSPointerOver = null;

***REMOVED***;

Phaser.MSPointer.prototype = ***REMOVED***

    /**
    * Starts the event listeners running.
    * @method Phaser.MSPointer#start
    */
    start: function () ***REMOVED***

        if (this._onMSPointerDown !== null)
        ***REMOVED***
            //  Avoid setting multiple listeners
            return;
        ***REMOVED***

        var _this = this;

        if (this.game.device.mspointer)
        ***REMOVED***
            this._onMSPointerDown = function (event) ***REMOVED***
                return _this.onPointerDown(event);
            ***REMOVED***;

            this._onMSPointerMove = function (event) ***REMOVED***
                return _this.onPointerMove(event);
            ***REMOVED***;

            this._onMSPointerUp = function (event) ***REMOVED***
                return _this.onPointerUp(event);
            ***REMOVED***;

            this._onMSPointerUpGlobal = function (event) ***REMOVED***
                return _this.onPointerUpGlobal(event);
            ***REMOVED***;

            this._onMSPointerOut = function (event) ***REMOVED***
                return _this.onPointerOut(event);
            ***REMOVED***;

            this._onMSPointerOver = function (event) ***REMOVED***
                return _this.onPointerOver(event);
            ***REMOVED***;

            var canvas = this.game.canvas;

            canvas.addEventListener('MSPointerDown', this._onMSPointerDown, false);
            canvas.addEventListener('MSPointerMove', this._onMSPointerMove, false);
            canvas.addEventListener('MSPointerUp', this._onMSPointerUp, false);

            //  IE11+ uses non-prefix events
            canvas.addEventListener('pointerdown', this._onMSPointerDown, false);
            canvas.addEventListener('pointermove', this._onMSPointerMove, false);
            canvas.addEventListener('pointerup', this._onMSPointerUp, false);

            canvas.style['-ms-content-zooming'] = 'none';
            canvas.style['-ms-touch-action'] = 'none';

            if (!this.game.device.cocoonJS)
            ***REMOVED***
                window.addEventListener('MSPointerUp', this._onMSPointerUpGlobal, true);
                canvas.addEventListener('MSPointerOver', this._onMSPointerOver, true);
                canvas.addEventListener('MSPointerOut', this._onMSPointerOut, true);

                //  IE11+ uses non-prefix events
                window.addEventListener('pointerup', this._onMSPointerUpGlobal, true);
                canvas.addEventListener('pointerover', this._onMSPointerOver, true);
                canvas.addEventListener('pointerout', this._onMSPointerOut, true);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * The function that handles the PointerDown event.
    * 
    * @method Phaser.MSPointer#onPointerDown
    * @param ***REMOVED***PointerEvent***REMOVED*** event - The native DOM event.
    */
    onPointerDown: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        if (this.pointerDownCallback)
        ***REMOVED***
            this.pointerDownCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (!this.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        event.identifier = event.pointerId;

        if (event.pointerType === 'mouse' || event.pointerType === 0x00000004)
        ***REMOVED***
            this.input.mousePointer.start(event);
        ***REMOVED***
        else
        ***REMOVED***
            this.input.startPointer(event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * The function that handles the PointerMove event.
    * @method Phaser.MSPointer#onPointerMove
    * @param ***REMOVED***PointerEvent***REMOVED*** event - The native DOM event.
    */
    onPointerMove: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        if (this.pointerMoveCallback)
        ***REMOVED***
            this.pointerMoveCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (!this.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        event.identifier = event.pointerId;

        if (event.pointerType === 'mouse' || event.pointerType === 0x00000004)
        ***REMOVED***
            this.input.mousePointer.move(event);
        ***REMOVED***
        else
        ***REMOVED***
            this.input.updatePointer(event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * The function that handles the PointerUp event.
    * @method Phaser.MSPointer#onPointerUp
    * @param ***REMOVED***PointerEvent***REMOVED*** event - The native DOM event.
    */
    onPointerUp: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        if (this.pointerUpCallback)
        ***REMOVED***
            this.pointerUpCallback.call(this.callbackContext, event);
        ***REMOVED***

        if (!this.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        event.identifier = event.pointerId;

        if (event.pointerType === 'mouse' || event.pointerType === 0x00000004)
        ***REMOVED***
            this.input.mousePointer.stop(event);
        ***REMOVED***
        else
        ***REMOVED***
            this.input.stopPointer(event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * The internal method that handles the mouse up event from the window.
    * 
    * @method Phaser.MSPointer#onPointerUpGlobal
    * @param ***REMOVED***PointerEvent***REMOVED*** event - The native event from the browser. This gets stored in MSPointer.event.
    */
    onPointerUpGlobal: function (event) ***REMOVED***

        if ((event.pointerType === 'mouse' || event.pointerType === 0x00000004) && !this.input.mousePointer.withinGame)
        ***REMOVED***
            this.onPointerUp(event);
        ***REMOVED***
        else
        ***REMOVED***
            var pointer = this.input.getPointerFromIdentifier(event.identifier);

            if (pointer && pointer.withinGame)
            ***REMOVED***
                this.onPointerUp(event);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * The internal method that handles the pointer out event from the browser.
    *
    * @method Phaser.MSPointer#onPointerOut
    * @param ***REMOVED***PointerEvent***REMOVED*** event - The native event from the browser. This gets stored in MSPointer.event.
    */
    onPointerOut: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        if (event.pointerType === 'mouse' || event.pointerType === 0x00000004)
        ***REMOVED***
            this.input.mousePointer.withinGame = false;
        ***REMOVED***
        else
        ***REMOVED***
            var pointer = this.input.getPointerFromIdentifier(event.identifier);

            if (pointer)
            ***REMOVED***
                pointer.withinGame = false;
            ***REMOVED***
        ***REMOVED***

        if (this.input.mouse.mouseOutCallback)
        ***REMOVED***
            this.input.mouse.mouseOutCallback.call(this.input.mouse.callbackContext, event);
        ***REMOVED***

        if (!this.input.enabled || !this.enabled)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this.input.mouse.stopOnGameOut)
        ***REMOVED***
            event['identifier'] = 0;

            if (pointer)
            ***REMOVED***
                pointer.stop(event);
            ***REMOVED***
            else
            ***REMOVED***
                this.input.mousePointer.stop(event);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * The internal method that handles the pointer out event from the browser.
    *
    * @method Phaser.MSPointer#onPointerOut
    * @param ***REMOVED***PointerEvent***REMOVED*** event - The native event from the browser. This gets stored in MSPointer.event.
    */
    onPointerOver: function (event) ***REMOVED***

        this.event = event;

        if (this.capture)
        ***REMOVED***
            event.preventDefault();
        ***REMOVED***

        if (event.pointerType === 'mouse' || event.pointerType === 0x00000004)
        ***REMOVED***
            this.input.mousePointer.withinGame = true;
        ***REMOVED***
        else
        ***REMOVED***
            var pointer = this.input.getPointerFromIdentifier(event.identifier);

            if (pointer)
            ***REMOVED***
                pointer.withinGame = true;
            ***REMOVED***
        ***REMOVED***

        if (this.input.mouse.mouseOverCallback)
        ***REMOVED***
            this.input.mouse.mouseOverCallback.call(this.input.mouse.callbackContext, event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Stop the event listeners.
    * @method Phaser.MSPointer#stop
    */
    stop: function () ***REMOVED***

        var canvas = this.game.canvas;

        canvas.removeEventListener('MSPointerDown', this._onMSPointerDown, false);
        canvas.removeEventListener('MSPointerMove', this._onMSPointerMove, false);
        canvas.removeEventListener('MSPointerUp', this._onMSPointerUp, false);

        //  IE11+ uses non-prefix events
        canvas.removeEventListener('pointerdown', this._onMSPointerDown, false);
        canvas.removeEventListener('pointermove', this._onMSPointerMove, false);
        canvas.removeEventListener('pointerup', this._onMSPointerUp, false);

        window.removeEventListener('MSPointerUp', this._onMSPointerUpGlobal, true);
        canvas.removeEventListener('MSPointerOver', this._onMSPointerOver, true);
        canvas.removeEventListener('MSPointerOut', this._onMSPointerOut, true);

        //  IE11+ uses non-prefix events
        window.removeEventListener('pointerup', this._onMSPointerUpGlobal, true);
        canvas.removeEventListener('pointerover', this._onMSPointerOver, true);
        canvas.removeEventListener('pointerout', this._onMSPointerOut, true);

    ***REMOVED***

***REMOVED***;

Phaser.MSPointer.prototype.constructor = Phaser.MSPointer;
