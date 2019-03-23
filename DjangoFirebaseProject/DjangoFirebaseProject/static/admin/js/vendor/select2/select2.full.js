/*!
 * Select2 4.0.3
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
(function (factory) ***REMOVED***
  if (typeof define === 'function' && define.amd) ***REMOVED***
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  ***REMOVED*** else if (typeof exports === 'object') ***REMOVED***
    // Node/CommonJS
    factory(require('jquery'));
  ***REMOVED*** else ***REMOVED***
    // Browser globals
    factory(jQuery);
  ***REMOVED***
***REMOVED***(function (jQuery) ***REMOVED***
  // This is needed so we can catch the AMD loader configuration and use it
  // The inner file should be wrapped (by `banner.start.js`) in a function that
  // returns the AMD loader references.
  var S2 =
(function () ***REMOVED***
  // Restore the Select2 AMD loader so it can be used
  // Needed mostly in the language files, where the loader is not inserted
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) ***REMOVED***
    var S2 = jQuery.fn.select2.amd;
  ***REMOVED***
var S2;(function () ***REMOVED*** if (!S2 || !S2.requirejs) ***REMOVED***
if (!S2) ***REMOVED*** S2 = ***REMOVED******REMOVED***; ***REMOVED*** else ***REMOVED*** require = S2; ***REMOVED***
/**
 * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) ***REMOVED***
    var main, req, makeMap, handlers,
        defined = ***REMOVED******REMOVED***,
        waiting = ***REMOVED******REMOVED***,
        config = ***REMOVED******REMOVED***,
        defining = ***REMOVED******REMOVED***,
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) ***REMOVED***
        return hasOwn.call(obj, prop);
    ***REMOVED***

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param ***REMOVED***String***REMOVED*** name the relative name
     * @param ***REMOVED***String***REMOVED*** baseName a real name that the name arg is relative
     * to.
     * @returns ***REMOVED***String***REMOVED*** normalized name
     */
    function normalize(name, baseName) ***REMOVED***
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || ***REMOVED******REMOVED***;

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") ***REMOVED***
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) ***REMOVED***
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) ***REMOVED***
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                ***REMOVED***

                //Lop off the last part of baseParts, so that . matches the
                //"directory" and not name of the baseName's module. For instance,
                //baseName of "one/two/three", maps to "one/two/three.js", but we
                //want the directory, "one/two" for this normalization.
                name = baseParts.slice(0, baseParts.length - 1).concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) ***REMOVED***
                    part = name[i];
                    if (part === ".") ***REMOVED***
                        name.splice(i, 1);
                        i -= 1;
                    ***REMOVED*** else if (part === "..") ***REMOVED***
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) ***REMOVED***
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        ***REMOVED*** else if (i > 0) ***REMOVED***
                            name.splice(i - 1, 2);
                            i -= 2;
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
                //end trimDots

                name = name.join("/");
            ***REMOVED*** else if (name.indexOf('./') === 0) ***REMOVED***
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            ***REMOVED***
        ***REMOVED***

        //Apply map config if available.
        if ((baseParts || starMap) && map) ***REMOVED***
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) ***REMOVED***
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) ***REMOVED***
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) ***REMOVED***
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) ***REMOVED***
                            mapValue = mapValue[nameSegment];
                            if (mapValue) ***REMOVED***
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            ***REMOVED***
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***

                if (foundMap) ***REMOVED***
                    break;
                ***REMOVED***

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) ***REMOVED***
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                ***REMOVED***
            ***REMOVED***

            if (!foundMap && foundStarMap) ***REMOVED***
                foundMap = foundStarMap;
                foundI = starI;
            ***REMOVED***

            if (foundMap) ***REMOVED***
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            ***REMOVED***
        ***REMOVED***

        return name;
    ***REMOVED***

    function makeRequire(relName, forceSync) ***REMOVED***
        return function () ***REMOVED***
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            var args = aps.call(arguments, 0);

            //If first arg is not require('string'), and there is only
            //one arg, it is the array form without a callback. Insert
            //a null so that the following concat is correct.
            if (typeof args[0] !== 'string' && args.length === 1) ***REMOVED***
                args.push(null);
            ***REMOVED***
            return req.apply(undef, args.concat([relName, forceSync]));
        ***REMOVED***;
    ***REMOVED***

    function makeNormalize(relName) ***REMOVED***
        return function (name) ***REMOVED***
            return normalize(name, relName);
        ***REMOVED***;
    ***REMOVED***

    function makeLoad(depName) ***REMOVED***
        return function (value) ***REMOVED***
            defined[depName] = value;
        ***REMOVED***;
    ***REMOVED***

    function callDep(name) ***REMOVED***
        if (hasProp(waiting, name)) ***REMOVED***
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        ***REMOVED***

        if (!hasProp(defined, name) && !hasProp(defining, name)) ***REMOVED***
            throw new Error('No ' + name);
        ***REMOVED***
        return defined[name];
    ***REMOVED***

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) ***REMOVED***
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) ***REMOVED***
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        ***REMOVED***
        return [prefix, name];
    ***REMOVED***

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) ***REMOVED***
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) ***REMOVED***
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        ***REMOVED***

        //Normalize according
        if (prefix) ***REMOVED***
            if (plugin && plugin.normalize) ***REMOVED***
                name = plugin.normalize(name, makeNormalize(relName));
            ***REMOVED*** else ***REMOVED***
                name = normalize(name, relName);
            ***REMOVED***
        ***REMOVED*** else ***REMOVED***
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) ***REMOVED***
                plugin = callDep(prefix);
            ***REMOVED***
        ***REMOVED***

        //Using ridiculous property names for space reasons
        return ***REMOVED***
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        ***REMOVED***;
    ***REMOVED***;

    function makeConfig(name) ***REMOVED***
        return function () ***REMOVED***
            return (config && config.config && config.config[name]) || ***REMOVED******REMOVED***;
        ***REMOVED***;
    ***REMOVED***

    handlers = ***REMOVED***
        require: function (name) ***REMOVED***
            return makeRequire(name);
        ***REMOVED***,
        exports: function (name) ***REMOVED***
            var e = defined[name];
            if (typeof e !== 'undefined') ***REMOVED***
                return e;
            ***REMOVED*** else ***REMOVED***
                return (defined[name] = ***REMOVED******REMOVED***);
            ***REMOVED***
        ***REMOVED***,
        module: function (name) ***REMOVED***
            return ***REMOVED***
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            ***REMOVED***;
        ***REMOVED***
    ***REMOVED***;

    main = function (name, deps, callback, relName) ***REMOVED***
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') ***REMOVED***
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) ***REMOVED***
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") ***REMOVED***
                    args[i] = handlers.require(name);
                ***REMOVED*** else if (depName === "exports") ***REMOVED***
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                ***REMOVED*** else if (depName === "module") ***REMOVED***
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                ***REMOVED*** else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) ***REMOVED***
                    args[i] = callDep(depName);
                ***REMOVED*** else if (map.p) ***REMOVED***
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), ***REMOVED******REMOVED***);
                    args[i] = defined[depName];
                ***REMOVED*** else ***REMOVED***
                    throw new Error(name + ' missing ' + depName);
                ***REMOVED***
            ***REMOVED***

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) ***REMOVED***
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) ***REMOVED***
                    defined[name] = cjsModule.exports;
                ***REMOVED*** else if (ret !== undef || !usingExports) ***REMOVED***
                    //Use the return value from the function.
                    defined[name] = ret;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED*** else if (name) ***REMOVED***
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        ***REMOVED***
    ***REMOVED***;

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) ***REMOVED***
        if (typeof deps === "string") ***REMOVED***
            if (handlers[deps]) ***REMOVED***
                //callback in this case is really relName
                return handlers[deps](callback);
            ***REMOVED***
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        ***REMOVED*** else if (!deps.splice) ***REMOVED***
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) ***REMOVED***
                req(config.deps, config.callback);
            ***REMOVED***
            if (!callback) ***REMOVED***
                return;
            ***REMOVED***

            if (callback.splice) ***REMOVED***
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            ***REMOVED*** else ***REMOVED***
                deps = undef;
            ***REMOVED***
        ***REMOVED***

        //Support require(['a'])
        callback = callback || function () ***REMOVED******REMOVED***;

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') ***REMOVED***
            relName = forceSync;
            forceSync = alt;
        ***REMOVED***

        //Simulate async callback;
        if (forceSync) ***REMOVED***
            main(undef, deps, callback, relName);
        ***REMOVED*** else ***REMOVED***
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () ***REMOVED***
                main(undef, deps, callback, relName);
            ***REMOVED***, 4);
        ***REMOVED***

        return req;
    ***REMOVED***;

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) ***REMOVED***
        return req(cfg);
    ***REMOVED***;

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) ***REMOVED***
        if (typeof name !== 'string') ***REMOVED***
            throw new Error('See almond README: incorrect module build, no module name');
        ***REMOVED***

        //This module may not have dependencies
        if (!deps.splice) ***REMOVED***
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        ***REMOVED***

        if (!hasProp(defined, name) && !hasProp(waiting, name)) ***REMOVED***
            waiting[name] = [name, deps, callback];
        ***REMOVED***
    ***REMOVED***;

    define.amd = ***REMOVED***
        jQuery: true
    ***REMOVED***;
***REMOVED***());

S2.requirejs = requirejs;S2.require = require;S2.define = define;
***REMOVED***
***REMOVED***());
S2.define("almond", function()***REMOVED******REMOVED***);

/* global jQuery:false, $:false */
S2.define('jquery',[],function () ***REMOVED***
  var _$ = jQuery || $;

  if (_$ == null && console && console.error) ***REMOVED***
    console.error(
      'Select2: An instance of jQuery or a jQuery-compatible library was not ' +
      'found. Make sure that you are including jQuery before Select2 on your ' +
      'web page.'
    );
  ***REMOVED***

  return _$;
***REMOVED***);

S2.define('select2/utils',[
  'jquery'
], function ($) ***REMOVED***
  var Utils = ***REMOVED******REMOVED***;

  Utils.Extend = function (ChildClass, SuperClass) ***REMOVED***
    var __hasProp = ***REMOVED******REMOVED***.hasOwnProperty;

    function BaseConstructor () ***REMOVED***
      this.constructor = ChildClass;
    ***REMOVED***

    for (var key in SuperClass) ***REMOVED***
      if (__hasProp.call(SuperClass, key)) ***REMOVED***
        ChildClass[key] = SuperClass[key];
      ***REMOVED***
    ***REMOVED***

    BaseConstructor.prototype = SuperClass.prototype;
    ChildClass.prototype = new BaseConstructor();
    ChildClass.__super__ = SuperClass.prototype;

    return ChildClass;
  ***REMOVED***;

  function getMethods (theClass) ***REMOVED***
    var proto = theClass.prototype;

    var methods = [];

    for (var methodName in proto) ***REMOVED***
      var m = proto[methodName];

      if (typeof m !== 'function') ***REMOVED***
        continue;
      ***REMOVED***

      if (methodName === 'constructor') ***REMOVED***
        continue;
      ***REMOVED***

      methods.push(methodName);
    ***REMOVED***

    return methods;
  ***REMOVED***

  Utils.Decorate = function (SuperClass, DecoratorClass) ***REMOVED***
    var decoratedMethods = getMethods(DecoratorClass);
    var superMethods = getMethods(SuperClass);

    function DecoratedClass () ***REMOVED***
      var unshift = Array.prototype.unshift;

      var argCount = DecoratorClass.prototype.constructor.length;

      var calledConstructor = SuperClass.prototype.constructor;

      if (argCount > 0) ***REMOVED***
        unshift.call(arguments, SuperClass.prototype.constructor);

        calledConstructor = DecoratorClass.prototype.constructor;
      ***REMOVED***

      calledConstructor.apply(this, arguments);
    ***REMOVED***

    DecoratorClass.displayName = SuperClass.displayName;

    function ctr () ***REMOVED***
      this.constructor = DecoratedClass;
    ***REMOVED***

    DecoratedClass.prototype = new ctr();

    for (var m = 0; m < superMethods.length; m++) ***REMOVED***
        var superMethod = superMethods[m];

        DecoratedClass.prototype[superMethod] =
          SuperClass.prototype[superMethod];
    ***REMOVED***

    var calledMethod = function (methodName) ***REMOVED***
      // Stub out the original method if it's not decorating an actual method
      var originalMethod = function () ***REMOVED******REMOVED***;

      if (methodName in DecoratedClass.prototype) ***REMOVED***
        originalMethod = DecoratedClass.prototype[methodName];
      ***REMOVED***

      var decoratedMethod = DecoratorClass.prototype[methodName];

      return function () ***REMOVED***
        var unshift = Array.prototype.unshift;

        unshift.call(arguments, originalMethod);

        return decoratedMethod.apply(this, arguments);
      ***REMOVED***;
    ***REMOVED***;

    for (var d = 0; d < decoratedMethods.length; d++) ***REMOVED***
      var decoratedMethod = decoratedMethods[d];

      DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
    ***REMOVED***

    return DecoratedClass;
  ***REMOVED***;

  var Observable = function () ***REMOVED***
    this.listeners = ***REMOVED******REMOVED***;
  ***REMOVED***;

  Observable.prototype.on = function (event, callback) ***REMOVED***
    this.listeners = this.listeners || ***REMOVED******REMOVED***;

    if (event in this.listeners) ***REMOVED***
      this.listeners[event].push(callback);
    ***REMOVED*** else ***REMOVED***
      this.listeners[event] = [callback];
    ***REMOVED***
  ***REMOVED***;

  Observable.prototype.trigger = function (event) ***REMOVED***
    var slice = Array.prototype.slice;
    var params = slice.call(arguments, 1);

    this.listeners = this.listeners || ***REMOVED******REMOVED***;

    // Params should always come in as an array
    if (params == null) ***REMOVED***
      params = [];
    ***REMOVED***

    // If there are no arguments to the event, use a temporary object
    if (params.length === 0) ***REMOVED***
      params.push(***REMOVED******REMOVED***);
    ***REMOVED***

    // Set the `_type` of the first object to the event
    params[0]._type = event;

    if (event in this.listeners) ***REMOVED***
      this.invoke(this.listeners[event], slice.call(arguments, 1));
    ***REMOVED***

    if ('*' in this.listeners) ***REMOVED***
      this.invoke(this.listeners['*'], arguments);
    ***REMOVED***
  ***REMOVED***;

  Observable.prototype.invoke = function (listeners, params) ***REMOVED***
    for (var i = 0, len = listeners.length; i < len; i++) ***REMOVED***
      listeners[i].apply(this, params);
    ***REMOVED***
  ***REMOVED***;

  Utils.Observable = Observable;

  Utils.generateChars = function (length) ***REMOVED***
    var chars = '';

    for (var i = 0; i < length; i++) ***REMOVED***
      var randomChar = Math.floor(Math.random() * 36);
      chars += randomChar.toString(36);
    ***REMOVED***

    return chars;
  ***REMOVED***;

  Utils.bind = function (func, context) ***REMOVED***
    return function () ***REMOVED***
      func.apply(context, arguments);
    ***REMOVED***;
  ***REMOVED***;

  Utils._convertData = function (data) ***REMOVED***
    for (var originalKey in data) ***REMOVED***
      var keys = originalKey.split('-');

      var dataLevel = data;

      if (keys.length === 1) ***REMOVED***
        continue;
      ***REMOVED***

      for (var k = 0; k < keys.length; k++) ***REMOVED***
        var key = keys[k];

        // Lowercase the first letter
        // By default, dash-separated becomes camelCase
        key = key.substring(0, 1).toLowerCase() + key.substring(1);

        if (!(key in dataLevel)) ***REMOVED***
          dataLevel[key] = ***REMOVED******REMOVED***;
        ***REMOVED***

        if (k == keys.length - 1) ***REMOVED***
          dataLevel[key] = data[originalKey];
        ***REMOVED***

        dataLevel = dataLevel[key];
      ***REMOVED***

      delete data[originalKey];
    ***REMOVED***

    return data;
  ***REMOVED***;

  Utils.hasScroll = function (index, el) ***REMOVED***
    // Adapted from the function created by @ShadowScripter
    // and adapted by @BillBarry on the Stack Exchange Code Review website.
    // The original code can be found at
    // http://codereview.stackexchange.com/q/13338
    // and was designed to be used with the Sizzle selector engine.

    var $el = $(el);
    var overflowX = el.style.overflowX;
    var overflowY = el.style.overflowY;

    //Check both x and y declarations
    if (overflowX === overflowY &&
        (overflowY === 'hidden' || overflowY === 'visible')) ***REMOVED***
      return false;
    ***REMOVED***

    if (overflowX === 'scroll' || overflowY === 'scroll') ***REMOVED***
      return true;
    ***REMOVED***

    return ($el.innerHeight() < el.scrollHeight ||
      $el.innerWidth() < el.scrollWidth);
  ***REMOVED***;

  Utils.escapeMarkup = function (markup) ***REMOVED***
    var replaceMap = ***REMOVED***
      '\\': '&#92;',
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;',
      '/': '&#47;'
    ***REMOVED***;

    // Do not try to escape the markup if it's not a string
    if (typeof markup !== 'string') ***REMOVED***
      return markup;
    ***REMOVED***

    return String(markup).replace(/[&<>"'\/\\]/g, function (match) ***REMOVED***
      return replaceMap[match];
    ***REMOVED***);
  ***REMOVED***;

  // Append an array of jQuery nodes to a given element.
  Utils.appendMany = function ($element, $nodes) ***REMOVED***
    // jQuery 1.7.x does not support $.fn.append() with an array
    // Fall back to a jQuery object collection using $.fn.add()
    if ($.fn.jquery.substr(0, 3) === '1.7') ***REMOVED***
      var $jqNodes = $();

      $.map($nodes, function (node) ***REMOVED***
        $jqNodes = $jqNodes.add(node);
      ***REMOVED***);

      $nodes = $jqNodes;
    ***REMOVED***

    $element.append($nodes);
  ***REMOVED***;

  return Utils;
***REMOVED***);

S2.define('select2/results',[
  'jquery',
  './utils'
], function ($, Utils) ***REMOVED***
  function Results ($element, options, dataAdapter) ***REMOVED***
    this.$element = $element;
    this.data = dataAdapter;
    this.options = options;

    Results.__super__.constructor.call(this);
  ***REMOVED***

  Utils.Extend(Results, Utils.Observable);

  Results.prototype.render = function () ***REMOVED***
    var $results = $(
      '<ul class="select2-results__options" role="tree"></ul>'
    );

    if (this.options.get('multiple')) ***REMOVED***
      $results.attr('aria-multiselectable', 'true');
    ***REMOVED***

    this.$results = $results;

    return $results;
  ***REMOVED***;

  Results.prototype.clear = function () ***REMOVED***
    this.$results.empty();
  ***REMOVED***;

  Results.prototype.displayMessage = function (params) ***REMOVED***
    var escapeMarkup = this.options.get('escapeMarkup');

    this.clear();
    this.hideLoading();

    var $message = $(
      '<li role="treeitem" aria-live="assertive"' +
      ' class="select2-results__option"></li>'
    );

    var message = this.options.get('translations').get(params.message);

    $message.append(
      escapeMarkup(
        message(params.args)
      )
    );

    $message[0].className += ' select2-results__message';

    this.$results.append($message);
  ***REMOVED***;

  Results.prototype.hideMessages = function () ***REMOVED***
    this.$results.find('.select2-results__message').remove();
  ***REMOVED***;

  Results.prototype.append = function (data) ***REMOVED***
    this.hideLoading();

    var $options = [];

    if (data.results == null || data.results.length === 0) ***REMOVED***
      if (this.$results.children().length === 0) ***REMOVED***
        this.trigger('results:message', ***REMOVED***
          message: 'noResults'
        ***REMOVED***);
      ***REMOVED***

      return;
    ***REMOVED***

    data.results = this.sort(data.results);

    for (var d = 0; d < data.results.length; d++) ***REMOVED***
      var item = data.results[d];

      var $option = this.option(item);

      $options.push($option);
    ***REMOVED***

    this.$results.append($options);
  ***REMOVED***;

  Results.prototype.position = function ($results, $dropdown) ***REMOVED***
    var $resultsContainer = $dropdown.find('.select2-results');
    $resultsContainer.append($results);
  ***REMOVED***;

  Results.prototype.sort = function (data) ***REMOVED***
    var sorter = this.options.get('sorter');

    return sorter(data);
  ***REMOVED***;

  Results.prototype.highlightFirstItem = function () ***REMOVED***
    var $options = this.$results
      .find('.select2-results__option[aria-selected]');

    var $selected = $options.filter('[aria-selected=true]');

    // Check if there are any selected options
    if ($selected.length > 0) ***REMOVED***
      // If there are selected options, highlight the first
      $selected.first().trigger('mouseenter');
    ***REMOVED*** else ***REMOVED***
      // If there are no selected options, highlight the first option
      // in the dropdown
      $options.first().trigger('mouseenter');
    ***REMOVED***

    this.ensureHighlightVisible();
  ***REMOVED***;

  Results.prototype.setClasses = function () ***REMOVED***
    var self = this;

    this.data.current(function (selected) ***REMOVED***
      var selectedIds = $.map(selected, function (s) ***REMOVED***
        return s.id.toString();
      ***REMOVED***);

      var $options = self.$results
        .find('.select2-results__option[aria-selected]');

      $options.each(function () ***REMOVED***
        var $option = $(this);

        var item = $.data(this, 'data');

        // id needs to be converted to a string when comparing
        var id = '' + item.id;

        if ((item.element != null && item.element.selected) ||
            (item.element == null && $.inArray(id, selectedIds) > -1)) ***REMOVED***
          $option.attr('aria-selected', 'true');
        ***REMOVED*** else ***REMOVED***
          $option.attr('aria-selected', 'false');
        ***REMOVED***
      ***REMOVED***);

    ***REMOVED***);
  ***REMOVED***;

  Results.prototype.showLoading = function (params) ***REMOVED***
    this.hideLoading();

    var loadingMore = this.options.get('translations').get('searching');

    var loading = ***REMOVED***
      disabled: true,
      loading: true,
      text: loadingMore(params)
    ***REMOVED***;
    var $loading = this.option(loading);
    $loading.className += ' loading-results';

    this.$results.prepend($loading);
  ***REMOVED***;

  Results.prototype.hideLoading = function () ***REMOVED***
    this.$results.find('.loading-results').remove();
  ***REMOVED***;

  Results.prototype.option = function (data) ***REMOVED***
    var option = document.createElement('li');
    option.className = 'select2-results__option';

    var attrs = ***REMOVED***
      'role': 'treeitem',
      'aria-selected': 'false'
    ***REMOVED***;

    if (data.disabled) ***REMOVED***
      delete attrs['aria-selected'];
      attrs['aria-disabled'] = 'true';
    ***REMOVED***

    if (data.id == null) ***REMOVED***
      delete attrs['aria-selected'];
    ***REMOVED***

    if (data._resultId != null) ***REMOVED***
      option.id = data._resultId;
    ***REMOVED***

    if (data.title) ***REMOVED***
      option.title = data.title;
    ***REMOVED***

    if (data.children) ***REMOVED***
      attrs.role = 'group';
      attrs['aria-label'] = data.text;
      delete attrs['aria-selected'];
    ***REMOVED***

    for (var attr in attrs) ***REMOVED***
      var val = attrs[attr];

      option.setAttribute(attr, val);
    ***REMOVED***

    if (data.children) ***REMOVED***
      var $option = $(option);

      var label = document.createElement('strong');
      label.className = 'select2-results__group';

      var $label = $(label);
      this.template(data, label);

      var $children = [];

      for (var c = 0; c < data.children.length; c++) ***REMOVED***
        var child = data.children[c];

        var $child = this.option(child);

        $children.push($child);
      ***REMOVED***

      var $childrenContainer = $('<ul></ul>', ***REMOVED***
        'class': 'select2-results__options select2-results__options--nested'
      ***REMOVED***);

      $childrenContainer.append($children);

      $option.append(label);
      $option.append($childrenContainer);
    ***REMOVED*** else ***REMOVED***
      this.template(data, option);
    ***REMOVED***

    $.data(option, 'data', data);

    return option;
  ***REMOVED***;

  Results.prototype.bind = function (container, $container) ***REMOVED***
    var self = this;

    var id = container.id + '-results';

    this.$results.attr('id', id);

    container.on('results:all', function (params) ***REMOVED***
      self.clear();
      self.append(params.data);

      if (container.isOpen()) ***REMOVED***
        self.setClasses();
        self.highlightFirstItem();
      ***REMOVED***
    ***REMOVED***);

    container.on('results:append', function (params) ***REMOVED***
      self.append(params.data);

      if (container.isOpen()) ***REMOVED***
        self.setClasses();
      ***REMOVED***
    ***REMOVED***);

    container.on('query', function (params) ***REMOVED***
      self.hideMessages();
      self.showLoading(params);
    ***REMOVED***);

    container.on('select', function () ***REMOVED***
      if (!container.isOpen()) ***REMOVED***
        return;
      ***REMOVED***

      self.setClasses();
      self.highlightFirstItem();
    ***REMOVED***);

    container.on('unselect', function () ***REMOVED***
      if (!container.isOpen()) ***REMOVED***
        return;
      ***REMOVED***

      self.setClasses();
      self.highlightFirstItem();
    ***REMOVED***);

    container.on('open', function () ***REMOVED***
      // When the dropdown is open, aria-expended="true"
      self.$results.attr('aria-expanded', 'true');
      self.$results.attr('aria-hidden', 'false');

      self.setClasses();
      self.ensureHighlightVisible();
    ***REMOVED***);

    container.on('close', function () ***REMOVED***
      // When the dropdown is closed, aria-expended="false"
      self.$results.attr('aria-expanded', 'false');
      self.$results.attr('aria-hidden', 'true');
      self.$results.removeAttr('aria-activedescendant');
    ***REMOVED***);

    container.on('results:toggle', function () ***REMOVED***
      var $highlighted = self.getHighlightedResults();

      if ($highlighted.length === 0) ***REMOVED***
        return;
      ***REMOVED***

      $highlighted.trigger('mouseup');
    ***REMOVED***);

    container.on('results:select', function () ***REMOVED***
      var $highlighted = self.getHighlightedResults();

      if ($highlighted.length === 0) ***REMOVED***
        return;
      ***REMOVED***

      var data = $highlighted.data('data');

      if ($highlighted.attr('aria-selected') == 'true') ***REMOVED***
        self.trigger('close', ***REMOVED******REMOVED***);
      ***REMOVED*** else ***REMOVED***
        self.trigger('select', ***REMOVED***
          data: data
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***);

    container.on('results:previous', function () ***REMOVED***
      var $highlighted = self.getHighlightedResults();

      var $options = self.$results.find('[aria-selected]');

      var currentIndex = $options.index($highlighted);

      // If we are already at te top, don't move further
      if (currentIndex === 0) ***REMOVED***
        return;
      ***REMOVED***

      var nextIndex = currentIndex - 1;

      // If none are highlighted, highlight the first
      if ($highlighted.length === 0) ***REMOVED***
        nextIndex = 0;
      ***REMOVED***

      var $next = $options.eq(nextIndex);

      $next.trigger('mouseenter');

      var currentOffset = self.$results.offset().top;
      var nextTop = $next.offset().top;
      var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);

      if (nextIndex === 0) ***REMOVED***
        self.$results.scrollTop(0);
      ***REMOVED*** else if (nextTop - currentOffset < 0) ***REMOVED***
        self.$results.scrollTop(nextOffset);
      ***REMOVED***
    ***REMOVED***);

    container.on('results:next', function () ***REMOVED***
      var $highlighted = self.getHighlightedResults();

      var $options = self.$results.find('[aria-selected]');

      var currentIndex = $options.index($highlighted);

      var nextIndex = currentIndex + 1;

      // If we are at the last option, stay there
      if (nextIndex >= $options.length) ***REMOVED***
        return;
      ***REMOVED***

      var $next = $options.eq(nextIndex);

      $next.trigger('mouseenter');

      var currentOffset = self.$results.offset().top +
        self.$results.outerHeight(false);
      var nextBottom = $next.offset().top + $next.outerHeight(false);
      var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;

      if (nextIndex === 0) ***REMOVED***
        self.$results.scrollTop(0);
      ***REMOVED*** else if (nextBottom > currentOffset) ***REMOVED***
        self.$results.scrollTop(nextOffset);
      ***REMOVED***
    ***REMOVED***);

    container.on('results:focus', function (params) ***REMOVED***
      params.element.addClass('select2-results__option--highlighted');
    ***REMOVED***);

    container.on('results:message', function (params) ***REMOVED***
      self.displayMessage(params);
    ***REMOVED***);

    if ($.fn.mousewheel) ***REMOVED***
      this.$results.on('mousewheel', function (e) ***REMOVED***
        var top = self.$results.scrollTop();

        var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;

        var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
        var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();

        if (isAtTop) ***REMOVED***
          self.$results.scrollTop(0);

          e.preventDefault();
          e.stopPropagation();
        ***REMOVED*** else if (isAtBottom) ***REMOVED***
          self.$results.scrollTop(
            self.$results.get(0).scrollHeight - self.$results.height()
          );

          e.preventDefault();
          e.stopPropagation();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***

    this.$results.on('mouseup', '.select2-results__option[aria-selected]',
      function (evt) ***REMOVED***
      var $this = $(this);

      var data = $this.data('data');

      if ($this.attr('aria-selected') === 'true') ***REMOVED***
        if (self.options.get('multiple')) ***REMOVED***
          self.trigger('unselect', ***REMOVED***
            originalEvent: evt,
            data: data
          ***REMOVED***);
        ***REMOVED*** else ***REMOVED***
          self.trigger('close', ***REMOVED******REMOVED***);
        ***REMOVED***

        return;
      ***REMOVED***

      self.trigger('select', ***REMOVED***
        originalEvent: evt,
        data: data
      ***REMOVED***);
    ***REMOVED***);

    this.$results.on('mouseenter', '.select2-results__option[aria-selected]',
      function (evt) ***REMOVED***
      var data = $(this).data('data');

      self.getHighlightedResults()
          .removeClass('select2-results__option--highlighted');

      self.trigger('results:focus', ***REMOVED***
        data: data,
        element: $(this)
      ***REMOVED***);
    ***REMOVED***);
  ***REMOVED***;

  Results.prototype.getHighlightedResults = function () ***REMOVED***
    var $highlighted = this.$results
    .find('.select2-results__option--highlighted');

    return $highlighted;
  ***REMOVED***;

  Results.prototype.destroy = function () ***REMOVED***
    this.$results.remove();
  ***REMOVED***;

  Results.prototype.ensureHighlightVisible = function () ***REMOVED***
    var $highlighted = this.getHighlightedResults();

    if ($highlighted.length === 0) ***REMOVED***
      return;
    ***REMOVED***

    var $options = this.$results.find('[aria-selected]');

    var currentIndex = $options.index($highlighted);

    var currentOffset = this.$results.offset().top;
    var nextTop = $highlighted.offset().top;
    var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);

    var offsetDelta = nextTop - currentOffset;
    nextOffset -= $highlighted.outerHeight(false) * 2;

    if (currentIndex <= 2) ***REMOVED***
      this.$results.scrollTop(0);
    ***REMOVED*** else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) ***REMOVED***
      this.$results.scrollTop(nextOffset);
    ***REMOVED***
  ***REMOVED***;

  Results.prototype.template = function (result, container) ***REMOVED***
    var template = this.options.get('templateResult');
    var escapeMarkup = this.options.get('escapeMarkup');

    var content = template(result, container);

    if (content == null) ***REMOVED***
      container.style.display = 'none';
    ***REMOVED*** else if (typeof content === 'string') ***REMOVED***
      container.innerHTML = escapeMarkup(content);
    ***REMOVED*** else ***REMOVED***
      $(container).append(content);
    ***REMOVED***
  ***REMOVED***;

  return Results;
***REMOVED***);

