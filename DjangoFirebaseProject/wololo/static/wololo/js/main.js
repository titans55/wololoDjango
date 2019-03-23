$(function()***REMOVED***
    initWebsockets()
    $('.dropdown-menu a').click(function()***REMOVED***
        $('.dropdown-toggle').text($(this).text());
    ***REMOVED***);
***REMOVED***)

//Using django channels
function initWebsockets()***REMOVED***

    var socket = new WebSocket('ws://' + window.location.host +'/ws/game/');

    socket.onopen = function(e)***REMOVED***
        console.log("websocket connected", e)
    ***REMOVED***
    
    socket.onmessage = function(e) ***REMOVED***
        console.log("finallllyy!!!!",e)
    ***REMOVED***;


    socket.onerror = function(e)***REMOVED***
        console.log("errorrr", e)
    ***REMOVED***

    socket.onclose = function(e) ***REMOVED***
        console.error('Chat socket closed unexpectedly');
    ***REMOVED***;

***REMOVED***

function calculateTimeFromMinutes(mins)***REMOVED***
    let mins_num = parseFloat(mins, 10); // don't forget the second param
    let hours   = Math.floor(mins_num / 60);
    let minutes = Math.floor((mins_num - ((hours * 3600)) / 60));
    let seconds = Math.floor((mins_num * 60) - (hours * 3600) - (minutes * 60));

    // Appends 0 when unit is less than 10
    if (hours   < 10) ***REMOVED***hours   = "0"+hours;***REMOVED***
    if (minutes < 10) ***REMOVED***minutes = "0"+minutes;***REMOVED***
    if (seconds < 10) ***REMOVED***seconds = "0"+seconds;***REMOVED***
    return hours+':'+minutes+':'+seconds;
***REMOVED***

function lowerByPercantage(value, percantage)***REMOVED***
    return parseInt(value - (value * percantage / 100))
***REMOVED***

function getCookie(name) ***REMOVED***
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') ***REMOVED***
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) ***REMOVED***
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) ***REMOVED***
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
    return cookieValue;
***REMOVED***
