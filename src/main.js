import Vue from "vue";
import Vuex from "vuex";
import Router from "vue-router";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router/index.js";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";
import { store } from "./store/index.js";
import VueResource from "vue-resource";
import VeeValidate from "vee-validate";
import config from "./config/index";
import Auth from "./utils/auth";
import Vue2Filters from "vue2-filters";
import VueTheMask from "vue-the-mask";
import Datetime from "vue-datetime";
import VueMask from "v-mask";
import "./assets/css/style.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/all.min.css";
import "./assets/css/slick.css";
import "./assets/css/theme.css";
import "./assets/css/iofrm-style.css";
import "./assets/css/iofrm-theme9.css";
import "vue-datetime/dist/vue-datetime.css";

import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VueResource);
Vue.use(Vue2Filters);
Vue.use(VeeValidate);
Vue.use(VueTheMask);
Vue.use(Router);
Vue.use(Datetime);
Vue.use(VueMask);

Vue.http.options.root = config.APIROOT;

Vue.use(Auth, {
  loginUrl: "auth/user/login",
  signupUrl: "auth/user/create",
  subuserLoginUrl: "auth/subuser/login",
  refresh: true
});
Vue.filter("percent", function(value, decimals) {
  return (
    Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals) + "%"
  );
});

Vue.config.productionTip = false;

// Suppress cookie warnings in development
if (process.env.NODE_ENV === 'development') {
  const originalWarn = console.warn;
  console.warn = function(...args) {
    if (args[0] && args[0].includes('SameSite')) return;
    originalWarn.apply(console, args);
  };
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
