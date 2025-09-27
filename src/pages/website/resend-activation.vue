<template>
  <section class="login-wrapper" data-app>
    <div class="form-body">
        <div class="row">
            <div class="img-holder">
                <div class="bg"></div>
                <div class="info-holder">
                    <h3>Welcome to KoloBox</h3>
                    <p>We make it easy to invest in right product, Let your money work for you</p>
                    <img src="@/assets/images/4002800.svg" alt="">
                </div>
            </div>
            <div class="form-holder">
                <div class="form-content">
                    <div class="form-items">
                        <div class="website-logo-inside">
                            <a href="">
                                <div class="logo">
                                    <img class="logo-size" src="https://fe-staging.kolobox.ng/img/logo-kolobox.fff5e8f1.png" alt="">
                                    <img class="logo-size" src="images/logo-light.svg" alt="">
                                </div>
                            </a>
                        </div>
                        <h3>Account Activation</h3>
                        <p>Please Enter Email or Phone number</p>
                        <form
                            action=""
                method="POST"
                class="form-login-pages"
                id="login-form"
                v-on:submit.prevent="validateForm">
                            <input class="form-control" type="text"
                     
                      placeholder="Email or Phone number"
                      name="email"
                      v-validate="'required'"
                      v-model="emailPhone"
                      required>
                       <span
                    v-show="errors.has('email')"
                    class="text-danger"
                    style="font-size:9px;font-weight:bold;"
                    >{{ errors.first("email") }}</span
                  >
                            <div class="form-button full-width">
                                <button id="submit" type="submit" class="ibtn btn-forget">Send Activation Link</button>
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
      emailPhone: "",
      toast: {
        msg: "",
        show: false
      }
    };
  },
  methods: {
    validateForm() {
      this.$validator
        .validateAll()
        .then(result => {
          if (result) {
            this.submit();
          }
        })
        .catch(e => {
          this.toast.msg = "Oops! An error occured. Please try again";
          this.toast.show = true;
        });
    },
    submit() {
      this.toast.msg = "Resending activation code";
      this.toast.show = true;
      let emailPhone = this.emailPhone;
      this.$http
        .post(
          "auth/user/resend/confirmation_code",
          { emailPhone },
          { emulateJSON: true }
        )
        .then(res => {
          this.toast.msg = "Your code has been sent!";
          this.toast.show = true;
          this.emailPhone = "";
          setTimeout(() => {
            this.$router.push("/activate");
          }, 1000);
        })
        .catch(e => {
          this.toast.msg = (e.body && e.body.message) || "Oops! An Error occured. Please complete via Email";
          this.toast.show = true;
        });
    }
  }
};
</script>

<style scoped>
.link {
  color: blue !important;
}
</style>
