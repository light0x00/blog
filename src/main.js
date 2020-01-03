

import Vue from 'vue';
import '@/styles/index.css'
import '@/config'
import router from '@/router'
import store from '@/store'
import App from '@/app.vue'

let vm = new Vue(
	{
		el: "#app",
		render: (h) => h(App),
		store,
		router
	}
)





