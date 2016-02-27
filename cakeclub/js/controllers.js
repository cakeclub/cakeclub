var cakeclubApp = angular.module('cakeclubApp', ["firebase"]);

cakeclubApp.controller('MainController',  function ($scope, $http, $firebaseObject, $firebaseArray) {
    
  var ref = new Firebase("https://luminous-inferno-3515.firebaseio.com/" + "currentClubber");
  var syncObject = $firebaseObject(ref);
  syncObject.$bindTo($scope, "currentClubber");
  
  $scope.cakeclubbers = $firebaseArray(new Firebase("https://luminous-inferno-3515.firebaseio.com/" + "cakeclubbers"));
     
  $scope.addClubber = function() {
      $scope.cakeclubbers.$add({
        name: $scope.newName,
        email: $scope.email
      });
    };
    
  $scope.nextClubber = function() {
    if($scope.currentClubber != null) {
      $scope.cakeclubbers.$add($scope.currentClubber);
    }
    var nextClubber = $scope.cakeclubbers[0];
    $scope.cakeclubbers.$remove(nextClubber);
    $scope.currentClubber = nextClubber;
  };
  
});