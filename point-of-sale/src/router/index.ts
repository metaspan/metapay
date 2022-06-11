import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// import Home from '../views/Home.vue'
import Home from '@/components/Home.vue'
import Settings from '@/components/Settings.vue'
import QRCode from '@/components/QRCode.vue'
import Scanner from '@/components/Scanner.vue'

Vue.use(VueRouter)

const baseTitle = 'met🌐pay'

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: `${baseTitle} :: point-of-sale`
    }
  },
  {
    path: '/settings',
    name: 'Setting',
    component: Settings
  },
  {
    path: '/qrcode',
    name: 'QRCode',
    component: QRCode
  },
  {
    path: '/scan',
    name: 'Scan',
    component: Scanner
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: `${baseTitle} :: about`
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // console.debug('router.beforeEach()', to)
  document.title = to.meta?.title || baseTitle
  return next()
})

export default router
