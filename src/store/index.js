import Vuex from 'vuex'
import Vue from 'vue'

import actions from './actions'
import mutations from './mutataions'
import getters from './getters'

Vue.use(Vuex)

const state = {}

const vuex = new Vuex.Store({
	state,
	actions,
	getters,
	mutations
})

export default vuex
