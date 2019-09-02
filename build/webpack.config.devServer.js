const merge = require('webpack-merge');
const basicConfigFn = require('./webpack.config.js');
const webpack = require('webpack');
const express = require('express')
const { _resolve } = require('./helpers')

const { readSync: readYamlSync } = require("node-yaml")
const BlogConfig = readYamlSync(_resolve('blog.yaml'))

const devServerConf = {

    mode: 'development',
    devtool: 'inline-source-map',
    stats: 'minimal',
    // stats: 'errors-warnings',
    output: {
        publicPath: "http://blog-dev.light0x00.com:4092/",
    },
    devServer: {
        contentBase: [_resolve("dist/"), _resolve("public/")],
        // watchContentBase: true,
        host: 'blog-dev.light0x00.com',
        port: 4092,
        index: 'index.html',
        open: false,
        openPage: "index.html",
        historyApiFallback: true,
        hot: true,
        clientLogLevel: "info",
        // https:true,
        proxy: {
            "/blog-api-dev": {
                // "target": "https://blog.light0x00.com/blog-api",
                "target": "http://blog-dev.light0x00.com:8081",
                "changeOrigin": true,
                "pathRewrite": {
                    "^/blog-api-dev": "/blog\-api"
                },
                logLevel: 'debug'
            },
            "/blog-api-prod": {
                "target": "https://blog.light0x00.com/",
                // "target": "http://blog-dev.light0x00.com:8081/blog-api",
                "changeOrigin": true,
                "pathRewrite": {
                    "^/blog-api-prod": "/blog\-api"
                },
                logLevel: 'debug'
            },
        },
        before(app) {
            app.use(BlogConfig.postContextPath, express.static(_resolve(BlogConfig.postRootPath)))
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
            'process.env.NODE_ENV': JSON.stringify('development'),
            PROFILE: JSON.stringify("devServer"),
        }),
    ]
}



module.exports = async function () {
    return basicConfigFn(devServerConf, (finalConfig, storage) => {
        //博客文件请求直接转发到线上服务器
        // Object.assign(finalConfig.devServer.proxy, {
        //     [storage.blogConfig.postContextPath]: {
        //         "target": "https://blog.light0x00.com/",
        //         "changeOrigin": true,
        //     }
        // })

    })

}
