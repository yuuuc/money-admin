<template>
	<div class="container">
		<!-- header -->
		<Header
			@search="onSearch"
			:TitlAndSubTitle="TitlAndSubTitle"
			:isLoading="isLoading"
			@delcheck="delcheck"
			@newUser="newUser"
		/>
	</div>
</template>

<script>
import Header from "../components/Header/Header.vue";
export default {
	components: { Header },
	data() {
		return {
			TitlAndSubTitle: {
				title: "Title test",
				subTitle: "subTitle",
			},
			isLoading: false,
		};
	},
	methods: {
		onSearch(value) {
			this.isLoading = true;
			setTimeout(() => {
				this.isLoading = false;
			}, 1000);
			console.log(value);
		},
		delcheck() {
			console.log("delcheck");
			this.delChecked.visible = true;
		},
		newUser() {
			console.log("newUser");
			this.newUserDrawer.visible = true;
		},
	},
};
</script>

<style scoped>
.container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-flow: column;
}
</style>
