<template>
  <div class="blogs">
    <v-switch v-model="editPost" inset></v-switch>
    <v-card
      class="mx-auto my-3"
      max-width="344"
      outlined
      v-for="blog in blogPosts"
      :key="blog.blogID"
      :to="{ name: 'ViewBlog', params: { id: blog.blogID } }"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">
            {{ new Date(blog.blogDate).toString().split("GMT")[0] }}
          </div>
          <v-list-item-title class="text-h5 mb-1">
            {{ blog.blogTitle }}
          </v-list-item-title>
          <v-list-item-subtitle
            >Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle
          >
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey">
          <img :src="blog.blogCoverPhoto" />
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions v-show="editPost">
        <v-btn outlined rounded text @click="deleteBlog(blog.blogID)">
          delete
        </v-btn>
        <v-btn
          outlined
          rounded
          text
          router
          :to="{ name: 'EditPost', params: { id: blog.blogID } }"
        >
          edit
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "blogs",
  data() {
    return {};
  },
  computed: {
    blogPosts() {
      return this.$store.state.blogPosts;
    },
    editPost: {
      get() {
        return this.$store.state.editPost;
      },
      set(payload) {
        this.$store.commit("toggleEditPost", payload);
      },
    },
  },
  methods: {
    deleteBlog(id) {
      this.$store.dispatch("deleteBlog", id);
    },
  },
};
</script>

<style></style>
