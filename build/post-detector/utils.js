
const fs = require('fs')

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



module.exports={
    getJson,isDir,exists
}