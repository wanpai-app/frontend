import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    token: null,
    role: null,
    showToast: null,
    user: null,
  }),

  getters: {
    isAdmin: (state) => state.role === 'admin',
    isUser: (state) => state.role === 'user',
    userRole: (state) => state.role,
  },

  actions: {
    setToastHandler(toastFn) {
      this.showToast = toastFn
    },

    initAuth() {
      const token = localStorage.getItem('token')
      const role = localStorage.getItem('role')
      const user = JSON.parse(localStorage.getItem('user') || 'null')

      this.token = token
      this.role = role
      this.user = user
      this.isLoggedIn = token !== null
    },

    login(token, role = null, user = null) {
      localStorage.setItem('token', token)
      if (role) localStorage.setItem('role', role)
      if (user) localStorage.setItem('user', JSON.stringify(user))

      this.token = token
      this.role = role
      this.user = user
      this.isLoggedIn = true
    },

    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('user')

      this.token = null
      this.role = null
      this.user = null
      this.isLoggedIn = false
    },
  },
})
