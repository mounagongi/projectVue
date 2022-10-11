
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret,faAngleUp, faAngleDown, faRotate, faMagnifyingGlass,faTrash } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
/* add icons to the library */
library.add(faUserSecret,faAngleUp,faAngleDown,faRotate,faMagnifyingGlass,faTrash)

const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(BootstrapVue3)
app.component('font-awesome-icon', FontAwesomeIcon)

.mount('#app')