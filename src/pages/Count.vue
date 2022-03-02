<template>
	<div class="container">
		<Chart
			class="charts"
			@save="barSave"
			:chartModule="chartModule"
			@newMessage="newHandle"
		>
			<template v-slot:main>
				<CountMessageFormat
					v-for="(item, index) in barData"
					:key="index"
					:messageFormat="item"
					@checked="onBarChecked"
					@deleteOne="deleteOne"
				/>
			</template>
		</Chart>
		<Chart
			class="charts"
			:chartModule="pieModule"
			@save="pieSave"
			@newMessage="newHandle"
		>
			<template v-slot:main>
				<CountMessageFormat
					v-for="(item, index) in pieData"
					:key="index"
					:messageFormat="item"
					@checked="onPieChecked"
					@deleteOne="deleteOne"
				/>
			</template>
		</Chart>

		<a-modal
			title="添加格式"
			:visible="addMessageFormatvisible"
			:confirm-loading="addMessageFormatLoading"
			@ok="addMessageFormatHandle"
			@cancel="addMessageFormatHandleCancel"
		>
			<div class="addMessageFormat">
				<div class="title">标题</div>
				<div class="description">显示内容</div>
				<div class="checkbox">操作</div>
			</div>
			<div class="addMessageFormat">
				<a-input class="title" v-model="messageFormat.title" />
				<a-input class="description" v-model="messageFormat.description" />
				<a-checkbox class="checkbox" v-model="messageFormat.isShow">
					勾选展示
				</a-checkbox>
			</div>
		</a-modal>
	</div>
</template>

<script>
import Chart from '../components/Chart/Chart.vue'
import CountMessageFormat from '../components/CountMessageFormat/CountMessageFormat.vue'
import {
	getMessageFormats,
	postUpdateMessageFormats,
	postInsertMessageFormat,
	postDeleteOneMessageFormat
} from '../api/countApi'
export default {
	components: { Chart, CountMessageFormat },
	created() {
		this.getAllMessageFormat()
	},
	methods: {
		deleteOne(id) {
			postDeleteOneMessageFormat({ cmid: id })
				.then((res) => {
					if (res.messageCode == 'ok') {
						this.$message.success('删除成功', 2)
						this.getAllMessageFormat()
					} else {
						this.$message.error('删除失败', 2)
					}
				})
				.catch((err) => {
					console.log(err)
				})
		},
		getAllMessageFormat() {
			getMessageFormats()
				.then((res) => {
					console.log(res)
					this.allMessageFormat = res.data.messageFormats
				})
				.catch((err) => {
					console.log(err)
				})
		},
		onBarChecked(record) {
			this.allMessageFormat.find((item) => item.cmid === record.cmid).isShow =
				record.isShow == 1 ? 0 : 1
		},
		onPieChecked(record) {
			this.allMessageFormat.find((item) => item.cmid === record.cmid).isShow =
				record.isShow == 1 ? 0 : 1
		},
		newHandle(parentid) {
			this.messageFormat.parentid = parentid
			this.addMessageFormatvisible = true
		},
		barSave() {
			postUpdateMessageFormats(this.barData)
				.then((res) => {
					if (res.messageCode == 'ok') {
						this.$message.success('保存成功!', 2)
						this.getAllMessageFormat()
					} else {
						this.$message.error('保存失败', 2)
					}
				})
				.catch((err) => {
					this.$message.error('保存失败!', 2)
					console.log(err)
				})
		},
		pieSave() {
			postUpdateMessageFormats(this.pieData)
				.then((res) => {
					if (res.messageCode == 'ok') {
						this.$message.success('保存成功!', 2)
						this.getAllMessageFormat()
					} else {
						this.$message.error('保存失败!', 2)
					}
				})
				.catch((err) => {
					this.$message.error('保存失败!', 2)
					console.log(err)
				})
		},
		addMessageFormatHandle() {
			if (
				this.messageFormat.title == '' ||
				this.messageFormat.description == ''
			) {
				this.$message.error('请填写标题和显示内容!', 2)
				return
			}

			const cp = JSON.stringify(this.messageFormat)
			const cpData = JSON.parse(cp)
			cpData.isShow = cpData.isShow == true ? 1 : 0
			console.log(cpData)
			postInsertMessageFormat(cpData)
				.then((res) => {
					if (res.messageCode == 'ok') {
						this.$message.success('添加成功', 2)
						this.addMessageFormatHandleCancel()
						this.getAllMessageFormat()
					} else {
						this.$message.error('添加失败', 2)
					}
				})
				.catch((err) => {
					this.$message.error('添加失败', 2)
					console.log(err)
				})
		},
		addMessageFormatHandleCancel() {
			this.addMessageFormatvisible = false
			this.messageFormat.title = ''
			this.messageFormat.description = ''
			this.messageFormat.isShow = false
			this.messageFormat.parentid = ''
		}
	},
	computed: {
		barData() {
			return this.allMessageFormat.filter((item) => item.parentid == 1)
		},
		pieData() {
			return this.allMessageFormat.filter((item) => item.parentid == 2)
		}
	},
	data() {
		return {
			addMessageFormatvisible: false,
			addMessageFormatLoading: false,
			allMessageFormat: [],
			messageFormat: {
				title: '',
				description: '',
				isShow: false,
				parentid: ''
			},
			barList: [],
			barMessageFormatList: [
				{
					id: 1,
					type: 'maxIn',
					value: '',
					placeholder: '输入需要展示给用户的格式！',
					title: '最高收入',
					maxLength: 50
				}
			],

			chartModule: {
				desc: 'test ',
				parentid: 1,
				data: {
					title: {
						text: '柱状图'
					},
					tooltip: {},
					xAxis: {
						data: [
							'1月',
							'2月',
							'3月',
							'4月',
							'5月',
							'6月',
							'7月',
							'8月',
							'9月',
							'10月',
							'11月',
							'12月',
							'1月',
							'2月',
							'3月',
							'4月',
							'5月',
							'6月',
							'7月',
							'8月',
							'9月',
							'10月',
							'11月',
							'12月',
							'6月',
							'7月',
							'8月',
							'9月',
							'10月',
							'11月',
							'12月'
						]
					},
					yAxis: {},
					series: [
						{
							name: '月份',
							type: 'bar',
							data: [
								5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 5, 10,
								15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 5, 10, 15, 20,
								25, 30, 35, 40, 45
							]
						}
					]
				}
			},
			pieModule: {
				desc: 'test ',
				parentid: 2,
				data: {
					title: {
						text: '饼图'
					},
					series: [
						{
							type: 'pie',
							data: [
								{
									value: 335,
									name: '直接访问'
								},
								{
									value: 234,
									name: '联盟广告'
								},
								{
									value: 1548,
									name: '搜索引擎'
								}
							]
						}
					]
				}
			}
		}
	}
}
</script>

<style scoped>
.container {
	width: 100%;
	height: 100%;
	padding: 10px;
}
.charts {
	height: 350px;
	width: 100%;
	margin: 10px 0px;
}
/* .container > div {
	justify-self: center;
	align-self: center;
} */
.addMessageFormat {
	display: flex;
	justify-content: center;
	align-items: center;
}
.addMessageFormat > * {
	margin-right: 10px;
}
.addMessageFormat > .title {
	width: 70px;
}
.addMessageFormat > .description {
	flex: 1;
}
.addMessageFormat > .checkbox {
	width: 100px;
}
</style>
