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
                We make it easy to invest in right product, Let your money work
                for you.
              </p>
              <form
                action=""
                method="POST"
                class="form-login-pages"
                id="login-form"
                v-on:submit.prevent="submitPasswordReset"
              >
                <div class="input-group">
                  <div class="input-outer">
                    <img src="@/assets/images/email.png" />
                    <input
                      :type="showPassword ? 'text' : 'password'"
                      v-validate="'required|min:8'"
                      class="form-control"
                      placeholder="New Password"
                      name="password"
                      v-model="form.new_password"
                      @input="validatePassword"
                      :disabled="!tokenValidated"
                    />
                    <span @click="togglePasswordVisibility" class="password-toggle">
                      <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                    </span>
                  </div>
                  
                  <div class="input-outer">
                    <img src="@/assets/images/email.png" />
                    <input
                      :type="showConfirmPassword ? 'text' : 'password'"
                      v-validate="{ required: true, is: form.new_password }"
                      class="form-control"
                      placeholder="Confirm New Password"
                      name="cpassword"
                      v-model="form.new_cpassword"
                      @blur="validateConfirmPassword"
                      :disabled="!tokenValidated"
                    />
                    <span @click="toggleConfirmPasswordVisibility" class="password-toggle">
                      <i :class="showConfirmPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                    </span>
                  </div>
                </div>

                <!-- Password Requirements Section -->
                <div class="password-validation-section">
                  <h4 style="color: #333; font-size: 14px; margin-bottom: 15px; font-weight: bold;">Password Requirements:</h4>
                  
                  <!-- Debug Info -->
                  <div style="font-size: 10px; color: #666; margin-bottom: 10px;">
                    Debug: {{minLength}},{{hasUppercase}},{{hasLowercase}},{{hasNumber}},{{hasSpecialChar}},{{notCompromised}}
                  </div>
                  
                  <ul class="requirements-list">
                    <li :class="minLength ? 'requirement-met' : 'requirement-unmet'">
                      At least 8 characters
                    </li>
                    <li :class="hasUppercase ? 'requirement-met' : 'requirement-unmet'">
                      One uppercase letter
                    </li>
                    <li :class="hasLowercase ? 'requirement-met' : 'requirement-unmet'">
                      One lowercase letter
                    </li>
                    <li :class="hasNumber ? 'requirement-met' : 'requirement-unmet'">
                      One number
                    </li>
                    <li :class="hasSpecialChar ? 'requirement-met' : 'requirement-unmet'">
                      One special character
                    </li>
                    <li :class="notCompromised ? 'requirement-met' : 'requirement-unmet'">
                      <span v-if="checkingBreach">Checking breach database...</span><span v-else>Not a compromised password</span>
                    </li>
                  </ul>
                  
                  <!-- Confirm Password Error -->
                  <div
                    v-show="validationErrors.confirmPassword"
                    class="validation-error"
                    style="margin-top: 10px;"
                    >{{ validationErrors.confirmPassword }}</div>
                </div>

                <div class="bottom-form-area">
                  <div class="buttons-wrapper">
                    <button type="submit" class="btn-submit" :disabled="!isFormValid || loading" :class="{ 'disabled': !isFormValid || loading }">
                      {{ loading ? 'UPDATING...' : 'CONFIRM' }}
                    </button>
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
import passwordResetMixin from '@/mixins/passwordResetMixin'
import PasswordStrength from '@/components/PasswordStrength.vue'

export default {
  components: {
    PasswordStrength
  },
  mixins: [passwordResetMixin],
  
  data() {
    return {
      toast: {
        msg: "",
        show: false
      }
    };
  },
  methods: {
    // Override mixin methods to use component's toast
    showError(message) {
      this.toast.msg = message
      this.toast.show = true
    },

    showSuccess(message) {
      this.toast.msg = message
      this.toast.show = true
    }
  }
};
</script>

<style scoped>
.link {
  color: blue !important;
}

.btn-submit:disabled,
.btn-submit.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #ccc !important;
}

.input-outer {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
  z-index: 10;
}

.password-toggle:hover {
  color: #333;
}

.form-control {
  padding-right: 35px;
}

.password-validation-section {
  margin: 15px 0;
  padding: 15px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  border: 1px solid #ddd;
}

.password-validation-section h4 {
  color: #333 !important;
  margin-bottom: 15px;
}

.validation-error {
  color: #dc3545 !important;
  font-size: 12px;
  font-weight: bold;
  margin: 5px 0;
  display: block;
}

.validation-success {
  color: #28a745 !important;
  font-size: 12px;
  font-weight: bold;
  margin: 5px 0;
  display: block;
}

.requirements-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.requirements-list li {
  padding: 6px 0;
  font-size: 13px;
  line-height: 1.4;
}

.requirements-list li i {
  width: 16px;
  display: inline-block;
  text-align: center;
}

.requirement-met {
  color: #28a745 !important;
}

.requirement-met i {
  color: #28a745 !important;
}

.requirement-unmet {
  color: #dc3545 !important;
}

.requirement-unmet i {
  color: #dc3545 !important;
}
</style>
