'use strict';
angular.module('mallProDetail.ctrl', ['app.directive'])

.controller('mallProDetailCtrl', ['$scope', '$rootScope','appService','$ionicSlideBoxDelegate','$ionicScrollDelegate','$timeout', function($scope, $rootScope, appService, $ionicSlideBoxDelegate, $ionicScrollDelegate, $timeout) {

	//是否显示图文区域
	$scope.showImageArea = true;
	//商品详情
	$scope.proInfo = null;
	//茶语评分
	$scope.ChaYuInfo = null;

	//图片地址前缀
	$scope.imgPre = appService.httpAddress + "pictures/product/";

	//查询商品详情
	$scope.getProInfo = function(){
		var url = "show/product/detail.do";
		appService.post(url,{productId:appService.getParamValue('productId')},{},function(data){
			$scope.proInfo = data;
			$ionicSlideBoxDelegate.update();
		},function(data){
            appService.popup(data.msg); 
        },true);
	};

	//查询【茶语评分】
	$scope.query = function(){
		var url = "show/product/queryChaYuInfo.do";
		appService.post(url,{productCode:appService.getParamValue('productCode')},{},function(data){
			$scope.ChaYuInfo = data;
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

    //查询图表信息
	$scope.linedata = function(){
		var url = "show/productchart/linedata.do ";
		appService.post(url,{productCode:appService.getParamValue('productCode')},{},function(data){
			var legendData = [];
			for(var i in data.items){
				legendData.push(data.items[i].name);
			}
			// 基于准备好的dom，初始化echarts实例
		    var chart = echarts.init(document.getElementById('chart'));
		    // 指定图表的配置项和数据
		    var option = {
			    title: {
			        text: data.title,
			        textStyle:{
			            fontSize: 14,
	                	fontWeight: 'bolder',
			        	color: '#333'
			        } 
			    },
			    tooltip: {
		        	trigger: 'axis',
		            axisPointer: {
		                type: 'line',
		                animation: false,
		                label: {
		                	formatter: '日期 {value}',
		                    backgroundColor: '#505765'
		                }
		            }
		        },
			    legend: {
			        data:legendData,
			        x: 'right',
			        top:22
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis: {
			        type: 'category',
			        boundaryGap: false,
			        data: data.xAxis
			    },
			    yAxis: {
			        name: data.yAxisTitle
			    },
			    series: data.items
			};
		    //使用刚指定的配置项和数据显示图表。
		    chart.setOption(option);
		},function(data){
            appService.popup(data.msg); 
        },true)
	};

    

    //查询商品详情
	$scope.getProInfo();
	//查询图表信息
	$scope.linedata();

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