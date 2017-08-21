'use strict';
angular.module('modifyLoginPwd.ctrl', ['app.directive'])

.controller('modifyLoginPwdCtrl', ['$scope', '$rootScope','appService', function($scope, $rootScope, appService) {

	//修改密码参数
	$scope.modifyParams = {
		token : sessionStorage.mobileUniCode || '',//短信发送成功返回的令牌
		oldPwd : '',//旧密码
		newPwd : ''//新密码
	};

	//发送短信验证码 参数
	$scope.params = {
		imgCode:'',
		funcCode:'editLoginPwd'
	};

	//smsCode
	$scope.checkParams = {
		smsCode : ''
	};

	//发送短信验证码请求url
	$scope.sendCodeUrl = 'account/sms/sendCaptcha.do';

	//校验mobileUniCode是否有效
	$scope.checkMobileUniCode = function(callback){
		if(!$scope.params.imgCode){
			appService.popup("请输入图形验证码");
			return;
		}
		if(!$scope.checkParams.smsCode){
			appService.popup("请输入短信验证码");
			return;
		}
		if(!sessionStorage.mobileUniCode){
			appService.popup("请先获取短信验证码");
			return;
		}
		if(sessionStorage.token){
			callback()
		}else{
			//短信发送成功返回的令牌
			$scope.checkParams.mobileUniCode = sessionStorage.mobileUniCode;
			var url = 'account/sms/check.do';
	        appService.post(url,$scope.checkParams,{tokenId:sessionStorage.tokenId},function(data){
	         	sessionStorage.token = data.body;
	            //校验通过
	            if(callback && typeof callback=='function'){
	            	callback();
	            }
	        },function(data){
	            appService.popup(data.msg); 
	        },true);
		}
		
	};

	//修改密码
	$scope.modifyLoginPwd = function(){
		if(!$scope.modifyParams.oldPwd || !$scope.modifyParams.newPwd){
			appService.popup("请输入密码");
			return;
		}
		if($scope.modifyParams.oldPwd != $scope.modifyParams.newPwd){
			appService.popup("两次密码输入不一致");
			return;
		}
		$scope.modifyParams.token = sessionStorage.token;
		var url = 'account/fundAccount/initLoginPwd.do';
        appService.post(url,$scope.modifyParams,{tokenId:sessionStorage.tokenId},function(data){
         	appService.popup('密码修改成功！',null,appRuler.closePage); 
         	sessionStorage.removeItem('mobileUniCode');
         	sessionStorage.removeItem('token');
        },function(data){
            appService.popup(data.msg); 
        },true);
	};

	$scope.userInfo = null;
	$scope.sendSuccess = false;

	//个人信息
	$scope.getUserInfo = function(){

        var url = 'account/customerinfo/loadUserDetail.do';

        appService.post(url,{},{tokenId:sessionStorage.tokenId},function(data){
         	$scope.userInfo = data;
        },function(data){
            appService.popup(data.msg); 
        },true);
    };

	//页面初始化
    appRuler.getUserInfo(function(data){
        sessionStorage.tokenId = data.tokenId;
        $scope.getUserInfo();
    });

}]);