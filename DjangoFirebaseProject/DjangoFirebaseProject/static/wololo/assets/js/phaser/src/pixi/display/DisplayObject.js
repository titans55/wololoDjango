/**
* @author       Mat Groves http://matgroves.com @Doormat23
* @author       Richard Davey <rich@photonstorm.com>
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The base class for all objects that are rendered. Contains properties for position, scaling,
* rotation, masks and cache handling.
* 
* This is an abstract class and should not be used on its own, rather it should be extended.
*
* It is used internally by the likes of PIXI.Sprite.
*
* @class PIXI.DisplayObject
* @constructor
*/
PIXI.DisplayObject = function () ***REMOVED***

    /**
    * The coordinates, in pixels, of this DisplayObject, relative to its parent container.
    * 
    * The value of this property does not reflect any positioning happening further up the display list.
    * To obtain that value please see the `worldPosition` property.
    * 
    * @property ***REMOVED***PIXI.Point***REMOVED*** position
    * @default
    */
    this.position = new PIXI.Point(0, 0);

    /**
    * The scale of this DisplayObject. A scale of 1:1 represents the DisplayObject
    * at its default size. A value of 0.5 would scale this DisplayObject by half, and so on.
    * 
    * The value of this property does not reflect any scaling happening further up the display list.
    * To obtain that value please see the `worldScale` property.
    * 
    * @property ***REMOVED***PIXI.Point***REMOVED*** scale
    * @default
    */
    this.scale = new PIXI.Point(1, 1);

    /**
    * The pivot point of this DisplayObject that it rotates around. The values are expressed
    * in pixel values.
    * @property ***REMOVED***PIXI.Point***REMOVED*** pivot
    * @default
    */
    this.pivot = new PIXI.Point(0, 0);

    /**
    * The rotation of this DisplayObject. The value is given, and expressed, in radians, and is based on
    * a right-handed orientation.
    * 
    * The value of this property does not reflect any rotation happening further up the display list.
    * To obtain that value please see the `worldRotation` property.
    * 
    * @property ***REMOVED***number***REMOVED*** rotation
    * @default
    */
    this.rotation = 0;

    /**
    * The alpha value of this DisplayObject. A value of 1 is fully opaque. A value of 0 is transparent.
    * Please note that an object with an alpha value of 0 is skipped during the render pass.
    * 
    * The value of this property does not reflect any alpha values set further up the display list.
    * To obtain that value please see the `worldAlpha` property.
    * 
    * @property ***REMOVED***number***REMOVED*** alpha
    * @default
    */
    this.alpha = 1;

    /**
    * The visibility of this DisplayObject. A value of `false` makes the object invisible.
    * A value of `true` makes it visible. Please note that an object with a visible value of
    * `false` is skipped during the render pass. Equally a DisplayObject with visible false will
    * not render any of its children.
    * 
    * The value of this property does not reflect any visible values set further up the display list.
    * To obtain that value please see the `worldVisible` property.
    * 
    * @property ***REMOVED***boolean***REMOVED*** visible
    * @default
    */
    this.visible = true;

    /**
     * This is the defined area that will pick up mouse / touch events. It is null by default.
     * Setting it is a neat way of optimising the hitTest function that the interactionManager will use (as it will not need to hit test all the children)
     *
     * @property hitArea
     * @type Rectangle|Circle|Ellipse|Polygon
     */
    this.hitArea = null;

    /**
    * Should this DisplayObject be rendered by the renderer? An object with a renderable value of
    * `false` is skipped during the render pass.
    * 
    * @property ***REMOVED***boolean***REMOVED*** renderable
    * @default
    */
    this.renderable = false;

    /**
    * The parent DisplayObjectContainer that this DisplayObject is a child of.
    * All DisplayObjects must belong to a parent in order to be rendered.
    * The root parent is the Stage object. This property is set automatically when the
    * DisplayObject is added to, or removed from, a DisplayObjectContainer.
    * 
    * @property ***REMOVED***PIXI.DisplayObjectContainer***REMOVED*** parent
    * @default
    * @readOnly
    */
    this.parent = null;

    /**
    * The multiplied alpha value of this DisplayObject. A value of 1 is fully opaque. A value of 0 is transparent.
    * This value is the calculated total, based on the alpha values of all parents of this DisplayObjects 
    * in the display list.
    * 
    * To obtain, and set, the local alpha value, see the `alpha` property.
    *
    * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until 
    * that happens this property will contain values based on the previous frame. Be mindful of this if
    * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.
    * 
    * @property ***REMOVED***number***REMOVED*** worldAlpha
    * @readOnly
    */
    this.worldAlpha = 1;

    /**
    * The current transform of this DisplayObject.
    * 
    * This property contains the calculated total, based on the transforms of all parents of this 
    * DisplayObject in the display list.
    *
    * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until 
    * that happens this property will contain values based on the previous frame. Be mindful of this if
    * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.
    *
    * @property ***REMOVED***PIXI.Matrix***REMOVED*** worldTransform
    * @readOnly
    */
    this.worldTransform = new PIXI.Matrix();

    /**
    * The coordinates, in pixels, of this DisplayObject within the world.
    * 
    * This property contains the calculated total, based on the positions of all parents of this 
    * DisplayObject in the display list.
    *
    * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until 
    * that happens this property will contain values based on the previous frame. Be mindful of this if
    * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.
    * 
    * @property ***REMOVED***PIXI.Point***REMOVED*** worldPosition
    * @readOnly
    */
    this.worldPosition = new PIXI.Point(0, 0);

    /**
    * The global scale of this DisplayObject.
    * 
    * This property contains the calculated total, based on the scales of all parents of this 
    * DisplayObject in the display list.
    *
    * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until 
    * that happens this property will contain values based on the previous frame. Be mindful of this if
    * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.
    * 
    * @property ***REMOVED***PIXI.Point***REMOVED*** worldScale
    * @readOnly
    */
    this.worldScale = new PIXI.Point(1, 1);

    /**
    * The rotation, in radians, of this DisplayObject.
    * 
    * This property contains the calculated total, based on the rotations of all parents of this 
    * DisplayObject in the display list.
    *
    * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until 
    * that happens this property will contain values based on the previous frame. Be mindful of this if
    * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.
    * 
    * @property ***REMOVED***number***REMOVED*** worldRotation
    * @readOnly
    */
    this.worldRotation = 0;

    /**
    * The rectangular area used by filters when rendering a shader for this DisplayObject.
    *
    * @property ***REMOVED***PIXI.Rectangle***REMOVED*** filterArea
    * @type Rectangle
    * @default
    */
    this.filterArea = null;

    /**
    * @property ***REMOVED***number***REMOVED*** _sr - Cached rotation value.
    * @private
    */
    this._sr = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _cr - Cached rotation value.
    * @private
    */
    this._cr = 1;

    /**
    * @property ***REMOVED***PIXI.Rectangle***REMOVED*** _bounds - The cached bounds of this object.
    * @private
    */
    this._bounds = new PIXI.Rectangle(0, 0, 0, 0);

    /**
    * @property ***REMOVED***PIXI.Rectangle***REMOVED*** _currentBounds - The most recently calculated bounds of this object.
    * @private
    */
    this._currentBounds = null;

    /**
    * @property ***REMOVED***PIXI.Rectangle***REMOVED*** _mask - The cached mask of this object.
    * @private
    */
    this._mask = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _cacheAsBitmap - Internal cache as bitmap flag.
    * @private
    */
    this._cacheAsBitmap = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _cacheIsDirty - Internal dirty cache flag.
    * @private
    */
    this._cacheIsDirty = false;

