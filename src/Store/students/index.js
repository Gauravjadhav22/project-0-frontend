import { mapGetters, } from "vuex";
import { privateRequest } from "../../Config";




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
            state.students = [...state.students, ...payload]
        },
        setNewStudent(state, payload) {
            state.students = [...state.students, payload]
        },
        setUpdatedStudents(state, payload) {
            const students = [...state.students]

            const index = students.findIndex((item) => item.id === payload.id)
            students[index] = payload;

            state.students = [...students];
        },
        setDeletedStudents(state, payload) {



            const students = [...state.students]
            const index = students.findIndex((item) => item.id === payload.id)
            students.splice(index, 1);
            state.students = students;


        }
        ,
        setUser(state, payload) {
            state.students = payload
        },
        setSearchedStudents(state, payload) {

            console.log(payload);
            const students = [...state.students];
            const index = students.findIndex((item) => item.name === payload)
            console.log( state.students[index]);
        

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
        async addStudent({ commit }, payload) {


            await privateRequest.post('/addstudent', { ...payload, 'class name': payload.className }).then((response) => {

                commit('setNewStudent', response.data,);
                // router.push('/');
            }).catch((error) => {
                console.log(error);


            })
        },
        async updateStudent({ commit, getters }, payload) {
            await privateRequest.patch(`/updatestudent/${payload.id}`, { ...payload, 'class name': payload.className }).then((response) => {
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

            }).catch((error) => {
                console.log(error);
            })
        },

    }

}

export default studentsModule;
