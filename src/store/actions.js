import { httpLogin } from '../api/globalApi'
import { LOGIN } from './mutation-type'
const actions = {
	/**
	 *
	 * @param {commit,dispatch,getters,rootGetters,rootState,state} context
	 * @param {username,password} params
	 */
	login(context, params) {
		return new Promise((resolve, reject) => {
			httpLogin(params)
				.then((res) => {
					console.log(res)
					context.commit(LOGIN, res.data.uid)
					resolve(res)
				})
				.catch((err) => {
					reject(err)
				})
		})
	}
}

export default actions
