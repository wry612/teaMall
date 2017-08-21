'use strict';
angular.module('messageList.ctrl', [])

.controller('messageListCtrl', ['$scope', '$rootScope','appService','$state','$stateParams', function($scope, $rootScope, appService, $state, $stateParams) {

	//消息列表
	$scope.messageList = [];

	//查询消息 参数	
	$scope.params = {
		type: $stateParams.type,//系统公告(notice) | 物流消息(logistics) | 交易消息(trade)
		page : 1,
		pageSize : 10
	};

	//图片地址前缀
	$scope.imgUrl = appService.proImgUrl;

	//是否加载更多
	$scope.loadMoreFlag = true;

	//查询消息列表
	$scope.getMyMessage = function(){
		var url = 'account/letter/list.do';
        appService.post(url,$scope.params,{tokenId:sessionStorage.tokenId},function(data){
         	$scope.messageList = $scope.messageList.concat(data.rows);
            $scope.params.page ++;
            var totalPage = data.total % $scope.params.pageSize != 0 ? (data.total / $scope.params.pageSize) +1 : data.total / $scope.params.pageSize;
            if($scope.params.page > parseInt(totalPage)){
                $scope.loadMoreFlag = false;
            }else{
                $scope.loadMoreFlag = true;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        },function(data){
            appService.popup(data.msg); 
        },true);
	};

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