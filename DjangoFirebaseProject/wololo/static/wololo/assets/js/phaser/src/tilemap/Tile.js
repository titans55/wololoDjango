/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A Tile is a representation of a single tile within the Tilemap.
*
* @class Phaser.Tile
* @constructor
* @param ***REMOVED***object***REMOVED*** layer - The layer in the Tilemap data that this tile belongs to.
* @param ***REMOVED***number***REMOVED*** index - The index of this tile type in the core map data.
* @param ***REMOVED***number***REMOVED*** x - The x coordinate of this tile.
* @param ***REMOVED***number***REMOVED*** y - The y coordinate of this tile.
* @param ***REMOVED***number***REMOVED*** width - Width of the tile.
* @param ***REMOVED***number***REMOVED*** height - Height of the tile.
*/
Phaser.Tile = function (layer, index, x, y, width, height) ***REMOVED***

    /**
    * @property ***REMOVED***object***REMOVED*** layer - The layer in the Tilemap data that this tile belongs to.
    */
    this.layer = layer;

    /**
    * @property ***REMOVED***number***REMOVED*** index - The index of this tile within the map data corresponding to the tileset, or -1 if this represents a blank/null tile.
    */
    this.index = index;

    /**
    * @property ***REMOVED***number***REMOVED*** x - The x map coordinate of this tile.
    */
    this.x = x;

    /**
    * @property ***REMOVED***number***REMOVED*** y - The y map coordinate of this tile.
    */
    this.y = y;
    
    /**
    * @property ***REMOVED***number***REMOVED*** rotation - The rotation angle of this tile.
    */
    this.rotation = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** flipped - Whether this tile is flipped (mirrored) or not.
    */
    this.flipped = false;
    
    /**
    * @property ***REMOVED***number***REMOVED*** x - The x map coordinate of this tile.
    */
    this.worldX = x * width;

    /**
    * @property ***REMOVED***number***REMOVED*** y - The y map coordinate of this tile.
    */
    this.worldY = y * height;

    /**
    * @property ***REMOVED***number***REMOVED*** width - The width of the tile in pixels.
    */
    this.width = width;

    /**
    * @property ***REMOVED***number***REMOVED*** height - The height of the tile in pixels.
    */
    this.height = height;

    /**
    * @property ***REMOVED***number***REMOVED*** width - The width of the tile in pixels.
    */
    this.centerX = Math.abs(width / 2);

    /**
    * @property ***REMOVED***number***REMOVED*** height - The height of the tile in pixels.
    */
    this.centerY = Math.abs(height / 2);

    /**
    * @property ***REMOVED***number***REMOVED*** alpha - The alpha value at which this tile is drawn to the canvas.
    */
    this.alpha = 1;

    /**
    * @property ***REMOVED***object***REMOVED*** properties - Tile specific properties.
    */
    this.properties = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***boolean***REMOVED*** scanned - Has this tile been walked / turned into a poly?
    */
    this.scanned = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** faceTop - Is the top of this tile an interesting edge?
    */
    this.faceTop = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** faceBottom - Is the bottom of this tile an interesting edge?
    */
    this.faceBottom = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** faceLeft - Is the left of this tile an interesting edge?
    */
    this.faceLeft = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** faceRight - Is the right of this tile an interesting edge?
    */
    this.faceRight = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** collideLeft - Indicating collide with any object on the left.
    * @default
    */
    this.collideLeft = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** collideRight - Indicating collide with any object on the right.
    * @default
    */
    this.collideRight = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** collideUp - Indicating collide with any object on the top.
    * @default
    */
    this.collideUp = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** collideDown - Indicating collide with any object on the bottom.
    * @default
    */
    this.collideDown = false;

    /**
    * @property ***REMOVED***function***REMOVED*** collisionCallback - Tile collision callback.
    * @default
    */
    this.collisionCallback = null;

    /**
    * @property ***REMOVED***object***REMOVED*** collisionCallbackContext - The context in which the collision callback will be called.
    * @default
    */
    this.collisionCallbackContext = this;

***REMOVED***;

