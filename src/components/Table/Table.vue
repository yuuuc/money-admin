<template>
	<!-- table -->

	<a-table
		class="table_continar"
		bordered
		:columns="columns"
		:data-source="newTableData"
		:pagination="false"
		:row-selection="rowSelection"
		size="middle"
	>
		<span slot="customTitle"><a-icon type="smile-o" /> 姓名</span>

		<span slot="action" slot-scope="text, record">
			<a @click="updateOne(record)">修改 一 {{ record.name || '数据' }}</a>
			<a-divider type="vertical" />
			<a @click="deleteOne(record.key)" class="danger">删除</a>
			<!-- <a-divider type="vertical" /> -->
			<!-- <a class="ant-dropdown-link"> 更多操作 <a-icon type="down" /> </a> -->
		</span>

		<div v-if="IsShowPagination" slot="footer">
			<a-pagination
				@change="pageChange"
				:default-current="currentPage"
				:total="allRecord"
				:defaultPageSize="pageSize"
			/>
		</div>
	</a-table>
</template>

<script>
export default {
	props: {
		columns: {
			type: Array,
			required: true
		},
		pageAndTableData: {
			type: Object,
			required: true
		},
		rowSelection: {
			type: Object,
			required: true
		}
	},
	data() {
		return {}
	},
	methods: {
		deleteOne(key) {
			this.$emit('deleteOne', key)
		},
		updateOne(record) {
			this.$emit('updateOne', record)
		},
		pageChange(currentPage) {
			this.$emit('currentPage', currentPage)
		}
	},
	computed: {
		newTableData() {
			const data = this.pageAndTableData.tableData
			if (data.length > 15) {
				data.splice(15)
			}
			return data
		},
		currentPage() {
			const { currentPage } = this.pageAndTableData
			return currentPage
		},
		allRecord() {
			const { allRecord } = this.pageAndTableData
			return allRecord
		},
		pageSize() {
			const { size } = this.pageAndTableData
			return size
		},
		IsShowPagination() {
			return this.allRecord > 15 ? true : false
		}
	}
}
</script>

<style scoped>
tr:last-child td {
	padding-bottom: 0;
}
.table_continar {
	box-sizing: border-box;
	width: 100%;
	padding: 20px;
	padding-bottom: 0px;
	position: relative;
}
.danger {
	color: red;
}
</style>
