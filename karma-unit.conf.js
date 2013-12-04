module.exports = function(config){
  config.set({
    basePath : '../../',
    files : [
      'app/lib/angular.min.js',
      'test/lib/angular/angular-mocks.js',
      'src/**/*.js',
      'test/unit/**/*.js',
    ],
    exclude : [],
    autoWatch : true,
    frameworks: ['jasmine'],
    browsers : ['Chrome', 'Firefox'],
    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ]
  });
}