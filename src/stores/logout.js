import { defineStore } from 'pinia';
import { getAuth } from 'firebase/auth'; 
const auth = getAuth()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => state.user !== null,
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    async login(email, password) {
      try {
        const { user } = await auth.signInWithEmailAndPassword(email, password);
        this.setUser(user);
      } catch (error) {
        // Handle login error
        console.error(error);
      }
    },
    async logout() {
      try {
        await auth.signOut();
        this.setUser(null);
      } catch (error) {
        // Handle logout error
        console.error(error);
      }
    },
  },
});
