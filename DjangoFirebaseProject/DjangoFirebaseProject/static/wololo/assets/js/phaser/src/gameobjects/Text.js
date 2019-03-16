/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Create a new game object for displaying Text.
*
* This uses a local hidden Canvas object and renders the type into it. It then makes a texture from this for rendering to the view.
* Because of this you can only display fonts that are currently loaded and available to the browser: fonts must be pre-loaded.
*
* See ***REMOVED***@link http://www.jordanm.co.uk/tinytype this compatibility table***REMOVED*** for the available default fonts across mobile browsers.
*
* @class Phaser.Text
* @extends Phaser.Sprite
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Current game instance.
* @param ***REMOVED***number***REMOVED*** x - X position of the new text object.
* @param ***REMOVED***number***REMOVED*** y - Y position of the new text object.
* @param ***REMOVED***string***REMOVED*** text - The actual text that will be written.
* @param ***REMOVED***object***REMOVED*** [style] - The style properties to be set on the Text.
* @param ***REMOVED***string***REMOVED*** [style.font='bold 20pt Arial'] - The style and size of the font.
* @param ***REMOVED***string***REMOVED*** [style.fontStyle=(from font)] - The style of the font (eg. 'italic'): overrides the value in `style.font`.
* @param ***REMOVED***string***REMOVED*** [style.fontVariant=(from font)] - The variant of the font (eg. 'small-caps'): overrides the value in `style.font`.
* @param ***REMOVED***string***REMOVED*** [style.fontWeight=(from font)] - The weight of the font (eg. 'bold'): overrides the value in `style.font`.
* @param ***REMOVED***string|number***REMOVED*** [style.fontSize=(from font)] - The size of the font (eg. 32 or '32px'): overrides the value in `style.font`.
* @param ***REMOVED***string***REMOVED*** [style.backgroundColor=null] - A canvas fillstyle that will be used as the background for the whole Text object. Set to `null` to disable.
* @param ***REMOVED***string***REMOVED*** [style.fill='black'] - A canvas fillstyle that will be used on the text eg 'red', '#00FF00'.
* @param ***REMOVED***string***REMOVED*** [style.align='left'] - Horizontal alignment of each line in multiline text. Can be: 'left', 'center' or 'right'. Does not affect single lines of text (see `textBounds` and `boundsAlignH` for that).
* @param ***REMOVED***string***REMOVED*** [style.boundsAlignH='left'] - Horizontal alignment of the text within the `textBounds`. Can be: 'left', 'center' or 'right'.
* @param ***REMOVED***string***REMOVED*** [style.boundsAlignV='top'] - Vertical alignment of the text within the `textBounds`. Can be: 'top', 'middle' or 'bottom'.
* @param ***REMOVED***string***REMOVED*** [style.stroke='black'] - A canvas stroke style that will be used on the text stroke eg 'blue', '#FCFF00'.
* @param ***REMOVED***number***REMOVED*** [style.strokeThickness=0] - A number that represents the thickness of the stroke. Default is 0 (no stroke).
* @param ***REMOVED***boolean***REMOVED*** [style.wordWrap=false] - Indicates if word wrap should be used.
* @param ***REMOVED***number***REMOVED*** [style.wordWrapWidth=100] - The width in pixels at which text will wrap.
* @param ***REMOVED***number***REMOVED*** [style.maxLines=0] - The maximum number of lines to be shown for wrapped text.
* @param ***REMOVED***number***REMOVED*** [style.tabs=0] - The size (in pixels) of the tabs, for when text includes tab characters. 0 disables. Can be an array of varying tab sizes, one per tab stop.
*/
Phaser.Text = function (game, x, y, text, style) ***REMOVED***

    x = x || 0;
    y = y || 0;

    if (text === undefined || text === null)
    ***REMOVED***
        text = '';
    ***REMOVED***
    else
    ***REMOVED***
        text = text.toString();
    ***REMOVED***

    style = Phaser.Utils.extend(***REMOVED******REMOVED***, style);

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @default
    */
    this.type = Phaser.TEXT;

    /**
    * @property ***REMOVED***number***REMOVED*** physicsType - The const physics body type of this object.
    * @readonly
    */
    this.physicsType = Phaser.SPRITE;

    /**
    * Specify a padding value which is added to the line width and height when calculating the Text size.
    * ALlows you to add extra spacing if Phaser is unable to accurately determine the true font dimensions.
    * @property ***REMOVED***Phaser.Point***REMOVED*** padding
    */
    this.padding = new Phaser.Point();

    /**
    * The textBounds property allows you to specify a rectangular region upon which text alignment is based.
    * See `Text.setTextBounds` for more details.
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** textBounds
    * @readOnly
    */
    this.textBounds = null;

    /**
     * @property ***REMOVED***HTMLCanvasElement***REMOVED*** canvas - The canvas element that the text is rendered.
     */
    this.canvas = PIXI.CanvasPool.create(this);

    /**
     * @property ***REMOVED***HTMLCanvasElement***REMOVED*** context - The context of the canvas element that the text is rendered to.
     */
    this.context = this.canvas.getContext('2d');

    /**
    * @property ***REMOVED***array***REMOVED*** colors - An array of the color values as specified by ***REMOVED***@link Phaser.Text#addColor addColor***REMOVED***.
    */
    this.colors = [];

    /**
    * @property ***REMOVED***array***REMOVED*** strokeColors - An array of the stroke color values as specified by ***REMOVED***@link Phaser.Text#addStrokeColor addStrokeColor***REMOVED***.
    */
    this.strokeColors = [];

    /**
    * @property ***REMOVED***array***REMOVED*** fontStyles - An array of the font styles values as specified by ***REMOVED***@link Phaser.Text#addFontStyle addFontStyle***REMOVED***.
    */
    this.fontStyles = [];

    /**
    * @property ***REMOVED***array***REMOVED*** fontWeights - An array of the font weights values as specified by ***REMOVED***@link Phaser.Text#addFontWeight addFontWeight***REMOVED***.
    */
    this.fontWeights = [];

    /**
    * Should the linePositionX and Y values be automatically rounded before rendering the Text?
    * You may wish to enable this if you want to remove the effect of sub-pixel aliasing from text.
    * @property ***REMOVED***boolean***REMOVED*** autoRound
    * @default
    */
    this.autoRound = false;

    /**
    * Will this Text object use Basic or Advanced Word Wrapping?
    * 
    * Advanced wrapping breaks long words if they are the first of a line, and repeats the process as necessary.
    * White space is condensed (e.g., consecutive spaces are replaced with one).
    * Lines are trimmed of white space before processing.
    * 
    * It throws an error if wordWrapWidth is less than a single character.
    * @property ***REMOVED***boolean***REMOVED*** useAdvancedWrap
    * @default
    */
    this.useAdvancedWrap = false;

    /**
     * @property ***REMOVED***number***REMOVED*** _res - Internal canvas resolution var.
     * @private
     */
    this._res = game.renderer.resolution;

    /**
    * @property ***REMOVED***string***REMOVED*** _text - Internal cache var.
    * @private
    */
    this._text = text;

    /**
    * @property ***REMOVED***object***REMOVED*** _fontComponents - The font, broken down into components, set in `setStyle`.
    * @private
    */
    this._fontComponents = null;

    /**
    * @property ***REMOVED***number***REMOVED*** lineSpacing - Additional spacing (in pixels) between each line of text if multi-line.
    * @private
    */
    this._lineSpacing = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _charCount - Internal character counter used by the text coloring.
    * @private
    */
    this._charCount = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _width - Internal width var.
    * @private
    */
    this._width = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _height - Internal height var.
    * @private
    */
    this._height = 0;

    Phaser.Sprite.call(this, game, x, y, PIXI.Texture.fromCanvas(this.canvas));

    this.setStyle(style);

    if (text !== '')
    ***REMOVED***
        this.updateText();
    ***REMOVED***

***REMOVED***;

Phaser.Text.prototype = Object.create(Phaser.Sprite.prototype);
Phaser.Text.prototype.constructor = Phaser.Text;

/**
* Automatically called by World.preUpdate.
* 
* @method Phaser.Text#preUpdate
* @protected
*/
Phaser.Text.prototype.preUpdate = function () ***REMOVED***

    if (!this.preUpdatePhysics() || !this.preUpdateLifeSpan() || !this.preUpdateInWorld())
    ***REMOVED***
        return false;
    ***REMOVED***

    return this.preUpdateCore();

***REMOVED***;

/**
* Override this function to handle any special update requirements.
*
* @method Phaser.Text#update
* @protected
*/
Phaser.Text.prototype.update = function() ***REMOVED***

***REMOVED***;

/**
* Destroy this Text object, removing it from the group it belongs to.
*
* @method Phaser.Text#destroy
* @param ***REMOVED***boolean***REMOVED*** [destroyChildren=true] - Should every child of this object have its destroy method called?
*/
Phaser.Text.prototype.destroy = function (destroyChildren) ***REMOVED***

    this.texture.destroy(true);

    Phaser.Component.Destroy.prototype.destroy.call(this, destroyChildren);

