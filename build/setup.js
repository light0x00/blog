const merge = require('webpack-merge');
const { resolve } = require('./helpers')
const assert = require('assert');

let BUILD_MODE = process.env.BUILD_MODE;
let CONFIG = require("./webpack.config")
assert(BUILD_MODE != undefined, `The option "mode" is required for build`)
switch (BUILD_MODE) {
	case "dev":
		CONFIG =merge(CONFIG, require("./webpack.config.dev"))
		break;
	case "prod":
		CONFIG =merge(CONFIG, require("./webpack.config.prod"))
		break;
	default:
		throw new Error(`"${BUILD_MODE}" is invalid value for option "mode"`)
}

const HtmlWebpackPlugin = require('html-webpack-plugin');
CONFIG.plugins.push(
	new HtmlWebpackPlugin({
		template: resolve( "src/index.html"),
		filename: `index.html`,
		chunks: ['main', 'vendors', 'default', 'async_common', 'initial_common', 'runtime', 'ui', 'lodash-es'],
		favicon: resolve( "public/favicon.ico"),
		templateParameters: {
			publicPath: CONFIG.output.publicPath,
			webpackConfig: CONFIG
		}
	}))

module.exports = CONFIG