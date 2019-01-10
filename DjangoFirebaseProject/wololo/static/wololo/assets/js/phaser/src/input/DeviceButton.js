/**
* @author       Richard Davey <rich@photonstorm.com>
* @author       @karlmacklin <tacklemcclean@gmail.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* DeviceButtons belong to both `Phaser.Pointer` and `Phaser.SinglePad` (Gamepad) instances.
*
* For Pointers they represent the various buttons that can exist on mice and pens, such as the left button, right button,
* middle button and advanced buttons like back and forward.
*
* Access them via `Pointer.leftbutton`, `Pointer.rightButton` and so on.
*
* On Gamepads they represent all buttons on the pad: from shoulder buttons to action buttons.
*
* At the time of writing this there are device limitations you should be aware of:
*
* - On Windows, if you install a mouse driver, and its utility software allows you to customize button actions 
*   (e.g., IntelliPoint and SetPoint), the middle (wheel) button, the 4th button, and the 5th button might not be set, 
*   even when they are pressed.
* - On Linux (GTK), the 4th button and the 5th button are not supported.
* - On Mac OS X 10.5 there is no platform API for implementing any advanced buttons.
* 
* @class Phaser.DeviceButton
* @constructor
* @param ***REMOVED***Phaser.Pointer|Phaser.SinglePad***REMOVED*** parent - A reference to the parent of this button. Either a Pointer or a Gamepad.
* @param ***REMOVED***number***REMOVED*** buttonCode - The button code this DeviceButton is responsible for.
*/
Phaser.DeviceButton = function (parent, buttonCode) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Pointer|Phaser.SinglePad***REMOVED*** parent - A reference to the Pointer or Gamepad that owns this button.
    */
    this.parent = parent;

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = parent.game;

    /**
    * @property ***REMOVED***object***REMOVED*** event - The DOM event that caused the change in button state.
    * @default
    */
    this.event = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isDown - The "down" state of the button.
    * @default
    */
    this.isDown = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isUp - The "up" state of the button.
    * @default
    */
    this.isUp = true;

    /**
    * @property ***REMOVED***number***REMOVED*** timeDown - The timestamp when the button was last pressed down.
    * @default
    */
    this.timeDown = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** timeUp - The timestamp when the button was last released.
    * @default
    */
    this.timeUp = 0;

    /**
    * Gamepad only.
    * If a button is held down this holds down the number of times the button has 'repeated'.
    * @property ***REMOVED***number***REMOVED*** repeats
    * @default
    */
    this.repeats = 0;

    /**
    * True if the alt key was held down when this button was last pressed or released.
    * Not supported on Gamepads.
    * @property ***REMOVED***boolean***REMOVED*** altKey
    * @default
    */
    this.altKey = false;

    /**
    * True if the shift key was held down when this button was last pressed or released.
    * Not supported on Gamepads.
    * @property ***REMOVED***boolean***REMOVED*** shiftKey
    * @default
    */
    this.shiftKey = false;

    /**
    * True if the control key was held down when this button was last pressed or released.
    * Not supported on Gamepads.
    * @property ***REMOVED***boolean***REMOVED*** ctrlKey
    * @default
    */
    this.ctrlKey = false;

    /**
    * @property ***REMOVED***number***REMOVED*** value - Button value. Mainly useful for checking analog buttons (like shoulder triggers) on Gamepads.
    * @default
    */
    this.value = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** buttonCode - The buttoncode of this button if a Gamepad, or the DOM button event value if a Pointer.
    */
    this.buttonCode = buttonCode;

    /**
    * This Signal is dispatched every time this DeviceButton is pressed down.
    * It is only dispatched once (until the button is released again).
    * When dispatched it sends 2 arguments: A reference to this DeviceButton and the value of the button.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onDown
    */
    this.onDown = new Phaser.Signal();

    /**
    * This Signal is dispatched every time this DeviceButton is released from a down state.
    * It is only dispatched once (until the button is pressed again).
    * When dispatched it sends 2 arguments: A reference to this DeviceButton and the value of the button.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onUp
    */
    this.onUp = new Phaser.Signal();

    /**
    * Gamepad only.
    * This Signal is dispatched every time this DeviceButton changes floating value (between, but not exactly, 0 and 1).
    * When dispatched it sends 2 arguments: A reference to this DeviceButton and the value of the button.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onFloat
    */
    this.onFloat = new Phaser.Signal();

***REMOVED***;

