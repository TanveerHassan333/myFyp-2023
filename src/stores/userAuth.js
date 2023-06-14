import { defineStore } from 'pinia';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/init'

export const userLogoutStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    initialize() {
      onAuthStateChanged(this.user, (user) => {
        this.user = user;
      });
    },
    async logout() {
      try {
        await signOut();
        this.user = null; // Set the user back to null after successful logout
      } catch (error) {
        console.error('Logout error:', error);
      }
    },
  },
});
