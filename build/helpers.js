
const path = require('path')

const rootPath = path.resolve(__dirname, '../')

//返回基于 rootPath 的全路径
let _resolve = (relativePath) => path.join(rootPath, relativePath)



module.exports = {
    rootPath, _resolve
}