S2.define('select2/keys',[

], function () ***REMOVED***
  var KEYS = ***REMOVED***
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DELETE: 46
  ***REMOVED***;

  return KEYS;
***REMOVED***);

S2.define('select2/selection/base',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) ***REMOVED***
  function BaseSelection ($element, options) ***REMOVED***
    this.$element = $element;
    this.options = options;

    BaseSelection.__super__.constructor.call(this);
  ***REMOVED***

  Utils.Extend(BaseSelection, Utils.Observable);

  BaseSelection.prototype.render = function () ***REMOVED***
    var $selection = $(
      '<span class="select2-selection" role="combobox" ' +
      ' aria-haspopup="true" aria-expanded="false">' +
      '</span>'
    );

    this._tabindex = 0;

    if (this.$element.data('old-tabindex') != null) ***REMOVED***
      this._tabindex = this.$element.data('old-tabindex');
    ***REMOVED*** else if (this.$element.attr('tabindex') != null) ***REMOVED***
      this._tabindex = this.$element.attr('tabindex');
    ***REMOVED***

    $selection.attr('title', this.$element.attr('title'));
    $selection.attr('tabindex', this._tabindex);

    this.$selection = $selection;

    return $selection;
  ***REMOVED***;

  BaseSelection.prototype.bind = function (container, $container) ***REMOVED***
    var self = this;

    var id = container.id + '-container';
    var resultsId = container.id + '-results';

    this.container = container;

    this.$selection.on('focus', function (evt) ***REMOVED***
      self.trigger('focus', evt);
    ***REMOVED***);

    this.$selection.on('blur', function (evt) ***REMOVED***
      self._handleBlur(evt);
    ***REMOVED***);

    this.$selection.on('keydown', function (evt) ***REMOVED***
      self.trigger('keypress', evt);

      if (evt.which === KEYS.SPACE) ***REMOVED***
        evt.preventDefault();
      ***REMOVED***
    ***REMOVED***);

    container.on('results:focus', function (params) ***REMOVED***
      self.$selection.attr('aria-activedescendant', params.data._resultId);
    ***REMOVED***);

    container.on('selection:update', function (params) ***REMOVED***
      self.update(params.data);
    ***REMOVED***);

    container.on('open', function () ***REMOVED***
      // When the dropdown is open, aria-expanded="true"
      self.$selection.attr('aria-expanded', 'true');
      self.$selection.attr('aria-owns', resultsId);

      self._attachCloseHandler(container);
    ***REMOVED***);

    container.on('close', function () ***REMOVED***
      // When the dropdown is closed, aria-expanded="false"
      self.$selection.attr('aria-expanded', 'false');
      self.$selection.removeAttr('aria-activedescendant');
      self.$selection.removeAttr('aria-owns');

      self.$selection.focus();

      self._detachCloseHandler(container);
    ***REMOVED***);

    container.on('enable', function () ***REMOVED***
      self.$selection.attr('tabindex', self._tabindex);
    ***REMOVED***);

    container.on('disable', function () ***REMOVED***
      self.$selection.attr('tabindex', '-1');
    ***REMOVED***);
  ***REMOVED***;

  BaseSelection.prototype._handleBlur = function (evt) ***REMOVED***
    var self = this;

    // This needs to be delayed as the active element is the body when the tab
    // key is pressed, possibly along with others.
    window.setTimeout(function () ***REMOVED***
      // Don't trigger `blur` if the focus is still in the selection
      if (
        (document.activeElement == self.$selection[0]) ||
        ($.contains(self.$selection[0], document.activeElement))
      ) ***REMOVED***
        return;
      ***REMOVED***

      self.trigger('blur', evt);
    ***REMOVED***, 1);
  ***REMOVED***;

  BaseSelection.prototype._attachCloseHandler = function (container) ***REMOVED***
    var self = this;

    $(document.body).on('mousedown.select2.' + container.id, function (e) ***REMOVED***
      var $target = $(e.target);

      var $select = $target.closest('.select2');

      var $all = $('.select2.select2-container--open');

      $all.each(function () ***REMOVED***
        var $this = $(this);

        if (this == $select[0]) ***REMOVED***
          return;
        ***REMOVED***

        var $element = $this.data('element');

        $element.select2('close');
      ***REMOVED***);
    ***REMOVED***);
  ***REMOVED***;

  BaseSelection.prototype._detachCloseHandler = function (container) ***REMOVED***
    $(document.body).off('mousedown.select2.' + container.id);
  ***REMOVED***;

  BaseSelection.prototype.position = function ($selection, $container) ***REMOVED***
    var $selectionContainer = $container.find('.selection');
    $selectionContainer.append($selection);
  ***REMOVED***;

  BaseSelection.prototype.destroy = function () ***REMOVED***
    this._detachCloseHandler(this.container);
  ***REMOVED***;

  BaseSelection.prototype.update = function (data) ***REMOVED***
    throw new Error('The `update` method must be defined in child classes.');
  ***REMOVED***;

  return BaseSelection;
***REMOVED***);

S2.define('select2/selection/single',[
  'jquery',
  './base',
  '../utils',
  '../keys'
], function ($, BaseSelection, Utils, KEYS) ***REMOVED***
  function SingleSelection () ***REMOVED***
    SingleSelection.__super__.constructor.apply(this, arguments);
  ***REMOVED***

  Utils.Extend(SingleSelection, BaseSelection);

  SingleSelection.prototype.render = function () ***REMOVED***
    var $selection = SingleSelection.__super__.render.call(this);

    $selection.addClass('select2-selection--single');

    $selection.html(
      '<span class="select2-selection__rendered"></span>' +
      '<span class="select2-selection__arrow" role="presentation">' +
        '<b role="presentation"></b>' +
      '</span>'
    );

    return $selection;
  ***REMOVED***;

  SingleSelection.prototype.bind = function (container, $container) ***REMOVED***
    var self = this;

    SingleSelection.__super__.bind.apply(this, arguments);

    var id = container.id + '-container';

    this.$selection.find('.select2-selection__rendered').attr('id', id);
    this.$selection.attr('aria-labelledby', id);

    this.$selection.on('mousedown', function (evt) ***REMOVED***
      // Only respond to left clicks
      if (evt.which !== 1) ***REMOVED***
        return;
      ***REMOVED***

      self.trigger('toggle', ***REMOVED***
        originalEvent: evt
      ***REMOVED***);
    ***REMOVED***);

    this.$selection.on('focus', function (evt) ***REMOVED***
      // User focuses on the container
    ***REMOVED***);

    this.$selection.on('blur', function (evt) ***REMOVED***
      // User exits the container
    ***REMOVED***);

    container.on('focus', function (evt) ***REMOVED***
      if (!container.isOpen()) ***REMOVED***
        self.$selection.focus();
      ***REMOVED***
    ***REMOVED***);

    container.on('selection:update', function (params) ***REMOVED***
      self.update(params.data);
    ***REMOVED***);
  ***REMOVED***;

  SingleSelection.prototype.clear = function () ***REMOVED***
    this.$selection.find('.select2-selection__rendered').empty();
  ***REMOVED***;

  SingleSelection.prototype.display = function (data, container) ***REMOVED***
    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data, container));
  ***REMOVED***;

  SingleSelection.prototype.selectionContainer = function () ***REMOVED***
    return $('<span></span>');
  ***REMOVED***;

  SingleSelection.prototype.update = function (data) ***REMOVED***
    if (data.length === 0) ***REMOVED***
      this.clear();
      return;
    ***REMOVED***

    var selection = data[0];

    var $rendered = this.$selection.find('.select2-selection__rendered');
    var formatted = this.display(selection, $rendered);

    $rendered.empty().append(formatted);
    $rendered.prop('title', selection.title || selection.text);
  ***REMOVED***;

  return SingleSelection;
***REMOVED***);

S2.define('select2/selection/multiple',[
  'jquery',
  './base',
  '../utils'
], function ($, BaseSelection, Utils) ***REMOVED***
  function MultipleSelection ($element, options) ***REMOVED***
    MultipleSelection.__super__.constructor.apply(this, arguments);
  ***REMOVED***

  Utils.Extend(MultipleSelection, BaseSelection);

  MultipleSelection.prototype.render = function () ***REMOVED***
    var $selection = MultipleSelection.__super__.render.call(this);

    $selection.addClass('select2-selection--multiple');

    $selection.html(
      '<ul class="select2-selection__rendered"></ul>'
    );

    return $selection;
  ***REMOVED***;

  MultipleSelection.prototype.bind = function (container, $container) ***REMOVED***
    var self = this;

    MultipleSelection.__super__.bind.apply(this, arguments);

    this.$selection.on('click', function (evt) ***REMOVED***
      self.trigger('toggle', ***REMOVED***
        originalEvent: evt
      ***REMOVED***);
    ***REMOVED***);

    this.$selection.on(
      'click',
      '.select2-selection__choice__remove',
      function (evt) ***REMOVED***
        // Ignore the event if it is disabled
        if (self.options.get('disabled')) ***REMOVED***
          return;
        ***REMOVED***

        var $remove = $(this);
        var $selection = $remove.parent();

        var data = $selection.data('data');

        self.trigger('unselect', ***REMOVED***
          originalEvent: evt,
          data: data
        ***REMOVED***);
      ***REMOVED***
    );
  ***REMOVED***;

  MultipleSelection.prototype.clear = function () ***REMOVED***
    this.$selection.find('.select2-selection__rendered').empty();
  ***REMOVED***;

  MultipleSelection.prototype.display = function (data, container) ***REMOVED***
    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data, container));
  ***REMOVED***;

  MultipleSelection.prototype.selectionContainer = function () ***REMOVED***
    var $container = $(
      '<li class="select2-selection__choice">' +
        '<span class="select2-selection__choice__remove" role="presentation">' +
          '&times;' +
        '</span>' +
      '</li>'
    );

    return $container;
  ***REMOVED***;

  MultipleSelection.prototype.update = function (data) ***REMOVED***
    this.clear();

    if (data.length === 0) ***REMOVED***
      return;
    ***REMOVED***

    var $selections = [];

    for (var d = 0; d < data.length; d++) ***REMOVED***
      var selection = data[d];

      var $selection = this.selectionContainer();
      var formatted = this.display(selection, $selection);

      $selection.append(formatted);
      $selection.prop('title', selection.title || selection.text);

      $selection.data('data', selection);

      $selections.push($selection);
    ***REMOVED***

    var $rendered = this.$selection.find('.select2-selection__rendered');

    Utils.appendMany($rendered, $selections);
  ***REMOVED***;

  return MultipleSelection;
***REMOVED***);

S2.define('select2/selection/placeholder',[
  '../utils'
], function (Utils) ***REMOVED***
  function Placeholder (decorated, $element, options) ***REMOVED***
    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

    decorated.call(this, $element, options);
  ***REMOVED***

  Placeholder.prototype.normalizePlaceholder = function (_, placeholder) ***REMOVED***
    if (typeof placeholder === 'string') ***REMOVED***
      placeholder = ***REMOVED***
        id: '',
        text: placeholder
      ***REMOVED***;
    ***REMOVED***

    return placeholder;
  ***REMOVED***;

  Placeholder.prototype.createPlaceholder = function (decorated, placeholder) ***REMOVED***
    var $placeholder = this.selectionContainer();

    $placeholder.html(this.display(placeholder));
    $placeholder.addClass('select2-selection__placeholder')
                .removeClass('select2-selection__choice');

    return $placeholder;
  ***REMOVED***;

  Placeholder.prototype.update = function (decorated, data) ***REMOVED***
    var singlePlaceholder = (
      data.length == 1 && data[0].id != this.placeholder.id
    );
    var multipleSelections = data.length > 1;

    if (multipleSelections || singlePlaceholder) ***REMOVED***
      return decorated.call(this, data);
    ***REMOVED***

    this.clear();

    var $placeholder = this.createPlaceholder(this.placeholder);

    this.$selection.find('.select2-selection__rendered').append($placeholder);
  ***REMOVED***;

  return Placeholder;
***REMOVED***);

