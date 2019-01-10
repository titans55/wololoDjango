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

/**
 * A GraphicsData object.
 * 
 * @class GraphicsData
 * @constructor
PIXI.GraphicsData = function(lineWidth, lineColor, lineAlpha, fillColor, fillAlpha, fill, shape)
***REMOVED***
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;
    this.lineAlpha = lineAlpha;
    this._lineTint = lineColor;

    this.fillColor = fillColor;
    this.fillAlpha = fillAlpha;
    this._fillTint = fillColor;
    this.fill = fill;

    this.shape = shape;
    this.type = shape.type;
***REMOVED***;
 */

/**
 * A GraphicsData object.
 *
 * @class
 * @memberof PIXI
 * @param lineWidth ***REMOVED***number***REMOVED*** the width of the line to draw
 * @param lineColor ***REMOVED***number***REMOVED*** the color of the line to draw
 * @param lineAlpha ***REMOVED***number***REMOVED*** the alpha of the line to draw
 * @param fillColor ***REMOVED***number***REMOVED*** the color of the fill
 * @param fillAlpha ***REMOVED***number***REMOVED*** the alpha of the fill
 * @param fill      ***REMOVED***boolean***REMOVED*** whether or not the shape is filled with a colour
 * @param shape     ***REMOVED***Circle|Rectangle|Ellipse|Line|Polygon***REMOVED*** The shape object to draw.
 */

PIXI.GraphicsData = function(lineWidth, lineColor, lineAlpha, fillColor, fillAlpha, fill, shape) ***REMOVED***

    /*
     * @member ***REMOVED***number***REMOVED*** the width of the line to draw
     */
    this.lineWidth = lineWidth;

    /*
     * @member ***REMOVED***number***REMOVED*** the color of the line to draw
     */
    this.lineColor = lineColor;

    /*
     * @member ***REMOVED***number***REMOVED*** the alpha of the line to draw
     */
    this.lineAlpha = lineAlpha;

    /*
     * @member ***REMOVED***number***REMOVED*** cached tint of the line to draw
     */
    this._lineTint = lineColor;

    /*
     * @member ***REMOVED***number***REMOVED*** the color of the fill
     */
    this.fillColor = fillColor;

    /*
     * @member ***REMOVED***number***REMOVED*** the alpha of the fill
     */
    this.fillAlpha = fillAlpha;

    /*
     * @member ***REMOVED***number***REMOVED*** cached tint of the fill
     */
    this._fillTint = fillColor;

    /*
     * @member ***REMOVED***boolean***REMOVED*** whether or not the shape is filled with a color
     */
    this.fill = fill;

    /*
     * @member ***REMOVED***Circle|Rectangle|Ellipse|Line|Polygon***REMOVED*** The shape object to draw.
     */
    this.shape = shape;

    /*
     * @member ***REMOVED***number***REMOVED*** The type of the shape, see the Const.Shapes file for all the existing types,
     */
    this.type = shape.type;

***REMOVED***;

PIXI.GraphicsData.prototype.constructor = PIXI.GraphicsData;

/**
 * Creates a new GraphicsData object with the same values as this one.
 *
 * @return ***REMOVED***GraphicsData***REMOVED***
 */
PIXI.GraphicsData.prototype.clone = function() ***REMOVED***

    return new GraphicsData(
        this.lineWidth,
        this.lineColor,
        this.lineAlpha,
        this.fillColor,
        this.fillAlpha,
        this.fill,
        this.shape
    );

***REMOVED***;
/*
Copyright (c) 2016, Mapbox

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
*/

/**
* @class EarCut
*/
PIXI.EarCut = ***REMOVED******REMOVED***;

