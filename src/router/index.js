import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Shop from '@/views/shop'
import Item from '@/views/item'
import Cart from '@/views/cart'
import CheckOut from '@/views/checkout'
import Payment from '@/views/payment'
import Account from '@/views/account'
import Order from '@/views/account/order'
import Address from '@/views/account/address'

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name:'shop',
      component: Shop
    },
    {
      path: '/item',
      component: Item,
      name:'item'
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/checkout',
      component: CheckOut,
      name: 'checkout'
    },
    {
      path: '/payment',
      component: Payment,
      name: 'payment'
    },
    {
      path: '/account',
      component: Account,
      children: [
        {
          path: '',
          name: 'account',
          component: Order
        },
        {
          path: 'address',
          name: 'address',
          component: Address
        }
      ]
    }
  ]
})
