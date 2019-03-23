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
