/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 * @author Chad Engler https://github.com/englercj @Rolnaaba
 */

/**
 * Originally based on https://github.com/mrdoob/eventtarget.js/ from mr Doob.
 * Currently takes inspiration from the nodejs EventEmitter, EventEmitter3, and smokesignals
 */

/**
 * Mixins event emitter functionality to a class
 *
 * @class EventTarget
 * @example
 *      function MyEmitter() ***REMOVED******REMOVED***
 *
 *      PIXI.EventTarget.mixin(MyEmitter.prototype);
 *
 *      var em = new MyEmitter();
 *      em.emit('eventName', 'some data', 'some more data', ***REMOVED******REMOVED***, null, ...);
 */
PIXI.EventTarget = ***REMOVED***
    /**
     * Backward compat from when this used to be a function
     */
    call: function callCompat(obj) ***REMOVED***
        if(obj) ***REMOVED***
            obj = obj.prototype || obj;
            PIXI.EventTarget.mixin(obj);
        ***REMOVED***
    ***REMOVED***,

    /**
     * Mixes in the properties of the EventTarget prototype onto another object
     *
     * @method mixin
     * @param object ***REMOVED***Object***REMOVED*** The obj to mix into
     */
    mixin: function mixin(obj) ***REMOVED***
        /**
         * Return a list of assigned event listeners.
         *
         * @method listeners
         * @param eventName ***REMOVED***String***REMOVED*** The events that should be listed.
         * @return ***REMOVED***Array***REMOVED*** An array of listener functions
         */
        obj.listeners = function listeners(eventName) ***REMOVED***
            this._listeners = this._listeners || ***REMOVED******REMOVED***;

            return this._listeners[eventName] ? this._listeners[eventName].slice() : [];
        ***REMOVED***;

        /**
         * Emit an event to all registered event listeners.
         *
         * @method emit
         * @alias dispatchEvent
         * @param eventName ***REMOVED***String***REMOVED*** The name of the event.
         * @return ***REMOVED***Boolean***REMOVED*** Indication if we've emitted an event.
         */
        obj.emit = obj.dispatchEvent = function emit(eventName, data) ***REMOVED***
            this._listeners = this._listeners || ***REMOVED******REMOVED***;

            //backwards compat with old method ".emit(***REMOVED*** type: 'something' ***REMOVED***)"
            if(typeof eventName === 'object') ***REMOVED***
                data = eventName;
                eventName = eventName.type;
            ***REMOVED***

            //ensure we are using a real pixi event
            if(!data || data.__isEventObject !== true) ***REMOVED***
                data = new PIXI.Event(this, eventName, data);
            ***REMOVED***

            //iterate the listeners
            if(this._listeners && this._listeners[eventName]) ***REMOVED***
                var listeners = this._listeners[eventName].slice(0),
                    length = listeners.length,
                    fn = listeners[0],
                    i;

                for(i = 0; i < length; fn = listeners[++i]) ***REMOVED***
                    //call the event listener
                    fn.call(this, data);

                    //if "stopImmediatePropagation" is called, stop calling sibling events
                    if(data.stoppedImmediate) ***REMOVED***
                        return this;
                    ***REMOVED***
                ***REMOVED***

                //if "stopPropagation" is called then don't bubble the event
                if(data.stopped) ***REMOVED***
                    return this;
                ***REMOVED***
            ***REMOVED***

            //bubble this event up the scene graph
            if(this.parent && this.parent.emit) ***REMOVED***
                this.parent.emit.call(this.parent, eventName, data);
            ***REMOVED***

            return this;
        ***REMOVED***;

        /**
         * Register a new EventListener for the given event.
         *
         * @method on
         * @alias addEventListener
         * @param eventName ***REMOVED***String***REMOVED*** Name of the event.
         * @param callback ***REMOVED***Functon***REMOVED*** fn Callback function.
         */
        obj.on = obj.addEventListener = function on(eventName, fn) ***REMOVED***
            this._listeners = this._listeners || ***REMOVED******REMOVED***;

            (this._listeners[eventName] = this._listeners[eventName] || [])
                .push(fn);

            return this;
        ***REMOVED***;

        /**
         * Add an EventListener that's only called once.
         *
         * @method once
         * @param eventName ***REMOVED***String***REMOVED*** Name of the event.
         * @param callback ***REMOVED***Function***REMOVED*** Callback function.
         */
        obj.once = function once(eventName, fn) ***REMOVED***
            this._listeners = this._listeners || ***REMOVED******REMOVED***;

            var self = this;
            function onceHandlerWrapper() ***REMOVED***
                fn.apply(self.off(eventName, onceHandlerWrapper), arguments);
            ***REMOVED***
            onceHandlerWrapper._originalHandler = fn;

            return this.on(eventName, onceHandlerWrapper);
        ***REMOVED***;

        /**
         * Remove event listeners.
         *
         * @method off
         * @alias removeEventListener
         * @param eventName ***REMOVED***String***REMOVED*** The event we want to remove.
         * @param callback ***REMOVED***Function***REMOVED*** The listener that we need to find.
         */
        obj.off = obj.removeEventListener = function off(eventName, fn) ***REMOVED***
            this._listeners = this._listeners || ***REMOVED******REMOVED***;

            if(!this._listeners[eventName])
                return this;

            var list = this._listeners[eventName],
                i = fn ? list.length : 0;

            while(i-- > 0) ***REMOVED***
                if(list[i] === fn || list[i]._originalHandler === fn) ***REMOVED***
                    list.splice(i, 1);
                ***REMOVED***
            ***REMOVED***

            if(list.length === 0) ***REMOVED***
                delete this._listeners[eventName];
            ***REMOVED***

            return this;
        ***REMOVED***;

        /**
         * Remove all listeners or only the listeners for the specified event.
         *
         * @method removeAllListeners
         * @param eventName ***REMOVED***String***REMOVED*** The event you want to remove all listeners for.
         */
        obj.removeAllListeners = function removeAllListeners(eventName) ***REMOVED***
            this._listeners = this._listeners || ***REMOVED******REMOVED***;

            if(!this._listeners[eventName])
                return this;

            delete this._listeners[eventName];

            return this;
        ***REMOVED***;
    ***REMOVED***
