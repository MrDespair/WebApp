angular.module('app').directive('appHeadBar',[function(){  //自定义指令
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/headBar.html',
        scope:{
            headName:"@"                    //@表示字符串，=表示变量
        },
        link:function(scope){
            scope.back=function(){
                window.history.back();      //H5的历史纪录操作
            }
        }
    }
}]);