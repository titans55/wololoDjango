/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Animation Manager is used to add, play and update Phaser Animations.
* Any Game Object such as Phaser.Sprite that supports animation contains a single AnimationManager instance.
*
* @class Phaser.AnimationManager
* @constructor
* @param ***REMOVED***Phaser.Sprite***REMOVED*** sprite - A reference to the Game Object that owns this AnimationManager.
*/
Phaser.AnimationManager = function (sprite) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Sprite***REMOVED*** sprite - A reference to the parent Sprite that owns this AnimationManager.
    */
    this.sprite = sprite;

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running Game.
    */
    this.game = sprite.game;

    /**
    * The currently displayed Frame of animation, if any.
    * This property is only set once an Animation starts playing. Until that point it remains set as `null`.
    * 
    * @property ***REMOVED***Phaser.Frame***REMOVED*** currentFrame
    * @default
    */
    this.currentFrame = null;

    /**
    * @property ***REMOVED***Phaser.Animation***REMOVED*** currentAnim - The currently displayed animation, if any.
    * @default
    */
    this.currentAnim = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** updateIfVisible - Should the animation data continue to update even if the Sprite.visible is set to false.
    * @default
    */
    this.updateIfVisible = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isLoaded - Set to true once animation data has been loaded.
    * @default
    */
    this.isLoaded = false;

    /**
    * @property ***REMOVED***Phaser.FrameData***REMOVED*** _frameData - A temp. var for holding the currently playing Animations FrameData.
    * @private
    * @default
    */
    this._frameData = null;

    /**
    * @property ***REMOVED***object***REMOVED*** _anims - An internal object that stores all of the Animation instances.
    * @private
    */
    this._anims = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***object***REMOVED*** _outputFrames - An internal object to help avoid gc.
    * @private
    */
    this._outputFrames = [];

***REMOVED***;

