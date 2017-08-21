'use strict';
angular.module('IDauthenSuccess.ctrl', [])

.controller('IDauthenSuccessCtrl', ['$scope', '$rootScope','appService','$state','$ionicModal','$stateParams','$ionicHistory', function($scope, $rootScope, appService, $state, $ionicModal,$stateParams,$ionicHistory) {

	//回首页逛逛
	$scope.toIndexPage = function(){
		//跳转到app端首页
		appRuler.toIndexPage();
	};

}])