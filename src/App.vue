<template>
  <v-app>
    <Navigation />
    <v-sheet
      ><v-container><router-view /></v-container
    ></v-sheet>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation";
export default {
  name: "App",
  components: { Navigation },

  data: () => ({
    //
  }),
  async created() {
    this.$store.dispatch("getPost");
  },
};
</script>
