'use strict';
angular.module('addandEditAddress.ctrl', [])

.controller('addandEditAddressCtrl', ['$scope', '$rootScope','appService','$state','$stateParams','$timeout', function($scope, $rootScope, appService, $state, $stateParams, $timeout) {

	$scope.params = {
		id : $stateParams.id || '',
		isDefault : $stateParams.isDefault==0 ? '0' : '1',  //0-默认地址，1-非默认地址
		provinceId : $stateParams.provinceId || '',  //省份
		cityId : $stateParams.cityId || '',      //城市
		areaId : $stateParams.areaId || '',      //区县
		receiver : $stateParams.receiver || '',    //收件人
		mobilePhone : $stateParams.mobilePhone || '', //手机号
		detailAddress : $stateParams.detailAddress || ''//详细地址
	};

	$scope.proviceList = [];
	$scope.cityList = [];
	$scope.areaList = [];

	//获取省份列表
	$scope.getProvice = function(){
		var url = 'account/area/queryProvinces.do';
        appService.post(url,{},{},function(data){
         	$scope.proviceList = data;
        },function(data){
            appService.popup(data.msg); 
        },true);
	};
	
	//获取城市列表
	$scope.getCity = function(){
		$scope.params.areaId = '';
		$scope.areaList = [];
		if(!$scope.params.provinceId){
			$scope.params.cityId = '';
			$scope.cityList = [];
			return;
		}
		var url = 'account/area/queryCitys.do';
        appService.post(url,{provinceId:$scope.params.provinceId},{},function(data){
         	$scope.cityList = data;
        },function(data){
            appService.popup(data.msg); 
        },true);
	};

	//获取区县列表
	$scope.getArea = function(){
		if(!$scope.params.cityId){
			$scope.params.areaId = '';
			$scope.areaList = [];
			return;
		}
		var url = 'account/area/queryAreas.do';
        appService.post(url,{cityId:$scope.params.cityId},{tokenId:sessionStorage.tokenId},function(data){
         	$scope.areaList = data;
        },function(data){
            appService.popup(data.msg); 
        },true);
	};

	//保存
	$scope.submit = function(){
		console.log($scope.params);
		if(!$scope.params.receiver){
			appService.popup('请输入收货人姓名'); 
		}else if(!$scope.params.mobilePhone){
			appService.popup('请输入收货人手机号'); 
		}else if( !(/^(1[3-9][0-9])\d{8}$/.test($scope.params.mobilePhone)) ){
			appService.popup('手机号格式不正确'); 
		}else if(!$scope.params.provinceId){
			appService.popup('请选择省份'); 
		}else if(!$scope.params.cityId){
			appService.popup('请选择城市'); 
		}else if(!$scope.params.areaId){
			appService.popup('请选择区县'); 
		}else if(!$scope.params.detailAddress){
			appService.popup('请输入详细地址'); 
		}else{
			var url = 'account/deliverAddress/add.do';
			if($stateParams.id){
				//此时为：修改收货地址
				url = 'account/deliverAddress/edit.do';
			}
	        appService.post(url,$scope.params,{tokenId:sessionStorage.tokenId},function(data){
	         	appService.popup("保存成功!",null,function(){
	         		$state.go('myAddress');
	         	});
	        },function(data){
	            appService.popup(data.msg);
	        },true);
		}
	};

	$scope.init = function(){
		//获取省份列表
		$scope.getProvice();
		if($stateParams.id){
			//此时为：修改收货地址
			$scope.getCity();//获取城市列表
			$scope.getArea();//获取区县列表
			$scope.params.provinceId = $stateParams.provinceId + '';
			$scope.params.cityId = $stateParams.cityId + '';
			$scope.params.areaId = $stateParams.areaId + '';
		}
	};

	$scope.init();

}])