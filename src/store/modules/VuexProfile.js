import axios from '../../utils/axios';

export default {
    namespaced: true,
    state: {    
        user: ''
    },
    getters: {

    },
    mutations: {
        setUser(state, data) {
            state.user = data
        }
    },
    actions: {
        async getThisUser(context) {
            const user = await axios.get(process.env.VUE_APP_BASE_URL + '/users/this');

            await context.commit('setUser', user.data);
        }
    }
}