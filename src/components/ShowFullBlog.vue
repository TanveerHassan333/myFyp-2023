<template>
    <div class="container show-blog">
     
      <img :src="blog.content[2].image" class="img-fluid blog-img" alt="Blog Image">
      <p>{{ blog.content[0]}}</p>
      <i class="bi bi-heart"></i>
      <router-link to="/blog/report"><button class="report">Report Blog</button></router-link>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, toRefs } from 'vue';
  import { db } from '../firebase/init';
  import { doc, getDoc } from 'firebase/firestore'
  import {RouterLink} from 'vue-router'
  
  export default {
    name: 'ShowBlog',
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const { id } = toRefs(props);
      const blog = ref(null);
  
      onMounted(async () => {
        const blogDocRef = doc(db, 'blogs', id.value);
        const blogDocSnapshot = await getDoc(blogDocRef);
        console.log(blogDocSnapshot)
  
        if (blogDocSnapshot.exists()) {
          blog.value = blogDocSnapshot.data();
        } else {
          // Handle blog not found
        }
      });
  
      return {
        blog,
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
.show-blog{
    width: 65%;
    margin: 3rem auto;
    border: 1px solid lightgray;
    border-radius: 1.2rem;
    padding: 1rem;
}
.blog-img{
    width: 100%;
    height: 40vh;
    object-fit: cover;
}
.report{
    border: none;
    background-color: red;
    padding: 0.6rem 1.2rem;
    border-radius: 1.2rem;
    font-size: 0.90rem;
    font-weight: 500;
    text-align: center;
    margin-top: 0.5rem;
    color: white;
  }
</style>