PIXI.EarCut.Triangulate = function (data, holeIndices, dim) ***REMOVED***

    dim = dim || 2;

    var hasHoles = holeIndices && holeIndices.length,
        outerLen = hasHoles ? holeIndices[0] * dim : data.length,
        outerNode = PIXI.EarCut.linkedList(data, 0, outerLen, dim, true),
        triangles = [];

    if (!outerNode) return triangles;

    var minX, minY, maxX, maxY, x, y, size;

    if (hasHoles) outerNode = PIXI.EarCut.eliminateHoles(data, holeIndices, outerNode, dim);

    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
    if (data.length > 80 * dim) ***REMOVED***
        minX = maxX = data[0];
        minY = maxY = data[1];

        for (var i = dim; i < outerLen; i += dim) ***REMOVED***
            x = data[i];
            y = data[i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        ***REMOVED***

        // minX, minY and size are later used to transform coords into integers for z-order calculation
        size = Math.max(maxX - minX, maxY - minY);
    ***REMOVED***

    PIXI.EarCut.earcutLinked(outerNode, triangles, dim, minX, minY, size);

    return triangles;
***REMOVED***

// create a circular doubly linked list from polygon points in the specified winding order

PIXI.EarCut.linkedList = function (data, start, end, dim, clockwise) ***REMOVED***
    var sum = 0,
        i, j, last;

    // calculate original winding order of a polygon ring
    for (i = start, j = end - dim; i < end; i += dim) ***REMOVED***
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
    ***REMOVED***

    // link points into circular doubly-linked list in the specified winding order
    if (clockwise === (sum > 0)) ***REMOVED***
        for (i = start; i < end; i += dim) last = PIXI.EarCut.insertNode(i, data[i], data[i + 1], last);
    ***REMOVED*** else ***REMOVED***
        for (i = end - dim; i >= start; i -= dim) last = PIXI.EarCut.insertNode(i, data[i], data[i + 1], last);
    ***REMOVED***

    return last;
***REMOVED***

// eliminate colinear or duplicate points

PIXI.EarCut.filterPoints = function (start, end) ***REMOVED***
    if (!start) return start;
    if (!end) end = start;

    var p = start,
        again;
    do ***REMOVED***
        again = false;

        if (!p.steiner && (PIXI.EarCut.equals(p, p.next) || PIXI.EarCut.area(p.prev, p, p.next) === 0)) ***REMOVED***
            PIXI.EarCut.removeNode(p);
            p = end = p.prev;
            if (p === p.next) return null;
            again = true;

        ***REMOVED*** else ***REMOVED***
            p = p.next;
        ***REMOVED***
    ***REMOVED*** while (again || p !== end);

    return end;
***REMOVED***

// main ear slicing loop which triangulates a polygon (given as a linked list)

PIXI.EarCut.earcutLinked = function (ear, triangles, dim, minX, minY, size, pass) ***REMOVED***
    if (!ear) return;

    // interlink polygon nodes in z-order
    if (!pass && size) PIXI.EarCut.indexCurve(ear, minX, minY, size);

    var stop = ear,
        prev, next;

    // iterate through ears, slicing them one by one
    while (ear.prev !== ear.next) ***REMOVED***
        prev = ear.prev;
        next = ear.next;

        if (size ? PIXI.EarCut.isEarHashed(ear, minX, minY, size) : PIXI.EarCut.isEar(ear)) ***REMOVED***
            // cut off the triangle
            triangles.push(prev.i / dim);
            triangles.push(ear.i / dim);
            triangles.push(next.i / dim);

            PIXI.EarCut.removeNode(ear);

            // skipping the next vertice leads to less sliver triangles
            ear = next.next;
            stop = next.next;

            continue;
        ***REMOVED***

        ear = next;

        // if we looped through the whole remaining polygon and can't find any more ears
        if (ear === stop) ***REMOVED***
            // try filtering points and slicing again
            if (!pass) ***REMOVED***
                PIXI.EarCut.earcutLinked(PIXI.EarCut.filterPoints(ear), triangles, dim, minX, minY, size, 1);

                // if this didn't work, try curing all small self-intersections locally
            ***REMOVED*** else if (pass === 1) ***REMOVED***
                ear = PIXI.EarCut.cureLocalIntersections(ear, triangles, dim);
                PIXI.EarCut.earcutLinked(ear, triangles, dim, minX, minY, size, 2);

                // as a last resort, try splitting the remaining polygon into two
            ***REMOVED*** else if (pass === 2) ***REMOVED***
                PIXI.EarCut.splitEarcut(ear, triangles, dim, minX, minY, size);
            ***REMOVED***

            break;
        ***REMOVED***
    ***REMOVED***
***REMOVED***

// check whether a polygon node forms a valid ear with adjacent nodes

PIXI.EarCut.isEar = function (ear) ***REMOVED***
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (PIXI.EarCut.area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // now make sure we don't have other points inside the potential ear
    var p = ear.next.next;

    while (p !== ear.prev) ***REMOVED***
        if (PIXI.EarCut.pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            PIXI.EarCut.area(p.prev, p, p.next) >= 0) return false;
        p = p.next;
    ***REMOVED***

    return true;
***REMOVED***

PIXI.EarCut.isEarHashed = function (ear, minX, minY, size) ***REMOVED***
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (PIXI.EarCut.area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // triangle bbox; min & max are calculated like this for speed
    var minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : (b.x < c.x ? b.x : c.x),
        minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : (b.y < c.y ? b.y : c.y),
        maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : (b.x > c.x ? b.x : c.x),
        maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : (b.y > c.y ? b.y : c.y);

    // z-order range for the current triangle bbox;
    var minZ = PIXI.EarCut.zOrder(minTX, minTY, minX, minY, size),
        maxZ = PIXI.EarCut.zOrder(maxTX, maxTY, minX, minY, size);

    // first look for points inside the triangle in increasing z-order
    var p = ear.nextZ;

    while (p && p.z <= maxZ) ***REMOVED***
        if (p !== ear.prev && p !== ear.next &&
            PIXI.EarCut.pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            PIXI.EarCut.area(p.prev, p, p.next) >= 0) return false;
        p = p.nextZ;
    ***REMOVED***

    // then look for points in decreasing z-order
    p = ear.prevZ;

    while (p && p.z >= minZ) ***REMOVED***
        if (p !== ear.prev && p !== ear.next &&
            PIXI.EarCut.pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            PIXI.EarCut.area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
    ***REMOVED***

    return true;
***REMOVED***

// go through all polygon nodes and cure small local self-intersections

PIXI.EarCut.cureLocalIntersections = function (start, triangles, dim) ***REMOVED***
    var p = start;
    do ***REMOVED***
        var a = p.prev,
            b = p.next.next;

        // a self-intersection where edge (v[i-1],v[i]) intersects (v[i+1],v[i+2])
        if (PIXI.EarCut.intersects(a, p, p.next, b) && PIXI.EarCut.locallyInside(a, b) && PIXI.EarCut.locallyInside(b, a)) ***REMOVED***

            triangles.push(a.i / dim);
            triangles.push(p.i / dim);
            triangles.push(b.i / dim);

            // remove two nodes involved
            PIXI.EarCut.removeNode(p);
            PIXI.EarCut.removeNode(p.next);

            p = start = b;
        ***REMOVED***
        p = p.next;
    ***REMOVED*** while (p !== start);

    return p;
***REMOVED***

// try splitting polygon into two and triangulate them independently

PIXI.EarCut.splitEarcut = function (start, triangles, dim, minX, minY, size) ***REMOVED***
    // look for a valid diagonal that divides the polygon into two
    var a = start;
    do ***REMOVED***
        var b = a.next.next;
        while (b !== a.prev) ***REMOVED***
            if (a.i !== b.i && PIXI.EarCut.isValidDiagonal(a, b)) ***REMOVED***
                // split the polygon in two by the diagonal
                var c = PIXI.EarCut.splitPolygon(a, b);

                // filter colinear points around the cuts
                a = PIXI.EarCut.filterPoints(a, a.next);
                c = PIXI.EarCut.filterPoints(c, c.next);

                // run earcut on each half
                PIXI.EarCut.earcutLinked(a, triangles, dim, minX, minY, size);
                PIXI.EarCut.earcutLinked(c, triangles, dim, minX, minY, size);
                return;
            ***REMOVED***
            b = b.next;
        ***REMOVED***
        a = a.next;
    ***REMOVED*** while (a !== start);
***REMOVED***

// link every hole into the outer loop, producing a single-ring polygon without holes

PIXI.EarCut.eliminateHoles = function (data, holeIndices, outerNode, dim) ***REMOVED***
    var queue = [],
        i, len, start, end, list;

    for (i = 0, len = holeIndices.length; i < len; i++) ***REMOVED***
        start = holeIndices[i] * dim;
        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        list = PIXI.EarCut.linkedList(data, start, end, dim, false);
        if (list === list.next) list.steiner = true;
        queue.push(PIXI.EarCut.getLeftmost(list));
    ***REMOVED***

    queue.sort(compareX);

    // process holes from left to right
    for (i = 0; i < queue.length; i++) ***REMOVED***
        PIXI.EarCut.eliminateHole(queue[i], outerNode);
        outerNode = PIXI.EarCut.filterPoints(outerNode, outerNode.next);
    ***REMOVED***

    return outerNode;
***REMOVED***

PIXI.EarCut.compareX = function (a, b) ***REMOVED***
    return a.x - b.x;
***REMOVED***

// find a bridge between vertices that connects hole with an outer ring and and link it

PIXI.EarCut.eliminateHole = function (hole, outerNode) ***REMOVED***
    outerNode = PIXI.EarCut.findHoleBridge(hole, outerNode);
    if (outerNode) ***REMOVED***
        var b = PIXI.EarCut.splitPolygon(outerNode, hole);
        PIXI.EarCut.filterPoints(b, b.next);
    ***REMOVED***
***REMOVED***

// David Eberly's algorithm for finding a bridge between hole and outer polygon

PIXI.EarCut.findHoleBridge = function (hole, outerNode) ***REMOVED***
    var p = outerNode,
        hx = hole.x,
        hy = hole.y,
        qx = -Infinity,
        m;

    // find a segment intersected by a ray from the hole's leftmost point to the left;
    // segment's endpoint with lesser x will be potential connection point
    do ***REMOVED***
        if (hy <= p.y && hy >= p.next.y) ***REMOVED***
            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
            if (x <= hx && x > qx) ***REMOVED***
                qx = x;
                m = p.x < p.next.x ? p : p.next;
            ***REMOVED***
        ***REMOVED***
        p = p.next;
    ***REMOVED*** while (p !== outerNode);

    if (!m) return null;

    if (hole.x === m.x) return m.prev; // hole touches outer segment; pick lower endpoint

    // look for points inside the triangle of hole point, segment intersection and endpoint;
    // if there are no points found, we have a valid connection;
    // otherwise choose the point of the minimum angle with the ray as connection point

    var stop = m,
        tanMin = Infinity,
        tan;

    p = m.next;

    while (p !== stop) ***REMOVED***
        if (hx >= p.x && p.x >= m.x &&
            PIXI.EarCut.pointInTriangle(hy < m.y ? hx : qx, hy, m.x, m.y, hy < m.y ? qx : hx, hy, p.x, p.y)) ***REMOVED***

            tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

            if ((tan < tanMin || (tan === tanMin && p.x > m.x)) && PIXI.EarCut.locallyInside(p, hole)) ***REMOVED***
                m = p;
                tanMin = tan;
            ***REMOVED***
        ***REMOVED***

        p = p.next;
    ***REMOVED***

    return m;
***REMOVED***

// interlink polygon nodes in z-order

PIXI.EarCut.indexCurve = function (start, minX, minY, size) ***REMOVED***
    var p = start;
    do ***REMOVED***
        if (p.z === null) p.z = PIXI.EarCut.zOrder(p.x, p.y, minX, minY, size);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
    ***REMOVED*** while (p !== start);

    p.prevZ.nextZ = null;
    p.prevZ = null;

    PIXI.EarCut.sortLinked(p);
***REMOVED***

// Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html

PIXI.EarCut.sortLinked = function (list) ***REMOVED***
    var i, p, q, e, tail, numMerges, pSize, qSize,
        inSize = 1;

    do ***REMOVED***
        p = list;
        list = null;
        tail = null;
        numMerges = 0;

        while (p) ***REMOVED***
            numMerges++;
            q = p;
            pSize = 0;
            for (i = 0; i < inSize; i++) ***REMOVED***
                pSize++;
                q = q.nextZ;
                if (!q) break;
            ***REMOVED***

            qSize = inSize;

            while (pSize > 0 || (qSize > 0 && q)) ***REMOVED***

                if (pSize === 0) ***REMOVED***
                    e = q;
                    q = q.nextZ;
                    qSize--;
                ***REMOVED*** else if (qSize === 0 || !q) ***REMOVED***
                    e = p;
                    p = p.nextZ;
                    pSize--;
                ***REMOVED*** else if (p.z <= q.z) ***REMOVED***
                    e = p;
                    p = p.nextZ;
                    pSize--;
                ***REMOVED*** else ***REMOVED***
                    e = q;
                    q = q.nextZ;
                    qSize--;
                ***REMOVED***

                if (tail) tail.nextZ = e;
                else list = e;

                e.prevZ = tail;
                tail = e;
            ***REMOVED***

            p = q;
        ***REMOVED***

        tail.nextZ = null;
        inSize *= 2;

    ***REMOVED*** while (numMerges > 1);

    return list;
***REMOVED***

// z-order of a point given coords and size of the data bounding box

PIXI.EarCut.zOrder = function (x, y, minX, minY, size) ***REMOVED***
    // coords are transformed into non-negative 15-bit integer range
    x = 32767 * (x - minX) / size;
    y = 32767 * (y - minY) / size;

    x = (x | (x << 8)) & 0x00FF00FF;
    x = (x | (x << 4)) & 0x0F0F0F0F;
    x = (x | (x << 2)) & 0x33333333;
    x = (x | (x << 1)) & 0x55555555;

    y = (y | (y << 8)) & 0x00FF00FF;
    y = (y | (y << 4)) & 0x0F0F0F0F;
    y = (y | (y << 2)) & 0x33333333;
    y = (y | (y << 1)) & 0x55555555;

    return x | (y << 1);
***REMOVED***

// find the leftmost node of a polygon ring

PIXI.EarCut.getLeftmost = function (start) ***REMOVED***
    var p = start,
        leftmost = start;
    do ***REMOVED***
        if (p.x < leftmost.x) leftmost = p;
        p = p.next;
    ***REMOVED*** while (p !== start);

    return leftmost;
***REMOVED***

// check if a point lies within a convex triangle

PIXI.EarCut.pointInTriangle = function (ax, ay, bx, by, cx, cy, px, py) ***REMOVED***
    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
        (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
        (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
***REMOVED***

// check if a diagonal between two polygon nodes is valid (lies in polygon interior)

PIXI.EarCut.isValidDiagonal = function (a, b) ***REMOVED***
    return PIXI.EarCut.equals(a, b) || a.next.i !== b.i && a.prev.i !== b.i && !PIXI.EarCut.intersectsPolygon(a, b) &&
        PIXI.EarCut.locallyInside(a, b) && PIXI.EarCut.locallyInside(b, a) && PIXI.EarCut.middleInside(a, b);
***REMOVED***

// signed area of a triangle

PIXI.EarCut.area = function (p, q, r) ***REMOVED***
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
***REMOVED***

// check if two points are equal

PIXI.EarCut.equals = function (p1, p2) ***REMOVED***
    return p1.x === p2.x && p1.y === p2.y;
***REMOVED***

// check if two segments intersect

PIXI.EarCut.intersects = function (p1, q1, p2, q2) ***REMOVED***
    return PIXI.EarCut.area(p1, q1, p2) > 0 !== PIXI.EarCut.area(p1, q1, q2) > 0 &&
        PIXI.EarCut.area(p2, q2, p1) > 0 !== PIXI.EarCut.area(p2, q2, q1) > 0;
***REMOVED***

// check if a polygon diagonal intersects any polygon segments

PIXI.EarCut.intersectsPolygon = function (a, b) ***REMOVED***
    var p = a;
    do ***REMOVED***
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
            PIXI.EarCut.intersects(p, p.next, a, b)) return true;
        p = p.next;
    ***REMOVED*** while (p !== a);

    return false;
***REMOVED***

// check if a polygon diagonal is locally inside the polygon

PIXI.EarCut.locallyInside = function (a, b) ***REMOVED***
    return PIXI.EarCut.area(a.prev, a, a.next) < 0 ?
        PIXI.EarCut.area(a, b, a.next) >= 0 && PIXI.EarCut.area(a, a.prev, b) >= 0 :
        PIXI.EarCut.area(a, b, a.prev) < 0 || PIXI.EarCut.area(a, a.next, b) < 0;
***REMOVED***

// check if the middle point of a polygon diagonal is inside the polygon

PIXI.EarCut.middleInside = function (a, b) ***REMOVED***
    var p = a,
        inside = false,
        px = (a.x + b.x) / 2,
        py = (a.y + b.y) / 2;
    do ***REMOVED***
        if (((p.y > py) !== (p.next.y > py)) && (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
            inside = !inside;
        p = p.next;
    ***REMOVED*** while (p !== a);

    return inside;
***REMOVED***

// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring

PIXI.EarCut.splitPolygon = function (a, b) ***REMOVED***
    var a2 = new PIXI.EarCut.Node(a.i, a.x, a.y),
        b2 = new PIXI.EarCut.Node(b.i, b.x, b.y),
        an = a.next,
        bp = b.prev;

    a.next = b;
    b.prev = a;

    a2.next = an;
    an.prev = a2;

    b2.next = a2;
    a2.prev = b2;

    bp.next = b2;
    b2.prev = bp;

    return b2;
***REMOVED***

// create a node and optionally link it with previous one (in a circular doubly linked list)

PIXI.EarCut.insertNode = function (i, x, y, last) ***REMOVED***
    var p = new PIXI.EarCut.Node(i, x, y);

    if (!last) ***REMOVED***
        p.prev = p;
        p.next = p;

    ***REMOVED*** else ***REMOVED***
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
    ***REMOVED***
    return p;
***REMOVED***

PIXI.EarCut.removeNode = function (p) ***REMOVED***
    p.next.prev = p.prev;
    p.prev.next = p.next;

    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
***REMOVED***

PIXI.EarCut.Node = function (i, x, y) ***REMOVED***
    // vertice index in coordinates array
    this.i = i;

    // vertex coordinates
    this.x = x;
    this.y = y;

    // previous and next vertice nodes in a polygon ring
    this.prev = null;
    this.next = null;

    // z-order curve value
    this.z = null;

    // previous and next nodes in z-order
    this.prevZ = null;
    this.nextZ = null;

    // indicates whether this is a steiner point
    this.steiner = false;
***REMOVED***

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A set of functions used by the webGL renderer to draw the primitive graphics data
 *
 * @class WebGLGraphics
 * @private
 * @static
 */
PIXI.WebGLGraphics = function()
***REMOVED***
***REMOVED***;

/**
 * The number of points beyond which Pixi swaps to using the Stencil Buffer to render the Graphics.
 *
 * @type ***REMOVED***number***REMOVED***
 */
PIXI.WebGLGraphics.stencilBufferLimit = 6;

/**
 * Renders the graphics object
 *
 * @static
 * @private
 * @method renderGraphics
 * @param graphics ***REMOVED***Graphics***REMOVED***
 * @param renderSession ***REMOVED***Object***REMOVED***
 */
PIXI.WebGLGraphics.renderGraphics = function(graphics, renderSession)//projection, offset)
***REMOVED***
    var gl = renderSession.gl;
    var projection = renderSession.projection,
        offset = renderSession.offset,
        shader = renderSession.shaderManager.primitiveShader,
        webGLData;

    if(graphics.dirty)
    ***REMOVED***
        PIXI.WebGLGraphics.updateGraphics(graphics, gl);
    ***REMOVED***

    var webGL = graphics._webGL[gl.id];

    // This  could be speeded up for sure!

    for (var i = 0; i < webGL.data.length; i++)
    ***REMOVED***
        if(webGL.data[i].mode === 1)
        ***REMOVED***
            webGLData = webGL.data[i];

            renderSession.stencilManager.pushStencil(graphics, webGLData, renderSession);

            // render quad..
            gl.drawElements(gl.TRIANGLE_FAN, 4, gl.UNSIGNED_SHORT, ( webGLData.indices.length - 4 ) * 2 );
            
            renderSession.stencilManager.popStencil(graphics, webGLData, renderSession);
        ***REMOVED***
        else
        ***REMOVED***
            webGLData = webGL.data[i];
           

            renderSession.shaderManager.setShader( shader );//activatePrimitiveShader();
            shader = renderSession.shaderManager.primitiveShader;
            gl.uniformMatrix3fv(shader.translationMatrix, false, graphics.worldTransform.toArray(true));
            
            gl.uniform1f(shader.flipY, 1);
            
            gl.uniform2f(shader.projectionVector, projection.x, -projection.y);
            gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);

            gl.uniform3fv(shader.tintColor, PIXI.hex2rgb(graphics.tint));

            gl.uniform1f(shader.alpha, graphics.worldAlpha);
            

            gl.bindBuffer(gl.ARRAY_BUFFER, webGLData.buffer);

            gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 4 * 6, 0);
            gl.vertexAttribPointer(shader.colorAttribute, 4, gl.FLOAT, false,4 * 6, 2 * 4);

            // set the index buffer!
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webGLData.indexBuffer);
            gl.drawElements(gl.TRIANGLE_STRIP,  webGLData.indices.length, gl.UNSIGNED_SHORT, 0 );
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

/**
 * Updates the graphics object
 *
 * @static
 * @private
 * @method updateGraphics
 * @param graphicsData ***REMOVED***Graphics***REMOVED*** The graphics object to update
 * @param gl ***REMOVED***WebGLContext***REMOVED*** the current WebGL drawing context
 */
PIXI.WebGLGraphics.updateGraphics = function(graphics, gl)
***REMOVED***
    // get the contexts graphics object
    var webGL = graphics._webGL[gl.id];
    // if the graphics object does not exist in the webGL context time to create it!
    if(!webGL)webGL = graphics._webGL[gl.id] = ***REMOVED***lastIndex:0, data:[], gl:gl***REMOVED***;

    // flag the graphics as not dirty as we are about to update it...
    graphics.dirty = false;

    var i;

    // if the user cleared the graphics object we will need to clear every object
    if(graphics.clearDirty)
    ***REMOVED***
        graphics.clearDirty = false;

        // lop through and return all the webGLDatas to the object pool so than can be reused later on
        for (i = 0; i < webGL.data.length; i++)
        ***REMOVED***
            var graphicsData = webGL.data[i];
            graphicsData.reset();
            PIXI.WebGLGraphics.graphicsDataPool.push( graphicsData );
        ***REMOVED***

        // clear the array and reset the index.. 
        webGL.data = [];
        webGL.lastIndex = 0;
    ***REMOVED***
    
    var webGLData;
    
    // loop through the graphics datas and construct each one..
    // if the object is a complex fill then the new stencil buffer technique will be used
    // other wise graphics objects will be pushed into a batch..
    for (i = webGL.lastIndex; i < graphics.graphicsData.length; i++)
    ***REMOVED***
        var data = graphics.graphicsData[i];

        if(data.type === PIXI.Graphics.POLY)
        ***REMOVED***
            // need to add the points the the graphics object..
            data.points = data.shape.points.slice();
            if(data.shape.closed)
            ***REMOVED***
                // close the poly if the value is true!
                if(data.points[0] !== data.points[data.points.length-2] || data.points[1] !== data.points[data.points.length-1])
                ***REMOVED***
                    data.points.push(data.points[0], data.points[1]);
                ***REMOVED***
            ***REMOVED***

            // MAKE SURE WE HAVE THE CORRECT TYPE..
            if(data.fill)
            ***REMOVED***
                if(data.points.length >= PIXI.WebGLGraphics.stencilBufferLimit)
                ***REMOVED***
                    if(data.points.length < PIXI.WebGLGraphics.stencilBufferLimit * 2)
                    ***REMOVED***
                        webGLData = PIXI.WebGLGraphics.switchMode(webGL, 0);
                        
                        var canDrawUsingSimple = PIXI.WebGLGraphics.buildPoly(data, webGLData);
                   //     console.log(canDrawUsingSimple);

                        if(!canDrawUsingSimple)
                        ***REMOVED***
                        //    console.log("<>>>")
                            webGLData = PIXI.WebGLGraphics.switchMode(webGL, 1);
                            PIXI.WebGLGraphics.buildComplexPoly(data, webGLData);
                        ***REMOVED***
                        
                    ***REMOVED***
                    else
                    ***REMOVED***
                        webGLData = PIXI.WebGLGraphics.switchMode(webGL, 1);
                        PIXI.WebGLGraphics.buildComplexPoly(data, webGLData);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***

            if(data.lineWidth > 0)
            ***REMOVED***
                webGLData = PIXI.WebGLGraphics.switchMode(webGL, 0);
                PIXI.WebGLGraphics.buildLine(data, webGLData);

            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            webGLData = PIXI.WebGLGraphics.switchMode(webGL, 0);
            
            if(data.type === PIXI.Graphics.RECT)
            ***REMOVED***
                PIXI.WebGLGraphics.buildRectangle(data, webGLData);
            ***REMOVED***
            else if(data.type === PIXI.Graphics.CIRC || data.type === PIXI.Graphics.ELIP)
            ***REMOVED***
                PIXI.WebGLGraphics.buildCircle(data, webGLData);
            ***REMOVED***
            else if(data.type === PIXI.Graphics.RREC)
            ***REMOVED***
                PIXI.WebGLGraphics.buildRoundedRectangle(data, webGLData);
            ***REMOVED***
        ***REMOVED***

        webGL.lastIndex++;
    ***REMOVED***

    // upload all the dirty data...
    for (i = 0; i < webGL.data.length; i++)
    ***REMOVED***
        webGLData = webGL.data[i];
        if(webGLData.dirty)webGLData.upload();
    ***REMOVED***
***REMOVED***;

/**
 * @static
 * @private
 * @method switchMode
 * @param webGL ***REMOVED***WebGLContext***REMOVED***
 * @param type ***REMOVED***Number***REMOVED***
 */
PIXI.WebGLGraphics.switchMode = function(webGL, type)
***REMOVED***
    var webGLData;

    if(!webGL.data.length)
    ***REMOVED***
        webGLData = PIXI.WebGLGraphics.graphicsDataPool.pop() || new PIXI.WebGLGraphicsData(webGL.gl);
        webGLData.mode = type;
        webGL.data.push(webGLData);
    ***REMOVED***
    else
    ***REMOVED***
        webGLData = webGL.data[webGL.data.length-1];

        if(webGLData.mode !== type || type === 1)
        ***REMOVED***
            webGLData = PIXI.WebGLGraphics.graphicsDataPool.pop() || new PIXI.WebGLGraphicsData(webGL.gl);
            webGLData.mode = type;
            webGL.data.push(webGLData);
        ***REMOVED***
    ***REMOVED***

    webGLData.dirty = true;

    return webGLData;
***REMOVED***;

/**
 * Builds a rectangle to draw
 *
 * @static
 * @private
 * @method buildRectangle
 * @param graphicsData ***REMOVED***Graphics***REMOVED*** The graphics object containing all the necessary properties
 * @param webGLData ***REMOVED***Object***REMOVED***
 */
PIXI.WebGLGraphics.buildRectangle = function(graphicsData, webGLData)
***REMOVED***
    // --- //
    // need to convert points to a nice regular data
    //
    var rectData = graphicsData.shape;
    var x = rectData.x;
    var y = rectData.y;
    var width = rectData.width;
    var height = rectData.height;

    if(graphicsData.fill)
    ***REMOVED***
        var color = PIXI.hex2rgb(graphicsData.fillColor);
        var alpha = graphicsData.fillAlpha;

        var r = color[0] * alpha;
        var g = color[1] * alpha;
        var b = color[2] * alpha;

        var verts = webGLData.points;
        var indices = webGLData.indices;

        var vertPos = verts.length / 6;

        // start
        verts.push(x, y);
        verts.push(r, g, b, alpha);

        verts.push(x + width, y);
        verts.push(r, g, b, alpha);

        verts.push(x , y + height);
        verts.push(r, g, b, alpha);

        verts.push(x + width, y + height);
        verts.push(r, g, b, alpha);

        // insert 2 dead triangles..
        indices.push(vertPos, vertPos, vertPos + 1, vertPos + 2, vertPos + 3, vertPos + 3);
    ***REMOVED***

    if (graphicsData.lineWidth)
    ***REMOVED***
        var tempPoints = graphicsData.points;

        graphicsData.points = [x, y,
                  x + width, y,
                  x + width, y + height,
                  x, y + height,
                  x, y];


        PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);

        graphicsData.points = tempPoints;
    ***REMOVED***
***REMOVED***;

/**
 * Builds a rounded rectangle to draw
 *
 * @static
 * @private
 * @method buildRoundedRectangle
 * @param graphicsData ***REMOVED***Graphics***REMOVED*** The graphics object containing all the necessary properties
 * @param webGLData ***REMOVED***Object***REMOVED***
 */
PIXI.WebGLGraphics.buildRoundedRectangle = function(graphicsData, webGLData)
***REMOVED***
    var rrectData = graphicsData.shape;
    var x = rrectData.x;
    var y = rrectData.y;
    var width = rrectData.width;
    var height = rrectData.height;

    var radius = rrectData.radius;

    var recPoints = [];
    recPoints.push(x, y + radius);
    recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x, y + height - radius, x, y + height, x + radius, y + height));
    recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x + width - radius, y + height, x + width, y + height, x + width, y + height - radius));
    recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x + width, y + radius, x + width, y, x + width - radius, y));
    recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x + radius, y, x, y, x, y + radius));

    if (graphicsData.fill) ***REMOVED***
        var color = PIXI.hex2rgb(graphicsData.fillColor);
        var alpha = graphicsData.fillAlpha;

        var r = color[0] * alpha;
        var g = color[1] * alpha;
        var b = color[2] * alpha;

        var verts = webGLData.points;
        var indices = webGLData.indices;

        var vecPos = verts.length / 6;

        var triangles = PIXI.EarCut.Triangulate(recPoints, null, 2);

        var i = 0;

        for (i = 0; i < triangles.length; i+=3)
        ***REMOVED***
            indices.push(triangles[i] + vecPos);
            indices.push(triangles[i] + vecPos);
            indices.push(triangles[i+1] + vecPos);
            indices.push(triangles[i+2] + vecPos);
            indices.push(triangles[i+2] + vecPos);
        ***REMOVED***


        for (i = 0; i < recPoints.length; i++)
        ***REMOVED***
            verts.push(recPoints[i], recPoints[++i], r, g, b, alpha);
        ***REMOVED***
    ***REMOVED***

    if (graphicsData.lineWidth) ***REMOVED***
        var tempPoints = graphicsData.points;

        graphicsData.points = recPoints;

        PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);

        graphicsData.points = tempPoints;
    ***REMOVED***
