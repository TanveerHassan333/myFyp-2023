<template>
  <div class="container sign-up">
   <div class="row">
    <div class="col-lg-6">
      <img class="registration img-fluid" src="../assets/images/Blogging-bro 1.png" alt="image">
    </div>
    <div class="col-lg-6">
      <img class="logo img-fluid" src="../assets/images/logo.JPG" alt="logo-img">
      <h4>Welcome To Konnect Professional</h4>
      <form @submit.prevent="register">
          <input type="text" id="firstName"  v-model="firstName" required placeholder="Enter your First name">
          <input type="text" id="lastName" v-model="lastName" required placeholder="Enter your Last name">
          <input type="email" id="email" v-model="email" required placeholder="Enter your Email">
          <input :type="showPassword ? 'text' : 'password'"  id="password" v-model="password" required placeholder="Enter your Password">
          <i class="icon bi" :class="showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'"
            @click="togglePasswordVisibility"></i>
          <select class="user-type" id="userType" v-model="userType">
            <option value="professional">Professional</option>
            <option value="learner">Learner</option>
          </select>
           <div class="links-password">
            <p>Have an account? <RouterLink class="router" to="/user/login">Log in</RouterLink></p>
          <p class="mt-2"> <RouterLink class="router" to="/user/forgotPassword">Forgot Password?</RouterLink></p>
           </div>
          
        
          <button class="account-btn" type="submit">Register</button>
        
      </form>
    </div>
   </div>
    <p class="verify-msg" v-if="emailVerificationMessage">{{ emailVerificationMessage }}</p>
    <p v-if="registrationSuccess">Account created successfully. Please proceed to login.</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const userType = ref('professional');

const emailVerificationMessage = ref('');
const registrationSuccess = ref(false);
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const register = async () => {
  await authStore.registerUser({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    userType: userType.value,
  });
firstName.value = ''
lastName.value = ''
email.value = ''
password.value = ''
userType.value = ''
if (authStore.registrationSuccess) {
    emailVerificationMessage.value = authStore.emailVerificationMessage;
    await authStore.checkEmailVerification();

    if (authStore.isLoggedIn) {
      // User has verified the email, proceed to login
      await router.push('/user/login');
    }
  }
};

</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html{
  font-size: 15px;
}
.sign-up{
  box-shadow: none;
}
.logo{
  width: 5rem;
  height: 5rem;
  object-fit: contain;
  margin: 0.6rem 37%;
}
h4{
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
}
form{
  display: block;
}
form input {
  width: 80%;
  margin-left: 3rem;
  border: 1px solid #FFDC5F;
  border-radius: 1.5rem;
  height: 2.5rem;
  padding-left: 1rem;
  outline: none;
  margin-top: 1.5rem;
}
form input:focus {
  border: 1px solid #FFDC5F;
}
form input::placeholder{
  color: gray;
  font-size: 0.95rem;
}
.bi-eye-fill, .bi-eye-slash-fill{
  position: absolute;
  top: 26rem;
  right: 13.5rem;
  font-size: 1.3rem;
  cursor: pointer;
}
.user-type{
  width: 80%;
  margin-left: 3rem;
  border: 1px solid #FFDC5F;
  border-radius: 1.5rem;
  height: 2.5rem;
  padding-left: 1rem;
  outline: none;
  margin-top: 1.5rem;
}
.account-btn{
  background-color: #FFDC5F;
  padding: 0.5rem 3.5rem;
  border: none;
  text-align: center;
  font-weight: 600;
  margin-top: 2rem;
  border-radius: 1.5rem;
  margin-left: 20.5rem;
}
.links-password{
  margin-left: 3.5rem;
  margin-top: 1rem;
}
.links-password p{
  font-size: 0.85rem;
  font-weight: 600;
}
.router{
  text-decoration: none;
  color: #333;
}
.router:hover{
  color: #f3c10e;
}
.verify-msg{
  position: absolute;
  top: 10rem;
  left: 50%;
  background-color: rgba(121, 252, 121, 0.562)yellow;
  border-radius: 0.7rem;
  padding: 0.3rem;
  color: white;
}
</style>
