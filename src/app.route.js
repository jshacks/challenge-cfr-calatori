'use strict';

var route = function ($urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
};

export default route;
