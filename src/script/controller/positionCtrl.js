"use strict";
angular.module('app').controller('positionCtrl', ['$q', '$scope', '$http', '$state','cache', function ($q,$scope, $http, $state,cache) {
    // $scope.add=function(){
    //     $scope.isActive=!$scope.isActive;
    //     $scope.imagePath=$scope.isActive?'image/star-active.png':'image/star.png';
    // }
    $scope.isLogin = false;
    console.log(cache.get('id'));
    if(cache.get('id')){
        $scope.isLogin=true;
    }
    //先获取职位详情
    function getPosition() {
        var def=$q.defer(); //$q服务，用于异步调用AJAX，将其变成同步按顺序执行
        //console.log('/data/position.json?id=' + $state.params.id)
        $http.get('/data/position'+$state.params.id+'.json')
            .then(function (resp) {
                $scope.position = resp.data;
                def.resolve(resp);
        },function(err){
            def.reject(err);
        });
        return def.promise;
    }
    //再获取公司详情
    function getCompany(id){
        //console.log('/data/company.json?id='+id)
        $http.get('/data/company'+id+'.json')
        .then(function(resp){
            $scope.company=resp.data;
        })
    }
    //再根据职位详情的ID查对应公司ID，再获取公司详情
    getPosition().then(function(obj){
        getCompany(obj.data.companyId);
    })
}])