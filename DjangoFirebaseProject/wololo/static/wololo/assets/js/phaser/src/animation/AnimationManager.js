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
