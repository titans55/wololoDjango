/**
 * Sunlight menu plugin
 *
 * This creates the menu in the upper right corner for block-level elements.
 * This plugin is not supported for IE6.
 *
 * Options:
 * 	- showMenu: true/false (default is false)
 * 	- autoCollapse: true/false (default is false)
 */
(function(sunlight, document, undefined)***REMOVED***
	if (sunlight === undefined) ***REMOVED***
		throw "Include sunlight.js before including plugin files";
	***REMOVED***
	
	//http://dean.edwards.name/weblog/2007/03/sniff/#comment83695
	//eval()'d so that it compresses correctly
	var ieVersion = eval("0 /*@cc_on+ScriptEngineMajorVersion()@*/");
	
	function createLink(href, title, text) ***REMOVED***
		var link = document.createElement("a");
		link.setAttribute("href", href);
		link.setAttribute("title", title);
		if (text) ***REMOVED***
			link.appendChild(document.createTextNode(text));
		***REMOVED***
		return link;
	***REMOVED***
	
	function getTextRecursive(node) ***REMOVED***
		var text = "",
			i = 0;
		
		if (node.nodeType === 3) ***REMOVED***
			return node.nodeValue;
		***REMOVED***
		
		text = "";
		for (i = 0; i < node.childNodes.length; i++) ***REMOVED***
			text += getTextRecursive(node.childNodes[i]);
		***REMOVED***
		
		return text;
	***REMOVED***
	
	sunlight.bind("afterHighlightNode", function(context) ***REMOVED***
		var menu,
			sunlightIcon,
			ul,
			collapse,
			mDash,
			collapseLink,
			viewRaw,
			viewRawLink,
			about,
			aboutLink,
			icon;
		
		if ((ieVersion && ieVersion < 7) || !this.options.showMenu || sunlight.util.getComputedStyle(context.node, "display") !== "block") ***REMOVED***
			return;
		***REMOVED***
		
		menu = document.createElement("div");
		menu.className = this.options.classPrefix + "menu";
		
		sunlightIcon = 
			"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJ" +
			"cEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAl0lEQVQ4jWP4" +
			"P9n9PyWYgTYGzAr+///Q9P//Ty/HjhfEETDg1oH/YPDgNKbm4wsIuGBO+H84WJJKhhd2dkA0v3tEZhjcPQox4MVN" +
			"7P7fUEHAgM112DX++Qkx+PEFMqPxwSmIAQenkWHAvCicAUucAbCAfX2PQCCCEtDGKkz86RXEgL39BAwAKcAFbh/6" +
			"/39GIL3yAj0NAAB+LQeDCZ9tvgAAAABJRU5ErkJggg==";
		
		ul = document.createElement("ul");
		
		collapse = document.createElement("li");
		mDash = String.fromCharCode(0x2014);
		collapseLink = createLink("#", "collapse code block", mDash);
		
		collapseLink.onclick = function() ***REMOVED***
			var originalHeight = sunlight.util.getComputedStyle(context.codeContainer, "height"),
				originalOverflow = sunlight.util.getComputedStyle(context.codeContainer, "overflowY");
			
			return function() ***REMOVED***
				var needsToExpand = sunlight.util.getComputedStyle(context.codeContainer, "height") !== originalHeight;
				
				this.replaceChild(document.createTextNode(needsToExpand ? mDash : "+"), this.firstChild);
				this.setAttribute("title", (needsToExpand ? "collapse" : "expand") + " clode block");
				context.codeContainer.style.height = needsToExpand ? originalHeight : "0px";
				context.codeContainer.style.overflowY = needsToExpand ? originalOverflow : "hidden";
				
				return false;
			***REMOVED***
		***REMOVED***();
		
		collapse.appendChild(collapseLink);
		
		viewRaw = document.createElement("li");
		viewRawLink = createLink("#", "view raw code", "raw");
		viewRawLink.onclick = function() ***REMOVED***
			var textarea;
			return function() ***REMOVED***
				var rawCode;
				
				if (textarea) ***REMOVED***
					textarea.parentNode.removeChild(textarea);
					textarea = null;
					context.node.style.display = "block";
					this.replaceChild(document.createTextNode("raw"), this.firstChild);
					this.setAttribute("title", "view raw code");
				***REMOVED*** else ***REMOVED***
					//hide the codeContainer, flatten all text nodes, create a <textarea>, append it
					rawCode = getTextRecursive(context.node);
					textarea = document.createElement("textarea");
					textarea.value = rawCode;
					textarea.setAttribute("readonly", "readonly");
					textarea.style.width = (parseInt(sunlight.util.getComputedStyle(context.node, "width")) - 5) + "px"; //IE, Safari and Chrome can't handle the actual width
					textarea.style.height = sunlight.util.getComputedStyle(context.node, "height");
					textarea.style.border = "none";
					textarea.style.overflowX = "hidden"; //IE requires this
					textarea.setAttribute("wrap", "off"); //prevent line wrapping lol
					context.codeContainer.insertBefore(textarea, context.node);
					context.node.style.display = "none";
					
					this.replaceChild(document.createTextNode("highlighted"), this.firstChild);
					this.setAttribute("title", "view highlighted code");
					textarea.select(); //highlight everything
				***REMOVED***
				
				return false;
			***REMOVED***
		***REMOVED***();
		
		viewRaw.appendChild(viewRawLink);
		
		about = document.createElement("li");
		aboutLink = createLink("http://sunlightjs.com/", "Sunlight: JavaScript syntax highlighter by Tommy Montgomery");
		
		icon = document.createElement("img");
		icon.setAttribute("src", "data:image/png;base64," + sunlightIcon);
		icon.setAttribute("alt", "about");
		aboutLink.appendChild(icon);
		about.appendChild(aboutLink);
		
		ul.appendChild(about);
		ul.appendChild(viewRaw);
		ul.appendChild(collapse);
		
		menu.appendChild(ul);
		context.container.insertBefore(menu, context.container.firstChild);
		
		if (this.options.autoCollapse) ***REMOVED***
			collapseLink.onclick.call(collapseLink);
		***REMOVED***
	***REMOVED***);
	
	sunlight.globalOptions.showMenu = false;
	sunlight.globalOptions.autoCollapse = false;
	
***REMOVED***(this["Sunlight"], document));