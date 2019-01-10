/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* An Animation instance contains a single animation and the controls to play it.
*
* It is created by the AnimationManager, consists of Animation.Frame objects and belongs to a single Game Object such as a Sprite.
*
* @class Phaser.Animation
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***Phaser.Sprite***REMOVED*** parent - A reference to the owner of this Animation.
* @param ***REMOVED***string***REMOVED*** name - The unique name for this animation, used in playback commands.
* @param ***REMOVED***Phaser.FrameData***REMOVED*** frameData - The FrameData object that contains all frames used by this Animation.
* @param ***REMOVED***number[]|string[]***REMOVED*** frames - An array of numbers or strings indicating which frames to play in which order.
* @param ***REMOVED***number***REMOVED*** [frameRate=60] - The speed at which the animation should play. The speed is given in frames per second.
* @param ***REMOVED***boolean***REMOVED*** [loop=false] - Whether or not the animation is looped or just plays once.
*/
Phaser.Animation = function (game, parent, name, frameData, frames, frameRate, loop) ***REMOVED***

    if (loop === undefined) ***REMOVED*** loop = false; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running Game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***Phaser.Sprite***REMOVED*** _parent - A reference to the parent Sprite that owns this Animation.
    * @private
    */
    this._parent = parent;

    /**
    * @property ***REMOVED***Phaser.FrameData***REMOVED*** _frameData - The FrameData the Animation uses.
    * @private
    */
    this._frameData = frameData;

    /**
    * @property ***REMOVED***string***REMOVED*** name - The user defined name given to this Animation.
    */
    this.name = name;

    /**
    * @property ***REMOVED***array***REMOVED*** _frames
    * @private
    */
    this._frames = [];
    this._frames = this._frames.concat(frames);

    /**
    * @property ***REMOVED***number***REMOVED*** delay - The delay in ms between each frame of the Animation, based on the given frameRate.
    */
    this.delay = 1000 / frameRate;

    /**
    * @property ***REMOVED***boolean***REMOVED*** loop - The loop state of the Animation.
    */
    this.loop = loop;

    /**
    * @property ***REMOVED***number***REMOVED*** loopCount - The number of times the animation has looped since it was last started.
    */
    this.loopCount = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** killOnComplete - Should the parent of this Animation be killed when the animation completes?
    * @default
    */
    this.killOnComplete = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isFinished - The finished state of the Animation. Set to true once playback completes, false during playback.
    * @default
    */
    this.isFinished = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isPlaying - The playing state of the Animation. Set to false once playback completes, true during playback.
    * @default
    */
    this.isPlaying = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isPaused - The paused state of the Animation.
    * @default
    */
    this.isPaused = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _pauseStartTime - The time the animation paused.
    * @private
    * @default
    */
    this._pauseStartTime = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _frameIndex
    * @private
    * @default
    */
    this._frameIndex = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _frameDiff
    * @private
    * @default
    */
    this._frameDiff = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _frameSkip
    * @private
    * @default
    */
    this._frameSkip = 1;

    /**
    * @property ***REMOVED***Phaser.Frame***REMOVED*** currentFrame - The currently displayed frame of the Animation.
    */
    this.currentFrame = this._frameData.getFrame(this._frames[this._frameIndex]);

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onStart - This event is dispatched when this Animation starts playback.
    */
    this.onStart = new Phaser.Signal();

    /**
    * This event is dispatched when the Animation changes frame.
    * By default this event is disabled due to its intensive nature. Enable it with: `Animation.enableUpdate = true`.
    * Note that the event is only dispatched with the current frame. In a low-FPS environment Animations
    * will automatically frame-skip to try and claw back time, so do not base your code on expecting to
    * receive a perfectly sequential set of frames from this event.
    * @property ***REMOVED***Phaser.Signal|null***REMOVED*** onUpdate
    * @default
    */
    this.onUpdate = null;

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onComplete - This event is dispatched when this Animation completes playback. If the animation is set to loop this is never fired, listen for onLoop instead.
    */
    this.onComplete = new Phaser.Signal();

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onLoop - This event is dispatched when this Animation loops.
    */
    this.onLoop = new Phaser.Signal();

    /**
     * @property ***REMOVED***boolean***REMOVED*** isReversed - Indicates if the animation will play backwards.
     * @default
     */
    this.isReversed = false;

    //  Set-up some event listeners
    this.game.onPause.add(this.onPause, this);
    this.game.onResume.add(this.onResume, this);

