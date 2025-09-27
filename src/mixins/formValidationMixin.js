// Form Validation Mixin - Vue 2 Compatible
import formValidationService from '@/services/FormValidationService'

export default {
  data() {
    return {
      formValidation: {
        errors: {},
        fieldErrors: {},
        passwordValidation: {
          isValid: false,
          errors: [],
          strength: 'weak'
        }
      },
      passwordTimeout: null
    }
  },

  computed: {
    isFormValid() {
      return (
        this.form.firstname &&
        this.form.lastname &&
        this.form.email &&
        this.form.dob &&
        this.form.phone &&
        this.form.Next_Of_Kin &&
        this.form.occupation &&
        this.form.password &&
        this.form.cpassword &&
        this.form.password === this.form.cpassword &&
        this.formValidation.passwordValidation.isValid &&
        this.checkAge()
      )
    }
  },

  methods: {
    async validatePassword() {
      if (!this.form.password) {
        this.formValidation.passwordValidation = {
          isValid: false,
          errors: [],
          strength: 'weak'
        }
        this.formValidation.fieldErrors.password = null
        return
      }
      
      // Clear previous timeout
      if (this.passwordTimeout) {
        clearTimeout(this.passwordTimeout)
      }
      
      // Basic validation first
      const basicValidation = formValidationService.validatePassword(this.form.password)
      this.formValidation.passwordValidation = basicValidation
      
      if (!basicValidation.isValid) {
        this.formValidation.fieldErrors.password = 'Password requirements not met'
        return
      }
      
      // Debounce breach checking (wait 1 second after user stops typing)
      this.passwordTimeout = setTimeout(async () => {
        try {
          const breachValidation = await formValidationService.validatePasswordWithBreach(this.form.password)
          this.formValidation.passwordValidation = breachValidation
          this.formValidation.fieldErrors.password = breachValidation.isValid ? null : 'Password has security issues'
        } catch (error) {
          // If breach check fails, keep basic validation
          console.warn('Breach check failed:', error)
        }
      }, 1000)
    },

    validateField(fieldName) {
      const result = formValidationService.validateSingleField(fieldName, this.form[fieldName], this.form)
      this.formValidation.fieldErrors[fieldName] = result === true ? null : result
    },

    validateForm() {
      this.validatePassword()
      const result = formValidationService.validateForm(this.form)
      this.formValidation.errors = result.errors
      this.formValidation.fieldErrors = { ...result.errors }
      return result.isValid && this.formValidation.passwordValidation.isValid
    },

    checkAge() {
      return formValidationService.validateAge(this.form.dob)
    }
  }
}