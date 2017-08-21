# teaMall
ionic+webpack前端架构开发的H5网页

启动说明：

建议先安装淘宝npm镜像cnpm，安装依赖速度快，不容易丢失文件： npm install -g cnpm --registry=https://registry.npm.taobao.org
安装依赖： cnpm install
启动运行项目： cnpm run test
打包项目文件： cnpm run pack-test
项目配置规范

pageSize统一设置为10
项目问题备注：

除了幻灯片slide部分以及需要根据屏幕大小变化自动伸缩图片的需求在写html时，其他图片基本为数据接口中获取的图片，无特殊情况就以背景图background的形式写到html标签的行内样式中，对于页面中的图标尽量制作成字体图标保持统一；
ionic做H5时应当去掉头部，使用移动端浏览器自带的返回等功能，如果是封装成app使用ionic自带的头部为好；
在html页面内使用必须放到里面，否则会导致$ionicView事件无效；
使用ion-slide-box滑动框时，由于需要用到ngRepeat调用接口渲染而产生延迟，会导致该功能的高度判断为0，不能正常显示，解决办法：在ion-slide-box标签上添加ng-if="indexSlides.length"，解决不能循环播放，并在获取到数据后调用$ionicSlideBoxDelegate.update()方法更新滑动框；
