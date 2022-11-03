import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入mock
import '@/mock/mockServe.js'
//eventbus
Vue.prototype.$Bus = new Vue();
// import './icons'
Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small' })

//引入相关API
import API from '@/api'
Vue.prototype.$API=API
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
