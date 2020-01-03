/* element-ui按需导入 */
import '@/styles/element-theme.scss'
import { Pagination,Dialog,Alert, Form, FormItem, Notification, Input, Tooltip, Button, Link, Divider, Icon, Backtop, Loading, Menu, MenuItem, MenuItemGroup, Submenu, Drawer, Avatar, Timeline, TimelineItem, Card, Tag } from 'element-ui';

export default {
    install(Vue, options) {
        Vue.component(Tooltip.name, Tooltip)
        Vue.component(Menu.name, Menu)
        Vue.component(MenuItem.name, MenuItem)
        Vue.component(MenuItemGroup.name, MenuItemGroup)
        Vue.component(Submenu.name, Submenu)
        Vue.component(Drawer.name, Drawer)
        Vue.component(Avatar.name, Avatar)
        Vue.component(Timeline.name, Timeline)
        Vue.component(TimelineItem.name, TimelineItem)
        Vue.component(Card.name, Card)
        Vue.component(Tag.name, Tag)
        Vue.component(Button.name, Button)
        Vue.component(Link.name, Link)
        Vue.component(Backtop.name, Backtop)
        Vue.component(Icon.name, Icon)
        Vue.component(Divider.name, Divider)
        Vue.component(Input.name, Input)
        // Vue.component(Notification.name, Notification)
        Vue.component(Form.name, Form)
        Vue.component(FormItem.name, FormItem)
        Vue.component(Alert.name, Alert)
        Vue.component(Dialog.name, Dialog)
        Vue.component(Pagination.name, Pagination)

        Vue.use(Loading.directive);
        Vue.prototype.$loading = Loading.service;
        Vue.prototype.$notify = (opt)=>Notification({...opt,offset:60});
    }
}