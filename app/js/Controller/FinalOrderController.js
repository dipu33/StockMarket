/**
 * Created by prashant on 3/25/2017.
 */
angular.module('main_app').controller('FinalOrderController',function ($http,$scope,$state,$stateParams,$cookies) {
    $scope.username=$cookies.get("username");
    $scope.StockName=$stateParams.StockName;
    $scope.StockExchange=$stateParams.StockExchange;
    $scope.StockVal=$stateParams.StockVal;
    $scope.StockQnt=$stateParams.StockQnt;
    $scope.UserBudget=$stateParams.AvaBudget;
    $scope.RemBudget=$scope.UserBudget-($scope.StockQnt*$scope.StockVal);
  $scope.StockOrder=function () {
     $http.post("http://localhost:8888/Insert_Order?UserName="+$scope.username+"&StockName="+$scope.StockName+"&StockExchange="+$scope.StockExchange+"&StockPrice="+$scope.StockVal+"&StockQnt="+$scope.StockQnt+"&FinalBudget="+$scope.RemBudget).success(function (response) {
            if(response=="1"){
                alert("Stock Buy Successfully");
            }
     })
         .error(function (response) {
             console.log(response);
         })
     ;
  }
  $scope.OrderCancel=function () {
      $state.go('Equity');
  }
});