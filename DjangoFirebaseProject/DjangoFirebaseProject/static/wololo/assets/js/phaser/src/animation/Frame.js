/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A Frame is a single frame of an animation and is part of a FrameData collection.
*
* @class Phaser.Frame
* @constructor
* @param ***REMOVED***number***REMOVED*** index - The index of this Frame within the FrameData set it is being added to.
* @param ***REMOVED***number***REMOVED*** x - X position of the frame within the texture image.
* @param ***REMOVED***number***REMOVED*** y - Y position of the frame within the texture image.
* @param ***REMOVED***number***REMOVED*** width - Width of the frame within the texture image.
* @param ***REMOVED***number***REMOVED*** height - Height of the frame within the texture image.
* @param ***REMOVED***string***REMOVED*** name - The name of the frame. In Texture Atlas data this is usually set to the filename.
*/
Phaser.Frame = function (index, x, y, width, height, name) ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** index - The index of this Frame within the FrameData set it is being added to.
    */
    this.index = index;

    /**
    * @property ***REMOVED***number***REMOVED*** x - X position within the image to cut from.
    */
    this.x = x;

    /**
    * @property ***REMOVED***number***REMOVED*** y - Y position within the image to cut from.
    */
    this.y = y;

    /**
    * @property ***REMOVED***number***REMOVED*** width - Width of the frame.
    */
    this.width = width;

    /**
    * @property ***REMOVED***number***REMOVED*** height - Height of the frame.
    */
    this.height = height;

    /**
    * @property ***REMOVED***string***REMOVED*** name - Useful for Texture Atlas files (is set to the filename value).
    */
    this.name = name;

    /**
    * @property ***REMOVED***number***REMOVED*** centerX - Center X position within the image to cut from.
    */
    this.centerX = Math.floor(width / 2);

    /**
    * @property ***REMOVED***number***REMOVED*** centerY - Center Y position within the image to cut from.
    */
    this.centerY = Math.floor(height / 2);

    /**
    * @property ***REMOVED***number***REMOVED*** distance - The distance from the top left to the bottom-right of this Frame.
    */
    this.distance = Phaser.Math.distance(0, 0, width, height);

    /**
    * @property ***REMOVED***boolean***REMOVED*** rotated - Rotated? (not yet implemented)
    * @default
    */
    this.rotated = false;

    /**
    * @property ***REMOVED***string***REMOVED*** rotationDirection - Either 'cw' or 'ccw', rotation is always 90 degrees.
    * @default 'cw'
    */
    this.rotationDirection = 'cw';

    /**
    * @property ***REMOVED***boolean***REMOVED*** trimmed - Was it trimmed when packed?
    * @default
    */
    this.trimmed = false;

    /**
    * @property ***REMOVED***number***REMOVED*** sourceSizeW - Width of the original sprite before it was trimmed.
    */
    this.sourceSizeW = width;

    /**
    * @property ***REMOVED***number***REMOVED*** sourceSizeH - Height of the original sprite before it was trimmed.
    */
    this.sourceSizeH = height;

    /**
    * @property ***REMOVED***number***REMOVED*** spriteSourceSizeX - X position of the trimmed sprite inside original sprite.
    * @default
    */
    this.spriteSourceSizeX = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** spriteSourceSizeY - Y position of the trimmed sprite inside original sprite.
    * @default
    */
    this.spriteSourceSizeY = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** spriteSourceSizeW - Width of the trimmed sprite.
    * @default
    */
    this.spriteSourceSizeW = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** spriteSourceSizeH - Height of the trimmed sprite.
    * @default
    */
    this.spriteSourceSizeH = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** right - The right of the Frame (x + width).
    */
    this.right = this.x + this.width;

    /**
    * @property ***REMOVED***number***REMOVED*** bottom - The bottom of the frame (y + height).
    */
    this.bottom = this.y + this.height;

***REMOVED***;

Phaser.Frame.prototype = ***REMOVED***

    /**
    * Adjusts of all the Frame properties based on the given width and height values.
    *
    * @method Phaser.Frame#resize
    * @param ***REMOVED***integer***REMOVED*** width - The new width of the Frame.
    * @param ***REMOVED***integer***REMOVED*** height - The new height of the Frame.
    */
    resize: function (width, height) ***REMOVED***

        this.width = width;
        this.height = height;
        this.centerX = Math.floor(width / 2);
        this.centerY = Math.floor(height / 2);
        this.distance = Phaser.Math.distance(0, 0, width, height);
        this.sourceSizeW = width;
        this.sourceSizeH = height;
        this.right = this.x + width;
        this.bottom = this.y + height;

    ***REMOVED***,

    /**
    * If the frame was trimmed when added to the Texture Atlas this records the trim and source data.
    *
    * @method Phaser.Frame#setTrim
    * @param ***REMOVED***boolean***REMOVED*** trimmed - If this frame was trimmed or not.
    * @param ***REMOVED***number***REMOVED*** actualWidth - The width of the frame before being trimmed.
    * @param ***REMOVED***number***REMOVED*** actualHeight - The height of the frame before being trimmed.
    * @param ***REMOVED***number***REMOVED*** destX - The destination X position of the trimmed frame for display.
    * @param ***REMOVED***number***REMOVED*** destY - The destination Y position of the trimmed frame for display.
    * @param ***REMOVED***number***REMOVED*** destWidth - The destination width of the trimmed frame for display.
    * @param ***REMOVED***number***REMOVED*** destHeight - The destination height of the trimmed frame for display.
    */
    setTrim: function (trimmed, actualWidth, actualHeight, destX, destY, destWidth, destHeight) ***REMOVED***

        this.trimmed = trimmed;

        if (trimmed)
        ***REMOVED***
            this.sourceSizeW = actualWidth;
            this.sourceSizeH = actualHeight;
            this.centerX = Math.floor(actualWidth / 2);
            this.centerY = Math.floor(actualHeight / 2);
            this.spriteSourceSizeX = destX;
            this.spriteSourceSizeY = destY;
            this.spriteSourceSizeW = destWidth;
            this.spriteSourceSizeH = destHeight;
        ***REMOVED***

    ***REMOVED***,

    /**
     * Clones this Frame into a new Phaser.Frame object and returns it.
     * Note that all properties are cloned, including the name, index and UUID.
     *
     * @method Phaser.Frame#clone
     * @return ***REMOVED***Phaser.Frame***REMOVED*** An exact copy of this Frame object.
     */
    clone: function () ***REMOVED***

        var output = new Phaser.Frame(this.index, this.x, this.y, this.width, this.height, this.name);

        for (var prop in this)
        ***REMOVED***
            if (this.hasOwnProperty(prop))
            ***REMOVED***
                output[prop] = this[prop];
            ***REMOVED***
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Returns a Rectangle set to the dimensions of this Frame.
    *
    * @method Phaser.Frame#getRect
    * @param ***REMOVED***Phaser.Rectangle***REMOVED*** [out] - A rectangle to copy the frame dimensions to.
    * @return ***REMOVED***Phaser.Rectangle***REMOVED*** A rectangle.
    */
    getRect: function (out) ***REMOVED***

        if (out === undefined)
        ***REMOVED***
            out = new Phaser.Rectangle(this.x, this.y, this.width, this.height);
        ***REMOVED***
        else
        ***REMOVED***
            out.setTo(this.x, this.y, this.width, this.height);
        ***REMOVED***

        return out;

    ***REMOVED***

***REMOVED***;

Phaser.Frame.prototype.constructor = Phaser.Frame;
