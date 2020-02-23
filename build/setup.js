const merge = require('webpack-merge');
const { resolve,updateVersion  } = require('./helpers')

const BUILD_MODE = process.env.BUILD_MODE;
let CONFIG = require("./webpack.config")
switch (BUILD_MODE) {
	case "dev":
		CONFIG = merge(CONFIG, require("./webpack.config.dev"))
		break;
	case "prod":
		CONFIG = merge(CONFIG, require("./webpack.config.prod"))
		break;
	default:
		throw new Error(`"${BUILD_MODE}" is invalid value for option "BUILD_MODE"`)
}

const HtmlWebpackPlugin = require('html-webpack-plugin');
CONFIG.plugins.push(
	new HtmlWebpackPlugin({
		template: resolve("src/index.html"),
		filename: `index.html`,
		chunks: ['main', 'vendors', 'default', 'async_common', 'initial_common', 'runtime', 'ui', 'lodash-es'],
		// favicon: resolve("public/favicon.ico"),
		templateParameters: {
			publicPath: CONFIG.output.publicPath,
			webpackConfig: CONFIG
		}
	}))

module.exports = CONFIG