
module.exports = ***REMOVED***

    custom: ***REMOVED***

        options: ***REMOVED***
            sourceMap: '<%= sourcemap %>',
            sourceMapName: '<%= compile_dir %>/<%= filename %>.map',
            banner: '/* Phaser v<%= package.version %> - http://phaser.io - @photonstorm - (c) 2016 Photon Storm Ltd. */\n'
        ***REMOVED***,

        src: ['<%= concat.custom.dest %>'],
        dest: '<%= compile_dir %>/<%= filename %>.min.js'

    ***REMOVED***,

    pixi: ***REMOVED***

        options: ***REMOVED***
            sourceMap: '<%= sourcemap %>',
            sourceMapName: '<%= compile_dir %>/pixi.map',
            banner: '/* Phaser v<%= package.version %> PIXI Build - http://phaser.io - @photonstorm - (c) 2016 Photon Storm Ltd. */\n'
        ***REMOVED***,

        src: ['<%= concat.pixi.dest %>'],
        dest: '<%= compile_dir %>/pixi.min.js'

    ***REMOVED***,

    creature: ***REMOVED***

        options: ***REMOVED***
            sourceMap: '<%= sourcemap %>',
            sourceMapName: '<%= compile_dir %>/creature.map',
            banner: '/* Phaser v<%= package.version %> Creature Build - http://phaser.io - @photonstorm - (c) 2016 Photon Storm Ltd. */\n'
        ***REMOVED***,

        src: ['<%= concat.creatureGlobalSplit.dest %>'],
        dest: '<%= compile_dir %>/creature.min.js'

    ***REMOVED***,

    p2: ***REMOVED***

        options: ***REMOVED***
            sourceMap: '<%= sourcemap %>',
            sourceMapName: '<%= compile_dir %>/p2.map',
            banner: '/* Phaser v<%= package.version %> P2.JS Build - http://phaser.io - @photonstorm - (c) 2016 Photon Storm Ltd. */\n'
        ***REMOVED***,

        src: ['<%= concat.p2GlobalSplit.dest %>'],
        dest: '<%= compile_dir %>/p2.min.js'

    ***REMOVED***

***REMOVED***;
