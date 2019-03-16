/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The Graphics class contains methods used to draw primitive shapes such as lines, circles and rectangles to the display, and color and fill them.
 * 
 * @class Graphics
 * @extends DisplayObjectContainer
 * @constructor
 */
PIXI.Graphics = function()
***REMOVED***
    PIXI.DisplayObjectContainer.call(this);

    this.renderable = true;

    /**
     * The alpha value used when filling the Graphics object.
     *
     * @property fillAlpha
     * @type Number
     */
    this.fillAlpha = 1;

    /**
     * The width (thickness) of any lines drawn.
     *
     * @property lineWidth
     * @type Number
     */
    this.lineWidth = 0;

    /**
     * The color of any lines drawn.
     *
     * @property lineColor
     * @type String
     * @default 0
     */
    this.lineColor = 0;

    /**
     * Graphics data
     *
     * @property graphicsData
     * @type Array
     * @private
     */
    this.graphicsData = [];

    /**
     * The tint applied to the graphic shape. This is a hex value. Apply a value of 0xFFFFFF to reset the tint.
     *
     * @property tint
     * @type Number
     * @default 0xFFFFFF
     */
    this.tint = 0xFFFFFF;

    /**
     * The blend mode to be applied to the graphic shape. Apply a value of PIXI.blendModes.NORMAL to reset the blend mode.
     *
     * @property blendMode
     * @type Number
     * @default PIXI.blendModes.NORMAL;
     */
    this.blendMode = PIXI.blendModes.NORMAL;
    
    /**
     * Current path
     *
     * @property currentPath
     * @type Object
     * @private
     */
    this.currentPath = null;
    
    /**
     * Array containing some WebGL-related properties used by the WebGL renderer.
     *
     * @property _webGL
     * @type Array
     * @private
     */
    this._webGL = [];

    /**
     * Whether this shape is being used as a mask.
     *
     * @property isMask
     * @type Boolean
     */
    this.isMask = false;

    /**
     * The bounds' padding used for bounds calculation.
     *
     * @property boundsPadding
     * @type Number
     */
    this.boundsPadding = 0;

    this._localBounds = new PIXI.Rectangle(0,0,1,1);

    /**
     * Used to detect if the graphics object has changed. If this is set to true then the graphics object will be recalculated.
     * 
     * @property dirty
     * @type Boolean
     * @private
     */
    this.dirty = true;

    /**
     * Used to detect if the bounds have been invalidated, by this Graphics being cleared or drawn to.
     * If this is set to true then the updateLocalBounds is called once in the postUpdate method.
     * 
     * @property _boundsDirty
     * @type Boolean
     * @private
     */
    this._boundsDirty = false;

    /**
     * Used to detect if the webgl graphics object has changed. If this is set to true then the graphics object will be recalculated.
     * 
     * @property webGLDirty
     * @type Boolean
     * @private
     */
    this.webGLDirty = false;

    /**
     * Used to detect if the cached sprite object needs to be updated.
     * 
     * @property cachedSpriteDirty
     * @type Boolean
     * @private
     */
    this.cachedSpriteDirty = false;

***REMOVED***;

// constructor
PIXI.Graphics.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
PIXI.Graphics.prototype.constructor = PIXI.Graphics;

/**
 * Specifies the line style used for subsequent calls to Graphics methods such as the lineTo() method or the drawCircle() method.
 *
 * @method lineStyle
 * @param lineWidth ***REMOVED***Number***REMOVED*** width of the line to draw, will update the objects stored style
 * @param color ***REMOVED***Number***REMOVED*** color of the line to draw, will update the objects stored style
 * @param alpha ***REMOVED***Number***REMOVED*** alpha of the line to draw, will update the objects stored style
 * @return ***REMOVED***Graphics***REMOVED***
 */
PIXI.Graphics.prototype.lineStyle = function(lineWidth, color, alpha)
***REMOVED***
    this.lineWidth = lineWidth || 0;
    this.lineColor = color || 0;
    this.lineAlpha = (alpha === undefined) ? 1 : alpha;

    if (this.currentPath)
    ***REMOVED***
        if (this.currentPath.shape.points.length)
        ***REMOVED***
            // halfway through a line? start a new one!
            this.drawShape(new PIXI.Polygon(this.currentPath.shape.points.slice(-2)));
        ***REMOVED***
        else
        ***REMOVED***
            // otherwise its empty so lets just set the line properties
            this.currentPath.lineWidth = this.lineWidth;
            this.currentPath.lineColor = this.lineColor;
            this.currentPath.lineAlpha = this.lineAlpha;
        ***REMOVED***
    ***REMOVED***

    return this;
***REMOVED***;

/**
 * Moves the current drawing position to x, y.
 *
 * @method moveTo
 * @param x ***REMOVED***Number***REMOVED*** the X coordinate to move to
 * @param y ***REMOVED***Number***REMOVED*** the Y coordinate to move to
 * @return ***REMOVED***Graphics***REMOVED***
  */
