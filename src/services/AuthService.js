// Authentication Service - Single Responsibility Principle
import axios from 'axios'
import config from '@/config'

export class AuthService {
  constructor() {
    this.baseURL = config.APIROOT
  }

  async register(userData) {
    try {
      const response = await axios.post(`${this.baseURL}/auth/user/create`, {
        ...userData,
        referrerHost: window.location.origin
      })
      return { 
        success: true, 
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        error: (error.response && error.response.data && error.response.data.message) || 'Registration failed'
      }
    }
  }

  async verifyAccount(code, userId, email = null) {
    try {
      const payload = { code: code.toString() }
      
      if (userId) {
        payload.id = userId
      } else if (email) {
        payload.email = email
      }
      
      const response = await axios.post(`${this.baseURL}/auth/user/verify/code`, payload)
      return { success: true, data: response.data }
    } catch (error) {
      return {
        success: false,
        error: (error.response && error.response.data && error.response.data.message) || 'Verification failed'
      }
    }
  }

  async resendVerification(emailPhone) {
    try {
      const response = await axios.post(`${this.baseURL}/auth/user/resend/confirmation_code`, { 
        emailPhone 
      })
      return { success: true, data: response.data }
    } catch (error) {
      return {
        success: false,
        error: (error.response && error.response.data && error.response.data.message) || 'Failed to resend code'
      }
    }
  }
}

export default new AuthService()