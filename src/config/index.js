const LIVE_KEYS = {
  APIROOT: process.env.VUE_APP_APIROOT_LIVE,
  PAYSTACK_KEY: process.env.VUE_APP_PAYSTACK_KEY_LIVE,
  FLUTTERWAVE_KEY: process.env.VUE_APP_FLUTTERWAVE_KEY_LIVE,
  KOLOFLEX_SUBACCOUNT: process.env.VUE_APP_KOLOFLEX_SUBACCOUNT_LIVE,
  KOLOTARGET_SUBACCOUNT: process.env.VUE_APP_KOLOTARGET_SUBACCOUNT_LIVE
};

const STAGING_KEYS = {
  APIROOT: process.env.VUE_APP_APIROOT_STAGING,
  PAYSTACK_KEY: process.env.VUE_APP_PAYSTACK_KEY_TEST,
  FLUTTERWAVE_KEY: process.env.VUE_APP_FLUTTERWAVE_KEY_TEST,
  KOLOFLEX_SUBACCOUNT: process.env.VUE_APP_KOLOFLEX_SUBACCOUNT_TEST,
  KOLOTARGET_SUBACCOUNT: process.env.VUE_APP_KOLOTARGET_SUBACCOUNT_TEST
};

const LOCAL_KEYS = {
  APIROOT: process.env.VUE_APP_APIROOT_LOCAL,
  PAYSTACK_KEY: process.env.VUE_APP_PAYSTACK_KEY_TEST,
  FLUTTERWAVE_KEY: process.env.VUE_APP_FLUTTERWAVE_KEY_TEST,
  KOLOFLEX_SUBACCOUNT: process.env.VUE_APP_KOLOFLEX_SUBACCOUNT_TEST,
  KOLOTARGET_SUBACCOUNT: process.env.VUE_APP_KOLOTARGET_SUBACCOUNT_TEST
};

const getConfig = () => {
  const env = process.env.VUE_APP_NODE_ENV;
  console.log("🚀 Environment detected:", env)
  console.log("📡 API Root:", env === 'production' ? LIVE_KEYS.APIROOT : env === 'development' ? STAGING_KEYS.APIROOT : LOCAL_KEYS.APIROOT)
  
  if (env === 'production') return LIVE_KEYS;
  if (env === 'development') return STAGING_KEYS;
  return LOCAL_KEYS;
};

export default getConfig();
