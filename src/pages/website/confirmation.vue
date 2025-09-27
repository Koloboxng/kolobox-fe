<template>
  <section class="login-wrapper" data-app>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-9 login-outer">
          <div class="row ">
            <div class="col-sm-6 left-area">
              <img src="@/assets/images/logo-kolobox.png" />
            </div>
            <div class="col-sm-6 right-area">
              <h3 id="welcome-text">Welcome to <span>KoloBox</span></h3>
              <p id="sub-heading">
                Please enter the activation code sent to your mail
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
                    <img src="@/assets/images/email.png" /><input
                      type="text"
                      class="form-control"
                      placeholder="#-#-#-#"
                      name="code"
                      v-mask="'####'"
                      v-model="confirmation_code"
                    />
                  </div>
                </div>

                <div class="bottom-form-area">
                  <div class="buttons-wrapper">
                    <button type="submit" class="btn-submit">RESET</button>
                  </div>
                </div>
              </form>
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
      confirmation_code: "",
      toast: {
        msg: "",
        show: false
      }
    };
  },
  methods: {
    submit() {
      if (this.confirmation_code && this.confirmation_code.length == 4) {
        this.toast.msg = "Confirming...";
        this.toast.show = true;

        let temporaryToken = localStorage.getItem("temporaryToken");
        localStorage.setItem("token", temporaryToken);

        this.$http
          .post(
            "auth/user/password_reset/validate",
            { code: this.confirmation_code },
            { emulateJSON: true }
          )
          .then(res => {
            this.toast.msg = "Your code has been confirmed! Set new password.";
            this.toast.show = true;
            localStorage.removeItem("token");
            setTimeout(() => {
              this.$router.push({ name: "changePassword" });
            }, 1500);
          })
          .catch(e => {
            this.toast.msg =
              e.body.message ||
              e.body.message.message ||
              "Oops! an error occured";
          });
      } else {
        this.toast.msg = "Invalid code!";
        this.toast.show = true;
      }
    }
  },
  created() {
    this.toast.msg = "Please input code sent to your mail";
    this.toast.show = true;
  }
};
</script>

<style scoped>
.link {
  color: blue !important;
}
</style>
