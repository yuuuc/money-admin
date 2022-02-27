<template>
	<div class="chart_item">
		<div class="chart-box" ref="chartBox"></div>
		<div class="main slot-box">
			<slot name="main"></slot>
		</div>
		<div class="footer slot-box">
			<a-button class="button" type="primary" @click="newMessage">
				新增
			</a-button>
			<a-button class="button" @click="save"> 保存 </a-button>
			<a-button class="button" type="danger" @click="delChecked">
				删除
			</a-button>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
	props: {
		chartModule: {
			type: Object,
			required: true
		}
	},
	data() {
		return {}
	},
	methods: {
		newMessage() {
			this.$confirm({
				title: 'Do you want to delete these items?',
				content:
					'When clicked the OK button, this dialog will be closed after 1 second',
				onOk() {
					return new Promise((resolve, reject) => {
						setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
					}).catch(() => console.log('Oops errors!'))
				},
				onCancel() {}
			})
		},
		save() {
			this.$confirm({
				title: 'Do you want to delete these items?',
				content:
					'When clicked the OK button, this dialog will be closed after 1 second',
				onOk() {
					return new Promise((resolve, reject) => {
						setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
					}).catch(() => console.log('Oops errors!'))
				},
				onCancel() {}
			})
		},
		delChecked() {
			this.$confirm({
				title: 'Do you want to delete these items?',
				content:
					'When clicked the OK button, this dialog will be closed after 1 second',
				onOk() {
					return new Promise((resolve, reject) => {
						setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
					}).catch(() => console.log('Oops errors!'))
				},
				onCancel() {}
			})
		}
	},
	mounted() {
		if (this.chartModule.data != null) {
			let chartBox = this.$refs.chartBox
			var myChart = this.echarts.init(chartBox)
			myChart.setOption(this.chartModule.data)
		}
	}
}
</script>

<style scoped>
.chart_item {
	display: flex;
	border: 1px solid #ddd;
	border-radius: 5px;
}

.chart-box {
	padding: 20px 0px 0px 0px;
	border-right: 1px #ddd solid;
	height: 350px;
	width: 550px;
	margin-left: 10px;
}

.main {
	margin: 0px 5px;
	border-right: 1px #ddd solid;
	flex: 1;
}

.footer {
	width: 300px;
	margin: 0 auto;
}

.button {
	display: block;
	width: 100%;
	margin: 10px;
}

.slot-box {
	padding: 20px;
}
</style>