PIXI.Graphics.prototype.moveTo = function(x, y)
***REMOVED***
    this.drawShape(new PIXI.Polygon([x, y]));

    return this;
***REMOVED***;

/**
 * Draws a line using the current line style from the current drawing position to (x, y);
 * The current drawing position is then set to (x, y).
 *
 * @method lineTo
 * @param x ***REMOVED***Number***REMOVED*** the X coordinate to draw to
 * @param y ***REMOVED***Number***REMOVED*** the Y coordinate to draw to
 * @return ***REMOVED***Graphics***REMOVED***
 */
PIXI.Graphics.prototype.lineTo = function(x, y)
***REMOVED***
    if (!this.currentPath)
    ***REMOVED***
        this.moveTo(0, 0);
    ***REMOVED***

    this.currentPath.shape.points.push(x, y);
    this.dirty = true;
    this._boundsDirty = true;

    return this;
***REMOVED***;

/**
 * Calculate the points for a quadratic bezier curve and then draws it.
 * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
 *
 * @method quadraticCurveTo
 * @param cpX ***REMOVED***Number***REMOVED*** Control point x
 * @param cpY ***REMOVED***Number***REMOVED*** Control point y
 * @param toX ***REMOVED***Number***REMOVED*** Destination point x
 * @param toY ***REMOVED***Number***REMOVED*** Destination point y
 * @return ***REMOVED***Graphics***REMOVED***
 */
PIXI.Graphics.prototype.quadraticCurveTo = function(cpX, cpY, toX, toY)
***REMOVED***
    if (this.currentPath)
    ***REMOVED***
        if (this.currentPath.shape.points.length === 0)
        ***REMOVED***
            this.currentPath.shape.points = [0, 0];
        ***REMOVED***
    ***REMOVED***
    else
    ***REMOVED***
        this.moveTo(0,0);
    ***REMOVED***

    var xa,
        ya,
        n = 20,
        points = this.currentPath.shape.points;

    if (points.length === 0)
    ***REMOVED***
        this.moveTo(0, 0);
    ***REMOVED***

    var fromX = points[points.length - 2];
    var fromY = points[points.length - 1];
    var j = 0;
    for (var i = 1; i <= n; ++i)
    ***REMOVED***
        j = i / n;

        xa = fromX + ( (cpX - fromX) * j );
        ya = fromY + ( (cpY - fromY) * j );

        points.push( xa + ( ((cpX + ( (toX - cpX) * j )) - xa) * j ),
                     ya + ( ((cpY + ( (toY - cpY) * j )) - ya) * j ) );
    ***REMOVED***

    this.dirty = true;
    this._boundsDirty = true;

    return this;
***REMOVED***;

/**
 * Calculate the points for a bezier curve and then draws it.
 *
 * @method bezierCurveTo
 * @param cpX ***REMOVED***Number***REMOVED*** Control point x
 * @param cpY ***REMOVED***Number***REMOVED*** Control point y
 * @param cpX2 ***REMOVED***Number***REMOVED*** Second Control point x
 * @param cpY2 ***REMOVED***Number***REMOVED*** Second Control point y
 * @param toX ***REMOVED***Number***REMOVED*** Destination point x
 * @param toY ***REMOVED***Number***REMOVED*** Destination point y
 * @return ***REMOVED***Graphics***REMOVED***
 */
PIXI.Graphics.prototype.bezierCurveTo = function(cpX, cpY, cpX2, cpY2, toX, toY)
***REMOVED***
    if (this.currentPath)
    ***REMOVED***
        if (this.currentPath.shape.points.length === 0)
        ***REMOVED***
            this.currentPath.shape.points = [0, 0];
        ***REMOVED***
    ***REMOVED***
    else
    ***REMOVED***
        this.moveTo(0,0);
    ***REMOVED***

    var n = 20,
        dt,
        dt2,
        dt3,
        t2,
        t3,
        points = this.currentPath.shape.points;

    var fromX = points[points.length-2];
    var fromY = points[points.length-1];
    var j = 0;

    for (var i = 1; i <= n; ++i)
    ***REMOVED***
        j = i / n;

        dt = (1 - j);
        dt2 = dt * dt;
        dt3 = dt2 * dt;

        t2 = j * j;
        t3 = t2 * j;
        
        points.push( dt3 * fromX + 3 * dt2 * j * cpX + 3 * dt * t2 * cpX2 + t3 * toX,
                     dt3 * fromY + 3 * dt2 * j * cpY + 3 * dt * t2 * cpY2 + t3 * toY);
    ***REMOVED***
    
    this.dirty = true;
    this._boundsDirty = true;

    return this;
***REMOVED***;

/*
 * The arcTo() method creates an arc/curve between two tangents on the canvas.
 * 
 * "borrowed" from https://code.google.com/p/fxcanvas/ - thanks google!
 *
 * @method arcTo
 * @param x1 ***REMOVED***Number***REMOVED*** The x-coordinate of the beginning of the arc
 * @param y1 ***REMOVED***Number***REMOVED*** The y-coordinate of the beginning of the arc
 * @param x2 ***REMOVED***Number***REMOVED*** The x-coordinate of the end of the arc
 * @param y2 ***REMOVED***Number***REMOVED*** The y-coordinate of the end of the arc
 * @param radius ***REMOVED***Number***REMOVED*** The radius of the arc
 * @return ***REMOVED***Graphics***REMOVED***
 */
