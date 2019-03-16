/// <binding BeforeBuild='default' />
module.exports = function (grunt) ***REMOVED***

    var loadConfig = require('load-grunt-config');

    loadConfig(grunt, ***REMOVED***
        configPath: __dirname + '/tasks/options',
        config: ***REMOVED***
            target_dir: 'build',
            release_dir: 'build',
            release_custom_dir: 'build/custom',
            compile_dir: 'dist',
            modules_dir: 'dist/modules',
            docs_dir: 'docs',
            sourcemap: false,
            filename: 'phaser',
            pixiFilename: 'pixi.js',
            p2Filename: 'p2.js',
            creatureFilename: 'creature.js',
            filelist: [],
            banner: require('fs').readFileSync(__dirname + '/tasks/banner.txt', 'utf8')
        ***REMOVED***
    ***REMOVED***);

    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['build']);

    grunt.registerTask('docs', ['clean:docs', 'pixidoc', 'jsdoc:html', 'replace:docs', 'clean:out']);
    grunt.registerTask('tsdocs', ['clean:out', 'pixidoc', 'gitclone:plugins', 'jsdoc:json', 'buildtsdoc:pixi', 'buildtsdoc:phaser', 'replace:phasertsdefheader', 'clean:out']);

    grunt.registerTask('custom', 'Build a custom version of Phaser', function(arg) ***REMOVED***

        var modules = ***REMOVED***
            'intro':            ***REMOVED*** 'description': 'Phaser UMD wrapper',                          'optional': true, 'stub': false ***REMOVED***,
            'phaser':           ***REMOVED*** 'description': 'Phaser Globals',                              'optional': false, 'stub': false ***REMOVED***,
            'geom':             ***REMOVED*** 'description': 'Geometry Classes',                            'optional': false, 'stub': false ***REMOVED***,
            'core':             ***REMOVED*** 'description': 'Phaser Core',                                 'optional': false, 'stub': false ***REMOVED***,
            'input':            ***REMOVED*** 'description': 'Input Manager + Mouse and Touch Support',     'optional': false, 'stub': false ***REMOVED***,
            'gamepad':          ***REMOVED*** 'description': 'Gamepad Input',                               'optional': true, 'stub': false ***REMOVED***,
            'keyboard':         ***REMOVED*** 'description': 'Keyboard Input',                              'optional': true, 'stub': false ***REMOVED***,
            'components':       ***REMOVED*** 'description': 'Game Object Components',                      'optional': false, 'stub': false ***REMOVED***,
            'gameobjects':      ***REMOVED*** 'description': 'Core Game Objects',                           'optional': false, 'stub': false ***REMOVED***,
            'bitmapdata':       ***REMOVED*** 'description': 'BitmapData Game Object',                      'optional': true, 'stub': false ***REMOVED***,
            'graphics':         ***REMOVED*** 'description': 'Graphics and PIXI Mask Support',              'optional': true, 'stub': false ***REMOVED***,
            'rendertexture':    ***REMOVED*** 'description': 'RenderTexture Game Object',                   'optional': true, 'stub': false ***REMOVED***,
            'text':             ***REMOVED*** 'description': 'Text Game Object (inc. Web Font Support)',    'optional': true, 'stub': false ***REMOVED***,
            'bitmaptext':       ***REMOVED*** 'description': 'BitmapText Game Object',                      'optional': true, 'stub': false ***REMOVED***,
            'retrofont':        ***REMOVED*** 'description': 'Retro Fonts Game Object',                     'optional': true, 'stub': false ***REMOVED***,
            'rope':             ***REMOVED*** 'description': 'Rope and Strip Game Object',                  'optional': true, 'stub': false ***REMOVED***,
            'tilesprite':       ***REMOVED*** 'description': 'Tile Sprite Game Object',                     'optional': true, 'stub': true ***REMOVED***,
            'system':           ***REMOVED*** 'description': 'System Classes',                              'optional': false, 'stub': false ***REMOVED***,
            'math':             ***REMOVED*** 'description': 'Math, QuadTree and RND',                      'optional': false, 'stub': false ***REMOVED***,
            'net':              ***REMOVED*** 'description': 'Network Class',                               'optional': true, 'stub': true ***REMOVED***,
            'tweens':           ***REMOVED*** 'description': 'Tween Manager',                               'optional': true, 'stub': true ***REMOVED***,
            'time':             ***REMOVED*** 'description': 'Time and Clock Manager',                      'optional': false, 'stub': false ***REMOVED***,
            'animation':        ***REMOVED*** 'description': 'Animation and Frame Manager',                 'optional': false, 'stub': false ***REMOVED***,
            'loader':           ***REMOVED*** 'description': 'Loader and Cache',                            'optional': false, 'stub': false ***REMOVED***,
            'sound':            ***REMOVED*** 'description': 'Sound Support (Web Audio and HTML Audio)',    'optional': true, 'stub': true ***REMOVED***,
            'scale':            ***REMOVED*** 'description': 'Scale and Full Screen Manager',               'optional': true, 'stub': true ***REMOVED***,
            'debug':            ***REMOVED*** 'description': 'Debug Class',                                 'optional': true, 'stub': true ***REMOVED***,
            'dom':              ***REMOVED*** 'description': 'DOM Utilities',                               'optional': true, 'stub': true ***REMOVED***,
            'utils':            ***REMOVED*** 'description': 'Core Utilities',                              'optional': false, 'stub': false ***REMOVED***,
            'create':           ***REMOVED*** 'description': 'Create Support',                              'optional': true, 'stub': true ***REMOVED***,
            'flexgrid':         ***REMOVED*** 'description': 'Flex Grid and Flex Layer',                    'optional': true, 'stub': false ***REMOVED***,
            'color':            ***REMOVED*** 'description': 'Color Functions',                             'optional': true, 'stub': true ***REMOVED***,
            'physics':          ***REMOVED*** 'description': 'Physics Manager',                             'optional': false, 'stub': false ***REMOVED***,
            'arcade':           ***REMOVED*** 'description': 'Arcade Physics',                              'optional': true, 'stub': false ***REMOVED***,
            'ninja':            ***REMOVED*** 'description': 'Ninja Physics',                               'optional': true, 'stub': false ***REMOVED***,
            'p2':               ***REMOVED*** 'description': 'P2 Physics',                                  'optional': true, 'stub': false ***REMOVED***,
            'tilemaps':         ***REMOVED*** 'description': 'Tilemap Support',                             'optional': true, 'stub': false ***REMOVED***,
            'particles':        ***REMOVED*** 'description': 'Arcade Physics Particle System',              'optional': true, 'stub': true ***REMOVED***,
            'weapon':           ***REMOVED*** 'description': 'Arcade Physics Weapon Plugin',                'optional': true, 'stub': false ***REMOVED***,
            'creature':         ***REMOVED*** 'description': 'Creature Animation Tool Support',             'optional': true, 'stub': false ***REMOVED***,
            'video':            ***REMOVED*** 'description': 'Video Game Object',                           'optional': true, 'stub': false ***REMOVED***,
            'pixidefs':         ***REMOVED*** 'description': 'Pixi defaults',                               'optional': true, 'stub': false ***REMOVED***,
            'outro':            ***REMOVED*** 'description': 'Phaser UMD closure',                          'optional': true, 'stub': false ***REMOVED***
        ***REMOVED***;

        grunt.log.writeln("---------------------");
        grunt.log.writeln("Building Phaser " + grunt.config.get('package.version'));
        grunt.log.writeln("---------------------");

        if (!grunt.option('exclude'))
        ***REMOVED***
            grunt.log.writeln("\nUse --exclude to select which modules to exclude:\n");

            for (var module in modules)
            ***REMOVED***
                if (modules[module].optional)
                ***REMOVED***
                    grunt.log.writeln(module + ' - ' + modules[module].description);
                ***REMOVED***
            ***REMOVED***

            grunt.log.writeln("\nFor example: --exclude p2,tilemaps,retrofont\n");
            grunt.log.writeln("Optional flags:\n");
            grunt.log.writeln("--filename yourfilename (builds to your own custom file name)");
            grunt.log.writeln("--sourcemap true (creates a source map)");
            grunt.log.writeln("--split true (splits Phaser, PIXI, p2 and Creature into separate files)");
            grunt.log.writeln("--uglify true (runs Uglify on the output files)");
            grunt.log.writeln("\nNote that some modules have dependencies on others.\n");

            grunt.fail.fatal("No build options were specified.");
        ***REMOVED***
        else
        ***REMOVED***
            //  Defaults
            grunt.config.set('sourcemap', false);
            grunt.config.set('filename', 'phaser');
            grunt.config.set('split', false);
            grunt.config.set('target_dir', '<%= release_dir %>');

            var split = false;

            //  Overrides
            if (grunt.option('filename'))
            ***REMOVED***
                grunt.config.set('filename', grunt.option('filename'));
            ***REMOVED***

            if (grunt.option('sourcemap'))
            ***REMOVED***
                grunt.config.set('sourcemap', grunt.option('sourcemap'));
            ***REMOVED***

            if (grunt.option('split'))
            ***REMOVED***
                grunt.config.set('split', grunt.option('split'));
                split = grunt.option('split');
            ***REMOVED***

            grunt.log.writeln("Excluding modules:\n");

            var excludedKeys = [];

            //  Nothing is excluded!
            var excludes = false;

            if (grunt.option('exclude') !== 'null')
            ***REMOVED***
                excludes = grunt.option('exclude').split(',');

                //  Check the given modules are all valid
                for (var i = 0; i < excludes.length; i++)
                ***REMOVED***
                    var exclude = excludes[i];

                    if (modules[exclude])
                    ***REMOVED***
                        grunt.log.writeln("* " + exclude + ' - ' + modules[exclude].description);
                        excludedKeys[exclude] = true;
                    ***REMOVED***
                    else
                    ***REMOVED***
                        grunt.fail.fatal("Unknown module '" + exclude + "'");
                    ***REMOVED***
                ***REMOVED***

                //  Handle basic dependencies

                if (excludedKeys['arcade'] && !excludedKeys['particles'])
                ***REMOVED***
                    grunt.log.writeln("Warning: Particles rely on Arcade Physics which has been excluded. Removing Particles from build.");
                    excludes.push('particles');
                ***REMOVED***

                if (excludedKeys['arcade'] && !excludedKeys['weapon'])
                ***REMOVED***
                    grunt.log.writeln("Warning: The Weapon Plugin relies on Arcade Physics which has been excluded. Removing Weapon Plugin from build.");
                    excludes.push('weapon');
                ***REMOVED***

                if (excludedKeys['rendertexture'] && !excludedKeys['retrofont'])
                ***REMOVED***
                    grunt.log.writeln("Warning: RetroFonts rely on RenderTextures. Excluding from build.");
                    excludes.push('retrofont');
                ***REMOVED***
            ***REMOVED***

            /////////////////////////////////////////////////////////////////////////
            //  Ok we know the excludes array is fine, let's get this show started //
            /////////////////////////////////////////////////////////////////////////

            var filelist = [];
            var pixiFilelist = [];

            //  Clean the working folder
            var tasks = [ 'clean:build' ];

            if (split)
            ***REMOVED***

                ////////////////////////////////////////
                //  Split build (for Browserify, etc) //
                ////////////////////////////////////////

                grunt.log.writeln("\nSplitting Globals ...\n");

                //  1) Creature

                if (!excludedKeys['creature'])
                ***REMOVED***
                    grunt.log.writeln("-> Creature");
                    tasks.push('concat:creatureGlobalSplit');

                    if (grunt.option('uglify'))
                    ***REMOVED***
                        tasks.push('uglify:creature');
                    ***REMOVED***
                ***REMOVED***

                //  2) P2

                if (!excludedKeys['p2'])
                ***REMOVED***
                    grunt.log.writeln("-> P2.js");
                    tasks.push('concat:p2GlobalSplit');

                    if (grunt.option('uglify'))
                    ***REMOVED***
                        tasks.push('uglify:p2');
                    ***REMOVED***
                ***REMOVED***

                //  3) PIXI

                grunt.log.writeln("-> PIXI");
                
                if (!excludedKeys['intro'])
                ***REMOVED***
                    tasks.push('concat:pixiIntro');
                    pixiFilelist.push('<%= modules_dir %>/pixi-intro.js');
                ***REMOVED***

                tasks.push('concat:pixiMain');
                pixiFilelist.push('<%= modules_dir %>/pixi-main.js');
                
                //  Optional Rope
                if (!excludedKeys['rope'])
                ***REMOVED***
                    grunt.log.writeln("-> PIXI.Rope");
                    tasks.push('concat:pixiRope');
                    pixiFilelist.push('<%= modules_dir %>/pixi-rope.js');
                ***REMOVED***

                //  Optional Tilesprite
                if (!excludedKeys['tilesprite'])
                ***REMOVED***
                    grunt.log.writeln("-> PIXI.TileSprite");
                    tasks.push('concat:pixiTileSprite');
                    pixiFilelist.push('<%= modules_dir %>/pixi-tilesprite.js');
                ***REMOVED***

                //  PIXI Outro
                if (!excludedKeys['outro'])
                ***REMOVED***
                    tasks.push('concat:pixiOutro');
                    pixiFilelist.push('<%= modules_dir %>/pixi-outro.js');
                ***REMOVED***

                grunt.config.set('pixiFilelist', pixiFilelist);

                tasks.push('concat:pixi');

                if (grunt.option('uglify'))
                ***REMOVED***
                    tasks.push('uglify:pixi');
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                ///////////////////
                //  Single build //
                ///////////////////

                grunt.log.writeln("\nPackaging Globals ...\n");

                //  Prepare the globals first, the libs that live outside of Phaser

                //  1) Creature

                if (!excludedKeys['creature'])
                ***REMOVED***
                    grunt.log.writeln("-> Creature");
                    tasks.push('concat:creatureGlobal');
                    filelist.push('<%= modules_dir %>/creature-global.js');
                ***REMOVED***

                //  2) P2

                if (!excludedKeys['p2'])
                ***REMOVED***
                    grunt.log.writeln("-> P2.js");
                    tasks.push('concat:p2Global');
                    filelist.push('<%= modules_dir %>/p2-global.js');
                ***REMOVED***

                //  3) PIXI

                grunt.log.writeln("-> PIXI");
                
                if (!excludedKeys['intro'])
                ***REMOVED***
                    tasks.push('concat:pixiIntro');
                    filelist.push('<%= modules_dir %>/pixi-intro.js');
                ***REMOVED***

                tasks.push('concat:pixiMain');
                filelist.push('<%= modules_dir %>/pixi-main.js');
                
                //  Optional Rope
                if (!excludedKeys['rope'])
                ***REMOVED***
                    grunt.log.writeln("-> PIXI.Rope");
                    tasks.push('concat:pixiRope');
                    filelist.push('<%= modules_dir %>/pixi-rope.js');
                ***REMOVED***

                //  Optional Tilesprite
                if (!excludedKeys['tilesprite'])
                ***REMOVED***
                    grunt.log.writeln("-> PIXI.TileSprite");
                    tasks.push('concat:pixiTileSprite');
                    filelist.push('<%= modules_dir %>/pixi-tilesprite.js');
                ***REMOVED***

                //  PIXI Outro
                if (!excludedKeys['outro'])
                ***REMOVED***
                    tasks.push('concat:pixiOutro');
                    filelist.push('<%= modules_dir %>/pixi-outro.js');
                ***REMOVED***
            ***REMOVED***

            //  And now for Phaser

            grunt.log.writeln("\nBuilding ...");

            if (excludes !== false)
            ***REMOVED***
                for (var key in modules)
                ***REMOVED***
                    if (modules[key].stub && excludes.indexOf(key) !== -1)
                    ***REMOVED***
                        //  If the module IS excluded and has a stub, we need that
                        tasks.push('concat:' + key + 'Stub');

                        filelist.push('<%= modules_dir %>/' + key + '.js');
                    ***REMOVED***
                    else if (modules[key].optional === false || excludes.indexOf(key) === -1)
                    ***REMOVED***
                        //  If it's required or NOT excluded, add it to the tasks list
                        tasks.push('concat:' + key);

                        filelist.push('<%= modules_dir %>/' + key + '.js');

                        //  Special case: If they have Arcade Physics AND Tilemaps we need to include the Tilemap Collision class
                        if (key === 'arcade' && !excludes['tilemaps'])
                        ***REMOVED***
                            tasks.push('concat:arcadeTilemaps');
                            filelist.push('<%= modules_dir %>/arcadeTilemaps.js');
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
            else
            ***REMOVED***
                //  The full monty ...

                for (var mkey in modules)
                ***REMOVED***
                    tasks.push('concat:' + mkey);
                    filelist.push('<%= modules_dir %>/' + mkey + '.js');
                ***REMOVED***
            ***REMOVED***

            grunt.config.set('filelist', filelist);

            tasks.push('concat:custom');

            if (grunt.option('uglify'))
            ***REMOVED***
                tasks.push('uglify:custom');
            ***REMOVED***

            if (grunt.option('copy'))
            ***REMOVED***
                tasks.push('copy:custom');
            ***REMOVED***
            else if (grunt.option('copycustom'))
            ***REMOVED***
                grunt.config.set('target_dir', '<%= release_custom_dir %>');
                tasks.push('copy:custom');
            ***REMOVED***

            grunt.task.run(tasks);

        ***REMOVED***

    ***REMOVED***);

    grunt.registerTask('dist', 'Compile all Phaser versions and copy to the build folder', function() ***REMOVED***

        grunt.task.run('clean:release');
        grunt.task.run('full');
        grunt.task.run('arcadephysics');
        grunt.task.run('nophysics');
        grunt.task.run('minimum');
        grunt.task.run('split');

    ***REMOVED***);

    grunt.registerTask('release', 'Compile all Phaser versions to the build folder and update docs and defs', function() ***REMOVED***

        grunt.task.run('clean:release');
        grunt.task.run('full');
        grunt.task.run('arcadephysics');
        grunt.task.run('nophysics');
        grunt.task.run('minimum');
        grunt.task.run('split');
        grunt.task.run('creature');
        grunt.task.run('docs');
        grunt.task.run('tsdocs');

    ***REMOVED***);

    grunt.registerTask('build', 'Compile all Phaser versions just to the temporary dist folder', function() ***REMOVED***

        grunt.option('exclude', 'ninja,creature');
        grunt.option('filename', 'phaser');
        grunt.option('sourcemap', true);
        grunt.option('copy', false);
        grunt.option('uglify', true);

        grunt.task.run('custom');

    ***REMOVED***);

    grunt.registerTask('full', 'Phaser (excluding Ninja and Creature)', function() ***REMOVED***

        grunt.option('exclude', 'ninja,creature');
        grunt.option('filename', 'phaser');
        grunt.option('sourcemap', true);
        grunt.option('copy', true);
        grunt.option('uglify', true);

        grunt.task.run('custom');

    ***REMOVED***);

    grunt.registerTask('complete', 'Phaser Build with all libs', function() ***REMOVED***

        grunt.option('exclude', 'null');
        grunt.option('filename', 'phaser-complete');
        grunt.option('sourcemap', false);
        grunt.option('copy', true);
        grunt.option('copycustom', true);
        grunt.option('uglify', true);

        grunt.task.run('custom');

    ***REMOVED***);

    grunt.registerTask('split', 'Compile Phaser to dist folder and splits the globals into single files', function() ***REMOVED***

        grunt.option('exclude', 'ninja,creature');
        grunt.option('filename', 'phaser-split');
        grunt.option('sourcemap', true);
        grunt.option('copy', false);
        grunt.option('copycustom', true);
        grunt.option('uglify', true);
        grunt.option('split', true);

        grunt.task.run('custom');

    ***REMOVED***);

    grunt.registerTask('test', 'Phaser Test Build (all libs)', function() ***REMOVED***

        grunt.option('exclude', 'ninja,creature');
        grunt.option('filename', 'phaser-test');
        grunt.option('sourcemap', false);
        grunt.option('copy', false);
        grunt.option('uglify', false);

        grunt.task.run('custom');

    ***REMOVED***);

    grunt.registerTask('uglytest', 'Phaser Test Build (all libs)', function() ***REMOVED***

        grunt.option('exclude', 'ninja,creature');
        grunt.option('filename', 'phaser-test');
        grunt.option('sourcemap', false);
        grunt.option('copy', false);
        grunt.option('uglify', true);

        grunt.task.run('custom');

    ***REMOVED***);

    grunt.registerTask('creature', 'Phaser + Creature', function() ***REMOVED***

        grunt.option('exclude', 'ninja');
        grunt.option('filename', 'phaser-creature');
        grunt.option('sourcemap', true);
        grunt.option('copy', true);
        grunt.option('copycustom', true);
        grunt.option('uglify', true);

        grunt.task.run('custom');

    ***REMOVED***);

    grunt.registerTask('arcadephysics', 'Phaser with Arcade Physics, Tilemaps, Weapons and Particles', function() ***REMOVED***

        grunt.option('exclude', 'ninja,p2,creature');
        grunt.option('filename', 'phaser-arcade-physics');
        grunt.option('sourcemap', true);
        grunt.option('copy', false);
        grunt.option('copycustom', true);
        grunt.option('uglify', true);

        grunt.task.run('custom');

    ***REMOVED***);

    grunt.registerTask('ninjaphysics', 'Phaser with Ninja Physics and Tilemaps', function() ***REMOVED***

        grunt.option('exclude', 'p2,particles,creature');
        grunt.option('filename', 'phaser-ninja-physics');
        grunt.option('sourcemap', true);
        grunt.option('copy', false);
        grunt.option('copycustom', true);
        grunt.option('uglify', true);

        grunt.task.run('custom');

    ***REMOVED***);

    grunt.registerTask('nophysics', 'Phaser without physics, tilemaps or particles', function() ***REMOVED***

        grunt.option('exclude', 'arcade,ninja,p2,tilemaps,particles,creature,weapon');
        grunt.option('filename', 'phaser-no-physics');
        grunt.option('sourcemap', true);
        grunt.option('copy', false);
        grunt.option('copycustom', true);
        grunt.option('uglify', true);

        grunt.task.run('custom');

    ***REMOVED***);

    grunt.registerTask('minimum', 'Phaser without any optional modules', function() ***REMOVED***

        grunt.option('exclude', 'gamepad,keyboard,bitmapdata,graphics,rendertexture,text,bitmaptext,retrofont,net,tweens,sound,debug,arcade,ninja,p2,tilemaps,particles,creature,video,rope,tilesprite,weapon');
        grunt.option('filename', 'phaser-minimum');
        grunt.option('sourcemap', true);
        grunt.option('copy', false);
        grunt.option('copycustom', true);
        grunt.option('uglify', true);

        grunt.task.run('custom');

    ***REMOVED***);

***REMOVED***;
