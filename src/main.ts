import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './index.css'
import App from './App.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Checkout from './views/Checkout.vue'
import cleave from './directives/cleave';

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/checkout', name: 'checkout', component: Checkout }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).directive('cleave', cleave).use(router).mount('#app')
