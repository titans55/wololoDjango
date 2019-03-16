/*!
 * jQuery.LocalScroll
 * Copyright (c) 2007-2013 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * http://flesler.blogspot.com/2007/10/jquerylocalscroll-10.html
 * @author Ariel Flesler
 * @version 1.2.8
 *
 * @id jQuery.fn.localScroll
 * @param ***REMOVED***Object***REMOVED*** settings Hash of settings, it is passed in to jQuery.ScrollTo, none is required.
 * @return ***REMOVED***jQuery***REMOVED*** Returns the same jQuery object, for chaining.
 *
 * @example $('ul.links').localScroll();
 *
 * @example $('ul.links').localScroll(***REMOVED*** filter:'.animated', duration:400, axis:'x' ***REMOVED***);
 *
 * @example $.localScroll(***REMOVED*** target:'#pane', axis:'xy', queue:true, event:'mouseover' ***REMOVED***);
 *
 * Notes:
 *	- The plugin requires jQuery.ScrollTo.
 *	- The hash of settings, is passed to jQuery.ScrollTo, so the settings are valid for that plugin as well.
 *	- jQuery.localScroll can be used if the desired links, are all over the document, it accepts the same settings.
 *  - If the setting 'lazy' is set to true, then the binding will still work for later added anchors.
 *	- If onBefore returns false, the event is ignored.
 */
;(function( $ )***REMOVED***
	var URI = location.href.replace(/#.*/,''); // local url without hash

	var $localScroll = $.localScroll = function( settings )***REMOVED***
		$('body').localScroll( settings );
	***REMOVED***;

	// Many of these defaults, belong to jQuery.ScrollTo, check it's demo for an example of each option.
	// @see http://flesler.demos.com/jquery/scrollTo/
	// The defaults are public and can be overriden.
	$localScroll.defaults = ***REMOVED***
		duration:1000, // How long to animate.
		axis:'y', // Which of top and left should be modified.
		event:'click', // On which event to react.
		stop:true, // Avoid queuing animations 
		target: window, // What to scroll (selector or element). The whole window by default.
		reset: true // Used by $.localScroll.hash. If true, elements' scroll is resetted before actual scrolling
		/*
		lock:false, // ignore events if already animating
		lazy:false, // if true, links can be added later, and will still work.
		filter:null, // filter some anchors out of the matched elements.
		hash: false // if true, the hash of the selected link, will appear on the address bar.
		*/
	***REMOVED***;

	// If the URL contains a hash, it will scroll to the pointed element
	$localScroll.hash = function( settings )***REMOVED***
		if( location.hash )***REMOVED***
			settings = $.extend( ***REMOVED******REMOVED***, $localScroll.defaults, settings );
			settings.hash = false; // can't be true
			
			if( settings.reset )***REMOVED***
				var d = settings.duration;
				delete settings.duration;
				$(settings.target).scrollTo( 0, settings );
				settings.duration = d;
			***REMOVED***
			scroll( 0, location, settings );
		***REMOVED***
	***REMOVED***;

	$.fn.localScroll = function( settings )***REMOVED***
		settings = $.extend( ***REMOVED******REMOVED***, $localScroll.defaults, settings );

		return settings.lazy ?
			// use event delegation, more links can be added later.		
			this.bind( settings.event, function( e )***REMOVED***
				// Could use closest(), but that would leave out jQuery -1.3.x
				var a = $([e.target, e.target.parentNode]).filter(filter)[0];
				// if a valid link was clicked
				if( a )
					scroll( e, a, settings ); // do scroll.
			***REMOVED***) :
			// bind concretely, to each matching link
			this.find('a,area')
				.filter( filter ).bind( settings.event, function(e)***REMOVED***
					scroll( e, this, settings );
				***REMOVED***).end()
			.end();

		function filter()***REMOVED***// is this a link that points to an anchor and passes a possible filter ? href is checked to avoid a bug in FF.
			return !!this.href && !!this.hash && this.href.replace(this.hash,'') == URI && (!settings.filter || $(this).is( settings.filter ));
		***REMOVED***;
	***REMOVED***;

	function scroll( e, link, settings )***REMOVED***
		var id = link.hash.slice(1),
			elem = document.getElementById(id) || document.getElementsByName(id)[0];

		if ( !elem )
			return;

		if( e )
			e.preventDefault();

		var $target = $( settings.target );

		if( settings.lock && $target.is(':animated') ||
			settings.onBefore && settings.onBefore(e, elem, $target) === false ) 
			return;

		if( settings.stop )
			$target._scrollable().stop(true); // remove all its animations

		if( settings.hash )***REMOVED***
			var attr = elem.id == id ? 'id' : 'name',
				$a = $('<a> </a>').attr(attr, id).css(***REMOVED***
					position:'absolute',
					top: $(window).scrollTop(),
					left: $(window).scrollLeft()
				***REMOVED***);

			elem[attr] = '';
			$('body').prepend($a);
			location = link.hash;
			$a.remove();
			elem[attr] = id;
		***REMOVED***
			
		$target
			.scrollTo( elem, settings ) // do scroll
			.trigger('notify.serialScroll',[elem]); // notify serialScroll about this change
	***REMOVED***;

***REMOVED***)( jQuery );