S2.define('select2/selection/allowClear',[
  'jquery',
  '../keys'
], function ($, KEYS) ***REMOVED***
  function AllowClear () ***REMOVED*** ***REMOVED***

  AllowClear.prototype.bind = function (decorated, container, $container) ***REMOVED***
    var self = this;

    decorated.call(this, container, $container);

    if (this.placeholder == null) ***REMOVED***
      if (this.options.get('debug') && window.console && console.error) ***REMOVED***
        console.error(
          'Select2: The `allowClear` option should be used in combination ' +
          'with the `placeholder` option.'
        );
      ***REMOVED***
    ***REMOVED***

    this.$selection.on('mousedown', '.select2-selection__clear',
      function (evt) ***REMOVED***
        self._handleClear(evt);
    ***REMOVED***);

    container.on('keypress', function (evt) ***REMOVED***
      self._handleKeyboardClear(evt, container);
    ***REMOVED***);
  ***REMOVED***;

  AllowClear.prototype._handleClear = function (_, evt) ***REMOVED***
    // Ignore the event if it is disabled
    if (this.options.get('disabled')) ***REMOVED***
      return;
    ***REMOVED***

    var $clear = this.$selection.find('.select2-selection__clear');

    // Ignore the event if nothing has been selected
    if ($clear.length === 0) ***REMOVED***
      return;
    ***REMOVED***

    evt.stopPropagation();

    var data = $clear.data('data');

    for (var d = 0; d < data.length; d++) ***REMOVED***
      var unselectData = ***REMOVED***
        data: data[d]
      ***REMOVED***;

      // Trigger the `unselect` event, so people can prevent it from being
      // cleared.
      this.trigger('unselect', unselectData);

      // If the event was prevented, don't clear it out.
      if (unselectData.prevented) ***REMOVED***
        return;
      ***REMOVED***
    ***REMOVED***

    this.$element.val(this.placeholder.id).trigger('change');

    this.trigger('toggle', ***REMOVED******REMOVED***);
  ***REMOVED***;

  AllowClear.prototype._handleKeyboardClear = function (_, evt, container) ***REMOVED***
    if (container.isOpen()) ***REMOVED***
      return;
    ***REMOVED***

    if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) ***REMOVED***
      this._handleClear(evt);
    ***REMOVED***
  ***REMOVED***;

  AllowClear.prototype.update = function (decorated, data) ***REMOVED***
    decorated.call(this, data);

    if (this.$selection.find('.select2-selection__placeholder').length > 0 ||
        data.length === 0) ***REMOVED***
      return;
    ***REMOVED***

    var $remove = $(
      '<span class="select2-selection__clear">' +
        '&times;' +
      '</span>'
    );
    $remove.data('data', data);

    this.$selection.find('.select2-selection__rendered').prepend($remove);
  ***REMOVED***;

  return AllowClear;
***REMOVED***);

S2.define('select2/selection/search',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) ***REMOVED***
  function Search (decorated, $element, options) ***REMOVED***
    decorated.call(this, $element, options);
  ***REMOVED***

  Search.prototype.render = function (decorated) ***REMOVED***
    var $search = $(
      '<li class="select2-search select2-search--inline">' +
        '<input class="select2-search__field" type="search" tabindex="-1"' +
        ' autocomplete="off" autocorrect="off" autocapitalize="off"' +
        ' spellcheck="false" role="textbox" aria-autocomplete="list" />' +
      '</li>'
    );

    this.$searchContainer = $search;
    this.$search = $search.find('input');

    var $rendered = decorated.call(this);

    this._transferTabIndex();

    return $rendered;
  ***REMOVED***;

  Search.prototype.bind = function (decorated, container, $container) ***REMOVED***
    var self = this;

    decorated.call(this, container, $container);

    container.on('open', function () ***REMOVED***
      self.$search.trigger('focus');
    ***REMOVED***);

    container.on('close', function () ***REMOVED***
      self.$search.val('');
      self.$search.removeAttr('aria-activedescendant');
      self.$search.trigger('focus');
    ***REMOVED***);

    container.on('enable', function () ***REMOVED***
      self.$search.prop('disabled', false);

      self._transferTabIndex();
    ***REMOVED***);

    container.on('disable', function () ***REMOVED***
      self.$search.prop('disabled', true);
    ***REMOVED***);

    container.on('focus', function (evt) ***REMOVED***
      self.$search.trigger('focus');
    ***REMOVED***);

    container.on('results:focus', function (params) ***REMOVED***
      self.$search.attr('aria-activedescendant', params.id);
    ***REMOVED***);

    this.$selection.on('focusin', '.select2-search--inline', function (evt) ***REMOVED***
      self.trigger('focus', evt);
    ***REMOVED***);

    this.$selection.on('focusout', '.select2-search--inline', function (evt) ***REMOVED***
      self._handleBlur(evt);
    ***REMOVED***);

    this.$selection.on('keydown', '.select2-search--inline', function (evt) ***REMOVED***
      evt.stopPropagation();

      self.trigger('keypress', evt);

      self._keyUpPrevented = evt.isDefaultPrevented();

      var key = evt.which;

      if (key === KEYS.BACKSPACE && self.$search.val() === '') ***REMOVED***
        var $previousChoice = self.$searchContainer
          .prev('.select2-selection__choice');

        if ($previousChoice.length > 0) ***REMOVED***
          var item = $previousChoice.data('data');

          self.searchRemoveChoice(item);

          evt.preventDefault();
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***);

    // Try to detect the IE version should the `documentMode` property that
    // is stored on the document. This is only implemented in IE and is
    // slightly cleaner than doing a user agent check.
    // This property is not available in Edge, but Edge also doesn't have
    // this bug.
    var msie = document.documentMode;
    var disableInputEvents = msie && msie <= 11;

    // Workaround for browsers which do not support the `input` event
    // This will prevent double-triggering of events for browsers which support
    // both the `keyup` and `input` events.
    this.$selection.on(
      'input.searchcheck',
      '.select2-search--inline',
      function (evt) ***REMOVED***
        // IE will trigger the `input` event when a placeholder is used on a
        // search box. To get around this issue, we are forced to ignore all
        // `input` events in IE and keep using `keyup`.
        if (disableInputEvents) ***REMOVED***
          self.$selection.off('input.search input.searchcheck');
          return;
        ***REMOVED***

        // Unbind the duplicated `keyup` event
        self.$selection.off('keyup.search');
      ***REMOVED***
    );

    this.$selection.on(
      'keyup.search input.search',
      '.select2-search--inline',
      function (evt) ***REMOVED***
        // IE will trigger the `input` event when a placeholder is used on a
        // search box. To get around this issue, we are forced to ignore all
        // `input` events in IE and keep using `keyup`.
        if (disableInputEvents && evt.type === 'input') ***REMOVED***
          self.$selection.off('input.search input.searchcheck');
          return;
        ***REMOVED***

        var key = evt.which;

        // We can freely ignore events from modifier keys
        if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) ***REMOVED***
          return;
        ***REMOVED***

        // Tabbing will be handled during the `keydown` phase
        if (key == KEYS.TAB) ***REMOVED***
          return;
        ***REMOVED***

        self.handleSearch(evt);
      ***REMOVED***
    );
  ***REMOVED***;

  /**
   * This method will transfer the tabindex attribute from the rendered
   * selection to the search box. This allows for the search box to be used as
   * the primary focus instead of the selection container.
   *
   * @private
   */
  Search.prototype._transferTabIndex = function (decorated) ***REMOVED***
    this.$search.attr('tabindex', this.$selection.attr('tabindex'));
    this.$selection.attr('tabindex', '-1');
  ***REMOVED***;

  Search.prototype.createPlaceholder = function (decorated, placeholder) ***REMOVED***
    this.$search.attr('placeholder', placeholder.text);
  ***REMOVED***;

  Search.prototype.update = function (decorated, data) ***REMOVED***
    var searchHadFocus = this.$search[0] == document.activeElement;

    this.$search.attr('placeholder', '');

    decorated.call(this, data);

    this.$selection.find('.select2-selection__rendered')
                   .append(this.$searchContainer);

    this.resizeSearch();
    if (searchHadFocus) ***REMOVED***
      this.$search.focus();
    ***REMOVED***
  ***REMOVED***;

  Search.prototype.handleSearch = function () ***REMOVED***
    this.resizeSearch();

    if (!this._keyUpPrevented) ***REMOVED***
      var input = this.$search.val();

      this.trigger('query', ***REMOVED***
        term: input
      ***REMOVED***);
    ***REMOVED***

    this._keyUpPrevented = false;
  ***REMOVED***;

  Search.prototype.searchRemoveChoice = function (decorated, item) ***REMOVED***
    this.trigger('unselect', ***REMOVED***
      data: item
    ***REMOVED***);

    this.$search.val(item.text);
    this.handleSearch();
  ***REMOVED***;

  Search.prototype.resizeSearch = function () ***REMOVED***
    this.$search.css('width', '25px');

    var width = '';

    if (this.$search.attr('placeholder') !== '') ***REMOVED***
      width = this.$selection.find('.select2-selection__rendered').innerWidth();
    ***REMOVED*** else ***REMOVED***
      var minimumWidth = this.$search.val().length + 1;

      width = (minimumWidth * 0.75) + 'em';
    ***REMOVED***

    this.$search.css('width', width);
  ***REMOVED***;

  return Search;
***REMOVED***);

S2.define('select2/selection/eventRelay',[
  'jquery'
], function ($) ***REMOVED***
  function EventRelay () ***REMOVED*** ***REMOVED***

  EventRelay.prototype.bind = function (decorated, container, $container) ***REMOVED***
    var self = this;
    var relayEvents = [
      'open', 'opening',
      'close', 'closing',
      'select', 'selecting',
      'unselect', 'unselecting'
    ];

    var preventableEvents = ['opening', 'closing', 'selecting', 'unselecting'];

    decorated.call(this, container, $container);

    container.on('*', function (name, params) ***REMOVED***
      // Ignore events that should not be relayed
      if ($.inArray(name, relayEvents) === -1) ***REMOVED***
        return;
      ***REMOVED***

      // The parameters should always be an object
      params = params || ***REMOVED******REMOVED***;

      // Generate the jQuery event for the Select2 event
      var evt = $.Event('select2:' + name, ***REMOVED***
        params: params
      ***REMOVED***);

      self.$element.trigger(evt);

      // Only handle preventable events if it was one
      if ($.inArray(name, preventableEvents) === -1) ***REMOVED***
        return;
      ***REMOVED***

      params.prevented = evt.isDefaultPrevented();
    ***REMOVED***);
  ***REMOVED***;

  return EventRelay;
***REMOVED***);

S2.define('select2/translation',[
  'jquery',
  'require'
], function ($, require) ***REMOVED***
  function Translation (dict) ***REMOVED***
    this.dict = dict || ***REMOVED******REMOVED***;
  ***REMOVED***

  Translation.prototype.all = function () ***REMOVED***
    return this.dict;
  ***REMOVED***;

  Translation.prototype.get = function (key) ***REMOVED***
    return this.dict[key];
  ***REMOVED***;

  Translation.prototype.extend = function (translation) ***REMOVED***
    this.dict = $.extend(***REMOVED******REMOVED***, translation.all(), this.dict);
  ***REMOVED***;

  // Static functions

  Translation._cache = ***REMOVED******REMOVED***;

  Translation.loadPath = function (path) ***REMOVED***
    if (!(path in Translation._cache)) ***REMOVED***
      var translations = require(path);

      Translation._cache[path] = translations;
    ***REMOVED***

    return new Translation(Translation._cache[path]);
  ***REMOVED***;

  return Translation;
***REMOVED***);

