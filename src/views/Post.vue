<template>
  <div class="post">
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
      @change="fileChange"
    />
    <v-btn :disabled="!$store.state.blogPhotoFileURL">Preview Photo</v-btn>
    <span>File Chosen: {{ $store.state.blogPhotoName }}</span>
    <div class="editor">
      <vue-editor
        :editorOptions="editorSettings"
        v-model="blogHTML"
        useCustomImageHandler
        @image-added="imageHandler"
      />
    </div>
    <v-btn @click="uploadBlog">Publish Blog</v-btn>
    <v-btn router :to="{ name: 'PostPreview' }">Preview Blog</v-btn>
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
  name: "Post",
  data() {
    return {
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
      titleRules: [(v) => !!v || "Blog Title is required"],
      file: null,
    };
  },
  computed: {
    blogCoverPhotoName() {
      return this.$store.state.blogPhotoName;
    },
    blogPhotoFile() {
      return this.$store.state.blogPhotoFile;
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
  created() {
    this.$store.commit("clearEditBlogState");
  },
  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      this.$store.commit("fileNameChange", this.file.name);
      this.$store.commit("fileChange", this.file);
      this.$store.commit("createFileURL", URL.createObjectURL(this.file));
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

    uploadBlog() {
      if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
        if (this.$store.state.blogPhotoFileURL) {
          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(
            `documents/blogCoverPhotos/${this.makeId()}${
              this.blogCoverPhotoName
            }`
          );
          docRef.put(this.$store.state.blogPhotoFile).on(
            "state_changed",
            (snapshot) => {
              console.log(snapshot);
            },
            (err) => {
              console.log(err);
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL();
              const timestamp = await Date.now();
              const dataBase = await db.collection("blogPosts").doc();
              await dataBase.set({
                blogID: dataBase.id,
                blogHTML: this.blogHTML,
                blogCoverPhoto: downloadURL,
                blogCoverPhotoName: this.blogCoverPhotoName,
                blogTitle: this.blogTitle,
                date: timestamp,
              });
              this.$store.dispatch("getNewPost");
              this.$store.state.blogTitle = null;
              this.$store.state.blogPhotoName = null;
              this.$store.state.blogPhotoFile = null;
              this.$store.state.blogPhotoFileURL = null;
              (this.$store.state.blogHTML = null), console.log("success");
              this.file = null;
              this.$router.push({ name: "Blogs" });
            }
          );
        }
      }
    },
  },
};
</script>

<style></style>
