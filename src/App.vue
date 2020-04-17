<template>
	<div>
		<h1 class="header" @click="$router.push('/').catch(err => {})">Users</h1>
		<div id="app" class="conainer">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex';

export default {
	computed: mapState([
		"limit",
	]),
	mounted(){
		axios.get("https://jsonplaceholder.typicode.com/users?_page=1&_limit="+this.limit)
		.then(res => {
			this.$store.commit('getUsers', res.data)
			this.$store.commit('xTotalCount', res.headers["x-total-count"])
		})
		.catch(error => alert(error));
	},
}
</script>

<style lang="scss">
	body{
		background: #f9f9f9;
		font-family: 'Roboto', sans-serif;
	}
	.header {
		text-align: center;
		cursor: pointer;
	}
	.conainer {
		color: #555;
		max-width: 800px;
		margin: 20px auto;
		background: #fff;
		border: 1px solid #eee;
		border-radius: 3px;
		padding: 30px;
		box-shadow: 0 2px 4px 0 rgba(232, 237, 250, 0.5);
	}

	.btn {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		background: #f9f9f9;
		display: inline-block;
		padding: 6px 12px;
		border-radius: 3px;
		border: 1px solid #eee;
		text-decoration: none;
		color: #555;
		outline: none;
		cursor:pointer;
		margin: 3px;

		&_disabled{
			opacity: 0.5;
			pointer-events: none;
		}
		
		&:hover {
			background: #eee;
		}
	}

	.loading {
		text-align: center;
		font-size: 20px;
		margin: 50px;
	}

</style>