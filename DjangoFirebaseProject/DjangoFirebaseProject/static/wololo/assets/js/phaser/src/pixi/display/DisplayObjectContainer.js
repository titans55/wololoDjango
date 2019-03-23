/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A DisplayObjectContainer represents a collection of display objects.
 * It is the base class of all display objects that act as a container for other objects.
 *
 * @class DisplayObjectContainer
 * @extends DisplayObject
 * @constructor
 */
PIXI.DisplayObjectContainer = function () ***REMOVED***

    PIXI.DisplayObject.call(this);

    /**
     * [read-only] The array of children of this container.
     *
     * @property children
     * @type Array(DisplayObject)
     * @readOnly
     */
    this.children = [];

    /**
    * If `ignoreChildInput`  is `false` it will allow this objects _children_ to be considered as valid for Input events.
    * 
    * If this property is `true` then the children will _not_ be considered as valid for Input events.
    * 
    * Note that this property isn't recursive: only immediate children are influenced, it doesn't scan further down.
    * @property ***REMOVED***boolean***REMOVED*** ignoreChildInput
    * @default
    */
    this.ignoreChildInput = false;
    
***REMOVED***;

PIXI.DisplayObjectContainer.prototype = Object.create( PIXI.DisplayObject.prototype );
PIXI.DisplayObjectContainer.prototype.constructor = PIXI.DisplayObjectContainer;

/**
 * Adds a child to the container.
 *
 * @method addChild
 * @param child ***REMOVED***DisplayObject***REMOVED*** The DisplayObject to add to the container
 * @return ***REMOVED***DisplayObject***REMOVED*** The child that was added.
 */
PIXI.DisplayObjectContainer.prototype.addChild = function (child) ***REMOVED***

    return this.addChildAt(child, this.children.length);

***REMOVED***;

/**
 * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown
 *
 * @method addChildAt
 * @param child ***REMOVED***DisplayObject***REMOVED*** The child to add
 * @param index ***REMOVED***Number***REMOVED*** The index to place the child in
 * @return ***REMOVED***DisplayObject***REMOVED*** The child that was added.
 */
PIXI.DisplayObjectContainer.prototype.addChildAt = function (child, index) ***REMOVED***

    if (index >= 0 && index <= this.children.length)
    ***REMOVED***
        if (child.parent)
        ***REMOVED***
            child.parent.removeChild(child);
        ***REMOVED***

        child.parent = this;

        this.children.splice(index, 0, child);

        return child;
    ***REMOVED***
    else
    ***REMOVED***
        throw new Error(child + 'addChildAt: The index '+ index +' supplied is out of bounds ' + this.children.length);
    ***REMOVED***

***REMOVED***;

/**
 * Swaps the position of 2 Display Objects within this container.
 *
 * @method swapChildren
 * @param child ***REMOVED***DisplayObject***REMOVED***
 * @param child2 ***REMOVED***DisplayObject***REMOVED***
 */
PIXI.DisplayObjectContainer.prototype.swapChildren = function (child, child2) ***REMOVED***

    if (child === child2)
    ***REMOVED***
        return;
    ***REMOVED***

    var index1 = this.getChildIndex(child);
    var index2 = this.getChildIndex(child2);

    if (index1 < 0 || index2 < 0)
    ***REMOVED***
        throw new Error('swapChildren: Both the supplied DisplayObjects must be a child of the caller.');
    ***REMOVED***

    this.children[index1] = child2;
    this.children[index2] = child;

***REMOVED***;

/**
 * Returns the index position of a child DisplayObject instance
 *
 * @method getChildIndex
 * @param child ***REMOVED***DisplayObject***REMOVED*** The DisplayObject instance to identify
 * @return ***REMOVED***Number***REMOVED*** The index position of the child display object to identify
 */
PIXI.DisplayObjectContainer.prototype.getChildIndex = function (child) ***REMOVED***

    var index = this.children.indexOf(child);

    if (index === -1)
    ***REMOVED***
        throw new Error('The supplied DisplayObject must be a child of the caller');
    ***REMOVED***

    return index;

***REMOVED***;

/**
 * Changes the position of an existing child in the display object container
 *
 * @method setChildIndex
 * @param child ***REMOVED***DisplayObject***REMOVED*** The child DisplayObject instance for which you want to change the index number
 * @param index ***REMOVED***Number***REMOVED*** The resulting index number for the child display object
 */
