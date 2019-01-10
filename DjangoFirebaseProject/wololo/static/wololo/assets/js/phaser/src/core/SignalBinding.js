/**
* @author       Miller Medeiros http://millermedeiros.github.com/js-signals/
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Object that represents a binding between a Signal and a listener function.
* This is an internal constructor and shouldn't be created directly.
* Inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
* 
* @class Phaser.SignalBinding
* @constructor
* @param ***REMOVED***Phaser.Signal***REMOVED*** signal - Reference to Signal object that listener is currently bound to.
* @param ***REMOVED***function***REMOVED*** listener - Handler function bound to the signal.
* @param ***REMOVED***boolean***REMOVED*** isOnce - If binding should be executed just once.
* @param ***REMOVED***object***REMOVED*** [listenerContext=null] - Context on which listener will be executed (object that should represent the `this` variable inside listener function).
* @param ***REMOVED***number***REMOVED*** [priority] - The priority level of the event listener. (default = 0).
* @param ***REMOVED***...any***REMOVED*** [args=(none)] - Additional arguments to pass to the callback (listener) function. They will be appended after any arguments usually dispatched.
*/
Phaser.SignalBinding = function (signal, listener, isOnce, listenerContext, priority, args) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** _listener - Handler function bound to the signal.
    * @private
    */
    this._listener = listener;

    if (isOnce)
    ***REMOVED***
        this._isOnce = true;
    ***REMOVED***

    if (listenerContext != null) /* not null/undefined */
    ***REMOVED***
        this.context = listenerContext;
    ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** _signal - Reference to Signal object that listener is currently bound to.
    * @private
    */
    this._signal = signal;

    if (priority)
    ***REMOVED***
        this._priority = priority;
    ***REMOVED***

    if (args && args.length)
    ***REMOVED***
        this._args = args;
    ***REMOVED***

***REMOVED***;

Phaser.SignalBinding.prototype = ***REMOVED***

    /**
    * @property ***REMOVED***?object***REMOVED*** context - Context on which listener will be executed (object that should represent the `this` variable inside listener function).
    */
    context: null,

    /**
    * @property ***REMOVED***boolean***REMOVED*** _isOnce - If binding should be executed just once.
    * @private
    */
    _isOnce: false,

    /**
    * @property ***REMOVED***number***REMOVED*** _priority - Listener priority.
    * @private
    */
    _priority: 0,

    /**
    * @property ***REMOVED***array***REMOVED*** _args - Listener arguments.
    * @private
    */
    _args: null,

    /**
    * @property ***REMOVED***number***REMOVED*** callCount - The number of times the handler function has been called.
    */
    callCount: 0,

    /**
    * If binding is active and should be executed.
    * @property ***REMOVED***boolean***REMOVED*** active
    * @default
    */
    active: true,

    /**
    * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute` (curried parameters).
    * @property ***REMOVED***array|null***REMOVED*** params
    * @default
    */
    params: null,

    /**
    * Call listener passing arbitrary parameters.
    * If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.
    * @method Phaser.SignalBinding#execute
    * @param ***REMOVED***any[]***REMOVED*** [paramsArr] - Array of parameters that should be passed to the listener.
    * @return ***REMOVED***any***REMOVED*** Value returned by the listener.
    */
    execute: function(paramsArr) ***REMOVED***

        var handlerReturn, params;

        if (this.active && !!this._listener)
        ***REMOVED***
            params = this.params ? this.params.concat(paramsArr) : paramsArr;

            if (this._args)
            ***REMOVED***
                params = params.concat(this._args);
            ***REMOVED***

            handlerReturn = this._listener.apply(this.context, params);

            this.callCount++;

            if (this._isOnce)
            ***REMOVED***
                this.detach();
            ***REMOVED***
        ***REMOVED***

        return handlerReturn;

    ***REMOVED***,

    /**
    * Detach binding from signal.
    * alias to: @see mySignal.remove(myBinding.getListener());
    * @method Phaser.SignalBinding#detach
    * @return ***REMOVED***function|null***REMOVED*** Handler function bound to the signal or `null` if binding was previously detached.
    */
    detach: function () ***REMOVED***
        return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
    ***REMOVED***,

    /**
    * @method Phaser.SignalBinding#isBound
    * @return ***REMOVED***boolean***REMOVED*** True if binding is still bound to the signal and has a listener.
    */
    isBound: function () ***REMOVED***
        return (!!this._signal && !!this._listener);
    ***REMOVED***,

    /**
    * @method Phaser.SignalBinding#isOnce
    * @return ***REMOVED***boolean***REMOVED*** If SignalBinding will only be executed once.
    */
    isOnce: function () ***REMOVED***
        return this._isOnce;
    ***REMOVED***,

    /**
    * @method Phaser.SignalBinding#getListener
    * @return ***REMOVED***function***REMOVED*** Handler function bound to the signal.
    */
    getListener: function () ***REMOVED***
        return this._listener;
    ***REMOVED***,

    /**
    * @method Phaser.SignalBinding#getSignal
    * @return ***REMOVED***Phaser.Signal***REMOVED*** Signal that listener is currently bound to.
    */
    getSignal: function () ***REMOVED***
        return this._signal;
    ***REMOVED***,

    /**
    * Delete instance properties
    * @method Phaser.SignalBinding#_destroy
    * @private
    */
    _destroy: function () ***REMOVED***
        delete this._signal;
        delete this._listener;
        delete this.context;
    ***REMOVED***,

    /**
    * @method Phaser.SignalBinding#toString
    * @return ***REMOVED***string***REMOVED*** String representation of the object.
    */
    toString: function () ***REMOVED***
        return '[Phaser.SignalBinding isOnce:' + this._isOnce +', isBound:'+ this.isBound() +', active:' + this.active + ']';
    ***REMOVED***

***REMOVED***;

Phaser.SignalBinding.prototype.constructor = Phaser.SignalBinding;
