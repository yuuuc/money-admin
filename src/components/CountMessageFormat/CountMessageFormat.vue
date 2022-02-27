<template>
	<div class="row">
		<a-input
			class="input"
			v-model="messageFormat.value"
			:maxLength="messageFormat.maxLength"
			:placeholder="messageFormat.placeholder"
			:addonBefore="messageFormat.title"
		/>
		<a-checkbox class="checkbox" @change="onChecked">勾选展示</a-checkbox>
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
		onChecked(checkedValue) {
			const { type } = this.messageFormat
			const checked = checkedValue.target.checked
			this.$emit('checked', checked, type)
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
</style>
