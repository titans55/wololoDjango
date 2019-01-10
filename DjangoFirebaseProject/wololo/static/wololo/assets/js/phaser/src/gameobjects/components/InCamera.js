/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The InCamera component checks if the Game Object intersects with the Game Camera.
*
* @class
*/
Phaser.Component.InCamera = function () ***REMOVED******REMOVED***;

Phaser.Component.InCamera.prototype = ***REMOVED***

    /**
    * Checks if this Game Objects bounds intersects with the Game Cameras bounds.
    * 
    * It will be `true` if they intersect, or `false` if the Game Object is fully outside of the Cameras bounds.
    * 
    * An object outside the bounds can be considered for camera culling if it has the AutoCull component.
    *
    * @property ***REMOVED***boolean***REMOVED*** inCamera
    * @readonly
    */
    inCamera: ***REMOVED***

        get: function() ***REMOVED***

            return this.game.world.camera.view.intersects(this._bounds);

        ***REMOVED***

    ***REMOVED***

***REMOVED***;
