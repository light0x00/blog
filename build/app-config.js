const { getVersion } = require('./helpers')
const urljoin = require('url-join');
const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '../')

//1. 配置
let BLOG_CONFIG = {
	version : getVersion(),
	articlesRoutePrefix: '/articles',
	descFileName: 'desc.yaml',
	articleFileName: 'index.md',
	assetsRootPath: path.resolve(ROOT_PATH, "dist/static/"),
	articlesRootPath: path.resolve(ROOT_PATH, "articles/")
}

const BUILD_MODE = process.env.BUILD_MODE
switch (BUILD_MODE) {
	case "dev":
		BLOG_CONFIG.publicPath = '/'
		BLOG_CONFIG.articlePublicPath = '/article-source'
		BLOG_CONFIG.articlePathPrefix = '/article-source'	
		BLOG_CONFIG.asstesPublicPath = "/"
		break;
	case "prod":
		BLOG_CONFIG.publicPath = 'https://blog.light0x00.com/'

		BLOG_CONFIG.articlesOssKeyPrefix = `/blog-ui/${BLOG_CONFIG.version}/articles/`
		BLOG_CONFIG.articlePublicPath = urljoin(`https://light0x01.oss-cn-shanghai.aliyuncs.com/`, BLOG_CONFIG.articlesOssKeyPrefix)

		BLOG_CONFIG.assetsOssKeyPrefix = `/blog-ui/${BLOG_CONFIG.version}/static/`
		BLOG_CONFIG.asstesPublicPath = `https://light0x01.oss-cn-shanghai.aliyuncs.com/blog-ui/${BLOG_CONFIG.version}/`

		break;
	default:
		throw new Error(`"${BUILD_MODE}" is invalid value for option "mode"`)
}

//2. 根据本地文件,收集博文树结构信息
const { articlesTrees, preRenderData } = require("./articles-detector")(BLOG_CONFIG)

BLOG_CONFIG.articlesTrees = articlesTrees;
BLOG_CONFIG.preRenderData = preRenderData;
BLOG_CONFIG.routeList = Object.keys(preRenderData)
BLOG_CONFIG.urlset = BLOG_CONFIG.routeList.map(routePath => urljoin(BLOG_CONFIG.publicPath, routePath))

module.exports = { articlesTrees, preRenderData, BLOG_CONFIG }