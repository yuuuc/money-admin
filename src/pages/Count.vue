<template>
	<div class="container">
		<Chart :chartModule="chartModule" />
		<Chart :chartModule="pieModule" />
		<Chart :chartModule="categoryModule" />
		<!-- <Chart :chartModule="chartModule" /> -->
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
						text: "柱状图",
					},
					tooltip: {},
					xAxis: {
						data: [
							"1月",
							"2月",
							"3月",
							"4月",
							"5月",
							"6月",
							"7月",
							"8月",
							"9月",
							"10月",
							"11月",
							"12月",
						],
					},
					yAxis: {},
					series: [
						{
							name: "月份",
							type: "bar",
							data: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
						},
					],
				},
			},
			pieModule: {
				desc: "test ",
				data: {
					title: {
						text: "饼图",
					},
					series: [
						{
							type: "pie",
							data: [
								{
									value: 335,
									name: "直接访问",
								},
								{
									value: 234,
									name: "联盟广告",
								},
								{
									value: 1548,
									name: "搜索引擎",
								},
							],
						},
					],
				},
			},
			categoryModule: {
				desc: "test ",
				data: {
					title: {
						text: "折线图",
					},
					tooltip: {},
					xAxis: {
						type: "category",
						data: ["A", "B", "C"],
					},
					yAxis: {
						type: "value",
					},
					series: [
						{
							data: [120, 200, 150],
							type: "line",
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
	grid-template-columns: 1 1fr;
	/*  声明行间距和列间距  */
	grid-gap: 10px;
	/*  声明行的高度  */
	grid-template-rows: 350px;
	overflow-y: scroll;
}
/* .container > div {
	justify-self: center;
	align-self: center;
} */
</style>
