(function($) ***REMOVED***
    'use strict';
    var init = function($element, options) ***REMOVED***
        var settings = $.extend(***REMOVED***
            ajax: ***REMOVED***
                data: function(params) ***REMOVED***
                    return ***REMOVED***
                        term: params.term,
                        page: params.page
                    ***REMOVED***;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***, options);
        $element.select2(settings);
    ***REMOVED***;

    $.fn.djangoAdminSelect2 = function(options) ***REMOVED***
        var settings = $.extend(***REMOVED******REMOVED***, options);
        $.each(this, function(i, element) ***REMOVED***
            var $element = $(element);
            init($element, settings);
        ***REMOVED***);
        return this;
    ***REMOVED***;

    $(function() ***REMOVED***
        // Initialize all autocomplete widgets except the one in the template
        // form used when a new formset is added.
        $('.admin-autocomplete').not('[name*=__prefix__]').djangoAdminSelect2();
    ***REMOVED***);

    $(document).on('formset:added', (function() ***REMOVED***
        return function(event, $newFormset) ***REMOVED***
            return $newFormset.find('.admin-autocomplete').djangoAdminSelect2();
        ***REMOVED***;
    ***REMOVED***)(this));
***REMOVED***(django.jQuery));
