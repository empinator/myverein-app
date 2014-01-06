'use strict';

function jsonp_callback(data) {
    // returning from async callbacks is (generally) meaningless
    console.log(data.found);
}


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','ajoslin.mobile-navigate','ngMobile']);

myApp.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.interceptors.push(function ($rootScope, $location, $q) {
		return {
			'request': function (request)
			{
				// if we're not logged-in to the AngularJS app, redirect to login page
				$rootScope.loggedIn = $rootScope.loggedIn || $rootScope.username;
				if (!$rootScope.loggedIn && $location.path() != '/login')
				{
					$location.path('/login');
				}
				return request;
			},
			'responseError': function (rejection)
			{
				// if we're not logged-in to the web service, redirect to login page
				if (rejection.status === 401 && $location.path() != '/login')
				{
					$rootScope.loggedIn = false;
					$location.path('/login');
				}
				return $q.reject(rejection);
			}
		};
	});
}]);


myApp.config(function ($compileProvider){
	$compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
});

myApp.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/', {templateUrl: 'partials/homeView.html', controller: 'HomeCtrl'});
//	$routeProvider.when('/', {templateUrl: 'partials/homeView.html', controller: 'HomeCtrl', resolve:{
//		authorize:function($http) {
//			return $http.get("/ping"); // $http.get liefert eine Promise zurück
//		}
//	}
//	});
	$routeProvider.when('/login', {templateUrl: 'partials/loginView.html'});
	$routeProvider.when('/games/:team/:month', {templateUrl: 'partials/gameView.html'});
	$routeProvider.when('/game/:gameId', {templateUrl: 'partials/gameDetailsView.html'});
	$routeProvider.otherwise({redirectTo: '/'});
}]);
