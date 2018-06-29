'use strict';

var testApp = angular.module('testApp', ['ngAnimate', 'ngCookies', 'ngRoute', 'ngTouch','apiService'])

  .constant('version', 'v0.1.0')

  .config(function($locationProvider, $routeProvider,$httpProvider) {
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json;charset=utf-8";
    $routeProvider
        .when('/', {
            controller : "globalController",
            templateUrl: 'views/home.html'
        })
        .otherwise({
            redirectTo: '/'
        });
        
  })
    .run(function ($rootScope, $location, $route) {
        $rootScope.$on('$routeChangeStart', function(e, current, pre) { 
                
        });
    })

