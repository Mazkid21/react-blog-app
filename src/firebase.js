import * as firebase from 'firebase';


const config = {
    apiKey: "AIzaSyCojMgotxsV-v0GuEhRd3ricE1bkxIB1ag",
    authDomain: "fir-test-45a09.firebaseapp.com",
    databaseURL: "https://fir-test-45a09.firebaseio.com",
    projectId: "fir-test-45a09",
    storageBucket: "fir-test-45a09.appspot.com",
    messagingSenderId: "829996643346"
  };
  firebase.initializeApp(config);

  export const database = firebase.database().ref('/posts');