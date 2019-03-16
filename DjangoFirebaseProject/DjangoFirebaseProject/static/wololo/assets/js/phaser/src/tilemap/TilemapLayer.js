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
