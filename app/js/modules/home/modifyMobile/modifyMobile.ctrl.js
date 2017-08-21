'use strict';
angular.module('modifyMobile.ctrl', [])

.controller('modifyMobileCtrl', ['$scope', '$rootScope','appService','$state', function($scope, $rootScope, appService, $state) {

	//校验手机号（请求参数）
	$scope.params = {
		mobile:'',//手机号
		code:'',  //图形验证码
		funcCode:'editMobile'
	};

	//修改手机号（请求参数）
	$scope.modifyParams = {
		password:'',   //登录密码
		mobile:'',     //手机号
		captchaKey:'', //短信发送成功返回的令牌
		mobileCode:''  //短信验证码
	};

	//发送短信验证码请求url
	$scope.sendCodeUrl = 'account/sms/checkMobile.do';

	//修改手机号
	$scope.modifyMobile = function(){
		if(!$scope.params.mobile){
			appService.popup("请输入手机号");
			return;
		}
		if(!$scope.params.code){
			appService.popup("请输入图形验证码");
			return;
		}
		if(!$scope.modifyParams.password){
			appService.popup("请输入密码");
			return;
		}
		if(!sessionStorage.mobileUniCode){
			appService.popup("请先获取短信验证码");
			return;
		}
		if(!$scope.modifyParams.mobileCode){
			appService.popup("请输入短信验证码");
			return;
		}

		$scope.modifyParams.mobile = $scope.params.mobile;
		$scope.modifyParams.captchaKey = sessionStorage.mobileUniCode;

		var url = 'account/fundAccount/editMobile.do';
        appService.post(url,$scope.modifyParams,{tokenId:sessionStorage.tokenId},function(data){
        	sessionStorage.removeItem("mobileUniCode");
         	appService.popup("修改成功",null,function(){
         		$state.go('userInfo');
         	}); 
        },function(data){
            appService.popup(data.msg); 
        },true);
	};

	

}])