import axios from 'axios'

export default {
    namespaced: true,
    actions: {
        async login(context, newData){
            const user = await axios.post(process.env.VUE_APP_BASE_URL+'/users/auth', newData);

            return user;
        }
    }
}