/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* An Image Collection is a special tileset containing mulitple images, with no slicing into each image.
*
* Image Collections are normally created automatically when Tiled data is loaded.
*
* @class Phaser.ImageCollection
* @constructor
* @param ***REMOVED***string***REMOVED*** name - The name of the image collection in the map data.
* @param ***REMOVED***integer***REMOVED*** firstgid - The first image index this image collection contains.
* @param ***REMOVED***integer***REMOVED*** [width=32] - Width of widest image (in pixels).
* @param ***REMOVED***integer***REMOVED*** [height=32] - Height of tallest image (in pixels).
* @param ***REMOVED***integer***REMOVED*** [margin=0] - The margin around all images in the collection (in pixels).
* @param ***REMOVED***integer***REMOVED*** [spacing=0] - The spacing between each image in the collection (in pixels).
* @param ***REMOVED***object***REMOVED*** [properties=***REMOVED******REMOVED***] - Custom Image Collection properties.
*/
Phaser.ImageCollection = function (name, firstgid, width, height, margin, spacing, properties) ***REMOVED***

    if (width === undefined || width <= 0) ***REMOVED*** width = 32; ***REMOVED***
    if (height === undefined || height <= 0) ***REMOVED*** height = 32; ***REMOVED***
    if (margin === undefined) ***REMOVED*** margin = 0; ***REMOVED***
    if (spacing === undefined) ***REMOVED*** spacing = 0; ***REMOVED***

    /**
    * The name of the Image Collection.
    * @property ***REMOVED***string***REMOVED*** name
    */
    this.name = name;

    /**
    * The Tiled firstgid value.
    * This is the starting index of the first image index this Image Collection contains.
    * @property ***REMOVED***integer***REMOVED*** firstgid
    */
    this.firstgid = firstgid | 0;

    /**
    * The width of the widest image (in pixels).
    * @property ***REMOVED***integer***REMOVED*** imageWidth
    * @readonly
    */
    this.imageWidth = width | 0;

    /**
    * The height of the tallest image (in pixels).
    * @property ***REMOVED***integer***REMOVED*** imageHeight
    * @readonly
    */
    this.imageHeight = height | 0;

    /**
    * The margin around the images in the collection (in pixels).
    * Use `setSpacing` to change.
    * @property ***REMOVED***integer***REMOVED*** imageMarge
    * @readonly
    */
    // Modified internally
    this.imageMargin = margin | 0;

    /**
    * The spacing between each image in the collection (in pixels).
    * Use `setSpacing` to change.
    * @property ***REMOVED***integer***REMOVED*** imageSpacing
    * @readonly
    */
    this.imageSpacing = spacing | 0;

    /**
    * Image Collection-specific properties that are typically defined in the Tiled editor.
    * @property ***REMOVED***object***REMOVED*** properties
    */
    this.properties = properties || ***REMOVED******REMOVED***;

    /**
    * The cached images that are a part of this collection.
    * @property ***REMOVED***array***REMOVED*** images
    * @readonly
    */
    // Modified internally
    this.images = [];

    /**
    * The total number of images in the image collection.
    * @property ***REMOVED***integer***REMOVED*** total
    * @readonly
    */
    // Modified internally
    this.total = 0;
***REMOVED***;

Phaser.ImageCollection.prototype = ***REMOVED***

    /**
    * Returns true if and only if this image collection contains the given image index.
    *
    * @method Phaser.ImageCollection#containsImageIndex
    * @param ***REMOVED***integer***REMOVED*** imageIndex - The image index to search for.
    * @return ***REMOVED***boolean***REMOVED*** True if this Image Collection contains the given index.
    */
    containsImageIndex: function (imageIndex) ***REMOVED***

        return (
            imageIndex >= this.firstgid &&
            imageIndex < (this.firstgid + this.total)
        );

    ***REMOVED***,

    /**
    * Add an image to this Image Collection.
    *
    * @method Phaser.ImageCollection#addImage
    * @param ***REMOVED***integer***REMOVED*** gid - The gid of the image in the Image Collection.
    * @param ***REMOVED***string***REMOVED*** image - The the key of the image in the Image Collection and in the cache.
    */
    addImage: function (gid, image) ***REMOVED***

        this.images.push(***REMOVED*** gid: gid, image: image ***REMOVED***);
        this.total++;

    ***REMOVED***

***REMOVED***;

Phaser.ImageCollection.prototype.constructor = Phaser.ImageCollection;

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

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Creates a new Phaser.Tilemap object. The map can either be populated with data from a Tiled JSON file or from a CSV file.
*
* Tiled is a free software package specifically for creating tile maps, and is available from http://www.mapeditor.org
* 
* To do this pass the Cache key as the first parameter. When using Tiled data you need only provide the key.
* When using CSV data you must provide the key and the tileWidth and tileHeight parameters.
* If creating a blank tilemap to be populated later, you can either specify no parameters at all and then use `Tilemap.create` or pass the map and tile dimensions here.
* Note that all Tilemaps use a base tile size to calculate dimensions from, but that a TilemapLayer may have its own unique tile size that overrides it.
* A Tile map is rendered to the display using a TilemapLayer. It is not added to the display list directly itself.
* A map may have multiple layers. You can perform operations on the map data such as copying, pasting, filling and shuffling the tiles around.
*
* @class Phaser.Tilemap
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Game reference to the currently running game.
* @param ***REMOVED***string***REMOVED*** [key] - The key of the tilemap data as stored in the Cache. If you're creating a blank map either leave this parameter out or pass `null`.
* @param ***REMOVED***number***REMOVED*** [tileWidth=32] - The pixel width of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
* @param ***REMOVED***number***REMOVED*** [tileHeight=32] - The pixel height of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
* @param ***REMOVED***number***REMOVED*** [width=10] - The width of the map in tiles. If this map is created from Tiled or CSV data you don't need to specify this.
* @param ***REMOVED***number***REMOVED*** [height=10] - The height of the map in tiles. If this map is created from Tiled or CSV data you don't need to specify this.
*/
Phaser.Tilemap = function (game, key, tileWidth, tileHeight, width, height) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running Game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***string***REMOVED*** key - The key of this map data in the Phaser.Cache.
    */
    this.key = key;

    var data = Phaser.TilemapParser.parse(this.game, key, tileWidth, tileHeight, width, height);

    if (data === null)
    ***REMOVED***
        return;
    ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** width - The width of the map (in tiles).
    */
    this.width = data.width;

    /**
    * @property ***REMOVED***number***REMOVED*** height - The height of the map (in tiles).
    */
    this.height = data.height;

    /**
    * @property ***REMOVED***number***REMOVED*** tileWidth - The base width of the tiles in the map (in pixels).
    */
    this.tileWidth = data.tileWidth;

    /**
    * @property ***REMOVED***number***REMOVED*** tileHeight - The base height of the tiles in the map (in pixels).
    */
    this.tileHeight = data.tileHeight;

    /**
    * @property ***REMOVED***string***REMOVED*** orientation - The orientation of the map data (as specified in Tiled), usually 'orthogonal'.
    */
    this.orientation = data.orientation;

    /**
    * @property ***REMOVED***number***REMOVED*** format - The format of the map data, either Phaser.Tilemap.CSV or Phaser.Tilemap.TILED_JSON.
    */
    this.format = data.format;

    /**
    * @property ***REMOVED***number***REMOVED*** version - The version of the map data (as specified in Tiled, usually 1).
    */
    this.version = data.version;

    /**
    * @property ***REMOVED***object***REMOVED*** properties - Map specific properties as specified in Tiled.
    */
    this.properties = data.properties;

    /**
    * @property ***REMOVED***number***REMOVED*** widthInPixels - The width of the map in pixels based on width * tileWidth.
    */
    this.widthInPixels = data.widthInPixels;

    /**
    * @property ***REMOVED***number***REMOVED*** heightInPixels - The height of the map in pixels based on height * tileHeight.
    */
    this.heightInPixels = data.heightInPixels;

    /**
    * @property ***REMOVED***array***REMOVED*** layers - An array of Tilemap layer data.
    */
    this.layers = data.layers;

    /**
    * @property ***REMOVED***array***REMOVED*** tilesets - An array of Tilesets.
    */
    this.tilesets = data.tilesets;
    
    /**
    * @property ***REMOVED***array***REMOVED*** imagecollections - An array of Image Collections.
    */
    this.imagecollections = data.imagecollections;

    /**
    * @property ***REMOVED***array***REMOVED*** tiles - The super array of Tiles.
    */
    this.tiles = data.tiles;

    /**
    * @property ***REMOVED***array***REMOVED*** objects - An array of Tiled Object Layers.
    */
    this.objects = data.objects;

    /**
    * @property ***REMOVED***array***REMOVED*** collideIndexes - An array of tile indexes that collide.
    */
    this.collideIndexes = [];

    /**
    * @property ***REMOVED***array***REMOVED*** collision - An array of collision data (polylines, etc).
    */
    this.collision = data.collision;

    /**
    * @property ***REMOVED***array***REMOVED*** images - An array of Tiled Image Layers.
    */
    this.images = data.images;

    /**
    * @property ***REMOVED***boolean***REMOVED*** enableDebug - If set then console.log is used to dump out useful layer creation debug data.
    */
    this.enableDebug = false;

    /**
    * @property ***REMOVED***number***REMOVED*** currentLayer - The current layer.
    */
    this.currentLayer = 0;

    /**
    * @property ***REMOVED***array***REMOVED*** debugMap - Map data used for debug values only.
    */
    this.debugMap = [];

    /**
    * @property ***REMOVED***array***REMOVED*** _results - Internal var.
    * @private
    */
    this._results = [];

    /**
    * @property ***REMOVED***number***REMOVED*** _tempA - Internal var.
    * @private
    */
    this._tempA = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _tempB - Internal var.
    * @private
    */
    this._tempB = 0;

***REMOVED***;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Tilemap.CSV = 0;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Tilemap.TILED_JSON = 1;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Tilemap.NORTH = 0;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Tilemap.EAST = 1;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Tilemap.SOUTH = 2;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Tilemap.WEST = 3;

