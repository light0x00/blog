
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const EmitSitemapPlugin = require('./emit-sitemap-plugin')
const URL = require('url').URL
const { resolve ,rootPath} = require('./helpers')
const { preRenderData } = require('./app-config')

/*  */
const DOMAIN = "https://blog.light0x00.com/"

let routePathList = Object.keys(preRenderData);
let urlset = routePathList.map(routePath => new URL(routePath, DOMAIN).href)

module.exports = {
	mode: 'production',
	output: {
		publicPath: "/",
	},
	// devtool: 'hidden-source-map',
	// devtool: 'inline-source-map',
	devtool: false,
	optimization: {
		sideEffects: true, /* 表示是否启用tree-shaking特性 */
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
		    new OptimizeCSSAssetsPlugin({})
		],
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], { root: rootPath }),
		new webpack.DefinePlugin(
			{
				PROFILE: JSON.stringify("prod")
			}
		),
		new CopyPlugin([
			{ from: resolve('public/robots.txt'), to: 'robots.txt' },
			{ from: resolve('public/CNAME'), to: '' },
		]),
		new EmitSitemapPlugin({
			urlset,
			originXmlPath: resolve('public/sitemap.xml'),
			originTxtPath: resolve('public/sitemap.txt')
		})
	]
}
