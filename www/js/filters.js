'use strict';

/* Filters */
angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);

myApp.filter('addBreak', [ function() {
	return function(text) {
		return String(text).replace(/,/mg, ",<br/>");
	}
}]);
