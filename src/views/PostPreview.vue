<template>
  <div class="preview">
    <div class="container quillWrapper mx-auto pa-7">
      <h2>{{ $store.state.blogTitle }}</h2>
      <v-img :src="$store.state.blogPhotoFileURL" width="100%" alt="" />
      <div class="post-content ql-editor" v-html="$store.state.blogHTML"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Preview",
};
</script>

<style></style>
