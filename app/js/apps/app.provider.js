'use strict';
/*
定义全局provider在config中调用
*/
angular.module('app.provider', ['ionic', 'oc.lazyLoad'])
    .provider('app', appProviderFun);

function appProviderFun() {
    this.basePath = {
        tpl: 'dist/tpl/',
        css: 'dist/css/',
        js: 'dist/js/'
    };
    this.LazyLoadTpl = function(file) {
        return function() {
            return file;
        }
    };
    this.LazyLoadFile = function(file) {
        return {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load(file);
            }]
        }
    };
    this.$get = function() {
        return {
            'LazyLoadTpl': this.LazyLoadTpl,
            'LazyLoadFile': this.LazyLoadFile,
        }
    };
};