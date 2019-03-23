/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Bounds component contains properties related to the bounds of the Game Object.
*
* @class
*/
Phaser.Component.Bounds = function () ***REMOVED******REMOVED***;

Phaser.Component.Bounds.prototype = ***REMOVED***

    /**
    * The amount the Game Object is visually offset from its x coordinate.
    * This is the same as `width * anchor.x`.
    * It will only be > 0 if anchor.x is not equal to zero.
    *
    * @property ***REMOVED***number***REMOVED*** offsetX
    * @readOnly
    */
    offsetX: ***REMOVED***

        get: function () ***REMOVED***

            return this.anchor.x * this.width;

        ***REMOVED***

    ***REMOVED***,

    /**
    * The amount the Game Object is visually offset from its y coordinate.
    * This is the same as `height * anchor.y`.
    * It will only be > 0 if anchor.y is not equal to zero.
    *
    * @property ***REMOVED***number***REMOVED*** offsetY
    * @readOnly
    */
    offsetY: ***REMOVED***

        get: function () ***REMOVED***

            return this.anchor.y * this.height;

        ***REMOVED***

    ***REMOVED***,

    /**
    * The center x coordinate of the Game Object.
    * This is the same as `(x - offsetX) + (width / 2)`.
    *
    * @property ***REMOVED***number***REMOVED*** centerX
    */
    centerX: ***REMOVED***

        get: function () ***REMOVED***

            return (this.x - this.offsetX) + (this.width * 0.5);

        ***REMOVED***,

        set: function (value) ***REMOVED***

            this.x = (value + this.offsetX) - (this.width * 0.5);

        ***REMOVED***

    ***REMOVED***,

    /**
    * The center y coordinate of the Game Object.
    * This is the same as `(y - offsetY) + (height / 2)`.
    *
    * @property ***REMOVED***number***REMOVED*** centerY
    */
    centerY: ***REMOVED***

        get: function () ***REMOVED***

            return (this.y - this.offsetY) + (this.height * 0.5);

        ***REMOVED***,

        set: function (value) ***REMOVED***

            this.y = (value + this.offsetY) - (this.height * 0.5);

        ***REMOVED***

    ***REMOVED***,

    /**
    * The left coordinate of the Game Object.
    * This is the same as `x - offsetX`.
    *
    * @property ***REMOVED***number***REMOVED*** left
    */
    left: ***REMOVED***

        get: function () ***REMOVED***

            return this.x - this.offsetX;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            this.x = value + this.offsetX;

        ***REMOVED***

    ***REMOVED***,

    /**
    * The right coordinate of the Game Object.
    * This is the same as `x + width - offsetX`.
    *
    * @property ***REMOVED***number***REMOVED*** right
    */
    right: ***REMOVED***

        get: function () ***REMOVED***

            return (this.x + this.width) - this.offsetX;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            this.x = value - (this.width) + this.offsetX;

        ***REMOVED***

    ***REMOVED***,

    /**
    * The y coordinate of the Game Object.
    * This is the same as `y - offsetY`.
    *
    * @property ***REMOVED***number***REMOVED*** top
    */
    top: ***REMOVED***

        get: function () ***REMOVED***

            return this.y - this.offsetY;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            this.y = value + this.offsetY;

        ***REMOVED***

    ***REMOVED***,

    /**
    * The sum of the y and height properties.
    * This is the same as `y + height - offsetY`.
    *
    * @property ***REMOVED***number***REMOVED*** bottom
    */
    bottom: ***REMOVED***

        get: function () ***REMOVED***

            return (this.y + this.height) - this.offsetY;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            this.y = value - (this.height) + this.offsetY;

        ***REMOVED***

    ***REMOVED***,

    /**
    * Aligns this Game Object within another Game Object, or Rectangle, known as the
    * 'container', to one of 9 possible positions.
    *
    * The container must be a Game Object, or Phaser.Rectangle object. This can include properties
    * such as `World.bounds` or `Camera.view`, for aligning Game Objects within the world 
    * and camera bounds. Or it can include other Sprites, Images, Text objects, BitmapText,
    * TileSprites or Buttons.
    *
    * Please note that aligning a Sprite to another Game Object does **not** make it a child of
    * the container. It simply modifies its position coordinates so it aligns with it.
    * 
    * The position constants you can use are:
    * 
    * `Phaser.TOP_LEFT`, `Phaser.TOP_CENTER`, `Phaser.TOP_RIGHT`, `Phaser.LEFT_CENTER`, 
    * `Phaser.CENTER`, `Phaser.RIGHT_CENTER`, `Phaser.BOTTOM_LEFT`, 
    * `Phaser.BOTTOM_CENTER` and `Phaser.BOTTOM_RIGHT`.
    *
    * The Game Objects are placed in such a way that their _bounds_ align with the
    * container, taking into consideration rotation, scale and the anchor property.
    * This allows you to neatly align Game Objects, irrespective of their position value.
    *
    * The optional `offsetX` and `offsetY` arguments allow you to apply extra spacing to the final
    * aligned position of the Game Object. For example:
    *
    * `sprite.alignIn(background, Phaser.BOTTOM_RIGHT, -20, -20)`
    *
    * Would align the `sprite` to the bottom-right, but moved 20 pixels in from the corner.
    * Think of the offsets as applying an adjustment to the containers bounds before the alignment takes place.
    * So providing a negative offset will 'shrink' the container bounds by that amount, and providing a positive
    * one expands it.
    *
    * @method
    * @param ***REMOVED***Phaser.Rectangle|Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapText|Phaser.Button|Phaser.Graphics|Phaser.TileSprite***REMOVED*** container - The Game Object or Rectangle with which to align this Game Object to. Can also include properties such as `World.bounds` or `Camera.view`.
    * @param ***REMOVED***integer***REMOVED*** [position] - The position constant. One of `Phaser.TOP_LEFT` (default), `Phaser.TOP_CENTER`, `Phaser.TOP_RIGHT`, `Phaser.LEFT_CENTER`, `Phaser.CENTER`, `Phaser.RIGHT_CENTER`, `Phaser.BOTTOM_LEFT`, `Phaser.BOTTOM_CENTER` or `Phaser.BOTTOM_RIGHT`.
    * @param ***REMOVED***integer***REMOVED*** [offsetX=0] - A horizontal adjustment of the Containers bounds, applied to the aligned position of the Game Object. Use a negative value to shrink the bounds, positive to increase it.
    * @param ***REMOVED***integer***REMOVED*** [offsetY=0] - A vertical adjustment of the Containers bounds, applied to the aligned position of the Game Object. Use a negative value to shrink the bounds, positive to increase it.
    * @return ***REMOVED***Object***REMOVED*** This Game Object.
    */
    alignIn: function (container, position, offsetX, offsetY) ***REMOVED***

        if (offsetX === undefined) ***REMOVED*** offsetX = 0; ***REMOVED***
        if (offsetY === undefined) ***REMOVED*** offsetY = 0; ***REMOVED***

        switch (position)
        ***REMOVED***
            default:
            case Phaser.TOP_LEFT:
                this.left = container.left - offsetX;
                this.top = container.top - offsetY;
                break;

            case Phaser.TOP_CENTER:
                this.centerX = container.centerX + offsetX;
                this.top = container.top - offsetY;
                break;

            case Phaser.TOP_RIGHT:
                this.right = container.right + offsetX;
                this.top = container.top - offsetY;
                break;

            case Phaser.LEFT_CENTER:
                this.left = container.left - offsetX;
                this.centerY = container.centerY + offsetY;
                break;

            case Phaser.CENTER:
                this.centerX = container.centerX + offsetX;
                this.centerY = container.centerY + offsetY;
                break;

            case Phaser.RIGHT_CENTER:
                this.right = container.right + offsetX;
                this.centerY = container.centerY + offsetY;
                break;

            case Phaser.BOTTOM_LEFT:
                this.left = container.left - offsetX;
                this.bottom = container.bottom + offsetY;
                break;

            case Phaser.BOTTOM_CENTER:
                this.centerX = container.centerX + offsetX;
                this.bottom = container.bottom + offsetY;
                break;

            case Phaser.BOTTOM_RIGHT:
                this.right = container.right + offsetX;
                this.bottom = container.bottom + offsetY;
                break;
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Aligns this Game Object to the side of another Game Object, or Rectangle, known as the
    * 'parent', in one of 11 possible positions.
    *
    * The parent must be a Game Object, or Phaser.Rectangle object. This can include properties
    * such as `World.bounds` or `Camera.view`, for aligning Game Objects within the world 
    * and camera bounds. Or it can include other Sprites, Images, Text objects, BitmapText,
    * TileSprites or Buttons.
    *
    * Please note that aligning a Sprite to another Game Object does **not** make it a child of
    * the parent. It simply modifies its position coordinates so it aligns with it.
    * 
    * The position constants you can use are:
    * 
    * `Phaser.TOP_LEFT` (default), `Phaser.TOP_CENTER`, `Phaser.TOP_RIGHT`, `Phaser.LEFT_TOP`, 
    * `Phaser.LEFT_CENTER`, `Phaser.LEFT_BOTTOM`, `Phaser.RIGHT_TOP`, `Phaser.RIGHT_CENTER`, 
    * `Phaser.RIGHT_BOTTOM`, `Phaser.BOTTOM_LEFT`, `Phaser.BOTTOM_CENTER` 
    * and `Phaser.BOTTOM_RIGHT`.
    *
    * The Game Objects are placed in such a way that their _bounds_ align with the
    * parent, taking into consideration rotation, scale and the anchor property.
    * This allows you to neatly align Game Objects, irrespective of their position value.
    *
    * The optional `offsetX` and `offsetY` arguments allow you to apply extra spacing to the final
    * aligned position of the Game Object. For example:
    *
    * `sprite.alignTo(background, Phaser.BOTTOM_RIGHT, -20, -20)`
    *
    * Would align the `sprite` to the bottom-right, but moved 20 pixels in from the corner.
    * Think of the offsets as applying an adjustment to the parents bounds before the alignment takes place.
    * So providing a negative offset will 'shrink' the parent bounds by that amount, and providing a positive
    * one expands it.
    *
    * @method
    * @param ***REMOVED***Phaser.Rectangle|Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapText|Phaser.Button|Phaser.Graphics|Phaser.TileSprite***REMOVED*** parent - The Game Object or Rectangle with which to align this Game Object to. Can also include properties such as `World.bounds` or `Camera.view`.
    * @param ***REMOVED***integer***REMOVED*** [position] - The position constant. One of `Phaser.TOP_LEFT`, `Phaser.TOP_CENTER`, `Phaser.TOP_RIGHT`, `Phaser.LEFT_TOP`, `Phaser.LEFT_CENTER`, `Phaser.LEFT_BOTTOM`, `Phaser.RIGHT_TOP`, `Phaser.RIGHT_CENTER`, `Phaser.RIGHT_BOTTOM`, `Phaser.BOTTOM_LEFT`, `Phaser.BOTTOM_CENTER` or `Phaser.BOTTOM_RIGHT`.
    * @param ***REMOVED***integer***REMOVED*** [offsetX=0] - A horizontal adjustment of the Containers bounds, applied to the aligned position of the Game Object. Use a negative value to shrink the bounds, positive to increase it.
    * @param ***REMOVED***integer***REMOVED*** [offsetY=0] - A vertical adjustment of the Containers bounds, applied to the aligned position of the Game Object. Use a negative value to shrink the bounds, positive to increase it.
    * @return ***REMOVED***Object***REMOVED*** This Game Object.
    */
    alignTo: function (parent, position, offsetX, offsetY) ***REMOVED***

        if (offsetX === undefined) ***REMOVED*** offsetX = 0; ***REMOVED***
        if (offsetY === undefined) ***REMOVED*** offsetY = 0; ***REMOVED***

        switch (position)
        ***REMOVED***
            default:
            case Phaser.TOP_LEFT:
                this.left = parent.left - offsetX;
                this.bottom = parent.top - offsetY;
                break;

            case Phaser.TOP_CENTER:
                this.centerX = parent.centerX + offsetX;
                this.bottom = parent.top - offsetY;
                break;

            case Phaser.TOP_RIGHT:
                this.right = parent.right + offsetX;
                this.bottom = parent.top - offsetY;
                break;

            case Phaser.LEFT_TOP:
                this.right = parent.left - offsetX;
                this.top = parent.top - offsetY;
                break;

            case Phaser.LEFT_CENTER:
                this.right = parent.left - offsetX;
                this.centerY = parent.centerY + offsetY;
                break;

            case Phaser.LEFT_BOTTOM:
                this.right = parent.left - offsetX;
                this.bottom = parent.bottom + offsetY;
                break;

            case Phaser.RIGHT_TOP:
                this.left = parent.right + offsetX;
                this.top = parent.top - offsetY;
                break;

            case Phaser.RIGHT_CENTER:
                this.left = parent.right + offsetX;
                this.centerY = parent.centerY + offsetY;
                break;

            case Phaser.RIGHT_BOTTOM:
                this.left = parent.right + offsetX;
                this.bottom = parent.bottom + offsetY;
                break;

            case Phaser.BOTTOM_LEFT:
                this.left = parent.left - offsetX;
                this.top = parent.bottom + offsetY;
                break;

            case Phaser.BOTTOM_CENTER:
                this.centerX = parent.centerX + offsetX;
                this.top = parent.bottom + offsetY;
                break;

            case Phaser.BOTTOM_RIGHT:
                this.right = parent.right + offsetX;
                this.top = parent.bottom + offsetY;
                break;
        ***REMOVED***

        return this;

    ***REMOVED***

***REMOVED***;

//  Phaser.Group extensions

Phaser.Group.prototype.alignIn = Phaser.Component.Bounds.prototype.alignIn;
Phaser.Group.prototype.alignTo = Phaser.Component.Bounds.prototype.alignTo;
