import Vue from 'vue'
import App from './App.vue'
//swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.config.productionTip = false


//swiper
Vue.use(VueAwesomeSwiper, /* { default global options } */)

new Vue({
  render: h => h(App),
}).$mount('#app')
