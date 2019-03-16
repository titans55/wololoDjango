/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Ninja Physics. The Ninja Physics system was created in Flash by Metanet Software and ported to JavaScript by Richard Davey.
*
* It allows for AABB and Circle to Tile collision. Tiles can be any of 34 different types, including slopes, convex and concave shapes.
*
* It does what it does very well, but is ripe for expansion and optimisation. Here are some features that I'd love to see the community add:
*
* * AABB to AABB collision
* * AABB to Circle collision
* * AABB and Circle 'immovable' property support
* * n-way collision, so an AABB/Circle could pass through a tile from below and land upon it.
* * QuadTree or spatial grid for faster Body vs. Tile Group look-ups.
* * Optimise the internal vector math and reduce the quantity of temporary vars created.
* * Expand Gravity and Bounce to allow for separate x/y axis values.
* * Support Bodies linked to Sprites that don't have anchor set to 0.5
*
* Feel free to attempt any of the above and submit a Pull Request with your code! Be sure to include test cases proving they work.
*
* @class Phaser.Physics.Ninja
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - reference to the current game instance.
*/
Phaser.Physics.Ninja = function (game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***Phaser.Time***REMOVED*** time - Local reference to game.time.
    */
    this.time = this.game.time;

    /**
    * @property ***REMOVED***number***REMOVED*** gravity - The World gravity setting.
    */
    this.gravity = 0.2;

    /**
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** bounds - The bounds inside of which the physics world exists. Defaults to match the world bounds.
    */
    this.bounds = new Phaser.Rectangle(0, 0, game.world.width, game.world.height);

    /**
    * @property ***REMOVED***number***REMOVED*** maxObjects - Used by the QuadTree to set the maximum number of objects per quad.
    */
    this.maxObjects = 10;

    /**
    * @property ***REMOVED***number***REMOVED*** maxLevels - Used by the QuadTree to set the maximum number of iteration levels.
    */
    this.maxLevels = 4;

    /**
    * @property ***REMOVED***Phaser.QuadTree***REMOVED*** quadTree - The world QuadTree.
    */
    this.quadTree = new Phaser.QuadTree(this.game.world.bounds.x, this.game.world.bounds.y, this.game.world.bounds.width, this.game.world.bounds.height, this.maxObjects, this.maxLevels);

    // By default we want the bounds the same size as the world bounds
    this.setBoundsToWorld();

***REMOVED***;

Phaser.Physics.Ninja.prototype.constructor = Phaser.Physics.Ninja;

Phaser.Physics.Ninja.prototype = ***REMOVED***

    /**
    * This will create a Ninja Physics AABB body on the given game object. Its dimensions will match the width and height of the object at the point it is created.
    * A game object can only have 1 physics body active at any one time, and it can't be changed until the object is destroyed.
    *
    * @method Phaser.Physics.Ninja#enableAABB
    * @param ***REMOVED***object|array|Phaser.Group***REMOVED*** object - The game object to create the physics body on. Can also be an array or Group of objects, a body will be created on every child that has a `body` property.
    * @param ***REMOVED***boolean***REMOVED*** [children=true] - Should a body be created on all children of this object? If true it will recurse down the display list as far as it can go.
    */
    enableAABB: function (object, children) ***REMOVED***

        this.enable(object, 1, 0, 0, children);

    ***REMOVED***,

    /**
    * This will create a Ninja Physics Circle body on the given game object.
    * A game object can only have 1 physics body active at any one time, and it can't be changed until the object is destroyed.
    *
    * @method Phaser.Physics.Ninja#enableCircle
    * @param ***REMOVED***object|array|Phaser.Group***REMOVED*** object - The game object to create the physics body on. Can also be an array or Group of objects, a body will be created on every child that has a `body` property.
    * @param ***REMOVED***number***REMOVED*** radius - The radius of the Circle.
    * @param ***REMOVED***boolean***REMOVED*** [children=true] - Should a body be created on all children of this object? If true it will recurse down the display list as far as it can go.
    */
    enableCircle: function (object, radius, children) ***REMOVED***

        this.enable(object, 2, 0, radius, children);

    ***REMOVED***,

    /**
    * This will create a Ninja Physics Tile body on the given game object. There are 34 different types of tile you can create, including 45 degree slopes,
    * convex and concave circles and more. The id parameter controls which Tile type is created, but you can also change it at run-time.
    * Note that for all degree based tile types they need to have an equal width and height. If the given object doesn't have equal width and height it will use the width.
    * A game object can only have 1 physics body active at any one time, and it can't be changed until the object is destroyed.
    *
    * @method Phaser.Physics.Ninja#enableTile
    * @param ***REMOVED***object|array|Phaser.Group***REMOVED*** object - The game object to create the physics body on. Can also be an array or Group of objects, a body will be created on every child that has a `body` property.
    * @param ***REMOVED***number***REMOVED*** [id=1] - The type of Tile this will use, i.e. Phaser.Physics.Ninja.Tile.SLOPE_45DEGpn, Phaser.Physics.Ninja.Tile.CONVEXpp, etc.
    * @param ***REMOVED***boolean***REMOVED*** [children=true] - Should a body be created on all children of this object? If true it will recurse down the display list as far as it can go.
    */
    enableTile: function (object, id, children) ***REMOVED***

        this.enable(object, 3, id, 0, children);

    ***REMOVED***,

    /**
    * This will create a Ninja Physics body on the given game object or array of game objects.
    * A game object can only have 1 physics body active at any one time, and it can't be changed until the object is destroyed.
    *
    * @method Phaser.Physics.Ninja#enable
    * @param ***REMOVED***object|array|Phaser.Group***REMOVED*** object - The game object to create the physics body on. Can also be an array or Group of objects, a body will be created on every child that has a `body` property.
    * @param ***REMOVED***number***REMOVED*** [type=1] - The type of Ninja shape to create. 1 = AABB, 2 = Circle or 3 = Tile.
    * @param ***REMOVED***number***REMOVED*** [id=1] - If this body is using a Tile shape, you can set the Tile id here, i.e. Phaser.Physics.Ninja.Tile.SLOPE_45DEGpn, Phaser.Physics.Ninja.Tile.CONVEXpp, etc.
    * @param ***REMOVED***number***REMOVED*** [radius=0] - If this body is using a Circle shape this controls the radius.
    * @param ***REMOVED***boolean***REMOVED*** [children=true] - Should a body be created on all children of this object? If true it will recurse down the display list as far as it can go.
    */
    enable: function (object, type, id, radius, children) ***REMOVED***

        if (type === undefined) ***REMOVED*** type = 1; ***REMOVED***
        if (id === undefined) ***REMOVED*** id = 1; ***REMOVED***
        if (radius === undefined) ***REMOVED*** radius = 0; ***REMOVED***
        if (children === undefined) ***REMOVED*** children = true; ***REMOVED***

        if (Array.isArray(object))
        ***REMOVED***
            var i = object.length;

            while (i--)
            ***REMOVED***
                if (object[i] instanceof Phaser.Group)
                ***REMOVED***
                    //  If it's a Group then we do it on the children regardless
                    this.enable(object[i].children, type, id, radius, children);
                ***REMOVED***
                else
                ***REMOVED***
                    this.enableBody(object[i], type, id, radius);

                    if (children && object[i].hasOwnProperty('children') && object[i].children.length > 0)
                    ***REMOVED***
                        this.enable(object[i], type, id, radius, true);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (object instanceof Phaser.Group)
            ***REMOVED***
                //  If it's a Group then we do it on the children regardless
                this.enable(object.children, type, id, radius, children);
            ***REMOVED***
            else
            ***REMOVED***
                this.enableBody(object, type, id, radius);

                if (children && object.hasOwnProperty('children') && object.children.length > 0)
                ***REMOVED***
                    this.enable(object.children, type, id, radius, true);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Creates a Ninja Physics body on the given game object.
    * A game object can only have 1 physics body active at any one time, and it can't be changed until the body is nulled.
    *
    * @method Phaser.Physics.Ninja#enableBody
    * @param ***REMOVED***object***REMOVED*** object - The game object to create the physics body on. A body will only be created if this object has a null `body` property.
    */
    enableBody: function (object, type, id, radius) ***REMOVED***

        if (object.hasOwnProperty('body') && object.body === null)
        ***REMOVED***
            object.body = new Phaser.Physics.Ninja.Body(this, object, type, id, radius);
            object.anchor.set(0.5);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Updates the size of this physics world.
    *
    * @method Phaser.Physics.Ninja#setBounds
    * @param ***REMOVED***number***REMOVED*** x - Top left most corner of the world.
    * @param ***REMOVED***number***REMOVED*** y - Top left most corner of the world.
    * @param ***REMOVED***number***REMOVED*** width - New width of the world. Can never be smaller than the Game.width.
    * @param ***REMOVED***number***REMOVED*** height - New height of the world. Can never be smaller than the Game.height.
    */
    setBounds: function (x, y, width, height) ***REMOVED***

        this.bounds.setTo(x, y, width, height);

    ***REMOVED***,

    /**
    * Updates the size of this physics world to match the size of the game world.
    *
    * @method Phaser.Physics.Ninja#setBoundsToWorld
    */
    setBoundsToWorld: function () ***REMOVED***

        this.bounds.setTo(this.game.world.bounds.x, this.game.world.bounds.y, this.game.world.bounds.width, this.game.world.bounds.height);

    ***REMOVED***,

    /**
    * Clears all physics bodies from the given TilemapLayer that were created with `World.convertTilemap`.
    *
    * @method Phaser.Physics.Ninja#clearTilemapLayerBodies
    * @param ***REMOVED***Phaser.Tilemap***REMOVED*** map - The Tilemap to get the map data from.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** [layer] - The layer to operate on. If not given will default to map.currentLayer.
    */
    clearTilemapLayerBodies: function (map, layer) ***REMOVED***

        layer = map.getLayer(layer);

        var i = map.layers[layer].bodies.length;

        while (i--)
        ***REMOVED***
            map.layers[layer].bodies[i].destroy();
        ***REMOVED***

        map.layers[layer].bodies.length = [];

    ***REMOVED***,

    /**
    * Goes through all tiles in the given Tilemap and TilemapLayer and converts those set to collide into physics tiles.
    * Only call this *after* you have specified all of the tiles you wish to collide with calls like Tilemap.setCollisionBetween, etc.
    * Every time you call this method it will destroy any previously created bodies and remove them from the world.
    * Therefore understand it's a very expensive operation and not to be done in a core game update loop.
    *
    * In Ninja the Tiles have an ID from 0 to 33, where 0 is 'empty', 1 is a full tile, 2 is a 45-degree slope, etc. You can find the ID
    * list either at the very bottom of `Tile.js`, or in a handy visual reference in the `resources/Ninja Physics Debug Tiles` folder in the repository.
    * The slopeMap parameter is an array that controls how the indexes of the tiles in your tilemap data will map to the Ninja Tile IDs.
    * For example if you had 6 tiles in your tileset: Imagine the first 4 should be converted into fully solid Tiles and the other 2 are 45-degree slopes.
    * Your slopeMap array would look like this: `[ 1, 1, 1, 1, 2, 3 ]`.
    * Where each element of the array is a tile in your tilemap and the resulting Ninja Tile it should create.
    *
    * @method Phaser.Physics.Ninja#convertTilemap
    * @param ***REMOVED***Phaser.Tilemap***REMOVED*** map - The Tilemap to get the map data from.
    * @param ***REMOVED***number|string|Phaser.TilemapLayer***REMOVED*** layer - The layer to operate on. If not given will default to map.currentLayer.
    * @param ***REMOVED***object***REMOVED*** slopeMap - The tilemap index to Tile ID map.
    * @return ***REMOVED***array***REMOVED*** An array of the Phaser.Physics.Ninja.Tile objects that were created.
    */
    convertTilemap: function (map, layer, slopeMap) ***REMOVED***

        layer = map.getLayer(layer);

        //  If the bodies array is already populated we need to nuke it
        this.clearTilemapLayerBodies(map, layer);

        for (var y = 0, h = map.layers[layer].height; y < h; y++)
        ***REMOVED***
            for (var x = 0, w = map.layers[layer].width; x < w; x++)
            ***REMOVED***
                var tile = map.layers[layer].data[y][x];

                if (tile && slopeMap.hasOwnProperty(tile.index))
                ***REMOVED***
                    var body = new Phaser.Physics.Ninja.Body(this, null, 3, slopeMap[tile.index], 0, tile.worldX + tile.centerX, tile.worldY + tile.centerY, tile.width, tile.height);

                    map.layers[layer].bodies.push(body);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return map.layers[layer].bodies;

    ***REMOVED***,

    /**
    * Checks for overlaps between two game objects. The objects can be Sprites, Groups or Emitters.
    * You can perform Sprite vs. Sprite, Sprite vs. Group and Group vs. Group overlap checks.
    * Unlike collide the objects are NOT automatically separated or have any physics applied, they merely test for overlap results.
    * The second parameter can be an array of objects, of differing types.
    *
    * @method Phaser.Physics.Ninja#overlap
    * @param ***REMOVED***Phaser.Sprite|Phaser.Group|Phaser.Particles.Emitter***REMOVED*** object1 - The first object to check. Can be an instance of Phaser.Sprite, Phaser.Group or Phaser.Particles.Emitter.
    * @param ***REMOVED***Phaser.Sprite|Phaser.Group|Phaser.Particles.Emitter|array***REMOVED*** object2 - The second object or array of objects to check. Can be Phaser.Sprite, Phaser.Group or Phaser.Particles.Emitter.
    * @param ***REMOVED***function***REMOVED*** [overlapCallback=null] - An optional callback function that is called if the objects overlap. The two objects will be passed to this function in the same order in which you specified them.
    * @param ***REMOVED***function***REMOVED*** [processCallback=null] - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then overlapCallback will only be called if processCallback returns true.
    * @param ***REMOVED***object***REMOVED*** [callbackContext] - The context in which to run the callbacks.
    * @returns ***REMOVED***boolean***REMOVED*** True if an overlap occured otherwise false.
    */
    overlap: function (object1, object2, overlapCallback, processCallback, callbackContext) ***REMOVED***

        overlapCallback = overlapCallback || null;
        processCallback = processCallback || null;
        callbackContext = callbackContext || overlapCallback;

        this._result = false;
        this._total = 0;

        if (Array.isArray(object2))
        ***REMOVED***
            for (var i = 0,  len = object2.length; i < len; i++)
            ***REMOVED***
                this.collideHandler(object1, object2[i], overlapCallback, processCallback, callbackContext, true);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            this.collideHandler(object1, object2, overlapCallback, processCallback, callbackContext, true);
        ***REMOVED***

        return (this._total > 0);

    ***REMOVED***,

    /**
    * Checks for collision between two game objects. You can perform Sprite vs. Sprite, Sprite vs. Group, Group vs. Group, Sprite vs. Tilemap Layer or Group vs. Tilemap Layer collisions.
    * The second parameter can be an array of objects, of differing types.
    * The objects are also automatically separated. If you don't require separation then use ArcadePhysics.overlap instead.
    * An optional processCallback can be provided. If given this function will be called when two sprites are found to be colliding. It is called before any separation takes place,
    * giving you the chance to perform additional checks. If the function returns true then the collision and separation is carried out. If it returns false it is skipped.
    * The collideCallback is an optional function that is only called if two sprites collide. If a processCallback has been set then it needs to return true for collideCallback to be called.
    *
    * @method Phaser.Physics.Ninja#collide
    * @param ***REMOVED***Phaser.Sprite|Phaser.Group|Phaser.Particles.Emitter|Phaser.TilemapLayer***REMOVED*** object1 - The first object to check. Can be an instance of Phaser.Sprite, Phaser.Group, Phaser.Particles.Emitter, or Phaser.TilemapLayer.
    * @param ***REMOVED***Phaser.Sprite|Phaser.Group|Phaser.Particles.Emitter|Phaser.TilemapLayer|array***REMOVED*** object2 - The second object or array of objects to check. Can be Phaser.Sprite, Phaser.Group, Phaser.Particles.Emitter or Phaser.TilemapLayer.
    * @param ***REMOVED***function***REMOVED*** [collideCallback=null] - An optional callback function that is called if the objects collide. The two objects will be passed to this function in the same order in which you specified them.
    * @param ***REMOVED***function***REMOVED*** [processCallback=null] - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then collision will only happen if processCallback returns true. The two objects will be passed to this function in the same order in which you specified them.
    * @param ***REMOVED***object***REMOVED*** [callbackContext] - The context in which to run the callbacks.
    * @returns ***REMOVED***boolean***REMOVED*** True if a collision occured otherwise false.
    */
    collide: function (object1, object2, collideCallback, processCallback, callbackContext) ***REMOVED***

        collideCallback = collideCallback || null;
        processCallback = processCallback || null;
        callbackContext = callbackContext || collideCallback;

        this._result = false;
        this._total = 0;

        if (Array.isArray(object2))
        ***REMOVED***
            for (var i = 0,  len = object2.length; i < len; i++)
            ***REMOVED***
                this.collideHandler(object1, object2[i], collideCallback, processCallback, callbackContext, false);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            this.collideHandler(object1, object2, collideCallback, processCallback, callbackContext, false);
        ***REMOVED***

        return (this._total > 0);

    ***REMOVED***,

    /**
    * Internal collision handler.
    *
    * @method Phaser.Physics.Ninja#collideHandler
    * @private
    * @param ***REMOVED***Phaser.Sprite|Phaser.Group|Phaser.Particles.Emitter|Phaser.TilemapLayer***REMOVED*** object1 - The first object to check. Can be an instance of Phaser.Sprite, Phaser.Group, Phaser.Particles.Emitter, or Phaser.TilemapLayer.
    * @param ***REMOVED***Phaser.Sprite|Phaser.Group|Phaser.Particles.Emitter|Phaser.TilemapLayer***REMOVED*** object2 - The second object to check. Can be an instance of Phaser.Sprite, Phaser.Group, Phaser.Particles.Emitter or Phaser.TilemapLayer. Can also be an array of objects to check.
    * @param ***REMOVED***function***REMOVED*** collideCallback - An optional callback function that is called if the objects collide. The two objects will be passed to this function in the same order in which you specified them.
    * @param ***REMOVED***function***REMOVED*** processCallback - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then collision will only happen if processCallback returns true. The two objects will be passed to this function in the same order in which you specified them.
    * @param ***REMOVED***object***REMOVED*** callbackContext - The context in which to run the callbacks.
    * @param ***REMOVED***boolean***REMOVED*** overlapOnly - Just run an overlap or a full collision.
    */
    collideHandler: function (object1, object2, collideCallback, processCallback, callbackContext, overlapOnly) ***REMOVED***

        //  Only collide valid objects
        if (object2 === undefined && (object1.type === Phaser.GROUP || object1.type === Phaser.EMITTER))
        ***REMOVED***
            this.collideGroupVsSelf(object1, collideCallback, processCallback, callbackContext, overlapOnly);
            return;
        ***REMOVED***

        if (object1 && object2 && object1.exists && object2.exists)
        ***REMOVED***
            //  SPRITES
            if (object1.type === Phaser.SPRITE || object1.type === Phaser.TILESPRITE)
            ***REMOVED***
                if (object2.type === Phaser.SPRITE || object2.type === Phaser.TILESPRITE)
                ***REMOVED***
                    this.collideSpriteVsSprite(object1, object2, collideCallback, processCallback, callbackContext, overlapOnly);
                ***REMOVED***
                else if (object2.type === Phaser.GROUP || object2.type === Phaser.EMITTER)
                ***REMOVED***
                    this.collideSpriteVsGroup(object1, object2, collideCallback, processCallback, callbackContext, overlapOnly);
                ***REMOVED***
                else if (object2.type === Phaser.TILEMAPLAYER)
                ***REMOVED***
                    this.collideSpriteVsTilemapLayer(object1, object2, collideCallback, processCallback, callbackContext);
                ***REMOVED***
            ***REMOVED***
            //  GROUPS
            else if (object1.type === Phaser.GROUP)
            ***REMOVED***
                if (object2.type === Phaser.SPRITE || object2.type === Phaser.TILESPRITE)
                ***REMOVED***
                    this.collideSpriteVsGroup(object2, object1, collideCallback, processCallback, callbackContext, overlapOnly);
                ***REMOVED***
                else if (object2.type === Phaser.GROUP || object2.type === Phaser.EMITTER)
                ***REMOVED***
                    this.collideGroupVsGroup(object1, object2, collideCallback, processCallback, callbackContext, overlapOnly);
                ***REMOVED***
                else if (object2.type === Phaser.TILEMAPLAYER)
                ***REMOVED***
                    this.collideGroupVsTilemapLayer(object1, object2, collideCallback, processCallback, callbackContext);
                ***REMOVED***
            ***REMOVED***
            //  TILEMAP LAYERS
            else if (object1.type === Phaser.TILEMAPLAYER)
            ***REMOVED***
                if (object2.type === Phaser.SPRITE || object2.type === Phaser.TILESPRITE)
                ***REMOVED***
                    this.collideSpriteVsTilemapLayer(object2, object1, collideCallback, processCallback, callbackContext);
                ***REMOVED***
                else if (object2.type === Phaser.GROUP || object2.type === Phaser.EMITTER)
                ***REMOVED***
                    this.collideGroupVsTilemapLayer(object2, object1, collideCallback, processCallback, callbackContext);
                ***REMOVED***
            ***REMOVED***
            //  EMITTER
            else if (object1.type === Phaser.EMITTER)
            ***REMOVED***
                if (object2.type === Phaser.SPRITE || object2.type === Phaser.TILESPRITE)
                ***REMOVED***
                    this.collideSpriteVsGroup(object2, object1, collideCallback, processCallback, callbackContext, overlapOnly);
                ***REMOVED***
                else if (object2.type === Phaser.GROUP || object2.type === Phaser.EMITTER)
                ***REMOVED***
                    this.collideGroupVsGroup(object1, object2, collideCallback, processCallback, callbackContext, overlapOnly);
                ***REMOVED***
                else if (object2.type === Phaser.TILEMAPLAYER)
                ***REMOVED***
                    this.collideGroupVsTilemapLayer(object1, object2, collideCallback, processCallback, callbackContext);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * An internal function. Use Phaser.Physics.Ninja.collide instead.
    *
    * @method Phaser.Physics.Ninja#collideSpriteVsSprite
    * @private
    */
    collideSpriteVsSprite: function (sprite1, sprite2, collideCallback, processCallback, callbackContext, overlapOnly) ***REMOVED***

        if (this.separate(sprite1.body, sprite2.body, processCallback, callbackContext, overlapOnly))
        ***REMOVED***
            if (collideCallback)
            ***REMOVED***
                collideCallback.call(callbackContext, sprite1, sprite2);
            ***REMOVED***

            this._total++;
        ***REMOVED***

    ***REMOVED***,

    /**
    * An internal function. Use Phaser.Physics.Ninja.collide instead.
    *
    * @method Phaser.Physics.Ninja#collideSpriteVsGroup
    * @private
    */
    collideSpriteVsGroup: function (sprite, group, collideCallback, processCallback, callbackContext, overlapOnly) ***REMOVED***

        if (group.length === 0)
        ***REMOVED***
            return;
        ***REMOVED***

        //  What is the sprite colliding with in the quadtree?
        // this.quadTree.clear();

        // this.quadTree = new Phaser.QuadTree(this.game.world.bounds.x, this.game.world.bounds.y, this.game.world.bounds.width, this.game.world.bounds.height, this.maxObjects, this.maxLevels);

        // this.quadTree.populate(group);

        // this._potentials = this.quadTree.retrieve(sprite);

        for (var i = 0, len = group.children.length; i < len; i++)
        ***REMOVED***
            //  We have our potential suspects, are they in this group?
            if (group.children[i].exists && group.children[i].body && this.separate(sprite.body, group.children[i].body, processCallback, callbackContext, overlapOnly))
            ***REMOVED***
                if (collideCallback)
                ***REMOVED***
                    collideCallback.call(callbackContext, sprite, group.children[i]);
                ***REMOVED***

                this._total++;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * An internal function. Use Phaser.Physics.Ninja.collide instead.
    *
    * @method Phaser.Physics.Ninja#collideGroupVsSelf
    * @private
    */
    collideGroupVsSelf: function (group, collideCallback, processCallback, callbackContext, overlapOnly) ***REMOVED***

        if (group.length === 0)
        ***REMOVED***
            return;
        ***REMOVED***

        var len = group.children.length;

        for (var i = 0; i < len; i++)
        ***REMOVED***
            for (var j = i + 1; j <= len; j++)
            ***REMOVED***
                if (group.children[i] && group.children[j] && group.children[i].exists && group.children[j].exists)
                ***REMOVED***
                    this.collideSpriteVsSprite(group.children[i], group.children[j], collideCallback, processCallback, callbackContext, overlapOnly);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * An internal function. Use Phaser.Physics.Ninja.collide instead.
    *
    * @method Phaser.Physics.Ninja#collideGroupVsGroup
    * @private
    */
    collideGroupVsGroup: function (group1, group2, collideCallback, processCallback, callbackContext, overlapOnly) ***REMOVED***

        if (group1.length === 0 || group2.length === 0)
        ***REMOVED***
            return;
        ***REMOVED***

        for (var i = 0, len = group1.children.length; i < len; i++)
        ***REMOVED***
            if (group1.children[i].exists)
            ***REMOVED***
                this.collideSpriteVsGroup(group1.children[i], group2, collideCallback, processCallback, callbackContext, overlapOnly);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * The core separation function to separate two physics bodies.
    * @method Phaser.Physics.Ninja#separate
    * @param ***REMOVED***Phaser.Physics.Ninja.Body***REMOVED*** body1 - The Body object to separate.
    * @param ***REMOVED***Phaser.Physics.Ninja.Body***REMOVED*** body2 - The Body object to separate.
    * @returns ***REMOVED***boolean***REMOVED*** Returns true if the bodies collided, otherwise false.
    */
    separate: function (body1, body2) ***REMOVED***

        if (body1.type !== Phaser.Physics.NINJA || body2.type !== Phaser.Physics.NINJA)
        ***REMOVED***
            return false;
        ***REMOVED***

        if (body1.aabb && body2.aabb)
        ***REMOVED***
            return body1.aabb.collideAABBVsAABB(body2.aabb);
        ***REMOVED***

        if (body1.aabb && body2.tile)
        ***REMOVED***
            return body1.aabb.collideAABBVsTile(body2.tile);
        ***REMOVED***

        if (body1.tile && body2.aabb)
        ***REMOVED***
            return body2.aabb.collideAABBVsTile(body1.tile);
        ***REMOVED***

        if (body1.circle && body2.tile)
        ***REMOVED***
            return body1.circle.collideCircleVsTile(body2.tile);
        ***REMOVED***

        if (body1.tile && body2.circle)
        ***REMOVED***
            return body2.circle.collideCircleVsTile(body1.tile);
        ***REMOVED***

    ***REMOVED***

***REMOVED***;