Phaser.AnimationManager.prototype = ***REMOVED***

    /**
    * Loads FrameData into the internal temporary vars and resets the frame index to zero.
    * This is called automatically when a new Sprite is created.
    *
    * @method Phaser.AnimationManager#loadFrameData
    * @private
    * @param ***REMOVED***Phaser.FrameData***REMOVED*** frameData - The FrameData set to load.
    * @param ***REMOVED***string|number***REMOVED*** frame - The frame to default to.
    * @return ***REMOVED***boolean***REMOVED*** Returns `true` if the frame data was loaded successfully, otherwise `false`
    */
    loadFrameData: function (frameData, frame) ***REMOVED***

        if (frameData === undefined)
        ***REMOVED***
            return false;
        ***REMOVED***

        if (this.isLoaded)
        ***REMOVED***
            //   We need to update the frameData that the animations are using
            for (var anim in this._anims)
            ***REMOVED***
                this._anims[anim].updateFrameData(frameData);
            ***REMOVED***
        ***REMOVED***

        this._frameData = frameData;

        if (frame === undefined || frame === null)
        ***REMOVED***
            this.frame = 0;
        ***REMOVED***
        else
        ***REMOVED***
            if (typeof frame === 'string')
            ***REMOVED***
                this.frameName = frame;
            ***REMOVED***
            else
            ***REMOVED***
                this.frame = frame;
            ***REMOVED***
        ***REMOVED***

        this.isLoaded = true;

        return true;
    ***REMOVED***,

    /**
    * Loads FrameData into the internal temporary vars and resets the frame index to zero.
    * This is called automatically when a new Sprite is created.
    *
    * @method Phaser.AnimationManager#copyFrameData
    * @private
    * @param ***REMOVED***Phaser.FrameData***REMOVED*** frameData - The FrameData set to load.
    * @param ***REMOVED***string|number***REMOVED*** frame - The frame to default to.
    * @return ***REMOVED***boolean***REMOVED*** Returns `true` if the frame data was loaded successfully, otherwise `false`
    */
    copyFrameData: function (frameData, frame) ***REMOVED***

        this._frameData = frameData.clone();

        if (this.isLoaded)
        ***REMOVED***
            //   We need to update the frameData that the animations are using
            for (var anim in this._anims)
            ***REMOVED***
                this._anims[anim].updateFrameData(this._frameData);
            ***REMOVED***
        ***REMOVED***

        if (frame === undefined || frame === null)
        ***REMOVED***
            this.frame = 0;
        ***REMOVED***
        else
        ***REMOVED***
            if (typeof frame === 'string')
            ***REMOVED***
                this.frameName = frame;
            ***REMOVED***
            else
            ***REMOVED***
                this.frame = frame;
            ***REMOVED***
        ***REMOVED***

        this.isLoaded = true;

        return true;
    ***REMOVED***,

    /**
    * Adds a new animation under the given key. Optionally set the frames, frame rate and loop.
    * Animations added in this way are played back with the play function.
    *
    * @method Phaser.AnimationManager#add
    * @param ***REMOVED***string***REMOVED*** name - The unique (within this Sprite) name for the animation, i.e. "run", "fire", "walk".
    * @param ***REMOVED***Array***REMOVED*** [frames=null] - An array of numbers/strings that correspond to the frames to add to this animation and in which order. e.g. [1, 2, 3] or ['run0', 'run1', run2]). If null then all frames will be used.
    * @param ***REMOVED***number***REMOVED*** [frameRate=60] - The speed at which the animation should play. The speed is given in frames per second.
    * @param ***REMOVED***boolean***REMOVED*** [loop=false] - Whether or not the animation is looped or just plays once.
    * @param ***REMOVED***boolean***REMOVED*** [useNumericIndex=true] - Are the given frames using numeric indexes (default) or strings?
    * @return ***REMOVED***Phaser.Animation***REMOVED*** The Animation object that was created.
    */
    add: function (name, frames, frameRate, loop, useNumericIndex) ***REMOVED***

        frames = frames || [];
        frameRate = frameRate || 60;

        if (loop === undefined) ***REMOVED*** loop = false; ***REMOVED***

        //  If they didn't set the useNumericIndex then let's at least try and guess it
        if (useNumericIndex === undefined)
        ***REMOVED***
            if (frames && typeof frames[0] === 'number')
            ***REMOVED***
                useNumericIndex = true;
            ***REMOVED***
            else
            ***REMOVED***
                useNumericIndex = false;
            ***REMOVED***
        ***REMOVED***

        this._outputFrames = [];

        this._frameData.getFrameIndexes(frames, useNumericIndex, this._outputFrames);

        this._anims[name] = new Phaser.Animation(this.game, this.sprite, name, this._frameData, this._outputFrames, frameRate, loop);

        this.currentAnim = this._anims[name];

        if (this.sprite.tilingTexture)
        ***REMOVED***
            this.sprite.refreshTexture = true;
        ***REMOVED***

        return this._anims[name];

    ***REMOVED***,

    /**
    * Check whether the frames in the given array are valid and exist.
    *
    * @method Phaser.AnimationManager#validateFrames
    * @param ***REMOVED***Array***REMOVED*** frames - An array of frames to be validated.
    * @param ***REMOVED***boolean***REMOVED*** [useNumericIndex=true] - Validate the frames based on their numeric index (true) or string index (false)
    * @return ***REMOVED***boolean***REMOVED*** True if all given Frames are valid, otherwise false.
    */
    validateFrames: function (frames, useNumericIndex) ***REMOVED***

        if (useNumericIndex === undefined) ***REMOVED*** useNumericIndex = true; ***REMOVED***

        for (var i = 0; i < frames.length; i++)
        ***REMOVED***
            if (useNumericIndex === true)
            ***REMOVED***
                if (frames[i] > this._frameData.total)
                ***REMOVED***
                    return false;
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                if (this._frameData.checkFrameName(frames[i]) === false)
                ***REMOVED***
                    return false;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return true;

    ***REMOVED***,

    /**
    * Play an animation based on the given key. The animation should previously have been added via `animations.add`
    * 
    * If the requested animation is already playing this request will be ignored. 
    * If you need to reset an already running animation do so directly on the Animation object itself.
    *
    * @method Phaser.AnimationManager#play
    * @param ***REMOVED***string***REMOVED*** name - The name of the animation to be played, e.g. "fire", "walk", "jump".
    * @param ***REMOVED***number***REMOVED*** [frameRate=null] - The framerate to play the animation at. The speed is given in frames per second. If not provided the previously set frameRate of the Animation is used.
    * @param ***REMOVED***boolean***REMOVED*** [loop=false] - Should the animation be looped after playback. If not provided the previously set loop value of the Animation is used.
    * @param ***REMOVED***boolean***REMOVED*** [killOnComplete=false] - If set to true when the animation completes (only happens if loop=false) the parent Sprite will be killed.
    * @return ***REMOVED***Phaser.Animation***REMOVED*** A reference to playing Animation instance.
    */
    play: function (name, frameRate, loop, killOnComplete) ***REMOVED***

        if (this._anims[name])
        ***REMOVED***
            if (this.currentAnim === this._anims[name])
            ***REMOVED***
                if (this.currentAnim.isPlaying === false)
                ***REMOVED***
                    this.currentAnim.paused = false;
                    return this.currentAnim.play(frameRate, loop, killOnComplete);
                ***REMOVED***

                return this.currentAnim;
            ***REMOVED***
            else
            ***REMOVED***
                if (this.currentAnim && this.currentAnim.isPlaying)
                ***REMOVED***
                    this.currentAnim.stop();
                ***REMOVED***

                this.currentAnim = this._anims[name];
                this.currentAnim.paused = false;
                this.currentFrame = this.currentAnim.currentFrame;
                return this.currentAnim.play(frameRate, loop, killOnComplete);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Stop playback of an animation. If a name is given that specific animation is stopped, otherwise the current animation is stopped.
    * The currentAnim property of the AnimationManager is automatically set to the animation given.
    *
    * @method Phaser.AnimationManager#stop
    * @param ***REMOVED***string***REMOVED*** [name=null] - The name of the animation to be stopped, e.g. "fire". If none is given the currently running animation is stopped.
    * @param ***REMOVED***boolean***REMOVED*** [resetFrame=false] - When the animation is stopped should the currentFrame be set to the first frame of the animation (true) or paused on the last frame displayed (false)
    */
    stop: function (name, resetFrame) ***REMOVED***

        if (resetFrame === undefined) ***REMOVED*** resetFrame = false; ***REMOVED***

        if (this.currentAnim && (typeof name !== 'string' || name === this.currentAnim.name))
        ***REMOVED***
            this.currentAnim.stop(resetFrame);
        ***REMOVED***

    ***REMOVED***,

    /**
    * The main update function is called by the Sprites update loop. It's responsible for updating animation frames and firing related events.
    *
    * @method Phaser.AnimationManager#update
    * @protected
    * @return ***REMOVED***boolean***REMOVED*** True if a new animation frame has been set, otherwise false.
    */
    update: function () ***REMOVED***

        if (this.updateIfVisible && !this.sprite.visible)
        ***REMOVED***
            return false;
        ***REMOVED***

        if (this.currentAnim && this.currentAnim.update())
        ***REMOVED***
            this.currentFrame = this.currentAnim.currentFrame;
            return true;
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Advances by the given number of frames in the current animation, taking the loop value into consideration.
    *
    * @method Phaser.AnimationManager#next
    * @param ***REMOVED***number***REMOVED*** [quantity=1] - The number of frames to advance.
    */
    next: function (quantity) ***REMOVED***

        if (this.currentAnim)
        ***REMOVED***
            this.currentAnim.next(quantity);
            this.currentFrame = this.currentAnim.currentFrame;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Moves backwards the given number of frames in the current animation, taking the loop value into consideration.
    *
    * @method Phaser.AnimationManager#previous
    * @param ***REMOVED***number***REMOVED*** [quantity=1] - The number of frames to move back.
    */
    previous: function (quantity) ***REMOVED***

        if (this.currentAnim)
        ***REMOVED***
            this.currentAnim.previous(quantity);
            this.currentFrame = this.currentAnim.currentFrame;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns an animation that was previously added by name.
    *
    * @method Phaser.AnimationManager#getAnimation
    * @param ***REMOVED***string***REMOVED*** name - The name of the animation to be returned, e.g. "fire".
    * @return ***REMOVED***Phaser.Animation***REMOVED*** The Animation instance, if found, otherwise null.
    */
    getAnimation: function (name) ***REMOVED***

        if (typeof name === 'string')
        ***REMOVED***
            if (this._anims[name])
            ***REMOVED***
                return this._anims[name];
            ***REMOVED***
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Refreshes the current frame data back to the parent Sprite and also resets the texture data.
    *
    * @method Phaser.AnimationManager#refreshFrame
    */
    refreshFrame: function () ***REMOVED***

        //  TODO
        // this.sprite.setTexture(PIXI.TextureCache[this.currentFrame.uuid]);

    ***REMOVED***,

    /**
    * Destroys all references this AnimationManager contains.
    * Iterates through the list of animations stored in this manager and calls destroy on each of them.
    *
    * @method Phaser.AnimationManager#destroy
    */
    destroy: function () ***REMOVED***

        var anim = null;

        for (var anim in this._anims)
        ***REMOVED***
            if (this._anims.hasOwnProperty(anim))
            ***REMOVED***
                this._anims[anim].destroy();
            ***REMOVED***
        ***REMOVED***

        this._anims = ***REMOVED******REMOVED***;
        this._outputFrames = [];
        this._frameData = null;
        this.currentAnim = null;
        this.currentFrame = null;
        this.sprite = null;
        this.game = null;

    ***REMOVED***

