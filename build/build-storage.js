const { _resolve, rootPath, isAnyEmpty } = require('./helpers')
const path = require('path')
/* ================================================================
初始化全局状态,状态会在配置初始化完成后作为回调参数传给其他环境.
================================================================ */
const { readSync: readYamlSync } = require("node-yaml")
module.exports = async function initStorerage(config) {

    //1. fetch and adjust global config 
    // let { postPublicPath, postRoutePrefix, postRootPath, postContextPath,descFileName } = readYamlSync(_resolve("blog.yaml"))
    let { postPublicPath, postRoutePrefix, postRootPath, postContextPath, descFileName ,neverCopy} = readYamlSync(_resolve("blog.yaml"))

    if (!path.isAbsolute(postRootPath)) {
        postRootPath = _resolve(postRootPath)
    }
    postPublicPath = postPublicPath || config.output.publicPath;

    //2. fetch posts\ prender data
    let postDetector = require(_resolve("build/post-detector/index"))
    const { postTrees, preRenderData } = postDetector({
        postPublicPath, postContextPath, postRoutePrefix, postRootPath, descFileName
    })

    //3. fetch 163 music  
    let getMusic = require(_resolve("build/music-detector/index"))  /* the fucking async config! It makes my config less elegant 😡 */
    let playList = await getMusic
    return { postTrees, preRenderData, playList, blogConfig: { postPublicPath, postRoutePrefix, postRootPath, postContextPath,neverCopy} }
}