/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Abstracts away the use of RAF or setTimeOut for the core game update loop.
*
* @class Phaser.RequestAnimationFrame
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***boolean***REMOVED*** [forceSetTimeOut=false] - Tell Phaser to use setTimeOut even if raf is available.
*/
Phaser.RequestAnimationFrame = function(game, forceSetTimeOut) ***REMOVED***

    if (forceSetTimeOut === undefined) ***REMOVED*** forceSetTimeOut = false; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - The currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isRunning - true if RequestAnimationFrame is running, otherwise false.
    * @default
    */
    this.isRunning = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** forceSetTimeOut - Tell Phaser to use setTimeOut even if raf is available.
    */
    this.forceSetTimeOut = forceSetTimeOut;

    var vendors = [
        'ms',
        'moz',
        'webkit',
        'o'
    ];

    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++)
    ***REMOVED***
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'];
    ***REMOVED***

    /**
    * @property ***REMOVED***boolean***REMOVED*** _isSetTimeOut  - true if the browser is using setTimeout instead of raf.
    * @private
    */
    this._isSetTimeOut = false;

    /**
    * @property ***REMOVED***function***REMOVED*** _onLoop - The function called by the update.
    * @private
    */
    this._onLoop = null;

    /**
    * @property ***REMOVED***number***REMOVED*** _timeOutID - The callback ID used when calling cancel.
    * @private
    */
    this._timeOutID = null;

***REMOVED***;

Phaser.RequestAnimationFrame.prototype = ***REMOVED***

    /**
    * Starts the requestAnimationFrame running or setTimeout if unavailable in browser
    * @method Phaser.RequestAnimationFrame#start
    */
    start: function () ***REMOVED***

        this.isRunning = true;

        var _this = this;

        if (!window.requestAnimationFrame || this.forceSetTimeOut)
        ***REMOVED***
            this._isSetTimeOut = true;

            this._onLoop = function () ***REMOVED***
                return _this.updateSetTimeout();
            ***REMOVED***;

            this._timeOutID = window.setTimeout(this._onLoop, 0);
        ***REMOVED***
        else
        ***REMOVED***
            this._isSetTimeOut = false;

            this._onLoop = function (time) ***REMOVED***
                return _this.updateRAF(time);
            ***REMOVED***;

            this._timeOutID = window.requestAnimationFrame(this._onLoop);
        ***REMOVED***

    ***REMOVED***,

    /**
    * The update method for the requestAnimationFrame
    * @method Phaser.RequestAnimationFrame#updateRAF
    */
    updateRAF: function (rafTime) ***REMOVED***

        if (this.isRunning)
        ***REMOVED***
            // floor the rafTime to make it equivalent to the Date.now() provided by updateSetTimeout (just below)
            this.game.update(Math.floor(rafTime));

            this._timeOutID = window.requestAnimationFrame(this._onLoop);
        ***REMOVED***

    ***REMOVED***,

    /**
    * The update method for the setTimeout.
    * @method Phaser.RequestAnimationFrame#updateSetTimeout
    */
    updateSetTimeout: function () ***REMOVED***

        if (this.isRunning)
        ***REMOVED***
            this.game.update(Date.now());

            this._timeOutID = window.setTimeout(this._onLoop, this.game.time.timeToCall);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Stops the requestAnimationFrame from running.
    * @method Phaser.RequestAnimationFrame#stop
    */
    stop: function () ***REMOVED***

        if (this._isSetTimeOut)
        ***REMOVED***
            clearTimeout(this._timeOutID);
        ***REMOVED***
        else
        ***REMOVED***
            window.cancelAnimationFrame(this._timeOutID);
        ***REMOVED***

        this.isRunning = false;

    ***REMOVED***,

    /**
    * Is the browser using setTimeout?
    * @method Phaser.RequestAnimationFrame#isSetTimeOut
    * @return ***REMOVED***boolean***REMOVED***
    */
    isSetTimeOut: function () ***REMOVED***
        return this._isSetTimeOut;
    ***REMOVED***,

    /**
    * Is the browser using requestAnimationFrame?
    * @method Phaser.RequestAnimationFrame#isRAF
    * @return ***REMOVED***boolean***REMOVED***
    */
    isRAF: function () ***REMOVED***
        return (this._isSetTimeOut === false);
    ***REMOVED***

***REMOVED***;

Phaser.RequestAnimationFrame.prototype.constructor = Phaser.RequestAnimationFrame;
