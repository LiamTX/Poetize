import axios from '../../util/axios'

export default {
    namespaced: true,
    actions: {
        async poetizar(context, newData){
            const poem = await axios.post(process.env.VUE_APP_BASE_URL+'/poems', newData);

            return poem;
        }
    }
}