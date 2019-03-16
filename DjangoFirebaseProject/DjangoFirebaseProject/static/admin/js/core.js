// Core javascript helper functions

// basic browser identification & version
var isOpera = (navigator.userAgent.indexOf("Opera") >= 0) && parseFloat(navigator.appVersion);
var isIE = ((document.all) && (!isOpera)) && parseFloat(navigator.appVersion.split("MSIE ")[1].split(";")[0]);

// quickElement(tagType, parentReference [, textInChildNode, attribute, attributeValue ...]);
function quickElement() ***REMOVED***
    'use strict';
    var obj = document.createElement(arguments[0]);
    if (arguments[2]) ***REMOVED***
        var textNode = document.createTextNode(arguments[2]);
        obj.appendChild(textNode);
    ***REMOVED***
    var len = arguments.length;
    for (var i = 3; i < len; i += 2) ***REMOVED***
        obj.setAttribute(arguments[i], arguments[i + 1]);
    ***REMOVED***
    arguments[1].appendChild(obj);
    return obj;
***REMOVED***

// "a" is reference to an object
function removeChildren(a) ***REMOVED***
    'use strict';
    while (a.hasChildNodes()) ***REMOVED***
        a.removeChild(a.lastChild);
    ***REMOVED***
***REMOVED***

// ----------------------------------------------------------------------------
// Find-position functions by PPK
// See https://www.quirksmode.org/js/findpos.html
// ----------------------------------------------------------------------------
function findPosX(obj) ***REMOVED***
    'use strict';
    var curleft = 0;
    if (obj.offsetParent) ***REMOVED***
        while (obj.offsetParent) ***REMOVED***
            curleft += obj.offsetLeft - ((isOpera) ? 0 : obj.scrollLeft);
            obj = obj.offsetParent;
        ***REMOVED***
        // IE offsetParent does not include the top-level
        if (isIE && obj.parentElement) ***REMOVED***
            curleft += obj.offsetLeft - obj.scrollLeft;
        ***REMOVED***
    ***REMOVED*** else if (obj.x) ***REMOVED***
        curleft += obj.x;
    ***REMOVED***
    return curleft;
***REMOVED***

function findPosY(obj) ***REMOVED***
    'use strict';
    var curtop = 0;
    if (obj.offsetParent) ***REMOVED***
        while (obj.offsetParent) ***REMOVED***
            curtop += obj.offsetTop - ((isOpera) ? 0 : obj.scrollTop);
            obj = obj.offsetParent;
        ***REMOVED***
        // IE offsetParent does not include the top-level
        if (isIE && obj.parentElement) ***REMOVED***
            curtop += obj.offsetTop - obj.scrollTop;
        ***REMOVED***
    ***REMOVED*** else if (obj.y) ***REMOVED***
        curtop += obj.y;
    ***REMOVED***
    return curtop;
***REMOVED***

