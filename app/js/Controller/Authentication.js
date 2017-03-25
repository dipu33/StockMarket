
angular.module('main_app').controller('AuthenticateUser',function ($scope,$http,$state,$cookies,$localStorage) {
$scope.submit=function () {
        console.log("sssssssssssssssssssssssssssssssssssssss");
        var username = $scope.username;
        var password = $scope.password;
         $http.post("http://localhost:8888/login?username="+username+"&password="+password).success(function(data){
            if(data==0){
                alert("login fail");
                $state.go('home');
            }
            else if(data=="2"){
                alert("something went wrong please try again in some times");
                $state.go('home');
            }
            else{
                localStorage.setItem('username', data);
                $cookies.put("username",username);
                alert("Login Successfully");
                $state.go('home_page');
            }
        });
    }
});