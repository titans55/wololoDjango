/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* BitmapText objects work by taking a texture file and an XML or JSON file that describes the font structure.
* It then generates a new Sprite object for each letter of the text, proportionally spaced out and aligned to 
* match the font structure.
* 
* BitmapText objects are less flexible than Text objects, in that they have less features such as shadows, fills and the ability 
* to use Web Fonts, however you trade this flexibility for rendering speed. You can also create visually compelling BitmapTexts by
* processing the font texture in an image editor, applying fills and any other effects required.
*
* To create multi-line text insert \r, \n or \r\n escape codes into the text string.
*
* If you are having performance issues due to the volume of sprites being rendered, and do not require the text to be constantly
* updating, you can use BitmapText.generateTexture to create a static texture from this BitmapText.
*
* To create a BitmapText data files you can use:
*
* BMFont (Windows, free): http://www.angelcode.com/products/bmfont/
* Glyph Designer (OS X, commercial): http://www.71squared.com/en/glyphdesigner
* Littera (Web-based, free): http://kvazars.com/littera/
*
* For most use cases it is recommended to use XML. If you wish to use JSON, the formatting should be equal to the result of
* converting a valid XML file through the popular X2JS library. An online tool for conversion can be found here: http://codebeautify.org/xmltojson
*
* If you were using an older version of Phaser (< 2.4) and using the DOMish parser hack, please remove this. It isn't required any longer.
*
* @class Phaser.BitmapText
* @constructor
* @extends PIXI.DisplayObjectContainer
* @extends Phaser.Component.Core
* @extends Phaser.Component.Angle
* @extends Phaser.Component.AutoCull
* @extends Phaser.Component.Bounds
* @extends Phaser.Component.Destroy
* @extends Phaser.Component.FixedToCamera
* @extends Phaser.Component.InputEnabled
* @extends Phaser.Component.InWorld
* @extends Phaser.Component.LifeSpan
* @extends Phaser.Component.PhysicsBody
* @extends Phaser.Component.Reset
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***number***REMOVED*** x - X coordinate to display the BitmapText object at.
* @param ***REMOVED***number***REMOVED*** y - Y coordinate to display the BitmapText object at.
* @param ***REMOVED***string***REMOVED*** font - The key of the BitmapText as stored in Phaser.Cache.
* @param ***REMOVED***string***REMOVED*** [text=''] - The text that will be rendered. This can also be set later via BitmapText.text.
* @param ***REMOVED***number***REMOVED*** [size=32] - The size the font will be rendered at in pixels.
* @param ***REMOVED***string***REMOVED*** [align='left'] - The alignment of multi-line text. Has no effect if there is only one line of text.
*/
Phaser.BitmapText = function (game, x, y, font, text, size, align) ***REMOVED***

    x = x || 0;
    y = y || 0;
    font = font || '';
    text = text || '';
    size = size || 32;
    align = align || 'left';

    PIXI.DisplayObjectContainer.call(this);

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.BITMAPTEXT;

    /**
    * @property ***REMOVED***number***REMOVED*** physicsType - The const physics body type of this object.
    * @readonly
    */
    this.physicsType = Phaser.SPRITE;

    /**
    * @property ***REMOVED***number***REMOVED*** textWidth - The width in pixels of the overall text area, taking into consideration multi-line text.
    * @readOnly
    */
    this.textWidth = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** textHeight - The height in pixels of the overall text area, taking into consideration multi-line text.
    * @readOnly
    */
    this.textHeight = 0;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** anchor - The anchor value of this BitmapText.
    */
    this.anchor = new Phaser.Point();

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** _prevAnchor - The previous anchor value.
    * @private
    */
    this._prevAnchor = new Phaser.Point();

    /**
    * @property ***REMOVED***array***REMOVED*** _glyphs - Private tracker for the letter sprite pool.
    * @private
    */
    this._glyphs = [];

    /**
    * @property ***REMOVED***number***REMOVED*** _maxWidth - Internal cache var.
    * @private
    */
    this._maxWidth = 0;

    /**
    * @property ***REMOVED***string***REMOVED*** _text - Internal cache var.
    * @private
    */
    this._text = text.toString() || '';

    /**
    * @property ***REMOVED***string***REMOVED*** _data - Internal cache var.
    * @private
    */
    this._data = game.cache.getBitmapFont(font);

    /**
    * @property ***REMOVED***string***REMOVED*** _font - Internal cache var.
    * @private
    */
    this._font = font;

    /**
    * @property ***REMOVED***number***REMOVED*** _fontSize - Internal cache var.
    * @private
    */
    this._fontSize = size;

    /**
    * @property ***REMOVED***string***REMOVED*** _align - Internal cache var.
    * @private
    */
    this._align = align;

    /**
    * @property ***REMOVED***number***REMOVED*** _tint - Internal cache var.
    * @private
    */
    this._tint = 0xFFFFFF;

    this.updateText();

    /**
    * @property ***REMOVED***boolean***REMOVED*** dirty - The dirty state of this object.
    */
    this.dirty = false;

    Phaser.Component.Core.init.call(this, game, x, y, '', null);

