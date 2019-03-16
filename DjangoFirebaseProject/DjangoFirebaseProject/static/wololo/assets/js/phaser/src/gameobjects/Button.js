/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Create a new `Button` object. A Button is a special type of Sprite that is set-up to handle Pointer events automatically.
*
* The four states a Button responds to are:
*
* * 'Over' - when the Pointer moves over the Button. This is also commonly known as 'hover'.
* * 'Out' - when the Pointer that was previously over the Button moves out of it.
* * 'Down' - when the Pointer is pressed down on the Button. I.e. touched on a touch enabled device or clicked with the mouse.
* * 'Up' - when the Pointer that was pressed down on the Button is released again.
*
* A different texture/frame and activation sound can be specified for any of the states.
*
* Frames can be specified as either an integer (the frame ID) or a string (the frame name); the same values that can be used with a Sprite constructor.
*
* @class Phaser.Button
* @constructor
* @extends Phaser.Image
* @param ***REMOVED***Phaser.Game***REMOVED*** game Current game instance.
* @param ***REMOVED***number***REMOVED*** [x=0] - X position of the Button.
* @param ***REMOVED***number***REMOVED*** [y=0] - Y position of the Button.
* @param ***REMOVED***string***REMOVED*** [key] - The image key (in the Game.Cache) to use as the texture for this Button.
* @param ***REMOVED***function***REMOVED*** [callback] - The function to call when this Button is pressed.
* @param ***REMOVED***object***REMOVED*** [callbackContext] - The context in which the callback will be called (usually 'this').
* @param ***REMOVED***string|integer***REMOVED*** [overFrame] - The frame / frameName when the button is in the Over state.
* @param ***REMOVED***string|integer***REMOVED*** [outFrame] - The frame / frameName when the button is in the Out state.
* @param ***REMOVED***string|integer***REMOVED*** [downFrame] - The frame / frameName when the button is in the Down state.
* @param ***REMOVED***string|integer***REMOVED*** [upFrame] - The frame / frameName when the button is in the Up state.
*/
Phaser.Button = function (game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) ***REMOVED***

    x = x || 0;
    y = y || 0;
    key = key || null;
    callback = callback || null;
    callbackContext = callbackContext || this;

    Phaser.Image.call(this, game, x, y, key, outFrame);

    /**
    * The Phaser Object Type.
    * @property ***REMOVED***number***REMOVED*** type
    * @readonly
    */
    this.type = Phaser.BUTTON;

    /**
    * @property ***REMOVED***number***REMOVED*** physicsType - The const physics body type of this object.
    * @readonly
    */
    this.physicsType = Phaser.SPRITE;

    /**
    * The name or ID of the Over state frame.
    * @property ***REMOVED***string|integer***REMOVED*** onOverFrame
    * @private
    */
    this._onOverFrame = null;

    /**
    * The name or ID of the Out state frame.
    * @property ***REMOVED***string|integer***REMOVED*** onOutFrame
    * @private
    */
    this._onOutFrame = null;

    /**
    * The name or ID of the Down state frame.
    * @property ***REMOVED***string|integer***REMOVED*** onDownFrame
    * @private
    */
    this._onDownFrame = null;

    /**
    * The name or ID of the Up state frame.
    * @property ***REMOVED***string|integer***REMOVED*** onUpFrame
    * @private
    */
    this._onUpFrame = null;

    /**
    * The Sound to be played when this Buttons Over state is activated.
    * @property ***REMOVED***Phaser.Sound|Phaser.AudioSprite|null***REMOVED*** onOverSound
    * @readonly
    */
    this.onOverSound = null;

    /**
    * The Sound to be played when this Buttons Out state is activated.
    * @property ***REMOVED***Phaser.Sound|Phaser.AudioSprite|null***REMOVED*** onOutSound
    * @readonly
    */
    this.onOutSound = null;

    /**
    * The Sound to be played when this Buttons Down state is activated.
    * @property ***REMOVED***Phaser.Sound|Phaser.AudioSprite|null***REMOVED*** onDownSound
    * @readonly
    */
    this.onDownSound = null;

    /**
    * The Sound to be played when this Buttons Up state is activated.
    * @property ***REMOVED***Phaser.Sound|Phaser.AudioSprite|null***REMOVED*** onUpSound
    * @readonly
    */
    this.onUpSound = null;

    /**
    * The Sound Marker used in conjunction with the onOverSound.
    * @property ***REMOVED***string***REMOVED*** onOverSoundMarker
    * @readonly
    */
    this.onOverSoundMarker = '';

    /**
    * The Sound Marker used in conjunction with the onOutSound.
    * @property ***REMOVED***string***REMOVED*** onOutSoundMarker
    * @readonly
    */
    this.onOutSoundMarker = '';

    /**
    * The Sound Marker used in conjunction with the onDownSound.
    * @property ***REMOVED***string***REMOVED*** onDownSoundMarker
    * @readonly
    */
    this.onDownSoundMarker = '';

    /**
    * The Sound Marker used in conjunction with the onUpSound.
    * @property ***REMOVED***string***REMOVED*** onUpSoundMarker
    * @readonly
    */
    this.onUpSoundMarker = '';

    /**
    * The Signal (or event) dispatched when this Button is in an Over state.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onInputOver
    */
    this.onInputOver = new Phaser.Signal();

    /**
    * The Signal (or event) dispatched when this Button is in an Out state.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onInputOut
    */
    this.onInputOut = new Phaser.Signal();

    /**
    * The Signal (or event) dispatched when this Button is in an Down state.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onInputDown
    */
    this.onInputDown = new Phaser.Signal();

    /**
    * The Signal (or event) dispatched when this Button is in an Up state.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onInputUp
    */
    this.onInputUp = new Phaser.Signal();

    /**
    * If true then onOver events (such as onOverSound) will only be triggered if the Pointer object causing them was the Mouse Pointer.
    * The frame will still be changed as applicable.
    *
    * @property ***REMOVED***boolean***REMOVED*** onOverMouseOnly
    * @default
    */
    this.onOverMouseOnly = true;

    /**
    * Suppress the over event if a pointer was just released and it matches the given ***REMOVED***@link Phaser.PointerModer pointer mode bitmask***REMOVED***.
    *
    * This behavior was introduced in Phaser 2.3.1; this property is a soft-revert of the change.
    *
    * @property ***REMOVED***Phaser.PointerMode?***REMOVED*** justReleasedPreventsOver=ACTIVE_CURSOR
    */
    this.justReleasedPreventsOver = Phaser.PointerMode.TOUCH;
    
    /**
    * When true the the texture frame will not be automatically switched on up/down/over/out events.
    * @property ***REMOVED***boolean***REMOVED*** freezeFrames
    * @default
    */
    this.freezeFrames = false;

    /**
    * When the Button is touched / clicked and then released you can force it to enter a state of "out" instead of "up".
    *
    * This can also accept a ***REMOVED***@link Phaser.PointerModer pointer mode bitmask***REMOVED*** for more refined control.
    *
    * @property ***REMOVED***boolean|Phaser.PointerMode***REMOVED*** forceOut=false
    * @default
    */
    this.forceOut = false;

    this.inputEnabled = true;

    this.input.start(0, true);

    this.input.useHandCursor = true;

    this.setFrames(overFrame, outFrame, downFrame, upFrame);

    if (callback !== null)
    ***REMOVED***
        this.onInputUp.add(callback, callbackContext);
    ***REMOVED***

    //  Redirect the input events to here so we can handle animation updates, etc
    this.events.onInputOver.add(this.onInputOverHandler, this);
    this.events.onInputOut.add(this.onInputOutHandler, this);
    this.events.onInputDown.add(this.onInputDownHandler, this);
    this.events.onInputUp.add(this.onInputUpHandler, this);

    this.events.onRemovedFromWorld.add(this.removedFromWorld, this);

