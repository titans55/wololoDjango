/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A Video object that takes a previously loaded Video from the Phaser Cache and handles playback of it.
*
* Alternatively it takes a getUserMedia feed from an active webcam and streams the contents of that to
* the Video instead (see `startMediaStream` method)
*
* The video can then be applied to a Sprite as a texture. If multiple Sprites share the same Video texture and playback
* changes (i.e. you pause the video, or seek to a new time) then this change will be seen across all Sprites simultaneously.
*
* Due to a bug in IE11 you cannot play a video texture to a Sprite in WebGL. For IE11 force Canvas mode.
*
* If you need each Sprite to be able to play a video fully independently then you will need one Video object per Sprite.
* Please understand the obvious performance implications of doing this, and the memory required to hold videos in RAM.
*
* On some mobile browsers such as iOS Safari, you cannot play a video until the user has explicitly touched the screen.
* This works in the same way as audio unlocking. Phaser will handle the touch unlocking for you, however unlike with audio
* it's worth noting that every single Video needs to be touch unlocked, not just the first one. You can use the `changeSource`
* method to try and work around this limitation, but see the method help for details.
*
* Small screen devices, especially iPod and iPhone will launch the video in its own native video player,
* outside of the Safari browser. There is no way to avoid this, it's a device imposed limitation.
*
* Note: On iOS if you need to detect when the user presses the 'Done' button (before the video ends)
* then you need to add your own event listener
*
* @class Phaser.Video
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***string|null***REMOVED*** [key=null] - The key of the video file in the Phaser.Cache that this Video object will play. Set to `null` or leave undefined if you wish to use a webcam as the source. See `startMediaStream` to start webcam capture.
* @param ***REMOVED***string|null***REMOVED*** [url=null] - If the video hasn't been loaded then you can provide a full URL to the file here (make sure to set key to null)
*/
Phaser.Video = function (game, key, url) ***REMOVED***

    if (key === undefined) ***REMOVED*** key = null; ***REMOVED***
    if (url === undefined) ***REMOVED*** url = null; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***string***REMOVED*** key - The key of the Video in the Cache, if stored there. Will be `null` if this Video is using the webcam instead.
    * @default null
    */
    this.key = key;

    /**
    * @property ***REMOVED***number***REMOVED*** width - The width of the video in pixels.
    * @default
    */
    this.width = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** height - The height of the video in pixels.
    * @default
    */
    this.height = 0;

    /**
    * @property ***REMOVED***number***REMOVED*** type - The const type of this object.
    * @default
    */
    this.type = Phaser.VIDEO;

    /**
    * @property ***REMOVED***boolean***REMOVED*** disableTextureUpload - If true this video will never send its image data to the GPU when its dirty flag is true. This only applies in WebGL.
    */
    this.disableTextureUpload = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** touchLocked - true if this video is currently locked awaiting a touch event. This happens on some mobile devices, such as iOS.
    * @default
    */
    this.touchLocked = false;

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onPlay - This signal is dispatched when the Video starts to play. It sends 3 parameters: a reference to the Video object, if the video is set to loop or not and the playback rate.
    */
    this.onPlay = new Phaser.Signal();

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onChangeSource - This signal is dispatched if the Video source is changed. It sends 3 parameters: a reference to the Video object and the new width and height of the new video source.
    */
    this.onChangeSource = new Phaser.Signal();

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onComplete - This signal is dispatched when the Video completes playback, i.e. enters an 'ended' state. On iOS specifically it also fires if the user hits the 'Done' button at any point during playback. Videos set to loop will never dispatch this signal.
    */
    this.onComplete = new Phaser.Signal();

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onAccess - This signal is dispatched if the user allows access to their webcam.
    */
    this.onAccess = new Phaser.Signal();

    /**
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onError - This signal is dispatched if an error occurs either getting permission to use the webcam (for a Video Stream) or when trying to play back a video file.
    */
    this.onError = new Phaser.Signal();

    /**
    * This signal is dispatched if when asking for permission to use the webcam no response is given within a the Video.timeout limit.
    * This may be because the user has picked `Not now` in the permissions window, or there is a delay in establishing the LocalMediaStream.
    * @property ***REMOVED***Phaser.Signal***REMOVED*** onTimeout
    */
    this.onTimeout = new Phaser.Signal();

    /**
    * @property ***REMOVED***integer***REMOVED*** timeout - The amount of ms allowed to elapsed before the Video.onTimeout signal is dispatched while waiting for webcam access.
    * @default
    */
    this.timeout = 15000;

    /**
    * @property ***REMOVED***integer***REMOVED*** _timeOutID - setTimeout ID.
    * @private
    */
    this._timeOutID = null;

    /**
    * @property ***REMOVED***HTMLVideoElement***REMOVED*** video - The HTML Video Element that is added to the document.
    */
    this.video = null;

    /**
    * @property ***REMOVED***MediaStream***REMOVED*** videoStream - The Video Stream data. Only set if this Video is streaming from the webcam via `startMediaStream`.
    */
    this.videoStream = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isStreaming - Is there a streaming video source? I.e. from a webcam.
    */
    this.isStreaming = false;

    /**
    * When starting playback of a video Phaser will monitor its readyState using a setTimeout call.
    * The setTimeout happens once every `Video.retryInterval` ms. It will carry on monitoring the video
    * state in this manner until the `retryLimit` is reached and then abort.
    * @property ***REMOVED***integer***REMOVED*** retryLimit
    * @default
    */
    this.retryLimit = 20;

    /**
    * @property ***REMOVED***integer***REMOVED*** retry - The current retry attempt.
    * @default
    */
    this.retry = 0;

    /**
    * @property ***REMOVED***integer***REMOVED*** retryInterval - The number of ms between each retry at monitoring the status of a downloading video.
    * @default
    */
    this.retryInterval = 500;

    /**
    * @property ***REMOVED***integer***REMOVED*** _retryID - The callback ID of the retry setTimeout.
    * @private
    */
    this._retryID = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _codeMuted - Internal mute tracking var.
    * @private
    * @default
    */
    this._codeMuted = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _muted - Internal mute tracking var.
    * @private
    * @default
    */
    this._muted = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _codePaused - Internal paused tracking var.
    * @private
    * @default
    */
    this._codePaused = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _paused - Internal paused tracking var.
    * @private
    * @default
    */
    this._paused = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _pending - Internal var tracking play pending.
    * @private
    * @default
    */
    this._pending = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** _autoplay - Internal var tracking autoplay when changing source.
    * @private
    * @default
    */
    this._autoplay = false;

    /**
    * @property ***REMOVED***function***REMOVED*** _endCallback - The addEventListener ended function.
    * @private
    */
    this._endCallback = null;

    /**
    * @property ***REMOVED***function***REMOVED*** _playCallback - The addEventListener playing function.
    * @private
    */
    this._playCallback = null;

    if (key && this.game.cache.checkVideoKey(key))
    ***REMOVED***
        var _video = this.game.cache.getVideo(key);

        if (_video.isBlob)
        ***REMOVED***
            this.createVideoFromBlob(_video.data);
        ***REMOVED***
        else
        ***REMOVED***
            this.video = _video.data;
        ***REMOVED***

        this.width = this.video.videoWidth;
        this.height = this.video.videoHeight;
    ***REMOVED***
    else if (url)
    ***REMOVED***
        this.createVideoFromURL(url, false);
    ***REMOVED***

    /**
    * @property ***REMOVED***PIXI.BaseTexture***REMOVED*** baseTexture - The PIXI.BaseTexture.
    * @default
    */
    if (this.video && !url)
    ***REMOVED***
        this.baseTexture = new PIXI.BaseTexture(this.video);
        this.baseTexture.forceLoaded(this.width, this.height);
    ***REMOVED***
    else
    ***REMOVED***
        this.baseTexture = new PIXI.BaseTexture(Phaser.Cache.DEFAULT.baseTexture.source);
        this.baseTexture.forceLoaded(this.width, this.height);
    ***REMOVED***

    /**
    * @property ***REMOVED***PIXI.Texture***REMOVED*** texture - The PIXI.Texture.
    * @default
    */
    this.texture = new PIXI.Texture(this.baseTexture);

    /**
    * @property ***REMOVED***Phaser.Frame***REMOVED*** textureFrame - The Frame this video uses for rendering.
    * @default
    */
    this.textureFrame = new Phaser.Frame(0, 0, 0, this.width, this.height, 'video');

    this.texture.setFrame(this.textureFrame);

    this.texture.valid = false;

    if (key !== null && this.video)
    ***REMOVED***
        this.texture.valid = this.video.canplay;
    ***REMOVED***

    /**
    * A snapshot grabbed from the video. This is initially black. Populate it by calling Video.grab().
    * When called the BitmapData is updated with a grab taken from the current video playing or active video stream.
    * If Phaser has been compiled without BitmapData support this property will always be `null`.
    *
    * @property ***REMOVED***Phaser.BitmapData***REMOVED*** snapshot
    * @readOnly
    */
    this.snapshot = null;

    if (Phaser.BitmapData)
    ***REMOVED***
        this.snapshot = new Phaser.BitmapData(this.game, '', this.width, this.height);
    ***REMOVED***

    if (!this.game.device.cocoonJS && (this.game.device.iOS || this.game.device.android) || (window['PhaserGlobal'] && window['PhaserGlobal'].fakeiOSTouchLock))
    ***REMOVED***
        this.setTouchLock();
    ***REMOVED***
    else
    ***REMOVED***
        if (_video)
        ***REMOVED***
            _video.locked = false;
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

