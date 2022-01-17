<template>
	<div class="chart-box" ref="chartBox"></div>
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
			console.log(this.chartModule.data);
			let chartBox = this.$refs.chartBox;
			console.log(chartBox);
			var myChart = this.echarts.init(chartBox);
			myChart.setOption(this.chartModule.data);
		}
	},
};
</script>

<style>
.chart-box {
	margin: 10px 20px;
	box-sizing: border-box;
	border-radius: 5px;
	border: 1px solid #ddd;
	min-width: 300px;
	max-width: 400px;
	height: 400px;
	flex: 1;
}
</style>
