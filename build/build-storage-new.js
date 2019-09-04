const { _resolve, rootPath, isAnyEmpty } = require('./helpers')
const path = require('path')
const { readSync: readYamlSync } = require("node-yaml")



let blogConfig = readYamlSync(_resolve("blog.yaml"))

if (!path.isAbsolute(blogConfig.postRootPath)) {
    blogConfig.postRootPath = _resolve(blogConfig.postRootPath)
}

let postDetector = require(_resolve("build/post-detector/index"))

const { postTrees, preRenderData } = postDetector({
    ...blogConfig
})

module.exports = {
    preRenderData
}