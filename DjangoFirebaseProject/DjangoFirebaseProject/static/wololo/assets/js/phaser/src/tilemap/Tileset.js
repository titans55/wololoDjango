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