Phaser.Tilemap.prototype = ***REMOVED***

    /**
    * Creates an empty map of the given dimensions and one blank layer. If layers already exist they are erased.
    *
    * @method Phaser.Tilemap#create
    * @param ***REMOVED***string***REMOVED*** name - The name of the default layer of the map.
    * @param ***REMOVED***number***REMOVED*** width - The width of the map in tiles.
    * @param ***REMOVED***number***REMOVED*** height - The height of the map in tiles.
    * @param ***REMOVED***number***REMOVED*** tileWidth - The width of the tiles the map uses for calculations.
    * @param ***REMOVED***number***REMOVED*** tileHeight - The height of the tiles the map uses for calculations.
    * @param ***REMOVED***Phaser.Group***REMOVED*** [group] - Optional Group to add the layer to. If not specified it will be added to the World group.
    * @return ***REMOVED***Phaser.TilemapLayer***REMOVED*** The TilemapLayer object. This is an extension of Phaser.Image and can be moved around the display list accordingly.
    */
    create: function (name, width, height, tileWidth, tileHeight, group) ***REMOVED***

        if (group === undefined) ***REMOVED*** group = this.game.world; ***REMOVED***

        this.width = width;
        this.height = height;

        this.setTileSize(tileWidth, tileHeight);

        this.layers.length = 0;

        return this.createBlankLayer(name, width, height, tileWidth, tileHeight, group);

    ***REMOVED***,

    /**
    * Sets the base tile size for the map.
    *
    * @method Phaser.Tilemap#setTileSize
    * @param ***REMOVED***number***REMOVED*** tileWidth - The width of the tiles the map uses for calculations.
    * @param ***REMOVED***number***REMOVED*** tileHeight - The height of the tiles the map uses for calculations.
    */
    setTileSize: function (tileWidth, tileHeight) ***REMOVED***

        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.widthInPixels = this.width * tileWidth;
        this.heightInPixels = this.height * tileHeight;

    ***REMOVED***,

    /**
    * Adds an image to the map to be used as a tileset. A single map may use multiple tilesets.
    * Note that the tileset name can be found in the JSON file exported from Tiled, or in the Tiled editor.
    *
    * @method Phaser.Tilemap#addTilesetImage
    * @param ***REMOVED***string***REMOVED*** tileset - The name of the tileset as specified in the map data.
    * @param ***REMOVED***string|Phaser.BitmapData***REMOVED*** [key] - The key of the Phaser.Cache image used for this tileset.
    *     If `undefined` or `null` it will look for an image with a key matching the tileset parameter.
    *     You can also pass in a BitmapData which can be used instead of an Image.
    * @param ***REMOVED***number***REMOVED*** [tileWidth=32] - The width of the tiles in the Tileset Image. If not given it will default to the map.tileWidth value, if that isn't set then 32.
    * @param ***REMOVED***number***REMOVED*** [tileHeight=32] - The height of the tiles in the Tileset Image. If not given it will default to the map.tileHeight value, if that isn't set then 32.
    * @param ***REMOVED***number***REMOVED*** [tileMargin=0] - The width of the tiles in the Tileset Image.
    * @param ***REMOVED***number***REMOVED*** [tileSpacing=0] - The height of the tiles in the Tileset Image.
    * @param ***REMOVED***number***REMOVED*** [gid=0] - If adding multiple tilesets to a blank/dynamic map, specify the starting GID the set will use here.
    * @return ***REMOVED***Phaser.Tileset***REMOVED*** Returns the Tileset object that was created or updated, or null if it failed.
    */
    addTilesetImage: function (tileset, key, tileWidth, tileHeight, tileMargin, tileSpacing, gid) ***REMOVED***

        if (tileset === undefined) ***REMOVED*** return null; ***REMOVED***
        if (tileWidth === undefined) ***REMOVED*** tileWidth = this.tileWidth; ***REMOVED***
        if (tileHeight === undefined) ***REMOVED*** tileHeight = this.tileHeight; ***REMOVED***
        if (tileMargin === undefined) ***REMOVED*** tileMargin = 0; ***REMOVED***
        if (tileSpacing === undefined) ***REMOVED*** tileSpacing = 0; ***REMOVED***
        if (gid === undefined) ***REMOVED*** gid = 0; ***REMOVED***

        //  In-case we're working from a blank map
        if (tileWidth === 0)
        ***REMOVED***
            tileWidth = 32;
        ***REMOVED***

        if (tileHeight === 0)
        ***REMOVED***
            tileHeight = 32;
        ***REMOVED***

        var img = null;

        if (key === undefined || key === null)
        ***REMOVED***
            key = tileset;
        ***REMOVED***

        if (key instanceof Phaser.BitmapData)
        ***REMOVED***
            img = key.canvas;
        ***REMOVED***
        else
        ***REMOVED***
            if (!this.game.cache.checkImageKey(key))
            ***REMOVED***
                console.warn('Phaser.Tilemap.addTilesetImage: Invalid image key given: "' + key + '"');
                return null;
            ***REMOVED***

            img = this.game.cache.getImage(key);
        ***REMOVED***

        var idx = this.getTilesetIndex(tileset);

        if (idx === null && this.format === Phaser.Tilemap.TILED_JSON)
        ***REMOVED***
            console.warn('Phaser.Tilemap.addTilesetImage: No data found in the JSON matching the tileset name: "' + tileset + '"');
            return null;
        ***REMOVED***

        if (this.tilesets[idx])
        ***REMOVED***
            this.tilesets[idx].setImage(img);
            return this.tilesets[idx];
        ***REMOVED***
        else
        ***REMOVED***
            var newSet = new Phaser.Tileset(tileset, gid, tileWidth, tileHeight, tileMargin, tileSpacing, ***REMOVED******REMOVED***);

            newSet.setImage(img);

            this.tilesets.push(newSet);

            var i = this.tilesets.length - 1;
            var x = tileMargin;
            var y = tileMargin;

            var count = 0;
            var countX = 0;
            var countY = 0;

            for (var t = gid; t < gid + newSet.total; t++)
            ***REMOVED***
                this.tiles[t] = [x, y, i];

                x += tileWidth + tileSpacing;

                count++;

                if (count === newSet.total)
                ***REMOVED***
                    break;
                ***REMOVED***

                countX++;

                if (countX === newSet.columns)
                ***REMOVED***
                    x = tileMargin;
                    y += tileHeight + tileSpacing;

                    countX = 0;
                    countY++;

                    if (countY === newSet.rows)
                    ***REMOVED***
                        break;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***

            return newSet;

        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Creates a Sprite for every object matching the given gid in the map data. You can optionally specify the group that the Sprite will be created in. If none is
    * given it will be created in the World. All properties from the map data objectgroup are copied across to the Sprite, so you can use this as an easy way to
    * configure Sprite properties from within the map editor. For example giving an object a property of alpha: 0.5 in the map editor will duplicate that when the
    * Sprite is created. You could also give it a value like: body.velocity.x: 100 to set it moving automatically.
    *
    * @method Phaser.Tilemap#createFromObjects
    * @param ***REMOVED***string***REMOVED*** name - The name of the Object Group to create Sprites from.
    * @param ***REMOVED***number***REMOVED*** gid - The layer array index value, or if a string is given the layer name within the map data.
    * @param ***REMOVED***string***REMOVED*** key - The Game.cache key of the image that this Sprite will use.
    * @param ***REMOVED***number|string***REMOVED*** [frame] - If the Sprite image contains multiple frames you can specify which one to use here.
    * @param ***REMOVED***boolean***REMOVED*** [exists=true] - The default exists state of the Sprite.
    * @param ***REMOVED***boolean***REMOVED*** [autoCull=false] - The default autoCull state of the Sprite. Sprites that are autoCulled are culled from the camera if out of its range.
    * @param ***REMOVED***Phaser.Group***REMOVED*** [group=Phaser.World] - Group to add the Sprite to. If not specified it will be added to the World group.
    * @param ***REMOVED***object***REMOVED*** [CustomClass=Phaser.Sprite] - If you wish to create your own class, rather than Phaser.Sprite, pass the class here. Your class must extend Phaser.Sprite and have the same constructor parameters.
    * @param ***REMOVED***boolean***REMOVED*** [adjustY=true] - By default the Tiled map editor uses a bottom-left coordinate system. Phaser uses top-left. So most objects will appear too low down. This parameter moves them up by their height.
    */
    createFromObjects: function (name, gid, key, frame, exists, autoCull, group, CustomClass, adjustY) ***REMOVED***

        if (exists === undefined) ***REMOVED*** exists = true; ***REMOVED***
        if (autoCull === undefined) ***REMOVED*** autoCull = false; ***REMOVED***
        if (group === undefined) ***REMOVED*** group = this.game.world; ***REMOVED***
        if (CustomClass === undefined) ***REMOVED*** CustomClass = Phaser.Sprite; ***REMOVED***
        if (adjustY === undefined) ***REMOVED*** adjustY = true; ***REMOVED***

        if (!this.objects[name])
        ***REMOVED***
            console.warn('Tilemap.createFromObjects: Invalid objectgroup name given: ' + name);
            return;
        ***REMOVED***

        for (var i = 0; i < this.objects[name].length; i++)
        ***REMOVED***
            var found = false;
            var obj = this.objects[name][i];

            if (obj.gid !== undefined && typeof gid === 'number' && obj.gid === gid)
            ***REMOVED***
                found = true;
            ***REMOVED***
            else if (obj.id !== undefined && typeof gid === 'number' && obj.id === gid)
            ***REMOVED***
                found = true;
            ***REMOVED***
            else if (obj.name !== undefined && typeof gid === 'string' && obj.name === gid)
            ***REMOVED***
                found = true;
            ***REMOVED***

            if (found)
            ***REMOVED***
                var sprite = new CustomClass(this.game, parseFloat(obj.x, 10), parseFloat(obj.y, 10), key, frame);

                sprite.name = obj.name;
                sprite.visible = obj.visible;
                sprite.autoCull = autoCull;
                sprite.exists = exists;

                if (obj.width)
                ***REMOVED***
                    sprite.width = obj.width;
                ***REMOVED***

                if (obj.height)
                ***REMOVED***
                    sprite.height = obj.height;
                ***REMOVED***

                if (obj.rotation)
                ***REMOVED***
                    sprite.angle = obj.rotation;
                ***REMOVED***

                if (adjustY)
                ***REMOVED***
                    sprite.y -= sprite.height;
                ***REMOVED***

                group.add(sprite);

                for (var property in obj.properties)
                ***REMOVED***
                    group.set(sprite, property, obj.properties[property], false, false, 0, true);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Creates a Sprite for every object matching the given tile indexes in the map data.
    * You can specify the group that the Sprite will be created in. If none is given it will be created in the World.
    * You can optional specify if the tile will be replaced with another after the Sprite is created. This is useful if you want to lay down special 
    * tiles in a level that are converted to Sprites, but want to replace the tile itself with a floor tile or similar once converted.
    *
    * @method Phaser.Tilemap#createFromTiles
    * @param ***REMOVED***integer|Array***REMOVED*** tiles - The tile index, or array of indexes, to create Sprites from.
    * @param ***REMOVED***integer|Array***REMOVED*** replacements - The tile index, or array of indexes, to change a converted tile to. Set to `null` to not change.
    * @param ***REMOVED***string***REMOVED*** key - The Game.cache key of the image that this Sprite will use.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to operate on.
    * @param ***REMOVED***Phaser.Group***REMOVED*** [group=Phaser.World] - Group to add the Sprite to. If not specified it will be added to the World group.
    * @param ***REMOVED***object***REMOVED*** [properties] - An object that contains the default properties for your newly created Sprite. This object will be iterated and any matching Sprite property will be set.
    * @return ***REMOVED***integer***REMOVED*** The number of Sprites that were created.
    */
    createFromTiles: function (tiles, replacements, key, layer, group, properties) ***REMOVED***

        if (typeof tiles === 'number') ***REMOVED*** tiles = [tiles]; ***REMOVED***

        if (replacements === undefined || replacements === null)
        ***REMOVED***
            replacements = [];
        ***REMOVED***
        else if (typeof replacements === 'number')
        ***REMOVED***
            replacements = [replacements];
        ***REMOVED***

        layer = this.getLayer(layer);

        if (group === undefined) ***REMOVED*** group = this.game.world; ***REMOVED***
        if (properties === undefined) ***REMOVED*** properties = ***REMOVED******REMOVED***; ***REMOVED***

        if (properties.customClass === undefined)
        ***REMOVED***
            properties.customClass = Phaser.Sprite;
        ***REMOVED***

        if (properties.adjustY === undefined)
        ***REMOVED***
            properties.adjustY = true;
        ***REMOVED***

        var lw = this.layers[layer].width;
        var lh = this.layers[layer].height;

        this.copy(0, 0, lw, lh, layer);

        if (this._results.length < 2)
        ***REMOVED***
            return 0;
        ***REMOVED***

        var total = 0;
        var sprite;

        for (var i = 1, len = this._results.length; i < len; i++)
        ***REMOVED***
            if (tiles.indexOf(this._results[i].index) !== -1)
            ***REMOVED***
                sprite = new properties.customClass(this.game, this._results[i].worldX, this._results[i].worldY, key);

                for (var property in properties)
                ***REMOVED***
                    sprite[property] = properties[property];
                ***REMOVED***

                group.add(sprite);
                total++;
            ***REMOVED***

        ***REMOVED***

        if (replacements.length === 1)
        ***REMOVED***
            //  Assume 1 replacement for all types of tile given
            for (i = 0; i < tiles.length; i++)
            ***REMOVED***
                this.replace(tiles[i], replacements[0], 0, 0, lw, lh, layer);
            ***REMOVED***
        ***REMOVED***
        else if (replacements.length > 1)
        ***REMOVED***
            //  Assume 1 for 1 mapping
            for (i = 0; i < tiles.length; i++)
            ***REMOVED***
                this.replace(tiles[i], replacements[i], 0, 0, lw, lh, layer);
            ***REMOVED***
        ***REMOVED***

        return total;

    ***REMOVED***,

    /**
    * Creates a new TilemapLayer object. By default TilemapLayers are fixed to the camera.
    * The `layer` parameter is important. If you've created your map in Tiled then you can get this by looking in Tiled and looking at the Layer name.
    * Or you can open the JSON file it exports and look at the layers[].name value. Either way it must match.
    * If you wish to create a blank layer to put your own tiles on then see Tilemap.createBlankLayer.
    *
    * @method Phaser.Tilemap#createLayer
    * @param ***REMOVED***number|string***REMOVED*** layer - The layer array index value, or if a string is given the layer name, within the map data that this TilemapLayer represents.
    * @param ***REMOVED***number***REMOVED*** [width] - The rendered width of the layer, should never be wider than Game.width. If not given it will be set to Game.width.
    * @param ***REMOVED***number***REMOVED*** [height] - The rendered height of the layer, should never be wider than Game.height. If not given it will be set to Game.height.
    * @param ***REMOVED***Phaser.Group***REMOVED*** [group] - Optional Group to add the object to. If not specified it will be added to the World group.
    * @return ***REMOVED***Phaser.TilemapLayer***REMOVED*** The TilemapLayer object. This is an extension of Phaser.Sprite and can be moved around the display list accordingly.
    */
    createLayer: function (layer, width, height, group) ***REMOVED***

        //  Add Buffer support for the left of the canvas

        if (width === undefined) ***REMOVED*** width = this.game.width; ***REMOVED***
        if (height === undefined) ***REMOVED*** height = this.game.height; ***REMOVED***
        if (group === undefined) ***REMOVED*** group = this.game.world; ***REMOVED***

        var index = layer;

        if (typeof layer === 'string')
        ***REMOVED***
            index = this.getLayerIndex(layer);
        ***REMOVED***

        if (index === null || index > this.layers.length)
        ***REMOVED***
            console.warn('Tilemap.createLayer: Invalid layer ID given: ' + index);
            return;
        ***REMOVED***

        //  Sort out the display dimensions, so they never render too much, or too little.

        if (width === undefined || width <= 0)
        ***REMOVED***
            width = Math.min(this.game.width, this.layers[index].widthInPixels);
        ***REMOVED***
        else if (width > this.game.width)
        ***REMOVED***
            width = this.game.width;
        ***REMOVED***

        if (height === undefined || height <= 0)
        ***REMOVED***
            height = Math.min(this.game.height, this.layers[index].heightInPixels);
        ***REMOVED***
        else if (height > this.game.height)
        ***REMOVED***
            height = this.game.height;
        ***REMOVED***

        if (this.enableDebug)
        ***REMOVED***
            console.group('Tilemap.createLayer');
            console.log('Name:', this.layers[index].name);
            console.log('Size:', width, 'x', height);
            console.log('Tileset:', this.tilesets[0].name, 'index:', index);
        ***REMOVED***

        var rootLayer = group.add(new Phaser.TilemapLayer(this.game, this, index, width, height));

        if (this.enableDebug)
        ***REMOVED***
            console.groupEnd();
        ***REMOVED***

        return rootLayer;

    ***REMOVED***,


    /**
    * Creates a new and empty layer on this Tilemap. By default TilemapLayers are fixed to the camera.
    *
    * @method Phaser.Tilemap#createBlankLayer
    * @param ***REMOVED***string***REMOVED*** name - The name of this layer. Must be unique within the map.
    * @param ***REMOVED***number***REMOVED*** width - The width of the layer in tiles.
    * @param ***REMOVED***number***REMOVED*** height - The height of the layer in tiles.
    * @param ***REMOVED***number***REMOVED*** tileWidth - The width of the tiles the layer uses for calculations.
    * @param ***REMOVED***number***REMOVED*** tileHeight - The height of the tiles the layer uses for calculations.
    * @param ***REMOVED***Phaser.Group***REMOVED*** [group] - Optional Group to add the layer to. If not specified it will be added to the World group.
    * @return ***REMOVED***Phaser.TilemapLayer***REMOVED*** The TilemapLayer object. This is an extension of Phaser.Image and can be moved around the display list accordingly.
    */
    createBlankLayer: function (name, width, height, tileWidth, tileHeight, group) ***REMOVED***

        if (group === undefined) ***REMOVED*** group = this.game.world; ***REMOVED***

        if (this.getLayerIndex(name) !== null)
        ***REMOVED***
            console.warn('Tilemap.createBlankLayer: Layer with matching name already exists: ' + name);
            return;
        ***REMOVED***

        var layer = ***REMOVED***

            name: name,
            x: 0,
            y: 0,
            width: width,
            height: height,
            widthInPixels: width * tileWidth,
            heightInPixels: height * tileHeight,
            alpha: 1,
            visible: true,
            properties: ***REMOVED******REMOVED***,
            indexes: [],
            callbacks: [],
            bodies: [],
            data: null

        ***REMOVED***;

        var row;
        var output = [];

        for (var y = 0; y < height; y++)
        ***REMOVED***
            row = [];

            for (var x = 0; x < width; x++)
            ***REMOVED***
                row.push(new Phaser.Tile(layer, -1, x, y, tileWidth, tileHeight));
            ***REMOVED***

            output.push(row);
        ***REMOVED***

        layer.data = output;

        this.layers.push(layer);

        this.currentLayer = this.layers.length - 1;

        var w = layer.widthInPixels;
        var h = layer.heightInPixels;

        if (w > this.game.width)
        ***REMOVED***
            w = this.game.width;
        ***REMOVED***

        if (h > this.game.height)
        ***REMOVED***
            h = this.game.height;
        ***REMOVED***

        var output = new Phaser.TilemapLayer(this.game, this, this.layers.length - 1, w, h);
        output.name = name;

        return group.add(output);

    ***REMOVED***,

    /**
    * Gets the layer index based on the layers name.
    *
    * @method Phaser.Tilemap#getIndex
    * @protected
    * @param ***REMOVED***array***REMOVED*** location - The local array to search.
    * @param ***REMOVED***string***REMOVED*** name - The name of the array element to get.
    * @return ***REMOVED***number***REMOVED*** The index of the element in the array, or null if not found.
    */
    getIndex: function (location, name) ***REMOVED***

        for (var i = 0; i < location.length; i++)
        ***REMOVED***
            if (location[i].name === name)
            ***REMOVED***
                return i;
            ***REMOVED***
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Gets the layer index based on its name.
    *
    * @method Phaser.Tilemap#getLayerIndex
    * @param ***REMOVED***string***REMOVED*** name - The name of the layer to get.
    * @return ***REMOVED***number***REMOVED*** The index of the layer in this tilemap, or null if not found.
    */
    getLayerIndex: function (name) ***REMOVED***

        return this.getIndex(this.layers, name);

    ***REMOVED***,

    /**
    * Gets the tileset index based on its name.
    *
    * @method Phaser.Tilemap#getTilesetIndex
    * @param ***REMOVED***string***REMOVED*** name - The name of the tileset to get.
    * @return ***REMOVED***number***REMOVED*** The index of the tileset in this tilemap, or null if not found.
    */
    getTilesetIndex: function (name) ***REMOVED***

        return this.getIndex(this.tilesets, name);

    ***REMOVED***,

    /**
    * Gets the image index based on its name.
    *
    * @method Phaser.Tilemap#getImageIndex
    * @param ***REMOVED***string***REMOVED*** name - The name of the image to get.
    * @return ***REMOVED***number***REMOVED*** The index of the image in this tilemap, or null if not found.
    */
    getImageIndex: function (name) ***REMOVED***

        return this.getIndex(this.images, name);

    ***REMOVED***,

    /**
    * Sets a global collision callback for the given tile index within the layer. This will affect all tiles on this layer that have the same index.
    * If a callback is already set for the tile index it will be replaced. Set the callback to null to remove it.
    * If you want to set a callback for a tile at a specific location on the map then see setTileLocationCallback.
    *
    * @method Phaser.Tilemap#setTileIndexCallback
    * @param ***REMOVED***number|array***REMOVED*** indexes - Either a single tile index, or an array of tile indexes to have a collision callback set for.
    * @param ***REMOVED***function***REMOVED*** callback - The callback that will be invoked when the tile is collided with.
    * @param ***REMOVED***object***REMOVED*** callbackContext - The context under which the callback is called.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to operate on. If not given will default to this.currentLayer.
    */
    setTileIndexCallback: function (indexes, callback, callbackContext, layer) ***REMOVED***

        layer = this.getLayer(layer);

        if (typeof indexes === 'number')
        ***REMOVED***
            //  This may seem a bit wasteful, because it will cause empty array elements to be created, but the look-up cost is much
            //  less than having to iterate through the callbacks array hunting down tile indexes each frame, so I'll take the small memory hit.
            this.layers[layer].callbacks[indexes] = ***REMOVED*** callback: callback, callbackContext: callbackContext ***REMOVED***;
        ***REMOVED***
        else
        ***REMOVED***
            for (var i = 0, len = indexes.length; i < len; i++)
            ***REMOVED***
                this.layers[layer].callbacks[indexes[i]] = ***REMOVED*** callback: callback, callbackContext: callbackContext ***REMOVED***;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets a global collision callback for the given map location within the layer. This will affect all tiles on this layer found in the given area.
    * If a callback is already set for the tile index it will be replaced. Set the callback to null to remove it.
    * If you want to set a callback for a tile at a specific location on the map then see setTileLocationCallback.
    *
    * @method Phaser.Tilemap#setTileLocationCallback
    * @param ***REMOVED***number***REMOVED*** x - X position of the top left of the area to copy (given in tiles, not pixels)
    * @param ***REMOVED***number***REMOVED*** y - Y position of the top left of the area to copy (given in tiles, not pixels)
    * @param ***REMOVED***number***REMOVED*** width - The width of the area to copy (given in tiles, not pixels)
    * @param ***REMOVED***number***REMOVED*** height - The height of the area to copy (given in tiles, not pixels)
    * @param ***REMOVED***function***REMOVED*** callback - The callback that will be invoked when the tile is collided with.
    * @param ***REMOVED***object***REMOVED*** callbackContext - The context under which the callback is called.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to operate on. If not given will default to this.currentLayer.
    */
    setTileLocationCallback: function (x, y, width, height, callback, callbackContext, layer) ***REMOVED***

        layer = this.getLayer(layer);

        this.copy(x, y, width, height, layer);

        if (this._results.length < 2)
        ***REMOVED***
            return;
        ***REMOVED***

        for (var i = 1; i < this._results.length; i++)
        ***REMOVED***
            this._results[i].setCollisionCallback(callback, callbackContext);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets collision the given tile or tiles. You can pass in either a single numeric index or an array of indexes: [ 2, 3, 15, 20].
    * The `collides` parameter controls if collision will be enabled (true) or disabled (false).
    *
    * @method Phaser.Tilemap#setCollision
    * @param ***REMOVED***number|array***REMOVED*** indexes - Either a single tile index, or an array of tile IDs to be checked for collision.
    * @param ***REMOVED***boolean***REMOVED*** [collides=true] - If true it will enable collision. If false it will clear collision.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to operate on. If not given will default to this.currentLayer.
    * @param ***REMOVED***boolean***REMOVED*** [recalculate=true] - Recalculates the tile faces after the update.
    */
    setCollision: function (indexes, collides, layer, recalculate) ***REMOVED***

        if (collides === undefined) ***REMOVED*** collides = true; ***REMOVED***
        if (recalculate === undefined) ***REMOVED*** recalculate = true; ***REMOVED***
        
        layer = this.getLayer(layer);

        if (typeof indexes === 'number')
        ***REMOVED***
            return this.setCollisionByIndex(indexes, collides, layer, true);
        ***REMOVED***
        else if (Array.isArray(indexes))
        ***REMOVED***
            //  Collide all of the IDs given in the indexes array
            for (var i = 0; i < indexes.length; i++)
            ***REMOVED***
                this.setCollisionByIndex(indexes[i], collides, layer, false);
            ***REMOVED***

            if (recalculate)
            ***REMOVED***
                //  Now re-calculate interesting faces
                this.calculateFaces(layer);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets collision on a range of tiles where the tile IDs increment sequentially.
    * Calling this with a start value of 10 and a stop value of 14 would set collision for tiles 10, 11, 12, 13 and 14.
    * The `collides` parameter controls if collision will be enabled (true) or disabled (false).
    *
    * @method Phaser.Tilemap#setCollisionBetween
    * @param ***REMOVED***number***REMOVED*** start - The first index of the tile to be set for collision.
    * @param ***REMOVED***number***REMOVED*** stop - The last index of the tile to be set for collision.
    * @param ***REMOVED***boolean***REMOVED*** [collides=true] - If true it will enable collision. If false it will clear collision.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to operate on. If not given will default to this.currentLayer.
    * @param ***REMOVED***boolean***REMOVED*** [recalculate=true] - Recalculates the tile faces after the update.
    */
    setCollisionBetween: function (start, stop, collides, layer, recalculate) ***REMOVED***

        if (collides === undefined) ***REMOVED*** collides = true; ***REMOVED***
        if (recalculate === undefined) ***REMOVED*** recalculate = true; ***REMOVED***
        
        layer = this.getLayer(layer);

        if (start > stop)
        ***REMOVED***
            return;
        ***REMOVED***

        for (var index = start; index <= stop; index++)
        ***REMOVED***
            this.setCollisionByIndex(index, collides, layer, false);
        ***REMOVED***

        if (recalculate)
        ***REMOVED***
            //  Now re-calculate interesting faces
            this.calculateFaces(layer);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets collision on all tiles in the given layer, except for the IDs of those in the given array.
    * The `collides` parameter controls if collision will be enabled (true) or disabled (false).
    *
    * @method Phaser.Tilemap#setCollisionByExclusion
    * @param ***REMOVED***array***REMOVED*** indexes - An array of the tile IDs to not be counted for collision.
    * @param ***REMOVED***boolean***REMOVED*** [collides=true] - If true it will enable collision. If false it will clear collision.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to operate on. If not given will default to this.currentLayer.
    * @param ***REMOVED***boolean***REMOVED*** [recalculate=true] - Recalculates the tile faces after the update.
    */
    setCollisionByExclusion: function (indexes, collides, layer, recalculate) ***REMOVED***

        if (collides === undefined) ***REMOVED*** collides = true; ***REMOVED***
        if (recalculate === undefined) ***REMOVED*** recalculate = true; ***REMOVED***
        
        layer = this.getLayer(layer);

        //  Collide everything, except the IDs given in the indexes array
        for (var i = 0, len = this.tiles.length; i < len; i++)
        ***REMOVED***
            if (indexes.indexOf(i) === -1)
            ***REMOVED***
                this.setCollisionByIndex(i, collides, layer, false);
            ***REMOVED***
        ***REMOVED***

        if (recalculate)
        ***REMOVED***
            //  Now re-calculate interesting faces
            this.calculateFaces(layer);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets collision values on a tile in the set.
    * You shouldn't usually call this method directly, instead use setCollision, setCollisionBetween or setCollisionByExclusion.
    *
    * @method Phaser.Tilemap#setCollisionByIndex
    * @protected
    * @param ***REMOVED***number***REMOVED*** index - The index of the tile on the layer.
    * @param ***REMOVED***boolean***REMOVED*** [collides=true] - If true it will enable collision on the tile. If false it will clear collision values from the tile.
    * @param ***REMOVED***number***REMOVED*** [layer] - The layer to operate on. If not given will default to this.currentLayer.
    * @param ***REMOVED***boolean***REMOVED*** [recalculate=true] - Recalculates the tile faces after the update.
    */
    setCollisionByIndex: function (index, collides, layer, recalculate) ***REMOVED***

        if (collides === undefined) ***REMOVED*** collides = true; ***REMOVED***
        if (layer === undefined) ***REMOVED*** layer = this.currentLayer; ***REMOVED***
        if (recalculate === undefined) ***REMOVED*** recalculate = true; ***REMOVED***

        if (collides)
        ***REMOVED***
            this.collideIndexes.push(index);
        ***REMOVED***
        else
        ***REMOVED***
            var i = this.collideIndexes.indexOf(index);

            if (i > -1)
            ***REMOVED***
                this.collideIndexes.splice(i, 1);
            ***REMOVED***
        ***REMOVED***

        for (var y = 0; y < this.layers[layer].height; y++)
        ***REMOVED***
            for (var x = 0; x < this.layers[layer].width; x++)
            ***REMOVED***
                var tile = this.layers[layer].data[y][x];

                if (tile && tile.index === index)
                ***REMOVED***
                    if (collides)
                    ***REMOVED***
                        tile.setCollision(true, true, true, true);
                    ***REMOVED***
                    else
                    ***REMOVED***
                        tile.resetCollision();
                    ***REMOVED***

                    tile.faceTop = collides;
                    tile.faceBottom = collides;
                    tile.faceLeft = collides;
                    tile.faceRight = collides;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        if (recalculate)
        ***REMOVED***
            //  Now re-calculate interesting faces
            this.calculateFaces(layer);
        ***REMOVED***

        return layer;

    ***REMOVED***,

    /**
    * Gets the TilemapLayer index as used in the setCollision calls.
    *
    * @method Phaser.Tilemap#getLayer
    * @protected
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** layer - The layer to operate on. If not given will default to this.currentLayer.
    * @return ***REMOVED***number***REMOVED*** The TilemapLayer index.
    */
    getLayer: function (layer) ***REMOVED***

        if (layer === undefined)
        ***REMOVED***
            layer = this.currentLayer;
        ***REMOVED***
        else if (typeof layer === 'string')
        ***REMOVED***
            layer = this.getLayerIndex(layer);
        ***REMOVED***
        else if (layer instanceof Phaser.TilemapLayer)
        ***REMOVED***
            layer = layer.index;
        ***REMOVED***

        return layer;

    ***REMOVED***,

    /**
    * Turn off/on the recalculation of faces for tile or collision updates. 
    * `setPreventRecalculate(true)` puts recalculation on hold while `setPreventRecalculate(false)` recalculates all the changed layers.
    *
    * @method Phaser.Tilemap#setPreventRecalculate
    * @param ***REMOVED***boolean***REMOVED*** value - If true it will put the recalculation on hold.
    */
    setPreventRecalculate: function (value) ***REMOVED***

        if (value === true && this.preventingRecalculate !== true)
        ***REMOVED***
            this.preventingRecalculate = true;
            this.needToRecalculate = ***REMOVED******REMOVED***;
        ***REMOVED***

        if (value === false && this.preventingRecalculate === true)
        ***REMOVED***
            this.preventingRecalculate = false;

            for (var i in this.needToRecalculate)
            ***REMOVED***
                this.calculateFaces(i);
            ***REMOVED***

            this.needToRecalculate = false;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal function.
    *
    * @method Phaser.Tilemap#calculateFaces
    * @protected
    * @param ***REMOVED***number***REMOVED*** layer - The index of the TilemapLayer to operate on.
    */
    calculateFaces: function (layer) ***REMOVED***

        if (this.preventingRecalculate)
        ***REMOVED***
            this.needToRecalculate[layer] = true;
            return;
        ***REMOVED***
        
        var above = null;
        var below = null;
        var left = null;
        var right = null;

        for (var y = 0, h = this.layers[layer].height; y < h; y++)
        ***REMOVED***
            for (var x = 0, w = this.layers[layer].width; x < w; x++)
            ***REMOVED***
                var tile = this.layers[layer].data[y][x];

                if (tile)
                ***REMOVED***
                    above = this.getTileAbove(layer, x, y);
                    below = this.getTileBelow(layer, x, y);
                    left = this.getTileLeft(layer, x, y);
                    right = this.getTileRight(layer, x, y);

                    if (tile.collides)
                    ***REMOVED***
                        tile.faceTop = true;
                        tile.faceBottom = true;
                        tile.faceLeft = true;
                        tile.faceRight = true;
                    ***REMOVED***

                    if (above && above.collides)
                    ***REMOVED***
                        //  There is a tile above this one that also collides, so the top of this tile is no longer interesting
                        tile.faceTop = false;
                    ***REMOVED***

                    if (below && below.collides)
                    ***REMOVED***
                        //  There is a tile below this one that also collides, so the bottom of this tile is no longer interesting
                        tile.faceBottom = false;
                    ***REMOVED***

                    if (left && left.collides)
                    ***REMOVED***
                        //  There is a tile left this one that also collides, so the left of this tile is no longer interesting
                        tile.faceLeft = false;
                    ***REMOVED***

                    if (right && right.collides)
                    ***REMOVED***
                        //  There is a tile right this one that also collides, so the right of this tile is no longer interesting
                        tile.faceRight = false;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Gets the tile above the tile coordinates given.
    * Mostly used as an internal function by calculateFaces.
    *
    * @method Phaser.Tilemap#getTileAbove
    * @param ***REMOVED***number***REMOVED*** layer - The local layer index to get the tile from. Can be determined by Tilemap.getLayer().
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate to get the tile from. In tiles, not pixels.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate to get the tile from. In tiles, not pixels.
    */
    getTileAbove: function (layer, x, y) ***REMOVED***

        if (y > 0)
        ***REMOVED***
            return this.layers[layer].data[y - 1][x];
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Gets the tile below the tile coordinates given.
    * Mostly used as an internal function by calculateFaces.
    *
    * @method Phaser.Tilemap#getTileBelow
    * @param ***REMOVED***number***REMOVED*** layer - The local layer index to get the tile from. Can be determined by Tilemap.getLayer().
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate to get the tile from. In tiles, not pixels.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate to get the tile from. In tiles, not pixels.
    */
    getTileBelow: function (layer, x, y) ***REMOVED***

        if (y < this.layers[layer].height - 1)
        ***REMOVED***
            return this.layers[layer].data[y + 1][x];
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Gets the tile to the left of the tile coordinates given.
    * Mostly used as an internal function by calculateFaces.
    *
    * @method Phaser.Tilemap#getTileLeft
    * @param ***REMOVED***number***REMOVED*** layer - The local layer index to get the tile from. Can be determined by Tilemap.getLayer().
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate to get the tile from. In tiles, not pixels.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate to get the tile from. In tiles, not pixels.
    */
    getTileLeft: function (layer, x, y) ***REMOVED***

        if (x > 0)
        ***REMOVED***
            return this.layers[layer].data[y][x - 1];
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Gets the tile to the right of the tile coordinates given.
    * Mostly used as an internal function by calculateFaces.
    *
    * @method Phaser.Tilemap#getTileRight
    * @param ***REMOVED***number***REMOVED*** layer - The local layer index to get the tile from. Can be determined by Tilemap.getLayer().
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate to get the tile from. In tiles, not pixels.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate to get the tile from. In tiles, not pixels.
    */
    getTileRight: function (layer, x, y) ***REMOVED***

        if (x < this.layers[layer].width - 1)
        ***REMOVED***
            return this.layers[layer].data[y][x + 1];
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Sets the current layer to the given index.
    *
    * @method Phaser.Tilemap#setLayer
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** layer - The layer to set as current.
    */
    setLayer: function (layer) ***REMOVED***

        layer = this.getLayer(layer);

        if (this.layers[layer])
        ***REMOVED***
            this.currentLayer = layer;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Checks if there is a tile at the given location.
    *
    * @method Phaser.Tilemap#hasTile
    * @param ***REMOVED***number***REMOVED*** x - X position to check if a tile exists at (given in tile units, not pixels)
    * @param ***REMOVED***number***REMOVED*** y - Y position to check if a tile exists at (given in tile units, not pixels)
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** layer - The layer to set as current.
    * @return ***REMOVED***boolean***REMOVED*** True if there is a tile at the given location, otherwise false.
    */
    hasTile: function (x, y, layer) ***REMOVED***

        layer = this.getLayer(layer);

        if (this.layers[layer].data[y] === undefined || this.layers[layer].data[y][x] === undefined)
        ***REMOVED***
            return false;
        ***REMOVED***

        return (this.layers[layer].data[y][x].index > -1);

    ***REMOVED***,

    /**
    * Removes the tile located at the given coordinates and updates the collision data.
    *
    * @method Phaser.Tilemap#removeTile
    * @param ***REMOVED***number***REMOVED*** x - X position to place the tile (given in tile units, not pixels)
    * @param ***REMOVED***number***REMOVED*** y - Y position to place the tile (given in tile units, not pixels)
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to modify.
    * @return ***REMOVED***Phaser.Tile***REMOVED*** The Tile object that was removed from this map.
    */
    removeTile: function (x, y, layer) ***REMOVED***

        layer = this.getLayer(layer);

        if (x >= 0 && x < this.layers[layer].width && y >= 0 && y < this.layers[layer].height)
        ***REMOVED***
            if (this.hasTile(x, y, layer))
            ***REMOVED***
                var tile = this.layers[layer].data[y][x];

                this.layers[layer].data[y][x] = new Phaser.Tile(this.layers[layer], -1, x, y, this.tileWidth, this.tileHeight);

                this.layers[layer].dirty = true;

                this.calculateFaces(layer);

                return tile;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Removes the tile located at the given coordinates and updates the collision data. The coordinates are given in pixel values.
    *
    * @method Phaser.Tilemap#removeTileWorldXY
    * @param ***REMOVED***number***REMOVED*** x - X position to insert the tile (given in pixels)
    * @param ***REMOVED***number***REMOVED*** y - Y position to insert the tile (given in pixels)
    * @param ***REMOVED***number***REMOVED*** tileWidth - The width of the tile in pixels.
    * @param ***REMOVED***number***REMOVED*** tileHeight - The height of the tile in pixels.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to modify.
    * @return ***REMOVED***Phaser.Tile***REMOVED*** The Tile object that was removed from this map.
    */
    removeTileWorldXY: function (x, y, tileWidth, tileHeight, layer) ***REMOVED***

        layer = this.getLayer(layer);

        x = this.game.math.snapToFloor(x, tileWidth) / tileWidth;
        y = this.game.math.snapToFloor(y, tileHeight) / tileHeight;

        return this.removeTile(x, y, layer);

    ***REMOVED***,

    /**
    * Puts a tile of the given index value at the coordinate specified.
    * If you pass `null` as the tile it will pass your call over to Tilemap.removeTile instead.
    *
    * @method Phaser.Tilemap#putTile
    * @param ***REMOVED***Phaser.Tile|number|null***REMOVED*** tile - The index of this tile to set or a Phaser.Tile object. If null the tile is removed from the map.
    * @param ***REMOVED***number***REMOVED*** x - X position to place the tile (given in tile units, not pixels)
    * @param ***REMOVED***number***REMOVED*** y - Y position to place the tile (given in tile units, not pixels)
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to modify.
    * @return ***REMOVED***Phaser.Tile***REMOVED*** The Tile object that was created or added to this map.
    */
    putTile: function (tile, x, y, layer) ***REMOVED***

        if (tile === null)
        ***REMOVED***
            return this.removeTile(x, y, layer);
        ***REMOVED***

        layer = this.getLayer(layer);

        if (x >= 0 && x < this.layers[layer].width && y >= 0 && y < this.layers[layer].height)
        ***REMOVED***
            var index;

            if (tile instanceof Phaser.Tile)
            ***REMOVED***
                index = tile.index;

                if (this.hasTile(x, y, layer))
                ***REMOVED***
                    this.layers[layer].data[y][x].copy(tile);
                ***REMOVED***
                else
                ***REMOVED***
                    this.layers[layer].data[y][x] = new Phaser.Tile(layer, index, x, y, tile.width, tile.height);
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                index = tile;

                if (this.hasTile(x, y, layer))
                ***REMOVED***
                    this.layers[layer].data[y][x].index = index;
                ***REMOVED***
                else
                ***REMOVED***
                    this.layers[layer].data[y][x] = new Phaser.Tile(this.layers[layer], index, x, y, this.tileWidth, this.tileHeight);
                ***REMOVED***
            ***REMOVED***

            if (this.collideIndexes.indexOf(index) > -1)
            ***REMOVED***
                this.layers[layer].data[y][x].setCollision(true, true, true, true);
            ***REMOVED***
            else
            ***REMOVED***
                this.layers[layer].data[y][x].resetCollision();
            ***REMOVED***

            this.layers[layer].dirty = true;

            this.calculateFaces(layer);

            return this.layers[layer].data[y][x];
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Puts a tile into the Tilemap layer. The coordinates are given in pixel values.
    *
    * @method Phaser.Tilemap#putTileWorldXY
    * @param ***REMOVED***Phaser.Tile|number***REMOVED*** tile - The index of this tile to set or a Phaser.Tile object.
    * @param ***REMOVED***number***REMOVED*** x - X position to insert the tile (given in pixels)
    * @param ***REMOVED***number***REMOVED*** y - Y position to insert the tile (given in pixels)
    * @param ***REMOVED***number***REMOVED*** tileWidth - The width of the tile in pixels.
    * @param ***REMOVED***number***REMOVED*** tileHeight - The height of the tile in pixels.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to modify.
    * @return ***REMOVED***Phaser.Tile***REMOVED*** The Tile object that was created or added to this map.
    */
    putTileWorldXY: function (tile, x, y, tileWidth, tileHeight, layer) ***REMOVED***

        layer = this.getLayer(layer);

        x = this.game.math.snapToFloor(x, tileWidth) / tileWidth;
        y = this.game.math.snapToFloor(y, tileHeight) / tileHeight;

        return this.putTile(tile, x, y, layer);

    ***REMOVED***,

    /**
    * Searches the entire map layer for the first tile matching the given index, then returns that Phaser.Tile object.
    * If no match is found it returns null.
    * The search starts from the top-left tile and continues horizontally until it hits the end of the row, then it drops down to the next column.
    * If the reverse boolean is true, it scans starting from the bottom-right corner traveling up to the top-left.
    *
    * @method Phaser.Tilemap#searchTileIndex
    * @param ***REMOVED***number***REMOVED*** index - The tile index value to search for.
    * @param ***REMOVED***number***REMOVED*** [skip=0] - The number of times to skip a matching tile before returning.
    * @param ***REMOVED***number***REMOVED*** [reverse=false] - If true it will scan the layer in reverse, starting at the bottom-right. Otherwise it scans from the top-left.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to get the tile from.
    * @return ***REMOVED***Phaser.Tile***REMOVED*** The first (or n skipped) tile with the matching index.
    */
    searchTileIndex: function (index, skip, reverse, layer) ***REMOVED***

        if (skip === undefined) ***REMOVED*** skip = 0; ***REMOVED***
        if (reverse === undefined) ***REMOVED*** reverse = false; ***REMOVED***

        layer = this.getLayer(layer);

        var c = 0;

        if (reverse)
        ***REMOVED***
            for (var y = this.layers[layer].height - 1; y >= 0; y--)
            ***REMOVED***
                for (var x = this.layers[layer].width - 1; x >= 0; x--)
                ***REMOVED***
                    if (this.layers[layer].data[y][x].index === index)
                    ***REMOVED***
                        if (c === skip)
                        ***REMOVED***
                            return this.layers[layer].data[y][x];
                        ***REMOVED***
                        else
                        ***REMOVED***
                            c++;
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            for (var y = 0; y < this.layers[layer].height; y++)
            ***REMOVED***
                for (var x = 0; x < this.layers[layer].width; x++)
                ***REMOVED***
                    if (this.layers[layer].data[y][x].index === index)
                    ***REMOVED***
                        if (c === skip)
                        ***REMOVED***
                            return this.layers[layer].data[y][x];
                        ***REMOVED***
                        else
                        ***REMOVED***
                            c++;
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Gets a tile from the Tilemap Layer. The coordinates are given in tile values.
    *
    * @method Phaser.Tilemap#getTile
    * @param ***REMOVED***number***REMOVED*** x - X position to get the tile from (given in tile units, not pixels)
    * @param ***REMOVED***number***REMOVED*** y - Y position to get the tile from (given in tile units, not pixels)
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to get the tile from.
    * @param ***REMOVED***boolean***REMOVED*** [nonNull=false] - If true getTile won't return null for empty tiles, but a Tile object with an index of -1.
    * @return ***REMOVED***Phaser.Tile***REMOVED*** The tile at the given coordinates or null if no tile was found or the coordinates were invalid.
    */
    getTile: function (x, y, layer, nonNull) ***REMOVED***

        if (nonNull === undefined) ***REMOVED*** nonNull = false; ***REMOVED***

        layer = this.getLayer(layer);

        if (x >= 0 && x < this.layers[layer].width && y >= 0 && y < this.layers[layer].height)
        ***REMOVED***
            if (this.layers[layer].data[y][x].index === -1)
            ***REMOVED***
                if (nonNull)
                ***REMOVED***
                    return this.layers[layer].data[y][x];
                ***REMOVED***
                else
                ***REMOVED***
                    return null;
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                return this.layers[layer].data[y][x];
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            return null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Gets a tile from the Tilemap layer. The coordinates are given in pixel values.
    *
    * @method Phaser.Tilemap#getTileWorldXY
    * @param ***REMOVED***number***REMOVED*** x - X position to get the tile from (given in pixels)
    * @param ***REMOVED***number***REMOVED*** y - Y position to get the tile from (given in pixels)
    * @param ***REMOVED***number***REMOVED*** [tileWidth] - The width of the tiles. If not given the map default is used.
    * @param ***REMOVED***number***REMOVED*** [tileHeight] - The height of the tiles. If not given the map default is used.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to get the tile from.
    * @param ***REMOVED***boolean***REMOVED*** [nonNull=false] - If true getTile won't return null for empty tiles, but a Tile object with an index of -1.
    * @return ***REMOVED***Phaser.Tile***REMOVED*** The tile at the given coordinates.
    */
    getTileWorldXY: function (x, y, tileWidth, tileHeight, layer, nonNull) ***REMOVED***

        if (tileWidth === undefined) ***REMOVED*** tileWidth = this.tileWidth; ***REMOVED***
        if (tileHeight === undefined) ***REMOVED*** tileHeight = this.tileHeight; ***REMOVED***

        layer = this.getLayer(layer);

        x = this.game.math.snapToFloor(x, tileWidth) / tileWidth;
        y = this.game.math.snapToFloor(y, tileHeight) / tileHeight;

        return this.getTile(x, y, layer, nonNull);

    ***REMOVED***,

    /**
    * Copies all of the tiles in the given rectangular block into the tilemap data buffer.
    *
    * @method Phaser.Tilemap#copy
    * @param ***REMOVED***integer***REMOVED*** x - X position of the top left of the area to copy (given in tiles, not pixels)
    * @param ***REMOVED***integer***REMOVED*** y - Y position of the top left of the area to copy (given in tiles, not pixels)
    * @param ***REMOVED***integer***REMOVED*** width - The width of the area to copy (given in tiles, not pixels)
    * @param ***REMOVED***integer***REMOVED*** height - The height of the area to copy (given in tiles, not pixels)
    * @param ***REMOVED***integer|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to copy the tiles from.
    * @return ***REMOVED***array***REMOVED*** An array of the tiles that were copied.
    */
    copy: function (x, y, width, height, layer) ***REMOVED***

        layer = this.getLayer(layer);

        if (!this.layers[layer])
        ***REMOVED***
            this._results.length = 0;
            return;
        ***REMOVED***

        if (x === undefined) ***REMOVED*** x = 0; ***REMOVED***
        if (y === undefined) ***REMOVED*** y = 0; ***REMOVED***
        if (width === undefined) ***REMOVED*** width = this.layers[layer].width; ***REMOVED***
        if (height === undefined) ***REMOVED*** height = this.layers[layer].height; ***REMOVED***
        
        if (x < 0)
        ***REMOVED***
            x = 0;
        ***REMOVED***

        if (y < 0)
        ***REMOVED***
            y = 0;
        ***REMOVED***

        if (width > this.layers[layer].width)
        ***REMOVED***
            width = this.layers[layer].width;
        ***REMOVED***

        if (height > this.layers[layer].height)
        ***REMOVED***
            height = this.layers[layer].height;
        ***REMOVED***

        this._results.length = 0;

        this._results.push(***REMOVED*** x: x, y: y, width: width, height: height, layer: layer ***REMOVED***);

        for (var ty = y; ty < y + height; ty++)
        ***REMOVED***
            for (var tx = x; tx < x + width; tx++)
            ***REMOVED***
                this._results.push(this.layers[layer].data[ty][tx]);
            ***REMOVED***
        ***REMOVED***

        return this._results;

    ***REMOVED***,

    /**
    * Pastes a previously copied block of tile data into the given x/y coordinates. Data should have been prepared with Tilemap.copy.
    *
    * @method Phaser.Tilemap#paste
    * @param ***REMOVED***number***REMOVED*** x - X position of the top left of the area to paste to (given in tiles, not pixels)
    * @param ***REMOVED***number***REMOVED*** y - Y position of the top left of the area to paste to (given in tiles, not pixels)
    * @param ***REMOVED***array***REMOVED*** tileblock - The block of tiles to paste.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to paste the tiles into.
    */
    paste: function (x, y, tileblock, layer) ***REMOVED***

        if (x === undefined) ***REMOVED*** x = 0; ***REMOVED***
        if (y === undefined) ***REMOVED*** y = 0; ***REMOVED***

        layer = this.getLayer(layer);

        if (!tileblock || tileblock.length < 2)
        ***REMOVED***
            return;
        ***REMOVED***

        //  Find out the difference between tileblock[1].x/y and x/y and use it as an offset, as it's the top left of the block to paste
        var diffX = x - tileblock[1].x;
        var diffY = y - tileblock[1].y;

        for (var i = 1; i < tileblock.length; i++)
        ***REMOVED***
            this.layers[layer].data[ diffY + tileblock[i].y ][ diffX + tileblock[i].x ].copy(tileblock[i]);
        ***REMOVED***

		this.layers[layer].dirty = true;
        this.calculateFaces(layer);

    ***REMOVED***,

    /**
    * Scans the given area for tiles with an index matching tileA and swaps them with tileB.
    *
    * @method Phaser.Tilemap#swap
    * @param ***REMOVED***number***REMOVED*** tileA - First tile index.
    * @param ***REMOVED***number***REMOVED*** tileB - Second tile index.
    * @param ***REMOVED***number***REMOVED*** x - X position of the top left of the area to operate one, given in tiles, not pixels.
    * @param ***REMOVED***number***REMOVED*** y - Y position of the top left of the area to operate one, given in tiles, not pixels.
    * @param ***REMOVED***number***REMOVED*** width - The width in tiles of the area to operate on.
    * @param ***REMOVED***number***REMOVED*** height - The height in tiles of the area to operate on.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to operate on.
    */
    swap: function (tileA, tileB, x, y, width, height, layer) ***REMOVED***

        layer = this.getLayer(layer);

        this.copy(x, y, width, height, layer);

        if (this._results.length < 2)
        ***REMOVED***
            return;
        ***REMOVED***

        this._tempA = tileA;
        this._tempB = tileB;

        this._results.forEach(this.swapHandler, this);

        this.paste(x, y, this._results, layer);

    ***REMOVED***,

    /**
    * Internal function that handles the swapping of tiles.
    *
    * @method Phaser.Tilemap#swapHandler
    * @private
    * @param ***REMOVED***number***REMOVED*** value
    */
    swapHandler: function (value) ***REMOVED***

        if (value.index === this._tempA)
        ***REMOVED***
            //  Swap A with B
            value.index = this._tempB;
        ***REMOVED***
        else if (value.index === this._tempB)
        ***REMOVED***
            //  Swap B with A
            value.index = this._tempA;
        ***REMOVED***

    ***REMOVED***,

    /**
    * For each tile in the given area defined by x/y and width/height run the given callback.
    *
    * @method Phaser.Tilemap#forEach
    * @param ***REMOVED***number***REMOVED*** callback - The callback. Each tile in the given area will be passed to this callback as the first and only parameter.
    * @param ***REMOVED***number***REMOVED*** context - The context under which the callback should be run.
    * @param ***REMOVED***number***REMOVED*** x - X position of the top left of the area to operate one, given in tiles, not pixels.
    * @param ***REMOVED***number***REMOVED*** y - Y position of the top left of the area to operate one, given in tiles, not pixels.
    * @param ***REMOVED***number***REMOVED*** width - The width in tiles of the area to operate on.
    * @param ***REMOVED***number***REMOVED*** height - The height in tiles of the area to operate on.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to operate on.
    */
    forEach: function (callback, context, x, y, width, height, layer) ***REMOVED***

        layer = this.getLayer(layer);

        this.copy(x, y, width, height, layer);

        if (this._results.length < 2)
        ***REMOVED***
            return;
        ***REMOVED***

        this._results.forEach(callback, context);

        this.paste(x, y, this._results, layer);

    ***REMOVED***,

    /**
    * Scans the given area for tiles with an index matching `source` and updates their index to match `dest`.
    *
    * @method Phaser.Tilemap#replace
    * @param ***REMOVED***number***REMOVED*** source - The tile index value to scan for.
    * @param ***REMOVED***number***REMOVED*** dest - The tile index value to replace found tiles with.
    * @param ***REMOVED***number***REMOVED*** x - X position of the top left of the area to operate one, given in tiles, not pixels.
    * @param ***REMOVED***number***REMOVED*** y - Y position of the top left of the area to operate one, given in tiles, not pixels.
    * @param ***REMOVED***number***REMOVED*** width - The width in tiles of the area to operate on.
    * @param ***REMOVED***number***REMOVED*** height - The height in tiles of the area to operate on.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to operate on.
    */
    replace: function (source, dest, x, y, width, height, layer) ***REMOVED***

        layer = this.getLayer(layer);

        this.copy(x, y, width, height, layer);

        if (this._results.length < 2)
        ***REMOVED***
            return;
        ***REMOVED***

        for (var i = 1; i < this._results.length; i++)
        ***REMOVED***
            if (this._results[i].index === source)
            ***REMOVED***
                this._results[i].index = dest;
            ***REMOVED***
        ***REMOVED***

        this.paste(x, y, this._results, layer);

    ***REMOVED***,

    /**
    * Randomises a set of tiles in a given area.
    *
    * @method Phaser.Tilemap#random
    * @param ***REMOVED***number***REMOVED*** x - X position of the top left of the area to operate one, given in tiles, not pixels.
    * @param ***REMOVED***number***REMOVED*** y - Y position of the top left of the area to operate one, given in tiles, not pixels.
    * @param ***REMOVED***number***REMOVED*** width - The width in tiles of the area to operate on.
    * @param ***REMOVED***number***REMOVED*** height - The height in tiles of the area to operate on.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to operate on.
    */
    random: function (x, y, width, height, layer) ***REMOVED***

        layer = this.getLayer(layer);

        this.copy(x, y, width, height, layer);

        if (this._results.length < 2)
        ***REMOVED***
            return;
        ***REMOVED***

        var indexes = [];

        for (var t = 1; t < this._results.length; t++)
        ***REMOVED***
            if (this._results[t].index)
            ***REMOVED***
                var idx = this._results[t].index;

                if (indexes.indexOf(idx) === -1)
                ***REMOVED***
                    indexes.push(idx);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        for (var i = 1; i < this._results.length; i++)
        ***REMOVED***
            this._results[i].index = this.game.rnd.pick(indexes);
        ***REMOVED***

        this.paste(x, y, this._results, layer);

    ***REMOVED***,

    /**
    * Shuffles a set of tiles in a given area. It will only randomise the tiles in that area, so if they're all the same nothing will appear to have changed!
    *
    * @method Phaser.Tilemap#shuffle
    * @param ***REMOVED***number***REMOVED*** x - X position of the top left of the area to operate one, given in tiles, not pixels.
    * @param ***REMOVED***number***REMOVED*** y - Y position of the top left of the area to operate one, given in tiles, not pixels.
    * @param ***REMOVED***number***REMOVED*** width - The width in tiles of the area to operate on.
    * @param ***REMOVED***number***REMOVED*** height - The height in tiles of the area to operate on.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to operate on.
    */
    shuffle: function (x, y, width, height, layer) ***REMOVED***

        layer = this.getLayer(layer);

        this.copy(x, y, width, height, layer);

        if (this._results.length < 2)
        ***REMOVED***
            return;
        ***REMOVED***

        var indexes = [];

        for (var t = 1; t < this._results.length; t++)
        ***REMOVED***
            if (this._results[t].index)
            ***REMOVED***
                indexes.push(this._results[t].index);
            ***REMOVED***
        ***REMOVED***

        Phaser.ArrayUtils.shuffle(indexes);

        for (var i = 1; i < this._results.length; i++)
        ***REMOVED***
            this._results[i].index = indexes[i - 1];
        ***REMOVED***

        this.paste(x, y, this._results, layer);

    ***REMOVED***,

    /**
    * Fills the given area with the specified tile.
    *
    * @method Phaser.Tilemap#fill
    * @param ***REMOVED***number***REMOVED*** index - The index of the tile that the area will be filled with.
    * @param ***REMOVED***number***REMOVED*** x - X position of the top left of the area to operate one, given in tiles, not pixels.
    * @param ***REMOVED***number***REMOVED*** y - Y position of the top left of the area to operate one, given in tiles, not pixels.
    * @param ***REMOVED***number***REMOVED*** width - The width in tiles of the area to operate on.
    * @param ***REMOVED***number***REMOVED*** height - The height in tiles of the area to operate on.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to operate on.
    */
    fill: function (index, x, y, width, height, layer) ***REMOVED***

        layer = this.getLayer(layer);

        this.copy(x, y, width, height, layer);

        if (this._results.length < 2)
        ***REMOVED***
            return;
        ***REMOVED***

        for (var i = 1; i < this._results.length; i++)
        ***REMOVED***
            this._results[i].index = index;
        ***REMOVED***

        this.paste(x, y, this._results, layer);

    ***REMOVED***,

    /**
    * Removes all layers from this tile map.
    *
    * @method Phaser.Tilemap#removeAllLayers
    */
    removeAllLayers: function () ***REMOVED***

        this.layers.length = 0;
        this.currentLayer = 0;

    ***REMOVED***,

    /**
    * Dumps the tilemap data out to the console.
    *
    * @method Phaser.Tilemap#dump
    */
    dump: function () ***REMOVED***

        var txt = '';
        var args = [''];

        for (var y = 0; y < this.layers[this.currentLayer].height; y++)
        ***REMOVED***
            for (var x = 0; x < this.layers[this.currentLayer].width; x++)
            ***REMOVED***
                txt += "%c  ";

                if (this.layers[this.currentLayer].data[y][x] > 1)
                ***REMOVED***
                    if (this.debugMap[this.layers[this.currentLayer].data[y][x]])
                    ***REMOVED***
                        args.push("background: " + this.debugMap[this.layers[this.currentLayer].data[y][x]]);
                    ***REMOVED***
                    else
                    ***REMOVED***
                        args.push("background: #ffffff");
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    args.push("background: rgb(0, 0, 0)");
                ***REMOVED***
            ***REMOVED***

            txt += "\n";
        ***REMOVED***

        args[0] = txt;
        console.log.apply(console, args);

    ***REMOVED***,

    /**
    * Removes all layer data from this tile map and nulls the game reference.
    * Note: You are responsible for destroying any TilemapLayer objects you generated yourself, as Tilemap doesn't keep a reference to them.
    *
    * @method Phaser.Tilemap#destroy
    */
    destroy: function () ***REMOVED***

        this.removeAllLayers();
        this.data = [];
        this.game = null;

    ***REMOVED***