***REMOVED***;

/**
* Sets a drop shadow effect on the Text. You can specify the horizontal and vertical distance of the drop shadow with the `x` and `y` parameters.
* The color controls the shade of the shadow (default is black) and can be either an `rgba` or `hex` value.
* The blur is the strength of the shadow. A value of zero means a hard shadow, a value of 10 means a very soft shadow.
* To remove a shadow already in place you can call this method with no parameters set.
* 
* @method Phaser.Text#setShadow
* @param ***REMOVED***number***REMOVED*** [x=0] - The shadowOffsetX value in pixels. This is how far offset horizontally the shadow effect will be.
* @param ***REMOVED***number***REMOVED*** [y=0] - The shadowOffsetY value in pixels. This is how far offset vertically the shadow effect will be.
* @param ***REMOVED***string***REMOVED*** [color='rgba(0,0,0,1)'] - The color of the shadow, as given in CSS rgba or hex format. Set the alpha component to 0 to disable the shadow.
* @param ***REMOVED***number***REMOVED*** [blur=0] - The shadowBlur value. Make the shadow softer by applying a Gaussian blur to it. A number from 0 (no blur) up to approx. 10 (depending on scene).
* @param ***REMOVED***boolean***REMOVED*** [shadowStroke=true] - Apply the drop shadow to the Text stroke (if set).
* @param ***REMOVED***boolean***REMOVED*** [shadowFill=true] - Apply the drop shadow to the Text fill (if set).
* @return ***REMOVED***Phaser.Text***REMOVED*** This Text instance.
*/
Phaser.Text.prototype.setShadow = function (x, y, color, blur, shadowStroke, shadowFill) ***REMOVED***

    if (x === undefined) ***REMOVED*** x = 0; ***REMOVED***
    if (y === undefined) ***REMOVED*** y = 0; ***REMOVED***
    if (color === undefined) ***REMOVED*** color = 'rgba(0, 0, 0, 1)'; ***REMOVED***
    if (blur === undefined) ***REMOVED*** blur = 0; ***REMOVED***
    if (shadowStroke === undefined) ***REMOVED*** shadowStroke = true; ***REMOVED***
    if (shadowFill === undefined) ***REMOVED*** shadowFill = true; ***REMOVED***

    this.style.shadowOffsetX = x;
    this.style.shadowOffsetY = y;
    this.style.shadowColor = color;
    this.style.shadowBlur = blur;
    this.style.shadowStroke = shadowStroke;
    this.style.shadowFill = shadowFill;
    this.dirty = true;

    return this;

***REMOVED***;

/**
* Set the style of the text by passing a single style object to it.
*
* @method Phaser.Text#setStyle
* @param ***REMOVED***object***REMOVED*** [style] - The style properties to be set on the Text.
* @param ***REMOVED***string***REMOVED*** [style.font='bold 20pt Arial'] - The style and size of the font.
* @param ***REMOVED***string***REMOVED*** [style.fontStyle=(from font)] - The style of the font (eg. 'italic'): overrides the value in `style.font`.
* @param ***REMOVED***string***REMOVED*** [style.fontVariant=(from font)] - The variant of the font (eg. 'small-caps'): overrides the value in `style.font`.
* @param ***REMOVED***string***REMOVED*** [style.fontWeight=(from font)] - The weight of the font (eg. 'bold'): overrides the value in `style.font`.
* @param ***REMOVED***string|number***REMOVED*** [style.fontSize=(from font)] - The size of the font (eg. 32 or '32px'): overrides the value in `style.font`.
* @param ***REMOVED***string***REMOVED*** [style.backgroundColor=null] - A canvas fillstyle that will be used as the background for the whole Text object. Set to `null` to disable.
* @param ***REMOVED***string***REMOVED*** [style.fill='black'] - A canvas fillstyle that will be used on the text eg 'red', '#00FF00'.
* @param ***REMOVED***string***REMOVED*** [style.align='left'] - Horizontal alignment of each line in multiline text. Can be: 'left', 'center' or 'right'. Does not affect single lines of text (see `textBounds` and `boundsAlignH` for that).
* @param ***REMOVED***string***REMOVED*** [style.boundsAlignH='left'] - Horizontal alignment of the text within the `textBounds`. Can be: 'left', 'center' or 'right'.
* @param ***REMOVED***string***REMOVED*** [style.boundsAlignV='top'] - Vertical alignment of the text within the `textBounds`. Can be: 'top', 'middle' or 'bottom'.
* @param ***REMOVED***string***REMOVED*** [style.stroke='black'] - A canvas stroke style that will be used on the text stroke eg 'blue', '#FCFF00'.
* @param ***REMOVED***number***REMOVED*** [style.strokeThickness=0] - A number that represents the thickness of the stroke. Default is 0 (no stroke).
* @param ***REMOVED***boolean***REMOVED*** [style.wordWrap=false] - Indicates if word wrap should be used.
* @param ***REMOVED***number***REMOVED*** [style.wordWrapWidth=100] - The width in pixels at which text will wrap.
* @param ***REMOVED***number***REMOVED*** [style.maxLines=0] - The maximum number of lines to be shown for wrapped text.
* @param ***REMOVED***number|array***REMOVED*** [style.tabs=0] - The size (in pixels) of the tabs, for when text includes tab characters. 0 disables. Can be an array of varying tab sizes, one per tab stop.
* @param ***REMOVED***boolean***REMOVED*** [update=false] - Immediately update the Text object after setting the new style? Or wait for the next frame.
* @return ***REMOVED***Phaser.Text***REMOVED*** This Text instance.
*/
Phaser.Text.prototype.setStyle = function (style, update) ***REMOVED***

    if (update === undefined) ***REMOVED*** update = false; ***REMOVED***

    style = style || ***REMOVED******REMOVED***;
    style.font = style.font || 'bold 20pt Arial';
    style.backgroundColor = style.backgroundColor || null;
    style.fill = style.fill || 'black';
    style.align = style.align || 'left';
    style.boundsAlignH = style.boundsAlignH || 'left';
    style.boundsAlignV = style.boundsAlignV || 'top';
    style.stroke = style.stroke || 'black'; //provide a default, see: https://github.com/GoodBoyDigital/pixi.js/issues/136
    style.strokeThickness = style.strokeThickness || 0;
    style.wordWrap = style.wordWrap || false;
    style.wordWrapWidth = style.wordWrapWidth || 100;
    style.maxLines = style.maxLines || 0;
    style.shadowOffsetX = style.shadowOffsetX || 0;
    style.shadowOffsetY = style.shadowOffsetY || 0;
    style.shadowColor = style.shadowColor || 'rgba(0,0,0,0)';
    style.shadowBlur = style.shadowBlur || 0;
    style.tabs = style.tabs || 0;

    var components = this.fontToComponents(style.font);

    if (style.fontStyle)
    ***REMOVED***
        components.fontStyle = style.fontStyle;
    ***REMOVED***

    if (style.fontVariant)
    ***REMOVED***
        components.fontVariant = style.fontVariant;
    ***REMOVED***

    if (style.fontWeight)
    ***REMOVED***
        components.fontWeight = style.fontWeight;
    ***REMOVED***

    if (style.fontSize)
    ***REMOVED***
        if (typeof style.fontSize === 'number')
        ***REMOVED***
            style.fontSize = style.fontSize + 'px';
        ***REMOVED***

        components.fontSize = style.fontSize;
    ***REMOVED***

    this._fontComponents = components;

    style.font = this.componentsToFont(this._fontComponents);

    this.style = style;
    this.dirty = true;

    if (update)
    ***REMOVED***
        this.updateText();
    ***REMOVED***

    return this;

***REMOVED***;

