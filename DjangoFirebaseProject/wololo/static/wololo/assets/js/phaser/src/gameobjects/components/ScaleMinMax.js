/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The ScaleMinMax component allows a Game Object to limit how far it can be scaled by its parent.
*
* @class
*/
Phaser.Component.ScaleMinMax = function () ***REMOVED******REMOVED***;

Phaser.Component.ScaleMinMax.prototype = ***REMOVED***

    /**
    * The callback that will apply any scale limiting to the worldTransform.
    * @property ***REMOVED***function***REMOVED*** transformCallback
    */
    transformCallback: null,

    /**
    * The context under which `transformCallback` is called.
    * @property ***REMOVED***object***REMOVED*** transformCallbackContext
    */
    transformCallbackContext: this,

    /**
    * The minimum scale this Game Object will scale down to.
    * 
    * It allows you to prevent a parent from scaling this Game Object lower than the given value.
    * 
    * Set it to `null` to remove the limit.
    * @property ***REMOVED***Phaser.Point***REMOVED*** scaleMin
    */
    scaleMin: null,

    /**
    * The maximum scale this Game Object will scale up to. 
    * 
    * It allows you to prevent a parent from scaling this Game Object higher than the given value.
    * 
    * Set it to `null` to remove the limit.
    * @property ***REMOVED***Phaser.Point***REMOVED*** scaleMax
    */
    scaleMax: null,

    /**
     * Adjust scaling limits, if set, to this Game Object.
     *
     * @method
     * @private
     * @param ***REMOVED***PIXI.Matrix***REMOVED*** wt - The updated worldTransform matrix.
     */
    checkTransform: function (wt) ***REMOVED***

        if (this.scaleMin)
        ***REMOVED***
            if (wt.a < this.scaleMin.x)
            ***REMOVED***
                wt.a = this.scaleMin.x;
            ***REMOVED***

            if (wt.d < this.scaleMin.y)
            ***REMOVED***
                wt.d = this.scaleMin.y;
            ***REMOVED***
        ***REMOVED***

        if (this.scaleMax)
        ***REMOVED***
            if (wt.a > this.scaleMax.x)
            ***REMOVED***
                wt.a = this.scaleMax.x;
            ***REMOVED***

            if (wt.d > this.scaleMax.y)
            ***REMOVED***
                wt.d = this.scaleMax.y;
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
     * Sets the scaleMin and scaleMax values. These values are used to limit how far this Game Object will scale based on its parent.
     * 
     * For example if this Game Object has a `minScale` value of 1 and its parent has a `scale` value of 0.5, the 0.5 will be ignored 
     * and the scale value of 1 will be used, as the parents scale is lower than the minimum scale this Game Object should adhere to.
     * 
     * By setting these values you can carefully control how Game Objects deal with responsive scaling.
     * 
     * If only one parameter is given then that value will be used for both scaleMin and scaleMax:
     * `setScaleMinMax(1)` = scaleMin.x, scaleMin.y, scaleMax.x and scaleMax.y all = 1
     *
     * If only two parameters are given the first is set as scaleMin.x and y and the second as scaleMax.x and y:
     * `setScaleMinMax(0.5, 2)` = scaleMin.x and y = 0.5 and scaleMax.x and y = 2
     *
     * If you wish to set `scaleMin` with different values for x and y then either modify Game Object.scaleMin directly, 
     * or pass `null` for the `maxX` and `maxY` parameters.
     * 
     * Call `setScaleMinMax(null)` to clear all previously set values.
     *
     * @method
     * @param ***REMOVED***number|null***REMOVED*** minX - The minimum horizontal scale value this Game Object can scale down to.
     * @param ***REMOVED***number|null***REMOVED*** minY - The minimum vertical scale value this Game Object can scale down to.
     * @param ***REMOVED***number|null***REMOVED*** maxX - The maximum horizontal scale value this Game Object can scale up to.
     * @param ***REMOVED***number|null***REMOVED*** maxY - The maximum vertical scale value this Game Object can scale up to.
     */
    setScaleMinMax: function (minX, minY, maxX, maxY) ***REMOVED***

        if (minY === undefined)
        ***REMOVED***
            //  1 parameter, set all to it
            minY = maxX = maxY = minX;
        ***REMOVED***
        else if (maxX === undefined)
        ***REMOVED***
            //  2 parameters, the first is min, the second max
            maxX = maxY = minY;
            minY = minX;
        ***REMOVED***

        if (minX === null)
        ***REMOVED***
            this.scaleMin = null;
        ***REMOVED***
        else
        ***REMOVED***
            if (this.scaleMin)
            ***REMOVED***
                this.scaleMin.set(minX, minY);
            ***REMOVED***
            else
            ***REMOVED***
                this.scaleMin = new Phaser.Point(minX, minY);
            ***REMOVED***
        ***REMOVED***

        if (maxX === null)
        ***REMOVED***
            this.scaleMax = null;
        ***REMOVED***
        else
        ***REMOVED***
            if (this.scaleMax)
            ***REMOVED***
                this.scaleMax.set(maxX, maxY);
            ***REMOVED***
            else
            ***REMOVED***
                this.scaleMax = new Phaser.Point(maxX, maxY);
            ***REMOVED***
        ***REMOVED***

        if (this.scaleMin === null)
        ***REMOVED***
            this.transformCallback = null;
        ***REMOVED***
        else
        ***REMOVED***
            this.transformCallback = this.checkTransform;
            this.transformCallbackContext = this;
        ***REMOVED***

    ***REMOVED***

***REMOVED***;