// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgcNK_gX5TBViwWKV2teIloZ7-iafbpKo",
  authDomain: "netflixgpt-bd51e.firebaseapp.com",
  projectId: "netflixgpt-bd51e",
  storageBucket: "netflixgpt-bd51e.appspot.com",
  messagingSenderId: "358095526134",
  appId: "1:358095526134:web:c32a0cbe289f05398e74d7",
  measurementId: "G-QTHDGJS0WV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();