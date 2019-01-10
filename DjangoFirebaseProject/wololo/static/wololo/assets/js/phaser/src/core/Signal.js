/**
* @author       Miller Medeiros http://millermedeiros.github.com/js-signals/
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Signals are what Phaser uses to handle events and event dispatching.
* You can listen for a Signal by binding a callback / function to it.
* This is done by using either `Signal.add` or `Signal.addOnce`.
*
* For example you can listen for a touch or click event from the Input Manager 
* by using its `onDown` Signal:
*
* `game.input.onDown.add(function() ***REMOVED*** ... ***REMOVED***);`
*
* Rather than inline your function, you can pass a reference:
*
* `game.input.onDown.add(clicked, this);`
* `function clicked () ***REMOVED*** ... ***REMOVED***`
*
* In this case the second argument (`this`) is the context in which your function should be called.
*
* Now every time the InputManager dispatches the `onDown` signal (or event), your function
* will be called.
*
* Very often a Signal will send arguments to your function.
* This is specific to the Signal itself.
* If you're unsure then check the documentation, or failing that simply do:
*
* `Signal.add(function() ***REMOVED*** console.log(arguments); ***REMOVED***)`
*
* and it will log all of the arguments your function received from the Signal.
*
* Sprites have lots of default signals you can listen to in their Events class, such as:
*
* `sprite.events.onKilled`
* 
* Which is called automatically whenever the Sprite is killed.
* There are lots of other events, see the Events component for a list.
*
* As well as listening to pre-defined Signals you can also create your own:
*
* `var mySignal = new Phaser.Signal();`
*
* This creates a new Signal. You can bind a callback to it:
*
* `mySignal.add(myCallback, this);`
*
* and then finally when ready you can dispatch the Signal:
*
* `mySignal.dispatch(your arguments);`
*
* And your callback will be invoked. See the dispatch method for more details.
*
* @class Phaser.Signal
* @constructor
*/
Phaser.Signal = function () ***REMOVED******REMOVED***;