/**
* Renders text. This replaces the Pixi.Text.updateText function as we need a few extra bits in here.
*
* @method Phaser.Text#updateText
* @private
*/
Phaser.Text.prototype.updateText = function () ***REMOVED***

    this.texture.baseTexture.resolution = this._res;

    this.context.font = this.style.font;

    var outputText = this.text;

    if (this.style.wordWrap)
    ***REMOVED***
        outputText = this.runWordWrap(this.text);
    ***REMOVED***

    //  Split text into lines
    var lines = outputText.split(/(?:\r\n|\r|\n)/);

    //  Calculate text width
    var tabs = this.style.tabs;
    var lineWidths = [];
    var maxLineWidth = 0;
    var fontProperties = this.determineFontProperties(this.style.font);

    var drawnLines = lines.length;
    
    if (this.style.maxLines > 0 && this.style.maxLines < lines.length)
    ***REMOVED***
        drawnLines = this.style.maxLines;
    ***REMOVED***

    this._charCount = 0;

    for (var i = 0; i < drawnLines; i++)
    ***REMOVED***
        if (tabs === 0)
        ***REMOVED***
            //  Simple layout (no tabs)
            var lineWidth =  this.style.strokeThickness + this.padding.x;

            if (this.colors.length > 0 || this.strokeColors.length > 0 || this.fontWeights.length > 0 || this.fontStyles.length > 0)
            ***REMOVED***
                lineWidth += this.measureLine(lines[i]);
            ***REMOVED***
            else
            ***REMOVED***
                lineWidth += this.context.measureText(lines[i]).width;
            ***REMOVED***

            // Adjust for wrapped text
            if (this.style.wordWrap)
            ***REMOVED***
                lineWidth -= this.context.measureText(' ').width;
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  Complex layout (tabs)
            var line = lines[i].split(/(?:\t)/);
            var lineWidth = this.padding.x + this.style.strokeThickness;

            if (Array.isArray(tabs))
            ***REMOVED***
                var tab = 0;

                for (var c = 0; c < line.length; c++)
                ***REMOVED***
                    var section = 0;

                    if (this.colors.length > 0 || this.strokeColors.length > 0 || this.fontWeights.length > 0 || this.fontStyles.length > 0)
                    ***REMOVED***
                        section = this.measureLine(line[c]);
                    ***REMOVED***
                    else
                    ***REMOVED***
                        section = Math.ceil(this.context.measureText(line[c]).width);
                    ***REMOVED***

                    if (c > 0)
                    ***REMOVED***
                        tab += tabs[c - 1];
                    ***REMOVED***

                    lineWidth = tab + section;
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                for (var c = 0; c < line.length; c++)
                ***REMOVED***
                    //  How far to the next tab?
                    if (this.colors.length > 0 || this.strokeColors.length > 0 || this.fontWeights.length > 0 || this.fontStyles.length > 0)
                    ***REMOVED***
                        lineWidth += this.measureLine(line[c]);
                    ***REMOVED***
                    else
                    ***REMOVED***
                        lineWidth += Math.ceil(this.context.measureText(line[c]).width);
                    ***REMOVED***

                    var diff = this.game.math.snapToCeil(lineWidth, tabs) - lineWidth;

                    lineWidth += diff;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        lineWidths[i] = Math.ceil(lineWidth);
        maxLineWidth = Math.max(maxLineWidth, lineWidths[i]);
    ***REMOVED***

    this.canvas.width = maxLineWidth * this._res;
    
    //  Calculate text height
    var lineHeight = fontProperties.fontSize + this.style.strokeThickness + this.padding.y;
    var height = lineHeight * drawnLines;
    var lineSpacing = this._lineSpacing;

    if (lineSpacing < 0 && Math.abs(lineSpacing) > lineHeight)
    ***REMOVED***
        lineSpacing = -lineHeight;
    ***REMOVED***

    //  Adjust for line spacing
    if (lineSpacing !== 0)
    ***REMOVED***
        height += (lineSpacing > 0) ? lineSpacing * lines.length : lineSpacing * (lines.length - 1);
    ***REMOVED***

    this.canvas.height = height * this._res;

    this.context.scale(this._res, this._res);

    if (navigator.isCocoonJS)
    ***REMOVED***
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ***REMOVED***

    if (this.style.backgroundColor)
    ***REMOVED***
        this.context.fillStyle = this.style.backgroundColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ***REMOVED***
    
    this.context.fillStyle = this.style.fill;
    this.context.font = this.style.font;
    this.context.strokeStyle = this.style.stroke;
    this.context.textBaseline = 'alphabetic';

    this.context.lineWidth = this.style.strokeThickness;
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';

    var linePositionX;
    var linePositionY;

    this._charCount = 0;

    //  Draw text line by line
    for (i = 0; i < drawnLines; i++)
    ***REMOVED***
        //  Split the line by

        linePositionX = this.style.strokeThickness / 2;
        linePositionY = (this.style.strokeThickness / 2 + i * lineHeight) + fontProperties.ascent;

        if (i > 0)
        ***REMOVED***
            linePositionY += (lineSpacing * i);
        ***REMOVED***

        if (this.style.align === 'right')
        ***REMOVED***
            linePositionX += maxLineWidth - lineWidths[i];
        ***REMOVED***
        else if (this.style.align === 'center')
        ***REMOVED***
            linePositionX += (maxLineWidth - lineWidths[i]) / 2;
        ***REMOVED***

        if (this.autoRound)
        ***REMOVED***
            linePositionX = Math.round(linePositionX);
            linePositionY = Math.round(linePositionY);
        ***REMOVED***

        if (this.colors.length > 0 || this.strokeColors.length > 0 || this.fontWeights.length > 0 || this.fontStyles.length > 0)
        ***REMOVED***
            this.updateLine(lines[i], linePositionX, linePositionY);
        ***REMOVED***
        else
        ***REMOVED***
            if (this.style.stroke && this.style.strokeThickness)
            ***REMOVED***
                this.updateShadow(this.style.shadowStroke);

                if (tabs === 0)
                ***REMOVED***
                    this.context.strokeText(lines[i], linePositionX, linePositionY);
                ***REMOVED***
                else
                ***REMOVED***
                    this.renderTabLine(lines[i], linePositionX, linePositionY, false);
                ***REMOVED***
            ***REMOVED***

            if (this.style.fill)
            ***REMOVED***
                this.updateShadow(this.style.shadowFill);

                if (tabs === 0)
                ***REMOVED***
                    this.context.fillText(lines[i], linePositionX, linePositionY);
                ***REMOVED***
                else
                ***REMOVED***
                    this.renderTabLine(lines[i], linePositionX, linePositionY, true);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    this.updateTexture();

    this.dirty = false;

***REMOVED***;

/**
* Renders a line of text that contains tab characters if Text.tab > 0.
* Called automatically by updateText.
*
* @method Phaser.Text#renderTabLine
* @private
* @param ***REMOVED***string***REMOVED*** line - The line of text to render.
* @param ***REMOVED***integer***REMOVED*** x - The x position to start rendering from.
* @param ***REMOVED***integer***REMOVED*** y - The y position to start rendering from.
* @param ***REMOVED***boolean***REMOVED*** fill - If true uses fillText, if false uses strokeText.
*/
Phaser.Text.prototype.renderTabLine = function (line, x, y, fill) ***REMOVED***

    var text = line.split(/(?:\t)/);
    var tabs = this.style.tabs;
    var snap = 0;

    if (Array.isArray(tabs))
    ***REMOVED***
        var tab = 0;

        for (var c = 0; c < text.length; c++)
        ***REMOVED***
            if (c > 0)
            ***REMOVED***
                tab += tabs[c - 1];
            ***REMOVED***

            snap = x + tab;

            if (fill)
            ***REMOVED***
                this.context.fillText(text[c], snap, y);
            ***REMOVED***
            else
            ***REMOVED***
                this.context.strokeText(text[c], snap, y);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
    else
    ***REMOVED***
        for (var c = 0; c < text.length; c++)
        ***REMOVED***
            var section = Math.ceil(this.context.measureText(text[c]).width);

            //  How far to the next tab?
            snap = this.game.math.snapToCeil(x, tabs);

            if (fill)
            ***REMOVED***
                this.context.fillText(text[c], snap, y);
            ***REMOVED***
            else
            ***REMOVED***
                this.context.strokeText(text[c], snap, y);
            ***REMOVED***

            x = snap + section;
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* Sets the Shadow on the Text.context based on the Style settings, or disables it if not enabled.
* This is called automatically by Text.updateText.
*
* @method Phaser.Text#updateShadow
* @param ***REMOVED***boolean***REMOVED*** state - If true the shadow will be set to the Style values, otherwise it will be set to zero.
*/
Phaser.Text.prototype.updateShadow = function (state) ***REMOVED***

    if (state)
    ***REMOVED***
        this.context.shadowOffsetX = this.style.shadowOffsetX;
        this.context.shadowOffsetY = this.style.shadowOffsetY;
        this.context.shadowColor = this.style.shadowColor;
        this.context.shadowBlur = this.style.shadowBlur;
    ***REMOVED***
    else
    ***REMOVED***
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
        this.context.shadowColor = 0;
        this.context.shadowBlur = 0;
    ***REMOVED***

***REMOVED***;

