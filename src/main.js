import Vue from 'vue';
import store from './store'
import VueRouter from 'vue-router'

import App from './App.vue'
import User from './components/User.vue'
import Index from './components/Index.vue'
Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{ path: '/', component: Index },
		{ path: '/user/:id', component: User }
	]
})

Vue.config.productionTip = false

new Vue({
	store,
	router,
	render: h => h(App),
}).$mount('#app')