Phaser.Signal.prototype = ***REMOVED***

    /**
    * @property ***REMOVED***?Array.<Phaser.SignalBinding>***REMOVED*** _bindings - Internal variable.
    * @private
    */
    _bindings: null,

    /**
    * @property ***REMOVED***any***REMOVED*** _prevParams - Internal variable.
    * @private
    */
    _prevParams: null,

    /**
    * Memorize the previously dispatched event?
    *
    * If an event has been memorized it is automatically dispatched when a new listener is added with ***REMOVED***@link #add***REMOVED*** or ***REMOVED***@link #addOnce***REMOVED***.
    * Use ***REMOVED***@link #forget***REMOVED*** to clear any currently memorized event.
    *
    * @property ***REMOVED***boolean***REMOVED*** memorize
    */
    memorize: false,

    /**
    * @property ***REMOVED***boolean***REMOVED*** _shouldPropagate
    * @private
    */
    _shouldPropagate: true,

    /**
    * Is the Signal active? Only active signals will broadcast dispatched events.
    *
    * Setting this property during a dispatch will only affect the next dispatch. To stop the propagation of a signal from a listener use ***REMOVED***@link #halt***REMOVED***.
    *
    * @property ***REMOVED***boolean***REMOVED*** active
    * @default
    */
    active: true,

    /**
    * @property ***REMOVED***function***REMOVED*** _boundDispatch - The bound dispatch function, if any.
    * @private
    */
    _boundDispatch: false,

    /**
    * @method Phaser.Signal#validateListener
    * @param ***REMOVED***function***REMOVED*** listener - Signal handler function.
    * @param ***REMOVED***string***REMOVED*** fnName - Function name.
    * @private
    */
    validateListener: function (listener, fnName) ***REMOVED***

        if (typeof listener !== 'function')
        ***REMOVED***
            throw new Error('Phaser.Signal: listener is a required param of ***REMOVED***fn***REMOVED***() and should be a Function.'.replace('***REMOVED***fn***REMOVED***', fnName));
        ***REMOVED***

    ***REMOVED***,

    /**
    * @method Phaser.Signal#_registerListener
    * @private
    * @param ***REMOVED***function***REMOVED*** listener - Signal handler function.
    * @param ***REMOVED***boolean***REMOVED*** isOnce - Should the listener only be called once?
    * @param ***REMOVED***object***REMOVED*** [listenerContext] - The context under which the listener is invoked.
    * @param ***REMOVED***number***REMOVED*** [priority] - The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0).
    * @return ***REMOVED***Phaser.SignalBinding***REMOVED*** An Object representing the binding between the Signal and listener.
    */
    _registerListener: function (listener, isOnce, listenerContext, priority, args) ***REMOVED***

        var prevIndex = this._indexOfListener(listener, listenerContext);
        var binding;

        if (prevIndex !== -1)
        ***REMOVED***
            binding = this._bindings[prevIndex];

            if (binding.isOnce() !== isOnce)
            ***REMOVED***
                throw new Error('You cannot add' + (isOnce ? '' : 'Once') + '() then add' + (!isOnce ? '' : 'Once') + '() the same listener without removing the relationship first.');
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            binding = new Phaser.SignalBinding(this, listener, isOnce, listenerContext, priority, args);
            this._addBinding(binding);
        ***REMOVED***

        if (this.memorize && this._prevParams)
        ***REMOVED***
            binding.execute(this._prevParams);
        ***REMOVED***

        return binding;

    ***REMOVED***,

    /**
    * @method Phaser.Signal#_addBinding
    * @private
    * @param ***REMOVED***Phaser.SignalBinding***REMOVED*** binding - An Object representing the binding between the Signal and listener.
    */
    _addBinding: function (binding) ***REMOVED***

        if (!this._bindings)
        ***REMOVED***
            this._bindings = [];
        ***REMOVED***

        //  Simplified insertion sort
        var n = this._bindings.length;

        do ***REMOVED***
            n--;
        ***REMOVED***
        while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);

        this._bindings.splice(n + 1, 0, binding);

    ***REMOVED***,

    /**
    * @method Phaser.Signal#_indexOfListener
    * @private
    * @param ***REMOVED***function***REMOVED*** listener - Signal handler function.
    * @param ***REMOVED***object***REMOVED*** [context=null] - Signal handler function.
    * @return ***REMOVED***number***REMOVED*** The index of the listener within the private bindings array.
    */
    _indexOfListener: function (listener, context) ***REMOVED***

        if (!this._bindings)
        ***REMOVED***
            return -1;
        ***REMOVED***

        if (context === undefined) ***REMOVED*** context = null; ***REMOVED***

        var n = this._bindings.length;
        var cur;

        while (n--)
        ***REMOVED***
            cur = this._bindings[n];

            if (cur._listener === listener && cur.context === context)
            ***REMOVED***
                return n;
            ***REMOVED***
        ***REMOVED***

        return -1;

    ***REMOVED***,

    /**
    * Check if a specific listener is attached.
    *
    * @method Phaser.Signal#has
    * @param ***REMOVED***function***REMOVED*** listener - Signal handler function.
    * @param ***REMOVED***object***REMOVED*** [context] - Context on which listener will be executed (object that should represent the `this` variable inside listener function).
    * @return ***REMOVED***boolean***REMOVED*** If Signal has the specified listener.
    */
    has: function (listener, context) ***REMOVED***

        return this._indexOfListener(listener, context) !== -1;

    ***REMOVED***,

    /**
    * Add an event listener for this signal.
    *
    * An event listener is a callback with a related context and priority.
    *
    * You can optionally provide extra arguments which will be passed to the callback after any internal parameters.
    *
    * For example: `Phaser.Key.onDown` when dispatched will send the Phaser.Key object that caused the signal as the first parameter.
    * Any arguments you've specified after `priority` will be sent as well:
    *
    * `fireButton.onDown.add(shoot, this, 0, 'lazer', 100);`
    *
    * When onDown dispatches it will call the `shoot` callback passing it: `Phaser.Key, 'lazer', 100`.
    *
    * Where the first parameter is the one that Key.onDown dispatches internally and 'lazer', 
    * and the value 100 were the custom arguments given in the call to 'add'.
    *
    * @method Phaser.Signal#add
    * @param ***REMOVED***function***REMOVED*** listener - The function to call when this Signal is dispatched.
    * @param ***REMOVED***object***REMOVED*** [listenerContext] - The context under which the listener will be executed (i.e. the object that should represent the `this` variable).
    * @param ***REMOVED***number***REMOVED*** [priority] - The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added (default = 0)
    * @param ***REMOVED***...any***REMOVED*** [args=(none)] - Additional arguments to pass to the callback (listener) function. They will be appended after any arguments usually dispatched.
    * @return ***REMOVED***Phaser.SignalBinding***REMOVED*** An Object representing the binding between the Signal and listener.
    */
    add: function (listener, listenerContext, priority) ***REMOVED***

        this.validateListener(listener, 'add');

        var args = [];

        if (arguments.length > 3)
        ***REMOVED***
            for (var i = 3; i < arguments.length; i++)
            ***REMOVED***
                args.push(arguments[i]);
            ***REMOVED***
        ***REMOVED***

        return this._registerListener(listener, false, listenerContext, priority, args);

    ***REMOVED***,

    /**
    * Add a one-time listener - the listener is automatically removed after the first execution.
    *
    * If there is as ***REMOVED***@link Phaser.Signal#memorize memorized***REMOVED*** event then it will be dispatched and
    * the listener will be removed immediately.
    *
    * @method Phaser.Signal#addOnce
    * @param ***REMOVED***function***REMOVED*** listener - The function to call when this Signal is dispatched.
    * @param ***REMOVED***object***REMOVED*** [listenerContext] - The context under which the listener will be executed (i.e. the object that should represent the `this` variable).
    * @param ***REMOVED***number***REMOVED*** [priority] - The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added (default = 0)
    * @param ***REMOVED***...any***REMOVED*** [args=(none)] - Additional arguments to pass to the callback (listener) function. They will be appended after any arguments usually dispatched.
    * @return ***REMOVED***Phaser.SignalBinding***REMOVED*** An Object representing the binding between the Signal and listener.
    */
    addOnce: function (listener, listenerContext, priority) ***REMOVED***

        this.validateListener(listener, 'addOnce');

        var args = [];

        if (arguments.length > 3)
        ***REMOVED***
            for (var i = 3; i < arguments.length; i++)
            ***REMOVED***
                args.push(arguments[i]);
            ***REMOVED***
        ***REMOVED***

        return this._registerListener(listener, true, listenerContext, priority, args);

    ***REMOVED***,

    /**
    * Remove a single event listener.
    *
    * @method Phaser.Signal#remove
    * @param ***REMOVED***function***REMOVED*** listener - Handler function that should be removed.
    * @param ***REMOVED***object***REMOVED*** [context=null] - Execution context (since you can add the same handler multiple times if executing in a different context).
    * @return ***REMOVED***function***REMOVED*** Listener handler function.
    */
    remove: function (listener, context) ***REMOVED***

        this.validateListener(listener, 'remove');

        var i = this._indexOfListener(listener, context);

        if (i !== -1)
        ***REMOVED***
            this._bindings[i]._destroy(); //no reason to a Phaser.SignalBinding exist if it isn't attached to a signal
            this._bindings.splice(i, 1);
        ***REMOVED***

        return listener;

    ***REMOVED***,

    /**
    * Remove all event listeners.
    *
    * @method Phaser.Signal#removeAll
    * @param ***REMOVED***object***REMOVED*** [context=null] - If specified only listeners for the given context will be removed.
    */
    removeAll: function (context) ***REMOVED***

        if (context === undefined) ***REMOVED*** context = null; ***REMOVED***

        if (!this._bindings)
        ***REMOVED***
            return;
        ***REMOVED***

        var n = this._bindings.length;

        while (n--)
        ***REMOVED***
            if (context)
            ***REMOVED***
                if (this._bindings[n].context === context)
                ***REMOVED***
                    this._bindings[n]._destroy();
                    this._bindings.splice(n, 1);
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                this._bindings[n]._destroy();
            ***REMOVED***
        ***REMOVED***

        if (!context)
        ***REMOVED***
            this._bindings.length = 0;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Gets the total number of listeners attached to this Signal.
    *
    * @method Phaser.Signal#getNumListeners
    * @return ***REMOVED***integer***REMOVED*** Number of listeners attached to the Signal.
    */
    getNumListeners: function () ***REMOVED***

        return this._bindings ? this._bindings.length : 0;

    ***REMOVED***,

    /**
    * Stop propagation of the event, blocking the dispatch to next listener on the queue.
    *
    * This should be called only during event dispatch as calling it before/after dispatch won't affect another broadcast.
    * See ***REMOVED***@link #active***REMOVED*** to enable/disable the signal entirely.
    *
    * @method Phaser.Signal#halt
    */
    halt: function () ***REMOVED***

        this._shouldPropagate = false;

    ***REMOVED***,

    /**
    * Dispatch / broadcast the event to all listeners.
    *
    * To create an instance-bound dispatch for this Signal, use ***REMOVED***@link #boundDispatch***REMOVED***.
    *
    * @method Phaser.Signal#dispatch
    * @param ***REMOVED***any***REMOVED*** [params] - Parameters that should be passed to each handler.
    */
    dispatch: function () ***REMOVED***

        if (!this.active || !this._bindings)
        ***REMOVED***
            return;
        ***REMOVED***

        var paramsArr = Array.prototype.slice.call(arguments);
        var n = this._bindings.length;
        var bindings;

        if (this.memorize)
        ***REMOVED***
            this._prevParams = paramsArr;
        ***REMOVED***

        if (!n)
        ***REMOVED***
            //  Should come after memorize
            return;
        ***REMOVED***

        bindings = this._bindings.slice(); //clone array in case add/remove items during dispatch
        this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.

        //execute all callbacks until end of the list or until a callback returns `false` or stops propagation
        //reverse loop since listeners with higher priority will be added at the end of the list
        do ***REMOVED***
            n--;
        ***REMOVED***
        while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);

    ***REMOVED***,

    /**
    * Forget the currently ***REMOVED***@link Phaser.Signal#memorize memorized***REMOVED*** event, if any.
    *
    * @method Phaser.Signal#forget
    */
    forget: function() ***REMOVED***

        if (this._prevParams)
        ***REMOVED***
            this._prevParams = null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Dispose the signal - no more events can be dispatched.
    *
    * This removes all event listeners and clears references to external objects.
    * Calling methods on a disposed objects results in undefined behavior.
    *
    * @method Phaser.Signal#dispose
    */
    dispose: function () ***REMOVED***

        this.removeAll();

        this._bindings = null;
        if (this._prevParams)
        ***REMOVED***
            this._prevParams = null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * A string representation of the object.
    *
    * @method Phaser.Signal#toString
    * @return ***REMOVED***string***REMOVED*** String representation of the object.
    */
    toString: function () ***REMOVED***

        return '[Phaser.Signal active:'+ this.active +' numListeners:'+ this.getNumListeners() +']';

    ***REMOVED***

***REMOVED***;

/**
* Create a `dispatch` function that maintains a binding to the original Signal context.
*
* Use the resulting value if the dispatch function needs to be passed somewhere
* or called independently of the Signal object.
*
* @memberof Phaser.Signal
* @property ***REMOVED***function***REMOVED*** boundDispatch
*/
Object.defineProperty(Phaser.Signal.prototype, "boundDispatch", ***REMOVED***

    get: function () ***REMOVED***
        var _this = this;
        return this._boundDispatch || (this._boundDispatch = function () ***REMOVED***
            return _this.dispatch.apply(_this, arguments);
        ***REMOVED***);
    ***REMOVED***

***REMOVED***);

Phaser.Signal.prototype.constructor = Phaser.Signal;
