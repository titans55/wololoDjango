/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The GameObjectFactory is a quick way to create many common game objects
* using ***REMOVED***@linkcode Phaser.Game#add `game.add`***REMOVED***.
*
* Created objects are _automatically added_ to the appropriate Manager, World, or manually specified parent Group.
*
* @class Phaser.GameObjectFactory
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
*/
Phaser.GameObjectFactory = function (game) ***REMOVED***

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

Phaser.GameObjectFactory.prototype = ***REMOVED***

    /**
    * Adds an existing display object to the game world.
    * 
    * @method Phaser.GameObjectFactory#existing
    * @param ***REMOVED***any***REMOVED*** object - An instance of Phaser.Sprite, Phaser.Button or any other display object.
    * @return ***REMOVED***any***REMOVED*** The child that was added to the World.
    */
    existing: function (object) ***REMOVED***

        return this.world.add(object);

    ***REMOVED***,

    /**
    * Weapons provide the ability to easily create a bullet pool and manager.
    *
    * Weapons fire Phaser.Bullet objects, which are essentially Sprites with a few extra properties.
    * The Bullets are enabled for Arcade Physics. They do not currently work with P2 Physics.
    *
    * The Bullets are created inside of `Weapon.bullets`, which is a Phaser.Group instance. Anything you
    * can usually do with a Group, such as move it around the display list, iterate it, etc can be done
    * to the bullets Group too.
    *
    * Bullets can have textures and even animations. You can control the speed at which they are fired,
    * the firing rate, the firing angle, and even set things like gravity for them.
    *
    * @method Phaser.GameObjectFactory#weapon
    * @param ***REMOVED***integer***REMOVED*** [quantity=1] - The quantity of bullets to seed the Weapon with. If -1 it will set the pool to automatically expand.
    * @param ***REMOVED***string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture***REMOVED*** [key] - The image used as a texture by the bullets during rendering. If a string Phaser will get for an entry in the Image Cache. Or it can be an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
    * @param ***REMOVED***string|number***REMOVED*** [frame] - If a Texture Atlas or Sprite Sheet is used this allows you to specify the frame to be used by the bullets. Use either an integer for a Frame ID or a string for a frame name.
    * @param ***REMOVED***Phaser.Group***REMOVED*** [group] - Optional Group to add the Weapon to. If not specified it will be added to the World group.
    * @returns ***REMOVED***Phaser.Weapon***REMOVED*** A Weapon instance.
    */
    weapon: function (quantity, key, frame, group) ***REMOVED***

        var weapon = this.game.plugins.add(Phaser.Weapon);

        weapon.createBullets(quantity, key, frame, group);

        return weapon;

    ***REMOVED***,

    /**
    * Create a new `Image` object.
    * 
    * An Image is a light-weight object you can use to display anything that doesn't need physics or animation.
    * 
    * It can still rotate, scale, crop and receive input events. 
    * This makes it perfect for logos, backgrounds, simple buttons and other non-Sprite graphics.
    *
    * @method Phaser.GameObjectFactory#image
    * @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate of the Image. The coordinate is relative to any parent container this Image may be in.
    * @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate of the Image. The coordinate is relative to any parent container this Image may be in.
    * @param ***REMOVED***string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture***REMOVED*** [key] - The image used as a texture by this display object during rendering. If a string Phaser will get for an entry in the Image Cache. Or it can be an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
    * @param ***REMOVED***string|number***REMOVED*** [frame] - If a Texture Atlas or Sprite Sheet is used this allows you to specify the frame to be used. Use either an integer for a Frame ID or a string for a frame name.
    * @param ***REMOVED***Phaser.Group***REMOVED*** [group] - Optional Group to add the object to. If not specified it will be added to the World group.
    * @returns ***REMOVED***Phaser.Image***REMOVED*** The newly created Image object.
    */
    image: function (x, y, key, frame, group) ***REMOVED***

        if (group === undefined) ***REMOVED*** group = this.world; ***REMOVED***

        return group.add(new Phaser.Image(this.game, x, y, key, frame));

    ***REMOVED***,

    /**
    * Create a new Sprite with specific position and sprite sheet key.
    *
    * At its most basic a Sprite consists of a set of coordinates and a texture that is used when rendered.
    * They also contain additional properties allowing for physics motion (via Sprite.body), input handling (via Sprite.input),
    * events (via Sprite.events), animation (via Sprite.animations), camera culling and more. Please see the Examples for use cases.
    *
    * @method Phaser.GameObjectFactory#sprite
    * @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate of the sprite. The coordinate is relative to any parent container this sprite may be in.
    * @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate of the sprite. The coordinate is relative to any parent container this sprite may be in.
    * @param ***REMOVED***string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture***REMOVED*** [key] - The image used as a texture by this display object during rendering. If a string Phaser will get for an entry in the Image Cache. Or it can be an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
    * @param ***REMOVED***string|number***REMOVED*** [frame] - If a Texture Atlas or Sprite Sheet is used this allows you to specify the frame to be used. Use either an integer for a Frame ID or a string for a frame name.
    * @param ***REMOVED***Phaser.Group***REMOVED*** [group] - Optional Group to add the object to. If not specified it will be added to the World group.
    * @returns ***REMOVED***Phaser.Sprite***REMOVED*** The newly created Sprite object.
    */
    sprite: function (x, y, key, frame, group) ***REMOVED***

        if (group === undefined) ***REMOVED*** group = this.world; ***REMOVED***

        return group.create(x, y, key, frame);

    ***REMOVED***,

    /**
    * Create a new Creature Animation object.
    *
    * Creature is a custom Game Object used in conjunction with the Creature Runtime libraries by Kestrel Moon Studios.
    * 
    * It allows you to display animated Game Objects that were created with the [Creature Automated Animation Tool](http://www.kestrelmoon.com/creature/).
    * 
    * Note 1: You can only use Phaser.Creature objects in WebGL enabled games. They do not work in Canvas mode games.
    *
    * Note 2: You must use a build of Phaser that includes the CreatureMeshBone.js runtime and gl-matrix.js, or have them
    * loaded before your Phaser game boots.
    * 
    * See the Phaser custom build process for more details.
    *
    * @method Phaser.GameObjectFactory#creature
    * @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate of the creature. The coordinate is relative to any parent container this creature may be in.
    * @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate of the creature. The coordinate is relative to any parent container this creature may be in.
    * @param ***REMOVED***string|PIXI.Texture***REMOVED*** [key] - The image used as a texture by this creature object during rendering. If a string Phaser will get for an entry in the Image Cache. Or it can be an instance of a PIXI.Texture.
    * @param ***REMOVED***Phaser.Group***REMOVED*** [group] - Optional Group to add the object to. If not specified it will be added to the World group.
    * @returns ***REMOVED***Phaser.Creature***REMOVED*** The newly created Sprite object.
    */
    creature: function (x, y, key, mesh, group) ***REMOVED***

        if (group === undefined) ***REMOVED*** group = this.world; ***REMOVED***

        var obj = new Phaser.Creature(this.game, x, y, key, mesh);

        group.add(obj);

        return obj;

    ***REMOVED***,

    /**
    * Create a tween on a specific object.
    * 
    * The object can be any JavaScript object or Phaser object such as Sprite.
    *
    * @method Phaser.GameObjectFactory#tween
    * @param ***REMOVED***object***REMOVED*** object - Object the tween will be run on.
    * @return ***REMOVED***Phaser.Tween***REMOVED*** The newly created Phaser.Tween object.
    */
    tween: function (object) ***REMOVED***

        return this.game.tweens.create(object);

    ***REMOVED***,

    /**
    * A Group is a container for display objects that allows for fast pooling, recycling and collision checks.
    *
    * @method Phaser.GameObjectFactory#group
    * @param ***REMOVED***any***REMOVED*** [parent] - The parent Group or DisplayObjectContainer that will hold this group, if any. If set to null the Group won't be added to the display list. If undefined it will be added to World by default.
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
    * A Group is a container for display objects that allows for fast pooling, recycling and collision checks.
    * 
    * A Physics Group is the same as an ordinary Group except that is has enableBody turned on by default, so any Sprites it creates
    * are automatically given a physics body.
    *
    * @method Phaser.GameObjectFactory#physicsGroup
    * @param ***REMOVED***number***REMOVED*** [physicsBodyType=Phaser.Physics.ARCADE] - If enableBody is true this is the type of physics body that is created on new Sprites. Phaser.Physics.ARCADE, Phaser.Physics.P2JS, Phaser.Physics.NINJA, etc.
    * @param ***REMOVED***any***REMOVED*** [parent] - The parent Group or DisplayObjectContainer that will hold this group, if any. If set to null the Group won't be added to the display list. If undefined it will be added to World by default.
    * @param ***REMOVED***string***REMOVED*** [name='group'] - A name for this Group. Not used internally but useful for debugging.
    * @param ***REMOVED***boolean***REMOVED*** [addToStage=false] - If set to true this Group will be added directly to the Game.Stage instead of Game.World.
    * @return ***REMOVED***Phaser.Group***REMOVED*** The newly created Group.
    */
    physicsGroup: function (physicsBodyType, parent, name, addToStage) ***REMOVED***

        return new Phaser.Group(this.game, parent, name, addToStage, true, physicsBodyType);

    ***REMOVED***,

    /**
    * A SpriteBatch is a really fast version of a Phaser Group built solely for speed.
    * Use when you need a lot of sprites or particles all sharing the same texture.
    * The speed gains are specifically for WebGL. In Canvas mode you won't see any real difference.
    *
    * @method Phaser.GameObjectFactory#spriteBatch
    * @param ***REMOVED***Phaser.Group|null***REMOVED*** parent - The parent Group that will hold this Sprite Batch. Set to `undefined` or `null` to add directly to game.world.
    * @param ***REMOVED***string***REMOVED*** [name='group'] - A name for this Sprite Batch. Not used internally but useful for debugging.
    * @param ***REMOVED***boolean***REMOVED*** [addToStage=false] - If set to true this Sprite Batch will be added directly to the Game.Stage instead of the parent.
    * @return ***REMOVED***Phaser.SpriteBatch***REMOVED*** The newly created Sprite Batch.
    */
    spriteBatch: function (parent, name, addToStage) ***REMOVED***

        if (parent === undefined) ***REMOVED*** parent = null; ***REMOVED***
        if (name === undefined) ***REMOVED*** name = 'group'; ***REMOVED***
        if (addToStage === undefined) ***REMOVED*** addToStage = false; ***REMOVED***

        return new Phaser.SpriteBatch(this.game, parent, name, addToStage);

    ***REMOVED***,

    /**
    * Creates a new Sound object.
    *
    * @method Phaser.GameObjectFactory#audio
    * @param ***REMOVED***string***REMOVED*** key - The Game.cache key of the sound that this object will use.
    * @param ***REMOVED***number***REMOVED*** [volume=1] - The volume at which the sound will be played.
    * @param ***REMOVED***boolean***REMOVED*** [loop=false] - Whether or not the sound will loop.
    * @param ***REMOVED***boolean***REMOVED*** [connect=true] - Controls if the created Sound object will connect to the master gainNode of the SoundManager when running under WebAudio.
    * @return ***REMOVED***Phaser.Sound***REMOVED*** The newly created sound object.
    */
    audio: function (key, volume, loop, connect) ***REMOVED***

        return this.game.sound.add(key, volume, loop, connect);

    ***REMOVED***,

    /**
    * Creates a new Sound object.
    *
    * @method Phaser.GameObjectFactory#sound
    * @param ***REMOVED***string***REMOVED*** key - The Game.cache key of the sound that this object will use.
    * @param ***REMOVED***number***REMOVED*** [volume=1] - The volume at which the sound will be played.
    * @param ***REMOVED***boolean***REMOVED*** [loop=false] - Whether or not the sound will loop.
    * @param ***REMOVED***boolean***REMOVED*** [connect=true] - Controls if the created Sound object will connect to the master gainNode of the SoundManager when running under WebAudio.
    * @return ***REMOVED***Phaser.Sound***REMOVED*** The newly created sound object.
    */
    sound: function (key, volume, loop, connect) ***REMOVED***

        return this.game.sound.add(key, volume, loop, connect);

    ***REMOVED***,

    /**
     * Creates a new AudioSprite object.
     *
     * @method Phaser.GameObjectFactory#audioSprite
     * @param ***REMOVED***string***REMOVED*** key - The Game.cache key of the sound that this object will use.
     * @return ***REMOVED***Phaser.AudioSprite***REMOVED*** The newly created AudioSprite object.
     */
    audioSprite: function (key) ***REMOVED***

        return this.game.sound.addSprite(key);

    ***REMOVED***,

    /**
    * Creates a new TileSprite object.
    *
    * @method Phaser.GameObjectFactory#tileSprite
    * @param ***REMOVED***number***REMOVED*** x - The x coordinate of the TileSprite. The coordinate is relative to any parent container this TileSprite may be in.
    * @param ***REMOVED***number***REMOVED*** y - The y coordinate of the TileSprite. The coordinate is relative to any parent container this TileSprite may be in.
    * @param ***REMOVED***number***REMOVED*** width - The width of the TileSprite.
    * @param ***REMOVED***number***REMOVED*** height - The height of the TileSprite.
    * @param ***REMOVED***string|Phaser.BitmapData|PIXI.Texture***REMOVED*** key - This is the image or texture used by the TileSprite during rendering. It can be a string which is a reference to the Phaser Image Cache entry, or an instance of a PIXI.Texture or BitmapData.
    * @param ***REMOVED***string|number***REMOVED*** [frame] - If a Texture Atlas or Sprite Sheet is used this allows you to specify the frame to be used. Use either an integer for a Frame ID or a string for a frame name.
    * @param ***REMOVED***Phaser.Group***REMOVED*** [group] - Optional Group to add the object to. If not specified it will be added to the World group.
    * @return ***REMOVED***Phaser.TileSprite***REMOVED*** The newly created TileSprite object.
    */
    tileSprite: function (x, y, width, height, key, frame, group) ***REMOVED***

        if (group === undefined) ***REMOVED*** group = this.world; ***REMOVED***

        return group.add(new Phaser.TileSprite(this.game, x, y, width, height, key, frame));

    ***REMOVED***,

    /**
    * Creates a new Rope object.
    *
    * Example usage: https://github.com/codevinsky/phaser-rope-demo/blob/master/dist/demo.js
    *
    * @method Phaser.GameObjectFactory#rope
    * @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate of the Rope. The coordinate is relative to any parent container this rope may be in.
    * @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate of the Rope. The coordinate is relative to any parent container this rope may be in.
    * @param ***REMOVED***string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video|PIXI.Texture***REMOVED*** [key] - The image used as a texture by this display object during rendering. If a string Phaser will get for an entry in the Image Cache. Or it can be an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
    * @param ***REMOVED***string|number***REMOVED*** [frame] - If a Texture Atlas or Sprite Sheet is used this allows you to specify the frame to be used. Use either an integer for a Frame ID or a string for a frame name.
    * @param ***REMOVED***Array***REMOVED*** points - An array of ***REMOVED***Phaser.Point***REMOVED***.
    * @param ***REMOVED***Phaser.Group***REMOVED*** [group] - Optional Group to add the object to. If not specified it will be added to the World group.
    * @return ***REMOVED***Phaser.Rope***REMOVED*** The newly created Rope object.
    */
    rope: function (x, y, key, frame, points, group) ***REMOVED***

        if (group === undefined) ***REMOVED*** group = this.world; ***REMOVED***

        return group.add(new Phaser.Rope(this.game, x, y, key, frame, points));

    ***REMOVED***,

    /**
    * Creates a new Text object.
    *
    * @method Phaser.GameObjectFactory#text
    * @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate of the Text. The coordinate is relative to any parent container this text may be in.
    * @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate of the Text. The coordinate is relative to any parent container this text may be in.
    * @param ***REMOVED***string***REMOVED*** [text=''] - The text string that will be displayed.
    * @param ***REMOVED***object***REMOVED*** [style] - The style object containing style attributes like font, font size , etc.
    * @param ***REMOVED***Phaser.Group***REMOVED*** [group] - Optional Group to add the object to. If not specified it will be added to the World group.
    * @return ***REMOVED***Phaser.Text***REMOVED*** The newly created text object.
    */
    text: function (x, y, text, style, group) ***REMOVED***

        if (group === undefined) ***REMOVED*** group = this.world; ***REMOVED***

        return group.add(new Phaser.Text(this.game, x, y, text, style));

    ***REMOVED***,

    /**
    * Creates a new Button object.
    *
    * @method Phaser.GameObjectFactory#button
    * @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate of the Button. The coordinate is relative to any parent container this button may be in.
    * @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate of the Button. The coordinate is relative to any parent container this button may be in.
    * @param ***REMOVED***string***REMOVED*** [key] - The image key as defined in the Game.Cache to use as the texture for this button.
    * @param ***REMOVED***function***REMOVED*** [callback] - The function to call when this button is pressed
    * @param ***REMOVED***object***REMOVED*** [callbackContext] - The context in which the callback will be called (usually 'this')
    * @param ***REMOVED***string|number***REMOVED*** [overFrame] - This is the frame or frameName that will be set when this button is in an over state. Give either a number to use a frame ID or a string for a frame name.
    * @param ***REMOVED***string|number***REMOVED*** [outFrame] - This is the frame or frameName that will be set when this button is in an out state. Give either a number to use a frame ID or a string for a frame name.
    * @param ***REMOVED***string|number***REMOVED*** [downFrame] - This is the frame or frameName that will be set when this button is in a down state. Give either a number to use a frame ID or a string for a frame name.
    * @param ***REMOVED***string|number***REMOVED*** [upFrame] - This is the frame or frameName that will be set when this button is in an up state. Give either a number to use a frame ID or a string for a frame name.
    * @param ***REMOVED***Phaser.Group***REMOVED*** [group] - Optional Group to add the object to. If not specified it will be added to the World group.
    * @return ***REMOVED***Phaser.Button***REMOVED*** The newly created Button object.
    */
    button: function (x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group) ***REMOVED***

        if (group === undefined) ***REMOVED*** group = this.world; ***REMOVED***

        return group.add(new Phaser.Button(this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame));

    ***REMOVED***,

    /**
    * Creates a new Graphics object.
    *
    * @method Phaser.GameObjectFactory#graphics
    * @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate of the Graphic. The coordinate is relative to any parent container this object may be in.
    * @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate of the Graphic. The coordinate is relative to any parent container this object may be in.
    * @param ***REMOVED***Phaser.Group***REMOVED*** [group] - Optional Group to add the object to. If not specified it will be added to the World group.
    * @return ***REMOVED***Phaser.Graphics***REMOVED*** The newly created graphics object.
    */
    graphics: function (x, y, group) ***REMOVED***

        if (group === undefined) ***REMOVED*** group = this.world; ***REMOVED***

        return group.add(new Phaser.Graphics(this.game, x, y));

    ***REMOVED***,

    /**
    * Create a new Emitter.
    *
    * A particle emitter can be used for one-time explosions or for
    * continuous effects like rain and fire. All it really does is launch Particle objects out
    * at set intervals, and fixes their positions and velocities accordingly.
    *
    * @method Phaser.GameObjectFactory#emitter
    * @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate within the Emitter that the particles are emitted from.
    * @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate within the Emitter that the particles are emitted from.
    * @param ***REMOVED***number***REMOVED*** [maxParticles=50] - The total number of particles in this emitter.
    * @return ***REMOVED***Phaser.Particles.Arcade.Emitter***REMOVED*** The newly created emitter object.
    */
    emitter: function (x, y, maxParticles) ***REMOVED***

        return this.game.particles.add(new Phaser.Particles.Arcade.Emitter(this.game, x, y, maxParticles));

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
    * @method Phaser.GameObjectFactory#retroFont
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
    * @method Phaser.GameObjectFactory#bitmapText
    * @param ***REMOVED***number***REMOVED*** x - X coordinate to display the BitmapText object at.
    * @param ***REMOVED***number***REMOVED*** y - Y coordinate to display the BitmapText object at.
    * @param ***REMOVED***string***REMOVED*** font - The key of the BitmapText as stored in Phaser.Cache.
    * @param ***REMOVED***string***REMOVED*** [text=''] - The text that will be rendered. This can also be set later via BitmapText.text.
    * @param ***REMOVED***number***REMOVED*** [size=32] - The size the font will be rendered at in pixels.
    * @param ***REMOVED***Phaser.Group***REMOVED*** [group] - Optional Group to add the object to. If not specified it will be added to the World group.
    * @return ***REMOVED***Phaser.BitmapText***REMOVED*** The newly created bitmapText object.
    */
    bitmapText: function (x, y, font, text, size, group) ***REMOVED***

        if (group === undefined) ***REMOVED*** group = this.world; ***REMOVED***

        return group.add(new Phaser.BitmapText(this.game, x, y, font, text, size));

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
    * @method Phaser.GameObjectFactory#tilemap
    * @param ***REMOVED***string***REMOVED*** [key] - The key of the tilemap data as stored in the Cache. If you're creating a blank map either leave this parameter out or pass `null`.
    * @param ***REMOVED***number***REMOVED*** [tileWidth=32] - The pixel width of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
    * @param ***REMOVED***number***REMOVED*** [tileHeight=32] - The pixel height of a single map tile. If using CSV data you must specify this. Not required if using Tiled map data.
    * @param ***REMOVED***number***REMOVED*** [width=10] - The width of the map in tiles. If this map is created from Tiled or CSV data you don't need to specify this.
    * @param ***REMOVED***number***REMOVED*** [height=10] - The height of the map in tiles. If this map is created from Tiled or CSV data you don't need to specify this.
    * @return ***REMOVED***Phaser.Tilemap***REMOVED*** The newly created tilemap object.
    */
    tilemap: function (key, tileWidth, tileHeight, width, height) ***REMOVED***

        return new Phaser.Tilemap(this.game, key, tileWidth, tileHeight, width, height);

    ***REMOVED***,

    /**
    * A dynamic initially blank canvas to which images can be drawn.
    *
    * @method Phaser.GameObjectFactory#renderTexture
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
    * Create a Video object.
    *
    * This will return a Phaser.Video object which you can pass to a Sprite to be used as a texture.
    *
    * @method Phaser.GameObjectFactory#video
    * @param ***REMOVED***string|null***REMOVED*** [key=null] - The key of the video file in the Phaser.Cache that this Video object will play. Set to `null` or leave undefined if you wish to use a webcam as the source. See `startMediaStream` to start webcam capture.
    * @param ***REMOVED***string|null***REMOVED*** [url=null] - If the video hasn't been loaded then you can provide a full URL to the file here (make sure to set key to null)
    * @return ***REMOVED***Phaser.Video***REMOVED*** The newly created Video object.
    */
    video: function (key, url) ***REMOVED***

        return new Phaser.Video(this.game, key, url);

    ***REMOVED***,

    /**
    * Create a BitmapData object.
    *
    * A BitmapData object can be manipulated and drawn to like a traditional Canvas object and used to texture Sprites.
    *
    * @method Phaser.GameObjectFactory#bitmapData
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
    * @method Phaser.GameObjectFactory#filter
    * @param ***REMOVED***string***REMOVED*** filter - The name of the filter you wish to create, for example HueRotate or SineWave.
    * @param ***REMOVED***any***REMOVED*** - Whatever parameters are needed to be passed to the filter init function.
    * @return ***REMOVED***Phaser.Filter***REMOVED*** The newly created Phaser.Filter object.
    */
    filter: function (filter) ***REMOVED***

        var args = Array.prototype.slice.call(arguments, 1);

        var filter = new Phaser.Filter[filter](this.game);

        filter.init.apply(filter, args);

        return filter;

    ***REMOVED***,

    /**
    * Add a new Plugin into the PluginManager.
    *
    * The Plugin must have 2 properties: `game` and `parent`. Plugin.game is set to the game reference the PluginManager uses, and parent is set to the PluginManager.
    *
    * @method Phaser.GameObjectFactory#plugin
    * @param ***REMOVED***object|Phaser.Plugin***REMOVED*** plugin - The Plugin to add into the PluginManager. This can be a function or an existing object.
    * @param ***REMOVED***...****REMOVED*** parameter - Additional parameters that will be passed to the Plugin.init method.
    * @return ***REMOVED***Phaser.Plugin***REMOVED*** The Plugin that was added to the manager.
    */
    plugin: function (plugin) ***REMOVED***

        return this.game.plugins.add(plugin);

    ***REMOVED***