Phaser.Tile.prototype = ***REMOVED***

    /**
    * Check if the given x and y world coordinates are within this Tile.
    *
    * @method Phaser.Tile#containsPoint
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate to test.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate to test.
    * @return ***REMOVED***boolean***REMOVED*** True if the coordinates are within this Tile, otherwise false.
    */
    containsPoint: function (x, y) ***REMOVED***

        return !(x < this.worldX || y < this.worldY || x > this.right || y > this.bottom);

    ***REMOVED***,

    /**
    * Check for intersection with this tile.
    *
    * @method Phaser.Tile#intersects
    * @param ***REMOVED***number***REMOVED*** x - The x axis in pixels.
    * @param ***REMOVED***number***REMOVED*** y - The y axis in pixels.
    * @param ***REMOVED***number***REMOVED*** right - The right point.
    * @param ***REMOVED***number***REMOVED*** bottom - The bottom point.
    */
    intersects: function (x, y, right, bottom) ***REMOVED***

        if (right <= this.worldX)
        ***REMOVED***
            return false;
        ***REMOVED***

        if (bottom <= this.worldY)
        ***REMOVED***
            return false;
        ***REMOVED***

        if (x >= this.worldX + this.width)
        ***REMOVED***
            return false;
        ***REMOVED***

        if (y >= this.worldY + this.height)
        ***REMOVED***
            return false;
        ***REMOVED***

        return true;

    ***REMOVED***,

    /**
    * Set a callback to be called when this tile is hit by an object.
    * The callback must true true for collision processing to take place.
    *
    * @method Phaser.Tile#setCollisionCallback
    * @param ***REMOVED***function***REMOVED*** callback - Callback function.
    * @param ***REMOVED***object***REMOVED*** context - Callback will be called within this context.
    */
    setCollisionCallback: function (callback, context) ***REMOVED***

        this.collisionCallback = callback;
        this.collisionCallbackContext = context;

    ***REMOVED***,

    /**
    * Clean up memory.
    *
    * @method Phaser.Tile#destroy
    */
    destroy: function () ***REMOVED***

        this.collisionCallback = null;
        this.collisionCallbackContext = null;
        this.properties = null;

    ***REMOVED***,

    /**
    * Sets the collision flags for each side of this tile and updates the interesting faces list.
    *
    * @method Phaser.Tile#setCollision
    * @param ***REMOVED***boolean***REMOVED*** left - Indicating collide with any object on the left.
    * @param ***REMOVED***boolean***REMOVED*** right - Indicating collide with any object on the right.
    * @param ***REMOVED***boolean***REMOVED*** up - Indicating collide with any object on the top.
    * @param ***REMOVED***boolean***REMOVED*** down - Indicating collide with any object on the bottom.
    */
    setCollision: function (left, right, up, down) ***REMOVED***

        this.collideLeft = left;
        this.collideRight = right;
        this.collideUp = up;
        this.collideDown = down;

        this.faceLeft = left;
        this.faceRight = right;
        this.faceTop = up;
        this.faceBottom = down;

    ***REMOVED***,

    /**
    * Reset collision status flags.
    *
    * @method Phaser.Tile#resetCollision
    */
    resetCollision: function () ***REMOVED***

        this.collideLeft = false;
        this.collideRight = false;
        this.collideUp = false;
        this.collideDown = false;

        this.faceTop = false;
        this.faceBottom = false;
        this.faceLeft = false;
        this.faceRight = false;

    ***REMOVED***,

    /**
    * Is this tile interesting?
    *
    * @method Phaser.Tile#isInteresting
    * @param ***REMOVED***boolean***REMOVED*** collides - If true will check any collides value.
    * @param ***REMOVED***boolean***REMOVED*** faces - If true will check any face value.
    * @return ***REMOVED***boolean***REMOVED*** True if the Tile is interesting, otherwise false.
    */
    isInteresting: function (collides, faces) ***REMOVED***

        if (collides && faces)
        ***REMOVED***
            //  Does this tile have any collide flags OR interesting face?
            return (this.collideLeft || this.collideRight || this.collideUp || this.collideDown || this.faceTop || this.faceBottom || this.faceLeft || this.faceRight || this.collisionCallback);
        ***REMOVED***
        else if (collides)
        ***REMOVED***
            //  Does this tile collide?
            return (this.collideLeft || this.collideRight || this.collideUp || this.collideDown);
        ***REMOVED***
        else if (faces)
        ***REMOVED***
            //  Does this tile have an interesting face?
            return (this.faceTop || this.faceBottom || this.faceLeft || this.faceRight);
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Copies the tile data and properties from the given tile to this tile.
    *
    * @method Phaser.Tile#copy
    * @param ***REMOVED***Phaser.Tile***REMOVED*** tile - The tile to copy from.
    */
    copy: function (tile) ***REMOVED***

        this.index = tile.index;
        this.alpha = tile.alpha;
        this.properties = tile.properties;

        this.collideUp = tile.collideUp;
        this.collideDown = tile.collideDown;
        this.collideLeft = tile.collideLeft;
        this.collideRight = tile.collideRight;

        this.collisionCallback = tile.collisionCallback;
        this.collisionCallbackContext = tile.collisionCallbackContext;

    ***REMOVED***

***REMOVED***;

Phaser.Tile.prototype.constructor = Phaser.Tile;

/**
* @name Phaser.Tile#collides
* @property ***REMOVED***boolean***REMOVED*** collides - True if this tile can collide on any of its faces.
* @readonly
*/
Object.defineProperty(Phaser.Tile.prototype, "collides", ***REMOVED***

    get: function () ***REMOVED***
        return (this.collideLeft || this.collideRight || this.collideUp || this.collideDown);
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Tile#canCollide
* @property ***REMOVED***boolean***REMOVED*** canCollide - True if this tile can collide on any of its faces or has a collision callback set.
* @readonly
*/
Object.defineProperty(Phaser.Tile.prototype, "canCollide", ***REMOVED***

    get: function () ***REMOVED***
        return (this.collideLeft || this.collideRight || this.collideUp || this.collideDown || this.collisionCallback);
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Tile#left
* @property ***REMOVED***number***REMOVED*** left - The x value in pixels.
* @readonly
*/
Object.defineProperty(Phaser.Tile.prototype, "left", ***REMOVED***

    get: function () ***REMOVED***
        return this.worldX;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Tile#right
* @property ***REMOVED***number***REMOVED*** right - The sum of the x and width properties.
* @readonly
*/
Object.defineProperty(Phaser.Tile.prototype, "right", ***REMOVED***

    get: function () ***REMOVED***
        return this.worldX + this.width;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Tile#top
* @property ***REMOVED***number***REMOVED*** top - The y value.
* @readonly
*/
Object.defineProperty(Phaser.Tile.prototype, "top", ***REMOVED***

    get: function () ***REMOVED***
        return this.worldY;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Tile#bottom
* @property ***REMOVED***number***REMOVED*** bottom - The sum of the y and height properties.
* @readonly
*/
Object.defineProperty(Phaser.Tile.prototype, "bottom", ***REMOVED***

    get: function () ***REMOVED***
        return this.worldY + this.height;
    ***REMOVED***

***REMOVED***);
