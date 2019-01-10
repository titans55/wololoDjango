/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* This is a base Plugin template to use for any Phaser plugin development.
*
* @class Phaser.Plugin
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***any***REMOVED*** parent - The object that owns this plugin, usually Phaser.PluginManager.
*/
Phaser.Plugin = function (game, parent) ***REMOVED***

    if (parent === undefined) ***REMOVED*** parent = null; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***any***REMOVED*** parent - The parent of this plugin. If added to the PluginManager the parent will be set to that, otherwise it will be null.
    */
    this.parent = parent;

    /**
    * @property ***REMOVED***boolean***REMOVED*** active - A Plugin with active=true has its preUpdate and update methods called by the parent, otherwise they are skipped.
    * @default
    */
    this.active = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** visible - A Plugin with visible=true has its render and postRender methods called by the parent, otherwise they are skipped.
    * @default
    */
    this.visible = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** hasPreUpdate - A flag to indicate if this plugin has a preUpdate method.
    * @default
    */
    this.hasPreUpdate = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** hasUpdate - A flag to indicate if this plugin has an update method.
    * @default
    */
    this.hasUpdate = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** hasPostUpdate - A flag to indicate if this plugin has a postUpdate method.
    * @default
    */
    this.hasPostUpdate = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** hasRender - A flag to indicate if this plugin has a render method.
    * @default
    */
    this.hasRender = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** hasPostRender - A flag to indicate if this plugin has a postRender method.
    * @default
    */
    this.hasPostRender = false;

***REMOVED***;

Phaser.Plugin.prototype = ***REMOVED***

    /**
    * Pre-update is called at the very start of the update cycle, before any other subsystems have been updated (including Physics).
    * It is only called if active is set to true.
    * @method Phaser.Plugin#preUpdate
    */
    preUpdate: function () ***REMOVED***
    ***REMOVED***,

    /**
    * Update is called after all the core subsystems (Input, Tweens, Sound, etc) and the State have updated, but before the render.
    * It is only called if active is set to true.
    * @method Phaser.Plugin#update
    */
    update: function () ***REMOVED***
    ***REMOVED***,

    /**
    * Render is called right after the Game Renderer completes, but before the State.render.
    * It is only called if visible is set to true.
    * @method Phaser.Plugin#render
    */
    render: function () ***REMOVED***
    ***REMOVED***,

    /**
    * Post-render is called after the Game Renderer and State.render have run.
    * It is only called if visible is set to true.
    * @method Phaser.Plugin#postRender
    */
    postRender: function () ***REMOVED***
    ***REMOVED***,

    /**
    * Clear down this Plugin and null out references
    * @method Phaser.Plugin#destroy
    */
    destroy: function () ***REMOVED***

        this.game = null;
        this.parent = null;
        this.active = false;
        this.visible = false;

    ***REMOVED***

***REMOVED***;

Phaser.Plugin.prototype.constructor = Phaser.Plugin;
