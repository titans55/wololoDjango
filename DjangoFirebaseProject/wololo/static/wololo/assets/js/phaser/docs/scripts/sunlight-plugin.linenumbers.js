/**
 * Sunlight line number/line highlighting plugin
 *
 * This creates the line number gutter in addition to creating the line highlighting
 * overlay (if applicable). It is bundled in sunlight-min.js.
 *
 * Options:
 * 	- lineNumbers: true/false/"automatic" (default is "automatic")
 * 	- lineNumberStart: <number> (line number to start from, default is 1)
 *	- lineHighlight: <array> (array of line numbers to highlight)
 */
(function(sunlight, document, undefined)***REMOVED***
	if (sunlight === undefined) ***REMOVED***
		throw "Include sunlight.js before including plugin files";
	***REMOVED***
	
	function getLineCount(node) ***REMOVED***
		//browsers don't render the last trailing newline, so we make sure that the line numbers reflect that
		//by disregarding the last trailing newline
		
		//get the last text node
		var lastTextNode = function getLastNode(node) ***REMOVED***
			if (!node.lastChild) ***REMOVED***
				return null;
			***REMOVED***
			
			if (node.lastChild.nodeType === 3) ***REMOVED***
				return node.lastChild;
			***REMOVED***
			
			return getLastNode(node.lastChild);
		***REMOVED***(node) || ***REMOVED*** lastChild: "" ***REMOVED***;
		
		return node.innerHTML.replace(/[^\n]/g, "").length - /\n$/.test(lastTextNode.nodeValue);
	***REMOVED***
	
	sunlight.bind("afterHighlightNode", function(context) ***REMOVED***
		var lineContainer,
			lineCount,
			lineHighlightOverlay,
			currentLineOverlay,
			lineHighlightingEnabled,
			i,
			eol,
			link,
			name;
		
		if (!this.options.lineNumbers) ***REMOVED***
			return;
		***REMOVED***
		
		if (this.options.lineNumbers === "automatic" && sunlight.util.getComputedStyle(context.node, "display") !== "block") ***REMOVED***
			//if it's not a block level element or the lineNumbers option is not set to "automatic"
			return;
		***REMOVED***
		
		lineContainer = document.createElement("pre");
		lineCount = getLineCount(context.node);
		
		lineHighlightingEnabled = this.options.lineHighlight.length > 0;
		if (lineHighlightingEnabled) ***REMOVED***
			lineHighlightOverlay = document.createElement("div");
			lineHighlightOverlay.className = this.options.classPrefix + "line-highlight-overlay";
		***REMOVED***
		
		lineContainer.className = this.options.classPrefix + "line-number-margin";

		eol = document.createTextNode(sunlight.util.eol)
		for (i = this.options.lineNumberStart; i <= this.options.lineNumberStart + lineCount; i++) ***REMOVED***
			link = document.createElement("a");
			name = (context.node.id ? context.node.id : this.options.classPrefix + context.count) + "-line-" + i;
			
			link.setAttribute("name", name);
			link.setAttribute("href", "#" + name);
			
			link.appendChild(document.createTextNode(i));
			lineContainer.appendChild(link);
			lineContainer.appendChild(eol.cloneNode(false));
			
			if (lineHighlightingEnabled) ***REMOVED***
				currentLineOverlay = document.createElement("div");
				if (sunlight.util.contains(this.options.lineHighlight, i)) ***REMOVED***
					currentLineOverlay.className = this.options.classPrefix + "line-highlight-active";
				***REMOVED***
				lineHighlightOverlay.appendChild(currentLineOverlay);
			***REMOVED***
		***REMOVED***

		context.codeContainer.insertBefore(lineContainer, context.codeContainer.firstChild);
		
		if (lineHighlightingEnabled) ***REMOVED***
			context.codeContainer.appendChild(lineHighlightOverlay);
		***REMOVED***
		
		//enable the border on the code container
		context.codeContainer.style.borderWidth = "1px";
		context.codeContainer.style.borderStyle = "solid";
	***REMOVED***);
	
	sunlight.globalOptions.lineNumbers = "automatic";
	sunlight.globalOptions.lineNumberStart = 1;
	sunlight.globalOptions.lineHighlight = [];
	
***REMOVED***(this["Sunlight"], document));