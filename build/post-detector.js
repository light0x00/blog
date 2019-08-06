// const descFileName = "desc.json"
// const publicPath = "https://blog.light0x00.com/"
// const contextPath = "posts"
// const postRootPath = "/Users/light/Desktop/my-workbench/blog/public/posts"

/* 工具 */
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

const exists = (path) => fs.existsSync(path)


module.exports = function ({ publicPath, contextPath, postRootPath }) {
    publicPath = publicPath || "/"
    const descFileName = "desc.json"
    const postFileName = "index.md"
    /* 得到文章的结构和描述 */
    function getPostTrees(postRootPath) {

        function recursivePost(treeNode, nodePath) {

            if (!isDir(nodePath)) {
                return;
            }

            //获得描述文件
            let desc = null;
            try {
                desc = getJson(resolve(nodePath, descFileName))
                Object.assign(treeNode, desc);
            } catch (e) {
                throw new Error(`can't find ${descFileName} in ${nodePath}`)
            }

            //if post
            if (!desc.isGroup) {

                let postFilePath = join(nodePath, postFileName);
                if (!exists(postFilePath)) {
                    throw new Error(`can't find ${postFileName} in ${nodePath}`)
                }
                let {title="undefined",tags=[]} = desc;
                let postPath = nodePath.replace(postRootPath, "");
                let postKey = desc.key || postPath.replace(/^\//, "")
                let url = join(publicPath, contextPath, postPath, postFileName)
                let { mtimeMS: modifyTime, ctimeMs: createTime } = fs.statSync(postFilePath)
                if(desc.date){
                    let time = new Date(desc.date).getTime()
                    if(isNaN(time))
                        throw new Error(`Invalid date: ${desc.date},at ${join(nodePath,descFileName)}`)
                    createTime = time
                }

                Object.assign(treeNode, {
                    url: url,
                    key: postKey,
                    title,
                    tags,
                    createTime,
                    modifyTime
                })
            }
            //postGroup
            else {
                let subPaths = fs.readdirSync(nodePath).map(p => resolve(nodePath, p))
                treeNode.url = join(publicPath, contextPath, nodePath.replace(postRootPath, ""))

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
        let treePaths = fs.readdirSync(postRootPath).map(p => resolve(postRootPath, p))
        for (let path of treePaths) {
            postTrees.push(recursivePost({ level: 1 }, path))
        }
        return postTrees;
    }
    let postTrees = getPostTrees(postRootPath)
    return JSON.stringify(postTrees);
}

