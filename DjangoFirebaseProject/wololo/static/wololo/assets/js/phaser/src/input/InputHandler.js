/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Input Handler is bound to a specific Sprite and is responsible for managing all Input events on that Sprite.
*
* @class Phaser.InputHandler
* @constructor
* @param ***REMOVED***Phaser.Sprite***REMOVED*** sprite - The Sprite object to which this Input Handler belongs.
*/
Phaser.InputHandler = function (sprite) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Sprite***REMOVED*** sprite - The Sprite object to which this Input Handler belongs.
    */
    this.sprite = sprite;

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = sprite.game;

    /**
    * @property ***REMOVED***boolean***REMOVED*** enabled - If enabled the Input Handler will process input requests and monitor pointer activity.
    * @default
    */
    this.enabled = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** checked - A disposable flag used by the Pointer class when performing priority checks.
    * @protected
    */
    this.checked = false;

    /**
    * The priorityID is used to determine which game objects should get priority when input events occur. For example if you have
    * several Sprites that overlap, by default the one at the top of the display list is given priority for input events. You can
    * stop this from happening by controlling the priorityID value. The higher the value, the more important they are considered to the Input events.
    * @property ***REMOVED***number***REMOVED*** priorityID
    * @default
    */
    this.priorityID = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** useHandCursor - On a desktop browser you can set the 'hand' cursor to appear when moving over the Sprite.
    * @default
    */
    this.useHandCursor = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _setHandCursor - Did this Sprite trigger the hand cursor?
    * @private
    */
    this._setHandCursor = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isDragged - true if the Sprite is being currently dragged.
    * @default
    */
    this.isDragged = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** allowHorizontalDrag - Controls if the Sprite is allowed to be dragged horizontally.
    * @default
    */
    this.allowHorizontalDrag = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** allowVerticalDrag - Controls if the Sprite is allowed to be dragged vertically.
    * @default
    */
    this.allowVerticalDrag = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** bringToTop - If true when this Sprite is clicked or dragged it will automatically be bought to the top of the Group it is within.
    * @default
    */
    this.bringToTop = false;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** snapOffset - A Point object that contains by how far the Sprite snap is offset.
    * @default
    */
    this.snapOffset = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** snapOnDrag - When the Sprite is dragged this controls if the center of the Sprite will snap to the pointer on drag or not.
    * @default
    */
    this.snapOnDrag = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** snapOnRelease - When the Sprite is dragged this controls if the Sprite will be snapped on release.
    * @default
    */
    this.snapOnRelease = false;

    /**
    * @property ***REMOVED***number***REMOVED*** snapX - When a Sprite has snapping enabled this holds the width of the snap grid.
    * @default
    */
    this.snapX = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** snapY - When a Sprite has snapping enabled this holds the height of the snap grid.
    * @default
    */
    this.snapY = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** snapOffsetX - This defines the top-left X coordinate of the snap grid.
    * @default
    */
    this.snapOffsetX = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** snapOffsetY - This defines the top-left Y coordinate of the snap grid..
    * @default
    */
    this.snapOffsetY = 0;

    /**
    * Set to true to use pixel perfect hit detection when checking if the pointer is over this Sprite.
    * The x/y coordinates of the pointer are tested against the image in combination with the InputHandler.pixelPerfectAlpha value.
    * This feature only works for display objects with image based textures such as Sprites. It won't work on BitmapText or Rope.
    * Warning: This is expensive, especially on mobile (where it's not even needed!) so only enable if required. Also see the less-expensive InputHandler.pixelPerfectClick.
    * @property ***REMOVED***boolean***REMOVED*** pixelPerfectOver - Use a pixel perfect check when testing for pointer over.
    * @default
    */
    this.pixelPerfectOver = false;

    /**
    * Set to true to use pixel perfect hit detection when checking if the pointer is over this Sprite when it's clicked or touched.
    * The x/y coordinates of the pointer are tested against the image in combination with the InputHandler.pixelPerfectAlpha value.
    * This feature only works for display objects with image based textures such as Sprites. It won't work on BitmapText or Rope.
    * Warning: This is expensive so only enable if you really need it.
    * @property ***REMOVED***boolean***REMOVED*** pixelPerfectClick - Use a pixel perfect check when testing for clicks or touches on the Sprite.
    * @default
    */
    this.pixelPerfectClick = false;

    /**
    * @property ***REMOVED***number***REMOVED*** pixelPerfectAlpha - The alpha tolerance threshold. If the alpha value of the pixel matches or is above this value, it's considered a hit.
    * @default
    */
    this.pixelPerfectAlpha = 255;

    /**
    * @property ***REMOVED***boolean***REMOVED*** draggable - Is this sprite allowed to be dragged by the mouse? true = yes, false = no
    * @default
    */
    this.draggable = false;

    /**
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** boundsRect - A region of the game world within which the sprite is restricted during drag.
    * @default
    */
    this.boundsRect = null;

    /**
    * @property ***REMOVED***Phaser.Sprite***REMOVED*** boundsSprite - A Sprite the bounds of which this sprite is restricted during drag.
    * @default
    */
    this.boundsSprite = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** scaleLayer - EXPERIMENTAL: Please do not use this property unless you know what it does. Likely to change in the future.
    */
    this.scaleLayer = false;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** dragOffset - The offset from the Sprites position that dragging takes place from.
    */
    this.dragOffset = new Phaser.Point();

    /**
    * @property ***REMOVED***boolean***REMOVED*** dragFromCenter - Is the Sprite dragged from its center, or the point at which the Pointer was pressed down upon it?
    */
    this.dragFromCenter = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** dragStopBlocksInputUp - If enabled, when the Sprite stops being dragged, it will only dispatch the `onDragStop` event, and not the `onInputUp` event. If set to `false` it will dispatch both events.
    */
    this.dragStopBlocksInputUp = false;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** dragStartPoint - The Point from which the most recent drag started from. Useful if you need to return an object to its starting position.
    */
    this.dragStartPoint = new Phaser.Point();

    /**
    * @property ***REMOVED***integer***REMOVED*** dragDistanceThreshold - The distance, in pixels, the pointer has to move while being held down, before the Sprite thinks it is being dragged.
    */
    this.dragDistanceThreshold = 0;

    /**
    * @property ***REMOVED***integer***REMOVED*** dragTimeThreshold - The amount of time, in ms, the pointer has to be held down over the Sprite before it thinks it is being dragged.
    */
    this.dragTimeThreshold = 0;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** downPoint - A Point object containing the coordinates of the Pointer when it was first pressed down onto this Sprite.
    */
    this.downPoint = new Phaser.Point();

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** snapPoint - If the sprite is set to snap while dragging this holds the point of the most recent 'snap' event.
    */
    this.snapPoint = new Phaser.Point();

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** _dragPoint - Internal cache var.
    * @private
    */
    this._dragPoint = new Phaser.Point();

    /**
    * @property ***REMOVED***boolean***REMOVED*** _dragPhase - Internal cache var.
    * @private
    */
    this._dragPhase = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _pendingDrag - Internal cache var.
    * @private
    */
    this._pendingDrag = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _dragTimePass - Internal cache var.
    * @private
    */
    this._dragTimePass = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _dragDistancePass - Internal cache var.
    * @private
    */
    this._dragDistancePass = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _wasEnabled - Internal cache var.
    * @private
    */
    this._wasEnabled = false;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** _tempPoint - Internal cache var.
    * @private
    */
    this._tempPoint = new Phaser.Point();

    /**
    * @property ***REMOVED***array***REMOVED*** _pointerData - Internal cache var.
    * @private
    */
    this._pointerData = [];

    this._pointerData.push(***REMOVED***
        id: 0,
        x: 0,
        y: 0,
        camX: 0,
        camY: 0,
        isDown: false,
        isUp: false,
        isOver: false,
        isOut: false,
        timeOver: 0,
        timeOut: 0,
        timeDown: 0,
        timeUp: 0,
        downDuration: 0,
        isDragged: false
    ***REMOVED***);

