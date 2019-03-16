/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* This is a stub for the Phaser ScaleManager.
* It allows you to exclude the default Scale Manager from your build, without making Game crash.
*/

Phaser.ScaleManager = function () ***REMOVED***

    /**
    * The bounds of the scaled game. The x/y will match the offset of the canvas element and the width/height the scaled width and height.
    * @property ***REMOVED***Phaser.Rectangle***REMOVED*** bounds
    * @readonly
    */
    this.bounds = new Phaser.Rectangle();
    
***REMOVED***;

Phaser.ScaleManager.prototype.boot = function () ***REMOVED******REMOVED***;
Phaser.ScaleManager.prototype.preUpdate = function () ***REMOVED******REMOVED***;
Phaser.ScaleManager.prototype.pauseUpdate = function () ***REMOVED******REMOVED***;
Phaser.ScaleManager.prototype.destroy = function () ***REMOVED******REMOVED***;

Phaser.ScaleManager.prototype.constructor = Phaser.ScaleManager;
