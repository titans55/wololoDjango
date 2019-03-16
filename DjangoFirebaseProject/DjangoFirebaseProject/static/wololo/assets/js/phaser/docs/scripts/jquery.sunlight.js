/**
 * jQuery plugin for Sunlight http://sunlightjs.com/
 *
 * by Tommy Montgomery http://tmont.com/
 * licensed under WTFPL http://sam.zoy.org/wtfpl/
 */
(function($, window)***REMOVED***
	
	$.fn.sunlight = function(options) ***REMOVED***
		var highlighter = new window.Sunlight.Highlighter(options);
		this.each(function() ***REMOVED***
			highlighter.highlightNode(this);
		***REMOVED***);
		
		return this;
	***REMOVED***;
	
***REMOVED***(jQuery, this));