<template>
   <div class="container report-container">
    <h4 class="mt-4">Read the Instructions carefully and then submit the application.</h4>
    <div class="row">
      <div class="col-lg-6 mt-lg-5">
        <ul class="mt-lg-5">
          <li>Enter your correct credentials to report the Blog/Article</li> <br>
          <li>Application having wrong information will be rejected and will not be processed </li><br>
          <li>Write the the detail message to proceed your application</li><br>
          <li>You will be notified when your application will received and processed</li><br>
          <li>Your information will be only visible to admin and will not be shared with anyone</li>
      </ul>
      <RouterLink to="/"><button class="home-btn">Go to Home</button></RouterLink>
      </div>
      <div class="col-lg-6">
        <form @submit.prevent="submitForm">
        
          <input type="text" id="name" v-model="form.name" required placeholder="Enter your name"><br>
      
         
          <input type="email" id="email" v-model="form.email" required placeholder="Enter your email"><br>
      
         
          <input type="text" id="blog" v-model="form.blog" required placeholder="Enter Blog URL"><br>
      
          
          <textarea class="text-message" id="message" v-model="form.message" required placeholder="Enter your message in details"></textarea><br>
      
          <button class="report-btn" type="submit">Report Blog</button>
        </form>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
      </div>
    </div>
    
   </div>
</template>

<script>
import { ref } from 'vue';
import { db } from '../firebase/init.js';
import {collection, addDoc} from 'firebase/firestore'
import {RouterLink} from 'vue-router'

export default {
  name: 'ReportForm',
  setup() {
    const form = ref({
      name: '',
      email: '',
      blog: '',
      message: '',
    });
    const errorMessage = ref('');
    const successMessage = ref('');
    const submitForm = async () => {
      try {
        // Save form data to Firebase Firestore
        const docRef = await addDoc(collection(db, 'reports'), form.value);

        // Clear the form after submission
        form.value = {
          name: '',
          email: '',
          blog: '',
          message: '',
        };
        successMessage.value = 'Report submitted successfully!';
        errorMessage.value = ''; // Clear any previous error message
        console.log('Report submitted successfully! Document ID:', docRef.id);
        // Clear success message after 5 seconds
        setTimeout(() => {
          successMessage.value = '';
        }, 5000);
      } catch (error) {
        errorMessage.value = 'Error submitting report. Please try again.';
        console.error('Error submitting report:', error);
        setTimeout(() => {
          errorMessage.value = '';
        }, 5000);
      }
    };

    return {
      form,
      submitForm,
      errorMessage,
      successMessage
    };
  },
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
.report-container{
  box-shadow: none;
  width: 80%;
  margin: 0 auto;
}
.report-container h4{
  font-size: 1.2rem;
  font-weight: 700;
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
.text-message{
  width: 80%;
  height: 150px;
  margin-left: 3rem;
  border: 1px solid #FFDC5F;
  border-radius: 1.5rem;
  padding-left: 1rem;
  padding-top: 0.5rem;
  outline: none;
  margin-top: 1.5rem;
}
.report-btn{
  background-color: red;
  padding: 0.5rem 3.5rem;
  border: none;
  text-align: center;
  font-weight: 600;
  margin-top: 2rem;
  border-radius: 1.5rem;
  margin-left: 18.5rem;
  color: white;
}
.error-message{
  width: fit-content;
  padding: 0.6rem;
  background-color: lightgray;
  color: red;
  font-size: 0.90rem;
  font-weight: 500;
  margin-top: -3rem;
}
.success-message{
  width: fit-content;
  padding: 0.6rem;
  background-color: rgba(147, 236, 147, 0.918);
  color: #333;
  font-size: 0.90rem;
  font-weight: 500;
  margin-top: -3rem;
}
.home-btn{
  background-color: #FFDC5F;
  padding: 0.5rem 3.5rem;
  border: none;
  text-align: center;
  font-weight: 600;
  margin-top: 5.7rem;
  border-radius: 1.5rem;
 
}
</style>









