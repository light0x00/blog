const { resolve } = require('../helpers')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


/* 资源路径
publicPath统一设置的,因为目前没有按类型分开部署的需求) */
const assetsPath = {
    js: "static/js/[name].[hash:8].js",
    jsChunk: "static/js/[name].[contenthash:8].js",
    css: "static/css/[name].[contenthash:8].css",
    cssChunk: "static/css/[name].[contenthash:8].css",
    font: "static/font/[name].[hash:8].[ext]",
    others: "static/others/[name].[hash:8].[ext]",
}

module.exports = {
    entry: {
        main: resolve("src/main.js")
    },
    output: {
        path: resolve('dist/'),
        filename: assetsPath.js,
        chunkFilename: assetsPath.jsChunk
    },
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
            {
                // test: /\.(jsx?)|(ts)$/,
                test: /\.(jsx?)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                },
            },
            {
                test: /\.tsx?$/, exclude: /node_modules/, use: [
                    "babel-loader",
                    {
                        loader: "ts-loader",
                        options: { appendTsSuffixTo: [/\.vue$/], transpileOnly: true }
                    }
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
        new MiniCssExtractPlugin({
            filename: assetsPath.css,
            chunkFilename: assetsPath.cssChunk
        }),

    ]
}