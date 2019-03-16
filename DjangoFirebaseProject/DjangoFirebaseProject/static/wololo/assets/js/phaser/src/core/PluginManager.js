/* jshint newcap: false */

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Plugin Manager is responsible for the loading, running and unloading of Phaser Plugins.
*
* @class Phaser.PluginManager
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
*/
Phaser.PluginManager = function(game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***Phaser.Plugin[]***REMOVED*** plugins - An array of all the plugins being managed by this PluginManager.
    */
    this.plugins = [];

    /**
    * @property ***REMOVED***number***REMOVED*** _len - Internal cache var.
    * @private
    */
    this._len = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** _i - Internal cache var.
    * @private
    */
    this._i = 0;

***REMOVED***;

Phaser.PluginManager.prototype = ***REMOVED***

    /**
    * Add a new Plugin into the PluginManager.
    * The Plugin must have 2 properties: game and parent. Plugin.game is set to the game reference the PluginManager uses, and parent is set to the PluginManager.
    *
    * @method Phaser.PluginManager#add
    * @param ***REMOVED***object|Phaser.Plugin***REMOVED*** plugin - The Plugin to add into the PluginManager. This can be a function or an existing object.
    * @param ***REMOVED***...****REMOVED*** parameter - Additional arguments that will be passed to the Plugin.init method.
    * @return ***REMOVED***Phaser.Plugin***REMOVED*** The Plugin that was added to the manager.
    */
    add: function (plugin) ***REMOVED***

        var args = Array.prototype.slice.call(arguments, 1);
        var result = false;

        //  Prototype?
        if (typeof plugin === 'function')
        ***REMOVED***
            plugin = new plugin(this.game, this);
        ***REMOVED***
        else
        ***REMOVED***
            plugin.game = this.game;
            plugin.parent = this;
        ***REMOVED***

        //  Check for methods now to avoid having to do this every loop
        if (typeof plugin['preUpdate'] === 'function')
        ***REMOVED***
            plugin.hasPreUpdate = true;
            result = true;
        ***REMOVED***

        if (typeof plugin['update'] === 'function')
        ***REMOVED***
            plugin.hasUpdate = true;
            result = true;
        ***REMOVED***

        if (typeof plugin['postUpdate'] === 'function')
        ***REMOVED***
            plugin.hasPostUpdate = true;
            result = true;
        ***REMOVED***

        if (typeof plugin['render'] === 'function')
        ***REMOVED***
            plugin.hasRender = true;
            result = true;
        ***REMOVED***

        if (typeof plugin['postRender'] === 'function')
        ***REMOVED***
            plugin.hasPostRender = true;
            result = true;
        ***REMOVED***

        //  The plugin must have at least one of the above functions to be added to the PluginManager.
        if (result)
        ***REMOVED***
            if (plugin.hasPreUpdate || plugin.hasUpdate || plugin.hasPostUpdate)
            ***REMOVED***
                plugin.active = true;
            ***REMOVED***

            if (plugin.hasRender || plugin.hasPostRender)
            ***REMOVED***
                plugin.visible = true;
            ***REMOVED***

            this._len = this.plugins.push(plugin);

            // Allows plugins to run potentially destructive code outside of the constructor, and only if being added to the PluginManager
            if (typeof plugin['init'] === 'function')
            ***REMOVED***
                plugin.init.apply(plugin, args);
            ***REMOVED***

            return plugin;
        ***REMOVED***
        else
        ***REMOVED***
            return null;
        ***REMOVED***
    ***REMOVED***,

    /**
    * Remove a Plugin from the PluginManager. It calls Plugin.destroy on the plugin before removing it from the manager.
    *
    * @method Phaser.PluginManager#remove
    * @param ***REMOVED***Phaser.Plugin***REMOVED*** plugin - The plugin to be removed.
    * @param ***REMOVED***boolean***REMOVED*** [destroy=true] - Call destroy on the plugin that is removed?
    */
    remove: function (plugin, destroy) ***REMOVED***

        if (destroy === undefined) ***REMOVED*** destroy = true; ***REMOVED***

        this._i = this._len;

        while (this._i--)
        ***REMOVED***
            if (this.plugins[this._i] === plugin)
            ***REMOVED***
                if (destroy)
                ***REMOVED***
                    plugin.destroy();
                ***REMOVED***

                this.plugins.splice(this._i, 1);
                this._len--;
                return;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Remove all Plugins from the PluginManager. It calls Plugin.destroy on every plugin before removing it from the manager.
    *
    * @method Phaser.PluginManager#removeAll
    */
    removeAll: function() ***REMOVED***

        this._i = this._len;

        while (this._i--)
        ***REMOVED***
            this.plugins[this._i].destroy();
        ***REMOVED***

        this.plugins.length = 0;
        this._len = 0;

    ***REMOVED***,

    /**
    * Pre-update is called at the very start of the update cycle, before any other subsystems have been updated (including Physics).
    * It only calls plugins who have active=true.
    *
    * @method Phaser.PluginManager#preUpdate
    */
    preUpdate: function () ***REMOVED***

        this._i = this._len;

        while (this._i--)
        ***REMOVED***
            if (this.plugins[this._i].active && this.plugins[this._i].hasPreUpdate)
            ***REMOVED***
                this.plugins[this._i].preUpdate();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Update is called after all the core subsystems (Input, Tweens, Sound, etc) and the State have updated, but before the render.
    * It only calls plugins who have active=true.
    *
    * @method Phaser.PluginManager#update
    */
    update: function () ***REMOVED***

        this._i = this._len;

        while (this._i--)
        ***REMOVED***
            if (this.plugins[this._i].active && this.plugins[this._i].hasUpdate)
            ***REMOVED***
                this.plugins[this._i].update();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * PostUpdate is the last thing to be called before the world render.
    * In particular, it is called after the world postUpdate, which means the camera has been adjusted.
    * It only calls plugins who have active=true.
    *
    * @method Phaser.PluginManager#postUpdate
    */
    postUpdate: function () ***REMOVED***

        this._i = this._len;

        while (this._i--)
        ***REMOVED***
            if (this.plugins[this._i].active && this.plugins[this._i].hasPostUpdate)
            ***REMOVED***
                this.plugins[this._i].postUpdate();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Render is called right after the Game Renderer completes, but before the State.render.
    * It only calls plugins who have visible=true.
    *
    * @method Phaser.PluginManager#render
    */
    render: function () ***REMOVED***

        this._i = this._len;

        while (this._i--)
        ***REMOVED***
            if (this.plugins[this._i].visible && this.plugins[this._i].hasRender)
            ***REMOVED***
                this.plugins[this._i].render();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Post-render is called after the Game Renderer and State.render have run.
    * It only calls plugins who have visible=true.
    *
    * @method Phaser.PluginManager#postRender
    */
    postRender: function () ***REMOVED***

        this._i = this._len;

        while (this._i--)
        ***REMOVED***
            if (this.plugins[this._i].visible && this.plugins[this._i].hasPostRender)
            ***REMOVED***
                this.plugins[this._i].postRender();
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Clear down this PluginManager, calls destroy on every plugin and nulls out references.
    *
    * @method Phaser.PluginManager#destroy
    */
    destroy: function () ***REMOVED***

        this.removeAll();

        this.game = null;

    ***REMOVED***

***REMOVED***;

Phaser.PluginManager.prototype.constructor = Phaser.PluginManager;
