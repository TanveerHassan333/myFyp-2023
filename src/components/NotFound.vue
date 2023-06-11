<template>
   <div class="container error-container">
    <img src="../assets/images/error-img.png" class="img-fluid error-img" alt="image">
    <h4>Oh no. We lost this page</h4>
    <p>We searched everywhere but couldn’t find what  you’re looking for. <br>
        Let’s find a better place for you to go.</p>
        <RouterLink to="/"><button class="back-to-home">Back To Home</button></RouterLink>
   </div>
</template>
<script setup>
import {RouterLink} from 'vue-router'
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
.error-container{
    box-shadow: none;
    text-align: center;
}
.error-img{
    width: 85%;
    height: 55vh;
    margin: 1rem 10%;
    object-fit: contain;
}
.error-container h4{
    margin-top: 0.7rem;
}
.error-container p{
    font-size: 0.90rem;
    font-weight: 400;
}
.back-to-home{
    margin-top: 0.7rem;
    border: none;
    border-radius: 1.5rem;
    text-align: center;
    padding: 0.7rem 1.5rem;
    background-color: #FFDC5F;
}
</style>