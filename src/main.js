import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
import router from './router/router'
import { createApp } from 'vue'
import pinia from "@/store/index.js";
import hoverBorderDirective from "@/hoverBorderDirective.js";
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// Components
import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
    },
})

const app = createApp(App);

// Register the directive globally
app.directive('hover-border', hoverBorderDirective);

app.use(vuetify)
    .use(router)
    .use(pinia)
    .mount('#app');
