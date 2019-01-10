/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * This is the base class for creating a PIXI filter. Currently only webGL supports filters.
 * If you want to make a custom filter this should be your base class.
 * 
 * @class AbstractFilter
 * @constructor
 * @param fragmentSrc ***REMOVED***Array***REMOVED*** The fragment source in an array of strings.
 * @param uniforms ***REMOVED***Object***REMOVED*** An object containing the uniforms for this filter.
 */
PIXI.AbstractFilter = function(fragmentSrc, uniforms)
***REMOVED***
    /**
    * An array of passes - some filters contain a few steps this array simply stores the steps in a liniear fashion.
    * For example the blur filter has two passes blurX and blurY.
    * @property passes
    * @type Array
    * @private
    */
    this.passes = [this];

    /**
    * @property shaders
    * @type Array
    * @private
    */
    this.shaders = [];
    
    /**
    * @property dirty
    * @type Boolean
    */
    this.dirty = true;

    /**
    * @property padding
    * @type Number
    */
    this.padding = 0;

    /**
    * @property uniforms
    * @type Object
    * @private
    */
    this.uniforms = uniforms || ***REMOVED******REMOVED***;

    /**
    * @property fragmentSrc
    * @type Array
    * @private
    */
    this.fragmentSrc = fragmentSrc || [];
***REMOVED***;

PIXI.AbstractFilter.prototype.constructor = PIXI.AbstractFilter;

/**
 * Syncs the uniforms between the class object and the shaders.
 *
 * @method syncUniforms
 */
PIXI.AbstractFilter.prototype.syncUniforms = function()
***REMOVED***
    for(var i=0,j=this.shaders.length; i<j; i++)
    ***REMOVED***
        this.shaders[i].dirty = true;
    ***REMOVED***
***REMOVED***;
