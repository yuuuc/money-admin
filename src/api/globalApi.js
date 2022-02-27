import http from '../http/index'

const LOGIN = '/login'
export function httpLogin(data) {
	return http.post(LOGIN, data)
}
