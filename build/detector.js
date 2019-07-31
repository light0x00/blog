
const fs = require('fs'),
    { resolve, join } = require('path')

function getJson(path) {
    let exists = fs.existsSync(path)
    if (!exists) {
        throw new Error(`不存在的文件:${path}`)
    }
    let file = fs.readFileSync(path, 'utf-8')
    return JSON.parse(file)
}

const isDir = (path) => path && fs.statSync(path).isDirectory()


function getPostTrees(postRootPath) {

    function recursivePost(treeNode) {

        let nodePath = treeNode.path;

        if (!isDir(nodePath)) {
            return;
        }

        //获得描述文件
        let desc = null;
        try {
            desc = getJson(resolve(nodePath, "desc.json"))
            Object.assign(treeNode, desc);
        } catch (e) {
            throw new Error(`${nodePath}下没有找到desc.json`)
        }

        //if post
        if (!desc.isGroup) {
            //获得组件
            let postCompFullPath = resolve(nodePath, 'index.vue')
            if (!fs.existsSync(postCompFullPath)) {
                throw new Error(`${nodePath}被声明为Post组件,但没有找到index.vue`)
            }

            let routePath = join("/posts", nodePath.replace(postRootPath, "")); //组件路由
            let compPath = join("@/posts/", postCompFullPath.replace(postRootPath, ""))   //组件导入路径

            Object.assign(treeNode, {
                compPath: compPath,
                routePath: desc.routePath || routePath, //路由路径如未指定则以路径为准
            })
        }
        //postGroup
        else {

            let subPaths = fs.readdirSync(nodePath).map(p => resolve(nodePath, p))
            for (let path of subPaths) {
                let isDir = fs.statSync(path).isDirectory()
                if (isDir) {
                    treeNode.childs = treeNode.childs || []
                    treeNode.childs.push(recursivePost({ path, level: treeNode.level + 1 }))
                }
            }
        }
        return treeNode;
    }

    let postTrees = []
    let treePaths = fs.readdirSync(postRootPath).map(p => resolve(postRootPath, p))
    for (let path of treePaths) {
        postTrees.push(recursivePost({ path, level: 1 }))
    }
    return postTrees;
}



/**
* 根据PostTreeList 返回所有Post的路由的字符串
* @param {} posts 
*/
function getPostRoutesCode(postTrees) {

    let postRoutes = ""

    function transformTreeToRoutes(treeNode) {
        if (treeNode.isGroup) {
            for (let childNode of treeNode.childs) {
                transformTreeToRoutes(childNode)
            }
        } else {
            postRoutes += `{
                path : "${treeNode.routePath}",
                component: ()=>import("${treeNode.compPath}"),
                meta: {
                    title: "${treeNode.title}"
                }
            },`
        }
    }
    for (let tree of postTrees) {
        transformTreeToRoutes(tree, true)
    }
    return postRoutes;
}


let postTrees = getPostTrees("/Users/light/Desktop/my-workbench/blog/src/posts")
let postRoutesCode = getPostRoutesCode(postTrees)

console.log(JSON.stringify(postTrees))
console.log(postRoutesCode)

module.exports = {
    PostRoutesCode: postRoutesCode,
    PostTrees: postTrees
}