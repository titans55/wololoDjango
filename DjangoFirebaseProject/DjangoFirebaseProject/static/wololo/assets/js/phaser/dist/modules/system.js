/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* @classdesc
* Detects device support capabilities and is responsible for device initialization - see ***REMOVED***@link Phaser.Device.whenReady whenReady***REMOVED***.
*
* This class represents a singleton object that can be accessed directly as `game.device`
* (or, as a fallback, `Phaser.Device` when a game instance is not available) without the need to instantiate it.
*
* Unless otherwise noted the device capabilities are only guaranteed after initialization. Initialization
* occurs automatically and is guaranteed complete before ***REMOVED***@link Phaser.Game***REMOVED*** begins its "boot" phase.
* Feature detection can be modified in the ***REMOVED***@link Phaser.Device.onInitialized onInitialized***REMOVED*** signal.
*
* When checking features using the exposed properties only the *truth-iness* of the value should be relied upon
* unless the documentation states otherwise: properties may return `false`, `''`, `null`, or even `undefined`
* when indicating the lack of a feature.
*
* Uses elements from System.js by MrDoob and Modernizr
*
* @description
* It is not possible to instantiate the Device class manually.
*
* @class
* @protected
*/
Phaser.Device = function () ***REMOVED***

    /**
    * The time the device became ready.
    * @property ***REMOVED***integer***REMOVED*** deviceReadyAt
    * @protected
    */
    this.deviceReadyAt = 0;

    /**
    * The time as which initialization has completed.
    * @property ***REMOVED***boolean***REMOVED*** initialized
    * @protected
    */
    this.initialized = false;

    //  Browser / Host / Operating System

    /**
    * @property ***REMOVED***boolean***REMOVED*** desktop - Is running on a desktop?
    * @default
    */
    this.desktop = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** iOS - Is running on iOS?
    * @default
    */
    this.iOS = false;

    /**
    * @property ***REMOVED***number***REMOVED*** iOSVersion - If running in iOS this will contain the major version number.
    * @default
    */
    this.iOSVersion = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** cocoonJS - Is the game running under CocoonJS?
    * @default
    */
    this.cocoonJS = false;
    
    /**
    * @property ***REMOVED***boolean***REMOVED*** cocoonJSApp - Is this game running with CocoonJS.App?
    * @default
    */
    this.cocoonJSApp = false;
    
    /**
    * @property ***REMOVED***boolean***REMOVED*** cordova - Is the game running under Apache Cordova?
    * @default
    */
    this.cordova = false;
    
    /**
    * @property ***REMOVED***boolean***REMOVED*** node - Is the game running under Node.js?
    * @default
    */
    this.node = false;
    
    /**
    * @property ***REMOVED***boolean***REMOVED*** nodeWebkit - Is the game running under Node-Webkit?
    * @default
    */
    this.nodeWebkit = false;
    
    /**
    * @property ***REMOVED***boolean***REMOVED*** electron - Is the game running under GitHub Electron?
    * @default
    */
    this.electron = false;
    
    /**
    * @property ***REMOVED***boolean***REMOVED*** ejecta - Is the game running under Ejecta?
    * @default
    */
    this.ejecta = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** crosswalk - Is the game running under the Intel Crosswalk XDK?
    * @default
    */
    this.crosswalk = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** android - Is running on android?
    * @default
    */
    this.android = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** chromeOS - Is running on chromeOS?
    * @default
    */
    this.chromeOS = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** linux - Is running on linux?
    * @default
    */
    this.linux = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** macOS - Is running on macOS?
    * @default
    */
    this.macOS = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** windows - Is running on windows?
    * @default
    */
    this.windows = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** windowsPhone - Is running on a Windows Phone?
    * @default
    */
    this.windowsPhone = false;

    //  Features

    /**
    * @property ***REMOVED***boolean***REMOVED*** canvas - Is canvas available?
    * @default
    */
    this.canvas = false;

    /**
    * @property ***REMOVED***?boolean***REMOVED*** canvasBitBltShift - True if canvas supports a 'copy' bitblt onto itself when the source and destination regions overlap.
    * @default
    */
    this.canvasBitBltShift = null;

    /**
    * @property ***REMOVED***boolean***REMOVED*** webGL - Is webGL available?
    * @default
    */
    this.webGL = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** file - Is file available?
    * @default
    */
    this.file = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** fileSystem - Is fileSystem available?
    * @default
    */
    this.fileSystem = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** localStorage - Is localStorage available?
    * @default
    */
    this.localStorage = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** worker - Is worker available?
    * @default
    */
    this.worker = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** css3D - Is css3D available?
    * @default
    */
    this.css3D = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** pointerLock - Is Pointer Lock available?
    * @default
    */
    this.pointerLock = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** typedArray - Does the browser support TypedArrays?
    * @default
    */
    this.typedArray = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** vibration - Does the device support the Vibration API?
    * @default
    */
    this.vibration = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** getUserMedia - Does the device support the getUserMedia API?
    * @default
    */
    this.getUserMedia = true;

    /**
    * @property ***REMOVED***boolean***REMOVED*** quirksMode - Is the browser running in strict mode (false) or quirks mode? (true)
    * @default
    */
    this.quirksMode = false;

    //  Input

    /**
    * @property ***REMOVED***boolean***REMOVED*** touch - Is touch available?
    * @default
    */
    this.touch = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** mspointer - Is mspointer available?
    * @default
    */
    this.mspointer = false;

    /**
    * @property ***REMOVED***?string***REMOVED*** wheelType - The newest type of Wheel/Scroll event supported: 'wheel', 'mousewheel', 'DOMMouseScroll'
    * @default
    * @protected
    */
    this.wheelEvent = null;

    //  Browser

    /**
    * @property ***REMOVED***boolean***REMOVED*** arora - Set to true if running in Arora.
    * @default
    */
    this.arora = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** chrome - Set to true if running in Chrome.
    * @default
    */
    this.chrome = false;

    /**
    * @property ***REMOVED***number***REMOVED*** chromeVersion - If running in Chrome this will contain the major version number.
    * @default
    */
    this.chromeVersion = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** epiphany - Set to true if running in Epiphany.
    * @default
    */
    this.epiphany = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** firefox - Set to true if running in Firefox.
    * @default
    */
    this.firefox = false;

    /**
    * @property ***REMOVED***number***REMOVED*** firefoxVersion - If running in Firefox this will contain the major version number.
    * @default
    */
    this.firefoxVersion = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** ie - Set to true if running in Internet Explorer.
    * @default
    */
    this.ie = false;

    /**
    * @property ***REMOVED***number***REMOVED*** ieVersion - If running in Internet Explorer this will contain the major version number. Beyond IE10 you should use Device.trident and Device.tridentVersion.
    * @default
    */
    this.ieVersion = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** trident - Set to true if running a Trident version of Internet Explorer (IE11+)
    * @default
    */
    this.trident = false;

    /**
    * @property ***REMOVED***number***REMOVED*** tridentVersion - If running in Internet Explorer 11 this will contain the major version number. See ***REMOVED***@link http://msdn.microsoft.com/en-us/library/ie/ms537503(v=vs.85).aspx***REMOVED***
    * @default
    */
    this.tridentVersion = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** edge - Set to true if running in Microsoft Edge browser.
    * @default
    */
    this.edge = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** mobileSafari - Set to true if running in Mobile Safari.
    * @default
    */
    this.mobileSafari = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** midori - Set to true if running in Midori.
    * @default
    */
    this.midori = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** opera - Set to true if running in Opera.
    * @default
    */
    this.opera = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** safari - Set to true if running in Safari.
    * @default
    */
    this.safari = false;

    /**
    * @property ***REMOVED***number***REMOVED*** safariVersion - If running in Safari this will contain the major version number.
    * @default
    */
    this.safariVersion = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** webApp - Set to true if running as a WebApp, i.e. within a WebView
    * @default
    */
    this.webApp = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** silk - Set to true if running in the Silk browser (as used on the Amazon Kindle)
    * @default
    */
    this.silk = false;

    //  Audio

    /**
    * @property ***REMOVED***boolean***REMOVED*** audioData - Are Audio tags available?
    * @default
    */
    this.audioData = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** webAudio - Is the WebAudio API available?
    * @default
    */
    this.webAudio = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** ogg - Can this device play ogg files?
    * @default
    */
    this.ogg = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** opus - Can this device play opus files?
    * @default
    */
    this.opus = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** mp3 - Can this device play mp3 files?
    * @default
    */
    this.mp3 = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** wav - Can this device play wav files?
    * @default
    */
    this.wav = false;

    /**
    * Can this device play m4a files?
    * @property ***REMOVED***boolean***REMOVED*** m4a - True if this device can play m4a files.
    * @default
    */
    this.m4a = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** webm - Can this device play webm files?
    * @default
    */
    this.webm = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** dolby - Can this device play EC-3 Dolby Digital Plus files?
    * @default
    */
    this.dolby = false;

    //  Video

    /**
    * @property ***REMOVED***boolean***REMOVED*** oggVideo - Can this device play ogg video files?
    * @default
    */
    this.oggVideo = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** h264Video - Can this device play h264 mp4 video files?
    * @default
    */
    this.h264Video = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** mp4Video - Can this device play h264 mp4 video files?
    * @default
    */
    this.mp4Video = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** webmVideo - Can this device play webm video files?
    * @default
    */
    this.webmVideo = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** vp9Video - Can this device play vp9 video files?
    * @default
    */
    this.vp9Video = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** hlsVideo - Can this device play hls video files?
    * @default
    */
    this.hlsVideo = false;

    //  Device

    /**
    * @property ***REMOVED***boolean***REMOVED*** iPhone - Is running on iPhone?
    * @default
    */
    this.iPhone = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** iPhone4 - Is running on iPhone4?
    * @default
    */
    this.iPhone4 = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** iPad - Is running on iPad?
    * @default
    */
    this.iPad = false;

    // Device features

    /**
    * @property ***REMOVED***number***REMOVED*** pixelRatio - PixelRatio of the host device?
    * @default
    */
    this.pixelRatio = 0;

    /**
    * @property ***REMOVED***boolean***REMOVED*** littleEndian - Is the device big or little endian? (only detected if the browser supports TypedArrays)
    * @default
    */
    this.littleEndian = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** LITTLE_ENDIAN - Same value as `littleEndian`.
    * @default
    */
    this.LITTLE_ENDIAN = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** support32bit - Does the device context support 32bit pixel manipulation using array buffer views?
    * @default
    */
    this.support32bit = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** fullscreen - Does the browser support the Full Screen API?
    * @default
    */
    this.fullscreen = false;

    /**
    * @property ***REMOVED***string***REMOVED*** requestFullscreen - If the browser supports the Full Screen API this holds the call you need to use to activate it.
    * @default
    */
    this.requestFullscreen = '';

    /**
    * @property ***REMOVED***string***REMOVED*** cancelFullscreen - If the browser supports the Full Screen API this holds the call you need to use to cancel it.
    * @default
    */
    this.cancelFullscreen = '';

    /**
    * @property ***REMOVED***boolean***REMOVED*** fullscreenKeyboard - Does the browser support access to the Keyboard during Full Screen mode?
    * @default
    */
    this.fullscreenKeyboard = false;

