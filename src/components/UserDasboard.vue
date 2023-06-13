<template>
    <div class="container mt-4 dashboard-container">
        <div class="row">
            <div class="col-lg-6">
                <h2>My Dashboard</h2>
            </div>
            <div class="col-lg-6">
            <router-link to="/shareBlog"><button class="share-blog">Share Blog</button></router-link>
            <button v-if="isAuthenticated" @click="logout" class="log-out">Log Out</button>
            </div>
        </div>
    </div>
    <!-- --------------------- -->
    <div class="container blogs">
        <h2>My Blogs</h2>
        <div class="row mt-4">
            <div v-for="blog in blogs" :key="blog.id" class="col-lg-4 mb-4 blog-card">
             <div class="cild-colm ms-4">
              <img :src="blog.content[2].image" class="img-fluid blog-img" alt="Blog Image">
              <p class="blog-content">{{ truncatedText(blog.content[0]) }}</p>
              <router-link :to="{ name: 'showBlog', params: { id: blog.id } }"> <button class="show-blog">Read More</button></router-link>
              <div v-if="isExpanded(blog.id)">
                <p>{{ blog.content }}</p>
                <button class="show-blog" @click="collapseBlog(blog.id)">Hide Blog</button>
              </div>
             </div>
            </div>
          </div>
    </div>
</template>
<script>
import {RouterLink} from 'vue-router';
import { ref, onMounted , computed} from 'vue';
import { db } from '../firebase/init'; // Import the Firebase configuration
import {  collection, getDocs } from 'firebase/firestore'
import { useAuthStore } from '../stores/logout';
import { useRouter } from 'vue-router'

export default {
  name: 'BlogList',
  setup() {
    const blogs = ref([]);
    const expandedBlogIds = ref([]);
    const authStore = useAuthStore();
    const router = useRouter()

    const logout = async () => {
  await authStore.logoutUser()
  router.push('/user/login')
}
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
      isAuthenticated: authStore.isAuthenticated,
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
.dashboard-container{
    box-shadow: none;
    margin-left: 4rem;
}
.dashboard-container h2{
    font-size: 1.4rem;
    font-weight: 700;
    color: #333;
}
.share-blog{
    background-color: #FFDC5F;
    padding: 0.5rem 2rem;
    border: none;
    text-align: center;
    font-weight: 600;
    border-radius: 1.5rem;
    margin-left: 11rem;
}
.log-out{
    background-color: #FFDC5F;
    padding: 0.5rem 2rem;
    border: none;
    text-align: center;
    font-weight: 600;
    border-radius: 1.5rem;
    margin-left: 3rem;
}

.blogs{

    margin: 3rem auto;
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
  
</style>