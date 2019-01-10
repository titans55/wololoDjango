/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * The [pixi.js](http://www.pixijs.com/) module/namespace.
 *
 * @module PIXI
 */
 
/**
 * Namespace-class for [pixi.js](http://www.pixijs.com/).
 *
 * Contains assorted static properties and enumerations.
 *
 * @class PIXI
 * @static
 */
var PIXI = PIXI || ***REMOVED******REMOVED***;

/**
 * A reference to the Phaser Game instance that owns this Pixi renderer.
 * @property ***REMOVED***Phaser.Game***REMOVED*** game
 * @static 
 */
PIXI.game = null;

/**
 * @property ***REMOVED***Number***REMOVED*** WEBGL_RENDERER
 * @protected
 * @static 
 */
PIXI.WEBGL_RENDERER = 0;

/**
 * @property ***REMOVED***Number***REMOVED*** CANVAS_RENDERER
 * @protected
 * @static
 */
PIXI.CANVAS_RENDERER = 1;

/**
 * Version of pixi that is loaded.
 * @property ***REMOVED***String***REMOVED*** VERSION
 * @static 
 */
PIXI.VERSION = "v2.2.9";

// used to create uids for various pixi objects.
PIXI._UID = 0;

if (typeof(Float32Array) != 'undefined')
***REMOVED***
    PIXI.Float32Array = Float32Array;
    PIXI.Uint16Array = Uint16Array;

    // Uint32Array and ArrayBuffer only used by WebGL renderer
    // We can suppose that if WebGL is supported then typed arrays are supported too
    // as they predate WebGL support for all browsers:
    // see typed arrays support: http://caniuse.com/#search=TypedArrays
    // see WebGL support: http://caniuse.com/#search=WebGL
    PIXI.Uint32Array = Uint32Array;
    PIXI.ArrayBuffer = ArrayBuffer;
***REMOVED***
else
***REMOVED***
    PIXI.Float32Array = Array;
    PIXI.Uint16Array = Array;
***REMOVED***

/**
 * @property ***REMOVED***Number***REMOVED*** PI_2
 * @static
 */
PIXI.PI_2 = Math.PI * 2;

/**
 * @property ***REMOVED***Number***REMOVED*** RAD_TO_DEG
 * @static
 */
PIXI.RAD_TO_DEG = 180 / Math.PI;

/**
 * @property ***REMOVED***Number***REMOVED*** DEG_TO_RAD
 * @static
 */
PIXI.DEG_TO_RAD = Math.PI / 180;

/**
 * @property ***REMOVED***String***REMOVED*** RETINA_PREFIX
 * @protected
 * @static
 */
PIXI.RETINA_PREFIX = "@2x";

/**
 * The default render options if none are supplied to
 * ***REMOVED******REMOVED***#crossLink "WebGLRenderer"***REMOVED******REMOVED******REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** or ***REMOVED******REMOVED***#crossLink "CanvasRenderer"***REMOVED******REMOVED******REMOVED******REMOVED***/crossLink***REMOVED******REMOVED***.
 *
 * @property ***REMOVED***Object***REMOVED*** defaultRenderOptions
 * @property ***REMOVED***Object***REMOVED*** defaultRenderOptions.view=null
 * @property ***REMOVED***Boolean***REMOVED*** defaultRenderOptions.transparent=false
 * @property ***REMOVED***Boolean***REMOVED*** defaultRenderOptions.antialias=false
 * @property ***REMOVED***Boolean***REMOVED*** defaultRenderOptions.preserveDrawingBuffer=false
 * @property ***REMOVED***Number***REMOVED*** defaultRenderOptions.resolution=1
 * @property ***REMOVED***Boolean***REMOVED*** defaultRenderOptions.clearBeforeRender=true
 * @property ***REMOVED***Boolean***REMOVED*** defaultRenderOptions.autoResize=false
 * @static
PIXI.defaultRenderOptions = ***REMOVED***
    view: null,
    transparent: false,
    antialias: false, 
    preserveDrawingBuffer: false,
    resolution: 1,
    clearBeforeRender: true,
    autoResize: false
***REMOVED***;
 */
