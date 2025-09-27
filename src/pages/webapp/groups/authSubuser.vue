<template>
  <section class="login-wrapper" data-app>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-9 login-outer">
          <div class="row" id="cardContainer">
            <div class="col-sm-6 left-area">
              <img src="@/assets/images/logo-kolobox.png" alt="logo-kolobox" />
            </div>
            <div class="col-sm-6 right-area">
              <h3 id="welcome-text">Welcome to <span>KoloBox</span></h3>
              <p id="sub-heading">
                We make it easy to invest in right product, Let your money work
                for you.
              </p>
              <form
                action=""
                method="POST"
                class="form-login-pages"
                id="login-form"
                v-on:submit.prevent="submit"
              >
                <div class="input-group">
                  <div class="input-outer">
                    <img src="@/assets/images/email.png" alt="email" /><input
                      type="email"
                      class="form-control"
                      placeholder="Email address"
                      name="email"
                      v-model="form.username"
                      required
                    />
                  </div>
                  <div class="input-outer">
                    <v-layout>
                      <img
                        src="@/assets/images/password.png"
                        alt="password"
                        id="password-img"
                      /><input
                        :type="showPassword ? 'text' : 'password'"
                        class="form-control"
                        id="password-form"
                        placeholder="Password"
                        name="password"
                        v-model="form.password"
                        required
                      />
                      <v-icon dark @click="showPassword = !showPassword">{{
                        showPassword ? "visibility" : "visibility_off"
                      }}</v-icon>
                    </v-layout>
                  </div>
                </div>

                <div class="bottom-form-area">
                  <div class="buttons-wrapper">
                    <button type="submit" class="btn-submit">Login</button>
                  </div>
                </div>
              </form>
              <div class="activateAccount-wrapper">
                <router-link class="link" to="/signin"
                  >Login as User</router-link
                >
                or
                <router-link class="link" to="/activate"
                  >Activate account</router-link
                >
                or
                <router-link class="link" to="/signup"
                  >Don't have an account? Sign up</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-snackbar v-model="toast.show" top right color="black">
      {{ toast.msg }}
      <v-btn flat dark small @click.native="toast.show = false">Close</v-btn>
    </v-snackbar>
  </section>
</template>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HP1WKQF3LQ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HP1WKQF3LQ');
</script>

<script>
export default {
  data() {
    return {
      valid: true,
      form: {
        username: "",
        password: "",
        busy: false
      },
      toast: {
        msg: "",
        show: false
      },
      showPassword: false
    };
  },
  computed: {
    canSubmit() {
      return this.form.username.length && this.form.password.length;
    }
  },
  methods: {
    submit() {
      //if (!this.canSubmit) return
      this.form.busy = true;
      this.toast.msg = "Signing in...";
      this.toast.show = true;

      setTimeout(() => {
        this.$auth.subuserlogin(
          this,
          this.form,
          "/index/investment",
          errors => {
            this.toast.msg = errors.body.message;
            this.toast.show = true;
            this.form.busy = false;
          }
        );
      }, 1500);
    }
  }
};
</script>

<style scoped>
.link {
  color: blue !important;
}
.buttons-wrapper a {
  background: #fff;
  padding: 10px;
  box-shadow: 1px 0px 17px -2px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #117edc !important;
  font-weight: bold;
  font-size: 14px;
}
.theme--dark.v-icon {
  color: rgb(161, 161, 161) !important;
}

#cardContainer {
  height: 600px;
}
</style>
