<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      :collapse="!collapseOnScroll"
      :collapse-on-scroll="collapseOnScroll"
      absolute
      color="deep-purple accent-4"
      dark
      scroll-target="#scrolling-techniques-6"
      v-if="
        $route.name !== 'Login' &&
          $route.name !== 'Register' &&
          $route.name !== 'Forgot Password'
      "
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Collapsing Bar</v-toolbar-title>

      <v-spacer></v-spacer>

      <ul>
        <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
        <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
        <router-link class="link" to="#">Create Post</router-link>
        <router-link class="link" :to="{ name: 'Login' }"
          >Login/Register</router-link
        >
      </ul>

      <v-checkbox
        v-model="collapseOnScroll"
        color="white"
        hide-details
      ></v-checkbox>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-6"
      class="overflow-y-auto"
      max-height="100%"
    >
      <v-container style="height: 100vh;">
        <v-main>
          <br />
          <br />
          <br />
          <router-view />
        </v-main>
      </v-container>
    </v-sheet>
  </v-card>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "navigation",
  data() {
    return {
      collapseOnScroll: true,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);
      if (user) {
        this.$store.dispatch("getCurrentUser");
      }
    });
  },
};
</script>

<style lang="scss" scoped></style>
