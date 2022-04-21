import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store.js';
import ContainerCard from './components/ui/ContainerCard.vue';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('container-card', ContainerCard);

app.mount('#app');