/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Phaser.Create class is a collection of smaller helper methods that allow you to generate game content
* quickly and easily, without the need for any external files. You can create textures for sprites and in
* coming releases we'll add dynamic sound effect generation support as well (like sfxr).
*
* Access this via `Game.create` (`this.game.create` from within a State object)
* 
* @class Phaser.Create
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - Game reference to the currently running game.
 */
Phaser.Create = function (game) ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running Game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***Phaser.BitmapData***REMOVED*** bmd - The internal BitmapData Create uses to generate textures from.
    */
    this.bmd = null;

    /**
    * @property ***REMOVED***HTMLCanvasElement***REMOVED*** canvas - The canvas the BitmapData uses.
    */
    this.canvas = null;

    /**
    * @property ***REMOVED***CanvasRenderingContext2D***REMOVED*** context - The 2d context of the canvas.
    */
    this.ctx = null;

    /**
    * @property ***REMOVED***array***REMOVED*** palettes - A range of 16 color palettes for use with sprite generation.
    */
    this.palettes = [
        ***REMOVED*** 0: '#000', 1: '#9D9D9D', 2: '#FFF', 3: '#BE2633', 4: '#E06F8B', 5: '#493C2B', 6: '#A46422', 7: '#EB8931', 8: '#F7E26B', 9: '#2F484E', A: '#44891A', B: '#A3CE27', C: '#1B2632', D: '#005784', E: '#31A2F2', F: '#B2DCEF' ***REMOVED***,
        ***REMOVED*** 0: '#000', 1: '#191028', 2: '#46af45', 3: '#a1d685', 4: '#453e78', 5: '#7664fe', 6: '#833129', 7: '#9ec2e8', 8: '#dc534b', 9: '#e18d79', A: '#d6b97b', B: '#e9d8a1', C: '#216c4b', D: '#d365c8', E: '#afaab9', F: '#f5f4eb' ***REMOVED***,
        ***REMOVED*** 0: '#000', 1: '#2234d1', 2: '#0c7e45', 3: '#44aacc', 4: '#8a3622', 5: '#5c2e78', 6: '#aa5c3d', 7: '#b5b5b5', 8: '#5e606e', 9: '#4c81fb', A: '#6cd947', B: '#7be2f9', C: '#eb8a60', D: '#e23d69', E: '#ffd93f', F: '#fff' ***REMOVED***,
        ***REMOVED*** 0: '#000', 1: '#fff', 2: '#8b4131', 3: '#7bbdc5', 4: '#8b41ac', 5: '#6aac41', 6: '#3931a4', 7: '#d5de73', 8: '#945a20', 9: '#5a4100', A: '#bd736a', B: '#525252', C: '#838383', D: '#acee8b', E: '#7b73de', F: '#acacac' ***REMOVED***,
        ***REMOVED*** 0: '#000', 1: '#191028', 2: '#46af45', 3: '#a1d685', 4: '#453e78', 5: '#7664fe', 6: '#833129', 7: '#9ec2e8', 8: '#dc534b', 9: '#e18d79', A: '#d6b97b', B: '#e9d8a1', C: '#216c4b', D: '#d365c8', E: '#afaab9', F: '#fff' ***REMOVED***
    ];

***REMOVED***;

/**
* A 16 color palette by [Arne](http://androidarts.com/palette/16pal.htm)
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Create.PALETTE_ARNE = 0;

/**
* A 16 color JMP inspired palette.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Create.PALETTE_JMP = 1;

/**
* A 16 color CGA inspired palette.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Create.PALETTE_CGA = 2;

/**
* A 16 color C64 inspired palette.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Create.PALETTE_C64 = 3;

/**
* A 16 color palette inspired by Japanese computers like the MSX.
* @constant
* @type ***REMOVED***number***REMOVED***
*/
Phaser.Create.PALETTE_JAPANESE_MACHINE = 4;

