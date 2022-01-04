<template>
	<div class="content">
		<h1>Login</h1>
		<div class="username">
			<input
				type="text"
				id="username"
				v-model="name"
				placeholder="用户名/账号"
			/>
		</div>
		<div class="password">
			<input
				type="password"
				id="password"
				v-model="password"
				placeholder="密码"
			/>
		</div>
		<div class="login">
			<input type="button" @click="login()" :value="loginText" />
		</div>
		<div class="register">
			<router-link to="/register" class="register" id="register"
				>注 册</router-link
			>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			name: '',
			password: '',
			loginText: '登录'
		}
	},
	methods: {}
}
</script>

<style scoped>
.content {
	margin: 200px auto;
	width: 300px;
	height: 330px;
	border: 1px solid #aaaaaa;
	border-radius: 3px;
}

.content > h1 {
	color: #3399ff;
	text-align: center;
	margin-top: 10px;
	font-family: '黑体';
	font-weight: blod;
}

.content > div {
	line-height: 40px;
	height: 40px;
	margin: 0 auto;
	padding: 0 30px;
	box-sizing: border-box;
	margin: 15px 0;
}

.content > div > input[type='text'] {
	width: 100%;
}

.content > div > input {
	height: 100%;
	width: 100%;
}

.login > input {
	background-color: #3399ff;
	border: 0px;
	box-sizing: border-box;
	border-radius: 3px;
	color: white;
	opacity: 80;
}

#username,
#password {
	border: 1px #aaa solid;
	box-sizing: border-box;
	border-radius: 3px;
	font-size: 16px;
	padding: 0 5px;
}

.register {
	text-align: center;
	font-size: 14px;
}

#register {
	color: #bbbbbb;
}
</style>
