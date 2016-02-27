var cakeclubApp = angular.module('cakeclubApp', ["firebase"]);

cakeclubApp.controller('MainController',  function ($scope, $http, $firebaseObject, $firebaseArray, $window) {
    
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
      if($window.confirm("Are you sure this person has baked, there will be DIRE consequences if you are lying.... Remember I have your IP:"+$scope.userip)) {
        if($scope.currentClubber != null) {
          $scope.cakeclubbers.$add($scope.currentClubber);
        }
        var nextClubber = $scope.cakeclubbers[0];
        $scope.cakeclubbers.$remove(nextClubber);
        $scope.currentClubber = nextClubber;
      } else {
        $window.alert("I appreciate your honesty ")
      }
  };

    $scope.userip = 'Unknown';

    var getIP = function() {
        $http.get("https://api.ipify.org/")
            .success(function (response) {
                $scope.userip = response;
            })
    }

    getIP();
});