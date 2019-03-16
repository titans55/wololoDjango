/**
 * @author       Jeremy Dowell <jeremy@codevinsky.com>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2016 Photon Storm Ltd.
 * @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
 */

/**
 * Audio Sprites are a combination of audio files and a JSON configuration.
 * The JSON follows the format of that created by https://github.com/tonistiigi/audiosprite
 *
 * @class Phaser.AudioSprite
 * @constructor
 * @param ***REMOVED***Phaser.Game***REMOVED*** game - Reference to the current game instance.
 * @param ***REMOVED***string***REMOVED*** key - Asset key for the sound.
 */
Phaser.AudioSprite = function (game, key) ***REMOVED***

    /**
    * A reference to the currently running Game.
    * @property ***REMOVED***Phaser.Game***REMOVED*** game
    */
    this.game = game;

    /**
     * Asset key for the Audio Sprite.
     * @property ***REMOVED***string***REMOVED*** key
     */
    this.key = key;

    /**
     * JSON audio atlas object.
     * @property ***REMOVED***object***REMOVED*** config
     */
    this.config = this.game.cache.getJSON(key + '-audioatlas');

    /**
     * If a sound is set to auto play, this holds the marker key of it.
     * @property ***REMOVED***string***REMOVED*** autoplayKey
     */
    this.autoplayKey = null;

    /**
     * Is a sound set to autoplay or not?
     * @property ***REMOVED***boolean***REMOVED*** autoplay
     * @default
     */
    this.autoplay = false;

    /**
     * An object containing the Phaser.Sound objects for the Audio Sprite.
     * @property ***REMOVED***object***REMOVED*** sounds
     */
    this.sounds = ***REMOVED******REMOVED***;

    for (var k in this.config.spritemap)
    ***REMOVED***
        var marker = this.config.spritemap[k];
        var sound = this.game.add.sound(this.key);
        
        sound.addMarker(k, marker.start, (marker.end - marker.start), null, marker.loop);
        
        this.sounds[k] = sound;
    ***REMOVED***

    if (this.config.autoplay)
    ***REMOVED***
        this.autoplayKey = this.config.autoplay;
        this.play(this.autoplayKey);
        this.autoplay = this.sounds[this.autoplayKey];
    ***REMOVED***

***REMOVED***;

Phaser.AudioSprite.prototype = ***REMOVED***

    /**
     * Play a sound with the given name.
     * 
     * @method Phaser.AudioSprite#play
     * @param ***REMOVED***string***REMOVED*** [marker] - The name of sound to play
     * @param ***REMOVED***number***REMOVED*** [volume=1] - Volume of the sound you want to play. If none is given it will use the volume given to the Sound when it was created (which defaults to 1 if none was specified).
     * @return ***REMOVED***Phaser.Sound***REMOVED*** This sound instance.
     */
    play: function (marker, volume) ***REMOVED***

        if (volume === undefined) ***REMOVED*** volume = 1; ***REMOVED***

        return this.sounds[marker].play(marker, null, volume);

    ***REMOVED***,

    /**
     * Stop a sound with the given name.
     * 
     * @method Phaser.AudioSprite#stop
     * @param ***REMOVED***string***REMOVED*** [marker=''] - The name of sound to stop. If none is given it will stop all sounds in the audio sprite.
     */
    stop: function (marker) ***REMOVED***

        if (!marker)
        ***REMOVED***
            for (var key in this.sounds)
            ***REMOVED***
                this.sounds[key].stop();
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            this.sounds[marker].stop();
        ***REMOVED***

    ***REMOVED***,

    /**
     * Get a sound with the given name.
     * 
     * @method Phaser.AudioSprite#get
     * @param ***REMOVED***string***REMOVED*** marker - The name of sound to get.
     * @return ***REMOVED***Phaser.Sound***REMOVED*** The sound instance.
     */
    get: function(marker) ***REMOVED***

        return this.sounds[marker];

    ***REMOVED***

***REMOVED***;

