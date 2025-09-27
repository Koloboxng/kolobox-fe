import Vue from "vue";

const Auth = {
  install(
    vue,
    options = {
      loginUrl: "/api/login",
      signupUrl: "/api/users",
      logoutUrl: "/api/logout",
      subuserLoginUrl: "/api/subuser/login",
      refresh: false
    }
  ) {
    vue.prototype.$auth = new Authenticate(
      vue,
      options.loginUrl,
      options.signupUrl,
      options.logoutUrl,
      options.subuserLoginUrl
    );

    vue.http.interceptors.push((request, next) => {
      // console.log(request)

      if (!request.headers.hasOwnProperty("Authorization")) {
        request.headers.set(
          "Authorization",
          "Bearer " + localStorage.getItem("token")
        );
        request.headers.set("Accept", "application/json");
      }

      if (options.refresh) {
        return next(response => {
          // console.log(response)
          if (response.status === 401) {
            vue.prototype.$auth.removeToken();
            window.location.pathname = "/signin";
          }
          if (response.body.data && response.body.data.token) {
            vue.prototype.$auth.setToken(response.body.data.token);
          }
        });
      }
      return next();
    });
  }
};

if (typeof exports == "object") {
  // Export
  module.exports = Auth;
} else if (window.Vue) {
  // Vue use if vue is being used on the page
  Vue.use(Auth);
}

class Authenticate {
  constructor(context, loginUrl, signupUrl, logoutUrl, subuserLoginUrl) {
    this.authenticated = this.check();
    this.loginUrl = loginUrl;
    this.signupUrl = signupUrl;
    this.logoutUrl = logoutUrl;
    this.subuserLoginUrl = subuserLoginUrl;
    this.context = context;
  }

  login(context, input, redirectUrl = false, errorHandler = false) {
    this.context.http
      .post(this.loginUrl, input, { emulateJSON: true })
      .then(response => {
        this.setToken(response.body.data.token);

        this.authenticated = true;

        redirect(context, redirectUrl);
      }, handleErrors(errorHandler));
  }

  subuserlogin(context, input, redirectUrl = false, errorHandler = false) {
    this.context.http
      .post(this.subuserLoginUrl, input, { emulateJSON: true })
      .then(response => {
        this.setToken(response.body.data.token);

        this.authenticated = true;

        redirect(context, redirectUrl);
      }, handleErrors(errorHandler));
  }

  register(
    context,
    input,
    redirectUrl = false,
    errorHandler = false,
    login = true
  ) {
    this.context.http
      .post(this.signupUrl, input, { emulateJSON: true })
      .then(response => {
        if (login) {
          this.setToken(response.body.data.token);

          this.authenticated = true;
        }
        redirect(context, redirectUrl);
      }, handleErrors(errorHandler));
  }

  logout(context, refreshUrl = false) {
    this.removeToken();
    this.authenticated = false;

    redirect(context, refreshUrl);
  }

  check() {
    return validToken(this.getToken());
  }

  getToken() {
    return localStorage.getItem("token");
  }

  setToken(token) {
    localStorage.setItem("token", token);
  }

  removeToken() {
    localStorage.removeItem("token");
  }
}

function redirect(context, redirectUrl) {
  if (redirect !== false) {
    context.$router.replace(redirectUrl);
  }
}

function validToken(token) {
  if (typeof token !== "undefined" && token !== null) {
    return true;
  }
  return false;
}

function handleErrors(errorHandler) {
  return errors => {
    if (errorHandler !== false) {
      errorHandler(errors);
    }
  };
}

export default Auth;