/**
* Measures a line of text character by character taking into the account the specified character styles.
*
* @method Phaser.Text#measureLine
* @private
* @param ***REMOVED***string***REMOVED*** line - The line of text to measure.
* @return ***REMOVED***integer***REMOVED*** length of the line.
*/
Phaser.Text.prototype.measureLine = function (line) ***REMOVED***

    var lineLength = 0;

    for (var i = 0; i < line.length; i++)
    ***REMOVED***
        var letter = line[i];

        if (this.fontWeights.length > 0 || this.fontStyles.length > 0)
        ***REMOVED***
            var components = this.fontToComponents(this.context.font);

            if (this.fontStyles[this._charCount])
            ***REMOVED***
                components.fontStyle = this.fontStyles[this._charCount];
            ***REMOVED***

            if (this.fontWeights[this._charCount])
            ***REMOVED***
                components.fontWeight = this.fontWeights[this._charCount];
            ***REMOVED***

            this.context.font = this.componentsToFont(components);
        ***REMOVED***

        if (this.style.stroke && this.style.strokeThickness)
        ***REMOVED***
            if (this.strokeColors[this._charCount])
            ***REMOVED***
                this.context.strokeStyle = this.strokeColors[this._charCount];
            ***REMOVED***

            this.updateShadow(this.style.shadowStroke);
        ***REMOVED***

        if (this.style.fill)
        ***REMOVED***
            if (this.colors[this._charCount])
            ***REMOVED***
                this.context.fillStyle = this.colors[this._charCount];
            ***REMOVED***

            this.updateShadow(this.style.shadowFill);
        ***REMOVED***

        lineLength += this.context.measureText(letter).width;

        this._charCount++;
    ***REMOVED***

    return Math.ceil(lineLength);
***REMOVED***;

/**
* Updates a line of text, applying fill and stroke per-character colors or style and weight per-character font if applicable.
*
* @method Phaser.Text#updateLine
* @private
*/
Phaser.Text.prototype.updateLine = function (line, x, y) ***REMOVED***

    for (var i = 0; i < line.length; i++)
    ***REMOVED***
        var letter = line[i];

        if (this.fontWeights.length > 0 || this.fontStyles.length > 0)
        ***REMOVED***
            var components = this.fontToComponents(this.context.font);

            if (this.fontStyles[this._charCount])
            ***REMOVED***
                components.fontStyle = this.fontStyles[this._charCount];
            ***REMOVED***
        
            if (this.fontWeights[this._charCount])
            ***REMOVED***
                components.fontWeight = this.fontWeights[this._charCount];
            ***REMOVED***
      
            this.context.font = this.componentsToFont(components);
        ***REMOVED***

        if (this.style.stroke && this.style.strokeThickness)
        ***REMOVED***
            if (this.strokeColors[this._charCount])
            ***REMOVED***
                this.context.strokeStyle = this.strokeColors[this._charCount];
            ***REMOVED***

            this.updateShadow(this.style.shadowStroke);
            this.context.strokeText(letter, x, y);
        ***REMOVED***

        if (this.style.fill)
        ***REMOVED***
            if (this.colors[this._charCount])
            ***REMOVED***
                this.context.fillStyle = this.colors[this._charCount];
            ***REMOVED***

            this.updateShadow(this.style.shadowFill);
            this.context.fillText(letter, x, y);
        ***REMOVED***

        x += this.context.measureText(letter).width;

        this._charCount++;
    ***REMOVED***

***REMOVED***;

/**
* Clears any text fill or stroke colors that were set by `addColor` or `addStrokeColor`.
*
* @method Phaser.Text#clearColors
* @return ***REMOVED***Phaser.Text***REMOVED*** This Text instance.
*/
Phaser.Text.prototype.clearColors = function () ***REMOVED***

    this.colors = [];
    this.strokeColors = [];
    this.dirty = true;

    return this;

***REMOVED***;

/**
* Clears any text styles or weights font that were set by `addFontStyle` or `addFontWeight`.
*
* @method Phaser.Text#clearFontValues
* @return ***REMOVED***Phaser.Text***REMOVED*** This Text instance.
*/
Phaser.Text.prototype.clearFontValues = function () ***REMOVED***

    this.fontStyles = [];
    this.fontWeights = [];
    this.dirty = true;

    return this;

***REMOVED***;

/**
* Set specific colors for certain characters within the Text.
*
* It works by taking a color value, which is a typical HTML string such as `#ff0000` or `rgb(255,0,0)` and a position.
* The position value is the index of the character in the Text string to start applying this color to.
* Once set the color remains in use until either another color or the end of the string is encountered.
* For example if the Text was `Photon Storm` and you did `Text.addColor('#ffff00', 6)` it would color in the word `Storm` in yellow.
*
* If you wish to change the stroke color see addStrokeColor instead.
*
* @method Phaser.Text#addColor
* @param ***REMOVED***string***REMOVED*** color - A canvas fillstyle that will be used on the text eg `red`, `#00FF00`, `rgba()`.
* @param ***REMOVED***number***REMOVED*** position - The index of the character in the string to start applying this color value from.
* @return ***REMOVED***Phaser.Text***REMOVED*** This Text instance.
*/
Phaser.Text.prototype.addColor = function (color, position) ***REMOVED***

    this.colors[position] = color;
    this.dirty = true;

    return this;

***REMOVED***;

/**
* Set specific stroke colors for certain characters within the Text.
*
* It works by taking a color value, which is a typical HTML string such as `#ff0000` or `rgb(255,0,0)` and a position.
* The position value is the index of the character in the Text string to start applying this color to.
* Once set the color remains in use until either another color or the end of the string is encountered.
* For example if the Text was `Photon Storm` and you did `Text.addColor('#ffff00', 6)` it would color in the word `Storm` in yellow.
*
* This has no effect if stroke is disabled or has a thickness of 0.
*
* If you wish to change the text fill color see addColor instead.
*
* @method Phaser.Text#addStrokeColor
* @param ***REMOVED***string***REMOVED*** color - A canvas fillstyle that will be used on the text stroke eg `red`, `#00FF00`, `rgba()`.
* @param ***REMOVED***number***REMOVED*** position - The index of the character in the string to start applying this color value from.
* @return ***REMOVED***Phaser.Text***REMOVED*** This Text instance.
*/
Phaser.Text.prototype.addStrokeColor = function (color, position) ***REMOVED***

    this.strokeColors[position] = color;
    this.dirty = true;

    return this;

***REMOVED***;

/**
* Set specific font styles for certain characters within the Text.
*
* It works by taking a font style value, which is a typical string such as `normal`, `italic` or `oblique`.
* The position value is the index of the character in the Text string to start applying this font style to.
* Once set the font style remains in use until either another font style or the end of the string is encountered.
* For example if the Text was `Photon Storm` and you did `Text.addFontStyle('italic', 6)` it would font style in the word `Storm` in italic.
*
* If you wish to change the text font weight see addFontWeight instead.
*
* @method Phaser.Text#addFontStyle
* @param ***REMOVED***string***REMOVED*** style - A canvas font-style that will be used on the text style eg `normal`, `italic`, `oblique`.
* @param ***REMOVED***number***REMOVED*** position - The index of the character in the string to start applying this font style value from.
* @return ***REMOVED***Phaser.Text***REMOVED*** This Text instance.
*/
Phaser.Text.prototype.addFontStyle = function (style, position) ***REMOVED***

    this.fontStyles[position] = style;
    this.dirty = true;

    return this;

***REMOVED***;

/**
* Set specific font weights for certain characters within the Text.
*
* It works by taking a font weight value, which is a typical string such as `normal`, `bold`, `bolder`, etc.
* The position value is the index of the character in the Text string to start applying this font weight to.
* Once set the font weight remains in use until either another font weight or the end of the string is encountered.
* For example if the Text was `Photon Storm` and you did `Text.addFontWeight('bold', 6)` it would font weight in the word `Storm` in bold.
*
* If you wish to change the text font style see addFontStyle instead.
*
* @method Phaser.Text#addFontWeight
* @param ***REMOVED***string***REMOVED*** style - A canvas font-weight that will be used on the text weight eg `normal`, `bold`, `bolder`, `lighter`, etc.
* @param ***REMOVED***number***REMOVED*** position - The index of the character in the string to start applying this font weight value from.
* @return ***REMOVED***Phaser.Text***REMOVED*** This Text instance.
*/
Phaser.Text.prototype.addFontWeight = function (weight, position) ***REMOVED***

    this.fontWeights[position] = weight;
    this.dirty = true;

    return this;

***REMOVED***;

/**
* Runs the given text through the Text.runWordWrap function and returns
* the results as an array, where each element of the array corresponds to a wrapped
* line of text.
*
* Useful if you wish to control pagination on long pieces of content.
*
* @method Phaser.Text#precalculateWordWrap
* @param ***REMOVED***string***REMOVED*** text - The text for which the wrapping will be calculated.
* @return ***REMOVED***array***REMOVED*** An array of strings with the pieces of wrapped text.
*/
Phaser.Text.prototype.precalculateWordWrap = function (text) ***REMOVED***

    this.texture.baseTexture.resolution = this._res;
    this.context.font = this.style.font;

    var wrappedLines = this.runWordWrap(text);

    return wrappedLines.split(/(?:\r\n|\r|\n)/);

***REMOVED***;

/**
* Greedy wrapping algorithm that will wrap words as the line grows longer than its horizontal bounds.
*
* @method Phaser.Text#runWordWrap
* @param ***REMOVED***string***REMOVED*** text - The text to perform word wrap detection against.
* @private
*/
Phaser.Text.prototype.runWordWrap = function (text) ***REMOVED***

    if (this.useAdvancedWrap)
    ***REMOVED***
        return this.advancedWordWrap(text);
    ***REMOVED***
    else
    ***REMOVED***
        return this.basicWordWrap(text);
    ***REMOVED***

