/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* FrameData is a container for Frame objects, which are the internal representation of animation data in Phaser.
*
* @class Phaser.FrameData
* @constructor
*/
Phaser.FrameData = function () ***REMOVED***

    /**
    * @property ***REMOVED***Array***REMOVED*** _frames - Local array of frames.
    * @private
    */
    this._frames = [];

    /**
    * @property ***REMOVED***Array***REMOVED*** _frameNames - Local array of frame names for name to index conversions.
    * @private
    */
    this._frameNames = [];

***REMOVED***;

Phaser.FrameData.prototype = ***REMOVED***

    /**
    * Adds a new Frame to this FrameData collection. Typically called by the Animation.Parser and not directly.
    *
    * @method Phaser.FrameData#addFrame
    * @param ***REMOVED***Phaser.Frame***REMOVED*** frame - The frame to add to this FrameData set.
    * @return ***REMOVED***Phaser.Frame***REMOVED*** The frame that was just added.
    */
    addFrame: function (frame) ***REMOVED***

        frame.index = this._frames.length;

        this._frames.push(frame);

        if (frame.name !== '')
        ***REMOVED***
            this._frameNames[frame.name] = frame.index;
        ***REMOVED***

        return frame;

    ***REMOVED***,

    /**
    * Get a Frame by its numerical index.
    *
    * @method Phaser.FrameData#getFrame
    * @param ***REMOVED***number***REMOVED*** index - The index of the frame you want to get.
    * @return ***REMOVED***Phaser.Frame***REMOVED*** The frame, if found.
    */
    getFrame: function (index) ***REMOVED***

        if (index >= this._frames.length)
        ***REMOVED***
            index = 0;
        ***REMOVED***

        return this._frames[index];

    ***REMOVED***,

    /**
    * Get a Frame by its frame name.
    *
    * @method Phaser.FrameData#getFrameByName
    * @param ***REMOVED***string***REMOVED*** name - The name of the frame you want to get.
    * @return ***REMOVED***Phaser.Frame***REMOVED*** The frame, if found.
    */
    getFrameByName: function (name) ***REMOVED***

        if (typeof this._frameNames[name] === 'number')
        ***REMOVED***
            return this._frames[this._frameNames[name]];
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
    * Check if there is a Frame with the given name.
    *
    * @method Phaser.FrameData#checkFrameName
    * @param ***REMOVED***string***REMOVED*** name - The name of the frame you want to check.
    * @return ***REMOVED***boolean***REMOVED*** True if the frame is found, otherwise false.
    */
    checkFrameName: function (name) ***REMOVED***

        if (this._frameNames[name] == null)
        ***REMOVED***
            return false;
        ***REMOVED***

        return true;

    ***REMOVED***,

    /**
     * Makes a copy of this FrameData including copies (not references) to all of the Frames it contains.
     *
     * @method Phaser.FrameData#clone
     * @return ***REMOVED***Phaser.FrameData***REMOVED*** A clone of this object, including clones of the Frame objects it contains.
     */
    clone: function () ***REMOVED***

        var output = new Phaser.FrameData();

        //  No input array, so we loop through all frames
        for (var i = 0; i < this._frames.length; i++)
        ***REMOVED***
            output._frames.push(this._frames[i].clone());
        ***REMOVED***

        for (var p in this._frameNames)
        ***REMOVED***
            if (this._frameNames.hasOwnProperty(p))
            ***REMOVED***
                output._frameNames.push(this._frameNames[p]);
            ***REMOVED***
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Returns a range of frames based on the given start and end frame indexes and returns them in an Array.
    *
    * @method Phaser.FrameData#getFrameRange
    * @param ***REMOVED***number***REMOVED*** start - The starting frame index.
    * @param ***REMOVED***number***REMOVED*** end - The ending frame index.
    * @param ***REMOVED***Array***REMOVED*** [output] - If given the results will be appended to the end of this array otherwise a new array will be created.
    * @return ***REMOVED***Array***REMOVED*** An array of Frames between the start and end index values, or an empty array if none were found.
    */
    getFrameRange: function (start, end, output) ***REMOVED***

        if (output === undefined) ***REMOVED*** output = []; ***REMOVED***

        for (var i = start; i <= end; i++)
        ***REMOVED***
            output.push(this._frames[i]);
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Returns all of the Frames in this FrameData set where the frame index is found in the input array.
    * The frames are returned in the output array, or if none is provided in a new Array object.
    *
    * @method Phaser.FrameData#getFrames
    * @param ***REMOVED***Array***REMOVED*** [frames] - An Array containing the indexes of the frames to retrieve. If the array is empty or undefined then all frames in the FrameData are returned.
    * @param ***REMOVED***boolean***REMOVED*** [useNumericIndex=true] - Are the given frames using numeric indexes (default) or strings? (false)
    * @param ***REMOVED***Array***REMOVED*** [output] - If given the results will be appended to the end of this array otherwise a new array will be created.
    * @return ***REMOVED***Array***REMOVED*** An array of all Frames in this FrameData set matching the given names or IDs.
    */
    getFrames: function (frames, useNumericIndex, output) ***REMOVED***

        if (useNumericIndex === undefined) ***REMOVED*** useNumericIndex = true; ***REMOVED***
        if (output === undefined) ***REMOVED*** output = []; ***REMOVED***

        if (frames === undefined || frames.length === 0)
        ***REMOVED***
            //  No input array, so we loop through all frames
            for (var i = 0; i < this._frames.length; i++)
            ***REMOVED***
                //  We only need the indexes
                output.push(this._frames[i]);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  Input array given, loop through that instead
            for (var i = 0; i < frames.length; i++)
            ***REMOVED***
                //  Does the input array contain names or indexes?
                if (useNumericIndex)
                ***REMOVED***
                    //  The actual frame
                    output.push(this.getFrame(frames[i]));
                ***REMOVED***
                else
                ***REMOVED***
                    //  The actual frame
                    output.push(this.getFrameByName(frames[i]));
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Returns all of the Frame indexes in this FrameData set.
    * The frames indexes are returned in the output array, or if none is provided in a new Array object.
    *
    * @method Phaser.FrameData#getFrameIndexes
    * @param ***REMOVED***Array***REMOVED*** [frames] - An Array containing the indexes of the frames to retrieve. If undefined or the array is empty then all frames in the FrameData are returned.
    * @param ***REMOVED***boolean***REMOVED*** [useNumericIndex=true] - Are the given frames using numeric indexes (default) or strings? (false)
    * @param ***REMOVED***Array***REMOVED*** [output] - If given the results will be appended to the end of this array otherwise a new array will be created.
    * @return ***REMOVED***Array***REMOVED*** An array of all Frame indexes matching the given names or IDs.
    */
    getFrameIndexes: function (frames, useNumericIndex, output) ***REMOVED***

        if (useNumericIndex === undefined) ***REMOVED*** useNumericIndex = true; ***REMOVED***
        if (output === undefined) ***REMOVED*** output = []; ***REMOVED***

        if (frames === undefined || frames.length === 0)
        ***REMOVED***
            //  No frames array, so we loop through all frames
            for (var i = 0; i < this._frames.length; i++)
            ***REMOVED***
                output.push(this._frames[i].index);
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            //  Input array given, loop through that instead
            for (var i = 0; i < frames.length; i++)
            ***REMOVED***
                //  Does the frames array contain names or indexes?
                if (useNumericIndex && this._frames[frames[i]])
                ***REMOVED***
                    output.push(this._frames[frames[i]].index);
                ***REMOVED***
                else
                ***REMOVED***
                    if (this.getFrameByName(frames[i]))
                    ***REMOVED***
                        output.push(this.getFrameByName(frames[i]).index);
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        return output;

    ***REMOVED***,

    /**
    * Destroys this FrameData collection by nulling the _frames and _frameNames arrays.
    *
    * @method Phaser.FrameData#destroy
    */
    destroy: function () ***REMOVED***

        this._frames = null;
        this._frameNames = null;

    ***REMOVED***

***REMOVED***;

Phaser.FrameData.prototype.constructor = Phaser.FrameData;

/**
* @name Phaser.FrameData#total
* @property ***REMOVED***number***REMOVED*** total - The total number of frames in this FrameData set.
* @readonly
*/
Object.defineProperty(Phaser.FrameData.prototype, "total", ***REMOVED***

    get: function () ***REMOVED***
        return this._frames.length;
    ***REMOVED***

***REMOVED***);
