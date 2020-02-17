const { resolve } = require('./helpers')
const { readSync: readYamlSync } = require("node-yaml")

//1. 博客配置
let BLOG_CONFIG = readYamlSync(resolve("blog.yaml"))

//2. 根据本地文件,收集博文树结构信息
let postDetector = require("./articles-detector");
const { articleTrees, preRenderData } = postDetector(BLOG_CONFIG)
const storage = { articleTrees, preRenderData, blogConfig: BLOG_CONFIG }

console.debug(JSON.stringify(storage))

module.exports = storage