***REMOVED***;

Phaser.Tilemap.prototype.constructor = Phaser.Tilemap;

/**
* @name Phaser.Tilemap#layer
* @property ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** layer - The current layer object.
*/
Object.defineProperty(Phaser.Tilemap.prototype, "layer", ***REMOVED***

    get: function () ***REMOVED***

        return this.layers[this.currentLayer];

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value !== this.currentLayer)
        ***REMOVED***
            this.setLayer(value);
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A TilemapLayer is a Phaser.Image/Sprite that renders a specific TileLayer of a Tilemap.
*
* Since a TilemapLayer is a Sprite it can be moved around the display, added to other groups or display objects, etc.
*
* By default TilemapLayers have fixedToCamera set to `true`. Changing this will break Camera follow and scrolling behavior.
*
* @class Phaser.TilemapLayer
* @extends Phaser.Sprite
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Game reference to the currently running game.
* @param ***REMOVED***Phaser.Tilemap***REMOVED*** tilemap - The tilemap to which this layer belongs.
* @param ***REMOVED***integer***REMOVED*** index - The index of the TileLayer to render within the Tilemap.
* @param ***REMOVED***integer***REMOVED*** width - Width of the renderable area of the layer (in pixels).
* @param ***REMOVED***integer***REMOVED*** height - Height of the renderable area of the layer (in pixels).
*/
Phaser.TilemapLayer = function (game, tilemap, index, width, height) ***REMOVED***

    width |= 0;
    height |= 0;

    Phaser.Sprite.call(this, game, 0, 0);

    /**
    * The Tilemap to which this layer is bound.
    * @property ***REMOVED***Phaser.Tilemap***REMOVED*** map
    * @protected
    * @readonly
    */
    this.map = tilemap;

    /**
    * The index of this layer within the Tilemap.
    * @property ***REMOVED***number***REMOVED*** index
    * @protected
    * @readonly
    */
    this.index = index;

    /**
    * The layer object within the Tilemap that this layer represents.
    * @property ***REMOVED***object***REMOVED*** layer
    * @protected
    * @readonly
    */
    this.layer = tilemap.layers[index];

    /**
    * The canvas to which this TilemapLayer draws.
    * @property ***REMOVED***HTMLCanvasElement***REMOVED*** canvas
    * @protected
    */
    this.canvas = PIXI.CanvasPool.create(this, width, height);

    /**
    * The 2d context of the canvas.
    * @property ***REMOVED***CanvasRenderingContext2D***REMOVED*** context
    * @private
    */
    this.context = this.canvas.getContext('2d');

    this.setTexture(new PIXI.Texture(new PIXI.BaseTexture(this.canvas)));

    /**
    * The const type of this object.
    * @property ***REMOVED***number***REMOVED*** type
    * @readonly
    * @protected
    * @default Phaser.TILEMAPLAYER
    */
    this.type = Phaser.TILEMAPLAYER;

    /**
    * @property ***REMOVED***number***REMOVED*** physicsType - The const physics body type of this object.
    * @readonly
    */
    this.physicsType = Phaser.TILEMAPLAYER;

    /**
    * Settings that control standard (non-diagnostic) rendering.
    *
    * @property ***REMOVED***boolean***REMOVED*** [enableScrollDelta=true] - Delta scroll rendering only draws tiles/edges as they come into view.
    *     This can greatly improve scrolling rendering performance, especially when there are many small tiles.
    *     It should only be disabled in rare cases.
    *
    * @property ***REMOVED***?DOMCanvasElement***REMOVED*** [copyCanvas=(auto)] - [Internal] If set, force using a separate (shared) copy canvas.
    *     Using a canvas bitblt/copy when the source and destinations region overlap produces unexpected behavior
    *     in some browsers, notably Safari. 
    *
    * @default
    */
    this.renderSettings = ***REMOVED***
        enableScrollDelta: false,
        overdrawRatio: 0.20,
        copyCanvas: null
    ***REMOVED***;

    /**
    * Enable an additional "debug rendering" pass to display collision information.
    *
    * @property ***REMOVED***boolean***REMOVED*** debug
    * @default
    */
    this.debug = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** exists - Controls if the core game loop and physics update this game object or not.
    */
    this.exists = true;

    /**
    * Settings used for debugging and diagnostics.
    *
    * @property ***REMOVED***?string***REMOVED*** missingImageFill - A tile is rendered as a rectangle using the following fill if a valid tileset/image cannot be found. A value of `null` prevents additional rendering for tiles without a valid tileset image. _This takes effect even when debug rendering for the layer is not enabled._
    *
    * @property ***REMOVED***?string***REMOVED*** debuggedTileOverfill - If a Tile has `Tile#debug` true then, after normal tile image rendering, a rectangle with the following fill is drawn above/over it. _This takes effect even when debug rendering for the layer is not enabled._
    *
    * @property ***REMOVED***boolean***REMOVED*** forceFullRedraw - When debug rendering (`debug` is true), and this option is enabled, the a full redraw is forced and rendering optimization is suppressed.
    *
    * @property ***REMOVED***number***REMOVED*** debugAlpha - When debug rendering (`debug` is true), the tileset is initially rendered with this alpha level. This can make the tile edges clearer.
    *
    * @property ***REMOVED***?string***REMOVED*** facingEdgeStroke - When debug rendering (`debug` is true), this color/stroke is used to draw "face" edges. A value of `null` disables coloring facing edges.
    *
    * @property ***REMOVED***?string***REMOVED*** collidingTileOverfill - When debug rendering (`debug` is true), this fill is used for tiles that are collidable. A value of `null` disables applying the additional overfill.
    *
    */
    this.debugSettings = ***REMOVED***

        missingImageFill: 'rgb(255,255,255)',
        debuggedTileOverfill: 'rgba(0,255,0,0.4)',

        forceFullRedraw: true,

        debugAlpha: 0.5,
        facingEdgeStroke: 'rgba(0,255,0,1)',
        collidingTileOverfill: 'rgba(0,255,0,0.2)'

    ***REMOVED***;

    /**
    * Speed at which this layer scrolls horizontally, relative to the camera (e.g. scrollFactorX of 0.5 scrolls half as quickly as the 'normal' camera-locked layers do).
    * @property ***REMOVED***number***REMOVED*** scrollFactorX
    * @public
    * @default
    */
    this.scrollFactorX = 1;

    /**
    * Speed at which this layer scrolls vertically, relative to the camera (e.g. scrollFactorY of 0.5 scrolls half as quickly as the 'normal' camera-locked layers do)
    * @property ***REMOVED***number***REMOVED*** scrollFactorY
    * @public
    * @default
    */
    this.scrollFactorY = 1;

    /**
    * If true tiles will be force rendered, even if such is not believed to be required.
    * @property ***REMOVED***boolean***REMOVED*** dirty
    * @protected
    */
    this.dirty = true;

    /**
    * When ray-casting against tiles this is the number of steps it will jump. For larger tile sizes you can increase this to improve performance.
    * @property ***REMOVED***integer***REMOVED*** rayStepRate
    * @default
    */
    this.rayStepRate = 4;

    /**
    * Flag controlling if the layer tiles wrap at the edges.
    * @property ***REMOVED***boolean***REMOVED*** _wrap
    * @private
    */
    this._wrap = false;

    /**
    * Local map data and calculation cache.
    * @property ***REMOVED***object***REMOVED*** _mc
    * @private
    */
    this._mc = ***REMOVED***

        // Used to bypass rendering without reliance on `dirty` and detect changes.
        scrollX: 0,
        scrollY: 0,
        renderWidth: 0,
        renderHeight: 0,

        tileWidth: tilemap.tileWidth,
        tileHeight: tilemap.tileHeight,

        // Collision width/height (pixels)
        // What purpose do these have? Most things use tile width/height directly.
        // This also only extends collisions right and down.       
        cw: tilemap.tileWidth,
        ch: tilemap.tileHeight,

        // Cached tilesets from index -> Tileset
        tilesets: []

    ***REMOVED***;

    /**
    * The current canvas left after scroll is applied.
    * @property ***REMOVED***number***REMOVED*** _scrollX
    * @private
    */
    this._scrollX = 0;

    /**
    * The current canvas top after scroll is applied.
    * @propety ***REMOVED***number***REMOVED*** _scrollY
    * @private
    */
    this._scrollY = 0;

    /**
    * Used for caching the tiles / array of tiles.
    * @property ***REMOVED***Phaser.Tile[]***REMOVED*** _results
    * @private
    */
    this._results = [];

    if (!game.device.canvasBitBltShift)
    ***REMOVED***
        this.renderSettings.copyCanvas = Phaser.TilemapLayer.ensureSharedCopyCanvas();
    ***REMOVED***

    this.fixedToCamera = true;

