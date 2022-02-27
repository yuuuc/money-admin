<template>
	<!-- header -->
	<a-page-header
		class
		style="border: 1px solid rgb(235, 237, 240)"
		:title="TitlAndSubTitle.title"
		:sub-title="TitlAndSubTitle.subTitle ? TitlAndSubTitle.subTitle : ''"
	>
		<template slot="tags">
			<a-input-search
				class="searchInput"
				placeholder="input search text"
				enter-button
				allowClear
				:loading="isLoading"
				@search="onSearch"
			/>
		</template>

		<template slot="extra">
			<a-button type="danger" @click="delCheck"> delete </a-button>
			<a-button type="primary" @click="newUser"> new </a-button>
		</template>

		<!-- <Drawer /> -->
	</a-page-header>
</template>

<script>
export default {
	props: {
		TitlAndSubTitle: {
			type: Object,
			required: true
		},
		isLoading: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {}
	},
	methods: {
		onSearch(value) {
			this.$emit('search', value)
		},
		delCheck() {
			this.$emit('delChecked')
		},
		newUser() {
			this.$emit('newObject')
		}
		// showDrawer() {
		// 	this.visible = true;
		// },
		// onClose() {
		// 	this.visible = false;
		// },
	}
}
</script>

<style scoped>
.searchInput {
	margin-left: 150px;
}
</style>
