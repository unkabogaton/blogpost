<template>
  <div class="preview">
    <div class="view-blog">
      <div class="container quillWrapper mx-auto pa-7">
        <h1>{{ currentBlogPost.blogTitle }}</h1>
        <div>
          {{
            new Date(currentBlogPost.blogDate).toLocaleString("en-us", {
              dateStyle: "long",
              timeStyle: "short",
            })
          }}
        </div>
        <v-img :src="currentBlogPost.blogCoverPhoto" width="100%" alt="" />
        <div
          class="post-content ql-editor"
          v-html="currentBlogPost.blogHTML"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "view-blog",
  data() {
    return {
      currentBlogPost: {},
    };
  },
  async created() {
    await this.$store.dispatch("currentPost", this.$route.params.id);
    this.currentBlogPost = this.$store.state.currentBlogPost;
  },
};
</script>

<style></style>
