'use strict';
angular.module('customerInfo.ctrl', [])

.controller('customerInfoCtrl', ['$scope', '$rootScope','appService', function($scope, $rootScope, appService) {

    //企业信息    
	$scope.c = {};

	//获取企业信息
	$scope.getCustomerInfo = function(){

        var url = 'account/customerinfo/loadUserDetail.do';

        appService.post(url,{},{tokenId:sessionStorage.tokenId},function(data){
         	$scope.c = data;
        },function(data){
            appService.popup(data.msg); 
        },true);
    };

    //页面初始化
    appRuler.getUserInfo(function(data){
        sessionStorage.tokenId = data.tokenId;
        //获取企业信息
        $scope.getCustomerInfo();
    });

}])