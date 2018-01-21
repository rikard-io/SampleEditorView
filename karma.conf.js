module.exports = function(config) {
  let configuration = {

    customLaunchers: {
        Chrome_travis_ci: {
            base: 'ChromeHeadless',
            flags: ['--no-sandbox']
        }
    },

    frameworks: ['mocha'],

    files: [
      {pattern: 'test/*.spec.js', watched: false},
      {pattern: 'test/**/*.spec.js', watched: false}
    ],

    preprocessors: {
      // add webpack as preprocessor
      'test/*.spec.js': ['webpack'],
      'test/**/*.spec.js': ['webpack']
    },

    webpack: {
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    },
  };

  if (process.env.TRAVIS) {
      configuration.browsers = ['Chrome_travis_ci'];
  } else {
    configuration.browsers = ['ChromeHeadless'];
  }

  config.set(configuration);

};
