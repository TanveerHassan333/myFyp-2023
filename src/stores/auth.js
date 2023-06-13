import { defineStore } from 'pinia';
import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged,sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/init';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isLoggedIn: false,
    emailVerificationMessage: '',
    registrationSuccess: false,
  }),
  actions: {
    async registerUser({ firstName, lastName, email, password, userType }) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await sendEmailVerification(user);
        this.emailVerificationMessage = 'Please verify your email before logging in.';
        this.registrationSuccess = true;
        // Additional logic to store first name, last name, and user type
        // e.g., store them in the user profile or another data structure
        const userData = {
          firstName,
          lastName,
          userType,
        };
        // Store userData to database or any other required actions
      } catch (error) {
        this.emailVerificationMessage = '';
        this.registrationSuccess = false;
        console.error('Error registering user:', error);
      }
    },
    async checkUserLoggedIn() {
      onAuthStateChanged(auth, (user) => {
        this.isLoggedIn = user !== null;
      });
    },
    async forgotPassword(email) {
      try {
        await sendPasswordResetEmail(auth, email);
        console.log('Password reset email sent successfully.');
        // Additional logic or state updates if needed
      } catch (error) {
        console.error('Error sending password reset email:', error);
        // Handle error or update state accordingly
      }
    },
    async checkEmailVerification() {
      const user = auth.currentUser;
      if (user) {
        const isVerified = user.emailVerified;
        if (!isVerified) {
          this.isLoggedIn = false;
          this.emailVerificationMessage =
            'Please verify your email before logging in.';
        }
      }
    },
  },
});
