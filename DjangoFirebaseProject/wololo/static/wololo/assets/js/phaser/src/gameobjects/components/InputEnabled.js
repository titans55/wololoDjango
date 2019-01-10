/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The InputEnabled component allows a Game Object to have its own InputHandler and process input related events.
*
* @class
*/
Phaser.Component.InputEnabled = function () ***REMOVED******REMOVED***;

Phaser.Component.InputEnabled.prototype = ***REMOVED***

    /**
    * The Input Handler for this Game Object.
    * 
    * By default it is disabled. If you wish this Game Object to process input events you should enable it with: `inputEnabled = true`.
    * 
    * After you have done this, this property will be a reference to the Phaser InputHandler.
    * @property ***REMOVED***Phaser.InputHandler|null***REMOVED*** input 
    */
    input: null,

    /**
    * By default a Game Object won't process any input events. By setting `inputEnabled` to true a Phaser.InputHandler is created
    * for this Game Object and it will then start to process click / touch events and more.
    * 
    * You can then access the Input Handler via `this.input`.
    * 
    * Note that Input related events are dispatched from `this.events`, i.e.: `events.onInputDown`.
    * 
    * If you set this property to false it will stop the Input Handler from processing any more input events.
    * 
    * If you want to _temporarily_ disable input for a Game Object, then it's better to set
    * `input.enabled = false`, as it won't reset any of the Input Handlers internal properties.
    * You can then toggle this back on as needed.
    *
    * @property ***REMOVED***boolean***REMOVED*** inputEnabled
    */
    inputEnabled: ***REMOVED***

        get: function () ***REMOVED***

            return (this.input && this.input.enabled);

        ***REMOVED***,

        set: function (value) ***REMOVED***

            if (value)
            ***REMOVED***
                if (this.input === null)
                ***REMOVED***
                    this.input = new Phaser.InputHandler(this);
                    this.input.start();
                ***REMOVED***
                else if (this.input && !this.input.enabled)
                ***REMOVED***
                    this.input.start();
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                if (this.input && this.input.enabled)
                ***REMOVED***
                    this.input.stop();
                ***REMOVED***
            ***REMOVED***

        ***REMOVED***

    ***REMOVED***

***REMOVED***;
