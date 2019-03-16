/**
* @author       @karlmacklin <tacklemcclean@gmail.com>
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A single Phaser Gamepad
* 
* @class Phaser.SinglePad
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Current game instance.
* @param ***REMOVED***object***REMOVED*** padParent - The parent Phaser.Gamepad object (all gamepads reside under this)
*/
Phaser.SinglePad = function (game, padParent) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***number***REMOVED*** index - The gamepad index as per browsers data
    * @readonly
    */
    this.index = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** connected - Whether or not this particular gamepad is connected or not.
    * @readonly
    */
    this.connected = false;

    /**
    * @property ***REMOVED***object***REMOVED*** callbackContext - The context under which the callbacks are run.
    */
    this.callbackContext = this;

    /**
    * @property ***REMOVED***function***REMOVED*** onConnectCallback - This callback is invoked every time this gamepad is connected
    */
    this.onConnectCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onDisconnectCallback - This callback is invoked every time this gamepad is disconnected
    */
    this.onDisconnectCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onDownCallback - This callback is invoked every time a button is pressed down.
    */
    this.onDownCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onUpCallback - This callback is invoked every time a gamepad button is released.
    */
    this.onUpCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onAxisCallback - This callback is invoked every time an axis is changed.
    */
    this.onAxisCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** onFloatCallback - This callback is invoked every time a button is changed to a value where value > 0 and value < 1.
    */
    this.onFloatCallback = null;

    /**
    * @property ***REMOVED***number***REMOVED*** deadZone - Dead zone for axis feedback - within this value you won't trigger updates.
    */
    this.deadZone = 0.26;

    /**
    * @property ***REMOVED***Phaser.Gamepad***REMOVED*** padParent - Main Phaser Gamepad object
    * @private
    */
    this._padParent = padParent;

    /**
    * @property ***REMOVED***object***REMOVED*** _rawPad - The 'raw' gamepad data.
    * @private
    */
    this._rawPad = null;

    /**
    * @property ***REMOVED***number***REMOVED*** _prevTimestamp - Used to check for differences between earlier polls and current state of gamepads.
    * @private
    */
    this._prevTimestamp = null;

    /**
    * @property ***REMOVED***Array***REMOVED*** _buttons - Array of Phaser.DeviceButton objects. This array is populated when the gamepad is connected.
    * @private
    */
    this._buttons = [];

    /**
    * @property ***REMOVED***number***REMOVED*** _buttonsLen - Length of the _buttons array.
    * @private
    */
    this._buttonsLen = 0;

    /**
    * @property ***REMOVED***Array***REMOVED*** _axes - Current axes state.
    * @private
    */
    this._axes = [];

    /**
    * @property ***REMOVED***number***REMOVED*** _axesLen - Length of the _axes array.
    * @private
    */
    this._axesLen = 0;

***REMOVED***;

