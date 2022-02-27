import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '../store/index'
Vue.use(VueRouter)

const Login = () => import('../pages/Login.vue')
const Home = () => import('../pages/Home.vue')
const User = () => import('../pages/User.vue')
const Count = () => import('../pages/Count.vue')
const Account = () => import('../pages/Account.vue')
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
		meta: {
			requiresAuth: true
		},
		children: [
			{ path: 'user/', component: User },
			{ path: 'dollar/', component: Account },
			{ path: 'count/', component: Count },
			{ path: '', redirect: 'user' }
		]
	}
]

const router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
	if (to.matched.some((item) => item.meta.requiresAuth)) {
		const uid = store.state.uid
		console.log('钩子')
		if (uid == null || uid == '') {
			next({
				path: '/login'
			})
		} else {
			next()
		}
	} else {
		next()
	}
})
export default router