S2.define('select2/diacritics',[

], function () ***REMOVED***
  var diacritics = ***REMOVED***
    '\u24B6': 'A',
    '\uFF21': 'A',
    '\u00C0': 'A',
    '\u00C1': 'A',
    '\u00C2': 'A',
    '\u1EA6': 'A',
    '\u1EA4': 'A',
    '\u1EAA': 'A',
    '\u1EA8': 'A',
    '\u00C3': 'A',
    '\u0100': 'A',
    '\u0102': 'A',
    '\u1EB0': 'A',
    '\u1EAE': 'A',
    '\u1EB4': 'A',
    '\u1EB2': 'A',
    '\u0226': 'A',
    '\u01E0': 'A',
    '\u00C4': 'A',
    '\u01DE': 'A',
    '\u1EA2': 'A',
    '\u00C5': 'A',
    '\u01FA': 'A',
    '\u01CD': 'A',
    '\u0200': 'A',
    '\u0202': 'A',
    '\u1EA0': 'A',
    '\u1EAC': 'A',
    '\u1EB6': 'A',
    '\u1E00': 'A',
    '\u0104': 'A',
    '\u023A': 'A',
    '\u2C6F': 'A',
    '\uA732': 'AA',
    '\u00C6': 'AE',
    '\u01FC': 'AE',
    '\u01E2': 'AE',
    '\uA734': 'AO',
    '\uA736': 'AU',
    '\uA738': 'AV',
    '\uA73A': 'AV',
    '\uA73C': 'AY',
    '\u24B7': 'B',
    '\uFF22': 'B',
    '\u1E02': 'B',
    '\u1E04': 'B',
    '\u1E06': 'B',
    '\u0243': 'B',
    '\u0182': 'B',
    '\u0181': 'B',
    '\u24B8': 'C',
    '\uFF23': 'C',
    '\u0106': 'C',
    '\u0108': 'C',
    '\u010A': 'C',
    '\u010C': 'C',
    '\u00C7': 'C',
    '\u1E08': 'C',
    '\u0187': 'C',
    '\u023B': 'C',
    '\uA73E': 'C',
    '\u24B9': 'D',
    '\uFF24': 'D',
    '\u1E0A': 'D',
    '\u010E': 'D',
    '\u1E0C': 'D',
    '\u1E10': 'D',
    '\u1E12': 'D',
    '\u1E0E': 'D',
    '\u0110': 'D',
    '\u018B': 'D',
    '\u018A': 'D',
    '\u0189': 'D',
    '\uA779': 'D',
    '\u01F1': 'DZ',
    '\u01C4': 'DZ',
    '\u01F2': 'Dz',
    '\u01C5': 'Dz',
    '\u24BA': 'E',
    '\uFF25': 'E',
    '\u00C8': 'E',
    '\u00C9': 'E',
    '\u00CA': 'E',
    '\u1EC0': 'E',
    '\u1EBE': 'E',
    '\u1EC4': 'E',
    '\u1EC2': 'E',
    '\u1EBC': 'E',
    '\u0112': 'E',
    '\u1E14': 'E',
    '\u1E16': 'E',
    '\u0114': 'E',
    '\u0116': 'E',
    '\u00CB': 'E',
    '\u1EBA': 'E',
    '\u011A': 'E',
    '\u0204': 'E',
    '\u0206': 'E',
    '\u1EB8': 'E',
    '\u1EC6': 'E',
    '\u0228': 'E',
    '\u1E1C': 'E',
    '\u0118': 'E',
    '\u1E18': 'E',
    '\u1E1A': 'E',
    '\u0190': 'E',
    '\u018E': 'E',
    '\u24BB': 'F',
    '\uFF26': 'F',
    '\u1E1E': 'F',
    '\u0191': 'F',
    '\uA77B': 'F',
    '\u24BC': 'G',
    '\uFF27': 'G',
    '\u01F4': 'G',
    '\u011C': 'G',
    '\u1E20': 'G',
    '\u011E': 'G',
    '\u0120': 'G',
    '\u01E6': 'G',
    '\u0122': 'G',
    '\u01E4': 'G',
    '\u0193': 'G',
    '\uA7A0': 'G',
    '\uA77D': 'G',
    '\uA77E': 'G',
    '\u24BD': 'H',
    '\uFF28': 'H',
    '\u0124': 'H',
    '\u1E22': 'H',
    '\u1E26': 'H',
    '\u021E': 'H',
    '\u1E24': 'H',
    '\u1E28': 'H',
    '\u1E2A': 'H',
    '\u0126': 'H',
    '\u2C67': 'H',
    '\u2C75': 'H',
    '\uA78D': 'H',
    '\u24BE': 'I',
    '\uFF29': 'I',
    '\u00CC': 'I',
    '\u00CD': 'I',
    '\u00CE': 'I',
    '\u0128': 'I',
    '\u012A': 'I',
    '\u012C': 'I',
    '\u0130': 'I',
    '\u00CF': 'I',
    '\u1E2E': 'I',
    '\u1EC8': 'I',
    '\u01CF': 'I',
    '\u0208': 'I',
    '\u020A': 'I',
    '\u1ECA': 'I',
    '\u012E': 'I',
    '\u1E2C': 'I',
    '\u0197': 'I',
    '\u24BF': 'J',
    '\uFF2A': 'J',
    '\u0134': 'J',
    '\u0248': 'J',
    '\u24C0': 'K',
    '\uFF2B': 'K',
    '\u1E30': 'K',
    '\u01E8': 'K',
    '\u1E32': 'K',
    '\u0136': 'K',
    '\u1E34': 'K',
    '\u0198': 'K',
    '\u2C69': 'K',
    '\uA740': 'K',
    '\uA742': 'K',
    '\uA744': 'K',
    '\uA7A2': 'K',
    '\u24C1': 'L',
    '\uFF2C': 'L',
    '\u013F': 'L',
    '\u0139': 'L',
    '\u013D': 'L',
    '\u1E36': 'L',
    '\u1E38': 'L',
    '\u013B': 'L',
    '\u1E3C': 'L',
    '\u1E3A': 'L',
    '\u0141': 'L',
    '\u023D': 'L',
    '\u2C62': 'L',
    '\u2C60': 'L',
    '\uA748': 'L',
    '\uA746': 'L',
    '\uA780': 'L',
    '\u01C7': 'LJ',
    '\u01C8': 'Lj',
    '\u24C2': 'M',
    '\uFF2D': 'M',
    '\u1E3E': 'M',
    '\u1E40': 'M',
    '\u1E42': 'M',
    '\u2C6E': 'M',
    '\u019C': 'M',
    '\u24C3': 'N',
    '\uFF2E': 'N',
    '\u01F8': 'N',
    '\u0143': 'N',
    '\u00D1': 'N',
    '\u1E44': 'N',
    '\u0147': 'N',
    '\u1E46': 'N',
    '\u0145': 'N',
    '\u1E4A': 'N',
    '\u1E48': 'N',
    '\u0220': 'N',
    '\u019D': 'N',
    '\uA790': 'N',
    '\uA7A4': 'N',
    '\u01CA': 'NJ',
    '\u01CB': 'Nj',
    '\u24C4': 'O',
    '\uFF2F': 'O',
    '\u00D2': 'O',
    '\u00D3': 'O',
    '\u00D4': 'O',
    '\u1ED2': 'O',
    '\u1ED0': 'O',
    '\u1ED6': 'O',
    '\u1ED4': 'O',
    '\u00D5': 'O',
    '\u1E4C': 'O',
    '\u022C': 'O',
    '\u1E4E': 'O',
    '\u014C': 'O',
    '\u1E50': 'O',
    '\u1E52': 'O',
    '\u014E': 'O',
    '\u022E': 'O',
    '\u0230': 'O',
    '\u00D6': 'O',
    '\u022A': 'O',
    '\u1ECE': 'O',
    '\u0150': 'O',
    '\u01D1': 'O',
    '\u020C': 'O',
    '\u020E': 'O',
    '\u01A0': 'O',
    '\u1EDC': 'O',
    '\u1EDA': 'O',
    '\u1EE0': 'O',
    '\u1EDE': 'O',
    '\u1EE2': 'O',
    '\u1ECC': 'O',
    '\u1ED8': 'O',
    '\u01EA': 'O',
    '\u01EC': 'O',
    '\u00D8': 'O',
    '\u01FE': 'O',
    '\u0186': 'O',
    '\u019F': 'O',
    '\uA74A': 'O',
    '\uA74C': 'O',
    '\u01A2': 'OI',
    '\uA74E': 'OO',
    '\u0222': 'OU',
    '\u24C5': 'P',
    '\uFF30': 'P',
    '\u1E54': 'P',
    '\u1E56': 'P',
    '\u01A4': 'P',
    '\u2C63': 'P',
    '\uA750': 'P',
    '\uA752': 'P',
    '\uA754': 'P',
    '\u24C6': 'Q',
    '\uFF31': 'Q',
    '\uA756': 'Q',
    '\uA758': 'Q',
    '\u024A': 'Q',
    '\u24C7': 'R',
    '\uFF32': 'R',
    '\u0154': 'R',
    '\u1E58': 'R',
    '\u0158': 'R',
    '\u0210': 'R',
    '\u0212': 'R',
    '\u1E5A': 'R',
    '\u1E5C': 'R',
    '\u0156': 'R',
    '\u1E5E': 'R',
    '\u024C': 'R',
    '\u2C64': 'R',
    '\uA75A': 'R',
    '\uA7A6': 'R',
    '\uA782': 'R',
    '\u24C8': 'S',
    '\uFF33': 'S',
    '\u1E9E': 'S',
    '\u015A': 'S',
    '\u1E64': 'S',
    '\u015C': 'S',
    '\u1E60': 'S',
    '\u0160': 'S',
    '\u1E66': 'S',
    '\u1E62': 'S',
    '\u1E68': 'S',
    '\u0218': 'S',
    '\u015E': 'S',
    '\u2C7E': 'S',
    '\uA7A8': 'S',
    '\uA784': 'S',
    '\u24C9': 'T',
    '\uFF34': 'T',
    '\u1E6A': 'T',
    '\u0164': 'T',
    '\u1E6C': 'T',
    '\u021A': 'T',
    '\u0162': 'T',
    '\u1E70': 'T',
    '\u1E6E': 'T',
    '\u0166': 'T',
    '\u01AC': 'T',
    '\u01AE': 'T',
    '\u023E': 'T',
    '\uA786': 'T',
    '\uA728': 'TZ',
    '\u24CA': 'U',
    '\uFF35': 'U',
    '\u00D9': 'U',
    '\u00DA': 'U',
    '\u00DB': 'U',
    '\u0168': 'U',
    '\u1E78': 'U',
    '\u016A': 'U',
    '\u1E7A': 'U',
    '\u016C': 'U',
    '\u00DC': 'U',
    '\u01DB': 'U',
    '\u01D7': 'U',
    '\u01D5': 'U',
    '\u01D9': 'U',
    '\u1EE6': 'U',
    '\u016E': 'U',
    '\u0170': 'U',
    '\u01D3': 'U',
    '\u0214': 'U',
    '\u0216': 'U',
    '\u01AF': 'U',
    '\u1EEA': 'U',
    '\u1EE8': 'U',
    '\u1EEE': 'U',
    '\u1EEC': 'U',
    '\u1EF0': 'U',
    '\u1EE4': 'U',
    '\u1E72': 'U',
    '\u0172': 'U',
    '\u1E76': 'U',
    '\u1E74': 'U',
    '\u0244': 'U',
    '\u24CB': 'V',
    '\uFF36': 'V',
    '\u1E7C': 'V',
    '\u1E7E': 'V',
    '\u01B2': 'V',
    '\uA75E': 'V',
    '\u0245': 'V',
    '\uA760': 'VY',
    '\u24CC': 'W',
    '\uFF37': 'W',
    '\u1E80': 'W',
    '\u1E82': 'W',
    '\u0174': 'W',
    '\u1E86': 'W',
    '\u1E84': 'W',
    '\u1E88': 'W',
    '\u2C72': 'W',
    '\u24CD': 'X',
    '\uFF38': 'X',
    '\u1E8A': 'X',
    '\u1E8C': 'X',
    '\u24CE': 'Y',
    '\uFF39': 'Y',
    '\u1EF2': 'Y',
    '\u00DD': 'Y',
    '\u0176': 'Y',
    '\u1EF8': 'Y',
    '\u0232': 'Y',
    '\u1E8E': 'Y',
    '\u0178': 'Y',
    '\u1EF6': 'Y',
    '\u1EF4': 'Y',
    '\u01B3': 'Y',
    '\u024E': 'Y',
    '\u1EFE': 'Y',
    '\u24CF': 'Z',
    '\uFF3A': 'Z',
    '\u0179': 'Z',
    '\u1E90': 'Z',
    '\u017B': 'Z',
    '\u017D': 'Z',
    '\u1E92': 'Z',
    '\u1E94': 'Z',
    '\u01B5': 'Z',
    '\u0224': 'Z',
    '\u2C7F': 'Z',
    '\u2C6B': 'Z',
    '\uA762': 'Z',
    '\u24D0': 'a',
    '\uFF41': 'a',
    '\u1E9A': 'a',
    '\u00E0': 'a',
    '\u00E1': 'a',
    '\u00E2': 'a',
    '\u1EA7': 'a',
    '\u1EA5': 'a',
    '\u1EAB': 'a',
    '\u1EA9': 'a',
    '\u00E3': 'a',
    '\u0101': 'a',
    '\u0103': 'a',
    '\u1EB1': 'a',
    '\u1EAF': 'a',
    '\u1EB5': 'a',
    '\u1EB3': 'a',
    '\u0227': 'a',
    '\u01E1': 'a',
    '\u00E4': 'a',
    '\u01DF': 'a',
    '\u1EA3': 'a',
    '\u00E5': 'a',
    '\u01FB': 'a',
    '\u01CE': 'a',
    '\u0201': 'a',
    '\u0203': 'a',
    '\u1EA1': 'a',
    '\u1EAD': 'a',
    '\u1EB7': 'a',
    '\u1E01': 'a',
    '\u0105': 'a',
    '\u2C65': 'a',
    '\u0250': 'a',
    '\uA733': 'aa',
    '\u00E6': 'ae',
    '\u01FD': 'ae',
    '\u01E3': 'ae',
    '\uA735': 'ao',
    '\uA737': 'au',
    '\uA739': 'av',
    '\uA73B': 'av',
    '\uA73D': 'ay',
    '\u24D1': 'b',
    '\uFF42': 'b',
    '\u1E03': 'b',
    '\u1E05': 'b',
    '\u1E07': 'b',
    '\u0180': 'b',
    '\u0183': 'b',
    '\u0253': 'b',
    '\u24D2': 'c',
    '\uFF43': 'c',
    '\u0107': 'c',
    '\u0109': 'c',
    '\u010B': 'c',
    '\u010D': 'c',
    '\u00E7': 'c',
    '\u1E09': 'c',
    '\u0188': 'c',
    '\u023C': 'c',
    '\uA73F': 'c',
    '\u2184': 'c',
    '\u24D3': 'd',
    '\uFF44': 'd',
    '\u1E0B': 'd',
    '\u010F': 'd',
    '\u1E0D': 'd',
    '\u1E11': 'd',
    '\u1E13': 'd',
    '\u1E0F': 'd',
    '\u0111': 'd',
    '\u018C': 'd',
    '\u0256': 'd',
    '\u0257': 'd',
    '\uA77A': 'd',
    '\u01F3': 'dz',
    '\u01C6': 'dz',
    '\u24D4': 'e',
    '\uFF45': 'e',
    '\u00E8': 'e',
    '\u00E9': 'e',
    '\u00EA': 'e',
    '\u1EC1': 'e',
    '\u1EBF': 'e',
    '\u1EC5': 'e',
    '\u1EC3': 'e',
    '\u1EBD': 'e',
    '\u0113': 'e',
    '\u1E15': 'e',
    '\u1E17': 'e',
    '\u0115': 'e',
    '\u0117': 'e',
    '\u00EB': 'e',
    '\u1EBB': 'e',
    '\u011B': 'e',
    '\u0205': 'e',
    '\u0207': 'e',
    '\u1EB9': 'e',
    '\u1EC7': 'e',
    '\u0229': 'e',
    '\u1E1D': 'e',
    '\u0119': 'e',
    '\u1E19': 'e',
    '\u1E1B': 'e',
    '\u0247': 'e',
    '\u025B': 'e',
    '\u01DD': 'e',
    '\u24D5': 'f',
    '\uFF46': 'f',
    '\u1E1F': 'f',
    '\u0192': 'f',
    '\uA77C': 'f',
    '\u24D6': 'g',
    '\uFF47': 'g',
    '\u01F5': 'g',
    '\u011D': 'g',
    '\u1E21': 'g',
    '\u011F': 'g',
    '\u0121': 'g',
    '\u01E7': 'g',
    '\u0123': 'g',
    '\u01E5': 'g',
    '\u0260': 'g',
    '\uA7A1': 'g',
    '\u1D79': 'g',
    '\uA77F': 'g',
    '\u24D7': 'h',
    '\uFF48': 'h',
    '\u0125': 'h',
    '\u1E23': 'h',
    '\u1E27': 'h',
    '\u021F': 'h',
    '\u1E25': 'h',
    '\u1E29': 'h',
    '\u1E2B': 'h',
    '\u1E96': 'h',
    '\u0127': 'h',
    '\u2C68': 'h',
    '\u2C76': 'h',
    '\u0265': 'h',
    '\u0195': 'hv',
    '\u24D8': 'i',
    '\uFF49': 'i',
    '\u00EC': 'i',
    '\u00ED': 'i',
    '\u00EE': 'i',
    '\u0129': 'i',
    '\u012B': 'i',
    '\u012D': 'i',
    '\u00EF': 'i',
    '\u1E2F': 'i',
    '\u1EC9': 'i',
    '\u01D0': 'i',
    '\u0209': 'i',
    '\u020B': 'i',
    '\u1ECB': 'i',
    '\u012F': 'i',
    '\u1E2D': 'i',
    '\u0268': 'i',
    '\u0131': 'i',
    '\u24D9': 'j',
    '\uFF4A': 'j',
    '\u0135': 'j',
    '\u01F0': 'j',
    '\u0249': 'j',
    '\u24DA': 'k',
    '\uFF4B': 'k',
    '\u1E31': 'k',
    '\u01E9': 'k',
    '\u1E33': 'k',
    '\u0137': 'k',
    '\u1E35': 'k',
    '\u0199': 'k',
    '\u2C6A': 'k',
    '\uA741': 'k',
    '\uA743': 'k',
    '\uA745': 'k',
    '\uA7A3': 'k',
    '\u24DB': 'l',
    '\uFF4C': 'l',
    '\u0140': 'l',
    '\u013A': 'l',
    '\u013E': 'l',
    '\u1E37': 'l',
    '\u1E39': 'l',
    '\u013C': 'l',
    '\u1E3D': 'l',
    '\u1E3B': 'l',
    '\u017F': 'l',
    '\u0142': 'l',
    '\u019A': 'l',
    '\u026B': 'l',
    '\u2C61': 'l',
    '\uA749': 'l',
    '\uA781': 'l',
    '\uA747': 'l',
    '\u01C9': 'lj',
    '\u24DC': 'm',
    '\uFF4D': 'm',
    '\u1E3F': 'm',
    '\u1E41': 'm',
    '\u1E43': 'm',
    '\u0271': 'm',
    '\u026F': 'm',
    '\u24DD': 'n',
    '\uFF4E': 'n',
    '\u01F9': 'n',
    '\u0144': 'n',
    '\u00F1': 'n',
    '\u1E45': 'n',
    '\u0148': 'n',
    '\u1E47': 'n',
    '\u0146': 'n',
    '\u1E4B': 'n',
    '\u1E49': 'n',
    '\u019E': 'n',
    '\u0272': 'n',
    '\u0149': 'n',
    '\uA791': 'n',
    '\uA7A5': 'n',
    '\u01CC': 'nj',
    '\u24DE': 'o',
    '\uFF4F': 'o',
    '\u00F2': 'o',
    '\u00F3': 'o',
    '\u00F4': 'o',
    '\u1ED3': 'o',
    '\u1ED1': 'o',
    '\u1ED7': 'o',
    '\u1ED5': 'o',
    '\u00F5': 'o',
    '\u1E4D': 'o',
    '\u022D': 'o',
    '\u1E4F': 'o',
    '\u014D': 'o',
    '\u1E51': 'o',
    '\u1E53': 'o',
    '\u014F': 'o',
    '\u022F': 'o',
    '\u0231': 'o',
    '\u00F6': 'o',
    '\u022B': 'o',
    '\u1ECF': 'o',
    '\u0151': 'o',
    '\u01D2': 'o',
    '\u020D': 'o',
    '\u020F': 'o',
    '\u01A1': 'o',
    '\u1EDD': 'o',
    '\u1EDB': 'o',
    '\u1EE1': 'o',
    '\u1EDF': 'o',
    '\u1EE3': 'o',
    '\u1ECD': 'o',
    '\u1ED9': 'o',
    '\u01EB': 'o',
    '\u01ED': 'o',
    '\u00F8': 'o',
    '\u01FF': 'o',
    '\u0254': 'o',
    '\uA74B': 'o',
    '\uA74D': 'o',
    '\u0275': 'o',
    '\u01A3': 'oi',
    '\u0223': 'ou',
    '\uA74F': 'oo',
    '\u24DF': 'p',
    '\uFF50': 'p',
    '\u1E55': 'p',
    '\u1E57': 'p',
    '\u01A5': 'p',
    '\u1D7D': 'p',
    '\uA751': 'p',
    '\uA753': 'p',
    '\uA755': 'p',
    '\u24E0': 'q',
    '\uFF51': 'q',
    '\u024B': 'q',
    '\uA757': 'q',
    '\uA759': 'q',
    '\u24E1': 'r',
    '\uFF52': 'r',
    '\u0155': 'r',
    '\u1E59': 'r',
    '\u0159': 'r',
    '\u0211': 'r',
    '\u0213': 'r',
    '\u1E5B': 'r',
    '\u1E5D': 'r',
    '\u0157': 'r',
    '\u1E5F': 'r',
    '\u024D': 'r',
    '\u027D': 'r',
    '\uA75B': 'r',
    '\uA7A7': 'r',
    '\uA783': 'r',
    '\u24E2': 's',
    '\uFF53': 's',
    '\u00DF': 's',
    '\u015B': 's',
    '\u1E65': 's',
    '\u015D': 's',
    '\u1E61': 's',
    '\u0161': 's',
    '\u1E67': 's',
    '\u1E63': 's',
    '\u1E69': 's',
    '\u0219': 's',
    '\u015F': 's',
    '\u023F': 's',
    '\uA7A9': 's',
    '\uA785': 's',
    '\u1E9B': 's',
    '\u24E3': 't',
    '\uFF54': 't',
    '\u1E6B': 't',
    '\u1E97': 't',
    '\u0165': 't',
    '\u1E6D': 't',
    '\u021B': 't',
    '\u0163': 't',
    '\u1E71': 't',
    '\u1E6F': 't',
    '\u0167': 't',
    '\u01AD': 't',
    '\u0288': 't',
    '\u2C66': 't',
    '\uA787': 't',
    '\uA729': 'tz',
    '\u24E4': 'u',
    '\uFF55': 'u',
    '\u00F9': 'u',
    '\u00FA': 'u',
    '\u00FB': 'u',
    '\u0169': 'u',
    '\u1E79': 'u',
    '\u016B': 'u',
    '\u1E7B': 'u',
    '\u016D': 'u',
    '\u00FC': 'u',
    '\u01DC': 'u',
    '\u01D8': 'u',
    '\u01D6': 'u',
    '\u01DA': 'u',
    '\u1EE7': 'u',
    '\u016F': 'u',
    '\u0171': 'u',
    '\u01D4': 'u',
    '\u0215': 'u',
    '\u0217': 'u',
    '\u01B0': 'u',
    '\u1EEB': 'u',
    '\u1EE9': 'u',
    '\u1EEF': 'u',
    '\u1EED': 'u',
    '\u1EF1': 'u',
    '\u1EE5': 'u',
    '\u1E73': 'u',
    '\u0173': 'u',
    '\u1E77': 'u',
    '\u1E75': 'u',
    '\u0289': 'u',
    '\u24E5': 'v',
    '\uFF56': 'v',
    '\u1E7D': 'v',
    '\u1E7F': 'v',
    '\u028B': 'v',
    '\uA75F': 'v',
    '\u028C': 'v',
    '\uA761': 'vy',
    '\u24E6': 'w',
    '\uFF57': 'w',
    '\u1E81': 'w',
    '\u1E83': 'w',
    '\u0175': 'w',
    '\u1E87': 'w',
    '\u1E85': 'w',
    '\u1E98': 'w',
    '\u1E89': 'w',
    '\u2C73': 'w',
    '\u24E7': 'x',
    '\uFF58': 'x',
    '\u1E8B': 'x',
    '\u1E8D': 'x',
    '\u24E8': 'y',
    '\uFF59': 'y',
    '\u1EF3': 'y',
    '\u00FD': 'y',
    '\u0177': 'y',
    '\u1EF9': 'y',
    '\u0233': 'y',
    '\u1E8F': 'y',
    '\u00FF': 'y',
    '\u1EF7': 'y',
    '\u1E99': 'y',
    '\u1EF5': 'y',
    '\u01B4': 'y',
    '\u024F': 'y',
    '\u1EFF': 'y',
    '\u24E9': 'z',
    '\uFF5A': 'z',
    '\u017A': 'z',
    '\u1E91': 'z',
    '\u017C': 'z',
    '\u017E': 'z',
    '\u1E93': 'z',
    '\u1E95': 'z',
    '\u01B6': 'z',
    '\u0225': 'z',
    '\u0240': 'z',
    '\u2C6C': 'z',
    '\uA763': 'z',
    '\u0386': '\u0391',
    '\u0388': '\u0395',
    '\u0389': '\u0397',
    '\u038A': '\u0399',
    '\u03AA': '\u0399',
    '\u038C': '\u039F',
    '\u038E': '\u03A5',
    '\u03AB': '\u03A5',
    '\u038F': '\u03A9',
    '\u03AC': '\u03B1',
    '\u03AD': '\u03B5',
    '\u03AE': '\u03B7',
    '\u03AF': '\u03B9',
    '\u03CA': '\u03B9',
    '\u0390': '\u03B9',
    '\u03CC': '\u03BF',
    '\u03CD': '\u03C5',
    '\u03CB': '\u03C5',
    '\u03B0': '\u03C5',
    '\u03C9': '\u03C9',
    '\u03C2': '\u03C3'
  ***REMOVED***;

  return diacritics;
***REMOVED***);

S2.define('select2/data/base',[
  '../utils'
], function (Utils) ***REMOVED***
  function BaseAdapter ($element, options) ***REMOVED***
    BaseAdapter.__super__.constructor.call(this);
  ***REMOVED***

  Utils.Extend(BaseAdapter, Utils.Observable);

  BaseAdapter.prototype.current = function (callback) ***REMOVED***
    throw new Error('The `current` method must be defined in child classes.');
  ***REMOVED***;

  BaseAdapter.prototype.query = function (params, callback) ***REMOVED***
    throw new Error('The `query` method must be defined in child classes.');
  ***REMOVED***;

  BaseAdapter.prototype.bind = function (container, $container) ***REMOVED***
    // Can be implemented in subclasses
  ***REMOVED***;

  BaseAdapter.prototype.destroy = function () ***REMOVED***
    // Can be implemented in subclasses
  ***REMOVED***;

  BaseAdapter.prototype.generateResultId = function (container, data) ***REMOVED***
    var id = container.id + '-result-';

    id += Utils.generateChars(4);

    if (data.id != null) ***REMOVED***
      id += '-' + data.id.toString();
    ***REMOVED*** else ***REMOVED***
      id += '-' + Utils.generateChars(4);
    ***REMOVED***
    return id;
  ***REMOVED***;

  return BaseAdapter;
***REMOVED***);