***REMOVED***;

Phaser.Button.prototype = Object.create(Phaser.Image.prototype);
Phaser.Button.prototype.constructor = Phaser.Button;

//  State constants; local only. These are tied to property names in Phaser.Button.
var STATE_OVER = 'Over';
var STATE_OUT = 'Out';
var STATE_DOWN = 'Down';
var STATE_UP = 'Up';

/**
* Clears all of the frames set on this Button.
*
* @method Phaser.Button#clearFrames
*/
Phaser.Button.prototype.clearFrames = function () ***REMOVED***

    this.setFrames(null, null, null, null);

***REMOVED***;

/**
* Called when this Button is removed from the World.
*
* @method Phaser.Button#removedFromWorld
* @protected
*/
Phaser.Button.prototype.removedFromWorld = function () ***REMOVED***

    this.inputEnabled = false;

***REMOVED***;

/**
* Set the frame name/ID for the given state.
*
* @method Phaser.Button#setStateFrame
* @private
* @param ***REMOVED***object***REMOVED*** state - See `STATE_*`
* @param ***REMOVED***number|string***REMOVED*** frame - The number or string representing the frame.
* @param ***REMOVED***boolean***REMOVED*** switchImmediately - Immediately switch to the frame if it was set - and this is true.
*/
Phaser.Button.prototype.setStateFrame = function (state, frame, switchImmediately)
***REMOVED***
    var frameKey = '_on' + state + 'Frame';

    if (frame !== null) // not null or undefined
    ***REMOVED***
        this[frameKey] = frame;

        if (switchImmediately)
        ***REMOVED***
            this.changeStateFrame(state);
        ***REMOVED***
    ***REMOVED***
    else
    ***REMOVED***
        this[frameKey] = null;
    ***REMOVED***

