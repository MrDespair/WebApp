angular.module('app').directive('appPositionInfo',['$http',function($http){  //自定义指令
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionInfo.html',
        scope:{
            isActive:'=',
            isLogin:'=',
            pos:'=',
            select:'='
        },
        link:function(scope){
            scope.selecting=function(item){
                $http.post('data/favorite.json',{
                    id:item.id,
                    select:!item.select
                }).success(function(resp){
                    scope.select=!scope.select;
                })
            };
        }
    }
}]);