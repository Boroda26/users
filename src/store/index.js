import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		users: [],
		xTotalCount: 0,
		currentPage: 1,
		limit: 5,
	},
	mutations: {
		getUsers(state, data) {
			state.users = data
		},
		xTotalCount(state, data) {
			state.xTotalCount = data
		},
		changePage(state, data){
			state.currentPage = data
		},
		changeLimit(state, data){
			state.limit = data
		}
	 }
})