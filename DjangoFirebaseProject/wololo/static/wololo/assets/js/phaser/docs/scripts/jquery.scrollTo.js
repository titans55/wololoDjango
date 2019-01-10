/*!
 * jQuery.ScrollTo
 * Copyright (c) 2007-2013 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 *
 * @projectDescription Easy element scrolling using jQuery.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @author Ariel Flesler
 * @version 1.4.5
 *
 * @id jQuery.scrollTo
 * @id jQuery.fn.scrollTo
 * @param ***REMOVED***String, Number, DOMElement, jQuery, Object***REMOVED*** target Where to scroll the matched elements.
 *	  The different options for target are:
 *		- A number position (will be applied to all axes).
 *		- A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *		- A jQuery/DOM element ( logically, child of the element to scroll )
 *		- A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *		- A hash ***REMOVED*** top:x, left:y ***REMOVED***, x and y can be any kind of number/string like above.
 *		- A percentage of the container's dimension/s, for example: 50% to go to the middle.
 *		- The string 'max' for go-to-end. 
 * @param ***REMOVED***Number, Function***REMOVED*** duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param ***REMOVED***Object,Function***REMOVED*** settings Optional set of settings or the onAfter callback.
 *	 @option ***REMOVED***String***REMOVED*** axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *	 @option ***REMOVED***Number, Function***REMOVED*** duration The OVERALL length of the animation.
 *	 @option ***REMOVED***String***REMOVED*** easing The easing method for the animation.
 *	 @option ***REMOVED***Boolean***REMOVED*** margin If true, the margin of the target element will be deducted from the final position.
 *	 @option ***REMOVED***Object, Number***REMOVED*** offset Add/deduct from the end position. One number for both axes or ***REMOVED*** top:x, left:y ***REMOVED***.
 *	 @option ***REMOVED***Object, Number***REMOVED*** over Add/deduct the height/width multiplied by 'over', can be ***REMOVED*** top:x, left:y ***REMOVED*** when using both axes.
 *	 @option ***REMOVED***Boolean***REMOVED*** queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *	 @option ***REMOVED***Function***REMOVED*** onAfter Function to be called after the scrolling ends. 
 *	 @option ***REMOVED***Function***REMOVED*** onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
 * @return ***REMOVED***jQuery***REMOVED*** Returns the same jQuery object, for chaining.
 *
 * @desc Scroll to a fixed position
 * @example $('div').scrollTo( 340 );
 *
 * @desc Scroll relatively to the actual position
 * @example $('div').scrollTo( '+=340px', ***REMOVED*** axis:'y' ***REMOVED*** );
 *
 * @desc Scroll using a selector (relative to the scrolled element)
 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, ***REMOVED*** easing:'swing', queue:true, axis:'xy' ***REMOVED*** );
 *
 * @desc Scroll to a DOM element (same for jQuery object)
 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
 *			$('#container').scrollTo( second_child, ***REMOVED*** duration:500, axis:'x', onAfter:function()***REMOVED***
 *				alert('scrolled!!');																   
 *			***REMOVED******REMOVED***);
 *
 * @desc Scroll on both axes, to different values
 * @example $('div').scrollTo( ***REMOVED*** top: 300, left:'+=200' ***REMOVED***, ***REMOVED*** axis:'xy', offset:-20 ***REMOVED*** );
 */

