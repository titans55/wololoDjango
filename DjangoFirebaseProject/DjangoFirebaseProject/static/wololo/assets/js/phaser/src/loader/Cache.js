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