PIXI.Graphics.prototype.arcTo = function(x1, y1, x2, y2, radius)
***REMOVED***
    if (this.currentPath)
    ***REMOVED***
        if (this.currentPath.shape.points.length === 0)
        ***REMOVED***
            this.currentPath.shape.points.push(x1, y1);
        ***REMOVED***
    ***REMOVED***
    else
    ***REMOVED***
        this.moveTo(x1, y1);
    ***REMOVED***

    var points = this.currentPath.shape.points,
        fromX = points[points.length-2],
        fromY = points[points.length-1],
        a1 = fromY - y1,
        b1 = fromX - x1,
        a2 = y2   - y1,
        b2 = x2   - x1,
        mm = Math.abs(a1 * b2 - b1 * a2);

    if (mm < 1.0e-8 || radius === 0)
    ***REMOVED***
        if (points[points.length-2] !== x1 || points[points.length-1] !== y1)
        ***REMOVED***
            points.push(x1, y1);
        ***REMOVED***
    ***REMOVED***
    else
    ***REMOVED***
        var dd = a1 * a1 + b1 * b1,
            cc = a2 * a2 + b2 * b2,
            tt = a1 * a2 + b1 * b2,
            k1 = radius * Math.sqrt(dd) / mm,
            k2 = radius * Math.sqrt(cc) / mm,
            j1 = k1 * tt / dd,
            j2 = k2 * tt / cc,
            cx = k1 * b2 + k2 * b1,
            cy = k1 * a2 + k2 * a1,
            px = b1 * (k2 + j1),
            py = a1 * (k2 + j1),
            qx = b2 * (k1 + j2),
            qy = a2 * (k1 + j2),
            startAngle = Math.atan2(py - cy, px - cx),
            endAngle   = Math.atan2(qy - cy, qx - cx);

        this.arc(cx + x1, cy + y1, radius, startAngle, endAngle, b1 * a2 > b2 * a1);
    ***REMOVED***

    this.dirty = true;
    this._boundsDirty = true;

    return this;
***REMOVED***;

/**
 * The arc method creates an arc/curve (used to create circles, or parts of circles).
 *
 * @method arc
 * @param cx ***REMOVED***Number***REMOVED*** The x-coordinate of the center of the circle
 * @param cy ***REMOVED***Number***REMOVED*** The y-coordinate of the center of the circle
 * @param radius ***REMOVED***Number***REMOVED*** The radius of the circle
 * @param startAngle ***REMOVED***Number***REMOVED*** The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
 * @param endAngle ***REMOVED***Number***REMOVED*** The ending angle, in radians
 * @param anticlockwise ***REMOVED***Boolean***REMOVED*** Optional. Specifies whether the drawing should be counterclockwise or clockwise. False is default, and indicates clockwise, while true indicates counter-clockwise.
 * @param segments ***REMOVED***Number***REMOVED*** Optional. The number of segments to use when calculating the arc. The default is 40. If you need more fidelity use a higher number.
 * @return ***REMOVED***Graphics***REMOVED***
 */
PIXI.Graphics.prototype.arc = function(cx, cy, radius, startAngle, endAngle, anticlockwise, segments)
***REMOVED***
    //  If we do this we can never draw a full circle
    if (startAngle === endAngle)
    ***REMOVED***
        return this;
    ***REMOVED***

    if (anticlockwise === undefined) ***REMOVED*** anticlockwise = false; ***REMOVED***
    if (segments === undefined) ***REMOVED*** segments = 40; ***REMOVED***

    if (!anticlockwise && endAngle <= startAngle)
    ***REMOVED***
        endAngle += Math.PI * 2;
    ***REMOVED***
    else if (anticlockwise && startAngle <= endAngle)
    ***REMOVED***
        startAngle += Math.PI * 2;
    ***REMOVED***

    var sweep = anticlockwise ? (startAngle - endAngle) * -1 : (endAngle - startAngle);
    var segs =  Math.ceil(Math.abs(sweep) / (Math.PI * 2)) * segments;

    //  Sweep check - moved here because we don't want to do the moveTo below if the arc fails
    if (sweep === 0)
    ***REMOVED***
        return this;
    ***REMOVED***

    var startX = cx + Math.cos(startAngle) * radius;
    var startY = cy + Math.sin(startAngle) * radius;

    if (anticlockwise && this.filling)
    ***REMOVED***
        this.moveTo(cx, cy);
    ***REMOVED***
    else
    ***REMOVED***
        this.moveTo(startX, startY);
    ***REMOVED***

    //  currentPath will always exist after calling a moveTo
    var points = this.currentPath.shape.points;

    var theta = sweep / (segs * 2);
    var theta2 = theta * 2;

    var cTheta = Math.cos(theta);
    var sTheta = Math.sin(theta);
    
    var segMinus = segs - 1;

    var remainder = (segMinus % 1) / segMinus;

    for (var i = 0; i <= segMinus; i++)
    ***REMOVED***
        var real =  i + remainder * i;
    
        var angle = ((theta) + startAngle + (theta2 * real));

        var c = Math.cos(angle);
        var s = -Math.sin(angle);

        points.push(( (cTheta *  c) + (sTheta * s) ) * radius + cx,
                    ( (cTheta * -s) + (sTheta * c) ) * radius + cy);
    ***REMOVED***

    this.dirty = true;
    this._boundsDirty = true;

    return this;
