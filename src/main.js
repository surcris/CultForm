import { createApp } from 'vue'
import registerServiceWorker from './services/registerServiceWorker'
import router from './router'
import App from './App.vue'


registerServiceWorker()

createApp(App).use(router).mount('#app')