***REMOVED***;

Phaser.TilemapLayer.prototype = Object.create(Phaser.Sprite.prototype);
Phaser.TilemapLayer.prototype.constructor = Phaser.TilemapLayer;

Phaser.TilemapLayer.prototype.preUpdateCore = Phaser.Component.Core.preUpdate;

/**
* The shared double-copy canvas, created as needed.
*
* @private
* @static
*/
Phaser.TilemapLayer.sharedCopyCanvas = null;

/**
* Create if needed (and return) a shared copy canvas that is shared across all TilemapLayers.
*
* Code that uses the canvas is responsible to ensure the dimensions and save/restore state as appropriate.
*
* @method Phaser.TilemapLayer#ensureSharedCopyCanvas
* @protected
* @static
*/
Phaser.TilemapLayer.ensureSharedCopyCanvas = function () ***REMOVED***

    if (!this.sharedCopyCanvas)
    ***REMOVED***
        this.sharedCopyCanvas = PIXI.CanvasPool.create(this, 2, 2);
    ***REMOVED***

    return this.sharedCopyCanvas;

***REMOVED***;

/**
* Automatically called by World.preUpdate.
*
* @method Phaser.TilemapLayer#preUpdate
*/
Phaser.TilemapLayer.prototype.preUpdate = function() ***REMOVED***

    return this.preUpdateCore();