***REMOVED***;

/**
* Advanced wrapping algorithm that will wrap words as the line grows longer than its horizontal bounds.
* White space is condensed (e.g., consecutive spaces are replaced with one).
* Lines are trimmed of white space before processing.
* Throws an error if the user was smart enough to specify a wordWrapWidth less than a single character.
*
* @method Phaser.Text#advancedWordWrap
* @param ***REMOVED***string***REMOVED*** text - The text to perform word wrap detection against.
* @private
*/
Phaser.Text.prototype.advancedWordWrap = function (text) ***REMOVED***

    var context = this.context;
    var wordWrapWidth = this.style.wordWrapWidth;

    var output = '';

    // (1) condense whitespace
    // (2) split into lines
    var lines = text
        .replace(/ +/gi, ' ')
        .split(/\r?\n/gi);

    var linesCount = lines.length;

    for (var i = 0; i < linesCount; i++)
    ***REMOVED***
        var line = lines[i];
        var out = '';

        // trim whitespace
        line = line.replace(/^ *|\s*$/gi, '');

        // if entire line is less than wordWrapWidth
        // append the entire line and exit early
        var lineWidth = context.measureText(line).width;

        if (lineWidth < wordWrapWidth)
        ***REMOVED***
            output += line + '\n';
            continue;
        ***REMOVED***

        // otherwise, calculate new lines
        var currentLineWidth = wordWrapWidth;

        // split into words
        var words = line.split(' ');

        for (var j = 0; j < words.length; j++)
        ***REMOVED***
            var word = words[j];
            var wordWithSpace = word + ' ';
            var wordWidth = context.measureText(wordWithSpace).width;

            if (wordWidth > currentLineWidth)
            ***REMOVED***
                // break word
                if (j === 0)
                ***REMOVED***
                    // shave off letters from word until it's small enough
                    var newWord = wordWithSpace;

                    while (newWord.length)
                    ***REMOVED***
                        newWord = newWord.slice(0, -1);
                        wordWidth = context.measureText(newWord).width;

                        if (wordWidth <= currentLineWidth)
                        ***REMOVED***
                            break;
                        ***REMOVED***
                    ***REMOVED***

                    // if wordWrapWidth is too small for even a single
                    // letter, shame user failure with a fatal error
                    if (!newWord.length)
                    ***REMOVED***
                        throw new Error('This text\'s wordWrapWidth setting is less than a single character!');
                    ***REMOVED***

                    // replace current word in array with remainder
                    var secondPart = word.substr(newWord.length);

                    words[j] = secondPart;

                    // append first piece to output
                    out += newWord;
                ***REMOVED***

                // if existing word length is 0, don't include it
                var offset = (words[j].length) ? j : j + 1;

                // collapse rest of sentence
                var remainder = words.slice(offset).join(' ')
                // remove any trailing white space
                .replace(/[ \n]*$/gi, '');

                // prepend remainder to next line
                lines[i + 1] = remainder + ' ' + (lines[i + 1] || '');
                linesCount = lines.length;

                break; // processing on this line

                // append word with space to output
            ***REMOVED***
            else
            ***REMOVED***
                out += wordWithSpace;
                currentLineWidth -= wordWidth;
            ***REMOVED***
        ***REMOVED***

        // append processed line to output
        output += out.replace(/[ \n]*$/gi, '') + '\n';
    ***REMOVED***

    // trim the end of the string
    output = output.replace(/[\s|\n]*$/gi, '');

    return output;

***REMOVED***;

/**
* Greedy wrapping algorithm that will wrap words as the line grows longer than its horizontal bounds.
*
* @method Phaser.Text#basicWordWrap
* @param ***REMOVED***string***REMOVED*** text - The text to perform word wrap detection against.
* @private
*/
Phaser.Text.prototype.basicWordWrap = function (text) ***REMOVED***

    var result = '';
    var lines = text.split('\n');

    for (var i = 0; i < lines.length; i++)
    ***REMOVED***
        var spaceLeft = this.style.wordWrapWidth;
        var words = lines[i].split(' ');

        for (var j = 0; j < words.length; j++)
        ***REMOVED***
            var wordWidth = this.context.measureText(words[j]).width;
            var wordWidthWithSpace = wordWidth + this.context.measureText(' ').width;

            if (wordWidthWithSpace > spaceLeft)
            ***REMOVED***
                // Skip printing the newline if it's the first word of the line that is greater than the word wrap width.
                if (j > 0)
                ***REMOVED***
                    result += '\n';
                ***REMOVED***
                result += words[j] + ' ';
                spaceLeft = this.style.wordWrapWidth - wordWidth;
            ***REMOVED***
            else
            ***REMOVED***
                spaceLeft -= wordWidthWithSpace;
                result += words[j] + ' ';
            ***REMOVED***
        ***REMOVED***

        if (i < lines.length-1)
        ***REMOVED***
            result += '\n';
        ***REMOVED***
    ***REMOVED***

    return result;

***REMOVED***;

