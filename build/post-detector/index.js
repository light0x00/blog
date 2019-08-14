
const { isDir, getJson, exists,getYaml } = require('./utils')
const { resolve, join } = require("path")
const fs = require('fs')
const URL = require("url").URL
const urljoin = require('url-join');


/**
 * 
 * 根据文件层级结构以及描述文件,返回树状结构的文档信息
 * 
 * rootPath: 文档根路径(写blog的根路径)
 * descFileName: 描述文件名称,eg: desc.json
 * postFileName: 文档文件名称,eg: index.md
 * publicPath:  文档挂载路径, url=「publicPath」+「文档相对(rootPath)路径」
 * routePrefix  文档的路由前缀, 文档实际路由=路由前缀+文档key
 * key: 文档的key默认使用「文档相对于rootPath路径」 ,可通过描述文件指定
 * 
 * @param {*} param0 
 */
function getPostTrees({ rootPath, descFileName, postFileName, publicPath, contextPath, routePrefix }) {
    //不做入参检查!

    function recursivePost(treeNode, nodePath) {

        if (!isDir(nodePath)) {
            return;
        }

        //获得描述文件
        let desc = null;
        let descFilePath = resolve(nodePath, descFileName)
        if(descFileName.endsWith(".yaml")){
            desc = getYaml(descFilePath)
        }else if(descFileName.endsWith(".json")){
            desc = getJson(descFilePath)
        }else{
            throw new Error(`dont't support extenstion of ${descFileName},should use json or yaml`)
        }
        Object.assign(treeNode, desc);

        //if post
        if (!desc.isGroup) {

            let postFilePath = join(nodePath, postFileName);
            if (!exists(postFilePath)) {
                throw new Error(`can't find ${postFileName} in ${nodePath}`)
            }
            let { title = "undefined", tags = [] } = desc;
            let postPath = nodePath.replace(rootPath, "");
            let postKey = desc.key || postPath.replace(/(^\/)|(\/$)/g, "")  //文档key
            let routePath = join(routePrefix, postKey)  //路由
            let baseUrl = urljoin(publicPath,contextPath, postPath,"/")  //文档的的基url
            let url = urljoin(baseUrl,postFileName)    //文档的url
            let { mtimeMS: modifyTime, ctimeMs: createTime } = fs.statSync(postFilePath)
            if (desc.date) {
                let time = new Date(desc.date).getTime()
                if (isNaN(time))
                    throw new Error(`Invalid date: ${desc.date},at ${join(nodePath, descFileName)}`)
                createTime = time
            }
            
            Object.assign(treeNode, {
                key: postKey,
                url,
                routePath,
                title,
                tags,
                createTime,
                modifyTime,
                description: desc.description,
                baseUrl
            })
        }
        //postGroup
        else {
            let subPaths = fs.readdirSync(nodePath).map(p => resolve(nodePath, p))

            for (let path of subPaths) {
                let isDir = fs.statSync(path).isDirectory()
                if (isDir) {
                    treeNode.childs = treeNode.childs || []
                    treeNode.childs.push(recursivePost({ level: treeNode.level + 1 }, path))
                }
            }
        }
        return treeNode;
    }

    let postTrees = []
    let treePaths = fs.readdirSync(rootPath).map(p => resolve(rootPath, p))
    for (let path of treePaths) {
        let tree = recursivePost({ level: 1 }, path)
        if(tree)  //忽略非文档文件,如.gitignore
            postTrees.push(tree)
    }
    return postTrees;
}

/**
 * 根据文档树,提取出文档的seo信息, 结构为:
 * {key,value}
 * 其中,key为文档的路由地址,value为文档的描述信息
 * @param {*} postTrees 
 */
function getPreRenderDataByTree(postTrees) {

    function recursiveTree(treeNode, callback) {
        if (treeNode.isGroup) {
            for (let child of treeNode.childs) {
                recursiveTree(child, callback)
            }
        } else {
            callback(treeNode)
        }
    }

    let preRenderData = {}
    for (let rootNode of postTrees) {
        recursiveTree(rootNode,
            (post) => {
                preRenderData[post.routePath] = {
                    title: post.title,
                    description: post.description, //如果为空,则不设置.
                    keywords: (post.tags || []).join(","),
                }
            }
        )
    }
    return preRenderData;
}

/**
 * publicPath
 * contextPath
 * routePrefix
 * rootPath     
 */
module.exports = function ({ descFileName = "desc.yaml", postFileName = "index.md", postPublicPath, postContextPath, postRoutePrefix, postRootPath }) {
    postPublicPath = postPublicPath || "/"

    //得到文章的结构和描述
    let postTrees = getPostTrees({
        publicPath: postPublicPath,
        contextPath: postContextPath,
        rootPath: postRootPath,
        routePrefix: postRoutePrefix,
        descFileName,
        postFileName,
    })
    //预渲染时用的seo数据
    let preRenderData = getPreRenderDataByTree(postTrees)
    return { postTrees, preRenderData }
}