***REMOVED***;

Phaser.GameObjectFactory.prototype.constructor = Phaser.GameObjectFactory;

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

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Sprites are the lifeblood of your game, used for nearly everything visual.
*
* At its most basic a Sprite consists of a set of coordinates and a texture that is rendered to the canvas.
* They also contain additional properties allowing for physics motion (via Sprite.body), input handling (via Sprite.input),
* events (via Sprite.events), animation (via Sprite.animations), camera culling and more. Please see the Examples for use cases.
*
* @class Phaser.Sprite
* @constructor
* @extends PIXI.Sprite
* @extends Phaser.Component.Core
* @extends Phaser.Component.Angle
* @extends Phaser.Component.Animation
* @extends Phaser.Component.AutoCull
* @extends Phaser.Component.Bounds
* @extends Phaser.Component.BringToTop
* @extends Phaser.Component.Crop
* @extends Phaser.Component.Delta
* @extends Phaser.Component.Destroy
* @extends Phaser.Component.FixedToCamera
* @extends Phaser.Component.Health
* @extends Phaser.Component.InCamera
* @extends Phaser.Component.InputEnabled
* @extends Phaser.Component.InWorld
* @extends Phaser.Component.LifeSpan
* @extends Phaser.Component.LoadTexture
* @extends Phaser.Component.Overlap
* @extends Phaser.Component.PhysicsBody
* @extends Phaser.Component.Reset
* @extends Phaser.Component.ScaleMinMax
* @extends Phaser.Component.Smoothed
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***number***REMOVED*** x - The x coordinate (in world space) to position the Sprite at.
* @param ***REMOVED***number***REMOVED*** y - The y coordinate (in world space) to position the Sprite at.
* @param ***REMOVED***string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture***REMOVED*** key - This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
* @param ***REMOVED***string|number***REMOVED*** frame - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
*/
Phaser.Sprite = function (game, x, y, key, frame) ***REMOVED***

    x = x || 0;
    y = y || 0;
    key = key || null;
    frame = frame || null;

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.SPRITE;

    /**
    * @property ***REMOVED***number***REMOVED*** physicsType - The const physics body type of this object.
    * @readonly
    */
    this.physicsType = Phaser.SPRITE;

    PIXI.Sprite.call(this, Phaser.Cache.DEFAULT);

    Phaser.Component.Core.init.call(this, game, x, y, key, frame);