Phaser.Video.prototype = ***REMOVED***

    /**
     * Connects to an external media stream for the webcam, rather than using a local one.
     *
     * @method Phaser.Video#connectToMediaStream
     * @param ***REMOVED***HTMLVideoElement***REMOVED*** video - The HTML Video Element that the stream uses.
     * @param ***REMOVED***MediaStream***REMOVED*** stream - The Video Stream data.
     * @return ***REMOVED***Phaser.Video***REMOVED*** This Video object for method chaining.
     */
    connectToMediaStream: function (video, stream) ***REMOVED***

        if (video && stream)
        ***REMOVED***
            this.video = video;
            this.videoStream = stream;

            this.isStreaming = true;
            this.baseTexture.source = this.video;
            this.updateTexture(null, this.video.videoWidth, this.video.videoHeight);

            this.onAccess.dispatch(this);
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
     * Instead of playing a video file this method allows you to stream video data from an attached webcam.
     *
     * As soon as this method is called the user will be prompted by their browser to "Allow" access to the webcam.
     * If they allow it the webcam feed is directed to this Video. Call `Video.play` to start the stream.
     *
     * If they block the webcam the onError signal will be dispatched containing the NavigatorUserMediaError
     * or MediaStreamError event.
     *
     * You can optionally set a width and height for the stream. If set the input will be cropped to these dimensions.
     * If not given then as soon as the stream has enough data the video dimensions will be changed to match the webcam device.
     * You can listen for this with the onChangeSource signal.
     *
     * @method Phaser.Video#startMediaStream
     * @param ***REMOVED***boolean***REMOVED*** [captureAudio=false] - Controls if audio should be captured along with video in the video stream.
     * @param ***REMOVED***integer***REMOVED*** [width] - The width is used to create the video stream. If not provided the video width will be set to the width of the webcam input source.
     * @param ***REMOVED***integer***REMOVED*** [height] - The height is used to create the video stream. If not provided the video height will be set to the height of the webcam input source.
     * @return ***REMOVED***Phaser.Video***REMOVED*** This Video object for method chaining or false if the device doesn't support getUserMedia.
     */
    startMediaStream: function (captureAudio, width, height) ***REMOVED***

        if (captureAudio === undefined) ***REMOVED*** captureAudio = false; ***REMOVED***
        if (width === undefined) ***REMOVED*** width = null; ***REMOVED***
        if (height === undefined) ***REMOVED*** height = null; ***REMOVED***

        if (!this.game.device.getUserMedia)
        ***REMOVED***
            this.onError.dispatch(this, 'No getUserMedia');
            return false;
        ***REMOVED***

        if (this.videoStream !== null)
        ***REMOVED***
            if (this.videoStream['active'])
            ***REMOVED***
                this.videoStream.active = false;
            ***REMOVED***
            else
            ***REMOVED***
                this.videoStream.stop();
            ***REMOVED***
        ***REMOVED***

        this.removeVideoElement();

        this.video = document.createElement("video");
        this.video.setAttribute('autoplay', 'autoplay');

        if (width !== null)
        ***REMOVED***
            this.video.width = width;
        ***REMOVED***

        if (height !== null)
        ***REMOVED***
            this.video.height = height;
        ***REMOVED***

        //  Request access to the webcam

        this._timeOutID = window.setTimeout(this.getUserMediaTimeout.bind(this), this.timeout);

        try ***REMOVED***
            navigator.getUserMedia(
                ***REMOVED*** "audio": captureAudio, "video": true ***REMOVED***,
                this.getUserMediaSuccess.bind(this),
                this.getUserMediaError.bind(this)
            );
        ***REMOVED***
        catch (error)
        ***REMOVED***
            this.getUserMediaError(error);
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
     * @method Phaser.Video#getUserMediaTimeout
     * @private
     */
    getUserMediaTimeout: function () ***REMOVED***

        clearTimeout(this._timeOutID);

        this.onTimeout.dispatch(this);

    ***REMOVED***,

    /**
     * @method Phaser.Video#getUserMediaError
     * @private
     */
    getUserMediaError: function (event) ***REMOVED***

        clearTimeout(this._timeOutID);

        this.onError.dispatch(this, event);

    ***REMOVED***,

    /**
     * @method Phaser.Video#getUserMediaSuccess
     * @private
     */
    getUserMediaSuccess: function (stream) ***REMOVED***

        clearTimeout(this._timeOutID);

        // Attach the stream to the video
        this.videoStream = stream;

        // Set the source of the video element with the stream from the camera
        if (this.video.mozSrcObject !== undefined)
        ***REMOVED***
            this.video.mozSrcObject = stream;
        ***REMOVED***
        else
        ***REMOVED***
            this.video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
        ***REMOVED***

        var self = this;

        this.video.onloadeddata = function () ***REMOVED***

            var retry = 10;

            function checkStream () ***REMOVED***

                if (retry > 0)
                ***REMOVED***
                    if (self.video.videoWidth > 0)
                    ***REMOVED***
                        // Patch for Firefox bug where the height can't be read from the video
                        var width = self.video.videoWidth;
                        var height = self.video.videoHeight;

                        if (isNaN(self.video.videoHeight))
                        ***REMOVED***
                            height = width / (4/3);
                        ***REMOVED***

                        self.video.play();

                        self.isStreaming = true;
                        self.baseTexture.source = self.video;
                        self.updateTexture(null, width, height);
                        self.onAccess.dispatch(self);
                    ***REMOVED***
                    else
                    ***REMOVED***
                        window.setTimeout(checkStream, 500);
                    ***REMOVED***
                ***REMOVED***
                else
                ***REMOVED***
                    console.warn('Unable to connect to video stream. Webcam error?');
                ***REMOVED***

                retry--;
            ***REMOVED***

            checkStream();

        ***REMOVED***;

    ***REMOVED***,

    /**
     * Creates a new Video element from the given Blob. The Blob must contain the video data in the correct encoded format.
     * This method is typically called by the Phaser.Loader and Phaser.Cache for you, but is exposed publicly for convenience.
     *
     * @method Phaser.Video#createVideoFromBlob
     * @param ***REMOVED***Blob***REMOVED*** blob - The Blob containing the video data: `Blob([new Uint8Array(data)])`
     * @return ***REMOVED***Phaser.Video***REMOVED*** This Video object for method chaining.
     */
    createVideoFromBlob: function (blob) ***REMOVED***

        var _this = this;

        this.video = document.createElement("video");
        this.video.controls = false;
        this.video.setAttribute('autoplay', 'autoplay');
        this.video.addEventListener('loadeddata', function (event) ***REMOVED*** _this.updateTexture(event); ***REMOVED***, true);
        this.video.src = window.URL.createObjectURL(blob);
        this.video.canplay = true;

        return this;

    ***REMOVED***,

    /**
     * Creates a new Video element from the given URL.
     *
     * @method Phaser.Video#createVideoFromURL
     * @param ***REMOVED***string***REMOVED*** url - The URL of the video.
     * @param ***REMOVED***boolean***REMOVED*** [autoplay=false] - Automatically start the video?
     * @return ***REMOVED***Phaser.Video***REMOVED*** This Video object for method chaining.
     */
    createVideoFromURL: function (url, autoplay) ***REMOVED***

        if (autoplay === undefined) ***REMOVED*** autoplay = false; ***REMOVED***

        //  Invalidate the texture while we wait for the new one to load (crashes IE11 otherwise)
        if (this.texture)
        ***REMOVED***
            this.texture.valid = false;
        ***REMOVED***

        this.video = document.createElement("video");
        this.video.controls = false;

        if (autoplay)
        ***REMOVED***
            this.video.setAttribute('autoplay', 'autoplay');
        ***REMOVED***

        this.video.src = url;

        this.video.canplay = true;

        this.video.load();

        this.retry = this.retryLimit;

        this._retryID = window.setTimeout(this.checkVideoProgress.bind(this), this.retryInterval);

        this.key = url;

        return this;

    ***REMOVED***,

    /**
     * Called automatically if the video source changes and updates the internal texture dimensions.
     * Then dispatches the onChangeSource signal.
     *
     * @method Phaser.Video#updateTexture
     * @param ***REMOVED***object***REMOVED*** [event] - The event which triggered the texture update.
     * @param ***REMOVED***integer***REMOVED*** [width] - The new width of the video. If undefined `video.videoWidth` is used.
     * @param ***REMOVED***integer***REMOVED*** [height] - The new height of the video. If undefined `video.videoHeight` is used.
     */
    updateTexture: function (event, width, height) ***REMOVED***

        var change = false;

        if (width === undefined || width === null) ***REMOVED*** width = this.video.videoWidth; change = true; ***REMOVED***
        if (height === undefined || height === null) ***REMOVED*** height = this.video.videoHeight; ***REMOVED***

        this.width = width;
        this.height = height;

        if (this.baseTexture.source !== this.video)
        ***REMOVED***
            this.baseTexture.source = this.video;
        ***REMOVED***

        this.baseTexture.forceLoaded(width, height);

        this.texture.frame.resize(width, height);

        this.texture.width = width;
        this.texture.height = height;

        this.texture.valid = true;

        if (this.snapshot)
        ***REMOVED***
            this.snapshot.resize(width, height);
        ***REMOVED***

        if (change && this.key !== null)
        ***REMOVED***
            this.onChangeSource.dispatch(this, width, height);

            if (this._autoplay)
            ***REMOVED***
                this.video.play();
                this.onPlay.dispatch(this, this.loop, this.playbackRate);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
     * Called when the video completes playback (reaches and ended state).
     * Dispatches the Video.onComplete signal.
     *
     * @method Phaser.Video#complete
     */
    complete: function () ***REMOVED***

        this.onComplete.dispatch(this);

    ***REMOVED***,

    /**
     * Starts this video playing if it's not already doing so.
     *
     * @method Phaser.Video#play
     * @param ***REMOVED***boolean***REMOVED*** [loop=false] - Should the video loop automatically when it reaches the end? Please note that at present some browsers (i.e. Chrome) do not support *seamless* video looping.
     * @param ***REMOVED***number***REMOVED*** [playbackRate=1] - The playback rate of the video. 1 is normal speed, 2 is x2 speed, and so on. You cannot set a negative playback rate.
     * @return ***REMOVED***Phaser.Video***REMOVED*** This Video object for method chaining.
     */
    play: function (loop, playbackRate) ***REMOVED***

        if (loop === undefined) ***REMOVED*** loop = false; ***REMOVED***
        if (playbackRate === undefined) ***REMOVED*** playbackRate = 1; ***REMOVED***

        if (this.game.sound.onMute)
        ***REMOVED***
            this.game.sound.onMute.add(this.setMute, this);
            this.game.sound.onUnMute.add(this.unsetMute, this);

            if (this.game.sound.mute)
            ***REMOVED***
                this.setMute();
            ***REMOVED***
        ***REMOVED***

        this.game.onPause.add(this.setPause, this);
        this.game.onResume.add(this.setResume, this);

        this._endCallback = this.complete.bind(this);

        this.video.addEventListener('ended', this._endCallback, true);
        this.video.addEventListener('webkitendfullscreen', this._endCallback, true);

        if (loop)
        ***REMOVED***
            this.video.loop = 'loop';
        ***REMOVED***
        else
        ***REMOVED***
            this.video.loop = '';
        ***REMOVED***

        this.video.playbackRate = playbackRate;

        if (this.touchLocked)
        ***REMOVED***
            this._pending = true;
        ***REMOVED***
        else
        ***REMOVED***
            this._pending = false;

            if (this.key !== null)
            ***REMOVED***
                if (this.video.readyState !== 4)
                ***REMOVED***
                    this.retry = this.retryLimit;
                    this._retryID = window.setTimeout(this.checkVideoProgress.bind(this), this.retryInterval);
                ***REMOVED***
                else
                ***REMOVED***
                    this._playCallback = this.playHandler.bind(this);
                    this.video.addEventListener('playing', this._playCallback, true);
                ***REMOVED***
            ***REMOVED***

            this.video.play();

            this.onPlay.dispatch(this, loop, playbackRate);
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
     * Called when the video starts to play. Updates the texture.
     *
     * @method Phaser.Video#playHandler
     * @private
     */
    playHandler: function () ***REMOVED***

        this.video.removeEventListener('playing', this._playCallback, true);

        this.updateTexture();

    ***REMOVED***,

    /**
     * Stops the video playing.
     *
     * This removes all locally set signals.
     *
     * If you only wish to pause playback of the video, to resume at a later time, use `Video.paused = true` instead.
     * If the video hasn't finished downloading calling `Video.stop` will not abort the download. To do that you need to
     * call `Video.destroy` instead.
     *
     * If you are using a video stream from a webcam then calling Stop will disconnect the MediaStream session and disable the webcam.
     *
     * @method Phaser.Video#stop
     * @return ***REMOVED***Phaser.Video***REMOVED*** This Video object for method chaining.
     */
    stop: function () ***REMOVED***

        if (this.game.sound.onMute)
        ***REMOVED***
            this.game.sound.onMute.remove(this.setMute, this);
            this.game.sound.onUnMute.remove(this.unsetMute, this);
        ***REMOVED***

        this.game.onPause.remove(this.setPause, this);
        this.game.onResume.remove(this.setResume, this);

        //  Stream or file?

        if (this.isStreaming)
        ***REMOVED***
            if (this.video.mozSrcObject)
            ***REMOVED***
                this.video.mozSrcObject.stop();
                this.video.src = null;
            ***REMOVED***
            else
            ***REMOVED***
                this.video.src = "";

                if (this.videoStream['active'])
                ***REMOVED***
                    this.videoStream.active = false;
                ***REMOVED***
                else
                ***REMOVED***
                    if (this.videoStream.getTracks)
                    ***REMOVED***
                        this.videoStream.getTracks().forEach(function (track) ***REMOVED***
                            track.stop();
                        ***REMOVED***);
                    ***REMOVED***
                    else
                    ***REMOVED***
                        this.videoStream.stop();
                    ***REMOVED***

                ***REMOVED***
            ***REMOVED***

            this.videoStream = null;
            this.isStreaming = false;
        ***REMOVED***
        else
        ***REMOVED***
            this.video.removeEventListener('ended', this._endCallback, true);
            this.video.removeEventListener('webkitendfullscreen', this._endCallback, true);
            this.video.removeEventListener('playing', this._playCallback, true);

            if (this.touchLocked)
            ***REMOVED***
                this._pending = false;
            ***REMOVED***
            else
            ***REMOVED***
                this.video.pause();
            ***REMOVED***
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Updates the given Display Objects so they use this Video as their texture.
    * This will replace any texture they will currently have set.
    *
    * @method Phaser.Video#add
    * @param ***REMOVED***Phaser.Sprite|Phaser.Sprite[]|Phaser.Image|Phaser.Image[]***REMOVED*** object - Either a single Sprite/Image or an Array of Sprites/Images.
    * @return ***REMOVED***Phaser.Video***REMOVED*** This Video object for method chaining.
    */
    add: function (object) ***REMOVED***

        if (Array.isArray(object))
        ***REMOVED***
            for (var i = 0; i < object.length; i++)
            ***REMOVED***
                if (object[i]['loadTexture'])
                ***REMOVED***
                    object[i].loadTexture(this);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else
        ***REMOVED***
            object.loadTexture(this);
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Creates a new Phaser.Image object, assigns this Video to be its texture, adds it to the world then returns it.
    *
    * @method Phaser.Video#addToWorld
    * @param ***REMOVED***number***REMOVED*** [x=0] - The x coordinate to place the Image at.
    * @param ***REMOVED***number***REMOVED*** [y=0] - The y coordinate to place the Image at.
    * @param ***REMOVED***number***REMOVED*** [anchorX=0] - Set the x anchor point of the Image. A value between 0 and 1, where 0 is the top-left and 1 is bottom-right.
    * @param ***REMOVED***number***REMOVED*** [anchorY=0] - Set the y anchor point of the Image. A value between 0 and 1, where 0 is the top-left and 1 is bottom-right.
    * @param ***REMOVED***number***REMOVED*** [scaleX=1] - The horizontal scale factor of the Image. A value of 1 means no scaling. 2 would be twice the size, and so on.
    * @param ***REMOVED***number***REMOVED*** [scaleY=1] - The vertical scale factor of the Image. A value of 1 means no scaling. 2 would be twice the size, and so on.
    * @return ***REMOVED***Phaser.Image***REMOVED*** The newly added Image object.
    */
    addToWorld: function (x, y, anchorX, anchorY, scaleX, scaleY) ***REMOVED***

        scaleX = scaleX || 1;
        scaleY = scaleY || 1;

        var image = this.game.add.image(x, y, this);

        image.anchor.set(anchorX, anchorY);
        image.scale.set(scaleX, scaleY);

        return image;

    ***REMOVED***,

    /**
    * If the game is running in WebGL this will push the texture up to the GPU if it's dirty.
    * This is called automatically if the Video is being used by a Sprite, otherwise you need to remember to call it in your render function.
    * If you wish to suppress this functionality set Video.disableTextureUpload to `true`.
    *
    * @method Phaser.Video#render
    */
    render: function () ***REMOVED***

        if (!this.disableTextureUpload && this.playing)
        ***REMOVED***
            this.baseTexture.dirty();
        ***REMOVED***

    ***REMOVED***,

    /**
    * Internal handler called automatically by the Video.mute setter.
    *
    * @method Phaser.Video#setMute
    * @private
    */
    setMute: function () ***REMOVED***

        if (this._muted)
        ***REMOVED***
            return;
        ***REMOVED***

        this._muted = true;

        this.video.muted = true;

    ***REMOVED***,

    /**
    * Internal handler called automatically by the Video.mute setter.
    *
    * @method Phaser.Video#unsetMute
    * @private
    */
    unsetMute: function () ***REMOVED***

        if (!this._muted || this._codeMuted)
        ***REMOVED***
            return;
        ***REMOVED***

        this._muted = false;

        this.video.muted = false;

    ***REMOVED***,

    /**
    * Internal handler called automatically by the Video.paused setter.
    *
    * @method Phaser.Video#setPause
    * @private
    */
    setPause: function () ***REMOVED***

        if (this._paused || this.touchLocked)
        ***REMOVED***
            return;
        ***REMOVED***

        this._paused = true;

        this.video.pause();

    ***REMOVED***,

    /**
    * Internal handler called automatically by the Video.paused setter.
    *
    * @method Phaser.Video#setResume
    * @private
    */
    setResume: function () ***REMOVED***

        if (!this._paused || this._codePaused || this.touchLocked)
        ***REMOVED***
            return;
        ***REMOVED***

        this._paused = false;

        if (!this.video.ended)
        ***REMOVED***
            this.video.play();
        ***REMOVED***

    ***REMOVED***,

    /**
     * On some mobile browsers you cannot play a video until the user has explicitly touched the video to allow it.
     * Phaser handles this via the `setTouchLock` method. However if you have 3 different videos, maybe an "Intro", "Start" and "Game Over"
     * split into three different Video objects, then you will need the user to touch-unlock every single one of them.
     *
     * You can avoid this by using just one Video object and simply changing the video source. Once a Video element is unlocked it remains
     * unlocked, even if the source changes. So you can use this to your benefit to avoid forcing the user to 'touch' the video yet again.
     *
     * As you'd expect there are limitations. So far we've found that the videos need to be in the same encoding format and bitrate.
     * This method will automatically handle a change in video dimensions, but if you try swapping to a different bitrate we've found it
     * cannot render the new video on iOS (desktop browsers cope better).
     *
     * When the video source is changed the video file is requested over the network. Listen for the `onChangeSource` signal to know
     * when the new video has downloaded enough content to be able to be played. Previous settings such as the volume and loop state
     * are adopted automatically by the new video.
     *
     * @method Phaser.Video#changeSource
     * @param ***REMOVED***string***REMOVED*** src - The new URL to change the video.src to.
     * @param ***REMOVED***boolean***REMOVED*** [autoplay=true] - Should the video play automatically after the source has been updated?
     * @return ***REMOVED***Phaser.Video***REMOVED*** This Video object for method chaining.
     */
    changeSource: function (src, autoplay) ***REMOVED***

        if (autoplay === undefined) ***REMOVED*** autoplay = true; ***REMOVED***

        //  Invalidate the texture while we wait for the new one to load (crashes IE11 otherwise)
        this.texture.valid = false;

        this.video.pause();

        this.retry = this.retryLimit;

        this._retryID = window.setTimeout(this.checkVideoProgress.bind(this), this.retryInterval);

        this.video.src = src;

        this.video.load();

        this._autoplay = autoplay;

        if (!autoplay)
        ***REMOVED***
            this.paused = true;
        ***REMOVED***

        return this;

    ***REMOVED***,

    /**
    * Internal callback that monitors the download progress of a video after changing its source.
    *
    * @method Phaser.Video#checkVideoProgress
    * @private
    */
    checkVideoProgress: function () ***REMOVED***

        // if (this.video.readyState === 2 || this.video.readyState === 4)
        if (this.video.readyState === 4)
        ***REMOVED***
            //  We've got enough data to update the texture for playback
            this.updateTexture();
        ***REMOVED***
        else
        ***REMOVED***
            this.retry--;

            if (this.retry > 0)
            ***REMOVED***
                this._retryID = window.setTimeout(this.checkVideoProgress.bind(this), this.retryInterval);
            ***REMOVED***
            else
            ***REMOVED***
                console.warn('Phaser.Video: Unable to start downloading video in time', this.isStreaming);
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets the Input Manager touch callback to be Video.unlock.
    * Required for mobile video unlocking. Mostly just used internally.
    *
    * @method Phaser.Video#setTouchLock
    */
    setTouchLock: function () ***REMOVED***

        this.game.input.touch.addTouchLockCallback(this.unlock, this);
        this.touchLocked = true;

    ***REMOVED***,

    /**
    * Enables the video on mobile devices, usually after the first touch.
    * If the SoundManager hasn't been unlocked then this will automatically unlock that as well.
    * Only one video can be pending unlock at any one time.
    *
    * @method Phaser.Video#unlock
    */
    unlock: function () ***REMOVED***

        this.touchLocked = false;

        this.video.play();

        this.onPlay.dispatch(this, this.loop, this.playbackRate);

        if (this.key)
        ***REMOVED***
            var _video = this.game.cache.getVideo(this.key);

            if (_video && !_video.isBlob)
            ***REMOVED***
                _video.locked = false;
            ***REMOVED***
        ***REMOVED***

        return true;

    ***REMOVED***,

    /**
     * Grabs the current frame from the Video or Video Stream and renders it to the Video.snapshot BitmapData.
     *
     * You can optionally set if the BitmapData should be cleared or not, the alpha and the blend mode of the draw.
     *
     * If you need more advanced control over the grabbing them call `Video.snapshot.copy` directly with the same parameters as BitmapData.copy.
     *
     * @method Phaser.Video#grab
     * @param ***REMOVED***boolean***REMOVED*** [clear=false] - Should the BitmapData be cleared before the Video is grabbed? Unless you are using alpha or a blend mode you can usually leave this set to false.
     * @param ***REMOVED***number***REMOVED*** [alpha=1] - The alpha that will be set on the video before drawing. A value between 0 (fully transparent) and 1, opaque.
     * @param ***REMOVED***string***REMOVED*** [blendMode=null] - The composite blend mode that will be used when drawing. The default is no blend mode at all. This is a Canvas globalCompositeOperation value such as 'lighter' or 'xor'.
     * @return ***REMOVED***Phaser.BitmapData***REMOVED*** A reference to the Video.snapshot BitmapData object for further method chaining.
     */
    grab: function (clear, alpha, blendMode) ***REMOVED***

        if (clear === undefined) ***REMOVED*** clear = false; ***REMOVED***
        if (alpha === undefined) ***REMOVED*** alpha = 1; ***REMOVED***
        if (blendMode === undefined) ***REMOVED*** blendMode = null; ***REMOVED***

        if (this.snapshot === null)
        ***REMOVED***
            console.warn('Video.grab cannot run because Phaser.BitmapData is unavailable');
            return;
        ***REMOVED***

        if (clear)
        ***REMOVED***
            this.snapshot.cls();
        ***REMOVED***

        this.snapshot.copy(this.video, 0, 0, this.width, this.height, 0, 0, this.width, this.height, 0, 0, 0, 1, 1, alpha, blendMode);

        return this.snapshot;

    ***REMOVED***,

    /**
     * Removes the Video element from the DOM by calling parentNode.removeChild on itself.
     * Also removes the autoplay and src attributes and nulls the reference.
     *
     * @method Phaser.Video#removeVideoElement
     */
    removeVideoElement: function () ***REMOVED***

        if (!this.video)
        ***REMOVED***
            return;
        ***REMOVED***

        if (this.video.parentNode)
        ***REMOVED***
            this.video.parentNode.removeChild(this.video);
        ***REMOVED***

        while (this.video.hasChildNodes())
        ***REMOVED***
            this.video.removeChild(this.video.firstChild);
        ***REMOVED***

        this.video.removeAttribute('autoplay');
        this.video.removeAttribute('src');

        this.video = null;

    ***REMOVED***,

    /**
     * Destroys the Video object. This calls `Video.stop` and then `Video.removeVideoElement`.
     * If any Sprites are using this Video as their texture it is up to you to manage those.
     *
     * @method Phaser.Video#destroy
     */
    destroy: function () ***REMOVED***

        this.stop();

        this.removeVideoElement();

        if (this.touchLocked)
        ***REMOVED***
            this.game.input.touch.removeTouchLockCallback(this.unlock, this);
        ***REMOVED***

        if (this._retryID)
        ***REMOVED***
            window.clearTimeout(this._retryID);
        ***REMOVED***

    ***REMOVED***

