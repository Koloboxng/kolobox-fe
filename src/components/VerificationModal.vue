<template>
  <v-dialog v-model="show" max-width="400" persistent>
    <v-card>
      <v-card-title class="headline">Verify Your Account</v-card-title>
      <v-card-text>
        <p>Enter the 6-digit code sent to your email:</p>
        <div class="verification-inputs">
          <v-text-field
            v-for="(digit, index) in verificationCode"
            :key="index"
            :ref="`digit${index}`"
            v-model="verificationCode[index]"
            @input="handleInput(index, $event)"
            @keydown="handleKeydown(index, $event)"
            @keypress="onlyNumbers"
            maxlength="1"
            type="tel"
            class="digit-input"
            :error="hasError"
            outlined
            dense
          />
        </div>
        <v-alert v-if="hasError" type="error" dense>
          {{ errorMessage }}
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="resendCode" :loading="resendLoading">
          Resend Code
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="verifyCode" :loading="loading" :disabled="!isFormComplete">
          Verify
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import authService from '@/services/AuthService'

export default {
  props: {
    value: Boolean,
    email: String,
    userId: [String, Number]
  },
  
  data() {
    return {
      verificationCode: ['', '', '', '', '', ''],
      loading: false,
      resendLoading: false,
      hasError: false,
      errorMessage: ''
    }
  },
  
  computed: {
    show: {
      get() { return this.value },
      set(val) { this.$emit('input', val) }
    },
    isFormComplete() {
      return this.verificationCode.every(digit => digit !== '')
    }
  },
  
  watch: {
    show(val) {
      if (val) {
        this.$nextTick(() => {
          if (this.$refs.digit0 && this.$refs.digit0[0]) {
            this.$refs.digit0[0].focus()
          }
        })
      }
    }
  },
  
  methods: {
    onlyNumbers(event) {
      const char = String.fromCharCode(event.which)
      if (!/[0-9]/.test(char)) {
        event.preventDefault()
      }
    },
    
    handleInput(index, event) {
      // Only allow numbers
      const value = event.target ? event.target.value : event
      if (value && !/^[0-9]$/.test(value)) {
        this.verificationCode[index] = ''
        return
      }
      
      if (value && index < 5) {
        const nextInput = this.$refs[`digit${index + 1}`]
        if (nextInput && nextInput[0]) {
          nextInput[0].focus()
        }
      }
      this.hasError = false
    },
    
    handleKeydown(index, event) {
      if (event.key === 'Backspace' && !this.verificationCode[index] && index > 0) {
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
      
      if (!this.userId) {
        this.showError('User ID is required for verification')
        return
      }
      
      this.loading = true
      
      try {
        const result = await authService.verifyAccount(code, this.userId)
        
        if (result.success) {
          this.$emit('verified')
          this.show = false
        } else {
          this.showError(result.error)
        }
        
      } catch (error) {
        this.showError('Verification failed')
      } finally {
        this.loading = false
      }
    },
    
    async resendCode() {
      this.resendLoading = true
      
      try {
        const result = await authService.resendVerification(this.email)
        
        if (result.success) {
          this.$emit('code-sent')
        } else {
          this.showError(result.error)
        }
        
      } catch (error) {
        this.showError('Failed to resend code')
      } finally {
        this.resendLoading = false
      }
    },
    
    showError(message) {
      this.hasError = true
      this.errorMessage = message
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
  max-width: 50px;
}

.digit-input >>> input {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}
</style>