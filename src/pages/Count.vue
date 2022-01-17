<template>
	<div class="container">
		<Chart :chartModule="chartModule" />
		<Chart :chartModule="chartModule" />
		<Chart :chartModule="chartModule" />
		<Chart :chartModule="chartModule" />
	</div>
</template>

<script>
import Chart from "../components/Chart/Chart.vue";
export default {
	data() {
		return {
			chartModule: {
				desc: "test ",
				data: {
					title: {
						text: "ECharts 入门示例",
					},
					tooltip: {},
					xAxis: {
						data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
					},
					yAxis: {},
					series: [
						{
							name: "销量",
							type: "bar",
							data: [5, 20, 36, 10, 10, 20],
						},
					],
				},
			},
		};
	},
	components: {
		Chart,
	},
};
</script>

<style scoped>
.container {
	width: 100%;
	height: 100%;
	display: grid;
	/*  声明列的宽度  */
	grid-template-columns: repeat(4, 400px);
	/*  声明行间距和列间距  */
	grid-gap: 20px;
	/*  声明行的高度  */
	grid-template-rows: 400px 400px;
}
@media screen {
	
}
</style>
