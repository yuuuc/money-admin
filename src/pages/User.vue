<template>
	<div class="container">
		<!-- header -->
		<Header
			@search="onSearch"
			:TitlAndSubTitle="TitlAndSubTitle"
			:isLoading="isLoading"
			@delChecked="delChecked"
			@newObject="newUser"
		/>

		<!-- table -->
		<Table
			:columns="columns"
			:pageAndTableData="pageAndTableData"
			:rowSelection="rowSelection"
			@currentPage="pageChange"
			@updateOne="updateOne"
			@deleteOne="deleteOne"
		></Table>

		<Drawer :newUserDrawer="newUserDrawer">
			<template v-slot:main> <NewUserForm @putUser="putUser" /> </template>
		</Drawer>

		<a-modal
			title="修改用户"
			:visible="updateUservisible"
			:confirm-loading="updateUserconfirmLoading"
			@ok="updateUserHandle"
			@cancel="updateUserHandleCancel"
		>
			<div class="update_row">
				<div class="label">姓名:</div>
				<a-input class="input" v-model="updateUser.name" />
			</div>
			<div class="update_row">
				<div class="label">账号:</div>
				<a-input class="input" v-model="updateUser.username" />
			</div>
			<div class="update_row">
				<div class="label">电话:</div>
				<a-input class="input" v-model="updateUser.tel" />
			</div>
			<div class="update_row">
				<div class="label">密码:</div>
				<a-input class="input" v-model="updateUser.password" />
			</div>
		</a-modal>
	</div>
</template>

<script>
import Table from '../components/Table/Table.vue'
import Header from '../components/Header/Header.vue'
import Drawer from '../components/Drawer/Drawer.vue'
import NewUserForm from '../components/NewUserForm/NewUserForm.vue'
import {
	getUsers,
	getUserBySearch,
	postNewUser,
	postDeleteUser,
	postUpdateUser,
	postDeleteUsers
} from '../api/userApi'
export default {
	components: { Table, Header, Drawer, NewUserForm },
	created() {
		this.UsersData()
	},
	data() {
		return {
			updateUservisible: false,
			updateUserconfirmLoading: false,
			deleteArr: [],
			updateUser: {
				uid: '',
				name: '',
				username: '',
				password: '',
				tel: ''
			},
			TitlAndSubTitle: {
				title: '用户管理',
				subTitle: '',
				newIsShow: true
			},
			isLoading: false,
			// newUser对象
			newUserDrawer: {
				visible: false,
				onClose: () => {
					this.newUserDrawer.visible = false
				}
			},
			columns: [
				{
					dataIndex: 'name',
					key: 'name',
					slots: { title: 'customTitle' },
					scopedSlots: { customRender: 'name' },
					width: 100,
					align: 'center'
				},
				{
					title: '账号',
					dataIndex: 'username',
					key: 'username',
					width: 100,
					align: 'center'
				},
				{
					title: '手机号',
					dataIndex: 'tel',
					key: 'tel',
					width: 100
				},
				{
					title: '创建时间',
					key: 'createTime',
					dataIndex: 'createTime',
					width: 100
				},
				{
					title: '操作',
					key: 'action',
					scopedSlots: { customRender: 'action' },
					width: 350
				}
			],
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
			}
		}
	},
	methods: {
		updateUserHandleCancel() {
			this.updateUser = {
				uid: '',
				name: '',
				username: '',
				password: '',
				tel: ''
			}
			this.updateUservisible = false
			this.updateUserconfirmLoading = false
		},
		updateUserHandle() {
			this.updateUserconfirmLoading = true
			postUpdateUser(this.updateUser)
				.then((res) => {
					console.log(res)
					if (res.messageCode == 'ok') {
						this.$message.success('修改成功', 2)
					} else {
						this.$message.error('修改失败', 2)
					}
					this.updateUserHandleCancel()
					this.UsersData()
				})
				.catch((err) => {
					this.$message.error('修改失败', 2)
					console.log(err)
				})
		},
		updateOne(data) {
			const { key, name, username, tel } = data
			this.updateUser.uid = key
			this.updateUser.name = name
			this.updateUser.username = username
			this.updateUser.tel = tel
			this.updateUservisible = true
		},
		deleteOne(id) {
			let that = this
			this.$confirm({
				title: '确认删除?',
				content: '确认删除后,将无法恢复!',
				onOk() {
					that.$message.loading('删除用户', 0)
					return postDeleteUser({ uid: id })
						.then((res) => {
							if (res.messageCode == 'ok') {
								that.$message.destroy()
								that.$message.success('删除成功', 2)
							} else {
								that.$message.destroy()
								that.$message.error('删除失败', 2)
							}
							that.UsersData()
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
		UsersData() {
			const { currentPage: current } = this.pageAndTableData
			getUsers({ current })
				.then((res) => {
					this.tableRender(res.data.userPage)
				})
				.catch((err) => {
					console.log(err)
				})
		},
		tableRender(data) {
			const { total, pages, current, records, size } = data
			this.pageAndTableData.allRecord = total
			this.pageAndTableData.allPage = pages
			this.pageAndTableData.currentPage = current
			this.pageAndTableData.size = size
			this.pageAndTableData.tableData = this.dataFormat(records)
		},
		dataFormat(data) {
			return data.map((item) => {
				let temp = {}
				temp['key'] = item['uid']
				temp['createTime'] = item['create_time']
				temp['name'] = item['name']
				temp['tel'] = item['tel']
				temp['username'] = item['username']
				return temp
			})
		},
		pageChange(currentPage) {
			this.pageAndTableData.currentPage = currentPage
			this.UsersData()
		},
		putUser(user) {
			this.$message.loading('添加用户', 0)
			postNewUser(user)
				.then((res) => {
					if (res.messageCode == 'ok') {
						this.$message.destroy()
						this.$message.success('添加成功', 1)
					} else {
						this.$message.destroy()
						this.$message.error('添加失败', 1)
					}
					this.UsersData()
				})
				.catch((err) => {
					this.$message.destroy()
					this.$message.error('添加失败', 1)
					console.log(err)
				})
		},
		onSearch(value) {
			this.isLoading = true
			if (value == '') {
				this.UsersData()
				this.isLoading = false
				return
			}
			getUserBySearch({ value })
				.then((res) => {
					this.tableRender(res.data.userPage)
					this.isLoading = false
				})
				.catch((err) => {
					console.log(err)
				})
		},
		delChecked() {
			if (this.deleteArr.length <= 0) {
				this.$message.warning('未选中要删除的对象', 3)
				return
			}
			let that = this
			this.$confirm({
				title: '确认删除?',
				content: '确认删除后,将无法恢复!',
				onOk() {
					that.$message.loading('删除用户')
					return postDeleteUsers(that.deleteArr)
						.then((res) => {
							if (res.messageCode == 'ok') {
								that.$message.destroy()
								that.$message.success('删除成功', 2)
							} else {
								that.$message.destroy()
								that.$message.error('删除失败', 2)
							}
							that.UsersData()
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
		newUser() {
			this.newUserDrawer.visible = true
		}
	},
	computed: {
		// newTableData() {},
	}
}
</script>

<style scoped>
.must {
	color: red;
}
tr:last-child td {
	padding-bottom: 0;
}
/* .table_continar {
	width: 100%;
	padding: 20px;
	padding-bottom: 0px;
	position: relative;
	height: 100%;
} */
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
	flex: 1;
}
</style>
