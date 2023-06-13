<template>
    <div>
      <!-- Dashboard content -->
      <h1>Welcome to the Dashboard</h1>
  
      <!-- Display blogs shared by the user -->
      <div v-if="isAuthenticated && isProfessional">
        <h2>Your Blogs</h2>
        <div class="col-lg-4">
          <li v-for="blog in userBlogs" :key="blog.id">{{ blog.content[0] }}</li>
        </div>
      </div>
  
      <!-- Logout button -->
      <button v-if="isAuthenticated" @click="logout">Logout</button>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '../stores/auth'
//   import { useAuthStore } from '../stores/logout'
  import { useLoginStore} from '../stores/login'
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { db } from '../firebase/init'
  
  const authStore = useAuthStore()
  const loginStore = useLoginStore()
//   const logoutStore = useAuthStore()
  const isAuthenticated = ref(loginStore.isAuthenticated)
  const isProfessional = computed(() => authStore.user?.accountType === 'professional')
  const router = useRouter()
  
  const userBlogs = ref([])
  
  const fetchUserBlogs = async () => {
    const userId = loginStore.user?.id
    if (!userId) {
      return
    }
    const querySnapshot = await db.collection('blogs').where('userId', '==', userId).get()
    userBlogs.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
  }
  
  const logout = async () => {
    await authStore.logoutUser()
    router.push('/user/login')
  }
  
  fetchUserBlogs()
  </script>
  