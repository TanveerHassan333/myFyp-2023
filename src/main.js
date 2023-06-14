import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import App from './App.vue'
import router from './routers'
const app = createApp(App)
app.component('QuillEditor', QuillEditor)
app.use(createPinia())
app.use(router)
app.mount('#app')

