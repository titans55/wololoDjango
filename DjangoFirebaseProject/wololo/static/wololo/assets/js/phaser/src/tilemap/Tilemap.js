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
