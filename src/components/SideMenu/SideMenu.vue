<template>
	<div id="sideMenu">
		<a-menu
			style="width: 256px; border: 0"
			:default-selected-keys="current"
			:open-keys.sync="openKeys"
			mode="inline"
			@click="handleClick"
		>
			<a-sub-menu
				v-for="item in navList"
				:key="item.id"
				@titleClick="titleClick"
			>
				<span slot="title">
					<a-icon :type="item.iconType" />
					<span>{{ item.title }}</span>
				</span>
				<a-menu-item
					v-for="menuItem in item.childs"
					:key="menuItem.id"
					:data-to="menuItem.to"
					>{{ menuItem.title }}</a-menu-item
				>
			</a-sub-menu>
		</a-menu>
	</div>
</template>

<script>
export default {
	props: {
		navList: {
			type: Array,
		},
	},
	//
	beforeMount() {
		// 设计路由表
		let routes = [];
		this.navList.forEach((item) => {
			item.childs.forEach((child) => {
				let route = { ...child, parentId: item.id };
				routes.push(route);
			});
		});

		this.routes = routes;

		//根据 $route 中的path 进行对 crrent 和 openKeys 的预赋值
		this.initNav();
	},
	mounted() {},
	data() {
		return {
			routes: [],
			openKeys: [],
			current: [],
		};
	},
	watch: {
		// 对openKeys 的监听
		openKeys(val) {
			console.log("openKeys", val);
		},
	},
	computed: {},
	methods: {
		// 根据路由path 对组件中依赖的两个数组进行预赋值
		initNav() {
			// 使用正则表达式获取后面的路径
			const to = this.$route.path.replace(/^\/home\//, "");
			const { id, parentId } = this.routes.find((item) => {
				return to === item.to;
			});
			if (id != undefined && id !== null) {
				this.current = [id];
				this.openKeys = [parentId];
			}
		},
		// choice menuItem callback
		handleClick(e) {
			const to = e.domEvent.target.dataset.to;
			this.$router.push(`/home/${to}`);
		},
		// title onclick callback
		titleClick(e) {
			console.log("titleClick", e);
		},
	},
};
</script>

<style lang="css" scoped>
#sideMenu {
	height: 100%;
	border: 1px solid #eee;
}
</style>
