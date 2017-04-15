angular.module('app').config(['$provide',function($provide){
    //装饰器，修改默认方法，将post改为get
    $provide.decorator('$http',['$delegate','$q',function($delegate,$q){
        var get =$delegate.get;
        $delegate.post=function(url,data,config){
            var def=$q.defer();
            get(url).then(function(resp){
                def.resolve(resp);
            },function(err){
                def.reject(err)
            });
            return{
                success:function(cb){
                    def.promise.then(cb);
                },
                error:function(cb){
                    def.promise.then(null,cb);
                }
            }
        }
        return $delegate;
    }])
}])