'use strict';

import homeConfig from './home.config.js';
import homeRoute from './home.route.js';
import homeController from './home.controller.js';

import './home.less';

angular.module('home', [])
  .config(homeConfig)
  .config(homeRoute)
  .controller('homeController', homeController);

export default 'home';
