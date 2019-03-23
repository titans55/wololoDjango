/**
 * Sunlight documentation link plugin
 *
 * This plugin generates hyperlinks to language documentation for certain tokens
 * (e.g. links to php.net for functions).
 *
 * Supported languages:
 *	- PHP (functions and language constructs)
 *	- Ruby (functions)
 *	- Python (functions)
 *	- Perl (functions)
 *	- Lua (functions)
 *
 * Options:
 * 	- enableDocLinks: true/false (default is false)
 */
(function(sunlight, document, undefined)***REMOVED***
	if (sunlight === undefined) ***REMOVED***
		throw "Include sunlight.js before including plugin files";
	***REMOVED***
	
	var supportedLanguages = ***REMOVED***
		php: ***REMOVED***
			"function": function(word) ***REMOVED*** return "http://php.net/" + word; ***REMOVED***,
			languageConstruct: function(word) ***REMOVED*** return "http://php.net/" + word; ***REMOVED***
		***REMOVED***,
		
		ruby: ***REMOVED***
			"function": function(word) ***REMOVED***
				return "http://www.ruby-doc.org/docs/ruby-doc-bundle/Manual/man-1.4/function.html#" 
					+ word.replace(/!/g, "_bang").replace(/\?/g, "_p");
			***REMOVED***
		***REMOVED***,
		
		python: ***REMOVED***
			"function": function(word) ***REMOVED***
				return "http://docs.python.org/py3k/library/functions.html#" + word;
			***REMOVED***
		***REMOVED***,
		
		perl: ***REMOVED***
			"function": function(word) ***REMOVED*** return "http://perldoc.perl.org/functions/" + word + ".html"; ***REMOVED***
		***REMOVED***,
		
		lua: ***REMOVED***
			"function": function(word) ***REMOVED*** return "http://www.lua.org/manual/5.1/manual.html#pdf-" + word; ***REMOVED***
		***REMOVED***
	***REMOVED***;
	
	function createLink(transformUrl) ***REMOVED***
		return function(context) ***REMOVED***
			var link = document.createElement("a");
			link.className = context.options.classPrefix + context.tokens[context.index].name;
			link.setAttribute("href", transformUrl(context.tokens[context.index].value));
			link.appendChild(context.createTextNode(context.tokens[context.index]));
			context.addNode(link);
		***REMOVED***;
	***REMOVED***
	
	sunlight.bind("beforeAnalyze", function(context) ***REMOVED***
		if (!this.options.enableDocLinks) ***REMOVED***
			return;
		***REMOVED***
		
		context.analyzerContext.getAnalyzer = function() ***REMOVED***
			var language = supportedLanguages[this.language.name],
				analyzer,
				tokenName;
			
			if (!language) ***REMOVED***
				return;
			***REMOVED***
			
			analyzer = sunlight.util.clone(context.analyzerContext.language.analyzer);
			
			for (tokenName in language) ***REMOVED***
				if (!language.hasOwnProperty(tokenName)) ***REMOVED***
					continue;
				***REMOVED***
				
				analyzer["handle_" + tokenName] = createLink(language[tokenName]);
			***REMOVED***
			
			return analyzer;
		***REMOVED***;
		
	***REMOVED***);
	
	sunlight.globalOptions.enableDocLinks = false;
	
***REMOVED***(this["Sunlight"], document));