***REMOVED***;

/**
 * Calculate the points for a quadratic bezier curve. (helper function..)
 * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
 *
 * @static
 * @private
 * @method quadraticBezierCurve
 * @param fromX ***REMOVED***Number***REMOVED*** Origin point x
 * @param fromY ***REMOVED***Number***REMOVED*** Origin point x
 * @param cpX ***REMOVED***Number***REMOVED*** Control point x
 * @param cpY ***REMOVED***Number***REMOVED*** Control point y
 * @param toX ***REMOVED***Number***REMOVED*** Destination point x
 * @param toY ***REMOVED***Number***REMOVED*** Destination point y
 * @return ***REMOVED***Array(Number)***REMOVED***
 */
PIXI.WebGLGraphics.quadraticBezierCurve = function(fromX, fromY, cpX, cpY, toX, toY) ***REMOVED***

    var xa,
        ya,
        xb,
        yb,
        x,
        y,
        n = 20,
        points = [];

    function getPt(n1 , n2, perc) ***REMOVED***
        var diff = n2 - n1;

        return n1 + ( diff * perc );
    ***REMOVED***

    var j = 0;
    for (var i = 0; i <= n; i++ )
    ***REMOVED***
        j = i / n;

        // The Green Line
        xa = getPt( fromX , cpX , j );
        ya = getPt( fromY , cpY , j );
        xb = getPt( cpX , toX , j );
        yb = getPt( cpY , toY , j );

        // The Black Dot
        x = getPt( xa , xb , j );
        y = getPt( ya , yb , j );

        points.push(x, y);
    ***REMOVED***
    return points;
