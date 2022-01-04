<template>
	<div id="HomePage">
		<SideMenu />
		<router-view></router-view>
	</div>
</template>

<script>
import SideMenu from '../components/SideMenu/SideMenu.vue'
export default {
	components: { SideMenu }
}
</script>

<style lang="css" scoped>
#HomePage {
	height: 100%;
	display: flex;
}
</style>
