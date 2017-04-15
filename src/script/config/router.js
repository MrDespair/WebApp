"use strict";//使用严格模式
angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){    //coonfig配置路由
    $stateProvider.state('main',{       //设定状态
        url:'/main',                    //显示的URL
        templateUrl:'view/main.html',   //ajax请求的页面
        controller:'mainCtrl'           //绑定的controller
    }).state('position',{
        url:'/position/:id',                    
        templateUrl:'view/position.html',   
        controller:'positionCtrl'           
    }).state('company',{
        url:'/company/:id',                    
        templateUrl:'view/company.html',   
        controller:'companyCtrl'           
    }).state('search',{
        url:'/search/',                    
        templateUrl:'view/search.html',   
        controller:'searchCtrl'           
    }).state('me',{
        url:'/me/',                    
        templateUrl:'view/me.html',   
        controller:'meCtrl'           
    }).state('login',{
        url:'/login/',                    
        templateUrl:'view/login.html',   
        controller:'loginCtrl'           
    }).state('register',{
        url:'/register/',                    
        templateUrl:'view/register.html',   
        controller:'registerCtrl'           
    }).state('favorite',{
        url:'/favorite/',                    
        templateUrl:'view/favorite.html',   
        controller:'favoriteCtrl'           
    }).state('post',{
        url:'/post/',                    
        templateUrl:'view/post.html',   
        controller:'postCtrl'           
    })
    $urlRouterProvider.otherwise('main')        //设定默认页面
}])