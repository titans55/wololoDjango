(function($) ***REMOVED***
    $.fn.toc = function(options) ***REMOVED***
        var self = this;
        var opts = $.extend(***REMOVED******REMOVED***, jQuery.fn.toc.defaults, options);

        var container = $(opts.container);
        var headings = $(opts.selectors, container);
        var headingOffsets = [];
        var activeClassName = opts.prefix + '-active';
        var navbarHeight = $('.navbar').height();

        var scrollTo = function(e) ***REMOVED***
            if (opts.smoothScrolling) ***REMOVED***
                e.preventDefault();
                var elScrollTo = $(e.target).attr('href');
                var $el = $(elScrollTo);
                var offsetTop = $el.offset().top - navbarHeight;

                $('body,html').animate(***REMOVED***
                    scrollTop: offsetTop
                ***REMOVED***, 400, 'swing', function() ***REMOVED***
                    location.hash = elScrollTo;
                ***REMOVED***);
            ***REMOVED***
            $('li', self).removeClass(activeClassName);
            $(e.target).parent().addClass(activeClassName);
        ***REMOVED***;

        //highlight on scroll
        var timeout;
        var highlightOnScroll = function(e) ***REMOVED***
            if (timeout) ***REMOVED***
                clearTimeout(timeout);
            ***REMOVED***
            timeout = setTimeout(function() ***REMOVED***
                var top = $(window).scrollTop(),
                    highlighted;
                for (var i = 0, c = headingOffsets.length; i < c; i++) ***REMOVED***
                    if (headingOffsets[i] >= top) ***REMOVED***
                        $('li', self).removeClass(activeClassName);
                        if (i > 0) ***REMOVED***
                            highlighted = $('li:eq(' + (i - 1) + ')', self).addClass(activeClassName);
                            opts.onHighlight(highlighted);
                        ***REMOVED***
                        break;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***, 50);
        ***REMOVED***;
        if (opts.highlightOnScroll) ***REMOVED***
            $(window).bind('scroll', highlightOnScroll);
            highlightOnScroll();
        ***REMOVED***

        return this.each(function() ***REMOVED***
            //build TOC
            var el = $(this);
            var ul = $('<ul/>');
            headings.each(function(i, heading) ***REMOVED***
                var $h = $(heading);
                headingOffsets.push($h.offset().top - opts.highlightOffset);

                //add anchor
                var anchor = $('<span/>').attr('id', opts.anchorName(i, heading, opts.prefix)).insertBefore($h);

                //build TOC item
                var a = $('<a/>')
                    .text(opts.headerText(i, heading, $h))
                    .attr('href', '#' + opts.anchorName(i, heading, opts.prefix))
                    .bind('click', function(e) ***REMOVED***
                        scrollTo(e);
                        el.trigger('selected', $(this).attr('href'));
                    ***REMOVED***);

                var li = $('<li/>')
                    .addClass(opts.itemClass(i, heading, $h, opts.prefix))
                    .append(a);

                ul.append(li);
            ***REMOVED***);
            el.html(ul);
        ***REMOVED***);
    ***REMOVED***;


    jQuery.fn.toc.defaults = ***REMOVED***
        container: 'body',
        selectors: 'h1,h2,h3',
        smoothScrolling: true,
        prefix: 'toc',
        onHighlight: function() ***REMOVED******REMOVED***,
        highlightOnScroll: true,
        highlightOffset: 100,
        anchorName: function(i, heading, prefix) ***REMOVED***
            return prefix + i;
        ***REMOVED***,
        headerText: function(i, heading, $heading) ***REMOVED***
            return $heading.text();
        ***REMOVED***,
        itemClass: function(i, heading, $heading, prefix) ***REMOVED***
            return prefix + '-' + $heading[0].tagName.toLowerCase();
        ***REMOVED***

    ***REMOVED***;

***REMOVED***)(jQuery);