import Vue from "vue";
import App from "./App.vue";
// 按需加载 ant ui
import {
	Button,
	message,
	Menu,
	Icon,
	PageHeader,
	Input,
	Table,
	Tag,
	Divider,
	Pagination,
	Modal,
	Drawer,
} from "ant-design-vue";
// 导入 vue-router
import router from "./router/index";
//导入全局样式
import "./assets/css/global.css";

Vue.config.productionTip = false;

/* v1.1.3+ 自动注册Button下组件，如Button.Group */
Vue.use(Button)
	.use(Menu)
	.use(Icon)
	.use(PageHeader)
	.use(Input)
	.use(Table)
	.use(Tag)
	.use(Divider)
	.use(Pagination)
	.use(Modal)
	.use(Drawer);

Vue.prototype.$message = message;

new Vue({
	render: (h) => h(App),
	router,
}).$mount("#app");
