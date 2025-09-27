// Password validation utility

export class PasswordValidator {
  constructor() {
    this.commonPasswords = [
      'password', '123456', '123456789', 'qwerty', 'abc123', 'password123',
      'admin', 'letmein', 'welcome', 'monkey', '1234567890', 'password1',
      'qwerty123', '123123', 'admin123', 'root', 'toor', 'pass', 'test',
      'guest', 'info', 'adm', 'mysql', 'user', 'administrator', 'oracle',
      'ftp', 'pi', 'puppet', 'ansible', 'ec2-user', 'vagrant', 'azureuser'
    ]
  }

  validate(password) {
    const errors = []
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }
    
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number')
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain at least one special character')
    }
    
    if (this.isCommonPassword(password)) {
      errors.push('Password is too common. Please choose a stronger password')
    }
    
    if (this.hasRepeatingChars(password)) {
      errors.push('Password should not have repeating characters')
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors,
      strength: this.calculateStrength(password)
    }
  }

  isCommonPassword(password) {
    return this.commonPasswords.includes(password.toLowerCase())
  }

  hasRepeatingChars(password) {
    return /(.)\1{2,}/.test(password)
  }

  calculateStrength(password) {
    let score = 0
    
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/\d/.test(password)) score += 1
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1
    if (password.length >= 16) score += 1
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1
    
    if (score <= 2) return 'weak'
    if (score <= 4) return 'medium'
    if (score <= 6) return 'strong'
    return 'very-strong'
  }

  async sha1(message) {
    const msgBuffer = new TextEncoder().encode(message)
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase()
  }

  async checkPasswordBreach(password) {
    try {
      // Use SHA-1 hash for HaveIBeenPwned API
      const hash = await this.sha1(password)
      const prefix = hash.substring(0, 5)
      const suffix = hash.substring(5)
      
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`)
      const data = await response.text()
      
      // Check if our hash suffix appears in the response
      const lines = data.split('\n')
      for (const line of lines) {
        const [hashSuffix, count] = line.split(':')
        if (hashSuffix.trim() === suffix) {
          return { breached: true, count: parseInt(count) }
        }
      }
      
      return { breached: false, count: 0 }
    } catch (error) {
      // If API fails, don't block the user
      console.warn('Password breach check failed:', error)
      return { breached: false, count: 0 }
    }
  }

  async validateWithBreach(password) {
    const basicValidation = this.validate(password)
    
    if (!basicValidation.isValid) {
      return basicValidation
    }
    
    // Check for breaches
    const breachCheck = await this.checkPasswordBreach(password)
    
    if (breachCheck.breached) {
      return {
        isValid: false,
        errors: [...basicValidation.errors, 'Password has been found in data breaches. Please choose a different password.'],
        strength: basicValidation.strength
      }
    }
    
    return basicValidation
  }
}

export default new PasswordValidator()