import Vue from "vue";
import * as mutate from "./mutation-types";

export const resetPIN = ({ commit }, data) => {
  let email = data.email;
  let snackbar = data.snackbar;
  return Vue.http
    .post("auth/user/forget_pin", { emailPhone: email }, { emulateJSON: true })
    .then(res => {
      snackbar.msg = "Please go to your mail, to complete process";
      snackbar.show = true;
    })
    .catch(e => {
      snackbar.msg = e.body.message || e.body.message.message;
    });
};

export const getProfile = ({ commit }) => {
  Vue.http.get("helpers/banks").then(res => {
    commit(mutate.UPDATE_BANKS, res.body.data);
  });
  Vue.http.get("user/me/withdrawals").then(res => commit(mutate.SAVE_WITHDRAWAL_DATES, res.body.data));
  Vue.http.get("user/me/subscriptions").then(res => commit(mutate.UPDATE_SUBSCRIPTIONS, res.body.data));
  return Vue.http.get("user/me/profile").then(res => {
    commit(mutate.UPDATE_ACCOUNT, res.body.data);
    commit(mutate.SET_APP_LOADED);
  });
};

export const updateProfile = ({ commit }, data) => {
  let form = data.form;
  let snackbar = data.snackbar;

  if (form.busy) return;

  form.busy = true;
  Vue.http
    .put("user/me/update", form, { emulateJSON: true })
    .then(res => {
      form.busy = false;
      snackbar.msg = "Your account details have been updated!";
      snackbar.show = true;
      commit(mutate.UPDATE_ACCOUNT_DETAILS, res.body.data);
    })
    .catch(e => {
      form.busy = false;
      snackbar.msg =
        e.body.message ||
        e.body.message.message ||
        "Oops! Our Engineers are on it. Try again.";
      snackbar.show = true;
    });
};

export const addBank = ({ commit, dispatch }, data) => {
  const { form, snackbar, bankForm } = data;
  if (form.busy) return;
  form.busy = true;

  snackbar.msg = "Adding...";
  snackbar.show = true;

  async function doAddBank() {
    await Vue.http.get(
      `helpers/verifyAccount?account_number=${form.account_number}&bank_code=${
        form.bank_code
      }`
    );
    await Vue.http
      .post("user/me/bank", form, { emulateJSON: true })
      .then(res => {
        commit(mutate.UPDATE_ACCOUNT_BANKS, res.body.data);
        dispatch("getProfile");
        bankForm.bank_name = {};
        bankForm.account_number = "";
        bankForm.account_name = "";
        form.busy = false;
        snackbar.msg = "Bank account has been added!";
        snackbar.show = true;
        //data.formRef.reset()
      });
  }

  doAddBank().catch(e => {
    snackbar.msg =
      e.body.message ||
      e.body.message.message ||
      "Oops! An error occured. Try again.";
    form.busy = false;
    snackbar.show = true;
  });
};
export const removeBank = ({ dispatch, commit }, data) => {
  let id = data.id;
  let snackbar = data.snackbar;
  let pin = String(data.pin);
  snackbar.msg = "Please wait while we remove bank account...";
  snackbar.show = true;

  Vue.http
    .delete(`user/me/bank/${id}`, { body: { pin } }, { emulateJSON: true })
    .then(res => {
      dispatch("getProfile");
      snackbar.msg = "Your bank account has been removed";
    })
    .catch(() => {
      snackbar.msg = "Oops! An Error occured. Try again.";
      snackbar.show = true;
    });
};

export const updatePin = ({ commit }, data) => {
  let form = data.pinForm;
  let snackbar = data.snackbar;

  if (form.busy) return;
  form.busy = true;
  snackbar.msg = "Updating...";
  snackbar.show = true;
  Vue.http
    .put("user/me/pin", form, { emulateJSON: true })
    .then(res => {
      form.busy = false;
      snackbar.msg = "Your pin has been updated!";
      snackbar.show = true;
      form.old_pin = "";
      form.new_pin = "";
      //data.formRef.reset()
    })
    .catch(err => {
      form.busy = false;
      snackbar.msg =
        err.body.message || "Oops! Our Engineers are on it. Try again.";
      snackbar.show = true;
    });
};

export const withdraw = ({ commit }, form) => {
  return Vue.http.post("user/account/transfer", form);
};

export const resetPassword = ({ commit }, form) => {
  if (form.busy) return;
  form.busy = true;
  return Vue.http.post("auth/user/forget_password", form, {
    emulateJSON: true
  });
};

export const getEarnings = ({ commit }) => {
  Vue.http.get("user/me/earning").then(res => {
    commit(mutate.UPDATE_EARNINGS, res.body.data);
  });
};

export const setPin = ({ commit }, pin) => {
  return Vue.http.post("user/me/pin", { pin }, { emulateJSON: true });
};

export const pauseAutoSubscription = ({ dispatch }, { id, next_pay_day }) => {
  return Vue.http
    .post(
      "user/me/subscriptions",
      { subscription_id: id, status: false, next_pay_date: next_pay_day },
      { emulateJSON: true })
    .then(({ data }) => {
      dispatch("getProfile");
      dispatch("getEarnings");

      return data;
    });
};

export const resumeAutoSubscription = ({ dispatch }, { id, next_pay_day }) => {
  return Vue.http
    .post(
      "user/me/subscriptions",
      { subscription_id: id, status: true, next_pay_date: next_pay_day },
      { emulateJSON: true })
    .then(({ data }) => {
      dispatch("getProfile");
      dispatch("getEarnings");

      return data;
    });
};
