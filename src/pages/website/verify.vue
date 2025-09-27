<template>
  <div class="form-body" data-app>
    <div class="row">
      <div class="img-holder">
        <div class="bg"></div>
        <div class="info-holder">
          <h3>Verify Your Account</h3>
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
              <a href="#" class="active">Verify Account</a>
            </div>
            
            <form @submit.prevent="verifyCode">
              <div class="verification-inputs">
                <input 
                  v-for="(digit, index) in verificationCode" 
                  :key="index"
                  :ref="`digit${index}`"
                  v-model="verificationCode[index]"
                  @input="handleInput(index, $event)"
                  @keydown="handleKeydown(index, $event)"
                  @keypress="onlyNumbers"
                  type="tel" 
                  maxlength="1" 
                  class="digit-input"
                  :class="{ 'error': hasError }"
                />
              </div>
              
              <div v-if="hasError" class="error-message">
                {{ errorMessage }}
              </div>
              
              <div class="form-button">
                <button type="submit" class="ibtn" :disabled="loading || !isFormComplete">
                  {{ loading ? 'Verifying...' : 'Verify' }}
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
import axios from 'axios'
import config from '@/config'

export default {
  data() {
    return {
      verificationCode: ['', '', '', '', '', ''],
      loading: false,
      resendLoading: false,
      hasError: false,
      errorMessage: '',
      toast: {
        show: false,
        msg: ''
      }
    }
  },
  
  computed: {
    isFormComplete() {
      return this.verificationCode.every(digit => digit !== '')
    }
  },
  
  mounted() {
    // Check for required query parameters - need at least email or userId
    const { email, userId, code } = this.$route.query
    if (!email && !userId && !code) {
      this.$router.push('/signin')
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
    onlyNumbers(event) {
      const char = String.fromCharCode(event.which)
      if (!/[0-9]/.test(char)) {
        event.preventDefault()
      }
    },
    
    handleInput(index, event) {
      const value = event.target.value
      
      // Only allow numbers
      if (value && !/^[0-9]$/.test(value)) {
        this.verificationCode[index] = ''
        return
      }
      
      if (value && index < 5) {
        // Move to next input
        const nextInput = this.$refs[`digit${index + 1}`]
        if (nextInput && nextInput[0]) {
          nextInput[0].focus()
        }
      }
      
      this.hasError = false
    },
    
    handleKeydown(index, event) {
      if (event.key === 'Backspace' && !this.verificationCode[index] && index > 0) {
        // Move to previous input on backspace
        const prevInput = this.$refs[`digit${index - 1}`]
        if (prevInput && prevInput[0]) {
          prevInput[0].focus()
        }
      }
    },
    
    async verifyCode() {
      const code = this.verificationCode.join('')
      
      if (code.length !== 6 || !/^[0-9]{6}$/.test(code)) {
        this.showError('Please enter all 6 digits (numbers only)')
        return
      }
      
      const userId = this.$route.query.userId || this.$route.query.id
      const email = this.$route.query.email
      
      if (!userId && !email) {
        this.showError('User ID or email is required for verification')
        return
      }
      
      this.loading = true
      
      try {
        const payload = { code: code }
        
        if (userId) {
          payload.id = userId
        } else if (email) {
          payload.email = email
        }
        
        const response = await axios.post(`${config.APIROOT}/auth/user/verify/code`, payload)
        
        this.toast.msg = 'Account verified successfully!'
        this.toast.show = true
        
        setTimeout(() => {
          this.$router.push('/signin')
        }, 2000)
        
      } catch (error) {
        this.showError((error.response && error.response.data && error.response.data.message) || 'Verification failed')
      } finally {
        this.loading = false
      }
    },
    
    async resendCode() {
      this.resendLoading = true
      
      try {
        const email = this.$route.query.email
        await axios.post(`${config.APIROOT}/auth/user/resend/confirmation_code`, {
          emailPhone: email
        })
        
        this.toast.msg = 'Verification code sent!'
        this.toast.show = true
        
      } catch (error) {
        this.showError((error.response && error.response.data && error.response.data.message) || 'Failed to resend code')
      } finally {
        this.resendLoading = false
      }
    },
    
    showError(message) {
      this.hasError = true
      this.errorMessage = message
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