***REMOVED***;

PIXI.DisplayObject.prototype.constructor = PIXI.DisplayObject;

PIXI.DisplayObject.prototype = ***REMOVED***

    /**
    * Destroy this DisplayObject.
    *
    * Removes any cached sprites, sets renderable flag to false, and nulls filters, bounds and mask.
    *
    * Also iteratively calls `destroy` on any children.
    *
    * @method PIXI.DisplayObject#destroy
    */
    destroy: function () ***REMOVED***

        if (this.children)
        ***REMOVED***
            var i = this.children.length;

            while (i--)
            ***REMOVED***
                this.children[i].destroy();
            ***REMOVED***

            this.children = [];
        ***REMOVED***

        this.hitArea = null;
        this.parent = null;
        this.worldTransform = null;
        this.filterArea = null;
        this.renderable = false;

        this._bounds = null;
        this._currentBounds = null;
        this._mask = null;

        this._destroyCachedSprite();

    ***REMOVED***,

    /*
    * Updates the transform matrix this DisplayObject uses for rendering.
    *
    * If the object has no parent, and no parent parameter is provided, it will default to 
    * Phaser.Game.World as the parent transform to use. If that is unavailable the transform fails to take place.
    *
    * The `parent` parameter has priority over the actual parent. Use it as a parent override.
    * Setting it does **not** change the actual parent of this DisplayObject.
    *
    * Calling this method updates the `worldTransform`, `worldAlpha`, `worldPosition`, `worldScale` 
    * and `worldRotation` properties.
    *
    * If a `transformCallback` has been specified, it is called at the end of this method, and is passed
    * the new, updated, worldTransform property, along with the parent transform used.
    *
    * @method PIXI.DisplayObject#updateTransform
    * @param ***REMOVED***PIXI.DisplayObjectContainer***REMOVED*** [parent] - Optional parent to calculate this DisplayObjects transform from.
    * @return ***REMOVED***PIXI.DisplayObject***REMOVED*** - A reference to this DisplayObject.
    */
    updateTransform: function (parent) ***REMOVED***

        if (!parent && !this.parent && !this.game)
        ***REMOVED***
            return this;
        ***REMOVED***

        var p = this.parent;

        if (parent)
        ***REMOVED***
            p = parent;
        ***REMOVED***
        else if (!this.parent)
        ***REMOVED***
            p = this.game.world;
        ***REMOVED***

        // create some matrix refs for easy access
        var pt = p.worldTransform;
        var wt = this.worldTransform;

        // temporary matrix variables
        var a, b, c, d, tx, ty;

        // so if rotation is between 0 then we can simplify the multiplication process..
        if (this.rotation % PIXI.PI_2)
        ***REMOVED***
            // check to see if the rotation is the same as the previous render. This means we only need to use sin and cos when rotation actually changes
            if (this.rotation !== this.rotationCache)
            ***REMOVED***
                this.rotationCache = this.rotation;
                this._sr = Math.sin(this.rotation);
                this._cr = Math.cos(this.rotation);
            ***REMOVED***

            // get the matrix values of the displayobject based on its transform properties..
            a  =  this._cr * this.scale.x;
            b  =  this._sr * this.scale.x;
            c  = -this._sr * this.scale.y;
            d  =  this._cr * this.scale.y;
            tx =  this.position.x;
            ty =  this.position.y;
            
            // check for pivot.. not often used so geared towards that fact!
            if (this.pivot.x || this.pivot.y)
            ***REMOVED***
                tx -= this.pivot.x * a + this.pivot.y * c;
                ty -= this.pivot.x * b + this.pivot.y * d;
            ***REMOVED***

            // concat the parent matrix with the objects transform.
            wt.a  = a  * pt.a + b  * pt.c;
            wt.b  = a  * pt.b + b  * pt.d;
            wt.c  = c  * pt.a + d  * pt.c;
            wt.d  = c  * pt.b + d  * pt.d;
            wt.tx = tx * pt.a + ty * pt.c + pt.tx;
            wt.ty = tx * pt.b + ty * pt.d + pt.ty;
        ***REMOVED***
        else
        ***REMOVED***
            // lets do the fast version as we know there is no rotation..
            a  = this.scale.x;
            d  = this.scale.y;

            tx = this.position.x - this.pivot.x * a;
            ty = this.position.y - this.pivot.y * d;

            wt.a  = a  * pt.a;
            wt.b  = a  * pt.b;
            wt.c  = d  * pt.c;
            wt.d  = d  * pt.d;
            wt.tx = tx * pt.a + ty * pt.c + pt.tx;
            wt.ty = tx * pt.b + ty * pt.d + pt.ty;
        ***REMOVED***

        //  Set the World values
        this.worldAlpha = this.alpha * p.worldAlpha;
        this.worldPosition.set(wt.tx, wt.ty);
        this.worldScale.set(this.scale.x * Math.sqrt(wt.a * wt.a + wt.c * wt.c), this.scale.y * Math.sqrt(wt.b * wt.b + wt.d * wt.d));
        this.worldRotation = Math.atan2(-wt.c, wt.d);

        // reset the bounds each time this is called!
        this._currentBounds = null;

        //  Custom callback?
        if (this.transformCallback)
        ***REMOVED***
            this.transformCallback.call(this.transformCallbackContext, wt, pt);
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * To be overridden by classes that require it.
    *
    * @method PIXI.DisplayObject#preUpdate
    */
    preUpdate: function () ***REMOVED***

    ***REMOVED***,

    /**
    * Generates a RenderTexture based on this DisplayObject, which can they be used to texture other Sprites.
    * This can be useful if your DisplayObject is static, or complicated, and needs to be reused multiple times.
    *
    * Please note that no garbage collection takes place on old textures. It is up to you to destroy old textures,
    * and references to them, so they don't linger in memory.
    *
    * @method PIXI.DisplayObject#generateTexture
    * @param ***REMOVED***number***REMOVED*** [resolution=1] - The resolution of the texture being generated.
    * @param ***REMOVED***number***REMOVED*** [scaleMode=PIXI.scaleModes.DEFAULT] - See ***REMOVED******REMOVED***#crossLink "PIXI/scaleModes:property"***REMOVED******REMOVED***PIXI.scaleModes***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** for possible values.
    * @param ***REMOVED***PIXI.CanvasRenderer|PIXI.WebGLRenderer***REMOVED*** renderer - The renderer used to generate the texture.
    * @return ***REMOVED***PIXI.RenderTexture***REMOVED*** - A RenderTexture containing an image of this DisplayObject at the time it was invoked.
    */
    generateTexture: function (resolution, scaleMode, renderer) ***REMOVED***

        var bounds = this.getLocalBounds();

        var renderTexture = new PIXI.RenderTexture(bounds.width | 0, bounds.height | 0, renderer, scaleMode, resolution);
        
        PIXI.DisplayObject._tempMatrix.tx = -bounds.x;
        PIXI.DisplayObject._tempMatrix.ty = -bounds.y;
        
        renderTexture.render(this, PIXI.DisplayObject._tempMatrix);

        return renderTexture;

    ***REMOVED***,

    /**
    * If this DisplayObject has a cached Sprite, this method generates and updates it.
    *
    * @method PIXI.DisplayObject#updateCache
    * @return ***REMOVED***PIXI.DisplayObject***REMOVED*** - A reference to this DisplayObject.
    */
    updateCache: function () ***REMOVED***

        this._generateCachedSprite();

        return this;

    ***REMOVED***,

    /**
    * Calculates the global position of this DisplayObject, based on the position given.
    *
    * @method PIXI.DisplayObject#toGlobal
    * @param ***REMOVED***PIXI.Point***REMOVED*** position - The global position to calculate from.
    * @return ***REMOVED***PIXI.Point***REMOVED*** - A point object representing the position of this DisplayObject based on the global position given.
    */
    toGlobal: function (position) ***REMOVED***

        this.updateTransform();

        return this.worldTransform.apply(position);

    ***REMOVED***,

    /**
    * Calculates the local position of this DisplayObject, relative to another point.
    *
    * @method PIXI.DisplayObject#toLocal
    * @param ***REMOVED***PIXI.Point***REMOVED*** position - The world origin to calculate from.
    * @param ***REMOVED***PIXI.DisplayObject***REMOVED*** [from] - An optional DisplayObject to calculate the global position from.
    * @return ***REMOVED***PIXI.Point***REMOVED*** - A point object representing the position of this DisplayObject based on the global position given.
    */
    toLocal: function (position, from) ***REMOVED***

        if (from)
        ***REMOVED***
            position = from.toGlobal(position);
        ***REMOVED***

        this.updateTransform();

        return this.worldTransform.applyInverse(position);

    ***REMOVED***,

    /**
    * Internal method.
    *
    * @method PIXI.DisplayObject#_renderCachedSprite
    * @private
    * @param ***REMOVED***Object***REMOVED*** renderSession - The render session
    */
    _renderCachedSprite: function (renderSession) ***REMOVED***

        this._cachedSprite.worldAlpha = this.worldAlpha;

        if (renderSession.gl)
        ***REMOVED***
            PIXI.Sprite.prototype._renderWebGL.call(this._cachedSprite, renderSession);
        ***REMOVED***
        else
        ***REMOVED***
            PIXI.Sprite.prototype._renderCanvas.call(this._cachedSprite, renderSession);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal method.
    *
    * @method PIXI.DisplayObject#_generateCachedSprite
    * @private
    */
    _generateCachedSprite: function () ***REMOVED***

        this._cacheAsBitmap = false;

        var bounds = this.getLocalBounds();

        //  Round it off and force non-zero dimensions
        bounds.width = Math.max(1, Math.ceil(bounds.width));
        bounds.height = Math.max(1, Math.ceil(bounds.height));

        this.updateTransform();

        if (!this._cachedSprite)
        ***REMOVED***
            var renderTexture = new PIXI.RenderTexture(bounds.width, bounds.height);
            this._cachedSprite = new PIXI.Sprite(renderTexture);
            this._cachedSprite.worldTransform = this.worldTransform;
        ***REMOVED***
        else
        ***REMOVED***
            this._cachedSprite.texture.resize(bounds.width, bounds.height);
        ***REMOVED***

        //  Remove filters
        var tempFilters = this._filters;

        this._filters = null;
        this._cachedSprite.filters = tempFilters;

        PIXI.DisplayObject._tempMatrix.tx = -bounds.x;
        PIXI.DisplayObject._tempMatrix.ty = -bounds.y;

        this._cachedSprite.texture.render(this, PIXI.DisplayObject._tempMatrix, true);
        this._cachedSprite.anchor.x = -(bounds.x / bounds.width);
        this._cachedSprite.anchor.y = -(bounds.y / bounds.height);

        this._filters = tempFilters;

        this._cacheAsBitmap = true;

    ***REMOVED***,

    /**
    * Destroys a cached Sprite.
    *
    * @method PIXI.DisplayObject#_destroyCachedSprite
    * @private
    */
    _destroyCachedSprite: function () ***REMOVED***

        if (!this._cachedSprite)
        ***REMOVED***
            return;
        ***REMOVED***

        this._cachedSprite.texture.destroy(true);

        this._cachedSprite = null;

    ***REMOVED***

