'use strict';
angular.module('myMember.ctrl', [])

.controller('myMemberCtrl', ['$scope', '$rootScope','appService','$stateParams', function($scope, $rootScope, appService, $stateParams) {

    //【我的经销商信息】 | 【该经销商关联的生产商信息】
	$scope.m = null;

	//查询【我的经销商】|【我的上级】
	$scope.getMemberInfo = function(memberNo){
        var url = 'account/member/load.do';
        appService.post(url,{memberNo : memberNo},{tokenId:sessionStorage.tokenId},function(data){
         	$scope.m = data;
        },function(data){
            appService.popup(data.msg); 
        },true);
    };

    //登录用户的角色【交易商|经销商】
    $scope.role = "";

    //显示【经销商名称】|【茶企名称】
    $scope.showDistri = true;

    //个人信息
    $scope.getUserInfo = function(){
        var url = 'account/customerinfo/loadUserDetail.do';
        appService.post(url,{},{tokenId:sessionStorage.tokenId},function(data){
            $scope.role = data.role;
            //先判断是【交易商】还是【经销商】
            if(data.role=="CUSTOMER"){
                $scope.getMemberInfo(data.memberNo);
            }else if(data.role=="AGENT"){
                if(data.parentMemberNo){
                    //此时有【上级经销商】
                    $scope.getMemberInfo(data.parentMemberNo);
                }else{
                    //此时没有【上级经销商】，则查询【该经销商关联的生产商信息】
                    $scope.showDistri = false;
                    var url = 'account/producer/load.do';
                    appService.post(url,{producerNo:data.producer[0].code},{tokenId:sessionStorage.tokenId},function(data){
                        $scope.m = data;
                    },function(data){
                        appService.popup(data.msg); 
                    },true);
                }
            }
            
        },function(data){
            appService.popup(data.msg); 
        },true);
    };

    //页面初始化
    appRuler.getUserInfo(function(data){
        sessionStorage.tokenId = data.tokenId;
        $scope.getUserInfo();
    });

}])