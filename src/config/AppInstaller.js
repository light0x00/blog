import { isMobile } from '@/common/utils'

import components from '@/components'

export default {
    install(Vue, options) {
        //注册函数
        Vue.prototype.isMobile = isMobile
        //注册组件
        for (let comp of components) {
            Vue.component(comp.name, comp)
        }
    }
}