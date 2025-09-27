import Vue from "vue";
import * as mutate from "./mutation-types";

const state = {
  groups: [],
  tenors: null,
  koloGroups: null,
  eventGroups: null,
  familyGroups: null,
  adminGroups: null,
  adminVotes: null,
  tenorVotes: null,
  subUsers: null,
  groupDashboard: null
};

const getters = {
  allGroups: state => state.groups,
  allTenors: state => state.tenors,
  allKoloGroups: state => state.koloGroups,
  allEventGroups: state => state.eventGroups,
  allFamilyGroups: state => state.familyGroups,
  adminGroups: state => state.adminGroups,
  adminVotes: state => state.adminVotes,
  tenorVotes: state => state.tenorVotes,
  allSubUsers: state => state.subUsers,
  getGroupDashboard: state => state.groupDashboard
};

const actions = {
  getGroups({ commit }) {
    return Vue.http.get("group/types").then(res => {
      commit(mutate.UPDATE_GROUPS, res.body.data);
    });
  },
  getTenors({ commit }, data) {
    return Vue.http.get("group/tenors").then(res => {
      commit(mutate.UPDATE_TENORS, res.body.data);
    });
  },
  cancelSubscription({ commit, dispatch }, data) {
    const { group_id, snackbar } = data;
    return Vue.http
      .post(
        "group/cancel_subscription",
        {
          group_id
        },
        {
          emulateJSON: true
        }
      )
      .then(res => {
        snackbar.msg = "Your subscription has been canceled";
        snackbar.show = true;
        dispatch("get_user_groups");
      });
  },
  changeAdmin({ commit }, data) {
    //form should contain the group id and the id of the new admin
    const { form, snackbar } = data;
    snackbar.msg = "Voting...";
    snackbar.show = true;
    return Vue.http
      .post("group/change_admin", form, {
        emulateJSON: true
      })
      .then(res => {
        snackbar.msg =
          res.body.data.msg ||
          "This consent has been sent to other users via mail";
        snackbar.show = true;
      })
      .catch(e => {
        snackbar.msg =
          e.body.message ||
          e.body.message.message ||
          "Oops! An Error Occured. Please try again";
      });
  },
  getAdminVotes({ commit, data }) {
    let userId = data.userId;
    let groupId = data.groupId;
    return Vue.http
      .get(`group/change_admin/votes/${userId}/${groupId}`)
      .then(res => {
        commit(mutate.UPDATE_GROUP_VOTES, res.body.data);
      });
  },
  get_user_groups({ commit }) {
    return Vue.http.get("group/user_group_list").then(async res => {
      //Get kolo group
      const koloGroup = await res.body.data.filter(
        // x => x.Name.toLowerCase() === "kolo-group"
        x => x.Name && x.Name.toLowerCase() === "kolo-group"
      );

      koloGroup.forEach(x => (x.users = []));

      commit(mutate.UPDATE_KOLO_GROUPS, koloGroup);
    });
  },
  get_admin_groups({ commit }) {
    return Vue.http.get("group/admin_group_list").then(res => {
      commit(mutate.UPDATE_ADMIN_GROUPS, res.body.data);
    });
  },
  validateGroup({ commit }, data) {
    const { router, snackbar, form } = data;
    snackbar.msg = "Validating...";
    snackbar.show = true;
    const { group_id, deposit_amount, saving_frequency } = form;
    return Vue.http
      .post("group/detail/product", { group_id }, { emulateJSON: true })
      .then(res => {
        const selectionForm = {
          deposit_amount,
          product: res.body.data.product,
          snackbarMessage:
            "To Continue, You'll have to pay for this group product",
          group_id: group_id || "",
          saving_frequency
        };

        router.push({ name: "products", params: { form: selectionForm } });
      })
      .catch(e => {
        snackbar.msg = e.body.message;
      });
  },
  groupReports({ commit }, data) {
    const { form, snackbar } = data;
    snackbar.msg = "Sending ...";
    snackbar.show = true;
    const { group_id } = form;
    return Vue.http
      .post(
        "groupsubuser/group_transactions",
        { group_id },
        { emulateJSON: true }
      )
      .then(res => {});
  },
  joinGroup({ commit }, data) {
    const { group_id, snackbar } = data;
    return Vue.http
      .post(
        "group/join",
        {
          group_id
        },
        {
          emulateJSON: true
        }
      )
      .then(res => {
        snackbar.msg = "User has joined group successfully";
        snackbar.show = true;
      })
      .catch(e => {
        snackbar.msg =
          e.body.message ||
          e.body.message.message ||
          "Oops! An error occured, Please try again";
        snackbar.show = true;
      });
  },
  changeTenor({ commit }, data) {
    //Form should contain the group_id and the new_tenor id
    let form = data.form;
    let snackbar = data.snackbar;
    return Vue.http
      .post("group/change_tenor", form, {
        emulateJSON: true
      })
      .then(res => {
        snackbar.msg = "Your request is being processed";
        snackbar.show = true;
      })
      .catch(e => {
        snackbar.msg =
          e.body.message ||
          e.body.message.message ||
          "Oops! An error occured. Please, try again";
        snackbar.show = true;
      });
  },
  getTenorVotes({ commit }, data) {
    let userId = data.userId;
    let groupId = data.groupId;

    return Vue.http
      .get(`group/change_tenor/votes/${userId}/${groupId}`)
      .then(res => {
        commit(mutate.UPDATE_TENOR_VOTES, res.body.data);
      });
  },
  inviteMembers({ commit }, data) {
    const { form, snackbar } = data;
    return Vue.http
      .post("group/invite", form, {
        emulateJSON: true
      })
      .then(res => {
        snackbar.msg = res.body.data.message;
      })
      .catch(e => {
        snackbar.msg = e.body.message;
      })
      .finally((snackbar.show = true));
  },
  createSubUser({ commit, dispatch }, data) {
    const { form, snackbar, router } = data;
    snackbar.msg = "Creating Subuser...";
    snackbar.show = true;
    Vue.http
      .post("group/subuser/create", form, {
        emulateJSON: true
      })
      .then(res => {
        snackbar.msg = "Your subuser has been created!";
        dispatch("get_user_groups");
        data.form.email = "";
        data.form.firstname = "";
        data.form.password = "";
        router.push("/index/subusers");
      })
      .catch(e => {
        snackbar.msg =
          e.body.message ||
          e.body.message.message ||
          "Oops! An error occured. Please try again";
      });
  },
  joinSubUser({ commit, dispatch }, data) {
    const { form, snackbar } = data;
    Vue.http
      .post("group/subuser/join", form, {
        emulateJSON: true
      })
      .then(res => {
        snackbar.msg = "Subuser has joined group successfully";
        dispatch("allSubusersByUser");
      })
      .catch(e => {
        snackbar.msg = e.body.message.message || e.body.message;
      })
      .finally((snackbar.show = true));
  },
  allSubusersByUser({ commit }) {
    return Vue.http.get("group/admin_subusers").then(res => {
      commit(mutate.UPDATE_ALL_SUBUSERS, res.body.data);
    });
  },
  getGroupCharts({ commit }, data) {
    const { group_id } = data;
    return Vue.http
      .post("group/dashboard", { group_id }, { emulateJSON: true })
      .then(res => {
        commit(mutate.UPDATE_GROUP_DASHBOARD, res.body.data);
      })
      .catch(e => {});
  }
};

const mutations = {
  [mutate.UPDATE_GROUPS](state, data) {
    state.groups = data;
  },
  [mutate.UPDATE_TENORS](state, data) {
    state.tenors = data;
  },
  [mutate.UPDATE_KOLO_GROUPS](state, data) {
    state.koloGroups = data;
  },
  [mutate.UPDATE_ADMIN_GROUPS](state, data) {
    state.adminGroups = data;
  },
  [mutate.UPDATE_GROUP_VOTES](state, data) {
    state.adminVotes = data;
  },
  [mutate.UPDATE_TENOR_VOTES](state, data) {
    state.tenorVotes = data;
  },
  [mutate.UPDATE_ALL_SUBUSERS](state, data) {
    state.subUsers = data;
  },
  [mutate.UPDATE_FAMILY_GROUPS](state, data) {
    state.familyGroups = data;
  },
  [mutate.UPDATE_EVENT_GROUPS](state, data) {
    state.eventGroups = data;
  },
  [mutate.UPDATE_GROUP_DASHBOARD](state, data) {
    state.groupDashboard = data;
  }
};

export const group = {
  state,
  getters,
  actions,
  mutations
};