S2.define('select2/data/select',[
  './base',
  '../utils',
  'jquery'
], function (BaseAdapter, Utils, $) ***REMOVED***
  function SelectAdapter ($element, options) ***REMOVED***
    this.$element = $element;
    this.options = options;

    SelectAdapter.__super__.constructor.call(this);
  ***REMOVED***

  Utils.Extend(SelectAdapter, BaseAdapter);

  SelectAdapter.prototype.current = function (callback) ***REMOVED***
    var data = [];
    var self = this;

    this.$element.find(':selected').each(function () ***REMOVED***
      var $option = $(this);

      var option = self.item($option);

      data.push(option);
    ***REMOVED***);

    callback(data);
  ***REMOVED***;

  SelectAdapter.prototype.select = function (data) ***REMOVED***
    var self = this;

    data.selected = true;

    // If data.element is a DOM node, use it instead
    if ($(data.element).is('option')) ***REMOVED***
      data.element.selected = true;

      this.$element.trigger('change');

      return;
    ***REMOVED***

    if (this.$element.prop('multiple')) ***REMOVED***
      this.current(function (currentData) ***REMOVED***
        var val = [];

        data = [data];
        data.push.apply(data, currentData);

        for (var d = 0; d < data.length; d++) ***REMOVED***
          var id = data[d].id;

          if ($.inArray(id, val) === -1) ***REMOVED***
            val.push(id);
          ***REMOVED***
        ***REMOVED***

        self.$element.val(val);
        self.$element.trigger('change');
      ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
      var val = data.id;

      this.$element.val(val);
      this.$element.trigger('change');
    ***REMOVED***
  ***REMOVED***;

  SelectAdapter.prototype.unselect = function (data) ***REMOVED***
    var self = this;

    if (!this.$element.prop('multiple')) ***REMOVED***
      return;
    ***REMOVED***

    data.selected = false;

    if ($(data.element).is('option')) ***REMOVED***
      data.element.selected = false;

      this.$element.trigger('change');

      return;
    ***REMOVED***

    this.current(function (currentData) ***REMOVED***
      var val = [];

      for (var d = 0; d < currentData.length; d++) ***REMOVED***
        var id = currentData[d].id;

        if (id !== data.id && $.inArray(id, val) === -1) ***REMOVED***
          val.push(id);
        ***REMOVED***
      ***REMOVED***

      self.$element.val(val);

      self.$element.trigger('change');
    ***REMOVED***);
  ***REMOVED***;

  SelectAdapter.prototype.bind = function (container, $container) ***REMOVED***
    var self = this;

    this.container = container;

    container.on('select', function (params) ***REMOVED***
      self.select(params.data);
    ***REMOVED***);

    container.on('unselect', function (params) ***REMOVED***
      self.unselect(params.data);
    ***REMOVED***);
  ***REMOVED***;

  SelectAdapter.prototype.destroy = function () ***REMOVED***
    // Remove anything added to child elements
    this.$element.find('*').each(function () ***REMOVED***
      // Remove any custom data set by Select2
      $.removeData(this, 'data');
    ***REMOVED***);
  ***REMOVED***;

  SelectAdapter.prototype.query = function (params, callback) ***REMOVED***
    var data = [];
    var self = this;

    var $options = this.$element.children();

    $options.each(function () ***REMOVED***
      var $option = $(this);

      if (!$option.is('option') && !$option.is('optgroup')) ***REMOVED***
        return;
      ***REMOVED***

      var option = self.item($option);

      var matches = self.matches(params, option);

      if (matches !== null) ***REMOVED***
        data.push(matches);
      ***REMOVED***
    ***REMOVED***);

    callback(***REMOVED***
      results: data
    ***REMOVED***);
  ***REMOVED***;

  SelectAdapter.prototype.addOptions = function ($options) ***REMOVED***
    Utils.appendMany(this.$element, $options);
  ***REMOVED***;

  SelectAdapter.prototype.option = function (data) ***REMOVED***
    var option;

    if (data.children) ***REMOVED***
      option = document.createElement('optgroup');
      option.label = data.text;
    ***REMOVED*** else ***REMOVED***
      option = document.createElement('option');

      if (option.textContent !== undefined) ***REMOVED***
        option.textContent = data.text;
      ***REMOVED*** else ***REMOVED***
        option.innerText = data.text;
      ***REMOVED***
    ***REMOVED***

    if (data.id) ***REMOVED***
      option.value = data.id;
    ***REMOVED***

    if (data.disabled) ***REMOVED***
      option.disabled = true;
    ***REMOVED***

    if (data.selected) ***REMOVED***
      option.selected = true;
    ***REMOVED***

    if (data.title) ***REMOVED***
      option.title = data.title;
    ***REMOVED***

    var $option = $(option);

    var normalizedData = this._normalizeItem(data);
    normalizedData.element = option;

    // Override the option's data with the combined data
    $.data(option, 'data', normalizedData);

    return $option;
  ***REMOVED***;

  SelectAdapter.prototype.item = function ($option) ***REMOVED***
    var data = ***REMOVED******REMOVED***;

    data = $.data($option[0], 'data');

    if (data != null) ***REMOVED***
      return data;
    ***REMOVED***

    if ($option.is('option')) ***REMOVED***
      data = ***REMOVED***
        id: $option.val(),
        text: $option.text(),
        disabled: $option.prop('disabled'),
        selected: $option.prop('selected'),
        title: $option.prop('title')
      ***REMOVED***;
    ***REMOVED*** else if ($option.is('optgroup')) ***REMOVED***
      data = ***REMOVED***
        text: $option.prop('label'),
        children: [],
        title: $option.prop('title')
      ***REMOVED***;

      var $children = $option.children('option');
      var children = [];

      for (var c = 0; c < $children.length; c++) ***REMOVED***
        var $child = $($children[c]);

        var child = this.item($child);

        children.push(child);
      ***REMOVED***

      data.children = children;
    ***REMOVED***

    data = this._normalizeItem(data);
    data.element = $option[0];

    $.data($option[0], 'data', data);

    return data;
  ***REMOVED***;

  SelectAdapter.prototype._normalizeItem = function (item) ***REMOVED***
    if (!$.isPlainObject(item)) ***REMOVED***
      item = ***REMOVED***
        id: item,
        text: item
      ***REMOVED***;
    ***REMOVED***

    item = $.extend(***REMOVED******REMOVED***, ***REMOVED***
      text: ''
    ***REMOVED***, item);

    var defaults = ***REMOVED***
      selected: false,
      disabled: false
    ***REMOVED***;

    if (item.id != null) ***REMOVED***
      item.id = item.id.toString();
    ***REMOVED***

    if (item.text != null) ***REMOVED***
      item.text = item.text.toString();
    ***REMOVED***

    if (item._resultId == null && item.id && this.container != null) ***REMOVED***
      item._resultId = this.generateResultId(this.container, item);
    ***REMOVED***

    return $.extend(***REMOVED******REMOVED***, defaults, item);
  ***REMOVED***;

  SelectAdapter.prototype.matches = function (params, data) ***REMOVED***
    var matcher = this.options.get('matcher');

    return matcher(params, data);
  ***REMOVED***;

  return SelectAdapter;
***REMOVED***);

S2.define('select2/data/array',[
  './select',
  '../utils',
  'jquery'
], function (SelectAdapter, Utils, $) ***REMOVED***
  function ArrayAdapter ($element, options) ***REMOVED***
    var data = options.get('data') || [];

    ArrayAdapter.__super__.constructor.call(this, $element, options);

    this.addOptions(this.convertToOptions(data));
  ***REMOVED***

  Utils.Extend(ArrayAdapter, SelectAdapter);

  ArrayAdapter.prototype.select = function (data) ***REMOVED***
    var $option = this.$element.find('option').filter(function (i, elm) ***REMOVED***
      return elm.value == data.id.toString();
    ***REMOVED***);

    if ($option.length === 0) ***REMOVED***
      $option = this.option(data);

      this.addOptions($option);
    ***REMOVED***

    ArrayAdapter.__super__.select.call(this, data);
  ***REMOVED***;

  ArrayAdapter.prototype.convertToOptions = function (data) ***REMOVED***
    var self = this;

    var $existing = this.$element.find('option');
    var existingIds = $existing.map(function () ***REMOVED***
      return self.item($(this)).id;
    ***REMOVED***).get();

    var $options = [];

    // Filter out all items except for the one passed in the argument
    function onlyItem (item) ***REMOVED***
      return function () ***REMOVED***
        return $(this).val() == item.id;
      ***REMOVED***;
    ***REMOVED***

    for (var d = 0; d < data.length; d++) ***REMOVED***
      var item = this._normalizeItem(data[d]);

      // Skip items which were pre-loaded, only merge the data
      if ($.inArray(item.id, existingIds) >= 0) ***REMOVED***
        var $existingOption = $existing.filter(onlyItem(item));

        var existingData = this.item($existingOption);
        var newData = $.extend(true, ***REMOVED******REMOVED***, item, existingData);

        var $newOption = this.option(newData);

        $existingOption.replaceWith($newOption);

        continue;
      ***REMOVED***

      var $option = this.option(item);

      if (item.children) ***REMOVED***
        var $children = this.convertToOptions(item.children);

        Utils.appendMany($option, $children);
      ***REMOVED***

      $options.push($option);
    ***REMOVED***

    return $options;
  ***REMOVED***;

  return ArrayAdapter;
***REMOVED***);

S2.define('select2/data/ajax',[
  './array',
  '../utils',
  'jquery'
], function (ArrayAdapter, Utils, $) ***REMOVED***
  function AjaxAdapter ($element, options) ***REMOVED***
    this.ajaxOptions = this._applyDefaults(options.get('ajax'));

    if (this.ajaxOptions.processResults != null) ***REMOVED***
      this.processResults = this.ajaxOptions.processResults;
    ***REMOVED***

    AjaxAdapter.__super__.constructor.call(this, $element, options);
  ***REMOVED***

  Utils.Extend(AjaxAdapter, ArrayAdapter);

  AjaxAdapter.prototype._applyDefaults = function (options) ***REMOVED***
    var defaults = ***REMOVED***
      data: function (params) ***REMOVED***
        return $.extend(***REMOVED******REMOVED***, params, ***REMOVED***
          q: params.term
        ***REMOVED***);
      ***REMOVED***,
      transport: function (params, success, failure) ***REMOVED***
        var $request = $.ajax(params);

        $request.then(success);
        $request.fail(failure);

        return $request;
      ***REMOVED***
    ***REMOVED***;

    return $.extend(***REMOVED******REMOVED***, defaults, options, true);
  ***REMOVED***;

  AjaxAdapter.prototype.processResults = function (results) ***REMOVED***
    return results;
  ***REMOVED***;

  AjaxAdapter.prototype.query = function (params, callback) ***REMOVED***
    var matches = [];
    var self = this;

    if (this._request != null) ***REMOVED***
      // JSONP requests cannot always be aborted
      if ($.isFunction(this._request.abort)) ***REMOVED***
        this._request.abort();
      ***REMOVED***

      this._request = null;
    ***REMOVED***

    var options = $.extend(***REMOVED***
      type: 'GET'
    ***REMOVED***, this.ajaxOptions);

    if (typeof options.url === 'function') ***REMOVED***
      options.url = options.url.call(this.$element, params);
    ***REMOVED***

    if (typeof options.data === 'function') ***REMOVED***
      options.data = options.data.call(this.$element, params);
    ***REMOVED***

    function request () ***REMOVED***
      var $request = options.transport(options, function (data) ***REMOVED***
        var results = self.processResults(data, params);

        if (self.options.get('debug') && window.console && console.error) ***REMOVED***
          // Check to make sure that the response included a `results` key.
          if (!results || !results.results || !$.isArray(results.results)) ***REMOVED***
            console.error(
              'Select2: The AJAX results did not return an array in the ' +
              '`results` key of the response.'
            );
          ***REMOVED***
        ***REMOVED***

        callback(results);
      ***REMOVED***, function () ***REMOVED***
        // Attempt to detect if a request was aborted
        // Only works if the transport exposes a status property
        if ($request.status && $request.status === '0') ***REMOVED***
          return;
        ***REMOVED***

        self.trigger('results:message', ***REMOVED***
          message: 'errorLoading'
        ***REMOVED***);
      ***REMOVED***);

      self._request = $request;
    ***REMOVED***

    if (this.ajaxOptions.delay && params.term != null) ***REMOVED***
      if (this._queryTimeout) ***REMOVED***
        window.clearTimeout(this._queryTimeout);
      ***REMOVED***

      this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
    ***REMOVED*** else ***REMOVED***
      request();
    ***REMOVED***
  ***REMOVED***;

  return AjaxAdapter;
***REMOVED***);

S2.define('select2/data/tags',[
  'jquery'
], function ($) ***REMOVED***
  function Tags (decorated, $element, options) ***REMOVED***
    var tags = options.get('tags');

    var createTag = options.get('createTag');

    if (createTag !== undefined) ***REMOVED***
      this.createTag = createTag;
    ***REMOVED***

    var insertTag = options.get('insertTag');

    if (insertTag !== undefined) ***REMOVED***
        this.insertTag = insertTag;
    ***REMOVED***

    decorated.call(this, $element, options);

    if ($.isArray(tags)) ***REMOVED***
      for (var t = 0; t < tags.length; t++) ***REMOVED***
        var tag = tags[t];
        var item = this._normalizeItem(tag);

        var $option = this.option(item);

        this.$element.append($option);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

  Tags.prototype.query = function (decorated, params, callback) ***REMOVED***
    var self = this;

    this._removeOldTags();

    if (params.term == null || params.page != null) ***REMOVED***
      decorated.call(this, params, callback);
      return;
    ***REMOVED***

    function wrapper (obj, child) ***REMOVED***
      var data = obj.results;

      for (var i = 0; i < data.length; i++) ***REMOVED***
        var option = data[i];

        var checkChildren = (
          option.children != null &&
          !wrapper(***REMOVED***
            results: option.children
          ***REMOVED***, true)
        );

        var checkText = option.text === params.term;

        if (checkText || checkChildren) ***REMOVED***
          if (child) ***REMOVED***
            return false;
          ***REMOVED***

          obj.data = data;
          callback(obj);

          return;
        ***REMOVED***
      ***REMOVED***

      if (child) ***REMOVED***
        return true;
      ***REMOVED***

      var tag = self.createTag(params);

      if (tag != null) ***REMOVED***
        var $option = self.option(tag);
        $option.attr('data-select2-tag', true);

        self.addOptions([$option]);

        self.insertTag(data, tag);
      ***REMOVED***

      obj.results = data;

      callback(obj);
    ***REMOVED***

    decorated.call(this, params, wrapper);
  ***REMOVED***;

  Tags.prototype.createTag = function (decorated, params) ***REMOVED***
    var term = $.trim(params.term);

    if (term === '') ***REMOVED***
      return null;
    ***REMOVED***

    return ***REMOVED***
      id: term,
      text: term
    ***REMOVED***;
  ***REMOVED***;

  Tags.prototype.insertTag = function (_, data, tag) ***REMOVED***
    data.unshift(tag);
  ***REMOVED***;

  Tags.prototype._removeOldTags = function (_) ***REMOVED***
    var tag = this._lastTag;

    var $options = this.$element.find('option[data-select2-tag]');

    $options.each(function () ***REMOVED***
      if (this.selected) ***REMOVED***
        return;
      ***REMOVED***

      $(this).remove();
    ***REMOVED***);
  ***REMOVED***;

  return Tags;
***REMOVED***);

S2.define('select2/data/tokenizer',[
  'jquery'
], function ($) ***REMOVED***
  function Tokenizer (decorated, $element, options) ***REMOVED***
    var tokenizer = options.get('tokenizer');

    if (tokenizer !== undefined) ***REMOVED***
      this.tokenizer = tokenizer;
    ***REMOVED***

    decorated.call(this, $element, options);
  ***REMOVED***

  Tokenizer.prototype.bind = function (decorated, container, $container) ***REMOVED***
    decorated.call(this, container, $container);

    this.$search =  container.dropdown.$search || container.selection.$search ||
      $container.find('.select2-search__field');
  ***REMOVED***;

  Tokenizer.prototype.query = function (decorated, params, callback) ***REMOVED***
    var self = this;

    function createAndSelect (data) ***REMOVED***
      // Normalize the data object so we can use it for checks
      var item = self._normalizeItem(data);

      // Check if the data object already exists as a tag
      // Select it if it doesn't
      var $existingOptions = self.$element.find('option').filter(function () ***REMOVED***
        return $(this).val() === item.id;
      ***REMOVED***);

      // If an existing option wasn't found for it, create the option
      if (!$existingOptions.length) ***REMOVED***
        var $option = self.option(item);
        $option.attr('data-select2-tag', true);

        self._removeOldTags();
        self.addOptions([$option]);
      ***REMOVED***

      // Select the item, now that we know there is an option for it
      select(item);
    ***REMOVED***

    function select (data) ***REMOVED***
      self.trigger('select', ***REMOVED***
        data: data
      ***REMOVED***);
    ***REMOVED***

    params.term = params.term || '';

    var tokenData = this.tokenizer(params, this.options, createAndSelect);

    if (tokenData.term !== params.term) ***REMOVED***
      // Replace the search term if we have the search box
      if (this.$search.length) ***REMOVED***
        this.$search.val(tokenData.term);
        this.$search.focus();
      ***REMOVED***

      params.term = tokenData.term;
    ***REMOVED***

    decorated.call(this, params, callback);
  ***REMOVED***;

  Tokenizer.prototype.tokenizer = function (_, params, options, callback) ***REMOVED***
    var separators = options.get('tokenSeparators') || [];
    var term = params.term;
    var i = 0;

    var createTag = this.createTag || function (params) ***REMOVED***
      return ***REMOVED***
        id: params.term,
        text: params.term
      ***REMOVED***;
    ***REMOVED***;

    while (i < term.length) ***REMOVED***
      var termChar = term[i];

      if ($.inArray(termChar, separators) === -1) ***REMOVED***
        i++;

        continue;
      ***REMOVED***

      var part = term.substr(0, i);
      var partParams = $.extend(***REMOVED******REMOVED***, params, ***REMOVED***
        term: part
      ***REMOVED***);

      var data = createTag(partParams);

      if (data == null) ***REMOVED***
        i++;
        continue;
      ***REMOVED***

      callback(data);

      // Reset the term to not include the tokenized portion
      term = term.substr(i + 1) || '';
      i = 0;
    ***REMOVED***

    return ***REMOVED***
      term: term
    ***REMOVED***;
  ***REMOVED***;

  return Tokenizer;
***REMOVED***);

S2.define('select2/data/minimumInputLength',[

], function () ***REMOVED***
  function MinimumInputLength (decorated, $e, options) ***REMOVED***
    this.minimumInputLength = options.get('minimumInputLength');

    decorated.call(this, $e, options);
  ***REMOVED***

  MinimumInputLength.prototype.query = function (decorated, params, callback) ***REMOVED***
    params.term = params.term || '';

    if (params.term.length < this.minimumInputLength) ***REMOVED***
      this.trigger('results:message', ***REMOVED***
        message: 'inputTooShort',
        args: ***REMOVED***
          minimum: this.minimumInputLength,
          input: params.term,
          params: params
        ***REMOVED***
      ***REMOVED***);

      return;
    ***REMOVED***

    decorated.call(this, params, callback);
  ***REMOVED***;

  return MinimumInputLength;
***REMOVED***);

S2.define('select2/data/maximumInputLength',[

], function () ***REMOVED***
  function MaximumInputLength (decorated, $e, options) ***REMOVED***
    this.maximumInputLength = options.get('maximumInputLength');

    decorated.call(this, $e, options);
  ***REMOVED***

  MaximumInputLength.prototype.query = function (decorated, params, callback) ***REMOVED***
    params.term = params.term || '';

    if (this.maximumInputLength > 0 &&
        params.term.length > this.maximumInputLength) ***REMOVED***
      this.trigger('results:message', ***REMOVED***
        message: 'inputTooLong',
        args: ***REMOVED***
          maximum: this.maximumInputLength,
          input: params.term,
          params: params
        ***REMOVED***
      ***REMOVED***);

      return;
    ***REMOVED***

    decorated.call(this, params, callback);
  ***REMOVED***;

  return MaximumInputLength;
***REMOVED***);

S2.define('select2/data/maximumSelectionLength',[

], function ()***REMOVED***
  function MaximumSelectionLength (decorated, $e, options) ***REMOVED***
    this.maximumSelectionLength = options.get('maximumSelectionLength');

    decorated.call(this, $e, options);
  ***REMOVED***

  MaximumSelectionLength.prototype.query =
    function (decorated, params, callback) ***REMOVED***
      var self = this;

      this.current(function (currentData) ***REMOVED***
        var count = currentData != null ? currentData.length : 0;
        if (self.maximumSelectionLength > 0 &&
          count >= self.maximumSelectionLength) ***REMOVED***
          self.trigger('results:message', ***REMOVED***
            message: 'maximumSelected',
            args: ***REMOVED***
              maximum: self.maximumSelectionLength
            ***REMOVED***
          ***REMOVED***);
          return;
        ***REMOVED***
        decorated.call(self, params, callback);
      ***REMOVED***);
  ***REMOVED***;

  return MaximumSelectionLength;
***REMOVED***);

S2.define('select2/dropdown',[
  'jquery',
  './utils'
], function ($, Utils) ***REMOVED***
  function Dropdown ($element, options) ***REMOVED***
    this.$element = $element;
    this.options = options;

    Dropdown.__super__.constructor.call(this);
  ***REMOVED***

  Utils.Extend(Dropdown, Utils.Observable);

  Dropdown.prototype.render = function () ***REMOVED***
    var $dropdown = $(
      '<span class="select2-dropdown">' +
        '<span class="select2-results"></span>' +
      '</span>'
    );

    $dropdown.attr('dir', this.options.get('dir'));

    this.$dropdown = $dropdown;

    return $dropdown;
  ***REMOVED***;

  Dropdown.prototype.bind = function () ***REMOVED***
    // Should be implemented in subclasses
  ***REMOVED***;

  Dropdown.prototype.position = function ($dropdown, $container) ***REMOVED***
    // Should be implmented in subclasses
  ***REMOVED***;

  Dropdown.prototype.destroy = function () ***REMOVED***
    // Remove the dropdown from the DOM
    this.$dropdown.remove();
  ***REMOVED***;

  return Dropdown;
***REMOVED***);

S2.define('select2/dropdown/search',[
  'jquery',
  '../utils'
], function ($, Utils) ***REMOVED***
  function Search () ***REMOVED*** ***REMOVED***

  Search.prototype.render = function (decorated) ***REMOVED***
    var $rendered = decorated.call(this);

    var $search = $(
      '<span class="select2-search select2-search--dropdown">' +
        '<input class="select2-search__field" type="search" tabindex="-1"' +
        ' autocomplete="off" autocorrect="off" autocapitalize="off"' +
        ' spellcheck="false" role="textbox" />' +
      '</span>'
    );

    this.$searchContainer = $search;
    this.$search = $search.find('input');

    $rendered.prepend($search);

    return $rendered;
  ***REMOVED***;

  Search.prototype.bind = function (decorated, container, $container) ***REMOVED***
    var self = this;

    decorated.call(this, container, $container);

    this.$search.on('keydown', function (evt) ***REMOVED***
      self.trigger('keypress', evt);

      self._keyUpPrevented = evt.isDefaultPrevented();
    ***REMOVED***);

    // Workaround for browsers which do not support the `input` event
    // This will prevent double-triggering of events for browsers which support
    // both the `keyup` and `input` events.
    this.$search.on('input', function (evt) ***REMOVED***
      // Unbind the duplicated `keyup` event
      $(this).off('keyup');
    ***REMOVED***);

    this.$search.on('keyup input', function (evt) ***REMOVED***
      self.handleSearch(evt);
    ***REMOVED***);

    container.on('open', function () ***REMOVED***
      self.$search.attr('tabindex', 0);

      self.$search.focus();

      window.setTimeout(function () ***REMOVED***
        self.$search.focus();
      ***REMOVED***, 0);
    ***REMOVED***);

    container.on('close', function () ***REMOVED***
      self.$search.attr('tabindex', -1);

      self.$search.val('');
    ***REMOVED***);

    container.on('focus', function () ***REMOVED***
      if (container.isOpen()) ***REMOVED***
        self.$search.focus();
      ***REMOVED***
    ***REMOVED***);

    container.on('results:all', function (params) ***REMOVED***
      if (params.query.term == null || params.query.term === '') ***REMOVED***
        var showSearch = self.showSearch(params);

        if (showSearch) ***REMOVED***
          self.$searchContainer.removeClass('select2-search--hide');
        ***REMOVED*** else ***REMOVED***
          self.$searchContainer.addClass('select2-search--hide');
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***;

  Search.prototype.handleSearch = function (evt) ***REMOVED***
    if (!this._keyUpPrevented) ***REMOVED***
      var input = this.$search.val();

      this.trigger('query', ***REMOVED***
        term: input
      ***REMOVED***);
    ***REMOVED***

    this._keyUpPrevented = false;
  ***REMOVED***;

  Search.prototype.showSearch = function (_, params) ***REMOVED***
    return true;
  ***REMOVED***;

  return Search;
***REMOVED***);

S2.define('select2/dropdown/hidePlaceholder',[

], function () ***REMOVED***
  function HidePlaceholder (decorated, $element, options, dataAdapter) ***REMOVED***
    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

    decorated.call(this, $element, options, dataAdapter);
  ***REMOVED***

  HidePlaceholder.prototype.append = function (decorated, data) ***REMOVED***
    data.results = this.removePlaceholder(data.results);

    decorated.call(this, data);
  ***REMOVED***;

  HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) ***REMOVED***
    if (typeof placeholder === 'string') ***REMOVED***
      placeholder = ***REMOVED***
        id: '',
        text: placeholder
      ***REMOVED***;
    ***REMOVED***

    return placeholder;
  ***REMOVED***;

  HidePlaceholder.prototype.removePlaceholder = function (_, data) ***REMOVED***
    var modifiedData = data.slice(0);

    for (var d = data.length - 1; d >= 0; d--) ***REMOVED***
      var item = data[d];

      if (this.placeholder.id === item.id) ***REMOVED***
        modifiedData.splice(d, 1);
      ***REMOVED***
    ***REMOVED***

    return modifiedData;
  ***REMOVED***;

  return HidePlaceholder;
***REMOVED***);

S2.define('select2/dropdown/infiniteScroll',[
  'jquery'
], function ($) ***REMOVED***
  function InfiniteScroll (decorated, $element, options, dataAdapter) ***REMOVED***
    this.lastParams = ***REMOVED******REMOVED***;

    decorated.call(this, $element, options, dataAdapter);

    this.$loadingMore = this.createLoadingMore();
    this.loading = false;
  ***REMOVED***

  InfiniteScroll.prototype.append = function (decorated, data) ***REMOVED***
    this.$loadingMore.remove();
    this.loading = false;

    decorated.call(this, data);

    if (this.showLoadingMore(data)) ***REMOVED***
      this.$results.append(this.$loadingMore);
    ***REMOVED***
  ***REMOVED***;

  InfiniteScroll.prototype.bind = function (decorated, container, $container) ***REMOVED***
    var self = this;

    decorated.call(this, container, $container);

    container.on('query', function (params) ***REMOVED***
      self.lastParams = params;
      self.loading = true;
    ***REMOVED***);

    container.on('query:append', function (params) ***REMOVED***
      self.lastParams = params;
      self.loading = true;
    ***REMOVED***);

    this.$results.on('scroll', function () ***REMOVED***
      var isLoadMoreVisible = $.contains(
        document.documentElement,
        self.$loadingMore[0]
      );

      if (self.loading || !isLoadMoreVisible) ***REMOVED***
        return;
      ***REMOVED***

      var currentOffset = self.$results.offset().top +
        self.$results.outerHeight(false);
      var loadingMoreOffset = self.$loadingMore.offset().top +
        self.$loadingMore.outerHeight(false);

      if (currentOffset + 50 >= loadingMoreOffset) ***REMOVED***
        self.loadMore();
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***;

  InfiniteScroll.prototype.loadMore = function () ***REMOVED***
    this.loading = true;

    var params = $.extend(***REMOVED******REMOVED***, ***REMOVED***page: 1***REMOVED***, this.lastParams);

    params.page++;

    this.trigger('query:append', params);
  ***REMOVED***;

  InfiniteScroll.prototype.showLoadingMore = function (_, data) ***REMOVED***
    return data.pagination && data.pagination.more;
  ***REMOVED***;

  InfiniteScroll.prototype.createLoadingMore = function () ***REMOVED***
    var $option = $(
      '<li ' +
      'class="select2-results__option select2-results__option--load-more"' +
      'role="treeitem" aria-disabled="true"></li>'
    );

    var message = this.options.get('translations').get('loadingMore');

    $option.html(message(this.lastParams));

    return $option;
  ***REMOVED***;

  return InfiniteScroll;
***REMOVED***);

S2.define('select2/dropdown/attachBody',[
  'jquery',
  '../utils'
], function ($, Utils) ***REMOVED***
  function AttachBody (decorated, $element, options) ***REMOVED***
    this.$dropdownParent = options.get('dropdownParent') || $(document.body);

    decorated.call(this, $element, options);
  ***REMOVED***

  AttachBody.prototype.bind = function (decorated, container, $container) ***REMOVED***
    var self = this;

    var setupResultsEvents = false;

    decorated.call(this, container, $container);

    container.on('open', function () ***REMOVED***
      self._showDropdown();
      self._attachPositioningHandler(container);

      if (!setupResultsEvents) ***REMOVED***
        setupResultsEvents = true;

        container.on('results:all', function () ***REMOVED***
          self._positionDropdown();
          self._resizeDropdown();
        ***REMOVED***);

        container.on('results:append', function () ***REMOVED***
          self._positionDropdown();
          self._resizeDropdown();
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***);

    container.on('close', function () ***REMOVED***
      self._hideDropdown();
      self._detachPositioningHandler(container);
    ***REMOVED***);

    this.$dropdownContainer.on('mousedown', function (evt) ***REMOVED***
      evt.stopPropagation();
    ***REMOVED***);
  ***REMOVED***;

  AttachBody.prototype.destroy = function (decorated) ***REMOVED***
    decorated.call(this);

    this.$dropdownContainer.remove();
  ***REMOVED***;

  AttachBody.prototype.position = function (decorated, $dropdown, $container) ***REMOVED***
    // Clone all of the container classes
    $dropdown.attr('class', $container.attr('class'));

    $dropdown.removeClass('select2');
    $dropdown.addClass('select2-container--open');

    $dropdown.css(***REMOVED***
      position: 'absolute',
      top: -999999
    ***REMOVED***);

    this.$container = $container;
  ***REMOVED***;

  AttachBody.prototype.render = function (decorated) ***REMOVED***
    var $container = $('<span></span>');

    var $dropdown = decorated.call(this);
    $container.append($dropdown);

    this.$dropdownContainer = $container;

    return $container;
  ***REMOVED***;

  AttachBody.prototype._hideDropdown = function (decorated) ***REMOVED***
    this.$dropdownContainer.detach();
  ***REMOVED***;

  AttachBody.prototype._attachPositioningHandler =
      function (decorated, container) ***REMOVED***
    var self = this;

    var scrollEvent = 'scroll.select2.' + container.id;
    var resizeEvent = 'resize.select2.' + container.id;
    var orientationEvent = 'orientationchange.select2.' + container.id;

    var $watchers = this.$container.parents().filter(Utils.hasScroll);
    $watchers.each(function () ***REMOVED***
      $(this).data('select2-scroll-position', ***REMOVED***
        x: $(this).scrollLeft(),
        y: $(this).scrollTop()
      ***REMOVED***);
    ***REMOVED***);

    $watchers.on(scrollEvent, function (ev) ***REMOVED***
      var position = $(this).data('select2-scroll-position');
      $(this).scrollTop(position.y);
    ***REMOVED***);

    $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent,
      function (e) ***REMOVED***
      self._positionDropdown();
      self._resizeDropdown();
    ***REMOVED***);
  ***REMOVED***;

  AttachBody.prototype._detachPositioningHandler =
      function (decorated, container) ***REMOVED***
    var scrollEvent = 'scroll.select2.' + container.id;
    var resizeEvent = 'resize.select2.' + container.id;
    var orientationEvent = 'orientationchange.select2.' + container.id;

    var $watchers = this.$container.parents().filter(Utils.hasScroll);
    $watchers.off(scrollEvent);

    $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
  ***REMOVED***;

  AttachBody.prototype._positionDropdown = function () ***REMOVED***
    var $window = $(window);

    var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
    var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

    var newDirection = null;

    var offset = this.$container.offset();

    offset.bottom = offset.top + this.$container.outerHeight(false);

    var container = ***REMOVED***
      height: this.$container.outerHeight(false)
    ***REMOVED***;

    container.top = offset.top;
    container.bottom = offset.top + container.height;

    var dropdown = ***REMOVED***
      height: this.$dropdown.outerHeight(false)
    ***REMOVED***;

    var viewport = ***REMOVED***
      top: $window.scrollTop(),
      bottom: $window.scrollTop() + $window.height()
    ***REMOVED***;

    var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
    var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

    var css = ***REMOVED***
      left: offset.left,
      top: container.bottom
    ***REMOVED***;

    // Determine what the parent element is to use for calciulating the offset
    var $offsetParent = this.$dropdownParent;

    // For statically positoned elements, we need to get the element
    // that is determining the offset
    if ($offsetParent.css('position') === 'static') ***REMOVED***
      $offsetParent = $offsetParent.offsetParent();
    ***REMOVED***

    var parentOffset = $offsetParent.offset();

    css.top -= parentOffset.top;
    css.left -= parentOffset.left;

    if (!isCurrentlyAbove && !isCurrentlyBelow) ***REMOVED***
      newDirection = 'below';
    ***REMOVED***

    if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) ***REMOVED***
      newDirection = 'above';
    ***REMOVED*** else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) ***REMOVED***
      newDirection = 'below';
    ***REMOVED***

    if (newDirection == 'above' ||
      (isCurrentlyAbove && newDirection !== 'below')) ***REMOVED***
      css.top = container.top - parentOffset.top - dropdown.height;
    ***REMOVED***

    if (newDirection != null) ***REMOVED***
      this.$dropdown
        .removeClass('select2-dropdown--below select2-dropdown--above')
        .addClass('select2-dropdown--' + newDirection);
      this.$container
        .removeClass('select2-container--below select2-container--above')
        .addClass('select2-container--' + newDirection);
    ***REMOVED***

    this.$dropdownContainer.css(css);
  ***REMOVED***;

  AttachBody.prototype._resizeDropdown = function () ***REMOVED***
    var css = ***REMOVED***
      width: this.$container.outerWidth(false) + 'px'
    ***REMOVED***;

    if (this.options.get('dropdownAutoWidth')) ***REMOVED***
      css.minWidth = css.width;
      css.position = 'relative';
      css.width = 'auto';
    ***REMOVED***

    this.$dropdown.css(css);
  ***REMOVED***;

  AttachBody.prototype._showDropdown = function (decorated) ***REMOVED***
    this.$dropdownContainer.appendTo(this.$dropdownParent);

    this._positionDropdown();
    this._resizeDropdown();
  ***REMOVED***;

  return AttachBody;
***REMOVED***);

