<template>
    <div class="container blogs-container">
    <div class="row">
        <div class="col-lg-6">
            <p>By Themadbrains in <span>inspiration</span></p>
            <h2 class="mt-3">Why Swift UI Should Be on the <br> Radar of Every Mobile <br> Developer</h2>
            <p class="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
            <p>sed do eiusmod tempos Lorem ipsum dolor sitamet,</p>
            <p>consectetur adipiscing elit, sed do eiusmod tempor</p>
            <RouterLink to="/account/register"><button class="account-btn">Start Learning</button></RouterLink>
        </div>
        <div class="col-lg-6">
            <img src="../assets/images/Rectangle 32 (1).png" class="img-fluid hero-img" alt="image">
        </div>
    </div>
    </div>
    <!-- Hero section closed -->
    <div class="container blogs">
        <h2>Recent Blogs</h2>
        <div class="row mt-4">
          <div v-for="blog in blogs" :key="blog.id" class="col-lg-4 mb-4 blog-card">
           <div class="cild-colm ms-4">
            <img :src="blog.content[2].image" class="img-fluid blog-img" alt="Blog Image">
            <p class="blog-content">{{ truncatedText(blog.content[0]) }}</p>
            <router-link :to="{ name: 'showBlog', params: { id: blog.id } }"> <button class="show-blog">Read More</button></router-link>
            <RouterLink to="/blog/report"><button class="report">Report Blog</button></RouterLink>
            <div v-if="isExpanded(blog.id)">
              <p>{{ blog.content }}</p>
              <button class="show-blog" @click="collapseBlog(blog.id)">Hide Blog</button>
            </div>
           </div>
          </div>
        </div>
      </div>
      <!-- ------------------------ -->
      <div class="container blogs">
        <h2>Related Blogs</h2>
        <div class="row mt-4">
          <div v-for="blog in blogs" :key="blog.id" class="col-lg-6 mb-4 blog-card">
           <div class="cild-colm ms-4">
            <img :src="blog.content[2].image" class="img-fluid blog-img" alt="Blog Image">
            <p class="blog-content">{{ truncatedText(blog.content[0]) }}</p>
            <router-link :to="{ name: 'showBlog', params: { id: blog.id } }"> <button class="show-blog">Read More</button></router-link>
            <RouterLink to="/blog/report"><button class="report">Report Blog</button></RouterLink>
            <div v-if="isExpanded(blog.id)">
              <p>{{ blog.content }}</p>
              <button class="show-blog" @click="collapseBlog(blog.id)">Hide Blog</button>
            </div>
           </div>
          </div>
        </div>
      </div>
       <!-- Footer  -->
    <div class="container-fluid footer-container">
        <div class="footer">
           <img class="logo-img img-fluid" src="../assets/images/logo-golden.png" alt="logo">
           <div class="row">
              <div class="col-lg-7 col-md-12 col-sm-12 links-footer">
                <RouterLink to="/" class="footer-menu">Home</RouterLink>
                <RouterLink to="/about" class="footer-menu">about</RouterLink>
                <RouterLink to="/blogs" class="footer-menu">Blogs</RouterLink>
                <RouterLink to="/account/register" class="footer-menu">Sign Up / Login</RouterLink>
              </div>
           </div>
           <p class="copyrights">&copy; 2023, All Rights Reserved</p>
           <p class="design">Made and Designed by <RouterLink to="/" class="footer-menu">Konnect Professional</RouterLink></p>
        </div>
    </div>
</template>
<script>
import {RouterLink} from 'vue-router';
import { ref, onMounted } from 'vue';
import { db } from '../firebase/init'; // Import the Firebase configuration
import {  collection, getDocs } from 'firebase/firestore'

export default {
  name: 'BlogList',
  setup() {
    const blogs = ref([]);
    const expandedBlogIds = ref([]);
    // Fetch blogs from Firestore
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, 'blogs'));
      blogs.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    };
    // Call fetchBlogs when the component is mounted
    onMounted(fetchBlogs);

   // Check if a blog is expanded
   const isExpanded = (blogId) => {
      return expandedBlogIds.value.includes(blogId);
    };

    // Expand the blog when "Read More" is clicked
    const expandBlog = (blogId) => {
      expandedBlogIds.value.push(blogId);
    };
     // Collapse the expanded blog when "Show Less" is clicked
     const collapseBlog = (blogId) => {
      const index = expandedBlogIds.value.indexOf(blogId);
      if (index !== -1) {
        expandedBlogIds.value.splice(index, 1);
      }
    };

 // Truncate the text
const truncatedText = (text) => {
  const maxChars = 200;
  if (typeof text !== 'string') {
    return ''; // Return an empty string if the text is not a string
  }
  if (text.length <= maxChars) {
    return text;
  }
  return text.slice(0, maxChars) + '...';
};
    return {
      blogs,
      expandedBlogIds,
      isExpanded,
      expandBlog,
      collapseBlog,
      truncatedText,
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
.blogs-container{
    box-shadow: none;
    margin-top: 5rem;
    margin-left: 4rem;
}
.blogs-container span{
    color: #FFDC5F;
    font-weight: 500;
}
.blogs-container h2{
    font-size: 1.8rem;
    font-weight: 700;
    color: #FFDC5F;
}
.blogs-container p{
    color: gray;
}
.account-btn{
    background-color: #FFDC5F;
    padding: 0.5rem 2rem;
    border: none;
    text-align: center;
    font-weight: 600;
    margin-top: 1.5rem;
    border-radius: 1.5rem;
  }
  .blogs{

    margin: 6rem auto;
  }
  .blogs h2{
    font-size: 1.2rem;
    font-weight: 700;
  }
  
  .cild-colm{
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
    padding: 0.5rem;
  }
  .blog-img{
    width: 100%;
    height: 15rem;
    border-bottom-right-radius: none;
    border-bottom-left-radius: none;
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
    object-fit: cover;
  }
  .blog-content{
    font-size: 0.90rem;
    color: gray;
    margin-top: 0.5rem;
  }
  .show-blog{
    border: none;
    background-color: #FFDC5F;
    padding: 0.6rem 1.2rem;
    border-radius: 1.2rem;
    font-size: 0.90rem;
    font-weight: 500;
    text-align: center;
    margin-top: 0.5rem;
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
    margin-left: 6.5rem;
    color: white;
  }
  .footer-container{
    background-color: #FFDC5F;
    text-align: center;
    padding-bottom: 1.5rem;
  }
  .logo-img{
  width: 6rem;
  height: 5rem;
  object-fit: contain;
  margin-top: 1.5rem;
  }
  .links-footer{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    text-align: center;
    margin-left: 20%;
    margin-top: 2rem;
    text-decoration: none;
  }
  .footer-menu{
    text-decoration: none;
    color: #333;
    font-size: 0.90rem;
    font-weight: 600;
  }
  .footer-menu:hover{
    color: blue;
  }
  .copyrights{
    font-size: 0.85rem;
    color: #333;
    margin-top: 2rem;
  }
  .design{
    font-size: 0.85rem;
    color: #333;
  }
</style>