Phaser.AudioSprite.prototype.constructor = Phaser.AudioSprite;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Sound class constructor.
*
* @class Phaser.Sound
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Reference to the current game instance.
* @param ***REMOVED***string***REMOVED*** key - Asset key for the sound.
* @param ***REMOVED***number***REMOVED*** [volume=1] - Default value for the volume, between 0 and 1.
* @param ***REMOVED***boolean***REMOVED*** [loop=false] - Whether or not the sound will loop.
*/
Phaser.Sound = function (game, key, volume, loop, connect) ***REMOVED***

    if (volume === undefined) ***REMOVED*** volume = 1; ***REMOVED***
    if (loop === undefined) ***REMOVED*** loop = false; ***REMOVED***
    if (connect === undefined) ***REMOVED*** connect = game.sound.connectToMaster; ***REMOVED***

    /**
    * A reference to the currently running Game.
    * @property ***REMOVED***Phaser.Game***REMOVED*** game
    */
    this.game = game;

    /**
    * @property ***REMOVED***string***REMOVED*** name - Name of the sound.
    */
    this.name = key;

    /**
    * @property ***REMOVED***string***REMOVED*** key - Asset key for the sound.
    */
    this.key = key;

    /**
    * @property ***REMOVED***boolean***REMOVED*** loop - Whether or not the sound or current sound marker will loop.
    */
    this.loop = loop;

    /**
    * @property ***REMOVED***object***REMOVED*** markers - The sound markers.
    */
    this.markers = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***AudioContext***REMOVED*** context - Reference to the AudioContext instance.
    */
    this.context = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** autoplay - Boolean indicating whether the sound should start automatically.
    */
    this.autoplay = false;

    /**
    * @property ***REMOVED***number***REMOVED*** totalDuration - The total duration of the sound in seconds.
    */
    this.totalDuration = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** startTime - The time the Sound starts at (typically 0 unless starting from a marker)
    * @default
    */
    this.startTime = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** currentTime - The current time the sound is at.
    */
    this.currentTime = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** duration - The duration of the current sound marker in seconds.
    */
    this.duration = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** durationMS - The duration of the current sound marker in ms.
    */
    this.durationMS = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** position - The position of the current sound marker.
    */
    this.position = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** stopTime - The time the sound stopped.
    */
    this.stopTime = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** paused - true if the sound is paused, otherwise false.
    * @default
    */
    this.paused = false;

    /**
    * @property ***REMOVED***number***REMOVED*** pausedPosition - The position the sound had reached when it was paused.
    */
    this.pausedPosition = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** pausedTime - The game time at which the sound was paused.
    */
    this.pausedTime = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isPlaying - true if the sound is currently playing, otherwise false.
    * @default
    */
    this.isPlaying = false;

    /**
    * @property ***REMOVED***string***REMOVED*** currentMarker - The string ID of the currently playing marker, if any.
    * @default
    */
    this.currentMarker = '';

    /**
    * @property ***REMOVED***Phaser.Tween***REMOVED*** fadeTween - The tween that fades the audio, set via Sound.fadeIn and Sound.fadeOut.
    */
    this.fadeTween = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** pendingPlayback - true if the sound file is pending playback
    * @readonly
    */
    this.pendingPlayback = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** override - if true when you play this sound it will always start from the beginning.
    * @default
    */
    this.override = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** allowMultiple - This will allow you to have multiple instances of this Sound playing at once. This is only useful when running under Web Audio, and we recommend you implement a local pooling system to not flood the sound channels.
    * @default
    */
    this.allowMultiple = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** usingWebAudio - true if this sound is being played with Web Audio.
    * @readonly
    */
    this.usingWebAudio = this.game.sound.usingWebAudio;

    /**
    * @property ***REMOVED***boolean***REMOVED*** usingAudioTag - true if the sound is being played via the Audio tag.
    */
    this.usingAudioTag = this.game.sound.usingAudioTag;

    /**
    * @property ***REMOVED***object***REMOVED*** externalNode - If defined this Sound won't connect to the SoundManager master gain node, but will instead connect to externalNode.
    */
    this.externalNode = null;

    /**
    * @property ***REMOVED***object***REMOVED*** masterGainNode - The master gain node in a Web Audio system.
    */
    this.masterGainNode = null;

    /**
    * @property ***REMOVED***object***REMOVED*** gainNode - The gain node in a Web Audio system.
    */
    this.gainNode = null;

    /**
    * @property ***REMOVED***object***REMOVED*** _sound - Internal var.
    * @private
    */
    this._sound = null;

    if (this.usingWebAudio)
    ***REMOVED***
        this.context = this.game.sound.context;
        this.masterGainNode = this.game.sound.masterGain;

        if (this.context.createGain === undefined)
        ***REMOVED***
            this.gainNode = this.context.createGainNode();
        ***REMOVED***
        else
        ***REMOVED***
            this.gainNode = this.context.createGain();
        ***REMOVED***

        this.gainNode.gain.value = volume * this.game.sound.volume;

        if (connect)
        ***REMOVED***
            this.gainNode.connect(this.masterGainNode);
        ***REMOVED***
    ***REMOVED***
    else if (this.usingAudioTag)
    ***REMOVED***
        if (this.game.cache.getSound(key) && this.game.cache.isSoundReady(key))
        ***REMOVED***
            this._sound = this.game.cache.getSoundData(key);
            this.totalDuration = 0;

            if (this._sound.duration)
            ***REMOVED***
                this.totalDuration = this._sound.duration;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            this.game.cache.onSoundUnlock.add(this.soundHasUnlocked, this);
        ***REMOVED***
    ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onDecoded - The onDecoded event is dispatched when the sound has finished decoding (typically for mp3 files)
    */
    this.onDecoded = new Phaser.Signal();

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onPlay - The onPlay event is dispatched each time this sound is played.
    */
    this.onPlay = new Phaser.Signal();

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onPause - The onPause event is dispatched when this sound is paused.
    */
    this.onPause = new Phaser.Signal();

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onResume - The onResume event is dispatched when this sound is resumed from a paused state.
    */
    this.onResume = new Phaser.Signal();

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onLoop - The onLoop event is dispatched when this sound loops during playback.
    */
    this.onLoop = new Phaser.Signal();

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onStop - The onStop event is dispatched when this sound stops playback.
    */
    this.onStop = new Phaser.Signal();

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onMute - The onMute event is dispatched when this sound is muted.
    */
    this.onMute = new Phaser.Signal();

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onMarkerComplete - The onMarkerComplete event is dispatched when a marker within this sound completes playback.
    */
    this.onMarkerComplete = new Phaser.Signal();

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onFadeComplete - The onFadeComplete event is dispatched when this sound finishes fading either in or out.
    */
    this.onFadeComplete = new Phaser.Signal();

    /**
    * @property ***REMOVED***number***REMOVED*** _volume - The global audio volume. A value between 0 (silence) and 1 (full volume).
    * @private
    */
    this._volume = volume;

    /**
    * @property ***REMOVED***any***REMOVED*** _buffer - Decoded data buffer / Audio tag.
    * @private
    */
    this._buffer = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _muted - Boolean indicating whether the sound is muted or not.
    * @private
    */
    this._muted = false;

    /**
    * @property ***REMOVED***number***REMOVED*** _tempMarker - Internal marker var.
    * @private
    */
    this._tempMarker = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _tempPosition - Internal marker var.
    * @private
    */
    this._tempPosition = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _tempVolume - Internal marker var.
    * @private
    */
    this._tempVolume = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _tempPause - Internal marker var.
    * @private
    */
    this._tempPause = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _muteVolume - Internal cache var.
    * @private
    */
    this._muteVolume = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _tempLoop - Internal cache var.
    * @private
    */
    this._tempLoop = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _paused - Was this sound paused via code or a game event?
    * @private
    */
    this._paused = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _onDecodedEventDispatched - Was the onDecoded event dispatched?
    * @private
    */
    this._onDecodedEventDispatched = false;

