/*global showAddAnotherPopup, showRelatedObjectLookupPopup showRelatedObjectPopup updateRelatedObjectLinks*/

(function($) ***REMOVED***
    'use strict';
    $(document).ready(function() ***REMOVED***
        var modelName = $('#django-admin-form-add-constants').data('modelName');
        $('body').on('click', '.add-another', function(e) ***REMOVED***
            e.preventDefault();
            var event = $.Event('django:add-another-related');
            $(this).trigger(event);
            if (!event.isDefaultPrevented()) ***REMOVED***
                showAddAnotherPopup(this);
            ***REMOVED***
        ***REMOVED***);

        if (modelName) ***REMOVED***
            $('form#' + modelName + '_form :input:visible:enabled:first').focus();
        ***REMOVED***
    ***REMOVED***);
***REMOVED***)(django.jQuery);