***REMOVED***;

/**
* Automatically called by World.postUpdate. Handles cache updates.
*
* @method Phaser.TilemapLayer#postUpdate
* @protected
*/
Phaser.TilemapLayer.prototype.postUpdate = function () ***REMOVED***

    if (this.fixedToCamera)
    ***REMOVED***
        this.position.x = (this.game.camera.view.x + this.cameraOffset.x) / this.game.camera.scale.x;
        this.position.y = (this.game.camera.view.y + this.cameraOffset.y) / this.game.camera.scale.y;
    ***REMOVED***

    this._scrollX = this.game.camera.view.x * this.scrollFactorX / this.scale.x;
    this._scrollY = this.game.camera.view.y * this.scrollFactorY / this.scale.y;

***REMOVED***;

/**
* Automatically called by the Canvas Renderer.
* Overrides the Sprite._renderCanvas function.
*
* @method Phaser.TilemapLayer#_renderCanvas
* @private
*/
Phaser.TilemapLayer.prototype._renderCanvas = function (renderSession) ***REMOVED***

    if (this.fixedToCamera)
    ***REMOVED***
        this.position.x = (this.game.camera.view.x + this.cameraOffset.x) / this.game.camera.scale.x;
        this.position.y = (this.game.camera.view.y + this.cameraOffset.y) / this.game.camera.scale.y;
    ***REMOVED***

    this._scrollX = this.game.camera.view.x * this.scrollFactorX / this.scale.x;
    this._scrollY = this.game.camera.view.y * this.scrollFactorY / this.scale.y;

    this.render();

    PIXI.Sprite.prototype._renderCanvas.call(this, renderSession);

***REMOVED***;

/**
* Automatically called by the Canvas Renderer.
* Overrides the Sprite._renderWebGL function.
*
* @method Phaser.TilemapLayer#_renderWebGL
* @private
*/
Phaser.TilemapLayer.prototype._renderWebGL = function (renderSession) ***REMOVED***

    if (this.fixedToCamera)
    ***REMOVED***
        this.position.x = (this.game.camera.view.x + this.cameraOffset.x) / this.game.camera.scale.x;
        this.position.y = (this.game.camera.view.y + this.cameraOffset.y) / this.game.camera.scale.y;
    ***REMOVED***
    
    this._scrollX = this.game.camera.view.x * this.scrollFactorX / this.scale.x;
    this._scrollY = this.game.camera.view.y * this.scrollFactorY / this.scale.y;

    this.render();

    PIXI.Sprite.prototype._renderWebGL.call(this, renderSession);

***REMOVED***;

/**
* Destroys this TilemapLayer.
*
* @method Phaser.TilemapLayer#destroy
*/
Phaser.TilemapLayer.prototype.destroy = function() ***REMOVED***

    PIXI.CanvasPool.remove(this);

    Phaser.Component.Destroy.prototype.destroy.call(this);

***REMOVED***;

/**
* Resizes the internal canvas and texture frame used by this TilemapLayer.
*
* This is an expensive call, so don't bind it to a window resize event! But instead call it at carefully
* selected times.
*
* Be aware that no validation of the new sizes takes place and the current map scroll coordinates are not
* modified either. You will have to handle both of these things from your game code if required.
* 
* @method Phaser.TilemapLayer#resize
* @param ***REMOVED***number***REMOVED*** width - The new width of the TilemapLayer
* @param ***REMOVED***number***REMOVED*** height - The new height of the TilemapLayer
*/
Phaser.TilemapLayer.prototype.resize = function (width, height) ***REMOVED***

    this.canvas.width = width;
    this.canvas.height = height;

    this.texture.frame.resize(width, height);

    this.texture.width = width;
    this.texture.height = height;

    this.texture.crop.width = width;
    this.texture.crop.height = height;

    this.texture.baseTexture.width = width;
    this.texture.baseTexture.height = height;

    this.texture.baseTexture.dirty();
    this.texture.requiresUpdate = true;

    this.texture._updateUvs();

    this.dirty = true;

***REMOVED***;

/**
* Sets the world size to match the size of this layer.
*
* @method Phaser.TilemapLayer#resizeWorld
* @public
*/
Phaser.TilemapLayer.prototype.resizeWorld = function () ***REMOVED***

    this.game.world.setBounds(0, 0, this.layer.widthInPixels * this.scale.x, this.layer.heightInPixels * this.scale.y);

***REMOVED***;

/**
* Take an x coordinate that doesn't account for scrollFactorX and 'fix' it into a scrolled local space.
*
* @method Phaser.TilemapLayer#_fixX
* @private
* @param ***REMOVED***number***REMOVED*** x - x coordinate in camera space
* @return ***REMOVED***number***REMOVED*** x coordinate in scrollFactor-adjusted dimensions
*/
Phaser.TilemapLayer.prototype._fixX = function (x) ***REMOVED***

    if (this.scrollFactorX === 1 || (this.scrollFactorX === 0 && this.position.x === 0))
    ***REMOVED***
        return x;
    ***REMOVED***
    
    //  This executes if the scrollFactorX is 0 and the x position of the tilemap is off from standard.
    if (this.scrollFactorX === 0 && this.position.x !== 0)
    ***REMOVED***
        return x - this.position.x;
    ***REMOVED***

    return this._scrollX + (x - (this._scrollX / this.scrollFactorX));

***REMOVED***;

/**
* Take an x coordinate that _does_ account for scrollFactorX and 'unfix' it back to camera space.
*
* @method Phaser.TilemapLayer#_unfixX
* @private
* @param ***REMOVED***number***REMOVED*** x - x coordinate in scrollFactor-adjusted dimensions
* @return ***REMOVED***number***REMOVED*** x coordinate in camera space
*/
Phaser.TilemapLayer.prototype._unfixX = function (x) ***REMOVED***

    if (this.scrollFactorX === 1)
    ***REMOVED***
        return x;
    ***REMOVED***

    return (this._scrollX / this.scrollFactorX) + (x - this._scrollX);

***REMOVED***;

/**
* Take a y coordinate that doesn't account for scrollFactorY and 'fix' it into a scrolled local space.
*
* @method Phaser.TilemapLayer#_fixY
* @private
* @param ***REMOVED***number***REMOVED*** y - y coordinate in camera space
* @return ***REMOVED***number***REMOVED*** y coordinate in scrollFactor-adjusted dimensions
*/
Phaser.TilemapLayer.prototype._fixY = function (y) ***REMOVED***

    if (this.scrollFactorY === 1 || (this.scrollFactorY === 0 && this.position.y === 0))
    ***REMOVED***
        return y;
    ***REMOVED***
    
    //  This executes if the scrollFactorY is 0 and the y position of the tilemap is off from standard.
    if (this.scrollFactorY === 0 && this.position.y !== 0)
    ***REMOVED***
        return y - this.position.y;
    ***REMOVED***
    
    return this._scrollY + (y - (this._scrollY / this.scrollFactorY));

***REMOVED***;

/**
* Take a y coordinate that _does_ account for scrollFactorY and 'unfix' it back to camera space.
*
* @method Phaser.TilemapLayer#_unfixY
* @private
* @param ***REMOVED***number***REMOVED*** y - y coordinate in scrollFactor-adjusted dimensions
* @return ***REMOVED***number***REMOVED*** y coordinate in camera space
*/
Phaser.TilemapLayer.prototype._unfixY = function (y) ***REMOVED***

    if (this.scrollFactorY === 1)
    ***REMOVED***
        return y;
    ***REMOVED***

    return (this._scrollY / this.scrollFactorY) + (y - this._scrollY);

***REMOVED***;

/**
* Convert a pixel value to a tile coordinate.
*
* @method Phaser.TilemapLayer#getTileX
* @public
* @param ***REMOVED***number***REMOVED*** x - X position of the point in target tile (in pixels).
* @return ***REMOVED***integer***REMOVED*** The X map location of the tile.
*/
Phaser.TilemapLayer.prototype.getTileX = function (x) ***REMOVED***

    // var tileWidth = this.tileWidth * this.scale.x;
    return Math.floor(this._fixX(x) / this._mc.tileWidth);

***REMOVED***;

/**
* Convert a pixel value to a tile coordinate.
*
* @method Phaser.TilemapLayer#getTileY
* @public
* @param ***REMOVED***number***REMOVED*** y - Y position of the point in target tile (in pixels).
* @return ***REMOVED***integer***REMOVED*** The Y map location of the tile.
*/
Phaser.TilemapLayer.prototype.getTileY = function (y) ***REMOVED***

    // var tileHeight = this.tileHeight * this.scale.y;
    return Math.floor(this._fixY(y) / this._mc.tileHeight);

