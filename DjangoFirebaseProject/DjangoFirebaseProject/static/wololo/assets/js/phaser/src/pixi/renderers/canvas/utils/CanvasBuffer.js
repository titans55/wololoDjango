/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * Creates a Canvas element of the given size.
 *
 * @class CanvasBuffer
 * @constructor
 * @param width ***REMOVED***Number***REMOVED*** the width for the newly created canvas
 * @param height ***REMOVED***Number***REMOVED*** the height for the newly created canvas
 */
PIXI.CanvasBuffer = function(width, height)
***REMOVED***
    /**
     * The width of the Canvas in pixels.
     *
     * @property width
     * @type Number
     */
    this.width = width;

    /**
     * The height of the Canvas in pixels.
     *
     * @property height
     * @type Number
     */
    this.height = height;

    /**
     * The Canvas object that belongs to this CanvasBuffer.
     *
     * @property canvas
     * @type HTMLCanvasElement
     */
    this.canvas = PIXI.CanvasPool.create(this, this.width, this.height);

    /**
     * A CanvasRenderingContext2D object representing a two-dimensional rendering context.
     *
     * @property context
     * @type CanvasRenderingContext2D
     */
    this.context = this.canvas.getContext("2d");

    this.canvas.width = width;
    this.canvas.height = height;
***REMOVED***;

PIXI.CanvasBuffer.prototype.constructor = PIXI.CanvasBuffer;

/**
 * Clears the canvas that was created by the CanvasBuffer class.
 *
 * @method clear
 * @private
 */
PIXI.CanvasBuffer.prototype.clear = function()
***REMOVED***
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0,0, this.width, this.height);
***REMOVED***;

/**
 * Resizes the canvas to the specified width and height.
 *
 * @method resize
 * @param width ***REMOVED***Number***REMOVED*** the new width of the canvas
 * @param height ***REMOVED***Number***REMOVED*** the new height of the canvas
 */
PIXI.CanvasBuffer.prototype.resize = function(width, height)
***REMOVED***
    this.width = this.canvas.width = width;
    this.height = this.canvas.height = height;
***REMOVED***;

/**
 * Frees the canvas up for use again.
 *
 * @method destroy
 */
PIXI.CanvasBuffer.prototype.destroy = function()
***REMOVED***
    PIXI.CanvasPool.remove(this);
***REMOVED***;
