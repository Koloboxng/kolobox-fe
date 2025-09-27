import Vue from "vue";
import * as mutate from "./mutation-types";

const state = {
  loading: true,
  interest: {},
  savings: {}
};

const getters = {
  dashboardReady: state => !state.loading,
  interestData: state => state.interest.data,
  savingsData: state => state.savings.data,
  interestChart: state => state.interest.chart,
  savingsChart: state => state.savings.chart
};

const actions = {
  getDashboard({ commit, state }) {
    state.loading = true;
    return Vue.http.get("user/me/dashboard").then(res => {
      commit(mutate.UPDATE_DASHBOARD, res.body.data);
    });
  },
  quickDeposit({ commit }, data) {
    let deposit_amount = data.amount;
    let product_id = data.product_id
    let group_id = data.group_id ? data.group_id : null;
    let { id } = data;
    return Vue.http.post(
      `product/${product_id}/account/topup`,
      {
        deposit_amount,
        product_id,
        group_id
      },
      {
        emulateJSON: true
      }
    );
  },
  cancelProduct({ commit, dispatch }, productId) {
    Vue.http
      .post(
        "product/selection/cancellation",
        {
          id: productId
        },
        {
          emulateJSON: true
        }
      )
      .then(() => {
        dispatch("getProfile");
        dispatch("getEarnings");
      });
  }
};

const mutations = {
  [mutate.UPDATE_DASHBOARD](state, data) {
    state.interest = data.interest;
    state.savings = data.savings;
    state.loading = false;
  }
};

export const dashboard = {
  state,
  getters,
  actions,
  mutations
};
