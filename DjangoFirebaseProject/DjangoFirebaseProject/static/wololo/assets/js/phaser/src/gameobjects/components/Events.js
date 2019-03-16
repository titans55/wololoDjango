/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Events component is a collection of events fired by the parent Game Object.
* 
* Phaser uses what are known as 'Signals' for all event handling. All of the events in
* this class are signals you can subscribe to, much in the same way you'd "listen" for
* an event.
*
* For example to tell when a Sprite has been added to a new group, you can bind a function
* to the `onAddedToGroup` signal:
*
* `sprite.events.onAddedToGroup.add(yourFunction, this);`
*
* Where `yourFunction` is the function you want called when this event occurs.
* 
* For more details about how signals work please see the Phaser.Signal class.
*
* The Input-related events will only be dispatched if the Sprite has had `inputEnabled` set to `true`
* and the Animation-related events only apply to game objects with animations like ***REMOVED***@link Phaser.Sprite***REMOVED***.
*
* @class Phaser.Events
* @constructor
* @param ***REMOVED***Phaser.Sprite***REMOVED*** sprite - A reference to the game object / Sprite that owns this Events object.
*/
Phaser.Events = function (sprite) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Sprite***REMOVED*** parent - The Sprite that owns these events.
    */
    this.parent = sprite;

    // The signals are automatically added by the corresponding proxy properties

***REMOVED***;

