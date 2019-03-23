(function(sunlight, undefined)***REMOVED***

	if (sunlight === undefined || sunlight["registerLanguage"] === undefined) ***REMOVED***
		throw "Include sunlight.js before including language files";
	***REMOVED***
	
	sunlight.registerLanguage("javascript", ***REMOVED***
		keywords: [
			//keywords
			"break", "case", "catch", "continue", "default", "delete", "do", 
			"else",	"finally", "for", "function", "if", "in", "instanceof",
			"new", "return", "switch", "this", "throw", "try", "typeof", 
			"var", "void", "while", "with",
			
			//literals
			"true", "false", "null"
		],
		
		customTokens: ***REMOVED***
			reservedWord: ***REMOVED***
				values: [
					"abstract", "boolean", "byte", "char", "class", "const", "debugger", "double",
					"enum", "export", "extends", "final", "float", "goto", "implements", "import",
					"int", "interface", "long", "native", "package", "private", "protected", "public",
					"short", "static", "super", "synchronized", "throws", "transient", "volatile"
				],
				boundary: "\\b"
			***REMOVED***,
			
			globalVariable: ***REMOVED***
				values: ["NaN", "Infinity", "undefined"],
				boundary: "\\b"
			***REMOVED***,
			
			globalFunction: ***REMOVED***
				values: ["encodeURI", "encodeURIComponent", "decodeURI", "decodeURIComponent", "parseInt", "parseFloat", "isNaN", "isFinite", "eval"],
				boundary: "\\b"
			***REMOVED***,
			
			globalObject: ***REMOVED***
				values: [
					"Math", "JSON",
					"XMLHttpRequest", "XDomainRequest", "ActiveXObject",
					"Boolean", "Date", "Array", "Image", "Function", "Object", "Number", "RegExp", "String"
				],
				boundary: "\\b"
			***REMOVED***
		***REMOVED***,

		scopes: ***REMOVED***
			string: [ ["\"", "\"", sunlight.util.escapeSequences.concat(["\\\""])], ["'", "'", sunlight.util.escapeSequences.concat(["\\\'", "\\\\"])] ],
			comment: [ ["//", "\n", null, true], ["/*", "*/"] ]
		***REMOVED***,
		
		customParseRules: [
			//regex literal
			function(context) ***REMOVED***
				var peek = context.reader.peek(),
					isValid,
					regexLiteral = "/",
					line = context.reader.getLine(),
					column = context.reader.getColumn(),
					charClass = false,
					peek2,
					next;
					
				if (context.reader.current() !== "/" || peek === "/" || peek === "*") ***REMOVED***
					//doesn't start with a / or starts with // (comment) or /* (multi line comment)
					return null;
				***REMOVED***
				
				isValid = function() ***REMOVED***
					var previousNonWsToken = context.token(context.count() - 1),
						previousToken = null;
					if (context.defaultData.text !== "") ***REMOVED***
						previousToken = context.createToken("default", context.defaultData.text); 
					***REMOVED***
					
					if (!previousToken) ***REMOVED***
						previousToken = previousNonWsToken;
					***REMOVED***
					
					//first token of the string
					if (previousToken === undefined) ***REMOVED***
						return true;
					***REMOVED***
					
					//since JavaScript doesn't require statement terminators, if the previous token was whitespace and contained a newline, then we're good
					if (previousToken.name === "default" && previousToken.value.indexOf("\n") > -1) ***REMOVED***
						return true;
					***REMOVED***
					
					if (sunlight.util.contains(["keyword", "ident", "number"], previousNonWsToken.name)) ***REMOVED***
						return false;
					***REMOVED***
					if (previousNonWsToken.name === "punctuation" && !sunlight.util.contains(["(", "***REMOVED***", "[", ",", ";"], previousNonWsToken.value)) ***REMOVED***
						return false;
					***REMOVED***
					
					return true;
				***REMOVED***();
				
				if (!isValid) ***REMOVED***
					return null;
				***REMOVED***
				
				//read the regex literal
				while (context.reader.peek() !== context.reader.EOF) ***REMOVED***
					peek2 = context.reader.peek(2);
					if (peek2 === "\\/" || peek2 === "\\\\") ***REMOVED***
						//escaped backslash or escaped forward slash
						regexLiteral += context.reader.read(2);
						continue;
					***REMOVED***
					if (peek2 === "\\[" || peek2 === "\\]") ***REMOVED***
						regexLiteral += context.reader.read(2);
						continue;
					***REMOVED*** else if (next === "[") ***REMOVED***
						charClass = true;
					***REMOVED*** else if (next === "]") ***REMOVED***
						charClass = false;
					***REMOVED***
					
					regexLiteral += (next = context.reader.read());
					if (next === "/" && !charClass) ***REMOVED***
						break;
					***REMOVED***
				***REMOVED***
				
				//read the regex modifiers
				//only "g", "i" and "m" are allowed, but for the sake of simplicity we'll just say any alphabetical character is valid
				while (context.reader.peek() !== context.reader.EOF) ***REMOVED***
					if (!/[A-Za-z]/.test(context.reader.peek())) ***REMOVED***
						break;
					***REMOVED***
					
					regexLiteral += context.reader.read();
				***REMOVED***
				
				return context.createToken("regexLiteral", regexLiteral, line, column);
			***REMOVED***
		],
		
		identFirstLetter: /[$A-Za-z_]/,
		identAfterFirstLetter: /[\w\$]/,
		
		namedIdentRules: ***REMOVED***
			follows: [
				[***REMOVED*** token: "keyword", values: ["function"] ***REMOVED***, sunlight.util.whitespace]
			]
		***REMOVED***,

		operators: [
			//arithmetic
			"++", "+=", "+",
			"--", "-=", "-",
			      "*=", "*",
			      "/=", "/",
			      "%=", "%",

			//boolean
			"&&", "||",

			//bitwise
			"|=",   "|",
			"&=",   "&",
			"^=",   "^",
			">>>=", ">>>", ">>=", ">>",
			"<<=", "<<",

			//inequality
			"<=", "<",
			">=", ">",
			"===", "==", "!==", "!=",

			//unary
			"!", "~",

			//other
			"?", ":", ".", "="
		]
	***REMOVED***);
***REMOVED***(this["Sunlight"]));