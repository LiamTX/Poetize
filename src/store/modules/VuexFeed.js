import axios from '../../utils/axios';

export default {
    namespaced: true,
    state: {
        poems: []
    },
    getters: {
        poemsData: state => state.poems
    },
    mutations: {
        setPoems(state, data){
            state.poems = data
        }
    },
    actions: {
        async getPoems(context){
            const poems = await axios.get(process.env.VUE_APP_BASE_URL+'/poems');

            await context.commit('setPoems', poems.data);

            return poems.data;
        }
    }
}