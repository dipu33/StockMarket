angular.module('main_app').controller('HeaderController',function ($scope,$http,$state,$cookies,$location,$localStorage) {
   $scope.username=$cookies.get('username');
   $scope.Logout=function () {
                   $cookies.remove('username');
                   $location.path('home');
       $localStorage["username"]=undefined;

       $state.go('home');
       }

});