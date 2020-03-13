import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

// Vue.use(Auth, {
//   issuer: 'https://{yourOktaDomain}/oauth2/default',
//   client_id: '0oaujl7wZHPHoehjl4x5',
//   redirect_uri: 'http://localhost:8080/implicit/callback',
//   scope: 'openid profile email'
// })

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/food",
    name: "food",
    component: () =>
      import(/* webpackChunkName: "food" */ "../views/Food.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