***REMOVED***;

Phaser.Sound.prototype = ***REMOVED***

    /**
    * Called automatically when this sound is unlocked.
    * @method Phaser.Sound#soundHasUnlocked
    * @param ***REMOVED***string***REMOVED*** key - The Phaser.Cache key of the sound file to check for decoding.
    * @protected
    */
    soundHasUnlocked: function (key) ***REMOVED***

        if (key === this.key)
        ***REMOVED***
            this._sound = this.game.cache.getSoundData(this.key);
            this.totalDuration = this._sound.duration;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Adds a marker into the current Sound. A marker is represented by a unique key and a start time and duration.
    * This allows you to bundle multiple sounds together into a single audio file and use markers to jump between them for playback.
    *
    * @method Phaser.Sound#addMarker
    * @param ***REMOVED***string***REMOVED*** name - A unique name for this marker, i.e. 'explosion', 'gunshot', etc.
    * @param ***REMOVED***number***REMOVED*** start - The start point of this marker in the audio file, given in seconds. 2.5 = 2500ms, 0.5 = 500ms, etc.
    * @param ***REMOVED***number***REMOVED*** [duration=1] - The duration of the marker in seconds. 2.5 = 2500ms, 0.5 = 500ms, etc.
    * @param ***REMOVED***number***REMOVED*** [volume=1] - The volume the sound will play back at, between 0 (silent) and 1 (full volume).
    * @param ***REMOVED***boolean***REMOVED*** [loop=false] - Sets if the sound will loop or not.
    */
    addMarker: function (name, start, duration, volume, loop) ***REMOVED***

        if (duration === undefined || duration === null) ***REMOVED*** duration = 1; ***REMOVED***
        if (volume === undefined || volume === null) ***REMOVED*** volume = 1; ***REMOVED***
        if (loop === undefined) ***REMOVED*** loop = false; ***REMOVED***

        this.markers[name] = ***REMOVED***
            name: name,
            start: start,
            stop: start + duration,
            volume: volume,
            duration: duration,
            durationMS: duration * 1000,
            loop: loop
        ***REMOVED***;

    ***REMOVED***,

    /**
    * Removes a marker from the sound.
    * @method Phaser.Sound#removeMarker
    * @param ***REMOVED***string***REMOVED*** name - The key of the marker to remove.
    */
    removeMarker: function (name) ***REMOVED***

        delete this.markers[name];

    ***REMOVED***,

    /**
    * Called automatically by the AudioContext when the sound stops playing.
    * Doesn't get called if the sound is set to loop or is a section of an Audio Sprite.
    * 
    * @method Phaser.Sound#onEndedHandler
    * @protected
    */
    onEndedHandler: function () ***REMOVED***

        this._sound.onended = null;
        this.isPlaying = false;
        this.currentTime = this.durationMS;
        this.stop();

    ***REMOVED***,

    /**
    * Called automatically by Phaser.SoundManager.
    * @method Phaser.Sound#update
    * @protected
    */
    update: function () ***REMOVED***

        if (!this.game.cache.checkSoundKey(this.key))
        ***REMOVED***
            this.destroy();
            return;
        ***REMOVED***

        if (this.isDecoded && !this._onDecodedEventDispatched)
        ***REMOVED***
            this.onDecoded.dispatch(this);
            this._onDecodedEventDispatched = true;
        ***REMOVED***

        if (this.pendingPlayback && this.game.cache.isSoundReady(this.key))
        ***REMOVED***
            this.pendingPlayback = false;
            this.play(this._tempMarker, this._tempPosition, this._tempVolume, this._tempLoop);
        ***REMOVED***

        if (this.isPlaying)
        ***REMOVED***
            this.currentTime = this.game.time.time - this.startTime;

            if (this.currentTime >= this.durationMS)
            ***REMOVED***
                if (this.usingWebAudio)
                ***REMOVED***
                    if (this.loop)
                    ***REMOVED***
                        //  won't work with markers, needs to reset the position
                        this.onLoop.dispatch(this);

                        //  Gets reset by the play function
                        this.isPlaying = false;

                        if (this.currentMarker === '')
                        ***REMOVED***
                            this.currentTime = 0;
                            this.startTime = this.game.time.time;
                            this.isPlaying = true; // play not called again in this case
                        ***REMOVED***
                        else
                        ***REMOVED***
                            this.onMarkerComplete.dispatch(this.currentMarker, this);
                            this.play(this.currentMarker, 0, this.volume, true, true);
                        ***REMOVED***
                    ***REMOVED***
                    else
                    ***REMOVED***
                        //  Stop if we're using an audio marker, otherwise we let onended handle it
                        if (this.currentMarker !== '')
                        ***REMOVED***
                            this.stop();
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    if (this.loop)
                    ***REMOVED***
                        this.onLoop.dispatch(this);

                        if (this.currentMarker === '')
                        ***REMOVED***
                            this.currentTime = 0;
                            this.startTime = this.game.time.time;
                        ***REMOVED***

                        //  Gets reset by the play function
                        this.isPlaying = false;

                        this.play(this.currentMarker, 0, this.volume, true, true);
                    ***REMOVED***
                    else
                    ***REMOVED***
                        this.stop();
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***,

    /**
     * Loops this entire sound. If you need to loop a section of it then use Sound.play and the marker and loop parameters.
     *
     * @method Phaser.Sound#loopFull
     * @param ***REMOVED***number***REMOVED*** [volume=1] - Volume of the sound you want to play. If none is given it will use the volume given to the Sound when it was created (which defaults to 1 if none was specified).
     * @return ***REMOVED***Phaser.Sound***REMOVED*** This sound instance.
     */
    loopFull: function (volume) ***REMOVED***

        return this.play(null, 0, volume, true);

    ***REMOVED***,

    /**
    * Play this sound, or a marked section of it.
    * 
    * @method Phaser.Sound#play
    * @param ***REMOVED***string***REMOVED*** [marker=''] - If you want to play a marker then give the key here, otherwise leave blank to play the full sound.
    * @param ***REMOVED***number***REMOVED*** [position=0] - The starting position to play the sound from - this is ignored if you provide a marker.
    * @param ***REMOVED***number***REMOVED*** [volume=1] - Volume of the sound you want to play. If none is given it will use the volume given to the Sound when it was created (which defaults to 1 if none was specified).
    * @param ***REMOVED***boolean***REMOVED*** [loop=false] - Loop when finished playing? If not using a marker / audio sprite the looping will be done via the WebAudio loop property, otherwise it's time based.
    * @param ***REMOVED***boolean***REMOVED*** [forceRestart=true] - If the sound is already playing you can set forceRestart to restart it from the beginning.
    * @return ***REMOVED***Phaser.Sound***REMOVED*** This sound instance.
    */
    play: function (marker, position, volume, loop, forceRestart) ***REMOVED***

        if (marker === undefined || marker === false || marker === null) ***REMOVED*** marker = ''; ***REMOVED***
        if (forceRestart === undefined) ***REMOVED*** forceRestart = true; ***REMOVED***

        if (this.isPlaying && !this.allowMultiple && !forceRestart && !this.override)
        ***REMOVED***
            //  Use Restart instead
            return this;
        ***REMOVED***

        if (this._sound && this.isPlaying && !this.allowMultiple && (this.override || forceRestart))
        ***REMOVED***
            if (this.usingWebAudio)
            ***REMOVED***
                if (this._sound.stop === undefined)
                ***REMOVED***
                    this._sound.noteOff(0);
                ***REMOVED***
                else
                ***REMOVED***
                    try ***REMOVED***
                        this._sound.stop(0);
                    ***REMOVED***
                    catch (e) ***REMOVED***
                    ***REMOVED***
                ***REMOVED***

                if (this.externalNode)
                ***REMOVED***
                    this._sound.disconnect(this.externalNode);
                ***REMOVED***
                else if (this.gainNode)
                ***REMOVED***
                    this._sound.disconnect(this.gainNode);
                ***REMOVED***
            ***REMOVED***
            else if (this.usingAudioTag)
            ***REMOVED***
                this._sound.pause();
                this._sound.currentTime = 0;
            ***REMOVED***

            this.isPlaying = false;
        ***REMOVED***

        if (marker === '' && Object.keys(this.markers).length > 0)
        ***REMOVED***
            //  If they didn't specify a marker but this is an audio sprite, 
            //  we should never play the entire thing
            return this;
        ***REMOVED***

        if (marker !== '')
        ***REMOVED***
            if (this.markers[marker])
            ***REMOVED***
                this.currentMarker = marker;

                //  Playing a marker? Then we default to the marker values
                this.position = this.markers[marker].start;
                this.volume = this.markers[marker].volume;
                this.loop = this.markers[marker].loop;
                this.duration = this.markers[marker].duration;
                this.durationMS = this.markers[marker].durationMS;

                if (typeof volume !== 'undefined')
                ***REMOVED***
                    this.volume = volume;
                ***REMOVED***

                if (typeof loop !== 'undefined')
                ***REMOVED***
                    this.loop = loop;
                ***REMOVED***

                this._tempMarker = marker;
                this._tempPosition = this.position;
                this._tempVolume = this.volume;
                this._tempLoop = this.loop;
            ***REMOVED***
            else
            ***REMOVED***
                console.warn("Phaser.Sound.play: audio marker " + marker + " doesn't exist");
                return this;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            position = position || 0;

            if (volume === undefined) ***REMOVED*** volume = this._volume; ***REMOVED***
            if (loop === undefined) ***REMOVED*** loop = this.loop; ***REMOVED***

            this.position = Math.max(0, position);
            this.volume = volume;
            this.loop = loop;
            this.duration = 0;
            this.durationMS = 0;

            this._tempMarker = marker;
            this._tempPosition = position;
            this._tempVolume = volume;
            this._tempLoop = loop;
        ***REMOVED***

        if (this.usingWebAudio)
        ***REMOVED***
            //  Does the sound need decoding?
            if (this.game.cache.isSoundDecoded(this.key))
            ***REMOVED***
                this._sound = this.context.createBufferSource();

                if (this.externalNode)
                ***REMOVED***
                    this._sound.connect(this.externalNode);
                ***REMOVED***
                else
                ***REMOVED***
                    this._sound.connect(this.gainNode);
                ***REMOVED***

                this._buffer = this.game.cache.getSoundData(this.key);
                this._sound.buffer = this._buffer;

                if (this.loop && marker === '')
                ***REMOVED***
                    this._sound.loop = true;
                ***REMOVED***

                if (!this.loop && marker === '')
                ***REMOVED***
                    this._sound.onended = this.onEndedHandler.bind(this);
                ***REMOVED***

                this.totalDuration = this._sound.buffer.duration;

                if (this.duration === 0)
                ***REMOVED***
                    this.duration = this.totalDuration;
                    this.durationMS = Math.ceil(this.totalDuration * 1000);
                ***REMOVED***

                //  Useful to cache this somewhere perhaps?
                if (this._sound.start === undefined)
                ***REMOVED***
                    this._sound.noteGrainOn(0, this.position, this.duration);
                ***REMOVED***
                else
                ***REMOVED***
                    if (this.loop && marker === '')
                    ***REMOVED***
                        this._sound.start(0, 0);
                    ***REMOVED***
                    else
                    ***REMOVED***
                        this._sound.start(0, this.position, this.duration);
                    ***REMOVED***
                ***REMOVED***

                this.isPlaying = true;
                this.startTime = this.game.time.time;
                this.currentTime = 0;
                this.stopTime = this.startTime + this.durationMS;
                this.onPlay.dispatch(this);
            ***REMOVED***
            else
            ***REMOVED***
                this.pendingPlayback = true;

                if (this.game.cache.getSound(this.key) && this.game.cache.getSound(this.key).isDecoding === false)
                ***REMOVED***
                    this.game.sound.decode(this.key, this);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (this.game.cache.getSound(this.key) && this.game.cache.getSound(this.key).locked)
            ***REMOVED***
                this.game.cache.reloadSound(this.key);
                this.pendingPlayback = true;
            ***REMOVED***
            else
            ***REMOVED***
                if (this._sound && (this.game.device.cocoonJS || this._sound.readyState === 4))
                ***REMOVED***
                    this._sound.play();
                    //  This doesn't become available until you call play(), wonderful ...
                    this.totalDuration = this._sound.duration;

                    if (this.duration === 0)
                    ***REMOVED***
                        this.duration = this.totalDuration;
                        this.durationMS = this.totalDuration * 1000;
                    ***REMOVED***

                    this._sound.currentTime = this.position;
                    this._sound.muted = this._muted;

                    if (this._muted || this.game.sound.mute)
                    ***REMOVED***
                        this._sound.volume = 0;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        this._sound.volume = this._volume;
                    ***REMOVED***

                    this.isPlaying = true;
                    this.startTime = this.game.time.time;
                    this.currentTime = 0;
                    this.stopTime = this.startTime + this.durationMS;

                    this.onPlay.dispatch(this);
                ***REMOVED***
                else
                ***REMOVED***
                    this.pendingPlayback = true;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Restart the sound, or a marked section of it.
    *
    * @method Phaser.Sound#restart
    * @param ***REMOVED***string***REMOVED*** [marker=''] - If you want to play a marker then give the key here, otherwise leave blank to play the full sound.
    * @param ***REMOVED***number***REMOVED*** [position=0] - The starting position to play the sound from - this is ignored if you provide a marker.
    * @param ***REMOVED***number***REMOVED*** [volume=1] - Volume of the sound you want to play.
    * @param ***REMOVED***boolean***REMOVED*** [loop=false] - Loop when it finished playing?
    */
    restart: function (marker, position, volume, loop) ***REMOVED***

        marker = marker || '';
        position = position || 0;
        volume = volume || 1;
        if (loop === undefined) ***REMOVED*** loop = false; ***REMOVED***

        this.play(marker, position, volume, loop, true);

    ***REMOVED***,

    /**
    * Pauses the sound.
    *
    * @method Phaser.Sound#pause
    */
    pause: function () ***REMOVED***

        if (this.isPlaying && this._sound)
        ***REMOVED***
            this.paused = true;
            this.pausedPosition = this.currentTime;
            this.pausedTime = this.game.time.time;
            this._tempPause = this._sound.currentTime;
            this.onPause.dispatch(this);
            this.stop();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Resumes the sound.
    *
    * @method Phaser.Sound#resume
    */
    resume: function () ***REMOVED***

        if (this.paused && this._sound)
        ***REMOVED***
            if (this.usingWebAudio)
            ***REMOVED***
                var p = Math.max(0, this.position + (this.pausedPosition / 1000));

                this._sound = this.context.createBufferSource();
                this._sound.buffer = this._buffer;

                if (this.externalNode)
                ***REMOVED***
                    this._sound.connect(this.externalNode);
                ***REMOVED***
                else
                ***REMOVED***
                    this._sound.connect(this.gainNode);
                ***REMOVED***

                if (this.loop)
                ***REMOVED***
                    this._sound.loop = true;
                ***REMOVED***

                if (!this.loop && this.currentMarker === '')
                ***REMOVED***
                    this._sound.onended = this.onEndedHandler.bind(this);
                ***REMOVED***

                var duration = this.duration - (this.pausedPosition / 1000);

                if (this._sound.start === undefined)
                ***REMOVED***
                    this._sound.noteGrainOn(0, p, duration);
                    //this._sound.noteOn(0); // the zero is vitally important, crashes iOS6 without it
                ***REMOVED***
                else
                ***REMOVED***
                    if (this.loop && this.game.device.chrome)
                    ***REMOVED***
                        //  Handle chrome bug: https://code.google.com/p/chromium/issues/detail?id=457099
                        if (this.game.device.chromeVersion === 42)
                        ***REMOVED***
                            this._sound.start(0);
                        ***REMOVED***
                        else
                        ***REMOVED***
                            this._sound.start(0, p);
                        ***REMOVED***
                    ***REMOVED***
                    else
                    ***REMOVED***
                        this._sound.start(0, p, duration);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                this._sound.currentTime = this._tempPause;
                this._sound.play();
            ***REMOVED***

            this.isPlaying = true;
            this.paused = false;
            this.startTime += (this.game.time.time - this.pausedTime);
            this.onResume.dispatch(this);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Stop playing this sound.
    *
    * @method Phaser.Sound#stop
    */
    stop: function () ***REMOVED***

        if (this.isPlaying && this._sound)
        ***REMOVED***
            if (this.usingWebAudio)
            ***REMOVED***
                if (this._sound.stop === undefined)
                ***REMOVED***
                    this._sound.noteOff(0);
                ***REMOVED***
                else
                ***REMOVED***
                    try ***REMOVED***
                        this._sound.stop(0);
                    ***REMOVED***
                    catch (e)
                    ***REMOVED***
                        //  Thanks Android 4.4
                    ***REMOVED***
                ***REMOVED***

                if (this.externalNode)
                ***REMOVED***
                    this._sound.disconnect(this.externalNode);
                ***REMOVED***
                else if (this.gainNode)
                ***REMOVED***
                    this._sound.disconnect(this.gainNode);
                ***REMOVED***
            ***REMOVED***
            else if (this.usingAudioTag)
            ***REMOVED***
                this._sound.pause();
                this._sound.currentTime = 0;
            ***REMOVED***
        ***REMOVED***

        this.pendingPlayback = false;
        this.isPlaying = false;

        if (!this.paused)
        ***REMOVED***
            var prevMarker = this.currentMarker;

            if (this.currentMarker !== '')
            ***REMOVED***
                this.onMarkerComplete.dispatch(this.currentMarker, this);
            ***REMOVED***

            this.currentMarker = '';

            if (this.fadeTween !== null)
            ***REMOVED***
                this.fadeTween.stop();
            ***REMOVED***

            this.onStop.dispatch(this, prevMarker);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Starts this sound playing (or restarts it if already doing so) and sets the volume to zero.
    * Then increases the volume from 0 to 1 over the duration specified.
    *
    * At the end of the fade Sound.onFadeComplete is dispatched with this Sound object as the first parameter,
    * and the final volume (1) as the second parameter.
    *
    * @method Phaser.Sound#fadeIn
    * @param ***REMOVED***number***REMOVED*** [duration=1000] - The time in milliseconds over which the Sound should fade in.
    * @param ***REMOVED***boolean***REMOVED*** [loop=false] - Should the Sound be set to loop? Note that this doesn't cause the fade to repeat.
    * @param ***REMOVED***string***REMOVED*** [marker=(current marker)] - The marker to start at; defaults to the current (last played) marker. To start playing from the beginning specify specify a marker of `''`.
    */
    fadeIn: function (duration, loop, marker) ***REMOVED***

        if (loop === undefined) ***REMOVED*** loop = false; ***REMOVED***
        if (marker === undefined) ***REMOVED*** marker = this.currentMarker; ***REMOVED***

        if (this.paused)
        ***REMOVED***
            return;
        ***REMOVED***

        this.play(marker, 0, 0, loop);

        this.fadeTo(duration, 1);

    ***REMOVED***,
    
    /**
    * Decreases the volume of this Sound from its current value to 0 over the duration specified.
    * At the end of the fade Sound.onFadeComplete is dispatched with this Sound object as the first parameter,
    * and the final volume (0) as the second parameter.
    *
    * @method Phaser.Sound#fadeOut
    * @param ***REMOVED***number***REMOVED*** [duration=1000] - The time in milliseconds over which the Sound should fade out.
    */
    fadeOut: function (duration) ***REMOVED***

        this.fadeTo(duration, 0);

    ***REMOVED***,

    /**
    * Fades the volume of this Sound from its current value to the given volume over the duration specified.
    * At the end of the fade Sound.onFadeComplete is dispatched with this Sound object as the first parameter, 
    * and the final volume (volume) as the second parameter.
    *
    * @method Phaser.Sound#fadeTo
    * @param ***REMOVED***number***REMOVED*** [duration=1000] - The time in milliseconds during which the Sound should fade out.
    * @param ***REMOVED***number***REMOVED*** [volume] - The volume which the Sound should fade to. This is a value between 0 and 1.
    */
    fadeTo: function (duration, volume) ***REMOVED***

        if (!this.isPlaying || this.paused || volume === this.volume)
        ***REMOVED***
            return;
        ***REMOVED***

        if (duration === undefined) ***REMOVED*** duration = 1000; ***REMOVED***

        if (volume === undefined)
        ***REMOVED***
            console.warn("Phaser.Sound.fadeTo: No Volume Specified.");
            return;
        ***REMOVED***

        this.fadeTween = this.game.add.tween(this).to( ***REMOVED*** volume: volume ***REMOVED***, duration, Phaser.Easing.Linear.None, true);

        this.fadeTween.onComplete.add(this.fadeComplete, this);

    ***REMOVED***,

    /**
    * Internal handler for Sound.fadeIn, Sound.fadeOut and Sound.fadeTo.
    *
    * @method Phaser.Sound#fadeComplete
    * @private
    */
    fadeComplete: function () ***REMOVED***

        this.onFadeComplete.dispatch(this, this.volume);

        if (this.volume === 0)
        ***REMOVED***
            this.stop();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called automatically by SoundManager.volume.
    *
    * Sets the volume of AudioTag Sounds as a percentage of the Global Volume.
    *
    * You should not normally call this directly.
    *
    * @method Phaser.Sound#updateGlobalVolume
    * @protected
    * @param ***REMOVED***float***REMOVED*** globalVolume - The global SoundManager volume.
    */
    updateGlobalVolume: function (globalVolume) ***REMOVED***

        //  this._volume is the % of the global volume this sound should be played at

        if (this.usingAudioTag && this._sound)
        ***REMOVED***
            this._sound.volume = globalVolume * this._volume;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Destroys this sound and all associated events and removes it from the SoundManager.
    *
    * @method Phaser.Sound#destroy
    * @param ***REMOVED***boolean***REMOVED*** [remove=true] - If true this Sound is automatically removed from the SoundManager.
    */
    destroy: function (remove) ***REMOVED***

        if (remove === undefined) ***REMOVED*** remove = true; ***REMOVED***

        this.stop();

        if (remove)
        ***REMOVED***
            this.game.sound.remove(this);
        ***REMOVED***
        else
        ***REMOVED***
            this.markers = ***REMOVED******REMOVED***;
            this.context = null;
            this._buffer = null;
            this.externalNode = null;

            this.onDecoded.dispose();
            this.onPlay.dispose();
            this.onPause.dispose();
            this.onResume.dispose();
            this.onLoop.dispose();
            this.onStop.dispose();
            this.onMute.dispose();
            this.onMarkerComplete.dispose();
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

