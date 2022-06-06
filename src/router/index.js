import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Profile from "../views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{
      title: "Home"
    }
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta:{
      title: "Blogs"
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta:{
      title: "Register"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta:{
      title: "Login"
    }
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: ForgotPassword,
    meta:{
      title: "Forgot Password"
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta:{
      title: "Profile"
    }
  },
 
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) =>{
  document.title=`${to.meta.title} | MyBlog`;
  next();
})

export default router;
