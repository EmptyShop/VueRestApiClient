import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap'

const app = createApp(App)

app.use(router)

app.mount('#app')

app.provide('urlAPI','http://192.168.1.66:5000/contact');
app.provide('urlAPINet','https://localhost:7153/contacts'); //API alterna
app.provide('emailPattern', /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);