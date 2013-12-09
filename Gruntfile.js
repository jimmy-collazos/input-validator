module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-replace');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/input-validator.js'
            },
        },
        replace: {
            dist:{
                options: {
                    patterns: [
                        {
                            match: '/;+angular\.module\\(\'input-validator\'\\)/g',
                            replacement: '',
                            expression: true
                        }
                    ]
                },
                files: [
                    {
                        src: ['dist/input-validator.js'],
                        dest: 'dist/input-validator.js'
                    }
                ]
            }
        },
        uglify: {
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> */\r\n',
                    mangle: {
                        except: ['angular']
                    }
                },
                files: {
                    'dist/input-validator.min.js': ['dist/input-validator.js'],
                }
            }
        }
    });
    grunt.registerTask('build', ['concat', 'replace', 'uglify']);
}
