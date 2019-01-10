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