***REMOVED***;

/**
 * Builds a circle to draw
 *
 * @static
 * @private
 * @method buildCircle
 * @param graphicsData ***REMOVED***Graphics***REMOVED*** The graphics object to draw
 * @param webGLData ***REMOVED***Object***REMOVED***
 */
PIXI.WebGLGraphics.buildCircle = function(graphicsData, webGLData)
***REMOVED***
    // need to convert points to a nice regular data
    var circleData = graphicsData.shape;
    var x = circleData.x;
    var y = circleData.y;
    var width;
    var height;
    
    // TODO - bit hacky??
    if(graphicsData.type === PIXI.Graphics.CIRC)
    ***REMOVED***
        width = circleData.radius;
        height = circleData.radius;
    ***REMOVED***
    else
    ***REMOVED***
        width = circleData.width;
        height = circleData.height;
    ***REMOVED***

    var totalSegs = 40;
    var seg = (Math.PI * 2) / totalSegs ;

    var i = 0;

    if(graphicsData.fill)
    ***REMOVED***
        var color = PIXI.hex2rgb(graphicsData.fillColor);
        var alpha = graphicsData.fillAlpha;

        var r = color[0] * alpha;
        var g = color[1] * alpha;
        var b = color[2] * alpha;

        var verts = webGLData.points;
        var indices = webGLData.indices;

        var vecPos = verts.length / 6;

        indices.push(vecPos);

        for (i = 0; i < totalSegs + 1 ; i++)
        ***REMOVED***
            verts.push(x,y, r, g, b, alpha);

            verts.push(x + Math.sin(seg * i) * width,
                       y + Math.cos(seg * i) * height,
                       r, g, b, alpha);

            indices.push(vecPos++, vecPos++);
        ***REMOVED***

        indices.push(vecPos-1);
    ***REMOVED***

    if(graphicsData.lineWidth)
    ***REMOVED***
        var tempPoints = graphicsData.points;

        graphicsData.points = [];

        for (i = 0; i < totalSegs + 1; i++)
        ***REMOVED***
            graphicsData.points.push(x + Math.sin(seg * i) * width,
                                     y + Math.cos(seg * i) * height);
        ***REMOVED***

        PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);

        graphicsData.points = tempPoints;
    ***REMOVED***
