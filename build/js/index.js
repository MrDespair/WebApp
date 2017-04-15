"use strict";//使用严格模式
angular.module('app',['ui.router','ngCookies','validation','ngAnimate']).run(['$rootScope',function($rootScope){
    $rootScope.im=function(){   //run函数在所有方法执行前先执行，对象为$rootScope,所有子$scope都将有其属性
        console.log('Hello World');
    }
}]);
//设置初始数据
angular.module('app').value('dict',{}).run(['dict','$http',function(dict,$http){
        $http.get('data/city.json').then(function(resp){
            dict.city=resp.data;
        },function(error){
            alert('没有文件');
        });
        $http.get('data/salary.json').then(function(resp){
            dict.salary=resp.data;
        },function(error){
            alert('没有文件');
        });
        $http.get('data/scale.json').then(function(resp){
            dict.scale=resp.data;
        },function(error){
            alert('没有文件');
        });
    }
])
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
"use strict";//使用严格模式
angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){    //coonfig配置路由
    $stateProvider.state('main',{       //设定状态
        url:'/main',                    //显示的URL
        templateUrl:'view/main.html',   //ajax请求的页面
        controller:'mainCtrl'           //绑定的controller
    }).state('position',{
        url:'/position/:id',                    
        templateUrl:'view/position.html',   
        controller:'positionCtrl'           
    }).state('company',{
        url:'/company/:id',                    
        templateUrl:'view/company.html',   
        controller:'companyCtrl'           
    }).state('search',{
        url:'/search/',                    
        templateUrl:'view/search.html',   
        controller:'searchCtrl'           
    }).state('me',{
        url:'/me/',                    
        templateUrl:'view/me.html',   
        controller:'meCtrl'           
    }).state('login',{
        url:'/login/',                    
        templateUrl:'view/login.html',   
        controller:'loginCtrl'           
    }).state('register',{
        url:'/register/',                    
        templateUrl:'view/register.html',   
        controller:'registerCtrl'           
    }).state('favorite',{
        url:'/favorite/',                    
        templateUrl:'view/favorite.html',   
        controller:'favoriteCtrl'           
    }).state('post',{
        url:'/post/',                    
        templateUrl:'view/post.html',   
        controller:'postCtrl'           
    })
    $urlRouterProvider.otherwise('main')        //设定默认页面
}])
angular.module('app').config(['$validationProvider',function($validationProvider){
    var expression ={
        phone:/^1[\d]{10}/,
        password:function(value){
            var str = value+''
            return str.length>5;
        }
    };
    var defaultMsg={
        phone:{
            success:"",
            error:'必须是11位手机号',
        },password:{
            success:"",
            error:"至少6位",
        }
    };
    $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}])
