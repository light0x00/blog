const basicConfigFn = require('./webpack.config.js');
const webpack = require('webpack');
const merge = require('webpack-merge');

const  {isFunction} =require('lodash')
const { _resolve } = require('./helpers')



let devConf = {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        // publicPath: _resolve("dist/"),
        publicPath: "http://blog-dev.light0x00.com:4092/",
    },
    optimization: {
        sideEffects: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            PROFILE: JSON.stringify("dev"),
        }),
    ]
}

module.exports = async (profileConfig,configInitializedHook) => {
    return basicConfigFn(merge(devConf, profileConfig || {}),
        (finalConfig,storage) => {
            //prender
            let prenderPluin = require("./webpack-segment/prender")(storage.preRenderData)
            finalConfig.plugins.push(prenderPluin)

            //将hook的触发传递给下层
            if(isFunction(configInitializedHook))
                configInitializedHook(finalConfig,storage)
        }
    );
}



