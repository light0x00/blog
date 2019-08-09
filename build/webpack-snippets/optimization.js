module.exports = {
    optimization: {
        /* webpack runtime独立打包 */
        runtimeChunk: {
            name: entrypoint => 'runtime'
        },
        /* https://webpack.js.org/plugins/split-chunks-plugin/ */
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: 8,
            maxAsyncRequests: 5,
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            automaticNameDelimiter: "-",
            name: true,
            cacheGroups: {
                /* ui库单独打包 */
                element_ui: {
                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
                    name: 'element_ui',
                    priority: 20,
                },
                /* 同步第三方库 */
                vendors: {
                    chunks: 'initial',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 17,
                    name: "vendors",
                },
                /* 存放异步chunk之间的共享模块(webpack会自动将异步共享模块放到这个chunk) */
                async_common: {
                    chunks: 'async',
                    name: 'async_common',
                    priority: 16,
                    minChunks: 2,
                    // maxSize: 1024 * 100,
                    reuseExistingChunk: true,
                },
                /* 非第三方,非本项目的同步模块放到这个chunk,基本不可能产生这个chunk,但是这个是webpack默认的配置,为了防止潜在的坑,让其存在于此 */
                default: {
                    chunks: 'initial',
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                    name: "default"
                },
                /* 本应用的的产生的同步chunk会放到与entry同名的chunk */
            }
        }
    }
}