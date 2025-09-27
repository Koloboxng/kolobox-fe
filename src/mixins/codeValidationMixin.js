// Code Validation Mixin - Vue 2 Compatible
export default {
  data() {
    return {
      verificationCode: ['', '', '', '', '', ''],
      codeValidation: {
        isValid: false,
        error: null
      }
    }
  },

  computed: {
    isCodeComplete() {
      return this.verificationCode.every(digit => digit !== '')
    },
    
    isCodeValid() {
      const code = this.verificationCode.join('')
      return code.length === 6 && /^[0-9]{6}$/.test(code)
    }
  },

  methods: {
    onlyNumbers(event) {
      const char = String.fromCharCode(event.which)
      if (!/[0-9]/.test(char)) {
        event.preventDefault()
      }
    },
    
    handleCodeInput(index, event) {
      const value = event.target ? event.target.value : event
      
      // Only allow numbers
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
      
      this.validateCode()
    },
    
    handleCodeKeydown(index, event) {
      if (event.key === 'Backspace' && !this.verificationCode[index] && index > 0) {
        const prevInput = this.$refs[`digit${index - 1}`]
        if (prevInput && prevInput[0]) {
          prevInput[0].focus()
        }
      }
    },
    
    validateCode() {
      if (!this.isCodeComplete) {
        this.codeValidation = {
          isValid: false,
          error: null
        }
        return false
      }
      
      if (!this.isCodeValid) {
        this.codeValidation = {
          isValid: false,
          error: 'Please enter a valid 6-digit code'
        }
        return false
      }
      
      this.codeValidation = {
        isValid: true,
        error: null
      }
      return true
    },
    
    getCode() {
      return this.verificationCode.join('')
    },
    
    clearCode() {
      this.verificationCode = ['', '', '', '', '', '']
      this.codeValidation = {
        isValid: false,
        error: null
      }
    }
  }
}