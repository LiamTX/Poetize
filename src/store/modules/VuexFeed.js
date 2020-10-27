import axios from '../../utils/axios';

export default {
    namespaced: true,
    state: {
        poems: []
    },
    mutations: {
        setPoems(state, data){
            state.poems.push(data)
        }
    },
    actions: {
        async getPoems(context){
            const poems = await axios.get(process.env.VUE_APP_BASE_URL+'/api/poems');

            await context.commit('setPoems', poems.data);

            return poems.data;
        }
    }
}