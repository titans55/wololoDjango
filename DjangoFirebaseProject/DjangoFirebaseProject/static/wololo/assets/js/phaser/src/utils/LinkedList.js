/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A basic Linked List data structure.
*
* This implementation _modifies_ the `prev` and `next` properties of each item added:
* - The `prev` and `next` properties must be writable and should not be used for any other purpose.
* - Items _cannot_ be added to multiple LinkedLists at the same time.
* - Only objects can be added.
*
* @class Phaser.LinkedList
* @constructor
*/
Phaser.LinkedList = function () ***REMOVED***

    /**
    * Next element in the list.
    * @property ***REMOVED***object***REMOVED*** next
    * @default
    */
    this.next = null;

    /**
    * Previous element in the list.
    * @property ***REMOVED***object***REMOVED*** prev
    * @default
    */
    this.prev = null;

    /**
    * First element in the list.
    * @property ***REMOVED***object***REMOVED*** first
    * @default
    */
    this.first = null;

    /**
    * Last element in the list.
    * @property ***REMOVED***object***REMOVED*** last
    * @default
    */
    this.last = null;

    /**
    * Number of elements in the list.
    * @property ***REMOVED***integer***REMOVED*** total
    * @default
    */
    this.total = 0;

***REMOVED***;

Phaser.LinkedList.prototype = ***REMOVED***

    /**
    * Adds a new element to this linked list.
    *
    * @method Phaser.LinkedList#add
    * @param ***REMOVED***object***REMOVED*** item - The element to add to this list. Can be a Phaser.Sprite or any other object you need to quickly iterate through.
    * @return ***REMOVED***object***REMOVED*** The item that was added.
    */
    add: function (item) ***REMOVED***

        //  If the list is empty
        if (this.total === 0 && this.first === null && this.last === null)
        ***REMOVED***
            this.first = item;
            this.last = item;
            this.next = item;
            item.prev = this;
            this.total++;
            return item;
        ***REMOVED***

        //  Gets appended to the end of the list, regardless of anything, and it won't have any children of its own (non-nested list)
        this.last.next = item;

        item.prev = this.last;

        this.last = item;

        this.total++;

        return item;

    ***REMOVED***,

    /**
    * Resets the first, last, next and previous node pointers in this list.
    *
    * @method Phaser.LinkedList#reset
    */
    reset: function () ***REMOVED***

        this.first = null;
        this.last = null;
        this.next = null;
        this.prev = null;
        this.total = 0;

    ***REMOVED***,

    /**
    * Removes the given element from this linked list if it exists.
    *
    * @method Phaser.LinkedList#remove
    * @param ***REMOVED***object***REMOVED*** item - The item to be removed from the list.
    */
    remove: function (item) ***REMOVED***

        if (this.total === 1)
        ***REMOVED***
            this.reset();
            item.next = item.prev = null;
            return;
        ***REMOVED***

        if (item === this.first)
        ***REMOVED***
            // It was 'first', make 'first' point to first.next
            this.first = this.first.next;
        ***REMOVED***
        else if (item === this.last)
        ***REMOVED***
            // It was 'last', make 'last' point to last.prev
            this.last = this.last.prev;
        ***REMOVED***

        if (item.prev)
        ***REMOVED***
            // make item.prev.next point to childs.next instead of item
            item.prev.next = item.next;
        ***REMOVED***

        if (item.next)
        ***REMOVED***
            // make item.next.prev point to item.prev instead of item
            item.next.prev = item.prev;
        ***REMOVED***

        item.next = item.prev = null;

        if (this.first === null )
        ***REMOVED***
            this.last = null;
        ***REMOVED***

        this.total--;

    ***REMOVED***,

    /**
    * Calls a function on all members of this list, using the member as the context for the callback.
    * The function must exist on the member.
    *
    * @method Phaser.LinkedList#callAll
    * @param ***REMOVED***function***REMOVED*** callback - The function to call.
    */
    callAll: function (callback) ***REMOVED***

        if (!this.first || !this.last)
        ***REMOVED***
            return;
        ***REMOVED***

        var entity = this.first;

        do
        ***REMOVED***
            if (entity && entity[callback])
            ***REMOVED***
                entity[callback].call(entity);
            ***REMOVED***

            entity = entity.next;

        ***REMOVED***
        while (entity !== this.last.next);

    ***REMOVED***

***REMOVED***;

Phaser.LinkedList.prototype.constructor = Phaser.LinkedList;
