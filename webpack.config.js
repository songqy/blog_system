var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');

var babelpolyfill = require("babel-polyfill");

module.exports = {
    entry: {
        'home': ["babel-polyfill", "./js/home.js"],
        // 'admin': ["babel-polyfill", "./js/admin.js"],
        'posts_list': ["babel-polyfill", "./js/posts_list.js"],
        'modify': ["babel-polyfill", "./js/modify.js"],
        'add': ["babel-polyfill", "./js/add.js"],
        'post_detail': ["babel-polyfill", "./js/post_detail.js"],
        'user_set_up' : ["babel-polyfill","./js/user_set_up.js"]
    },
    output: {
        path: './dist/js',
        filename: '[name].js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' }, 
            {
                test: path.join(__dirname, 'js'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','stage-3']
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'vue-resource$': 'vue-resource/dist/vue-resource.common.js',
        }
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     filename : __dirname+"/views/home.html",
        //     template : __dirname+"/src/views/home.html",
        //     chunks : ['home']
        // }),
        // new HtmlWebpackPlugin({
        //     filename : __dirname+"/views/backSign.html",
        //     template : __dirname+"/src/views/backSign.html",
        //     chunks : ['backSign']
        // }),

        //生成公共代码
        new webpack.optimize.CommonsChunkPlugin('common'),
    ]
}
