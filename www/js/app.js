'use strict';

function jsonp_callback(data) {
    // returning from async callbacks is (generally) meaningless
    console.log(data.found);
}


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','ajoslin.mobile-navigate','ngMobile', 'http-auth-interceptor']);

myApp.config(function ($compileProvider){
	$compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
});

myApp.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

myApp.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/', {templateUrl: 'partials/clubView.html'});
	$routeProvider.when('/games/:team/:month', {templateUrl: 'partials/gameView.html'});
	$routeProvider.when('/game/:gameId', {templateUrl: 'partials/gameDetailsView.html'});
	$routeProvider.otherwise({redirectTo: '/'});
}]);