***REMOVED***;

/**
 * Builds a line to draw
 *
 * @static
 * @private
 * @method buildLine
 * @param graphicsData ***REMOVED***Graphics***REMOVED*** The graphics object containing all the necessary properties
 * @param webGLData ***REMOVED***Object***REMOVED***
 */
PIXI.WebGLGraphics.buildLine = function(graphicsData, webGLData)
***REMOVED***
    // TODO OPTIMISE!
    var i = 0;
    var points = graphicsData.points;
    if(points.length === 0)return;

    // if the line width is an odd number add 0.5 to align to a whole pixel
    if(graphicsData.lineWidth%2)
    ***REMOVED***
        for (i = 0; i < points.length; i++) ***REMOVED***
            points[i] += 0.5;
        ***REMOVED***
    ***REMOVED***

    // get first and last point.. figure out the middle!
    var firstPoint = new PIXI.Point( points[0], points[1] );
    var lastPoint = new PIXI.Point( points[points.length - 2], points[points.length - 1] );

    // if the first point is the last point - gonna have issues :)
    if(firstPoint.x === lastPoint.x && firstPoint.y === lastPoint.y)
    ***REMOVED***
        // need to clone as we are going to slightly modify the shape..
        points = points.slice();

        points.pop();
        points.pop();

        lastPoint = new PIXI.Point( points[points.length - 2], points[points.length - 1] );

        var midPointX = lastPoint.x + (firstPoint.x - lastPoint.x) *0.5;
        var midPointY = lastPoint.y + (firstPoint.y - lastPoint.y) *0.5;

        points.unshift(midPointX, midPointY);
        points.push(midPointX, midPointY);
    ***REMOVED***

    var verts = webGLData.points;
    var indices = webGLData.indices;
    var length = points.length / 2;
    var indexCount = points.length;
    var indexStart = verts.length/6;

    // DRAW the Line
    var width = graphicsData.lineWidth / 2;

    // sort color
    var color = PIXI.hex2rgb(graphicsData.lineColor);
    var alpha = graphicsData.lineAlpha;
    var r = color[0] * alpha;
    var g = color[1] * alpha;
    var b = color[2] * alpha;

    var px, py, p1x, p1y, p2x, p2y, p3x, p3y;
    var perpx, perpy, perp2x, perp2y, perp3x, perp3y;
    var a1, b1, c1, a2, b2, c2;
    var denom, pdist, dist;

    p1x = points[0];
    p1y = points[1];

    p2x = points[2];
    p2y = points[3];

    perpx = -(p1y - p2y);
    perpy =  p1x - p2x;

    dist = Math.sqrt(perpx*perpx + perpy*perpy);

    perpx /= dist;
    perpy /= dist;
    perpx *= width;
    perpy *= width;

    // start
    verts.push(p1x - perpx , p1y - perpy,
                r, g, b, alpha);

    verts.push(p1x + perpx , p1y + perpy,
                r, g, b, alpha);

    for (i = 1; i < length-1; i++)
    ***REMOVED***
        p1x = points[(i-1)*2];
        p1y = points[(i-1)*2 + 1];

        p2x = points[(i)*2];
        p2y = points[(i)*2 + 1];

        p3x = points[(i+1)*2];
        p3y = points[(i+1)*2 + 1];

        perpx = -(p1y - p2y);
        perpy = p1x - p2x;

        dist = Math.sqrt(perpx*perpx + perpy*perpy);
        perpx /= dist;
        perpy /= dist;
        perpx *= width;
        perpy *= width;

        perp2x = -(p2y - p3y);
        perp2y = p2x - p3x;

        dist = Math.sqrt(perp2x*perp2x + perp2y*perp2y);
        perp2x /= dist;
        perp2y /= dist;
        perp2x *= width;
        perp2y *= width;

        a1 = (-perpy + p1y) - (-perpy + p2y);
        b1 = (-perpx + p2x) - (-perpx + p1x);
        c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
        a2 = (-perp2y + p3y) - (-perp2y + p2y);
        b2 = (-perp2x + p2x) - (-perp2x + p3x);
        c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);

        denom = a1*b2 - a2*b1;

        if(Math.abs(denom) < 0.1 )
        ***REMOVED***

            denom+=10.1;
            verts.push(p2x - perpx , p2y - perpy,
                r, g, b, alpha);

            verts.push(p2x + perpx , p2y + perpy,
                r, g, b, alpha);

            continue;
        ***REMOVED***

        px = (b1*c2 - b2*c1)/denom;
        py = (a2*c1 - a1*c2)/denom;


        pdist = (px -p2x) * (px -p2x) + (py -p2y) + (py -p2y);


        if(pdist > 140 * 140)
        ***REMOVED***
            perp3x = perpx - perp2x;
            perp3y = perpy - perp2y;

            dist = Math.sqrt(perp3x*perp3x + perp3y*perp3y);
            perp3x /= dist;
            perp3y /= dist;
            perp3x *= width;
            perp3y *= width;

            verts.push(p2x - perp3x, p2y -perp3y);
            verts.push(r, g, b, alpha);

            verts.push(p2x + perp3x, p2y +perp3y);
            verts.push(r, g, b, alpha);

            verts.push(p2x - perp3x, p2y -perp3y);
            verts.push(r, g, b, alpha);

            indexCount++;
        ***REMOVED***
        else
        ***REMOVED***

            verts.push(px , py);
            verts.push(r, g, b, alpha);

            verts.push(p2x - (px-p2x), p2y - (py - p2y));
            verts.push(r, g, b, alpha);
        ***REMOVED***
    ***REMOVED***

    p1x = points[(length-2)*2];
    p1y = points[(length-2)*2 + 1];

    p2x = points[(length-1)*2];
    p2y = points[(length-1)*2 + 1];

    perpx = -(p1y - p2y);
    perpy = p1x - p2x;

    dist = Math.sqrt(perpx*perpx + perpy*perpy);
    perpx /= dist;
    perpy /= dist;
    perpx *= width;
    perpy *= width;

    verts.push(p2x - perpx , p2y - perpy);
    verts.push(r, g, b, alpha);

    verts.push(p2x + perpx , p2y + perpy);
    verts.push(r, g, b, alpha);

    indices.push(indexStart);

    for (i = 0; i < indexCount; i++)
    ***REMOVED***
        indices.push(indexStart++);
    ***REMOVED***

    indices.push(indexStart-1);