;(function( $ )***REMOVED***
	
	var $scrollTo = $.scrollTo = function( target, duration, settings )***REMOVED***
		$(window).scrollTo( target, duration, settings );
	***REMOVED***;

	$scrollTo.defaults = ***REMOVED***
		axis:'xy',
		duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
		limit:true
	***REMOVED***;

	// Returns the element that needs to be animated to scroll the window.
	// Kept for backwards compatibility (specially for localScroll & serialScroll)
	$scrollTo.window = function( scope )***REMOVED***
		return $(window)._scrollable();
	***REMOVED***;

	// Hack, hack, hack :)
	// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
	$.fn._scrollable = function()***REMOVED***
		return this.map(function()***REMOVED***
			var elem = this,
				isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

				if( !isWin )
					return elem;

			var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
			
			return /webkit/i.test(navigator.userAgent) || doc.compatMode == 'BackCompat' ?
				doc.body : 
				doc.documentElement;
		***REMOVED***);
	***REMOVED***;

	$.fn.scrollTo = function( target, duration, settings )***REMOVED***
		if( typeof duration == 'object' )***REMOVED***
			settings = duration;
			duration = 0;
		***REMOVED***
		if( typeof settings == 'function' )
			settings = ***REMOVED*** onAfter:settings ***REMOVED***;
			
		if( target == 'max' )
			target = 9e9;
			
		settings = $.extend( ***REMOVED******REMOVED***, $scrollTo.defaults, settings );
		// Speed is still recognized for backwards compatibility
		duration = duration || settings.duration;
		// Make sure the settings are given right
		settings.queue = settings.queue && settings.axis.length > 1;
		
		if( settings.queue )
			// Let's keep the overall duration
			duration /= 2;
		settings.offset = both( settings.offset );
		settings.over = both( settings.over );

		return this._scrollable().each(function()***REMOVED***
			// Null target yields nothing, just like jQuery does
			if (target == null) return;

			var elem = this,
				$elem = $(elem),
				targ = target, toff, attr = ***REMOVED******REMOVED***,
				win = $elem.is('html,body');

			switch( typeof targ )***REMOVED***
				// A number will pass the regex
				case 'number':
				case 'string':
					if( /^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ) )***REMOVED***
						targ = both( targ );
						// We are done
						break;
					***REMOVED***
					// Relative selector, no break!
					targ = $(targ,this);
					if (!targ.length) return;
				case 'object':
					// DOMElement / jQuery
					if( targ.is || targ.style )
						// Get the real position of the target 
						toff = (targ = $(targ)).offset();
			***REMOVED***
			$.each( settings.axis.split(''), function( i, axis )***REMOVED***
				var Pos	= axis == 'x' ? 'Left' : 'Top',
					pos = Pos.toLowerCase(),
					key = 'scroll' + Pos,
					old = elem[key],
					max = $scrollTo.max(elem, axis);

				if( toff )***REMOVED***// jQuery / DOMElement
					attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

					// If it's a dom element, reduce the margin
					if( settings.margin )***REMOVED***
						attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
						attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
					***REMOVED***
					
					attr[key] += settings.offset[pos] || 0;
					
					if( settings.over[pos] )
						// Scroll to a fraction of its width/height
						attr[key] += targ[axis=='x'?'width':'height']() * settings.over[pos];
				***REMOVED***else***REMOVED*** 
					var val = targ[pos];
					// Handle percentage values
					attr[key] = val.slice && val.slice(-1) == '%' ? 
						parseFloat(val) / 100 * max
						: val;
				***REMOVED***

				// Number or 'number'
				if( settings.limit && /^\d+$/.test(attr[key]) )
					// Check the limits
					attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max );

				// Queueing axes
				if( !i && settings.queue )***REMOVED***
					// Don't waste time animating, if there's no need.
					if( old != attr[key] )
						// Intermediate animation
						animate( settings.onAfterFirst );
					// Don't animate this axis again in the next iteration.
					delete attr[key];
				***REMOVED***
			***REMOVED***);

			animate( settings.onAfter );			

			function animate( callback )***REMOVED***
				$elem.animate( attr, duration, settings.easing, callback && function()***REMOVED***
					callback.call(this, target, settings);
				***REMOVED***);
			***REMOVED***;

		***REMOVED***).end();
	***REMOVED***;
	
	// Max scrolling position, works on quirks mode
	// It only fails (not too badly) on IE, quirks mode.
	$scrollTo.max = function( elem, axis )***REMOVED***
		var Dim = axis == 'x' ? 'Width' : 'Height',
			scroll = 'scroll'+Dim;
		
		if( !$(elem).is('html,body') )
			return elem[scroll] - $(elem)[Dim.toLowerCase()]();
		
		var size = 'client' + Dim,
			html = elem.ownerDocument.documentElement,
			body = elem.ownerDocument.body;

		return Math.max( html[scroll], body[scroll] ) 
			 - Math.min( html[size]  , body[size]   );
	***REMOVED***;

	function both( val )***REMOVED***
		return typeof val == 'object' ? val : ***REMOVED*** top:val, left:val ***REMOVED***;
	***REMOVED***;

***REMOVED***)( jQuery );