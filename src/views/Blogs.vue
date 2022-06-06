<template>
  <div class="blogs">
    <v-switch v-model="editPost" inset></v-switch>
    <v-card
      class="mx-auto my-3"
      max-width="344"
      outlined
      v-for="blog in sampleBlogCards"
      :key="blog.blogTitle"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">
            {{ blog.blogDate }}
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
        <v-btn outlined rounded text>
          delete
        </v-btn>
        <v-btn outlined rounded text>
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
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards;
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
};
</script>

<style></style>
