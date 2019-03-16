/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Defines a physics material
*
* @class Phaser.Physics.P2.ContactMaterial
* @constructor
* @param ***REMOVED***Phaser.Physics.P2.Material***REMOVED*** materialA - First material participating in the contact material.
* @param ***REMOVED***Phaser.Physics.P2.Material***REMOVED*** materialB - Second material participating in the contact material.
* @param ***REMOVED***object***REMOVED*** [options] - Additional configuration options.
*/
Phaser.Physics.P2.ContactMaterial = function (materialA, materialB, options) ***REMOVED***

	/**
	* @property ***REMOVED***number***REMOVED*** id - The contact material identifier.
	*/

	/**
	* @property ***REMOVED***Phaser.Physics.P2.Material***REMOVED*** materialA - First material participating in the contact material.
	*/

	/**
	* @property ***REMOVED***Phaser.Physics.P2.Material***REMOVED*** materialB - Second material participating in the contact material.
	*/

	/**
	* @property ***REMOVED***number***REMOVED*** [friction=0.3] - Friction to use in the contact of these two materials.
	*/

	/**
	* @property ***REMOVED***number***REMOVED*** [restitution=0.0] - Restitution to use in the contact of these two materials.
	*/

	/**
	* @property ***REMOVED***number***REMOVED*** [stiffness=1e7] - Stiffness of the resulting ContactEquation that this ContactMaterial generates.
	*/

	/**
	* @property ***REMOVED***number***REMOVED*** [relaxation=3] - Relaxation of the resulting ContactEquation that this ContactMaterial generates.
	*/

	/**
	* @property ***REMOVED***number***REMOVED*** [frictionStiffness=1e7] - Stiffness of the resulting FrictionEquation that this ContactMaterial generates.
	*/

	/**
	* @property ***REMOVED***number***REMOVED*** [frictionRelaxation=3] - Relaxation of the resulting FrictionEquation that this ContactMaterial generates.
	*/

	/**
	* @property ***REMOVED***number***REMOVED*** [surfaceVelocity=0] - Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.
	*/

    p2.ContactMaterial.call(this, materialA, materialB, options);

***REMOVED***;

Phaser.Physics.P2.ContactMaterial.prototype = Object.create(p2.ContactMaterial.prototype);
Phaser.Physics.P2.ContactMaterial.prototype.constructor = Phaser.Physics.P2.ContactMaterial;