***REMOVED***;

// Device is really a singleton/static entity; instantiate it
// and add new methods directly sans-prototype.
Phaser.Device = new Phaser.Device();

/**
* This signal is dispatched after device initialization occurs but before any of the ready
* callbacks (see ***REMOVED***@link Phaser.Device.whenReady whenReady***REMOVED***) have been invoked.
*
* Local "patching" for a particular device can/should be done in this event.
*
* _Note_: This signal is removed after the device has been readied; if a handler has not been
* added _before_ `new Phaser.Game(..)` it is probably too late.
*
* @type ***REMOVED***?Phaser.Signal***REMOVED***
* @static
*/
Phaser.Device.onInitialized = new Phaser.Signal();

/**
* Add a device-ready handler and ensure the device ready sequence is started.
*
* Phaser.Device will _not_ activate or initialize until at least one `whenReady` handler is added,
* which is normally done automatically be calling `new Phaser.Game(..)`.
*
* The handler is invoked when the device is considered "ready", which may be immediately
* if the device is already "ready". See ***REMOVED***@link Phaser.Device#deviceReadyAt deviceReadyAt***REMOVED***.
*
* @method
* @param ***REMOVED***function***REMOVED*** handler - Callback to invoke when the device is ready. It is invoked with the given context the Phaser.Device object is supplied as the first argument.
* @param ***REMOVED***object***REMOVED*** [context] - Context in which to invoke the handler
* @param ***REMOVED***boolean***REMOVED*** [nonPrimer=false] - If true the device ready check will not be started.
*/
Phaser.Device.whenReady = function (callback, context, nonPrimer) ***REMOVED***

    var readyCheck = this._readyCheck;

    if (this.deviceReadyAt || !readyCheck)
    ***REMOVED***
        callback.call(context, this);
    ***REMOVED***
    else if (readyCheck._monitor || nonPrimer)
    ***REMOVED***
        readyCheck._queue = readyCheck._queue || [];
        readyCheck._queue.push([callback, context]);
    ***REMOVED***
    else
    ***REMOVED***
        readyCheck._monitor = readyCheck.bind(this);
        readyCheck._queue = readyCheck._queue || [];
        readyCheck._queue.push([callback, context]);
        
        var cordova = typeof window.cordova !== 'undefined';
        var cocoonJS = navigator['isCocoonJS'];

        if (document.readyState === 'complete' || document.readyState === 'interactive')
        ***REMOVED***
            // Why is there an additional timeout here?
            window.setTimeout(readyCheck._monitor, 0);
        ***REMOVED***
        else if (cordova && !cocoonJS)
        ***REMOVED***
            // Ref. http://docs.phonegap.com/en/3.5.0/cordova_events_events.md.html#deviceready
            //  Cordova, but NOT Cocoon?
            document.addEventListener('deviceready', readyCheck._monitor, false);
        ***REMOVED***
        else
        ***REMOVED***
            document.addEventListener('DOMContentLoaded', readyCheck._monitor, false);
            window.addEventListener('load', readyCheck._monitor, false);
        ***REMOVED***
    ***REMOVED***

