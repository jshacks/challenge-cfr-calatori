'use strict';

var config = function ($stateProvider) {
    $stateProvider
		.state('home', {
			url: '/home',
			template: require('./home.html'),
			controller: 'homeController',
			controllerAs: 'ctrl'
		});
};

export default config;
