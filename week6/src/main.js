import 'bootstrap/scss/bootstrap.scss';
// import './assets/main.css'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('LoadingOverlay',Loading)
app.use(VueAxios, axios)
app.mount('#app')