***REMOVED***;

/**
 * Builds a complex polygon to draw
 *
 * @static
 * @private
 * @method buildComplexPoly
 * @param graphicsData ***REMOVED***Graphics***REMOVED*** The graphics object containing all the necessary properties
 * @param webGLData ***REMOVED***Object***REMOVED***
 */
PIXI.WebGLGraphics.buildComplexPoly = function(graphicsData, webGLData)
***REMOVED***
    //TODO - no need to copy this as it gets turned into a FLoat32Array anyways..
    var points = graphicsData.points.slice();
    if(points.length < 6)return;

    // get first and last point.. figure out the middle!
    var indices = webGLData.indices;
    webGLData.points = points;
    webGLData.alpha = graphicsData.fillAlpha;
    webGLData.color = PIXI.hex2rgb(graphicsData.fillColor);

    /*
        calclate the bounds..
    */
    var minX = Infinity;
    var maxX = -Infinity;

    var minY = Infinity;
    var maxY = -Infinity;

    var x,y;

    // get size..
    for (var i = 0; i < points.length; i+=2)
    ***REMOVED***
        x = points[i];
        y = points[i+1];

        minX = x < minX ? x : minX;
        maxX = x > maxX ? x : maxX;

        minY = y < minY ? y : minY;
        maxY = y > maxY ? y : maxY;
    ***REMOVED***

    // add a quad to the end cos there is no point making another buffer!
    points.push(minX, minY,
                maxX, minY,
                maxX, maxY,
                minX, maxY);

    // push a quad onto the end.. 
    
    //TODO - this aint needed!
    var length = points.length / 2;
    for (i = 0; i < length; i++)
    ***REMOVED***
        indices.push( i );
    ***REMOVED***

***REMOVED***;

/**
 * Builds a polygon to draw
 *
 * @static
 * @private
 * @method buildPoly
 * @param graphicsData ***REMOVED***Graphics***REMOVED*** The graphics object containing all the necessary properties
 * @param webGLData ***REMOVED***Object***REMOVED***
 */
PIXI.WebGLGraphics.buildPoly = function(graphicsData, webGLData)
***REMOVED***
    var points = graphicsData.points;

    if(points.length < 6)return;
    // get first and last point.. figure out the middle!
    var verts = webGLData.points;
    var indices = webGLData.indices;

    var length = points.length / 2;

    // sort color
    var color = PIXI.hex2rgb(graphicsData.fillColor);
    var alpha = graphicsData.fillAlpha;
    var r = color[0] * alpha;
    var g = color[1] * alpha;
    var b = color[2] * alpha;

    var triangles = PIXI.EarCut.Triangulate(points, null, 2);

    if(!triangles)return false;

    var vertPos = verts.length / 6;

    var i = 0;

    for (i = 0; i < triangles.length; i+=3)
    ***REMOVED***
        indices.push(triangles[i] + vertPos);
        indices.push(triangles[i] + vertPos);
        indices.push(triangles[i+1] + vertPos);
        indices.push(triangles[i+2] +vertPos);
        indices.push(triangles[i+2] + vertPos);
    ***REMOVED***

    for (i = 0; i < length; i++)
    ***REMOVED***
        verts.push(points[i * 2], points[i * 2 + 1],
                   r, g, b, alpha);
    ***REMOVED***

    return true;
***REMOVED***;

PIXI.WebGLGraphics.graphicsDataPool = [];

/**
 * @class WebGLGraphicsData
 * @private
 * @static
 */
PIXI.WebGLGraphicsData = function(gl)
***REMOVED***
    this.gl = gl;

    //TODO does this need to be split before uploding??
    this.color = [0,0,0]; // color split!
    this.points = [];
    this.indices = [];
    this.buffer = gl.createBuffer();
    this.indexBuffer = gl.createBuffer();
    this.mode = 1;
    this.alpha = 1;
    this.dirty = true;
***REMOVED***;

/**
 * @method reset
 */
PIXI.WebGLGraphicsData.prototype.reset = function()
***REMOVED***
    this.points = [];
    this.indices = [];
***REMOVED***;

/**
 * @method upload
 */
PIXI.WebGLGraphicsData.prototype.upload = function()
***REMOVED***
    var gl = this.gl;

//    this.lastIndex = graphics.graphicsData.length;
    this.glPoints = new PIXI.Float32Array(this.points);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.glPoints, gl.STATIC_DRAW);

    this.glIndicies = new PIXI.Uint16Array(this.indices);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.glIndicies, gl.STATIC_DRAW);

    this.dirty = false;
***REMOVED***;

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */


/**
 * A set of functions used by the canvas renderer to draw the primitive graphics data.
 *
 * @class CanvasGraphics
 * @static
 */
PIXI.CanvasGraphics = function()
***REMOVED***
***REMOVED***;

/*
 * Renders a PIXI.Graphics object to a canvas.
 *
 * @method renderGraphics
 * @static
 * @param graphics ***REMOVED***Graphics***REMOVED*** the actual graphics object to render
 * @param context ***REMOVED***CanvasRenderingContext2D***REMOVED*** the 2d drawing method of the canvas
 */