***REMOVED***;

/**
* Internal method used for checking when the device is ready.
* This function is removed from Phaser.Device when the device becomes ready.
*
* @method
* @private
*/
Phaser.Device._readyCheck = function () ***REMOVED***

    var readyCheck = this._readyCheck;

    if (!document.body)
    ***REMOVED***
        window.setTimeout(readyCheck._monitor, 20);
    ***REMOVED***
    else if (!this.deviceReadyAt)
    ***REMOVED***
        this.deviceReadyAt = Date.now();

        document.removeEventListener('deviceready', readyCheck._monitor);
        document.removeEventListener('DOMContentLoaded', readyCheck._monitor);
        window.removeEventListener('load', readyCheck._monitor);

        this._initialize();
        this.initialized = true;

        this.onInitialized.dispatch(this);

        var item;
        while ((item = readyCheck._queue.shift()))
        ***REMOVED***
            var callback = item[0];
            var context = item[1];
            callback.call(context, this);
        ***REMOVED***

        // Remove no longer useful methods and properties.
        this._readyCheck = null;
        this._initialize = null;
        this.onInitialized = null;
    ***REMOVED***

***REMOVED***;

/**
* Internal method to initialize the capability checks.
* This function is removed from Phaser.Device once the device is initialized.
*
* @method
* @private
*/
Phaser.Device._initialize = function () ***REMOVED***

    var device = this;

    /**
    * Check which OS is game running on.
    */
    function _checkOS () ***REMOVED***

        var ua = navigator.userAgent;

        if (/Playstation Vita/.test(ua))
        ***REMOVED***
            device.vita = true;
        ***REMOVED***
        else if (/Kindle/.test(ua) || /\bKF[A-Z][A-Z]+/.test(ua) || /Silk.*Mobile Safari/.test(ua))
        ***REMOVED***
            device.kindle = true;
            // This will NOT detect early generations of Kindle Fire, I think there is no reliable way...
            // E.g. "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.1.0-80) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true"
        ***REMOVED***
        else if (/Android/.test(ua))
        ***REMOVED***
            device.android = true;
        ***REMOVED***
        else if (/CrOS/.test(ua))
        ***REMOVED***
            device.chromeOS = true;
        ***REMOVED***
        else if (/iP[ao]d|iPhone/i.test(ua))
        ***REMOVED***
            device.iOS = true;
            (navigator.appVersion).match(/OS (\d+)/);
            device.iOSVersion = parseInt(RegExp.$1, 10);
        ***REMOVED***
        else if (/Linux/.test(ua))
        ***REMOVED***
            device.linux = true;
        ***REMOVED***
        else if (/Mac OS/.test(ua))
        ***REMOVED***
            device.macOS = true;
        ***REMOVED***
        else if (/Windows/.test(ua))
        ***REMOVED***
            device.windows = true;
        ***REMOVED***

        if (/Windows Phone/i.test(ua) || /IEMobile/i.test(ua))
        ***REMOVED***
            device.android = false;
            device.iOS = false;
            device.macOS = false;
            device.windows = true;
            device.windowsPhone = true;
        ***REMOVED***

        var silk = /Silk/.test(ua); // detected in browsers

        if (device.windows || device.macOS || (device.linux && !silk) || device.chromeOS)
        ***REMOVED***
            device.desktop = true;
        ***REMOVED***

        //  Windows Phone / Table reset
        if (device.windowsPhone || ((/Windows NT/i.test(ua)) && (/Touch/i.test(ua))))
        ***REMOVED***
            device.desktop = false;
        ***REMOVED***

    ***REMOVED***

    /**
    * Check HTML5 features of the host environment.
    */
    function _checkFeatures () ***REMOVED***

        device.canvas = !!window['CanvasRenderingContext2D'] || device.cocoonJS;

        try ***REMOVED***
            device.localStorage = !!localStorage.getItem;
        ***REMOVED*** catch (error) ***REMOVED***
            device.localStorage = false;
        ***REMOVED***

        device.file = !!window['File'] && !!window['FileReader'] && !!window['FileList'] && !!window['Blob'];
        device.fileSystem = !!window['requestFileSystem'];

        device.webGL = ( function () ***REMOVED*** try ***REMOVED*** var canvas = document.createElement( 'canvas' ); /*Force screencanvas to false*/ canvas.screencanvas = false; return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ); ***REMOVED*** catch( e ) ***REMOVED*** return false; ***REMOVED*** ***REMOVED*** )();
        device.webGL = !!device.webGL;

        device.worker = !!window['Worker'];

        device.pointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

        device.quirksMode = (document.compatMode === 'CSS1Compat') ? false : true;

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

        device.getUserMedia = device.getUserMedia && !!navigator.getUserMedia && !!window.URL;

        // Older versions of firefox (< 21) apparently claim support but user media does not actually work
        if (device.firefox && device.firefoxVersion < 21)
        ***REMOVED***
            device.getUserMedia = false;
        ***REMOVED***

        // TODO: replace canvasBitBltShift detection with actual feature check

        // Excludes iOS versions as they generally wrap UIWebView (eg. Safari WebKit) and it
        // is safer to not try and use the fast copy-over method.
        if (!device.iOS && (device.ie || device.firefox || device.chrome))
        ***REMOVED***
            device.canvasBitBltShift = true;
        ***REMOVED***

        // Known not to work
        if (device.safari || device.mobileSafari)
        ***REMOVED***
            device.canvasBitBltShift = false;
        ***REMOVED***

    ***REMOVED***

    /**
    * Checks/configures various input.
    */
    function _checkInput () ***REMOVED***

        if ('ontouchstart' in document.documentElement || (window.navigator.maxTouchPoints && window.navigator.maxTouchPoints >= 1))
        ***REMOVED***
            device.touch = true;
        ***REMOVED***

        if (window.navigator.msPointerEnabled || window.navigator.pointerEnabled)
        ***REMOVED***
            device.mspointer = true;
        ***REMOVED***

        if (!device.cocoonJS)
        ***REMOVED***
            // See https://developer.mozilla.org/en-US/docs/Web/Events/wheel
            if ('onwheel' in window || (device.ie && 'WheelEvent' in window))
            ***REMOVED***
                // DOM3 Wheel Event: FF 17+, IE 9+, Chrome 31+, Safari 7+
                device.wheelEvent = 'wheel';
            ***REMOVED***
            else if ('onmousewheel' in window)
            ***REMOVED***
                // Non-FF legacy: IE 6-9, Chrome 1-31, Safari 5-7.
                device.wheelEvent = 'mousewheel';
            ***REMOVED***
            else if (device.firefox && 'MouseScrollEvent' in window)
            ***REMOVED***
                // FF prior to 17. This should probably be scrubbed.
                device.wheelEvent = 'DOMMouseScroll';
            ***REMOVED***
        ***REMOVED***

    ***REMOVED***

    /**
    * Checks for support of the Full Screen API.
    */
    function _checkFullScreenSupport () ***REMOVED***

        var fs = [
            'requestFullscreen',
            'requestFullScreen',
            'webkitRequestFullscreen',
            'webkitRequestFullScreen',
            'msRequestFullscreen',
            'msRequestFullScreen',
            'mozRequestFullScreen',
            'mozRequestFullscreen'
        ];

        var element = document.createElement('div');

        for (var i = 0; i < fs.length; i++)
        ***REMOVED***
            if (element[fs[i]])
            ***REMOVED***
                device.fullscreen = true;
                device.requestFullscreen = fs[i];
                break;
            ***REMOVED***
        ***REMOVED***

        var cfs = [
            'cancelFullScreen',
            'exitFullscreen',
            'webkitCancelFullScreen',
            'webkitExitFullscreen',
            'msCancelFullScreen',
            'msExitFullscreen',
            'mozCancelFullScreen',
            'mozExitFullscreen'
        ];

        if (device.fullscreen)
        ***REMOVED***
            for (var i = 0; i < cfs.length; i++)
            ***REMOVED***
                if (document[cfs[i]])
                ***REMOVED***
                    device.cancelFullscreen = cfs[i];
                    break;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

        //  Keyboard Input?
        if (window['Element'] && Element['ALLOW_KEYBOARD_INPUT'])
        ***REMOVED***
            device.fullscreenKeyboard = true;
        ***REMOVED***

    ***REMOVED***

    /**
    * Check what browser is game running in.
    */
    function _checkBrowser () ***REMOVED***

        var ua = navigator.userAgent;

        if (/Arora/.test(ua))
        ***REMOVED***
            device.arora = true;
        ***REMOVED***
        else if (/Edge\/\d+/.test(ua))
        ***REMOVED***
            device.edge = true;
        ***REMOVED***
        else if (/Chrome\/(\d+)/.test(ua) && !device.windowsPhone)
        ***REMOVED***
            device.chrome = true;
            device.chromeVersion = parseInt(RegExp.$1, 10);
        ***REMOVED***
        else if (/Epiphany/.test(ua))
        ***REMOVED***
            device.epiphany = true;
        ***REMOVED***
        else if (/Firefox\D+(\d+)/.test(ua))
        ***REMOVED***
            device.firefox = true;
            device.firefoxVersion = parseInt(RegExp.$1, 10);
        ***REMOVED***
        else if (/AppleWebKit/.test(ua) && device.iOS)
        ***REMOVED***
            device.mobileSafari = true;
        ***REMOVED***
        else if (/MSIE (\d+\.\d+);/.test(ua))
        ***REMOVED***
            device.ie = true;
            device.ieVersion = parseInt(RegExp.$1, 10);
        ***REMOVED***
        else if (/Midori/.test(ua))
        ***REMOVED***
            device.midori = true;
        ***REMOVED***
        else if (/Opera/.test(ua))
        ***REMOVED***
            device.opera = true;
        ***REMOVED***
        else if (/Safari\/(\d+)/.test(ua) && !device.windowsPhone)
        ***REMOVED***
            device.safari = true;

            if (/Version\/(\d+)\./.test(ua))
            ***REMOVED***
                device.safariVersion = parseInt(RegExp.$1, 10);
            ***REMOVED***
        ***REMOVED***
        else if (/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/.test(ua))
        ***REMOVED***
            device.ie = true;
            device.trident = true;
            device.tridentVersion = parseInt(RegExp.$1, 10);
            device.ieVersion = parseInt(RegExp.$3, 10);
        ***REMOVED***

        //  Silk gets its own if clause because its ua also contains 'Safari'
        if (/Silk/.test(ua))
        ***REMOVED***
            device.silk = true;
        ***REMOVED***

        //  WebApp mode in iOS
        if (navigator['standalone'])
        ***REMOVED***
            device.webApp = true;
        ***REMOVED***
        
        if (typeof window.cordova !== 'undefined')
        ***REMOVED***
            device.cordova = true;
        ***REMOVED***
        
        if (typeof process !== 'undefined' && typeof require !== 'undefined')
        ***REMOVED***
            device.node = true;
        ***REMOVED***
        
        if (device.node && typeof process.versions === 'object')
        ***REMOVED***
            device.nodeWebkit = !!process.versions['node-webkit'];
            
            device.electron = !!process.versions.electron;
        ***REMOVED***
        
        if (navigator['isCocoonJS'])
        ***REMOVED***
            device.cocoonJS = true;
        ***REMOVED***
        
        if (device.cocoonJS)
        ***REMOVED***
            try ***REMOVED***
                device.cocoonJSApp = (typeof CocoonJS !== 'undefined');
            ***REMOVED***
            catch(error)
            ***REMOVED***
                device.cocoonJSApp = false;
            ***REMOVED***
        ***REMOVED***

        if (typeof window.ejecta !== 'undefined')
        ***REMOVED***
            device.ejecta = true;
        ***REMOVED***

        if (/Crosswalk/.test(ua))
        ***REMOVED***
            device.crosswalk = true;
        ***REMOVED***

    ***REMOVED***

    /**
    * Check video support.
    */
    function _checkVideo () ***REMOVED***

        var videoElement = document.createElement("video");
        var result = false;

        try ***REMOVED***
            if (result = !!videoElement.canPlayType)
            ***REMOVED***
                if (videoElement.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ''))
                ***REMOVED***
                    device.oggVideo = true;
                ***REMOVED***

                if (videoElement.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ''))
                ***REMOVED***
                    // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
                    device.h264Video = true;
                    device.mp4Video = true;
                ***REMOVED***

                if (videoElement.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ''))
                ***REMOVED***
                    device.webmVideo = true;
                ***REMOVED***

                if (videoElement.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ''))
                ***REMOVED***
                    device.vp9Video = true;
                ***REMOVED***

                if (videoElement.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ''))
                ***REMOVED***
                    device.hlsVideo = true;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED*** catch (e) ***REMOVED******REMOVED***
    ***REMOVED***

    /**
    * Check audio support.
    */
    function _checkAudio () ***REMOVED***

        device.audioData = !!(window['Audio']);
        device.webAudio = !!(window['AudioContext'] || window['webkitAudioContext']);
        var audioElement = document.createElement('audio');
        var result = false;

        try ***REMOVED***
            if (result = !!audioElement.canPlayType)
            ***REMOVED***
                if (audioElement.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''))
                ***REMOVED***
                    device.ogg = true;
                ***REMOVED***

                if (audioElement.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, '') || audioElement.canPlayType('audio/opus;').replace(/^no$/, ''))
                ***REMOVED***
                    device.opus = true;
                ***REMOVED***

                if (audioElement.canPlayType('audio/mpeg;').replace(/^no$/, ''))
                ***REMOVED***
                    device.mp3 = true;
                ***REMOVED***

                // Mimetypes accepted:
                //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
                //   bit.ly/iphoneoscodecs
                if (audioElement.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''))
                ***REMOVED***
                    device.wav = true;
                ***REMOVED***

                if (audioElement.canPlayType('audio/x-m4a;') || audioElement.canPlayType('audio/aac;').replace(/^no$/, ''))
                ***REMOVED***
                    device.m4a = true;
                ***REMOVED***

                if (audioElement.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ''))
                ***REMOVED***
                    device.webm = true;
                ***REMOVED***

                if (audioElement.canPlayType('audio/mp4;codecs="ec-3"') !== '')
                ***REMOVED***
                    if (device.edge)
                    ***REMOVED***
                        device.dolby = true;
                    ***REMOVED***
                    else if (device.safari && device.safariVersion >= 9)
                    ***REMOVED***
                        if (/Mac OS X (\d+)_(\d+)/.test(navigator.userAgent))
                        ***REMOVED***
                            var major = parseInt(RegExp.$1, 10);
                            var minor = parseInt(RegExp.$2, 10);

                            if ((major === 10 && minor >= 11) || major > 10)
                            ***REMOVED***
                                device.dolby = true;
                            ***REMOVED***
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED*** catch (e) ***REMOVED***
        ***REMOVED***

    ***REMOVED***

    /**
    * Check Little or Big Endian system.
    *
    * @author Matt DesLauriers (@mattdesl)
    */
    function _checkIsLittleEndian () ***REMOVED***

        var a = new ArrayBuffer(4);
        var b = new Uint8Array(a);
        var c = new Uint32Array(a);

        b[0] = 0xa1;
        b[1] = 0xb2;
        b[2] = 0xc3;
        b[3] = 0xd4;

        if (c[0] === 0xd4c3b2a1)
        ***REMOVED***
            return true;
        ***REMOVED***

        if (c[0] === 0xa1b2c3d4)
        ***REMOVED***
            return false;
        ***REMOVED***
        else
        ***REMOVED***
            //  Could not determine endianness
            return null;
        ***REMOVED***

    ***REMOVED***

    /**
    * Test to see if ImageData uses CanvasPixelArray or Uint8ClampedArray.
    *
    * @author Matt DesLauriers (@mattdesl)
    */
    function _checkIsUint8ClampedImageData () ***REMOVED***

        if (Uint8ClampedArray === undefined)
        ***REMOVED***
            return false;
        ***REMOVED***

        var elem = PIXI.CanvasPool.create(this, 1, 1);
        var ctx = elem.getContext('2d');

        if (!ctx)
        ***REMOVED***
            return false;
        ***REMOVED***

        var image = ctx.createImageData(1, 1);

        PIXI.CanvasPool.remove(this);

        return image.data instanceof Uint8ClampedArray;

    ***REMOVED***

    /**
    * Check PixelRatio, iOS device, Vibration API, ArrayBuffers and endianess.
    */
    function _checkDevice () ***REMOVED***

        device.pixelRatio = window['devicePixelRatio'] || 1;
        device.iPhone = navigator.userAgent.toLowerCase().indexOf('iphone') !== -1;
        device.iPhone4 = (device.pixelRatio === 2 && device.iPhone);
        device.iPad = navigator.userAgent.toLowerCase().indexOf('ipad') !== -1;

        if (typeof Int8Array !== 'undefined')
        ***REMOVED***
            device.typedArray = true;
        ***REMOVED***
        else
        ***REMOVED***
            device.typedArray = false;
        ***REMOVED***

        if (typeof ArrayBuffer !== 'undefined' && typeof Uint8Array !== 'undefined' && typeof Uint32Array !== 'undefined')
        ***REMOVED***
            device.littleEndian = _checkIsLittleEndian();
            device.LITTLE_ENDIAN = device.littleEndian;
        ***REMOVED***

        device.support32bit = (typeof ArrayBuffer !== 'undefined' && typeof Uint8ClampedArray !== 'undefined' && typeof Int32Array !== 'undefined' && device.littleEndian !== null && _checkIsUint8ClampedImageData());

        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

        if (navigator.vibrate)
        ***REMOVED***
            device.vibration = true;
        ***REMOVED***

    ***REMOVED***

    /**
    * Check whether the host environment support 3D CSS.
    */
    function _checkCSS3D () ***REMOVED***

        var el = document.createElement('p');
        var has3d;
        var transforms = ***REMOVED***
            'webkitTransform': '-webkit-transform',
            'OTransform': '-o-transform',
            'msTransform': '-ms-transform',
            'MozTransform': '-moz-transform',
            'transform': 'transform'
        ***REMOVED***;

        // Add it to the body to get the computed style.
        document.body.insertBefore(el, null);

        for (var t in transforms)
        ***REMOVED***
            if (el.style[t] !== undefined)
            ***REMOVED***
                el.style[t] = "translate3d(1px,1px,1px)";
                has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            ***REMOVED***
        ***REMOVED***

        document.body.removeChild(el);
        device.css3D = (has3d !== undefined && has3d.length > 0 && has3d !== "none");

    ***REMOVED***

    //  Run the checks
    _checkOS();
    _checkBrowser();
    _checkAudio();
    _checkVideo();
    _checkCSS3D();
    _checkDevice();
    _checkFeatures();
    _checkFullScreenSupport();
    _checkInput();

