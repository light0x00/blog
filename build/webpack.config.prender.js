/** https://github.com/chrisvfritz/prerender-spa-plugin */
const express = require('express')
const cheerio = require('cheerio')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const { preRenderData, blogConfig: { articleContextPath, articleRootPath } } = require("./app-config")
const { resolve } = require('./helpers')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

let routeList = Object.keys(preRenderData)

module.exports = {
	mode: 'production',
	watchOptions: { ignored: /node_modules/ },
	stats: 'normal',
	performance: { hints: false },
	entry: {
		admin: resolve("build/helpers")
	},
	output: {
	},
	plugins: [
		new PrerenderSPAPlugin({
			staticDir: resolve('dist/'),
			outputDir: resolve('dist/'),
			indexPath: resolve('dist/index.html'),
			routes: routeList,
			server: {
				contentBase: [resolve("public/"), resolve('dist/')],
				// port: 8000,
				clientLogLevel: "debug",
				/* API代理 */
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
						"target": "https://blog.light0x00.com",
						"changeOrigin": true,
					},
					/* 生成通过转发,避免预渲染过程中的接口访问跨域问题 */
					[articleContextPath]: {
						"target": "https://blog.light0x00.com",
						"changeOrigin": true
					}
				},
				/* 静态资源代理. 静态资源的预渲染访问本地 */
			},
			postProcess(renderedRoute) {
				let { title, description, keywords } = preRenderData[renderedRoute.route]
				const $ = cheerio.load(renderedRoute.html)
				$('title').text(title)
				$('meta[name=keywords]').attr('content', keywords)
				if (description == null && description != '') {
					$('meta[name=description]').remove();
				} else {
					$('meta[name=description]').attr('content', description)
				}
				renderedRoute.html = $.html()
				return renderedRoute
			},
			renderer: new Renderer({
				//用于调试
				// headless: false,
				renderAfterTime: 5000  //Wait 5s
			}),
			/* 压缩预渲染文件 */
			minify: {
				collapseBooleanAttributes: true,
				collapseWhitespace: true,
				decodeEntities: true,
				keepClosingSlash: true,
				sortAttributes: true
			}
		})
	]
};




