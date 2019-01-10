/**
 * Sunlight
 *    Intelligent syntax highlighting
 *
 * http://sunlightjs.com/
 *
 * by Tommy Montgomery <http://tmont.com>
 * Licensed under WTFPL <http://sam.zoy.org/wtfpl/>
 */
(function(window, document, undefined)***REMOVED***

	var 
		//http://webreflection.blogspot.com/2009/01/32-bytes-to-know-if-your-browser-is-ie.html
		//we have to sniff this because IE requires \r
		isIe = !+"\v1", 
		EOL = isIe ? "\r" : "\n",
		EMPTY = function() ***REMOVED*** return null; ***REMOVED***,
		HIGHLIGHTED_NODE_COUNT = 0,
		DEFAULT_LANGUAGE = "plaintext",
		DEFAULT_CLASS_PREFIX = "sunlight-",
		
		//global sunlight variables
		defaultAnalyzer,
		getComputedStyle,
		globalOptions = ***REMOVED***
			tabWidth: 4,
			classPrefix: DEFAULT_CLASS_PREFIX,
			showWhitespace: false,
			maxHeight: false
		***REMOVED***,
		languages = ***REMOVED******REMOVED***,
		languageDefaults = ***REMOVED******REMOVED***,
		events = ***REMOVED***
			beforeHighlightNode: [],
			beforeHighlight: [],
			beforeTokenize: [],
			afterTokenize: [],
			beforeAnalyze: [],
			afterAnalyze: [],
			afterHighlight: [],
			afterHighlightNode: []
		***REMOVED***;

	defaultAnalyzer = (function() ***REMOVED***
		function defaultHandleToken(suffix) ***REMOVED***
			return function(context) ***REMOVED***
				var element = document.createElement("span");
				element.className = context.options.classPrefix + suffix;
				element.appendChild(context.createTextNode(context.tokens[context.index]));
				return context.addNode(element) || true;
			***REMOVED***;
		***REMOVED***

		return ***REMOVED***
			handleToken: function(context) ***REMOVED*** 
				return defaultHandleToken(context.tokens[context.index].name)(context); 
			***REMOVED***,

			//just append default content as a text node
			handle_default: function(context) ***REMOVED*** 
				return context.addNode(context.createTextNode(context.tokens[context.index])); 
			***REMOVED***,

			//this handles the named ident mayhem
			handle_ident: function(context) ***REMOVED***
				var evaluate = function(rules, createRule) ***REMOVED***
					var i;
					rules = rules || [];
					for (i = 0; i < rules.length; i++) ***REMOVED***
						if (typeof(rules[i]) === "function") ***REMOVED***
							if (rules[i](context)) ***REMOVED***
								return defaultHandleToken("named-ident")(context);
							***REMOVED***
						***REMOVED*** else if (createRule && createRule(rules[i])(context.tokens)) ***REMOVED***
							return defaultHandleToken("named-ident")(context);
						***REMOVED***
					***REMOVED***

					return false;
				***REMOVED***;

				return evaluate(context.language.namedIdentRules.custom)
					|| evaluate(context.language.namedIdentRules.follows, function(ruleData) ***REMOVED*** return createProceduralRule(context.index - 1, -1, ruleData, context.language.caseInsensitive); ***REMOVED***)
					|| evaluate(context.language.namedIdentRules.precedes, function(ruleData) ***REMOVED*** return createProceduralRule(context.index + 1, 1, ruleData, context.language.caseInsensitive); ***REMOVED***)
					|| evaluate(context.language.namedIdentRules.between, function(ruleData) ***REMOVED*** return createBetweenRule(context.index, ruleData.opener, ruleData.closer, context.language.caseInsensitive); ***REMOVED***)
					|| defaultHandleToken("ident")(context);
			***REMOVED***
		***REMOVED***;
	***REMOVED***());

	languageDefaults = ***REMOVED***
		analyzer: create(defaultAnalyzer),
		customTokens: [],
		namedIdentRules: ***REMOVED******REMOVED***,
		punctuation: /[^\w\s]/,
		numberParser: defaultNumberParser,
		caseInsensitive: false,
		doNotParse: /\s/,
		contextItems: ***REMOVED******REMOVED***,
		embeddedLanguages: ***REMOVED******REMOVED***
	***REMOVED***;
	
	//adapted from http://blargh.tommymontgomery.com/2010/04/get-computed-style-in-javascript/
	getComputedStyle = (function() ***REMOVED***
		var func = null;
		if (document.defaultView && document.defaultView.getComputedStyle) ***REMOVED***
			func = document.defaultView.getComputedStyle;
		***REMOVED*** else ***REMOVED***
			func = function(element, anything) ***REMOVED***
				return element["currentStyle"] || ***REMOVED******REMOVED***;
			***REMOVED***;
		***REMOVED***

		return function(element, style) ***REMOVED***
			return func(element, null)[style];
		***REMOVED***
	***REMOVED***());
	
	//-----------
	//FUNCTIONS
	//-----------

	function createCodeReader(text) ***REMOVED***
		var index = 0,
			line = 1,
			column = 1,
			length,
			EOF = undefined,
			currentChar,
			nextReadBeginsLine;

		text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n"); //normalize line endings to unix

		length = text.length;
		currentChar = length > 0 ? text.charAt(0) : EOF;

		function getCharacters(count) ***REMOVED***
			var value;
			if (count === 0) ***REMOVED***
				return "";
			***REMOVED***

			count = count || 1;

			value = text.substring(index + 1, index + count + 1);
			return value === "" ? EOF : value;
		***REMOVED***

		return ***REMOVED***
			toString: function() ***REMOVED***
				return "length: " + length + ", index: " + index + ", line: " + line + ", column: " + column + ", current: [" + currentChar + "]";
			***REMOVED***,

			peek: function(count) ***REMOVED***
				return getCharacters(count);
			***REMOVED***,

			substring: function() ***REMOVED***
				return text.substring(index);
			***REMOVED***,

			peekSubstring: function() ***REMOVED***
				return text.substring(index + 1);
			***REMOVED***,

			read: function(count) ***REMOVED***
				var value = getCharacters(count),
					newlineCount,
					lastChar;

				if (value === "") ***REMOVED***
					//this is a result of reading/peeking/doing nothing
					return value;
				***REMOVED***

				if (value !== EOF) ***REMOVED***
					//advance index
					index += value.length;
					column += value.length;

					//update line count
					if (nextReadBeginsLine) ***REMOVED***
						line++;
						column = 1;
						nextReadBeginsLine = false;
					***REMOVED***

					newlineCount = value.substring(0, value.length - 1).replace(/[^\n]/g, "").length;
					if (newlineCount > 0) ***REMOVED***
						line += newlineCount;
						column = 1;
					***REMOVED***

					lastChar = last(value);
					if (lastChar === "\n") ***REMOVED***
						nextReadBeginsLine = true;
					***REMOVED***

					currentChar = lastChar;
				***REMOVED*** else ***REMOVED***
					index = length;
					currentChar = EOF;
				***REMOVED***

				return value;
			***REMOVED***,

			text: function() ***REMOVED*** return text; ***REMOVED***,

			getLine: function() ***REMOVED*** return line; ***REMOVED***,
			getColumn: function() ***REMOVED*** return column; ***REMOVED***,
			isEof: function() ***REMOVED*** return index >= length; ***REMOVED***,
			isSol: function() ***REMOVED*** return column === 1; ***REMOVED***,
			isSolWs: function() ***REMOVED***
				var temp = index,
					c;
				if (column === 1) ***REMOVED***
					return true;
				***REMOVED***

				//look backward until we find a newline or a non-whitespace character
				while ((c = text.charAt(--temp)) !== "") ***REMOVED***
					if (c === "\n") ***REMOVED***
						return true;
					***REMOVED***
					if (!/\s/.test(c)) ***REMOVED***
						return false;
					***REMOVED***
				***REMOVED***

				return true;
			***REMOVED***,
			isEol: function() ***REMOVED*** return nextReadBeginsLine; ***REMOVED***,
			EOF: EOF,
			current: function() ***REMOVED*** return currentChar; ***REMOVED***
		***REMOVED***;
	***REMOVED***

	//http://javascript.crockford.com/prototypal.html
	function create(o) ***REMOVED***
		function F() ***REMOVED******REMOVED***
		F.prototype = o;
		return new F();
	***REMOVED***
	
	function appendAll(parent, children) ***REMOVED***
		var i;
		for (i = 0; i < children.length; i++) ***REMOVED***
			parent.appendChild(children[i]);
		***REMOVED***
	***REMOVED***
	
	//gets the last character in a string or the last element in an array
	function last(thing) ***REMOVED***
		return thing.charAt ? thing.charAt(thing.length - 1) : thing[thing.length - 1];
	***REMOVED***

	//array.contains()
	function contains(arr, value, caseInsensitive) ***REMOVED***
		var i;
		if (arr.indexOf && !caseInsensitive) ***REMOVED***
			return arr.indexOf(value) >= 0;
		***REMOVED***
		
		for (i = 0; i < arr.length; i++) ***REMOVED***
			if (arr[i] === value) ***REMOVED***
				return true;
			***REMOVED***

			if (caseInsensitive && typeof(arr[i]) === "string" && typeof(value) === "string" && arr[i].toUpperCase() === value.toUpperCase()) ***REMOVED***
				return true;
			***REMOVED***
		***REMOVED***

		return false;
	***REMOVED***

	//non-recursively merges one object into the other
	function merge(defaultObject, objectToMerge) ***REMOVED***
		var key;
		if (!objectToMerge) ***REMOVED***
			return defaultObject;
		***REMOVED***

		for (key in objectToMerge) ***REMOVED***
			defaultObject[key] = objectToMerge[key];
		***REMOVED***

		return defaultObject;
	***REMOVED***
	
	function clone(object) ***REMOVED***
		return merge(***REMOVED******REMOVED***, object);
	***REMOVED***

	//http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711
	function regexEscape(s) ***REMOVED***
		return s.replace(/[-\/\\^$*+?.()|[\]***REMOVED******REMOVED***]/g, "\\$&");
	***REMOVED***

	function createProceduralRule(startIndex, direction, tokenRequirements, caseInsensitive) ***REMOVED***
		tokenRequirements = tokenRequirements.slice(0);
		return function(tokens) ***REMOVED***
			var tokenIndexStart = startIndex,
				j,
				expected,
				actual;
				
			if (direction === 1) ***REMOVED***
				tokenRequirements.reverse();
			***REMOVED***

			for (j = 0; j < tokenRequirements.length; j++) ***REMOVED***
				actual = tokens[tokenIndexStart + (j * direction)];
				expected = tokenRequirements[tokenRequirements.length - 1 - j];

				if (actual === undefined) ***REMOVED***
					if (expected["optional"] !== undefined && expected.optional) ***REMOVED***
						tokenIndexStart -= direction;
					***REMOVED*** else ***REMOVED***
						return false;
					***REMOVED***
				***REMOVED*** else if (actual.name === expected.token && (expected["values"] === undefined || contains(expected.values, actual.value, caseInsensitive))) ***REMOVED***
					//derp
					continue;
				***REMOVED*** else if (expected["optional"] !== undefined && expected.optional) ***REMOVED***
					tokenIndexStart -= direction; //we need to reevaluate against this token again
				***REMOVED*** else ***REMOVED***
					return false;
				***REMOVED***
			***REMOVED***

			return true;
		***REMOVED***;
	***REMOVED***

	function createBetweenRule(startIndex, opener, closer, caseInsensitive) ***REMOVED***
		return function(tokens) ***REMOVED***
			var index = startIndex,
				token,
				success = false;

			//check to the left: if we run into a closer or never run into an opener, fail
			while ((token = tokens[--index]) !== undefined) ***REMOVED***
				if (token.name === closer.token && contains(closer.values, token.value)) ***REMOVED***
					if (token.name === opener.token && contains(opener.values, token.value, caseInsensitive)) ***REMOVED***
						//if the closer is the same as the opener that's okay
						success = true;
						break;
					***REMOVED***

					return false;
				***REMOVED***

				if (token.name === opener.token && contains(opener.values, token.value, caseInsensitive)) ***REMOVED***
					success = true;
					break;
				***REMOVED***
			***REMOVED***

			if (!success) ***REMOVED***
				return false;
			***REMOVED***

			//check to the right for the closer
			index = startIndex;
			while ((token = tokens[++index]) !== undefined) ***REMOVED***
				if (token.name === opener.token && contains(opener.values, token.value, caseInsensitive)) ***REMOVED***
					if (token.name === closer.token && contains(closer.values, token.value, caseInsensitive)) ***REMOVED***
						//if the closer is the same as the opener that's okay
						success = true;
						break;
					***REMOVED***

					return false;
				***REMOVED***

				if (token.name === closer.token && contains(closer.values, token.value, caseInsensitive)) ***REMOVED***
					success = true;
					break;
				***REMOVED***
			***REMOVED***

			return success;
		***REMOVED***;
	***REMOVED***

	function matchWord(context, wordMap, tokenName, doNotRead) ***REMOVED***
		var current = context.reader.current(),
			i,
			word,
			peek,
			line = context.reader.getLine(),
			column = context.reader.getColumn();
			
		wordMap = wordMap || [];
		if (context.language.caseInsensitive) ***REMOVED***
			current = current.toUpperCase();
		***REMOVED***

		if (!wordMap[current]) ***REMOVED***
			return null;
		***REMOVED***

		wordMap = wordMap[current];
		for (i = 0; i < wordMap.length; i++) ***REMOVED***
			word = wordMap[i].value;

			peek = current + context.reader.peek(word.length);
			if (word === peek || wordMap[i].regex.test(peek)) ***REMOVED***
				return context.createToken(
					tokenName,
					context.reader.current() + context.reader[doNotRead ? "peek" : "read"](word.length - 1),
					line,
					column
				);
			***REMOVED***
		***REMOVED***

		return null;
	***REMOVED***

	//gets the next token in the specified direction while matcher matches the current token
	function getNextWhile(tokens, index, direction, matcher) ***REMOVED***
		var count = 1, 
			token;
		
		direction = direction || 1;
		while (token = tokens[index + (direction * count++)]) ***REMOVED***
			if (!matcher(token)) ***REMOVED***
				return token;
			***REMOVED***
		***REMOVED***
		
		return undefined;
	***REMOVED***

	//this is crucial for performance
	function createHashMap(wordMap, boundary, caseInsensitive) ***REMOVED***
		//creates a hash table where the hash is the first character of the word
		var newMap = ***REMOVED*** ***REMOVED***,
			i,
			word,
			firstChar;
		
		for (i = 0; i < wordMap.length; i++) ***REMOVED***
			word = caseInsensitive ? wordMap[i].toUpperCase() : wordMap[i];
			firstChar = word.charAt(0);
			if (!newMap[firstChar]) ***REMOVED***
				newMap[firstChar] = [];
			***REMOVED***

			newMap[firstChar].push(***REMOVED*** value: word, regex: new RegExp("^" + regexEscape(word) + boundary, caseInsensitive ? "i" : "") ***REMOVED***);
		***REMOVED***

		return newMap;
	***REMOVED***

	function defaultNumberParser(context) ***REMOVED***
		var current = context.reader.current(), 
			number, 
			line = context.reader.getLine(), 
			column = context.reader.getColumn(),
			allowDecimal = true,
			peek;

		if (!/\d/.test(current)) ***REMOVED***
			//is it a decimal followed by a number?
			if (current !== "." || !/\d/.test(context.reader.peek())) ***REMOVED***
				return null;
			***REMOVED***

			//decimal without leading zero
			number = current + context.reader.read();
			allowDecimal = false;
		***REMOVED*** else ***REMOVED***
			number = current;
			if (current === "0" && context.reader.peek() !== ".") ***REMOVED***
				//hex or octal
				allowDecimal = false;
			***REMOVED***
		***REMOVED***

		//easy way out: read until it's not a number or letter
		//this will work for hex (0xef), octal (012), decimal and scientific notation (1e3)
		//anything else and you're on your own

		while ((peek = context.reader.peek()) !== context.reader.EOF) ***REMOVED***
			if (!/[A-Za-z0-9]/.test(peek)) ***REMOVED***
				if (peek === "." && allowDecimal && /\d$/.test(context.reader.peek(2))) ***REMOVED***
					number += context.reader.read();
					allowDecimal = false;
					continue;
				***REMOVED***
				
				break;
			***REMOVED***

			number += context.reader.read();
		***REMOVED***

		return context.createToken("number", number, line, column);
	***REMOVED***

	function fireEvent(eventName, highlighter, eventContext) ***REMOVED***
		var delegates = events[eventName] || [],
			i;
		
		for (i = 0; i < delegates.length; i++) ***REMOVED***
			delegates[i].call(highlighter, eventContext);
		***REMOVED***
	***REMOVED***
	
	function Highlighter(options) ***REMOVED***
		this.options = merge(clone(globalOptions), options);
	***REMOVED***

	Highlighter.prototype = (function() ***REMOVED***
		var parseNextToken = (function() ***REMOVED***
			function isIdentMatch(context) ***REMOVED***
				return context.language.identFirstLetter && context.language.identFirstLetter.test(context.reader.current());
			***REMOVED***

			//token parsing functions
			function parseKeyword(context) ***REMOVED***
				return matchWord(context, context.language.keywords, "keyword");
			***REMOVED***

			function parseCustomTokens(context) ***REMOVED***
				var tokenName,
					token;
				if (context.language.customTokens === undefined) ***REMOVED***
					return null;
				***REMOVED***

				for (tokenName in context.language.customTokens) ***REMOVED***
					token = matchWord(context, context.language.customTokens[tokenName], tokenName);
					if (token !== null) ***REMOVED***
						return token;
					***REMOVED***
				***REMOVED***

				return null;
			***REMOVED***

			function parseOperator(context) ***REMOVED***
				return matchWord(context, context.language.operators, "operator");
			***REMOVED***

			function parsePunctuation(context) ***REMOVED***
				var current = context.reader.current();
				if (context.language.punctuation.test(regexEscape(current))) ***REMOVED***
					return context.createToken("punctuation", current, context.reader.getLine(), context.reader.getColumn());
				***REMOVED***

				return null;
			***REMOVED***

			function parseIdent(context) ***REMOVED***
				var ident,
					peek,
					line = context.reader.getLine(),
					column = context.reader.getColumn();

				if (!isIdentMatch(context)) ***REMOVED***
					return null;
				***REMOVED***

				ident = context.reader.current();
				while ((peek = context.reader.peek()) !== context.reader.EOF) ***REMOVED***
					if (!context.language.identAfterFirstLetter.test(peek)) ***REMOVED***
						break;
					***REMOVED***

					ident += context.reader.read();
				***REMOVED***

				return context.createToken("ident", ident, line, column);
			***REMOVED***

			function parseDefault(context) ***REMOVED***
				if (context.defaultData.text === "") ***REMOVED***
					//new default token
					context.defaultData.line = context.reader.getLine();
					context.defaultData.column = context.reader.getColumn();
				***REMOVED***

				context.defaultData.text += context.reader.current();
				return null;
			***REMOVED***

			function parseScopes(context) ***REMOVED***
				var current = context.reader.current(),
					tokenName,
					specificScopes,
					j,
					opener,
					line,
					column,
					continuation,
					value;

				for (tokenName in context.language.scopes) ***REMOVED***
					specificScopes = context.language.scopes[tokenName];
					for (j = 0; j < specificScopes.length; j++) ***REMOVED***
						opener = specificScopes[j][0];

						value = current + context.reader.peek(opener.length - 1);

						if (opener !== value && (!context.language.caseInsensitive || value.toUpperCase() !== opener.toUpperCase())) ***REMOVED***
							continue;
						***REMOVED***

						line = context.reader.getLine(), column = context.reader.getColumn();
						context.reader.read(opener.length - 1);
						continuation = getScopeReaderFunction(specificScopes[j], tokenName);
						return continuation(context, continuation, value, line, column);
					***REMOVED***
				***REMOVED***

				return null;
			***REMOVED***

			function parseNumber(context) ***REMOVED***
				return context.language.numberParser(context);
			***REMOVED***

			function parseCustomRules(context) ***REMOVED***
				var customRules = context.language.customParseRules,
					i,
					token;

				if (customRules === undefined) ***REMOVED***
					return null;
				***REMOVED***

				for (i = 0; i < customRules.length; i++) ***REMOVED***
					token = customRules[i](context);
					if (token) ***REMOVED***
						return token;
					***REMOVED***
				***REMOVED***

				return null;
			***REMOVED***

			return function(context) ***REMOVED***
				if (context.language.doNotParse.test(context.reader.current())) ***REMOVED***
					return parseDefault(context);
				***REMOVED***

				return parseCustomRules(context)
					|| parseCustomTokens(context)
					|| parseKeyword(context)
					|| parseScopes(context)
					|| parseIdent(context)
					|| parseNumber(context)
					|| parseOperator(context)
					|| parsePunctuation(context)
					|| parseDefault(context);
			***REMOVED***
		***REMOVED***());
		
		function getScopeReaderFunction(scope, tokenName) ***REMOVED***
			var escapeSequences = scope[2] || [],
				closerLength = scope[1].length,
				closer = typeof(scope[1]) === "string" ? new RegExp(regexEscape(scope[1])) : scope[1].regex,
				zeroWidth = scope[3] || false;

			//processCurrent indicates that this is being called from a continuation
			//which means that we need to process the current char, rather than peeking at the next
			return function(context, continuation, buffer, line, column, processCurrent) ***REMOVED***
				var foundCloser = false;
				buffer = buffer || "";
					
				processCurrent = processCurrent ? 1 : 0;

				function process(processCurrent) ***REMOVED***
					//check for escape sequences
					var peekValue,
						current = context.reader.current(),
						i;
					
					for (i = 0; i < escapeSequences.length; i++) ***REMOVED***
						peekValue = (processCurrent ? current : "") + context.reader.peek(escapeSequences[i].length - processCurrent);
						if (peekValue === escapeSequences[i]) ***REMOVED***
							buffer += context.reader.read(peekValue.length - processCurrent);
							return true;
						***REMOVED***
					***REMOVED***

					peekValue = (processCurrent ? current : "") + context.reader.peek(closerLength - processCurrent);
					if (closer.test(peekValue)) ***REMOVED***
						foundCloser = true;
						return false;
					***REMOVED***

					buffer += processCurrent ? current : context.reader.read();
					return true;
				***REMOVED***;

				if (!processCurrent || process(true)) ***REMOVED***
					while (context.reader.peek() !== context.reader.EOF && process(false)) ***REMOVED*** ***REMOVED***
				***REMOVED***

				if (processCurrent) ***REMOVED***
					buffer += context.reader.current();
					context.reader.read();
				***REMOVED*** else ***REMOVED***
					buffer += zeroWidth || context.reader.peek() === context.reader.EOF ? "" : context.reader.read(closerLength);
				***REMOVED***

				if (!foundCloser) ***REMOVED***
					//we need to signal to the context that this scope was never properly closed
					//this has significance for partial parses (e.g. for nested languages)
					context.continuation = continuation;
				***REMOVED***

				return context.createToken(tokenName, buffer, line, column);
			***REMOVED***;
		***REMOVED***
		
		//called before processing the current
		function switchToEmbeddedLanguageIfNecessary(context) ***REMOVED***
			var i,
				embeddedLanguage;
			
			for (i = 0; i < context.language.embeddedLanguages.length; i++) ***REMOVED***
				if (!languages[context.language.embeddedLanguages[i].language]) ***REMOVED***
					//unregistered language
					continue;
				***REMOVED***
				
				embeddedLanguage = clone(context.language.embeddedLanguages[i]);
				
				if (embeddedLanguage.switchTo(context)) ***REMOVED***
					embeddedLanguage.oldItems = clone(context.items);
					context.embeddedLanguageStack.push(embeddedLanguage);
					context.language = languages[embeddedLanguage.language];
					context.items = merge(context.items, clone(context.language.contextItems));
					break;
				***REMOVED***
			***REMOVED***
		***REMOVED***
		
		//called after processing the current
		function switchBackFromEmbeddedLanguageIfNecessary(context) ***REMOVED***
			var current = last(context.embeddedLanguageStack),
				lang;
			
			if (current && current.switchBack(context)) ***REMOVED***
				context.language = languages[current.parentLanguage];
				lang = context.embeddedLanguageStack.pop();
				
				//restore old items
				context.items = clone(lang.oldItems);
				lang.oldItems = ***REMOVED******REMOVED***;
			***REMOVED***
		***REMOVED***
		
		function tokenize(unhighlightedCode, language, partialContext, options) ***REMOVED***
			var tokens = [],
				context,
				continuation,
				token;
				
			fireEvent("beforeTokenize", this, ***REMOVED*** code: unhighlightedCode, language: language ***REMOVED***);
			context = ***REMOVED***
				reader: createCodeReader(unhighlightedCode),
				language: language,
				items: clone(language.contextItems),
				token: function(index) ***REMOVED*** return tokens[index]; ***REMOVED***,
				getAllTokens: function() ***REMOVED*** return tokens.slice(0); ***REMOVED***,
				count: function() ***REMOVED*** return tokens.length; ***REMOVED***,
				options: options,
				embeddedLanguageStack: [],
				
				defaultData: ***REMOVED***
					text: "",
					line: 1,
					column: 1
				***REMOVED***,
				createToken: function(name, value, line, column) ***REMOVED***
					return ***REMOVED***
						name: name,
						line: line,
						value: isIe ? value.replace(/\n/g, "\r") : value,
						column: column,
						language: this.language.name
					***REMOVED***;
				***REMOVED***
			***REMOVED***;

			//if continuation is given, then we need to pick up where we left off from a previous parse
			//basically it indicates that a scope was never closed, so we need to continue that scope
			if (partialContext.continuation) ***REMOVED***
				continuation = partialContext.continuation;
				partialContext.continuation = null;
				tokens.push(continuation(context, continuation, "", context.reader.getLine(), context.reader.getColumn(), true));
			***REMOVED***

			while (!context.reader.isEof()) ***REMOVED***
				switchToEmbeddedLanguageIfNecessary(context);
				token = parseNextToken(context);

				//flush default data if needed (in pretty much all languages this is just whitespace)
				if (token !== null) ***REMOVED***
					if (context.defaultData.text !== "") ***REMOVED***
						tokens.push(context.createToken("default", context.defaultData.text, context.defaultData.line, context.defaultData.column));
						context.defaultData.text = "";
					***REMOVED***

					if (token[0] !== undefined) ***REMOVED***
						//multiple tokens
						tokens = tokens.concat(token);
					***REMOVED*** else ***REMOVED***
						//single token
						tokens.push(token);
					***REMOVED***
				***REMOVED***

				switchBackFromEmbeddedLanguageIfNecessary(context);
				context.reader.read();
			***REMOVED***

			//append the last default token, if necessary
			if (context.defaultData.text !== "") ***REMOVED***
				tokens.push(context.createToken("default", context.defaultData.text, context.defaultData.line, context.defaultData.column));
			***REMOVED***

			fireEvent("afterTokenize", this, ***REMOVED*** code: unhighlightedCode, parserContext: context ***REMOVED***);
			return context;
		***REMOVED***

		function createAnalyzerContext(parserContext, partialContext, options) ***REMOVED***
			var nodes = [],
				prepareText = function() ***REMOVED***
					var nbsp, tab;
					if (options.showWhitespace) ***REMOVED***
						nbsp = String.fromCharCode(0xB7);
						tab = new Array(options.tabWidth).join(String.fromCharCode(0x2014)) + String.fromCharCode(0x2192);
					***REMOVED*** else ***REMOVED***
						nbsp = String.fromCharCode(0xA0);
						tab = new Array(options.tabWidth + 1).join(nbsp);
					***REMOVED***
					
					return function(token) ***REMOVED***
						var value = token.value.split(" ").join(nbsp),
							tabIndex,
							lastNewlineColumn,
							actualColumn,
							tabLength;
						
						//tabstop madness: replace \t with the appropriate number of characters, depending on the tabWidth option and its relative position in the line
						while ((tabIndex = value.indexOf("\t")) >= 0) ***REMOVED***
							lastNewlineColumn = value.lastIndexOf(EOL, tabIndex);
							actualColumn = lastNewlineColumn === -1 ? tabIndex : tabIndex - lastNewlineColumn - 1;
							tabLength = options.tabWidth - (actualColumn % options.tabWidth); //actual length of the TAB character
							
							value = value.substring(0, tabIndex) + tab.substring(options.tabWidth - tabLength) + value.substring(tabIndex + 1);
						***REMOVED***
						
						return value;
					***REMOVED***;
				***REMOVED***();

			return ***REMOVED***
				tokens: (partialContext.tokens || []).concat(parserContext.getAllTokens()),
				index: partialContext.index ? partialContext.index + 1 : 0,
				language: null,
				getAnalyzer: EMPTY,
				options: options,
				continuation: parserContext.continuation,
				addNode: function(node) ***REMOVED*** nodes.push(node); ***REMOVED***,
				createTextNode: function(token) ***REMOVED*** return document.createTextNode(prepareText(token)); ***REMOVED***,
				getNodes: function() ***REMOVED*** return nodes; ***REMOVED***,
				resetNodes: function() ***REMOVED*** nodes = []; ***REMOVED***,
				items: parserContext.items
			***REMOVED***;
		***REMOVED***

		//partialContext allows us to perform a partial parse, and then pick up where we left off at a later time
		//this functionality enables nested highlights (language within a language, e.g. PHP within HTML followed by more PHP)
		function highlightText(unhighlightedCode, languageId, partialContext) ***REMOVED***
			var language = languages[languageId],
				analyzerContext;
			
			partialContext = partialContext || ***REMOVED*** ***REMOVED***;
			if (language === undefined) ***REMOVED***
				//use default language if one wasn't specified or hasn't been registered
				language = languages[DEFAULT_LANGUAGE];
			***REMOVED***

			fireEvent("beforeHighlight", this, ***REMOVED*** code: unhighlightedCode, language: language, previousContext: partialContext ***REMOVED***);
			
			analyzerContext = createAnalyzerContext(
				tokenize.call(this, unhighlightedCode, language, partialContext, this.options),
				partialContext,
				this.options
			);
			
			analyze.call(this, analyzerContext, partialContext.index ? partialContext.index + 1 : 0);
			
			fireEvent("afterHighlight", this, ***REMOVED*** analyzerContext: analyzerContext ***REMOVED***);

			return analyzerContext;
		***REMOVED***
		
		function createContainer(ctx) ***REMOVED***
			var container = document.createElement("span");
			container.className = ctx.options.classPrefix + ctx.language.name;
			return container;
		***REMOVED***
		
		function analyze(analyzerContext, startIndex) ***REMOVED***
			var nodes,
				lastIndex,
				container,
				i,
				tokenName,
				func,
				language,
				analyzer;
			
			fireEvent("beforeAnalyze", this, ***REMOVED*** analyzerContext: analyzerContext ***REMOVED***);
			
			if (analyzerContext.tokens.length > 0) ***REMOVED***
				analyzerContext.language = languages[analyzerContext.tokens[0].language] || languages[DEFAULT_LANGUAGE];;
				nodes = [];
				lastIndex = 0;
				container = createContainer(analyzerContext);
				
				for (i = startIndex; i < analyzerContext.tokens.length; i++) ***REMOVED***
					language = languages[analyzerContext.tokens[i].language] || languages[DEFAULT_LANGUAGE];
					if (language.name !== analyzerContext.language.name) ***REMOVED***
						appendAll(container, analyzerContext.getNodes());
						analyzerContext.resetNodes();
						
						nodes.push(container);
						analyzerContext.language = language;
						container = createContainer(analyzerContext);
					***REMOVED***
					
					analyzerContext.index = i;
					tokenName = analyzerContext.tokens[i].name;
					func = "handle_" + tokenName;

					analyzer = analyzerContext.getAnalyzer.call(analyzerContext) || analyzerContext.language.analyzer;
					analyzer[func] ? analyzer[func](analyzerContext) : analyzer.handleToken(analyzerContext);
				***REMOVED***
				
				//append the last nodes, and add the final nodes to the context
				appendAll(container, analyzerContext.getNodes());
				nodes.push(container);
				analyzerContext.resetNodes();
				for (i = 0; i < nodes.length; i++) ***REMOVED***
					analyzerContext.addNode(nodes[i]);
				***REMOVED***
			***REMOVED***
			
			fireEvent("afterAnalyze", this, ***REMOVED*** analyzerContext: analyzerContext ***REMOVED***);
		***REMOVED***

		return ***REMOVED***
			//matches the language of the node to highlight
			matchSunlightNode: function() ***REMOVED***
				var regex;
				
				return function(node) ***REMOVED***
					if (!regex) ***REMOVED***
						regex = new RegExp("(?:\\s|^)" + this.options.classPrefix + "highlight-(\\S+)(?:\\s|$)");
					***REMOVED***
					
					return regex.exec(node.className);
				***REMOVED***;
			***REMOVED***(),
			
			//determines if the node has already been highlighted
			isAlreadyHighlighted: function() ***REMOVED***
				var regex;
				return function(node) ***REMOVED***
					if (!regex) ***REMOVED***
						regex = new RegExp("(?:\\s|^)" + this.options.classPrefix + "highlighted(?:\\s|$)");
					***REMOVED***
					
					return regex.test(node.className);
				***REMOVED***;
			***REMOVED***(),
			
			//highlights a block of text
			highlight: function(code, languageId) ***REMOVED*** return highlightText.call(this, code, languageId); ***REMOVED***,

			//recursively highlights a DOM node
			highlightNode: function highlightRecursive(node) ***REMOVED***
				var match,
					languageId,
					currentNodeCount,
					j,
					nodes,
					k,
					partialContext,
					container,
					codeContainer;
				
				if (this.isAlreadyHighlighted(node) || (match = this.matchSunlightNode(node)) === null) ***REMOVED***
					return;
				***REMOVED***

				languageId = match[1];
				currentNodeCount = 0;
				fireEvent("beforeHighlightNode", this, ***REMOVED*** node: node ***REMOVED***);
				for (j = 0; j < node.childNodes.length; j++) ***REMOVED***
					if (node.childNodes[j].nodeType === 3) ***REMOVED***
						//text nodes
						partialContext = highlightText.call(this, node.childNodes[j].nodeValue, languageId, partialContext);
						HIGHLIGHTED_NODE_COUNT++;
						currentNodeCount = currentNodeCount || HIGHLIGHTED_NODE_COUNT;
						nodes = partialContext.getNodes();

						node.replaceChild(nodes[0], node.childNodes[j]);
						for (k = 1; k < nodes.length; k++) ***REMOVED***
							node.insertBefore(nodes[k], nodes[k - 1].nextSibling);
						***REMOVED***
					***REMOVED*** else if (node.childNodes[j].nodeType === 1) ***REMOVED***
						//element nodes
						highlightRecursive.call(this, node.childNodes[j]);
					***REMOVED***
				***REMOVED***

				//indicate that this node has been highlighted
				node.className += " " + this.options.classPrefix + "highlighted";
				
				//if the node is block level, we put it in a container, otherwise we just leave it alone
				if (getComputedStyle(node, "display") === "block") ***REMOVED***
					container = document.createElement("div");
					container.className = this.options.classPrefix + "container";
					
					codeContainer = document.createElement("div");
					codeContainer.className = this.options.classPrefix + "code-container";

					//apply max height if specified in options
					if (this.options.maxHeight !== false) ***REMOVED***
						codeContainer.style.overflowY = "auto";
						codeContainer.style.maxHeight = this.options.maxHeight + (/^\d+$/.test(this.options.maxHeight) ? "px" : "");
					***REMOVED***
					
					container.appendChild(codeContainer);
					
					node.parentNode.insertBefore(codeContainer, node);
					node.parentNode.removeChild(node);
					codeContainer.appendChild(node);
					
					codeContainer.parentNode.insertBefore(container, codeContainer);
					codeContainer.parentNode.removeChild(codeContainer);
					container.appendChild(codeContainer);
				***REMOVED***
				
				fireEvent("afterHighlightNode", this, ***REMOVED*** 
					container: container,
					codeContainer: codeContainer,
					node: node, 
					count: currentNodeCount
				***REMOVED***);
			***REMOVED***
		***REMOVED***;
	***REMOVED***());

	//public facing object
	window.Sunlight = ***REMOVED***
		version: "1.18",
		Highlighter: Highlighter,
		createAnalyzer: function() ***REMOVED*** return create(defaultAnalyzer); ***REMOVED***,
		globalOptions: globalOptions,

		highlightAll: function(options) ***REMOVED***
			var highlighter = new Highlighter(options),
				tags = document.getElementsByTagName("*"),
				i;
			
			for (i = 0; i < tags.length; i++) ***REMOVED***
				highlighter.highlightNode(tags[i]);
			***REMOVED***
		***REMOVED***,

		registerLanguage: function(languageId, languageData) ***REMOVED***
			var tokenName,
				embeddedLanguages,
				languageName;
			
			if (!languageId) ***REMOVED***
				throw "Languages must be registered with an identifier, e.g. \"php\" for PHP";
			***REMOVED***

			languageData = merge(merge(***REMOVED******REMOVED***, languageDefaults), languageData);
			languageData.name = languageId;

			//transform keywords, operators and custom tokens into a hash map
			languageData.keywords = createHashMap(languageData.keywords || [], "\\b", languageData.caseInsensitive);
			languageData.operators = createHashMap(languageData.operators || [], "", languageData.caseInsensitive);
			for (tokenName in languageData.customTokens) ***REMOVED***
				languageData.customTokens[tokenName] = createHashMap(
					languageData.customTokens[tokenName].values,
					languageData.customTokens[tokenName].boundary,
					languageData.caseInsensitive
				);
			***REMOVED***
			
			//convert the embedded language object to an easier-to-use array
			embeddedLanguages = [];
			for (languageName in languageData.embeddedLanguages) ***REMOVED***
				embeddedLanguages.push(***REMOVED***
					parentLanguage: languageData.name,
					language: languageName,
					switchTo: languageData.embeddedLanguages[languageName].switchTo,
					switchBack: languageData.embeddedLanguages[languageName].switchBack
				***REMOVED***);
			***REMOVED***
			
			languageData.embeddedLanguages = embeddedLanguages;

			languages[languageData.name] = languageData;
		***REMOVED***,
		
		isRegistered: function(languageId) ***REMOVED*** return languages[languageId] !== undefined; ***REMOVED***,
		
		bind: function(event, callback) ***REMOVED***
			if (!events[event]) ***REMOVED***
				throw "Unknown event \"" + event + "\"";
			***REMOVED***
			
			events[event].push(callback);
		***REMOVED***,

		util: ***REMOVED***
			last: last,
			regexEscape: regexEscape,
			eol: EOL,
			clone: clone,
			escapeSequences: ["\\n", "\\t", "\\r", "\\\\", "\\v", "\\f"],
			contains: contains,
			matchWord: matchWord,
			createHashMap: createHashMap,
			createBetweenRule: createBetweenRule,
			createProceduralRule: createProceduralRule,
			getNextNonWsToken: function(tokens, index) ***REMOVED*** return getNextWhile(tokens, index, 1, function(token) ***REMOVED*** return token.name === "default"; ***REMOVED***); ***REMOVED***,
			getPreviousNonWsToken: function(tokens, index) ***REMOVED*** return getNextWhile(tokens, index, -1, function(token) ***REMOVED*** return token.name === "default"; ***REMOVED***); ***REMOVED***,
			getNextWhile: function(tokens, index, matcher) ***REMOVED*** return getNextWhile(tokens, index, 1, matcher); ***REMOVED***,
			getPreviousWhile: function(tokens, index, matcher) ***REMOVED*** return getNextWhile(tokens, index, -1, matcher); ***REMOVED***,
			whitespace: ***REMOVED*** token: "default", optional: true ***REMOVED***,
			getComputedStyle: getComputedStyle
		***REMOVED***
	***REMOVED***;

	//register the default language
	window.Sunlight.registerLanguage(DEFAULT_LANGUAGE, ***REMOVED*** punctuation: /(?!x)x/, numberParser: EMPTY ***REMOVED***);

***REMOVED***(this, document));