angular.module('app').controller('registerCtrl', ['$scope','cache','$http','$state',function ($scope,cache,$http,$state) {
    $scope.back = function () {
        cache.put($scope.user.name,$scope.user.password);
        $state.go('login')
        // $http.post('data/regist.json',$scope.user).success(function(resp){
            
        // })
    }
}])