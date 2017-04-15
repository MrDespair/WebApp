//设置cookies缓存配置
'use strict';
angular.module('app').service('cache', ['$cookies', function ($cookies) {
    this.put = function (key, value) {
        $cookies.put(key, value);
    };
    this.get = function (key) {
        return $cookies.get(key);
    };
    this.remove = function (key) {
        $cookies.remove(key);
    };
}])
//factory的写法
// angular.module('app').factory('cache', ['$cookies', function ($cookies) {
//     var obj="hello world"   //使用factory可以创建私有的对象
//     return {
//         put : function (key, value) {
//             $cookies.put(key, value);
//         },
//         get : function (key) {
//             return $cookies.get(key);
//         },
//         remove : function (key) {
//             $cookies.reomve(key);
//         },
//     }
// }])