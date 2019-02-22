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

$(function()***REMOVED***
    $('.dropdown-menu a').click(function()***REMOVED***
        $('.dropdown-toggle').text($(this).text());
    ***REMOVED***);
***REMOVED***)