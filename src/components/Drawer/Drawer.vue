<template>
	<a-drawer
		title="Create a new account"
		:width="720"
		:visible="newUserDrawer.visible"
		:body-style="{ paddingBottom: '80px' }"
		@close="newUserDrawer.onClose"
	>
		<div class="main">
			<slot name="main"></slot>
		</div>

		<div class="footer">
			<slot name="footer"></slot>
		</div>
	</a-drawer>
</template>

<script>
export default {
	props: {
		newUserDrawer: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style scoped>
.main {
	width: 100%;
	height: 700px;
	padding: 10px;
}
.footer {
	margin-top: 20px;
	width: 100%;
	height: 80px;
}
</style>
