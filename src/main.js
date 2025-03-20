import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/main.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from '@/_locals/vue-i18n.js'

export default createApp(App)
  .use(createPinia())
  .use(BootstrapVue3)
  .use(i18n)
  .use(router)
  .mount('#app');
