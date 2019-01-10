/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The BlurFilter applies a Gaussian blur to an object.
 * The strength of the blur can be set for x- and y-axis separately (always relative to the stage).
 *
 * @class BlurFilter
 * @extends AbstractFilter
 * @constructor
 */
PIXI.BlurFilter = function()
***REMOVED***
    this.blurXFilter = new PIXI.BlurXFilter();
    this.blurYFilter = new PIXI.BlurYFilter();

    this.passes =[this.blurXFilter, this.blurYFilter];
***REMOVED***;

PIXI.BlurFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.BlurFilter.prototype.constructor = PIXI.BlurFilter;

/**
 * Sets the strength of both the blurX and blurY properties simultaneously
 *
 * @property blur
 * @type Number
 * @default 2
 */
Object.defineProperty(PIXI.BlurFilter.prototype, 'blur', ***REMOVED***
    get: function() ***REMOVED***
        return this.blurXFilter.blur;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.blurXFilter.blur = this.blurYFilter.blur = value;
    ***REMOVED***
***REMOVED***);

/**
 * Sets the strength of the blurX property
 *
 * @property blurX
 * @type Number
 * @default 2
 */
Object.defineProperty(PIXI.BlurFilter.prototype, 'blurX', ***REMOVED***
    get: function() ***REMOVED***
        return this.blurXFilter.blur;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.blurXFilter.blur = value;
    ***REMOVED***
***REMOVED***);

/**
 * Sets the strength of the blurY property
 *
 * @property blurY
 * @type Number
 * @default 2
 */
Object.defineProperty(PIXI.BlurFilter.prototype, 'blurY', ***REMOVED***
    get: function() ***REMOVED***
        return this.blurYFilter.blur;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.blurYFilter.blur = value;
    ***REMOVED***
***REMOVED***);
