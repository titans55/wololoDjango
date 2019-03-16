/*global DateTimeShortcuts, SelectFilter*/
/**
 * Django admin inlines
 *
 * Based on jQuery Formset 1.1
 * @author Stanislaus Madueke (stan DOT madueke AT gmail DOT com)
 * @requires jQuery 1.2.6 or later
 *
 * Copyright (c) 2009, Stanislaus Madueke
 * All rights reserved.
 *
 * Spiced up with Code from Zain Memon's GSoC project 2009
 * and modified for Django by Jannis Leidel, Travis Swicegood and Julien Phalip.
 *
 * Licensed under the New BSD License
 * See: https://opensource.org/licenses/bsd-license.php
 */
(function($) ***REMOVED***
    'use strict';
    $.fn.formset = function(opts) ***REMOVED***
        var options = $.extend(***REMOVED******REMOVED***, $.fn.formset.defaults, opts);
        var $this = $(this);
        var $parent = $this.parent();
        var updateElementIndex = function(el, prefix, ndx) ***REMOVED***
            var id_regex = new RegExp("(" + prefix + "-(\\d+|__prefix__))");
            var replacement = prefix + "-" + ndx;
            if ($(el).prop("for")) ***REMOVED***
                $(el).prop("for", $(el).prop("for").replace(id_regex, replacement));
            ***REMOVED***
            if (el.id) ***REMOVED***
                el.id = el.id.replace(id_regex, replacement);
            ***REMOVED***
            if (el.name) ***REMOVED***
                el.name = el.name.replace(id_regex, replacement);
            ***REMOVED***
        ***REMOVED***;
        var totalForms = $("#id_" + options.prefix + "-TOTAL_FORMS").prop("autocomplete", "off");
        var nextIndex = parseInt(totalForms.val(), 10);
        var maxForms = $("#id_" + options.prefix + "-MAX_NUM_FORMS").prop("autocomplete", "off");
        // only show the add button if we are allowed to add more items,
        // note that max_num = None translates to a blank string.
        var showAddButton = maxForms.val() === '' || (maxForms.val() - totalForms.val()) > 0;
        $this.each(function(i) ***REMOVED***
            $(this).not("." + options.emptyCssClass).addClass(options.formCssClass);
        ***REMOVED***);
        if ($this.length && showAddButton) ***REMOVED***
            var addButton = options.addButton;
            if (addButton === null) ***REMOVED***
                if ($this.prop("tagName") === "TR") ***REMOVED***
                    // If forms are laid out as table rows, insert the
                    // "add" button in a new table row:
                    var numCols = this.eq(-1).children().length;
                    $parent.append('<tr class="' + options.addCssClass + '"><td colspan="' + numCols + '"><a href="#">' + options.addText + "</a></tr>");
                    addButton = $parent.find("tr:last a");
                ***REMOVED*** else ***REMOVED***
                    // Otherwise, insert it immediately after the last form:
                    $this.filter(":last").after('<div class="' + options.addCssClass + '"><a href="#">' + options.addText + "</a></div>");
                    addButton = $this.filter(":last").next().find("a");
                ***REMOVED***
            ***REMOVED***
            addButton.on('click', function(e) ***REMOVED***
                e.preventDefault();
                var template = $("#" + options.prefix + "-empty");
                var row = template.clone(true);
                row.removeClass(options.emptyCssClass)
                .addClass(options.formCssClass)
                .attr("id", options.prefix + "-" + nextIndex);
                if (row.is("tr")) ***REMOVED***
                    // If the forms are laid out in table rows, insert
                    // the remove button into the last table cell:
                    row.children(":last").append('<div><a class="' + options.deleteCssClass + '" href="#">' + options.deleteText + "</a></div>");
                ***REMOVED*** else if (row.is("ul") || row.is("ol")) ***REMOVED***
                    // If they're laid out as an ordered/unordered list,
                    // insert an <li> after the last list item:
                    row.append('<li><a class="' + options.deleteCssClass + '" href="#">' + options.deleteText + "</a></li>");
                ***REMOVED*** else ***REMOVED***
                    // Otherwise, just insert the remove button as the
                    // last child element of the form's container:
                    row.children(":first").append('<span><a class="' + options.deleteCssClass + '" href="#">' + options.deleteText + "</a></span>");
                ***REMOVED***
                row.find("*").each(function() ***REMOVED***
                    updateElementIndex(this, options.prefix, totalForms.val());
                ***REMOVED***);
                // Insert the new form when it has been fully edited
                row.insertBefore($(template));
                // Update number of total forms
                $(totalForms).val(parseInt(totalForms.val(), 10) + 1);
                nextIndex += 1;
                // Hide add button in case we've hit the max, except we want to add infinitely
                if ((maxForms.val() !== '') && (maxForms.val() - totalForms.val()) <= 0) ***REMOVED***
                    addButton.parent().hide();
                ***REMOVED***
                // The delete button of each row triggers a bunch of other things
                row.find("a." + options.deleteCssClass).on('click', function(e1) ***REMOVED***
                    e1.preventDefault();
                    // Remove the parent form containing this button:
                    row.remove();
                    nextIndex -= 1;
                    // If a post-delete callback was provided, call it with the deleted form:
                    if (options.removed) ***REMOVED***
                        options.removed(row);
                    ***REMOVED***
                    $(document).trigger('formset:removed', [row, options.prefix]);
                    // Update the TOTAL_FORMS form count.
                    var forms = $("." + options.formCssClass);
                    $("#id_" + options.prefix + "-TOTAL_FORMS").val(forms.length);
                    // Show add button again once we drop below max
                    if ((maxForms.val() === '') || (maxForms.val() - forms.length) > 0) ***REMOVED***
                        addButton.parent().show();
                    ***REMOVED***
                    // Also, update names and ids for all remaining form controls
                    // so they remain in sequence:
                    var i, formCount;
                    var updateElementCallback = function() ***REMOVED***
                        updateElementIndex(this, options.prefix, i);
                    ***REMOVED***;
                    for (i = 0, formCount = forms.length; i < formCount; i++) ***REMOVED***
                        updateElementIndex($(forms).get(i), options.prefix, i);
                        $(forms.get(i)).find("*").each(updateElementCallback);
                    ***REMOVED***
                ***REMOVED***);
                // If a post-add callback was supplied, call it with the added form:
                if (options.added) ***REMOVED***
                    options.added(row);
                ***REMOVED***
                $(document).trigger('formset:added', [row, options.prefix]);
            ***REMOVED***);
        ***REMOVED***
        return this;
    ***REMOVED***;

    /* Setup plugin defaults */
    $.fn.formset.defaults = ***REMOVED***
        prefix: "form",          // The form prefix for your django formset
        addText: "add another",      // Text for the add link
        deleteText: "remove",      // Text for the delete link
        addCssClass: "add-row",      // CSS class applied to the add link
        deleteCssClass: "delete-row",  // CSS class applied to the delete link
        emptyCssClass: "empty-row",    // CSS class applied to the empty row
        formCssClass: "dynamic-form",  // CSS class applied to each form in a formset
        added: null,          // Function called each time a new form is added
        removed: null,          // Function called each time a form is deleted
        addButton: null       // Existing add button to use
    ***REMOVED***;


    // Tabular inlines ---------------------------------------------------------
    $.fn.tabularFormset = function(selector, options) ***REMOVED***
        var $rows = $(this);
        var alternatingRows = function(row) ***REMOVED***
            $(selector).not(".add-row").removeClass("row1 row2")
            .filter(":even").addClass("row1").end()
            .filter(":odd").addClass("row2");
        ***REMOVED***;

        var reinitDateTimeShortCuts = function() ***REMOVED***
            // Reinitialize the calendar and clock widgets by force
            if (typeof DateTimeShortcuts !== "undefined") ***REMOVED***
                $(".datetimeshortcuts").remove();
                DateTimeShortcuts.init();
            ***REMOVED***
        ***REMOVED***;

        var updateSelectFilter = function() ***REMOVED***
            // If any SelectFilter widgets are a part of the new form,
            // instantiate a new SelectFilter instance for it.
            if (typeof SelectFilter !== 'undefined') ***REMOVED***
                $('.selectfilter').each(function(index, value) ***REMOVED***
                    var namearr = value.name.split('-');
                    SelectFilter.init(value.id, namearr[namearr.length - 1], false);
                ***REMOVED***);
                $('.selectfilterstacked').each(function(index, value) ***REMOVED***
                    var namearr = value.name.split('-');
                    SelectFilter.init(value.id, namearr[namearr.length - 1], true);
                ***REMOVED***);
            ***REMOVED***
        ***REMOVED***;

        var initPrepopulatedFields = function(row) ***REMOVED***
            row.find('.prepopulated_field').each(function() ***REMOVED***
                var field = $(this),
                    input = field.find('input, select, textarea'),
                    dependency_list = input.data('dependency_list') || [],
                    dependencies = [];
                $.each(dependency_list, function(i, field_name) ***REMOVED***
                    dependencies.push('#' + row.find('.field-' + field_name).find('input, select, textarea').attr('id'));
                ***REMOVED***);
                if (dependencies.length) ***REMOVED***
                    input.prepopulate(dependencies, input.attr('maxlength'));
                ***REMOVED***
            ***REMOVED***);
        ***REMOVED***;

        $rows.formset(***REMOVED***
            prefix: options.prefix,
            addText: options.addText,
            formCssClass: "dynamic-" + options.prefix,
            deleteCssClass: "inline-deletelink",
            deleteText: options.deleteText,
            emptyCssClass: "empty-form",
            removed: alternatingRows,
            added: function(row) ***REMOVED***
                initPrepopulatedFields(row);
                reinitDateTimeShortCuts();
                updateSelectFilter();
                alternatingRows(row);
            ***REMOVED***,
            addButton: options.addButton
        ***REMOVED***);

        return $rows;
    ***REMOVED***;

    // Stacked inlines ---------------------------------------------------------
    $.fn.stackedFormset = function(selector, options) ***REMOVED***
        var $rows = $(this);
        var updateInlineLabel = function(row) ***REMOVED***
            $(selector).find(".inline_label").each(function(i) ***REMOVED***
                var count = i + 1;
                $(this).html($(this).html().replace(/(#\d+)/g, "#" + count));
            ***REMOVED***);
        ***REMOVED***;

        var reinitDateTimeShortCuts = function() ***REMOVED***
            // Reinitialize the calendar and clock widgets by force, yuck.
            if (typeof DateTimeShortcuts !== "undefined") ***REMOVED***
                $(".datetimeshortcuts").remove();
                DateTimeShortcuts.init();
            ***REMOVED***
        ***REMOVED***;

        var updateSelectFilter = function() ***REMOVED***
            // If any SelectFilter widgets were added, instantiate a new instance.
            if (typeof SelectFilter !== "undefined") ***REMOVED***
                $(".selectfilter").each(function(index, value) ***REMOVED***
                    var namearr = value.name.split('-');
                    SelectFilter.init(value.id, namearr[namearr.length - 1], false);
                ***REMOVED***);
                $(".selectfilterstacked").each(function(index, value) ***REMOVED***
                    var namearr = value.name.split('-');
                    SelectFilter.init(value.id, namearr[namearr.length - 1], true);
                ***REMOVED***);
            ***REMOVED***
        ***REMOVED***;

        var initPrepopulatedFields = function(row) ***REMOVED***
            row.find('.prepopulated_field').each(function() ***REMOVED***
                var field = $(this),
                    input = field.find('input, select, textarea'),
                    dependency_list = input.data('dependency_list') || [],
                    dependencies = [];
                $.each(dependency_list, function(i, field_name) ***REMOVED***
                    dependencies.push('#' + row.find('.form-row .field-' + field_name).find('input, select, textarea').attr('id'));
                ***REMOVED***);
                if (dependencies.length) ***REMOVED***
                    input.prepopulate(dependencies, input.attr('maxlength'));
                ***REMOVED***
            ***REMOVED***);
        ***REMOVED***;

        $rows.formset(***REMOVED***
            prefix: options.prefix,
            addText: options.addText,
            formCssClass: "dynamic-" + options.prefix,
            deleteCssClass: "inline-deletelink",
            deleteText: options.deleteText,
            emptyCssClass: "empty-form",
            removed: updateInlineLabel,
            added: function(row) ***REMOVED***
                initPrepopulatedFields(row);
                reinitDateTimeShortCuts();
                updateSelectFilter();
                updateInlineLabel(row);
            ***REMOVED***,
            addButton: options.addButton
        ***REMOVED***);

        return $rows;
    ***REMOVED***;

    $(document).ready(function() ***REMOVED***
        $(".js-inline-admin-formset").each(function() ***REMOVED***
            var data = $(this).data(),
                inlineOptions = data.inlineFormset,
                selector;
            switch(data.inlineType) ***REMOVED***
            case "stacked":
                selector = inlineOptions.name + "-group .inline-related";
                $(selector).stackedFormset(selector, inlineOptions.options);
                break;
            case "tabular":
                selector = inlineOptions.name + "-group .tabular.inline-related tbody:first > tr";
                $(selector).tabularFormset(selector, inlineOptions.options);
                break;
            ***REMOVED***
        ***REMOVED***);
    ***REMOVED***);
***REMOVED***)(django.jQuery);
