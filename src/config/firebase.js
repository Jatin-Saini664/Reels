import firebase from "firebase";

let firebaseConfig = {
  apiKey: "AIzaSyCIXygwW83odJP79UuEoLSm36e6GjjD0s4",
  authDomain: "reactapp-cf178.firebaseapp.com",
  projectId: "reactapp-cf178",
  storageBucket: "reactapp-cf178.appspot.com",
  messagingSenderId: "648536819783",
  appId: "1:648536819783:web:2319fdeddaa2c2b4560962",
  measurementId: "G-Y3ZQJSDJN2"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
export let firebaseAuth = firebaseApp.auth();
export let firebaseStorage = firebaseApp.storage();
export let firebaseDB = firebaseApp.firestore();