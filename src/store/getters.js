export const loaded = state => state.loaded;
export const account = state => state.account;
export const banks = state => state.banks;
export const earnings = state => state.earnings;
export const subscriptions = ({ subscriptions = [] }) => subscriptions;
export const withdrawalDates = ({ withdrawalDates = {} }) => withdrawalDates;
export const products = state => {
  if (!state.account) return [];
  return state.account.Products;
};
export const wallet = state =>
  state.account ? state.account.UserWallet || {} : {};
export const productOptions = ({ products: { productOptions } }) =>
  productOptions;
