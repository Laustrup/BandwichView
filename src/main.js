// main.js/ts
import {createApp} from 'vue'
import {createBootstrap} from 'bootstrap-vue-next'
import {createPinia} from 'pinia'
import PrimeVue from 'primevue/config';
import i18n from '@/_locals/vue-i18n.js'
import router from './router/index.js'
import App from './App.vue'

// Add the necessary CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

const app = createApp(App)
export default app.use(createBootstrap())
.use(createPinia())
.use(PrimeVue)
.use(i18n)
.use(router)
.mount('#app')
