"use strict";
angular.module('app').controller('positionCtrl', ['$q', '$scope', '$http', '$state', 'cache', function ($q, $scope, $http, $state, cache) {
    //判断是否登录
    $scope.isLogin = false;
    if (cache.get('id')) {
        $scope.isLogin = true;
    }
    if ($scope.isLogin) {
        $scope.message = "投递简历"
    } else {
        $scope.message = "登录"
    }
    $scope.select = false

    //先获取职位详情
    function getPosition() {
        var def = $q.defer(); //$q服务，用于异步调用AJAX，将其变成同步按顺序执行
        //console.log('/data/position.json?id=' + $state.params.id)
        $http.get('/data/position' + $state.params.id + '.json')
            .then(function (resp) {
                $scope.position = resp.data;
                 if ($scope.position.posted === 'true') {
                     $scope.message="已投递";
                 }
                def.resolve(resp);
            }, function (err) {
                def.reject(err);
            });
        return def.promise;
    };
    //再获取公司详情
    function getCompany(id) {
        //console.log('/data/company.json?id='+id)
        $http.get('/data/company' + id + '.json')
            .then(function (resp) {
                $scope.company = resp.data;
            })
    };
    //判断是否已加入收藏
    function getFavorite(id) {
        $http.get('data/myFavorite.json').then(function (resp) {
            $scope.favorite = resp.data
            angular.forEach($scope.favorite, function (item) {
                if (item.id === id) {
                    $scope.select = true;
                } else {
                    $scope.select = false;
                }
            })
        });
    };
    //再根据职位详情的ID查对应公司ID，再获取公司详情
    getPosition().then(function (obj) {
        getCompany(obj.data.companyId);
        getFavorite(obj.data.id)
    });
    $scope.go = function () {
        if ($scope.position.posted === 'true') {
            alert('请勿重复投递');
        } else {
            if ($scope.isLogin) {
                $http.post('data/handle.json', {
                    id: $scope.position.id
                }).success(function () {
                    $scope.message = '投递成功';
                    $scope.position.posted ='true'
                })
            } else {
                $state.go('login');
            }
        }

    }
}])