***REMOVED***;

Phaser.BitmapText.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
Phaser.BitmapText.prototype.constructor = Phaser.BitmapText;

Phaser.Component.Core.install.call(Phaser.BitmapText.prototype, [
    'Angle',
    'AutoCull',
    'Bounds',
    'Destroy',
    'FixedToCamera',
    'InputEnabled',
    'InWorld',
    'LifeSpan',
    'PhysicsBody',
    'Reset'
]);

Phaser.BitmapText.prototype.preUpdatePhysics = Phaser.Component.PhysicsBody.preUpdate;
Phaser.BitmapText.prototype.preUpdateLifeSpan = Phaser.Component.LifeSpan.preUpdate;
Phaser.BitmapText.prototype.preUpdateInWorld = Phaser.Component.InWorld.preUpdate;
Phaser.BitmapText.prototype.preUpdateCore = Phaser.Component.Core.preUpdate;

/**
* Automatically called by World.preUpdate.
*
* @method
* @memberof Phaser.BitmapText
* @return ***REMOVED***boolean***REMOVED*** True if the BitmapText was rendered, otherwise false.
*/
Phaser.BitmapText.prototype.preUpdate = function () ***REMOVED***

    if (!this.preUpdatePhysics() || !this.preUpdateLifeSpan() || !this.preUpdateInWorld())
    ***REMOVED***
        return false;
    ***REMOVED***

    return this.preUpdateCore();

***REMOVED***;

/**
* Automatically called by World.preUpdate.
* @method Phaser.BitmapText.prototype.postUpdate
*/
Phaser.BitmapText.prototype.postUpdate = function () ***REMOVED***

    Phaser.Component.PhysicsBody.postUpdate.call(this);
    Phaser.Component.FixedToCamera.postUpdate.call(this);

    if (this.body && this.body.type === Phaser.Physics.ARCADE)
    ***REMOVED***
        if ((this.textWidth !== this.body.sourceWidth) || (this.textHeight !== this.body.sourceHeight))
        ***REMOVED***
            this.body.setSize(this.textWidth, this.textHeight);
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* The text to be displayed by this BitmapText object.
* 
* It's faster to use `BitmapText.text = string`, but this is kept for backwards compatibility.
*
* @method Phaser.BitmapText.prototype.setText
* @param ***REMOVED***string***REMOVED*** text - The text to be displayed by this BitmapText object.
*/
Phaser.BitmapText.prototype.setText = function (text) ***REMOVED***

    this.text = text;

***REMOVED***;

