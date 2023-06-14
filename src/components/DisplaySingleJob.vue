<template>
    <div class="container job-details">
      <h2>Job Details</h2>
      <div class="mt-4">
        <h3>Name: {{ job.jobName }}</h3>
        <p><strong>Description:</strong> {{ job.description }}</p>
        <p><strong>Requirements:</strong> {{ job.requirements }}</p>
        <p><strong>Responsibilities:</strong> {{ job.responsibilities }}</p>
      </div>

    </div>
  </template>
  
  <script setup>
  import { useJobStore } from '../stores/jobsStore'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  
  const jobStore = useJobStore()
  const router = useRouter()
  
  // Get the job ID from the route parameter
  const jobId = computed(() => router.currentRoute.value.params.jobId)
  
  // Get the job details from the store based on the job ID
  const job = computed(() => jobStore.getJobs.find(j => j.id === jobId.value))
  
  // Redirect to job list if the job is not found
  if (!job.value) {
    router.push('/user/displayjob')
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
.job-details{
    width: 100%;
    margin: 2rem 4rem;
}
.job-details h2{
    font-size: 1.5rem;
    font-weight: 700;
}
.job-details h3{
    font-size: 1.1rem;
    font-weight: 700;
}
</style>