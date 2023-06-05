import { createApp } from 'vue'
import { createPinia } from 'pinia'
//import registerServiceWorker from './services/registerServiceWorker'
import router from './router'
import App from './App.vue'


//registerServiceWorker()
const app = createApp(App);
app.use(createPinia())
app.use(router).mount('#app')
