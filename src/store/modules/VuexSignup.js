import axios from '../../util/axios'

export default {
    namespaced: true,
    actions: {
        async register(context, newData){
            const user = await axios.post(process.env.VUE_APP_BASE_URL+'/users', newData);

            return user;
        }
    }
}