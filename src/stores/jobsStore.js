// store.js
import { defineStore } from 'pinia'
import { collection, addDoc , getDocs} from 'firebase/firestore'
import { db } from '../firebase/init'

export const useJobStore = defineStore('job', {
  state: () => ({
    jobs: [],
  }),

  actions: {
    async postJob(job) {
      try {
        const docRef = await addDoc(collection(db, 'jobs'), job)
        console.log('Job posted with ID: ', docRef.id)
      } catch (error) {
        console.error('Error posting job: ', error)
      }
    },
    
    async fetchJobs() {
        try {
          const querySnapshot = await getDocs(collection(db, 'jobs'))
          const fetchedJobs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            
          }))
          console.log(fetchedJobs)
          this.jobs = fetchedJobs
          console.log(this.jobs)
        } catch (error) {
          console.error('Error fetching jobs:', error)
        }
      },
    },

  getters: {
    getJobs: (state) => state.jobs,
  },
})
