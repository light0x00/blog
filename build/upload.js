const { putDir } = require("./oss")
const assert = require('assert')
const _ = require('lodash')
const { BLOG_CONFIG } = require("./app-config")
const fs = require('fs')

let handlers = [
	(opts) => {
		if (opts.assets) {
			assert(!_.isEmpty(BLOG_CONFIG.assetsOssKeyPrefix) &&
				fs.existsSync(BLOG_CONFIG.assetsRootPath),
				`参数缺失! key: ${BLOG_CONFIG.assetsOssKeyPrefix}, dir: ${BLOG_CONFIG.assetsRootPath}`
			)
			putDir(BLOG_CONFIG.assetsOssKeyPrefix, BLOG_CONFIG.assetsRootPath)
		}
	},
	(opts) => {
		if (opts.articles) {
			assert(!_.isEmpty(BLOG_CONFIG.articlesOssKeyPrefix) &&
				fs.existsSync(BLOG_CONFIG.articlesRootPath),
				`参数缺失! key: ${BLOG_CONFIG.articlesOssKeyPrefix}, dir: ${BLOG_CONFIG.articlesRootPath}`
			)
			putDir(BLOG_CONFIG.articlesOssKeyPrefix, BLOG_CONFIG.articlesRootPath)
		}
	}
]

const cliOpts = require("getopts")(process.argv.slice(2), {
	alias: {
		help: "h",
		assets: undefined,
		articles: undefined,
	},
	default: {
		assets: false,
		articles: false,
	}
});
if (cliOpts.help) {
	console.log("usage: pgen [-f|--file] [-o|--output] [-p|--parser] [-l|--lang]");
	process.exit(0);
}
for (let h of handlers) {
	h(cliOpts);
}
