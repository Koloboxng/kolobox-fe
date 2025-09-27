import Vue from "vue";
import * as mutate from "./mutation-types";

const state = {
  allProducts: [],
  walletHistory: null
};

const actions = {
  getAllProducts({ commit }) {
    Vue.http.get("product").then(res => {
      commit(mutate.UPDATE_ALL_PRODUCTS, res.body.data.p);
    });
  },
  getWallet({ commit }, data) {
    const { snackbar } = data;
    Vue.http
      .get("user/me/wallet")
      .then(res => {
        commit(mutate.UPDATE_USER_WALLET, res.body.data.walletHistory);
      })
      .catch(e => {
        snackbar.msg =
          e.body.message.message || e.body.message || "Oops! An Error occured.";
        snackbar.show = true;
      });
  }
};

const getters = {
  allProduct: state => state.allProducts,
  walletHistory: state => state.walletHistory
};

const mutations = {
  [mutate.UPDATE_ALL_PRODUCTS](state, data) {
    state.allProducts = data;
  },
  [mutate.UPDATE_USER_WALLET](state, data) {
    state.walletHistory = data;
  }
};

export const products = {
  state,
  getters,
  actions,
  mutations
};
