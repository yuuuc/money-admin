import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

const Login = () => import("../pages/Login.vue");
const Home = () => import("../pages/Home.vue");
const User = () => import("../pages/User.vue");
const Count = () => import("../pages/Count.vue");
const Dollar = () => import("../pages/Dollar.vue");
const routes = [
	{
		path: "/",
		redirect: "/login",
	},
	{
		path: "/login",
		component: Login,
	},
	{
		path: "/home",
		component: Home,
		children: [
			{ path: "user/", component: User },
			{ path: "dollar/", component: Dollar },
			{ path: "count/", component: Count },
			{ path: "", redirect: "user" },
		],
	},
];
const router = new VueRouter({ routes });
export default router;
