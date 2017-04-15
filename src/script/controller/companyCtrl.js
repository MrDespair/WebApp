"use strict";
angular.module('app').controller('companyCtrl',['$scope','$http','$state',function($scope,$http,$state){
    $http.get('/data/company'+$state.params.id+'.json')
    .then(function(resp){
        $scope.company=resp.data;
        $scope.$broadcast('abc',{id:1})//$broadcast向下发送一个名为abc的对象
    });
    $scope.$on('cba',function(event,data){  //接受名为cba的对象
            console.log(event,data);
    });
}])