***REMOVED***;

/**
 * Specifies a simple one-color fill that subsequent calls to other Graphics methods
 * (such as lineTo() or drawCircle()) use when drawing.
 *
 * @method beginFill
 * @param color ***REMOVED***Number***REMOVED*** the color of the fill
 * @param alpha ***REMOVED***Number***REMOVED*** the alpha of the fill
 * @return ***REMOVED***Graphics***REMOVED***
 */
PIXI.Graphics.prototype.beginFill = function(color, alpha)
***REMOVED***
    this.filling = true;
    this.fillColor = color || 0;
    this.fillAlpha = (alpha === undefined) ? 1 : alpha;

    if (this.currentPath)
    ***REMOVED***
        if (this.currentPath.shape.points.length <= 2)
        ***REMOVED***
            this.currentPath.fill = this.filling;
            this.currentPath.fillColor = this.fillColor;
            this.currentPath.fillAlpha = this.fillAlpha;
        ***REMOVED***
    ***REMOVED***

    return this;
***REMOVED***;

/**
 * Applies a fill to the lines and shapes that were added since the last call to the beginFill() method.
 *
 * @method endFill
 * @return ***REMOVED***Graphics***REMOVED***
 */
PIXI.Graphics.prototype.endFill = function()
***REMOVED***
    this.filling = false;
    this.fillColor = null;
    this.fillAlpha = 1;

    return this;
***REMOVED***;

/**
 * @method drawRect
 *
 * @param x ***REMOVED***Number***REMOVED*** The X coord of the top-left of the rectangle
 * @param y ***REMOVED***Number***REMOVED*** The Y coord of the top-left of the rectangle
 * @param width ***REMOVED***Number***REMOVED*** The width of the rectangle
 * @param height ***REMOVED***Number***REMOVED*** The height of the rectangle
 * @return ***REMOVED***Graphics***REMOVED***
 */
PIXI.Graphics.prototype.drawRect = function(x, y, width, height)
***REMOVED***
    this.drawShape(new PIXI.Rectangle(x, y, width, height));

    return this;
***REMOVED***;

/**
 * @method drawRoundedRect
 * @param x ***REMOVED***Number***REMOVED*** The X coord of the top-left of the rectangle
 * @param y ***REMOVED***Number***REMOVED*** The Y coord of the top-left of the rectangle
 * @param width ***REMOVED***Number***REMOVED*** The width of the rectangle
 * @param height ***REMOVED***Number***REMOVED*** The height of the rectangle
 * @param radius ***REMOVED***Number***REMOVED*** Radius of the rectangle corners. In WebGL this must be a value between 0 and 9.
 */
PIXI.Graphics.prototype.drawRoundedRect = function(x, y, width, height, radius)
***REMOVED***
    this.drawShape(new PIXI.RoundedRectangle(x, y, width, height, radius));

    return this;
***REMOVED***;

/**
 * Draws a circle.
 *
 * @method drawCircle
 * @param x ***REMOVED***Number***REMOVED*** The X coordinate of the center of the circle
 * @param y ***REMOVED***Number***REMOVED*** The Y coordinate of the center of the circle
 * @param diameter ***REMOVED***Number***REMOVED*** The diameter of the circle
 * @return ***REMOVED***Graphics***REMOVED***
 */
PIXI.Graphics.prototype.drawCircle = function(x, y, diameter)
***REMOVED***
    this.drawShape(new PIXI.Circle(x, y, diameter));

    return this;
***REMOVED***;

/**
 * Draws an ellipse.
 *
 * @method drawEllipse
 * @param x ***REMOVED***Number***REMOVED*** The X coordinate of the center of the ellipse
 * @param y ***REMOVED***Number***REMOVED*** The Y coordinate of the center of the ellipse
 * @param width ***REMOVED***Number***REMOVED*** The half width of the ellipse
 * @param height ***REMOVED***Number***REMOVED*** The half height of the ellipse
 * @return ***REMOVED***Graphics***REMOVED***
 */
PIXI.Graphics.prototype.drawEllipse = function(x, y, width, height)
***REMOVED***
    this.drawShape(new PIXI.Ellipse(x, y, width, height));

    return this;
***REMOVED***;

/**
 * Draws a polygon using the given path.
 *
 * @method drawPolygon
 * @param path ***REMOVED***Array|Phaser.Polygon***REMOVED*** The path data used to construct the polygon. Can either be an array of points or a Phaser.Polygon object.
 * @return ***REMOVED***Graphics***REMOVED***
 */
