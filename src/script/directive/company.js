angular.module('app').directive('appCompany',[function(){  //自定义指令
    return{
        restrict:'A',
        replace:true,
        scope:{
            com:'='
        },
        templateUrl:'view/template/company.html',
    }
}]);