import axios from '../../util/axios'

export default {
    namespaced: true,
    state: {
        poems: []
    },
    mutations: {
        poemsPush(state, payload){
            state.poems.push(payload);
        }
    },
    actions: {
        async getPoems(context){
            const poems = await axios.get(process.env.VUE_APP_BASE_URL+'/poems');

            context.commit('poemsPush', poems.data)
            return poems.data;
        },
        async like(context, poem_id){
            const like = await axios.put(process.env.VUE_APP_BASE_URL+`/poems/like/${poem_id}`);

            return like;
        },
        async dislike(context, poem_id){
            const deslike = await axios.put(process.env.VUE_APP_BASE_URL+`/poems/deslike/${poem_id}`);

            return deslike;
        },
        async getMyLikes(context){
            const myLikes = await axios.get(process.env.VUE_APP_BASE_URL+'/likes/user');

            return myLikes.data;
        },
        async delete(context, id){
            const poem = await axios.delete(process.env.VUE_APP_BASE_URL+`/poems/${id}`);

            return poem.data;
        }
    }
}