PIXI.DisplayObjectContainer.prototype.setChildIndex = function (child, index) ***REMOVED***

    if (index < 0 || index >= this.children.length)
    ***REMOVED***
        throw new Error('The supplied index is out of bounds');
    ***REMOVED***

    var currentIndex = this.getChildIndex(child);

    this.children.splice(currentIndex, 1); //remove from old position
    this.children.splice(index, 0, child); //add at new position

***REMOVED***;

/**
 * Returns the child at the specified index
 *
 * @method getChildAt
 * @param index ***REMOVED***Number***REMOVED*** The index to get the child from
 * @return ***REMOVED***DisplayObject***REMOVED*** The child at the given index, if any.
 */
PIXI.DisplayObjectContainer.prototype.getChildAt = function (index) ***REMOVED***

    if (index < 0 || index >= this.children.length)
    ***REMOVED***
        throw new Error('getChildAt: Supplied index '+ index +' does not exist in the child list, or the supplied DisplayObject must be a child of the caller');
    ***REMOVED***

    return this.children[index];
    
***REMOVED***;

/**
 * Removes a child from the container.
 *
 * @method removeChild
 * @param child ***REMOVED***DisplayObject***REMOVED*** The DisplayObject to remove
 * @return ***REMOVED***DisplayObject***REMOVED*** The child that was removed.
 */
PIXI.DisplayObjectContainer.prototype.removeChild = function (child) ***REMOVED***

    var index = this.children.indexOf(child);

    if (index === -1)
    ***REMOVED***
        return;
    ***REMOVED***
    
    return this.removeChildAt(index);

***REMOVED***;

/**
 * Removes a child from the specified index position.
 *
 * @method removeChildAt
 * @param index ***REMOVED***Number***REMOVED*** The index to get the child from
 * @return ***REMOVED***DisplayObject***REMOVED*** The child that was removed.
 */
PIXI.DisplayObjectContainer.prototype.removeChildAt = function (index) ***REMOVED***

    var child = this.getChildAt(index);

    if (child)
    ***REMOVED***
        child.parent = undefined;

        this.children.splice(index, 1);
    ***REMOVED***

    return child;

***REMOVED***;

/**
* Removes all children from this container that are within the begin and end indexes.
*
* @method removeChildren
* @param beginIndex ***REMOVED***Number***REMOVED*** The beginning position. Default value is 0.
* @param endIndex ***REMOVED***Number***REMOVED*** The ending position. Default value is size of the container.
*/
PIXI.DisplayObjectContainer.prototype.removeChildren = function (beginIndex, endIndex) ***REMOVED***

    if (beginIndex === undefined) ***REMOVED*** beginIndex = 0; ***REMOVED***
    if (endIndex === undefined) ***REMOVED*** endIndex = this.children.length; ***REMOVED***

    var range = endIndex - beginIndex;

    if (range > 0 && range <= endIndex)
    ***REMOVED***
        var removed = this.children.splice(begin, range);

        for (var i = 0; i < removed.length; i++)
        ***REMOVED***
            var child = removed[i];
            child.parent = undefined;
        ***REMOVED***

        return removed;
    ***REMOVED***
    else if (range === 0 && this.children.length === 0)
    ***REMOVED***
        return [];
    ***REMOVED***
    else
    ***REMOVED***
        throw new Error( 'removeChildren: Range Error, numeric values are outside the acceptable range' );
    ***REMOVED***

***REMOVED***;

/*
 * Updates the transform on all children of this container for rendering
 *
 * @method updateTransform
 * @private
 */
PIXI.DisplayObjectContainer.prototype.updateTransform = function () ***REMOVED***

    if (!this.visible)
    ***REMOVED***
        return;
    ***REMOVED***

    this.displayObjectUpdateTransform();

    if (this._cacheAsBitmap)
    ***REMOVED***
        return;
    ***REMOVED***

    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        this.children[i].updateTransform();
    ***REMOVED***

***REMOVED***;

// performance increase to avoid using call.. (10x faster)
PIXI.DisplayObjectContainer.prototype.displayObjectContainerUpdateTransform = PIXI.DisplayObjectContainer.prototype.updateTransform;

/**
 * Retrieves the global bounds of the displayObjectContainer as a rectangle. The bounds calculation takes all visible children into consideration.
 *
 * @method getBounds
 * @param ***REMOVED***PIXI.DisplayObject|PIXI.Matrix***REMOVED*** [targetCoordinateSpace] Returns a rectangle that defines the area of the display object relative to the coordinate system of the targetCoordinateSpace object.
 * @return ***REMOVED***Rectangle***REMOVED*** The rectangular bounding area
 */