//-----------------------------------------------------------------------------
// Date object extensions
// ----------------------------------------------------------------------------
(function() ***REMOVED***
    'use strict';
    Date.prototype.getTwelveHours = function() ***REMOVED***
        var hours = this.getHours();
        if (hours === 0) ***REMOVED***
            return 12;
        ***REMOVED***
        else ***REMOVED***
            return hours <= 12 ? hours : hours - 12;
        ***REMOVED***
    ***REMOVED***;

    Date.prototype.getTwoDigitMonth = function() ***REMOVED***
        return (this.getMonth() < 9) ? '0' + (this.getMonth() + 1) : (this.getMonth() + 1);
    ***REMOVED***;

    Date.prototype.getTwoDigitDate = function() ***REMOVED***
        return (this.getDate() < 10) ? '0' + this.getDate() : this.getDate();
    ***REMOVED***;

    Date.prototype.getTwoDigitTwelveHour = function() ***REMOVED***
        return (this.getTwelveHours() < 10) ? '0' + this.getTwelveHours() : this.getTwelveHours();
    ***REMOVED***;

    Date.prototype.getTwoDigitHour = function() ***REMOVED***
        return (this.getHours() < 10) ? '0' + this.getHours() : this.getHours();
    ***REMOVED***;

    Date.prototype.getTwoDigitMinute = function() ***REMOVED***
        return (this.getMinutes() < 10) ? '0' + this.getMinutes() : this.getMinutes();
    ***REMOVED***;

    Date.prototype.getTwoDigitSecond = function() ***REMOVED***
        return (this.getSeconds() < 10) ? '0' + this.getSeconds() : this.getSeconds();
    ***REMOVED***;

    Date.prototype.getHourMinute = function() ***REMOVED***
        return this.getTwoDigitHour() + ':' + this.getTwoDigitMinute();
    ***REMOVED***;

    Date.prototype.getHourMinuteSecond = function() ***REMOVED***
        return this.getTwoDigitHour() + ':' + this.getTwoDigitMinute() + ':' + this.getTwoDigitSecond();
    ***REMOVED***;

    Date.prototype.getFullMonthName = function() ***REMOVED***
        return typeof window.CalendarNamespace === "undefined"
            ? this.getTwoDigitMonth()
            : window.CalendarNamespace.monthsOfYear[this.getMonth()];
    ***REMOVED***;

    Date.prototype.strftime = function(format) ***REMOVED***
        var fields = ***REMOVED***
            B: this.getFullMonthName(),
            c: this.toString(),
            d: this.getTwoDigitDate(),
            H: this.getTwoDigitHour(),
            I: this.getTwoDigitTwelveHour(),
            m: this.getTwoDigitMonth(),
            M: this.getTwoDigitMinute(),
            p: (this.getHours() >= 12) ? 'PM' : 'AM',
            S: this.getTwoDigitSecond(),
            w: '0' + this.getDay(),
            x: this.toLocaleDateString(),
            X: this.toLocaleTimeString(),
            y: ('' + this.getFullYear()).substr(2, 4),
            Y: '' + this.getFullYear(),
            '%': '%'
        ***REMOVED***;
        var result = '', i = 0;
        while (i < format.length) ***REMOVED***
            if (format.charAt(i) === '%') ***REMOVED***
                result = result + fields[format.charAt(i + 1)];
                ++i;
            ***REMOVED***
            else ***REMOVED***
                result = result + format.charAt(i);
            ***REMOVED***
            ++i;
        ***REMOVED***
        return result;
    ***REMOVED***;

// ----------------------------------------------------------------------------
// String object extensions
// ----------------------------------------------------------------------------
    String.prototype.pad_left = function(pad_length, pad_string) ***REMOVED***
        var new_string = this;
        for (var i = 0; new_string.length < pad_length; i++) ***REMOVED***
            new_string = pad_string + new_string;
        ***REMOVED***
        return new_string;
    ***REMOVED***;

    String.prototype.strptime = function(format) ***REMOVED***
        var split_format = format.split(/[.\-/]/);
        var date = this.split(/[.\-/]/);
        var i = 0;
        var day, month, year;
        while (i < split_format.length) ***REMOVED***
            switch (split_format[i]) ***REMOVED***
                case "%d":
                    day = date[i];
                    break;
                case "%m":
                    month = date[i] - 1;
                    break;
                case "%Y":
                    year = date[i];
                    break;
                case "%y":
                    year = date[i];
                    break;
            ***REMOVED***
            ++i;
        ***REMOVED***
        // Create Date object from UTC since the parsed value is supposed to be
        // in UTC, not local time. Also, the calendar uses UTC functions for
        // date extraction.
        return new Date(Date.UTC(year, month, day));
    ***REMOVED***;

***REMOVED***)();
// ----------------------------------------------------------------------------
// Get the computed style for and element
// ----------------------------------------------------------------------------
function getStyle(oElm, strCssRule) ***REMOVED***
    'use strict';
    var strValue = "";
    if(document.defaultView && document.defaultView.getComputedStyle) ***REMOVED***
        strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
    ***REMOVED***
    else if(oElm.currentStyle) ***REMOVED***
        strCssRule = strCssRule.replace(/\-(\w)/g, function(strMatch, p1) ***REMOVED***
            return p1.toUpperCase();
        ***REMOVED***);
        strValue = oElm.currentStyle[strCssRule];
    ***REMOVED***
    return strValue;
***REMOVED***
