module.exports = ***REMOVED***
    html: ***REMOVED***
        src: ['./README.md'],
        options: ***REMOVED***
            configure: 'tasks/jsdoc-conf.json',
            /* The destination and private options must be redefined event if there are always in the configure file otherwise, grunt-jsdoc overwrite it with its default values */
            destination: 'docs',
            private: false
        ***REMOVED***
    ***REMOVED***,
    json: ***REMOVED***
        jsdoc: './node_modules/.bin/jsdoc',
        src: [],
        options: ***REMOVED***
            configure: 'tasks/jsdocexportjson-conf.json',
            /* The destination options must be redefined event if there is always in the configure file otherwise, grunt-jsdoc overwrite it with its default value */
            destination: './out'
        ***REMOVED***
    ***REMOVED***
***REMOVED***;