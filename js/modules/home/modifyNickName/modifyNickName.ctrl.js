'use strict';
angular.module('modifyNickName.ctrl', [])

.controller('modifyNickNameCtrl', ['$scope', '$rootScope','appService','$stateParams','$state', function($scope, $rootScope, appService, $stateParams, $state) {

    $scope.params = {
        nickName:$stateParams.nickName,
        gender:'',
        birthdate:'',
        email:''
    };

	$scope.submit = function(){
        
        if(!$scope.params.nickName){
            appService.popup("请输入昵称");
            return;
        }

        var url = 'account/fundAccount/editInfo.do';

        appService.post(url,$scope.params,{tokenId:sessionStorage.tokenId},function(data){
            appService.popup('修改成功！',null,function(){
                $state.go('userInfo');
            }); 
        },function(data){
            appService.popup(data.msg); 
        },true);
    };

}])