***REMOVED***;

/**
* Change the frame to that of the given state, _if_ the state has a frame assigned _and_ if the frames are not currently "frozen".
*
* @method Phaser.Button#changeStateFrame
* @private
* @param ***REMOVED***object***REMOVED*** state - See `STATE_*`
* @return ***REMOVED***boolean***REMOVED*** True only if the frame was assigned a value, possibly the same one it already had.
*/
Phaser.Button.prototype.changeStateFrame = function (state) ***REMOVED***

    if (this.freezeFrames)
    ***REMOVED***
        return false;
    ***REMOVED***

    var frameKey = '_on' + state + 'Frame';
    var frame = this[frameKey];

    if (typeof frame === 'string')
    ***REMOVED***
        this.frameName = frame;
        return true;
    ***REMOVED***
    else if (typeof frame === 'number')
    ***REMOVED***
        this.frame = frame;
        return true;
    ***REMOVED***
    else
    ***REMOVED***
        return false;
    ***REMOVED***

***REMOVED***;

/**
* Used to manually set the frames that will be used for the different states of the Button.
*
* Frames can be specified as either an integer (the frame ID) or a string (the frame name); these are the same values that can be used with a Sprite constructor.
*
* @method Phaser.Button#setFrames
* @public
* @param ***REMOVED***string|integer***REMOVED*** [overFrame] - The frame / frameName when the button is in the Over state.
* @param ***REMOVED***string|integer***REMOVED*** [outFrame] - The frame / frameName when the button is in the Out state.
* @param ***REMOVED***string|integer***REMOVED*** [downFrame] - The frame / frameName when the button is in the Down state.
* @param ***REMOVED***string|integer***REMOVED*** [upFrame] - The frame / frameName when the button is in the Up state.
*/
Phaser.Button.prototype.setFrames = function (overFrame, outFrame, downFrame, upFrame) ***REMOVED***

    this.setStateFrame(STATE_OVER, overFrame, this.input.pointerOver());
    this.setStateFrame(STATE_OUT, outFrame, !this.input.pointerOver());
    this.setStateFrame(STATE_DOWN, downFrame, this.input.pointerDown());
    this.setStateFrame(STATE_UP, upFrame, this.input.pointerUp());

***REMOVED***;

/**
* Set the sound/marker for the given state.
*
* @method Phaser.Button#setStateSound
* @private
* @param ***REMOVED***object***REMOVED*** state - See `STATE_*`
* @param ***REMOVED***Phaser.Sound|Phaser.AudioSprite***REMOVED*** [sound] - Sound.
* @param ***REMOVED***string***REMOVED*** [marker=''] - Sound marker.
*/
Phaser.Button.prototype.setStateSound = function (state, sound, marker) ***REMOVED***

    var soundKey = 'on' + state + 'Sound';
    var markerKey = 'on' + state + 'SoundMarker';

    if (sound instanceof Phaser.Sound || sound instanceof Phaser.AudioSprite)
    ***REMOVED***
        this[soundKey] = sound;
        this[markerKey] = typeof marker === 'string' ? marker : '';
    ***REMOVED***
    else
    ***REMOVED***
        this[soundKey] = null;
        this[markerKey] = '';
    ***REMOVED***

