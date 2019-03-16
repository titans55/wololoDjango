/**
 * @author Mat Groves http://matgroves.com/
 */

/**
 * The SpriteBatch class is a really fast version of the DisplayObjectContainer 
 * built solely for speed, so use when you need a lot of sprites or particles.
 * And it's extremely easy to use : 

    var container = new PIXI.SpriteBatch();
 
    for(var i  = 0; i < 100; i++)
    ***REMOVED***
        var sprite = new PIXI.Sprite.fromImage("myImage.png");
        container.addChild(sprite);
    ***REMOVED***
 * And here you have a hundred sprites that will be renderer at the speed of light
 *
 * @class SpriteBatch
 * @constructor
 * @param texture ***REMOVED***Texture***REMOVED***
 */
PIXI.SpriteBatch = function(texture)
***REMOVED***
    PIXI.DisplayObjectContainer.call( this);

    this.textureThing = texture;

    this.ready = false;
***REMOVED***;

PIXI.SpriteBatch.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
PIXI.SpriteBatch.prototype.constructor = PIXI.SpriteBatch;

/*
 * Initialises the spriteBatch
 *
 * @method initWebGL
 * @param gl ***REMOVED***WebGLContext***REMOVED*** the current WebGL drawing context
 */
PIXI.SpriteBatch.prototype.initWebGL = function(gl)
***REMOVED***
    // TODO only one needed for the whole engine really?
    this.fastSpriteBatch = new PIXI.WebGLFastSpriteBatch(gl);

    this.ready = true;
***REMOVED***;

/*
 * Updates the object transform for rendering
 *
 * @method updateTransform
 * @private
 */
PIXI.SpriteBatch.prototype.updateTransform = function()
***REMOVED***
    // TODO don't need to!
    this.displayObjectUpdateTransform();
    //  PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
***REMOVED***;

/**
* Renders the object using the WebGL renderer
*
* @method _renderWebGL
* @param renderSession ***REMOVED***RenderSession***REMOVED*** 
* @private
*/
PIXI.SpriteBatch.prototype._renderWebGL = function(renderSession)
***REMOVED***
    if (!this.visible || this.alpha <= 0 || !this.children.length) return;

    if (!this.ready)
    ***REMOVED***
        this.initWebGL(renderSession.gl);
    ***REMOVED***
    
    if (this.fastSpriteBatch.gl !== renderSession.gl)
    ***REMOVED***
        this.fastSpriteBatch.setContext(renderSession.gl);
    ***REMOVED***

    renderSession.spriteBatch.stop();
    
    renderSession.shaderManager.setShader(renderSession.shaderManager.fastShader);
    
    this.fastSpriteBatch.begin(this, renderSession);
    this.fastSpriteBatch.render(this);

    renderSession.spriteBatch.start();
 
***REMOVED***;

/**
* Renders the object using the Canvas renderer
*
* @method _renderCanvas
* @param renderSession ***REMOVED***RenderSession***REMOVED*** 
* @private
*/
PIXI.SpriteBatch.prototype._renderCanvas = function(renderSession)
***REMOVED***
    if (!this.visible || this.alpha <= 0 || !this.children.length) return;
    
    var context = renderSession.context;

    context.globalAlpha = this.worldAlpha;

    this.displayObjectUpdateTransform();

    var transform = this.worldTransform;
       
    var isRotated = true;

    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        var child = this.children[i];

        if (!child.visible) continue;

        var texture = child.texture;
        var frame = texture.frame;

        context.globalAlpha = this.worldAlpha * child.alpha;

        if (child.rotation % (Math.PI * 2) === 0)
        ***REMOVED***
            if (isRotated)
            ***REMOVED***
                context.setTransform(transform.a, transform.b, transform.c, transform.d, transform.tx, transform.ty);
                isRotated = false;
            ***REMOVED***

            // this is the fastest  way to optimise! - if rotation is 0 then we can avoid any kind of setTransform call
            context.drawImage(texture.baseTexture.source,
                                 frame.x,
                                 frame.y,
                                 frame.width,
                                 frame.height,
                                 ((child.anchor.x) * (-frame.width * child.scale.x) + child.position.x + 0.5 + renderSession.shakeX) | 0,
                                 ((child.anchor.y) * (-frame.height * child.scale.y) + child.position.y + 0.5 + renderSession.shakeY) | 0,
                                 frame.width * child.scale.x,
                                 frame.height * child.scale.y);
        ***REMOVED***
        else
        ***REMOVED***
            if (!isRotated) isRotated = true;
    
            child.displayObjectUpdateTransform();
           
            var childTransform = child.worldTransform;
            var tx = (childTransform.tx * renderSession.resolution) + renderSession.shakeX;
            var ty = (childTransform.ty * renderSession.resolution) + renderSession.shakeY;

            // allow for trimming
           
            if (renderSession.roundPixels)
            ***REMOVED***
                context.setTransform(childTransform.a, childTransform.b, childTransform.c, childTransform.d, tx | 0, ty | 0);
            ***REMOVED***
            else
            ***REMOVED***
                context.setTransform(childTransform.a, childTransform.b, childTransform.c, childTransform.d, tx, ty);
            ***REMOVED***

            context.drawImage(texture.baseTexture.source,
                                 frame.x,
                                 frame.y,
                                 frame.width,
                                 frame.height,
                                 ((child.anchor.x) * (-frame.width) + 0.5) | 0,
                                 ((child.anchor.y) * (-frame.height) + 0.5) | 0,
                                 frame.width,
                                 frame.height);
        ***REMOVED***
    ***REMOVED***

***REMOVED***;