Phaser.Create.prototype = ***REMOVED***

    /**
     * Generates a new PIXI.Texture from the given data, which can be applied to a Sprite.
     *
     * This allows you to create game graphics quickly and easily, with no external files but that use actual proper images
     * rather than Phaser.Graphics objects, which are expensive to render and limited in scope.
     *
     * Each element of the array is a string holding the pixel color values, as mapped to one of the Phaser.Create PALETTE consts.
     *
     * For example:
     *
     * `var data = [
     *   ' 333 ',
     *   ' 777 ',
     *   'E333E',
     *   ' 333 ',
     *   ' 3 3 '
     * ];`
     *
     * `game.create.texture('bob', data);`
     *
     * The above will create a new texture called `bob`, which will look like a little man wearing a hat. You can then use it
     * for sprites the same way you use any other texture: `game.add.sprite(0, 0, 'bob');`
     *
     * @method Phaser.Create#texture
     * @param ***REMOVED***string***REMOVED*** key - The key used to store this texture in the Phaser Cache.
     * @param ***REMOVED***array***REMOVED*** data - An array of pixel data.
     * @param ***REMOVED***integer***REMOVED*** [pixelWidth=8] - The width of each pixel.
     * @param ***REMOVED***integer***REMOVED*** [pixelHeight=8] - The height of each pixel.
     * @param ***REMOVED***integer***REMOVED*** [palette=0] - The palette to use when rendering the texture. One of the Phaser.Create.PALETTE consts.
     * @return ***REMOVED***PIXI.Texture***REMOVED*** The newly generated texture.
     */
    texture: function (key, data, pixelWidth, pixelHeight, palette) ***REMOVED***

        if (pixelWidth === undefined) ***REMOVED*** pixelWidth = 8; ***REMOVED***
        if (pixelHeight === undefined) ***REMOVED*** pixelHeight = pixelWidth; ***REMOVED***
        if (palette === undefined) ***REMOVED*** palette = 0; ***REMOVED***

        var w = data[0].length * pixelWidth;
        var h = data.length * pixelHeight;

        //  No bmd? Let's make one
        if (this.bmd === null)
        ***REMOVED***
            this.bmd = this.game.make.bitmapData();
            this.canvas = this.bmd.canvas;
            this.ctx = this.bmd.context;
        ***REMOVED***

        this.bmd.resize(w, h);
        this.bmd.clear();

        //  Draw it
        for (var y = 0; y < data.length; y++)
        ***REMOVED***
            var row = data[y];

            for (var x = 0; x < row.length; x++)
            ***REMOVED***
                var d = row[x];

                if (d !== '.' && d !== ' ')
                ***REMOVED***
                    this.ctx.fillStyle = this.palettes[palette][d];
                    this.ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return this.bmd.generateTexture(key);

    ***REMOVED***,

    /**
     * Creates a grid texture based on the given dimensions.
     *
     * @method Phaser.Create#grid
     * @param ***REMOVED***string***REMOVED*** key - The key used to store this texture in the Phaser Cache.
     * @param ***REMOVED***integer***REMOVED*** width - The width of the grid in pixels.
     * @param ***REMOVED***integer***REMOVED*** height - The height of the grid in pixels.
     * @param ***REMOVED***integer***REMOVED*** cellWidth - The width of the grid cells in pixels.
     * @param ***REMOVED***integer***REMOVED*** cellHeight - The height of the grid cells in pixels.
     * @param ***REMOVED***string***REMOVED*** color - The color to draw the grid lines in. Should be a Canvas supported color string like `#ff5500` or `rgba(200,50,3,0.5)`.
     * @return ***REMOVED***PIXI.Texture***REMOVED*** The newly generated texture.
     */
    grid: function (key, width, height, cellWidth, cellHeight, color) ***REMOVED***

        //  No bmd? Let's make one
        if (this.bmd === null)
        ***REMOVED***
            this.bmd = this.game.make.bitmapData();
            this.canvas = this.bmd.canvas;
            this.ctx = this.bmd.context;
        ***REMOVED***

        this.bmd.resize(width, height);

        this.ctx.fillStyle = color;

        for (var y = 0; y < height; y += cellHeight)
        ***REMOVED***
            this.ctx.fillRect(0, y, width, 1);
        ***REMOVED***

        for (var x = 0; x < width; x += cellWidth)
        ***REMOVED***
            this.ctx.fillRect(x, 0, 1, height);
        ***REMOVED***

        return this.bmd.generateTexture(key);

    ***REMOVED***

***REMOVED***;

Phaser.Create.prototype.constructor = Phaser.Create;
