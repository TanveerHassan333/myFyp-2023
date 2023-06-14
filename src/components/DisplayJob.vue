<template>
    <div class="container jobs">
      <h2>Recent Jobs Posted</h2>
      <div class="row">
        <div class="col-md-6 col-lg-4 mt-3" v-for="job in jobs" :key="job.id" @click="openJobDetails(job.id)">
          <div class="card mb-4 ms-3 p-2">
            <div class="card-body">
             <h3 class="card-title">{{ job.jobName }}</h3>
              <p class="card-text"><strong>Description:</strong>{{ job.description }}</p>
              <p class="card-text"><strong>Requirements:</strong> {{ job.requirements }}</p>
              <p class="card-text"><strong>Responsibilities:</strong> {{ job.responsibilities }}</p>
              <p class="card-text text-muted">{{ formatDate() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useJobStore } from '../stores/jobsStore'
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { Timestamp } from 'firebase/firestore'
  
  const jobStore = useJobStore()
  const router = useRouter()
  
  // Define a reactive ref for jobs
  const jobs = ref([])
  
  // Fetch jobs on component mount
  onMounted(async () => {
    await jobStore.fetchJobs()
    // Update the reactive jobs ref with the fetched data
    jobs.value = jobStore.getJobs
  })
  // Open job details when a card is clicked
function openJobDetails(jobId) {
  router.push(`/user/job/${jobId}`)
}
// Format the posting date
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

  if (date instanceof Date) {
    return date.toLocaleDateString(undefined, options);
  }

  if (date instanceof Timestamp) {
    const milliseconds = date.toMillis();
    return new Date(milliseconds).toLocaleDateString(undefined, options);
  }

  return '';
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
  .jobs{
    width: 80%;
    margin: 2rem 4rem;
  }
</style>
  