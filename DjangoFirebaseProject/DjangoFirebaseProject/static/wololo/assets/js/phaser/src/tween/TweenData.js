/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A Phaser.Tween contains at least one TweenData object. It contains all of the tween data values, such as the
* starting and ending values, the ease function, interpolation and duration. The Tween acts as a timeline manager for
* TweenData objects and can contain multiple TweenData objects.
*
* @class Phaser.TweenData
* @constructor
* @param ***REMOVED***Phaser.Tween***REMOVED*** parent - The Tween that owns this TweenData object.
*/
Phaser.TweenData = function (parent) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Tween***REMOVED*** parent - The Tween which owns this TweenData.
    */
    this.parent = parent;

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running Game.
    */
    this.game = parent.game;

    /**
    * @property ***REMOVED***object***REMOVED*** vStart - An object containing the values at the start of the tween.
    * @private
    */
    this.vStart = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***object***REMOVED*** vStartCache - Cached starting values.
    * @private
    */
    this.vStartCache = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***object***REMOVED*** vEnd - An object containing the values at the end of the tween.
    * @private
    */
    this.vEnd = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***object***REMOVED*** vEndCache - Cached ending values.
    * @private
    */
    this.vEndCache = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***number***REMOVED*** duration - The duration of the tween in ms.
    * @default
    */
    this.duration = 1000;

    /**
    * @property ***REMOVED***number***REMOVED*** percent - A value between 0 and 1 that represents how far through the duration this tween is.
    * @readonly
    */
    this.percent = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** value - The current calculated value.
    * @readonly
    */
    this.value = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** repeatCounter - If the Tween is set to repeat this contains the current repeat count.
    */
    this.repeatCounter = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** repeatDelay - The amount of time in ms between repeats of this tween.
    */
    this.repeatDelay = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** repeatTotal - The total number of times this Tween will repeat.
    * @readonly
    */
    this.repeatTotal = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** interpolate - True if the Tween will use interpolation (i.e. is an Array to Array tween)
    * @default
    */
    this.interpolate = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** yoyo - True if the Tween is set to yoyo, otherwise false.
    * @default
    */
    this.yoyo = false;

    /**
    * @property ***REMOVED***number***REMOVED*** yoyoDelay - The amount of time in ms between yoyos of this tween.
    */
    this.yoyoDelay = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** inReverse - When a Tween is yoyoing this value holds if it's currently playing forwards (false) or in reverse (true).
    * @default
    */
    this.inReverse = false;

    /**
    * @property ***REMOVED***number***REMOVED*** delay - The amount to delay by until the Tween starts (in ms). Only applies to the start, use repeatDelay to handle repeats.
    * @default
    */
    this.delay = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** dt - Current time value.
    */
    this.dt = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** startTime - The time the Tween started or null if it hasn't yet started.
    */
    this.startTime = null;

    /**
    * @property ***REMOVED***function***REMOVED*** easingFunction - The easing function used for the Tween.
    * @default Phaser.Easing.Default
    */
    this.easingFunction = Phaser.Easing.Default;

    /**
    * @property ***REMOVED***function***REMOVED*** interpolationFunction - The interpolation function used for the Tween.
    * @default Phaser.Math.linearInterpolation
    */
    this.interpolationFunction = Phaser.Math.linearInterpolation;

    /**
    * @property ***REMOVED***object***REMOVED*** interpolationContext - The interpolation function context used for the Tween.
    * @default Phaser.Math
    */
    this.interpolationContext = Phaser.Math;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isRunning - If the tween is running this is set to `true`. Unless Phaser.Tween a TweenData that is waiting for a delay to expire is *not* considered as running.
    * @default
    */
    this.isRunning = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isFrom - Is this a from tween or a to tween?
    * @default
    */
    this.isFrom = false;

***REMOVED***;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.TweenData.PENDING = 0;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.TweenData.RUNNING = 1;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.TweenData.LOOPED = 2;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.TweenData.COMPLETE = 3;