***REMOVED***;

Phaser.Sprite.prototype = Object.create(PIXI.Sprite.prototype);
Phaser.Sprite.prototype.constructor = Phaser.Sprite;

Phaser.Component.Core.install.call(Phaser.Sprite.prototype, [
    'Angle',
    'Animation',
    'AutoCull',
    'Bounds',
    'BringToTop',
    'Crop',
    'Delta',
    'Destroy',
    'FixedToCamera',
    'Health',
    'InCamera',
    'InputEnabled',
    'InWorld',
    'LifeSpan',
    'LoadTexture',
    'Overlap',
    'PhysicsBody',
    'Reset',
    'ScaleMinMax',
    'Smoothed'
]);

Phaser.Sprite.prototype.preUpdatePhysics = Phaser.Component.PhysicsBody.preUpdate;
Phaser.Sprite.prototype.preUpdateLifeSpan = Phaser.Component.LifeSpan.preUpdate;
Phaser.Sprite.prototype.preUpdateInWorld = Phaser.Component.InWorld.preUpdate;
Phaser.Sprite.prototype.preUpdateCore = Phaser.Component.Core.preUpdate;

/**
* Automatically called by World.preUpdate.
*
* @method
* @memberof Phaser.Sprite
* @return ***REMOVED***boolean***REMOVED*** True if the Sprite was rendered, otherwise false.
*/
Phaser.Sprite.prototype.preUpdate = function() ***REMOVED***

    if (!this.preUpdatePhysics() || !this.preUpdateLifeSpan() || !this.preUpdateInWorld())
    ***REMOVED***
        return false;
    ***REMOVED***

    return this.preUpdateCore();

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* An Image is a light-weight object you can use to display anything that doesn't need physics or animation.
* It can still rotate, scale, crop and receive input events. This makes it perfect for logos, backgrounds, simple buttons and other non-Sprite graphics.
*
* @class Phaser.Image
* @extends PIXI.Sprite
* @extends Phaser.Component.Core
* @extends Phaser.Component.Angle
* @extends Phaser.Component.Animation
* @extends Phaser.Component.AutoCull
* @extends Phaser.Component.Bounds
* @extends Phaser.Component.BringToTop
* @extends Phaser.Component.Crop
* @extends Phaser.Component.Destroy
* @extends Phaser.Component.FixedToCamera
* @extends Phaser.Component.InputEnabled
* @extends Phaser.Component.LifeSpan
* @extends Phaser.Component.LoadTexture
* @extends Phaser.Component.Overlap
* @extends Phaser.Component.Reset
* @extends Phaser.Component.ScaleMinMax
* @extends Phaser.Component.Smoothed
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate of the Image. The coordinate is relative to any parent container this Image may be in.
* @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate of the Image. The coordinate is relative to any parent container this Image may be in.
* @param ***REMOVED***string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture***REMOVED*** [key] - The texture used by the Image during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture, BitmapData or PIXI.Texture.
* @param ***REMOVED***string|number***REMOVED*** [frame] - If this Image is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
*/
Phaser.Image = function (game, x, y, key, frame) ***REMOVED***

    x = x || 0;
    y = y || 0;
    key = key || null;
    frame = frame || null;

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.IMAGE;

    PIXI.Sprite.call(this, Phaser.Cache.DEFAULT);

    Phaser.Component.Core.init.call(this, game, x, y, key, frame);

