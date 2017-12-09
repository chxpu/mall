import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// 前端路由
import GoodsList from './../views/GoodsList.vue'
import Cart from './../views/Cart.vue'
import Address from './../views/Address.vue'
import orderConfirm from '../views/OrderConfirm.vue'
import OrderSuccess from '../views/OrderSuccess.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    // 商品列表路由
    {
      path: '/',
      name: 'GoodList',
      component: GoodsList,
    },
    // 购物车页面路由
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/address',
      name: 'Address',
      component: Address,
    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: orderConfirm,
    },
    {
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess,
    },
  ]
})
