import axios, { privateRequest } from "../../Config";
import router from '../../routes';


const DEFAULT_USER = {
    email: null,
    id: null,
    name: null,



}

const authModule = {
    namespaced: true,
    state() {
        return {
            user: DEFAULT_USER,
            auth: localStorage.getItem('token') ? true : false,
            userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : null,
        }
    }
    ,
    getters: {
        isAuth(state) {
            if (state.auth) {
                return true;
            }
            return false;
        },
        getUserData(state) {
            return state.user;
        },
        getUserId(state) {
            return state.userId
        }
    },
    mutations: {
        setUser(state, payload) {

            payload.token && localStorage.setItem('token', JSON.stringify(payload.token));
            localStorage.setItem('userId', JSON.stringify(payload.user.id));
            state.user = {
                ...state.user, ...payload.user
            }
            state.auth = true;
        },
        clearUser(state) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            state.user = DEFAULT_USER;
            state.auth = false;
        }
    },
    actions: {
        async signIn({ commit, getters }, payload) {
            commit('notify/setLoading', true, { root: true })
            await axios.post('/login', { email: payload.email, password: payload.password }).then((response) => {
                console.log(response.data.token);

                commit('setUser', response.data,);
                // router.go(0)

            }).catch((error) => {
                console.log(error);


            }).finally(() => {

                commit('notify/setLoading', false, { root: true })
            })
        },
        async signUp({ commit }, payload) {
            try {
                console.log(payload);


                const response = await axios.post('/register', { name: payload.name, email: payload.email, password: payload.password })

                console.log(response, "res aa gya");


                alert('user created plz sign in')

                router.replace('/auth');
            } catch (error) {
                console.log(error, "error aa gya");
            } finally {
                commit('notify/setLoading', false, { root: true })
            }
        },

        async getUser({ commit, getters }, payload) {
            console.log("getting user");
            await privateRequest.get('/user',).then((response) => {
                console.log(response.data);

                commit('setUser', response.data,);
                router.push('/');
            }).catch((error) => {
                console.log(error);
                commit('clearUser');
                router.replace('/auth');

            })
        },
        async signOut({ commit, getters }, payload) {

            commit('notify/setLoading', true, { root: true })
            await axios.get('/logout',).then((response) => {
                console.log(response.data);

            }).catch((error) => {
                console.log(error);


            }).finally(() => {
                commit('clearUser');
                router.replace('/auth');

                commit('notify/setLoading', false, { root: true })
            })
        },
    }

}

export default authModule;
