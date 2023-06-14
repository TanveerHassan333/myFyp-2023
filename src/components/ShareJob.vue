<!-- ShareJob.vue -->
<template>
    <div class="container share-job">
      <h2>Share a Job:</h2>
      <form @submit.prevent="submitJob">
        <input type="text" id="jobName" v-model="jobName" placeholder="Enter name of job" required> <br>
  <br>
    
        <textarea id="description" v-model="description" required  placeholder="Enter description of job"></textarea> <br>
  <br>
       
        <textarea id="requirements" v-model="requirements" placeholder="Enter requirements of job" required></textarea> <br> <br>
  
        <textarea id="responsibilities" v-model="responsibilities" required  placeholder="Enter responsibilities of job"></textarea> <br> <br>
  
        <button class="post-job" type="submit">Post Job</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useJobStore } from '../stores/jobsStore'
  
  const jobName = ref('')
  const description = ref('')
  const requirements = ref('')
  const responsibilities = ref('')
  const jobStore = useJobStore()
  
  const submitJob = () => {
    const job = {
      jobName: jobName.value,
      description: description.value,
      requirements: requirements.value,
      responsibilities: responsibilities.value,
    }
  
    jobStore.postJob(job)
    jobName.value = ''
    description.value = ''
    requirements.value = ''
    responsibilities.value = ''
  }
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
.share-job{
    margin: 2rem auto;
}
.share-job h2{
    font-size: 1.3rem;
    font-weight: 700;
}
form{
    margin-left: 20%;
}
form input {
    width: 60%;
    border: 1px solid #FFDC5F;
    height: 2.5rem;
    padding-left: 1rem;
    outline: none;
    margin-top: 1.5rem;
  }
  form input:focus, textarea:focus {
    border: 1px solid #FFDC5F;
  }
  form input::placeholder{
    color: gray;
    font-size: 0.95rem;
  }
  form textarea{
    width: 60%;
    height: 05rem;
    padding-left: 0.5rem;
    border: 1px solid #FFDC5F;
  }
  .post-job{
    background-color: #FFDC5F;
    padding: 0.5rem 3.5rem;
    border: none;
    text-align: center;
    font-weight: 600;
    margin-top: 1rem;
    border-radius: 1.5rem;
  }
</style>