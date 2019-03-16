(function($) ***REMOVED***
    'use strict';
    $(function() ***REMOVED***
        $('.cancel-link').on('click', function(e) ***REMOVED***
            e.preventDefault();
            if (window.location.search.indexOf('&_popup=1') === -1) ***REMOVED***
                window.history.back();  // Go back if not a popup.
            ***REMOVED*** else ***REMOVED***
                window.close(); // Otherwise, close the popup.
            ***REMOVED***
        ***REMOVED***);
    ***REMOVED***);
***REMOVED***)(django.jQuery);
