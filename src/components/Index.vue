<template>
<div>
	<div style="text-align: right">
		Выводить по: 
		<select @change="changeLimit($event)" :value="limit">
			<option value="1">1</option>
			<option value="5">5</option>
			<option value="10">10</option>
		</select>
	</div>

	<table v-if="users.length" class="table">
		<thead>
			<th>Name</th>
			<th>Email</th>
			<th>Phone</th>
		</thead>
		<tbody>
			<tr
				v-for="(user, index) in users"
				:key="index"
			>
			<td>
				<router-link :to="'/user/'+user.id">{{user.name}}</router-link>
			</td>
			<td>{{user.email}}</td>
			<td>{{user.phone}}</td>
			</tr>
		</tbody>
	</table>
	<div v-else class="loading">
		Загрузка...
	</div>

	<div class="pagination">
		<button
			class="btn" @click="changePage(1)"
			:class="{'btn_disabled':currentPage==1}"
		>
			Первая
		</button>
		<button
			class="btn" @click="changePage(currentPage-1)"
			:class="{'btn_disabled':currentPage==1}"
		>
			Предыдущая
		</button>
		<div class="pagination__item">
			{{currentPage}}
		</div>
		<button
			class="btn" @click="changePage(currentPage+1)"
			:class="{'btn_disabled':currentPage==xTotalCount/limit}"
		>
			Следующая
		</button>
		<button
			class="btn" @click="changePage(xTotalCount/limit)"
			:class="{'btn_disabled':currentPage==xTotalCount/limit}"
		>
			Последняя
		</button>
	</div>

</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex';

export default {
	computed: mapState([
		"users",
		"xTotalCount",
		"currentPage",
		"limit",
	]),
	methods:{
		changePage(page){
			if(page<=this.xTotalCount/this.limit && page>=1){
				this.$store.commit('getUsers', [])
				axios.get("https://jsonplaceholder.typicode.com/users?_page="+page+"&_limit="+this.limit)
				.then(res => {
					this.$store.commit('getUsers', res.data)
					this.$store.commit('changePage', page)
					this.$store.commit('xTotalCount', res.headers["x-total-count"])
				})
				.catch(error => alert(error));
			}else{
				this.$store.commit('changePage', this.currentPage)
			}
		},
		changeLimit(event){
			this.$store.commit('changeLimit', event.target.value)
			this.changePage(1)
		}
	},
}
</script>

<style lang="scss">
	.table{
		border-collapse: collapse;
		width: 100%;
		transition: .2s;
		th, td {
			text-align: left;
			padding: 15px;
			border-bottom: 1px solid #eee;
		}
		tr:nth-of-type(odd) {
			background: #fdfdfd;
		}
	}

	.pagination {
		text-align: center;
		margin: 20px 0;
		.pagination__item {
			font-weight: 500;
			display: inline-block;
			margin: 0 10px;
		}
	}

</style>
