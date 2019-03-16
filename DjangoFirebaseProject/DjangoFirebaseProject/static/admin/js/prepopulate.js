/*global URLify*/
(function($) ***REMOVED***
    'use strict';
    $.fn.prepopulate = function(dependencies, maxLength, allowUnicode) ***REMOVED***
        /*
            Depends on urlify.js
            Populates a selected field with the values of the dependent fields,
            URLifies and shortens the string.
            dependencies - array of dependent fields ids
            maxLength - maximum length of the URLify'd string
            allowUnicode - Unicode support of the URLify'd string
        */
        return this.each(function() ***REMOVED***
            var prepopulatedField = $(this);

            var populate = function() ***REMOVED***
                // Bail if the field's value has been changed by the user
                if (prepopulatedField.data('_changed')) ***REMOVED***
                    return;
                ***REMOVED***

                var values = [];
                $.each(dependencies, function(i, field) ***REMOVED***
                    field = $(field);
                    if (field.val().length > 0) ***REMOVED***
                        values.push(field.val());
                    ***REMOVED***
                ***REMOVED***);
                prepopulatedField.val(URLify(values.join(' '), maxLength, allowUnicode));
            ***REMOVED***;

            prepopulatedField.data('_changed', false);
            prepopulatedField.on('change', function() ***REMOVED***
                prepopulatedField.data('_changed', true);
            ***REMOVED***);

            if (!prepopulatedField.val()) ***REMOVED***
                $(dependencies.join(',')).on('keyup change focus', populate);
            ***REMOVED***
        ***REMOVED***);
    ***REMOVED***;
***REMOVED***)(django.jQuery);
