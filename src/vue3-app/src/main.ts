import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import globalComponents from './global-components'
// Import Vuetify's core and individual components
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Import Vuetify styles
import '@mdi/font/css/materialdesignicons.css'; // Material Design Icons

// Create a new Vuetify instance
const vuetify = createVuetify();

const app = createApp(App)
app.use(globalComponents)
app.use(vuetify)
app.mount('#app')
