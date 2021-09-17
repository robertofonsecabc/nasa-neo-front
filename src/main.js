import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import moment from "moment";

Vue.config.productionTip = false

Vue.filter('moment',function (value){
  console.log('moment', value)
  return moment(value).format('YYYY-MM-DD');
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
