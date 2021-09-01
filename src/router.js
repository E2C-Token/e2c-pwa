import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Admin from "./views/Admin.vue";
import Overview from "./views/Overview.vue";
import Transactions from "./views/Transactions.vue";
import WishAccess from "./views/WishAccess.vue";
import Profile from "./views/Profile.vue";
import Avaiable from "./views/Avaiable.vue";
// import Liquidate from "./views/Liquidate.vue";
import {fb} from './firebase'

Vue.use(Router);

const router =  new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: { requiresAuth: true },
      children:[
        {
          path: "overview",
          name: "overview",
          component: Overview
        },
        {
          path: "transactions",
          name: "transactions",
          component: Transactions
        },
        {
          path: "profile",
          name: "profile",
          component: Profile
        },
        {
          path: "wishAccess",
          name: "wishAccess",
          component: WishAccess
        },
        {
          path: "avaiable",
          name: "avaiable",
          component: Avaiable
        },
        // {
        //   path: "liquidate",
        //   name: "liquidate",
        //   component: Liquidate
        // }
      ]
    },
    {
      path: "/checkout",
      name: "checkout",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Checkout.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = fb.auth().currentUser

  if (requiresAuth && !currentUser) {
      next('/')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})

export default router;