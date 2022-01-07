<template>
	<a-modal
		title="警告!"
		:visible="delChecked.visible"
		:confirm-loading="delChecked.confirmLoading"
		@ok="delChecked.handleOk"
		@cancel="delChecked.handleCancel"
	>
		<p>确认删除！</p>
	</a-modal>
</template>

<script>
export default {
	props: {
		delChecked: {
			type: Object,
			required: true,
		},
	},
};
</script>
