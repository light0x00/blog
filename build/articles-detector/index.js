
const { isDir, getJson, exists,getYaml } = require('./utils')
const { resolve, join } = require("path")
const fs = require('fs')
const URL = require("url").URL
const urljoin = require('url-join');
const assert = require("assert")
const path = require('path')

/**
 * 
 * 根据文件层级结构以及描述文件,返回树状结构的文档信息
 * 
 * articlesRootPath: 文档根路径(写blog的根路径)
 * descFileName: 描述文件名称,eg: desc.json
 * articleFileName: 文档文件名称,eg: index.md
 * articlePublicPath:  文档挂载路径, url=「articlePublicPath」+「文档相对(articlesRootPath)路径」
 * articlesRoutePrefix  文档的路由前缀, 文档实际路由=路由前缀+文档key
 * key: 文档的key默认使用「文档相对于articlesRootPath路径」 ,可通过描述文件指定
 * 
 * @param {*} param0 
 */
function getArticlesTrees({ articlesRootPath, descFileName, articleFileName, articlePublicPath, articlesRoutePrefix }) {

	// assert(!isNaN(articlePreviewLength),"`articlePreviewLength` is invalid" )
	if (!path.isAbsolute(articlesRootPath))
		articlesRootPath = resolve(articlesRootPath)

    function recursivePost(treeNode, nodePath) {

        if (!isDir(nodePath)) {
            return;
        }
        //获得描述文件
        let desc;
        let descFilePath = resolve(nodePath, descFileName)
        if(descFileName.endsWith(".yaml")){
            desc = getYaml(descFilePath)
        }else if(descFileName.endsWith(".json")){
            desc = getJson(descFilePath)
        }else{
            throw new Error(`dont't support extenstion of ${descFileName},should use json or yaml`)
        }
        Object.assign(treeNode, desc);

        //article
        if (!desc.isGroup) {
            let articleFilePath = join(nodePath, articleFileName);
            if (!exists(articleFilePath)) 
                throw new Error(`can't find ${articleFileName} in ${nodePath}`)
			let articlePath = nodePath.replace(articlesRootPath, "");

			/* determine article properties */
			let title = desc.title || 'No title'
			let description = desc.description || 'No description'
			let tags = desc.tags || []
			let key = desc.key || articlePath.replace(/(^\/)|(\/$)/g, "")  
			let baseUrl = urljoin(articlePublicPath, articlePath,"/") 
			let url = urljoin(baseUrl,articleFileName)    
			let routePath = join(articlesRoutePrefix, key)  
			//时间
			let createTime, modifyTime;	
            if (desc.date) {
				createTime = new Date(desc.date).getTime()
				modifyTime = createTime
                if (isNaN(createTime))
				 	throw new Error(`Invalid date: ${desc.date},at ${join(nodePath, descFileName)}`)
            }else{
				let { mtimeMS, ctimeMs} = fs.statSync(articleFilePath)
				createTime = ctimeMs
				modifyTime = mtimeMS
			}

            Object.assign(treeNode, {
                title,
                description,
				tags,
				key,
				
                url,
                baseUrl,
				routePath,
				
                createTime,
                modifyTime,
            })
        }
        //group
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
	//遍历文档跟路径下的一级目录 得到树的集合
    let articlesTrees = []
    let treePaths = fs.readdirSync(articlesRootPath).map(p => resolve(articlesRootPath, p))
    for (let path of treePaths) {
        let tree = recursivePost({ level: 1 }, path)
        if(tree)  //忽略非文档文件,如.gitignore
            articlesTrees.push(tree)
    }
    return articlesTrees;
}

/**
 * 根据文档树,提取出文档的seo信息, 结构为:
 * {key,value}
 * 其中,key为文档的路由地址,value为文档的描述信息
 * @param {*} articlesTrees 
 */
function getPreRenderDataByTree(articlesTrees) {

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
    for (let rootNode of articlesTrees) {
        recursiveTree(rootNode,
            (post) => {
                preRenderData[post.routePath] = {
                    title: post.title,
                    description: post.description,
                    keywords: (post.tags || []).join(","),
                }
            }
        )
    }
    return preRenderData;
}

module.exports = function (BLOG_CONFIG) {
    //得到文章的结构和描述
    let articlesTrees = getArticlesTrees(BLOG_CONFIG)
    //预渲染时用的seo数据
    let preRenderData = getPreRenderDataByTree(articlesTrees)
    return { articlesTrees, preRenderData }
}
