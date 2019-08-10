
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const { _resolve, rootPath } = require('../helpers')

const cheerio = require('cheerio')


module.exports = function prerenderPlugin(preRenderData) {
    /* 预渲染
    为了便于seo,将所有文档预渲染为html页面,并针对性的设置每个页面的seo相关信息 */
    let routeList = Object.keys(preRenderData)

    let prerenderPlugin = new PrerenderSPAPlugin({
        staticDir: _resolve('dist'),
        // outputDir: _resolve('dist'),
        routes: routeList,
        postProcess(renderedRoute) {

            let {title,description,keywords} = preRenderData[renderedRoute.route]
            const $ = cheerio.load( renderedRoute.html)
            $('title').text(title)
            $('meta[name=keywords]').attr('content',keywords)
            //desctiption标签不是必须的 ,不设置时搜索引擎会找页面中匹配的部分来代替
            if(description==null&&description!=''){
                $('meta[name=description]').remove();
            }else{
                $('meta[name=description]').attr('content',description)
            }
            renderedRoute.html=$.html()
            return renderedRoute
        },
    })
    return prerenderPlugin;
}
