import Vue from "vue";
import App from "./App.vue";

import VueLastModal from './last-modal.js'

Vue.use(VueLastModal)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
