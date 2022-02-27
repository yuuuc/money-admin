import { LOGIN, REMOVETOKEN } from './mutation-type'
const mutations = {
	[LOGIN](state, uid) {
		window.localStorage.setItem('uid', uid)
		state.uid = uid
	},
	[REMOVETOKEN](state) {
		state.uid = ''
		window.localStorage.removeItem('uid')
	}
}
export default mutations