***REMOVED***;

/**
* Check whether the host environment can play audio.
*
* @method canPlayAudio
* @memberof Phaser.Device.prototype
* @param ***REMOVED***string***REMOVED*** type - One of 'mp3, 'ogg', 'm4a', 'wav', 'webm' or 'opus'.
* @return ***REMOVED***boolean***REMOVED*** True if the given file type is supported by the browser, otherwise false.
*/
Phaser.Device.canPlayAudio = function (type) ***REMOVED***

    if (type === 'mp3' && this.mp3)
    ***REMOVED***
        return true;
    ***REMOVED***
    else if (type === 'ogg' && (this.ogg || this.opus))
    ***REMOVED***
        return true;
    ***REMOVED***
    else if (type === 'm4a' && this.m4a)
    ***REMOVED***
        return true;
    ***REMOVED***
    else if (type === 'opus' && this.opus)
    ***REMOVED***
        return true;
    ***REMOVED***
    else if (type === 'wav' && this.wav)
    ***REMOVED***
        return true;
    ***REMOVED***
    else if (type === 'webm' && this.webm)
    ***REMOVED***
        return true;
    ***REMOVED***
    else if (type === 'mp4' && this.dolby)
    ***REMOVED***
        return true;
    ***REMOVED***

    return false;

***REMOVED***;

