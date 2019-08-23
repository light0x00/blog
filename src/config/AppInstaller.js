import { isMobile } from '@/common/utils'

import components from '@/components'
import { formatDistanceToNow, parseISO } from "date-fns";

export default {
    install(Vue, options) {
        //注册函数
        Vue.prototype.isMobile = isMobile
        Vue.prototype.resOK = (code) => code == 0;

        Vue.filter('dateDistanceToNow', function (val) {
            return formatDistanceToNow(parseISO(val), { locale: window.getDateLocale() });
        })
        //注册组件
        for (let comp of components) {
            Vue.component(comp.name, comp)
        }
    }
}