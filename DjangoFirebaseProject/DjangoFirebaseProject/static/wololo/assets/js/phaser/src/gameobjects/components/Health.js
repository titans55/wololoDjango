/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Health component provides the ability for Game Objects to have a `health` property 
* that can be damaged and reset through game code.
* Requires the LifeSpan component.
*
* @class
*/
Phaser.Component.Health = function () ***REMOVED******REMOVED***;

Phaser.Component.Health.prototype = ***REMOVED***

    /**
    * The Game Objects health value. This is a handy property for setting and manipulating health on a Game Object.
    * 
    * It can be used in combination with the `damage` method or modified directly.
    * 
    * @property ***REMOVED***number***REMOVED*** health
    * @default
    */
    health: 1,

    /**
    * The Game Objects maximum health value. This works in combination with the `heal` method to ensure
    * the health value never exceeds the maximum.
    * 
    * @property ***REMOVED***number***REMOVED*** maxHealth
    * @default
    */
    maxHealth: 100,

    /**
    * Damages the Game Object. This removes the given amount of health from the `health` property.
    * 
    * If health is taken below or is equal to zero then the `kill` method is called.
    *
    * @member
    * @param ***REMOVED***number***REMOVED*** amount - The amount to subtract from the current `health` value.
    * @return ***REMOVED***Phaser.Sprite***REMOVED*** This instance.
    */
    damage: function (amount) ***REMOVED***

        if (this.alive)
        ***REMOVED***
            this.health -= amount;

            if (this.health <= 0)
            ***REMOVED***
                this.kill();
            ***REMOVED***
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Sets the health property of the Game Object to the given amount.
    * Will never exceed the `maxHealth` value.
    *
    * @member
    * @param ***REMOVED***number***REMOVED*** amount - The amount to set the `health` value to. The total will never exceed `maxHealth`.
    * @return ***REMOVED***Phaser.Sprite***REMOVED*** This instance.
    */
    setHealth: function (amount) ***REMOVED***

        this.health = amount;

        if (this.health > this.maxHealth)
        ***REMOVED***
            this.health = this.maxHealth;
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Heal the Game Object. This adds the given amount of health to the `health` property.
    *
    * @member
    * @param ***REMOVED***number***REMOVED*** amount - The amount to add to the current `health` value. The total will never exceed `maxHealth`.
    * @return ***REMOVED***Phaser.Sprite***REMOVED*** This instance.
    */
    heal: function (amount) ***REMOVED***

        if (this.alive)
        ***REMOVED***
            this.health += amount;

            if (this.health > this.maxHealth)
            ***REMOVED***
                this.health = this.maxHealth;
            ***REMOVED***
        ***REMOVED***

        return this;

    ***REMOVED***

***REMOVED***;
