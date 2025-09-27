// Email Validation Mixin - Vue 2 Compatible
import formValidationService from '@/services/FormValidationService'

export default {
  data() {
    return {
      emailValidation: {
        isValid: false,
        error: null
      }
    }
  },

  computed: {
    isEmailValid() {
      return this.emailValidation.isValid
    }
  },

  methods: {
    validateEmail(email) {
      if (!email || email.trim() === '') {
        this.emailValidation = {
          isValid: false,
          error: 'Email is required'
        }
        return false
      }

      const result = formValidationService.validateSingleField('email', email.trim())
      
      if (result === true) {
        this.emailValidation = {
          isValid: true,
          error: null
        }
        return true
      } else {
        this.emailValidation = {
          isValid: false,
          error: 'Please enter a valid email address'
        }
        return false
      }
    }
  }
}