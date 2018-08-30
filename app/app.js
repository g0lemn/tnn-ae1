var angularApp = angular.module('angularExercise1', ['ngRoute', 'ngAnimate']);

// this will fire before the application runs
angularApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'DevController'
    })
    .when('/directory', {
      templateUrl: 'views/directory.html',
      controller: 'DevController'
    }).when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactController'
    }).when('/contact-success', {
      templateUrl: 'views/contact-success.html',
      controller: 'ContactController'
    }).otherwise({
      redirectTo: '/home'
    });
}]);

// this will fire upon application runs
// angularApp.run(function(){});

// Creating directives or simple your own function/method
// ways to restrict directives in angular
// 1. E = elements
// 2. A = attributes
angularApp.directive('randomDeveloper', [function(){
  return {
    restrict: 'E', // sets what kind of what your directive affects.
    scope: {       // key value pair for what scope this directive could only utilize
      devs: '=',   // declared in the as part of the elemet random-developer / randomDeveloper
      title: '='   // declared in the as part of the elemet random-developer / randomDeveloper
    },
    templateUrl: 'views/random.html',
    transclude: true,
    replace: true,
    controller: function($scope){
      $scope.random = Math.floor(Math.random() * 4);
    }
  };
}]);


// will handle funtions
angularApp.controller("DevController", ['$scope', '$http', function($scope, $http) {

  $scope.newDevPeep = function() {
    $scope.devPeeps.push({
      name: $scope.newDev.DevName,
      rank: $scope.newDev.DevRank,
      years: parseInt($scope.newDev.DevYears),
      color: "gray",
      is_present: true
    });

    $scope.newDev.DevName = "";
    $scope.newDev.DevRank = "";
    $scope.newDev.DevYears = "";

  };

  $scope.resignDevPeep = function(dev) {
    var devPeep = $scope.devPeeps.indexOf(dev);
    $scope.devPeeps.splice(devPeep, 1);
  };

  $http({method: 'get', url: 'https://projectexplorefirebase.firebaseio.com/.json'}).then(function(response){
    $scope.devPeeps = response.data;
  });

$scope.removeAll = function(){
  $scope.devPeeps = [];
}
}]);

angularApp.controller("ContactController", ['$scope', '$location', function($scope, $location) {
  $scope.sendMessage = function(){
      $location.path('/contact-success');
  }

}]);