S2.define('select2/dropdown/minimumResultsForSearch',[

], function () ***REMOVED***
  function countResults (data) ***REMOVED***
    var count = 0;

    for (var d = 0; d < data.length; d++) ***REMOVED***
      var item = data[d];

      if (item.children) ***REMOVED***
        count += countResults(item.children);
      ***REMOVED*** else ***REMOVED***
        count++;
      ***REMOVED***
    ***REMOVED***

    return count;
  ***REMOVED***

  function MinimumResultsForSearch (decorated, $element, options, dataAdapter) ***REMOVED***
    this.minimumResultsForSearch = options.get('minimumResultsForSearch');

    if (this.minimumResultsForSearch < 0) ***REMOVED***
      this.minimumResultsForSearch = Infinity;
    ***REMOVED***

    decorated.call(this, $element, options, dataAdapter);
  ***REMOVED***

  MinimumResultsForSearch.prototype.showSearch = function (decorated, params) ***REMOVED***
    if (countResults(params.data.results) < this.minimumResultsForSearch) ***REMOVED***
      return false;
    ***REMOVED***

    return decorated.call(this, params);
  ***REMOVED***;

  return MinimumResultsForSearch;
***REMOVED***);

S2.define('select2/dropdown/selectOnClose',[

], function () ***REMOVED***
  function SelectOnClose () ***REMOVED*** ***REMOVED***

  SelectOnClose.prototype.bind = function (decorated, container, $container) ***REMOVED***
    var self = this;

    decorated.call(this, container, $container);

    container.on('close', function (params) ***REMOVED***
      self._handleSelectOnClose(params);
    ***REMOVED***);
  ***REMOVED***;

  SelectOnClose.prototype._handleSelectOnClose = function (_, params) ***REMOVED***
    if (params && params.originalSelect2Event != null) ***REMOVED***
      var event = params.originalSelect2Event;

      // Don't select an item if the close event was triggered from a select or
      // unselect event
      if (event._type === 'select' || event._type === 'unselect') ***REMOVED***
        return;
      ***REMOVED***
    ***REMOVED***

    var $highlightedResults = this.getHighlightedResults();

    // Only select highlighted results
    if ($highlightedResults.length < 1) ***REMOVED***
      return;
    ***REMOVED***

    var data = $highlightedResults.data('data');

    // Don't re-select already selected resulte
    if (
      (data.element != null && data.element.selected) ||
      (data.element == null && data.selected)
    ) ***REMOVED***
      return;
    ***REMOVED***

    this.trigger('select', ***REMOVED***
        data: data
    ***REMOVED***);
  ***REMOVED***;

  return SelectOnClose;
***REMOVED***);

S2.define('select2/dropdown/closeOnSelect',[

], function () ***REMOVED***
  function CloseOnSelect () ***REMOVED*** ***REMOVED***

  CloseOnSelect.prototype.bind = function (decorated, container, $container) ***REMOVED***
    var self = this;

    decorated.call(this, container, $container);

    container.on('select', function (evt) ***REMOVED***
      self._selectTriggered(evt);
    ***REMOVED***);

    container.on('unselect', function (evt) ***REMOVED***
      self._selectTriggered(evt);
    ***REMOVED***);
  ***REMOVED***;

  CloseOnSelect.prototype._selectTriggered = function (_, evt) ***REMOVED***
    var originalEvent = evt.originalEvent;

    // Don't close if the control key is being held
    if (originalEvent && originalEvent.ctrlKey) ***REMOVED***
      return;
    ***REMOVED***

    this.trigger('close', ***REMOVED***
      originalEvent: originalEvent,
      originalSelect2Event: evt
    ***REMOVED***);
  ***REMOVED***;

  return CloseOnSelect;
***REMOVED***);

S2.define('select2/i18n/en',[],function () ***REMOVED***
  // English
  return ***REMOVED***
    errorLoading: function () ***REMOVED***
      return 'The results could not be loaded.';
    ***REMOVED***,
    inputTooLong: function (args) ***REMOVED***
      var overChars = args.input.length - args.maximum;

      var message = 'Please delete ' + overChars + ' character';

      if (overChars != 1) ***REMOVED***
        message += 's';
      ***REMOVED***

      return message;
    ***REMOVED***,
    inputTooShort: function (args) ***REMOVED***
      var remainingChars = args.minimum - args.input.length;

      var message = 'Please enter ' + remainingChars + ' or more characters';

      return message;
    ***REMOVED***,
    loadingMore: function () ***REMOVED***
      return 'Loading more results…';
    ***REMOVED***,
    maximumSelected: function (args) ***REMOVED***
      var message = 'You can only select ' + args.maximum + ' item';

      if (args.maximum != 1) ***REMOVED***
        message += 's';
      ***REMOVED***

      return message;
    ***REMOVED***,
    noResults: function () ***REMOVED***
      return 'No results found';
    ***REMOVED***,
    searching: function () ***REMOVED***
      return 'Searching…';
    ***REMOVED***
  ***REMOVED***;
***REMOVED***);

S2.define('select2/defaults',[
  'jquery',
  'require',

  './results',

  './selection/single',
  './selection/multiple',
  './selection/placeholder',
  './selection/allowClear',
  './selection/search',
  './selection/eventRelay',

  './utils',
  './translation',
  './diacritics',

  './data/select',
  './data/array',
  './data/ajax',
  './data/tags',
  './data/tokenizer',
  './data/minimumInputLength',
  './data/maximumInputLength',
  './data/maximumSelectionLength',

  './dropdown',
  './dropdown/search',
  './dropdown/hidePlaceholder',
  './dropdown/infiniteScroll',
  './dropdown/attachBody',
  './dropdown/minimumResultsForSearch',
  './dropdown/selectOnClose',
  './dropdown/closeOnSelect',

  './i18n/en'
], function ($, require,

             ResultsList,

             SingleSelection, MultipleSelection, Placeholder, AllowClear,
             SelectionSearch, EventRelay,

             Utils, Translation, DIACRITICS,

             SelectData, ArrayData, AjaxData, Tags, Tokenizer,
             MinimumInputLength, MaximumInputLength, MaximumSelectionLength,

             Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll,
             AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect,

             EnglishTranslation) ***REMOVED***
  function Defaults () ***REMOVED***
    this.reset();
  ***REMOVED***

  Defaults.prototype.apply = function (options) ***REMOVED***
    options = $.extend(true, ***REMOVED******REMOVED***, this.defaults, options);

    if (options.dataAdapter == null) ***REMOVED***
      if (options.ajax != null) ***REMOVED***
        options.dataAdapter = AjaxData;
      ***REMOVED*** else if (options.data != null) ***REMOVED***
        options.dataAdapter = ArrayData;
      ***REMOVED*** else ***REMOVED***
        options.dataAdapter = SelectData;
      ***REMOVED***

      if (options.minimumInputLength > 0) ***REMOVED***
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MinimumInputLength
        );
      ***REMOVED***

      if (options.maximumInputLength > 0) ***REMOVED***
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MaximumInputLength
        );
      ***REMOVED***

      if (options.maximumSelectionLength > 0) ***REMOVED***
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MaximumSelectionLength
        );
      ***REMOVED***

      if (options.tags) ***REMOVED***
        options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
      ***REMOVED***

      if (options.tokenSeparators != null || options.tokenizer != null) ***REMOVED***
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          Tokenizer
        );
      ***REMOVED***

      if (options.query != null) ***REMOVED***
        var Query = require(options.amdBase + 'compat/query');

        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          Query
        );
      ***REMOVED***

      if (options.initSelection != null) ***REMOVED***
        var InitSelection = require(options.amdBase + 'compat/initSelection');

        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          InitSelection
        );
      ***REMOVED***
    ***REMOVED***

    if (options.resultsAdapter == null) ***REMOVED***
      options.resultsAdapter = ResultsList;

      if (options.ajax != null) ***REMOVED***
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          InfiniteScroll
        );
      ***REMOVED***

      if (options.placeholder != null) ***REMOVED***
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          HidePlaceholder
        );
      ***REMOVED***

      if (options.selectOnClose) ***REMOVED***
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          SelectOnClose
        );
      ***REMOVED***
    ***REMOVED***

    if (options.dropdownAdapter == null) ***REMOVED***
      if (options.multiple) ***REMOVED***
        options.dropdownAdapter = Dropdown;
      ***REMOVED*** else ***REMOVED***
        var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);

        options.dropdownAdapter = SearchableDropdown;
      ***REMOVED***

      if (options.minimumResultsForSearch !== 0) ***REMOVED***
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          MinimumResultsForSearch
        );
      ***REMOVED***

      if (options.closeOnSelect) ***REMOVED***
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          CloseOnSelect
        );
      ***REMOVED***

      if (
        options.dropdownCssClass != null ||
        options.dropdownCss != null ||
        options.adaptDropdownCssClass != null
      ) ***REMOVED***
        var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');

        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          DropdownCSS
        );
      ***REMOVED***

      options.dropdownAdapter = Utils.Decorate(
        options.dropdownAdapter,
        AttachBody
      );
    ***REMOVED***

    if (options.selectionAdapter == null) ***REMOVED***
      if (options.multiple) ***REMOVED***
        options.selectionAdapter = MultipleSelection;
      ***REMOVED*** else ***REMOVED***
        options.selectionAdapter = SingleSelection;
      ***REMOVED***

      // Add the placeholder mixin if a placeholder was specified
      if (options.placeholder != null) ***REMOVED***
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          Placeholder
        );
      ***REMOVED***

      if (options.allowClear) ***REMOVED***
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          AllowClear
        );
      ***REMOVED***

      if (options.multiple) ***REMOVED***
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          SelectionSearch
        );
      ***REMOVED***

      if (
        options.containerCssClass != null ||
        options.containerCss != null ||
        options.adaptContainerCssClass != null
      ) ***REMOVED***
        var ContainerCSS = require(options.amdBase + 'compat/containerCss');

        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          ContainerCSS
        );
      ***REMOVED***

      options.selectionAdapter = Utils.Decorate(
        options.selectionAdapter,
        EventRelay
      );
    ***REMOVED***

    if (typeof options.language === 'string') ***REMOVED***
      // Check if the language is specified with a region
      if (options.language.indexOf('-') > 0) ***REMOVED***
        // Extract the region information if it is included
        var languageParts = options.language.split('-');
        var baseLanguage = languageParts[0];

        options.language = [options.language, baseLanguage];
      ***REMOVED*** else ***REMOVED***
        options.language = [options.language];
      ***REMOVED***
    ***REMOVED***

    if ($.isArray(options.language)) ***REMOVED***
      var languages = new Translation();
      options.language.push('en');

      var languageNames = options.language;

      for (var l = 0; l < languageNames.length; l++) ***REMOVED***
        var name = languageNames[l];
        var language = ***REMOVED******REMOVED***;

        try ***REMOVED***
          // Try to load it with the original name
          language = Translation.loadPath(name);
        ***REMOVED*** catch (e) ***REMOVED***
          try ***REMOVED***
            // If we couldn't load it, check if it wasn't the full path
            name = this.defaults.amdLanguageBase + name;
            language = Translation.loadPath(name);
          ***REMOVED*** catch (ex) ***REMOVED***
            // The translation could not be loaded at all. Sometimes this is
            // because of a configuration problem, other times this can be
            // because of how Select2 helps load all possible translation files.
            if (options.debug && window.console && console.warn) ***REMOVED***
              console.warn(
                'Select2: The language file for "' + name + '" could not be ' +
                'automatically loaded. A fallback will be used instead.'
              );
            ***REMOVED***

            continue;
          ***REMOVED***
        ***REMOVED***

        languages.extend(language);
      ***REMOVED***

      options.translations = languages;
    ***REMOVED*** else ***REMOVED***
      var baseTranslation = Translation.loadPath(
        this.defaults.amdLanguageBase + 'en'
      );
      var customTranslation = new Translation(options.language);

      customTranslation.extend(baseTranslation);

      options.translations = customTranslation;
    ***REMOVED***

    return options;
  ***REMOVED***;

  Defaults.prototype.reset = function () ***REMOVED***
    function stripDiacritics (text) ***REMOVED***
      // Used 'uni range + named function' from http://jsperf.com/diacritics/18
      function match(a) ***REMOVED***
        return DIACRITICS[a] || a;
      ***REMOVED***

      return text.replace(/[^\u0000-\u007E]/g, match);
    ***REMOVED***

    function matcher (params, data) ***REMOVED***
      // Always return the object if there is nothing to compare
      if ($.trim(params.term) === '') ***REMOVED***
        return data;
      ***REMOVED***

      // Do a recursive check for options with children
      if (data.children && data.children.length > 0) ***REMOVED***
        // Clone the data object if there are children
        // This is required as we modify the object to remove any non-matches
        var match = $.extend(true, ***REMOVED******REMOVED***, data);

        // Check each child of the option
        for (var c = data.children.length - 1; c >= 0; c--) ***REMOVED***
          var child = data.children[c];

          var matches = matcher(params, child);

          // If there wasn't a match, remove the object in the array
          if (matches == null) ***REMOVED***
            match.children.splice(c, 1);
          ***REMOVED***
        ***REMOVED***

        // If any children matched, return the new object
        if (match.children.length > 0) ***REMOVED***
          return match;
        ***REMOVED***

        // If there were no matching children, check just the plain object
        return matcher(params, match);
      ***REMOVED***

      var original = stripDiacritics(data.text).toUpperCase();
      var term = stripDiacritics(params.term).toUpperCase();

      // Check if the text contains the term
      if (original.indexOf(term) > -1) ***REMOVED***
        return data;
      ***REMOVED***

      // If it doesn't contain the term, don't return anything
      return null;
    ***REMOVED***

    this.defaults = ***REMOVED***
      amdBase: './',
      amdLanguageBase: './i18n/',
      closeOnSelect: true,
      debug: false,
      dropdownAutoWidth: false,
      escapeMarkup: Utils.escapeMarkup,
      language: EnglishTranslation,
      matcher: matcher,
      minimumInputLength: 0,
      maximumInputLength: 0,
      maximumSelectionLength: 0,
      minimumResultsForSearch: 0,
      selectOnClose: false,
      sorter: function (data) ***REMOVED***
        return data;
      ***REMOVED***,
      templateResult: function (result) ***REMOVED***
        return result.text;
      ***REMOVED***,
      templateSelection: function (selection) ***REMOVED***
        return selection.text;
      ***REMOVED***,
      theme: 'default',
      width: 'resolve'
    ***REMOVED***;
  ***REMOVED***;

  Defaults.prototype.set = function (key, value) ***REMOVED***
    var camelKey = $.camelCase(key);

    var data = ***REMOVED******REMOVED***;
    data[camelKey] = value;

    var convertedData = Utils._convertData(data);

    $.extend(this.defaults, convertedData);
  ***REMOVED***;

  var defaults = new Defaults();

  return defaults;
