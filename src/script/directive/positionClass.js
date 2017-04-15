angular.module('app').directive('appPositionClass',[function(){  //自定义指令
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionClass.html',
        scope:{
            com:'=',
        },
        link:function(scope){
            scope.show=function(idx){
                scope.positionList=scope.com.positionClass[idx].positionList;
                scope.isActive=idx;
            };
            scope.$watch('com',function(newVal,odlVal,scope){ //$watch监听对象值，第一个参数为新值，第二个是旧值，第三个是scope对象
                if(newVal){
                    scope.show(0);
                }
            });
            scope.$on('abc',function(event,data){   //第一个参数为abc的对象所有属性，第二个为abc的数据
                console.log(event,data);
            });//接收名为abc的对象
            scope.$emit('cba',{id:2});//$emit向上发送一个名为cba的对象
            //scope.$digest();//当操作完DOM对象后，手动同步双向绑定
        }
    }
}]);