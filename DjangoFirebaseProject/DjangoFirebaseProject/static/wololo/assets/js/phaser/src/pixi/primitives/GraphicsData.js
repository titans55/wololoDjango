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