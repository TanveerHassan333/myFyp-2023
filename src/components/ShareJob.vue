<!-- ShareJob.vue -->
<template>
    <div>
      <h2>Share a Job</h2>
      <form @submit.prevent="submitJob">
        <label for="jobName">Job Name:</label>
        <input type="text" id="jobName" v-model="jobName" required>
  
        <label for="description">Description:</label>
        <textarea id="description" v-model="description" required></textarea>
  
        <label for="requirements">Requirements:</label>
        <textarea id="requirements" v-model="requirements" required></textarea>
  
        <label for="responsibilities">Responsibilities:</label>
        <textarea id="responsibilities" v-model="responsibilities" required></textarea>
  
        <button type="submit">Post Job</button>
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
  