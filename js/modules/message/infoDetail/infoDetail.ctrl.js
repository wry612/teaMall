'use strict';
angular.module('infoDetail.ctrl', [])

.controller('infoDetailCtrl', ['$scope', '$rootScope','appService','$state','$stateParams', function($scope, $rootScope, appService, $state, $stateParams) {

	$scope.info = null;

	//消息详情
	$scope.infoDetail = function(){
		var url = 'notice/news/queryDetail.do';
        appService.post(url,{id : $stateParams.id},null,function(data){
         	$scope.info = data;
        },function(data){
            appService.popup(data.msg); 
        },true);
	};

	$scope.infoDetail();

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
        var src = year + "年" + month + "月" + day + "日"+"  "+hour+":"+minute+":"+second;
        return src;
	}
})