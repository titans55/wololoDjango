/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A Pointer object is used by the Mouse, Touch and MSPoint managers and represents a single finger on the touch screen.
*
* @class Phaser.Pointer
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***number***REMOVED*** id - The ID of the Pointer object within the game. Each game can have up to 10 active pointers.
* @param ***REMOVED***Phaser.PointerMode***REMOVED*** pointerMode=(CURSOR|CONTACT) - The operational mode of this pointer, eg. CURSOR or TOUCH.
*/
Phaser.Pointer = function (game, id, pointerMode) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***number***REMOVED*** id - The ID of the Pointer object within the game. Each game can have up to 10 active pointers.
    */
    this.id = id;

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.POINTER;

    /**
    * @property ***REMOVED***boolean***REMOVED*** exists - A Pointer object that exists is allowed to be checked for physics collisions and overlaps.
    * @default
    */
    this.exists = true;

    /**
    * @property ***REMOVED***number***REMOVED*** identifier - The identifier property of the Pointer as set by the DOM event when this Pointer is started.
    * @default
    */
    this.identifier = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** pointerId - The pointerId property of the Pointer as set by the DOM event when this Pointer is started. The browser can and will recycle this value.
    * @default
    */
    this.pointerId = null;

    /**
    * @property ***REMOVED***Phaser.PointerMode***REMOVED*** pointerMode - The operational mode of this pointer.
    */
    this.pointerMode = pointerMode || (Phaser.PointerMode.CURSOR | Phaser.PointerMode.CONTACT);

    /**
    * @property ***REMOVED***any***REMOVED*** target - The target property of the Pointer as set by the DOM event when this Pointer is started.
    * @default
    */
    this.target = null;

    /**
    * The button property of the most recent DOM event when this Pointer is started.
    * You should not rely on this value for accurate button detection, instead use the Pointer properties
    * `leftButton`, `rightButton`, `middleButton` and so on.
    * @property ***REMOVED***any***REMOVED*** button
    * @default
    */
    this.button = null;

    /**
    * If this Pointer is a Mouse or Pen / Stylus then you can access its left button directly through this property.
    * 
    * The DeviceButton has its own properties such as `isDown`, `duration` and methods like `justReleased` for more fine-grained
    * button control.
    * 
    * @property ***REMOVED***Phaser.DeviceButton***REMOVED*** leftButton
    * @default
    */
    this.leftButton = new Phaser.DeviceButton(this, Phaser.Pointer.LEFT_BUTTON);

    /**
    * If this Pointer is a Mouse or Pen / Stylus then you can access its middle button directly through this property.
    * 
    * The DeviceButton has its own properties such as `isDown`, `duration` and methods like `justReleased` for more fine-grained
    * button control.
    *
    * Please see the DeviceButton docs for details on browser button limitations.
    * 
    * @property ***REMOVED***Phaser.DeviceButton***REMOVED*** middleButton
    * @default
    */
    this.middleButton = new Phaser.DeviceButton(this, Phaser.Pointer.MIDDLE_BUTTON);

    /**
    * If this Pointer is a Mouse or Pen / Stylus then you can access its right button directly through this property.
    * 
    * The DeviceButton has its own properties such as `isDown`, `duration` and methods like `justReleased` for more fine-grained
    * button control.
    *
    * Please see the DeviceButton docs for details on browser button limitations.
    * 
    * @property ***REMOVED***Phaser.DeviceButton***REMOVED*** rightButton
    * @default
    */
    this.rightButton = new Phaser.DeviceButton(this, Phaser.Pointer.RIGHT_BUTTON);

    /**
    * If this Pointer is a Mouse or Pen / Stylus then you can access its X1 (back) button directly through this property.
    * 
    * The DeviceButton has its own properties such as `isDown`, `duration` and methods like `justReleased` for more fine-grained
    * button control.
    *
    * Please see the DeviceButton docs for details on browser button limitations.
    * 
    * @property ***REMOVED***Phaser.DeviceButton***REMOVED*** backButton
    * @default
    */
    this.backButton = new Phaser.DeviceButton(this, Phaser.Pointer.BACK_BUTTON);

    /**
    * If this Pointer is a Mouse or Pen / Stylus then you can access its X2 (forward) button directly through this property.
    * 
    * The DeviceButton has its own properties such as `isDown`, `duration` and methods like `justReleased` for more fine-grained
    * button control.
    *
    * Please see the DeviceButton docs for details on browser button limitations.
    * 
    * @property ***REMOVED***Phaser.DeviceButton***REMOVED*** forwardButton
    * @default
    */
    this.forwardButton = new Phaser.DeviceButton(this, Phaser.Pointer.FORWARD_BUTTON);

    /**
    * If this Pointer is a Pen / Stylus then you can access its eraser button directly through this property.
    * 
    * The DeviceButton has its own properties such as `isDown`, `duration` and methods like `justReleased` for more fine-grained
    * button control.
    *
    * Please see the DeviceButton docs for details on browser button limitations.
    * 
    * @property ***REMOVED***Phaser.DeviceButton***REMOVED*** eraserButton
    * @default
    */
    this.eraserButton = new Phaser.DeviceButton(this, Phaser.Pointer.ERASER_BUTTON);

    /**
    * @property ***REMOVED***boolean***REMOVED*** _holdSent - Local private variable to store the status of dispatching a hold event.
    * @private
    * @default
    */
    this._holdSent = false;

    /**
    * @property ***REMOVED***array***REMOVED*** _history - Local private variable storing the short-term history of pointer movements.
    * @private
    */
    this._history = [];

    /**
    * @property ***REMOVED***number***REMOVED*** _nextDrop - Local private variable storing the time at which the next history drop should occur.
    * @private
    */
    this._nextDrop = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _stateReset - Monitor events outside of a state reset loop.
    * @private
    */
    this._stateReset = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** withinGame - true if the Pointer is over the game canvas, otherwise false.
    */
    this.withinGame = false;

    /**
    * @property ***REMOVED***number***REMOVED*** clientX - The horizontal coordinate of the Pointer within the application's client area at which the event occurred (as opposed to the coordinates within the page).
    */
    this.clientX = -1;

    /**
    * @property ***REMOVED***number***REMOVED*** clientY - The vertical coordinate of the Pointer within the application's client area at which the event occurred (as opposed to the coordinates within the page).
    */
    this.clientY = -1;

    /**
    * @property ***REMOVED***number***REMOVED*** pageX - The horizontal coordinate of the Pointer relative to whole document.
    */
    this.pageX = -1;

    /**
    * @property ***REMOVED***number***REMOVED*** pageY - The vertical coordinate of the Pointer relative to whole document.
    */
    this.pageY = -1;

    /**
    * @property ***REMOVED***number***REMOVED*** screenX - The horizontal coordinate of the Pointer relative to the screen.
    */
    this.screenX = -1;

    /**
    * @property ***REMOVED***number***REMOVED*** screenY - The vertical coordinate of the Pointer relative to the screen.
    */
    this.screenY = -1;

    /**
    * @property ***REMOVED***number***REMOVED*** rawMovementX - The horizontal raw relative movement of the Pointer in pixels since last event.
    * @default
    */
    this.rawMovementX = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** rawMovementY - The vertical raw relative movement of the Pointer in pixels since last event.
    * @default
    */
    this.rawMovementY = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** movementX - The horizontal processed relative movement of the Pointer in pixels since last event.
    * @default
    */
    this.movementX = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** movementY - The vertical processed relative movement of the Pointer in pixels since last event.
    * @default
    */
    this.movementY = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** x - The horizontal coordinate of the Pointer. This value is automatically scaled based on the game scale.
    * @default
    */
    this.x = -1;

    /**
    * @property ***REMOVED***number***REMOVED*** y - The vertical coordinate of the Pointer. This value is automatically scaled based on the game scale.
    * @default
    */
    this.y = -1;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isMouse - If the Pointer is a mouse or pen / stylus this is true, otherwise false.
    */
    this.isMouse = (id === 0);

    /**
    * If the Pointer is touching the touchscreen, or *any* mouse or pen button is held down, isDown is set to true.
    * If you need to check a specific mouse or pen button then use the button properties, i.e. Pointer.rightButton.isDown.
    * @property ***REMOVED***boolean***REMOVED*** isDown
    * @default
    */
    this.isDown = false;

    /**
    * If the Pointer is not touching the touchscreen, or *all* mouse or pen buttons are up, isUp is set to true.
    * If you need to check a specific mouse or pen button then use the button properties, i.e. Pointer.rightButton.isUp.
    * @property ***REMOVED***boolean***REMOVED*** isUp
    * @default
    */
    this.isUp = true;

    /**
    * @property ***REMOVED***number***REMOVED*** timeDown - A timestamp representing when the Pointer first touched the touchscreen.
    * @default
    */
    this.timeDown = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** timeUp - A timestamp representing when the Pointer left the touchscreen.
    * @default
    */
    this.timeUp = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** previousTapTime - A timestamp representing when the Pointer was last tapped or clicked.
    * @default
    */
    this.previousTapTime = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** totalTouches - The total number of times this Pointer has been touched to the touchscreen.
    * @default
    */
    this.totalTouches = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** msSinceLastClick - The number of milliseconds since the last click or touch event.
    * @default
    */
    this.msSinceLastClick = Number.MAX_VALUE;

    /**
    * @property ***REMOVED***any***REMOVED*** targetObject - The Game Object this Pointer is currently over / touching / dragging.
    * @default
    */
    this.targetObject = null;

    /**
    * This array is erased and re-populated every time this Pointer is updated. It contains references to all
    * of the Game Objects that were considered as being valid for processing by this Pointer, this frame. To be
    * valid they must have suitable a `priorityID`, be Input enabled, visible and actually have the Pointer over
    * them. You can check the contents of this array in events such as `onInputDown`, but beware it is reset
    * every frame.
    * @property ***REMOVED***array***REMOVED*** interactiveCandidates
    * @default
    */
    this.interactiveCandidates = [];

    /**
    * @property ***REMOVED***boolean***REMOVED*** active - An active pointer is one that is currently pressed down on the display. A Mouse is always active.
    * @default
    */
    this.active = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** dirty - A dirty pointer needs to re-poll any interactive objects it may have been over, regardless if it has moved or not.
    * @default
    */
    this.dirty = false;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** position - A Phaser.Point object containing the current x/y values of the pointer on the display.
    */
    this.position = new Phaser.Point();

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** positionDown - A Phaser.Point object containing the x/y values of the pointer when it was last in a down state on the display.
    */
    this.positionDown = new Phaser.Point();
    
    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** positionUp - A Phaser.Point object containing the x/y values of the pointer when it was last released.
    */
    this.positionUp = new Phaser.Point();

    /**
    * A Phaser.Circle that is centered on the x/y coordinates of this pointer, useful for hit detection.
    * The Circle size is 44px (Apples recommended "finger tip" size).
    * @property ***REMOVED***Phaser.Circle***REMOVED*** circle
    */
    this.circle = new Phaser.Circle(0, 0, 44);

    /**
    * Click trampolines associated with this pointer. See `addClickTrampoline`.
    * @property ***REMOVED***object[]|null***REMOVED*** _clickTrampolines
    * @private
    */
    this._clickTrampolines = null;

    /**
    * When the Pointer has click trampolines the last target object is stored here
    * so it can be used to check for validity of the trampoline in a post-Up/'stop'.
    * @property ***REMOVED***object***REMOVED*** _trampolineTargetObject
    * @private
    */
    this._trampolineTargetObject = null;

