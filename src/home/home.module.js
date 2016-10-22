'use strict';

import homeRoute from './home.route.js';
import homeController from './home.controller.js';

import './home.less';

angular.module('home', [])
  .config(homeRoute)
  .controller('homeController', homeController);

export default 'home';