PIXI.CanvasGraphics.renderGraphics = function(graphics, context)
***REMOVED***
    var worldAlpha = graphics.worldAlpha;

    if (graphics.dirty)
    ***REMOVED***
        this.updateGraphicsTint(graphics);
        graphics.dirty = false;
    ***REMOVED***

    for (var i = 0; i < graphics.graphicsData.length; i++)
    ***REMOVED***
        var data = graphics.graphicsData[i];
        var shape = data.shape;

        var fillColor = data._fillTint;
        var lineColor = data._lineTint;

        context.lineWidth = data.lineWidth;

        if (data.type === PIXI.Graphics.POLY)
        ***REMOVED***
            context.beginPath();

            var points = shape.points;

            context.moveTo(points[0], points[1]);

            for (var j=1; j < points.length/2; j++)
            ***REMOVED***
                context.lineTo(points[j * 2], points[j * 2 + 1]);
            ***REMOVED***

            if (shape.closed)
            ***REMOVED***
                context.lineTo(points[0], points[1]);
            ***REMOVED***

            // if the first and last point are the same close the path - much neater :)
            if (points[0] === points[points.length-2] && points[1] === points[points.length-1])
            ***REMOVED***
                context.closePath();
            ***REMOVED***

            if (data.fill)
            ***REMOVED***
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = '#' + ('00000' + ( fillColor | 0).toString(16)).substr(-6);
                context.fill();
            ***REMOVED***

            if (data.lineWidth)
            ***REMOVED***
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = '#' + ('00000' + ( lineColor | 0).toString(16)).substr(-6);
                context.stroke();
            ***REMOVED***
        ***REMOVED***
        else if (data.type === PIXI.Graphics.RECT)
        ***REMOVED***
            if (data.fillColor || data.fillColor === 0)
            ***REMOVED***
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = '#' + ('00000' + ( fillColor | 0).toString(16)).substr(-6);
                context.fillRect(shape.x, shape.y, shape.width, shape.height);
            ***REMOVED***

            if (data.lineWidth)
            ***REMOVED***
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = '#' + ('00000' + ( lineColor | 0).toString(16)).substr(-6);
                context.strokeRect(shape.x, shape.y, shape.width, shape.height);
            ***REMOVED***
        ***REMOVED***
        else if (data.type === PIXI.Graphics.CIRC)
        ***REMOVED***
            // TODO - need to be Undefined!
            context.beginPath();
            context.arc(shape.x, shape.y, shape.radius,0,2*Math.PI);
            context.closePath();

            if (data.fill)
            ***REMOVED***
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = '#' + ('00000' + ( fillColor | 0).toString(16)).substr(-6);
                context.fill();
            ***REMOVED***

            if (data.lineWidth)
            ***REMOVED***
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = '#' + ('00000' + ( lineColor | 0).toString(16)).substr(-6);
                context.stroke();
            ***REMOVED***
        ***REMOVED***
        else if (data.type === PIXI.Graphics.ELIP)
        ***REMOVED***
            // ellipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

            var w = shape.width * 2;
            var h = shape.height * 2;

            var x = shape.x - w/2;
            var y = shape.y - h/2;

            context.beginPath();

            var kappa = 0.5522848,
                ox = (w / 2) * kappa, // control point offset horizontal
                oy = (h / 2) * kappa, // control point offset vertical
                xe = x + w,           // x-end
                ye = y + h,           // y-end
                xm = x + w / 2,       // x-middle
                ym = y + h / 2;       // y-middle

            context.moveTo(x, ym);
            context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
            context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
            context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
            context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

            context.closePath();

            if (data.fill)
            ***REMOVED***
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = '#' + ('00000' + ( fillColor | 0).toString(16)).substr(-6);
                context.fill();
            ***REMOVED***

            if (data.lineWidth)
            ***REMOVED***
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = '#' + ('00000' + ( lineColor | 0).toString(16)).substr(-6);
                context.stroke();
            ***REMOVED***
        ***REMOVED***
        else if (data.type === PIXI.Graphics.RREC)
        ***REMOVED***
            var rx = shape.x;
            var ry = shape.y;
            var width = shape.width;
            var height = shape.height;
            var radius = shape.radius;

            var maxRadius = Math.min(width, height) / 2 | 0;
            radius = radius > maxRadius ? maxRadius : radius;

            context.beginPath();
            context.moveTo(rx, ry + radius);
            context.lineTo(rx, ry + height - radius);
            context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height);
            context.lineTo(rx + width - radius, ry + height);
            context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius);
            context.lineTo(rx + width, ry + radius);
            context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry);
            context.lineTo(rx + radius, ry);
            context.quadraticCurveTo(rx, ry, rx, ry + radius);
            context.closePath();

            if (data.fillColor || data.fillColor === 0)
            ***REMOVED***
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = '#' + ('00000' + ( fillColor | 0).toString(16)).substr(-6);
                context.fill();
            ***REMOVED***

            if (data.lineWidth)
            ***REMOVED***
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = '#' + ('00000' + ( lineColor | 0).toString(16)).substr(-6);
                context.stroke();
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/*
 * Renders a graphics mask
 *
 * @static
 * @private
 * @method renderGraphicsMask
 * @param graphics ***REMOVED***Graphics***REMOVED*** the graphics which will be used as a mask
 * @param context ***REMOVED***CanvasRenderingContext2D***REMOVED*** the context 2d method of the canvas
 */
PIXI.CanvasGraphics.renderGraphicsMask = function(graphics, context)
***REMOVED***
    var len = graphics.graphicsData.length;

    if (len === 0)
    ***REMOVED***
        return;
    ***REMOVED***

    context.beginPath();

    for (var i = 0; i < len; i++)
    ***REMOVED***
        var data = graphics.graphicsData[i];
        var shape = data.shape;

        if (data.type === PIXI.Graphics.POLY)
        ***REMOVED***

            var points = shape.points;
        
            context.moveTo(points[0], points[1]);

            for (var j=1; j < points.length/2; j++)
            ***REMOVED***
                context.lineTo(points[j * 2], points[j * 2 + 1]);
            ***REMOVED***

            // if the first and last point are the same close the path - much neater :)
            if (points[0] === points[points.length-2] && points[1] === points[points.length-1])
            ***REMOVED***
                context.closePath();
            ***REMOVED***

        ***REMOVED***
        else if (data.type === PIXI.Graphics.RECT)
        ***REMOVED***
            context.rect(shape.x, shape.y, shape.width, shape.height);
            context.closePath();
        ***REMOVED***
        else if (data.type === PIXI.Graphics.CIRC)
        ***REMOVED***
            // TODO - need to be Undefined!
            context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
            context.closePath();
        ***REMOVED***
        else if (data.type === PIXI.Graphics.ELIP)
        ***REMOVED***

            // ellipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

            var w = shape.width * 2;
            var h = shape.height * 2;

            var x = shape.x - w/2;
            var y = shape.y - h/2;

            var kappa = 0.5522848,
                ox = (w / 2) * kappa, // control point offset horizontal
                oy = (h / 2) * kappa, // control point offset vertical
                xe = x + w,           // x-end
                ye = y + h,           // y-end
                xm = x + w / 2,       // x-middle
                ym = y + h / 2;       // y-middle

            context.moveTo(x, ym);
            context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
            context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
            context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
            context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
            context.closePath();
        ***REMOVED***
        else if (data.type === PIXI.Graphics.RREC)
        ***REMOVED***

            var rx = shape.x;
            var ry = shape.y;
            var width = shape.width;
            var height = shape.height;
            var radius = shape.radius;

            var maxRadius = Math.min(width, height) / 2 | 0;
            radius = radius > maxRadius ? maxRadius : radius;

            context.moveTo(rx, ry + radius);
            context.lineTo(rx, ry + height - radius);
            context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height);
            context.lineTo(rx + width - radius, ry + height);
            context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius);
            context.lineTo(rx + width, ry + radius);
            context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry);
            context.lineTo(rx + radius, ry);
            context.quadraticCurveTo(rx, ry, rx, ry + radius);
            context.closePath();
        ***REMOVED***
    ***REMOVED***
***REMOVED***;

PIXI.CanvasGraphics.updateGraphicsTint = function(graphics)
***REMOVED***
    if (graphics.tint === 0xFFFFFF)
    ***REMOVED***
        return;
    ***REMOVED***

    var tintR = (graphics.tint >> 16 & 0xFF) / 255;
    var tintG = (graphics.tint >> 8 & 0xFF) / 255;
    var tintB = (graphics.tint & 0xFF)/ 255;

    for (var i = 0; i < graphics.graphicsData.length; i++)
    ***REMOVED***
        var data = graphics.graphicsData[i];

        var fillColor = data.fillColor | 0;
        var lineColor = data.lineColor | 0;

        data._fillTint = (((fillColor >> 16 & 0xFF) / 255 * tintR*255 << 16) + ((fillColor >> 8 & 0xFF) / 255 * tintG*255 << 8) +  (fillColor & 0xFF) / 255 * tintB*255);
        data._lineTint = (((lineColor >> 16 & 0xFF) / 255 * tintR*255 << 16) + ((lineColor >> 8 & 0xFF) / 255 * tintG*255 << 8) +  (lineColor & 0xFF) / 255 * tintB*255);

    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A Graphics object is a way to draw primitives to your game. Primitives include forms of geometry, such as Rectangles,
