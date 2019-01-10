/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A TimerEvent is a single event that is processed by a Phaser.Timer.
*
* It consists of a delay, which is a value in milliseconds after which the event will fire.
* When the event fires it calls a specific callback with the specified arguments.
* 
* TimerEvents are removed by their parent timer once finished firing or repeating.
* 
* Use ***REMOVED***@link Phaser.Timer#add***REMOVED***, ***REMOVED***@link Phaser.Timer#repeat***REMOVED***, or ***REMOVED***@link Phaser.Timer#loop***REMOVED*** methods to create a new event.
*
* @class Phaser.TimerEvent
* @constructor
* @param ***REMOVED***Phaser.Timer***REMOVED*** timer - The Timer object that this TimerEvent belongs to.
* @param ***REMOVED***number***REMOVED*** delay - The delay in ms at which this TimerEvent fires.
* @param ***REMOVED***number***REMOVED*** tick - The tick is the next game clock time that this event will fire at.
* @param ***REMOVED***number***REMOVED*** repeatCount - If this TimerEvent repeats it will do so this many times.
* @param ***REMOVED***boolean***REMOVED*** loop - True if this TimerEvent loops, otherwise false.
* @param ***REMOVED***function***REMOVED*** callback - The callback that will be called when the TimerEvent occurs.
* @param ***REMOVED***object***REMOVED*** callbackContext - The context in which the callback will be called.
* @param ***REMOVED***any[]***REMOVED*** arguments - Additional arguments to be passed to the callback.
*/
Phaser.TimerEvent = function (timer, delay, tick, repeatCount, loop, callback, callbackContext, args) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Timer***REMOVED*** timer - The Timer object that this TimerEvent belongs to.
    * @protected
    * @readonly
    */
    this.timer = timer;

    /**
    * @property ***REMOVED***number***REMOVED*** delay - The delay in ms at which this TimerEvent fires.
    */
    this.delay = delay;

    /**
    * @property ***REMOVED***number***REMOVED*** tick - The tick is the next game clock time that this event will fire at.
    */
    this.tick = tick;

    /**
    * @property ***REMOVED***number***REMOVED*** repeatCount - If this TimerEvent repeats it will do so this many times.
    */
    this.repeatCount = repeatCount - 1;

    /**
    * @property ***REMOVED***boolean***REMOVED*** loop - True if this TimerEvent loops, otherwise false.
    */
    this.loop = loop;

    /**
    * @property ***REMOVED***function***REMOVED*** callback - The callback that will be called when the TimerEvent occurs.
    */
    this.callback = callback;

    /**
    * @property ***REMOVED***object***REMOVED*** callbackContext - The context in which the callback will be called.
    */
    this.callbackContext = callbackContext;

    /**
    * @property ***REMOVED***any[]***REMOVED*** arguments - Additional arguments to be passed to the callback.
    */
    this.args = args;

    /**
    * @property ***REMOVED***boolean***REMOVED*** pendingDelete - A flag that controls if the TimerEvent is pending deletion.
    * @protected
    */
    this.pendingDelete = false;

***REMOVED***;

Phaser.TimerEvent.prototype.constructor = Phaser.TimerEvent;
