"use strict";
angular.module('app').controller('mainCtrl',['$scope','$http','cache',function($scope,$http,cache){
    // 获取列表页的JSON
    $scope.show=true;
    if(cache.get('id')){
        $scope.show=false
    }
    $http.get('/data/positionList.json').then(function(resp){
        $scope.list=resp.data;
    },function(resp){
        alert('文件不存在');
    });
}])