PIXI.DisplayObjectContainer.prototype.getBounds = function (targetCoordinateSpace) ***REMOVED***

    var isTargetCoordinateSpaceDisplayObject = (targetCoordinateSpace && targetCoordinateSpace instanceof PIXI.DisplayObject);
    var isTargetCoordinateSpaceThisOrParent = true;

    if (!isTargetCoordinateSpaceDisplayObject) 
	***REMOVED***
        targetCoordinateSpace = this;
    ***REMOVED*** 
	else if (targetCoordinateSpace instanceof PIXI.DisplayObjectContainer) 
	***REMOVED***
        isTargetCoordinateSpaceThisOrParent = targetCoordinateSpace.contains(this);
    ***REMOVED*** 
	else 
	***REMOVED***
        isTargetCoordinateSpaceThisOrParent = false;
    ***REMOVED***

    var i;

    if (isTargetCoordinateSpaceDisplayObject)
    ***REMOVED***
        var matrixCache = targetCoordinateSpace.worldTransform;

        targetCoordinateSpace.worldTransform = PIXI.identityMatrix;

        for (i = 0; i < targetCoordinateSpace.children.length; i++) 
		***REMOVED***
            targetCoordinateSpace.children[i].updateTransform();
        ***REMOVED***
    ***REMOVED***

    var minX = Infinity;
    var minY = Infinity;

    var maxX = -Infinity;
    var maxY = -Infinity;

    var childBounds;
    var childMaxX;
    var childMaxY;

    var childVisible = false;

    for (i = 0; i < this.children.length; i++)
    ***REMOVED***
        var child = this.children[i];

        if (!child.visible)
        ***REMOVED***
            continue;
        ***REMOVED***

        childVisible = true;

        childBounds = this.children[i].getBounds();

        minX = (minX < childBounds.x) ? minX : childBounds.x;
        minY = (minY < childBounds.y) ? minY : childBounds.y;

        childMaxX = childBounds.width + childBounds.x;
        childMaxY = childBounds.height + childBounds.y;

        maxX = (maxX > childMaxX) ? maxX : childMaxX;
        maxY = (maxY > childMaxY) ? maxY : childMaxY;
    ***REMOVED***

    var bounds = this._bounds;

    if (!childVisible) 
	***REMOVED***
        bounds = new PIXI.Rectangle();

        var w0 = bounds.x;
        var w1 = bounds.width + bounds.x;

        var h0 = bounds.y;
        var h1 = bounds.height + bounds.y;

        var worldTransform = this.worldTransform;

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

        var x4 = a * w1 + c * h0 + tx;
        var y4 = d * h0 + b * w1 + ty;

        maxX = x1;
        maxY = y1;

        minX = x1;
        minY = y1;

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
    ***REMOVED***

    bounds.x = minX;
    bounds.y = minY;
    bounds.width = maxX - minX;
    bounds.height = maxY - minY;

    if (isTargetCoordinateSpaceDisplayObject) 
	***REMOVED***
        targetCoordinateSpace.worldTransform = matrixCache;

        for (i = 0; i < targetCoordinateSpace.children.length; i++) 
		***REMOVED***
            targetCoordinateSpace.children[i].updateTransform();
        ***REMOVED***
    ***REMOVED***

    if (!isTargetCoordinateSpaceThisOrParent) 
	***REMOVED***
        var targetCoordinateSpaceBounds = targetCoordinateSpace.getBounds();

        bounds.x -= targetCoordinateSpaceBounds.x;
        bounds.y -= targetCoordinateSpaceBounds.y;
    ***REMOVED***

    return bounds;

***REMOVED***;

/**
 * Retrieves the non-global local bounds of the displayObjectContainer as a rectangle without any transformations. The calculation takes all visible children into consideration.
 *
 * @method getLocalBounds
 * @return ***REMOVED***Rectangle***REMOVED*** The rectangular bounding area
 */
PIXI.DisplayObjectContainer.prototype.getLocalBounds = function () ***REMOVED***

    return this.getBounds(this);

***REMOVED***;

