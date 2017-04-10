angular.module('app').directive('appHead',[function(){  //自定义指令
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/head.html'
    }
}]);