import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import globalComponents from './global-components'
// Import Vuetify's core and individual components
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css'; // Material Design Icons
//import pinia
import { createPinia } from 'pinia'

import router from '@/router';

// Create a new Vuetify instance
// Create the Vuetify instance
const vuetify = createVuetify(
    {
        icons: {
            defaultSet: 'mdi',
        },
        theme: {
            defaultTheme: 'light',
            themes: {
                light: {
                    colors: {
                        primary: '#1976D2',
                        secondary: '#424242',
                        accent: '#82B1FF',
                        error: '#FF5252',
                        info: '#2196F3',
                        success: '#4CAF50',
                        warning: '#FFC107',
                    },
                    
                },
            },
        }
    }
);

const pinia = createPinia()

const app = createApp(App)
app.use(globalComponents)
app.use(vuetify)
app.use(pinia)
app.use(router)
app.mount('#app')