***REMOVED***);

S2.define('select2/options',[
  'require',
  'jquery',
  './defaults',
  './utils'
], function (require, $, Defaults, Utils) ***REMOVED***
  function Options (options, $element) ***REMOVED***
    this.options = options;

    if ($element != null) ***REMOVED***
      this.fromElement($element);
    ***REMOVED***

    this.options = Defaults.apply(this.options);

    if ($element && $element.is('input')) ***REMOVED***
      var InputCompat = require(this.get('amdBase') + 'compat/inputData');

      this.options.dataAdapter = Utils.Decorate(
        this.options.dataAdapter,
        InputCompat
      );
    ***REMOVED***
  ***REMOVED***

  Options.prototype.fromElement = function ($e) ***REMOVED***
    var excludedData = ['select2'];

    if (this.options.multiple == null) ***REMOVED***
      this.options.multiple = $e.prop('multiple');
    ***REMOVED***

    if (this.options.disabled == null) ***REMOVED***
      this.options.disabled = $e.prop('disabled');
    ***REMOVED***

    if (this.options.language == null) ***REMOVED***
      if ($e.prop('lang')) ***REMOVED***
        this.options.language = $e.prop('lang').toLowerCase();
      ***REMOVED*** else if ($e.closest('[lang]').prop('lang')) ***REMOVED***
        this.options.language = $e.closest('[lang]').prop('lang');
      ***REMOVED***
    ***REMOVED***

    if (this.options.dir == null) ***REMOVED***
      if ($e.prop('dir')) ***REMOVED***
        this.options.dir = $e.prop('dir');
      ***REMOVED*** else if ($e.closest('[dir]').prop('dir')) ***REMOVED***
        this.options.dir = $e.closest('[dir]').prop('dir');
      ***REMOVED*** else ***REMOVED***
        this.options.dir = 'ltr';
      ***REMOVED***
    ***REMOVED***

    $e.prop('disabled', this.options.disabled);
    $e.prop('multiple', this.options.multiple);

    if ($e.data('select2Tags')) ***REMOVED***
      if (this.options.debug && window.console && console.warn) ***REMOVED***
        console.warn(
          'Select2: The `data-select2-tags` attribute has been changed to ' +
          'use the `data-data` and `data-tags="true"` attributes and will be ' +
          'removed in future versions of Select2.'
        );
      ***REMOVED***

      $e.data('data', $e.data('select2Tags'));
      $e.data('tags', true);
    ***REMOVED***

    if ($e.data('ajaxUrl')) ***REMOVED***
      if (this.options.debug && window.console && console.warn) ***REMOVED***
        console.warn(
          'Select2: The `data-ajax-url` attribute has been changed to ' +
          '`data-ajax--url` and support for the old attribute will be removed' +
          ' in future versions of Select2.'
        );
      ***REMOVED***

      $e.attr('ajax--url', $e.data('ajaxUrl'));
      $e.data('ajax--url', $e.data('ajaxUrl'));
    ***REMOVED***

    var dataset = ***REMOVED******REMOVED***;

    // Prefer the element's `dataset` attribute if it exists
    // jQuery 1.x does not correctly handle data attributes with multiple dashes
    if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) ***REMOVED***
      dataset = $.extend(true, ***REMOVED******REMOVED***, $e[0].dataset, $e.data());
    ***REMOVED*** else ***REMOVED***
      dataset = $e.data();
    ***REMOVED***

    var data = $.extend(true, ***REMOVED******REMOVED***, dataset);

    data = Utils._convertData(data);

    for (var key in data) ***REMOVED***
      if ($.inArray(key, excludedData) > -1) ***REMOVED***
        continue;
      ***REMOVED***

      if ($.isPlainObject(this.options[key])) ***REMOVED***
        $.extend(this.options[key], data[key]);
      ***REMOVED*** else ***REMOVED***
        this.options[key] = data[key];
      ***REMOVED***
    ***REMOVED***

    return this;
  ***REMOVED***;

  Options.prototype.get = function (key) ***REMOVED***
    return this.options[key];
  ***REMOVED***;

  Options.prototype.set = function (key, val) ***REMOVED***
    this.options[key] = val;
  ***REMOVED***;

  return Options;
***REMOVED***);

