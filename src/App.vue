<template>
  <div class="container navbar-container"> 
 <nav class="navbar menus navbar-expand-lg navbar-light">
      <RouterLink to="/"><a class="navbar-brand" ><img src="../src/assets/images/logo.png" alt="logo"></a></RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-lg-auto">
          <li class="nav-item">
            <RouterLink to="/"><a class="nav-link menu" href="#">Home</a></RouterLink>
          </li>
          <li class="nav-item ms-lg-4">
            <RouterLink to="/about"><a class="nav-link menu" href="#">About</a></RouterLink>
          </li>
          <li class="nav-item ms-lg-4">
            <RouterLink to="/blogs/allBlogs"><a class="nav-link menu" href="#">Blogs</a></RouterLink>
          </li>
          <li class="nav-item ms-lg-4">
            <RouterLink to="/user/displayjob"><a class="nav-link menu" href="#">Jobs</a></RouterLink>
          </li>
          
          <li class="nav-item ms-lg-4">
            <template v-if="logOutStore.isAuthenticated">
              <button class="nav-link menu" @click="logout">Logout</button>
            </template>
            <template v-else>
              <RouterLink to="/account/register"><a class="nav-link menu" href="#">Sign Up/Login</a></RouterLink>
            </template>
          </li>
          <li class="nav-item ms-lg-4">
            <RouterLink to="/user/profile">
              <div v-if="profile.profilePicture">
                <img :src="profile.profilePicture" alt="Profile Picture" />
              </div>
              <div v-else>
                <i class="bi bi-person" @click="openProfileForm"></i>
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  <RouterView></RouterView>
  </template>  

  <script>
  import { ref, onMounted } from 'vue'
  import {RouterLink, RouterView} from 'vue-router'
  import { useUserStore } from './stores/user';
  import { userLogoutStore } from './stores/userAuth'

export default {
  setup() {
    const userStore = useUserStore();
    const profile = userStore.profile;
    const logOutStore = userLogoutStore()
    const isAuthenticated= ref(false)

    if (typeof logOutStore.initialize === 'function') {
      logOutStore.initialize();
    }
    const openProfileForm = () => {
      // Logic to open the profile form component
    };
    const logout = () => {
      logOutStore.logout();
    };

    onMounted(() => {
      isAuthenticated.value = logOutStore.isAuthenticated;
    });

    return {
      profile,
      openProfileForm,
      logOutStore,
      isAuthenticated,
      logout
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
.navbar-container{
  margin: 0 auto;
}

a:link, a:visited, a:hover, a:active{
  text-decoration: none;
}

.menu{
  text-decoration: none;
  font-weight: 600;
  font-style: none;
  font-size: 1.1rem;
}
.bi-person{
  font-size: 1.5rem;
  color: gray;
  border: 1px solid lightgray;
  border-radius: 100%;
  width: 50%;
}
</style>