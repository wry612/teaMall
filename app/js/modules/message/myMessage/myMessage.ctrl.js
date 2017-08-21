'use strict';
angular.module('myMessage.ctrl', [])

.controller('myMessageCtrl', ['$scope', '$rootScope','appService','$state', function($scope, $rootScope, appService, $state) {

	$scope.count1 = null;
	$scope.count2 = null;
	$scope.count3 = null;

	//查询未读消息数量
	$scope.getMsgCount = function(type){
		//account/letter/count.do?type= notice | trade | logistics
		var url = 'account/letter/count.do?type='+type;
        appService.post(url,{},{tokenId:sessionStorage.tokenId},function(data){
        	if(type=="notice"){
        		$scope.count1 = data.body;
    		}else if(type=="logistics"){
    			$scope.count2 = data.body;
    		}else{
    			$scope.count3 = data.body;
    		}
         	
        },function(data){
        	console.log(333);
            appService.popup(data.msg); 
        },true);
	};

	

    //页面初始化
    appRuler.getUserInfo(function(data){
        if(!data.tokenId){
            //未登录，先去登录
            appRuler.login();
        }else{
            sessionStorage.tokenId = data.tokenId;
            $scope.getMsgCount('notice');
            $scope.getMsgCount('logistics');
            $scope.getMsgCount('trade');
        }
    });

}])