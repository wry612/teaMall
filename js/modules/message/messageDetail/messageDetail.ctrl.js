'use strict';
angular.module('messageDetail.ctrl', [])

.controller('messageDetailCtrl', ['$scope', '$rootScope','appService','$state','$stateParams', function($scope, $rootScope, appService, $state, $stateParams) {

	$scope.params = {
		type : $stateParams.type,
		id : $stateParams.id
	};

	$scope.m = null;

	//消息详情
	$scope.messageDetail = function(){
		var url = 'account/letter/read.do';
		var params = {};
		var headers = {};
		if($stateParams.type=="sysNotice"){
			//系统公告
			url = 'notice/news/queryDetail.do';
			params.id = $stateParams.id;
		}else{
			//个人消息
			params = $scope.params;
			headers = {tokenId:sessionStorage.tokenId};
		}
        appService.post(url,params,headers,function(data){
         	$scope.m = data;
        },function(data){
            appService.popup(data.msg); 
        },true);
	};

	$scope.messageDetail();

}])
.filter('dateTime',function(){
	return function(ms){
		var dealformat = function(index) {
	        index = "" + index;
	        if (index.length == 1) {
	            index = "0" + index;
	        }
	        return index;
	    };
		var date = new Date();
        date.setTime(ms);
        var year = date.getFullYear();
        var month = dealformat(date.getMonth() + 1);
        var day = dealformat(date.getDate());
        var hour = dealformat(date.getHours());
        var minute = dealformat(date.getMinutes());
        var second = dealformat(date.getSeconds());
        var src = year + "年" + month + "月" + day + "日";
        return src;
	}
})