***REMOVED***;

/**
* Play the sound for the given state, _if_ the state has a sound assigned.
*
* @method Phaser.Button#playStateSound
* @private
* @param ***REMOVED***object***REMOVED*** state - See `STATE_*`
* @return ***REMOVED***boolean***REMOVED*** True only if a sound was played.
*/
Phaser.Button.prototype.playStateSound = function (state) ***REMOVED***

    var soundKey = 'on' + state + 'Sound';
    var sound = this[soundKey];

    if (sound)
    ***REMOVED***
        var markerKey = 'on' + state + 'SoundMarker';
        var marker = this[markerKey];

        sound.play(marker);
        return true;
    ***REMOVED***
    else
    ***REMOVED***
        return false;
    ***REMOVED***

***REMOVED***;

/**
* Sets the sounds to be played whenever this Button is interacted with. Sounds can be either full Sound objects, or markers pointing to a section of a Sound object.
* The most common forms of sounds are 'hover' effects and 'click' effects, which is why the order of the parameters is overSound then downSound.
*
* Call this function with no parameters to reset all sounds on this Button.
*
* @method Phaser.Button#setSounds
* @public
* @param ***REMOVED***Phaser.Sound|Phaser.AudioSprite***REMOVED*** [overSound] - Over Button Sound.
* @param ***REMOVED***string***REMOVED*** [overMarker] - Over Button Sound Marker.
* @param ***REMOVED***Phaser.Sound|Phaser.AudioSprite***REMOVED*** [downSound] - Down Button Sound.
* @param ***REMOVED***string***REMOVED*** [downMarker] - Down Button Sound Marker.
* @param ***REMOVED***Phaser.Sound|Phaser.AudioSprite***REMOVED*** [outSound] - Out Button Sound.
* @param ***REMOVED***string***REMOVED*** [outMarker] - Out Button Sound Marker.
* @param ***REMOVED***Phaser.Sound|Phaser.AudioSprite***REMOVED*** [upSound] - Up Button Sound.
* @param ***REMOVED***string***REMOVED*** [upMarker] - Up Button Sound Marker.
*/
Phaser.Button.prototype.setSounds = function (overSound, overMarker, downSound, downMarker, outSound, outMarker, upSound, upMarker) ***REMOVED***

    this.setStateSound(STATE_OVER, overSound, overMarker);
    this.setStateSound(STATE_OUT, outSound, outMarker);
    this.setStateSound(STATE_DOWN, downSound, downMarker);
    this.setStateSound(STATE_UP, upSound, upMarker);

***REMOVED***;

/**
* The Sound to be played when a Pointer moves over this Button.
*
* @method Phaser.Button#setOverSound
* @public
* @param ***REMOVED***Phaser.Sound|Phaser.AudioSprite***REMOVED*** sound - The Sound that will be played.
* @param ***REMOVED***string***REMOVED*** [marker] - A Sound Marker that will be used in the playback.
*/
Phaser.Button.prototype.setOverSound = function (sound, marker) ***REMOVED***

    this.setStateSound(STATE_OVER, sound, marker);

***REMOVED***;

/**
* The Sound to be played when a Pointer moves out of this Button.
*
* @method Phaser.Button#setOutSound
* @public
* @param ***REMOVED***Phaser.Sound|Phaser.AudioSprite***REMOVED*** sound - The Sound that will be played.
* @param ***REMOVED***string***REMOVED*** [marker] - A Sound Marker that will be used in the playback.
*/
Phaser.Button.prototype.setOutSound = function (sound, marker) ***REMOVED***

    this.setStateSound(STATE_OUT, sound, marker);

***REMOVED***;

