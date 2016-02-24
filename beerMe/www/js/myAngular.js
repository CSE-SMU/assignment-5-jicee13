var app = angular.module('ionicApp', ['ionic']);

app.controller('AppCtrl', function($scope, $http, $state) {});

app.controller('SearchCtrl',function($scope, $http, $state, BeerData, ItemData) {
  $scope.search = {searchInput: ""};

  $scope.clearInput = function() {
    console.log($scope.search.searchInput);
    $scope.search.searchInput = "";
  };

  $scope.searchBeer = function() {
    console.log($scope.search.searchInput);
    $http({
      method: 'GET',
      url: 'https://salty-taiga-88147.herokuapp.com/beers'
      //url: 'https://salty-taiga-88147.herokuapp.com/search?q=' + $scope.search.searchInput +'&type=beer'
    }).then(function successfulCallback(response) {
      //puts data objects containing name and description into array
      $scope.myArray = response.data.data;
      console.log('asDASFDAFA');
      console.log(BeerData);
      console.log('asDASFDAFA');
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
  console.log(BeerData.data);
  console.log('made it to resultsctrl');

  $scope.getDetails = function(item) {
    console.log('made it to getDetails');
    console.log(item);

    ItemData.data = item;
    console.log(ItemData);
    $state.go('app.details');
  };
});

app.controller('DetailsCtrl', function($scope, $http, $state, BeerData, ItemData) {
  console.log('made it to detailsctrl');
  $scope.itemDetails = ItemData.data;
  console.log(ItemData.data.description);
});
