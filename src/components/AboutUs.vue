<template>
    <div class="container about">
       <div class="row">
        <div class="col-lg-6 text">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore aliquam doloribus voluptatibus nesciunt. Ex ipsum modi nisi mollitia est tempore? Exercitationem amet odit, ab maiores omnis eum ullam dolore beatae repellat! Modi, a dolores incidunt sit at dicta? Adipisci, placeat. Ex ipsum modi nisi mollitia est tempore? Exercitationem amet odit, ab maiores omnis eum ullam dolore beatae repellat! Modi, a dolores incidunt sit at dicta? Adipisci, placeat.</p>
            <RouterLink to="/account/register"> <button class="btn-more">Learn More</button></RouterLink>
        </div>
        <div class="col-lg-6">
            <img class="img-fluid about-img" src="../assets/images/Blogging-bro 1 (1).png" alt="image">
        </div>
       </div>
    </div>
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
.about{
    box-shadow: none;
    margin: 0 auto;
}
.text {
margin-top: 7rem;
}
.text p{
    font-size: 0.90rem;
    line-height: 2;
}
.btn-more{
    border: none;
    margin-top: 2rem;
    background-color:#FFDC5F;
    color: #333;
    padding: 0.5rem 1rem;
    text-align: center;
    border-radius: 1.2rem;
    font-weight: 600;
}
.about-img{
    width: auto;
    height: 30rem;
    object-fit: contain;
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