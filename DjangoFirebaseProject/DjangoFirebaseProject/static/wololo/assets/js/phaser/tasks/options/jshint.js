module.exports = ***REMOVED***
    src: ***REMOVED***
        src: [
            'src/**/*.js',
            '!src/Intro.js',
            '!src/Outro.js',
            '!src/pixi/**/*',
            '!src/plugins/path/**/*.js',
            '!src/physics/p2/p2.js',
            '!src/animation/creature/gl-matrix.js',
            '!src/animation/creature/CreatureMeshBone.js',
            '!src/gameobjects/Creature.js',
            '!src/stubs/*.js'
        ],
        options: ***REMOVED*** jshintrc: '.jshintrc' ***REMOVED***
    ***REMOVED***,

    filters: ***REMOVED***
        src: ['filters/**/*.js'],
        options: ***REMOVED*** jshintrc: 'filters/.jshintrc', ***REMOVED***
    ***REMOVED***,

    tooling: ***REMOVED***
        src: [
            'Gruntfile.js',
            'tasks/**/*.js'
        ],
        options: ***REMOVED*** jshintrc: 'tasks/.jshintrc' ***REMOVED***
    ***REMOVED***,

    options: ***REMOVED***
        force: (process.env.NODE_ENV !== 'test')
    ***REMOVED***
***REMOVED***;
