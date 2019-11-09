/* https://webpack.js.org/configuration 
构建性能 https://webpack.docschina.org/guides/build-performance/
*/

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const { _resolve, rootPath, isAnyEmpty } = require('./helpers')
const { join } = require("path")
const URL = require('url').URL;
const path = require('path')
const { isFunction } = require('lodash')
const HtmlWebpackPlugin = require('html-webpack-plugin');



/* ================================================================ 
basicConfig
================================================================ */
let basicConfig = {
    context: rootPath,
    watchOptions: { ignored: /node_modules/ },
    stats: 'normal',
    //for markdown-toc
    node: {
        fs: "empty"
    },
    resolve: {
        extensions: ['.vue', '.js', '.ts'],
        alias: { 'vue$': 'vue/dist/vue.runtime.esm', '@': _resolve("src"),
        'lodash':'lodash-es' 
    },
        // modules: [_resolve('node_modules')]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], { root: rootPath }),
        new ManifestPlugin(),
        /* 影响tree-skaing 所以弃用 */
        new webpack.ProvidePlugin({ platform: 'platform' }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: "analyzer-report.html",
            openAnalyzer: false,
        }),
    ]
};
// 合并basicConfig的多个片段
let assetsConfig = require('./webpack-segment/assets')
let optConfig = require('./webpack-segment/optimization')
basicConfig = merge(merge(basicConfig, assetsConfig), optConfig)

/**
 * config初始化时的hook
 * @param {*} finalConfig 配置
 * @param {*} param1 全局状态
 */
async function basicHook(finalConfig, { postTrees, playList, blogConfig: { postPublicPath, postRootPath, postRoutePrefix, postContextPath, neverCopy } }) {
    finalConfig.plugins.push(new webpack.DefinePlugin({
        // PLAY_LIST: JSON.stringify(playList),
        POST_TREES: JSON.stringify(postTrees),
        POST_ROUTE_PREFIX: JSON.stringify(postRoutePrefix)
    }))
    //如果博文与asstes挂载在相同的路径,则将其拷贝到输出路径(dist)
    if (postPublicPath == finalConfig.output.publicPath && neverCopy !== true) {
        finalConfig.plugins.push(
            new CopyPlugin([
                { from: postRootPath, to: join(finalConfig.output.path, postContextPath) },
            ]),
        )
    }

    finalConfig.plugins.push(
        new HtmlWebpackPlugin({
            template: _resolve("src/index.html"),
            filename: `index.html`,
            chunks: ['main', 'vendors', 'default', 'async_common', 'initial_common', 'runtime','ui','lodash-es'],
            favicon: _resolve("public/favicon.ico"),
            templateParameters: {
                publicPath: finalConfig.output.publicPath
            }
        })
    )
}



/* ================================================================ 
合并其他环境配置
================================================================ */

const initStorerage = require('./build-storage')
/*每个环境都会传入其配置给此方法,此方法合并所有配置后再返回Promise给webpack.*/
module.exports = async function (profileConfig, configInitializedHook) {
    //合并其他环境的配置
    let finalConfig = merge(basicConfig, profileConfig || {})

    //加载全局数据
    let storerage = await initStorerage(finalConfig)

    /**
     * 在config初始化好后,调用这个hook,并传入最终config和全局状态.
     * 这是最后一次修改config的机会.
     * 
     * Q:什么时候需要使用?
     * A:
     *  1. 需要其他环境的配置的配置的时候, 比如: publicPath只会存在于各环境的配置中,但是basicConfig中有时候需要用.
     *  2. 需要全局状态的时候
     */
    //基础环境的hook
    basicHook(finalConfig, storerage)
    //其他环境的hook
    if (configInitializedHook)
        await configInitializedHook(finalConfig, storerage)

    return finalConfig;
}

