
const path = require('path')
const _ = require('lodash')

const rootPath = path.resolve(__dirname, '../')

//返回基于 rootPath 的全路径
const _resolve = (relativePath) => path.join(rootPath, relativePath)

function isAnyEmpty(target){
    if(_.isArray(target)){
        if(target.length==0)
            return true
        for(let item of target){
            if(_.isEmpty(item)){ //只检查第一层,不考虑嵌套
                return true;
            }
        }
    }
    return _.isEmpty(target);
}

module.exports = {
    rootPath, _resolve,isAnyEmpty
}