***REMOVED***;

Phaser.Image.prototype = Object.create(PIXI.Sprite.prototype);
Phaser.Image.prototype.constructor = Phaser.Image;

Phaser.Component.Core.install.call(Phaser.Image.prototype, [
    'Angle',
    'Animation',
    'AutoCull',
    'Bounds',
    'BringToTop',
    'Crop',
    'Destroy',
    'FixedToCamera',
    'InputEnabled',
    'LifeSpan',
    'LoadTexture',
    'Overlap',
    'Reset',
    'ScaleMinMax',
    'Smoothed'
]);

Phaser.Image.prototype.preUpdateInWorld = Phaser.Component.InWorld.preUpdate;
Phaser.Image.prototype.preUpdateCore = Phaser.Component.Core.preUpdate;

/**
* Automatically called by World.preUpdate.
*
* @method Phaser.Image#preUpdate
* @memberof Phaser.Image
*/
Phaser.Image.prototype.preUpdate = function() ***REMOVED***

    if (!this.preUpdateInWorld())
    ***REMOVED***
        return false;
    ***REMOVED***

    return this.preUpdateCore();

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Create a new `Button` object. A Button is a special type of Sprite that is set-up to handle Pointer events automatically.
*
* The four states a Button responds to are:
*
* * 'Over' - when the Pointer moves over the Button. This is also commonly known as 'hover'.
* * 'Out' - when the Pointer that was previously over the Button moves out of it.
* * 'Down' - when the Pointer is pressed down on the Button. I.e. touched on a touch enabled device or clicked with the mouse.
* * 'Up' - when the Pointer that was pressed down on the Button is released again.
*
* A different texture/frame and activation sound can be specified for any of the states.
*
* Frames can be specified as either an integer (the frame ID) or a string (the frame name); the same values that can be used with a Sprite constructor.
*
* @class Phaser.Button
* @constructor
* @extends Phaser.Image
* @param ***REMOVED***Phaser.Game***REMOVED*** game Current game instance.
* @param ***REMOVED***number***REMOVED*** [x=0] - X position of the Button.
* @param ***REMOVED***number***REMOVED*** [y=0] - Y position of the Button.
* @param ***REMOVED***string***REMOVED*** [key] - The image key (in the Game.Cache) to use as the texture for this Button.
* @param ***REMOVED***function***REMOVED*** [callback] - The function to call when this Button is pressed.
* @param ***REMOVED***object***REMOVED*** [callbackContext] - The context in which the callback will be called (usually 'this').
* @param ***REMOVED***string|integer***REMOVED*** [overFrame] - The frame / frameName when the button is in the Over state.
* @param ***REMOVED***string|integer***REMOVED*** [outFrame] - The frame / frameName when the button is in the Out state.
* @param ***REMOVED***string|integer***REMOVED*** [downFrame] - The frame / frameName when the button is in the Down state.
* @param ***REMOVED***string|integer***REMOVED*** [upFrame] - The frame / frameName when the button is in the Up state.
*/
Phaser.Button = function (game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) ***REMOVED***

    x = x || 0;
    y = y || 0;
    key = key || null;
    callback = callback || null;
    callbackContext = callbackContext || this;

    Phaser.Image.call(this, game, x, y, key, outFrame);

    /**
    * The Phaser Object Type.
    * @property ***REMOVED***number***REMOVED*** type
    * @readonly
    */
    this.type = Phaser.BUTTON;

    /**
    * @property ***REMOVED***number***REMOVED*** physicsType - The const physics body type of this object.
    * @readonly
    */
    this.physicsType = Phaser.SPRITE;

    /**
    * The name or ID of the Over state frame.
    * @property ***REMOVED***string|integer***REMOVED*** onOverFrame
    * @private
    */
    this._onOverFrame = null;

    /**
    * The name or ID of the Out state frame.
    * @property ***REMOVED***string|integer***REMOVED*** onOutFrame
    * @private
    */
    this._onOutFrame = null;

    /**
    * The name or ID of the Down state frame.
    * @property ***REMOVED***string|integer***REMOVED*** onDownFrame
    * @private
    */
    this._onDownFrame = null;

    /**
    * The name or ID of the Up state frame.
    * @property ***REMOVED***string|integer***REMOVED*** onUpFrame
    * @private
    */
    this._onUpFrame = null;

    /**
    * The Sound to be played when this Buttons Over state is activated.
    * @property ***REMOVED***Phaser.Sound|Phaser.AudioSprite|null***REMOVED*** onOverSound
    * @readonly
    */
    this.onOverSound = null;

    /**
    * The Sound to be played when this Buttons Out state is activated.
    * @property ***REMOVED***Phaser.Sound|Phaser.AudioSprite|null***REMOVED*** onOutSound
    * @readonly
    */
    this.onOutSound = null;

    /**
    * The Sound to be played when this Buttons Down state is activated.
    * @property ***REMOVED***Phaser.Sound|Phaser.AudioSprite|null***REMOVED*** onDownSound
    * @readonly
    */
    this.onDownSound = null;

    /**
    * The Sound to be played when this Buttons Up state is activated.
    * @property ***REMOVED***Phaser.Sound|Phaser.AudioSprite|null***REMOVED*** onUpSound
    * @readonly
    */
    this.onUpSound = null;

    /**
    * The Sound Marker used in conjunction with the onOverSound.
    * @property ***REMOVED***string***REMOVED*** onOverSoundMarker
    * @readonly
    */
    this.onOverSoundMarker = '';

    /**
    * The Sound Marker used in conjunction with the onOutSound.
    * @property ***REMOVED***string***REMOVED*** onOutSoundMarker
    * @readonly
    */
    this.onOutSoundMarker = '';

    /**
    * The Sound Marker used in conjunction with the onDownSound.
    * @property ***REMOVED***string***REMOVED*** onDownSoundMarker
    * @readonly
    */
    this.onDownSoundMarker = '';

    /**
    * The Sound Marker used in conjunction with the onUpSound.
    * @property ***REMOVED***string***REMOVED*** onUpSoundMarker
    * @readonly
    */
    this.onUpSoundMarker = '';

    /**
    * The Signal (or event) dispatched when this Button is in an Over state.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onInputOver
    */
    this.onInputOver = new Phaser.Signal();

    /**
    * The Signal (or event) dispatched when this Button is in an Out state.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onInputOut
    */
    this.onInputOut = new Phaser.Signal();

    /**
    * The Signal (or event) dispatched when this Button is in an Down state.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onInputDown
    */
    this.onInputDown = new Phaser.Signal();

    /**
    * The Signal (or event) dispatched when this Button is in an Up state.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onInputUp
    */
    this.onInputUp = new Phaser.Signal();

    /**
    * If true then onOver events (such as onOverSound) will only be triggered if the Pointer object causing them was the Mouse Pointer.
    * The frame will still be changed as applicable.
    *
    * @property ***REMOVED***boolean***REMOVED*** onOverMouseOnly
    * @default
    */
    this.onOverMouseOnly = true;

    /**
    * Suppress the over event if a pointer was just released and it matches the given ***REMOVED***@link Phaser.PointerModer pointer mode bitmask***REMOVED***.
    *
    * This behavior was introduced in Phaser 2.3.1; this property is a soft-revert of the change.
    *
    * @property ***REMOVED***Phaser.PointerMode?***REMOVED*** justReleasedPreventsOver=ACTIVE_CURSOR
    */
    this.justReleasedPreventsOver = Phaser.PointerMode.TOUCH;
    
    /**
    * When true the the texture frame will not be automatically switched on up/down/over/out events.
    * @property ***REMOVED***boolean***REMOVED*** freezeFrames
    * @default
    */
    this.freezeFrames = false;

    /**
    * When the Button is touched / clicked and then released you can force it to enter a state of "out" instead of "up".
    *
    * This can also accept a ***REMOVED***@link Phaser.PointerModer pointer mode bitmask***REMOVED*** for more refined control.
    *
    * @property ***REMOVED***boolean|Phaser.PointerMode***REMOVED*** forceOut=false
    * @default
    */
    this.forceOut = false;

    this.inputEnabled = true;

    this.input.start(0, true);

    this.input.useHandCursor = true;

    this.setFrames(overFrame, outFrame, downFrame, upFrame);

    if (callback !== null)
    ***REMOVED***
        this.onInputUp.add(callback, callbackContext);
    ***REMOVED***

    //  Redirect the input events to here so we can handle animation updates, etc
    this.events.onInputOver.add(this.onInputOverHandler, this);
    this.events.onInputOut.add(this.onInputOutHandler, this);
    this.events.onInputDown.add(this.onInputDownHandler, this);
    this.events.onInputUp.add(this.onInputUpHandler, this);

    this.events.onRemovedFromWorld.add(this.removedFromWorld, this);

