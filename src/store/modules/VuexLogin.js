import axios from 'axios';

export default {
    namespaced: true,
    actions: {
        async auth(context, data){
            const response = await axios.post(process.env.VUE_APP_BASE_URL+'/users/auth', data);
            
            return response;
        }
    }
}