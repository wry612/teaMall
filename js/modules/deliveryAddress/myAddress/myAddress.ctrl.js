'use strict';
angular.module('myAddress.ctrl', [])

.controller('myAddressCtrl', ['$scope', '$rootScope','appService','$state','$ionicModal', function($scope, $rootScope, appService, $state, $ionicModal) {

	$scope.addressList = [];

	//设置默认地址
	$scope.selected = function(a){
		var url = 'account/deliverAddress/setDefault.do';
        appService.post(url,{id:a.id},{tokenId:sessionStorage.tokenId},function(data){
        	appService.popup("设置成功！",null,function(){
        		$scope.getAddressList();
        	}); 
        },function(data){
            appService.popup(data.msg); 
        },true);
	};

	//要删除的地址
	$scope.deleteId = '';

	//删除确认
	$scope.deleteConfirm = function(a){
		$scope.deleteId = a.id;
		$scope.confirmModal.show();
	};

	//删除
	$scope.delete = function(){
		$scope.confirmModal.hide();
		var url = 'account/deliverAddress/delete.do';
        appService.post(url,{id:$scope.deleteId},{tokenId:sessionStorage.tokenId},function(data){
        	appService.popup("删除成功！",null,$scope.getAddressList); 
        },function(data){
            appService.popup(data.msg); 
        },false);
	};

	//查询我的收货地址 列表
	$scope.getAddressList = function(){
		var url = 'account/deliverAddress/list.do';
        appService.post(url,{},{tokenId:sessionStorage.tokenId},function(data){
        	$scope.addressList = data;
        },function(data){
            appService.popup(data.msg); 
        },true);
	};

	//去编辑
	$scope.edit = function(a){
		$state.go("addandEditAddress",a);
	};

	//删除确认
    $ionicModal.fromTemplateUrl('confirm.html', {
        scope: $scope,
        animation: 'slide-in-down'
    }).then(function(modal) {
        $scope.confirmModal = modal;
    });

    //页面初始化
	appRuler.getUserInfo(function(data){
		sessionStorage.tokenId = data.tokenId;
		$scope.getAddressList();
	});

}])