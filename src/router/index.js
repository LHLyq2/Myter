import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/register',
      name: 'Register',
      component: r => require(['../views/Register.vue'], r),
    },
    {
      path: '/login',
      name: 'Login',
      component: r => require(['../views/Login.vue'], r),
    },
    {
      path: '/main',
      name: 'Main',
      component: r => require(['../views/Main.vue'], r),
      children: [
        {
          path: 'menu',
          name: 'Menu',
          component: r => require(['../views/mainViews/Menu.vue'], r)
        },
        {
          path: 'classification',
          name: 'Classification',
          component: r => require(['../views/mainViews/Classification.vue'], r)
        },
        {
          path: 'shopcart',
          name: 'Shopcart',
          component: r => require(['../views/mainViews/Shopcart.vue'], r)
        },
        {
          path: 'my',
          name: 'My',
          component: r => require(['../views/mainViews/My.vue'], r)
        },
      ]
    },
    {
      path: '/detail',
      name: 'Detail',
      component: r => require(['../views/Detail.vue'], r),
    },
    {
      path: '/detaillist',
      name: 'Detaillist',
      component: r => require(['../views/Detaillist.vue'], r),
    },
    {
      path: '/account',
      name: 'Account',
      component: r => require(['../views/Account.vue'], r),
    },
    {
      path: '/address/:aid?',
      name: 'Address',
      component: r => require(['../views/Address.vue'], r),
    },
    {
      path: '/myaddress',
      name: 'MyAddress',
      component: r => require(['../views/MyAddress.vue'], r),
    },
    {
      path: '/pay',
      name: 'Pay',
      component: r => require(['../views/Pay.vue'], r),
    },
    // {
    //   path: '/order',
    //   name: 'Order',
    //   component: r => require(['../views/Order.vue'], r),
    // },
    {
      path: '/mycollection',
      name: 'Mycollection',
      component: r => require(['../views/Mycollection.vue'], r),
    },
    // {
    //   path: '/myshoucang',
    //   name: 'Myshoucang',
    //   component: r => require(['../views/Myshoucang.vue'], r),
    // },
    // {
    //   path: '/addresCsollection',
    //   name: 'AddresCsollection',
    //   component: r => require(['../views/AddresCsollection.vue'], r),
    // },
    {
      path: '/getpassword',
      name: 'getPassword',
      component: r => require(['../views/getPassword.vue'], r),
    },
    {
      path: '/myfollow',
      name: 'Myfollow',
      component: r => require(['../views/Myfollow.vue'], r),
    },
    {
      path: '/getpassword',
      name: 'Myfollow',
      component: r => require(['../views/Myfollow.vue'], r),
    },
    
    // {
    //   path: '/mycollection',
    //   name: 'Mycollection',
    //   component: r => require(['../views/Mycollection.vue'], r),
    // },
    // {
    //   path: '/myshoucang',
    //   name: 'Myshoucang',
    //   component: r => require(['../views/Myshoucang.vue'], r),
    // },
    // {
    //   path: '/address/:aid?',
    //   name: 'Address',
    //   component: r => require(['../views/Address.vue'], r),
    // },
    {
      path:"*",
      redirect: {
        name:'Register',
      }
     
    }
]

const router = new VueRouter({
  routes
})

export default router
