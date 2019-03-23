/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */
 
/**
 * Converts a hex color number to an [R, G, B] array
 *
 * @method hex2rgb
 * @param hex ***REMOVED***Number***REMOVED***
 */
PIXI.hex2rgb = function(hex) ***REMOVED***
    return [(hex >> 16 & 0xFF) / 255, ( hex >> 8 & 0xFF) / 255, (hex & 0xFF)/ 255];
***REMOVED***;

/**
 * Converts a color as an [R, G, B] array to a hex number
 *
 * @method rgb2hex
 * @param rgb ***REMOVED***Array***REMOVED***
 */
PIXI.rgb2hex = function(rgb) ***REMOVED***
    return ((rgb[0]*255 << 16) + (rgb[1]*255 << 8) + rgb[2]*255);
***REMOVED***;

/**
 * Checks whether the Canvas BlendModes are supported by the current browser for drawImage
 *
 * @method canUseNewCanvasBlendModes
 * @return ***REMOVED***Boolean***REMOVED*** whether they are supported
 */
PIXI.canUseNewCanvasBlendModes = function()
***REMOVED***
    if (document === undefined) return false;

    var pngHead = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/';
    var pngEnd = 'AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';

    var magenta = new Image();
    magenta.src = pngHead + 'AP804Oa6' + pngEnd;

    var yellow = new Image();
    yellow.src = pngHead + '/wCKxvRF' + pngEnd;

    var canvas = PIXI.CanvasPool.create(this, 6, 1);
    var context = canvas.getContext('2d');
    context.globalCompositeOperation = 'multiply';
    context.drawImage(magenta, 0, 0);
    context.drawImage(yellow, 2, 0);

    if (!context.getImageData(2,0,1,1))
    ***REMOVED***
        return false;
    ***REMOVED***

    var data = context.getImageData(2,0,1,1).data;

    PIXI.CanvasPool.remove(this);

    return (data[0] === 255 && data[1] === 0 && data[2] === 0);

***REMOVED***;

/**
 * Given a number, this function returns the closest number that is a power of two
 * this function is taken from Starling Framework as its pretty neat ;)
 *
 * @method getNextPowerOfTwo
 * @param number ***REMOVED***Number***REMOVED***
 * @return ***REMOVED***Number***REMOVED*** the closest number that is a power of two
 */
PIXI.getNextPowerOfTwo = function(number)
***REMOVED***
    if (number > 0 && (number & (number - 1)) === 0) // see: http://goo.gl/D9kPj
        return number;
    else
    ***REMOVED***
        var result = 1;
        while (result < number) result <<= 1;
        return result;
    ***REMOVED***
***REMOVED***;

/**
 * checks if the given width and height make a power of two texture
 * @method isPowerOfTwo
 * @param width ***REMOVED***Number***REMOVED***
 * @param height ***REMOVED***Number***REMOVED***
 * @return ***REMOVED***Boolean***REMOVED*** 
 */
PIXI.isPowerOfTwo = function(width, height)
***REMOVED***
    return (width > 0 && (width & (width - 1)) === 0 && height > 0 && (height & (height - 1)) === 0);

***REMOVED***;
