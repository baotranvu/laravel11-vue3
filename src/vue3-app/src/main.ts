import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import globalComponents from './global-components'


const app = createApp(App)
app.use(globalComponents)
app.mount('#app')
