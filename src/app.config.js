'use strict';

var config = function ($locationProvider, $translateProvider) {
  $locationProvider.html5Mode(true);
  $translateProvider.useSanitizeValueStrategy('escape');
  $translateProvider.useStaticFilesLoader({
    prefix: '/assets/translations/',
    suffix: '.json'
  }).preferredLanguage('de').fallbackLanguage('en');
};

export default config;
