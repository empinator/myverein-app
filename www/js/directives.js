'use strict';

/* Directives */
angular.module('myApp.directives', [])
    .directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
          elm.text(version);
}}]);



myApp.directive('mvHeader', function ()
{
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: true,
		controller: ['$scope', function($scope) {
		}],
		link: function(scope, iElement, iAttrs, ctrl) {
			scope.styleClass = iAttrs.styleClass;
			scope.title = iAttrs.title;

		},
		templateUrl: 'partials/header.html'

	}
});
