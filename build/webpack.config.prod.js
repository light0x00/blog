
const webpack = require('webpack');
const basicConfigFn = require('./webpack.config.js');

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const EmitSitemapPlugin = require('./emit-sitemap-plugin')
const { _resolve, rootPath } = require('./helpers')
const URL = require('url').URL

/* 构建期间,预渲染时会请求「文章源文件」,所以必须先发布文章,保证可访问性,后编译生产 */

const DOMAIN = "https://blog.light0x00.com/"

var config = {
    mode: 'production',
    output: {
        publicPath: "/",  
        // publicPath: "/", 
        // publicPath: "http://blog-dev.light0x00.com:4092/",
    },
    // devtool: 'hidden-source-map',
    devtool: false,
    optimization: {
        sideEffects: true,
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        /* 是否删除日志 */
                        drop_console: false,
                    },
                    output: {
                        /* (default false) true or "all" to preserve all comments,"some" to preserve some comments, a regular expression string (e.g. /^!/) or a function.  */
                        comments: false,
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    plugins: [
        new webpack.DefinePlugin(
            {
                PROFILE: JSON.stringify("prod")
            }
        ),
        new CopyPlugin([
            { from: _resolve('public/robots.txt'), to: 'robots.txt' },
            { from: _resolve('public/CNAME'), to: '' },
        ])
    ]
}

const getPrenderPlugin = require("./webpack-segment/prender")

module.exports = async function () {
    return basicConfigFn(config,
        //config initialized hook
        (finalConfig, storage) => {
            // let publicPath = finalConfig.output.publicPath
            let routePathList = Object.keys(storage.preRenderData);
            //prender
            let prenderPluin = getPrenderPlugin(storage.preRenderData)
            finalConfig.plugins.push(prenderPluin)

            //generate sitemap.xml
            let urlset = routePathList.map(routePath => new URL(routePath, DOMAIN).href)
            finalConfig.plugins.push(new EmitSitemapPlugin({
                urlset,
                originXmlPath:_resolve('public/sitemap.xml'),
                originTxtPath:_resolve('public/sitemap.txt')
            }))
        })
}
