import Vue from "vue";
import * as mutate from "./mutation-types";

let state = {
  products: [],
  goal: null
};

const getters = {
  getProducts: state => state.products,
  productIds: state => state.ids,
  userGoal: state => state.goal
};

const actions = {
  postProduct({ commit, state }, data) {
    let form = data.form;
    let snackbar = data.snackbar;
    state.loading = true;

    if (form.busy) return;

    let payload = {
      deposit_amount: form.deposit_amount,
      saving_frequency: form.saving_frequency,
      product_id: form.product_id,
      group_id: form.group_id,
    };
    Vue.http.get("product").then(res => {
      commit(mutate.PRODUCT_ID, res.body.data);
    });

    return Vue.http
      .post(`product/${form.id}/selection`, payload, { emulateJSON: true })
      .then(res => {
        commit(mutate.UPDATE_NEW_PRODUCT, res.body.data);
      })
      .catch(e => {
        snackbar.msg = e.body.message;
        // || "Oops! Our Engineers are on it. Try again."
        snackbar.show = true;
      });
  },
  getUserGoal({ commit }) {
    Vue.http
      .get("user/investment/goal")
      .then(res => {
        commit(mutate.UPDATE_USER_GOAL, res.body.data);
        //data.status = true;
      })
      .catch(e => {});
  }
};

const mutations = {
  [mutate.UPDATE_NEW_PRODUCT](state, data) {
    state.products = data;
    // console.log({data})
  },
  [mutate.PRODUCT_ID](state, data) {
    state.ids = data.products;
  },
  [mutate.UPDATE_USER_GOAL](state, data) {
    state.goal = data;
  }
};

export const investment = {
  state,
  mutations,
  actions,
  getters
};