Phaser.DeviceButton.prototype = ***REMOVED***

    /**
    * Called automatically by Phaser.Pointer and Phaser.SinglePad.
    * Handles the button down state.
    * 
    * @method Phaser.DeviceButton#start
    * @protected
    * @param ***REMOVED***object***REMOVED*** [event] - The DOM event that triggered the button change.
    * @param ***REMOVED***number***REMOVED*** [value] - The button value. Only get for Gamepads.
    */
    start: function (event, value) ***REMOVED***

        if (this.isDown)
        ***REMOVED***
            return;
        ***REMOVED***

        this.isDown = true;
        this.isUp = false;
        this.timeDown = this.game.time.time;
        this.repeats = 0;

        this.event = event;
        this.value = value;

        if (event)
        ***REMOVED***
            this.altKey = event.altKey;
            this.shiftKey = event.shiftKey;
            this.ctrlKey = event.ctrlKey;
        ***REMOVED***

        this.onDown.dispatch(this, value);

    ***REMOVED***,

    /**
    * Called automatically by Phaser.Pointer and Phaser.SinglePad.
    * Handles the button up state.
    * 
    * @method Phaser.DeviceButton#stop
    * @protected
    * @param ***REMOVED***object***REMOVED*** [event] - The DOM event that triggered the button change.
    * @param ***REMOVED***number***REMOVED*** [value] - The button value. Only get for Gamepads.
    */
    stop: function (event, value) ***REMOVED***

        if (this.isUp)
        ***REMOVED***
            return;
        ***REMOVED***

        this.isDown = false;
        this.isUp = true;
        this.timeUp = this.game.time.time;

        this.event = event;
        this.value = value;

        if (event)
        ***REMOVED***
            this.altKey = event.altKey;
            this.shiftKey = event.shiftKey;
            this.ctrlKey = event.ctrlKey;
        ***REMOVED***

        this.onUp.dispatch(this, value);

    ***REMOVED***,

    /**
    * Called automatically by Phaser.SinglePad.
    * 
    * @method Phaser.DeviceButton#padFloat
    * @protected
    * @param ***REMOVED***number***REMOVED*** value - Button value
    */
    padFloat: function (value) ***REMOVED***

        this.value = value;

        this.onFloat.dispatch(this, value);

    ***REMOVED***,

    /**
    * Returns the "just pressed" state of this button.
    * Just pressed is considered true if the button was pressed down within the duration given (default 250ms).
    * 
    * @method Phaser.DeviceButton#justPressed
    * @param ***REMOVED***number***REMOVED*** [duration=250] - The duration in ms below which the button is considered as being just pressed.
    * @return ***REMOVED***boolean***REMOVED*** True if the button is just pressed otherwise false.
    */
    justPressed: function (duration) ***REMOVED***

        duration = duration || 250;

        return (this.isDown && (this.timeDown + duration) > this.game.time.time);

    ***REMOVED***,

    /**
    * Returns the "just released" state of this button.
    * Just released is considered as being true if the button was released within the duration given (default 250ms).
    * 
    * @method Phaser.DeviceButton#justReleased
    * @param ***REMOVED***number***REMOVED*** [duration=250] - The duration in ms below which the button is considered as being just released.
    * @return ***REMOVED***boolean***REMOVED*** True if the button is just released otherwise false.
    */
    justReleased: function (duration) ***REMOVED***

        duration = duration || 250;

        return (this.isUp && (this.timeUp + duration) > this.game.time.time);

    ***REMOVED***,

    /**
    * Resets this DeviceButton, changing it to an isUp state and resetting the duration and repeats counters.
    * 
    * @method Phaser.DeviceButton#reset
    */
    reset: function () ***REMOVED***

        this.isDown = false;
        this.isUp = true;

        this.timeDown = this.game.time.time;
        this.repeats = 0;

        this.altKey = false;
        this.shiftKey = false;
        this.ctrlKey = false;

    ***REMOVED***,

    /**
    * Destroys this DeviceButton, this disposes of the onDown, onUp and onFloat signals 
    * and clears the parent and game references.
    * 
    * @method Phaser.DeviceButton#destroy
    */
    destroy: function () ***REMOVED***

        this.onDown.dispose();
        this.onUp.dispose();
        this.onFloat.dispose();

        this.parent = null;
        this.game = null;

    ***REMOVED***

***REMOVED***;

Phaser.DeviceButton.prototype.constructor = Phaser.DeviceButton;

/**
* How long the button has been held down for in milliseconds.
* If not currently down it returns -1.
* 
* @name Phaser.DeviceButton#duration
* @property ***REMOVED***number***REMOVED*** duration
* @readonly
*/
Object.defineProperty(Phaser.DeviceButton.prototype, "duration", ***REMOVED***

    get: function () ***REMOVED***

        if (this.isUp)
        ***REMOVED***
            return -1;
        ***REMOVED***

        return this.game.time.time - this.timeDown;

    ***REMOVED***

***REMOVED***);
