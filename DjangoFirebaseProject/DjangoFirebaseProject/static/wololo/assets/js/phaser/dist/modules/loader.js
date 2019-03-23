/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Phaser has one single cache in which it stores all assets.
*
* The cache is split up into sections, such as images, sounds, video, json, etc. All assets are stored using
* a unique string-based key as their identifier. Assets stored in different areas of the cache can have the
* same key, for example 'playerWalking' could be used as the key for both a sprite sheet and an audio file,
* because they are unique data types.
*
* The cache is automatically populated by the Phaser.Loader. When you use the loader to pull in external assets
* such as images they are automatically placed into their respective cache. Most common Game Objects, such as
* Sprites and Videos automatically query the cache to extract the assets they need on instantiation.
*
* You can access the cache from within a State via `this.cache`. From here you can call any public method it has,
* including adding new entries to it, deleting them or querying them.
*
* Understand that almost without exception when you get an item from the cache it will return a reference to the
* item stored in the cache, not a copy of it. Therefore if you retrieve an item and then modify it, the original
* object in the cache will also be updated, even if you don't put it back into the cache again.
*
* By default when you change State the cache is _not_ cleared, although there is an option to clear it should
* your game require it. In a typical game set-up the cache is populated once after the main game has loaded and
* then used as an asset store.
*
* @class Phaser.Cache
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
*/
Phaser.Cache = function (game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - Local reference to game.
    */
    this.game = game;

    /**
    * Automatically resolve resource URLs to absolute paths for use with the Cache.getURL method.
    * @property ***REMOVED***boolean***REMOVED*** autoResolveURL
    */
    this.autoResolveURL = false;

    /**
    * The main cache object into which all resources are placed.
    * @property ***REMOVED***object***REMOVED*** _cache
    * @private
    */
    this._cache = ***REMOVED***
        canvas: ***REMOVED******REMOVED***,
        image: ***REMOVED******REMOVED***,
        texture: ***REMOVED******REMOVED***,
        sound: ***REMOVED******REMOVED***,
        video: ***REMOVED******REMOVED***,
        text: ***REMOVED******REMOVED***,
        json: ***REMOVED******REMOVED***,
        xml: ***REMOVED******REMOVED***,
        physics: ***REMOVED******REMOVED***,
        tilemap: ***REMOVED******REMOVED***,
        binary: ***REMOVED******REMOVED***,
        bitmapData: ***REMOVED******REMOVED***,
        bitmapFont: ***REMOVED******REMOVED***,
        shader: ***REMOVED******REMOVED***,
        renderTexture: ***REMOVED******REMOVED***
    ***REMOVED***;

    /**
    * @property ***REMOVED***object***REMOVED*** _urlMap - Maps URLs to resources.
    * @private
    */
    this._urlMap = ***REMOVED******REMOVED***;

    /**
    * @property ***REMOVED***Image***REMOVED*** _urlResolver - Used to resolve URLs to the absolute path.
    * @private
    */
    this._urlResolver = new Image();

    /**
    * @property ***REMOVED***string***REMOVED*** _urlTemp - Temporary variable to hold a resolved url.
    * @private
    */
    this._urlTemp = null;

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onSoundUnlock - This event is dispatched when the sound system is unlocked via a touch event on cellular devices.
    */
    this.onSoundUnlock = new Phaser.Signal();

    /**
    * @property ***REMOVED***array***REMOVED*** _cacheMap - Const to cache object look-up array.
    * @private
    */
    this._cacheMap = [];

    this._cacheMap[Phaser.Cache.CANVAS] = this._cache.canvas;
    this._cacheMap[Phaser.Cache.IMAGE] = this._cache.image;
    this._cacheMap[Phaser.Cache.TEXTURE] = this._cache.texture;
    this._cacheMap[Phaser.Cache.SOUND] = this._cache.sound;
    this._cacheMap[Phaser.Cache.TEXT] = this._cache.text;
    this._cacheMap[Phaser.Cache.PHYSICS] = this._cache.physics;
    this._cacheMap[Phaser.Cache.TILEMAP] = this._cache.tilemap;
    this._cacheMap[Phaser.Cache.BINARY] = this._cache.binary;
    this._cacheMap[Phaser.Cache.BITMAPDATA] = this._cache.bitmapData;
    this._cacheMap[Phaser.Cache.BITMAPFONT] = this._cache.bitmapFont;
    this._cacheMap[Phaser.Cache.JSON] = this._cache.json;
    this._cacheMap[Phaser.Cache.XML] = this._cache.xml;
    this._cacheMap[Phaser.Cache.VIDEO] = this._cache.video;
    this._cacheMap[Phaser.Cache.SHADER] = this._cache.shader;
    this._cacheMap[Phaser.Cache.RENDER_TEXTURE] = this._cache.renderTexture;

    this.addDefaultImage();
    this.addMissingImage();

***REMOVED***;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Cache.CANVAS = 1;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Cache.IMAGE = 2;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Cache.TEXTURE = 3;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Cache.SOUND = 4;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Cache.TEXT = 5;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Cache.PHYSICS = 6;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Cache.TILEMAP = 7;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Cache.BINARY = 8;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Cache.BITMAPDATA = 9;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Cache.BITMAPFONT = 10;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Cache.JSON = 11;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Cache.XML = 12;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Cache.VIDEO = 13;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Cache.SHADER = 14;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Cache.RENDER_TEXTURE = 15;

/**
* The default image used for a texture when no other is specified.
* @constant
* @type ***REMOVED***PIXI.Texture***REMOVED***
*/
Phaser.Cache.DEFAULT = null;

/**
* The default image used for a texture when the source image is missing.
* @constant
* @type ***REMOVED***PIXI.Texture***REMOVED***
*/
Phaser.Cache.MISSING = null;

Phaser.Cache.prototype = ***REMOVED***

    //////////////////
    //  Add Methods //
    //////////////////

    /**
    * Add a new canvas object in to the cache.
    *
    * @method Phaser.Cache#addCanvas
    * @param ***REMOVED***string***REMOVED*** key - The key that this asset will be stored in the cache under. This should be unique within this cache.
    * @param ***REMOVED***HTMLCanvasElement***REMOVED*** canvas - The Canvas DOM element.
    * @param ***REMOVED***CanvasRenderingContext2D***REMOVED*** [context] - The context of the canvas element. If not specified it will default go `getContext('2d')`.
    */
    addCanvas: function (key, canvas, context) ***REMOVED***

        if (context === undefined) ***REMOVED*** context = canvas.getContext('2d'); ***REMOVED***

        this._cache.canvas[key] = ***REMOVED*** canvas: canvas, context: context ***REMOVED***;

    ***REMOVED***,

    /**
    * Adds an Image file into the Cache. The file must have already been loaded, typically via Phaser.Loader, but can also have been loaded into the DOM.
    * If an image already exists in the cache with the same key then it is removed and destroyed, and the new image inserted in its place.
    *
    * @method Phaser.Cache#addImage
    * @param ***REMOVED***string***REMOVED*** key - The key that this asset will be stored in the cache under. This should be unique within this cache.
    * @param ***REMOVED***string***REMOVED*** url - The URL the asset was loaded from. If the asset was not loaded externally set to `null`.
    * @param ***REMOVED***object***REMOVED*** data - Extra image data.
    * @return ***REMOVED***object***REMOVED*** The full image object that was added to the cache.
    */
    addImage: function (key, url, data) ***REMOVED***

        if (this.checkImageKey(key))
        ***REMOVED***
            this.removeImage(key);
        ***REMOVED***

        var img = ***REMOVED***
            key: key,
            url: url,
            data: data,
            base: new PIXI.BaseTexture(data),
            frame: new Phaser.Frame(0, 0, 0, data.width, data.height, key),
            frameData: new Phaser.FrameData()
        ***REMOVED***;

        img.frameData.addFrame(new Phaser.Frame(0, 0, 0, data.width, data.height, url));

        this._cache.image[key] = img;

        this._resolveURL(url, img);

        if (key === '__default')
        ***REMOVED***
            Phaser.Cache.DEFAULT = new PIXI.Texture(img.base);
        ***REMOVED***
        else if (key === '__missing')
        ***REMOVED***
            Phaser.Cache.MISSING = new PIXI.Texture(img.base);
        ***REMOVED***

        return img;

    ***REMOVED***,

    /**
    * Adds a default image to be used in special cases such as WebGL Filters.
    * It uses the special reserved key of `__default`.
    * This method is called automatically when the Cache is created.
    * This image is skipped when `Cache.destroy` is called due to its internal requirements.
    *
    * @method Phaser.Cache#addDefaultImage
    * @protected
    */
    addDefaultImage: function () ***REMOVED***

        var img = new Image();

        img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAQMAAABJtOi3AAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABVJREFUeF7NwIEAAAAAgKD9qdeocAMAoAABm3DkcAAAAABJRU5ErkJggg==";

        var obj = this.addImage('__default', null, img);

        //  Because we don't want to invalidate the sprite batch for an invisible texture
        obj.base.skipRender = true;

        //  Make it easily available within the rest of Phaser / Pixi
        Phaser.Cache.DEFAULT = new PIXI.Texture(obj.base);

    ***REMOVED***,

    /**
    * Adds an image to be used when a key is wrong / missing.
    * It uses the special reserved key of `__missing`.
    * This method is called automatically when the Cache is created.
    * This image is skipped when `Cache.destroy` is called due to its internal requirements.
    *
    * @method Phaser.Cache#addMissingImage
    * @protected
    */
    addMissingImage: function () ***REMOVED***

        var img = new Image();

        img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJ9JREFUeNq01ssOwyAMRFG46v//Mt1ESmgh+DFmE2GPOBARKb2NVjo+17PXLD8a1+pl5+A+wSgFygymWYHBb0FtsKhJDdZlncG2IzJ4ayoMDv20wTmSMzClEgbWYNTAkQ0Z+OJ+A/eWnAaR9+oxCF4Os0H8htsMUp+pwcgBBiMNnAwF8GqIgL2hAzaGFFgZauDPKABmowZ4GL369/0rwACp2yA/ttmvsQAAAABJRU5ErkJggg==";

        var obj = this.addImage('__missing', null, img);

        //  Make it easily available within the rest of Phaser / Pixi
        Phaser.Cache.MISSING = new PIXI.Texture(obj.base);

    ***REMOVED***,

    /**
    * Adds a Sound file into the Cache. The file must have already been loaded, typically via Phaser.Loader.
    *
    * @method Phaser.Cache#addSound
    * @param ***REMOVED***string***REMOVED*** key - The key that this asset will be stored in the cache under. This should be unique within this cache.
    * @param ***REMOVED***string***REMOVED*** url - The URL the asset was loaded from. If the asset was not loaded externally set to `null`.
    * @param ***REMOVED***object***REMOVED*** data - Extra sound data.
    * @param ***REMOVED***boolean***REMOVED*** webAudio - True if the file is using web audio.
    * @param ***REMOVED***boolean***REMOVED*** audioTag - True if the file is using legacy HTML audio.
    */
    addSound: function (key, url, data, webAudio, audioTag) ***REMOVED***

        if (webAudio === undefined) ***REMOVED*** webAudio = true; audioTag = false; ***REMOVED***
        if (audioTag === undefined) ***REMOVED*** webAudio = false; audioTag = true; ***REMOVED***

        var decoded = false;

        if (audioTag)
        ***REMOVED***
            decoded = true;
        ***REMOVED***

        this._cache.sound[key] = ***REMOVED***
            url: url,
            data: data,
            isDecoding: false,
            decoded: decoded,
            webAudio: webAudio,
            audioTag: audioTag,
            locked: this.game.sound.touchLocked
        ***REMOVED***;

        this._resolveURL(url, this._cache.sound[key]);

    ***REMOVED***,

    /**
    * Add a new text data.
    *
    * @method Phaser.Cache#addText
    * @param ***REMOVED***string***REMOVED*** key - The key that this asset will be stored in the cache under. This should be unique within this cache.
    * @param ***REMOVED***string***REMOVED*** url - The URL the asset was loaded from. If the asset was not loaded externally set to `null`.
    * @param ***REMOVED***object***REMOVED*** data - Extra text data.
    */
    addText: function (key, url, data) ***REMOVED***

        this._cache.text[key] = ***REMOVED*** url: url, data: data ***REMOVED***;

        this._resolveURL(url, this._cache.text[key]);

    ***REMOVED***,

    /**
    * Add a new physics data object to the Cache.
    *
    * @method Phaser.Cache#addPhysicsData
    * @param ***REMOVED***string***REMOVED*** key - The key that this asset will be stored in the cache under. This should be unique within this cache.
    * @param ***REMOVED***string***REMOVED*** url - The URL the asset was loaded from. If the asset was not loaded externally set to `null`.
    * @param ***REMOVED***object***REMOVED*** JSONData - The physics data object (a JSON file).
    * @param ***REMOVED***number***REMOVED*** format - The format of the physics data.
    */
    addPhysicsData: function (key, url, JSONData, format) ***REMOVED***

        this._cache.physics[key] = ***REMOVED*** url: url, data: JSONData, format: format ***REMOVED***;

        this._resolveURL(url, this._cache.physics[key]);

    ***REMOVED***,

    /**
    * Add a new tilemap to the Cache.
    *
    * @method Phaser.Cache#addTilemap
    * @param ***REMOVED***string***REMOVED*** key - The key that this asset will be stored in the cache under. This should be unique within this cache.
    * @param ***REMOVED***string***REMOVED*** url - The URL the asset was loaded from. If the asset was not loaded externally set to `null`.
    * @param ***REMOVED***object***REMOVED*** mapData - The tilemap data object (either a CSV or JSON file).
    * @param ***REMOVED***number***REMOVED*** format - The format of the tilemap data.
    */
    addTilemap: function (key, url, mapData, format) ***REMOVED***

        this._cache.tilemap[key] = ***REMOVED*** url: url, data: mapData, format: format ***REMOVED***;

        this._resolveURL(url, this._cache.tilemap[key]);

    ***REMOVED***,

    /**
    * Add a binary object in to the cache.
    *
    * @method Phaser.Cache#addBinary
    * @param ***REMOVED***string***REMOVED*** key - The key that this asset will be stored in the cache under. This should be unique within this cache.
    * @param ***REMOVED***object***REMOVED*** binaryData - The binary object to be added to the cache.
    */
    addBinary: function (key, binaryData) ***REMOVED***

        this._cache.binary[key] = binaryData;

    ***REMOVED***,

    /**
    * Add a BitmapData object to the cache.
    *
    * @method Phaser.Cache#addBitmapData
    * @param ***REMOVED***string***REMOVED*** key - The key that this asset will be stored in the cache under. This should be unique within this cache.
    * @param ***REMOVED***Phaser.BitmapData***REMOVED*** bitmapData - The BitmapData object to be addded to the cache.
    * @param ***REMOVED***Phaser.FrameData|null***REMOVED*** [frameData=(auto create)] - Optional FrameData set associated with the given BitmapData. If not specified (or `undefined`) a new FrameData object is created containing the Bitmap's Frame. If `null` is supplied then no FrameData will be created.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** The BitmapData object to be addded to the cache.
    */
    addBitmapData: function (key, bitmapData, frameData) ***REMOVED***

        bitmapData.key = key;

        if (frameData === undefined)
        ***REMOVED***
            frameData = new Phaser.FrameData();
            frameData.addFrame(bitmapData.textureFrame);
        ***REMOVED***

        this._cache.bitmapData[key] = ***REMOVED*** data: bitmapData, frameData: frameData ***REMOVED***;

        return bitmapData;

    ***REMOVED***,

    /**
    * Add a new Bitmap Font to the Cache.
    *
    * @method Phaser.Cache#addBitmapFont
    * @param ***REMOVED***string***REMOVED*** key - The key that this asset will be stored in the cache under. This should be unique within this cache.
    * @param ***REMOVED***string***REMOVED*** url - The URL the asset was loaded from. If the asset was not loaded externally set to `null`.
    * @param ***REMOVED***object***REMOVED*** data - Extra font data.
    * @param ***REMOVED***object***REMOVED*** atlasData - Texture atlas frames data.
    * @param ***REMOVED***string***REMOVED*** [atlasType='xml'] - The format of the texture atlas ( 'json' or 'xml' ).
    * @param ***REMOVED***number***REMOVED*** [xSpacing=0] - If you'd like to add additional horizontal spacing between the characters then set the pixel value here.
    * @param ***REMOVED***number***REMOVED*** [ySpacing=0] - If you'd like to add additional vertical spacing between the lines then set the pixel value here.
    */
    addBitmapFont: function (key, url, data, atlasData, atlasType, xSpacing, ySpacing) ***REMOVED***

        var obj = ***REMOVED***
            url: url,
            data: data,
            font: null,
            base: new PIXI.BaseTexture(data)
        ***REMOVED***;

        if (xSpacing === undefined) ***REMOVED*** xSpacing = 0; ***REMOVED***
        if (ySpacing === undefined) ***REMOVED*** ySpacing = 0; ***REMOVED***

        if (atlasType === 'json')
        ***REMOVED***
            obj.font = Phaser.LoaderParser.jsonBitmapFont(atlasData, obj.base, xSpacing, ySpacing);
        ***REMOVED***
        else
        ***REMOVED***
            obj.font = Phaser.LoaderParser.xmlBitmapFont(atlasData, obj.base, xSpacing, ySpacing);
        ***REMOVED***

        this._cache.bitmapFont[key] = obj;

        this._resolveURL(url, obj);

    ***REMOVED***,

    /**
    * Add a new json object into the cache.
    *
    * @method Phaser.Cache#addJSON
    * @param ***REMOVED***string***REMOVED*** key - The key that this asset will be stored in the cache under. This should be unique within this cache.
    * @param ***REMOVED***string***REMOVED*** url - The URL the asset was loaded from. If the asset was not loaded externally set to `null`.
    * @param ***REMOVED***object***REMOVED*** data - Extra json data.
    */
    addJSON: function (key, url, data) ***REMOVED***

        this._cache.json[key] = ***REMOVED*** url: url, data: data ***REMOVED***;

        this._resolveURL(url, this._cache.json[key]);

    ***REMOVED***,

    /**
    * Add a new xml object into the cache.
    *
    * @method Phaser.Cache#addXML
    * @param ***REMOVED***string***REMOVED*** key - The key that this asset will be stored in the cache under. This should be unique within this cache.
    * @param ***REMOVED***string***REMOVED*** url - The URL the asset was loaded from. If the asset was not loaded externally set to `null`.
    * @param ***REMOVED***object***REMOVED*** data - Extra text data.
    */
    addXML: function (key, url, data) ***REMOVED***

        this._cache.xml[key] = ***REMOVED*** url: url, data: data ***REMOVED***;

        this._resolveURL(url, this._cache.xml[key]);

    ***REMOVED***,

    /**
    * Adds a Video file into the Cache. The file must have already been loaded, typically via Phaser.Loader.
    *
    * @method Phaser.Cache#addVideo
    * @param ***REMOVED***string***REMOVED*** key - The key that this asset will be stored in the cache under. This should be unique within this cache.
    * @param ***REMOVED***string***REMOVED*** url - The URL the asset was loaded from. If the asset was not loaded externally set to `null`.
    * @param ***REMOVED***object***REMOVED*** data - Extra video data.
    * @param ***REMOVED***boolean***REMOVED*** isBlob - True if the file was preloaded via xhr and the data parameter is a Blob. false if a Video tag was created instead.
    */
    addVideo: function (key, url, data, isBlob) ***REMOVED***

        this._cache.video[key] = ***REMOVED*** url: url, data: data, isBlob: isBlob, locked: true ***REMOVED***;

        this._resolveURL(url, this._cache.video[key]);

    ***REMOVED***,

    /**
    * Adds a Fragment Shader in to the Cache. The file must have already been loaded, typically via Phaser.Loader.
    *
    * @method Phaser.Cache#addShader
    * @param ***REMOVED***string***REMOVED*** key - The key that this asset will be stored in the cache under. This should be unique within this cache.
    * @param ***REMOVED***string***REMOVED*** url - The URL the asset was loaded from. If the asset was not loaded externally set to `null`.
    * @param ***REMOVED***object***REMOVED*** data - Extra shader data.
    */
    addShader: function (key, url, data) ***REMOVED***

        this._cache.shader[key] = ***REMOVED*** url: url, data: data ***REMOVED***;

        this._resolveURL(url, this._cache.shader[key]);

    ***REMOVED***,

    /**
    * Add a new Phaser.RenderTexture in to the cache.
    *
    * @method Phaser.Cache#addRenderTexture
    * @param ***REMOVED***string***REMOVED*** key - The key that this asset will be stored in the cache under. This should be unique within this cache.
    * @param ***REMOVED***Phaser.RenderTexture***REMOVED*** texture - The texture to use as the base of the RenderTexture.
    */
    addRenderTexture: function (key, texture) ***REMOVED***

        this._cache.renderTexture[key] = ***REMOVED*** texture: texture, frame: new Phaser.Frame(0, 0, 0, texture.width, texture.height, '', '') ***REMOVED***;

    ***REMOVED***,

    /**
    * Add a new sprite sheet in to the cache.
    *
    * @method Phaser.Cache#addSpriteSheet
    * @param ***REMOVED***string***REMOVED*** key - The key that this asset will be stored in the cache under. This should be unique within this cache.
    * @param ***REMOVED***string***REMOVED*** url - The URL the asset was loaded from. If the asset was not loaded externally set to `null`.
    * @param ***REMOVED***object***REMOVED*** data - Extra sprite sheet data.
    * @param ***REMOVED***number***REMOVED*** frameWidth - Width of the sprite sheet.
    * @param ***REMOVED***number***REMOVED*** frameHeight - Height of the sprite sheet.
    * @param ***REMOVED***number***REMOVED*** [frameMax=-1] - How many frames stored in the sprite sheet. If -1 then it divides the whole sheet evenly.
    * @param ***REMOVED***number***REMOVED*** [margin=0] - If the frames have been drawn with a margin, specify the amount here.
    * @param ***REMOVED***number***REMOVED*** [spacing=0] - If the frames have been drawn with spacing between them, specify the amount here.
    */
    addSpriteSheet: function (key, url, data, frameWidth, frameHeight, frameMax, margin, spacing) ***REMOVED***

        if (frameMax === undefined) ***REMOVED*** frameMax = -1; ***REMOVED***
        if (margin === undefined) ***REMOVED*** margin = 0; ***REMOVED***
        if (spacing === undefined) ***REMOVED*** spacing = 0; ***REMOVED***

        var obj = ***REMOVED***
            key: key,
            url: url,
            data: data,
            frameWidth: frameWidth,
            frameHeight: frameHeight,
            margin: margin,
            spacing: spacing,
            base: new PIXI.BaseTexture(data),
            frameData: Phaser.AnimationParser.spriteSheet(this.game, data, frameWidth, frameHeight, frameMax, margin, spacing)
        ***REMOVED***;

        this._cache.image[key] = obj;

        this._resolveURL(url, obj);

    ***REMOVED***,

    /**
    * Add a new texture atlas to the Cache.
    *
    * @method Phaser.Cache#addTextureAtlas
    * @param ***REMOVED***string***REMOVED*** key - The key that this asset will be stored in the cache under. This should be unique within this cache.
    * @param ***REMOVED***string***REMOVED*** url - The URL the asset was loaded from. If the asset was not loaded externally set to `null`.
    * @param ***REMOVED***object***REMOVED*** data - Extra texture atlas data.
    * @param ***REMOVED***object***REMOVED*** atlasData  - Texture atlas frames data.
    * @param ***REMOVED***number***REMOVED*** format - The format of the texture atlas.
    */
    addTextureAtlas: function (key, url, data, atlasData, format) ***REMOVED***

        var obj = ***REMOVED***
            key: key,
            url: url,
            data: data,
            base: new PIXI.BaseTexture(data)
        ***REMOVED***;

        if (format === Phaser.Loader.TEXTURE_ATLAS_XML_STARLING)
        ***REMOVED***
            obj.frameData = Phaser.AnimationParser.XMLData(this.game, atlasData, key);
        ***REMOVED***
        else if (format === Phaser.Loader.TEXTURE_ATLAS_JSON_PYXEL)
        ***REMOVED***
            obj.frameData = Phaser.AnimationParser.JSONDataPyxel(this.game, atlasData, key);
        ***REMOVED***
        else
        ***REMOVED***
            //  Let's just work it out from the frames array
            if (Array.isArray(atlasData.frames))
            ***REMOVED***
                obj.frameData = Phaser.AnimationParser.JSONData(this.game, atlasData, key);
            ***REMOVED***
            else
            ***REMOVED***
                obj.frameData = Phaser.AnimationParser.JSONDataHash(this.game, atlasData, key);
            ***REMOVED***
        ***REMOVED***

        this._cache.image[key] = obj;

        this._resolveURL(url, obj);

    ***REMOVED***,

    ////////////////////////////
    //  Sound Related Methods //
    ////////////////////////////

    /**
    * Reload a Sound file from the server.
    *
    * @method Phaser.Cache#reloadSound
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    */
    reloadSound: function (key) ***REMOVED***

        var _this = this;

        var sound = this.getSound(key);

        if (sound)
        ***REMOVED***
            sound.data.src = sound.url;

            sound.data.addEventListener('canplaythrough', function () ***REMOVED***
                return _this.reloadSoundComplete(key);
            ***REMOVED***, false);

            sound.data.load();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Fires the onSoundUnlock event when the sound has completed reloading.
    *
    * @method Phaser.Cache#reloadSoundComplete
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    */
    reloadSoundComplete: function (key) ***REMOVED***

        var sound = this.getSound(key);

        if (sound)
        ***REMOVED***
            sound.locked = false;
            this.onSoundUnlock.dispatch(key);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Updates the sound object in the cache.
    *
    * @method Phaser.Cache#updateSound
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    */
    updateSound: function (key, property, value) ***REMOVED***

        var sound = this.getSound(key);

        if (sound)
        ***REMOVED***
            sound[property] = value;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Add a new decoded sound.
    *
    * @method Phaser.Cache#decodedSound
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @param ***REMOVED***object***REMOVED*** data - Extra sound data.
    */
    decodedSound: function (key, data) ***REMOVED***

        var sound = this.getSound(key);

        sound.data = data;
        sound.decoded = true;
        sound.isDecoding = false;

    ***REMOVED***,

    /**
    * Check if the given sound has finished decoding.
    *
    * @method Phaser.Cache#isSoundDecoded
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @return ***REMOVED***boolean***REMOVED*** The decoded state of the Sound object.
    */
    isSoundDecoded: function (key) ***REMOVED***

        var sound = this.getItem(key, Phaser.Cache.SOUND, 'isSoundDecoded');

        if (sound)
        ***REMOVED***
            return sound.decoded;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Check if the given sound is ready for playback.
    * A sound is considered ready when it has finished decoding and the device is no longer touch locked.
    *
    * @method Phaser.Cache#isSoundReady
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @return ***REMOVED***boolean***REMOVED*** True if the sound is decoded and the device is not touch locked.
    */
    isSoundReady: function (key) ***REMOVED***

        var sound = this.getItem(key, Phaser.Cache.SOUND, 'isSoundDecoded');

        if (sound)
        ***REMOVED***
            return (sound.decoded && !this.game.sound.touchLocked);
        ***REMOVED***

    ***REMOVED***,

    ////////////////////////
    //  Check Key Methods //
    ////////////////////////

    /**
    * Checks if a key for the given cache object type exists.
    *
    * @method Phaser.Cache#checkKey
    * @param ***REMOVED***integer***REMOVED*** cache - The cache to search. One of the Cache consts such as `Phaser.Cache.IMAGE` or `Phaser.Cache.SOUND`.
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @return ***REMOVED***boolean***REMOVED*** True if the key exists, otherwise false.
    */
    checkKey: function (cache, key) ***REMOVED***

        if (this._cacheMap[cache][key])
        ***REMOVED***
            return true;
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Checks if the given URL has been loaded into the Cache.
    * This method will only work if Cache.autoResolveURL was set to `true` before any preloading took place.
    * The method will make a DOM src call to the URL given, so please be aware of this for certain file types, such as Sound files on Firefox
    * which may cause double-load instances.
    *
    * @method Phaser.Cache#checkURL
    * @param ***REMOVED***string***REMOVED*** url - The url to check for in the cache.
    * @return ***REMOVED***boolean***REMOVED*** True if the url exists, otherwise false.
    */
    checkURL: function (url) ***REMOVED***

        if (this._urlMap[this._resolveURL(url)])
        ***REMOVED***
            return true;
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Checks if the given key exists in the Canvas Cache.
    *
    * @method Phaser.Cache#checkCanvasKey
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @return ***REMOVED***boolean***REMOVED*** True if the key exists in the cache, otherwise false.
    */
    checkCanvasKey: function (key) ***REMOVED***

        return this.checkKey(Phaser.Cache.CANVAS, key);

    ***REMOVED***,

    /**
    * Checks if the given key exists in the Image Cache. Note that this also includes Texture Atlases, Sprite Sheets and Retro Fonts.
    *
    * @method Phaser.Cache#checkImageKey
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @return ***REMOVED***boolean***REMOVED*** True if the key exists in the cache, otherwise false.
    */
    checkImageKey: function (key) ***REMOVED***

        return this.checkKey(Phaser.Cache.IMAGE, key);

    ***REMOVED***,

    /**
    * Checks if the given key exists in the Texture Cache.
    *
    * @method Phaser.Cache#checkTextureKey
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @return ***REMOVED***boolean***REMOVED*** True if the key exists in the cache, otherwise false.
    */
    checkTextureKey: function (key) ***REMOVED***

        return this.checkKey(Phaser.Cache.TEXTURE, key);

    ***REMOVED***,

    /**
    * Checks if the given key exists in the Sound Cache.
    *
    * @method Phaser.Cache#checkSoundKey
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @return ***REMOVED***boolean***REMOVED*** True if the key exists in the cache, otherwise false.
    */
    checkSoundKey: function (key) ***REMOVED***

        return this.checkKey(Phaser.Cache.SOUND, key);

    ***REMOVED***,

    /**
    * Checks if the given key exists in the Text Cache.
    *
    * @method Phaser.Cache#checkTextKey
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @return ***REMOVED***boolean***REMOVED*** True if the key exists in the cache, otherwise false.
    */
    checkTextKey: function (key) ***REMOVED***

        return this.checkKey(Phaser.Cache.TEXT, key);

    ***REMOVED***,

    /**
    * Checks if the given key exists in the Physics Cache.
    *
    * @method Phaser.Cache#checkPhysicsKey
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @return ***REMOVED***boolean***REMOVED*** True if the key exists in the cache, otherwise false.
    */
    checkPhysicsKey: function (key) ***REMOVED***

        return this.checkKey(Phaser.Cache.PHYSICS, key);

    ***REMOVED***,

    /**
    * Checks if the given key exists in the Tilemap Cache.
    *
    * @method Phaser.Cache#checkTilemapKey
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @return ***REMOVED***boolean***REMOVED*** True if the key exists in the cache, otherwise false.
    */
    checkTilemapKey: function (key) ***REMOVED***

        return this.checkKey(Phaser.Cache.TILEMAP, key);

    ***REMOVED***,

    /**
    * Checks if the given key exists in the Binary Cache.
    *
    * @method Phaser.Cache#checkBinaryKey
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @return ***REMOVED***boolean***REMOVED*** True if the key exists in the cache, otherwise false.
    */
    checkBinaryKey: function (key) ***REMOVED***

        return this.checkKey(Phaser.Cache.BINARY, key);

    ***REMOVED***,

    /**
    * Checks if the given key exists in the BitmapData Cache.
    *
    * @method Phaser.Cache#checkBitmapDataKey
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @return ***REMOVED***boolean***REMOVED*** True if the key exists in the cache, otherwise false.
    */
    checkBitmapDataKey: function (key) ***REMOVED***

        return this.checkKey(Phaser.Cache.BITMAPDATA, key);

    ***REMOVED***,

    /**
    * Checks if the given key exists in the BitmapFont Cache.
    *
    * @method Phaser.Cache#checkBitmapFontKey
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @return ***REMOVED***boolean***REMOVED*** True if the key exists in the cache, otherwise false.
    */
    checkBitmapFontKey: function (key) ***REMOVED***

        return this.checkKey(Phaser.Cache.BITMAPFONT, key);

    ***REMOVED***,

    /**
    * Checks if the given key exists in the JSON Cache.
    *
    * @method Phaser.Cache#checkJSONKey
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @return ***REMOVED***boolean***REMOVED*** True if the key exists in the cache, otherwise false.
    */
    checkJSONKey: function (key) ***REMOVED***

        return this.checkKey(Phaser.Cache.JSON, key);

    ***REMOVED***,

    /**
    * Checks if the given key exists in the XML Cache.
    *
    * @method Phaser.Cache#checkXMLKey
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @return ***REMOVED***boolean***REMOVED*** True if the key exists in the cache, otherwise false.
    */
    checkXMLKey: function (key) ***REMOVED***

        return this.checkKey(Phaser.Cache.XML, key);

    ***REMOVED***,

    /**
    * Checks if the given key exists in the Video Cache.
    *
    * @method Phaser.Cache#checkVideoKey
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @return ***REMOVED***boolean***REMOVED*** True if the key exists in the cache, otherwise false.
    */
    checkVideoKey: function (key) ***REMOVED***

        return this.checkKey(Phaser.Cache.VIDEO, key);

    ***REMOVED***,

    /**
    * Checks if the given key exists in the Fragment Shader Cache.
    *
    * @method Phaser.Cache#checkShaderKey
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @return ***REMOVED***boolean***REMOVED*** True if the key exists in the cache, otherwise false.
    */
    checkShaderKey: function (key) ***REMOVED***

        return this.checkKey(Phaser.Cache.SHADER, key);

    ***REMOVED***,

    /**
    * Checks if the given key exists in the Render Texture Cache.
    *
    * @method Phaser.Cache#checkRenderTextureKey
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @return ***REMOVED***boolean***REMOVED*** True if the key exists in the cache, otherwise false.
    */
    checkRenderTextureKey: function (key) ***REMOVED***

        return this.checkKey(Phaser.Cache.RENDER_TEXTURE, key);

    ***REMOVED***,

    ////////////////
    //  Get Items //
    ////////////////

    /**
    * Get an item from a cache based on the given key and property.
    *
    * This method is mostly used internally by other Cache methods such as `getImage` but is exposed
    * publicly for your own use as well.
    *
    * @method Phaser.Cache#getItem
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset within the cache.
    * @param ***REMOVED***integer***REMOVED*** cache - The cache to search. One of the Cache consts such as `Phaser.Cache.IMAGE` or `Phaser.Cache.SOUND`.
    * @param ***REMOVED***string***REMOVED*** [method] - The string name of the method calling getItem. Can be empty, in which case no console warning is output.
    * @param ***REMOVED***string***REMOVED*** [property] - If you require a specific property from the cache item, specify it here.
    * @return ***REMOVED***object***REMOVED*** The cached item if found, otherwise `null`. If the key is invalid and `method` is set then a console.warn is output.
    */
    getItem: function (key, cache, method, property) ***REMOVED***

        if (!this.checkKey(cache, key))
        ***REMOVED***
            if (method)
            ***REMOVED***
                console.warn('Phaser.Cache.' + method + ': Key "' + key + '" not found in Cache.');
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            if (property === undefined)
            ***REMOVED***
                return this._cacheMap[cache][key];
            ***REMOVED***
            else
            ***REMOVED***
                return this._cacheMap[cache][key][property];
            ***REMOVED***
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Gets a Canvas object from the cache.
    *
    * The object is looked-up based on the key given.
    *
    * Note: If the object cannot be found a `console.warn` message is displayed.
    *
    * @method Phaser.Cache#getCanvas
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset to retrieve from the cache.
    * @return ***REMOVED***object***REMOVED*** The canvas object or `null` if no item could be found matching the given key.
    */
    getCanvas: function (key) ***REMOVED***

        return this.getItem(key, Phaser.Cache.CANVAS, 'getCanvas', 'canvas');

    ***REMOVED***,

    /**
    * Gets a Image object from the cache. This returns a DOM Image object, not a Phaser.Image object.
    *
    * The object is looked-up based on the key given.
    *
    * Note: If the object cannot be found a `console.warn` message is displayed.
    *
    * Only the Image cache is searched, which covers images loaded via Loader.image, Sprite Sheets and Texture Atlases.
    *
    * If you need the image used by a bitmap font or similar then please use those respective 'get' methods.
    *
    * @method Phaser.Cache#getImage
    * @param ***REMOVED***string***REMOVED*** [key] - The key of the asset to retrieve from the cache. If not given or null it will return a default image. If given but not found in the cache it will throw a warning and return the missing image.
    * @param ***REMOVED***boolean***REMOVED*** [full=false] - If true the full image object will be returned, if false just the HTML Image object is returned.
    * @return ***REMOVED***Image***REMOVED*** The Image object if found in the Cache, otherwise `null`. If `full` was true then a JavaScript object is returned.
    */
    getImage: function (key, full) ***REMOVED***

        if (key === undefined || key === null)
        ***REMOVED***
            key = '__default';
        ***REMOVED***

        if (full === undefined) ***REMOVED*** full = false; ***REMOVED***

        var img = this.getItem(key, Phaser.Cache.IMAGE, 'getImage');

        if (img === null)
        ***REMOVED***
            img = this.getItem('__missing', Phaser.Cache.IMAGE, 'getImage');
        ***REMOVED***

        if (full)
        ***REMOVED***
            return img;
        ***REMOVED***
        else
        ***REMOVED***
            return img.data;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Get a single texture frame by key.
    *
    * You'd only do this to get the default Frame created for a non-atlas / spritesheet image.
    *
    * @method Phaser.Cache#getTextureFrame
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset to retrieve from the cache.
    * @return ***REMOVED***Phaser.Frame***REMOVED*** The frame data.
    */
    getTextureFrame: function (key) ***REMOVED***

        return this.getItem(key, Phaser.Cache.TEXTURE, 'getTextureFrame', 'frame');

    ***REMOVED***,

    /**
    * Gets a Phaser.Sound object from the cache.
    *
    * The object is looked-up based on the key given.
    *
    * Note: If the object cannot be found a `console.warn` message is displayed.
    *
    * @method Phaser.Cache#getSound
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset to retrieve from the cache.
    * @return ***REMOVED***Phaser.Sound***REMOVED*** The sound object.
    */
    getSound: function (key) ***REMOVED***

        return this.getItem(key, Phaser.Cache.SOUND, 'getSound');

    ***REMOVED***,

    /**
    * Gets a raw Sound data object from the cache.
    *
    * The object is looked-up based on the key given.
    *
    * Note: If the object cannot be found a `console.warn` message is displayed.
    *
    * @method Phaser.Cache#getSoundData
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset to retrieve from the cache.
    * @return ***REMOVED***object***REMOVED*** The sound data.
    */
    getSoundData: function (key) ***REMOVED***

        return this.getItem(key, Phaser.Cache.SOUND, 'getSoundData', 'data');

    ***REMOVED***,

    /**
    * Gets a Text object from the cache.
    *
    * The object is looked-up based on the key given.
    *
    * Note: If the object cannot be found a `console.warn` message is displayed.
    *
    * @method Phaser.Cache#getText
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset to retrieve from the cache.
    * @return ***REMOVED***object***REMOVED*** The text data.
    */
    getText: function (key) ***REMOVED***

        return this.getItem(key, Phaser.Cache.TEXT, 'getText', 'data');

    ***REMOVED***,

    /**
    * Gets a Physics Data object from the cache.
    *
    * The object is looked-up based on the key given.
    *
    * Note: If the object cannot be found a `console.warn` message is displayed.
    *
    * You can get either the entire data set, a single object or a single fixture of an object from it.
    *
    * @method Phaser.Cache#getPhysicsData
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset to retrieve from the cache.
    * @param ***REMOVED***string***REMOVED*** [object=null] - If specified it will return just the physics object that is part of the given key, if null it will return them all.
    * @param ***REMOVED***string***REMOVED*** fixtureKey - Fixture key of fixture inside an object. This key can be set per fixture with the Phaser Exporter.
    * @return ***REMOVED***object***REMOVED*** The requested physics object data if found.
    */
    getPhysicsData: function (key, object, fixtureKey) ***REMOVED***

        var data = this.getItem(key, Phaser.Cache.PHYSICS, 'getPhysicsData', 'data');

        if (data === null || object === undefined || object === null)
        ***REMOVED***
            return data;
        ***REMOVED***
        else
        ***REMOVED***
            if (data[object])
            ***REMOVED***
                var fixtures = data[object];

                //  Try to find a fixture by its fixture key if given
                if (fixtures && fixtureKey)
                ***REMOVED***
                    for (var fixture in fixtures)
                    ***REMOVED***
                        //  This contains the fixture data of a polygon or a circle
                        fixture = fixtures[fixture];

                        //  Test the key
                        if (fixture.fixtureKey === fixtureKey)
                        ***REMOVED***
                            return fixture;
                        ***REMOVED***
                    ***REMOVED***

                    //  We did not find the requested fixture
                    console.warn('Phaser.Cache.getPhysicsData: Could not find given fixtureKey: "' + fixtureKey + ' in ' + key + '"');
                ***REMOVED***
                else
                ***REMOVED***
                    return fixtures;
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                console.warn('Phaser.Cache.getPhysicsData: Invalid key/object: "' + key + ' / ' + object + '"');
            ***REMOVED***
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Gets a raw Tilemap data object from the cache. This will be in either CSV or JSON format.
    *
    * The object is looked-up based on the key given.
    *
    * Note: If the object cannot be found a `console.warn` message is displayed.
    *
    * @method Phaser.Cache#getTilemapData
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset to retrieve from the cache.
    * @return ***REMOVED***object***REMOVED*** The raw tilemap data in CSV or JSON format.
    */
    getTilemapData: function (key) ***REMOVED***

        return this.getItem(key, Phaser.Cache.TILEMAP, 'getTilemapData');

    ***REMOVED***,

    /**
    * Gets a binary object from the cache.
    *
    * The object is looked-up based on the key given.
    *
    * Note: If the object cannot be found a `console.warn` message is displayed.
    *
    * @method Phaser.Cache#getBinary
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset to retrieve from the cache.
    * @return ***REMOVED***object***REMOVED*** The binary data object.
    */
    getBinary: function (key) ***REMOVED***

        return this.getItem(key, Phaser.Cache.BINARY, 'getBinary');

    ***REMOVED***,

    /**
    * Gets a BitmapData object from the cache.
    *
    * The object is looked-up based on the key given.
    *
    * Note: If the object cannot be found a `console.warn` message is displayed.
    *
    * @method Phaser.Cache#getBitmapData
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset to retrieve from the cache.
    * @return ***REMOVED***Phaser.BitmapData***REMOVED*** The requested BitmapData object if found, or null if not.
    */
    getBitmapData: function (key) ***REMOVED***

        return this.getItem(key, Phaser.Cache.BITMAPDATA, 'getBitmapData', 'data');

    ***REMOVED***,

    /**
    * Gets a Bitmap Font object from the cache.
    *
    * The object is looked-up based on the key given.
    *
    * Note: If the object cannot be found a `console.warn` message is displayed.
    *
    * @method Phaser.Cache#getBitmapFont
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset to retrieve from the cache.
    * @return ***REMOVED***Phaser.BitmapFont***REMOVED*** The requested BitmapFont object if found, or null if not.
    */
    getBitmapFont: function (key) ***REMOVED***

        return this.getItem(key, Phaser.Cache.BITMAPFONT, 'getBitmapFont');

    ***REMOVED***,

    /**
    * Gets a JSON object from the cache.
    *
    * The object is looked-up based on the key given.
    *
    * Note: If the object cannot be found a `console.warn` message is displayed.
    *
    * You can either return the object by reference (the default), or return a clone
    * of it by setting the `clone` argument to `true`.
    *
    * @method Phaser.Cache#getJSON
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset to retrieve from the cache.
    * @param ***REMOVED***boolean***REMOVED*** [clone=false] - Return a clone of the original object (true) or a reference to it? (false)
    * @return ***REMOVED***object***REMOVED*** The JSON object, or an Array if the key points to an Array property. If the property wasn't found, it returns null.
    */
    getJSON: function (key, clone) ***REMOVED***

        var data = this.getItem(key, Phaser.Cache.JSON, 'getJSON', 'data');

        if (data)
        ***REMOVED***
            if (clone)
            ***REMOVED***
                return Phaser.Utils.extend(true, Array.isArray(data) ? [] : ***REMOVED******REMOVED***, data);
            ***REMOVED***
            else
            ***REMOVED***
                return data;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            return null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Gets an XML object from the cache.
    *
    * The object is looked-up based on the key given.
    *
    * Note: If the object cannot be found a `console.warn` message is displayed.
    *
    * @method Phaser.Cache#getXML
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset to retrieve from the cache.
    * @return ***REMOVED***object***REMOVED*** The XML object.
    */
    getXML: function (key) ***REMOVED***

        return this.getItem(key, Phaser.Cache.XML, 'getXML', 'data');

    ***REMOVED***,

    /**
    * Gets a Phaser.Video object from the cache.
    *
    * The object is looked-up based on the key given.
    *
    * Note: If the object cannot be found a `console.warn` message is displayed.
    *
    * @method Phaser.Cache#getVideo
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset to retrieve from the cache.
    * @return ***REMOVED***Phaser.Video***REMOVED*** The video object.
    */
    getVideo: function (key) ***REMOVED***

        return this.getItem(key, Phaser.Cache.VIDEO, 'getVideo');

    ***REMOVED***,

    /**
    * Gets a fragment shader object from the cache.
    *
    * The object is looked-up based on the key given.
    *
    * Note: If the object cannot be found a `console.warn` message is displayed.
    *
    * @method Phaser.Cache#getShader
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset to retrieve from the cache.
    * @return ***REMOVED***string***REMOVED*** The shader object.
    */
    getShader: function (key) ***REMOVED***

        return this.getItem(key, Phaser.Cache.SHADER, 'getShader', 'data');

    ***REMOVED***,

    /**
    * Gets a RenderTexture object from the cache.
    *
    * The object is looked-up based on the key given.
    *
    * Note: If the object cannot be found a `console.warn` message is displayed.
    *
    * @method Phaser.Cache#getRenderTexture
    * @param ***REMOVED***string***REMOVED*** key - The key of the asset to retrieve from the cache.
    * @return ***REMOVED***Object***REMOVED*** The object with Phaser.RenderTexture and Phaser.Frame.
    */
    getRenderTexture: function (key) ***REMOVED***

        return this.getItem(key, Phaser.Cache.RENDER_TEXTURE, 'getRenderTexture');

    ***REMOVED***,

    ////////////////////////////
    //  Frame Related Methods //
    ////////////////////////////

    /**
    * Gets a PIXI.BaseTexture by key from the given Cache.
    *
    * @method Phaser.Cache#getBaseTexture
    * @param ***REMOVED***string***REMOVED*** key - Asset key of the image for which you want the BaseTexture for.
    * @param ***REMOVED***integer***REMOVED*** [cache=Phaser.Cache.IMAGE] - The cache to search for the item in.
    * @return ***REMOVED***PIXI.BaseTexture***REMOVED*** The BaseTexture object.
    */
    getBaseTexture: function (key, cache) ***REMOVED***

        if (cache === undefined) ***REMOVED*** cache = Phaser.Cache.IMAGE; ***REMOVED***

        return this.getItem(key, cache, 'getBaseTexture', 'base');

    ***REMOVED***,

    /**
    * Get a single frame by key. You'd only do this to get the default Frame created for a non-atlas/spritesheet image.
    *
    * @method Phaser.Cache#getFrame
    * @param ***REMOVED***string***REMOVED*** key - Asset key of the frame data to retrieve from the Cache.
    * @param ***REMOVED***integer***REMOVED*** [cache=Phaser.Cache.IMAGE] - The cache to search for the item in.
    * @return ***REMOVED***Phaser.Frame***REMOVED*** The frame data.
    */
    getFrame: function (key, cache) ***REMOVED***

        if (cache === undefined) ***REMOVED*** cache = Phaser.Cache.IMAGE; ***REMOVED***

        return this.getItem(key, cache, 'getFrame', 'frame');

    ***REMOVED***,

    /**
    * Get the total number of frames contained in the FrameData object specified by the given key.
    *
    * @method Phaser.Cache#getFrameCount
    * @param ***REMOVED***string***REMOVED*** key - Asset key of the FrameData you want.
    * @param ***REMOVED***integer***REMOVED*** [cache=Phaser.Cache.IMAGE] - The cache to search for the item in.
    * @return ***REMOVED***number***REMOVED*** Then number of frames. 0 if the image is not found.
    */
    getFrameCount: function (key, cache) ***REMOVED***

        var data = this.getFrameData(key, cache);

        if (data)
        ***REMOVED***
            return data.total;
        ***REMOVED***
        else
        ***REMOVED***
            return 0;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Gets a Phaser.FrameData object from the Image Cache.
    *
    * The object is looked-up based on the key given.
    *
    * Note: If the object cannot be found a `console.warn` message is displayed.
    *
    * @method Phaser.Cache#getFrameData
    * @param ***REMOVED***string***REMOVED*** key - Asset key of the frame data to retrieve from the Cache.
    * @param ***REMOVED***integer***REMOVED*** [cache=Phaser.Cache.IMAGE] - The cache to search for the item in.
    * @return ***REMOVED***Phaser.FrameData***REMOVED*** The frame data.
    */
    getFrameData: function (key, cache) ***REMOVED***

        if (cache === undefined) ***REMOVED*** cache = Phaser.Cache.IMAGE; ***REMOVED***

        return this.getItem(key, cache, 'getFrameData', 'frameData');

    ***REMOVED***,

    /**
    * Check if the FrameData for the given key exists in the Image Cache.
    *
    * @method Phaser.Cache#hasFrameData
    * @param ***REMOVED***string***REMOVED*** key - Asset key of the frame data to retrieve from the Cache.
    * @param ***REMOVED***integer***REMOVED*** [cache=Phaser.Cache.IMAGE] - The cache to search for the item in.
    * @return ***REMOVED***boolean***REMOVED*** True if the given key has frameData in the cache, otherwise false.
    */
    hasFrameData: function (key, cache) ***REMOVED***

        if (cache === undefined) ***REMOVED*** cache = Phaser.Cache.IMAGE; ***REMOVED***

        return (this.getItem(key, cache, '', 'frameData') !== null);

    ***REMOVED***,

    /**
    * Replaces a set of frameData with a new Phaser.FrameData object.
    *
    * @method Phaser.Cache#updateFrameData
    * @param ***REMOVED***string***REMOVED*** key - The unique key by which you will reference this object.
    * @param ***REMOVED***number***REMOVED*** frameData - The new FrameData.
    * @param ***REMOVED***integer***REMOVED*** [cache=Phaser.Cache.IMAGE] - The cache to search. One of the Cache consts such as `Phaser.Cache.IMAGE` or `Phaser.Cache.SOUND`.
    */
    updateFrameData: function (key, frameData, cache) ***REMOVED***

        if (cache === undefined) ***REMOVED*** cache = Phaser.Cache.IMAGE; ***REMOVED***

        if (this._cacheMap[cache][key])
        ***REMOVED***
            this._cacheMap[cache][key].frameData = frameData;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Get a single frame out of a frameData set by key.
    *
    * @method Phaser.Cache#getFrameByIndex
    * @param ***REMOVED***string***REMOVED*** key - Asset key of the frame data to retrieve from the Cache.
    * @param ***REMOVED***number***REMOVED*** index - The index of the frame you want to get.
    * @param ***REMOVED***integer***REMOVED*** [cache=Phaser.Cache.IMAGE] - The cache to search. One of the Cache consts such as `Phaser.Cache.IMAGE` or `Phaser.Cache.SOUND`.
    * @return ***REMOVED***Phaser.Frame***REMOVED*** The frame object.
    */
    getFrameByIndex: function (key, index, cache) ***REMOVED***

        var data = this.getFrameData(key, cache);

        if (data)
        ***REMOVED***
            return data.getFrame(index);
        ***REMOVED***
        else
        ***REMOVED***
            return null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Get a single frame out of a frameData set by key.
    *
    * @method Phaser.Cache#getFrameByName
    * @param ***REMOVED***string***REMOVED*** key - Asset key of the frame data to retrieve from the Cache.
    * @param ***REMOVED***string***REMOVED*** name - The name of the frame you want to get.
    * @param ***REMOVED***integer***REMOVED*** [cache=Phaser.Cache.IMAGE] - The cache to search. One of the Cache consts such as `Phaser.Cache.IMAGE` or `Phaser.Cache.SOUND`.
    * @return ***REMOVED***Phaser.Frame***REMOVED*** The frame object.
    */
    getFrameByName: function (key, name, cache) ***REMOVED***

        var data = this.getFrameData(key, cache);

        if (data)
        ***REMOVED***
            return data.getFrameByName(name);
        ***REMOVED***
        else
        ***REMOVED***
            return null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Get a cached object by the URL.
    * This only returns a value if you set Cache.autoResolveURL to `true` *before* starting the preload of any assets.
    * Be aware that every call to this function makes a DOM src query, so use carefully and double-check for implications in your target browsers/devices.
    *
    * @method Phaser.Cache#getURL
    * @param ***REMOVED***string***REMOVED*** url - The url for the object loaded to get from the cache.
    * @return ***REMOVED***object***REMOVED*** The cached object.
    */
    getURL: function (url) ***REMOVED***

        var url = this._resolveURL(url);

        if (url)
        ***REMOVED***
            return this._urlMap[url];
        ***REMOVED***
        else
        ***REMOVED***
            console.warn('Phaser.Cache.getUrl: Invalid url: "' + url  + '" or Cache.autoResolveURL was false');
            return null;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Gets all keys used in the requested Cache.
    *
    * @method Phaser.Cache#getKeys
    * @param ***REMOVED***integer***REMOVED*** [cache=Phaser.Cache.IMAGE] - The Cache you wish to get the keys from. Can be any of the Cache consts such as `Phaser.Cache.IMAGE`, `Phaser.Cache.SOUND` etc.
    * @return ***REMOVED***Array***REMOVED*** The array of keys in the requested cache.
    */
    getKeys: function (cache) ***REMOVED***

        if (cache === undefined) ***REMOVED*** cache = Phaser.Cache.IMAGE; ***REMOVED***

        var out = [];

        if (this._cacheMap[cache])
        ***REMOVED***
            for (var key in this._cacheMap[cache])
            ***REMOVED***
                if (key !== '__default' && key !== '__missing')
                ***REMOVED***
                    out.push(key);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return out;

    ***REMOVED***,

    /////////////////////
    //  Remove Methods //
    /////////////////////

    /**
    * Removes a canvas from the cache.
    *
    * Note that this only removes it from the Phaser.Cache. If you still have references to the data elsewhere
    * then it will persist in memory.
    *
    * @method Phaser.Cache#removeCanvas
    * @param ***REMOVED***string***REMOVED*** key - Key of the asset you want to remove.
    */
    removeCanvas: function (key) ***REMOVED***

        delete this._cache.canvas[key];

    ***REMOVED***,

    /**
    * Removes an image from the cache.
    *
    * You can optionally elect to destroy it as well. This calls BaseTexture.destroy on it.
    *
    * Note that this only removes it from the Phaser Cache. If you still have references to the data elsewhere
    * then it will persist in memory.
    *
    * @method Phaser.Cache#removeImage
    * @param ***REMOVED***string***REMOVED*** key - Key of the asset you want to remove.
    * @param ***REMOVED***boolean***REMOVED*** [destroyBaseTexture=true] - Should the BaseTexture behind this image also be destroyed?
    */
    removeImage: function (key, destroyBaseTexture) ***REMOVED***

        if (destroyBaseTexture === undefined) ***REMOVED*** destroyBaseTexture = true; ***REMOVED***

        var img = this.getImage(key, true);

        if (destroyBaseTexture && img.base)
        ***REMOVED***
            img.base.destroy();
        ***REMOVED***

        delete this._cache.image[key];

    ***REMOVED***,

    /**
    * Removes a sound from the cache.
    *
    * If any `Phaser.Sound` objects use the audio file in the cache that you remove with this method, they will
    * _automatically_ destroy themselves. If you wish to have full control over when Sounds are destroyed then
    * you must finish your house-keeping and destroy them all yourself first, before calling this method.
    *
    * Note that this only removes it from the Phaser.Cache. If you still have references to the data elsewhere
    * then it will persist in memory.
    *
    * @method Phaser.Cache#removeSound
    * @param ***REMOVED***string***REMOVED*** key - Key of the asset you want to remove.
    */
    removeSound: function (key) ***REMOVED***

        delete this._cache.sound[key];

    ***REMOVED***,

    /**
    * Removes a text file from the cache.
    *
    * Note that this only removes it from the Phaser.Cache. If you still have references to the data elsewhere
    * then it will persist in memory.
    *
    * @method Phaser.Cache#removeText
    * @param ***REMOVED***string***REMOVED*** key - Key of the asset you want to remove.
    */
    removeText: function (key) ***REMOVED***

        delete this._cache.text[key];

    ***REMOVED***,

    /**
    * Removes a physics data file from the cache.
    *
    * Note that this only removes it from the Phaser.Cache. If you still have references to the data elsewhere
    * then it will persist in memory.
    *
    * @method Phaser.Cache#removePhysics
    * @param ***REMOVED***string***REMOVED*** key - Key of the asset you want to remove.
    */
    removePhysics: function (key) ***REMOVED***

        delete this._cache.physics[key];

    ***REMOVED***,

    /**
    * Removes a tilemap from the cache.
    *
    * Note that this only removes it from the Phaser.Cache. If you still have references to the data elsewhere
    * then it will persist in memory.
    *
    * @method Phaser.Cache#removeTilemap
    * @param ***REMOVED***string***REMOVED*** key - Key of the asset you want to remove.
    */
    removeTilemap: function (key) ***REMOVED***

        delete this._cache.tilemap[key];

    ***REMOVED***,

    /**
    * Removes a binary file from the cache.
    *
    * Note that this only removes it from the Phaser.Cache. If you still have references to the data elsewhere
    * then it will persist in memory.
    *
    * @method Phaser.Cache#removeBinary
    * @param ***REMOVED***string***REMOVED*** key - Key of the asset you want to remove.
    */
    removeBinary: function (key) ***REMOVED***

        delete this._cache.binary[key];

    ***REMOVED***,

    /**
    * Removes a bitmap data from the cache.
    *
    * Note that this only removes it from the Phaser.Cache. If you still have references to the data elsewhere
    * then it will persist in memory.
    *
    * @method Phaser.Cache#removeBitmapData
    * @param ***REMOVED***string***REMOVED*** key - Key of the asset you want to remove.
    */
    removeBitmapData: function (key) ***REMOVED***

        delete this._cache.bitmapData[key];

    ***REMOVED***,

    /**
    * Removes a bitmap font from the cache.
    *
    * Note that this only removes it from the Phaser.Cache. If you still have references to the data elsewhere
    * then it will persist in memory.
    *
    * @method Phaser.Cache#removeBitmapFont
    * @param ***REMOVED***string***REMOVED*** key - Key of the asset you want to remove.
    */
    removeBitmapFont: function (key) ***REMOVED***

        delete this._cache.bitmapFont[key];

    ***REMOVED***,

    /**
    * Removes a json object from the cache.
    *
    * Note that this only removes it from the Phaser.Cache. If you still have references to the data elsewhere
    * then it will persist in memory.
    *
    * @method Phaser.Cache#removeJSON
    * @param ***REMOVED***string***REMOVED*** key - Key of the asset you want to remove.
    */
    removeJSON: function (key) ***REMOVED***

        delete this._cache.json[key];

    ***REMOVED***,

    /**
    * Removes a xml object from the cache.
    *
    * Note that this only removes it from the Phaser.Cache. If you still have references to the data elsewhere
    * then it will persist in memory.
    *
    * @method Phaser.Cache#removeXML
    * @param ***REMOVED***string***REMOVED*** key - Key of the asset you want to remove.
    */
    removeXML: function (key) ***REMOVED***

        delete this._cache.xml[key];

    ***REMOVED***,

    /**
    * Removes a video from the cache.
    *
    * Note that this only removes it from the Phaser.Cache. If you still have references to the data elsewhere
    * then it will persist in memory.
    *
    * @method Phaser.Cache#removeVideo
    * @param ***REMOVED***string***REMOVED*** key - Key of the asset you want to remove.
    */
    removeVideo: function (key) ***REMOVED***

        delete this._cache.video[key];

    ***REMOVED***,

    /**
    * Removes a shader from the cache.
    *
    * Note that this only removes it from the Phaser.Cache. If you still have references to the data elsewhere
    * then it will persist in memory.
    *
    * @method Phaser.Cache#removeShader
    * @param ***REMOVED***string***REMOVED*** key - Key of the asset you want to remove.
    */
    removeShader: function (key) ***REMOVED***

        delete this._cache.shader[key];

    ***REMOVED***,

    /**
    * Removes a Render Texture from the cache.
    *
    * Note that this only removes it from the Phaser.Cache. If you still have references to the data elsewhere
    * then it will persist in memory.
    *
    * @method Phaser.Cache#removeRenderTexture
    * @param ***REMOVED***string***REMOVED*** key - Key of the asset you want to remove.
    */
    removeRenderTexture: function (key) ***REMOVED***

        delete this._cache.renderTexture[key];

    ***REMOVED***,

    /**
    * Removes a Sprite Sheet from the cache.
    *
    * Note that this only removes it from the Phaser.Cache. If you still have references to the data elsewhere
    * then it will persist in memory.
    *
    * @method Phaser.Cache#removeSpriteSheet
    * @param ***REMOVED***string***REMOVED*** key - Key of the asset you want to remove.
    */
    removeSpriteSheet: function (key) ***REMOVED***

        delete this._cache.spriteSheet[key];

    ***REMOVED***,

    /**
    * Removes a Texture Atlas from the cache.
    *
    * Note that this only removes it from the Phaser.Cache. If you still have references to the data elsewhere
    * then it will persist in memory.
    *
    * @method Phaser.Cache#removeTextureAtlas
    * @param ***REMOVED***string***REMOVED*** key - Key of the asset you want to remove.
    */
    removeTextureAtlas: function (key) ***REMOVED***

        delete this._cache.atlas[key];

    ***REMOVED***,

    /**
    * Empties out all of the GL Textures from Images stored in the cache.
    * This is called automatically when the WebGL context is lost and then restored.
    *
    * @method Phaser.Cache#clearGLTextures
    * @protected
    */
    clearGLTextures: function () ***REMOVED***

        for (var key in this._cache.image)
        ***REMOVED***
            this._cache.image[key].base._glTextures = [];
        ***REMOVED***

    ***REMOVED***,

    /**
    * Resolves a URL to its absolute form and stores it in Cache._urlMap as long as Cache.autoResolveURL is set to `true`.
    * This is then looked-up by the Cache.getURL and Cache.checkURL calls.
    *
    * @method Phaser.Cache#_resolveURL
    * @private
    * @param ***REMOVED***string***REMOVED*** url - The URL to resolve. This is appended to Loader.baseURL.
    * @param ***REMOVED***object***REMOVED*** [data] - The data associated with the URL to be stored to the URL Map.
    * @return ***REMOVED***string***REMOVED*** The resolved URL.
    */
    _resolveURL: function (url, data) ***REMOVED***

        if (!this.autoResolveURL)
        ***REMOVED***
            return null;
        ***REMOVED***

        this._urlResolver.src = this.game.load.baseURL + url;

        this._urlTemp = this._urlResolver.src;

        //  Ensure no request is actually made
        this._urlResolver.src = '';

        //  Record the URL to the map
        if (data)
        ***REMOVED***
            this._urlMap[this._urlTemp] = data;
        ***REMOVED***

        return this._urlTemp;

    ***REMOVED***,

    /**
    * Clears the cache. Removes every local cache object reference.
    * If an object in the cache has a `destroy` method it will also be called.
    *
    * @method Phaser.Cache#destroy
    */
    destroy: function () ***REMOVED***

        for (var i = 0; i < this._cacheMap.length; i++)
        ***REMOVED***
            var cache = this._cacheMap[i];

            for (var key in cache)
            ***REMOVED***
                if (key !== '__default' && key !== '__missing')
                ***REMOVED***
                    if (cache[key]['destroy'])
                    ***REMOVED***
                        cache[key].destroy();
                    ***REMOVED***

                    delete cache[key];
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        this._urlMap = null;
        this._urlResolver = null;
        this._urlTemp = null;

    ***REMOVED***

***REMOVED***;

Phaser.Cache.prototype.constructor = Phaser.Cache;

/* jshint wsh:true */
/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Loader handles loading all external content such as Images, Sounds, Texture Atlases and data files.
*
* The loader uses a combination of tag loading (eg. Image elements) and XHR and provides progress and completion callbacks.
*
* Parallel loading (see ***REMOVED***@link #enableParallel***REMOVED***) is supported and enabled by default.
* Load-before behavior of parallel resources is controlled by synchronization points as discussed in ***REMOVED***@link #withSyncPoint***REMOVED***.
*
* Texture Atlases can be created with tools such as [Texture Packer](https://www.codeandweb.com/texturepacker/phaser) and
* [Shoebox](http://renderhjs.net/shoebox/)
*
* @class Phaser.Loader
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
*/
Phaser.Loader = function (game) ***REMOVED***

    /**
    * Local reference to game.
    * @property ***REMOVED***Phaser.Game***REMOVED*** game
    * @protected
    */
    this.game = game;

    /**
    * Local reference to the Phaser.Cache.
    * @property ***REMOVED***Phaser.Cache***REMOVED*** cache
    * @protected
    */
    this.cache = game.cache;

    /**
    * If true all calls to Loader.reset will be ignored. Useful if you need to create a load queue before swapping to a preloader state.
    * @property ***REMOVED***boolean***REMOVED*** resetLocked
    * @default
    */
    this.resetLocked = false;

    /**
    * True if the Loader is in the process of loading the queue.
    * @property ***REMOVED***boolean***REMOVED*** isLoading
    * @default
    */
    this.isLoading = false;

    /**
    * True if all assets in the queue have finished loading.
    * @property ***REMOVED***boolean***REMOVED*** hasLoaded
    * @default
    */
    this.hasLoaded = false;

    /**
    * You can optionally link a progress sprite with ***REMOVED***@link Phaser.Loader#setPreloadSprite setPreloadSprite***REMOVED***.
    *
    * This property is an object containing: sprite, rect, direction, width and height
    *
    * @property ***REMOVED***?object***REMOVED*** preloadSprite
    * @protected
    */
    this.preloadSprite = null;

    /**
    * The crossOrigin value applied to loaded images. Very often this needs to be set to 'anonymous'.
    * @property ***REMOVED***boolean|string***REMOVED*** crossOrigin
    * @default
    */
    this.crossOrigin = false;

    /**
    * If you want to append a URL before the path of any asset you can set this here.
    * Useful if allowing the asset base url to be configured outside of the game code.
    * The string _must_ end with a "/".
    *
    * @property ***REMOVED***string***REMOVED*** baseURL
    */
    this.baseURL = '';

    /**
    * The value of `path`, if set, is placed before any _relative_ file path given. For example:
    *
    * `load.path = "images/sprites/";
    * load.image("ball", "ball.png");
    * load.image("tree", "level1/oaktree.png");
    * load.image("boom", "http://server.com/explode.png");`
    *
    * Would load the `ball` file from `images/sprites/ball.png` and the tree from
    * `images/sprites/level1/oaktree.png` but the file `boom` would load from the URL
    * given as it's an absolute URL.
    *
    * Please note that the path is added before the filename but *after* the baseURL (if set.)
    *
    * The string _must_ end with a "/".
    *
    * @property ***REMOVED***string***REMOVED*** path
    */
    this.path = '';

    /**
    * Used to map the application mime-types to to the Accept header in XHR requests.
    * If you don't require these mappings, or they cause problems on your server, then
    * remove them from the headers object and the XHR request will not try to use them.
    *
    * This object can also be used to set the `X-Requested-With` header to 
    * `XMLHttpRequest` (or any other value you need). To enable this do:
    *
    * `this.load.headers.requestedWith = 'XMLHttpRequest'`
    *
    * before adding anything to the Loader. The XHR loader will then call:
    *
    * `setRequestHeader('X-Requested-With', this.headers['requestedWith'])`
    * 
    * @property ***REMOVED***object***REMOVED*** headers
    * @default
    */
    this.headers = ***REMOVED***
        "requestedWith": false,
        "json": "application/json",
        "xml": "application/xml"
    ***REMOVED***;

    /**
     * This event is dispatched when the loading process starts: before the first file has been requested,
    * but after all the initial packs have been loaded.
    *
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onLoadStart
    */
    this.onLoadStart = new Phaser.Signal();

    /**
    * This event is dispatched when the final file in the load queue has either loaded or failed.
    *
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onLoadComplete
    */
    this.onLoadComplete = new Phaser.Signal();

    /**
    * This event is dispatched when an asset pack has either loaded or failed to load.
    *
    * This is called when the asset pack manifest file has loaded and successfully added its contents to the loader queue.
    *
    * Params: `(pack key, success?, total packs loaded, total packs)`
    *
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onPackComplete
    */
    this.onPackComplete = new Phaser.Signal();

    /**
    * This event is dispatched immediately before a file starts loading.
    * It's possible the file may fail (eg. download error, invalid format) after this event is sent.
    *
    * Params: `(progress, file key, file url)`
    *
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onFileStart
    */
    this.onFileStart = new Phaser.Signal();

    /**
    * This event is dispatched when a file has either loaded or failed to load.
    *
    * Any function bound to this will receive the following parameters:
    *
    * progress, file key, success?, total loaded files, total files
    *
    * Where progress is a number between 1 and 100 (inclusive) representing the percentage of the load.
    *
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onFileComplete
    */
    this.onFileComplete = new Phaser.Signal();

    /**
    * This event is dispatched when a file (or pack) errors as a result of the load request.
    *
    * For files it will be triggered before `onFileComplete`. For packs it will be triggered before `onPackComplete`.
    *
    * Params: `(file key, file)`
    *
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onFileError
    */
    this.onFileError = new Phaser.Signal();

    /**
    * If true and if the browser supports XDomainRequest, it will be used in preference for XHR.
    *
    * This is only relevant for IE 9 and should _only_ be enabled for IE 9 clients when required by the server/CDN.
    *
    * @property ***REMOVED***boolean***REMOVED*** useXDomainRequest
    * @deprecated This is only relevant for IE 9.
    */
    this.useXDomainRequest = false;

    /**
    * @private
    * @property ***REMOVED***boolean***REMOVED*** _warnedAboutXDomainRequest - Control number of warnings for using XDR outside of IE 9.
    */
    this._warnedAboutXDomainRequest = false;

    /**
    * If true (the default) then parallel downloading will be enabled.
    *
    * To disable all parallel downloads this must be set to false prior to any resource being loaded.
    *
    * @property ***REMOVED***boolean***REMOVED*** enableParallel
    */
    this.enableParallel = true;

    /**
    * The number of concurrent / parallel resources to try and fetch at once.
    *
    * Many current browsers limit 6 requests per domain; this is slightly conservative.
    *
    * @property ***REMOVED***integer***REMOVED*** maxParallelDownloads
    * @protected
    */
    this.maxParallelDownloads = 4;

    /**
    * A counter: if more than zero, files will be automatically added as a synchronization point.
    * @property ***REMOVED***integer***REMOVED*** _withSyncPointDepth;
    */
    this._withSyncPointDepth = 0;

    /**
    * Contains all the information for asset files (including packs) to load.
    *
    * File/assets are only removed from the list after all loading completes.
    *
    * @property ***REMOVED***file[]***REMOVED*** _fileList
    * @private
    */
    this._fileList = [];

    /**
    * Inflight files (or packs) that are being fetched/processed.
    *
    * This means that if there are any files in the flight queue there should still be processing
    * going on; it should only be empty before or after loading.
    *
    * The files in the queue may have additional properties added to them,
    * including `requestObject` which is normally the associated XHR.
    *
    * @property ***REMOVED***file[]***REMOVED*** _flightQueue
    * @private
    */
    this._flightQueue = [];

    /**
    * The offset into the fileList past all the complete (loaded or error) entries.
    *
    * @property ***REMOVED***integer***REMOVED*** _processingHead
    * @private
    */
    this._processingHead = 0;

    /**
    * True when the first file (not pack) has loading started.
    * This used to to control dispatching `onLoadStart` which happens after any initial packs are loaded.
    *
    * @property ***REMOVED***boolean***REMOVED*** _initialPacksLoaded
    * @private
    */
    this._fileLoadStarted = false;

    /**
    * Total packs seen - adjusted when a pack is added.
    * @property ***REMOVED***integer***REMOVED*** _totalPackCount
    * @private
    */
    this._totalPackCount = 0;

    /**
    * Total files seen - adjusted when a file is added.
    * @property ***REMOVED***integer***REMOVED*** _totalFileCount
    * @private
    */
    this._totalFileCount = 0;

    /**
    * Total packs loaded - adjusted just prior to `onPackComplete`.
    * @property ***REMOVED***integer***REMOVED*** _loadedPackCount
    * @private
    */
    this._loadedPackCount = 0;

    /**
    * Total files loaded - adjusted just prior to `onFileComplete`.
    * @property ***REMOVED***integer***REMOVED*** _loadedFileCount
    * @private
    */
    this._loadedFileCount = 0;

***REMOVED***;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY = 0;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Loader.TEXTURE_ATLAS_JSON_HASH = 1;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Loader.TEXTURE_ATLAS_XML_STARLING = 2;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Loader.PHYSICS_LIME_CORONA_JSON = 3;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Loader.PHYSICS_PHASER_JSON = 4;

/**
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Loader.TEXTURE_ATLAS_JSON_PYXEL = 5;

Phaser.Loader.prototype = ***REMOVED***

    /**
    * Set a Sprite to be a "preload" sprite by passing it to this method.
    *
    * A "preload" sprite will have its width or height crop adjusted based on the percentage of the loader in real-time.
    * This allows you to easily make loading bars for games.
    *
    * The sprite will automatically be made visible when calling this.
    *
    * @method Phaser.Loader#setPreloadSprite
    * @param ***REMOVED***Phaser.Sprite|Phaser.Image***REMOVED*** sprite - The sprite or image that will be cropped during the load.
    * @param ***REMOVED***number***REMOVED*** [direction=0] - A value of zero means the sprite will be cropped horizontally, a value of 1 means its will be cropped vertically.
    */
    setPreloadSprite: function (sprite, direction) ***REMOVED***

        direction = direction || 0;

        this.preloadSprite = ***REMOVED*** sprite: sprite, direction: direction, width: sprite.width, height: sprite.height, rect: null ***REMOVED***;

        if (direction === 0)
        ***REMOVED***
            //  Horizontal rect
            this.preloadSprite.rect = new Phaser.Rectangle(0, 0, 1, sprite.height);
        ***REMOVED***
        else
        ***REMOVED***
            //  Vertical rect
            this.preloadSprite.rect = new Phaser.Rectangle(0, 0, sprite.width, 1);
        ***REMOVED***

        sprite.crop(this.preloadSprite.rect);

        sprite.visible = true;

    ***REMOVED***,

    /**
    * Called automatically by ScaleManager when the game resizes in RESIZE scalemode.
    *
    * This can be used to adjust the preloading sprite size, eg.
    *
    * @method Phaser.Loader#resize
    * @protected
    */
    resize: function () ***REMOVED***

        if (this.preloadSprite && this.preloadSprite.height !== this.preloadSprite.sprite.height)
        ***REMOVED***
            this.preloadSprite.rect.height = this.preloadSprite.sprite.height;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Check whether a file/asset with a specific key is queued to be loaded.
    *
    * To access a loaded asset use Phaser.Cache, eg. ***REMOVED***@link Phaser.Cache#checkImageKey***REMOVED***
    *
    * @method Phaser.Loader#checkKeyExists
    * @param ***REMOVED***string***REMOVED*** type - The type asset you want to check.
    * @param ***REMOVED***string***REMOVED*** key - Key of the asset you want to check.
    * @return ***REMOVED***boolean***REMOVED*** Return true if exists, otherwise return false.
    */
    checkKeyExists: function (type, key) ***REMOVED***

        return this.getAssetIndex(type, key) > -1;

    ***REMOVED***,

    /**
    * Get the queue-index of the file/asset with a specific key.
    *
    * Only assets in the download file queue will be found.
    *
    * @method Phaser.Loader#getAssetIndex
    * @param ***REMOVED***string***REMOVED*** type - The type asset you want to check.
    * @param ***REMOVED***string***REMOVED*** key - Key of the asset you want to check.
    * @return ***REMOVED***number***REMOVED*** The index of this key in the filelist, or -1 if not found.
    *     The index may change and should only be used immediately following this call
    */
    getAssetIndex: function (type, key) ***REMOVED***

        var bestFound = -1;

        for (var i = 0; i < this._fileList.length; i++)
        ***REMOVED***
            var file = this._fileList[i];

            if (file.type === type && file.key === key)
            ***REMOVED***
                bestFound = i;

                // An already loaded/loading file may be superceded.
                if (!file.loaded && !file.loading)
                ***REMOVED***
                    break;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return bestFound;

    ***REMOVED***,

    /**
    * Find a file/asset with a specific key.
    *
    * Only assets in the download file queue will be found.
    *
    * @method Phaser.Loader#getAsset
    * @param ***REMOVED***string***REMOVED*** type - The type asset you want to check.
    * @param ***REMOVED***string***REMOVED*** key - Key of the asset you want to check.
    * @return ***REMOVED***any***REMOVED*** Returns an object if found that has 2 properties: `index` and `file`; otherwise a non-true value is returned.
    *     The index may change and should only be used immediately following this call.
    */
    getAsset: function (type, key) ***REMOVED***

        var fileIndex = this.getAssetIndex(type, key);

        if (fileIndex > -1)
        ***REMOVED***
            return ***REMOVED*** index: fileIndex, file: this._fileList[fileIndex] ***REMOVED***;
        ***REMOVED***

        return false;

    ***REMOVED***,

    /**
    * Reset the loader and clear any queued assets. If `Loader.resetLocked` is true this operation will abort.
    *
    * This will abort any loading and clear any queued assets.
    *
    * Optionally you can clear any associated events.
    *
    * @method Phaser.Loader#reset
    * @protected
    * @param ***REMOVED***boolean***REMOVED*** [hard=false] - If true then the preload sprite and other artifacts may also be cleared.
    * @param ***REMOVED***boolean***REMOVED*** [clearEvents=false] - If true then the all Loader signals will have removeAll called on them.
    */
    reset: function (hard, clearEvents) ***REMOVED***

        if (clearEvents === undefined) ***REMOVED*** clearEvents = false; ***REMOVED***

        if (this.resetLocked)
        ***REMOVED***
            return;
        ***REMOVED***

        if (hard)
        ***REMOVED***
            this.preloadSprite = null;
        ***REMOVED***

        this.isLoading = false;

        this._processingHead = 0;
        this._fileList.length = 0;
        this._flightQueue.length = 0;

        this._fileLoadStarted = false;
        this._totalFileCount = 0;
        this._totalPackCount = 0;
        this._loadedPackCount = 0;
        this._loadedFileCount = 0;

        if (clearEvents)
        ***REMOVED***
            this.onLoadStart.removeAll();
            this.onLoadComplete.removeAll();
            this.onPackComplete.removeAll();
            this.onFileStart.removeAll();
            this.onFileComplete.removeAll();
            this.onFileError.removeAll();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal function that adds a new entry to the file list. Do not call directly.
    *
    * @method Phaser.Loader#addToFileList
    * @protected
    * @param ***REMOVED***string***REMOVED*** type - The type of resource to add to the list (image, audio, xml, etc).
    * @param ***REMOVED***string***REMOVED*** key - The unique Cache ID key of this resource.
    * @param ***REMOVED***string***REMOVED*** [url] - The URL the asset will be loaded from.
    * @param ***REMOVED***object***REMOVED*** [properties=(none)] - Any additional properties needed to load the file. These are added directly to the added file object and overwrite any defaults.
    * @param ***REMOVED***boolean***REMOVED*** [overwrite=false] - If true then this will overwrite a file asset of the same type/key. Otherwise it will only add a new asset. If overwrite is true, and the asset is already being loaded (or has been loaded), then it is appended instead.
    * @param ***REMOVED***string***REMOVED*** [extension] - If no URL is given the Loader will sometimes auto-generate the URL based on the key, using this as the extension.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This instance of the Phaser Loader.
    */
    addToFileList: function (type, key, url, properties, overwrite, extension) ***REMOVED***

        if (overwrite === undefined) ***REMOVED*** overwrite = false; ***REMOVED***

        if (key === undefined || key === '')
        ***REMOVED***
            console.warn("Phaser.Loader: Invalid or no key given of type " + type);
            return this;
        ***REMOVED***

        if (url === undefined || url === null)
        ***REMOVED***
            if (extension)
            ***REMOVED***
                url = key + extension;
            ***REMOVED***
            else
            ***REMOVED***
                console.warn("Phaser.Loader: No URL given for file type: " + type + " key: " + key);
                return this;
            ***REMOVED***
        ***REMOVED***

        var file = ***REMOVED***
            type: type,
            key: key,
            path: this.path,
            url: url,
            syncPoint: this._withSyncPointDepth > 0,
            data: null,
            loading: false,
            loaded: false,
            error: false
        ***REMOVED***;

        if (properties)
        ***REMOVED***
            for (var prop in properties)
            ***REMOVED***
                file[prop] = properties[prop];
            ***REMOVED***
        ***REMOVED***

        var fileIndex = this.getAssetIndex(type, key);

        if (overwrite && fileIndex > -1)
        ***REMOVED***
            var currentFile = this._fileList[fileIndex];

            if (!currentFile.loading && !currentFile.loaded)
            ***REMOVED***
                this._fileList[fileIndex] = file;
            ***REMOVED***
            else
            ***REMOVED***
                this._fileList.push(file);
                this._totalFileCount++;
            ***REMOVED***
        ***REMOVED***
        else if (fileIndex === -1)
        ***REMOVED***
            this._fileList.push(file);
            this._totalFileCount++;
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Internal function that replaces an existing entry in the file list with a new one. Do not call directly.
    *
    * @method Phaser.Loader#replaceInFileList
    * @protected
    * @param ***REMOVED***string***REMOVED*** type - The type of resource to add to the list (image, audio, xml, etc).
    * @param ***REMOVED***string***REMOVED*** key - The unique Cache ID key of this resource.
    * @param ***REMOVED***string***REMOVED*** url - The URL the asset will be loaded from.
    * @param ***REMOVED***object***REMOVED*** properties - Any additional properties needed to load the file.
    */
    replaceInFileList: function (type, key, url, properties) ***REMOVED***

        return this.addToFileList(type, key, url, properties, true);

    ***REMOVED***,

    /**
    * Add a JSON resource pack ('packfile') to the Loader.
    *
    * A packfile is a JSON file that contains a list of assets to the be loaded.
    * Please see the example 'loader/asset pack' in the Phaser Examples repository.
    *
    * Packs are always put before the first non-pack file that is not loaded / loading.
    *
    * This means that all packs added before any loading has started are added to the front
    * of the file queue, in the order added.
    *
    * The key must be a unique String. It is used to add the file to the Phaser.Cache upon successful load.
    *
    * The URL of the packfile can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * @method Phaser.Loader#pack
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of this resource pack.
    * @param ***REMOVED***string***REMOVED*** [url] - URL of the Asset Pack JSON file. If you wish to pass a json object instead set this to null and pass the object as the data parameter.
    * @param ***REMOVED***object***REMOVED*** [data] - The Asset Pack JSON data. Use this to pass in a json data object rather than loading it from a URL. TODO
    * @param ***REMOVED***object***REMOVED*** [callbackContext=(loader)] - Some Loader operations, like Binary and Script require a context for their callbacks. Pass the context here.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    pack: function (key, url, data, callbackContext) ***REMOVED***

        if (url === undefined) ***REMOVED*** url = null; ***REMOVED***
        if (data === undefined) ***REMOVED*** data = null; ***REMOVED***
        if (callbackContext === undefined) ***REMOVED*** callbackContext = null; ***REMOVED***

        if (!url && !data)
        ***REMOVED***
            console.warn('Phaser.Loader.pack - Both url and data are null. One must be set.');

            return this;
        ***REMOVED***

        var pack = ***REMOVED***
            type: 'packfile',
            key: key,
            url: url,
            path: this.path,
            syncPoint: true,
            data: null,
            loading: false,
            loaded: false,
            error: false,
            callbackContext: callbackContext
        ***REMOVED***;

        //  A data object has been given
        if (data)
        ***REMOVED***
            if (typeof data === 'string')
            ***REMOVED***
                data = JSON.parse(data);
            ***REMOVED***

            pack.data = data || ***REMOVED******REMOVED***;

            //  Already consider 'loaded'
            pack.loaded = true;
        ***REMOVED***

        // Add before first non-pack/no-loaded ~ last pack from start prior to loading
        // (Read one past for splice-to-end)
        for (var i = 0; i < this._fileList.length + 1; i++)
        ***REMOVED***
            var file = this._fileList[i];

            if (!file || (!file.loaded && !file.loading && file.type !== 'packfile'))
            ***REMOVED***
                this._fileList.splice(i, 0, pack);
                this._totalPackCount++;
                break;
            ***REMOVED***
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Adds an Image to the current load queue.
    *
    * The file is **not** loaded immediately after calling this method. The file is added to the queue ready to be loaded when the loader starts.
    *
    * Phaser can load all common image types: png, jpg, gif and any other format the browser can natively handle.
    *
    * The key must be a unique String. It is used to add the file to the Phaser.Cache upon successful load.
    *
    * Retrieve the image via `Cache.getImage(key)`
    *
    * The URL can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * If the URL isn't specified the Loader will take the key and create a filename from that. For example if the key is "alien"
    * and no URL is given then the Loader will set the URL to be "alien.png". It will always add `.png` as the extension.
    * If you do not desire this action then provide a URL.
    *
    * @method Phaser.Loader#image
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of this image file.
    * @param ***REMOVED***string***REMOVED*** [url] - URL of an image file. If undefined or `null` the url will be set to `<key>.png`, i.e. if `key` was "alien" then the URL will be "alien.png".
    * @param ***REMOVED***boolean***REMOVED*** [overwrite=false] - If an unloaded file with a matching key already exists in the queue, this entry will overwrite it.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    image: function (key, url, overwrite) ***REMOVED***

        return this.addToFileList('image', key, url, undefined, overwrite, '.png');

    ***REMOVED***,

    /**
    * Adds an array of images to the current load queue.
    *
    * It works by passing each element of the array to the Loader.image method.
    *
    * The files are **not** loaded immediately after calling this method. The files are added to the queue ready to be loaded when the loader starts.
    *
    * Phaser can load all common image types: png, jpg, gif and any other format the browser can natively handle.
    *
    * The keys must be unique Strings. They are used to add the files to the Phaser.Cache upon successful load.
    *
    * Retrieve the images via `Cache.getImage(key)`
    *
    * The URL can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * If the URL isn't specified the Loader will take the key and create a filename from that. For example if the key is "alien"
    * and no URL is given then the Loader will set the URL to be "alien.png". It will always add `.png` as the extension.
    * If you do not desire this action then provide a URL.
    *
    * @method Phaser.Loader#images
    * @param ***REMOVED***array***REMOVED*** keys - An array of unique asset keys of the image files.
    * @param ***REMOVED***array***REMOVED*** [urls] - Optional array of URLs. If undefined or `null` the url will be set to `<key>.png`, i.e. if `key` was "alien" then the URL will be "alien.png". If provided the URLs array length must match the keys array length.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
     */
    images: function (keys, urls) ***REMOVED***

        if (Array.isArray(urls))
        ***REMOVED***
            for (var i = 0; i < keys.length; i++)
            ***REMOVED***
                this.image(keys[i], urls[i]);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            for (var i = 0; i < keys.length; i++)
            ***REMOVED***
                this.image(keys[i]);
            ***REMOVED***
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Adds a Text file to the current load queue.
    *
    * The file is **not** loaded immediately after calling this method. The file is added to the queue ready to be loaded when the loader starts.
    *
    * The key must be a unique String. It is used to add the file to the Phaser.Cache upon successful load.
    *
    * Retrieve the file via `Cache.getText(key)`
    *
    * The URL can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * If the URL isn't specified the Loader will take the key and create a filename from that. For example if the key is "alien"
    * and no URL is given then the Loader will set the URL to be "alien.txt". It will always add `.txt` as the extension.
    * If you do not desire this action then provide a URL.
    *
    * @method Phaser.Loader#text
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of the text file.
    * @param ***REMOVED***string***REMOVED*** [url] - URL of the text file. If undefined or `null` the url will be set to `<key>.txt`, i.e. if `key` was "alien" then the URL will be "alien.txt".
    * @param ***REMOVED***boolean***REMOVED*** [overwrite=false] - If an unloaded file with a matching key already exists in the queue, this entry will overwrite it.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    text: function (key, url, overwrite) ***REMOVED***

        return this.addToFileList('text', key, url, undefined, overwrite, '.txt');

    ***REMOVED***,

    /**
    * Adds a JSON file to the current load queue.
    *
    * The file is **not** loaded immediately after calling this method. The file is added to the queue ready to be loaded when the loader starts.
    *
    * The key must be a unique String. It is used to add the file to the Phaser.Cache upon successful load.
    *
    * Retrieve the file via `Cache.getJSON(key)`. JSON files are automatically parsed upon load.
    * If you need to control when the JSON is parsed then use `Loader.text` instead and parse the text file as needed.
    *
    * The URL can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * If the URL isn't specified the Loader will take the key and create a filename from that. For example if the key is "alien"
    * and no URL is given then the Loader will set the URL to be "alien.json". It will always add `.json` as the extension.
    * If you do not desire this action then provide a URL.
    *
    * @method Phaser.Loader#json
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of the json file.
    * @param ***REMOVED***string***REMOVED*** [url] - URL of the JSON file. If undefined or `null` the url will be set to `<key>.json`, i.e. if `key` was "alien" then the URL will be "alien.json".
    * @param ***REMOVED***boolean***REMOVED*** [overwrite=false] - If an unloaded file with a matching key already exists in the queue, this entry will overwrite it.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    json: function (key, url, overwrite) ***REMOVED***

        return this.addToFileList('json', key, url, undefined, overwrite, '.json');

    ***REMOVED***,

    /**
    * Adds a fragment shader file to the current load queue.
    *
    * The file is **not** loaded immediately after calling this method. The file is added to the queue ready to be loaded when the loader starts.
    *
    * The key must be a unique String. It is used to add the file to the Phaser.Cache upon successful load.
    *
    * Retrieve the file via `Cache.getShader(key)`.
    *
    * The URL can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * If the URL isn't specified the Loader will take the key and create a filename from that. For example if the key is "blur"
    * and no URL is given then the Loader will set the URL to be "blur.frag". It will always add `.frag` as the extension.
    * If you do not desire this action then provide a URL.
    *
    * @method Phaser.Loader#shader
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of the fragment file.
    * @param ***REMOVED***string***REMOVED*** [url] - URL of the fragment file. If undefined or `null` the url will be set to `<key>.frag`, i.e. if `key` was "blur" then the URL will be "blur.frag".
    * @param ***REMOVED***boolean***REMOVED*** [overwrite=false] - If an unloaded file with a matching key already exists in the queue, this entry will overwrite it.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    shader: function (key, url, overwrite) ***REMOVED***

        return this.addToFileList('shader', key, url, undefined, overwrite, '.frag');

    ***REMOVED***,

    /**
    * Adds an XML file to the current load queue.
    *
    * The file is **not** loaded immediately after calling this method. The file is added to the queue ready to be loaded when the loader starts.
    *
    * The key must be a unique String. It is used to add the file to the Phaser.Cache upon successful load.
    *
    * Retrieve the file via `Cache.getXML(key)`.
    *
    * The URL can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * If the URL isn't specified the Loader will take the key and create a filename from that. For example if the key is "alien"
    * and no URL is given then the Loader will set the URL to be "alien.xml". It will always add `.xml` as the extension.
    * If you do not desire this action then provide a URL.
    *
    * @method Phaser.Loader#xml
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of the xml file.
    * @param ***REMOVED***string***REMOVED*** [url] - URL of the XML file. If undefined or `null` the url will be set to `<key>.xml`, i.e. if `key` was "alien" then the URL will be "alien.xml".
    * @param ***REMOVED***boolean***REMOVED*** [overwrite=false] - If an unloaded file with a matching key already exists in the queue, this entry will overwrite it.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    xml: function (key, url, overwrite) ***REMOVED***

        return this.addToFileList('xml', key, url, undefined, overwrite, '.xml');

    ***REMOVED***,

    /**
    * Adds a JavaScript file to the current load queue.
    *
    * The file is **not** loaded immediately after calling this method. The file is added to the queue ready to be loaded when the loader starts.
    *
    * The key must be a unique String.
    *
    * The URL can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * If the URL isn't specified the Loader will take the key and create a filename from that. For example if the key is "alien"
    * and no URL is given then the Loader will set the URL to be "alien.js". It will always add `.js` as the extension.
    * If you do not desire this action then provide a URL.
    *
    * Upon successful load the JavaScript is automatically turned into a script tag and executed, so be careful what you load!
    *
    * A callback, which will be invoked as the script tag has been created, can also be specified.
    * The callback must return relevant `data`.
    *
    * @method Phaser.Loader#script
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of the script file.
    * @param ***REMOVED***string***REMOVED*** [url] - URL of the JavaScript file. If undefined or `null` the url will be set to `<key>.js`, i.e. if `key` was "alien" then the URL will be "alien.js".
    * @param ***REMOVED***function***REMOVED*** [callback=(none)] - Optional callback that will be called after the script tag has loaded, so you can perform additional processing.
    * @param ***REMOVED***object***REMOVED*** [callbackContext=(loader)] - The context under which the callback will be applied. If not specified it will use the Phaser Loader as the context.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    script: function (key, url, callback, callbackContext) ***REMOVED***

        if (callback === undefined) ***REMOVED*** callback = false; ***REMOVED***

        if (callback !== false && callbackContext === undefined) ***REMOVED*** callbackContext = this; ***REMOVED***

        return this.addToFileList('script', key, url, ***REMOVED*** syncPoint: true, callback: callback, callbackContext: callbackContext ***REMOVED***, false, '.js');

    ***REMOVED***,

    /**
    * Adds a binary file to the current load queue.
    *
    * The file is **not** loaded immediately after calling this method. The file is added to the queue ready to be loaded when the loader starts.
    *
    * The key must be a unique String. It is used to add the file to the Phaser.Cache upon successful load.
    *
    * Retrieve the file via `Cache.getBinary(key)`.
    *
    * The URL can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * If the URL isn't specified the Loader will take the key and create a filename from that. For example if the key is "alien"
    * and no URL is given then the Loader will set the URL to be "alien.bin". It will always add `.bin` as the extension.
    * If you do not desire this action then provide a URL.
    *
    * It will be loaded via xhr with a responseType of "arraybuffer". You can specify an optional callback to process the file after load.
    * When the callback is called it will be passed 2 parameters: the key of the file and the file data.
    *
    * WARNING: If a callback is specified the data will be set to whatever it returns. Always return the data object, even if you didn't modify it.
    *
    * @method Phaser.Loader#binary
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of the binary file.
    * @param ***REMOVED***string***REMOVED*** [url] - URL of the binary file. If undefined or `null` the url will be set to `<key>.bin`, i.e. if `key` was "alien" then the URL will be "alien.bin".
    * @param ***REMOVED***function***REMOVED*** [callback=(none)] - Optional callback that will be passed the file after loading, so you can perform additional processing on it.
    * @param ***REMOVED***object***REMOVED*** [callbackContext] - The context under which the callback will be applied. If not specified it will use the callback itself as the context.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    binary: function (key, url, callback, callbackContext) ***REMOVED***

        if (callback === undefined) ***REMOVED*** callback = false; ***REMOVED***

        // Why is the default callback context the ..callback?
        if (callback !== false && callbackContext === undefined) ***REMOVED*** callbackContext = callback; ***REMOVED***

        return this.addToFileList('binary', key, url, ***REMOVED*** callback: callback, callbackContext: callbackContext ***REMOVED***, false, '.bin');

    ***REMOVED***,

    /**
    * Adds a Sprite Sheet to the current load queue.
    *
    * The file is **not** loaded immediately after calling this method. The file is added to the queue ready to be loaded when the loader starts.
    *
    * To clarify the terminology that Phaser uses: A Sprite Sheet is an image containing frames, usually of an animation, that are all equal
    * dimensions and often in sequence. For example if the frame size is 32x32 then every frame in the sprite sheet will be that size.
    * Sometimes (outside of Phaser) the term "sprite sheet" is used to refer to a texture atlas.
    * A Texture Atlas works by packing together images as best it can, using whatever frame sizes it likes, often with cropping and trimming
    * the frames in the process. Software such as Texture Packer, Flash CC or Shoebox all generate texture atlases, not sprite sheets.
    * If you've got an atlas then use `Loader.atlas` instead.
    *
    * The key must be a unique String. It is used to add the image to the Phaser.Cache upon successful load.
    *
    * Retrieve the file via `Cache.getImage(key)`. Sprite sheets, being image based, live in the same Cache as all other Images.
    *
    * The URL can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * If the URL isn't specified the Loader will take the key and create a filename from that. For example if the key is "alien"
    * and no URL is given then the Loader will set the URL to be "alien.png". It will always add `.png` as the extension.
    * If you do not desire this action then provide a URL.
    *
    * @method Phaser.Loader#spritesheet
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of the sheet file.
    * @param ***REMOVED***string***REMOVED*** url - URL of the sprite sheet file. If undefined or `null` the url will be set to `<key>.png`, i.e. if `key` was "alien" then the URL will be "alien.png".
    * @param ***REMOVED***number***REMOVED*** frameWidth - Width in pixels of a single frame in the sprite sheet.
    * @param ***REMOVED***number***REMOVED*** frameHeight - Height in pixels of a single frame in the sprite sheet.
    * @param ***REMOVED***number***REMOVED*** [frameMax=-1] - How many frames in this sprite sheet. If not specified it will divide the whole image into frames.
    * @param ***REMOVED***number***REMOVED*** [margin=0] - If the frames have been drawn with a margin, specify the amount here.
    * @param ***REMOVED***number***REMOVED*** [spacing=0] - If the frames have been drawn with spacing between them, specify the amount here.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    spritesheet: function (key, url, frameWidth, frameHeight, frameMax, margin, spacing) ***REMOVED***

        if (frameMax === undefined) ***REMOVED*** frameMax = -1; ***REMOVED***
        if (margin === undefined) ***REMOVED*** margin = 0; ***REMOVED***
        if (spacing === undefined) ***REMOVED*** spacing = 0; ***REMOVED***

        return this.addToFileList('spritesheet', key, url, ***REMOVED*** frameWidth: frameWidth, frameHeight: frameHeight, frameMax: frameMax, margin: margin, spacing: spacing ***REMOVED***, false, '.png');

    ***REMOVED***,

    /**
    * Adds an audio file to the current load queue.
    *
    * The file is **not** loaded immediately after calling this method. The file is added to the queue ready to be loaded when the loader starts.
    *
    * The key must be a unique String. It is used to add the file to the Phaser.Cache upon successful load.
    *
    * Retrieve the file via `Cache.getSound(key)`.
    *
    * The URL can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * Mobile warning: There are some mobile devices (certain iPad 2 and iPad Mini revisions) that cannot play 48000 Hz audio.
    * When they try to play the audio becomes extremely distorted and buzzes, eventually crashing the sound system.
    * The solution is to use a lower encoding rate such as 44100 Hz.
    *
    * @method Phaser.Loader#audio
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of the audio file.
    * @param ***REMOVED***string|string[]|object[]***REMOVED*** urls - Either a single string or an array of URIs or pairs of `***REMOVED***uri: .., type: ..***REMOVED***`.
    *    If an array is specified then the first URI (or URI + mime pair) that is device-compatible will be selected.
    *    For example: `"jump.mp3"`, `['jump.mp3', 'jump.ogg', 'jump.m4a']`, or `[***REMOVED***uri: "data:<opus_resource>", type: 'opus'***REMOVED***, 'fallback.mp3']`.
    *    BLOB and DATA URIs can be used but only support automatic detection when used in the pair form; otherwise the format must be manually checked before adding the resource.
    * @param ***REMOVED***boolean***REMOVED*** [autoDecode=true] - When using Web Audio the audio files can either be decoded at load time or run-time.
    *    Audio files can't be played until they are decoded and, if specified, this enables immediate decoding. Decoding is a non-blocking async process, however it consumes huge amounts of CPU time on mobiles especially.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    audio: function (key, urls, autoDecode) ***REMOVED***

        if (this.game.sound.noAudio)
        ***REMOVED***
            return this;
        ***REMOVED***

        if (autoDecode === undefined) ***REMOVED*** autoDecode = true; ***REMOVED***

        if (typeof urls === 'string')
        ***REMOVED***
            urls = [urls];
        ***REMOVED***

        return this.addToFileList('audio', key, urls, ***REMOVED*** buffer: null, autoDecode: autoDecode ***REMOVED***);

    ***REMOVED***,

    /**
    * Adds an audio sprite file to the current load queue.
    *
    * The file is **not** loaded immediately after calling this method. The file is added to the queue ready to be loaded when the loader starts.
    *
    * The key must be a unique String. It is used to add the file to the Phaser.Cache upon successful load.
    *
    * Audio Sprites are a combination of audio files and a JSON configuration.
    *
    * The JSON follows the format of that created by https://github.com/tonistiigi/audiosprite
    *
    * Retrieve the file via `Cache.getSoundData(key)`.
    *
    * The URL can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * @method Phaser.Loader#audioSprite
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of the audio file.
    * @param ***REMOVED***Array|string***REMOVED*** urls - An array containing the URLs of the audio files, i.e.: [ 'audiosprite.mp3', 'audiosprite.ogg', 'audiosprite.m4a' ] or a single string containing just one URL.
    * @param ***REMOVED***string***REMOVED*** [jsonURL=null] - The URL of the audiosprite configuration JSON object. If you wish to pass the data directly set this parameter to null.
    * @param ***REMOVED***string|object***REMOVED*** [jsonData=null] - A JSON object or string containing the audiosprite configuration data. This is ignored if jsonURL is not null.
    * @param ***REMOVED***boolean***REMOVED*** [autoDecode=true] - When using Web Audio the audio files can either be decoded at load time or run-time.
    *    Audio files can't be played until they are decoded and, if specified, this enables immediate decoding. Decoding is a non-blocking async process, however it consumes huge amounts of CPU time on mobiles especially.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    audioSprite: function (key, urls, jsonURL, jsonData, autoDecode) ***REMOVED***

        if (this.game.sound.noAudio)
        ***REMOVED***
            return this;
        ***REMOVED***

        if (jsonURL === undefined) ***REMOVED*** jsonURL = null; ***REMOVED***
        if (jsonData === undefined) ***REMOVED*** jsonData = null; ***REMOVED***
        if (autoDecode === undefined) ***REMOVED*** autoDecode = true; ***REMOVED***

        this.audio(key, urls, autoDecode);

        if (jsonURL)
        ***REMOVED***
            this.json(key + '-audioatlas', jsonURL);
        ***REMOVED***
        else if (jsonData)
        ***REMOVED***
            if (typeof jsonData === 'string')
            ***REMOVED***
                jsonData = JSON.parse(jsonData);
            ***REMOVED***

            this.cache.addJSON(key + '-audioatlas', '', jsonData);
        ***REMOVED***
        else
        ***REMOVED***
            console.warn('Phaser.Loader.audiosprite - You must specify either a jsonURL or provide a jsonData object');
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * A legacy alias for Loader.audioSprite. Please see that method for documentation.
    *
    * @method Phaser.Loader#audiosprite
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of the audio file.
    * @param ***REMOVED***Array|string***REMOVED*** urls - An array containing the URLs of the audio files, i.e.: [ 'audiosprite.mp3', 'audiosprite.ogg', 'audiosprite.m4a' ] or a single string containing just one URL.
    * @param ***REMOVED***string***REMOVED*** [jsonURL=null] - The URL of the audiosprite configuration JSON object. If you wish to pass the data directly set this parameter to null.
    * @param ***REMOVED***string|object***REMOVED*** [jsonData=null] - A JSON object or string containing the audiosprite configuration data. This is ignored if jsonURL is not null.
    * @param ***REMOVED***boolean***REMOVED*** [autoDecode=true] - When using Web Audio the audio files can either be decoded at load time or run-time.
    *    Audio files can't be played until they are decoded and, if specified, this enables immediate decoding. Decoding is a non-blocking async process, however it consumes huge amounts of CPU time on mobiles especially.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    audiosprite: function (key, urls, jsonURL, jsonData, autoDecode) ***REMOVED***

        return this.audioSprite(key, urls, jsonURL, jsonData, autoDecode);

    ***REMOVED***,

    /**
    * Adds a video file to the current load queue.
    *
    * The file is **not** loaded immediately after calling this method. The file is added to the queue ready to be loaded when the loader starts.
    *
    * The key must be a unique String. It is used to add the file to the Phaser.Cache upon successful load.
    *
    * Retrieve the file via `Cache.getVideo(key)`.
    *
    * The URL can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * You don't need to preload a video in order to play it in your game. See `Video.createVideoFromURL` for details.
    *
    * @method Phaser.Loader#video
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of the video file.
    * @param ***REMOVED***string|string[]|object[]***REMOVED*** urls - Either a single string or an array of URIs or pairs of `***REMOVED***uri: .., type: ..***REMOVED***`.
    *    If an array is specified then the first URI (or URI + mime pair) that is device-compatible will be selected.
    *    For example: `"boom.mp4"`, `['boom.mp4', 'boom.ogg', 'boom.webm']`, or `[***REMOVED***uri: "data:<opus_resource>", type: 'opus'***REMOVED***, 'fallback.mp4']`.
    *    BLOB and DATA URIs can be used but only support automatic detection when used in the pair form; otherwise the format must be manually checked before adding the resource.
    * @param ***REMOVED***string***REMOVED*** [loadEvent='canplaythrough'] - This sets the Video source event to listen for before the load is considered complete.
    *    'canplaythrough' implies the video has downloaded enough, and bandwidth is high enough that it can be played to completion.
    *    'canplay' implies the video has downloaded enough to start playing, but not necessarily to finish.
    *    'loadeddata' just makes sure that the video meta data and first frame have downloaded. Phaser uses this value automatically if the
    *    browser is detected as being Firefox and no `loadEvent` is given, otherwise it defaults to `canplaythrough`.
    * @param ***REMOVED***boolean***REMOVED*** [asBlob=false] - Video files can either be loaded via the creation of a video element which has its src property set.
    *    Or they can be loaded via xhr, stored as binary data in memory and then converted to a Blob. This isn't supported in IE9 or Android 2.
    *    If you need to have the same video playing at different times across multiple Sprites then you need to load it as a Blob.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    video: function (key, urls, loadEvent, asBlob) ***REMOVED***

        if (loadEvent === undefined)
        ***REMOVED***
            if (this.game.device.firefox)
            ***REMOVED***
                loadEvent = 'loadeddata';
            ***REMOVED***
            else
            ***REMOVED***
                loadEvent = 'canplaythrough';
            ***REMOVED***
        ***REMOVED***

        if (asBlob === undefined) ***REMOVED*** asBlob = false; ***REMOVED***

        if (typeof urls === 'string')
        ***REMOVED***
            urls = [urls];
        ***REMOVED***

        return this.addToFileList('video', key, urls, ***REMOVED*** buffer: null, asBlob: asBlob, loadEvent: loadEvent ***REMOVED***);

    ***REMOVED***,

    /**
    * Adds a Tile Map data file to the current load queue.
    *
    * Phaser can load data in two different formats: CSV and Tiled JSON.
    * 
    * Tiled is a free software package, specifically for creating tilemaps, and is available from http://www.mapeditor.org
    *
    * You can choose to either load the data externally, by providing a URL to a json file.
    * Or you can pass in a JSON object or String via the `data` parameter.
    * If you pass a String the data is automatically run through `JSON.parse` and then immediately added to the Phaser.Cache.
    *
    * If a URL is provided the file is **not** loaded immediately after calling this method, but is added to the load queue.
    *
    * The key must be a unique String. It is used to add the file to the Phaser.Cache upon successful load.
    *
    * Retrieve the file via `Cache.getTilemapData(key)`. JSON files are automatically parsed upon load.
    * If you need to control when the JSON is parsed then use `Loader.text` instead and parse the text file as needed.
    *
    * The URL can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * If the URL isn't specified and no data is given then the Loader will take the key and create a filename from that.
    * For example if the key is "level1" and no URL or data is given then the Loader will set the URL to be "level1.json".
    * If you set the format to be Tilemap.CSV it will set the URL to be "level1.csv" instead.
    *
    * If you do not desire this action then provide a URL or data object.
    *
    * @method Phaser.Loader#tilemap
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of the tilemap data.
    * @param ***REMOVED***string***REMOVED*** [url] - URL of the tile map file. If undefined or `null` and no data is given the url will be set to `<key>.json`, i.e. if `key` was "level1" then the URL will be "level1.json".
    * @param ***REMOVED***object|string***REMOVED*** [data] - An optional JSON data object. If given then the url is ignored and this JSON object is used for map data instead.
    * @param ***REMOVED***number***REMOVED*** [format=Phaser.Tilemap.CSV] - The format of the map data. Either Phaser.Tilemap.CSV or Phaser.Tilemap.TILED_JSON.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    tilemap: function (key, url, data, format) ***REMOVED***

        if (url === undefined) ***REMOVED*** url = null; ***REMOVED***
        if (data === undefined) ***REMOVED*** data = null; ***REMOVED***
        if (format === undefined) ***REMOVED*** format = Phaser.Tilemap.CSV; ***REMOVED***

        if (!url && !data)
        ***REMOVED***
            if (format === Phaser.Tilemap.CSV)
            ***REMOVED***
                url = key + '.csv';
            ***REMOVED***
            else
            ***REMOVED***
                url = key + '.json';
            ***REMOVED***
        ***REMOVED***

        //  A map data object has been given
        if (data)
        ***REMOVED***
            switch (format)
            ***REMOVED***
                //  A csv string or object has been given
                case Phaser.Tilemap.CSV:
                    break;

                //  A json string or object has been given
                case Phaser.Tilemap.TILED_JSON:

                    if (typeof data === 'string')
                    ***REMOVED***
                        data = JSON.parse(data);
                    ***REMOVED***
                    break;
            ***REMOVED***

            this.cache.addTilemap(key, null, data, format);
        ***REMOVED***
        else
        ***REMOVED***
            this.addToFileList('tilemap', key, url, ***REMOVED*** format: format ***REMOVED***);
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Adds a physics data file to the current load queue.
    *
    * The data must be in `Lime + Corona` JSON format. [Physics Editor](https://www.codeandweb.com) by code'n'web exports in this format natively.
    *
    * You can choose to either load the data externally, by providing a URL to a json file.
    * Or you can pass in a JSON object or String via the `data` parameter.
    * If you pass a String the data is automatically run through `JSON.parse` and then immediately added to the Phaser.Cache.
    *
    * If a URL is provided the file is **not** loaded immediately after calling this method, but is added to the load queue.
    *
    * The key must be a unique String. It is used to add the file to the Phaser.Cache upon successful load.
    *
    * Retrieve the file via `Cache.getJSON(key)`. JSON files are automatically parsed upon load.
    * If you need to control when the JSON is parsed then use `Loader.text` instead and parse the text file as needed.
    *
    * The URL can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * If the URL isn't specified and no data is given then the Loader will take the key and create a filename from that.
    * For example if the key is "alien" and no URL or data is given then the Loader will set the URL to be "alien.json".
    * It will always use `.json` as the extension.
    *
    * If you do not desire this action then provide a URL or data object.
    *
    * @method Phaser.Loader#physics
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of the physics json data.
    * @param ***REMOVED***string***REMOVED*** [url] - URL of the physics data file. If undefined or `null` and no data is given the url will be set to `<key>.json`, i.e. if `key` was "alien" then the URL will be "alien.json".
    * @param ***REMOVED***object|string***REMOVED*** [data] - An optional JSON data object. If given then the url is ignored and this JSON object is used for physics data instead.
    * @param ***REMOVED***string***REMOVED*** [format=Phaser.Physics.LIME_CORONA_JSON] - The format of the physics data.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    physics: function (key, url, data, format) ***REMOVED***

        if (url === undefined) ***REMOVED*** url = null; ***REMOVED***
        if (data === undefined) ***REMOVED*** data = null; ***REMOVED***
        if (format === undefined) ***REMOVED*** format = Phaser.Physics.LIME_CORONA_JSON; ***REMOVED***

        if (!url && !data)
        ***REMOVED***
            url = key + '.json';
        ***REMOVED***

        //  A map data object has been given
        if (data)
        ***REMOVED***
            if (typeof data === 'string')
            ***REMOVED***
                data = JSON.parse(data);
            ***REMOVED***

            this.cache.addPhysicsData(key, null, data, format);
        ***REMOVED***
        else
        ***REMOVED***
            this.addToFileList('physics', key, url, ***REMOVED*** format: format ***REMOVED***);
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Adds Bitmap Font files to the current load queue.
    *
    * To create the Bitmap Font files you can use:
    *
    * BMFont (Windows, free): http://www.angelcode.com/products/bmfont/
    * Glyph Designer (OS X, commercial): http://www.71squared.com/en/glyphdesigner
    * Littera (Web-based, free): http://kvazars.com/littera/
    *
    * You can choose to either load the data externally, by providing a URL to an xml file.
    * Or you can pass in an XML object or String via the `xmlData` parameter.
    * If you pass a String the data is automatically run through `Loader.parseXML` and then immediately added to the Phaser.Cache.
    *
    * If URLs are provided the files are **not** loaded immediately after calling this method, but are added to the load queue.
    *
    * The key must be a unique String. It is used to add the file to the Phaser.Cache upon successful load.
    *
    * Retrieve the file via `Cache.getBitmapFont(key)`. XML files are automatically parsed upon load.
    * If you need to control when the XML is parsed then use `Loader.text` instead and parse the XML file as needed.
    *
    * The URLs can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * If the textureURL isn't specified then the Loader will take the key and create a filename from that.
    * For example if the key is "megaFont" and textureURL is null then the Loader will set the URL to be "megaFont.png".
    * The same is true for the atlasURL. If atlasURL isn't specified and no atlasData has been provided then the Loader will
    * set the atlasURL to be the key. For example if the key is "megaFont" the atlasURL will be set to "megaFont.xml".
    *
    * If you do not desire this action then provide URLs and / or a data object.
    *
    * @method Phaser.Loader#bitmapFont
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of the bitmap font.
    * @param ***REMOVED***string***REMOVED*** textureURL -  URL of the Bitmap Font texture file. If undefined or `null` the url will be set to `<key>.png`, i.e. if `key` was "megaFont" then the URL will be "megaFont.png".
    * @param ***REMOVED***string***REMOVED*** atlasURL - URL of the Bitmap Font atlas file (xml/json). If undefined or `null` AND `atlasData` is null, the url will be set to `<key>.xml`, i.e. if `key` was "megaFont" then the URL will be "megaFont.xml".
    * @param ***REMOVED***object***REMOVED*** atlasData - An optional Bitmap Font atlas in string form (stringified xml/json).
    * @param ***REMOVED***number***REMOVED*** [xSpacing=0] - If you'd like to add additional horizontal spacing between the characters then set the pixel value here.
    * @param ***REMOVED***number***REMOVED*** [ySpacing=0] - If you'd like to add additional vertical spacing between the lines then set the pixel value here.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    bitmapFont: function (key, textureURL, atlasURL, atlasData, xSpacing, ySpacing) ***REMOVED***

        if (textureURL === undefined || textureURL === null)
        ***REMOVED***
            textureURL = key + '.png';
        ***REMOVED***

        if (atlasURL === undefined) ***REMOVED*** atlasURL = null; ***REMOVED***
        if (atlasData === undefined) ***REMOVED*** atlasData = null; ***REMOVED***

        if (atlasURL === null && atlasData === null)
        ***REMOVED***
            atlasURL = key + '.xml';
        ***REMOVED***

        if (xSpacing === undefined) ***REMOVED*** xSpacing = 0; ***REMOVED***
        if (ySpacing === undefined) ***REMOVED*** ySpacing = 0; ***REMOVED***

        //  A URL to a json/xml atlas has been given
        if (atlasURL)
        ***REMOVED***
            this.addToFileList('bitmapfont', key, textureURL, ***REMOVED*** atlasURL: atlasURL, xSpacing: xSpacing, ySpacing: ySpacing ***REMOVED***);
        ***REMOVED***
        else
        ***REMOVED***
            //  A stringified xml/json atlas has been given
            if (typeof atlasData === 'string')
            ***REMOVED***
                var json, xml;

                try
                ***REMOVED***
                    json = JSON.parse(atlasData);
                ***REMOVED***
                catch ( e )
                ***REMOVED***
                    xml = this.parseXml(atlasData);
                ***REMOVED***

                if (!xml && !json)
                ***REMOVED***
                    throw new Error("Phaser.Loader. Invalid Bitmap Font atlas given");
                ***REMOVED***

                this.addToFileList('bitmapfont', key, textureURL, ***REMOVED*** atlasURL: null, atlasData: json || xml,
                    atlasType: (!!json ? 'json' : 'xml'), xSpacing: xSpacing, ySpacing: ySpacing ***REMOVED***);
            ***REMOVED***
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Adds a Texture Atlas file to the current load queue.
    *
    * Unlike `Loader.atlasJSONHash` this call expects the atlas data to be in a JSON Array format.
    *
    * To create the Texture Atlas you can use tools such as:
    *
    * [Texture Packer](https://www.codeandweb.com/texturepacker/phaser)
    * [Shoebox](http://renderhjs.net/shoebox/)
    *
    * If using Texture Packer we recommend you enable "Trim sprite names".
    * If your atlas software has an option to "rotate" the resulting frames, you must disable it.
    *
    * You can choose to either load the data externally, by providing a URL to a json file.
    * Or you can pass in a JSON object or String via the `atlasData` parameter.
    * If you pass a String the data is automatically run through `JSON.parse` and then immediately added to the Phaser.Cache.
    *
    * If URLs are provided the files are **not** loaded immediately after calling this method, but are added to the load queue.
    *
    * The key must be a unique String. It is used to add the file to the Phaser.Cache upon successful load.
    *
    * Retrieve the file via `Cache.getImage(key)`. JSON files are automatically parsed upon load.
    * If you need to control when the JSON is parsed then use `Loader.text` instead and parse the JSON file as needed.
    *
    * The URLs can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * If the textureURL isn't specified then the Loader will take the key and create a filename from that.
    * For example if the key is "player" and textureURL is null then the Loader will set the URL to be "player.png".
    * The same is true for the atlasURL. If atlasURL isn't specified and no atlasData has been provided then the Loader will
    * set the atlasURL to be the key. For example if the key is "player" the atlasURL will be set to "player.json".
    *
    * If you do not desire this action then provide URLs and / or a data object.
    *
    * @method Phaser.Loader#atlasJSONArray
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of the texture atlas file.
    * @param ***REMOVED***string***REMOVED*** [textureURL] - URL of the texture atlas image file. If undefined or `null` the url will be set to `<key>.png`, i.e. if `key` was "alien" then the URL will be "alien.png".
    * @param ***REMOVED***string***REMOVED*** [atlasURL] - URL of the texture atlas data file. If undefined or `null` and no atlasData is given, the url will be set to `<key>.json`, i.e. if `key` was "alien" then the URL will be "alien.json".
    * @param ***REMOVED***object***REMOVED*** [atlasData] - A JSON data object. You don't need this if the data is being loaded from a URL.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    atlasJSONArray: function (key, textureURL, atlasURL, atlasData) ***REMOVED***

        return this.atlas(key, textureURL, atlasURL, atlasData, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);

    ***REMOVED***,

    /**
    * Adds a Texture Atlas file to the current load queue.
    *
    * Unlike `Loader.atlas` this call expects the atlas data to be in a JSON Hash format.
    *
    * To create the Texture Atlas you can use tools such as:
    *
    * [Texture Packer](https://www.codeandweb.com/texturepacker/phaser)
    * [Shoebox](http://renderhjs.net/shoebox/)
    *
    * If using Texture Packer we recommend you enable "Trim sprite names".
    * If your atlas software has an option to "rotate" the resulting frames, you must disable it.
    *
    * You can choose to either load the data externally, by providing a URL to a json file.
    * Or you can pass in a JSON object or String via the `atlasData` parameter.
    * If you pass a String the data is automatically run through `JSON.parse` and then immediately added to the Phaser.Cache.
    *
    * If URLs are provided the files are **not** loaded immediately after calling this method, but are added to the load queue.
    *
    * The key must be a unique String. It is used to add the file to the Phaser.Cache upon successful load.
    *
    * Retrieve the file via `Cache.getImage(key)`. JSON files are automatically parsed upon load.
    * If you need to control when the JSON is parsed then use `Loader.text` instead and parse the JSON file as needed.
    *
    * The URLs can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * If the textureURL isn't specified then the Loader will take the key and create a filename from that.
    * For example if the key is "player" and textureURL is null then the Loader will set the URL to be "player.png".
    * The same is true for the atlasURL. If atlasURL isn't specified and no atlasData has been provided then the Loader will
    * set the atlasURL to be the key. For example if the key is "player" the atlasURL will be set to "player.json".
    *
    * If you do not desire this action then provide URLs and / or a data object.
    *
    * @method Phaser.Loader#atlasJSONHash
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of the texture atlas file.
    * @param ***REMOVED***string***REMOVED*** [textureURL] - URL of the texture atlas image file. If undefined or `null` the url will be set to `<key>.png`, i.e. if `key` was "alien" then the URL will be "alien.png".
    * @param ***REMOVED***string***REMOVED*** [atlasURL] - URL of the texture atlas data file. If undefined or `null` and no atlasData is given, the url will be set to `<key>.json`, i.e. if `key` was "alien" then the URL will be "alien.json".
    * @param ***REMOVED***object***REMOVED*** [atlasData] - A JSON data object. You don't need this if the data is being loaded from a URL.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    atlasJSONHash: function (key, textureURL, atlasURL, atlasData) ***REMOVED***

        return this.atlas(key, textureURL, atlasURL, atlasData, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

    ***REMOVED***,

    /**
    * Adds a Texture Atlas file to the current load queue.
    *
    * This call expects the atlas data to be in the Starling XML data format.
    *
    * To create the Texture Atlas you can use tools such as:
    *
    * [Texture Packer](https://www.codeandweb.com/texturepacker/phaser)
    * [Shoebox](http://renderhjs.net/shoebox/)
    *
    * If using Texture Packer we recommend you enable "Trim sprite names".
    * If your atlas software has an option to "rotate" the resulting frames, you must disable it.
    *
    * You can choose to either load the data externally, by providing a URL to an xml file.
    * Or you can pass in an XML object or String via the `atlasData` parameter.
    * If you pass a String the data is automatically run through `Loader.parseXML` and then immediately added to the Phaser.Cache.
    *
    * If URLs are provided the files are **not** loaded immediately after calling this method, but are added to the load queue.
    *
    * The key must be a unique String. It is used to add the file to the Phaser.Cache upon successful load.
    *
    * Retrieve the file via `Cache.getImage(key)`. XML files are automatically parsed upon load.
    * If you need to control when the XML is parsed then use `Loader.text` instead and parse the XML file as needed.
    *
    * The URLs can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * If the textureURL isn't specified then the Loader will take the key and create a filename from that.
    * For example if the key is "player" and textureURL is null then the Loader will set the URL to be "player.png".
    * The same is true for the atlasURL. If atlasURL isn't specified and no atlasData has been provided then the Loader will
    * set the atlasURL to be the key. For example if the key is "player" the atlasURL will be set to "player.xml".
    *
    * If you do not desire this action then provide URLs and / or a data object.
    *
    * @method Phaser.Loader#atlasXML
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of the texture atlas file.
    * @param ***REMOVED***string***REMOVED*** [textureURL] - URL of the texture atlas image file. If undefined or `null` the url will be set to `<key>.png`, i.e. if `key` was "alien" then the URL will be "alien.png".
    * @param ***REMOVED***string***REMOVED*** [atlasURL] - URL of the texture atlas data file. If undefined or `null` and no atlasData is given, the url will be set to `<key>.json`, i.e. if `key` was "alien" then the URL will be "alien.xml".
    * @param ***REMOVED***object***REMOVED*** [atlasData] - An XML data object. You don't need this if the data is being loaded from a URL.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    atlasXML: function (key, textureURL, atlasURL, atlasData) ***REMOVED***

        if (atlasURL === undefined) ***REMOVED*** atlasURL = null; ***REMOVED***
        if (atlasData === undefined) ***REMOVED*** atlasData = null; ***REMOVED***

        if (!atlasURL && !atlasData)
        ***REMOVED***
            atlasURL = key + '.xml';
        ***REMOVED***

        return this.atlas(key, textureURL, atlasURL, atlasData, Phaser.Loader.TEXTURE_ATLAS_XML_STARLING);

    ***REMOVED***,

    /**
    * Adds a Texture Atlas file to the current load queue.
    *
    * To create the Texture Atlas you can use tools such as:
    *
    * [Texture Packer](https://www.codeandweb.com/texturepacker/phaser)
    * [Shoebox](http://renderhjs.net/shoebox/)
    *
    * If using Texture Packer we recommend you enable "Trim sprite names".
    * If your atlas software has an option to "rotate" the resulting frames, you must disable it.
    *
    * You can choose to either load the data externally, by providing a URL to a json file.
    * Or you can pass in a JSON object or String via the `atlasData` parameter.
    * If you pass a String the data is automatically run through `JSON.parse` and then immediately added to the Phaser.Cache.
    *
    * If URLs are provided the files are **not** loaded immediately after calling this method, but are added to the load queue.
    *
    * The key must be a unique String. It is used to add the file to the Phaser.Cache upon successful load.
    *
    * Retrieve the file via `Cache.getImage(key)`. JSON files are automatically parsed upon load.
    * If you need to control when the JSON is parsed then use `Loader.text` instead and parse the JSON file as needed.
    *
    * The URLs can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
    *
    * If the textureURL isn't specified then the Loader will take the key and create a filename from that.
    * For example if the key is "player" and textureURL is null then the Loader will set the URL to be "player.png".
    * The same is true for the atlasURL. If atlasURL isn't specified and no atlasData has been provided then the Loader will
    * set the atlasURL to be the key. For example if the key is "player" the atlasURL will be set to "player.json".
    *
    * If you do not desire this action then provide URLs and / or a data object.
    *
    * @method Phaser.Loader#atlas
    * @param ***REMOVED***string***REMOVED*** key - Unique asset key of the texture atlas file.
    * @param ***REMOVED***string***REMOVED*** [textureURL] - URL of the texture atlas image file. If undefined or `null` the url will be set to `<key>.png`, i.e. if `key` was "alien" then the URL will be "alien.png".
    * @param ***REMOVED***string***REMOVED*** [atlasURL] - URL of the texture atlas data file. If undefined or `null` and no atlasData is given, the url will be set to `<key>.json`, i.e. if `key` was "alien" then the URL will be "alien.json".
    * @param ***REMOVED***object***REMOVED*** [atlasData] - A JSON or XML data object. You don't need this if the data is being loaded from a URL.
    * @param ***REMOVED***number***REMOVED*** [format] - The format of the data. Can be Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY (the default), Phaser.Loader.TEXTURE_ATLAS_JSON_HASH or Phaser.Loader.TEXTURE_ATLAS_XML_STARLING.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    atlas: function (key, textureURL, atlasURL, atlasData, format) ***REMOVED***

        if (textureURL === undefined || textureURL === null)
        ***REMOVED***
            textureURL = key + '.png';
        ***REMOVED***

        if (atlasURL === undefined) ***REMOVED*** atlasURL = null; ***REMOVED***
        if (atlasData === undefined) ***REMOVED*** atlasData = null; ***REMOVED***
        if (format === undefined) ***REMOVED*** format = Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY; ***REMOVED***

        if (!atlasURL && !atlasData)
        ***REMOVED***
            if (format === Phaser.Loader.TEXTURE_ATLAS_XML_STARLING)
            ***REMOVED***
                atlasURL = key + '.xml';
            ***REMOVED***
            else
            ***REMOVED***
                atlasURL = key + '.json';
            ***REMOVED***
        ***REMOVED***

        //  A URL to a json/xml file has been given
        if (atlasURL)
        ***REMOVED***
            this.addToFileList('textureatlas', key, textureURL, ***REMOVED*** atlasURL: atlasURL, format: format ***REMOVED***);
        ***REMOVED***
        else
        ***REMOVED***
            switch (format)
            ***REMOVED***
                //  A json string or object has been given
                case Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY:

                    if (typeof atlasData === 'string')
                    ***REMOVED***
                        atlasData = JSON.parse(atlasData);
                    ***REMOVED***
                    break;

                //  An xml string or object has been given
                case Phaser.Loader.TEXTURE_ATLAS_XML_STARLING:

                    if (typeof atlasData === 'string')
                    ***REMOVED***
                        var xml = this.parseXml(atlasData);

                        if (!xml)
                        ***REMOVED***
                            throw new Error("Phaser.Loader. Invalid Texture Atlas XML given");
                        ***REMOVED***

                        atlasData = xml;
                    ***REMOVED***
                    break;
            ***REMOVED***

            this.addToFileList('textureatlas', key, textureURL, ***REMOVED*** atlasURL: null, atlasData: atlasData, format: format ***REMOVED***);

        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Add a synchronization point to the assets/files added within the supplied callback.
    *
    * A synchronization point denotes that an asset _must_ be completely loaded before
    * subsequent assets can be loaded. An asset marked as a sync-point does not need to wait
    * for previous assets to load (unless they are sync-points). Resources, such as packs, may still
    * be downloaded around sync-points, as long as they do not finalize loading.
    *
    * @method Phaser.Loader#withSyncPoints
    * @param ***REMOVED***function***REMOVED*** callback - The callback is invoked and is supplied with a single argument: the loader.
    * @param ***REMOVED***object***REMOVED*** [callbackContext=(loader)] - Context for the callback.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    */
    withSyncPoint: function (callback, callbackContext) ***REMOVED***

        this._withSyncPointDepth++;

        try ***REMOVED***
            callback.call(callbackContext || this, this);
        ***REMOVED*** finally ***REMOVED***
            this._withSyncPointDepth--;
        ***REMOVED***

        return this;
    ***REMOVED***,

    /**
    * Add a synchronization point to a specific file/asset in the load queue.
    *
    * This has no effect on already loaded assets.
    *
    * @method Phaser.Loader#addSyncPoint
    * @param ***REMOVED***string***REMOVED*** type - The type of resource to turn into a sync point (image, audio, xml, etc).
    * @param ***REMOVED***string***REMOVED*** key - Key of the file you want to turn into a sync point.
    * @return ***REMOVED***Phaser.Loader***REMOVED*** This Loader instance.
    * @see ***REMOVED***@link Phaser.Loader#withSyncPoint withSyncPoint***REMOVED***
    */
    addSyncPoint: function (type, key) ***REMOVED***

        var asset = this.getAsset(type, key);

        if (asset)
        ***REMOVED***
            asset.file.syncPoint = true;
        ***REMOVED***

        return this;
    ***REMOVED***,

    /**
    * Remove a file/asset from the loading queue.
    *
    * A file that is loaded or has started loading cannot be removed.
    *
    * @method Phaser.Loader#removeFile
    * @protected
    * @param ***REMOVED***string***REMOVED*** type - The type of resource to add to the list (image, audio, xml, etc).
    * @param ***REMOVED***string***REMOVED*** key - Key of the file you want to remove.
    */
    removeFile: function (type, key) ***REMOVED***

        var asset = this.getAsset(type, key);

        if (asset)
        ***REMOVED***
            if (!asset.loaded && !asset.loading)
            ***REMOVED***
                this._fileList.splice(asset.index, 1);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Remove all file loading requests - this is _insufficient_ to stop current loading. Use `reset` instead.
    *
    * @method Phaser.Loader#removeAll
    * @protected
    */
    removeAll: function () ***REMOVED***

        this._fileList.length = 0;
        this._flightQueue.length = 0;

    ***REMOVED***,

    /**
    * Start loading the assets. Normally you don't need to call this yourself as the StateManager will do so.
    *
    * @method Phaser.Loader#start
    */
    start: function () ***REMOVED***

        if (this.isLoading)
        ***REMOVED***
            return;
        ***REMOVED***

        this.hasLoaded = false;
        this.isLoading = true;

        this.updateProgress();

        this.processLoadQueue();

    ***REMOVED***,

    /**
    * Process the next item(s) in the file/asset queue.
    *
    * Process the queue and start loading enough items to fill up the inflight queue.
    *
    * If a sync-file is encountered then subsequent asset processing is delayed until it completes.
    * The exception to this rule is that packfiles can be downloaded (but not processed) even if
    * there appear other sync files (ie. packs) - this enables multiple packfiles to be fetched in parallel.
    * such as during the start phaser.
    *
    * @method Phaser.Loader#processLoadQueue
    * @private
    */
    processLoadQueue: function () ***REMOVED***

        if (!this.isLoading)
        ***REMOVED***
            console.warn('Phaser.Loader - active loading canceled / reset');
            this.finishedLoading(true);
            return;
        ***REMOVED***

        // Empty the flight queue as applicable
        for (var i = 0; i < this._flightQueue.length; i++)
        ***REMOVED***
            var file = this._flightQueue[i];

            if (file.loaded || file.error)
            ***REMOVED***
                this._flightQueue.splice(i, 1);
                i--;

                file.loading = false;
                file.requestUrl = null;
                file.requestObject = null;

                if (file.error)
                ***REMOVED***
                    this.onFileError.dispatch(file.key, file);
                ***REMOVED***

                if (file.type !== 'packfile')
                ***REMOVED***
                    this._loadedFileCount++;
                    this.onFileComplete.dispatch(this.progress, file.key, !file.error, this._loadedFileCount, this._totalFileCount);
                ***REMOVED***
                else if (file.type === 'packfile' && file.error)
                ***REMOVED***
                    // Non-error pack files are handled when processing the file queue
                    this._loadedPackCount++;
                    this.onPackComplete.dispatch(file.key, !file.error, this._loadedPackCount, this._totalPackCount);
                ***REMOVED***

            ***REMOVED***
        ***REMOVED***

        // When true further non-pack file downloads are suppressed
        var syncblock = false;

        var inflightLimit = this.enableParallel ? Phaser.Math.clamp(this.maxParallelDownloads, 1, 12) : 1;

        for (var i = this._processingHead; i < this._fileList.length; i++)
        ***REMOVED***
            var file = this._fileList[i];

            // Pack is fetched (ie. has data) and is currently at the start of the process queue.
            if (file.type === 'packfile' && !file.error && file.loaded && i === this._processingHead)
            ***REMOVED***
                // Processing the pack / adds more files
                this.processPack(file);

                this._loadedPackCount++;
                this.onPackComplete.dispatch(file.key, !file.error, this._loadedPackCount, this._totalPackCount);
            ***REMOVED***

            if (file.loaded || file.error)
            ***REMOVED***
                // Item at the start of file list finished, can skip it in future
                if (i === this._processingHead)
                ***REMOVED***
                    this._processingHead = i + 1;
                ***REMOVED***
            ***REMOVED***
            else if (!file.loading && this._flightQueue.length < inflightLimit)
            ***REMOVED***
                // -> not loaded/failed, not loading
                if (file.type === 'packfile' && !file.data)
                ***REMOVED***
                    // Fetches the pack data: the pack is processed above as it reaches queue-start.
                    // (Packs do not trigger onLoadStart or onFileStart.)
                    this._flightQueue.push(file);
                    file.loading = true;

                    this.loadFile(file);
                ***REMOVED***
                else if (!syncblock)
                ***REMOVED***
                    if (!this._fileLoadStarted)
                    ***REMOVED***
                        this._fileLoadStarted = true;
                        this.onLoadStart.dispatch();
                    ***REMOVED***

                    this._flightQueue.push(file);
                    file.loading = true;
                    this.onFileStart.dispatch(this.progress, file.key, file.url);

                    this.loadFile(file);
                ***REMOVED***
            ***REMOVED***

            if (!file.loaded && file.syncPoint)
            ***REMOVED***
                syncblock = true;
            ***REMOVED***

            // Stop looking if queue full - or if syncblocked and there are no more packs.
            // (As only packs can be loaded around a syncblock)
            if (this._flightQueue.length >= inflightLimit ||
                (syncblock && this._loadedPackCount === this._totalPackCount))
            ***REMOVED***
                break;
            ***REMOVED***
        ***REMOVED***

        this.updateProgress();

        // True when all items in the queue have been advanced over
        // (There should be no inflight items as they are complete - loaded/error.)
        if (this._processingHead >= this._fileList.length)
        ***REMOVED***
            this.finishedLoading();
        ***REMOVED***
        else if (!this._flightQueue.length)
        ***REMOVED***
            // Flight queue is empty but file list is not done being processed.
            // This indicates a critical internal error with no known recovery.
            console.warn("Phaser.Loader - aborting: processing queue empty, loading may have stalled");

            var _this = this;

            setTimeout(function () ***REMOVED***
                _this.finishedLoading(true);
            ***REMOVED***, 2000);
        ***REMOVED***

    ***REMOVED***,

    /**
    * The loading is all finished.
    *
    * @method Phaser.Loader#finishedLoading
    * @private
    * @param ***REMOVED***boolean***REMOVED*** [abnormal=true] - True if the loading finished abnormally.
    */
    finishedLoading: function (abnormal) ***REMOVED***

        if (this.hasLoaded)
        ***REMOVED***
            return;
        ***REMOVED***

        this.hasLoaded = true;
        this.isLoading = false;

        // If there were no files make sure to trigger the event anyway, for consistency
        if (!abnormal && !this._fileLoadStarted)
        ***REMOVED***
            this._fileLoadStarted = true;
            this.onLoadStart.dispatch();
        ***REMOVED***

        this.onLoadComplete.dispatch();

        this.game.state.loadComplete();

        this.reset();

    ***REMOVED***,

    /**
    * Informs the loader that the given file resource has been fetched and processed;
    * or such a request has failed.
    *
    * @method Phaser.Loader#asyncComplete
    * @private
    * @param ***REMOVED***object***REMOVED*** file
    * @param ***REMOVED***string***REMOVED*** [error=''] - The error message, if any. No message implies no error.
    */
    asyncComplete: function (file, errorMessage) ***REMOVED***

        if (errorMessage === undefined) ***REMOVED*** errorMessage = ''; ***REMOVED***

        file.loaded = true;
        file.error = !!errorMessage;

        if (errorMessage)
        ***REMOVED***
            file.errorMessage = errorMessage;

            console.warn('Phaser.Loader - ' + file.type + '[' + file.key + ']' + ': ' + errorMessage);
            // debugger;
        ***REMOVED***

        this.processLoadQueue();

    ***REMOVED***,

    /**
    * Process pack data. This will usually modify the file list.
    *
    * @method Phaser.Loader#processPack
    * @private
    * @param ***REMOVED***object***REMOVED*** pack
    */
    processPack: function (pack) ***REMOVED***

        var packData = pack.data[pack.key];

        if (!packData)
        ***REMOVED***
            console.warn('Phaser.Loader - ' + pack.key + ': pack has data, but not for pack key');
            return;
        ***REMOVED***

        for (var i = 0; i < packData.length; i++)
        ***REMOVED***
            var file = packData[i];

            switch (file.type)
            ***REMOVED***
                case "image":
                    this.image(file.key, file.url, file.overwrite);
                    break;

                case "text":
                    this.text(file.key, file.url, file.overwrite);
                    break;

                case "json":
                    this.json(file.key, file.url, file.overwrite);
                    break;

                case "xml":
                    this.xml(file.key, file.url, file.overwrite);
                    break;

                case "script":
                    this.script(file.key, file.url, file.callback, pack.callbackContext || this);
                    break;

                case "binary":
                    this.binary(file.key, file.url, file.callback, pack.callbackContext || this);
                    break;

                case "spritesheet":
                    this.spritesheet(file.key, file.url, file.frameWidth, file.frameHeight, file.frameMax, file.margin, file.spacing);
                    break;

                case "video":
                    this.video(file.key, file.urls);
                    break;

                case "audio":
                    this.audio(file.key, file.urls, file.autoDecode);
                    break;

                case "audiosprite":
                    this.audiosprite(file.key, file.urls, file.jsonURL, file.jsonData, file.autoDecode);
                    break;

                case "tilemap":
                    this.tilemap(file.key, file.url, file.data, Phaser.Tilemap[file.format]);
                    break;

                case "physics":
                    this.physics(file.key, file.url, file.data, Phaser.Loader[file.format]);
                    break;

                case "bitmapFont":
                    this.bitmapFont(file.key, file.textureURL, file.atlasURL, file.atlasData, file.xSpacing, file.ySpacing);
                    break;

                case "atlasJSONArray":
                    this.atlasJSONArray(file.key, file.textureURL, file.atlasURL, file.atlasData);
                    break;

                case "atlasJSONHash":
                    this.atlasJSONHash(file.key, file.textureURL, file.atlasURL, file.atlasData);
                    break;

                case "atlasXML":
                    this.atlasXML(file.key, file.textureURL, file.atlasURL, file.atlasData);
                    break;

                case "atlas":
                    this.atlas(file.key, file.textureURL, file.atlasURL, file.atlasData, Phaser.Loader[file.format]);
                    break;

                case "shader":
                    this.shader(file.key, file.url, file.overwrite);
                    break;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Transforms the asset URL.
    *
    * The default implementation prepends the baseURL if the url doesn't begin with http or //
    *
    * @method Phaser.Loader#transformUrl
    * @protected
    * @param ***REMOVED***string***REMOVED*** url - The url to transform.
    * @param ***REMOVED***object***REMOVED*** file - The file object being transformed.
    * @return ***REMOVED***string***REMOVED*** The transformed url. In rare cases where the url isn't specified it will return false instead.
    */
    transformUrl: function (url, file) ***REMOVED***

        if (!url)
        ***REMOVED***
            return false;
        ***REMOVED***

        if (url.match(/^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/))
        ***REMOVED***
            return url;
        ***REMOVED***
        else
        ***REMOVED***
            return this.baseURL + file.path + url;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Start fetching a resource.
    *
    * All code paths, async or otherwise, from this function must return to `asyncComplete`.
    *
    * @method Phaser.Loader#loadFile
    * @private
    * @param ***REMOVED***object***REMOVED*** file
    */
    loadFile: function (file) ***REMOVED***

        //  Image or Data?
        switch (file.type)
        ***REMOVED***
            case 'packfile':
                this.xhrLoad(file, this.transformUrl(file.url, file), 'text', this.fileComplete);
                break;

            case 'image':
            case 'spritesheet':
            case 'textureatlas':
            case 'bitmapfont':
                this.loadImageTag(file);
                break;

            case 'audio':
                file.url = this.getAudioURL(file.url);

                if (file.url)
                ***REMOVED***
                    //  WebAudio or Audio Tag?
                    if (this.game.sound.usingWebAudio)
                    ***REMOVED***
                        this.xhrLoad(file, this.transformUrl(file.url, file), 'arraybuffer', this.fileComplete);
                    ***REMOVED***
                    else if (this.game.sound.usingAudioTag)
                    ***REMOVED***
                        this.loadAudioTag(file);
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    this.fileError(file, null, 'No supported audio URL specified or device does not have audio playback support');
                ***REMOVED***
                break;

            case 'video':
                file.url = this.getVideoURL(file.url);

                if (file.url)
                ***REMOVED***
                    if (file.asBlob)
                    ***REMOVED***
                        this.xhrLoad(file, this.transformUrl(file.url, file), 'blob', this.fileComplete);
                    ***REMOVED***
                    else
                    ***REMOVED***
                        this.loadVideoTag(file);
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    this.fileError(file, null, 'No supported video URL specified or device does not have video playback support');
                ***REMOVED***
                break;

            case 'json':

                this.xhrLoad(file, this.transformUrl(file.url, file), 'text', this.jsonLoadComplete);
                break;

            case 'xml':

                this.xhrLoad(file, this.transformUrl(file.url, file), 'text', this.xmlLoadComplete);
                break;

            case 'tilemap':

                if (file.format === Phaser.Tilemap.TILED_JSON)
                ***REMOVED***
                    this.xhrLoad(file, this.transformUrl(file.url, file), 'text', this.jsonLoadComplete);
                ***REMOVED***
                else if (file.format === Phaser.Tilemap.CSV)
                ***REMOVED***
                    this.xhrLoad(file, this.transformUrl(file.url, file), 'text', this.csvLoadComplete);
                ***REMOVED***
                else
                ***REMOVED***
                    this.asyncComplete(file, "invalid Tilemap format: " + file.format);
                ***REMOVED***
                break;

            case 'text':
            case 'script':
            case 'shader':
            case 'physics':
                this.xhrLoad(file, this.transformUrl(file.url, file), 'text', this.fileComplete);
                break;

            case 'binary':
                this.xhrLoad(file, this.transformUrl(file.url, file), 'arraybuffer', this.fileComplete);
                break;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Continue async loading through an Image tag.
    * @private
    */
    loadImageTag: function (file) ***REMOVED***

        var _this = this;

        file.data = new Image();
        file.data.name = file.key;

        if (this.crossOrigin)
        ***REMOVED***
            file.data.crossOrigin = this.crossOrigin;
        ***REMOVED***

        file.data.onload = function () ***REMOVED***
            if (file.data.onload)
            ***REMOVED***
                file.data.onload = null;
                file.data.onerror = null;
                _this.fileComplete(file);
            ***REMOVED***
        ***REMOVED***;

        file.data.onerror = function () ***REMOVED***
            if (file.data.onload)
            ***REMOVED***
                file.data.onload = null;
                file.data.onerror = null;
                _this.fileError(file);
            ***REMOVED***
        ***REMOVED***;

        file.data.src = this.transformUrl(file.url, file);

        // Image is immediately-available/cached
        if (file.data.complete && file.data.width && file.data.height)
        ***REMOVED***
            file.data.onload = null;
            file.data.onerror = null;
            this.fileComplete(file);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Continue async loading through a Video tag.
    * @private
    */
    loadVideoTag: function (file) ***REMOVED***

        var _this = this;

        file.data = document.createElement("video");
        file.data.name = file.key;
        file.data.controls = false;
        file.data.autoplay = false;

        var videoLoadEvent = function () ***REMOVED***

            file.data.removeEventListener(file.loadEvent, videoLoadEvent, false);
            file.data.onerror = null;
            file.data.canplay = true;
            Phaser.GAMES[_this.game.id].load.fileComplete(file);

        ***REMOVED***;

        file.data.onerror = function () ***REMOVED***
            file.data.removeEventListener(file.loadEvent, videoLoadEvent, false);
            file.data.onerror = null;
            file.data.canplay = false;
            _this.fileError(file);
        ***REMOVED***;

        file.data.addEventListener(file.loadEvent, videoLoadEvent, false);

        file.data.src = this.transformUrl(file.url, file);
        file.data.load();

    ***REMOVED***,

    /**
    * Continue async loading through an Audio tag.
    * @private
    */
    loadAudioTag: function (file) ***REMOVED***

        var _this = this;

        if (this.game.sound.touchLocked)
        ***REMOVED***
            //  If audio is locked we can't do this yet, so need to queue this load request. Bum.
            file.data = new Audio();
            file.data.name = file.key;
            file.data.preload = 'auto';
            file.data.src = this.transformUrl(file.url, file);

            this.fileComplete(file);
        ***REMOVED***
        else
        ***REMOVED***
            file.data = new Audio();
            file.data.name = file.key;

            var playThroughEvent = function () ***REMOVED***
                file.data.removeEventListener('canplaythrough', playThroughEvent, false);
                file.data.onerror = null;
                _this.fileComplete(file);
            ***REMOVED***;

            file.data.onerror = function () ***REMOVED***
                file.data.removeEventListener('canplaythrough', playThroughEvent, false);
                file.data.onerror = null;
                _this.fileError(file);
            ***REMOVED***;

            file.data.preload = 'auto';
            file.data.src = this.transformUrl(file.url, file);
            file.data.addEventListener('canplaythrough', playThroughEvent, false);
            file.data.load();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Starts the xhr loader.
    *
    * This is designed specifically to use with asset file processing.
    *
    * @method Phaser.Loader#xhrLoad
    * @private
    * @param ***REMOVED***object***REMOVED*** file - The file/pack to load.
    * @param ***REMOVED***string***REMOVED*** url - The URL of the file.
    * @param ***REMOVED***string***REMOVED*** type - The xhr responseType.
    * @param ***REMOVED***function***REMOVED*** onload - The function to call on success. Invoked in `this` context and supplied with `(file, xhr)` arguments.
    * @param ***REMOVED***function***REMOVED*** [onerror=fileError]  The function to call on error. Invoked in `this` context and supplied with `(file, xhr)` arguments.
    */
    xhrLoad: function (file, url, type, onload, onerror) ***REMOVED***

        if (this.useXDomainRequest && window.XDomainRequest)
        ***REMOVED***
            this.xhrLoadWithXDR(file, url, type, onload, onerror);
            return;
        ***REMOVED***

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = type;

        if (this.headers['requestedWith'] !== false)
        ***REMOVED***
            xhr.setRequestHeader('X-Requested-With', this.headers['requestedWith']);
        ***REMOVED***

        if (this.headers[file.type])
        ***REMOVED***
            xhr.setRequestHeader('Accept', this.headers[file.type]);
        ***REMOVED***

        onerror = onerror || this.fileError;

        var _this = this;

        xhr.onload = function () ***REMOVED***

            try ***REMOVED***
                if (xhr.readyState === 4 && xhr.status >= 400 && xhr.status <= 599) ***REMOVED*** // Handle HTTP status codes of 4xx and 5xx as errors, even if xhr.onerror was not called.
                    return onerror.call(_this, file, xhr);
                ***REMOVED***
                else ***REMOVED***
                    return onload.call(_this, file, xhr);
                ***REMOVED***
            ***REMOVED*** catch (e) ***REMOVED***

                //  If this was the last file in the queue and an error is thrown in the create method
                //  then it's caught here, so be sure we don't carry on processing it

                if (!_this.hasLoaded)
                ***REMOVED***
                    _this.asyncComplete(file, e.message || 'Exception');
                ***REMOVED***
                else
                ***REMOVED***
                    if (window['console'])
                    ***REMOVED***
                        console.error(e);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***;

        xhr.onerror = function () ***REMOVED***

            try ***REMOVED***

                return onerror.call(_this, file, xhr);

            ***REMOVED*** catch (e) ***REMOVED***

                if (!_this.hasLoaded)
                ***REMOVED***
                    _this.asyncComplete(file, e.message || 'Exception');
                ***REMOVED***
                else
                ***REMOVED***
                    if (window['console'])
                    ***REMOVED***
                        console.error(e);
                    ***REMOVED***
                ***REMOVED***

            ***REMOVED***
        ***REMOVED***;

        file.requestObject = xhr;
        file.requestUrl = url;

        xhr.send();

    ***REMOVED***,

    /**
    * Starts the xhr loader - using XDomainRequest.
    * This should _only_ be used with IE 9. Phaser does not support IE 8 and XDR is deprecated in IE 10.
    *
    * This is designed specifically to use with asset file processing.
    *
    * @method Phaser.Loader#xhrLoad
    * @private
    * @param ***REMOVED***object***REMOVED*** file - The file/pack to load.
    * @param ***REMOVED***string***REMOVED*** url - The URL of the file.
    * @param ***REMOVED***string***REMOVED*** type - The xhr responseType.
    * @param ***REMOVED***function***REMOVED*** onload - The function to call on success. Invoked in `this` context and supplied with `(file, xhr)` arguments.
    * @param ***REMOVED***function***REMOVED*** [onerror=fileError]  The function to call on error. Invoked in `this` context and supplied with `(file, xhr)` arguments.
    * @deprecated This is only relevant for IE 9.
    */
    xhrLoadWithXDR: function (file, url, type, onload, onerror) ***REMOVED***

        // Special IE9 magic .. only
        if (!this._warnedAboutXDomainRequest &&
            (!this.game.device.ie || this.game.device.ieVersion >= 10))
        ***REMOVED***
            this._warnedAboutXDomainRequest = true;
            console.warn("Phaser.Loader - using XDomainRequest outside of IE 9");
        ***REMOVED***

        // Ref: http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
        var xhr = new window.XDomainRequest();
        xhr.open('GET', url, true);
        xhr.responseType = type;

        // XDomainRequest has a few quirks. Occasionally it will abort requests
        // A way to avoid this is to make sure ALL callbacks are set even if not used
        // More info here: http://stackoverflow.com/questions/15786966/xdomainrequest-aborts-post-on-ie-9
        xhr.timeout = 3000;

        onerror = onerror || this.fileError;

        var _this = this;

        xhr.onerror = function () ***REMOVED***
            try ***REMOVED***
                return onerror.call(_this, file, xhr);
            ***REMOVED*** catch (e) ***REMOVED***
                _this.asyncComplete(file, e.message || 'Exception');
            ***REMOVED***
        ***REMOVED***;

        xhr.ontimeout = function () ***REMOVED***
            try ***REMOVED***
                return onerror.call(_this, file, xhr);
            ***REMOVED*** catch (e) ***REMOVED***
                _this.asyncComplete(file, e.message || 'Exception');
            ***REMOVED***
        ***REMOVED***;

        xhr.onprogress = function() ***REMOVED******REMOVED***;

        xhr.onload = function () ***REMOVED***
            try ***REMOVED***
                if (xhr.readyState === 4 && xhr.status >= 400 && xhr.status <= 599) ***REMOVED*** // Handle HTTP status codes of 4xx and 5xx as errors, even if xhr.onerror was not called.
                    return onerror.call(_this, file, xhr);
                ***REMOVED***
                else ***REMOVED***
                    return onload.call(_this, file, xhr);
                ***REMOVED***
                return onload.call(_this, file, xhr);
            ***REMOVED*** catch (e) ***REMOVED***
                _this.asyncComplete(file, e.message || 'Exception');
            ***REMOVED***
        ***REMOVED***;

        file.requestObject = xhr;
        file.requestUrl = url;

        //  Note: The xdr.send() call is wrapped in a timeout to prevent an issue with the interface where some requests are lost
        //  if multiple XDomainRequests are being sent at the same time.
        setTimeout(function () ***REMOVED***
            xhr.send();
        ***REMOVED***, 0);

    ***REMOVED***,

    /**
    * Give a bunch of URLs, return the first URL that has an extension this device thinks it can play.
    *
    * It is assumed that the device can play "blob:" or "data:" URIs - There is no mime-type checking on data URIs.
    *
    * @method Phaser.Loader#getVideoURL
    * @private
    * @param ***REMOVED***object[]|string[]***REMOVED*** urls - See ***REMOVED***@link #video***REMOVED*** for format.
    * @return ***REMOVED***string***REMOVED*** The URL to try and fetch; or null.
    */
    getVideoURL: function (urls) ***REMOVED***

        for (var i = 0; i < urls.length; i++)
        ***REMOVED***
            var url = urls[i];
            var videoType;

            if (url.uri) // ***REMOVED***uri: .., type: ..***REMOVED*** pair
            ***REMOVED***
                videoType = url.type;
                url = url.uri;

                if (this.game.device.canPlayVideo(videoType))
                ***REMOVED***
                    return url;
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                // Assume direct-data URI can be played if not in a paired form; select immediately
                if (url.indexOf("blob:") === 0 || url.indexOf("data:") === 0)
                ***REMOVED***
                    return url;
                ***REMOVED***

                if (url.indexOf("?") >= 0) // Remove query from URL
                ***REMOVED***
                    url = url.substr(0, url.indexOf("?"));
                ***REMOVED***

                var extension = url.substr((Math.max(0, url.lastIndexOf(".")) || Infinity) + 1);

                videoType = extension.toLowerCase();

                if (this.game.device.canPlayVideo(videoType))
                ***REMOVED***
                    return urls[i];
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Give a bunch of URLs, return the first URL that has an extension this device thinks it can play.
    *
    * It is assumed that the device can play "blob:" or "data:" URIs - There is no mime-type checking on data URIs.
    *
    * @method Phaser.Loader#getAudioURL
    * @private
    * @param ***REMOVED***object[]|string[]***REMOVED*** urls - See ***REMOVED***@link #audio***REMOVED*** for format.
    * @return ***REMOVED***string***REMOVED*** The URL to try and fetch; or null.
    */
    getAudioURL: function (urls) ***REMOVED***

        if (this.game.sound.noAudio)
        ***REMOVED***
            return null;
        ***REMOVED***

        for (var i = 0; i < urls.length; i++)
        ***REMOVED***
            var url = urls[i];
            var audioType;

            if (url.uri) // ***REMOVED***uri: .., type: ..***REMOVED*** pair
            ***REMOVED***
                audioType = url.type;
                url = url.uri;

                if (this.game.device.canPlayAudio(audioType))
                ***REMOVED***
                    return url;
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                // Assume direct-data URI can be played if not in a paired form; select immediately
                if (url.indexOf("blob:") === 0 || url.indexOf("data:") === 0)
                ***REMOVED***
                    return url;
                ***REMOVED***

                if (url.indexOf("?") >= 0) // Remove query from URL
                ***REMOVED***
                    url = url.substr(0, url.indexOf("?"));
                ***REMOVED***

                var extension = url.substr((Math.max(0, url.lastIndexOf(".")) || Infinity) + 1);

                audioType = extension.toLowerCase();

                if (this.game.device.canPlayAudio(audioType))
                ***REMOVED***
                    return urls[i];
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Error occurred when loading a file.
    *
    * @method Phaser.Loader#fileError
    * @private
    * @param ***REMOVED***object***REMOVED*** file
    * @param ***REMOVED***?XMLHttpRequest***REMOVED*** xhr - XHR request, unspecified if loaded via other means (eg. tags)
    * @param ***REMOVED***string***REMOVED*** reason
    */
    fileError: function (file, xhr, reason) ***REMOVED***

        var url = file.requestUrl || this.transformUrl(file.url, file);
        var message = 'error loading asset from URL ' + url;

        if (!reason && xhr)
        ***REMOVED***
            reason = xhr.status;
        ***REMOVED***

        if (reason)
        ***REMOVED***
            message = message + ' (' + reason + ')';
        ***REMOVED***

        this.asyncComplete(file, message);

    ***REMOVED***,

    /**
    * Called when a file/resources had been downloaded and needs to be processed further.
    *
    * @method Phaser.Loader#fileComplete
    * @private
    * @param ***REMOVED***object***REMOVED*** file - File loaded
    * @param ***REMOVED***?XMLHttpRequest***REMOVED*** xhr - XHR request, unspecified if loaded via other means (eg. tags)
    */
    fileComplete: function (file, xhr) ***REMOVED***

        var loadNext = true;

        switch (file.type)
        ***REMOVED***
            case 'packfile':

                // Pack data must never be false-ish after it is fetched without error
                var data = JSON.parse(xhr.responseText);
                file.data = data || ***REMOVED******REMOVED***;
                break;

            case 'image':

                this.cache.addImage(file.key, file.url, file.data);
                break;

            case 'spritesheet':

                this.cache.addSpriteSheet(file.key, file.url, file.data, file.frameWidth, file.frameHeight, file.frameMax, file.margin, file.spacing);
                break;

            case 'textureatlas':

                if (file.atlasURL == null)
                ***REMOVED***
                    this.cache.addTextureAtlas(file.key, file.url, file.data, file.atlasData, file.format);
                ***REMOVED***
                else
                ***REMOVED***
                    //  Load the JSON or XML before carrying on with the next file
                    loadNext = false;

                    if (file.format === Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY || file.format === Phaser.Loader.TEXTURE_ATLAS_JSON_HASH || file.format === Phaser.Loader.TEXTURE_ATLAS_JSON_PYXEL)
                    ***REMOVED***
                        this.xhrLoad(file, this.transformUrl(file.atlasURL, file), 'text', this.jsonLoadComplete);
                    ***REMOVED***
                    else if (file.format === Phaser.Loader.TEXTURE_ATLAS_XML_STARLING)
                    ***REMOVED***
                        this.xhrLoad(file, this.transformUrl(file.atlasURL, file), 'text', this.xmlLoadComplete);
                    ***REMOVED***
                    else
                    ***REMOVED***
                        throw new Error("Phaser.Loader. Invalid Texture Atlas format: " + file.format);
                    ***REMOVED***
                ***REMOVED***
                break;

            case 'bitmapfont':

                if (!file.atlasURL)
                ***REMOVED***
                    this.cache.addBitmapFont(file.key, file.url, file.data, file.atlasData, file.atlasType, file.xSpacing, file.ySpacing);
                ***REMOVED***
                else
                ***REMOVED***
                    //  Load the XML before carrying on with the next file
                    loadNext = false;
                    this.xhrLoad(file, this.transformUrl(file.atlasURL, file), 'text', function (file, xhr) ***REMOVED***
                        var json;

                        try
                        ***REMOVED***
                            // Try to parse as JSON, if it fails, then it's hopefully XML
                            json = JSON.parse(xhr.responseText);
                        ***REMOVED***
                        catch (e) ***REMOVED******REMOVED***

                        if (!!json)
                        ***REMOVED***
                            file.atlasType = 'json';
                            this.jsonLoadComplete(file, xhr);
                        ***REMOVED***
                        else
                        ***REMOVED***
                            file.atlasType = 'xml';
                            this.xmlLoadComplete(file, xhr);
                        ***REMOVED***
                    ***REMOVED***);
                ***REMOVED***
                break;

            case 'video':

                if (file.asBlob)
                ***REMOVED***
                    try
                    ***REMOVED***
                        file.data = xhr.response;
                    ***REMOVED***
                    catch (e)
                    ***REMOVED***
                        throw new Error("Phaser.Loader. Unable to parse video file as Blob: " + file.key);
                    ***REMOVED***
                ***REMOVED***

                this.cache.addVideo(file.key, file.url, file.data, file.asBlob);
                break;

            case 'audio':

                if (this.game.sound.usingWebAudio)
                ***REMOVED***
                    file.data = xhr.response;

                    this.cache.addSound(file.key, file.url, file.data, true, false);

                    if (file.autoDecode)
                    ***REMOVED***
                        this.game.sound.decode(file.key);
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    this.cache.addSound(file.key, file.url, file.data, false, true);
                ***REMOVED***
                break;

            case 'text':
                file.data = xhr.responseText;
                this.cache.addText(file.key, file.url, file.data);
                break;

            case 'shader':
                file.data = xhr.responseText;
                this.cache.addShader(file.key, file.url, file.data);
                break;

            case 'physics':
                var data = JSON.parse(xhr.responseText);
                this.cache.addPhysicsData(file.key, file.url, data, file.format);
                break;

            case 'script':
                file.data = document.createElement('script');
                file.data.language = 'javascript';
                file.data.type = 'text/javascript';
                file.data.defer = false;
                file.data.text = xhr.responseText;
                document.head.appendChild(file.data);
                if (file.callback)
                ***REMOVED***
                    file.data = file.callback.call(file.callbackContext, file.key, xhr.responseText);
                ***REMOVED***
                break;

            case 'binary':
                if (file.callback)
                ***REMOVED***
                    file.data = file.callback.call(file.callbackContext, file.key, xhr.response);
                ***REMOVED***
                else
                ***REMOVED***
                    file.data = xhr.response;
                ***REMOVED***

                this.cache.addBinary(file.key, file.data);

                break;
        ***REMOVED***

        if (loadNext)
        ***REMOVED***
            this.asyncComplete(file);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Successfully loaded a JSON file - only used for certain types.
    *
    * @method Phaser.Loader#jsonLoadComplete
    * @private
    * @param ***REMOVED***object***REMOVED*** file - File associated with this request
    * @param ***REMOVED***XMLHttpRequest***REMOVED*** xhr
    */
    jsonLoadComplete: function (file, xhr) ***REMOVED***

        var data = JSON.parse(xhr.responseText);

        if (file.type === 'tilemap')
        ***REMOVED***
            this.cache.addTilemap(file.key, file.url, data, file.format);
        ***REMOVED***
        else if (file.type === 'bitmapfont')
        ***REMOVED***
            this.cache.addBitmapFont(file.key, file.url, file.data, data, file.atlasType, file.xSpacing, file.ySpacing);
        ***REMOVED***
        else if (file.type === 'json')
        ***REMOVED***
            this.cache.addJSON(file.key, file.url, data);
        ***REMOVED***
        else
        ***REMOVED***
            this.cache.addTextureAtlas(file.key, file.url, file.data, data, file.format);
        ***REMOVED***

        this.asyncComplete(file);
    ***REMOVED***,

    /**
    * Successfully loaded a CSV file - only used for certain types.
    *
    * @method Phaser.Loader#csvLoadComplete
    * @private
    * @param ***REMOVED***object***REMOVED*** file - File associated with this request
    * @param ***REMOVED***XMLHttpRequest***REMOVED*** xhr
    */
    csvLoadComplete: function (file, xhr) ***REMOVED***

        var data = xhr.responseText;

        this.cache.addTilemap(file.key, file.url, data, file.format);

        this.asyncComplete(file);

    ***REMOVED***,

    /**
    * Successfully loaded an XML file - only used for certain types.
    *
    * @method Phaser.Loader#xmlLoadComplete
    * @private
    * @param ***REMOVED***object***REMOVED*** file - File associated with this request
    * @param ***REMOVED***XMLHttpRequest***REMOVED*** xhr
    */
    xmlLoadComplete: function (file, xhr) ***REMOVED***

        // Always try parsing the content as XML, regardless of actually response type
        var data = xhr.responseText;
        var xml = this.parseXml(data);

        if (!xml)
        ***REMOVED***
            var responseType = xhr.responseType || xhr.contentType; // contentType for MS-XDomainRequest
            console.warn('Phaser.Loader - ' + file.key + ': invalid XML (' + responseType + ')');
            this.asyncComplete(file, "invalid XML");
            return;
        ***REMOVED***

        if (file.type === 'bitmapfont')
        ***REMOVED***
            this.cache.addBitmapFont(file.key, file.url, file.data, xml, file.atlasType, file.xSpacing, file.ySpacing);
        ***REMOVED***
        else if (file.type === 'textureatlas')
        ***REMOVED***
            this.cache.addTextureAtlas(file.key, file.url, file.data, xml, file.format);
        ***REMOVED***
        else if (file.type === 'xml')
        ***REMOVED***
            this.cache.addXML(file.key, file.url, xml);
        ***REMOVED***

        this.asyncComplete(file);

    ***REMOVED***,

    /**
    * Parses string data as XML.
    *
    * @method Phaser.Loader#parseXml
    * @private
    * @param ***REMOVED***string***REMOVED*** data - The XML text to parse
    * @return ***REMOVED***?XMLDocument***REMOVED*** Returns the xml document, or null if such could not parsed to a valid document.
    */
    parseXml: function (data) ***REMOVED***

        var xml;

        try
        ***REMOVED***
            if (window['DOMParser'])
            ***REMOVED***
                var domparser = new DOMParser();
                xml = domparser.parseFromString(data, "text/xml");
            ***REMOVED***
            else
            ***REMOVED***
                xml = new ActiveXObject("Microsoft.XMLDOM");
                // Why is this 'false'?
                xml.async = 'false';
                xml.loadXML(data);
            ***REMOVED***
        ***REMOVED***
        catch (e)
        ***REMOVED***
            xml = null;
        ***REMOVED***

        if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length)
        ***REMOVED***
            return null;
        ***REMOVED***
        else
        ***REMOVED***
            return xml;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Update the loading sprite progress.
    *
    * @method Phaser.Loader#nextFile
    * @private
    * @param ***REMOVED***object***REMOVED*** previousFile
    * @param ***REMOVED***boolean***REMOVED*** success - Whether the previous asset loaded successfully or not.
    */
    updateProgress: function () ***REMOVED***

        if (this.preloadSprite)
        ***REMOVED***
            if (this.preloadSprite.direction === 0)
            ***REMOVED***
                this.preloadSprite.rect.width = Math.floor((this.preloadSprite.width / 100) * this.progress);
            ***REMOVED***
            else
            ***REMOVED***
                this.preloadSprite.rect.height = Math.floor((this.preloadSprite.height / 100) * this.progress);
            ***REMOVED***

            if (this.preloadSprite.sprite)
            ***REMOVED***
                this.preloadSprite.sprite.updateCrop();
            ***REMOVED***
            else
            ***REMOVED***
                //  We seem to have lost our sprite - maybe it was destroyed?
                this.preloadSprite = null;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Returns the number of files that have already been loaded, even if they errored.
    *
    * @method Phaser.Loader#totalLoadedFiles
    * @protected
    * @return ***REMOVED***number***REMOVED*** The number of files that have already been loaded (even if they errored)
    */
    totalLoadedFiles: function () ***REMOVED***

        return this._loadedFileCount;

    ***REMOVED***,

    /**
    * Returns the number of files still waiting to be processed in the load queue. This value decreases as each file in the queue is loaded.
    *
    * @method Phaser.Loader#totalQueuedFiles
    * @protected
    * @return ***REMOVED***number***REMOVED*** The number of files that still remain in the load queue.
    */
    totalQueuedFiles: function () ***REMOVED***

        return this._totalFileCount - this._loadedFileCount;

    ***REMOVED***,

    /**
    * Returns the number of asset packs that have already been loaded, even if they errored.
    *
    * @method Phaser.Loader#totalLoadedPacks
    * @protected
    * @return ***REMOVED***number***REMOVED*** The number of asset packs that have already been loaded (even if they errored)
    */
    totalLoadedPacks: function () ***REMOVED***

        return this._totalPackCount;

    ***REMOVED***,

    /**
    * Returns the number of asset packs still waiting to be processed in the load queue. This value decreases as each pack in the queue is loaded.
    *
    * @method Phaser.Loader#totalQueuedPacks
    * @protected
    * @return ***REMOVED***number***REMOVED*** The number of asset packs that still remain in the load queue.
    */
    totalQueuedPacks: function () ***REMOVED***

        return this._totalPackCount - this._loadedPackCount;

    ***REMOVED***

***REMOVED***;

/**
* The non-rounded load progress value (from 0.0 to 100.0).
*
* A general indicator of the progress.
* It is possible for the progress to decrease, after `onLoadStart`, if more files are dynamically added.
*
* @name Phaser.Loader#progressFloat
* @property ***REMOVED***number***REMOVED***
*/
Object.defineProperty(Phaser.Loader.prototype, "progressFloat", ***REMOVED***

    get: function () ***REMOVED***
        var progress = (this._loadedFileCount / this._totalFileCount) * 100;
        return Phaser.Math.clamp(progress || 0, 0, 100);
    ***REMOVED***

***REMOVED***);

/**
* The rounded load progress percentage value (from 0 to 100). See ***REMOVED***@link Phaser.Loader#progressFloat***REMOVED***.
*
* @name Phaser.Loader#progress
* @property ***REMOVED***integer***REMOVED***
*/
Object.defineProperty(Phaser.Loader.prototype, "progress", ***REMOVED***

    get: function () ***REMOVED***
        return Math.round(this.progressFloat);
    ***REMOVED***

***REMOVED***);

Phaser.Loader.prototype.constructor = Phaser.Loader;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Phaser.LoaderParser parses data objects from Phaser.Loader that need more preparation before they can be inserted into the Cache.
*
* @class Phaser.LoaderParser
*/
Phaser.LoaderParser = ***REMOVED***

    /**
    * Alias for xmlBitmapFont, for backwards compatibility.
    * 
    * @method Phaser.LoaderParser.bitmapFont
    * @param ***REMOVED***object***REMOVED*** xml - XML data you want to parse.
    * @param ***REMOVED***PIXI.BaseTexture***REMOVED*** baseTexture - The BaseTexture this font uses.
    * @param ***REMOVED***number***REMOVED*** [xSpacing=0] - Additional horizontal spacing between the characters.
    * @param ***REMOVED***number***REMOVED*** [ySpacing=0] - Additional vertical spacing between the characters.
    * @return ***REMOVED***object***REMOVED*** The parsed Bitmap Font data.
    */
    bitmapFont: function (xml, baseTexture, xSpacing, ySpacing) ***REMOVED***

        return this.xmlBitmapFont(xml, baseTexture, xSpacing, ySpacing);

    ***REMOVED***,

    /**
    * Parse a Bitmap Font from an XML file.
    *
    * @method Phaser.LoaderParser.xmlBitmapFont
    * @param ***REMOVED***object***REMOVED*** xml - XML data you want to parse.
    * @param ***REMOVED***PIXI.BaseTexture***REMOVED*** baseTexture - The BaseTexture this font uses.
    * @param ***REMOVED***number***REMOVED*** [xSpacing=0] - Additional horizontal spacing between the characters.
    * @param ***REMOVED***number***REMOVED*** [ySpacing=0] - Additional vertical spacing between the characters.
    * @return ***REMOVED***object***REMOVED*** The parsed Bitmap Font data.
    */
    xmlBitmapFont: function (xml, baseTexture, xSpacing, ySpacing) ***REMOVED***

        var data = ***REMOVED******REMOVED***;
        var info = xml.getElementsByTagName('info')[0];
        var common = xml.getElementsByTagName('common')[0];

        data.font = info.getAttribute('face');
        data.size = parseInt(info.getAttribute('size'), 10);
        data.lineHeight = parseInt(common.getAttribute('lineHeight'), 10) + ySpacing;
        data.chars = ***REMOVED******REMOVED***;

        var letters = xml.getElementsByTagName('char');

        for (var i = 0; i < letters.length; i++)
        ***REMOVED***
            var charCode = parseInt(letters[i].getAttribute('id'), 10);

            data.chars[charCode] = ***REMOVED***
                x: parseInt(letters[i].getAttribute('x'), 10),
                y: parseInt(letters[i].getAttribute('y'), 10),
                width: parseInt(letters[i].getAttribute('width'), 10),
                height: parseInt(letters[i].getAttribute('height'), 10),
                xOffset: parseInt(letters[i].getAttribute('xoffset'), 10),
                yOffset: parseInt(letters[i].getAttribute('yoffset'), 10),
                xAdvance: parseInt(letters[i].getAttribute('xadvance'), 10) + xSpacing,
                kerning: ***REMOVED******REMOVED***
            ***REMOVED***;
        ***REMOVED***

        var kernings = xml.getElementsByTagName('kerning');

        for (i = 0; i < kernings.length; i++)
        ***REMOVED***
            var first = parseInt(kernings[i].getAttribute('first'), 10);
            var second = parseInt(kernings[i].getAttribute('second'), 10);
            var amount = parseInt(kernings[i].getAttribute('amount'), 10);

            data.chars[second].kerning[first] = amount;
        ***REMOVED***

        return this.finalizeBitmapFont(baseTexture, data);

    ***REMOVED***,

    /**
    * Parse a Bitmap Font from a JSON file.
    *
    * @method Phaser.LoaderParser.jsonBitmapFont
    * @param ***REMOVED***object***REMOVED*** json - JSON data you want to parse.
    * @param ***REMOVED***PIXI.BaseTexture***REMOVED*** baseTexture - The BaseTexture this font uses.
    * @param ***REMOVED***number***REMOVED*** [xSpacing=0] - Additional horizontal spacing between the characters.
    * @param ***REMOVED***number***REMOVED*** [ySpacing=0] - Additional vertical spacing between the characters.
    * @return ***REMOVED***object***REMOVED*** The parsed Bitmap Font data.
    */
    jsonBitmapFont: function (json, baseTexture, xSpacing, ySpacing) ***REMOVED***

        var data = ***REMOVED***
            font: json.font.info._face,
            size: parseInt(json.font.info._size, 10),
            lineHeight: parseInt(json.font.common._lineHeight, 10) + ySpacing,
            chars: ***REMOVED******REMOVED***
        ***REMOVED***;

        json.font.chars["char"].forEach(

            function parseChar(letter) ***REMOVED***

                var charCode = parseInt(letter._id, 10);

                data.chars[charCode] = ***REMOVED***
                    x: parseInt(letter._x, 10),
                    y: parseInt(letter._y, 10),
                    width: parseInt(letter._width, 10),
                    height: parseInt(letter._height, 10),
                    xOffset: parseInt(letter._xoffset, 10),
                    yOffset: parseInt(letter._yoffset, 10),
                    xAdvance: parseInt(letter._xadvance, 10) + xSpacing,
                    kerning: ***REMOVED******REMOVED***
                ***REMOVED***;
            ***REMOVED***

        );

        if (json.font.kernings && json.font.kernings.kerning) ***REMOVED***

            json.font.kernings.kerning.forEach(

                function parseKerning(kerning) ***REMOVED***

                    data.chars[kerning._second].kerning[kerning._first] = parseInt(kerning._amount, 10);

                ***REMOVED***

            );

        ***REMOVED***

        return this.finalizeBitmapFont(baseTexture, data);

    ***REMOVED***,

    /**
    * Finalize Bitmap Font parsing.
    *
    * @method Phaser.LoaderParser.finalizeBitmapFont
    * @private
    * @param ***REMOVED***PIXI.BaseTexture***REMOVED*** baseTexture - The BaseTexture this font uses.
    * @param ***REMOVED***object***REMOVED*** bitmapFontData - Pre-parsed bitmap font data.
    * @return ***REMOVED***object***REMOVED*** The parsed Bitmap Font data.
    */
    finalizeBitmapFont: function (baseTexture, bitmapFontData) ***REMOVED***

        Object.keys(bitmapFontData.chars).forEach(

            function addTexture(charCode) ***REMOVED***

                var letter = bitmapFontData.chars[charCode];

                letter.texture = new PIXI.Texture(baseTexture, new Phaser.Rectangle(letter.x, letter.y, letter.width, letter.height));

            ***REMOVED***

        );

        return bitmapFontData;

    ***REMOVED***
***REMOVED***;
