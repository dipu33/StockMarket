/**
 * Created by prashant on 3/2/2017.
 */
angular.module('main_app').controller('BudgetController',function ($scope,$http,$state,$cookies) {
   $scope.Remaining_Budget=10000000;
   $scope.UsedBudget=10000000-$scope.Remaining_Budget;
   $scope.profit=1+"%";
});