angular.module('app').filter('filterByObj',[function(){
    return function(list,obj){      //过滤器的第一个参数将取ng-repeat的源数据，第二个参数取过滤器冒号后的
        var result=[];  //输出结果
        angular.forEach(list,function(item){    //对list循环
            var isEqual=true;                   
            for(var i in obj){
                if(item[i]!==obj[i]){   //判断list的每一项是否符合过滤条件
                    isEqual =false;
                }
            }
            if(isEqual){                //符合的话把list输出
                result.push(item);
            }
        });
        return result;
    }
}])