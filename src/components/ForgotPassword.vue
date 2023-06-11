<template>
    <div class="container">
      <div class="row d-flex">
        <div class="col-lg-6">
            <img class="img-fluid" src="../assets/images/Blogging-bro 1 (1).png" alt="img">
        </div>
        <div class="col-lg-6 form-forgot">
            <img src="../assets/images/logo.JPG" class="logo img-fluid" alt="logo">
            <p>Enter your email to Recover your password</p>
            <input type="email" v-model="email" required placeholder="Enter your email" /> <br>
             <button class="account-btn" @click="handleForgotPassword">Forgot Password</button>
             <p>{{ forgotPasswordMessage }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '../stores/auth';
  
  const email = ref('');
  const forgotPasswordMessage = ref('');
  const authStore = useAuthStore()
  
  const handleForgotPassword = async () => {
    try {
      await authStore.forgotPassword(email.value);
      forgotPasswordMessage.value = 'Password reset email sent successfully.';
    } catch (error) {
      forgotPasswordMessage.value = 'Error sending password reset email.';
      console.error('Error sending password reset email:', error);
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
.form-forgot input{
    border: 1px solid #FFDC5F;
    border-radius: 1.5rem;
    height: 2.5rem;
    padding-left: 1rem;
    outline: none;
    margin-top: 3rem;
    width: 80%;
    margin-left: 4rem;
}
.logo{
    width: 5rem;
    height: 5rem;
    object-fit: contain;
    margin: 3rem 37%;
  }
  p{
    text-align: center;
    font-size: 0.90rem;
    font-weight: 600;
  }
.account-btn{
    background-color: #FFDC5F;
    padding: 0.5rem 3.5rem;
    border: none;
    text-align: center;
    font-weight: 600;
    margin-top: 2rem;
    border-radius: 1.5rem;
    margin-left: 15.5rem;
  }
</style>