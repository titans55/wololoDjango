/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A set of functions used to handle masking.
 *
 * @class CanvasMaskManager
 * @constructor
 */
PIXI.CanvasMaskManager = function()
***REMOVED***
***REMOVED***;

PIXI.CanvasMaskManager.prototype.constructor = PIXI.CanvasMaskManager;

/**
 * This method adds it to the current stack of masks.
 *
 * @method pushMask
 * @param maskData ***REMOVED***Object***REMOVED*** the maskData that will be pushed
 * @param renderSession ***REMOVED***Object***REMOVED*** The renderSession whose context will be used for this mask manager.
 */
PIXI.CanvasMaskManager.prototype.pushMask = function(maskData, renderSession) ***REMOVED***

	var context = renderSession.context;

    context.save();
    
    var cacheAlpha = maskData.alpha;
    var transform = maskData.worldTransform;

    var resolution = renderSession.resolution;

    context.setTransform(transform.a * resolution,
                         transform.b * resolution,
                         transform.c * resolution,
                         transform.d * resolution,
                         transform.tx * resolution,
                         transform.ty * resolution);

    PIXI.CanvasGraphics.renderGraphicsMask(maskData, context);

    context.clip();

    maskData.worldAlpha = cacheAlpha;
***REMOVED***;

/**
 * Restores the current drawing context to the state it was before the mask was applied.
 *
 * @method popMask
 * @param renderSession ***REMOVED***Object***REMOVED*** The renderSession whose context will be used for this mask manager.
 */
PIXI.CanvasMaskManager.prototype.popMask = function(renderSession)
***REMOVED***
    renderSession.context.restore();
***REMOVED***;
