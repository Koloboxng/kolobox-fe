import * as mutate from "./mutation-types";

export default {
  [mutate.UPDATE_ACCOUNT](state, data) {
    state.account = data;
  },
  [mutate.UPDATE_ACCOUNT_DETAILS](state, data) {
    state.account.user.email = data.email;
    state.account.user.dob = data.dob;
    state.account.user.firstname = data.firstname;
    state.account.user.lastname = data.lastname;
    state.account.user.occupation = data.occupation;
    state.account.user.phone = data.phone;
  },
  [mutate.UPDATE_ACCOUNT_BANKS](state, data) {
    state.account.UserBankAccounts = data;
  },
  [mutate.SET_APP_LOADED](state) {
    state.loaded = true;
  },
  [mutate.UPDATE_BANKS](state, data) {
    state.banks = data;
  },
  [mutate.UPDATE_EARNINGS](state, data) {
    state.earnings = data;
  },
  [mutate.UPDATE_SUBSCRIPTIONS](state, data) {
    state.subscriptions = data;
  },
  [mutate.SAVE_WITHDRAWAL_DATES](state, data) {
    state.withdrawalDates = data;
  }
};
