/**
 * Created by prashant on 2/28/2017.
 */
function ShowInput() {
    var str=document.getElementById("ChangePassForm");
    if(str.style.display=="none"){
        str.style.display="block";
    }
}
angular.module('main_app').controller('UpdateProfile',function ($scope,$http,$state,$cookies,$location) {
    $scope.username = $cookies.get('username');

    $http.post("http://localhost:8888/get_details?username=" + $scope.username).success(function (data) {
        $scope.b_date = data[0].b_day;

    })
    $scope.ChangePassword = function () {

        $http.post("http://localhost:8888/get_details?username=" + $scope.username).success(function (data) {
            var old_pass = data[0].password;
            if (old_pass != $scope.password_old) {
                alert("Password You are entering is not match with your old one");
            }
            else {
                $http.post("http://localhost:8888/update_details?username=" + $scope.username + "&password=" + $scope.password_new).success(function (data) {
                        if(data=="0"){
                            alert("Something went wrong please try again in some time");
                        }
                        else{
                            alert("Password update successfully now login with new password");
                            $state.go('login')
                        }
                })

            }

        })

    }
});
angular.module('main_app').directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.myForm.password.$viewValue
                ctrl.$setValidity('noMatch', !noMatch)
            })
        }
    }
})