/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Responsible for parsing sprite sheet and JSON data into the internal FrameData format that Phaser uses for animations.
*
* @class Phaser.AnimationParser
* @static
*/
Phaser.AnimationParser = ***REMOVED***

    /**
    * Parse a Sprite Sheet and extract the animation frame data from it.
    *
    * @method Phaser.AnimationParser.spriteSheet
    * @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    * @param ***REMOVED***string|Image***REMOVED*** key - The Game.Cache asset key of the Sprite Sheet image or an actual HTML Image element.
    * @param ***REMOVED***number***REMOVED*** frameWidth - The fixed width of each frame of the animation.
    * @param ***REMOVED***number***REMOVED*** frameHeight - The fixed height of each frame of the animation.
    * @param ***REMOVED***number***REMOVED*** [frameMax=-1] - The total number of animation frames to extract from the Sprite Sheet. The default value of -1 means "extract all frames".
    * @param ***REMOVED***number***REMOVED*** [margin=0] - If the frames have been drawn with a margin, specify the amount here.
    * @param ***REMOVED***number***REMOVED*** [spacing=0] - If the frames have been drawn with spacing between them, specify the amount here.
    * @return ***REMOVED***Phaser.FrameData***REMOVED*** A FrameData object containing the parsed frames.
    */
    spriteSheet: function (game, key, frameWidth, frameHeight, frameMax, margin, spacing) ***REMOVED***

        var img = key;

        if (typeof key === 'string')
        ***REMOVED***
            img = game.cache.getImage(key);
        ***REMOVED***

        if (img === null)
        ***REMOVED***
            return null;
        ***REMOVED***

        var width = img.width;
        var height = img.height;

        if (frameWidth <= 0)
        ***REMOVED***
            frameWidth = Math.floor(-width / Math.min(-1, frameWidth));
        ***REMOVED***

        if (frameHeight <= 0)
        ***REMOVED***
            frameHeight = Math.floor(-height / Math.min(-1, frameHeight));
        ***REMOVED***

        var row = Math.floor((width - margin) / (frameWidth + spacing));
        var column = Math.floor((height - margin) / (frameHeight + spacing));
        var total = row * column;

        if (frameMax !== -1)
        ***REMOVED***
            total = frameMax;
        ***REMOVED***

        //  Zero or smaller than frame sizes?
        if (width === 0 || height === 0 || width < frameWidth || height < frameHeight || total === 0)
        ***REMOVED***
            console.warn("Phaser.AnimationParser.spriteSheet: '" + key + "'s width/height zero or width/height < given frameWidth/frameHeight");
            return null;
        ***REMOVED***

        //  Let's create some frames then
        var data = new Phaser.FrameData();
        var x = margin;
        var y = margin;

        for (var i = 0; i < total; i++)
        ***REMOVED***
            data.addFrame(new Phaser.Frame(i, x, y, frameWidth, frameHeight, ''));

            x += frameWidth + spacing;

            if (x + frameWidth > width)
            ***REMOVED***
                x = margin;
                y += frameHeight + spacing;
            ***REMOVED***
        ***REMOVED***

        return data;

    ***REMOVED***,

    /**
    * Parse the JSON data and extract the animation frame data from it.
    *
    * @method Phaser.AnimationParser.JSONData
    * @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    * @param ***REMOVED***object***REMOVED*** json - The JSON data from the Texture Atlas. Must be in Array format.
    * @return ***REMOVED***Phaser.FrameData***REMOVED*** A FrameData object containing the parsed frames.
    */
    JSONData: function (game, json) ***REMOVED***

        //  Malformed?
        if (!json['frames'])
        ***REMOVED***
            console.warn("Phaser.AnimationParser.JSONData: Invalid Texture Atlas JSON given, missing 'frames' array");
            console.log(json);
            return;
        ***REMOVED***

        //  Let's create some frames then
        var data = new Phaser.FrameData();

        //  By this stage frames is a fully parsed array
        var frames = json['frames'];
        var newFrame;

        for (var i = 0; i < frames.length; i++)
        ***REMOVED***
            newFrame = data.addFrame(new Phaser.Frame(
                i,
                frames[i].frame.x,
                frames[i].frame.y,
                frames[i].frame.w,
                frames[i].frame.h,
                frames[i].filename
            ));

            if (frames[i].trimmed)
            ***REMOVED***
                newFrame.setTrim(
                    frames[i].trimmed,
                    frames[i].sourceSize.w,
                    frames[i].sourceSize.h,
                    frames[i].spriteSourceSize.x,
                    frames[i].spriteSourceSize.y,
                    frames[i].spriteSourceSize.w,
                    frames[i].spriteSourceSize.h
                );
            ***REMOVED***
        ***REMOVED***

        return data;

    ***REMOVED***,

    /**
    * Parse the JSON data and extract the animation frame data from it.
    *
    * @method Phaser.AnimationParser.JSONDataPyxel
    * @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    * @param ***REMOVED***object***REMOVED*** json - The JSON data from the Texture Atlas. Must be in Pyxel JSON format.
    * @return ***REMOVED***Phaser.FrameData***REMOVED*** A FrameData object containing the parsed frames.
    */
    JSONDataPyxel: function (game, json) ***REMOVED***

        //  Malformed? There are a few keys to check here.
        var signature = ['layers', 'tilewidth','tileheight','tileswide', 'tileshigh'];

        signature.forEach( function(key) ***REMOVED***
            if (!json[key])
            ***REMOVED***
                console.warn('Phaser.AnimationParser.JSONDataPyxel: Invalid Pyxel Tilemap JSON given, missing "' + key + '" key.');
                console.log(json);
                return;
            ***REMOVED***
        ***REMOVED***);

        // For this purpose, I only care about parsing tilemaps with a single layer.
        if (json['layers'].length !== 1)
        ***REMOVED***
            console.warn('Phaser.AnimationParser.JSONDataPyxel: Too many layers, this parser only supports flat Tilemaps.');
            console.log(json);
            return;
        ***REMOVED***

        var data = new Phaser.FrameData();

        var tileheight = json['tileheight'];
        var tilewidth = json['tilewidth'];

        var frames = json['layers'][0]['tiles'];
        var newFrame;

        for (var i = 0; i < frames.length; i++)
        ***REMOVED***
            newFrame = data.addFrame(new Phaser.Frame(
                i,
                frames[i].x,
                frames[i].y,
                tilewidth,
                tileheight,
                "frame_" + i  // No names are included in pyxel tilemap data.
            ));

            // No trim data is included.
            newFrame.setTrim(false);
        ***REMOVED***

        return data;

    ***REMOVED***,

    /**
    * Parse the JSON data and extract the animation frame data from it.
    *
    * @method Phaser.AnimationParser.JSONDataHash
    * @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    * @param ***REMOVED***object***REMOVED*** json - The JSON data from the Texture Atlas. Must be in JSON Hash format.
    * @return ***REMOVED***Phaser.FrameData***REMOVED*** A FrameData object containing the parsed frames.
    */
    JSONDataHash: function (game, json) ***REMOVED***

        //  Malformed?
        if (!json['frames'])
        ***REMOVED***
            console.warn("Phaser.AnimationParser.JSONDataHash: Invalid Texture Atlas JSON given, missing 'frames' object");
            console.log(json);
            return;
        ***REMOVED***

        //  Let's create some frames then
        var data = new Phaser.FrameData();

        //  By this stage frames is a fully parsed array
        var frames = json['frames'];
        var newFrame;
        var i = 0;

        for (var key in frames)
        ***REMOVED***
            newFrame = data.addFrame(new Phaser.Frame(
                i,
                frames[key].frame.x,
                frames[key].frame.y,
                frames[key].frame.w,
                frames[key].frame.h,
                key
            ));

            if (frames[key].trimmed)
            ***REMOVED***
                newFrame.setTrim(
                    frames[key].trimmed,
                    frames[key].sourceSize.w,
                    frames[key].sourceSize.h,
                    frames[key].spriteSourceSize.x,
                    frames[key].spriteSourceSize.y,
                    frames[key].spriteSourceSize.w,
                    frames[key].spriteSourceSize.h
                );
            ***REMOVED***

            i++;
        ***REMOVED***

        return data;

    ***REMOVED***,

    /**
    * Parse the XML data and extract the animation frame data from it.
    *
    * @method Phaser.AnimationParser.XMLData
    * @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    * @param ***REMOVED***object***REMOVED*** xml - The XML data from the Texture Atlas. Must be in Starling XML format.
    * @return ***REMOVED***Phaser.FrameData***REMOVED*** A FrameData object containing the parsed frames.
    */
    XMLData: function (game, xml) ***REMOVED***

        //  Malformed?
        if (!xml.getElementsByTagName('TextureAtlas'))
        ***REMOVED***
            console.warn("Phaser.AnimationParser.XMLData: Invalid Texture Atlas XML given, missing <TextureAtlas> tag");
            return;
        ***REMOVED***

        //  Let's create some frames then
        var data = new Phaser.FrameData();
        var frames = xml.getElementsByTagName('SubTexture');
        var newFrame;

        var name;
        var frame;
        var x;
        var y;
        var width;
        var height;
        var frameX;
        var frameY;
        var frameWidth;
        var frameHeight;

        for (var i = 0; i < frames.length; i++)
        ***REMOVED***
            frame = frames[i].attributes;

            name = frame.name.value;
            x = parseInt(frame.x.value, 10);
            y = parseInt(frame.y.value, 10);
            width = parseInt(frame.width.value, 10);
            height = parseInt(frame.height.value, 10);

            frameX = null;
            frameY = null;

            if (frame.frameX)
            ***REMOVED***
                frameX = Math.abs(parseInt(frame.frameX.value, 10));
                frameY = Math.abs(parseInt(frame.frameY.value, 10));
                frameWidth = parseInt(frame.frameWidth.value, 10);
                frameHeight = parseInt(frame.frameHeight.value, 10);
            ***REMOVED***

            newFrame = data.addFrame(new Phaser.Frame(i, x, y, width, height, name));

            //  Trimmed?
            if (frameX !== null || frameY !== null)
            ***REMOVED***
                newFrame.setTrim(true, width, height, frameX, frameY, frameWidth, frameHeight);
            ***REMOVED***
        ***REMOVED***

        return data;

    ***REMOVED***

***REMOVED***;
