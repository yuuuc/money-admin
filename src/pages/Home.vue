<template>
	<div id="HomePage">
		<SideMenu class="left" :navList="this.HomeRoutes" />
		<router-view class="right"></router-view>
	</div>
</template>

<script>
import SideMenu from '../components/SideMenu/SideMenu.vue'
export default {
	components: { SideMenu },
	data() {
		return {
			HomeRoutes: [
				{
					id: '10',
					title: '用户管理',
					iconType: 'user',
					childs: [{ id: '11', title: '用户数据', to: 'user' }]
				},
				{
					id: '20',
					title: '统计管理',
					iconType: 'bar-chart',
					childs: [{ id: '21', title: '图表管理', to: 'count' }]
				},
				{
					id: '30',
					title: '资产管理',
					iconType: 'dollar',
					childs: [{ id: '31', title: '收支记录', to: 'dollar' }]
				},
				{
					id: '40',
					title: '收支类型',
					iconType: 'appstore',
					childs: [{ id: '41', title: '类型管理', to: 'type' }]
				}
			]
		}
	}
}
</script>

<style lang="css" scoped>
#HomePage {
	height: 100%;
	display: flex;
}
.left {
	width: 260px;
}
.right {
	overflow-y: scroll;
	flex: 1;
}
</style>
