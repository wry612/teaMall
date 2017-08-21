'use strict';
angular.module('register.ctrl', ['app.directive'])

.controller('registerCtrl', ['$scope', '$rootScope','appService','$timeout', function($scope, $rootScope, appService,$timeout) {
	
	//是否显示图片验证码
	$scope.showImgCode = true;

	//发送短信url
	$scope.sendCodeUrl = "account/sms/checkMobile.do";

	//发送短信验证码 的参数
	$scope.params = {
		mobile : '',
		code : '',
		funcCode : 'register'
	};

	//注册参数
	$scope.registerParams = {
		mobileCode : '',
		captchaKey : '',
		password : '',
		_password : '',
		agreement : ''
	};

	//注册
	$scope.register = function(){
		if(!$scope.params.mobile){
            appService.popup('请输入手机号');
            return;
        }else if(!$scope.params.code){
            appService.popup('请输入图形验证码');
            return;
        }else if(!$scope.registerParams.mobileCode){
            appService.popup('请输入短信验证码');
            return;
        }else if(!$scope.registerParams.password){
            appService.popup('请输入8-16位并同时包含字母和数字的密码');
            return;
        }else if(!$scope.registerParams._password){
            appService.popup('请确认输入的密码');
            return;
        }else if($scope.registerParams.password != $scope.registerParams._password){
            appService.popup('两次密码输入不同');
            return;
        }else if(!$scope.registerParams.agreement){
            appService.popup('请阅读并同意《茶企通开户注册协议》');
            return;
        }else if(!sessionStorage.mobileUniCode){
            appService.popup('请获取短信验证码');
            return;
        }
		$scope.registerParams.captchaKey = sessionStorage.mobileUniCode;
		$scope.registerParams.mobile = angular.copy($scope.params.mobile);
		$scope.registerParams.code = angular.copy($scope.params.code);

		var url = "account/customerRegister/register.do";

		appService.post(url,$scope.registerParams,null,function(data){
			sessionStorage.removeItem("mobileUniCode");
            appService.popup('注册成功！',null,function(){
            	//登录
            	appRuler.signIn(data.body,'CUSTOMER',function(){
            		//跳转到app端首页
        			appRuler.toIndexPage();
            	});
            });
        },function(data){
            appService.popup(data.msg);
            //刷新图片验证码
            $scope.showImgCode = false;
            $timeout(function(){
            	$scope.showImgCode = true;
            },50);
        },true);
	};



}]);