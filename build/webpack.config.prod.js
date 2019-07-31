
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

const TerserPlugin = require('terser-webpack-plugin');
const { _resolve ,setPages} = require('./helpers')

var config = merge(baseConfig, {
    mode: 'production',
    output: {
        // publicPath: _resolve("dist/"),
        /* 一定要以/结尾!!! */
        publicPath:"https://gc.light0x00.com/",
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
    // devtool: 'eval-source-map',
    plugins: [
        new webpack.DefinePlugin(
            {
                'process.env.NODE_ENV': JSON.stringify('production'),
                PROFILE: JSON.stringify("prod")
            }
        )
    ]
})

setPages(config, {
    // templateParameters: { "vendors_dll_path": "vendors_dll.js" }
})

module.exports = config
