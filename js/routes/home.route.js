'use strict';
/*
home模块路由配置
*/
angular.module('home.route', ['app.provider'])

    .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', 'appProvider', function($stateProvider, $urlRouterProvider, $ionicConfigProvider, appProvider) {
    
    //禁用ionic缓存
    $ionicConfigProvider.views.maxCache(0);  
    //禁用ionic过场动画
    //$ionicConfigProvider.views.transition('none');

    //定义懒加载方法
    var lazyLoad = { 
        tpl: appProvider.LazyLoadTpl,
        file: appProvider.LazyLoadFile
    };

    //定义基础路径
    var basePath = { 
        tpl: appProvider.basePath.tpl,
        css: appProvider.basePath.css,
        js: appProvider.basePath.js
    };

    $stateProvider
        .state('proDetail', { //新茶发售详情
            url: '/proDetail',
            controller: 'proDetailCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'proDetail.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'proDetail.min.css',
                basePath.js + 'proDetail.min.js'
            ])
        })
        .state('modifyLoginPwd', { //修改登录密码
            url: '/modifyLoginPwd',
            controller: 'modifyLoginPwdCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'modifyLoginPwd.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'modifyLoginPwd.min.css',
                basePath.js + 'modifyLoginPwd.min.js'
            ])
        })
        .state('forgetLoginPwd', { //忘记密码
            url: '/forgetLoginPwd',
            controller: 'forgetLoginPwdCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'forgetLoginPwd.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'modifyLoginPwd.min.css',
                basePath.css + 'forgetLoginPwd.min.css',
                basePath.js + 'forgetLoginPwd.min.js'
            ])
        })
        .state('modifyTradePwd', { //修改交易密码
            url: '/modifyTradePwd',
            controller: 'modifyTradePwdCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'modifyTradePwd.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'modifyLoginPwd.min.css',
                basePath.css + 'modifyTradePwd.min.css',
                basePath.js + 'modifyTradePwd.min.js'
            ])
        })
        .state('userInfo', { //个人信息
            url: '/userInfo',
            controller: 'userInfoCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'userInfo.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'userInfo.min.css',
                basePath.js + 'userInfo.min.js'
            ])
        })
        .state('realName', { //实名认证
            url: '/realName',
            controller: 'realNameCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'realName.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'realName.min.css',
                basePath.js + 'realName.min.js'
            ])
        })
        .state('modifyMobile', { //修改手机号
            url: '/modifyMobile',
            controller: 'modifyMobileCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'modifyMobile.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'modifyLoginPwd.min.css',
                basePath.css + 'modifyMobile.min.css',
                basePath.js + 'modifyMobile.min.js'
            ])
        })
        .state('modifyNickName', { //修改昵称
            url: '/modifyNickName/:nickName',
            controller: 'modifyNickNameCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'modifyNickName.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'modifyLoginPwd.min.css',
                basePath.js + 'modifyNickName.min.js'
            ])
        })
        .state('customerInfo', { //企业信息
            url: '/customerInfo',
            controller: 'customerInfoCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'customerInfo.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'userInfo.min.css',
                basePath.js + 'customerInfo.min.js'
            ])
        })
        .state('connectApp', { //测试与app交互的方法
            url: '/connectApp',
            controller: 'connectAppCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'connectApp.min.html'),
            resolve: lazyLoad.file([
                basePath.js + 'connectApp.min.js'
            ])
        })
        .state('IDauthenStep1', { //完善资料（第一步）--- 实名认证
            url: '/IDauthenStep1/:from',
            controller: 'IDauthenStep1Ctrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'IDauthenStep1.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'modifyLoginPwd.min.css',
                basePath.css + 'IDauthenStep1.min.css',
                basePath.js + 'IDauthenStep1.min.js'
            ])
        })
        .state('IDauthenStep2', { //完善资料（第二步）--- 绑定经销商
            url: '/IDauthenStep2/:from',
            controller: 'IDauthenStep2Ctrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'IDauthenStep2.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'modifyLoginPwd.min.css',
                basePath.css + 'modifyLoginPwd.min.css',
                basePath.css + 'IDauthenStep2.min.css',
                basePath.js + 'IDauthenStep2.min.js'
            ])
        })
        .state('IDauthenSuccess', { //完善资料（完成）
            url: '/IDauthenSuccess',
            controller: 'IDauthenSuccessCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'IDauthenSuccess.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'IDauthenSuccess.min.css',
                basePath.js + 'IDauthenSuccess.min.js'
            ])
        })
        .state('myMember', { //我的经销商
            url: '/myMember',
            controller: 'myMemberCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'myMember.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'userInfo.min.css',
                basePath.js + 'myMember.min.js'
            ])
        })
        .state('myMessage', { //我的消息
            url: '/myMessage',
            controller: 'myMessageCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'myMessage.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'myMessage.min.css',
                basePath.js + 'myMessage.min.js'
            ])
        })
        .state('messageList', { //消息列表
            url: '/messageList/:type',
            controller: 'messageListCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'messageList.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'myMessage.min.css',
                basePath.js + 'messageList.min.js'
            ])
        })
        .state('messageDetail', { //消息详情
            url: '/messageDetail/:type/:id',
            controller: 'messageDetailCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'messageDetail.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'myMessage.min.css',
                basePath.js + 'messageDetail.min.js'
            ])
        })
        .state('myAddress', { //我的收货地址
            url: '/myAddress',
            controller: 'myAddressCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'myAddress.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'myAddress.min.css',
                basePath.js + 'myAddress.min.js'
            ])
        })
        .state('addandEditAddress', { //（添加|修改）收货地址
            url: '/addandEditAddress',
            controller: 'addandEditAddressCtrl',
            params:{
                id:null,
                receiver:null,
                mobilePhone:null,
                provinceId:null,
                cityId:null,
                areaId:null,
                detailAddress:null,
                isDefault:null
            },
            templateUrl: lazyLoad.tpl(basePath.tpl + 'addandEditAddress.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'modifyLoginPwd.min.css',
                basePath.css + 'addandEditAddress.min.css',
                basePath.js + 'addandEditAddress.min.js'
            ])
        })
        .state('storeAddress', { //提货门店
            url: '/storeAddress',
            controller: 'storeAddressCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'storeAddress.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'userInfo.min.css',
                basePath.js + 'storeAddress.min.js'
            ])
        })
        .state('tollStandard', { //仓储收费标准
            url: '/tollStandard',
            controller: '',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'tollStandard.min.html')
        })
        .state('orderDetail', { //订单详情
            url: '/orderDetail',
            controller: 'orderDetailCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'orderDetail.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'orderDetail.min.css',
                basePath.js + 'orderDetail.min.js'
            ])
        })
        .state('mallProDetail', { //商城-商品详情
            url: '/mallProDetail',
            controller: 'mallProDetailCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'mallProDetail.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'proDetail.min.css',
                basePath.js + 'echarts.common.min.js',
                basePath.js + 'mallProDetail.min.js'
            ])
        })
        .state('register', { //注册
            url: '/register',
            controller: 'registerCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'register.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'modifyLoginPwd.min.css',
                basePath.css + 'register.min.css',
                basePath.js + 'register.min.js'
            ])
        })
        .state('infoDetail', { //资讯详情
            url: '/infoDetail/:id',
            controller: 'infoDetailCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'infoDetail.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'myMessage.min.css',
                basePath.js + 'infoDetail.min.js'
            ])
        })
        .state('showAuthenInfo', { //认证信息展示
            url: '/showAuthenInfo',
            controller: 'showAuthenInfoCtrl',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'showAuthenInfo.min.html'),
            resolve: lazyLoad.file([
                basePath.css + 'showAuthenInfo.min.css',
                basePath.js + 'showAuthenInfo.min.js'
            ])
        })
        .state('explain', { //新茶抢购说明
            url: '/explain',
            controller: '',
            templateUrl: lazyLoad.tpl(basePath.tpl + 'explain.min.html')
        })
        
        ;

    $urlRouterProvider.otherwise('/proDetail');

}]);