/**
* Check whether the host environment can play video files.
*
* @method canPlayVideo
* @memberof Phaser.Device.prototype
* @param ***REMOVED***string***REMOVED*** type - One of 'mp4, 'ogg', 'webm' or 'mpeg'.
* @return ***REMOVED***boolean***REMOVED*** True if the given file type is supported by the browser, otherwise false.
*/
Phaser.Device.canPlayVideo = function (type) ***REMOVED***

    if (type === 'webm' && (this.webmVideo || this.vp9Video))
    ***REMOVED***
        return true;
    ***REMOVED***
    else if (type === 'mp4' && (this.mp4Video || this.h264Video))
    ***REMOVED***
        return true;
    ***REMOVED***
    else if ((type === 'ogg' || type === 'ogv') && this.oggVideo)
    ***REMOVED***
        return true;
    ***REMOVED***
    else if (type === 'mpeg' && this.hlsVideo)
    ***REMOVED***
        return true;
    ***REMOVED***

    return false;

***REMOVED***;

/**
* Check whether the console is open.
* Note that this only works in Firefox with Firebug and earlier versions of Chrome.
* It used to work in Chrome, but then they removed the ability: ***REMOVED***@link http://src.chromium.org/viewvc/blink?view=revision&revision=151136***REMOVED***
*
* @method isConsoleOpen
* @memberof Phaser.Device.prototype
*/
Phaser.Device.isConsoleOpen = function () ***REMOVED***

    if (window.console && window.console['firebug'])
    ***REMOVED***
        return true;
    ***REMOVED***

    if (window.console)
    ***REMOVED***
        console.profile();
        console.profileEnd();

        if (console.clear)
        ***REMOVED***
            console.clear();
        ***REMOVED***

        if (console['profiles'])
        ***REMOVED***
            return console['profiles'].length > 0;
        ***REMOVED***
    ***REMOVED***

    return false;

