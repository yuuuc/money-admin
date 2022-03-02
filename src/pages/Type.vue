<template>
	<div class="container">
		<Header
			@search="onSearch"
			:TitlAndSubTitle="TitlAndSubTitle"
			:isLoading="isLoading"
			@delChecked="delChecked"
			@newObject="newType"
		/>

		<!-- table -->
		<Table
			:columns="columns"
			:pageAndTableData="pageAndTableData"
			:rowSelection="rowSelection"
			@currentPage="pageChange"
			@updateOne="updateOne"
			@deleteOne="deleteOne"
		>
		</Table>

		<a-modal
			:title="modalTitle"
			:visible="modalvisible"
			:confirm-loading="modalconfirmLoading"
			@ok="modalHandle"
			@cancel="modalHandleCancel"
		>
			<div class="update_row">
				<div class="label">类型名称:</div>
				<a-input class="input" v-model="accountType.title" />
			</div>
			<div class="update_row">
				<div class="label">类型描述:</div>
				<a-input class="input" v-model="accountType.description" />
			</div>
		</a-modal>
	</div>
</template>

<script>
import Header from '../components/Header/Header.vue'
import Table from '../components/Table/Table.vue'
import {
	getAccountTypesByPage,
	postUpdateAccountType,
	postInsertAccountType,
	postDeleteAccountType,
	postDeleteAccountTypeByList,
	getAccountTypeByTitle
} from '../api/AccountTypeApi'
export default {
	components: { Header, Table },
	data() {
		return {
			TitlAndSubTitle: {
				title: '类型管理',
				subTitle: '',
				newIsShow: true
			},
			modalTitle: '修改类型',
			modalState: true, // true 是修改 ，false 增加
			modalvisible: false,
			modalconfirmLoading: false,
			accountType: {},
			isLoading: false,
			deleteArr: [],
			pageAndTableData: {
				allRecord: 0,
				allPage: 0,
				currentPage: 0,
				size: 0,
				tableData: []
			},
			rowSelection: {
				onChange: (selectedRowKeys) => {
					this.deleteArr = selectedRowKeys
				},
				onSelect: (record, selected, selectedRows) => {
					console.log('onselect', record, selected, selectedRows)
				},
				onSelectAll: (selected, selectedRows) => {
					if (selected) {
						this.deleteArr = selectedRows.map((item) => item.key)
					} else {
						this.deleteArr = []
					}
				}
			},
			columns: [
				{
					title: '类型名称',
					dataIndex: 'title',
					key: 'title',
					width: 100,
					align: 'center'
				},
				{
					title: '类型描述',
					dataIndex: 'description',
					key: 'description',
					width: 100,
					align: 'center'
				},
				{
					title: '操作',
					key: 'action',
					scopedSlots: { customRender: 'action' },
					width: 250
				}
			]
		}
	},
	created() {
		this.AccountTypesData()
	},
	methods: {
		modalHandle() {
			if (this.modalState) {
				this.accountTypeUpdate()
			} else {
				this.accountTypeNew()
			}
		},
		modalHandleCancel() {
			this.accountType = {}
			this.modalvisible = false
			this.modalconfirmLoading = false
		},
		accountTypeNew() {
			postInsertAccountType(this.accountType)
				.then((res) => {
					if (res.messageCode == 'ok') {
						this.$message.success('添加成功!', 2)
						this.modalHandleCancel()
						this.AccountTypesData()
					} else {
						this.$message.error('添加失败', 2)
						this.modalHandleCancel()
					}
				})
				.catch((err) => {
					this.$message.error('添加失败', 2)
					this.modalHandleCancel()
					console.log(err)
				})
		},
		accountTypeUpdate() {
			postUpdateAccountType(this.accountType)
				.then((res) => {
					if (res.messageCode == 'ok') {
						this.$message.success('更新成功!', 2)
						this.modalHandleCancel()
						this.AccountTypesData()
					} else {
						this.$message.error('更新失败', 2)
						this.modalHandleCancel()
					}
				})
				.catch((err) => {
					this.$message.error('更新失败', 2)
					this.modalHandleCancel()
					console.log(err)
				})
		},
		AccountTypesData() {
			getAccountTypesByPage({ current: this.pageAndTableData.currentPage })
				.then((res) => {
					if (res.messageCode == 'ok') {
						const { current, pages, size, total, records } =
							res.data.accountsTypePage
						console.log(res)
						this.pageAndTableData.currentPage = current
						this.pageAndTableData.allPage = pages
						this.pageAndTableData.size = size
						this.pageAndTableData.allRecord = total
						this.pageAndTableData.tableData = records.map((item) => {
							item['key'] = item['aid_t']
							return item
						})
					}
				})
				.catch((err) => {
					console.log(err)
				})
		},
		delChecked() {
			if (this.deleteArr.length <= 0) {
				this.$message.warning('请先选择要删除的数据', 2)
				return
			}
			let that = this
			this.$confirm({
				title: '确认删除?',
				content: '确认删除后,将无法恢复!',
				onOk() {
					that.$message.loading('删除用户', 0)
					return postDeleteAccountTypeByList(that.deleteArr)
						.then((res) => {
							if (res.messageCode == 'ok') {
								that.$message.destroy()
								that.$message.success('删除成功!', 2)
								that.AccountTypesData()
							} else {
								that.$message.destroy()
								that.$message.error('删除失败', 2)
							}
						})
						.catch((err) => {
							that.$message.destroy()
							that.$message.error('删除失败', 2)
							console.log(err)
						})
				},
				onCancel() {}
			})
		},
		newType() {
			this.modalvisible = true
			this.modalTitle = '添加类型'
			this.modalState = false
		},
		onSearch(value) {
			if (value == '') {
				this.AccountTypesData()
			} else {
				getAccountTypeByTitle({ value })
					.then((res) => {
						if (res.messageCode == 'ok') {
							if ('accountsType' in res.data) {
								let arr = []
								const { accountsType } = res.data
								accountsType['key'] = accountsType['aid_t']
								arr.push(accountsType)
								this.pageAndTableData.tableData = arr
							}
						}
						console.log(res)
					})
					.catch((err) => {
						console.log(err)
					})
			}
		},
		pageChange(current) {
			this.pageAndTableData.currentPage = current
			this.AccountTypesData()
		},
		updateOne(ele) {
			const cp = JSON.stringify(ele)
			const cpdata = JSON.parse(cp)
			this.accountType = cpdata
			this.modalvisible = true
			this.modalTitle = '修改类型'
			this.modalState = true
		},
		deleteOne(id) {
			let that = this
			this.$confirm({
				title: '确认删除?',
				content: '确认删除后,将无法恢复!',
				onOk() {
					that.$message.loading('删除用户', 0)
					return postDeleteAccountType({ aid_t: id })
						.then((res) => {
							if (res.messageCode == 'ok') {
								that.$message.destroy()
								that.$message.success('删除成功!', 2)
								that.AccountTypesData()
							} else {
								that.$message.destroy()
								that.$message.error('删除失败', 2)
							}
						})
						.catch((err) => {
							that.$message.destroy()
							that.$message.error('删除失败', 2)
							console.log(err)
						})
				},
				onCancel() {}
			})
		}
	}
}
</script>

<style scoped>
.container {
	width: 100%;
	height: 100%;
}
</style>
