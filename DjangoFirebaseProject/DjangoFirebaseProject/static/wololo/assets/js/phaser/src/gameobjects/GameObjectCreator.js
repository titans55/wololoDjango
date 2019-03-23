/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The GameObjectCreator is a quick way to create common game objects _without_ adding them to the game world.
* The object creator can be accessed with ***REMOVED***@linkcode Phaser.Game#make `game.make`***REMOVED***.
*
* @class Phaser.GameObjectCreator
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
*/
Phaser.GameObjectCreator = function (game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running Game.
    * @protected
    */
    this.game = game;

    /**
    * @property ***REMOVED***Phaser.World***REMOVED*** world - A reference to the game world.
    * @protected
    */
    this.world = this.game.world;

***REMOVED***;

Phaser.GameObjectCreator.prototype = ***REMOVED***

    /**
    * Create a new Image object.
    *
    * An Image is a light-weight object you can use to display anything that doesn't need physics or animation.
    * It can still rotate, scale, crop and receive input events. This makes it perfect for logos, backgrounds, simple buttons and other non-Sprite graphics.
    *
    * @method Phaser.GameObjectCreator#image
    * @param ***REMOVED***number***REMOVED*** x - X position of the image.
    * @param ***REMOVED***number***REMOVED*** y - Y position of the image.
    * @param ***REMOVED***string|Phaser.RenderTexture|PIXI.Texture***REMOVED*** key - This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
    * @param ***REMOVED***string|number***REMOVED*** [frame] - If the sprite uses an image from a texture atlas or sprite sheet you can pass the frame here. Either a number for a frame ID or a string for a frame name.
    * @returns ***REMOVED***Phaser.Image***REMOVED*** the newly created sprite object.
    */
    image: function (x, y, key, frame) ***REMOVED***

        return new Phaser.Image(this.game, x, y, key, frame);

    ***REMOVED***,

    /**
    * Create a new Sprite with specific position and sprite sheet key.
    *
    * @method Phaser.GameObjectCreator#sprite
    * @param ***REMOVED***number***REMOVED*** x - X position of the new sprite.
    * @param ***REMOVED***number***REMOVED*** y - Y position of the new sprite.
    * @param ***REMOVED***string|Phaser.RenderTexture|PIXI.Texture***REMOVED*** key - This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
    * @param ***REMOVED***string|number***REMOVED*** [frame] - If the sprite uses an image from a texture atlas or sprite sheet you can pass the frame here. Either a number for a frame ID or a string for a frame name.
    * @returns ***REMOVED***Phaser.Sprite***REMOVED*** the newly created sprite object.
    */
    sprite: function (x, y, key, frame) ***REMOVED***

        return new Phaser.Sprite(this.game, x, y, key, frame);

    ***REMOVED***,

    /**
    * Create a tween object for a specific object.
    *
    * The object can be any JavaScript object or Phaser object such as Sprite.
    *
    * @method Phaser.GameObjectCreator#tween
    * @param ***REMOVED***object***REMOVED*** obj - Object the tween will be run on.
    * @return ***REMOVED***Phaser.Tween***REMOVED*** The Tween object.
    */
    tween: function (obj) ***REMOVED***

        return new Phaser.Tween(obj, this.game, this.game.tweens);

    ***REMOVED***,

    /**
    * A Group is a container for display objects that allows for fast pooling, recycling and collision checks.
    *
    * @method Phaser.GameObjectCreator#group
    * @param ***REMOVED***any***REMOVED*** parent - The parent Group or DisplayObjectContainer that will hold this group, if any.
    * @param ***REMOVED***string***REMOVED*** [name='group'] - A name for this Group. Not used internally but useful for debugging.
    * @param ***REMOVED***boolean***REMOVED*** [addToStage=false] - If set to true this Group will be added directly to the Game.Stage instead of Game.World.
    * @param ***REMOVED***boolean***REMOVED*** [enableBody=false] - If true all Sprites created with `Group.create` or `Group.createMulitple` will have a physics body created on them. Change the body type with physicsBodyType.
    * @param ***REMOVED***number***REMOVED*** [physicsBodyType=0] - If enableBody is true this is the type of physics body that is created on new Sprites. Phaser.Physics.ARCADE, Phaser.Physics.P2, Phaser.Physics.NINJA, etc.
    * @return ***REMOVED***Phaser.Group***REMOVED*** The newly created Group.
    */
    group: function (parent, name, addToStage, enableBody, physicsBodyType) ***REMOVED***

        return new Phaser.Group(this.game, parent, name, addToStage, enableBody, physicsBodyType);

    ***REMOVED***,

    /**
    * Create a new SpriteBatch.
    *
    * @method Phaser.GameObjectCreator#spriteBatch
    * @param ***REMOVED***any***REMOVED*** parent - The parent Group or DisplayObjectContainer that will hold this group, if any.
    * @param ***REMOVED***string***REMOVED*** [name='group'] - A name for this Group. Not used internally but useful for debugging.
    * @param ***REMOVED***boolean***REMOVED*** [addToStage=false] - If set to true this Group will be added directly to the Game.Stage instead of Game.World.
    * @return ***REMOVED***Phaser.SpriteBatch***REMOVED*** The newly created group.
    */
    spriteBatch: function (parent, name, addToStage) ***REMOVED***

        if (name === undefined) ***REMOVED*** name = 'group'; ***REMOVED***
        if (addToStage === undefined) ***REMOVED*** addToStage = false; ***REMOVED***

        return new Phaser.SpriteBatch(this.game, parent, name, addToStage);

    ***REMOVED***,

    /**
    * Creates a new Sound object.
    *
    * @method Phaser.GameObjectCreator#audio
    * @param ***REMOVED***string***REMOVED*** key - The Game.cache key of the sound that this object will use.
    * @param ***REMOVED***number***REMOVED*** [volume=1] - The volume at which the sound will be played.
    * @param ***REMOVED***boolean***REMOVED*** [loop=false] - Whether or not the sound will loop.
    * @param ***REMOVED***boolean***REMOVED*** [connect=true] - Controls if the created Sound object will connect to the master gainNode of the SoundManager when running under WebAudio.
    * @return ***REMOVED***Phaser.Sound***REMOVED*** The newly created text object.
    */
    audio: function (key, volume, loop, connect) ***REMOVED***

        return this.game.sound.add(key, volume, loop, connect);

    ***REMOVED***,

    /**
     * Creates a new AudioSprite object.
     *
     * @method Phaser.GameObjectCreator#audioSprite
     * @param ***REMOVED***string***REMOVED*** key - The Game.cache key of the sound that this object will use.
     * @return ***REMOVED***Phaser.AudioSprite***REMOVED*** The newly created AudioSprite object.
     */
    audioSprite: function (key) ***REMOVED***

        return this.game.sound.addSprite(key);

    ***REMOVED***,

    /**
    * Creates a new Sound object.
    *
    * @method Phaser.GameObjectCreator#sound
    * @param ***REMOVED***string***REMOVED*** key - The Game.cache key of the sound that this object will use.
    * @param ***REMOVED***number***REMOVED*** [volume=1] - The volume at which the sound will be played.
    * @param ***REMOVED***boolean***REMOVED*** [loop=false] - Whether or not the sound will loop.
    * @param ***REMOVED***boolean***REMOVED*** [connect=true] - Controls if the created Sound object will connect to the master gainNode of the SoundManager when running under WebAudio.
    * @return ***REMOVED***Phaser.Sound***REMOVED*** The newly created text object.
    */
    sound: function (key, volume, loop, connect) ***REMOVED***

        return this.game.sound.add(key, volume, loop, connect);

    ***REMOVED***,

    /**
    * Creates a new TileSprite object.
    *
    * @method Phaser.GameObjectCreator#tileSprite
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate (in world space) to position the TileSprite at.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate (in world space) to position the TileSprite at.
    * @param ***REMOVED***number***REMOVED*** width - The width of the TileSprite.
    * @param ***REMOVED***number***REMOVED*** height - The height of the TileSprite.
    * @param ***REMOVED***string|Phaser.BitmapData|PIXI.Texture***REMOVED*** key - This is the image or texture used by the TileSprite during rendering. It can be a string which is a reference to the Phaser Image Cache entry, or an instance of a PIXI.Texture or BitmapData.
    * @param ***REMOVED***string|number***REMOVED*** frame - If this TileSprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
    * @return ***REMOVED***Phaser.TileSprite***REMOVED*** The newly created tileSprite object.
    */
    tileSprite: function (x, y, width, height, key, frame) ***REMOVED***

        return new Phaser.TileSprite(this.game, x, y, width, height, key, frame);

    ***REMOVED***,

    /**
    * Creates a new Rope object.
    *
    * @method Phaser.GameObjectCreator#rope
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate (in world space) to position the Rope at.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate (in world space) to position the Rope at.
    * @param ***REMOVED***number***REMOVED*** width - The width of the Rope.
    * @param ***REMOVED***number***REMOVED*** height - The height of the Rope.
    * @param ***REMOVED***string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture***REMOVED*** key - This is the image or texture used by the TileSprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
    * @param ***REMOVED***string|number***REMOVED*** frame - If this Rope is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
    * @return ***REMOVED***Phaser.Rope***REMOVED*** The newly created rope object.
    */
    rope: function (x, y, key, frame, points) ***REMOVED***

        return new Phaser.Rope(this.game, x, y, key, frame, points);

    ***REMOVED***,

    /**
    * Creates a new Text object.
    *
    * @method Phaser.GameObjectCreator#text
    * @param ***REMOVED***number***REMOVED*** x - X position of the new text object.
    * @param ***REMOVED***number***REMOVED*** y - Y position of the new text object.
    * @param ***REMOVED***string***REMOVED*** text - The actual text that will be written.
    * @param ***REMOVED***object***REMOVED*** style - The style object containing style attributes like font, font size , etc.
    * @return ***REMOVED***Phaser.Text***REMOVED*** The newly created text object.
    */
    text: function (x, y, text, style) ***REMOVED***

        return new Phaser.Text(this.game, x, y, text, style);

    ***REMOVED***,

    /**
    * Creates a new Button object.
    *
    * @method Phaser.GameObjectCreator#button
    * @param ***REMOVED***number***REMOVED*** [x] X position of the new button object.
    * @param ***REMOVED***number***REMOVED*** [y] Y position of the new button object.
    * @param ***REMOVED***string***REMOVED*** [key] The image key as defined in the Game.Cache to use as the texture for this button.
    * @param ***REMOVED***function***REMOVED*** [callback] The function to call when this button is pressed
    * @param ***REMOVED***object***REMOVED*** [callbackContext] The context in which the callback will be called (usually 'this')
    * @param ***REMOVED***string|number***REMOVED*** [overFrame] This is the frame or frameName that will be set when this button is in an over state. Give either a number to use a frame ID or a string for a frame name.
    * @param ***REMOVED***string|number***REMOVED*** [outFrame] This is the frame or frameName that will be set when this button is in an out state. Give either a number to use a frame ID or a string for a frame name.
    * @param ***REMOVED***string|number***REMOVED*** [downFrame] This is the frame or frameName that will be set when this button is in a down state. Give either a number to use a frame ID or a string for a frame name.
    * @param ***REMOVED***string|number***REMOVED*** [upFrame] This is the frame or frameName that will be set when this button is in an up state. Give either a number to use a frame ID or a string for a frame name.
    * @return ***REMOVED***Phaser.Button***REMOVED*** The newly created button object.
    */
    button: function (x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) ***REMOVED***

        return new Phaser.Button(this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

    ***REMOVED***,

    /**
    * Creates a new Graphics object.
    *
    * @method Phaser.GameObjectCreator#graphics
    * @param ***REMOVED***number***REMOVED*** [x=0] - X position of the new graphics object.
    * @param ***REMOVED***number***REMOVED*** [y=0] - Y position of the new graphics object.
    * @return ***REMOVED***Phaser.Graphics***REMOVED*** The newly created graphics object.
    */
    graphics: function (x, y) ***REMOVED***

        return new Phaser.Graphics(this.game, x, y);

    ***REMOVED***,

    /**
    * Creat a new Emitter.
    *
    * An Emitter is a lightweight particle emitter. It can be used for one-time explosions or for
    * continuous effects like rain and fire. All it really does is launch Particle objects out
    * at set intervals, and fixes their positions and velocities accorindgly.
    *
    * @method Phaser.GameObjectCreator#emitter
    * @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate within the Emitter that the particles are emitted from.
    * @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate within the Emitter that the particles are emitted from.
    * @param ***REMOVED***number***REMOVED*** [maxParticles=50] - The total number of particles in this emitter.
    * @return ***REMOVED***Phaser.Emitter***REMOVED*** The newly created emitter object.
    */
    emitter: function (x, y, maxParticles) ***REMOVED***

        return new Phaser.Particles.Arcade.Emitter(this.game, x, y, maxParticles);

    ***REMOVED***,

    /**
    * Create a new RetroFont object.
    *
    * A RetroFont can be used as a texture for an Image or Sprite and optionally add it to the Cache.
    * A RetroFont uses a bitmap which contains fixed with characters for the font set. You use character spacing to define the set.
    * If you need variable width character support then use a BitmapText object instead. The main difference between a RetroFont and a BitmapText
    * is that a RetroFont creates a single texture that you can apply to a game object, where-as a BitmapText creates one Sprite object per letter of text.
    * The texture can be asssigned or one or multiple images/sprites, but note that the text the RetroFont uses will be shared across them all,
    * i.e. if you need each Image to have different text in it, then you need to create multiple RetroFont objects.
    *
    * @method Phaser.GameObjectCreator#retroFont
    * @param ***REMOVED***string***REMOVED*** font - The key of the image in the Game.Cache that the RetroFont will use.
    * @param ***REMOVED***number***REMOVED*** characterWidth - The width of each character in the font set.
    * @param ***REMOVED***number***REMOVED*** characterHeight - The height of each character in the font set.
    * @param ***REMOVED***string***REMOVED*** chars - The characters used in the font set, in display order. You can use the TEXT_SET consts for common font set arrangements.
    * @param ***REMOVED***number***REMOVED*** charsPerRow - The number of characters per row in the font set.
    * @param ***REMOVED***number***REMOVED*** [xSpacing=0] - If the characters in the font set have horizontal spacing between them set the required amount here.
    * @param ***REMOVED***number***REMOVED*** [ySpacing=0] - If the characters in the font set have vertical spacing between them set the required amount here.
    * @param ***REMOVED***number***REMOVED*** [xOffset=0] - If the font set doesn't start at the top left of the given image, specify the X coordinate offset here.
    * @param ***REMOVED***number***REMOVED*** [yOffset=0] - If the font set doesn't start at the top left of the given image, specify the Y coordinate offset here.
    * @return ***REMOVED***Phaser.RetroFont***REMOVED*** The newly created RetroFont texture which can be applied to an Image or Sprite.
    */
    retroFont: function (font, characterWidth, characterHeight, chars, charsPerRow, xSpacing, ySpacing, xOffset, yOffset) ***REMOVED***

        return new Phaser.RetroFont(this.game, font, characterWidth, characterHeight, chars, charsPerRow, xSpacing, ySpacing, xOffset, yOffset);

    ***REMOVED***,

    /**
    * Create a new BitmapText object.
    *
    * BitmapText objects work by taking a texture file and an XML file that describes the font structure.
    * It then generates a new Sprite object for each letter of the text, proportionally spaced out and aligned to 
    * match the font structure.
    * 
    * BitmapText objects are less flexible than Text objects, in that they have less features such as shadows, fills and the ability 
    * to use Web Fonts. However you trade this flexibility for pure rendering speed. You can also create visually compelling BitmapTexts by 
    * processing the font texture in an image editor first, applying fills and any other effects required.
    *
    * To create multi-line text insert \r, \n or \r\n escape codes into the text string.
    *
    * To create a BitmapText data files you can use:
    *
    * BMFont (Windows, free): http://www.angelcode.com/products/bmfont/
    * Glyph Designer (OS X, commercial): http://www.71squared.com/en/glyphdesigner
    * Littera (Web-based, free): http://kvazars.com/littera/
    *
    * @method Phaser.GameObjectCreator#bitmapText
    * @param ***REMOVED***number***REMOVED*** x - X coordinate to display the BitmapText object at.
    * @param ***REMOVED***number***REMOVED*** y - Y coordinate to display the BitmapText object at.
    * @param ***REMOVED***string***REMOVED*** font - The key of the BitmapText as stored in Phaser.Cache.
    * @param ***REMOVED***string***REMOVED*** [text=''] - The text that will be rendered. This can also be set later via BitmapText.text.
    * @param ***REMOVED***number***REMOVED*** [size=32] - The size the font will be rendered at in pixels.
    * @param ***REMOVED***string***REMOVED*** [align='left'] - The alignment of multi-line text. Has no effect if there is only one line of text.
    * @return ***REMOVED***Phaser.BitmapText***REMOVED*** The newly created bitmapText object.
    */
    bitmapText: function (x, y, font, text, size, align) ***REMOVED***

        return new Phaser.BitmapText(this.game, x, y, font, text, size, align);

    ***REMOVED***,

    /**
    * Creates a new Phaser.Tilemap object.
    *
    * The map can either be populated with data from a Tiled JSON file or from a CSV file.
    * To do this pass the Cache key as the first parameter. When using Tiled data you need only provide the key.
    * When using CSV data you must provide the key and the tileWidth and tileHeight parameters.
    * If creating a blank tilemap to be populated later, you can either specify no parameters at all and then use `Tilemap.create` or pass the map and tile dimensions here.
    * Note that all Tilemaps use a base tile size to calculate dimensions from, but that a TilemapLayer may have its own unique tile size that overrides it.
    *
    * @method Phaser.GameObjectCreator#tilemap
    * @param ***REMOVED***string***REMOVED*** [key] - The key of the tilemap data as stored in the Cache. If you're creating a blank map either leave this parameter out or pass `null`.
    * @param ***REMOVED***number***REMOVED*** [tileWidth=32] - The pixel width of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
    * @param ***REMOVED***number***REMOVED*** [tileHeight=32] - The pixel height of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
    * @param ***REMOVED***number***REMOVED*** [width=10] - The width of the map in tiles. If this map is created from Tiled or CSV data you don't need to specify this.
    * @param ***REMOVED***number***REMOVED*** [height=10] - The height of the map in tiles. If this map is created from Tiled or CSV data you don't need to specify this.
    */
    tilemap: function (key, tileWidth, tileHeight, width, height) ***REMOVED***

        return new Phaser.Tilemap(this.game, key, tileWidth, tileHeight, width, height);

    ***REMOVED***,

    /**
    * A dynamic initially blank canvas to which images can be drawn.
    *
    * @method Phaser.GameObjectCreator#renderTexture
    * @param ***REMOVED***number***REMOVED*** [width=100] - the width of the RenderTexture.
    * @param ***REMOVED***number***REMOVED*** [height=100] - the height of the RenderTexture.
    * @param ***REMOVED***string***REMOVED*** [key=''] - Asset key for the RenderTexture when stored in the Cache (see addToCache parameter).
    * @param ***REMOVED***boolean***REMOVED*** [addToCache=false] - Should this RenderTexture be added to the Game.Cache? If so you can retrieve it with Cache.getTexture(key)
    * @return ***REMOVED***Phaser.RenderTexture***REMOVED*** The newly created RenderTexture object.
    */
    renderTexture: function (width, height, key, addToCache) ***REMOVED***

        if (key === undefined || key === '') ***REMOVED*** key = this.game.rnd.uuid(); ***REMOVED***
        if (addToCache === undefined) ***REMOVED*** addToCache = false; ***REMOVED***

        var texture = new Phaser.RenderTexture(this.game, width, height, key);

        if (addToCache)
        ***REMOVED***
            this.game.cache.addRenderTexture(key, texture);
        ***REMOVED***

        return texture;

    ***REMOVED***,

    /**
    * Create a BitmpaData object.
    *
    * A BitmapData object can be manipulated and drawn to like a traditional Canvas object and used to texture Sprites.
    *
    * @method Phaser.GameObjectCreator#bitmapData
    * @param ***REMOVED***number***REMOVED*** [width=256] - The width of the BitmapData in pixels.
    * @param ***REMOVED***number***REMOVED*** [height=256] - The height of the BitmapData in pixels.
    * @param ***REMOVED***string***REMOVED*** [key=''] - Asset key for the BitmapData when stored in the Cache (see addToCache parameter).
    * @param ***REMOVED***boolean***REMOVED*** [addToCache=false] - Should this BitmapData be added to the Game.Cache? If so you can retrieve it with Cache.getBitmapData(key)
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** The newly created BitmapData object.
    */
    bitmapData: function (width, height, key, addToCache) ***REMOVED***

        if (addToCache === undefined) ***REMOVED*** addToCache = false; ***REMOVED***
        if (key === undefined || key === '') ***REMOVED*** key = this.game.rnd.uuid(); ***REMOVED***

        var texture = new Phaser.BitmapData(this.game, key, width, height);

        if (addToCache)
        ***REMOVED***
            this.game.cache.addBitmapData(key, texture);
        ***REMOVED***

        return texture;

    ***REMOVED***,

    /**
    * A WebGL shader/filter that can be applied to Sprites.
    *
    * @method Phaser.GameObjectCreator#filter
    * @param ***REMOVED***string***REMOVED*** filter - The name of the filter you wish to create, for example HueRotate or SineWave.
    * @param ***REMOVED***any***REMOVED*** - Whatever parameters are needed to be passed to the filter init function.
    * @return ***REMOVED***Phaser.Filter***REMOVED*** The newly created Phaser.Filter object.
    */
    filter: function (filter) ***REMOVED***

        var args = Array.prototype.slice.call(arguments, 1);

        var filter = new Phaser.Filter[filter](this.game);

        filter.init.apply(filter, args);

        return filter;

    ***REMOVED***

***REMOVED***;

Phaser.GameObjectCreator.prototype.constructor = Phaser.GameObjectCreator;
