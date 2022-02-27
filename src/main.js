import Vue from 'vue'
import App from './App.vue'
// 按需加载 ant ui
import {
	Button,
	message,
	Menu,
	Icon,
	PageHeader,
	Input,
	Table,
	Tag,
	Divider,
	Pagination,
	Modal,
	Drawer,
	Form,
	Select,
	Checkbox
} from 'ant-design-vue'
// 导入 vue-router
import router from './router/index'
// vuex
import store from './store/index'
//导入全局样式
import './assets/css/global.css'
// 注册echarts
import * as echarts from 'echarts/core'
// 引入柱状图 图标
import { BarChart, PieChart, LineChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	//DatasetComponentOption,
	TransformComponent
} from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	BarChart,
	LabelLayout,
	UniversalTransition,
	CanvasRenderer,
	PieChart,
	LineChart
])

Vue.prototype.echarts = echarts

Vue.config.productionTip = false

/* v1.1.3+ 自动注册Button下组件，如Button.Group */
Vue.use(Button)
	.use(Menu)
	.use(Icon)
	.use(PageHeader)
	.use(Input)
	.use(Table)
	.use(Tag)
	.use(Divider)
	.use(Pagination)
	.use(Modal)
	.use(Drawer)
	.use(Form)
	.use(Select)
	.use(Checkbox)
	.use(Modal)

Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm

new Vue({
	store,
	router,
	render: (h) => h(App)
}).$mount('#app')
