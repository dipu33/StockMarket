/**
 * Created by prashant on 3/2/2017.
 */
angular.module('main_app').controller('LeftSideDivController',function ($scope,$http,$state,$cookies) {
    $scope.username=$cookies.get("username");
});