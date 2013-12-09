module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.initConfig({
        uglify: {
            my_target: {
              options: {
                sourceMapRoot: 'src', // the location to find your original source
              },
              files: {
                'dist/input-validator.min.js': ['dist/input-validator.js'],
              }
            }
        }
    });
    grunt.registerTask('build', ['uglify']);
}
