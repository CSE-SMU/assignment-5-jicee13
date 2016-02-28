var app = angular.module('ionicApp', ['ionic']);

app.controller('AppCtrl', function($scope, $http, $state) {
  $scope.returnHome = function() {
  $state.go('app.search');
  };
});

app.controller('SearchCtrl',function($scope, $http, $state, BeerData, ItemData) {
  $scope.filterSettings = { searchInput: "", organic: "", abv: "", ibu: "", verified: ""};

  $scope.clearInput = function() {
    $scope.search.searchInput = "";
  };

  $scope.searchBeer = function() {
    console.log($scope.filterSettings.organic);
    if($scope.filterSettings.organic === true) {
      $scope.filterSettings.organic = "Y";
    } else {
      $scope.filterSettings.organic = "N";
    }

    if($scope.filterSettings.verified === true) {
      $scope.filterSettings.verified = "Y";
    } else {
      $scope.filterSettings.verified = "N";
    }
    $http({
      method: 'GET',
      url: 'https://salty-taiga-88147.herokuapp.com/beers',
      params: {abv: $scope.filterSettings.abv, ibu: $scope.filterSettings.ibu, isOrganic: $scope.filterSettings.organic, year: $scope.filterSettings.searchInput, verified: $scope.filterSettings.verified}
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

app.factory('filterSettings', function(){
  return {data: {}};
});

app.factory('BeerData', function(){
  return {data: {}};
});

app.factory('ItemData', function(){
  return {data: {}};
});

app.controller('ResultsCtrl', function($scope, $http, $state, BeerData, ItemData) {
  $scope.beerArray = BeerData.data;
  $scope.testVar = '6';

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