* Circles and Polygons. They also include lines, arcs and curves. When you initially create a Graphics object it will
* be empty. To 'draw' to it you first specify a lineStyle or fillStyle (or both), and then draw a shape. For example:
*
* ```
* graphics.beginFill(0xff0000);
* graphics.drawCircle(50, 50, 100);
* graphics.endFill();
* ```
* 
* This will draw a circle shape to the Graphics object, with a diameter of 100, located at x: 50, y: 50.
*
* When a Graphics object is rendered it will render differently based on if the game is running under Canvas or
* WebGL. Under Canvas it will use the HTML Canvas context drawing operations to draw the path. Under WebGL the
* graphics data is decomposed into polygons. Both of these are expensive processes, especially with complex shapes.
* 
* If your Graphics object doesn't change much (or at all) once you've drawn your shape to it, then you will help
* performance by calling `Graphics.generateTexture`. This will 'bake' the Graphics object into a Texture, and return it.
* You can then use this Texture for Sprites or other display objects. If your Graphics object updates frequently then
* you should avoid doing this, as it will constantly generate new textures, which will consume memory.
*
* As you can tell, Graphics objects are a bit of a trade-off. While they are extremely useful, you need to be careful
* in their complexity and quantity of them in your game.
*
* @class Phaser.Graphics
* @constructor
* @extends PIXI.Graphics
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
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Current game instance.
* @param ***REMOVED***number***REMOVED*** [x=0] - X position of the new graphics object.
* @param ***REMOVED***number***REMOVED*** [y=0] - Y position of the new graphics object.
*/
Phaser.Graphics = function (game, x, y) ***REMOVED***

    if (x === undefined) ***REMOVED*** x = 0; ***REMOVED***
    if (y === undefined) ***REMOVED*** y = 0; ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @default
    */
    this.type = Phaser.GRAPHICS;

    /**
    * @property ***REMOVED***number***REMOVED*** physicsType - The const physics body type of this object.
    * @readonly
    */
    this.physicsType = Phaser.SPRITE;

    /**
    * @property ***REMOVED***Phaser.Point***REMOVED*** anchor - Required for a Graphics shape to work as a Physics body, do not modify this value.
    * @private
    */
    this.anchor = new Phaser.Point();

    PIXI.Graphics.call(this);

    Phaser.Component.Core.init.call(this, game, x, y, '', null);

***REMOVED***;

Phaser.Graphics.prototype = Object.create(PIXI.Graphics.prototype);
Phaser.Graphics.prototype.constructor = Phaser.Graphics;

Phaser.Component.Core.install.call(Phaser.Graphics.prototype, [
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

Phaser.Graphics.prototype.preUpdatePhysics = Phaser.Component.PhysicsBody.preUpdate;
Phaser.Graphics.prototype.preUpdateLifeSpan = Phaser.Component.LifeSpan.preUpdate;
Phaser.Graphics.prototype.preUpdateInWorld = Phaser.Component.InWorld.preUpdate;
Phaser.Graphics.prototype.preUpdateCore = Phaser.Component.Core.preUpdate;

/**
* Automatically called by World.preUpdate.
* 
* @method
* @memberof Phaser.Graphics
*/
Phaser.Graphics.prototype.preUpdate = function () ***REMOVED***

    if (!this.preUpdatePhysics() || !this.preUpdateLifeSpan() || !this.preUpdateInWorld())
    ***REMOVED***
        return false;
    ***REMOVED***

    return this.preUpdateCore();

***REMOVED***;

/**
* Automatically called by World
* @method Phaser.Graphics.prototype.postUpdate
*/
Phaser.Graphics.prototype.postUpdate = function () ***REMOVED***

    Phaser.Component.PhysicsBody.postUpdate.call(this);
    Phaser.Component.FixedToCamera.postUpdate.call(this);

    if (this._boundsDirty)
    ***REMOVED***
        this.updateLocalBounds();
        this._boundsDirty = false;
    ***REMOVED***

    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        this.children[i].postUpdate();
    ***REMOVED***

***REMOVED***;

/**
* Destroy this Graphics instance.
*
* @method Phaser.Graphics.prototype.destroy
* @param ***REMOVED***boolean***REMOVED*** [destroyChildren=true] - Should every child of this object have its destroy method called?
*/
Phaser.Graphics.prototype.destroy = function(destroyChildren) ***REMOVED***

    this.clear();

    Phaser.Component.Destroy.prototype.destroy.call(this, destroyChildren);

***REMOVED***;

/*
* Draws a single ***REMOVED***Phaser.Polygon***REMOVED*** triangle from a ***REMOVED***Phaser.Point***REMOVED*** array
*
* @method Phaser.Graphics.prototype.drawTriangle
* @param ***REMOVED***Array<Phaser.Point>***REMOVED*** points - An array of Phaser.Points that make up the three vertices of this triangle
* @param ***REMOVED***boolean***REMOVED*** [cull=false] - Should we check if the triangle is back-facing
*/
Phaser.Graphics.prototype.drawTriangle = function(points, cull) ***REMOVED***

    if (cull === undefined) ***REMOVED*** cull = false; ***REMOVED***

    var triangle = new Phaser.Polygon(points);

    if (cull)
    ***REMOVED***
        var cameraToFace = new Phaser.Point(this.game.camera.x - points[0].x, this.game.camera.y - points[0].y);
        var ab = new Phaser.Point(points[1].x - points[0].x, points[1].y - points[0].y);
        var cb = new Phaser.Point(points[1].x - points[2].x, points[1].y - points[2].y);
        var faceNormal = cb.cross(ab);

        if (cameraToFace.dot(faceNormal) > 0)
        ***REMOVED***
            this.drawPolygon(triangle);
        ***REMOVED***
    ***REMOVED***
    else
    ***REMOVED***
        this.drawPolygon(triangle);
    ***REMOVED***

***REMOVED***;

/*
* Draws ***REMOVED***Phaser.Polygon***REMOVED*** triangles 
*
* @method Phaser.Graphics.prototype.drawTriangles
* @param ***REMOVED***Array<Phaser.Point>|Array<number>***REMOVED*** vertices - An array of Phaser.Points or numbers that make up the vertices of the triangles
* @param ***REMOVED***Array<number>***REMOVED*** ***REMOVED***indices=null***REMOVED*** - An array of numbers that describe what order to draw the vertices in
* @param ***REMOVED***boolean***REMOVED*** [cull=false] - Should we check if the triangle is back-facing
*/
Phaser.Graphics.prototype.drawTriangles = function(vertices, indices, cull) ***REMOVED***

    if (cull === undefined) ***REMOVED*** cull = false; ***REMOVED***

    var point1 = new Phaser.Point();
    var point2 = new Phaser.Point();
    var point3 = new Phaser.Point();
    var points = [];
    var i;

    if (!indices)
    ***REMOVED***
        if (vertices[0] instanceof Phaser.Point)
        ***REMOVED***
            for (i = 0; i < vertices.length / 3; i++)
            ***REMOVED***
                this.drawTriangle([vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2]], cull);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            for (i = 0; i < vertices.length / 6; i++)
            ***REMOVED***
                point1.x = vertices[i * 6 + 0];
                point1.y = vertices[i * 6 + 1];
                point2.x = vertices[i * 6 + 2];
                point2.y = vertices[i * 6 + 3];
                point3.x = vertices[i * 6 + 4];
                point3.y = vertices[i * 6 + 5];
                this.drawTriangle([point1, point2, point3], cull);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
    else
    ***REMOVED***
        if (vertices[0] instanceof Phaser.Point)
        ***REMOVED***
            for (i = 0; i < indices.length /3; i++)
            ***REMOVED***
                points.push(vertices[indices[i * 3 ]]);
                points.push(vertices[indices[i * 3 + 1]]);
                points.push(vertices[indices[i * 3 + 2]]);

                if (points.length === 3)
                ***REMOVED***
                    this.drawTriangle(points, cull);
                    points = [];
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            for (i = 0; i < indices.length; i++)
            ***REMOVED***
                point1.x = vertices[indices[i] * 2];
                point1.y = vertices[indices[i] * 2 + 1];
                points.push(point1.copyTo(***REMOVED******REMOVED***));

                if (points.length === 3)
                ***REMOVED***
                    this.drawTriangle(points, cull);
                    points = [];
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***;