/**
* Updates the internal `style.font` if it now differs according to generation from components.
*
* @method Phaser.Text#updateFont
* @private
* @param ***REMOVED***object***REMOVED*** components - Font components.
*/
Phaser.Text.prototype.updateFont = function (components) ***REMOVED***

    var font = this.componentsToFont(components);

    if (this.style.font !== font)
    ***REMOVED***
        this.style.font = font;
        this.dirty = true;

        if (this.parent)
        ***REMOVED***
            this.updateTransform();
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* Converting a short CSS-font string into the relevant components.
*
* @method Phaser.Text#fontToComponents
* @private
* @param ***REMOVED***string***REMOVED*** font - a CSS font string
*/
Phaser.Text.prototype.fontToComponents = function (font) ***REMOVED***

    // The format is specified in http://www.w3.org/TR/CSS2/fonts.html#font-shorthand:
    // style - normal | italic | oblique | inherit
    // variant - normal | small-caps | inherit
    // weight - normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | inherit
    // size - xx-small | x-small | small | medium | large | x-large | xx-large,
    //        larger | smaller
    //        ***REMOVED***number***REMOVED*** (em | ex | ch | rem | vh | vw | vmin | vmax | px | mm | cm | in | pt | pc | %)
    // font-family - rest (but identifiers or quoted with comma separation)
    var m = font.match(/^\s*(?:\b(normal|italic|oblique|inherit)?\b)\s*(?:\b(normal|small-caps|inherit)?\b)\s*(?:\b(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit)?\b)\s*(?:\b(xx-small|x-small|small|medium|large|x-large|xx-large|larger|smaller|0|\d*(?:[.]\d*)?(?:%|[a-z]***REMOVED***2,5***REMOVED***))?\b)\s*(.*)\s*$/);

    if (m)
    ***REMOVED***
        var family = m[5].trim();

        // If it looks like the value should be quoted, but isn't, then quote it.
        if (!/^(?:inherit|serif|sans-serif|cursive|fantasy|monospace)$/.exec(family) && !/['",]/.exec(family))
        ***REMOVED***
            family = "'" + family + "'";
        ***REMOVED***

        return ***REMOVED***
            font: font,
            fontStyle: m[1] || 'normal',
            fontVariant: m[2] || 'normal',
            fontWeight: m[3] || 'normal',
            fontSize: m[4] || 'medium',
            fontFamily: family
        ***REMOVED***;
    ***REMOVED***
    else
    ***REMOVED***
        console.warn("Phaser.Text - unparsable CSS font: " + font);

        return ***REMOVED***
            font: font
        ***REMOVED***;
    ***REMOVED***

***REMOVED***;

/**
* Converts individual font components (see `fontToComponents`) to a short CSS font string.
*
* @method Phaser.Text#componentsToFont
* @private
* @param ***REMOVED***object***REMOVED*** components - Font components.
*/
Phaser.Text.prototype.componentsToFont = function (components) ***REMOVED***

    var parts = [];
    var v;

    v = components.fontStyle;
    if (v && v !== 'normal') ***REMOVED*** parts.push(v); ***REMOVED***

    v = components.fontVariant;
    if (v && v !== 'normal') ***REMOVED*** parts.push(v); ***REMOVED***

    v = components.fontWeight;
    if (v && v !== 'normal') ***REMOVED*** parts.push(v); ***REMOVED***

    v = components.fontSize;
    if (v && v !== 'medium') ***REMOVED*** parts.push(v); ***REMOVED***

    v = components.fontFamily;
    if (v) ***REMOVED*** parts.push(v); ***REMOVED***

    if (!parts.length)
    ***REMOVED***
        // Fallback to whatever value the 'font' was
        parts.push(components.font);
    ***REMOVED***

    return parts.join(" ");

***REMOVED***;

/**
* The text to be displayed by this Text object.
* Use a \n to insert a carriage return and split the text.
* The text will be rendered with any style currently set.
*
* Use the optional `immediate` argument if you need the Text display to update immediately.
* 
* If not it will re-create the texture of this Text object during the next time the render
* loop is called.
*
* @method Phaser.Text#setText
* @param ***REMOVED***string***REMOVED*** [text] - The text to be displayed. Set to an empty string to clear text that is already present.
* @param ***REMOVED***boolean***REMOVED*** [immediate=false] - Update the texture used by this Text object immediately (true) or automatically during the next render loop (false).
* @return ***REMOVED***Phaser.Text***REMOVED*** This Text instance.
*/
Phaser.Text.prototype.setText = function (text, immediate) ***REMOVED***

    if (immediate === undefined) ***REMOVED*** immediate = false; ***REMOVED***

    this.text = text.toString() || '';

    if (immediate)
    ***REMOVED***
        this.updateText();
    ***REMOVED***
    else
    ***REMOVED***
        this.dirty = true;
    ***REMOVED***

    return this;

***REMOVED***;

/**
 * Converts the given array into a tab delimited string and then updates this Text object.
 * This is mostly used when you want to display external data using tab stops.
 *
 * The array can be either single or multi dimensional depending on the result you need:
 *
 * `[ 'a', 'b', 'c' ]` would convert in to `"a\tb\tc"`.
 *
 * Where as:
 *
 * `[
 *      [ 'a', 'b', 'c' ],
 *      [ 'd', 'e', 'f']
 * ]`
 *
 * would convert in to: `"a\tb\tc\nd\te\tf"`
 *
 * @method Phaser.Text#parseList
 * @param ***REMOVED***array***REMOVED*** list - The array of data to convert into a string.
 * @return ***REMOVED***Phaser.Text***REMOVED*** This Text instance.
 */
Phaser.Text.prototype.parseList = function (list) ***REMOVED***

    if (!Array.isArray(list))
    ***REMOVED***
        return this;
    ***REMOVED***
    else
    ***REMOVED***
        var s = "";

        for (var i = 0; i < list.length; i++)
        ***REMOVED***
            if (Array.isArray(list[i]))
            ***REMOVED***
                s += list[i].join("\t");

                if (i < list.length - 1)
                ***REMOVED***
                    s += "\n";
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                s += list[i];

                if (i < list.length - 1)
                ***REMOVED***
                    s += "\t";
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    this.text = s;
    this.dirty = true;

    return this;

***REMOVED***;

/**
 * The Text Bounds is a rectangular region that you control the dimensions of into which the Text object itself is positioned,
 * regardless of the number of lines in the text, the font size or any other attribute.
 *
 * Alignment is controlled via the properties `boundsAlignH` and `boundsAlignV` within the Text.style object, or can be directly
 * set through the setters `Text.boundsAlignH` and `Text.boundsAlignV`. Bounds alignment is independent of text alignment.
 *
 * For example: If your game is 800x600 in size and you set the text bounds to be 0,0,800,600 then by setting boundsAlignH to
 * 'center' and boundsAlignV to 'bottom' the text will render in the center and at the bottom of your game window, regardless of
 * how many lines of text there may be. Even if you adjust the text content or change the style it will remain at the bottom center
 * of the text bounds.
 *
 * This is especially powerful when you need to align text against specific coordinates in your game, but the actual text dimensions
 * may vary based on font (say for multi-lingual games).
 *
 * If `Text.wordWrapWidth` is greater than the width of the text bounds it is clamped to match the bounds width.
 *
 * Call this method with no arguments given to reset an existing textBounds.
 * 
 * It works by calculating the final position based on the Text.canvas size, which is modified as the text is updated. Some fonts
 * have additional padding around them which you can mitigate by tweaking the Text.padding property. It then adjusts the `pivot`
 * property based on the given bounds and canvas size. This means if you need to set the pivot property directly in your game then
 * you either cannot use `setTextBounds` or you must place the Text object inside another DisplayObject on which you set the pivot.
 *
 * @method Phaser.Text#setTextBounds
 * @param ***REMOVED***number***REMOVED*** [x] - The x coordinate of the Text Bounds region.
 * @param ***REMOVED***number***REMOVED*** [y] - The y coordinate of the Text Bounds region.
 * @param ***REMOVED***number***REMOVED*** [width] - The width of the Text Bounds region.
 * @param ***REMOVED***number***REMOVED*** [height] - The height of the Text Bounds region.
 * @return ***REMOVED***Phaser.Text***REMOVED*** This Text instance.
 */
Phaser.Text.prototype.setTextBounds = function (x, y, width, height) ***REMOVED***

    if (x === undefined)
    ***REMOVED***
        this.textBounds = null;
    ***REMOVED***
    else
    ***REMOVED***
        if (!this.textBounds)
        ***REMOVED***
            this.textBounds = new Phaser.Rectangle(x, y, width, height);
        ***REMOVED***
        else
        ***REMOVED***
            this.textBounds.setTo(x, y, width, height);
        ***REMOVED***

        if (this.style.wordWrapWidth > width)
        ***REMOVED***
            this.style.wordWrapWidth = width;
        ***REMOVED***
    ***REMOVED***

    this.updateTexture();
    
    return this;

***REMOVED***;

/**
 * Updates the texture based on the canvas dimensions.
 *
 * @method Phaser.Text#updateTexture
 * @private
 */
Phaser.Text.prototype.updateTexture = function () ***REMOVED***

    var base = this.texture.baseTexture;
    var crop = this.texture.crop;
    var frame = this.texture.frame;

    var w = this.canvas.width;
    var h = this.canvas.height;

    base.width = w;
    base.height = h;

    crop.width = w;
    crop.height = h;

    frame.width = w;
    frame.height = h;

    this.texture.width = w;
    this.texture.height = h;

    this._width = w;
    this._height = h;

    if (this.textBounds)
    ***REMOVED***
        var x = this.textBounds.x;
        var y = this.textBounds.y;

        //  Align the canvas based on the bounds
        if (this.style.boundsAlignH === 'right')
        ***REMOVED***
            x += this.textBounds.width - this.canvas.width / this.resolution;
        ***REMOVED***
        else if (this.style.boundsAlignH === 'center')
        ***REMOVED***
            x += this.textBounds.halfWidth - (this.canvas.width / this.resolution / 2);
        ***REMOVED***

        if (this.style.boundsAlignV === 'bottom')
        ***REMOVED***
            y += this.textBounds.height - this.canvas.height / this.resolution;
        ***REMOVED***
        else if (this.style.boundsAlignV === 'middle')
        ***REMOVED***
            y += this.textBounds.halfHeight - (this.canvas.height / this.resolution / 2);
        ***REMOVED***

        this.pivot.x = -x;
        this.pivot.y = -y;
    ***REMOVED***

    //  Can't render something with a zero sized dimension
    this.renderable = (w !== 0 && h !== 0);

    this.texture.requiresReTint = true;

    this.texture.baseTexture.dirty();

***REMOVED***;

/**
* Renders the object using the WebGL renderer
*
* @method Phaser.Text#_renderWebGL
* @private
* @param ***REMOVED***RenderSession***REMOVED*** renderSession - The Render Session to render the Text on.
*/
Phaser.Text.prototype._renderWebGL = function (renderSession) ***REMOVED***

    if (this.dirty)
    ***REMOVED***
        this.updateText();
        this.dirty = false;
    ***REMOVED***

    PIXI.Sprite.prototype._renderWebGL.call(this, renderSession);

***REMOVED***;

/**
* Renders the object using the Canvas renderer.
*
* @method Phaser.Text#_renderCanvas
* @private
* @param ***REMOVED***RenderSession***REMOVED*** renderSession - The Render Session to render the Text on.
*/
Phaser.Text.prototype._renderCanvas = function (renderSession) ***REMOVED***

    if (this.dirty)
    ***REMOVED***
        this.updateText();
        this.dirty = false;
    ***REMOVED***
     
    PIXI.Sprite.prototype._renderCanvas.call(this, renderSession);

***REMOVED***;

/**
* Calculates the ascent, descent and fontSize of a given font style.
*
* @method Phaser.Text#determineFontProperties
* @private
* @param ***REMOVED***object***REMOVED*** fontStyle 
*/
Phaser.Text.prototype.determineFontProperties = function (fontStyle) ***REMOVED***

    var properties = Phaser.Text.fontPropertiesCache[fontStyle];

    if (!properties)
    ***REMOVED***
        properties = ***REMOVED******REMOVED***;
        
        var canvas = Phaser.Text.fontPropertiesCanvas;
        var context = Phaser.Text.fontPropertiesContext;

        context.font = fontStyle;

        var width = Math.ceil(context.measureText('|MÉq').width);
        var baseline = Math.ceil(context.measureText('|MÉq').width);
        var height = 2 * baseline;

        baseline = baseline * 1.4 | 0;

        canvas.width = width;
        canvas.height = height;

        context.fillStyle = '#f00';
        context.fillRect(0, 0, width, height);

        context.font = fontStyle;

        context.textBaseline = 'alphabetic';
        context.fillStyle = '#000';
        context.fillText('|MÉq', 0, baseline);

        if (!context.getImageData(0, 0, width, height))
        ***REMOVED***
            properties.ascent = baseline;
            properties.descent = baseline + 6;
            properties.fontSize = properties.ascent + properties.descent;

            Phaser.Text.fontPropertiesCache[fontStyle] = properties;

            return properties;
        ***REMOVED***

        var imagedata = context.getImageData(0, 0, width, height).data;
        var pixels = imagedata.length;
        var line = width * 4;

        var i, j;

        var idx = 0;
        var stop = false;

        // ascent. scan from top to bottom until we find a non red pixel
        for (i = 0; i < baseline; i++)
        ***REMOVED***
            for (j = 0; j < line; j += 4)
            ***REMOVED***
                if (imagedata[idx + j] !== 255)
                ***REMOVED***
                    stop = true;
                    break;
                ***REMOVED***
            ***REMOVED***

            if (!stop)
            ***REMOVED***
                idx += line;
            ***REMOVED***
            else
            ***REMOVED***
                break;
            ***REMOVED***
        ***REMOVED***

        properties.ascent = baseline - i;

        idx = pixels - line;
        stop = false;

        // descent. scan from bottom to top until we find a non red pixel
        for (i = height; i > baseline; i--)
        ***REMOVED***
            for (j = 0; j < line; j += 4)
            ***REMOVED***
                if (imagedata[idx + j] !== 255)
                ***REMOVED***
                    stop = true;
                    break;
                ***REMOVED***
            ***REMOVED***

            if (!stop)
            ***REMOVED***
                idx -= line;
            ***REMOVED***
            else
            ***REMOVED***
                break;
            ***REMOVED***
        ***REMOVED***

        properties.descent = i - baseline;
        //TODO might need a tweak. kind of a temp fix!
        properties.descent += 6;
        properties.fontSize = properties.ascent + properties.descent;

        Phaser.Text.fontPropertiesCache[fontStyle] = properties;
    ***REMOVED***

    return properties;

***REMOVED***;

/**
* Returns the bounds of the Text as a rectangle.
* The bounds calculation takes the worldTransform into account.
*
* @method Phaser.Text#getBounds
* @param ***REMOVED***Phaser.Matrix***REMOVED*** matrix - The transformation matrix of the Text.
* @return ***REMOVED***Phaser.Rectangle***REMOVED*** The framing rectangle
*/
Phaser.Text.prototype.getBounds = function (matrix) ***REMOVED***

    if (this.dirty)
    ***REMOVED***
        this.updateText();
        this.dirty = false;
    ***REMOVED***

    return PIXI.Sprite.prototype.getBounds.call(this, matrix);

***REMOVED***;

/**
* The text to be displayed by this Text object.
* Use a \n to insert a carriage return and split the text.
* The text will be rendered with any style currently set.
*
* @name Phaser.Text#text
* @property ***REMOVED***string***REMOVED*** text
*/
Object.defineProperty(Phaser.Text.prototype, 'text', ***REMOVED***

    get: function() ***REMOVED***
        return this._text;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this._text)
        ***REMOVED***
            this._text = value.toString() || '';
            this.dirty = true;

            if (this.parent)
            ***REMOVED***
                this.updateTransform();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* Change the font used.
*
* This is equivalent of the `font` property specified to ***REMOVED***@link Phaser.Text#setStyle setStyle***REMOVED***, except
* that unlike using `setStyle` this will not change any current font fill/color settings.
*
* The CSS font string can also be individually altered with the `font`, `fontSize`, `fontWeight`, `fontStyle`, and `fontVariant` properties.
*
* @name Phaser.Text#cssFont
* @property ***REMOVED***string***REMOVED*** cssFont
*/
Object.defineProperty(Phaser.Text.prototype, 'cssFont', ***REMOVED***

    get: function() ***REMOVED***
        return this.componentsToFont(this._fontComponents);
    ***REMOVED***,

    set: function (value)
    ***REMOVED***
        value = value || 'bold 20pt Arial';
        this._fontComponents = this.fontToComponents(value);
        this.updateFont(this._fontComponents);
    ***REMOVED***

***REMOVED***);

/**
* Change the font family that the text will be rendered in, such as 'Arial'.
*
* Multiple CSS font families and generic fallbacks can be specified as long as
* ***REMOVED***@link http://www.w3.org/TR/CSS2/fonts.html#propdef-font-family CSS font-family rules***REMOVED*** are followed.
*
* To change the entire font string use ***REMOVED***@link Phaser.Text#cssFont cssFont***REMOVED*** instead: eg. `text.cssFont = 'bold 20pt Arial'`.
*
* @name Phaser.Text#font
* @property ***REMOVED***string***REMOVED*** font
*/
Object.defineProperty(Phaser.Text.prototype, 'font', ***REMOVED***

    get: function() ***REMOVED***
        return this._fontComponents.fontFamily;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        value = value || 'Arial';
        value = value.trim();

        // If it looks like the value should be quoted, but isn't, then quote it.
        if (!/^(?:inherit|serif|sans-serif|cursive|fantasy|monospace)$/.exec(value) && !/['",]/.exec(value))
        ***REMOVED***
            value = "'" + value + "'";
        ***REMOVED***

        this._fontComponents.fontFamily = value;
        this.updateFont(this._fontComponents);

    ***REMOVED***

***REMOVED***);

/**
* The size of the font.
*
* If the font size is specified in pixels (eg. `32` or `'32px`') then a number (ie. `32`) representing
* the font size in pixels is returned; otherwise the value with CSS unit is returned as a string (eg. `'12pt'`).
*
* @name Phaser.Text#fontSize
* @property ***REMOVED***number|string***REMOVED*** fontSize
*/
Object.defineProperty(Phaser.Text.prototype, 'fontSize', ***REMOVED***

    get: function() ***REMOVED***

        var size = this._fontComponents.fontSize;

        if (size && /(?:^0$|px$)/.exec(size))
        ***REMOVED***
            return parseInt(size, 10);
        ***REMOVED***
        else
        ***REMOVED***
            return size;
        ***REMOVED***

    ***REMOVED***,

    set: function(value) ***REMOVED***

        value = value || '0';
        
        if (typeof value === 'number')
        ***REMOVED***
            value = value + 'px';
        ***REMOVED***

        this._fontComponents.fontSize = value;
        this.updateFont(this._fontComponents);

    ***REMOVED***

***REMOVED***);

/**
* The weight of the font: 'normal', 'bold', or ***REMOVED***@link http://www.w3.org/TR/CSS2/fonts.html#propdef-font-weight a valid CSS font weight***REMOVED***.
* @name Phaser.Text#fontWeight
* @property ***REMOVED***string***REMOVED*** fontWeight
*/
Object.defineProperty(Phaser.Text.prototype, 'fontWeight', ***REMOVED***

    get: function() ***REMOVED***
        return this._fontComponents.fontWeight || 'normal';
    ***REMOVED***,

    set: function(value) ***REMOVED***

        value = value || 'normal';
        this._fontComponents.fontWeight = value;
        this.updateFont(this._fontComponents);

    ***REMOVED***

***REMOVED***);

/**
* The style of the font: 'normal', 'italic', 'oblique'
* @name Phaser.Text#fontStyle
* @property ***REMOVED***string***REMOVED*** fontStyle
*/
Object.defineProperty(Phaser.Text.prototype, 'fontStyle', ***REMOVED***

    get: function() ***REMOVED***
        return this._fontComponents.fontStyle || 'normal';
    ***REMOVED***,

    set: function(value) ***REMOVED***

        value = value || 'normal';
        this._fontComponents.fontStyle = value;
        this.updateFont(this._fontComponents);

    ***REMOVED***

***REMOVED***);

/**
* The variant the font: 'normal', 'small-caps'
* @name Phaser.Text#fontVariant
* @property ***REMOVED***string***REMOVED*** fontVariant
*/
Object.defineProperty(Phaser.Text.prototype, 'fontVariant', ***REMOVED***

    get: function() ***REMOVED***
        return this._fontComponents.fontVariant || 'normal';
    ***REMOVED***,

    set: function(value) ***REMOVED***

        value = value || 'normal';
        this._fontComponents.fontVariant = value;
        this.updateFont(this._fontComponents);

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Text#fill
* @property ***REMOVED***object***REMOVED*** fill - A canvas fillstyle that will be used on the text eg 'red', '#00FF00'.
*/
Object.defineProperty(Phaser.Text.prototype, 'fill', ***REMOVED***

    get: function() ***REMOVED***
        return this.style.fill;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this.style.fill)
        ***REMOVED***
            this.style.fill = value;
            this.dirty = true;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* Controls the horizontal alignment for multiline text.
* Can be: 'left', 'center' or 'right'.
* Does not affect single lines of text. For that please see `setTextBounds`.
* @name Phaser.Text#align
* @property ***REMOVED***string***REMOVED*** align
*/
Object.defineProperty(Phaser.Text.prototype, 'align', ***REMOVED***

    get: function() ***REMOVED***
        return this.style.align;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this.style.align)
        ***REMOVED***
            this.style.align = value;
            this.dirty = true;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* The resolution of the canvas the text is rendered to.
* This defaults to match the resolution of the renderer, but can be changed on a per Text object basis.
* @name Phaser.Text#resolution
* @property ***REMOVED***integer***REMOVED*** resolution
*/
Object.defineProperty(Phaser.Text.prototype, 'resolution', ***REMOVED***

    get: function() ***REMOVED***
        return this._res;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this._res)
        ***REMOVED***
            this._res = value;
            this.dirty = true;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* The size (in pixels) of the tabs, for when text includes tab characters. 0 disables. 
* Can be an integer or an array of varying tab sizes, one tab per element.
* For example if you set tabs to 100 then when Text encounters a tab it will jump ahead 100 pixels.
* If you set tabs to be `[100,200]` then it will set the first tab at 100px and the second at 200px.
* 
* @name Phaser.Text#tabs
* @property ***REMOVED***integer|array***REMOVED*** tabs
*/
Object.defineProperty(Phaser.Text.prototype, 'tabs', ***REMOVED***

    get: function() ***REMOVED***
        return this.style.tabs;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this.style.tabs)
        ***REMOVED***
            this.style.tabs = value;
            this.dirty = true;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* Horizontal alignment of the text within the `textBounds`. Can be: 'left', 'center' or 'right'.
* @name Phaser.Text#boundsAlignH
* @property ***REMOVED***string***REMOVED*** boundsAlignH
*/
Object.defineProperty(Phaser.Text.prototype, 'boundsAlignH', ***REMOVED***

    get: function() ***REMOVED***
        return this.style.boundsAlignH;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this.style.boundsAlignH)
        ***REMOVED***
            this.style.boundsAlignH = value;
            this.dirty = true;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* Vertical alignment of the text within the `textBounds`. Can be: 'top', 'middle' or 'bottom'.
* @name Phaser.Text#boundsAlignV
* @property ***REMOVED***string***REMOVED*** boundsAlignV
*/
Object.defineProperty(Phaser.Text.prototype, 'boundsAlignV', ***REMOVED***

    get: function() ***REMOVED***
        return this.style.boundsAlignV;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this.style.boundsAlignV)
        ***REMOVED***
            this.style.boundsAlignV = value;
            this.dirty = true;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Text#stroke
* @property ***REMOVED***string***REMOVED*** stroke - A canvas fillstyle that will be used on the text stroke eg 'blue', '#FCFF00'.
*/
Object.defineProperty(Phaser.Text.prototype, 'stroke', ***REMOVED***

    get: function() ***REMOVED***
        return this.style.stroke;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this.style.stroke)
        ***REMOVED***
            this.style.stroke = value;
            this.dirty = true;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Text#strokeThickness
* @property ***REMOVED***number***REMOVED*** strokeThickness - A number that represents the thickness of the stroke. Default is 0 (no stroke)
*/
Object.defineProperty(Phaser.Text.prototype, 'strokeThickness', ***REMOVED***

    get: function() ***REMOVED***
        return this.style.strokeThickness;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this.style.strokeThickness)
        ***REMOVED***
            this.style.strokeThickness = value;
            this.dirty = true;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Text#wordWrap
* @property ***REMOVED***boolean***REMOVED*** wordWrap - Indicates if word wrap should be used.
*/
Object.defineProperty(Phaser.Text.prototype, 'wordWrap', ***REMOVED***

    get: function() ***REMOVED***
        return this.style.wordWrap;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this.style.wordWrap)
        ***REMOVED***
            this.style.wordWrap = value;
            this.dirty = true;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Text#wordWrapWidth
* @property ***REMOVED***number***REMOVED*** wordWrapWidth - The width at which text will wrap.
*/
Object.defineProperty(Phaser.Text.prototype, 'wordWrapWidth', ***REMOVED***

    get: function() ***REMOVED***
        return this.style.wordWrapWidth;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this.style.wordWrapWidth)
        ***REMOVED***
            this.style.wordWrapWidth = value;
            this.dirty = true;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Text#lineSpacing
* @property ***REMOVED***number***REMOVED*** lineSpacing - Additional spacing (in pixels) between each line of text if multi-line.
*/
Object.defineProperty(Phaser.Text.prototype, 'lineSpacing', ***REMOVED***

    get: function() ***REMOVED***
        return this._lineSpacing;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this._lineSpacing)
        ***REMOVED***
            this._lineSpacing = parseFloat(value);
            this.dirty = true;

            if (this.parent)
            ***REMOVED***
                this.updateTransform();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Text#shadowOffsetX
* @property ***REMOVED***number***REMOVED*** shadowOffsetX - The shadowOffsetX value in pixels. This is how far offset horizontally the shadow effect will be.
*/
Object.defineProperty(Phaser.Text.prototype, 'shadowOffsetX', ***REMOVED***

    get: function() ***REMOVED***
        return this.style.shadowOffsetX;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this.style.shadowOffsetX)
        ***REMOVED***
            this.style.shadowOffsetX = value;
            this.dirty = true;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Text#shadowOffsetY
* @property ***REMOVED***number***REMOVED*** shadowOffsetY - The shadowOffsetY value in pixels. This is how far offset vertically the shadow effect will be.
*/
Object.defineProperty(Phaser.Text.prototype, 'shadowOffsetY', ***REMOVED***

    get: function() ***REMOVED***
        return this.style.shadowOffsetY;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this.style.shadowOffsetY)
        ***REMOVED***
            this.style.shadowOffsetY = value;
            this.dirty = true;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Text#shadowColor
* @property ***REMOVED***string***REMOVED*** shadowColor - The color of the shadow, as given in CSS rgba format. Set the alpha component to 0 to disable the shadow.
*/
Object.defineProperty(Phaser.Text.prototype, 'shadowColor', ***REMOVED***

    get: function() ***REMOVED***
        return this.style.shadowColor;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this.style.shadowColor)
        ***REMOVED***
            this.style.shadowColor = value;
            this.dirty = true;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Text#shadowBlur
* @property ***REMOVED***number***REMOVED*** shadowBlur - The shadowBlur value. Make the shadow softer by applying a Gaussian blur to it. A number from 0 (no blur) up to approx. 10 (depending on scene).
*/
Object.defineProperty(Phaser.Text.prototype, 'shadowBlur', ***REMOVED***

    get: function() ***REMOVED***
        return this.style.shadowBlur;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this.style.shadowBlur)
        ***REMOVED***
            this.style.shadowBlur = value;
            this.dirty = true;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Text#shadowStroke
* @property ***REMOVED***boolean***REMOVED*** shadowStroke - Sets if the drop shadow is applied to the Text stroke.
*/
Object.defineProperty(Phaser.Text.prototype, 'shadowStroke', ***REMOVED***

    get: function() ***REMOVED***
        return this.style.shadowStroke;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this.style.shadowStroke)
        ***REMOVED***
            this.style.shadowStroke = value;
            this.dirty = true;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Text#shadowFill
* @property ***REMOVED***boolean***REMOVED*** shadowFill - Sets if the drop shadow is applied to the Text fill.
*/
Object.defineProperty(Phaser.Text.prototype, 'shadowFill', ***REMOVED***

    get: function() ***REMOVED***
        return this.style.shadowFill;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        if (value !== this.style.shadowFill)
        ***REMOVED***
            this.style.shadowFill = value;
            this.dirty = true;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Text#width
* @property ***REMOVED***number***REMOVED*** width - The width of the Text. Setting this will modify the scale to achieve the value requested.
*/
Object.defineProperty(Phaser.Text.prototype, 'width', ***REMOVED***

    get: function() ***REMOVED***

        if (this.dirty)
        ***REMOVED***
            this.updateText();
            this.dirty = false;
        ***REMOVED***

        return this.scale.x * this.texture.frame.width;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        this.scale.x = value / this.texture.frame.width;
        this._width = value;
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Text#height
* @property ***REMOVED***number***REMOVED*** height - The height of the Text. Setting this will modify the scale to achieve the value requested.
*/
Object.defineProperty(Phaser.Text.prototype, 'height', ***REMOVED***

    get: function() ***REMOVED***

        if (this.dirty)
        ***REMOVED***
            this.updateText();
            this.dirty = false;
        ***REMOVED***

        return this.scale.y * this.texture.frame.height;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        this.scale.y = value / this.texture.frame.height;
        this._height = value;
    ***REMOVED***

***REMOVED***);

Phaser.Text.fontPropertiesCache = ***REMOVED******REMOVED***;

Phaser.Text.fontPropertiesCanvas = document.createElement('canvas');
Phaser.Text.fontPropertiesContext = Phaser.Text.fontPropertiesCanvas.getContext('2d');
