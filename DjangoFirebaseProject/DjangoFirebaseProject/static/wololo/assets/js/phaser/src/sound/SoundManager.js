/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Sound Manager is responsible for playing back audio via either the Legacy HTML Audio tag or via Web Audio if the browser supports it.
* Note: On Firefox 25+ on Linux if you have media.gstreamer disabled in about:config then it cannot play back mp3 or m4a files.
* The audio file type and the encoding of those files are extremely important. Not all browsers can play all audio formats.
* There is a good guide to what's supported here: http://hpr.dogphilosophy.net/test/
*
* If you are reloading a Phaser Game on a page that never properly refreshes (such as in an AngularJS project) then you will quickly run out
* of AudioContext nodes. If this is the case create a global var called PhaserGlobal on the window object before creating the game. The active
* AudioContext will then be saved to window.PhaserGlobal.audioContext when the Phaser game is destroyed, and re-used when it starts again.
*
* Mobile warning: There are some mobile devices (certain iPad 2 and iPad Mini revisions) that cannot play 48000 Hz audio.
* When they try to play the audio becomes extremely distorted and buzzes, eventually crashing the sound system.
* The solution is to use a lower encoding rate such as 44100 Hz. Sometimes the audio context will
* be created with a sampleRate of 48000. If this happens and audio distorts you should re-create the context.
*
* @class Phaser.SoundManager
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Reference to the current game instance.
*/
Phaser.SoundManager = function (game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onSoundDecode - The event dispatched when a sound decodes (typically only for mp3 files)
    */
    this.onSoundDecode = new Phaser.Signal();

    /**
    * This signal is dispatched whenever the global volume changes. The new volume is passed as the only parameter to your callback.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onVolumeChange
    */
    this.onVolumeChange = new Phaser.Signal();

    /**
    * This signal is dispatched when the SoundManager is globally muted, either directly via game code or as a result of the game pausing.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onMute
    */
    this.onMute = new Phaser.Signal();

    /**
    * This signal is dispatched when the SoundManager is globally un-muted, either directly via game code or as a result of the game resuming from a pause.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onUnMute
    */
    this.onUnMute = new Phaser.Signal();

    /**
    * @property ***REMOVED***AudioContext***REMOVED*** context - The AudioContext being used for playback.
    * @default
    */
    this.context = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** usingWebAudio - True the SoundManager and device are both using Web Audio.
    * @readonly
    */
    this.usingWebAudio = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** usingAudioTag - True the SoundManager and device are both using the Audio tag instead of Web Audio.
    * @readonly
    */
    this.usingAudioTag = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** noAudio - True if audio been disabled via the PhaserGlobal (useful if you need to use a 3rd party audio library) or the device doesn't support any audio.
    * @default
    */
    this.noAudio = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** connectToMaster - Used in conjunction with Sound.externalNode this allows you to stop a Sound node being connected to the SoundManager master gain node.
    * @default
    */
    this.connectToMaster = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** touchLocked - true if the audio system is currently locked awaiting a touch event.
    * @default
    */
    this.touchLocked = false;

    /**
    * @property ***REMOVED***number***REMOVED*** channels - The number of audio channels to use in playback.
    * @default
    */
    this.channels = 32;

    /**
    * Set to true to have all sound muted when the Phaser game pauses (such as on loss of focus),
    * or set to false to keep audio playing, regardless of the game pause state. You may need to
    * do this should you wish to control audio muting via external DOM buttons or similar.
    * @property ***REMOVED***boolean***REMOVED*** muteOnPause 
    * @default
    */
    this.muteOnPause = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _codeMuted - Internal mute tracking var.
    * @private
    * @default
    */
    this._codeMuted = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _muted - Internal mute tracking var.
    * @private
    * @default
    */
    this._muted = false;

    /**
    * @property ***REMOVED***AudioContext***REMOVED*** _unlockSource - Internal unlock tracking var.
    * @private
    * @default
    */
    this._unlockSource = null;

    /**
    * @property ***REMOVED***number***REMOVED*** _volume - The global audio volume. A value between 0 (silence) and 1 (full volume).
    * @private
    * @default
    */
    this._volume = 1;

    /**
    * @property ***REMOVED***array***REMOVED*** _sounds - An array containing all the sounds
    * @private
    */
    this._sounds = [];

    /**
    * @property ***REMOVED***Phaser.ArraySet***REMOVED*** _watchList - An array set containing all the sounds being monitored for decoding status.
    * @private
    */
    this._watchList = new Phaser.ArraySet();

    /**
    * @property ***REMOVED***boolean***REMOVED*** _watching - Is the SoundManager monitoring the watchList?
    * @private
    */
    this._watching = false;

    /**
    * @property ***REMOVED***function***REMOVED*** _watchCallback - The callback to invoke once the watchlist is clear.
    * @private
    */
    this._watchCallback = null;

    /**
    * @property ***REMOVED***object***REMOVED*** _watchContext - The context in which to call the watchlist callback.
    * @private
    */
    this._watchContext = null;

***REMOVED***;

Phaser.SoundManager.prototype = ***REMOVED***

    /**
    * Initialises the sound manager.
    * @method Phaser.SoundManager#boot
    * @protected
    */
    boot: function () ***REMOVED***

        if (this.game.device.iOS && this.game.device.webAudio === false)
        ***REMOVED***
            this.channels = 1;
        ***REMOVED***

        //  PhaserGlobal overrides
        if (window['PhaserGlobal'])
        ***REMOVED***
            //  Check to see if all audio playback is disabled (i.e. handled by a 3rd party class)
            if (window['PhaserGlobal'].disableAudio === true)
            ***REMOVED***
                this.noAudio = true;
                this.touchLocked = false;
                return;
            ***REMOVED***

            //  Check if the Web Audio API is disabled (for testing Audio Tag playback during development)
            if (window['PhaserGlobal'].disableWebAudio === true)
            ***REMOVED***
                this.usingAudioTag = true;
                this.touchLocked = false;
                return;
            ***REMOVED***
        ***REMOVED***

        if (window['PhaserGlobal'] && window['PhaserGlobal'].audioContext)
        ***REMOVED***
            this.context = window['PhaserGlobal'].audioContext;
        ***REMOVED***
        else
        ***REMOVED***
            if (!!window['AudioContext'])
            ***REMOVED***
                try ***REMOVED***
                    this.context = new window['AudioContext']();
                ***REMOVED*** catch (error) ***REMOVED***
                    this.context = null;
                    this.usingWebAudio = false;
                    this.touchLocked = false;
                ***REMOVED***
            ***REMOVED***
            else if (!!window['webkitAudioContext'])
            ***REMOVED***
                try ***REMOVED***
                    this.context = new window['webkitAudioContext']();
                ***REMOVED*** catch (error) ***REMOVED***
                    this.context = null;
                    this.usingWebAudio = false;
                    this.touchLocked = false;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        if (this.context === null)
        ***REMOVED***
            //  No Web Audio support - how about legacy Audio?
            if (window['Audio'] === undefined)
            ***REMOVED***
                this.noAudio = true;
                return;
            ***REMOVED***
            else
            ***REMOVED***
                this.usingAudioTag = true;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            this.usingWebAudio = true;

            if (this.context.createGain === undefined)
            ***REMOVED***
                this.masterGain = this.context.createGainNode();
            ***REMOVED***
            else
            ***REMOVED***
                this.masterGain = this.context.createGain();
            ***REMOVED***

            this.masterGain.gain.value = 1;
            this.masterGain.connect(this.context.destination);
        ***REMOVED***

        if (!this.noAudio)
        ***REMOVED***
            //  On mobile we need a native touch event before we can play anything, so capture it here
            if (!this.game.device.cocoonJS && this.game.device.iOS || (window['PhaserGlobal'] && window['PhaserGlobal'].fakeiOSTouchLock))
            ***REMOVED***
                this.setTouchLock();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets the Input Manager touch callback to be SoundManager.unlock.
    * Required for iOS audio device unlocking. Mostly just used internally.
    *
    * @method Phaser.SoundManager#setTouchLock
    */
    setTouchLock: function () ***REMOVED***

        if (this.noAudio || (window['PhaserGlobal'] && window['PhaserGlobal'].disableAudio === true))
        ***REMOVED***
            return;
        ***REMOVED***

        if (this.game.device.iOSVersion > 8)
        ***REMOVED***
            this.game.input.touch.addTouchLockCallback(this.unlock, this, true);
        ***REMOVED***
        else
        ***REMOVED***
            this.game.input.touch.addTouchLockCallback(this.unlock, this);
        ***REMOVED***

        this.touchLocked = true;

    ***REMOVED***,

    /**
    * Enables the audio, usually after the first touch.
    *
    * @method Phaser.SoundManager#unlock
    * @return ***REMOVED***boolean***REMOVED*** True if the callback should be removed, otherwise false.
    */
    unlock: function () ***REMOVED***

        if (this.noAudio || !this.touchLocked || this._unlockSource !== null)
        ***REMOVED***
            return true;
        ***REMOVED***

        //  Global override (mostly for Audio Tag testing)
        if (this.usingAudioTag)
        ***REMOVED***
            this.touchLocked = false;
            this._unlockSource = null;
        ***REMOVED***
        else if (this.usingWebAudio)
        ***REMOVED***
            // Create empty buffer and play it
            // The SoundManager.update loop captures the state of it and then resets touchLocked to false

            var buffer = this.context.createBuffer(1, 1, 22050);
            this._unlockSource = this.context.createBufferSource();
            this._unlockSource.buffer = buffer;
            this._unlockSource.connect(this.context.destination);

            if (this._unlockSource.start === undefined)
            ***REMOVED***
                this._unlockSource.noteOn(0);
            ***REMOVED***
            else
            ***REMOVED***
                this._unlockSource.start(0);
            ***REMOVED***
        ***REMOVED***

        //  We can remove the event because we've done what we needed (started the unlock sound playing)
        return true;

    ***REMOVED***,

    /**
    * Stops all the sounds in the game.
    *
    * @method Phaser.SoundManager#stopAll
    */
    stopAll: function () ***REMOVED***

        if (this.noAudio)
        ***REMOVED***
            return;
        ***REMOVED***

        for (var i = 0; i < this._sounds.length; i++)
        ***REMOVED***
            if (this._sounds[i])
            ***REMOVED***
                this._sounds[i].stop();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Pauses all the sounds in the game.
    *
    * @method Phaser.SoundManager#pauseAll
    */
    pauseAll: function () ***REMOVED***

        if (this.noAudio)
        ***REMOVED***
            return;
        ***REMOVED***

        for (var i = 0; i < this._sounds.length; i++)
        ***REMOVED***
            if (this._sounds[i])
            ***REMOVED***
                this._sounds[i].pause();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Resumes every sound in the game.
    *
    * @method Phaser.SoundManager#resumeAll
    */
    resumeAll: function () ***REMOVED***

        if (this.noAudio)
        ***REMOVED***
            return;
        ***REMOVED***

        for (var i = 0; i < this._sounds.length; i++)
        ***REMOVED***
            if (this._sounds[i])
            ***REMOVED***
                this._sounds[i].resume();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Decode a sound by its asset key.
    *
    * @method Phaser.SoundManager#decode
    * @param ***REMOVED***string***REMOVED*** key - Assets key of the sound to be decoded.
    * @param ***REMOVED***Phaser.Sound***REMOVED*** [sound] - Its buffer will be set to decoded data.
    */
    decode: function (key, sound) ***REMOVED***

        sound = sound || null;

        var soundData = this.game.cache.getSoundData(key);

        if (soundData)
        ***REMOVED***
            if (this.game.cache.isSoundDecoded(key) === false)
            ***REMOVED***
                this.game.cache.updateSound(key, 'isDecoding', true);

                var _this = this;

                try ***REMOVED***
                    this.context.decodeAudioData(soundData, function (buffer) ***REMOVED***

                        if (buffer)
                        ***REMOVED***
                            _this.game.cache.decodedSound(key, buffer);
                            _this.onSoundDecode.dispatch(key, sound);
                        ***REMOVED***
                    ***REMOVED***);
                ***REMOVED***
                catch (e) ***REMOVED******REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
     * This method allows you to give the SoundManager a list of Sound files, or keys, and a callback.
     * Once all of the Sound files have finished decoding the callback will be invoked.
     * The amount of time spent decoding depends on the codec used and file size.
     * If all of the files given have already decoded the callback is triggered immediately.
     *
     * @method Phaser.SoundManager#setDecodedCallback
     * @param ***REMOVED***string|array***REMOVED*** files - An array containing either Phaser.Sound objects or their key strings as found in the Phaser.Cache.
     * @param ***REMOVED***Function***REMOVED*** callback - The callback which will be invoked once all files have finished decoding.
     * @param ***REMOVED***Object***REMOVED*** callbackContext - The context in which the callback will run.
     */
    setDecodedCallback: function (files, callback, callbackContext) ***REMOVED***

        if (typeof files === 'string')
        ***REMOVED***
            files = [ files ];
        ***REMOVED***

        this._watchList.reset();

        for (var i = 0; i < files.length; i++)
        ***REMOVED***
            if (files[i] instanceof Phaser.Sound)
            ***REMOVED***
                if (!this.game.cache.isSoundDecoded(files[i].key))
                ***REMOVED***
                    this._watchList.add(files[i].key);
                ***REMOVED***
            ***REMOVED***
            else if (!this.game.cache.isSoundDecoded(files[i]))
            ***REMOVED***
                this._watchList.add(files[i]);
            ***REMOVED***
        ***REMOVED***

        //  All decoded already?
        if (this._watchList.total === 0)
        ***REMOVED***
            this._watching = false;
            callback.call(callbackContext);
        ***REMOVED***
        else
        ***REMOVED***
            this._watching = true;
            this._watchCallback = callback;
            this._watchContext = callbackContext;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Updates every sound in the game, checks for audio unlock on mobile and monitors the decoding watch list.
    *
    * @method Phaser.SoundManager#update
    * @protected
    */
    update: function () ***REMOVED***

        if (this.noAudio)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this.touchLocked && this._unlockSource !== null && (this._unlockSource.playbackState === this._unlockSource.PLAYING_STATE || this._unlockSource.playbackState === this._unlockSource.FINISHED_STATE))
        ***REMOVED***
            this.touchLocked = false;
            this._unlockSource = null;
        ***REMOVED***

        for (var i = 0; i < this._sounds.length; i++)
        ***REMOVED***
            this._sounds[i].update();
        ***REMOVED***

        if (this._watching)
        ***REMOVED***
            var key = this._watchList.first;

            while (key)
            ***REMOVED***
                if (this.game.cache.isSoundDecoded(key))
                ***REMOVED***
                    this._watchList.remove(key);
                ***REMOVED***

                key = this._watchList.next;
            ***REMOVED***

            if (this._watchList.total === 0)
            ***REMOVED***
                this._watching = false;
                this._watchCallback.call(this._watchContext);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Adds a new Sound into the SoundManager.
    *
    * @method Phaser.SoundManager#add
    * @param ***REMOVED***string***REMOVED*** key - Asset key for the sound.
    * @param ***REMOVED***number***REMOVED*** [volume=1] - Default value for the volume.
    * @param ***REMOVED***boolean***REMOVED*** [loop=false] - Whether or not the sound will loop.
    * @param ***REMOVED***boolean***REMOVED*** [connect=true] - Controls if the created Sound object will connect to the master gainNode of the SoundManager when running under WebAudio.
    * @return ***REMOVED***Phaser.Sound***REMOVED*** The new sound instance.
    */
    add: function (key, volume, loop, connect) ***REMOVED***

        if (volume === undefined) ***REMOVED*** volume = 1; ***REMOVED***
        if (loop === undefined) ***REMOVED*** loop = false; ***REMOVED***
        if (connect === undefined) ***REMOVED*** connect = this.connectToMaster; ***REMOVED***

        var sound = new Phaser.Sound(this.game, key, volume, loop, connect);

        this._sounds.push(sound);

        return sound;

    ***REMOVED***,

    /**
     * Adds a new AudioSprite into the SoundManager.
     *
     * @method Phaser.SoundManager#addSprite
     * @param ***REMOVED***string***REMOVED*** key - Asset key for the sound.
     * @return ***REMOVED***Phaser.AudioSprite***REMOVED*** The new AudioSprite instance.
     */
    addSprite: function(key) ***REMOVED***

        var audioSprite = new Phaser.AudioSprite(this.game, key);

        return audioSprite;

    ***REMOVED***,

    /**
    * Removes a Sound from the SoundManager. The removed Sound is destroyed before removal.
    *
    * @method Phaser.SoundManager#remove
    * @param ***REMOVED***Phaser.Sound***REMOVED*** sound - The sound object to remove.
    * @return ***REMOVED***boolean***REMOVED*** True if the sound was removed successfully, otherwise false.
    */
    remove: function (sound) ***REMOVED***

        var i = this._sounds.length;

        while (i--)
        ***REMOVED***
            if (this._sounds[i] === sound)
            ***REMOVED***
                this._sounds[i].destroy(false);
                this._sounds.splice(i, 1);
                return true;
            ***REMOVED***
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Removes all Sounds from the SoundManager that have an asset key matching the given value.
    * The removed Sounds are destroyed before removal.
    *
    * @method Phaser.SoundManager#removeByKey
    * @param ***REMOVED***string***REMOVED*** key - The key to match when removing sound objects.
    * @return ***REMOVED***number***REMOVED*** The number of matching sound objects that were removed.
    */
    removeByKey: function (key) ***REMOVED***

        var i = this._sounds.length;
        var removed = 0;

        while (i--)
        ***REMOVED***
            if (this._sounds[i].key === key)
            ***REMOVED***
                this._sounds[i].destroy(false);
                this._sounds.splice(i, 1);
                removed++;
            ***REMOVED***
        ***REMOVED***

        return removed;

    ***REMOVED***,

    /**
    * Adds a new Sound into the SoundManager and starts it playing.
    *
    * @method Phaser.SoundManager#play
    * @param ***REMOVED***string***REMOVED*** key - Asset key for the sound.
    * @param ***REMOVED***number***REMOVED*** [volume=1] - Default value for the volume.
    * @param ***REMOVED***boolean***REMOVED*** [loop=false] - Whether or not the sound will loop.
    * @return ***REMOVED***Phaser.Sound***REMOVED*** The new sound instance.
    */
    play: function (key, volume, loop) ***REMOVED***

        if (this.noAudio)
        ***REMOVED***
            return;
        ***REMOVED***

        var sound = this.add(key, volume, loop);

        sound.play();

        return sound;

    ***REMOVED***,

    /**
    * Internal mute handler called automatically by the SoundManager.mute setter.
    *
    * @method Phaser.SoundManager#setMute
    * @private
    */
    setMute: function () ***REMOVED***

        if (this._muted)
        ***REMOVED***
            return;
        ***REMOVED***

        this._muted = true;

        if (this.usingWebAudio)
        ***REMOVED***
            this._muteVolume = this.masterGain.gain.value;
            this.masterGain.gain.value = 0;
        ***REMOVED***

        //  Loop through sounds
        for (var i = 0; i < this._sounds.length; i++)
        ***REMOVED***
            if (this._sounds[i].usingAudioTag)
            ***REMOVED***
                this._sounds[i].mute = true;
            ***REMOVED***
        ***REMOVED***

        this.onMute.dispatch();

    ***REMOVED***,

    /**
    * Internal mute handler called automatically by the SoundManager.mute setter.
    *
    * @method Phaser.SoundManager#unsetMute
    * @private
    */
    unsetMute: function () ***REMOVED***

        if (!this._muted || this._codeMuted)
        ***REMOVED***
            return;
        ***REMOVED***

        this._muted = false;

        if (this.usingWebAudio)
        ***REMOVED***
            this.masterGain.gain.value = this._muteVolume;
        ***REMOVED***

        //  Loop through sounds
        for (var i = 0; i < this._sounds.length; i++)
        ***REMOVED***
            if (this._sounds[i].usingAudioTag)
            ***REMOVED***
                this._sounds[i].mute = false;
            ***REMOVED***
        ***REMOVED***

        this.onUnMute.dispatch();

    ***REMOVED***,

    /**
    * Stops all the sounds in the game, then destroys them and finally clears up any callbacks.
    *
    * @method Phaser.SoundManager#destroy
    */
    destroy: function () ***REMOVED***

        this.stopAll();

        for (var i = 0; i < this._sounds.length; i++)
        ***REMOVED***
            if (this._sounds[i])
            ***REMOVED***
                this._sounds[i].destroy();
            ***REMOVED***
        ***REMOVED***

        this._sounds = [];

        this.onSoundDecode.dispose();

        if (this.context)
        ***REMOVED***
            if (window['PhaserGlobal'])
            ***REMOVED***
                //  Store this in the PhaserGlobal window var, if set, to allow for re-use if the game is created again without the page refreshing
                window['PhaserGlobal'].audioContext = this.context;
            ***REMOVED***
            else
            ***REMOVED***
                if (this.context.close)
                ***REMOVED***
                    this.context.close();
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