***REMOVED***;

/**
 * Creates an homogenous object for tracking events so users can know what to expect.
 *
 * @class Event
 * @extends Object
 * @constructor
 * @param target ***REMOVED***Object***REMOVED*** The target object that the event is called on
 * @param name ***REMOVED***String***REMOVED*** The string name of the event that was triggered
 * @param data ***REMOVED***Object***REMOVED*** Arbitrary event data to pass along
 */
PIXI.Event = function(target, name, data) ***REMOVED***
    //for duck typing in the ".on()" function
    this.__isEventObject = true;

    /**
     * Tracks the state of bubbling propagation. Do not
     * set this directly, instead use `event.stopPropagation()`
     *
     * @property stopped
     * @type Boolean
     * @private
     * @readOnly
     */
    this.stopped = false;

    /**
     * Tracks the state of sibling listener propagation. Do not
     * set this directly, instead use `event.stopImmediatePropagation()`
     *
     * @property stoppedImmediate
     * @type Boolean
     * @private
     * @readOnly
     */
    this.stoppedImmediate = false;

    /**
     * The original target the event triggered on.
     *
     * @property target
     * @type Object
     * @readOnly
     */
    this.target = target;

    /**
     * The string name of the event that this represents.
     *
     * @property type
     * @type String
     * @readOnly
     */
    this.type = name;

    /**
     * The data that was passed in with this event.
     *
     * @property data
     * @type Object
     * @readOnly
     */
    this.data = data;

    //backwards compat with older version of events
    this.content = data;

    /**
     * The timestamp when the event occurred.
     *
     * @property timeStamp
     * @type Number
     * @readOnly
     */
    this.timeStamp = Date.now();
***REMOVED***;

/**
 * Stops the propagation of events up the scene graph (prevents bubbling).
 *
 * @method stopPropagation
 */
PIXI.Event.prototype.stopPropagation = function stopPropagation() ***REMOVED***
    this.stopped = true;
***REMOVED***;

/**
 * Stops the propagation of events to sibling listeners (no longer calls any listeners).
 *
 * @method stopImmediatePropagation
 */
PIXI.Event.prototype.stopImmediatePropagation = function stopImmediatePropagation() ***REMOVED***
    this.stoppedImmediate = true;
***REMOVED***;
