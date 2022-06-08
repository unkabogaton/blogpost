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
    currentBlogID: null,
    currentBlogPost: null,
    postloaded: null,
    blogTitle: null,
    blogPhotoName: null,
    blogPhotoFile: null,
    blogPhotoFileURL: null,
    blogHTML: null, 
    editBlogTitle: null,
    editBlogPhotoName: null,
    editBlogPhotoFile: null,
    editBlogPhotoFileURL: null,
    editBlogHTML: null, 
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
    editUpdateBlogPost(state, payload){
      state.editBlogHTML = payload;
    },
    editUpdateBlogTitle(state, payload){
      state.editBlogTitle = payload;
    },
    editFileNameChange(state, payload){
      state.editBlogPhotoName = payload;
    },
    editFileChange(state, payload){
      state.editBlogPhotoFile = payload
    },
    editCreateFileURL(state, payload){
      state.editBlogPhotoFileURL = payload;
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
    filterBlogPost(state, id){
      state.blogPosts = state.blogPosts.filter(post => post.blogID !== id);
    },
    editBlogState(state,payload){
      state.editBlogTitle = payload.blogTitle;
      state.editBlogHTML = payload.blogHTML;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
      state.editBlogPhotoName = payload.blogCoverPhotoName;
    },
    clearEditBlogState(state){
      state.editBlogTitle = null;
      state.editBlogHTML = null;
      state.editBlogPhotoFileURL = null;
      state.editBlogPhotoFile = null;
      state.editBlogPhotoName = null;
      console.log(state.editBlogPhotoName)
    }
  },
  actions: {
    async getCurrentUser({commit}) {
      const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
  },
  async updateUserSettings({commit, state}){
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
          blogCoverPhotoName: doc.data().blogCoverPhotoName,
          blogDate: doc.data().date,
        };
        state.blogPosts.push(data);
      }
    });
    state.postloaded = true;
  },
  async getNewPost({state}){
    const dataBase = await db.collection('blogPosts').orderBy('date','desc').limit(1);
    const dbResults = await dataBase.get();
    dbResults.forEach((doc) => {
      if(!state.blogPosts.some(post=>post.blogID === doc.id)){
        const data = {
          blogID: doc.data().blogID,
          blogHTML: doc.data().blogHTML,
          blogTitle: doc.data().blogTitle,
          blogCoverPhoto: doc.data().blogCoverPhoto,
          blogCoverPhotoName: doc.data().blogCoverPhotoName,
          blogDate: doc.data().date,
        };
        state.blogPosts.push(data);
      }
    });
    state.postloaded = true;
    console.log("updated")
  },
  async currentPost({state}, id){
    const dataBase = await db.collection("blogPosts").where("blogID", "==", id);
    await dataBase.get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {          
        state.currentBlogPost = {
          blogID: doc.data().blogID,
          blogHTML: doc.data().blogHTML,
          blogTitle: doc.data().blogTitle,
          blogCoverPhoto: doc.data().blogCoverPhoto,
          blogCoverPhotoName: doc.data().blogCoverPhotoName,
          blogDate: doc.data().date
        } 
        console.log(state.currentBlogPost);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  },
  async deleteBlog({commit}, id){
    const getPost = await db.collection("blogPosts").doc(id);
    await getPost.delete();
    commit("filterBlogPost", id);
    console.log("sucess")
  }
  },
  modules: {
  }
})
