const webpack = require('webpack');
const express = require('express')
const { resolve } = require('./helpers')
const { blogConfig: BLOG_CONFIG } = require("./app-config")

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	stats: 'minimal',
	output: {
		publicPath: "/",
	},
	devServer: {
		contentBase: [ resolve("public/")],
		host: 'blog-dev.light0x00.com',
		port: 4093,
		index: 'index.html',
		open: false,
		openPage: "index.html",
		historyApiFallback: true,
		hot: true,
		clientLogLevel: "info",
		proxy: {
			"/blog-api-dev": {
				"target": "http://blog-dev.light0x00.com:8081",
				"changeOrigin": true,
				"pathRewrite": {
					"^/blog-api-dev": "/blog-api"
				},
				logLevel: 'debug'
			},
			"/blog-api": {
				"target": "https://blog.light0x00.com/",
				"changeOrigin": true,
				logLevel: 'debug'
			},
		},
		/* 转发静态文件 */
		before(app) {
			app.use(BLOG_CONFIG.articleContextPath, express.static(BLOG_CONFIG.articleRootPath))
		},
		/* 构建异常时 异常信息覆盖浏览器整个屏幕 */
		overlay: {
			warnings: true,
			errors: true
		},
		watchOptions: {
			/* 当监听的文件发生改变时 延迟编译 */
			aggregateTimeout: 500,
			/* 不监听哪些文件 */
			ignored: /node_modules/
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			// 'process.env.NODE_ENV': JSON.stringify('development'),
			PROFILE: JSON.stringify("dev"),
		}),
	]
}


