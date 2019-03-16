/*!
 * URI.js - Mutating URLs
 *
 * Version: 1.8.3
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.com/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *   GPL v3 http://opensource.org/licenses/GPL-3.0
 *
 */
(function(root, factory) ***REMOVED***
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof exports === 'object') ***REMOVED***
    // Node
    module.exports = factory(require('./punycode'), require('./IPv6'), require('./SecondLevelDomains'));
  ***REMOVED*** else if (typeof define === 'function' && define.amd) ***REMOVED***
    // AMD. Register as an anonymous module.
    define(['./punycode', './IPv6', './SecondLevelDomains'], factory);
  ***REMOVED*** else ***REMOVED***
    // Browser globals (root is window)
    root.URI = factory(root.punycode, root.IPv6, root.SecondLevelDomains);
  ***REMOVED***
***REMOVED***(this, function(punycode, IPv6, SLD) ***REMOVED***
  "use strict";

  function URI(url, base) ***REMOVED***
    // Allow instantiation without the 'new' keyword
    if (!(this instanceof URI)) ***REMOVED***
      return new URI(url, base);
    ***REMOVED***
    if (url === undefined) ***REMOVED***
      if (typeof location !== 'undefined') ***REMOVED***
        url = location.href + "";
      ***REMOVED*** else ***REMOVED***
        url = "";
      ***REMOVED***
    ***REMOVED***
    this.href(url);
    // resolve to base according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#constructor
    if (base !== undefined) ***REMOVED***
      return this.absoluteTo(base);
    ***REMOVED***
    return this;
  ***REMOVED***;
  var p = URI.prototype;
  var hasOwn = Object.prototype.hasOwnProperty;

  function escapeRegEx(string) ***REMOVED***
    // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
    return string.replace(/([.*+?^=!:$***REMOVED******REMOVED***()|[\]\/\\])/g, '\\$1');
  ***REMOVED***

  function isArray(obj) ***REMOVED***
    return String(Object.prototype.toString.call(obj)) === "[object Array]";
  ***REMOVED***

  function filterArrayValues(data, value) ***REMOVED***
    var lookup = ***REMOVED******REMOVED***;
    var i, length;
    if (isArray(value)) ***REMOVED***
      for (i = 0, length = value.length; i < length; i++) ***REMOVED***
        lookup[value[i]] = true;
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
      lookup[value] = true;
    ***REMOVED***
    for (i = 0, length = data.length; i < length; i++) ***REMOVED***
      if (lookup[data[i]] !== undefined) ***REMOVED***
        data.splice(i, 1);
        length--;
        i--;
      ***REMOVED***
    ***REMOVED***
    return data;
  ***REMOVED***
  URI._parts = function() ***REMOVED***
    return ***REMOVED***
      protocol: null,
      username: null,
      password: null,
      hostname: null,
      urn: null,
      port: null,
      path: null,
      query: null,
      fragment: null,
      // state
      duplicateQueryParameters: URI.duplicateQueryParameters
    ***REMOVED***;
  ***REMOVED***;
  // state: allow duplicate query parameters (a=1&a=1)
  URI.duplicateQueryParameters = false;
  // static properties
  URI.protocol_expression = /^[a-z][a-z0-9-+-]*$/i;
  URI.idn_expression = /[^a-z0-9\.-]/i;
  URI.punycode_expression = /(xn--)/i;
  // well, 333.444.555.666 matches, but it sure ain't no IPv4 - do we care?
  URI.ip4_expression = /^\d***REMOVED***1,3***REMOVED***\.\d***REMOVED***1,3***REMOVED***\.\d***REMOVED***1,3***REMOVED***\.\d***REMOVED***1,3***REMOVED***$/;
  // credits to Rich Brown
  // source: http://forums.intermapper.com/viewtopic.php?p=1096#1096
  // specification: http://www.ietf.org/rfc/rfc4291.txt
  URI.ip6_expression = /^\s*((([0-9A-Fa-f]***REMOVED***1,4***REMOVED***:)***REMOVED***7***REMOVED***([0-9A-Fa-f]***REMOVED***1,4***REMOVED***|:))|(([0-9A-Fa-f]***REMOVED***1,4***REMOVED***:)***REMOVED***6***REMOVED***(:[0-9A-Fa-f]***REMOVED***1,4***REMOVED***|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d))***REMOVED***3***REMOVED***)|:))|(([0-9A-Fa-f]***REMOVED***1,4***REMOVED***:)***REMOVED***5***REMOVED***(((:[0-9A-Fa-f]***REMOVED***1,4***REMOVED***)***REMOVED***1,2***REMOVED***)|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d))***REMOVED***3***REMOVED***)|:))|(([0-9A-Fa-f]***REMOVED***1,4***REMOVED***:)***REMOVED***4***REMOVED***(((:[0-9A-Fa-f]***REMOVED***1,4***REMOVED***)***REMOVED***1,3***REMOVED***)|((:[0-9A-Fa-f]***REMOVED***1,4***REMOVED***)?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d))***REMOVED***3***REMOVED***))|:))|(([0-9A-Fa-f]***REMOVED***1,4***REMOVED***:)***REMOVED***3***REMOVED***(((:[0-9A-Fa-f]***REMOVED***1,4***REMOVED***)***REMOVED***1,4***REMOVED***)|((:[0-9A-Fa-f]***REMOVED***1,4***REMOVED***)***REMOVED***0,2***REMOVED***:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d))***REMOVED***3***REMOVED***))|:))|(([0-9A-Fa-f]***REMOVED***1,4***REMOVED***:)***REMOVED***2***REMOVED***(((:[0-9A-Fa-f]***REMOVED***1,4***REMOVED***)***REMOVED***1,5***REMOVED***)|((:[0-9A-Fa-f]***REMOVED***1,4***REMOVED***)***REMOVED***0,3***REMOVED***:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d))***REMOVED***3***REMOVED***))|:))|(([0-9A-Fa-f]***REMOVED***1,4***REMOVED***:)***REMOVED***1***REMOVED***(((:[0-9A-Fa-f]***REMOVED***1,4***REMOVED***)***REMOVED***1,6***REMOVED***)|((:[0-9A-Fa-f]***REMOVED***1,4***REMOVED***)***REMOVED***0,4***REMOVED***:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d))***REMOVED***3***REMOVED***))|:))|(:(((:[0-9A-Fa-f]***REMOVED***1,4***REMOVED***)***REMOVED***1,7***REMOVED***)|((:[0-9A-Fa-f]***REMOVED***1,4***REMOVED***)***REMOVED***0,5***REMOVED***:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d))***REMOVED***3***REMOVED***))|:)))(%.+)?\s*$/;
  // gruber revised expression - http://rodneyrehm.de/t/url-regex.html
  URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/***REMOVED***1,3***REMOVED***|[a-z0-9%])|www\d***REMOVED***0,3***REMOVED***[.]|[a-z0-9.\-]+[.][a-z]***REMOVED***2,4***REMOVED***\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]***REMOVED******REMOVED***;:'".,<>?«»“”‘’]))/ig;
  // http://www.iana.org/assignments/uri-schemes.html
  // http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports
  URI.defaultPorts = ***REMOVED***
    http: "80",
    https: "443",
    ftp: "21",
    gopher: "70",
    ws: "80",
    wss: "443"
  ***REMOVED***;
  // allowed hostname characters according to RFC 3986
  // ALPHA DIGIT "-" "." "_" "~" "!" "$" "&" "'" "(" ")" "*" "+" "," ";" "=" %encoded
  // I've never seen a (non-IDN) hostname other than: ALPHA DIGIT . -
  URI.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/;
  // encoding / decoding according to RFC3986

  function strictEncodeURIComponent(string) ***REMOVED***
    // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
    return encodeURIComponent(string).replace(/[!'()*]/g, escape).replace(/\*/g, "%2A");
  ***REMOVED***
  URI.encode = strictEncodeURIComponent;
  URI.decode = decodeURIComponent;
  URI.iso8859 = function() ***REMOVED***
    URI.encode = escape;
    URI.decode = unescape;
  ***REMOVED***;
  URI.unicode = function() ***REMOVED***
    URI.encode = strictEncodeURIComponent;
    URI.decode = decodeURIComponent;
  ***REMOVED***;
  URI.characters = ***REMOVED***
    pathname: ***REMOVED***
      encode: ***REMOVED***
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
        map: ***REMOVED***
          // -._~!'()*
          "%24": "$",
          "%26": "&",
          "%2B": "+",
          "%2C": ",",
          "%3B": ";",
          "%3D": "=",
          "%3A": ":",
          "%40": "@"
        ***REMOVED***
      ***REMOVED***,
      decode: ***REMOVED***
        expression: /[\/\?#]/g,
        map: ***REMOVED***
          "/": "%2F",
          "?": "%3F",
          "#": "%23"
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***,
    reserved: ***REMOVED***
      encode: ***REMOVED***
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
        map: ***REMOVED***
          // gen-delims
          "%3A": ":",
          "%2F": "/",
          "%3F": "?",
          "%23": "#",
          "%5B": "[",
          "%5D": "]",
          "%40": "@",
          // sub-delims
          "%21": "!",
          "%24": "$",
          "%26": "&",
          "%27": "'",
          "%28": "(",
          "%29": ")",
          "%2A": "*",
          "%2B": "+",
          "%2C": ",",
          "%3B": ";",
          "%3D": "="
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;
  URI.encodeQuery = function(string) ***REMOVED***
    return URI.encode(string + "").replace(/%20/g, '+');
  ***REMOVED***;
  URI.decodeQuery = function(string) ***REMOVED***
    return URI.decode((string + "").replace(/\+/g, '%20'));
  ***REMOVED***;
  URI.recodePath = function(string) ***REMOVED***
    var segments = (string + "").split('/');
    for (var i = 0, length = segments.length; i < length; i++) ***REMOVED***
      segments[i] = URI.encodePathSegment(URI.decode(segments[i]));
    ***REMOVED***
    return segments.join('/');
  ***REMOVED***;
  URI.decodePath = function(string) ***REMOVED***
    var segments = (string + "").split('/');
    for (var i = 0, length = segments.length; i < length; i++) ***REMOVED***
      segments[i] = URI.decodePathSegment(segments[i]);
    ***REMOVED***
    return segments.join('/');
  ***REMOVED***;
  // generate encode/decode path functions
  var _parts = ***REMOVED***
    'encode': 'encode',
    'decode': 'decode'
  ***REMOVED***;
  var _part;
  var generateAccessor = function(_group, _part) ***REMOVED***
    return function(string) ***REMOVED***
      return URI[_part](string + "").replace(URI.characters[_group][_part].expression, function(c) ***REMOVED***
        return URI.characters[_group][_part].map[c];
      ***REMOVED***);
    ***REMOVED***;
  ***REMOVED***;
  for (_part in _parts) ***REMOVED***
    URI[_part + "PathSegment"] = generateAccessor("pathname", _parts[_part]);
  ***REMOVED***
  URI.encodeReserved = generateAccessor("reserved", "encode");
  URI.parse = function(string, parts) ***REMOVED***
    var pos, t;
    if (!parts) ***REMOVED***
      parts = ***REMOVED******REMOVED***;
    ***REMOVED***
    // [protocol"://"[username[":"password]"@"]hostname[":"port]"/"?][path]["?"querystring]["#"fragment]
    // extract fragment
    pos = string.indexOf('#');
    if (pos > -1) ***REMOVED***
      // escaping?
      parts.fragment = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    ***REMOVED***
    // extract query
    pos = string.indexOf('?');
    if (pos > -1) ***REMOVED***
      // escaping?
      parts.query = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    ***REMOVED***
    // extract protocol
    if (string.substring(0, 2) === '//') ***REMOVED***
      // relative-scheme
      parts.protocol = '';
      string = string.substring(2);
      // extract "user:pass@host:port"
      string = URI.parseAuthority(string, parts);
    ***REMOVED*** else ***REMOVED***
      pos = string.indexOf(':');
      if (pos > -1) ***REMOVED***
        parts.protocol = string.substring(0, pos);
        if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) ***REMOVED***
          // : may be within the path
          parts.protocol = undefined;
        ***REMOVED*** else if (parts.protocol === 'file') ***REMOVED***
          // the file scheme: does not contain an authority
          string = string.substring(pos + 3);
        ***REMOVED*** else if (string.substring(pos + 1, pos + 3) === '//') ***REMOVED***
          string = string.substring(pos + 3);
          // extract "user:pass@host:port"
          string = URI.parseAuthority(string, parts);
        ***REMOVED*** else ***REMOVED***
          string = string.substring(pos + 1);
          parts.urn = true;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    // what's left must be the path
    parts.path = string;
    // and we're done
    return parts;
  ***REMOVED***;
  URI.parseHost = function(string, parts) ***REMOVED***
    // extract host:port
    var pos = string.indexOf('/');
    var bracketPos;
    var t;
    if (pos === -1) ***REMOVED***
      pos = string.length;
    ***REMOVED***
    if (string[0] === "[") ***REMOVED***
      // IPv6 host - http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6
      // I claim most client software breaks on IPv6 anyways. To simplify things, URI only accepts
      // IPv6+port in the format [2001:db8::1]:80 (for the time being)
      bracketPos = string.indexOf(']');
      parts.hostname = string.substring(1, bracketPos) || null;
      parts.port = string.substring(bracketPos + 2, pos) || null;
    ***REMOVED*** else if (string.indexOf(':') !== string.lastIndexOf(':')) ***REMOVED***
      // IPv6 host contains multiple colons - but no port
      // this notation is actually not allowed by RFC 3986, but we're a liberal parser
      parts.hostname = string.substring(0, pos) || null;
      parts.port = null;
    ***REMOVED*** else ***REMOVED***
      t = string.substring(0, pos).split(':');
      parts.hostname = t[0] || null;
      parts.port = t[1] || null;
    ***REMOVED***
    if (parts.hostname && string.substring(pos)[0] !== '/') ***REMOVED***
      pos++;
      string = "/" + string;
    ***REMOVED***
    return string.substring(pos) || '/';
  ***REMOVED***;
  URI.parseAuthority = function(string, parts) ***REMOVED***
    string = URI.parseUserinfo(string, parts);
    return URI.parseHost(string, parts);
  ***REMOVED***;
  URI.parseUserinfo = function(string, parts) ***REMOVED***
    // extract username:password
    var pos = string.indexOf('@');
    var firstSlash = string.indexOf('/');
    var t;
    // authority@ must come before /path
    if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) ***REMOVED***
      t = string.substring(0, pos).split(':');
      parts.username = t[0] ? URI.decode(t[0]) : null;
      t.shift();
      parts.password = t[0] ? URI.decode(t.join(':')) : null;
      string = string.substring(pos + 1);
    ***REMOVED*** else ***REMOVED***
      parts.username = null;
      parts.password = null;
    ***REMOVED***
    return string;
  ***REMOVED***;
  URI.parseQuery = function(string) ***REMOVED***
    if (!string) ***REMOVED***
      return ***REMOVED******REMOVED***;
    ***REMOVED***
    // throw out the funky business - "?"[name"="value"&"]+
    string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');
    if (!string) ***REMOVED***
      return ***REMOVED******REMOVED***;
    ***REMOVED***
    var items = ***REMOVED******REMOVED***;
    var splits = string.split('&');
    var length = splits.length;
    var v, name, value;
    for (var i = 0; i < length; i++) ***REMOVED***
      v = splits[i].split('=');
      name = URI.decodeQuery(v.shift());
      // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
      value = v.length ? URI.decodeQuery(v.join('=')) : null;
      if (items[name]) ***REMOVED***
        if (typeof items[name] === "string") ***REMOVED***
          items[name] = [items[name]];
        ***REMOVED***
        items[name].push(value);
      ***REMOVED*** else ***REMOVED***
        items[name] = value;
      ***REMOVED***
    ***REMOVED***
    return items;
  ***REMOVED***;
  URI.build = function(parts) ***REMOVED***
    var t = "";
    if (parts.protocol) ***REMOVED***
      t += parts.protocol + ":";
    ***REMOVED***
    if (!parts.urn && (t || parts.hostname)) ***REMOVED***
      t += '//';
    ***REMOVED***
    t += (URI.buildAuthority(parts) || '');
    if (typeof parts.path === "string") ***REMOVED***
      if (parts.path[0] !== '/' && typeof parts.hostname === "string") ***REMOVED***
        t += '/';
      ***REMOVED***
      t += parts.path;
    ***REMOVED***
    if (typeof parts.query === "string" && parts.query) ***REMOVED***
      t += '?' + parts.query;
    ***REMOVED***
    if (typeof parts.fragment === "string" && parts.fragment) ***REMOVED***
      t += '#' + parts.fragment;
    ***REMOVED***
    return t;
  ***REMOVED***;
  URI.buildHost = function(parts) ***REMOVED***
    var t = "";
    if (!parts.hostname) ***REMOVED***
      return "";
    ***REMOVED*** else if (URI.ip6_expression.test(parts.hostname)) ***REMOVED***
      if (parts.port) ***REMOVED***
        t += "[" + parts.hostname + "]:" + parts.port;
      ***REMOVED*** else ***REMOVED***
        // don't know if we should always wrap IPv6 in []
        // the RFC explicitly says SHOULD, not MUST.
        t += parts.hostname;
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
      t += parts.hostname;
      if (parts.port) ***REMOVED***
        t += ':' + parts.port;
      ***REMOVED***
    ***REMOVED***
    return t;
  ***REMOVED***;
  URI.buildAuthority = function(parts) ***REMOVED***
    return URI.buildUserinfo(parts) + URI.buildHost(parts);
  ***REMOVED***;
  URI.buildUserinfo = function(parts) ***REMOVED***
    var t = "";
    if (parts.username) ***REMOVED***
      t += URI.encode(parts.username);
      if (parts.password) ***REMOVED***
        t += ':' + URI.encode(parts.password);
      ***REMOVED***
      t += "@";
    ***REMOVED***
    return t;
  ***REMOVED***;
  URI.buildQuery = function(data, duplicates) ***REMOVED***
    // according to http://tools.ietf.org/html/rfc3986 or http://labs.apache.org/webarch/uri/rfc/rfc3986.html
    // being »-._~!$&'()*+,;=:@/?« %HEX and alnum are allowed
    // the RFC explicitly states ?/foo being a valid use case, no mention of parameter syntax!
    // URI.js treats the query string as being application/x-www-form-urlencoded
    // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type
    var t = "";
    var unique, key, i, length;
    for (key in data) ***REMOVED***
      if (hasOwn.call(data, key) && key) ***REMOVED***
        if (isArray(data[key])) ***REMOVED***
          unique = ***REMOVED******REMOVED***;
          for (i = 0, length = data[key].length; i < length; i++) ***REMOVED***
            if (data[key][i] !== undefined && unique[data[key][i] + ""] === undefined) ***REMOVED***
              t += "&" + URI.buildQueryParameter(key, data[key][i]);
              if (duplicates !== true) ***REMOVED***
                unique[data[key][i] + ""] = true;
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
        ***REMOVED*** else if (data[key] !== undefined) ***REMOVED***
          t += '&' + URI.buildQueryParameter(key, data[key]);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    return t.substring(1);
  ***REMOVED***;
  URI.buildQueryParameter = function(name, value) ***REMOVED***
    // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
    // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
    return URI.encodeQuery(name) + (value !== null ? "=" + URI.encodeQuery(value) : "");
  ***REMOVED***;
  URI.addQuery = function(data, name, value) ***REMOVED***
    if (typeof name === "object") ***REMOVED***
      for (var key in name) ***REMOVED***
        if (hasOwn.call(name, key)) ***REMOVED***
          URI.addQuery(data, key, name[key]);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED*** else if (typeof name === "string") ***REMOVED***
      if (data[name] === undefined) ***REMOVED***
        data[name] = value;
        return;
      ***REMOVED*** else if (typeof data[name] === "string") ***REMOVED***
        data[name] = [data[name]];
      ***REMOVED***
      if (!isArray(value)) ***REMOVED***
        value = [value];
      ***REMOVED***
      data[name] = data[name].concat(value);
    ***REMOVED*** else ***REMOVED***
      throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
    ***REMOVED***
  ***REMOVED***;
  URI.removeQuery = function(data, name, value) ***REMOVED***
    var i, length, key;
    if (isArray(name)) ***REMOVED***
      for (i = 0, length = name.length; i < length; i++) ***REMOVED***
        data[name[i]] = undefined;
      ***REMOVED***
    ***REMOVED*** else if (typeof name === "object") ***REMOVED***
      for (key in name) ***REMOVED***
        if (hasOwn.call(name, key)) ***REMOVED***
          URI.removeQuery(data, key, name[key]);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED*** else if (typeof name === "string") ***REMOVED***
      if (value !== undefined) ***REMOVED***
        if (data[name] === value) ***REMOVED***
          data[name] = undefined;
        ***REMOVED*** else if (isArray(data[name])) ***REMOVED***
          data[name] = filterArrayValues(data[name], value);
        ***REMOVED***
      ***REMOVED*** else ***REMOVED***
        data[name] = undefined;
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
      throw new TypeError("URI.addQuery() accepts an object, string as the first parameter");
    ***REMOVED***
  ***REMOVED***;
  URI.commonPath = function(one, two) ***REMOVED***
    var length = Math.min(one.length, two.length);
    var pos;
    // find first non-matching character
    for (pos = 0; pos < length; pos++) ***REMOVED***
      if (one[pos] !== two[pos]) ***REMOVED***
        pos--;
        break;
      ***REMOVED***
    ***REMOVED***
    if (pos < 1) ***REMOVED***
      return one[0] === two[0] && one[0] === '/' ? '/' : '';
    ***REMOVED***
    // revert to last /
    if (one[pos] !== '/') ***REMOVED***
      pos = one.substring(0, pos).lastIndexOf('/');
    ***REMOVED***
    return one.substring(0, pos + 1);
  ***REMOVED***;
  URI.withinString = function(string, callback) ***REMOVED***
    // expression used is "gruber revised" (@gruber v2) determined to be the best solution in
    // a regex sprint we did a couple of ages ago at
    // * http://mathiasbynens.be/demo/url-regex
    // * http://rodneyrehm.de/t/url-regex.html
    return string.replace(URI.find_uri_expression, callback);
  ***REMOVED***;
  URI.ensureValidHostname = function(v) ***REMOVED***
    // Theoretically URIs allow percent-encoding in Hostnames (according to RFC 3986)
    // they are not part of DNS and therefore ignored by URI.js
    if (v.match(URI.invalid_hostname_characters)) ***REMOVED***
      // test punycode
      if (!punycode) ***REMOVED***
        throw new TypeError("Hostname '" + v + "' contains characters other than [A-Z0-9.-] and Punycode.js is not available");
      ***REMOVED***
      if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) ***REMOVED***
        throw new TypeError("Hostname '" + v + "' contains characters other than [A-Z0-9.-]");
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;
  p.build = function(deferBuild) ***REMOVED***
    if (deferBuild === true) ***REMOVED***
      this._deferred_build = true;
    ***REMOVED*** else if (deferBuild === undefined || this._deferred_build) ***REMOVED***
      this._string = URI.build(this._parts);
      this._deferred_build = false;
    ***REMOVED***
    return this;
  ***REMOVED***;
  p.clone = function() ***REMOVED***
    return new URI(this);
  ***REMOVED***;
  p.valueOf = p.toString = function() ***REMOVED***
    return this.build(false)._string;
  ***REMOVED***;
  // generate simple accessors
  _parts = ***REMOVED***
    protocol: 'protocol',
    username: 'username',
    password: 'password',
    hostname: 'hostname',
    port: 'port'
  ***REMOVED***;
  generateAccessor = function(_part) ***REMOVED***
    return function(v, build) ***REMOVED***
      if (v === undefined) ***REMOVED***
        return this._parts[_part] || "";
      ***REMOVED*** else ***REMOVED***
        this._parts[_part] = v;
        this.build(!build);
        return this;
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***;
  for (_part in _parts) ***REMOVED***
    p[_part] = generateAccessor(_parts[_part]);
  ***REMOVED***
  // generate accessors with optionally prefixed input
  _parts = ***REMOVED***
    query: '?',
    fragment: '#'
  ***REMOVED***;
  generateAccessor = function(_part, _key) ***REMOVED***
    return function(v, build) ***REMOVED***
      if (v === undefined) ***REMOVED***
        return this._parts[_part] || "";
      ***REMOVED*** else ***REMOVED***
        if (v !== null) ***REMOVED***
          v = v + "";
          if (v[0] === _key) ***REMOVED***
            v = v.substring(1);
          ***REMOVED***
        ***REMOVED***
        this._parts[_part] = v;
        this.build(!build);
        return this;
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***;
  for (_part in _parts) ***REMOVED***
    p[_part] = generateAccessor(_part, _parts[_part]);
  ***REMOVED***
  // generate accessors with prefixed output
  _parts = ***REMOVED***
    search: ['?', 'query'],
    hash: ['#', 'fragment']
  ***REMOVED***;
  generateAccessor = function(_part, _key) ***REMOVED***
    return function(v, build) ***REMOVED***
      var t = this[_part](v, build);
      return typeof t === "string" && t.length ? (_key + t) : t;
    ***REMOVED***;
  ***REMOVED***;
  for (_part in _parts) ***REMOVED***
    p[_part] = generateAccessor(_parts[_part][1], _parts[_part][0]);
  ***REMOVED***
  p.pathname = function(v, build) ***REMOVED***
    if (v === undefined || v === true) ***REMOVED***
      var res = this._parts.path || (this._parts.urn ? '' : '/');
      return v ? URI.decodePath(res) : res;
    ***REMOVED*** else ***REMOVED***
      this._parts.path = v ? URI.recodePath(v) : "/";
      this.build(!build);
      return this;
    ***REMOVED***
  ***REMOVED***;
  p.path = p.pathname;
  p.href = function(href, build) ***REMOVED***
    var key;
    if (href === undefined) ***REMOVED***
      return this.toString();
    ***REMOVED***
    this._string = "";
    this._parts = URI._parts();
    var _URI = href instanceof URI;
    var _object = typeof href === "object" && (href.hostname || href.path);
    // window.location is reported to be an object, but it's not the sort
    // of object we're looking for: 
    // * location.protocol ends with a colon
    // * location.query != object.search
    // * location.hash != object.fragment
    // simply serializing the unknown object should do the trick 
    // (for location, not for everything...)
    if (!_URI && _object && Object.prototype.toString.call(href) !== "[object Object]") ***REMOVED***
      href = href.toString();
    ***REMOVED***
    if (typeof href === "string") ***REMOVED***
      this._parts = URI.parse(href, this._parts);
    ***REMOVED*** else if (_URI || _object) ***REMOVED***
      var src = _URI ? href._parts : href;
      for (key in src) ***REMOVED***
        if (hasOwn.call(this._parts, key)) ***REMOVED***
          this._parts[key] = src[key];
        ***REMOVED***
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
      throw new TypeError("invalid input");
    ***REMOVED***
    this.build(!build);
    return this;
  ***REMOVED***;
  // identification accessors
  p.is = function(what) ***REMOVED***
    var ip = false;
    var ip4 = false;
    var ip6 = false;
    var name = false;
    var sld = false;
    var idn = false;
    var punycode = false;
    var relative = !this._parts.urn;
    if (this._parts.hostname) ***REMOVED***
      relative = false;
      ip4 = URI.ip4_expression.test(this._parts.hostname);
      ip6 = URI.ip6_expression.test(this._parts.hostname);
      ip = ip4 || ip6;
      name = !ip;
      sld = name && SLD && SLD.has(this._parts.hostname);
      idn = name && URI.idn_expression.test(this._parts.hostname);
      punycode = name && URI.punycode_expression.test(this._parts.hostname);
    ***REMOVED***
    switch (what.toLowerCase()) ***REMOVED***
    case 'relative':
      return relative;
    case 'absolute':
      return !relative;
      // hostname identification
    case 'domain':
    case 'name':
      return name;
    case 'sld':
      return sld;
    case 'ip':
      return ip;
    case 'ip4':
    case 'ipv4':
    case 'inet4':
      return ip4;
    case 'ip6':
    case 'ipv6':
    case 'inet6':
      return ip6;
    case 'idn':
      return idn;
    case 'url':
      return !this._parts.urn;
    case 'urn':
      return !!this._parts.urn;
    case 'punycode':
      return punycode;
    ***REMOVED***
    return null;
  ***REMOVED***;
  // component specific input validation
  var _protocol = p.protocol;
  var _port = p.port;
  var _hostname = p.hostname;
  p.protocol = function(v, build) ***REMOVED***
    if (v !== undefined) ***REMOVED***
      if (v) ***REMOVED***
        // accept trailing ://
        v = v.replace(/:(\/\/)?$/, '');
        if (v.match(/[^a-zA-z0-9\.+-]/)) ***REMOVED***
          throw new TypeError("Protocol '" + v + "' contains characters other than [A-Z0-9.+-]");
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    return _protocol.call(this, v, build);
  ***REMOVED***;
  p.scheme = p.protocol;
  p.port = function(v, build) ***REMOVED***
    if (this._parts.urn) ***REMOVED***
      return v === undefined ? '' : this;
    ***REMOVED***
    if (v !== undefined) ***REMOVED***
      if (v === 0) ***REMOVED***
        v = null;
      ***REMOVED***
      if (v) ***REMOVED***
        v += "";
        if (v[0] === ":") ***REMOVED***
          v = v.substring(1);
        ***REMOVED***
        if (v.match(/[^0-9]/)) ***REMOVED***
          throw new TypeError("Port '" + v + "' contains characters other than [0-9]");
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    return _port.call(this, v, build);
  ***REMOVED***;
  p.hostname = function(v, build) ***REMOVED***
    if (this._parts.urn) ***REMOVED***
      return v === undefined ? '' : this;
    ***REMOVED***
    if (v !== undefined) ***REMOVED***
      var x = ***REMOVED******REMOVED***;
      URI.parseHost(v, x);
      v = x.hostname;
    ***REMOVED***
    return _hostname.call(this, v, build);
  ***REMOVED***;
  // compound accessors
  p.host = function(v, build) ***REMOVED***
    if (this._parts.urn) ***REMOVED***
      return v === undefined ? '' : this;
    ***REMOVED***
    if (v === undefined) ***REMOVED***
      return this._parts.hostname ? URI.buildHost(this._parts) : "";
    ***REMOVED*** else ***REMOVED***
      URI.parseHost(v, this._parts);
      this.build(!build);
      return this;
    ***REMOVED***
  ***REMOVED***;
  p.authority = function(v, build) ***REMOVED***
    if (this._parts.urn) ***REMOVED***
      return v === undefined ? '' : this;
    ***REMOVED***
    if (v === undefined) ***REMOVED***
      return this._parts.hostname ? URI.buildAuthority(this._parts) : "";
    ***REMOVED*** else ***REMOVED***
      URI.parseAuthority(v, this._parts);
      this.build(!build);
      return this;
    ***REMOVED***
  ***REMOVED***;
  p.userinfo = function(v, build) ***REMOVED***
    if (this._parts.urn) ***REMOVED***
      return v === undefined ? '' : this;
    ***REMOVED***
    if (v === undefined) ***REMOVED***
      if (!this._parts.username) ***REMOVED***
        return "";
      ***REMOVED***
      var t = URI.buildUserinfo(this._parts);
      return t.substring(0, t.length - 1);
    ***REMOVED*** else ***REMOVED***
      if (v[v.length - 1] !== '@') ***REMOVED***
        v += '@';
      ***REMOVED***
      URI.parseUserinfo(v, this._parts);
      this.build(!build);
      return this;
    ***REMOVED***
  ***REMOVED***;
  p.resource = function(v, build) ***REMOVED***
    var parts;
    if (v === undefined) ***REMOVED***
      return this.path() + this.search() + this.hash();
    ***REMOVED***
    parts = URI.parse(v);
    this._parts.path = parts.path;
    this._parts.query = parts.query;
    this._parts.fragment = parts.fragment;
    this.build(!build);
    return this;
  ***REMOVED***;
  // fraction accessors
  p.subdomain = function(v, build) ***REMOVED***
    if (this._parts.urn) ***REMOVED***
      return v === undefined ? '' : this;
    ***REMOVED***
    // convenience, return "www" from "www.example.org"
    if (v === undefined) ***REMOVED***
      if (!this._parts.hostname || this.is('IP')) ***REMOVED***
        return "";
      ***REMOVED***
      // grab domain and add another segment
      var end = this._parts.hostname.length - this.domain().length - 1;
      return this._parts.hostname.substring(0, end) || "";
    ***REMOVED*** else ***REMOVED***
      var e = this._parts.hostname.length - this.domain().length;
      var sub = this._parts.hostname.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(sub));
      if (v && v[v.length - 1] !== '.') ***REMOVED***
        v += ".";
      ***REMOVED***
      if (v) ***REMOVED***
        URI.ensureValidHostname(v);
      ***REMOVED***
      this._parts.hostname = this._parts.hostname.replace(replace, v);
      this.build(!build);
      return this;
    ***REMOVED***
  ***REMOVED***;
  p.domain = function(v, build) ***REMOVED***
    if (this._parts.urn) ***REMOVED***
      return v === undefined ? '' : this;
    ***REMOVED***
    if (typeof v === 'boolean') ***REMOVED***
      build = v;
      v = undefined;
    ***REMOVED***
    // convenience, return "example.org" from "www.example.org"
    if (v === undefined) ***REMOVED***
      if (!this._parts.hostname || this.is('IP')) ***REMOVED***
        return "";
      ***REMOVED***
      // if hostname consists of 1 or 2 segments, it must be the domain
      var t = this._parts.hostname.match(/\./g);
      if (t && t.length < 2) ***REMOVED***
        return this._parts.hostname;
      ***REMOVED***
      // grab tld and add another segment
      var end = this._parts.hostname.length - this.tld(build).length - 1;
      end = this._parts.hostname.lastIndexOf('.', end - 1) + 1;
      return this._parts.hostname.substring(end) || "";
    ***REMOVED*** else ***REMOVED***
      if (!v) ***REMOVED***
        throw new TypeError("cannot set domain empty");
      ***REMOVED***
      URI.ensureValidHostname(v);
      if (!this._parts.hostname || this.is('IP')) ***REMOVED***
        this._parts.hostname = v;
      ***REMOVED*** else ***REMOVED***
        var replace = new RegExp(escapeRegEx(this.domain()) + "$");
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      ***REMOVED***
      this.build(!build);
      return this;
    ***REMOVED***
  ***REMOVED***;
  p.tld = function(v, build) ***REMOVED***
    if (this._parts.urn) ***REMOVED***
      return v === undefined ? '' : this;
    ***REMOVED***
    if (typeof v === 'boolean') ***REMOVED***
      build = v;
      v = undefined;
    ***REMOVED***
    // return "org" from "www.example.org"
    if (v === undefined) ***REMOVED***
      if (!this._parts.hostname || this.is('IP')) ***REMOVED***
        return "";
      ***REMOVED***
      var pos = this._parts.hostname.lastIndexOf('.');
      var tld = this._parts.hostname.substring(pos + 1);
      if (build !== true && SLD && SLD.list[tld.toLowerCase()]) ***REMOVED***
        return SLD.get(this._parts.hostname) || tld;
      ***REMOVED***
      return tld;
    ***REMOVED*** else ***REMOVED***
      var replace;
      if (!v) ***REMOVED***
        throw new TypeError("cannot set TLD empty");
      ***REMOVED*** else if (v.match(/[^a-zA-Z0-9-]/)) ***REMOVED***
        if (SLD && SLD.is(v)) ***REMOVED***
          replace = new RegExp(escapeRegEx(this.tld()) + "$");
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        ***REMOVED*** else ***REMOVED***
          throw new TypeError("TLD '" + v + "' contains characters other than [A-Z0-9]");
        ***REMOVED***
      ***REMOVED*** else if (!this._parts.hostname || this.is('IP')) ***REMOVED***
        throw new ReferenceError("cannot set TLD on non-domain host");
      ***REMOVED*** else ***REMOVED***
        replace = new RegExp(escapeRegEx(this.tld()) + "$");
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      ***REMOVED***
      this.build(!build);
      return this;
    ***REMOVED***
  ***REMOVED***;
  p.directory = function(v, build) ***REMOVED***
    if (this._parts.urn) ***REMOVED***
      return v === undefined ? '' : this;
    ***REMOVED***
    if (v === undefined || v === true) ***REMOVED***
      if (!this._parts.path && !this._parts.hostname) ***REMOVED***
        return '';
      ***REMOVED***
      if (this._parts.path === '/') ***REMOVED***
        return '/';
      ***REMOVED***
      var end = this._parts.path.length - this.filename().length - 1;
      var res = this._parts.path.substring(0, end) || (this._parts.hostname ? "/" : "");
      return v ? URI.decodePath(res) : res;
    ***REMOVED*** else ***REMOVED***
      var e = this._parts.path.length - this.filename().length;
      var directory = this._parts.path.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(directory));
      // fully qualifier directories begin with a slash
      if (!this.is('relative')) ***REMOVED***
        if (!v) ***REMOVED***
          v = '/';
        ***REMOVED***
        if (v[0] !== '/') ***REMOVED***
          v = "/" + v;
        ***REMOVED***
      ***REMOVED***
      // directories always end with a slash
      if (v && v[v.length - 1] !== '/') ***REMOVED***
        v += '/';
      ***REMOVED***
      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);
      this.build(!build);
      return this;
    ***REMOVED***
  ***REMOVED***;
  p.filename = function(v, build) ***REMOVED***
    if (this._parts.urn) ***REMOVED***
      return v === undefined ? '' : this;
    ***REMOVED***
    if (v === undefined || v === true) ***REMOVED***
      if (!this._parts.path || this._parts.path === '/') ***REMOVED***
        return "";
      ***REMOVED***
      var pos = this._parts.path.lastIndexOf('/');
      var res = this._parts.path.substring(pos + 1);
      return v ? URI.decodePathSegment(res) : res;
    ***REMOVED*** else ***REMOVED***
      var mutatedDirectory = false;
      if (v[0] === '/') ***REMOVED***
        v = v.substring(1);
      ***REMOVED***
      if (v.match(/\.?\//)) ***REMOVED***
        mutatedDirectory = true;
      ***REMOVED***
      var replace = new RegExp(escapeRegEx(this.filename()) + "$");
      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);
      if (mutatedDirectory) ***REMOVED***
        this.normalizePath(build);
      ***REMOVED*** else ***REMOVED***
        this.build(!build);
      ***REMOVED***
      return this;
    ***REMOVED***
  ***REMOVED***;
  p.suffix = function(v, build) ***REMOVED***
    if (this._parts.urn) ***REMOVED***
      return v === undefined ? '' : this;
    ***REMOVED***
    if (v === undefined || v === true) ***REMOVED***
      if (!this._parts.path || this._parts.path === '/') ***REMOVED***
        return "";
      ***REMOVED***
      var filename = this.filename();
      var pos = filename.lastIndexOf('.');
      var s, res;
      if (pos === -1) ***REMOVED***
        return "";
      ***REMOVED***
      // suffix may only contain alnum characters (yup, I made this up.)
      s = filename.substring(pos + 1);
      res = (/^[a-z0-9%]+$/i).test(s) ? s : "";
      return v ? URI.decodePathSegment(res) : res;
    ***REMOVED*** else ***REMOVED***
      if (v[0] === '.') ***REMOVED***
        v = v.substring(1);
      ***REMOVED***
      var suffix = this.suffix();
      var replace;
      if (!suffix) ***REMOVED***
        if (!v) ***REMOVED***
          return this;
        ***REMOVED***
        this._parts.path += '.' + URI.recodePath(v);
      ***REMOVED*** else if (!v) ***REMOVED***
        replace = new RegExp(escapeRegEx("." + suffix) + "$");
      ***REMOVED*** else ***REMOVED***
        replace = new RegExp(escapeRegEx(suffix) + "$");
      ***REMOVED***
      if (replace) ***REMOVED***
        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);
      ***REMOVED***
      this.build(!build);
      return this;
    ***REMOVED***
  ***REMOVED***;
  p.segment = function(segment, v, build) ***REMOVED***
    var separator = this._parts.urn ? ':' : '/';
    var path = this.path();
    var absolute = path.substring(0, 1) === '/';
    var segments = path.split(separator);
    if (typeof segment !== 'number') ***REMOVED***
      build = v;
      v = segment;
      segment = undefined;
    ***REMOVED***
    if (segment !== undefined && typeof segment !== 'number') ***REMOVED***
      throw new Error("Bad segment '" + segment + "', must be 0-based integer");
    ***REMOVED***
    if (absolute) ***REMOVED***
      segments.shift();
    ***REMOVED***
    if (segment < 0) ***REMOVED***
      // allow negative indexes to address from the end
      segment = Math.max(segments.length + segment, 0);
    ***REMOVED***
    if (v === undefined) ***REMOVED***
      return segment === undefined ? segments : segments[segment];
    ***REMOVED*** else if (segment === null || segments[segment] === undefined) ***REMOVED***
      if (isArray(v)) ***REMOVED***
        segments = v;
      ***REMOVED*** else if (v || (typeof v === "string" && v.length)) ***REMOVED***
        if (segments[segments.length - 1] === "") ***REMOVED***
          // empty trailing elements have to be overwritten
          // to prefent results such as /foo//bar
          segments[segments.length - 1] = v;
        ***REMOVED*** else ***REMOVED***
          segments.push(v);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
      if (v || (typeof v === "string" && v.length)) ***REMOVED***
        segments[segment] = v;
      ***REMOVED*** else ***REMOVED***
        segments.splice(segment, 1);
      ***REMOVED***
    ***REMOVED***
    if (absolute) ***REMOVED***
      segments.unshift("");
    ***REMOVED***
    return this.path(segments.join(separator), build);
  ***REMOVED***;
  // mutating query string
  var q = p.query;
  p.query = function(v, build) ***REMOVED***
    if (v === true) ***REMOVED***
      return URI.parseQuery(this._parts.query);
    ***REMOVED*** else if (v !== undefined && typeof v !== "string") ***REMOVED***
      this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters);
      this.build(!build);
      return this;
    ***REMOVED*** else ***REMOVED***
      return q.call(this, v, build);
    ***REMOVED***
  ***REMOVED***;
  p.addQuery = function(name, value, build) ***REMOVED***
    var data = URI.parseQuery(this._parts.query);
    URI.addQuery(data, name, value === undefined ? null : value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters);
    if (typeof name !== "string") ***REMOVED***
      build = value;
    ***REMOVED***
    this.build(!build);
    return this;
  ***REMOVED***;
  p.removeQuery = function(name, value, build) ***REMOVED***
    var data = URI.parseQuery(this._parts.query);
    URI.removeQuery(data, name, value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters);
    if (typeof name !== "string") ***REMOVED***
      build = value;
    ***REMOVED***
    this.build(!build);
    return this;
  ***REMOVED***;
  p.addSearch = p.addQuery;
  p.removeSearch = p.removeQuery;
  // sanitizing URLs
  p.normalize = function() ***REMOVED***
    if (this._parts.urn) ***REMOVED***
      return this.normalizeProtocol(false).normalizeQuery(false).normalizeFragment(false).build();
    ***REMOVED***
    return this.normalizeProtocol(false).normalizeHostname(false).normalizePort(false).normalizePath(false).normalizeQuery(false).normalizeFragment(false).build();
  ***REMOVED***;
  p.normalizeProtocol = function(build) ***REMOVED***
    if (typeof this._parts.protocol === "string") ***REMOVED***
      this._parts.protocol = this._parts.protocol.toLowerCase();
      this.build(!build);
    ***REMOVED***
    return this;
  ***REMOVED***;
  p.normalizeHostname = function(build) ***REMOVED***
    if (this._parts.hostname) ***REMOVED***
      if (this.is('IDN') && punycode) ***REMOVED***
        this._parts.hostname = punycode.toASCII(this._parts.hostname);
      ***REMOVED*** else if (this.is('IPv6') && IPv6) ***REMOVED***
        this._parts.hostname = IPv6.best(this._parts.hostname);
      ***REMOVED***
      this._parts.hostname = this._parts.hostname.toLowerCase();
      this.build(!build);
    ***REMOVED***
    return this;
  ***REMOVED***;
  p.normalizePort = function(build) ***REMOVED***
    // remove port of it's the protocol's default
    if (typeof this._parts.protocol === "string" && this._parts.port === URI.defaultPorts[this._parts.protocol]) ***REMOVED***
      this._parts.port = null;
      this.build(!build);
    ***REMOVED***
    return this;
  ***REMOVED***;
  p.normalizePath = function(build) ***REMOVED***
    if (this._parts.urn) ***REMOVED***
      return this;
    ***REMOVED***
    if (!this._parts.path || this._parts.path === '/') ***REMOVED***
      return this;
    ***REMOVED***
    var _was_relative;
    var _was_relative_prefix;
    var _path = this._parts.path;
    var _parent, _pos;
    // handle relative paths
    if (_path[0] !== '/') ***REMOVED***
      if (_path[0] === '.') ***REMOVED***
        _was_relative_prefix = _path.substring(0, _path.indexOf('/'));
      ***REMOVED***
      _was_relative = true;
      _path = '/' + _path;
    ***REMOVED***
    // resolve simples
    _path = _path.replace(/(\/(\.\/)+)|\/***REMOVED***2,***REMOVED***/g, '/');
    // resolve parents
    while (true) ***REMOVED***
      _parent = _path.indexOf('/../');
      if (_parent === -1) ***REMOVED***
        // no more ../ to resolve
        break;
      ***REMOVED*** else if (_parent === 0) ***REMOVED***
        // top level cannot be relative...
        _path = _path.substring(3);
        break;
      ***REMOVED***
      _pos = _path.substring(0, _parent).lastIndexOf('/');
      if (_pos === -1) ***REMOVED***
        _pos = _parent;
      ***REMOVED***
      _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
    ***REMOVED***
    // revert to relative
    if (_was_relative && this.is('relative')) ***REMOVED***
      if (_was_relative_prefix) ***REMOVED***
        _path = _was_relative_prefix + _path;
      ***REMOVED*** else ***REMOVED***
        _path = _path.substring(1);
      ***REMOVED***
    ***REMOVED***
    _path = URI.recodePath(_path);
    this._parts.path = _path;
    this.build(!build);
    return this;
  ***REMOVED***;
  p.normalizePathname = p.normalizePath;
  p.normalizeQuery = function(build) ***REMOVED***
    if (typeof this._parts.query === "string") ***REMOVED***
      if (!this._parts.query.length) ***REMOVED***
        this._parts.query = null;
      ***REMOVED*** else ***REMOVED***
        this.query(URI.parseQuery(this._parts.query));
      ***REMOVED***
      this.build(!build);
    ***REMOVED***
    return this;
  ***REMOVED***;
  p.normalizeFragment = function(build) ***REMOVED***
    if (!this._parts.fragment) ***REMOVED***
      this._parts.fragment = null;
      this.build(!build);
    ***REMOVED***
    return this;
  ***REMOVED***;
  p.normalizeSearch = p.normalizeQuery;
  p.normalizeHash = p.normalizeFragment;
  p.iso8859 = function() ***REMOVED***
    // expect unicode input, iso8859 output
    var e = URI.encode;
    var d = URI.decode;
    URI.encode = escape;
    URI.decode = decodeURIComponent;
    this.normalize();
    URI.encode = e;
    URI.decode = d;
    return this;
  ***REMOVED***;
  p.unicode = function() ***REMOVED***
    // expect iso8859 input, unicode output
    var e = URI.encode;
    var d = URI.decode;
    URI.encode = strictEncodeURIComponent;
    URI.decode = unescape;
    this.normalize();
    URI.encode = e;
    URI.decode = d;
    return this;
  ***REMOVED***;
  p.readable = function() ***REMOVED***
    var uri = this.clone();
    // removing username, password, because they shouldn't be displayed according to RFC 3986
    uri.username("").password("").normalize();
    var t = '';
    if (uri._parts.protocol) ***REMOVED***
      t += uri._parts.protocol + '://';
    ***REMOVED***
    if (uri._parts.hostname) ***REMOVED***
      if (uri.is('punycode') && punycode) ***REMOVED***
        t += punycode.toUnicode(uri._parts.hostname);
        if (uri._parts.port) ***REMOVED***
          t += ":" + uri._parts.port;
        ***REMOVED***
      ***REMOVED*** else ***REMOVED***
        t += uri.host();
      ***REMOVED***
    ***REMOVED***
    if (uri._parts.hostname && uri._parts.path && uri._parts.path[0] !== '/') ***REMOVED***
      t += '/';
    ***REMOVED***
    t += uri.path(true);
    if (uri._parts.query) ***REMOVED***
      var q = '';
      for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) ***REMOVED***
        var kv = (qp[i] || "").split('=');
        q += '&' + URI.decodeQuery(kv[0]).replace(/&/g, '%26');
        if (kv[1] !== undefined) ***REMOVED***
          q += "=" + URI.decodeQuery(kv[1]).replace(/&/g, '%26');
        ***REMOVED***
      ***REMOVED***
      t += '?' + q.substring(1);
    ***REMOVED***
    t += uri.hash();
    return t;
  ***REMOVED***;
  // resolving relative and absolute URLs
  p.absoluteTo = function(base) ***REMOVED***
    var resolved = this.clone();
    var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
    var basedir, i, p;
    if (this._parts.urn) ***REMOVED***
      throw new Error('URNs do not have any generally defined hierachical components');
    ***REMOVED***
    if (this._parts.hostname) ***REMOVED***
      return resolved;
    ***REMOVED***
    if (!(base instanceof URI)) ***REMOVED***
      base = new URI(base);
    ***REMOVED***
    for (i = 0, p; p = properties[i]; i++) ***REMOVED***
      resolved._parts[p] = base._parts[p];
    ***REMOVED***
    properties = ['query', 'path'];
    for (i = 0, p; p = properties[i]; i++) ***REMOVED***
      if (!resolved._parts[p] && base._parts[p]) ***REMOVED***
        resolved._parts[p] = base._parts[p];
      ***REMOVED***
    ***REMOVED***
    if (resolved.path()[0] !== '/') ***REMOVED***
      basedir = base.directory();
      resolved._parts.path = (basedir ? (basedir + '/') : '') + resolved._parts.path;
      resolved.normalizePath();
    ***REMOVED***
    resolved.build();
    return resolved;
  ***REMOVED***;
  p.relativeTo = function(base) ***REMOVED***
    var relative = this.clone();
    var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
    var common, _base, _this, _base_diff, _this_diff;
    if (this._parts.urn) ***REMOVED***
      throw new Error('URNs do not have any generally defined hierachical components');
    ***REMOVED***
    if (!(base instanceof URI)) ***REMOVED***
      base = new URI(base);
    ***REMOVED***
    if (this.path()[0] !== '/' || base.path()[0] !== '/') ***REMOVED***
      throw new Error('Cannot calculate common path from non-relative URLs');
    ***REMOVED***
    // determine common sub path
    common = URI.commonPath(relative.path(), base.path());
    // no relation if there's nothing in common 
    if (!common || common === '/') ***REMOVED***
      return relative;
    ***REMOVED***
    // relative paths don't have authority
    for (var i = 0, p; p = properties[i]; i++) ***REMOVED***
      relative._parts[p] = null;
    ***REMOVED***
    _base = base.directory();
    _this = this.directory();
    // base and this are on the same level
    if (_base === _this) ***REMOVED***
      relative._parts.path = './' + relative.filename();
      return relative.build();
    ***REMOVED***
    _base_diff = _base.substring(common.length);
    _this_diff = _this.substring(common.length);
    // this is a descendant of base
    if (_base + '/' === common) ***REMOVED***
      if (_this_diff) ***REMOVED***
        _this_diff += '/';
      ***REMOVED***
      relative._parts.path = './' + _this_diff + relative.filename();
      return relative.build();
    ***REMOVED***
    // this is a descendant of base
    var parents = '../';
    var _common = new RegExp('^' + escapeRegEx(common));
    var _parents = _base.replace(_common, '/').match(/\//g).length - 1;
    while (_parents--) ***REMOVED***
      parents += '../';
    ***REMOVED***
    relative._parts.path = relative._parts.path.replace(_common, parents);
    return relative.build();
  ***REMOVED***;
  // comparing URIs
  p.equals = function(uri) ***REMOVED***
    var one = this.clone();
    var two = new URI(uri);
    var one_map = ***REMOVED******REMOVED***;
    var two_map = ***REMOVED******REMOVED***;
    var checked = ***REMOVED******REMOVED***;
    var one_query, two_query, key;
    one.normalize();
    two.normalize();
    // exact match
    if (one.toString() === two.toString()) ***REMOVED***
      return true;
    ***REMOVED***
    // extract query string
    one_query = one.query();
    two_query = two.query();
    one.query("");
    two.query("");
    // definitely not equal if not even non-query parts match
    if (one.toString() !== two.toString()) ***REMOVED***
      return false;
    ***REMOVED***
    // query parameters have the same length, even if they're permutated
    if (one_query.length !== two_query.length) ***REMOVED***
      return false;
    ***REMOVED***
    one_map = URI.parseQuery(one_query);
    two_map = URI.parseQuery(two_query);
    for (key in one_map) ***REMOVED***
      if (hasOwn.call(one_map, key)) ***REMOVED***
        if (!isArray(one_map[key])) ***REMOVED***
          if (one_map[key] !== two_map[key]) ***REMOVED***
            return false;
          ***REMOVED***
        ***REMOVED*** else ***REMOVED***
          if (!isArray(two_map[key])) ***REMOVED***
            return false;
          ***REMOVED***
          // arrays can't be equal if they have different amount of content
          if (one_map[key].length !== two_map[key].length) ***REMOVED***
            return false;
          ***REMOVED***
          one_map[key].sort();
          two_map[key].sort();
          for (var i = 0, l = one_map[key].length; i < l; i++) ***REMOVED***
            if (one_map[key][i] !== two_map[key][i]) ***REMOVED***
              return false;
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
        checked[key] = true;
      ***REMOVED***
    ***REMOVED***
    for (key in two_map) ***REMOVED***
      if (hasOwn.call(two_map, key)) ***REMOVED***
        if (!checked[key]) ***REMOVED***
          // two contains a parameter not present in one
          return false;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    return true;
  ***REMOVED***;
  // state
  p.duplicateQueryParameters = function(v) ***REMOVED***
    this._parts.duplicateQueryParameters = !! v;
    return this;
  ***REMOVED***;
  return URI;
***REMOVED***));