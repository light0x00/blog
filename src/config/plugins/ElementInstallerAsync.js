import '@/styles/element-theme.scss'

/** @Deprecated 暂时使用的element组件不多 gizp仅20k 无需异步加载 */
export default {
    install(Vue, options) {
        Vue.component('el-menu', ()=>import('element-ui/lib/menu'))
        Vue.component('el-menu-item', ()=>import('element-ui/lib/menu-item'))
        Vue.component('el-menu-item-group', ()=>import('element-ui/lib/menu-item-group'))
        Vue.component('el-submenu', ()=>import('element-ui/lib/submenu'))
        Vue.component('el-drawer', ()=>import('element-ui/lib/drawer'))
        Vue.component('el-avatar', ()=>import('element-ui/lib/avatar'))
        Vue.component('el-timeline', ()=>import('element-ui/lib/timeline'))
        Vue.component('el-timeline-item', ()=>import('element-ui/lib/timeline-item'))
        Vue.component('el-card', ()=>import('element-ui/lib/card'))
        Vue.component('el-tag', ()=>import('element-ui/lib/tag'))
        Vue.component('el-button', ()=>import('element-ui/lib/button'))
        Vue.component('el-link', ()=>import('element-ui/lib/link'))
        Vue.component('el-backtop', ()=>import('element-ui/lib/backtop'))
        Vue.component('el-icon', ()=>import('element-ui/lib/icon'))
        Vue.component('el-divider', ()=>import('element-ui/lib/divider'))
        import('element-ui/lib/loading').then(
            (Loading)=>{
                Vue.use(Loading)
            }
        )
    }
}