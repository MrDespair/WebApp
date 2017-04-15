angular.module('app').directive('appTab',[function(){  //自定义指令
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/tab.html',
        scope:{
            list:'=',
            tabClick:'&'
        },
        link:function(scope){
            scope.click=function(tab){
                scope.selected=tab.id;
                scope.tabClick(tab);
            }
        }
    }
}]);