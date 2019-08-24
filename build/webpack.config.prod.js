
const webpack = require('webpack');
const basicConfigFn = require('./webpack.config.js');

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const EmitSitemapPlugin = require('./emit-sitemap-plugin')
const { _resolve, rootPath } = require('./helpers')
const URL = require('url').URL


var config = {
    mode: 'production',
    output: {
        // publicPath: _resolve("dist/"),
        publicPath: "https://blog.light0x00.com/",
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
                // 'process.env.NODE_ENV': JSON.stringify('production'),
                PROFILE: JSON.stringify("prod")
            }
        ),
        new CopyPlugin([
            // { from: _resolve('public/sitemap.xml'), to: 'sitemap.xml' },
            { from: _resolve('public/robots.txt'), to: 'robots.txt' },
            { from: _resolve('public/CNAME'), to: '' },
            // { from: _resolve('public/'), to: '' },
        ])
    ]
}

const getPrenderPlugin = require("./webpack-segment/prender")

module.exports = async function () {
    return basicConfigFn(config,
        //config initialized hook
        (finalConfig, storage) => {
            let publicPath = finalConfig.output.publicPath
            let routePathList = Object.keys(storage.preRenderData);
            //prender
            let prenderPluin = getPrenderPlugin(storage.preRenderData)
            finalConfig.plugins.push(prenderPluin)

            //generate sitemap.xml
            let urlset = routePathList.map(routePath => new URL(routePath, publicPath).href)
            finalConfig.plugins.push(new EmitSitemapPlugin({
                urlset,
                originXmlPath:_resolve('public/sitemap.xml'),
                originTxtPath:_resolve('public/sitemap.txt')
            }))
        })
}