PIXI.Graphics.prototype.drawPolygon = function(path)
***REMOVED***
    if (path instanceof Phaser.Polygon || path instanceof PIXI.Polygon)
    ***REMOVED***
        path = path.points;
    ***REMOVED***

    // prevents an argument assignment deopt
    // see section 3.1: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
    var points = path;

    if (!Array.isArray(points))
    ***REMOVED***
        // prevents an argument leak deopt
        // see section 3.2: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
        points = new Array(arguments.length);

        for (var i = 0; i < points.length; ++i)
        ***REMOVED***
            points[i] = arguments[i];
        ***REMOVED***
    ***REMOVED***

    this.drawShape(new Phaser.Polygon(points));

    return this;
***REMOVED***;

/**
 * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
 *
 * @method clear
 * @return ***REMOVED***Graphics***REMOVED***
 */
PIXI.Graphics.prototype.clear = function()
***REMOVED***
    this.lineWidth = 0;
    this.filling = false;

    this.dirty = true;
    this._boundsDirty = true;
    this.clearDirty = true;
    this.graphicsData = [];

    this.updateLocalBounds();

    return this;
***REMOVED***;

/**
 * Useful function that returns a texture of the graphics object that can then be used to create sprites
 * This can be quite useful if your geometry is complicated and needs to be reused multiple times.
 *
 * @method generateTexture
 * @param [resolution=1] ***REMOVED***Number***REMOVED*** The resolution of the texture being generated
 * @param [scaleMode=0] ***REMOVED***Number***REMOVED*** Should be one of the PIXI.scaleMode consts
 * @param [padding=0] ***REMOVED***Number***REMOVED*** Add optional extra padding to the generated texture (default 0)
 * @return ***REMOVED***Texture***REMOVED*** a texture of the graphics object
 */
PIXI.Graphics.prototype.generateTexture = function(resolution, scaleMode, padding)
***REMOVED***
    if (resolution === undefined) ***REMOVED*** resolution = 1; ***REMOVED***
    if (scaleMode === undefined) ***REMOVED*** scaleMode = PIXI.scaleModes.DEFAULT; ***REMOVED***
    if (padding === undefined) ***REMOVED*** padding = 0; ***REMOVED***

    var bounds = this.getBounds();

    bounds.width += padding;
    bounds.height += padding;
   
    var canvasBuffer = new PIXI.CanvasBuffer(bounds.width * resolution, bounds.height * resolution);
    
    var texture = PIXI.Texture.fromCanvas(canvasBuffer.canvas, scaleMode);

    texture.baseTexture.resolution = resolution;

    canvasBuffer.context.scale(resolution, resolution);

    canvasBuffer.context.translate(-bounds.x, -bounds.y);

    PIXI.CanvasGraphics.renderGraphics(this, canvasBuffer.context);

    return texture;
***REMOVED***;

/**
* Renders the object using the WebGL renderer
*
* @method _renderWebGL
* @param renderSession ***REMOVED***RenderSession***REMOVED*** 
* @private
*/
PIXI.Graphics.prototype._renderWebGL = function(renderSession)
***REMOVED***
    // if the sprite is not visible or the alpha is 0 then no need to render this element
    if (this.visible === false || this.alpha === 0 || this.isMask === true) return;

    if (this._cacheAsBitmap)
    ***REMOVED***
        if (this.dirty || this.cachedSpriteDirty)
        ***REMOVED***
            this._generateCachedSprite();
   
            // we will also need to update the texture on the gpu too!
            this.updateCachedSpriteTexture();

            this.cachedSpriteDirty = false;
            this.dirty = false;
        ***REMOVED***

        this._cachedSprite.worldAlpha = this.worldAlpha;

        PIXI.Sprite.prototype._renderWebGL.call(this._cachedSprite, renderSession);

        return;
    ***REMOVED***
    else
    ***REMOVED***
        renderSession.spriteBatch.stop();
        renderSession.blendModeManager.setBlendMode(this.blendMode);

        if (this._mask) renderSession.maskManager.pushMask(this._mask, renderSession);
        if (this._filters) renderSession.filterManager.pushFilter(this._filterBlock);
      
        // check blend mode
        if (this.blendMode !== renderSession.spriteBatch.currentBlendMode)
        ***REMOVED***
            renderSession.spriteBatch.currentBlendMode = this.blendMode;
            var blendModeWebGL = PIXI.blendModesWebGL[renderSession.spriteBatch.currentBlendMode];
            renderSession.spriteBatch.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
        ***REMOVED***
        
        // check if the webgl graphic needs to be updated
        if (this.webGLDirty)
        ***REMOVED***
            this.dirty = true;
            this.webGLDirty = false;
        ***REMOVED***
        
        PIXI.WebGLGraphics.renderGraphics(this, renderSession);
        
        // only render if it has children!
        if (this.children.length)
        ***REMOVED***
            renderSession.spriteBatch.start();

            // simple render children!
            for (var i = 0; i < this.children.length; i++)
            ***REMOVED***
                this.children[i]._renderWebGL(renderSession);
            ***REMOVED***

            renderSession.spriteBatch.stop();
        ***REMOVED***

        if (this._filters) renderSession.filterManager.popFilter();
        if (this._mask) renderSession.maskManager.popMask(this.mask, renderSession);
          
        renderSession.drawCount++;

        renderSession.spriteBatch.start();
    ***REMOVED***
