(function($) ***REMOVED***
    'use strict';
    var SelectBox = ***REMOVED***
        cache: ***REMOVED******REMOVED***,
        init: function(id) ***REMOVED***
            var box = document.getElementById(id);
            var node;
            SelectBox.cache[id] = [];
            var cache = SelectBox.cache[id];
            var boxOptions = box.options;
            var boxOptionsLength = boxOptions.length;
            for (var i = 0, j = boxOptionsLength; i < j; i++) ***REMOVED***
                node = boxOptions[i];
                cache.push(***REMOVED***value: node.value, text: node.text, displayed: 1***REMOVED***);
            ***REMOVED***
        ***REMOVED***,
        redisplay: function(id) ***REMOVED***
            // Repopulate HTML select box from cache
            var box = document.getElementById(id);
            var node;
            $(box).empty(); // clear all options
            var new_options = box.outerHTML.slice(0, -9);  // grab just the opening tag
            var cache = SelectBox.cache[id];
            for (var i = 0, j = cache.length; i < j; i++) ***REMOVED***
                node = cache[i];
                if (node.displayed) ***REMOVED***
                    var new_option = new Option(node.text, node.value, false, false);
                    // Shows a tooltip when hovering over the option
                    new_option.setAttribute("title", node.text);
                    new_options += new_option.outerHTML;
                ***REMOVED***
            ***REMOVED***
            new_options += '</select>';
            box.outerHTML = new_options;
        ***REMOVED***,
        filter: function(id, text) ***REMOVED***
            // Redisplay the HTML select box, displaying only the choices containing ALL
            // the words in text. (It's an AND search.)
            var tokens = text.toLowerCase().split(/\s+/);
            var node, token;
            var cache = SelectBox.cache[id];
            for (var i = 0, j = cache.length; i < j; i++) ***REMOVED***
                node = cache[i];
                node.displayed = 1;
                var node_text = node.text.toLowerCase();
                var numTokens = tokens.length;
                for (var k = 0; k < numTokens; k++) ***REMOVED***
                    token = tokens[k];
                    if (node_text.indexOf(token) === -1) ***REMOVED***
                        node.displayed = 0;
                        break;  // Once the first token isn't found we're done
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
            SelectBox.redisplay(id);
        ***REMOVED***,
        delete_from_cache: function(id, value) ***REMOVED***
            var node, delete_index = null;
            var cache = SelectBox.cache[id];
            for (var i = 0, j = cache.length; i < j; i++) ***REMOVED***
                node = cache[i];
                if (node.value === value) ***REMOVED***
                    delete_index = i;
                    break;
                ***REMOVED***
            ***REMOVED***
            cache.splice(delete_index, 1);
        ***REMOVED***,
        add_to_cache: function(id, option) ***REMOVED***
            SelectBox.cache[id].push(***REMOVED***value: option.value, text: option.text, displayed: 1***REMOVED***);
        ***REMOVED***,
        cache_contains: function(id, value) ***REMOVED***
            // Check if an item is contained in the cache
            var node;
            var cache = SelectBox.cache[id];
            for (var i = 0, j = cache.length; i < j; i++) ***REMOVED***
                node = cache[i];
                if (node.value === value) ***REMOVED***
                    return true;
                ***REMOVED***
            ***REMOVED***
            return false;
        ***REMOVED***,
        move: function(from, to) ***REMOVED***
            var from_box = document.getElementById(from);
            var option;
            var boxOptions = from_box.options;
            var boxOptionsLength = boxOptions.length;
            for (var i = 0, j = boxOptionsLength; i < j; i++) ***REMOVED***
                option = boxOptions[i];
                var option_value = option.value;
                if (option.selected && SelectBox.cache_contains(from, option_value)) ***REMOVED***
                    SelectBox.add_to_cache(to, ***REMOVED***value: option_value, text: option.text, displayed: 1***REMOVED***);
                    SelectBox.delete_from_cache(from, option_value);
                ***REMOVED***
            ***REMOVED***
            SelectBox.redisplay(from);
            SelectBox.redisplay(to);
        ***REMOVED***,
        move_all: function(from, to) ***REMOVED***
            var from_box = document.getElementById(from);
            var option;
            var boxOptions = from_box.options;
            var boxOptionsLength = boxOptions.length;
            for (var i = 0, j = boxOptionsLength; i < j; i++) ***REMOVED***
                option = boxOptions[i];
                var option_value = option.value;
                if (SelectBox.cache_contains(from, option_value)) ***REMOVED***
                    SelectBox.add_to_cache(to, ***REMOVED***value: option_value, text: option.text, displayed: 1***REMOVED***);
                    SelectBox.delete_from_cache(from, option_value);
                ***REMOVED***
            ***REMOVED***
            SelectBox.redisplay(from);
            SelectBox.redisplay(to);
        ***REMOVED***,
        sort: function(id) ***REMOVED***
            SelectBox.cache[id].sort(function(a, b) ***REMOVED***
                a = a.text.toLowerCase();
                b = b.text.toLowerCase();
                try ***REMOVED***
                    if (a > b) ***REMOVED***
                        return 1;
                    ***REMOVED***
                    if (a < b) ***REMOVED***
                        return -1;
                    ***REMOVED***
                ***REMOVED***
                catch (e) ***REMOVED***
                    // silently fail on IE 'unknown' exception
                ***REMOVED***
                return 0;
            ***REMOVED*** );
        ***REMOVED***,
        select_all: function(id) ***REMOVED***
            var box = document.getElementById(id);
            var boxOptions = box.options;
            var boxOptionsLength = boxOptions.length;
            for (var i = 0; i < boxOptionsLength; i++) ***REMOVED***
                boxOptions[i].selected = 'selected';
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***;
    window.SelectBox = SelectBox;
***REMOVED***)(django.jQuery);
