angular.module('main_app').controller('EquityController',function ($scope,$cookies,$http,$state) {
    $scope.found=false;
    $scope.Stock_val=0;
    var username=$cookies.get("username");
    $http.post("http://localhost:8888/Get_Budget?UserName="+username).success(function (response) {
        var data = angular.toJson(response);
        var obj = JSON.parse(data);
       $scope.UserBudget=response[0].UserBudget;
    })
        .error(function (response) {
            
        })
    ;
        $scope.StockExchangeChange=function (val) {
     $scope.StockExchange=val;
     return;
    }

        $scope.tempfun=function (val) {
        // alert(val);
         $http.post("http://localhost:8888/Get_Stock_Values?StockString="+val+"&StockExchange="+$scope.StockExchange).success(function (response) {
            $scope.CurrentStock=val;
            $scope.Stock_val=response[0].price["Current_Price"];
            $scope.Stock_Ava=response[0].Available_Quantity;
            return;
        }).error(function (response) {
            
        })
            

    }
    $scope.stock_name=function (stock) {
       return $http.post("http://localhost:8888/Get_Stock_Name?StockString="+stock+"&StockExchange="+$scope.StockExchange).then(function (response) {
            console.log(response);
              var data = angular.toJson(response);
               var obj = JSON.parse(data);
               $scope.obj_ary = obj.data;
                console.log(response);
               return obj.data;

        }).catch(function (response) {
           console.log(response);
       })

    }
    $scope.Buy=function () {
    // alert("ssssssss");
    $state.go('FinalOrder',{'StockName':$scope.CurrentStock,'StockVal':$scope.Stock_val,'StockExchange':$scope.StockExchange,'StockQnt':$scope.BuyStockQuantity,'AvaBudget':$scope.UserBudget});
    }

    $scope.checkary=function (ary) {
        var obj = $scope.obj_ary;
       var found = obj.some(function (el) {
            return el.Stock_Sym === ary;
        });
        if(!found){
            return found;
        }
        if (found) {
            return found;
        }
              $scope.apply();
    }
    $scope.CheckBudget=function () {
            var Total_Cost=$scope.Stock_val*$scope.BuyStockQuantity;
            console.log($scope.Stock_val);
            console.log($scope.StockQnt);
            console.log("Cost"+Total_Cost);

            if($scope.UserBudget<Total_Cost){
            console.log("yes");
            return true;
            }
            else {
                console.log("no");
                return false;
            }

    }
})