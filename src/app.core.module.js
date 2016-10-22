'use strict';

import angular from 'angular';
import ngCookies from 'angular-cookies';
import ngMessages from 'angular-messages';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import ngTranslate from 'angular-translate/dist/angular-translate.js';
import ngTranslateLoaderStaticFiles from 'angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files.js';
import ngAria from 'angular-aria';
import ngAnimate from 'angular-animate';
import ngMaterial from 'angular-material';
import uiGrid from 'angular-ui-grid/ui-grid.js';
import uiRouter from 'angular-ui-router/release/angular-ui-router.js';
import coreServiceProvider from './app.core.service.js';

angular.module('core', [
  ngCookies,
  ngMessages,
  ngResource,
  ngSanitize,
  ngAria,
  ngAnimate,
  ngMaterial,
  'pascalprecht.translate',
  'ui.grid',
  'ui.router'
])
.provider('coreService', coreServiceProvider);

export default 'core';
