// Form Validation Service - Single Responsibility Principle
import moment from 'moment'
import passwordValidator from '@/utils/passwordValidator'

export class FormValidationService {
  constructor() {
    this.rules = {
      required: (value) => !!value || 'This field is required',
      email: (value) => /\S+@\S+\.\S+/.test(value) || 'Invalid email format',
      minLength: (min) => (value) => value.length >= min || `Minimum ${min} characters required`,
      phone: (value) => /^\d{10,}$/.test(value) || 'Invalid phone number',
      age18Plus: (dob) => this.validateAge(dob) || 'Must be 18 years or older'
    }
  }

  validateAge(dob) {
    if (!dob) return false
    const dobFormatted = moment(dob).format("YYYY-MM-DD")
    const userYear = dobFormatted.split("-")[0]
    const thisYear = new Date().getFullYear()
    const age = Number(thisYear) - Number(userYear)
    return age >= 18
  }

  validateField(value, rules) {
    for (const rule of rules) {
      const result = rule(value)
      if (result !== true) return result
    }
    return true
  }

  validatePassword(password) {
    return passwordValidator.validate(password)
  }

  async validatePasswordWithBreach(password) {
    return await passwordValidator.validateWithBreach(password)
  }

  validateForm(formData) {
    const errors = {}
    
    // Basic field validation
    const fieldRules = {
      firstname: [this.rules.required, this.rules.minLength(2)],
      lastname: [this.rules.required, this.rules.minLength(2)],
      email: [this.rules.required, this.rules.email],
      phone: [this.rules.required, this.rules.phone],
      Next_Of_Kin: [this.rules.required],
      occupation: [this.rules.required],
      dob: [this.rules.required, this.rules.age18Plus]
    }

    Object.keys(fieldRules).forEach(field => {
      const result = this.validateField(formData[field], fieldRules[field])
      if (result !== true) errors[field] = result
    })

    // Password validation
    const passwordValidation = this.validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors
    }

    // Confirm password
    if (formData.password !== formData.cpassword) {
      errors.cpassword = 'Passwords do not match'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }

  validateSingleField(fieldName, value, formData = {}) {
    const fieldRules = {
      firstname: [this.rules.required, this.rules.minLength(2)],
      lastname: [this.rules.required, this.rules.minLength(2)],
      email: [this.rules.required, this.rules.email],
      phone: [this.rules.required, this.rules.phone],
      Next_Of_Kin: [this.rules.required],
      occupation: [this.rules.required],
      dob: [this.rules.required, this.rules.age18Plus],
      cpassword: [(val) => val === formData.password || 'Passwords do not match']
    }

    if (fieldRules[fieldName]) {
      return this.validateField(value, fieldRules[fieldName])
    }
    return true
  }
}

export default new FormValidationService()