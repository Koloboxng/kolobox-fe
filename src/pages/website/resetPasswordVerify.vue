<template>
  <div class="form-body" data-app>
    <div class="row">
      <div class="img-holder">
        <div class="bg"></div>
        <div class="info-holder">
          <h3>Verify Reset Code</h3>
          <p>Enter the 6-digit code sent to your email</p>
          <img src="@/assets/images/4002800.svg" alt="">
        </div>
      </div>
      <div class="form-holder">
        <div class="form-content">
          <div class="form-items">
            <div class="website-logo-inside">
              <a href="#">
                <div class="logo"></div>
              </a>
            </div>
            <div class="page-links">
              <a href="#" class="active">Verify Code</a>
            </div>
            
            <form @submit.prevent="verifyCode">
              <div class="verification-inputs">
                <input 
                  v-for="(digit, index) in verificationCode" 
                  :key="index"
                  :ref="`digit${index}`"
                  v-model="verificationCode[index]"
                  @input="handleCodeInput(index, $event)"
                  @keydown="handleCodeKeydown(index, $event)"
                  @keypress="onlyNumbers"
                  type="tel" 
                  maxlength="1" 
                  class="digit-input"
                  :class="{ 'error': codeValidation.error }"
                />
              </div>
              
              <div v-if="codeValidation.error" class="error-message">
                {{ codeValidation.error }}
              </div>
              
              <div class="form-button">
                <button type="submit" class="ibtn" :disabled="loading || !isCodeValid">
                  {{ loading ? 'Verifying...' : 'Verify Code' }}
                </button>
              </div>
              
              <div class="resend-section">
                <p>Didn't receive the code?</p>
                <button type="button" @click="resendCode" :disabled="resendLoading" class="resend-btn">
                  {{ resendLoading ? 'Sending...' : 'Resend Code' }}
                </button>
              </div>
            </form>
            
            <div class="other-links">
              <router-link class="link" style="color:#fff" to="/signin">
                Back to Sign In
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <v-snackbar v-model="toast.show" top right color="black">
      {{ toast.msg }}
      <v-btn flat dark small @click.native="toast.show = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import codeValidationMixin from '@/mixins/codeValidationMixin'
import passwordResetService from '@/services/PasswordResetService'

export default {
  mixins: [codeValidationMixin],
  
  data() {
    return {
      loading: false,
      resendLoading: false,
      toast: {
        show: false,
        msg: ''
      },
      resetToken: null
    }
  },
  
  mounted() {
    // Check for token in URL or localStorage
    this.resetToken = this.$route.query.token || localStorage.getItem('resetToken')
    
    if (!this.resetToken) {
      this.showError('Invalid reset session. Please request a new password reset.')
      setTimeout(() => {
        this.$router.push('/forgot_password')
      }, 3000)
      return
    }
    
    // Focus first input
    this.$nextTick(() => {
      if (this.$refs.digit0 && this.$refs.digit0[0]) {
        this.$refs.digit0[0].focus()
      }
    })
  },
  
  methods: {
    async verifyCode() {
      if (!this.isCodeValid) {
        this.showError('Please enter a valid 6-digit code')
        return
      }
      
      this.loading = true
      
      try {
        const code = this.getCode()
        const result = await passwordResetService.validateResetCode(code, this.resetToken)
        
        if (result.success) {
          this.toast.msg = 'Code verified successfully!'
          this.toast.show = true
          
          // Store token for password change
          localStorage.setItem('verifiedResetToken', this.resetToken)
          localStorage.removeItem('resetToken')
          
          setTimeout(() => {
            this.$router.push('/change_password')
          }, 1500)
        } else {
          this.showError(result.error)
        }
        
      } catch (error) {
        this.showError('Verification failed. Please try again.')
      } finally {
        this.loading = false
      }
    },
    
    async resendCode() {
      const email = this.$route.query.email || localStorage.getItem('resetEmail')
      
      if (!email) {
        this.showError('Cannot resend code. Please start password reset again.')
        return
      }
      
      this.resendLoading = true
      
      try {
        const result = await passwordResetService.requestReset(email)
        
        if (result.success) {
          this.resetToken = result.token
          localStorage.setItem('resetToken', result.token)
          this.toast.msg = 'New code sent to your email!'
          this.toast.show = true
          this.clearCode()
        } else {
          this.showError(result.error)
        }
        
      } catch (error) {
        this.showError('Failed to resend code. Please try again.')
      } finally {
        this.resendLoading = false
      }
    },
    
    showError(message) {
      this.codeValidation.error = message
      this.toast.msg = message
      this.toast.show = true
    }
  }
}
</script>

<style scoped>
.verification-inputs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

.digit-input {
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #333;
  line-height: 46px;
  padding: 0;
}

.digit-input:focus {
  border-color: #007bff;
  outline: none;
}

.digit-input.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  text-align: center;
  margin: 10px 0;
  font-size: 14px;
}

.resend-section {
  text-align: center;
  margin: 20px 0;
}

.resend-section p {
  color: #fff;
  margin-bottom: 10px;
}

.resend-btn {
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.resend-btn:hover {
  background: #fff;
  color: #333;
}

.resend-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ibtn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #ccc !important;
}
</style>