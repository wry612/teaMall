'use strict';
angular.module('IDauthenStep2.ctrl', [])

.controller('IDauthenStep2Ctrl', ['$scope', '$rootScope','appService','$state','$ionicModal','$stateParams','$ionicHistory', function($scope, $rootScope, appService, $state, $ionicModal,$stateParams,$ionicHistory) {

	$scope.params = {
		provinceId : '',
		cityId : '',
		areaId : ''
	};
	$scope.params2 = {
		memberNo : ''
	};
	$scope.params3 = {
		code : ''
	};
	$scope.proviceList = [];
	$scope.cityList = [];
	$scope.areaList = [];
	$scope.fuzzyList = [];
	$scope.fuzzyName = '';
	$scope.address = '';

	$scope.addressPre = {
		provinceName : '',
		cityName : '',
		areaName : ''
	};

	//绑定经销商
	$scope.submitConfirm = function(){
		if(!$scope.params2.memberNo){
			appService.popup("请选择经销商");
			return;
		}
		$scope.confirmModal.show();
	};

	$scope.submit = function(){
		$scope.confirmModal.hide();
		var url = 'account/fundAccount/bindMember.do';
        appService.post(url,$scope.params2,{tokenId:sessionStorage.tokenId},function(data){
         	appService.popup("绑定成功！",null,function(){
         		//绑定成功，并告知app端
         		appRuler.bindSuccess(function(){
         			$state.go('IDauthenSuccess');	
         		})
         	});
        },function(data){
            appService.popup(data.msg); 
        },true);
	};

	//获取省份列表
	$scope.getProvice = function(clearCodeFlag){
		if(clearCodeFlag){ $scope.params3.code = '';}
		var url = 'account/member/province.do';
        appService.post(url,{},{tokenId:sessionStorage.tokenId},function(data){
         	$scope.proviceList = data.body;
        },function(data){
            appService.popup(data.msg); 
        },true);
	};
	
	//获取城市列表
	$scope.getCity = function(clearCodeFlag){

		if(clearCodeFlag){ $scope.params3.code = '';}
		if(!$scope.params.provinceId){ 
			$scope.params.cityId = '';
			$scope.cityList = [];
			$scope.params.areaId = '';
			$scope.areaList = [];
			$scope.params2.memberNo = '',
			$scope.fuzzyList = [];
			$scope.fuzzyName = '';
			return; 
		}

		//根据省份id获取省份名称
		for(var i in $scope.proviceList){
			if($scope.params.provinceId == $scope.proviceList[i].provinceID){
				$scope.addressPre.provinceName = $scope.proviceList[i].province;
			}
		}

		var url = 'account/member/city.do';
        appService.post(url,{provinceId:$scope.params.provinceId},{tokenId:sessionStorage.tokenId},function(data){
         	$scope.cityList = data.body;
        },function(data){
            appService.popup(data.msg); 
        },true);
	};

	//获取区县列表
	$scope.getArea = function(clearCodeFlag){

		if(clearCodeFlag){ $scope.params3.code = '';}
		if(!$scope.params.cityId){ 
			$scope.params.areaId = '';
			$scope.areaList = [];
			$scope.params2.memberNo = '',
			$scope.fuzzyList = [];
			$scope.fuzzyName = '';
			return; 
		}

		//根据城市id获取城市名称
		for(var i in $scope.cityList){
			if($scope.params.cityId == $scope.cityList[i].cityID){
				$scope.addressPre.cityName = $scope.cityList[i].city;
			}
		}

		var url = 'account/member/area.do';
        appService.post(url,{cityId:$scope.params.cityId},{tokenId:sessionStorage.tokenId},function(data){
         	$scope.areaList = data.body;
        },function(data){
            appService.popup(data.msg); 
        },true);
	};

	//获取经销商列表
	$scope.getFuzzy = function(clearCodeFlag){

		if(clearCodeFlag){ $scope.params3.code = '';}
		if(!$scope.params.areaId){ 
			$scope.params2.memberNo = '',
			$scope.fuzzyList = [];
			$scope.fuzzyName = '';
			return; 
		}

		//根据区县id获取区县名称
		for(var i in $scope.areaList){
			if($scope.params.areaId == $scope.areaList[i].areaID){
				$scope.addressPre.areaName = $scope.areaList[i].area;
			}
		}

		var url = 'account/member/fuzzyQuery.do';
		var params = {
			provinceCode : angular.copy($scope.params.provinceId),
			cityCode : angular.copy($scope.params.cityId),
			areaCode : angular.copy($scope.params.areaId)
		}
        appService.post(url,params,{tokenId:sessionStorage.tokenId},function(data){
         	$scope.fuzzyList = data.body;
        },function(data){
            appService.popup(data.msg); 
        },true);
	};

	//显示经销商名称
	$scope.getFuzzyName = function(clearCodeFlag){
		
		if(clearCodeFlag){ $scope.params3.code = '';}
		if(!$scope.params2.memberNo){ 
			$scope.fuzzyName = '';
			return; 
		}

		for(var i in $scope.fuzzyList){
			if($scope.fuzzyList[i].memberNo==$scope.params2.memberNo){
				$scope.fuzzyName = $scope.fuzzyList[i].name;
				$scope.address = $scope.fuzzyList[i].address;
			}
		}
	};

	//输入经销商推荐码
	$scope.searchFuzzy = function(){
		if(!$scope.params3.code){return;}
		var url = 'account/member/recommend.do';
        appService.post(url,$scope.params3,{tokenId:sessionStorage.tokenId},function(data){
			$scope.params.provinceId = data.provinceId;
			$scope.params.cityId = data.cityId;
			$scope.params.areaId = data.areaId;
			$scope.params2.memberNo = data.memberNo;
			$scope.fuzzyName = data.name;
			$scope.address = data.address;
			$scope.getCity();//获取城市列表
			$scope.getArea();//获取区县列表
			$scope.getFuzzy();//获取经销商列表
        },function(data){
            appService.popup(data.msg); 
            $scope.params.provinceId = '';
			$scope.params.cityId = '';
			$scope.params.areaId = '';
			$scope.params2.memberNo = '';
			$scope.cityList = [];
			$scope.areaList = [];
			$scope.fuzzyList = [];
			$scope.fuzzyName = '';
        },true);
	};

	$scope.back = function(){
		if($stateParams.from=="h5"){
			//从h5过来
 			$state.go('userInfo');
 		}else{
 			//从app过来
 			appRuler.closePage();
 		}
	};

    //页面初始化
    appRuler.getUserInfo(function(data){
        sessionStorage.tokenId = data.tokenId;
    });

	//获取省份列表
	$scope.getProvice();

	//绑定确认
    $ionicModal.fromTemplateUrl('confirm.html', {
        scope: $scope,
        animation: 'slide-in-down'
    }).then(function(modal) {
        $scope.confirmModal = modal;
    });

    

}])