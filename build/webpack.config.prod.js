
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const { _resolve, rootPath } = require('./helpers')

var config = {
    mode: 'production',
    output: {
        // publicPath: _resolve("dist/"),
        /* 一定要以/结尾!!! */
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
        ],
    },
    plugins: [
        new webpack.DefinePlugin(
            {
                'process.env.NODE_ENV': JSON.stringify('production'),
                PROFILE: JSON.stringify("prod")
            }
        ),
        new CopyPlugin([
            { from: _resolve('public/seo/sitemap.xml'), to: 'sitemap.xml' },
            { from: _resolve('public/seo/robots.txt'), to: 'robots.txt' },
            { from: _resolve('public/CNAME'), to: '' },
            { from: _resolve('public/pages'), to: '' },
        ])
    ]
}


module.exports = async function () {
    return merge(await baseConfig, config)
}
