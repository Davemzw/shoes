import { createApp } from 'vue'
import App from './App.vue'
import "./assets/css/reset.css"
import 'element-plus/dist/index.css'
import router from "./router"
import Distpicker from 'v-distpicker'

const app = createApp(App)
app.component('v-distpicker', Distpicker)
app.use(router).mount('#app')
