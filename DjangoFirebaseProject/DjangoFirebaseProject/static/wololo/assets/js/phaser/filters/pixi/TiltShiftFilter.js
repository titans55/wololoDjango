/**
 * @author Vico @vicocotea
 * original filter https://github.com/evanw/glfx.js/blob/master/src/filters/blur/tiltshift.js by Evan Wallace : http://madebyevan.com/
 */

/**
 * A TiltShift Filter. Manages the pass of both a TiltShiftXFilter and TiltShiftYFilter.
 * 
 * @class TiltShiftFilter
 * @constructor
 */
PIXI.TiltShiftFilter = function()
***REMOVED***
    this.tiltShiftXFilter = new PIXI.TiltShiftXFilter();
    this.tiltShiftYFilter = new PIXI.TiltShiftYFilter();
    this.tiltShiftXFilter.updateDelta();
    this.tiltShiftXFilter.updateDelta();

    this.passes = [this.tiltShiftXFilter, this.tiltShiftYFilter];
***REMOVED***;

PIXI.TiltShiftFilter.prototype.constructor = PIXI.TiltShiftFilter;

/**
 * The strength of the blur.
 *
 * @property blur
 * @type Number
 */
Object.defineProperty(PIXI.TiltShiftFilter.prototype, 'blur', ***REMOVED***
    get: function() ***REMOVED***
        return this.tiltShiftXFilter.blur;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.tiltShiftXFilter.blur = this.tiltShiftYFilter.blur = value;
    ***REMOVED***
***REMOVED***);

/**
 * The strength of the gradient blur.
 *
 * @property gradientBlur
 * @type Number
 */
Object.defineProperty(PIXI.TiltShiftFilter.prototype, 'gradientBlur', ***REMOVED***
    get: function() ***REMOVED***
        return this.tiltShiftXFilter.gradientBlur;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.tiltShiftXFilter.gradientBlur = this.tiltShiftYFilter.gradientBlur = value;
    ***REMOVED***
***REMOVED***);

/**
 * The Y value to start the effect at.
 *
 * @property start
 * @type Number
 */
Object.defineProperty(PIXI.TiltShiftFilter.prototype, 'start', ***REMOVED***
    get: function() ***REMOVED***
        return this.tiltShiftXFilter.start;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.tiltShiftXFilter.start = this.tiltShiftYFilter.start = value;
    ***REMOVED***
***REMOVED***);

/**
 * The Y value to end the effect at.
 *
 * @property end
 * @type Number
 */
Object.defineProperty(PIXI.TiltShiftFilter.prototype, 'end', ***REMOVED***
    get: function() ***REMOVED***
        return this.tiltShiftXFilter.end;
    ***REMOVED***,
    set: function(value) ***REMOVED***
        this.tiltShiftXFilter.end = this.tiltShiftYFilter.end = value;
    ***REMOVED***
***REMOVED***);