***REMOVED***;

Phaser.InputHandler.prototype = ***REMOVED***

    /**
    * Starts the Input Handler running. This is called automatically when you enable input on a Sprite, or can be called directly if you need to set a specific priority.
    * 
    * @method Phaser.InputHandler#start
    * @param ***REMOVED***number***REMOVED*** [priority=0] - Higher priority sprites take click priority over low-priority sprites when they are stacked on-top of each other.
    * @param ***REMOVED***boolean***REMOVED*** [useHandCursor=false] - If true the Sprite will show the hand cursor on mouse-over (doesn't apply to mobile browsers)
    * @return ***REMOVED***Phaser.Sprite***REMOVED*** The Sprite object to which the Input Handler is bound.
    */
    start: function (priority, useHandCursor) ***REMOVED***

        priority = priority || 0;
        if (useHandCursor === undefined) ***REMOVED*** useHandCursor = false; ***REMOVED***

        //  Turning on
        if (this.enabled === false)
        ***REMOVED***
            //  Register, etc
            this.game.input.interactiveItems.add(this);
            this.useHandCursor = useHandCursor;
            this.priorityID = priority;

            for (var i = 0; i < 10; i++)
            ***REMOVED***
                this._pointerData[i] = ***REMOVED***
                    id: i,
                    x: 0,
                    y: 0,
                    isDown: false,
                    isUp: false,
                    isOver: false,
                    isOut: false,
                    timeOver: 0,
                    timeOut: 0,
                    timeDown: 0,
                    timeUp: 0,
                    downDuration: 0,
                    isDragged: false
                ***REMOVED***;
            ***REMOVED***

            this.snapOffset = new Phaser.Point();
            this.enabled = true;
            this._wasEnabled = true;

        ***REMOVED***

        this.sprite.events.onAddedToGroup.add(this.addedToGroup, this);
        this.sprite.events.onRemovedFromGroup.add(this.removedFromGroup, this);

        return this.sprite;

    ***REMOVED***,

    /**
    * Handles when the parent Sprite is added to a new Group.
    *
    * @method Phaser.InputHandler#addedToGroup
    * @private
    */
    addedToGroup: function () ***REMOVED***

        if (this._dragPhase)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this._wasEnabled && !this.enabled)
        ***REMOVED***
            this.start();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Handles when the parent Sprite is removed from a Group.
    *
    * @method Phaser.InputHandler#removedFromGroup
    * @private
    */
    removedFromGroup: function () ***REMOVED***

        if (this._dragPhase)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this.enabled)
        ***REMOVED***
            this._wasEnabled = true;
            this.stop();
        ***REMOVED***
        else
        ***REMOVED***
            this._wasEnabled = false;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Resets the Input Handler and disables it.
    * @method Phaser.InputHandler#reset
    */
    reset: function () ***REMOVED***

        this.enabled = false;

        for (var i = 0; i < 10; i++)
        ***REMOVED***
            this._pointerData[i] = ***REMOVED***
                id: i,
                x: 0,
                y: 0,
                isDown: false,
                isUp: false,
                isOver: false,
                isOut: false,
                timeOver: 0,
                timeOut: 0,
                timeDown: 0,
                timeUp: 0,
                downDuration: 0,
                isDragged: false
            ***REMOVED***;
        ***REMOVED***
    ***REMOVED***,

    /**
    * Stops the Input Handler from running.
    * @method Phaser.InputHandler#stop
    */
    stop: function () ***REMOVED***

        //  Turning off
        if (this.enabled === false)
        ***REMOVED***
            return;
        ***REMOVED***
        else
        ***REMOVED***
            //  De-register, etc
            this.enabled = false;
            this.game.input.interactiveItems.remove(this);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Clean up memory.
    * @method Phaser.InputHandler#destroy
    */
    destroy: function () ***REMOVED***

        if (this.sprite)
        ***REMOVED***
            if (this._setHandCursor)
            ***REMOVED***
                this.game.canvas.style.cursor = "default";
                this._setHandCursor = false;
            ***REMOVED***

            this.enabled = false;

            this.game.input.interactiveItems.remove(this);

            this._pointerData.length = 0;
            this.boundsRect = null;
            this.boundsSprite = null;
            this.sprite = null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Checks if the object this InputHandler is bound to is valid for consideration in the Pointer move event.
    * This is called by Phaser.Pointer and shouldn't typically be called directly.
    *
    * @method Phaser.InputHandler#validForInput
    * @protected
    * @param ***REMOVED***number***REMOVED*** highestID - The highest ID currently processed by the Pointer.
    * @param ***REMOVED***number***REMOVED*** highestRenderID - The highest Render Order ID currently processed by the Pointer.
    * @param ***REMOVED***boolean***REMOVED*** [includePixelPerfect=true] - If this object has `pixelPerfectClick` or `pixelPerfectOver` set should it be considered as valid?
    * @return ***REMOVED***boolean***REMOVED*** True if the object this InputHandler is bound to should be considered as valid for input detection.
    */
    validForInput: function (highestID, highestRenderID, includePixelPerfect) ***REMOVED***

        if (includePixelPerfect === undefined) ***REMOVED*** includePixelPerfect = true; ***REMOVED***

        if (!this.enabled ||
            this.sprite.scale.x === 0 ||
            this.sprite.scale.y === 0 ||
            this.priorityID < this.game.input.minPriorityID ||
            (this.sprite.parent && this.sprite.parent.ignoreChildInput))
        ***REMOVED***
            return false;
        ***REMOVED***

        //   If we're trying to specifically IGNORE pixel perfect objects, then set includePixelPerfect to false and skip it
        if (!includePixelPerfect && (this.pixelPerfectClick || this.pixelPerfectOver))
        ***REMOVED***
            return false;
        ***REMOVED***

        if (this.priorityID > highestID || (this.priorityID === highestID && this.sprite.renderOrderID > highestRenderID))
        ***REMOVED***
            return true;
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Is this object using pixel perfect checking?
    *
    * @method Phaser.InputHandler#isPixelPerfect
    * @return ***REMOVED***boolean***REMOVED*** True if the this InputHandler has either `pixelPerfectClick` or `pixelPerfectOver` set to `true`.
    */
    isPixelPerfect: function () ***REMOVED***

        return (this.pixelPerfectClick || this.pixelPerfectOver);

    ***REMOVED***,

    /**
    * The x coordinate of the Input pointer, relative to the top-left of the parent Sprite.
    * This value is only set when the pointer is over this Sprite.
    *
    * @method Phaser.InputHandler#pointerX
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***number***REMOVED*** The x coordinate of the Input pointer.
    */
    pointerX: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].x;

    ***REMOVED***,

    /**
    * The y coordinate of the Input pointer, relative to the top-left of the parent Sprite
    * This value is only set when the pointer is over this Sprite.
    *
    * @method Phaser.InputHandler#pointerY
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***number***REMOVED*** The y coordinate of the Input pointer.
    */
    pointerY: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].y;

    ***REMOVED***,

    /**
    * If the Pointer is down this returns true.
    * This *only* checks if the Pointer is down, not if it's down over any specific Sprite.
    *
    * @method Phaser.InputHandler#pointerDown
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***boolean***REMOVED*** - True if the given pointer is down, otherwise false.
    */
    pointerDown: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].isDown;

    ***REMOVED***,

    /**
    * If the Pointer is up this returns true.
    * This *only* checks if the Pointer is up, not if it's up over any specific Sprite.
    *
    * @method Phaser.InputHandler#pointerUp
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***boolean***REMOVED*** - True if the given pointer is up, otherwise false.
    */
    pointerUp: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].isUp;

    ***REMOVED***,

    /**
    * A timestamp representing when the Pointer first touched the touchscreen.
    *
    * @method Phaser.InputHandler#pointerTimeDown
    * @param ***REMOVED***integer***REMOVED*** [pointerId=(check all)]
    * @return ***REMOVED***number***REMOVED***
    */
    pointerTimeDown: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].timeDown;

    ***REMOVED***,

    /**
    * A timestamp representing when the Pointer left the touchscreen.
    *
    * @method Phaser.InputHandler#pointerTimeUp
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***number***REMOVED***
    */
    pointerTimeUp: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].timeUp;

    ***REMOVED***,

    /**
    * Is the Pointer over this Sprite?
    *
    * @method Phaser.InputHandler#pointerOver
    * @param ***REMOVED***integer***REMOVED*** [pointerId=(check all)] The ID number of a Pointer to check. If you don't provide a number it will check all Pointers.
    * @return ***REMOVED***boolean***REMOVED*** - True if the given pointer (if a index was given, or any pointer if not) is over this object.
    */
    pointerOver: function (pointerId) ***REMOVED***

        if (!this.enabled)
        ***REMOVED***
            return false;
        ***REMOVED***

        if (pointerId === undefined)
        ***REMOVED***
            for (var i = 0; i < 10; i++)
            ***REMOVED***
                if (this._pointerData[i].isOver)
                ***REMOVED***
                    return true;
                ***REMOVED***
            ***REMOVED***

            return false;
        ***REMOVED***
        else
        ***REMOVED***
            return this._pointerData[pointerId].isOver;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Is the Pointer outside of this Sprite?
    *
    * @method Phaser.InputHandler#pointerOut
    * @param ***REMOVED***integer***REMOVED*** [pointerId=(check all)] The ID number of a Pointer to check. If you don't provide a number it will check all Pointers.
    * @return ***REMOVED***boolean***REMOVED*** True if the given pointer (if a index was given, or any pointer if not) is out of this object.
    */
    pointerOut: function (pointerId) ***REMOVED***

        if (!this.enabled)
        ***REMOVED***
            return false;
        ***REMOVED***

        if (pointerId === undefined)
        ***REMOVED***
            for (var i = 0; i < 10; i++)
            ***REMOVED***
                if (this._pointerData[i].isOut)
                ***REMOVED***
                    return true;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            return this._pointerData[pointerId].isOut;
        ***REMOVED***

    ***REMOVED***,

    /**
    * A timestamp representing when the Pointer first touched the touchscreen.
    *
    * @method Phaser.InputHandler#pointerTimeOver
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***number***REMOVED***
    */
    pointerTimeOver: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].timeOver;

    ***REMOVED***,

    /**
    * A timestamp representing when the Pointer left the touchscreen.
    *
    * @method Phaser.InputHandler#pointerTimeOut
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***number***REMOVED***
    */
    pointerTimeOut: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].timeOut;

    ***REMOVED***,

    /**
    * Is this sprite being dragged by the mouse or not?
    *
    * @method Phaser.InputHandler#pointerDragged
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***boolean***REMOVED*** True if the pointer is dragging an object, otherwise false.
    */
    pointerDragged: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        return this._pointerData[pointerId].isDragged;

    ***REMOVED***,

    /**
    * Checks if the given pointer is both down and over the Sprite this InputHandler belongs to.
    * Use the `fastTest` flag is to quickly check just the bounding hit area even if `InputHandler.pixelPerfectOver` is `true`.
    *
    * @method Phaser.InputHandler#checkPointerDown
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer
    * @param ***REMOVED***boolean***REMOVED*** [fastTest=false] - Force a simple hit area check even if `pixelPerfectOver` is true for this object?
    * @return ***REMOVED***boolean***REMOVED*** True if the pointer is down, otherwise false.
    */
    checkPointerDown: function (pointer, fastTest) ***REMOVED***

        if (!pointer.isDown ||
            !this.enabled ||
            !this.sprite ||
            !this.sprite.parent ||
            !this.sprite.visible ||
            !this.sprite.parent.visible ||
            this.sprite.worldScale.x === 0 ||
            this.sprite.worldScale.y === 0)
        ***REMOVED***
            return false;
        ***REMOVED***

        //  Need to pass it a temp point, in case we need it again for the pixel check
        if (this.game.input.hitTest(this.sprite, pointer, this._tempPoint))
        ***REMOVED***
            if (fastTest === undefined)
            ***REMOVED***
                fastTest = false;
            ***REMOVED***

            if (!fastTest && this.pixelPerfectClick)
            ***REMOVED***
                return this.checkPixel(this._tempPoint.x, this._tempPoint.y);
            ***REMOVED***
            else
            ***REMOVED***
                return true;
            ***REMOVED***
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Checks if the given pointer is over the Sprite this InputHandler belongs to.
    * Use the `fastTest` flag is to quickly check just the bounding hit area even if `InputHandler.pixelPerfectOver` is `true`.
    *
    * @method Phaser.InputHandler#checkPointerOver
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer
    * @param ***REMOVED***boolean***REMOVED*** [fastTest=false] - Force a simple hit area check even if `pixelPerfectOver` is true for this object?
    * @return ***REMOVED***boolean***REMOVED***
    */
    checkPointerOver: function (pointer, fastTest) ***REMOVED***

        if (!this.enabled ||
            !this.sprite ||
            !this.sprite.parent ||
            !this.sprite.visible ||
            !this.sprite.parent.visible ||
            this.sprite.worldScale.x === 0 ||
            this.sprite.worldScale.y === 0)
        ***REMOVED***
            return false;
        ***REMOVED***

        //  Need to pass it a temp point, in case we need it again for the pixel check
        if (this.game.input.hitTest(this.sprite, pointer, this._tempPoint))
        ***REMOVED***
            if (fastTest === undefined)
            ***REMOVED***
                fastTest = false;
            ***REMOVED***

            if (!fastTest && this.pixelPerfectOver)
            ***REMOVED***
                return this.checkPixel(this._tempPoint.x, this._tempPoint.y);
            ***REMOVED***
            else
            ***REMOVED***
                return true;
            ***REMOVED***
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Runs a pixel perfect check against the given x/y coordinates of the Sprite this InputHandler is bound to.
    * It compares the alpha value of the pixel and if >= InputHandler.pixelPerfectAlpha it returns true.
    *
    * @method Phaser.InputHandler#checkPixel
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate to check.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate to check.
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** [pointer] - The pointer to get the x/y coordinate from if not passed as the first two parameters.
    * @return ***REMOVED***boolean***REMOVED*** true if there is the alpha of the pixel is >= InputHandler.pixelPerfectAlpha
    */
    checkPixel: function (x, y, pointer) ***REMOVED***

        //  Grab a pixel from our image into the hitCanvas and then test it
        if (this.sprite.texture.baseTexture.source)
        ***REMOVED***
            if (x === null && y === null)
            ***REMOVED***
                //  Use the pointer parameter
                this.game.input.getLocalPosition(this.sprite, pointer, this._tempPoint);

                var x = this._tempPoint.x;
                var y = this._tempPoint.y;
            ***REMOVED***

            if (this.sprite.anchor.x !== 0)
            ***REMOVED***
                x -= -this.sprite.texture.frame.width * this.sprite.anchor.x;
            ***REMOVED***

            if (this.sprite.anchor.y !== 0)
            ***REMOVED***
                y -= -this.sprite.texture.frame.height * this.sprite.anchor.y;
            ***REMOVED***

            x += this.sprite.texture.frame.x;
            y += this.sprite.texture.frame.y;

            if (this.sprite.texture.trim)
            ***REMOVED***
                x -= this.sprite.texture.trim.x;
                y -= this.sprite.texture.trim.y;

                //  If the coordinates are outside the trim area we return false immediately, to save doing a draw call
                if (x < this.sprite.texture.crop.x || x > this.sprite.texture.crop.right || y < this.sprite.texture.crop.y || y > this.sprite.texture.crop.bottom)
                ***REMOVED***
                    this._dx = x;
                    this._dy = y;
                    return false;
                ***REMOVED***
            ***REMOVED***

            this._dx = x;
            this._dy = y;

            this.game.input.hitContext.clearRect(0, 0, 1, 1);
            this.game.input.hitContext.drawImage(this.sprite.texture.baseTexture.source, x, y, 1, 1, 0, 0, 1, 1);

            var rgb = this.game.input.hitContext.getImageData(0, 0, 1, 1);

            if (rgb.data[3] >= this.pixelPerfectAlpha)
            ***REMOVED***
                return true;
            ***REMOVED***
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Internal Update method. This is called automatically and handles the Pointer
    * and drag update loops.
    * 
    * @method Phaser.InputHandler#update
    * @protected
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer
    * @return ***REMOVED***boolean***REMOVED*** True if the pointer is still active, otherwise false.
    */
    update: function (pointer) ***REMOVED***

        if (this.sprite === null || this.sprite.parent === undefined)
        ***REMOVED***
            //  Abort. We've been destroyed.
            return;
        ***REMOVED***

        if (!this.enabled || !this.sprite.visible || !this.sprite.parent.visible)
        ***REMOVED***
            this._pointerOutHandler(pointer);
            return false;
        ***REMOVED***

        if (this._pendingDrag)
        ***REMOVED***
            if (!this._dragDistancePass)
            ***REMOVED***
                this._dragDistancePass = (Phaser.Math.distance(pointer.x, pointer.y, this.downPoint.x, this.downPoint.y) >= this.dragDistanceThreshold);
            ***REMOVED***

            if (this._dragDistancePass && this._dragTimePass)
            ***REMOVED***
                this.startDrag(pointer);
            ***REMOVED***

            return true;
        ***REMOVED***
        else if (this.draggable && this._draggedPointerID === pointer.id)
        ***REMOVED***
            return this.updateDrag(pointer, false);
        ***REMOVED***
        else if (this._pointerData[pointer.id].isOver)
        ***REMOVED***
            if (this.checkPointerOver(pointer))
            ***REMOVED***
                this._pointerData[pointer.id].x = pointer.x - this.sprite.x;
                this._pointerData[pointer.id].y = pointer.y - this.sprite.y;
                return true;
            ***REMOVED***
            else
            ***REMOVED***
                this._pointerOutHandler(pointer);
                return false;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***,

    /**
    * Internal method handling the pointer over event.
    * 
    * @method Phaser.InputHandler#_pointerOverHandler
    * @private
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer - The pointer that triggered the event
    * @param ***REMOVED***boolean***REMOVED*** [silent=false] - If silent is `true` then this method will not dispatch any Signals from the parent Sprite.
    */
    _pointerOverHandler: function (pointer, silent) ***REMOVED***

        if (this.sprite === null)
        ***REMOVED***
            //  Abort. We've been destroyed.
            return;
        ***REMOVED***

        var data = this._pointerData[pointer.id];

        if (data.isOver === false || pointer.dirty)
        ***REMOVED***
            var sendEvent = (data.isOver === false);

            data.isOver = true;
            data.isOut = false;
            data.timeOver = this.game.time.time;
            data.x = pointer.x - this.sprite.x;
            data.y = pointer.y - this.sprite.y;

            if (this.useHandCursor && data.isDragged === false)
            ***REMOVED***
                this.game.canvas.style.cursor = "pointer";
                this._setHandCursor = true;
            ***REMOVED***

            if (!silent && sendEvent && this.sprite && this.sprite.events)
            ***REMOVED***
                this.sprite.events.onInputOver$dispatch(this.sprite, pointer);
            ***REMOVED***

            if (this.sprite.parent && this.sprite.parent.type === Phaser.GROUP)
            ***REMOVED***
                this.sprite.parent.onChildInputOver.dispatch(this.sprite, pointer);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal method handling the pointer out event.
    * 
    * @method Phaser.InputHandler#_pointerOutHandler
    * @private
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer - The pointer that triggered the event.
    * @param ***REMOVED***boolean***REMOVED*** [silent=false] - If silent is `true` then this method will not dispatch any Signals from the parent Sprite.
    */
    _pointerOutHandler: function (pointer, silent) ***REMOVED***

        if (this.sprite === null)
        ***REMOVED***
            //  Abort. We've been destroyed.
            return;
        ***REMOVED***

        var data = this._pointerData[pointer.id];

        data.isOver = false;
        data.isOut = true;
        data.timeOut = this.game.time.time;

        if (this.useHandCursor && data.isDragged === false)
        ***REMOVED***
            this.game.canvas.style.cursor = "default";
            this._setHandCursor = false;
        ***REMOVED***

        if (!silent && this.sprite && this.sprite.events)
        ***REMOVED***
            this.sprite.events.onInputOut$dispatch(this.sprite, pointer);

            if (this.sprite && this.sprite.parent && this.sprite.parent.type === Phaser.GROUP)
            ***REMOVED***
                this.sprite.parent.onChildInputOut.dispatch(this.sprite, pointer);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal method handling the touched / clicked event.
    * 
    * @method Phaser.InputHandler#_touchedHandler
    * @private
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer - The pointer that triggered the event.
    */
    _touchedHandler: function (pointer) ***REMOVED***

        if (this.sprite === null)
        ***REMOVED***
            //  Abort. We've been destroyed.
            return;
        ***REMOVED***

        var data = this._pointerData[pointer.id];

        if (!data.isDown && data.isOver)
        ***REMOVED***
            if (this.pixelPerfectClick && !this.checkPixel(null, null, pointer))
            ***REMOVED***
                return;
            ***REMOVED***

            data.isDown = true;
            data.isUp = false;
            data.timeDown = this.game.time.time;

            this.downPoint.set(pointer.x, pointer.y);

            //  It's possible the onInputDown event creates a new Sprite that is on-top of this one, so we ought to force a Pointer update
            pointer.dirty = true;

            if (this.sprite && this.sprite.events)
            ***REMOVED***
                this.sprite.events.onInputDown$dispatch(this.sprite, pointer);

                //  The event above might have destroyed this sprite.
                if (this.sprite && this.sprite.parent && this.sprite.parent.type === Phaser.GROUP)
                ***REMOVED***
                    this.sprite.parent.onChildInputDown.dispatch(this.sprite, pointer);
                ***REMOVED***

                //  The events might have destroyed this sprite.
                if (this.sprite === null)
                ***REMOVED***
                    return;
                ***REMOVED***
            ***REMOVED***

            //  Start drag
            if (this.draggable && this.isDragged === false)
            ***REMOVED***
                if (this.dragTimeThreshold === 0 && this.dragDistanceThreshold === 0)
                ***REMOVED***
                    this.startDrag(pointer);
                ***REMOVED***
                else
                ***REMOVED***
                    this._pendingDrag = true;

                    this._dragDistancePass = (this.dragDistanceThreshold === 0);

                    if (this.dragTimeThreshold > 0)
                    ***REMOVED***
                        this._dragTimePass = false;
                        this.game.time.events.add(this.dragTimeThreshold, this.dragTimeElapsed, this, pointer);
                    ***REMOVED***
                    else
                    ***REMOVED***
                        this._dragTimePass = true;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***

            if (this.bringToTop)
            ***REMOVED***
                this.sprite.bringToTop();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal method handling the drag threshold timer.
    * 
    * @method Phaser.InputHandler#dragTimeElapsed
    * @private
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer
    */
    dragTimeElapsed: function (pointer) ***REMOVED***

        this._dragTimePass = true;

        if (this._pendingDrag && this.sprite)
        ***REMOVED***
            if (this._dragDistancePass)
            ***REMOVED***
                this.startDrag(pointer);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal method handling the pointer released event.
    * @method Phaser.InputHandler#_releasedHandler
    * @private
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer
    */
    _releasedHandler: function (pointer) ***REMOVED***

        if (this.sprite === null)
        ***REMOVED***
            //  Abort. We've been destroyed.
            return;
        ***REMOVED***

        var data = this._pointerData[pointer.id];

        //  If was previously touched by this Pointer, check if still is AND still over this item
        if (data.isDown && pointer.isUp)
        ***REMOVED***
            data.isDown = false;
            data.isUp = true;
            data.timeUp = this.game.time.time;
            data.downDuration = data.timeUp - data.timeDown;

            //  Only release the InputUp signal if the pointer is still over this sprite
            var isOver = this.checkPointerOver(pointer);

            if (this.sprite && this.sprite.events)
            ***REMOVED***
                if (!this.dragStopBlocksInputUp ||
                    this.dragStopBlocksInputUp && !(this.draggable && this.isDragged && this._draggedPointerID === pointer.id))
                ***REMOVED***
                    this.sprite.events.onInputUp$dispatch(this.sprite, pointer, isOver);
                ***REMOVED***

                if (this.sprite && this.sprite.parent && this.sprite.parent.type === Phaser.GROUP)
                ***REMOVED***
                    this.sprite.parent.onChildInputUp.dispatch(this.sprite, pointer, isOver);
                ***REMOVED***

                //  The onInputUp event may have changed the sprite so that checkPointerOver is no longer true, so update it.
                if (isOver)
                ***REMOVED***
                    isOver = this.checkPointerOver(pointer);
                ***REMOVED***
            ***REMOVED***
            
            data.isOver = isOver;

            if (!isOver && this.useHandCursor)
            ***REMOVED***
                this.game.canvas.style.cursor = "default";
                this._setHandCursor = false;
            ***REMOVED***

            //  It's possible the onInputUp event created a new Sprite that is on-top of this one, so force a Pointer update
            pointer.dirty = true;

            this._pendingDrag = false;

            //  Stop drag
            if (this.draggable && this.isDragged && this._draggedPointerID === pointer.id)
            ***REMOVED***
                this.stopDrag(pointer);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Called as a Pointer actively drags this Game Object.
    * 
    * @method Phaser.InputHandler#updateDrag
    * @private
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer - The Pointer causing the drag update.
    * @param ***REMOVED***boolean***REMOVED*** fromStart - True if this is the first update, immediately after the drag has started.
    * @return ***REMOVED***boolean***REMOVED***
    */
    updateDrag: function (pointer, fromStart) ***REMOVED***

        if (fromStart === undefined) ***REMOVED*** fromStart = false; ***REMOVED***

        if (pointer.isUp)
        ***REMOVED***
            this.stopDrag(pointer);
            return false;
        ***REMOVED***

        var px = this.globalToLocalX(pointer.x) + this._dragPoint.x + this.dragOffset.x;
        var py = this.globalToLocalY(pointer.y) + this._dragPoint.y + this.dragOffset.y;

        if (this.sprite.fixedToCamera)
        ***REMOVED***
            if (this.allowHorizontalDrag)
            ***REMOVED***
                this.sprite.cameraOffset.x = px;
            ***REMOVED***

            if (this.allowVerticalDrag)
            ***REMOVED***
                this.sprite.cameraOffset.y = py;
            ***REMOVED***

            if (this.boundsRect)
            ***REMOVED***
                this.checkBoundsRect();
            ***REMOVED***

            if (this.boundsSprite)
            ***REMOVED***
                this.checkBoundsSprite();
            ***REMOVED***

            if (this.snapOnDrag)
            ***REMOVED***
                this.sprite.cameraOffset.x = Math.round((this.sprite.cameraOffset.x - (this.snapOffsetX % this.snapX)) / this.snapX) * this.snapX + (this.snapOffsetX % this.snapX);
                this.sprite.cameraOffset.y = Math.round((this.sprite.cameraOffset.y - (this.snapOffsetY % this.snapY)) / this.snapY) * this.snapY + (this.snapOffsetY % this.snapY);
                this.snapPoint.set(this.sprite.cameraOffset.x, this.sprite.cameraOffset.y);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            var cx = this.game.camera.x - this._pointerData[pointer.id].camX;
            var cy = this.game.camera.y - this._pointerData[pointer.id].camY;

            if (this.allowHorizontalDrag)
            ***REMOVED***
                this.sprite.x = px + cx;
            ***REMOVED***

            if (this.allowVerticalDrag)
            ***REMOVED***
                this.sprite.y = py + cy;
            ***REMOVED***

            if (this.boundsRect)
            ***REMOVED***
                this.checkBoundsRect();
            ***REMOVED***

            if (this.boundsSprite)
            ***REMOVED***
                this.checkBoundsSprite();
            ***REMOVED***

            if (this.snapOnDrag)
            ***REMOVED***
                this.sprite.x = Math.round((this.sprite.x - (this.snapOffsetX % this.snapX)) / this.snapX) * this.snapX + (this.snapOffsetX % this.snapX);
                this.sprite.y = Math.round((this.sprite.y - (this.snapOffsetY % this.snapY)) / this.snapY) * this.snapY + (this.snapOffsetY % this.snapY);
                this.snapPoint.set(this.sprite.x, this.sprite.y);
            ***REMOVED***
        ***REMOVED***

        this.sprite.events.onDragUpdate.dispatch(this.sprite, pointer, px, py, this.snapPoint, fromStart);

        return true;

    ***REMOVED***,

    /**
    * Returns true if the pointer has entered the Sprite within the specified delay time (defaults to 500ms, half a second)
    *
    * @method Phaser.InputHandler#justOver
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @param ***REMOVED***number***REMOVED*** delay - The time below which the pointer is considered as just over.
    * @return ***REMOVED***boolean***REMOVED***
    */
    justOver: function (pointerId, delay) ***REMOVED***

        pointerId = pointerId || 0;
        delay = delay || 500;

        return (this._pointerData[pointerId].isOver && this.overDuration(pointerId) < delay);

    ***REMOVED***,

    /**
    * Returns true if the pointer has left the Sprite within the specified delay time (defaults to 500ms, half a second)
    *
    * @method Phaser.InputHandler#justOut
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @param ***REMOVED***number***REMOVED*** delay - The time below which the pointer is considered as just out.
    * @return ***REMOVED***boolean***REMOVED***
    */
    justOut: function (pointerId, delay) ***REMOVED***

        pointerId = pointerId || 0;
        delay = delay || 500;

        return (this._pointerData[pointerId].isOut && (this.game.time.time - this._pointerData[pointerId].timeOut < delay));

    ***REMOVED***,

    /**
    * Returns true if the pointer has touched or clicked on the Sprite within the specified delay time (defaults to 500ms, half a second)
    *
    * @method Phaser.InputHandler#justPressed
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @param ***REMOVED***number***REMOVED*** delay - The time below which the pointer is considered as just over.
    * @return ***REMOVED***boolean***REMOVED***
    */
    justPressed: function (pointerId, delay) ***REMOVED***

        pointerId = pointerId || 0;
        delay = delay || 500;

        return (this._pointerData[pointerId].isDown && this.downDuration(pointerId) < delay);

    ***REMOVED***,

    /**
    * Returns true if the pointer was touching this Sprite, but has been released within the specified delay time (defaults to 500ms, half a second)
    *
    * @method Phaser.InputHandler#justReleased
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @param ***REMOVED***number***REMOVED*** delay - The time below which the pointer is considered as just out.
    * @return ***REMOVED***boolean***REMOVED***
    */
    justReleased: function (pointerId, delay) ***REMOVED***

        pointerId = pointerId || 0;
        delay = delay || 500;

        return (this._pointerData[pointerId].isUp && (this.game.time.time - this._pointerData[pointerId].timeUp < delay));

    ***REMOVED***,

    /**
    * If the pointer is currently over this Sprite this returns how long it has been there for in milliseconds.
    *
    * @method Phaser.InputHandler#overDuration
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***number***REMOVED*** The number of milliseconds the pointer has been over the Sprite, or -1 if not over.
    */
    overDuration: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        if (this._pointerData[pointerId].isOver)
        ***REMOVED***
            return this.game.time.time - this._pointerData[pointerId].timeOver;
        ***REMOVED***

        return -1;

    ***REMOVED***,

    /**
    * If the pointer is currently over this Sprite this returns how long it has been there for in milliseconds.
    *
    * @method Phaser.InputHandler#downDuration
    * @param ***REMOVED***integer***REMOVED*** [pointerId=0]
    * @return ***REMOVED***number***REMOVED*** The number of milliseconds the pointer has been pressed down on the Sprite, or -1 if not over.
    */
    downDuration: function (pointerId) ***REMOVED***

        pointerId = pointerId || 0;

        if (this._pointerData[pointerId].isDown)
        ***REMOVED***
            return this.game.time.time - this._pointerData[pointerId].timeDown;
        ***REMOVED***

        return -1;

    ***REMOVED***,

    /**
    * Allow this Sprite to be dragged by any valid pointer.
    *
    * When the drag begins the Sprite.events.onDragStart event will be dispatched.
    * 
    * When the drag completes by way of the user letting go of the pointer that was dragging the sprite, the Sprite.events.onDragStop event is dispatched.
    *
    * You can control the thresholds over when a drag starts via the properties:
    * 
    * `Pointer.dragDistanceThreshold` the distance, in pixels, that the pointer has to move
    * before the drag will start.
    *
    * `Pointer.dragTimeThreshold` the time, in ms, that the pointer must be held down on
    * the Sprite before the drag will start.
    *
    * You can set either (or both) of these properties after enabling a Sprite for drag.
    *
    * For the duration of the drag the Sprite.events.onDragUpdate event is dispatched. This event is only dispatched when the pointer actually
    * changes position and moves. The event sends 5 parameters: `sprite`, `pointer`, `dragX`, `dragY` and `snapPoint`.
    * 
    * @method Phaser.InputHandler#enableDrag
    * @param ***REMOVED***boolean***REMOVED*** [lockCenter=false] - If false the Sprite will drag from where you click it minus the dragOffset. If true it will center itself to the tip of the mouse pointer.
    * @param ***REMOVED***boolean***REMOVED*** [bringToTop=false] - If true the Sprite will be bought to the top of the rendering list in its current Group.
    * @param ***REMOVED***boolean***REMOVED*** [pixelPerfect=false] - If true it will use a pixel perfect test to see if you clicked the Sprite. False uses the bounding box.
    * @param ***REMOVED***boolean***REMOVED*** [alphaThreshold=255] - If using pixel perfect collision this specifies the alpha level from 0 to 255 above which a collision is processed.
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** [boundsRect=null] - If you want to restrict the drag of this sprite to a specific Rectangle, pass the Phaser.Rectangle here, otherwise it's free to drag anywhere.
    * @param ***REMOVED***Phaser.Sprite***REMOVED*** [boundsSprite=null] - If you want to restrict the drag of this sprite to within the bounding box of another sprite, pass it here.
    */
    enableDrag: function (lockCenter, bringToTop, pixelPerfect, alphaThreshold, boundsRect, boundsSprite) ***REMOVED***

        if (lockCenter === undefined) ***REMOVED*** lockCenter = false; ***REMOVED***
        if (bringToTop === undefined) ***REMOVED*** bringToTop = false; ***REMOVED***
        if (pixelPerfect === undefined) ***REMOVED*** pixelPerfect = false; ***REMOVED***
        if (alphaThreshold === undefined) ***REMOVED*** alphaThreshold = 255; ***REMOVED***
        if (boundsRect === undefined) ***REMOVED*** boundsRect = null; ***REMOVED***
        if (boundsSprite === undefined) ***REMOVED*** boundsSprite = null; ***REMOVED***

        this._dragPoint = new Phaser.Point();
        this.draggable = true;
        this.bringToTop = bringToTop;
        this.dragOffset = new Phaser.Point();
        this.dragFromCenter = lockCenter;

        this.pixelPerfectClick = pixelPerfect;
        this.pixelPerfectAlpha = alphaThreshold;

        if (boundsRect)
        ***REMOVED***
            this.boundsRect = boundsRect;
        ***REMOVED***

        if (boundsSprite)
        ***REMOVED***
            this.boundsSprite = boundsSprite;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Stops this sprite from being able to be dragged.
    * If it is currently the target of an active drag it will be stopped immediately; also disables any set callbacks.
    *
    * @method Phaser.InputHandler#disableDrag
    */
    disableDrag: function () ***REMOVED***

        if (this._pointerData)
        ***REMOVED***
            for (var i = 0; i < 10; i++)
            ***REMOVED***
                this._pointerData[i].isDragged = false;
            ***REMOVED***
        ***REMOVED***

        this.draggable = false;
        this.isDragged = false;
        this._draggedPointerID = -1;
        this._pendingDrag = false;

    ***REMOVED***,

    /**
    * Called by Pointer when drag starts on this Sprite. Should not usually be called directly.
    *
    * @method Phaser.InputHandler#startDrag
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer
    */
    startDrag: function (pointer) ***REMOVED***

        var x = this.sprite.x;
        var y = this.sprite.y;

        this.isDragged = true;
        this._draggedPointerID = pointer.id;

        this._pointerData[pointer.id].camX = this.game.camera.x;
        this._pointerData[pointer.id].camY = this.game.camera.y;

        this._pointerData[pointer.id].isDragged = true;

        if (this.sprite.fixedToCamera)
        ***REMOVED***
            if (this.dragFromCenter)
            ***REMOVED***
                var bounds = this.sprite.getBounds();

                this.sprite.cameraOffset.x = this.globalToLocalX(pointer.x) + (this.sprite.cameraOffset.x - bounds.centerX);
                this.sprite.cameraOffset.y = this.globalToLocalY(pointer.y) + (this.sprite.cameraOffset.y - bounds.centerY);
            ***REMOVED***

            this._dragPoint.setTo(this.sprite.cameraOffset.x - pointer.x, this.sprite.cameraOffset.y - pointer.y);
        ***REMOVED***
        else
        ***REMOVED***
            if (this.dragFromCenter)
            ***REMOVED***
                var bounds = this.sprite.getBounds();

                this.sprite.x = this.globalToLocalX(pointer.x) + (this.sprite.x - bounds.centerX);
                this.sprite.y = this.globalToLocalY(pointer.y) + (this.sprite.y - bounds.centerY);
            ***REMOVED***

            this._dragPoint.setTo(this.sprite.x - this.globalToLocalX(pointer.x), this.sprite.y - this.globalToLocalY(pointer.y));
        ***REMOVED***

        this.updateDrag(pointer, true);

        if (this.bringToTop)
        ***REMOVED***
            this._dragPhase = true;
            this.sprite.bringToTop();
        ***REMOVED***

        this.dragStartPoint.set(x, y);

        this.sprite.events.onDragStart$dispatch(this.sprite, pointer, x, y);

        this._pendingDrag = false;

    ***REMOVED***,

    /**
    * Warning: EXPERIMENTAL
    *
    * @method Phaser.InputHandler#globalToLocalX
    * @param ***REMOVED***number***REMOVED*** x
    */
    globalToLocalX: function (x) ***REMOVED***

        if (this.scaleLayer)
        ***REMOVED***
            x -= this.game.scale.grid.boundsFluid.x;
            x *= this.game.scale.grid.scaleFluidInversed.x;
        ***REMOVED***

        return x;

    ***REMOVED***,

    /**
    * Warning: EXPERIMENTAL
    *
    * @method Phaser.InputHandler#globalToLocalY
    * @param ***REMOVED***number***REMOVED*** y
    */
    globalToLocalY: function (y) ***REMOVED***

        if (this.scaleLayer)
        ***REMOVED***
            y -= this.game.scale.grid.boundsFluid.y;
            y *= this.game.scale.grid.scaleFluidInversed.y;
        ***REMOVED***

        return y;

    ***REMOVED***,

    /**
    * Called by Pointer when drag is stopped on this Sprite. Should not usually be called directly.
    *
    * @method Phaser.InputHandler#stopDrag
    * @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer
    */
    stopDrag: function (pointer) ***REMOVED***

        this.isDragged = false;
        this._draggedPointerID = -1;
        this._pointerData[pointer.id].isDragged = false;
        this._dragPhase = false;
        this._pendingDrag = false;

        if (this.snapOnRelease)
        ***REMOVED***
            if (this.sprite.fixedToCamera)
            ***REMOVED***
                this.sprite.cameraOffset.x = Math.round((this.sprite.cameraOffset.x - (this.snapOffsetX % this.snapX)) / this.snapX) * this.snapX + (this.snapOffsetX % this.snapX);
                this.sprite.cameraOffset.y = Math.round((this.sprite.cameraOffset.y - (this.snapOffsetY % this.snapY)) / this.snapY) * this.snapY + (this.snapOffsetY % this.snapY);
            ***REMOVED***
            else
            ***REMOVED***
                this.sprite.x = Math.round((this.sprite.x - (this.snapOffsetX % this.snapX)) / this.snapX) * this.snapX + (this.snapOffsetX % this.snapX);
                this.sprite.y = Math.round((this.sprite.y - (this.snapOffsetY % this.snapY)) / this.snapY) * this.snapY + (this.snapOffsetY % this.snapY);
            ***REMOVED***
        ***REMOVED***

        this.sprite.events.onDragStop$dispatch(this.sprite, pointer);

        if (this.checkPointerOver(pointer) === false)
        ***REMOVED***
            this._pointerOutHandler(pointer);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Restricts this sprite to drag movement only on the given axis. Note: If both are set to false the sprite will never move!
    *
    * @method Phaser.InputHandler#setDragLock
    * @param ***REMOVED***boolean***REMOVED*** [allowHorizontal=true] - To enable the sprite to be dragged horizontally set to true, otherwise false.
    * @param ***REMOVED***boolean***REMOVED*** [allowVertical=true] - To enable the sprite to be dragged vertically set to true, otherwise false.
    */
    setDragLock: function (allowHorizontal, allowVertical) ***REMOVED***

        if (allowHorizontal === undefined) ***REMOVED*** allowHorizontal = true; ***REMOVED***
        if (allowVertical === undefined) ***REMOVED*** allowVertical = true; ***REMOVED***

        this.allowHorizontalDrag = allowHorizontal;
        this.allowVerticalDrag = allowVertical;

    ***REMOVED***,

    /**
    * Make this Sprite snap to the given grid either during drag or when it's released.
    * For example 16x16 as the snapX and snapY would make the sprite snap to every 16 pixels.
    *
    * @method Phaser.InputHandler#enableSnap
    * @param ***REMOVED***number***REMOVED*** snapX - The width of the grid cell to snap to.
    * @param ***REMOVED***number***REMOVED*** snapY - The height of the grid cell to snap to.
    * @param ***REMOVED***boolean***REMOVED*** [onDrag=true] - If true the sprite will snap to the grid while being dragged.
    * @param ***REMOVED***boolean***REMOVED*** [onRelease=false] - If true the sprite will snap to the grid when released.
    * @param ***REMOVED***number***REMOVED*** [snapOffsetX=0] - Used to offset the top-left starting point of the snap grid.
    * @param ***REMOVED***number***REMOVED*** [snapOffsetY=0] - Used to offset the top-left starting point of the snap grid.
    */
    enableSnap: function (snapX, snapY, onDrag, onRelease, snapOffsetX, snapOffsetY) ***REMOVED***

        if (onDrag === undefined) ***REMOVED*** onDrag = true; ***REMOVED***
        if (onRelease === undefined) ***REMOVED*** onRelease = false; ***REMOVED***
        if (snapOffsetX === undefined) ***REMOVED*** snapOffsetX = 0; ***REMOVED***
        if (snapOffsetY === undefined) ***REMOVED*** snapOffsetY = 0; ***REMOVED***

        this.snapX = snapX;
        this.snapY = snapY;
        this.snapOffsetX = snapOffsetX;
        this.snapOffsetY = snapOffsetY;
        this.snapOnDrag = onDrag;
        this.snapOnRelease = onRelease;

    ***REMOVED***,

    /**
    * Stops the sprite from snapping to a grid during drag or release.
    *
    * @method Phaser.InputHandler#disableSnap
    */
    disableSnap: function () ***REMOVED***

        this.snapOnDrag = false;
        this.snapOnRelease = false;

    ***REMOVED***,

    /**
    * Bounds Rect check for the sprite drag
    *
    * @method Phaser.InputHandler#checkBoundsRect
    */
    checkBoundsRect: function () ***REMOVED***

        if (this.sprite.fixedToCamera)
        ***REMOVED***
            if (this.sprite.cameraOffset.x < this.boundsRect.left)
            ***REMOVED***
                this.sprite.cameraOffset.x = this.boundsRect.left;
            ***REMOVED***
            else if ((this.sprite.cameraOffset.x + this.sprite.width) > this.boundsRect.right)
            ***REMOVED***
                this.sprite.cameraOffset.x = this.boundsRect.right - this.sprite.width;
            ***REMOVED***

            if (this.sprite.cameraOffset.y < this.boundsRect.top)
            ***REMOVED***
                this.sprite.cameraOffset.y = this.boundsRect.top;
            ***REMOVED***
            else if ((this.sprite.cameraOffset.y + this.sprite.height) > this.boundsRect.bottom)
            ***REMOVED***
                this.sprite.cameraOffset.y = this.boundsRect.bottom - this.sprite.height;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (this.sprite.left < this.boundsRect.left)
            ***REMOVED***
                this.sprite.x = this.boundsRect.x + this.sprite.offsetX;
            ***REMOVED***
            else if (this.sprite.right > this.boundsRect.right)
            ***REMOVED***
                this.sprite.x = this.boundsRect.right - (this.sprite.width - this.sprite.offsetX);
            ***REMOVED***

            if (this.sprite.top < this.boundsRect.top)
            ***REMOVED***
                this.sprite.y = this.boundsRect.top + this.sprite.offsetY;
            ***REMOVED***
            else if (this.sprite.bottom > this.boundsRect.bottom)
            ***REMOVED***
                this.sprite.y = this.boundsRect.bottom - (this.sprite.height - this.sprite.offsetY);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Parent Sprite Bounds check for the sprite drag.
    *
    * @method Phaser.InputHandler#checkBoundsSprite
    */
    checkBoundsSprite: function () ***REMOVED***

        if (this.sprite.fixedToCamera && this.boundsSprite.fixedToCamera)
        ***REMOVED***
            if (this.sprite.cameraOffset.x < this.boundsSprite.cameraOffset.x)
            ***REMOVED***
                this.sprite.cameraOffset.x = this.boundsSprite.cameraOffset.x;
            ***REMOVED***
            else if ((this.sprite.cameraOffset.x + this.sprite.width) > (this.boundsSprite.cameraOffset.x + this.boundsSprite.width))
            ***REMOVED***
                this.sprite.cameraOffset.x = (this.boundsSprite.cameraOffset.x + this.boundsSprite.width) - this.sprite.width;
            ***REMOVED***

            if (this.sprite.cameraOffset.y < this.boundsSprite.cameraOffset.y)
            ***REMOVED***
                this.sprite.cameraOffset.y = this.boundsSprite.cameraOffset.y;
            ***REMOVED***
            else if ((this.sprite.cameraOffset.y + this.sprite.height) > (this.boundsSprite.cameraOffset.y + this.boundsSprite.height))
            ***REMOVED***
                this.sprite.cameraOffset.y = (this.boundsSprite.cameraOffset.y + this.boundsSprite.height) - this.sprite.height;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (this.sprite.left < this.boundsSprite.left)
            ***REMOVED***
                this.sprite.x = this.boundsSprite.left + this.sprite.offsetX;
            ***REMOVED***
            else if (this.sprite.right > this.boundsSprite.right)
            ***REMOVED***
                this.sprite.x = this.boundsSprite.right - (this.sprite.width - this.sprite.offsetX);
            ***REMOVED***

            if (this.sprite.top < this.boundsSprite.top)
            ***REMOVED***
                this.sprite.y = this.boundsSprite.top + this.sprite.offsetY;
            ***REMOVED***
            else if (this.sprite.bottom > this.boundsSprite.bottom)
            ***REMOVED***
                this.sprite.y = this.boundsSprite.bottom - (this.sprite.height - this.sprite.offsetY);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

Phaser.InputHandler.prototype.constructor = Phaser.InputHandler;
