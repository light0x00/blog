
/* ------------------------------------------------------------------------------
预渲染 为了便于seo,将所有文档预渲染为html页面,并针对性的设置每个页面的seo相关信息
------------------------------------------------------------------------------ */

const PrerenderSPAPlugin = require('prerender-spa-plugin')
const { _resolve, rootPath } = require('../helpers')

const cheerio = require('cheerio')


module.exports = function prerenderPlugin(preRenderData) {
    let routeList = Object.keys(preRenderData)

    let prerenderPlugin = new PrerenderSPAPlugin({
        staticDir: _resolve('dist'),
        // outputDir: _resolve('dist'),
        routes: routeList,
        server: {
            // Normally a free port is autodetected, but feel free to set this if needed.
            // port: 4092,
            // proxy: [
            //     {
            //         context:["/blog-api","/article-source"],
            //         "target": "https://blog.light0x00.com/",
            //         "changeOrigin": true,
            //         logLevel: 'debug'
            //     },
            // ]
            proxy: {
                "/blog-api": {
                    "target": "https://blog.light0x00.com/",
                    "changeOrigin": true,
                    logLevel: 'debug'
                },
                "/article-source": {
                    "target": "https://blog.light0x00.com/",
                    "changeOrigin": true,
                    logLevel: 'debug'
                }
            }
        },
        postProcess(renderedRoute) {

            let { title, description, keywords } = preRenderData[renderedRoute.route]
            const $ = cheerio.load(renderedRoute.html)
            $('title').text(title)
            $('meta[name=keywords]').attr('content', keywords)
            //desctiption标签不是必须的 ,不设置时搜索引擎会找页面中匹配的部分来代替
            if (description == null && description != '') {
                $('meta[name=description]').remove();
            } else {
                $('meta[name=description]').attr('content', description)
            }
            renderedRoute.html = $.html()
            return renderedRoute
        },
        renderAfterTime: 5000  //Wait 5s
    })
    return prerenderPlugin;
}