***REMOVED***;

/**
* Renders the object using the Canvas renderer
*
* @method _renderCanvas
* @param renderSession ***REMOVED***RenderSession***REMOVED*** 
* @private
*/
PIXI.Graphics.prototype._renderCanvas = function(renderSession)
***REMOVED***
    // if the sprite is not visible or the alpha is 0 then no need to render this element
    if (this.visible === false || this.alpha === 0 || this.isMask === true) return;

    // if the tint has changed, set the graphics object to dirty.
    if (this._prevTint !== this.tint) ***REMOVED***
        this.dirty = true;
        this._prevTint = this.tint;
    ***REMOVED***

    if (this._cacheAsBitmap)
    ***REMOVED***
        if (this.dirty || this.cachedSpriteDirty)
        ***REMOVED***
            this._generateCachedSprite();
   
            // we will also need to update the texture
            this.updateCachedSpriteTexture();

            this.cachedSpriteDirty = false;
            this.dirty = false;
        ***REMOVED***

        this._cachedSprite.alpha = this.alpha;

        PIXI.Sprite.prototype._renderCanvas.call(this._cachedSprite, renderSession);

        return;
    ***REMOVED***
    else
    ***REMOVED***
        var context = renderSession.context;
        var transform = this.worldTransform;
        
        if (this.blendMode !== renderSession.currentBlendMode)
        ***REMOVED***
            renderSession.currentBlendMode = this.blendMode;
            context.globalCompositeOperation = PIXI.blendModesCanvas[renderSession.currentBlendMode];
        ***REMOVED***

        if (this._mask)
        ***REMOVED***
            renderSession.maskManager.pushMask(this._mask, renderSession);
        ***REMOVED***

        var resolution = renderSession.resolution;
        var tx = (transform.tx * renderSession.resolution) + renderSession.shakeX;
        var ty = (transform.ty * renderSession.resolution) + renderSession.shakeY;

        context.setTransform(transform.a * resolution,
                             transform.b * resolution,
                             transform.c * resolution,
                             transform.d * resolution,
                             tx,
                             ty);

        PIXI.CanvasGraphics.renderGraphics(this, context);

         // simple render children!
        for (var i = 0; i < this.children.length; i++)
        ***REMOVED***
            this.children[i]._renderCanvas(renderSession);
        ***REMOVED***

        if (this._mask)
        ***REMOVED***
            renderSession.maskManager.popMask(renderSession);
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

/**
 * Retrieves the bounds of the graphic shape as a rectangle object
 *
 * @method getBounds
 * @return ***REMOVED***Rectangle***REMOVED*** the rectangular bounding area
 */
PIXI.Graphics.prototype.getBounds = function(matrix)
***REMOVED***
    if (!this._currentBounds)
    ***REMOVED***
        //  Return an empty object if the item is a mask!
        if (!this.renderable)
        ***REMOVED***
            return PIXI.EmptyRectangle;
        ***REMOVED***

        if (this.dirty)
        ***REMOVED***
            this.updateLocalBounds();
            this.webGLDirty = true;
            this.cachedSpriteDirty = true;
            this.dirty = false;
        ***REMOVED***

        var bounds = this._localBounds;

        var w0 = bounds.x;
        var w1 = bounds.width + bounds.x;

        var h0 = bounds.y;
        var h1 = bounds.height + bounds.y;

        var worldTransform = matrix || this.worldTransform;

        var a = worldTransform.a;
        var b = worldTransform.b;
        var c = worldTransform.c;
        var d = worldTransform.d;
        var tx = worldTransform.tx;
        var ty = worldTransform.ty;

        var x1 = a * w1 + c * h1 + tx;
        var y1 = d * h1 + b * w1 + ty;

        var x2 = a * w0 + c * h1 + tx;
        var y2 = d * h1 + b * w0 + ty;

        var x3 = a * w0 + c * h0 + tx;
        var y3 = d * h0 + b * w0 + ty;

        var x4 =  a * w1 + c * h0 + tx;
        var y4 =  d * h0 + b * w1 + ty;

        var maxX = x1;
        var maxY = y1;

        var minX = x1;
        var minY = y1;

        minX = x2 < minX ? x2 : minX;
        minX = x3 < minX ? x3 : minX;
        minX = x4 < minX ? x4 : minX;

        minY = y2 < minY ? y2 : minY;
        minY = y3 < minY ? y3 : minY;
        minY = y4 < minY ? y4 : minY;

        maxX = x2 > maxX ? x2 : maxX;
        maxX = x3 > maxX ? x3 : maxX;
        maxX = x4 > maxX ? x4 : maxX;

        maxY = y2 > maxY ? y2 : maxY;
        maxY = y3 > maxY ? y3 : maxY;
        maxY = y4 > maxY ? y4 : maxY;

        this._bounds.x = minX;
        this._bounds.width = maxX - minX;

        this._bounds.y = minY;
        this._bounds.height = maxY - minY;

        this._currentBounds = this._bounds;
    ***REMOVED***

    return this._currentBounds;

