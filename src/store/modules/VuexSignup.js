import axios from 'axios'

export default {
    namespaced: true,
    actions: {
        async signup(context, data){
            const user = await axios.post(process.env.VUE_APP_BASE_URL+'/users', data);

            return user;
        }
    }
}