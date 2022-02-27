<template>
	<div class="container">
		<Chart class="charts" :chartModule="chartModule">
			<template v-slot:main>
				<CountMessageFormat
					v-for="(item, index) in barMessageFormatList"
					:key="index"
					:messageFormat="item"
					@checked="onBarChecked"
				/>
			</template>
		</Chart>
		<Chart class="charts" :chartModule="pieModule" />
	</div>
</template>

<script>
import Chart from '../components/Chart/Chart.vue'
import CountMessageFormat from '../components/CountMessageFormat/CountMessageFormat.vue'
export default {
	components: { Chart, CountMessageFormat },
	methods: {
		onBarChecked(checked, type) {
			const index = this.barList.indexOf(type)
			if (checked) {
				this.barList.push(type)
			} else {
				this.barList.splice(index, 1)
			}
			console.log(this.barList)
		}
	},
	data() {
		return {
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
</style>