Phaser.Events.prototype = ***REMOVED***

    /**
     * Removes all events.
     *
     * @method Phaser.Events#destroy
     */
    destroy: function () ***REMOVED***

        this._parent = null;

        if (this._onDestroy)           ***REMOVED*** this._onDestroy.dispose(); ***REMOVED***
        if (this._onAddedToGroup)      ***REMOVED*** this._onAddedToGroup.dispose(); ***REMOVED***
        if (this._onRemovedFromGroup)  ***REMOVED*** this._onRemovedFromGroup.dispose(); ***REMOVED***
        if (this._onRemovedFromWorld)  ***REMOVED*** this._onRemovedFromWorld.dispose(); ***REMOVED***
        if (this._onKilled)            ***REMOVED*** this._onKilled.dispose(); ***REMOVED***
        if (this._onRevived)           ***REMOVED*** this._onRevived.dispose(); ***REMOVED***
        if (this._onEnterBounds)       ***REMOVED*** this._onEnterBounds.dispose(); ***REMOVED***
        if (this._onOutOfBounds)       ***REMOVED*** this._onOutOfBounds.dispose(); ***REMOVED***

        if (this._onInputOver)         ***REMOVED*** this._onInputOver.dispose(); ***REMOVED***
        if (this._onInputOut)          ***REMOVED*** this._onInputOut.dispose(); ***REMOVED***
        if (this._onInputDown)         ***REMOVED*** this._onInputDown.dispose(); ***REMOVED***
        if (this._onInputUp)           ***REMOVED*** this._onInputUp.dispose(); ***REMOVED***
        if (this._onDragStart)         ***REMOVED*** this._onDragStart.dispose(); ***REMOVED***
        if (this._onDragUpdate)        ***REMOVED*** this._onDragUpdate.dispose(); ***REMOVED***
        if (this._onDragStop)          ***REMOVED*** this._onDragStop.dispose(); ***REMOVED***

        if (this._onAnimationStart)    ***REMOVED*** this._onAnimationStart.dispose(); ***REMOVED***
        if (this._onAnimationComplete) ***REMOVED*** this._onAnimationComplete.dispose(); ***REMOVED***
        if (this._onAnimationLoop)     ***REMOVED*** this._onAnimationLoop.dispose(); ***REMOVED***

    ***REMOVED***,

    // The following properties are sentinels that will be replaced with getters

    /**
    * This signal is dispatched when this Game Object is added to a new Group.
    * It is sent two arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that was added to the Group.
    * ***REMOVED***Phaser.Group***REMOVED*** The Group it was added to.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onAddedToGroup
    */
    onAddedToGroup: null,

    /**
    * This signal is dispatched when the Game Object is removed from a Group.
    * It is sent two arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that was removed from the Group.
    * ***REMOVED***Phaser.Group***REMOVED*** The Group it was removed from.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onRemovedFromGroup
    */
    onRemovedFromGroup: null,

    /**
    * This Signal is never used internally by Phaser and is now deprecated.
    * @deprecated
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onRemovedFromWorld
    */
    onRemovedFromWorld: null,

    /**
    * This signal is dispatched when the Game Object is destroyed.
    * This happens when `Sprite.destroy()` is called, or `Group.destroy()` with `destroyChildren` set to true.
    * It is sent one argument:
    * ***REMOVED***any***REMOVED*** The Game Object that was destroyed.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onDestroy
    */
    onDestroy: null,

    /**
    * This signal is dispatched when the Game Object is killed.
    * This happens when `Sprite.kill()` is called.
    * Please understand the difference between `kill` and `destroy` by looking at their respective methods.
    * It is sent one argument:
    * ***REMOVED***any***REMOVED*** The Game Object that was killed.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onKilled
    */
    onKilled: null,

    /**
    * This signal is dispatched when the Game Object is revived from a previously killed state.
    * This happens when `Sprite.revive()` is called.
    * It is sent one argument:
    * ***REMOVED***any***REMOVED*** The Game Object that was revived.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onRevived
    */
    onRevived: null,

    /**
    * This signal is dispatched when the Game Object leaves the Phaser.World bounds.
    * This signal is only if `Sprite.checkWorldBounds` is set to `true`.
    * It is sent one argument:
    * ***REMOVED***any***REMOVED*** The Game Object that left the World bounds.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onOutOfBounds
    */
    onOutOfBounds: null,

    /**
    * This signal is dispatched when the Game Object returns within the Phaser.World bounds, having previously been outside of them.
    * This signal is only if `Sprite.checkWorldBounds` is set to `true`.
    * It is sent one argument:
    * ***REMOVED***any***REMOVED*** The Game Object that entered the World bounds.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onEnterBounds
    */
    onEnterBounds: null,

    /**
    * This signal is dispatched if the Game Object has `inputEnabled` set to `true`, 
    * and receives an over event from a Phaser.Pointer.
    * It is sent two arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Pointer***REMOVED*** The Phaser.Pointer object that caused the event.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onInputOver
    */
    onInputOver: null,

    /**
    * This signal is dispatched if the Game Object has `inputEnabled` set to `true`, 
    * and receives an out event from a Phaser.Pointer, which was previously over it.
    * It is sent two arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Pointer***REMOVED*** The Phaser.Pointer object that caused the event.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onInputOut
    */
    onInputOut: null,

    /**
    * This signal is dispatched if the Game Object has `inputEnabled` set to `true`, 
    * and receives a down event from a Phaser.Pointer. This effectively means the Pointer has been
    * pressed down (but not yet released) on the Game Object.
    * It is sent two arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Pointer***REMOVED*** The Phaser.Pointer object that caused the event.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onInputDown
    */
    onInputDown: null,

    /**
    * This signal is dispatched if the Game Object has `inputEnabled` set to `true`, 
    * and receives an up event from a Phaser.Pointer. This effectively means the Pointer had been
    * pressed down, and was then released on the Game Object.
    * It is sent three arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Pointer***REMOVED*** The Phaser.Pointer object that caused the event.
    * ***REMOVED***boolean***REMOVED*** isOver - Is the Pointer still over the Game Object?
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onInputUp
    */
    onInputUp: null,

    /**
    * This signal is dispatched if the Game Object has been `inputEnabled` and `enableDrag` has been set.
    * It is sent when a Phaser.Pointer starts to drag the Game Object, taking into consideration the various
    * drag limitations that may be set.
    * It is sent four arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Pointer***REMOVED*** The Phaser.Pointer object that caused the event.
    * ***REMOVED***number***REMOVED*** The x coordinate that the drag started from.
    * ***REMOVED***number***REMOVED*** The y coordinate that the drag started from.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onDragStart
    */
    onDragStart: null,

    /**
    * This signal is dispatched if the Game Object has been `inputEnabled` and `enableDrag` has been set.
    * It is sent when a Phaser.Pointer is actively dragging the Game Object.
    * Be warned: This is a high volume Signal. Be careful what you bind to it.
    * It is sent six arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Pointer***REMOVED*** The Phaser.Pointer object that caused the event.
    * ***REMOVED***number***REMOVED*** The new x coordinate of the Game Object.
    * ***REMOVED***number***REMOVED*** The new y coordinate of the Game Object.
    * ***REMOVED***Phaser.Point***REMOVED*** A Point object that contains the point the Game Object was snapped to, if `snapOnDrag` has been enabled.
    * ***REMOVED***boolean***REMOVED*** The `fromStart` boolean, indicates if this is the first update immediately after the drag has started.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onDragUpdate
    */
    onDragUpdate: null,

    /**
    * This signal is dispatched if the Game Object has been `inputEnabled` and `enableDrag` has been set.
    * It is sent when a Phaser.Pointer stops dragging the Game Object.
    * It is sent two arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Pointer***REMOVED*** The Phaser.Pointer object that caused the event.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onDragStop
    */
    onDragStop: null,

    /**
    * This signal is dispatched if the Game Object has the AnimationManager component, 
    * and an Animation has been played.
    * You can also listen to `Animation.onStart` rather than via the Game Objects events.
    * It is sent two arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Animation***REMOVED*** The Phaser.Animation that was started.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onAnimationStart
    */
    onAnimationStart: null,

    /**
    * This signal is dispatched if the Game Object has the AnimationManager component, 
    * and an Animation has been stopped (via `animation.stop()` and the `dispatchComplete` argument has been set.
    * You can also listen to `Animation.onComplete` rather than via the Game Objects events.
    * It is sent two arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Animation***REMOVED*** The Phaser.Animation that was stopped.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onAnimationComplete
    */
    onAnimationComplete: null,

    /**
    * This signal is dispatched if the Game Object has the AnimationManager component, 
    * and an Animation has looped playback.
    * You can also listen to `Animation.onLoop` rather than via the Game Objects events.
    * It is sent two arguments:
    * ***REMOVED***any***REMOVED*** The Game Object that received the event.
    * ***REMOVED***Phaser.Animation***REMOVED*** The Phaser.Animation that looped.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onAnimationLoop
    */
    onAnimationLoop: null

