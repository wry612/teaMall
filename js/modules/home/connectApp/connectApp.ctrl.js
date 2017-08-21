'use strict';
angular.module('connectApp.ctrl', [])

.controller('connectAppCtrl', ['$scope', '$rootScope','appService', function($scope, $rootScope, appService) {

	$scope.getUserInfo = function(){
        appRuler.getUserInfo(function(data){
        	appService.popup(data);
        });
    };

}])