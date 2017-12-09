// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from  'vue-infinite-scroll'
import Vuex from 'vuex'
// 全局价格过滤器
import {currency} from './util/currency'

Vue.config.productionTip = false

Vue.filter("currency", currency)

Vue.use(Vuex);
Vue.use(infiniteScroll);
Vue.use(VueLazyLoad,{
  loading: "/static/loading-svg/loading-bars.svg",
  try: 3
});

// vuex
const store = new Vuex.Store({
  state:{
    nickName:'',
    cartCount:0
  },
  mutations:{
    updateUserInfo(state, nickName){
      state.nickName = nickName;
    },
    updateCartCount(state, cartCount){
      state.cartCount += parseInt(cartCount);
    },
    initCartCount(state, cartCount){
      state.cartCount = parseInt(cartCount);
    }
  }
});

// Vue是整个页面的入口
new Vue({
  el: '#app',  //监听#app的对象
  store,  // store注入
  router,  // router注入
  template: '<App/>',
  components: { App }
});
