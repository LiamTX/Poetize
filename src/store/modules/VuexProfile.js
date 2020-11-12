import axios from '../../utils/axios';

export default {
    namespaced: true,
    state: {
        user: '',
        poems: '',
        likes: '',
    },
    getters: {

    },
    mutations: {
        setUser(state, data) {
            state.user = data
        },
        setPoems(state, data){
            state.poems = data;
        },
        setLikes(state, data){
            state.poems = data;
        },
        deletePoem(state, data){
            state.poems.splice(data, 1);
        }
    },
    actions: {
        async getThisUser(context) {
            const user = await axios.get(process.env.VUE_APP_BASE_URL + '/users/this');

            await context.commit('setUser', user.data);
        },
        async getMyPoems(context){
            const poems = await axios.get(process.env.VUE_APP_BASE_URL + '/poems/my');

            await context.commit('setPoems', poems.data);           
        },
        async update(context, data) {
            const response = await axios.put(process.env.VUE_APP_BASE_URL + '/users', data);

            return response;
        },
        async getMyLikes(context){
            const response = await axios.get(process.env.VUE_APP_BASE_URL + '/users/likes');

            return response;
        }
    }
}