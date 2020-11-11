import { v4 as uuidv4 } from 'uuid';
import http from '../http'
import {newProducts} from "../app";
export default {
    state: {
        discountCards: [],
        discountCardsBrands: [],
    },

    getters: {
        getDiscountCards: state => state.discountCards,
        getDiscountCardsBrands: state => state.discountCardsBrands,
    },

    mutations: {
        setDiscountCards(state, value) {
            state.discountCards = value
        },
        setDiscountCardsBrands(state, value) {
            state.discountCardsBrands = value
        },
        setAddedDiscountCards(state, value) {
            state.discountCards.push(value)
        },
    },

    actions: {
        async fetchDiscountCards({commit}) {
            try {
                await http.get('/api/discount-card')
                    .then(res => commit('setDiscountCards',res.data.data))
                    .catch(error => console.log(error));
            } catch (e) {}
        },
        async fetchDiscountCardsBrands({commit}) {
            try {
                await http.get('/api/discount-card/brands')
                    .then(res => commit('setDiscountCardsBrands', res.data.data))
                    .catch(error => console.log(error));
            } catch (e) {}
        },
        async addDiscountCards({commit}, data) {
            try {
                await http.post('/api/discount-card', data)
                    .then(res => commit('setAddedDiscountCards', res.data.data))
                    .catch(error => console.log(error));
                return true
            } catch (e) {
                return false
            }
        },

    }
}