***REMOVED***;

/**
* Detect if the host is a an Android Stock browser.
* This is available before the device "ready" event.
*
* Authors might want to scale down on effects and switch to the CANVAS rendering method on those devices.
*
* @example
* var defaultRenderingMode = Phaser.Device.isAndroidStockBrowser() ? Phaser.CANVAS : Phaser.AUTO;
* 
* @method isAndroidStockBrowser
* @memberof Phaser.Device.prototype
*/
Phaser.Device.isAndroidStockBrowser = function () ***REMOVED***

    var matches = window.navigator.userAgent.match(/Android.*AppleWebKit\/([\d.]+)/);
    return matches && matches[1] < 537;

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* The Canvas class handles everything related to creating the `canvas` DOM tag that Phaser will use, 
* including styles, offset and aspect ratio.
*
* @class Phaser.Canvas
* @static
*/
Phaser.Canvas = ***REMOVED***

    /**
    * Creates a `canvas` DOM element. The element is not automatically added to the document.
    *
    * @method Phaser.Canvas.create
    * @param ***REMOVED***object***REMOVED*** parent - The object that will own the canvas that is created.
    * @param ***REMOVED***number***REMOVED*** [width=256] - The width of the canvas element.
    * @param ***REMOVED***number***REMOVED*** [height=256] - The height of the canvas element..
    * @param ***REMOVED***string***REMOVED*** [id=(none)] - If specified, and not the empty string, this will be set as the ID of the canvas element. Otherwise no ID will be set.
    * @param ***REMOVED***boolean***REMOVED*** [skipPool=false] - If `true` the canvas will not be placed in the CanvasPool global.
    * @return ***REMOVED***HTMLCanvasElement***REMOVED*** The newly created canvas element.
    */
    create: function (parent, width, height, id, skipPool) ***REMOVED***

        width = width || 256;
        height = height || 256;

        var canvas = (skipPool) ? document.createElement('canvas') : PIXI.CanvasPool.create(parent, width, height);

        if (typeof id === 'string' && id !== '')
        ***REMOVED***
            canvas.id = id;
        ***REMOVED***

        canvas.width = width;
        canvas.height = height;
        canvas.style.display = 'block';

        return canvas;

    ***REMOVED***,

    /**
    * Sets the background color behind the canvas. This changes the canvas style property.
    *
    * @method Phaser.Canvas.setBackgroundColor
    * @param ***REMOVED***HTMLCanvasElement***REMOVED*** canvas - The canvas to set the background color on.
    * @param ***REMOVED***string***REMOVED*** [color='rgb(0,0,0)'] - The color to set. Can be in the format 'rgb(r,g,b)', or '#RRGGBB' or any valid CSS color.
    * @return ***REMOVED***HTMLCanvasElement***REMOVED*** Returns the source canvas.
    */
    setBackgroundColor: function (canvas, color) ***REMOVED***

        color = color || 'rgb(0,0,0)';

        canvas.style.backgroundColor = color;

        return canvas;

    ***REMOVED***,

    /**
    * Sets the touch-action property on the canvas style. Can be used to disable default browser touch actions.
    *
    * @method Phaser.Canvas.setTouchAction
    * @param ***REMOVED***HTMLCanvasElement***REMOVED*** canvas - The canvas to set the touch action on.
    * @param ***REMOVED***string***REMOVED*** [value] - The touch action to set. Defaults to 'none'.
    * @return ***REMOVED***HTMLCanvasElement***REMOVED*** The source canvas.
    */
    setTouchAction: function (canvas, value) ***REMOVED***

        value = value || 'none';

        canvas.style.msTouchAction = value;
        canvas.style['ms-touch-action'] = value;
        canvas.style['touch-action'] = value;

        return canvas;

    ***REMOVED***,

    /**
    * Sets the user-select property on the canvas style. Can be used to disable default browser selection actions.
    *
    * @method Phaser.Canvas.setUserSelect
    * @param ***REMOVED***HTMLCanvasElement***REMOVED*** canvas - The canvas to set the touch action on.
    * @param ***REMOVED***string***REMOVED*** [value] - The touch action to set. Defaults to 'none'.
    * @return ***REMOVED***HTMLCanvasElement***REMOVED*** The source canvas.
    */
    setUserSelect: function (canvas, value) ***REMOVED***

        value = value || 'none';

        canvas.style['-webkit-touch-callout'] = value;
        canvas.style['-webkit-user-select'] = value;
        canvas.style['-khtml-user-select'] = value;
        canvas.style['-moz-user-select'] = value;
        canvas.style['-ms-user-select'] = value;
        canvas.style['user-select'] = value;
        canvas.style['-webkit-tap-highlight-color'] = 'rgba(0, 0, 0, 0)';

        return canvas;

    ***REMOVED***,

    /**
    * Adds the given canvas element to the DOM. The canvas will be added as a child of the given parent.
    * If no parent is given it will be added as a child of the document.body.
    *
    * @method Phaser.Canvas.addToDOM
    * @param ***REMOVED***HTMLCanvasElement***REMOVED*** canvas - The canvas to be added to the DOM.
    * @param ***REMOVED***string|HTMLElement***REMOVED*** parent - The DOM element to add the canvas to.
    * @param ***REMOVED***boolean***REMOVED*** [overflowHidden=true] - If set to true it will add the overflow='hidden' style to the parent DOM element.
    * @return ***REMOVED***HTMLCanvasElement***REMOVED*** Returns the source canvas.
    */
    addToDOM: function (canvas, parent, overflowHidden) ***REMOVED***

        var target;

        if (overflowHidden === undefined) ***REMOVED*** overflowHidden = true; ***REMOVED***

        if (parent)
        ***REMOVED***
            if (typeof parent === 'string')
            ***REMOVED***
                // hopefully an element ID
                target = document.getElementById(parent);
            ***REMOVED***
            else if (typeof parent === 'object' && parent.nodeType === 1)
            ***REMOVED***
                // quick test for a HTMLelement
                target = parent;
            ***REMOVED***
        ***REMOVED***

        // Fallback, covers an invalid ID and a non HTMLelement object
        if (!target)
        ***REMOVED***
            target = document.body;
        ***REMOVED***

        if (overflowHidden && target.style)
        ***REMOVED***
            target.style.overflow = 'hidden';
        ***REMOVED***

        target.appendChild(canvas);

        return canvas;

    ***REMOVED***,

    /**
    * Removes the given canvas element from the DOM.
    *
    * @method Phaser.Canvas.removeFromDOM
    * @param ***REMOVED***HTMLCanvasElement***REMOVED*** canvas - The canvas to be removed from the DOM.
    */
    removeFromDOM: function (canvas) ***REMOVED***

        if (canvas.parentNode)
        ***REMOVED***
            canvas.parentNode.removeChild(canvas);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets the transform of the given canvas to the matrix values provided.
    *
    * @method Phaser.Canvas.setTransform
    * @param ***REMOVED***CanvasRenderingContext2D***REMOVED*** context - The context to set the transform on.
    * @param ***REMOVED***number***REMOVED*** translateX - The value to translate horizontally by.
    * @param ***REMOVED***number***REMOVED*** translateY - The value to translate vertically by.
    * @param ***REMOVED***number***REMOVED*** scaleX - The value to scale horizontally by.
    * @param ***REMOVED***number***REMOVED*** scaleY - The value to scale vertically by.
    * @param ***REMOVED***number***REMOVED*** skewX - The value to skew horizontaly by.
    * @param ***REMOVED***number***REMOVED*** skewY - The value to skew vertically by.
    * @return ***REMOVED***CanvasRenderingContext2D***REMOVED*** Returns the source context.
    */
    setTransform: function (context, translateX, translateY, scaleX, scaleY, skewX, skewY) ***REMOVED***

        context.setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY);

        return context;

    ***REMOVED***,

    /**
    * Sets the Image Smoothing property on the given context. Set to false to disable image smoothing.
    * By default browsers have image smoothing enabled, which isn't always what you visually want, especially
    * when using pixel art in a game. Note that this sets the property on the context itself, so that any image
    * drawn to the context will be affected. This sets the property across all current browsers but support is
    * patchy on earlier browsers, especially on mobile.
    *
    * @method Phaser.Canvas.setSmoothingEnabled
    * @param ***REMOVED***CanvasRenderingContext2D***REMOVED*** context - The context to enable or disable the image smoothing on.
    * @param ***REMOVED***boolean***REMOVED*** value - If set to true it will enable image smoothing, false will disable it.
    * @return ***REMOVED***CanvasRenderingContext2D***REMOVED*** Returns the source context.
    */
    setSmoothingEnabled: function (context, value) ***REMOVED***

        var s = Phaser.Canvas.getSmoothingPrefix(context);

        if (s)
        ***REMOVED***
            context[s] = value;
        ***REMOVED***

        return context;

    ***REMOVED***,

    /**
    * Gets the Smoothing Enabled vendor prefix being used on the given context, or null if not set.
    *
    * @method Phaser.Canvas.getSmoothingPrefix
    * @param ***REMOVED***CanvasRenderingContext2D***REMOVED*** context - The context to enable or disable the image smoothing on.
    * @return ***REMOVED***string|null***REMOVED*** Returns the smoothingEnabled vendor prefix, or null if not set on the context.
    */
    getSmoothingPrefix: function (context) ***REMOVED***

        var vendor = [ 'i', 'webkitI', 'msI', 'mozI', 'oI' ];

        for (var prefix in vendor)
        ***REMOVED***
            var s = vendor[prefix] + 'mageSmoothingEnabled';

            if (s in context)
            ***REMOVED***
                return s;
            ***REMOVED***
        ***REMOVED***

        return null;

    ***REMOVED***,

    /**
     * Returns `true` if the given context has image smoothing enabled, otherwise returns `false`.
     *
     * @method Phaser.Canvas.getSmoothingEnabled
     * @param ***REMOVED***CanvasRenderingContext2D***REMOVED*** context - The context to check for smoothing on.
     * @return ***REMOVED***boolean***REMOVED*** True if the given context has image smoothing enabled, otherwise false.
     */
    getSmoothingEnabled: function (context) ***REMOVED***

        var s = Phaser.Canvas.getSmoothingPrefix(context);

        if (s)
        ***REMOVED***
            return context[s];
        ***REMOVED***

    ***REMOVED***,

    /**
    * Sets the CSS image-rendering property on the given canvas to be 'crisp' (aka 'optimize contrast' on webkit).
    * Note that if this doesn't given the desired result then see the setSmoothingEnabled.
    *
    * @method Phaser.Canvas.setImageRenderingCrisp
    * @param ***REMOVED***HTMLCanvasElement***REMOVED*** canvas - The canvas to set image-rendering crisp on.
    * @return ***REMOVED***HTMLCanvasElement***REMOVED*** Returns the source canvas.
    */
    setImageRenderingCrisp: function (canvas) ***REMOVED***

        var types = [ 'optimizeSpeed', 'crisp-edges', '-moz-crisp-edges', '-webkit-optimize-contrast', 'optimize-contrast', 'pixelated' ];

        for (var i = 0; i < types.length; i++)
        ***REMOVED***
            canvas.style['image-rendering'] = types[i];
        ***REMOVED***

        canvas.style.msInterpolationMode = 'nearest-neighbor';

        return canvas;

    ***REMOVED***,

    /**
    * Sets the CSS image-rendering property on the given canvas to be 'bicubic' (aka 'auto').
    * Note that if this doesn't given the desired result then see the CanvasUtils.setSmoothingEnabled method.
    *
    * @method Phaser.Canvas.setImageRenderingBicubic
    * @param ***REMOVED***HTMLCanvasElement***REMOVED*** canvas The canvas to set image-rendering bicubic on.
    * @return ***REMOVED***HTMLCanvasElement***REMOVED*** Returns the source canvas.
    */
    setImageRenderingBicubic: function (canvas) ***REMOVED***

        canvas.style['image-rendering'] = 'auto';
        canvas.style.msInterpolationMode = 'bicubic';

        return canvas;

    ***REMOVED***

