/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A P2 Material.
* 
* \o/ ~ "Because I'm a Material girl"
*
* @class Phaser.Physics.P2.Material
* @constructor
* @param ***REMOVED***string***REMOVED*** name - The user defined name given to this Material.
*/
Phaser.Physics.P2.Material = function (name) ***REMOVED***

    /**
    * @property ***REMOVED***string***REMOVED*** name - The user defined name given to this Material.
    * @default
    */
    this.name = name;

    p2.Material.call(this);

***REMOVED***;

Phaser.Physics.P2.Material.prototype = Object.create(p2.Material.prototype);
Phaser.Physics.P2.Material.prototype.constructor = Phaser.Physics.P2.Material;
