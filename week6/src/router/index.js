import { createRouter, createWebHashHistory} from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/UserLayout.vue'),
      children: [
        {
        path: '',
        component: () => import('../views/UserHome.vue')
        },
        {
        path: '/product',
        name: '產品頁面',
        component: () => import('../views/UserProduct.vue')
        },
        {
        path: '/products',
        name: '產品列表',
        component: () => import('../views/UserProducts.vue')
        },
        {
        path: '/cart',
        name: '購物車',
        component: () => import('../views/UserCart.vue')
        }
      ],
    },
      {
        path: '/login',
        component: () => import('../views/UserLogin.vue'),
      },
      {
        path: '/admin',
        component: () => import('../views/AdminDashboard.vue'),
        children:[
          {
            path: 'products',
            component: () => import('../views/AdminProducts.vue'),
          },
          {
            path: 'orders',
            component: () => import('../views/AdminOrders.vue'),
          },
        ]
      }

  ]
})

export default router
