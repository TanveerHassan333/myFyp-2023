import { defineStore } from 'pinia';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase/init'; // Assuming you have a separate file for Firebase initialization

const auth = getAuth(app);

export const useLoginStore = defineStore({
  id: 'login',
  state: () => ({
    email: '',
    password: '',
    errorMessage: '',
    isLoggedIn: false, 
  }),
  actions: {
    async loginUser(router) {
      try {
        const { user } = await signInWithEmailAndPassword(auth, this.email, this.password);
        // Redirect to home page
        router.push('/');
      } catch (error) {
        switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/user-not-found':
            this.errorMessage = 'Invalid email or password.';
            break;
          case 'auth/wrong-password':
            this.errorMessage = 'Invalid email or password.';
            break;
          default:
            this.errorMessage = 'An error occurred. Please try again later.';
            break;
        }
      }
    },
    async checkLoginStatus() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is logged in
          this.isLoggedIn = true;
        } else {
          // User is logged out
          this.isLoggedIn = false;
        }
      });
    },
  },
});