***REMOVED***;

Phaser.Events.prototype.constructor = Phaser.Events;

// Create an auto-create proxy getter and dispatch method for all events.
// The backing property is the same as the event name, prefixed with '_'
// and the dispatch method is the same as the event name postfixed with '$dispatch'.
for (var prop in Phaser.Events.prototype)
***REMOVED***
    if (!Phaser.Events.prototype.hasOwnProperty(prop) ||
        prop.indexOf('on') !== 0 ||
        Phaser.Events.prototype[prop] !== null)
    ***REMOVED***
        continue;
    ***REMOVED***

    (function (prop, backing) ***REMOVED***
        'use strict';

        // The accessor creates a new Signal; and so it should only be used from user-code.
        Object.defineProperty(Phaser.Events.prototype, prop, ***REMOVED***
            get: function () ***REMOVED***
                return this[backing] || (this[backing] = new Phaser.Signal());
            ***REMOVED***
        ***REMOVED***);

        // The dispatcher will only broadcast on an already-created signal; call this internally.
        Phaser.Events.prototype[prop + '$dispatch'] = function () ***REMOVED***
            return this[backing] ? this[backing].dispatch.apply(this[backing], arguments) : null;
        ***REMOVED***;

    ***REMOVED***)(prop, '_' + prop);

***REMOVED***
