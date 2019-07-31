

/* ------------------------------------------------------------------------------
1. DefinePlugin 会替换PROFILE(dev|pro)
2. 根据PROFILE导入对应的配置
------------------------------------------------------------------------------ */
const conf1 = require(`@/config/application.js`).default
const conf2 = require(`@/config/application-${PROFILE}.js`).default  /* 这里先被DefinePlugin常量替换  这不会像「变量导入」一样打包目录下所有模块 */

window.APP_CONFIG = {
    ...conf1, ...conf2
}
