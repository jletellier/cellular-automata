'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        browserify: {
            client: {
                src: [ 'example/main.js' ],
                dest: 'example/bundle.js'
            },
            clientDev: {
                src: [ '<%= browserify.client.src %>' ],
                dest: '<%= browserify.client.dest %>',
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    watch: true,
                    keepAlive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', [ 'browserify:client' ]);
    grunt.registerTask('dev', [ 'browserify:clientDev' ]);

};