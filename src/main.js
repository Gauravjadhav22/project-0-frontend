import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import Router from './routes';
import Store from './Store'


const app = createApp(App);



app.use(Store);
app.use(Router)
app.mount('#app')
