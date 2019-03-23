/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* An Image Collection is a special tileset containing mulitple images, with no slicing into each image.
*
* Image Collections are normally created automatically when Tiled data is loaded.
*
* @class Phaser.ImageCollection
* @constructor
* @param ***REMOVED***string***REMOVED*** name - The name of the image collection in the map data.
* @param ***REMOVED***integer***REMOVED*** firstgid - The first image index this image collection contains.
* @param ***REMOVED***integer***REMOVED*** [width=32] - Width of widest image (in pixels).
* @param ***REMOVED***integer***REMOVED*** [height=32] - Height of tallest image (in pixels).
* @param ***REMOVED***integer***REMOVED*** [margin=0] - The margin around all images in the collection (in pixels).
* @param ***REMOVED***integer***REMOVED*** [spacing=0] - The spacing between each image in the collection (in pixels).
* @param ***REMOVED***object***REMOVED*** [properties=***REMOVED******REMOVED***] - Custom Image Collection properties.
*/
Phaser.ImageCollection = function (name, firstgid, width, height, margin, spacing, properties) ***REMOVED***

    if (width === undefined || width <= 0) ***REMOVED*** width = 32; ***REMOVED***
    if (height === undefined || height <= 0) ***REMOVED*** height = 32; ***REMOVED***
    if (margin === undefined) ***REMOVED*** margin = 0; ***REMOVED***
    if (spacing === undefined) ***REMOVED*** spacing = 0; ***REMOVED***

    /**
    * The name of the Image Collection.
    * @property ***REMOVED***string***REMOVED*** name
    */
    this.name = name;

    /**
    * The Tiled firstgid value.
    * This is the starting index of the first image index this Image Collection contains.
    * @property ***REMOVED***integer***REMOVED*** firstgid
    */
    this.firstgid = firstgid | 0;

    /**
    * The width of the widest image (in pixels).
    * @property ***REMOVED***integer***REMOVED*** imageWidth
    * @readonly
    */
    this.imageWidth = width | 0;

    /**
    * The height of the tallest image (in pixels).
    * @property ***REMOVED***integer***REMOVED*** imageHeight
    * @readonly
    */
    this.imageHeight = height | 0;

    /**
    * The margin around the images in the collection (in pixels).
    * Use `setSpacing` to change.
    * @property ***REMOVED***integer***REMOVED*** imageMarge
    * @readonly
    */
    // Modified internally
    this.imageMargin = margin | 0;

    /**
    * The spacing between each image in the collection (in pixels).
    * Use `setSpacing` to change.
    * @property ***REMOVED***integer***REMOVED*** imageSpacing
    * @readonly
    */
    this.imageSpacing = spacing | 0;

    /**
    * Image Collection-specific properties that are typically defined in the Tiled editor.
    * @property ***REMOVED***object***REMOVED*** properties
    */
    this.properties = properties || ***REMOVED******REMOVED***;

    /**
    * The cached images that are a part of this collection.
    * @property ***REMOVED***array***REMOVED*** images
    * @readonly
    */
    // Modified internally
    this.images = [];

    /**
    * The total number of images in the image collection.
    * @property ***REMOVED***integer***REMOVED*** total
    * @readonly
    */
    // Modified internally
    this.total = 0;
***REMOVED***;

Phaser.ImageCollection.prototype = ***REMOVED***

    /**
    * Returns true if and only if this image collection contains the given image index.
    *
    * @method Phaser.ImageCollection#containsImageIndex
    * @param ***REMOVED***integer***REMOVED*** imageIndex - The image index to search for.
    * @return ***REMOVED***boolean***REMOVED*** True if this Image Collection contains the given index.
    */
    containsImageIndex: function (imageIndex) ***REMOVED***

        return (
            imageIndex >= this.firstgid &&
            imageIndex < (this.firstgid + this.total)
        );

    ***REMOVED***,

    /**
    * Add an image to this Image Collection.
    *
    * @method Phaser.ImageCollection#addImage
    * @param ***REMOVED***integer***REMOVED*** gid - The gid of the image in the Image Collection.
    * @param ***REMOVED***string***REMOVED*** image - The the key of the image in the Image Collection and in the cache.
    */
    addImage: function (gid, image) ***REMOVED***

        this.images.push(***REMOVED*** gid: gid, image: image ***REMOVED***);
        this.total++;

    ***REMOVED***

***REMOVED***;

Phaser.ImageCollection.prototype.constructor = Phaser.ImageCollection;
