/**
* @author       Mat Groves http://matgroves.com/ @Doormat23
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Matrix is a 3x3 matrix mostly used for display transforms within the renderer.
* 
* It is represented like so:
* 
* | a | b | tx |
* | c | d | ty |
* | 0 | 0 | 1 |
*
* @class Phaser.Matrix
* @constructor
* @param ***REMOVED***number***REMOVED*** [a=1] - Horizontal scaling
* @param ***REMOVED***number***REMOVED*** [b=0] - Horizontal skewing
* @param ***REMOVED***number***REMOVED*** [c=0] - Vertical skewing
* @param ***REMOVED***number***REMOVED*** [d=1] - Vertical scaling
* @param ***REMOVED***number***REMOVED*** [tx=0] - Horizontal translation
* @param ***REMOVED***number***REMOVED*** [ty=0] - Vertical translation
*/
Phaser.Matrix = function (a, b, c, d, tx, ty) ***REMOVED***

    if (a === undefined || a === null) ***REMOVED*** a = 1; ***REMOVED***
    if (b === undefined || b === null) ***REMOVED*** b = 0; ***REMOVED***
    if (c === undefined || c === null) ***REMOVED*** c = 0; ***REMOVED***
    if (d === undefined || d === null) ***REMOVED*** d = 1; ***REMOVED***
    if (tx === undefined || tx === null) ***REMOVED*** tx = 0; ***REMOVED***
    if (ty === undefined || ty === null) ***REMOVED*** ty = 0; ***REMOVED***

    /**
    * @property ***REMOVED***number***REMOVED*** a
    * @default 1
    */
    this.a = a;

    /**
    * @property ***REMOVED***number***REMOVED*** b
    * @default 0
    */
    this.b = b;

    /**
    * @property ***REMOVED***number***REMOVED*** c
    * @default 0
    */
    this.c = c;

    /**
    * @property ***REMOVED***number***REMOVED*** d
    * @default 1
    */
    this.d = d;

    /**
    * @property ***REMOVED***number***REMOVED*** tx
    * @default 0
    */
    this.tx = tx;

    /**
    * @property ***REMOVED***number***REMOVED*** ty
    * @default 0
    */
    this.ty = ty;

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.MATRIX;

***REMOVED***;

