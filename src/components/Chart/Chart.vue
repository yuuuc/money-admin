<template>
	<div class="chart_item">
		<div class="chart-box" ref="chartBox"></div>
		<div class="main">main</div>
		<div class="footer">footer</div>
	</div>
</template>

<script>
export default {
	props: {
		chartModule: {
			type: Object,
			required: true,
		},
	},
	mounted() {
		if (this.chartModule.data != null) {
			let chartBox = this.$refs.chartBox;
			var myChart = this.echarts.init(chartBox);
			myChart.setOption(this.chartModule.data);
		}
	},
};
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
	width: 150px;
}
</style>