***REMOVED***;

Phaser.AnimationManager.prototype.constructor = Phaser.AnimationManager;

/**
* @name Phaser.AnimationManager#frameData
* @property ***REMOVED***Phaser.FrameData***REMOVED*** frameData - The current animations FrameData.
* @readonly
*/
Object.defineProperty(Phaser.AnimationManager.prototype, 'frameData', ***REMOVED***

    get: function () ***REMOVED***
        return this._frameData;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.AnimationManager#frameTotal
* @property ***REMOVED***number***REMOVED*** frameTotal - The total number of frames in the currently loaded FrameData, or -1 if no FrameData is loaded.
* @readonly
*/
Object.defineProperty(Phaser.AnimationManager.prototype, 'frameTotal', ***REMOVED***

    get: function () ***REMOVED***

        return this._frameData.total;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.AnimationManager#paused
* @property ***REMOVED***boolean***REMOVED*** paused - Gets and sets the paused state of the current animation.
*/
Object.defineProperty(Phaser.AnimationManager.prototype, 'paused', ***REMOVED***

    get: function () ***REMOVED***

        return this.currentAnim.isPaused;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.currentAnim.paused = value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.AnimationManager#name
* @property ***REMOVED***string***REMOVED*** name - Gets the current animation name, if set.
*/
Object.defineProperty(Phaser.AnimationManager.prototype, 'name', ***REMOVED***

    get: function () ***REMOVED***

        if (this.currentAnim)
        ***REMOVED***
            return this.currentAnim.name;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.AnimationManager#frame
* @property ***REMOVED***number***REMOVED*** frame - Gets or sets the current frame index and updates the Texture Cache for display.
*/
Object.defineProperty(Phaser.AnimationManager.prototype, 'frame', ***REMOVED***

    get: function () ***REMOVED***

        if (this.currentFrame)
        ***REMOVED***
            return this.currentFrame.index;
        ***REMOVED***

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (typeof value === 'number' && this._frameData && this._frameData.getFrame(value) !== null)
        ***REMOVED***
            this.currentFrame = this._frameData.getFrame(value);

            if (this.currentFrame)
            ***REMOVED***
                this.sprite.setFrame(this.currentFrame);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.AnimationManager#frameName
* @property ***REMOVED***string***REMOVED*** frameName - Gets or sets the current frame name and updates the Texture Cache for display.
*/
Object.defineProperty(Phaser.AnimationManager.prototype, 'frameName', ***REMOVED***

    get: function () ***REMOVED***

        if (this.currentFrame)
        ***REMOVED***
            return this.currentFrame.name;
        ***REMOVED***

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (typeof value === 'string' && this._frameData && this._frameData.getFrameByName(value) !== null)
        ***REMOVED***
            this.currentFrame = this._frameData.getFrameByName(value);

            if (this.currentFrame)
            ***REMOVED***
                this._frameIndex = this.currentFrame.index;

                this.sprite.setFrame(this.currentFrame);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            console.warn('Cannot set frameName: ' + value);
        ***REMOVED***
    ***REMOVED***

***REMOVED***);

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

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A Frame is a single frame of an animation and is part of a FrameData collection.
*
* @class Phaser.Frame
* @constructor
* @param ***REMOVED***number***REMOVED*** index - The index of this Frame within the FrameData set it is being added to.
* @param ***REMOVED***number***REMOVED*** x - X position of the frame within the texture image.
* @param ***REMOVED***number***REMOVED*** y - Y position of the frame within the texture image.
* @param ***REMOVED***number***REMOVED*** width - Width of the frame within the texture image.
* @param ***REMOVED***number***REMOVED*** height - Height of the frame within the texture image.
* @param ***REMOVED***string***REMOVED*** name - The name of the frame. In Texture Atlas data this is usually set to the filename.
*/
Phaser.Frame = function (index, x, y, width, height, name) ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** index - The index of this Frame within the FrameData set it is being added to.
    */
    this.index = index;

    /**
    * @property ***REMOVED***number***REMOVED*** x - X position within the image to cut from.
    */
    this.x = x;

    /**
    * @property ***REMOVED***number***REMOVED*** y - Y position within the image to cut from.
    */
    this.y = y;

    /**
    * @property ***REMOVED***number***REMOVED*** width - Width of the frame.
    */
    this.width = width;

    /**
    * @property ***REMOVED***number***REMOVED*** height - Height of the frame.
    */
    this.height = height;

    /**
    * @property ***REMOVED***string***REMOVED*** name - Useful for Texture Atlas files (is set to the filename value).
    */
    this.name = name;

    /**
    * @property ***REMOVED***number***REMOVED*** centerX - Center X position within the image to cut from.
    */
    this.centerX = Math.floor(width / 2);

    /**
    * @property ***REMOVED***number***REMOVED*** centerY - Center Y position within the image to cut from.
    */
    this.centerY = Math.floor(height / 2);

    /**
    * @property ***REMOVED***number***REMOVED*** distance - The distance from the top left to the bottom-right of this Frame.
    */
    this.distance = Phaser.Math.distance(0, 0, width, height);

    /**
    * @property ***REMOVED***boolean***REMOVED*** rotated - Rotated? (not yet implemented)
    * @default
    */
    this.rotated = false;

    /**
    * @property ***REMOVED***string***REMOVED*** rotationDirection - Either 'cw' or 'ccw', rotation is always 90 degrees.
    * @default 'cw'
    */
    this.rotationDirection = 'cw';

    /**
    * @property ***REMOVED***boolean***REMOVED*** trimmed - Was it trimmed when packed?
    * @default
    */
    this.trimmed = false;

    /**
    * @property ***REMOVED***number***REMOVED*** sourceSizeW - Width of the original sprite before it was trimmed.
    */
    this.sourceSizeW = width;

    /**
    * @property ***REMOVED***number***REMOVED*** sourceSizeH - Height of the original sprite before it was trimmed.
    */
    this.sourceSizeH = height;

    /**
    * @property ***REMOVED***number***REMOVED*** spriteSourceSizeX - X position of the trimmed sprite inside original sprite.
    * @default
    */
    this.spriteSourceSizeX = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** spriteSourceSizeY - Y position of the trimmed sprite inside original sprite.
    * @default
    */
    this.spriteSourceSizeY = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** spriteSourceSizeW - Width of the trimmed sprite.
    * @default
    */
    this.spriteSourceSizeW = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** spriteSourceSizeH - Height of the trimmed sprite.
    * @default
    */
    this.spriteSourceSizeH = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** right - The right of the Frame (x + width).
    */
    this.right = this.x + this.width;

    /**
    * @property ***REMOVED***number***REMOVED*** bottom - The bottom of the frame (y + height).
    */
    this.bottom = this.y + this.height;

***REMOVED***;

Phaser.Frame.prototype = ***REMOVED***

    /**
    * Adjusts of all the Frame properties based on the given width and height values.
    *
    * @method Phaser.Frame#resize
    * @param ***REMOVED***integer***REMOVED*** width - The new width of the Frame.
    * @param ***REMOVED***integer***REMOVED*** height - The new height of the Frame.
    */
    resize: function (width, height) ***REMOVED***

        this.width = width;
        this.height = height;
        this.centerX = Math.floor(width / 2);
        this.centerY = Math.floor(height / 2);
        this.distance = Phaser.Math.distance(0, 0, width, height);
        this.sourceSizeW = width;
        this.sourceSizeH = height;
        this.right = this.x + width;
        this.bottom = this.y + height;

    ***REMOVED***,

    /**
    * If the frame was trimmed when added to the Texture Atlas this records the trim and source data.
    *
    * @method Phaser.Frame#setTrim
    * @param ***REMOVED***boolean***REMOVED*** trimmed - If this frame was trimmed or not.
    * @param ***REMOVED***number***REMOVED*** actualWidth - The width of the frame before being trimmed.
    * @param ***REMOVED***number***REMOVED*** actualHeight - The height of the frame before being trimmed.
    * @param ***REMOVED***number***REMOVED*** destX - The destination X position of the trimmed frame for display.
    * @param ***REMOVED***number***REMOVED*** destY - The destination Y position of the trimmed frame for display.
    * @param ***REMOVED***number***REMOVED*** destWidth - The destination width of the trimmed frame for display.
    * @param ***REMOVED***number***REMOVED*** destHeight - The destination height of the trimmed frame for display.
    */
    setTrim: function (trimmed, actualWidth, actualHeight, destX, destY, destWidth, destHeight) ***REMOVED***

        this.trimmed = trimmed;

        if (trimmed)
        ***REMOVED***
            this.sourceSizeW = actualWidth;
            this.sourceSizeH = actualHeight;
            this.centerX = Math.floor(actualWidth / 2);
            this.centerY = Math.floor(actualHeight / 2);
            this.spriteSourceSizeX = destX;
            this.spriteSourceSizeY = destY;
            this.spriteSourceSizeW = destWidth;
            this.spriteSourceSizeH = destHeight;
        ***REMOVED***

    ***REMOVED***,

    /**
     * Clones this Frame into a new Phaser.Frame object and returns it.
     * Note that all properties are cloned, including the name, index and UUID.
     *
     * @method Phaser.Frame#clone
     * @return ***REMOVED***Phaser.Frame***REMOVED*** An exact copy of this Frame object.
     */
    clone: function () ***REMOVED***

        var output = new Phaser.Frame(this.index, this.x, this.y, this.width, this.height, this.name);

        for (var prop in this)
        ***REMOVED***
            if (this.hasOwnProperty(prop))
            ***REMOVED***
                output[prop] = this[prop];
            ***REMOVED***
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Returns a Rectangle set to the dimensions of this Frame.
    *
    * @method Phaser.Frame#getRect
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** [out] - A rectangle to copy the frame dimensions to.
    * @return ***REMOVED***Phaser.Rectangle***REMOVED*** A rectangle.
    */
    getRect: function (out) ***REMOVED***

        if (out === undefined)
        ***REMOVED***
            out = new Phaser.Rectangle(this.x, this.y, this.width, this.height);
        ***REMOVED***
        else
        ***REMOVED***
            out.setTo(this.x, this.y, this.width, this.height);
        ***REMOVED***

        return out;

    ***REMOVED***

***REMOVED***;

Phaser.Frame.prototype.constructor = Phaser.Frame;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* FrameData is a container for Frame objects, which are the internal representation of animation data in Phaser.
*
* @class Phaser.FrameData
* @constructor
*/
Phaser.FrameData = function () ***REMOVED***

    /**
    * @property ***REMOVED***Array***REMOVED*** _frames - Local array of frames.
    * @private
    */
    this._frames = [];

    /**
    * @property ***REMOVED***Array***REMOVED*** _frameNames - Local array of frame names for name to index conversions.
    * @private
    */
    this._frameNames = [];

***REMOVED***;

Phaser.FrameData.prototype = ***REMOVED***

    /**
    * Adds a new Frame to this FrameData collection. Typically called by the Animation.Parser and not directly.
    *
    * @method Phaser.FrameData#addFrame
    * @param ***REMOVED***Phaser.Frame***REMOVED*** frame - The frame to add to this FrameData set.
    * @return ***REMOVED***Phaser.Frame***REMOVED*** The frame that was just added.
    */
    addFrame: function (frame) ***REMOVED***

        frame.index = this._frames.length;

        this._frames.push(frame);

        if (frame.name !== '')
        ***REMOVED***
            this._frameNames[frame.name] = frame.index;
        ***REMOVED***

        return frame;

    ***REMOVED***,

    /**
    * Get a Frame by its numerical index.
    *
    * @method Phaser.FrameData#getFrame
    * @param ***REMOVED***number***REMOVED*** index - The index of the frame you want to get.
    * @return ***REMOVED***Phaser.Frame***REMOVED*** The frame, if found.
    */
    getFrame: function (index) ***REMOVED***

        if (index >= this._frames.length)
        ***REMOVED***
            index = 0;
        ***REMOVED***

        return this._frames[index];

    ***REMOVED***,

    /**
    * Get a Frame by its frame name.
    *
    * @method Phaser.FrameData#getFrameByName
    * @param ***REMOVED***string***REMOVED*** name - The name of the frame you want to get.
    * @return ***REMOVED***Phaser.Frame***REMOVED*** The frame, if found.
    */
    getFrameByName: function (name) ***REMOVED***

        if (typeof this._frameNames[name] === 'number')
        ***REMOVED***
            return this._frames[this._frameNames[name]];
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Check if there is a Frame with the given name.
    *
    * @method Phaser.FrameData#checkFrameName
    * @param ***REMOVED***string***REMOVED*** name - The name of the frame you want to check.
    * @return ***REMOVED***boolean***REMOVED*** True if the frame is found, otherwise false.
    */
    checkFrameName: function (name) ***REMOVED***

        if (this._frameNames[name] == null)
        ***REMOVED***
            return false;
        ***REMOVED***

        return true;

    ***REMOVED***,

    /**
     * Makes a copy of this FrameData including copies (not references) to all of the Frames it contains.
     *
     * @method Phaser.FrameData#clone
     * @return ***REMOVED***Phaser.FrameData***REMOVED*** A clone of this object, including clones of the Frame objects it contains.
     */
    clone: function () ***REMOVED***

        var output = new Phaser.FrameData();

        //  No input array, so we loop through all frames
        for (var i = 0; i < this._frames.length; i++)
        ***REMOVED***
            output._frames.push(this._frames[i].clone());
        ***REMOVED***

        for (var p in this._frameNames)
        ***REMOVED***
            if (this._frameNames.hasOwnProperty(p))
            ***REMOVED***
                output._frameNames.push(this._frameNames[p]);
            ***REMOVED***
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Returns a range of frames based on the given start and end frame indexes and returns them in an Array.
    *
    * @method Phaser.FrameData#getFrameRange
    * @param ***REMOVED***number***REMOVED*** start - The starting frame index.
    * @param ***REMOVED***number***REMOVED*** end - The ending frame index.
    * @param ***REMOVED***Array***REMOVED*** [output] - If given the results will be appended to the end of this array otherwise a new array will be created.
    * @return ***REMOVED***Array***REMOVED*** An array of Frames between the start and end index values, or an empty array if none were found.
    */
    getFrameRange: function (start, end, output) ***REMOVED***

        if (output === undefined) ***REMOVED*** output = []; ***REMOVED***

        for (var i = start; i <= end; i++)
        ***REMOVED***
            output.push(this._frames[i]);
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Returns all of the Frames in this FrameData set where the frame index is found in the input array.
    * The frames are returned in the output array, or if none is provided in a new Array object.
    *
    * @method Phaser.FrameData#getFrames
    * @param ***REMOVED***Array***REMOVED*** [frames] - An Array containing the indexes of the frames to retrieve. If the array is empty or undefined then all frames in the FrameData are returned.
    * @param ***REMOVED***boolean***REMOVED*** [useNumericIndex=true] - Are the given frames using numeric indexes (default) or strings? (false)
    * @param ***REMOVED***Array***REMOVED*** [output] - If given the results will be appended to the end of this array otherwise a new array will be created.
    * @return ***REMOVED***Array***REMOVED*** An array of all Frames in this FrameData set matching the given names or IDs.
    */
    getFrames: function (frames, useNumericIndex, output) ***REMOVED***

        if (useNumericIndex === undefined) ***REMOVED*** useNumericIndex = true; ***REMOVED***
        if (output === undefined) ***REMOVED*** output = []; ***REMOVED***

        if (frames === undefined || frames.length === 0)
        ***REMOVED***
            //  No input array, so we loop through all frames
            for (var i = 0; i < this._frames.length; i++)
            ***REMOVED***
                //  We only need the indexes
                output.push(this._frames[i]);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  Input array given, loop through that instead
            for (var i = 0; i < frames.length; i++)
            ***REMOVED***
                //  Does the input array contain names or indexes?
                if (useNumericIndex)
                ***REMOVED***
                    //  The actual frame
                    output.push(this.getFrame(frames[i]));
                ***REMOVED***
                else
                ***REMOVED***
                    //  The actual frame
                    output.push(this.getFrameByName(frames[i]));
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Returns all of the Frame indexes in this FrameData set.
    * The frames indexes are returned in the output array, or if none is provided in a new Array object.
    *
    * @method Phaser.FrameData#getFrameIndexes
    * @param ***REMOVED***Array***REMOVED*** [frames] - An Array containing the indexes of the frames to retrieve. If undefined or the array is empty then all frames in the FrameData are returned.
    * @param ***REMOVED***boolean***REMOVED*** [useNumericIndex=true] - Are the given frames using numeric indexes (default) or strings? (false)
    * @param ***REMOVED***Array***REMOVED*** [output] - If given the results will be appended to the end of this array otherwise a new array will be created.
    * @return ***REMOVED***Array***REMOVED*** An array of all Frame indexes matching the given names or IDs.
    */
    getFrameIndexes: function (frames, useNumericIndex, output) ***REMOVED***

        if (useNumericIndex === undefined) ***REMOVED*** useNumericIndex = true; ***REMOVED***
        if (output === undefined) ***REMOVED*** output = []; ***REMOVED***

        if (frames === undefined || frames.length === 0)
        ***REMOVED***
            //  No frames array, so we loop through all frames
            for (var i = 0; i < this._frames.length; i++)
            ***REMOVED***
                output.push(this._frames[i].index);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  Input array given, loop through that instead
            for (var i = 0; i < frames.length; i++)
            ***REMOVED***
                //  Does the frames array contain names or indexes?
                if (useNumericIndex && this._frames[frames[i]])
                ***REMOVED***
                    output.push(this._frames[frames[i]].index);
                ***REMOVED***
                else
                ***REMOVED***
                    if (this.getFrameByName(frames[i]))
                    ***REMOVED***
                        output.push(this.getFrameByName(frames[i]).index);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Destroys this FrameData collection by nulling the _frames and _frameNames arrays.
    *
    * @method Phaser.FrameData#destroy
    */
    destroy: function () ***REMOVED***

        this._frames = null;
        this._frameNames = null;

    ***REMOVED***

***REMOVED***;

Phaser.FrameData.prototype.constructor = Phaser.FrameData;

/**
* @name Phaser.FrameData#total
* @property ***REMOVED***number***REMOVED*** total - The total number of frames in this FrameData set.
* @readonly
*/
Object.defineProperty(Phaser.FrameData.prototype, "total", ***REMOVED***

    get: function () ***REMOVED***
        return this._frames.length;
    ***REMOVED***

***REMOVED***);

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Responsible for parsing sprite sheet and JSON data into the internal FrameData format that Phaser uses for animations.
*
* @class Phaser.AnimationParser
* @static
*/
Phaser.AnimationParser = ***REMOVED***

    /**
    * Parse a Sprite Sheet and extract the animation frame data from it.
    *
    * @method Phaser.AnimationParser.spriteSheet
    * @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    * @param ***REMOVED***string|Image***REMOVED*** key - The Game.Cache asset key of the Sprite Sheet image or an actual HTML Image element.
    * @param ***REMOVED***number***REMOVED*** frameWidth - The fixed width of each frame of the animation.
    * @param ***REMOVED***number***REMOVED*** frameHeight - The fixed height of each frame of the animation.
    * @param ***REMOVED***number***REMOVED*** [frameMax=-1] - The total number of animation frames to extract from the Sprite Sheet. The default value of -1 means "extract all frames".
    * @param ***REMOVED***number***REMOVED*** [margin=0] - If the frames have been drawn with a margin, specify the amount here.
    * @param ***REMOVED***number***REMOVED*** [spacing=0] - If the frames have been drawn with spacing between them, specify the amount here.
    * @return ***REMOVED***Phaser.FrameData***REMOVED*** A FrameData object containing the parsed frames.
    */
    spriteSheet: function (game, key, frameWidth, frameHeight, frameMax, margin, spacing) ***REMOVED***

        var img = key;

        if (typeof key === 'string')
        ***REMOVED***
            img = game.cache.getImage(key);
        ***REMOVED***

        if (img === null)
        ***REMOVED***
            return null;
        ***REMOVED***

        var width = img.width;
        var height = img.height;

        if (frameWidth <= 0)
        ***REMOVED***
            frameWidth = Math.floor(-width / Math.min(-1, frameWidth));
        ***REMOVED***

        if (frameHeight <= 0)
        ***REMOVED***
            frameHeight = Math.floor(-height / Math.min(-1, frameHeight));
        ***REMOVED***

        var row = Math.floor((width - margin) / (frameWidth + spacing));
        var column = Math.floor((height - margin) / (frameHeight + spacing));
        var total = row * column;

        if (frameMax !== -1)
        ***REMOVED***
            total = frameMax;
        ***REMOVED***

        //  Zero or smaller than frame sizes?
        if (width === 0 || height === 0 || width < frameWidth || height < frameHeight || total === 0)
        ***REMOVED***
            console.warn("Phaser.AnimationParser.spriteSheet: '" + key + "'s width/height zero or width/height < given frameWidth/frameHeight");
            return null;
        ***REMOVED***

        //  Let's create some frames then
        var data = new Phaser.FrameData();
        var x = margin;
        var y = margin;

        for (var i = 0; i < total; i++)
        ***REMOVED***
            data.addFrame(new Phaser.Frame(i, x, y, frameWidth, frameHeight, ''));

            x += frameWidth + spacing;

            if (x + frameWidth > width)
            ***REMOVED***
                x = margin;
                y += frameHeight + spacing;
            ***REMOVED***
        ***REMOVED***

        return data;

    ***REMOVED***,

    /**
    * Parse the JSON data and extract the animation frame data from it.
    *
    * @method Phaser.AnimationParser.JSONData
    * @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    * @param ***REMOVED***object***REMOVED*** json - The JSON data from the Texture Atlas. Must be in Array format.
    * @return ***REMOVED***Phaser.FrameData***REMOVED*** A FrameData object containing the parsed frames.
    */
    JSONData: function (game, json) ***REMOVED***

        //  Malformed?
        if (!json['frames'])
        ***REMOVED***
            console.warn("Phaser.AnimationParser.JSONData: Invalid Texture Atlas JSON given, missing 'frames' array");
            console.log(json);
            return;
        ***REMOVED***

        //  Let's create some frames then
        var data = new Phaser.FrameData();

        //  By this stage frames is a fully parsed array
        var frames = json['frames'];
        var newFrame;

        for (var i = 0; i < frames.length; i++)
        ***REMOVED***
            newFrame = data.addFrame(new Phaser.Frame(
                i,
                frames[i].frame.x,
                frames[i].frame.y,
                frames[i].frame.w,
                frames[i].frame.h,
                frames[i].filename
            ));

            if (frames[i].trimmed)
            ***REMOVED***
                newFrame.setTrim(
                    frames[i].trimmed,
                    frames[i].sourceSize.w,
                    frames[i].sourceSize.h,
                    frames[i].spriteSourceSize.x,
                    frames[i].spriteSourceSize.y,
                    frames[i].spriteSourceSize.w,
                    frames[i].spriteSourceSize.h
                );
            ***REMOVED***
        ***REMOVED***

        return data;

    ***REMOVED***,

    /**
    * Parse the JSON data and extract the animation frame data from it.
    *
    * @method Phaser.AnimationParser.JSONDataPyxel
    * @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    * @param ***REMOVED***object***REMOVED*** json - The JSON data from the Texture Atlas. Must be in Pyxel JSON format.
    * @return ***REMOVED***Phaser.FrameData***REMOVED*** A FrameData object containing the parsed frames.
    */
    JSONDataPyxel: function (game, json) ***REMOVED***

        //  Malformed? There are a few keys to check here.
        var signature = ['layers', 'tilewidth','tileheight','tileswide', 'tileshigh'];

        signature.forEach( function(key) ***REMOVED***
            if (!json[key])
            ***REMOVED***
                console.warn('Phaser.AnimationParser.JSONDataPyxel: Invalid Pyxel Tilemap JSON given, missing "' + key + '" key.');
                console.log(json);
                return;
            ***REMOVED***
        ***REMOVED***);

        // For this purpose, I only care about parsing tilemaps with a single layer.
        if (json['layers'].length !== 1)
        ***REMOVED***
            console.warn('Phaser.AnimationParser.JSONDataPyxel: Too many layers, this parser only supports flat Tilemaps.');
            console.log(json);
            return;
        ***REMOVED***

        var data = new Phaser.FrameData();

        var tileheight = json['tileheight'];
        var tilewidth = json['tilewidth'];

        var frames = json['layers'][0]['tiles'];
        var newFrame;

        for (var i = 0; i < frames.length; i++)
        ***REMOVED***
            newFrame = data.addFrame(new Phaser.Frame(
                i,
                frames[i].x,
                frames[i].y,
                tilewidth,
                tileheight,
                "frame_" + i  // No names are included in pyxel tilemap data.
            ));

            // No trim data is included.
            newFrame.setTrim(false);
        ***REMOVED***

        return data;

    ***REMOVED***,

    /**
    * Parse the JSON data and extract the animation frame data from it.
    *
    * @method Phaser.AnimationParser.JSONDataHash
    * @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    * @param ***REMOVED***object***REMOVED*** json - The JSON data from the Texture Atlas. Must be in JSON Hash format.
    * @return ***REMOVED***Phaser.FrameData***REMOVED*** A FrameData object containing the parsed frames.
    */
    JSONDataHash: function (game, json) ***REMOVED***

        //  Malformed?
        if (!json['frames'])
        ***REMOVED***
            console.warn("Phaser.AnimationParser.JSONDataHash: Invalid Texture Atlas JSON given, missing 'frames' object");
            console.log(json);
            return;
        ***REMOVED***

        //  Let's create some frames then
        var data = new Phaser.FrameData();

        //  By this stage frames is a fully parsed array
        var frames = json['frames'];
        var newFrame;
        var i = 0;

        for (var key in frames)
        ***REMOVED***
            newFrame = data.addFrame(new Phaser.Frame(
                i,
                frames[key].frame.x,
                frames[key].frame.y,
                frames[key].frame.w,
                frames[key].frame.h,
                key
            ));

            if (frames[key].trimmed)
            ***REMOVED***
                newFrame.setTrim(
                    frames[key].trimmed,
                    frames[key].sourceSize.w,
                    frames[key].sourceSize.h,
                    frames[key].spriteSourceSize.x,
                    frames[key].spriteSourceSize.y,
                    frames[key].spriteSourceSize.w,
                    frames[key].spriteSourceSize.h
                );
            ***REMOVED***

            i++;
        ***REMOVED***

        return data;

    ***REMOVED***,

    /**
    * Parse the XML data and extract the animation frame data from it.
    *
    * @method Phaser.AnimationParser.XMLData
    * @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    * @param ***REMOVED***object***REMOVED*** xml - The XML data from the Texture Atlas. Must be in Starling XML format.
    * @return ***REMOVED***Phaser.FrameData***REMOVED*** A FrameData object containing the parsed frames.
    */
    XMLData: function (game, xml) ***REMOVED***

        //  Malformed?
        if (!xml.getElementsByTagName('TextureAtlas'))
        ***REMOVED***
            console.warn("Phaser.AnimationParser.XMLData: Invalid Texture Atlas XML given, missing <TextureAtlas> tag");
            return;
        ***REMOVED***

        //  Let's create some frames then
        var data = new Phaser.FrameData();
        var frames = xml.getElementsByTagName('SubTexture');
        var newFrame;

        var name;
        var frame;
        var x;
        var y;
        var width;
        var height;
        var frameX;
        var frameY;
        var frameWidth;
        var frameHeight;

        for (var i = 0; i < frames.length; i++)
        ***REMOVED***
            frame = frames[i].attributes;

            name = frame.name.value;
            x = parseInt(frame.x.value, 10);
            y = parseInt(frame.y.value, 10);
            width = parseInt(frame.width.value, 10);
            height = parseInt(frame.height.value, 10);

            frameX = null;
            frameY = null;

            if (frame.frameX)
            ***REMOVED***
                frameX = Math.abs(parseInt(frame.frameX.value, 10));
                frameY = Math.abs(parseInt(frame.frameY.value, 10));
                frameWidth = parseInt(frame.frameWidth.value, 10);
                frameHeight = parseInt(frame.frameHeight.value, 10);
            ***REMOVED***

            newFrame = data.addFrame(new Phaser.Frame(i, x, y, width, height, name));

            //  Trimmed?
            if (frameX !== null || frameY !== null)
            ***REMOVED***
                newFrame.setTrim(true, width, height, frameX, frameY, frameWidth, frameHeight);
            ***REMOVED***
        ***REMOVED***

        return data;

    ***REMOVED***

***REMOVED***;
