/** https://github.com/chrisvfritz/prerender-spa-plugin */
const cheerio = require('cheerio')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const {resolve } = require('./helpers')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer


//预渲染数据
const {BLOG_CONFIG: { preRenderData,routeList} } = require("./app-config")

module.exports = {
	mode: 'production',
	watchOptions: { ignored: /node_modules/ },
	stats: 'normal',
	performance: { hints: false },
	entry: {
		/* just for prender */
		'prender-entry': resolve("build/tmp/prender-entry")
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
				// contentBase: [resolve("public/"), resolve('dist/')],

				host:"blog-dev.light0x00.com",
				port: 4091,
				clientLogLevel: "debug",
				proxy: {
					/* API代理 */
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
				},
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
				headless: false,
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
