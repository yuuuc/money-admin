import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

const Login = () => import('../pages/Login.vue')
const Home = () => import('../pages/Home.vue')
const User = () => import('../pages/User.vue')
const routes = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/home',
		component: Home,
		children: [
			{ path: '', redirect: 'user' },
			{ path: 'user', component: User }
		]
	}
]
const router = new VueRouter({ routes })
export default router
