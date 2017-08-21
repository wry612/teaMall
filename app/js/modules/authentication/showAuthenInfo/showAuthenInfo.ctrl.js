'use strict';
angular.module('showAuthenInfo.ctrl', [])

.controller('showAuthenInfoCtrl', ['$scope', '$rootScope','appService','$state','$ionicModal','$stateParams','$ionicHistory', function($scope, $rootScope, appService, $state, $ionicModal,$stateParams,$ionicHistory) {

	$scope.userInfo = {};

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

}])