***REMOVED***;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* Abstracts away the use of RAF or setTimeOut for the core game update loop.
*
* @class Phaser.RequestAnimationFrame
* @constructor
* @param ***REMOVED***Phaser.Game***REMOVED*** game - A reference to the currently running game.
* @param ***REMOVED***boolean***REMOVED*** [forceSetTimeOut=false] - Tell Phaser to use setTimeOut even if raf is available.
*/
Phaser.RequestAnimationFrame = function(game, forceSetTimeOut) ***REMOVED***

    if (forceSetTimeOut === undefined) ***REMOVED*** forceSetTimeOut = false; ***REMOVED***

    /**
    * @property ***REMOVED***Phaser.Game***REMOVED*** game - The currently running game.
    */
    this.game = game;

    /**
    * @property ***REMOVED***boolean***REMOVED*** isRunning - true if RequestAnimationFrame is running, otherwise false.
    * @default
    */
    this.isRunning = false;

    /**
    * @property ***REMOVED***boolean***REMOVED*** forceSetTimeOut - Tell Phaser to use setTimeOut even if raf is available.
    */
    this.forceSetTimeOut = forceSetTimeOut;

    var vendors = [
        'ms',
        'moz',
        'webkit',
        'o'
    ];

    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++)
    ***REMOVED***
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'];
    ***REMOVED***

    /**
    * @property ***REMOVED***boolean***REMOVED*** _isSetTimeOut  - true if the browser is using setTimeout instead of raf.
    * @private
    */
    this._isSetTimeOut = false;

    /**
    * @property ***REMOVED***function***REMOVED*** _onLoop - The function called by the update.
    * @private
    */
    this._onLoop = null;

    /**
    * @property ***REMOVED***number***REMOVED*** _timeOutID - The callback ID used when calling cancel.
    * @private
    */
    this._timeOutID = null;

