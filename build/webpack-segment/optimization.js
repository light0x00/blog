module.exports = {
    optimization: {
        /* webpack runtime独立打包 */
        // runtimeChunk: {
        //     name: entrypoint => 'runtime'
        // },
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
                /* 迫不得已的举措,本来由于lodash使用node模块标准,不支持tree-shaking,所以此项目是使用lodash-es的.
                但是第三方库mermaid、cheerio都依赖了lodash, 而这两个库是异步加载的,需要手动把共享的lodash抽成一个单独的chunk.*/
                lodash:{
                    test: /[\\/]node_modules[\\/]lodash-es[\\/]/,
                    name: 'lodash-es',
                    priority: 20,
                },
                // aplayer:{
                //     test: /[\\/]node_modules[\\/]aplayer[\\/]/,
                //     name: 'aplayer',
                //     priority: 20,
                // },
                /* ui库单独打包 */
                element_ui: {
                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
                    name: 'ui',
                    priority: 20,
                },
                /* 同步第三方库 */
                vendors: {
                    chunks: 'initial',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 17,
                    name: "vendors",
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