<template>
	<a-drawer
		title="Create a new account"
		:width="720"
		:visible="newUserDrawer.visible"
		:body-style="{ paddingBottom: '80px' }"
		@close="newUserDrawer.onClose"
	>
		<div>1234</div>
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
