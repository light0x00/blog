
import ArticleTags from './article-tags.vue'
import Backtop from './backtop.vue'
import GuestInfo from './guest-info.vue'
import GuestInfoDialog from './guest-info-dialog.vue'
import DockButton from './dock-button.vue'

import Vue from "vue";

Vue.component("visitor-map", () => import(/* webpackChunkName:'visitor-map' */"./visitor-map"))

Vue.component(ArticleTags.name, ArticleTags)
Vue.component(Backtop.name, Backtop)
Vue.component(GuestInfo.name, GuestInfo)
Vue.component(GuestInfoDialog.name, GuestInfoDialog)
Vue.component(DockButton.name, DockButton)
Vue.component("music-player",()=>import(/* webpackChunkName:'music-player' */"./music-player"))

