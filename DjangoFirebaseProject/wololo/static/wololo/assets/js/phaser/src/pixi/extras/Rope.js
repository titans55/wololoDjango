/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 * @copyright Mat Groves, Rovanion Luckey
 */

/**
 *
 * @class Rope
 * @constructor
 * @extends Strip
 * @param ***REMOVED***Texture***REMOVED*** texture - The texture to use on the rope.
 * @param ***REMOVED***Array***REMOVED*** points - An array of ***REMOVED***PIXI.Point***REMOVED***.
 *
 */
PIXI.Rope = function(texture, points)
***REMOVED***
    PIXI.Strip.call( this, texture );
    this.points = points;

    this.vertices = new PIXI.Float32Array(points.length * 4);
    this.uvs = new PIXI.Float32Array(points.length * 4);
    this.colors = new PIXI.Float32Array(points.length * 2);
    this.indices = new PIXI.Uint16Array(points.length * 2);


    this.refresh();
***REMOVED***;


// constructor
PIXI.Rope.prototype = Object.create( PIXI.Strip.prototype );
PIXI.Rope.prototype.constructor = PIXI.Rope;

/*
 * Refreshes
 *
 * @method refresh
 */
PIXI.Rope.prototype.refresh = function()
***REMOVED***
    var points = this.points;
    if(points.length < 1) return;

    var uvs = this.uvs;

    var lastPoint = points[0];
    var indices = this.indices;
    var colors = this.colors;

    this.count-=0.2;

    uvs[0] = 0;
    uvs[1] = 0;
    uvs[2] = 0;
    uvs[3] = 1;

    colors[0] = 1;
    colors[1] = 1;

    indices[0] = 0;
    indices[1] = 1;

    var total = points.length,
        point, index, amount;

    for (var i = 1; i < total; i++)
    ***REMOVED***
        point = points[i];
        index = i * 4;
        // time to do some smart drawing!
        amount = i / (total-1);

        if(i%2)
        ***REMOVED***
            uvs[index] = amount;
            uvs[index+1] = 0;

            uvs[index+2] = amount;
            uvs[index+3] = 1;
        ***REMOVED***
        else
        ***REMOVED***
            uvs[index] = amount;
            uvs[index+1] = 0;

            uvs[index+2] = amount;
            uvs[index+3] = 1;
        ***REMOVED***

        index = i * 2;
        colors[index] = 1;
        colors[index+1] = 1;

        index = i * 2;
        indices[index] = index;
        indices[index + 1] = index + 1;

        lastPoint = point;
    ***REMOVED***
***REMOVED***;

/*
 * Updates the object transform for rendering
 *
 * @method updateTransform
 * @private
 */
PIXI.Rope.prototype.updateTransform = function()
***REMOVED***

    var points = this.points;
    if(points.length < 1)return;

    var lastPoint = points[0];
    var nextPoint;
    var perp = ***REMOVED***x:0, y:0***REMOVED***;

    this.count-=0.2;

    var vertices = this.vertices;
    var total = points.length,
        point, index, ratio, perpLength, num;

    for (var i = 0; i < total; i++)
    ***REMOVED***
        point = points[i];
        index = i * 4;

        if(i < points.length-1)
        ***REMOVED***
            nextPoint = points[i+1];
        ***REMOVED***
        else
        ***REMOVED***
            nextPoint = point;
        ***REMOVED***

        perp.y = -(nextPoint.x - lastPoint.x);
        perp.x = nextPoint.y - lastPoint.y;

        ratio = (1 - (i / (total-1))) * 10;

        if(ratio > 1) ratio = 1;

        perpLength = Math.sqrt(perp.x * perp.x + perp.y * perp.y);
        num = this.texture.height / 2; //(20 + Math.abs(Math.sin((i + this.count) * 0.3) * 50) )* ratio;
        perp.x /= perpLength;
        perp.y /= perpLength;

        perp.x *= num;
        perp.y *= num;

        vertices[index] = point.x + perp.x;
        vertices[index+1] = point.y + perp.y;
        vertices[index+2] = point.x - perp.x;
        vertices[index+3] = point.y - perp.y;

        lastPoint = point;
    ***REMOVED***

    PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
***REMOVED***;
/*
 * Sets the texture that the Rope will use
 *
 * @method setTexture
 * @param texture ***REMOVED***Texture***REMOVED*** the texture that will be used
 */
PIXI.Rope.prototype.setTexture = function(texture)
***REMOVED***
    // stop current texture
    this.texture = texture;
    //this.updateFrame = true;
***REMOVED***;
