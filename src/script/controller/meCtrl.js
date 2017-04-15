angular.module('app').controller('meCtrl', ['$scope', 'cache','$state', function ($scope, cache,$state) {
    if (cache.get('name')) {
        $scope.name = cache.get('name');
        $scope.image = cache.get('image');
        $scope.show = true;
    }
    $scope.logout = function () {
        cache.remove('id');
        cache.remove('name');
        cache.remove('image');
        $scope.show = false;
        $state.go('main');
    };
}])