'use strict';
angular.module('IDauthenStep1.ctrl', [])

.controller('IDauthenStep1Ctrl', ['$scope', '$rootScope','appService','$state','$stateParams','$ionicHistory', function($scope, $rootScope, appService, $state, $stateParams, $ionicHistory) {

	$scope.params = {
		name:'',//姓名
		cardType:'2',
		cardNo:''//身份证号码
	};

	$scope.submit = function(){
		if(!$scope.params.name){
			appService.popup("请输入姓名");
			return;
		}
		if(!$scope.params.cardNo){
			appService.popup("请输入身份证号码");
			return;
		}
		var url = 'account/fundAccount/apply.do';
        appService.post(url,$scope.params,{tokenId:sessionStorage.tokenId},function(data){
         	//通知app端：实名认证 完成
         	appRuler.step1Success(function(){
         		$state.go('IDauthenStep2',{from:$stateParams.from});
         	})
        },function(data){
            appService.popup(data.msg); 
        },true);
	};

	$scope.back = function(){
		if($stateParams.from=="h5"){
			//从h5过来
 			$state.go('userInfo');
 		}else{
 			//从app过来
 			appRuler.closePage();
 		}
	};

	//页面初始化
    appRuler.getUserInfo(function(data){
        sessionStorage.tokenId = data.tokenId;
    });

}])