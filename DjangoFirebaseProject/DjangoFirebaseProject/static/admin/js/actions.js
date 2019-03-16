/*global gettext, interpolate, ngettext*/
(function($) ***REMOVED***
    'use strict';
    var lastChecked;

    $.fn.actions = function(opts) ***REMOVED***
        var options = $.extend(***REMOVED******REMOVED***, $.fn.actions.defaults, opts);
        var actionCheckboxes = $(this);
        var list_editable_changed = false;
        var showQuestion = function() ***REMOVED***
            $(options.acrossClears).hide();
            $(options.acrossQuestions).show();
            $(options.allContainer).hide();
        ***REMOVED***,
        showClear = function() ***REMOVED***
            $(options.acrossClears).show();
            $(options.acrossQuestions).hide();
            $(options.actionContainer).toggleClass(options.selectedClass);
            $(options.allContainer).show();
            $(options.counterContainer).hide();
        ***REMOVED***,
        reset = function() ***REMOVED***
            $(options.acrossClears).hide();
            $(options.acrossQuestions).hide();
            $(options.allContainer).hide();
            $(options.counterContainer).show();
        ***REMOVED***,
        clearAcross = function() ***REMOVED***
            reset();
            $(options.acrossInput).val(0);
            $(options.actionContainer).removeClass(options.selectedClass);
        ***REMOVED***,
        checker = function(checked) ***REMOVED***
            if (checked) ***REMOVED***
                showQuestion();
            ***REMOVED*** else ***REMOVED***
                reset();
            ***REMOVED***
            $(actionCheckboxes).prop("checked", checked)
                .parent().parent().toggleClass(options.selectedClass, checked);
        ***REMOVED***,
        updateCounter = function() ***REMOVED***
            var sel = $(actionCheckboxes).filter(":checked").length;
            // data-actions-icnt is defined in the generated HTML
            // and contains the total amount of objects in the queryset
            var actions_icnt = $('.action-counter').data('actionsIcnt');
            $(options.counterContainer).html(interpolate(
            ngettext('%(sel)s of %(cnt)s selected', '%(sel)s of %(cnt)s selected', sel), ***REMOVED***
                sel: sel,
                cnt: actions_icnt
            ***REMOVED***, true));
            $(options.allToggle).prop("checked", function() ***REMOVED***
                var value;
                if (sel === actionCheckboxes.length) ***REMOVED***
                    value = true;
                    showQuestion();
                ***REMOVED*** else ***REMOVED***
                    value = false;
                    clearAcross();
                ***REMOVED***
                return value;
            ***REMOVED***);
        ***REMOVED***;
        // Show counter by default
        $(options.counterContainer).show();
        // Check state of checkboxes and reinit state if needed
        $(this).filter(":checked").each(function(i) ***REMOVED***
            $(this).parent().parent().toggleClass(options.selectedClass);
            updateCounter();
            if ($(options.acrossInput).val() === 1) ***REMOVED***
                showClear();
            ***REMOVED***
        ***REMOVED***);
        $(options.allToggle).show().on('click', function() ***REMOVED***
            checker($(this).prop("checked"));
            updateCounter();
        ***REMOVED***);
        $("a", options.acrossQuestions).on('click', function(event) ***REMOVED***
            event.preventDefault();
            $(options.acrossInput).val(1);
            showClear();
        ***REMOVED***);
        $("a", options.acrossClears).on('click', function(event) ***REMOVED***
            event.preventDefault();
            $(options.allToggle).prop("checked", false);
            clearAcross();
            checker(0);
            updateCounter();
        ***REMOVED***);
        lastChecked = null;
        $(actionCheckboxes).on('click', function(event) ***REMOVED***
            if (!event) ***REMOVED*** event = window.event; ***REMOVED***
            var target = event.target ? event.target : event.srcElement;
            if (lastChecked && $.data(lastChecked) !== $.data(target) && event.shiftKey === true) ***REMOVED***
                var inrange = false;
                $(lastChecked).prop("checked", target.checked)
                    .parent().parent().toggleClass(options.selectedClass, target.checked);
                $(actionCheckboxes).each(function() ***REMOVED***
                    if ($.data(this) === $.data(lastChecked) || $.data(this) === $.data(target)) ***REMOVED***
                        inrange = (inrange) ? false : true;
                    ***REMOVED***
                    if (inrange) ***REMOVED***
                        $(this).prop("checked", target.checked)
                            .parent().parent().toggleClass(options.selectedClass, target.checked);
                    ***REMOVED***
                ***REMOVED***);
            ***REMOVED***
            $(target).parent().parent().toggleClass(options.selectedClass, target.checked);
            lastChecked = target;
            updateCounter();
        ***REMOVED***);
        $('form#changelist-form table#result_list tr').on('change', 'td:gt(0) :input', function() ***REMOVED***
            list_editable_changed = true;
        ***REMOVED***);
        $('form#changelist-form button[name="index"]').on('click', function(event) ***REMOVED***
            if (list_editable_changed) ***REMOVED***
                return confirm(gettext("You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost."));
            ***REMOVED***
        ***REMOVED***);
        $('form#changelist-form input[name="_save"]').on('click', function(event) ***REMOVED***
            var action_changed = false;
            $('select option:selected', options.actionContainer).each(function() ***REMOVED***
                if ($(this).val()) ***REMOVED***
                    action_changed = true;
                ***REMOVED***
            ***REMOVED***);
            if (action_changed) ***REMOVED***
                if (list_editable_changed) ***REMOVED***
                    return confirm(gettext("You have selected an action, but you haven't saved your changes to individual fields yet. Please click OK to save. You'll need to re-run the action."));
                ***REMOVED*** else ***REMOVED***
                    return confirm(gettext("You have selected an action, and you haven't made any changes on individual fields. You're probably looking for the Go button rather than the Save button."));
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***);
    ***REMOVED***;
    /* Setup plugin defaults */
    $.fn.actions.defaults = ***REMOVED***
        actionContainer: "div.actions",
        counterContainer: "span.action-counter",
        allContainer: "div.actions span.all",
        acrossInput: "div.actions input.select-across",
        acrossQuestions: "div.actions span.question",
        acrossClears: "div.actions span.clear",
        allToggle: "#action-toggle",
        selectedClass: "selected"
    ***REMOVED***;
    $(document).ready(function() ***REMOVED***
        var $actionsEls = $('tr input.action-select');
        if ($actionsEls.length > 0) ***REMOVED***
            $actionsEls.actions();
        ***REMOVED***
    ***REMOVED***);
***REMOVED***)(django.jQuery);
