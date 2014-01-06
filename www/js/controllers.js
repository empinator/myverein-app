'use strict';

/* Controllers */


function HeaderController($scope,navSvc) {
	$scope.back = function () {
		navSvc.back();
	};
}

function HomeCtrl($scope,navSvc,$rootScope, $http) {
    $rootScope.showSettings = false;
    $scope.slidePage = function (path,type) {
        navSvc.slidePage(path,type);
    };
    $scope.back = function () {
        navSvc.back();
    };
    $scope.changeSettings = function () {
        $rootScope.showSettings = true;
    };
    $scope.closeOverlay = function () {
        $rootScope.showSettings = false;
    };


	if (!$rootScope.games) {
		$http.get('team.json').success(
			function (data, status, header, responses) {
				$rootScope.teams = data.teams;
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			}
		);
	}
}


//var url = 'http://192.168.178.31:8080/seam/resource/rest/ping/finger/1';
var url='bla.json';

function GameController($rootScope, navSvc, $scope, $http, $routeParams) {
	$scope.month = $routeParams.month;
	$scope.team = $routeParams.team;

	$scope.size = 15;
	$scope.segment = 0;


	$scope.slidePage = function (path,type) {
		navSvc.slidePage(path,type);
	};

	$scope.isSelected = function(month) {
		return $scope.month == month;
	};

	$scope.rotateLeft = function() {

	};

	$scope.rotateRight = function() {
		$rootScope.months[2] = { 'id':'1-2013', 'name': 'Apr'};
	};

	if(!$rootScope.months) {
		var months = [];
		months[0] = { 'id':'1-2013', 'name': 'Jan 13'};
		months[1] = { 'id':'2-2013', 'name': 'Feb 13'};
		months[2] = { 'id':'3-2013', 'name': 'Mär 13'};
		$rootScope.months = months;
	}


	$scope.items = [];

	$scope.loadNext = function() {
		if($scope.baseList) {
			var start = ($scope.segment) * $scope.size;
			var end = start + $scope.size ;
			var items = $scope.baseList.slice(start, end);
			console.log(items);
			$scope.items = $scope.items.concat(items);
			$scope.segment++;
			if(!$scope.$$phase) {
				$scope.$apply();
			}
		}

	};

	if (!$scope.baseList) {
		$http.get(url).success(
				function (data) {

					$scope.baseList = data.games;


					angular.forEach($scope.baseList, function (item)
					{
						item.start = new Date(item.start);
					});

					$scope.loadNext();
				}
		);
	}

}

function GameDetailController($rootScope, $scope, $routeParams, $http) {
	$scope.gameId = $routeParams.gameId;

	$http.get('bla-detail.json').success(
			function (data, status, header, responses) {
				$rootScope.currentItem = data.game;
				$rootScope.currentItem.start = new Date(data.game.start);
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			}
	);
}

function LoginController($rootScope, $scope, navSvc) {
	if(!$scope.user){
		$scope.user = {
			email: null,
			password: null
		}
	}

	$scope.login = function() {
		$rootScope.loggedIn = true;
		navSvc.slidePage('/')
	} ;

	$scope.logout = function() {
		$rootScope.loggedIn = false;
		navSvc.slidePage('/')
	}


}

