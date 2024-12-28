import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import globalComponents from './global-components'
// Import Vuetify's core and individual components
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Import Vuetify styles
import '@mdi/font/css/materialdesignicons.css'; // Material Design Icons
import { VContainer, VSwitch, VDialog, VCard, VCardText, VCardActions, VSpacer, VBtn, VTextField } from 'vuetify/components';
//import pinia
import { createPinia } from 'pinia'



// Create a new Vuetify instance
// Create the Vuetify instance
const vuetify = createVuetify({
    components: {
      VContainer,
      VSwitch,
      VDialog,
      VCard,
      VCardText,
      VCardActions,
      VSpacer,
      VBtn,
      VTextField,
    },
  });

const pinia = createPinia()

const app = createApp(App)
app.use(globalComponents)
app.use(vuetify)
app.use(pinia)
app.mount('#app')