S2.define('select2/core',[
  'jquery',
  './options',
  './utils',
  './keys'
], function ($, Options, Utils, KEYS) ***REMOVED***
  var Select2 = function ($element, options) ***REMOVED***
    if ($element.data('select2') != null) ***REMOVED***
      $element.data('select2').destroy();
    ***REMOVED***

    this.$element = $element;

    this.id = this._generateId($element);

    options = options || ***REMOVED******REMOVED***;

    this.options = new Options(options, $element);

    Select2.__super__.constructor.call(this);

    // Set up the tabindex

    var tabindex = $element.attr('tabindex') || 0;
    $element.data('old-tabindex', tabindex);
    $element.attr('tabindex', '-1');

    // Set up containers and adapters

    var DataAdapter = this.options.get('dataAdapter');
    this.dataAdapter = new DataAdapter($element, this.options);

    var $container = this.render();

    this._placeContainer($container);

    var SelectionAdapter = this.options.get('selectionAdapter');
    this.selection = new SelectionAdapter($element, this.options);
    this.$selection = this.selection.render();

    this.selection.position(this.$selection, $container);

    var DropdownAdapter = this.options.get('dropdownAdapter');
    this.dropdown = new DropdownAdapter($element, this.options);
    this.$dropdown = this.dropdown.render();

    this.dropdown.position(this.$dropdown, $container);

    var ResultsAdapter = this.options.get('resultsAdapter');
    this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
    this.$results = this.results.render();

    this.results.position(this.$results, this.$dropdown);

    // Bind events

    var self = this;

    // Bind the container to all of the adapters
    this._bindAdapters();

    // Register any DOM event handlers
    this._registerDomEvents();

    // Register any internal event handlers
    this._registerDataEvents();
    this._registerSelectionEvents();
    this._registerDropdownEvents();
    this._registerResultsEvents();
    this._registerEvents();

    // Set the initial state
    this.dataAdapter.current(function (initialData) ***REMOVED***
      self.trigger('selection:update', ***REMOVED***
        data: initialData
      ***REMOVED***);
    ***REMOVED***);

    // Hide the original select
    $element.addClass('select2-hidden-accessible');
    $element.attr('aria-hidden', 'true');

    // Synchronize any monitored attributes
    this._syncAttributes();

    $element.data('select2', this);
  ***REMOVED***;

  Utils.Extend(Select2, Utils.Observable);

  Select2.prototype._generateId = function ($element) ***REMOVED***
    var id = '';

    if ($element.attr('id') != null) ***REMOVED***
      id = $element.attr('id');
    ***REMOVED*** else if ($element.attr('name') != null) ***REMOVED***
      id = $element.attr('name') + '-' + Utils.generateChars(2);
    ***REMOVED*** else ***REMOVED***
      id = Utils.generateChars(4);
    ***REMOVED***

    id = id.replace(/(:|\.|\[|\]|,)/g, '');
    id = 'select2-' + id;

    return id;
  ***REMOVED***;

  Select2.prototype._placeContainer = function ($container) ***REMOVED***
    $container.insertAfter(this.$element);

    var width = this._resolveWidth(this.$element, this.options.get('width'));

    if (width != null) ***REMOVED***
      $container.css('width', width);
    ***REMOVED***
  ***REMOVED***;

  Select2.prototype._resolveWidth = function ($element, method) ***REMOVED***
    var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

    if (method == 'resolve') ***REMOVED***
      var styleWidth = this._resolveWidth($element, 'style');

      if (styleWidth != null) ***REMOVED***
        return styleWidth;
      ***REMOVED***

      return this._resolveWidth($element, 'element');
    ***REMOVED***

    if (method == 'element') ***REMOVED***
      var elementWidth = $element.outerWidth(false);

      if (elementWidth <= 0) ***REMOVED***
        return 'auto';
      ***REMOVED***

      return elementWidth + 'px';
    ***REMOVED***

    if (method == 'style') ***REMOVED***
      var style = $element.attr('style');

      if (typeof(style) !== 'string') ***REMOVED***
        return null;
      ***REMOVED***

      var attrs = style.split(';');

      for (var i = 0, l = attrs.length; i < l; i = i + 1) ***REMOVED***
        var attr = attrs[i].replace(/\s/g, '');
        var matches = attr.match(WIDTH);

        if (matches !== null && matches.length >= 1) ***REMOVED***
          return matches[1];
        ***REMOVED***
      ***REMOVED***

      return null;
    ***REMOVED***

    return method;
  ***REMOVED***;

  Select2.prototype._bindAdapters = function () ***REMOVED***
    this.dataAdapter.bind(this, this.$container);
    this.selection.bind(this, this.$container);

    this.dropdown.bind(this, this.$container);
    this.results.bind(this, this.$container);
  ***REMOVED***;

  Select2.prototype._registerDomEvents = function () ***REMOVED***
    var self = this;

    this.$element.on('change.select2', function () ***REMOVED***
      self.dataAdapter.current(function (data) ***REMOVED***
        self.trigger('selection:update', ***REMOVED***
          data: data
        ***REMOVED***);
      ***REMOVED***);
    ***REMOVED***);

    this.$element.on('focus.select2', function (evt) ***REMOVED***
      self.trigger('focus', evt);
    ***REMOVED***);

    this._syncA = Utils.bind(this._syncAttributes, this);
    this._syncS = Utils.bind(this._syncSubtree, this);

    if (this.$element[0].attachEvent) ***REMOVED***
      this.$element[0].attachEvent('onpropertychange', this._syncA);
    ***REMOVED***

    var observer = window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver
    ;

    if (observer != null) ***REMOVED***
      this._observer = new observer(function (mutations) ***REMOVED***
        $.each(mutations, self._syncA);
        $.each(mutations, self._syncS);
      ***REMOVED***);
      this._observer.observe(this.$element[0], ***REMOVED***
        attributes: true,
        childList: true,
        subtree: false
      ***REMOVED***);
    ***REMOVED*** else if (this.$element[0].addEventListener) ***REMOVED***
      this.$element[0].addEventListener(
        'DOMAttrModified',
        self._syncA,
        false
      );
      this.$element[0].addEventListener(
        'DOMNodeInserted',
        self._syncS,
        false
      );
      this.$element[0].addEventListener(
        'DOMNodeRemoved',
        self._syncS,
        false
      );
    ***REMOVED***
  ***REMOVED***;

  Select2.prototype._registerDataEvents = function () ***REMOVED***
    var self = this;

    this.dataAdapter.on('*', function (name, params) ***REMOVED***
      self.trigger(name, params);
    ***REMOVED***);
  ***REMOVED***;

  Select2.prototype._registerSelectionEvents = function () ***REMOVED***
    var self = this;
    var nonRelayEvents = ['toggle', 'focus'];

    this.selection.on('toggle', function () ***REMOVED***
      self.toggleDropdown();
    ***REMOVED***);

    this.selection.on('focus', function (params) ***REMOVED***
      self.focus(params);
    ***REMOVED***);

    this.selection.on('*', function (name, params) ***REMOVED***
      if ($.inArray(name, nonRelayEvents) !== -1) ***REMOVED***
        return;
      ***REMOVED***

      self.trigger(name, params);
    ***REMOVED***);
  ***REMOVED***;

  Select2.prototype._registerDropdownEvents = function () ***REMOVED***
    var self = this;

    this.dropdown.on('*', function (name, params) ***REMOVED***
      self.trigger(name, params);
    ***REMOVED***);
  ***REMOVED***;

  Select2.prototype._registerResultsEvents = function () ***REMOVED***
    var self = this;

    this.results.on('*', function (name, params) ***REMOVED***
      self.trigger(name, params);
    ***REMOVED***);
  ***REMOVED***;

  Select2.prototype._registerEvents = function () ***REMOVED***
    var self = this;

    this.on('open', function () ***REMOVED***
      self.$container.addClass('select2-container--open');
    ***REMOVED***);

    this.on('close', function () ***REMOVED***
      self.$container.removeClass('select2-container--open');
    ***REMOVED***);

    this.on('enable', function () ***REMOVED***
      self.$container.removeClass('select2-container--disabled');
    ***REMOVED***);

    this.on('disable', function () ***REMOVED***
      self.$container.addClass('select2-container--disabled');
    ***REMOVED***);

    this.on('blur', function () ***REMOVED***
      self.$container.removeClass('select2-container--focus');
    ***REMOVED***);

    this.on('query', function (params) ***REMOVED***
      if (!self.isOpen()) ***REMOVED***
        self.trigger('open', ***REMOVED******REMOVED***);
      ***REMOVED***

      this.dataAdapter.query(params, function (data) ***REMOVED***
        self.trigger('results:all', ***REMOVED***
          data: data,
          query: params
        ***REMOVED***);
      ***REMOVED***);
    ***REMOVED***);

    this.on('query:append', function (params) ***REMOVED***
      this.dataAdapter.query(params, function (data) ***REMOVED***
        self.trigger('results:append', ***REMOVED***
          data: data,
          query: params
        ***REMOVED***);
      ***REMOVED***);
    ***REMOVED***);

    this.on('keypress', function (evt) ***REMOVED***
      var key = evt.which;

      if (self.isOpen()) ***REMOVED***
        if (key === KEYS.ESC || key === KEYS.TAB ||
            (key === KEYS.UP && evt.altKey)) ***REMOVED***
          self.close();

          evt.preventDefault();
        ***REMOVED*** else if (key === KEYS.ENTER) ***REMOVED***
          self.trigger('results:select', ***REMOVED******REMOVED***);

          evt.preventDefault();
        ***REMOVED*** else if ((key === KEYS.SPACE && evt.ctrlKey)) ***REMOVED***
          self.trigger('results:toggle', ***REMOVED******REMOVED***);

          evt.preventDefault();
        ***REMOVED*** else if (key === KEYS.UP) ***REMOVED***
          self.trigger('results:previous', ***REMOVED******REMOVED***);

          evt.preventDefault();
        ***REMOVED*** else if (key === KEYS.DOWN) ***REMOVED***
          self.trigger('results:next', ***REMOVED******REMOVED***);

          evt.preventDefault();
        ***REMOVED***
      ***REMOVED*** else ***REMOVED***
        if (key === KEYS.ENTER || key === KEYS.SPACE ||
            (key === KEYS.DOWN && evt.altKey)) ***REMOVED***
          self.open();

          evt.preventDefault();
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***;

  Select2.prototype._syncAttributes = function () ***REMOVED***
    this.options.set('disabled', this.$element.prop('disabled'));

    if (this.options.get('disabled')) ***REMOVED***
      if (this.isOpen()) ***REMOVED***
        this.close();
      ***REMOVED***

      this.trigger('disable', ***REMOVED******REMOVED***);
    ***REMOVED*** else ***REMOVED***
      this.trigger('enable', ***REMOVED******REMOVED***);
    ***REMOVED***
  ***REMOVED***;

  Select2.prototype._syncSubtree = function (evt, mutations) ***REMOVED***
    var changed = false;
    var self = this;

    // Ignore any mutation events raised for elements that aren't options or
    // optgroups. This handles the case when the select element is destroyed
    if (
      evt && evt.target && (
        evt.target.nodeName !== 'OPTION' && evt.target.nodeName !== 'OPTGROUP'
      )
    ) ***REMOVED***
      return;
    ***REMOVED***

    if (!mutations) ***REMOVED***
      // If mutation events aren't supported, then we can only assume that the
      // change affected the selections
      changed = true;
    ***REMOVED*** else if (mutations.addedNodes && mutations.addedNodes.length > 0) ***REMOVED***
      for (var n = 0; n < mutations.addedNodes.length; n++) ***REMOVED***
        var node = mutations.addedNodes[n];

        if (node.selected) ***REMOVED***
          changed = true;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED*** else if (mutations.removedNodes && mutations.removedNodes.length > 0) ***REMOVED***
      changed = true;
    ***REMOVED***

    // Only re-pull the data if we think there is a change
    if (changed) ***REMOVED***
      this.dataAdapter.current(function (currentData) ***REMOVED***
        self.trigger('selection:update', ***REMOVED***
          data: currentData
        ***REMOVED***);
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***;

  /**
   * Override the trigger method to automatically trigger pre-events when
   * there are events that can be prevented.
   */
  Select2.prototype.trigger = function (name, args) ***REMOVED***
    var actualTrigger = Select2.__super__.trigger;
    var preTriggerMap = ***REMOVED***
      'open': 'opening',
      'close': 'closing',
      'select': 'selecting',
      'unselect': 'unselecting'
    ***REMOVED***;

    if (args === undefined) ***REMOVED***
      args = ***REMOVED******REMOVED***;
    ***REMOVED***

    if (name in preTriggerMap) ***REMOVED***
      var preTriggerName = preTriggerMap[name];
      var preTriggerArgs = ***REMOVED***
        prevented: false,
        name: name,
        args: args
      ***REMOVED***;

      actualTrigger.call(this, preTriggerName, preTriggerArgs);

      if (preTriggerArgs.prevented) ***REMOVED***
        args.prevented = true;

        return;
      ***REMOVED***
    ***REMOVED***

    actualTrigger.call(this, name, args);
  ***REMOVED***;

  Select2.prototype.toggleDropdown = function () ***REMOVED***
    if (this.options.get('disabled')) ***REMOVED***
      return;
    ***REMOVED***

    if (this.isOpen()) ***REMOVED***
      this.close();
    ***REMOVED*** else ***REMOVED***
      this.open();
    ***REMOVED***
  ***REMOVED***;

  Select2.prototype.open = function () ***REMOVED***
    if (this.isOpen()) ***REMOVED***
      return;
    ***REMOVED***

    this.trigger('query', ***REMOVED******REMOVED***);
  ***REMOVED***;

  Select2.prototype.close = function () ***REMOVED***
    if (!this.isOpen()) ***REMOVED***
      return;
    ***REMOVED***

    this.trigger('close', ***REMOVED******REMOVED***);
  ***REMOVED***;

  Select2.prototype.isOpen = function () ***REMOVED***
    return this.$container.hasClass('select2-container--open');
  ***REMOVED***;

  Select2.prototype.hasFocus = function () ***REMOVED***
    return this.$container.hasClass('select2-container--focus');
  ***REMOVED***;

  Select2.prototype.focus = function (data) ***REMOVED***
    // No need to re-trigger focus events if we are already focused
    if (this.hasFocus()) ***REMOVED***
      return;
    ***REMOVED***

    this.$container.addClass('select2-container--focus');
    this.trigger('focus', ***REMOVED******REMOVED***);
  ***REMOVED***;

  Select2.prototype.enable = function (args) ***REMOVED***
    if (this.options.get('debug') && window.console && console.warn) ***REMOVED***
      console.warn(
        'Select2: The `select2("enable")` method has been deprecated and will' +
        ' be removed in later Select2 versions. Use $element.prop("disabled")' +
        ' instead.'
      );
    ***REMOVED***

    if (args == null || args.length === 0) ***REMOVED***
      args = [true];
    ***REMOVED***

    var disabled = !args[0];

    this.$element.prop('disabled', disabled);
  ***REMOVED***;

  Select2.prototype.data = function () ***REMOVED***
    if (this.options.get('debug') &&
        arguments.length > 0 && window.console && console.warn) ***REMOVED***
      console.warn(
        'Select2: Data can no longer be set using `select2("data")`. You ' +
        'should consider setting the value instead using `$element.val()`.'
      );
    ***REMOVED***

    var data = [];

    this.dataAdapter.current(function (currentData) ***REMOVED***
      data = currentData;
    ***REMOVED***);

    return data;
  ***REMOVED***;

  Select2.prototype.val = function (args) ***REMOVED***
    if (this.options.get('debug') && window.console && console.warn) ***REMOVED***
      console.warn(
        'Select2: The `select2("val")` method has been deprecated and will be' +
        ' removed in later Select2 versions. Use $element.val() instead.'
      );
    ***REMOVED***

    if (args == null || args.length === 0) ***REMOVED***
      return this.$element.val();
    ***REMOVED***

    var newVal = args[0];

    if ($.isArray(newVal)) ***REMOVED***
      newVal = $.map(newVal, function (obj) ***REMOVED***
        return obj.toString();
      ***REMOVED***);
    ***REMOVED***

    this.$element.val(newVal).trigger('change');
  ***REMOVED***;

  Select2.prototype.destroy = function () ***REMOVED***
    this.$container.remove();

    if (this.$element[0].detachEvent) ***REMOVED***
      this.$element[0].detachEvent('onpropertychange', this._syncA);
    ***REMOVED***

    if (this._observer != null) ***REMOVED***
      this._observer.disconnect();
      this._observer = null;
    ***REMOVED*** else if (this.$element[0].removeEventListener) ***REMOVED***
      this.$element[0]
        .removeEventListener('DOMAttrModified', this._syncA, false);
      this.$element[0]
        .removeEventListener('DOMNodeInserted', this._syncS, false);
      this.$element[0]
        .removeEventListener('DOMNodeRemoved', this._syncS, false);
    ***REMOVED***

    this._syncA = null;
    this._syncS = null;

    this.$element.off('.select2');
    this.$element.attr('tabindex', this.$element.data('old-tabindex'));

    this.$element.removeClass('select2-hidden-accessible');
    this.$element.attr('aria-hidden', 'false');
    this.$element.removeData('select2');

    this.dataAdapter.destroy();
    this.selection.destroy();
    this.dropdown.destroy();
    this.results.destroy();

    this.dataAdapter = null;
    this.selection = null;
    this.dropdown = null;
    this.results = null;
  ***REMOVED***;

  Select2.prototype.render = function () ***REMOVED***
    var $container = $(
      '<span class="select2 select2-container">' +
        '<span class="selection"></span>' +
        '<span class="dropdown-wrapper" aria-hidden="true"></span>' +
      '</span>'
    );

    $container.attr('dir', this.options.get('dir'));

    this.$container = $container;

    this.$container.addClass('select2-container--' + this.options.get('theme'));

    $container.data('element', this.$element);

    return $container;
  ***REMOVED***;

  return Select2;
***REMOVED***);

S2.define('select2/compat/utils',[
  'jquery'
], function ($) ***REMOVED***
  function syncCssClasses ($dest, $src, adapter) ***REMOVED***
    var classes, replacements = [], adapted;

    classes = $.trim($dest.attr('class'));

    if (classes) ***REMOVED***
      classes = '' + classes; // for IE which returns object

      $(classes.split(/\s+/)).each(function () ***REMOVED***
        // Save all Select2 classes
        if (this.indexOf('select2-') === 0) ***REMOVED***
          replacements.push(this);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***

    classes = $.trim($src.attr('class'));

    if (classes) ***REMOVED***
      classes = '' + classes; // for IE which returns object

      $(classes.split(/\s+/)).each(function () ***REMOVED***
        // Only adapt non-Select2 classes
        if (this.indexOf('select2-') !== 0) ***REMOVED***
          adapted = adapter(this);

          if (adapted != null) ***REMOVED***
            replacements.push(adapted);
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***

    $dest.attr('class', replacements.join(' '));
  ***REMOVED***

  return ***REMOVED***
    syncCssClasses: syncCssClasses
  ***REMOVED***;
***REMOVED***);

S2.define('select2/compat/containerCss',[
  'jquery',
  './utils'
], function ($, CompatUtils) ***REMOVED***
  // No-op CSS adapter that discards all classes by default
  function _containerAdapter (clazz) ***REMOVED***
    return null;
  ***REMOVED***

  function ContainerCSS () ***REMOVED*** ***REMOVED***

  ContainerCSS.prototype.render = function (decorated) ***REMOVED***
    var $container = decorated.call(this);

    var containerCssClass = this.options.get('containerCssClass') || '';

    if ($.isFunction(containerCssClass)) ***REMOVED***
      containerCssClass = containerCssClass(this.$element);
    ***REMOVED***

    var containerCssAdapter = this.options.get('adaptContainerCssClass');
    containerCssAdapter = containerCssAdapter || _containerAdapter;

    if (containerCssClass.indexOf(':all:') !== -1) ***REMOVED***
      containerCssClass = containerCssClass.replace(':all:', '');

      var _cssAdapter = containerCssAdapter;

      containerCssAdapter = function (clazz) ***REMOVED***
        var adapted = _cssAdapter(clazz);

        if (adapted != null) ***REMOVED***
          // Append the old one along with the adapted one
          return adapted + ' ' + clazz;
        ***REMOVED***

        return clazz;
      ***REMOVED***;
    ***REMOVED***

    var containerCss = this.options.get('containerCss') || ***REMOVED******REMOVED***;

    if ($.isFunction(containerCss)) ***REMOVED***
      containerCss = containerCss(this.$element);
    ***REMOVED***

    CompatUtils.syncCssClasses($container, this.$element, containerCssAdapter);

    $container.css(containerCss);
    $container.addClass(containerCssClass);

    return $container;
  ***REMOVED***;

  return ContainerCSS;
***REMOVED***);

S2.define('select2/compat/dropdownCss',[
  'jquery',
  './utils'
], function ($, CompatUtils) ***REMOVED***
  // No-op CSS adapter that discards all classes by default
  function _dropdownAdapter (clazz) ***REMOVED***
    return null;
  ***REMOVED***

  function DropdownCSS () ***REMOVED*** ***REMOVED***

  DropdownCSS.prototype.render = function (decorated) ***REMOVED***
    var $dropdown = decorated.call(this);

    var dropdownCssClass = this.options.get('dropdownCssClass') || '';

    if ($.isFunction(dropdownCssClass)) ***REMOVED***
      dropdownCssClass = dropdownCssClass(this.$element);
    ***REMOVED***

    var dropdownCssAdapter = this.options.get('adaptDropdownCssClass');
    dropdownCssAdapter = dropdownCssAdapter || _dropdownAdapter;

    if (dropdownCssClass.indexOf(':all:') !== -1) ***REMOVED***
      dropdownCssClass = dropdownCssClass.replace(':all:', '');

      var _cssAdapter = dropdownCssAdapter;

      dropdownCssAdapter = function (clazz) ***REMOVED***
        var adapted = _cssAdapter(clazz);

        if (adapted != null) ***REMOVED***
          // Append the old one along with the adapted one
          return adapted + ' ' + clazz;
        ***REMOVED***

        return clazz;
      ***REMOVED***;
    ***REMOVED***

    var dropdownCss = this.options.get('dropdownCss') || ***REMOVED******REMOVED***;

    if ($.isFunction(dropdownCss)) ***REMOVED***
      dropdownCss = dropdownCss(this.$element);
    ***REMOVED***

    CompatUtils.syncCssClasses($dropdown, this.$element, dropdownCssAdapter);

    $dropdown.css(dropdownCss);
    $dropdown.addClass(dropdownCssClass);

    return $dropdown;
  ***REMOVED***;

  return DropdownCSS;
***REMOVED***);

S2.define('select2/compat/initSelection',[
  'jquery'
], function ($) ***REMOVED***
  function InitSelection (decorated, $element, options) ***REMOVED***
    if (options.get('debug') && window.console && console.warn) ***REMOVED***
      console.warn(
        'Select2: The `initSelection` option has been deprecated in favor' +
        ' of a custom data adapter that overrides the `current` method. ' +
        'This method is now called multiple times instead of a single ' +
        'time when the instance is initialized. Support will be removed ' +
        'for the `initSelection` option in future versions of Select2'
      );
    ***REMOVED***

    this.initSelection = options.get('initSelection');
    this._isInitialized = false;

    decorated.call(this, $element, options);
  ***REMOVED***

  InitSelection.prototype.current = function (decorated, callback) ***REMOVED***
    var self = this;

    if (this._isInitialized) ***REMOVED***
      decorated.call(this, callback);

      return;
    ***REMOVED***

    this.initSelection.call(null, this.$element, function (data) ***REMOVED***
      self._isInitialized = true;

      if (!$.isArray(data)) ***REMOVED***
        data = [data];
      ***REMOVED***

      callback(data);
    ***REMOVED***);
  ***REMOVED***;

  return InitSelection;
***REMOVED***);

S2.define('select2/compat/inputData',[
  'jquery'
], function ($) ***REMOVED***
  function InputData (decorated, $element, options) ***REMOVED***
    this._currentData = [];
    this._valueSeparator = options.get('valueSeparator') || ',';

    if ($element.prop('type') === 'hidden') ***REMOVED***
      if (options.get('debug') && console && console.warn) ***REMOVED***
        console.warn(
          'Select2: Using a hidden input with Select2 is no longer ' +
          'supported and may stop working in the future. It is recommended ' +
          'to use a `<select>` element instead.'
        );
      ***REMOVED***
    ***REMOVED***

    decorated.call(this, $element, options);
  ***REMOVED***

  InputData.prototype.current = function (_, callback) ***REMOVED***
    function getSelected (data, selectedIds) ***REMOVED***
      var selected = [];

      if (data.selected || $.inArray(data.id, selectedIds) !== -1) ***REMOVED***
        data.selected = true;
        selected.push(data);
      ***REMOVED*** else ***REMOVED***
        data.selected = false;
      ***REMOVED***

      if (data.children) ***REMOVED***
        selected.push.apply(selected, getSelected(data.children, selectedIds));
      ***REMOVED***

      return selected;
    ***REMOVED***

    var selected = [];

    for (var d = 0; d < this._currentData.length; d++) ***REMOVED***
      var data = this._currentData[d];

      selected.push.apply(
        selected,
        getSelected(
          data,
          this.$element.val().split(
            this._valueSeparator
          )
        )
      );
    ***REMOVED***

    callback(selected);
  ***REMOVED***;

  InputData.prototype.select = function (_, data) ***REMOVED***
    if (!this.options.get('multiple')) ***REMOVED***
      this.current(function (allData) ***REMOVED***
        $.map(allData, function (data) ***REMOVED***
          data.selected = false;
        ***REMOVED***);
      ***REMOVED***);

      this.$element.val(data.id);
      this.$element.trigger('change');
    ***REMOVED*** else ***REMOVED***
      var value = this.$element.val();
      value += this._valueSeparator + data.id;

      this.$element.val(value);
      this.$element.trigger('change');
    ***REMOVED***
  ***REMOVED***;

  InputData.prototype.unselect = function (_, data) ***REMOVED***
    var self = this;

    data.selected = false;

    this.current(function (allData) ***REMOVED***
      var values = [];

      for (var d = 0; d < allData.length; d++) ***REMOVED***
        var item = allData[d];

        if (data.id == item.id) ***REMOVED***
          continue;
        ***REMOVED***

        values.push(item.id);
      ***REMOVED***

      self.$element.val(values.join(self._valueSeparator));
      self.$element.trigger('change');
    ***REMOVED***);
  ***REMOVED***;

  InputData.prototype.query = function (_, params, callback) ***REMOVED***
    var results = [];

    for (var d = 0; d < this._currentData.length; d++) ***REMOVED***
      var data = this._currentData[d];

      var matches = this.matches(params, data);

      if (matches !== null) ***REMOVED***
        results.push(matches);
      ***REMOVED***
    ***REMOVED***

    callback(***REMOVED***
      results: results
    ***REMOVED***);
  ***REMOVED***;

  InputData.prototype.addOptions = function (_, $options) ***REMOVED***
    var options = $.map($options, function ($option) ***REMOVED***
      return $.data($option[0], 'data');
    ***REMOVED***);

    this._currentData.push.apply(this._currentData, options);
  ***REMOVED***;

  return InputData;
***REMOVED***);

S2.define('select2/compat/matcher',[
  'jquery'
], function ($) ***REMOVED***
  function oldMatcher (matcher) ***REMOVED***
    function wrappedMatcher (params, data) ***REMOVED***
      var match = $.extend(true, ***REMOVED******REMOVED***, data);

      if (params.term == null || $.trim(params.term) === '') ***REMOVED***
        return match;
      ***REMOVED***

      if (data.children) ***REMOVED***
        for (var c = data.children.length - 1; c >= 0; c--) ***REMOVED***
          var child = data.children[c];

          // Check if the child object matches
          // The old matcher returned a boolean true or false
          var doesMatch = matcher(params.term, child.text, child);

          // If the child didn't match, pop it off
          if (!doesMatch) ***REMOVED***
            match.children.splice(c, 1);
          ***REMOVED***
        ***REMOVED***

        if (match.children.length > 0) ***REMOVED***
          return match;
        ***REMOVED***
      ***REMOVED***

      if (matcher(params.term, data.text, data)) ***REMOVED***
        return match;
      ***REMOVED***

      return null;
    ***REMOVED***

    return wrappedMatcher;
  ***REMOVED***

  return oldMatcher;
***REMOVED***);

S2.define('select2/compat/query',[

], function () ***REMOVED***
  function Query (decorated, $element, options) ***REMOVED***
    if (options.get('debug') && window.console && console.warn) ***REMOVED***
      console.warn(
        'Select2: The `query` option has been deprecated in favor of a ' +
        'custom data adapter that overrides the `query` method. Support ' +
        'will be removed for the `query` option in future versions of ' +
        'Select2.'
      );
    ***REMOVED***

    decorated.call(this, $element, options);
  ***REMOVED***

  Query.prototype.query = function (_, params, callback) ***REMOVED***
    params.callback = callback;

    var query = this.options.get('query');

    query.call(null, params);
  ***REMOVED***;

  return Query;
***REMOVED***);

S2.define('select2/dropdown/attachContainer',[

], function () ***REMOVED***
  function AttachContainer (decorated, $element, options) ***REMOVED***
    decorated.call(this, $element, options);
  ***REMOVED***

  AttachContainer.prototype.position =
    function (decorated, $dropdown, $container) ***REMOVED***
    var $dropdownContainer = $container.find('.dropdown-wrapper');
    $dropdownContainer.append($dropdown);

    $dropdown.addClass('select2-dropdown--below');
    $container.addClass('select2-container--below');
  ***REMOVED***;

  return AttachContainer;
***REMOVED***);

S2.define('select2/dropdown/stopPropagation',[

], function () ***REMOVED***
  function StopPropagation () ***REMOVED*** ***REMOVED***

  StopPropagation.prototype.bind = function (decorated, container, $container) ***REMOVED***
    decorated.call(this, container, $container);

    var stoppedEvents = [
    'blur',
    'change',
    'click',
    'dblclick',
    'focus',
    'focusin',
    'focusout',
    'input',
    'keydown',
    'keyup',
    'keypress',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseover',
    'mouseup',
    'search',
    'touchend',
    'touchstart'
    ];

    this.$dropdown.on(stoppedEvents.join(' '), function (evt) ***REMOVED***
      evt.stopPropagation();
    ***REMOVED***);
  ***REMOVED***;

  return StopPropagation;
***REMOVED***);

S2.define('select2/selection/stopPropagation',[

], function () ***REMOVED***
  function StopPropagation () ***REMOVED*** ***REMOVED***

  StopPropagation.prototype.bind = function (decorated, container, $container) ***REMOVED***
    decorated.call(this, container, $container);

    var stoppedEvents = [
      'blur',
      'change',
      'click',
      'dblclick',
      'focus',
      'focusin',
      'focusout',
      'input',
      'keydown',
      'keyup',
      'keypress',
      'mousedown',
      'mouseenter',
      'mouseleave',
      'mousemove',
      'mouseover',
      'mouseup',
      'search',
      'touchend',
      'touchstart'
    ];

    this.$selection.on(stoppedEvents.join(' '), function (evt) ***REMOVED***
      evt.stopPropagation();
    ***REMOVED***);
  ***REMOVED***;

  return StopPropagation;
***REMOVED***);

/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function (factory) ***REMOVED***
    if ( typeof S2.define === 'function' && S2.define.amd ) ***REMOVED***
        // AMD. Register as an anonymous module.
        S2.define('jquery-mousewheel',['jquery'], factory);
    ***REMOVED*** else if (typeof exports === 'object') ***REMOVED***
        // Node/CommonJS style for Browserify
        module.exports = factory;
    ***REMOVED*** else ***REMOVED***
        // Browser globals
        factory(jQuery);
    ***REMOVED***
***REMOVED***(function ($) ***REMOVED***

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) ***REMOVED***
        for ( var i = toFix.length; i; ) ***REMOVED***
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        ***REMOVED***
    ***REMOVED***

    var special = $.event.special.mousewheel = ***REMOVED***
        version: '3.1.12',

        setup: function() ***REMOVED***
            if ( this.addEventListener ) ***REMOVED***
                for ( var i = toBind.length; i; ) ***REMOVED***
                    this.addEventListener( toBind[--i], handler, false );
                ***REMOVED***
            ***REMOVED*** else ***REMOVED***
                this.onmousewheel = handler;
            ***REMOVED***
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        ***REMOVED***,

        teardown: function() ***REMOVED***
            if ( this.removeEventListener ) ***REMOVED***
                for ( var i = toBind.length; i; ) ***REMOVED***
                    this.removeEventListener( toBind[--i], handler, false );
                ***REMOVED***
            ***REMOVED*** else ***REMOVED***
                this.onmousewheel = null;
            ***REMOVED***
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        ***REMOVED***,

        getLineHeight: function(elem) ***REMOVED***
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) ***REMOVED***
                $parent = $('body');
            ***REMOVED***
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        ***REMOVED***,

        getPageHeight: function(elem) ***REMOVED***
            return $(elem).height();
        ***REMOVED***,

        settings: ***REMOVED***
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        ***REMOVED***
    ***REMOVED***;

    $.fn.extend(***REMOVED***
        mousewheel: function(fn) ***REMOVED***
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        ***REMOVED***,

        unmousewheel: function(fn) ***REMOVED***
            return this.unbind('mousewheel', fn);
        ***REMOVED***
    ***REMOVED***);


    function handler(event) ***REMOVED***
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) ***REMOVED*** deltaY = orgEvent.detail * -1;      ***REMOVED***
        if ( 'wheelDelta'  in orgEvent ) ***REMOVED*** deltaY = orgEvent.wheelDelta;       ***REMOVED***
        if ( 'wheelDeltaY' in orgEvent ) ***REMOVED*** deltaY = orgEvent.wheelDeltaY;      ***REMOVED***
        if ( 'wheelDeltaX' in orgEvent ) ***REMOVED*** deltaX = orgEvent.wheelDeltaX * -1; ***REMOVED***

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) ***REMOVED***
            deltaX = deltaY * -1;
            deltaY = 0;
        ***REMOVED***

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) ***REMOVED***
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        ***REMOVED***
        if ( 'deltaX' in orgEvent ) ***REMOVED***
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) ***REMOVED*** delta  = deltaX * -1; ***REMOVED***
        ***REMOVED***

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) ***REMOVED*** return; ***REMOVED***

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) ***REMOVED***
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        ***REMOVED*** else if ( orgEvent.deltaMode === 2 ) ***REMOVED***
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        ***REMOVED***

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) ***REMOVED***
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) ***REMOVED***
                lowestDelta /= 40;
            ***REMOVED***
        ***REMOVED***

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) ***REMOVED***
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        ***REMOVED***

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) ***REMOVED***
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        ***REMOVED***

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) ***REMOVED*** clearTimeout(nullLowestDeltaTimeout); ***REMOVED***
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    ***REMOVED***

    function nullLowestDelta() ***REMOVED***
        lowestDelta = null;
    ***REMOVED***

    function shouldAdjustOldDeltas(orgEvent, absDelta) ***REMOVED***
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    ***REMOVED***

***REMOVED***));

S2.define('jquery.select2',[
  'jquery',
  'jquery-mousewheel',

  './select2/core',
  './select2/defaults'
], function ($, _, Select2, Defaults) ***REMOVED***
  if ($.fn.select2 == null) ***REMOVED***
    // All methods that should return the element
    var thisMethods = ['open', 'close', 'destroy'];

    $.fn.select2 = function (options) ***REMOVED***
      options = options || ***REMOVED******REMOVED***;

      if (typeof options === 'object') ***REMOVED***
        this.each(function () ***REMOVED***
          var instanceOptions = $.extend(true, ***REMOVED******REMOVED***, options);

          var instance = new Select2($(this), instanceOptions);
        ***REMOVED***);

        return this;
      ***REMOVED*** else if (typeof options === 'string') ***REMOVED***
        var ret;
        var args = Array.prototype.slice.call(arguments, 1);

        this.each(function () ***REMOVED***
          var instance = $(this).data('select2');

          if (instance == null && window.console && console.error) ***REMOVED***
            console.error(
              'The select2(\'' + options + '\') method was called on an ' +
              'element that is not using Select2.'
            );
          ***REMOVED***

          ret = instance[options].apply(instance, args);
        ***REMOVED***);

        // Check if we should be returning `this`
        if ($.inArray(options, thisMethods) > -1) ***REMOVED***
          return this;
        ***REMOVED***

        return ret;
      ***REMOVED*** else ***REMOVED***
        throw new Error('Invalid arguments for Select2: ' + options);
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***

  if ($.fn.select2.defaults == null) ***REMOVED***
    $.fn.select2.defaults = Defaults;
  ***REMOVED***

  return Select2;
***REMOVED***);

  // Return the AMD loader configuration so it can be used outside of this file
  return ***REMOVED***
    define: S2.define,
    require: S2.require
  ***REMOVED***;
***REMOVED***());

  // Autoload the jQuery bindings
  // We know that all of the modules exist above this, so we're safe
  var select2 = S2.require('jquery.select2');

  // Hold the AMD module references on the jQuery function that was just loaded
  // This allows Select2 to use the internal loader outside of this file, such
  // as in the language files.
  jQuery.fn.select2.amd = S2;

  // Return the Select2 instance for anyone who is importing it.
  return select2;
***REMOVED***));