/**
* Given the input text this will scan the characters until either a newline is encountered, 
* or the line exceeds maxWidth, taking into account kerning, character widths and scaling.
* 
* @method Phaser.BitmapText.prototype.scanLine
* @private
* @param ***REMOVED***object***REMOVED*** data - A reference to the font object in the Phaser.Cache.
* @param ***REMOVED***float***REMOVED*** scale - The scale of the font in relation to the texture.
* @param ***REMOVED***string***REMOVED*** text - The text to parse.
* @return ***REMOVED***object***REMOVED*** An object containing the parsed characters, total pixel width and x offsets.
*/
Phaser.BitmapText.prototype.scanLine = function (data, scale, text) ***REMOVED***

    var x = 0;
    var w = 0;
    var lastSpace = -1;
    var wrappedWidth = 0;
    var prevCharCode = null;
    var maxWidth = (this._maxWidth > 0) ? this._maxWidth : null;
    var chars = [];

    //  Let's scan the text and work out if any of the lines are > maxWidth
    for (var i = 0; i < text.length; i++)
    ***REMOVED***
        var end = (i === text.length - 1) ? true : false;

        if (/(?:\r\n|\r|\n)/.test(text.charAt(i)))
        ***REMOVED***
            return ***REMOVED*** width: w, text: text.substr(0, i), end: end, chars: chars ***REMOVED***;
        ***REMOVED***
        else
        ***REMOVED***
            var charCode = text.charCodeAt(i);
            var charData = data.chars[charCode];

            var c = 0;

            //  If the character data isn't found in the data array 
            //  then we replace it with a blank space
            if (charData === undefined)
            ***REMOVED***
                charCode = 32;
                charData = data.chars[charCode];
            ***REMOVED***

            //  Adjust for kerning from previous character to this one
            var kerning = (prevCharCode && charData.kerning[prevCharCode]) ? charData.kerning[prevCharCode] : 0;

            //  Record the last space in the string and the current width
            if (/(\s)/.test(text.charAt(i)))
            ***REMOVED***
                lastSpace = i;
                wrappedWidth = w;
            ***REMOVED***
            
            //  What will the line width be if we add this character to it?
            c = (kerning + charData.texture.width + charData.xOffset) * scale;

            //  Do we need to line-wrap?
            if (maxWidth && ((w + c) >= maxWidth) && lastSpace > -1)
            ***REMOVED***
                //  The last space was at "lastSpace" which was "i - lastSpace" characters ago
                return ***REMOVED*** width: wrappedWidth || w, text: text.substr(0, i - (i - lastSpace)), end: end, chars: chars ***REMOVED***;
            ***REMOVED***
            else
            ***REMOVED***
                w += (charData.xAdvance + kerning) * scale;

                chars.push(x + (charData.xOffset + kerning) * scale);

                x += (charData.xAdvance + kerning) * scale;

                prevCharCode = charCode;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    return ***REMOVED*** width: w, text: text, end: end, chars: chars ***REMOVED***;

***REMOVED***;

/**
* Given a text string this will scan each character in the string to ensure it exists
* in the BitmapText font data. If it doesn't the character is removed, or replaced with the `replace` argument.
*
* If no font data has been loaded at all this returns an empty string, as nothing can be rendered.
* 
* @method Phaser.BitmapText.prototype.cleanText
* @param ***REMOVED***string***REMOVED*** text - The text to parse.
* @param ***REMOVED***string***REMOVED*** [replace=''] - The replacement string for any missing characters.
* @return ***REMOVED***string***REMOVED*** The cleaned text string.
*/
Phaser.BitmapText.prototype.cleanText = function (text, replace) ***REMOVED***

    if (replace === undefined)
    ***REMOVED***
        replace = '';
    ***REMOVED***

    var data = this._data.font;

    if (!data)
    ***REMOVED***
        return '';
    ***REMOVED***

    var re = /\r\n|\n\r|\n|\r/g;
    var lines = text.replace(re, "\n").split("\n");

    for (var i = 0; i < lines.length; i++)
    ***REMOVED***
        var output = '';
        var line = lines[i];

        for (var c = 0; c < line.length; c++)
        ***REMOVED***
            if (data.chars[line.charCodeAt(c)])
            ***REMOVED***
                output = output.concat(line[c]);
            ***REMOVED***
            else
            ***REMOVED***
                output = output.concat(replace);
            ***REMOVED***
        ***REMOVED***

        lines[i] = output;
    ***REMOVED***

    return lines.join("\n");

***REMOVED***;

