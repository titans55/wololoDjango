/* jshint noarg: false */

/**
* @author       Georgios Kaleadis https://github.com/georgiee
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Allow to access a list of created fixture (coming from Body#addPhaserPolygon)
* which itself parse the input from PhysicsEditor with the custom phaser exporter.
* You can access fixtures of a Body by a group index or even by providing a fixture Key.

* You can set the fixture key and also the group index for a fixture in PhysicsEditor.
* This gives you the power to create a complex body built of many fixtures and modify them
* during runtime (to remove parts, set masks, categories & sensor properties)
*
* @class Phaser.Physics.P2.FixtureList
* @constructor
* @param ***REMOVED***Array***REMOVED*** list - A list of fixtures (from Phaser.Physics.P2.Body#addPhaserPolygon)
*/
Phaser.Physics.P2.FixtureList = function (list) ***REMOVED***

    if (!Array.isArray(list))
    ***REMOVED***
        list = [list];
    ***REMOVED***

    this.rawList = list;
    this.init();
    this.parse(this.rawList);

***REMOVED***;

Phaser.Physics.P2.FixtureList.prototype = ***REMOVED***
  
    /**
    * @method Phaser.Physics.P2.FixtureList#init
    */
    init: function () ***REMOVED***

        /**
        * @property ***REMOVED***object***REMOVED*** namedFixtures - Collect all fixtures with a key
        * @private
        */
        this.namedFixtures = ***REMOVED******REMOVED***;

        /**
        * @property ***REMOVED***Array***REMOVED*** groupedFixtures - Collect all given fixtures per group index. Notice: Every fixture with a key also belongs to a group
        * @private
        */
        this.groupedFixtures = [];

        /**
        * @property ***REMOVED***Array***REMOVED*** allFixtures - This is a list of everything in this collection
        * @private
        */
        this.allFixtures = [];

    ***REMOVED***,

    /**
    * @method Phaser.Physics.P2.FixtureList#setCategory
    * @param ***REMOVED***number***REMOVED*** bit - The bit to set as the collision group.
    * @param ***REMOVED***string***REMOVED*** fixtureKey - Only apply to the fixture with the given key.
    */
    setCategory: function (bit, fixtureKey) ***REMOVED***

        var setter = function(fixture) ***REMOVED***
            fixture.collisionGroup = bit;
        ***REMOVED***;

        this.getFixtures(fixtureKey).forEach(setter);

    ***REMOVED***,
  
    /**
    * @method Phaser.Physics.P2.FixtureList#setMask
    * @param ***REMOVED***number***REMOVED*** bit - The bit to set as the collision mask
    * @param ***REMOVED***string***REMOVED*** fixtureKey - Only apply to the fixture with the given key
    */
    setMask: function (bit, fixtureKey) ***REMOVED***

        var setter = function(fixture) ***REMOVED***
            fixture.collisionMask = bit;
        ***REMOVED***;

        this.getFixtures(fixtureKey).forEach(setter);

    ***REMOVED***,
  
    /**
    * @method Phaser.Physics.P2.FixtureList#setSensor
    * @param ***REMOVED***boolean***REMOVED*** value - sensor true or false
    * @param ***REMOVED***string***REMOVED*** fixtureKey - Only apply to the fixture with the given key
    */
    setSensor: function (value, fixtureKey) ***REMOVED***

        var setter = function(fixture) ***REMOVED***
            fixture.sensor = value;
        ***REMOVED***;

        this.getFixtures(fixtureKey).forEach(setter);

    ***REMOVED***,

    /**
    * @method Phaser.Physics.P2.FixtureList#setMaterial
    * @param ***REMOVED***Object***REMOVED*** material - The contact material for a fixture
    * @param ***REMOVED***string***REMOVED*** fixtureKey - Only apply to the fixture with the given key
    */
    setMaterial: function (material, fixtureKey) ***REMOVED***

        var setter = function(fixture) ***REMOVED***
            fixture.material = material;
        ***REMOVED***;

        this.getFixtures(fixtureKey).forEach(setter);

    ***REMOVED***,

    /**
    * Accessor to get either a list of specified fixtures by key or the whole fixture list
    * 
    * @method Phaser.Physics.P2.FixtureList#getFixtures
    * @param ***REMOVED***array***REMOVED*** keys - A list of fixture keys
    */
    getFixtures: function (keys) ***REMOVED***

        var fixtures = [];

        if (keys)
        ***REMOVED***
            if (!(keys instanceof Array))
            ***REMOVED***
                keys = [keys];
            ***REMOVED***

            var self = this;
            keys.forEach(function(key) ***REMOVED***
                if (self.namedFixtures[key])
                ***REMOVED***
                    fixtures.push(self.namedFixtures[key]);
                ***REMOVED***
            ***REMOVED***);

            return this.flatten(fixtures);

        ***REMOVED***
        else
        ***REMOVED***
            return this.allFixtures;
        ***REMOVED***

    ***REMOVED***,

    /**
    * Accessor to get either a single fixture by its key.
    * 
    * @method Phaser.Physics.P2.FixtureList#getFixtureByKey
    * @param ***REMOVED***string***REMOVED*** key - The key of the fixture.
    */
    getFixtureByKey: function (key) ***REMOVED***

        return this.namedFixtures[key];

    ***REMOVED***,

    /**
    * Accessor to get a group of fixtures by its group index.
    * 
    * @method Phaser.Physics.P2.FixtureList#getGroup
    * @param ***REMOVED***number***REMOVED*** groupID - The group index.
    */
    getGroup: function (groupID) ***REMOVED***

        return this.groupedFixtures[groupID];

    ***REMOVED***,
  
    /**
    * Parser for the output of Phaser.Physics.P2.Body#addPhaserPolygon
    * 
    * @method Phaser.Physics.P2.FixtureList#parse
    */
    parse: function () ***REMOVED***

        var key, value, _ref, _results;
        _ref = this.rawList;
        _results = [];

        for (key in _ref)
        ***REMOVED***
            value = _ref[key];

            if (!isNaN(key - 0))
            ***REMOVED***
                this.groupedFixtures[key] = this.groupedFixtures[key] || [];
                this.groupedFixtures[key] = this.groupedFixtures[key].concat(value);
            ***REMOVED***
            else
            ***REMOVED***
                this.namedFixtures[key] = this.flatten(value);
            ***REMOVED***

            _results.push(this.allFixtures = this.flatten(this.groupedFixtures));
        ***REMOVED***

    ***REMOVED***,

    /**
    * A helper to flatten arrays. This is very useful as the fixtures are nested from time to time due to the way P2 creates and splits polygons.
    * 
    * @method Phaser.Physics.P2.FixtureList#flatten
    * @param ***REMOVED***array***REMOVED*** array - The array to flatten. Notice: This will happen recursive not shallow.
    */
    flatten: function (array) ***REMOVED***

        var result, self;
        result = [];
        self = arguments.callee;
        
        array.forEach(function(item) ***REMOVED***
            return Array.prototype.push.apply(result, (Array.isArray(item) ? self(item) : [item]));
        ***REMOVED***);

        return result;

    ***REMOVED***

***REMOVED***;