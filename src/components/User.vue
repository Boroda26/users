<template>
	<div>
		<router-link to="/" >
			<button class="btn">Назад</button>
		</router-link>
		<h1 class="title">{{user.name}}</h1>
		
		<ul v-if="Object.keys(todos).length" class="todos">
			<li
				v-for="todo in todos"
				:key="todo.id"
			>
				<label class="todos__item" :for="'todo'+todo.id">
					<div class="todos__title">{{todo.title}}</div>
					<input type="checkbox" class="todos__title" v-model="todo.completed" :id="'todo'+todo.id">
				</label>
			</li>
		</ul>
		<div v-else class="loading">
			Загрузка...
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex';

export default {
	mounted(){
		axios.get("https://jsonplaceholder.typicode.com/todos?userId="+this.$route.params.id)
		.then(res => this.todos = res.data)
		.catch(error => alert(error));
	},
	data(){
		return{
			todos: {}
		}
	},
	computed: mapState({
		user(state) {
			state = state.users.filter(i => i.id==this.$route.params.id)[0]
			return state;
		}
	})
}
</script>

<style lang="scss">
	.title {text-align: center;}
	.todos {
		list-style: none;
		max-width: 500px;
		padding: 0;
		margin: 0 auto;

		.todos__item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 12px;
			border-bottom: 1px solid #f2f4fa;
			cursor: pointer;
			&:hover {
				background: #fdfdfd;
			}
		}
		.todos__title:first-letter {
			text-transform: uppercase;
		}

	}
</style>