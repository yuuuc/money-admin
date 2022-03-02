<template>
	<div class="container">
		<!-- header -->
		<Header
			@search="onSearch"
			:TitlAndSubTitle="TitlAndSubTitle"
			:isLoading="isLoading"
			@delChecked="delcheck"
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
			title="修改记录"
			:visible="updateAccountvisible"
			:confirm-loading="updateAccountconfirmLoading"
			@ok="updateAccountHandle"
			@cancel="updateAccountHandleCancel"
			v-if="accountTypes.length > 0"
		>
			<div class="update_row">
				<div class="label">类型:</div>
				<a-dropdown-button>
					{{ updateAccount.type }}
					<a-menu slot="overlay" @click="handleMenuClick">
						<a-menu-item v-for="item in accountTypes" :key="item.aid_t">
							{{ item.title }}
						</a-menu-item>
					</a-menu>
				</a-dropdown-button>
			</div>
			<div class="update_row">
				<div class="label">收支:</div>
				<a-dropdown-button>
					{{ updateAccount.inOut }}
					<a-menu slot="overlay" @click="handleMenuInOutClick">
						<a-menu-item key="1"> 收入 </a-menu-item>
						<a-menu-item key="0"> 支出 </a-menu-item>
					</a-menu>
				</a-dropdown-button>
			</div>
			<div class="update_row">
				<div class="label">金额:</div>
				<a-input class="input" v-model="updateAccount.money" />
			</div>
		</a-modal>
	</div>
</template>

<script>
import Table from '../components/Table/Table.vue'
import Header from '../components/Header/Header.vue'
import {
	getAccounts,
	postUpdateAccount,
	postDeleteAccountOne,
	postDeleteAccountList,
	getSearchAccountByUser
} from '../api/accountApi'
import { getAccountTypes } from '../api/AccountTypeApi'
export default {
	components: { Header, Table },
	data() {
		return {
			TitlAndSubTitle: {
				title: '收支管理',
				newIsShow: false
			},
			accountTypes: [],
			updateAccountvisible: false,
			updateAccountconfirmLoading: false,
			updateAccount: {},
			isLoading: false,
			deleteArr: [],
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
			pageAndTableData: {
				allRecord: 0,
				allPage: 0,
				currentPage: 0,
				size: 0,
				tableData: []
			},
			columns: [
				{
					dataIndex: 'username',
					key: 'username',
					slots: { title: 'customTitle' },
					scopedSlots: { customRender: 'name' },
					width: 100,
					align: 'center'
				},
				{
					title: '类型',
					dataIndex: 'type',
					key: 'type',
					width: 100,
					align: 'center'
				},
				{
					title: '金额',
					dataIndex: 'money',
					key: 'money',
					width: 100,
					align: 'center'
				},
				{
					title: '收入/支出',
					dataIndex: 'inOut',
					key: 'inOut',
					width: 100,
					align: 'center'
				},
				{
					title: '时间',
					dataIndex: 'time',
					key: 'time',
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
		this.getAccountData()
		this.getAllAccountType()
	},
	methods: {
		handleMenuInOutClick(ele) {
			if (ele.key == 1) {
				this.updateAccount.inOut = '收入'
			} else {
				this.updateAccount.inOut = '支出'
			}
			this.updateAccount.isOut = ele.key
		},
		handleMenuClick(ele) {
			const record = this.accountTypes.find((item) => item.aid_t == ele.key)
			this.updateAccount.type = record.title
			this.updateAccount.aid_t = record.aid_t
		},
		updateAccountHandle() {
			postUpdateAccount(this.updateAccount)
				.then((res) => {
					if (res.messageCode == 'ok') {
						this.$message.success('修改成功', 2)
					} else {
						this.$message.error('修改失败', 2)
					}
					this.getAccountData()
					this.updateAccountHandleCancel()
				})
				.catch((err) => {
					console.log(err)
					this.$message.error('修改失败', 2)
				})
		},
		updateAccountHandleCancel() {
			this.updateAccountvisible = false
			this.updateAccount = {}
		},
		getAllAccountType() {
			getAccountTypes()
				.then((res) => {
					const { accountsTypes } = res.data
					if (res.messageCode == 'ok') {
						this.accountTypes = accountsTypes
					}
				})
				.catch((err) => {
					console.log(err)
				})
		},
		getAccountData() {
			getAccounts({ current: this.pageAndTableData.currentPage })
				.then((res) => {
					if (res.messageCode == 'ok') {
						const { current, pages, size, total, records } =
							res.data.accountPage
						this.pageAndTableData.allRecord = total
						this.pageAndTableData.size = size
						this.pageAndTableData.allPage = pages
						this.pageAndTableData.currentPage = current
						this.pageAndTableData.tableData = this.formatAccountData(records)
					}
				})
				.catch((err) => {
					console.log(err)
				})
		},
		formatAccountData(data) {
			return data.map((item) => {
				item['key'] = item['aid']
				if (item['isOut'] == 1) {
					item['inOut'] = '收入'
				} else {
					item['inOut'] = '支出'
				}
				return item
			})
		},
		pageChange(currentPage) {
			this.pageAndTableData.currentPage = currentPage
			this.getAccountData()
		},
		deleteOne(id) {
			let that = this
			this.$confirm({
				title: '确认删除?',
				content: '确认删除后,将无法恢复!',
				onOk() {
					that.$message.loading('删除记录')
					return postDeleteAccountOne({ aid: id })
						.then((res) => {
							if (res.messageCode == 'ok') {
								that.$message.destroy()
								that.$message.success('删除成功', 2)
							} else {
								that.$message.destroy()
								that.$message.error('删除失败', 2)
							}
							that.getAccountData()
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
		updateOne(data) {
			this.updateAccountvisible = true
			const cp = JSON.stringify(data)
			const cpdata = JSON.parse(cp)
			this.updateAccount = cpdata
		},
		onSearch(value) {
			if (value == '') {
				this.getAccountData()
			} else {
				this.isLoading = true
				getSearchAccountByUser({ search: value })
					.then((res) => {
						if (res.messageCode == 'ok') {
							const { current, pages, size, total, records } =
								res.data.accountPage
							this.pageAndTableData.allRecord = total
							this.pageAndTableData.size = size
							this.pageAndTableData.allPage = pages
							this.pageAndTableData.currentPage = current
							this.pageAndTableData.tableData = this.formatAccountData(records)
							this.isLoading = false
						} else {
							this.$message.error('查询失败!')
							this.pageAndTableData.tableData = []
						}
					})
					.catch((err) => {
						this.$message.error('查询失败!')
						console.log(err)
					})
			}
		},
		delcheck() {
			if (this.deleteArr.length <= 0) {
				this.$message.warning('请先选择要删除的数据', 2)
				return
			}
			let that = this
			this.$confirm({
				title: '确认删除?',
				content: '确认删除后,将无法恢复!',
				onOk() {
					that.$message.loading('删除记录')
					return postDeleteAccountList(that.deleteArr)
						.then((res) => {
							if (res.messageCode == 'ok') {
								that.$message.destroy()
								that.$message.success('删除成功', 2)
							} else {
								that.$message.destroy()
								that.$message.error('删除失败', 2)
							}
							that.getAccountData()
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
.update_row {
	display: flex;
	margin: 5px 0px;
}
.update_row > .label {
	text-align: center;
	line-height: 32px;
	width: 50px;
}
.update_row > .input {
	width: 200px;
}
</style>
