import { isMobile } from '@/common/utils'
import components from '@/components'
import { isoDateDistanceToNow } from "@/common/date-util";


export default {
    install(Vue, options) {
        //注册函数
        Vue.prototype.isMobile = isMobile
        Vue.prototype.resOK = (code) => code == 0;

        Vue.filter('dateDistanceToNow', function (val) {
            return isoDateDistanceToNow(val)+ '以前';
        })
        Vue.filter('formatUserAgent',function(userAgent){
            console.log(platform.parse(userAgent))
            return '来自 '+platform.parse(userAgent).name
        })
        
        //注册组件
        for (let comp of components) {
            Vue.component(comp.name, comp)
        }
    }
}