Phaser.SinglePad.prototype = ***REMOVED***

    /**
    * Add callbacks to this Gamepad to handle connect / disconnect / button down / button up / axis change / float value buttons.
    * 
    * @method Phaser.SinglePad#addCallbacks
    * @param ***REMOVED***object***REMOVED*** context - The context under which the callbacks are run.
    * @param ***REMOVED***object***REMOVED*** callbacks - Object that takes six different callbak methods:
    * onConnectCallback, onDisconnectCallback, onDownCallback, onUpCallback, onAxisCallback, onFloatCallback
    */
    addCallbacks: function (context, callbacks) ***REMOVED***

        if (typeof callbacks !== 'undefined')
        ***REMOVED***
            this.onConnectCallback = (typeof callbacks.onConnect === 'function') ? callbacks.onConnect : this.onConnectCallback;
            this.onDisconnectCallback = (typeof callbacks.onDisconnect === 'function') ? callbacks.onDisconnect : this.onDisconnectCallback;
            this.onDownCallback = (typeof callbacks.onDown === 'function') ? callbacks.onDown : this.onDownCallback;
            this.onUpCallback = (typeof callbacks.onUp === 'function') ? callbacks.onUp : this.onUpCallback;
            this.onAxisCallback = (typeof callbacks.onAxis === 'function') ? callbacks.onAxis : this.onAxisCallback;
            this.onFloatCallback = (typeof callbacks.onFloat === 'function') ? callbacks.onFloat : this.onFloatCallback;

            this.callbackContext = context;
        ***REMOVED***
    ***REMOVED***,

    /**
    * Gets a DeviceButton object from this controller to be stored and referenced locally.
    * The DeviceButton object can then be polled, have events attached to it, etc.
    *
    * @method Phaser.SinglePad#getButton
    * @param ***REMOVED***number***REMOVED*** buttonCode - The buttonCode of the button, i.e. Phaser.Gamepad.BUTTON_0, Phaser.Gamepad.XBOX360_A, etc.
    * @return ***REMOVED***Phaser.DeviceButton***REMOVED*** The DeviceButton object which you can store locally and reference directly.
    */
    getButton: function (buttonCode) ***REMOVED***

        if (this._buttons[buttonCode])
        ***REMOVED***
            return this._buttons[buttonCode];
        ***REMOVED***
        else
        ***REMOVED***
            return null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Main update function called by Phaser.Gamepad.
    * 
    * @method Phaser.SinglePad#pollStatus
    */
    pollStatus: function () ***REMOVED***

        if (!this.connected || !this.game.input.enabled || !this.game.input.gamepad.enabled || (this._rawPad.timestamp && (this._rawPad.timestamp === this._prevTimestamp)))
        ***REMOVED***
            return;
        ***REMOVED***

        for (var i = 0; i < this._buttonsLen; i++)
        ***REMOVED***
            var rawButtonVal = isNaN(this._rawPad.buttons[i]) ? this._rawPad.buttons[i].value : this._rawPad.buttons[i];

            if (rawButtonVal !== this._buttons[i].value)
            ***REMOVED***
                if (rawButtonVal === 1)
                ***REMOVED***
                    this.processButtonDown(i, rawButtonVal);
                ***REMOVED***
                else if (rawButtonVal === 0)
                ***REMOVED***
                    this.processButtonUp(i, rawButtonVal);
                ***REMOVED***
                else
                ***REMOVED***
                    this.processButtonFloat(i, rawButtonVal);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        
        for (var index = 0; index < this._axesLen; index++)
        ***REMOVED***
            var value = this._rawPad.axes[index];

            if ((value > 0 && value > this.deadZone) || (value < 0 && value < -this.deadZone))
            ***REMOVED***
                this.processAxisChange(index, value);
            ***REMOVED***
            else
            ***REMOVED***
                this.processAxisChange(index, 0);
            ***REMOVED***
        ***REMOVED***

        this._prevTimestamp = this._rawPad.timestamp;

    ***REMOVED***,

    /**
    * Gamepad connect function, should be called by Phaser.Gamepad.
    * 
    * @method Phaser.SinglePad#connect
    * @param ***REMOVED***object***REMOVED*** rawPad - The raw gamepad object
    */
    connect: function (rawPad) ***REMOVED***

        var triggerCallback = !this.connected;

        this.connected = true;
        this.index = rawPad.index;

        this._rawPad = rawPad;

        this._buttons = [];
        this._buttonsLen = rawPad.buttons.length;

        this._axes = [];
        this._axesLen = rawPad.axes.length;

        for (var a = 0; a < this._axesLen; a++)
        ***REMOVED***
            this._axes[a] = rawPad.axes[a];
        ***REMOVED***

        for (var buttonCode in rawPad.buttons)
        ***REMOVED***
            buttonCode = parseInt(buttonCode, 10);
            this._buttons[buttonCode] = new Phaser.DeviceButton(this, buttonCode);
        ***REMOVED***

        if (triggerCallback && this._padParent.onConnectCallback)
        ***REMOVED***
            this._padParent.onConnectCallback.call(this._padParent.callbackContext, this.index);
        ***REMOVED***

        if (triggerCallback && this.onConnectCallback)
        ***REMOVED***
            this.onConnectCallback.call(this.callbackContext);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Gamepad disconnect function, should be called by Phaser.Gamepad.
    * 
    * @method Phaser.SinglePad#disconnect
    */
    disconnect: function () ***REMOVED***

        var triggerCallback = this.connected;
        var disconnectingIndex = this.index;

        this.connected = false;
        this.index = null;

        this._rawPad = undefined;

        for (var i = 0; i < this._buttonsLen; i++)
        ***REMOVED***
            this._buttons[i].destroy();
        ***REMOVED***

        this._buttons = [];
        this._buttonsLen = 0;

        this._axes = [];
        this._axesLen = 0;

        if (triggerCallback && this._padParent.onDisconnectCallback)
        ***REMOVED***
            this._padParent.onDisconnectCallback.call(this._padParent.callbackContext, disconnectingIndex);
        ***REMOVED***

        if (triggerCallback && this.onDisconnectCallback)
        ***REMOVED***
            this.onDisconnectCallback.call(this.callbackContext);
        ***REMOVED***

    ***REMOVED***,

    /**
     * Destroys this object and associated callback references.
     *
     * @method Phaser.SinglePad#destroy
     */
    destroy: function () ***REMOVED***

        this._rawPad = undefined;

        for (var i = 0; i < this._buttonsLen; i++)
        ***REMOVED***
            this._buttons[i].destroy();
        ***REMOVED***

        this._buttons = [];
        this._buttonsLen = 0;

        this._axes = [];
        this._axesLen = 0;

        this.onConnectCallback = null;
        this.onDisconnectCallback = null;
        this.onDownCallback = null;
        this.onUpCallback = null;
        this.onAxisCallback = null;
        this.onFloatCallback = null;

    ***REMOVED***,

    /**
    * Handles changes in axis.
    * 
    * @method Phaser.SinglePad#processAxisChange
    * @param ***REMOVED***object***REMOVED*** axisState - State of the relevant axis
    */
    processAxisChange: function (index, value) ***REMOVED***

        if (this._axes[index] === value)
        ***REMOVED***
            return;
        ***REMOVED***

        this._axes[index] = value;

        if (this._padParent.onAxisCallback)
        ***REMOVED***
            this._padParent.onAxisCallback.call(this._padParent.callbackContext, this, index, value);
        ***REMOVED***

        if (this.onAxisCallback)
        ***REMOVED***
            this.onAxisCallback.call(this.callbackContext, this, index, value);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Handles button down press.
    * 
    * @method Phaser.SinglePad#processButtonDown
    * @param ***REMOVED***number***REMOVED*** buttonCode - Which buttonCode of this button
    * @param ***REMOVED***object***REMOVED*** value - Button value
    */
    processButtonDown: function (buttonCode, value) ***REMOVED***

        if (this._buttons[buttonCode])
        ***REMOVED***
            this._buttons[buttonCode].start(null, value);
        ***REMOVED***

        if (this._padParent.onDownCallback)
        ***REMOVED***
            this._padParent.onDownCallback.call(this._padParent.callbackContext, buttonCode, value, this.index);
        ***REMOVED***

        if (this.onDownCallback)
        ***REMOVED***
            this.onDownCallback.call(this.callbackContext, buttonCode, value);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Handles button release.
    * 
    * @method Phaser.SinglePad#processButtonUp
    * @param ***REMOVED***number***REMOVED*** buttonCode - Which buttonCode of this button
    * @param ***REMOVED***object***REMOVED*** value - Button value
    */
    processButtonUp: function (buttonCode, value) ***REMOVED***

        if (this._padParent.onUpCallback)
        ***REMOVED***
            this._padParent.onUpCallback.call(this._padParent.callbackContext, buttonCode, value, this.index);
        ***REMOVED***

        if (this.onUpCallback)
        ***REMOVED***
            this.onUpCallback.call(this.callbackContext, buttonCode, value);
        ***REMOVED***

        if (this._buttons[buttonCode])
        ***REMOVED***
            this._buttons[buttonCode].stop(null, value);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Handles buttons with floating values (like analog buttons that acts almost like an axis but still registers like a button)
    * 
    * @method Phaser.SinglePad#processButtonFloat
    * @param ***REMOVED***number***REMOVED*** buttonCode - Which buttonCode of this button
    * @param ***REMOVED***object***REMOVED*** value - Button value (will range somewhere between 0 and 1, but not specifically 0 or 1.
    */
    processButtonFloat: function (buttonCode, value) ***REMOVED***

        if (this._padParent.onFloatCallback)
        ***REMOVED***
            this._padParent.onFloatCallback.call(this._padParent.callbackContext, buttonCode, value, this.index);
        ***REMOVED***

        if (this.onFloatCallback)
        ***REMOVED***
            this.onFloatCallback.call(this.callbackContext, buttonCode, value);
        ***REMOVED***

        if (this._buttons[buttonCode])
        ***REMOVED***
            this._buttons[buttonCode].padFloat(value);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns value of requested axis.
    * 
    * @method Phaser.SinglePad#axis
    * @param ***REMOVED***number***REMOVED*** axisCode - The index of the axis to check
    * @return ***REMOVED***number***REMOVED*** Axis value if available otherwise false
    */
    axis: function (axisCode) ***REMOVED***

        if (this._axes[axisCode])
        ***REMOVED***
            return this._axes[axisCode];
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Returns true if the button is pressed down.
    * 
    * @method Phaser.SinglePad#isDown
    * @param ***REMOVED***number***REMOVED*** buttonCode - The buttonCode of the button to check.
    * @return ***REMOVED***boolean***REMOVED*** True if the button is pressed down.
    */
    isDown: function (buttonCode) ***REMOVED***

        if (this._buttons[buttonCode])
        ***REMOVED***
            return this._buttons[buttonCode].isDown;
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Returns true if the button is not currently pressed.
    * 
    * @method Phaser.SinglePad#isUp
    * @param ***REMOVED***number***REMOVED*** buttonCode - The buttonCode of the button to check.
    * @return ***REMOVED***boolean***REMOVED*** True if the button is not currently pressed down.
    */
    isUp: function (buttonCode) ***REMOVED***

        if (this._buttons[buttonCode])
        ***REMOVED***
            return this._buttons[buttonCode].isUp;
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Returns the "just released" state of a button from this gamepad. Just released is considered as being true if the button was released within the duration given (default 250ms).
    * 
    * @method Phaser.SinglePad#justReleased
    * @param ***REMOVED***number***REMOVED*** buttonCode - The buttonCode of the button to check for.
    * @param ***REMOVED***number***REMOVED*** [duration=250] - The duration below which the button is considered as being just released.
    * @return ***REMOVED***boolean***REMOVED*** True if the button is just released otherwise false.
    */
    justReleased: function (buttonCode, duration) ***REMOVED***

        if (this._buttons[buttonCode])
        ***REMOVED***
            return this._buttons[buttonCode].justReleased(duration);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns the "just pressed" state of a button from this gamepad. Just pressed is considered true if the button was pressed down within the duration given (default 250ms).
    * 
    * @method Phaser.SinglePad#justPressed
    * @param ***REMOVED***number***REMOVED*** buttonCode - The buttonCode of the button to check for.
    * @param ***REMOVED***number***REMOVED*** [duration=250] - The duration below which the button is considered as being just pressed.
    * @return ***REMOVED***boolean***REMOVED*** True if the button is just pressed otherwise false.
    */
    justPressed: function (buttonCode, duration) ***REMOVED***

        if (this._buttons[buttonCode])
        ***REMOVED***
            return this._buttons[buttonCode].justPressed(duration);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns the value of a gamepad button. Intended mainly for cases when you have floating button values, for example
    * analog trigger buttons on the XBOX 360 controller.
    * 
    * @method Phaser.SinglePad#buttonValue
    * @param ***REMOVED***number***REMOVED*** buttonCode - The buttonCode of the button to check.
    * @return ***REMOVED***number***REMOVED*** Button value if available otherwise null. Be careful as this can incorrectly evaluate to 0.
    */
    buttonValue: function (buttonCode) ***REMOVED***

        if (this._buttons[buttonCode])
        ***REMOVED***
            return this._buttons[buttonCode].value;
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Reset all buttons/axes of this gamepad.
    * 
    * @method Phaser.SinglePad#reset
    */
    reset: function () ***REMOVED***

        for (var j = 0; j < this._axes.length; j++)
        ***REMOVED***
            this._axes[j] = 0;
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

Phaser.SinglePad.prototype.constructor = Phaser.SinglePad;