"use strict";
angular.module('app').controller('companyCtrl',['$scope','$http','$state',function($scope,$http,$state){
    $http.get('/data/company'+$state.params.id+'.json')
    .then(function(resp){
        $scope.company=resp.data;
        $scope.$broadcast('abc',{id:1})//$broadcast向下发送一个名为abc的对象
    });
    $scope.$on('cba',function(event,data){  //接受名为cba的对象
            console.log(event,data);
    });
}])
angular.module('app').controller('favoriteCtrl',['$scope','$http',function($scope,$http){
    $http.get('data/myFavorite.json').then(function(resp){
        $scope.favoriteList=resp.data
    });
    $scope.isShow=true;
}])
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
"use strict";
angular.module('app').controller('mainCtrl',['$scope','$http','cache',function($scope,$http,cache){
    // 获取列表页的JSON
    $scope.show=true;
    if(cache.get('id')){
        $scope.show=false
    }
    $http.get('/data/positionList.json').then(function(resp){
        $scope.list=resp.data;
    },function(resp){
        alert('文件不存在');
    });
}])
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
"use strict";
angular.module('app').controller('positionCtrl', ['$q', '$scope', '$http', '$state', 'cache', function ($q, $scope, $http, $state, cache) {
    //判断是否登录
    $scope.isLogin = false;
    if (cache.get('id')) {
        $scope.isLogin = true;
    }
    if ($scope.isLogin) {
        $scope.message = "投递简历"
    } else {
        $scope.message = "登录"
    }
    $scope.select = false

    //先获取职位详情
    function getPosition() {
        var def = $q.defer(); //$q服务，用于异步调用AJAX，将其变成同步按顺序执行
        //console.log('/data/position.json?id=' + $state.params.id)
        $http.get('/data/position' + $state.params.id + '.json')
            .then(function (resp) {
                $scope.position = resp.data;
                 if ($scope.position.posted === 'true') {
                     $scope.message="已投递";
                 }
                def.resolve(resp);
            }, function (err) {
                def.reject(err);
            });
        return def.promise;
    };
    //再获取公司详情
    function getCompany(id) {
        //console.log('/data/company.json?id='+id)
        $http.get('/data/company' + id + '.json')
            .then(function (resp) {
                $scope.company = resp.data;
            })
    };
    //判断是否已加入收藏
    function getFavorite(id) {
        $http.get('data/myFavorite.json').then(function (resp) {
            $scope.favorite = resp.data
            angular.forEach($scope.favorite, function (item) {
                if (item.id === id) {
                    $scope.select = true;
                } else {
                    $scope.select = false;
                }
            })
        });
    };
    //再根据职位详情的ID查对应公司ID，再获取公司详情
    getPosition().then(function (obj) {
        getCompany(obj.data.companyId);
        getFavorite(obj.data.id)
    });
    $scope.go = function () {
        if ($scope.position.posted === 'true') {
            alert('请勿重复投递');
        } else {
            if ($scope.isLogin) {
                $http.post('data/handle.json', {
                    id: $scope.position.id
                }).success(function () {
                    $scope.message = '投递成功';
                    $scope.position.posted ='true'
                })
            } else {
                $state.go('login');
            }
        }

    }
}])
angular.module('app').controller('postCtrl',['$scope','$http',function($scope,$http){
    $scope.tabList = [{
        id: 'all',
        name: '全部'
    }, {
        id: 'pass',
        name: '面试邀请'
    }, {
        id: 'fail',
        name: '不合适'
    }];
    $http.get('data/myPost.json').then(function(resp){
        $scope.positionList=resp.data;
    });
    $scope.filterObj={}
    $scope.tClick=function(id,name){
        switch(id){
            case'all':
                delete $scope.filterObj.state;
            break;
            case'pass':
                $scope.filterObj.state='1';
            break;
            case'fail':
                $scope.filterObj.state='-1';
            break;
        }
    };
    $scope.tClick('all','全部');
    $scope.default='all';
}])
angular.module('app').controller('registerCtrl', ['$scope','cache','$http','$state',function ($scope,cache,$http,$state) {
    $scope.back = function () {
        cache.put($scope.user.name,$scope.user.password);
        $state.go('login')
        // $http.post('data/regist.json',$scope.user).success(function(resp){
            
        // })
    }
}])
"use strict";
angular.module('app').controller('searchCtrl', ['$scope', '$http', 'dict', function ($scope, $http, dict) {
    $scope.name = '';
    //搜索方法
    $scope.search = function () {
        $http.get('/data/positionList.json?name=' + $scope.name).then(function (resp) {
            $scope.list = resp.data;
        }, function (resp) {
            alert('文件不存在');
        });
    }
    $scope.search();
    $scope.tabList = [{
        id: 'city',
        name: '城市'
    }, {
        id: 'salary',
        name: '薪水'
    }, {
        id: 'scale',
        name: '公司规模'
    }];
    $scope.sheet = {};
    var tabId = '';
    $scope.filterObj={};
    $scope.tclick = function (id, name) {
        tabId = id;
        $scope.sheet.list = dict[id];
        $scope.sheet.visable = true;
    };
    //点击sheet里项目，将项目的name替换进tabList里的name
    $scope.sclick = function (id, name) {
        if (id) {
            angular.forEach($scope.tabList, function (item) {
                if (item.id === tabId) {
                    item.name = name;
                }
            });
            $scope.filterObj[tabId+'Id']=id;
        } else {
            delete $scope.filterObj[tabId+'Id']
            angular.forEach($scope.tabList, function (item) {
                if (item.id === tabId) {
                    switch (item.id) {
                        case 'city':
                            item.name = '城市';
                            break;
                        case 'salary':
                            item.name = '薪水';
                            break;
                        case 'scale':
                            item.name = '公司规模';
                            break;
                    }
                }
            })
        }
        $scope.sheet.visable = false;
    }
}])
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
angular.module('app').directive('appFoot',[function(){  //自定义指令
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/foot.html'
    }
}]);
angular.module('app').directive('appHead',[function(){  //自定义指令
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/head.html'
    }
}]);
angular.module('app').directive('appHeadBar',[function(){  //自定义指令
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/headBar.html',
        scope:{
            headName:"@"                    //@表示字符串，=表示变量
        },
        link:function(scope){
            scope.back=function(){
                window.history.back();      //H5的历史纪录操作
            }
        }
    }
}]);
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
angular.module('app').directive('appPositionInfo',['$http',function($http){  //自定义指令
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionInfo.html',
        scope:{
            isActive:'=',
            isLogin:'=',
            pos:'=',
            select:'='
        },
        link:function(scope){
            scope.selecting=function(item){
                $http.post('data/favorite.json',{
                    id:item.id,
                    select:!item.select
                }).success(function(resp){
                    scope.select=!scope.select;
                })
            };
        }
    }
}]);
angular.module('app').directive('appPositionList',['$http',function($http){  //自定义指令
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionList.html',
        scope:{
            data:'=',
            filterObj:'=',
            isShow:'='
        },
        link:function(scope){
            scope.select=function(item){
                $http.post('data/favorite.json',{
                    id:item.id,
                    select:!item.select
                }).success(function(resp){
                    item.select=!item.select;
                })
            };
        }
    }
}]);
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
angular.module('app').directive('appTab',[function(){  //自定义指令
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/tab.html',
        scope:{
            list:'=',
            tabClick:'&',
            selected:'=',
        },
        link:function(scope){
            scope.click=function(tab){
                scope.selected=tab.id;
                scope.tabClick(tab);
            }
        }
    }
}]);
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