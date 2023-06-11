import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useAuthStore } from '../src/stores/logout';
import App from './App.vue'
import router from './routers'
const app = createApp(App)
app.component('QuillEditor', QuillEditor)
app.use(createPinia())
app.use(router)
app.mount('#app')
auth.onAuthStateChanged((user) => {
    const authStore = useAuthStore();
    authStore.setUser(user);
  });
