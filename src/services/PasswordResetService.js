// Password Reset Service - Single Responsibility Principle
import axios from 'axios'
import config from '@/config'

export class PasswordResetService {
  constructor() {
    this.baseURL = config.APIROOT
  }

  async requestReset(emailPhone) {
    try {
      const response = await axios.post(`${this.baseURL}/auth/user/forget_password`, {
        emailPhone
      })
      return { 
        success: true, 
        data: response.data,
        token: response.data.data && response.data.data.token
      }
    } catch (error) {
      return {
        success: false,
        error: (error.response && error.response.data && error.response.data.message) || 'Reset request failed'
      }
    }
  }



  async changePassword(newPassword, token) {
    try {
      const response = await axios.post(`${this.baseURL}/auth/user/password_reset/change_password`, {
        new_password: newPassword,
        new_cpassword: newPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      return { success: true, data: response.data }
    } catch (error) {
      return {
        success: false,
        error: (error.response && error.response.data && error.response.data.message) || 'Password change failed'
      }
    }
  }
}

export default new PasswordResetService()