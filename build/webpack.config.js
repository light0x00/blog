/* https://webpack.js.org/configuration */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyPlugin = require('copy-webpack-plugin');

let detector = require("./detector")
/* 工具 */
const { _resolve, rootPath } = require('./helpers')

const assetsPath = {
    js: "static/js/[name].[hash:4].js",
    jsChunk: "static/js/[name].[contenthash:8].js",
    css: "static/css/[name].[contenthash:8].css",
    cssChunk: "static/css/[name].[contenthash:8].css",
    font: "static/font/[name].[hash:4].[ext]",
    others: "static/others/[name].[hash:4].[ext]",
}

let pages = {
    index: new HtmlWebpackPlugin({
        template: _resolve("src/index.html"),
        filename: `index.html`,
        chunks: ['main', 'vendors', 'default', 'async_common', 'initial_common', 'runtime', 'element_ui'],
        favicon: _resolve("public/favicon.ico")
    })
}


console.log(_resolve("src/main.js"))

const config = {
    context: rootPath,
    watchOptions: { ignored: /node_modules/ },
    stats: 'normal',
    // performance: { hints: false },
    entry: {
        main: _resolve("src/main.js")
    },
    output: {
        path: _resolve('dist/'),
        filename: assetsPath.js,
        chunkFilename: assetsPath.jsChunk
    },
    resolve: {
        extensions: ['.vue', '.js', '.ts'],
        alias: {
            /* 1.不应该使用附带编译器版本的vue 因为vue-loader会在构建阶段使用编译器把单文件组模版转换为js (需要注意 根实例改为使用render)
               2.vue.runtime.esm.js来代替默认的vue.runtime.common.js , 这样方便webpack做tree-shaking */
            'vue$': 'vue/dist/vue.runtime.esm',
            '@': _resolve("src"),
        },
        /* 指定webpack寻找模块的路径 */
        modules: ['node_modules']
    },
    optimization: {
        // /* webpack runtime独立打包 */
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
                    // chunks: 'async',
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
                    // maxSize: 1024 * 100,
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
    ,
    module: {
        rules: [
            /* style */
            {
                test: /\.css$/, use: [
                    { loader: "style-loader" },
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: "sass-loader" }
                ]
            },
            /* script */
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            //暂时用webpack自带的js loader
            {
                test: /(\.jsx?)$/,
                /* 原本打算用babel-loader来处理ts文件,但是其不能识别vue文件中的ts块,故弃用.官方不打算支持「appendTsSuffixTo」 👉 https://github.com/babel/babel-loader/pull/738  */
                // test: /(\.jsx?)|(\.ts)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                },
            },
            {
                test: /\.tsx?$/, exclude: /node_modules/, use: [
                    { loader: "ts-loader", options: { appendTsSuffixTo: [/\.vue$/], transpileOnly: true } }
                ]
            },
            /* assets */
            {
                test: /\.(png|jpg|gif|jpeg|md)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: assetsPath.others }
                    }
                ]
            },
            {
                test: /\.(svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: assetsPath.others }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: { name: assetsPath.font }
                }]
            },
        ]
    },
    plugins: [
        /* 这个插件是必须的！ 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
            例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。*/
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(['dist'], { root: rootPath }),
        new ManifestPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        /* 影响tree-skaing 所以弃用 */
        // new webpack.ProvidePlugin({_: 'lodash-es' }),
        new MiniCssExtractPlugin({
            filename: assetsPath.css,
            chunkFilename: assetsPath.cssChunk
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: "analyzer-report.html",
            openAnalyzer: false,
        }),
        new CopyPlugin([
            { from: 'public/posts/', to: 'posts/' },
        ])
        ,
        pages.index
    ]
};


let music = require(_resolve("build/music.js"))

module.exports = async function(){

    let playList = await music

    config.plugins.push(
        new webpack.DefinePlugin({
            POST_TREES: detector({
                contextPath: "posts",
                postRootPath: _resolve("public/posts"),
            }),
            PLAY_LIST: JSON.stringify(playList)
        })
    )
    return config;
}()


