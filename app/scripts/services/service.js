testApp = angular.module("apiService", []);

testApp.service("apiService", ['$http', '$q',  '$window', '$filter', '$rootScope', function ($http, $q, $window, $filter, $rootScope) {
    
    this.fetchData = function (userData) {
            userData = {};
            var deferred = $q.defer();

            $data = JSON.stringify({               
                "data": userData
            });

            // $http(
            //     {
            //         method: 'GET',
            //         url: apiPath
            //         //data: JSON.stringify(userData)
            //     }).success(function (response, status) {
            //         return deferred.resolve(response);
            //     }).
            //      error(function(error,status) {
            //         return deferred.reject(error);
            //     });
            $http.get(apiPath)
            .success(function(data, status, headers, config) {
                return deferred.resolve(data);
            });
            return deferred.promise;
    }

	return this;
}]);