***REMOVED***;

/**
* Convert a pixel coordinate to a tile coordinate.
*
* @method Phaser.TilemapLayer#getTileXY
* @public
* @param ***REMOVED***number***REMOVED*** x - X position of the point in target tile (in pixels).
* @param ***REMOVED***number***REMOVED*** y - Y position of the point in target tile (in pixels).
* @param ***REMOVED***(Phaser.Point|object)***REMOVED*** point - The Point/object to update.
* @return ***REMOVED***(Phaser.Point|object)***REMOVED*** A Point/object with its `x` and `y` properties set.
*/
Phaser.TilemapLayer.prototype.getTileXY = function (x, y, point) ***REMOVED***

    point.x = this.getTileX(x);
    point.y = this.getTileY(y);

    return point;

***REMOVED***;

/**
* Gets all tiles that intersect with the given line.
*
* @method Phaser.TilemapLayer#getRayCastTiles
* @public
* @param ***REMOVED***Phaser.Line***REMOVED*** line - The line used to determine which tiles to return.
* @param ***REMOVED***integer***REMOVED*** [stepRate=(rayStepRate)] - How many steps through the ray will we check? Defaults to `rayStepRate`.
* @param ***REMOVED***boolean***REMOVED*** [collides=false] - If true, _only_ return tiles that collide on one or more faces.
* @param ***REMOVED***boolean***REMOVED*** [interestingFace=false] - If true, _only_ return tiles that have interesting faces.
* @return ***REMOVED***Phaser.Tile[]***REMOVED*** An array of Phaser.Tiles.
*/
Phaser.TilemapLayer.prototype.getRayCastTiles = function (line, stepRate, collides, interestingFace) ***REMOVED***

    if (!stepRate) ***REMOVED*** stepRate = this.rayStepRate; ***REMOVED***
    if (collides === undefined) ***REMOVED*** collides = false; ***REMOVED***
    if (interestingFace === undefined) ***REMOVED*** interestingFace = false; ***REMOVED***

    //  First get all tiles that touch the bounds of the line
    var tiles = this.getTiles(line.x, line.y, line.width, line.height, collides, interestingFace);

    if (tiles.length === 0)
    ***REMOVED***
        return [];
    ***REMOVED***

    //  Now we only want the tiles that intersect with the points on this line
    var coords = line.coordinatesOnLine(stepRate);
    var results = [];

    for (var i = 0; i < tiles.length; i++)
    ***REMOVED***
        for (var t = 0; t < coords.length; t++)
        ***REMOVED***
            var tile = tiles[i];
            var coord = coords[t];
            if (tile.containsPoint(coord[0], coord[1]))
            ***REMOVED***
                results.push(tile);
                break;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    return results;

***REMOVED***;

/**
* Get all tiles that exist within the given area, defined by the top-left corner, width and height. Values given are in pixels, not tiles.
*
* @method Phaser.TilemapLayer#getTiles
* @public
* @param ***REMOVED***number***REMOVED*** x - X position of the top left corner (in pixels).
* @param ***REMOVED***number***REMOVED*** y - Y position of the top left corner (in pixels).
* @param ***REMOVED***number***REMOVED*** width - Width of the area to get (in pixels).
* @param ***REMOVED***number***REMOVED*** height - Height of the area to get (in pixels).
* @param ***REMOVED***boolean***REMOVED*** [collides=false] - If true, _only_ return tiles that collide on one or more faces.
* @param ***REMOVED***boolean***REMOVED*** [interestingFace=false] - If true, _only_ return tiles that have interesting faces.
* @return ***REMOVED***array<Phaser.Tile>***REMOVED*** An array of Tiles.
*/
Phaser.TilemapLayer.prototype.getTiles = function (x, y, width, height, collides, interestingFace) ***REMOVED***

    //  Should we only get tiles that have at least one of their collision flags set? (true = yes, false = no just get them all)
    if (collides === undefined) ***REMOVED*** collides = false; ***REMOVED***
    if (interestingFace === undefined) ***REMOVED*** interestingFace = false; ***REMOVED***

    var fetchAll = !(collides || interestingFace);

    //  Adjust the x,y coordinates for scrollFactor
    x = this._fixX(x);
    y = this._fixY(y);

    //  Convert the pixel values into tile coordinates
    var tx = Math.floor(x / (this._mc.cw * this.scale.x));
    var ty = Math.floor(y / (this._mc.ch * this.scale.y));
    //  Don't just use ceil(width/cw) to allow account for x/y diff within cell
    var tw = Math.ceil((x + width) / (this._mc.cw * this.scale.x)) - tx;
    var th = Math.ceil((y + height) / (this._mc.ch * this.scale.y)) - ty;

    while (this._results.length)
    ***REMOVED***
        this._results.pop();
    ***REMOVED***

    for (var wy = ty; wy < ty + th; wy++)
    ***REMOVED***
        for (var wx = tx; wx < tx + tw; wx++)
        ***REMOVED***
            var row = this.layer.data[wy];

            if (row && row[wx])
            ***REMOVED***
                if (fetchAll || row[wx].isInteresting(collides, interestingFace))
                ***REMOVED***
                    this._results.push(row[wx]);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    return this._results.slice();

***REMOVED***;

/**
* Returns the appropriate tileset for the index, updating the internal cache as required.
* This should only be called if `tilesets[index]` evaluates to undefined.
*
* @method Phaser.TilemapLayer#resolveTileset
* @private
* @param ***REMOVED***integer***REMOVED*** Tile index
* @return ***REMOVED***Phaser.Tileset|null***REMOVED*** Returns the associated tileset or null if there is no such mapping.
*/
Phaser.TilemapLayer.prototype.resolveTileset = function (tileIndex) ***REMOVED***

    var tilesets = this._mc.tilesets;

    //  Try for dense array if reasonable
    if (tileIndex < 2000)
    ***REMOVED***
        while (tilesets.length < tileIndex)
        ***REMOVED***
            tilesets.push(undefined);
        ***REMOVED***
    ***REMOVED***

    var setIndex = this.map.tiles[tileIndex] && this.map.tiles[tileIndex][2];

    if (setIndex !== null)
    ***REMOVED***
        var tileset = this.map.tilesets[setIndex];

        if (tileset && tileset.containsTileIndex(tileIndex))
        ***REMOVED***
            return (tilesets[tileIndex] = tileset);
        ***REMOVED***
    ***REMOVED***

    return (tilesets[tileIndex] = null);

***REMOVED***;

/**
* The TilemapLayer caches tileset look-ups.
*
* Call this method of clear the cache if tilesets have been added or updated after the layer has been rendered.
*
* @method Phaser.TilemapLayer#resetTilesetCache
* @public
*/
Phaser.TilemapLayer.prototype.resetTilesetCache = function () ***REMOVED***

    var tilesets = this._mc.tilesets;

    while (tilesets.length)
    ***REMOVED***
        tilesets.pop();
    ***REMOVED***

***REMOVED***;

/**
 * This method will set the scale of the tilemap as well as update the underlying block data of this layer.
 * 
 * @method Phaser.TilemapLayer#setScale
 * @param ***REMOVED***number***REMOVED*** [xScale=1] - The scale factor along the X-plane 
 * @param ***REMOVED***number***REMOVED*** [yScale] - The scale factor along the Y-plane
 */
Phaser.TilemapLayer.prototype.setScale = function (xScale, yScale) ***REMOVED***

    xScale = xScale || 1;
    yScale = yScale || xScale;

    for (var y = 0; y < this.layer.data.length; y++)
    ***REMOVED***
        var row = this.layer.data[y];

        for (var x = 0; x < row.length; x++)
        ***REMOVED***
            var tile = row[x];

            tile.width = this.map.tileWidth * xScale;
            tile.height = this.map.tileHeight * yScale;

            tile.worldX = tile.x * tile.width;
            tile.worldY = tile.y * tile.height;
        ***REMOVED***
    ***REMOVED***

    this.scale.setTo(xScale, yScale);

***REMOVED***;

/**
* Shifts the contents of the canvas - does extra math so that different browsers agree on the result.
*
* The specified (x/y) will be shifted to (0,0) after the copy and the newly exposed canvas area will need to be filled in.
*
* @method Phaser.TilemapLayer#shiftCanvas
* @private
* @param ***REMOVED***CanvasRenderingContext2D***REMOVED*** context - The context to shift
* @param ***REMOVED***integer***REMOVED*** x
* @param ***REMOVED***integer***REMOVED*** y
*/
Phaser.TilemapLayer.prototype.shiftCanvas = function (context, x, y) ***REMOVED***

    var canvas = context.canvas;
    var copyW = canvas.width - Math.abs(x);
    var copyH = canvas.height - Math.abs(y);

    //  When x/y non-negative
    var dx = 0;
    var dy = 0;
    var sx = x;
    var sy = y;

    if (x < 0)
    ***REMOVED***
        dx = -x;
        sx = 0;
    ***REMOVED***

    if (y < 0)
    ***REMOVED***
        dy = -y;
        sy = 0;
    ***REMOVED***

    var copyCanvas = this.renderSettings.copyCanvas;

    if (copyCanvas)
    ***REMOVED***
        // Use a second copy buffer, without slice support, for Safari .. again.
        // Ensure copy canvas is large enough
        if (copyCanvas.width < copyW || copyCanvas.height < copyH)
        ***REMOVED***
            copyCanvas.width = copyW;
            copyCanvas.height = copyH;
        ***REMOVED***

        var copyContext = copyCanvas.getContext('2d');
        copyContext.clearRect(0, 0, copyW, copyH);
        copyContext.drawImage(canvas, dx, dy, copyW, copyH, 0, 0, copyW, copyH);
        // clear allows default 'source-over' semantics
        context.clearRect(sx, sy, copyW, copyH);
        context.drawImage(copyCanvas, 0, 0, copyW, copyH, sx, sy, copyW, copyH);
    ***REMOVED***
    else
    ***REMOVED***
        // Avoids a second copy but flickers in Safari / Safari Mobile
        // Ref. https://github.com/photonstorm/phaser/issues/1439
        context.save();
        context.globalCompositeOperation = 'copy';
        context.drawImage(canvas, dx, dy, copyW, copyH, sx, sy, copyW, copyH);
        context.restore();
    ***REMOVED***
    
***REMOVED***;

/**
* Render tiles in the given area given by the virtual tile coordinates biased by the given scroll factor.
* This will constrain the tile coordinates based on wrapping but not physical coordinates.
*
* @method Phaser.TilemapLayer#renderRegion
* @private
* @param ***REMOVED***integer***REMOVED*** scrollX - Render x offset/scroll.
* @param ***REMOVED***integer***REMOVED*** scrollY - Render y offset/scroll.
* @param ***REMOVED***integer***REMOVED*** left - Leftmost column to render.
* @param ***REMOVED***integer***REMOVED*** top - Topmost row to render.
* @param ***REMOVED***integer***REMOVED*** right - Rightmost column to render.
* @param ***REMOVED***integer***REMOVED*** bottom - Bottommost row to render.
*/
Phaser.TilemapLayer.prototype.renderRegion = function (scrollX, scrollY, left, top, right, bottom) ***REMOVED***

    var context = this.context;

    var width = this.layer.width;
    var height = this.layer.height;
    var tw = this._mc.tileWidth;
    var th = this._mc.tileHeight;

    var tilesets = this._mc.tilesets;
    var lastAlpha = NaN;

    if (!this._wrap)
    ***REMOVED***
        if (left <= right) // Only adjust if going to render
        ***REMOVED***
            left = Math.max(0, left);
            right = Math.min(width - 1, right);
        ***REMOVED***
        if (top <= bottom)
        ***REMOVED***
            top = Math.max(0, top);
            bottom = Math.min(height - 1, bottom);
        ***REMOVED***
    ***REMOVED***
   
    // top-left pixel of top-left cell
    var baseX = (left * tw) - scrollX;
    var baseY = (top * th) - scrollY;

    // Fix normStartX/normStartY such it is normalized [0..width/height). This allows a simple conditional and decrement to always keep in range [0..width/height) during the loop. The major offset bias is to take care of negative values.
    var normStartX = (left + ((1 << 20) * width)) % width;
    var normStartY = (top + ((1 << 20) * height)) % height;

    // tx/ty - are pixel coordinates where tile is drawn
    // x/y - is cell location, normalized [0..width/height) in loop
    // xmax/ymax - remaining cells to render on column/row
    var tx, ty, x, y, xmax, ymax;

    for (y = normStartY, ymax = bottom - top, ty = baseY; ymax >= 0; y++, ymax--, ty += th)
    ***REMOVED***
        if (y >= height)
        ***REMOVED***
            y -= height;
        ***REMOVED***

        var row = this.layer.data[y];

        for (x = normStartX, xmax = right - left, tx = baseX; xmax >= 0; x++, xmax--, tx += tw)
        ***REMOVED***
            if (x >= width)
            ***REMOVED***
                x -= width;
            ***REMOVED***

            var tile = row[x];

            if (!tile || tile.index < 0)
            ***REMOVED***
                continue;
            ***REMOVED***

            var index = tile.index;

            var set = tilesets[index];

            if (set === undefined)
            ***REMOVED***
                set = this.resolveTileset(index);
            ***REMOVED***

            //  Setting the globalAlpha is "surprisingly expensive" in Chrome (38)
            if (tile.alpha !== lastAlpha && !this.debug)
            ***REMOVED***
                context.globalAlpha = tile.alpha;
                lastAlpha = tile.alpha;
            ***REMOVED***

            if (set)
            ***REMOVED***
                if (tile.rotation || tile.flipped)
                ***REMOVED***
                    context.save();
                    context.translate(tx + tile.centerX, ty + tile.centerY);
                    context.rotate(tile.rotation);

                    if (tile.flipped)
                    ***REMOVED***
                        context.scale(-1, 1);
                    ***REMOVED***

                    set.draw(context, -tile.centerX, -tile.centerY, index);
                    context.restore();
                ***REMOVED***
                else
                ***REMOVED***
                    set.draw(context, tx, ty, index);
                ***REMOVED***
            ***REMOVED***
            else if (this.debugSettings.missingImageFill)
            ***REMOVED***
                context.fillStyle = this.debugSettings.missingImageFill;
                context.fillRect(tx, ty, tw, th);
            ***REMOVED***

            if (tile.debug && this.debugSettings.debuggedTileOverfill)
            ***REMOVED***
                context.fillStyle = this.debugSettings.debuggedTileOverfill;
                context.fillRect(tx, ty, tw, th);
            ***REMOVED***
           
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

/**
* Shifts the canvas and render damaged edge tiles.
*
* @method Phaser.TilemapLayer#renderDeltaScroll
* @private
*/
Phaser.TilemapLayer.prototype.renderDeltaScroll = function (shiftX, shiftY) ***REMOVED***

    var scrollX = this._mc.scrollX;
    var scrollY = this._mc.scrollY;

    var renderW = this.canvas.width;
    var renderH = this.canvas.height;

    var tw = this._mc.tileWidth;
    var th = this._mc.tileHeight;

    // Only cells with coordinates in the "plus" formed by `left <= x <= right` OR `top <= y <= bottom` are drawn. These coordinates may be outside the layer bounds.

    // Start in pixels
    var left = 0;
    var right = -tw;
    var top = 0;
    var bottom = -th;

    if (shiftX < 0) // layer moving left, damage right
    ***REMOVED***
        left = renderW + shiftX; // shiftX neg.
        right = renderW - 1;
    ***REMOVED***
    else if (shiftX > 0)
    ***REMOVED***
        // left -> 0
        right = shiftX;
    ***REMOVED***

    if (shiftY < 0) // layer moving down, damage top
    ***REMOVED***
        top = renderH + shiftY; // shiftY neg.
        bottom = renderH - 1;
    ***REMOVED***
    else if (shiftY > 0)
    ***REMOVED***
        // top -> 0
        bottom = shiftY;
    ***REMOVED***

    this.shiftCanvas(this.context, shiftX, shiftY);

    // Transform into tile-space
    left = Math.floor((left + scrollX) / tw);
    right = Math.floor((right + scrollX) / tw);
    top = Math.floor((top + scrollY) / th);
    bottom = Math.floor((bottom + scrollY) / th);

    if (left <= right)
    ***REMOVED***
        // Clear left or right edge
        this.context.clearRect(((left * tw) - scrollX), 0, (right - left + 1) * tw, renderH);

        var trueTop = Math.floor((0 + scrollY) / th);
        var trueBottom = Math.floor((renderH - 1 + scrollY) / th);
        this.renderRegion(scrollX, scrollY, left, trueTop, right, trueBottom);
    ***REMOVED***

    if (top <= bottom)
    ***REMOVED***
        // Clear top or bottom edge
        this.context.clearRect(0, ((top * th) - scrollY), renderW, (bottom - top + 1) * th);

        var trueLeft = Math.floor((0 + scrollX) / tw);
        var trueRight = Math.floor((renderW - 1 + scrollX) / tw);
        this.renderRegion(scrollX, scrollY, trueLeft, top, trueRight, bottom);
    ***REMOVED***

***REMOVED***;

/**
* Clear and render the entire canvas.
*
* @method Phaser.TilemapLayer#renderFull
* @private
*/
Phaser.TilemapLayer.prototype.renderFull = function () ***REMOVED***
    
    var scrollX = this._mc.scrollX;
    var scrollY = this._mc.scrollY;

    var renderW = this.canvas.width;
    var renderH = this.canvas.height;

    var tw = this._mc.tileWidth;
    var th = this._mc.tileHeight;

    var left = Math.floor(scrollX / tw);
    var right = Math.floor((renderW - 1 + scrollX) / tw);
    var top = Math.floor(scrollY / th);
    var bottom = Math.floor((renderH - 1 + scrollY) / th);

    this.context.clearRect(0, 0, renderW, renderH);

    this.renderRegion(scrollX, scrollY, left, top, right, bottom);

***REMOVED***;

