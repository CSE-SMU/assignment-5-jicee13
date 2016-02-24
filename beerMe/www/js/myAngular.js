var app = angular.module('ionicApp', ['ionic']);

app.controller('AppCtrl', function($scope, $http, $state) {});

app.controller('SearchCtrl',function($scope, $http, $state, BeerData, ItemData) {
  $scope.search = {searchInput: ""};

  $scope.clearInput = function() {
    $scope.search.searchInput = "";
  };

  $scope.searchBeer = function() {
    $http({
      method: 'GET',
      url: 'https://salty-taiga-88147.herokuapp.com/beers'
      //url: 'https://salty-taiga-88147.herokuapp.com/search?q=' + $scope.search.searchInput +'&type=beer'
    }).then(function successfulCallback(response) {
      //puts data objects containing name and description into array
      $scope.myArray = response.data.data;
      BeerData.data = response.data.data;
      $state.go('app.results');
    }, function errorCallback(response) {
      console.log('uh oh');
    });
  };
});

app.factory('BeerData', function(){
  return {data: {}};
});

app.factory('ItemData', function(){
  return {data: {}};
});

app.controller('ResultsCtrl', function($scope, $http, $state, BeerData, ItemData) {
  $scope.beerArray = BeerData.data;

  $scope.getDetails = function(item) {
    ItemData.data = item;
    $state.go('app.details');
  };

  $scope.returnHome = function() {
    $state.go('app.search');
  };
});

app.controller('DetailsCtrl', function($scope, $http, $state, BeerData, ItemData) {
  $scope.itemDetails = ItemData.data;
  
  $scope.returnHome = function() {
    $state.go('app.search');
  };
});
