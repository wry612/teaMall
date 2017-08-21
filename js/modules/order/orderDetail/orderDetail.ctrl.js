'use strict';
angular.module('orderDetail.ctrl', [])

.controller('orderDetailCtrl', ['$scope', '$rootScope','appService','$state','$ionicScrollDelegate','$timeout', function($scope, $rootScope, appService, $state, $ionicScrollDelegate, $timeout) {

    /*
        该页面需要参数：
            orderType：【buy - 买单】【sell - 卖单】
            orderCode：订单编号
    */

    //是否显示发票详情
    $scope.showInvoiceDetailFlag = false;
    //订单类型【买单|卖单】
    $scope.orderType = appService.getParamValue('orderType');
    //订单信息
    $scope.o = null;
    //图片地址前缀
    $scope.imgPre = appService.httpAddress + "pictures/product/";

	//查询订单详情
    $scope.getMyMessage = function(){
        var url = 'order/manager/loadDetail.do';
        appService.post(url,{orderCode:appService.getParamValue('orderCode')},{tokenId:sessionStorage.tokenId},function(data){
            $scope.o = data;
            //$scope.o.invoiceInfoVo.type = 'addtax';
        },function(data){
            appService.popup(data.msg); 
        },true);
    };

    //查看发票详情
    $scope.showInvoiceDetail = function(){
        appService.loading();
        $scope.showInvoiceDetailFlag = !$scope.showInvoiceDetailFlag;
        //告诉滚动视图重新计算它的容器大小
        appService.loaded();
        $timeout(function(){
            $ionicScrollDelegate.$getByHandle('mainScroll').resize();    
        },300);
    };

    //页面初始化
    appRuler.getUserInfo(function(data){
        sessionStorage.tokenId = data.tokenId;
        //查询订单详情
        $scope.getMyMessage();
    });

}])