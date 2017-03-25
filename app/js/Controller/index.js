

var app=angular.module('main_app',['ngCookies','ui.router','uiRouterStyles','angularCSS','ui.bootstrap','file-model','ngStorage']);
app.controller('AuthenticateUser',function ($scope) {});
app.controller('Register_controll',function ($scope) {});
app.controller('HeaderController',function ($scope) {});
app.controller('ShowProfileController',function ($scope) {});
app.controller('LeftSideDivController',function ($scope) {});
app.controller('BudgetController',function ($scope) {});
app.controller('EquityController',function ($scope) {});
app.controller('FinalOrderController',function ($scope) {});

app.controller('HomeController',function ($scope) {
    $scope.right_hide=function () {
        var sel_div=document.getElementById("right");
        sel_div.style.opacity=0.3;
    }
    $scope.left_hide=function () {
        var sel_div=document.getElementById("left");
        sel_div.style.opacity=0.3;
    }
    $scope.make_default=function () {
        var sel_div=document.getElementById("left");
        sel_div.style.opacity=1.0;
        var sel_div=document.getElementById("right");
        sel_div.style.opacity=1.0;
    }
});
app.config(['$urlRouterProvider','$stateProvider',function ($urlRouterProvider,$stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home',{
            url:'/home',
            views:{
                'home':{
                    templateUrl:'index.html'
                }
            }
        })
        .state('login', {
            url: '/login',
            views: {
                'log1': {
                    templateUrl: 'view1/login_form.html',
                    css: 'css/Home.css'
                }
            }
        })
                .state('register',{
                    url:'/register',
                    views:{
                        'reg':{
                            templateUrl:'view1/Register_form.html',
                            css:'css/Home.css'
                        }
                    }
                })
        .state('home_page',{
            url:'/MyHome',

            views:{
                'home':{
                    templateUrl:'view1/Home.html',
                },
                'header@home_page':{
                    templateUrl:'view1/header.html'
                },
                'LeftSideDiv@home_page':{
                    templateUrl:'view1/LeftSideDiv.html',
                    css:'css/LeftSideDiv.css'

                }

            }
        })
        .state('MyProfile',{
            url:'/MyProfile',
            views:{
                'home':{
                    templateUrl:'view1/Home.html',
                },
                'header@MyProfile':{
                    templateUrl:'view1/header.html'
                },
                'CenterDiv@MyProfile':{
                     templateUrl:'view1/ShowMyProfile.html'
                },
                'LeftSideDiv@MyProfile':{
                    templateUrl:'view1/LeftSideDiv.html',
                    css:'css/LeftSideDiv.css'

                }
            }
        })
        .state('MyBudget',{
            url:'/MyBudget',
            views:{
                'home':{
                    templateUrl:'view1/Home.html'
                },
                'header@MyBudget':{
                    templateUrl:'view1/header.html'
                },
                'CenterDiv@MyBudget':{
                    templateUrl:'view1/Budget.html'
                },
                'LeftSideDiv@MyBudget':{
                    templateUrl:'view1/LeftSideDiv.html',
                    css:'css/LeftSideDiv.css'
                }
            }
        })
        .state('Equity',{
            url:'/Equity',
            views:{
                'home':{
                    templateUrl:'view1/Home.html'
                },
                'header@Equity':{
                    templateUrl:'view1/header.html'
                },
                'CenterDiv@Equity':{
                    templateUrl:'view1/Equity.html'
                },
                'LeftSideDiv@Equity':{
                    templateUrl:'view1/LeftSideDiv.html',
                    css:'css/LeftSideDiv.css'
                }
            }
        })
        .state('FinalOrder',{
            url:'/FinalOrder:StockName/:StockVal/:StockExchange/:StockQnt/:AvaBudget',
            views:{
                home:{
                templateUrl:'view1/Home.html'
            },
            'header@FinalOrder':{
                templateUrl:'view1/header.html'
            },
            'CenterDiv@FinalOrder':{
                templateUrl:'view1/FinalOrder.html'
            },
            'LeftSideDiv@FinalOrder':{
                templateUrl:'view1/LeftSideDiv.html',
                css:'css/LeftSideDiv.css'
            }
            }
        })
}]);

app.run(function ($state,$cookies,$localStorage,$http,$location) {
    var username=localStorage.getItem("username");
    if(username!=null){
        console.log(username);
        $location.path('MyHome');
        $state.go('home_page');
    }
    else{
        console.log(username);
        $state.go('home')
        $location.path('home');
    }
});