/**
* Renders the tiles to the layer canvas and pushes to the display.
*
* @method Phaser.TilemapLayer#render
* @protected
*/
Phaser.TilemapLayer.prototype.render = function () ***REMOVED***

    var redrawAll = false;

    if (!this.visible)
    ***REMOVED***
        return;
    ***REMOVED***

    if (this.dirty || this.layer.dirty)
    ***REMOVED***
        this.layer.dirty = false;
        redrawAll = true;
    ***REMOVED***

    var renderWidth = this.canvas.width; // Use Sprite.width/height?
    var renderHeight = this.canvas.height;

    //  Scrolling bias; whole pixels only
    var scrollX = this._scrollX | 0;
    var scrollY = this._scrollY | 0;

    var mc = this._mc;
    var shiftX = mc.scrollX - scrollX; // Negative when scrolling right/down
    var shiftY = mc.scrollY - scrollY;

    if (!redrawAll &&
        shiftX === 0 && shiftY === 0 &&
        mc.renderWidth === renderWidth && mc.renderHeight === renderHeight)
    ***REMOVED***
        //  No reason to redraw map, looking at same thing and not invalidated.
        return;
    ***REMOVED***

    this.context.save();
    
    mc.scrollX = scrollX;
    mc.scrollY = scrollY;

    if (mc.renderWidth !== renderWidth || mc.renderHeight !== renderHeight)
    ***REMOVED***
        //  Could support automatic canvas resizing
        mc.renderWidth = renderWidth;
        mc.renderHeight = renderHeight;
    ***REMOVED***

    if (this.debug)
    ***REMOVED***
        this.context.globalAlpha = this.debugSettings.debugAlpha;

        if (this.debugSettings.forceFullRedraw)
        ***REMOVED***
            redrawAll = true;
        ***REMOVED***
    ***REMOVED***

    if (!redrawAll &&
        this.renderSettings.enableScrollDelta &&
        (Math.abs(shiftX) + Math.abs(shiftY)) < Math.min(renderWidth, renderHeight))
    ***REMOVED***
        this.renderDeltaScroll(shiftX, shiftY);
    ***REMOVED***
    else
    ***REMOVED***
        // Too much change or otherwise requires full render
        this.renderFull();
    ***REMOVED***

    if (this.debug)
    ***REMOVED***
        this.context.globalAlpha = 1;
        this.renderDebug();
    ***REMOVED***

    this.texture.baseTexture.dirty();

    this.dirty = false;

    this.context.restore();

    return true;

***REMOVED***;

/**
* Renders a debug overlay on-top of the canvas. Called automatically by render when `debug` is true.
*
* See `debugSettings` for assorted configuration options.
*
* @method Phaser.TilemapLayer#renderDebug
* @private
*/
Phaser.TilemapLayer.prototype.renderDebug = function () ***REMOVED***

    var scrollX = this._mc.scrollX;
    var scrollY = this._mc.scrollY;

    var context = this.context;
    var renderW = this.canvas.width;
    var renderH = this.canvas.height;

    var width = this.layer.width;
    var height = this.layer.height;
    var tw = this._mc.tileWidth;
    var th = this._mc.tileHeight;

    var left = Math.floor(scrollX / tw);
    var right = Math.floor((renderW - 1 + scrollX) / tw);
    var top = Math.floor(scrollY / th);
    var bottom = Math.floor((renderH - 1 + scrollY) / th);

    var baseX = (left * tw) - scrollX;
    var baseY = (top * th) - scrollY;

    var normStartX = (left + ((1 << 20) * width)) % width;
    var normStartY = (top + ((1 << 20) * height)) % height;

    var tx, ty, x, y, xmax, ymax;

    context.strokeStyle = this.debugSettings.facingEdgeStroke;

    for (y = normStartY, ymax = bottom - top, ty = baseY; ymax >= 0; y++, ymax--, ty += th)
    ***REMOVED***
        if (y >= height)
        ***REMOVED***
            y -= height;
        ***REMOVED***

        var row = this.layer.data[y];

        for (x = normStartX, xmax = right - left, tx = baseX; xmax >= 0; x++, xmax--, tx += tw)
        ***REMOVED***
            if (x >= width)
            ***REMOVED***
                x -= width;
            ***REMOVED***

            var tile = row[x];
            if (!tile || tile.index < 0 || !tile.collides)
            ***REMOVED***
                continue;
            ***REMOVED***

            if (this.debugSettings.collidingTileOverfill)
            ***REMOVED***
                context.fillStyle = this.debugSettings.collidingTileOverfill;
                context.fillRect(tx, ty, this._mc.cw, this._mc.ch);
            ***REMOVED***

            if (this.debugSettings.facingEdgeStroke)
            ***REMOVED***
                context.beginPath();

                if (tile.faceTop)
                ***REMOVED***
                    context.moveTo(tx, ty);
                    context.lineTo(tx + this._mc.cw, ty);
                ***REMOVED***

                if (tile.faceBottom)
                ***REMOVED***
                    context.moveTo(tx, ty + this._mc.ch);
                    context.lineTo(tx + this._mc.cw, ty + this._mc.ch);
                ***REMOVED***

                if (tile.faceLeft)
                ***REMOVED***
                    context.moveTo(tx, ty);
                    context.lineTo(tx, ty + this._mc.ch);
                ***REMOVED***

                if (tile.faceRight)
                ***REMOVED***
                    context.moveTo(tx + this._mc.cw, ty);
                    context.lineTo(tx + this._mc.cw, ty + this._mc.ch);
                ***REMOVED***

                context.closePath();

                context.stroke();
            ***REMOVED***
           
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

/**
* Flag controlling if the layer tiles wrap at the edges. Only works if the World size matches the Map size.
*
* @property ***REMOVED***boolean***REMOVED*** wrap
* @memberof Phaser.TilemapLayer
* @public
* @default false
*/
Object.defineProperty(Phaser.TilemapLayer.prototype, "wrap", ***REMOVED***

    get: function () ***REMOVED***
        return this._wrap;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this._wrap = value;
        this.dirty = true;
    ***REMOVED***

***REMOVED***);

/**
* Scrolls the map horizontally or returns the current x position.
*
* @property ***REMOVED***number***REMOVED*** scrollX
* @memberof Phaser.TilemapLayer
* @public
*/
Object.defineProperty(Phaser.TilemapLayer.prototype, "scrollX", ***REMOVED***

    get: function () ***REMOVED***
        return this._scrollX;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this._scrollX = value;
    ***REMOVED***

***REMOVED***);

/**
* Scrolls the map vertically or returns the current y position.
*
* @property ***REMOVED***number***REMOVED*** scrollY
* @memberof Phaser.TilemapLayer
* @public
*/
Object.defineProperty(Phaser.TilemapLayer.prototype, "scrollY", ***REMOVED***

    get: function () ***REMOVED***
        return this._scrollY;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this._scrollY = value;
    ***REMOVED***

***REMOVED***);

/**
* The width of the collision tiles (in pixels).
*
* @property ***REMOVED***integer***REMOVED*** collisionWidth
* @memberof Phaser.TilemapLayer
* @public
*/
Object.defineProperty(Phaser.TilemapLayer.prototype, "collisionWidth", ***REMOVED***

    get: function () ***REMOVED***
        return this._mc.cw;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this._mc.cw = value | 0;
        this.dirty = true;
    ***REMOVED***

***REMOVED***);

/**
* The height of the collision tiles (in pixels).
*
* @property ***REMOVED***integer***REMOVED*** collisionHeight
* @memberof Phaser.TilemapLayer
* @public
*/
Object.defineProperty(Phaser.TilemapLayer.prototype, "collisionHeight", ***REMOVED***

    get: function () ***REMOVED***
        return this._mc.ch;
    ***REMOVED***,

    set: function (value) ***REMOVED***
        this._mc.ch = value | 0;
        this.dirty = true;
    ***REMOVED***

***REMOVED***);

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Phaser.TilemapParser parses data objects from Phaser.Loader that need more preparation before they can be inserted into a Tilemap.
*
* @class Phaser.TilemapParser
* @static
*/
Phaser.TilemapParser = ***REMOVED***

    /**
     * When scanning the Tiled map data the TilemapParser can either insert a null value (true) or
     * a Phaser.Tile instance with an index of -1 (false, the default). Depending on your game type
     * depends how this should be configured. If you've a large sparsely populated map and the tile
     * data doesn't need to change then setting this value to `true` will help with memory consumption.
     * However if your map is small, or you need to update the tiles (perhaps the map dynamically changes
     * during the game) then leave the default value set.
     *
     * @constant
     * @type ***REMOVED***boolean***REMOVED***
     */
    INSERT_NULL: false,

    /**
    * Parse tilemap data from the cache and creates data for a Tilemap object.
    *
    * @method Phaser.TilemapParser.parse
    * @param ***REMOVED***Phaser.Game***REMOVED*** game - Game reference to the currently running game.
    * @param ***REMOVED***string***REMOVED*** key - The key of the tilemap in the Cache.
    * @param ***REMOVED***number***REMOVED*** [tileWidth=32] - The pixel width of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
    * @param ***REMOVED***number***REMOVED*** [tileHeight=32] - The pixel height of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
    * @param ***REMOVED***number***REMOVED*** [width=10] - The width of the map in tiles. If this map is created from Tiled or CSV data you don't need to specify this.
    * @param ***REMOVED***number***REMOVED*** [height=10] - The height of the map in tiles. If this map is created from Tiled or CSV data you don't need to specify this.
    * @return ***REMOVED***object***REMOVED*** The parsed map object.
    */
    parse: function (game, key, tileWidth, tileHeight, width, height) ***REMOVED***

        if (tileWidth === undefined) ***REMOVED*** tileWidth = 32; ***REMOVED***
        if (tileHeight === undefined) ***REMOVED*** tileHeight = 32; ***REMOVED***
        if (width === undefined) ***REMOVED*** width = 10; ***REMOVED***
        if (height === undefined) ***REMOVED*** height = 10; ***REMOVED***

        if (key === undefined)
        ***REMOVED***
            return this.getEmptyData();
        ***REMOVED***

        if (key === null)
        ***REMOVED***
            return this.getEmptyData(tileWidth, tileHeight, width, height);
        ***REMOVED***

        var map = game.cache.getTilemapData(key);

        if (map)
        ***REMOVED***
            if (map.format === Phaser.Tilemap.CSV)
            ***REMOVED***
                return this.parseCSV(key, map.data, tileWidth, tileHeight);
            ***REMOVED***
            else if (!map.format || map.format === Phaser.Tilemap.TILED_JSON)
            ***REMOVED***
                return this.parseTiledJSON(map.data);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            console.warn('Phaser.TilemapParser.parse - No map data found for key ' + key);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Parses a CSV file into valid map data.
    *
    * @method Phaser.TilemapParser.parseCSV
    * @param ***REMOVED***string***REMOVED*** key - The name you want to give the map data.
    * @param ***REMOVED***string***REMOVED*** data - The CSV file data.
    * @param ***REMOVED***number***REMOVED*** [tileWidth=32] - The pixel width of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
    * @param ***REMOVED***number***REMOVED*** [tileHeight=32] - The pixel height of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
    * @return ***REMOVED***object***REMOVED*** Generated map data.
    */
    parseCSV: function (key, data, tileWidth, tileHeight) ***REMOVED***

        var map = this.getEmptyData();

        //  Trim any rogue whitespace from the data
        data = data.trim();

        var output = [];
        var rows = data.split("\n");
        var height = rows.length;
        var width = 0;

        for (var y = 0; y < rows.length; y++)
        ***REMOVED***
            output[y] = [];

            var column = rows[y].split(",");

            for (var x = 0; x < column.length; x++)
            ***REMOVED***
                output[y][x] = new Phaser.Tile(map.layers[0], parseInt(column[x], 10), x, y, tileWidth, tileHeight);
            ***REMOVED***

            if (width === 0)
            ***REMOVED***
                width = column.length;
            ***REMOVED***
        ***REMOVED***

        map.format = Phaser.Tilemap.CSV;
        map.name = key;
        map.width = width;
        map.height = height;
        map.tileWidth = tileWidth;
        map.tileHeight = tileHeight;
        map.widthInPixels = width * tileWidth;
        map.heightInPixels = height * tileHeight;

        map.layers[0].width = width;
        map.layers[0].height = height;
        map.layers[0].widthInPixels = map.widthInPixels;
        map.layers[0].heightInPixels = map.heightInPixels;
        map.layers[0].data = output;

        return map;

    ***REMOVED***,

    /**
    * Returns an empty map data object.
    *
    * @method Phaser.TilemapParser.getEmptyData
    * @return ***REMOVED***object***REMOVED*** Generated map data.
    */
    getEmptyData: function (tileWidth, tileHeight, width, height) ***REMOVED***

        return ***REMOVED***
            width: (width !== undefined && width !== null) ? width : 0,
            height: (height !== undefined && height !== null) ? height : 0,
            tileWidth: (tileWidth !== undefined && tileWidth !== null) ? tileWidth : 0,
            tileHeight: (tileHeight !== undefined && tileHeight !== null) ? tileHeight : 0,
            orientation: 'orthogonal',
            version: '1',
            properties: ***REMOVED******REMOVED***,
            widthInPixels: 0,
            heightInPixels: 0,
            layers: [
                ***REMOVED***
                    name: 'layer',
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    widthInPixels: 0,
                    heightInPixels: 0,
                    alpha: 1,
                    visible: true,
                    properties: ***REMOVED******REMOVED***,
                    indexes: [],
                    callbacks: [],
                    bodies: [],
                    data: []
                ***REMOVED***
            ],
            images: [],
            objects: ***REMOVED******REMOVED***,
            collision: ***REMOVED******REMOVED***,
            tilesets: [],
            tiles: []
        ***REMOVED***;

    ***REMOVED***,

    /**
    * Parses a Tiled JSON file into valid map data.
    * @method Phaser.TilemapParser.parseJSON
    * @param ***REMOVED***object***REMOVED*** json - The JSON map data.
    * @return ***REMOVED***object***REMOVED*** Generated and parsed map data.
    */
    parseTiledJSON: function (json) ***REMOVED***

        if (json.orientation !== 'orthogonal')
        ***REMOVED***
            console.warn('TilemapParser.parseTiledJSON - Only orthogonal map types are supported in this version of Phaser');
            return null;
        ***REMOVED***

        //  Map data will consist of: layers, objects, images, tilesets, sizes
        var map = ***REMOVED***
            width: json.width,
            height: json.height,
            tileWidth: json.tilewidth,
            tileHeight: json.tileheight,
            orientation: json.orientation,
            format: Phaser.Tilemap.TILED_JSON,
            version: json.version,
            properties: json.properties,
            widthInPixels: json.width * json.tilewidth,
            heightInPixels: json.height * json.tileheight
        ***REMOVED***;

        //  Tile Layers
        var layers = [];

        for (var i = 0; i < json.layers.length; i++)
        ***REMOVED***
            if (json.layers[i].type !== 'tilelayer')
            ***REMOVED***
                continue;
            ***REMOVED***

            var curl = json.layers[i];

            // Base64 decode data if necessary
            // NOTE: uncompressed base64 only.

            if (!curl.compression && curl.encoding && curl.encoding === 'base64')
            ***REMOVED***
                var binaryString = window.atob(curl.data);
                var len = binaryString.length;
                var bytes = new Array(len);

                // Interpret binaryString as an array of bytes representing
                // little-endian encoded uint32 values.
                for (var j = 0; j < len; j+=4)
                ***REMOVED***
                    bytes[j / 4] = (
                        binaryString.charCodeAt(j) |
                        binaryString.charCodeAt(j + 1) << 8 |
                        binaryString.charCodeAt(j + 2) << 16 |
                        binaryString.charCodeAt(j + 3) << 24
                    ) >>> 0;
                ***REMOVED***

                curl.data = bytes;

                delete curl.encoding;
            ***REMOVED***
            else if (curl.compression)
            ***REMOVED***
                console.warn('TilemapParser.parseTiledJSON - Layer compression is unsupported, skipping layer \'' + curl.name + '\'');
                continue;
            ***REMOVED***

            var layer = ***REMOVED***

                name: curl.name,
                x: curl.x,
                y: curl.y,
                width: curl.width,
                height: curl.height,
                widthInPixels: curl.width * json.tilewidth,
                heightInPixels: curl.height * json.tileheight,
                alpha: curl.opacity,
                visible: curl.visible,
                properties: ***REMOVED******REMOVED***,
                indexes: [],
                callbacks: [],
                bodies: []

            ***REMOVED***;

            if (curl.properties)
            ***REMOVED***
                layer.properties = curl.properties;
            ***REMOVED***

            var x = 0;
            var row = [];
            var output = [];
            var rotation, flipped, flippedVal, gid;

            //  Loop through the data field in the JSON.

            //  This is an array containing the tile indexes, one after the other. -1 = no tile, everything else = the tile index (starting at 1 for Tiled, 0 for CSV)
            //  If the map contains multiple tilesets then the indexes are relative to that which the set starts from.
            //  Need to set which tileset in the cache = which tileset in the JSON, if you do this manually it means you can use the same map data but a new tileset.

            for (var t = 0, len = curl.data.length; t < len; t++)
            ***REMOVED***
                rotation = 0;
                flipped = false;
                gid = curl.data[t];
                flippedVal = 0;

                //  If true the current tile is flipped or rotated (Tiled TMX format)
                if (gid > 0x20000000)
                ***REMOVED***
                    // FlippedX
                    if (gid > 0x80000000)
                    ***REMOVED***
                        gid -= 0x80000000;
                        flippedVal += 4;
                    ***REMOVED***

                    // FlippedY
                    if (gid > 0x40000000)
                    ***REMOVED***
                        gid -= 0x40000000;
                        flippedVal += 2;
                    ***REMOVED***

                    // FlippedAD (anti-diagonal = top-right is swapped with bottom-left corners)
                    if (gid > 0x20000000)
                    ***REMOVED***
                        gid -= 0x20000000;
                        flippedVal += 1;
                    ***REMOVED***

                    switch (flippedVal)
                    ***REMOVED***
                        case 5:
                            rotation = Math.PI / 2;
                            break;

                        case 6:
                            rotation = Math.PI;
                            break;

                        case 3:
                            rotation = 3 * Math.PI / 2;
                            break;

                        case 4:
                            rotation = 0;
                            flipped = true;
                            break;

                        case 7:
                            rotation = Math.PI / 2;
                            flipped = true;
                            break;

                        case 2:
                            rotation = Math.PI;
                            flipped = true;
                            break;

                        case 1:
                            rotation = 3 * Math.PI / 2;
                            flipped = true;
                            break;
                    ***REMOVED***
                ***REMOVED***

                //  index, x, y, width, height
                if (gid > 0)
                ***REMOVED***
                    var tile = new Phaser.Tile(layer, gid, x, output.length, json.tilewidth, json.tileheight);

                    tile.rotation = rotation;
                    tile.flipped = flipped;

                    if (flippedVal !== 0)
                    ***REMOVED***
                        //  The WebGL renderer uses this to flip UV coordinates before drawing
                        tile.flippedVal = flippedVal;
                    ***REMOVED***

                    row.push(tile);
                ***REMOVED***
                else
                ***REMOVED***
                    if (Phaser.TilemapParser.INSERT_NULL)
                    ***REMOVED***
                        row.push(null);
                    ***REMOVED***
                    else
                    ***REMOVED***
                        row.push(new Phaser.Tile(layer, -1, x, output.length, json.tilewidth, json.tileheight));
                    ***REMOVED***
                ***REMOVED***

                x++;

                if (x === curl.width)
                ***REMOVED***
                    output.push(row);
                    x = 0;
                    row = [];
                ***REMOVED***
            ***REMOVED***

            layer.data = output;

            layers.push(layer);
        ***REMOVED***

        map.layers = layers;

        //  Images
        var images = [];

        for (var i = 0; i < json.layers.length; i++)
        ***REMOVED***
            if (json.layers[i].type !== 'imagelayer')
            ***REMOVED***
                continue;
            ***REMOVED***

            var curi = json.layers[i];

            var image = ***REMOVED***

                name: curi.name,
                image: curi.image,
                x: curi.x,
                y: curi.y,
                alpha: curi.opacity,
                visible: curi.visible,
                properties: ***REMOVED******REMOVED***

            ***REMOVED***;

            if (curi.properties)
            ***REMOVED***
                image.properties = curi.properties;
            ***REMOVED***

            images.push(image);

        ***REMOVED***

        map.images = images;

        //  Tilesets & Image Collections
        var tilesets = [];
        var imagecollections = [];
        var lastSet = null;

        for (var i = 0; i < json.tilesets.length; i++)
        ***REMOVED***
            //  name, firstgid, width, height, margin, spacing, properties
            var set = json.tilesets[i];

            if (set.image)
            ***REMOVED***
                var newSet = new Phaser.Tileset(set.name, set.firstgid, set.tilewidth, set.tileheight, set.margin, set.spacing, set.properties);

                if (set.tileproperties)
                ***REMOVED***
                    newSet.tileProperties = set.tileproperties;
                ***REMOVED***

                // For a normal sliced tileset the row/count/size information is computed when updated.
                // This is done (again) after the image is set.
                newSet.updateTileData(set.imagewidth, set.imageheight);

                tilesets.push(newSet);
            ***REMOVED***
            else
            ***REMOVED***
                var newCollection = new Phaser.ImageCollection(set.name, set.firstgid, set.tilewidth, set.tileheight, set.margin, set.spacing, set.properties);

                for (var ti in set.tiles)
                ***REMOVED***
                    var image = set.tiles[ti].image;
                    var gid = set.firstgid + parseInt(ti, 10);
                    newCollection.addImage(gid, image);
                ***REMOVED***

                imagecollections.push(newCollection);
            ***REMOVED***

            //  We've got a new Tileset, so set the lastgid into the previous one
            if (lastSet)
            ***REMOVED***
                lastSet.lastgid = set.firstgid - 1;
            ***REMOVED***
            
            lastSet = set;
        ***REMOVED***

        map.tilesets = tilesets;
        map.imagecollections = imagecollections;

        //  Objects & Collision Data (polylines, etc)
        var objects = ***REMOVED******REMOVED***;
        var collision = ***REMOVED******REMOVED***;

        function slice (obj, fields) ***REMOVED***

            var sliced = ***REMOVED******REMOVED***;

            for (var k in fields)
            ***REMOVED***
                var key = fields[k];

                if (typeof obj[key] !== 'undefined')
                ***REMOVED***
                    sliced[key] = obj[key];
                ***REMOVED***
            ***REMOVED***

            return sliced;
        ***REMOVED***

        for (var i = 0; i < json.layers.length; i++)
        ***REMOVED***
            if (json.layers[i].type !== 'objectgroup')
            ***REMOVED***
                continue;
            ***REMOVED***

            var curo = json.layers[i];

            objects[curo.name] = [];
            collision[curo.name] = [];

            for (var v = 0, len = curo.objects.length; v < len; v++)
            ***REMOVED***
                //  Object Tiles
                if (curo.objects[v].gid)
                ***REMOVED***
                    var object = ***REMOVED***

                        gid: curo.objects[v].gid,
                        name: curo.objects[v].name,
                        type: curo.objects[v].hasOwnProperty("type") ? curo.objects[v].type : "",
                        x: curo.objects[v].x,
                        y: curo.objects[v].y,
                        visible: curo.objects[v].visible,
                        properties: curo.objects[v].properties

                    ***REMOVED***;

                    if (curo.objects[v].rotation)
                    ***REMOVED***
                        object.rotation = curo.objects[v].rotation;
                    ***REMOVED***

                    objects[curo.name].push(object);
                ***REMOVED***
                else if (curo.objects[v].polyline)
                ***REMOVED***
                    var object = ***REMOVED***

                        name: curo.objects[v].name,
                        type: curo.objects[v].type,
                        x: curo.objects[v].x,
                        y: curo.objects[v].y,
                        width: curo.objects[v].width,
                        height: curo.objects[v].height,
                        visible: curo.objects[v].visible,
                        properties: curo.objects[v].properties

                    ***REMOVED***;

                    if (curo.objects[v].rotation)
                    ***REMOVED***
                        object.rotation = curo.objects[v].rotation;
                    ***REMOVED***

                    object.polyline = [];

                    //  Parse the polyline into an array
                    for (var p = 0; p < curo.objects[v].polyline.length; p++)
                    ***REMOVED***
                        object.polyline.push([ curo.objects[v].polyline[p].x, curo.objects[v].polyline[p].y ]);
                    ***REMOVED***

                    collision[curo.name].push(object);
                    objects[curo.name].push(object);
                ***REMOVED***
                // polygon
                else if (curo.objects[v].polygon)
                ***REMOVED***
                    var object = slice(curo.objects[v], ['name', 'type', 'x', 'y', 'visible', 'rotation', 'properties']);

                    //  Parse the polygon into an array
                    object.polygon = [];

                    for (var p = 0; p < curo.objects[v].polygon.length; p++)
                    ***REMOVED***
                        object.polygon.push([curo.objects[v].polygon[p].x, curo.objects[v].polygon[p].y]);
                    ***REMOVED***

                    objects[curo.name].push(object);

                ***REMOVED***
                // ellipse
                else if (curo.objects[v].ellipse)
                ***REMOVED***
                    var object = slice(curo.objects[v], ['name', 'type', 'ellipse', 'x', 'y', 'width', 'height', 'visible', 'rotation', 'properties']);
                    objects[curo.name].push(object);
                ***REMOVED***
                // otherwise it's a rectangle
                else
                ***REMOVED***
                    var object = slice(curo.objects[v], ['name', 'type', 'x', 'y', 'width', 'height', 'visible', 'rotation', 'properties']);
                    object.rectangle = true;
                    objects[curo.name].push(object);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        map.objects = objects;
        map.collision = collision;

        map.tiles = [];

        //  Finally lets build our super tileset index
        for (var i = 0; i < map.tilesets.length; i++)
        ***REMOVED***
            var set = map.tilesets[i];

            var x = set.tileMargin;
            var y = set.tileMargin;

            var count = 0;
            var countX = 0;
            var countY = 0;

            for (var t = set.firstgid; t < set.firstgid + set.total; t++)
            ***REMOVED***
                //  Can add extra properties here as needed
                map.tiles[t] = [x, y, i];

                x += set.tileWidth + set.tileSpacing;

                count++;

                if (count === set.total)
                ***REMOVED***
                    break;
                ***REMOVED***

                countX++;

                if (countX === set.columns)
                ***REMOVED***
                    x = set.tileMargin;
                    y += set.tileHeight + set.tileSpacing;

                    countX = 0;
                    countY++;

                    if (countY === set.rows)
                    ***REMOVED***
                        break;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***

        ***REMOVED***

        // assign tile properties

        var layer;
        var tile;
        var sid;
        var set;

        // go through each of the map data layers
        for (var i = 0; i < map.layers.length; i++)
        ***REMOVED***
            layer = map.layers[i];

            set = null;

            // rows of tiles
            for (var j = 0; j < layer.data.length; j++)
            ***REMOVED***
                row = layer.data[j];

                // individual tiles
                for (var k = 0; k < row.length; k++)
                ***REMOVED***
                    tile = row[k];

                    if (tile === null || tile.index < 0)
                    ***REMOVED***
                        continue;
                    ***REMOVED***

                    // find the relevant tileset

                    sid = map.tiles[tile.index][2];
                    set = map.tilesets[sid];


                    // if that tile type has any properties, add them to the tile object

                    if (set.tileProperties && set.tileProperties[tile.index - set.firstgid])
                    ***REMOVED***
                        tile.properties = Phaser.Utils.mixin(set.tileProperties[tile.index - set.firstgid], tile.properties);
                    ***REMOVED***

                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return map;

    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A Tile set is a combination of an image containing the tiles and collision data per tile.
