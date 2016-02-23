var app = angular.module('ionicApp', ['ionic']);

app.controller('AppCtrl', function($scope, $http, $state) {
  $scope.search = {searchInput: ""};

  /*$scope.master = {};

  $scope.update = function(searchInput) {
    $scope.master = angular.copy(searchInput);
  };*/

  $scope.clearInput = function() {
    console.log($scope.search.searchInput);
    $scope.search.searchInput = "";
  };

  $scope.searchBeer = function() {
    console.log($scope.search.searchInput);
    $http({
      method: 'GET',
      url: 'https://salty-taiga-88147.herokuapp.com/search?q=' + $scope.search.searchInput +'&type=beer'
    }).then(function successfulCallback(response) {
      //puts data objects containing name and description into array
      $scope.myArray = response.data.data;
      $state.go('app.results');
    }, function errorCallback(response) {
      console.log('uh oh');
    });
  };

});
