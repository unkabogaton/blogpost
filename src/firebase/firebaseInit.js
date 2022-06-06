import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCIoISpJyCYVaooaJxybw3eUplr14ZQdtw",
    authDomain: "blogpost-9bffa.firebaseapp.com",
    projectId: "blogpost-9bffa",
    storageBucket: "blogpost-9bffa.appspot.com",
    messagingSenderId: "1087426670681",
    appId: "1:1087426670681:web:348e271066bf34d2088148"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {timestamp};
export default firebaseApp.firestore()