Phaser.SoundManager.prototype.constructor = Phaser.SoundManager;

/**
* @name Phaser.SoundManager#mute
* @property ***REMOVED***boolean***REMOVED*** mute - Gets or sets the muted state of the SoundManager. This effects all sounds in the game.
*/
Object.defineProperty(Phaser.SoundManager.prototype, "mute", ***REMOVED***

    get: function () ***REMOVED***

        return this._muted;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        value = value || false;

        if (value)
        ***REMOVED***
            if (this._muted)
            ***REMOVED***
                return;
            ***REMOVED***

            this._codeMuted = true;
            this.setMute();
        ***REMOVED***
        else
        ***REMOVED***
            if (!this._muted)
            ***REMOVED***
                return;
            ***REMOVED***

            this._codeMuted = false;
            this.unsetMute();
        ***REMOVED***
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.SoundManager#volume
* @property ***REMOVED***number***REMOVED*** volume - Gets or sets the global volume of the SoundManager, a value between 0 and 1. The value given is clamped to the range 0 to 1.
*/
Object.defineProperty(Phaser.SoundManager.prototype, "volume", ***REMOVED***

    get: function () ***REMOVED***

        return this._volume;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value < 0)
        ***REMOVED***
            value = 0;
        ***REMOVED***
        else if (value > 1)
        ***REMOVED***
            value = 1;
        ***REMOVED***

        if (this._volume !== value)
        ***REMOVED***
            this._volume = value;

            if (this.usingWebAudio)
            ***REMOVED***
                this.masterGain.gain.value = value;
            ***REMOVED***
            else
            ***REMOVED***
                //  Loop through the sound cache and change the volume of all html audio tags
                for (var i = 0; i < this._sounds.length; i++)
                ***REMOVED***
                    if (this._sounds[i].usingAudioTag)
                    ***REMOVED***
                        this._sounds[i].updateGlobalVolume(value);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***

            this.onVolumeChange.dispatch(value);
        ***REMOVED***

    ***REMOVED***

***REMOVED***);
