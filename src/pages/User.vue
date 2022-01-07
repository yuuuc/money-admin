<template>
	<div class="continar">
		<!-- header -->
		<Header
			@search="onSearch"
			:TitlAndSubTitle="TitlAndSubTitle"
			:isLoading="isLoading"
			@delcheck="delcheck"
			@newUser="newUser"
		/>

		<!-- table -->
		<Table
			:columns="columns"
			:pageAndTableData="pageAndTableData"
			:rowSelection="rowSelection"
			:isLoading="isLoading"
		></Table>

		<!-- del modal -->
		<Modal :delChecked="delChecked" />
		<Drawer :newUserDrawer="newUserDrawer" />
	</div>
</template>

<script>
import Table from "../components/Table/Table.vue";
import Header from "../components/Header/Header.vue";
import Modal from "../components/Modal/Modal.vue";
import Drawer from "../components/Drawer/Drawer.vue";
export default {
	components: { Table, Header, Modal, Drawer },
	data() {
		return {
			TitlAndSubTitle: {
				title: "Title test",
				subTitle: "subTitle",
			},
			isLoading: false,
			// newUser对象
			newUserDrawer: {
				visible: false,
				onClose: () => {
					this.newUserDrawer.visible = false;
					console.log("close callback");
				},
			},
			// 删除按钮的对象 Modal
			delChecked: {
				visible: false,
				confirmLoading: false,
				handleOk: () => {
					this.delChecked.confirmLoading = true;
					console.log(this);
					console.log("del success");
					setTimeout(() => {
						this.delChecked.confirmLoading = false;
						this.delChecked.visible = false;
						this.$message.success("删除成功", 5);
						this.$message.error("删除失败", 5);
					}, 1000);
				},
				handleCancel: () => {
					this.delChecked.visible = false;
				},
			},
			columns: [
				{
					dataIndex: "name",
					key: "name",
					slots: { title: "customTitle" },
					scopedSlots: { customRender: "name" },
					width: 100,
					align: "center",
				},
				{
					title: "Age",
					dataIndex: "age",
					key: "age",
					width: 100,
					align: "center",
				},
				{
					title: "Address",
					dataIndex: "address",
					key: "address",
					width: 500,
				},
				{
					title: "Tags",
					key: "tags",
					dataIndex: "tags",
					scopedSlots: { customRender: "tags" },
					width: 260,
				},
				{
					title: "Action",
					key: "action",
					scopedSlots: { customRender: "action" },
					width: 350,
				},
			],
			pageAndTableData: {
				allRecord: 14,
				allPage: 2,
				cureentPage: 1,
				tableData: [
					{
						key: "1",
						name: "John Brown",
						age: 32,
						address: "New York No. 1 Lake Park",
						tags: ["nice", "developer"],
					},
					// {
					// 	key: "2",
					// 	name: "Jim Green",
					// 	age: 42,
					// 	address: "London No. 1 Lake Park",
					// 	tags: ["loser"],
					// },
					// {
					// 	key: "3",
					// 	name: "Joe Black",
					// 	age: 32,
					// 	address: "Sidney No. 1 Lake Park",
					// 	tags: ["cool", "teacher"],
					// },
					// {
					// 	key: "4",
					// 	name: "Joe Black",
					// 	age: 32,
					// 	address: "Sidney No. 1 Lake Park",
					// 	tags: ["cool", "teacher"],
					// },
					// {
					// 	key: "5",
					// 	name: "Joe Black",
					// 	age: 32,
					// 	address: "Sidney No. 1 Lake Park",
					// 	tags: ["cool", "teacher"],
					// },
					// {
					// 	key: "6",
					// 	name: "Joe Black",
					// 	age: 32,
					// 	address: "Sidney No. 1 Lake Park",
					// 	tags: ["cool", "teacher"],
					// },
					// {
					// 	key: "7",
					// 	name: "Joe Black",
					// 	age: 32,
					// 	address: "Sidney No. 1 Lake Park",
					// 	tags: ["cool", "teacher"],
					// },
					// {
					// 	key: "8",
					// 	name: "Joe Black",
					// 	age: 32,
					// 	address: "Sidney No. 1 Lake Park",
					// 	tags: ["cool", "teacher"],
					// },
					// {
					// 	key: "9",
					// 	name: "Joe Black",
					// 	age: 32,
					// 	address: "Sidney No. 1 Lake Park",
					// 	tags: ["cool", "teacher"],
					// },
					// {
					// 	key: "10",
					// 	name: "Joe Black",
					// 	age: 32,
					// 	address: "Sidney No. 1 Lake Park",
					// 	tags: ["cool", "teacher"],
					// },
					// {
					// 	key: "11",
					// 	name: "Joe Black",
					// 	age: 32,
					// 	address: "Sidney No. 1 Lake Park",
					// 	tags: ["cool", "teacher"],
					// },
					// {
					// 	key: "12",
					// 	name: "Joe Black",
					// 	age: 32,
					// 	address: "Sidney No. 1 Lake Park",
					// 	tags: ["cool", "teacher"],
					// },
					// {
					// 	key: "13",
					// 	name: "Joe Black",
					// 	age: 32,
					// 	address: "Sidney No. 1 Lake Park",
					// 	tags: ["cool", "teacher"],
					// },
					// {
					// 	key: "14",
					// 	name: "Joe Black",
					// 	age: 32,
					// 	address: "Sidney No. 1 Lake Park",
					// 	tags: ["cool", "teacher"],
					// },
					// {
					// 	key: "15",
					// 	name: "Joe Black",
					// 	age: 32,
					// 	address: "Sidney No. 1 Lake Park",
					// 	tags: ["cool", "teacher"],
					// },
					// {
					// 	key: "16",
					// 	name: "Joe Black",
					// 	age: 32,
					// 	address: "Sidney No. 1 Lake Park",
					// 	tags: ["cool", "teacher"],
					// },
					// {
					// 	key: "17",
					// 	name: "Joe Black",
					// 	age: 32,
					// 	address: "Sidney No. 1 Lake Park",
					// 	tags: ["cool", "teacher"],
					// },
				],
			},
			rowSelection: {
				onChange: (selectedRowKeys, selectedRows) => {
					console.log(
						`selectedRowKeys: ${selectedRowKeys}`,
						"selectedRows: ",
						selectedRows
					);
				},
				onSelect: (record, selected, selectedRows) => {
					console.log(record, selected, selectedRows);
				},
				onSelectAll: (selected, selectedRows, changeRows) => {
					console.log(selected, selectedRows, changeRows);
				},
			},
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
	computed: {
		// newTableData() {},
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
.continar {
	width: 100%;
	height: 100%;
	display: flex;
	flex-flow: column;
}
</style>