/**
* Renders text and updates it when needed.
*
* @method Phaser.BitmapText.prototype.updateText
* @private
*/
Phaser.BitmapText.prototype.updateText = function () ***REMOVED***

    var data = this._data.font;

    if (!data)
    ***REMOVED***
        return;
    ***REMOVED***

    var text = this.text;
    var scale = this._fontSize / data.size;
    var lines = [];

    var y = 0;

    this.textWidth = 0;

    do
    ***REMOVED***
        var line = this.scanLine(data, scale, text);

        line.y = y;

        lines.push(line);

        if (line.width > this.textWidth)
        ***REMOVED***
            this.textWidth = line.width;
        ***REMOVED***

        y += (data.lineHeight * scale);

        text = text.substr(line.text.length + 1);
        
    ***REMOVED*** while (line.end === false);

    this.textHeight = y;

    var t = 0;
    var align = 0;
    var ax = this.textWidth * this.anchor.x;
    var ay = this.textHeight * this.anchor.y;

    for (var i = 0; i < lines.length; i++)
    ***REMOVED***
        var line = lines[i];

        if (this._align === 'right')
        ***REMOVED***
            align = this.textWidth - line.width;
        ***REMOVED***
        else if (this._align === 'center')
        ***REMOVED***
            align = (this.textWidth - line.width) / 2;
        ***REMOVED***

        for (var c = 0; c < line.text.length; c++)
        ***REMOVED***
            var charCode = line.text.charCodeAt(c);
            var charData = data.chars[charCode];

            if (charData === undefined)
            ***REMOVED***
                charCode = 32;
                charData = data.chars[charCode];
            ***REMOVED***

            var g = this._glyphs[t];

            if (g)
            ***REMOVED***
                //  Sprite already exists in the glyphs pool, so we'll reuse it for this letter
                g.texture = charData.texture;
            ***REMOVED***
            else
            ***REMOVED***
                //  We need a new sprite as the pool is empty or exhausted
                g = new PIXI.Sprite(charData.texture);
                g.name = line.text[c];
                this._glyphs.push(g);
            ***REMOVED***

            g.position.x = (line.chars[c] + align) - ax;
            g.position.y = (line.y + (charData.yOffset * scale)) - ay;

            g.scale.set(scale);
            g.tint = this.tint;
            g.texture.requiresReTint = true;

            if (!g.parent)
            ***REMOVED***
                this.addChild(g);
            ***REMOVED***

            t++;
        ***REMOVED***
    ***REMOVED***

    //  Remove unnecessary children
    //  This moves them from the display list (children array) but retains them in the _glyphs pool
    for (i = t; i < this._glyphs.length; i++)
    ***REMOVED***
        this.removeChild(this._glyphs[i]);
    ***REMOVED***

***REMOVED***;

/**
* If a BitmapText changes from having a large number of characters to having very few characters it will cause lots of
* Sprites to be retained in the BitmapText._glyphs array. Although they are not attached to the display list they
* still take up memory while sat in the glyphs pool waiting to be re-used in the future.
*
* If you know that the BitmapText will not grow any larger then you can purge out the excess glyphs from the pool 
* by calling this method.
*
* Calling this doesn't prevent you from increasing the length of the text again in the future.
*
* @method Phaser.BitmapText.prototype.purgeGlyphs
* @return ***REMOVED***integer***REMOVED*** The amount of glyphs removed from the pool.
*/
Phaser.BitmapText.prototype.purgeGlyphs = function () ***REMOVED***

    var len = this._glyphs.length;
    var kept = [];

    for (var i = 0; i < this._glyphs.length; i++)
    ***REMOVED***
        if (this._glyphs[i].parent !== this)
        ***REMOVED***
            this._glyphs[i].destroy();
        ***REMOVED***
        else
        ***REMOVED***
            kept.push(this._glyphs[i]);
        ***REMOVED***
    ***REMOVED***

    this._glyphs = [];
    this._glyphs = kept;

    this.updateText();

    return len - kept.length;

***REMOVED***;

