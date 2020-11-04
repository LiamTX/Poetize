import axios from 'axios';

export default {
    namespaced: true,
    actions: {
        async auth(context, data) {
            const response = await axios.post(process.env.VUE_APP_BASE_URL + '/users/auth', data);

            return response;
        },
        async forgot_password(context, data) {
            const response = await axios.post(process.env.VUE_APP_BASE_URL + '/users/forgot_password', data);

            return response;
        },
        async reset_password(context, data) {
            const response = await axios.post(process.env.VUE_APP_BASE_URL + '/users/reset_password', data);

            return response;
        }
    }
}