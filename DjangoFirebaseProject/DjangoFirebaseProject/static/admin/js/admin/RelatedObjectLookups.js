/*global SelectBox, interpolate*/
// Handles related-objects functionality: lookup link for raw_id_fields
// and Add Another links.

(function($) ***REMOVED***
    'use strict';

    // IE doesn't accept periods or dashes in the window name, but the element IDs
    // we use to generate popup window names may contain them, therefore we map them
    // to allowed characters in a reversible way so that we can locate the correct
    // element when the popup window is dismissed.
    function id_to_windowname(text) ***REMOVED***
        text = text.replace(/\./g, '__dot__');
        text = text.replace(/\-/g, '__dash__');
        return text;
    ***REMOVED***

    function windowname_to_id(text) ***REMOVED***
        text = text.replace(/__dot__/g, '.');
        text = text.replace(/__dash__/g, '-');
        return text;
    ***REMOVED***

    function showAdminPopup(triggeringLink, name_regexp, add_popup) ***REMOVED***
        var name = triggeringLink.id.replace(name_regexp, '');
        name = id_to_windowname(name);
        var href = triggeringLink.href;
        if (add_popup) ***REMOVED***
            if (href.indexOf('?') === -1) ***REMOVED***
                href += '?_popup=1';
            ***REMOVED*** else ***REMOVED***
                href += '&_popup=1';
            ***REMOVED***
        ***REMOVED***
        var win = window.open(href, name, 'height=500,width=800,resizable=yes,scrollbars=yes');
        win.focus();
        return false;
    ***REMOVED***

    function showRelatedObjectLookupPopup(triggeringLink) ***REMOVED***
        return showAdminPopup(triggeringLink, /^lookup_/, true);
    ***REMOVED***

    function dismissRelatedLookupPopup(win, chosenId) ***REMOVED***
        var name = windowname_to_id(win.name);
        var elem = document.getElementById(name);
        if (elem.className.indexOf('vManyToManyRawIdAdminField') !== -1 && elem.value) ***REMOVED***
            elem.value += ',' + chosenId;
        ***REMOVED*** else ***REMOVED***
            document.getElementById(name).value = chosenId;
        ***REMOVED***
        win.close();
    ***REMOVED***

    function showRelatedObjectPopup(triggeringLink) ***REMOVED***
        return showAdminPopup(triggeringLink, /^(change|add|delete)_/, false);
    ***REMOVED***

    function updateRelatedObjectLinks(triggeringLink) ***REMOVED***
        var $this = $(triggeringLink);
        var siblings = $this.nextAll('.view-related, .change-related, .delete-related');
        if (!siblings.length) ***REMOVED***
            return;
        ***REMOVED***
        var value = $this.val();
        if (value) ***REMOVED***
            siblings.each(function() ***REMOVED***
                var elm = $(this);
                elm.attr('href', elm.attr('data-href-template').replace('__fk__', value));
            ***REMOVED***);
        ***REMOVED*** else ***REMOVED***
            siblings.removeAttr('href');
        ***REMOVED***
    ***REMOVED***

    function dismissAddRelatedObjectPopup(win, newId, newRepr) ***REMOVED***
        var name = windowname_to_id(win.name);
        var elem = document.getElementById(name);
        if (elem) ***REMOVED***
            var elemName = elem.nodeName.toUpperCase();
            if (elemName === 'SELECT') ***REMOVED***
                elem.options[elem.options.length] = new Option(newRepr, newId, true, true);
            ***REMOVED*** else if (elemName === 'INPUT') ***REMOVED***
                if (elem.className.indexOf('vManyToManyRawIdAdminField') !== -1 && elem.value) ***REMOVED***
                    elem.value += ',' + newId;
                ***REMOVED*** else ***REMOVED***
                    elem.value = newId;
                ***REMOVED***
            ***REMOVED***
            // Trigger a change event to update related links if required.
            $(elem).trigger('change');
        ***REMOVED*** else ***REMOVED***
            var toId = name + "_to";
            var o = new Option(newRepr, newId);
            SelectBox.add_to_cache(toId, o);
            SelectBox.redisplay(toId);
        ***REMOVED***
        win.close();
    ***REMOVED***

    function dismissChangeRelatedObjectPopup(win, objId, newRepr, newId) ***REMOVED***
        var id = windowname_to_id(win.name).replace(/^edit_/, '');
        var selectsSelector = interpolate('#%s, #%s_from, #%s_to', [id, id, id]);
        var selects = $(selectsSelector);
        selects.find('option').each(function() ***REMOVED***
            if (this.value === objId) ***REMOVED***
                this.textContent = newRepr;
                this.value = newId;
            ***REMOVED***
        ***REMOVED***);
        selects.next().find('.select2-selection__rendered').each(function() ***REMOVED***
            // The element can have a clear button as a child.
            // Use the lastChild to modify only the displayed value.
            this.lastChild.textContent = newRepr;
            this.title = newRepr;
        ***REMOVED***);
        win.close();
    ***REMOVED***

    function dismissDeleteRelatedObjectPopup(win, objId) ***REMOVED***
        var id = windowname_to_id(win.name).replace(/^delete_/, '');
        var selectsSelector = interpolate('#%s, #%s_from, #%s_to', [id, id, id]);
        var selects = $(selectsSelector);
        selects.find('option').each(function() ***REMOVED***
            if (this.value === objId) ***REMOVED***
                $(this).remove();
            ***REMOVED***
        ***REMOVED***).trigger('change');
        win.close();
    ***REMOVED***

    // Global for testing purposes
    window.id_to_windowname = id_to_windowname;
    window.windowname_to_id = windowname_to_id;

    window.showRelatedObjectLookupPopup = showRelatedObjectLookupPopup;
    window.dismissRelatedLookupPopup = dismissRelatedLookupPopup;
    window.showRelatedObjectPopup = showRelatedObjectPopup;
    window.updateRelatedObjectLinks = updateRelatedObjectLinks;
    window.dismissAddRelatedObjectPopup = dismissAddRelatedObjectPopup;
    window.dismissChangeRelatedObjectPopup = dismissChangeRelatedObjectPopup;
    window.dismissDeleteRelatedObjectPopup = dismissDeleteRelatedObjectPopup;

    // Kept for backward compatibility
    window.showAddAnotherPopup = showRelatedObjectPopup;
    window.dismissAddAnotherPopup = dismissAddRelatedObjectPopup;

    $(document).ready(function() ***REMOVED***
        $("a[data-popup-opener]").on('click', function(event) ***REMOVED***
            event.preventDefault();
            opener.dismissRelatedLookupPopup(window, $(this).data("popup-opener"));
        ***REMOVED***);
        $('body').on('click', '.related-widget-wrapper-link', function(e) ***REMOVED***
            e.preventDefault();
            if (this.href) ***REMOVED***
                var event = $.Event('django:show-related', ***REMOVED***href: this.href***REMOVED***);
                $(this).trigger(event);
                if (!event.isDefaultPrevented()) ***REMOVED***
                    showRelatedObjectPopup(this);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***);
        $('body').on('change', '.related-widget-wrapper select', function(e) ***REMOVED***
            var event = $.Event('django:update-related');
            $(this).trigger(event);
            if (!event.isDefaultPrevented()) ***REMOVED***
                updateRelatedObjectLinks(this);
            ***REMOVED***
        ***REMOVED***);
        $('.related-widget-wrapper select').trigger('change');
        $('body').on('click', '.related-lookup', function(e) ***REMOVED***
            e.preventDefault();
            var event = $.Event('django:lookup-related');
            $(this).trigger(event);
            if (!event.isDefaultPrevented()) ***REMOVED***
                showRelatedObjectLookupPopup(this);
            ***REMOVED***
        ***REMOVED***);
    ***REMOVED***);

***REMOVED***)(django.jQuery);
