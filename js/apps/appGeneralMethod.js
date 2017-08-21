'use strict';
module.exports = function (window) {
    (function (window) {

        //判断所处的运行平台（androidApp | iosApp | h5）
        var checkPlatform = function () {
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('CQT') > -1;
            if(isAndroid) {
                //android app
                return 'isAndroidApp'
            } else if ('webkit' in window) {
                if('messageHandlers' in window.webkit) {
                    if('sendEvent' in window.webkit.messageHandlers) {
                        //iOS app
                        return 'isiOSApp'
                    }
                }
            } else {
                //h5
                return 'isH5'
            }
        }

        //获取运行平台类型
        var p = checkPlatform();

        var appRuler = {};

        var h5Callback = null;

        appRuler.platform = p;

        //获取app登录用户的信息
        appRuler.getUserInfo = function(callback){
            h5Callback = callback;
            if(p=="isAndroidApp"){
                window.CQT.getUserInfo();
            }else if(p=="isiOSApp"){
                window.webkit.messageHandlers.sendEvent.postMessage({type:'getUserInfo',params:{}});
            }else{
                console.log('h5 getUserInfo');
                responseFromApp({tokenId:sessionStorage.tokenId});
            }
        }

        //关闭html页面
        appRuler.closePage = function(){
            if(p=="isAndroidApp"){
                window.CQT.closePage();
            }else if(p=="isiOSApp"){
                window.webkit.messageHandlers.sendEvent.postMessage({type:'closePage',params:{}});
            }else{
                console.log('h5 closePage');
            }
        }

        //隐藏app端的页面标题
        appRuler.hidePageTitle = function(flag){
            if(p=="isAndroidApp"){
                window.CQT.hidePageTitle(flag);
            }else if(p=="isiOSApp"){
                window.webkit.messageHandlers.sendEvent.postMessage({type:'hidePageTitle',params:{flag:flag}});
            }else{
                console.log('h5 hidePageTitle');
            }
        }
        
        //调用app弹框
        appRuler.showDialog = function(msg){
            if(!msg){
                console.log('appRuler.alert---缺少参数');
                return;
            }
            if(p=="isAndroidApp"){
                window.CQT.showDialog(msg);
            }else if(p=="isiOSApp"){
                window.webkit.messageHandlers.sendEvent.postMessage({type:'showDialog',params:{msg:msg}});
            }else{
                alert(msg);
            }
        }

        //打开app端的登录页面
        appRuler.login = function(){
            if(p=="isAndroidApp"){
                window.CQT.login();
            }else if(p=="isiOSApp"){
                window.webkit.messageHandlers.sendEvent.postMessage({type:'login',params:{}});
            }else{
                console.log('h5 login');
            }
        }

        //使app端用户登录
        appRuler.signIn = function(tokenId,roleType,callback){
            h5Callback = callback;
            if(p=="isAndroidApp"){
                var json = JSON.stringify({tokenId:tokenId,roleType:roleType});
                window.CQT.signIn(json);
            }else if(p=="isiOSApp"){
                window.webkit.messageHandlers.sendEvent.postMessage({type:'signIn',params:{tokenId:tokenId,roleType:roleType}});
            }else{
                console.log('h5 signIn');
                sessionStorage.tokenId = tokenId;
            }
        }

        //跳转到app端首页
        appRuler.toIndexPage = function(){
            if(p=="isAndroidApp"){
                window.CQT.toIndexPage();
            }else if(p=="isiOSApp"){
                window.webkit.messageHandlers.sendEvent.postMessage({type:'toIndexPage',params:{}});
            }else{
                console.log('h5 toIndexPage');
            }
        }

        //通知app端：实名认证 完成
        appRuler.step1Success = function(callback){
            h5Callback = callback;
            if(p=="isAndroidApp"){
                window.CQT.step1Success();
            }else if(p=="isiOSApp"){
                window.webkit.messageHandlers.sendEvent.postMessage({type:'step1Success',params:{}});
            }else{
                console.log('h5 step1Success');
                callback();
            }
        }

        //通知app端：绑定经销商 完成
        appRuler.bindSuccess = function(callback){
            h5Callback = callback;
            if(p=="isAndroidApp"){
                window.CQT.bindSuccess();
            }else if(p=="isiOSApp"){
                window.webkit.messageHandlers.sendEvent.postMessage({type:'bindSuccess',params:{}});
            }else{
                console.log('h5 bindSuccess');
                callback();
            }
        }

        //app端回调h5的函数responseFromApp
        var responseFromApp = function (params) {
            if(h5Callback && typeof h5Callback=="function"){
                if(p=='isAndroidApp'){
                    if(!params){ params = "{}"; }
                    var parse = JSON.parse(params);
                    h5Callback(parse);  
                }else if(p=='isiOSApp'){
                    h5Callback(params);    
                }else{
                    h5Callback(params);
                }
            }
        };

        window.appRuler = appRuler;
        window.responseFromApp = responseFromApp;

    })(window);


}