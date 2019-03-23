/**
* Add comments in a TypeScript definition file
*/
'use strict';

var ts = require('typescript');
var fs = require('fs');

var TypeScriptDocGenerator = (function () ***REMOVED***
    function TypeScriptDocGenerator(tsDefFileName, jsdocJsonFileName) ***REMOVED***
        this.nbCharsAdded = 0;
        this.tsDefFileName = ts.normalizePath(tsDefFileName);
        this.tsDefFileContent = fs.readFileSync(this.tsDefFileName, 'utf-8').toString();
        this.delintNodeFunction = this.delintNode.bind(this);
        var jsonDocsFileContent = fs.readFileSync(jsdocJsonFileName, 'utf-8').toString();
        this.docs = JSON.parse(jsonDocsFileContent);
        var options = ***REMOVED*** target: ts.ScriptTarget.ES5, module: ts.ModuleKind.AMD ***REMOVED***;
        var host = ts.createCompilerHost(options);
        var program = ts.createProgram([this.tsDefFileName], options, host);
        this.sourceFile = program.getSourceFile(this.tsDefFileName);
    ***REMOVED***
    TypeScriptDocGenerator.prototype.getTsDefCommentedFileContent = function () ***REMOVED***
        this.scan();
        return this.tsDefFileContent;
    ***REMOVED***;
    TypeScriptDocGenerator.prototype.repeatSpaces = function (nb) ***REMOVED***
        var res = "";
        for (var i = 0; i < nb; i++) ***REMOVED***
            res += " ";
        ***REMOVED***
        return res;
    ***REMOVED***;
    TypeScriptDocGenerator.prototype.insertComment = function (commentLines, position) ***REMOVED***
        if ((commentLines != null) && (commentLines.length > 0)) ***REMOVED***
            var nbChars = 0;
            for (var i = 0; i < commentLines.length; i++) ***REMOVED***
                nbChars += commentLines[i].trim().length;
            ***REMOVED***
            if (nbChars > 0) ***REMOVED***
                var lc = this.sourceFile.getLineAndCharacterFromPosition(position);
                var nbSpaces = lc.character - 1;
                var startLinePosition = this.sourceFile.getLineStarts()[lc.line - 1];
                var comment = "\r\n" + this.repeatSpaces(nbSpaces) + "/**\r\n";
                for (var j = 0; j < commentLines.length; j++) ***REMOVED***
                    comment += this.repeatSpaces(nbSpaces) + "* " + commentLines[j].trimRight() + "\r\n";
                ***REMOVED***
                comment += this.repeatSpaces(nbSpaces) + "*/\r\n";
                this.tsDefFileContent = this.tsDefFileContent.substr(0, startLinePosition + this.nbCharsAdded) + comment + this.tsDefFileContent.substr(startLinePosition + this.nbCharsAdded);
                this.nbCharsAdded += comment.length;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***;
    TypeScriptDocGenerator.prototype.cleanEndLine = function (str) ***REMOVED***
        return str.replace(new RegExp('[' + "\r\n" + ']', 'g'), "\n").replace(new RegExp('[' + "\r" + ']', 'g'), "\n");
    ***REMOVED***;
    TypeScriptDocGenerator.prototype.findClass = function (className) ***REMOVED***
        if (className.indexOf("p2.") === 0) ***REMOVED***
            className = className.replace("p2.", "Phaser.Physics.P2.");
        ***REMOVED***
        var elements = this.docs.classes.filter(function (element) ***REMOVED***
            return (element.name === className);
        ***REMOVED***);
        return elements[0];
    ***REMOVED***;
    TypeScriptDocGenerator.prototype.generateClassComments = function (className) ***REMOVED***
        var c = this.findClass(className);
        if (c != null) ***REMOVED***
            var comments = [];
            comments = comments.concat(this.cleanEndLine(c.description).split("\n"));
            return comments;
        ***REMOVED***
        else ***REMOVED***
            return null;
        ***REMOVED***
    ***REMOVED***;
    TypeScriptDocGenerator.prototype.generateMemberComments = function (className, memberName) ***REMOVED***
        var c = this.findClass(className);
        if (c != null) ***REMOVED***
            for (var i = 0; i < c.members.length; i++) ***REMOVED***
                if (c.members[i].name === memberName) ***REMOVED***
                    var m = c.members[i];
                    var comments = [];
                    comments = comments.concat(this.cleanEndLine(m.description).split("\n"));
                    if ((m.default != null) && (m.default !== "")) ***REMOVED***
                        comments.push("Default: " + m.default);
                    ***REMOVED***
                    return comments;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else ***REMOVED***
            return null;
        ***REMOVED***
    ***REMOVED***;
    TypeScriptDocGenerator.prototype.generateFunctionComments = function (className, functionName) ***REMOVED***
        var c = this.findClass(className);
        if (c != null) ***REMOVED***
            for (var i = 0; i < c.functions.length; i++) ***REMOVED***
                if (c.functions[i].name === functionName) ***REMOVED***
                    var f = c.functions[i];
                    var comments = [];
                    comments = comments.concat(this.cleanEndLine(f.description).split("\n"));
                    if (f.parameters.length > 0) ***REMOVED***
                        comments.push("");
                    ***REMOVED***
                    for (var j = 0; j < f.parameters.length; j++) ***REMOVED***
                        var p = f.parameters[j];
                        if (p.type === "*") ***REMOVED***
                            p.name = "args";
                        ***REMOVED***
                        var def = "";
                        if ((p.default != null) && (p.default !== "")) ***REMOVED***
                            def = " - Default: " + p.default;
                        ***REMOVED***
                        var paramComments = this.cleanEndLine(p.description).split("\n");
                        for (var k = 0; k < paramComments.length; k++) ***REMOVED***
                            if (k === 0) ***REMOVED***
                                comments.push("@param " + p.name + " " + paramComments[k].trim() + ((k === paramComments.length - 1) ? def : ""));
                            ***REMOVED***
                            else ***REMOVED***
                                comments.push(this.repeatSpaces(("@param " + p.name + " ").length) + paramComments[k].trim() + ((k === paramComments.length - 1) ? def : ""));
                            ***REMOVED***
                        ***REMOVED***
                    ***REMOVED***
                    if ((f.returns != null) && (f.returns.description.trim().length > 0)) ***REMOVED***
                        var returnComments = this.cleanEndLine(f.returns.description).split("\n");
                        for (var l = 0; l < returnComments.length; l++) ***REMOVED***
                            if (l === 0) ***REMOVED***
                                comments.push("@return " + returnComments[l].trim());
                            ***REMOVED***
                            else ***REMOVED***
                                comments.push(this.repeatSpaces(("@return ").length) + returnComments[l].trim());
                            ***REMOVED***
                        ***REMOVED***
                    ***REMOVED***
                    return comments;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        else ***REMOVED***
            return null;
        ***REMOVED***
    ***REMOVED***;
    TypeScriptDocGenerator.prototype.generateConstructorComments = function (className) ***REMOVED***
        var c = this.findClass(className);
        if (c != null) ***REMOVED***
            var con = c.constructor;
            var comments = [];
            comments = comments.concat(this.cleanEndLine(con.description).split("\n"));
            if (con.parameters.length > 0) ***REMOVED***
                comments.push("");
            ***REMOVED***
            for (var j = 0; j < con.parameters.length; j++) ***REMOVED***
                var p = con.parameters[j];
                if (p.type === "*") ***REMOVED***
                    p.name = "args";
                ***REMOVED***
                var def = "";
                if ((p.default != null) && (p.default !== "")) ***REMOVED***
                    def = " - Default: " + p.default;
                ***REMOVED***
                var paramComments = this.cleanEndLine(p.description).split("\n");
                for (var k = 0; k < paramComments.length; k++) ***REMOVED***
                    if (k === 0) ***REMOVED***
                        comments.push("@param " + p.name + " " + paramComments[k].trim() + ((k === paramComments.length - 1) ? def : ""));
                    ***REMOVED***
                    else ***REMOVED***
                        comments.push(this.repeatSpaces(("@param " + p.name + " ").length) + paramComments[k].trim() + ((k === paramComments.length - 1) ? def : ""));
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
            return comments;
        ***REMOVED***
        else ***REMOVED***
            return null;
        ***REMOVED***
    ***REMOVED***;
    TypeScriptDocGenerator.prototype.scan = function () ***REMOVED***
        this.delintNode(this.sourceFile);
    ***REMOVED***;
    TypeScriptDocGenerator.prototype.getClassName = function (node) ***REMOVED***
        var fullName = '';
        if (node.kind === ts.SyntaxKind.ClassDeclaration) ***REMOVED***
            fullName = node.name.getText();
        ***REMOVED***
        var parent = node.parent;
        while (parent != null) ***REMOVED***
            if (parent.kind === ts.SyntaxKind.ModuleDeclaration || parent.kind === ts.SyntaxKind.ClassDeclaration) ***REMOVED***
                fullName = parent.name.getText() + ((fullName !== '') ? "." + fullName : fullName);
            ***REMOVED***
            parent = parent.parent;
        ***REMOVED***
        return fullName;
    ***REMOVED***;
    TypeScriptDocGenerator.prototype.delintNode = function (node) ***REMOVED***
        switch (node.kind) ***REMOVED***
            case ts.SyntaxKind.Constructor:
                this.insertComment(this.generateConstructorComments(this.getClassName(node)), node.getStart());
                break;
            case ts.SyntaxKind.ClassDeclaration:
                this.insertComment(this.generateClassComments(this.getClassName(node)), node.getStart());
                break;
            case ts.SyntaxKind.Property:
                this.insertComment(this.generateMemberComments(this.getClassName(node), node.name.getText()), node.getStart());
                break;
            case ts.SyntaxKind.Method:
                this.insertComment(this.generateFunctionComments(this.getClassName(node), node.name.getText()), node.getStart());
                break;
        ***REMOVED***
        ts.forEachChild(node, this.delintNodeFunction);
    ***REMOVED***;
    return TypeScriptDocGenerator;
***REMOVED***)();
module.exports = function (grunt) ***REMOVED***
    grunt.registerMultiTask('buildtsdoc', 'Generate a TypeScript def with comments', function () ***REMOVED***
        var tsdg = new TypeScriptDocGenerator(this.data.tsDefFileName, this.data.jsdocJsonFileName);
        fs.writeFileSync(this.data.dest, tsdg.getTsDefCommentedFileContent(), 'utf8');
    ***REMOVED***);
***REMOVED***;