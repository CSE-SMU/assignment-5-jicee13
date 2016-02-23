var app = angular.module('ionicApp', ['ionic']);

app.controller('AppCtrl', function($scope) {
  $scope.search = {searchInput: ""};

  /*$scope.master = {};

  $scope.update = function(searchInput) {
    $scope.master = angular.copy(searchInput);
  };*/

  $scope.clearInput = function() {
    console.log($scope.search.searchInput);
    $scope.search.searchInput = "";

  };
});
