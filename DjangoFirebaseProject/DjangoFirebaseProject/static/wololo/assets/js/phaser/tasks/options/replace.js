//  If we've updated pixi or p2 then their UMD wrappers will be wrong, this will fix it:
module.exports = ***REMOVED***
    pixi: ***REMOVED***
        src: ['src/pixi/Outro.js'],
        dest: 'src/pixi/Outro.js',
        replacements: [***REMOVED***
            from: "define(PIXI);",
            to: "define('PIXI', (function() ***REMOVED*** return root.PIXI = PIXI; ***REMOVED***)() );"
        ***REMOVED***]
    ***REMOVED***,

    p2: ***REMOVED***
        src: ['src/physics/p2/p2.js'],
        dest: 'src/physics/p2/p2.js',
        replacements: [***REMOVED***
            from: '!function(e)***REMOVED***"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.p2=e():"undefined"!=typeof global?global.p2=e():"undefined"!=typeof self&&(self.p2=e())***REMOVED***(function()***REMOVED***var define,module,exports;return (function e(t,n,r)***REMOVED***function s(o,u)***REMOVED***if(!n[o])***REMOVED***if(!t[o])***REMOVED***var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module \'"+o+"\'")***REMOVED***var f=n[o]=***REMOVED***exports:***REMOVED******REMOVED******REMOVED***;t[o][0].call(f.exports,function(e)***REMOVED***var n=t[o][1][e];return s(n?n:e)***REMOVED***,f,f.exports,e,t,n,r)***REMOVED***return n[o].exports***REMOVED***var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s***REMOVED***)(***REMOVED***1:[function(require,module,exports)***REMOVED***',
            to: '!function(e)***REMOVED***"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(\'p2\', (function() ***REMOVED*** return this.p2 = e(); ***REMOVED***)()):"undefined"!=typeof window?window.p2=e():"undefined"!=typeof global?self.p2=e():"undefined"!=typeof self&&(self.p2=e())***REMOVED***(function()***REMOVED***var define,module,exports;return (function e(t,n,r)***REMOVED***function s(o,u)***REMOVED***if(!n[o])***REMOVED***if(!t[o])***REMOVED***var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module \'"+o+"\'")***REMOVED***var f=n[o]=***REMOVED***exports:***REMOVED******REMOVED******REMOVED***;t[o][0].call(f.exports,function(e)***REMOVED***var n=t[o][1][e];return s(n?n:e)***REMOVED***,f,f.exports,e,t,n,r)***REMOVED***return n[o].exports***REMOVED***var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s***REMOVED***)(***REMOVED***1:[function(require,module,exports)***REMOVED***'
        ***REMOVED***]
    ***REMOVED***,

    docs: ***REMOVED***
        src: ['docs/index.html'],
        dest: 'docs/index.html',
        replacements: [
            ***REMOVED***
                from: /<p><img src="http:\/\/www.phaser.io\/images\/github\/welcome-div2.png" alt="div"><\/p>/g,
                to: ''
            ***REMOVED***,
            ***REMOVED***
                from: /<p><img src="http:\/\/www.phaser.io\/images\/github\/div.png" alt="div"><\/p>/g,
                to: ''
            ***REMOVED***,
            ***REMOVED***
                from: /&lt;div align=&quot;center&quot;&gt;&lt;img src=&quot;http:\/\/phaser.io\/images\/github\/news.jpg&quot;&gt;&lt;\/div&gt;/g,
                to: ''
            ***REMOVED***,
            ***REMOVED***
                from: /&lt;div align=&quot;center&quot;&gt;&lt;img src=&quot;http:\/\/phaser.io\/images\/github\/books.jpg&quot;&gt;&lt;\/div&gt;/g,
                to: ''
            ***REMOVED***,
            ***REMOVED***
                from: /&lt;div align=&quot;center&quot;&gt;&lt;img src=&quot;http:\/\/phaser.io\/images\/github\/books.jpg&quot;&gt;&lt;\/div&gt;/g,
                to: ''
            ***REMOVED***,
            ***REMOVED***
                from: /(<p><img src="http:\/\/www\.phaser\.io\/images\/phaser2)[\s\S]*(<li><a href="#license">License<\/a><\/li>\s<\/ul>)/g,
                to: ''
            ***REMOVED***,
            ***REMOVED***
                from: /(<!--<h1 class="page-title">Index<\/h1>-->)[\s\S]*(<\/section>\s*<\/div>\s*<div class="clearfix"><\/div>\s*<footer>)/g,
                to: '</article></div><div class="clearfix"></div><footer>'
            ***REMOVED***,
            ***REMOVED***
                from: /(<p>&lt;).*(&gt;<\/p>)/g,
                to: ''
            ***REMOVED***,
            ***REMOVED***
                from: '<a href="http://phaser.io/images/github/shot1a.jpg">![Game</a>][game1]',
                to: '<img src="http://phaser.io/images/github/shot1a.jpg">'
            ***REMOVED***,
            ***REMOVED***
                from: '<a href="http://phaser.io/images/github/shot2a.jpg">![Game</a>][game2]',
                to: '<img src="http://phaser.io/images/github/shot2a.jpg"><br>'
            ***REMOVED***,
            ***REMOVED***
                from: '<a href="http://phaser.io/images/github/shot3a.jpg">![Game</a>][game3]',
                to: '<img src="http://phaser.io/images/github/shot3a.jpg">'
            ***REMOVED***,
            ***REMOVED***
                from: '<a href="http://phaser.io/images/github/shot4a.jpg">![Game</a>][game4]',
                to: '<img src="http://phaser.io/images/github/shot4a.jpg"><br>'
            ***REMOVED***,
            ***REMOVED***
                from: '<a href="http://phaser.io/images/github/shot5b.jpg">![Game</a>][game5]',
                to: '<img src="http://phaser.io/images/github/shot5b.jpg">'
            ***REMOVED***,
            ***REMOVED***
                from: '<a href="http://phaser.io/images/github/shot6b.jpg">![Game</a>][game6]',
                to: '<img src="http://phaser.io/images/github/shot6b.jpg">'
            ***REMOVED***,
            ***REMOVED***
                from: '<a href="http://phaser.io/images/github/shot7b.jpg">![Game</a>][game7]',
                to: '<img src="http://phaser.io/images/github/shot7b.jpg"><br>'
            ***REMOVED***,
            ***REMOVED***
                from: '<a href="http://phaser.io/images/github/shot8.jpg">![Game</a>][game8]',
                to: '<img src="http://phaser.io/images/github/shot8.jpg">'
            ***REMOVED***,
            ***REMOVED***
                from: '<a href="http://phaser.io/images/github/shot9.jpg">![Game</a>][game9]',
                to: '<img src="http://phaser.io/images/github/shot9.jpg"><br>'
            ***REMOVED***,
            ***REMOVED***
                from: '<a href="http://phaser.io/images/github/shot10.jpg">![Game</a>][game10]',
                to: '<img src="http://phaser.io/images/github/shot10.jpg">'
            ***REMOVED***,
            ***REMOVED***
                from: '<a href="http://phaser.io/images/github/shot11.jpg">![Game</a>][game11]',
                to: '<img src="http://phaser.io/images/github/shot11.jpg"><br>'
            ***REMOVED***,
            ***REMOVED***
                from: '<a href="http://phaser.io/images/github/shot12.jpg">![Game</a>][game12]',
                to: '<img src="http://phaser.io/images/github/shot12.jpg">'
            ***REMOVED***,
            ***REMOVED***
                from: '<a href="http://phaser.io/images/github/shot13.jpg">![Game</a>][game13]',
                to: '<img src="http://phaser.io/images/github/shot13.jpg">'
            ***REMOVED***,
            ***REMOVED***
                from: '<a href="http://phaser.io/images/github/shot14.jpg">![Game</a>]<a href="http://www.tempalabs.com/works/gattai/">game14</a>',
                to: '<img src="http://phaser.io/images/github/shot14.jpg">'
            ***REMOVED***
        ]
    ***REMOVED***,

    phasertsdefheader: ***REMOVED***
        src: ['typescript/phaser.comments.d.ts'],
        dest: 'typescript/phaser.comments.d.ts',
        replacements: [***REMOVED***
            from: 'path="pixi.d.ts"',
            to: 'path="pixi.comments.d.ts"'
        ***REMOVED***]
    ***REMOVED***
***REMOVED***;
