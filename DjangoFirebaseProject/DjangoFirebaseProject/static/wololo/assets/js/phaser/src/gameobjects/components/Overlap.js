/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Overlap component allows a Game Object to check if it overlaps with the bounds of another Game Object.
*
* @class
*/
Phaser.Component.Overlap = function () ***REMOVED******REMOVED***;

Phaser.Component.Overlap.prototype = ***REMOVED***

    /**
    * Checks to see if the bounds of this Game Object overlaps with the bounds of the given Display Object, 
    * which can be a Sprite, Image, TileSprite or anything that extends those such as Button or provides a `getBounds` method and result.
    * 
    * This check ignores the `hitArea` property if set and runs a `getBounds` comparison on both objects to determine the result.
    * 
    * Therefore it's relatively expensive to use in large quantities, i.e. with lots of Sprites at a high frequency.
    * It should be fine for low-volume testing where physics isn't required.
    *
    * @method
    * @param ***REMOVED***Phaser.Sprite|Phaser.Image|Phaser.TileSprite|Phaser.Button|PIXI.DisplayObject***REMOVED*** displayObject - The display object to check against.
    * @return ***REMOVED***boolean***REMOVED*** True if the bounds of this Game Object intersects at any point with the bounds of the given display object.
    */
    overlap: function (displayObject) ***REMOVED***

        return Phaser.Rectangle.intersects(this.getBounds(), displayObject.getBounds());

    ***REMOVED***

***REMOVED***;
