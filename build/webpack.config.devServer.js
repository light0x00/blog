const merge = require('webpack-merge');
const basicConfigFn = require('./webpack.config.js');
const webpack = require('webpack');

const { _resolve } = require('./helpers')


const devServerConf = {

    mode: 'development',
    devtool: 'source-map',
    output: {
        // publicPath: _resolve("dist/"),
        publicPath: "http://blog-dev.light0x00.com:4092/",
    },
    devServer: {
        contentBase: [_resolve("dist/"), _resolve("public/")],
        // watchContentBase: true,
        host: 'blog-dev.light0x00.com',
        port: 4092,
        index: 'index.html',
        open: false,
        openPage: "index.html", //在浏览器打开站点的哪个页面
        hot: true,
        clientLogLevel: "info",
        /* 代理 https://github.com/chimurai/http-proxy-middleware#options */
        proxy: {

        },
        /* 构建异常时 异常信息覆盖浏览器整个屏幕 */
        overlay: {
            warnings: true,
            errors: true
        },
        watchOptions: {
            /* 当监听的文件发生改变时 延迟多久 实现一次编译过去一段时间的修改 */
            aggregateTimeout: 500,
            /* 不监听哪些文件 */
            ignored: /node_modules/
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            // 'process.env.NODE_ENV': JSON.stringify('development'),
            PROFILE: JSON.stringify("devServer"),
        }),
    ]
}



module.exports = async function() {
    return basicConfigFn(devServerConf,(finalConfig,storage)=>{
    })
}
