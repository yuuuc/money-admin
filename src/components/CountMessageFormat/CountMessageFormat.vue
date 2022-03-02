<template>
	<div class="row">
		<a-input
			class="input"
			v-model="messageFormat.description"
			:addonBefore="messageFormat.title"
		/>
		<a-button class="delete" type="danger" @click="deleteMessageFormat">
			删除
		</a-button>
		<a-checkbox
			class="checkbox"
			@change="onChecked"
			:checked="messageFormat.isShow == 1 ? true : false"
			>勾选展示</a-checkbox
		>
	</div>
</template>

<script>
export default {
	props: {
		messageFormat: {
			type: Object,
			required: true
		}
	},
	methods: {
		onChecked() {
			this.$emit('checked', this.messageFormat)
		},
		deleteMessageFormat() {
			this.$emit('deleteOne', this.messageFormat.cmid)
		}
	}
}
</script>

<style lang="css" scoped>
.row {
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.input {
	flex: 1;
}
.checkbox {
	margin-left: 20px;
	zoom: 100%;
}
.delete {
	margin-left: 10px;
}
</style>
