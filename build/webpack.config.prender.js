/* https://webpack.js.org/configuration */



const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const IS_DEV_MODE = process.env.NODE_ENV === 'development';
const { _resolve, rootPath } = require('./helpers')
const merge = require('webpack-merge');


//----------------------------------- 

const config = {
    mode: 'production',
    watchOptions: { ignored: /node_modules/ },
    stats: 'normal',
    performance: { hints: false },
    entry: {
        // admin: _resolve("src/main2.js")
    },
    output: {
        // path: _resolve('dist/'),
        publicPath: "/",
    },
    resolve: {

    },
    plugins: [

    ]
};


const getPrenderPlugin = require("./webpack-segment/prender")
const {preRenderData} = require('./build-storage-new')

console.log(preRenderData)

let prenderPluin = getPrenderPlugin(preRenderData)
config.plugins.push(prenderPluin)

module.exports = config
    
   

