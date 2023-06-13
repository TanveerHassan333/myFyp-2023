<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <img src="../assets/images/Blogging-bro 1.png" class="login-img img-fluid" alt="image">
        </div>
        <div class="col-lg-6">
          <img src="../assets/images/logo.JPG" class="logo img-fluid" alt="logo image">
          <h4>Login To Continue...!</h4>
          <form @submit.prevent="loginUser">
            <input type="email" id="email" v-model="email" required placeholder="Enter Your Email"> <br>
            <input type="password" id="password" v-model="password" required placeholder="Enter Your Password"> <br>
          <button class="account-btn" type="submit">Login</button>
        </form>
        <p class="create-account">Do You have an account? <RouterLink to="/account/register">Create One</RouterLink></p>
        <p class="create-account mt-3"><RouterLink to="/user/forgotPassword">Forgot Password?</RouterLink></p>
        <p>{{ loginStatusMessage }}</p>
        </div>
      </div>
      
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <div v-if="showSuccessPopup" class="success-popup">
        Login successful!
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useLoginStore } from '../stores/login';
  import { useRouter } from 'vue-router';
  
  const loginStore = useLoginStore();
  const router = useRouter();
  
  const email = ref('');
  const password = ref('');
  const errorMessage = ref('');
  const showSuccessPopup = ref(false);
  
  const loginUser = async () => {
    loginStore.email = email.value;
    loginStore.password = password.value;
    await loginStore.loginUser();
    await loginStore.loginUser(router);
    if (loginStore.showSuccessPopup) {
      showSuccessPopup.value = true;
      setTimeout(() => {
        showSuccessPopup.value = false;
      }, 4000); // 4 seconds
    } else {
      errorMessage.value = loginStore.errorMessage;
    }
  };
  const loginStatusMessage = computed(() => {
  return loginStore.isLoggedIn ? 'You are already logged in.' : '';
});
onMounted(() => {
  setTimeout(() => {
    router.push('/');
  }, 10000);
});
  </script>
  
  <style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html{
    font-size: 15px;
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
  .account-btn{
    background-color: #FFDC5F;
    padding: 0.5rem 5rem;
    border: none;
    text-align: center;
    font-weight: 600;
    margin-top: 2rem;
    border-radius: 1.5rem;
    margin-left: 20.5rem;
  }
  .create-account{
    font-size: 0.90rem;
    color: #333;
    font-weight: 500;
    margin-left: 3rem;
    margin-top: -2rem;
  }
  .error{
    position: absolute;
    top: 22rem;
    left: 50%;
    color: red;
  }
  </style>
  