***REMOVED***;

Phaser.RequestAnimationFrame.prototype = ***REMOVED***

    /**
    * Starts the requestAnimationFrame running or setTimeout if unavailable in browser
    * @method Phaser.RequestAnimationFrame#start
    */
    start: function () ***REMOVED***

        this.isRunning = true;

        var _this = this;

        if (!window.requestAnimationFrame || this.forceSetTimeOut)
        ***REMOVED***
            this._isSetTimeOut = true;

            this._onLoop = function () ***REMOVED***
                return _this.updateSetTimeout();
            ***REMOVED***;

            this._timeOutID = window.setTimeout(this._onLoop, 0);
        ***REMOVED***
        else
        ***REMOVED***
            this._isSetTimeOut = false;

            this._onLoop = function (time) ***REMOVED***
                return _this.updateRAF(time);
            ***REMOVED***;

            this._timeOutID = window.requestAnimationFrame(this._onLoop);
        ***REMOVED***

    ***REMOVED***,

    /**
    * The update method for the requestAnimationFrame
    * @method Phaser.RequestAnimationFrame#updateRAF
    */
    updateRAF: function (rafTime) ***REMOVED***

        if (this.isRunning)
        ***REMOVED***
            // floor the rafTime to make it equivalent to the Date.now() provided by updateSetTimeout (just below)
            this.game.update(Math.floor(rafTime));

            this._timeOutID = window.requestAnimationFrame(this._onLoop);
        ***REMOVED***

    ***REMOVED***,

    /**
    * The update method for the setTimeout.
    * @method Phaser.RequestAnimationFrame#updateSetTimeout
    */
    updateSetTimeout: function () ***REMOVED***

        if (this.isRunning)
        ***REMOVED***
            this.game.update(Date.now());

            this._timeOutID = window.setTimeout(this._onLoop, this.game.time.timeToCall);
        ***REMOVED***

    ***REMOVED***,

    /**
    * Stops the requestAnimationFrame from running.
    * @method Phaser.RequestAnimationFrame#stop
    */
    stop: function () ***REMOVED***

        if (this._isSetTimeOut)
        ***REMOVED***
            clearTimeout(this._timeOutID);
        ***REMOVED***
        else
        ***REMOVED***
            window.cancelAnimationFrame(this._timeOutID);
        ***REMOVED***

        this.isRunning = false;

    ***REMOVED***,

    /**
    * Is the browser using setTimeout?
    * @method Phaser.RequestAnimationFrame#isSetTimeOut
    * @return ***REMOVED***boolean***REMOVED***
    */
    isSetTimeOut: function () ***REMOVED***
        return this._isSetTimeOut;
    ***REMOVED***,

    /**
    * Is the browser using requestAnimationFrame?
    * @method Phaser.RequestAnimationFrame#isRAF
    * @return ***REMOVED***boolean***REMOVED***
    */
    isRAF: function () ***REMOVED***
        return (this._isSetTimeOut === false);
    ***REMOVED***

***REMOVED***;

Phaser.RequestAnimationFrame.prototype.constructor = Phaser.RequestAnimationFrame;
