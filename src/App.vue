<template>
  <div class="container"> 
 <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
            <RouterLink to="/blogs/allBlogs"><a class="nav-link menu" href="#">Blogs</a></RouterLink>
          </li>
          <li class="nav-item ms-lg-4">
            <RouterLink to="/about"><a class="nav-link menu" href="#">About</a></RouterLink>
          </li>
          <li class="nav-item ms-lg-4">
            <RouterLink to="/account/register"><a class="nav-link menu" href="#">Register/Login</a></RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  <RouterView></RouterView>
  </template>  

  <script setup>
  import {RouterLink, RouterView} from 'vue-router'
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
.container{
  margin: 0 auto;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
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
</style>