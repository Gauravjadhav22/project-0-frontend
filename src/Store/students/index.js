import { mapGetters, mapState } from "vuex";
import store from "..";
import { privateRequest } from "../../Config";
import router from '../../routes';
import Vue from 'vue'



const studentsModule = {
    namespaced: true,
    state() {
        return {
            students: [],

        }
    }
    ,
    computed: {
        ...mapGetters({
            isAuth: 'auth/isAuth',
            UserId: 'auth/getUserId'
        })
    }
    ,
    getters: {
        getAllStudents(state) {
            return state.students;
        },

    },


    mutations: {
        setStudents(state, payload) {
            state.students = { ...state.students, ...payload }
        },
        setNewStudent(state, payload) {
            state.students = { ...state.students, payload }
        },
        setUpdatedStudents(state, payload) {


            let index = 0
            while (state.students[index]) {
                // console.log(state.students[index].id === payload.id);
                if (state.students[index].id === payload.id) {

                    state.students[index] = payload;
                    state.students[index]['class name'] = payload.className;
                    return;
                }
                index++;

            }



        },
        setDeletedStudents(state, payload) {
            let index = 0
            let arr = []
            while (state.students[index]) {
                // console.log(state.students[index].id === payload.id);
                if (state.students[index].id != payload.id) {

                    arr.push(state.students[index])

                }
                index++;


            }
            state.students = arr;
        }
        ,
        setUser(state, payload) {
            state.students = payload
        },
        setSearchedStudents(state, payload) {

            let index = 0
            let arr = []
            while (state.students[index]) {
                // console.log(state.students[index].name === payload.toLowerCase().trim());
                if (state.students[index].name === payload.toLowerCase().trim()) {
                    console.log("fkldsfjsldjfsdjfsffffffff");
                    arr.push(state.students[index])

                }
                index++;


            }
            console.log(state.students);
            state.students = arr;


        },
        clearUser(state) {
            state.students = []
        }
    },

    actions: {
        async getAllStudents({ commit, getters }, payload) {
            await privateRequest.get('/getstudents',).then((response) => {
                console.log(response.data);

                commit('setStudents', response.data);

            }).catch((error) => {
                console.log(error);


            })
        },
        async addStudent({ commit, getters }, payload) {


            await privateRequest.post('/addstudent', { 'address': payload.address, 'name': payload.name, 'email': payload.email, 'class name': payload.className, 'contact': '3437849238', 'dob': payload.dob }).then((response) => {

                commit('setNewStudent', response.data,);
                // router.push('/');
            }).catch((error) => {
                console.log(error);


            }).finally(() => {

                // commit('notify/setLoading', false, { root: true })
            })
        },
        async updateStudent({ commit, getters }, payload) {
            await privateRequest.patch(`/updatestudent/${payload.id}`, { 'address': payload.address, 'name': payload.name, 'email': payload.email, 'class name': payload.className, 'contact': '3437849238', 'dob': payload.dob }).then((response) => {
                commit('setUpdatedStudents', payload);
                // router.push('/');
            }).catch((error) => {
                console.log(error);


            })
        },
        async getStudent({ commit, getters }, payload) {
            // await privateRequest.patch(`/getstudent/${payload.id}`).then((response) => {
            //     commit('setStudents', payload);
            //     // router.push('/');
            // }).catch((error) => {
            //     console.log(error);


            // })
            commit('setSearchedStudents', payload);


        },
        async deleteStudent({ commit, getters }, payload) {

            await privateRequest.delete(`/deletestudent/${payload.id}`).then((response) => {

                commit('setDeletedStudents', payload);
                // router.push('/');
            }).catch((error) => {
                console.log(error);
            })
        },

    }

}

export default studentsModule;
