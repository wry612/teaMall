/*
需要全局调用的打包入口文件
*/

require('../css/global'); //全局样式
require('../css/fonts'); //字体图标

require('../libs/oclazyload/1.0.10/ocLazyLoad.min'); //懒加载库

/*app总模块*/
require('../js/apps/app');
require('../js/apps/app.provider');
require('../js/apps/app.service');
require('../js/apps/appGeneralMethod')(window);//跟原生交互的js
require('../js/directives/app.directive');


/*home路由*/
require('../js/routes/home.route');
