<template>
  <div class="password-strength">
    <div class="strength-bar">
      <div 
        class="strength-fill" 
        :class="strengthClass"
        :style="{ width: strengthWidth }"
      ></div>
    </div>
    <div class="strength-text">
      <span :class="strengthClass">{{ strengthText }}</span>
    </div>
    <div v-if="validationErrors.length > 0" class="password-errors">
      <ul>
        <li v-for="error in validationErrors" :key="error" class="error-item">
          {{ error }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    strength: {
      type: String,
      default: 'weak'
    },
    validationErrors: {
      type: Array,
      default: () => []
    }
  },
  
  computed: {
    strengthClass() {
      return `strength-${this.strength}`
    },
    
    strengthWidth() {
      const widths = {
        'weak': '25%',
        'medium': '50%',
        'strong': '75%',
        'very-strong': '100%'
      }
      return widths[this.strength] || '0%'
    },
    
    strengthText() {
      const texts = {
        'weak': 'Weak',
        'medium': 'Medium',
        'strong': 'Strong',
        'very-strong': 'Very Strong'
      }
      return texts[this.strength] || ''
    }
  }
}
</script>

<style scoped>
.password-strength {
  margin-top: 8px;
}

.strength-bar {
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: width 0.3s ease, background-color 0.3s ease;
}

.strength-weak { background-color: #f44336; }
.strength-medium { background-color: #ff9800; }
.strength-strong { background-color: #2196f3; }
.strength-very-strong { background-color: #4caf50; }

.strength-text {
  margin-top: 4px;
  font-size: 12px;
  font-weight: bold;
}

.password-errors {
  margin-top: 8px;
}

.password-errors ul {
  margin: 0;
  padding-left: 16px;
}

.error-item {
  color: #f44336;
  font-size: 11px;
  margin-bottom: 2px;
}
</style>