***REMOVED***;

/**
* No buttons at all.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Pointer.NO_BUTTON = 0;

/**
* The Left Mouse button, or in PointerEvent devices a Touch contact or Pen contact.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Pointer.LEFT_BUTTON = 1;

/**
* The Right Mouse button, or in PointerEvent devices a Pen contact with a barrel button.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Pointer.RIGHT_BUTTON = 2;

/**
* The Middle Mouse button.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Pointer.MIDDLE_BUTTON = 4;

/**
* The X1 button. This is typically the mouse Back button, but is often reconfigured.
* On Linux (GTK) this is unsupported. On Windows if advanced pointer software (such as IntelliPoint) is installed this doesn't register.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Pointer.BACK_BUTTON = 8;

/**
* The X2 button. This is typically the mouse Forward button, but is often reconfigured.
* On Linux (GTK) this is unsupported. On Windows if advanced pointer software (such as IntelliPoint) is installed this doesn't register.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Pointer.FORWARD_BUTTON = 16;

/**
* The Eraser pen button on PointerEvent supported devices only.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Pointer.ERASER_BUTTON = 32;

Phaser.Pointer.prototype = ***REMOVED***

    /**
    * Resets the states of all the button booleans.
    * 
    * @method Phaser.Pointer#resetButtons
    * @protected
    */
    resetButtons: function () ***REMOVED***

        this.isDown = false;
        this.isUp = true;

        if (this.isMouse)
        ***REMOVED***
            this.leftButton.reset();
            this.middleButton.reset();
            this.rightButton.reset();
            this.backButton.reset();
            this.forwardButton.reset();
            this.eraserButton.reset();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called by updateButtons.
    * 
    * @method Phaser.Pointer#processButtonsDown
    * @private
    * @param ***REMOVED***integer***REMOVED*** buttons - The DOM event.buttons property.
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The DOM event.
    */
    processButtonsDown: function (buttons, event) ***REMOVED***

        //  Note: These are bitwise checks, not booleans

        if (Phaser.Pointer.LEFT_BUTTON & buttons)
        ***REMOVED***
            this.leftButton.start(event);
        ***REMOVED***

        if (Phaser.Pointer.RIGHT_BUTTON & buttons)
        ***REMOVED***
            this.rightButton.start(event);
        ***REMOVED***
                
        if (Phaser.Pointer.MIDDLE_BUTTON & buttons)
        ***REMOVED***
            this.middleButton.start(event);
        ***REMOVED***

        if (Phaser.Pointer.BACK_BUTTON & buttons)
        ***REMOVED***
            this.backButton.start(event);
        ***REMOVED***

        if (Phaser.Pointer.FORWARD_BUTTON & buttons)
        ***REMOVED***
            this.forwardButton.start(event);
        ***REMOVED***

        if (Phaser.Pointer.ERASER_BUTTON & buttons)
        ***REMOVED***
            this.eraserButton.start(event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called by updateButtons.
    * 
    * @method Phaser.Pointer#processButtonsUp
    * @private
    * @param ***REMOVED***integer***REMOVED*** buttons - The DOM event.buttons property.
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The DOM event.
    */
    processButtonsUp: function (button, event) ***REMOVED***

        //  Note: These are bitwise checks, not booleans

        if (button === Phaser.Mouse.LEFT_BUTTON)
        ***REMOVED***
            this.leftButton.stop(event);
        ***REMOVED***

        if (button === Phaser.Mouse.RIGHT_BUTTON)
        ***REMOVED***
            this.rightButton.stop(event);
        ***REMOVED***
                
        if (button === Phaser.Mouse.MIDDLE_BUTTON)
        ***REMOVED***
            this.middleButton.stop(event);
        ***REMOVED***

        if (button === Phaser.Mouse.BACK_BUTTON)
        ***REMOVED***
            this.backButton.stop(event);
        ***REMOVED***

        if (button === Phaser.Mouse.FORWARD_BUTTON)
        ***REMOVED***
            this.forwardButton.stop(event);
        ***REMOVED***

        if (button === 5)
        ***REMOVED***
            this.eraserButton.stop(event);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called when the event.buttons property changes from zero.
    * Contains a button bitmask.
    * 
    * @method Phaser.Pointer#updateButtons
    * @protected
    * @param ***REMOVED***MouseEvent***REMOVED*** event - The DOM event.
    */
    updateButtons: function (event) ***REMOVED***

        this.button = event.button;

        var down = (event.type.toLowerCase().substr(-4) === 'down');

        if (event.buttons !== undefined)
        ***REMOVED***
            if (down)
            ***REMOVED***
                this.processButtonsDown(event.buttons, event);
            ***REMOVED***
            else
            ***REMOVED***
                this.processButtonsUp(event.button, event);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  No buttons property (like Safari on OSX when using a trackpad)
            if (down)
            ***REMOVED***
                this.leftButton.start(event);
            ***REMOVED***
            else
            ***REMOVED***
                this.leftButton.stop(event);
                this.rightButton.stop(event);
            ***REMOVED***
        ***REMOVED***

        //  On OS X (and other devices with trackpads) you have to press CTRL + the pad
        //  to initiate a right-click event, so we'll check for that here ONLY if
        //  event.buttons = 1 (i.e. they only have a 1 button mouse or trackpad)

        if (event.buttons === 1 && event.ctrlKey && this.leftButton.isDown)
        ***REMOVED***
            this.leftButton.stop(event);
            this.rightButton.start(event);
        ***REMOVED***

        this.isUp = true;
        this.isDown = false;

        if (this.leftButton.isDown || this.rightButton.isDown || this.middleButton.isDown || this.backButton.isDown || this.forwardButton.isDown || this.eraserButton.isDown)
        ***REMOVED***
            this.isUp = false;
            this.isDown = true;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called when the Pointer is pressed onto the touchscreen.
    * @method Phaser.Pointer#start
    * @param ***REMOVED***any***REMOVED*** event - The DOM event from the browser.
    */
    start: function (event) ***REMOVED***

        var input = this.game.input;

        if (event['pointerId'])
        ***REMOVED***
            this.pointerId = event.pointerId;
        ***REMOVED***

        this.identifier = event.identifier;
        this.target = event.target;

        if (this.isMouse)
        ***REMOVED***
            this.updateButtons(event);
        ***REMOVED***
        else
        ***REMOVED***
            this.isDown = true;
            this.isUp = false;
        ***REMOVED***

        this.active = true;
        this.withinGame = true;
        this.dirty = false;

        this._history = [];
        this._clickTrampolines = null;
        this._trampolineTargetObject = null;

        //  Work out how long it has been since the last click
        this.msSinceLastClick = this.game.time.time - this.timeDown;
        this.timeDown = this.game.time.time;
        this._holdSent = false;

        //  This sets the x/y and other local values
        this.move(event, true);

        // x and y are the old values here?
        this.positionDown.setTo(this.x, this.y);

        if (input.multiInputOverride === Phaser.Input.MOUSE_OVERRIDES_TOUCH ||
            input.multiInputOverride === Phaser.Input.MOUSE_TOUCH_COMBINE ||
            (input.multiInputOverride === Phaser.Input.TOUCH_OVERRIDES_MOUSE && input.totalActivePointers === 0))
        ***REMOVED***
            input.x = this.x;
            input.y = this.y;
            input.position.setTo(this.x, this.y);
            input.onDown.dispatch(this, event);
            input.resetSpeed(this.x, this.y);
        ***REMOVED***

        this._stateReset = false;

        this.totalTouches++;

        if (this.targetObject !== null)
        ***REMOVED***
            this.targetObject._touchedHandler(this);
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Called by the Input Manager.
    * @method Phaser.Pointer#update
    */
    update: function () ***REMOVED***

        var input = this.game.input;

        if (this.active)
        ***REMOVED***
            //  Force a check?
            if (this.dirty)
            ***REMOVED***
                if (input.interactiveItems.total > 0)
                ***REMOVED***
                    this.processInteractiveObjects(false);
                ***REMOVED***

                this.dirty = false;
            ***REMOVED***

            if (this._holdSent === false && this.duration >= input.holdRate)
            ***REMOVED***
                if (input.multiInputOverride === Phaser.Input.MOUSE_OVERRIDES_TOUCH ||
                    input.multiInputOverride === Phaser.Input.MOUSE_TOUCH_COMBINE ||
                    (input.multiInputOverride === Phaser.Input.TOUCH_OVERRIDES_MOUSE && input.totalActivePointers === 0))
                ***REMOVED***
                    input.onHold.dispatch(this);
                ***REMOVED***

                this._holdSent = true;
            ***REMOVED***

            //  Update the droppings history
            if (input.recordPointerHistory && this.game.time.time >= this._nextDrop)
            ***REMOVED***
                this._nextDrop = this.game.time.time + input.recordRate;

                this._history.push(***REMOVED***
                    x: this.position.x,
                    y: this.position.y
                ***REMOVED***);

                if (this._history.length > input.recordLimit)
                ***REMOVED***
                    this._history.shift();
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called when the Pointer is moved.
    * 
    * @method Phaser.Pointer#move
    * @param ***REMOVED***MouseEvent|PointerEvent|TouchEvent***REMOVED*** event - The event passed up from the input handler.
    * @param ***REMOVED***boolean***REMOVED*** [fromClick=false] - Was this called from the click event?
    */
    move: function (event, fromClick) ***REMOVED***

        var input = this.game.input;

        if (input.pollLocked)
        ***REMOVED***
            return;
        ***REMOVED***

        if (fromClick === undefined) ***REMOVED*** fromClick = false; ***REMOVED***

        if (event.button !== undefined)
        ***REMOVED***
            this.button = event.button;
        ***REMOVED***

        if (fromClick && this.isMouse)
        ***REMOVED***
            this.updateButtons(event);
        ***REMOVED***

        this.clientX = event.clientX;
        this.clientY = event.clientY;

        this.pageX = event.pageX;
        this.pageY = event.pageY;

        this.screenX = event.screenX;
        this.screenY = event.screenY;

        if (this.isMouse && input.mouse.locked && !fromClick)
        ***REMOVED***
            this.rawMovementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            this.rawMovementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

            this.movementX += this.rawMovementX;
            this.movementY += this.rawMovementY;
        ***REMOVED***

        this.x = (this.pageX - this.game.scale.offset.x) * input.scale.x;
        this.y = (this.pageY - this.game.scale.offset.y) * input.scale.y;

        this.position.setTo(this.x, this.y);
        this.circle.x = this.x;
        this.circle.y = this.y;

        if (input.multiInputOverride === Phaser.Input.MOUSE_OVERRIDES_TOUCH ||
            input.multiInputOverride === Phaser.Input.MOUSE_TOUCH_COMBINE ||
            (input.multiInputOverride === Phaser.Input.TOUCH_OVERRIDES_MOUSE && input.totalActivePointers === 0))
        ***REMOVED***
            input.activePointer = this;
            input.x = this.x;
            input.y = this.y;
            input.position.setTo(input.x, input.y);
            input.circle.x = input.x;
            input.circle.y = input.y;
        ***REMOVED***

        this.withinGame = this.game.scale.bounds.contains(this.pageX, this.pageY);

        //  If the game is paused we don't process any target objects or callbacks
        if (this.game.paused)
        ***REMOVED***
            return this;
        ***REMOVED***

        var i = input.moveCallbacks.length;

        while (i--)
        ***REMOVED***
            input.moveCallbacks[i].callback.call(input.moveCallbacks[i].context, this, this.x, this.y, fromClick);
        ***REMOVED***

        //  Easy out if we're dragging something and it still exists
        if (this.targetObject !== null && this.targetObject.isDragged === true)
        ***REMOVED***
            if (this.targetObject.update(this) === false)
            ***REMOVED***
                this.targetObject = null;
            ***REMOVED***
        ***REMOVED***
        else if (input.interactiveItems.total > 0)
        ***REMOVED***
            this.processInteractiveObjects(fromClick);
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Process all interactive objects to find out which ones were updated in the recent Pointer move.
    * 
    * @method Phaser.Pointer#processInteractiveObjects
    * @protected
    * @param ***REMOVED***boolean***REMOVED*** [fromClick=false] - Was this called from the click event?
    * @return ***REMOVED***boolean***REMOVED*** True if this method processes an object (i.e. a Sprite becomes the Pointers currentTarget), otherwise false.
    */
    processInteractiveObjects: function (fromClick) ***REMOVED***

        //  Work out which object is on the top
        var highestRenderOrderID = 0;
        var highestInputPriorityID = -1;
        var candidateTarget = null;

        //  First pass gets all objects that the pointer is over that DON'T use pixelPerfect checks and get the highest ID
        //  We know they'll be valid for input detection but not which is the top just yet

        var currentNode = this.game.input.interactiveItems.first;

        this.interactiveCandidates = [];

        while (currentNode)
        ***REMOVED***
            //  Reset checked status
            currentNode.checked = false;

            if (currentNode.validForInput(highestInputPriorityID, highestRenderOrderID, false))
            ***REMOVED***
                //  Flag it as checked so we don't re-scan it on the next phase
                currentNode.checked = true;

                if ((fromClick && currentNode.checkPointerDown(this, true)) ||
                    (!fromClick && currentNode.checkPointerOver(this, true)))
                ***REMOVED***
                    highestRenderOrderID = currentNode.sprite.renderOrderID;
                    highestInputPriorityID = currentNode.priorityID;
                    candidateTarget = currentNode;
                    this.interactiveCandidates.push(currentNode);
                ***REMOVED***
            ***REMOVED***

            currentNode = this.game.input.interactiveItems.next;
        ***REMOVED***

        //  Then in the second sweep we process ONLY the pixel perfect ones that are checked and who have a higher ID
        //  because if their ID is lower anyway then we can just automatically discount them
        //  (A node that was previously checked did not request a pixel-perfect check.)

        currentNode = this.game.input.interactiveItems.first;

        while (currentNode)
        ***REMOVED***
            if (!currentNode.checked &&
                currentNode.validForInput(highestInputPriorityID, highestRenderOrderID, true))
            ***REMOVED***
                if ((fromClick && currentNode.checkPointerDown(this, false)) ||
                    (!fromClick && currentNode.checkPointerOver(this, false)))
                ***REMOVED***
                    highestRenderOrderID = currentNode.sprite.renderOrderID;
                    highestInputPriorityID = currentNode.priorityID;
                    candidateTarget = currentNode;
                    this.interactiveCandidates.push(currentNode);
                ***REMOVED***
            ***REMOVED***

            currentNode = this.game.input.interactiveItems.next;
        ***REMOVED***

        if (this.game.input.customCandidateHandler)
        ***REMOVED***
            candidateTarget = this.game.input.customCandidateHandler.call(this.game.input.customCandidateHandlerContext, this, this.interactiveCandidates, candidateTarget);
        ***REMOVED***

        this.swapTarget(candidateTarget, false);

        return (this.targetObject !== null);

    ***REMOVED***,

    /**
    * This will change the `Pointer.targetObject` object to be the one provided.
    * 
    * This allows you to have fine-grained control over which object the Pointer is targeting.
    *
    * Note that even if you set a new Target here, it is still able to be replaced by any other valid
    * target during the next Pointer update.
    *
    * @method Phaser.Pointer#swapTarget
    * @param ***REMOVED***Phaser.InputHandler***REMOVED*** newTarget - The new target for this Pointer. Note this is an `InputHandler`, so don't pass a Sprite, instead pass `sprite.input` to it.
    * @param ***REMOVED***boolean***REMOVED*** [silent=false] - If true the new target AND the old one will NOT dispatch their `onInputOver` or `onInputOut` events.
    */
    swapTarget: function (newTarget, silent) ***REMOVED***

        if (silent === undefined) ***REMOVED*** silent = false; ***REMOVED***

        //  Now we know the top-most item (if any) we can process it
        if (newTarget === null)
        ***REMOVED***
            //  The pointer isn't currently over anything, check if we've got a lingering previous target
            if (this.targetObject)
            ***REMOVED***
                this.targetObject._pointerOutHandler(this, silent);
                this.targetObject = null;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (this.targetObject === null)
            ***REMOVED***
                //  And now set the new one
                this.targetObject = newTarget;
                newTarget._pointerOverHandler(this, silent);
            ***REMOVED***
            else
            ***REMOVED***
                //  We've got a target from the last update
                if (this.targetObject === newTarget)
                ***REMOVED***
                    //  Same target as before, so update it
                    if (newTarget.update(this) === false)
                    ***REMOVED***
                        this.targetObject = null;
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    //  The target has changed, so tell the old one we've left it
                    this.targetObject._pointerOutHandler(this, silent);

                    //  And now set the new one
                    this.targetObject = newTarget;
                    this.targetObject._pointerOverHandler(this, silent);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called when the Pointer leaves the target area.
    *
    * @method Phaser.Pointer#leave
    * @param ***REMOVED***MouseEvent|PointerEvent|TouchEvent***REMOVED*** event - The event passed up from the input handler.
    */
    leave: function (event) ***REMOVED***

        this.withinGame = false;
        this.move(event, false);

    ***REMOVED***,

    /**
    * Called when the Pointer leaves the touchscreen.
    *
    * @method Phaser.Pointer#stop
    * @param ***REMOVED***MouseEvent|PointerEvent|TouchEvent***REMOVED*** event - The event passed up from the input handler.
    */
    stop: function (event) ***REMOVED***

        var input = this.game.input;

        if (this._stateReset && this.withinGame)
        ***REMOVED***
            event.preventDefault();
            return;
        ***REMOVED***

        this.timeUp = this.game.time.time;

        if (input.multiInputOverride === Phaser.Input.MOUSE_OVERRIDES_TOUCH ||
            input.multiInputOverride === Phaser.Input.MOUSE_TOUCH_COMBINE ||
            (input.multiInputOverride === Phaser.Input.TOUCH_OVERRIDES_MOUSE && input.totalActivePointers === 0))
        ***REMOVED***
            input.onUp.dispatch(this, event);

            //  Was it a tap?
            if (this.duration >= 0 && this.duration <= input.tapRate)
            ***REMOVED***
                //  Was it a double-tap?
                if (this.timeUp - this.previousTapTime < input.doubleTapRate)
                ***REMOVED***
                    //  Yes, let's dispatch the signal then with the 2nd parameter set to true
                    input.onTap.dispatch(this, true);
                ***REMOVED***
                else
                ***REMOVED***
                    //  Wasn't a double-tap, so dispatch a single tap signal
                    input.onTap.dispatch(this, false);
                ***REMOVED***

                this.previousTapTime = this.timeUp;
            ***REMOVED***
        ***REMOVED***

        if (this.isMouse)
        ***REMOVED***
            this.updateButtons(event);
        ***REMOVED***
        else
        ***REMOVED***
            this.isDown = false;
            this.isUp = true;
        ***REMOVED***

        //  Mouse is always active
        if (this.id > 0)
        ***REMOVED***
            this.active = false;
        ***REMOVED***

        this.withinGame = this.game.scale.bounds.contains(event.pageX, event.pageY);
        this.pointerId = null;
        this.identifier = null;
        
        this.positionUp.setTo(this.x, this.y);
        
        if (this.isMouse === false)
        ***REMOVED***
            input.currentPointers--;
        ***REMOVED***

        input.interactiveItems.callAll('_releasedHandler', this);

        if (this._clickTrampolines)
        ***REMOVED***
            this._trampolineTargetObject = this.targetObject;
        ***REMOVED***

        this.targetObject = null;

        return this;

    ***REMOVED***,

    /**
    * The Pointer is considered justPressed if the time it was pressed onto the touchscreen or clicked is less than justPressedRate.
    * Note that calling justPressed doesn't reset the pressed status of the Pointer, it will return `true` for as long as the duration is valid.
    * If you wish to check if the Pointer was pressed down just once then see the Sprite.events.onInputDown event.
    * @method Phaser.Pointer#justPressed
    * @param ***REMOVED***number***REMOVED*** [duration] - The time to check against. If none given it will use InputManager.justPressedRate.
    * @return ***REMOVED***boolean***REMOVED*** true if the Pointer was pressed down within the duration given.
    */
    justPressed: function (duration) ***REMOVED***

        duration = duration || this.game.input.justPressedRate;

        return (this.isDown === true && (this.timeDown + duration) > this.game.time.time);

    ***REMOVED***,

    /**
    * The Pointer is considered justReleased if the time it left the touchscreen is less than justReleasedRate.
    * Note that calling justReleased doesn't reset the pressed status of the Pointer, it will return `true` for as long as the duration is valid.
    * If you wish to check if the Pointer was released just once then see the Sprite.events.onInputUp event.
    * @method Phaser.Pointer#justReleased
    * @param ***REMOVED***number***REMOVED*** [duration] - The time to check against. If none given it will use InputManager.justReleasedRate.
    * @return ***REMOVED***boolean***REMOVED*** true if the Pointer was released within the duration given.
    */
    justReleased: function (duration) ***REMOVED***

        duration = duration || this.game.input.justReleasedRate;

        return (this.isUp && (this.timeUp + duration) > this.game.time.time);

    ***REMOVED***,

    /**
    * Add a click trampoline to this pointer.
    *
    * A click trampoline is a callback that is run on the DOM 'click' event; this is primarily
    * needed with certain browsers (ie. IE11) which restrict some actions like requestFullscreen
    * to the DOM 'click' event and rejects it for 'pointer*' and 'mouse*' events.
    *
    * This is used internally by the ScaleManager; click trampoline usage is uncommon.
    * Click trampolines can only be added to pointers that are currently down.
    *
    * @method Phaser.Pointer#addClickTrampoline
    * @protected
    * @param ***REMOVED***string***REMOVED*** name - The name of the trampoline; must be unique among active trampolines in this pointer.
    * @param ***REMOVED***function***REMOVED*** callback - Callback to run/trampoline.
    * @param ***REMOVED***object***REMOVED*** callbackContext - Context of the callback.
    * @param ***REMOVED***object[]|null***REMOVED*** callbackArgs - Additional callback args, if any. Supplied as an array.
    */
    addClickTrampoline: function (name, callback, callbackContext, callbackArgs) ***REMOVED***

        if (!this.isDown)
        ***REMOVED***
            return;
        ***REMOVED***

        var trampolines = (this._clickTrampolines = this._clickTrampolines || []);

        for (var i = 0; i < trampolines.length; i++)
        ***REMOVED***
            if (trampolines[i].name === name)
            ***REMOVED***
                trampolines.splice(i, 1);
                break;
            ***REMOVED***
        ***REMOVED***

        trampolines.push(***REMOVED***
            name: name,
            targetObject: this.targetObject,
            callback: callback,
            callbackContext: callbackContext,
            callbackArgs: callbackArgs
        ***REMOVED***);

    ***REMOVED***,

    /**
    * Fire all click trampolines for which the pointers are still referring to the registered object.
    * @method Phaser.Pointer#processClickTrampolines
    * @private
    */
    processClickTrampolines: function () ***REMOVED***

        var trampolines = this._clickTrampolines;

        if (!trampolines)
        ***REMOVED***
            return;
        ***REMOVED***

        for (var i = 0; i < trampolines.length; i++)
        ***REMOVED***
            var trampoline = trampolines[i];

            if (trampoline.targetObject === this._trampolineTargetObject)
            ***REMOVED***
                trampoline.callback.apply(trampoline.callbackContext, trampoline.callbackArgs);
            ***REMOVED***
        ***REMOVED***

        this._clickTrampolines = null;
        this._trampolineTargetObject = null;

    ***REMOVED***,

    /**
    * Resets the Pointer properties. Called by InputManager.reset when you perform a State change.
    * @method Phaser.Pointer#reset
    */
    reset: function () ***REMOVED***

        if (this.isMouse === false)
        ***REMOVED***
            this.active = false;
        ***REMOVED***

        this.pointerId = null;
        this.identifier = null;
        this.dirty = false;
        this.totalTouches = 0;
        this._holdSent = false;
        this._history.length = 0;
        this._stateReset = true;

        this.resetButtons();

        if (this.targetObject)
        ***REMOVED***
            this.targetObject._releasedHandler(this);
        ***REMOVED***

        this.targetObject = null;

    ***REMOVED***,

    /**
     * Resets the movementX and movementY properties. Use in your update handler after retrieving the values.
     * @method Phaser.Pointer#resetMovement
     */
    resetMovement: function() ***REMOVED***

        this.movementX = 0;
        this.movementY = 0;

    ***REMOVED***

***REMOVED***;

Phaser.Pointer.prototype.constructor = Phaser.Pointer;

/**
* How long the Pointer has been depressed on the touchscreen or *any* of the mouse buttons have been held down.
* If not currently down it returns -1.
* If you need to test a specific mouse or pen button then access the buttons directly, i.e. `Pointer.rightButton.duration`.
* 
* @name Phaser.Pointer#duration
* @property ***REMOVED***number***REMOVED*** duration
* @readonly
*/
Object.defineProperty(Phaser.Pointer.prototype, "duration", ***REMOVED***

    get: function () ***REMOVED***

        if (this.isUp)
        ***REMOVED***
            return -1;
        ***REMOVED***

        return this.game.time.time - this.timeDown;

    ***REMOVED***

***REMOVED***);

/**
* Gets the X value of this Pointer in world coordinates based on the world camera.
* @name Phaser.Pointer#worldX
* @property ***REMOVED***number***REMOVED*** worldX - The X value of this Pointer in world coordinates based on the world camera.
* @readonly
*/
Object.defineProperty(Phaser.Pointer.prototype, "worldX", ***REMOVED***

    get: function () ***REMOVED***

        return this.game.world.camera.x + this.x;

    ***REMOVED***

***REMOVED***);

/**
* Gets the Y value of this Pointer in world coordinates based on the world camera.
* @name Phaser.Pointer#worldY
* @property ***REMOVED***number***REMOVED*** worldY - The Y value of this Pointer in world coordinates based on the world camera.
* @readonly
*/
Object.defineProperty(Phaser.Pointer.prototype, "worldY", ***REMOVED***

    get: function () ***REMOVED***

        return this.game.world.camera.y + this.y;

    ***REMOVED***

***REMOVED***);

/**
* Enumeration categorizing operational modes of pointers.
*
* PointerType values represent valid bitmasks.
* For example, a value representing both Mouse and Touch devices
* can be expressed as `PointerMode.CURSOR | PointerMode.CONTACT`.
*
* Values may be added for future mode categorizations.
* @class Phaser.PointerMode
*/
Phaser.PointerMode = ***REMOVED***

    /**
    * A 'CURSOR' is a pointer with a *passive cursor* such as a mouse, touchpad, watcom stylus, or even TV-control arrow-pad.
    *
    * It has the property that a cursor is passively moved without activating the input.
    * This currently corresponds with ***REMOVED***@link Phaser.Pointer#isMouse***REMOVED*** property.
    * @constant
    */
    CURSOR: 1 << 0,

    /**
    * A 'CONTACT' pointer has an *active cursor* that only tracks movement when actived; notably this is a touch-style input.
    * @constant
    */
    CONTACT: 1 << 1

***REMOVED***;