/**
* The Sound to be played when a Pointer presses down on this Button.
*
* @method Phaser.Button#setDownSound
* @public
* @param ***REMOVED***Phaser.Sound|Phaser.AudioSprite***REMOVED*** sound - The Sound that will be played.
* @param ***REMOVED***string***REMOVED*** [marker] - A Sound Marker that will be used in the playback.
*/
Phaser.Button.prototype.setDownSound = function (sound, marker) ***REMOVED***

    this.setStateSound(STATE_DOWN, sound, marker);

***REMOVED***;

/**
* The Sound to be played when a Pointer has pressed down and is released from this Button.
*
* @method Phaser.Button#setUpSound
* @public
* @param ***REMOVED***Phaser.Sound|Phaser.AudioSprite***REMOVED*** sound - The Sound that will be played.
* @param ***REMOVED***string***REMOVED*** [marker] - A Sound Marker that will be used in the playback.
*/
Phaser.Button.prototype.setUpSound = function (sound, marker) ***REMOVED***

    this.setStateSound(STATE_UP, sound, marker);

***REMOVED***;

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputOverHandler
* @protected
* @param ***REMOVED***Phaser.Button***REMOVED*** sprite - The Button that the event occurred on.
* @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer - The Pointer that activated the Button.
*/
Phaser.Button.prototype.onInputOverHandler = function (sprite, pointer) ***REMOVED***

    if (pointer.justReleased() &&
        (this.justReleasedPreventsOver & pointer.pointerMode) === pointer.pointerMode)
    ***REMOVED***
        //  If the Pointer was only just released then we don't fire an over event
        return;
    ***REMOVED***

    this.changeStateFrame(STATE_OVER);

    if (this.onOverMouseOnly && !pointer.isMouse)
    ***REMOVED***
        return;
    ***REMOVED***

    this.playStateSound(STATE_OVER);

    if (this.onInputOver)
    ***REMOVED***
        this.onInputOver.dispatch(this, pointer);
    ***REMOVED***

***REMOVED***;

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputOutHandler
* @protected
* @param ***REMOVED***Phaser.Button***REMOVED*** sprite - The Button that the event occurred on.
* @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer - The Pointer that activated the Button.
*/
Phaser.Button.prototype.onInputOutHandler = function (sprite, pointer) ***REMOVED***

    this.changeStateFrame(STATE_OUT);

    this.playStateSound(STATE_OUT);

    if (this.onInputOut)
    ***REMOVED***
        this.onInputOut.dispatch(this, pointer);
    ***REMOVED***
***REMOVED***;

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputDownHandler
* @protected
* @param ***REMOVED***Phaser.Button***REMOVED*** sprite - The Button that the event occurred on.
* @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer - The Pointer that activated the Button.
*/
Phaser.Button.prototype.onInputDownHandler = function (sprite, pointer) ***REMOVED***

    this.changeStateFrame(STATE_DOWN);

    this.playStateSound(STATE_DOWN);

    if (this.onInputDown)
    ***REMOVED***
        this.onInputDown.dispatch(this, pointer);
    ***REMOVED***
***REMOVED***;

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputUpHandler
* @protected
* @param ***REMOVED***Phaser.Button***REMOVED*** sprite - The Button that the event occurred on.
* @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer - The Pointer that activated the Button.
*/
Phaser.Button.prototype.onInputUpHandler = function (sprite, pointer, isOver) ***REMOVED***

    this.playStateSound(STATE_UP);

    //  Input dispatched early, before state change (but after sound)
    if (this.onInputUp)
    ***REMOVED***
        this.onInputUp.dispatch(this, pointer, isOver);
    ***REMOVED***

    if (this.freezeFrames)
    ***REMOVED***
        return;
    ***REMOVED***

    if (this.forceOut === true || (this.forceOut & pointer.pointerMode) === pointer.pointerMode)
    ***REMOVED***
        this.changeStateFrame(STATE_OUT);
    ***REMOVED***
    else
    ***REMOVED***
        var changedUp = this.changeStateFrame(STATE_UP);
        if (!changedUp)
        ***REMOVED***
            //  No Up frame to show..
            if (isOver)
            ***REMOVED***
                this.changeStateFrame(STATE_OVER);
            ***REMOVED***
            else
            ***REMOVED***
                this.changeStateFrame(STATE_OUT);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

***REMOVED***;