***REMOVED***;

Phaser.Button.prototype = Object.create(Phaser.Image.prototype);
Phaser.Button.prototype.constructor = Phaser.Button;

//  State constants; local only. These are tied to property names in Phaser.Button.
var STATE_OVER = 'Over';
var STATE_OUT = 'Out';
var STATE_DOWN = 'Down';
var STATE_UP = 'Up';

/**
* Clears all of the frames set on this Button.
*
* @method Phaser.Button#clearFrames
*/
Phaser.Button.prototype.clearFrames = function () ***REMOVED***

    this.setFrames(null, null, null, null);

***REMOVED***;

/**
* Called when this Button is removed from the World.
*
* @method Phaser.Button#removedFromWorld
* @protected
*/
Phaser.Button.prototype.removedFromWorld = function () ***REMOVED***

    this.inputEnabled = false;

***REMOVED***;

/**
* Set the frame name/ID for the given state.
*
* @method Phaser.Button#setStateFrame
* @private
* @param ***REMOVED***object***REMOVED*** state - See `STATE_*`
* @param ***REMOVED***number|string***REMOVED*** frame - The number or string representing the frame.
* @param ***REMOVED***boolean***REMOVED*** switchImmediately - Immediately switch to the frame if it was set - and this is true.
*/
Phaser.Button.prototype.setStateFrame = function (state, frame, switchImmediately)
***REMOVED***
    var frameKey = '_on' + state + 'Frame';

    if (frame !== null) // not null or undefined
    ***REMOVED***
        this[frameKey] = frame;

        if (switchImmediately)
        ***REMOVED***
            this.changeStateFrame(state);
        ***REMOVED***
    ***REMOVED***
    else
    ***REMOVED***
        this[frameKey] = null;
    ***REMOVED***

