import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import mutations from "./mutations";
import { dashboard } from "./modules/Dashboard/index.js";
import { group } from "./modules/Group/index.js";
import { products } from "./modules/Products/index.js";
import { investment } from "./modules/Investment/index.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loaded: false,
    account: null,
    banks: [],
    earnings: [],
    subscriptions: [],
    withdrawalDates: {}
  },
  actions,
  getters,
  mutations,
  modules: {
    dashboard,
    group,
    investment,
    products
  }
});
