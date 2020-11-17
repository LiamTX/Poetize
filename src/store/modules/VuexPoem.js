
import { mapActions } from 'vuex';
import axios from '../../utils/axios';

export default {
    namespaced: true,
    state: {
        poems: [],
        likes: [],
    },
    getters: {
        poemsData: state => state.poems
    },
    mutations: {
        setLikes(state, data){
            state.likes = data;
        }
    },
    actions: {
        async register(context, data){
            const poem = await axios.post(process.env.VUE_APP_BASE_URL+'/poems', data);

            return poem;
        },
        async like(context, data){
            const like = await axios.post(process.env.VUE_APP_BASE_URL + `/poems/like/${data}`);

            return like;
        },
        async dislike(context, data){
            const dislike = await axios.delete(process.env.VUE_APP_BASE_URL + `/poems/like/${data}`);

            return dislike;
        },
        async delete(context, data){
            const response = await axios.delete(process.env.VUE_APP_BASE_URL + `/poems/${data}`);

            return response;
        },
        async getThisLikes(context, data){
            const response = await axios.get(process.env.VUE_APP_BASE_URL + `/poems/like/${data}`);

            await context.commit('setLikes', response.data);

            return response;
        }
    }
}