***REMOVED***;

//  Alias for updateTransform. As used in DisplayObject container, etc.
PIXI.DisplayObject.prototype.displayObjectUpdateTransform = PIXI.DisplayObject.prototype.updateTransform;

Object.defineProperties(PIXI.DisplayObject.prototype, ***REMOVED***

    /**
    * The horizontal position of the DisplayObject, in pixels, relative to its parent.
    * If you need the world position of the DisplayObject, use `DisplayObject.worldPosition` instead.
    * @name PIXI.DisplayObject#x
    * @property ***REMOVED***number***REMOVED*** x - The horizontal position of the DisplayObject, in pixels, relative to its parent.
    */
    'x': ***REMOVED***

        get: function () ***REMOVED***

            return this.position.x;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            this.position.x = value;

        ***REMOVED***

    ***REMOVED***,

    /**
    * The vertical position of the DisplayObject, in pixels, relative to its parent.
    * If you need the world position of the DisplayObject, use `DisplayObject.worldPosition` instead.
    * @name PIXI.DisplayObject#y
    * @property ***REMOVED***number***REMOVED*** y - The vertical position of the DisplayObject, in pixels, relative to its parent.
    */
    'y': ***REMOVED***

        get: function () ***REMOVED***

            return this.position.y;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            this.position.y = value;

        ***REMOVED***

    ***REMOVED***,

    /**
    * Indicates if this DisplayObject is visible, based on it, and all of its parents, `visible` property values.
    * @name PIXI.DisplayObject#worldVisible
    * @property ***REMOVED***boolean***REMOVED*** worldVisible - Indicates if this DisplayObject is visible, based on it, and all of its parents, `visible` property values.
    */
    'worldVisible': ***REMOVED***

        get: function () ***REMOVED***

            if (!this.visible)
            ***REMOVED***
                return false;
            ***REMOVED***
            else
            ***REMOVED***
                var item = this.parent;

                if (!item)
                ***REMOVED***
                    return this.visible;
                ***REMOVED***
                else
                ***REMOVED***
                    do
                    ***REMOVED***
                        if (!item.visible)
                        ***REMOVED***
                            return false;
                        ***REMOVED***

                        item = item.parent;
                    ***REMOVED***
                    while (item);

                ***REMOVED***

                return true;
            ***REMOVED***

        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets a mask for this DisplayObject. A mask is an instance of a Graphics object.
    * When applied it limits the visible area of this DisplayObject to the shape of the mask.
    * Under a Canvas renderer it uses shape clipping. Under a WebGL renderer it uses a Stencil Buffer.
    * To remove a mask, set this property to `null`.
    * 
    * @name PIXI.DisplayObject#mask
    * @property ***REMOVED***PIXI.Graphics***REMOVED*** mask - The mask applied to this DisplayObject. Set to `null` to remove an existing mask.
    */
    'mask': ***REMOVED***

        get: function () ***REMOVED***

            return this._mask;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            if (this._mask)
            ***REMOVED***
                this._mask.isMask = false;
            ***REMOVED***

            this._mask = value;

            if (value)
            ***REMOVED***
                this._mask.isMask = true;
            ***REMOVED***

        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets the filters for this DisplayObject. This is a WebGL only feature, and is ignored by the Canvas
    * Renderer. A filter is a shader applied to this DisplayObject. You can modify the placement of the filter
    * using `DisplayObject.filterArea`.
    * 
    * To remove filters, set this property to `null`.
    *
    * Note: You cannot have a filter set, and a MULTIPLY Blend Mode active, at the same time. Setting a 
    * filter will reset this DisplayObjects blend mode to NORMAL.
    * 
    * @name PIXI.DisplayObject#filters
    * @property ***REMOVED***Array***REMOVED*** filters - An Array of PIXI.AbstractFilter objects, or objects that extend them.
    */
    'filters': ***REMOVED***

        get: function () ***REMOVED***

            return this._filters;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            if (Array.isArray(value))
            ***REMOVED***
                //  Put all the passes in one place.
                var passes = [];

                for (var i = 0; i < value.length; i++)
                ***REMOVED***
                    var filterPasses = value[i].passes;

                    for (var j = 0; j < filterPasses.length; j++)
                    ***REMOVED***
                        passes.push(filterPasses[j]);
                    ***REMOVED***
                ***REMOVED***

                //  Needed any more?
                this._filterBlock = ***REMOVED*** target: this, filterPasses: passes ***REMOVED***;
            ***REMOVED***

            this._filters = value;

            if (this.blendMode && this.blendMode === PIXI.blendModes.MULTIPLY)
            ***REMOVED***
                this.blendMode = PIXI.blendModes.NORMAL;
            ***REMOVED***

        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets if this DisplayObject should be cached as a bitmap.
    *
    * When invoked it will take a snapshot of the DisplayObject, as it is at that moment, and store it 
    * in a RenderTexture. This is then used whenever this DisplayObject is rendered. It can provide a
    * performance benefit for complex, but static, DisplayObjects. I.e. those with lots of children.
    *
    * Cached Bitmaps do not track their parents. If you update a property of this DisplayObject, it will not
    * re-generate the cached bitmap automatically. To do that you need to call `DisplayObject.updateCache`.
    * 
    * To remove a cached bitmap, set this property to `null`.
    * 
    * @name PIXI.DisplayObject#cacheAsBitmap
    * @property ***REMOVED***boolean***REMOVED*** cacheAsBitmap - Cache this DisplayObject as a Bitmap. Set to `null` to remove an existing cached bitmap.
    */
    'cacheAsBitmap': ***REMOVED***

        get: function () ***REMOVED***

            return this._cacheAsBitmap;

        ***REMOVED***,

        set: function (value) ***REMOVED***

            if (this._cacheAsBitmap === value)
            ***REMOVED***
                return;
            ***REMOVED***

            if (value)
            ***REMOVED***
                this._generateCachedSprite();
            ***REMOVED***
            else
            ***REMOVED***
                this._destroyCachedSprite();
            ***REMOVED***

            this._cacheAsBitmap = value;

        ***REMOVED***

    ***REMOVED***

***REMOVED***);
