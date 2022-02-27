import axios from 'axios'
import store from '../store/index'
import router from '../router/index'
import { REMOVETOKEN } from '../store/mutation-type'

const http = axios.create({
	timeout: 5000,
	baseURL: 'http://localhost:8080/'
})

// 请求拦截器
http.interceptors.request.use(
	(config) => {
		console.log(localStorage.getItem('uid'))
		config.headers.Auth = localStorage.getItem('uid')
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// 响应拦截器
http.interceptors.response.use(
	(response) => {
		return response.data
	},
	(error) => {
		if (error.response.status == 401) {
			store.commit(REMOVETOKEN)
			router.replace('/login')
			return Promise.reject('登录状态过期!')
		} else {
			return Promise.reject(error)
		}
	}
)

export default http
