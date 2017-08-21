'use strict';
angular.module('storeAddress.ctrl', [])

.controller('storeAddressCtrl', ['$scope', '$rootScope','appService','$state','$ionicModal', function($scope, $rootScope, appService, $state, $ionicModal) {

	$scope.addressList = [];

	//查询【提货门店】
	$scope.getAddressList = function(){
		var url = 'account/deliverAddress/queryStore.do';
        appService.post(url,{},{tokenId:sessionStorage.tokenId},function(data){
        	$scope.addressList = data;
        },function(data){
            appService.popup(data.msg); 
        },true);
	};

    //页面初始化
	appRuler.getUserInfo(function(data){
		sessionStorage.tokenId = data.tokenId;
		$scope.getAddressList();
	});

}])