Phaser.Sound.prototype.constructor = Phaser.Sound;

/**
* @name Phaser.Sound#isDecoding
* @property ***REMOVED***boolean***REMOVED*** isDecoding - Returns true if the sound file is still decoding.
* @readonly
*/
Object.defineProperty(Phaser.Sound.prototype, "isDecoding", ***REMOVED***

    get: function () ***REMOVED***
        return this.game.cache.getSound(this.key).isDecoding;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Sound#isDecoded
* @property ***REMOVED***boolean***REMOVED*** isDecoded - Returns true if the sound file has decoded.
* @readonly
*/
Object.defineProperty(Phaser.Sound.prototype, "isDecoded", ***REMOVED***

    get: function () ***REMOVED***
        return this.game.cache.isSoundDecoded(this.key);
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Sound#mute
* @property ***REMOVED***boolean***REMOVED*** mute - Gets or sets the muted state of this sound.
*/
Object.defineProperty(Phaser.Sound.prototype, "mute", ***REMOVED***

    get: function () ***REMOVED***

        return (this._muted || this.game.sound.mute);

    ***REMOVED***,

    set: function (value) ***REMOVED***

        value = value || false;

        if (value === this._muted)
        ***REMOVED***
            return;
        ***REMOVED***

        if (value)
        ***REMOVED***
            this._muted = true;
            this._muteVolume = this._tempVolume;

            if (this.usingWebAudio)
            ***REMOVED***
                this.gainNode.gain.value = 0;
            ***REMOVED***
            else if (this.usingAudioTag && this._sound)
            ***REMOVED***
                this._sound.volume = 0;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            this._muted = false;

            if (this.usingWebAudio)
            ***REMOVED***
                this.gainNode.gain.value = this._muteVolume;
            ***REMOVED***
            else if (this.usingAudioTag && this._sound)
            ***REMOVED***
                this._sound.volume = this._muteVolume;
            ***REMOVED***
        ***REMOVED***

        this.onMute.dispatch(this);

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Sound#volume
* @property ***REMOVED***number***REMOVED*** volume - Gets or sets the volume of this sound, a value between 0 and 1. The value given is clamped to the range 0 to 1.
*/
Object.defineProperty(Phaser.Sound.prototype, "volume", ***REMOVED***

    get: function () ***REMOVED***
        return this._volume;
    ***REMOVED***,

    set: function (value) ***REMOVED***

        //  Causes an Index size error in Firefox if you don't clamp the value
        if (this.game.device.firefox && this.usingAudioTag)
        ***REMOVED***
            value = this.game.math.clamp(value, 0, 1);
        ***REMOVED***

        if (this._muted)
        ***REMOVED***
            this._muteVolume = value;
            return;
        ***REMOVED***

        this._tempVolume = value;
        this._volume = value;

        if (this.usingWebAudio)
        ***REMOVED***
            this.gainNode.gain.value = value;
        ***REMOVED***
        else if (this.usingAudioTag && this._sound)
        ***REMOVED***
            this._sound.volume = value;
        ***REMOVED***
    ***REMOVED***

***REMOVED***);

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
