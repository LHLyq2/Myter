import {state} from './state'
import {mutations} from './mutaitions.js'
import {getters} from './getters'

export const menuModule = {
    namespaced: true,
    state,
    mutations,
    getters
}