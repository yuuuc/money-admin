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
		:loading="isLoading"
	>
		<span slot="customTitle"><a-icon type="smile-o" /> Name</span>
		<span slot="tags" slot-scope="tags">
			<a-tag
				v-for="tag in tags"
				:key="tag"
				:color="
					tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
				"
			>
				{{ tag.toUpperCase() }}
			</a-tag>
		</span>
		<span slot="action" slot-scope="text, record">
			<a>Invite 一 {{ record.name }}</a>
			<a-divider type="vertical" />
			<a type="danger">Delete</a>
			<a-divider type="vertical" />
			<a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
		</span>
		<div v-if="IsShowPagination" slot="footer">
			<a-pagination :default-current="currentPage" :total="allRecord" />
		</div>
	</a-table>
</template>

<script>
export default {
	props: {
		columns: {
			type: Array,
			required: true,
		},
		pageAndTableData: {
			type: Object,
			required: true,
		},
		rowSelection: {
			type: Object,
			required: true,
		},
		isLoading: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {};
	},
	methods: {},
	computed: {
		newTableData() {
			const data = this.pageAndTableData.tableData;
			console.log(data);
			if (data.length > 15) {
				data.splice(15);
			}
			return data;
		},
		currentPage() {
			const { currentPage } = this.pageAndTableData;
			return currentPage;
		},
		allRecord() {
			const { allRecord } = this.pageAndTableData;
			return allRecord;
		},
		IsShowPagination() {
			return this.allRecord > 15 ? true : false;
		},
	},
};
</script>

<style scoped>
tr:last-child td {
	padding-bottom: 0;
}
.table_continar {
	width: 100%;
	padding: 20px;
	padding-bottom: 0px;
	position: relative;
	height: 100%;
}
</style>