***REMOVED***;

Phaser.Animation.prototype = ***REMOVED***

    /**
    * Plays this animation.
    *
    * @method Phaser.Animation#play
    * @param ***REMOVED***number***REMOVED*** [frameRate=null] - The framerate to play the animation at. The speed is given in frames per second. If not provided the previously set frameRate of the Animation is used.
    * @param ***REMOVED***boolean***REMOVED*** [loop=false] - Should the animation be looped after playback. If not provided the previously set loop value of the Animation is used.
    * @param ***REMOVED***boolean***REMOVED*** [killOnComplete=false] - If set to true when the animation completes (only happens if loop=false) the parent Sprite will be killed.
    * @return ***REMOVED***Phaser.Animation***REMOVED*** - A reference to this Animation instance.
    */
    play: function (frameRate, loop, killOnComplete) ***REMOVED***

        if (typeof frameRate === 'number')
        ***REMOVED***
            //  If they set a new frame rate then use it, otherwise use the one set on creation
            this.delay = 1000 / frameRate;
        ***REMOVED***

        if (typeof loop === 'boolean')
        ***REMOVED***
            //  If they set a new loop value then use it, otherwise use the one set on creation
            this.loop = loop;
        ***REMOVED***

        if (typeof killOnComplete !== 'undefined')
        ***REMOVED***
            //  Remove the parent sprite once the animation has finished?
            this.killOnComplete = killOnComplete;
        ***REMOVED***

        this.isPlaying = true;
        this.isFinished = false;
        this.paused = false;
        this.loopCount = 0;

        this._timeLastFrame = this.game.time.time;
        this._timeNextFrame = this.game.time.time + this.delay;

        this._frameIndex = this.isReversed ? this._frames.length - 1 : 0;
        this.updateCurrentFrame(false, true);

        this._parent.events.onAnimationStart$dispatch(this._parent, this);

        this.onStart.dispatch(this._parent, this);

        this._parent.animations.currentAnim = this;
        this._parent.animations.currentFrame = this.currentFrame;

        return this;

    ***REMOVED***,

    /**
    * Sets this animation back to the first frame and restarts the animation.
    *
    * @method Phaser.Animation#restart
    */
    restart: function () ***REMOVED***

        this.isPlaying = true;
        this.isFinished = false;
        this.paused = false;
        this.loopCount = 0;

        this._timeLastFrame = this.game.time.time;
        this._timeNextFrame = this.game.time.time + this.delay;

        this._frameIndex = 0;

        this.currentFrame = this._frameData.getFrame(this._frames[this._frameIndex]);

        this._parent.setFrame(this.currentFrame);

        this._parent.animations.currentAnim = this;
        this._parent.animations.currentFrame = this.currentFrame;

        this.onStart.dispatch(this._parent, this);

    ***REMOVED***,

    /**
    * Reverses the animation direction.
    *
    * @method Phaser.Animation#reverse
    * @return ***REMOVED***Phaser.Animation***REMOVED*** The animation instance.
    */
    reverse: function () ***REMOVED***

        this.reversed = !this.reversed;

        return this;

    ***REMOVED***,

    /**
    * Reverses the animation direction for the current/next animation only
    * Once the onComplete event is called this method will be called again and revert
    * the reversed state.
    *
    * @method Phaser.Animation#reverseOnce
    * @return ***REMOVED***Phaser.Animation***REMOVED*** The animation instance.
    */
    reverseOnce: function () ***REMOVED***

        this.onComplete.addOnce(this.reverse, this);

        return this.reverse();

    ***REMOVED***,

    /**
    * Sets this animations playback to a given frame with the given ID.
    *
    * @method Phaser.Animation#setFrame
    * @param ***REMOVED***string|number***REMOVED*** [frameId] - The identifier of the frame to set. Can be the name of the frame, the sprite index of the frame, or the animation-local frame index.
    * @param ***REMOVED***boolean***REMOVED*** [useLocalFrameIndex=false] - If you provide a number for frameId, should it use the numeric indexes of the frameData, or the 0-indexed frame index local to the animation.
    */
    setFrame: function(frameId, useLocalFrameIndex) ***REMOVED***

        var frameIndex;

        if (useLocalFrameIndex === undefined)
        ***REMOVED***
            useLocalFrameIndex = false;
        ***REMOVED***

        //  Find the index to the desired frame.
        if (typeof frameId === "string")
        ***REMOVED***
            for (var i = 0; i < this._frames.length; i++)
            ***REMOVED***
                if (this._frameData.getFrame(this._frames[i]).name === frameId)
                ***REMOVED***
                    frameIndex = i;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else if (typeof frameId === "number")
        ***REMOVED***
            if (useLocalFrameIndex)
            ***REMOVED***
                frameIndex = frameId;
            ***REMOVED***
            else
            ***REMOVED***
                for (var i = 0; i < this._frames.length; i++)
                ***REMOVED***
                    if (this._frames[i] === frameId)
                    ***REMOVED***
                        frameIndex = i;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        if (frameIndex)
        ***REMOVED***
            //  Set the current frame index to the found index. Subtract 1 so that it animates to the desired frame on update.
            this._frameIndex = frameIndex - 1;

            //  Make the animation update at next update
            this._timeNextFrame = this.game.time.time;

            this.update();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Stops playback of this animation and set it to a finished state. If a resetFrame is provided it will stop playback and set frame to the first in the animation.
    * If `dispatchComplete` is true it will dispatch the complete events, otherwise they'll be ignored.
    *
    * @method Phaser.Animation#stop
    * @param ***REMOVED***boolean***REMOVED*** [resetFrame=false] - If true after the animation stops the currentFrame value will be set to the first frame in this animation.
    * @param ***REMOVED***boolean***REMOVED*** [dispatchComplete=false] - Dispatch the Animation.onComplete and parent.onAnimationComplete events?
    */
    stop: function (resetFrame, dispatchComplete) ***REMOVED***

        if (resetFrame === undefined) ***REMOVED*** resetFrame = false; ***REMOVED***
        if (dispatchComplete === undefined) ***REMOVED*** dispatchComplete = false; ***REMOVED***

        this.isPlaying = false;
        this.isFinished = true;
        this.paused = false;

        if (resetFrame)
        ***REMOVED***
            this.currentFrame = this._frameData.getFrame(this._frames[0]);
            this._parent.setFrame(this.currentFrame);
        ***REMOVED***

        if (dispatchComplete)
        ***REMOVED***
            this._parent.events.onAnimationComplete$dispatch(this._parent, this);
            this.onComplete.dispatch(this._parent, this);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called when the Game enters a paused state.
    *
    * @method Phaser.Animation#onPause
    */
    onPause: function () ***REMOVED***

        if (this.isPlaying)
        ***REMOVED***
            this._frameDiff = this._timeNextFrame - this.game.time.time;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called when the Game resumes from a paused state.
    *
    * @method Phaser.Animation#onResume
    */
    onResume: function () ***REMOVED***

        if (this.isPlaying)
        ***REMOVED***
            this._timeNextFrame = this.game.time.time + this._frameDiff;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Updates this animation. Called automatically by the AnimationManager.
    *
    * @method Phaser.Animation#update
    */
    update: function () ***REMOVED***

        if (this.isPaused)
        ***REMOVED***
            return false;
        ***REMOVED***

        if (this.isPlaying && this.game.time.time >= this._timeNextFrame)
        ***REMOVED***
            this._frameSkip = 1;

            //  Lagging?
            this._frameDiff = this.game.time.time - this._timeNextFrame;

            this._timeLastFrame = this.game.time.time;

            if (this._frameDiff > this.delay)
            ***REMOVED***
                //  We need to skip a frame, work out how many
                this._frameSkip = Math.floor(this._frameDiff / this.delay);
                this._frameDiff -= (this._frameSkip * this.delay);
            ***REMOVED***

            //  And what's left now?
            this._timeNextFrame = this.game.time.time + (this.delay - this._frameDiff);

            if (this.isReversed)
            ***REMOVED***
                this._frameIndex -= this._frameSkip;
            ***REMOVED***
            else
            ***REMOVED***
                this._frameIndex += this._frameSkip;
            ***REMOVED***

            if (!this.isReversed && this._frameIndex >= this._frames.length || this.isReversed && this._frameIndex <= -1)
            ***REMOVED***
                if (this.loop)
                ***REMOVED***
                    // Update current state before event callback
                    this._frameIndex = Math.abs(this._frameIndex) % this._frames.length;

                    if (this.isReversed)
                    ***REMOVED***
                        this._frameIndex = this._frames.length - 1 - this._frameIndex;
                    ***REMOVED***

                    this.currentFrame = this._frameData.getFrame(this._frames[this._frameIndex]);

                    //  Instead of calling updateCurrentFrame we do it here instead
                    if (this.currentFrame)
                    ***REMOVED***
                        this._parent.setFrame(this.currentFrame);
                    ***REMOVED***

                    this.loopCount++;
                    this._parent.events.onAnimationLoop$dispatch(this._parent, this);
                    this.onLoop.dispatch(this._parent, this);

                    if (this.onUpdate)
                    ***REMOVED***
                        this.onUpdate.dispatch(this, this.currentFrame);

                        // False if the animation was destroyed from within a callback
                        return !!this._frameData;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        return true;
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    this.complete();
                    return false;
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                return this.updateCurrentFrame(true);
            ***REMOVED***
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Changes the currentFrame per the _frameIndex, updates the display state,
    * and triggers the update signal.
    *
    * Returns true if the current frame update was 'successful', false otherwise.
    *
    * @method Phaser.Animation#updateCurrentFrame
    * @private
    * @param ***REMOVED***boolean***REMOVED*** signalUpdate - If true the `Animation.onUpdate` signal will be dispatched.
    * @param ***REMOVED***boolean***REMOVED*** fromPlay - Was this call made from the playing of a new animation?
    * @return ***REMOVED***boolean***REMOVED*** True if the current frame was updated, otherwise false.
    */
    updateCurrentFrame: function (signalUpdate, fromPlay) ***REMOVED***

        if (fromPlay === undefined) ***REMOVED*** fromPlay = false; ***REMOVED***

        if (!this._frameData)
        ***REMOVED***
            // The animation is already destroyed, probably from a callback
            return false;
        ***REMOVED***

        //  Previous index
        var idx = this.currentFrame.index;

        this.currentFrame = this._frameData.getFrame(this._frames[this._frameIndex]);

        if (this.currentFrame && (fromPlay || (!fromPlay && idx !== this.currentFrame.index)))
        ***REMOVED***
            this._parent.setFrame(this.currentFrame);
        ***REMOVED***

        if (this.onUpdate && signalUpdate)
        ***REMOVED***
            this.onUpdate.dispatch(this, this.currentFrame);

            // False if the animation was destroyed from within a callback
            return !!this._frameData;
        ***REMOVED***
        else
        ***REMOVED***
            return true;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Advances by the given number of frames in the Animation, taking the loop value into consideration.
    *
    * @method Phaser.Animation#next
    * @param ***REMOVED***number***REMOVED*** [quantity=1] - The number of frames to advance.
    */
    next: function (quantity) ***REMOVED***

        if (quantity === undefined) ***REMOVED*** quantity = 1; ***REMOVED***

        var frame = this._frameIndex + quantity;

        if (frame >= this._frames.length)
        ***REMOVED***
            if (this.loop)
            ***REMOVED***
                frame %= this._frames.length;
            ***REMOVED***
            else
            ***REMOVED***
                frame = this._frames.length - 1;
            ***REMOVED***
        ***REMOVED***

        if (frame !== this._frameIndex)
        ***REMOVED***
            this._frameIndex = frame;
            this.updateCurrentFrame(true);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Moves backwards the given number of frames in the Animation, taking the loop value into consideration.
    *
    * @method Phaser.Animation#previous
    * @param ***REMOVED***number***REMOVED*** [quantity=1] - The number of frames to move back.
    */
    previous: function (quantity) ***REMOVED***

        if (quantity === undefined) ***REMOVED*** quantity = 1; ***REMOVED***

        var frame = this._frameIndex - quantity;

        if (frame < 0)
        ***REMOVED***
            if (this.loop)
            ***REMOVED***
                frame = this._frames.length + frame;
            ***REMOVED***
            else
            ***REMOVED***
                frame++;
            ***REMOVED***
        ***REMOVED***

        if (frame !== this._frameIndex)
        ***REMOVED***
            this._frameIndex = frame;
            this.updateCurrentFrame(true);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Changes the FrameData object this Animation is using.
    *
    * @method Phaser.Animation#updateFrameData
    * @param ***REMOVED***Phaser.FrameData***REMOVED*** frameData - The FrameData object that contains all frames used by this Animation.
    */
    updateFrameData: function (frameData) ***REMOVED***

        this._frameData = frameData;
        this.currentFrame = this._frameData ? this._frameData.getFrame(this._frames[this._frameIndex % this._frames.length]) : null;

    ***REMOVED***,

    /**
    * Cleans up this animation ready for deletion. Nulls all values and references.
    *
    * @method Phaser.Animation#destroy
    */
    destroy: function () ***REMOVED***

        if (!this._frameData)
        ***REMOVED***
            // Already destroyed
            return;
        ***REMOVED***

        this.game.onPause.remove(this.onPause, this);
        this.game.onResume.remove(this.onResume, this);

        this.game = null;
        this._parent = null;
        this._frames = null;
        this._frameData = null;
        this.currentFrame = null;
        this.isPlaying = false;

        this.onStart.dispose();
        this.onLoop.dispose();
        this.onComplete.dispose();

        if (this.onUpdate)
        ***REMOVED***
            this.onUpdate.dispose();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called internally when the animation finishes playback.
    * Sets the isPlaying and isFinished states and dispatches the onAnimationComplete event if it exists on the parent and local onComplete event.
    *
    * @method Phaser.Animation#complete
    */
    complete: function () ***REMOVED***

        this._frameIndex = this._frames.length - 1;
        this.currentFrame = this._frameData.getFrame(this._frames[this._frameIndex]);

        this.isPlaying = false;
        this.isFinished = true;
        this.paused = false;

        this._parent.events.onAnimationComplete$dispatch(this._parent, this);

        this.onComplete.dispatch(this._parent, this);

        if (this.killOnComplete)
        ***REMOVED***
            this._parent.kill();
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

