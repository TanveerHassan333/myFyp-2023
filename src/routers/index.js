import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: 'Home',
      component: () => import("../components/Home.vue"),
    },
    {
      path: "/account/register",
      component: () => import("../components/SignUp.vue"),
    }, 
    {
      path: "/user/login",
      component: () => import("../components/Login.vue"),
    },
    {
      path: "/user/profile",
      component: () => import("../components/UserProfile.vue"),
    },
    {
      path: "/user/pro/dashboard",
      component: () => import("../components/UserDasboard.vue"),
    },
    {
      path: "/user/dashboard",
      component: () => import("../components/DashboardOne.vue"),
    },
    {
      path: "/user/forgotPassword",
      component: () => import("../components/ForgotPassword.vue"),
    },
    {
      path: "/blogs/allBlogs",
      component: () => import("../components/AllBlogs.vue"),
    },
    {
      path: "/shareBlog",
      component: () => import("../components/ShareBlogs.vue"),
    },
    {
      path: "/user/professional/sharejob",
      component: () => import("../components/ShareJob.vue"),
    },
    {
      path: "/user/displayjob",
      component: () => import("../components/DisplayJob.vue"),
    },
    {
      path: "/user/job/:jobId",
      component: () => import("../components/DisplaySingleJob.vue"),
    },
    {
      path: "/blogs/showBlog/:id",
      name: 'showBlog',
      props: true,
      component: () => import("../components/ShowFullBlog.vue"),
    },
    {
      path: "/about",
      component: () => import("../components/AboutUs.vue"),
    },
    {
      path: "/blog/report",
      name: 'reportBlog',
      component: () => import("../components/ReportBlog.vue"),
    },
    { 
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import ("../components/NotFound.vue") 
    },
    
  ],
});

export default router;

