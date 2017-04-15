"use strict";
angular.module('app').controller('searchCtrl', ['$scope', '$http', 'dict', function ($scope, $http, dict) {
    $scope.name = '';
    $scope.search = function () {
        $http.get('/data/positionList.json?name=' + $scope.name).then(function (resp) {
            $scope.list = resp.data;
        }, function (resp) {
            alert('文件不存在');
        });
    }
    $scope.search();
    $scope.tabList = [{
        id: 'city',
        name: '城市'
    }, {
        id: 'salary',
        name: '薪水'
    }, {
        id: 'scale',
        name: '公司规模'
    }];
    $scope.sheet = {};
    var tabId = '';
    $scope.filterObj={};
    $scope.tclick = function (id, name) {
        tabId = id;
        $scope.sheet.list = dict[id];
        $scope.sheet.visable = true;
    };
    //点击sheet里项目，将项目的name替换进tabList里的name
    $scope.sclick = function (id, name) {
        if (id) {
            angular.forEach($scope.tabList, function (item) {
                if (item.id === tabId) {
                    item.name = name;
                }
            });
            $scope.filterObj[tabId+'Id']=id;
        } else {
            delete $scope.filterObj[tabId+'Id']
            angular.forEach($scope.tabList, function (item) {
                if (item.id === tabId) {
                    switch (item.id) {
                        case 'city':
                            item.name = '城市';
                            break;
                        case 'salary':
                            item.name = '薪水';
                            break;
                        case 'scale':
                            item.name = '公司规模';
                            break;
                    }
                }
            })
        }
        $scope.sheet.visable = false;
    }
}])