***REMOVED***;

/**
 * Retrieves the non-global local bounds of the graphic shape as a rectangle. The calculation takes all visible children into consideration.
 *
 * @method getLocalBounds
 * @return ***REMOVED***Rectangle***REMOVED*** The rectangular bounding area
 */
PIXI.Graphics.prototype.getLocalBounds = function () ***REMOVED***
    var matrixCache = this.worldTransform;

    this.worldTransform = PIXI.identityMatrix;

    for (var i = 0; i < this.children.length; i++) ***REMOVED***
        this.children[i].updateTransform();
    ***REMOVED***

    var bounds = this.getBounds();

    this.worldTransform = matrixCache;

    for (i = 0; i < this.children.length; i++) ***REMOVED***
        this.children[i].updateTransform();
    ***REMOVED***

    return bounds;
***REMOVED***;

/**
* Tests if a point is inside this graphics object
*
* @param point ***REMOVED***Point***REMOVED*** the point to test
* @return ***REMOVED***boolean***REMOVED*** the result of the test
*/
PIXI.Graphics.prototype.containsPoint = function( point )
***REMOVED***
    this.worldTransform.applyInverse(point,  tempPoint);

    var graphicsData = this.graphicsData;

    for (var i = 0; i < graphicsData.length; i++)
    ***REMOVED***
        var data = graphicsData[i];

        if (!data.fill)
        ***REMOVED***
            continue;
        ***REMOVED***

        // only deal with fills..
        if (data.shape)
        ***REMOVED***
            if (data.shape.contains(tempPoint.x, tempPoint.y))
            ***REMOVED***
                return true;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

    return false;

***REMOVED***;

/**
 * Update the bounds of the object
 *
 * @method updateLocalBounds
 */
PIXI.Graphics.prototype.updateLocalBounds = function()
***REMOVED***
    var minX = Infinity;
    var maxX = -Infinity;

    var minY = Infinity;
    var maxY = -Infinity;

    if (this.graphicsData.length)
    ***REMOVED***
        var shape, points, x, y, w, h;

        for (var i = 0; i < this.graphicsData.length; i++)
        ***REMOVED***
            var data = this.graphicsData[i];
            var type = data.type;
            var lineWidth = data.lineWidth;
            shape = data.shape;

            if (type === PIXI.Graphics.RECT || type === PIXI.Graphics.RREC)
            ***REMOVED***
                x = shape.x - lineWidth / 2;
                y = shape.y - lineWidth / 2;
                w = shape.width + lineWidth;
                h = shape.height + lineWidth;

                minX = x < minX ? x : minX;
                maxX = x + w > maxX ? x + w : maxX;

                minY = y < minY ? y : minY;
                maxY = y + h > maxY ? y + h : maxY;
            ***REMOVED***
            else if (type === PIXI.Graphics.CIRC)
            ***REMOVED***
                x = shape.x;
                y = shape.y;
                w = shape.radius + lineWidth / 2;
                h = shape.radius + lineWidth / 2;

                minX = x - w < minX ? x - w : minX;
                maxX = x + w > maxX ? x + w : maxX;

                minY = y - h < minY ? y - h : minY;
                maxY = y + h > maxY ? y + h : maxY;
            ***REMOVED***
            else if (type === PIXI.Graphics.ELIP)
            ***REMOVED***
                x = shape.x;
                y = shape.y;
                w = shape.width + lineWidth / 2;
                h = shape.height + lineWidth / 2;

                minX = x - w < minX ? x - w : minX;
                maxX = x + w > maxX ? x + w : maxX;

                minY = y - h < minY ? y - h : minY;
                maxY = y + h > maxY ? y + h : maxY;
            ***REMOVED***
            else
            ***REMOVED***
                // POLY - assumes points are sequential, not Point objects
                points = shape.points;

                for (var j = 0; j < points.length; j++)
                ***REMOVED***
                    if (points[j] instanceof Phaser.Point)
                    ***REMOVED***
                        x = points[j].x;
                        y = points[j].y;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        x = points[j];
                        y = points[j + 1];

                        if (j < points.length - 1)
                        ***REMOVED***
                            j++;
                        ***REMOVED***
                    ***REMOVED***

                    minX = x - lineWidth < minX ? x - lineWidth : minX;
                    maxX = x + lineWidth > maxX ? x + lineWidth : maxX;

                    minY = y - lineWidth < minY ? y - lineWidth : minY;
                    maxY = y + lineWidth > maxY ? y + lineWidth : maxY;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
    else
    ***REMOVED***
        minX = 0;
        maxX = 0;
        minY = 0;
        maxY = 0;
    ***REMOVED***

    var padding = this.boundsPadding;
    
    this._localBounds.x = minX - padding;
    this._localBounds.width = (maxX - minX) + padding * 2;

    this._localBounds.y = minY - padding;
    this._localBounds.height = (maxY - minY) + padding * 2;
