/* jshint noempty: false */

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* An extremely useful repeatable random data generator.
*
* Based on Nonsense by Josh Faul https://github.com/jocafa/Nonsense.
*
* The random number genererator is based on the Alea PRNG, but is modified.
*  - https://github.com/coverslide/node-alea
*  - https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
*  - http://baagoe.org/en/wiki/Better_random_numbers_for_javascript (original, perm. 404)
*
* @class Phaser.RandomDataGenerator
* @constructor
* @param ***REMOVED***any[]|string***REMOVED*** [seeds] - An array of values to use as the seed, or a generator state (from ***REMOVED***#state***REMOVED***).
*/
Phaser.RandomDataGenerator = function (seeds) ***REMOVED***

    if (seeds === undefined) ***REMOVED*** seeds = []; ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** c - Internal var.
    * @private
    */
    this.c = 1;

    /**
    * @property ***REMOVED***number***REMOVED*** s0 - Internal var.
    * @private
    */
    this.s0 = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** s1 - Internal var.
    * @private
    */
    this.s1 = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** s2 - Internal var.
    * @private
    */
    this.s2 = 0;

    if (typeof seeds === 'string')
    ***REMOVED***
        this.state(seeds);
    ***REMOVED***
    else
    ***REMOVED***
        this.sow(seeds);
    ***REMOVED***

***REMOVED***;

Phaser.RandomDataGenerator.prototype = ***REMOVED***

    /**
    * Private random helper.
    *
    * @method Phaser.RandomDataGenerator#rnd
    * @private
    * @return ***REMOVED***number***REMOVED***
    */
    rnd: function () ***REMOVED***

        var t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10; // 2^-32

        this.c = t | 0;
        this.s0 = this.s1;
        this.s1 = this.s2;
        this.s2 = t - this.c;

        return this.s2;
    ***REMOVED***,

    /**
    * Reset the seed of the random data generator.
    *
    * _Note_: the seed array is only processed up to the first `undefined` (or `null`) value, should such be present.
    *
    * @method Phaser.RandomDataGenerator#sow
    * @param ***REMOVED***any[]***REMOVED*** seeds - The array of seeds: the `toString()` of each value is used.
    */
    sow: function (seeds) ***REMOVED***

        // Always reset to default seed
        this.s0 = this.hash(' ');
        this.s1 = this.hash(this.s0);
        this.s2 = this.hash(this.s1);
        this.c = 1;

        if (!seeds)
        ***REMOVED***
            return;
        ***REMOVED***

        // Apply any seeds
        for (var i = 0; i < seeds.length && (seeds[i] != null); i++)
        ***REMOVED***
            var seed = seeds[i];

            this.s0 -= this.hash(seed);
            this.s0 += ~~(this.s0 < 0);
            this.s1 -= this.hash(seed);
            this.s1 += ~~(this.s1 < 0);
            this.s2 -= this.hash(seed);
            this.s2 += ~~(this.s2 < 0);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal method that creates a seed hash.
    *
    * @method Phaser.RandomDataGenerator#hash
    * @private
    * @param ***REMOVED***any***REMOVED*** data
    * @return ***REMOVED***number***REMOVED*** hashed value.
    */
    hash: function (data) ***REMOVED***

        var h, i, n;
        n = 0xefc8249d;
        data = data.toString();

        for (i = 0; i < data.length; i++) ***REMOVED***
            n += data.charCodeAt(i);
            h = 0.02519603282416938 * n;
            n = h >>> 0;
            h -= n;
            h *= n;
            n = h >>> 0;
            h -= n;
            n += h * 0x100000000;// 2^32
        ***REMOVED***

        return (n >>> 0) * 2.3283064365386963e-10;// 2^-32

    ***REMOVED***,

    /**
    * Returns a random integer between 0 and 2^32.
    *
    * @method Phaser.RandomDataGenerator#integer
    * @return ***REMOVED***number***REMOVED*** A random integer between 0 and 2^32.
    */
    integer: function() ***REMOVED***

        return this.rnd.apply(this) * 0x100000000;// 2^32

    ***REMOVED***,

    /**
    * Returns a random real number between 0 and 1.
    *
    * @method Phaser.RandomDataGenerator#frac
    * @return ***REMOVED***number***REMOVED*** A random real number between 0 and 1.
    */
    frac: function() ***REMOVED***

        return this.rnd.apply(this) + (this.rnd.apply(this) * 0x200000 | 0) * 1.1102230246251565e-16;   // 2^-53

    ***REMOVED***,

    /**
    * Returns a random real number between 0 and 2^32.
    *
    * @method Phaser.RandomDataGenerator#real
    * @return ***REMOVED***number***REMOVED*** A random real number between 0 and 2^32.
    */
    real: function() ***REMOVED***

        return this.integer() + this.frac();

    ***REMOVED***,

    /**
    * Returns a random integer between and including min and max.
    *
    * @method Phaser.RandomDataGenerator#integerInRange
    * @param ***REMOVED***number***REMOVED*** min - The minimum value in the range.
    * @param ***REMOVED***number***REMOVED*** max - The maximum value in the range.
    * @return ***REMOVED***number***REMOVED*** A random number between min and max.
    */
    integerInRange: function (min, max) ***REMOVED***

        return Math.floor(this.realInRange(0, max - min + 1) + min);

    ***REMOVED***,

    /**
    * Returns a random integer between and including min and max.
    * This method is an alias for RandomDataGenerator.integerInRange.
    *
    * @method Phaser.RandomDataGenerator#between
    * @param ***REMOVED***number***REMOVED*** min - The minimum value in the range.
    * @param ***REMOVED***number***REMOVED*** max - The maximum value in the range.
    * @return ***REMOVED***number***REMOVED*** A random number between min and max.
    */
    between: function (min, max) ***REMOVED***

        return this.integerInRange(min, max);

    ***REMOVED***,

    /**
    * Returns a random real number between min and max.
    *
    * @method Phaser.RandomDataGenerator#realInRange
    * @param ***REMOVED***number***REMOVED*** min - The minimum value in the range.
    * @param ***REMOVED***number***REMOVED*** max - The maximum value in the range.
    * @return ***REMOVED***number***REMOVED*** A random number between min and max.
    */
    realInRange: function (min, max) ***REMOVED***

        return this.frac() * (max - min) + min;

    ***REMOVED***,

    /**
    * Returns a random real number between -1 and 1.
    *
    * @method Phaser.RandomDataGenerator#normal
    * @return ***REMOVED***number***REMOVED*** A random real number between -1 and 1.
    */
    normal: function () ***REMOVED***

        return 1 - 2 * this.frac();

    ***REMOVED***,

    /**
    * Returns a valid RFC4122 version4 ID hex string from https://gist.github.com/1308368
    *
    * @method Phaser.RandomDataGenerator#uuid
    * @return ***REMOVED***string***REMOVED*** A valid RFC4122 version4 ID hex string
    */
    uuid: function () ***REMOVED***

        var a = '';
        var b = '';

        for (b = a = ''; a++ < 36; b +=~a % 5 | a * 3&4 ? (a^15 ? 8^this.frac() * (a^20 ? 16 : 4) : 4).toString(16) : '-')
        ***REMOVED***
        ***REMOVED***

        return b;

    ***REMOVED***,

    /**
    * Returns a random member of `array`.
    *
    * @method Phaser.RandomDataGenerator#pick
    * @param ***REMOVED***Array***REMOVED*** ary - An Array to pick a random member of.
    * @return ***REMOVED***any***REMOVED*** A random member of the array.
    */
    pick: function (ary) ***REMOVED***

        return ary[this.integerInRange(0, ary.length - 1)];

    ***REMOVED***,

    /**
    * Returns a sign to be used with multiplication operator.
    *
    * @method Phaser.RandomDataGenerator#sign
    * @return ***REMOVED***number***REMOVED*** -1 or +1.
    */
    sign: function () ***REMOVED***

        return this.pick([-1, 1]);

    ***REMOVED***,

    /**
    * Returns a random member of `array`, favoring the earlier entries.
    *
    * @method Phaser.RandomDataGenerator#weightedPick
    * @param ***REMOVED***Array***REMOVED*** ary - An Array to pick a random member of.
    * @return ***REMOVED***any***REMOVED*** A random member of the array.
    */
    weightedPick: function (ary) ***REMOVED***

        return ary[~~(Math.pow(this.frac(), 2) * (ary.length - 1) + 0.5)];

    ***REMOVED***,

    /**
    * Returns a random timestamp between min and max, or between the beginning of 2000 and the end of 2020 if min and max aren't specified.
    *
    * @method Phaser.RandomDataGenerator#timestamp
    * @param ***REMOVED***number***REMOVED*** min - The minimum value in the range.
    * @param ***REMOVED***number***REMOVED*** max - The maximum value in the range.
    * @return ***REMOVED***number***REMOVED*** A random timestamp between min and max.
    */
    timestamp: function (min, max) ***REMOVED***

        return this.realInRange(min || 946684800000, max || 1577862000000);

    ***REMOVED***,

    /**
    * Returns a random angle between -180 and 180.
    *
    * @method Phaser.RandomDataGenerator#angle
    * @return ***REMOVED***number***REMOVED*** A random number between -180 and 180.
    */
    angle: function() ***REMOVED***

        return this.integerInRange(-180, 180);

    ***REMOVED***,

    /**
    * Gets or Sets the state of the generator. This allows you to retain the values
    * that the generator is using between games, i.e. in a game save file.
    * 
    * To seed this generator with a previously saved state you can pass it as the 
    * `seed` value in your game config, or call this method directly after Phaser has booted.
    *
    * Call this method with no parameters to return the current state.
    * 
    * If providing a state it should match the same format that this method
    * returns, which is a string with a header `!rnd` followed by the `c`,
    * `s0`, `s1` and `s2` values respectively, each comma-delimited. 
    *
    * @method Phaser.RandomDataGenerator#state
    * @param ***REMOVED***string***REMOVED*** [state] - Generator state to be set.
    * @return ***REMOVED***string***REMOVED*** The current state of the generator.
    */
    state: function (state) ***REMOVED***

        if (typeof state === 'string' && state.match(/^!rnd/))
        ***REMOVED***
            state = state.split(',');

            this.c = parseFloat(state[1]);
            this.s0 = parseFloat(state[2]);
            this.s1 = parseFloat(state[3]);
            this.s2 = parseFloat(state[4]);
        ***REMOVED***

        return ['!rnd', this.c, this.s0, this.s1, this.s2].join(',');

    ***REMOVED***

***REMOVED***;

Phaser.RandomDataGenerator.prototype.constructor = Phaser.RandomDataGenerator;
