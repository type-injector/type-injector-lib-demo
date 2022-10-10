import { createApp } from 'vue';
import App from './App.vue';
import { globalTypeInjector, typeInjectorToken } from './type-injector';

import './assets/main.css';

createApp(App).provide(typeInjectorToken, globalTypeInjector).mount('#app');
