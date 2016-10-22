'use strict';

import core from './app.core.module.js';
import home from './home/home.module.js';

import appConfig from './app.config.js';
import appRoute from './app.route.js';
import appRun from './app.run.js';

angular.module('app', [
  core,
  home
])
  .config(appConfig)
  .config(appRoute)
  .run(appRun);

export default 'app';
