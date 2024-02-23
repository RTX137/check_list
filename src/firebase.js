// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRx2mslesX4ymcNNUXE4KsdD-u4gPQXk0",
  authDomain: "todo--app-yt.firebaseapp.com",
  projectId: "todo--app-yt",
  storageBucket: "todo--app-yt.appspot.com",
  messagingSenderId: "1073362224301",
  appId: "1:1073362224301:web:7c0e4dbc8e587fea35f224"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)