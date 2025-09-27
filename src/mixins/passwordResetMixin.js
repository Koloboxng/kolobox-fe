// Password Reset Mixin - Vue 2 Compatible
import passwordResetService from '@/services/PasswordResetService'
import formValidationService from '@/services/FormValidationService'

export default {
  data() {
    return {
      form: {
        new_password: '',
        new_cpassword: ''
      },
      resetToken: null,
      tokenValidated: false,
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
      passwordStrength: {
        score: 0,
        feedback: '',
        isValid: false
      },
      minLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSpecialChar: false,
      notCompromised: true,
      checkingBreach: false,
      validationErrors: {
        password: null,
        confirmPassword: null
      }
    }
  },

  computed: {
    isFormValid() {
      return this.form.new_password.trim() !== '' && 
             this.form.new_cpassword.trim() !== '' &&
             this.form.new_password === this.form.new_cpassword &&
             this.tokenValidated &&
             this.minLength &&
             this.hasUppercase &&
             this.hasLowercase &&
             this.hasNumber &&
             this.hasSpecialChar &&
             this.notCompromised &&
             !this.validationErrors.confirmPassword &&
             !this.checkingBreach
    }
  },

  async mounted() {
    console.log('passwordResetMixin mounted')
    console.log('Route query:', this.$route.query)
    
    // Initialize requirements to ensure reactivity
    this.initializeRequirements()
    
    await this.validateResetToken()
  },

  methods: {
    async validateResetToken() {
      this.resetToken = this.$route.query.token
      console.log('Reset token from URL:', this.resetToken)
      
      if (!this.resetToken) {
        console.log('No token found, redirecting')
        this.showError('Invalid reset link. Please request a new password reset.')
        this.redirectToForgotPassword()
        return
      }

      // Token exists, allow form to be used
      this.tokenValidated = true
      console.log('Token validated, form enabled')
    },

    async validatePassword() {
      const password = this.form.new_password || ''
      console.log('Validating password:', password)
      
      // Update requirements immediately for reactivity
      const minLength = password.length >= 8
      const hasUppercase = /[A-Z]/.test(password)
      const hasLowercase = /[a-z]/.test(password)
      const hasNumber = /\d/.test(password)
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
      
      console.log('Requirements:', { minLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar })
      
      // Update individual reactive properties
      this.minLength = minLength
      this.hasUppercase = hasUppercase
      this.hasLowercase = hasLowercase
      this.hasNumber = hasNumber
      this.hasSpecialChar = hasSpecialChar
      
      console.log('Updated requirements:', this.passwordRequirements)
      
      if (!password) {
        this.validationErrors.password = null
        this.passwordStrength = { score: 0, feedback: '', isValid: false }
        this.checkingBreach = false
        this.$set(this.passwordRequirements, 'notCompromised', true)
        return
      }

      // Check breach database if basic requirements are met
      const basicRequirementsMet = this.passwordRequirements.minLength && 
                                   this.passwordRequirements.hasUppercase && 
                                   this.passwordRequirements.hasLowercase && 
                                   this.passwordRequirements.hasNumber && 
                                   this.passwordRequirements.hasSpecialChar
      
      if (basicRequirementsMet) {
        this.checkingBreach = true
        
        try {
          const result = await formValidationService.validatePassword(password)
          
          const isCompromised = result.errors.some(error => 
            error.toLowerCase().includes('compromised') || 
            error.toLowerCase().includes('breach') ||
            error.toLowerCase().includes('common')
          )
          
          this.$set(this.passwordRequirements, 'notCompromised', !isCompromised)
          
          this.passwordStrength = {
            score: result.strength ? result.strength.score : 0,
            feedback: result.strength ? result.strength.feedback : '',
            isValid: result.isValid && !isCompromised
          }
          
          this.validationErrors.password = (result.isValid && !isCompromised) ? null : 'Please meet all password requirements'
        } catch (error) {
          this.$set(this.passwordRequirements, 'notCompromised', false)
          this.validationErrors.password = 'Password validation failed'
          this.passwordStrength = { score: 0, feedback: '', isValid: false }
          this.$forceUpdate()
        } finally {
          this.checkingBreach = false
        }
      } else {
        this.checkingBreach = false
        this.$set(this.passwordRequirements, 'notCompromised', true)
        this.passwordStrength = { score: 0, feedback: '', isValid: false }
        this.validationErrors.password = 'Please meet all password requirements'
        this.$forceUpdate()
      }
    },

    validateConfirmPassword() {
      if (!this.form.new_cpassword) {
        this.validationErrors.confirmPassword = null
        return
      }

      if (this.form.new_password !== this.form.new_cpassword) {
        this.validationErrors.confirmPassword = 'Passwords do not match'
      } else {
        this.validationErrors.confirmPassword = null
      }
    },

    async submitPasswordReset() {
      if (!this.isFormValid) {
        this.showError('Please fix the form errors before submitting')
        return
      }

      this.loading = true

      try {
        const result = await passwordResetService.changePassword(this.form.new_password, this.resetToken)
        
        if (result.success) {
          this.showSuccess('Password changed successfully! Redirecting to login...')
          setTimeout(() => {
            this.$router.push('/signin')
          }, 2000)
        } else {
          this.showError(result.error)
        }
      } catch (error) {
        this.showError('Failed to change password. Please try again.')
      } finally {
        this.loading = false
      }
    },

    redirectToForgotPassword() {
      setTimeout(() => {
        this.$router.push('/forgot_password')
      }, 3000)
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },

    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword
    },

    initializeRequirements() {
      // Force Vue reactivity
      this.$set(this, 'passwordRequirements', {
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false,
        notCompromised: true
      })
    },

    showError(message) {
      // Let component handle toast display
      console.error('Password reset error:', message)
    },

    showSuccess(message) {
      // Let component handle toast display  
      console.log('Password reset success:', message)
    }
  },

  watch: {
    'form.new_password'() {
      this.validatePassword()
    },
    
    'form.new_cpassword'() {
      this.validateConfirmPassword()
    }
  }
}