***REMOVED***;

/**
 * Generates the cached sprite when the sprite has cacheAsBitmap = true
 *
 * @method _generateCachedSprite
 * @private
 */
PIXI.Graphics.prototype._generateCachedSprite = function()
***REMOVED***
    var bounds = this.getLocalBounds();

    if (!this._cachedSprite)
    ***REMOVED***
        var canvasBuffer = new PIXI.CanvasBuffer(bounds.width, bounds.height);
        var texture = PIXI.Texture.fromCanvas(canvasBuffer.canvas);
        
        this._cachedSprite = new PIXI.Sprite(texture);
        this._cachedSprite.buffer = canvasBuffer;

        this._cachedSprite.worldTransform = this.worldTransform;
    ***REMOVED***
    else
    ***REMOVED***
        this._cachedSprite.buffer.resize(bounds.width, bounds.height);
    ***REMOVED***

    // leverage the anchor to account for the offset of the element
    this._cachedSprite.anchor.x = -(bounds.x / bounds.width);
    this._cachedSprite.anchor.y = -(bounds.y / bounds.height);

    // this._cachedSprite.buffer.context.save();
    this._cachedSprite.buffer.context.translate(-bounds.x, -bounds.y);
    
    // make sure we set the alpha of the graphics to 1 for the render.. 
    this.worldAlpha = 1;

    // now render the graphic..
    PIXI.CanvasGraphics.renderGraphics(this, this._cachedSprite.buffer.context);
    this._cachedSprite.alpha = this.alpha;
***REMOVED***;

/**
 * Updates texture size based on canvas size
 *
 * @method updateCachedSpriteTexture
 * @private
 */
PIXI.Graphics.prototype.updateCachedSpriteTexture = function()
***REMOVED***
    var cachedSprite = this._cachedSprite;
    var texture = cachedSprite.texture;
    var canvas = cachedSprite.buffer.canvas;

    texture.baseTexture.width = canvas.width;
    texture.baseTexture.height = canvas.height;
    texture.crop.width = texture.frame.width = canvas.width;
    texture.crop.height = texture.frame.height = canvas.height;

    cachedSprite._width = canvas.width;
    cachedSprite._height = canvas.height;

    // update the dirty base textures
    texture.baseTexture.dirty();
***REMOVED***;

/**
 * Destroys a previous cached sprite.
 *
 * @method destroyCachedSprite
 */
PIXI.Graphics.prototype.destroyCachedSprite = function()
***REMOVED***
    this._cachedSprite.texture.destroy(true);
    this._cachedSprite = null;
***REMOVED***;

/**
 * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
 *
 * @method drawShape
 * @param ***REMOVED***Circle|Rectangle|Ellipse|Line|Polygon***REMOVED*** shape The Shape object to draw.
 * @return ***REMOVED***GraphicsData***REMOVED*** The generated GraphicsData object.
 */
PIXI.Graphics.prototype.drawShape = function(shape)
***REMOVED***
    if (this.currentPath)
    ***REMOVED***
        // check current path!
        if (this.currentPath.shape.points.length <= 2)
        ***REMOVED***
            this.graphicsData.pop();
        ***REMOVED***
    ***REMOVED***

    this.currentPath = null;

    //  Handle mixed-type polygons
    if (shape instanceof Phaser.Polygon)
    ***REMOVED***
        shape = shape.clone();
        shape.flatten();
    ***REMOVED***

    var data = new PIXI.GraphicsData(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.filling, shape);
    
    this.graphicsData.push(data);

    if (data.type === PIXI.Graphics.POLY)
    ***REMOVED***
        data.shape.closed = this.filling;
        this.currentPath = data;
    ***REMOVED***

    this.dirty = true;
    this._boundsDirty = true;

    return data;

***REMOVED***;

/**
 * When cacheAsBitmap is set to true the graphics object will be rendered as if it was a sprite.
 * This is useful if your graphics element does not change often, as it will speed up the rendering of the object in exchange for taking up texture memory.
 * It is also useful if you need the graphics object to be anti-aliased, because it will be rendered using canvas.
 * This is not recommended if you are constantly redrawing the graphics element.
 *
 * @property cacheAsBitmap
 * @type Boolean
 * @default false
 * @private
 */
Object.defineProperty(PIXI.Graphics.prototype, "cacheAsBitmap", ***REMOVED***

    get: function() ***REMOVED***
        return  this._cacheAsBitmap;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        this._cacheAsBitmap = value;

        if (this._cacheAsBitmap)
        ***REMOVED***
            this._generateCachedSprite();
        ***REMOVED***
        else
        ***REMOVED***
            this.destroyCachedSprite();
        ***REMOVED***

        this.dirty = true;
        this.webGLDirty = true;

    ***REMOVED***
***REMOVED***);
