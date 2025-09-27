<template>
  <section class="login-wrapper forgot-password" data-app>
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
                                    <!-- <img class="logo-size" src="https://fe-staging.kolobox.ng/img/logo-kolobox.fff5e8f1.png" alt=""> -->
                                    <img class="logo-size" src="images/logo-light.svg" alt="">
                                </div>
                            </a>
                        </div>
                        <h3>Password Reset</h3>
                        <p>To reset your password, enter the email address you used to sign in to kolobox</p>
                        <form
                          action=""
                method="POST"
                class="form-login-pages form-forgot-password-pages"
                id="forgot-password-form"
                v-on:submit.prevent="validate">
                            <input class="form-control" name="registeredEmail" 
                            id="registeredEmail"
                      v-validate="'required|email'"
                      v-model="email"
                      @blur="validateEmail(email)"
                      type="email"
                            placeholder="E-mail Address" required>
                             <div
                      v-show="errors.has('registeredEmail') || emailValidation.error"
                      class="text-danger"
                      style="font-size:9px;font-weight:bold;margin-bottom:10px;"
                      >{{ emailValidation.error || errors.first("registeredEmail") }}</div>
                            <div class="form-button full-width">
                                <button id="submit" type="submit" class="ibtn btn-forget" :disabled="!isFormValid" :class="{ 'disabled': !isFormValid }">Send Reset Link</button>
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
import { setTimeout } from "timers";
import emailValidationMixin from '@/mixins/emailValidationMixin'
import passwordResetService from '@/services/PasswordResetService'

export default {
  mixins: [emailValidationMixin],
  
  data() {
    return {
      email: "",
      toast: {
        show: false,
        msg: ""
      }
    };
  },
  
  computed: {
    isFormValid() {
      return this.isEmailValid && this.email.trim() !== ''
    }
  },
  
  watch: {
    email() {
      this.validateEmail(this.email)
    }
  },
  methods: {
    validate() {
      this.$validator
        .validateAll()
        .then(result => {
          if (result) this.submit();
        })
        .catch(e => {
          this.toast.msg = "Oops! An error occured. Please try again";
          this.toast.show = true;
        });
    },
    async submit() {
      this.toast.msg = "Sending...";
      this.toast.show = true;
      
      try {
        const result = await passwordResetService.requestReset(this.email)
        
        if (result.success) {
          this.toast.msg = (result.data.data && result.data.data.message) || "Reset link sent to your email!";
          this.toast.show = true;
          this.email = "";
          
          setTimeout(() => {
            this.$router.push("/signin");
          }, 3000);
        } else {
          this.toast.msg = result.error;
          this.toast.show = true;
        }
        
      } catch (error) {
        this.toast.msg = "An error occurred. Please try again.";
        this.toast.show = true;
      }
    }
  }
};
</script>

<style scoped>
.ibtn:disabled,
.ibtn.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #ccc !important;
}
</style>