/**
* Updates the transform of this object.
*
* @method Phaser.BitmapText.prototype.updateTransform
* @private
*/
Phaser.BitmapText.prototype.updateTransform = function () ***REMOVED***

    if (this.dirty || !this.anchor.equals(this._prevAnchor))
    ***REMOVED***
        this.updateText();
        this.dirty = false;
        this._prevAnchor.copyFrom(this.anchor);
    ***REMOVED***

    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);

***REMOVED***;

/**
* @name Phaser.BitmapText#align
* @property ***REMOVED***string***REMOVED*** align - Alignment for multi-line text ('left', 'center' or 'right'), does not affect single lines of text.
*/
Object.defineProperty(Phaser.BitmapText.prototype, 'align', ***REMOVED***

    get: function() ***REMOVED***
        return this._align;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this._align && (value === 'left' || value === 'center' || value === 'right'))
        ***REMOVED***
            this._align = value;
            this.updateText();
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.BitmapText#tint
* @property ***REMOVED***number***REMOVED*** tint - The tint applied to the BitmapText. This is a hex value. Set to white to disable (0xFFFFFF)
*/
Object.defineProperty(Phaser.BitmapText.prototype, 'tint', ***REMOVED***

    get: function() ***REMOVED***
        return this._tint;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this._tint)
        ***REMOVED***
            this._tint = value;
            this.updateText();
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.BitmapText#font
* @property ***REMOVED***string***REMOVED*** font - The font the text will be rendered in, i.e. 'Arial'. Must be loaded in the browser before use.
*/
Object.defineProperty(Phaser.BitmapText.prototype, 'font', ***REMOVED***

    get: function() ***REMOVED***
        return this._font;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this._font)
        ***REMOVED***
            this._font = value.trim();
            this._data = this.game.cache.getBitmapFont(this._font);
            this.updateText();
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.BitmapText#fontSize
* @property ***REMOVED***number***REMOVED*** fontSize - The size of the font in pixels.
*/
Object.defineProperty(Phaser.BitmapText.prototype, 'fontSize', ***REMOVED***

    get: function() ***REMOVED***
        return this._fontSize;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        value = parseInt(value, 10);

        if (value !== this._fontSize && value > 0)
        ***REMOVED***
            this._fontSize = value;
            this.updateText();
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.BitmapText#text
* @property ***REMOVED***string***REMOVED*** text - The text to be displayed by this BitmapText object.
*/
Object.defineProperty(Phaser.BitmapText.prototype, 'text', ***REMOVED***

    get: function() ***REMOVED***
        return this._text;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this._text)
        ***REMOVED***
            this._text = value.toString() || '';
            this.updateText();
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* The maximum display width of this BitmapText in pixels.
* 
* If BitmapText.text is longer than maxWidth then the lines will be automatically wrapped 
* based on the last whitespace character found in the line.
* 
* If no whitespace was found then no wrapping will take place and consequently the maxWidth value will not be honored.
* 
* Disable maxWidth by setting the value to 0.
* 
* @name Phaser.BitmapText#maxWidth
* @property ***REMOVED***number***REMOVED*** maxWidth - The maximum width of this BitmapText in pixels.
*/
Object.defineProperty(Phaser.BitmapText.prototype, 'maxWidth', ***REMOVED***

    get: function() ***REMOVED***

        return this._maxWidth;

    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this._maxWidth)
        ***REMOVED***
            this._maxWidth = value;
            this.updateText();
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* Enable or disable texture smoothing for this BitmapText.
*
* The smoothing is applied to the BaseTexture of this font, which all letters of the text reference.
* 
* Smoothing is enabled by default.
* 
* @name Phaser.BitmapText#smoothed
* @property ***REMOVED***boolean***REMOVED*** smoothed
*/
Object.defineProperty(Phaser.BitmapText.prototype, 'smoothed', ***REMOVED***

    get: function() ***REMOVED***

        return !this._data.base.scaleMode;

    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value)
        ***REMOVED***
            this._data.base.scaleMode = 0;
        ***REMOVED***
        else
        ***REMOVED***
            this._data.base.scaleMode = 1;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);
