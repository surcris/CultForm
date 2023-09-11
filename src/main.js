import { createApp } from 'vue'
import { createPinia } from 'pinia'
//import registerServiceWorker from './services/registerServiceWorker'
import router from './router'
import App from './App.vue'
import cors from "cors"

//registerServiceWorker()
const app = createApp(App);
app.use(createPinia());
//app.use(cors());
app.use(router).mount('#app')
