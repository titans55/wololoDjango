/*global gettext*/
(function($) ***REMOVED***
    'use strict';
    $(document).ready(function() ***REMOVED***
        // Add anchor tag for Show/Hide link
        $("fieldset.collapse").each(function(i, elem) ***REMOVED***
            // Don't hide if fields in this fieldset have errors
            if ($(elem).find("div.errors").length === 0) ***REMOVED***
                $(elem).addClass("collapsed").find("h2").first().append(' (<a id="fieldsetcollapser' +
                    i + '" class="collapse-toggle" href="#">' + gettext("Show") +
                    '</a>)');
            ***REMOVED***
        ***REMOVED***);
        // Add toggle to anchor tag
        $("fieldset.collapse a.collapse-toggle").on('click', function(ev) ***REMOVED***
            if ($(this).closest("fieldset").hasClass("collapsed")) ***REMOVED***
                // Show
                $(this).text(gettext("Hide")).closest("fieldset").removeClass("collapsed").trigger("show.fieldset", [$(this).attr("id")]);
            ***REMOVED*** else ***REMOVED***
                // Hide
                $(this).text(gettext("Show")).closest("fieldset").addClass("collapsed").trigger("hide.fieldset", [$(this).attr("id")]);
            ***REMOVED***
            return false;
        ***REMOVED***);
    ***REMOVED***);
***REMOVED***)(django.jQuery);