***REMOVED***;

/**
* Change the frame to that of the given state, _if_ the state has a frame assigned _and_ if the frames are not currently "frozen".
*
* @method Phaser.Button#changeStateFrame
* @private
* @param ***REMOVED***object***REMOVED*** state - See `STATE_*`
* @return ***REMOVED***boolean***REMOVED*** True only if the frame was assigned a value, possibly the same one it already had.
*/
Phaser.Button.prototype.changeStateFrame = function (state) ***REMOVED***

    if (this.freezeFrames)
    ***REMOVED***
        return false;
    ***REMOVED***

    var frameKey = '_on' + state + 'Frame';
    var frame = this[frameKey];

    if (typeof frame === 'string')
    ***REMOVED***
        this.frameName = frame;
        return true;
    ***REMOVED***
    else if (typeof frame === 'number')
    ***REMOVED***
        this.frame = frame;
        return true;
    ***REMOVED***
    else
    ***REMOVED***
        return false;
    ***REMOVED***

***REMOVED***;

/**
* Used to manually set the frames that will be used for the different states of the Button.
*
* Frames can be specified as either an integer (the frame ID) or a string (the frame name); these are the same values that can be used with a Sprite constructor.
*
* @method Phaser.Button#setFrames
* @public
* @param ***REMOVED***string|integer***REMOVED*** [overFrame] - The frame / frameName when the button is in the Over state.
* @param ***REMOVED***string|integer***REMOVED*** [outFrame] - The frame / frameName when the button is in the Out state.
* @param ***REMOVED***string|integer***REMOVED*** [downFrame] - The frame / frameName when the button is in the Down state.
* @param ***REMOVED***string|integer***REMOVED*** [upFrame] - The frame / frameName when the button is in the Up state.
*/
Phaser.Button.prototype.setFrames = function (overFrame, outFrame, downFrame, upFrame) ***REMOVED***

    this.setStateFrame(STATE_OVER, overFrame, this.input.pointerOver());
    this.setStateFrame(STATE_OUT, outFrame, !this.input.pointerOver());
    this.setStateFrame(STATE_DOWN, downFrame, this.input.pointerDown());
    this.setStateFrame(STATE_UP, upFrame, this.input.pointerUp());