Phaser.TweenData.prototype = ***REMOVED***

    /**
    * Sets this tween to be a `to` tween on the properties given. A `to` tween starts at the current value and tweens to the destination value given.
    * For example a Sprite with an `x` coordinate of 100 could be tweened to `x` 200 by giving a properties object of `***REMOVED*** x: 200 ***REMOVED***`.
    *
    * @method Phaser.TweenData#to
    * @param ***REMOVED***object***REMOVED*** properties - The properties you want to tween, such as `Sprite.x` or `Sound.volume`. Given as a JavaScript object.
    * @param ***REMOVED***number***REMOVED*** [duration=1000] - Duration of this tween in ms.
    * @param ***REMOVED***function***REMOVED*** [ease=null] - Easing function. If not set it will default to Phaser.Easing.Default, which is Phaser.Easing.Linear.None by default but can be over-ridden at will.
    * @param ***REMOVED***number***REMOVED*** [delay=0] - Delay before this tween will start, defaults to 0 (no delay). Value given is in ms.
    * @param ***REMOVED***number***REMOVED*** [repeat=0] - Should the tween automatically restart once complete? If you want it to run forever set as -1. This ignores any chained tweens.
    * @param ***REMOVED***boolean***REMOVED*** [yoyo=false] - A tween that yoyos will reverse itself and play backwards automatically. A yoyo'd tween doesn't fire the Tween.onComplete event, so listen for Tween.onLoop instead.
    * @return ***REMOVED***Phaser.TweenData***REMOVED*** This Tween object.
    */
    to: function (properties, duration, ease, delay, repeat, yoyo) ***REMOVED***

        this.vEnd = properties;
        this.duration = duration;
        this.easingFunction = ease;
        this.delay = delay;
        this.repeatTotal = repeat;
        this.yoyo = yoyo;

        this.isFrom = false;

        return this;

    ***REMOVED***,

    /**
    * Sets this tween to be a `from` tween on the properties given. A `from` tween sets the target to the destination value and tweens to its current value.
    * For example a Sprite with an `x` coordinate of 100 tweened from `x` 500 would be set to `x` 500 and then tweened to `x` 100 by giving a properties object of `***REMOVED*** x: 500 ***REMOVED***`.
    *
    * @method Phaser.TweenData#from
    * @param ***REMOVED***object***REMOVED*** properties - The properties you want to tween, such as `Sprite.x` or `Sound.volume`. Given as a JavaScript object.
    * @param ***REMOVED***number***REMOVED*** [duration=1000] - Duration of this tween in ms.
    * @param ***REMOVED***function***REMOVED*** [ease=null] - Easing function. If not set it will default to Phaser.Easing.Default, which is Phaser.Easing.Linear.None by default but can be over-ridden at will.
    * @param ***REMOVED***number***REMOVED*** [delay=0] - Delay before this tween will start, defaults to 0 (no delay). Value given is in ms.
    * @param ***REMOVED***number***REMOVED*** [repeat=0] - Should the tween automatically restart once complete? If you want it to run forever set as -1. This ignores any chained tweens.
    * @param ***REMOVED***boolean***REMOVED*** [yoyo=false] - A tween that yoyos will reverse itself and play backwards automatically. A yoyo'd tween doesn't fire the Tween.onComplete event, so listen for Tween.onLoop instead.
    * @return ***REMOVED***Phaser.TweenData***REMOVED*** This Tween object.
    */
    from: function (properties, duration, ease, delay, repeat, yoyo) ***REMOVED***

        this.vEnd = properties;
        this.duration = duration;
        this.easingFunction = ease;
        this.delay = delay;
        this.repeatTotal = repeat;
        this.yoyo = yoyo;

        this.isFrom = true;

        return this;

    ***REMOVED***,

    /**
    * Starts the Tween running.
    *
    * @method Phaser.TweenData#start
    * @return ***REMOVED***Phaser.TweenData***REMOVED*** This Tween object.
    */
    start: function () ***REMOVED***

        this.startTime = this.game.time.time + this.delay;

        if (this.parent.reverse)
        ***REMOVED***
            this.dt = this.duration;
        ***REMOVED***
        else
        ***REMOVED***
            this.dt = 0;
        ***REMOVED***

        if (this.delay > 0)
        ***REMOVED***
            this.isRunning = false;
        ***REMOVED***
        else
        ***REMOVED***
            this.isRunning = true;
        ***REMOVED***

        if (this.isFrom)
        ***REMOVED***
            //  Reverse them all and instant set them
            for (var property in this.vStartCache)
            ***REMOVED***
                this.vStart[property] = this.vEndCache[property];
                this.vEnd[property] = this.vStartCache[property];
                this.parent.target[property] = this.vStart[property];
            ***REMOVED***
        ***REMOVED***

        this.value = 0;
        this.yoyoCounter = 0;
        this.repeatCounter = this.repeatTotal;

        return this;

    ***REMOVED***,

    /**
    * Loads the values from the target object into this Tween.
    *
    * @private
    * @method Phaser.TweenData#loadValues
    * @return ***REMOVED***Phaser.TweenData***REMOVED*** This Tween object.
    */
    loadValues: function () ***REMOVED***

        for (var property in this.parent.properties)
        ***REMOVED***
            //  Load the property from the parent object
            this.vStart[property] = this.parent.properties[property];

            //  Check if an Array was provided as property value
            if (Array.isArray(this.vEnd[property]))
            ***REMOVED***
                if (this.vEnd[property].length === 0)
                ***REMOVED***
                    continue;
                ***REMOVED***

                if (this.percent === 0)
                ***REMOVED***
                    //  Put the start value at the beginning of the array
                    //  but we only want to do this once, if the Tween hasn't run before
                    this.vEnd[property] = [this.vStart[property]].concat(this.vEnd[property]);
                ***REMOVED***
            ***REMOVED***

            if (typeof this.vEnd[property] !== 'undefined')
            ***REMOVED***
                if (typeof this.vEnd[property] === 'string')
                ***REMOVED***
                    //  Parses relative end values with start as base (e.g.: +10, -3)
                    this.vEnd[property] = this.vStart[property] + parseFloat(this.vEnd[property], 10);
                ***REMOVED***

                this.parent.properties[property] = this.vEnd[property];
            ***REMOVED***
            else
            ***REMOVED***
                //  Null tween
                this.vEnd[property] = this.vStart[property];
            ***REMOVED***

            this.vStartCache[property] = this.vStart[property];
            this.vEndCache[property] = this.vEnd[property];
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Updates this Tween. This is called automatically by Phaser.Tween.
    *
    * @protected
    * @method Phaser.TweenData#update
    * @param ***REMOVED***number***REMOVED*** time - A timestamp passed in by the Tween parent.
    * @return ***REMOVED***number***REMOVED*** The current status of this Tween. One of the Phaser.TweenData constants: PENDING, RUNNING, LOOPED or COMPLETE.
    */
    update: function (time) ***REMOVED***

        if (!this.isRunning)
        ***REMOVED***
            if (time >= this.startTime)
            ***REMOVED***
                this.isRunning = true;
            ***REMOVED***
            else
            ***REMOVED***
                return Phaser.TweenData.PENDING;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  Is Running, but is waiting to repeat
            if (time < this.startTime)
            ***REMOVED***
                return Phaser.TweenData.RUNNING;
            ***REMOVED***
        ***REMOVED***

        var ms = (this.parent.frameBased) ? this.game.time.physicsElapsedMS : this.game.time.elapsedMS;

        if (this.parent.reverse)
        ***REMOVED***
            this.dt -= ms * this.parent.timeScale;
            this.dt = Math.max(this.dt, 0);
        ***REMOVED***
        else
        ***REMOVED***
            this.dt += ms * this.parent.timeScale;
            this.dt = Math.min(this.dt, this.duration);
        ***REMOVED***

        this.percent = this.dt / this.duration;

        this.value = this.easingFunction(this.percent);

        for (var property in this.vEnd)
        ***REMOVED***
            var start = this.vStart[property];
            var end = this.vEnd[property];

            if (Array.isArray(end))
            ***REMOVED***
                this.parent.target[property] = this.interpolationFunction.call(this.interpolationContext, end, this.value);
            ***REMOVED***
            else
            ***REMOVED***
                this.parent.target[property] = start + ((end - start) * this.value);
            ***REMOVED***
        ***REMOVED***

        if ((!this.parent.reverse && this.percent === 1) || (this.parent.reverse && this.percent === 0))
        ***REMOVED***
            return this.repeat();
        ***REMOVED***
        
        return Phaser.TweenData.RUNNING;

    ***REMOVED***,

    /**
    * This will generate an array populated with the tweened object values from start to end.
    * It works by running the tween simulation at the given frame rate based on the values set-up in Tween.to and Tween.from.
    * Just one play through of the tween data is returned, including yoyo if set.
    *
    * @method Phaser.TweenData#generateData
    * @param ***REMOVED***number***REMOVED*** [frameRate=60] - The speed in frames per second that the data should be generated at. The higher the value, the larger the array it creates.
    * @return ***REMOVED***array***REMOVED*** An array of tweened values.
    */
    generateData: function (frameRate) ***REMOVED***

        if (this.parent.reverse)
        ***REMOVED***
            this.dt = this.duration;
        ***REMOVED***
        else
        ***REMOVED***
            this.dt = 0;
        ***REMOVED***

        var data = [];
        var complete = false;
        var fps = (1 / frameRate) * 1000;

        do
        ***REMOVED***
            if (this.parent.reverse)
            ***REMOVED***
                this.dt -= fps;
                this.dt = Math.max(this.dt, 0);
            ***REMOVED***
            else
            ***REMOVED***
                this.dt += fps;
                this.dt = Math.min(this.dt, this.duration);
            ***REMOVED***

            this.percent = this.dt / this.duration;

            this.value = this.easingFunction(this.percent);

            var blob = ***REMOVED******REMOVED***;

            for (var property in this.vEnd)
            ***REMOVED***
                var start = this.vStart[property];
                var end = this.vEnd[property];

                if (Array.isArray(end))
                ***REMOVED***
                    blob[property] = this.interpolationFunction(end, this.value);
                ***REMOVED***
                else
                ***REMOVED***
                    blob[property] = start + ((end - start) * this.value);
                ***REMOVED***
            ***REMOVED***

            data.push(blob);

            if ((!this.parent.reverse && this.percent === 1) || (this.parent.reverse && this.percent === 0))
            ***REMOVED***
                complete = true;
            ***REMOVED***

        ***REMOVED*** while (!complete);

        if (this.yoyo)
        ***REMOVED***
            var reversed = data.slice();
            reversed.reverse();
            data = data.concat(reversed);
        ***REMOVED***

        return data;

    ***REMOVED***,

    /**
    * Checks if this Tween is meant to repeat or yoyo and handles doing so.
    *
    * @private
    * @method Phaser.TweenData#repeat
    * @return ***REMOVED***number***REMOVED*** Either Phaser.TweenData.LOOPED or Phaser.TweenData.COMPLETE.
    */
    repeat: function () ***REMOVED***

        //  If not a yoyo and repeatCounter = 0 then we're done
        if (this.yoyo)
        ***REMOVED***
            //  We're already in reverse mode, which means the yoyo has finished and there's no repeats, so end
            if (this.inReverse && this.repeatCounter === 0)
            ***REMOVED***
                //  Restore the properties
                for (var property in this.vStartCache)
                ***REMOVED***
                    this.vStart[property] = this.vStartCache[property];
                    this.vEnd[property] = this.vEndCache[property];
                ***REMOVED***

                this.inReverse = false;

                return Phaser.TweenData.COMPLETE;
            ***REMOVED***

            this.inReverse = !this.inReverse;
        ***REMOVED***
        else
        ***REMOVED***
            if (this.repeatCounter === 0)
            ***REMOVED***
                return Phaser.TweenData.COMPLETE;
            ***REMOVED***
        ***REMOVED***

        if (this.inReverse)
        ***REMOVED***
            //  If inReverse we're going from vEnd to vStartCache
            for (var property in this.vStartCache)
            ***REMOVED***
                this.vStart[property] = this.vEndCache[property];
                this.vEnd[property] = this.vStartCache[property];
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  If not inReverse we're just repopulating the cache again
            for (var property in this.vStartCache)
            ***REMOVED***
                this.vStart[property] = this.vStartCache[property];
                this.vEnd[property] = this.vEndCache[property];
            ***REMOVED***

            //  -1 means repeat forever, otherwise decrement the repeatCounter
            //  We only decrement this counter if the tween isn't doing a yoyo, as that doesn't count towards the repeat total
            if (this.repeatCounter > 0)
            ***REMOVED***
                this.repeatCounter--;
            ***REMOVED***
        ***REMOVED***

        this.startTime = this.game.time.time;

        if (this.yoyo && this.inReverse)
        ***REMOVED***
            this.startTime += this.yoyoDelay;
        ***REMOVED***
        else if (!this.inReverse)
        ***REMOVED***
            this.startTime += this.repeatDelay;
        ***REMOVED***

        if (this.parent.reverse)
        ***REMOVED***
            this.dt = this.duration;
        ***REMOVED***
        else
        ***REMOVED***
            this.dt = 0;
        ***REMOVED***

        return Phaser.TweenData.LOOPED;

    ***REMOVED***

***REMOVED***;

Phaser.TweenData.prototype.constructor = Phaser.TweenData;
