<template>
  <div class="home">
    <v-card
      class="mx-auto my-3"
      max-width="344"
      v-for="blog in blogPosts"
      :key="blog.blogID"
      router
      :to="{ name: 'ViewBlog', params: { id: blog.blogID } }"
    >
      <v-img :src="blog.blogCoverPhoto" height="200px"></v-img>

      <v-card-title>
        {{ blog.blogTitle }}
      </v-card-title>

      <v-card-subtitle>
        {{ new Date(blog.blogDate).toString().split("GMT")[0] }}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn color="orange lighten-2" text>
          Explore
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he
            could deliver. You won't have time for sleeping, soldier, not with
            all the bed making you'll be doing. Then we'll go with that data
            file! Hey, you add a one and two zeros to that or we walk! You're
            going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      show: false,
    };
  },
  computed: {
    blogPosts() {
      return this.$store.state.blogPosts;
    },
  },
  methods: {},
};
</script>
