<template>
  <div class="edit-post">
    <v-text-field
      :rules="titleRules"
      placeholder="Blog Title"
      required
      filled
      rounded
      dense
      v-model="blogTitle"
    ></v-text-field>
    <h3>Upload Cover Photo</h3>
    <input
      type="file"
      ref="blogPhoto"
      id="blogPhoto"
      accept=".png,.jpg,.jpeg"
      @change="fileChange"
    />
    <v-btn :disabled="!$store.state.editBlogPhotoFileURL">Preview Photo</v-btn>
    <span>File Chosen: {{ $store.state.editBlogPhotoName }}</span>
    <div class="editor">
      <vue-editor
        :editorOptions="editorSettings"
        v-model="blogHTML"
        useCustomImageHandler
        @image-added="imageHandler"
      />
    </div>
    <v-btn @click="editBlog">Save Changes</v-btn>
    <v-btn router :to="{ name: 'PostPreview' }">Preview</v-btn>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";
import Quill from "quill";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);
import db from "../firebase/firebaseInit";

export default {
  name: "EditPost",
  data() {
    return {
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
      titleRules: [(v) => !!v || "Blog Title is required"],
      currentBlogPost: {},
      file: null,
      downloadURL: this.$store.state.editBlogPhotoFile,
    };
  },
  async created() {
    await this.$store.dispatch("currentPost", this.$route.params.id);
    this.currentBlogPost = this.$store.state.currentBlogPost;
    this.$store.commit("editBlogState", this.currentBlogPost);
  },
  computed: {
    blogCoverPhotoName() {
      return this.$store.state.editBlogPhotoName;
    },
    blogPhotoFile() {
      return this.$store.state.editBlogPhotoFile;
    },
    blogTitle: {
      get() {
        return this.$store.state.editBlogTitle;
      },
      set(payload) {
        this.$store.commit("editUpdateBlogTitle", payload);
      },
    },
    blogHTML: {
      get() {
        return this.$store.state.editBlogHTML;
      },
      set(payload) {
        this.$store.commit("editUpdateBlogPost", payload);
      },
    },
  },
  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      this.$store.commit("editFileNameChange", this.file.name);
      this.$store.commit("editFileChange", this.file);
      this.$store.commit("editCreateFileURL", URL.createObjectURL(this.file));
      console.log("changed");
    },
    imageHandler(file, Editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(
        `documents/blogPhotos/${this.makeId()}${file.name}`
      );
      docRef.put(file).on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (err) => {
          console.log(err);
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL();
          Editor.insertEmbed(cursorLocation, "image", downloadURL);
          resetUploader();
        }
      );
    },
    makeId() {
      const length = 10;
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },

    async editBlog() {
      const dataBase = await db
        .collection("blogPosts")
        .doc(this.$route.params.id);
      if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
        if (this.$store.state.editBlogPhotoFile) {
          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(
            `documents/blogCoverPhotos/${this.makeId()}${
              this.blogCoverPhotoName
            }`
          );
          docRef.put(this.$store.state.editBlogPhotoFile);
          this.downloadURL = await docRef.getDownloadURL();
        }
        await dataBase.update({
          blogHTML: this.blogHTML,
          blogCoverPhoto: this.downloadURL,
          blogCoverPhotoName: this.blogCoverPhotoName,
          blogTitle: this.blogTitle,
          dateUpdated: Date.now(),
        });
        this.$store.dispatch("getNewPost");
        this.$store.state.editBlogTitle = null;
        this.$store.state.editBlogPhotoName = null;
        this.$store.state.editBlogPhotoFile = null;
        this.$store.state.editBlogPhotoFileURL = null;
        this.$store.state.editBlogHTML = null;
        console.log("success");
        this.file = null;
        this.$router.push({ name: "Blogs" });
      }
    },
  },
};
</script>

<style></style>
