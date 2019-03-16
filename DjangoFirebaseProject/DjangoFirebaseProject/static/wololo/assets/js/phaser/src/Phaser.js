/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* @namespace Phaser
*/
var Phaser = Phaser || ***REMOVED***    // jshint ignore:line

    /**
    * The Phaser version number.
    * @constant
    * @type ***REMOVED***string***REMOVED***
    */
    VERSION: '2.6.2',

    /**
    * An array of Phaser game instances.
    * @constant
    * @type ***REMOVED***array***REMOVED***
    */
    GAMES: [],

    /**
    * AUTO renderer - picks between WebGL or Canvas based on device.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    AUTO: 0,

    /**
    * Canvas Renderer.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    CANVAS: 1,

    /**
    * WebGL Renderer.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    WEBGL: 2,

    /**
    * Headless renderer (not visual output)
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    HEADLESS: 3,

    /**
    * Direction constant.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    NONE: 0,

    /**
    * Direction constant.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    LEFT: 1,

    /**
    * Direction constant.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    RIGHT: 2,

    /**
    * Direction constant.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    UP: 3,

    /**
    * Direction constant.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    DOWN: 4,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    SPRITE: 0,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    BUTTON: 1,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    IMAGE: 2,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    GRAPHICS: 3,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    TEXT: 4,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    TILESPRITE: 5,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    BITMAPTEXT: 6,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    GROUP: 7,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    RENDERTEXTURE: 8,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    TILEMAP: 9,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    TILEMAPLAYER: 10,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    EMITTER: 11,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    POLYGON: 12,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    BITMAPDATA: 13,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    CANVAS_FILTER: 14,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    WEBGL_FILTER: 15,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    ELLIPSE: 16,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    SPRITEBATCH: 17,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    RETROFONT: 18,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    POINTER: 19,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    ROPE: 20,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    CIRCLE: 21,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    RECTANGLE: 22,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    LINE: 23,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    MATRIX: 24,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    POINT: 25,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    ROUNDEDRECTANGLE: 26,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    CREATURE: 27,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    VIDEO: 28,

    /**
    * Game Object type.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    PENDING_ATLAS: -1,

    /**
    * A horizontal orientation
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    HORIZONTAL: 0,

    /**
    * A vertical orientation
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    VERTICAL: 1,

    /**
    * A landscape orientation
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    LANDSCAPE: 0,

    /**
    * A portrait orientation
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    PORTRAIT: 1,

    /**
    * The Angle (in degrees) a Game Object needs to be set to in order to face up.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    ANGLE_UP: 270,

    /**
    * The Angle (in degrees) a Game Object needs to be set to in order to face down.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    ANGLE_DOWN: 90,

    /**
    * The Angle (in degrees) a Game Object needs to be set to in order to face left.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    ANGLE_LEFT: 180,

    /**
    * The Angle (in degrees) a Game Object needs to be set to in order to face right.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    ANGLE_RIGHT: 0,

    /**
    * The Angle (in degrees) a Game Object needs to be set to in order to face north east.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    ANGLE_NORTH_EAST: 315,

    /**
    * The Angle (in degrees) a Game Object needs to be set to in order to face north west.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    ANGLE_NORTH_WEST: 225,

    /**
    * The Angle (in degrees) a Game Object needs to be set to in order to face south east.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    ANGLE_SOUTH_EAST: 45,

    /**
    * The Angle (in degrees) a Game Object needs to be set to in order to face south west.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    ANGLE_SOUTH_WEST: 135,

    /**
    * A constant representing a top-left alignment or position.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    TOP_LEFT: 0,

    /**
    * A constant representing a top-center alignment or position.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    TOP_CENTER: 1,

    /**
    * A constant representing a top-right alignment or position.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    TOP_RIGHT: 2,

    /**
    * A constant representing a left-top alignment or position.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    LEFT_TOP: 3,

    /**
    * A constant representing a left-center alignment or position.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    LEFT_CENTER: 4,

    /**
    * A constant representing a left-bottom alignment or position.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    LEFT_BOTTOM: 5,

    /**
    * A constant representing a center alignment or position.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    CENTER: 6,

    /**
    * A constant representing a right-top alignment or position.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    RIGHT_TOP: 7,

    /**
    * A constant representing a right-center alignment or position.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    RIGHT_CENTER: 8,

    /**
    * A constant representing a right-bottom alignment or position.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    RIGHT_BOTTOM: 9,

    /**
    * A constant representing a bottom-left alignment or position.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    BOTTOM_LEFT: 10,

    /**
    * A constant representing a bottom-center alignment or position.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    BOTTOM_CENTER: 11,

    /**
    * A constant representing a bottom-right alignment or position.
    * @constant
    * @type ***REMOVED***integer***REMOVED***
    */
    BOTTOM_RIGHT: 12,

    /**
     * Various blend modes supported by Pixi.
     * 
     * IMPORTANT: The WebGL renderer only supports the NORMAL, ADD, MULTIPLY and SCREEN blend modes.
     * 
     * @constant
     * @property ***REMOVED***Number***REMOVED*** blendModes.NORMAL
     * @property ***REMOVED***Number***REMOVED*** blendModes.ADD
     * @property ***REMOVED***Number***REMOVED*** blendModes.MULTIPLY
     * @property ***REMOVED***Number***REMOVED*** blendModes.SCREEN
     * @property ***REMOVED***Number***REMOVED*** blendModes.OVERLAY
     * @property ***REMOVED***Number***REMOVED*** blendModes.DARKEN
     * @property ***REMOVED***Number***REMOVED*** blendModes.LIGHTEN
     * @property ***REMOVED***Number***REMOVED*** blendModes.COLOR_DODGE
     * @property ***REMOVED***Number***REMOVED*** blendModes.COLOR_BURN
     * @property ***REMOVED***Number***REMOVED*** blendModes.HARD_LIGHT
     * @property ***REMOVED***Number***REMOVED*** blendModes.SOFT_LIGHT
     * @property ***REMOVED***Number***REMOVED*** blendModes.DIFFERENCE
     * @property ***REMOVED***Number***REMOVED*** blendModes.EXCLUSION
     * @property ***REMOVED***Number***REMOVED*** blendModes.HUE
     * @property ***REMOVED***Number***REMOVED*** blendModes.SATURATION
     * @property ***REMOVED***Number***REMOVED*** blendModes.COLOR
     * @property ***REMOVED***Number***REMOVED*** blendModes.LUMINOSITY
     * @static
     */
    blendModes: ***REMOVED***
        NORMAL:0,
        ADD:1,
        MULTIPLY:2,
        SCREEN:3,
        OVERLAY:4,
        DARKEN:5,
        LIGHTEN:6,
        COLOR_DODGE:7,
        COLOR_BURN:8,
        HARD_LIGHT:9,
        SOFT_LIGHT:10,
        DIFFERENCE:11,
        EXCLUSION:12,
        HUE:13,
        SATURATION:14,
        COLOR:15,
        LUMINOSITY:16
    ***REMOVED***,

    /**
     * The scale modes that are supported by Pixi.
     *
     * The DEFAULT scale mode affects the default scaling mode of future operations.
     * It can be re-assigned to either LINEAR or NEAREST, depending upon suitability.
     *
     * @constant
     * @property ***REMOVED***Object***REMOVED*** Phaser.scaleModes
     * @property ***REMOVED***Number***REMOVED*** scaleModes.DEFAULT=LINEAR
     * @property ***REMOVED***Number***REMOVED*** scaleModes.LINEAR Smooth scaling
     * @property ***REMOVED***Number***REMOVED*** scaleModes.NEAREST Pixelating scaling
     * @static
     */
    scaleModes: ***REMOVED***
        DEFAULT:0,
        LINEAR:0,
        NEAREST:1
    ***REMOVED***,

    PIXI: PIXI || ***REMOVED******REMOVED***

***REMOVED***;
