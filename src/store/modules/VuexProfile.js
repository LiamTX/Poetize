import axios from '../../util/axios'

export default {
    namespaced: true,
    actions: {
        async getUserInfo(context){
            const user = await axios.get(process.env.VUE_APP_BASE_URL+'/users/token');

            return user;
        },
        async getMyPoems(context){
            const poems = await axios.get(process.env.VUE_APP_BASE_URL+'/users/poems');

            return poems.data;
        },
        async edit(context, newData){
            const user = await axios.put(process.env.VUE_APP_BASE_URL+'/users', newData);

            return user.data;
        }
    }
}