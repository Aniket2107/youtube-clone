import firebase from "firebase";

import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "clone-10a05.firebaseapp.com",
  projectId: "clone-10a05",
  storageBucket: "clone-10a05.appspot.com",
  messagingSenderId: "1060021339672",
  appId: "1:1060021339672:web:9eb7faf88a46003483a56d",
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
