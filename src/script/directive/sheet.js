angular.module('app').directive('appSheet',[function(){  //自定义指令
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/sheet.html',
        scope:{
            list:'=',
            visable:'=',
            select:'&'
        }
    }
}]);