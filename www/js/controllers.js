'use strict';

/* Controllers */

var host = 'http://localhost/mv';
//var host = 'http://www.myverein.de/teamco';
var baseUrl = host + '/seam/resource/rest';

function HeaderController($scope,navSvc) {
	$scope.back = function () {
		navSvc.back();
	};
	$scope.showChevron = function() {
		return navSvc.isHistory();
	};
}

function OverlayController($scope, $rootScope) {
	$scope.changeSettings = function () {
		$rootScope.showLoading = true;
	};
	$scope.closeOverlay = function () {
		$rootScope.showLoading = false;
	};
}

function ClubController($scope,navSvc,$rootScope, $http) {
    $scope.slidePage = function (path,type) {
        navSvc.slidePage(path,type);
    };
    $scope.back = function () {
        navSvc.back();
    };

}

function GameController($rootScope, navSvc, $scope, $http, $routeParams) {

	if(!$rootScope.games || $rootScope.games.teamId != $routeParams.team) {
		$rootScope.games = {
			teamId: 0,
			segment: 0,
			totalGames: 0,
			size: 10,
			gameList: [],
			url: function() {
				return '/games/' + this.teamId + '/' + this.segment + '/' + this.size
			},
			isEndReached: function() {
				return this.gameList.length >= this.totalGames;
			},
			isEmpty: function() {
				return this.gameList.length == 0;
			}
		};
		$rootScope.games.teamId = $routeParams.team;

	}


	$scope.slidePage = function (path,type) {
		navSvc.slidePage(path,type);
	};

	$scope.isTimeNotSet = function(timeInMillis) {
		return new Date(timeInMillis).getHours() == 0;
	};

	$scope.loadNext = function() {

		var getUrl = baseUrl + $rootScope.games.url();
		$rootScope.showLoading = true;
		$http.get(getUrl).success(
			function (data) {
				console.log(data);
				$rootScope.showLoading = false;
				$rootScope.games.totalGames = data.total;
				$rootScope.games.segment++;
				$rootScope.games.gameList = $rootScope.games.gameList.concat(data.games);
			}
		);

	};

	$scope.isEndReached = function() {
		return $rootScope.games.isEndReached();
	};

	if($scope.games.isEmpty()) {
		$scope.loadNext();
	}


}

function GameDetailController($rootScope, $scope, $routeParams) {
	$scope.currentItem = $rootScope.games.gameList[$routeParams.gameId];

	$scope.call = function(phoneNr) {
		window.open('tel:' + phoneNr, '_system');
	}

}

function LoginController($rootScope, $scope, $http, authService) {

	$rootScope.showLogin = false;

	if(!$scope.user){
		$scope.user = {
			email: null,
			password: null
		};
		$rootScope.showLogin = true;

		$rootScope.$on('event:auth-loginRequired', function() {
			console.log('login required');
			$rootScope.showLogin = true;
		});
		$rootScope.$on('event:auth-loginConfirmed', function() {
			console.log('login confirmed');
			$rootScope.showLogin = false;
		});

	}

	$scope.login = function() {
		console.log($scope.user);
		var credentials = btoa($scope.user.email + ':' + $scope.user.password);
		$http.defaults.headers.common['Authorization'] = 'Basic ' + credentials;

		$rootScope.showLoading = true;
		$http.get(baseUrl+'/login/' + $scope.user.email).success(function(data) {
			$rootScope.showLoading = false;
			$rootScope.userTeams = data;
			authService.loginConfirmed($scope.user);
		});
	} ;

	$scope.logout = function() {
		$http.defaults.headers.common['Authorization'] = '';
	}

}

