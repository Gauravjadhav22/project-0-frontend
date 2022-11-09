import { mapGetters } from "vuex";


const notificationsModule = {
    namespaced:true,
    state(){
        return {
            loader:false,
        }
    },
    getters:{
   
        isLoading(state){
            return state.loader;
        }
    },
    computed: mapGetters(['isLoading']),
    mutations:{
   
        setLoading(state,payload){
            state.loader = payload
        }
    }
}

export default notificationsModule;