import { createStore } from 'vuex';
import AuthModule from './auth';
import NotificationsModule from './notifications';
import StudentsModule from './students'

const store = createStore({
    strict: true,
    modules: {
        auth: AuthModule,
        notify: NotificationsModule,
        students: StudentsModule
    }
});

export default store;