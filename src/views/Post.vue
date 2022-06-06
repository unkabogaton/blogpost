<template>
  <div class="post">
    <v-card>
      <input type="text" />
      <v-text-field
        :rules="titleRules"
        placeholder="Blog Title"
        v-model="blogTitle"
        required
        filled
        rounded
        dense
      ></v-text-field>
      <h3>Upload Cover Photo</h3>
      <input
        type="file"
        ref="blogPhoto"
        id="blogPhoto"
        accept=".png,.jpg,.jpeg"
      />
      <v-btn :disabled="!$store.state.blogPhotoFileURL">Preview Photo</v-btn>
      <span>File Chosen: {{ $store.state.blogPhotoName }}</span>
      <div class="editor">
        <vue-editor
          :editorOptions="editorSettings"
          v-model="blogHTML"
          useCustomImageHandler
        />
      </div>
      <v-btn>Publish Blog</v-btn>
    </v-card>
  </div>
</template>

<script>
import Quill from "quill";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);
export default {
  name: "Post",
  data() {
    return {
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
      titleRules: [(v) => !!v || "Blog Title is required"],
    };
  },
  computed: {
    blogCoverPhotoName() {
      return this.$store.state.blogPhotoName;
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit("updateBlogTitle", payload);
      },
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        this.$store.commit("updateBlogPost", payload);
      },
    },
  },
};
</script>

<style></style>
