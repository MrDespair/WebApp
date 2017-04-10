"use strict";//使用严格模式
angular.module('app',['ui.router']);
"use strict";//使用严格模式
angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){    //coonfig配置路由
    $stateProvider.state('main',{       //设定状态
        url:'/main',                    //显示的URL
        templateUrl:'view/main.html',   //ajax请求的页面
        controller:'mainCtrl'           //绑定的controller
    })
    $urlRouterProvider.otherwise('main')        //设定默认页面
}])
"use strict";
angular.module('app').controller('mainCtrl',['$scope',function($scope){
    
}])
angular.module('app').directive('appHead',[function(){  //自定义指令
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/head.html'
    }
}]);