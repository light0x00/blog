const { resolve } = require('./helpers')
const path = require('path')
const { readSync: readYamlSync } = require("node-yaml")

//1. 博客配置
let { articlePublicPath, articleRoutePrefix, articleRootPath, articleContextPath, descFileName, neverCopy } = readYamlSync(resolve("blog.yaml"))
if (!path.isAbsolute(articleRootPath))
	articleRootPath = resolve(articleRootPath)
if (!articleRoutePrefix)
	articleRoutePrefix = "articles"
if (!articlePublicPath)
	articlePublicPath = "/"

//2. 根据本地文件,收集博文树结构信息
let postDetector = require("./articles-detector");
const { articleTrees, preRenderData } = postDetector({
	articlePublicPath, articleContextPath, articleRoutePrefix, articleRootPath, descFileName
})
const storage = { articleTrees, preRenderData, blogConfig: { articlePublicPath, articleRoutePrefix, articleRootPath, articleContextPath, neverCopy } }
console.debug(storage)
module.exports = storage