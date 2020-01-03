const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');
const { resolve, rootPath } = require('./helpers')
const { articleTrees, blogConfig: { articleRoutePrefix } } = require('./app-config')

module.exports = merge({
	context: rootPath,
	watchOptions: { ignored: /node_modules/ },
	stats: 'normal',
	//for markdown-toc
	node: {
		fs: "empty"
	},
	resolve: {
		extensions: ['.vue', '.js', '.ts'],
		alias: {
			'vue$': 'vue/dist/vue.runtime.esm', '@': resolve("src"),
			'lodash': 'lodash-es'
		},
	},
	plugins: [
		// new CleanWebpackPlugin(['dist'], { root: rootPath }),
		new ManifestPlugin(),
		/* 全局导入的库无法tree-shaking,慎重使用 */
		new webpack.ProvidePlugin({ platform: 'platform' }),
		new BundleAnalyzerPlugin({
			analyzerMode: "static",
			reportFilename: "analyzer-report.html",
			openAnalyzer: false,
		}),
		new webpack.DefinePlugin({
			POST_TREES: JSON.stringify(articleTrees),
			POST_ROUTE_PREFIX: JSON.stringify(articleRoutePrefix)
		}),
	]
}, require('./webpack-segments/assets'),require('./webpack-segments/optimization'))