***REMOVED***;

/**
* Set the sound/marker for the given state.
*
* @method Phaser.Button#setStateSound
* @private
* @param ***REMOVED***object***REMOVED*** state - See `STATE_*`
* @param ***REMOVED***Phaser.Sound|Phaser.AudioSprite***REMOVED*** [sound] - Sound.
* @param ***REMOVED***string***REMOVED*** [marker=''] - Sound marker.
*/
Phaser.Button.prototype.setStateSound = function (state, sound, marker) ***REMOVED***

    var soundKey = 'on' + state + 'Sound';
    var markerKey = 'on' + state + 'SoundMarker';

    if (sound instanceof Phaser.Sound || sound instanceof Phaser.AudioSprite)
    ***REMOVED***
        this[soundKey] = sound;
        this[markerKey] = typeof marker === 'string' ? marker : '';
    ***REMOVED***
    else
    ***REMOVED***
        this[soundKey] = null;
        this[markerKey] = '';
    ***REMOVED***

***REMOVED***;

/**
* Play the sound for the given state, _if_ the state has a sound assigned.
*
* @method Phaser.Button#playStateSound
* @private
* @param ***REMOVED***object***REMOVED*** state - See `STATE_*`
* @return ***REMOVED***boolean***REMOVED*** True only if a sound was played.
*/
Phaser.Button.prototype.playStateSound = function (state) ***REMOVED***

    var soundKey = 'on' + state + 'Sound';
    var sound = this[soundKey];

    if (sound)
    ***REMOVED***
        var markerKey = 'on' + state + 'SoundMarker';
        var marker = this[markerKey];

        sound.play(marker);
        return true;
    ***REMOVED***
    else
    ***REMOVED***
        return false;
    ***REMOVED***

***REMOVED***;

/**
* Sets the sounds to be played whenever this Button is interacted with. Sounds can be either full Sound objects, or markers pointing to a section of a Sound object.
* The most common forms of sounds are 'hover' effects and 'click' effects, which is why the order of the parameters is overSound then downSound.
*
* Call this function with no parameters to reset all sounds on this Button.
*
* @method Phaser.Button#setSounds
* @public
* @param ***REMOVED***Phaser.Sound|Phaser.AudioSprite***REMOVED*** [overSound] - Over Button Sound.
* @param ***REMOVED***string***REMOVED*** [overMarker] - Over Button Sound Marker.
* @param ***REMOVED***Phaser.Sound|Phaser.AudioSprite***REMOVED*** [downSound] - Down Button Sound.
* @param ***REMOVED***string***REMOVED*** [downMarker] - Down Button Sound Marker.
* @param ***REMOVED***Phaser.Sound|Phaser.AudioSprite***REMOVED*** [outSound] - Out Button Sound.
* @param ***REMOVED***string***REMOVED*** [outMarker] - Out Button Sound Marker.
* @param ***REMOVED***Phaser.Sound|Phaser.AudioSprite***REMOVED*** [upSound] - Up Button Sound.
* @param ***REMOVED***string***REMOVED*** [upMarker] - Up Button Sound Marker.
*/
Phaser.Button.prototype.setSounds = function (overSound, overMarker, downSound, downMarker, outSound, outMarker, upSound, upMarker) ***REMOVED***

    this.setStateSound(STATE_OVER, overSound, overMarker);
    this.setStateSound(STATE_OUT, outSound, outMarker);
    this.setStateSound(STATE_DOWN, downSound, downMarker);
    this.setStateSound(STATE_UP, upSound, upMarker);

***REMOVED***;

/**
* The Sound to be played when a Pointer moves over this Button.
*
* @method Phaser.Button#setOverSound
* @public
* @param ***REMOVED***Phaser.Sound|Phaser.AudioSprite***REMOVED*** sound - The Sound that will be played.
* @param ***REMOVED***string***REMOVED*** [marker] - A Sound Marker that will be used in the playback.
*/
Phaser.Button.prototype.setOverSound = function (sound, marker) ***REMOVED***

    this.setStateSound(STATE_OVER, sound, marker);

***REMOVED***;

