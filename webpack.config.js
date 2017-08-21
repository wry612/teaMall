'use strict';
//依赖模块
var path = require('path');
var glob = require('globule');
var webpack = require('webpack');
var validate = require('webpack-validator');
var CleanWebpackPlugin = require('clean-webpack-plugin'); //清空发布目录
var HtmlWebpackPlugin = require('html-webpack-plugin'); //html文件处理
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css文件处理

//是否压缩
var compress = true;
//定义配置对象
var config = {};

//打包文件输出的根目录
var outRoot = 'app';

//entry 打包的入口文件
config.entry = {
    global: './'+outRoot+'/build/globalEntry.js' //全局调用打包入口文件
};

//搜索所有模块的ctrl生成打包序列
var entryArray = glob.find('./'+outRoot+'/js/modules/*/*/entry.js');
for (var i = 0; i < entryArray.length; i++) {
    var p = entryArray[i], //获取路径
        n = p.substring(p.lastIndexOf('/', p.lastIndexOf('/') - 1) + 1, p.lastIndexOf('/')); //获取文件名
    config.entry[n] = p;
};

//output 输出文件的位置及名字
config.output = {
    path: path.resolve(__dirname, ''+outRoot+'/dist'), //输出目录
    publicPath: '/'+outRoot+'/dist/',
    filename: 'js/[name].min.js' //文件名称
};

//resolve 可省略不写的后缀名
config.resolve = {
    extensions: ['', '.js', '.css', '.scss', '.ejs', '.png', '.jpg', '.html']
};

//resolveLoader 指定默认的loader路径，否则依赖走到上游会找不到loader
config.resolveLoader = {
    root: path.resolve(__dirname, 'node_modules')
};

//module 模块加载器
config.module = {
    loaders: [
        //可将文件作为字符串导入
        {
            test: /\.html$/,
            loader: 'raw-loader'
        },

        //图片文件使用 url-loader 来处理，小于30kb的直接转为base64
        {
            test: /\.(png|gif|jpe?g)$/,
            loader: 'url-loader',
            query: {
                limit: 30000,
                name: 'img/[name].[ext]'
            }
        },

        //字体文件加载器
        {
            test: /\.(eot|woff|woff2|ttf|svg).*$/,
            loader: 'url-loader',
            query: {
                //字体文件小于30kb的采用内联形式
                limit: 30000,
                name: 'fonts/[name].[ext]'
            }
        },

        //.css 文件使用 style-loader、css-loader 和 postcss-loader 来编译处理
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader') },

        //使用babel插件对js进行转码
        { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    ]
};

//plugins 插件配置
config.plugins = [
    //清理目录
    new CleanWebpackPlugin(['/'+outRoot+'/dist/'], {
        root: '',
        verbose: true,
        dry: false
    }),
    //查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
    new webpack.optimize.DedupePlugin(),

    //入口文件优化
    new webpack.optimize.OccurenceOrderPlugin(),

    //抽取css
    new ExtractTextPlugin('css/[name].min.css', { allChunks: true }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"'+process.env.NODE_ENV+'"'
        }
    })
    
];

if(compress){
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$super', '$', 'exports', 'require', 'module', '_']
            },
            compress: {
                warnings: false
            },
            output: {
                comments: false,
            }
        })
    )
}

//搜索页面tpl生成序列并压缩
var tplArray = glob.find('./'+outRoot+'/js/modules/*/*/*.tpl.html');
for (var i = 0; i < tplArray.length; i++) {
    var p = tplArray[i],
        lastOneIndex = p.lastIndexOf('/'), //获取倒数第1个'/'索引
        lastTwoIndex = p.lastIndexOf('/', lastOneIndex - 1), //获取倒数第2个'/'索引
        lastThreeIndex = p.lastIndexOf('/', lastTwoIndex - 1), //获取倒数第3个'/'索引
        pageName = p.substring(lastTwoIndex + 1, lastOneIndex), //获取页面名字
        moduleName = p.substring(lastThreeIndex + 1, lastTwoIndex); //获取模块名字
    config.plugins.push(
        new HtmlWebpackPlugin({
            minify: { //压缩html
                removeComments: true,
                collapseWhitespace: true
            },
            template: __dirname + '/'+outRoot+'/js/modules/' + moduleName + '/' + pageName + '/' + pageName + '.tpl.html',
            filename: 'tpl/' + pageName + '.min.html'
        })
    );
};

//服务器配置相关
config.devServer = {
    host : 'localhost',
    //host : '172.18.11.178',
    port : 8082,
    hot : false,//代码热替换
    inline: true//设置为true，当源文件改变时会自动刷新页面
}

module.exports = validate(config);
