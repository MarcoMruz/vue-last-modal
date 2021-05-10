import Vue from 'vue'
import App from '@/App.vue'

import VueLastModal from '@/vue-last-modal'

Vue.use(VueLastModal)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
