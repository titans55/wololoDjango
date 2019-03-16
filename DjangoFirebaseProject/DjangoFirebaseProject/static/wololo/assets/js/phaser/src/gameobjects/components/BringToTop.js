/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The BringToTop Component features quick access to Group sorting related methods.
*
* @class
*/
Phaser.Component.BringToTop = function () ***REMOVED******REMOVED***;

/**
* Brings this Game Object to the top of its parents display list.
* Visually this means it will render over the top of any old child in the same Group.
* 
* If this Game Object hasn't been added to a custom Group then this method will bring it to the top of the Game World, 
* because the World is the root Group from which all Game Objects descend.
*
* @method
* @return ***REMOVED***PIXI.DisplayObject***REMOVED*** This instance.
*/
Phaser.Component.BringToTop.prototype.bringToTop = function() ***REMOVED***

    if (this.parent)
    ***REMOVED***
        this.parent.bringToTop(this);
    ***REMOVED***

    return this;

***REMOVED***;

/**
* Sends this Game Object to the bottom of its parents display list.
* Visually this means it will render below all other children in the same Group.
* 
* If this Game Object hasn't been added to a custom Group then this method will send it to the bottom of the Game World, 
* because the World is the root Group from which all Game Objects descend.
*
* @method
* @return ***REMOVED***PIXI.DisplayObject***REMOVED*** This instance.
*/
Phaser.Component.BringToTop.prototype.sendToBack = function() ***REMOVED***

    if (this.parent)
    ***REMOVED***
        this.parent.sendToBack(this);
    ***REMOVED***

    return this;

***REMOVED***;

/**
* Moves this Game Object up one place in its parents display list.
* This call has no effect if the Game Object is already at the top of the display list.
* 
* If this Game Object hasn't been added to a custom Group then this method will move it one object up within the Game World, 
* because the World is the root Group from which all Game Objects descend.
*
* @method
* @return ***REMOVED***PIXI.DisplayObject***REMOVED*** This instance.
*/
Phaser.Component.BringToTop.prototype.moveUp = function () ***REMOVED***

    if (this.parent)
    ***REMOVED***
        this.parent.moveUp(this);
    ***REMOVED***

    return this;

***REMOVED***;

/**
* Moves this Game Object down one place in its parents display list.
* This call has no effect if the Game Object is already at the bottom of the display list.
* 
* If this Game Object hasn't been added to a custom Group then this method will move it one object down within the Game World, 
* because the World is the root Group from which all Game Objects descend.
*
* @method
* @return ***REMOVED***PIXI.DisplayObject***REMOVED*** This instance.
*/
Phaser.Component.BringToTop.prototype.moveDown = function () ***REMOVED***

    if (this.parent)
    ***REMOVED***
        this.parent.moveDown(this);
    ***REMOVED***

    return this;

***REMOVED***;