*
* Tilesets are normally created automatically when Tiled data is loaded.
*
* @class Phaser.Tileset
* @constructor
* @param ***REMOVED***string***REMOVED*** name - The name of the tileset in the map data.
* @param ***REMOVED***integer***REMOVED*** firstgid - The first tile index this tileset contains.
* @param ***REMOVED***integer***REMOVED*** [width=32] - Width of each tile (in pixels).
* @param ***REMOVED***integer***REMOVED*** [height=32] - Height of each tile (in pixels).
* @param ***REMOVED***integer***REMOVED*** [margin=0] - The margin around all tiles in the sheet (in pixels).
* @param ***REMOVED***integer***REMOVED*** [spacing=0] - The spacing between each tile in the sheet (in pixels).
* @param ***REMOVED***object***REMOVED*** [properties=***REMOVED******REMOVED***] - Custom Tileset properties.
*/
Phaser.Tileset = function (name, firstgid, width, height, margin, spacing, properties) ***REMOVED***

    if (width === undefined || width <= 0) ***REMOVED*** width = 32; ***REMOVED***
    if (height === undefined || height <= 0) ***REMOVED*** height = 32; ***REMOVED***
    if (margin === undefined) ***REMOVED*** margin = 0; ***REMOVED***
    if (spacing === undefined) ***REMOVED*** spacing = 0; ***REMOVED***

    /**
    * The name of the Tileset.
    * @property ***REMOVED***string***REMOVED*** name
    */
    this.name = name;

    /**
    * The Tiled firstgid value.
    * This is the starting index of the first tile index this Tileset contains.
    * @property ***REMOVED***integer***REMOVED*** firstgid
    */
    this.firstgid = firstgid | 0;

    /**
    * The width of each tile (in pixels).
    * @property ***REMOVED***integer***REMOVED*** tileWidth
    * @readonly
    */
    this.tileWidth = width | 0;

    /**
    * The height of each tile (in pixels).
    * @property ***REMOVED***integer***REMOVED*** tileHeight
    * @readonly
    */
    this.tileHeight = height | 0;

    /**
    * The margin around the tiles in the sheet (in pixels).
    * Use `setSpacing` to change.
    * @property ***REMOVED***integer***REMOVED*** tileMarge
    * @readonly
    */
    // Modified internally
    this.tileMargin = margin | 0;

    /**
    * The spacing between each tile in the sheet (in pixels).
    * Use `setSpacing` to change.
    * @property ***REMOVED***integer***REMOVED*** tileSpacing
    * @readonly
    */
    this.tileSpacing = spacing | 0;

    /**
    * Tileset-specific properties that are typically defined in the Tiled editor.
    * @property ***REMOVED***object***REMOVED*** properties
    */
    this.properties = properties || ***REMOVED******REMOVED***;

    /**
    * The cached image that contains the individual tiles. Use ***REMOVED***@link Phaser.Tileset.setImage setImage***REMOVED*** to set.
    * @property ***REMOVED***?object***REMOVED*** image
    * @readonly
    */
    // Modified internally
    this.image = null;

    /**
    * The number of tile rows in the the tileset.
    * @property ***REMOVED***integer***REMOVED***
    * @readonly
    */
    // Modified internally
    this.rows = 0;

    /**
    * The number of tile columns in the tileset.
    * @property ***REMOVED***integer***REMOVED*** columns
    * @readonly
    */
    // Modified internally
    this.columns = 0;

    /**
    * The total number of tiles in the tileset.
    * @property ***REMOVED***integer***REMOVED*** total
    * @readonly
    */
    // Modified internally
    this.total = 0;

    /**
    * The look-up table to specific tile image offsets.
    * The coordinates are interlaced such that it is [x0, y0, x1, y1 .. xN, yN] and the tile with the index of firstgid is found at indices 0/1.
    * @property ***REMOVED***integer[]***REMOVED*** drawCoords
    * @private
    */
    this.drawCoords = [];

***REMOVED***;

Phaser.Tileset.prototype = ***REMOVED***

    /**
    * Draws a tile from this Tileset at the given coordinates on the context.
    *
    * @method Phaser.Tileset#draw
    * @public
    * @param ***REMOVED***CanvasRenderingContext2D***REMOVED*** context - The context to draw the tile onto.
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate to draw to.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate to draw to.
    * @param ***REMOVED***integer***REMOVED*** index - The index of the tile within the set to draw.
    */
    draw: function (context, x, y, index) ***REMOVED***

        //  Correct the tile index for the set and bias for interlacing
        var coordIndex = (index - this.firstgid) << 1;

        if (coordIndex >= 0 && (coordIndex + 1) < this.drawCoords.length)
        ***REMOVED***
            context.drawImage(
                this.image,
                this.drawCoords[coordIndex],
                this.drawCoords[coordIndex + 1],
                this.tileWidth,
                this.tileHeight,
                x,
                y,
                this.tileWidth,
                this.tileHeight
            );
        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns true if and only if this tileset contains the given tile index.
    *
    * @method Phaser.Tileset#containsTileIndex
    * @public
    * @return ***REMOVED***boolean***REMOVED*** True if this tileset contains the given index.
    */
    containsTileIndex: function (tileIndex) ***REMOVED***

        return (
            tileIndex >= this.firstgid &&
            tileIndex < (this.firstgid + this.total)
        );

    ***REMOVED***,

    /**
    * Set the image associated with this Tileset and update the tile data.
    *
    * @method Phaser.Tileset#setImage
    * @public
    * @param ***REMOVED***Image***REMOVED*** image - The image that contains the tiles.
    */
    setImage: function (image) ***REMOVED***

        this.image = image;
        this.updateTileData(image.width, image.height);
       
    ***REMOVED***,

    /**
    * Sets tile spacing and margins.
    *
    * @method Phaser.Tileset#setSpacing
    * @public
    * @param ***REMOVED***integer***REMOVED*** [margin=0] - The margin around the tiles in the sheet (in pixels).
    * @param ***REMOVED***integer***REMOVED*** [spacing=0] - The spacing between the tiles in the sheet (in pixels).
    */
    setSpacing: function (margin, spacing) ***REMOVED***

        this.tileMargin = margin | 0;
        this.tileSpacing = spacing | 0;

        if (this.image)
        ***REMOVED***
            this.updateTileData(this.image.width, this.image.height);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Updates tile coordinates and tileset data.
    *
    * @method Phaser.Tileset#updateTileData
    * @private
    * @param ***REMOVED***integer***REMOVED*** imageWidth - The (expected) width of the image to slice.
    * @param ***REMOVED***integer***REMOVED*** imageHeight - The (expected) height of the image to slice.
    */
    updateTileData: function (imageWidth, imageHeight) ***REMOVED***

        // May be fractional values
        var rowCount = (imageHeight - this.tileMargin * 2 + this.tileSpacing) / (this.tileHeight + this.tileSpacing);
        var colCount = (imageWidth - this.tileMargin * 2 + this.tileSpacing) / (this.tileWidth + this.tileSpacing);

        if (rowCount % 1 !== 0 || colCount % 1 !== 0)
        ***REMOVED***
            console.warn("Phaser.Tileset - " + this.name + " image tile area is not an even multiple of tile size");
        ***REMOVED***

        // In Tiled a tileset image that is not an even multiple of the tile dimensions
        // is truncated - hence the floor when calculating the rows/columns.
        rowCount = Math.floor(rowCount);
        colCount = Math.floor(colCount);

        if ((this.rows && this.rows !== rowCount) || (this.columns && this.columns !== colCount))
        ***REMOVED***
            console.warn("Phaser.Tileset - actual and expected number of tile rows and columns differ");
        ***REMOVED***

        this.rows = rowCount;
        this.columns = colCount;
        this.total = rowCount * colCount;

        this.drawCoords.length = 0;

        var tx = this.tileMargin;
        var ty = this.tileMargin;

        for (var y = 0; y < this.rows; y++)
        ***REMOVED***
            for (var x = 0; x < this.columns; x++)
            ***REMOVED***
                this.drawCoords.push(tx);
                this.drawCoords.push(ty);
                tx += this.tileWidth + this.tileSpacing;
            ***REMOVED***

            tx = this.tileMargin;
            ty += this.tileHeight + this.tileSpacing;
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

Phaser.Tileset.prototype.constructor = Phaser.Tileset;