Phaser.Matrix.prototype = ***REMOVED***

    /**
    * Sets the values of this Matrix to the values in the given array.
    * 
    * The Array elements should be set as follows:
    *
    * a = array[0]
    * b = array[1]
    * c = array[3]
    * d = array[4]
    * tx = array[2]
    * ty = array[5]
    *
    * @method Phaser.Matrix#fromArray
    * @param ***REMOVED***Array***REMOVED*** array - The array to copy from.
    * @return ***REMOVED***Phaser.Matrix***REMOVED*** This Matrix object.
    */
    fromArray: function (array) ***REMOVED***

        return this.setTo(array[0], array[1], array[3], array[4], array[2], array[5]);

    ***REMOVED***,

    /**
    * Sets the values of this Matrix to the given values.
    *
    * @method Phaser.Matrix#setTo
    * @param ***REMOVED***number***REMOVED*** a - Horizontal scaling
    * @param ***REMOVED***number***REMOVED*** b - Horizontal skewing
    * @param ***REMOVED***number***REMOVED*** c - Vertical skewing
    * @param ***REMOVED***number***REMOVED*** d - Vertical scaling
    * @param ***REMOVED***number***REMOVED*** tx - Horizontal translation
    * @param ***REMOVED***number***REMOVED*** ty - Vertical translation
    * @return ***REMOVED***Phaser.Matrix***REMOVED*** This Matrix object.
    */
    setTo: function (a, b, c, d, tx, ty) ***REMOVED***

        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;

        return this;

    ***REMOVED***,

    /**
     * Creates a new Matrix object based on the values of this Matrix.
     * If you provide the output parameter the values of this Matrix will be copied over to it.
     * If the output parameter is blank a new Matrix object will be created.
     *
     * @method Phaser.Matrix#clone
     * @param ***REMOVED***Phaser.Matrix***REMOVED*** [output] - If provided the values of this Matrix will be copied to it, otherwise a new Matrix object is created.
     * @return ***REMOVED***Phaser.Matrix***REMOVED*** A clone of this Matrix.
     */
    clone: function (output) ***REMOVED***

        if (output === undefined || output === null)
        ***REMOVED***
            output = new Phaser.Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
        ***REMOVED***
        else
        ***REMOVED***
            output.a = this.a;
            output.b = this.b;
            output.c = this.c;
            output.d = this.d;
            output.tx = this.tx;
            output.ty = this.ty;
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Copies the properties from this Matrix to the given Matrix.
    *
    * @method Phaser.Matrix#copyTo
    * @param ***REMOVED***Phaser.Matrix***REMOVED*** matrix - The Matrix to copy from.
    * @return ***REMOVED***Phaser.Matrix***REMOVED*** The destination Matrix object.
    */
    copyTo: function (matrix) ***REMOVED***

        matrix.copyFrom(this);

        return matrix;

    ***REMOVED***,

    /**
    * Copies the properties from the given Matrix into this Matrix.
    *
    * @method Phaser.Matrix#copyFrom
    * @param ***REMOVED***Phaser.Matrix***REMOVED*** matrix - The Matrix to copy from.
    * @return ***REMOVED***Phaser.Matrix***REMOVED*** This Matrix object.
    */
    copyFrom: function (matrix) ***REMOVED***

        this.a = matrix.a;
        this.b = matrix.b;
        this.c = matrix.c;
        this.d = matrix.d;
        this.tx = matrix.tx;
        this.ty = matrix.ty;

        return this;

    ***REMOVED***,

    /**
    * Creates a Float32 Array with values populated from this Matrix object.
    *
    * @method Phaser.Matrix#toArray
    * @param ***REMOVED***boolean***REMOVED*** [transpose=false] - Whether the values in the array are transposed or not.
    * @param ***REMOVED***PIXI.Float32Array***REMOVED*** [array] - If provided the values will be set into this array, otherwise a new Float32Array is created.
    * @return ***REMOVED***PIXI.Float32Array***REMOVED*** The newly created array which contains the matrix.
    */
    toArray: function (transpose, array) ***REMOVED***

        if (array === undefined) ***REMOVED*** array = new PIXI.Float32Array(9); ***REMOVED***

        if (transpose)
        ***REMOVED***
            array[0] = this.a;
            array[1] = this.b;
            array[2] = 0;
            array[3] = this.c;
            array[4] = this.d;
            array[5] = 0;
            array[6] = this.tx;
            array[7] = this.ty;
            array[8] = 1;
        ***REMOVED***
        else
        ***REMOVED***
            array[0] = this.a;
            array[1] = this.c;
            array[2] = this.tx;
            array[3] = this.b;
            array[4] = this.d;
            array[5] = this.ty;
            array[6] = 0;
            array[7] = 0;
            array[8] = 1;
        ***REMOVED***

        return array;

    ***REMOVED***,

    /**
    * Get a new position with the current transformation applied.
    * 
    * Can be used to go from a childs coordinate space to the world coordinate space (e.g. rendering)
    *
    * @method Phaser.Matrix#apply
    * @param ***REMOVED***Phaser.Point***REMOVED*** pos - The origin Point.
    * @param ***REMOVED***Phaser.Point***REMOVED*** [newPos] - The point that the new position is assigned to. This can be same as input point.
    * @return ***REMOVED***Phaser.Point***REMOVED*** The new point, transformed through this matrix.
    */
    apply: function (pos, newPos) ***REMOVED***

        if (newPos === undefined) ***REMOVED*** newPos = new Phaser.Point(); ***REMOVED***

        newPos.x = this.a * pos.x + this.c * pos.y + this.tx;
        newPos.y = this.b * pos.x + this.d * pos.y + this.ty;

        return newPos;

    ***REMOVED***,

    /**
    * Get a new position with the inverse of the current transformation applied.
    * 
    * Can be used to go from the world coordinate space to a childs coordinate space. (e.g. input)
    *
    * @method Phaser.Matrix#applyInverse
    * @param ***REMOVED***Phaser.Point***REMOVED*** pos - The origin Point.
    * @param ***REMOVED***Phaser.Point***REMOVED*** [newPos] - The point that the new position is assigned to. This can be same as input point.
    * @return ***REMOVED***Phaser.Point***REMOVED*** The new point, inverse transformed through this matrix.
    */
    applyInverse: function (pos, newPos) ***REMOVED***

        if (newPos === undefined) ***REMOVED*** newPos = new Phaser.Point(); ***REMOVED***

        var id = 1 / (this.a * this.d + this.c * -this.b);
        var x = pos.x;
        var y = pos.y;

        newPos.x = this.d * id * x + -this.c * id * y + (this.ty * this.c - this.tx * this.d) * id;
        newPos.y = this.a * id * y + -this.b * id * x + (-this.ty * this.a + this.tx * this.b) * id;

        return newPos;

    ***REMOVED***,

    /**
    * Translates the matrix on the x and y.
    * This is the same as Matrix.tx += x.
    * 
    * @method Phaser.Matrix#translate
    * @param ***REMOVED***number***REMOVED*** x - The x value to translate on.
    * @param ***REMOVED***number***REMOVED*** y - The y value to translate on.
    * @return ***REMOVED***Phaser.Matrix***REMOVED*** This Matrix object.
    */
    translate: function (x, y) ***REMOVED***

        this.tx += x;
        this.ty += y;
        
        return this;

    ***REMOVED***,

    /**
    * Applies a scale transformation to this matrix.
    * 
    * @method Phaser.Matrix#scale
    * @param ***REMOVED***number***REMOVED*** x - The amount to scale horizontally.
    * @param ***REMOVED***number***REMOVED*** y - The amount to scale vertically.
    * @return ***REMOVED***Phaser.Matrix***REMOVED*** This Matrix object.
    */
    scale: function (x, y) ***REMOVED***

        this.a *= x;
        this.d *= y;
        this.c *= x;
        this.b *= y;
        this.tx *= x;
        this.ty *= y;

        return this;

    ***REMOVED***,

    /**
    * Applies a rotation transformation to this matrix.
    * 
    * @method Phaser.Matrix#rotate
    * @param ***REMOVED***number***REMOVED*** angle - The angle to rotate by, given in radians.
    * @return ***REMOVED***Phaser.Matrix***REMOVED*** This Matrix object.
    */
    rotate: function (angle) ***REMOVED***

        var cos = Math.cos(angle);
        var sin = Math.sin(angle);

        var a1 = this.a;
        var c1 = this.c;
        var tx1 = this.tx;

        this.a = a1 * cos-this.b * sin;
        this.b = a1 * sin+this.b * cos;
        this.c = c1 * cos-this.d * sin;
        this.d = c1 * sin+this.d * cos;
        this.tx = tx1 * cos - this.ty * sin;
        this.ty = tx1 * sin + this.ty * cos;
     
        return this;

    ***REMOVED***,

    /**
    * Appends the given Matrix to this Matrix.
    * 
    * @method Phaser.Matrix#append
    * @param ***REMOVED***Phaser.Matrix***REMOVED*** matrix - The matrix to append to this one.
    * @return ***REMOVED***Phaser.Matrix***REMOVED*** This Matrix object.
    */
    append: function (matrix) ***REMOVED***

        var a1 = this.a;
        var b1 = this.b;
        var c1 = this.c;
        var d1 = this.d;

        this.a  = matrix.a * a1 + matrix.b * c1;
        this.b  = matrix.a * b1 + matrix.b * d1;
        this.c  = matrix.c * a1 + matrix.d * c1;
        this.d  = matrix.c * b1 + matrix.d * d1;

        this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx;
        this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty;
        
        return this;

    ***REMOVED***,

    /**
    * Resets this Matrix to an identity (default) matrix.
    * 
    * @method Phaser.Matrix#identity
    * @return ***REMOVED***Phaser.Matrix***REMOVED*** This Matrix object.
    */
    identity: function () ***REMOVED***

        return this.setTo(1, 0, 0, 1, 0, 0);

    ***REMOVED***

***REMOVED***;

Phaser.identityMatrix = new Phaser.Matrix();

//  Because PIXI uses its own type, we'll replace it with ours to avoid duplicating code or confusion.
PIXI.Matrix = Phaser.Matrix;
PIXI.identityMatrix = Phaser.identityMatrix;
