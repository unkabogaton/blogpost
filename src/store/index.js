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
    sampleBlogCards: [
      {
        blogTitle: "Blog 1",
        blogCoverPhoto:
          "https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg",
        blogDate: "June 6, 2022",
      },
      {
        blogTitle: "Blog 2",
        blogCoverPhoto:
          "https://media.istockphoto.com/photos/start-small-think-big-picture-id1333922093?b=1&k=20&m=1333922093&s=170667a&w=0&h=rKXAeHZXtmYij0FT9W88dJZVSoMU8Sy8rf9u5jufpN8=",
        blogDate: "June 5, 2022",
      },
    ],
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
    toggleEditPost(state, payload){
      state.editPost = payload
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
  },
  modules: {
  }
})
