<template>
  <div>
    <v-app-bar
      color="white"
      dense
      temporary
      v-show="true"
      v-if="
        $route.name !== 'Login' &&
          $route.name !== 'Register' &&
          $route.name !== 'Forgot Password'
      "
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>Bloggy</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-avatar
        size="30"
        color="teal"
        @click="drawer = true"
        v-if="$store.state.user"
        >{{ $store.state.profileInitials }}</v-avatar
      >

      <v-menu left bottom v-else>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="selector in selectors"
            :key="selector.title"
            @click="linkTo(selector.linkName)"
            dense
          >
            <v-list-item-title>{{ selector.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <template v-slot:extension>
        <v-tabs centered
          ><v-tab :to="{ name: 'Home' }" exact>Home</v-tab>
          <v-tab :to="{ name: 'Blogs' }">Blogs</v-tab>
          <v-tab :to="{ name: 'Post' }">Post</v-tab></v-tabs
        >
      </template>
    </v-app-bar>

    <v-navigation-drawer
      absolute
      temporary
      right
      v-model="drawer"
      height="350"
      overlay-opacity="0"
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-avatar size="40" color="teal" class="white--text">{{
              $store.state.profileInitials
            }}</v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              >{{ $store.state.profileFirstName }}
              {{ $store.state.profileLastName }}</v-list-item-title
            >
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          router
          :to="{ name: item.route }"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "navigation",
  data() {
    return {
      items: [
        { title: "My Account", icon: "mdi-account", route: "Profile" },
        { title: "Admin", icon: "mdi-account-group-outline", route: "Home" },
      ],
      drawer: false,
      user: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);
      this.user = user;
      if (user) {
        this.$store.dispatch("getCurrentUser");
      }
    });
  },
  computed: {
    selectors() {
      return this.$store.state.selectors;
    },
  },
  methods: {
    linkTo(link) {
      this.$router.push({ name: link });
    },
    logout() {
      firebase.auth().signOut();
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped></style>
