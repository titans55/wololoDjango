/* global Phaser:true */
/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

//  Pixi expects these globals to exist

if (PIXI.blendModes === undefined)
***REMOVED***
    PIXI.blendModes = Phaser.blendModes;
***REMOVED***

if (PIXI.scaleModes === undefined)
***REMOVED***
    PIXI.scaleModes = Phaser.scaleModes;
***REMOVED***

if (PIXI.Texture.emptyTexture === undefined)
***REMOVED***
    PIXI.Texture.emptyTexture = new PIXI.Texture(new PIXI.BaseTexture());
***REMOVED***

if (PIXI.DisplayObject._tempMatrix === undefined)
***REMOVED***
    PIXI.DisplayObject._tempMatrix = new PIXI.Matrix();
***REMOVED***

if (PIXI.RenderTexture.tempMatrix === undefined)
***REMOVED***
    PIXI.RenderTexture.tempMatrix = new PIXI.Matrix();
***REMOVED***

if (PIXI.Graphics && PIXI.Graphics.POLY === undefined)
***REMOVED***
    PIXI.Graphics.POLY = Phaser.POLYGON;
    PIXI.Graphics.RECT = Phaser.RECTANGLE;
    PIXI.Graphics.CIRC = Phaser.CIRCLE;
    PIXI.Graphics.ELIP = Phaser.ELLIPSE;
    PIXI.Graphics.RREC = Phaser.ROUNDEDRECTANGLE;
***REMOVED***

PIXI.TextureSilentFail = true;
