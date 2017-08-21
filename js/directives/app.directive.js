'use strict';
/*
全局指令
*/
angular.module('app.directive', ['ionic'])
    //发送短信验证码
    .directive('sendcaptcha', ['$state','$timeout','appService', function($state, $timeout, appService) {
        return {
            restrict: 'AE',
            replace:true,
            template : '<button type="button" class="clear-btn">发送验证码</button>',
            link: function(scope, element, attr) {

                element.bind('click',function(){
                    scope.sendCaptcha();
                });

                scope.t = 60;
                scope.timer = null;

                //发送短信验证码
                scope.sendCaptcha = function(){

                    //【修改手机号 | 注册】时，发送短信验证码 之前的校验
                    if(scope.$parent.params && (scope.$parent.params.funcCode=="editMobile" || scope.$parent.params.funcCode=="register") ){
                        if(!scope.$parent.params.mobile){
                            appService.popup('请输入手机号');
                            return;
                        }else if(!scope.$parent.params.code){
                            appService.popup('请输入图形验证码');
                            return;
                        }
                    }
                    //修改登录密码时，发送短信验证码 之前的校验
                    else if(scope.$parent.params && scope.$parent.params.funcCode=="editLoginPwd"){
                        if(!scope.$parent.params.imgCode){
                            appService.popup('请输入图形验证码');
                            return;
                        }
                    }
                    //忘记密码时，发送短信验证码 之前的校验
                    else if(scope.$parent.params && scope.$parent.params.funcCode=="forgetLoginPwd"){
                        if(!scope.$parent.params.mobile){
                            appService.popup('请输入手机号');
                            return;
                        }else if(!scope.$parent.params.imgCode){
                            appService.popup('请输入图形验证码');
                            return;
                        }
                    }
                        

                    console.log('开始发送短信验证码...');
                    appService.post(scope.$parent.sendCodeUrl,scope.$parent.params,{tokenId:sessionStorage.tokenId},function(data){
                        if(scope.$parent.params.funcCode=="editMobile"){
                            appService.popup('短信验证码已发送到新手机上!');    
                        }else{
                            appService.popup('短信发送成功！！！');    
                        }
                        sessionStorage.mobileUniCode = data.body;//短信发送成功返回的令牌
                        //发送成功，开始倒计时60s
                        element.attr('disabled','disabled');
                        element[0].innerHTML = '重新获取' + scope.t + 's';
                        scope.setTime(element);
                        scope.$parent.sendSuccess = true;
                    },function(data){
                        appService.popup(data.msg);
                        //刷新图片验证码
                        var s = angular.element(document.getElementsByTagName("imgcode")[0]).scope();
                        s.refreshImgCode();
                    },true);
                };

                scope.setTime = function(element){
                    if(scope.t>0){
                        scope.timer = $timeout(function(){
                            scope.t--;
                            element[0].innerHTML = '重新获取' + scope.t + 's';
                            scope.setTime(element);
                        },1000);
                    }else{
                        $timeout.cancel(scope.timer);
                        scope.t = 60;
                        element[0].innerHTML = '获取验证码';
                        element.removeAttr('disabled');
                    }
                };

            }
        };
    }])
    //获取图形验证码
    .directive('imgcode', ['appService','$state',function(appService, $state) {
        return {
            restrict: 'AE',
            replace:false,
            template : '<div class="show-img" style="background-image:url({{imgVercodeUrl}})" ng-click="refreshImgCode()"></div>',
            link: function(scope, element, attr) {
                scope.imgVercodeUrl = appService.httpAddress + "common/identifyingCode/load.do?math=" + Math.random(10);
                //刷新图片验证码
                scope.refreshImgCode = function(){
                    scope.imgVercodeUrl = appService.httpAddress + "common/identifyingCode/load.do?math=" + Math.random(10);       
                };
            }
        };
    }])
    //返回上一页
    .directive('back', ['$ionicHistory','$state',function($ionicHistory, $state) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                element.bind('click', function() {
                    var history = $ionicHistory.viewHistory();
                    if (history) {
                        var backView = history.backView;
                        if (backView) {
                            $ionicHistory.goBack();
                        }
                    }
                });
            }
        };
    }])
    //隐藏app端的顶部状态栏（若当前页面在iosApp中运行，则让整个页面向下移动20px）
    .directive('hideAppTitle', ['$ionicHistory','$state',function($ionicHistory, $state) {
        return {
            restrict: 'AE',
            link: function(scope, element, attr) {
                //隐藏app端的页面标题
                appRuler.hidePageTitle(true);
                //获取运行平台类型
                var p = appRuler.platform;
                if(p=="isiOSApp"){
                    element.css('top','20px');
                }
            }
        };
    }])
    