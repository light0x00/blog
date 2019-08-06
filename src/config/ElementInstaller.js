/* element */
// import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/element-theme.scss'
import { Button, Link,Divider,Icon, Backtop, Loading, Menu, MenuItem, MenuItemGroup, Submenu, Drawer, Avatar, Timeline, TimelineItem, Card, Tag } from 'element-ui';


export default {
    install(Vue, options) {
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
        Vue.use(Loading)
    }
}