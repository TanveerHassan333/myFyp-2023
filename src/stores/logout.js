import { defineStore } from 'pinia'
import { auth } from '../firebase/init'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.user
  },
  actions: {
    setUser(user) {
      this.user = user
    },
    async logoutUser() {
      if (this.isAuthenticated) {
        await auth.signOut()
        this.user = null
      }
    }
  }
})
