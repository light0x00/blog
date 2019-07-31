const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');

const { _resolve } = require('./helpers')

var config = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    output: {
        publicPath: _resolve("dist/"),
    },
    optimization:{
        sideEffects: true
    },  
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            PROFILE: JSON.stringify("dev"),
        }),
    ]
})



module.exports = config




