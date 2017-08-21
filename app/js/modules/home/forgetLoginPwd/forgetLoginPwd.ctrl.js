'use strict';
angular.module('forgetLoginPwd.ctrl', ['app.directive'])

.controller('forgetLoginPwdCtrl', ['$scope', '$rootScope','appService', function($scope, $rootScope, appService) {

	

	//发送短信验证码 参数
	$scope.params = {
		imgCode : '',
		mobile : '',
		funcCode:'forgetLoginPwd'
	};

	//校验手机号 参数
	$scope.smsParam = {
		mobileUniCode : '',
		smsCode : '',
		mobile : ''
	};

	//重置密码 参数
	$scope.modifyParams = {
		newPwd : '',//新密码
		_newPwd : '',//确认密码
		token : '', //校验手机号成功返回的令牌
		mobile : '' 
	};

	$scope.sendSuccess = false;

	//发送短信验证码请求url
	$scope.sendCodeUrl = 'account/sms/checkMobileAndSendCaptcha.do';

	//校验手机号是否有效
	$scope.checkMobile = function(){
		if(!$scope.params.mobile){
			appService.popup("请输入手机号");
			return;
		}
		else if(!$scope.params.imgCode){
			appService.popup("请输入图形验证码");
			return;
		}
		else if(!$scope.smsParam.smsCode){
			appService.popup("请输入短信验证码");
			return;
		}
		else if(!$scope.modifyParams.newPwd){
			appService.popup("请输入8-16位登录密码");
			return;
		}
		else if(!$scope.modifyParams._newPwd){
			appService.popup("请再次输入密码");
			return;
		}
		else if($scope.modifyParams.newPwd != $scope.modifyParams._newPwd){
            appService.popup('两次密码不一致');
            return;
        }
        else if(!sessionStorage.mobileUniCode){
			appService.popup("请先获取短信验证码");
			return;
		}
		else{
			//短信发送成功返回的令牌
			$scope.smsParam.mobileUniCode = sessionStorage.mobileUniCode;
			$scope.smsParam.mobile = angular.copy($scope.params.mobile);
			var url = 'account/sms/checkForNoLogin.do';
	        appService.post(url,$scope.smsParam,null,function(data){
	            //校验通过
	            $scope.modifyLoginPwd(data.body);
	        },function(data){
	            appService.popup(data.msg); 
	        },true);
		}
		
	};

	//重置密码
	$scope.modifyLoginPwd = function(token){
		$scope.modifyParams.token = token;
		$scope.modifyParams.mobile = angular.copy($scope.params.mobile);;
		var url = 'account/fundAccount/forgetLoginPwd.do';
        appService.post(url,$scope.modifyParams,null,function(data){
        	sessionStorage.removeItem('mobileUniCode');
         	appService.popup('密码重置成功！',null,appRuler.closePage); 
        },function(data){
            appService.popup(data.msg); 
        },true);
	};

	

}]);