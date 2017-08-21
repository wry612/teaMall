'use strict';
angular.module('app.service', [])

    .config(['$httpProvider', function ($httpProvider) {
        //处理http post后端接受不到参数的问题
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        var param = function(obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
            for(name in obj) {
              value = obj[name];
                 
              if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                  subValue = value[i];
                  fullSubName = name + '[' + i + ']';
                  innerObj = {};
                  innerObj[fullSubName] = subValue;
                  query += param(innerObj) + '&';
                }
              }
              else if(value instanceof Object) {
                for(subName in value) {
                  subValue = value[subName];
                  fullSubName = name + '[' + subName + ']';
                  innerObj = {};
                  innerObj[fullSubName] = subValue;
                  query += param(innerObj) + '&';
                }
              }
              else if(value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };
        $httpProvider.defaults.transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    }])

    .factory('appService', ['$rootScope', '$http','$ionicLoading','$ionicPopup','$timeout', function ($rootScope, $http, $ionicLoading, $ionicPopup, $timeout) {

    	//sit环境
        var sitAddress = "http://172.18.11.178:8081/";
    	//测试环境
        var uatAddress = "http://teamall-test.datek.cn/";
        //产线环境
        var proAddress = "http://";

        var imgUrl = 'http://teamall-test.datek.cn/pictures/';

        var appService = {

            //图片地址
            imgUrl : imgUrl,
            
            proImgUrl : imgUrl + "product/",

            //接口地址
            httpAddress: (function(){
            	//获取当前的运行环境标识（开发环境|测试环境|产线环境）
            	var v = process.env.NODE_ENV;
            	if(v=="dev"){
            		return sitAddress;
            	}else if(v=="test"){
					return uatAddress;
            	}else{
            		return proAddress;
            	}
            })(),

    		post: function (url, params, head,successFunc, failFunc, isLoad) {
                if (isLoad) appService.loading();
                url = this.httpAddress +''+ url;
                $http.post(url,params, {headers : head}).success(function (data, status, config, header) {
                    if (isLoad) appService.loaded();
                    if (successFunc != null && typeof successFunc == "function") {
                        if(data){
                            $timeout(function() {
                                successFunc(data);    
                            }, 300);
                        }else{
                            $timeout(function() {
                                failFunc(data);
                            }, 300);
                        }
                    }
                }).error(function (data, status, config, header) {
                    if (isLoad) appService.loaded();
                    var msg = "网络异常，请稍后再试";
                    //长时间未操作 登录身份失效
                    if(data && data.code=="SECURITY_PERMISSION_DENY"){
                        appService.popup("未登录或登录身份已失效，请重新登录!",null,function(){
                            appRuler.login();    
                        });
                    }else if (data && data.msg) {
                        if (failFunc != null && typeof failFunc == "function") {
                            $timeout(function() {
                                failFunc(data);
                            }, 300);
                        }
                    }else{
                        appService.popup(msg);
                    }
                    
                });
            },

            get: function (url, params,head,successFunc, failFunc, isLoad) {
                if (isLoad == undefined) isLoad = true;
                if (isLoad) appService.loading()
                var action = this.httpAddress + this.merge(url, params);
                
                $http({
                      method: "get",
                      data: {},
                      headers : head,
                      url: action
                  }).success(function (data) {
                        if (isLoad) appService.loaded();
                        if (successFunc != null && typeof successFunc == "function") {
                            if(data){
                                $timeout(function() {
                                    successFunc(data);    
                                }, 300);
                            }   
                        }
                  }).error(function(data, status, config, header){
                        if (isLoad) appService.loaded();
                        var msg = "网络异常，请稍后再试";
                        if (data && data.msg) {
                            if (failFunc != null && typeof failFunc == "function") {
                                $timeout(function() {
                                    failFunc(data);
                                }, 300);
                            }
                        }else{
                            appService.popup(msg);    
                        }
                  })

            },

            //处理参数
            merge: function (url, params) {
                if (!url) {
                    return null;
                }
                for (var p in params) {
                    url = url.replace("{" + p + "}", params[p]);
                }
                return url;
            },

            //加载中...
            loading: function () {
                $ionicLoading.show();
            },
            //加载完毕
            loaded: function () {
                $timeout(function(){
                    $ionicLoading.hide();
                },300);
            },
            /**
             * 弱提示
             * @param msg
             * @param time
             * @param callback
             */
            popup: function (msg, time, callback) {
                var alertPopup = $ionicPopup.show({
                    template: "<div class='week-popup'>"+msg+"</div>"
                });
                if (!time) {
                    time = 2000;
                }
                $timeout(function () {
                    alertPopup.close();
                }, time);

                alertPopup.then(function (res) {
                    if (callback && typeof (callback) == "function") {
                        callback(res);
                    }
                });
            },

            /**
             * 将页面url所带参数进行包装
             */
            getUrlArgObject : function () {
                var search = window.location.search;
                // 写入数据字典
                var tmparray = search.substr(1, search.length).split("&");
                var paramsArray = new Array;
                if (tmparray != null) {
                    for (var i = 0; i < tmparray.length; i++) {
                        var reg = /[=|^==]/;    // 用=进行拆分，但不包括==
                        var set1 = tmparray[i].replace(reg, '&');
                        var tmpStr2 = set1.split('&');
                        var array = new Array;
                        array[tmpStr2[0]] = tmpStr2[1];
                        paramsArray.push(array);
                    }
                }
                // 将参数数组进行返回
                return paramsArray;
            },

            /**
             * 获取url所带的参数
             */
            getParamValue : function (name) {
                var paramsArray = this.getUrlArgObject();
                if (paramsArray != null) {
                    for (var i = 0; i < paramsArray.length; i++) {
                        for (var j in paramsArray[i]) {
                            if (j == name) {
                                return paramsArray[i][j];
                            }
                        }
                    }
                }
                return null;
            }

        };

        return appService;

    }])

	