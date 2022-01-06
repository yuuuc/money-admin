<template>
	<div id="HomePage">
		<SideMenu :navList="this.HomeRoutes" />
		<router-view></router-view>
	</div>
</template>

<script>
import SideMenu from "../components/SideMenu/SideMenu.vue";
export default {
	components: { SideMenu },
	data() {
		return {
			HomeRoutes: [
				{
					id: "10",
					title: "用户管理",
					iconType: "user",
					childs: [{ id: "11", title: "user", to: "user" }],
				},
				{
					id: "20",
					title: "统计管理",
					iconType: "bar-chart",
					childs: [{ id: "21", title: "count", to: "count" }],
				},
				{
					id: "30",
					title: "资产管理",
					iconType: "dollar",
					childs: [{ id: "31", title: "dollar", to: "dollar" }],
				},
			],
		};
	},
};
</script>

<style lang="css" scoped>
#HomePage {
	height: 100%;
	display: flex;
}
</style>
