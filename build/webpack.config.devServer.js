const merge = require('webpack-merge');
const dev = require('./webpack.config.dev.js');
const webpack = require('webpack');

const { _resolve } = require('./helpers')


const devServerConf = {
    output: {
        publicPath: "http://blog-dev.light0x00.com:4092/",
    },
    devServer: {
        contentBase: [_resolve("dist/"), _resolve("dll/"), _resolve("public/")],
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
    ]
}



module.exports = async function() {
    let devConf = await dev
    let config = merge(devConf,devServerConf)
    console.log(config)
    return config
}()
