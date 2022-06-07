import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectors:[
      {title: "Login", linkName: "Login"},
      {title: "Register", linkName: "Register"},
    ],
    blogPosts: [],
    postloaded: null,
    blogTitle: null,
    blogPhotoName: null,
    blogPhotoFile: null,
    blogPhotoFileUrl: null,
    blogPhotoPreview: null,
    blogHTML: null, 
    editPost: false,
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName:null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
   },
  mutations: {
    updateBlogPost(state, payload){
      state.blogHTML = payload;
    },
    updateBlogTitle(state, payload){
      state.blogTitle = payload;
    },
    fileNameChange(state, payload){
      state.blogPhotoName = payload;
    },
    fileChange(state, payload){
      state.blogPhotoFile = payload
    },
    createFileURL(state, payload){
      state.blogPhotoFileURL = payload;
    },
    toggleEditPost(state, payload){
      state.editPost = payload;
    },
    setProfileInfo(state,doc){
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
    },
    setProfileInitials(state){
      state.profileInitials = state.profileFirstName[0] + state.profileLastName[0];
      console.log(state.profileInitials)
    },
    updateUser(state, payload){
      state.user = payload
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
  },
  actions: {
    async getCurrentUser({commit}) {
      const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
  },
  async updateUserSettings({commit,state}){
    const dataBase = await db.collection("users").doc(state.profileId);
    await dataBase.update({
      firstName: state.profileFirstName,
      lastName: state.profileLastName,
      username: state.profileUsername,
    });
    commit("setProfileInitials");
  },
  async getPost({state}){
    const dataBase = await db.collection('blogPosts').orderBy('date','desc');
    const dbResults = await dataBase.get();
    dbResults.forEach((doc) => {
      if(!state.blogPosts.some(post=>post.blogID === doc.id)){
        const data = {
          blogID: doc.data().blogID,
          blogHTML: doc.data().blogHTML,
          blogTitle: doc.data().blogTitle,
          blogCoverPhoto: doc.data().blogCoverPhoto,
          blogDate: doc.data().date,
        };
        state.blogPosts.push(data);
      }
    });
    state.postloaded = true;
    console.log(state.blogPosts);
  }
  },
  modules: {
  }
})
