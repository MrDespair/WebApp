"use strict";//使用严格模式
angular.module('app',['ui.router','ngCookies','validation','ngAnimate']).run(['$rootScope',function($rootScope){
    $rootScope.im=function(){   //run函数在所有方法执行前先执行，对象为$rootScope,所有子$scope都将有其属性
        console.log('Hello World');
    }
}]);