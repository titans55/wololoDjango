/**
* @author       Steven Rogers <soldoutactivist@gmail.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* This is a stub for the Phaser Debug Class.
* It allows you to exclude the default Debug from your build, without making Game crash.
*/

var debugNoop = function () ***REMOVED******REMOVED***;

Phaser.Utils.Debug = debugNoop;

Phaser.Utils.Debug.prototype = ***REMOVED***
    isDisabled: true,

    boot: debugNoop,
    preUpdate: debugNoop,
    reset: debugNoop,
    start: debugNoop,
    stop: debugNoop,
    line: debugNoop,
    soundInfo: debugNoop,
    cameraInfo: debugNoop,
    timer: debugNoop,
    pointer: debugNoop,
    spriteInputInfo: debugNoop,
    key: debugNoop,
    inputInfo: debugNoop,
    spriteBounds: debugNoop,
    ropeSegments: debugNoop,
    spriteInfo: debugNoop,
    spriteCoords: debugNoop,
    lineInfo: debugNoop,
    pixel: debugNoop,
    geom: debugNoop,
    rectangle: debugNoop,
    text: debugNoop,
    quadTree: debugNoop,
    body: debugNoop,
    bodyInfo: debugNoop,
    box2dWorld: debugNoop,
    box2dBody: debugNoop
***REMOVED***;

Phaser.Utils.Debug.prototype.constructor = Phaser.Utils.Debug;