/**
* Determines whether the specified display object is a child of the DisplayObjectContainer instance or the instance itself.
*
* @method contains
* @param ***REMOVED***DisplayObject***REMOVED*** child
* @returns ***REMOVED***boolean***REMOVED***
*/
PIXI.DisplayObjectContainer.prototype.contains = function (child) ***REMOVED***

    if (!child)
    ***REMOVED***
        return false;
    ***REMOVED***
    else if (child === this) 
	***REMOVED***
        return true;
    ***REMOVED***
    else 
	***REMOVED***
        return this.contains(child.parent);
    ***REMOVED***
***REMOVED***;

/**
* Renders the object using the WebGL renderer
*
* @method _renderWebGL
* @param renderSession ***REMOVED***RenderSession***REMOVED*** 
* @private
*/
PIXI.DisplayObjectContainer.prototype._renderWebGL = function (renderSession) ***REMOVED***

    if (!this.visible || this.alpha <= 0)
    ***REMOVED***
        return;
    ***REMOVED***
    
    if (this._cacheAsBitmap)
    ***REMOVED***
        this._renderCachedSprite(renderSession);
        return;
    ***REMOVED***
    
    var i;

    if (this._mask || this._filters)
    ***REMOVED***
        // push filter first as we need to ensure the stencil buffer is correct for any masking
        if (this._filters)
        ***REMOVED***
            renderSession.spriteBatch.flush();
            renderSession.filterManager.pushFilter(this._filterBlock);
        ***REMOVED***

        if (this._mask)
        ***REMOVED***
            renderSession.spriteBatch.stop();
            renderSession.maskManager.pushMask(this.mask, renderSession);
            renderSession.spriteBatch.start();
        ***REMOVED***

        // simple render children!
        for (i = 0; i < this.children.length; i++)
        ***REMOVED***
            this.children[i]._renderWebGL(renderSession);
        ***REMOVED***

        renderSession.spriteBatch.stop();

        if (this._mask) renderSession.maskManager.popMask(this._mask, renderSession);
        if (this._filters) renderSession.filterManager.popFilter();
        
        renderSession.spriteBatch.start();
    ***REMOVED***
    else
    ***REMOVED***
        // simple render children!
        for (i = 0; i < this.children.length; i++)
        ***REMOVED***
            this.children[i]._renderWebGL(renderSession);
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* Renders the object using the Canvas renderer
*
* @method _renderCanvas
* @param renderSession ***REMOVED***RenderSession***REMOVED*** 
* @private
*/
PIXI.DisplayObjectContainer.prototype._renderCanvas = function (renderSession) ***REMOVED***

    if (this.visible === false || this.alpha === 0)
    ***REMOVED***
        return;
    ***REMOVED***

    if (this._cacheAsBitmap)
    ***REMOVED***
        this._renderCachedSprite(renderSession);
        return;
    ***REMOVED***

    if (this._mask)
    ***REMOVED***
        renderSession.maskManager.pushMask(this._mask, renderSession);
    ***REMOVED***

    for (var i = 0; i < this.children.length; i++)
    ***REMOVED***
        this.children[i]._renderCanvas(renderSession);
    ***REMOVED***

    if (this._mask)
    ***REMOVED***
        renderSession.maskManager.popMask(renderSession);
    ***REMOVED***

***REMOVED***;

/**
 * The width of the displayObjectContainer, setting this will actually modify the scale to achieve the value set
 *
 * @property width
 * @type Number
 */
Object.defineProperty(PIXI.DisplayObjectContainer.prototype, 'width', ***REMOVED***

    get: function() ***REMOVED***
        return this.getLocalBounds().width * this.scale.x;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        
        var width = this.getLocalBounds().width;

        if (width !== 0)
        ***REMOVED***
            this.scale.x = value / width;
        ***REMOVED***
        else
        ***REMOVED***
            this.scale.x = 1;
        ***REMOVED***
        
        this._width = value;
    ***REMOVED***
***REMOVED***);

/**
 * The height of the displayObjectContainer, setting this will actually modify the scale to achieve the value set
 *
 * @property height
 * @type Number
 */
Object.defineProperty(PIXI.DisplayObjectContainer.prototype, 'height', ***REMOVED***

    get: function() ***REMOVED***
        return this.getLocalBounds().height * this.scale.y;
    ***REMOVED***,

    set: function(value) ***REMOVED***

        var height = this.getLocalBounds().height;

        if (height !== 0)
        ***REMOVED***
            this.scale.y = value / height;
        ***REMOVED***
        else
        ***REMOVED***
            this.scale.y = 1;
        ***REMOVED***

        this._height = value;
    ***REMOVED***

***REMOVED***);