***REMOVED***;

/**
* @name Phaser.Video#currentTime
* @property ***REMOVED***number***REMOVED*** currentTime - The current time of the video in seconds. If set the video will attempt to seek to that point in time.
*/
Object.defineProperty(Phaser.Video.prototype, "currentTime", ***REMOVED***

    get: function () ***REMOVED***

        return (this.video) ? this.video.currentTime : 0;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        this.video.currentTime = value;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Video#duration
* @property ***REMOVED***number***REMOVED*** duration - The duration of the video in seconds.
* @readOnly
*/
Object.defineProperty(Phaser.Video.prototype, "duration", ***REMOVED***

    get: function () ***REMOVED***

        return (this.video) ? this.video.duration : 0;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Video#progress
* @property ***REMOVED***number***REMOVED*** progress - The progress of this video. This is a value between 0 and 1, where 0 is the start and 1 is the end of the video.
* @readOnly
*/
Object.defineProperty(Phaser.Video.prototype, "progress", ***REMOVED***

    get: function () ***REMOVED***

        return (this.video) ? (this.video.currentTime / this.video.duration) : 0;

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Video#mute
* @property ***REMOVED***boolean***REMOVED*** mute - Gets or sets the muted state of the Video.
*/
Object.defineProperty(Phaser.Video.prototype, "mute", ***REMOVED***

    get: function () ***REMOVED***

        return this._muted;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        value = value || null;

        if (value)
        ***REMOVED***
            if (this._muted)
            ***REMOVED***
                return;
            ***REMOVED***

            this._codeMuted = true;
            this.setMute();
        ***REMOVED***
        else
        ***REMOVED***
            if (!this._muted)
            ***REMOVED***
                return;
            ***REMOVED***

            this._codeMuted = false;
            this.unsetMute();
        ***REMOVED***
    ***REMOVED***

***REMOVED***);

/**
* Gets or sets the paused state of the Video.
* If the video is still touch locked (such as on iOS devices) this call has no effect.
*
* @name Phaser.Video#paused
* @property ***REMOVED***boolean***REMOVED*** paused
*/
Object.defineProperty(Phaser.Video.prototype, "paused", ***REMOVED***

    get: function () ***REMOVED***

        return this._paused;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        value = value || null;

        if (this.touchLocked)
        ***REMOVED***
            return;
        ***REMOVED***

        if (value)
        ***REMOVED***
            if (this._paused)
            ***REMOVED***
                return;
            ***REMOVED***

            this._codePaused = true;
            this.setPause();
        ***REMOVED***
        else
        ***REMOVED***
            if (!this._paused)
            ***REMOVED***
                return;
            ***REMOVED***

            this._codePaused = false;
            this.setResume();
        ***REMOVED***
    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Video#volume
* @property ***REMOVED***number***REMOVED*** volume - Gets or sets the volume of the Video, a value between 0 and 1. The value given is clamped to the range 0 to 1.
*/
Object.defineProperty(Phaser.Video.prototype, "volume", ***REMOVED***

    get: function () ***REMOVED***

        return (this.video) ? this.video.volume : 1;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value < 0)
        ***REMOVED***
            value = 0;
        ***REMOVED***
        else if (value > 1)
        ***REMOVED***
            value = 1;
        ***REMOVED***

        if (this.video)
        ***REMOVED***
            this.video.volume = value;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Video#playbackRate
* @property ***REMOVED***number***REMOVED*** playbackRate - Gets or sets the playback rate of the Video. This is the speed at which the video is playing.
*/
Object.defineProperty(Phaser.Video.prototype, "playbackRate", ***REMOVED***

    get: function () ***REMOVED***

        return (this.video) ? this.video.playbackRate : 1;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (this.video)
        ***REMOVED***
            this.video.playbackRate = value;
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* Gets or sets if the Video is set to loop.
* Please note that at present some browsers (i.e. Chrome) do not support *seamless* video looping.
* If the video isn't yet set this will always return false.
*
* @name Phaser.Video#loop
* @property ***REMOVED***boolean***REMOVED*** loop
*/
Object.defineProperty(Phaser.Video.prototype, "loop", ***REMOVED***

    get: function () ***REMOVED***

        return (this.video) ? this.video.loop : false;

    ***REMOVED***,

    set: function (value) ***REMOVED***

        if (value && this.video)
        ***REMOVED***
            this.video.loop = 'loop';
        ***REMOVED***
        else if (this.video)
        ***REMOVED***
            this.video.loop = '';
        ***REMOVED***

    ***REMOVED***

***REMOVED***);

/**
* @name Phaser.Video#playing
* @property ***REMOVED***boolean***REMOVED*** playing - True if the video is currently playing (and not paused or ended), otherwise false.
* @readOnly
*/
Object.defineProperty(Phaser.Video.prototype, "playing", ***REMOVED***

    get: function () ***REMOVED***

        return !(this.video.paused && this.video.ended);

    ***REMOVED***

***REMOVED***);

Phaser.Video.prototype.constructor = Phaser.Video;
