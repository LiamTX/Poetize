import axios from '../../utils/axios';

export default {
    namespaced: true,
    state: {
  
    },
    getters: {
      
    },
    mutations: {
        
    },
    actions: {
        async sendFaq(context, data){
            const faq = await axios.post(process.env.VUE_APP_BASE_URL + '/users/faq', data);

            return faq;
        }
    }
}