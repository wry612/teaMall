'use strict';
angular.module('proDetail.ctrl', ['app.directive'])

.controller('proDetailCtrl', ['$scope', '$rootScope','appService','$ionicSlideBoxDelegate','$ionicScrollDelegate','$timeout', function($scope, $rootScope, appService, $ionicSlideBoxDelegate, $ionicScrollDelegate, $timeout) {

	//是否显示图文区域
	$scope.showImageArea = true;

	//商品详情
	$scope.proInfo = {};

	//图片地址前缀
	$scope.imgPre = appService.httpAddress + "pictures/product/";

	//查询商品详情
	$scope.getProInfo = function(){
		var url = "show/productIssue/detail.do";
		appService.post(url,{productId:appService.getParamValue('productId'),productCode:appService.getParamValue('productCode')},{},function(data){
			$scope.proInfo = data;
			$ionicSlideBoxDelegate.update();
		},function(data){
            appService.popup(data.msg); 
        },true)
	};

    //查看【图文详情 | 规格参数】
    $scope.checkImgInfo = function(f){
        $scope.showImageArea = f;
        //告诉滚动视图重新计算它的容器大小
        $ionicScrollDelegate.$getByHandle('mainScroll').resize();
    };

	$scope.getProInfo();

}])

//日期格式转换（毫秒 转 日期）
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
});