/**
* The Sound to be played when a Pointer moves out of this Button.
*
* @method Phaser.Button#setOutSound
* @public
* @param ***REMOVED***Phaser.Sound|Phaser.AudioSprite***REMOVED*** sound - The Sound that will be played.
* @param ***REMOVED***string***REMOVED*** [marker] - A Sound Marker that will be used in the playback.
*/
Phaser.Button.prototype.setOutSound = function (sound, marker) ***REMOVED***

    this.setStateSound(STATE_OUT, sound, marker);

***REMOVED***;

/**
* The Sound to be played when a Pointer presses down on this Button.
*
* @method Phaser.Button#setDownSound
* @public
* @param ***REMOVED***Phaser.Sound|Phaser.AudioSprite***REMOVED*** sound - The Sound that will be played.
* @param ***REMOVED***string***REMOVED*** [marker] - A Sound Marker that will be used in the playback.
*/
Phaser.Button.prototype.setDownSound = function (sound, marker) ***REMOVED***

    this.setStateSound(STATE_DOWN, sound, marker);

***REMOVED***;

/**
* The Sound to be played when a Pointer has pressed down and is released from this Button.
*
* @method Phaser.Button#setUpSound
* @public
* @param ***REMOVED***Phaser.Sound|Phaser.AudioSprite***REMOVED*** sound - The Sound that will be played.
* @param ***REMOVED***string***REMOVED*** [marker] - A Sound Marker that will be used in the playback.
*/
Phaser.Button.prototype.setUpSound = function (sound, marker) ***REMOVED***

    this.setStateSound(STATE_UP, sound, marker);

***REMOVED***;

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputOverHandler
* @protected
* @param ***REMOVED***Phaser.Button***REMOVED*** sprite - The Button that the event occurred on.
* @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer - The Pointer that activated the Button.
*/
Phaser.Button.prototype.onInputOverHandler = function (sprite, pointer) ***REMOVED***

    if (pointer.justReleased() &&
        (this.justReleasedPreventsOver & pointer.pointerMode) === pointer.pointerMode)
    ***REMOVED***
        //  If the Pointer was only just released then we don't fire an over event
        return;
    ***REMOVED***

    this.changeStateFrame(STATE_OVER);

    if (this.onOverMouseOnly && !pointer.isMouse)
    ***REMOVED***
        return;
    ***REMOVED***

    this.playStateSound(STATE_OVER);

    if (this.onInputOver)
    ***REMOVED***
        this.onInputOver.dispatch(this, pointer);
    ***REMOVED***

***REMOVED***;

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputOutHandler
* @protected
* @param ***REMOVED***Phaser.Button***REMOVED*** sprite - The Button that the event occurred on.
* @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer - The Pointer that activated the Button.
*/
Phaser.Button.prototype.onInputOutHandler = function (sprite, pointer) ***REMOVED***

    this.changeStateFrame(STATE_OUT);

    this.playStateSound(STATE_OUT);

    if (this.onInputOut)
    ***REMOVED***
        this.onInputOut.dispatch(this, pointer);
    ***REMOVED***
***REMOVED***;

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputDownHandler
* @protected
* @param ***REMOVED***Phaser.Button***REMOVED*** sprite - The Button that the event occurred on.
* @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer - The Pointer that activated the Button.
*/
Phaser.Button.prototype.onInputDownHandler = function (sprite, pointer) ***REMOVED***

    this.changeStateFrame(STATE_DOWN);

    this.playStateSound(STATE_DOWN);

    if (this.onInputDown)
    ***REMOVED***
        this.onInputDown.dispatch(this, pointer);
    ***REMOVED***
***REMOVED***;

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputUpHandler
* @protected
* @param ***REMOVED***Phaser.Button***REMOVED*** sprite - The Button that the event occurred on.
* @param ***REMOVED***Phaser.Pointer***REMOVED*** pointer - The Pointer that activated the Button.
*/
Phaser.Button.prototype.onInputUpHandler = function (sprite, pointer, isOver) ***REMOVED***

    this.playStateSound(STATE_UP);

    //  Input dispatched early, before state change (but after sound)
    if (this.onInputUp)
    ***REMOVED***
        this.onInputUp.dispatch(this, pointer, isOver);
    ***REMOVED***

    if (this.freezeFrames)
    ***REMOVED***
        return;
    ***REMOVED***

    if (this.forceOut === true || (this.forceOut & pointer.pointerMode) === pointer.pointerMode)
    ***REMOVED***
        this.changeStateFrame(STATE_OUT);
    ***REMOVED***
    else
    ***REMOVED***
        var changedUp = this.changeStateFrame(STATE_UP);
        if (!changedUp)
        ***REMOVED***
            //  No Up frame to show..
            if (isOver)
            ***REMOVED***
                this.changeStateFrame(STATE_OVER);
            ***REMOVED***
            else
            ***REMOVED***
                this.changeStateFrame(STATE_OUT);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The SpriteBatch class is a really fast version of the DisplayObjectContainer built purely for speed, so use when you need a lot of sprites or particles.
* It's worth mentioning that by default sprite batches are used through-out the renderer, so you only really need to use a SpriteBatch if you have over
* 1000 sprites that all share the same texture (or texture atlas). It's also useful if running in Canvas mode and you have a lot of un-rotated or un-scaled
* Sprites as it skips all of the Canvas setTransform calls, which helps performance, especially on mobile devices.
*
* Please note that any Sprite that is part of a SpriteBatch will not have its bounds updated, so will fail checks such as outOfBounds.
*
* @class Phaser.SpriteBatch
* @extends Phaser.Group
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***Phaser.Group|Phaser.Sprite|null***REMOVED*** parent - The parent Group, DisplayObject or DisplayObjectContainer that this Group will be added to. If `undefined` or `null` it will use game.world.
* @param ***REMOVED***string***REMOVED*** [name=group] - A name for this Group. Not used internally but useful for debugging.
* @param ***REMOVED***boolean***REMOVED*** [addToStage=false] - If set to true this Group will be added directly to the Game.Stage instead of Game.World.
*/
Phaser.SpriteBatch = function (game, parent, name, addToStage) ***REMOVED***

    if (parent === undefined || parent === null) ***REMOVED*** parent = game.world; ***REMOVED***

    PIXI.SpriteBatch.call(this);

    Phaser.Group.call(this, game, parent, name, addToStage);

    /**
    * @property ***REMOVED***number***REMOVED*** type - Internal Phaser Type value.
    * @protected
    */
    this.type = Phaser.SPRITEBATCH;

***REMOVED***;

Phaser.SpriteBatch.prototype = Phaser.Utils.extend(true, Phaser.SpriteBatch.prototype, PIXI.SpriteBatch.prototype, Phaser.Group.prototype);

Phaser.SpriteBatch.prototype.constructor = Phaser.SpriteBatch;
