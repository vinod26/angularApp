'use strict';

testApp
	.controller('globalController',['$rootScope','$scope', '$location','apiService', function($rootScope,$scope, $location,apiService) {
		console.info("globalController");
		
		apiService.fetchData().then(function(response){			
			$scope.newsData = response;
			console.info($scope.newsData);
		})

	}]);