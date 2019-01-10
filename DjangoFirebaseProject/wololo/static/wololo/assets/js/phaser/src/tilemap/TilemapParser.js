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
