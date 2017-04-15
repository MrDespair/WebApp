angular.module('app').controller('loginCtrl',['$scope','cache','$state','$http',function($scope,cache,$state,$http){
    $scope.check=function(){
        if(cache.get($scope.user.name)===$scope.user.password){
            $http.post('data/login.json',$scope.user).success(function(resp){
                cache.put('id',resp.data.id);
                cache.put('image',resp.data.image);
                cache.put('name',resp.data.name);
                $state.go('main');
                console.log(cache.get('id'));
            })
        }else{
            alert('密码错误')
        }
        
    }
}])