Phaser.Animation.prototype.constructor = Phaser.Animation;

/**
* @name Phaser.Animation#paused
* @property ***REMOVED***boolean***REMOVED*** paused - Gets and sets the paused state of this Animation.
*/
Object.defineProperty(Phaser.Animation.prototype, 'paused', ***REMOVED***

    get: function () ***REMOVED***

        return this.isPaused;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.isPaused = value;

        if (value)
        ***REMOVED***
            //  Paused
            this._pauseStartTime = this.game.time.time;
        ***REMOVED***
        else
        ***REMOVED***
            //  Un-paused
            if (this.isPlaying)
            ***REMOVED***
                this._timeNextFrame = this.game.time.time + this.delay;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Animation#reversed
* @property ***REMOVED***boolean***REMOVED*** reversed - Gets and sets the isReversed state of this Animation.
*/
Object.defineProperty(Phaser.Animation.prototype, 'reversed', ***REMOVED***

    get: function () ***REMOVED***

        return this.isReversed;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.isReversed = value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Animation#frameTotal
* @property ***REMOVED***number***REMOVED*** frameTotal - The total number of frames in the currently loaded FrameData, or -1 if no FrameData is loaded.
* @readonly
*/
Object.defineProperty(Phaser.Animation.prototype, 'frameTotal', ***REMOVED***

    get: function () ***REMOVED***
        return this._frames.length;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Animation#frame
* @property ***REMOVED***number***REMOVED*** frame - Gets or sets the current frame index and updates the Texture Cache for display.
*/
Object.defineProperty(Phaser.Animation.prototype, 'frame', ***REMOVED***

    get: function () ***REMOVED***

        if (this.currentFrame !== null)
        ***REMOVED***
            return this.currentFrame.index;
        ***REMOVED***
        else
        ***REMOVED***
            return this._frameIndex;
        ***REMOVED***

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.currentFrame = this._frameData.getFrame(this._frames[value]);

        if (this.currentFrame !== null)
        ***REMOVED***
            this._frameIndex = value;
            this._parent.setFrame(this.currentFrame);

            if (this.onUpdate)
            ***REMOVED***
                this.onUpdate.dispatch(this, this.currentFrame);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Animation#speed
* @property ***REMOVED***number***REMOVED*** speed - Gets or sets the current speed of the animation in frames per second. Changing this in a playing animation will take effect from the next frame. Value must be greater than 0.
*/
Object.defineProperty(Phaser.Animation.prototype, 'speed', ***REMOVED***

    get: function () ***REMOVED***

        return 1000 / this.delay;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value > 0)
        ***REMOVED***
            this.delay = 1000 / value;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Animation#enableUpdate
* @property ***REMOVED***boolean***REMOVED*** enableUpdate - Gets or sets if this animation will dispatch the onUpdate events upon changing frame.
*/
Object.defineProperty(Phaser.Animation.prototype, 'enableUpdate', ***REMOVED***

    get: function () ***REMOVED***

        return (this.onUpdate !== null);

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value && this.onUpdate === null)
        ***REMOVED***
            this.onUpdate = new Phaser.Signal();
        ***REMOVED***
        else if (!value && this.onUpdate !== null)
        ***REMOVED***
            this.onUpdate.dispose();
            this.onUpdate = null;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* Really handy function for when you are creating arrays of animation data but it's using frame names and not numbers.
* For example imagine you've got 30 frames named: 'explosion_0001-large' to 'explosion_0030-large'
* You could use this function to generate those by doing: Phaser.Animation.generateFrameNames('explosion_', 1, 30, '-large', 4);
*
* @method Phaser.Animation.generateFrameNames
* @static
* @param ***REMOVED***string***REMOVED*** prefix - The start of the filename. If the filename was 'explosion_0001-large' the prefix would be 'explosion_'.
* @param ***REMOVED***number***REMOVED*** start - The number to start sequentially counting from. If your frames are named 'explosion_0001' to 'explosion_0034' the start is 1.
* @param ***REMOVED***number***REMOVED*** stop - The number to count to. If your frames are named 'explosion_0001' to 'explosion_0034' the stop value is 34.
* @param ***REMOVED***string***REMOVED*** [suffix=''] - The end of the filename. If the filename was 'explosion_0001-large' the prefix would be '-large'.
* @param ***REMOVED***number***REMOVED*** [zeroPad=0] - The number of zeros to pad the min and max values with. If your frames are named 'explosion_0001' to 'explosion_0034' then the zeroPad is 4.
* @return ***REMOVED***string[]***REMOVED*** An array of framenames.
*/
Phaser.Animation.generateFrameNames = function (prefix, start, stop, suffix, zeroPad) ***REMOVED***

    if (suffix === undefined) ***REMOVED*** suffix = ''; ***REMOVED***

    var output = [];
    var frame = '';

    if (start < stop)
    ***REMOVED***
        for (var i = start; i <= stop; i++)
        ***REMOVED***
            if (typeof zeroPad === 'number')
            ***REMOVED***
                //  str, len, pad, dir
                frame = Phaser.Utils.pad(i.toString(), zeroPad, '0', 1);
            ***REMOVED***
            else
            ***REMOVED***
                frame = i.toString();
            ***REMOVED***

            frame = prefix + frame + suffix;

            output.push(frame);
        ***REMOVED***
    ***REMOVED***
    else
    ***REMOVED***
        for (var i = start; i >= stop; i--)
        ***REMOVED***
            if (typeof zeroPad === 'number')
            ***REMOVED***
                //  str, len, pad, dir
                frame = Phaser.Utils.pad(i.toString(), zeroPad, '0', 1);
            ***REMOVED***
            else
            ***REMOVED***
                frame = i.toString();
            ***REMOVED***

            frame = prefix + frame + suffix;

            output.push(frame);
        ***REMOVED***
    ***REMOVED***

    return output;

***REMOVED***;
